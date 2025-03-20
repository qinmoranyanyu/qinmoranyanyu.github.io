// document.addEventListener("DOMContentLoaded", () => {
//     initializeCard();
// });

// document.addEventListener("pjax:complete", () => {
//     initializeCard();
// });

// function initializeCard() {
//     cardTimes();
//     cardRefreshTimes();
// }

// let year, month, week, date, dates, weekStr, monthStr, asideTime, asideDay, asideDayNum, animalYear, ganzhiYear, lunarMon, lunarDay;
// const now = new Date();

// function cardRefreshTimes() {
//     const e = document.getElementById("card-widget-schedule");
//     if (e) {
//         asideDay = (now - asideTime) / 1e3 / 60 / 60 / 24;
//         e.querySelector("#pBar_year").value = asideDay;
//         e.querySelector("#p_span_year").innerHTML = (asideDay / 365 * 100).toFixed(1) + "%";
//         e.querySelector(".schedule-r0 .schedule-d1 .aside-span2").innerHTML = `还剩<a> ${(365 - asideDay).toFixed(0)} </a>天`;
//         e.querySelector("#pBar_month").value = date;
//         e.querySelector("#pBar_month").max = dates;
//         e.querySelector("#p_span_month").innerHTML = (date / dates * 100).toFixed(1) + "%";
//         e.querySelector(".schedule-r1 .schedule-d1 .aside-span2").innerHTML = `还剩<a> ${(dates - date)} </a>天`;
//         e.querySelector("#pBar_week").value = week === 0 ? 7 : week;
//         e.querySelector("#p_span_week").innerHTML = ((week === 0 ? 7 : week) / 7 * 100).toFixed(1) + "%";
//         e.querySelector(".schedule-r2 .schedule-d1 .aside-span2").innerHTML = `还剩<a> ${(7 - (week === 0 ? 7 : week))} </a>天`;
//     }
// }

// function cardTimes() {
//     year = now.getFullYear();
//     month = now.getMonth();
//     week = now.getDay();
//     date = now.getDate();

//     const e = document.getElementById("card-widget-calendar");
//     if (e) {
//         const isLeapYear = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
//         weekStr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][week];
//         const monthData = [
//             { month: "1月", days: 31 },
//             { month: "2月", days: isLeapYear ? 29 : 28 },
//             { month: "3月", days: 31 },
//             { month: "4月", days: 30 },
//             { month: "5月", days: 31 },
//             { month: "6月", days: 30 },
//             { month: "7月", days: 31 },
//             { month: "8月", days: 31 },
//             { month: "9月", days: 30 },
//             { month: "10月", days: 31 },
//             { month: "11月", days: 30 },
//             { month: "12月", days: 31 }
//         ];
//         monthStr = monthData[month].month;
//         dates = monthData[month].days;

//         const t = (week + 8 - date % 7) % 7;
//         let n = "", d = false, s = 7 - t;
//         const o = (dates - s) % 7 === 0 ? Math.floor((dates - s) / 7) + 1 : Math.floor((dates - s) / 7) + 2;
//         const c = e.querySelector("#calendar-main");
//         const l = e.querySelector("#calendar-date");

//         l.style.fontSize = ["64px", "48px", "36px"][Math.min(o - 3, 2)];

//         for (let i = 0; i < o; i++) {
//             if (!c.querySelector(`.calendar-r${i}`)) {
//                 c.innerHTML += `<div class='calendar-r${i}'></div>`;
//             }
//             for (let j = 0; j < 7; j++) {
//                 if (i === 0 && j === t) {
//                     n = 1;
//                     d = true;
//                 }
//                 const r = n === date ? " class='now'" : "";
//                 if (!c.querySelector(`.calendar-r${i} .calendar-d${j} a`)) {
//                     c.querySelector(`.calendar-r${i}`).innerHTML += `<div class='calendar-d${j}'><a${r}>${n}</a></div>`;
//                 }
//                 if (n >= dates) {
//                     n = "";
//                     d = false;
//                 }
//                 if (d) {
//                     n += 1;
//                 }
//             }
//         }

//         const lunarDate = chineseLunar.solarToLunar(new Date(year, month, date));
//         animalYear = chineseLunar.format(lunarDate, "A");
//         ganzhiYear = chineseLunar.format(lunarDate, "T").slice(0, -1);
//         lunarMon = chineseLunar.format(lunarDate, "M");
//         lunarDay = chineseLunar.format(lunarDate, "d");

