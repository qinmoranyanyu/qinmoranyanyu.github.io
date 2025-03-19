//动态标题
var OriginTitile = document.title;
var titleTime;
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    //离开当前页面时标签显示内容
    document.title = "青墨：莫愁前路无知己~";
    clearTimeout(titleTime);
  } else {
    //返回当前页面时标签显示内容
    document.title = "烟雨：人生何处不相逢！" + OriginTitile;
    //两秒后变回正常标题
    titleTime = setTimeout(function () {
      document.title = OriginTitile;
    }, 2000);
  }
});
console.log(1111)