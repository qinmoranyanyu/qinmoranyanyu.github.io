// 全局变量定义（请确保在调用前定义txkey和坐标点）
var txkey = 'DFBBZ-OMN6J-UFLF7-DHZCF-IDQGT-3XFRD'; // 需替换为真实key
var longitude = 108.60494;         // 你的坐标经度
var latitude = 34.10847;            // 你的坐标纬度

// 获取来访者信息
function welcometxmap() {
    // 从localStorage获取缓存数据
    let ipLocation = localStorage.getItem('ipLocation');
    
    if (ipLocation) {
        // 解析缓存数据
        ipLocation = JSON.parse(ipLocation);
        // 检查缓存是否过期（1天）
        const cacheTime = 24 * 60 * 60 * 1000;
        if (Date.now() - ipLocation.timestamp < cacheTime) {
            showWelcome(ipLocation);
            return;
        }
    }

    // 缓存无效时请求新数据
    const script = document.createElement('script');
    const url = `https://apis.map.qq.com/ws/location/v1/ip?key=${txkey}&output=jsonp`;
    script.src = url;
    
    window.QQmap = function (data) {
        // 添加时间戳用于判断过期
        data.timestamp = Date.now();
        // 存储数据到localStorage
        localStorage.setItem('ipLocation', JSON.stringify(data));
        document.body.removeChild(script);
        delete window.QQmap;
        showWelcome(data);
    };
    
    document.body.appendChild(script);
}

// 距离计算函数保持不变
function getDistance(e1, n1, e2, n2) {
    const R = 6371;
    const { sin, cos, asin, PI, hypot } = Math;
    const getPoint = (e, n) => {
        e *= PI / 180;
        n *= PI / 180;
        return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) };
    };

    const a = getPoint(e1, n1);
    const b = getPoint(e2, n2);
    const c = hypot(a.x - b.x, a.y - b.y, a.z - b.z);
    return Math.round(asin(c / 2) * 2 * R);
}

function showWelcome(ipData) {
    if (!ipData || !ipData.result) return;

    const dist = getDistance(
        longitude,
        latitude,
        ipData.result.location.lng,
        ipData.result.location.lat
    );
    let pos = ipData.result.ad_info.nation;
    let ip = ipData.result.ip;
    let posdesc = generatePosDesc(ipData);

    // 时间相关欢迎语
    const timeChange = getTimeGreeting();

    // 更新DOM内容
    const welcomeElements = document.getElementsByClassName("announcement_content");
    if (welcomeElements.length > 0) {
        welcomeElements[0].innerHTML = `
            <span>欢迎来自 ${
                ipData.result.ad_info.nation === '中国' 
                ? `<b>${ipData.result.ad_info.city} ${ipData.result.ad_info.district}</b>`
                : `<b>${ipData.result.ad_info.nation}</b>`
            } 的小伙伴</span><br>
            ${timeChange}<br>
            <span class="welcome-message">${posdesc}</span><br>
            当前位置距<b>博主</b>约 <b>${dist}</b> 公里！<br>
            <span>IP地址为：<b>${ip}</b></span>`;
    }
}

