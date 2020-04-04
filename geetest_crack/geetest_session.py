import json
import pickle
import re
import threading
import time
from io import BytesIO
from threading import Thread

from PIL import Image
from redis import Redis
from requests import session

from config import gt_register_url, common_login_headers, get_php_url, ajax_php_url, prefix_url, geetest_session_key, \
    min_threshold, max_sleep_time, min_sleep_time
from param import get_full_page_w1, get_full_page_w2, get_track, get_slide_w, get_s
from utils.captcha import calculate_offset
from utils.fetch import fetch
from utils.logger import logger
from utils.response import Resp
from utils.times import now_str

# 请在机器上安装redis，再使用
client = Redis()


class GSession:
    """获取极验Session"""

    def __init__(self):
        self.session = session()
        self.res = Resp.SUCCESS
        self.gt = str()
        self.challenge = str()
        self.s = get_s()
        self.validate = str()
        self.sec_code = str()
        self.bg_url = str()
        self.full_bg_url = str()
        self.offset = 0
        self.track = list()

    def set_gt_challenge(self) -> bool:
        """发送网络请求，拿到gt和challenge"""
        params = dict(t=now_str())
        resp = fetch(self.session, url=gt_register_url, headers=common_login_headers, params=params)
        if resp is None:
            logger.warning('无法获取gt/challenge...')
            self.res = Resp.TIMEOUT
            return False
        res = resp.json()
        logger.info(f'gt/challenge请求结果：{res}')
        self.gt, self.challenge = res['gt'], res['challenge']
        return True

    def get_php(self):
        """注册参数s：s经过多层加密拼接成w"""
        params = {
            'gt': self.gt,
            'challenge': self.challenge,
            'lang': 'zh-cn',
            'w': get_full_page_w1(self.gt, self.challenge, self.s),
            'callback': 'geetest_' + now_str()
        }
        resp = fetch(self.session, url=get_php_url, headers=common_login_headers, params=params)
        if resp is None:
            logger.warning('无法注册参数s...')
            self.res = Resp.TIMEOUT
        return resp is not None

    def ajax_php(self, step=1, params=None):
        """
        step=1:发送请求，校验参数w
        step=2:滑动滑块
        """
        if step == 1:
            params = {
                'gt': self.gt,
                'challenge': self.challenge,
                'lang': 'zh-cn',
                'w': get_full_page_w2(self.gt, self.challenge, self.s) + '1',
                'callback': 'geetest_' + now_str()
            }
        resp = fetch(self.session, url=ajax_php_url, headers=common_login_headers, params=params)
        if resp is None:
            self.res = Resp.TIMEOUT
            return False
        if step != 1:
            res = json.loads(re.search(r'\((.*?)\)', resp.text, re.S).group(1))
            if res['data']['result'] != 'success':
                self.res = Resp.SLIDE_ERR
                return False
            self.validate = res['data']['validate']
            self.sec_code = self.validate + '|jordan'
        return True

    def get_slide_images(self):
        """获取验证码图片的地址"""
        params = {
            'is_next': 'true',
            'type': 'slide3',
            'gt': self.gt,
            'challenge': self.challenge,
            'lang': 'zh-cn',
            'https': 'true',
            'protocol': 'https://',
            'offline': 'false',
            'product': 'popup',
            'api_server': 'captcha-api.com',
            'width': '100%',
            'callback': 'geetest_' + now_str()
        }
        resp = fetch(self.session, url=get_php_url, headers=common_login_headers, params=params)
        if resp is None:
            self.res = Resp.TIMEOUT
            return False
        res = json.loads(re.search(r'\((.*?)\)', resp.text, re.S).group(1))

        # 获得滑动验证码图片的URL(带缺口+不带缺口)
        self.bg_url = prefix_url + res['data']['bg']
        self.full_bg_url = prefix_url + res['data']['fullbg']
        logger.info(f'滑动验证码图片,bg_url:{self.bg_url}, full_bg_url:{self.full_bg_url}')
        # 更新gt/challenge
        self.gt = res['data']['gt']
        self.challenge = res['data']['challenge']
        return True

    def get_track(self):
        """获取滑动轨迹"""
        resp1 = fetch(self.session, url=self.bg_url, headers=common_login_headers)
        resp2 = fetch(self.session, url=self.full_bg_url, headers=common_login_headers)
        if not (resp1 and resp2):
            self.res = Resp.TIMEOUT
            return False
        img1 = Image.open(BytesIO(resp1.content))
        img2 = Image.open(BytesIO(resp2.content))

        # 计算偏移量
        self.offset = calculate_offset(img1, img2)

        # 根据偏移量获取轨迹
        self.track = get_track(self.offset)
        if self.track is None:
            self.res = Resp.TRACK_ERR
        return self.track is not None

    def slide(self):
        """滑动滑块"""
        params = {
            'gt': self.gt,
            'challenge': self.challenge,
            'lang': 'zh-cn',
            'w': get_slide_w(self.gt, self.challenge, get_s(), self.offset, self.track),
            'callback': 'geetest_' + now_str()
        }
        return self.ajax_php(step=2, params=params)

    def run(self):
        # 此处使用and操作符，当有某个请求返回false时，直接终止当前请求链
        self.set_gt_challenge() and self.get_php() and self.ajax_php() and self.get_slide_images() and self.get_track() and self.slide()
        logger.info(f'获取极验session结果：{self.res}')
        return self.res == Resp.SUCCESS


def produce_session():
    """生产极验session"""
    while True:
        gs = GSession()
        try:
            if gs.run():
                res = pickle.dumps(gs.session)
                client.zadd(geetest_session_key, {res: time.time()})
                num = client.zcard(geetest_session_key)
                logger.info(f'保存极验session到池子中，当前个数：{num}')
            else:
                logger.error('获取极验session请求出错')
        except Exception as e:
            logger.error(f'获取极验session失败，错误信息：{e}')
        time.sleep(4)


def pop_session():
    """从池子中弹出极验session"""
    res = client.zrevrange(geetest_session_key, 0, 0, withscores=True)
    if res:
        g_session, score = res[0]
        g_session = pickle.loads(g_session)
        client.zremrangebyscore(geetest_session_key, min=score, max=score)
        return g_session
    return None


def expire_schedule():
    """定期删除1小时前的session，达到过期效果"""
    client.zremrangebyscore(geetest_session_key, 0, time.time() - 3600)
    timer = threading.Timer(2, expire_schedule)
    timer.start()


def check_session_pool():
    """检查session池子"""
    while True:
        num = client.zcard(geetest_session_key)
        if num < min_threshold:
            # 此处可以自行设置告警，及时通知开发人员
            logger.error(f'极验Session池数量不足{min_threshold}个，请关注，当前数量：{num}')
            time.sleep(max_sleep_time)
        time.sleep(min_sleep_time)


if __name__ == '__main__':
    threads = [Thread(target=produce_session) for _ in range(4)] + [Thread(target=expire_schedule)] + [
        Thread(target=check_session_pool)]
    for thread in threads:
        thread.start()
