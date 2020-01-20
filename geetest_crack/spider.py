from geetest_crack.config import common_headers, gt_register_url, get_php_url
from geetest_crack.param import get_s, get_encrypt_pwd, get_jt_safe_key, get_token, get_device
from geetest_crack.utils.fetch import fetch
from geetest_crack.utils.times import now_str


class Spider:
    def __init__(self, phone, password):
        self.login_name = str(phone)
        self.login_pwd = get_encrypt_pwd(password)
        self.s = get_s()
        self.gt = str()
        self.challenge = str()
        self.jt_safe_key = get_jt_safe_key()
        self.device_id = get_device()
        self.device_ip = get_device()
        self.token = get_token(phone, self.device_id, self.device_ip)

    def set_gt_challenge(self) -> bool:
        """发送网络请求，拿到gt和challenge"""
        params = dict(t=now_str())
        resp = fetch(gt_register_url, headers=common_headers, params=params)
        if resp is None:
            return False
        res = resp.json()
        self.gt, self.challenge = res['gt'], res['challenge']
        return True

    def register_s(self):
        """注册参数s：s经过多层加密拼接成w"""
        params = {
            'gt': self.gt,
            'challenge': self.challenge,
            'lang': 'zh-cn',
            'w': 'ww',  # TODO
            'callback': 'geetest_' + now_str()
        }
        fetch(get_php_url, headers=common_headers, params=params, timeout=3)

    def run(self):
        self.set_gt_challenge() and self.register_s()
        print(self.gt, self.challenge)
