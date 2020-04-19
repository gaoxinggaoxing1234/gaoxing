

$(document).ready(function(){

    //详情页渲染
    if($("#myButtonDetailDaikuan").size()>0){
        xuDetailcourse("11"); //贷款详情页
    }else   if($("#myButtonDetailKa").size()>0){
        xuDetailcourse("10"); //卡详情页
    }else   if($("#myButtonDetailProduct").size()>0){
        xuDetailcourse("6"); //更多详情页
    }



})


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



//获取详情数据
function xuDetailcourse(linkType){
    //参数
    var id = GetUrlString('id');
    if(id == null || id == ''){
        sourcecourse.cancel();
        location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
    }
    //传输数据
    var datacourse = {
        "linkAboutid":id,
        "inUser":getShareId(),
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "linkType":linkType
    }

    instancecourse({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/dongtai/dongTai/commondetail',
        data: datacourse,
        cancelToken: sourcecourse.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){

            if(linkType=="11"){
                xuDetailDaikuanRender(rs.data);
            }else if(linkType=="10"){
                xuDetailKaRender(rs.data);
            }else if(linkType=="6"){
                xuDetailProductRender(rs.data);
            }


            /* if(linkType == '2'){//课程详情
                 detailcourseRender(rs.data);
             }else if(linkType == '19'){//会员详情
                 detailhuiyuanRender(rs.data);
             }else if(linkType == '5'){//应用详情
                 detailToolRender(rs.data);
             }else if(linkType == '10'){//卡详情
                 detailKaRender(rs.data);
             }else if(linkType == '11'){//贷款详情
                 detailDaikuanRender(rs.data);
             }else if(linkType == '12'){//保险详情
                 detailBaoxianRender(rs.data);
             }else if(linkType == '13'){//基金详情
                 detailJijinRender(rs.data);
             }else if(linkType == '6'){//产品详情
                 detailProductRender(rs.data);
             }else if(linkType == '7'){//问题详情
                 detailQuestionRender(rs.data);
             }else if(linkType == '8'){//答案详情
                 detailAnswerRender(rs.data);
             }else if(linkType == '14'){//活动详情
                 detailActivityRender(rs.data);
             }else if(linkType == '16'){//dongtai详情
                 detailDongtaiRender(rs.data);
             }
             */


        }else{
            console.log('请求异常！')
        }

    });

}

