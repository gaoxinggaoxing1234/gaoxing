var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost";//本地模式
}


var beginX = 0, // 起始位置
    beginY = 0,
    endX = 0,   // 结束位置
    endY = 0;

/*


function wetherScroll(){
    var startX = startY = endX =endY =0;
    var body=document.getElementsByTagName(“body”);
    body.bind(‘touchstart’,function(event){
        var touch = event.targetTouches[0];
//滑动起点的坐标
        startX = touch.pageX;
        startY = touch.pageY;
// console.log(“startX:”+startX+","+“startY:”+startY);
    });
    body.bind(“touchmove”,function(event){
        var touch = event.targetTouches[0];
//手势滑动时，手势坐标不断变化，取最后一点的坐标为最终的终点坐标
        endX = touch.pageX;
        endY = touch.pageY;
// console.log(“endX:”+endX+","+“endY:”+endY);
    })
    body.bind(“touchend”,function(event){
        var distanceX=endX-startX,
            distanceY=endY - startY;
// console.log(“distanceX:”+distanceX+","+“distanceY:”+distanceY);
//移动端设备的屏幕宽度
        var clientHeight; =document.documentElement.clientHeight;
// console.log(clientHeight;0.2);
//判断是否滑动了，而不是屏幕上单击了
        if(startY!=Math.abs(distanceY)){
//在滑动的距离超过屏幕高度的20%时，做某种操作
            if(Math.abs(distanceY)>clientHeight0.2){
//向下滑实行函数someAction1，向上滑实行函数someAction2
                distanceY <0 ? someAction1():someAction2();
            }
        }
        startX = startY = endX =endY =0;
    })
}

*/


localStorage.setItem("touchstart","1");
function handleTouchEvent(event) {

    //只跟踪一次触摸
    if (localStorage.getItem("touchstart") == '1') {
        localStorage.setItem("touchstart","0");
        //tochMove = 700000;
        //var output = document.getElementById("output");
        switch (event.type) {
            case "touchstart":
                beginX = event.touches[0].clientX;
                beginY = event.touches[0].clientY;
                //output.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
                break;
            case "touchend":
                endX = event.changedTouches[0].clientX;
                endY = event.changedTouches[0].clientY;
                //output.innerHTML += "Touch ended (" + event.changedTouches[0].clientX + "," + event.changeTouches[0].clientY + ")";
                break;
            case "touchmove":
                event.preventDefault(); //阻止滚动
                endX = event.changedTouches[0].clientX;
                endY = event.changedTouches[0].clientY;
                //output.innerHTML += "Touch moved (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";
                break;
        }


    }

    setInterval(function () {

        beginX = 0; // 起始位置
        beginY = 0;
        endX = 0;   // 结束位置
        endY = 0;
        //localStorage.setItem("touchstart","1");
    }, 1000);
}
document.addEventListener("touchstart", handleTouchEvent, false);
document.addEventListener("touchend", handleTouchEvent, false);
document.addEventListener("touchmove", handleTouchEvent, false);


$('body').on('touchstart',function(event) {

    //beginX = event.targetTouches[0].clientX;
    //beginY = event.targetTouches[0].clientY;
    //e.preventDefault();
    //beginX = e.touches[0].clientX;
    //beginY = e.touches[0].clientY;
    //beginX = event.touches[0].pageX;
    //beginY = event.touches[0].pageY;
    /*var e = event || window.event;
    beginX = e.targetTouches[0].clientX;
    beginY = e.targetTouches[0].clientY;*/
    //console.log("====="+beginX);
    //console.log("====="+beginY);
    //console.log("====="+endX);
    //console.log("1====="+eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY))));
    //$.toast("1====="+eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY))), "text");
});
$('body').on('touchmove',function(event) {

    //endX = event.touches[0].pageX;
    //endY = event.touches[0].pageY;
    /*var e = event || window.event;
    endX = e.targetTouches[0].clientX;
    endY = e.targetTouches[0].clientY;*/
    //e.preventDefault();
    //endX = e.changedTouches[0].clientX;
    //endY = e.changedTouches[0].clientY;
    //endX = event.touches[0].pageX;
    //endY = event.touches[0].pageY;
    //console.log("====="+beginX);
    //console.log("====="+beginY);
    //console.log("====="+endX);
    //console.log("====="+endY);
    //console.log("2====="+eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY))));

});

$('body').on('touchend',function(event) {

    //endX = event.touches[0].pageX;
    //endY = event.touches[0].pageY;
    /*var e = event || window.event;
    endX = e.targetTouches[0].clientX;
    endY = e.targetTouches[0].clientY;*/
    //e.preventDefault();
    //endX = e.changedTouches[0].clientX;
    //endY = e.changedTouches[0].clientY;
    //endX = event.touches[0].pageX;
    //endY = event.touches[0].pageY;
    //console.log("====="+beginX);
    //console.log("====="+beginY);
    //console.log("====="+endX);
    //console.log("====="+endY);
    //console.log("3====="+eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY))));

});

/**
 *
 * 跳转路径--绝对路径--每个模块一个单独的路径参数
 */
//基本路径
var baseXueYuanPath = ''+basehost+'/app/html/agent/';//学院-广场
var baseQuanZinPath = ''+basehost+'/app/html/agent/';//圈子
var baseYingYongPath = ''+basehost+'/app/html/agent/';//应用
var baseGouWuPath = ''+basehost+'/app/html/agent/';//购物
var baseWenDaPath = ''+basehost+'/app/html/agent/';//问答
var baseDuanShiPinnPath = ''+basehost+'/app/html/agent/';//短视频
var baseZhuanQianPath = ''+basehost+'/app/html/agent/';//赚钱
var baseShiFenLiaoPath = ''+basehost+'/app/html/agent/';//聊
var baseDaiChaoPath = ''+basehost+'/app/html/agent/';//D超
var baseBdPath = ''+basehost+'/app/html/agent/';//BD

