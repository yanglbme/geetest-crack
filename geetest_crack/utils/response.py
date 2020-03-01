from enum import Enum, unique


@unique
class Resp(Enum):
    SUCCESS = 0
    WRONG_NAME_OR_PWD = 1
    TIMEOUT = 2
    SLIDE_ERR = 3
    TRACK_ERR = 4
    ILLEGAL_ERR = 5
    UNKNOWN_ERR = 6
