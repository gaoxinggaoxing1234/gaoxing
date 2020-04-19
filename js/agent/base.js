function getSaasId(){
    var s = GetUrlString('s');
    if(s == null || s == ''){
        s = localStorage.getItem("s");
    }

    if(s == null || s == ''){
        if(curWwwPath.search("app") != -1){
            s = "0";//本地模式
        }
    }

    if(s == null || s == ''){
        $.toast("对不起，链接失效", "text");
        //location.href='error.html?share='+getShareId()+'&s='+getSaasId();//
    }
    return s;
}

function GetUrlString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var stiao = true;
function set() {
    stiao =false;
}
setInterval(function () {
    stiao = true;
}, 1000);
document.onkeydown = function () {
    if (window.event && window.event.keyCode == 13) {
        window.event.returnValue = false;

    }

}

$('textarea,input').on('blur', function (event) {
    //document.body.scrollTop = 0;
    document.body.scrollTop = document.body.scrollHeight-1;
});

$(function() {
    /*if(getIsAPPLE()){
        FastClick.attach(document.body);
    }*/

});


if(getIsAPPLE()){

        if(("standalone" in window.navigator) && window.navigator.standalone){
            //$.toast("=======","text");

                var noddy, remotes = false;

                document.addEventListener('click', function(event) {
                    if(stiao){
                        noddy = event.target;

                        while(noddy.nodeName !== "A" && noddy.nodeName !== "HTML") {

                            noddy = noddy.parentNode;

                        }

                        if('href' in noddy && noddy.href.indexOf('http') !== -1 && (noddy.href.indexOf(document.location.host) !== -1 || remotes)){

                            event.preventDefault();

                            document.location.href = noddy.href;

                        }
                    }else{
                        alert("请长按图片进行保存");
                    }

                },false);


        }

    //$.toast.prototype.defaults.duration=1000;$.toast("加载中……","text");
}else{
    //$.toast.prototype.defaults.duration=1000;$.toast("请长按图片进行保存","text");
}

function isAdvTips(url,imageurl,advType){//弹屏公告广告

    if($("#logintips").size() == 0  && $("#advtips").size() == 0 ){
        localStorage.setItem(advType,getNowFormatDate());
        var div = document.createElement('div');
        div.id='advtips';
        div.style='position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;';

        if(imageurl.search('.json') != -1){
            //str1 += '<lottie-player src="'+checkPath(imageurl,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
            div.innerHTML='<p style="text-align:center; margin-top:20%;padding:0 5%;" onclick=window.location.href="'+url+'"><lottie-player src="'+checkPath(imageurl,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player></p>' +
                '<p style="text-align:center;line-height:20px; color:#fff;margin-top:220px;padding:0px;" onclick=closediv("advtips") ><i class="beauty icon-anniu_guanbi" style="font-size: 32px;"></i></p>';

        }else{
            div.innerHTML='<p style="text-align:center; margin-top:20%;padding:0 5%;" onclick=window.location.href="'+url+'"><img class="a-swing" style="max-width:100%;max-height: 400px;border-radius: 10px;" src="'+imageurl+'" alt=""></p>' +
                '<p style="text-align:center;line-height:20px; color:#fff;margin:10px;padding:0px;" onclick=closediv("advtips") ><i class="beauty icon-anniu_guanbi" style="font-size: 32px;"></i></p>';

        }
        /*
                '<p style="text-align:center;line-height:20px; color:#fff;margin:0px;padding:0px;">长按并识别二维码</p>' +
        */
        document.body.appendChild(div);
        if($("#advtips").css("position") != 'fixed'){
            $("#advtips").attr("style","position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;");
        }

    }

}

function isWeiXin(){
    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    var ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

if(navigator.userAgent.indexOf("Html5Plus") > -1) {

}else{

    //if(getSaasId() == '0'){
        //if(localStorage.getItem("toapp") == null ||localStorage.getItem("toapp") == '' ){
            if(localStorage.getItem("token") == null || localStorage.getItem("token") == ''){

            }else{
                //alert(getIsAPPLE());
                if(!getIsAPPLE()){
                    //alert(2);
                    var nowPageUrl = window.location.protocol+"//"+window.location.host+window.location.port+window.location.pathname;

                    if(nowPageUrl.search("/index.html") != -1 ){//动态广场
                        if($("#logintips").size() == 0 && $("#advtips").size() == 0) {
                            if (localStorage.getItem("appdate1") != null) {//如果大于1天会再次请求
                                if (new Date().getTime() - new Date(localStorage.getItem("appdate1")).getTime() > 86400000) {
                                    isAdvTips('http://www.gaoxinggaoxing.com/download/'+getSaasId()+'/app.html','../../img/agent/images/download.png','appdate1');
                                }
                            }else{
                                isAdvTips('http://www.gaoxinggaoxing.com/download/'+getSaasId()+'/app.html','../../img/agent/images/download.png','appdate1');
                            }
                        }
                    }

                } else if(isWeiXin()) {
                    //alert(1);
                    isAdvTips('http://www.gaoxinggaoxing.com/download/'+getSaasId()+'/app.html','../../img/agent/images/download.png','appdate1');
                }






            }
        //}
    //}

    //分享是否有二维码
    /* if(getSaasId() == '201909091207'){
         if(curWwwPath.search("detail") != -1 || curWwwPath.search("article") != -1 || curWwwPath.search("howmakemoney") != -1){
             //包含
             var shareNow = GetUrlString("share");

             if(shareNow != null && shareNow != ''){
                 $("#mingpiantwo").show();
             }else{
                 $("#mingpiantwo").remove();
             }
         }
     }*/
}

(function() {
    var plusReady = function(callback) {
        if(window.plus) {
            callback();
        } else {
            document.addEventListener('plusready', callback);
        }
    }
    var shareServices = {};
    var init = function() {
        plus.share.getServices(function(services) {
            for(var i = 0, len = services.length; i < len; i++) {
                shareServices[services[i].id] = services[i];
            }
        });
    };
    var isWechatInstalled = function() {
        return plus.runtime.isApplicationExist && plus.runtime.isApplicationExist({
            pname: 'com.tencent.mm',
            action: 'weixin://'
        });
    };

    function share(id, msg, callback) {
        var service = shareServices[id];
        if(!service) {
            callback && callback(false);
            return;
        }
        var _share = function() {
            service.send(msg, function() {
                plus.nativeUI.toast("分享到\"" + service.description + "\"成功！");
                callback && callback(true);
            }, function(e) {
                plus.nativeUI.toast("分享到\"" + service.description + "\"失败！");
                callback && callback(false);
            })
        };
        if(service.authenticated) {
            _share(service, msg, callback);
        } else {
            service.authorize(function() {
                _share(service, msg, callback);
            }, function(e) {
                console.log("认证授权失败");
                callback && callback(false);
            })
        }
    };

    function openSystem(msg, callback) {
        if(plus.share.sendWithSystem) {
            plus.share.sendWithSystem(msg, function() {
                //TODO 系统分享暂不支持回调
                //callback && callback(true);
            }, function() {
                //TODO 系统分享暂不支持回调
                //callback && callback(false);
            });
        } else {
            callback && callback(false);
        }
    }
    var open = function(msg, callback) {
        /**
         *如下情况直接打开系统分享
         * 1、未配置微信分享通道
         * 2、用户手机未安装威胁你
         * 3、360浏览器下
         */

        if(shareServices.weixin && isWechatInstalled() && !/360\sAphone/.test(navigator.userAgent)) {
            plus.nativeUI.actionSheet({
                title: '分享到',
                cancel: "取消",
                buttons: [{
                    title: "微信消息"
                }, {
                    title: "微信朋友圈"
                }, {
                    title: "更多分享"
                }]
            }, function(e) {
                var index = e.index;
                switch(index) {
                    case 1: //分享到微信好友
                        msg.extra = {
                            scene: 'WXSceneSession'
                        };
                        share('weixin', msg, callback);
                        break;
                    case 2: //分享到微信朋友圈
                        msg.title = msg.content;
                        msg.extra = {
                            scene: 'WXSceneTimeline'
                        };
                        share('weixin', msg, callback);
                        break;
                    case 3: //更多分享
                        var url = msg.href ? ('( ' + msg.href + ' )') : '';
                        msg.title = msg.title + url;
                        msg.content = msg.content + url;
                        openSystem(msg, callback);
                        break;
                }
            })
        } else {
            //系统分享
            var url = msg.href ? ('( ' + msg.href + ' )') : '';
            msg.title = msg.title + url;
            msg.content = msg.content + url;
            openSystem(msg, callback);
        }
    };
    plusReady(init);
    window.plusShare = open;
})();

/**
 *
 * 登录-发送信息--V-信
 */
var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost";//本地模式
}
//文件请求URL
var baseFileUrlLogin = ''+basehost+'';
//请求实例
var instanceLogin = axios.create({
    baseURL: ''+basehost+'/sfd/a/api/',
    timeout: 180000000,
    headers: {'token': localStorage.getItem('token')}
});

//取消请求
var CancelTokenLogin = axios.CancelToken;
var sourceLogin = CancelTokenLogin.source();

// 添加请求拦截器
instanceLogin.interceptors.request.use(function (config) {
    /*// 在发送请求之前做些什么
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        sourceLogin.cancel();
    }*/
   sessionStorage.clear();return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instanceLogin.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

//获取微信信息
function setWeixinAudioInfo(){
    if(getBrowser() == 'wxmobile'){

        console.log("执行分享========1");
        //参数
        var url = location.href.split('#')[0];
        //传输数据
        var datauser = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
            "url":url
        }

        instanceLogin({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/wx/jssdkAudio',
            data: datauser,
            cancelToken: sourceLogin.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
                var wxdata = rs.data.result;
                var appId=wxdata.appId;
                var nonceStr=wxdata.nonceStr;
                var timestamp=wxdata.timestamp;
                var signature=wxdata.signature;
                console.log("appId========"+appId);
                console.log("nonceStr========"+nonceStr);
                console.log("timestamp========"+timestamp);
                console.log("signature========"+signature);

                wx.config({
                    debug: false,
                    appId: appId,
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: signature,
                    jsApiList: [
                        // 所有要调用的 API 都要加到这个列表中
                        'checkJsApi',
                        'startRecord',
                        'stopRecord',
                        'onVoiceRecordEnd',
                        'playVoice',
                        'pauseVoice',
                        'stopVoice',
                        'onVoicePlayEnd',
                        'uploadVoice',
                        'chooseImage',
                        'uploadImage',
                        'downloadImage',
                        'uploadVoice',
                        'chooseWXPay',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'updateAppMessageShareData',
                        'updateTimelineShareData'
                    ]
                });

                wx.ready(function () {


                    if(getSaasId() == '201908060443'){
                        wx.hideOptionMenu();
                    }
                    console.log("执行分享========2");
                    //分享
                    //document.getElementById('bgmusic').play();
                    //获取分享内容，分享图片，分享链接
                    var shareTitle =  $("#shareTitle").val();
                    if(shareTitle != null && shareTitle != '' && shareTitle != 'undefined'){
                        shareTitle = "" + $("#shareTitle").val() + "";
                    }

                    var shareContent = shareTitle;
                    /*if(shareContent != null && shareTitle != '' && shareTitle != 'undefined'){
                        shareContent = shareTitle + "[" + shareContent + "]";
                    }else{
                        shareContent = shareTitle;
                    }*/

                    if(shareContent == null || shareContent == '' || shareContent == 'undefined'){
                        shareContent = $('title').text();
                    }
                    shareContent =  "👉【"+setNULL(localStorage.getItem("saas"))+"】"+shareContent;

                    //可以根据不同类别进行前后增肌不同的emoji字符


                    var shareImage = $("#shareImage").val();
                    shareImage = getFirstImageDetailContent(shareImage,"1")
                    //console.log("shareContent========"+shareContent);
                    //console.log("shareImage========"+shareImage);
                    if(shareImage == null || shareImage == ''){
                        shareImage = basehost + baseDefaultHead;
                    }
                    var locationurl = window.location.href;
                    if(locationurl.search(/\?/) != -1){
                        if(locationurl.search(/share/) != -1){
                            //locationurl = window.location.href;
                        }else{
                            locationurl = window.location.href+"&share="+localStorage.getItem("userId");
                        }

                    }else{
                        locationurl = window.location.href+"?share="+localStorage.getItem("userId");
                    }
                    if(locationurl.search(/s=/) != -1){
                        //locationurl = window.location.href;
                    }else{
                        locationurl = locationurl +"&s="+getSaasId();
                    }
                    var shareLink = locationurl;
                    var shareDesc = localStorage.getItem("sharetext");
                    shareImage = checkPathHost(shareImage,'1');

                    //自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
                    wx.updateAppMessageShareData({
                        title:shareContent, // 分享标题
                        desc: shareDesc, // 分享描述
                        link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: shareImage, // 分享图标
                        success: function () {
                            //$.toast("分享成功",'success');
                        }
                    });

                    //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
                    wx.updateTimelineShareData({
                        title: shareContent, // 分享标题
                        link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: shareImage, // 分享图标
                        success: function () {
                            //$.toast("分享成功",'success');
                        }
                    });
                    wx.onMenuShareTimeline({
                        title: shareContent, // 分享标题
                        desc: shareDesc, // 分享描述
                        link: shareLink, // 分享链接
                        imgUrl: shareImage, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: shareContent, // 分享标题
                        desc: shareDesc, // 分享描述
                        link: shareLink, // 分享链接
                        imgUrl: shareImage, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    //公众号支付
                    /*wx.chooseWXPay({
                        timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: '', // 支付签名随机串，不长于 32 位
                        package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: '', // 支付签名
                        success: function (res) {
                        // 支付成功后的回调函数
                        }
                    });*/


                    //录音
                    //注册微信播放录音结束事件【一定要放在wx.ready函数内】
                    wx.onVoicePlayEnd({
                        success: function (res) {
                            //stopWave();
                        }
                    });

                    // 4.4 监听录音自动停止
                    wx.onVoiceRecordEnd({
                        complete: function (res) {
                            $.toast('录音时间已超过一分钟',"text");
                            voice.localId = res.localId;
                            uploadVoice();//上传录音到服务器
                            $("#luyinzhong").hide();
                            $("#luyinzhuangtai").show();
                            $("#luyinzhuangtai").attr("src","../../img/agent/images/zhuanma.png");
                            $("#recordtext").html("录音转码中…");
                            $("#recordtext").css("color","green");
                        }
                    });

                });

                wx.error(function(res){
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                    //$.toast('执行错误',"text");
                });


            }else{
                console.log('请求异常！')
            }

        });
    }
}



function h5Share() {
    if(navigator.userAgent.indexOf("Html5Plus") > -1) {
        //获取分享内容，分享图片，分享链接
        var shareTitle =  $("#shareTitle").val();
        if(shareTitle != null && shareTitle != '' && shareTitle != 'undefined'){
            shareTitle = "" + $("#shareTitle").val() + "";
        }

        var shareContent = shareTitle;
        /*if(shareContent != null && shareTitle != '' && shareTitle != 'undefined'){
            shareContent = shareTitle + "[" + shareContent + "]";
        }else{
            shareContent = shareTitle;
        }*/

        if(shareContent == null || shareContent == '' || shareContent == 'undefined'){
            shareContent = $('title').text();
        }
        shareContent =  "👉【"+setNULL(localStorage.getItem("saas"))+"】"+shareContent;

        //可以根据不同类别进行前后增肌不同的emoji字符


        var shareImage = $("#shareImage").val();
        shareImage = getFirstImageDetailContent(shareImage,"1");
        //console.log("shareContent========"+shareContent);
        //console.log("shareImage========"+shareImage);
        if(shareImage == null || shareImage == ''){
            shareImage = basehost + baseDefaultHead;
        }
        var locationurl = window.location.href;
        if(locationurl.search(/\?/) != -1){
            if(locationurl.search(/share/) != -1){
                if(GetQueryString("share") == null || GetQueryString("share") == 'null' || GetQueryString("share") == '' ){
                    locationurl = window.location.href+"&share="+localStorage.getItem("userId");
                }
                //locationurl = window.location.href;
            }else{
                locationurl = window.location.href+"&share="+localStorage.getItem("userId");
            }

        }else{
            locationurl = window.location.href+"?share="+localStorage.getItem("userId");
        }

        if(locationurl.search(/s=/) != -1){
            //locationurl = window.location.href;
        }else{
            locationurl = locationurl +"&s="+getSaasId();
        }
        var shareLink = locationurl;
        var shareDesc = localStorage.getItem("sharetext");

        console.log("shareImage========"+shareImage);

        shareImage = checkPathHost(shareImage,'1');

        //5+ 原生分享
        window.plusShare({
            title: shareContent,//应用名字
            content: shareDesc,
            href: shareLink,//分享出去后，点击跳转地址
            thumbs: [shareImage] //分享缩略图
        }, function(result) {
            //分享回调
        });
    } else {
        //原有wap分享实现
    }

}

function h5ShareQun() {
    if(navigator.userAgent.indexOf("Html5Plus") > -1) {
        //获取分享内容，分享图片，分享链接
        var shareTitle =  $("#shareTitle").val();
        var shareName =  $("#shareName").val();
        var shareLink =  $("#shareLink").val();
        if(shareTitle != null && shareTitle != '' && shareTitle != 'undefined'){
            shareTitle = "" + $("#shareTitle").val() + "";
        }

        var shareContent = shareTitle;
        /*if(shareContent != null && shareTitle != '' && shareTitle != 'undefined'){
            shareContent = shareTitle + "[" + shareContent + "]";
        }else{
            shareContent = shareTitle;
        }*/

        if(shareContent == null || shareContent == '' || shareContent == 'undefined'){
            shareContent = $('title').text();
        }
        shareContent =  "👉【"+setNULL(shareName)+"】"+shareContent;

        //可以根据不同类别进行前后增肌不同的emoji字符


        var shareImage = $("#shareImage").val();
        shareImage = getFirstImageDetailContent(shareImage,"1");
        //console.log("shareContent========"+shareContent);
        //console.log("shareImage========"+shareImage);
        if(shareImage == null || shareImage == ''){
            shareImage = basehost + baseDefaultHead;
        }
        var locationurl = shareLink;
        var shareLink = locationurl;
        var shareDesc = localStorage.getItem("sharetext");

        shareImage = checkPathHost(shareImage,'1');
        //5+ 原生分享
        window.plusShare({
            title: shareContent,//应用名字
            content: shareDesc,
            href: shareLink,//分享出去后，点击跳转地址
            thumbs: [shareImage] //分享缩略图
        }, function(result) {
            //分享回调
        });
    } else {
        //原有wap分享实现
    }

}


//如果是微信执行微信初始化
var browserCheck = getBrowser();
//var browserCheck = "";
if(browserCheck == 'wxmobile'){

    setWeixinAudioInfo();

}


function isLogin(url,imageurl){//登录

    if($("#logintips").size() == 0  && $("#advtips").size() == 0){
        if(localStorage.getItem('token') == null  || localStorage.getItem('token') == 'null'  || localStorage.getItem('token') == ''){
            //localStorage.setItem('advdate',getNowFormatDate());

            var div = document.createElement('div');
            div.id='logintips';
            div.style='position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;font-size: 16px;';
            if(($("#mustLoginFlag").size() == 0 && localStorage.getItem("ismustlogin") != '1') || navigator.userAgent.indexOf("Html5Plus") > -1 ) {//是否强制登录
                div.innerHTML= HTMLlogin + '<p style="text-align:center;line-height:20px; color:#fff;margin:10px;padding:0px;" onclick=closediv("logintips") ><i class="beauty icon-anniu_guanbi" style="font-size: 32px;"></i></p>';
            }else{
                div.innerHTML= HTMLlogin;
            }

            $("input,select,textarea").blur(function(){
                setTimeout(function() {
                    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                }, 100);
            });

            if($("#logintips").size() == 0){
                //$("div").hide();
                document.body.appendChild(div);
                if($("#logintips").css("position") != 'fixed'){
                    $("#logintips").attr("style","position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;");
                }
            }
            //return false;

        }
    }



}



function isLogin2(url,imageurl){//登录

    if($("#logintips").size() == 0  && $("#advtips").size() == 0){
        if(localStorage.getItem('token') == null  || localStorage.getItem('token') == 'null'  || localStorage.getItem('token') == ''){
            //localStorage.setItem('advdate',getNowFormatDate());

            var div = document.createElement('div');
            div.id='logintips';
            div.style='position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;font-size: 16px;';
            if(($("#mustLoginFlag").size() == 0 && localStorage.getItem("ismustlogin") != '1') || navigator.userAgent.indexOf("Html5Plus") > -1 ) {//是否强制登录
                div.innerHTML= HTMLlogin + '<p style="text-align:center;line-height:20px; color:#fff;margin:10px;padding:0px;" onclick=closediv("logintips") ><i class="beauty icon-anniu_guanbi" style="font-size: 32px;"></i></p>';
            }else{
                div.innerHTML= HTMLlogin;
            }

            $("input,select,textarea").blur(function(){
                setTimeout(function() {
                    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                }, 100);
            });

            if($("#logintips").size() == 0){
                //$("div").hide();
                document.body.appendChild(div);
                if($("#logintips").css("position") != 'fixed'){
                    $("#logintips").attr("style","position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;");
                }
            }
            return false;

        }else{
            return true;
        }
    }else{
        return true;
    }



}



function login(){

    var weuiAgree = $("input[name='loginagree']:checked").val();

    //alert($("#weuiAgree").attr('checked'));
    var loginmobile = $("#loginmobile").val();
    var logincode = $("#logincode").val();
    var password = $("#password").val();

    if(loginmobile=="" || !/1[3|4|6|5|7|8|9]\d{9}/.test(loginmobile)){
        $.toast("手机号不正确","text");

        return false;
    }else if($("#logincode").size() > 0 && (logincode == "" || !/\d{4}/.test(logincode))){
        $.toast("验证码不正确","text");

        return false;
    }else if($("#password").size() > 0 && (password == "" || password == null)){
        $.toast("密码不正确","text");
        return false;
    }/*else if(!weuiAgree){
        /!*$.toast("请选择注册协议","text");

        return false;*!/
    }*/else{
        loginin();
    }

}

//登录
function loginin(){

    var url = '/sys/user/login';
    if($("#password").size() > 0){
        url = '/sys/user/loginbypassword';
    }
    //参数
    var loginName = $("#loginmobile").val();
    var smsCode = $("#logincode").val();
    var inUser = getShareId();//注册推荐人--无法覆盖--和锁粉有区别--可能是同一个人也可能不是同一个人
    var password = $("#password").val();
    $.toast.prototype.defaults.duration=5000;$.toast("登录中…", "text");
    //传输数据
    var datauser = {
        "loginName":loginName,
        "inUser":inUser,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "password":password,
        "smsCode":smsCode
    }

    instanceLogin({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: datauser,
        cancelToken: sourceLogin.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //$.toast("操作成功", 'success');
                localStorage.setItem('token',rs.data.result.token);
                localStorage.setItem('userLevel',rs.data.result.userLevel);
                localStorage.setItem('daili',rs.data.result.daili);
                localStorage.setItem('userId',rs.data.result.user.id);
                localStorage.setItem('openId',rs.data.result.user.openId);
                localStorage.setItem('headimageurl',checkPath(rs.data.result.user.headimgurl));
                localStorage.setItem('nickname',encodeURI(rs.data.result.user.nickname));
                //console.log(rs.data.result.user.nickname)
                localStorage.setItem('mobile',rs.data.result.user.mobile);
                localStorage.setItem('userInfo',encodeURI(rs.data.result.user.userInfo));
                //console.log(rs.data.result.user.userInfo)
                //console.log(1);

                if(getBrowser() == 'wxmobile'){
                    //console.log(2);
                    //console.log("进入微信====");
                    if(rs.data.result.user.openId == 'undefined' || rs.data.result.user.openId == null || rs.data.result.user.openId == ''){
                        //console.log(3);
                        closediv("logintips");

                        weixin();

                    }else{
                        //console.log(4);
                        closediv("logintips");

                        weixin();
                    }

                }else{
                    //console.log(5);
                    //refresh();
                    //var reloadurl = window.location.href + "?dd=1";
                    //reloadurl = reloadurl + "?version=1";

                    refresh();
                }

            }else{
                //alert(rs.data.msg);

                $.toast(rs.data.msg, "text");

            }
        }else{
            console.log('请求异常！')
        }

    });

}

//判断token是否有效
//登录
function tokenjudge(){

    //参数
    var token = localStorage.getItem("token");
    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instanceLogin({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/token',
        data: datauser,
        cancelToken: sourceLogin.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code != '0'){
                //localStorage.clear();

                isLogin();

            }

        }else{
            console.log('请求异常！')
        }

    });

}

