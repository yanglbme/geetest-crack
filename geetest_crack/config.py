# urls
gt_register_url = 'https://paicc-core.pingan.com.cn/paicc-core-web/webapi/gt/register'
get_php_url = 'https://captcha-api.pingan.com/get.php'

# http
fetch_timeout = 5
common_headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/79.0.3945.117 Safari/537.36',
}

# retrying
retry_max_number = 10
retry_min_random_wait = 1000  # ms
retry_max_random_wait = 5000  # ms
