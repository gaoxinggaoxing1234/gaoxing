localStorage.setItem("flk","b0");
var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost";//本地模式
}
//文件请求URL
var baseFileUrlDefault = ''+basehost+'';
var baseUrlPayDefault = ''+basehost+'/sfd';
var baseUrlDefault = ''+basehost+'/sfd/a/api/';
var baseUrlFrontDefault = ''+basehost+'/app/html/agent/';
var baseHostDefault = ''+basehost+'/';

/*默认头像*/
var baseDefaultHead = '/app/img/agent/head/head.png';
//默认图片
var baseDefaultImage = '/app/img/agent/images/defaultImage.jpg';
//默认红包图片
var baseDefaultHongBaoImage = '/app/img/agent/images/lingquhou.png';
//默认音频图片
var baseDefaultYinpinImage = '/app/img/agent/images/yinpin.gif';

var baseDownloadUrl = 'http://www.gaoxinggaoxing.com/download/sfw/app.html';

//清除session
//sessionStorage.clear();

localStorage.setItem("flk","b1");

function refresh() {
    //console.log(6);
    if(getIsAPPLE()){
        //console.log(7);
        window.location.href=curWwwPath;
        //location.reload();
    }else{
        //console.log(8);
        /* var url = window.location.href+"?version=1";

         console.log(url);*/
        /*var url = window.location.href;
        window.location.href = 'temp.html?url='+urlencode(url);*/
        /*Javascript刷新页面的几种方法：
        1 history.go(0)
        2 location.reload()
        3 location=location
        4 location.assign(location)
        5 document.execCommand('Refresh')
        6 window.navigate(location)
        7 location.replace(location)
        8 document.URL=location.href*/
        //location.assign(location);
        if(window.location.href.search("#") != -1){
            var url = window.location.href.replace("#","");
            window.location.replace(url);
        }else{
            window.location.href=curWwwPath;
        }

    }
}
function  fn1 (){
    var lunbotutab1 = $("#lunbotutab1").val();
    var ss1 =  new Swiper('#swiper-container'+lunbotutab1+'', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '#swiper-pagination'+lunbotutab1+'',
            clickable: true,
        },

    });

}

function  fn2 (){
    var lunbotutab2 = $("#lunbotutab2").val();
    var ss2 =  new Swiper('#swiper-container'+lunbotutab2+'', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '#swiper-pagination'+lunbotutab2+'',
            clickable: true,
        },

    });
    /* setTimeout(function() {
         fn2();
     }, 1500)*/
}

function  fn3 (){
    var lunbotutab3 = $("#lunbotutab3").val();
    var ss3 =  new Swiper('#swiper-container'+lunbotutab3+'', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '#swiper-pagination'+lunbotutab3+'',
            clickable: true,
        },

    });
    /*setTimeout(function() {
        fn3();
    }, 1500)*/

}
/*
setTimeout(function() {
    fn1();
}, 100)
setTimeout(function() {
    fn2();
}, 100)
setTimeout(function() {
    fn3();
}, 100)*/
$("#touchtaba").on('touchstart',function(){
    $("#touchtaba1").css("color","#FF6666");
    $("#touchtaba2").css("color","#FF6666");
    setTimeout(function() {
        fn1();
    }, 100)
    $("#touchtabb1").css("color","#999");
    $("#touchtabb2").css("color","#999");
    $("#touchtabc1").css("color","#999");
    $("#touchtabc2").css("color","#999");
    $("#touchtabd1").css("color","#999");
    $("#touchtabd2").css("color","#999");
    tab('a');

});
$("#touchtabb").on('touchstart',function(){
    $("#touchtabb1").css("color","#FF6666");
    $("#touchtabb2").css("color","#FF6666");
    setTimeout(function() {
        fn2();
    }, 100)
    $("#touchtaba1").css("color","#999");
    $("#touchtaba2").css("color","#999");
    $("#touchtabc1").css("color","#999");
    $("#touchtabc2").css("color","#999");
    $("#touchtabd1").css("color","#999");
    $("#touchtabd2").css("color","#999");
    tab('b');
});
$("#touchtabc").on('touchstart',function(){
    //toShifenliao();
    $("#touchtabc1").css("color","#FF6666");
    $("#touchtabc2").css("color","#FF6666");
    setTimeout(function() {
        fn3();
    }, 100)
    $("#touchtaba1").css("color","#999");
    $("#touchtaba2").css("color","#999");
    $("#touchtabb1").css("color","#999");
    $("#touchtabb2").css("color","#999");
    $("#touchtabd1").css("color","#999");
    $("#touchtabd2").css("color","#999");
    tab('c');
});
$("#touchtabd").on('touchstart',function(){
    $("#touchtabd1").css("color","#FF6666");
    $("#touchtabd2").css("color","#FF6666");

    $("#touchtaba1").css("color","#999");
    $("#touchtaba2").css("color","#999");
    $("#touchtabb1").css("color","#999");
    $("#touchtabb2").css("color","#999");
    $("#touchtabc1").css("color","#999");
    $("#touchtabc2").css("color","#999");
    tab('d');
});

function tab(str) {

    if (str == 'a') {
        $("#tab1").show();
        $("#tab2").hide();
        $("#tab3").hide();
        $("#tab4").hide();
        $("#topa").click();
        /*var lunbotutab1 = $("#lunbotutab1").val();
        var lunbotutab1flag = $("#lunbotutab1flag").val();
        if(lunbotutab1 != 0 ){

            //$("#lunbotutab1flag").val("0");
            if(lunbotutab1flag == '0'){
                //$("#lunbotutab1").val("0");
                $("#lunbotuid"+lunbotutab1+"").swipeSlide({
                    autoSwipe: true, //自动切换默认是
                    speed: 3000, //速度默认4000
                    continuousScroll: true, //默认否
                    transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)', //过渡动画linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier
                    lazyLoad: true, //懒加载默认否
                    firstCallback: function (i, sum, me) {
                        me.find('.dot').children().first().addClass('cur');
                    },
                    callback: function (i, sum, me) {
                        me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
                    }

                });

            }
        }*/
        localStorage.setItem('tab','agenttab1');
        localStorage.setItem('url',window.location.href);
    }
    if (str == 'b') {
        $("#tab1").hide();
        $("#tab2").show();
        $("#tab3").hide();
        $("#tab4").hide();
        $("#topb").click();
        localStorage.setItem('tab','agenttab2');
        localStorage.setItem('url',window.location.href);
        /*var lunbotutab2 = $("#lunbotutab2").val();
        if(lunbotutab2 != 0){

            //$("#lunbotutab2").val("0");
            $("#lunbotuid"+lunbotutab2+"").swipeSlide({
                autoSwipe: true, //自动切换默认是
                speed: 3000, //速度默认4000
                continuousScroll: true, //默认否
                transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)', //过渡动画linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier
                lazyLoad: true, //懒加载默认否
                firstCallback: function (i, sum, me) {
                    me.find('.dot').children().first().addClass('cur');
                },
                callback: function (i, sum, me) {
                    me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
                }

            });
        }*/
        if(localStorage.getItem("disbdindexb") == null && curWwwPath.search("bdindex.html") != -1){
            localStorage.setItem("disbdindexb","1")
            $("#disbdindexb").hide();
        }
        if(localStorage.getItem("disdcindexb") == null && curWwwPath.search("index.html") != -1){
            localStorage.setItem("disdcindexb","1")
            $("#disdcindexb").hide();
        }

    }
    if (str == 'c') {
        $("#tab1").hide();
        $("#tab2").hide();
        $("#tab3").show();
        $("#tab4").hide();
        $("#topc").click();
        /* var lunbotutab3 = $("#lunbotutab3").val();
         if(lunbotutab3 != 0){
             //$("#lunbotutab2").val("0");
             $("#lunbotuid"+lunbotutab3+"").swipeSlide({
                 autoSwipe: true, //自动切换默认是
                 speed: 3000, //速度默认4000
                 continuousScroll: true, //默认否
                 transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)', //过渡动画linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier
                 lazyLoad: true, //懒加载默认否
                 firstCallback: function (i, sum, me) {
                     me.find('.dot').children().first().addClass('cur');
                 },
                 callback: function (i, sum, me) {
                     me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
                 }

             });
         }*/

        localStorage.setItem('tab','agenttab3');
        localStorage.setItem('url',window.location.href);
        if(localStorage.getItem("disbdindexc") == null && curWwwPath.search("bdindex.html") != -1){
            localStorage.setItem("disbdindexc","1");
            $("#disbdindexc").hide();
        }
        if(localStorage.getItem("disdcindexc") == null && curWwwPath.search("index.html") != -1){
            localStorage.setItem("disdcindexc","1");
            $("#disdcindexc").hide();
        }
    }
    if (str == 'd') {
        if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
            closediv("logintips");
            isLogin('','');
        }else{
            $("#tab1").hide();
            $("#tab2").hide();
            $("#tab3").hide();
            $("#tab4").show();
            $("#topd").click();
            localStorage.setItem('tab','agenttab4');
            localStorage.setItem('url',window.location.href);
        }

    }
}


function wxxcx() {
    var flag= 'nowxxcx';
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){    //判断是否是微信环境

        //微信环境
        wx.miniProgram.getEnv(function(res) {
            if (res.miniprogram) {
                // 小程序环境下逻辑
                flag= 'wxxcx';
            }
        })
    }

    return flag;
}


function cleararea(obj) {
    $(obj).prev().find('.weui-textarea').val("");
    return false;
}

/*function refresh() {
    window.location.href = baseUrlFrontDefault + 'temp.html?url='+window.location.href;
}*/

function textarea(input) {
    var content = $(input);
    var max = content.next().find('i').text();
    var value = content.val();
    if (value.length > 0) {

        value = value.replace(/\n|\r/gi, "");
        var len = value.length;
        content.next().find('span').text(len);
        if (len > max) {
            content.next().addClass('f-red');
        } else {
            content.next().removeClass('f-red');
        }
    }
}

var cookie = {
    set:function(key,val){
        var date=new Date();
        var expiresHours=90000;
        date.setTime(date.getTime()+expiresHours*3600000);//永不失效
        //console.log(date.toGMTString());
        document.cookie=key + "=" + val +";expires="+date.toGMTString()+";path=/";
    },
    get:function(key){
        var getCookie = document.cookie.replace(/[ ]/g,"");
        var arrCookie = getCookie.split(";")
        var tips;
        for(var i=0;i<arrCookie.length;i++){
            var arr=arrCookie[i].split("=");
            if(key==arr[0]){
                tips=arr[1];
                break;
            }
        }
        return tips;
    }
}

var ualogin = window.navigator.userAgent.toLowerCase();
//通过正则表达式匹配ua中是否含有MicroMessenger字符串
var strlogintitle='绑定手机号';
if (ualogin.match(/MicroMessenger/i) != 'micromessenger') {
    strlogintitle='登录/注册';
}
localStorage.setItem("flk","b2");
var HTMLlogin = '';
HTMLlogin += '<div class="page-bd" style="margin-top:30%;padding-top:10px;margin-left:6%;width:88%;height:290px;background-color: white;z-index: 9;">';
HTMLlogin += '<div class="page-hd">';
HTMLlogin += '<h3 style="text-align: center;">';
HTMLlogin += strlogintitle;
HTMLlogin += '</h3>';
HTMLlogin += '<p class="page-hd-desc"></p>';
HTMLlogin += '</div>';
HTMLlogin += '<div class="weui-cell lr10">';
HTMLlogin += '<div class="weui-cell__hd">';
HTMLlogin += '<label class="weui-label" style="font-size:16px">手机号</label>';
HTMLlogin += '</div>';
HTMLlogin += '<div class="weui-cell__bd">';
HTMLlogin += '<input class="weui-input" style="font-size:16px" id="loginmobile" maxlength="11" placeholder="请输入手机号" type="number">';
HTMLlogin += '</div>';

