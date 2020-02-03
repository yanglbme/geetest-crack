function get_w(gt, challenge, s, t) {

    var GxkI = {
        "BtcL": {
            "CWUe": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()",
            "Dkuz": ".",
            "EutS": 7274496,
            "FV_o": 9483264,
            "GYjg": 19220,
            "Hjhi": 235,
            "IPBn": 24
        },
        "CWUe": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()",
        "Dkuz": ".",
        "EutS": 7274496,
        "FV_o": 9483264,
        "GYjg": 19220,
        "Hjhi": 235,
        "IPBn": 24,
        "JCue": function (e) {
            var t = [];
            for (var r = 0, n = e["length"]; r < n; r += 1) {
                t["push"](e["charCodeAt"](r));
            }
            return t;
        },
        "KplX": function (e) {
            var t = "";
            for (var r = 0, n = e["length"]; r < n; r += 1) {
                t += String["fromCharCode"](e[r]);
            }
            return t;
        },
        "LZaU": function (e) {
            var t = this["CWUe"];
            if (e < 0 || e >= t["length"]) {
                return ".";
            }
            return t["charAt"](e);
        },
        "MkZl": function (e) {
            var t = this["CWUe"];
            return t["indexOf"](e);
        },
        "NyXA": function (e, t) {
            return e >> t & 1;
        },
        "Omvq": function (e, i) {
            var a = this;
            if (!i) {
                i = a;
            }

            function t(e, t) {
                var r = 0;
                for (var n = i["IPBn"] - 1; n >= 0; n -= 1) {
                    if (a["NyXA"](t, n) === 1) {
                        r = (r << 1) + a["NyXA"](e, n);
                    }
                }
                return r;
            }

            var r = ""
                , n = "";
            var o = e["length"];
            for (var s = 0; s < o; s += 3) {
                var c;
                if (s + 2 < o) {
                    c = (e[s] << 16) + (e[s + 1] << 8) + e[s + 2];
                    r += a["LZaU"](t(c, i["EutS"])) + a["LZaU"](t(c, i["FV_o"])) + a["LZaU"](t(c, i["GYjg"])) + a["LZaU"](t(c, i["Hjhi"]));
                } else {
                    var u = o % 3;
                    if (u === 2) {
                        c = (e[s] << 16) + (e[s + 1] << 8);
                        r += a["LZaU"](t(c, i["EutS"])) + a["LZaU"](t(c, i["FV_o"])) + a["LZaU"](t(c, i["GYjg"]));
                        n = i["Dkuz"];
                    } else if (u === 1) {
                        c = e[s] << 16;
                        r += a["LZaU"](t(c, i["EutS"])) + a["LZaU"](t(c, i["FV_o"]));
                        n = i["Dkuz"] + i["Dkuz"];
                    }
                }
            }
            return {
                "res": r,
                "end": n
            };
        },
        "PwRX": function (e) {
            var t = this;
            var r = t["Omvq"](t["JCue"](e));
            return r["res"] + r["end"];
        },
        "QLsv": function (e) {
            var t = this;
            var r = t["Omvq"](e);
            return r["res"] + r["end"];
        },
        "RarB": function (e, a) {
            var o = this;
            if (!a) {
                a = o;
            }

            function t(e, t) {
                if (e < 0) {
                    return 0;
                }
                var r = 5;
                var n = 0;
                for (var i = a["IPBn"] - 1; i >= 0; i -= 1) {
                    if (o["NyXA"](t, i) === 1) {
                        n += o["NyXA"](e, r) << i;
                        r -= 1;
                    }
                }
                return n;
            }

            var r = e["length"];
            var n = "";
            for (var i = 0; i < r; i += 4) {
                var s = t(o["MkZl"](e["charAt"](i)), a["EutS"]) + t(o["MkZl"](e["charAt"](i + 1)), a["FV_o"]) + t(o["MkZl"](e["charAt"](i + 2)), a["GYjg"]) + t(o["MkZl"](e["charAt"](i + 3)), a["Hjhi"]);
                var c = s >> 16 & 255;
                n += String["fromCharCode"](c);
                if (e["charAt"](i + 2) !== a["Dkuz"]) {
                    var u = s >> 8 & 255;
                    n += String["fromCharCode"](u);
                    if (e["charAt"](i + 3) !== a["Dkuz"]) {
                        var l = s & 255;
                        n += String["fromCharCode"](l);
                    }
                }
            }
            return n;
        },
        "SJjt": function (e) {
            var t = this;
            var r = 4 - e["length"] % 4;
            if (r < 4) {
                for (var n = 0; n < r; n += 1) {
                    e += t["Dkuz"];
                }
            }
            return t["RarB"](e);
        },
        "TIsR": function (e) {
            var t = this;
            return t["SJjt"](e);
        }
    };

    function vUUf() {
        var r = Object["create"] || function () {
            function F() {
            }

            return function (e) {
                var t;
                F["prototype"] = e;
                t = new F();
                F["prototype"] = null;
                return t;
            }
                ;
        }();
        var e = {};
        var t = e["lib"] = {};
        var n = t["Base"] = function () {
            return {
                "RAIS": function (e) {
                    var t = r(this);
                    if (e) {
                        t["mixIn"](e);
                    }
                    if (!t["hasOwnProperty"]("init") || this["init"] === t["init"]) {
                        t["init"] = function () {
                            t["$super"]["init"]["apply"](this, arguments);
                        }
                        ;
                    }
                    t["init"]["prototype"] = t;
                    t["$super"] = this;
                    return t;
                },
                "create": function () {
                    var e = this["RAIS"]();
                    e["init"]["apply"](e, arguments);
                    return e;
                },
                "init": function () {
                },
                "mixIn": function (e) {
                    for (var t in e) {
                        if (e["hasOwnProperty"](t)) {
                            this[t] = e[t];
                        }
                    }
                    if (e["hasOwnProperty"]("toString")) {
                        this["toString"] = e["toString"];
                    }
                }
            };
        }();
        var f = t["WordArray"] = n["RAIS"]({
            "init": function (e, t) {
                e = this["words"] = e || [];
                if (t != undefined) {
                    this["sigBytes"] = t;
                } else {
                    this["sigBytes"] = e["length"] * 4;
                }
            },
            "concat": function (e) {
                var t = this["words"];
                var r = e["words"];
                var n = this["sigBytes"];
                var i = e["sigBytes"];
                this["clamp"]();
                if (n % 4) {
                    for (var a = 0; a < i; a++) {
                        var o = r[a >>> 2] >>> 24 - a % 4 * 8 & 255;
                        t[n + a >>> 2] |= o << 24 - (n + a) % 4 * 8;
                    }
                } else {
                    for (var a = 0; a < i; a += 4) {
                        t[n + a >>> 2] = r[a >>> 2];
                    }
                }
                this["sigBytes"] += i;
                return this;
            },
            "clamp": function () {
                var e = this["words"];
                var t = this["sigBytes"];
                e[t >>> 2] &= 4294967295 << 32 - t % 4 * 8;
                e["length"] = Math["ceil"](t / 4);
            }
        });
        var i = e["enc"] = {};
        var _ = i["Latin1"] = {
            "parse": function (e) {
                var t = e["length"];
                var r = [];
                for (var n = 0; n < t; n++) {
                    r[n >>> 2] |= (e["charCodeAt"](n) & 255) << 24 - n % 4 * 8;
                }
                return new f[("init")](r, t);
            }
        };
        var a = i["Utf8"] = {
            "parse": function (e) {
                return _["parse"](unescape(encodeURIComponent(e)));
            }
        };
        var o = t["BufferedBlockAlgorithm"] = n["RAIS"]({
            "reset": function () {
                this["IBDR"] = new f[("init")]();
                this["aboq"] = 0;
            },
            "beSP": function (e) {
                if (typeof e == "string") {
                    e = a["parse"](e);
                }
                this["IBDR"]["concat"](e);
                this["aboq"] += e["sigBytes"];
            },
            "cVhj": function (e) {
                var t = this["IBDR"];
                var r = t["words"];
                var n = t["sigBytes"];
                var i = this["blockSize"];
                var a = i * 4;
                var o = n / a;
                if (e) {
                    o = Math["ceil"](o);
                } else {
                    o = Math["max"]((o | 0) - this["dIWA"], 0);
                }
                var s = o * i;
                var c = Math["min"](s * 4, n);
                if (s) {
                    for (var u = 0; u < s; u += i) {
                        this["etNa"](r, u);
                    }
                    var l = r["splice"](0, s);
                    t["sigBytes"] -= c;
                }
                return new f[("init")](l, c);
            },
            "dIWA": 0
        });
        var s = e["algo"] = {};
        var c = t["Cipher"] = o["RAIS"]({
            "cfg": n["RAIS"](),
            "createEncryptor": function (e, t) {
                return this["create"](this["fUWQ"], e, t);
            },
            "init": function (e, t, r) {
                this["cfg"] = this["cfg"]["RAIS"](r);
                this["gOzX"] = e;
                this["hN_h"] = t;
                this["reset"]();
            },
            "reset": function () {
                o["reset"]["call"](this);
                this["ieEa"]();
            },
            "process": function (e) {
                this["beSP"](e);
                return this["cVhj"]();
            },
            "finalize": function (e) {
                if (e) {
                    this["beSP"](e);
                }
                var t = this["jvF_"]();
                return t;
            },
            "keySize": 128 / 32,
            "ivSize": 128 / 32,
            "fUWQ": 1,
            "kqYl": 2,
            "lFmq": function () {
                return function (u) {
                    var l = 0
                        , f = [];
                    return {
                        "encrypt": function (e, t, r) {
                            undefined;
                            var t = _["parse"](t);
                            if (!r || !r["iv"]) {
                                r = r || {};
                                r["iv"] = _["parse"]("0000000000000000");
                            }
                            var n = m["encrypt"](u, e, t, r);
                            undefined;
                            var i = n["ciphertext"]["words"];
                            undefined;
                            var a = n["ciphertext"]["sigBytes"];
                            l === 0 && f["push"](a);
                            l === 0 && f["push"](a);
                            l++;
                            f["push"](a);
                            a = f["shift"]();
                            var o = [];
                            for (var s = 0; s < a; s++) {
                                var c = i[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                                o["push"](c);
                            }
                            return o;
                        },
                        "encrypt1": function (e, t, r) {
                            var t = _["parse"](t);
                            if (!r || !r["iv"]) {
                                r = r || {};
                                r["iv"] = _["parse"]("0000000000000000");
                            }
                            var n = m["encrypt"](u, e, t, r);
                            var i = n["ciphertext"]["words"];
                            var a = n["ciphertext"]["sigBytes"];
                            var o = [];
                            for (var s = 0; s < a; s++) {
                                var c = i[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                                o["push"](c);
                            }
                            return o;
                        }
                    };
                }
                    ;
            }()
        });
        var u = e["mode"] = {};
        var l = t["BlockCipherMode"] = n["RAIS"]({
            "createEncryptor": function (e, t) {
                return this["Encryptor"]["create"](e, t);
            },
            "init": function (e, t) {
                this["mvyv"] = e;
                this["nvgX"] = t;
            }
        });
        var h = u["CBC"] = function () {
            var e = l["RAIS"]();
            e["Encryptor"] = e["RAIS"]({
                "processBlock": function (e, t) {
                    var r = this["mvyv"];
                    var n = r["blockSize"];
                    wxls["call"](this, e, t, n);
                    r["encryptBlock"](e, t);
                    this["oToE"] = e["slice"](t, t + n);
                }
            });

            function wxls(e, t, r) {
                var n = this["nvgX"];
                if (n) {
                    var i = n;
                    this["nvgX"] = undefined;
                } else {
                    var i = this["oToE"];
                }
                for (var a = 0; a < r; a++) {
                    e[t + a] ^= i[a];
                }
            }

            return e;
        }();
        var d = e["pad"] = {};
        var p = d["Pkcs7"] = {
            "pad": function (e, t) {
                var r = t * 4;
                var n = r - e["sigBytes"] % r;
                var i = n << 24 | n << 16 | n << 8 | n;
                var a = [];
                for (var o = 0; o < n; o += 4) {
                    a["push"](i);
                }
                var s = f["create"](a, n);
                e["concat"](s);
            }
        };
        var v = t["BlockCipher"] = c["RAIS"]({
            "cfg": c["cfg"]["RAIS"]({
                "mode": h,
                "padding": p
            }),
            "reset": function () {
                c["reset"]["call"](this);
                var e = this["cfg"];
                var t = e["iv"];
                var r = e["mode"];
                if (this["gOzX"] == this["fUWQ"]) {
                    var n = r["createEncryptor"];
                }
                if (this["pxAj"] && this["pxAj"]["qFEO"] == n) {
                    this["pxAj"]["init"](this, t && t["words"]);
                } else {
                    this["pxAj"] = n["call"](r, this, t && t["words"]);
                    this["pxAj"]["qFEO"] = n;
                }
            },
            "etNa": function (e, t) {
                this["pxAj"]["processBlock"](e, t);
            },
            "jvF_": function () {
                var e = this["cfg"]["padding"];
                if (this["gOzX"] == this["fUWQ"]) {
                    e["pad"](this["IBDR"], this["blockSize"]);
                    var t = this["cVhj"](!!"flush");
                }
                return t;
            },
            "blockSize": 128 / 32
        });
        var g = t["CipherParams"] = n["RAIS"]({
            "init": function (e) {
                this["mixIn"](e);
            }
        });
        var m = t["SerializableCipher"] = n["RAIS"]({
            "cfg": n["RAIS"](),
            "encrypt": function (e, t, r, n) {
                n = this["cfg"]["RAIS"](n);
                var i = e["createEncryptor"](r, n);
                var a = i["finalize"](t);
                var o = i["cfg"];
                return g["create"]({
                    "ciphertext": a,
                    "key": r,
                    "iv": o["iv"],
                    "algorithm": e,
                    "mode": o["mode"],
                    "padding": o["padding"],
                    "blockSize": e["blockSize"],
                    "formatter": n["format"]
                });
            }
        });
        var E = [];
        var w = [];
        var y = [];
        var b = [];
        var T = [];
        var S = [];
        var A = [];
        var R = [];
        var x = [];
        var C = [];
        (function () {
            var e = [];
            for (var t = 0; t < 256; t++) {
                if (t < 128) {
                    e[t] = t << 1;
                } else {
                    e[t] = t << 1 ^ 283;
                }
            }
            var r = 0;
            var n = 0;
            for (var t = 0; t < 256; t++) {
                var i = n ^ n << 1 ^ n << 2 ^ n << 3 ^ n << 4;
                i = i >>> 8 ^ i & 255 ^ 99;
                E[r] = i;
                w[i] = r;
                var a = e[r];
                var o = e[a];
                var s = e[o];
                var c = e[i] * 257 ^ i * 16843008;
                y[r] = c << 24 | c >>> 8;
                b[r] = c << 16 | c >>> 16;
                T[r] = c << 8 | c >>> 24;
                S[r] = c;
                var c = s * 16843009 ^ o * 65537 ^ a * 257 ^ r * 16843008;
                A[i] = c << 24 | c >>> 8;
                R[i] = c << 16 | c >>> 16;
                x[i] = c << 8 | c >>> 24;
                C[i] = c;
                if (!r) {
                    r = n = 1;
                } else {
                    r = a ^ e[e[e[s ^ a]]];
                    n ^= e[e[n]];
                }
            }
        }());
        var I = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
        var D = s["AES"] = v["RAIS"]({
            "ieEa": function () {
                if (this["ryHV"] && this["ssZe"] === this["hN_h"]) {
                    return;
                }
                var e = this["ssZe"] = this["hN_h"];
                var t = e["words"];
                var r = e["sigBytes"] / 4;
                var n = this["ryHV"] = r + 6;
                var i = (n + 1) * 4;
                var a = this["tsou"] = [];
                for (var o = 0; o < i; o++) {
                    if (o < r) {
                        a[o] = t[o];
                    } else {
                        var s = a[o - 1];
                        if (!(o % r)) {
                            s = s << 8 | s >>> 24;
                            s = E[s >>> 24] << 24 | E[s >>> 16 & 255] << 16 | E[s >>> 8 & 255] << 8 | E[s & 255];
                            s ^= I[o / r | 0] << 24;
                        } else if (r > 6 && o % r == 4) {
                            s = E[s >>> 24] << 24 | E[s >>> 16 & 255] << 16 | E[s >>> 8 & 255] << 8 | E[s & 255];
                        }
                        a[o] = a[o - r] ^ s;
                    }
                }
                var c = this["urZV"] = [];
                for (var u = 0; u < i; u++) {
                    var o = i - u;
                    if (u % 4) {
                        var s = a[o];
                    } else {
                        var s = a[o - 4];
                    }
                    if (u < 4 || o <= 4) {
                        c[u] = s;
                    } else {
                        c[u] = A[E[s >>> 24]] ^ R[E[s >>> 16 & 255]] ^ x[E[s >>> 8 & 255]] ^ C[E[s & 255]];
                    }
                }
            },
            "encryptBlock": function (e, t) {
                this["vQBx"](e, t, this["tsou"], y, b, T, S, E);
            },
            "vQBx": function (e, t, r, n, i, a, o, s) {
                var c = this["ryHV"];
                var u = e[t] ^ r[0];
                var l = e[t + 1] ^ r[1];
                var f = e[t + 2] ^ r[2];
                var _ = e[t + 3] ^ r[3];
                var h = 4;
                for (var d = 1; d < c; d++) {
                    var p = n[u >>> 24] ^ i[l >>> 16 & 255] ^ a[f >>> 8 & 255] ^ o[_ & 255] ^ r[h++];
                    var v = n[l >>> 24] ^ i[f >>> 16 & 255] ^ a[_ >>> 8 & 255] ^ o[u & 255] ^ r[h++];
                    var g = n[f >>> 24] ^ i[_ >>> 16 & 255] ^ a[u >>> 8 & 255] ^ o[l & 255] ^ r[h++];
                    var m = n[_ >>> 24] ^ i[u >>> 16 & 255] ^ a[l >>> 8 & 255] ^ o[f & 255] ^ r[h++];
                    u = p;
                    l = v;
                    f = g;
                    _ = m;
                }
                var p = (s[u >>> 24] << 24 | s[l >>> 16 & 255] << 16 | s[f >>> 8 & 255] << 8 | s[_ & 255]) ^ r[h++];
                var v = (s[l >>> 24] << 24 | s[f >>> 16 & 255] << 16 | s[_ >>> 8 & 255] << 8 | s[u & 255]) ^ r[h++];
                var g = (s[f >>> 24] << 24 | s[_ >>> 16 & 255] << 16 | s[u >>> 8 & 255] << 8 | s[l & 255]) ^ r[h++];
                var m = (s[_ >>> 24] << 24 | s[u >>> 16 & 255] << 16 | s[l >>> 8 & 255] << 8 | s[f & 255]) ^ r[h++];
                e[t] = p;
                e[t + 1] = v;
                e[t + 2] = g;
                e[t + 3] = m;
            },
            "keySize": 256 / 32
        });
        e["AES"] = v["lFmq"](D);
        return e["AES"];
    }


    var ehwd = {
        "gt": gt,
        "challenge": challenge,
        "offline": false,
        "product": "popup",
        "width": "100%",
        "api_server": "captcha-api.pingan.com",
        "https": true,
        "protocol": "https://",
        "type": "fullpage",
        "fullpage": "/static/js/fullpage.pingan.1.3.js",
        "click": "/static/js/click.pingan.1.2.js",
        "slide": "/static/js/slide.pingan.1.2.js",
        "geetest": "/static/js/geetest.5.13.0.js",
        "static_servers": ["captcha-static.pingan.com"],
        "aspect_radio": {"slide": 103, "click": 128},
        "cc": 4,
        "ww": true,
        "i": _RCHD()
    };

    var r = vUUf()["encrypt1"](JSON.stringify(ehwd), s);
    var n = GxkI["QLsv"](r);
    return n + t;

    function _RCHD() {
        var r = {
            "LINK": 2,
            "STYLE": 1,
            "SCRIPT": 17,
            "INPUT": 9,
            "DIV": 33,
            "LABEL": 3,
            "IMG": 3,
            "UL": 1,
            "LI": 71,
            "SPAN": 1,
            "A": 3,
            "IFRAME": 1,
            "textLength": 5498,
            "HTMLLength": 15127,
            "documentMode": "CSS1Compat",
            "browserLanguage": "en-US",
            "browserLanguages": "en-US,zh,zh-CN",
            "devicePixelRatio": 2,
            "colorDepth": 24,
            "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36",
            "cookieEnabled": 1,
            "netEnabled": 1,
            "innerWidth": 377,
            "innerHeight": 826,
            "outerWidth": 1536,
            "outerHeight": 937,
            "screenWidth": 1536,
            "screenHeight": 960,
            "screenAvailWidth": 1536,
            "screenAvailHeight": 937,
            "screenLeft": 0,
            "screenTop": 23,
            "screenAvailLeft": 0,
            "screenAvailTop": 23,
            "localStorageEnabled": 1,
            "sessionStorageEnabled": 1,
            "indexedDBEnabled": 1,
            "platform": "MacIntel",
            "doNotTrack": 0,
            "timezone": -8,
            "canvas2DFP": "b2fe547f0bec5970946f825cd58e1b80",
            "canvas3DFP": "3c904c7550e442c22a5ad0d73a074672",
            "plugins": "internal-pdf-viewer,mhjfbmdgcfjbbpaeojofohoefgiehjai,internal-nacl-plugin",
            "maxTouchPoints": 0,
            "flashEnabled": -1,
            "javaEnabled": 0,
            "hardwareConcurrency": 16,
            "jsFonts": "",
            "mediaDevices": -1,
            "performanceTiming": "",
            "timestamp": 1578278143968,
            "st": "4e1052",
            "deviceorientation": false,
            "touchEvent": false,
            "internalip": "10.1.36.133"
        }

        r["plugins"] = "";
        r["performanceTiming"] = "-1,-1,0,3,0,0,14,1,8,3,17,17,24,552,552,559,-1,-1,-1,-1";

        function cvMr(e) {
            return typeof e === "undefined";
        };

        function fYAR() {
            var dsJN = ["A", "ARTICLE", "ASIDE", "AUDIO", "BASE", "BUTTON", "CANVAS", "CODE", "IFRAME", "IMG", "INPUT", "LABEL", "LINK", "NAV", "OBJECT", "OL", "PICTURE", "PRE", "SECTION", "SELECT", "SOURCE", "SPAN", "STYLE", "TABLE", "TEXTAREA", "VIDEO"];
            var epVj = ["DIV", "P", "UL", "LI", "SCRIPT"];
            var e = ["textLength", "HTMLLength", "documentMode"].concat(dsJN).concat(["screenLeft", "screenTop", "screenAvailLeft", "screenAvailTop", "innerWidth", "innerHeight", "outerWidth", "outerHeight", "browserLanguage", "browserLanguages", "systemLanguage", "devicePixelRatio", "colorDepth", "userAgent", "cookieEnabled", "netEnabled", "screenWidth", "screenHeight", "screenAvailWidth", "screenAvailHeight", "localStorageEnabled", "sessionStorageEnabled", "indexedDBEnabled", "CPUClass", "platform", "doNotTrack", "timezone", "canvas2DFP", "canvas3DFP", "plugins", "maxTouchPoints", "flashEnabled", "javaEnabled", "hardwareConcurrency", "jsFonts", "timestamp", "performanceTiming", "internalip", "mediaDevices"]).concat(epVj).concat(["deviceorientation", "touchEvent"]);
            e["push"]("st");
            return e;
        };

        function Kscp(e) {
            var t = this;
            var r = ["textLength", "HTMLLength", "documentMode", "A", "ARTICLE", "ASIDE", "AUDIO", "BASE", "BUTTON", "CANVAS", "CODE", "IFRAME", "IMG", "INPUT", "LABEL", "LINK", "NAV", "OBJECT", "OL", "PICTURE", "PRE", "SECTION", "SELECT", "SOURCE", "SPAN", "STYLE", "TABLE", "TEXTAREA", "VIDEO", "screenLeft", "screenTop", "screenAvailLeft", "screenAvailTop", "innerWidth", "innerHeight", "outerWidth", "outerHeight", "browserLanguage", "browserLanguages", "systemLanguage", "devicePixelRatio", "colorDepth", "userAgent", "cookieEnabled", "netEnabled", "screenWidth", "screenHeight", "screenAvailWidth", "screenAvailHeight", "localStorageEnabled", "sessionStorageEnabled", "indexedDBEnabled", "CPUClass", "platform", "doNotTrack", "timezone", "canvas2DFP", "canvas3DFP", "plugins", "maxTouchPoints", "flashEnabled", "javaEnabled", "hardwareConcurrency", "jsFonts", "timestamp", "performanceTiming", "internalip", "mediaDevices", "DIV", "P", "UL", "LI", "SCRIPT", "deviceorientation", "touchEvent", "st"]
            if (r["tgoe"]) {
                return r["tgoe"](e);
            }
            var n = [];
            for (var i = 0, a = r.length; i < a; i = i + 1) {
                n[i] = e(r[i], i, t);
            }
            return n;
        };
        r["timestamp"] = new Date().getTime();
        var e = 1e6
            , t = Math.random() * e * 9;
        t += e;
        r["st"] = Math.round(t).toString(16);
        var n = [];
        Kscp(function (e) {
            var t = r[e];
            n.push(cvMr(t) ? -1 : t);
        });
        return {
            "n": n["join"]("!!"),
            "i": n["join"]("magic data")
        };
    }
}