if($("#notoken").size() >  0  ){
    if(localStorage.getItem("token") != null  && localStorage.getItem("token") != '' ){
        tokenjudge();
    }

}else{
    tokenjudge();
}



//登录
function suofen(){

    //参数
    var token = localStorage.getItem("token");
    var inUser = getShareId();//注册推荐人--可覆盖--和锁粉有区别--可能是同一个人也可能不是同一个人
    //传输数据
    var datauser = {
        "inUser":inUser,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instanceLogin({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/suofen',
        data: datauser,
        cancelToken: sourceLogin.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){

        }else{
            console.log('请求异常！')
        }

    });

}

if(localStorage.getItem('token') != null  &&  localStorage.getItem('token') != 'null' && localStorage.getItem('token') != ''){
    if(GetUrlString("share") != null && GetUrlString("share") != '' ){
        suofen()//锁粉判断
    }
}



function weixin(){
    if(localStorage.getItem("isweixinshouquan") == '1'){
        if(localStorage.getItem("openId") == '' || localStorage.getItem("openId") == null || localStorage.getItem("openId") == 'null' || localStorage.getItem("openId") == 'undefined'){
            var repath=urlencode(window.location.href);
            //var repath = 'https://www.gaoxinggaoxing.com';
            //console.log("repath===="+repath);
            console.log("执行授权====");
            var appid = localStorage.getItem("appid");
            window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+repath+"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
        }else{
            refresh();
        }
    }else{
        refresh();
    }


}


//获取微信信息
function setWeixinInfo(){


    //参数
    var id = localStorage.getItem('userId');
    var code = GetUrlString("code");
    console.log("id========"+id);
    console.log("code========"+code);
    if(id == null || id == '' || id == 'undefined'){
        return false;
    }
    if(code == null || code == '' || code == 'undefined'){
        return false;
    }
    //传输数据
    var datauser = {
        "id":id,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "code":code
    }

    instanceLogin({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/wx/weiXinUserInfo',
        data: datauser,
        cancelToken: sourceLogin.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            //console.log("gengxin========");
            //更新头像，openId
            localStorage.setItem('openId',rs.data.result.openId);
            localStorage.setItem('headimageurl',checkPath(rs.data.result.headimgurl));
            localStorage.setItem('nickname',encodeURI(rs.data.result.nickname));
            var repath=window.location.href;
            if(repath.search(/code=/) != -1){
                repath.replace("code","codetemp");
            }
            location.href= repath;

        }else{
            console.log('请求异常！')
        }

    });

}

//获取微信用户信息
var code = GetUrlString("code");
//console.log("codecodecode========"+code);
if(code != null){
    if(localStorage.getItem("openId") == '' || localStorage.getItem("openId") == null || localStorage.getItem("openId") == 'null'  || localStorage.getItem("openId") == 'undefined'){
        setWeixinInfo();
    }
}

//发送短信
function sendSMS(){

    //参数
    var loginName = $("#loginmobile").val();
    var smsSign = localStorage.getItem('smsSign');

    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "smsSign":smsSign,
        "mobile":loginName
    }

    instanceLogin({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/wx/sendsms',
        data: datauser,
        cancelToken: sourceLogin.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //$.toast('短信发送成功', 'success');
                $.toast.prototype.defaults.duration=1000;//1秒
                $.toast('短信发送成功','text');
            }else{
                $.toast(rs.data.msg, "text");
            }


        }else{
            console.log('请求异常！')
        }

    });

}




//假设全局变量已经在外部定义
var voice = { localId: '',   serverId: ''  };//全局变量
var END;
var START;
var recordTimer;
//按下开始录音
$('#voicefile').on('touchstart', function(event){
    $.toast('开始',"text");
    event.preventDefault();
    START = new Date().getTime();

    recordTimer = setTimeout(function(){
        wx.startRecord({
            success: function(){
                //录音图标样式处理
                $("#voicefile").html("录音开始");
                localStorage.rainAllowRecord = 'true';
            },
            cancel: function () {
                $.toast('用户拒绝授权录音',"text");
            }
        });
    },300);
});
//松手结束录音
$('#voicefile').on('touchend', function(event){
    $.toast('结束',"text");
    event.preventDefault();
    END = new Date().getTime();

    if((END - START) < 300){
        END = 0;
        START = 0;
        //小于300ms，不录音
        clearTimeout(recordTimer);
        $.toast('录音时间过短',"text");
        $("#voicefile").html("录音结束");
    }else{
        wx.stopRecord({
            success: function (res) {
                voice.localId = res.localId;
                //录音图标样式处理
                $("#voicefile").html("录音结束");
                uploadVoice();
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });
    }
});

function startRecord(){
    //$.toast('开始',"text");
    //event.preventDefault();
    START = new Date().getTime();

    recordTimer = setTimeout(function(){
        wx.startRecord({
            success: function(){
                //录音图标样式处理
                $("#luyinzhuangtai").hide();
                $("#luyinzhong").show();
                $("#recordtext").html("录音中(点击可停止)");
                $("#recordtext").css("color","#ef4f4f");


                $("#voicefile").attr("onclick","endRecord()");
                localStorage.rainAllowRecord = 'true';
            },
            cancel: function () {
                $.toast('用户拒绝授权录音',"text");
                $("#luyinzhong").hide();
                $("#luyinzhuangtai").show();

                $("#recordtext").html("点击开始录音");
                $("#recordtext").css("color","#FF6666");

            }
        });
    },300);
}
function endRecord(){
    //$.toast('结束',"text");
    //event.preventDefault();
    END = new Date().getTime();

    if((END - START) < 300){
        END = 0;
        START = 0;
        //小于300ms，不录音
        clearTimeout(recordTimer);
        $.toast('录音时间过短',"text");
        //$("#voicefile").html("录音结束");
        $("#luyinzhong").hide();
        $("#luyinzhuangtai").show();

        $("#recordtext").html("点击开始录音");
        $("#recordtext").css("color","green");
    }else{
        wx.stopRecord({
            success: function (res) {
                voice.localId = res.localId;
                //录音图标样式处理
                $("#luyinzhong").hide();
                $("#luyinzhuangtai").show();
                $("#luyinzhuangtai").attr("src","../../img/agent/images/zhuanma.png");
                $("#recordtext").html("录音转码中…");
                $("#recordtext").css("color","#FF6666");


                //$("#voicefile").html("录音结束");

               // $("#voicefile").html("点我开始录音");
                uploadVoice();
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });
    }
}



//上传录音
function uploadVoice(){
    //调用微信的上传录音接口把本地录音先上传到微信的服务器
    //不过，微信只保留3天，而我们需要长期保存，我们需要把资源从微信服务器下载到自己的服务器
    wx.uploadVoice({
        localId: voice.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            //把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。
            //传输数据
            var datauser = {
                "mediaId":res.serverId,
                "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
                "mediaType":'audio'
            }

            instanceLogin({
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                },//设置跨域请求头
                method: 'post',
                url: '/wx/jssdkAudioSave',
                data: datauser,
                cancelToken: sourceLogin.token
            }) .then(function(rs){
                //console.log(rs)//数据在rs.data中  状态rs.status=200
                if(rs.status=200){
                    //处理id和类型input
                    if($("#voicefileInput").size() > 0){
                        $("#voicefileInput").val(rs.data.result.dbPath);
                    }else{
                        $("body").append("<input type='hidden' id='voicefileInput' value='"+rs.data.result.dbPath+"' >");
                    }

                    //处理按钮事件刷新
                    $("#voicefile").attr("onclick","startRecord()");
                    //录音转码完成
                    $("#luyinzhong").hide();
                    $("#luyinzhuangtai").show();
                    $("#luyinzhuangtai").attr("src","../../img/agent/images/success.png");
                    $("#recordtext").html("录音完成(点我可重录)");
                    $("#recordtext").css("color","#FF6666");
                }else{
                    console.log('请求异常！')
                }

            });
        }
    });
}