HTMLlogin += '</div>';
HTMLlogin += '<div class="weui-cell weui-cell_vcode lr10">';
HTMLlogin += '<div class="weui-cell__hd">';
HTMLlogin += '<label class="weui-label" style="font-size:16px">验证码</label>';
HTMLlogin += '</div>';
HTMLlogin += '<div class="weui-cell__bd">';
HTMLlogin += '<input class="weui-input" style="font-size:16px" id="logincode" maxlength="4" oninput="if(value.length>4)value=value.slice(0,4)" placeholder="验证码" type="number">';
HTMLlogin += '</div>';
HTMLlogin += '<div class="weui-cell__ft">';
HTMLlogin += '<button  class="weui-vcode-btn" onclick="settime(this)">获取验证码</button>';
HTMLlogin += '</div>';
HTMLlogin += '</div>';
HTMLlogin += '<div class="clear lr10" style="margin-top: 35px;">';
HTMLlogin += '    <label  class="weui-agree readagree"  >';
HTMLlogin += '    <input id="weuiAgree" type="checkbox" name="loginagree" checked class="weui-agree__checkbox">';
HTMLlogin += '    <span class="weui-agree__text">阅读并同意';
HTMLlogin += '    </span>';
HTMLlogin += '    </label>';
HTMLlogin += '    <div class="divagree">';
HTMLlogin += '    <span class="weui-agree weui-agree__text leftagree">';
HTMLlogin += '    <a href="zhucexieyi.html">《注册协议》</a>';
HTMLlogin += '</span>';
HTMLlogin += '</div>';
HTMLlogin += '</div>';
HTMLlogin += '<div class="clear"><a   onclick="login();" class="weui-btn weui-btn_primary mybtn" style="margin-top:45px;margin-left: 20px;margin-right: 20px;" >登录</a></div>';
HTMLlogin += '</div>';

function setZhuceXieYiChecked(){

    if($("#zhucexieyiType").size() > 0){
        if($("#zhucexieyiType").val() == '0'){
            $("#zhucexieyiType").val("1");
        }
        else if($("#zhucexieyiType").val() == '1'){
            $("#zhucexieyiType").val("0");
        }

    }else{
        $("body").append("<input type='hidden' id='zhucexieyiType' value='0' >");
    }

}

var countdown=60;
function settime(obj) {
    var loginmobile = $("#loginmobile").val();
    if(loginmobile=="" || !/1[3|4|6|5|7|8|9]\d{9}/.test(loginmobile)){
        $.toast("手机号不正确","text");

        return false;
    }
    if(countdown == 60){
        //发送短息
        sendSMS();
    }
    var code = $(obj);
    if (countdown == 0) {
        code.removeAttr('disabled');
        code.text("获取验证码");
        countdown =60;
        return;
    } else {
        code.text("重新发送(" + countdown + ")");
        code.attr('disabled',true);
        countdown--;
    }
    setTimeout(function() {
        settime(obj) }, 1000);

}

function closediv(div){
    $("#"+div+"").remove();
}

//红包领取
var HTMLHONGBAO = '<p style="text-align:center;line-height:20px; color:#fff;margin-top:150px;padding:0px;" onclick=gethongBao() >';
HTMLHONGBAO += '<img src="../../img/agent/images/lingquhongbao.png" height="286" width="173" id="lingquqian"/><img src="../../img/agent/images/lingquhou.png" class="a-shake" height="286" width="173" id="lingquhou" style="display: none;"/><br><div id="hongbaojiner" style="display:none;width: 100%;margin-top: -95px;margin-bottom: 30px;"><p style="text-align: center;color: white;font-size: 24px;" id="setMoney"></p></div>';
HTMLHONGBAO += '</p>';



function isHongBao(){//领取红包

    if(localStorage.getItem('token') != null  && localStorage.getItem('token') != 'null'  && localStorage.getItem('token') != ''){
        //localStorage.setItem('advdate',getNowFormatDate());
        var div = document.createElement('div');
        div.id='hongbaotips';
        div.style='position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;';
        div.innerHTML= HTMLHONGBAO + '<p style="text-align:center;line-height:20px; color:#fff;margin:10px;padding:0px;margin-top: 80px;" id="closeId" onclick=closeHongBaodiv("hongbaotips"); ><i class="beauty icon-anniu_guanbi" ></i></p>';
        document.body.appendChild(div);
        if($("#hongbaotips").css("position") != 'fixed'){
            $("#hongbaotips").attr("style","position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;");
        }

        $("input,select,textarea").blur(function(){
            setTimeout(function() {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            }, 100);
        });
    }

}


function closeHongBaodiv(div){
    $("#"+div+"").remove();
}


localStorage.setItem("flk","b3");

//为空
var noDataStr = '';
noDataStr += '<div class="weui-loadmore weui-loadmore_line">';
noDataStr += '<span class="weui-loadmore__tips">空空如也</span>';
noDataStr += '</div>';

function toindex(){
    localStorage.setItem('tab','agenttab1');
    localStorage.setItem('url',window.location.href);
    if(localStorage.getItem("ismyindex") == '1'){
        window.location.href=""+getSaasId()+".html?share="+getShareId()+'&s='+getSaasId();//
    }else{
        window.location.href="index.html?share="+getShareId()+'&s='+getSaasId();//
    }
}
function toIndex(){
    localStorage.setItem('tab','agenttab1');
    localStorage.setItem('url',window.location.href);
    if(localStorage.getItem("ismyindex") == '1'){
        window.location.href=""+getSaasId()+".html?share="+getShareId()+'&s='+getSaasId();//
    }else{
        window.location.href="index.html?share="+getShareId()+'&s='+getSaasId();//
    }
}
function todcindex(){
    localStorage.setItem('tab','agenttab1');
    localStorage.setItem('url',window.location.href);
    if(localStorage.getItem("ismyindex") == '1'){
        window.location.href=""+getSaasId()+".html?share="+getShareId()+'&s='+getSaasId();//
    }else{
        window.location.href="index.html?share="+getShareId()+'&s='+getSaasId();//
    }
}
function todownload(){
    window.location.href = baseDownloadUrl;
}
function GetUrlString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


function checkPath(url,flag) {
    if(url == null || url == ''){
        if(flag == '1'){//头像
            return basehost + baseDefaultHead;
        }else if(flag == '2'){//图片
            return basehost + baseDefaultImage;
        }else if(flag == '3'){//文件
            return "文件已失效";
        }else if(flag == '4'){//红包
            return basehost + baseDefaultHongBaoImage;
        }else{
            return null;
        }

    }else{
        if(url.substr(0,7).toLowerCase() == "http://" || url.substr(0,8).toLowerCase() == "https://"){
            return url;
        }else if(url.search("../../img/") != -1){
            return url;
        }else{
            return basehost + url;
        }
    }

}

function videoImagePath(url) {
    return url.replace(".mp4",".png").replace(".mov",".png").replace(".flv",".png");
}

function checkPathBackGroubdImage(url,flag) {
    if(url == null || url == ''){
        if(flag == '1'){//头像
            return '\''+baseDefaultHead+'\'';
        }else if(flag == '2'){//图片
            return '\''+baseDefaultImage+'\'';
        }else if(flag == '3'){//文件
            return "文件已失效";
        }else if(flag == '4'){//红包
            return '\''+baseDefaultHongBaoImage+'\'';
        }else{
            return null;
        }

    }else{
        if(url.substr(0,7).toLowerCase() == "http://" || url.substr(0,8).toLowerCase() == "https://"){
            return '\''+url+'\'';
        }else if(url.search("../../img/") != -1){
            return '\''+url+'\'';
        }else{
            return '\''+url+'\'';
        }
    }

}

function judgeBrand(sUserAgent) {
    var isIphone = sUserAgent.match(/iphone/i) == "iphone";
    var isHuawei = sUserAgent.match(/huawei/i) == "huawei";
    var isHonor = sUserAgent.match(/honor/i) == "honor";
    var isOppo = sUserAgent.match(/oppo/i) == "oppo";
    var isOppoR15 = sUserAgent.match(/pacm00/i) == "pacm00";
    var isVivo = sUserAgent.match(/vivo/i) == "vivo";
    var isXiaomi = sUserAgent.match(/mi\s/i) == "mi ";
    var isXiaomi2s = sUserAgent.match(/mix\s/i) == "mix ";
    var isRedmi = sUserAgent.match(/redmi/i) == "redmi";
    var isSamsung = sUserAgent.match(/sm-/i) == "sm-";

    if (isIphone) {
        return 'iphone';
    } else if (isHuawei || isHonor) {
        return 'huawei';
    } else if (isOppo || isOppoR15) {
        return 'oppo';
    } else if (isVivo) {
        return 'vivo';
    } else if (isXiaomi || isRedmi || isXiaomi2s) {
        return 'xiaomi';
    } else if (isSamsung) {
        return 'samsung';
    } else {
        return 'default';
    }
}

function checkLink(url,flag) {
    if(url != null && url != ''){
        if(url.substr(0,7).toLowerCase() == "http://" || url.substr(0,8).toLowerCase() == "https://"){
            return url;
        }else if(flag == '1'){
            return "http://" + url;
        }else if(flag == '2'){
            return "https://" + url;
        }
    }else{
        return url;
    }



}


function setNum(num){
    if(num == null || num == '' || num == 'undifined'){
        return 0;
    }else{
        return num;
    }
}

function setNULL(num){
    if(num == null || num == '' || num == 'null' ||  num == 'undifined'){
        return "";
    }else{
        return num;
    }
}


function getImageContent(id,url){
    if(url == null || url == ''){
        return '';
    }else{
        url =  url.replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",");
        var htmlStr = '';
        var strs= new Array(); //定义一数组
        strs=url.split("\,"); //字符分割
        for (i=0;i<strs.length ;i++ )
        {
            if(strs.length == 1){
                if(strs[i].substr(0,7).toLowerCase() == "http://" || strs[i].substr(0,8).toLowerCase() == "https://"){
                    htmlStr += '<li style="width: 50%"><span id="'+id+(i+1)+'" onclick=gallerydisplay("'+id+'","'+(i+1)+'","'+strs.length+'"); style="background-image:url('+checkPathBackGroubdImage(strs[i])+');background-repeat:no-repeat;background-size:cover;"></span></li>';

                }else{
                    htmlStr += '<li style="width: 50%"><span id="'+id+(i+1)+'" onclick=gallerydisplay("'+id+'","'+(i+1)+'","'+strs.length+'"); style="background-image:url('+checkPathBackGroubdImage(baseFileUrlDefault+strs[i])+');background-repeat:no-repeat;background-size:cover;"></span></li>';

                }
            }else{
                if(strs[i].substr(0,7).toLowerCase() == "http://" || strs[i].substr(0,8).toLowerCase() == "https://"){
                    htmlStr += '<li><span id="'+id+(i+1)+'" onclick=gallerydisplay("'+id+'","'+(i+1)+'","'+strs.length+'"); style="background-image:url('+checkPathBackGroubdImage(strs[i])+');background-repeat:no-repeat;background-size:cover;"></span></li>';

                }else{
                    htmlStr += '<li><span id="'+id+(i+1)+'" onclick=gallerydisplay("'+id+'","'+(i+1)+'","'+strs.length+'"); style="background-image:url('+checkPathBackGroubdImage(baseFileUrlDefault+strs[i])+');background-repeat:no-repeat;background-size:cover;"></span></li>';

                }
            }

        }
        return htmlStr;
    }
}

function getImage100Content(id,url){
    if(url == null || url == ''){
        return '';
    }else{
        url =  url.replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",");
        var htmlStr = '';
        var strs= new Array(); //定义一数组
        strs=url.split("\,"); //字符分割
        for (i=0;i<strs.length ;i++ )
        {
            if(strs.length == 1){
                if(strs[i].substr(0,7).toLowerCase() == "http://" || strs[i].substr(0,8).toLowerCase() == "https://"){
                    htmlStr += '<li style=""><span id="'+id+(i+1)+'" onclick=gallerydisplay("'+id+'","'+(i+1)+'","'+strs.length+'"); style="background-image:url('+checkPathBackGroubdImage(strs[i])+');background-repeat:no-repeat;background-size:cover;"></span></li>';

                }else{
                    htmlStr += '<li style=""><span id="'+id+(i+1)+'" onclick=gallerydisplay("'+id+'","'+(i+1)+'","'+strs.length+'"); style="background-image:url('+checkPathBackGroubdImage(baseFileUrlDefault+strs[i])+');background-repeat:no-repeat;background-size:cover;"></span></li>';

                }
            }else{
                if(strs[i].substr(0,7).toLowerCase() == "http://" || strs[i].substr(0,8).toLowerCase() == "https://"){
                    htmlStr += '<li><span id="'+id+(i+1)+'" onclick=gallerydisplay("'+id+'","'+(i+1)+'","'+strs.length+'"); style="background-image:url('+checkPathBackGroubdImage(strs[i])+');background-repeat:no-repeat;background-size:cover;"></span></li>';

                }else{
                    htmlStr += '<li><span id="'+id+(i+1)+'" onclick=gallerydisplay("'+id+'","'+(i+1)+'","'+strs.length+'"); style="background-image:url('+checkPathBackGroubdImage(baseFileUrlDefault+strs[i])+');background-repeat:no-repeat;background-size:cover;"></span></li>';

                }
            }

        }
        return htmlStr;
    }
}

