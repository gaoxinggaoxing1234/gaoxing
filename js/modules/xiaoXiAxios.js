var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost";//本地模式
}
//文件请求URL
var baseFileUrlxiaoXi = ''+basehost+'';
//请求实例
var instancexiaoXi = axios.create({
  baseURL: ''+basehost+'/sfd/a/api/',
  timeout: 180000,
  headers: {'token': localStorage.getItem('token')}
});

//取消请求
var CancelTokenxiaoXi = axios.CancelToken;
var sourcexiaoXi = CancelTokenxiaoXi.source();

// 添加请求拦截器
instancexiaoXi.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        sourcexiaoXi.cancel();
    }
   sessionStorage.clear();return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instancexiaoXi.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


function liaotian(){
    //参数
    var id = GetUrlString('id');
    var token = localStorage.getItem("token");
    //传输数据
    var dataxiaoXi = {
        "popenId":id,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancexiaoXi({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/tochat',
        data: dataxiaoXi,
        cancelToken: sourcexiaoXi.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                console.log("rs.data.result.id=============="+rs.data.result.id)
                toShifenliaoDetail(rs.data.result.id,"1");
            }
        }
    });


}

function liaotianbd(){
    //参数
    var id = $('#nowId').val();
    var token = localStorage.getItem("token");
    //传输数据
    var dataxiaoXi = {
        "popenId":id,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancexiaoXi({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/tochat',
        data: dataxiaoXi,
        cancelToken: sourcexiaoXi.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                console.log("rs.data.result.id=============="+rs.data.result.id)
                toShifenliaoDetail(rs.data.result.id,"1");
            }
        }
    });


}


function liaotiankefu(){
    //参数
    var id = '2';
    var token = localStorage.getItem("token");
    //传输数据
    var dataxiaoXi = {
        "popenId":id,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancexiaoXi({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/tochat',
        data: dataxiaoXi,
        cancelToken: sourcexiaoXi.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //console.log("rs.data.result.id=============="+rs.data.result.id)
                toShifenliaoDetail(rs.data.result.id,"1");
            }
        }
    });


}

//上划获取前面的记录


//第一次进入获取当前最新10条记录

//3秒更新一次最新记录--按照时间

//两个记录值：更新时间值--改变，历史记录时间值--不改变

//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染
function listxiaoXi(renderId,renderType,pageSize,manyType){
        if($("#weilaishijianflag").val() != '1'){
            //分页
            var pageNoTemp = $("#listxiaoXi"+manyType+"PageNo").val();
            if(pageNoTemp > 0){
               $("#listxiaoXi"+manyType+"PageNo").val(eval(pageNoTemp) + 1);
            }else{
               $("body").append("<input type='hidden' id='listxiaoXi"+manyType+"PageNo' value='1' >");
            }
            var width = document.body.clientWidth*0.6;
           // console.log(width*0.6)//数据在rs.data中  状态rs.status=200
           // console.log(width)//数据在rs.data中  状态rs.status=200
            //参数-manyType--需要手动处理对应字段
            var qunId =  GetUrlString('id');
            /*var messageType = $("#messageType").val();
            var messageFile = $("#messageFile").val();
            var messageLink = $("#messageLink").val();
            var linkType = $("#linkType").val();
            var messageContent = $("#messageContent").val();
            var isRead = $("#isRead").val();
            var xiaoxiStatus = $("#xiaoxiStatus").val();*/
            var pageNo = $("#listxiaoXi"+manyType+"PageNo").val();
            var beginCreateDate = null;
            var endCreateDate = null;
            if(manyType == '1' ){//第一次进来-默认获取最新的10条记录及获取历史记录
                beginCreateDate = '2019-01-01 01:01:01';
                endCreateDate = $("#lishishijian").val();

            }else if(manyType == '2' ){//获取最新信息
                beginCreateDate = $("#weilaishijian").val();
                endCreateDate = '2032-01-01 01:01:01';
                pageNo = 1;
                $("#weilaishijianflag").val("1");
            }

            //参数
            var token = localStorage.getItem("token");
            //传输数据
            var dataxiaoXi = {
                "start":beginCreateDate,
                "end":endCreateDate,
                "qunId":qunId,
                "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
                "token":token,
                "pageSize":pageSize,
                "pageNo":pageNo
            }

            instancexiaoXi({
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                },//设置跨域请求头
                method: 'post',
                url: '/sfl/xiaoxi/xiaoXi/list',
                data: dataxiaoXi,
                cancelToken: sourcexiaoXi.token
            }) .then(function(rs){
                //console.log(rs)//数据在rs.data中  状态rs.status=200
                //数据处理
                if(rs.status=200){

                    gettime();//获取时间
                    if( (rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '3' && manyType != '2' ){
                        //$(".weui-toast--text").hide();$.toast("没有更多了", "text");
                    }else{
                        listxiaoXiRender(rs.data,renderId,renderType);
                    }
                    getQunName();

                }else{
                    console.log('listxiaoXi请求异常！')
                }
            });
        }
	}