//登录
function salarySort(){

    //参数
    var token = localStorage.getItem("token");
    var inUser = getShareId();//注册推荐人--可覆盖--和锁粉有区别--可能是同一个人也可能不是同一个人
    //传输数据
    var datauser = {
        "inUser":inUser,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instanceLogin({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/userMoneylist',
        data: datauser,
        cancelToken: sourceLogin.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){

            if(rs.data.code == '0'){
                var str1 = '';
                $.each(rs.data.result,function(i,item){

                    str1 += '<a class="weui-cell weui-cell_access myweui-cell" onclick=toUserHome("'+item.id+'","1");>';
                    str1 += '<div class="weui-cell__hd" style="background-image:url('+ checkPathBackGroubdImage(item.headimgurl,'1')+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;width: 45px;height:45px;border-radius: 20px;"></div>';
                    str1 += '<div class="weui-cell__bd">';
                    str1 += '<div class="weui-news-text">';
                    str1 += '<div class="weui-news-title onerow">'+item.nickname+'</div>';
                    str1 += '</div>';
                    str1 += '<div class="weui-news-info mynesinfo">';
                    str1 += '<div class="weui-news-infoitem">';
                    str1 += '<i class="beauty icon-cengji" id="icon33"></i>'+setNULL(item.userLevel)+',加入'+setNULL(item.remarks)+'天';
                    str1 += '</div>';
                    str1 += '<div class="weui-news-infoitem"><i class="beauty icon-jinbi" id="icon33"></i>'+setNum(item.coursePrice)+'';
                    str1 += '</div>';
                    str1 += '</div>';
                    str1 += '</div>';
                    str1 += '</a>';
                });
                $("#salarySort").html(str1);


            }else{
                $.toast(rs.data.msg, "text");
            }

        }else{
            console.log('请求异常！')
        }

    });

}


//登录
function qudaoSort(){
    //分页
    var pageNoTemp = $("#listzqPageNo").val();
    if (pageNoTemp > 0) {
        $("#listzqPageNo").val(eval(pageNoTemp) + 1);
    } else {
        $("body").append("<input type='hidden' id='listzqPageNo' value='1' >");
    }
    var pageNo = $("#listzqPageNo").val();
    //参数
    var token = localStorage.getItem("token");
    var inUser = getShareId();//注册推荐人--可覆盖--和锁粉有区别--可能是同一个人也可能不是同一个人
    //传输数据
    var datauser = {
        "inUser":inUser,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token,
        "pageNo": pageNo
    }

    instanceLogin({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/userQudaolist',
        data: datauser,
        cancelToken: sourceLogin.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){

            if(rs.data.code == '0'){
                var listzqStr = '';
                $.each(rs.data.result,function(i,item){

                    listzqStr += '<li class="weui-news-item kapian top15" onclick=toUserHome("' + item.id + '","1") style="padding-bottom: 10px;padding-top: 10px;">';
                    listzqStr += '<div class="weui-news-inner">';
                    listzqStr += '<div class="weui-news-media square shadowonly" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                    listzqStr += '</div>';
                    listzqStr += '<div class="weui-news-inners">';
                    listzqStr += '<div class="weui-news-text">';
                    listzqStr += '<div class="weui-news-title">';
                    listzqStr += '' + setNULL(item.nickname) + '';
                    listzqStr += ' <p class="weui-news-p onerow">';
                    if(item.userInfo != '空空如也'){
                        listzqStr += '' + setNULL(item.userInfo) + '';
                    }


                    listzqStr += '</div>';

                    listzqStr += '</div>';
                    listzqStr += '<div class="weui-news-info" style="padding: 0px !important;">';
                    listzqStr += '<div class="weui-news-infoitem">';
                    listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                    listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                    listzqStr += '<label class="label f-red b-red">动态(' + setNum(item.dongtaiNum) + ')</label>';
                    listzqStr += '<label class="label f-red b-red">粉丝(' + setNum(item.funsGuanzhuNum) + ')</label>';

                    listzqStr += '<label class="label f-blue b-blue">余额￥' + setNum(item.money) + '</label>';

                   /* listzqStr += '</p>';
                    listzqStr += ' <p class="weui-news-p onerow" style="color: #FF5722;">';
                    listzqStr += '保证金余额：￥' + setNum(item.money) + '';
                    listzqStr += '</p>';*/
                    listzqStr += '</div>';
                    listzqStr += '</span>';
                    listzqStr += '</div>';
                    /*listzqStr += '<div class="weui-news-infoitem">';
                    listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                    listzqStr += '</div>';*/
                    listzqStr += '</div>';
                    listzqStr += '</div>';
                    listzqStr += '</div>';
                    listzqStr += '</li>';

                });
                $("#salarySort").append(listzqStr);
                $("#num").html("("+rs.data.count+"人)");

            }else{
                $.toast(rs.data.msg, "text");
            }

        }else{
            console.log('请求异常！')
        }

    });

}



//设置用户信息
function setuserinfo(){

    //参数
    var token = localStorage.getItem("token");
    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instanceLogin({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/bduserdetailbytoken',
        data: datauser,
        cancelToken: sourceLogin.token
    }) .then(function(rs){
        //数据在rs.data中  状态rs.status=200
        if(rs.status=200){

            if(rs.data.code == '0'){
                console.log(rs.data.result)
                if(rs.data.result.bdType == null || rs.data.result.bdType == '' || rs.data.result.bdHangye == null ||  rs.data.result.bdHangye == ''){

                    var str1 = '<div style="width:80%;margin: 20% auto;background-color:white;">';
                    str1 += '<div class="weui-cells__title" style="padding-top: 20px;">用户类型（个人资料中可修改）</div>';
                    str1 += '<div class="weui-cells weui-cells_radio" style="max-height: 300px;position: unset;overflow: auto;" >';
                    $.each(rs.data.result.listDictBdType,function(i,item){

                        str1  += '<label onclick=setbdtype("'+item.value+'") class="weui-cell weui-check__label" for="xbd'+i+'">';
                        str1  += '<div class="weui-cell__bd">';
                        str1  += '<p>'+item.label+'</p>';
                        str1  += '</div>';
                        str1  += '<div class="weui-cell__ft">';
                        if(i == 0){
                            str1  += '<input type="hidden" id="bdtype" value="'+item.value+'">';
                            str1  += '<input class="weui-check" name="bdradio" id="xbd'+i+'" value="'+item.value+'" checked="checked" type="radio">';
                        }else{
                            str1  += '<input class="weui-check" name="bdradio" id="xbd'+i+'" value="'+item.value+'" type="radio">';
                        }
                        str1  += '<span class="weui-icon-checked"></span>';
                        str1  += '</div>';
                        str1  += '</label>';


                    });

                    str1  += '</div>';
                    str1  += '<a href="javascript:bdnext();" class="weui-btn weui-btn_primary mybtn">下一步</a>';
                    str1  += '</div>';


                    var div = document.createElement('div');
                    div.id='setbdinfo';
                    div.style='position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;';
                    div.innerHTML= str1;

                    $("input,select,textarea").blur(function(){
                        setTimeout(function() {
                            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                        }, 100);
                    });

                    if($("#setbdinfo").size() == 0){
                        document.body.appendChild(div);
                        if($("#setbdinfo").css("position") != 'fixed'){
                            $("#setbdinfo").attr("style","position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;");
                        }
                    }



                    var str2 = '<div style="width:80%;margin: 20% auto;background-color:white;">';
                    str2 += '<div class="weui-cells__title" style="padding-top: 20px;">行业分类（个人资料中可修改）</div>';
                    str2 += '<div class="weui-cells weui-cells_radio" style="max-height: 300px;position: unset;overflow: auto;" >';
                    $.each(rs.data.result.listDictBdHangye,function(i,item){

                        str2  += '<label onclick=setbdhangye("'+item.value+'") class="weui-cell weui-check__label" for="xbdnext'+i+'">';
                        str2  += '<div class="weui-cell__bd">';
                        str2  += '<p>'+item.label+'</p>';
                        str2  += '</div>';
                        str2  += '<div class="weui-cell__ft">';
                        if(i == 0){
                            str2  += '<input type="hidden" id="bdhangye" value="'+item.value+'">';
                            str2  += '<input class="weui-check" name="bdradionext" id="xbdnext'+i+'" value="'+item.value+'" checked="checked" type="radio">';
                        }else{
                            str2  += '<input class="weui-check" name="bdradionext" id="xbdnext'+i+'" value="'+item.value+'" type="radio">';
                        }
                        str2  += '<span class="weui-icon-checked"></span>';
                        str2  += '</div>';
                        str2  += '</label>';


                    });

                    str2  += '</div>';
                    str2  += '<a href="javascript:subbd();" class="weui-btn weui-btn_primary mybtn">提交</a>';
                    str2  += '</div>';


                    var div = document.createElement('div');
                    div.id='setbdnextinfo';
                    div.style='position: fixed; left:0; top:0;display:none; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;';
                    div.innerHTML= str2;


                    if($("#setbdnextinfo").size() == 0){
                        document.body.appendChild(div);
                        if($("#setbdnextinfo").css("position") != 'fixed'){
                            $("#setbdnextinfo").attr("style","position: fixed;display:none; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;");
                        }
                    }
                }



            }else{
                $.toast(rs.data.msg, "text");
            }

        }else{
            console.log('请求异常！')
        }

    });

}

function setbdtype(obj) {
    $("#bdtype").val(obj);
}
function setbdhangye(obj) {
    $("#bdhangye").val(obj);
}

function bdnext() {
    $("#setbdinfo").hide();
    $("#setbdnextinfo").show();
}

function subbd() {

    //参数
    var token = localStorage.getItem("token");
    var bdType = $("#bdtype").val();
    var bdHangye = $("#bdhangye").val();
    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "bdType":bdType,
        "bdHangye":bdHangye,
        "token":token
    }

    instanceLogin({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/bdupdate',
        data: datauser,
        cancelToken: sourceLogin.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                refresh();
            }else{
                $.toast(rs.data.msg, "text");
            }
        }else{
            console.log('请求异常！')
        }

    });


}


//更新用户信息
function updatebdinfo(){

    //参数
    var token = localStorage.getItem("token");
    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instanceLogin({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/bduserdetailbytoken',
        data: datauser,
        cancelToken: sourceLogin.token
    }) .then(function(rs){
        //数据在rs.data中  状态rs.status=200
        if(rs.status=200){

            if(rs.data.code == '0'){
                console.log(rs.data.result)
                if(1==1){

                    var str1 = '<div style="width:80%;margin: 20% auto;background-color:white;">';
                    str1 += '<div class="weui-cells__title" style="padding-top: 20px;">用户类型</div>';
                    str1 += '<div class="weui-cells weui-cells_radio" style="max-height: 300px;position: unset;overflow: auto;" >';
                    $.each(rs.data.result.listDictBdType,function(i,item){

                        str1  += '<label onclick=setbdtype("'+item.value+'") class="weui-cell weui-check__label" for="xbd'+i+'">';
                        str1  += '<div class="weui-cell__bd">';
                        str1  += '<p>'+item.label+'</p>';
                        str1  += '</div>';
                        str1  += '<div class="weui-cell__ft">';
                        if(rs.data.result.bdType != null && rs.data.result.bdType != ''){
                            if(rs.data.result.bdType == item.value){
                                if($("#bdtype").size() > 0){
                                    $("#bdtype").val(item.value);
                                }else{
                                    str1  += '<input type="hidden" id="bdtype" value="'+item.value+'">';
                                }

                                str1  += '<input class="weui-check" name="bdradio" id="xbd'+i+'" value="'+item.value+'" checked="checked" type="radio">';
                            }else{
                                str1  += '<input class="weui-check" name="bdradio" id="xbd'+i+'" value="'+item.value+'" type="radio">';
                            }
                        }else{
                            if(i == 0){
                                if($("#bdtype").size() > 0){
                                    $("#bdtype").val(item.value);
                                }else{
                                    str1  += '<input type="hidden" id="bdtype" value="'+item.value+'">';
                                }

                                str1  += '<input class="weui-check" name="bdradio" id="xbd'+i+'" value="'+item.value+'" checked="checked" type="radio">';
                            }else{
                                str1  += '<input class="weui-check" name="bdradio" id="xbd'+i+'" value="'+item.value+'" type="radio">';
                            }
                        }

                        str1  += '<span class="weui-icon-checked"></span>';
                        str1  += '</div>';
                        str1  += '</label>';


                    });

                    str1  += '</div>';
                    str1  += '<a href="javascript:bdnext();" class="weui-btn weui-btn_primary mybtn">下一步</a>';
                    str1  += '</div>';


                    var div = document.createElement('div');
                    div.id='setbdinfo';
                    div.style='position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;';
                    div.innerHTML= str1;

                    $("input,select,textarea").blur(function(){
                        setTimeout(function() {
                            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                        }, 100);
                    });

                    if($("#setbdinfo").size() == 0){
                        document.body.appendChild(div);
                        if($("#setbdinfo").css("position") != 'fixed'){
                            $("#setbdinfo").attr("style","position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;");
                        }
                    }



                    var str2 = '<div style="width:80%;margin: 20% auto;background-color:white;">';
                    str2 += '<div class="weui-cells__title" style="padding-top: 20px;">行业分类</div>';
                    str2 += '<div class="weui-cells weui-cells_radio" style="max-height: 300px;position: unset;overflow: auto;" >';
                    $.each(rs.data.result.listDictBdHangye,function(i,item){

                        str2  += '<label onclick=setbdhangye("'+item.value+'") class="weui-cell weui-check__label" for="xbdnext'+i+'">';
                        str2  += '<div class="weui-cell__bd">';
                        str2  += '<p>'+item.label+'</p>';
                        str2  += '</div>';
                        str2  += '<div class="weui-cell__ft">';
                        if(rs.data.result.bdHangye != null && rs.data.result.bdHangye != ''){
                            if(rs.data.result.bdHangye == item.value){
                                if($("#bdhangye").size() > 0){
                                    $("#bdhangye").val(item.value);
                                }else{
                                    str2  += '<input type="hidden" id="bdhangye" value="'+item.value+'">';
                                }

                                str2  += '<input class="weui-check" name="bdradionext" id="xbdnext'+i+'" value="'+item.value+'" checked="checked" type="radio">';
                            }else{
                                str2  += '<input class="weui-check" name="bdradionext" id="xbdnext'+i+'" value="'+item.value+'" type="radio">';
                            }
                        }else{
                            if(i == 0){
                                if($("#bdhangye").size() > 0){
                                    $("#bdhangye").val(item.value);
                                }else{
                                    str2  += '<input type="hidden" id="bdhangye" value="'+item.value+'">';
                                }

                                str2  += '<input class="weui-check" name="bdradionext" id="xbdnext'+i+'" value="'+item.value+'" checked="checked" type="radio">';
                            }else{
                                str2  += '<input class="weui-check" name="bdradionext" id="xbdnext'+i+'" value="'+item.value+'" type="radio">';
                            }
                        }
                        str2  += '<span class="weui-icon-checked"></span>';
                        str2  += '</div>';
                        str2  += '</label>';


                    });

                    str2  += '</div>';
                    str2  += '<a href="javascript:subbd();" class="weui-btn weui-btn_primary mybtn">提交</a>';
                    str2  += '</div>';


                    var div = document.createElement('div');
                    div.id='setbdnextinfo';
                    div.style='position: fixed; left:0; top:0;display:none; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;';
                    div.innerHTML= str2;


                    if($("#setbdnextinfo").size() == 0){
                        document.body.appendChild(div);
                        if($("#setbdnextinfo").css("position") != 'fixed'){
                            $("#setbdnextinfo").attr("style","position: fixed;display:none; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;");
                        }
                    }
                }



            }else{
                $.toast(rs.data.msg, "text");
            }

        }else{
            console.log('请求异常！')
        }

    });

}