function getImageChatContent(id,url){
    var width = document.body.clientWidth*0.6;
    //console.log("url======"+url);
    if(url == null || url == ''){
        return '';
    }else{
        url =  url.replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",");
        var htmlStr = '';
        var strs= new Array(); //定义一数组
        strs=url.split("\,"); //字符分割
        for (i=0;i<strs.length ;i++ )
        {
            if(strs.length == 1){
                if(strs[i].substr(0,7).toLowerCase() == "http://" || strs[i].substr(0,8).toLowerCase() == "https://"){
                    htmlStr += '<li ><span id="'+id+(i+1)+'" onclick=gallerydisplay("'+id+'","'+(i+1)+'","'+strs.length+'"); style="background-image:url('+checkPathBackGroubdImage(strs[i])+');background-repeat:no-repeat;background-size:cover;"></span></li>';

                }else{
                    htmlStr += '<li ><span id="'+id+(i+1)+'" onclick=gallerydisplay("'+id+'","'+(i+1)+'","'+strs.length+'"); style="background-image:url('+checkPathBackGroubdImage(baseFileUrlDefault+strs[i])+');background-repeat:no-repeat;background-size:cover;"></span></li>';

                }
            }else{
                if(strs[i].substr(0,7).toLowerCase() == "http://" || strs[i].substr(0,8).toLowerCase() == "https://"){
                    htmlStr += '<li  ><span id="'+id+(i+1)+'" onclick=gallerydisplay("'+id+'","'+(i+1)+'","'+strs.length+'"); style="background-image:url('+checkPathBackGroubdImage(strs[i])+');background-repeat:no-repeat;background-size:cover;"></span></li>';

                }else{
                    htmlStr += '<li  ><span id="'+id+(i+1)+'" onclick=gallerydisplay("'+id+'","'+(i+1)+'","'+strs.length+'"); style="background-image:url('+checkPathBackGroubdImage(baseFileUrlDefault+strs[i])+');background-repeat:no-repeat;background-size:cover;"></span></li>';

                }
            }

        }
        //console.log("2======"+htmlStr);
        return htmlStr;

    }
}




function getImageDetailContent(id,url){
    if(url == null || url == ''){
        return '';
    }else{
        url =  url.replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",");
        var htmlStr = '';
        var strs= new Array(); //定义一数组
        strs=url.split("\,"); //字符分割
        for (i=0;i<strs.length ;i++ )
        {
            if(strs.length == 1){
                if(strs[i].substr(0,7).toLowerCase() == "http://" || strs[i].substr(0,8).toLowerCase() == "https://"){
                    htmlStr += '<li style="width: 100%"><span id="'+id+(i+1)+'" onclick=gallerydisplay("'+id+'","'+(i+1)+'","'+strs.length+'"); style="background-image:url('+checkPathBackGroubdImage(strs[i])+');background-repeat:no-repeat;background-size:cover;"></span></li>';

                }else{
                    htmlStr += '<li style="width: 100%"><span id="'+id+(i+1)+'" onclick=gallerydisplay("'+id+'","'+(i+1)+'","'+strs.length+'"); style="background-image:url('+checkPathBackGroubdImage(baseFileUrlDefault+strs[i])+');background-repeat:no-repeat;background-size:cover;"></span></li>';

                }
            }else{
                if(strs[i].substr(0,7).toLowerCase() == "http://" || strs[i].substr(0,8).toLowerCase() == "https://"){
                    htmlStr += '<li><span id="'+id+(i+1)+'" onclick=gallerydisplay("'+id+'","'+(i+1)+'","'+strs.length+'"); style="background-image:url('+checkPathBackGroubdImage(strs[i])+');background-repeat:no-repeat;background-size:cover;"></span></li>';

                }else{
                    htmlStr += '<li><span id="'+id+(i+1)+'" onclick=gallerydisplay("'+id+'","'+(i+1)+'","'+strs.length+'"); style="background-image:url('+checkPathBackGroubdImage(baseFileUrlDefault+strs[i])+');background-repeat:no-repeat;background-size:cover;"></span></li>';

                }
            }

        }
        return htmlStr;
    }
}


function getImageDetailList(id,url){
    if(url == null || url == ''){
        return '';
    }else{
        url =  url.replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",");
        var htmlStr = '';
        var strs= new Array(); //定义一数组
        strs=url.split("\,"); //字符分割
        for (i=0;i<strs.length ;i++ )
        {
            if(strs.length == 1){
                if(strs[i].substr(0,7).toLowerCase() == "http://" || strs[i].substr(0,8).toLowerCase() == "https://"){
                    htmlStr += '<div style="width: 100%"><img  src="'+checkPath(strs[i])+'" /></div>';

                }else{
                    htmlStr += '<div style="width: 100%"><img  src="'+checkPath(baseFileUrlDefault+strs[i])+'" /></div>';

                }
            }else{
                if(strs[i].substr(0,7).toLowerCase() == "http://" || strs[i].substr(0,8).toLowerCase() == "https://"){
                    htmlStr += '<div style="width: 100%"><img  src="'+checkPath(strs[i])+'" /></div>';

                }else{
                    htmlStr += '<div style="width: 100%"><img  src="'+checkPath(baseFileUrlDefault+strs[i])+'" /></div>';

                }

            }

        }
        return htmlStr;
    }
}


function getImageDetailListFirst(id,url){
    if(url == null || url == ''){
        return '';
    }else{
        url =  url.replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",");
        var htmlStr = '';
        var strs= new Array(); //定义一数组
        strs=url.split("\,"); //字符分割
        for (i=0;i<strs.length ;i++ )
        {
            if(i == 0){
                if(strs[i].substr(0,7).toLowerCase() == "http://" || strs[i].substr(0,8).toLowerCase() == "https://"){
                    htmlStr += '<div style="width: 100%"><img  src="'+checkPath(strs[i])+'" /></div>';

                }else{
                    htmlStr += '<div style="width: 100%"><img  src="'+checkPath(baseFileUrlDefault+strs[i])+'" /></div>';

                }



            }

        }
        return htmlStr;
    }
}

function getFirstImageDetailContent(url){
    if(url == null || url == ''){
        return '';
    }else{
        url =  url.replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",");
        var htmlStr = '';
        var strs= new Array(); //定义一数组
        strs=url.split("\,"); //字符分割
        for (i=0;i<1 ;i++ )
        {

            if(i==0){
                if(strs[i].substr(0,7).toLowerCase() == "http://" || strs[i].substr(0,8).toLowerCase() == "https://"){
                    htmlStr =   strs[i];

                }else{
                    htmlStr =   strs[i];

                }


            }

        }
        return htmlStr;
    }
}

function getdateShort(date) {

    var a =new Date(date);
    var t1 =  a.getFullYear();
    var t2 =   a.getMonth()+1;
    var t3 = a.getDate();
    return t1 +'-'+t2+'-'+t3;

}


function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function timeago(dateStr){   //时间字符串=2018-01-01 11：11：11
    var dateTimeStamp =  new Date(dateStr.replace(/-/g, "/")).getTime();
    var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();   //获取当前时间毫秒
    //console.log(now)
    var diffValue = now - dateTimeStamp;//时间差

    if(diffValue < 0){
        return "刚刚";
    }
    var minC = diffValue/minute;  //计算时间差的分，时，天，周，月
    var hourC = diffValue/hour;
    var dayC = diffValue/day;
    var weekC = diffValue/week;
    var monthC = diffValue/month;
    if(monthC >= 1 && monthC <= 3){
        result = " " + parseInt(monthC) + "月前"
    }else if(weekC >= 1 && weekC <= 3){
        result = " " + parseInt(weekC) + "周前"
    }else if(dayC >= 1 && dayC <= 6){
        result = " " + parseInt(dayC) + "天前"
    }else if(hourC >= 1 && hourC <= 23){
        result = " " + parseInt(hourC) + "小时前"
    }else if(minC >= 1 && minC <= 59){
        result =" " + parseInt(minC) + "分钟前"
    }else if(diffValue >= 0 && diffValue <= minute){
        result = "刚刚"
    }else {
        var datetime = new Date();
        datetime.setTime(dateTimeStamp);
        var Nyear = datetime.getFullYear();
        var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        result = Nyear + "-" + Nmonth + "-" + Ndate + " " + Nhour + ":" + Nminute
        //result = dateStr;
    }
    return result;
}

function timeagonianyueri(dateStr){   //时间字符串=2018-01-01 11：11：11
    var dateTimeStamp =  new Date(dateStr.replace(/-/g, "/")).getTime();
    var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();   //获取当前时间毫秒
    //console.log(now)
    var diffValue = now - dateTimeStamp;//时间差

    if(diffValue < 0){
        return "刚刚";
    }
    var minC = diffValue/minute;  //计算时间差的分，时，天，周，月
    var hourC = diffValue/hour;
    var dayC = diffValue/day;
    var weekC = diffValue/week;
    var monthC = diffValue/month;
    if(monthC >= 1 && monthC <= 3){
        result = " " + parseInt(monthC) + "月前"
    }else if(weekC >= 1 && weekC <= 3){
        result = " " + parseInt(weekC) + "周前"
    }else if(dayC >= 1 && dayC <= 6){
        result = " " + parseInt(dayC) + "天前"
    }else if(hourC >= 1 && hourC <= 23){
        result = " " + parseInt(hourC) + "小时前"
    }else if(minC >= 1 && minC <= 59){
        result =" " + parseInt(minC) + "分钟前"
    }else if(diffValue >= 0 && diffValue <= minute){
        result = "刚刚"
    }else {
        var datetime = new Date();
        datetime.setTime(dateTimeStamp);
        var Nyear = datetime.getFullYear();
        var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        result = Nyear + "-" + Nmonth + "-" + Ndate
        //result = dateStr;
    }
    return result;
}

function timeago2(dateStr){   //时间字符串=2018-01-01 11：11：11
    var dateTimeStamp =  new Date(dateStr.replace(/-/g, "/")).getTime();
    var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();   //获取当前时间毫秒
    //console.log(now)
    var diffValue = now - dateTimeStamp;//时间差

    if(diffValue < 0){
        return "刚刚";
    }
    var minC = diffValue/minute;  //计算时间差的分，时，天，周，月
    var hourC = diffValue/hour;
    var dayC = diffValue/day;
    var weekC = diffValue/week;
    var monthC = diffValue/month;
    if(monthC >= 1 && monthC <= 3){
        result = " " + parseInt(monthC) + "月前"
    }else if(weekC >= 1 && weekC <= 3){
        result = " " + parseInt(weekC) + "周前"
    }else if(dayC >= 1 && dayC <= 6){
        result = " " + parseInt(dayC) + "天前"
    }else if(hourC >= 1 && hourC <= 23){
        result = " " + parseInt(hourC) + "小时前"
    }else if(minC >= 1 && minC <= 59){
        result =" " + parseInt(minC) + "分钟前"
    }else if(diffValue >= 0 && diffValue <= minute){
        result = "刚刚"
    }else {
        var datetime = new Date();
        datetime.setTime(dateTimeStamp);
        var Nyear = datetime.getFullYear();
        var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        result = Nyear + "-" + Nmonth + "-" + Ndate;
        //result = dateStr;
    }
    return result;
}

