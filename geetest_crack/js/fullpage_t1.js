function get_t(sstr) {
    window = {};

    var vwBb = function () {
        function wQsQ() {
            this["i"] = 0;
            this["j"] = 0;
            this["S"] = [];
        }
        function xkoz(e) {
            var t, r, n;
            for (t = 0; t < 256; ++t)
                this["S"][t] = t;
            r = 0;
            for (t = 0; t < 256; ++t) {
                r = r + this["S"][t] + e[t % e["length"]] & 255;
                n = this["S"][t];
                this["S"][t] = this["S"][r];
                this["S"][r] = n;
            }
            this["i"] = 0;
            this["j"] = 0;
        }
        function yozv() {
            var e;
            this["i"] = this["i"] + 1 & 255;
            this["j"] = this["j"] + this["S"][this["i"]] & 255;
            e = this["S"][this["i"]];
            this["S"][this["i"]] = this["S"][this["j"]];
            this["S"][this["j"]] = e;
            return this["S"][e + this["S"][this["i"]] & 255];
        }
        wQsQ["prototype"]["init"] = xkoz;
        wQsQ["prototype"]["next"] = yozv;
        function AxEu() {
            return new wQsQ();
        }
        var n = 256;
        var t;
        var i;
        var a;
        if (i == null) {
            i = [];
            a = 0;
            var e;
            if (window["crypto"] && window["crypto"]["getRandomValues"]) {
                var r = new Uint32Array(256);
                window["crypto"]["getRandomValues"](r);
                for (e = 0; e < r["length"]; ++e)
                    i[a++] = r[e] & 255;
            }
            var o = 0;
            function s(e) {
                o = o || 0;
                if (o >= 256 || a >= n) {
                    if (window["removeEventListener"]) {
                        o = 0;
                        window["removeEventListener"]("mousemove", s, false);
                    } else if (window["detachEvent"]) {
                        o = 0;
                        window["detachEvent"]("onmousemove", s);
                    }
                    return;
                }
                try {
                    var t = e["x"] + e["y"];
                    i[a++] = t & 255;
                    o += 1;
                } catch (r) { }
            }
            if (window["addEventListener"])
                window["addEventListener"]("mousemove", s, false);
            else if (window["attachEvent"])
                window["attachEvent"]("onmousemove", s);
        }
        function Bxpm() {
            if (t == null) {
                t = AxEu();
                while (a < n) {
                    var e = Math["floor"](65536 * Math["random"]());
                    i[a++] = e & 255;
                }
                t["init"](i);
                for (a = 0; a < i["length"]; ++a)
                    i[a] = 0;
                a = 0;
            }
            return t["next"]();
        }
        function CQvy(e) {
            var t;
            for (t = 0; t < e["length"]; ++t)
                e[t] = Bxpm();
        }
        function DZdA() {
        }
        DZdA["prototype"]["nextBytes"] = CQvy;
        var c;
        var u = 0xdeadbeefcafe;
        var l = (u & 16777215) == 15715070;
        function ECgw(e, t, r) {
            if (e != null)
                if ("number" == typeof e)
                    this["fromNumber"](e, t, r);
                else if (t == null && "string" != typeof e)
                    this["fromString"](e, 256);
                else
                    this["fromString"](e, t);
        }
        function FfCQ() {
            return new ECgw(null);
        }
        function GfOf(e, t, r, n, i, a) {
            while (--a >= 0) {
                var o = t * this[e++] + r[n] + i;
                i = Math["floor"](o / 67108864);
                r[n++] = o & 67108863;
            }
            return i;
        }
        function HspZ(e, t, r, n, i, a) {
            var o = t & 32767
                , s = t >> 15;
            while (--a >= 0) {
                var c = this[e] & 32767;
                var u = this[e++] >> 15;
                var l = s * c + u * o;
                c = o * c + ((l & 32767) << 15) + r[n] + (i & 1073741823);
                i = (c >>> 30) + (l >>> 15) + s * u + (i >>> 30);
                r[n++] = c & 1073741823;
            }
            return i;
        }
        function IgTQ(e, t, r, n, i, a) {
            var o = t & 16383
                , s = t >> 14;
            while (--a >= 0) {
                var c = this[e] & 16383;
                var u = this[e++] >> 14;
                var l = s * c + u * o;
                c = o * c + ((l & 16383) << 14) + r[n] + i;
                i = (c >> 28) + (l >> 14) + s * u;
                r[n++] = c & 268435455;
            }
            return i;
        }
        ECgw["prototype"]["am"] = IgTQ;
        c = 28;

        ECgw["prototype"]["DB"] = c;
        ECgw["prototype"]["DM"] = (1 << c) - 1;
        ECgw["prototype"]["DV"] = 1 << c;
        var f = 52;
        ECgw["prototype"]["FV"] = Math["pow"](2, f);
        ECgw["prototype"]["F1"] = f - c;
        ECgw["prototype"]["F2"] = 2 * c - f;
        var _ = "0123456789abcdefghijklmnopqrstuvwxyz";
        var h = [];
        var d, p;
        d = "0"["charCodeAt"](0);
        for (p = 0; p <= 9; ++p)
            h[d++] = p;
        d = "a"["charCodeAt"](0);
        for (p = 10; p < 36; ++p)
            h[d++] = p;
        d = "A"["charCodeAt"](0);
        for (p = 10; p < 36; ++p)
            h[d++] = p;
        function JgdB(e) {
            return _["charAt"](e);
        }
        function KoqK(e, t) {
            var r = h[e["charCodeAt"](t)];
            return r == null ? -1 : r;
        }
        function LyUc(e) {
            for (var t = this["t"] - 1; t >= 0; --t)
                e[t] = this[t];
            e["t"] = this["t"];
            e["s"] = this["s"];
        }
        function MDPU(e) {
            this["t"] = 1;
            this["s"] = e < 0 ? -1 : 0;
            if (e > 0)
                this[0] = e;
            else if (e < -1)
                this[0] = e + this["DV"];
            else
                this["t"] = 0;
        }
        function NrhG(e) {
            var t = FfCQ();
            t["fromInt"](e);
            return t;
        }
        function OEWn(e, t) {
            var r;
            if (t == 16)
                r = 4;
            else if (t == 8)
                r = 3;
            else if (t == 256)
                r = 8;
            else if (t == 2)
                r = 1;
            else if (t == 32)
                r = 5;
            else if (t == 4)
                r = 2;
            else {
                this["fromRadix"](e, t);
                return;
            }
            this["t"] = 0;
            this["s"] = 0;
            var n = e["length"]
                , i = false
                , a = 0;
            while (--n >= 0) {
                var o = r == 8 ? e[n] & 255 : KoqK(e, n);
                if (o < 0) {
                    if (e["charAt"](n) == "-")
                        i = true;
                    continue;
                }
                i = false;
                if (a == 0)
                    this[this["t"]++] = o;
                else if (a + r > this["DB"]) {
                    this[this["t"] - 1] |= (o & (1 << this["DB"] - a) - 1) << a;
                    this[this["t"]++] = o >> this["DB"] - a;
                } else
                    this[this["t"] - 1] |= o << a;
                a += r;
                if (a >= this["DB"])
                    a -= this["DB"];
            }
            if (r == 8 && (e[0] & 128) != 0) {
                this["s"] = -1;
                if (a > 0)
                    this[this["t"] - 1] |= (1 << this["DB"] - a) - 1 << a;
            }
            this["clamp"]();
            if (i)
                ECgw["ZERO"]["subTo"](this, this);
        }
        function PrRe() {
            var e = this["s"] & this["DM"];
            while (this["t"] > 0 && this[this["t"] - 1] == e)
                --this["t"];
        }
        function Qkzj(e) {
            if (this["s"] < 0)
                return "-" + this["negate"]()["toString"](e);
            var t;
            if (e == 16)
                t = 4;
            else if (e == 8)
                t = 3;
            else if (e == 2)
                t = 1;
            else if (e == 32)
                t = 5;
            else if (e == 4)
                t = 2;
            else
                return this["toRadix"](e);
            var r = (1 << t) - 1, n, i = false, a = "", o = this["t"];
            var s = this["DB"] - o * this["DB"] % t;
            if (o-- > 0) {
                if (s < this["DB"] && (n = this[o] >> s) > 0) {
                    i = true;
                    a = JgdB(n);
                }
                while (o >= 0) {
                    if (s < t) {
                        n = (this[o] & (1 << s) - 1) << t - s;
                        n |= this[--o] >> (s += this["DB"] - t);
                    } else {
                        n = this[o] >> (s -= t) & r;
                        if (s <= 0) {
                            s += this["DB"];
                            --o;
                        }
                    }
                    if (n > 0)
                        i = true;
                    if (i)
                        a += JgdB(n);
                }
            }
            return i ? a : "0";
        }
        function RjsS() {
            var e = FfCQ();
            ECgw["ZERO"]["subTo"](this, e);
            return e;
        }
        function SXeD() {
            return this["s"] < 0 ? this["negate"]() : this;
        }
        function TQCz(e) {
            var t = this["s"] - e["s"];
            if (t != 0)
                return t;
            var r = this["t"];
            t = r - e["t"];
            if (t != 0)
                return this["s"] < 0 ? -t : t;
            while (--r >= 0)
                if ((t = this[r] - e[r]) != 0)
                    return t;
            return 0;
        }
        function UyZO(e) {
            var t = 1, r;
            if ((r = e >>> 16) != 0) {
                e = r;
                t += 16;
            }
            if ((r = e >> 8) != 0) {
                e = r;
                t += 8;
            }
            if ((r = e >> 4) != 0) {
                e = r;
                t += 4;
            }
            if ((r = e >> 2) != 0) {
                e = r;
                t += 2;
            }
            if ((r = e >> 1) != 0) {
                e = r;
                t += 1;
            }
            return t;
        }
        function VHpY() {
            if (this["t"] <= 0)
                return 0;
            return this["DB"] * (this["t"] - 1) + UyZO(this[this["t"] - 1] ^ this["s"] & this["DM"]);
        }
        function Wacq(e, t) {
            var r;
            for (r = this["t"] - 1; r >= 0; --r)
                t[r + e] = this[r];
            for (r = e - 1; r >= 0; --r)
                t[r] = 0;
            t["t"] = this["t"] + e;
            t["s"] = this["s"];
        }
        function XMQd(e, t) {
            for (var r = e; r < this["t"]; ++r)
                t[r - e] = this[r];
            t["t"] = Math["max"](this["t"] - e, 0);
            t["s"] = this["s"];
        }
        function YZCv(e, t) {
            var r = e % this["DB"];
            var n = this["DB"] - r;
            var i = (1 << n) - 1;
            var a = Math["floor"](e / this["DB"]), o = this["s"] << r & this["DM"], s;
            for (s = this["t"] - 1; s >= 0; --s) {
                t[s + a + 1] = this[s] >> n | o;
                o = (this[s] & i) << r;
            }
            for (s = a - 1; s >= 0; --s)
                t[s] = 0;
            t[a] = o;
            t["t"] = this["t"] + a + 1;
            t["s"] = this["s"];
            t["clamp"]();
        }
        function ZFYE(e, t) {
            t["s"] = this["s"];
            var r = Math["floor"](e / this["DB"]);
            if (r >= this["t"]) {
                t["t"] = 0;
                return;
            }
            var n = e % this["DB"];
            var i = this["DB"] - n;
            var a = (1 << n) - 1;
            t[0] = this[r] >> n;
            for (var o = r + 1; o < this["t"]; ++o) {
                t[o - r - 1] |= (this[o] & a) << i;
                t[o - r] = this[o] >> n;
            }
            if (n > 0)
                t[this["t"] - r - 1] |= (this["s"] & a) << i;
            t["t"] = this["t"] - r;
            t["clamp"]();
        }
        function akDh(e, t) {
            var r = 0
                , n = 0
                , i = Math["min"](e["t"], this["t"]);
            while (r < i) {
                n += this[r] - e[r];
                t[r++] = n & this["DM"];
                n >>= this["DB"];
            }
            if (e["t"] < this["t"]) {
                n -= e["s"];
                while (r < this["t"]) {
                    n += this[r];
                    t[r++] = n & this["DM"];
                    n >>= this["DB"];
                }
                n += this["s"];
            } else {
                n += this["s"];
                while (r < e["t"]) {
                    n -= e[r];
                    t[r++] = n & this["DM"];
                    n >>= this["DB"];
                }
                n -= e["s"];
            }
            t["s"] = n < 0 ? -1 : 0;
            if (n < -1)
                t[r++] = this["DV"] + n;
            else if (n > 0)
                t[r++] = n;
            t["t"] = r;
            t["clamp"]();
        }
        function bpSt(e, t) {
            var r = this["abs"]()
                , n = e["abs"]();
            var i = r["t"];
            t["t"] = i + n["t"];
            while (--i >= 0)
                t[i] = 0;
            for (i = 0; i < n["t"]; ++i)
                t[i + r["t"]] = r["am"](0, n[i], t, i, 0, r["t"]);
            t["s"] = 0;
            t["clamp"]();
            if (this["s"] != e["s"])
                ECgw["ZERO"]["subTo"](t, t);
        }

        function ceLN(e) {
            var t = this["abs"]();
            var r = e["t"] = 2 * t["t"];
            while (--r >= 0)
                e[r] = 0;
            for (r = 0; r < t["t"] - 1; ++r) {
                var n = t["am"](r, t[r], e, 2 * r, 0, 1);
                if ((e[r + t["t"]] += t["am"](r + 1, 2 * t[r], e, 2 * r + 1, n, t["t"] - r - 1)) >= t["DV"]) {
                    e[r + t["t"]] -= t["DV"];
                    e[r + t["t"] + 1] = 1;
                }
            }
            if (e["t"] > 0)
                e[e["t"] - 1] += t["am"](r, t[r], e, 2 * r, 0, 1);
            e["s"] = 0;
            e["clamp"]();
        }
        function dHfY(e, t, r) {
            var n = e["abs"]();
            if (n["t"] <= 0)
                return;
            var i = this["abs"]();
            if (i["t"] < n["t"]) {
                if (t != null)
                    t["fromInt"](0);
                if (r != null)
                    this["copyTo"](r);
                return;
            }
            if (r == null)
                r = FfCQ();
            var a = FfCQ()
                , o = this["s"]
                , s = e["s"];
            var c = this["DB"] - UyZO(n[n["t"] - 1]);
            if (c > 0) {
                n["lShiftTo"](c, a);
                i["lShiftTo"](c, r);
            } else {
                n["copyTo"](a);
                i["copyTo"](r);
            }
            var u = a["t"];
            var l = a[u - 1];
            if (l == 0)
                return;
            var f = l * (1 << this["F1"]) + (u > 1 ? a[u - 2] >> this["F2"] : 0);
            var _ = this["FV"] / f
                , h = (1 << this["F1"]) / f
                , d = 1 << this["F2"];
            var p = r["t"]
                , v = p - u
                , g = t == null ? FfCQ() : t;
            a["dlShiftTo"](v, g);
            if (r["compareTo"](g) >= 0) {
                r[r["t"]++] = 1;
                r["subTo"](g, r);
            }
            ECgw["ONE"]["dlShiftTo"](u, g);
            g["subTo"](a, a);
            while (a["t"] < u)
                a[a["t"]++] = 0;
            while (--v >= 0) {
                var m = r[--p] == l ? this["DM"] : Math["floor"](r[p] * _ + (r[p - 1] + d) * h);
                if ((r[p] += a["am"](0, m, r, v, 0, u)) < m) {
                    a["dlShiftTo"](v, g);
                    r["subTo"](g, r);
                    while (r[p] < --m)
                        r["subTo"](g, r);
                }
            }
            if (t != null) {
                r["drShiftTo"](u, t);
                if (o != s)
                    ECgw["ZERO"]["subTo"](t, t);
            }
            r["t"] = u;
            r["clamp"]();
            if (c > 0)
                r["rShiftTo"](c, r);
            if (o < 0)
                ECgw["ZERO"]["subTo"](r, r);
        }
        function eGqu(e) {
            var t = FfCQ();
            this["abs"]()["divRemTo"](e, null, t);
            if (this["s"] < 0 && t["compareTo"](ECgw["ZERO"]) > 0)
                e["subTo"](t, t);
            return t;
        }
        function fXGL(e) {
            this["m"] = e;
        }
        function gjxd(e) {
            if (e["s"] < 0 || e["compareTo"](this["m"]) >= 0)
                return e["mod"](this["m"]);
            else
                return e;
        }
        function hTyL(e) {
            return e;
        }
        function iwgX(e) {
            e["divRemTo"](this["m"], null, e);
        }
        function jQpV(e, t, r) {
            e["multiplyTo"](t, r);
            this["reduce"](r);
        }
        function kfEF(e, t) {
            e["squareTo"](t);
            this["reduce"](t);
        }
        fXGL["prototype"]["convert"] = gjxd;
        fXGL["prototype"]["revert"] = hTyL;
        fXGL["prototype"]["reduce"] = iwgX;
        fXGL["prototype"]["mulTo"] = jQpV;
        fXGL["prototype"]["sqrTo"] = kfEF;
        function lhWI() {
            if (this["t"] < 1)
                return 0;
            var e = this[0];
            if ((e & 1) == 0)
                return 0;
            var t = e & 3;
            t = t * (2 - (e & 15) * t) & 15;
            t = t * (2 - (e & 255) * t) & 255;
            t = t * (2 - ((e & 65535) * t & 65535)) & 65535;
            t = t * (2 - e * t % this["DV"]) % this["DV"];
            return t > 0 ? this["DV"] - t : -t;
        }
        function mOQz(e) {
            this["m"] = e;
            this["mp"] = e["invDigit"]();
            this["mpl"] = this["mp"] & 32767;
            this["mph"] = this["mp"] >> 15;
            this["um"] = (1 << e["DB"] - 15) - 1;
            this["mt2"] = 2 * e["t"];
        }
        function nPnU(e) {
            var t = FfCQ();
            e["abs"]()["dlShiftTo"](this["m"]["t"], t);
            t["divRemTo"](this["m"], null, t);
            if (e["s"] < 0 && t["compareTo"](ECgw["ZERO"]) > 0)
                this["m"]["subTo"](t, t);
            return t;
        }
        function oMQg(e) {
            var t = FfCQ();
            e["copyTo"](t);
            this["reduce"](t);
            return t;
        }
        function pGxD(e) {
            while (e["t"] <= this["mt2"])
                e[e["t"]++] = 0;
            for (var t = 0; t < this["m"]["t"]; ++t) {
                var r = e[t] & 32767;
                var n = r * this["mpl"] + ((r * this["mph"] + (e[t] >> 15) * this["mpl"] & this["um"]) << 15) & e["DM"];
                r = t + this["m"]["t"];
                e[r] += this["m"]["am"](0, n, e, t, 0, this["m"]["t"]);
                while (e[r] >= e["DV"]) {
                    e[r] -= e["DV"];
                    e[++r]++;
                }
            }
            e["clamp"]();
            e["drShiftTo"](this["m"]["t"], e);
            if (e["compareTo"](this["m"]) >= 0)
                e["subTo"](this["m"], e);
        }
        function qngB(e, t) {
            e["squareTo"](t);
            this["reduce"](t);
        }
        function rOhP(e, t, r) {
            e["multiplyTo"](t, r);
            this["reduce"](r);
        }
        mOQz["prototype"]["convert"] = nPnU;
        mOQz["prototype"]["revert"] = oMQg;
        mOQz["prototype"]["reduce"] = pGxD;
        mOQz["prototype"]["mulTo"] = rOhP;
        mOQz["prototype"]["sqrTo"] = qngB;
        function stSt() {
            return (this["t"] > 0 ? this[0] & 1 : this["s"]) == 0;
        }
        function tLLD(e, t) {
            if (e > 4294967295 || e < 1)
                return ECgw["ONE"];
            var r = FfCQ()
                , n = FfCQ()
                , i = t["convert"](this)
                , a = UyZO(e) - 1;
            i["copyTo"](r);
            while (--a >= 0) {
                t["sqrTo"](r, n);
                if ((e & 1 << a) > 0)
                    t["mulTo"](n, i, r);
                else {
                    var o = r;
                    r = n;
                    n = o;
                }
            }
            return t["revert"](r);
        }
        function ulWS(e, t) {
            var r;
            if (e < 256 || t["isEven"]())
                r = new fXGL(t);
            else
                r = new mOQz(t);
            return this["exp"](e, r);
        }
        ECgw["prototype"]["copyTo"] = LyUc;
        ECgw["prototype"]["fromInt"] = MDPU;
        ECgw["prototype"]["fromString"] = OEWn;
        ECgw["prototype"]["clamp"] = PrRe;
        ECgw["prototype"]["dlShiftTo"] = Wacq;
        ECgw["prototype"]["drShiftTo"] = XMQd;
        ECgw["prototype"]["lShiftTo"] = YZCv;
        ECgw["prototype"]["rShiftTo"] = ZFYE;
        ECgw["prototype"]["subTo"] = akDh;
        ECgw["prototype"]["multiplyTo"] = bpSt;
        ECgw["prototype"]["squareTo"] = ceLN;
        ECgw["prototype"]["divRemTo"] = dHfY;
        ECgw["prototype"]["invDigit"] = lhWI;
        ECgw["prototype"]["isEven"] = stSt;
        ECgw["prototype"]["exp"] = tLLD;
        ECgw["prototype"]["toString"] = Qkzj;
        ECgw["prototype"]["negate"] = RjsS;
        ECgw["prototype"]["abs"] = SXeD;
        ECgw["prototype"]["compareTo"] = TQCz;
        ECgw["prototype"]["bitLength"] = VHpY;
        ECgw["prototype"]["mod"] = eGqu;
        ECgw["prototype"]["modPowInt"] = ulWS;
        ECgw["ZERO"] = NrhG(0);
        ECgw["ONE"] = NrhG(1);
        function vyPg(e, t) {
            return new ECgw(e, t);
        }
        function wYWb(e, t) {
            if (t < e["length"] + 11) {
                console["error"]("Message too long for RSA");
                return null;
            }
            var r = [];
            var n = e["length"] - 1;
            while (n >= 0 && t > 0) {
                var i = e["charCodeAt"](n--);
                if (i < 128) {
                    r[--t] = i;
                } else if (i > 127 && i < 2048) {
                    r[--t] = i & 63 | 128;
                    r[--t] = i >> 6 | 192;
                } else {
                    r[--t] = i & 63 | 128;
                    r[--t] = i >> 6 & 63 | 128;
                    r[--t] = i >> 12 | 224;
                }
            }
            r[--t] = 0;
            var a = new DZdA();
            var o = [];
            while (t > 2) {
                o[0] = 0;
                while (o[0] == 0)
                    a["nextBytes"](o);
                r[--t] = o[0];
            }
            r[--t] = 2;
            r[--t] = 0;
            return new ECgw(r);
        }
        function vwBb() {
            this["n"] = null;
            this["e"] = 0;
            this["d"] = null;
            this["p"] = null;
            this["q"] = null;
            this["dmp1"] = null;
            this["dmq1"] = null;
            this["coeff"] = null;
            var e = "00C1E3934D1614465B33053E7F48EE4EC87B14B95EF88947713D25EECBFF7E74C7977D02DC1D9451F79DD5D1C10C29ACB6A9B4D6FB7D0A0279B6719E1772565F09AF627715919221AEF91899CAE08C0D686D748B20A3603BE2318CA6BC2B59706592A9219D0BF05C9F65023A21D2330807252AE0066D59CEEFA5F2748EA80BAB81";
            var t = "10001";
            this["setPublic"](e, t);
        }
        function xVcK(e, t) {
            if (e != null && t != null && e["length"] > 0 && t["length"] > 0) {
                this["n"] = vyPg(e, 16);
                this["e"] = parseInt(t, 16);
            } else
                console["error"]("Invalid RSA public key");
        }
        function yPfI(e) {
            return e["modPowInt"](this["e"], this["n"]);
        }
        function AlTp(e) {
            var t = wYWb(e, this["n"]["bitLength"]() + 7 >> 3);
            if (t == null)
                return null;
            var r = this["doPublic"](t);
            if (r == null)
                return null;
            var n = r["toString"](16);
            if ((n["length"] & 1) == 0)
                return n;
            else
                return "0" + n;
        }
        vwBb["prototype"]["doPublic"] = yPfI;
        vwBb["prototype"]["setPublic"] = xVcK;
        vwBb["prototype"]["encrypt"] = AlTp;
        return vwBb;
    }();

    return new vwBb()["encrypt"](sstr);

}