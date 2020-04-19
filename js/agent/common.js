var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost";//本地模式
}
/**评论-点赞-javascript:window.scrollTo(0,0)-转发-支付*/
//请求实例
var instancecomment = axios.create({
    baseURL: ''+basehost+'/sfd/a/api/',
    timeout: 18000000,
    headers: {'token': localStorage.getItem('token')}
});

//取消请求
var CancelTokencomment = axios.CancelToken;
var sourcecomment = CancelTokencomment.source();

// 添加请求拦截器
instancecomment.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
       // isLogin('','');
        //sourcecomment.cancel();
    }
   sessionStorage.clear();return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instancecomment.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
//评论-评论列表渲染（是否登录-是否可以删除）-发表评论-删除评论

function setdiswenzifile() {
    $("#tishixinxi").hide();

    $("#wenzigao").show();
    $("#diswenzi").show();
    $("#zhuti").hide();
    $("#upfile").hide();
    $("#videofile").hide();
    $("#attachfile").hide();
    $("#voicefile").hide();
    $("#hongbaofile").hide();
    if($("#radioComment").size() > 0){
        $("#radioComment").val("3");
    }else{
        $("body").append("<input type='hidden' id='radioComment' value='1' >");
    }
}

function setdisImagefile() {
    $("#wenzigao").hide();
    //$("#diswenzi").hide();
    $("#tishixinxi").show();
    $("#zhuti").hide();
    $("#upfile").show();
    $("#videofile").hide();
    $("#attachfile").hide();
    $("#voicefile").hide();
    $("#hongbaofile").hide();
    if($("#radioComment").size() > 0){
        if($("#isHongbao").val() == '1'){
            $("#radioComment").val("5");
        }else{
            $("#radioComment").val("1");
        }


    }else{
        $("body").append("<input type='hidden' id='radioComment' value='1' >");
    }
}
function setdisvideofile() {
    $("#wenzigao").hide();
    //$("#diswenzi").hide();
    $("#tishixinxi").show();
    $("#zhuti").show();
    $("#upfile").hide();
    $("#videofile").show();
    $("#attachfile").hide();
    $("#voicefile").hide();
    $("#hongbaofile").hide();
    if($("#radioComment").size() > 0){
        $("#radioComment").val("3");
    }else{
        $("body").append("<input type='hidden' id='radioComment' value='3' >");
    }
}





function setdisshowvideofile() {
    $("#wenzigao").hide();
    //$("#diswenzi").hide();
    $("#tishixinxi").show();
    $("#zhuti").hide();
    $("#upfile").show();
    $("#videofile").hide();
    $("#attachfile").hide();
    $("#voicefile").hide();
    $("#hongbaofile").hide();
    if($("#radioComment").size() > 0){
        $("#radioComment").val("1");
    }else{
        $("body").append("<input type='hidden' id='radioComment' value='1' >");
    }
}

function setdisvoicefile() {
    $("#wenzigao").hide();
    //$("#diswenzi").hide();
    $("#tishixinxi").hide();
    $("#zhuti").hide();
    $("#upfile").hide();
    $("#videofile").hide();
    $("#attachfile").hide();
    $("#voicefile").show();
    $("#hongbaofile").hide();
    if($("#radioComment").size() > 0){
        $("#radioComment").val("2");
    }else{
        $("body").append("<input type='hidden' id='radioComment' value='2' >");
    }
}


function setdisattachfile() {
    $("#wenzigao").hide();
    //$("#diswenzi").hide();
    $("#tishixinxi").hide();
    $("#zhuti").hide();
    $("#upfile").hide();
    $("#videofile").hide();
    $("#attachfile").show();
    $("#voicefile").hide();
    $("#hongbaofile").hide();
    if($("#radioComment").size() > 0){
        $("#radioComment").val("4");
    }else{
        $("body").append("<input type='hidden' id='radioComment' value='4' >");
    }
}

function setdishongbaofile() {
    $("#wenzigao").hide();
    //$("#diswenzi").hide();
    $("#tishixinxi").hide();
    $("#zhuti").hide();
    $("#upfile").hide();
    $("#videofile").hide();
    $("#attachfile").hide();
    $("#voicefile").hide();
    $("#hongbaofile").show();
    if($("#radioComment").size() > 0){
        $("#radioComment").val("5");
    }else{
        $("body").append("<input type='hidden' id='radioComment' value='5' >");
    }
}

function setweixinpay() {
    $("#zhifumimaPay").hide();
}
function setalipay() {
    $("#zhifumimaPay").hide();
}
function setyuepay() {
    $("#zhifumimaPay").show();
}


//打开评论列表
function openCommentList(renderId,renderType,isInit,pageSize,manyType,commontType,zuoZhe){

    $("#halfCommentList").popup();
    $("#wodexiangfa").attr("onclick","openCommentSave(\""+renderId+"\",\""+manyType+"\",\""+commontType+"\",\""+zuoZhe+"\")");
    //处理id和类型input
    if($("#moreManyType").size() > 0){
        $("#moretManyType").val(manyType);
    }else{
        $("body").append("<input type='hidden' id='moreManyType' value='"+manyType+"' >");
    }
    if($("#moreCommentType").size() > 0){
        $("#moreCommentType").val(commontType);
    }else{
        $("body").append("<input type='hidden' id='moreCommentType' value='"+commontType+"' >");
    }
    if($("#moreZuoZheType").size() > 0){
        $("#moreZuoZheType").val(zuoZhe);
    }else{
        $("body").append("<input type='hidden' id='moreZuoZheType' value='"+zuoZhe+"' >");
    }
    //console.log("manyType=====" + manyType)
    //console.log("commontType=====" + commontType)
    //console.log("zuoZhe=====" + zuoZhe)
    listcomment(renderId,renderType,isInit,pageSize,manyType,commontType,zuoZhe);

}
//打开评论
function openCommentSave(renderId,manyType,commontType,zuoZhe){
    isLogin();
    $("#haveWdCommnetFlag").remove();
    $("#havaCommnetFlag").remove();
    $("#haveHdCommnetFlag").remove();
    havaCommnetContent();



    $("#tagnavtop").show();



    setdisImagefile();


    if(localStorage.getItem("istext") == '1'){
        $("#tagnavtop").hide();
        $("#upfile").hide();
        $("#videofile").hide();
        $("#tishixinxi").hide();

    }


    //console.log("manyType=====" + manyType)
    //console.log("commontType=====" + commontType)
    //console.log("zuoZhe=====" + zuoZhe)
    $("#fabiaotitle").html("发表评论");
    $("#buttonSavecomment").attr("onclick","saveNRcomment()");
    $("#halfComment").popup();
    //处理id和类型input
    if($("#commentManyType").size() > 0){
        $("#commentManyType").val(manyType);
    }else{
        $("body").append("<input type='hidden' id='commentManyType' value='"+manyType+"' >");
    }
    if($("#commontCommentType").size() > 0){
        $("#commontCommentType").val(commontType);
    }else{
        $("body").append("<input type='hidden' id='commontCommentType' value='"+commontType+"' >");
    }
    if($("#commontZuoZheType").size() > 0){
        $("#commontZuoZheType").val(zuoZhe);
    }else{
        $("body").append("<input type='hidden' id='commontZuoZheType' value='"+zuoZhe+"' >");
    }


}



//获取评论列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染--isInit为1是第一次加载
function listcomment(renderId,renderType,isInit,pageSize,manyType,commontType,zuoZhe){
    stopScrollLong();
    var jiazaizhong = '<div id="initNoComment"  class="f-green" style="width: 100%;height:140px;text-align: center;margin-top: 100px;">加载中……</div>';

    if(isInit == '1'){
        $("#commentDataList").html(jiazaizhong);
    }
    //分页
    var thisId = 'listcomment'+manyType+'PageNo';
    var pageNoTempList = $("input[id^=listcomment]");
    for(var i = 0;i < pageNoTempList.length;i++){
        if(pageNoTempList[i].id != thisId){
            $("#"+pageNoTempList[i].id+"").remove();//移除其他同类分页页码
        }
    }
    var pageNoTemp = $("#listcomment"+manyType+"PageNo").val();
    //console.log("pageNoTemp=====" + pageNoTemp)
    if(pageNoTemp > 0 && isInit != '1'){
        $("#listcomment"+manyType+"PageNo").val(eval(pageNoTemp) + 1);
    }else{
        if($("#listcomment"+manyType+"PageNo").size() == 0){
            $("body").append("<input type='hidden' id='listcomment"+manyType+"PageNo' value='1' >");
        }else{
            $("#listcomment"+manyType+"PageNo").val(1);
        }
        //$("#" + renderId + "").remove();//第一次先移除弹出内容再重新赋予一个新的
        //增加弹出窗口元素
    }
    //参数-manyType--需要手动处理对应字段
    var commentType = commontType;
    var commentAboutid = manyType;
    var pageNo = $("#listcomment"+manyType+"PageNo").val();

    //传输数据
    var datacomment = {
        "commentType":commentType,
        "commentAboutid":commentAboutid,
        "pageSize":pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*','Accept-Encoding':'gzip,d'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/comment/comment/list',
        data: datacomment,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            listcommentRender(rs.data,renderId,renderType,isInit,manyType,commontType,zuoZhe);
        }else{
            console.log('请求异常！')
        }
    });

}



//评论列表渲染
function listcommentRender(data,renderId,renderType,isInit,manyType,commontType,zuoZhe) {
    var listcommentStr = '';
    if (data.code == '0') {
        if(isInit == '1'){
            $("#commentDataList").html("");
        }

        if((data.result == null || data.result == '' || data.result == '[]') && isInit != '1' ){
            $(".weui-toast--text").hide();$.toast("没有更多了", "text");
        }else{

            $.each(data.result, function (i, item) {
                //console.log(i, item);
                //渲染内容处理
                listcommentStr += '<li class="weui-comment-item">';


                listcommentStr += '<div class="weui-comment-li">';
                //if(item.createBy.id == localStorage.getItem("userId")){
                listcommentStr += '<span class="check checked" onclick=openCommentSave("'+renderId+'","'+item.id+'","18","'+zuoZhe+'");>';
                listcommentStr += '<i class="icon icon-79 weui-tabbar__icon" id="icon30"></i>';
                listcommentStr += '<span class="weui-comment-num">回复</span>';
                listcommentStr += '</span>';
                //}


                listcommentStr += '<span  style="margin-left: 10px;" class="check checked" onclick=dianji("18","'+item.id+'");>';
                listcommentStr += '<i class="weui-comment-icon"></i>';
                if(item.commentZan == null ||  item.commentZan == '0' || item.commentZan == 'undifined'){
                    listcommentStr += '<span class="weui-comment-num" id="zan'+item.id+'"></span>';
                }else{
                    listcommentStr += '<span class="weui-comment-num" id="zan'+item.id+'">'+setNum(item.commentZan)+'</span>';
                }

                listcommentStr += '</span>';

                listcommentStr += '</div>';



                listcommentStr += '<div class="userinfo" onclick=toUserHome("'+item.createBy.id+'","1")>';
                if(item.createBy.id == zuoZhe){
                    listcommentStr += '<strong class="nickname"><font color="green">作者</font>'+setNULL(item.createBy.nickname)+'</strong><img class="avatar shadowonly" src="'+ checkPath(item.createBy.headimgurl,'1')+'">';

                }else{
                    listcommentStr += '<strong class="nickname">'+setNULL(item.createBy.nickname)+'</strong><img class="avatar shadowonly" src="'+ checkPath(item.createBy.headimgurl,'1')+'">';
                }
                listcommentStr += '</div>';


                listcommentStr += '<div class="weui-comment-msg"><span class="status"></span>';
                listcommentStr += ''+setNULL(item.commentContent)+'<br>';
                if(item.commentFile != null && item.contentType == '1'  ){
                    //图片评论
                    listcommentStr += '<div class="weui-feeds"><ul>'+getImageContent(item.id,item.commentFile)+'</ul></div>';

                }
                else if(item.commentFile != null && item.contentType == '2'  ){
                    //音频评论--隐藏原始播放器
                    //音频--隐藏原始播放器
                    listcommentStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.commentFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
                    listcommentStr += '<div class="audio"   >';
                    listcommentStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
                    listcommentStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                    listcommentStr += '</div>';
                    listcommentStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
                    listcommentStr += '</div>';
                }
                else if(item.commentFile != null && item.contentType == '3'  ){
                    //视频评论--隐藏原始播放器


                        listcommentStr += '<div class="page-bd-15"><div class="weui-c-article">';
                        listcommentStr += '<div id="dplayer2'+item.id+'"></div>';
                        listcommentStr += '<script type="text/javascript">';
                        listcommentStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.commentFile,"3")+'\', pic: \''+videoImagePath(item.commentFile)+'\'}});';
                        listcommentStr += '</script>';
                        listcommentStr += '</div></div>';

                    //listcommentStr += '<div><video style="width:100%;height:100%;"  src="'+checkPath(item.commentFile,'3')+'"  controls="controls" preload="meta"> </video></div>';
                }
                else if(item.commentFile != null && item.contentType == '4'  ){
                    //文件评论--判断文件类型展示不同的图片
                    if(item.commentFile.search(".jpeg") != -1 || item.commentFile.search(".jpg") != -1 || item.commentFile.search(".png") != -1 || item.commentFile.search(".gif") != -1 || item.commentFile.search(".GIF") != -1 ){
                        listcommentStr += '<div class="weui-feeds"><ul>'+getImageContent(item.id,item.commentFile)+'</ul></div>';
                    }else if( item.commentFile.search(".mp4") != -1 || item.commentFile.search(".MP4") != -1 || item.commentFile.search(".flv")  != -1 || item.commentFile.search(".mov")  != -1 ){
                        //视频评论--隐藏原始播放器

                            listcommentStr += '<div class="page-bd-15"><div class="weui-c-article">';
                            listcommentStr += '<div id="dplayer2'+item.id+'"></div>';
                            listcommentStr += '<script type="text/javascript">';
                            listcommentStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.commentFile,"3")+'\', pic: \''+videoImagePath(item.commentFile)+'\'}});';
                            listcommentStr += '</script>';
                            listcommentStr += '</div></div>';


                    }else if( item.commentFile.search(".MP3") != -1 || item.commentFile.search(".mp3") != -1 ){
                        //音频评论--隐藏原始播放器
                        //音频--隐藏原始播放器
                        listcommentStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.commentFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
                        listcommentStr += '<div class="audio"   >';
                        listcommentStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
                        listcommentStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                        listcommentStr += '</div>';
                        listcommentStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta" > </audio></div>';
                        listcommentStr += '</div>';
                    }else{
                        listcommentStr += '<a href="'+ checkPath(item.commentFile,'3')+'" target="_blank">'+setNULL(getFileName(item.commentFile))+'</a>';
                    }


                }
                else if(item.commentFile != null && item.contentType == '5'  ){
                    //红包评论
                    listcommentStr += '<div class="weui-feeds"><img onclick=toHongBaoDetail("'+item.remarks+'","1");  width="173px" height="286px" src="'+ checkPath(item.commentFile,'1')+'"></div>';
                }
                listcommentStr += '</div>';

                listcommentStr += '<p class="time">'+timeago(item.createDate)+'  </p>';
                $.each(item.listComment, function (j, itemHuiFu) {
                    listcommentStr += '<div class="weui-comment-reply">';
                    if(itemHuiFu.createBy.id == zuoZhe){
                        listcommentStr += '<div class="nickname"><font color="green">作者</font>'+setNULL(itemHuiFu.createBy.nickname)+'回复</div>';
                    }else{
                        listcommentStr += '<div class="nickname">'+setNULL(itemHuiFu.createBy.nickname)+'回复</div>';
                    }

                    listcommentStr += '<div class="weui-comment-msg">';

                    listcommentStr += ''+itemHuiFu.commentContent+'<br>';
                    if(itemHuiFu.commentFile != null && itemHuiFu.contentType == '1'){
                        //图片评论
                        listcommentStr += '<div class="weui-feeds"><ul>'+getImageContent(itemHuiFu.id,itemHuiFu.commentFile)+'</ul></div>';
                    }
                    else if( itemHuiFu.commentFile != null && itemHuiFu.contentType == '2' ){
                        //音频评论--隐藏原始播放器
                        //音频--隐藏原始播放器
                        listcommentStr += '<div class="page-bd center" id="audiostartA'+itemHuiFu.id+'" onclick=start("audiotest'+itemHuiFu.id+'","'+checkPath(itemHuiFu.commentFile,'3')+'","shifenmiao'+itemHuiFu.id+'","audiostartA'+itemHuiFu.id+'","audioIconA'+itemHuiFu.id+'")>';
                        listcommentStr += '<div class="audio"   >';
                        listcommentStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+itemHuiFu.id+'"/></div>';
                        listcommentStr += '<div id="shifenmiao'+itemHuiFu.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                        listcommentStr += '</div>';
                        listcommentStr += '<div class="disnone"><audio id="audiotest'+itemHuiFu.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
                        listcommentStr += '</div>';
                    }
                    else if( itemHuiFu.commentFile != null && itemHuiFu.contentType == '3' ){
                        //视频评论--隐藏原始播放器

                            listcommentStr += '<div class="page-bd-15"><div class="weui-c-article">';
                            listcommentStr += '<div id="dplayer2'+itemHuiFu.id+'"></div>';
                            listcommentStr += '<script type="text/javascript">';
                            listcommentStr += 'const dp2'+itemHuiFu.id+' = new DPlayer({container: document.getElementById("dplayer2'+itemHuiFu.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(itemHuiFu.commentFile,"3")+'\', pic: \''+videoImagePath(itemHuiFu.commentFile)+'\'}});';
                            listcommentStr += '</script>';
                            listcommentStr += '</div></div>';


                    }
                    else if(itemHuiFu.commentFile != null && itemHuiFu.contentType == '4' ){
                        //文件评论--判断文件类型展示不同的图片
                        if(itemHuiFu.commentFile.search(".jpeg") != -1 || itemHuiFu.commentFile.search(".jpg") != -1 || itemHuiFu.commentFile.search(".png") != -1 || itemHuiFu.commentFile.search(".gif") != -1 || itemHuiFu.commentFile.search(".GIF") != -1 ){
                            listcommentStr += '<div class="weui-feeds"><ul>'+getImageContent(itemHuiFu.id,itemHuiFu.commentFile)+'</ul></div>';
                        }else if( itemHuiFu.commentFile.search(".mp4") != -1 || itemHuiFu.commentFile.search(".MP4") != -1 || itemHuiFu.commentFile.search(".flv")  != -1 || itemHuiFu.commentFile.search(".mov")  != -1 ){
                            //视频评论--隐藏原始播放器

                                listcommentStr += '<div class="page-bd-15"><div class="weui-c-article">';
                                listcommentStr += '<div id="dplayer2'+itemHuiFu.id+'"></div>';
                                listcommentStr += '<script type="text/javascript">';
                                listcommentStr += 'const dp2'+itemHuiFu.id+' = new DPlayer({container: document.getElementById("dplayer2'+itemHuiFu.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(itemHuiFu.commentFile,"3")+'\', pic: \''+videoImagePath(itemHuiFu.commentFile)+'\'}});';
                                listcommentStr += '</script>';
                                listcommentStr += '</div></div>';


                        }else if( itemHuiFu.commentFile.search(".MP3") != -1 || itemHuiFu.commentFile.search(".mp3") != -1 || itemHuiFu.commentFile.search(".wav")  != -1 || itemHuiFu.commentFile.search(".ogg")  != -1 ){
                            //音频评论--隐藏原始播放器
                            //音频--隐藏原始播放器
                            listcommentStr += '<div class="page-bd center" id="audiostartA'+itemHuiFu.id+'" onclick=start("audiotest'+itemHuiFu.id+'","'+checkPath(itemHuiFu.commentFile,'3')+'","shifenmiao'+itemHuiFu.id+'","audiostartA'+itemHuiFu.id+'","audioIconA'+itemHuiFu.id+'")>';
                            listcommentStr += '<div class="audio"   >';
                            listcommentStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+itemHuiFu.id+'"/></div>';
                            listcommentStr += '<div id="shifenmiao'+itemHuiFu.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                            listcommentStr += '</div>';
                            listcommentStr += '<div class="disnone"><audio id="audiotest'+itemHuiFu.id+'" src=""  controls="controls" preload="meta" > </audio></div>';
                            listcommentStr += '</div>';
                        }else{
                            listcommentStr += '<p><a href="'+ checkPath(itemHuiFu.commentFile,'3')+'" target="_blank">'+setNULL(getFileName(itemHuiFu.commentFile))+'</a></p>';
                        }
                    }
                    else if(itemHuiFu.commentFile != null && itemHuiFu.contentType == '5' ){
                        //红包评论
                        listcommentStr += '<div class="weui-feeds"><img onclick=toHongBaoDetail("'+itemHuiFu.remarks+'","1"); width="173px" height="286px" src="'+ checkPath(itemHuiFu.commentFile,'1')+'"></div>';
                    }
                    listcommentStr += '</div>';

                    listcommentStr += '<p class="time">'+timeago(itemHuiFu.createDate)+'</p>';
                    listcommentStr += '</div>';

                });
                listcommentStr += '</li>';
            });
            if((data.result == null || data.result == '' || data.result == '[]' ) ){
                listcommentStr += '<div id="initNoComment" onclick=openCommentSave("'+renderId+'","'+manyType+'","'+commontType+'","'+zuoZhe+'") class="f-green" style="width: 100%;height:140px;text-align: center;margin-top: 100px;">还没人评论，点我评论！</div>';
            }
            //渲染赋值
            if (renderType == '1' && data.result != null && data.result != '' && data.result != '[]' ) {
                $("#commentDataList").append(listcommentStr);
            } else {
                $("#commentDataList").html(listcommentStr);
            }
            var audios = document.getElementsByTagName("audio");
            // 暂停函数
            function pauseAll() {
                var self = this;
                [].forEach.call(audios, function (i) {
                    // 将audios中其他的audio全部暂停
                    i !== self && i.pause();
                })
            }
            // 给play事件绑定暂停函数
            [].forEach.call(audios, function (i) {
                i.addEventListener("play", pauseAll.bind(i));
            })



        }


    } else {
        $.toast(data.msg, "text");
    }

}

//保存评论数据
function savecomment(){
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        initNRcomment();
        return false;
    }
    $.toast("提交中…", "text");
    //参数
    var commentType = $("#commontCommentType").val();
    var contentType = $("#radioComment").val();
    var commentFile = $("#commentFile").val();
    if(contentType == '1'){//图片
        commentFile = pathUrl("uploaderInputA");
    }else if(contentType == '2'){//语音
        commentFile = $("#voicefileInput").val();
    }else if(contentType == '3'){//视频
        commentFile = pathUrl("uploaderInputB");
    }else if(contentType == '4'){//文件
        commentFile = pathUrl("uploaderInputC");
    }else if(contentType == '5'){//红包
        commentFile = baseDefaultHongBaoImage;
        //先设置支付密码--再去选择支付方式提交支付--提交订单（评论ID-）--支付成功--新增评论记录-新增红包记录--有人领取则是新增领取记录---自己类型和资金分类需要增加红包收入和支出，红包表缺少状态
    }
    var commentContent = $("#commentContent").val();
    var commentAboutid = $("#commentManyType").val();
    var token = localStorage.getItem('token');
    var zuoZhe = $("#commontZuoZheType").val();
    //判断不为空数据是否为空

    if((commentContent ==null || commentContent =='') && (commentFile ==null || commentFile =='')){
        $.toast("请输入评论内容", "text");
        initNRcomment();
        return false;
    }


    //传输数据
    var datacomment = {
        "commentType":commentType,
        "contentType":contentType,
        "commentContent":commentContent,
        "commentFile":commentFile,
        "commentAboutid":commentAboutid,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/comment/comment/save',
        data:datacomment,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){

                //$.toast("操作成功", 'success');
                //刷新评论列表
                //先置空内容和页码再次请求
                $("#commentContent").val("");
                var pageNoQingChuTempList = $("input[id^=listcomment]");
                for(var i = 0;i < pageNoQingChuTempList.length;i++){
                    $("#"+pageNoQingChuTempList[i].id+"").remove();//
                }
                $("#commentManyType").remove();
                $("#commontCommentType").remove();
                $("#commontZuoZheType").remove();
                qingchuAllUrl();
                initNRcomment();
                if(contentType == '5'){//最后三个为备用参数--为了支付后还能跳转回去--remarks--返回评论ID
                    savehongBao(commentContent,"1",rs.data.result.remarks,rs.data.result.commentAboutid,rs.data.result.commentType,zuoZhe);
                }else{
                    openCommentList("commentDataList","2","1",5,rs.data.result.commentAboutid,rs.data.result.commentType,zuoZhe);
                }

            }else{
                $.toast(rs.data.msg, "text");
                initNRcomment();
                if(rs.data.code == '-1'){
                    localStorage.setItem('token','');
                    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                        isLogin('','');
                    }
                }

            }
        }else{
            console.log('请求异常！')
            $.toast("操作失败", "text");
            initNRcomment();
        }

    });

}

//防重复提交保存
function saveNRcomment(){

    if(localStorage.getItem("vip") == 'no'  && localStorage.getItem("vipfabu") == '1'){
        $.confirm("对不起，您暂无发布权限！", "<span style='color: red;font-weight: bolder;'>去领取?</span>", function() {
            toUserLevelDetail(localStorage.getItem("isonevip"));
        }, function() {
            //取消操作
            return false;
        });

    }else{
        var savecommentFlag = $("#savecommentFlag").val();
        if(savecommentFlag > 0){
            $.toast("请勿重复提交", "text");
        }else{
            if($("#savecommentFlag").size() == 0){
                $("body").append("<input type='hidden' id='savecommentFlag' value='1' >");
            }

            savecomment();

        }
    }


}

//初始化重复提交判断
function initNRcomment(){
    $("#savecommentFlag").remove();
}

function setdisnone(){

    if(curWwwPath.search("hongbao") == -1){
        //$("#tagnavtop").hide();
       /* upfile
        videofile
        attachfile
        voicefile
        hongbaofile*/
        $("#upfile").show();
        $("#videofile").hide();
        $("#attachfile").hide();
        $("#voicefile").hide();
        $("#hongbaofile").hide();
        //$("#hongbaodis").hide();
    }else{
        $("#tagnavtop").hide();
        //$("#hongbaodis").show();
        $("#upfile").hide();
        $("#videofile").hide();
        $("#attachfile").hide();
        $("#voicefile").hide();
        $("#hongbaofile").show();
    }

}
//打开发布信息
function openDongtaiSave(renderId,manyType,commontType,zuoZhe){

    $("#haveWdCommnetFlag").remove();
    $("#havaCommnetFlag").remove();
    $("#haveHdCommnetFlag").remove();
    $(".weui-uploader__hd").remove();//
    havaCommnetContent();
    //setdisImagefile();
    //setdisnone();//暂时取消支持视频，语音，文件，红包格式。update by Is_lwy

    //setdisvideofile();

    if(localStorage.getItem("isshipin") == '1'){
        $("#disshipin").hide();
        $("#videofile").hide();
        $("#zhuti").hide();
        $("#videojiage").hide();

    }
    if(localStorage.getItem("istupian") == '1'){
        $("#distupian").hide();
        $("#upfile").hide();
    }
    if(localStorage.getItem("ishongbao") == '1'){
        $("#hongbaodis").hide();
        $("#hongbaofile").hide();
    }
    if(localStorage.getItem("isyuyin") == '1'){
        $("#yuyin").hide();
        $("#voicefile").hide();
    }
    if(localStorage.getItem("iswenjian") == '1'){
        $("#wenjian").hide();
        $("#attachfile").hide();
    }



    $("#is_weui_hidden").remove();//
    $("#fabiaotitle").html("发布信息");
    $("#buttonSavecomment").attr("onclick","saveNRdongTai()");

    $("#halfComment").popup();
    //处理id和类型input
    if($("#commentManyType").size() > 0){
        $("#commentManyType").val(manyType);
    }else{
        $("body").append("<input type='hidden' id='commentManyType' value='"+manyType+"' >");
    }
    if($("#commontCommentType").size() > 0){
        $("#commontCommentType").val(commontType);
    }else{
        $("body").append("<input type='hidden' id='commontCommentType' value='"+commontType+"' >");
    }
    if($("#commontZuoZheType").size() > 0){
        $("#commontZuoZheType").val(zuoZhe);
    }else{
        $("body").append("<input type='hidden' id='commontZuoZheType' value='"+zuoZhe+"' >");
    }
}

//打开发布信息
function openDongtaiSave2(renderId,manyType,commontType,zuoZhe){
    $("#fabiaotitle").html("发布素材");
    $("#buttonSavecomment").attr("onclick","saveNRdongTai()");

    $("#halfComment").popup();
    //处理id和类型input
    if($("#commentManyType").size() > 0){
        $("#commentManyType").val(manyType);
    }else{
        $("body").append("<input type='hidden' id='commentManyType' value='"+manyType+"' >");
    }
    if($("#commontCommentType").size() > 0){
        $("#commontCommentType").val(commontType);
    }else{
        $("body").append("<input type='hidden' id='commontCommentType' value='"+commontType+"' >");
    }
    if($("#commontZuoZheType").size() > 0){
        $("#commontZuoZheType").val(zuoZhe);
    }else{
        $("body").append("<input type='hidden' id='commontZuoZheType' value='"+zuoZhe+"' >");
    }
}


//打开发布信息
function openDongtaiSaveBD(renderId,manyType,commontType,zuoZhe){
    $("#haveWdCommnetFlag").remove();
    $("#havaCommnetFlag").remove();
    $("#haveHdCommnetFlag").remove();
    havaCommnetContent();
    $("#fabiaotitle").html("发布BD信息");
    $("#buttonSavecomment").attr("onclick","saveNRdongTai()");

    $("#halfComment").popup();
    //处理id和类型input
    if($("#commentManyType").size() > 0){
        $("#commentManyType").val(manyType);
    }else{
        $("body").append("<input type='hidden' id='commentManyType' value='"+manyType+"' >");
    }
    if($("#commontCommentType").size() > 0){
        $("#commontCommentType").val(commontType);
    }else{
        $("body").append("<input type='hidden' id='commontCommentType' value='"+commontType+"' >");
    }
    if($("#commontZuoZheType").size() > 0){
        $("#commontZuoZheType").val(zuoZhe);
    }else{
        $("body").append("<input type='hidden' id='commontZuoZheType' value='"+zuoZhe+"' >");
    }
}



//打开提问
function openDongtaiWdSave(renderId,manyType,commontType,zuoZhe){
    $("#haveWdCommnetFlag").remove();
    $("#havaCommnetFlag").remove();
    $("#haveHdCommnetFlag").remove();
    haveWdCommnetContent();

    //其他
    /*$("#hongbaoMoney").picker({
        title: "请选择红包金额",
        cols: [
            {
                textAlign: 'center',
                values: ['5','10','50','100','200']
            }
        ],
        onChange: function(p, v, dv) {
            //console.log(p, v, dv);
        },
        onClose: function(p, v, d) {
            //console.log("close");
        }
    });*/
    /*$("#hongbaoNum").picker({
        title: "请选择红包数量",
        cols: [
            {
                textAlign: 'center',
                values: ['1','3','5','10','20','30','50','100']
            }
        ],
        onChange: function(p, v, dv) {
            //console.log(p, v, dv);
        },
        onClose: function(p, v, d) {
            //console.log("close");
        }
    });*/

    if(true){
       /* //$("#questionTopic").val("财商");
        $("#questionTopic").picker({

            title: "请选择问题主题",
            cols: [
                {
                    textAlign: 'center',
                    values:["财商","互联网","行业热点","第三方知识库","官方知识库","卡技术干货","贷款技术干货","其他"]
                }
            ],
            onChange: function(p, v, dv) {
                //console.log(p, v, dv);
            },
            onClose: function(p, v, d) {
                //console.log("close");
            }
        });*/
        /*$("#questionTopic").select({
            title: "请选择主题",
            items: [
                {title:"财商知识",value:"1",},{title:"技术干货",value:"4",},{title:"风生水起",value:"7",},{title:"推广营销",value:"2",},{title:"创业热点",value:"3",},{title:"心灵治愈",value:"5",},{title:"幸福生活",value:"6",},{title:"国学养生",value:"8",},{title:"艺术人生",value:"9",}            ]
        });*/
        //getQuestionTypeInfo();

    }
    /*var topic = $("#topic").val();
    console.log("===="+topic);

    /!*$("#questionTopic").select({
        title: "喜欢的美女",
        items: [topic],
        onChange: function(d) {
            console.log(this, d);
        },
        onClose: function() {
            console.log("close");
        },
        onOpen: function() {
            console.log("open");
        },
    });*!/

    $("#questionTopic").select({
        title: "选择手机",
        items: [
            topic
        ]
    });*/

    $("#fabiaotitle").html("问题描述");
    $("#buttonSavecomment").attr("onclick","saveNRquestion()");
    if($("#guanzhuId").size()  > 0){
        $("#hongbaoshumu").hide();
        $("#hongbaoNum").val("1");
    }
    $("#halfComment").popup();
    //处理id和类型input
    if($("#commentManyType").size() > 0){
        $("#commentManyType").val(manyType);
    }else{
        $("body").append("<input type='hidden' id='commentManyType' value='"+manyType+"' >");
    }
    if($("#commontCommentType").size() > 0){
        $("#commontCommentType").val(commontType);
    }else{
        $("body").append("<input type='hidden' id='commontCommentType' value='"+commontType+"' >");
    }
    if($("#commontZuoZheType").size() > 0){
        $("#commontZuoZheType").val(zuoZhe);
    }else{
        $("body").append("<input type='hidden' id='commontZuoZheType' value='"+zuoZhe+"' >");
    }
}

