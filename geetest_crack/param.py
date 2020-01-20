import base64
import json
import random
import re

import execjs

from geetest_crack.config import common_headers, token_url, app_id, device_type, login_type, pwd_encrypt_js_path, \
    full_page_t1_js_path, full_page_w1_js_path, full_page_w2_js_path
from geetest_crack.utils.fetch import fetch


def get_jt_safe_key() -> str:
    """
    获取页面加密参数jtSafeKey
    详见https://paicc-core.pingan.com.cn/paicc-core-web/js/jtsafe/pawebjs.js
    """

    def get_guid():
        def t():
            return str(hex(int((1 + random.random()) * 65536)))[3:]

        return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()

    r = {
        'sdkversion': '1.3.0',
        'user_agent': common_headers['User-Agent'],
        'language': 'zh-CN',
        'languages': 'zh-CN,zh',
        'color_depth': 24,
        'resolution': '1920,1080',
        'available_resolution': '1920,1040',
        'timezone_offset': -480,
        'session_storage': 1,
        'local_storage': 1,
        'indexed_db': 1,
        'open_database': 1,
        'cpu_class': 'unknown',
        'navigator_platform': 'Win32',
        'do_not_track': 'unknown',
        'canvas_winding': 'yes',
        'canvas_fp': 'e86fea3a3dae3d2f8664e2dc98d7d0d38',
        'webgl': '057920cc9f896a6ee375d8abe80e01ac',
        'touch_support': '0,false,false',
        'compatMode': 'CSS1Compat',
        'devicePixelRatio': 1,
        'navigator_vendorSub': '',
        'navigator_productSub': '20030107',
        'navigator_vendor': 'Google Inc.',
        'navigator_maxTouchPoints': 0,
        'navigator_hardwareConcurrency': 4,
        'navigator_cookieEnabled': True,
        'navigator_appCodeName': 'Mozilla',
        'navigator_appName': 'Netscape',
        'navigator_appVersion': common_headers['User-Agent'],
        'navigator_product': 'Gecko',
        'navigator_onLine': True,
        'navigator_deviceMemory': 8,
        'referer': '',
        'guid': get_guid(),
        'did': '10b16db8bc04b9b0ffc9ad9a78292a2d',
        'os': 'W'
    }

    r = json.dumps(r)
    r = re.sub(": ", ":", r)
    r = re.sub(', "', ',"', r)

    return base64.b64encode(r.encode()).decode()


def get_device():
    return str(random.random())[2:]


def get_s():
    """生成随机16位字符串"""

    def _():
        return str(hex((int((1 + random.random()) * 65536) | 0)))[3:]

    return _() + _() + _() + _()


def get_token(phone, device_id, device_ip):
    """获取token参数"""
    form_data = {
        'appId': app_id,
        'deviceType': device_type,
        'loginName': str(phone),
        'loginType': login_type,
        'deviceId': device_id,
        'deviceIp': device_ip
    }
    resp = fetch(token_url, method='post', data=form_data)
    return '' if resp is None else resp.json()['data']['token']


def get_js_object(js_file_path):
    """获取js可执行对象"""
    with open(js_file_path, encoding='GBK') as f:
        js_file = f.read()
        return execjs.compile(js_file)


pwd_encrypt_js = get_js_object(pwd_encrypt_js_path)
full_page_t1_js = get_js_object(full_page_t1_js_path)
full_page_w1_js = get_js_object(full_page_w1_js_path)
full_page_w2_js = get_js_object(full_page_w2_js_path)


def get_encrypt_pwd(pwd):
    """获取加密后的密码"""
    return pwd_encrypt_js.call('pwdEncrypt', pwd)


def get_full_page_t1(s):
    """获取fullpage的t1参数"""
    return full_page_t1_js.call('get_t', s)


def get_full_page_w1(gt, challenge, s):
    """获取fullpage的w1参数"""
    t = get_full_page_t1(s)
    return full_page_w1_js.call('get_w', gt, challenge, s, t)


def get_full_page_w2(gt, challenge, s):
    """获取fullpage的w2参数"""
    return full_page_w2_js.call('get_w', gt, challenge, s)


