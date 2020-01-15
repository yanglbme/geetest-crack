from geetest_crack.config import common_headers, gt_register_url, get_php_url
from geetest_crack.utils.fetch import fetch
from geetest_crack.utils.rands import s
from geetest_crack.utils.times import now_str


class Spider:
    def __init__(self):
        self.s = s()
        self.gt = str()
        self.challenge = str()

    def set_gt_challenge(self):
        """发送网络请求，拿到gt和challenge"""
        params = dict(t=now_str())
        resp = fetch(gt_register_url, headers=common_headers, params=params)
        res = resp.json()
        self.gt, self.challenge = res['gt'], res['challenge']

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
        self.set_gt_challenge()
        self.register_s()
        print(self.gt, self.challenge)


spider = Spider()
spider.run()