//打开发布信息
function openDongtaiWdHdSave(renderId,manyType,commontType,zuoZhe){
    $("#fabiaotitle").html("回答问题");
    $("#buttonSavecomment").attr("onclick","saveNRanswer()");
    $("#commentContent").attr("placeholder","请输入您的回答内容");
    $("#halfComment").popup();
    //处理id和类型input
    if($("#commentManyType").size() > 0){
        $("#commentManyType").val(manyType);
    }else{
        $("body").append("<input type='hidden' id='commentManyType' value='"+manyType+"' >");
    }
    if($("#commontCommentType").size() > 0){
        $("#commontCommentType").val(commontType);
    }else{
        $("body").append("<input type='hidden' id='commontCommentType' value='"+commontType+"' >");
    }
    if($("#commontZuoZheType").size() > 0){
        $("#commontZuoZheType").val(zuoZhe);
    }else{
        $("body").append("<input type='hidden' id='commontZuoZheType' value='"+zuoZhe+"' >");
    }
}
//打开聊天
function openChatSave(renderId,manyType,commontType,zuoZhe){
    $("#fabiaotitle").html("发送聊天内容");
    $("#buttonSavecomment").attr("onclick","saveNRchat()");
    $("#buttonSavecomment").html("发送");
    $("#halfComment").popup();

    if(localStorage.getItem("isshipin") == '1'){
        $("#disshipin").hide();
        $("#videofile").hide();
        $("#zhuti").hide();
        $("#videojiage").hide();
    }
    if(localStorage.getItem("istupian") == '1'){
        $("#distupian").hide();
        $("#upfile").hide();
    }
    if(localStorage.getItem("ishongbao") == '1'){
        $("#hongbaodis").hide();
        $("#hongbaofile").hide();
    }
    if(localStorage.getItem("isyuyin") == '1'){
        $("#yuyin").hide();
        $("#voicefile").hide();
    }
    if(localStorage.getItem("iswenjian") == '1'){
        $("#wenjian").hide();
        $("#attachfile").hide();
    }


    //处理id和类型input
    if($("#commentManyType").size() > 0){
        $("#commentManyType").val(manyType);
    }else{
        $("body").append("<input type='hidden' id='commentManyType' value='"+manyType+"' >");
    }
    if($("#commontCommentType").size() > 0){
        $("#commontCommentType").val(commontType);
    }else{
        $("body").append("<input type='hidden' id='commontCommentType' value='"+commontType+"' >");
    }
    if($("#commontZuoZheType").size() > 0){
        $("#commontZuoZheType").val(zuoZhe);
    }else{
        $("body").append("<input type='hidden' id='commontZuoZheType' value='"+zuoZhe+"' >");
    }
}
//打开发布信息
function openDongtaiSaveDsp(renderId,manyType,commontType,zuoZhe){
    $("#haveWdCommnetFlag").remove();
    $("#havaCommnetFlag").remove();
    $("#haveHdCommnetFlag").remove();
    havaCommnetContent();
    setdisvideofile();setdisnone();
    $("#fabiaotitle").html("发表视频");
    $("#buttonSavecomment").attr("onclick","saveNRdongTai()");

    $("#halfComment").popup();
    //处理id和类型input
    if($("#commentManyType").size() > 0){
        $("#commentManyType").val(manyType);
    }else{
        $("body").append("<input type='hidden' id='commentManyType' value='"+manyType+"' >");
    }
    if($("#commontCommentType").size() > 0){
        $("#commontCommentType").val(commontType);
    }else{
        $("body").append("<input type='hidden' id='commontCommentType' value='"+commontType+"' >");
    }
    if($("#commontZuoZheType").size() > 0){
        $("#commontZuoZheType").val(zuoZhe);
    }else{
        $("body").append("<input type='hidden' id='commontZuoZheType' value='"+zuoZhe+"' >");
    }
}

//保存数据
function savedongTai(){
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        initNRdongTai();
        return false;
    }
    $.toast("提交中…", "text");
    //参数
    var commentType = $("#commontCommentType").val();
    var contentType = $("#radioComment").val();
    var commentFile = $("#commentFile").val();
    if(contentType == '1'){//图片
        commentFile = pathUrl("uploaderInputA");
    }else if(contentType == '2'){//语音
        commentFile = $("#voicefileInput").val();
    }else if(contentType == '3'){//视频
        commentFile = pathUrl("uploaderInputB");
    }else if(contentType == '4'){//文件
        commentFile = pathUrl("uploaderInputC");
    }else if(contentType == '5'){//红包
        commentFile = baseDefaultHongBaoImage;
        //先设置支付密码--再去选择支付方式提交支付--提交订单（评论ID-）--支付成功--新增评论记录-新增红包记录--有人领取则是新增领取记录---自己类型和资金分类需要增加红包收入和支出，红包表缺少状态
    }



    var commentContent = $("#commentContent").val();
    var commentAboutid = $("#commentManyType").val();
    var token = localStorage.getItem('token');
    var zuoZhe = $("#commontZuoZheType").val();
    //判断不为空数据是否为空

    if(commentContent ==null || commentContent ==''){

        if(commentFile ==null || commentFile ==''){
            $.toast("请输入文字信息", "text");
            initNRdongTai();
            return false;
        }

    }

    var isbd = $("#isbd").val();
    var topic = $("#topic").val();
    //参数
    var dongtai_type = contentType;
    var dongtaiFile = commentFile;
    var dongtaiContent = commentContent;

    var dongtaiTopic = $("#dongtaiTopic").val();
    var price = $("#price").val();
    var isyuanchuang = '0';
    if(price != '0'){
        isyuanchuang = '1';

    }
    //判断不为空数据是否为空

    //传输数据
    var datadongTai = {
        "dongtaiType":dongtai_type,
        "dongtaiFile":dongtaiFile,
        "dongtaiContent":dongtaiContent,
        "isbd":isbd,
        "isyuanchuang":isyuanchuang,
        "topic":dongtaiTopic,
        "price":price,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/dongtai/dongTai/savereturn',
        data:datadongTai,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //$.toast("操作成功", 'success');
                $("#commentManyType").remove();
                $("#commontCommentType").remove();
                $("#commontZuoZheType").remove();
                initNRdongTai();
                qingchuAllUrl();
                if(contentType == '5'){//最后三个为备用参数--为了支付后还能跳转回去--remarks--返回评论ID
                    savehongBao(commentContent,"2",rs.data.result.id,null,null,null);
                }else{
                    refresh();
                }

            }else{
                $.toast(rs.data.msg, "text");
                initNRdongTai();
                if(rs.data.code == '-1'){
                    localStorage.setItem('token','');
                    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                        isLogin('','');
                    }
                }
            }
        }else{
            console.log('请求异常！')
            $.toast("操作失败", "text");
            initNRdongTai();
        }

    });

}

//防重复提交保存
function saveNRdongTai(){
    if(localStorage.getItem("vip") == 'no' && localStorage.getItem("vipfabu") == '1'){
        $.confirm("对不起，您暂无发布权限！", "<span style='color: red;font-weight: bolder;'>去领取?</span>", function() {
            toUserLevelDetail(localStorage.getItem("isonevip"));
        }, function() {
            //取消操作
            return false;
        });

    }else{
        var savedongTaiFlag = $("#savedongTaiFlag").val();
        if(savedongTaiFlag > 0){
            $.toast("请勿重复提交", "text");
        }else{
            if($("#savedongTaiFlag").size() == 0) {
                $("body").append("<input type='hidden' id='savedongTaiFlag' value='1' >");
                savedongTai();
            }
        }
    }
}
//初始化重复提交判断
function initNRdongTai(){
    $("#savedongTaiFlag").remove();
}


//保存数据
function savechat(){
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        initNRchat();
        return false;
    }
    $.toast("发送中…", "text");
    //参数
    var commentType = $("#commontCommentType").val();
    var contentType = $("#radioComment").val();
    var commentFile = $("#commentFile").val();
    if(contentType == '1'){//图片
        commentFile = pathUrl("uploaderInputA");
    }else if(contentType == '2'){//语音
        commentFile = $("#voicefileInput").val();
    }else if(contentType == '3'){//视频
        commentFile = pathUrl("uploaderInputB");
    }else if(contentType == '4'){//文件
        commentFile = pathUrl("uploaderInputC");
    }else if(contentType == '5'){//红包
        commentFile = baseDefaultHongBaoImage;
        //先设置支付密码--再去选择支付方式提交支付--提交订单（评论ID-）--支付成功--新增评论记录-新增红包记录--有人领取则是新增领取记录---自己类型和资金分类需要增加红包收入和支出，红包表缺少状态
    }
    var commentContent = $("#commentContent").val();
    var commentAboutid = $("#commentManyType").val();
    var token = localStorage.getItem('token');
    var zuoZhe = $("#commontZuoZheType").val();
    //判断不为空数据是否为空

    if(commentContent ==null || commentContent ==''){

        if(commentFile ==null || commentFile ==''){

            $.toast("请输入文字信息", "text");
            initNRchat();
            return false;
        }
    }else{

    }

    /*if(commentFile ==null || commentFile ==''){
        $.toast("请选择文件上传", "text");
        initNRchat();
        return false;
    }*/

    //参数
    var dongtai_type = contentType;
    var dongtaiFile = commentFile;
    var dongtaiContent = commentContent;
    var qunId = GetUrlString('id');
    //判断不为空数据是否为空
    //传输数据
    var datachat = {
        "messageType":dongtai_type,
        "messageFile":dongtaiFile,
        "messageContent":dongtaiContent,
        "qunId":qunId,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/xiaoxi/xiaoXi/savereturn',
        data:datachat,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //$.toast("操作成功", 'success');
                $("#commentManyType").remove();
                $("#commontCommentType").remove();
                $("#commontZuoZheType").remove();
                $("#commentContent").val("");
                $("#uploaderFilesA").html("");
                $("#uploaderFilesB").html("");
                $("#uploaderFilesC").html("");
                initNRchat();
                qingchuAllUrl();
                clearsub();
                if(contentType == '5'){//最后三个为备用参数--为了支付后还能跳转回去--remarks--返回ID
                    //console.log(rs.data.result.id);
                    //console.log(commentContent)
                    savehongBao(commentContent,"3",rs.data.result.id,null,null,null);
                    //setTimeout(function() {
                    listxiaoXi("xiaoxidetail","1",100,"2");
                    //}, 1000)
                    //closePopup();
                }else{
                   // setTimeout(function() {
                    listxiaoXi("xiaoxidetail","1",100,"2");
                    //}, 1000)
                }

            }else{
                $.toast(rs.data.msg, "text");
                initNRchat();
                if(rs.data.code == '-1'){
                    localStorage.setItem('token','');
                    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                        isLogin('','');
                    }
                }
            }
        }else{
            console.log('请求异常！')
            $.toast("操作失败", "text");
            initNRchat();
        }

    });

}

//防重复提交保存
function saveNRchat(){
    if(localStorage.getItem("vip")  != 'vip'  && localStorage.getItem("vipfabu") == '1'){
        $.confirm("对不起，您暂无发布权限！", "<span style='color: red;font-weight: bolder;'>去领取?</span>", function() {
            toUserLevelDetail(localStorage.getItem("isonevip"));
        }, function() {
            //取消操作
            return false;
        });

    }else {
        var savechatFlag = $("#savechatFlag").val();
        if (savechatFlag > 0) {
            $.toast("请勿重复提交", "text");
        } else {
            if ($("#savechatFlag").size() == 0) {
                $("body").append("<input type='hidden' id='savechatFlag' value='1' >");
                savechat();
            }
        }
    }
}
//初始化重复提交判断
function initNRchat(){
    $("#savechatFlag").remove();
}


//保存数据
function savequestion(){
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        initNRquestion();
        return false;
    }
    $.toast("提交中…", "text");
    //参数questionType-questionTitle-questionImage-questionContent-questionYaoqingren-questionPrice
    var commentType = $("#commontCommentType").val();
    var contentType = $("#radioComment").val();
    var commentFile = $("#commentFile").val();
    if(contentType == '1'){//图片
        commentFile = pathUrl("uploaderInputA");
    }else if(contentType == '2'){//语音
        commentFile = $("#voicefileInput").val();
    }else if(contentType == '3'){//视频
        commentFile = pathUrl("uploaderInputB");
    }else if(contentType == '4'){//文件
        commentFile = pathUrl("uploaderInputC");
    }/*else if(contentType == '5'){//红包
        commentFile = baseDefaultHongBaoImage;
        //先设置支付密码--再去选择支付方式提交支付--提交订单（评论ID-）--支付成功--新增评论记录-新增红包记录--有人领取则是新增领取记录---自己类型和资金分类需要增加红包收入和支出，红包表缺少状态
    }*/
    var commentContent = $("#commentContent").val();
    var commentAboutid = $("#commentManyType").val();
    var token = localStorage.getItem('token');
    var zuoZhe = $("#commontZuoZheType").val();
    //判断不为空数据是否为空
    if(commentContent ==null || commentContent ==''){

        if(commentFile ==null || commentFile ==''){
            $.toast("请填写问题描述", "text");
            initNRquestion();
            return false;
        }
    }

    //提问
    var questionYaoqingren = $("#guanzhuId").val();
    var question_topic = $("#questionTopic").val();

    var questionPrice = $("#hongbaoMoney").val();
    var switchCPWd = $("#switchCPWdFlag").val();
    if(question_topic ==null || question_topic ==''){
            $.toast("请选择问题主题", "text");
            initNRquestion();
            return false;
    }



    if(switchCPWd == '0'){//最后三个为备用参数--为了支付后还能跳转回去--remarks--返回评论ID
        questionPrice = 0.00;
    }
    //参数
    var question_type = contentType;
    var questionFile = commentFile;
    var questionContent = commentContent;
    //判断不为空数据是否为空

    //传输数据
    var dataquestion = {
        "questionType":question_type,
        "questionTopic":question_topic,
        "questionImage":questionFile,
        "questionTitle":questionContent,
        "questionContent":questionContent,
        "questionYaoqingren":questionYaoqingren,
        "questionPrice":questionPrice,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/wd/question/question/savereturn',
        data:dataquestion,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //$.toast("操作成功", 'success');
                $("#commentManyType").remove();
                $("#commontCommentType").remove();
                $("#commontZuoZheType").remove();
                initNRquestion();
                qingchuAllUrl();
                if(switchCPWd == '1'){//最后三个为备用参数--为了支付后还能跳转回去--remarks--返回评论ID
                    savehongBao(commentContent,"4",rs.data.result.id,null,null,null);
                }else{
                    refresh();
                }

            }else{
                $.toast(rs.data.msg, "text");
                initNRquestion();
                if(rs.data.code == '-1'){
                    localStorage.setItem('token','');
                    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                        isLogin('','');
                    }
                }
            }
        }else{
            console.log('请求异常！')
            $.toast("操作失败", "text");
            initNRquestion();
        }

    });

}

//防重复提交保存
function saveNRquestion(){
    if(localStorage.getItem("vip")  != 'vip'  && localStorage.getItem("vipfabu") == '1'){
        $.confirm("对不起，您暂无发布权限！", "<span style='color: red;font-weight: bolder;'>去领取?</span>", function() {
            toUserLevelDetail(localStorage.getItem("isonevip"));
        }, function() {
            //取消操作
            return false;
        });

    }else {
        var savequestionFlag = $("#savequestionFlag").val();
        if (savequestionFlag > 0) {
            $.toast("请勿重复提交", "text");
        } else {
            if ($("#savequestionFlag").size() == 0) {
                $("body").append("<input type='hidden' id='savequestionFlag' value='1' >");
                savequestion();
            }
        }
    }
}
//初始化重复提交判断
function initNRquestion(){
    $("#savequestionFlag").remove();
}


//保存数据
function saveanswer(){
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        initNRanswer();
        return false;
    }
    $.toast("提交中…", "text");
    //参数answerType-answerTitle-answerImage-answerContent-answerYaoqingren-answerPrice
    var commentType = $("#commontCommentType").val();
    var contentType = $("#radioComment").val();
    var commentFile = $("#commentFile").val();
    if(contentType == '1'){//图片
        commentFile = pathUrl("uploaderInputA");
    }else if(contentType == '2'){//语音
        commentFile = $("#voicefileInput").val();
    }else if(contentType == '3'){//视频
        commentFile = pathUrl("uploaderInputB");
    }else if(contentType == '4'){//文件
        commentFile = pathUrl("uploaderInputC");
    }/*else if(contentType == '5'){//红包
        commentFile = baseDefaultHongBaoImage;
        //先设置支付密码--再去选择支付方式提交支付--提交订单（评论ID-）--支付成功--新增评论记录-新增红包记录--有人领取则是新增领取记录---自己类型和资金分类需要增加红包收入和支出，红包表缺少状态
    }*/
    var commentContent = $("#commentContent").val();
    var commentAboutid = $("#commentManyType").val();
    var token = localStorage.getItem('token');
    var zuoZhe = $("#commontZuoZheType").val();
    //判断不为空数据是否为空
    if(commentContent ==null || commentContent ==''){

        if(commentFile ==null || commentFile ==''){
            $.toast("请填写问题描述", "text");
            initNRanswer();
            return false;
        }
    }


    //提问人不为空-则是提问人回答后将红包发给提问人;--发送消息给被提问人
    //var answerYaoqingren = $("#answerYaoqingren").val();
    var answer_topic = $("#answerTopic").val();
    var answerPrice = $("#hongbaoMoney").val();
    var switchCPWd = $("#switchCPWdFlag").val();
    if(switchCPWd == '0'){//最后三个为备用参数--为了支付后还能跳转回去--remarks--返回评论ID
        answerPrice = 0.00;
    }

    //参数
    var answer_type = contentType;
    var answerFile = commentFile;
    var answerContent = commentContent;
    //判断不为空数据是否为空
    var  questionId = GetUrlString("id");
    //传输数据
    var dataanswer = {
        "contentType":answer_type,
        "answerFile":answerFile,
        "answerContent":answerContent,
        "answerPrice":answerPrice,
        "questionId":questionId,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/wd/answer/answer/savereturn',
        data:dataanswer,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //$.toast("操作成功", 'success');
                $("#commentManyType").remove();
                $("#commontCommentType").remove();
                $("#commontZuoZheType").remove();
                initNRanswer();
                qingchuAllUrl();
                refresh();

            }else{
                $.toast(rs.data.msg, "text");
                initNRanswer();
                if(rs.data.code == '-1'){
                    localStorage.setItem('token','');
                    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                        isLogin('','');
                    }
                }
            }
        }else{
            console.log('请求异常！')
            $.toast("操作失败", "text");
            initNRanswer();
        }

    });

}

//防重复提交保存
function saveNRanswer(){
    if(localStorage.getItem("vip")  != 'vip'  && localStorage.getItem("vipfabu") == '1'){
        $.confirm("对不起，您暂无发布权限！", "<span style='color: red;font-weight: bolder;'>去领取?</span>", function() {
            toUserLevelDetail(localStorage.getItem("isonevip"));
        }, function() {
            //取消操作
            return false;
        });

    }else {
        var saveanswerFlag = $("#saveanswerFlag").val();
        if (saveanswerFlag > 0) {
            $.toast("请勿重复提交", "text");
        } else {
            if ($("#saveanswerFlag").size() == 0) {
                $("body").append("<input type='hidden' id='saveanswerFlag' value='1' >");
                saveanswer();
            }
        }
    }
}
//初始化重复提交判断
function initNRanswer(){
    $("#saveanswerFlag").remove();
}







//监听是否渲染
$(function () {

    //判断获取列表第一页
    if($("#buttonListFirstcomment").size()>0){
        getListcomment(commentRenderId1,'1',10,1);
    }

    //判断获取详情信息
    if($("#buttonDetailcomment").size()>0){
        detailcomment();
    }

});


function clearsub() {
    $("#commentContent").html("");
}

//支付类型选择
function paySelect(){//支付
    var HTMLPAY = '';
        if(localStorage.getItem('token') != null && localStorage.getItem('token') != 'null' && localStorage.getItem('token') != ''){

        //参数
        var token = localStorage.getItem('token');

        //传输数据
        var datauser = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
            "token":token
        }

        instancecomment({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sys/user/userdetail',
            data: datauser,
            cancelToken: sourcecomment.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            var orderMoney = $("#orderMoney").val();
            if(rs.status=200){
            	console.log("money",rs.data.result.money)
            	console.log("orderMoney",orderMoney)
            	
                if(rs.data.result.money > 0.00 && rs.data.result.money > eval( orderMoney)){
                	
                    var typeXianShi = $("#orderType").val();
                    if(typeXianShi == '2'){
                        HTMLPAY += '<div class="page-bd" style="margin-top:30%;padding-top:10px;margin-left:6%;width:88%;max-height:350px;background-color: white;z-index: 9999;"><div class="weui-cells__title " style="color: red;text-align: center;">企业认证</div>';

                    }else if(typeXianShi == '4'){
                        HTMLPAY += '<div class="page-bd" style="margin-top:30%;padding-top:10px;margin-left:6%;width:88%;max-height:350px;background-color: white;z-index: 9999;"><div class="weui-cells__title " style="color: red;text-align: center;">大V认证</div>';

                    }else{
                        HTMLPAY += '<div class="page-bd" style="margin-top:30%;padding-top:10px;margin-left:6%;width:88%;max-height:350px;background-color: white;z-index: 9999;"><div class="weui-cells__title ">请选择支付方式</div>';

                    }

                    HTMLPAY += '<div class="weui-cells weui-cells_radio f16">';


                    if($("#orderType").val() == '22' && localStorage.getItem("isqrpay") == '1'){


                    }else{
                        if(getBrowser() != 'alimobile'  && localStorage.getItem("iswxpay") == '1' ){

                            HTMLPAY += '<label class="weui-cell weui-check__label" onclick="setweixinpay();" for="x16">';
                            HTMLPAY += '<div class="weui-cell__bd">';
                            HTMLPAY += '<p><img class="avatar" src="../../img/agent/images/weixin.png" width="15px" height="15px">&nbsp;微信支付<span class="slogan"></span></p>';
                            HTMLPAY += '</div>';
                            HTMLPAY += '<div class="weui-cell__ft">';
                            HTMLPAY += '<input class="weui-check" name="payWay" value="1" checked="checked" id="x16" type="radio">';
                            HTMLPAY += '<span class="weui-icon-checked"></span>';
                            HTMLPAY += '</div>';
                            HTMLPAY += '</label>';
                        }

                        if(getBrowser() != 'wxmobile'  && localStorage.getItem("isalipay") == '1'){
                            HTMLPAY += '<label class="weui-cell weui-check__label "  onclick="setalipay();" for="x15">';
                            HTMLPAY += '<div class="weui-cell__bd">';
                            HTMLPAY += '<p><img class="avatar" src="../../img/agent/images/zhifubao.png" width="15px" height="15px">&nbsp;支付宝支付<span class="slogan"></span></p>';
                            HTMLPAY += '</div>';
                            HTMLPAY += '<div class="weui-cell__ft">';
                            HTMLPAY += '<input name="payWay" class="weui-check" value="2" id="x15"  type="radio">';
                            HTMLPAY += '<span class="weui-icon-checked"></span>';
                            HTMLPAY += '</div>';
                            HTMLPAY += '</label>';
                        }

                    }




                    if($("#noyue").size() > 0 && localStorage.getItem("isyue") == '1'){
                        HTMLPAY += '<label class="weui-cell weui-check__label disnone"  onclick="setyuepay();" for="x14">';
                    }else{
                        HTMLPAY += '<label class="weui-cell weui-check__label"  onclick="setyuepay();" for="x14">';
                    }
						
                    HTMLPAY += '<div class="weui-cell__bd">';
                    HTMLPAY += '<p><img class="avatar" src="../../img/agent/images/yuezhifu.png" width="15px" height="15px">&nbsp;余额支付<span class="slogan">金币'+rs.data.result.money+'克</span></p>';
                    HTMLPAY += '</div>';
                    HTMLPAY += '<div class="weui-cell__ft">';
                    HTMLPAY += '<input name="payWay" class="weui-check" value="3" id="x14"  type="radio">';
                    HTMLPAY += '<span class="weui-icon-checked"></span>';
                    HTMLPAY += '</div>';
                    HTMLPAY += '</label>';
                    HTMLPAY += '</div>';
                    HTMLPAY += '<div id="zhifumimaPay" class="disnone"><div class="weui-cells__title ">请填写支付密码</div>';
                    HTMLPAY += '<div class="weui-cell ">';
                    HTMLPAY += '<div class="weui-cell__hd"><label class="weui-label">支付密码</label></div>';
                    HTMLPAY += '<div class="weui-cell__bd">';
                    HTMLPAY += '<input class="weui-input" pattern="[0-9]*" maxlength="6" name="payPassword" id="payPassword" placeholder="默认是手机号后六位" type="password">';
                    HTMLPAY += '</div>';
                    HTMLPAY += '</div></div>';
                    HTMLPAY += '<div class="clear"><a  onclick="saveNRPay();" class="weui-btn weui-btn_primary mybtn" style="margin-top:45px;margin-left: 20px;margin-right: 20px;" >确定</a></div>';
                    HTMLPAY += '<div style=height:20px;""></div>';
                    HTMLPAY += '</div>';
                    var html = HTMLPAY;
                    var div = document.createElement('div');
                    div.id='paytips';
                    div.style='position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;';
                    div.innerHTML= html;
                    //document.body.appendChild(div);
                    if($("#paytips").size() == 0){
                        //$("div").hide();
                        document.body.appendChild(div);
                        if($("#paytips").attr("position") != 'fixed'){
                            $("#paytips").attr("style","position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;");
                        }
                    }
                    $("input,select,textarea").blur(function(){
                        setTimeout(function() {
                            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                        }, 100);
                    });

                }else{
                    HTMLPAY += '<div class="page-bd" style="margin-top:30%;padding-top:10px;margin-left:6%;width:88%;max-height:350px;background-color: white;z-index: 9999;"><div class="weui-cells__title ">请选择支付方式</div>';
                    HTMLPAY += '<div class="weui-cells weui-cells_radio f16">';
                    if($("#orderType").val() == '22' && localStorage.getItem("isqrpay") == '1'){

                        jinbi2();
                        return false;


                    }else{
                        if(getBrowser() != 'alimobile'  && localStorage.getItem("iswxpay") == '1'){
                            HTMLPAY += '<label class="weui-cell weui-check__label" onclick="setweixinpay();" for="x16">';
                            HTMLPAY += '<div class="weui-cell__bd">';
                            HTMLPAY += '<p><img class="avatar" src="../../img/agent/images/weixin.png" width="15px" height="15px">&nbsp;微信支付<span class="slogan"></span></p>';
                            HTMLPAY += '</div>';
                            HTMLPAY += '<div class="weui-cell__ft">';
                            HTMLPAY += '<input class="weui-check" name="payWay" value="1" checked="checked" id="x16" type="radio">';
                            HTMLPAY += '<span class="weui-icon-checked"></span>';
                            HTMLPAY += '</div>';
                            HTMLPAY += '</label>';
                        }

                        if(getBrowser() != 'wxmobile'  && localStorage.getItem("isalipay") == '1'){
                            HTMLPAY += '<label class="weui-cell weui-check__label "  onclick="setalipay();" for="x15">';
                            HTMLPAY += '<div class="weui-cell__bd">';
                            HTMLPAY += '<p><img class="avatar" src="../../img/agent/images/zhifubao.png" width="15px" height="15px">&nbsp;支付宝支付<span class="slogan"></span></p>';
                            HTMLPAY += '</div>';
                            HTMLPAY += '<div class="weui-cell__ft">';
                            HTMLPAY += '<input name="payWay" class="weui-check" value="2" id="x15"  type="radio">';
                            HTMLPAY += '<span class="weui-icon-checked"></span>';
                            HTMLPAY += '</div>';
                            HTMLPAY += '</label>';
                        }

                    }



                    HTMLPAY += '</div>';
                    HTMLPAY += '<div id="zhifumimaPay" class="disnone"><div class="weui-cells__title ">请填写支付密码</div>';
                    HTMLPAY += '<div class="weui-cell ">';
                    HTMLPAY += '<div class="weui-cell__hd"><label class="weui-label">支付密码</label></div>';
                    HTMLPAY += '<div class="weui-cell__bd">';
                    HTMLPAY += '<input class="weui-input" pattern="[0-9]*" maxlength="6" name="payPassword" id="payPassword" placeholder="默认是手机号后六位" type="password">';
                    HTMLPAY += '</div>';
                    HTMLPAY += '</div></div>';
                    HTMLPAY += '<div class="clear"><a  onclick="saveNRPay();" class="weui-btn weui-btn_primary mybtn" style="margin-top:45px;margin-left: 20px;margin-right: 20px;" >确定</a></div>';
                    HTMLPAY += '<div style=height:20px;""></div>';
                    HTMLPAY += '</div>';
                    var html = HTMLPAY;
                    var div = document.createElement('div');
                    div.id='paytips';
                    div.style='position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;';
                    div.innerHTML= html;
                    //document.body.appendChild(div);
                    if($("#paytips").size() == 0){
                        //$("div").hide();
                        document.body.appendChild(div);
                        if($("#paytips").attr("position") != 'fixed'){
                            $("#paytips").attr("style","position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;");
                        }
                    }
                    $("input,select,textarea").blur(function(){
                        setTimeout(function() {
                            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                        }, 100);
                    });
                }

            }else{
                return null;
                console.log('请求异常！')
            }

        });

    }


}
//支付类型选择
function paySelectPro(){//支付
    var HTMLPAY = '';
    if(localStorage.getItem('token') != null && localStorage.getItem('token') != 'null' && localStorage.getItem('token') != ''){

        //参数
        var token = localStorage.getItem('token');

        //传输数据
        var datauser = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
            "token":token
        }

        instancecomment({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sys/user/userdetail',
            data: datauser,
            cancelToken: sourcecomment.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            var orderMoney = $("#orderMoney").val();
            if(rs.status=200){
                console.log("money",rs.data.result.money)
                console.log("orderMoney",orderMoney)

                if(rs.data.result.money > 0.00 && rs.data.result.money > eval( orderMoney) && localStorage.getItem("isqrpay") != '1'){//不能开启二维码支付

                    var typeXianShi = $("#orderType").val();
                    if(typeXianShi == '2'){
                        HTMLPAY += '<div class="page-bd" style="margin-top:30%;padding-top:10px;margin-left:6%;width:88%;max-height:350px;background-color: white;z-index: 9999;"><div class="weui-cells__title " style="color: red;text-align: center;">企业认证</div>';

                    }else if(typeXianShi == '4'){
                        HTMLPAY += '<div class="page-bd" style="margin-top:30%;padding-top:10px;margin-left:6%;width:88%;max-height:350px;background-color: white;z-index: 9999;"><div class="weui-cells__title " style="color: red;text-align: center;">大V认证</div>';

                    }else{
                        HTMLPAY += '<div class="page-bd" style="margin-top:30%;padding-top:10px;margin-left:6%;width:88%;max-height:350px;background-color: white;z-index: 9999;"><div class="weui-cells__title ">请选择支付方式</div>';

                    }

                    HTMLPAY += '<div class="weui-cells weui-cells_radio f16">';
                    if(getBrowser() != 'alimobile' && localStorage.getItem("iswxpay") == '1'){

                        HTMLPAY += '<label class="weui-cell weui-check__label" onclick="setweixinpay();" for="x16">';
                        HTMLPAY += '<div class="weui-cell__bd">';
                        HTMLPAY += '<p><img class="avatar" src="../../img/agent/images/weixin.png" width="15px" height="15px">&nbsp;微信支付<span class="slogan"></span></p>';
                        HTMLPAY += '</div>';
                        HTMLPAY += '<div class="weui-cell__ft">';
                        HTMLPAY += '<input class="weui-check" name="payWay" value="1" checked="checked" id="x16" type="radio">';
                        HTMLPAY += '<span class="weui-icon-checked"></span>';
                        HTMLPAY += '</div>';
                        HTMLPAY += '</label>';
                    }

                    if(getBrowser() != 'wxmobile'  && localStorage.getItem("isalipay") == '1'){
                        HTMLPAY += '<label class="weui-cell weui-check__label "  onclick="setalipay();" for="x15">';
                        HTMLPAY += '<div class="weui-cell__bd">';
                        HTMLPAY += '<p><img class="avatar" src="../../img/agent/images/zhifubao.png" width="15px" height="15px">&nbsp;支付宝支付<span class="slogan"></span></p>';
                        HTMLPAY += '</div>';
                        HTMLPAY += '<div class="weui-cell__ft">';
                        HTMLPAY += '<input name="payWay" class="weui-check" value="2" id="x15"  type="radio">';
                        HTMLPAY += '<span class="weui-icon-checked"></span>';
                        HTMLPAY += '</div>';
                        HTMLPAY += '</label>';
                    }
                    if(($("#noyue").size() > 0 || $("#orderNo").size() > 0) && localStorage.getItem("isyue") == '1'){
                        HTMLPAY += '<label class="weui-cell weui-check__label disnone"  onclick="setyuepay();" for="x14">';
                    }else{
                        HTMLPAY += '<label class="weui-cell weui-check__label"  onclick="setyuepay();" for="x14">';
                    }

                    HTMLPAY += '<div class="weui-cell__bd">';
                    HTMLPAY += '<p><img class="avatar" src="../../img/agent/images/yuezhifu.png" width="15px" height="15px">&nbsp;余额支付<span class="slogan">'+rs.data.result.money+'元</span></p>';
                    HTMLPAY += '</div>';
                    HTMLPAY += '<div class="weui-cell__ft">';
                    HTMLPAY += '<input name="payWay" class="weui-check" value="3" id="x14"  type="radio">';
                    HTMLPAY += '<span class="weui-icon-checked"></span>';
                    HTMLPAY += '</div>';
                    HTMLPAY += '</label>';
                    HTMLPAY += '</div>';
                    HTMLPAY += '<div id="zhifumimaPay" class="disnone"><div class="weui-cells__title ">请填写支付密码</div>';
                    HTMLPAY += '<div class="weui-cell ">';
                    HTMLPAY += '<div class="weui-cell__hd"><label class="weui-label">支付密码</label></div>';
                    HTMLPAY += '<div class="weui-cell__bd">';
                    HTMLPAY += '<input class="weui-input" pattern="[0-9]*" maxlength="6" name="payPassword" id="payPassword" placeholder="默认是手机号后六位" type="password">';
                    HTMLPAY += '</div>';
                    HTMLPAY += '</div></div>';
                    HTMLPAY += '<div class="clear"><a  onclick="saveNRPay();" class="weui-btn weui-btn_primary mybtn" style="margin-top:45px;margin-left: 20px;margin-right: 20px;" >确定</a></div>';
                    HTMLPAY += '<div style=height:20px;""></div>';
                    HTMLPAY += '</div>';
                    var html = HTMLPAY;
                    var div = document.createElement('div');
                    div.id='paytips';
                    div.style='position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;';
                    div.innerHTML= html;
                    //document.body.appendChild(div);
                    if($("#paytips").size() == 0){
                        //$("div").hide();
                        document.body.appendChild(div);
                        if($("#paytips").attr("position") != 'fixed'){
                            $("#paytips").attr("style","position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;");
                        }
                    }
                    $("input,select,textarea").blur(function(){
                        setTimeout(function() {
                            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                        }, 100);
                    });

                }else{
                    HTMLPAY += '<div class="page-bd" style="margin-top:30%;padding-top:10px;margin-left:6%;width:88%;max-height:350px;background-color: white;z-index: 9999;"><div class="weui-cells__title ">请选择支付方式</div>';
                    HTMLPAY += '<div class="weui-cells weui-cells_radio f16">';
                    if(getBrowser() != 'alimobile'  && localStorage.getItem("iswxpay") == '1'){
                        HTMLPAY += '<label class="weui-cell weui-check__label" onclick="setweixinpay();" for="x16">';
                        HTMLPAY += '<div class="weui-cell__bd">';
                        HTMLPAY += '<p><img class="avatar" src="../../img/agent/images/weixin.png" width="15px" height="15px">&nbsp;微信支付<span class="slogan"></span></p>';
                        HTMLPAY += '</div>';
                        HTMLPAY += '<div class="weui-cell__ft">';
                        HTMLPAY += '<input class="weui-check" name="payWay" value="1" checked="checked" id="x16" type="radio">';
                        HTMLPAY += '<span class="weui-icon-checked"></span>';
                        HTMLPAY += '</div>';
                        HTMLPAY += '</label>';
                    }

                    if(getBrowser() != 'wxmobile'  && localStorage.getItem("isalipay") == '1'){
                        HTMLPAY += '<label class="weui-cell weui-check__label "  onclick="setalipay();" for="x15">';
                        HTMLPAY += '<div class="weui-cell__bd">';
                        HTMLPAY += '<p><img class="avatar" src="../../img/agent/images/zhifubao.png" width="15px" height="15px">&nbsp;支付宝支付<span class="slogan"></span></p>';
                        HTMLPAY += '</div>';
                        HTMLPAY += '<div class="weui-cell__ft">';
                        HTMLPAY += '<input name="payWay" class="weui-check" value="2" id="x15"  type="radio">';
                        HTMLPAY += '<span class="weui-icon-checked"></span>';
                        HTMLPAY += '</div>';
                        HTMLPAY += '</label>';
                    }

                    HTMLPAY += '</div>';
                    HTMLPAY += '<div id="zhifumimaPay" class="disnone"><div class="weui-cells__title ">请填写支付密码</div>';
                    HTMLPAY += '<div class="weui-cell ">';
                    HTMLPAY += '<div class="weui-cell__hd"><label class="weui-label">支付密码</label></div>';
                    HTMLPAY += '<div class="weui-cell__bd">';
                    HTMLPAY += '<input class="weui-input" pattern="[0-9]*" maxlength="6" name="payPassword" id="payPassword" placeholder="默认是手机号后六位" type="password">';
                    HTMLPAY += '</div>';
                    HTMLPAY += '</div></div>';
                    HTMLPAY += '<div class="clear"><a  onclick="saveNRPay();" class="weui-btn weui-btn_primary mybtn" style="margin-top:45px;margin-left: 20px;margin-right: 20px;" >确定</a></div>';
                    HTMLPAY += '<div style=height:20px;""></div>';
                    HTMLPAY += '</div>';
                    var html = HTMLPAY;
                    var div = document.createElement('div');
                    div.id='paytips';
                    div.style='position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;';
                    div.innerHTML= html;
                    //document.body.appendChild(div);
                    if($("#paytips").size() == 0){
                        //$("div").hide();
                        document.body.appendChild(div);
                        if($("#paytips").attr("position") != 'fixed'){
                            $("#paytips").attr("style","position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;");
                        }
                    }
                    $("input,select,textarea").blur(function(){
                        setTimeout(function() {
                            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                        }, 100);
                    });
                }

            }else{
                return null;
                console.log('请求异常！')
            }

        });

    }


}