//         const newYearDate = new Date("2025/01/28 00:00:00");
//         const daysUntilNewYear = Math.floor((newYearDate - now) / 1e3 / 60 / 60 / 24);
//         asideTime = new Date(`${new Date().getFullYear()}/01/01 00:00:00`);
//         asideDay = (now - asideTime) / 1e3 / 60 / 60 / 24;
//         asideDayNum = Math.floor(asideDay);
//         const weekNum = week - asideDayNum % 7 >= 0 ? Math.ceil(asideDayNum / 7) : Math.ceil(asideDayNum / 7) + 1;
        
//         e.querySelector("#calendar-week").innerHTML = `${year.toString().substring(2)}年${monthStr}&nbsp;${weekStr}`;
//         e.querySelector("#calendar-date").innerHTML = date.toString().padStart(2, "0");
//         e.querySelector("#calendar-solar").innerHTML = `第${weekNum}周&nbsp;&nbsp;第${asideDay.toFixed(0)}天`;
//         e.querySelector("#calendar-lunar").innerHTML = `${ganzhiYear}${animalYear}年&nbsp;${lunarMon}${lunarDay}`;
//         document.getElementById("schedule-days").innerHTML = daysUntilNewYear;
//     }
// }


document.addEventListener("DOMContentLoaded", () => {
    initializeCard();
});

document.addEventListener("pjax:complete", () => {
    initializeCard();
});

function initializeCard() {
    cardTimes();
    cardRefreshTimes();
}




function getNextHoliday() {
    const nowTime = now.getTime();
    let closestHoliday = null;
    
    HOLIDAYS.forEach(holiday => {
        // 动态计算日期
        const holidayDate = holiday.date || (holiday.getDate ? holiday.getDate() : null);
        if (!holidayDate || holidayDate.getTime() <= nowTime) return;

        // 寻找最近且未过期的节日
        if (!closestHoliday || holidayDate.getTime() < closestHoliday.date.getTime()) {
            closestHoliday = {
                name: holiday.name,
                date: holidayDate
            };
        }
    });

    // 处理跨年元旦
    if (!closestHoliday) {
        return {
            name: "元旦",
            date: new Date(now.getFullYear() + 1, 0, 1)
        };
    }
    return closestHoliday;
}


let year, month, week, date, dates, weekStr, monthStr, asideTime, asideDay, asideDayNum, animalYear, ganzhiYear, lunarMon, lunarDay;
const now = new Date();


// 新增节假日配置（可自行扩展）
const HOLIDAYS = [
    // 格式说明：月份从 0 开始（0=1月），日期从 1 开始
    { name: "元旦", date: new Date(now.getFullYear() + 1, 0, 1) },    // 下一年1月1日
    { name: "春节", getDate: () => { 
        // 春节特殊处理（农历正月初一，这里使用近似公历算法）
        const year = now.getMonth() >= 10 ? now.getFullYear() + 1 : now.getFullYear();
        return new Date(year, 0, chineseLunar.lunarToSolar(year, 1, 1).date);
    }},
    { name: "清明", date: new Date(now.getFullYear(), 3, 4) },        // 4月4日
    { name: "劳动节", date: new Date(now.getFullYear(), 4, 1) },       // 5月1日
    { name: "端午", getDate: () => { 
        // 端午节（农历五月初五）
        return chineseLunar.lunarToSolar(now.getFullYear(), 5, 5);
    }},
    { name: "中秋", getDate: () => { 
        // 中秋节（农历八月十五）
        return chineseLunar.lunarToSolar(now.getFullYear(), 8, 15);
    }},
    { name: "国庆", date: new Date(now.getFullYear(), 9, 1) }         // 10月1日
];

function cardRefreshTimes() {
    const e = document.getElementById("card-widget-schedule");
    if (e) {
        asideDay = (now - asideTime) / 1e3 / 60 / 60 / 24;
        e.querySelector("#pBar_year").value = asideDay;
        e.querySelector("#p_span_year").innerHTML = (asideDay / 365 * 100).toFixed(1) + "%";
        e.querySelector(".schedule-r0 .schedule-d1 .aside-span2").innerHTML = `还剩<a> ${(365 - asideDay).toFixed(0)} </a>天`;
        e.querySelector("#pBar_month").value = date;
        e.querySelector("#pBar_month").max = dates;
        e.querySelector("#p_span_month").innerHTML = (date / dates * 100).toFixed(1) + "%";
        e.querySelector(".schedule-r1 .schedule-d1 .aside-span2").innerHTML = `还剩<a> ${(dates - date)} </a>天`;
        e.querySelector("#pBar_week").value = week === 0 ? 7 : week;
        e.querySelector("#p_span_week").innerHTML = ((week === 0 ? 7 : week) / 7 * 100).toFixed(1) + "%";
        e.querySelector(".schedule-r2 .schedule-d1 .aside-span2").innerHTML = `还剩<a> ${(7 - (week === 0 ? 7 : week))} </a>天`;
    }
}

