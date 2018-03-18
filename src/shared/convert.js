import { pad } from './util';
const emojiMap = {
    "大笑": "86",
    "可爱": "85",
    "憨笑": "359",
    "色": "95",
    "亲亲": "363",
    "惊恐": "96",
    "流泪": "356",
    "亲": "362",
    "呆": "352",
    "哀伤": "342",
    "呲牙": "343",
    "吐舌": "348",
    "撇嘴": "353",
    "怒": "361",
    "奸笑": "341",
    "汗": "97",
    "痛苦": "346",
    "惶恐": "354",
    "生病": "350",
    "口罩": "351",
    "大哭": "357",
    "晕": "355",
    "发怒": "115",
    "开心": "360",
    "鬼脸": "94",
    "皱眉": "87",
    "流感": "358",
    "爱心": "33",
    "心碎": "34",
    "钟情": "303",
    "星星": "309",
    "生气": "314",
    "便便": "89",
    "强": "13",
    "弱": "372",
    "拜": "14",
    "牵手": "379",
    "跳舞": "380",
    "禁止": "374",
    "这边": "262",
    "爱意": "106",
    "示爱": "376",
    "嘴唇": "367",
    "狗": "81",
    "猫": "78",
    "猪": "100",
    "兔子": "459",
    "小鸡": "450",
    "公鸡": "461",
    "幽灵": "116",
    "圣诞": "411",
    "外星": "101",
    "钻石": "52",
    "礼物": "107",
    "男孩": "0",
    "女孩": "1",
    "蛋糕": "337",
    18: "186",
    "圈": "312",
    "叉": "313"
}

let emojiUrl = "http://s1.music.126.net/style/web2/emoji/emoji_{ID}@2x.png";
if ("undefined" != typeof window) {
    var dpr = Math.floor(window.devicePixelRatio);
    3 == dpr && (emojiUrl = "http://s1.music.126.net/style/web2/emoji/emoji_{ID}@3x.png")
}
const convert = {
    parseContent(content) {
        if (!content) {
            content = '';
        }
        let textList = [];
        content.replace(/\[([\u4e00-\u9fff\w]+)\]/g, function (text, word, index) {
            textList.push({
                text,
                word,
                index
            });
            return text;
        });
        let emojiList = [], len = textList.length;
        if (len) {
            for (var start = 0, i = 0; i < len; i++) {
                let index = textList[i].index,
                    text = textList[i].text,
                    emoji = emojiMap[textList[i].word];
                start != index && emojiList.push({
                    type: 'text',
                    content: content.substring(start, index)
                });
                emoji ? emojiList.push({
                    type: 'image',
                    content: emojiUrl.replace(/\{ID\}/g, emoji)
                }) : emojiList.push({
                    type: 'text',
                    content: text
                });
                start = index + text.length;
            }
            start < content.length && emojiList.push({
                type: 'text',
                content: content.substring(start)
            })
        } else {
            emojiList.push({
                type: 'text',
                content
            })
        }
        return emojiList;
    },
    parseTime(ms) {
        let time = new Date(ms), hm = `${pad(time.getHours(), '0')}:${pad(time.getMinutes(), '0')}`;
        let now = new Date(),
            slaped = (now.getTime() - time.getTime()) / 1000,//过去的秒数
            min = Math.floor(slaped / 60),
            hour = Math.floor(slaped / 3600);
        //找到今天的开始
        let today = new Date(now.toDateString()),
            day = Math.floor((today.getTime() - time.getTime()) / (3600 * 24 * 1000));
        if (day < 0) {
            if (hour === 0) {
                if (min >= 0 && min <= 1) {
                    return '刚刚';
                } else {
                    return `${min}分钟前`;
                }
            } else {
                return hm;
            }
        } else if (day < 1) {
            return `昨天${hm}`;
        }
        return `${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}日`;
    }
}
export default convert;