//保存红包-最后三个为备用参数--为了支付后还能跳转回去
function savehongBao(hongbaoBeizhu,hongbaoType,hongbaoAboutid,var1,var2,var3){
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        return false;
    }
    //参数
    var hongbaoNum = $("#hongbaoNum").val();
    var hongbaoMoney = $("#hongbaoMoney").val();
    var hongbaoBeizhu = hongbaoBeizhu;
    var hongbaoImage = baseDefaultHongBaoImage;
    var isFinish = '0';
    var hongbaoAboutid = hongbaoAboutid;
    var token = localStorage.getItem('token');
    //判断不为空数据是否为空
    if(hongbaoNum ==null || hongbaoNum ==''){
        $.toast("请输入红包数量", "text");
        return false;
    }
    if(hongbaoMoney ==null || hongbaoMoney ==''){
        $.toast("请输入红包金额", "text");
        return false;
    }
    /*if(hongbaoBeizhu ==null || hongbaoBeizhu ==''){
        $.toast("请输入红包备注", "text");
        return false;
    }*/
    if(isFinish ==null || isFinish ==''){
        $.toast("请输入是否领完", "text");
        return false;
    }


    //传输数据
    var datahongBao = {
        "hongbaoNum":hongbaoNum,
        "hongbaoMoney":hongbaoMoney,
        "hongbaoBeizhu":hongbaoBeizhu,
        "hongbaoImage":hongbaoImage,
        "isFinish":isFinish,
        "hongbaoType":hongbaoType,
        "hongbaoAboutid":hongbaoAboutid,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/hongbao/hongBao/save',
        data:datahongBao,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //$.toast("操作成功", 'success');
               //去支付--弹出选择支付方式--支付密码（订单信息）--支付成功--跳回

                //赋值必要参数
                if($("#orderNum").size() > 0){
                    $("#orderNum").val("1");
                }else{
                    $("body").append("<input type='hidden' id='orderNum' value='1' >");
                }
                if($("#orderMoney").size() > 0){
                    $("#orderMoney").val(hongbaoMoney);
                }else{
                    $("body").append("<input type='hidden' id='orderMoney' value='"+hongbaoMoney+"' >");
                }
                if($("#orderType").size() > 0){
                    $("#orderType").val("22");
                }else{
                    $("body").append("<input type='hidden' id='orderType' value='22' >");
                }
                if($("#orderTitle").size() > 0){
                    $("#orderTitle").val("红包发送");
                }else{
                    $("body").append("<input type='hidden' id='orderTitle' value='红包发送' >");
                }
                if($("#orderAboutid").size() > 0){
                    $("#orderAboutid").val(rs.data.result.id);
                }else{
                    $("body").append("<input type='hidden' id='orderAboutid' value='"+rs.data.result.id+"' >");
                }
                if($("#var1").size() > 0){
                    $("#var1").val(var1);
                }else{
                    $("body").append("<input type='hidden' id='var1' value='"+var1+"' >");
                }
                if($("#var2").size() > 0){
                    $("#var2").val(var2);
                }else{
                    $("body").append("<input type='hidden' id='var2' value='"+var2+"' >");
                }
                if($("#var3").size() > 0){
                    $("#var3").val(var3);
                }else{
                    $("body").append("<input type='hidden' id='var3' value='"+var3+"' >");
                }
                if($("#hongbaoType").size() > 0){
                    $("#hongbaoType").val(hongbaoType);
                }else{
                    $("body").append("<input type='hidden' id='hongbaoType' value='"+hongbaoType+"' >");
                }
                paySelect();//payway select

            }else{
                $.toast(rs.data.msg, "text");
                if(rs.data.code == '-1'){
                    localStorage.setItem('token','');
                    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                        isLogin('','');
                    }
                }
            }
        }else{
            console.log('请求异常！')
            $.toast("操作失败", "text");
        }

    });

}
//红包详情-获取详情数据
function detailhongBao(){
    //参数
    var id = GetUrlString('id');

    //传输数据
    var datahongBao = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "id":id
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/hongbao/hongBao/detail',
        data: datahongBao,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            detailhongBaoRender(rs.data);
        }else{
            console.log('请求异常！')
        }

    });

}

//红包详情渲染
function detailhongBaoRender(data){
    if(data.code == '0'){
        var detailhongBaoStr = '';


        //参数
        $("#hongbaoNum").html("已领取"+data.result.lingQuList.length+"/共"+data.result.hongbaoNum);
        $("#hongbaoMoney").html("红包金额："+data.result.hongbaoMoney+"元");
        $("#hongbaoBeizhu").html(data.result.hongbaoBeizhu);
        $("#hongbaoImage").css("background-image",checkPathBackGroubdImage(data.result.hongbaoImage,'4'));
        $("#shareImage").val(basehost+baseDefaultHongBaoImage);
        if(data.result.isFinish == '1'){//已领完
            $("#hongbaoImage").html("<span class=\"weui-mark-rt bg-green\"  style='width: 100%;text-align: center;background-color: #ff6666;border-top-left-radius: 10px; border-top-right-radius: 10px;'>已领完</span>")
        }else if(data.result.isLingQu != '1'){
            isHongBao();
        }

        if(data.result.lingQuList.length > 0){
            //渲染数据
            $.each(data.result.lingQuList, function (i, item) {
                detailhongBaoStr += '<a class="weui-cell weui-cell_access myweui-cell" onclick=toUserHome("'+item.createBy.id+'","1"); >';
                detailhongBaoStr += '<div class="weui-cell__hd shadowonly" style="border-radius:10px;background-image:url('+ checkPathBackGroubdImage(item.createBy.headimgurl,'1')+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;width: 45px;height:45px;">';
                detailhongBaoStr += '</div>';
                detailhongBaoStr += '<div class="weui-cell__bd">';
                detailhongBaoStr += '<div class="weui-news-text">';
                detailhongBaoStr += '<div class="weui-news-title onerow">'+item.createBy.nickname+'</div>';
                detailhongBaoStr += '</div>';
                detailhongBaoStr += '<div class="weui-news-info mynesinfo">';
                detailhongBaoStr += '<div class="weui-news-infoitem">';
                if(item.createBy.sex == '1'){
                    detailhongBaoStr += ' <i class="icon icon-58 f-gray f12">男</i>';
                }else if(item.createBy.sex == '2'){
                    detailhongBaoStr += '<i class="icon icon-57 f-gray f12">女</i>';
                }


                detailhongBaoStr += '</div>';
                detailhongBaoStr += '<div class="weui-news-infoitem f-red">';
                detailhongBaoStr += '￥'+item.lingquMoney+'';
                detailhongBaoStr += '</div>';

                detailhongBaoStr += '</div>';

                detailhongBaoStr += '</div>';
                detailhongBaoStr += '</a>';

            });

            $("#detailhongBao").html(detailhongBaoStr);
        }else{
            //为空
            detailhongBaoStr += noDataStr;
            $("#detailhongBao").html(detailhongBaoStr);
        }


    }else{
        $.toast(data.msg, "text");
    }
}


//红包领取
function gethongBao(){
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        return false;
    }
    //参数
    var hongbaoId = GetUrlString('id');
    var token = localStorage.getItem('token');

    //传输数据
    var datalingQu = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "hongbaoId":hongbaoId,
        "token":token
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/lingqu/lingQu/save',
        data:datalingQu,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //$.toast("操作成功", 'success');
                //去支付--弹出选择支付方式--支付密码（订单信息）--支付成功--跳回
                $("#lingquqian").hide();
                $("#lingquhou").show();
                $("#setMoney").html("￥"+rs.data.result.lingquMoney);
                $("#hongbaojiner").show();
                $("#closeId").attr("onclick","detailhongBao();closeHongBaodiv(\"hongbaotips\");");

            }else{
                $.toast(rs.data.msg, "text");
                if(rs.data.code == '-1'){
                    localStorage.setItem('token','');
                    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                        isLogin('','');
                    }
                }
            }
        }else{
            console.log('请求异常！')
            $.toast("操作失败", "text");
        }

    });

}
//轮播图
//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染
function listadv(renderId,renderType){
    $("#"+renderId+"").hide();

    //参数-manyType--需要手动处理对应字段
    var advType = renderType;
    var pageNo = $("#listadvPageNo").val();

    //传输数据
    var dataadv = {
        "advType":advType,
        "pageSize":6,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/adv/adv/list',
        data: dataadv,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            listadvRender(rs.data,renderId,renderType);
        }else{
            console.log('请求异常！')
        }
    });

}

//轮播图
//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染
function lunboadv(renderId,renderType,obj,shuzi){
    //$("#"+renderId+"").hide();

    //参数-manyType--需要手动处理对应字段
    var advType = renderType;
    var pageNo = $("#listadvPageNo").val();

    //传输数据
    var dataadv = {
        "advType":advType,
        "pageSize":6,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/adv/adv/list',
        data: dataadv,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            lunboadvRender(rs.data,renderId,renderType,obj,shuzi);
        }else{
            console.log('请求异常！')
        }
    });

}


//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染
function listadvone(renderId,renderType){
    $("#"+renderId+"").hide();

    //参数-manyType--需要手动处理对应字段
    var advType = renderType;
    var pageNo = $("#listadvPageNo").val();

    //传输数据
    var dataadv = {
        "advType":advType,
        "pageSize":6,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/adv/adv/list',
        data: dataadv,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            listadvRenderOne(rs.data,renderId,renderType);
        }else{
            console.log('请求异常！')
        }
    });

}

//列表渲染
function listadvRender(data,renderId,renderType){
    if(data.code == '0'){
        var str1 = '';
        str1 += '<div class="swiper-container disnone" id="swiper-container'+renderType+'">';
        str1 += '<div class="swiper-wrapper">';
        $.each(data.result,function(i,item){
            str1 += '<div class="swiper-slide">';
            if(item.advLink != null && item.advLink != ''){
                str1 += '<a href="'+checkLink(item.advLink)+'">';
            }else{
                str1 += '<a>';
            }

            str1 += '<img src="'+ checkPath(item.advImage,'1')+'" alt="" style="max-height: 350px;width: 100%;">';
            str1 += '</a>';
            str1 += '</div>';
        });
        str1 += '</div>';

        str1 += '<div class="swiper-pagination disnone" id="swiper-pagination'+renderType+'"></div>';
        str1 += '</div>';
/*
        str1 += '<div class="swiper-pagination'+renderType+'"></div>';
        str1 += '</div>';

        str1 += '<div class="slide" id="lunbotuid'+renderType+'">';
        str1 += '<ul>';
        $.each(data.result,function(i,item){
            str1 += '<li>';
            str1 += '<a href="'+checkLink(item.advLink)+'">';
            str1 += '<img src="'+ checkPath(item.advImage,'1')+'" alt="">';
            str1 += '</a>';
            str1 += '</li>';
        });
        str1 += '</ul>';
        str1 += '<div class="dot">';
        $.each(data.result,function(i,item){
            str1 += '<span></span>';
        });
        str1 += '</div>';
        str1 += '</div>';*/


        $("#"+renderId+"").html(str1);
        setTimeout(function() {
            var ss4 =  new Swiper('#swiper-container'+renderType+'', {
                spaceBetween: 30,
                centeredSlides: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '#swiper-pagination'+renderType+'',
                    clickable: true,
                },

            });
        }, 100)
        //首页轮播图插件
        /*setTimeout(function() {
           $("#lunbotuid"+renderType+"").swipeSlide({
                autoSwipe: true, //自动切换默认是
                speed: 3000, //速度默认4000
                continuousScroll: true, //默认否
                transitionType: '', //过渡动画linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier
                lazyLoad: true, //懒加载默认否
                firstCallback: function (i, sum, me) {
                    me.find('.dot').children().first().addClass('cur');
                },
                callback: function (i, sum, me) {
                    me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
                }

            });
        }, 1500)*/
        /*$("#lunbotuid"+renderType+"").swipeSlide({
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

        });*/
        $("#"+renderId+"").show();
        $("#swiper-container"+renderType+"").show();
        $("#swiper-pagination"+renderType+"").show();
    }else{
        $.toast(data.msg, "text");
    }
}


//列表渲染
function lunboadvRender(data,renderId,renderType,obj,shuzi){
    if(data.code == '0'){
        var str1 = '';
       /* str1 += '<div class="swiper-container disnone" id="swiper-container'+renderType+'">';
        str1 += '<div class="swiper-wrapper">';*/
        $.each(data.result,function(i,item){
            str1 += '<div class="swiper-slide">';
            if(item.advLink != null && item.advLink != ''){
                str1 += '<a href="'+item.advLink+'">';
            }else{
                str1 += '<a>';
            }
            if(item.advImage.search('.json') != -1){
                str1 += '<lottie-player src="'+checkPath(item.advImage,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
            }else{
                str1 += '<img class="maxh"  src="'+ checkPath(item.advImage,'1')+'">';
            }

            str1 += '</a>';
            str1 += '</div>';
        });
      /*  str1 += '</div>';*/

        /*str1 += '<div class="swiper-pagination disnone" id="swiper-pagination'+renderType+'"></div>';
        str1 += '</div>';*/

        $("#"+renderId+"").html(str1);
        lunbotu(obj,renderId,shuzi);
        $("#"+renderId+"").show();
        $("#swiper-container"+renderId+"").show();
        $("#swiper-pagination"+renderId+"").show();
    }else{
        $.toast(data.msg, "text");
    }
}
function lunbotu(obj,renderId,shuzi) {
    if(localStorage.getItem("lunbonum") == null && localStorage.getItem("lunbonum") == ''){
        localStorage.setItem("lunbonum",1);
    }else{
        localStorage.setItem("lunbonum",eval(localStorage.getItem("lunbonum")) + 1);
    }


    if(obj == '1'){
        //setTimeout(function() {
            var swiper = new Swiper('#swiper-container'+renderId+'', {
                spaceBetween: 30,
                centeredSlides: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                loop: true,

                updateOnWindowResize: true,
                cssMode:true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '#swiper-pagination'+renderId+'',
                }
            });
        //},30000);


    }
    else if(obj == '2'){
        //setTimeout(function() {
            var swiperh1 = new Swiper('#swiper-container'+renderId+'', {
                slidesPerView: eval(''+shuzi+''),
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper

                //slidesPerColumn: 2,
                spaceBetween: 5,
                freeMode: true,
            });
        //},15000);

    }
    else if(obj == '3'){
        //setTimeout(function() {
           var swiper = new Swiper('#swiper-container'+renderId+'', {
                spaceBetween: 30,
                centeredSlides: true,
               observer:true,//修改swiper自己或子元素时，自动初始化swiper
               observeParents:true,//修改swiper的父元素时，自动初始化swiper
                loop: true,

                updateOnWindowResize: true,
                cssMode:true,
                autoplay: {
                    delay: 1000,
                    disableOnInteraction: false,
                },

            });
        //},3000);
    }else if(obj == '4'){
        //setTimeout(function() {
        var swiperh4 = new Swiper('#swiper-container'+renderId+'', {
            slidesPerView: eval(''+shuzi+''),
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper

            slidesPerColumn: 2,
            spaceBetween: 5,
        });
        //},15000);

    }
    else{
        //setTimeout(function() {
            var swiper = new Swiper('#swiper-container'+renderId+'', {
                spaceBetween: 30,
                centeredSlides: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper

                loop: true,
                updateOnWindowResize: true,
                cssMode:true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '#swiper-pagination'+renderId+'',
                }
            });
        //},3000);
    }






}

//列表渲染
function listadvRenderOne(data,renderId,renderType){
    if(data.code == '0'){
        var str1 = '';
        $.each(data.result,function(i,item){
            str1 += '<div><a href="'+checkLink(item.advLink)+'"><img src="'+ checkPath(item.advImage,'1')+'" alt="" style="max-height: 100px;width: 100%;border-radius: 5px;"></a></div>';
        });

        /*
                str1 += '<div class="swiper-pagination'+renderType+'"></div>';
                str1 += '</div>';

                str1 += '<div class="slide" id="lunbotuid'+renderType+'">';
                str1 += '<ul>';
                $.each(data.result,function(i,item){
                    str1 += '<li>';
                    str1 += '<a href="'+checkLink(item.advLink)+'">';
                    str1 += '<img src="'+ checkPath(item.advImage,'1')+'" alt="">';
                    str1 += '</a>';
                    str1 += '</li>';
                });
                str1 += '</ul>';
                str1 += '<div class="dot">';
                $.each(data.result,function(i,item){
                    str1 += '<span></span>';
                });
                str1 += '</div>';
                str1 += '</div>';*/


        $("#"+renderId+"").html(str1);

        //首页轮播图插件
/*        setTimeout(function() {
           $("#lunbotuid"+renderType+"").swipeSlide({
                autoSwipe: true, //自动切换默认是
                speed: 3000, //速度默认4000
                continuousScroll: true, //默认否
                transitionType: '', //过渡动画linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier
                lazyLoad: true, //懒加载默认否
                firstCallback: function (i, sum, me) {
                    me.find('.dot').children().first().addClass('cur');
                },
                callback: function (i, sum, me) {
                    me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
                }

            });
        }, 1500)*/
        /*$("#lunbotuid"+renderType+"").swipeSlide({
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

        });*/
        $("#"+renderId+"").show();

    }else{
        $.toast(data.msg, "text");
    }
}
//插屏广告
//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染
function chapingadv(renderType,advCookieType){

    //参数-manyType--需要手动处理对应字段
    var advType = renderType;
    var pageNo = $("#listadvPageNo").val();

    //传输数据
    var dataadv = {
        "advType":advType,
        "pageSize":6,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/adv/adv/list',
        data: dataadv,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            if(rs.data.code == '0'){
                if(rs.data.result != null && rs.data.result != '[]'){
                    if(localStorage.getItem("advnum") != null && localStorage.getItem("advnum") != '' && localStorage.getItem("advnum") != '-1'){

                    }else{
                        localStorage.setItem("advnum",rs.data.result.length-1);
                    }

                    if(localStorage.getItem("isadvxunhuan") == '1'){//广告循环播放
                        if(localStorage.getItem("advnum") == '-1'){
                            localStorage.setItem("advnum",rs.data.result.length-1);
                        }
                    }

                    $.each(rs.data.result,function(i,item){

                        if(eval(localStorage.getItem("advnum")) == i){
                            if(item.advTitle.search('个人会员') != -1){
                                //个人会员
                                if(localStorage.getItem("userLevel") == '0' ){
                                    isAdvTips(item.advLink,checkPath(item.advImage,'1'),advCookieType);
                                }

                            }else if(item.advTitle.search('团队会员') != -1){
                                if(localStorage.getItem("userLevel") == '2' ){
                                    isAdvTips(item.advLink,checkPath(item.advImage,'1'),advCookieType);
                                }
                            }else{
                                isAdvTips(item.advLink,checkPath(item.advImage,'1'),advCookieType);
                            }

                            localStorage.setItem("advnum",i-1);
                        }

                    });
                }

            }
        }else{
            console.log('请求异常！')
        }
    });

}
//获取短连接
function getShortUrl(url,title){
    isLogin("","");
    var token = localStorage.getItem('token');
    //传输数据
    var dataJson = {
        "url":urlencode(url),
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'POST',
        url: '/sys/user/getShortUrl',
        data: dataJson,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            //console.log(rs.data.result)
            if(rs.data.result.search('http') != -1){
                var shortUrl = rs.data.result;
                if(shortUrl != null && shortUrl != ''){
                    //拼接
                    var kouling = "【"+title+"】";
                    kouling += " 👉" + shortUrl +"👈";

                    kouling += "点击链接进行访问[来自会员#"+rs.data.msg+"#的分享]"+setNULL(localStorage.getItem("sharetext"));
                    console.log(kouling);
                    $("#kouling").attr("data-clipboard-text",kouling);
                }else{
                    //$.toast("口令生成失败", "text");
                }
            }else{
                //拼接
                var kouling = "【"+title+"】";
                kouling += "👉" + url +"👈";
                kouling += "点击链接进行访问[来自会员#"+rs.data.msg+"#的分享]"+setNULL(localStorage.getItem("sharetext"));
                $("#kouling").attr("data-clipboard-text",kouling);
            }
        }else{
            console.log('请求异常！')
        }
    });

}

//获取短连接
function getQrimageUrl(url,rederId){
    var token = localStorage.getItem('token');
    //传输数据
    var dataJson = {
        "url":urlencode(url),
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'POST',
        url: '/sys/user/getQrImageUrl',
        data: dataJson,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            var qrImage = rs.data.result;

            console.log("qrImage===="+qrImage)

            if($("#detailcourse2").size() > 0){
                $("#detailcourse2").html("<img src="+qrImage+" style='width:100%;'>");
            }


            if($("#tothis").size() > 0){
                $("#tothis").attr("src",qrImage);
            }

            if($("#tothismingpian").size() > 0){
                $("#tothismingpian").attr("src",qrImage);
            }

            if($("#qunqr").size() > 0){
                $("#qunqr").attr("src",qrImage);
            }
            /*if($("#sharesrc").size() > 0){
                $("#sharesrc").attr("src",qrImage);
            }*/

        }else{
            console.log('请求异常！')
        }
    });

}

//获取短连接
function getQrimageUrl2(url,rederId){
    var token = localStorage.getItem('token');
    //传输数据
    var dataJson = {
        "url":urlencode(url),
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'POST',
        url: '/sys/user/getQrImageUrl',
        data: dataJson,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            var qrImage = rs.data.result;


            if($("#detailcourse221").size() > 0){
                $("#detailcourse221").attr("src",qrImage);
            }

        }else{
            console.log('请求异常！')
        }
    });

}

//获取短连接
function getQrHaibaoimage(bgurl,url,rederId){
    //加载提示
    if(!getIsAPPLE()){
        $.toast.prototype.defaults.duration=1000;$.toast("海报生成中…","text");
    }else{
        $.toast.prototype.defaults.duration=1000;$.toast("海报生成中…","text");
    }
    var token = localStorage.getItem('token');
    //传输数据
    var dataJson = {
        "url":urlencode(url),
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'POST',
        url: '/sys/user/getQrImageUrl',
        data: dataJson,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            var qrImage = rs.data.result;
            console.log('qrImage1==='+qrImage);
            getQrHaibaoimageLast(bgurl,qrImage,rederId);

        }else{
            console.log('请求异常！')
        }
    });

}
function getQrHaibaoimageYaoqing(bgurl,url,rederId){
    //加载提示
    if(!getIsAPPLE()){
        $.toast.prototype.defaults.duration=1000;$.toast("海报生成中…","text");
    }else{
        $.toast.prototype.defaults.duration=1000;$.toast("海报生成中…","text");
    }
    var token = localStorage.getItem('token');
    //传输数据
    var dataJson = {
        "url":urlencode(url),
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'POST',
        url: '/sys/user/getQrImageUrl',
        data: dataJson,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            var qrImage = rs.data.result;
            console.log('qrImage1==='+qrImage);
            getQrHaibaoimageLastYaoqing(bgurl,qrImage,rederId);

        }else{
            console.log('请求异常！')
        }
    });

}
function getQrHaibaoimageLast(bgurl,url,rederId){
    var token = localStorage.getItem('token');
    //传输数据
    var dataJson = {
        "h1":urlencode(bgurl),
        "h2":urlencode(url),
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'POST',
        url: '/sys/user/gethaibao',
        data: dataJson,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            var qrImage2 = rs.data.result;
            console.log('qrImage2==='+qrImage2);
            $("#"+rederId+"").html("<img src="+qrImage2+" style='width:100%;'>");
            setTupian(qrImage2);
        }else{
            console.log('请求异常！')
        }
    });

}

function getQrHaibaoimageLastYaoqing(bgurl,url,rederId){
    var token = localStorage.getItem('token');
    //传输数据
    var dataJson = {
        "h1":urlencode(bgurl),
        "h2":urlencode(url),
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'POST',
        url: '/sys/user/gethaibao',
        data: dataJson,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            var qrImage2 = rs.data.result;
            console.log('qrImage2==='+qrImage2);
            $("#"+rederId+"").html("<img src="+qrImage2+" style='width:60%;'>");
            setTupian(qrImage2);
        }else{
            console.log('请求异常！')
        }
    });

}