//贷款详情页渲染  xuaolun 2019.09.11
function xuDetailDaikuanRender(data){
    if(data.code == '0'){
        viptips();
        //判断是否登入
        var token = localStorage.getItem("token");

        var islogin=false;
        if(token!=null && token!=""){
            islogin=true;

        }


        $("title").html(data.result.daiKuan.daikuanTitle);
        var xuDetailcourseStr9 = '';
        xuDetailcourseStr9 += '<input type="hidden" id="id" value="'+data.result.daiKuan.id+'">';
        if(islogin){
            xuDetailcourseStr9+='<div class="head-pic">';
            xuDetailcourseStr9+=' <div class="half-up"> ';
            xuDetailcourseStr9+='   <div>';
            if(data.result.daiKuan.daikuanTitle.search("云闪付") == -1 ){
                xuDetailcourseStr9+='  <span>成功贷款返佣</span>';
            }else{
                xuDetailcourseStr9+='  <span>返佣</span>';
            }

            xuDetailcourseStr9+='  <h3>' + getYongjinMoney(setNum(data.result.daiKuan.vipshareAgent),data.result.daiKuan.sharePricetype) + '</h3>';
            xuDetailcourseStr9+='  </div>';
            xuDetailcourseStr9+=' <div>';
            xuDetailcourseStr9+='   <span>结算周期</span>';
            xuDetailcourseStr9+='    <h3>'+data.result.daiKuan.daikuanJiesuan+'</h3>     ';
            xuDetailcourseStr9+='   </div>';
            xuDetailcourseStr9+='   </div>';
            xuDetailcourseStr9+='   <div class="half-down">';
            xuDetailcourseStr9+='   <div>';
            if(data.result.daiKuan.daikuanTitle.search("云闪付") == -1 ){
                xuDetailcourseStr9+='  <span>贷款金额</span>';
            }else{
                xuDetailcourseStr9+='  <span>功能</span>';
            }

            /*+data.result.daiKuan.daikuanEdu+*/
            xuDetailcourseStr9+='  <p>'+data.result.daiKuan.daikuanEdu+'</p>';
            xuDetailcourseStr9+='    </div>';
         /*   xuDetailcourseStr9+='    <span class="division1">|</span>';
            xuDetailcourseStr9+='    <div>';
            xuDetailcourseStr9+='    <span>放款时间</span>';
            xuDetailcourseStr9+='    <p>'+data.result.daiKuan.fangkuanShijain+'</p>';
            xuDetailcourseStr9+=' </div>';
            xuDetailcourseStr9+=' <span class="division2">|</span>';*/
            xuDetailcourseStr9+='  <div>';
            if(data.result.daiKuan.daikuanTitle.search("云闪付") == -1 ){
                xuDetailcourseStr9+='   <span>利率</span>';
            }else{
                xuDetailcourseStr9+='   <span>特点</span>';
            }

            xuDetailcourseStr9+='   <p>'+ data.result.daiKuan.daikuanLilv+'</p>';
            xuDetailcourseStr9+='   </div>';
            xuDetailcourseStr9+='   </div>';
            xuDetailcourseStr9+='   </div>';

            if(data.result.daiKuan.daikuanTitle.search("云闪付") == -1 ){
                xuDetailcourseStr9+='    <div class="route-box">';
                xuDetailcourseStr9+='    <div class="route-item">';
                xuDetailcourseStr9+='    <ul class="first-item">';
                xuDetailcourseStr9+='    <li>';
                xuDetailcourseStr9+='    <div class="img-box"><img src="../../img/b01-icon.png" alt=""></div>';
                xuDetailcourseStr9+='    <span>立即推广<br/>保存海报</span>';
                xuDetailcourseStr9+=' <div class="dot-box">···</div>';
                xuDetailcourseStr9+=' </li>';
                xuDetailcourseStr9+='  <li>';
                xuDetailcourseStr9+='  <div class="img-box"><img src="../../img/b02-icon.png" alt=""></div>';
                xuDetailcourseStr9+='     <span>客户扫码<br/>';
                xuDetailcourseStr9+='     注册并申请</span>';
                xuDetailcourseStr9+='    <div class="dot-box">···</div>';
                xuDetailcourseStr9+='   </li>';
                xuDetailcourseStr9+='   <li>';
                xuDetailcourseStr9+='  <div class="img-box"><img src="../../img/b03-icon.png" alt=""></div>';
                xuDetailcourseStr9+='      <span>申请成功<br/>贷款到账</span>';
                xuDetailcourseStr9+='    <div class="dot-box">··· &nbsp;</div>';
                xuDetailcourseStr9+='   </li>';
                xuDetailcourseStr9+='    <li>';
                xuDetailcourseStr9+='    <div class="img-box"><img src="../../img/b04-icon.png" alt=""></div>';
                xuDetailcourseStr9+='      <span>等待结算日';
                xuDetailcourseStr9+='    结算佣金</span>';
                xuDetailcourseStr9+='     </li>';
                xuDetailcourseStr9+='     </ul>';
                xuDetailcourseStr9+='     </div>';
            }else{
                xuDetailcourseStr9+='         <div class="route-box">';
                xuDetailcourseStr9+='        '+data.result.daiKuan.daikuanContent+'';
                xuDetailcourseStr9+='        </div>';
            }





        }else {
            xuDetailcourseStr9+='  <div class="head-pic">';
            if(data.result.daiKuan.daikuanTitle.search("云闪付") == -1 ){
                xuDetailcourseStr9+='         <p>最高可借金额(元)</p>';
                xuDetailcourseStr9+='        <h3>'+data.result.daiKuan.daikuanEdu+'</h3>';
                xuDetailcourseStr9+='        <span>'+data.result.daiKuan.fangkuanShijain+'放款 | '+data.result.daiKuan.daikuanLilv+'</span>';
            }else{
                xuDetailcourseStr9+='         <p>云闪付</p>';
                xuDetailcourseStr9+='        <h3>'+data.result.daiKuan.daikuanEdu+'</h3>';
                xuDetailcourseStr9+='        <span>'+data.result.daiKuan.daikuanLilv+'</span>';
            }


            xuDetailcourseStr9+='    </div>';


            if(data.result.daiKuan.daikuanTitle.search("云闪付") == -1 ){
                xuDetailcourseStr9+='    <div class="route-box">';
                xuDetailcourseStr9+='    <div class="route-item">';
                xuDetailcourseStr9+='    <ul class="first-item">';
                xuDetailcourseStr9+='    <li>';
                xuDetailcourseStr9+='    <div class="img-box"><img src="../../img/01-icon.png" alt=""></div>';
                xuDetailcourseStr9+='    <span>申请人信息</span>';
                xuDetailcourseStr9+=' <div class="dot-box">···</div>';
                xuDetailcourseStr9+=' </li>';
                xuDetailcourseStr9+='  <li>';
                xuDetailcourseStr9+='  <div class="img-box"><img src="../../img/02-icon.png" alt=""></div>';
                xuDetailcourseStr9+='     <span>实名认证 </span>';
                xuDetailcourseStr9+='    <div class="dot-box">···</div>';
                xuDetailcourseStr9+='   </li>';
                xuDetailcourseStr9+='   <li>';
                xuDetailcourseStr9+='  <div class="img-box"><img src="../../img/03-icon.png" alt=""></div>';
                xuDetailcourseStr9+='      <span>提交资料 </span>';
                xuDetailcourseStr9+='    <div class="dot-box">··· &nbsp;</div>';
                xuDetailcourseStr9+='   </li>';
                xuDetailcourseStr9+='    <li>';
                xuDetailcourseStr9+='    <div class="img-box"><img src="../../img/04-icon.png" alt=""></div>';
                xuDetailcourseStr9+='      <span> 绑卡收款</span>';
                xuDetailcourseStr9+='     </li>';
                xuDetailcourseStr9+='     </ul>';
                xuDetailcourseStr9+='     </div>';
            }else{
                xuDetailcourseStr9+='         <div class="route-box">';
                xuDetailcourseStr9+='        '+data.result.daiKuan.daikuanContent+'';
                xuDetailcourseStr9+='        </div>';
            }


        }
        if(data.result.daiKuan.daikuanTitle.search("云闪付") == -1 ){
            xuDetailcourseStr9+='    <div class="route-item">';
            xuDetailcourseStr9+='       <div class="item">';
            xuDetailcourseStr9+='       <h3>申请条件</h3>';
            xuDetailcourseStr9+='       <ul class="list-item">';
            xuDetailcourseStr9+='     <li>1.中国大陆公民</li>';
            xuDetailcourseStr9+='     <li>2.年龄20-55周岁</li>';
            xuDetailcourseStr9+='     <li>3.有稳定收入</li>';
            xuDetailcourseStr9+='     <li>4.需提供大陆居民身份证</li>';
            xuDetailcourseStr9+='    </ul>';
            xuDetailcourseStr9+='     </div>';
            xuDetailcourseStr9+='     </div>';


            xuDetailcourseStr9+='     <div class="route-item">';
            xuDetailcourseStr9+='      <div class="item">';
            xuDetailcourseStr9+='      <h3>常见问题</h3>';
            xuDetailcourseStr9+='      <ul class="list-item">';
            xuDetailcourseStr9+='      <li>被拒原因一：异常-额度抢完，当日额度已抢光</li>';
            xuDetailcourseStr9+='     <li>被拒原因二：审核拒绝</li>';
            xuDetailcourseStr9+='    </ul>';
            xuDetailcourseStr9+='    </div>';
            xuDetailcourseStr9+='    </div>';
        }else{

        }



        xuDetailcourseStr9+='   </div>';


        xuDetailcourseStr9+='    <div class="foot">';
        //参数

        if(islogin){
            xuDetailcourseStr9+='     <button  onclick="subapply();"   class="apply">立即申请</button>';
            xuDetailcourseStr9+='     <button onclick="shareJiajia();"  class="now-apply1">立即推广<span style="font-size: xx-small">('+getYongjinMoney(setNum(data.result.daiKuan.vipshareAgent),data.result.daiKuan.sharePricetype)+')</span></button>';
        }else{
            xuDetailcourseStr9+='     <button onclick="subapply();" class="now-apply2">立即申请</button>';
        }
        xuDetailcourseStr9+='       </div>';

        /*分享参数*/
        xuDetailcourseStr9 += '<input type="hidden" id="id" value="'+data.result.daiKuan.id+'">';
        xuDetailcourseStr9 += '<input type="hidden" id="shareType" value="10">';
        xuDetailcourseStr9 += '<input type="hidden" id="shareTitle" value="'+data.result.daiKuan.daikuanTitle+'">';
        xuDetailcourseStr9 += '<input type="hidden" id="applyurl" value="'+data.result.daiKuan.daikuanLink+'">';

        //判断-默认LOGO
        xuDetailcourseStr9 += '<input type="hidden" id="shareImage" value="'+checkPath(data.result.daiKuan.daikuanImage,'1')+'">';


        xuDetailcourseStr9 += '<input type="hidden" id="orderMoney" value="0.01">';
        xuDetailcourseStr9 += '<input type="hidden" id="orderNum" value="1">';
        xuDetailcourseStr9 += '<input type="hidden" id="orderType" value="16">';
        xuDetailcourseStr9 += '<input type="hidden" id="orderDashangType" value="0">';
        xuDetailcourseStr9 += '<input type="hidden" id="orderTitle" value="'+data.result.daiKuan.daikuanTitle+'">';
        xuDetailcourseStr9 += '<input type="hidden" id="orderAboutid" value="'+data.result.daiKuan.id+'">';


        if(data.result.daiKuan.fabuStatus == '3'){
            $("#xudetailcourse").html(xuDetailcourseStr9);
        }else{
            $.toast("对不起，产品已下架！","text");
        }



        //分享内容
        var sharecourseButtonStr = '';
        sharecourseButtonStr += '<div class="disnone" >';
        sharecourseButtonStr += '<center>';
        sharecourseButtonStr += '<div id="qrcodeCanvas"></div>';
        sharecourseButtonStr += '</center>';
        sharecourseButtonStr += '</div>';


        if(data.result.daiKuan.shareImage != null && data.result.daiKuan.shareImage != ''){
            sharecourseButtonStr += '<div id="sharecontent" class="disnone" style="width: 100%;margin-bottom: 50px;background-image: url('+checkPathBackGroubdImage(data.result.daiKuan.shareImage)+');background-repeat:no-repeat;background-size:cover;">';
        }else{
            sharecourseButtonStr += '<div id="sharecontent" class="disnone" style="width: 100%;margin-bottom: 50px;background-image: url(../../img/agent/images/bg0003.png);background-repeat:no-repeat;background-size:cover;">';
        }

        /* sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
         sharecourseButtonStr += '<span class="weui-loadmore__tips">封面</span>';
         sharecourseButtonStr += '</div>';*/

        sharecourseButtonStr += '<div class="page-bd-15 " style="text-align: center;">';
        sharecourseButtonStr += '<img class="getgold_top_head_img "  src="'+ checkPath(data.result.daiKuan.daikuanImage,'1')+'" id="fengmainimagebase64" style="margin-top: 40px;height: 1px;width: 1px;border-radius:50%;">';
        /*sharecourseButtonStr += '<div class="weui-c-article"><p >'+data.result.tool.toolContent+'</p></div>';*/
        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;">';
        sharecourseButtonStr += '<h4 class="weui-c-title bottom5 f-white" ></h4>';

        //付费时候
        /*if(data.result.activity.activityPrice != null && data.result.activity.activityPrice > 0.00){
            sharecourseButtonStr += '<div class="nickname f-red"> 抢购价￥'+data.result.price+'</div>';
        }*/

        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;margin-top: 430px;">';

        sharecourseButtonStr += '<div style="word-break:break-all;text-align: center;margin-top: 0px; "><p class="time  f-white"  id="fenxiangneirong" style="font-weight: 200;font-size:32px;"></p></div>';

        sharecourseButtonStr += '</div>';

        /*
                sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
                sharecourseButtonStr += '<span class="weui-loadmore__tips">扫码或长按识别查看精彩内容</span>';
                sharecourseButtonStr += '</div>';*/

        sharecourseButtonStr += '<div class="page-bd-15 " style="text-align: center;margin-top: 250px;">';
        sharecourseButtonStr += '<img  src="../../img/agent/images/bgp1.png" style="width: 80%;border-radius: 100px;margin-top: 40px;display:none;">';
        /*sharecourseButtonStr += '<div class="weui-c-article"><p >'+data.result.tool.toolContent+'</p></div>';*/
        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;margin-top: 0px;">';

        sharecourseButtonStr += '<div style="width: 100%;text-align: center;">';
        sharecourseButtonStr += '<img id="tothis" src="" style="width:30%;">';
        sharecourseButtonStr += '</div>';

       /* sharecourseButtonStr += '<div style="width: 100%;text-align: center;margin-top: -75px;">';
        if(data.result.user != null) {
            sharecourseButtonStr += '<img src="' + checkPath(data.result.user.headimgurl, "1") + '" id="headimagebase64" height="25px" width="25px" style="border-radius: 10px;"/>';
        }
        sharecourseButtonStr += '</div>';*/


        sharecourseButtonStr += '<div style="width: 100%;text-align: center;height: 50px;">';

        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '</div>';




        $("body").prepend(sharecourseButtonStr);

        $(document).ready(function() {

            qrCode("qrcodeCanvas",baseUrlFrontDefault+"myDaikuandetail.html?id="+data.result.daiKuan.id+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));

           /* var url = Canvas2Image.convertToPNG($("canvas")[0],100,100).getAttribute('src');
            var img = $("#tothis");
            img.attr("src",url);*/

            //share是否存在-存在且相等则进行弹出渲染

            if(GetUrlString('share') != null && GetUrlString('share') != localStorage.getItem("userId")){//当前自己查看则不进行弹出分享
                localStorage.setItem("inUser",GetUrlString('share'));//推广进入
                localStorage.setItem("inUserDate",getNowFormatDate());//推广时间
            }
            if(GetUrlString('share') != null){
                //增加分享点击率
                updateDianjiliang();
            }
            if(getIsAPPLE()){
                getBase64ImageInServeice(checkPath(data.result.daiKuan.daikuanImage,'1'),"fengmainimagebase64");
                if(data.result.user != null) {
                    getBase64ImageInServeice(checkPath(data.result.user.headimgurl, "1"), "headimagebase64");
                }

            }
            //如果超过一个星期则该用户推广锁定自动结束
            //alert(new Date("2019-03-02").getTime());
            //alert(new Date("2019-03-05").getTime());
            //alert(new Date("2019-03-03").getTime()-new Date("2019-03-02").getTime());
            //259200000-三天--86400000-一天
            if(localStorage.getItem("inUserDate") != null){//如果大于10天自动清除inUser
                if(new Date().getTime()-new Date(localStorage.getItem("inUserDate")).getTime() > 86400000 * dayInUser ){
                    localStorage.setItem("inUser",null);
                    localStorage.setItem("inUserDate",null);
                }
            }

           // isguanzhu();//是否关注

        });


    }


}


