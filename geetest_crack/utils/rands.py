import random


def s():
    """生成随机16位字符串"""
    def _():
        return str(hex((int((1 + random.random()) * 65536) | 0)))[3:]
    return _() + _() + _() + _()