function setTupian(qrImage2){

    console.log('------1');
    if(navigator.userAgent.indexOf("Html5Plus") > -1) {
        console.log('------2');
        $("#mingpianbaocun").attr("onclick","savePicture(\'"+qrImage2+"\')");
    }else{
        console.log('------3');
        if(getBrowser() == 'wxmobile'){
            console.log('------4');
            //$("#mingpianbaocun").attr("href",checkPathHost(qrImage2,"1"));
            $("#mingpianbaocun").attr("onclick","tipwxshare();");
        }else if(getIsAPPLE() ){
            console.log('------5');
            $("#mingpianbaocun").attr("href",checkPathHost(qrImage2,"1"));
            $("#mingpianbaocun").attr("onclick","set();");

        }else{
            console.log('------6');
            $("#mingpianbaocun").attr("onclick","tipwxshare();");

        }
    }

}

function randomString(len){
    //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var tempLen = chars.length, tempStr='';
    for(var i=0; i<len; ++i){
        tempStr += chars.charAt(Math.floor(Math.random() * tempLen ));
    }
    return tempStr;
}



function xiazaiwenjian(datupath) {
   /* // 创建下载任务
    var picurl=checkPathHost(datupath,"1");
    console.log('picurl==='+picurl);
    var picname="_downloads/99899098888999888999.jpg";
    var dtask = plus.downloader.createDownload(picurl, {}, function ( d, status ) {
// 下载完成
        if ( status == 200 ) {
            //alert( "Download success: " + d.filename );
            plus.gallery.save(picname,function() {
                $.toast('保存成功！','text');
            }, function() {
                $.toast('保存失败！','text');
            });
        } else {
            $.toast('保存失败！','text');
        }
    });
//dtask.addEventListener( "statechanged", onStateChanged, false );
    dtask.start();*/
    console.log(datupath);
    var dataUrl = getBase64Image(datupath);
    var b = new plus.nativeObj.Bitmap('bitblmap');



    b.loadBase64Data(dataUrl, function () {
        /*这里一定要是_doc目录*/
        b.save("_downloads/share-"+dateToString(new Date())+".jpg", {overwrite: true}, function (object) {
            //保存到相册
            plus.gallery.save("_downloads/share-"+dateToString(new Date())+".jpg", function () {
                $.toast('已保存到手机相册','text');
            }, function () {
                $.toast("图片保存失败",'text');
            });
        }, function () {
            $.toast("图片保存失败",'text');
        });
    }, function () {
        $.toast("图片保存失败",'text');
    });
}




function savePicture(url){
    var picname = "_downloads/share-"+new Date().getTime() + ".jpg";

    var dtask = plus.downloader.createDownload(checkPathHost(url,'1'),{filename: "" + picname},function(d, status){

        if(status == 200){
            plus.gallery.save(d.filename, function(){
                $.toast("图片保存成功",'text');
            }, function(err){
                $.toast("图片保存失败",'text');
            });
        }else{
            $.toast("图片保存失败",'text');
        }
    });

    dtask.start();
}



function saveFile(url){
    // 下载wgt文件
    var wgtUrl=checkPathHost(url,'1');
    //plus.nativeUI.showWaiting("下载wgt文件...");
    var picname = "_doc/IMEI-"+new Date().getTime() + ".xlsx";
    dtask = plus.downloader.createDownload(wgtUrl, {filename:""+picname}, function(d, status){
        // 下载完成
        if(status == 200){
            $.toast("下载成功",'text');
        }else{
            $.toast("下载失败",'text');
        }
    });
    //dtask.addEventListener("statechanged", onStateChanged, false);
    dtask.start();
    /*plus.downloader.createDownload( wgtUrl, {filename:"_doc/excel/"}, function(d,status){
        if ( status == 200 ) {
            $.toast("下载成功",'text');
            console.log("下载成功："+d.filename);
            //installWgt(d.filename); // 安装wgt包
        } else {
            $.toast("下载失败",'text');
            console.log("下载失败！");
            //plus.nativeUI.alert("下载wgt失败！");
        }
        //plus.nativeUI.closeWaiting();
    }).start();*/
}


//获取短连接
function getQunShortUrl(url,title){
    var token = localStorage.getItem('token');
    //传输数据
    var dataJson = {
        "url":urlencode(url),
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'POST',
        url: '/sys/user/getShortUrl',
        data: dataJson,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            //console.log(rs.data.result)
            if(rs.data.result.search('http') != -1){
                var shortUrl = rs.data.result;

                if($("#shareLink").size() > 0){
                    $("#shareLink").val(shortUrl);
                    $("#shareTitle").val("来自会员#"+rs.data.msg+"#的邀请,点击链接加入群聊");
                    getQrimageUrl(url,'');
                }

                if(shortUrl != null && shortUrl != ''){
                    //拼接
                    var kouling = "【"+title+"】";
                    kouling += "👉" + shortUrl +"👈";
                    kouling += "点击链接加入群聊[来自会员#"+rs.data.msg+"#的分享]";
                    //console.log(kouling);
                    $("#qunkouling").attr("data-clipboard-text",kouling);
                }else{
                    //$.toast("口令生成失败", "text");
                }
            }else{
                //拼接
                var kouling = "【"+title+"】";
                kouling += "👉" + url +"👈";
                kouling += "点击链接加入群聊[来自会员#"+rs.data.msg+"#的分享]";
                $("#qunkouling").attr("data-clipboard-text",kouling);
            }
        }else{
            console.log('请求异常！')
        }
    });

}

//点赞-19huiyuan-18评论-1文章点赞-17课程点赞-4//如何赚钱点赞//商务合作//推荐有礼//关于我们//研发计划-5圈子主题-6-工具详情-7商品详情-8答案详情-9短视频-10信用卡-11贷款-12保险-13基金-14动态-16线下活动
//点赞的数目改变需要遵循设置ID规则=zan+id
function dianji(type,openId){
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        return false;
    }
    //增加一个数字
    if($("#zan"+openId+"").html() != ''){
        $("#zan"+openId+"").html(eval($("#zan"+openId+"").html()) + 1);
    }else{
        $("#zan"+openId+"").html("1")
    }

    //增加一个数字
    if($("#zan2a"+openId+"").size() > 0){
        if($("#zan2a"+openId+"").html() != ''){
            $("#zan2a"+openId+"").html(eval($("#zan2a"+openId+"").html()) + 1);
        }else{
            $("#zan2a"+openId+"").html("1")
        }
    }

    //参数
    var cardType = type;
    var popenId = openId;

    //传输数据
    var dataDianji = {

        "cardType":cardType,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "popenId":popenId
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/zan',
        data:dataDianji,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //$.toast("点赞成功", 'SUCCESS');
                $.toast('点赞成功','text');
            }else{
                $.toast(rs.data.msg, "text");
                if(rs.data.code == '-1'){
                    localStorage.setItem('token','');
                    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                        isLogin('','');
                    }
                }
            }
        }else{
            console.log('请求异常！')
            $.toast("操作失败", "text");
        }

    });

}

//只允许删除自己发布的
function deletebyId(type,openId){
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        return false;
    }

    //参数
    var cardType = type;
    var popenId = openId;
    var token = localStorage.getItem('token');
    //传输数据
    var dataDianji = {

        "cardType":cardType,
        "token":token,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "popenId":popenId
    }

    $.confirm("您确定要删除吗?", "确认删除?", function() {
        instancecomment({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sys/user/deleteById',
            data:dataDianji,
            cancelToken: sourcecomment.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
                if(rs.data.code == '0'){
                    //$.toast("删除成功", 'success');
                    $.toast.prototype.defaults.duration=1000;//1秒
                    $.toast('删除成功','text');
                    setTimeout(function() {
                        refresh();
                    }, 1000);
                }else{
                    $.toast(rs.data.msg, "text");
                    if(rs.data.code == '-1'){
                        localStorage.setItem('token','');
                        if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                            isLogin('','');
                        }
                    }
                }
            }else{
                console.log('请求异常！')
                $.toast("操作失败", "text");
            }

        });
    }, function() {
        //取消操作
    });




}



//分享-加价-生成图片-直接分享

//转发--一键转发
//
//intype(1是转发动态2是转发产品链接)-popenId转发动态的关联ID-openId转发来源-
//linkType链接类型（1自定义链接2课程链接3圈子链接4圈子主题链接5工具链接6商品链接7问题链接8答案链接9短视频连接10信用卡链接11贷款链接12保险链接13基金证券链接14活动链接15活动链接16个人主页）19-huiyuan
function zhuanfa(inType,popenId,openId,linkType){


    //参数
    var inType = inType;
    var popenId = popenId;
    var openId = openId;
    var cardType = linkType;
    var token = localStorage.getItem('token');
    $("input,select,textarea").blur(function(){
        setTimeout(function() {
            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
    });
    $.modal({
        title: "<i class=\"beauty icon-fenxiang f-red indexicon2\" style='font-size: 20px;color: #f60 !important'>转发到站内?</i>",
        text: "",
        buttons: [
            { text: "<span style='font-size: 16px;color: #777777;'>取消</span>", className: "default", onClick: function(){


                } },{ text: "<i class=\"beauty icon-web-icon- f-orange indexicon2\" style='font-size: 16px;'>朋友圈</i>", onClick: function(){

                    $.prompt({
                        title: '一键转发',
                        text: '这一刻的想法',
                        input: '',
                        empty: true, // 是否允许为空
                        onOK: function (input) {
                            //点击确认
                            if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                                isLogin('','');
                                return false;
                            }else{

                                //传输数据
                                var dataZhuanfa = {
                                    "inType":inType,
                                    "popenId":popenId,
                                    "openId":openId,
                                    "cardType":cardType,
                                    "userInfo":input,
                                    "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
                                    "token":token
                                }

                                instancecomment({
                                    headers: {
                                        'X-Requested-With': 'XMLHttpRequest',
                                        'Content-Type': 'application/json;charset=UTF-8',
                                        'Access-Control-Allow-Origin': '*'
                                    },//设置跨域请求头
                                    method: 'post',
                                    url: '/sys/user/zhuanfa',
                                    data:dataZhuanfa,
                                    cancelToken: sourcecomment.token
                                }) .then(function(rs){
                                    //console.log(rs)//数据在rs.data中  状态rs.status=200
                                    if(rs.status=200){
                                        if(rs.data.code == '0'){
                                           // $.toast("转发成功", 'success');
                                            $.toast.prototype.defaults.duration=1000;//1秒
                                            $.toast('转发成功','text');
                                            if(inType == '1'){
                                                setTimeout(function() {
                                                    refresh();
                                                }, 1000)
                                            }


                                        }else{
                                            $.toast(rs.data.msg, "text");
                                            if(rs.data.code == '-1'){
                                                localStorage.setItem('token','');
                                                if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                                                    isLogin('','');
                                                }
                                            }
                                        }
                                    }else{
                                        console.log('请求异常！')
                                        $.toast("操作失败", "text");
                                    }

                                });
                            }
                        },
                        onCancel: function () {
                            //点击取消
                        }
                    });


                } },
            { text: "<i class=\"beauty icon-qunzu f-blue indexicon2\" style='font-size: 16px;color: #f60 !important'>好友</i>", onClick: function(){

                    //to好友列表
                    toHaoyouList("?cardType="+cardType+"&popenId="+popenId+"&url="+urlencode(window.location.href),"2");

                } },
        ]
    });


    /*$.confirm("您确定要转发吗?", "确认转发?", function() {
        // 在提交请求之前判断是否登录





    }, function() {
        //取消操作
        return false;
    });*/


}

function toshareHaoyou(openId) {
    var popenId = GetUrlString("popenId");
    var cardType = GetUrlString("cardType");
    var url = GetUrlString("url");
    var token = localStorage.getItem('token');
    $.prompt({
        title: '一键转发',
        text: '这一刻的想法',
        input: '',
        empty: true, // 是否允许为空
        onOK: function (input) {
            //点击确认
            if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                isLogin('','');
                return false;
            }else{

                //传输数据
                var dataZhuanfa = {

                    "popenId":popenId,
                    "openId":openId,
                    "cardType":cardType,
                    "userInfo":input,
                    "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
                    "token":token
                }

                instancecomment({
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*'
                    },//设置跨域请求头
                    method: 'post',
                    url: '/sys/user/zhuanfatoqun',
                    data:dataZhuanfa,
                    cancelToken: sourcecomment.token
                }) .then(function(rs){
                    //console.log(rs)//数据在rs.data中  状态rs.status=200
                    if(rs.status=200){
                        if(rs.data.code == '0'){
                            //$.toast("转发成功", 'success');
                            $.toast.prototype.defaults.duration=1000;//1秒
                            $.toast('转发成功','text');
                            $.modal({
                                title: "是否返回？",
                                text: "",
                                buttons: [
                                    { text: "返回", onClick: function(){
                                            window.location.href=url;
                                        } },
                                    { text: "留在这里", onClick: function(){
                                            toShifenliao();
                                        } },

                                ]
                            });

                        }else{
                            $.toast(rs.data.msg, "text");
                            if(rs.data.code == '-1'){
                                localStorage.setItem('token','');
                                if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                                    isLogin('','');
                                }
                            }
                        }
                    }else{
                        console.log('请求异常！')
                        $.toast("操作失败", "text");
                    }

                });
            }
        },
        onCancel: function () {
            //点击取消
        }
    });
    
}

function payApp() {

}


var wxChannel = null; // 微信支付
var aliChannel = null; // 支付宝支付
var channel=null;
// 1. 获取支付通道
function plusReady(){
    // 获取支付通道
    plus.payment.getChannels(function(channels){
        for (var i in channels) {
            if (channels[i].id == "wxpay") {
                wxChannel=channels[i];
            }else{
                aliChannel=channels[i];
            }
        }
    },function(e){
        alert("获取支付通道失败："+e.message);
    });
}

document.addEventListener('plusready',plusReady,false);

// 2. 发起支付请求
function pay(id,url){
    // 从服务器请求支付订单
    var PAYSERVER='';
    if(id=='alipay'){
        alert("2-支付宝支付");
        PAYSERVER=url;
        channel = aliChannel;
    }else if(id=='wxpay'){
        alert("2-微信支付");
        PAYSERVER=url;
        channel = wxChannel;
    }else{
        plus.nativeUI.alert("不支持此支付通道！",null,"捐赠");
        return;
    }
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        switch(xhr.readyState){
            case 4:
                if(xhr.status==200){
                    plus.payment.request(channel,xhr.responseText,function(result){
                        alert("3-result==="+result);
                        plus.nativeUI.alert("支付成功！",function(){
                            back();
                        });
                    },function(error){
                        plus.nativeUI.alert("3-支付失败：" + error.code);
                    });
                }else{
                    alert("3-获取订单信息失败！");
                }
                break;
            default:
                break;
        }
    }
    alert("4===="+PAYSERVER);
    xhr.open('GET',PAYSERVER);
    xhr.send();
}

//支付-公共提交订单支付（需要付款跳转到支付--不需要付款直接跳转到第三方页面）
function toPay(){//请求余额支付

    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        initNRPay();
        return false;
    }
    var orderType = $("#orderType").val();
    //以下参数需要提前赋值
    var orderNum = $("#orderNum").val();
    var orderMoney = 0.00;
    if(curWwwPath.search("productdetail.html") != -1){//如果是商品则不需要计算-已经计算好实付款
        orderMoney = $("#orderMoney").val();
    }else{
        //其它支付总额为单价*数量

        if(orderType == '10'){
            orderMoney = eval($("#orderMoney").val());
        }else{
            orderMoney = eval($("#orderMoney").val())*eval(orderNum);
        }

        orderMoney = orderMoney.toFixed(2);
    }
    /*alert(orderNum);
    alert(orderMoney);
    return false;*/
    var payWay = $("input[name='payWay']:checked").val();
    //如果是onepage

    var payPassword = $("#payPassword").val();
    var orderAddress = $("#orderAddress").val();
    if(curWwwPath.search("orderinfo.html") != -1){//如果是商品则不需要计算-已经计算好实付款
        if(orderAddress == null || orderAddress == ''){
            $.toast("请填写收货地址","text");
            initNRPay();
            return false;

        }
    }


    var orderTitle = $("#orderTitle").val();
    var orderAboutid = $("#orderAboutid").val();//红包ID---后台可以根据是红包ID--查询出评论ID--然后找到是那一条评论--其他类似
    //备用参数==返回页面刷新
    var var1 = $("#var1").val();
    var var2 = $("#var2").val();
    var var3 = $("#var3").val();
    var hongbaoType = $("#hongbaoType").val();
    var Url = getPayUrl(payWay);
    console.log(Url);
    var token = localStorage.getItem('token');
    var openId =  localStorage.getItem("openId");
    var str = setNULL(localStorage.getItem("shuxingids"));
    var zengzhiids = setNULL(localStorage.getItem("zengzhiids"));

    $.toast.prototype.defaults.duration=1000;
    $.toast("订单提交中…","text");
    var mediaType = '';
    if($("#mediaType").size() > 0){
        mediaType = $("#mediaType").val();//合并付款
    }
    //alert(mediaType);return false;
    var orderNo = $("#orderNo").val();
    //$("#orderShuxing").val(str);
    //传输数据
    var datahongBao = {
        "orderNum":orderNum,
        "bankNo":orderNo,
        "orderMoney":orderMoney,
        "mediaType":mediaType,
        "payWay":payWay,
        "payPassword":payPassword,
        "orderType":orderType,
        "orderTitle":orderTitle,
        "orderAddress":orderAddress,
        "orderAboutid":orderAboutid,
        "inUser":getShareId2(),
        "openId":openId,
        "shuxing":str,
        "zengzhiids":zengzhiids,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    if(curWwwPath.search("orderinfo.html") != -1){
        $("#paytips").hide();
        $.closePopup();
        $.modal({
            title: "支付完成？",
            text: "",
            buttons: [
                { text: "否", onClick: function(){ toUserProfile('6')} },
                { text: "是", onClick: function(){ toindex()} },

            ]
        });
    }else{
        $("#paytips").hide();
        $.closePopup();
        $.modal({
            title: "支付完成？",
            text: "",
            buttons: [
                { text: "否", onClick: function(){ refresh()} },
                { text: "是", onClick: function(){ refresh()} },

            ]
        });
    }



    if(payWay == '1'){


      /* if(getBrowser() != 'wxmobile'){
            sourcecomment.cancel();//先取消异步请求
            //微信H5支付
            if(navigator.userAgent.indexOf("Html5Plus") > -1) {
                var dataSend = "?orderNum="+orderNum+"&orderMoney="+orderMoney+"&payWay="+payWay+"&orderType="+orderType+"&orderAboutid="+orderAboutid+"&inUser="+getShareId()+"&orderAddress="+orderAddress+"&token="+token+"&orderTitle="+encodeURI(orderTitle);
                //location.href= Url + dataSend;
                alert("1-wxpay===="+Url + dataSend);
                pay('wxpay',Url + dataSend);
            }else{
                var dataSend = "?orderNum="+orderNum+"&orderMoney="+orderMoney+"&payWay="+payWay+"&orderType="+orderType+"&orderAboutid="+orderAboutid+"&inUser="+getShareId()+"&orderAddress="+orderAddress+"&token="+token+"&orderTitle="+encodeURI(orderTitle);
                location.href= Url + dataSend;
            }

        }else{
            //判断是否有Openid
            if(getBrowser() == 'wxmobile'){
                if(localStorage.getItem("openId") == '' || localStorage.getItem("openId") == null || localStorage.getItem("openId") == 'undefined'){
                    $.toast("请先进行微信授权", "text");
                    weixin();
                }

            }
        }*/

        if(getBrowser() != 'wxmobile'){


            sourcecomment.cancel();//先取消异步请求
            //微信H5支付
            var returnUrl = baseXueYuanPath + 'success.html?s='+getSaasId();//
            var dataSend = "?shuxing="+str+"&zengzhiids="+zengzhiids+"&bankNo="+orderNo+"&mediaType="+mediaType+"&orderNum="+orderNum+"&orderMoney="+orderMoney+"&payWay="+payWay+"&orderType="+orderType+"&orderAboutid="+orderAboutid+"&inUser="+getShareId2()+"&orderAddress="+orderAddress+"&token="+token+"&orderTitle="+encodeURI(orderTitle)+"&url="+encodeURI(returnUrl);
            location.href= Url + dataSend;
        }else{

            if(wxxcx() == 'wxxcx' && localStorage.getItem("isdisthreepay") != '1'){
                //sourcecomment.cancel();//先取消异步请求
                //getWxxcxPay(datahongBao);
                /*$("#paytips").hide();
                $.closePopup();
                $.modal({
                    title: "支付完成？",
                    text: "",
                    buttons: [
                        { text: "否", onClick: function(){ refresh()} },
                        { text: "是", onClick: function(){ refresh()} },

                    ]
                });*/

                var returnUrl = baseXueYuanPath + 'success.html?s='+getSaasId();//
                var dataSend = "?shuxing="+str+"&zengzhiids="+zengzhiids+"&bankNo="+orderNo+"&mediaType="+mediaType+"&orderNum="+orderNum+"&orderMoney="+orderMoney+"&payWay="+payWay+"&orderType="+orderType+"&orderAboutid="+orderAboutid+"&inUser="+getShareId2()+"&orderAddress="+orderAddress+"&token="+token+"&orderTitle="+encodeURI(orderTitle)+"&url="+encodeURI(returnUrl);

                var path = '/pages/wxpay/wxpay'+dataSend;
                //通过JSSDK的api使小程序跳转到指定的小程序页面
                wx.miniProgram.navigateTo({url: path});
                sourcecomment.cancel();//先取消异步请求

            }else{
                //判断是否有Openid
                if(localStorage.getItem("isdisthreepay") != '1'){
                    if(getBrowser() == 'wxmobile'){
                        if(localStorage.getItem("openId") == '' || localStorage.getItem("openId") == null || localStorage.getItem("openId") == 'undefined'){
                            sourcecomment.cancel();//先取消异步请求
                            $.toptip("请先进行微信授权", 'warning');
                            weixin();
                        }

                    }
                }else{
                    sourcecomment.cancel();//先取消异步请求====第三方聚合支付在微信中进行支付
                    //微信H5支付
                    var returnUrl = baseXueYuanPath + 'success.html?s='+getSaasId();//
                    var dataSend = "?shuxing="+str+"&zengzhiids="+zengzhiids+"&bankNo="+orderNo+"&mediaType="+mediaType+"&orderNum="+orderNum+"&orderMoney="+orderMoney+"&payWay="+payWay+"&orderType="+orderType+"&orderAboutid="+orderAboutid+"&inUser="+getShareId2()+"&orderAddress="+orderAddress+"&token="+token+"&orderTitle="+encodeURI(orderTitle)+"&url="+encodeURI(returnUrl);
                    location.href= Url + dataSend;

                }

            }

        }

    }else if(payWay == '2'){
        //支付宝H5支付
        sourcecomment.cancel();//先取消异步请求
        var returnUrl = baseXueYuanPath + 'success.html?s='+getSaasId();//

        if(navigator.userAgent.indexOf("Html5Plus") > -1) {
            var dataSend = "?shuxing="+str+"&zengzhiids="+zengzhiids+"&bankNo="+orderNo+"&mediaType="+mediaType+"&orderNum="+orderNum+"&orderMoney="+orderMoney+"&payWay="+payWay+"&orderType="+orderType+"&orderAboutid="+orderAboutid+"&inUser="+getShareId2()+"&orderAddress="+orderAddress+"&token="+token+"&orderTitle="+encodeURI(orderTitle)+"&url="+encodeURI(returnUrl);
            location.href= Url + dataSend;
        }else{
            var dataSend = "?shuxing="+str+"&zengzhiids="+zengzhiids+"&bankNo="+orderNo+"&mediaType="+mediaType+"&orderNum="+orderNum+"&orderMoney="+orderMoney+"&payWay="+payWay+"&orderType="+orderType+"&orderAboutid="+orderAboutid+"&inUser="+getShareId2()+"&orderAddress="+orderAddress+"&token="+token+"&orderTitle="+encodeURI(orderTitle)+"&url="+encodeURI(returnUrl);
            location.href= Url + dataSend;
        }



    }



    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: Url,
        data:datahongBao,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //console.log("rs.data.code======="+rs.data.code)
        if(rs.status=200){
            if(rs.data.code == 0 || rs.data.code == '0' || rs.data.code == 1 ){
                //console.log("data===="+rs.data.data)
                //$.toast("操作成功", 'success');
                //去支付--弹出选择支付方式--支付密码（订单信息）--支付成功--跳回
                //刷新页面
                if(orderType == '22'){//红包支付
                    if(payWay == '1'){//微信跳转刷新
                        if(getBrowser() == 'wxmobile'){
                            //公众号支付
                            //console.log("rs.data.code===="+rs.data.code)
                            //console.log("data===="+rs.data.data)
                            var data = $.parseJSON(rs.data.data);
                            if (typeof WeixinJSBridge == "undefined") {
                                if (document.addEventListener) {
                                    document.addEventListener('WeixinJSBridgeReady',
                                        onBridgeReady(data), false);
                                } else if (document.attachEvent) {
                                    document.attachEvent('WeixinJSBridgeReady',
                                        onBridgeReady(data));
                                    document.attachEvent('onWeixinJSBridgeReady',
                                        onBridgeReady(data));
                                }
                            } else {
                                onBridgeReady(data);
                            }


                        }



                    }else if(payWay == '3'){//余额支付跳转刷新
                        if(hongbaoType == '1'){//评论发红包
                            closediv("paytips");
                            openCommentList("commentDataList","2","1",5,var1,var2,var3);
                        }else if(hongbaoType == '2'){//动态发红包
                            refresh();
                        }else if(hongbaoType == '3'){//群内
                            refresh();
                        }else if(hongbaoType == '4'){//提问发红包
                            refresh();
                        }

                    }

                }else{
                    if(payWay == '1'){//微信跳转刷新
                        if(getBrowser() == 'wxmobile'){
                            if(localStorage.getItem("isdisthreepay") != '1'){

                                //公众号支付
                                var data = $.parseJSON(rs.data.data);
                                if (typeof WeixinJSBridge == "undefined") {
                                    if (document.addEventListener) {
                                        document.addEventListener('WeixinJSBridgeReady',
                                            onBridgeReady(data), false);
                                    } else if (document.attachEvent) {
                                        document.attachEvent('WeixinJSBridgeReady',
                                            onBridgeReady(data));
                                        document.attachEvent('onWeixinJSBridgeReady',
                                            onBridgeReady(data));
                                    }
                                } else {
                                    onBridgeReady(data);
                                }


                            }else{

                                var url = window.location.href;
                                toSuccess(url);

                            }

                        }



                    }else if(payWay == '3'){//余额支付跳转刷新
                        var url = window.location.href;
                        toSuccess(url);
                    }else if(payWay == '2'){//支付宝支付跳转刷新
                        var url = window.location.href;
                        toSuccess(url);
                    }
                }
                //其他支付类型--订单类型跳转到不同的界面
                initNRPay();
            }else{
                $.toast(rs.data.msg, "text");
                initNRPay();
                if(rs.data.code == '-1'){
                    localStorage.setItem('token','');
                    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                        isLogin('','');
                    }
                }
            }
        }else{
            $.toast("操作失败", "text");
            initNRPay();
        }

    });

}


//公众号支付
function onBridgeReady(json) {
    WeixinJSBridge.invoke('getBrandWCPayRequest', json, function(res) {
        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
        var hongbaoType = $("#hongbaoType").val();
        var var1 = $("#var1").val();
        var var2 = $("#var2").val();
        var var3 = $("#var3").val();
        if (res.err_msg == "get_brand_wcpay_request:ok") {

            if(hongbaoType == '1'){//评论发红包
                closediv("paytips");
                openCommentList("commentDataList","2","1",5,var1,var2,var3);
            }else if(hongbaoType == '2'){//动态发红包
                refresh();
            }else if(hongbaoType == '3'){//群内
                refresh();
            }else if(hongbaoType == '4'){//提问发红包
                refresh();
            }else{
                var url = window.location.href;
                toSuccess(url);
            }

        } else {
            initNRPay();
            var url = window.location.href;
            toFail(url);
        }
    });
}


//防重复提交保存
function saveNRPay(){
    if(localStorage.getItem("isdisthreepay") == '1'){
        //第三方支付接口
        var savepayFlag = $("#savepayFlag").val();
        if(savepayFlag > 0){
            $.toast("请勿重复提交", "text");
        }else{
            if($("#savepayFlag").size() == 0){
                $("body").append("<input type='hidden' id='savepayFlag' value='1' >");
            }
            toPay();
        }
    }else if(localStorage.getItem("isqrpay") == '1'){
        var payWay = $("input[name='payWay']:checked").val();
        if(payWay == '1'){//微信支付
            location.href='wxpay.html';
        }else if(payWay == '2'){//支付宝支付
            location.href='alipay.html';

        }


    }else{
        var savepayFlag = $("#savepayFlag").val();
        if(savepayFlag > 0){
            $.toast("请勿重复提交", "text");
        }else{
            if($("#savepayFlag").size() == 0){
                $("body").append("<input type='hidden' id='savepayFlag' value='1' >");
            }
            toPay();

        }
    }



}

//初始化重复提交判断
function initNRPay(){
    $("#savepayFlag").remove();
}


function setFileUpload(){
    //if($("#uploaderInputA").size() == 0 ){
        if($("#tagnavtop").size() > 0){
            TagNav('#tagnavtop',{
                type: 'scrollToNext',
                curClassName: 'weui-state-active',
                index:0
            });
            if($("#radioComment").size() > 0){
                $("#radioComment").val("1");
            }else{
                $("body").append("<input type='hidden' id='radioComment' value='1' >");
            }
        }




        if($("#tagnav").size() > 0){
            TagNav('#tagnav',{
                type: 'scrollToNext',
                curClassName: 'weui-state-active',
                index:0
            });
        }

        var tmplA = '<li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(#url#)"><div class="weui-uploader__file-content" id="#progress#"></div></li>';
        var tmplB = "";
        if($("#xiangmufabu").size() > 0){
            tmplB = '<li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(#url#)"><div class="weui-uploader__file-content" id="#progress#"></div></li>';

        }else{
            tmplB = '<li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(../../img/agent/images/shipin.png)"><div class="weui-uploader__file-content" id="#progress#"></div></li>';
        }

        var tmplC = '<li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(../../img/agent/images/wenjian-.png)"><div class="weui-uploader__file-content" id="#progress#"></div></li>';

        var      $uploaderInputA = $("#uploaderInputA"); //上传按钮+
        var      $uploaderInputB = $("#uploaderInputB"); //上传按钮+
        var      $uploaderInputC = $("#uploaderInputC"); //上传按钮+
        var       $uploaderFilesA = $("#uploaderFilesA");    //图片列表
        var       $uploaderFilesB = $("#uploaderFilesB");    //图片列表
        var       $uploaderFilesC = $("#uploaderFilesC");    //图片列表


        $uploaderInputA.on("change", function(e){
            var timestamp = (new Date()).getTime();
            var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;

            if(files.length <= 9){
                for (var i = 0, len = files.length; i < len; ++i) {
                    var urls = $("div[id^=progressA]");
                    if(urls.length < 9){
                        var file = files[i];

                        if (url) {
                            src = url.createObjectURL(file);
                        } else {
                            src = e.target.result;
                        }
                        $("#uploaderQingChuFilesA").show();
                        $uploaderFilesA.append($(tmplA.replace('#url#', src).replace('#progress#','progressA'+timestamp+i)));
                        uploadImageFile('uploaderInputA','uploaderInputAFile','progressA'+timestamp,i);

                    }else{
                        $.toast('最多选取9张', "text");
                    }
                }
            }else{
                $.toast('最多选取9张', "text");
            }
        });
        $uploaderInputB.on("change", function(e){
            var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
            //单文件上传-先清除
            qingchuUrl("uploaderInputB","uploaderInputBFile","");

            if(files.length <= 1){

                for (var i = 0, len = files.length; i < len; ++i) {
                    var file = files[i];

                    if (url) {
                        src = url.createObjectURL(file);
                    } else {
                        src = e.target.result;
                    }

                    $uploaderFilesB.html($(tmplB.replace('#url#', src).replace('#progress#','progressB'+i)));

                    if($("#xiangmufabu").size() > 0){
                        uploadImageFile('uploaderInputB','uploaderInputBFile','progressB',i);
                    }else{
                        uploadFile('uploaderInputB','uploaderInputBFile','progressB',i);

                    }
                }


            }else{
                $.toast('最多选取1个文件', "text");
            }
        });
        $uploaderInputC.on("change", function(e){
            var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
            //单文件上传-先清除
            qingchuUrl("uploaderInputC","uploaderInputCFile","");

            if(files.length <= 1){

                for (var i = 0, len = files.length; i < len; ++i) {
                    var file = files[i];

                    if (url) {
                        src = url.createObjectURL(file);
                    } else {
                        src = e.target.result;
                    }

                    $uploaderFilesC.html($(tmplC.replace('#url#', src).replace('#progress#','progressC'+i)));
                    uploadFile('uploaderInputC','uploaderInputCFile','progressC',i);
                }


            }else{
                $.toast('最多选取1个文件', "text");
            }
        });
    //}



}
setFileUpload();