//去学院首页
function toXuayuan() {

    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseXueYuanPath + 'xueyuan.html?share='+getShareId()+'&s='+getSaasId();//
}
//去应用首页
function toYingyong() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseYingYongPath + 'gongju.html?share='+getShareId()+'&s='+getSaasId();//
}

//去问答首页
function toWenda() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseWenDaPath + 'wdindex.html?share='+getShareId()+'&s='+getSaasId();//
}

//去购物首页
function toGouwu() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseGouWuPath + 'gouwu.html?share='+getShareId()+'&s='+getSaasId();//
}

//去活动首页
function toHuodong() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    toActivityList('xianxiahuodong','6','1','')
}

//去广场首页
function toGuangchang() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    localStorage.setItem('tab','agenttab1');
    window.location.href=baseXueYuanPath + 'index.html?share='+getShareId()+'&s='+getSaasId();//
}

//去XX聊首页
function toShifenliao() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    localStorage.setItem('tab','agenttab1');
    window.location.href=baseShiFenLiaoPath + 'chat.html?share='+getShareId()+'&s='+getSaasId();//
}

//去短视频首页
function toDuanshiping() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseDuanShiPinnPath + 'dsp.html?share='+getShareId()+'&s='+getSaasId();//
}




//去动态分类
function toDongtaiTopic(topic,name) {
    localStorage.setItem("videoname",name);
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }

    window.location.href=baseDaiChaoPath + 'dongtaivideo.html?topic='+topic+'&share='+getShareId()+'&s='+getSaasId();//


}


//去推广中心
function toTuiGuang() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }

    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');

    }else{
        window.location.href=baseDaiChaoPath + 'fenxiaozhongxin.html?share='+getShareId()+'&s='+getSaasId();//
    }



}


function toSalarySort(){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(curWwwPath.search("gaoxinggaoxing") == -1){

        window.location.href=baseZhuanQianPath + 'salarysort.html?share='+getShareId()+'&s='+getSaasId();//本地
    }else{
        window.location.href=baseZhuanQianPath + 'salarysort.html?share='+getShareId()+'&s='+getSaasId();//
    }

}

function toHezuo(){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        if (curWwwPath.search("gaoxinggaoxing") == -1) {

            window.location.href = baseZhuanQianPath + 'shangwuhezuo.html?share=' + getShareId() + '&s=' + getSaasId();//本地
        } else {
            window.location.href = baseZhuanQianPath + 'shangwuhezuo.html?share=' + getShareId() + '&s=' + getSaasId();//
        }
    }

}


//去BD首页
function toBdDating() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    localStorage.setItem('tab','agenttab1');
    window.location.href=baseBdPath + 'bdindex.html?share='+getShareId()+'&s='+getSaasId();//
}

//去赚钱首页
function toZhuanqian() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseZhuanQianPath + 'fenxiao.html?share='+getShareId()+'&s='+getSaasId();//
}

//朋友圈首页
function toPengyouquan() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseXueYuanPath + 'friendscircle.html?share='+getShareId()+'&s='+getSaasId();//
}

//去借钱首页
function toJieqian() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    localStorage.setItem('tab','agenttab1');
    window.location.href=baseDaiChaoPath + 'index.html?share='+getShareId()+'&s='+getSaasId();//
}

//去下载APP
function toapp() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(navigator.userAgent.indexOf("Html5Plus") > -1) {

        $.toast("您已经下载过APP了！", "text");

    }else{
        window.location.href = 'http://www.gaoxinggaoxing.com/download/' + getSaasId() + '/app.html';
    }
}


//去推广课程
function toTgCourse() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href = 'http://www.gaoxinggaoxing.com/app/html/agent/productdetail.html?id=0db70e5233994f04bd5eb96b6796ac01&s=201908281418';
}
//去推广工具
function toTgTool() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    $('.weui-tab').tab({
        defaultIndex: 2,
        activeClass: 'weui-bar__item_on'
    });
    tab('c');
    $("#touchtabc1").css("color","#FF6666");
    $("#touchtabc2").css("color","#FF6666");
}
//去推广提额神器
function toTgTe() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href = 'http://www.gaoxinggaoxing.com/app/html/agent/productdetail.html?id=e12ebd97b69b45699442e271f8b7745d&s=201908281418';
}


//去发布课程
function tofabukecheng() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        if (localStorage.getItem("vip") != 'vip'  && localStorage.getItem("vipfabu") == '1') {
            $.confirm("对不起，您暂无发布权限！", "<span style='color: red;font-weight: bolder;'>去领取?</span>", function () {
                toUserLevelDetail(localStorage.getItem("isonevip"));
            }, function () {
                //取消操作
                return false;
            });

        } else {
            if (eval(Math.sqrt((beginX - endX) * (beginX - endX) + (beginY - endY) * (beginY - endY))) > 7) {
                return false;
            }
            window.location.href = baseXueYuanPath + 'myxueyuantianjia.html?share=' + getShareId() + '&s=' + getSaasId();//
        }
    }
}

//查看使用记录
function toolRecord () {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseXueYuanPath + 'record.html?share='+getShareId()+'&s='+getSaasId();//
}


function tofabuhudong() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        if (localStorage.getItem("vip") != 'vip'  && localStorage.getItem("vipfabu") == '1') {
            $.confirm("对不起，您暂无发布权限！", "<span style='color: red;font-weight: bolder;'>去领取?</span>", function () {
                toUserLevelDetail(localStorage.getItem("isonevip"));
            }, function () {
                //取消操作
                return false;
            });

        } else {
            if (eval(Math.sqrt((beginX - endX) * (beginX - endX) + (beginY - endY) * (beginY - endY))) > 7) {
                return false;
            }
            window.location.href = baseXueYuanPath + 'myhuodongtianjia.html?share=' + getShareId() + '&s=' + getSaasId();//
        }
    }
}
//去发布产品
function tofabuchanpin() {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        if (localStorage.getItem("vip") != 'vip'  && localStorage.getItem("vipfabu") == '1') {
            $.confirm("对不起，您暂无发布权限！", "<span style='color: red;font-weight: bolder;'>去领取?</span>", function () {
                toUserLevelDetail(localStorage.getItem("isonevip"));
            }, function () {
                //取消操作
                return false;
            });

        } else {
            if (eval(Math.sqrt((beginX - endX) * (beginX - endX) + (beginY - endY) * (beginY - endY))) > 7) {
                return false;
            }
            window.location.href = baseXueYuanPath + 'fabuchanpin.html?share=' + getShareId() + '&s=' + getSaasId();//
        }
    }
}