var dateDiff = function(hisTime,nowTime){//废弃
    if(!arguments.length) return '';
    var arg = arguments,
        now =arg[1]?arg[1]:new Date().getTime(),
        diffValue = now - arg[0].getTime(),
        result={
            isToday:false
        },
        minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        halfamonth = day * 15,
        month = day * 30,
        year = month * 12,

        _year = diffValue/year,
        _month =diffValue/month,
        _week =diffValue/(7*day),
        _day =diffValue/day,
        _hour =diffValue/hour,
        _min =diffValue/minute;

    if(new Date().toDateString()==hisTime.toDateString()){
        result.isToday=true;
    }
    if(_year>=1) result.text=parseInt(_year) + "年前";
    else if(_month>=1) result.text=parseInt(_month) + "个月前";
    else if(_week>=1) result.text=parseInt(_week) + "周前";
    else if(_day>=1) result.text=parseInt(_day) +"天前";
    else if(_hour>=1) result.text=parseInt(_hour) +"个小时前";
    else if(_min>=1) result.text=parseInt(_min) +"分钟前";
    else result.text="刚刚";
    return result;
}

//此方法来源于 https://github.com/vuejs/vue-hackernews/blob/gh-pages/src/filters/index.js
function fromNow (dateStr) {
    const between = Date.now() / 1000 - Number(new Date(dateStr.replace(/-/g,'/')).getTime()) / 1000;
    if (between < 3600) {
        return (~~(between / 60)+'分钟前');
    } else if (between < 86400) {
        return (~~(between / 3600)+'小时前');
    } else {
        return (~~(between / 86400)+'天前');
    }
}

function isToday(dateStr){
    return (new Date().toDateString()==(new Date(dateStr.replace(/-/g,'/')).toDateString()));
}

localStorage.setItem("flk","b4");

function getBrowser() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        var ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            //微信内部
            return 'wxmobile';

        }else if(ua.match(/Alipay/i) == 'alipay'){
            //支付宝内部
            return 'alimobile';
        }else{

            return 'mobile';
        }
    }else {
        return 'pc';
    }
}

function getIsAPPLE(){
    var isMac = function() {
        return /macintosh|mac os x/i.test(navigator.userAgent);
    }();

    return isMac
}

//判断是安卓还是苹果
/*var u = navigator.userAgent;

var ipad = u.match(/(iPad).*OS\s([\d_]+)/i);
var ipod = u.match(/(iPod).*OS\s([\d_]+)/i)
var iphone = !ipod && !ipad && u.match(/(iPhone\sOS)\s([\d_]+)/i);
var safari = u.match(/Safari\/([\d.]+)/i);
if(ipad != null || ipod != null || iphone != null || safari){

}*/
/*var isMac = function() {
    return /macintosh|mac os x/i.test(navigator.userAgent);
}();

if(isMac){

}else{

}*/
/*alert(isMac);
alert("ipad"+ipad)
alert("iphone"+iphone)
alert("safari"+safari)*/

/*
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
alert('是否是Android：'+isAndroid);
alert('是否是iOS：'+isiOS);
*/


function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

function GetLocalPathQueryString(path,name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = path.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}






function  getPayUrl(payWay){
    var url = '';
    var browser = getBrowser();
    if(payWay == '1'){//微信支付

        if(browser == 'wxmobile'){//微信内部
            url = baseUrlPayDefault+'/wxpay/webPay';//公众号支付（微信内部）
        }else if(navigator.userAgent.indexOf("Html5Plus") > -1){//移动端
            url = baseUrlPayDefault+'/wxpay/wapPay';//微信APP支付移动端
        }else if(browser == 'mobile' || browser == 'alimobile'){//移动端
            url = baseUrlPayDefault+'/wxpay/wapPay';//微信外部支付移动端
        }else{//PC
            url = baseUrlPayDefault+'/wxpay/scanCode2';//扫码支付
        }
        return url;

    }else if(payWay == '2'){//支付宝支付

        if(navigator.userAgent.indexOf("Html5Plus") > -1){//APP移动端
            url = baseUrlPayDefault+'/alipay/wapPay';
        }else if(browser == 'alimobile' || browser == 'mobile'){//阿里pay--浏览器
            url = baseUrlPayDefault+'/alipay/wapPay';
        }else{//PC
            url = baseUrlPayDefault+'/alipay/pcPay';
        }
        return url;

    }else if(payWay == '3'){//余额支付

        return baseUrlDefault + '/sys/user/yuerzhifunotifyurl';

    }else{
        return null;
    }

}

function getYongjinMoney(num,flag){
    if(num == null || num == '' || num == 0.00){
        return '';
    }else{
        if(flag == '1'){

            return "佣金￥"+num;
        }else if(flag == '2'){

            return "佣金"+num+"个点";
        } else{
            return num+"%";
        }
    }
}

function getPriceMoney(num){
    if(num == null || num == '' || eval(num) == 0.00){
        return '';
    }else{
        return "￥"+num;
    }
}

function timeToStr(time) {
    var h = 0,
        m = 0,
        s = 0,
        _h = '00',
        _m = '00',
        _s = '00';
    h = Math.floor(time / 3600);
    time = Math.floor(time % 3600);
    m = Math.floor(time / 60);
    s = Math.floor(time % 60);
    _s = s < 10 ? '0' + s : s + '';
    _m = m < 10 ? '0' + m : m + '';
    _h = h < 10 ? '0' + h : h + '';
    if(h > 0){
        return _h + ":" + _m + "\'" + _s+"\"";
    }else{
        return _m + "\'" + _s+"\"";
    }

}



function fromDateToStr(timestamp){
    var time = new Date(timestamp)    //先将时间戳转为Date对象，然后才能使用Date的方法
    var year = time.getFullYear(),
        month = time.getMonth() + 1 ,  //月份是从0开始的
        day = time.getDate(),
        hour = time.getHours(),
        minute = time.getMinutes(),
        second = time.getSeconds()
    //add0()方法在后面定义
    return  year+'-'+this.add0(month)+'-'+ this.add0(day)+''+this.add0(hour)+':'+this.add0(minute)+':'+this.add0(second)
}
function add0(m){
    return m < 10 ? '0' + m: m
}

/*'yyyy-MM-dd HH:mm:ss'格式的字符串转日期*/
function stringToDate(str){
    var tempStrs = str.split(" ");
    var dateStrs = tempStrs[0].split("-");
    var year = parseInt(dateStrs[0], 10);
    var month = parseInt(dateStrs[1], 10) - 1;
    var day = parseInt(dateStrs[2], 10);
    var timeStrs = tempStrs[1].split(":");
    var hour = parseInt(timeStrs [0], 10);
    var minute = parseInt(timeStrs[1], 10);
    var second = parseInt(timeStrs[2], 10);
    var date = new Date(year, month, day, hour, minute, second);
    return date;
}

function fromStrToTime(strtime) {
    var dateTmp = strtime.replace(/-/g,'/')   //为了兼容IOS，需先将字符串转换为'2018/9/11 9:11:23'
    return timestamp = Date.parse(dateTmp)
}


localStorage.setItem("flk","b5");

$(function(){
    $(".weui-payselect-li").on('click',function(){
        $(this).children().addClass("weui-payselect-on");
        $(this).siblings().children().removeClass("weui-payselect-on");
        return false;
    })

});

<!--第一类支付 按次数购买 -->

//打开支付-data1展示选择第一类支付标题，data11第一类支付说明，data2-第二类支付，data22第二类支付说明
//data3是否展示第一类类支付， data4是否展示第二类支付，data5-支付备注1-2，data6-支付金额1-2 -data7第一类支付类型-data8第二类支付类型data9-第一类支付1是可以增减数量，data10-1第二类是否增减数量-data12是否是会员
//dataAboutId1 关联应用id - dataAboutId2  创建人id
function openPay(data1,data11,data2,data22,data3,data4,data51,data52,data61,data62,data7,data8,data9,data10,data12,dataAboutId1,dataAboutId2) {
    //先判断是否登录--价格根据后台传输过来---后台传输是本人否是会员
    /*if(wxxcx() == 'wxxcx' && getIsAPPLE()){
         $.toast("对不起，暂不支持购买","text");
         return false;

     }*/


    if (localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == '') {
        isLogin('', '');
    } else {
        if(data7 == '10'){
            getAddress();
        }
        $("#halfSubOrder").popup();
        $("#data1").html(data1);
        $("#data11").html(data11);
        if (eval(data61) > 0 && data3 == '1') {//展示
            $("#data14").show();  // data14 按次数购买
        } else {
            $("#data14").hide();
        }

        $("#data2").html(data2);
        $("#data22").html(data22);
        if (eval(data62) > 0 && data4 == '1') {//展示
            $("#data15").show();
        } else {
            $("#data15").hide();
        }
        $("#data51").html(data51);
        $("#data52").html(data52);
        $("#data61").html("￥"+data61);
        $("#data62").html("￥"+data62);
        if (data3 == '1' && data4 == '1') {
            $("#x11").attr("checked", "checked");
            $("#data61").show();
            $("#data51").show();
            $("#orderMoney").val(data61);//支付金额
            $("#orderType").val(data7);//支付类型
            $("#orderTitle").val($("#data51").text());//支付备注
            $("#orderAboutid").val(dataAboutId1);//支付关联ID

        } else if (data3 == '1') {
            $("#x11").attr("checked", "checked");
            $("#data61").show();
            $("#data51").show();
            $("#orderMoney").val(data61);//支付金额
            $("#orderType").val(data7);//支付类型
            $("#orderTitle").val($("#data51").text());//支付备注
            $("#orderAboutid").val(dataAboutId1);//支付关联ID



        } else if (data4 == '1') {
            //alert(data4)
            $("#x12").attr("checked", "checked");
            $("#data62").show();
            $("#data52").show();
            $("#orderMoney").val(data62);//支付金额
            $("#orderType").val(data8);//支付类型
            $("#orderTitle").val($("#data52").text());//支付备注
            $("#orderAboutid").val(dataAboutId2);//支付关联ID

        } else {
            $("#x11").attr("checked", "checked");
            $("#data61").show();
            $("#data51").show();
            $("#orderMoney").val(data61);//支付金额
            $("#orderType").val(data7);//支付类型
            $("#orderTitle").val($("#data51").text());//支付备注
            $("#orderAboutid").val(dataAboutId1);//支付关联ID


        }

        $("#x11").val(data7);//支付类型1
        $("#x12").val(data8);//支付类型2
        $("#dataAboutId1").val(dataAboutId1);//支付类型1关联ID
        $("#dataAboutId2").val(dataAboutId2);//支付类型2关联ID
        $("#data9").val(data9);//1支付量是否能增减
        $("#data10").val(data10);//2支付量是否能增减
        if (data12 == '1') {
            $("#data12").hide();
        } else {
            $("#data12").show();
        }

    }
}

function setDisPriceTitle(flag){
    if(flag == '1'){
        $("#data61").show();
        $("#data51").show();
        $("#orderMoney").val($("#data61").text().replace("￥",""));//支付金额
        $("#orderType").val($("#x11").val());//支付类型
        $("#orderTitle").val($("#data51").text());//支付备注
        $("#orderAboutid").val($("#dataAboutId1").val());//支付关联ID

        $("#data62").hide();
        $("#data52").hide();
    }else{
        $("#data61").hide();
        $("#data51").hide();

        $("#data62").show();
        $("#data52").show();
        $("#orderMoney").val($("#data62").text().replace("￥",""));//支付金额
        $("#orderType").val($("#x12").val());//支付类型
        $("#orderTitle").val($("#data52").text());//支付备注
        $("#orderAboutid").val($("#dataAboutId2").val());//支付关联ID


    }


}