//获取用户类型信息
function getBdTypeInfo(){

    //参数
    var token = localStorage.getItem("token");
    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instanceLogin({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/getBdType',
        data: datauser,
        cancelToken: sourceLogin.token
    }) .then(function(rs){
        //数据在rs.data中  状态rs.status=200
        if(rs.status=200){

            if(rs.data.code == '0'){
                console.log(rs.data.result)
                    var str1 = '';
                    str1 += '<div class="weui-feeds">';
                    str1 += '<ul>';
                    $.each(rs.data.result.listDictBdType,function(i,item){
                        if(i < 9){
                            str1 += '<li onclick=toBdList("bduser","'+item.value+'","");>';
                            str1 += '<span class="shadowonly"  style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:no-repeat;background-size:cover;"><span class="weui-mark-lb boem" style="padding-top: 0%;">'+item.label+'</span></span>';
                            str1 += '</li>';
                        }
                    });
                    str1 += '</ul>';
                    str1 += '</div>';
                    $("#selectbytype").html(str1);


                var str2 = '';
                str2 += '<div class="weui-feeds" style="margin-top: 2px;">';
                str2 += '<ul>';
                $.each(rs.data.result.listDictBdHangye,function(i,item){
                    if(i < 9){
                        str2 += '<li onclick=toBdList("bduser","","'+item.value+'");>';
                        str2 += '<span class="shadowonly"  style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:no-repeat;background-size:cover;"><span class="weui-mark-lb boem" style="padding-top: 0%;">'+item.label+'</span></span>';
                        str2 += '</li>';
                    }
                });
                str2 += '</ul>';
                str2 += '</div>';
                $("#selectbyhangye").append(str2);

                if(rs.data.result.listDictBdHangye.length > 9){
                    var str3 = '';
                    str3 += '<div class="weui-feeds" style="margin-top: 2px;">';
                    str3 += '<ul>';
                    $.each(rs.data.result.listDictBdHangye,function(i,item){
                        if(i > 8 && i < 18){
                            str3 += '<li onclick=toBdList("bduser","","'+item.value+'");>';
                            str3 += '<span class="shadowonly"  style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:no-repeat;background-size:cover;"><span class="weui-mark-lb boem" style="padding-top: 0%;">'+item.label+'</span></span>';
                            str3 += '</li>';
                        }
                    });
                    str3 += '</ul>';
                    str3 += '</div>';
                    $("#selectbyhangye").append(str3);

                }

                if(rs.data.result.listDictBdHangye.length > 18){
                    var str4 = '';
                    str4 += '<div class="weui-feeds" style="margin-top: 2px;">';
                    str4 += '<ul>';
                    $.each(rs.data.result.listDictBdHangye,function(i,item){
                        if(i > 17 && i < 27){
                            str4 += '<li onclick=toBdList("bduser","","'+item.value+'");>';
                            str4 += '<span  class="shadowonly"  style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:no-repeat;background-size:cover;"><span class="weui-mark-lb boem" style="padding-top: 0%;">'+item.label+'</span></span>';
                            str4 += '</li>';
                        }
                    });
                    str4 += '</ul>';
                    str4 += '</div>';
                    $("#selectbyhangye").append(str4);

                }
                var str5 = '';
                str5 += '<div id="tagnavmenu" class="weui-navigator weui-navigator-wrapper top0" style="background-color: white;top：0px;">';
                str5 += '<ul class="weui-navigator-list">';
                str5 += '<li ><a class="a-swing" href="javascript:hangye(\'\');" style="padding: 0 10px;">全部</a></li>';
                $.each(rs.data.result.listDictBdHangye,function(i,item){

                    str5 += '<li ><a href="javascript:hangye('+item.value+');" style="padding: 0 10px;">'+item.label+'</a></li>';

                });
                str5 += '</ul>';
                str5 += '</div>';
                $("#selectbyhangyemenu").append(str5);
                TagNav('#tagnavmenu',{
                    type: 'scrollToNext',
                    curClassName: 'weui-state-active',
                    index:0
                });

                $("#disselectbyhangye").show();
                $("#disselectbytype").show();

            }else{
                $.toast(rs.data.msg, "text");
            }

        }else{
            console.log('请求异常！')
        }

    });

}

function hangye(obj) {
    $("#bdHangyeValue").val(obj);
    $("#listdongTai").html("");
    $("#listdongTaiPageNo").remove();
    getListdongTai();
}


//userTypelist
//BD列表
function bdlist(renderId,pageSize,bdType,bdHangye){
//分页
    var pageNoTemp = $("#listzq" + bdType + bdHangye + "PageNo").val();
    if (pageNoTemp > 0) {
        $("#listzq" + bdType + bdHangye + "PageNo").val(eval(pageNoTemp) + 1);
    } else {
        $("body").append("<input type='hidden' id='listzq" + bdType + bdHangye + "PageNo' value='1' >");
    }
    var pageNo = $("#listzq" + bdType + bdHangye + "PageNo").val();
    //参数
    var token = localStorage.getItem("token");
    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "bdType":bdType,
        "bdHangye":bdHangye,
        "pageSize":pageSize,
        "pageNo":pageNo,
        "token":token
    }

    instanceLogin({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/userTypelist',
        data: datauser,
        cancelToken: sourceLogin.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){

            if(rs.data.code == '0'){

                if(rs.data.result != null && rs.data.result != ''){
                    var listzqStr = '';
                    var zhutia = '';
                    var zhutib = '';
                    $.each(rs.data.result,function(i,item){

                        listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                        listzqStr += '<div class="weui-news-inner">';
                        listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';

                        listzqStr += '</div>';
                        listzqStr += '<div class="weui-news-inners">';
                        listzqStr += '<div class="weui-news-text">';
                        listzqStr += '<div class="weui-news-title">';
                        listzqStr += '' + setNULL(item.nickname) + '';
                        listzqStr += ' <p class="weui-news-p onerow">';
                        listzqStr += '' + setNULL(item.userInfo) + '';
                        listzqStr += '</p>';
                        listzqStr += '</div>';

                        listzqStr += '</div>';
                        listzqStr += '<div class="weui-news-info">';
                        listzqStr += '<div class="weui-news-infoitem">';
                        listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                        listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                        listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                        listzqStr += '</div>';
                        listzqStr += '</span>';
                        listzqStr += '</div>';
                        listzqStr += '<div class="weui-news-infoitem">';
                        listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                        listzqStr += '</div>';
                        listzqStr += '</div>';
                        listzqStr += '</div>';
                        listzqStr += '</div>';
                        listzqStr += '</li>';
                        zhutia = item.bdType;
                        zhutib = item.bdHangye;
                    });

                    $("#"+renderId+"").append(listzqStr);
                    if(listzqStr != null && listzqStr != ''){
                        $("#dis" + renderId + "").show();
                    }
                    if(zhutia != null && zhutia != ''){
                        $("#zhutiname").html(zhutia);
                    }
                    else if(zhutib != null && zhutib != ''){
                        $("#zhutiname").html(zhutib);
                    }
                }else{
                    $(".weui-toast--text").hide();$.toast("没有更多了", "text");
                }

            }else{
                $.toast(rs.data.msg, "text");
            }

        }else{
            console.log('请求异常！')
        }

    });

}


//获取问答类型信息
function getQuestionTypeInfo(){

    //参数
    var token = localStorage.getItem("token");
    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instanceLogin({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/getWdType',
        data: datauser,
        cancelToken: sourceLogin.token
    }) .then(function(rs){
        //数据在rs.data中  状态rs.status=200
        if(rs.status=200){

            if(rs.data.code == '0'){



                var jsonstr = '';
                $.each(rs.data.result.listDictBdType,function(i,item){
                    jsonstr += '<option value="'+item.value+'">'+item.label+'</option>';
                });
                jsonstr += '';
                localStorage.setItem("topicjson",jsonstr);

                var jsonstr2 = '';
                $.each(rs.data.hongbaomoney,function(i,item){
                    jsonstr2 += '<option value="'+item.value+'">'+item.label+'</option>';
                });
                jsonstr2 += '';
                localStorage.setItem("hongbaomoney",jsonstr2);

                var jsonstr3 = '';
                $.each(rs.data.hongbaonum,function(i,item){
                    jsonstr3 += '<option value="'+item.value+'">'+item.label+'</option>';
                });
                jsonstr3 += '';
                localStorage.setItem("hongbaonum",jsonstr3);
                //console.log(jsonstr2);
                //console.log(jsonstr3);
                //$("#questionTopic").html(jsonstr);

            }else{
                $.toast(rs.data.msg, "text");
            }

        }else{
            console.log('请求异常！')
        }

    });

}



//获取动态类型信息
function getDongtaiTopicTypeInfo(){
    $("#listdongTaishipin").html("");

    localStorage.setItem("tuijian","0");
    //参数
    var token = localStorage.getItem("token");
    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instanceLogin({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/getDongtaiTopic',
        data: datauser,
        cancelToken: sourceLogin.token
    }) .then(function(rs){
        //数据在rs.data中  状态rs.status=200
        if(rs.status=200){

            if(rs.data.code == '0'){



                var jsonstr = '';

                var str1 = "";
                str1 += '<div  class="weui-grids"  >';

                $.each(rs.data.result.listDictBdType,function(i,item){
                    jsonstr += '<option value="'+item.value+'">'+item.label+'</option>';


                    str1 += '<a onclick=toDongtaiTopic("' + item.value + '","'+item.label+'") class="grid" style="width: 50% !important;padding: 5px 3px !important;">';

                    str1 += '<div class="weui-flex productshadow" style="background-color: white;margin-bottom: -12px;">';
                    str1 += ' <div class="weui-flex__item ">';
                    str1 += '<div class="weui-news-p onerow center2 ">';
                    str1 += '<div>';
                    if(getFirstImageDetailContent(item.logo).search('.json') != -1){
                        str1 += '<lottie-player src="'+checkPath(getFirstImageDetailContent(item.logo),'1')+'"  background="transparent"  speed="1"  class="yingyong"  loop autoplay ></lottie-player>';
                    }else{

                        str1 += '<img class="product" style="border-radius: 5px;"  src="'+ checkPath(getFirstImageDetailContent(item.logo),'1')+'">';
                        str1 += '<span class="weui-mark-lb" style="bottom:10px;position: sticky;font-size: 20px;background-color: rgba(0, 0, 0, 0);margin-left: 10px;">'+item.label+'</span>';


                    }
                    str1 += '</div>';
                    str1 += '</div>';


                    str1 += '</div>';
                    str1 += '</div>';


                    str1 += '</a>';




                });
                str1 += '</div>';

                //$("#fenlei").html(str1);


                var str5 = '';
                str5 += '<div id="tagnavmenu" class="weui-navigator weui-navigator-wrapper top0" style="background-color: white;top：0px;">';
                str5 += '<ul class="weui-navigator-list">';
                str5 += '<li ><a class="a-swing" href="javascript:pageNoShipin();getListdongTaiTu(\'\',\'1\',\'3\');" style="padding: 0 10px;">推荐</a></li>';
                $.each(rs.data.result.listDictBdType,function(i,item){

                    str5 += '<li ><a href="javascript:pageNoShipin();getListdongTaiTu(\''+item.value+'\',\'1\',\'3\');" style="padding: 0 10px;">'+item.label+'</a></li>';

                });
                str5 += '</ul>';
                str5 += '</div>';
                if($("#tagnavmenu").size() > 0 ){

                }else{
                    $("#selectbyhangyemenu").append(str5);
                }

                TagNav('#tagnavmenu',{
                    type: 'scrollToNext',
                    curClassName: 'weui-state-active',
                    index:0
                });





                jsonstr += '';
                localStorage.setItem("dongtaitopicjson",jsonstr);

                var jsonstr2 = '';
                $.each(rs.data.fabujinbi,function(i,item){
                    jsonstr2 += '<option value="'+item.value+'">'+item.label+'</option>';
                });
                jsonstr2 += '';
                localStorage.setItem("fabujinbi",jsonstr2);

                //console.log(jsonstr2);
                //console.log(jsonstr3);
                //$("#questionTopic").html(jsonstr);

            }else{
                $.toast(rs.data.msg, "text");
            }

        }else{
            console.log('请求异常！')
        }

    });

}

function pageNoShipin() {
    $("#listdongTaiShipinPageNo").val("0");
    $("#listdongTaishipin").html("");

}



//获取问答类型信息
function getQuestionTypeInfo2(obj){

    //参数
    var token = localStorage.getItem("token");
    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instanceLogin({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/getWdType',
        data: datauser,
        cancelToken: sourceLogin.token
    }) .then(function(rs){
        //数据在rs.data中  状态rs.status=200
        if(rs.status=200){

            if(rs.data.code == '0'){



                var jsonstr = '';
                $.each(rs.data.result.listDictBdType,function(i,item){
                    if(obj == item.value){
                        jsonstr += '<option value="'+item.value+'" selected>'+item.label+'</option>';
                    }else{
                        jsonstr += '<option value="'+item.value+'">'+item.label+'</option>';
                    }

                });
                jsonstr += '';

                $("#courseTopic").html(jsonstr);


            }else{
                $.toast(rs.data.msg, "text");
            }

        }else{
            console.log('请求异常！')
        }

    });

}


//二维码失效反馈
function qrfankui(){
    $.confirm("您确定要提交反馈吗?", "确认提交?", function() {

        //参数
        var token = localStorage.getItem("token");
        //传输数据
        var datauser = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
            "orderName":$("#orderTitle").val()+'-产品编号：'+$("#kaNo").val(),
            "token":token
        }

        instanceLogin({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sys/user/qrfankui',
            data: datauser,
            cancelToken: sourceLogin.token
        }) .then(function(rs){
            //数据在rs.data中  状态rs.status=200
            if(rs.status=200){

                if(rs.data.code == '0'){

                    $.toast("提交成功，感谢您的反馈！", "text");

                }else{
                    $.toast(rs.data.msg, "text");
                }

            }else{
                console.log('请求异常！')
            }

        });


    }, function() {
        //取消操作
    });
}



//userTypelist
function userwendalist(renderId,pageSize,bdType,bdHangye){
//分页
    var pageNoTemp = $("#listzq" + bdType + bdHangye + "PageNo").val();
    if (pageNoTemp > 0) {
        $("#listzq" + bdType + bdHangye + "PageNo").val(eval(pageNoTemp) + 1);
    } else {
        $("body").append("<input type='hidden' id='listzq" + bdType + bdHangye + "PageNo' value='1' >");
    }
    var pageNo = $("#listzq" + bdType + bdHangye + "PageNo").val();
    //参数
    var token = localStorage.getItem("token");
    //传输数据
    var datauser = {
        "pageSize":pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo,
        "token":token
    }

    instanceLogin({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/userWendalist',
        data: datauser,
        cancelToken: sourceLogin.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){

            if(rs.data.code == '0'){

                if(rs.data.result != null && rs.data.result != ''){
                    var listzqStr = '';

                    $.each(rs.data.result,function(i,item){

                        listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                        listzqStr += '<div class="weui-news-inner">';
                        listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';

                        listzqStr += '</div>';
                        listzqStr += '<div class="weui-news-inners">';
                        listzqStr += '<div class="weui-news-text">';
                        listzqStr += '<div class="weui-news-title">';
                        listzqStr += '' + setNULL(item.nickname) + '';
                        listzqStr += ' <p class="weui-news-p onerow">';
                        listzqStr += '' + setNULL(item.userInfo) + '';
                        listzqStr += '</p>';
                        listzqStr += '</div>';

                        listzqStr += '</div>';
                        listzqStr += '<div class="weui-news-info">';
                        listzqStr += '<div class="weui-news-infoitem">';
                        listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                        listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                        listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                        listzqStr += '</div>';
                        listzqStr += '</span>';
                        listzqStr += '</div>';
                        listzqStr += '<div class="weui-news-infoitem">';
                        listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                        listzqStr += '</div>';
                        listzqStr += '</div>';
                        listzqStr += '</div>';
                        listzqStr += '</div>';
                        listzqStr += '</li>';

                    });

                    $("#"+renderId+"").append(listzqStr);
                    if(listzqStr != null && listzqStr != ''){
                        $("#dis" + renderId + "").show();
                    }

                }else{

                    if(pageNo != '1'){
                        $(".weui-toast--text").hide();$.toast("没有更多了", "text");
                    }
                }

            }else{
                $.toast(rs.data.msg, "text");
            }

        }else{
            console.log('请求异常！')
        }

    });

}