function mydongtaiwdhd(){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        $("#havaCommnetFlag").remove();
        $("#haveHdCommnetFlag").remove();
        haveHdCommnetContent();
        openDongtaiWdHdSave('', '', '', '');
    }
}
function mydongtaiwd(){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        $("#havaCommnetFlag").remove();
        $("#haveWdCommnetFlag").remove();
        haveWdCommnetContent();
        openDongtaiWdSave('', '', '', '');
    }
}
function mydongtai(){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {

        openDongtaiSave('', '', '', '');
    }
}

function mydongtaibd(){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        openDongtaiSaveBD('', '', '', '');
    }
}

function mydongtai2(){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        openDongtaiSave2('', '', '', '');
    }
}
function mydongtaidsp(){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        openDongtaiSaveDsp('', '', '', '');
    }
}
function mychat(){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    if(isLogin2("","")) {
        openChatSave('', '', '', '');
        $("#topchat").css("padding-bottom", "370px");
        $(".weui-popup__overlay").css("opacity", "0");
        test();
        if ($("#qunNum").val() == 2) {
            $("#hongbaoNum").val("1");
            $("#hongbaodange").hide();
        }
    }

}

function havaCommnetContent() {
    var commentCommonStr = '';
    commentCommonStr += '<div id="havaCommnetFlag">';
    if($(".weui-gallery").size() == 0){
        commentCommonStr += '<div class="weui-gallery" style="display: none">';
        commentCommonStr += '<span class="weui-gallery__img"></span>';
        commentCommonStr += '<div class="weui-gallery__opr">';
        commentCommonStr += '</div>';
        commentCommonStr += '</div>';
    }
    commentCommonStr += '<!--评论列表-->';
    commentCommonStr += '<div id="halfCommentList" class="weui-popup__container popup-bottom">';
    commentCommonStr += '<div class="weui-popup__overlay"></div>';
    commentCommonStr += '<div class="weui-popup__modal myweui-popup__modal">';
    commentCommonStr += '<div class="toolbar">';
    commentCommonStr += '<div class="toolbar-inner" >';
    commentCommonStr += '<a href="javascript:$.closePopup();"  class="picker-button">关闭</a>';
    commentCommonStr += '<h1 class="title" >评论列表</h1>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="modal-content">';
    commentCommonStr += '<div class="weui-cells weui-cells_form">';
    commentCommonStr += '<div class="weui-cell">';
    commentCommonStr += '<div class="weui-cell__bd" id="comment" style="max-height: 400px;overflow: auto;-webkit-overflow-scrolling: touch;">';
    commentCommonStr += '<div class="page-bd-15">';
    commentCommonStr += '<ul class="weui-comment" id="commentDataList">';



    commentCommonStr += '</ul>';

    commentCommonStr += '</div>';

    commentCommonStr += '</div>';

    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="page-bd-15 page-mypadding" >';
    commentCommonStr += '<a  class="weui-btn weui-btn_primary mybtn" id="wodexiangfa">我的想法</a>';


    commentCommonStr += '</div>';
    commentCommonStr += ' </div>';
    commentCommonStr += ' </div>';
    commentCommonStr += ' </div>';
    commentCommonStr += '<!--提交评论-->';
    commentCommonStr += '<div id="halfComment" class="weui-popup__container popup-bottom">';
    commentCommonStr += '<div class="weui-popup__overlay"></div>';
    commentCommonStr += '<div class="weui-popup__modal">';
    commentCommonStr += '<div class="toolbar">';
    commentCommonStr += '<div class="toolbar-inner">';
    commentCommonStr += '<a href="javascript:$.closePopup();" class="picker-button ">关闭</a>';
    commentCommonStr += '<h1 class="title " id="fabiaotitle">评论</h1>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="modal-content bg-white">';
    commentCommonStr += '<div id="tagnavtop" class="weui-navigator weui-navigator-wrapper top0">';
    commentCommonStr += '<ul class="weui-navigator-list">';
    if(curWwwPath.search("chatdetail") != -1){
        commentCommonStr += '<li id="diswenzi"><a onclick="setdiswenzifile();">文字</a></li>';
    }
    commentCommonStr += '<li id="disshipin"><a onclick="setdisvideofile();">视频</a></li>';
    commentCommonStr += '<li id="distupian"><a onclick="setdisImagefile();">图片</a></li>';
    commentCommonStr += '<li class="disnone" id="yuyin"><a onclick="setdisvoicefile();">语音</a></li>';
    commentCommonStr += '<li id="hongbaodis"><a onclick="setdishongbaofile();">红包</a></li>';
    commentCommonStr += '<li id="wenjian"><a onclick="setdisattachfile();">文件</a></li>';

    commentCommonStr += '</ul>';
    commentCommonStr += '</div>';

    if(localStorage.getItem("isdisvideozhuti") == '1' && curWwwPath.search("chatdetail") == -1){
        commentCommonStr += '<div class="page-bd-15 bg-white top45 disnone" id="upfile" style="margin-top: 140px;">';
    }else{
        //margin-top: 80px;
        if(curWwwPath.search("chatdetail") != -1){
            commentCommonStr += '<div class="page-bd-15 bg-white top45 disnone" id="upfile" style="margin-top: 50px;">';
        }else{
            commentCommonStr += '<div class="page-bd-15 bg-white top45 disnone" id="upfile" style="margin-top: 50px;>';
        }
    }

    commentCommonStr += '<div class="weui-uploader bg-white" >';
    commentCommonStr += '<div class="weui-uploader__hd" id="is_weui_hidden">';

    commentCommonStr += '</div>';
    commentCommonStr += '<div class="weui-uploader__bd">';
    commentCommonStr += '<ul class="weui-uploader__files" id="uploaderFilesA">';

    commentCommonStr += '</ul>';
    commentCommonStr += '<div class="weui-uploader__input-box">';
    commentCommonStr += '<input  type="file"  accept="image/*"  multiple="multiple" id="uploaderInputA" class="weui-uploader__input" ><div id="uploaderQingChuFilesA" onclick=qingchuUrl(\'uploaderInputA\',\'uploaderFilesA\',\'uploaderQingChuFilesA\') class="qingchuwenjian"></div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';

    if(curWwwPath.search("chatdetail") != -1){
        commentCommonStr += '<div class="page-bd-15 bg-white  top40 disnone" id="videofile">';
    }else{
        commentCommonStr += '<div class="page-bd-15 bg-white  top40" id="videofile">';
    }
    commentCommonStr += '<div class="weui-uploader bg-white" >';
    commentCommonStr += '<div class="weui-uploader__hd">';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="weui-uploader__bd">';
    commentCommonStr += '<ul class="weui-uploader__files" id="uploaderFilesB">';
    commentCommonStr += '</ul>';
    commentCommonStr += '<div class="weui-uploader__input-box">';
    commentCommonStr += '<input id="uploaderInputB" class="weui-uploader__input" accept="video/*"  capture="camcorder"  type="file" >';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';

    commentCommonStr += '<div class="page-bd-15 bg-white disnone top40" id="attachfile">';
    commentCommonStr += '<div class="weui-uploader bg-white" >';
    commentCommonStr += '<div class="weui-uploader__hd">';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="weui-uploader__bd">';
    commentCommonStr += '<ul class="weui-uploader__files" id="uploaderFilesC">';

    commentCommonStr += '</ul>';
    commentCommonStr += '<div class="weui-uploader__input-box">';
    commentCommonStr += '<input id="uploaderInputC" class="weui-uploader__input"   type="file">';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    if(navigator.userAgent.indexOf("Html5Plus") > -1) {

        commentCommonStr += '<div class="page-bd-15 bg-white text-center disnone top39" onclick="startRecordPlus();" id="voicefile">';

        commentCommonStr += '<img  id="luyinzhuangtai" src="../../img/agent/images/dianwoluyin.png" width="45px" height="45px"/>';
        commentCommonStr += '<img class="disnone" id="luyinzhong" src="../../img/agent/images/luyin.gif" width="128px" height="74px"/>';

        commentCommonStr += '<p class="f14 " style="color:#FF6666" id="recordtext">点击开始录音</p>';
        commentCommonStr += '</div>';

    }else if(getBrowser() == 'wxmobile'){

        commentCommonStr += '<div class="page-bd-15 bg-white text-center disnone top39" onclick="startRecord();" id="voicefile">';

        commentCommonStr += '<img  id="luyinzhuangtai" src="../../img/agent/images/dianwoluyin.png" width="45px" height="45px"/>';
        commentCommonStr += '<img class="disnone" id="luyinzhong" src="../../img/agent/images/luyin.gif" width="128px" height="74px"/>';
        commentCommonStr += '<p class="f14 " style="color:#FF6666" id="recordtext">点击开始录音</p>';
        commentCommonStr += '</div>';

    }else{

        commentCommonStr += '<div class="page-bd-15 bg-white text-center disnone top82"  id="voicefile">';
        commentCommonStr += '<i class="beauty icon-yuyin f-green f35" id="recordicon"></i>';
        commentCommonStr += '<p class="f14 f-gray" id="recordtext">(请在APP或微信中使用语音功能)</p>';
        commentCommonStr += '</div>';

    }

    commentCommonStr += '<div class="page-bd-15 bg-white text-center disnone top40" id="hongbaofile">';
/*
    commentCommonStr += '<i class="beauty icon-hongbao f-red f35"></i>';
*/
    commentCommonStr += '<div class="weui-cell">';
    commentCommonStr += '<div class="weui-cell__hd"><label class="weui-label">红包金额</label></div>';
    commentCommonStr += '<div class="weui-cell__bd">';
    commentCommonStr += '<select class="weui-select" id="hongbaoMoney">'+localStorage.getItem("hongbaomoney")+'</select> ';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="weui-cell" id="hongbaodange">';
    commentCommonStr += '<div class="weui-cell__hd"><label class="weui-label">红包数量</label></div>';
    commentCommonStr += '<div class="weui-cell__bd">';
    commentCommonStr += '<select class="weui-select" id="hongbaoNum">'+localStorage.getItem("hongbaonum")+'</select> ';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';

    commentCommonStr += '<div id="recordaudionew"></div>';


    if(localStorage.getItem('isdisvideozhuti') == '1' && curWwwPath.search("chatdetail") == -1){

        commentCommonStr += '<div  id="zhuti"><div class="weui-cell" style="padding: 1px 15px;">';
        commentCommonStr += '<div class="weui-cell__hd"><label class="weui-label" style="">主题分类</label></div>';
        commentCommonStr += '<div class="weui-cell__bd">';
        /*
                commentCommonStr += '<input class="weui-input" style="" id="questionTopic" placeholder="请选择问题主题" type="text" value="">';
        */

        commentCommonStr += '<select class="weui-select" name="dongtaiTopic" id="dongtaiTopic">'+localStorage.getItem("dongtaitopicjson")+'';


        commentCommonStr += '</select>';


        commentCommonStr += '</div>';
        commentCommonStr += '</div>';


        commentCommonStr += '<div class="weui-cell" style="padding: 1px 15px;" id="videojiage">';
        commentCommonStr += '<div class="weui-cell__hd"><label class="weui-label">视频价格</label></div>';
        commentCommonStr += '<div class="weui-cell__bd">';
        commentCommonStr += '<select class="weui-select" id="fabujinbi">'+localStorage.getItem("fabujinbi")+'</select> ';
        commentCommonStr += '</div>';
        commentCommonStr += '</div></div>';
    }

    if(curWwwPath.search("chatdetail") != -1){
        commentCommonStr += '<div style="height: 100px;" id="wenzigao">&nbsp;</div>';
    }

    commentCommonStr += '<div class="weui-cells weui-cells_form f16">';
    commentCommonStr += '<div class="weui-cell">';
    commentCommonStr += '<div class="weui-cell__bd">';
    commentCommonStr += '<textarea id="commentContent" class="weui-textarea" placeholder="请输入文字信息" rows="3"';
    commentCommonStr += '></textarea>';
    if(curWwwPath.search("chatdetail") == -1){
        if(getIsAPPLE()){
            commentCommonStr += '<div class="center2" id="tishixinxi"><a href="help.html?img=3.png">如果相机和视频打不开，请看这里！</a></div>';
        }

        if(!getIsAPPLE() && navigator.userAgent.indexOf("Html5Plus") > -1) {
            commentCommonStr += '<div class="center2"  id="tishixinxi"><a href="help.html?img=4.png">录视频请选择图库或相册后点击左上角进行录制！</a></div>';

        }
    }













    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="page-bd-15 page-mypadding">';
    commentCommonStr += '<a href="javascript:;"  class="weui-btn weui-btn_primary mybtn" id="buttonSavecomment">提交</a>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div></div>';

    $("body").append(commentCommonStr);

    $("input,select,textarea").blur(function(){
        setTimeout(function() {
            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
    });

    TagNav('#tagnavtop',{
        type: 'scrollToNext',
        curClassName: 'weui-state-active',
        index:0
    });
    setFileUpload();
    if(localStorage.getItem("isshipin") != '1'){
        if($("#radioComment").size() > 0){
            $("#radioComment").val("3");
        }else{
            $("body").append("<input type='hidden' id='radioComment' value='3' >");
        }
    }else{
        if($("#radioComment").size() > 0){
            $("#radioComment").val("1");
        }else{
            $("body").append("<input type='hidden' id='radioComment' value='1' >");
        }
    }

}
if($("#havaCommnet").size() > 0){
    havaCommnetContent();

}



if($("#havaCommnetDsp").size() > 0){
    var commentCommonStr = '';
    if($(".weui-gallery").size() == 0){
        commentCommonStr += '<div class="weui-gallery" style="display: none">';
        commentCommonStr += '<span class="weui-gallery__img"></span>';
        commentCommonStr += '<div class="weui-gallery__opr">';
        commentCommonStr += '</div>';
        commentCommonStr += '</div>';
    }
    commentCommonStr += '<!--评论列表-->';
    commentCommonStr += '<div id="halfCommentList" class="weui-popup__container popup-bottom">';
    commentCommonStr += '<div class="weui-popup__overlay"></div>';
    commentCommonStr += '<div class="weui-popup__modal myweui-popup__modal">';
    commentCommonStr += '<div class="toolbar">';
    commentCommonStr += '<div class="toolbar-inner">';
    commentCommonStr += '<a href="javascript:$.closePopup();" class="picker-button ">关闭</a>';
    commentCommonStr += '<h1 class="title">评论列表</h1>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="modal-content">';
    commentCommonStr += '<div class="weui-cells weui-cells_form">';
    commentCommonStr += '<div class="weui-cell">';
    commentCommonStr += '<div class="weui-cell__bd" id="comment" style="max-height: 400px;overflow: auto;-webkit-overflow-scrolling: touch;">';
    commentCommonStr += '<div class="page-bd-15">';
    commentCommonStr += '<ul class="weui-comment" id="commentDataList">';



    commentCommonStr += '</ul>';

    commentCommonStr += '</div>';

    commentCommonStr += '</div>';

    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="page-bd-15 page-mypadding" >';
    commentCommonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" id="wodexiangfa">我的想法</a>';


    commentCommonStr += '</div>';
    commentCommonStr += ' </div>';
    commentCommonStr += ' </div>';
    commentCommonStr += ' </div>';
    commentCommonStr += '<!--提交评论-->';
    commentCommonStr += '<div id="halfComment" class="weui-popup__container popup-bottom">';
    commentCommonStr += '<div class="weui-popup__overlay"></div>';
    commentCommonStr += '<div class="weui-popup__modal">';
    commentCommonStr += '<div class="toolbar">';
    commentCommonStr += '<div class="toolbar-inner">';
    commentCommonStr += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
    commentCommonStr += '<h1 class="title" id="fabiaotitle">发布视频</h1>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="modal-content bg-white">';
    commentCommonStr += '<div id="tagnavtop" class="weui-navigator weui-navigator-wrapper top0">';
    commentCommonStr += '<ul class="weui-navigator-list">';
    commentCommonStr += '<li><a href="javascript:setdisImagefile();">图片</a></li>';
    commentCommonStr += '<li><a href="javascript:setdisvideofile();">视频</a></li>';

    commentCommonStr += '<li  class="disnone"><a href="javascript:setdisvoicefile();">语音</a></li>';

    commentCommonStr += '<li><a href="javascript:setdisattachfile();">文件</a></li>';
    commentCommonStr += '<li><a href="javascript:setdishongbaofile();">红包</a></li>';
    commentCommonStr += '</ul>';
    commentCommonStr += '</div>';


    commentCommonStr += '<div class="page-bd-15 bg-white top40" id="upfile">';
    commentCommonStr += '<div class="weui-uploader bg-white" >';
    commentCommonStr += '<div class="weui-uploader__hd">';

    commentCommonStr += '</div>';
    commentCommonStr += '<div class="weui-uploader__bd">';
    commentCommonStr += '<ul class="weui-uploader__files" id="uploaderFilesA">';

    commentCommonStr += '</ul>';
    commentCommonStr += '<div class="weui-uploader__input-box">';
    commentCommonStr += '<input type="file"  accept="image/*"  multiple="" id="uploaderInputA" class="weui-uploader__input"  ><div id="uploaderQingChuFilesA" onclick=qingchuUrl(\'uploaderInputA\',\'uploaderFilesA\',\'uploaderQingChuFilesA\') class="qingchuwenjian"></div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="page-bd-15 bg-white disnone top40" id="videofile">';
    commentCommonStr += '<div class="weui-uploader bg-white" >';
    commentCommonStr += '<div class="weui-uploader__hd">';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="weui-uploader__bd">';
    commentCommonStr += '<ul class="weui-uploader__files" id="uploaderFilesB">';
    commentCommonStr += '</ul>';
    commentCommonStr += '<div class="weui-uploader__input-box">';
    commentCommonStr += '<input id="uploaderInputB" class="weui-uploader__input" accept="video/*"  capture="camcorder" type="file">';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="page-bd-15 bg-white disnone top40" id="attachfile">';
    commentCommonStr += '<div class="weui-uploader bg-white" >';
    commentCommonStr += '<div class="weui-uploader__hd">';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="weui-uploader__bd">';
    commentCommonStr += '<ul class="weui-uploader__files" id="uploaderFilesC">';

    commentCommonStr += '</ul>';
    commentCommonStr += '<div class="weui-uploader__input-box">';
    commentCommonStr += '<input id="uploaderInputC" class="weui-uploader__input"   type="file">';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    if(navigator.userAgent.indexOf("Html5Plus") > -1) {

        commentCommonStr += '<div class="page-bd-15 bg-white text-center disnone top39" onclick="startRecordPlus();" id="voicefile">';

        commentCommonStr += '<img  id="luyinzhuangtai" src="../../img/agent/images/dianwoluyin.png" width="45px" height="45px"/>';
        commentCommonStr += '<img class="disnone" id="luyinzhong" src="../../img/agent/images/luyin.gif" width="128px" height="74px"/>';

        commentCommonStr += '<p class="f14 " style="color:#FF6666" id="recordtext">点击开始录音</p>';
        commentCommonStr += '</div>';

    }else if(getBrowser() == 'wxmobile'){

        commentCommonStr += '<div class="page-bd-15 bg-white text-center disnone top39" onclick="startRecord();" id="voicefile">';

        commentCommonStr += '<img  id="luyinzhuangtai" src="../../img/agent/images/dianwoluyin.png" width="45px" height="45px"/>';
        commentCommonStr += '<img class="disnone" id="luyinzhong" src="../../img/agent/images/luyin.gif" width="128px" height="74px"/>';

        commentCommonStr += '<p class="f14 " style="color:#FF6666" id="recordtext">点击开始录音</p>';
        commentCommonStr += '</div>';

    }else{

        commentCommonStr += '<div class="page-bd-15 bg-white text-center disnone top82"  id="voicefile">';
        commentCommonStr += '<i class="beauty icon-yuyin f-green f35" id="recordicon"></i>';
        commentCommonStr += '<p class="f14 f-gray" id="recordtext">(请在APP或微信中使用录音功能)</p>';
        commentCommonStr += '</div>';
    }

    commentCommonStr += '<div class="page-bd-15 bg-white text-center disnone top40" id="hongbaofile">';
    commentCommonStr += '<i class="beauty icon-hongbao f-red f35"></i>';
    commentCommonStr += '<div class="weui-cell">';
    commentCommonStr += '<div class="weui-cell__hd"><label class="weui-label">红包金额</label></div>';
    commentCommonStr += '<div class="weui-cell__bd">';
    commentCommonStr += '<select class="weui-select" id="hongbaoMoney">'+localStorage.getItem("hongbaomoney")+'</select>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="weui-cell">';
    commentCommonStr += '<div class="weui-cell__hd"><label class="weui-label">红包数量</label></div>';
    commentCommonStr += '<div class="weui-cell__bd">';
    commentCommonStr += '<select class="weui-select" id="hongbaoNum">'+localStorage.getItem("hongbaonum")+'</select>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';

    commentCommonStr += '<div id="recordaudionew"></div>';

    commentCommonStr += '<div class="weui-cells weui-cells_form f16">';
    commentCommonStr += '<div class="weui-cell">';
    commentCommonStr += '<div class="weui-cell__bd">';
    commentCommonStr += '<textarea id="commentContent" class="weui-textarea" placeholder="请输入文字信息" rows="3"';
    commentCommonStr += '></textarea>';
    if(getIsAPPLE()){
        commentCommonStr += '<div class="center2"><a href="help.html?img=3.png">如果相机和视频打不开，请看这里！</a></div>';
    }
    if(!getIsAPPLE() && navigator.userAgent.indexOf("Html5Plus") > -1) {
        commentCommonStr += '<div class="center2"><a href="help.html?img=4.png">录视频请选择图库或相册后点击左上角进行录制！</a></div>';

    }
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="page-bd-15 page-mypadding">';
    commentCommonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" id="buttonSavecomment">提交</a>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';

    $("body").append(commentCommonStr);

    $("input,select,textarea").blur(function(){
        setTimeout(function() {
            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
    });

    setFileUpload();
}

function haveWdCommnetContent() {
    var commentCommonStr = '';
    commentCommonStr += '<div id="haveWdCommnetFlag">';
    if($(".weui-gallery").size() == 0){
        commentCommonStr += '<div class="weui-gallery" style="display: none">';
        commentCommonStr += '<span class="weui-gallery__img"></span>';
        commentCommonStr += '<div class="weui-gallery__opr">';
        commentCommonStr += '</div>';
        commentCommonStr += '</div>';
    }

    commentCommonStr += '<!--评论列表-->';
    commentCommonStr += '<div id="halfCommentList" class="weui-popup__container popup-bottom">';
    commentCommonStr += '<div class="weui-popup__overlay"></div>';
    commentCommonStr += '<div class="weui-popup__modal myweui-popup__modal">';
    commentCommonStr += '<div class="toolbar">';
    commentCommonStr += '<div class="toolbar-inner">';
    commentCommonStr += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
    commentCommonStr += '<h1 class="title">评论列表</h1>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="modal-content">';
    commentCommonStr += '<div class="weui-cells weui-cells_form">';
    commentCommonStr += '<div class="weui-cell">';
    commentCommonStr += '<div class="weui-cell__bd" id="comment" style="max-height: 400px;overflow: auto;-webkit-overflow-scrolling: touch;">';
    commentCommonStr += '<div class="page-bd-15">';
    commentCommonStr += '<ul class="weui-comment" id="commentDataList">';



    commentCommonStr += '</ul>';

    commentCommonStr += '</div>';

    commentCommonStr += '</div>';

    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="page-bd-15 page-mypadding" >';
    commentCommonStr += '<a  class="weui-btn weui-btn_primary mybtn" id="wodexiangfa">我的想法</a>';


    commentCommonStr += '</div>';
    commentCommonStr += ' </div>';
    commentCommonStr += ' </div>';
    commentCommonStr += ' </div>';
    commentCommonStr += '<!--提交评论-->';
    commentCommonStr += '<div id="halfComment" class="weui-popup__container popup-bottom">';
    commentCommonStr += '<div class="weui-popup__overlay"></div>';
    commentCommonStr += '<div class="weui-popup__modal">';
    commentCommonStr += '<div class="toolbar">';
    commentCommonStr += '<div class="toolbar-inner">';
    commentCommonStr += '<a href="javascript:$.closePopup();" class="picker-button ">关闭</a>';
    commentCommonStr += '<h1 class="title " id="fabiaotitle">评论</h1>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="modal-content bg-white">';




    commentCommonStr += '<div id="tagnavtop" class="weui-navigator weui-navigator-wrapper top0">';
    commentCommonStr += '<ul class="weui-navigator-list">';
    /*commentCommonStr += '<li style="display: none;"><a href="javascript:setdishongbaofile();">红包</a></li>';*/

    //暂时取消支持视频，语音，文件，红包格式。
    commentCommonStr += '<li><a href="javascript:setdisImagefile();">图片</a></li>';
    commentCommonStr += '<li><a href="javascript:setdisvideofile();">视频</a></li>';
    commentCommonStr += '<li><a href="javascript:setdisvoicefile();">语音</a></li>';
    commentCommonStr += '<li><a href="javascript:setdisattachfile();">文件</a></li>';
    commentCommonStr += '</ul>';
    commentCommonStr += '</div>';


    commentCommonStr += '<div class="page-bd-15 bg-white top40" id="upfile">';
    commentCommonStr += '<div class="weui-uploader bg-white" >';
    // commentCommonStr += '<div class="weui-uploader__hd">';
    //
    // commentCommonStr += '</div>';
    commentCommonStr += '<div class="weui-uploader__bd">';
    commentCommonStr += '<ul class="weui-uploader__files" id="uploaderFilesA">';

    commentCommonStr += '</ul>';
    commentCommonStr += '<div class="weui-uploader__input-box">';
    commentCommonStr += '<input  type="file"  accept="image/*"  multiple="" id="uploaderInputA" class="weui-uploader__input" ><div id="uploaderQingChuFilesA" onclick=qingchuUrl(\'uploaderInputA\',\'uploaderFilesA\',\'uploaderQingChuFilesA\') class="qingchuwenjian"></div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="page-bd-15 bg-white disnone top40" id="videofile">';
    commentCommonStr += '<div class="weui-uploader bg-white" >';
    commentCommonStr += '<div class="weui-uploader__hd">';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="weui-uploader__bd">';
    commentCommonStr += '<ul class="weui-uploader__files" id="uploaderFilesB">';
    commentCommonStr += '</ul>';
    commentCommonStr += '<div class="weui-uploader__input-box">';
    commentCommonStr += '<input id="uploaderInputB" class="weui-uploader__input" accept="video/*"  capture="camcorder" type="file">';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="page-bd-15 bg-white disnone top40" id="attachfile">';
    commentCommonStr += '<div class="weui-uploader bg-white" >';
    commentCommonStr += '<div class="weui-uploader__hd">';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="weui-uploader__bd">';
    commentCommonStr += '<ul class="weui-uploader__files" id="uploaderFilesC">';

    commentCommonStr += '</ul>';
    commentCommonStr += '<div class="weui-uploader__input-box">';
    commentCommonStr += '<input id="uploaderInputC" class="weui-uploader__input"   type="file">';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    if(navigator.userAgent.indexOf("Html5Plus") > -1) {

        commentCommonStr += '<div class="page-bd-15 bg-white text-center disnone top39" onclick="startRecordPlus();" id="voicefile">';

        commentCommonStr += '<img  id="luyinzhuangtai" src="../../img/agent/images/dianwoluyin.png" width="45px" height="45px"/>';
        commentCommonStr += '<img class="disnone" id="luyinzhong" src="../../img/agent/images/luyin.gif" width="128px" height="74px"/>';

        commentCommonStr += '<p class="f14 " style="color:#FF6666" id="recordtext">点击开始录音</p>';
        commentCommonStr += '</div>';

    }else if(getBrowser() == 'wxmobile'){

        commentCommonStr += '<div class="page-bd-15 bg-white text-center disnone top39" onclick="startRecord();" id="voicefile">';

        commentCommonStr += '<img  id="luyinzhuangtai" src="../../img/agent/images/dianwoluyin.png" width="45px" height="45px"/>';
        commentCommonStr += '<img class="disnone" id="luyinzhong" src="../../img/agent/images/luyin.gif" width="128px" height="74px"/>';

        commentCommonStr += '<p class="f14 " style="color:#FF6666" id="recordtext">点击开始录音</p>';
        commentCommonStr += '</div>';

    }else{

        commentCommonStr += '<div class="page-bd-15 bg-white text-center disnone top82"  id="voicefile">';
        commentCommonStr += '<i class="beauty icon-yuyin f-green f35" id="recordicon"></i>';
        commentCommonStr += '<p class="f14 f-gray" id="recordtext">(请在APP或微信中使用录音功能)</p>';
        commentCommonStr += '</div>';
    }


    if(curWwwPath.search("myDaikuandetail") != -1 || curWwwPath.search("dcindex") != -1 || curWwwPath.search("myKadetail") != -1){
        commentCommonStr += '<div class="weui-cell">';
        commentCommonStr += '<div class="weui-cell__hd"><label class="weui-label" style="">问题主题</label></div>';
        commentCommonStr += '<div class="weui-cell__bd">';
/*
        commentCommonStr += '<input class="weui-input" style="" id="questionTopic" placeholder="请选择问题主题" type="text" value="">';
*/

        commentCommonStr += '<select class="weui-select" name="questionTopic" id="questionTopic">'+localStorage.getItem("topicjson")+'';

        commentCommonStr += '</select>';

        commentCommonStr += '</div>';
        commentCommonStr += '</div>';

        commentCommonStr += '<div class="weui-cells weui-cells_form f16">';
        commentCommonStr += '<div class="weui-cell">';
        commentCommonStr += '<div class="weui-cell__bd">';
        commentCommonStr += '<textarea id="commentContent" class="weui-textarea" style="height:60px" placeholder="请描述您的问题" rows="1"';
        commentCommonStr += '></textarea>';

        if(getIsAPPLE()){
            commentCommonStr += '<div class="center2"><a href="help.html?img=3.png">如果相机和视频打不开，请看这里！</a></div>';
        }
        if(!getIsAPPLE() && navigator.userAgent.indexOf("Html5Plus") > -1) {
            commentCommonStr += '<div class="center2"><a href="help.html?img=4.png">录视频请选择图库或相册后点击左上角进行录制！</a></div>';

        }
        commentCommonStr += '</div>';
        commentCommonStr += '</div>';


        commentCommonStr += '<div class="weui-cell weui-cell_switch" onclick=setHongbao() >';
        commentCommonStr += '<div class="weui-cell__bd">发个红包<span class="slogan">发个红包能够吸引更多人</span></div>';
        commentCommonStr += '<div class="weui-cell__ft">';
        commentCommonStr += '<label for="switchCP" class="weui-switch-cp">';
        commentCommonStr += '<input id="switchCP" class="weui-switch-cp__input"  name="switchCPWd" checked="checked" type="checkbox">';
        commentCommonStr += '<div class="weui-switch-cp__box"></div>';
        commentCommonStr += '</label>';
        commentCommonStr += '</div>';
        commentCommonStr += '</div>';

        commentCommonStr += '<div class="page-bd bg-white text-center" id="hongbaofile2">';
        commentCommonStr += '<div class="weui-cell">';
        commentCommonStr += '<div class="weui-cell__hd" ><label  class="weui-label" style="text-align: left;padding-left: 0px; " >红包金额</label></div>';
        commentCommonStr += '<div class="weui-cell__bd">';
        commentCommonStr += '<select class="weui-select" id="hongbaoMoney">'+localStorage.getItem("hongbaomoney")+'</select>';
        commentCommonStr += '</div>';
        commentCommonStr += '</div>';
        commentCommonStr += '<div class="weui-cell" id="hongbaoshumu">';
        commentCommonStr += '<div class="weui-cell__hd" ><label class="weui-label" style="text-align: left;padding-left: 0px; " >红包数量</label></div>';
        commentCommonStr += '<div class="weui-cell__bd">';
        commentCommonStr += '<select class="weui-select" id="hongbaoNum">'+localStorage.getItem("hongbaonum")+'</select>';
        commentCommonStr += '</div>';
        commentCommonStr += '</div>';
        commentCommonStr += '</div>';
    }else{
        commentCommonStr += '<div class="weui-cell">';
        commentCommonStr += '<div class="weui-cell__hd"><label class="weui-label" style="">问题主题</label></div>';
        commentCommonStr += '<div class="weui-cell__bd">';
/*
        commentCommonStr += '<input class="weui-input" style="" id="questionTopic" placeholder="请选择问题主题" type="text" value="">';
*/

        commentCommonStr += '<select class="weui-select" name="questionTopic" id="questionTopic">'+localStorage.getItem("topicjson")+'';

        commentCommonStr += '</select>';


        commentCommonStr += '</div>';
        commentCommonStr += '</div>';

        commentCommonStr += '<div id="recordaudionew"></div>';

        commentCommonStr += '<div class="weui-cells weui-cells_form f16">';
        commentCommonStr += '<div class="weui-cell">';
        commentCommonStr += '<div class="weui-cell__bd">';
        commentCommonStr += '<textarea id="commentContent" class="weui-textarea" style="height:60px" placeholder="请描述您的问题" rows="1"';
        commentCommonStr += '></textarea>';
        if(getIsAPPLE()){
            commentCommonStr += '<div class="center2"><a href="help.html?img=3.png">如果相机和视频打不开，请看这里！</a></div>';
        }
        if(!getIsAPPLE() && navigator.userAgent.indexOf("Html5Plus") > -1) {
            commentCommonStr += '<div class="center2"><a href="help.html?img=4.png">录视频请选择图库或相册后点击左上角进行录制！</a></div>';

        }
        commentCommonStr += '</div>';
        commentCommonStr += '</div>';


        commentCommonStr += '<div class="weui-cell weui-cell_switch" onclick=setHongbao() >';
        commentCommonStr += '<div class="weui-cell__bd">发个红包<span class="slogan">发个红包能够吸引更多人</span></div>';
        commentCommonStr += '<div class="weui-cell__ft">';
        commentCommonStr += '<label for="switchCP" class="weui-switch-cp">';
        commentCommonStr += '<input id="switchCP" class="weui-switch-cp__input"  name="switchCPWd" checked="checked" type="checkbox">';
        commentCommonStr += '<div class="weui-switch-cp__box"></div>';
        commentCommonStr += '</label>';
        commentCommonStr += '</div>';
        commentCommonStr += '</div>';

        commentCommonStr += '<div class="page-bd bg-white text-center" id="hongbaofile2">';
        commentCommonStr += '<div class="weui-cell">';
        commentCommonStr += '<div class="weui-cell__hd" ><label  class="weui-label" style="text-align: left;padding-left: 0px; " >红包金额</label></div>';
        commentCommonStr += '<div class="weui-cell__bd">';
        commentCommonStr += '<select class="weui-select" id="hongbaoMoney">'+localStorage.getItem("hongbaomoney")+'</select>';
        commentCommonStr += '</div>';
        commentCommonStr += '</div>';
        commentCommonStr += '<div class="weui-cell" id="hongbaoshumu">';
        commentCommonStr += '<div class="weui-cell__hd" ><label class="weui-label" style="text-align: left;padding-left: 0px; " >红包数量</label></div>';
        commentCommonStr += '<div class="weui-cell__bd">';
        commentCommonStr += '<select class="weui-select" id="hongbaoNum">'+localStorage.getItem("hongbaonum")+'</select>';
        commentCommonStr += '</div>';
        commentCommonStr += '</div>';
        commentCommonStr += '</div>';
    }






    commentCommonStr += '</div>';

    commentCommonStr += '<div class="page-bd-15 page-mypadding">';
    commentCommonStr += '<a href="javascript:;"  class="weui-btn weui-btn_primary mybtn" id="buttonSavecomment">提交</a>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div></div>';

    $("body").append(commentCommonStr);

    $("input,select,textarea").blur(function(){
        setTimeout(function() {
            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
    });

    TagNav('#tagnavtop',{
        type: 'scrollToNext',
        curClassName: 'weui-state-active',
        index:0
    });

    setFileUpload();

    if(localStorage.getItem("isshipin") != '1'){
        if($("#radioComment").size() > 0){
            $("#radioComment").val("3");
        }else{
            $("body").append("<input type='hidden' id='radioComment' value='3' >");
        }
    }else{
        if($("#radioComment").size() > 0){
            $("#radioComment").val("1");
        }else{
            $("body").append("<input type='hidden' id='radioComment' value='1' >");
        }
    }

}

if($("#havaWdCommnet").size() > 0){
    haveWdCommnetContent();

}


function haveHdCommnetContent() {
    var commentCommonStr = '';
    commentCommonStr += '<div id="haveHdCommnetFlag">';
    if($(".weui-gallery").size() == 0){
        commentCommonStr += '<div class="weui-gallery" style="display: none">';
        commentCommonStr += '<span class="weui-gallery__img"></span>';
        commentCommonStr += '<div class="weui-gallery__opr">';
        commentCommonStr += '</div>';
        commentCommonStr += '</div>';
    }
    commentCommonStr += '<!--评论列表-->';
    commentCommonStr += '<div id="halfCommentList" class="weui-popup__container popup-bottom">';
    commentCommonStr += '<div class="weui-popup__overlay"></div>';
    commentCommonStr += '<div class="weui-popup__modal myweui-popup__modal">';
    commentCommonStr += '<div class="toolbar">';
    commentCommonStr += '<div class="toolbar-inner">';
    commentCommonStr += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
    commentCommonStr += '<h1 class="title">评论列表</h1>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="modal-content">';
    commentCommonStr += '<div class="weui-cells weui-cells_form">';
    commentCommonStr += '<div class="weui-cell">';
    commentCommonStr += '<div class="weui-cell__bd" id="comment" style="max-height: 400px;overflow: auto;-webkit-overflow-scrolling: touch;">';
    commentCommonStr += '<div class="page-bd-15">';
    commentCommonStr += '<ul class="weui-comment" id="commentDataList">';



    commentCommonStr += '</ul>';

    commentCommonStr += '</div>';

    commentCommonStr += '</div>';

    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="page-bd-15 page-mypadding" >';
    commentCommonStr += '<a  class="weui-btn weui-btn_primary mybtn" id="wodexiangfa">我的想法</a>';


    commentCommonStr += '</div>';
    commentCommonStr += ' </div>';
    commentCommonStr += ' </div>';
    commentCommonStr += ' </div>';
    commentCommonStr += '<!--提交评论-->';
    commentCommonStr += '<div id="halfComment" class="weui-popup__container popup-bottom">';
    commentCommonStr += '<div class="weui-popup__overlay"></div>';
    commentCommonStr += '<div class="weui-popup__modal">';
    commentCommonStr += '<div class="toolbar">';
    commentCommonStr += '<div class="toolbar-inner">';
    commentCommonStr += '<a href="javascript:$.closePopup();" class="picker-button ">关闭</a>';
    commentCommonStr += '<h1 class="title " id="fabiaotitle">评论</h1>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="modal-content bg-white">';




    commentCommonStr += '<div id="tagnavtop" class="weui-navigator weui-navigator-wrapper top0">';
    commentCommonStr += '<ul class="weui-navigator-list">';
    /*commentCommonStr += '<li style="display: none;"><a href="javascript:setdishongbaofile();">红包</a></li>';*/
    commentCommonStr += '<li><a href="javascript:setdisImagefile();">图片</a></li>';
    commentCommonStr += '<li><a href="javascript:setdisvideofile();">视频</a></li>';

    commentCommonStr += '<li  class="disnone"><a href="javascript:setdisvoicefile();">语音</a></li>';

    commentCommonStr += '<li><a href="javascript:setdisattachfile();">文件</a></li>';
    commentCommonStr += '</ul>';
    commentCommonStr += '</div>';


    commentCommonStr += '<div class="page-bd-15 bg-white top40" id="upfile">';
    commentCommonStr += '<div class="weui-uploader bg-white" >';
    commentCommonStr += '<div class="weui-uploader__hd">';

    commentCommonStr += '</div>';
    commentCommonStr += '<div class="weui-uploader__bd">';
    commentCommonStr += '<ul class="weui-uploader__files" id="uploaderFilesA">';

    commentCommonStr += '</ul>';
    commentCommonStr += '<div class="weui-uploader__input-box">';
    commentCommonStr += '<input  type="file"  accept="image/*"  multiple="" id="uploaderInputA" class="weui-uploader__input" ><div id="uploaderQingChuFilesA" onclick=qingchuUrl(\'uploaderInputA\',\'uploaderFilesA\',\'uploaderQingChuFilesA\') class="qingchuwenjian"></div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="page-bd-15 bg-white disnone top40" id="videofile">';
    commentCommonStr += '<div class="weui-uploader bg-white" >';
    commentCommonStr += '<div class="weui-uploader__hd">';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="weui-uploader__bd">';
    commentCommonStr += '<ul class="weui-uploader__files" id="uploaderFilesB">';
    commentCommonStr += '</ul>';
    commentCommonStr += '<div class="weui-uploader__input-box">';
    commentCommonStr += '<input id="uploaderInputB" class="weui-uploader__input" accept="video/*"  capture="camcorder" type="file">';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="page-bd-15 bg-white disnone top40" id="attachfile">';
    commentCommonStr += '<div class="weui-uploader bg-white" >';
    commentCommonStr += '<div class="weui-uploader__hd">';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="weui-uploader__bd">';
    commentCommonStr += '<ul class="weui-uploader__files" id="uploaderFilesC">';

    commentCommonStr += '</ul>';
    commentCommonStr += '<div class="weui-uploader__input-box">';
    commentCommonStr += '<input id="uploaderInputC" class="weui-uploader__input"   type="file">';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    if(navigator.userAgent.indexOf("Html5Plus") > -1) {

        commentCommonStr += '<div class="page-bd-15 bg-white text-center disnone top39" onclick="startRecordPlus();" id="voicefile">';
        commentCommonStr += '<img  id="luyinzhuangtai" src="../../img/agent/images/dianwoluyin.png" width="45px" height="45px"/>';
        commentCommonStr += '<img class="disnone" id="luyinzhong" src="../../img/agent/images/luyin.gif" width="128px" height="74px"/>';

        commentCommonStr += '<p class="f14 " style="color:#FF6666" id="recordtext">点击开始录音</p>';
        commentCommonStr += '</div>';


    }else if(getBrowser() == 'wxmobile'){

        commentCommonStr += '<div class="page-bd-15 bg-white text-center disnone top39" onclick="startRecord();" id="voicefile">';
        commentCommonStr += '<img  id="luyinzhuangtai" src="../../img/agent/images/dianwoluyin.png" width="45px" height="45px"/>';
        commentCommonStr += '<img class="disnone" id="luyinzhong" src="../../img/agent/images/luyin.gif" width="128px" height="74px"/>';

        commentCommonStr += '<p class="f14 " style="color:#FF6666" id="recordtext">点击开始录音</p>';
        commentCommonStr += '</div>';


    }else{

        commentCommonStr += '<div class="page-bd-15 bg-white text-center disnone top82"  id="voicefile">';
        commentCommonStr += '<i class="beauty icon-yuyin f-green f35" id="recordicon"></i>';
        commentCommonStr += '<p class="f14 f-gray" id="recordtext">(请在APP或微信中使用录音功能)</p>';
        commentCommonStr += '</div>';
    }



  /*  commentCommonStr += '<div class="weui-cell">';
    commentCommonStr += '<div class="weui-cell__hd"><label class="weui-label">问题主题</label></div>';
    commentCommonStr += '<div class="weui-cell__bd">';
    commentCommonStr += '<input class="weui-input" id="questionTopic" type="text" value="财商">';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';*/
    commentCommonStr += '<div id="recordaudionew"></div>';

    commentCommonStr += '<div class="weui-cells weui-cells_form f16">';
    commentCommonStr += '<div class="weui-cell">';
    commentCommonStr += '<div class="weui-cell__bd">';
    commentCommonStr += '<textarea id="commentContent" class="weui-textarea" style="height:60px" placeholder="请描述您的问题" rows="1"';
    commentCommonStr += '></textarea>';
    if(getIsAPPLE()){
        commentCommonStr += '<div class="center2"><a href="help.html?img=3.png">如果相机和视频打不开，请看这里！</a></div>';
    }
    if(!getIsAPPLE() && navigator.userAgent.indexOf("Html5Plus") > -1) {
        commentCommonStr += '<div class="center2"><a href="help.html?img=4.png">录视频请选择图库或相册后点击左上角进行录制！</a></div>';

    }
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';


    commentCommonStr += '<div class="weui-cell weui-cell_switch " onclick=setHongbao() >';
    commentCommonStr += '<div class="weui-cell__bd">围观是否收费<span class="slogan"></span></div>';
    commentCommonStr += '<div class="weui-cell__ft">';
    commentCommonStr += '<label for="switchCP" class="weui-switch-cp">';
    commentCommonStr += '<input id="switchCP" class="weui-switch-cp__input"  name="switchCPWd"  type="checkbox">';
    commentCommonStr += '<div class="weui-switch-cp__box"></div>';
    commentCommonStr += '</label>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';

    commentCommonStr += '<div class="page-bd bg-white text-center disnone" id="hongbaofile2">';
    commentCommonStr += '<div class="weui-cell">';
    commentCommonStr += '<div class="weui-cell__hd" ><label  class="weui-label" style="text-align: left;padding-left: 0px;" >收费金额(元)</label></div>';
    commentCommonStr += '<div class="weui-cell__bd">';
    commentCommonStr += '<select class="weui-select" id="hongbaoMoney">'+localStorage.getItem("hongbaomoney")+'</select>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '<div class="weui-cell disnone" id="hongbaoshumu">';
    commentCommonStr += '<div class="weui-cell__hd" ><label class="weui-label" style="text-align: left;padding-left: 0px;" >红包数量</label></div>';
    commentCommonStr += '<div class="weui-cell__bd">';
    commentCommonStr += '<select class="weui-select" id="hongbaoNum">'+localStorage.getItem("hongbaonum")+'</select>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';


    commentCommonStr += '</div>';
    commentCommonStr += '<div id="recordaudionew"></div>';

    commentCommonStr += '<div class="page-bd-15 page-mypadding">';
    commentCommonStr += '<a href="javascript:;"  class="weui-btn weui-btn_primary mybtn" id="buttonSavecomment">提交</a>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div>';
    commentCommonStr += '</div></div>';

    $("body").append(commentCommonStr);

    $("input,select,textarea").blur(function(){
        setTimeout(function() {
            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
    });

    TagNav('#tagnavtop',{
        type: 'scrollToNext',
        curClassName: 'weui-state-active',
        index:0
    });

    setFileUpload();

    if(localStorage.getItem("isshipin") != '1'){
        if($("#radioComment").size() > 0){
            $("#radioComment").val("3");
        }else{
            $("body").append("<input type='hidden' id='radioComment' value='3' >");
        }
    }else{
        if($("#radioComment").size() > 0){
            $("#radioComment").val("1");
        }else{
            $("body").append("<input type='hidden' id='radioComment' value='1' >");
        }
    }

}

if($("#haveHdCommnet").size() > 0){
    haveHdCommnetContent();
}

function setHongbao(){
    var switchCPWd = $("input[name='switchCPWd']:checked").val();
    if(!switchCPWd){
        $("#hongbaofile2").hide();
        $("#switchCPWdFlag").val("0");
    }else{
        $("#hongbaofile2").show();
        $("#switchCPWdFlag").val("1");
    }
}


$(".weui-gallery").on("click", function(){
    $(".weui-gallery").fadeOut(100);
    $("#idFlag").remove();
    $("#xuhaoFlag").remove();
    $("#zongshuFlag").remove();
});

//动态ID,本图片ID,序号,总数
function gallerydisplay(id,xuhao,zongshu){
    if(eval(Math.sqrt((beginX-endX)*(beginX-endX)+(beginY-endY)*(beginY-endY)))> tochMove  ) {    return false;     }
    $(".weui-gallery__img").attr("class","weui-gallery__img");

    $(".weui-gallery__img").html('');
    //获取显示屏高度
     var heightClient = document.documentElement.clientHeight;
    $(".weui-gallery__img").append('<div style="display: flex;align-items: center;height: '+heightClient+'px;"><img  src="'+getRealPath($("#"+id+xuhao+""))+'" style="align-items: center;width: 100%;"/></div>');

    $(".weui-gallery__img").css("background-size","");

    if($("#idFlag").size() == 0){
        $("body").append("<input type='hidden' id='idFlag' value='"+id+"' >");
    }else{
        $("#idFlag").val(id);
    }
    if($("#xuhaoFlag").size() == 0){
        $("body").append("<input type='hidden' id='xuhaoFlag' value='"+xuhao+"' >");
    }else{
        $("#xuhaoFlag").val(xuhao);
    }
    if($("#zongshuFlag").size() == 0){
        $("body").append("<input type='hidden' id='zongshuFlag' value='"+zongshu+"' >");
    }else{
        $("#zongshuFlag").val(zongshu);
    }
    $(".weui-gallery__img").prepend('<div  style="color:white;text-align: center;width: 100%;position: fixed;left: 0px;right: 0px;top:0px;"><span style="color:white;text-align: center;">'+xuhao+'/'+zongshu+'</span></div>');

    if(imghl($("#"+id+xuhao+"")) == '2'){
        var datupath = getRealPath($("#"+id+xuhao+""));

        if(navigator.userAgent.indexOf("Html5Plus") > -1) {
            $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a   onclick=savePicture(\''+datupath+'\') >保存图片</a></div></div>');
            //console.log('------2');
            //$("#mingpianbaocun").attr("onclick","savePicture(\'"+qrImage2+"\')");
        }else{
            if(getIsAPPLE() ){
                //console.log('------5');
                //$("#mingpianbaocun").attr("href",checkPathHost(qrImage2,"1"));
                //$("#mingpianbaocun").attr("onclick","set();");
                $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a  href="'+datupath+'" onclick=set() >保存图片</a></div></div>');


            }else{
                //console.log('------6');
                //$("#mingpianbaocun").attr("onclick","tipwxshare();");
                $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a  onclick=tipwxshare() >保存图片</a></div></div>');

            }
        }


       /* if(getBrowser() == 'wxmobile'){
            if(getIsAPPLE() && wxxcx() != 'wxxcx' ){
                $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a download="'+getFileName(datupath)+'" href="'+datupath+'">查看长图或长按图片保存</a></div></div>');

            }else{
                $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a  href="'+datupath+'" target="_blank">查看长图或长按保存图片</a></div></div>');

            }

        }else if(getIsAPPLE() ){
            $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a download="'+getFileName(datupath)+'" href="'+datupath+'">查看长图或长按保存图片</a></div></div>');

        }else{
            $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a download="'+getFileName(datupath)+'" href="'+datupath+'">查看长图或保存图片</a></div></div>');

        }*/
    }else{
        var datupath = getRealPath($("#"+id+xuhao+""));
        /*if(getBrowser() == 'wxmobile'){
            if(getIsAPPLE()  && wxxcx() != 'wxxcx' ){
                $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a download="'+getFileName(datupath)+'" href="'+datupath+'">长按图片保存</a></div></div>');

            }else{
                $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a  href="'+datupath+'" target="_blank">保存图片</a></div></div>');

            }

        }else if(getIsAPPLE()){
            $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a download="'+getFileName(datupath)+'" href="'+datupath+'">长按保存图片</a></div></div>');

        }else{
            $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a download="'+getFileName(datupath)+'" href="'+datupath+'">保存图片</a></div></div>');

        }*/

        if(navigator.userAgent.indexOf("Html5Plus") > -1) {
            $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a   onclick=savePicture(\''+datupath+'\') >保存图片</a></div></div>');
            //console.log('------2');
            //$("#mingpianbaocun").attr("onclick","savePicture(\'"+qrImage2+"\')");
        }else{
            if(getIsAPPLE() ){
                //console.log('------5');
                //$("#mingpianbaocun").attr("href",checkPathHost(qrImage2,"1"));
                //$("#mingpianbaocun").attr("onclick","set();");
                $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a  href="'+datupath+'" onclick=set() >保存图片</a></div></div>');


            }else{
                //console.log('------6');
                //$("#mingpianbaocun").attr("onclick","tipwxshare();");
                $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a  onclick=tipwxshare() >保存图片</a></div></div>');

            }
        }
    }
    $(".weui-gallery").fadeIn(100);
    //$(".weui-gallery__img").attr("class","weui-gallery__img a-shake");
}

//动态ID,本图片ID,序号,总数
function gallerydisplayNext(id,xuhao,zongshu){
    $(".weui-gallery__img").html('');
    /*$(".weui-gallery__img").attr("style", $("#"+id+xuhao+"").attr("style"));*/
    //获取显示屏高度
    var heightClient = document.documentElement.clientHeight;
    $(".weui-gallery__img").append('<div style="display: flex;align-items: center;height: '+heightClient+'px;"><img  src="'+getRealPath($("#"+id+xuhao+""))+'" style="align-items: center;width: 100%;"/></div>');


    $(".weui-gallery__img").css("background-size","");
    if($("#idFlag").size() == 0){
        $("body").append("<input type='hidden' id='idFlag' value='"+id+"' >");
    }else{
        $("#idFlag").val(id);
    }
    if($("#xuhaoFlag").size() == 0){
        $("body").append("<input type='hidden' id='xuhaoFlag' value='"+xuhao+"' >");
    }else{
        $("#xuhaoFlag").val(xuhao);
    }
    if($("#zongshuFlag").size() == 0){
        $("body").append("<input type='hidden' id='zongshuFlag' value='"+zongshu+"' >");
    }else{
        $("#zongshuFlag").val(zongshu);
    }
    $(".weui-gallery__img").prepend('<div   style="color:white;text-align: center;width: 100%;"><span style="color:white;text-align: center;">'+xuhao+'/'+zongshu+'</span></div>');

    if(imghl($("#"+id+xuhao+"")) == '2'){
        var datupath = getRealPath($("#"+id+xuhao+""));



        if(navigator.userAgent.indexOf("Html5Plus") > -1) {
            $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a   onclick=savePicture(\''+datupath+'\') >保存图片</a></div></div>');
            //console.log('------2');
            //$("#mingpianbaocun").attr("onclick","savePicture(\'"+qrImage2+"\')");
        }else{
            if(getIsAPPLE()){
                //console.log('------5');
                //$("#mingpianbaocun").attr("href",checkPathHost(qrImage2,"1"));
                //$("#mingpianbaocun").attr("onclick","set();");
                //$(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a  href="'+datupath+'" onclick=set() >保存图片</a></div></div>');
                $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a  href="'+datupath+'" onclick=set() >保存图片</a></div></div>');


            }else{
                //console.log('------6');
                //$("#mingpianbaocun").attr("onclick","tipwxshare();");
                $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a  onclick=tipwxshare() >保存图片</a></div></div>');

            }
        }

        /*if(getBrowser() == 'wxmobile'){
            if(getIsAPPLE() && wxxcx() != 'wxxcx' ){
                $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a download="'+getFileName(datupath)+'" href="'+datupath+'">查看长图或长按图片保存</a></div></div>');

            }else{
                $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a  href="'+datupath+'" target="_blank">查看长图或长按保存图片</a></div></div>');

            }

        }else if(getIsAPPLE() ){
            $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a download="'+getFileName(datupath)+'" href="'+datupath+'">查看长图或长按保存图片</a></div></div>');

        }else{
            $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a download="'+getFileName(datupath)+'" href="'+datupath+'">查看长图或保存图片</a></div></div>');

        }*/
    }else{
        var datupath = getRealPath($("#"+id+xuhao+""));
        /*if(getBrowser() == 'wxmobile'){
            if(getIsAPPLE()  && wxxcx() != 'wxxcx' ){
                $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a download="'+getFileName(datupath)+'" href="'+datupath+'">长按图片保存</a></div></div>');

            }else{
                $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a  href="'+datupath+'" target="_blank">保存图片</a></div></div>');

            }

        }else if(getIsAPPLE()){
            $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a download="'+getFileName(datupath)+'" href="'+datupath+'">长按保存图片</a></div></div>');

        }else{
            $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a download="'+getFileName(datupath)+'" href="'+datupath+'">保存图片</a></div></div>');

        }*/


        if(navigator.userAgent.indexOf("Html5Plus") > -1) {
            $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a   onclick=savePicture(\''+datupath+'\') >保存图片</a></div></div>');

            //console.log('------2');
            //$("#mingpianbaocun").attr("onclick","savePicture(\'"+qrImage2+"\')");
        }else{
            if(getIsAPPLE()){
                //console.log('------5');
                //$("#mingpianbaocun").attr("href",checkPathHost(qrImage2,"1"));
                //$("#mingpianbaocun").attr("onclick","set();");
                //$(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a  href="'+datupath+'" onclick=set() >保存图片</a></div></div>');
                $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a  href="'+datupath+'" onclick=set() >保存图片</a></div></div>');


            }else{
                //console.log('------6');
                //$("#mingpianbaocun").attr("onclick","tipwxshare();");
                $(".weui-gallery__img").append('<div   style="color:white;text-align: center;width: 100%;"><div style="color:white;text-align: center;position: fixed;bottom: 20px;left: 0px;right: 0px;z-index: 9999;"><a  onclick=tipwxshare() >保存图片</a></div></div>');

            }
        }
    }

}

window.onload = function () {
    var touch = new Touch(document.getElementsByTagName("body"),50).init();

    //向左滑动触发事件
    touch.swipeLeft = function (dom) {
        //alert("左滑");
        if($("#xuhaoFlag").size() > 0){
            if(eval($("#xuhaoFlag").val()) < eval($("#zongshuFlag").val())){
                var id = $("#idFlag").val();
                var xuhao = eval($("#xuhaoFlag").val())+1;
                var zongshu = $("#zongshuFlag").val();
                $(".weui-gallery__img").attr("class","weui-gallery__img a-bounceinR");
                $(".weui-gallery").hide();
                $(".weui-gallery").show();

                gallerydisplayNext(id,xuhao,zongshu);


            }else{
                $(".weui-gallery").fadeOut(100);
                $("#idFlag").remove();
                $("#xuhaoFlag").remove();
                $("#zongshuFlag").remove();
            }
        }
    };

    //向右滑动事件
    touch.swipeRight = function (dom) {
        //alert("右滑");
        if($("#xuhaoFlag").size() > 0){
            if(eval($("#xuhaoFlag").val()) > 1){
                var id = $("#idFlag").val();
                var xuhao = eval($("#xuhaoFlag").val())-1;
                var zongshu = $("#zongshuFlag").val();
                $(".weui-gallery__img").attr("class","weui-gallery__img a-bounceinL");
                $(".weui-gallery").hide();
                $(".weui-gallery").show();
                gallerydisplayNext(id,xuhao,zongshu);

            }else{
                $(".weui-gallery").fadeOut(100);
                $("#idFlag").remove();
                $("#xuhaoFlag").remove();
                $("#zongshuFlag").remove();
            }
        }
    }

};

function Touch(dom,range) {
    this.init = function () {
        var that = this;
        for(var i = 0; i<dom.length; i++){
            (function (dom) {
                function touchstart(event) {
                    var e = event || window.event;
                    if(e.targetTouches.length === 1){
                        var startX = e.targetTouches[0].clientX,
                            startY = e.targetTouches[0].clientY;
                        function touchmove(e) {
                            var moveEndX = e.targetTouches[0].clientX,
                                moveEndY = e.targetTouches[0].clientY;
                            if((that.getAngle(startX,startY,moveEndX,moveEndY) >= 135 || that.getAngle(startX,startY,moveEndX,moveEndY) <= -135) && that.getRange(startX,startY,moveEndX,moveEndY) >= range){
                                that.swipeLeft(dom);
                                dom.removeEventListener("touchmove",touchmove);
                            }else if((that.getAngle(startX,startY,moveEndX,moveEndY) >= -45 && that.getAngle(startX,startY,moveEndX,moveEndY) <= 45)&& that.getRange(startX,startY,moveEndX,moveEndY) >= range){
                                that.swipeRight(dom);
                                dom.removeEventListener("touchmove",touchmove);
                            }
                        }

                        function touchend() {
                            dom.removeEventListener("touchend",touchend);
                            dom.removeEventListener("touchmove",touchmove);
                        }

                        dom.addEventListener("touchmove",touchmove);
                        dom.addEventListener("touchend",touchend);
                    }
                }

                dom.addEventListener("touchstart",touchstart);
            })(dom[i]);
        }

        return this;
    };

    //计算滑动的角度
    this.getAngle = function (px1, py1, px2, py2) {
        //两点的x、y值
        x = px2-px1;
        y = py2-py1;
        hypotenuse = Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2));
        //斜边长度
        cos = x/hypotenuse;
        radian = Math.acos(cos);
        //求出弧度
        angle = 180/(Math.PI/radian);
        //用弧度算出角度
        if (y<0) {
            angle = -angle;
        } else if ((y == 0) && (x<0)) {
            angle = 180;
        }
        return angle;
    };

    //计算两点之间的距离
    this.getRange = function (px1,py1,px2,py2) {
        return Math.sqrt(Math.pow(Math.abs(px1 - px2), 2) + Math.pow(Math.abs(py1 - py2), 2));
    };

    this.swipeLeft = function (dom) {};

    this.swipeRight = function (dom) {}
}




function getRealPath(obj) {

    var url=$(obj).css('background-image');
    //console.log("url1======"+url)
    if(url == null || url == 'null' || url == ''  || url == 'undefined'){
        return null;
    }else{
        url = url.substring(5,url.length-2);
       // console.log("url2======"+url)
        return url;
    }

}

/*获取图片尺寸比例-返回不同的显示样式*/
function imghl(obj){
    var url=$(obj).css('background-image');

    if(url == null || url == 'null' || url == ''  || url == 'undefined'){
        return null;
    }else{
        url = url.substring(5,url.length-2);
        var img_url = url;

        // 创建对象
        var img = new Image();

        // 改变图片的src
        img.src = img_url;
        var cl = '';
        var ratehl= img.height/img.width;

        if(ratehl > 1.5){
            cl = '2';//长方形
        }else{
            cl =  '1';//正方形
        }
        //console.log('0==='+cl)
        return cl;
    }

}

//打赏
var HTMLDASHANG = '<div class="page-bd" style="width:100%;text-align: center;">';
HTMLDASHANG += '<div id="" style="background-color: white;display:;width: 100%;margin-top: 100px;margin-bottom: 30px;margin-left:10%;text-align: center;width: 80%;">';

HTMLDASHANG += '<div class="weui-pay">';
HTMLDASHANG += '<ul class="weui-payselect-ul">';
HTMLDASHANG += '<li class="weui-payselect-li">';
HTMLDASHANG += '<a onclick=setDashangMoney("2") class="weui-payselect-a">2元</a>';
HTMLDASHANG += '</li>';
HTMLDASHANG += '<li class="weui-payselect-li">';
HTMLDASHANG += '<a onclick=setDashangMoney("5")  class="weui-payselect-a weui-payselect-on">5元</a>';
HTMLDASHANG += '</li>';
HTMLDASHANG += '<li class="weui-payselect-li">';
HTMLDASHANG += '<a onclick=setDashangMoney("10")  class="weui-payselect-a">10元</a>';
HTMLDASHANG += '</li>';
HTMLDASHANG += '<li class="weui-payselect-li">';
HTMLDASHANG += '<a onclick=setDashangMoney("50")  class="weui-payselect-a">50元</a>';
HTMLDASHANG += '</li>';
HTMLDASHANG += '<li class="weui-payselect-li">';
HTMLDASHANG += '<a onclick=setDashangMoney("100")  class="weui-payselect-a">100元</a>';
HTMLDASHANG += '</li>';
HTMLDASHANG += '<li class="weui-payselect-li">';
HTMLDASHANG += '<a onclick=setDashangMoney("200")  class="weui-payselect-a">200元</a>';
HTMLDASHANG += '</li>';
HTMLDASHANG += '</ul>';
HTMLDASHANG += '<p class="f12 f-gray" style="text-align: left;">说明:打赏有助于作者产出更多高质量内容</p>';

HTMLDASHANG += '</div>';
HTMLDASHANG += '<a href="javascript:dashangSelectPayWay();" class="weui-btn weui-btn_primary" id="dashangbutton" style="border-radius: 0px; ">打赏作者</a>';

HTMLDASHANG += '</div>';
HTMLDASHANG += '</div>';
HTMLDASHANG += '<input type="hidden" id="dashangmoney" value="5">';

function setDashangMoney(money){
    $("#dashangmoney").val(money);
    $("#orderMoney").val(money);
    var dashangType = $("#orderDashangType").val();
    $("#orderType").val(dashangType);

}

function dashangSelectPayWay(){
    var money = $("#dashangmoney").val();
    $("#orderMoney").val(money);
    var dashangType = $("#orderDashangType").val();
    $("#orderType").val(dashangType);
    paySelect();
}


function dashang(){//打赏

    if(localStorage.getItem('token') != null  && localStorage.getItem('token') != 'null'  && localStorage.getItem('token') != ''){
        //localStorage.setItem('advdate',getNowFormatDate());
        var div = document.createElement('div');
        div.id='dashang';
        div.style='position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;';
        div.innerHTML= HTMLDASHANG + '<p style="text-align:center;line-height:20px; color:#fff;margin:10px;padding:0px;" id="closeId" onclick=closediv("dashang"); ><i class="beauty icon-anniu_guanbi" style="font-size: 32px;" ></i></p>';
        document.body.appendChild(div);
        if($("#dashang").css("position") != 'fixed'){
            $("#dashang").attr("style","position: fixed; left:0; top:0; background: rgba(0,0,0,0.7); filter:alpha(opacity=70);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0; width: 100%; height:100%; z-index: 100;");
        }

        $(".weui-payselect-li").on('click',function(){
            $(this).children().addClass("weui-payselect-on");
            $(this).siblings().children().removeClass("weui-payselect-on");
            return false;
        })
    }else{
        isLogin('','');
    }

}


function zhifuSelectPayWay(){
    var orderNum = $("#payNum").val();
    $("#orderNum").val(orderNum);

    //console.log("1")
    //console.log("1")
    paySelect();
}


function zhifuSelectPayWayOnepage(){
    var orderNum = $("#payNum").val();
    $("#orderNum").val(orderNum);

    //console.log("1")
    //console.log("1")
    paySelect();
}


function zhifuSelectPayWayPro(){
    paySelectPro();
}

/*统一普通支付*/
if($("#havePay").size() > 0){
    var HAVEPAYSTR = '';
    HAVEPAYSTR += '<div id="halfSubOrder" class="weui-popup__container popup-bottom">';
    HAVEPAYSTR += '<div class="weui-popup__overlay"></div>';
    HAVEPAYSTR += '<div class="weui-popup__modal">';
    HAVEPAYSTR += '<div class="toolbar">';
    HAVEPAYSTR += '<div class="toolbar-inner" >';
    HAVEPAYSTR += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
    HAVEPAYSTR += '<h1 class="title" id="tijiaoxinxi">提交订单</h1>';
    HAVEPAYSTR += '</div>';
    HAVEPAYSTR += '</div>';
    HAVEPAYSTR += '<div class="modal-content">';
    HAVEPAYSTR += '<!--<div class="weui-cells__title">单选列表项</div>-->';
    HAVEPAYSTR += '<div class="weui-cells weui-cells_radio">';
    HAVEPAYSTR += '<label class="weui-cell weui-check__label" style="" id="data14" for="x11" onclick=setDisPriceTitle("1")>';
    HAVEPAYSTR += '<div class="weui-cell__bd" >';
    HAVEPAYSTR += '<p ><span id="data1"></span><span class="slogan" id="data11"></span></p>';
    HAVEPAYSTR += '</div>';
    HAVEPAYSTR += '<div class="weui-cell__ft">';
    HAVEPAYSTR += '<input class="weui-check" name="radiopay" value=""  id="x11" type="radio">';
    HAVEPAYSTR += '<span class="weui-icon-checked"></span>';
    HAVEPAYSTR += '</div>';
    HAVEPAYSTR += '</label>';
    HAVEPAYSTR += '<label class="weui-cell weui-check__label"   id="data15" for="x12" onclick=setDisPriceTitle("2")>';

    HAVEPAYSTR += '<div class="weui-cell__bd">';
    HAVEPAYSTR += '<p><span id="data2"></span><span id="data22" class="slogan"></span></p>';
    HAVEPAYSTR += '</div>';
    HAVEPAYSTR += '<div class="weui-cell__ft">';
    HAVEPAYSTR += '<input name="radiopay" value="" class="weui-check"  id="x12"  type="radio">';
    HAVEPAYSTR += '<span class="weui-icon-checked"></span>';
    HAVEPAYSTR += '</div>';
    HAVEPAYSTR += '</label>';
    HAVEPAYSTR += '<!-- <a href="javascript:void(0);" class="weui-cell weui-cell_link">';
    HAVEPAYSTR += '<div class="weui-cell__bd">添加更多</div>';
    HAVEPAYSTR += '</a>-->';
    HAVEPAYSTR += '</div>';

    if(curWwwPath.search("productdetail.html") != -1){
        HAVEPAYSTR += '<div class="weui-pay">';
        HAVEPAYSTR += '<div>';
        HAVEPAYSTR += '<div class="weui-panel__bd">';
        HAVEPAYSTR += '<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg" style="padding-left: 0px;">';
        HAVEPAYSTR += '<div class="weui-media-box__hd" style="width: 80px;height: 80px;">';
        HAVEPAYSTR += '<img class="weui-media-box__thumb" src="../../img/agent/head/head.png" id="tupian" alt="" style="width: 80px;height: 80px;">';
        HAVEPAYSTR += '</div>';
        HAVEPAYSTR += '<div class="weui-media-box__bd" style="height: 80px;">';
        HAVEPAYSTR += '<h4 class="weui-media-box__title" id="biaoti"></h4>';
        HAVEPAYSTR += '<p class="f12" style="color:#9E9E9E;" id="kucun"></p>';
        HAVEPAYSTR += '<p class="weui-pay-num disnone" style="font-size: large;color: red;text-align: left;" id="data61"></p>';
        HAVEPAYSTR += '<p class="weui-pay-num disnone" style="font-size: medium;color: red;text-align: left;" id="data62"></p>';

        HAVEPAYSTR += '</div>';
        HAVEPAYSTR += '</a>';
        HAVEPAYSTR += '</div>';
        HAVEPAYSTR += '</div>';
    }else{

        HAVEPAYSTR += '<p class="weui-pay-num disnone" id="data61"></p>';
        HAVEPAYSTR += '<p class="weui-pay-num disnone" id="data62"></p>';

    }





    HAVEPAYSTR += '<div id="shuxingall">';

    HAVEPAYSTR += '</div>';

    HAVEPAYSTR += '<div class="weui-cells__title disnone" id="zzfw" style="padding-left: 0px;">增值服务</div>';
    HAVEPAYSTR += '<div id="zengzhi">';


    HAVEPAYSTR += '</div>';
    /*HAVEPAYSTR += '</div>';*/





    HAVEPAYSTR += '</div>';
    HAVEPAYSTR += '<div class="weui-cell">';
    HAVEPAYSTR += '<div class="weui-cell__hd"></div>';
    HAVEPAYSTR += '<div class="weui-cell__bd">';
    HAVEPAYSTR += '<p  class="disnone"  id="data51"></p>';
    HAVEPAYSTR += '<p  class="disnone" id="data52"></p>';
    HAVEPAYSTR += '</div>';
    HAVEPAYSTR += '<div class="weui-cell__ft " id="zhifuNum">';
    HAVEPAYSTR += '<div class="weui-count">';
    HAVEPAYSTR += '<a class="weui-count__btn weui-count__decrease" onclick="downAdd();" ></a>';
    HAVEPAYSTR += '<span id="data13" >1</span>';
    HAVEPAYSTR += '<input id="payNum" type="hidden" value="1" />';
    HAVEPAYSTR += '<input id="data9" type="hidden" value="0" />';
    HAVEPAYSTR += '<input id="data10" type="hidden" value="0" />';
    HAVEPAYSTR += '<input id="dataAboutId1" type="hidden" value="" />';
    HAVEPAYSTR += '<input id="dataAboutId2" type="hidden" value="" />';
    HAVEPAYSTR += '<a class="weui-count__btn weui-count__increase" onclick="upAdd();"></a>&nbsp;';
    HAVEPAYSTR += '</div>';
    HAVEPAYSTR += '</div>';
    HAVEPAYSTR += '</div>';
/*
    HAVEPAYSTR += '<div style="text-align: center" id="data12" onclick=toRuHeZhuanQianDetail()><p class="slogan f-blue a-shake" style="text-decoration: underline;">成为会员价更优>></p></div>';
*/

    //HAVEPAYSTR += '<div class="page-bd-15 f-blue disnone" style="text-align: left;margin-bottom: 5px;"  id ="address" ><input type="hidden" id="orderAddress"><p class="" style="color: #3d4145;">收货地址:</p><span class="f14" id="addressdetail" style="color: #3d4145;"></span><span class="f14 f-green" style="margin-left: 5px;" id="updateaddress">修改地址</span></div>';
    HAVEPAYSTR += '<div class="page-bd-15 page-mypadding">';

    HAVEPAYSTR += '<a href="javascript:;" id="zhifu" class="weui-btn weui-btn_primary mybtn" onclick="zhifuSelectPayWay();">立即支付</a>';


    HAVEPAYSTR += '</div>';
    HAVEPAYSTR += '</div>';
    HAVEPAYSTR += '</div>';
    HAVEPAYSTR += '</div>';
    $("body").append(HAVEPAYSTR);



}



function start(id,src,text,startid,audioIcon){
    var urls = $("img[id^=audioIconA]");
    for(var i = 0;i < urls.length;i++){
        $("#"+urls[i].id+"").attr("src","../../img/agent/images/WechatIMG3.png");
    }
    if(1 == 1){//全部采用请求方式

        $("#"+text+"").html("播放加载中");
        var audio = document.getElementById(id);
        audio.src = src;
        //$("#"+id+"").attr("src",src);
        audio.load();
        //$("#"+audioIcon+"").attr("src","../../img/agent/images/IMG_2226.GIF");
        //audioIconA

        audio.loop = false; //歌曲循环
        src = src.replace(""+basehost+"","");
        //传输数据
        var dataUtils = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
            "url":src
        }
        //console.log(src)
        instancecomment({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sys/user/getVideoTime',
            data: dataUtils,
            cancelToken: sourcecomment.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
                if(rs.data.result != null){

                    var alltime = eval(rs.data.result);
                    console.log("开始了"+new Date().getTime());
                    audio.oncanplay = function () {
                        //alltime = audio.duration;
                        //console.log("1======="+audio.duration);
                        //console.log(document.getElementById(id).duration);
                        $("#"+text+"").html(timeToStr(alltime));
                        console.log("加载中"+new Date().getTime());
                    };


                    console.log("结束了"+new Date().getTime());
                    audio.onended = function(){//播放结束时
                        $("#"+audioIcon+"").attr("src","../../img/agent/images/WechatIMG3.png");
                        $("#"+text+"").html(timeToStr(alltime));
                    };

                    audio.ontimeupdate = function(){//播放时间改变时
                        var currentTime = audio.currentTime;
                        //console.log(currentTime);
                        if(alltime != 0 && currentTime != 0 &&  alltime-currentTime >= 0){
                            $("#"+text+"").html(timeToStr(alltime-currentTime));

                        }else{
                            $("#"+text+"").html(timeToStr(currentTime));
                        }
                        //console.log(timeToStr(alltime-currentTime));
                    };
                    if(audio !== null){
                        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
                        if(audio.paused){
                            audio.play();//audio.play();// 这个就是播放
                            $("#"+audioIcon+"").attr("src","../../img/agent/images/IMG_2226.GIF");
                            $("#"+startid+"").attr("onclick","stop(\'"+id+"\',\'"+src+"\',\'"+text+"\',\'"+startid+"\',\'"+audioIcon+"\')");

                        }else{
                            audio.pause();// 这个就是暂停
                            $("#"+audioIcon+"").attr("src","../../img/agent/images/WechatIMG3.png");
                        }
                    }
                }else{
                    console.log('播放异常！')
                }

            }else{
                console.log('播放异常！')
            }

        });

    }else{
        $("#"+text+"").html("播放加载中");
        var audio = document.getElementById(id);
        audio.src = src;
        audio.load();
        //$("#"+audioIcon+"").attr("src","../../img/agent/images/IMG_2226.GIF");

        audio.loop = false; //歌曲循环
        var alltime = 0;

        audio.oncanplay = function () {
            alltime = audio.duration;
            //console.log("1======="+audio.duration);
            //console.log(document.getElementById(id).duration);
            $("#"+text+"").html(timeToStr(alltime));
        };

        audio.onended = function(){//播放结束时
            $("#"+audioIcon+"").attr("src","../../img/agent/images/WechatIMG3.png");
            $("#"+text+"").html(timeToStr(alltime));
        };

        audio.ontimeupdate = function(){//播放时间改变时
            var currentTime = audio.currentTime;
            //console.log(currentTime);
            if(alltime != 0 && currentTime != 0 &&  alltime-currentTime >= 0){
                $("#"+text+"").html(timeToStr(alltime-currentTime));

            }else{
                $("#"+text+"").html(timeToStr(currentTime));
            }
            //console.log(timeToStr(alltime-currentTime));
        };
        if(audio!==null){
            //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
            if(audio.paused){
                audio.play();//audio.play();// 这个就是播放
                $("#"+audioIcon+"").attr("src","../../img/agent/images/IMG_2226.GIF");
                $("#"+startid+"").attr("onclick","stop(\'"+id+"\',\'"+src+"\',\'"+text+"\',\'"+startid+"\',\'"+audioIcon+"\')");

            }else{
                audio.pause();// 这个就是暂停
                $("#"+audioIcon+"").attr("src","../../img/agent/images/WechatIMG3.png");
            }
        }
    }


}

function stop(id,src,text,startid,audioIcon){
    var audio = document.getElementById(id);
    var urls = $("img[id^=audioIconA]");
    for(var i = 0;i < urls.length;i++){
        $("#"+urls[i].id+"").attr("src","../../img/agent/images/WechatIMG3.png");
    }
    if(audio!==null){
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        if(audio.paused){
            audio.play();//audio.play();// 这个就是播放
            $("#"+audioIcon+"").attr("src","../../img/agent/images/IMG_2226.GIF");
            $("#"+startid+"").attr("onclick","stop(\'"+id+"\',\'"+src+"\',\'"+text+"\',\'"+startid+"\',\'"+audioIcon+"\')");

        }else{
            audio.pause();// 这个就是暂停
            $("#"+audioIcon+"").attr("src","../../img/agent/images/WechatIMG3.png");
        }
    }
}


<!--提交申请-->
if($("#haveApply").size() > 0){
    var APPLYINFO = '';
    if(curWwwPath.search("myDaikuandetail") != -1 || curWwwPath.search("dcindex") != -1 || curWwwPath.search("myKadetail") != -1){
        APPLYINFO += '<div id="halfapply" class="weui-popup__container popup-bottom">';
        APPLYINFO += '<div class="weui-popup__overlay"></div>';
        APPLYINFO += '<div class="weui-popup__modal">';
        APPLYINFO += '<div class="toolbar">';
        APPLYINFO += '<div class="toolbar-inner">';
        APPLYINFO += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
        APPLYINFO += '<h1 class="title" >提交申请</h1>';
        APPLYINFO += '</div>';
        APPLYINFO += '</div>';
        APPLYINFO += '<div class="modal-content">';
        APPLYINFO += '<div class="weui-cells weui-cells_form">';
        APPLYINFO += '<div id="applydiv" style="text-align: center;font-size: 12px;color:gray;"><p id="applytext"></p></div>';
        APPLYINFO += '<div class="weui-cell">';
        APPLYINFO += '<div class="weui-cell__bd">';
        APPLYINFO += '<div class="weui-cell">';
        APPLYINFO += '<div class="weui-cell__hd"><label class="weui-label" >手机号</label></div>';
        APPLYINFO += '<div class="weui-cell__bd">';
        /*APPLYINFO += '<input class="weui-input" pattern="[0-9]*" id="applymobile" placeholder="请输入手机号" type="tel">';*/
        if(localStorage.getItem('applyone') == null || localStorage.getItem('applyone') == 'null' || localStorage.getItem('applyone') == ''){
            APPLYINFO += '<input class="weui-input" pattern="[0-9]*" id="applymobile" placeholder="请输入手机号" type="tel" style="" >';
        }else{
            APPLYINFO += '<input class="weui-input" style=" pattern="[0-9]*" id="applymobile" placeholder="请输入手机号" type="tel" value="'+localStorage.getItem('applyone')+'">';
        }
        APPLYINFO += '</div>';
        APPLYINFO += '</div>';
        APPLYINFO += '<div class="weui-cell">';
        APPLYINFO += '<div class="weui-cell__hd">';
        APPLYINFO += '<label class="weui-label" style="">姓名</label>';
        APPLYINFO += '</div>';
        APPLYINFO += '<div class="weui-cell__bd">';
        /*APPLYINFO += '<input class="weui-input" placeholder="请输入姓名" id="applycardname" type="text">';*/
        if(localStorage.getItem('applytwo') == null || localStorage.getItem('applytwo') == 'null' || localStorage.getItem('applytwo') == ''){
            APPLYINFO += '<input class="weui-input" placeholder="请输入姓名" id="applycardname" type="text" style="">';
        }else{
            APPLYINFO += '<input class="weui-input" style="" placeholder="请输入姓名" id="applycardname" type="text" value="'+localStorage.getItem('applytwo')+'">';
        }
        APPLYINFO += '</div>';

        APPLYINFO += '</div>';
        APPLYINFO += '<div class="weui-cell">';
        APPLYINFO += '<div class="weui-cell__hd">';
        APPLYINFO += '<label class="weui-label" style="">身份证号</label>';
        APPLYINFO += '</div>';
        APPLYINFO += '<div class="weui-cell__bd">';
        /* APPLYINFO += '<input class="weui-input" placeholder="请输入身份证号" id="applycardnum"  type="text" >';*/
        if(localStorage.getItem('applythree') == null || localStorage.getItem('applythree') == 'null' || localStorage.getItem('applythree') == ''){
            APPLYINFO += '<input class="weui-input" placeholder="请输入身份证号" id="applycardnum"  type="text" style="">';
        }else{
            APPLYINFO += '<input class="weui-input" style="" placeholder="请输入身份证号" id="applycardnum"  type="text" value="'+localStorage.getItem('applythree')+'">';
        }
        APPLYINFO += '</div>';
    }else{
        APPLYINFO += '<div id="halfapply" class="weui-popup__container popup-bottom">';
        APPLYINFO += '<div class="weui-popup__overlay"></div>';
        APPLYINFO += '<div class="weui-popup__modal">';
        APPLYINFO += '<div class="toolbar">';
        APPLYINFO += '<div class="toolbar-inner">';
        APPLYINFO += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
        APPLYINFO += '<h1 class="title" >提交申请</h1>';
        APPLYINFO += '</div>';
        APPLYINFO += '</div>';
        APPLYINFO += '<div class="modal-content">';
        APPLYINFO += '<div class="weui-cells weui-cells_form">';
        APPLYINFO += '<div id="applydiv" style="text-align: center;font-size: 12px;color:gray;"><p id="applytext"></p></div>';
        APPLYINFO += '<div class="weui-cell">';
        APPLYINFO += '<div class="weui-cell__bd">';
        APPLYINFO += '<div class="weui-cell">';
        APPLYINFO += '<div class="weui-cell__hd"><label class="weui-label" >手机号</label></div>';
        APPLYINFO += '<div class="weui-cell__bd">';
        /*APPLYINFO += '<input class="weui-input" pattern="[0-9]*" id="applymobile" placeholder="请输入手机号" type="tel">';*/
        if(localStorage.getItem('applyone') == null || localStorage.getItem('applyone') == 'null' || localStorage.getItem('applyone') == ''){
            APPLYINFO += '<input class="weui-input" pattern="[0-9]*" id="applymobile" placeholder="请输入手机号" type="tel"  >';
        }else{
            APPLYINFO += '<input class="weui-input"  pattern="[0-9]*" id="applymobile" placeholder="请输入手机号" type="tel" value="'+localStorage.getItem('applyone')+'">';
        }
        APPLYINFO += '</div>';
        APPLYINFO += '</div>';
        APPLYINFO += '<div class="weui-cell">';
        APPLYINFO += '<div class="weui-cell__hd">';
        APPLYINFO += '<label class="weui-label" >姓名</label>';
        APPLYINFO += '</div>';
        APPLYINFO += '<div class="weui-cell__bd">';
        /*APPLYINFO += '<input class="weui-input" placeholder="请输入姓名" id="applycardname" type="text">';*/
        if(localStorage.getItem('applytwo') == null || localStorage.getItem('applytwo') == 'null' || localStorage.getItem('applytwo') == ''){
            APPLYINFO += '<input class="weui-input" placeholder="请输入姓名" id="applycardname" type="text" >';
        }else{
            APPLYINFO += '<input class="weui-input"  placeholder="请输入姓名" id="applycardname" type="text" value="'+localStorage.getItem('applytwo')+'">';
        }
        APPLYINFO += '</div>';

        APPLYINFO += '</div>';
        APPLYINFO += '<div class="weui-cell">';
        APPLYINFO += '<div class="weui-cell__hd">';
        APPLYINFO += '<label class="weui-label" >身份证号</label>';
        APPLYINFO += '</div>';
        APPLYINFO += '<div class="weui-cell__bd">';
        /* APPLYINFO += '<input class="weui-input" placeholder="请输入身份证号" id="applycardnum"  type="text" >';*/
        if(localStorage.getItem('applythree') == null || localStorage.getItem('applythree') == 'null' || localStorage.getItem('applythree') == ''){
            APPLYINFO += '<input class="weui-input" placeholder="请输入身份证号" id="applycardnum"  type="text" >';
        }else{
            APPLYINFO += '<input class="weui-input"  placeholder="请输入身份证号" id="applycardnum"  type="text" value="'+localStorage.getItem('applythree')+'">';
        }
        APPLYINFO += '</div>';
    }






    APPLYINFO += '</div>';
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree">';
    APPLYINFO += '<input id="weuiAgree" type="checkbox"  name="weuiAgree" checked class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="zhucexieyi.html">《用户服务协议》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree" style="">';
    APPLYINFO += '<input id="weuiAgreeData" type="checkbox" name="weuiAgreeData" checked class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree" style="">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="baoxianxieyi.html">《赠险领取说明及保障条款》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';



    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="page-bd-15 page-mypadding">';
    APPLYINFO += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick="saveNRApplyInfo();">提交</a>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    $("body").append(APPLYINFO);
}

<!--提交申请-->
function lxapply() {


}


if($("#haveApplyLx").size() > 0){
    var APPLYINFO = '';
    if(curWwwPath.search("myDaikuandetail") != -1 || curWwwPath.search("dcindex") != -1 || curWwwPath.search("myKadetail") != -1 || curWwwPath.search("kadetail") != -1){
        APPLYINFO += '<div id="halfapplylx" class="weui-popup__container popup-bottom">';
        APPLYINFO += '<div class="weui-popup__overlay"></div>';
        APPLYINFO += '<div class="weui-popup__modal">';
        APPLYINFO += '<div class="toolbar">';
        APPLYINFO += '<div class="toolbar-inner">';
        APPLYINFO += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
        APPLYINFO += '<h1 class="title" >提交报单</h1>';
        APPLYINFO += '</div>';
        APPLYINFO += '</div>';
        APPLYINFO += '<div class="modal-content">';
        APPLYINFO += '<div class="weui-cells weui-cells_form">';
        APPLYINFO += '<div id="applydiv" style="text-align: center;font-size: 12px;color:gray;"><p id="applytext"></p></div>';
        APPLYINFO += '<div class="weui-cell">';
        APPLYINFO += '<div class="weui-cell__bd">';
        APPLYINFO += '<div class="weui-cell">';
        APPLYINFO += '<div class="weui-cell__hd"><label class="weui-label" style="">手机号</label></div>';
        APPLYINFO += '<div class="weui-cell__bd">';
        /*APPLYINFO += '<input class="weui-input" pattern="[0-9]*" id="applymobile" placeholder="请输入手机号" type="tel">';*/
        if(localStorage.getItem('applyone') == null || localStorage.getItem('applyone') == 'null' || localStorage.getItem('applyone') == ''){
            APPLYINFO += '<input class="weui-input" pattern="[0-9]*" id="applymobile" placeholder="请输入手机号" type="tel" style="" >';
        }else{
            APPLYINFO += '<input class="weui-input" style="" pattern="[0-9]*" id="applymobile" placeholder="请输入手机号" type="tel" value="'+localStorage.getItem('applyone')+'">';
        }
        APPLYINFO += '</div>';
        APPLYINFO += '</div>';
        APPLYINFO += '<div class="weui-cell">';
        APPLYINFO += '<div class="weui-cell__hd">';
        APPLYINFO += '<label class="weui-label" style="">姓名</label>';
        APPLYINFO += '</div>';
        APPLYINFO += '<div class="weui-cell__bd">';
        /*APPLYINFO += '<input class="weui-input" placeholder="请输入姓名" id="applycardname" type="text">';*/
        if(localStorage.getItem('applytwo') == null || localStorage.getItem('applytwo') == 'null' || localStorage.getItem('applytwo') == ''){
            APPLYINFO += '<input class="weui-input" placeholder="请输入姓名" id="applycardname" type="text" style="">';
        }else{
            APPLYINFO += '<input class="weui-input" style="" placeholder="请输入姓名" id="applycardname" type="text" value="'+localStorage.getItem('applytwo')+'">';
        }
        APPLYINFO += '</div>';

        APPLYINFO += '</div>';



        /*APPLYINFO += '<div class="weui-cell">';
        APPLYINFO += '<div class="weui-cell__hd">';
        APPLYINFO += '<label class="weui-label" style="" id="sfzxx">身份证号</label>';
        APPLYINFO += '</div>';




        APPLYINFO += '<div class="weui-cell__bd">';
        /!* APPLYINFO += '<input class="weui-input" placeholder="请输入身份证号" id="applycardnum"  type="text" >';*!/
        if(localStorage.getItem('applythree') == null || localStorage.getItem('applythree') == 'null' || localStorage.getItem('applythree') == ''){
            APPLYINFO += '<input class="weui-input" placeholder="请输入身份证号" id="applycardnum"  type="text" style="">';
        }else{
            APPLYINFO += '<input class="weui-input" style="" placeholder="请输入身份证号" id="applycardnum"  type="text" value="">';
        }
        APPLYINFO += '</div>';*/

        APPLYINFO += '<div class="weui-cell" id="sfzdis">';
        APPLYINFO += '<div class="weui-cell__hd">';
        APPLYINFO += '<label class="weui-label" style="" id="sfzxx">身份证号</label>';
        APPLYINFO += '</div>';
        APPLYINFO += '<div class="weui-cell__bd">';
        APPLYINFO += '<input class="applycardnum weui-input" placeholder="请输入身份证号" id="applycardnum"  type="text" >';
        APPLYINFO += '</div>';
        APPLYINFO += '</div>';






    }else{
        APPLYINFO += '<div id="halfapplylx" class="weui-popup__container popup-bottom">';
        APPLYINFO += '<div class="weui-popup__overlay"></div>';
        APPLYINFO += '<div class="weui-popup__modal">';
        APPLYINFO += '<div class="toolbar">';
        APPLYINFO += '<div class="toolbar-inner">';
        APPLYINFO += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
        APPLYINFO += '<h1 class="title" >提交报单</h1>';
        APPLYINFO += '</div>';
        APPLYINFO += '</div>';
        APPLYINFO += '<div class="modal-content">';
        APPLYINFO += '<div class="weui-cells weui-cells_form">';
        APPLYINFO += '<div id="applydiv" style="text-align: center;font-size: 12px;color:gray;"><p id="applytext"></p></div>';
        APPLYINFO += '<div class="weui-cell">';
        APPLYINFO += '<div class="weui-cell__bd">';
        APPLYINFO += '<div class="weui-cell">';
        APPLYINFO += '<div class="weui-cell__hd"><label class="weui-label" style="">手机号</label></div>';
        APPLYINFO += '<div class="weui-cell__bd">';
        /*APPLYINFO += '<input class="weui-input" pattern="[0-9]*" id="applymobile" placeholder="请输入手机号" type="tel">';*/
        if(localStorage.getItem('applyone') == null || localStorage.getItem('applyone') == 'null' || localStorage.getItem('applyone') == ''){
            APPLYINFO += '<input class="weui-input" pattern="[0-9]*" id="applymobile" placeholder="请输入手机号" type="tel" style="" >';
        }else{
            APPLYINFO += '<input class="weui-input" style="" pattern="[0-9]*" id="applymobile" placeholder="请输入手机号" type="tel" value="'+localStorage.getItem('applyone')+'">';
        }
        APPLYINFO += '</div>';
        APPLYINFO += '</div>';
        APPLYINFO += '<div class="weui-cell">';
        APPLYINFO += '<div class="weui-cell__hd">';
        APPLYINFO += '<label class="weui-label" style="">姓名</label>';
        APPLYINFO += '</div>';
        APPLYINFO += '<div class="weui-cell__bd">';
        /*APPLYINFO += '<input class="weui-input" placeholder="请输入姓名" id="applycardname" type="text">';*/
        if(localStorage.getItem('applytwo') == null || localStorage.getItem('applytwo') == 'null' || localStorage.getItem('applytwo') == ''){
            APPLYINFO += '<input class="weui-input" placeholder="请输入姓名" id="applycardname" type="text" style="">';
        }else{
            APPLYINFO += '<input class="weui-input" style="" placeholder="请输入姓名" id="applycardname" type="text" value="'+localStorage.getItem('applytwo')+'">';
        }
        APPLYINFO += '</div>';

        APPLYINFO += '</div>';

        APPLYINFO += '<div class="weui-cell" id="sfzdis">';
        APPLYINFO += '<div class="weui-cell__hd">';
        APPLYINFO += '<label class="weui-label" style="" id="sfzxx">身份证号</label>';
        APPLYINFO += '</div>';
        APPLYINFO += '<div class="weui-cell__bd">';
        APPLYINFO += '<input class="applycardnum weui-input" placeholder="请输入身份证号" id="applycardnum"  type="text" >';
        APPLYINFO += '</div>';
        APPLYINFO += '</div>';


    }








    APPLYINFO += '<div class="weui-cell" id="jietu1">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label" style="" id="tuone">截图一</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<div class="weui-uploader__bd" style="width: 200px;">';
    APPLYINFO += '<ul class="weui-uploader__files" id="uploaderFilesA1">';

    APPLYINFO += '</ul>';
    APPLYINFO += '<div class="weui-uploader__input-box">';
    APPLYINFO += '<input id="uploaderInputA1" class="weui-uploader__input" type="file" accept="image/*,video/*" multiple=""  onchange="">';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';

    APPLYINFO += '</div>';



    APPLYINFO += '<div class="weui-cell" id="jietu2">';
    APPLYINFO += '<div class="weui-cell__hd">';

    APPLYINFO += '<label class="weui-label" style="" id="tutwo">截图二</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<div class="weui-uploader__bd" style="width: 200px;">';
    APPLYINFO += '<ul class="weui-uploader__files" id="uploaderFilesB1">';

    APPLYINFO += '</ul>';
    APPLYINFO += '<div class="weui-uploader__input-box">';
    APPLYINFO += '<input id="uploaderInputB1" class="weui-uploader__input" type="file" accept="image/*" multiple=""  onchange="">';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';

    APPLYINFO += '<div class="weui-cell" id="jietu3">';
    APPLYINFO += '<div class="weui-cell__hd" >';
    APPLYINFO += '<label class="weui-label" style="" id="tuthree">截图三</label>';

    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<div class="weui-uploader__bd" style="width: 200px;">';
    APPLYINFO += '<ul class="weui-uploader__files" id="uploaderFilesC1">';

    APPLYINFO += '</ul>';
    APPLYINFO += '<div class="weui-uploader__input-box">';
    APPLYINFO += '<input id="uploaderInputC1" class="weui-uploader__input" type="file" accept="image/*" multiple=""  onchange="">';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';


    APPLYINFO += '<div class="weui-cell" id="jietu4">';
    APPLYINFO += '<div class="weui-cell__hd" >';
    APPLYINFO += '<label class="weui-label" style="" id="tufour">截图四</label>';

    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<div class="weui-uploader__bd" style="width: 200px;">';
    APPLYINFO += '<ul class="weui-uploader__files" id="uploaderFilesD1">';

    APPLYINFO += '</ul>';
    APPLYINFO += '<div class="weui-uploader__input-box">';
    APPLYINFO += '<input id="uploaderInputD1" class="weui-uploader__input" type="file" accept="image/*" multiple=""  onchange="">';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';



    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree">';
    APPLYINFO += '<input id="weuiAgree" type="checkbox"  name="weuiAgree" checked class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="zhucexieyi.html">《用户服务协议》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree"  style="">';
    APPLYINFO += '<input id="weuiAgreeData" type="checkbox" name="weuiAgreeData" checked class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree"  style="">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="baoxianxieyi.html">《赠险领取说明及保障条款》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';



    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="page-bd-15 page-mypadding">';
    APPLYINFO += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick="saveNRApplyInfo();">提交</a>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    $("body").append(APPLYINFO);
}






function getAddress() {
    var token = localStorage.getItem("token");

    //传输数据
    var dataaddress = {
        "token":token,
        "pageSize":1,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":0
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gw/address/address/list',
        data: dataaddress,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            if(rs.data.code == '0'){
                if(rs.data.result.length == 0){
                    $("#address").show();
                    $("#updateaddress").html("新增收货地址");
                    $("#updateaddress").css("margin-left","0px");
                    $("#updateaddress").attr("onclick","toAddAddressgw()");
                    $("#address").attr("onclick","toAddAddressgw()");
                }else{
                    $.each(rs.data.result,function(i,item){

                        if(item.id != null){
                            $("#address").show();
                            $("#addressdetail").html(item.addressName +"-"+item.addressMobile + "-"+item.addressSheng+"/"+item.addressShi+"/"+item.addressQu+"/"+item.addressDetail);
                            $("#orderAddress").val(item.id);
                            $("#updateaddress").attr("onclick","toUpdateAddress()");
                            $("#address").attr("onclick","toUpdateAddressgw()");

                        }else{
                            $("#address").show();
                            $("#updateaddress").html("新增收货地址");
                            $("#updateaddress").css("margin-left","0px");
                            $("#updateaddress").attr("onclick","toAddAddressgw()");
                            $("#address").attr("onclick","toAddAddressgw()");
                        }

                    });
                }


            }else{

            }
        }else{
            console.log('listaddress请求异常！')
        }
    });
}

function toUpdateAddress() {
    toAddressList("&url="+encodeURI(window.location.href),"2");
}

function toAddAddress() {
    toAddressDetail("&url="+encodeURI(window.location.href),"2");
}



function toUpdateAddressgw() {
    toAddressList("&url="+encodeURI(window.location.href),"2");
}

function toAddAddressgw() {
    toAddressDetail("&url="+encodeURI(window.location.href),"2");
}
function getWxxcxPay(obj) {
    var token = localStorage.getItem("token");

    //传输数据


    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/wxpay/aappPay',
        data: obj,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            if(rs.data.code == '0'){
                var returnUrl = window.location.href;
                var data = rs.data.data;
                //点击微信支付后，调取统一下单接口生成微信小程序支付需要的支付参数
                var params = '?timestamp='+data.timeStamp+'&nonceStr='+data.nonceStr
                    +'&package='+data.package+'&signType='+data.signType
                    +'&paySign='+data.paySign+'&orderId='+data.orderId+'&returnUrl='+encodeURI(returnUrl);
                //定义path 与小程序的支付页面的路径相对应
                var path = '/pages/wxpay/wxpay'+params;
                //通过JSSDK的api使小程序跳转到指定的小程序页面
                wx.miniProgram.navigateTo({url: path});

            }else{

            }
        }else{
            console.log('listaddress请求异常！')
        }
    });
}