function upAdd(){
    var zhifuWay = $("input[name='radiopay']:checked").val();
    var x11 = $("#x11").val();
    var x12 = $("#x11").val();
    var data9 = $("#data9").val();
    var data10 = $("#data10").val();
    if(zhifuWay == x11){//第一类
        if(data9 == '1'){
            $("#data13").html(eval($("#payNum").val())+1);
            $("#payNum").val(eval($("#payNum").val())+1);
            $("#data61").html("￥"+eval($("#orderMoney").val())*eval($("#payNum").val()));

        }else{
            $.toast("数量不允许修改", "text");
        }

    }else{//第二类
        if(data10 == '1'){
            $("#data13").html(eval($("#payNum").val())+1);
            $("#payNum").val(eval($("#payNum").val())+1);
            $("#data62").html("￥"+eval($("#orderMoney").val())*eval($("#payNum").val()));
        }else{
            $.toast("数量不允许修改", "text");
        }
    }

}
function downAdd(){
    var zhifuWay = $("input[name='radiopay']:checked").val();
    var x11 = $("#x11").val();
    var x12 = $("#x11").val();
    var data9 = $("#data9").val();
    var data10 = $("#data10").val();
    if(zhifuWay == x11){//第一类
        if(data9 == '1'){
            if(eval($("#payNum").val()) > 1){
                $("#data13").html(eval($("#payNum").val())-1);
                $("#payNum").val(eval($("#payNum").val())-1);
                $("#data61").html("￥"+eval($("#orderMoney").val())*eval($("#payNum").val()));
            }
        }else{
            $.toast("数量不允许修改", "text");
        }

    }else{//第二类
        if(data10 == '1'){
            if(eval($("#payNum").val()) > 1){
                $("#data13").html(eval($("#payNum").val())-1);
                $("#payNum").val(eval($("#payNum").val())-1);
                $("#data62").html("￥"+eval($("#orderMoney").val())*eval($("#payNum").val()));
            }
        }else{
            $.toast("数量不允许修改", "text");
        }
    }

}



//分享加价

var HTMLFENXIANG = '<div class="page-bd" style="width:100%;text-align: center;">';
HTMLFENXIANG += '<div id="sharetop" style="background-color: white;display:;width: 100%;margin-top: 100px;margin-bottom: 30px;margin-left:5%;text-align: center;width: 90%;">';

HTMLFENXIANG += '<div class="page-bd-15">';
/*HTMLFENXIANG += '<div class="weui-news-info">';


HTMLFENXIANG += '</div>';*/
HTMLFENXIANG += '</div>';
HTMLFENXIANG += '<div class="weui-cells weui-cells_form f16" id="textContent" style="margin-top: 0px; height:60px">';
HTMLFENXIANG += '<div class="weui-cell">';
HTMLFENXIANG += '<div class="weui-cell__bd">';
HTMLFENXIANG += '<textarea id="shareContent" class="weui-textarea" placeholder="分享这一刻的想法" rows="3" ></textarea>';
HTMLFENXIANG += '</div>';
HTMLFENXIANG += '</div>';
HTMLFENXIANG += '</div>';



HTMLFENXIANG += '<div><div id="tupianshareout" class="disnone" style="height: 250px;overflow: auto; -webkit-overflow-scrolling: touch;">';
HTMLFENXIANG += '<img src="" id="sharesrc" style="width:100%">';
HTMLFENXIANG += '</div></div>';



HTMLFENXIANG += '<div class="weui-pay disnone" id="jiagezengjia" >';
HTMLFENXIANG += '<ul class="weui-payselect-ul" style="margin-top:0px;">';
HTMLFENXIANG += '<li class="weui-payselect-li">';
HTMLFENXIANG += '<a href="javascript:;" id="payjiajia1" onclick=setShareMoney("0") class="weui-payselect-a WH18WH">不加价</a>';
HTMLFENXIANG += '</li>';
HTMLFENXIANG += '<li class="weui-payselect-li">';
HTMLFENXIANG += '<a href="javascript:;" id="payjiajia2" onclick=setShareMoney("5") class="weui-payselect-a WH18WH">+5元</a>';
HTMLFENXIANG += '</li>';
HTMLFENXIANG += '<li class="weui-payselect-li">';
HTMLFENXIANG += '<a href="javascript:;" id="payjiajia3" onclick=setShareMoney("10") class="weui-payselect-a WH18WH">+10元</a>';
HTMLFENXIANG += '</li>';
HTMLFENXIANG += '<li class="weui-payselect-li">';
HTMLFENXIANG += '<a href="javascript:;" id="payjiajia4" onclick=setShareMoney("15") class="weui-payselect-a WH18WH">+15元</a>';
HTMLFENXIANG += '</li>';
HTMLFENXIANG += '<li class="weui-payselect-li">';
HTMLFENXIANG += '<a href="javascript:;" id="payjiajia5" onclick=setShareMoney("30") class="weui-payselect-a WH18WH">+30元</a>';
HTMLFENXIANG += '</li>';
HTMLFENXIANG += '<li class="weui-payselect-li">';
HTMLFENXIANG += '<a href="javascript:;" id="payjiajia6" onclick=setShareMoney("50") class="weui-payselect-a WH18WH">+50元</a>';
HTMLFENXIANG += '</li>';
HTMLFENXIANG += '</ul>';
HTMLFENXIANG += '<p class="f12 f-gray" style="text-align: left;">1.autoplay:false,preload:\'none\',:保存到本地后分享图片到第三方平台</p>';

if (1==1) {
    // 走在小程序的逻辑
    HTMLFENXIANG += '<p id="dis005" class="f12 f-gray" style="text-align: left;">2.直接分享:直接将链接分享到第三方平台</p>';
}

HTMLFENXIANG += '</div>';

HTMLFENXIANG += '<div  style="background-color: white;height: 40px;margin:0 auto;width: 100%;margin-top: 10px; ">';

HTMLFENXIANG += '<div id="dis001"  style="float: left;width:50%;">';
HTMLFENXIANG += '<a id="shengchengbutton" class="weui-btn weui-btn_mini weui-btn_primary " style="border-radius: 15px;margin-top:0px; " onclick="shengchwengtupian();">生成图片</a>';
HTMLFENXIANG += '</div>';



HTMLFENXIANG += '<div  id="dis002" style="float: left;width:50%; ">';
if(navigator.userAgent.indexOf("Html5Plus") > -1) {
    HTMLFENXIANG += '<a download="shareMg.jpg" id="baocuntupian" class="weui-btn weui-btn_mini weui-btn_primary down"  style="border-radius: 15px;display: none;margin-top:0px;"   onclick="tipwxshare();">保存图片</a>';

}else{
    if(getBrowser() == 'wxmobile'){
        HTMLFENXIANG += '<a  download="shareMg.jpg" id="baocuntupian" class="weui-btn weui-btn_mini weui-btn_primary down"  style="border-radius: 15px;display: none;margin-top:0px;"   onclick="tipwxshare();">保存图片</a>';

    }else{
        if(getIsAPPLE()){
            HTMLFENXIANG += '<a  download="shareMg.jpg" id="baocuntupian" class="weui-btn weui-btn_mini weui-btn_primary down"  style="border-radius: 15px;display: none;margin-top:0px;"   onclick="tipwxshare();">保存图片</a>';
        }else{

            HTMLFENXIANG += '<a  download="shareMg.jpg" id="baocuntupian" class="weui-btn weui-btn_mini weui-btn_primary down" style="border-radius: 15px;display: none;margin-top:0px; ">保存图片</a>';

        }
    }
}

HTMLFENXIANG += '</div>';

/*HTMLFENXIANG += '<div style="float: left;width:33%; "  id="kouling"  >';
HTMLFENXIANG += '<a  class="weui-btn weui-btn_mini weui-btn_primary" style="border-radius: 15px; margin-left: 5px;margin-top:0px;" onclick=koulingtext() >复制口令</a>';
HTMLFENXIANG += '</div>';*/

HTMLFENXIANG += '<div id="dis004" style="float: left;width:50%;">';
if(getBrowser() == 'wxmobile'  ){
    HTMLFENXIANG += '<a href="javascript: share();" class="weui-btn weui-btn_mini weui-btn_primary" style="border-radius: 15px; margin-left: 5px;margin-top:0px;">直接分享</a>';

}else if(navigator.userAgent.indexOf("Html5Plus") > -1){
    HTMLFENXIANG += '<a href="javascript: h5Share();" class="weui-btn weui-btn_mini weui-btn_primary" style="border-radius: 15px; margin-left: 5px;margin-top:0px;">直接分享</a>';
}else{
    HTMLFENXIANG += '<a href="javascript: othershare();" class="weui-btn weui-btn_mini weui-btn_primary" style="border-radius: 15px; margin-left: 5px;margin-top:0px;">直接分享</a>';


}
HTMLFENXIANG += '</div>';


HTMLFENXIANG += '</div>';

HTMLFENXIANG += '</div>';
HTMLFENXIANG += '</div>';

localStorage.setItem("flk","b6");

function othershare(){
    var idTemp = $("#id").val();
    var title = $("#shareTitle").val();
    var longUrl  = window.location.protocol+"//"+window.location.host+window.location.port+window.location.pathname+"?id="+idTemp+"&share="+localStorage.getItem("userId");
    localStorage.setItem("shareDate",new Date().getTime());

    location.href = longUrl;
}
function tipwxshare() {
    $.toast("请长按图片进行保存", "text");
}

if(localStorage.getItem("shareDate") != null){//如果大于10天自动清除inUser
    if(new Date().getTime()-eval(localStorage.getItem("shareDate")) < 3000 ){
        if(getBrowser() == 'wxmobile'){
            share();
        }else{
            $.toast("点击浏览器底部菜单进行分享操作", "text");
        }
    }
}
function setShareMoney(money){//更新分享加价
    $("#shareMoney").val(money);
    updateJiajia();
}

function getShareId(){
    var share = '';
    if(localStorage.getItem("token") != null  && localStorage.getItem("token") != '' ){

        share = localStorage.getItem("userId");
    }else{
        share =  GetUrlString('share');
    }
    if(share == null || share == '' || share == 'null'){
        share = localStorage.getItem("userId");
        if(share == null || share == ''){
            share = localStorage.getItem("inUser");
            //share = '1';
            if(share == null || share == '' || share == 'null'){
                share = localStorage.getItem("s");

            }
        }

    }
    return share;
}


function getShareId2(){
    var share = '';
    if(curWwwPath.search("howmakemoney") != -1){
        share = localStorage.getItem("inUser");
    }else{
        share =  GetUrlString('share');
    }
    if(share == null || share == '' || share == 'null'){
        share =  GetUrlString('share');
    }

    if(share == null || share == '' || share == 'null'){
        share = localStorage.getItem("userId");
        if(share == null || share == ''){
            share = localStorage.getItem("inUser");
            //share = '1';
            if(share == null || share == '' || share == 'null'){
                share = localStorage.getItem("s");

            }
        }

    }
    return share;
}

function setSaasId(){
    var s = GetUrlString('s');
    if(s == null || s == ''){
        s = localStorage.getItem("s");
    }
    var curWwwPath = window.document.location.href.replace("#","");
    if(s == null || s == ''){
        if(curWwwPath.search("app") != -1){
            s = "0";//本地模式
        }
    }

    if(s == null || s == ''){
        $.toast("对不起，链接失效", "text");
        location.href='error.html?share='+getShareId()+'&s='+getSaasId();//
    }

    if(s != null && s != '' ){
        localStorage.setItem("s",s);
        var url = curWwwPath;
        if(curWwwPath.search("s=") == -1){
            if(curWwwPath.indexOf("?") != -1){
                url = curWwwPath+"&s="+s;
            }else{
                url = curWwwPath+"?s="+s;
            }
            window.location.href=url;

        }

    }


    if(s=='0'){
        $("#dis01").show();
        $("#dis02").show();
        $("#dis03").show();
        $("#dis04").show();
        $("#dis05").show();
    }else{

    }
    if(url.indexOf("/index.html") != -1){
        //window.location.href=url.replace("/index.html","/index.html")
    }
}

setSaasId();//saas模式


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

//【抽纸批发整箱家庭装30包本色纸巾餐巾纸抽卫生纸家用面巾纸实惠装】https://m.tb.cn/h.3DM04H5?sm=ee9632 点击链接，再选择浏览器咑閞；或復·制这段描述￥Qs02bvudavz￥后到👉淘♂寳♀👈[来自超级会员的分享]