function ssasIn() {

    if(true){
        //if(localStorage.getItem("saas") == null || localStorage.getItem("saas") == '' ||  localStorage.getItem("saasid") != GetUrlString('s') ){

        //传输数据
        var datauser2 = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId()
        }

        instanceLogin({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sys/user/userdetailsaas',
            data: datauser2,
            cancelToken: sourceLogin.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){

                detailuserRenderSaas(rs.data);
            }else{
                console.log('请求异常！')
            }

        });


    }else{
        $("title").text(setNULL( localStorage.getItem("saas")));
    }
}
//详情渲染
function detailuserRenderSaas(data){
    if(data.code == '0'){
        if(data.result.website != null  && data.result.website != ''){
            if(curWwwPath.search("index") != -1){
                $("title").text(setNULL(data.result.website));
            }
            localStorage.setItem('saas',setNULL(data.result.website));
            localStorage.setItem('smsSign',setNULL(data.result.smssign));
            localStorage.setItem('saasid',setNULL(data.result.id));
            localStorage.setItem('appid',setNULL(data.result.wxappid));
            localStorage.setItem('vipfabu',setNULL(data.result.vipfabu));

           /* private String website;
            private String weblogo;
            private String smssign;
            private String sharetext;
            private String qrgzh;
            private String qrkf;
            private String appdownload;

            private String shareindex;
            private String sharemember;
            private String shareshoping;
            private String sharekno;
            private String shareapp;
            private String sharetuiguang;
            private String sharevideo;
            private String sharedongtai;
            private String shareactivity;

            private String tuiguangtips;
            private String shoppingtips;

            private String wxappid;



            private Double zuozhe;
            private Double vipfanyong;
            private Double freefanyong;
            private Double erjifanxian;
            private Double sanjifanxian;


            private String isqrpay;
            private String qrpaywx;
            private String qrpayali;
            private String ispasswordlogin;
            private String ismyindex;
            private String isadvxunhuan;
            private String videotimeslimit;
            private String isdistips;
            private String isdismenu;
            private String isdiscard;
            private String isonevip;



            private String isdownapp;
            private String ismustlogin;
            private String istext;
            private String isshipin;
            private String istupian;
            private String ishongbao;
            private String isyuyin;
            private String iswenjian;
            private String isweixinshouquan;
            private String ismustweixin;
            private String isdisrukoutuandui;
            private String isdispaymima;
            private String isdisdisanfangpay;
            private String isdisshare;
            private String isdisthreepay;
            private String isdisinmima;


            //duanxinbiaoshi
            //duanxinmiyao
            //duanxincodemoban
           // duanxinyouxiaoqi
            //threepayhost
            //threepaytoken
            //threepaysecret
            iswxpay
            isalipay
            isyue
            tuanduitips
            yaoqingtips
            tuiguangordertips
            chochengtips



            kefuzhaoshang
            suofenday
            threequnliao


            isdiszhuce
            islingyuan
            tixianstart
            tixianend
            tixianshouxufei
            tixianshouxufeibili

            qiyerenzhengprice
            wendarenzhengprice
            davrenzhengprice
            nianfeizuozhefencheng
            dashangzuozhefencheng



            #tuanduix
            #tuanduiy
            #butiex
            #butiey
            #huiyuanx
            #huiyuany
            #cishux
            #cishuy
            #mansongx
            #mansongy
            */
            localStorage.setItem('tuanduix',setNULL(data.result.tuanduix));
            localStorage.setItem('tuanduiy',setNULL(data.result.tuanduiy));
            localStorage.setItem('butiex',setNULL(data.result.butiex));
            localStorage.setItem('butiey',setNULL(data.result.butiey));


            localStorage.setItem('huiyuanx',setNULL(data.result.huiyuanx));
            localStorage.setItem('huiyuany',setNULL(data.result.huiyuany));
            localStorage.setItem('cishux',setNULL(data.result.cishux));
            localStorage.setItem('cishuy',setNULL(data.result.cishuy));
            localStorage.setItem('mansongx',setNULL(data.result.mansongx));
            localStorage.setItem('mansongy',setNULL(data.result.mansongy));


            localStorage.setItem('qiyerenzhengprice',setNULL(data.result.qiyerenzhengprice));
            localStorage.setItem('wendarenzhengprice',setNULL(data.result.wendarenzhengprice));
            localStorage.setItem('davrenzhengprice',setNULL(data.result.davrenzhengprice));
            localStorage.setItem('nianfeizuozhefencheng',setNULL(data.result.nianfeizuozhefencheng));
            localStorage.setItem('dashangzuozhefencheng',setNULL(data.result.dashangzuozhefencheng));

            localStorage.setItem('isdiszhuce',setNULL(data.result.isdiszhuce));
            localStorage.setItem('islingyuan',setNULL(data.result.islingyuan));
            localStorage.setItem('tixianstart',setNULL(data.result.tixianstart));
            localStorage.setItem('tixianend',setNULL(data.result.tixianend));
            localStorage.setItem('tixianshouxufei',setNULL(data.result.tixianshouxufei));
            localStorage.setItem('tixianshouxufeibili',setNULL(data.result.tixianshouxufeibili));
            localStorage.setItem('shoudongtixianmin',setNULL(data.result.shoudongtixianmin));

            localStorage.setItem('kefuzhaoshang',setNULL(data.result.kefuzhaoshang));
            localStorage.setItem('suofenday',setNULL(data.result.suofenday));
            localStorage.setItem('threequnliao',setNULL(data.result.threequnliao));

            localStorage.setItem('iswxpay',setNULL(data.result.iswxpay));
            localStorage.setItem('isalipay',setNULL(data.result.isalipay));
            localStorage.setItem('isyue',setNULL(data.result.isyue));
            localStorage.setItem('tuanduitips',setNULL(data.result.tuanduitips));
            localStorage.setItem('yaoqingtips',setNULL(data.result.yaoqingtips));
            localStorage.setItem('tuiguangordertips',setNULL(data.result.tuiguangordertips));
            localStorage.setItem('chochengtips',setNULL(data.result.chochengtips));

            localStorage.setItem('isdownapp',setNULL(data.result.isdownapp));
            localStorage.setItem('ismustlogin',setNULL(data.result.ismustlogin));
            localStorage.setItem('istext',setNULL(data.result.istext));
            localStorage.setItem('isshipin',setNULL(data.result.isshipin));
            localStorage.setItem('istupian',setNULL(data.result.istupian));
            localStorage.setItem('ishongbao',setNULL(data.result.ishongbao));
            localStorage.setItem('isyuyin',setNULL(data.result.isyuyin));
            localStorage.setItem('iswenjian',setNULL(data.result.iswenjian));
            localStorage.setItem('isweixinshouquan',setNULL(data.result.isweixinshouquan));
            localStorage.setItem('ismustweixin',setNULL(data.result.ismustweixin));
            localStorage.setItem('isdisrukoutuandui',setNULL(data.result.isdisrukoutuandui));
            localStorage.setItem('isdispaymima',setNULL(data.result.isdispaymima));
            localStorage.setItem('isdisdisanfangpay',setNULL(data.result.isdisdisanfangpay));
            localStorage.setItem('isdisshare',setNULL(data.result.isdisshare));
            localStorage.setItem('isdisthreepay',setNULL(data.result.isdisthreepay));
            localStorage.setItem('isdisinmima',setNULL(data.result.isdisinmima));
            localStorage.setItem('isdisvideozhuti',setNULL(data.result.isdisvideozhuti));
            localStorage.setItem('zhuti',setNULL(data.result.zhuti));

            localStorage.setItem('isqrpay',setNULL(data.result.isqrpay));
            localStorage.setItem('qrpaywx',setNULL(data.result.qrpaywx));
            localStorage.setItem('qrpayali',setNULL(data.result.qrpayali));
            localStorage.setItem('ispasswordlogin',setNULL(data.result.ispasswordlogin));
            localStorage.setItem('ismyindex',setNULL(data.result.ismyindex));
            localStorage.setItem('isadvxunhuan',setNULL(data.result.isadvxunhuan));
            localStorage.setItem('videotimeslimit',setNULL(data.result.videotimeslimit));
            localStorage.setItem('isdistips',setNULL(data.result.isdistips));
            localStorage.setItem('isdismenu',setNULL(data.result.isdismenu));
            localStorage.setItem('isdiscard',setNULL(data.result.isdiscard));
            localStorage.setItem('isonevip',setNULL(data.result.isonevip));
            localStorage.setItem('videolimit',setNULL(data.result.videolimit));


            localStorage.setItem('tuiguangtips',setNULL(data.result.tuiguangtips));
            localStorage.setItem('shoppingtips',setNULL(data.result.shoppingtips));
            localStorage.setItem('zuozhe',setNULL(data.result.zuozhe));
            localStorage.setItem('vipfanyong',setNULL(data.result.vipfanyong));
            localStorage.setItem('freefanyong',setNULL(data.result.freefanyong));
            localStorage.setItem('erjifanxian',setNULL(data.result.erjifanxian));
            localStorage.setItem('sanjifanxian',setNULL(data.result.sanjifanxian));




            localStorage.setItem('sharetext',setNULL(data.result.sharetext));
            localStorage.setItem('qrgzh',setNULL(data.result.qrgzh));
            localStorage.setItem('qrkf',setNULL(data.result.qrkf));
            localStorage.setItem('appdownload',setNULL(data.result.appdownload));


            localStorage.setItem('shareindex',setNULL(data.result.shareindex));
            localStorage.setItem('sharemember',setNULL(data.result.sharemember));
            localStorage.setItem('shareshoping',setNULL(data.result.shareshoping));
            localStorage.setItem('sharekno',setNULL(data.result.sharekno));

            localStorage.setItem('shareapp',setNULL(data.result.shareapp));
            localStorage.setItem('sharetuiguang',setNULL(data.result.sharetuiguang));
            localStorage.setItem('sharevideo',setNULL(data.result.sharevideo));
            localStorage.setItem('sharedongtai',setNULL(data.result.sharedongtai));
            localStorage.setItem('shareactivity',setNULL(data.result.shareactivity));

            if(localStorage.getItem('zhuti') == '1'){
                $('head').append('<link href="../../css/agent/zhuti-red.css" rel="stylesheet" type="text/css" />');
            }else if(localStorage.getItem('zhuti') == '2'){
                $('head').append('<link href="../../css/agent/zhuti-meired.css" rel="stylesheet" type="text/css" />');

            }else if(localStorage.getItem('zhuti') == '3'){
                $('head').append('<link href="../../css/agent/zhuti-zi.css" rel="stylesheet" type="text/css" />');

            }else if(localStorage.getItem('zhuti') == '4'){
                $('head').append('<link href="../../css/agent/zhuti-shenlan.css" rel="stylesheet" type="text/css" />');

            }else if(localStorage.getItem('zhuti') == '5'){
                $('head').append('<link href="../../css/agent/zhuti-qianlan.css" rel="stylesheet" type="text/css" />');

            }else if(localStorage.getItem('zhuti') == '6'){
                $('head').append('<link href="../../css/agent/zhuti-lanlv.css" rel="stylesheet" type="text/css" />');

            }else if(localStorage.getItem('zhuti') == '7'){
                $('head').append('<link href="../../css/agent/zhuti-lv.css" rel="stylesheet" type="text/css" />');

            }else if(localStorage.getItem('zhuti') == '8'){
                $('head').append('<link href="../../css/agent/zhuti-huang.css" rel="stylesheet" type="text/css" />');

            }else if(localStorage.getItem('zhuti') == '9'){
                $('head').append('<link href="../../css/agent/zhuti-cheng.css" rel="stylesheet" type="text/css" />');

            }else if(localStorage.getItem('zhuti') == '10'){
                $('head').append('<link href="../../css/agent/zhuti-zong.css" rel="stylesheet" type="text/css" />');

            }


        }

    }
}

ssasIn();

function viptips() {
    //$("body").hide();
    if(getSaasId() == '201908070117'){
        if(localStorage.getItem("vip") == 'no' ){
            $("#detailcourse").hide();
            $.toast('抱歉，您暂无查看权限！', "text");
            $.confirm("成为VIP后可以查看！", "成为VIP", function () {
                toHuiYuanDetail(getSaasId(),'1');
            }, function () {
                //取消操作
                toindex();
            });


        }else if(localStorage.getItem("token") == null || localStorage.getItem("token") == ''){
            if(curWwwPath.search("article") != -1){
                $.toast('对不起，请先登录！', "text");
                $("#detailcourse").hide();
                isLogin('','');
            }
        }
    }
}

function totop() {
    document.body.scrollTop = 0;
    $("html,body").animate({
        scrollTop: 0,
        screenLeft: 0,
    }, 400);
};

$("html,body").animate({
    scrollTop: 0,
    screenLeft: 0,
}, 400);

