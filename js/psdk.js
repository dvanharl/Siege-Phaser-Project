"function" != typeof Object.assign && (Object.assign = function(e, t) {
        "use strict";
        if (null == e) throw new TypeError("Cannot convert undefined or null to object");
        for (var n = Object(e), i = 1; i < arguments.length; i++) {
            var a = arguments[i];
            if (null != a)
                for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (n[o] = a[o])
        }
        return n
    }), "function" != typeof Array.prototype.forEach && (Array.prototype.forEach = function(e) {
        if (void 0 === this || null === this) throw TypeError();
        var t = Object(this),
            n = t.length >>> 0;
        if ("function" != typeof e) throw TypeError();
        var i, a = arguments[1];
        for (i = 0; i < n; i++) i in t && e.call(a, t[i], i, t)
    }), NodeList.prototype && "function" != typeof NodeList.prototype.forEach && (NodeList.prototype.forEach = function(e) {
        if (void 0 === this || null === this) throw TypeError();
        var t = Object(this),
            n = t.length >>> 0;
        if ("function" != typeof e) throw TypeError();
        var i, a = arguments[1];
        for (i = 0; i < n; i++) i in t && e.call(a, t[i], i, t)
    }),
    function(e) {
        "use strict";
        e.devConsole = function(e) {
            var t;
            try {
                t = e.adInfo.gameOptions
            } catch (e) {}
            t = t || {};
            var n = !!t.shouldDebug,
                i = (t.debugPanelFontSize || 11) + "px",
                a = (t.debugPanelHeight || 40) + "px",
                o = t.debugPanelColor || "#FFF",
                r = e.document.createElement("div");
            r.id = "out", r.style.backgroundColor = o, r.style["font-size"] = i, r.style.height = a, r.style["overflow-x"] = "hidden", r.style["overflow-y"] = "scroll", r.style.display = "none", e.document.body.insertBefore(r, e.document.body.children[0]);
            var s = e.console.log,
                l = e.console.info,
                c = e.console.warn,
                g = function(e) {
                    var t = 0;
                    return function(i, a, o) {
                        n && (o = "string" == typeof o || "function" == typeof o ? o : JSON.stringify(o), e.style.display = "block", e.innerHTML = "[" + t++ + "] " + i + " " + a + ": " + o + "<br/>" + e.innerHTML)
                    }
                }(r);
            e.console.log = function(t, n) {
                s.call(e.console, t, n), g("L", t, n)
            }, e.console.info = function(t, n) {
                l.call(e.console, t, n), g("I", t, n)
            }, e.console.warn = function(t, n) {
                c.call(e.console, t, n), g("W", t, n)
            }, e.addEventListener("error", function(t) {
                e.console.log("ERROR", t.message), e.console.log("ERROR", t.filename), e.console.log("ERROR", t.lineno), e.console.log("ERROR", t.colno), e.console.log("ERROR", t.clipboardData)
            })
        }, "undefined" != typeof document && e.devConsole(e)
    }(this),
    function(e) {
        "use strict";
        console.group = console.group || function() {}, console.groupEnd = console.groupEnd || function() {}, console.groupCollapsed = console.groupCollapsed || function() {};
        var t = ["Trace", "Info", "Log", "Warning", "Error"];
        e.Logging = function(e) {
            var t = this;
            if (this.loggingLevels = [], this.loggingGroups = [], e) {
                var n = e.loggingLevels || "",
                    i = e.loggingGroups || "";
                n.split(",").filter(function(e) {
                    return 0 !== e.length && parseInt(e)
                }).forEach(function(e) {
                    t.loggingLevels.push(parseInt(e))
                }), i.split(",").filter(function(e) {
                    return e
                }).forEach(function(e) {
                    t.loggingGroups.push(e)
                })
            }
            this.counters = {}
        }, e.Logging.prototype = {
            log: function(e, t) {
                this.loggingLevels.indexOf(this.Type.LOG) !== -1 && this.loggingGroups.indexOf(e) !== -1 && console.log(e, t)
            },
            assert: function(e, t) {
                e || console.assert(e, t)
            },
            count: function(e) {
                this.counters[e] = (this.counters[e] || 0) + 1, this.loggingLevels.indexOf(this.Type.TRACE) !== -1 && console.trace(e + " " + this.counters[e])
            },
            dir: function(e) {
                console.dir(e)
            },
            error: function(e, t) {
                this.loggingLevels.indexOf(this.Type.ERROR) !== -1 && this.loggingGroups.indexOf(e) !== -1 && console.error(e, t)
            },
            info: function(e, t) {
                this.loggingLevels.indexOf(this.Type.INFO) !== -1 && this.loggingGroups.indexOf(e) !== -1 && console.info(e, t)
            },
            warn: function(e, t) {
                this.loggingLevels.indexOf(this.Type.WARN) !== -1 && this.loggingGroups.indexOf(e) !== -1 && console.warn(e, t)
            },
            trace: function(e, t) {
                this.loggingLevels.indexOf(this.Type.TRACE) !== -1 && this.loggingGroups.indexOf(e) !== -1 && console.trace(e, t)
            },
            overview: function() {
                var e, t = [];
                for (console.group(), console.log("Playable Logger Overview"), console.log("Visible Levels: "), e = 0; e < this.loggingLevels.length; e++) t.push(this.Type.toReadable(this.loggingLevels[e]));
                for (console.log(t.join(", ")), console.log("Visible Groups: "), console.log(this.loggingGroups.join(", ")), console.log("Counters: "), t = Object.keys(this.counters), e = 0; e < t.length; e++) console.log(t[e] + ": " + this.counters[t[e]]);
                console.groupEnd()
            },
            addGroup: function(e) {
                this.loggingGroups.indexOf(e) === -1 && this.loggingGroups.push(e)
            },
            removeGroup: function(e) {
                var t;
                (t = this.loggingGroups.indexOf(e)) !== -1 && this.loggingGroups.swapAndPop(t)
            },
            setLogLevel: function(e) {
                for (e = Math.max(e, 0), this.loggingLevels = []; e <= this.Type.ERROR; e++) this.loggingLevels.push(e);
                this.loggingLevels.sort(function(e, t) {
                    return e === t ? 0 : e - t
                })
            },
            addLogLevel: function(e) {
                "number" == typeof e && this.loggingLevels.indexOf(e) === -1 && this.loggingLevels.push(e)
            },
            removeLogLevel: function(e) {
                var t;
                "number" == typeof e && (t = this.loggingLevels.indexOf(e)) !== -1 && this.loggingLevels.swapAndPop(t)
            },
            Type: {
                ERROR: 4,
                WARN: 3,
                LOG: 2,
                INFO: 1,
                TRACE: 0,
                toReadable: function(e) {
                    return t[e]
                }
            }
        }, Object.freeze(e.Logging.prototype.Type)
    }(this);
