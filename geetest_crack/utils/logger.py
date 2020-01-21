import logging
import sys

DEFAULT_LOG_LEVEL = logging.INFO  # 默认等级
DEFAULT_LOG_FMT = '%(asctime)s %(filename)s [line:%(lineno)d] %(levelname)s: %(message)s'  # 默认日志格式
DEFAULT_LOG_DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S'  # 默认时间格式
DEFAULT_LOG_FILENAME = 'request_1_2.bin'  # 默认日志文件名称


class Logger:
    def __init__(self):
        self._logger = logging.getLogger()
        if not self._logger.handlers:
            self.formatter = logging.Formatter(fmt=DEFAULT_LOG_FMT, datefmt=DEFAULT_LOG_DATETIME_FORMAT)
            # 设置文件日志模式
            # self._logger.addHandler(self._get_file_handler(DEFAULT_LOG_FILENAME))
            # 设置终端日志模式
            self._logger.addHandler(self._get_console_handler())
            # 设置日志等级
            self._logger.setLevel(DEFAULT_LOG_LEVEL)

    def _get_file_handler(self, filename):
        """返回一个文件日志handler"""
        file_handler = logging.FileHandler(filename=filename, encoding='utf-8')
        file_handler.setFormatter(self.formatter)
        return file_handler

    def _get_console_handler(self):
        """返回一个输出到终端日志handler"""
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setFormatter(self.formatter)
        return console_handler

    @property
    def logger(self):
        return self._logger


logger = Logger().logger
