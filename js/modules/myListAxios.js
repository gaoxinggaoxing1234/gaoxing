/*zqType 0 会员 1轮播消息 2信用卡 3贷款*/
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

function showMyIndex(url,renderId,datazq,renderType,zqType){


    instancezq({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: datazq,
        cancelToken: sourcezq.token
    }).then(function (rs) {
        console.log(rs.data.result)//数据在rs.data中  状态rs.status=200

        //数据处理
        if (rs.status = 200) {
            if ((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && zqType == '1') {
                $("#lunboxiaoxi").hide();

            }
            if ((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1') {
                $(".weui-toast--text").hide();$.toast("没有更多了", "text");
            } else {
                mylistzqRender(rs.data.result, renderId, renderType, zqType);

            }
        } else {
            console.log('listzq请求异常！')
        }
    });

}



/* 分页列表获取     zqType 0 会员 1轮播消息 2信用卡 3贷款*/

function showMyPagelist(url,renderId,pageSize,renderType,zqType){

    //分页
    var pageNoTemp = $("#showMyPagelist" + renderId  + "PageNo").val();
    if (pageNoTemp > 0) {
        $("#showMyPagelist" + renderId  +"PageNo").val(eval(pageNoTemp) + 1);
    } else {
        $("body").append("<input type='hidden' id='showMyPagelist" + renderId  + "PageNo' value='1' >");
    }

    var pageNo = $("#showMyPagelist" + renderId  + "PageNo").val();

    //传输数据
    var datazq = {
        "remarks": "",
        "pageSize": pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo": pageNo
    }



    instancezq({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: datazq,
        cancelToken: sourcezq.token
    }).then(function (rs) {
        console.log(rs.data.result)//数据在rs.data中  状态rs.status=200

        //数据处理
        if (rs.status = 200) {
            if ((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1') {
                $(".weui-toast--text").hide();$.toast("没有更多了", "text");

            } else {
                myPagelistzqRender(rs.data.result, renderId, renderType, zqType);

            }
        } else {
            console.log('listzq请求异常！')
        }
    });

}



// renderType 渲染处id类型   manyType 渲染处html属性类型
function mylistzqRender(result, renderId, renderType, manyType){
    var listRenderHtml="";

    if(result!=null){

    if(manyType=="0"){

        for(var i=0;i<result.length;i++){

            listRenderHtml+='<a  onclick=toHuiYuanDetail("'+result[i].id+'","1") >';
            listRenderHtml+='  <img src="../../img/huiyuan.gif" alt="">';
            listRenderHtml+='</a>';

        }
    } else if(manyType=="1"){

        for(var i=0;i<result.length;i++) {

            listRenderHtml +=  '<span onclick=toMediaDetail("'+result[i].id+'","1")> '+result[i].mediaTitle+'</span>';
        }
    }  else if(manyType=="2"){

        for(var i=0;i<result.length;i++){
            listRenderHtml+='<li>';
            listRenderHtml+=' <a onclick=toMyKadetail("'+result[i].id+'","1")  class="xyk-item">';
            listRenderHtml+='      <p>';
            listRenderHtml+='      <img src="'+result[i].remarks+'" alt="">';
            listRenderHtml+='      <span>'+result[i].kaCompany+'</span>';
            listRenderHtml+='     </p>';
            listRenderHtml+='     <h3 style="margin-top: 8px;margin-bottom: 5px;">'+result[i].kaTitle+'</h3>';
            if(localStorage.getItem("neibu")  == '1'){
                /*if(result[i].id != '22c5601561454da2914d38928cd4fd10'){
                    if(result[i].laxin == '1' && result[i].id){
                        if(localStorage.getItem("vip") == 'no'){
                            listRenderHtml+='      <span> '+getYongjinMoney2(setNum(result[i].vipshareAgent),result[i].sharePricetype)+'</span>&nbsp;<span style="font-size: 12px;">'+getYongjinMoneyBu(setNum(result[i].vipshareAgent),result[i].sharePricetype)+'+2</span>';

                        }else{
                            listRenderHtml+='      <span> '+getYongjinMoney(setNum(result[i].vipshareAgent),result[i].sharePricetype)+'</span>&nbsp;<span style="font-size: 12px;">'+getYongjinMoneyBu(setNum(result[i].vipshareAgent),result[i].sharePricetype)+'+2</span>';

                        }

                    }else{
                        listRenderHtml+='      <span> '+getYongjinMoney2(setNum(result[i].vipshareAgent),result[i].sharePricetype)+'</span>';

                    }
                }else{
                    listRenderHtml+='      <span>推荐一人注册即可 </span>';
                }
*/
            }else{
                if(result[i].id != '22c5601561454da2914d38928cd4fd10'){
                    if(result[i].laxin == '1' && result[i].id){
                        if(localStorage.getItem("vip") == 'no'){
                            listRenderHtml+='      <span> '+getYongjinMoney2(setNum(result[i].vipshareAgent),result[i].sharePricetype)+'</span>&nbsp;<span style="font-size: 12px;">'+getYongjinMoneyBu(setNum(result[i].vipshareAgent),result[i].sharePricetype)+'+2</span>';

                        }else{
                            listRenderHtml+='      <span> '+getYongjinMoney(setNum(result[i].vipshareAgent),result[i].sharePricetype)+'</span>&nbsp;<span style="font-size: 12px;">'+getYongjinMoneyBu(setNum(result[i].vipshareAgent),result[i].sharePricetype)+'+2</span>';

                        }

                    }else{
                        listRenderHtml+='      <span> '+getYongjinMoney2(setNum(result[i].vipshareAgent),result[i].sharePricetype)+'</span>';

                    }
                }else{
                    listRenderHtml+='      <span>推荐一人注册即可 </span>';
                }
            }


            listRenderHtml+='     <div> <div class="hang1">'+result[i].kaJiesuan+'</div>';
            if(result[i].kaLabel != null && result[i].kaLabel != ''){
                listRenderHtml+='     <div class="hang1" style="background-color: rgba(234,255,244,1);margin-left: 2px;color: #FF6666">'+result[i].kaLabel+'</div></div>';

            }else{
                listRenderHtml+='     </div>';

            }
            listRenderHtml+='       </a>';
            listRenderHtml+='       </li>';

        }

    }else if(manyType=="3"){
        for(var i=0;i<result.length;i++){
            listRenderHtml+='<li>';
            listRenderHtml+= '<a  onclick=toMyDaikuandetail("'+result[i].id+'","1")   class="dk-item">';
            listRenderHtml+='    <h3>'+result[i].daikuanTitle+'</h3>';
            if(result[i].daikuanQixian!=null &&result[i].daikuanQixian!=""){
                listRenderHtml+='     <span>'+result[i].daikuanQixian+'</span>';
            }
            //console.log("1=========="+result[i].vipshareAgent);
            //console.log("2==========="+result[i].sharePricetype)
            listRenderHtml+=' <div> <p>'+getYongjinMoney3(setNum(result[i].vipshareAgent),result[i].sharePricetype)+'</p> </div>';
            listRenderHtml+='  </a>';
            listRenderHtml+='  </li>';

        }

    }else if(manyType=="4"){
        for(var i=0;i<result.length;i++){
            listRenderHtml+='<li>';
            listRenderHtml+= '<a  onclick=toMyProductdetail("'+result[i].id+'","1")   class="dk-item">';
            listRenderHtml+='    <h3>'+result[i].productTitle+'</h3>';

           /* if(result[i].daikuanQixian!=null &&result[i].daikuanQixian!=""){
                listRenderHtml+='     <span>'+result[i].daikuanQixian+'</span>';
            }*/

            if(result[i].productLabel!=null &&result[i].productLabel!=""){
                listRenderHtml+='    <span>'+result[i].productLabel+'</span>';
            }
            if(result[i].vipshareAgent != null && result[i].vipshareAgent != '' && result[i].vipshareAgent != '0' && result[i].vipshareAgent != 0){

               // console.log("=========="+result[i].vipshareAgent);
               // console.log("==========="+result[i].sharePricetype)
                listRenderHtml+=' <div> <p>'+getYongjinMoney3(setNum(result[i].vipshareAgent),result[i].sharePricetype)+'</p> </div>';
            }else if(result[i].productType!=null &&result[i].productType!=""){
                //console.log("=========="+result[i].vipshareAgent);
                //console.log("==========="+result[i].sharePricetype)
                listRenderHtml+=' <div> <p>'+result[i].productType+'</p> </div>';
            }
            //console.log("=========="+result[i].vipshareAgent);
            //console.log("==========="+result[i].sharePricetype)


            listRenderHtml+='  </a>';
            listRenderHtml+='  </li>';

        }

    }
     }

    //获取列表数据renderType- 2执行html(),1执行append()渲染赋值
    if (renderType == '1') {
        $("#" + renderId + "").append(listRenderHtml);
    } else {
        $("#" + renderId + "").html(listRenderHtml);
    }

}




//分页列表渲染   renderType 渲染处id类型   manyType 渲染处html属性类型
function myPagelistzqRender(result, renderId, renderType, manyType){

    var listRenderHtml="";

    if(result!=null ){

    if(manyType=="1"){

        for(var i=0;i<result.length;i++){
            listRenderHtml+='<li>';
            listRenderHtml+='<a onclick=toMyProductdetail("'+result[i].id+'","1")  class="itemcre">';
            listRenderHtml+='<div class="up">';
            listRenderHtml+='<img src="'+result[i].productImage+'" alt="">';
            listRenderHtml+='<div class="text">';

            console.log()
            if(result[i].productTitle.length >12){
                listRenderHtml+='<h3 style="font-size:0.4rem;color:#444;margin-bottom: 0.1rem;">'+result[i].productTitle.slice(0,12)+'...</h3>';
            }else{
                listRenderHtml+='<h3 style="font-size:0.4rem;color:#444;margin-bottom: 0.1rem;">'+result[i].productTitle+'</h3>';
            }

            listRenderHtml+='<span class="change" style="font-size:0.48rem;color:#F45233;font-weight: 600;">￥ '+result[i].productPrice+'</span>';
            listRenderHtml+='</div>';
            listRenderHtml+='<span class="right">';
            listRenderHtml+=getYongjinMoney(setNum(result[i].vipshareAgent),result[i].sharePricetype);
            listRenderHtml+='</span>';
            listRenderHtml+='</div>';
            listRenderHtml+='<div class="tagscre">';
            if(result[i].productLabel!=null &&result[i].productLabel!=""){
                listRenderHtml+=' <span>'+result[i].productLabel+'</span>';
            }
            if(result[i].productType!=null &&result[i].productType!=""){
                listRenderHtml+=' <span>'+result[i].productType+'</span>';
            }

            listRenderHtml+=' </div>';
            listRenderHtml+=' </a>';
            listRenderHtml+='  </li>';

        }

    } else if(manyType=="2") {

        for(var i=0;i<result.length;i++){

            listRenderHtml+=' <li>';
            listRenderHtml+='    <a onclick=toMyKadetail("'+result[i].id+'","1") class="itemcre">';
            listRenderHtml+='      <div class="up">';
            listRenderHtml+='   <img src="'+result[i].remarks+'" alt="">';
            listRenderHtml+='   <div class="text">';
            listRenderHtml+='   <h3 style="font-size:0.4rem;color:#444">'+result[i].kaTitle+'</h3>';
            listRenderHtml+='   <span class="change" style="font-size:0.3rem">'+result[i].kaLabel+'</span>';
            listRenderHtml+='   </div>';
            listRenderHtml+='    <span class="right">';
            listRenderHtml+=getYongjinMoney(setNum(result[i].vipshareAgent),result[i].sharePricetype);
            listRenderHtml+='    </span>';
            listRenderHtml+='     </div>';
            listRenderHtml+='     <div class="tagscre">';

            if(result[i].kaJiesuan!=null &&result[i].kaJiesuan!=""){
                listRenderHtml+='     <span>'+result[i].kaJiesuan+'</span>';
            }
            if(result[i].kaCompany!=null &&result[i].kaCompany!=""){
                listRenderHtml+='    <span>'+result[i].kaCompany+'</span>';
            }
            listRenderHtml+=' </div>';
            listRenderHtml+=' </a>';
            listRenderHtml+='  </li>';

        }

    } else if(manyType=="3"){

        for(var i=0;i<result.length;i++){
            listRenderHtml+=' <li>';
            listRenderHtml+='<a onclick=toMyDaikuandetail("'+result[i].id+'","1")  class="itemdai">';
            listRenderHtml+='   <p><img src="'+result[i].daikuanImage+'" alt="">'+result[i].daikuanTitle+'</p>';
            listRenderHtml+=' <div>';
            listRenderHtml+='  <span class="price">'+result[i].daikuanEdu+'</span>';
            listRenderHtml+='   <i>额度（元）</i>';
            listRenderHtml+='  <span class="right">';

            listRenderHtml+=getYongjinMoney(setNum(result[i].vipshareAgent),result[i].sharePricetype) ;
            listRenderHtml+='    </span>';
            listRenderHtml+='   </div>';
            listRenderHtml+='    <span class="tagsdai">';
            if(result[i].daikuanJiesuan!=null &&result[i].daikuanJiesuan!=""){
                listRenderHtml+='    <span>'+result[i].daikuanJiesuan+'</span>';
            }
            if(result[i].daikuanLilv!=null &&result[i].daikuanLilv!=""){
                listRenderHtml+='   <span>'+result[i].daikuanLilv+'</span>';
            }
            listRenderHtml+='  </span>';
            listRenderHtml+='  </a>';
            listRenderHtml+=' </li>';

        }

    }else if(manyType=="4"){

        for(var i=0;i<result.length;i++){
            listRenderHtml+=' <li>';
            listRenderHtml+='<a onclick=toMyDaikuandetail("'+result[i].id+'","1")  class="itemdai">';
            listRenderHtml+='   <p><img src="'+result[i].productImage+'" alt="">'+result[i].productTitle+'</p>';
            listRenderHtml+=' <div>';
            listRenderHtml+='  <span class="price">'+result[i].daikuanEdu+'</span>';
            listRenderHtml+='   <i>额度（元）</i>';
            listRenderHtml+='  <span class="right">';

            listRenderHtml+=getYongjinMoney(setNum(result[i].vipshareAgent),result[i].sharePricetype) ;
            listRenderHtml+='    </span>';
            listRenderHtml+='   </div>';
            listRenderHtml+='    <span class="tagsdai">';
            if(result[i].productLabel!=null &&result[i].productLabel!=""){
                listRenderHtml+='    <span>'+result[i].productLabel+'</span>';
            }
            if(result[i].vipshareAgent != null && result[i].vipshareAgent != '' && result[i].vipshareAgent != '0' && result[i].vipshareAgent != 0){

            }else if(result[i].productType!=null &&result[i].productType!=""){
                listRenderHtml+='   <span>'+result[i].productType+'</span>';
            }
            listRenderHtml+='  </span>';
            listRenderHtml+='  </a>';
            listRenderHtml+=' </li>';

        }

    }

    }

    //获取列表数据renderType- 2执行html(),1执行append()渲染赋值
    if (renderType == '1') {
        $("#" + renderId + "").append(listRenderHtml);
    } else {
        $("#" + renderId + "").html(listRenderHtml);
    }

}