//卡详情渲染  xuaolun 2019.09.11
function xuDetailKaRender(data){
    if(data.code == '0'){
        //
        viptips();

        var token = localStorage.getItem("token");
        var islogin=false;
        if(token!=null && token!=""){
            islogin=true;

        }

        $("title").html(data.result.xinYongKa.kaTitle);
        var detailcourseStr = '';
        detailcourseStr += '';

        detailcourseStr += '<div class="weui-c-content">';
        detailcourseStr += '<h2 class="weui-c-title bottom5">'+data.result.xinYongKa.kaTitle+'</h2>';
        if((GetUrlString("share") == null || GetUrlString("share") == '') && data.result.isHuiYuan == '1') {
            detailcourseStr += '<h2 class="bottom5 f14 f-red">' + setNULL(data.result.xinYongKa.kaSharetitle) + '</h2>';
        }
        if(true){
            var localhref = location.href;
            if(localhref.search('lly') == -1 ) {
                detailcourseStr += '<div class="weui-c-meta bottom5" style="float: left;width: 70%;">';
                detailcourseStr += '<div class="weui-c-meta bottom5">';
                detailcourseStr += '<span class="weui-c-nickname">';
                detailcourseStr += '<div class="weui-news-infoitem"  onclick=toUserHome("'+data.result.xinYongKa.createBy.id+'","1") >';
                detailcourseStr += '<img src="' + checkPath(data.result.xinYongKa.createBy.headimgurl, '1') + '" class="img60 ">';
                detailcourseStr += '<span class="weui-news-left f-blue f16import">' + data.result.xinYongKa.createBy.nickname + '</span>';
                detailcourseStr += '</div>';
                detailcourseStr += '</span>';
                detailcourseStr += '<em class="weui-c-nickname">' + timeago(data.result.xinYongKa.createDate) + '</em>';
                detailcourseStr += '</div>';
                detailcourseStr += '</div>';
                detailcourseStr += '<div style="float: left;width: 30%;line-height: 40px;">';
                $("#guanzhuId").val(data.result.xinYongKa.createBy.id);
                detailcourseStr += '<div style="width: 100%;text-align: right;display: none">';
                detailcourseStr += '<label class="weui-label-s b-orange  f-white f12"  id="bgguanzhu" onclick=saveNRguanzhu() style="padding: 0.2em; margin-left: 10px;background-color:#ef4f4f !important;border: 1px solid #ef4f4f !important;color: white !important;;"><i class="beauty icon-xiai f-white f16 " id="gz">关注</i></label>';
                detailcourseStr += '</div>';
                detailcourseStr += '</div>';
            }
        }

        detailcourseStr += '<div class="clear"></div>';

        detailcourseStr += '<div class="weui-comment-reply top00">';
        if(1 == 3){//是否是推广链接
            if( data.result.xinYongKa.isGaoyongjin == '1' ){
                if(data.result.xinYongKa.sharePricetype == '2'){
                    detailcourseStr += '<div class="nickname f-red">限时高佣金(会员):'+setNum(data.result.xinYongKa.gaoyongjinPrice)+'个点<span style="color:gray ;font-size: 12px;">['+formatDate(data.result.xinYongKa.gaoyongjinStart,format='MM-DD')+'至'+formatDate(data.result.xinYongKa.gaoyongjinEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">限时高佣金(会员)￥'+setNum(data.result.xinYongKa.gaoyongjinPrice)+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.xinYongKa.gaoyongjinStart,format='MM-DD')+'至'+formatDate(data.result.xinYongKa.gaoyongjinEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }
            }else{
                if(data.result.xinYongKa.sharePricetype == '2'){
                    detailcourseStr += '<div class="nickname f-red"  style="font-size: 14px;">会员佣金：'+setNum(data.result.xinYongKa.vipshareAgent)+'个点<span style="color:gray ;font-size: 12px;">非会员佣金：'+setNum(data.result.xinYongKa.vipshareAgent)+'个点</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red" style="font-size: 14px;">会员佣金￥'+setNum(data.result.xinYongKa.vipshareAgent)+'  <span style="color:gray ;font-size: 12px;">非会员佣金￥'+setNum(data.result.xinYongKa.freeshareAgent)+' </span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }
            }
        }


        //detailcourseStr += '<p class="time subtext">'+data.result.xinYongKa.kaLabel+'</p>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-article">';

        //标签集合

        $("#buyandshare").hide();
        $("#share").show();

        /*if(data.result.xinYongKa.kaImage != null){
            detailcourseStr += '<img src="'+ checkPath(data.result.xinYongKa.kaImage,'1')+'" >';
        }*/


        detailcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
        if(data.result.xinYongKa.isZiying != null && data.result.xinYongKa.isZiying != ''){
            if(data.result.xinYongKa.isZiying == '1'){
                detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
            }

        }

        if((GetUrlString("share") == null || GetUrlString("share") == '' ) && data.result.isHuiYuan == '1'){
            if(data.result.xinYongKa.kaJiesuan != null && data.result.xinYongKa.kaJiesuan != ''){
                detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.xinYongKa.kaJiesuan+'</label>';
            }
        }

        if(data.result.xinYongKa.kaTongguolv != null && data.result.xinYongKa.kaTongguolv != '' ){
            detailcourseStr += '<label class="label f-red b-red  f13">通过率:'+data.result.xinYongKa.kaTongguolv+'</label>';
        }

        if(data.result.xinYongKa.kaLabel != null && data.result.xinYongKa.kaLabel != ''){
            var str = data.result.xinYongKa.kaLabel; //这是一字符串
            var strs= new Array(); //定义一数组
            strs=str.split("/"); //字符分割
            for (i=0;i<strs.length ;i++ )
            {
                detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
            }

        }


        if(data.result.xinYongKa.kaMax != null && data.result.xinYongKa.kaMax != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">最大额度:'+data.result.xinYongKa.kaMax+'</label>';
        }
        if(data.result.xinYongKa.freeYear != null && data.result.xinYongKa.freeYear != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">免息年限:'+data.result.xinYongKa.freeYear+'</label>';
        }
        if(data.result.xinYongKa.yearMoney != null && data.result.xinYongKa.yearMoney != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">年费:'+data.result.xinYongKa.yearMoney+'</label>';
        }
        if(data.result.xinYongKa.quxianShouxufei != null && data.result.xinYongKa.quxianShouxufei != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">取现手续费:'+data.result.xinYongKa.quxianShouxufei+'</label>';
        }
        if(data.result.xinYongKa.quxianEdu != null && data.result.xinYongKa.quxianEdu != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">取现额度:'+data.result.xinYongKa.quxianEdu+'</label>';
        }
        if(data.result.xinYongKa.lowHuankuanbili != null && data.result.xinYongKa.lowHuankuanbili != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">最低还款比例:'+data.result.xinYongKa.lowHuankuanbili+'</label>';
        }
        if(data.result.xinYongKa.kaRilixi != null && data.result.xinYongKa.kaRilixi != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">日利息:'+data.result.xinYongKa.kaRilixi+'</label>';
        }
        if(data.result.xinYongKa.kaZhangdanri != null && data.result.xinYongKa.kaZhangdanri != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">账单日:'+data.result.xinYongKa.kaZhangdanri+'</label>';
        }
        if(data.result.xinYongKa.kaHuankuanri != null && data.result.xinYongKa.kaHuankuanri != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">还款日:'+data.result.xinYongKa.kaHuankuanri+'</label>';
        }
        if(data.result.xinYongKa.kaAttra != null && data.result.xinYongKa.kaAttra != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">'+data.result.xinYongKa.kaAttra+'</label>';
        }
        if(data.result.xinYongKa.kaAttrb != null && data.result.xinYongKa.kaAttrb != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">'+data.result.xinYongKa.kaAttrb+'</label>';
        }

        if(data.result.xinYongKa.kaZuzhi != null && data.result.xinYongKa.kaZuzhi != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">'+data.result.xinYongKa.kaZuzhi+'</label>';
        }

        if(data.result.xinYongKa.bType != null && data.result.xinYongKa.bType != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">'+data.result.xinYongKa.bType+'</label>';
        }


        detailcourseStr += '</div>';


        if(data.result.xinYongKa.qrc != null && data.result.xinYongKa.qrc != '' && data.result.xinYongKa.kucun != '0' ){
            detailcourseStr += '<div class="" >';
            detailcourseStr += '<div class="weui-news-info">';
            detailcourseStr += '<div class="weui-news-infoitem fontsize7">';
            detailcourseStr += '<div class="weui-comment-reply">';
            detailcourseStr += '<div class="nickname">做单二维码</div>';




            detailcourseStr += '</div>';
            detailcourseStr += '</div>';
            detailcourseStr += '<div class="weui-news-infoitem fontsize7 f-gray"  >';
            detailcourseStr += ' <i class="beauty icon-anniu_gerenzhongxin  f-white f14   anniushadow2"  onclick=qrfankui() >失效反馈</i>';
            detailcourseStr += '</div>';
            detailcourseStr += '</div>';
            detailcourseStr += '</div>';
        }else if(data.result.xinYongKa.kucun == '0'){
            detailcourseStr += '<div class="" >';
            detailcourseStr += '<div class="weui-news-info">';
            detailcourseStr += '<div class="weui-news-infoitem fontsize7">';
            detailcourseStr += '<div class="weui-comment-reply">';
            detailcourseStr += '<div class="nickname ">做单二维码</div>';


            detailcourseStr += '</div>';
            detailcourseStr += '</div>';

            detailcourseStr += '</div>';
            detailcourseStr += '</div>';
        }


        detailcourseStr += '<div class="weui-c-inner"  id="detailcourse211" style="width: 100%;text-align: center;margin-bottom: 0px;display: none;">';
        detailcourseStr += '<div style="color: red;display: none;">--------开始做单--------</div>';
        detailcourseStr += '<div style="color: red;display: none;">请仔细阅读文档</div>';
        detailcourseStr += '<div style="color: red;text-align: left;display: none;"> 郑重声明：本站不获取任何用户银行卡信息，由此产生的任何风险或损失与本站无关。您在做任务时如遇任何风险或造成任何损失，请第一时间联系客服处理。欢迎对违规行为进行举报！</div>';


        detailcourseStr += '<div id="detailcourse22" style="text-align: center">';

        if(data.result.xinYongKa.kucun == '0' ){
            detailcourseStr += '<div style="color: red;font-size: 18px;">--------库存不足--------</div>';
            detailcourseStr += '<div style="color: red;font-size: 14px;">--我们正在补货,请耐心等待--</div>';
            detailcourseStr += '<img id="detailcourse221"  style="width: 60%;text-align: center;display: inline;opacity: 0.2;">';
        }else{
            detailcourseStr += '<img id="detailcourse221" style="width: 60%;text-align: center;display: inline;">';
        }

        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '<div class=""  id="detailcourse31" style="width: 100%;text-align: center;margin-bottom: 50px;display: none;">';


        detailcourseStr += '<div class="">';
        detailcourseStr += '<div class="weui-news-info">';
        detailcourseStr += '<div class="weui-news-infoitem fontsize7">';
        detailcourseStr += '<div class="weui-comment-reply">';
        detailcourseStr += '<div class="nickname">视频教程</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';



        detailcourseStr += '<div id="detailcourse3">';


        detailcourseStr += '</div>';

        detailcourseStr += '</div>';




        detailcourseStr += '<div class="" >';
        detailcourseStr += '<div class="weui-news-info">';
        detailcourseStr += '<div class="weui-news-infoitem fontsize7">';
        detailcourseStr += '<div class="weui-comment-reply">';
        if(data.result.xinYongKa.l5 != null && data.result.xinYongKa.l5 != '') {
            detailcourseStr += '<div class="nickname">图文操作步骤<span class="f14 f-red">['+data.result.xinYongKa.l5+']</span></div>';
        }else{
            detailcourseStr += '<div class="nickname">图文操作步骤</div>';
        }
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';



        if((GetUrlString("share") == null || GetUrlString("share") == '' ) && data.result.isHuiYuan == '1'){
            detailcourseStr += '<p>'+setNULL(data.result.xinYongKa.kaSharecontent)+'</p>';
        }

        detailcourseStr += '<p>'+data.result.xinYongKa.kaContent+'</p>';


        detailcourseStr += '<div class="" >';
        detailcourseStr += '<div class="weui-news-info">';
        detailcourseStr += '<div class="weui-news-infoitem fontsize7">';
        detailcourseStr += '<div class="weui-comment-reply">';
        detailcourseStr += '<div class="nickname">交单格式</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';

        detailcourseStr += '<div class="" style="text-indent: 0em;">';
        detailcourseStr += '<p class="f-red f18"  style="text-indent: 0em;">'+setNULL(data.result.xinYongKa.l6)+'</p>';
        detailcourseStr += '</div>';

        detailcourseStr += '<div class="page-bd top15" >';
        detailcourseStr += '<div class="weui-feeds">';
        detailcourseStr += '<ul>';

        var imgstr = '';
        var name = '';
        if(data.result.xinYongKa.l1 !=null && data.result.xinYongKa.l1 != ''){
            imgstr += data.result.xinYongKa.l1+',';
            if(data.result.xinYongKa.tuone !=null && data.result.xinYongKa.tuone != ''){
                name += data.result.xinYongKa.tuone+',';
            }else{
                name += '截图一,';
            }

        }
        if(data.result.xinYongKa.l2 !=null && data.result.xinYongKa.l2 != ''){
            imgstr += data.result.xinYongKa.l2+',';
            if(data.result.xinYongKa.tutwo !=null && data.result.xinYongKa.tutwo != ''){
                name += data.result.xinYongKa.tutwo+',';
            }else{
                name += '截图二,';
            }
        }
        if(data.result.xinYongKa.l3 !=null && data.result.xinYongKa.l3 != ''){
            imgstr += data.result.xinYongKa.l3+',';
            if(data.result.xinYongKa.tuthree !=null && data.result.xinYongKa.tuthree != ''){
                name += data.result.xinYongKa.tuthree+',';
            }else{
                name += '截图三,';
            }
        }

        if(data.result.xinYongKa.l7 !=null && data.result.xinYongKa.l7 != ''){
            imgstr += data.result.xinYongKa.l7+',';
            if(data.result.xinYongKa.tufour !=null && data.result.xinYongKa.tufour != ''){
                name += data.result.xinYongKa.tufour+',';
            }else{
                name += '截图四,';
            }
        }

        if(imgstr != null && imgstr != ''){
            imgstr = imgstr.substring(0,imgstr.length-1);
            name = name.substring(0,name.length-1);
            detailcourseStr += getImageContentJiaodan('laxinid',imgstr,name);

        }



        detailcourseStr += '</ul>';
        detailcourseStr += '</ul>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';

        if(data.result.xinYongKa.l4 != null && data.result.xinYongKa.l4 != '') {
            detailcourseStr += '<div class="" >';
            detailcourseStr += '<div class="weui-news-info">';
            detailcourseStr += '<div class="weui-news-infoitem fontsize7">';
            detailcourseStr += '<div class="weui-comment-reply">';
            detailcourseStr += '<div class="nickname">注意事项</div>';
            detailcourseStr += '</div>';
            detailcourseStr += '</div>';
            detailcourseStr += '</div>';
            detailcourseStr += '</div>';


            detailcourseStr += '<div>';
            if(data.result.xinYongKa.l4 != null && data.result.xinYongKa.l4 != '') {
                detailcourseStr += '<img src="'+checkPath(data.result.xinYongKa.l4,'1')+'" style="width: 100%;">';
            }
            detailcourseStr += '</div>';
        }





        detailcourseStr += '<div class="" >';
        detailcourseStr += '<div class="weui-news-info">';
        detailcourseStr += '<div class="weui-news-infoitem fontsize7">';
        detailcourseStr += '<div class="weui-comment-reply">';
        detailcourseStr += '<div class="nickname">报单二维码</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';

        detailcourseStr += '<div style="text-align: center;"  id="detailcourse2"></div>';
        detailcourseStr += '<div style="text-align: center;color: red;font-weight: bolder">温馨提示:报单方式有两种</div>';
        detailcourseStr += '<div style="text-align: center;color: red;">1.本机点击立即报单按钮</div>';
        detailcourseStr += '<div style="text-align: center;color: red;">2.用其他手机扫码后报单</div>';







        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-tools ">';
        detailcourseStr += '<a class="" onclick=zhuanfa("2","'+data.result.xinYongKa.id+'","'+data.result.xinYongKa.createBy.id+'","10");><i class="icon icon-5 weui-tabbar__icon" id="dashangicon"></i>转发</a>';
        /*
                detailcourseStr += '<a href="javascript:dashang();"><i class="icon icon-42 weui-tabbar__icon" id="dashangicon"></i>打赏('+setNum(data.result.dashangNum)+'次)</a>';
        */
        detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">'+setNum(data.result.xinYongKa.kaDianjiliang)+'</span></div>';
        var localhref = location.href;
        if(localhref.search('lly') == -1 ) {
            detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
            detailcourseStr += '<span  onclick=dianji("10","' + data.result.xinYongKa.id + '"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan' + data.result.xinYongKa.id + '">' + setNum(data.result.xinYongKa.kaZan) + '</span> </span>';
            detailcourseStr += '<span class="check checked " onclick=openCommentList("commentDisList","2","1",10,"' + data.result.xinYongKa.id + '","10","' + data.result.xinYongKa.createBy.id + '");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">' + setNum(data.result.xinYongKa.commentNum) + '</span> </span>';
            detailcourseStr += '<span class="check checked " onclick=shareJiajia();> <i class="icon icon-41 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num"></span> </span>';

            detailcourseStr += '</div>';
        }

        detailcourseStr += '</div>';

        detailcourseStr += '<div class="" >';
        detailcourseStr += '<div class="weui-news-info">';
        detailcourseStr += '<div class="weui-news-infoitem fontsize7">';
        detailcourseStr += '<div class="weui-comment-reply">';
        detailcourseStr += '<div class="nickname">热门推荐</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';

        detailcourseStr += '<div class="weui-panel weui-panel_access bottom55">';

        detailcourseStr += '<div class="weui-news">';
        detailcourseStr += '<ul class="weui-news-list" id="jinritop12">';
        detailcourseStr += '<div class="" >';
        detailcourseStr += '<div class="swiper-style swiper-container" id="swiper-containerlaxintop">';
        detailcourseStr += '<div class="swiper-wrapper" id="laxintop">';

        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';

        detailcourseStr += '</ul>';
        detailcourseStr += '</div>';

        detailcourseStr += '</div>';


        /*分享参数*/
        detailcourseStr += '<input type="hidden" id="id" value="'+data.result.xinYongKa.id+'">';
        detailcourseStr += '<input type="hidden" id="kaNo" value="'+data.result.xinYongKa.kaNo+'">';
        detailcourseStr += '<input type="hidden" id="laxin" value="'+data.result.xinYongKa.laxin+'">';
        detailcourseStr += '<input type="hidden" id="baodan" value="'+data.result.xinYongKa.baodan+'">';
        detailcourseStr += '<input type="hidden" id="shareType" value="9">';
        detailcourseStr += '<input type="hidden" id="shareTitle" value="'+data.result.xinYongKa.kaTitle+'">';
        detailcourseStr += '<input type="hidden" id="applyurl" value="'+data.result.xinYongKa.kaLink+'">';

        //判断-默认LOGO
        detailcourseStr += '<input type="hidden" id="shareImage" value="'+checkPath(data.result.xinYongKa.kaImage,'1')+'">';


        detailcourseStr += '<input type="hidden" id="orderMoney" value="0.01">';
        detailcourseStr += '<input type="hidden" id="orderNum" value="1">';
        detailcourseStr += '<input type="hidden" id="orderType" value="15">';
        detailcourseStr += '<input type="hidden" id="orderDashangType" value="0">';
        detailcourseStr += '<input type="hidden" id="orderTitle" value="'+data.result.xinYongKa.kaTitle+'">';
        detailcourseStr += '<input type="hidden" id="orderAboutid" value="'+data.result.xinYongKa.id+'">';



        //提交参数
        //detailcourseStr += '<input type="hidden" id="isdis" value="'+data.result.xinYongKa.isdis+'">';
        detailcourseStr += '<input type="hidden" id="isbitian" value="'+data.result.xinYongKa.isbitian+'">';//第三个字段名称
       /* detailcourseStr += '<input type="hidden" id="tuone" value="'+data.result.xinYongKa.tuone+'">';
        detailcourseStr += '<input type="hidden" id="tutwo" value="'+data.result.xinYongKa.tutwo+'">';
        detailcourseStr += '<input type="hidden" id="tuthree" value="'+data.result.xinYongKa.tuthree+'">';
*/

        if(data.result.xinYongKa.fabuStatus == '3'){
            $("#detailcourse").html(detailcourseStr);
        }else{
            $.toast("对不起，产品已下架！","text");
        }

        <!--按钮渲染-->
        var detailcourseButtonStr = '';




        //参数
        if(true){

            if(data.result.xinYongKa.isdis == '1'){
                $("#sfzdis").show();

            }else{
                $("#sfzdis").hide();

            }

            if(data.result.xinYongKa.isbitian != null && data.result.xinYongKa.isbitian != ''){
                $("#sfzxx").html(data.result.xinYongKa.isbitian);
                $(".applycardnum").attr('placeholder',"请输入"+data.result.xinYongKa.isbitian);
            }

            if(data.result.xinYongKa.tuone != null && data.result.xinYongKa.tuone != ''){
                $("#tuone").html(data.result.xinYongKa.tuone);
            }

            if(data.result.xinYongKa.tutwo != null && data.result.xinYongKa.tutwo != ''){
                $("#tutwo").html(data.result.xinYongKa.tutwo);
            }

            if(data.result.xinYongKa.tuthree != null && data.result.xinYongKa.tuthree != ''){
                $("#tuthree").html(data.result.xinYongKa.tuthree);
            }
            if(data.result.xinYongKa.tufour != null && data.result.xinYongKa.tufour != ''){
                $("#tufour").html(data.result.xinYongKa.tufour);
            }


            $("#laxinxiangmu").show();
            $("#halfapply").remove();
            $("#detailcourse211").show();
            if(data.result.xinYongKa.qrc != null && data.result.xinYongKa.qrc != '' && (data.result.xinYongKa.qrurl == null || data.result.xinYongKa.qrurl == '') ){
                $("#detailcourse221").attr("src",data.result.xinYongKa.qrc);
            }else if(data.result.xinYongKa.qrurl != null && data.result.xinYongKa.qrurl != '' && data.result.xinYongKa.qrurl != '首页'){
                getQrimageUrl2(data.result.xinYongKa.qrurl,"")

            }else if(data.result.xinYongKa.qrurl == '首页'){
                isLogin('','');
                var url = baseUrlFrontDefault+"index.html?id="+localStorage.getItem("userId")+"&share="+localStorage.getItem("userId")+"&s="+getSaasId();
                getQrimageUrl2(url,"")
            }else{
                $("#detailcourse22").hide();
            }

            if(data.result.xinYongKa.video != null && data.result.xinYongKa.video != '' ){
                if(data.result.xinYongKa.video.search(".mp4") != -1 || data.result.xinYongKa.video.search(".MP4") != -1 || data.result.xinYongKa.video.search(".flv")  != -1 || data.result.xinYongKa.video.search(".mov")  != -1 ){
                    $("#detailcourse31").show();
                    var detailcourseStr2 = '';
                    detailcourseStr2 += '<div class="page-bd"><div class="weui-c-article">';
                    detailcourseStr2 += '<div id="dplayer2'+data.result.xinYongKa.id+'"></div>';
                    detailcourseStr2 += '<script type="text/javascript">';
                    detailcourseStr2 += 'const dp2'+data.result.xinYongKa.id+' = new DPlayer({container: document.getElementById("dplayer2'+data.result.xinYongKa.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(data.result.xinYongKa.video,"3")+'\', pic: \''+videoImagePath(data.result.xinYongKa.video)+'\'}});';
                    detailcourseStr2 += '</script>';
                    detailcourseStr2 += '</div></div>';
                    $("#detailcourse3").html(detailcourseStr2);
                }



            }

            if(data.result.xinYongKa.baodan == '1'){
                if(islogin){
                    $("#detailcourse21").show();


                    //qrCodeLx("detailcourse2",baseUrlFrontDefault+"myKadetail.html?id="+data.result.xinYongKa.id+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));

                    detailcourseButtonStr+='    <div class="fixedbtn24" style="background-color: white;z-index: 9;">';
                    detailcourseButtonStr+='     <div style="margin-left: 15px;margin-right: 15px;padding-top: 5px;padding-bottom: 5px;"><button  onclick="subapplyLx();" class="weui-btn weui-btn_warn shadowonly" style="background-color: #FF6666;border-radius: 30px;">立即报单</button></div>';
                    detailcourseButtonStr+='       </div>';

                    if(data.result.xinYongKa.jietu == '3'){
                        $("#jietu4").hide();
                    }else if(data.result.xinYongKa.jietu == '2'){
                        $("#jietu3").hide();
                        $("#jietu4").hide();
                    }else if(data.result.xinYongKa.jietu == '1'){
                        $("#jietu2").hide();
                        $("#jietu3").hide();
                        $("#jietu4").hide();
                    }else if(data.result.xinYongKa.jietu == '0'){
                        $("#jietu1").hide();
                        $("#jietu2").hide();
                        $("#jietu3").hide();
                        $("#jietu4").hide();
                    }


                }else{
                    //isLogin('','');
                    $("#detailcourse21").show();

                    //qrCodeLx("detailcourse2",baseUrlFrontDefault+"myKadetail.html?id="+data.result.xinYongKa.id+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));

                    detailcourseButtonStr+='    <div class="fixedbtn24" style="background-color: white;z-index: 9;">';
                    detailcourseButtonStr+='     <div style="margin-left: 15px;margin-right: 15px;padding-top: 5px;padding-bottom: 5px;"><button onclick="subapplyLx();" class="weui-btn weui-btn_warn shadowonly" style="background-color: #FF6666;border-radius: 30px;">立即报单</button></div>';
                    detailcourseButtonStr+='       </div>';

                    if(data.result.xinYongKa.jietu == '3'){
                        $("#jietu4").hide();
                    }else if(data.result.xinYongKa.jietu == '2'){
                        $("#jietu3").hide();
                        $("#jietu4").hide();
                    }else if(data.result.xinYongKa.jietu == '1'){
                        $("#jietu2").hide();
                        $("#jietu3").hide();
                        $("#jietu4").hide();
                    }else if(data.result.xinYongKa.jietu == '0'){
                        $("#jietu1").hide();
                        $("#jietu2").hide();
                        $("#jietu3").hide();
                        $("#jietu4").hide();
                    }
                }



                //a500d8338d7a4092bf49fce4e0acfd25
            }else{
                $("#jietu1").hide();
                $("#jietu2").hide();
                $("#jietu3").hide();
                $("#jietu4").hide();


                if(islogin){


                }else{
                    isLogin('','');
                }
            }

        }else{
            $("#halfapplylx").remove();
            detailcourseButtonStr+='    <div class="fixedbtn24" style="background-color: white;z-index: 9;">';
            if(islogin){
                detailcourseButtonStr+='     <button  onclick="subapply();"   class="apply">立即申请</button>';
                detailcourseButtonStr+='     <button onclick="shareJiajia();"  class="now-apply1">立即推广<span style="font-size: xx-small">('+getYongjinMoney(setNum(data.result.xinYongKa.vipshareAgent),data.result.xinYongKa.sharePricetype)+')</span></button>';
            }else{
                detailcourseButtonStr+='     <button onclick="subapply();" class="now-apply2">立即申请</button>';
            }
            detailcourseButtonStr+='       </div>';
        }



        $("body").append(detailcourseButtonStr);



        //分享内容
        var sharecourseButtonStr = '';
        sharecourseButtonStr += '<div class="disnone" >';
        sharecourseButtonStr += '<center>';
        sharecourseButtonStr += '<div id="qrcodeCanvas"></div>';
        sharecourseButtonStr += '</center>';
        sharecourseButtonStr += '</div>';


        if(data.result.xinYongKa.shareImage != null && data.result.xinYongKa.shareImage != ''){
            sharecourseButtonStr += '<div id="sharecontent" class="disnone" style="width: 100%;margin-bottom: 50px;background-image: url('+checkPathBackGroubdImage(data.result.xinYongKa.shareImage)+');background-repeat:no-repeat;background-size:cover;">';
        }else{
            sharecourseButtonStr += '<div id="sharecontent" class="disnone" style="width: 100%;margin-bottom: 50px;background-image: url('+checkPathBackGroubdImage(localStorage.getItem("sharetuiguang"))+');background-repeat:no-repeat;background-size:cover;">';
        }


        /* sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
         sharecourseButtonStr += '<span class="weui-loadmore__tips">封面</span>';
         sharecourseButtonStr += '</div>';*/

        sharecourseButtonStr += '<div class="page-bd-15 " style="text-align: center;">';
        sharecourseButtonStr += '<img class="getgold_top_head_img "  src="'+ checkPath(data.result.xinYongKa.kaImage,'1')+'" id="fengmainimagebase64" style="margin-top: 40px;height: 1px;width: 1px;border-radius:50%;">';
        /*sharecourseButtonStr += '<div class="weui-c-article"><p >'+data.result.tool.toolContent+'</p></div>';*/
        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;">';
        sharecourseButtonStr += '<h4 class="weui-c-title bottom5 f-white" ></h4>';

        //付费时候
        /*if(data.result.activity.activityPrice != null && data.result.activity.activityPrice > 0.00){
            sharecourseButtonStr += '<div class="nickname f-red"> 抢购价￥'+data.result.price+'</div>';
        }*/

        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;margin-top: 430px;">';

        sharecourseButtonStr += '<div style="word-break:break-all;text-align: center;margin-top: 0px; "><p class="time  f-white"  id="fenxiangneirong" style="font-weight: 200;font-size:32px;"></p></div>';

        sharecourseButtonStr += '</div>';

        /*
                sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
                sharecourseButtonStr += '<span class="weui-loadmore__tips">扫码或长按识别查看精彩内容</span>';
                sharecourseButtonStr += '</div>';*/

        sharecourseButtonStr += '<div class="page-bd-15 " style="text-align: center;margin-top: 250px;">';
        sharecourseButtonStr += '<img  src="../../img/agent/images/bgp1.png" style="width: 80%;border-radius: 100px;margin-top: 40px;display:none;">';
        /*sharecourseButtonStr += '<div class="weui-c-article"><p >'+data.result.tool.toolContent+'</p></div>';*/
        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;margin-top: 0px;">';

        sharecourseButtonStr += '<div style="width: 100%;text-align: center;">';
        sharecourseButtonStr += '<img id="tothis" src="" style="width:30%;">';
        sharecourseButtonStr += '</div>';

        /*sharecourseButtonStr += '<div style="width: 100%;text-align: center;margin-top: -70px;">';
        if(data.result.user != null) {
            sharecourseButtonStr += '<img src="' + checkPath(data.result.user.headimgurl, "1") + '" id="headimagebase64" height="25px" width="25px" style="border-radius:5px;"/>';
        }
        sharecourseButtonStr += '</div>';*/


        sharecourseButtonStr += '<div style="width: 100%;text-align: center;height: 50px;">';

        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '</div>';



        $("body").prepend(sharecourseButtonStr);
        $(document).ready(function() {
            laxinlist("laxintop",'laxintop',"2","4.5","/zq/xinyongka/xinYongKa/laxintoplist",30);//榜单

            qrCode("qrcodeCanvas",baseUrlFrontDefault+"myKadetail.html?id="+data.result.xinYongKa.id+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));
            localStorage.setItem("bgurl",localStorage.getItem("sharetuiguang"));
            /* var url = Canvas2Image.convertToPNG($("canvas")[0],100,100).getAttribute('src');
            var img = $("#tothis");
            img.attr("src",url);*/



            //share是否存在-存在且相等则进行弹出渲染

            if(GetUrlString('share') != null && GetUrlString('share') != localStorage.getItem("userId")){//当前自己查看则不进行弹出分享
                localStorage.setItem("inUser",GetUrlString('share'));//推广进入
                localStorage.setItem("inUserDate",getNowFormatDate());//推广时间
            }
            if(GetUrlString('share') != null){
                //增加分享点击率
                updateDianjiliang();
            }
            if(getIsAPPLE()){
                getBase64ImageInServeice(checkPath(data.result.xinYongKa.kaImage,'1'),"fengmainimagebase64");
                if(data.result.user != null) {
                    getBase64ImageInServeice(checkPath(data.result.user.headimgurl, "1"), "headimagebase64");
                }

            }
            //如果超过一个星期则该用户推广锁定自动结束
            //alert(new Date("2019-03-02").getTime());
            //alert(new Date("2019-03-05").getTime());
            //alert(new Date("2019-03-03").getTime()-new Date("2019-03-02").getTime());
            //259200000-三天--86400000-一天
            if(localStorage.getItem("inUserDate") != null){//如果大于10天自动清除inUser
                if(new Date().getTime()-new Date(localStorage.getItem("inUserDate")).getTime() > 86400000 * dayInUser ){
                    localStorage.setItem("inUser",null);
                    localStorage.setItem("inUserDate",null);
                }
            }
            //isguanzhu();//是否关注

        });



    }else{
        $.toast(data.msg, "text");
        if(data.code == '-1'){
            localStorage.setItem('token','');
            if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                isLogin('','');
            }
        }

    }
}



//产品详情渲染- xuaolun 2019.09.16
function xuDetailProductRender(data){
    if(data.code == '0'){
        $("title").html(data.result.product.questionTitle);
        var detailcourseStr = '';
        detailcourseStr += '';

        detailcourseStr += '<div class="weui-c-content" >';
        detailcourseStr += '<h2 class="weui-c-title bottom5">'+data.result.product.productTitle+'</h2>';
        if((GetUrlString("share") == null || GetUrlString("share") == '')  && data.result.isHuiYuan == '1') {
            detailcourseStr += '<h2 class="bottom5 f14 f-red">' + setNULL(data.result.product.productSharetitle) + '</h2>';
        }

        if(getSaasId() == '0') {
            detailcourseStr += '<div class="weui-c-meta bottom5" style="float: left;width: 70%;">';
            detailcourseStr += '<div class="weui-c-meta bottom5">';
            detailcourseStr += '<span class="weui-c-nickname">';
            detailcourseStr += '<div class="weui-news-infoitem"  onclick=toUserHome("' + data.result.product.createBy.id + '","1")>';
            detailcourseStr += '<img src="' + checkPath(data.result.product.createBy.headimgurl, '1') + '" class="weui-news-round">';
            detailcourseStr += '<span class="weui-news-left f-blue f16import">' + data.result.product.createBy.nickname + '</span>';
            detailcourseStr += '</div>';
            detailcourseStr += '</span>';
            detailcourseStr += '<em class="weui-c-nickname">' + timeago(data.result.product.createDate) + '</em>';
            detailcourseStr += '</div>';
            detailcourseStr += '</div>';
            detailcourseStr += '<div style="float: left;width: 30%;line-height: 40px;">';
            $("#guanzhuId").val(data.result.product.createBy.id);
            detailcourseStr += '<div style="width: 100%;text-align: right;">';
            detailcourseStr += '<label class="weui-label-s b-orange  f-white f12"  id="bgguanzhu" onclick=saveNRguanzhu() style="padding: 0.2em; margin-left: 10px;background-color:#ef4f4f !important;border: 1px solid #ef4f4f !important;color: white !important;;"><i class="beauty icon-xiai f-white f16 " id="gz">关注</i></label>';
            detailcourseStr += '</div>';
            detailcourseStr += '</div>';
        }
        detailcourseStr += '<div class="clear"></div>';
        detailcourseStr += '<div class="weui-comment-reply top00">';
        if(GetUrlString('share') != null ){//是否是推广链接
            if(data.result.product.productPrice != null && data.result.product.productPrice > 0 &&   data.result.product.isLowprice == '1'){
                detailcourseStr += '<div class="nickname f-red">限时低价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;">原价￥'+data.result.product.remarks+'</span> </div>';

            }else if(data.result.product.productPrice != null && data.result.product.productPrice > 0 && data.result.product.isGaoyongjin == '1'){
                detailcourseStr += '<div class="nickname f-red">抢购价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.product.remarks+'</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';
            }else if(data.result.product.productPrice != null && data.result.product.productPrice > 0 ){
                detailcourseStr += '<div class="nickname f-red">抢购价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.product.remarks+'</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';
            }else{
                //detailcourseStr += '<div class="nickname f-red f12">本篇文章可免费阅读，感谢作者分享</div>';
            }
        }else{
            if(data.result.product.productPrice != null && data.result.product.productPrice > 0 &&   data.result.product.isLowprice == '1'){
                detailcourseStr += '<div class="nickname f-red">限时低价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;">原价￥'+data.result.product.remarks+'</span> ';
                if(eval(data.result.yongjin) > 0.00 && data.result.isHuiYuan == '1'){
                    detailcourseStr += '<span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">会员佣金￥'+data.result.yongjin+'</span>';
                }


                detailcourseStr += '</div>';


            }else if(data.result.product.productPrice != null && data.result.product.productPrice > 0 && data.result.product.isGaoyongjin == '1'){
                if(data.result.isHuiYuan == '1'){
                    detailcourseStr += '<div class="nickname f-red">限时高佣金(会员)￥'+data.result.yongjin+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.product.gaoyongjinStart,format='MM-DD')+'至'+formatDate(data.result.product.gaoyongjinEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">抢购价￥'+data.result.price+'</span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red"><span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">抢购价￥'+data.result.price+'</span></div>';

                }
            }else if(data.result.product.productPrice != null && data.result.product.productPrice > 0 ){
                detailcourseStr += '<div class="nickname f-red">抢购价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.product.remarks+'</span>';
                if(eval(data.result.yongjin) > 0.00 && data.result.isHuiYuan == '1'){
                    detailcourseStr += '<span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">会员佣金￥'+data.result.yongjin+'</span>';
                }
                detailcourseStr += '</div>';
            }else{
                //detailcourseStr += '<div class="nickname f-red f12">本活动可免费参与，感谢作者分享</div>';
            }
        }


        //detailcourseStr += '<p class="time subtext">'+data.result.product.productLabel+'</p>';





        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-article">';

        if(data.result.isBuy == '0'){
            /*if(data.result.product.productImage != null){
                detailcourseStr += '<img src="'+ checkPath(data.result.product.productImage,'1')+'" >';
            }*/
            detailcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
            if(data.result.product.isZiying != null && data.result.product.isZiying != ''){
                if(data.result.product.isZiying == '1'){
                    detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
                }

            }

            if((GetUrlString("share") == null || GetUrlString("share") == '')  && data.result.isHuiYuan == '1' ){
                if(data.result.product.productJiesuan != null && data.result.product.productJiesuan != ''){
                    detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.product.productJiesuan+'</label>';
                }
            }

            if(data.result.product.productLabel != null && data.result.product.productLabel != ''){
                var str = data.result.product.productLabel; //这是一字符串
                var strs= new Array(); //定义一数组
                strs=str.split("/"); //字符分割
                for (i=0;i<strs.length ;i++ )
                {
                    detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
                }

            }





            detailcourseStr += '</div>';


           /* if((GetUrlString("share") == null || GetUrlString("share") == '')  && data.result.isHuiYuan == '1' ){
                detailcourseStr += '<p>'+setNULL(data.result.product.productSharecontent)+'</p>';
            }
            detailcourseStr += '<p>'+data.result.product.productContent+'</p>';*/
            /*if(getSaasId == '201908281418'){

                detailcourseStr += '<p>'+data.result.product.productContent+'</p>';

            }else{

                detailcourseStr += '<p>'+setNULL(data.result.product.productSharecontent)+'</p>';

            }*/
            detailcourseStr += '<p>'+data.result.product.productContent+'</p>';
            /*  detailcourseStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick=openPay("购买商品","精选全球好物","","","1","0","'+data.result.product.productTitle.replace(/\s*!/g,"")+'","","'+data.result.price+'","'+data.result.price+'","10","","1","0","'+data.result.isHuiYuan+'","'+data.result.product.id+'","'+data.result.product.createBy.id+'");>';

              detailcourseStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去购买<span class="slogan f-white">￥'+setNum(data.result.price)+'</span></a>';*/
            if(getSaasId() == '201909201151'){
                detailcourseStr += '<a href="tel:"  id="telproduct" class="weui-btn weui-btn_warn"></a>';
            }
        }else{
            $("#buyandshare").hide();
            $("#share").show();
            /*if(data.result.product.productImage != null){
                detailcourseStr += '<img src="'+ checkPath(data.result.product.productImage,'1')+'" >';
            }*/

            detailcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
            if(data.result.product.isZiying != null && data.result.product.isZiying != ''){
                if(data.result.product.isZiying == '1'){
                    detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
                }

            }

            if((GetUrlString("share") == null || GetUrlString("share") == '')  && data.result.isHuiYuan == '1' ){
                if(data.result.product.productJiesuan != null && data.result.product.productJiesuan != ''){
                    detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.product.productJiesuan+'</label>';
                }
            }

            if(data.result.product.productLabel != null && data.result.product.productLabel != ''){
                var str = data.result.product.productLabel; //这是一字符串
                var strs= new Array(); //定义一数组
                strs=str.split("/"); //字符分割
                for (i=0;i<strs.length ;i++ )
                {
                    detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
                }

            }





            detailcourseStr += '</div>';

            /*if(GetUrlString("share") == null || GetUrlString("share") == '' ){
                detailcourseStr += '<p>'+setNULL(data.result.product.productSharecontent)+'</p>';
            }*/

            /*if(getSaasId == '201908281418'){

                detailcourseStr += '<p>'+data.result.product.productContent+'</p>';

            }else{

                detailcourseStr += '<p>'+setNULL(data.result.product.productSharecontent)+'</p>';

            }*/
            detailcourseStr += '<p>'+data.result.product.productContent+'</p>';


            if(getSaasId() == '201909201151'){
                detailcourseStr += '<a href="tel:"  id="telproduct" class="weui-btn weui-btn_warn"></a>';
            }


        }



        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-tools">';
        detailcourseStr += '<a class="disnone" onclick=zhuanfa("2","'+data.result.product.id+'","'+data.result.product.createBy.id+'","6");><i class="icon icon-5 weui-tabbar__icon" id="dashangicon"></i>转发</a>';
        detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">'+setNum(data.result.product.productDianjiliang)+'</span></div>';
        detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
        detailcourseStr += '<span  onclick=dianji("7","'+data.result.product.id+'"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan'+data.result.product.id+'">'+setNum(data.result.product.productZan)+'</span> </span>';
        detailcourseStr += '<span class="check checked disnone" onclick=openCommentList("commentDisList","2","1",10,"'+data.result.product.id+'","7","'+data.result.product.createBy.id+'");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">'+setNum(data.result.product.commentNum)+'</span> </span>';

        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        /*分享参数*/
        detailcourseStr += '<input type="hidden" id="id" value="'+data.result.product.id+'">';
        detailcourseStr += '<input type="hidden" id="shareType" value="6">';
        detailcourseStr += '<input type="hidden" id="shareTitle" value="'+data.result.product.productTitle+'">';
        detailcourseStr += '<input type="hidden" id="shareImage" value="'+checkPath(data.result.product.productImage,'1')+'">';


        detailcourseStr += '<input type="hidden" id="orderMoney" value="'+setNum(data.result.price)+'">';
        detailcourseStr += '<input type="hidden" id="orderNum" value="1">';
        detailcourseStr += '<input type="hidden" id="orderType" value="10">';
        detailcourseStr += '<input type="hidden" id="orderDashangType" value="7">';
        detailcourseStr += '<input type="hidden" id="orderTitle" value="'+data.result.product.productTitle+'">';
        detailcourseStr += '<input type="hidden" id="orderAboutid" value="'+data.result.product.id+'">';

        if(data.result.product.fabuStatus == '3'){
            $("#detailcourse").html(detailcourseStr);
        }else{
            $.toast("对不起，产品已下架！","text");
        }

        if(getSaasId() == '201909201151'){
            detailuserShare();
        }


        <!--购买-分享-->
        var detailcourseButtonStr = '';
        if(1==2 && data.result.product.productPrice != null && data.result.product.productPrice > 0.00  && data.result.isBuy == '0' && GetUrlString('share') == null){//不是分享
            detailcourseButtonStr += '<div id="buyandshare">';
            detailcourseButtonStr += '<div class="fixedbtn21">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>分享';

            if(eval(data.result.yongjin) > 0.00){
                detailcourseButtonStr += '<span class="slogan f-white">￥'+data.result.yongjin+'</span>';
            }

            detailcourseButtonStr += '</a>';

            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn22">';
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("购买商品","精选全球好物","","","1","0","'+data.result.product.productTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","10","","1","0","'+data.result.isHuiYuan+'","'+data.result.product.id+'","'+data.result.product.createBy.id+'");>';


            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>购买<span class="slogan f-white">￥'+setNum(data.result.price)+'</span></a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn23">';
            detailcourseButtonStr += '<a href="javascript:;" class="fenge">|</a>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '</div>';
        }else if(1==2 && data.result.product.productPrice != null && data.result.product.productPrice > 0.00  && data.result.isBuy == '0' && GetUrlString('share') != null){//分享未购买
            detailcourseButtonStr += '<div id="buyandshare">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("购买商品","精选全球好物","","","1","0","'+data.result.product.productTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","10","","1","0","'+data.result.isHuiYuan+'","'+data.result.product.id+'","'+data.result.product.createBy.id+'");>';

            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon " id="iconshare"></i>去购买<span class="slogan f-white">￥'+setNum(data.result.price)+'</span></a>';
            detailcourseButtonStr += '</div>';


            detailcourseButtonStr += '</div>';
        }else if(1==2 && data.result.product.productPrice != null && data.result.product.productPrice > 0 ){//已购买
            detailcourseButtonStr += '<div id="buyandshare">';
            detailcourseButtonStr += '<div class="fixedbtn21">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>分享';

            if(eval(data.result.yongjin) > 0.00){
                detailcourseButtonStr += '<span class="slogan f-white">￥'+data.result.yongjin+'</span>';
            }

            detailcourseButtonStr += '</a>';

            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn22">';
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("购买商品","精选全球好物","","","1","0","'+data.result.product.productTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","10","","1","0","'+data.result.isHuiYuan+'","'+data.result.product.id+'","'+data.result.product.createBy.id+'");>';


            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>购买<span class="slogan f-white">￥'+setNum(data.result.price)+'</span></a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn23">';
            detailcourseButtonStr += '<a href="javascript:;" class="fenge">|</a>';
            detailcourseButtonStr += '</div>';
        }else{//免费
            /*detailcourseButtonStr += '<div id="share">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>分享</a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '</div>';*/

            detailcourseButtonStr += '<div class="fixedbtn24 dibu1" >';
            detailcourseButtonStr += '<div class="dibu2" onclick=openPay("购买商品","精选全球好物","","","1","0","'+data.result.product.productTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","10","","1","0","'+data.result.isHuiYuan+'","'+data.result.product.id+'","'+data.result.product.createBy.id+'");>';
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-24 weui-tabbar__icon" id="iconshare"></i>购买</a>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div class="dibu3" >';
            detailcourseButtonStr += '<div onclick=openCommentList("commentDisList","2","1",10,"'+data.result.product.id+'","7","'+data.result.product.createBy.id+'"); class="dibu5">';

            if(setNum(data.result.product.commentNum) > 0){

                detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"><span class="weui-badge" style="position: absolute;top: .25em;right: -.4em;">'+setNum(data.result.product.commentNum)+'</span></i>';
            }else{
                detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"></i>';
            }

            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div onclick=dianji("7","'+data.result.product.id+'"); class="dibu5">';
            detailcourseButtonStr += '<i class="icon icon-65 weui-tabbar__icon" id="iconshare2"></i>';
            detailcourseButtonStr += '</div>';

          /*  detailcourseButtonStr += '<div onclick=zhuanfa("2","'+data.result.product.id+'","'+data.result.product.createBy.id+'","6"); class="dibu5">';
            detailcourseButtonStr += '<i class="icon icon-103 weui-tabbar__icon" id="iconshare3"></i>';
            detailcourseButtonStr += '</div>';*/

            detailcourseButtonStr += '<div onclick=shareJiajia(); class="dibu5">';
            detailcourseButtonStr += '<i class="icon icon-41 weui-tabbar__icon" id="iconshare4"><span class="weui-badge" style="position: absolute;top: .25em;right: -1em;">赚</span></i>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '</div>';
        }
        $("body").append(detailcourseButtonStr);

        //分享内容
        var sharecourseButtonStr = '';
        sharecourseButtonStr += '<div class="disnone" >';
        sharecourseButtonStr += '<center>';
        sharecourseButtonStr += '<div id="qrcodeCanvas"></div>';
        sharecourseButtonStr += '</center>';
        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '<div id="sharecontent" class="disnone" style="width: 100%;margin-bottom: 50px;background-image: url('+checkPathBackGroubdImage(localStorage.getItem("shareshoping"))+');background-repeat:no-repeat;background-size:cover;">';

        /* sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
         sharecourseButtonStr += '<span class="weui-loadmore__tips">封面</span>';
         sharecourseButtonStr += '</div>';*/

        sharecourseButtonStr += '<div class="page-bd-15 " style="text-align: center;">';
        sharecourseButtonStr += '<img class="getgold_top_head_img"  src="'+ checkPath(getFirstImageDetailContent(data.result.product.productImage),'1')+'" id="fengmainimagebase64" style="margin-top: 40px;height: 1px;width: 1px;border-radius:50%;">';
        /*sharecourseButtonStr += '<div class="weui-c-article"><p >'+data.result.tool.toolContent+'</p></div>';*/
        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;">';
        sharecourseButtonStr += '<h4 class="weui-c-title bottom5 f-white" >'+data.result.product.productTitle+'</h4>';

        //付费时候
        if(data.result.product.productPrice != null && data.result.product.productPrice > 0.00){
            sharecourseButtonStr += '<div class="nickname f-red"></div>';
        }

        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;margin-top: 430px;">';

        sharecourseButtonStr += '<div style="word-break:break-all;text-align: center;margin-top: 0px; "><p class="time  f-white"  id="fenxiangneirong" style="font-weight: 200;font-size:32px;"></p></div>';

        sharecourseButtonStr += '</div>';

        /*
                sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
                sharecourseButtonStr += '<span class="weui-loadmore__tips">扫码或长按识别查看精彩内容</span>';
                sharecourseButtonStr += '</div>';*/

        sharecourseButtonStr += '<div class="page-bd-15 " style="text-align: center;margin-top: 250px;">';
        sharecourseButtonStr += '<img  src="../../img/agent/images/bgp1.png" style="width: 80%;border-radius: 100px;margin-top: 40px;display:none;">';
        /*sharecourseButtonStr += '<div class="weui-c-article"><p >'+data.result.tool.toolContent+'</p></div>';*/
        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;margin-top: 0px;">';

        sharecourseButtonStr += '<div style="width: 100%;text-align: center;">';
        sharecourseButtonStr += '<img id="tothis" src="" style="width:30%;">';
        sharecourseButtonStr += '</div>';

        /*sharecourseButtonStr += '<div style="width: 100%;text-align: center;margin-top: -75px;">';
        if(data.result.user != null) {
            sharecourseButtonStr += '<img src="' + checkPath(data.result.user.headimgurl, "1") + '" id="headimagebase64" height="25px" width="25px" style="border-radius: 10px;"/>';
        }
        sharecourseButtonStr += '</div>';*/


        sharecourseButtonStr += '<div style="width: 100%;text-align: center;height: 50px;">';

        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '</div>';

        $("body").prepend(sharecourseButtonStr);
        $(document).ready(function() {

            qrCode("qrcodeCanvas",baseUrlFrontDefault+"myProductdetail.html?id="+data.result.product.id+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));

          /*  var url = Canvas2Image.convertToPNG($("canvas")[0],100,100).getAttribute('src');
            var img = $("#tothis");
            img.attr("src",url);*/

            //share是否存在-存在且相等则进行弹出渲染

            if(GetUrlString('share') != null && GetUrlString('share') != localStorage.getItem("userId")){//当前自己查看则不进行弹出分享
                localStorage.setItem("inUser",GetUrlString('share'));//推广进入
                localStorage.setItem("inUserDate",getNowFormatDate());//推广时间
            }
            if(GetUrlString('share') != null){
                //增加分享点击率
                updateDianjiliang();
            }
            if(getIsAPPLE()){
                getBase64ImageInServeice(checkPath(data.result.product.productImage,'1'),"fengmainimagebase64");
                if(data.result.user != null) {
                    getBase64ImageInServeice(checkPath(data.result.user.headimgurl, "1"), "headimagebase64");
                }

            }
            //如果超过一个星期则该用户推广锁定自动结束
            //alert(new Date("2019-03-02").getTime());
            //alert(new Date("2019-03-05").getTime());
            //alert(new Date("2019-03-03").getTime()-new Date("2019-03-02").getTime());
            //259200000-三天--86400000-一天
            if(localStorage.getItem("inUserDate") != null){//如果大于10天自动清除inUser
                if(new Date().getTime()-new Date(localStorage.getItem("inUserDate")).getTime() > 86400000 * dayInUser ){
                    localStorage.setItem("inUser",null);
                    localStorage.setItem("inUserDate",null);
                }
            }
            isguanzhu();//是否关注

        });

    }else{
        $.toast(data.msg, "text");
        if(data.code == '-1'){
            localStorage.setItem('token','');
            if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                isLogin('','');
            }
        }

    }
}