//$('body').css("pointer-events","none");
/*

$('body').on('touchstart',function(e) {
    $('body').css("pointer-events","none");
    //console.log('=========================开始')

});

$('body').on('touchend',function(e) {
    $('body').css("pointer-events","");
    //console.log('=========================结束')

});*/


//会员列表
//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染
function huiyaun(renderId,renderType,obj,shuzi){
    $("#"+renderId+"").hide();
    //参数-manyType--需要手动处理对应字段
    var advType = renderType;
    //var pageNo = $("#listmemberPageNo").val();

    //传输数据
    var dataadv = {
        "pageSize":12,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId()
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/zq/huiyuan/huiYuan/list',
        data: dataadv,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            huiyuanRender(rs.data,renderId,renderType,obj,shuzi);
        }else{
            console.log('请求异常！')
        }
    });

}




function fuzhu(renderId,renderType,obj,shuzi,mediaType){
    $("#"+renderId+"").hide();
    //参数-manyType--需要手动处理对应字段
    var advType = renderType;
    var pageNo = $("#listadvPageNo").val();

    //传输数据
    var dataadv = {
        "pageSize":20,
        "mediaType":mediaType,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/media/media/list',
        data: dataadv,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            fuzhuRender(rs.data,renderId,renderType,obj,shuzi);
        }else{
            console.log('请求异常！')
        }
    });

}

