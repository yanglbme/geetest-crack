# urls
token_url = 'https://paicc-core.pingan.com.cn/paicc-core-web/webapi/isShowImageVcode.do'
gt_register_url = 'https://paicc-core.pingan.com.cn/paicc-core-web/webapi/gt/register'
get_php_url = 'https://captcha-api.pingan.com/get.php'
ajax_php_url = 'https://captcha-api.pingan.com/ajax.php'
pc_login_url = 'https://paicc-core.pingan.com.cn/paicc-core-web/webapi/login.view?tabs=account&appId=16666'


# params
app_id = '16666'
device_type = 'web'
redirect_flag = ''
sign_type = ''
login_type = 'account'

# http
fetch_timeout = 5
common_headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/79.0.3945.117 Safari/537.36',
}

# js path
pwd_encrypt_js_path = './js/login_pwd_encrypt.js'
full_page_t1_js_path = './js/fullpage_t1.js'
full_page_w1_js_path = './js/fullpage_w1.js'
full_page_w2_js_path = './js/fullpage_w2.js'

# retrying
retry_max_number = 10
retry_min_random_wait = 1000  # ms
retry_max_random_wait = 5000  # ms