//请求模块
function getTab() {
    localStorage.setItem("lunbonum",null);
    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId()
    }
    instanceLogin({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: 'mokuai/moKuai/list',
        data: datauser,
        cancelToken: sourceLogin.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //渲染Tab和默认加载Tab(可以不控制)
                localStorage.setItem("tabarray",JSON.stringify(rs.data.result));
                localStorage.setItem("mytab", 'm1');
                let html = '';
                $.each(rs.data.result,function(i,item) {

                    if (localStorage.getItem("mytab") == null || localStorage.getItem("mytab") == '') {
                        html += `
                    <span id="${item.mokuai}t" onclick="tabqiehuan('${item.mokuai}')"  class="weui-tabbar__item">
                       <a href="javascript:window.scrollTo(0,0)"  >
                          <span id="${item.mokuai}s"><svg  id="svg${item.mokuai}"  class="icontubiao" aria-hidden="true"><use  xlink:href="${item.tubiaoa}"></use></svg></span>
                     
                       <p  class="f-black f12 top5 bottom10" id="${item.mokuai}e" >${item.title}</p></a>    
                    </span>           
                  `
                        localStorage.setItem("mytab", item.mokuai);
                        //localStorage.setItem("m1tubiaob",item.tubiaob);
                        //$("#"+item.mokuai+"").show();
                    } else {
                        if (localStorage.getItem("mytab") == item.mokuai) {

                            html += `
                    <span  id="${item.mokuai}t"  onclick="tabqiehuan('${item.mokuai}')"  class="weui-tabbar__item">
                       <a href="javascript:window.scrollTo(0,0)" >
                        <span  id="${item.mokuai}s"><svg id="svg${item.mokuai}" class="icontubiao" aria-hidden="true"><use  xlink:href="${item.tubiaoa}"></use></svg></span>
                    
                       <p  class="f-black f12 top5 bottom10" id="${item.mokuai}e" >${item.title}</p>     </a>    
                    </span>         
                  `
                            //$("#"+item.mokuai+"").show();
                        } else {
                            html += `
                    <span  id="${item.mokuai}t"  onclick="tabqiehuan('${item.mokuai}')"  class="weui-tabbar__item">
                       <a href="javascript:window.scrollTo(0,0)">
                        <span  id="${item.mokuai}s" ><svg  id="svg${item.mokuai}"  class="icontubiao" aria-hidden="true"><use  xlink:href="${item.tubiaob}"></use></svg></span>
                     
                       <p  class="f-black f12 top5 bottom10" id="${item.mokuai}e"  >${item.title}</p>     </a>    
                    </span>         
                  `
                            //$("#"+item.mokuai+"").show();
                        }
                    }

                    $("#tabdibu").html(html);

                });





                    rederTab(rs.data);



            }
        }else{
            console.log('请求异常！')
        }

    });

}
//渲染模块
function rederTab(data){
    if (localStorage.getItem("token") != null && localStorage.getItem("token") != '') {
        detailuser();
        detailuserShouru();
        $("#shouruzhichu").show();
        //getzijinjiludata2("mingxi", "2", 5);//收入支出记录
        //userListNum("xiaoxinum","1");
    }
    if(localStorage.getItem("mytab") == null || localStorage.getItem("mytab") == ''){
        localStorage.setItem("mytab","m1");
    }

    let html = '';
    $.each(data.result,function(i,item){

        /*if(localStorage.getItem("mytab")  == null || localStorage.getItem("mytab")  == ''){
            html +=`
                    <span id="${item.mokuai}t" onclick="tabqiehuan('${item.mokuai}')"  class="weui-tabbar__item">
                       <a href="javascript:window.scrollTo(0,0)"  >
                          <span id="${item.mokuai}s"><svg  id="svg${item.mokuai}"  class="icontubiao" aria-hidden="true"><use  xlink:href="${item.tubiaoa}"></use></svg></span>
                     
                       <p  class="f-black f12 top5 bottom10" id="${item.mokuai}e" >${item.title}</p></a>    
                    </span>           
                  `
            localStorage.setItem("mytab",item.mokuai);
            //localStorage.setItem("m1tubiaob",item.tubiaob);
            //$("#"+item.mokuai+"").show();
        }else{
            if(localStorage.getItem("mytab") == item.mokuai){

                html +=`
                    <span  id="${item.mokuai}t"  onclick="tabqiehuan('${item.mokuai}')"  class="weui-tabbar__item">
                       <a href="javascript:window.scrollTo(0,0)" >
                        <span  id="${item.mokuai}s"><svg id="svg${item.mokuai}" class="icontubiao" aria-hidden="true"><use  xlink:href="${item.tubiaoa}"></use></svg></span>
                    
                       <p  class="f-black f12 top5 bottom10" id="${item.mokuai}e" >${item.title}</p>     </a>    
                    </span>         
                  `
                //$("#"+item.mokuai+"").show();
            }else{
                html +=`
                    <span  id="${item.mokuai}t"  onclick="tabqiehuan('${item.mokuai}')"  class="weui-tabbar__item">
                       <a href="javascript:window.scrollTo(0,0)">
                        <span  id="${item.mokuai}s" ><svg  id="svg${item.mokuai}"  class="icontubiao" aria-hidden="true"><use  xlink:href="${item.tubiaob}"></use></svg></span>
                     
                       <p  class="f-black f12 top5 bottom10" id="${item.mokuai}e"  >${item.title}</p>     </a>    
                    </span>         
                  `
                //$("#"+item.mokuai+"").show();
            }
        }

        $("#tabdibu").html(html);*/


        if(item.mokuai == 'm1'){
            localStorage.setItem("m1tubiaob",item.tubiaob);
            localStorage.setItem("m1tubiaoa",item.tubiaoa);
        }

        //加载方法
        if(item.mokuai == 'm1'){//拉新
            var str3 = '';
            $.each(item.tuBiaoList,function(j,tbitem){
                str3 += '<div class="swiper-slide">';

                if(tbitem.eventType == '2'){
                    str3 += '<a onclick="'+tbitem.linkEvent+'">';
                }else{
                    str3 += '<a href="'+tbitem.linkEvent+'">';
                }
                str3 += '<div class="weui-flex">';
                str3 += '<div class="weui-flex__item ">';

                str3 += '<div class="weui-news-p onerow center2 ">';
                str3 += '<image class="tubiao shadowonly"  src="'+checkPath(tbitem.tubiao)+'" style="height: 60px;width:60px;border-radius: 10px;"/>' ;
                str3 += '</div>';
                str3 += '<div class="weui-news-p  center2">'+tbitem.title+'</div>';

                str3 += '</div>';
                str3 += '</div>';
                str3 += ' </a>';


                str3 += '</div>';

            });

            $("#"+item.mokuai+"tb").html(str3);
            var shuzi = 4;
            if(item.tuBiaoList.length > 4){
                shuzi = 4.5;
            }else{
                shuzi = item.tuBiaoList.length;
            }
            lunbotu('2',item.mokuai+'tb',shuzi);


            /*if(localStorage.getItem("mytab") == 'm1' || localStorage.getItem("mytab") == null || localStorage.getItem("mytab") == ''){
                localStorage.setItem("loadm1","1");
                m11();
               /!* localStorage.setItem("loadm1","2");
                m12();*!/
            }else{
               localStorage.setItem("loadm1","0");
               /!* localStorage.setItem("loadm1","1");
                m11();
*!/
            }*/
            m11();

        }else if(item.mokuai == 'm2'){//星球
            //图标
            var str3 = '';
            $.each(item.tuBiaoList,function(j,tbitem){
                str3 += '<div class="swiper-slide swiper-slide2">';

                if(tbitem.eventType == '2'){
                    str3 += '<a onclick="'+tbitem.linkEvent+'">';
                }else{
                    str3 += '<a href="'+tbitem.linkEvent+'">';
                }
                str3 += '<div class="weui-flex">';
                str3 += '<div class="weui-flex__item ">';

                str3 += '<div class="weui-news-p onerow center2 ">';
                str3 += '<image class="tubiao shadowonly"  src="'+checkPath(tbitem.tubiao)+'" style="height: 40px;width:40px;border-radius: 20px;"/>' ;
                str3 += '</div>';
                str3 += '<div class="weui-news-p  center2">'+tbitem.title+'</div>';

                str3 += '</div>';
                str3 += '</div>';
                str3 += ' </a>';


                str3 += '</div>';

            });

            $("#"+item.mokuai+"tb").html(str3);
            var shuzi = 5.5;
            var obj = '2';
            if(item.tuBiaoList.length > 10){
                shuzi = 4.5;obj = '4';
            }else if(item.tuBiaoList.length <= 5){
                shuzi = item.tuBiaoList.length;
            }
            lunbotu(obj,item.mokuai+'tb',shuzi);

            /*if(localStorage.getItem("mytab") == 'm2'){

                localStorage.setItem("loadm2","1");
                m2();
            }else{
                localStorage.setItem("loadm2","0");
            }*/
            m2();
        }else if(item.mokuai == 'm3'){//会员数据
            /*if(localStorage.getItem("mytab") == 'm3'){

                localStorage.setItem("loadm3","1");
                m3();
            }else{
                localStorage.setItem("loadm3","0");
            }*/
            m3();
        }else if(item.mokuai == 'm4'){//社交电商
            //图标
            var str3 = '';
            $.each(item.tuBiaoList,function(j,tbitem){
                str3 += '<div class="swiper-slide swiper-slide2">';

                if(tbitem.eventType == '2'){
                    str3 += '<a onclick="'+tbitem.linkEvent+'">';
                }else{
                    str3 += '<a href="'+tbitem.linkEvent+'">';
                }
                str3 += '<div class="weui-flex">';
                str3 += '<div class="weui-flex__item ">';

                str3 += '<div class="weui-news-p onerow center2 ">';
                str3 += '<image class="tubiao shadowonly"  src="'+checkPath(tbitem.tubiao)+'" style="height: 40px;width:40px;border-radius: 20px;"/>' ;
                str3 += '</div>';
                str3 += '<div class="weui-news-p  center2">'+tbitem.title+'</div>';

                str3 += '</div>';
                str3 += '</div>';
                str3 += ' </a>';


                str3 += '</div>';

            });

            $("#"+item.mokuai+"tb").html(str3);
            var shuzi = 5.5;
            var obj = '2';
            if(item.tuBiaoList.length > 10){
                shuzi = 4.5;obj = '4';
            }else if(item.tuBiaoList.length <= 5){
                shuzi = item.tuBiaoList.length;
            }
            lunbotu(obj,item.mokuai+'tb',shuzi);

            /*if(localStorage.getItem("mytab") == 'm4'|| 1==1){

                localStorage.setItem("loadm4","1");
                m4();
            }else{
                localStorage.setItem("loadm4","0");
            }*/
            m4();

        }else if(item.mokuai == 'm5'){//会员资料
            /*if(localStorage.getItem("mytab") == 'm5'){

                localStorage.setItem("loadm5","1");
                m5();
            }else{
                localStorage.setItem("loadm5","0");
            }*/
            m5();
        }else{

        }/*else if(item.mokuai == 'm6'){
            m6();
        }else if(item.mokuai == 'm7'){
            m7();
        }else if(item.mokuai == 'm8'){
            m8();
        }else if(item.mokuai == 'm9'){
            m9();
        }else if(item.mokuai == 'm10'){
            m10();
        }else if(item.mokuai == 'm11'){
            m11();
        }else if(item.mokuai == 'm12'){
            m12();
        }else if(item.mokuai == 'm13'){
            m13();
        }else if(item.mokuai == 'm14'){
            m14();
        }else if(item.mokuai == 'm15'){
            m15();
        }else if(item.mokuai == 'm16'){
            m16();
        }else if(item.mokuai == 'm17'){
            m17();
        }else if(item.mokuai == 'm18'){
            m18();
        }else if(item.mokuai == 'm19'){
            m19();
        }*/

    });



    /*totop();*/
    /*$("#gaodu").remove();*/


    /*$(".mytab").each(function(i){
        if(localStorage.getItem("mytab") == null || localStorage.getItem("mytab") == ''){
            $(this).css("display","");
            localStorage.setItem("mytab",$(this).attr("id"));
        }else{
            if(localStorage.getItem("mytab") == $(this).attr("id")){
                $(this).css("display","");
            }else{
                $(this).css("display","none");
            }
        }
    });*/

}
//模块配置
if($("#rederTab").size() > 0){
    getTab();
}

//tab切换
function tabqiehuan(obj) {
    if(obj == 'm1'){

    }else{
        setIndex();
    }

    var data = JSON.parse(localStorage.getItem("tabarray"));
    $.each(data,function(i,item){


        if(item.mokuai == obj ){
            $("#"+item.mokuai+"s").html('<svg class="icontubiao"  id="svg'+item.mokuai+'"  aria-hidden="true"><use  xlink:href="'+item.tubiaoa+'"></use></svg>')

        }else{
            $("#"+item.mokuai+"s").html('<svg class="icontubiao"  id="svg'+item.mokuai+'"  aria-hidden="true"><use  xlink:href="'+item.tubiaob+'"></use></svg>')

        }



        //$("#"+item.mokuai+"s").show();
       /* $("#swiper-container"+renderType+"").show();
        $("#swiper-pagination"+renderType+"").show();*/




    });
    if(obj == 'm3' || obj == 'm5' || obj == 'm2'){
        isLogin('','');
    }
   /* let html = '';*/
   /* setTimeout(function() {

    },10000);*/


   /* if(obj == 'm1' && localStorage.getItem("loadm1") == '0'){

        localStorage.setItem("loadm1","1");
        m11();
    }

    if(obj == 'm1' && localStorage.getItem("loadm1") == '1'){

        localStorage.setItem("loadm1","2");
        m12();
    }

    if(obj == 'm1' && localStorage.getItem("loadm1") == '2'){

        localStorage.setItem("loadm1","3");
        m13();
    }

    if(obj == 'm2' && localStorage.getItem("loadm2") == '0'){


        localStorage.setItem("loadm2","1");
        m2();
    }else if(obj == 'm3' && localStorage.getItem("loadm3") == '0'){


        localStorage.setItem("loadm3","1");
        m3();
    }else if(obj == 'm4' && localStorage.getItem("loadm4") == '0'){


        localStorage.setItem("loadm4","1");
        m4();
    }else if(obj == 'm5' && localStorage.getItem("loadm5") == '0'){


        localStorage.setItem("loadm5","1");
        m5();
    }
*/

    $(".mytab").each(function(i){

        if(obj == $(this).attr("id")){
            $(this).css("display","inline");
            localStorage.setItem("mytab",obj);

        }else{
            $(this).css("display","none");
        }
    });


    /*totop();
    $("#topa").click();
    $("#top2").click();*/


    //$("#tabdibu").html(html);

}

function m11(){//拉新

    if(GetUrlString('s') == '0'  || GetUrlString('s') == '' || GetUrlString('s') == null){
        getQuestionTypeInfo();
        lunboadv("lunbo2",'2',"1","1");//推广拉新轮播图
        listmediaxiaoxi("lunboxiaoxi","3",3,"3","3"); //首页轮播消息
        huiyaun("huiyuan1",'huiyuan1',"2","3.5");//推广拉新会员信息
        laxinlist("laxintop",'laxintop',"2","4.5","/zq/xinyongka/xinYongKa/laxintoplist",30);//榜单
        laxinlist("huanxinqu1",'huanxinqu1',"2","4.5","/zq/xinyongka/xinYongKa/laxinhxlist",30);//换新区
        isLogin('','');
    }


   /* laxinlist2("0fengxian1",'0fengxian1',"2","4.5","/zq/xinyongka/xinYongKa/laxinfengxianlist",30,"");//0风险-可扶贫
    laxinlist2("chunzhuce1",'chunzhuce1',"2","4.5","/zq/xinyongka/xinYongKa/laxinlist",30,"1");//纯注册
    laxinlist2("shimingrenzheng1",'shimingrenzheng1',"2","4.5","/zq/xinyongka/xinYongKa/laxinlist",30,"2");//实名认证

    laxinlist2("yinhangka1",'yinhangka1',"2","4.5","/zq/xinyongka/xinYongKa/laxinlist",30,"3");//绑卡
    laxinlist2("jiakefu1",'jiakefu1',"2","4.5","/zq/xinyongka/xinYongKa/laxinlist",30,"4");//加客服
    fuzhu("wxfuzhuzhuce1",'wxfuzhuzhuce1',"2","2.5","8");//微信辅助

    laxinlist3("xinyongka1",'xinyongka1',"2","4.5","/zq/xinyongka/xinYongKa/laxinlist",30,"2");//信用卡
    laxinlist3("daikuan1",'daikuan1',"2","4.5","/zq/xinyongka/xinYongKa/laxinlist",30,"3");//贷款
    /!*!//免费保险*!/
    laxinlist5("xilietuijian",'xilietuijian',"2","4.5","/zq/xinyongka/xinYongKa/topic",9);//九大系列

    laxinlist4("tuijian",'2',"2","4.5","/zq/xinyongka/xinYongKa/laxinlist",20);//为您推荐*/

}
function m12(){//拉新
/*
    isLogin('','');
    getQuestionTypeInfo();
    lunboadv("lunbo2",'2',"1","1");//推广拉新轮播图
    listmediaxiaoxi("lunboxiaoxi","3",3,"3","3"); //首页轮播消息
    huiyaun("huiyuan1",'huiyuan1',"2","3.5");//推广拉新会员信息
    laxinlist("laxintop",'laxintop',"2","4.5","/zq/xinyongka/xinYongKa/laxintoplist",30);//榜单
    laxinlist("huanxinqu1",'huanxinqu1',"2","4.5","/zq/xinyongka/xinYongKa/laxinhxlist",30);//换新区
    laxinlist6("changjing",'changjing',"2","4.5","/zq/xinyongka/xinYongKa/kazuzhi",9);//九大场景*/
    if(GetUrlString('s') == '0' || GetUrlString('s') == '' || GetUrlString('s') == null){
        laxinlist2("0fengxian1",'0fengxian1',"2","4.5","/zq/xinyongka/xinYongKa/laxinfengxianlist",30,"");//0风险-可扶贫
        laxinlist2("chunzhuce1",'chunzhuce1',"2","4.5","/zq/xinyongka/xinYongKa/laxinlist",30,"1");//纯注册
        laxinlist2("shimingrenzheng1",'shimingrenzheng1',"2","4.5","/zq/xinyongka/xinYongKa/laxinlist",30,"2");//实名认证
        laxinlist6("changjing",'changjing',"2","4.5","/zq/xinyongka/xinYongKa/kazuzhi",9);//九大场景
        laxinlist4("tuijian",'2',"2","4.5","/zq/xinyongka/xinYongKa/laxinlist",20);//为您推荐
    }


    /*
        laxinlist3("xinyongka1",'xinyongka1',"2","4.5","/zq/xinyongka/xinYongKa/laxinlist",30,"2");//信用卡
        laxinlist3("daikuan1",'daikuan1',"2","4.5","/zq/xinyongka/xinYongKa/laxinlist",30,"3");//贷款
        /!*!//免费保险*!/
        laxinlist5("xilietuijian",'xilietuijian',"2","4.5","/zq/xinyongka/xinYongKa/topic",9);//九大系列

        laxinlist4("tuijian",'2',"2","4.5","/zq/xinyongka/xinYongKa/laxinlist",20);//为您推荐*/

}
function m13(){//拉新
    if(GetUrlString('s') == '0'  || GetUrlString('s') == '' || GetUrlString('s') == null) {
        /*
            isLogin('','');
            getQuestionTypeInfo();
            lunboadv("lunbo2",'2',"1","1");//推广拉新轮播图
            listmediaxiaoxi("lunboxiaoxi","3",3,"3","3"); //首页轮播消息
            huiyaun("huiyuan1",'huiyuan1',"2","3.5");//推广拉新会员信息
            laxinlist("laxintop",'laxintop',"2","4.5","/zq/xinyongka/xinYongKa/laxintoplist",30);//榜单
            laxinlist("huanxinqu1",'huanxinqu1',"2","4.5","/zq/xinyongka/xinYongKa/laxinhxlist",30);//换新区
            laxinlist6("changjing",'changjing',"2","4.5","/zq/xinyongka/xinYongKa/kazuzhi",9);//九大场景

            laxinlist2("0fengxian1",'0fengxian1',"2","4.5","/zq/xinyongka/xinYongKa/laxinfengxianlist",30,"");//0风险-可扶贫
            laxinlist2("chunzhuce1",'chunzhuce1',"2","4.5","/zq/xinyongka/xinYongKa/laxinlist",30,"1");//纯注册
            laxinlist2("shimingrenzheng1",'shimingrenzheng1',"2","4.5","/zq/xinyongka/xinYongKa/laxinlist",30,"2");//实名认证

            laxinlist2("yinhangka1",'yinhangka1',"2","4.5","/zq/xinyongka/xinYongKa/laxinlist",30,"3");//绑卡
            laxinlist2("jiakefu1",'jiakefu1',"2","4.5","/zq/xinyongka/xinYongKa/laxinlist",30,"4");//加客服
            fuzhu("wxfuzhuzhuce1",'wxfuzhuzhuce1',"2","2.5","8");//微信辅助*/
        laxinlist2("yinhangka1", 'yinhangka1', "2", "4.5", "/zq/xinyongka/xinYongKa/laxinlist", 30, "3");//绑卡
        laxinlist2("jiakefu1", 'jiakefu1', "2", "4.5", "/zq/xinyongka/xinYongKa/laxinlist", 30, "4");//加客服
        //fuzhu("wxfuzhuzhuce1",'wxfuzhuzhuce1',"2","2.5","8");//微信辅助

        laxinlist3("xinyongka1", 'xinyongka1', "2", "4.5", "/zq/xinyongka/xinYongKa/laxinlist", 30, "2");//信用卡
        laxinlist3("daikuan1", 'daikuan1', "2", "4.5", "/zq/xinyongka/xinYongKa/laxinlist", 30, "3");//贷款
        /*//免费保险*/
        laxinlist5("xilietuijian", 'xilietuijian', "2", "4.5", "/zq/xinyongka/xinYongKa/topic", 9);//九大系列

    }
}