//去粉丝列表
function toFansList(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseXueYuanPath + 'fensi.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.html?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseXueYuanPath + 'fensi.html'+data+'?share='+getShareId()+'&s='+getSaasId();//
    }
}


//去关注列表

function toGuanzhuList(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseXueYuanPath + 'guanzhu.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.html?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseXueYuanPath + 'guanzhu.html'+data+'?share='+getShareId()+'&s='+getSaasId();//
    }
}

//去个人主页
function toUserHome(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseXueYuanPath + 'mypage.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.html?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseXueYuanPath + 'mypage.html'+data+'&share='+getShareId()+'&s='+getSaasId();//
    }
}

//去个人资料
function toUserProfile(obj){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }

    if(obj == '1'){
        if(isLogin2("","")) {
            window.location.href=baseXueYuanPath + 'updateheadimage.html';//头像修改
        }
    }else if(obj == '2'){
        if(isLogin2("","")) {
            window.location.href=baseXueYuanPath + 'updatenickname.html';//昵称修改
        }

    }else if(obj == '3'){
        if(isLogin2("","")) {
            window.location.href=baseXueYuanPath + 'updaterealname.html';//实名认证
        }

    }else if(obj == '4'){
        if(isLogin2("","")) {
            window.location.href=baseXueYuanPath + 'updatecompany.html';//企业认证
        }

    }else if(obj == '5'){

        if(isLogin2("","")) {
            window.location.href=baseXueYuanPath + 'updatedav.html';//知识大V认证
        }


    }else if(obj == '6'){

        if(isLogin2("","")) {
            window.location.href=baseXueYuanPath + 'mydingdan.html';//消费订单
        }



    }else if(obj == '7'){

        if(isLogin2("","")) {
            window.location.href=baseXueYuanPath + 'mydingdan.html';//项目发布
        }

    }else if(obj == '8'){
        window.location.href=baseXueYuanPath + 'mydingdan.html';//老师认证
    }else if(obj == '9'){
        window.location.href=baseXueYuanPath + 'guanyuwomen.html';//关于我们
    }else if(obj == '10'){
        window.location.href=baseXueYuanPath + 'shangwuhezuo.html';//商务合作
    }

}



function toUserHomeByCookie(){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    var data = localStorage.getItem("userId");
    if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
        window.location.href=baseXueYuanPath + 'mypage.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
    }else{
        window.location.href=baseXueYuanPath + 'error.html?share='+getShareId()+'&s='+getSaasId();//
    }
}


//去代理首页
function toIndex(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseXueYuanPath + 'index.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.html?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseXueYuanPath + 'index.html'+data+'&share='+getShareId()+'&s='+getSaasId();//
    }
}

function toSuccess(url) {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseXueYuanPath + 'success.html?share='+getShareId()+'&s='+getSaasId();//
}
function toFail(url) {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseXueYuanPath + 'fail.html?share='+getShareId()+'&s='+getSaasId();//
}



//媒体模块
function toMediaDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseXueYuanPath + 'media.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.html?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseXueYuanPath + 'media.html'+data+'?share='+getShareId()+'&s='+getSaasId();//
    }
}



//媒体模块
function toMediaDetailNew(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseXueYuanPath + 'mediadetailnew.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.html?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseXueYuanPath + 'mediadetailnew.html'+data+'?share='+getShareId()+'&s='+getSaasId();//
    }
}

//new卡详情页
function  toMyKadetail(data,flag){
    //isLogin("","");
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseXueYuanPath + 'myKadetail.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.html?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseXueYuanPath + 'myKadetail.html'+data+'?share='+getShareId()+'&s='+getSaasId();//
    }


}

//new贷款详情页
function toMyDaikuandetail(data,flag){
    //isLogin("","");
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseXueYuanPath + 'myDaikuandetail.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.html?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseXueYuanPath + 'myDaikuandetail.html'+data+'?share='+getShareId()+'&s='+getSaasId();//
    }


}

//new更多详情页
function toMyProductdetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseXueYuanPath + 'myProductdetail.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.html?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseXueYuanPath + 'myProductdetail.html'+data+'?share='+getShareId()+'&s='+getSaasId();//
    }


}


/*
学院模块
*/


function toBianjiCourse(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseXueYuanPath + 'myxueyuantianjia.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.html?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseXueYuanPath + 'myxueyuantianjia.html'+data+'?share='+getShareId()+'&s='+getSaasId();//
    }
}
//课程详情
function toCourseDetail(data,flag){
    //alert(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY))));
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }

    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseXueYuanPath + 'article.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.html?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseXueYuanPath + 'article.html'+data+"&share="+getShareId()+'&s='+getSaasId();//
    }

}
function toListDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseXueYuanPath + 'list.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.html?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseXueYuanPath + 'article.html'+data+'?share='+getShareId()+'&s='+getSaasId();//
    }
}
//课程列表
function toCourseList(renderId,classType,listType,topicType){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseXueYuanPath + "articlelist.html?renderId="+renderId+"&classType="+classType+"&listType="+listType+"&topicType="+topicType+'&share='+getShareId()+'&s='+getSaasId();//
}
//活动列表
function toActivityList(renderId,classType,listType,topicType){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseXueYuanPath + "articlelist.html?renderId="+renderId+"&classType="+classType+"&listType="+listType+"&topicType="+topicType+'&share='+getShareId()+'&s='+getSaasId();//
}
//课程列表
function toListList(renderId,classType,listType,topicType){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseXueYuanPath + "articlelist.html?renderId="+renderId+"&classType="+classType+"&listType="+listType+"&topicType="+topicType+'&share='+getShareId()+'&s='+getSaasId();//
}
//名人讲堂
function toUserList(renderId,classType,listType,topicType){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseXueYuanPath + "articlelist.html?renderId="+renderId+"&classType="+classType+"&listType="+listType+"&topicType="+topicType+'&share='+getShareId()+'&s='+getSaasId();//
}
/*
//圈子模块
*/
function toQuanZiDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseQuanZinPath + 'circleinfocustomer.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseQuanZinPath + 'circleinfocustomer.html'+data+'&share='+getShareId()+'&s='+getSaasId();//
    }
}

function toTopicDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseQuanZinPath + 'circletopicinfo.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseQuanZinPath + 'circletopicinfo.html'+data+'&share='+getShareId()+'&s='+getSaasId();//
    }
}

/*
//应用模块
*/
function toToolDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }

    //$.toast("即将开放", "text");
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseYingYongPath + 'gongjudetail.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseYingYongPath + 'gongjudetail.html'+data+'&share='+getShareId()+'&s='+getSaasId();//
    }
}
//应用列表
function toToolList(renderId,classType,listType,topicType){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseYingYongPath + "toollist.html?renderId="+renderId+"&classType="+classType+"&listType="+listType+"&topicType="+topicType+'&share='+getShareId()+'&s='+getSaasId();//
}

/*
//赚钱模块
*/
//去如何赚钱-会员购买页面
function toFenxiaoList(renderId,classType,listType,topicType){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseZhuanQianPath + "fenxiaolist.html?renderId="+renderId+"&classType="+classType+"&listType="+listType+"&topicType="+topicType+'&share='+getShareId()+'&s='+getSaasId();//
}

//卡列表
function toDcKaList(renderId,classType,listType,topicType){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseZhuanQianPath + "dckalist.html?renderId="+renderId+"&classType="+classType+"&listType="+listType+"&topicType="+topicType+'&share='+getShareId()+'&s='+getSaasId();//
}
//贷列表
function toDcDaikuanList(renderId,classType,listType,topicType){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseZhuanQianPath + "dcdaikuanlist.html?renderId="+renderId+"&classType="+classType+"&listType="+listType+"&topicType="+topicType+'&share='+getShareId()+'&s='+getSaasId();//
}

function toRuHeZhuanQianDetail(){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(curWwwPath.search("gaoxinggaoxing") == -1){

        window.location.href=baseZhuanQianPath + 'howmakemoney.html?id='+getSaasId()+'&share='+getShareId()+'&s='+getSaasId();//
    }else{
        window.location.href=baseZhuanQianPath + 'howmakemoney.html?id='+getSaasId()+'&share='+getShareId()+'&s='+getSaasId();//
    }

}

function toHuiYuanDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {
        return false;
    }

    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            if(localStorage.getItem("isdisdisanfangpay") == '1'){
                window.location.href=baseZhuanQianPath + 'howmakemoneyone.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
            }else{
                window.location.href=baseZhuanQianPath + 'howmakemoney.html?id='+data+'&share='+getShareId()+'&s='+getSaasId();//
            }


        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        if(localStorage.getItem("isdisdisanfangpay") == '1'){
            window.location.href=baseZhuanQianPath + 'howmakemoneyone.html'+data+'&share='+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseZhuanQianPath + 'howmakemoney.html'+data+'&share='+getShareId()+'&s='+getSaasId();//
        }

    }
}
function toHuiYuanBuy(){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseZhuanQianPath + 'howmakemoney.html?share='+getShareId()+'&s='+getSaasId();//
}

function toKaDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseZhuanQianPath + 'creditcardcustomer.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseZhuanQianPath + 'creditcardcustomer.html'+data+"&share="+getShareId()+'&s='+getSaasId();//
    }
}
function toBaoxianDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseZhuanQianPath + 'baoxiancustomer.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseZhuanQianPath + 'baoxiancustomer.html'+data+"&share="+getShareId()+'&s='+getSaasId();//
    }
}
function toDaikuanDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseZhuanQianPath + 'daikuancustomer.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseZhuanQianPath + 'daikuancustomer.html'+data+"&share="+getShareId()+'&s='+getSaasId();//
    }
}
function toJiJinDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseZhuanQianPath + 'jijincustomer.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseZhuanQianPath + 'jijincustomer.html'+data+"&share="+getShareId()+'&s='+getSaasId();//
    }
}


function toAgentKaDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseZhuanQianPath + 'myKadetail.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseZhuanQianPath + 'myKadetail.html'+data+"&share="+getShareId()+'&s='+getSaasId();//
    }
}
function toAgentBaoxianDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseZhuanQianPath + 'baoxiandetail.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseZhuanQianPath + 'baoxiandetail.html'+data+"&share="+getShareId()+'&s='+getSaasId();//
    }
}
function toAgentDaikuanDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseZhuanQianPath + 'myDaikuandetail.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseZhuanQianPath + 'myDaikuandetail.html'+data+"&share="+getShareId()+'&s='+getSaasId();//
    }
}
function toAgentDaikuanLLyDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseZhuanQianPath + 'daikuandetaillly.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseZhuanQianPath + 'daikuandetaillly.html'+data+"&share="+getShareId()+'&s='+getSaasId();//
    }
}
function toAgentKaLLyDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseZhuanQianPath + 'kadetaillly.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseZhuanQianPath + 'kadetaillly.html'+data+"&share="+getShareId()+'&s='+getSaasId();//
    }
}
function toAgentJiJinDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseZhuanQianPath + 'jijindetail.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseZhuanQianPath + 'jijindetail.html'+data+"&share="+getShareId()+'&s='+getSaasId();//
    }
}

function toActivityDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseZhuanQianPath + 'activitydetail.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseZhuanQianPath + 'activitydetail.html'+data+"&share="+getShareId()+'&s='+getSaasId();//
    }
}

/*
//购物模块
*/
function toProductDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseGouWuPath + 'productdetail.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseGouWuPath + 'productdetail.html'+data+"&share="+getShareId()+'&s='+getSaasId();//
    }
}

//购物列表
function toProductList(renderId,classType,listType,topicType){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseGouWuPath + "gouwulist.html?renderId="+renderId+"&classType="+classType+"&listType="+listType+"&topicType="+topicType+"&share="+getShareId()+'&s='+getSaasId();//
}

//拉新列表
function toLaxinList(title,cj,xl){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    localStorage.setItem("lxtitle",title);
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseGouWuPath + "laxinlist.html?cj="+cj+"&xl="+xl+"&share="+getShareId()+'&s='+getSaasId();//
}

/*
//问答模块
*/
function toQuestionDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseWenDaPath + 'questiondetail.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseWenDaPath + 'questiondetail.html'+data+"&share="+getShareId()+'&s='+getSaasId();//
    }
}
function toAnswerDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseXueYuanPath + 'answerdetail.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseXueYuanPath + 'answerdetail.html'+data+"&share="+getShareId()+'&s='+getSaasId();//
    }
}
/*
//短视频模块
*/
function toDuanshipingDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseDuanShiPinnPath + 'dspdetail.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseDuanShiPinnPath + 'dspdetail.html'+data+"&share="+getShareId()+'&s='+getSaasId();//
    }
}
/*
//XX聊模块
*
*
* */
function toShifenliaoDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        if (flag == '1') {
            if (GetLocalPathQueryString("?id=" + data, "id") != null && GetLocalPathQueryString("?id=" + data, "id") != '') {
                window.location.href = baseShiFenLiaoPath + 'chatdetail.html?id=' + data + "&share=" + getShareId() + '&s=' + getSaasId();//
            } else {
                window.location.href = baseXueYuanPath + 'error.htm?share=' + getShareId() + '&s=' + getSaasId();//
            }
        } else {
            window.location.href = baseShiFenLiaoPath + 'chatdetail.html' + data + "&share=" + getShareId() + '&s=' + getSaasId();//
        }
    }
}

function toqunchengyuanList(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        if (flag == '1') {
            if (GetLocalPathQueryString("?id=" + data, "id") != null && GetLocalPathQueryString("?id=" + data, "id") != '') {
                window.location.href = baseShiFenLiaoPath + 'qunchengyuan.html?id=' + data + "&share=" + getShareId() + '&s=' + getSaasId();//
            } else {
                window.location.href = baseXueYuanPath + 'error.htm?share=' + getShareId() + '&s=' + getSaasId();//
            }
        } else {
            window.location.href = baseShiFenLiaoPath + 'qunchengyuan.html' + data + "&share=" + getShareId() + '&s=' + getSaasId();//
        }
    }
}

function toHaoyouList(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        if (flag == '1') {
            if (GetLocalPathQueryString("?id=" + data, "id") != null && GetLocalPathQueryString("?id=" + data, "id") != '') {
                window.location.href = baseShiFenLiaoPath + 'haoyou.html?id=' + data + "&share=" + getShareId() + '&s=' + getSaasId();//
            } else {
                window.location.href = baseXueYuanPath + 'error.htm?share=' + getShareId() + '&s=' + getSaasId();//
            }
        } else {
            window.location.href = baseShiFenLiaoPath + 'haoyou.html' + data + "&share=" + getShareId() + '&s=' + getSaasId();//
        }
    }
}

function toAddQun(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        if (flag == '1') {
            if (GetLocalPathQueryString("?id=" + data, "id") != null && GetLocalPathQueryString("?id=" + data, "id") != '') {
                window.location.href = baseShiFenLiaoPath + 'newqun.html?id=' + data + "&share=" + getShareId() + '&s=' + getSaasId();//
            } else {
                window.location.href = baseXueYuanPath + 'error.htm?share=' + getShareId() + '&s=' + getSaasId();//
            }
        } else {
            window.location.href = baseShiFenLiaoPath + 'newqun.html';
        }
    }
}

function toAddHaoyou(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        if (flag == '1') {
            if (GetLocalPathQueryString("?id=" + data, "id") != null && GetLocalPathQueryString("?id=" + data, "id") != '') {
                window.location.href = baseShiFenLiaoPath + 'newhaoyou.html?id=' + data + "&share=" + getShareId() + '&s=' + getSaasId();//
            } else {
                window.location.href = baseXueYuanPath + 'error.htm?share=' + getShareId() + '&s=' + getSaasId();//
            }
        } else {
            window.location.href = baseShiFenLiaoPath + 'newhaoyou.html';
        }
    }
}


//红包详情
function toHongBaoDetail(data,flag){

    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        if (flag == '1') {
            if (GetLocalPathQueryString("?id=" + data, "id") != null && GetLocalPathQueryString("?id=" + data, "id") != '') {
                window.location.href = baseShiFenLiaoPath + 'hongbaoxiangqing.html?id=' + data + "&share=" + getShareId() + '&s=' + getSaasId();//
            } else {
                window.location.href = baseXueYuanPath + 'error.htm?share=' + getShareId() + '&s=' + getSaasId();//
            }
        } else {
            window.location.href = baseShiFenLiaoPath + 'hongbaoxiangqing.html' + data + "&share=" + getShareId() + '&s=' + getSaasId();//
        }
    }
}
//动态详情
function toDongtaiDetail(data,flag){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(flag=='1'){
        if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
            window.location.href=baseXueYuanPath + 'dongtaidetail.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
        }else{
            window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
        }
    }else{
        window.location.href=baseXueYuanPath + 'friendscircledetail.html'+data+"&share="+getShareId()+'&s='+getSaasId();//
    }
}


