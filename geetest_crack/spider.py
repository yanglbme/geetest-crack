import time

import requests

from geetest_crack.utils.rand_s import s


class Spider:
    def __init__(self, timeout=3):
        self.session = requests.session()
        self.timeout = timeout
        self.s = s()
        self.gt = str()
        self.challenge = str()

    def set_gt_challenge(self):
        """发送网络请求，拿到gt和challenge"""
        url = 'https://paicc-core.pingan.com.cn/paicc-core-web/webapi/gt/register'
        headers = {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                          'Chrome/79.0.3945.117 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
        }
        params = dict(t=str(round(time.time() * 1000)))
        resp = self.session.get(url, headers=headers, params=params, timeout=self.timeout)
        """
        {"challenge":"54dfffb895e232e458e517e1cc51c219","gt":"29414567350546096e14bb2bc6319ae1","success":1}
        """
        res = resp.json()
        self.gt, self.challenge = res['gt'], res['challenge']

    def register_s(self):
        """注册参数s：s经过多层加密拼接成w"""
        url = 'https://captcha-api.pingan.com/get.php'
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                          'Chrome/79.0.3945.117 Safari/537.36'
        }

        params = {
            'gt': self.gt,
            'challenge': self.challenge,
            'lang': 'zh-cn',
            'w': 'ww',  # TODO
            'callback': 'geetest_' + str(round(time.time() * 1000))
        }

    def run(self):
        self.set_gt_challenge()
        self.register_s()


spider = Spider()
spider.run()