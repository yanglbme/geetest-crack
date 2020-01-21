import json
import re
from io import BytesIO

from PIL import Image

from geetest_crack.config import common_headers, gt_register_url, get_php_url, ajax_php_url
from geetest_crack.param import get_s, get_encrypt_pwd, get_jt_safe_key, get_token, get_device, get_full_page_w1, \
    get_full_page_w2, session, get_track, get_slide_w
from geetest_crack.utils.captcha import calculate_offset
from geetest_crack.utils.fetch import fetch
from geetest_crack.utils.times import now_str


class Spider:
    def __init__(self, phone, password):
        self.login_name = str(phone)
        self.login_pwd = get_encrypt_pwd(password)
        self.s = get_s()
        self.gt = str()
        self.challenge = str()
        self.bg_url = str()
        self.full_bg_url = str()
        self.track = list()
        self.validate = str()
        self.sec_code = str()
        self.offset = 0
        self.session = session()
        self.jt_safe_key = get_jt_safe_key()
        self.device_id = get_device()
        self.device_ip = get_device()
        self.token = get_token(self.session, phone, self.device_id, self.device_ip)

    def set_gt_challenge(self) -> bool:
        """发送网络请求，拿到gt和challenge"""
        params = dict(t=now_str())
        resp = fetch(self.session, url=gt_register_url, headers=common_headers, params=params)
        if resp is None:
            return False
        res = resp.json()
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
        resp = fetch(self.session, url=get_php_url, headers=common_headers, params=params)
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
                'w': get_full_page_w2(self.gt, self.challenge, self.s),
                'callback': 'geetest_' + now_str()
            }
        resp = fetch(self.session, url=ajax_php_url, headers=common_headers, params=params)
        if resp is None:
            return False
        if step != 1:
            print(resp.text)
            res = json.loads(re.search(r'\((.*?)\)', resp.text, re.S).group(1))
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
            'api_server': 'captcha-api.pingan.com',
            'width': '100%',
            'callback': 'geetest_' + now_str()
        }
        resp = fetch(self.session, url=get_php_url, headers=common_headers, params=params)
        if resp is None:
            return False
        res = json.loads(re.search(r'\((.*?)\)', resp.text, re.S).group(1))
        prefix = 'https://captcha-static.pingan.com/'

        # 获得滑动验证码图片的URL(带缺口+不带缺口)
        self.bg_url = prefix + res['data']['bg']
        self.full_bg_url = prefix + res['data']['fullbg']

        # 更新gt/challenge
        self.gt = res['data']['gt']
        self.challenge = res['data']['challenge']
        return True

    def get_track(self):
        """获取滑动轨迹"""
        resp1 = fetch(self.session, url=self.bg_url, headers=common_headers)
        resp2 = fetch(self.session, url=self.full_bg_url, headers=common_headers)
        if not (resp1 and resp2):
            return False
        img1 = Image.open(BytesIO(resp1.content))
        img2 = Image.open(BytesIO(resp2.content))

        # 计算偏移量
        self.offset = calculate_offset(img1, img2)

        # 根据偏移量获取轨迹
        self.track = get_track(self.offset)
        return self.track is not None

    def slide(self):
        print(self.track)
        params = {
            'gt': self.gt,
            'challenge': self.challenge,
            'lang': 'zh-cn',
            'w': get_slide_w(self.gt, self.challenge, get_s(), self.offset, self.track),
            'callback': 'geetest_' + now_str()
        }
        return self.ajax_php(step=2, params=params)

    def run(self):
        self.set_gt_challenge() and self.get_php() and self.ajax_php() and self.get_slide_images() and self.get_track() and self.slide()
        print(self.validate)


spider = Spider('13434958889', 'x12356789')
spider.run()