//去BD用户列表
function toBdList(renderId,bdType,bdHangye){
    isLogin("","");
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseBdPath + "bdlist.html?renderId="+renderId+"&bdType="+bdType+"&bdHangye="+bdHangye+"&share="+getShareId()+'&s='+getSaasId();//
}

//去资金列表
function toZiJinList(){

    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        window.location.href = baseBdPath + "lingqianjilu.html?share=" + getShareId() + '&s=' + getSaasId();//
    }
}
function toZiJinOtherList(id){

    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        window.location.href = baseBdPath + "lingqianjiluother.html?id=" + id + "&share=" + getShareId() + '&s=' + getSaasId();//
    }
}

function toUserLevelDetail(userType) {
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }

    toHuiyuanByTypeNew(userType);

}
//去名片详情
function toMingpian(){

    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")){
        window.location.href=baseBdPath + "updatemingpian.html?s="+getSaasId();
    }

}
//去地址列表

function toAddressList(data,flag){

    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        if (flag == '1') {
            if (GetLocalPathQueryString("?id=" + data, "id") != null && GetLocalPathQueryString("?id=" + data, "id") != '') {
                window.location.href = baseXueYuanPath + 'dizhi.html?id=' + data + "&share=" + getShareId() + '&s=' + getSaasId();//
            } else {
                window.location.href = baseXueYuanPath + 'error.htm?share=' + getShareId() + '&s=' + getSaasId();//
            }
        } else {
            window.location.href = baseXueYuanPath + 'dizhi.html?share=' + getShareId() + '&s=' + getSaasId()+data;//
        }
    }
}

//去地址详情

function toAddressDetail(data,flag){

    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        if(flag=='1'){
            if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
                window.location.href=baseXueYuanPath + 'dizhitianjia.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
            }else{
                window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
            }
        }else{
            window.location.href=baseXueYuanPath + 'dizhitianjia.html?share='+getShareId()+'&s='+getSaasId()+data;//
        }
    }

}

function toAddressListgw(data,flag){

    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        if (flag == '1') {
            if (GetLocalPathQueryString("?id=" + data, "id") != null && GetLocalPathQueryString("?id=" + data, "id") != '') {
                window.location.href = baseXueYuanPath + 'dizhi.html?id=' + data + "&share=" + getShareId() + '&s=' + getSaasId();//
            } else {
                window.location.href = baseXueYuanPath + 'error.htm?share=' + getShareId() + '&s=' + getSaasId();//
            }
        } else {
            window.location.href = baseXueYuanPath + 'dizhi.html'+data+'&share=' + getShareId() + '&s=' + getSaasId();//
        }
    }
}

//去地址详情

function toAddressDetailgw(data,flag){

    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        if(flag=='1'){
            if(GetLocalPathQueryString("?id="+data,"id") != null  && GetLocalPathQueryString("?id="+data,"id") != ''){
                window.location.href=baseXueYuanPath + 'dizhitianjia.html?id='+data+"&share="+getShareId()+'&s='+getSaasId();//
            }else{
                window.location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
            }
        }else{
            window.location.href=baseXueYuanPath + 'dizhitianjia.html'+data+'&share='+getShareId()+'&s='+getSaasId();//
        }
    }

}

//朋友聊天
function topengyou(){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")){
        window.location.href=baseBdPath + "chat.html?s="+getSaasId();
    }

}

//朋友聊天
function toshoppingcar(){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")){
        window.location.href=baseBdPath + "shoppingcar.html?s="+getSaasId();
    }

}


//项目列表
function toxiangmu(){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href=baseBdPath + "xiangmulist.html?s="+getSaasId();
}


//项目详情
function toxiangmudetail(){

    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        window.location.href = baseBdPath + "myprojecttianjia.html?s=" + getSaasId();
    }
}

//充值详情
function tochogzhidetail(){

    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        window.location.href = baseBdPath + "chongzhi.html?s=" + getSaasId();
    }
}

//取文章列表
function towenzhanglist(renderId,classType,listType,topicType){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href = baseBdPath + "articlelist.html?renderId="+renderId+"&classType="+classType+"&listType="+listType+"&topicType="+topicType+"&s=" + getSaasId();
}

function tosucailist(){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href = baseBdPath + "dongtaisucai.html?s=" + getSaasId();
}
function tohtml(html){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href = baseBdPath + ""+html+"?s=" + getSaasId();
}

function to0yuangou(html){

    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }

    $.confirm("去赚钱！可购物，可提现！", "<span style='color: red;font-weight: bolder;'>日入千元,轻松0元购</span>", function () {
        window.location.href = baseBdPath + ""+html+"?s=" + getSaasId();
    }, function () {
        //取消操作
        return false;
    });

}

function tohtmlLogin(html){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        window.location.href = baseBdPath + "" + html + "?s=" + getSaasId();
    }
}

function tohtmlall(html){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    window.location.href = baseBdPath + html;
}

function tohtmlallLogin(html){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        window.location.href = baseBdPath + html;
    }
}

