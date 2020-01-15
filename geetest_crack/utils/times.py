import time


def now_int():
    return round(time.time() * 1000)


def now_str():
    return str(now_int())
