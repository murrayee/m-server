const gm = require('gm').subClass({imageMagick: true});
module.exports = {
    getAvatar(baseDir, fileName, text) {
        console.log(baseDir, fileName, text);
        return new Promise((resolve, reject) => {
            gm(100, 100, this.getColor())
                .fontSize(20)
                .fill("#fff")
                .drawText(0, 0, text, 'Center')
                .write(`${baseDir}/app/public/avatar/${fileName}.png`, function (err) {
                    console.log(err);
                    resolve(err)
                })
        })
    },
    createFileName() {
        return this.getFormatDate(new Date(), "yyyyMMddhhmmss") + Math.ceil(Math.random() * 10000)
    },
    format(date, format) {
        const o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    },
    getFormatDate(date, pattern) {
        if (date == undefined) {
            date = new Date();
        }
        if (pattern == undefined) {
            pattern = "yyyy-MM-dd hh:mm:ss";
        }
        return this.format(date, pattern);
    },
    getColor() {
        const colors = {
            iPhoneBlue: '#0A60FE', WechatGreen: '#1EA114', orangeRed: '#ff4500',
            orange: '#ff8500', yellow: '#ffd500', yellowGreen: '#9acd32',
            lightGreen: '#70dc70', limeGreen: '#32cd32', seaGreen: '#20b2aa',
            skyBlue: '#87ceeb', lightBlue: '#1ec8ff', dodgerBlue: '#1e90ff',
            thistle: '#d8bfd8', purple: '#7e83e3', slateBlue: '#6a5acd', black: '#000', icolor: "#3d8ee2",
        }
        let colorArr = Object.keys(colors)
        return colors[colorArr[Math.floor(Math.random() * (colorArr.length - 1))]]
    }
};