$(function(){
    if($("#caininxihuan").size() > 0){

        if(navigator.userAgent.indexOf("Html5Plus") > -1){//处理返回按钮和返回首页
         $("#fanhui").hide();
            //plus.navigator.setFullscreen(true);
        }else{
         //$("#fanhui").show();
            //plus.navigator.setFullscreen(false);
        }


        /*猜您喜欢*/
        var strcaininxihuan = '';

        strcaininxihuan += '<div style="width: 100%;text-align: center;">';

        if(navigator.userAgent.indexOf("Html5Plus") > -1){
           /* strcaininxihuan += '<section class="_wxbEditor disnone"  onclick=toindex(); >';
            strcaininxihuan += '<section style="text-align: center;">';
            strcaininxihuan += '<section style="text-align: center;color:#a08344;font-size:16px;">';
            strcaininxihuan += '首页';
            strcaininxihuan += '</section>';
            strcaininxihuan += '<section style="background:#a08344;width:5em;height:1px;margin: 0px auto;"></section>';
            strcaininxihuan += '<section style="display: inline-block;width:2em;margin-top:3px;">';
            strcaininxihuan += '<img src="../../img/agent/images/index2.png" style="width: 100%;display: block;" data-type="png" data-ratio="0.6666666666666666"/>';
            strcaininxihuan += '</section>';
            strcaininxihuan += '</section>';
            strcaininxihuan += '</section>';*/
        }else{
            /*strcaininxihuan += '<section class="_wxbEditor"  onclick=todownload(); >';
            strcaininxihuan += '<section style="text-align: center;">';
            strcaininxihuan += '<section style="text-align: center;color:#a08344;font-size:16px;">';
            strcaininxihuan += '去下载XX网APP';
            strcaininxihuan += '</section>';
            strcaininxihuan += '<section style="background:#a08344;width:5em;height:1px;margin: 0px auto;"></section>';
            strcaininxihuan += '<section style="display: inline-block;width:2em;margin-top:3px;">';
            strcaininxihuan += '<img src="../../img/agent/images/index2.png" style="width: 100%;display: block;" data-type="png" data-ratio="0.6666666666666666"/>';
            strcaininxihuan += '</section>';
            strcaininxihuan += '</section>';
            strcaininxihuan += '</section>';*/

            /*strcaininxihuan += '<section class="_wxbEditor "  onclick=toindex(); >';
            strcaininxihuan += '<section style="text-align: center;">';
            strcaininxihuan += '<section style="text-align: center;color:#a08344;font-size:16px;">';
            strcaininxihuan += '首页';
            strcaininxihuan += '</section>';
            strcaininxihuan += '<section style="background:#a08344;width:5em;height:1px;margin: 0px auto;"></section>';
            strcaininxihuan += '<section style="display: inline-block;width:2em;margin-top:3px;">';
            strcaininxihuan += '<img src="../../img/agent/images/index2.png" style="width: 100%;display: block;" data-type="png" data-ratio="0.6666666666666666"/>';
            strcaininxihuan += '</section>';
            strcaininxihuan += '</section>';
            strcaininxihuan += '</section>';*/
        }







        /*strcaininxihuan += '<div style="width:100%;text-align: center;">';
        strcaininxihuan += '<div style="width:95%;margin-left: 2.5%;">';
        strcaininxihuan += '<section class="_wxbEditor">';
        strcaininxihuan += '<section style="margin:20px auto;">';
        strcaininxihuan += '<section style="border:4px solid #ccae84;padding: 0.2em;box-sizing: border-box;background: url(../../img/agent/images/index1.jpeg)repeat;background-size:100%;">';
        strcaininxihuan += '<section style="background: url(../../img/agent/images/index3.png)no-repeat;background-size:1.5em;background-position:left top ;">';
        strcaininxihuan += '<section style="background:url(../../img/agent/images/index4.png)no-repeat;background-size:1.5em;background-position:right top ;">';
        strcaininxihuan += '<section style="background: url(../../img/agent/images/index5.png)no-repeat;background-size:1.5em;background-position:left bottom ;">';
        strcaininxihuan += '<section style="background: url(../../img/agent/images/index6.png)no-repeat;background-size:1.5em;background-position:right bottom ;">';
        strcaininxihuan += '<section style=" font-size: 14px;text-align: justify;letter-spacing: 1.5px;line-height: 1.75em;color:#333;padding: 1.5em;">';

        if(getSaasId() == '0'){
            strcaininxihuan += '<p>';
            strcaininxihuan += '<span style="background-color: initial;">&nbsp;&nbsp;'+setNULL(localStorage.getItem("saas"))+'，斜杠青年创业工场！<br>&nbsp;&nbsp;为生活，实现精准流量变现！<br>&nbsp;&nbsp;为事业，技术创新行业领先！</span>';
            strcaininxihuan += '</p>';
            strcaininxihuan += '<p>';
            strcaininxihuan += '【产品】为您对接丰富产品优质价格<br>【招商】为您创业提供完善渠道服务<br>【技术】为您打造功能全面分销系统';
            strcaininxihuan += '</p>';
        }else if(getSaasId() == '201912012111'){
            strcaininxihuan += '<p>';
            strcaininxihuan += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;启呗创立于2019年，致力于为各种商户及草根创业者提供撬动财富的桥梁，做都市里顶级的财富志愿平台。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;启呗主要提供大数据工具、知识分享、电商购物、活动发布、即时聊天、短视频、BD合作、及产品推广等服务。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;启呗与多家大数据公司合作，为客户提供多维度、全覆盖的精细化引流服务。';
            strcaininxihuan += '</p>';

        }else{
            strcaininxihuan += '<p>';
            strcaininxihuan += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="background-color: initial;">'+setNULL(localStorage.getItem("saas"))+'创立于2018年，以“让金融走向大众”为理念，致力于为普通用户提供普世性的金融领域服务。</span>';
            strcaininxihuan += '</p>';
            strcaininxihuan += '<p>';
            strcaininxihuan += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; '+setNULL(localStorage.getItem("saas"))+'主要提供新闻资讯、行业社群、知识问答、应用工具及产品推广等服务。B端年费会员超一万个，C端累积潜在客户群体近百万人。';
            strcaininxihuan += '</p>';
        }


        strcaininxihuan += '</section>';
        strcaininxihuan += '</section>';
        strcaininxihuan += '</section>';
        strcaininxihuan += '</section>';
        strcaininxihuan += '</section>';
        strcaininxihuan += '</section>';
        strcaininxihuan += '</section>';
        strcaininxihuan += '</section>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '</div>';*/








        strcaininxihuan += '<div class="page-bd-15 disnone ">';
        strcaininxihuan += '<div class="weui-news-info">';
        strcaininxihuan += '<div class="weui-news-infoitem">猜你喜欢</div>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<div class="weui-grids grids-small disnone" style="text-align: center;">';


        strcaininxihuan += '<a class="grid grid2" onclick=toindex(); >';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += ' <i class="beauty icon-cunkuan f-red indexicon"></i>';
        strcaininxihuan += ' </div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += '去赚钱';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';


        strcaininxihuan += '<a class="grid grid2" onclick=toXuayuan(); >';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += '<i class="beauty icon-shu f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += '学院';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';

        strcaininxihuan += '<a class="grid grid2" onclick=toYingyong(); >';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += '<i class="beauty icon-yingyongAPP f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += '应用';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';


        strcaininxihuan += '<a class="grid grid2" onclick=toWenda(); >';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += '<i class="beauty icon-shengyin f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += '问答';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';





        strcaininxihuan += '<a class="grid grid2" onclick=toHuodong();>';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += '<i class="beauty icon-rili f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += '活动';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';



        strcaininxihuan += '<a class="grid grid2" onclick=toGuangchang(); >';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += '<i class="beauty icon-ditu_diqiu f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += '广场';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';

        strcaininxihuan += '<a href="javascript:toShifenliao();" class="grid grid2">';
        strcaininxihuan += '<div class="weui-grid__icon" id="xuanzhuan5">';
        strcaininxihuan += ' <i class="beauty icon-xiaoxi f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += ' XX聊';
        strcaininxihuan += ' </p>';
        strcaininxihuan += '</a>';




        strcaininxihuan += '<a class="grid grid2" onclick=toDuanshiping(); >';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += '<i class="beauty icon-shipin f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += '短视频';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';


        strcaininxihuan += '<a class="grid grid2" onclick=toGouwu();>';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += '<i class="beauty icon-gouwu f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += '购物';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';

        strcaininxihuan += '<a class="grid grid2" onclick=toBdDating();>';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += '<i class="beauty icon-CPhezuo f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += 'BD大厅';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';



        /* strcaininxihuan += '<a onclick=toJieqian(); class="grid grid2">';
         strcaininxihuan += '<div class="weui-grid__icon">';
         strcaininxihuan += '<i class="beauty icon-jiekuan f-red indexicon"></i>';
         strcaininxihuan += '</div>';
         strcaininxihuan += '<p class="weui-grid__label">';
         strcaininxihuan += '低息借';
         strcaininxihuan += '</p>';
         strcaininxihuan += '</a>';*/

        strcaininxihuan += '</div>';
        strcaininxihuan += '<div style="height: 80px;">';
        strcaininxihuan += '</div>';




        $("#caininxihuan").html(strcaininxihuan);
    }else{
        /*猜您喜欢*/
        /*var strcaininxihuan = '';
        strcaininxihuan += '<div class="page-bd-15 disnone">';
        strcaininxihuan += '<div class="weui-news-info">';
        strcaininxihuan += '<div class="weui-news-infoitem">猜你喜欢</div>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<div class="weui-grids grids-small disnone" style="text-align: center;">';


        strcaininxihuan += '<a onclick=toZhuanqian(); class="grid grid2">';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += ' <i class="beauty icon-cunkuan f-red indexicon"></i>';
        strcaininxihuan += ' </div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += '去赚钱';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';


        strcaininxihuan += '<a onclick=toXuayuan(); class="grid grid2">';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += '<i class="beauty icon-shu f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += '学院';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';

        strcaininxihuan += '<a onclick=toYingyong(); class="grid grid2">';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += '<i class="beauty icon-yingyongAPP f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += '应用';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';


        strcaininxihuan += '<a onclick=toWenda(); class="grid grid2">';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += '<i class="beauty icon-shengyin f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += '问答';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';





        strcaininxihuan += '<a onclick=toHuodong(); class="grid grid2">';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += '<i class="beauty icon-rili f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += '活动';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';



        strcaininxihuan += '<a onclick=toGuangchang(); class="grid grid2">';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += '<i class="beauty icon-ditu_diqiu f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += '广场';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';

        strcaininxihuan += '<a href="javascript:toShifenliao();" class="grid grid2">';
        strcaininxihuan += '<div class="weui-grid__icon" id="xuanzhuan5">';
        strcaininxihuan += ' <i class="beauty icon-xiaoxi f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += ' XX聊';
        strcaininxihuan += ' </p>';
        strcaininxihuan += '</a>';




        strcaininxihuan += '<a onclick=toDuanshiping(); class="grid grid2">';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += '<i class="beauty icon-shipin f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += '短视频';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';


        strcaininxihuan += '<a onclick=toGouwu(); class="grid grid2">';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += '<i class="beauty icon-gouwu f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += '购物';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';

        strcaininxihuan += '<a onclick=toBdDating(); class="grid grid2">';
        strcaininxihuan += '<div class="weui-grid__icon">';
        strcaininxihuan += '<i class="beauty icon-CPhezuo f-red indexicon"></i>';
        strcaininxihuan += '</div>';
        strcaininxihuan += '<p class="weui-grid__label">';
        strcaininxihuan += 'BD大厅';
        strcaininxihuan += '</p>';
        strcaininxihuan += '</a>';



        /!* strcaininxihuan += '<a onclick=toJieqian(); class="grid grid2">';
         strcaininxihuan += '<div class="weui-grid__icon">';
         strcaininxihuan += '<i class="beauty icon-jiekuan f-red indexicon"></i>';
         strcaininxihuan += '</div>';
         strcaininxihuan += '<p class="weui-grid__label">';
         strcaininxihuan += '低息借';
         strcaininxihuan += '</p>';
         strcaininxihuan += '</a>';*!/

        strcaininxihuan += '</div>';
        strcaininxihuan += '<div style="height: 80px;">';
        strcaininxihuan += '</div>';
        $("#caininxihuan").html(strcaininxihuan);*/
    }

    $("textarea").blur(function(){
        document.body.scrollTop=document.body.scrollHeight-1;
    });
    $("input").blur(function(){
        document.body.scrollTop=document.body.scrollHeight-1;
    });


});


function initOnclick() {
    //alert(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY))));
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {
        return false;
    }
}

