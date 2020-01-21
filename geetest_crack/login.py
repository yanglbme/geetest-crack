import json
import re
from io import BytesIO

from PIL import Image

from geetest_crack.config import common_login_headers, gt_register_url, get_php_url, ajax_php_url, app_id, device_type, \
    redirect_flag, sign_type, acc_login_url, login_success_handler_url, prefix_url
from geetest_crack.param import get_s, get_encrypt_pwd, get_jt_safe_key, get_token, get_device, get_full_page_w1, \
    get_full_page_w2, session, get_track, get_slide_w
from geetest_crack.utils.captcha import calculate_offset
from geetest_crack.utils.fetch import fetch
from geetest_crack.utils.times import now_str


class LoginSpider:
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
        resp = fetch(self.session, url=gt_register_url, headers=common_login_headers, params=params)
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
        resp = fetch(self.session, url=get_php_url, headers=common_login_headers, params=params)
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
        resp = fetch(self.session, url=ajax_php_url, headers=common_login_headers, params=params)
        if resp is None:
            return False
        if step != 1:
            res = json.loads(re.search(r'\((.*?)\)', resp.text, re.S).group(1))
            if res['data']['result'] != 'success':
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
            'api_server': 'captcha-api.pingan.com',
            'width': '100%',
            'callback': 'geetest_' + now_str()
        }
        resp = fetch(self.session, url=get_php_url, headers=common_login_headers, params=params)
        if resp is None:
            return False
        res = json.loads(re.search(r'\((.*?)\)', resp.text, re.S).group(1))

        # 获得滑动验证码图片的URL(带缺口+不带缺口)
        self.bg_url = prefix_url + res['data']['bg']
        self.full_bg_url = prefix_url + res['data']['fullbg']

        # 更新gt/challenge
        self.gt = res['data']['gt']
        self.challenge = res['data']['challenge']
        return True

    def get_track(self):
        """获取滑动轨迹"""
        resp1 = fetch(self.session, url=self.bg_url, headers=common_login_headers)
        resp2 = fetch(self.session, url=self.full_bg_url, headers=common_login_headers)
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
        """滑动滑块"""
        params = {
            'gt': self.gt,
            'challenge': self.challenge,
            'lang': 'zh-cn',
            'w': get_slide_w(self.gt, self.challenge, get_s(), self.offset, self.track),
            'callback': 'geetest_' + now_str()
        }
        return self.ajax_php(step=2, params=params)

    def login(self):
        """携带各个加密参数登录"""
        form_data = {
            'appId': app_id,
            'loginName': self.login_name,
            'loginPwd': self.login_pwd,
            'geetest_challenge': self.challenge,
            'geetest_validate': self.validate,
            'geetest_seccode': self.sec_code,
            'deviceId': self.device_id,
            'deviceIp': self.device_ip,
            'deviceType': device_type,
            'jtSafeKey': self.jt_safe_key,
            'token': self.token,
            'fcmmRedirectFlag': redirect_flag,
            'signtype': sign_type
        }

        resp = fetch(self.session, url=acc_login_url, method='post', headers=common_login_headers, data=form_data)
        if resp is None:
            return False
        res = resp.json()
        if res['returnCode'] != '0':
            if res['returnCode'] == 'BIZ_ERROR_018' and '账户名或密码错误' in res['returnMsg']:
                print('用户名或密码错误')
            if res['returnCode'] == 'COMMON_ERROR_022':
                print('非法操作')
            return False

        result_token = resp.json()['data']['resultToken']
        form_data = {
            'appId': app_id,
            'assert': '',
            'assertSign': '',
            'des3Assert': '',
            'des3AssertSign': '',
            'resultToken': result_token,
            'ptag': ''
        }
        resp = fetch(self.session, url=login_success_handler_url, method='post', headers=common_login_headers,
                     data=form_data)
        return resp is not None

    def run(self):
        self.set_gt_challenge() and self.get_php() and self.ajax_php() and self.get_slide_images() and self.get_track() and self.slide() and self.login()


spider = LoginSpider('13317178767', '123456789x')
spider.run()