function laxinlist(renderId,renderType,obj,shuzi,url,pageSize){
    $("#"+renderId+"").hide();
    //参数-manyType--需要手动处理对应字段
    var advType = renderType;
    var pageNo = $("#listadvPageNo").val();

    //传输数据
    var dataadv = {
        "pageSize":pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: dataadv,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            laxinRender(rs.data,renderId,renderType,obj,shuzi);
        }else{
            console.log('请求异常！')
        }
    });

}
//bangka类型
function laxinlist2(renderId,renderType,obj,shuzi,url,pageSize,bangka){
    $("#"+renderId+"").hide();
    //参数-manyType--需要手动处理对应字段
    var advType = renderType;
    var pageNo = $("#listadvPageNo").val();

    //传输数据
    var dataadv = {
        "pageSize":pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "bangka":bangka,
        "pageNo":pageNo
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: dataadv,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            laxinRender(rs.data,renderId,renderType,obj,shuzi);
        }else{
            console.log('请求异常！')
        }
    });

}
//ka_type类型
function laxinlist3(renderId,renderType,obj,shuzi,url,pageSize,kaType){
    $("#"+renderId+"").hide();
    //参数-manyType--需要手动处理对应字段
    var advType = renderType;
    var pageNo = 1;

    //传输数据
    var dataadv = {
        "pageSize":pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "kaType":kaType,
        "pageNo":pageNo
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: dataadv,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            laxinRender(rs.data,renderId,renderType,obj,shuzi);
        }else{
            console.log('请求异常！')
        }
    });

}
//all类型-分页
function laxinlist4(renderId,renderType,obj,shuzi,url,pageSize){
    //$("#"+renderId+"").hide();
    //参数-manyType--需要手动处理对应字段
    var advType = renderType;
    //分页
    var pageNoTemp = $("#listlaxin"+renderId+"PageNo").val();
    if(pageNoTemp > 0){
        $("#listlaxin"+renderId+"PageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listlaxin"+renderId+"PageNo' value='1' >");
    }
    var pageNo = $("#listlaxin"+renderId+"PageNo").val();

    //传输数据
    var dataadv = {
        "pageSize":pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: dataadv,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            laxinRender4(rs.data,renderId,renderType,obj,shuzi);
        }else{
            console.log('请求异常！')
        }
    });

}
//系列类型
function laxinlist5(renderId,renderType,obj,shuzi,url,pageSize){
    $("#"+renderId+"").hide();
    //参数-manyType--需要手动处理对应字段
    var advType = renderType;

    var pageNo = 1;

    //传输数据
    var dataadv = {
        "pageSize":pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: dataadv,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            laxinRender5(rs.data,renderId,renderType,obj,shuzi);
        }else{
            console.log('请求异常！')
        }
    });

}
//场景类型
function laxinlist6(renderId,renderType,obj,shuzi,url,pageSize){
    $("#"+renderId+"").hide();
    //参数-manyType--需要手动处理对应字段
    var advType = renderType;
    //分页
    var pageNo = 1;

    //传输数据
    var dataadv = {
        "pageSize":pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: dataadv,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            laxinRender6(rs.data,renderId,renderType,obj,shuzi);
        }else{
            console.log('请求异常！')
        }
    });

}
//微信辅助注册类型
function laxinlist7(renderId,renderType,obj,shuzi,url,pageSize){
    $("#"+renderId+"").hide();
    //参数-manyType--需要手动处理对应字段
    var advType = renderType;
    //分页
    var pageNo = 1;

    //传输数据
    var dataadv = {
        "pageSize":pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: dataadv,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            laxinRender7(rs.data,renderId,renderType,obj,shuzi);
        }else{
            console.log('请求异常！')
        }
    });

}

