function lmWn(e) {
    function msPE(e, t) {
        return e << t | e >>> 32 - t;
    }
    function nnAZ(e, t) {
        var r, n, i, o, a;
        i = e & 2147483648;
        o = t & 2147483648;
        r = e & 1073741824;
        n = t & 1073741824;
        a = (e & 1073741823) + (t & 1073741823);
        if (r & n) {
            return a ^ 2147483648 ^ i ^ o;
        }
        if (r | n) {
            if (a & 1073741824) {
                return a ^ 3221225472 ^ i ^ o;
            } else {
                return a ^ 1073741824 ^ i ^ o;
            }
        } else {
            return a ^ i ^ o;
        }
    }
    function F(e, t, r) {
        return e & t | ~e & r;
    }
    function G(e, t, r) {
        return e & r | t & ~r;
    }
    function H(e, t, r) {
        return e ^ t ^ r;
    }
    function I(e, t, r) {
        return t ^ (e | ~r);
    }
    function FF(e, t, r, n, i, o, a) {
        e = nnAZ(e, nnAZ(nnAZ(F(t, r, n), i), a));
        return nnAZ(msPE(e, o), t);
    }
    function GG(e, t, r, n, i, o, a) {
        e = nnAZ(e, nnAZ(nnAZ(G(t, r, n), i), a));
        return nnAZ(msPE(e, o), t);
    }
    function HH(e, t, r, n, i, o, a) {
        e = nnAZ(e, nnAZ(nnAZ(H(t, r, n), i), a));
        return nnAZ(msPE(e, o), t);
    }
    function II(e, t, r, n, i, o, a) {
        e = nnAZ(e, nnAZ(nnAZ(I(t, r, n), i), a));
        return nnAZ(msPE(e, o), t);
    }
    function oGQV(e) {
        var t;
        var r = e["length"];
        var n = r + 8;
        var i = (n - n % 64) / 64;
        var o = (i + 1) * 16;
        var a = Array(o - 1);
        var s = 0;
        var u = 0;
        while (u < r) {
            t = (u - u % 4) / 4;
            s = u % 4 * 8;
            a[t] = a[t] | e["charCodeAt"](u) << s;
            u++;
        }
        t = (u - u % 4) / 4;
        s = u % 4 * 8;
        a[t] = a[t] | 128 << s;
        a[o - 2] = r << 3;
        a[o - 1] = r >>> 29;
        return a;
    }
    function phVF(e) {
        var t = "", r = "", n, i;
        for (i = 0; i <= 3; i++) {
            n = e >>> i * 8 & 255;
            r = "0" + n["toString"](16);
            t = t + r["substr"](r["length"] - 2, 2);
        }
        return t;
    }
    function qVzD(e) {
        e = e["replace"](/\r\n/g, "");
        var t = "";
        for (var r = 0; r < e["length"]; r++) {
            var n = e["charCodeAt"](r);
            if (n < 128) {
                t += String["fromCharCode"](n);
            } else if (n > 127 && n < 2048) {
                t += String["fromCharCode"](n >> 6 | 192);
                t += String["fromCharCode"](n & 63 | 128);
            } else {
                t += String["fromCharCode"](n >> 12 | 224);
                t += String["fromCharCode"](n >> 6 & 63 | 128);
                t += String["fromCharCode"](n & 63 | 128);
            }
        }
        return t;
    }
    var t = [];
    var r, n, i, o, a, s, u, c, f;
    var _ = 7
      , l = 12
      , h = 17
      , d = 22;
    var v = 5
      , p = 9
      , g = 14
      , m = 20;
    var w = 4
      , y = 11
      , b = 16
      , E = 23;
    var S = 6
      , C = 10
      , T = 15
      , x = 21;
    e = qVzD(e);
    t = oGQV(e);
    s = 1732584193;
    u = 4023233417;
    c = 2562383102;
    f = 271733878;
    for (r = 0; r < t["length"]; r += 16) {
        n = s;
        i = u;
        o = c;
        a = f;
        s = FF(s, u, c, f, t[r + 0], _, 3614090360);
        f = FF(f, s, u, c, t[r + 1], l, 3905402710);
        c = FF(c, f, s, u, t[r + 2], h, 606105819);
        u = FF(u, c, f, s, t[r + 3], d, 3250441966);
        s = FF(s, u, c, f, t[r + 4], _, 4118548399);
        f = FF(f, s, u, c, t[r + 5], l, 1200080426);
        c = FF(c, f, s, u, t[r + 6], h, 2821735955);
        u = FF(u, c, f, s, t[r + 7], d, 4249261313);
        s = FF(s, u, c, f, t[r + 8], _, 1770035416);
        f = FF(f, s, u, c, t[r + 9], l, 2336552879);
        c = FF(c, f, s, u, t[r + 10], h, 4294925233);
        u = FF(u, c, f, s, t[r + 11], d, 2304563134);
        s = FF(s, u, c, f, t[r + 12], _, 1804603682);
        f = FF(f, s, u, c, t[r + 13], l, 4254626195);
        c = FF(c, f, s, u, t[r + 14], h, 2792965006);
        u = FF(u, c, f, s, t[r + 15], d, 1236535329);
        s = GG(s, u, c, f, t[r + 1], v, 4129170786);
        f = GG(f, s, u, c, t[r + 6], p, 3225465664);
        c = GG(c, f, s, u, t[r + 11], g, 643717713);
        u = GG(u, c, f, s, t[r + 0], m, 3921069994);
        s = GG(s, u, c, f, t[r + 5], v, 3593408605);
        f = GG(f, s, u, c, t[r + 10], p, 38016083);
        c = GG(c, f, s, u, t[r + 15], g, 3634488961);
        u = GG(u, c, f, s, t[r + 4], m, 3889429448);
        s = GG(s, u, c, f, t[r + 9], v, 568446438);
        f = GG(f, s, u, c, t[r + 14], p, 3275163606);
        c = GG(c, f, s, u, t[r + 3], g, 4107603335);
        u = GG(u, c, f, s, t[r + 8], m, 1163531501);
        s = GG(s, u, c, f, t[r + 13], v, 2850285829);
        f = GG(f, s, u, c, t[r + 2], p, 4243563512);
        c = GG(c, f, s, u, t[r + 7], g, 1735328473);
        u = GG(u, c, f, s, t[r + 12], m, 2368359562);
        s = HH(s, u, c, f, t[r + 5], w, 4294588738);
        f = HH(f, s, u, c, t[r + 8], y, 2272392833);
        c = HH(c, f, s, u, t[r + 11], b, 1839030562);
        u = HH(u, c, f, s, t[r + 14], E, 4259657740);
        s = HH(s, u, c, f, t[r + 1], w, 2763975236);
        f = HH(f, s, u, c, t[r + 4], y, 1272893353);
        c = HH(c, f, s, u, t[r + 7], b, 4139469664);
        u = HH(u, c, f, s, t[r + 10], E, 3200236656);
        s = HH(s, u, c, f, t[r + 13], w, 681279174);
        f = HH(f, s, u, c, t[r + 0], y, 3936430074);
        c = HH(c, f, s, u, t[r + 3], b, 3572445317);
        u = HH(u, c, f, s, t[r + 6], E, 76029189);
        s = HH(s, u, c, f, t[r + 9], w, 3654602809);
        f = HH(f, s, u, c, t[r + 12], y, 3873151461);
        c = HH(c, f, s, u, t[r + 15], b, 530742520);
        u = HH(u, c, f, s, t[r + 2], E, 3299628645);
        s = II(s, u, c, f, t[r + 0], S, 4096336452);
        f = II(f, s, u, c, t[r + 7], C, 1126891415);
        c = II(c, f, s, u, t[r + 14], T, 2878612391);
        u = II(u, c, f, s, t[r + 5], x, 4237533241);
        s = II(s, u, c, f, t[r + 12], S, 1700485571);
        f = II(f, s, u, c, t[r + 3], C, 2399980690);
        c = II(c, f, s, u, t[r + 10], T, 4293915773);
        u = II(u, c, f, s, t[r + 1], x, 2240044497);
        s = II(s, u, c, f, t[r + 8], S, 1873313359);
        f = II(f, s, u, c, t[r + 15], C, 4264355552);
        c = II(c, f, s, u, t[r + 6], T, 2734768916);
        u = II(u, c, f, s, t[r + 13], x, 1309151649);
        s = II(s, u, c, f, t[r + 4], S, 4149444226);
        f = II(f, s, u, c, t[r + 11], C, 3174756917);
        c = II(c, f, s, u, t[r + 2], T, 718787259);
        u = II(u, c, f, s, t[r + 9], x, 3951481745);
        s = nnAZ(s, n);
        u = nnAZ(u, i);
        c = nnAZ(c, o);
        f = nnAZ(f, a);
    }
    var A = phVF(s) + phVF(u) + phVF(c) + phVF(f);
    return A["toLowerCase"]();
}