//列表渲染
function listxiaoXiRender(data,renderId,renderType){
      var listxiaoXiStr = '';
      var userId = localStorage.getItem("userId");
      if(data.code == '0'){

        $.each(data.result,function(i,item){

            if(i == 0){
                if($("#lishishijian").val() == null || $("#lishishijian").val() == ''){
                    $("#lishishijian").val(item.updateDate);
                }
            }

　　　　	//console.log(i, item);
		//渲染内容处理
            if((item.messageType == '1' || item.messageType == '0') && $("#"+item.id+"").size() == 0){//图文消息
                if( userId == item.createBy.id){//右侧
                    listxiaoXiStr += '<li class="weui-news-item" id="'+item.id+'">';
                    listxiaoXiStr += '<div class="weui-news-inner">';
                    listxiaoXiStr += '<div class="weui-news-inners">';
                    listxiaoXiStr += '<div class="weui-news-text" >';
                    listxiaoXiStr += '<div class="weui-news-title  rightnorow">';

                    if(item.messageFile != null  && item.messageFile != '' &&  item.messageContent != null  && item.messageContent != '') {
                        listxiaoXiStr += '<div class="weui-news-info nickname">';
                        listxiaoXiStr += '<div class="weui-news-infoitem "  >';
                        listxiaoXiStr += '</div>';
                        listxiaoXiStr += '<div class=" chattextstyle  huanhang">';
                        listxiaoXiStr += '<p>' + urlFenxi(item.messageContent) + '</p>';
                        listxiaoXiStr += '</div>';
                        listxiaoXiStr += ' </div>';
                    }


                    listxiaoXiStr += '<div class="weui-news-info nickname">';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '</div>';
                    if(item.messageFile != null  && item.messageFile != ''){
                        listxiaoXiStr += '<div class="weui-news-infoitem chatmediastyle  huanhang" >';
                        listxiaoXiStr += '<div class="width200">';
                        listxiaoXiStr += '<div class="page-bd " >';
                        listxiaoXiStr += '<div class="weui-feeds">';
                        listxiaoXiStr += '<ul>';
                        listxiaoXiStr += ''+getImageChatContent(item.id,item.messageFile)+'';
                        listxiaoXiStr += '</ul>';
                        listxiaoXiStr += '</div>';
                        listxiaoXiStr += '</div>';

                        listxiaoXiStr += '</div>';

                    }else{

                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang " >';
                        listxiaoXiStr += '<p>';
                        listxiaoXiStr += ''+urlFenxi(item.messageContent)+'';
                        listxiaoXiStr += '</p>';
                    }


                    listxiaoXiStr += '</div>';


                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-info nickname rightnorow">';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '<span class="weui-news-left sloganchat">'+timeago(item.createDate)+'</span>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div onclick=toUserHome("' + item.createBy.id + '","1") class="weui-news-media squaresmall shadowonly" style="background-image:url(' + checkPathBackGroubdImage(item.createBy.headimgurl, "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                    if(item.userLevel != null  && item.userLevel != '' ){
                        listxiaoXiStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.userLevel)+'</span>';
                    }

                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</li>';



                }else{//左侧

                    listxiaoXiStr += '<li class="weui-news-item" id="'+item.id+'">';
                    listxiaoXiStr += '<div class="weui-news-inner">';

                    listxiaoXiStr += '<div onclick=toUserHome("' + item.createBy.id + '","1") class="weui-news-media squaresmall shadowonly" style="background-image:url(' + checkPathBackGroubdImage(item.createBy.headimgurl, "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                    if(item.userLevel != null  && item.userLevel != '' ){
                        listxiaoXiStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.userLevel)+'</span>';
                    }
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-inners">';
                    listxiaoXiStr += '<div class="weui-news-text">';
                    listxiaoXiStr += '<div class="weui-news-title  leftnorow">';

                    if(item.messageFile != null  && item.messageFile != '' &&  item.messageContent != null  && item.messageContent != '') {
                        listxiaoXiStr += '<div class="weui-news-info nickname">';

                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang">';
                        listxiaoXiStr += '<p>' + urlFenxi(item.messageContent) + '</p>';
                        listxiaoXiStr += '</div>';

                        listxiaoXiStr += '<div class="weui-news-infoitem "  >';
                        listxiaoXiStr += '</div>';

                        listxiaoXiStr += ' </div>';
                    }

                    listxiaoXiStr += '<div class="weui-news-info nickname">';


                    if(item.messageFile != null && item.messageFile != ''){
                        listxiaoXiStr += '<div class="weui-news-infoitem chatmediastyle  huanhang" >';
                        listxiaoXiStr += '<div class="width200">';
                        listxiaoXiStr += '<div class="page-bd" >';
                        listxiaoXiStr += '<div class="weui-feeds">';
                        listxiaoXiStr += '<ul>';
                        listxiaoXiStr += ''+getImageChatContent(item.id,item.messageFile)+'';
                        listxiaoXiStr += '</ul>';
                        listxiaoXiStr += '</div>';
                        listxiaoXiStr += '</div>';

                        listxiaoXiStr += '</div>';

                    }else{
                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang" >';
                        listxiaoXiStr += '<p>';
                        listxiaoXiStr += ''+urlFenxi(item.messageContent)+'';
                        listxiaoXiStr += '</p>';
                    }

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';

                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';


                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-info nickname">';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '<span class="weui-news-left sloganchatleft">'+timeago(item.createDate)+'</span>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</li>';

                }

            }else if(item.messageType == '2' && $("#"+item.id+"").size() == 0){//音频
                if( userId == item.createBy.id){//右侧
                    listxiaoXiStr += '<li class="weui-news-item" id="'+item.id+'">';
                    listxiaoXiStr += '<div class="weui-news-inner">';
                    listxiaoXiStr += '<div class="weui-news-inners">';
                    listxiaoXiStr += '<div class="weui-news-text">';
                    listxiaoXiStr += '<div class="weui-news-title  rightnorow">';

                    if(item.messageFile != null  && item.messageFile != '' &&  item.messageContent != null  && item.messageContent != '') {
                        listxiaoXiStr += '<div class="weui-news-info nickname">';
                        listxiaoXiStr += '<div class="weui-news-infoitem "  >';
                        listxiaoXiStr += '</div>';
                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang">';
                        listxiaoXiStr += '<p>' + urlFenxi(item.messageContent) + '</p>';
                        listxiaoXiStr += '</div>';
                        listxiaoXiStr += ' </div>';
                    }

                    listxiaoXiStr += '<div class="weui-news-info nickname">';


                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '</div>';

                    if(item.messageFile != null  && item.messageFile != ''){
                        listxiaoXiStr += '<div class="weui-news-infoitem chatmediastyle  huanhang" >';
                        listxiaoXiStr += '<div>';

                        //音频--隐藏原始播放器
                        listxiaoXiStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.messageFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
                        listxiaoXiStr += '<div class="audio"   >';
                        listxiaoXiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
                        listxiaoXiStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                        listxiaoXiStr += '</div>';
                        listxiaoXiStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
                        listxiaoXiStr += '</div>';

                        listxiaoXiStr += '</div>';

                    }else{
                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang" >';
                        listxiaoXiStr += '<p>';
                        listxiaoXiStr += ''+urlFenxi(item.messageContent)+'';
                        listxiaoXiStr += '</p>';
                    }


                    listxiaoXiStr += '</div>';


                    listxiaoXiStr += '</div>';


                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-info nickname rightnorow">';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '<span class="weui-news-left sloganchat">'+timeago(item.createDate)+'</span>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div onclick=toUserHome("' + item.createBy.id + '","1") class="weui-news-media squaresmall shadowonly" style="background-image:url(' + checkPathBackGroubdImage(item.createBy.headimgurl, "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                    if(item.userLevel != null  && item.userLevel != '' ){
                        listxiaoXiStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.userLevel)+'</span>';
                    }

                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</li>';

                }else{//左侧
                    listxiaoXiStr += '<li class="weui-news-item" id="'+item.id+'" >';
                    listxiaoXiStr += '<div class="weui-news-inner">';

                    listxiaoXiStr += '<div onclick=toUserHome("' + item.createBy.id + '","1") class="weui-news-media squaresmall shadowonly" style="background-image:url(' + checkPathBackGroubdImage(item.createBy.headimgurl, "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                    if(item.userLevel != null  && item.userLevel != '' ){
                        listxiaoXiStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.userLevel)+'</span>';
                    }
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-inners">';
                    listxiaoXiStr += '<div class="weui-news-text">';
                    listxiaoXiStr += '<div class="weui-news-title  leftnorow">';

                    if(item.messageFile != null  && item.messageFile != '' &&  item.messageContent != null  && item.messageContent != '') {
                        listxiaoXiStr += '<div class="weui-news-info nickname">';



                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang">';
                        listxiaoXiStr += '<p>' + urlFenxi(item.messageContent) + '</p>';
                        listxiaoXiStr += '</div>';

                        listxiaoXiStr += '<div class="weui-news-infoitem "  >';
                        listxiaoXiStr += '</div>';

                        listxiaoXiStr += ' </div>';
                    }

                    listxiaoXiStr += '<div class="weui-news-info nickname">';


                    if(item.messageFile != null  && item.messageFile != ''){
                        listxiaoXiStr += '<div class="weui-news-infoitem chatmediastyle  huanhang" >';
                        listxiaoXiStr += '<div>';

                        //音频--隐藏原始播放器
                        listxiaoXiStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.messageFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
                        listxiaoXiStr += '<div class="audio"   >';
                        listxiaoXiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
                        listxiaoXiStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                        listxiaoXiStr += '</div>';
                        listxiaoXiStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
                        listxiaoXiStr += '</div>';

                        listxiaoXiStr += '</div>';

                    }else{
                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang" >';
                        listxiaoXiStr += '<p>';
                        listxiaoXiStr += ''+urlFenxi(item.messageContent)+'';
                        listxiaoXiStr += '</p>';
                    }

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';

                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';


                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-info nickname">';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '<span class="weui-news-left sloganchatleft">'+timeago(item.createDate)+'</span>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</li>';

                }

            }else if(item.messageType == '3' && $("#"+item.id+"").size() == 0){//视频

                if( userId == item.createBy.id){//右侧
                    listxiaoXiStr += '<li class="weui-news-item" id="'+item.id+'">';
                    listxiaoXiStr += '<div class="weui-news-inner">';
                    listxiaoXiStr += '<div class="weui-news-inners">';
                    listxiaoXiStr += '<div class="weui-news-text">';
                    listxiaoXiStr += '<div class="weui-news-title  rightnorow">';

                    if(item.messageFile != null  && item.messageFile != '' &&  item.messageContent != null  && item.messageContent != '') {
                        listxiaoXiStr += '<div class="weui-news-info nickname">';
                        listxiaoXiStr += '<div class="weui-news-infoitem "  >';
                        listxiaoXiStr += '</div>';
                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang">';
                        listxiaoXiStr += '<p>' + urlFenxi(item.messageContent) + '</p>';
                        listxiaoXiStr += '</div>';
                        listxiaoXiStr += ' </div>';
                    }


                    listxiaoXiStr += '<div class="weui-news-info nickname">';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '</div>';
                    if(item.messageFile != null  && item.messageFile != ''){
                        listxiaoXiStr += '<div class="weui-news-infoitem chatmediastyle  huanhang" >';
                        listxiaoXiStr += '<div>';
                        <!--视频播放-->
                        listxiaoXiStr += '<div class="page-bd"><div class="weui-c-article">';
                        listxiaoXiStr += '<div id="dplayer2'+item.id+'" ></div>';
                        listxiaoXiStr += '<script type="text/javascript">';
                        listxiaoXiStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.messageFile,"3")+'\', pic: \''+videoImagePath(item.messageFile)+'\'}});';

                        listxiaoXiStr += '</script>';
                        listxiaoXiStr += '</div></div>';

                        listxiaoXiStr += '</div>';

                    }else{
                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang" >';
                        listxiaoXiStr += '<p>';
                        listxiaoXiStr += ''+urlFenxi(item.messageContent)+'';
                        listxiaoXiStr += '</p>';
                    }


                    listxiaoXiStr += '</div>';


                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-info nickname rightnorow">';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '<span class="weui-news-left sloganchat">'+timeago(item.createDate)+'</span>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div onclick=toUserHome("' + item.createBy.id + '","1") class="weui-news-media squaresmall shadowonly" style="background-image:url(' + checkPathBackGroubdImage(item.createBy.headimgurl, "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                    if(item.userLevel != null  && item.userLevel != '' ){
                        listxiaoXiStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.userLevel)+'</span>';
                    }

                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</li>';

                }else{//左侧
                    listxiaoXiStr += '<li class="weui-news-item" id="'+item.id+'">';
                    listxiaoXiStr += '<div class="weui-news-inner">';

                    listxiaoXiStr += '<div onclick=toUserHome("' + item.createBy.id + '","1") class="weui-news-media squaresmall shadowonly" style="background-image:url(' + checkPathBackGroubdImage(item.createBy.headimgurl, "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                    if(item.userLevel != null  && item.userLevel != '' ){
                        listxiaoXiStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.userLevel)+'</span>';
                    }
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-inners">';
                    listxiaoXiStr += '<div class="weui-news-text">';
                    listxiaoXiStr += '<div class="weui-news-title  leftnorow">';

                    if(item.messageFile != null  && item.messageFile != '' &&  item.messageContent != null  && item.messageContent != '') {
                        listxiaoXiStr += '<div class="weui-news-info nickname">';

                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang">';
                        listxiaoXiStr += '<p>' + urlFenxi(item.messageContent) + '</p>';
                        listxiaoXiStr += '</div>';

                        listxiaoXiStr += '<div class="weui-news-infoitem "  >';
                        listxiaoXiStr += '</div>';

                        listxiaoXiStr += ' </div>';
                    }


                    listxiaoXiStr += '<div class="weui-news-info nickname">';

                    if(item.messageFile != null  && item.messageFile != ''){
                        listxiaoXiStr += '<div class="weui-news-infoitem chatmediastyle  huanhang" >';
                        listxiaoXiStr += '<div>';
                        <!--视频播放-->
                        listxiaoXiStr += '<div class="page-bd"><div class="weui-c-article">';
                        listxiaoXiStr += '<div id="dplayer2'+item.id+'" ></div>';
                        listxiaoXiStr += '<script type="text/javascript">';
                        listxiaoXiStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.messageFile,"3")+'\', pic: \''+videoImagePath(item.messageFile)+'\'}});';

                        listxiaoXiStr += '</script>';
                        listxiaoXiStr += '</div></div>';

                        listxiaoXiStr += '</div>';

                    }else{
                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang" >';
                        listxiaoXiStr += '<p>';
                        listxiaoXiStr += ''+urlFenxi(item.messageContent)+'';
                        listxiaoXiStr += '</p>';
                    }

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';

                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';


                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-info nickname">';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '<span class="weui-news-left sloganchatleft">'+timeago(item.createDate)+'</span>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</li>';

                }
            }else if(item.messageType == '4' && $("#"+item.id+"").size() == 0){//文件
                if( userId == item.createBy.id){//右侧
                    listxiaoXiStr += '<li class="weui-news-item" id="'+item.id+'">';
                    listxiaoXiStr += '<div class="weui-news-inner">';
                    listxiaoXiStr += '<div class="weui-news-inners">';
                    listxiaoXiStr += '<div class="weui-news-text">';
                    listxiaoXiStr += '<div class="weui-news-title  rightnorow">';



                    if(item.messageFile != null  && item.messageFile != '' &&  item.messageContent != null  && item.messageContent != '') {
                        listxiaoXiStr += '<div class="weui-news-info nickname">';
                        listxiaoXiStr += '<div class="weui-news-infoitem "  >';
                        listxiaoXiStr += '</div>';
                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang">';
                        listxiaoXiStr += '<p>' + urlFenxi(item.messageContent) + '</p>';
                        listxiaoXiStr += '</div>';
                        listxiaoXiStr += ' </div>';
                    }

                    listxiaoXiStr += '<div class="weui-news-info nickname">';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '</div>';
                    if(item.messageFile != null  && item.messageFile != ''){
                        listxiaoXiStr += '<div class="weui-news-infoitem chatmediastyle  huanhang" >';
                        listxiaoXiStr += '<div class="width200">';



                        //文件--判断文件类型展示不同的图片
                        if(item.messageFile.search(".jpeg") != -1 || item.messageFile.search(".jpg") != -1 || item.messageFile.search(".png") != -1 || item.messageFile.search(".gif") != -1 || item.messageFile.search(".GIF") != -1 ){


                            listxiaoXiStr += '<div class="page-bd" >';
                            listxiaoXiStr += '<div class="weui-feeds">';
                            listxiaoXiStr += '<ul>';
                            listxiaoXiStr += ''+getImageChatContent(item.id,item.messageFile)+'';
                            listxiaoXiStr += '</ul>';
                            listxiaoXiStr += '</div>';
                            listxiaoXiStr += '</div>';


                        }else if( item.messageFile.search(".mp4") != -1 || item.messageFile.search(".MP4") != -1 || item.messageFile.search(".flv")  != -1 || item.messageFile.search(".mov")  != -1 ){
                            <!--视频播放-->
                            listxiaoXiStr += '<div class="page-bd"><div class="weui-c-article">';
                            listxiaoXiStr += '<div id="dplayer2'+item.id+'" ></div>';
                            listxiaoXiStr += '<script type="text/javascript">';
                            listxiaoXiStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.messageFile,"3")+'\', pic: \''+videoImagePath(item.messageFile)+'\'}});';
                            listxiaoXiStr += '</script>';
                            listxiaoXiStr += '</div></div>';



                        }else if( item.messageFile.search(".MP3") != -1 || item.messageFile.search(".mp3") != -1 || item.messageFile.search(".wav")  != -1 || item.messageFile.search(".ogg")  != -1 ){
                            //音频--隐藏原始播放器
                            listxiaoXiStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.messageFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
                            listxiaoXiStr += '<div class="audio"   >';
                            listxiaoXiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
                            listxiaoXiStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                            listxiaoXiStr += '</div>';
                            listxiaoXiStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
                            listxiaoXiStr += '</div>';
                        }else{
                            listxiaoXiStr += '<a href="'+ checkPath(item.messageFile,'3')+'" target="_blank">'+setNULL(getFileName(item.messageFile))+'</a>';

                        }



                        listxiaoXiStr += '</div>';

                    }else{
                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang" >';
                        listxiaoXiStr += '<p>';
                        listxiaoXiStr += ''+urlFenxi(item.messageContent)+'';
                        listxiaoXiStr += '</p>';
                    }


                    listxiaoXiStr += '</div>';


                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-info nickname rightnorow">';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '<span class="weui-news-left sloganchat">'+timeago(item.createDate)+'</span>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div onclick=toUserHome("' + item.createBy.id + '","1") class="weui-news-media squaresmall shadowonly" style="background-image:url(' + checkPathBackGroubdImage(item.createBy.headimgurl, "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                    if(item.userLevel != null  && item.userLevel != '' ){
                        listxiaoXiStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.userLevel)+'</span>';
                    }

                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</li>';

                }else{//左侧
                    listxiaoXiStr += '<li class="weui-news-item" id="'+item.id+'">';
                    listxiaoXiStr += '<div class="weui-news-inner">';

                    listxiaoXiStr += '<div onclick=toUserHome("' + item.createBy.id + '","1") class="weui-news-media squaresmall shadowonly" style="background-image:url(' + checkPathBackGroubdImage(item.createBy.headimgurl, "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                    if(item.userLevel != null  && item.userLevel != '' ){
                        listxiaoXiStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.userLevel)+'</span>';
                    }
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-inners">';
                    listxiaoXiStr += '<div class="weui-news-text">';
                    listxiaoXiStr += '<div class="weui-news-title  leftnorow">';

                    if(item.messageFile != null  && item.messageFile != '' &&  item.messageContent != null  && item.messageContent != '') {
                        listxiaoXiStr += '<div class="weui-news-info nickname">';

                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang">';
                        listxiaoXiStr += '<p>' + urlFenxi(item.messageContent) + '</p>';
                        listxiaoXiStr += '</div>';

                        listxiaoXiStr += '<div class="weui-news-infoitem "  >';
                        listxiaoXiStr += '</div>';

                        listxiaoXiStr += ' </div>';
                    }


                    listxiaoXiStr += '<div class="weui-news-info nickname">';


                    if(item.messageFile != null  && item.messageFile != ''){
                        listxiaoXiStr += '<div class="weui-news-infoitem chatmediastyle  huanhang" >';
                        listxiaoXiStr += '<div class="width200">';

                        //文件--判断文件类型展示不同的图片
                        if(item.messageFile.search(".jpeg") != -1 || item.messageFile.search(".jpg") != -1 || item.messageFile.search(".png") != -1 || item.messageFile.search(".gif") != -1 || item.messageFile.search(".GIF") != -1 ){


                            listxiaoXiStr += '<div class="page-bd" >';
                            listxiaoXiStr += '<div class="weui-feeds">';
                            listxiaoXiStr += '<ul>';
                            listxiaoXiStr += ''+getImageChatContent(item.id,item.messageFile)+'';
                            listxiaoXiStr += '</ul>';
                            listxiaoXiStr += '</div>';
                            listxiaoXiStr += '</div>';


                        }else if( item.messageFile.search(".mp4") != -1 || item.messageFile.search(".MP4") != -1 || item.messageFile.search(".flv")  != -1 || item.messageFile.search(".mov")  != -1 ){
                            <!--视频播放-->
                            listxiaoXiStr += '<div class="page-bd"><div class="weui-c-article">';
                            listxiaoXiStr += '<div id="dplayer2'+item.id+'" ></div>';
                            listxiaoXiStr += '<script type="text/javascript">';
                            listxiaoXiStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.messageFile,"3")+'\', pic: \''+videoImagePath(item.messageFile)+'\'}});';
                            listxiaoXiStr += '</script>';
                            listxiaoXiStr += '</div></div>';



                        }else if( item.messageFile.search(".MP3") != -1 || item.messageFile.search(".mp3") != -1 || item.messageFile.search(".wav")  != -1 || item.messageFile.search(".ogg")  != -1 ){
                            //音频--隐藏原始播放器
                            listxiaoXiStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.messageFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
                            listxiaoXiStr += '<div class="audio"   >';
                            listxiaoXiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
                            listxiaoXiStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                            listxiaoXiStr += '</div>';
                            listxiaoXiStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
                            listxiaoXiStr += '</div>';
                        }else{
                            listxiaoXiStr += '<a href="'+ checkPath(item.messageFile,'3')+'" target="_blank">'+setNULL(getFileName(item.messageFile))+'</a>';

                        }

                        listxiaoXiStr += '</div>';

                    }else{
                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang" >';
                        listxiaoXiStr += '<p>';
                        listxiaoXiStr += ''+urlFenxi(item.messageContent)+'';
                        listxiaoXiStr += '</p>';
                    }

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';

                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';


                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-info nickname">';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '<span class="weui-news-left sloganchatleft">'+timeago(item.createDate)+'</span>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</li>';

                }

            }else if(item.messageType == '5' && $("#"+item.id+"").size() == 0){//红包
                if( userId == item.createBy.id){//右侧
                    listxiaoXiStr += '<li class="weui-news-item"  id="'+item.id+'">';
                    listxiaoXiStr += '<div class="weui-news-inner">';
                    listxiaoXiStr += '<div class="weui-news-inners">';
                    listxiaoXiStr += '<div class="weui-news-text">';
                    listxiaoXiStr += '<div class="weui-news-title  rightnorow">';

                    if(item.messageFile != null  && item.messageFile != '' &&  item.messageContent != null  && item.messageContent != '') {
                        listxiaoXiStr += '<div class="weui-news-info nickname">';
                        listxiaoXiStr += '<div class="weui-news-infoitem "  >';
                        listxiaoXiStr += '</div>';
                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang">';
                        listxiaoXiStr += '<p>' + urlFenxi(item.messageContent) + '</p>';
                        listxiaoXiStr += '</div>';
                        listxiaoXiStr += ' </div>';
                    }


                    listxiaoXiStr += '<div class="weui-news-info nickname">';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '</div>';
                    if(item.messageFile != null  && item.messageFile != ''){
                        listxiaoXiStr += '<div class="weui-news-infoitem chatmediastyle  huanhang" >';
                        listxiaoXiStr += '<div>';
                        listxiaoXiStr += '<div class="weui-feeds"><img onclick=toHongBaoDetail("'+item.messageLink+'","1");  width="173px" height="286px" src="'+ checkPath(item.messageFile,'1')+'"></div>';

                        listxiaoXiStr += '</div>';

                    }else{
                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang" >';
                        listxiaoXiStr += '<p>';
                        listxiaoXiStr += ''+urlFenxi(item.messageContent)+'';
                        listxiaoXiStr += '</p>';
                    }


                    listxiaoXiStr += '</div>';


                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-info nickname rightnorow">';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '<span class="weui-news-left sloganchat">'+timeago(item.createDate)+'</span>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div onclick=toUserHome("' + item.createBy.id + '","1") class="weui-news-media squaresmall shadowonly" style="background-image:url(' + checkPathBackGroubdImage(item.createBy.headimgurl, "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                    if(item.userLevel != null  && item.userLevel != '' ){
                        listxiaoXiStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.userLevel)+'</span>';
                    }

                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</li>';

                }else{//左侧
                    listxiaoXiStr += '<li class="weui-news-item" id="'+item.id+'">';
                    listxiaoXiStr += '<div class="weui-news-inner">';

                    listxiaoXiStr += '<div onclick=toUserHome("' + item.createBy.id + '","1") class="weui-news-media squaresmall shadowonly" style="background-image:url(' + checkPathBackGroubdImage(item.createBy.headimgurl, "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                    if(item.userLevel != null  && item.userLevel != '' ){
                        listxiaoXiStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.userLevel)+'</span>';
                    }
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-inners">';
                    listxiaoXiStr += '<div class="weui-news-text">';
                    listxiaoXiStr += '<div class="weui-news-title  leftnorow">';


                    if(item.messageFile != null  && item.messageFile != '' &&  item.messageContent != null  && item.messageContent != '') {
                        listxiaoXiStr += '<div class="weui-news-info nickname">';

                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang">';
                        listxiaoXiStr += '<p>' + urlFenxi(item.messageContent) + '</p>';
                        listxiaoXiStr += '</div>';

                        listxiaoXiStr += '<div class="weui-news-infoitem "  >';
                        listxiaoXiStr += '</div>';


                        listxiaoXiStr += ' </div>';
                    }


                    listxiaoXiStr += '<div class="weui-news-info nickname">';


                    if(item.messageFile != null  && item.messageFile != ''){
                        listxiaoXiStr += '<div class="weui-news-infoitem chatmediastyle  huanhang" >';
                        listxiaoXiStr += '<div>';
                        listxiaoXiStr += '<div class="weui-feeds"><img onclick=toHongBaoDetail("'+item.messageLink+'","1");  width="173px" height="286px" src="'+ checkPath(item.messageFile,'1')+'"></div>';

                        listxiaoXiStr += '</div>';

                    }else{
                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang" >';
                        listxiaoXiStr += '<p>';
                        listxiaoXiStr += ''+urlFenxi(item.messageContent)+'';
                        listxiaoXiStr += '</p>';
                    }

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';

                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';


                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-info nickname">';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '<span class="weui-news-left sloganchatleft">'+timeago(item.createDate)+'</span>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</li>';

                }

            }else if(item.messageType == '6' && $("#"+item.id+"").size() == 0){//链接
                if( userId == item.createBy.id){//右侧
                    listxiaoXiStr += '<li class="weui-news-item" id="'+item.id+'">';
                    listxiaoXiStr += '<div class="weui-news-inner">';
                    listxiaoXiStr += '<div class="weui-news-inners">';
                    listxiaoXiStr += '<div class="weui-news-text">';
                    listxiaoXiStr += '<div class="weui-news-title  rightnorow">';



                    if(item.messageFile != null  && item.messageFile != '' &&  item.messageContent != null  && item.messageContent != '') {
                        listxiaoXiStr += '<div class="weui-news-info nickname">';
                        listxiaoXiStr += '<div class="weui-news-infoitem "  >';
                        listxiaoXiStr += '</div>';
                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang">';
                        listxiaoXiStr += '<p>' + urlFenxi(item.messageContent) + '</p>';
                        listxiaoXiStr += '</div>';
                        listxiaoXiStr += ' </div>';
                    }

                    listxiaoXiStr += '<div class="weui-news-info nickname">';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '</div>';
                    if(item.messageFile != null  && item.messageFile != ''){
                        listxiaoXiStr += '<div class="weui-news-infoitem chatmediastyle  huanhang" >';
                        listxiaoXiStr += '<div class="width200">';



                        //文件--判断文件类型展示不同的图片
                        if(item.messageFile.search(".jpeg") != -1 || item.messageFile.search(".jpg") != -1 || item.messageFile.search(".png") != -1 || item.messageFile.search(".gif") != -1 || item.messageFile.search(".GIF") != -1 ){


                            listxiaoXiStr += '<div class="page-bd" >';
                            listxiaoXiStr += '<div class="weui-feeds">';
                            listxiaoXiStr += '<ul>';
                            listxiaoXiStr += ''+getImageChatContent(item.id,item.messageFile)+'';
                            listxiaoXiStr += '</ul>';
                            listxiaoXiStr += '</div>';
                            listxiaoXiStr += '</div>';


                        }else if( item.messageFile.search(".mp4") != -1 || item.messageFile.search(".MP4") != -1 || item.messageFile.search(".flv")  != -1 || item.messageFile.search(".mov")  != -1 ){
                            <!--视频播放-->
                            listxiaoXiStr += '<div class="page-bd"><div class="weui-c-article">';
                            listxiaoXiStr += '<div id="dplayer2'+item.id+'" ></div>';
                            listxiaoXiStr += '<script type="text/javascript">';
                            listxiaoXiStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.messageFile,"3")+'\', pic: \''+videoImagePath(item.messageFile)+'\'}});';
                            listxiaoXiStr += '</script>';
                            listxiaoXiStr += '</div></div>';



                        }else if( item.messageFile.search(".MP3") != -1 || item.messageFile.search(".mp3") != -1 || item.messageFile.search(".wav")  != -1 || item.messageFile.search(".ogg")  != -1 ){
                            //音频--隐藏原始播放器
                            listxiaoXiStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.messageFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
                            listxiaoXiStr += '<div class="audio"   >';
                            listxiaoXiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
                            listxiaoXiStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                            listxiaoXiStr += '</div>';
                            listxiaoXiStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
                            listxiaoXiStr += '</div>';
                        }else{
                            listxiaoXiStr += '<a href="'+ checkPath(item.messageFile,'3')+'" target="_blank">'+setNULL(getFileName(item.messageFile))+'</a>';

                        }



                        listxiaoXiStr += '</div>';

                    }else{
                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang" >';
                        listxiaoXiStr += '<p>';
                        listxiaoXiStr += ''+urlFenxi(item.messageContent)+'';
                        listxiaoXiStr += '</p>';
                    }


                    listxiaoXiStr += '</div>';


                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-info nickname rightnorow">';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '<span class="weui-news-left sloganchat">'+timeago(item.createDate)+'</span>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div onclick=toUserHome("' + item.createBy.id + '","1") class="weui-news-media squaresmall shadowonly" style="background-image:url(' + checkPathBackGroubdImage(item.createBy.headimgurl, "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                    if(item.userLevel != null  && item.userLevel != '' ){
                        listxiaoXiStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.userLevel)+'</span>';
                    }

                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</li>';

                }else{//左侧
                    listxiaoXiStr += '<li class="weui-news-item" id="'+item.id+'">';
                    listxiaoXiStr += '<div class="weui-news-inner">';

                    listxiaoXiStr += '<div onclick=toUserHome("' + item.createBy.id + '","1") class="weui-news-media squaresmall shadowonly" style="background-image:url(' + checkPathBackGroubdImage(item.createBy.headimgurl, "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                    if(item.userLevel != null  && item.userLevel != '' ){
                        listxiaoXiStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.userLevel)+'</span>';
                    }
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-inners">';
                    listxiaoXiStr += '<div class="weui-news-text">';
                    listxiaoXiStr += '<div class="weui-news-title  leftnorow">';

                    if(item.messageFile != null  && item.messageFile != '' &&  item.messageContent != null  && item.messageContent != '') {
                        listxiaoXiStr += '<div class="weui-news-info nickname">';

                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang">';
                        listxiaoXiStr += '<p>' + urlFenxi(item.messageContent) + '</p>';
                        listxiaoXiStr += '</div>';

                        listxiaoXiStr += '<div class="weui-news-infoitem "  >';
                        listxiaoXiStr += '</div>';

                        listxiaoXiStr += ' </div>';
                    }


                    listxiaoXiStr += '<div class="weui-news-info nickname">';


                    if(item.messageFile != null  && item.messageFile != ''){
                        listxiaoXiStr += '<div class="weui-news-infoitem chatmediastyle  huanhang" >';
                        listxiaoXiStr += '<div class="width200">';

                        //文件--判断文件类型展示不同的图片
                        if(item.messageFile.search(".jpeg") != -1 || item.messageFile.search(".jpg") != -1 || item.messageFile.search(".png") != -1 || item.messageFile.search(".gif") != -1 || item.messageFile.search(".GIF") != -1 ){


                            listxiaoXiStr += '<div class="page-bd" >';
                            listxiaoXiStr += '<div class="weui-feeds">';
                            listxiaoXiStr += '<ul>';
                            listxiaoXiStr += ''+getImageChatContent(item.id,item.messageFile)+'';
                            listxiaoXiStr += '</ul>';
                            listxiaoXiStr += '</div>';
                            listxiaoXiStr += '</div>';


                        }else if( item.messageFile.search(".mp4") != -1 || item.messageFile.search(".MP4") != -1 || item.messageFile.search(".flv")  != -1 || item.messageFile.search(".mov")  != -1 ){
                            <!--视频播放-->
                            listxiaoXiStr += '<div class="page-bd"><div class="weui-c-article">';
                            listxiaoXiStr += '<div id="dplayer2'+item.id+'" ></div>';
                            listxiaoXiStr += '<script type="text/javascript">';
                            listxiaoXiStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.messageFile,"3")+'\', pic: \''+videoImagePath(item.messageFile)+'\'}});';
                            listxiaoXiStr += '</script>';
                            listxiaoXiStr += '</div></div>';



                        }else if( item.messageFile.search(".MP3") != -1 || item.messageFile.search(".mp3") != -1 || item.messageFile.search(".wav")  != -1 || item.messageFile.search(".ogg")  != -1 ){
                            //音频--隐藏原始播放器
                            listxiaoXiStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.messageFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
                            listxiaoXiStr += '<div class="audio"   >';
                            listxiaoXiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
                            listxiaoXiStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                            listxiaoXiStr += '</div>';
                            listxiaoXiStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
                            listxiaoXiStr += '</div>';
                        }else{
                            listxiaoXiStr += '<a href="'+ checkPath(item.messageFile,'3')+'" target="_blank">'+setNULL(getFileName(item.messageFile))+'</a>';
                        }

                        listxiaoXiStr += '</div>';

                    }else{
                        listxiaoXiStr += '<div class="weui-news-infoitem chattextstyle  huanhang" >';
                        listxiaoXiStr += '<p>';
                        listxiaoXiStr += ''+urlFenxi(item.messageContent)+'';
                        listxiaoXiStr += '</p>';
                    }

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';

                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';


                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '<div class="weui-news-info nickname">';
                    listxiaoXiStr += '<div class="weui-news-infoitem">';
                    listxiaoXiStr += '<span class="weui-news-left sloganchatleft">'+timeago(item.createDate)+'</span>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';

                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</div>';
                    listxiaoXiStr += '</li>';

                }

            }

　　     });


		//渲染赋值
		if(renderType == '1'){
			$("#"+renderId+"").append(listxiaoXiStr);
			//滚到最底部
            //$("#dibu").click();
            if(listxiaoXiStr != null && listxiaoXiStr != ''){
                test();
            }

		}else if(renderType == '3'){
              $("#"+renderId+"").prepend(listxiaoXiStr);
		}else{
			$("#"+renderId+"").html(listxiaoXiStr);
            //滚到最底部
            //$("#dibu").click();
            if(listxiaoXiStr != null && listxiaoXiStr != ''){
                test();
            }
		}

      }else{
       // $.toast(data.msg, "text");
        if(data.code == '-1'){
			localStorage.setItem('token','');
			if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
				isLogin('','');
			}
        }
      }
	}