function copyKouLing() {
    var idTemp = $("#id").val();
    var title = $("#shareTitle").val();
    //var content = $("#shareContent").val();
    var longUrl  = window.location.protocol+"//"+window.location.host+window.location.port+window.location.pathname+"?id="+idTemp+"&share="+localStorage.getItem("userId");
    //console.log(longUrl);
    getShortUrl(longUrl,title);



}

function koulingtext() {

    var btn = document.getElementById('kouling');
    var clipboard = new ClipboardJS(btn);
    if($("#kouling").attr("data-clipboard-text") == null || $("#kouling").attr("data-clipboard-text") == ''){
        $.toast("口令复制失败,请刷新页面重试！", "text");
    }else{
        clipboard.on('success', function(e) {
            //console.log(e);
            //$.toast("口令复制成功，可以去粘贴分享啦！",'success');
            $.toast.prototype.defaults.duration=1000;//1秒
            $.toast('口令复制成功，可以去粘贴分享啦！','text');
        });
        clipboard.on('error', function(e) {
            $.toast("复制失败","text");
        });
    }


}

function f3(datupath) {
    var dataUrl = datupath;
    var b = new plus.nativeObj.Bitmap('bitblmap');

    b.loadBase64Data(dataUrl, function () {
        /*这里一定要是_doc目录*/
        b.save("_downloads/share2.jpg", {overwrite: true}, function (object) {
            //保存到相册
            plus.gallery.save("_downloads/share2.jpg", function () {
                $.toptip('已保存到手机相册','success');
            }, function () {
                $.toast("图片保存失败");
            });
        }, function () {
            $.toast("图片保存失败");
        });
    }, function () {
        $.toast("图片保存失败");
    });
    /*//生成base64图片数据
    var dataUrl = datupath;
    // console.log(dataUrl);  这里千万不要像这样打印出来否则HBuilder会报错的  可能输出的内容太多了吧
    var b = new plus.nativeObj.Bitmap();

    b.loadBase64Data(dataUrl, function () {
        console.log("创建成功");
    }, function () {
        console.log("创建失败");
    });
    b.save('_downloads/share2.jpg', {overwrite: true}, function () {
        console.log("保存成功");
        $.toptip('已保存到手机相册','success')
    }, function () {
        console.log("保存失败");
    });*/

    /*plus.gallery.save('_downloads/share2.jpg', function () {
        console.log("保存图片到相册成功");
       $.toptip('已保存到手机相册','success')
    }, function () {
        console.log("保存图片到相册失败");
        $.toast('保存图片到相册失败', 'text');
    });*/

    /*
        // 创建下载任务
        var picurl=datupath;
        //图片保存到手机后的路径
        var picname="_downloads/erwei.png";
        var dtask = plus.downloader.createDownload(picurl, {}, function ( d, status ) {
        // 下载完成
            if ( status == 200 ) {
        //	alert( "Download success: " + d.filename );
                plus.gallery.save(picname,function() {//保存到相册方法
                    $.toast('已保存到手机相册');
                    $.toptip('已保存到手机相册','success')
                }, function() {
                    $.toast('保存失败，请重试！');
                    $.toptip('保存失败，请刷新重试！','success')
                });
            } else {
        //	alert( "Download failed: " + status ); 
            }
        });
        //dtask.addEventListener( "statechanged", onStateChanged, false );
        dtask.start();//开始下载*/


}

localStorage.setItem("flk","b7");
function shengchwengtupian() {
    //将文字赋值
    /*if($("#shareContent").val() == null || $("#shareContent").val() == ''){
        $.toast("请输入这一刻的想法！");
    }else{*/
    if($("#shareContent").val() == null || $("#shareContent").val() == ''){
        //$("#fenxiangneirong").html("早安");

    }else{
        $("#fenxiangneirong").html($("#shareContent").val());
    }

    convert2canvas("sharecontent","sharesrc","down");

    //}

    //调整高度
    $("#sharetop").css("margin-top","10px");
    //更换按钮显示
    $("#shengchengbutton").hide();
    $("#baocuntupian").show();
    /* if(navigator.userAgent.indexOf("Html5Plus") > -1) {
         var path=  $("#sharesrc").attr("src");
         //alert(0);
         $("#down").attr("href","");
         $("#down").attr("onclick","f2(\'"+path+"\')");
     }*/
    $("#tupianshareout").show();
    $("#jiagezengjia").hide();
    $("#textContent").hide();
    $("#tupianshareout").css("height",$(window).height()*0.80 +"px");


}

function shareJiajia(){
    isLogin();
    //分享加价
    window.scrollTo(0,0);
    setWeixinAudioInfo();
    if(localStorage.getItem('token') != null  && localStorage.getItem('token') != 'null'  && localStorage.getItem('token') != ''){
        //localStorage.setItem('advdate',getNowFormatDate());
        var div = document.createElement('div');
        div.id='shareJiajia';
        div.style='position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=100);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0;width: 100%; height:100%; z-index: 100;';
        div.innerHTML= HTMLFENXIANG + '<br><p style="text-align:center;line-height:20px; color:#fff;margin:-40px;padding:0px;" id="closeId" onclick=closediv("shareJiajia"); ><i class="beauty icon-anniu_guanbi" style="font-size: 32px;" ></i></p>';

        document.body.appendChild(div);
        if($("#shareJiajia").css("position") != 'fixed'){
            $("#shareJiajia").attr("style","position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;");
        }

        $("input,select,textarea").blur(function(){
            setTimeout(function() {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            }, 100);
        });

        //判断是否展示加价
        var price = $("#orderMoney").val();
        if(price != null && eval(price) > 0.01){
            /*  $("#tupianshareout").css("height","200px");
              $("#jiagezengjia").show();*/
        }else{
            $("#textContent").css("height","260px");
        }
        //copyKouLing();//执行短连接获取分享口令
        $(".weui-payselect-li").on('click',function(){
            $(this).children().addClass("weui-payselect-on");
            $(this).siblings().children().removeClass("weui-payselect-on");
            return false;
        })
        //1.获取加价记录-没有则新增
        //getJiajia();
        wx.miniProgram.getEnv(function(res) {
            if (res.miniprogram) {
                // 走在小程序的逻辑
                /* $("#dis004").hide();
                 $("#dis005").hide();
                 $("#dis001").css("width","50%");
                 $("#dis002").css("width","50%");
                 $("#kouling").css("width","50%");
                 $("#dis004").css("width","50%");*/
            }

        })
        shengchwengtupian();
        //2.修改加价记录-yichuli


        //3.加价计算-share-yichuli


        //4.详情增加点击量-yichuli
    }

}




/*
function  getshareTupian(divClass,imgId,down) {
    window.scrollTo(0,0);
    $("#"+divClass+"").show();
    var canvas2 = document.createElement("canvas");
    var _canvas = document.getElementById(""+divClass+"");
    var w = parseInt(window.getComputedStyle(_canvas).width);
    var h = document.getElementById(""+divClass+"").scrollHeight;
    var scale = 2; //定义任意放大倍数 支持小数
    canvas2.width = w * scale; //定义canvas 宽度 * 缩放
    canvas2.height = h * scale; //定义canvas高度 *缩放
    canvas2.getContext("2d").scale(scale, scale); //获取context,设置scale
    canvas2.a
    html2canvas(document.querySelector("#sharecontent"),{canvas:canvas2,y:window.pageYOffset}).then(function(canvas) {
        canvas.style.height = h+'px';
        canvas.style.width = w +'px';
        document.body.appendChild(canvas)
        //var  url = canvas.toDataURL('image/jpeg',1.0);
        var  url = Canvas2Image.convertToPNG(canvas,w,h).getAttribute('src');

        //setTimeout(function(){
        //document.body.appendChild(canvas);
        //Canvas2Image.convertToBMP()
        var img = $("#"+imgId+"");
        img.attr("src",url);
        document.querySelector("."+down+"").setAttribute('href',url );
        //},4000)

        $("#"+divClass+"").hide();

    });
}
*/

function convert2canvas(divClass,imgId,down){
    $("#mingpiantwo").remove();
    window.scrollTo(0,0);
    $("#"+divClass+"").show();
    var cntElem = $("#"+divClass+"")[0];
    var shareContent = cntElem;//需要截图的包裹的（原生的）DOM 对象
    var width = document.getElementById(""+divClass+"").offsetWidth; //获取dom 宽度

    var height  = document.getElementById(""+divClass+"").scrollHeight; //获取dom 高度

    var canvas = document.createElement("canvas"); //创建一个canvas节点
    var scale = 2; //定义任意放大倍数 支持小数
    canvas.width = width * scale; //定义canvas 宽度 * 缩放
    canvas.height = height * scale; //定义canvas高度 *缩放
    canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
    var opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, //自定义 canvas
        //logging: true, //日志开关，便于查看html2canvas的内部执行流程
        width: width, //dom 原始宽度
        height: height,
        background: "#fff",
        windowWidth:document.body.scrollWidth,
        windowHeight:document.body.scrollHeight,
        x:0,
        y:window.pageYOffset,
        useCORS: true // 【重要】开启跨域配置
    };
    //alert(2);
    //var imgNum=$('img').length;
    //$('img').load(function(){
    //alert(1);
    //if(!--imgNum){
    // 加载完成
    //$.toast("图片正在生成中",'success');
    $.toast.prototype.defaults.duration=3000;//1秒
    $.toast('图片正在生成中','text');

    setTimeout(function() {
        html2canvas(shareContent, opts).then(function (canvas) {
            canvas.background="#fff";
            var context = canvas.getContext('2d');
            // 【重要】关闭抗锯齿
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;
            // 【重要】默认转化的格式为png,也可设置为其他格式


            var img = Canvas2Image.convertToPNG(canvas, canvas.width, canvas.height);

            /* document.body.appendChild(img);
             $(img).css({
                 "width": canvas.width / 2 + "px",
                 "height": canvas.height / 2 + "px",
             }).addClass('f-full');*/

            var imgToSrc = $("#"+imgId+"");
            imgToSrc.attr("src", img.getAttribute("src"));
            document.querySelector("."+down+"").setAttribute('href',img.getAttribute("src") );
            $("#"+divClass+"").hide();
            //f2(img.getAttribute("src"));
            if(navigator.userAgent.indexOf("Html5Plus") > -1) {
                var path=  img.getAttribute("src");
                $(".down").attr("href","");
                $(".down").removeAttr("download");
                $(".down").attr("onclick","f3(\'"+path+"\')");
            }

        });
    }, 1000)
    //}
    //});


}

