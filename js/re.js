// 智能移除URL中的index.html后缀（保留参数和hash）

    console.log("执行")
    // 获取当前完整URL
    const currentUrl = window.location.href;
    
    // 创建正则表达式匹配路径中的/index.html
    // 匹配规则：/index.html 出现在路径结尾或后面接查询参数/hash
    const indexPattern = /(\/index\.html)(?=[?#]|$)/i;
    
    // 检测是否存在匹配项
    if (indexPattern.test(currentUrl)) {
        // 分解URL组成部分
        const urlObj = new URL(currentUrl);
        const path = urlObj.pathname;
        
        // 仅当路径以/index.html结尾时执行操作
        if (path.endsWith('/index.html')) {
            // 构建新路径：移除末尾的index.html
            const newPath = path.replace(/\/index\.html$/i, '/');
            
            // 保留查询参数和hash
            const searchParams = urlObj.search;
            const hashParams = urlObj.hash;
            
            // 生成新URL
            const newUrl = urlObj.origin + newPath + searchParams + hashParams;
            
            // 防循环检测：避免新旧URL相同
            if (newUrl !== currentUrl) {
                // 使用replace方法避免产生历史记录
                window.location.replace(newUrl);
            }
        }
    }