function getUserResponse(e, t) {
    // func_name: dtwY(e, t)
    // e:?????????x??,
    // t:challenge
    var r = t.slice(32);
    var n = [];
    for (var i = 0; i < r.length; i++) {
        var o = r.charCodeAt(i);
        n[i] = o > 57 ? o - 87 : o - 48;
    }
    r = n[0] * 36 + n[1];
    var a = Math.round(e) + r;
    
    var t = t.slice(0, 32);
    var s = [[], [], [], [], []];
    var u = {};
    var c = 0;
    var f;
    var i = 0;
    for (var _ = t.length; i < _; i++) {
        f = t.charAt(i);
        if (!u[f]) {
            u[f] = 1;
            s[c].push(f);
            c++;
            c = c == 5 ? 0 : c;
        }
    }

    var l = a, h, d = 4;
    var v = "";
    var p = [1, 2, 5, 10, 50];
    while (l > 0) {
        if (l - p[d] >= 0) {
            h = parseInt(Math.random() * s[d].length, 10);
            // h = 2; 
            v = v + s[d][h];
            l = l - p[d];
        } else {
            s.splice(d, 1);
            p.splice(d, 1);
            d = d - 1;
        }
    }
    return v;
}

function mouse_encrypt(e) {
    var i = [], o = [], a = [];
    // ??§Õ???????????
    function func_1(e) {
        var t = [];
        var r = 0;
        var n, i, o;
        for (var a = 0, s = e.length - 1; a < s; a++) {
            n = Math.round(e[a + 1][0] - e[a][0]);
            i = Math.round(e[a + 1][1] - e[a][1]);
            o = Math.round(e[a + 1][2] - e[a][2]);
            if (n == 0 && i == 0 && o == 0) {
                continue;
            }
            if (n == 0 && i == 0) {
                r += o;
            } else {
                t.push([n, i, o + r]);
                r = 0;
            }
        }
        if (r !== 0) {
            t.push([n, i, r]);
        }
        return t;
    }
    function func_2(e) {
        var t = "()*,-./0123456789:?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqr";
        var r = t.length;
        var n = "";
        var i = Math.abs(e);
        var o = parseInt(i / r);
        if (o >= r) {
            o = r - 1;
        }
        if (o) {
            n = t.charAt(o);
        }
        i = i % r;
        var a = "";
        if (e < 0) {
            a += "!";
        }
        if (n) {
            a += "$";
        }
        return a + n + t.charAt(i);
    }
    function func_3(e) {
        var t = [[1, 0], [2, 0], [1, -1], [1, 1], [0, 1], [0, -1], [3, 0], [2, -1], [2, 1]];
        var r = "stuvwxyz~";
        for (var n = 0, i = t.length; n < i; n++) {
            if (e[0] == t[n][0] && e[1] == t[n][1]) {
                return r[n];
            }
        }
        return 0;
    }
    function encrypto(e) {
        var t = func_3(e);
        if (!t) {
            i["push"](func_2(e[0]));
            o["push"](func_2(e[1]));
        } else {
            o["push"](t);
        }
        a["push"](func_2(e[2]));
        return i, o, a;
    }

    var result1 = func_1(e);
    result1.map(encrypto);
    return i.join("") + "!!" + o.join("") + "!!" + a.join("");
}