var SessionStore = function(e) {
    function t(e) {
        return void 0 !== p[e] ? p[e] : 0
    }

    function n(e, t) {
        p[e] = t
    }

    function i(e) {
        o(e, 1)
    }

    function a(e) {
        r(e, 1)
    }

    function o(e, t) {
        void 0 !== p[e] ? p[e] += t : p[e] = t
    }

    function r(e, t) {
        void 0 !== p[e] ? p[e] -= t : p[e] = t
    }

    function s() {
        return Date.now() / 1e3 - m
    }

    function l() {
        return Date.now() / 1e3 - v
    }

    function c() {
        m = Date.now() / 1e3
    }

    function g(e) {
        v = Date.now() / 1e3
    }

    function u() {
        return h.curr
    }

    function d() {
        var e = Date.now(),
            t = (e - h.lastFrameTime) / 1e3;
        for (h.lastFrameTime = e; f.length > 10;) f.shift();
        h.curr = Math.ceil(Math.max(1 / t, 0)), f.push(h.curr), this.set("average-fps", Math.ceil(b(f)))
    }
    var h = {
            lastFrameTime: Date.now(),
            frames: [],
            recentFrames: [],
            curr: 0,
            max: 0,
            min: 0
        },
        f = [],
        p = {},
        m = 0,
        v = 0,
        b = function(e) {
            for (var t = 0, n = 0; n < e.length; t += e[n++]);
            return 0 === e.length ? 0 : Math.max(t / e.length, 0)
        };
    return {
        getFps: u,
        get: t,
        set: n,
        setTimeStartNow: c,
        setTimeLoadedNow: g,
        timeSinceStart: s,
        timeSinceLoad: l,
        increase: o,
        decrease: r,
        increment: i,
        decrement: a,
        updateFps: d
    }
}(this);
! function(e) {
    "use strict";
    e.PlayableConfig = function(t) {
        var n = this,
            i = {},
            a = {};
        try {
            i = t.gameOptions || e.adInfo.gameOptions
        } catch (e) {}
        try {
            a = t.adInfo || e.adInfo
        } catch (e) {}
        if (Object.defineProperties(this, {
                adInfo: {
                    value: a,
                    enumerable: !1,
                    writable: !1
                },
                gameOptions: {
                    value: i,
                    enumerable: !1,
                    writable: !0
                }
            }), this.gameOptions.overrideJSON) try {
            this.gameOptions.overrideJSON = this.gameOptions.overrideJSON.replace(/'/g, '"');
            var o = JSON.parse(this.gameOptions.overrideJSON),
                r = this.gameOptions.overrideKey,
                s = o[r] || {};
            delete this.gameOptions.overrideJSON, Object.keys(s).forEach(function(e) {
                n.gameOptions[e] ? n.gameOptions[e] = s[e] : console.warn("UNKNOWN", e + " = " + s[e])
            })
        } catch (e) {
            console.error(e)
        }
        if (e.location && e.location.search) {
            var l = e.location.search.substring(1);
            l = l.split("&"), l = l.map(function(e) {
                return e = e.split("=", 2), {
                    key: e[0],
                    value: decodeURIComponent(e[1].replace(/\+/, " "))
                }
            });
            for (var c = 0; c < l.length; c++) this.gameOptions[l[c].key] && (this.gameOptions[l[c].key] = l[c].value)
        }
    }, e.PlayableConfig.prototype = {
        get: function(e, t) {
            return void 0 !== this.gameOptions[e] ? this.gameOptions[e] : t
        },
        getNumber: function(e, t) {
            var n = function() {
                var e = parseFloat(t);
                return Number.isNaN(e) ? void 0 : e
            };
            switch (typeof this.gameOptions[e]) {
                case "undefined":
                    return n();
                case "number":
                    return this.gameOptions[e];
                default:
                    var i = Number.parseFloat(this.gameOptions[e].toString());
                    return Number.isNaN(i) ? n() : i
            }
        },
        getBoolean: function(e, t) {
            var n = this.gameOptions[e];
            switch (typeof n) {
                case "boolean":
                    return n;
                case "string":
                    return n = n.toString().toLowerCase().trim(), "false" !== n && "off" !== n && "disabled" !== n && "no" !== n && "0" !== n && Boolean(n);
                default:
                    return Boolean(t)
            }
        },
        getInt: function(e, t) {
            var n = function() {
                var e = parseFloat(t);
                return Math.trunc(Number.isNaN(e) ? 0 : e)
            };
            switch (typeof this.gameOptions[e]) {
                case "undefined":
                    return n();
                case "number":
                    return Math.trunc(this.gameOptions[e]);
                default:
                    var i = Number.parseInt(this.gameOptions[e].toString());
                    return Number.isNaN(i) ? n() : i
            }
        },
        getString: function(e, t) {
            switch (t = t || "undefined", typeof this.gameOptions[e]) {
                case "undefined":
                    return t.toString();
                case "string":
                    return this.gameOptions[e];
                default:
                    return this.gameOptions[e].toString()
            }
        },
        getCountry: function() {
            try {
                var e = this.adInfo.country;
                return e.toUpperCase()
            } catch (e) {
                return
            }
        },
        getSSP: function() {
            try {
                var e = this.adInfo.ssp;
                return e.toLowerCase()
            } catch (e) {
                return
            }
        },
        getRegion: function() {
            try {
                return "string" == typeof this.adInfo.region ? this.adInfo.region : void 0
            } catch (e) {
                return
            }
        },
        getIDFA: function() {
            try {
                return "string" == typeof this.adInfo.idfa ? this.adInfo.idfa : void 0
            } catch (e) {
                return
            }
        },
        getPlayableID: function() {
            try {
                var e = parseFloat(this.adInfo.playableId);
                return "number" != typeof e || isNaN(e) ? void 0 : e >= 0 ? e : void 0
            } catch (e) {
                return void console.error("FAILED CAST: " + e.message)
            }
        },
        getCreativeID: function() {
            try {
                var e = parseFloat(this.adInfo.creativeId);
                return "number" != typeof e || isNaN(e) ? void 0 : e >= 0 ? e : void 0
            } catch (e) {
                return void console.error("FAILED CAST: " + e.message)
            }
        },
        getCampaignID: function() {
            try {
                var e = parseFloat(this.adInfo.campaignId);
                return "number" != typeof e || isNaN(e) ? void 0 : e >= 0 ? e : void 0
            } catch (e) {
                return void console.error("FAILED CAST: " + e.message)
            }
        },
        getDeviceModel: function() {
            try {
                return "string" == typeof this.adInfo.deviceModel ? this.adInfo.deviceModel : void 0
            } catch (e) {
                return
            }
        },
        getAdDimensions: function() {
            try {
                return "string" == typeof this.adInfo.adDimensions ? this.adInfo.adDimensions : void 0
            } catch (e) {
                return
            }
        },
        getAppName: function() {
            try {
                return "string" == typeof this.adInfo.appName ? this.adInfo.appName : void 0
            } catch (e) {
                return
            }
        },
        getOS: function() {
            try {
                return "string" == typeof this.adInfo.os ? this.adInfo.os : void 0
            } catch (e) {
                return
            }
        },
        getOSVersion: function() {
            try {
                return "string" == typeof this.adInfo.osVersion ? this.adInfo.osVersion : void 0
            } catch (e) {
                return
            }
        },
        getBidID: function() {
            try {
                return "string" == typeof this.adInfo.bidId ? this.adInfo.bidId : void 0
            } catch (e) {
                return
            }
        },
        getObject: function() {
            try {
                return this.settings
            } catch (e) {
                return
            }
        }
    }
}(this);
var ErrorHandler = function(e) {
    function t(e, t, n) {
        i("Exception", e, t), a(e, n), r("exception", t, n.fileName, n.lineNumber, 0)
    }

    function n(e, t) {
        i("Error", e, t), a(e, null), r("error", t, "", "", 0)
    }

    function i(e, t, n) {
        u && console.error("[" + e + ":" + t + " " + n)
    }

    function a(e, t) {
        try {
            g && (l ? l(e, t) : console.error("`adInfo.useErrorCallback` set to true, but no value for `adInfo.errorCallback` given."))
        } catch (e) {}
    }

    function o(e) {
        e && (l = e, g = !0)
    }

    function r(e, t, n, i, a) {
        try {
            var o = c.bidId || "{NULL}",
                r = c.ssp || "{NULL}",
                s = c.campaignId || "{NULL}",
                l = c.creativeVersion || "{NULL}",
                g = window.mraid ? window.mraid.getVersion() : "{NULL}",
                u = window.mraid ? window.mraid.getState() : "{NULL}",
                d = window.mraid ? window.mraid.isViewable() : "2",
                h = (SessionStore.get("launcher_version"), SessionStore.timeSinceStart()),
                f = c.osVersion || "{NULL}",
                p = c.languageCode || "{NULL}",
                m = c.playableId || "{NULL}",
                v = new XMLHttpRequest,
                b = {
                    event_type: "error",
                    bid_id: o,
                    event_properties: {
                        campaign_id: s,
                        playable_id: m,
                        creative_version: l,
                        error_msg: t,
                        error_line: i,
                        error_column: a,
                        error_url: n,
                        error_type: e,
                        ssp: r,
                        last_event_fired: SessionStore.get("last_event"),
                        launcher_version: SessionStore.get("launcher_version"),
                        language: p,
                        mraid_state: u,
                        mraid_viewable: d,
                        mraid_version: g,
                        os_version: f,
                        time_after_load: h
                    }
                },
                y = JSON.stringify(b),
                S = "https://node" + c.node + ".fractionalmedia.com/errors";
            v.open("POST", S, !0), v.setRequestHeader("Content-Type", "text/plain"), v.send(y)
        } catch (e) {
            console.error("Caught error in send error in ErrorHandler: " + e.message)
        }
    }

    function s(e, t, n, o, s) {
        try {
            i("Exception", "", e), a("", s), r("", e, t, n, o)
        } catch (e) {
            console.error("Caught exception in errorHandler.captureError: " + e.message)
        }
    }
    var l, c = e.adInfo || {},
        g = !1,
        u = !1;
    return e.ErrorHandler = this, c && (l = c.errorCallback || void 0, g = c.useErrorCallback || !1, u = c.displayErrors || !1), {
        error: n,
        exception: t,
        captureError: s,
        registerErrorCallback: o
    }
}(this);
! function(e) {
    e.LanguageDetector = function(t) {
        var n = t || {};
        Object.defineProperties(this, {
            navigator: {
                value: e.navigator || {
                    language: "en"
                },
                writable: !1,
                enumerable: !1
            },
            aliases: {
                writable: !1,
                enumerable: !1,
                value: n.aliases || {
                    ar: "ar",
                    "ar-ae": "ar",
                    "ar-ar": "ar",
                    "ar-bh": "ar",
                    "ar-dz": "ar",
                    "ar-eg": "ar",
                    "ar-iq": "ar",
                    "ar-jo": "ar",
                    "ar-kw": "ar",
                    "ar-lb": "ar",
                    "ar-ly": "ar",
                    "ar-ma": "ar",
                    "ar-om": "ar",
                    "ar-qa": "ar",
                    "ar-sa": "ar",
                    "ar-sy": "ar",
                    "ar-tn": "ar",
                    "ar-ae": "ar",
                    "ar-ye": "ar",
                    bg: "bg",
                    "bg-bg": "bg",
                    ca: "ca",
                    "ca-es": "ca",
                    cs: "cs",
                    "cs-cz": "cs",
                    da: "da",
                    "da-dk": "da",
                    fi: "fi",
                    "fi-fi": "fi",
                    fr: "fr",
                    "fr-ca": "fr",
                    "fr-ch": "fr",
                    "fr-lu": "fr",
                    "fr-mc": "fr",
                    "fr-be": "fr",
                    "fr-fr": "fr",
                    de: "de",
                    "de-de": "de",
                    "de-at": "de",
                    "de-ch": "de",
                    "de-li": "de",
                    "de-lu": "de",
                    el: "el",
                    "el-gr": "el",
                    en: "en",
                    "en-bz": "en",
                    "en-us": "en",
                    "en-ca": "en",
                    "en-gb": "en",
                    "en-au": "en",
                    "en-ie": "en",
                    "en-jm": "en",
                    "en-nz": "en",
                    "en-ph": "en",
                    "en-tt": "en",
                    "en-za": "en",
                    es: "es",
                    "es-ar": "es",
                    "es-bo": "es",
                    "es-cl": "es",
                    "es-co": "es",
                    "es-cr": "es",
                    "es-do": "es",
                    "es-ec": "es",
                    "es-sv": "es",
                    "es-gt": "es",
                    "es-hn": "es",
                    "es-mx": "es",
                    "es-ni": "es",
                    "es-pa": "es",
                    "es-py": "es",
                    "es-pe": "es",
                    "es-pr": "es",
                    "es-es": "es",
                    "es-uy": "es",
                    "es-ve": "es",
                    "es-xl": "es",
                    hu: "hu",
                    "hu-hu": "hu",
                    id: "id",
                    "id-id": "id",
                    it: "it",
                    "it-it": "it",
                    "it-ch": "it",
                    hr: "hr",
                    "hr-hr": "hr",
                    "hr-ba": "hr",
                    jp: "jp",
                    ja: "jp",
                    "ja-jp": "jp",
                    ko: "ko",
                    "ko-kr": "ko",
                    pl: "pl",
                    "pl-pl": "pl",
                    pt: "pt",
                    "pt-br": "pt",
                    "pt-pt": "pt",
                    ms: "ms",
                    "ms-bn": "ms",
                    "ms-my": "ms",
                    nb: "nb",
                    "nb-no": "nb",
                    "nn-no": "nb",
                    nl: "nl",
                    "nl-nl": "nl",
                    "nl-be": "nl",
                    ru: "ru",
                    "ru-ru": "ru",
                    "ru-mo": "ru",
                    sk: "sk",
                    "sk-sk": "sk",
                    sv: "sv",
                    "sv-se": "sv",
                    "sv-sv": "sv",
                    "sv-fi": "sv",
                    th: "th",
                    "th-th": "th",
                    tr: "tr",
                    "tr-tr": "tr",
                    uk: "uk",
                    "uk-ua": "uk",
                    vi: "vi",
                    "vi-vn": "vi",
                    "zh-mo": "zh-cn",
                    "zh-cn": "zh-cn",
                    "zh-hk": "zh-cn",
                    "zh-sg": "zh-cn",
                    zh: "zh-cn"
                }
            }
        }), this.language = n.language || this.navigator.language
    }, e.LanguageDetector.prototype = {
        getLanguageCode: function() {
            var e = this.language;
            return e && "string" == typeof e ? (e = e.toLowerCase(), this.aliases[e] ? this.aliases[e] : "en") : "en"
        }
    }
}(this),
function(e) {
    "use strict";
    e.TrackEvent = function(e) {
        function t() {
            return !!I
        }

        function n(e) {
            e && (I = !!e.telemetryDisabled, C = e.heartbeatsEnabled, e.sdk && (sdk = sdk), e.xhr && (E = e.xhr), e.telemetryUrl && "string" == typeof e.telemetryUrl && "" !== e.telemetryUrl.trim() && (k = e.telemetryUrl))
        }

        function i(e, t) {
            var n = {
                bid_id: L.bidId,
                config_id: S,
                dashboard_id: y,
                event_type: e,
                event_properties: {}
            };
            for (var i in t) n.event_properties[i] = t[i];
            var a = JSON.stringify(n) + "\r\n";
            return a
        }

        function a() {
            O.set("last_event", "session_start");
            var t = L;
            _ = !0;
            var n = {};
            t && t.gameOptions && (n = t.gameOptions, delete n.overrideJSON);
            var a = e.mraid ? e.mraid.getVersion() : "{NULL}";
            try {
                var o = {
                        playable_id: b,
                        config_id: S,
                        dashboard_id: y,
                        ad_dimensions: t.adDimensions || "{NULL}",
                        ad_sdk_version: t.adSdkVersion || "{NULL}",
                        app_name: t.appName || "{NULL}",
                        creative_id: t.creativeId || "{NULL}",
                        campaign_id: t.campaignId || "{NULL}",
                        creative_version: t.creativeVersion || "{NULL}",
                        device_model: t.deviceModel || "{NULL}",
                        game_code: t.gameCode || "{NULL}",
                        game_name: t.gameName || "{NULL}",
                        game_author: t.gameAuthor || "{NULL}",
                        idfa: t.idfa || "{NULL}",
                        language_code: t.language || "{NULL}",
                        launcher_version: O.get("launcher_version", "-"),
                        mraid_version: a,
                        orientation: t.orientation || "{NULL}",
                        os: t.os || "{NULL}",
                        os_version: t.osVersion || "{NULL}",
                        ssp: t.ssp || "{NULL}",
                        configuration: n
                    },
                    r = i("session_start", o);
                v(r, !0)
            } catch (e) {
                console.error(e), N.exception("TrackEvent.sessionStart", "Caught error in session start: " + e.message, e)
            }
        }

        function o() {
            O.set("last_event", "game_loaded");
            var e = {
                    playable_id: b,
                    time_since_start: O.timeSinceStart()
                },
                t = i("game_loaded", e);
            v(t, !0)
        }

        function r() {
            O.set("last_event", "game_ready");
            var e = {
                    playable_id: b,
                    fps: O.getFps(),
                    time_since_start: O.timeSinceStart()
                },
                t = i("game_ready", e);
            v(t, !0)
        }

        function s(e, t, n) {
            var a = n || "",
                o = {
                    playable_id: b,
                    action_count: O.get("action_count"),
                    fps: O.getFps(),
                    milestone_name: e,
                    milestone_type: t,
                    milestone_info: a + p(),
                    time_since_start: O.timeSinceStart()
                },
                r = i("milestone", o);
            v(r, !0)
        }

        function l(e) {
            O.set("last_event", "game_over"), this.clickSignal(), _ = !1, s("game_over", "game_state", e)
        }

        function c() {
            if (_ && C) {
                var e = {
                        playable_id: b,
                        action_count: O.get("action_count"),
                        fps: O.getFps(),
                        time_since_start: O.timeSinceStart()
                    },
                    t = i("heartbeat", e);
                v(t, !0)
            }
        }

        function g() {
            O.set("last_event", "orientationChange");
            var e = "-";
            switch (window.orientation) {
                case 0:
                    e = "PORTRAIT";
                    break;
                case 180:
                    e = "PORTRAIT";
                    break;
                case -90:
                    e = "LANDSCAPE";
                    break;
                case 90:
                    e = "LANDSCAPE"
            }
            var t = {
                    playable_id: b,
                    orientation: e,
                    fps: O.getFps(),
                    time_since_start: O.timeSinceStart()
                },
                n = i("orientation_change" + p(), t);
            v(n, !0)
        }

        function u(e, t) {
            try {
                var n = {
                        playable_id: b,
                        click_source: e,
                        time_since_start: O.timeSinceStart()
                    },
                    a = i("click", n);
                v(a, !0, t)
            } catch (e) {
                console.error("Exception in TrackEvent.click:" + e.message)
            }
        }

        function d(e, t) {
            O.increment("action_count"), this.clickSignal();
            try {
                var n = {
                        playable_id: b,
                        action_count: O.get("action_count"),
                        fps: O.getFps(),
                        time_since_start: O.timeSinceStart(),
                        action_name: e,
                        action_info: t + p()
                    },
                    a = i("game_action", n);
                v(a, !0)
            } catch (e) {
                console.error("Exception in track_event.gameAction:" + e.message)
            }
        }

        function h() {
            O.set("last_event", "game_close");
            var e = {
                    playable_id: b,
                    time_since_start: O.timeSinceStart()
                },
                t = i("game_close", e);
            this.clickSignal(), v(t, !1)
        }

        function f() {
            if (w.length) {
                for (var e = ""; w.length;) e += w.pop();
                v(e, !0)
            }
        }

        function p() {
            return ""
        }

        function m(e, t) {
            try {
                var n = new E;
                if (I) return void(t && t(n));
                t && (n.onreadystatechange = function() {
                    4 === n.readyState && t(n)
                }), n.open("POST", k), n.setRequestHeader("Content-Type", "text/plain"), n.send(e)
            } catch (e) {
                console.error("Caught exception in event_tracker.send: " + e.message)
            }
        }

        function v(e, t, n) {
            m(e, n)
        }
        var b, y, S, L = e.adInfo || {
                gameOptions: {}
            },
            k = "https://node" + L.node + "fractionalmedia.com/telim_direct",
            w = [],
            _ = !1,
            I = !1,
            C = !1,
            E = e.XMLHttpRequest || function() {},
            O = e.SessionStore || {
                set: function() {},
                get: function() {}
            },
            N = e.ErrorHandler || {
                exception: function() {}
            };
        L && (b = L.playableId || "{NULL}", S = L.gameOptions.configId || "{NULL}", y = L.gameOptions.dashboardId || "{NULL}", k = L.telemetryUrl || k);
        var U = {
            clickSignal: function() {},
            init: n,
            sessionStart: a,
            click: u,
            gameLoaded: o,
            gameOver: l,
            gameReady: r,
            heartbeat: c,
            milestone: s,
            gameClose: h,
            gameAction: d,
            orientationChange: g,
            processEventQueue: f,
            getTelemetryDisabled: t
        };
        return U
    }(e)
}(this),
function(e) {
    "use strict";
    e.LanguageDetector = e.LanguageDetector || function() {
        this.getLanguageCode = function() {
            return "en"
        }
    }, e.addEventListener = e.addEventListener || function() {};
    var t = e.Image || function() {
            this.addEventListener = function() {}
        },
        n = e.Logging || function() {};
    n.prototype = n.prototype.log ? n.prototype : {
        log: function() {},
        info: function() {}
    };
    var i = e.document || {
        body: {
            appendChild: function() {}
        }
    };
    e.XMLHttpRequest || function() {
        this.open = function() {}, this.send = function() {}
    };
    e.PlayableSDK = function(t) {
        function a() {
            var e = Date.now() / 1e3;
            e - r.lastHeartbeatTime >= r.heartbeatInterval && (r.trackEvent.heartbeat(), r.lastHeartbeatTime = Date.now() / 1e3), e - r.lastBatchSendTime >= r.batchSendInterval && (r.trackEvent.processEventQueue(), r.lastBatchSendTime = Date.now() / 1e3)
        }

        function o() {
            r.adUnitStatus.isReady && r.adUnitStatus.isDocumentReady && r.adUnitStatus.isViewable && (void 0 !== r.startGameFN ? (r.checkIntervalID && clearInterval(r.checkIntervalID), r.startGameFN(), setInterval(a, 50), r._listenerInit(), r._closeButtonInit()) : console.error("Ad unit ready but no startGameFn given."))
        }
        Object.defineProperties(this, {
            adInfo: {
                value: t && t.adInfo ? t.adInfo : e.adInfo || {
                    clickUrl: ""
                },
                writable: !1,
                enumerable: !1
            },
            trackEvent: {
                value: t && t.TrackEvent ? t.TrackEvent : e.TrackEvent || {
                    sessionStart: function() {},
                    init: function() {}
                },
                writable: !1,
                enumerable: !1
            },
            logger: {
                value: t && t.Logging ? new t.Logging : new n(t ? t.gameOptions : {}),
                writable: !1,
                enumerable: !1
            },
            track: {
                value: t && t.TrackEvent ? t.TrackEvent : e.TrackEvent || {},
                writable: !1,
                enumerable: !0
            },
            languageDetector: {
                value: t && t.LanguageDetector ? new t.LanguageDetector : new e.LanguageDetector,
                writable: !1,
                enumerable: !0
            },
            sessionStore: {
                value: t && t.SessionStore ? t.SessionStore : e.SessionStore || {
                    updateFps: function() {},
                    set: function() {},
                    get: function() {},
                    setTimeStartNow: function() {}
                },
                writable: !1,
                enumerable: !0
            },
            errorHandler: {
                value: t && t.ErrorHandler ? t.ErrorHandler : e.ErrorHandler || {},
                writable: !1,
                enumerable: !1
            },
            checkIntervalID: {
                value: void 0,
                writable: !0,
                enumerable: !1
            },
            callbacks: {
                value: {
                    onSizeChange: [],
                    onCloseButtonInit: [],
                    onOrientationChange: [],
                    MRAIDStateChange: []
                },
                writable: !0,
                enumerable: !1
            },
            window: {
                value: t && t.window ? t.window : e,
                writable: !1,
                enumerable: !1
            },
            document: {
                value: t && t.document ? t.document : i ? i : {
                    readyState: 0,
                    body: {
                        appendChild: function() {}
                    }
                },
                writable: !1,
                enumerable: !1
            },
            startGameFN: {
                value: void 0,
                writable: !0,
                enumerable: !1
            },
            mraid: {
                value: t && t.mraid ? t.mraid : e.mraid,
                writable: !1,
                enumerable: !1
            },
            options: {
                value: t && t.options ? t.options : {
                    telemetryDisabled: !1,
                    debugLanguageCode: "",
                    clickSignal: {
                        enabled: !1,
                        trigger: "FUA",
                        delay: 10,
                        hasFired: !1,
                        timeStarted: Date.now(),
                        probability: 1,
                        destURL: "https://itunes.apple.com/app/game-of-war-fire-age/id667728512?mt=8"
                    }
                },
                writable: !0,
                enumable: !1
            },
            adUnitStatus: {
                value: t && t.adUnitStatus ? t.adUnitStatus : {
                    isReady: !1,
                    isViewable: !1,
                    isDocumentReady: !1
                },
                enumerable: !1,
                writable: !0
            },
            hasSDKStarted: {
                value: !(!t || !t.hasSDKStarted) && t.hasSDKStarted,
                enumerable: !1,
                writable: !0
            },
            heartbeatInterval: {
                value: 10,
                enumerable: !1,
                writable: !0
            },
            lastHeartbeatTime: {
                value: 0,
                enumerable: !1,
                writable: !0
            },
            batchSendInterval: {
                value: .1,
                enumerable: !1,
                writable: !0
            },
            lastBatchSendTime: {
                value: 0,
                enumerable: !1,
                writable: !0
            },
            gameOptions: {
                value: t && t.gameOptions ? t.gameOptions : e.adInfo && e.adInfo.gameOptions ? e.adInfo.gameOptions : {},
                enumerable: !1,
                writable: !1
            },
            cfg: {
                value: t && t.PlayableConfig ? t.PlayableConfig : e.PlayableConfig ? new e.PlayableConfig({
                    adInfo: e.adInfo,
                    gameOptions: this.gameOptions
                }) : {
                    get: function() {},
                    getBoolean: function() {},
                    getNumber: function() {},
                    getString: function() {}
                },
                writable: !1,
                enumerable: !0
            },
            mraidLastState: {
                value: t && t.mraidLastState ? t.mraidLastState : "-",
                writable: !0,
                enumerable: !1
            },
            clickURL: {
                value: t && t.adInfo && t.adInfo.clickUrl ? t.adInfo.clickUrl : e.adInfo && e.adInfo.clickUrl ? e.adInfo.clickUrl : "https://www.msn.com",
                writable: !1,
                enumerable: !1
            }
        }), e.onerror = this.errorHandler.captureError, this.sessionStore.set("last_event", "-"), this.sessionStore.set("launcher_version", "2.11.0");
        var r = this;
        this.start = function(e) {
            this._optionsInit(), this._clickSignalInit(), this.startGameFN = e, this.trackEvent.sessionStart(), this.sessionStore.setTimeStartNow();
            var t = function() {
                o()
            };
            "complete" === this.document.readyState ? this.adUnitStatus.isDocumentReady = !0 : this.window.addEventListener("load", function() {
                "complete" === i.readyState && (r.adUnitStatus.isDocumentReady = !0)
            }), void 0 !== this.startGameFN ? this.mraid ? this._onMraidInit() : (this.adUnitStatus.isReady = !0, this.adUnitStatus.isViewable = !0) : this.errorHandler.error("PlayableLauncher.start", "startGameFn not defined."), this.checkIntervalID = setInterval(t, 25)
        }
    }, e.PlayableSDK.prototype = {
        _closeButtonInit: function() {
            var e = this.cfg.getBoolean("disableCustomClose", !1);
            this.mraid && this.mraid.useCustomClose(!e), e || this.executeCallback("closeButtonInit")
        },
        _mraid1Init: function() {
            var e = this.mraid,
                t = this;
            "loading" !== e.getState() ? this.adUnitStatus.isReady = !0 : e.addEventListener("ready", function() {
                t.adUnitStatus.isReady = !0
            })
        },
        _mraid2Init: function() {
            var e = this.mraid,
                t = this;
            "loading" == e.getState() ? e.addEventListener("ready", function() {
                t.adUnitStatus.isReady = !0
            }) : this.adUnitStatus.isReady = !0
        },
        _onMraidStateChange: function() {
            var e = this.mraid.getState();
            if ("default" === e && "expanded" === this.mraidLastState || "hidden" === e && "hidden" !== this.mraidLastState) try {
                this.trackEvent.gameClose()
            } catch (e) {
                console.error("ERROR: " + e.message), this.errorHandler.exception("startMraid_stateChange", "Problem handling mraid close stateChange: " + e.message, e)
            } else "default" === e ? this.adUnitStatus.isReady = !0 : "expanded" === e && this.trackEvent.clickSignal.call(this.trackEvent);
            this.callbacks.onOrientationChange && this.callbacks.onOrientationChange.forEach(function(t) {
                "function" == typeof t && t(e)
            }), this.mraidLastState = e
        },
        _onMraidInit: function() {
            var e = this.mraid,
                t = e.getVersion();
            "string" == typeof t && (t = t.trim());
            var n = this;
            e.isViewable() ? this.adUnitStatus.isViewable = !0 : e.addEventListener("viewableChange", function() {
                n.adUnitStatus.isViewable = !0
            }), t.startsWith("2.") ? this._mraid2Init() : t.startsWith("1.") && this._mraid1Init(), e.addEventListener("stateChange", function() {
                n._onMraidStateChange.call(n)
            })
        },
        _createTrackingPixel: function(e, n, i) {
            if (!e || "string" != typeof e) return !1;
            e += e.indexOf("?") > -1 ? "&1=" + 1e6 * Math.random() : "?1=" + 1e6 * Math.random();
            var a = new t;
            return n && ("function" == typeof n ? (this.logger.log("PlayableSDK", "Tracking pixel success fn set"), a.addEventListener("load", n)) : this.logger.error("PlayableSDK", "Callback provided for tracking pixel event listener `load` was not a valid function")), i && ("function" == typeof i ? (this.logger.log("PlayableSDK", "Tracking Pixel failure fn set"), a.addEventListener("error", i)) : this.logger.error("PlayableSDK", "Callback provided for tracking pixel event listener `error` was not a valid function")), a.src = e, this.document.body.appendChild(a), !0
        },
        _clickSignalInit: function() {
            if (this.trackEvent) {
                var e = this;
                this.options.clickSignal && this.options.clickSignal.probability ? this.options.clickSignal.probability : 1;
                this.trackEvent.clickSignal = function() {
                    var t = e.options.clickSignal;
                    if (t.enabled && !t.hasFired) {
                        switch (t.trigger.toUpperCase()) {
                            case "FUA":
                                if (1 !== e.sessionStore.get("action_count")) return;
                                break;
                            case "TIMER":
                                var n = (Date.now() - t.timeStarted) / 1e3;
                                if (n < t.delay && "game_over" !== e.sessionStore.get("last_event") && "game_close" !== e.sessionStore.get("last_event") && "click" !== e.sessionStore.get("last_action")) return;
                                break;
                            case "GAME_OVER":
                                if ("game_over" !== e.sessionStore.get("last_event") && "click" !== e.sessionStore.get("last_action")) return;
                                break;
                            case "EXPAND":
                                if (!e.mraid) return;
                                if ("expanded" !== e.mraid.getState()) return
                        }
                        e._createTrackingPixel(e.clickURL), t.hasFired = !0
                    }
                }, this.options.clickSignal.trigger && "TIMER" === this.options.clickSignal.trigger.toUpperCase() && setTimeout(function() {
                    e.trackEvent.clickSignal.call(e.trackEvent)
                }, 1e3 * this.options.clickSignal.delay)
            }
        },
        _optionsInit: function() {
            if (this.cfg) {
                var e = {};
                e.telemetryDisabled = this.cfg.getBoolean("telemetryDisabled", !1), e.heartbeatsEnabled = this.cfg.getBoolean("heartbeatsEnabled", !1), e.telemetryWebSocketDisabled = this.cfg.getBoolean("telemetryWebSocketDisabled", !1), this.trackEvent.init(e);
                try {
                    this.options.debugLanguageCode = this.cfg.get("debugLanguageCode", ""), this.options.debugLanguageCode && (this.options.debugLanguageCode = this.options.debugLanguageCode.trim()), this.options.creativeType = this.cfg.get("creativeType", ""), this.options.mopubSlide = this.cfg.getBoolean("mopubSlide", !1), this.options.mopubSlideFallback = this.cfg.getBoolean("mopubSlideFallback", !1), this.options.clickSignal.enabled = this.cfg.getBoolean("clickSignalEnabled", !1), this.options.clickSignal.trigger = this.cfg.get("clickSignalTrigger", "FUA"), this.options.clickSignal.delay = this.cfg.getNumber("clickSignalDelay", 10), this.adInfo.destUrl && (this.options.clickSignal.destURL = this.adInfo.destUrl), this.options.clickSignal.probability = this.cfg.getNumber("clickSignalProbability", 1)
                } catch (e) {
                    throw console.error("Configure clickSignal failed: " + e.message), new Error("Click signal setup failure")
                }
            }
        },
        _listenerInit: function() {
            var e = this;
            this.mraid ? this.mraid.addEventListener("orientationChange", function(t) {
                e.trackEvent.orientationChange(), e.executeCallback("orientationChange")
            }) : this.window.addEventListener("orientationchange", function() {
                e.executeCallback("orientationChange")
            }), this.callbacks.onSizeChange && (this.mraid ? this.mraid.addEventListener("sizeChange", function() {
                e.executeCallback("sizeChange")
            }) : this.window.addEventListener("resize", function() {
                e.executeCallback("sizeChange")
            }))
        },
        updateFps: function() {
            this.sessionStore.updateFps()
        },
        registerCallback: function(e, t) {
            switch (e) {
                case "closeButtonInit":
                    this.callbacks.onCloseButtonInit.push(t);
                    break;
                case "orientationChange":
                    this.callbacks.onOrientationChange.push(t);
                    break;
                case "sizeChange":
                    this.callbacks.onSizeChange.push(t);
                    break;
                case "MRAIDStateChange":
                    this.callbacks.MRAIDStateChange.push(t);
                    break;
                case "error":
                    this.errorHandler.registerErrorCallback(t);
                    break;
                default:
                    console.error("registerCallback failed: `" + e + "` is not a valid eventName.")
            }
        },
        getLanguageCode: function() {
            return this.options.debugLanguageCode ? this.options.debugLanguageCode : this.languageDetector.getLanguageCode.call(this.languageDetector)
        },
        openURL: function(e) {
            this.logger.log("PlayableSDK", e), this.options.mopubSlide && "mopub" === this.cfg.getSSP.call(this.cfg) ? this.openURLMopubWebView(e) : this.openURLNative(e)
        },
        openURLNative: function(e) {
            this.mraid && "EXPANDABLE" !== this.creativeType ? (this.logger.log("PlayableSDK", "Calling mraid.open"), this.mraid.open(e)) : (this.logger.log("PlayableSDK", "Calling window.open"), this.window.location === this.window.parent.location ? this.window.open(e, "_self") : this.window.open(e, "_top", "fullscreen=yes"))
        },
        openURLMopubWebView: function(e) {
            this.logger.log("PlayableSDK", "Calling openURLMopubWebView");
            var t = "mopubnativebrowser://navigate?url=" + encodeURIComponent(this.adInfo.destUrl),
                n = this,
                i = function() {
                    n.options.mopubSlideFallback && (n.logger.log("PlayableSDK", "Set timeout for fallback"), setTimeout(function() {
                        n.openURLNative.call(n, e)
                    }, 100)), n.logger.log("PlayableSDK", "Opening deeplink: " + t), n.mraid ? n.mraid.open(t) : n.window.open(t)
                };
            this._createTrackingPixel(this.clickURL, i, i)
        },
        openClickUrl: function(e) {
            var t = this.options.clickSignal.enabled && this.options.clickSignal.destURL ? this.options.clickSignal.destURL : this.clickURL;
            this.logger.log("PlayableSDK", e), this.sessionStore.set("last_action", "click"), this.trackEvent.clickSignal(), this.options.telemetryDisabled || this.trackEvent.click(e), this.openURL(t)
        },
        _onViewableChange: function(e) {
            e && (this.adUnitStatus.isViewable = !0)
        },
        executeCallback: function(e) {
            var t, n;
            switch (e) {
                case "sizeChange":
                    t = this.callbacks.onSizeChange;
                    break;
                case "closeButtonInit":
                    t = this.callbacks.onCloseButtonInit;
                    break;
                case "orientationChange":
                    t = this.callbacks.onOrientationChange
            }
            if ("orientationChange" === e && (n = void 0 !== this.window.orientation ? 90 === Math.abs(this.window.orientation) ? "landscape" : "portrait" : this.window.screen && this.window.screen.orientation ? 90 === Math.abs(this.window.screen.orientation.angle) ? "landscape" : "portrait" : "unknown"), void 0 !== t && Array.isArray(t))
                for (var i = 0; i < t.length; i++) "function" == typeof t[i] && t[i](n)
        }
    }
}(this),
function(e) {
    e.PlayableSdk = new e.PlayableSDK(e.adInfo)
}(this);