function test() {
    var o = document.getElementById("xiaoxidetail");
    var h = o.offsetHeight; //高度
    //console.log(h);
    $(document).scrollTop(h);

}


//test();
//获取详情数据
function detailxiaoXi(){
		//参数
		var id = GetUrlString('id');

		//传输数据
		var dataxiaoXi = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
		    "id":id
		}

        instancexiaoXi({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sfl/xiaoxi/xiaoXi/detail',
            data: dataxiaoXi,
        	cancelToken: sourcexiaoXi.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
				detailxiaoXiRender(rs.data);
            }else{
                console.log('detailxiaoXi请求异常！')
            }

        });

    }

//详情渲染
function detailxiaoXiRender(data){
	  if(data.code == '0'){
        //var detailxiaoXiStr = '';
        //detailxiaoXiStr += '';
        //$("#detailxiaoXi").html(detailxiaoXiStr);

        //参数
		$("#qunId").val(data.result.qunId);
		$("#messageType").val(data.result.messageType);
		$("#messageFile").val(data.result.messageFile);
		$("#messageLink").val(data.result.messageLink);
		$("#linkType").val(data.result.linkType);
		$("#messageContent").val(data.result.messageContent);
		$("#isRead").val(data.result.isRead);
		$("#xiaoxiStatus").val(data.result.xiaoxiStatus);

      }else{
        $.toast(data.msg, "text");
        if(rs.data.code == '-1'){
			localStorage.setItem('token','');
			if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
				isLogin('','');
			}
        }
      }
	}