function zhuantilist8(renderId,renderType,obj,shuzi,url,pageSize){
    $("#"+renderId+"").hide();
    //参数-manyType--需要手动处理对应字段
    var advType = renderType;

    var pageNo = 1;

    //传输数据
    var dataadv = {
        "pageSize":pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo
    }

    instancecomment({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: dataadv,
        cancelToken: sourcecomment.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            zhuantiRender8(rs.data,renderId,renderType,obj,shuzi);
        }else{
            console.log('请求异常！')
        }
    });

}

function setonehuiyuan(orderMoney,orderTitle,orderAboutid) {

    $("#orderMoney").val(orderMoney);
    $("#orderTitle").val(orderTitle);
    $("#shareTitle").val(orderTitle);
    $("#orderAboutid").val(orderAboutid);
    $("#id").val(orderAboutid);
    $("#paymoney").html(orderMoney);

    var urls = $("div[id^=onepagea]");
    var flagone = "onepagea"+orderAboutid;
    //console.log(flagone);
    //console.log(urls.length);
    for(var i = 0;i < urls.length;i++){
        //console.log(urls[i].id);
        if(urls[i].id == flagone){
            $("#"+urls[i].id+"").css("border","1px solid red");
        }else{
            $("#"+urls[i].id+"").css("border","1px solid #d8d8d8");
        }
    }

    var urls2 = $("div[id^=onepageb]");
    var flagtwo = "onepageb"+orderAboutid;
    for(var j = 0;j < urls2.length;j++){
        if(urls2[j].id == flagtwo){
            $("#"+urls2[j].id+"").attr("class","");
            $("#"+urls2[j].id+"").css("background-color","red");
        }else{
            $("#"+urls2[j].id+"").attr("class","bgzhuti");
        }
    }
    
}


//列表渲染
function huiyuanRender(data,renderId,renderType,obj,shuzi){
    if(data.code == '0'){
        if(renderType == 'onepage'){
            var str1 = '';
            /* str1 += '<div class="swiper-container disnone" id="swiper-container'+renderType+'">';
             str1 += '<div class="swiper-wrapper">';*/
            //str1 += '<div  class="weui-grids grids-small"  >';
            $.each(data.result,function(i,item){


                str1 += '<a onclick=setonehuiyuan("' + item.huiyuanPrice + '","' + item.huiyuanTitle + '","' + item.id + '") class="grid" style="margin-bottom: 10px;width: 50%">';


                if(i == data.result.length - 1){
                    str1 += '<div id="onepagea'+item.id+'"  class="shadowonly" style="text-align: center;border:1px solid red;background-color:white ;border-radius: 10px;">';
                    str1 += '<div id="onepageb'+item.id+'"  style="background-color:red;color: white;border-top-left-radius: 10px;border-top-right-radius: 10px;">'+setNULL(item.huiyuanTitle)+'</div>';
                    setonehuiyuan(item.huiyuanPrice,item.huiyuanTitle,item.id);
                }else{
                    str1 += '<div id="onepagea'+item.id+'"   class="shadowonly" style="text-align: center;border:1px solid white;background-color:white ;border-radius: 10px;">';
                    str1 += '<div id="onepageb'+item.id+'"  class="bgzhuti" style="color: white;border-top-left-radius: 10px;border-top-right-radius: 10px;">'+setNULL(item.huiyuanTitle)+'</div>';
                }

                str1 += '<div style="color: black;font-size: larger;">'+setNULL(item.huiyuanSharetitle)+'</div>';
                str1 += '<div style="color: red;font-size: x-large;"><span style="font-size: xx-small;">￥</span>'+setNULL(item.huiyuanPrice)+'</div>';
                str1 += '<div style="color: gray;text-decoration:line-through;font-size: x-small;">原价'+setNULL(item.yuanjia)+'元</div>';





                str1 += '</div>';


                str1 += '</a>';

            });
            //str1 += '</div>';
            /*  str1 += '</div>';*/

            /*str1 += '<div class="swiper-pagination disnone" id="swiper-pagination'+renderType+'"></div>';
            str1 += '</div>';*/

            if(data.result.length == 0){
                $.toast.prototype.defaults.duration=2000;$.toast("没有更多了","text");
            }


            if(renderType == '1'){
                $("#"+renderId+"").append(str1);
            }else{
                $("#"+renderId+"").html(str1);
            }
            $(".weui-toast").hide();

            //lunbotu(obj,renderType,shuzi);
            $("#"+renderId+"").show();
            //$("#swiper-container"+renderType+"").show();
            //$("#swiper-pagination"+renderType+"").show();


        }else{
            var str1 = '';
            /* str1 += '<div class="swiper-container disnone" id="swiper-container'+renderType+'">';
             str1 += '<div class="swiper-wrapper">';*/
            $.each(data.result,function(i,item){
                str1 += '<div class="swiper-slide" >';

                str1 += '<a onclick=toHuiYuanDetail("' + item.id + '","1")>';

                if(item.huiyuanImage.search('.json') != -1){
                    str1 += '<lottie-player src="'+checkPath(item.huiyuanImage,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                }else{
                    if(obj == '2'){
                        str1 += '<img class="maxh2 shadowonly" style="border-radius: 5px;"  src="'+ checkPath(item.huiyuanImage,'1')+'">';
                    }else{
                        str1 += '<img class="maxh2 shadowonly"  src="'+ checkPath(item.huiyuanImage,'1')+'">';
                    }

                }

                str1 += '</a>';
                str1 += '</div>';
            });
            /*  str1 += '</div>';*/

            /*str1 += '<div class="swiper-pagination disnone" id="swiper-pagination'+renderType+'"></div>';
            str1 += '</div>';*/

            $("#"+renderId+"").html(str1);
            lunbotu(obj,renderId,shuzi);
            $("#"+renderId+"").show();
            $("#swiper-container"+renderId+"").show();
            $("#swiper-pagination"+renderId+"").show();
        }

    }else{
        $.toast(data.msg, "text");
    }
}
function fuzhuRender(data,renderId,renderType,obj,shuzi){
    if(data.code == '0'){
        var str1 = '';
        /* str1 += '<div class="swiper-container disnone" id="swiper-container'+renderType+'">';
         str1 += '<div class="swiper-wrapper">';*/
        $.each(data.result,function(i,item){
            str1 += '<div class="swiper-slide">';

            str1 += '<a onclick=toMediaDetailNew("' + item.id + '","1")>';

            if(item.mediaFile.search('.json') != -1){
                str1 += '<lottie-player src="'+checkPath(item.mediaFile,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
            }else{
                str1 += '<img class="maxh shadowonly"  src="'+ checkPath(item.mediaFile,'1')+'">';
            }

            str1 += '</a>';
            str1 += '</div>';
        });
        /*  str1 += '</div>';*/

        /*str1 += '<div class="swiper-pagination disnone" id="swiper-pagination'+renderType+'"></div>';
        str1 += '</div>';*/

        $("#"+renderId+"").html(str1);
        lunbotu(obj,renderId,shuzi);
        $("#"+renderId+"").show();
        $("#swiper-container"+renderId+"").show();
        $("#swiper-pagination"+renderId+"").show();
    }else{
        $.toast(data.msg, "text");
    }
}

function laxinRender(data,renderId,renderType,obj,shuzi){
    if(data.code == '0'){
        var str1 = '';
        /* str1 += '<div class="swiper-container disnone" id="swiper-container'+renderType+'">';
         str1 += '<div class="swiper-wrapper">';*/
        $.each(data.result,function(i,item){
            str1 += '<div class="swiper-slide mh100">';

            str1 += '<a onclick=toMyKadetail("' + item.id + '","1")>';

            str1 += '<div class="weui-flex">';
            str1 += ' <div class="weui-flex__item ">';
            str1 += '<div class="weui-news-p onerow center2 ">';
            str1 += '<div>';
            if(item.kaImage.search('.json') != -1){
                str1 += '<lottie-player src="'+checkPath(item.kaImage,'1')+'"  background="transparent"  speed="1"  class="yingyong"  loop autoplay ></lottie-player>';
            }else{

                if(item.isZiying == '1'){
                    if(item.zhuceNum != null && eval(item.zhuceNum) > 0){
                        if(item.kucun == '0'){
                            str1 += '<div><img class="yingyong shadowonlywhite zanshigray " src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon">自营T+'+item.zhuceNum+'</div></div>';
                        }else{
                            str1 += '<div><img class="yingyong shadowonlywhite " src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon">自营T+'+item.zhuceNum+'</div></div>';
                        }
                    }else{
                        if(item.kucun == '0'){
                            str1 += '<div><img class="yingyong shadowonlywhite zanshigray " src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon">自营立返</div></div>';
                        }else{
                            str1 += '<div><img class="yingyong shadowonlywhite " src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon">自营立返</div></div>';
                        }
                    }
                }else{
                    if(item.zhuceNum != null && eval(item.zhuceNum) > 0){
                        if(item.kucun == '0'){
                            str1 += '<div><img class="yingyong shadowonlywhite zanshigray " src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon">渠道T+'+item.zhuceNum+'</div></div>';
                        }else{
                            str1 += '<div><img class="yingyong shadowonlywhite " src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon">渠道T+'+item.zhuceNum+'</div></div>';
                        }
                    }else{
                        if(item.kucun == '0'){
                            str1 += '<div><img class="yingyong shadowonlywhite zanshigray " src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon">渠道立返</div></div>';
                        }else{
                            str1 += '<div><img class="yingyong shadowonlywhite " src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon">渠道立返</div></div>';
                        }
                    }
                }


            }
            str1 += '</div>';
            str1 += '</div>';
            if(item.kucun == '0'){
                str1 += '<div class="weui-news-p onerow center2 f-gray">'+setNULL(item.kaTitle)+'</div>';
            }else{
                str1 += '<div class="weui-news-p onerow center2">'+setNULL(item.kaTitle)+'</div>';
            }
            str1 += '<div class="weui-news-p onerow center2">';
            str1 += '<div class="weui-label-list">';
            if(item.kucun == '0'){
                str1 += '<label class="label f-gray b-gray " style="margin-bottom: 10px;border-radius: 20px;font-weight: bold;font-size: xx-small;">'+yongjinbutie(setNum(item.vipshareAgent),item.sharePricetype,item.butie,item.bangka)+'</label>';
            }else{
                str1 += '<label class="label f-red b-yellow" style="margin-bottom: 10px;border-radius: 20px;font-weight: bold;font-size: xx-small;">'+yongjinbutie(setNum(item.vipshareAgent),item.sharePricetype,item.butie,item.bangka)+'</label>';
            }
            str1 += '</div>';
            str1 += '</div>';
            str1 += '</div>';
            str1 += '</div>';


            str1 += '</a>';
            str1 += '</div>';
        });
        /*  str1 += '</div>';*/

        /*str1 += '<div class="swiper-pagination disnone" id="swiper-pagination'+renderType+'"></div>';
        str1 += '</div>';*/

        $("#"+renderId+"").html(str1);
        lunbotu(obj,renderId,shuzi);
        $("#"+renderId+"").show();
        $("#swiper-container"+renderId+"").show();
        $("#swiper-pagination"+renderId+"").show();
    }else{
        $.toast(data.msg, "text");
    }
}
function laxinRender4(data,renderId,renderType,obj,shuzi){
    if(data.code == '0'){
        var str1 = '';
        /* str1 += '<div class="swiper-container disnone" id="swiper-container'+renderType+'">';
         str1 += '<div class="swiper-wrapper">';*/
        //str1 += '<div  class="weui-grids grids-small"  >';
        $.each(data.result,function(i,item){


            str1 += '<a onclick=toMyKadetail("' + item.id + '","1") class="grid" style="margin-bottom: 10px;">';


            str1 += '<div  class="" style="text-align: center">';

            if(item.kaImage.search('.json') != -1){
                str1 += '<lottie-player src="'+checkPath(item.kaImage,'1')+'"  background="transparent"  speed="1"  class="yingyong"  loop autoplay ></lottie-player>';
            }else{

                if(item.isZiying == '1'){
                    if(item.zhuceNum != null && eval(item.zhuceNum) > 0){
                        if(item.kucun == '0'){
                            str1 += '<div><img class="yingyong shadowonlywhite zanshigray"  src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon2">自营T+'+item.zhuceNum+'</div></div>';
                        }else{
                            str1 += '<div><img class="yingyong shadowonlywhite "  src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon2">自营T+'+item.zhuceNum+'</div></div>';
                        }
                    }else{
                        if(item.kucun == '0'){
                            str1 += '<div><img class="yingyong shadowonlywhite zanshigray"  src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon2">自营立返</div></div>';
                        }else{
                            str1 += '<div><img class="yingyong shadowonlywhite "  src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon2">自营立返</div></div>';
                        }
                    }
                }else{
                    if(item.zhuceNum != null && eval(item.zhuceNum) > 0){
                        if(item.kucun == '0'){
                            str1 += '<div><img class="yingyong shadowonlywhite zanshigray"  src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon2">渠道T+'+item.zhuceNum+'</div></div>';
                        }else{
                            str1 += '<div><img class="yingyong shadowonlywhite "  src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon2">渠道T+'+item.zhuceNum+'</div></div>';
                        }
                    }else{
                        if(item.kucun == '0'){
                            str1 += '<div><img class="yingyong shadowonlywhite zanshigray"  src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon2">渠道立返</div></div>';
                        }else{
                            str1 += '<div><img class="yingyong shadowonlywhite "  src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon2">渠道立返</div></div>';
                        }
                    }
                }


            }

            str1 += '</div>';

            if(item.kucun == '0'){
                str1 += '<div class="weui-news-p onerow center4 f-gray" style="height: 24px;">'+setNULL(item.kaTitle)+'</div>';
            }else{
                str1 += '<div class="weui-news-p onerow center4"  style="height: 24px;">'+setNULL(item.kaTitle)+'</div>';
            }
            str1 += '<div class="weui-news-p onerow center2">';
            str1 += '<div class="weui-label-list">';
            if(item.kucun == '0'){
                str1 += '<label class="label f-gray b-gray" style="margin-bottom: 10px;border-radius: 20px;font-weight: bold;font-size: xx-small;">'+yongjinbutie(setNum(item.vipshareAgent),item.sharePricetype,item.butie,item.bangka)+'</label>';
            }else{
                str1 += '<label class="label f-red b-yellow" style="margin-bottom: 10px;border-radius: 20px;font-weight: bold;font-size: xx-small;">'+yongjinbutie(setNum(item.vipshareAgent),item.sharePricetype,item.butie,item.bangka)+'</label>';
            }

            str1 += '</div>';
            str1 += '</div>';


            str1 += '</a>';

        });
        //str1 += '</div>';
        /*  str1 += '</div>';*/

        /*str1 += '<div class="swiper-pagination disnone" id="swiper-pagination'+renderType+'"></div>';
        str1 += '</div>';*/

        if(data.result.length == 0){
            $.toast.prototype.defaults.duration=2000;$.toast("没有更多了","text");
        }


        if(renderType == '1'){
            $("#"+renderId+"").append(str1);
        }else{
            $("#"+renderId+"").html(str1);
        }
        $(".weui-toast").hide();

        //lunbotu(obj,renderType,shuzi);
        $("#"+renderId+"").show();
        //$("#swiper-container"+renderType+"").show();
        //$("#swiper-pagination"+renderType+"").show();
    }else{
        $.toast(data.msg, "text");
    }
}
function laxinRender5(data,renderId,renderType,obj,shuzi){
    if(data.code == '0'){
        var str1 = '';

        $.each(data.result,function(i,item){
            str1 += '<div class="swiper-slide">';

            str1 += '<a onclick=toLaxinList("'+item.label+'","","'+item.value+'");>';

            if(item.logo.search('.json') != -1){
                str1 += '<lottie-player src="'+checkPath(item.logo,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
            }else{
                str1 += '<img class="maxh shadowonly"  src="'+ checkPath(item.logo,'1')+'" style="border-radius: 5px">';
            }

            str1 += '</a>';
            str1 += '</div>';
        });


        $("#"+renderId+"").html(str1);
        lunbotu(obj,renderId,shuzi);
        $("#"+renderId+"").show();
        $("#swiper-container"+renderId+"").show();
        $("#swiper-pagination"+renderId+"").show();


    }else{
        $.toast(data.msg, "text");
    }
}
function laxinRender6(data,renderId,renderType,obj,shuzi){
    if(data.code == '0'){
        /*var str3 = '';
        str3 += '<div class="weui-feeds" style="margin-top: 2px;">';
        str3 += '<ul>';
        $.each(data.result,function(i,item){

                str3 += '<li onclick=toLaxinList("'+item.label+'","'+item.value+'","");>';
                str3 += '<span class=""  style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:no-repeat;background-size:cover;"></span>';
                str3 += '</li>';

        });
        str3 += '</ul>';
        str3 += '</div>';

        $("#"+renderId+"").html(str3);
        $("#"+renderId+"").show();*/




        var str1 = '';

        $.each(data.result,function(i,item){
            str1 += '<div class="swiper-slide">';

            str1 += '<a onclick=toLaxinList("'+item.label+'","'+item.value+'","");>';

            if(item.logo.search('.json') != -1){
                str1 += '<lottie-player src="'+checkPath(item.logo,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
            }else{
                str1 += '<img class="maxh shadowonly"  src="'+ checkPath(item.logo,'1')+'" style="border-radius: 5px">';
            }

            str1 += '</a>';
            str1 += '</div>';
        });


        $("#"+renderId+"").html(str1);
        lunbotu(obj,renderId,shuzi);
        $("#"+renderId+"").show();
        $("#swiper-container"+renderId+"").show();
        $("#swiper-pagination"+renderId+"").show();

    }else{
        $.toast(data.msg, "text");
    }
}
function laxinRender7(data,renderId,renderType,obj,shuzi){
    if(data.code == '0'){
        var str1 = '';
        /* str1 += '<div class="swiper-container disnone" id="swiper-container'+renderType+'">';
         str1 += '<div class="swiper-wrapper">';*/
        $.each(data.result,function(i,item){
            str1 += '<div class="swiper-slide">';

            str1 += '<a onclick=toMyKadetail("' + item.id + '","1")>';

            str1 += '<div class="weui-flex">';
            str1 += ' <div class="weui-flex__item ">';
            str1 += '<div class="weui-news-p onerow center2 ">';

            if(item.kaImage.search('.json') != -1){
                str1 += '<lottie-player src="'+checkPath(item.kaImage,'1')+'"  background="transparent"  speed="1"  class="yingyong"  loop autoplay ></lottie-player>';
            }else{
                if(item.isZiying == '1'){
                    if(item.zhuceNum != null && eval(item.zhuceNum) > 0){
                        if(item.kucun == '0'){
                            str1 += '<div><img class="yingyong shadowonly zanshigray"  src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon">自营T+'+item.zhuceNum+'</div></div>';
                        }else{
                            str1 += '<div><img class="yingyong shadowonly "  src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon">自营T+'+item.zhuceNum+'</div></div>';
                        }
                    }else{
                        if(item.kucun == '0'){
                            str1 += '<div><img class="yingyong shadowonly zanshigray"  src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon">自营立返</div></div>';
                        }else{
                            str1 += '<div><img class="yingyong shadowonly "  src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon">自营立返</div></div>';
                        }
                    }
                }else{
                    if(item.zhuceNum != null && eval(item.zhuceNum) > 0){
                        if(item.kucun == '0'){
                            str1 += '<div><img class="yingyong shadowonly zanshigray"  src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon">渠道T+'+item.zhuceNum+'</div></div>';
                        }else{
                            str1 += '<div><img class="yingyong shadowonly "  src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon">渠道T+'+item.zhuceNum+'</div></div>';
                        }
                    }else{
                        if(item.kucun == '0'){
                            str1 += '<div><img class="yingyong shadowonly zanshigray"  src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon">渠道立返</div></div>';
                        }else{
                            str1 += '<div><img class="yingyong shadowonly "  src="'+ checkPath(item.kaImage,'1')+'"></div><div ><div class="weui-mark-lb tipsicon">渠道立返</div></div>';
                        }
                    }
                }

            }

            str1 += '</div>';
            if(item.kucun == '0'){
                str1 += '<div class="weui-news-p onerow center2 f-gray">'+setNULL(item.kaTitle)+'</div>';
            }else{
                str1 += '<div class="weui-news-p onerow center2">'+setNULL(item.kaTitle)+'</div>';
            }
            str1 += '<div class="weui-news-p onerow center2">';
            str1 += '<div class="weui-label-list">';
            if(item.kucun == '0'){
                str1 += '<label class="label f-gray b-gray" style="margin-bottom: 10px;border-radius: 20px;font-weight: bold;font-size: xx-small;">'+yongjinbutie(setNum(item.vipshareAgent),item.sharePricetype,item.butie,item.bangka)+'</label>';
            }else{
                str1 += '<label class="label f-red b-yellow" style="margin-bottom: 10px;border-radius: 20px;font-weight: bold;font-size: xx-small;">'+yongjinbutie(setNum(item.vipshareAgent),item.sharePricetype,item.butie,item.bangka)+'</label>';
            }
            str1 += '</div>';
            str1 += '</div>';
            str1 += '</div>';
            str1 += '</div>';


            str1 += '</a>';
            str1 += '</div>';
        });
        /*  str1 += '</div>';*/

        /*str1 += '<div class="swiper-pagination disnone" id="swiper-pagination'+renderType+'"></div>';
        str1 += '</div>';*/

        $("#"+renderId+"").html(str1);
        lunbotu(obj,renderId,shuzi);
        $("#"+renderId+"").show();
        $("#swiper-container"+renderId+"").show();
        $("#swiper-pagination"+renderId+"").show();
    }else{
        $.toast(data.msg, "text");
    }
}


function zhuantiRender8(data,renderId,renderType,obj,shuzi){
    if(data.code == '0'){
        var wd = '50%';
        var str1 = '';
        /* str1 += '<div class="swiper-container disnone" id="swiper-container'+renderType+'">';
         str1 += '<div class="swiper-wrapper">';*/
        str1 += '<div  class="weui-grids"  >';
        $.each(data.result,function(i,item){

            if(item.kuandu != null && item.kuandu != ''){
                wd = item.kuandu+"%";
            }


            str1 += '<div  onclick=tohtmlall("gouwulistzhuanti.html?productZc='+item.value+'&listStyle=2")   class="gridproduct" style="width:'+wd+';padding: 2px;margin-top: -7px;" >';


            str1 += '<div  class="" style="text-align: center">';

            if(item.logo.search('.json') != -1){
                str1 += '<lottie-player src="'+checkPath(item.logo,'1')+'"  background="transparent"  speed="1"  class="" style="width: 100%;"  loop autoplay ></lottie-player>';
            }else{
                str1 += '<img class=""  src="'+ checkPath(item.logo,'1')+'" style="width: 100%;">';
            }

            str1 += '</div>';



            str1 += '</div>';

        });
        str1 += '</div>';
        /*  str1 += '</div>';*/

        /*str1 += '<div class="swiper-pagination disnone" id="swiper-pagination'+renderType+'"></div>';
        str1 += '</div>';*/

        $("#"+renderId+"").html(str1);
        //lunbotu(obj,renderType,shuzi);
        $("#"+renderId+"").show();
        //$("#swiper-container"+renderType+"").show();
        //$("#swiper-pagination"+renderType+"").show();

    }else{
        $.toast(data.msg, "text");
    }
}
