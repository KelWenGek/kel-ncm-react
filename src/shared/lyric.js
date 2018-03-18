export default {
    parseLyricStrToMap(lrc) {
        let lrc_reg = /^\[(\d{2})\:(\d{2})\.(\d{2,})\](.*)/;
        return lrc
            .replace(/\n$/, '')
            .split(/\n/)
            .filter(lyr => lrc_reg.test(lyr))
            .reduce((linesMap, lyr) => {
                let match = lyr.match(lrc_reg), tag = `${match[1]}:${match[2]}.${match[3]}`;
                linesMap[tag] = {
                    time: parseFloat([parseFloat(match[1] * 60) + parseFloat(match[2]), match[3]].join('.')),
                    tag,
                    lyric: match[4].trim() || ''
                }
                return linesMap;
            }, {});
    },
    parseFinalLyricMap(rawLrc) {
        let lrc_str = rawLrc.lrc.lyric,
            lines = this.parseLyricStrToMap(lrc_str),
            tags = Object.keys(lines),
            tlines = null,
            t_lrc_str = rawLrc.tlyric.lyric,
            hasTrans;
        if (hasTrans = !!t_lrc_str) {
            tlines = this.parseLyricStrToMap(t_lrc_str);
            tags.forEach(tag => {
                lines[tag].tlyric = tlines[tag] && tlines[tag].lyric || '';
            })
        }
        return {
            lines: tags.map(tag => lines[tag]).filter(line => line.lyric),
            hasTrans,
            scrollable: true,
            _other: {}
        };
    },
    //获取歌词每行高度
    getLyricItemHeight(lritems) {
        for (var style = window.getComputedStyle(lritems[0], null), styleData = {
            paddingBottom: style.paddingBottom,
            minHeight: 99999,
            heights: []
        }, i = 0, len = lritems.length; i < len; i++) {
            let height = lritems[i].offsetHeight;
            height < styleData.minHeight && (styleData.minHeight = height);
            styleData.heights.push(height);
        }
        return styleData;
    },
    //获取歌词其他数据
    getOtherData(option = {}) {
        let lyric = option.lyric,
            styleData = this.getLyricItemHeight(option.lritems),
            layoutData = this.resetLrcscrollHeight({
                trans: lyric.hasTrans,
                scrollable: lyric.scrollable,
                minHeight: styleData.minHeight,
                paddingBottom: styleData.paddingBottom,
                total: option.total || 3
            });
        return Object.assign({}, styleData, layoutData);
    },
    resetLrcscrollHeight(e) {
        var t = e.trans,
            r = e.scrollable,
            n = e.minHeight,
            i = e.paddingBottom,
            o = e.total;
        o = o || 3;
        var a = document.documentElement.clientHeight,
            s = document.documentElement.clientWidth,
            u = s / a,
            c = .1;
        u <= .67 && t === !1 ? c = .16 : u <= .67 && t === !0 ? c = .18 : u > .7 && t === !1 ? c = .06 : u > .7 && t === !0 ? c = .08 : t === !0 && (c = .12),
            u > .65 && r === !1 && (c = 2 * c / 3);
        var l = a * c,
            f = Math.floor(l / n);
        f >= o && (f = o,
            r === !1 && (f = o - 1,
                f = f > 0 ? f : 1));
        var d = void 0;
        d = 0 === f ? 0 : n * f - parseFloat(i);
        var h = 1;
        t ? h = 0 : f < 3 && (h = 0);
        var p = f;
        return {
            outerHeight: d,
            visibleLyricCount: p,
            scrollIndex: h
        }
    }
}