//保存数据
function savexiaoXi(){
	    // 在提交请求之前判断是否登录
		if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
			isLogin('','');
			initNRxiaoXi();
			return false;
		}
		//参数
		var qunId = $("#qunId").val();
		var messageType = $("#messageType").val();
		var messageFile = $("#messageFile").val();
		var messageLink = $("#messageLink").val();
		var linkType = $("#linkType").val();
		var messageContent = $("#messageContent").val();
		var isRead = $("#isRead").val();
		var xiaoxiStatus = $("#xiaoxiStatus").val();

		//判断不为空数据是否为空
		if(qunId ==null || qunId ==''){
			$.toast("请输入群ID", "text");
			initNRxiaoXi();
			return false;
		}
		if(messageType ==null || messageType ==''){
			$.toast("请输入消息类型", "text");
			initNRxiaoXi();
			return false;
		}
		if(isRead ==null || isRead ==''){
			$.toast("请输入是否已读", "text");
			initNRxiaoXi();
			return false;
		}

		//传输数据
		var dataxiaoXi = {
		  	"qunId":qunId,
		  	"messageType":messageType,
		  	"messageFile":messageFile,
		  	"messageLink":messageLink,
		  	"linkType":linkType,
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
		  	"messageContent":messageContent,
		  	"isRead":isRead,
		  	"xiaoxiStatus":xiaoxiStatus
		}

        instancexiaoXi({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sfl/xiaoxi/xiaoXi/save',
            data:dataxiaoXi,
        	cancelToken: sourcexiaoXi.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
				if(rs.data.code == '0'){
					//$.toast("操作成功", 'success');
                    refresh();
				}else{
					//$.toast(rs.data.msg, "text");
					initNRxiaoXi();
				}
            }else{
                console.log('savexiaoXi请求异常！')
                $.toast("操作失败", "text");
                initNRxiaoXi();
                if(rs.data.code == '-1'){
                    localStorage.setItem('token','');
                    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                        isLogin('','');
                    }
                }
            }

        });

    }