function m2(){//星球
    if(GetUrlString('s') == '0'  || GetUrlString('s') == '' || GetUrlString('s') == null) {
        lunboadv("lunbo3", '3', "1", "1");//知识星球轮播图
        //huiyaun("huiyuan2", 'huiyuan2', "2", "3.5");//推广拉新会员信息
        getListdongTai();//动态
        //主题课程：2.5*2-course_topic
        //直播：2.5*1
        //课程精选：2.5*1--更多-原课程
        //名师推荐：2.5*1--更多-进入个人主页展示课程+文章等
        //视频精选：2.5*1--更多
        //问答精选：2.5*1--更多
        //猜您喜欢：瀑布流-文章
    }
}
function m3(){
    //会员数据
    //会员级别：以及升级
    //资金情况：

    //今日数据

    //我的订单-我的团队-我的客户
    if(GetUrlString('s') == '0' || GetUrlString('s') == '' || GetUrlString('s') == null) {
        if (localStorage.getItem("token") != null && localStorage.getItem("token") != '') {
            //detailuser();
            //detailuserShouru();
            $("#shouruzhichu").show();
            //getzijinjiludata2("mingxi", "2", 5);//收入支出记录
            userListNum("xiaoxinum", "1");
        }
        listtool("renqibangdantool", "1", 20, "1", "4", "");//增值服务：
        huiyaun("huiyuan3", 'huiyuan3', "2", "3.5");//推广拉新会员信息
    }
}
function m4(){//社交电商 //电商--需要更新自动获取
    if(GetUrlString('s') == '0' || GetUrlString('s') == '' || GetUrlString('s') == null) {
        //轮播图：
        //活动专场+限时抢购：可以自定义首页图和背景图
        //万人团：
        //百万补贴：
        //热销榜单：
        //大厂直供：
        //特卖会：
        //尾货剪标：
        //新奇特：
        //抖音热品--快手热品--淘宝直播热品
        //场景推荐：可以自定义场景首页图--二人情趣世界--二次元--古风汉服--抖音热品--快手热品--淘宝直播热品等--等等--参考有品和1688-拼多多
        //场景瀑布流：场景瀑布流完后进行加载商品瀑布流--可以展示左右滑动的瀑布流-第一张显示主题图片-左滑更多商品-最后一个显示更多。--全部展示完以后在显示商品瀑布流
        //商品瀑布流

        lunboadv("lunbo4", '4', "1", "1");

        zhuantilist8("zhuanti", 'zhuanti', "2", "4.5", "/gw/product/product/zhuanti", 6);//专题模块
        listproduct4("zhuti", "2", 10, "4", "", "", "2", 3.2, "", "1");//主题
        //listproduct("weinintuijian","2",10,"3","","");
        listproduct4("weinintuijian", "2", 10, "7", "", "", "2", 3.2, "", "2");
    }
}
function m5(){//会员资料
    if(GetUrlString('s') == '0' || GetUrlString('s') == '' || GetUrlString('s') == null) {
        if (localStorage.getItem("token") != null && localStorage.getItem("token") != '') {
            mynum();
        }
        //头像+昵称
        //粉丝+关注
        //实名认证
        //我的课程-先新建课程再添加文章（可付费）+我的问答（可付费）+我的活动（可付费）+我的直播（可付费）+我的视频
        //我的服务：
        //APP下载+@后台管理+商务合作+关于我们+联系客服+关注我们
        listtool("renqibangdantool2", "1", 20, "1", "4", "");//增值服务：
    }

}


/*function m6(){}
function m7(){}
function m8(){}
function m9(){}
function m10(){}
function m11(){}
function m12(){}
function m13(){}
function m14(){}
function m15(){}
function m16(){}
function m17(){}
function m18(){}
function m19(){}*/






var gentry = null,
    hl = null,
    le = null;
var er = null,
    ep = null;
var bUpdated = false; //用于兼容可能提前注入导致DOM未解析完更新的问题
// H5 plus事件处理
function plusReady() {
    // 获取音频目录对象
    plus.io.resolveLocalFileSystemURL('_doc/', function(entry) {
        entry.getDirectory('audio', {
            create: true
        }, function(dir) {
            gentry = dir;
            //updateHistory();
        }, function(e) {
            outLine('Get directory "audio" failed: ' + e.message);
        });
    }, function(e) {
        outLine('Resolve "_doc/" failed: ' + e.message);
    });
}
if(window.plus) {
    plusReady();
} else {
    document.addEventListener('plusready', plusReady, false);
}

// DOMContentLoaded事件处理
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素对象
    hl = document.getElementById('history');
    le = document.getElementById('empty');
    er = document.getElementById('record');
    rt = document.getElementById('recordtext');
    ep = document.getElementById('play');
    pt = document.getElementById('ptime');
    pp = document.getElementById('progress')
    ps = document.getElementById('schedule');
    //updateHistory();
}, false);

// 开始录音
var r = null,
    t = 0,
    ri = null,
    rt = null;

function startRecordPlus(){
    $("#recordaudionew").html("");
    //alert(1);
    //outSet('开始录音：');
    console.log('开始录音：');
    r = plus.audio.getRecorder();
    if(r == null) {
        console.log('录音对象未获取')
        outLine('录音对象未获取');
        $.toast('用户拒绝授权录音',"text");
        $("#luyinzhong").hide();
        $("#luyinzhuangtai").show();

        $("#recordtext").html("点击开始录音");
        $("#recordtext").css("color","#FF6666");
        return;
    }else{
        //录音图标样式处理
        $("#luyinzhuangtai").hide();
        $("#luyinzhong").show();
        $("#recordtext").html("录音中(点击可停止)");
        $("#recordtext").css("color","#ef4f4f");
        $("#voicefile").attr("onclick","stopRecordPlus()");
        localStorage.rainAllowRecord = 'true';
    }
    r.record({
        filename: '_doc/audio/'
        //format: '3gp'
    }, function(p) {
        console.log('录音完成：' + p)
        outLine('录音完成：' + p);
        plus.io.resolveLocalFileSystemURL(p, function(entry) {
            //createItem(entry);
            //录音图标样式处理
            $("#luyinzhong").hide();
            $("#luyinzhuangtai").show();
            $("#luyinzhuangtai").attr("src","../../img/agent/images/zhuanma.png");
            $("#recordtext").html("录音转码中…");
            $("#recordtext").css("color","#FF6666");


            addVoice(p, entry);
        }, function(e) {
            outLine('读取录音文件错误：' + e.message);
        });

    }, function(e) {
        outLine('录音失败：' + e.message);
    });
    /*er.style.display = 'block';
    t = 0;
    ri = setInterval(function() {
        t++;
        rt.innerText = timeToStr(t);
    }, 1000);*/

    t = 0;
    ri = setInterval(function() {
        t++;
        $("#recordtext").html(timeToStr(t));
        if(eval(t) > 60){
            stopRecordPlus();
        }
    }, 1000);
}
// 停止录音

function stopRecordPlus() {
    //er.style.display = 'none';
    //rt.innerText = '00:00:00';
    clearInterval(ri);
    ri = null;
    r.stop();
    w = null;
    r = null;
    t = 0;
}

function outLine(msg) {
    //$('#output').text(msg);
}

timeToStr = function(ts) {
    if(isNaN(ts)) {
        return "--:--:--";
    }
    var h = parseInt(ts / 3600);
    var m = parseInt((ts % 3600) / 60);
    var s = parseInt(ts % 60);
    return(ultZeroize(h) + ":" + ultZeroize(m) + ":" + ultZeroize(s));
};

ultZeroize = function(v, l) {
    var z = "";
    l = l || 2;
    v = String(v);
    for(var i = 0; i < l - v.length; i++) {
        z += "0";
    }
    return z + v;
};

function addVoice(path, entry) {
    console.log("entry = " + entry.name)
    console.log("上传前的文件名：" + entry.name);
    uploadVoicePlus(path);
}

function uploadVoicePlus(path) {
    console.log("开始上传：")
    var uploadUrl =baseFileUrlUploadToServer + "/sys/upload/upload";
    var task = plus.uploader.createUpload(uploadUrl, {
            method: "POST"
        },
        function(t, status) { //上传完成
            if(status == 200) {
                var data = JSON.parse(t.responseText);
                console.log("上传成功,返回数据为dbPath ：" + data.result.dbPath);
                //处理id和类型input
                if($("#voicefileInput").size() > 0){
                    $("#voicefileInput").val(data.result.dbPath);
                }else{
                    $("body").append("<input type='hidden' id='voicefileInput' value='"+data.result.dbPath+"' >");
                }
                var htmlStr = '';
                var idstr = "daswxssdsdasddfds";
                //音频--隐藏原始播放器

                htmlStr += '<div class="weui-flex">';
                htmlStr += '<div class="weui-flex__item">';
                htmlStr += '<div class="placeholder" style="margin-left: 15px;margin-top:10px;margin-right: 7.5px;">';

                htmlStr += '</div>';
                htmlStr += '</div>';
                htmlStr += '<div class="weui-flex__item">';
                htmlStr += '<div class="placeholder"  style="margin-top:10px;margin-left: 11.25px;margin-right: 11.25px;">';

                htmlStr += '<div class="page-bd center" id="audiostartA'+idstr+'" onclick=start("audiotest'+idstr+'","'+checkPath(data.result.dbPath,'3')+'","shifenmiao'+idstr+'","audiostartA'+idstr+'","audioIconA'+idstr+'")>';
                htmlStr += '<div class="audio"   >';
                htmlStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+idstr+'"/></div>';
                htmlStr += '<div id="shifenmiao'+idstr+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                htmlStr += '</div>';
                htmlStr += '<div class="disnone"><audio id="audiotest'+idstr+'" src=""  controls="controls" preload="meta"> </audio></div>';
                htmlStr += '</div>';


                htmlStr += '</div>';
                htmlStr += '</div>';
                htmlStr += '<div class="weui-flex__item">';
                htmlStr += '<div class="placeholder"  style="margin-right: 15px;margin-top:10px;margin-left: 7.5px;">';
                htmlStr += '</div>';
                htmlStr += '</div>';
                htmlStr += '</div>';


                $("#recordaudionew").html(htmlStr);

                //处理按钮事件刷新
                $("#voicefile").attr("onclick","startRecordPlus()");
                //录音转码完成
                $("#luyinzhong").hide();
                $("#luyinzhuangtai").show();
                $("#luyinzhuangtai").attr("src","../../img/agent/images/success.png");
                $("#recordtext").html("录音已完成(点我可重录)");
                $("#recordtext").css("color","#FF6666");


            } else {
                outLine("上传失败：" + status);
                //wt.close();
            }
        }
    );
    //task.addData("client", "HelloH5+");
    //task.addData("uid", getUid());
    /*for(var i = 0; i < files.length; i++) {
        var f = files[i];
        task.addFile(f.path, {
            key: f.name
        });
    }*/
    task.addFile(path, {
        key: "file"
    })
    task.start();
}

/*function setkefu() {
    console.log("=========kefuanniu");

}

$(document).ready(function(){
    setkefu();
})*/
/*

if(curWwwPath.search("productdetail") != -1 ){
    //window.onload=function(){
        $("body").append("<div class=\"divfc\" id=\"div\" style=\"left: 88%;top: 50%;width: 40px;height: 40px;z-index: 0;\"><img src='../../img/agent/head/kefu.png' style='width: 45px;'></div>");
        //console.log("=========kefuanniu");
        //alert(1);
        var flag = 0; //标记是拖曳还是点击
        var oDiv = document.getElementById('div');
        var disX, moveX, L, T, starX, starY, starXEnd, starYEnd;
        oDiv.addEventListener('touchstart', function (e) {
            flag = 0;
            e.preventDefault();//阻止触摸时页面的滚动，缩放
            disX = e.touches[0].clientX - this.offsetLeft;
            disY = e.touches[0].clientY - this.offsetTop;
//手指按下时的坐标
            starX = e.touches[0].clientX;
            starY = e.touches[0].clientY;
//console.log(disX);
        });
        oDiv.addEventListener('touchmove', function (e) {
            flag = 1;
            L = e.touches[0].clientX - disX;
            T = e.touches[0].clientY - disY;
//移动时 当前位置与起始位置之间的差值
            starXEnd = e.touches[0].clientX - starX;
            starYEnd = e.touches[0].clientY - starY;
//console.log(L);
            if (L < 0) {//限制拖拽的X范围，不能拖出屏幕
                L = 0;
            } else if (L > document.documentElement.clientWidth - this.offsetWidth) {
                L = document.documentElement.clientWidth - this.offsetWidth;
            }
            if (T < 0) {//限制拖拽的Y范围，不能拖出屏幕
                T = 0;
            } else if (T > document.documentElement.clientHeight - this.offsetHeight) {
                T = document.documentElement.clientHeight - this.offsetHeight;
            }
            moveX = L + 'px';
            moveY = T + 'px';
//console.log(moveX);
            this.style.left = moveX;
            this.style.top = moveY;
        });
        oDiv.addEventListener('touchend', function (e) {
            // alert(moveX);
//alert(parseInt(moveX));
//判断滑动方向
            if (flag === 0) {//点击
                onclick = isfollowqr('../../img/agent/wx/stj.jpg');
            }
        });
    //}
}*/