// 生成位置描述（将原switch逻辑独立为函数）
function generatePosDesc(ipData) {
    const info = ipData.result.ad_info;
    let posdesc = "带我去你的城市逛逛吧";
    // 国家层面判断
    switch (info.nation) {
        case "日本":
            return "よろしく，一起去看樱花吗";
        case "美国":
            return "Let us live in peace!";
        case "英国":
            return "想同你一起夜乘伦敦眼";
        case "俄罗斯":
            return "Высушите эту бутылку водки!";
        case "法国":
            return "C'est La Vie";
        case "德国":
            return "Die Zeit verging im Fluge.";
        case "澳大利亚":
            return "一起去大堡礁吧！";
        case "加拿大":
            return "拾起一片枫叶赠予你";
        case "中国":
            // 省份层面判断
            switch (info.province) {
                case "北京市":
                    return "北——京——欢迎你~~~";
                case "天津市":
                    return "讲段相声吧";
                case "河北省":
                    return "山势巍巍成壁垒，天下雄关铁马金戈由此向，无限江山";
                case "山西省":
                    return "展开坐具长三尺，已占山河五百余";
                case "内蒙古自治区":
                    // 城市层面判断
                    switch (info.city) {
                        case "通辽市":
                            return "可汗宇宙中心";
                        default:
                            return "天苍苍，野茫茫，风吹草低见牛羊";
                    }
                case "辽宁省":
                    return "我想吃烤鸡架！";
                case "吉林省":
                    return "状元阁就是东北烧烤之王";
                case "黑龙江省":
                    return "很喜欢哈尔滨大剧院";
                case "上海市":
                    return "众所周知，中国只有两个城市";
                case "江苏省":
                    // 城市层面判断
                    switch (info.city) {
                        case "南京市":
                            return "这是我挺想去的城市啦";
                        case "苏州市":
                            return "上有天堂，下有苏杭";
                        case "无锡市":
                            return "无锡太美，无锡太美";
                        default:
                            return "散装是必须要散装的";
                    }
                case "浙江省":
                    return "东风渐绿西湖柳，雁已还人未南归";
                case "安徽省":
                    return "蚌埠住了，芜湖起飞";
                case "福建省":
                    return "井邑白云间，岩城远带山";
                case "江西省":
                    return "落霞与孤鹜齐飞，秋水共长天一色";
                case "山东省":
                    return "遥望齐州九点烟，一泓海水杯中泻";
                case "河南省":
                    // 城市层面判断
                    switch (info.city) {
                        case "郑州市":
                            return "豫州之域，天地之中";
                        case "南阳市":
                            return "臣本布衣，躬耕于南阳此南阳非彼南阳！";
                        case "驻马店市":
                            return "峰峰有奇石，石石挟仙气嵖岈山的花很美哦！";
                        case "开封市":
                            return "刚正不阿包青天";
                        case "洛阳市":
                            return "洛阳牡丹甲天下";
                        default:
                            return "可否带我品尝河南烩面啦？";
                    }
                case "湖北省":
                    // 城市层面判断
                    switch (info.city) {
                        case "黄冈市":
                            return "红安将军县！辈出将才！";
                        default:
                            return "来碗热干面~";
                    }
                case "湖南省":
                    // 城市层面判断
                    switch (info.city) {
                        case "衡阳市":
                            return "老乡见老乡，两眼泪汪汪！";
                        default:
                            return "74751，长沙斯塔克";
                    }
                case "广东省":
                    // 城市+区级判断
                    switch (info.city) {
                        case "广州市":
                            return "看小蛮腰，喝早茶了嘛~";
                        case "深圳市":
                            // 区级判断
                            switch (info.district) {
                                case "南山区":
                                    return "好巧！博主也在南山区生活喔~";
                                default:
                                    return "今天你996了嘛~";
                            }
                        case "阳江市":
                            return "阳春合水！博主家乡~ 欢迎来玩~";
                        default:
                            return "来两斤福建人~";
                    }
                case "广西壮族自治区":
                    return "桂林山水甲天下";
                case "海南省":
                    return "朝观日出逐白浪，夕看云起收霞光";
                case "四川省":
                    return "康康川妹子";
                case "贵州省":
                    return "茅台，学生，再塞200";
                case "云南省":
                    return "玉龙飞舞云缠绕，万仞冰川直耸天";
                case "西藏自治区":
                    return "躺在茫茫草原上，仰望蓝天";
                case "陕西省":
                    return "来份臊子面加馍";
                case "甘肃省":
                    return "羌笛何须怨杨柳，春风不度玉门关";
                case "青海省":
                    return "牛肉干和老酸奶都好好吃";
                case "宁夏回族自治区":
                    return "大漠孤烟直，长河落日圆";
                case "新疆维吾尔自治区":
                    return "驼铃古道丝绸路，胡马犹闻唐汉风";
                case "台湾省":
                    return "我在这头，大陆在那头";
                case "香港特别行政区":
                    return "永定贼有残留地鬼嚎，迎击光非岁玉";
                case "澳门特别行政区":
                    return "性感荷官，在线发牌";
                default:
                    return posdesc;
            }
        default:
            return "带我去你的国家逛逛吧";
    }
}

// 获取时间相关问候语
function getTimeGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return "🌤️ 早上好，一日之计在于晨";
    if (hour < 13) return "☀️ 中午好，记得午休喔~";
    if (hour < 17) return "🕞 下午好，饮茶先啦！";
    if (hour < 19) return "🚶‍♂️ 即将下班，记得按时吃饭~";
    if (hour < 24) return "🌙 晚上好，夜生活嗨起来！";
    return "夜深了，早点休息，少熬夜";
}

// 添加错误处理
window.addEventListener('error', function(e) {
    console.error('Error:', e.message, 'at', e.filename, 'line:', e.lineno);
});

// 页面加载时调用
document.addEventListener('DOMContentLoaded', welcometxmap);

console.log(11111111)