//防重复提交保存
function saveNRxiaoXi(){
    var savexiaoXiFlag = $("#savexiaoXiFlag").val();
    if(savexiaoXiFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
    	if($("#savexiaoXiFlag").size() == 0){
        $("body").append("<input type='hidden' id='savexiaoXiFlag' value='1' >");
        savexiaoXi();
        }
    }
}

//初始化重复提交判断
function initNRxiaoXi(){
    $("#savexiaoXiFlag").remove();
}

//监听提交保存
$("#buttonSavexiaoXi").click(function(){
	saveNRxiaoXi();
})

//删除数据
function deletexiaoXi(){

		//参数
		var id = GetUrlString('id');

		//传输数据
		var dataxiaoXi = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
		    "id":id
		}

        instancexiaoXi({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sfl/xiaoxi/xiaoXi/delete',
            data: dataxiaoXi,
        	cancelToken: sourcexiaoXi.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
				if(rs.data.code == '0'){
					//$.toast("操作成功", 'success');
                    refresh();
				}else{
					//$.toast(rs.data.msg, "text");

				}
            }else{
                console.log('deletexiaoXi请求异常！')
                $.toast("操作失败", "text");
                if(rs.data.code == '-1'){
                    localStorage.setItem('token','');
                    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                        isLogin('','');
                    }
                }
            }
        });

    }