if(localStorage.getItem("videotimeslimit") != null && localStorage.getItem("videotimeslimit") != ''  && localStorage.getItem("videotimeslimit") != '0' ){
    setInterval(function () {
        var audios = document.getElementsByTagName("video");
        //console.log('监听video！')
        // 暂停函数
        pauseAll();
        function pauseAll() {
            var self = this;
            [].forEach.call(audios, function (i) {
                // 将audios中其他的audio全部暂停
                //i !== self && i.pause();


                if(i.paused) {
                    //i.play();
                }else{
                    //i.oncanplay=function(){
                        console.log("123===="+i.currentTime);
                        console.log("localStorage.getItem===="+localStorage.getItem("videotimeslimit"));
                        if(i.currentTime > eval(localStorage.getItem("videotimeslimit"))) {
                            console.log('监听video！---开始执行')
                            var id = $(i).parent().parent().attr('id');
                            var mid = id.substring(8,id.length);//动态ID
                            var price = $(i).parent().parent().attr('price');
                            var cre = $(i).parent().parent().attr('cre');

                            if(cre != localStorage.getItem("userId") && localStorage.getItem(""+mid+"") == null){//非自己发布且未扣次数
                                console.log('监听video！2--非自己发布且未扣次数')
                                if(price != null && price != '' && price != '0' && eval(price) > 0.00 ){//原创付费
                                    console.log('监听video！3-付费视频')
                                    if(isLogin2("","")) {
                                        //减金币--自己发布的不减金币
                                        if(localStorage.getItem("jinbi") != null && eval(localStorage.getItem("jinbi")) >= eval(price)){
                                            //扣除金币-然后减掉
                                            console.log('监听video！4-开始扣费')
                                            //传输数据
                                            var datauser = {
                                                "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
                                                "orderAboutid":mid,
                                                "orderMoney":price
                                            }

                                            instanceLogin({
                                                headers: {
                                                    'X-Requested-With': 'XMLHttpRequest',
                                                    'Content-Type': 'application/json;charset=UTF-8',
                                                    'Access-Control-Allow-Origin': '*'
                                                },//设置跨域请求头
                                                method: 'post',
                                                url: '/sys/user/edit',
                                                data: datauser,
                                                cancelToken: sourceLogin.token
                                            }) .then(function(rs){
                                                //console.log(rs)//数据在rs.data中  状态rs.status=200
                                                //console.log(rs);
                                                if(rs.status=200){
                                                    if(rs.data.code == '0'){
                                                        if(eval(localStorage.getItem("jinbi")) > 0){
                                                            localStorage.setItem("jinbi",eval(localStorage.getItem("jinbi"))-eval(price));
                                                        }

                                                        localStorage.setItem(""+mid+"",mid);//已经播放记录
                                                        console.log('监听video！4-已付费')
                                                        //localStorage.setItem("free",eval(localStorage.getItem("free"))-1);
                                                    }else{

                                                        i.pause();
                                                        jinbi();
                                                    }
                                                }else{
                                                    i.pause();
                                                    jinbi();
                                                }
                                            });


                                        }else{
                                            i.pause();
                                            jinbi();
                                        }
                                    }






                                }else{
                                    console.log('监听video！4--非收费视频')
                                    //减次数
                                    //会员免费

                                    if(localStorage.getItem("vip") != 'vip' ){//非会员

                                        console.log('监听video！5--非VIP会员');
                                        if (localStorage.getItem("liulandate") != null) {//如果大于1天会再次请求
                                            if (new Date().getTime() - new Date(localStorage.getItem("liulandate")).getTime() > 86400000) {
                                                localStorage.setItem("liulannum",1);
                                                //localStorage.setItem(""+mid+"",mid);//已经播放记录
                                                //localStorage.setItem("free",eval(localStorage.getItem("free"))-1);
                                                console.log('监听video！6--如果大于1天会再次请求')
                                            }
                                        }else{
                                            localStorage.setItem("liulandate",getNowFormatDate());
                                            localStorage.setItem("liulannum",1);
                                            //localStorage.setItem(""+mid+"",mid);//已经播放记录
                                            //localStorage.setItem("free",eval(localStorage.getItem("free"))-1);
                                            console.log('监听video！62ßß-bu大于1天会再次请求')
                                        }

                                        if(eval(localStorage.getItem("free")) > 0){
                                            if(localStorage.getItem("token") != null && localStorage.getItem("token") != ''){
                                                console.log('监听video！7--已登录');
                                                //已登录-获取会员登录次数--自己发布的不减次数
                                                if(localStorage.getItem("liulannum") != null && localStorage.getItem("liulannum") != ''){
                                                    console.log('监听video！8--浏览次数');
                                                    if(eval(localStorage.getItem("liulannum")) == eval(localStorage.getItem("videotimeslimit"))){
                                                        if(localStorage.getItem("free") != null && localStorage.getItem("free") != ''){
                                                            console.log('监听video！9--还有次数');
                                                            if(eval(localStorage.getItem("free")) > 0){
                                                                console.log('监听video！10--还有次数');

                                                                if(eval(localStorage.getItem("videotimeslimit")) - eval(localStorage.getItem("liulannum"))  > 0){

                                                                    localStorage.setItem("liulannum",eval(localStorage.getItem("liulannum"))+1);

                                                                }else{
                                                                    i.pause();//暂停并弹出信息-充值(限时免费成为会员)+上传(挣金币+观看次数)+分享(分享可以挣次数)
                                                                    huiyuan();
                                                                }


                                                                if(eval(localStorage.getItem("videotimes")) > 0){
                                                                    localStorage.setItem("videotimes",eval(localStorage.getItem("videotimes"))-1);
                                                                }

                                                                localStorage.setItem(""+mid+"",mid);//已经播放记录
                                                                if(eval(localStorage.getItem("free")) > 0){
                                                                    localStorage.setItem("free",eval(localStorage.getItem("free"))-1);
                                                                }

                                                            }else{
                                                                i.pause();//暂停并弹出信息-充值(限时免费成为会员)+上传(挣金币+观看次数)+分享(分享可以挣次数)
                                                                huiyuan();
                                                            }

                                                        }else{
                                                            i.pause();//暂停并弹出信息-充值(限时免费成为会员)+上传(挣金币+观看次数)+分享(分享可以挣次数)
                                                            huiyuan();
                                                        }
                                                    }else{
                                                        console.log('监听video！11--还有次数');
                                                        if(eval(localStorage.getItem("videotimeslimit")) - eval(localStorage.getItem("liulannum"))  > 0){

                                                            localStorage.setItem("liulannum",eval(localStorage.getItem("liulannum"))+1);

                                                        }else{
                                                            i.pause();//暂停并弹出信息-充值(限时免费成为会员)+上传(挣金币+观看次数)+分享(分享可以挣次数)
                                                            huiyuan();
                                                        }
                                                        localStorage.setItem(""+mid+"",mid);//已经播放记录
                                                        if(eval(localStorage.getItem("free")) > 0){
                                                            localStorage.setItem("free",eval(localStorage.getItem("free"))-1);
                                                        }
                                                    }


                                                }else{
                                                    console.log('监听video！12--还有次数');
                                                    localStorage.setItem("liulannum",1);
                                                    localStorage.setItem(""+mid+"",mid);//已经播放记录
                                                    if(eval(localStorage.getItem("free")) > 0){
                                                        localStorage.setItem("free",eval(localStorage.getItem("free"))-1);
                                                    }
                                                }



                                            }else{
                                                //未登录-逻辑完成
                                                console.log('监听video！6')
                                                if(localStorage.getItem("liulannum") != null && localStorage.getItem("liulannum") != ''){
                                                    if(eval(localStorage.getItem("free")) <= 0){
                                                        i.pause();//暂停并弹出信息-充值(限时免费成为会员)+上传(挣金币+观看次数)+分享(分享可以挣次数)
                                                        huiyuan();
                                                    }else{
                                                        console.log('监听video！13--还有次数');
                                                        if(eval(localStorage.getItem("videotimeslimit")) - eval(localStorage.getItem("liulannum"))  > 0){

                                                            localStorage.setItem("liulannum",eval(localStorage.getItem("liulannum"))+1);

                                                        }else{
                                                            i.pause();//暂停并弹出信息-充值(限时免费成为会员)+上传(挣金币+观看次数)+分享(分享可以挣次数)
                                                            huiyuan();
                                                        }
                                                        localStorage.setItem(""+mid+"",mid);//已经播放记录
                                                        if(eval(localStorage.getItem("free")) > 0){
                                                            localStorage.setItem("free",eval(localStorage.getItem("free"))-1);
                                                        }

                                                    }


                                                }else{
                                                    console.log('监听video！14--还有次数');
                                                    localStorage.setItem("liulannum",1);
                                                    localStorage.setItem(""+mid+"",mid);//已经播放记录
                                                    if(eval(localStorage.getItem("free")) > 0){
                                                        localStorage.setItem("free",eval(localStorage.getItem("free"))-1);
                                                    }
                                                }



                                            }

                                        }else{
                                            i.pause();//暂停并弹出信息-充值(限时免费成为会员)+上传(挣金币+观看次数)+分享(分享可以挣次数)
                                            huiyuan();
                                        }





                                    }else{
                                        console.log('VIP观看');
                                    }
                                }
                            }else{
                                console.log('自己发布/已扣过次数');
                            }



                            //判断次数还剩余多少

                            //弹出选择
                        }
                    //};




                }
                /*if(i.id == null || i.id == ''){
                    i.id='videowx';
                    i.play();
                    i.oncanplaythrough=i.pause();
                    i.pause();
                    //i.attr("preload","load");//preload="load"
                }*/

            })
        }
        if(localStorage.getItem("free") != null && localStorage.getItem("free") != ''){
            //console.log("free====="+localStorage.getItem("free"));
            if(eval(localStorage.getItem("free")) < 0){
                $("#free").html("0");//矫正
                localStorage.setItem("liulannum",localStorage.getItem("videotimeslimit"));//矫正
            }else{
                $("#free").html(localStorage.getItem("free"));
            }

        }
        if(localStorage.getItem("jinbi") != null && localStorage.getItem("jinbi") != ''){
            if(eval(localStorage.getItem("jinbi")) < 0){
                $("#free").html("0");
            }else{
                $("#tixianjine").html(localStorage.getItem("jinbi"));
            }

        }

    }, 2000);
}

function jinbi(){
    $.modal({
        title: "<div style='text-align: center;color: red;margin-bottom: 0px;font-size: 20px;'>金币不足！</div><i class=\"beauty icon-tongzhizhongxin f-red indexicon2\" style='font-size: 16px;color: #f60 !important'>如何继续观看视频?</i>",
        text: "<div style='text-align: left;'>1.上传视频边看边挣钱<br>2.金币充值限时优惠中</div>",
        buttons: [
            { text: "<i class=\"beauty icon-bofang f-orange indexicon2\" style='font-size: 16px;'>上传视频</i>", onClick: function(){ $.toast("快去首页发布视频吧！","text");} },
            { text: "<i class=\"beauty icon-qiandao f-orange indexicon2\" style='font-size: 16px;'>金币充值</i>", onClick: function(){ tohtml('chongzhi.html')} },

        ]
    });
}

function jinbi2(){
    $.modal({
        title: "<div style='text-align: center;color: red;margin-bottom: 0px;font-size: 20px;'>金币不足！</div><i class=\"beauty icon-tongzhizhongxin f-red indexicon2\" style='font-size: 16px;color: #f60 !important'>如何继续发红包?</i>",
        text: "<div style='text-align: left;'>1.上传视频边看边挣钱<br>2.金币充值限时优惠中</div>",
        buttons: [
            { text: "<i class=\"beauty icon-bofang f-orange indexicon2\" style='font-size: 16px;'>上传视频</i>", onClick: function(){ $.toast("快去首页发布视频吧！","text");} },
            { text: "<i class=\"beauty icon-qiandao f-orange indexicon2\" style='font-size: 16px;'>金币充值</i>", onClick: function(){ tohtml('chongzhi.html')} },

        ]
    });
}

function huiyuan(){
    $.modal({
        title: "<div style='text-align: center;color: red;margin-bottom: 0px;font-size: 20px;'>奖励免费观看次数不足！</div><i class=\"beauty icon-tongzhizhongxin f-red indexicon2\" style='font-size: 16px;color: #f60 !important'>如何继续观看视频?</i>",
        text: "<div style='text-align: left;'>1.每邀请"+setNum(localStorage.getItem("huiyuanx"))+"位好友奖励"+setNum(localStorage.getItem("huiyuany"))+"天VIP会员<br>2.每邀请"+setNum(localStorage.getItem("cishux"))+"位好友奖励"+setNum(localStorage.getItem("cishuy"))+"次观看次数<br>3.上传视频边看边挣钱<br>4.会员购买限时优惠中,会员免费看</div>",
        buttons: [
            { text: "<i class=\"beauty icon-web-icon- f-orange indexicon2\" style='font-size: 16px;'>邀请好友</i>", onClick: function(){ toMingpian()} },
            { text: "<i class=\"beauty icon-bofang f-orange indexicon2\" style='font-size: 16px;'>上传视频</i>", onClick: function(){ $.toast("快去首页发布视频吧！","text");} },
            { text: "<i class=\"beauty icon-zuanshi f-orange indexicon2\" style='font-size: 16px;'>会员购买</i>", onClick: function(){
                    toUserLevelDetail(localStorage.getItem("isonevip"))
            }
            },
        ]
    });
}

// 获取设备信息
function getDeviceInfo(){
    plus.device.getInfo({
        success:function(e){
            console.log('getDeviceInfo success: '+JSON.stringify(e));
        },
        fail:function(e){
            console.log('getDeviceInfo failed: '+JSON.stringify(e));
        }
    });
}



if(navigator.userAgent.indexOf("Html5Plus") > -1) {
    document.addEventListener('plusready', function(){

        getDeviceInfo();





        //个推页面加载时触发
        var pinf = plus.push.getClientInfo();
        var cid = pinf.clientid;//客户端标识


        if(localStorage.getItem("token") != null && localStorage.getItem("token") != '' && (localStorage.getItem("cid") == null || localStorage.getItem("cid") == '' || localStorage.getItem("cid") == 'undefined')  ){
            //传输数据
            var datauser = {
                "cid":cid,
                "tenancy":getSaasId(),"tenancyTemp":getSaasId()
            }
            instanceLogin({
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                },//设置跨域请求头
                method: 'post',
                url: '/sys/user/edit',
                data: datauser,
                cancelToken: sourceLogin.token
            }) .then(function(rs){
                //console.log(rs)//数据在rs.data中  状态rs.status=200
                if(rs.status=200){
                    if(rs.data.code == '0'){
                        localStorage.setItem("cid",cid);
                    }
                }else{
                    console.log('请求异常！')
                }

            });
        }

    }, false );


    //监听系统通知栏消息点击事件
    plus.push.addEventListener('click', function(msg){
        //处理点击消息的业务逻辑代码
    }, false);
    //监听接收透传消息事件
    plus.push.addEventListener('receive', function(msg){
        //处理透传消息的业务逻辑代码
    }, false);

    plus.push.clear();//清除通知栏
}