function cardTimes() {
    year = now.getFullYear();
    month = now.getMonth();
    week = now.getDay();
    date = now.getDate();

    const e = document.getElementById("card-widget-calendar");
    if (e) {
        const isLeapYear = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        weekStr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][week];
        const monthData = [
            { month: "1月", days: 31 },
            { month: "2月", days: isLeapYear ? 29 : 28 },
            { month: "3月", days: 31 },
            { month: "4月", days: 30 },
            { month: "5月", days: 31 },
            { month: "6月", days: 30 },
            { month: "7月", days: 31 },
            { month: "8月", days: 31 },
            { month: "9月", days: 30 },
            { month: "10月", days: 31 },
            { month: "11月", days: 30 },
            { month: "12月", days: 31 }
        ];
        monthStr = monthData[month].month;
        dates = monthData[month].days;

        const t = (week + 8 - date % 7) % 7;
        let n = "", d = false, s = 7 - t;
        const o = (dates - s) % 7 === 0 ? Math.floor((dates - s) / 7) + 1 : Math.floor((dates - s) / 7) + 2;
        const c = e.querySelector("#calendar-main");
        const l = e.querySelector("#calendar-date");

        l.style.fontSize = ["64px", "48px", "36px"][Math.min(o - 3, 2)];

        for (let i = 0; i < o; i++) {
            if (!c.querySelector(`.calendar-r${i}`)) {
                c.innerHTML += `<div class='calendar-r${i}'></div>`;
            }
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j === t) {
                    n = 1;
                    d = true;
                }
                const r = n === date ? " class='now'" : "";
                if (!c.querySelector(`.calendar-r${i} .calendar-d${j} a`)) {
                    c.querySelector(`.calendar-r${i}`).innerHTML += `<div class='calendar-d${j}'><a${r}>${n}</a></div>`;
                }
                if (n >= dates) {
                    n = "";
                    d = false;
                }
                if (d) {
                    n += 1;
                }
            }
        }

        const lunarDate = chineseLunar.solarToLunar(new Date(year, month, date));
        animalYear = chineseLunar.format(lunarDate, "A");
        ganzhiYear = chineseLunar.format(lunarDate, "T").slice(0, -1);
        lunarMon = chineseLunar.format(lunarDate, "M");
        lunarDay = chineseLunar.format(lunarDate, "d");

        // const newYearDate = new Date("2025/01/28 00:00:00");
        // const daysUntilNewYear = Math.floor((newYearDate - now) / 1e3 / 60 / 60 / 24);
        // 修改节假日计算部分
        const nextHoliday = getNextHoliday();
        if (nextHoliday) {
            const diffDays = Math.ceil((nextHoliday.date - now) / 86400000);
            const formatDate = `${nextHoliday.date.getFullYear()}-${(nextHoliday.date.getMonth() + 1).toString().padStart(2, '0')}-${nextHoliday.date.getDate().toString().padStart(2, '0')}`;
            
            document.getElementById("schedule-title").textContent = `距离${nextHoliday.name}`;
            document.getElementById("schedule-days").textContent = diffDays > 0 ? diffDays : "0";
            document.getElementById("schedule-date").textContent = formatDate;
        }



        asideTime = new Date(`${new Date().getFullYear()}/01/01 00:00:00`);
        asideDay = (now - asideTime) / 1e3 / 60 / 60 / 24;
        asideDayNum = Math.floor(asideDay);
        const weekNum = week - asideDayNum % 7 >= 0 ? Math.ceil(asideDayNum / 7) : Math.ceil(asideDayNum / 7) + 1;
        
        e.querySelector("#calendar-week").innerHTML = `${year.toString().substring(2)}年${monthStr}&nbsp;${weekStr}`;
        e.querySelector("#calendar-date").innerHTML = date.toString().padStart(2, "0");
        e.querySelector("#calendar-solar").innerHTML = `第${weekNum}周&nbsp;&nbsp;第${asideDay.toFixed(0)}天`;
        e.querySelector("#calendar-lunar").innerHTML = `${ganzhiYear}${animalYear}年&nbsp;${lunarMon}${lunarDay}`;
    }
}