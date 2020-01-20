import requests
from requests import Response
from retrying import retry

from geetest_crack.config import retry_max_number, retry_min_random_wait, retry_max_random_wait, fetch_timeout


def need_retry(exception):
    result = isinstance(exception, (requests.ConnectionError, requests.ReadTimeout))
    if result:
        print('Exception', type(exception), 'occurred, retrying...')
    return result


def fetch(session, url, method='get', **kwargs):
    @retry(stop_max_attempt_number=retry_max_number, wait_random_min=retry_min_random_wait,
           wait_random_max=retry_max_random_wait, retry_on_exception=need_retry)
    def _fetch(session, url, **kwargs) -> Response:
        # kwargs.update({'verify': False})
        kwargs.update({'timeout': fetch_timeout})
        response = session.post(url, **kwargs) if method == 'post' else session.get(url, **kwargs)
        if response.status_code != 200:
            raise requests.ConnectionError('Expected status code 200, but got {}'.format(response.status_code))
        return response

    try:
        resp = _fetch(session, url, **kwargs)
        return resp
    except (requests.ConnectionError, requests.ReadTimeout):
        return None