function convert2canvasMingPian(divClass,imgId,down,mingpianbutton){
    window.scrollTo(0,0);
    $("#"+divClass+"").show();
    var cntElem = $("#"+divClass+"")[0];
    var shareContent = cntElem;//需要截图的包裹的（原生的）DOM 对象
    var width = document.getElementById(""+divClass+"").offsetWidth; //获取dom 宽度
    var height  = document.getElementById(""+divClass+"").scrollHeight; //获取dom 高度
    var canvas = document.createElement("canvas"); //创建一个canvas节点
    var scale = 2; //定义任意放大倍数 支持小数
    canvas.width = width * scale; //定义canvas 宽度 * 缩放
    canvas.height = height * scale; //定义canvas高度 *缩放
    canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
    var opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, //自定义 canvas
        //logging: true, //日志开关，便于查看html2canvas的内部执行流程
        width: width, //dom 原始宽度
        height: height,
        windowWidth:document.body.scrollWidth,
        windowHeight:document.body.scrollHeight,
        x:0,
        y:window.pageYOffset,
        useCORS: true // 【重要】开启跨域配置
    };
    //var imgsrc = $("#src");
    //imgsrc.onload = function () {
    //alert(20);
    $.toast("名片正在生成中","text");
    //setTimeout(function() {
    html2canvas(shareContent, opts).then(function (canvas) {
        canvas.background="#fff";
        var context = canvas.getContext('2d');
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        // 【重要】默认转化的格式为png,也可设置为其他格式

        //setTimeout(function() {
        var img = Canvas2Image.convertToPNG(canvas, canvas.width, canvas.height);

        /* document.body.appendChild(img);
         $(img).css({
             "width": canvas.width / 2 + "px",
             "height": canvas.height / 2 + "px",
         }).addClass('f-full');*/

        var imgToSrc = $("#"+imgId+"");
        imgToSrc.attr("src",img.getAttribute("src"));
        document.querySelector("."+down+"").setAttribute('href',img.getAttribute("src") );
        $("#"+divClass+"").hide();
        $("#"+mingpianbutton+"").show();
        //$.toast("名片生成成功",'success');
        $.toast.prototype.defaults.duration=1000;//1秒
        $.toast('名片生成成功','text');
        f();

    });
    // }, 2000)
    //};
}
function convert2canvasMingPianTwo(divClass,imgId,down,mingpianbutton){
    window.scrollTo(0,0);
    $("#"+divClass+"").show();
    var cntElem = $("#"+divClass+"")[0];
    var shareContent = cntElem;//需要截图的包裹的（原生的）DOM 对象
    var width = document.getElementById(""+divClass+"").offsetWidth; //获取dom 宽度
    var height  = document.getElementById(""+divClass+"").scrollHeight; //获取dom 高度
    var canvas = document.createElement("canvas"); //创建一个canvas节点
    var scale = 2; //定义任意放大倍数 支持小数
    canvas.width = width * scale; //定义canvas 宽度 * 缩放
    canvas.height = height * scale; //定义canvas高度 *缩放
    canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
    var opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, //自定义 canvas
        //logging: true, //日志开关，便于查看html2canvas的内部执行流程
        width: width, //dom 原始宽度
        height: height,
        windowWidth:document.body.scrollWidth,
        windowHeight:document.body.scrollHeight,
        x:0,
        y:window.pageYOffset,
        useCORS: true // 【重要】开启跨域配置
    };
    //var imgsrc = $("#src");
    //imgsrc.onload = function () {
    //alert(20);
    //$.toast("名片正在生成中","text");
    //setTimeout(function() {
    html2canvas(shareContent, opts).then(function (canvas) {
        canvas.background="#fff";
        var context = canvas.getContext('2d');
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        // 【重要】默认转化的格式为png,也可设置为其他格式

        //setTimeout(function() {
        var img = Canvas2Image.convertToPNG(canvas, canvas.width, canvas.height);

        /* document.body.appendChild(img);
         $(img).css({
             "width": canvas.width / 2 + "px",
             "height": canvas.height / 2 + "px",
         }).addClass('f-full');*/

        var imgToSrc = $("#"+imgId+"");
        imgToSrc.attr("src",img.getAttribute("src"));
        //document.querySelector("."+down+"").setAttribute('href',img.getAttribute("src") );
        //$("#"+divClass+"").hide();
        $("#"+mingpianbutton+"").show();
        //$.toast("名片生成成功",'success');
        // $.toast.prototype.defaults.duration=1000;//1秒
        //$.toast('名片生成成功','text');
        //f();

    });
    // }, 2000)
    //};
}
//生成二维码
function qrCode(rederId,text,src){


    $("#"+rederId+"").qrcode({
        render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
        text : text,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
        width : "600",               //二维码的宽度
        height : "600",              //二维码的高度
        background : "#ffffff",       //二维码的后景色
        foreground : "#000000",        //二维码的前景色
        src: src             //二维码中间的图片
    });


}

localStorage.setItem("flk","b8");
//生成二维码
function qrCodeMingPian(rederId,text,src){
    $("#"+rederId+"").qrcode({
        render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
        text : text,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
        width : "200",               //二维码的宽度
        height : "200",              //二维码的高度
        background : "#ffffff",       //二维码的后景色
        foreground : "#000000",        //二维码的前景色
        src: src             //二维码中间的图片
    });


}

//图片转64
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.allowTaint = true;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}

function test(){
    //这是网上的一张图片链接
    var url="'+basehost+'/sfd/userfiles/452f6e387f93488e991fdba7573d6667/images/cb5bb5efc4f24d4a98cde83a179297dd124403GE3WY3yI3iZ3wjIY.jpeg";
    getBase64(url)
        .then(function(base64){
            //console.log(base64);//处理成功打印在控制台
        },function(err){
            //console.log(err);//打印异常信息
        });
}

function getBase64ImageInServeice(url,renderId){
    //这是网上的一张图片链接
    //.log(url)
    //url="'+basehost+'/sfd/userfiles/452f6e387f93488e991fdba7573d6667/images/cb5bb5efc4f24d4a98cde83a179297dd124403GE3WY3yI3iZ3wjIY.jpeg";
    getBase64(url)
        .then(function(base64){
            //console.log(base64);//处理成功打印在控制台
            $("#"+renderId+"").attr("src",base64);
        },function(err){
            //console.log(err);//打印异常信息
        });
}

//传入图片路径，返回base64
function getBase64(img){
    function getBase64Image(img,width,height) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
        var canvas = document.createElement("canvas");
        canvas.width = width ? width : img.width;
        canvas.height = height ? height : img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var dataURL = canvas.toDataURL();
        return dataURL;
    }
    var image = new Image();
    image.crossOrigin = '';
    image.src = img;
    var deferred=$.Deferred();
    if(img){
        image.onload =function (){
            deferred.resolve(getBase64Image(image));//将base64传给done上传处理
        }
        return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
    }
}

/*获取图片尺寸比例-返回不同的显示样式*/
function imghl(){
    var img_url = ''+basehost+':63342/sfd/sfd/img/agent/images/1.jpg';

    // 创建对象
    var img = new Image();

    // 改变图片的src
    img.src = img_url;
    var cl = '';
    var ratehl= img.height/img.width;
    // 加载完成执行
    /*img.onload = function(){
        // 打印

       // alert('width:'+img.width+',height:'+img.height);

    };*/
    /*if(ratehl > 1.5){
        cl = 'longweui-uploader__file';//长方形
    }else{
        cl =  'squreweui-uploader__file';//正方形
    }*/
    return ratehl;
}

/*获取图片尺寸比例-返回不同的显示样式*/
function getimghl(img_url){

    // 创建对象
    var img = new Image();

    // 改变图片的src
    img.src = img_url;
    var cl = '';
    var ratehl= img.height/img.width;
    // 加载完成执行
    /*img.onload = function(){
        // 打印

       // alert('width:'+img.width+',height:'+img.height);

    };*/
    /*if(ratehl > 1.5){
        cl = 'longweui-uploader__file';//长方形
    }else{
        cl =  'squreweui-uploader__file';//正方形
    }*/
    return ratehl;
}

//页面加载
/*
$("body").append('<div class="loading2 hide" data-text="加载中..."></div>');
$(".loading2").show();
$(function(){
    $(".loading2").hide();
    setTimeout(function() {
        $(".loading2").hide();
    }, 5000)
})


window.onload = function () {




    $(".loading2").hide();
}

*/

function disxun(id){
    var disxun = $("#"+id+"").css("display");

    if(disxun == 'none'){

        $("#"+id+"").css("display","");
    }else{

        $("#"+id+"").css("display","none");
    }

}

//插屏广告
$(function () {
    var nowPageUrl = window.location.protocol+"//"+window.location.host+window.location.port+window.location.pathname;
    setTimeout(function() {

        if(nowPageUrl.search("/index.html") != -1){//动态广场

            if(localStorage.getItem("advdate1") != null){//如果大于1天会再次请求
                if(new Date().getTime()-new Date(localStorage.getItem("advdate1")).getTime() > 86400000 ){
                    chapingadv("1","advdate1");
                }
            }else{
                chapingadv("1","advdate1");
            }
        }else if(nowPageUrl.search("/index.html") != -1){//DC

            if(localStorage.getItem("advdate11") != null){//如果大于1天会再次请求
                if(new Date().getTime()-new Date(localStorage.getItem("advdate11")).getTime() > 86400000 ){
                    chapingadv("0","advdate11");
                }
            }else{
                chapingadv("0","advdate11");
            }

        }else if(nowPageUrl.search("/bdindex.html") != -1 && $("#setbdinfo").size() == 0){//BD

            if(localStorage.getItem("advdate12") != null){//如果大于1天会再次请求
                if(new Date().getTime()-new Date(localStorage.getItem("advdate12")).getTime() > 86400000 ){
                    chapingadv("28","advdate12");
                }
            }else{
                chapingadv("28","advdate12");
            }
        }else if(nowPageUrl.search("/xueyuan.html") != -1){//学院

            if(localStorage.getItem("advdate2") != null){//如果大于1天会再次请求
                if(new Date().getTime()-new Date(localStorage.getItem("advdate2")).getTime() > 86400000 ){
                    chapingadv("2","advdate2");
                }
            }else{
                chapingadv("2","advdate2");
            }
        }else if(nowPageUrl.search("/quanzi.html") != -1){//圈子

            if(localStorage.getItem("advdate3") != null){//如果大于1天会再次请求
                if(new Date().getTime()-new Date(localStorage.getItem("advdate3")).getTime() > 86400000 ){
                    chapingadv("3","advdate3");
                }
            }else{
                chapingadv("3","advdate3");
            }
        }else if(nowPageUrl.search("/gongju.html") != -1){//应用

            if(localStorage.getItem("advdate4") != null){//如果大于1天会再次请求
                if(new Date().getTime()-new Date(localStorage.getItem("advdate4")).getTime() > 86400000 ){
                    chapingadv("4","advdate4");
                }
            }else{
                chapingadv("4","advdate4");
            }
        }else if(nowPageUrl.search("/gouwu.html") != -1){//购物

            if(localStorage.getItem("advdate5") != null){//如果大于1天会再次请求
                if(new Date().getTime()-new Date(localStorage.getItem("advdate5")).getTime() > 86400000 ){
                    chapingadv("5","advdate5");
                }
            }else{
                chapingadv("5","advdate5");
            }
        }else if(nowPageUrl.search("/wdindex.html") != -1){//问答

            if(localStorage.getItem("advdate6") != null){//如果大于1天会再次请求
                if(new Date().getTime()-new Date(localStorage.getItem("advdate6")).getTime() > 86400000 ){
                    chapingadv("6","advdate6");
                }
            }else{
                chapingadv("6","advdate6");
            }
        }else if(nowPageUrl.search("/dsp.html") != -1){//短视频

            if(localStorage.getItem("advdate7") != null){//如果大于1天会再次请求
                if(new Date().getTime()-new Date(localStorage.getItem("advdate7")).getTime() > 86400000 ){
                    chapingadv("7","advdate7");
                }
            }else{
                chapingadv("7","advdate7");
            }
        }else if(nowPageUrl.search("/fenxiao.html") != -1){//推广页面

            if(localStorage.getItem("advdate8") != null){//如果大于1天会再次请求
                if(new Date().getTime()-new Date(localStorage.getItem("advdate8")).getTime() > 86400000 ){
                    chapingadv("8","advdate8");
                }
            }else{
                chapingadv("8","advdate8");
            }
        }else if(nowPageUrl.search("/chat.html") != -1){

            if(localStorage.getItem("advdate9") != null){//如果大于1天会再次请求
                if(new Date().getTime()-new Date(localStorage.getItem("advdate9")).getTime() > 86400000 ){
                    chapingadv("9","advdate9");
                }
            }else{
                chapingadv("9","advdate9");
            }
        }
    }, 500)


})
/*

if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {

}else {
    window.location.href = basehost;
}
*/

function stopScrollLong() {

}

function recoverScrollLong() {


}

/*
$(function(){
    // 调用
    if(getBrowser() == 'wxmobile'){
        setWxVideo();
    }

});
*/