//监听删除操作
$("#buttonDeletexiaoXi").click(function(){
    $.confirm("您确定要删除吗?", "确认删除?", function() {
        deletexiaoXi();
        }, function() {
        //取消操作
    });
});

//监听是否渲染
$(function () {

   //判断获取列表第一页
   if($("#buttonListFirstxiaoXi").size()>0){
		getListxiaoXi(xiaoXiRenderId1,'1',10,1);
   }

   //判断获取详情信息
   if($("#buttonDetailxiaoXi").size()>0){
		detailxiaoXi();
   }

});


//时刻数据
function gettime(){

    //参数
    var id = GetUrlString('id');

    //传输数据
    var dataxiaoXi = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "id":id
    }

    instancexiaoXi({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/xiaoxi/xiaoXi/returntime',
        data: dataxiaoXi,
        cancelToken: sourcexiaoXi.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                $("#weilaishijian").val(rs.data.result.updateDate);
                $("#weilaishijianflag").val("0");
            }
        }
    });

}


//时刻数据
function getQunName(){

    //参数
    var id = GetUrlString('id');

    //传输数据
    var dataxiaoXi = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "id":id
    }

    instancexiaoXi({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/qun/qun/qunName',
        data: dataxiaoXi,
        cancelToken: sourcexiaoXi.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                $("title").html(rs.data.result.qunName);

                $("#qunNum").val(rs.data.result.qunNum);


                if(rs.data.result.qunType != '1'){


                    $("#biaotiqun").show();
                    $("#toqunchengyuanlist").attr("onclick","toqunchengyuanList(\'"+rs.data.result.id+"\','1')");
                    $("#toqunchengyuanlist").show();

                }else{
                    $("#biaotiqun").show();

                    $("#newqun").css("margin-top","50px");
                    $("#guanzhuId").val(rs.data.result.isDisable);

                    //$("#toqunchengyuanlist2").attr("onclick","toUserHome(\'"+rs.data.result.isDisable+"\','1')");
                    $("#toqunchengyuanlist2").show();
                    if($("#gz").size() > 0){
                        isguanzhu();//判断是否关注
                    }
                }
            }
        }
    });

}



//时刻数据
function getQunInfo(){

    //参数
    var id = GetUrlString('id');

    //传输数据
    var dataxiaoXi = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "id":id
    }

    instancexiaoXi({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/qun/qun/qunName',
        data: dataxiaoXi,
        cancelToken: sourcexiaoXi.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                $("title").html(rs.data.result.qunName);

                if(rs.data.result.qunType != '1'){

                    var title = rs.data.result.qunName;
                    $("title").html(title);
                    //var content = $("#shareContent").val();
                    var longUrl  = baseUrlFrontDefault+"addqun.html?id="+id+"&share="+localStorage.getItem("userId")+"&s="+getSaasId();
                    //console.log(longUrl);
                    $("#shareName").val(title);

                    getQunShortUrl(longUrl,title);

                }
            }
        }
    });

}


//时刻数据
function getYaoqingQunInfo(){

    //参数
    var id = GetUrlString('id');

    //传输数据
    var dataxiaoXi = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "id":id
    }

    instancexiaoXi({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/qun/qun/qunInfo',
        data: dataxiaoXi,
        cancelToken: sourcexiaoXi.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                $("title").html(rs.data.result.qunName);
                $("#qunName").html(rs.data.result.qunName);
                $("#qunNum").html("共计"+rs.data.result.remarks+"人");
                var detailhongBaoStr = '';

                detailhongBaoStr += '<div class="">';
                detailhongBaoStr += '<div class="page-bd " >';
                detailhongBaoStr += '<div class="weui-feeds">';
                detailhongBaoStr += '<ul>';
                detailhongBaoStr += ''+getImageChatContent(rs.data.result.id,rs.data.result.qunImage)+'';
                detailhongBaoStr += '</ul>';
                detailhongBaoStr += '</div>';
                detailhongBaoStr += '</div>';

                detailhongBaoStr += '</div>';

                $("#qunImage").html(detailhongBaoStr);

                if(rs.data.result.qunStatus == '1'){
                    $("#jinru").show();
                    $("#jinru").attr("onclick","toShifenliaoDetail(\'"+rs.data.result.id+"\','1')");
                }else{
                    $("#jiaru").show();
                    $("#jiaru").attr("onclick","addqun(\'"+rs.data.result.id+"\')");
                }

            }
        }
    });

}