/*function setWxVideo(){
    setTimeout(function() {
        weixinPlay(function() {
            var audios = document.getElementsByTagName("video");
            // 暂停函数
            pauseAll();
            function pauseAll() {
                var self = this;
                [].forEach.call(audios, function (i) {
                    // 将audios中其他的audio全部暂停
                    //i !== self && i.pause();
                    //console.log("===="+i.id)
                    if(i.id == null || i.id == ''){
                        i.id='videowx';
                        i.play();
                        i.oncanplaythrough=i.pause();
                        i.pause();
                        //i.attr("preload","load");//preload="load"
                    }

                })
            }

        })
    }, 1000)
}

function weixinPlay(fn) {
    if (!getBrowser() == 'wxmobile') {    // 非微信中直接执行，支不支持就交给浏览器本身了
        fn();
    } else {
        if (window.WeixinJSBridge) {
            WeixinJSBridge.invoke("getNetworkType", {}, fn);   // 这句话是在微信中可以自动播放的核心
        } else {
            document.addEventListener("WeixinJSBridgeReady",function () {
                WeixinJSBridge.invoke("getNetworkType", {}, fn);
            });
        }
    }
}*/
localStorage.setItem("flk","b10");
$(function(){
    $("#comment").scroll(

        function() {
            //console.log(1);
            var scrollTop = $(this).scrollTop();
            var scrollHeight = document.getElementById("comment").scrollHeight;
            var windowHeight = $(this).height();
            //console.log(scrollTop)
            //console.log(scrollHeight)
            //console.log(windowHeight)
            if (scrollTop + windowHeight == scrollHeight) {
                if(
                    ($("#dis").size() > 0 &&  $("#dis").css("display") != 'none')
                    || ($("#advtips").size() > 0 && $("#advtips").css("display") != 'none')
                    || ($("#paytips").size() > 0 &&  $("#paytips").css("display") != 'none')
                    || ($("#dashang").size() > 0 &&  $("#dashang").css("display") != 'none')
                    || ($("#hongbaotips").size() > 0 &&  $("#hongbaotips").css("display") != 'none')
                    || ($("#shareJiajia").size() > 0 &&  $("#shareJiajia").css("display") != 'none')
                    || ($("#logintips").size() > 0 &&  $("#logintips").css("display") != 'none')
                    || ($("#setbdinfo").size() > 0 &&  $("#setbdinfo").css("display") != 'none')
                    || ($("#setbdnextinfo").size() > 0 &&  $("#setbdnextinfo").css("display") != 'none')
                    || ($("#halfComment").size() > 0 &&  $("#halfComment").css("display") != 'none')
                    || ($("#halfapply").size() > 0 &&  $("#halfapply").css("display") != 'none')
                    || ($("#halfSubOrder").size() > 0 &&  $("#halfSubOrder").css("display") != 'none')

                ){

                }else {
                    var moreManyType = $("#moreManyType").val();
                    var moreCommentType = $("#moreCommentType").val();
                    var moreZuoZheType = $("#moreZuoZheType").val();
                    $.toast.prototype.defaults.duration=1000;$.toast("数据加载中",'text');
                    listcomment("commentDisList", "1", "0", 5, moreManyType, moreCommentType, moreZuoZheType);
                }
            }
        });
});

if(getIsAPPLE() ){
    //var scrollTopJianPan  = 0;
    //document.body.addEventListener('focusin', () => {  //软键盘弹起事件
    //console.log("键盘弹起")
    //scrollTopJianPan = $(document).scrollTop();
    //console.log("scrollTop键盘弹起1" + scrollTopJianPan)
    //$("#buttonSavecomment").hide();
    //})
    //document.body.addEventListener('focusout', () => { //软键盘关闭事件
    //console.log("键盘收起")
    //$("#buttonSavecomment").show();
    //console.log("scrollTop键盘弹起2" + scrollTopJianPan )

    //})
}else{
    //var originalHeight=document.documentElement.clientHeight ||document.body.clientHeight;
    //window.onresize=function(){
    //键盘弹起与隐藏都会引起窗口的高度发生变化
    //var resizeHeight=document.documentElement.clientHeight || document.body.clientHeight;
    //if(resizeHeight-0<originalHeight-0){
    //当软键盘弹起，在此处操作
    //console.log("键盘弹起2")
    //$("#buttonSavecomment").hide();
    //}else{
    //当软键盘收起，在此处操作
    //console.log("键盘收起2")
    //$("#buttonSavecomment").show();
    //}
    //}
}

//点击效果博客页面点击就可以看到
/* !function(e, t, a) {
     function n() {
         c(".heart{width: 40px;height: 40px;position: fixed;color: red;}"), o(), r()
     }

     function r() {
         for(var e = 0; e < d.length; e++) d[e].alpha <= 0 ? (t.body.removeChild(d[e].el), d.splice(e, 1)) : (d[e].y--, d[e].scale += .004, d[e].alpha -= .013, d[e].el.style.cssText = "left:" + d[e].x + "px;top:" + d[e].y + "px;opacity:" + d[e].alpha + ";transform:scale(" + d[e].scale + "," + d[e].scale + ") rotate(0deg);color:" + d[e].color + ";z-index:99999");
         requestAnimationFrame(r)
     }

     function o() {
         var t = "function" == typeof e.onclick && e.onclick;
         e.onclick = function(e) {
             t && t(), i(e)
         }
     }

     function i(e) {
         var a = t.createElement("div");
         var arr = ["❤️","😂","😍","🔥","😊","🤔","🥰","👍","👙","🙏","👌","💋"];
         var i = Math.floor(Math.random()*12);

         a.innerHTML = arr[i];
         a.className = "heart", d.push({
             el: a,
             x: e.clientX - 5,
             y: e.clientY - 5,
             scale: 1,
             alpha: 1,
             color: s()
         }), t.body.appendChild(a)
     }

     function c(e) {
         var a = t.createElement("style");
         a.type = "text/css";
         try {
             a.appendChild(t.createTextNode(e))
         } catch(t) {
             a.styleSheet.cssText = e
         }
         t.getElementsByTagName("head")[0].appendChild(a)
     }

     function s() {
         return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
     }
     var d = [];
     e.requestAnimationFrame = function() {
         return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(e) {
             setTimeout(e, 1e3 / 60)
         }
     }(), n()
 }(window, document);*/



/*URL编码解码*/
function urlencode(str){str=(str+"").toString();return encodeURIComponent(str).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")};
function urldecode(str){return decodeURIComponent((str+"").replace(/%(?![\da-f]{2})/gi,function(){return"%25"}).replace(/\+/g,"%20"))};


function checkNum(e) {
    var re = /^\d+(?=\.{0,1}\d+$|$)/
    if (e.value != "") {
        if (!re.test(e.value)) {

            $.toast("请输入正确的数字", "text");
            e.value = "";
            e.focus();
        }
    }
}

localStorage.setItem("flk","b11");

/*友盟统计*/
var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1276853982'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s5.cnzz.com/z_stat.php%3Fid%3D1276853982%26show%3Dpic1' type='text/javascript'%3E%3C/script%3E"));
$("#cnzz_stat_icon_1276853982").hide();



if($("#nolafresh").size() == '0'){


//下拉刷新
    $(function(){
        var xialashuaxin = '';
        xialashuaxin += '<div class="weui-pull-to-refresh__layer disnone" id="xialashuaxin">';
        xialashuaxin += '<div class="weui-pull-to-refresh__arrow"></div>';
        xialashuaxin += '<div class="weui-pull-to-refresh__preloader"></div>';
        xialashuaxin += '<div class="down">下拉刷新</div>';
        xialashuaxin += '<div class="up">释放刷新</div>';
        xialashuaxin += '<div class="refresh">正在刷新</div>';
        xialashuaxin += '</div>';
        if($(".weui-gallery").size() == 0){
            xialashuaxin += '<div class="weui-gallery" style="display: none">';
            xialashuaxin += '<span class="weui-gallery__img"></span>';
            xialashuaxin += '<div class="weui-gallery__opr">';
            xialashuaxin += '</div>';
            xialashuaxin += '</div>';
        }


        $("body").prepend(xialashuaxin);

        $('#xialashuaxin').show();
        $(document.body).pullToRefresh({
            distance: 30,
            onRefresh:function() {
                if(
                    ($("#dis").size() > 0 &&  $("#dis").css("display") != 'none')
                    || ($("#advtips").size() > 0 && $("#advtips").css("display") != 'none')
                    || ($("#paytips").size() > 0 &&  $("#paytips").css("display") != 'none')
                    || ($("#dashang").size() > 0 &&  $("#dashang").css("display") != 'none')
                    || ($("#hongbaotips").size() > 0 &&  $("#hongbaotips").css("display") != 'none')
                    || ($("#shareJiajia").size() > 0 &&  $("#shareJiajia").css("display") != 'none')
                    || ($("#logintips").size() > 0 &&  $("#logintips").css("display") != 'none')
                    || ($("#setbdinfo").size() > 0 &&  $("#setbdinfo").css("display") != 'none')
                    || ($("#setbdnextinfo").size() > 0 &&  $("#setbdnextinfo").css("display") != 'none')
                    || ($("#halfComment").size() > 0 &&  $("#halfComment").css("display") != 'none')
                    || ($("#halfCommentList").size() > 0 &&  $("#halfCommentList").css("display") != 'none')
                    || ($("#halfapply").size() > 0 &&  $("#halfapply").css("display") != 'none')
                    || ($(".weui-gallery").size() > 0 &&  $(".weui-gallery").css("display") != 'none')
                    || ($("#halfSubOrder").size() > 0 &&  $("#halfSubOrder").css("display") != 'none')

                ){
                    $('#xialashuaxin').hide();
                    $(document.body).pullToRefreshDone();
                }else{
                    refresh();
                    $(document.body).pullToRefreshDone();
                }


            }});


    });

}


function urlFenxi(content){
    if(content == '' || content == null){
        return "";
    }else{
        var str = content;
        /*var re=/(http:\/\/)?([A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*)/g;
        str=str.replace(re,function(a,b,c){return '<a href="http://'+c+'">'+a+'</a>';});*/

        var textR = str;
        var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        textR = textR.replace(reg, "<a href='$1$2'>$1$2</a>");
        //console.log(textR);
        return textR;
    }



}

function filterHTMLTag(msg) {
    var msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
    msg = msg.replace(/[|]*\n/, '') //去除行尾空格
    msg = msg.replace(/&npsp;/ig, ''); //去掉npsp
    return msg;
}


var ua = window.navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i) == 'micromessenger'){    //判断是否是微信环境

    //微信环境
    wx.miniProgram.getEnv(function(res) {
        if (res.miniprogram) {
            // 小程序环境下逻辑
            var strdaohang = '<div style="width: 30px;height:30px;position: fixed;bottom: 65px;right: 10px;font-size: 26px !important;color: #02bb00">🔙</div>';
            var huanjign = localStorage.getItem('huanjing');
            if(huanjign == 'wxxiaochengxu' &&  $("#nodaohang").size() <= 0 ){
                $("body").append(strdaohang);
            }
        }else {

            //非小程序环境下逻辑


        }
    })
}else{
    //非微信环境逻辑

    /*var strdaohang = '<div style="width: 100%;height: 40px;position: fixed;top: 0px;left: 0px;right: 0px;background-color: white;z-index: 999;border-bottom: 1px solid #efefef;" ><span style="margin-left: 20px;line-height: 40px;" onclick=javascript:history.back(-1);><i class="beauty icon-jiantou_liebiaoxiangzuo f-gray indexicon f16">返回</i></span></div><div style="width: 100%;height:40px;"></div>';
    //var huanjign = localStorage.getItem('huanjing');
    //if(huanjign == 'wxxiaochengxu' &&  $("#nodaohang").size() <= 0 ){

        $("body").prepend(strdaohang);

    //}*/

}


function getIsXcx(){
    wx.miniProgram.getEnv(function(res) {
        if (!res.miniprogram) {
            // 走在小程序的逻辑
            return true;
        }else{
            return false;
        }

    })
}
$(function(){
    setTimeout(function() {
        wx.miniProgram.getEnv(function(res) {
            if (res.miniprogram) {
                // 走在小程序的逻辑
                fIndex();
            }
        })
    }, 500)
});

function fIndex() {

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
    console.log("shareContent========"+shareContent);
    console.log("shareImage========"+shareImage);
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

    var shareLink = locationurl;
    shareImage = checkPathHost(shareImage,'1');
    var shareDesc = setNULL(localStorage.getItem("saas"))+'尊享超级会员超一万个，C端累积潜在客户群体近百万人。';
    wx.miniProgram.postMessage({ data:{title:''+shareContent+'',shareImage:''+shareImage+'',locationurl:''+encodeURI(locationurl)+''} });

}


$("textarea").blur(function(){
    document.body.scrollTop=document.body.scrollHeight-1;
});
$("input").blur(function(){
    document.body.scrollTop=document.body.scrollHeight-1;
});
localStorage.setItem("flk","b12");