function addqun(qunId) {
    //参数
    var id = qunId;
    var token = localStorage.getItem("token");
    //传输数据
    var dataxiaoXi = {
        "token":token,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "id":id
    }

    instancexiaoXi({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/qun/qun/addqun',
        data: dataxiaoXi,
        cancelToken: sourcexiaoXi.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                toShifenliaoDetail(id,'1');
            }
        }
    });

}



function chuangjian() {
    //参数
    var qunName = $("#qunName").val();
    var token = localStorage.getItem("token");

    if(qunName ==null || qunName ==''){
        $.toast("请输入群名称", "text");
        initNRchuangjian();
        return false;
    }
    //传输数据
    var dataxiaoXi = {
        "token":token,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "qunName":qunName
    }

    instancexiaoXi({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/qun/qun/newqun',
        data: dataxiaoXi,
        cancelToken: sourcexiaoXi.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                toShifenliaoDetail(rs.data.result.id,'1');
            }
        }
    });

}

//防重复提交保存
function saveNRchuangjian(){
    var savechuangjianFlag = $("#savechuangjianFlag").val();
    if(savechuangjianFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
        $("body").append("<input type='hidden' id='savechuangjianFlag' value='1' >");
        chuangjian();
    }
}
//初始化重复提交判断
function initNRchuangjian(){
    $("#savechuangjianFlag").remove();
}


function sousuo() {
    //参数
    var qunName = $("#qunName").val();
    var token = localStorage.getItem("token");

    if(qunName ==null || qunName ==''){
        $.toast("请输入群名称", "text");
        initNRchuangjian();
        return false;
    }
    //传输数据
    var dataxiaoXi = {
        "token":token,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "qunName":qunName
    }

    instancexiaoXi({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/qun/qun/sousuo',
        data: dataxiaoXi,
        cancelToken: sourcexiaoXi.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                var detailhongBaoStr = '';
                detailhongBaoStr += '<a class="weui-cell weui-cell_access myweui-cell" >';
                detailhongBaoStr += '<div  onclick=toUserHome("'+rs.data.result.id+'","1"); class="weui-cell__hd shadowonly" style="border-radius:10px;background-image:url('+ checkPathBackGroubdImage(rs.data.result.headimgurl,'1')+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;width: 45px;height:45px;">';
                detailhongBaoStr += '</div>';
                detailhongBaoStr += '<div class="weui-cell__bd">';
                detailhongBaoStr += '<div class="weui-news-text">';
                detailhongBaoStr += '<div   onclick=toUserHome("'+rs.data.result.id+'","1"); class="weui-news-title onerow">'+rs.data.result.nickname+'</div>';
                detailhongBaoStr += '</div>';
                detailhongBaoStr += '<div class="weui-news-info mynesinfo">';
                detailhongBaoStr += '<div class="weui-news-infoitem"  onclick=toUserHome("'+rs.data.result.id+'","1");>';
                if(rs.data.result.sex == '1'){
                    detailhongBaoStr += ' <i class="icon icon-58 f-blue f12">男</i>';
                }else if(rs.data.result.sex == '2'){
                    detailhongBaoStr += '<i class="icon icon-57 f-red f12">女</i>';
                }


                detailhongBaoStr += '</div>';
                detailhongBaoStr += '<div class="weui-news-infoitem f-red">';

                detailhongBaoStr += '<i class="beauty icon-xiai  f-white f14   anniushadow2" id="gz">关注</i>';
                detailhongBaoStr += '<input type="hidden" id="guanzhuId" value="'+rs.data.result.id+'">';

                detailhongBaoStr += '</div>';

                detailhongBaoStr += '</div>';

                detailhongBaoStr += '</div>';
                detailhongBaoStr += '</a>';

                $("#userinfo").html(detailhongBaoStr);
                $("#disuserinfo").show();
                isguanzhu();//判断是否关注


            }else{
                $.toast("对不起，用户不存在！", "text");
            }
        }
    });

}