var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost";//本地模式
}
//文件请求URL
var baseFileUrldongTai = ''+basehost+'';
//请求实例
var instancedongTai = axios.create({
    baseURL: ''+basehost+'/sfd/a/api/',
    timeout: 180000000,
    headers: {'token': localStorage.getItem('token')}
});

//取消请求
var CancelTokendongTai = axios.CancelToken;
var sourcedongTai = CancelTokendongTai.source();

// 添加请求拦截器
instancedongTai.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        //isLogin('','');
       // sourcedongTai.cancel();
    }
   sessionStorage.clear();return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instancedongTai.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

//获取列表数据
function listdongTai(){
    //参数
    var dongtaiType = $("#dongtaiType").val();
    var dongtaiFile = $("#dongtaiFile").val();
    var dongtaiLink = $("#dongtaiLink").val();
    var linkType = $("#linkType").val();
    var dongtaiContent = $("#searchInput").val();

    var pageNo = $("#listdongTaiPageNo").val();
    var dongtairemarks = $("#dongtairemarks").val();
    var bdType = $("#bdTypeValue").val();
    var bdHangye = $("#bdHangyeValue").val();
    var isbd = $("#isbd").val();
    var topic = GetUrlString("topic");
/*
    var questionTopic = $("#questionTopicSelect").val();
*/

    //传输数据
    var datadongTai = {
        "dongtaiType":dongtaiType,
        "dongtaiFile":dongtaiFile,
        "dongtaiLink":dongtaiLink,
        "linkType":linkType,
        "remarks":dongtairemarks,
        "dongtaiContent":dongtaiContent,
        "inUser":getShareId(),
        "userId":GetUrlString('id'),
        "pageSize":20,
        "isbd":isbd,
        "topic":topic,
        "bdType":bdType,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "bdHangye":bdHangye,
        "pageNo":pageNo
    }

    instancedongTai({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/dongtai/dongTai/list',
        data: datadongTai,
        cancelToken: sourcedongTai.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            if(dongtairemarks == '3'){
                listdongTaiDspRender(rs.data);
            }else{
                listdongTaiRender(rs.data);
            }

        }else{
            console.log('请求异常！')
        }
    });

}
function listdongTaiSh(){
    //参数
    var dongtaiType = $("#dongtaiType").val();
    var dongtaiFile = $("#dongtaiFile").val();
    var dongtaiLink = $("#dongtaiLink").val();
    var linkType = $("#linkType").val();
    var dongtaiContent = $("#searchInput").val();

    var pageNo = $("#listdongTaiPageNo").val();
    var dongtairemarks = $("#dongtairemarks").val();
    var bdType = $("#bdTypeValue").val();
    var bdHangye = $("#bdHangyeValue").val();
    var isbd = $("#isbd").val();
    var topic = GetUrlString("topic");
    /*
        var questionTopic = $("#questionTopicSelect").val();
    */

    //传输数据
    var datadongTai = {
        "dongtaiType":dongtaiType,
        "dongtaiFile":dongtaiFile,
        "dongtaiLink":dongtaiLink,
        "linkType":linkType,
        "remarks":dongtairemarks,
        "dongtaiContent":dongtaiContent,
        "inUser":getShareId(),
        "userId":GetUrlString('id'),
        "pageSize":20,
        "isbd":isbd,
        "topic":topic,
        "bdType":bdType,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "bdHangye":bdHangye,
        "pageNo":pageNo
    }

    instancedongTai({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/dongtai/dongTai/list',
        data: datadongTai,
        cancelToken: sourcedongTai.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            if(dongtairemarks == '3'){
                listdongTaiDspRender(rs.data);
            }else{
                listdongTaiShRender(rs.data);
            }

        }else{
            console.log('请求异常！')
        }
    });

}
function listdongTaiTu(type,renderType,linkType){
    localStorage.setItem("tuijian",type);
    //参数
    var dongtaiType = linkType;
    var dongtaiFile = $("#dongtaiFile").val();
    var dongtaiLink = $("#dongtaiLink").val();

    /* var linkType = $("#linkType").val();*/
    //var dongtaiContent = $("#searchInput").val();

    var pageNo = $("#listdongTaiShipinPageNo").val();
    var dongtairemarks = $("#dongtairemarks").val();
    var bdType = $("#bdTypeValue").val();
    var bdHangye = $("#bdHangyeValue").val();
    var isbd = $("#isbd").val();
    var topic = type;
    var dongtaiContent = $("#searchInputC").val();

    /*
        var questionTopic = $("#questionTopicSelect").val();
    */

    //传输数据
    var datadongTai = {
        "dongtaiType":dongtaiType,
        "dongtaiFile":dongtaiFile,
        "dongtaiLink":dongtaiLink,
        "remarks":dongtairemarks,
        "dongtaiContent":dongtaiContent,
        "inUser":getShareId(),
        "userId":GetUrlString('id'),
        "pageSize":24,
        "isbd":isbd,
        "topic":topic,
        "bdType":bdType,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "bdHangye":bdHangye,
        "pageNo":pageNo
    }

    instancedongTai({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/dongtai/dongTai/list',
        data: datadongTai,
        cancelToken: sourcedongTai.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){

            if(rs.data.result != null && rs.data.result != ''){
                var str1 = "";
                str1 += '<div  class="weui-grids"  >';

                $.each(rs.data.result,function(i,item){



                    str1 += '<a onclick=toDongtaiDetail("'+item.id+'","1"); class="grid" style="width: 33.33% !important;padding: 0px 0px !important;">';


                    str1 += '<div class="weui-flex productshadow" style="background-color: white;margin-bottom: 0px;">';
                    str1 += ' <div class="weui-flex__item ">';
                    str1 += '<div class="weui-news-p onerow center2 ">';
                    str1 += '<div style="background-image:url('+checkPathBackGroubdImage(videoImagePath(item.dongtaiFile),"1")+');background-repeat:no-repeat;background-size:cover;height: 200px;">';
                    /* str1 += '<img class="product" style="border-radius: 5px;"  src="'+ checkPath(videoImagePath(item.dongtaiFile),'1')+'">';*/
                    if(item.price != null && item.price != ''){
                        //str1 += '<div class="weui-mark-rt bg-red2" style="margin-bottom: -14px; height:12px;z-index: 9; width: 45px;position: relative !important;background-color: red;">'+setNum(item.price)+'金币</div>';
                        str1 += '<span class="weui-mark-lb" style="top: 0px;position: sticky;font-size: 12px;background-color: rgb(249, 0, 0);text-align: center;color: white;width:50px;line-height: 12px;">'+setNum(item.price)+'金币</span>';

                    }
                    str1 += '<span class="weui-mark-lb" style="top: 180px;position: sticky;background-color: rgba(0, 0, 0, 0);margin-left: 10px;"><i class="icon icon-96 weui-tabbar__icon" id="icon28" style="color: white"></i>'+setNum(item.dongtaiDianjiliang)+'</span>';

                    str1 += '</div>';
                    str1 += '</div>';


                    str1 += '</div>';
                    str1 += '</div>';


                    str1 += '</a>';




                });
                str1 += '</div>';

                if(renderType == '1'){
                    $("#listdongTaishipin").html(str1);
                }else{
                    $("#listdongTaishipin").append(str1);
                }

            }else{
                $.toast.prototype.defaults.duration=1000;$.toast("没有数据了！",'text');
            }









        }else{
            console.log('请求异常！')
        }
    });

}
function listdongTaiMy(){
    //参数
    var dongtaiType = $("#dongtaiType").val();
    var dongtaiFile = $("#dongtaiFile").val();
    var dongtaiLink = $("#dongtaiLink").val();
    var linkType = $("#linkType").val();
    var dongtaiContent = $("#searchInput").val();

    var pageNo = $("#listdongTaiMyPageNo").val();
    var dongtairemarks = $("#dongtairemarks2").val();
    var bdType = $("#bdTypeValue").val();
    var bdHangye = $("#bdHangyeValue").val();
    var isbd = $("#isbd").val();
    var topic = $("#questionTopicSelect").val();
    /*
        var questionTopic = $("#questionTopicSelect").val();
    */

    //传输数据
    var datadongTai = {
        "dongtaiType":dongtaiType,
        "dongtaiFile":dongtaiFile,
        "dongtaiLink":dongtaiLink,
        "linkType":linkType,
        "remarks":dongtairemarks,
        "dongtaiContent":dongtaiContent,
        "inUser":getShareId(),
        "userId":GetUrlString('id'),
        "pageSize":20,
        "isbd":isbd,
        "topic":topic,
        "bdType":bdType,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "bdHangye":bdHangye,
        "pageNo":pageNo
    }

    instancedongTai({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/dongtai/dongTai/list',
        data: datadongTai,
        cancelToken: sourcedongTai.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            if(dongtairemarks == '3'){
                listdongTaiDspRender(rs.data);
            }else{
                listdongTaiRenderMy(rs.data);
            }

        }else{
            console.log('请求异常！')
        }
    });

}
//获取列表数据
function listdongTaiRmwd(){
    //参数
    var dongtaiType = $("#dongtaiType").val();
    var dongtaiFile = $("#dongtaiFile").val();
    var dongtaiLink = $("#dongtaiLink").val();
    var linkType = $("#linkType").val();
    var dongtaiContent = $("#dongtaiContent").val();
    var pageNo = $("#listdongTairmwdPageNo").val();
    var dongtairemarks = $("#dongtairemarks2").val();
    var bdType = $("#bdTypeValue").val();
    var bdHangye = $("#bdHangyeValue").val();
    var questionTopic = $("#questionTopicSelect").val();
    //传输数据
    var datadongTai = {
        "dongtaiType":dongtaiType,
        "dongtaiFile":dongtaiFile,
        "dongtaiLink":dongtaiLink,
        "zhaunfaFrom":questionTopic,
        "linkType":linkType,
        "remarks":dongtairemarks,
        "dongtaiContent":dongtaiContent,
        "inUser":getShareId(),
        "userId":GetUrlString('id'),
        "pageSize":5,
        "bdType":bdType,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "bdHangye":bdHangye,
        "pageNo":pageNo
    }

    instancedongTai({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/dongtai/dongTai/list',
        data: datadongTai,
        cancelToken: sourcedongTai.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            listdongTaiRmwdRender(rs.data);
        }else{
            console.log('请求异常！')
        }
    });

}

//列表渲染
function listdongTaiRmwdRender(data){
    var listdongTaiStr = '';
    if(data.code == '0'){
        if( data.result == null || data.result == '' || data.result == '[]'){
            $(".weui-toast--text").hide();$.toast("没有更多了", "text");
        }else{
            $.each(data.result,function(i,item){
                //发红包引流--//发布-文字-文字图片-文字音频（是否微信中）-文字视频（自动同步到短视频中-可选择）-文字文件--文字红包（VIP）--文字链接（自定义-VIP可以发）
                //处理好-点赞（可以无限点赞）-评论（链接类型的动态都可以进行评论（可以评论-动态列表的评论点开评论弹出评论列表）-可以展示最新三条评论--可以进行语音、文字、图片评论）-分享（是否在微信内-弹出加价和选择分享模式--如果不需要加价则不显示-但是后台要去处理到分享表里面--有佣金的分享按钮里面展示佣金金额）-转发（弹出输入内容可选择直接转发和输入内容--只有付费会员才可以转发自定义链接）
                //各种链接--自定义链接只有付费会员才可以发--只有付费会员才可以转发自定义链接--产品链接展示价格和购买按钮（信用卡只展示申请按钮及分享按钮）-也展示推广可得佣金分享按钮里面可以展示推广佣金
                //处理好图片显示（最多9个）-视频显示（判断尺寸）-音频显示（判断是语音还是mp3--不判断直接隐藏自带的播放器样式-改成语音的形式）-文件显示（默认文件样式：区分常见的）-红包显示（显示红包及红包状态）
                //console.log(i, item);
                renderRmwdTuWen(item);
            });
        }
    }else{
        $.toast(data.msg, "text");
    }
}

//列表渲染
function listdongTaiRender(data){
    var listdongTaiStr = '';
    if(data.code == '0'){
        if( data.result == null || data.result == '' || data.result == '[]'){
            //$(".weui-toast--text").hide();$.toast("没有更多了", "text");
        }else{
            $.each(data.result,function(i,item){
                //发红包引流--//发布-文字-文字图片-文字音频（是否微信中）-文字视频（自动同步到短视频中-可选择）-文字文件--文字红包（VIP）--文字链接（自定义-VIP可以发）
                //处理好-点赞（可以无限点赞）-评论（链接类型的动态都可以进行评论（可以评论-动态列表的评论点开评论弹出评论列表）-可以展示最新三条评论--可以进行语音、文字、图片评论）-分享（是否在微信内-弹出加价和选择分享模式--如果不需要加价则不显示-但是后台要去处理到分享表里面--有佣金的分享按钮里面展示佣金金额）-转发（弹出输入内容可选择直接转发和输入内容--只有付费会员才可以转发自定义链接）
                //各种链接--自定义链接只有付费会员才可以发--只有付费会员才可以转发自定义链接--产品链接展示价格和购买按钮（信用卡只展示申请按钮及分享按钮）-也展示推广可得佣金分享按钮里面可以展示推广佣金
                //处理好图片显示（最多9个）-视频显示（判断尺寸）-音频显示（判断是语音还是mp3--不判断直接隐藏自带的播放器样式-改成语音的形式）-文件显示（默认文件样式：区分常见的）-红包显示（显示红包及红包状态）
                //console.log(i, item);
                renderTuWen(item);
            });
        }
    }else{
        $.toast(data.msg, "text");
    }
}

//列表渲染
function listdongTaiShRender(data){
    var listdongTaiStr = '';
    if(data.code == '0'){
        if( data.result == null || data.result == '' || data.result == '[]'){
            //$(".weui-toast--text").hide();$.toast("没有更多了", "text");
        }else{
            $.each(data.result,function(i,item){
                //发红包引流--//发布-文字-文字图片-文字音频（是否微信中）-文字视频（自动同步到短视频中-可选择）-文字文件--文字红包（VIP）--文字链接（自定义-VIP可以发）
                //处理好-点赞（可以无限点赞）-评论（链接类型的动态都可以进行评论（可以评论-动态列表的评论点开评论弹出评论列表）-可以展示最新三条评论--可以进行语音、文字、图片评论）-分享（是否在微信内-弹出加价和选择分享模式--如果不需要加价则不显示-但是后台要去处理到分享表里面--有佣金的分享按钮里面展示佣金金额）-转发（弹出输入内容可选择直接转发和输入内容--只有付费会员才可以转发自定义链接）
                //各种链接--自定义链接只有付费会员才可以发--只有付费会员才可以转发自定义链接--产品链接展示价格和购买按钮（信用卡只展示申请按钮及分享按钮）-也展示推广可得佣金分享按钮里面可以展示推广佣金
                //处理好图片显示（最多9个）-视频显示（判断尺寸）-音频显示（判断是语音还是mp3--不判断直接隐藏自带的播放器样式-改成语音的形式）-文件显示（默认文件样式：区分常见的）-红包显示（显示红包及红包状态）
                //console.log(i, item);
                renderTuWenSh(item);
            });
        }
    }else{
        $.toast(data.msg, "text");
    }
}


//列表渲染
function listdongTaiRenderMy(data){
    var listdongTaiStr = '';
    if(data.code == '0'){
        if( data.result == null || data.result == '' || data.result == '[]'){
            //$(".weui-toast--text").hide();$.toast("没有更多了", "text");
        }else{
            $.each(data.result,function(i,item){
                //发红包引流--//发布-文字-文字图片-文字音频（是否微信中）-文字视频（自动同步到短视频中-可选择）-文字文件--文字红包（VIP）--文字链接（自定义-VIP可以发）
                //处理好-点赞（可以无限点赞）-评论（链接类型的动态都可以进行评论（可以评论-动态列表的评论点开评论弹出评论列表）-可以展示最新三条评论--可以进行语音、文字、图片评论）-分享（是否在微信内-弹出加价和选择分享模式--如果不需要加价则不显示-但是后台要去处理到分享表里面--有佣金的分享按钮里面展示佣金金额）-转发（弹出输入内容可选择直接转发和输入内容--只有付费会员才可以转发自定义链接）
                //各种链接--自定义链接只有付费会员才可以发--只有付费会员才可以转发自定义链接--产品链接展示价格和购买按钮（信用卡只展示申请按钮及分享按钮）-也展示推广可得佣金分享按钮里面可以展示推广佣金
                //处理好图片显示（最多9个）-视频显示（判断尺寸）-音频显示（判断是语音还是mp3--不判断直接隐藏自带的播放器样式-改成语音的形式）-文件显示（默认文件样式：区分常见的）-红包显示（显示红包及红包状态）
                //console.log(i, item);
                renderTuWenMy(item);
            });
        }
    }else{
        $.toast(data.msg, "text");
    }
}


//短视频列表渲染
function listdongTaiDspRender(data){
    var listdongTaiStr = '';
    if(data.code == '0'){
        if( data.result == null || data.result == '' || data.result == '[]'){
            //$(".weui-toast--text").hide();$.toast("没有更多了", "text");
        }else{
            $.each(data.result,function(i,item){
                //发红包引流--//发布-文字-文字图片-文字音频（是否微信中）-文字视频（自动同步到短视频中-可选择）-文字文件--文字红包（VIP）--文字链接（自定义-VIP可以发）
                //处理好-点赞（可以无限点赞）-评论（链接类型的动态都可以进行评论（可以评论-动态列表的评论点开评论弹出评论列表）-可以展示最新三条评论--可以进行语音、文字、图片评论）-分享（是否在微信内-弹出加价和选择分享模式--如果不需要加价则不显示-但是后台要去处理到分享表里面--有佣金的分享按钮里面展示佣金金额）-转发（弹出输入内容可选择直接转发和输入内容--只有付费会员才可以转发自定义链接）
                //各种链接--自定义链接只有付费会员才可以发--只有付费会员才可以转发自定义链接--产品链接展示价格和购买按钮（信用卡只展示申请按钮及分享按钮）-也展示推广可得佣金分享按钮里面可以展示推广佣金
                //处理好图片显示（最多9个）-视频显示（判断尺寸）-音频显示（判断是语音还是mp3--不判断直接隐藏自带的播放器样式-改成语音的形式）-文件显示（默认文件样式：区分常见的）-红包显示（显示红包及红包状态）
                //console.log(i, item);
                renderTuWenDsp(item);
            });
        }
    }else{
        $.toast(data.msg, "text");
    }
}
function renderTuWenDsp(item) {
    //console.log(item.dongtaiContent);
    //console.log(item.createBy.id);
    var htmlStr = '';
    htmlStr += '<li class="weui-comment-item">';
    htmlStr += '<div class="userinfo" onclick=toUserHome("'+item.createBy.id+'","1");>';
    htmlStr += '<strong class="nickname"><span  class="nickname">'+item.createBy.nickname+'</span></strong>';
    htmlStr += '<img class="avatar" src="'+ checkPath(item.createBy.headimgurl,'1')+'"/>';
    if(item.createBy.isV == '3'){
        htmlStr += '<span class="weui-badge" style="position: absolute;background-color:#f4a630;margin-top: -40px;margin-left: -20px;">V</span>';
    }
    htmlStr += '</div>';
    htmlStr += '<div class="weui-comment-msg" >';

    if(item.dongtaiType == '6'){

        //链接//linkType链接类型（1自定义链接2课程链接3圈子链接4圈子主题链接5工具链接6商品链接7问题链接8答案链接9短视频连接10信用卡链接11贷款链接12保险链接13基金证券链接14活动链接15投票链接16个人主页）
        if(item.linkType == '2'){
            htmlStr += '<p><span onclick=toCourseDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '3'){
            htmlStr += '<p><span onclick=toQuanZiDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
        }else if(item.linkType == '4'){
            htmlStr += '<p><span onclick=toTopicDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '5'){
            htmlStr += '<p><span onclick=toToolDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '6'){
            htmlStr += '<p><span onclick=toProductDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '7'){
            htmlStr += '<p><span onclick=toQuestionDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '8'){
            htmlStr += '<p><span onclick=toAnswerDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '9'){
            htmlStr += '<p><span onclick=toDuanshipingDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '10'){
            htmlStr += '<p><span onclick=toAgentKaDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '11'){
            htmlStr += '<p><span onclick=toAgentDaikuanDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '12'){
            htmlStr += '<p><span onclick=toAgentBaoxianDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '13'){
            htmlStr += '<p><span onclick=toAgentJiJinDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '14'){
            htmlStr += '<p><span onclick=toActivityDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '15'){

        }else if(item.linkType == '16'){
            htmlStr += '<p><span onclick=toUserHome("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }


    }else{
        htmlStr += '<p><span onclick=toDongtaiDetail("'+item.id+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
    }



    htmlStr += '<div class="page-bd" >';
    htmlStr += '<div class="weui-feeds">';
    htmlStr += '<ul>';
    if(item.dongtaiType == '3' && item.dongtaiFile != null){

        //视频--隐藏原始播放器
        if(checkPath(item.dongtaiFile,"3") != '文件已失效'){
            //if(getBrowser() != 'wxmobile'){
            <!--视频播放-->
            htmlStr += '<div class="page-bd"><div class="weui-c-article">';
            htmlStr += '<div id="dplayer2'+item.id+'"  price="'+setNum(item.price)+'"      cre="'+item.createBy.id+'">  </div>';
            //htmlStr += '<div id="dplayer2'+item.id+'"></div>';
            htmlStr += '<script type="text/javascript">';
            //if(getBrowser() == 'pc'){
            htmlStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.dongtaiFile,"3")+'\', pic: \''+videoImagePath(item.dongtaiFile)+'\'}});';
            //}else{
            // htmlStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:true, video: {url: \''+checkPath(item.dongtaiFile,"3")+'\'}});';
            //}
            htmlStr += '</script>';
            htmlStr += '</div></div>';
            //}else{
            // htmlStr += '<div><video   style="width:100%;height:100%;"  src="'+checkPath(item.dongtaiFile,'3')+'"  controls="controls" preload="meta"  preload="auto"> </video></div>';
            //}

            // 方法
        }else{
            //htmlStr += '<div class="page-bd">文件已失效</div>';
        }


    }


    htmlStr += '</ul>';
    htmlStr += '</div>';
    htmlStr += '</div>';
    htmlStr += '</div>';
    htmlStr += '<div class="weui-news-info">';
    htmlStr += '<div class="weui-news-infoitem">';
    htmlStr += '<span class="weui-news-left" id="weui-news-left">';
    htmlStr += '<span class="weui-news-left" id="weui-news-left">';



    htmlStr += '</span>';
    htmlStr += '</span>';
    htmlStr += '</div>';
    htmlStr += '</div>';
    htmlStr += '<p class="time left0" onclick=toDongtaiDetail("'+item.id+'","1");>'+timeago(item.createDate)+' </p>';
    htmlStr += '<div class="weui-comment-li" >';
    htmlStr += '<span class="check checked" >';

    if(item.createBy.id == localStorage.getItem("userId")){
        htmlStr += '<i class="icon icon-72 weui-tabbar__icon" onclick=deletebyId("14","'+item.id+'") id="icon30"></i>';
        htmlStr += '<span onclick=deletebyId("14","'+item.id+'") class="weui-comment-num">删除</span>';
    }

    htmlStr += '<i class="icon icon-5 weui-tabbar__icon" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","17"); id="icon30"></i>';
    htmlStr += '<i class="icon icon-38 weui-tabbar__icon" onclick=dianji("14","'+item.id+'") id="icon30"></i>';
    htmlStr += '<span class="weui-comment-num" id="zan'+item.id+'">'+setNum(item.dongtaiZan)+'</span>';
    htmlStr += '<i class="icon icon-79 weui-tabbar__icon" id="icon30" onclick=openCommentList("commentDisList","2","1",5,"'+item.id+'","14","'+item.createBy.id+'");></i>';
    htmlStr += '<span class="weui-comment-num" onclick=openCommentList("commentDisList","2","1",5,"'+item.id+'","14","'+item.createBy.id+'");>'+setNum(item.commentNum)+'</span>';
    htmlStr += '</span>';
    htmlStr += '</div>';
    htmlStr += '</li>';
    $("#listdongTai").append(htmlStr);
    /* var htmlStrMenu = '<div class="dplayer-icon dplayer-play-icon"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 32"><path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path></svg></div>';
     $(".dplayer-icons-left").html(htmlStrMenu);*/
}

function renderTuWen(item) {
    //console.log(item.dongtaiContent);
    //console.log(item.createBy.id);
    var htmlStr = '';
    htmlStr += '<li class="weui-comment-item">';
    htmlStr += '<div class="userinfo" onclick=toUserHome("'+item.createBy.id+'","1");>';
    htmlStr += '<strong class="nickname"><span  class="nickname">'+item.createBy.nickname+'</span></strong>';
    htmlStr += '<img class="avatar shadowonly" src="'+ checkPath(item.createBy.headimgurl,'1')+'"/>';
    if(item.createBy.isV == '3'){
        htmlStr += '<span class="weui-badge" style="position: absolute;background-color:#f4a630;margin-top: -40px;margin-left: -20px;">V</span>';
    }
    htmlStr += '</div>';
    htmlStr += '<div class="weui-comment-msg" >';



    if(item.dongtaiType == '6'){

        //链接//linkType链接类型（1自定义链接2课程链接3圈子链接4圈子主题链接5工具链接6商品链接7问题链接8答案链接9短视频连接10信用卡链接11贷款链接12保险链接13基金证券链接14活动链接15投票链接16个人主页）
        if(item.linkType == '2'){
            htmlStr += '<p><span onclick=toCourseDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '3'){
            htmlStr += '<p><span onclick=toQuanZiDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
        }else if(item.linkType == '4'){
            htmlStr += '<p><span onclick=toTopicDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '5'){
            htmlStr += '<p><span onclick=toToolDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '6'){
            htmlStr += '<p><span onclick=toProductDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '7'){
            if(eval(setNum(item.dingyueprice)) > 0.00){
                htmlStr += '<p><span onclick=toQuestionDetail("'+item.linkAboutid+'","1"); ><span class="f-red">[<i class="beauty icon-hongbao f-red f16">￥'+item.dingyueprice+'</i>]</span>'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
            }else{
                htmlStr += '<p><span onclick=toQuestionDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
            }

        }else if(item.linkType == '8'){
            if(eval(setNum(item.dingyueprice)) > 0.00){
                htmlStr += '<p><span onclick=toAnswerDetail("'+item.linkAboutid+'","1"); ><span class="f-red">[<i class="beauty icon-hongbao f-red f16">￥'+item.dingyueprice+'</i>]</span>'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
            }else{
                htmlStr += '<p><span onclick=toAnswerDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
            }


        }else if(item.linkType == '9'){
            htmlStr += '<p><span onclick=toDuanshipingDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '10'){
            htmlStr += '<p><span onclick=toAgentKaDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '11'){
            htmlStr += '<p><span onclick=toAgentDaikuanDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '12'){
            htmlStr += '<p><span onclick=toAgentBaoxianDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '13'){
            htmlStr += '<p><span onclick=toAgentJiJinDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '14'){
            htmlStr += '<p><span onclick=toActivityDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '15'){

        }else if(item.linkType == '16'){
            htmlStr += '<p><span onclick=toUserHome("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '19'){
            htmlStr += '<p><span onclick=toHuiYuanDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }


    }else if(item.dongtaiType == '5'){
        htmlStr += '<p><span  onclick=toHongBaoDetail("'+item.hongbaoId+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
    }else{
        htmlStr += '<p><span onclick=toDongtaiDetail("'+item.id+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
    }



    htmlStr += '<div class="page-bd" >';
    htmlStr += '<div class="weui-feeds">';
    htmlStr += '<ul>';
    if(item.dongtaiType == '1' && item.dongtaiFile != null){
        //图片
        htmlStr += getImageContent(item.id,item.dongtaiFile);
    }
    else if(item.dongtaiType == '2' && item.dongtaiFile != null){
        //音频--隐藏原始播放器
        htmlStr += '<div class="page-bd center" id="audiostartA'+item.id+'"  onclick=start("audiotest'+item.id+'","'+checkPath(item.dongtaiFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
        htmlStr += '<div class="audio"   >';
        htmlStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
        htmlStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
        htmlStr += '</div>';


       /* htmlStr += '<div class="page-bd-15">';
        htmlStr += '<div class="weui-news-info padding0">';
        htmlStr += '<div class="weui-c-article l100">';
        htmlStr += '<div id="aplayer1'+item.id+'"></div>';
        htmlStr += '<script type="text/javascript">';
        htmlStr += 'const ap1'+item.id+' = new APlayer({';
        htmlStr += 'container: document.getElementById("aplayer1'+item.id+'"), mini: false, autoplay:false,preload:\'none\',';
        htmlStr += 'audio: [{name: \'Music\', artist: \'音频\', url: \''+checkPath(item.dongtaiFile,"3")+'\', cover: \'../../img/agent/head/yinpin.png\'';
        htmlStr += '}]';
        htmlStr += '});';
        htmlStr += '</script>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';*/


    }
    else if(item.dongtaiType == '3' && item.dongtaiFile != null){

        //视频--隐藏原始播放器
        //if(checkPath(item.dongtaiFile,"3") != '文件已失效'){
        <!--视频播放-->
        htmlStr += '<div class="page-bd"><div class="dplayer-wrap" style="width: 86%;">';
        if(item.price != null && item.price != ''){
            htmlStr += '<div class="weui-mark-rt bg-red2" style="margin-bottom: -1.35em; z-index: 9; width: 45px;position: relative !important;margin-bottom: -1.35em;background-color: red;">'+setNum(item.price)+'金币</div>';

        }
        htmlStr += '<div id="dplayer2'+item.id+'"  price="'+setNum(item.price)+'"      cre="'+item.createBy.id+'"></div>';
        htmlStr += '<script type="text/javascript">';
        htmlStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.dongtaiFile,"3")+'\', pic: \''+videoImagePath(item.dongtaiFile)+'\'}});';

        htmlStr += '</script>';

        htmlStr += '</div></div>';
        //}else{
        //    htmlStr += '<div class="page-bd">文件已失效</div>';
        //}

/*
    <span id="bofang'+item.id+'" class="weui-mark-lb" style="top: 180px;position: sticky;font-size: 14px;background-color: rgba(0, 0, 0, 0);margin-left: 10px;"><img src="../../img/agent/icon/bofang.png" height="45" width="45" style="color: white;margin-left: 40%;margin-top: -90%;position: absolute;/><i class="icon icon-96 weui-tabbar__icon" id="icon28" style="color: white;margin-left: 40%;margin-top: -80%;position: absolute;"></i></span>
*/


    }
    else if(item.dongtaiType == '4' && item.dongtaiFile != null){
        //文件--判断文件类型展示不同的图片
        if(item.dongtaiFile.search(".jpeg") != -1 || item.dongtaiFile.search(".jpg") != -1 || item.dongtaiFile.search(".png") != -1 || item.dongtaiFile.search(".gif") != -1 || item.dongtaiFile.search(".GIF") != -1 ){
            htmlStr += getImageContent(item.id,item.dongtaiFile);
        }else if( item.dongtaiFile.search(".mp4") != -1 || item.dongtaiFile.search(".MP4") != -1 || item.dongtaiFile.search(".flv")  != -1 || item.dongtaiFile.search(".mov")  != -1 ){
            <!--视频播放-->
            //if(getBrowser() != 'wxmobile'){
            htmlStr += '<div class="page-bd"><div class="weui-c-article"  style="width: 86%;">';
            htmlStr += '<div id="dplayer2'+item.id+'"  price="'+setNum(item.price)+'"      cre="'+item.createBy.id+'"></div>';
            htmlStr += '<script type="text/javascript">';
            htmlStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.dongtaiFile,"3")+'\', pic: \''+videoImagePath(item.dongtaiFile)+'\'}});';
            htmlStr += '</script>';
            htmlStr += '</div></div>';



        }else if( item.dongtaiFile.search(".MP3") != -1 || item.dongtaiFile.search(".mp3") != -1 || item.dongtaiFile.search(".wav")  != -1 || item.dongtaiFile.search(".ogg")  != -1 ){
            /*//音频--隐藏原始播放器
            htmlStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.dongtaiFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
            htmlStr += '<div class="audio"   >';
            htmlStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
            htmlStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
            htmlStr += '</div>';
            htmlStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
            htmlStr += '</div>';*/


            htmlStr += '<div class="">';
            htmlStr += '<div class="weui-news-info padding0">';
            htmlStr += '<div class="weui-c-article l100">';
            htmlStr += '<div id="aplayer1'+item.id+'"></div>';
            htmlStr += '<script type="text/javascript">';
            htmlStr += 'const ap1'+item.id+' = new APlayer({';
            htmlStr += 'container: document.getElementById("aplayer1'+item.id+'"), mini: false, autoplay:false,preload:\'none\',';
            htmlStr += 'audio: [{name: \''+getFileName(item.dongtaiFile)+'\', artist: \'音频\', url: \''+checkPath(item.dongtaiFile,"3")+'\', cover: \'../../img/agent/head/yinpin.png\'';
            htmlStr += '}]';
            htmlStr += '});';
            htmlStr += '</script>';
            htmlStr += '</div>';
            htmlStr += '</div>';
            htmlStr += '</div>';


        }else{
            htmlStr += '<a href="'+ checkPath(item.dongtaiFile,'3')+'" target="_blank">'+setNULL(getFileName(item.dongtaiFile))+'</a>';

        }
    }
    else if(item.dongtaiType == '5' && item.dongtaiFile != null){
        //红包
        htmlStr += '<div class="weui-feeds" ><lottie-player  onclick=toHongBaoDetail("'+item.hongbaoId+'","1"); src="../../img/agent/json/hongbao.json"  background="transparent"  speed="1"  style="width:173px; height: 286px;"  loop autoplay ></lottie-player></div>';
        //htmlStr += '<div class="weui-feeds"><img onclick=toHongBaoDetail("'+item.hongbaoId+'","1");  width="173px" height="286px" src="'+ checkPath(item.dongtaiFile,'1')+'"></div>';
    }
    else if(item.dongtaiType == '6'){
        //链接

        //链接

        //文件--判断文件类型展示不同的图片
        if(item.dongtaiFile != null && (item.dongtaiFile.search(".jpeg") != -1 || item.dongtaiFile.search(".jpg") != -1 || item.dongtaiFile.search(".png") != -1 || item.dongtaiFile.search(".gif") != -1 || item.dongtaiFile.search(".GIF") != -1 )){
            htmlStr += getImageContent(item.id,item.dongtaiFile);
        }else if(item.dongtaiFile != null && (item.dongtaiFile.search(".mp4") != -1 || item.dongtaiFile.search(".MP4") != -1 || item.dongtaiFile.search(".flv")  != -1 || item.dongtaiFile.search(".mov")  != -1 )){
            <!--视频播放-->
            //if(getBrowser() != 'wxmobile'){
            htmlStr += '<div class="page-bd"><div class="weui-c-article"  style="width: 86%;">';
            htmlStr += '<div id="dplayer2'+item.id+'"  price="'+setNum(item.price)+'"      cre="'+item.createBy.id+'"></div>';
            htmlStr += '<script type="text/javascript">';
            htmlStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.dongtaiFile,"3")+'\', pic: \''+videoImagePath(item.dongtaiFile)+'\'}});';
            htmlStr += '</script>';
            htmlStr += '</div></div>';



        }else if(item.dongtaiFile != null && (item.dongtaiFile.search(".MP3") != -1 || item.dongtaiFile.search(".mp3") != -1 || item.dongtaiFile.search(".wav")  != -1 || item.dongtaiFile.search(".ogg")  != -1) ){
            /*//音频--隐藏原始播放器
            htmlStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.dongtaiFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
            htmlStr += '<div class="audio"   >';
            htmlStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
            htmlStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
            htmlStr += '</div>';
            htmlStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
            htmlStr += '</div>';*/

            htmlStr += '<div class="">';
            htmlStr += '<div class="weui-news-info padding0">';
            htmlStr += '<div class="weui-c-article l100">';
            htmlStr += '<div id="aplayer1'+item.id+'"></div>';
            htmlStr += '<script type="text/javascript">';
            htmlStr += 'const ap1'+item.id+' = new APlayer({';
            htmlStr += 'container: document.getElementById("aplayer1'+item.id+'"), mini: false, autoplay:false,preload:\'none\',';
            htmlStr += 'audio: [{name: \''+getFileName(item.dongtaiFile)+'\', artist: \'音频\', url: \''+checkPath(item.dongtaiFile,"3")+'\', cover: \'../../img/agent/head/yinpin.png\'';
            htmlStr += '}]';
            htmlStr += '});';
            htmlStr += '</script>';
            htmlStr += '</div>';
            htmlStr += '</div>';
            htmlStr += '</div>';


        }else if(item.dongtaiFile != null){
            htmlStr += '<a href="'+ checkPath(item.dongtaiFile,'3')+'" target="_blank">'+setNULL(getFileName(item.dongtaiFile))+'</a>';

        }

    }

    htmlStr += '</ul>';
    htmlStr += '</div>';
    htmlStr += '</div>';
    htmlStr += '</div>';
    htmlStr += '<div class="weui-news-info">';
    htmlStr += '<div class="weui-news-infoitem">';
    htmlStr += '<span class="weui-news-left" id="weui-news-left">';
    htmlStr += '<span class="weui-news-left" id="weui-news-left">';
    //htmlStr += '<div class="weui-label-list" style="margin-left: 0px;">';
    //console.log(item.linkType);

    if(localStorage.getItem("isdisshare") != '1'){




    if(item.dongtaiType == '1' && item.dongtaiFile != null){
        //图片

        htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","17"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
        htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("'+item.id+'&share='+localStorage.getItem('userId')+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';

    }
    else if(item.dongtaiType == '2' && item.dongtaiFile != null){
        //音频--隐藏原始播放器

        htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","17"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
        htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("'+item.id+'&share='+localStorage.getItem('userId')+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';

    }
    else if(item.dongtaiType == '3' && item.dongtaiFile != null){
        //视频--隐藏原始播放器
        if(item.price != null && item.price != '' && item.price != '0'){
            htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("'+item.id+'&share='+localStorage.getItem('userId')+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';
        }else{
            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","17"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("'+item.id+'&share='+localStorage.getItem('userId')+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';
        }


    }
    else if(item.dongtaiType == '4' && item.dongtaiFile != null){
        //文件--判断文件类型展示不同的图片

        htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","17"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
        htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("'+item.id+'&share='+localStorage.getItem('userId')+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';

    }
    else if(item.dongtaiType == '5' && item.dongtaiFile != null){
        //红包
        htmlStr += '<label class="label f-blue b-blue" onclick=toHongBaoDetail("'+item.hongbaoId+'&share='+localStorage.getItem('userId')+'","1"); > <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';

    }
    else if(item.dongtaiType == '6'){
        //console.log(item.linkType);
        //链接
//链接//linkType链接类型（1自定义链接2课程链接3圈子链接4圈子主题链接5工具链接6商品链接7问题链接8答案链接9短视频连接10信用卡链接11贷款链接12保险链接13基金证券链接14活动链接15投票链接16个人主页）
        if(item.linkType == '2'){

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toCourseDetail("'+item.linkAboutid+'","1")> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
            htmlStr += getYongjinMoneyXin(item.yongjin,"1");
            htmlStr += '</label>';
            if(item.price == null || eval(item.price) == 0.00){
                htmlStr += '<label class="label  f-red b-red" onclick=toCourseDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-gouwu f-red" id="icon30"></i>免费阅读'+getPriceMoney(item.price)+'</label>';
            }else{
                htmlStr += '<label class="label  f-red b-red" onclick=toCourseDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-gouwu f-red" id="icon30"></i>限时购买'+getPriceMoney(item.price)+'</label>';
            }

        }else if(item.linkType == '3'){

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toQuanZiDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
            htmlStr += getYongjinMoneyXin(item.yongjin,"1");
            htmlStr += '</label>';
            htmlStr += '<label class="label  f-red b-red" onclick=toQuanZiDetail("'+item.linkAboutid+'","1");><i class="beauty icon-jiahao f-red" id="icon30"></i>加入圈子'+getPriceMoney(item.price)+'</label>';

        }else if(item.linkType == '4'){

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toTopicDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
            htmlStr += getYongjinMoneyXin(item.yongjin,"1");
            htmlStr += '</label>';
            htmlStr += '<label class="label  f-red b-red" onclick=toTopicDetail("'+item.linkAboutid+'","1");><i class="beauty icon-jiahao f-red" id="icon30"></i>加入圈子'+getPriceMoney(item.price)+'</label>';
        }else if(item.linkType == '5'){

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toToolDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
            htmlStr += getYongjinMoneyXin(item.yongjin,"1");
            htmlStr += '</label>';
            htmlStr += '<label class="label  f-red b-red" onclick=toToolDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1"); ><i class="beauty icon-gouwu f-red" id="icon30"></i>限时购买'+getPriceMoney(item.price)+'</label>';
        }else if(item.linkType == '6'){

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toProductDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
            htmlStr += getYongjinMoneyXin(item.yongjin,"1");
            htmlStr += '</label>';
            htmlStr += '<label class="label  f-red b-red" onclick=toProductDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-gouwu f-red" id="icon30"></i>限时购买'+getPriceMoney(item.price)+'</label>';
        }else if(item.linkType == '7'){

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toQuestionDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
            htmlStr += getYongjinMoneyXin(item.yongjin,"1");
            htmlStr += '</label>';
            htmlStr += '<label class="label  f-red b-red" onclick=toQuestionDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-shengyin f-red" id="icon30"></i>去围观</label>';
        }else if(item.linkType == '8'){

            /*htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';*/
            htmlStr += '<label class="label f-blue b-blue" onclick=toAnswerDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
            htmlStr += getYongjinMoneyXin(item.yongjin,"1");
            htmlStr += '</label>';
            htmlStr += '<label class="label  f-red b-red" onclick=toAnswerDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-shengyin f-red" id="icon30"></i>去围观</label>';
        }else if(item.linkType == '9'){
            htmlStr += '<label class="label f-blue b-blue" onclick=toDuanshipingDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';

            htmlStr += '</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
        }else if(item.linkType == '10'){

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toAgentKaDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
            htmlStr += getYongjinMoneyXin(item.yongjin,"1");
            htmlStr += '</label>';
            htmlStr += '<label class="label  f-red b-red" onclick=toAgentKaDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-bianjibiaoge f-red" id="icon30"></i>去做单</label>';
        }else if(item.linkType == '11'){

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toAgentDaikuanDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
            htmlStr += getYongjinMoneyXin(item.yongjin,"2");
            htmlStr += '</label>';
            htmlStr += '<label class="label  f-red b-red" onclick=toAgentDaikuanDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-bianjibiaoge f-red" id="icon30"></i>低息借</label>';

        }else if(item.linkType == '12'){

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toAgentBaoxianDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
            htmlStr += getYongjinMoneyXin(item.yongjin,"2");
            htmlStr += '</label>';
            htmlStr += '<label class="label  f-red b-red" onclick=toAgentBaoxianDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-bianjibiaoge f-red" id="icon30"></i>去买保险</label>';
        }else if(item.linkType == '13'){

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toAgentJiJinDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
            htmlStr += getYongjinMoneyXin(item.yongjin,"2");
            htmlStr += '</label>';
            htmlStr += '<label class="label  f-red b-red" onclick=toAgentJiJinDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-bianjibiaoge f-red" id="icon30"></i>去买基金</label>';

        }else if(item.linkType == '14'){

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue"  onclick=toActivityDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
            htmlStr += getYongjinMoneyXin(item.yongjin,"1");
            htmlStr += '</label>';
            htmlStr += '<label class="label  f-red b-red" onclick=toActivityDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-qunzu f-red" id="icon30"></i>去参加活动'+getPriceMoney(item.price)+'</label>';


        }else if(item.linkType == '19'){

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue"  onclick=toHuiYuanDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
            htmlStr += getYongjinMoneyXin(item.yongjin,"1");
            htmlStr += '</label>';
            htmlStr += '<label class="label  f-red b-red" onclick=toHuiYuanDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-qunzu f-red" id="icon30"></i>去买会员'+getPriceMoney(item.price)+'</label>';


        }else if(item.linkType == '15'){

        }else if(item.linkType == '16'){
            htmlStr += '<label class="label f-blue b-blue"> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
            htmlStr += '</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
        }


    }
    }
    // htmlStr += '</div>';

    htmlStr += '</span>';
    htmlStr += '</span>';
    htmlStr += '</div>';
    htmlStr += '</div>';
    if(item.isTop == '1'){
        htmlStr += '<p class="time left0" onclick=toDongtaiDetail("'+item.id+'","1");><span style="color: red;">[置顶]</span>'+timeago(item.createDate)+' </p>';


    }else{
        htmlStr += '<p class="time left0" onclick=toDongtaiDetail("'+item.id+'","1");>'+timeago(item.createDate)+' </p>';

    }


    htmlStr += '<div class="weui-comment-li" >';
    htmlStr += '<span class="check checked" >';



    if(item.createBy.id == localStorage.getItem("userId")  ){
        htmlStr += '<i class="icon icon-72 weui-tabbar__icon" onclick=deletebyId("14","'+item.id+'") id="icon30"></i>';
        htmlStr += '<span onclick=deletebyId("14","'+item.id+'") class="weui-comment-num">删除</span>';
    }

    if(item.createBy.id == localStorage.getItem("userId") && item.linkType == '2'){
        htmlStr += '<i class="icon icon-116 weui-tabbar__icon" onclick=toBianjiCourse("'+item.linkAboutid+'","1") id="icon30"></i>';
        htmlStr += '<span onclick=toBianjiCourse("'+item.linkAboutid+'","1") class="weui-comment-num">编辑</span>';
    }

    htmlStr += '<i class="icon icon-38 weui-tabbar__icon" onclick=dianji("14","'+item.id+'") id="icon30"></i>';
    htmlStr += '<span class="weui-comment-num" id="zan'+item.id+'">'+setNum(item.dongtaiZan)+'</span>';


    htmlStr += '<i class="icon icon-79 weui-tabbar__icon" id="icon30" onclick=openCommentList("commentDisList","2","1",10,"'+item.id+'","14","'+item.createBy.id+'");></i>';
    htmlStr += '<span class="weui-comment-num" onclick=openCommentList("commentDisList","2","1",10,"'+item.id+'","14","'+item.createBy.id+'");>'+setNum(item.commentNum)+'</span>';
    htmlStr += '</span>';
    htmlStr += '</div>';
    htmlStr += '</li>';
    $("#listdongTai").append(htmlStr);
    /*$(".dplayer-controller").hide();//隐藏播放进度等信息
    $(".weui-btn").hide();
    $(".dplayer-notice").hide();//隐藏通知
    $(".dplayer-video-wrap").css("height","");*/
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
function renderTuWenSh(item) {
    //console.log(item.dongtaiContent);
    //console.log(item.createBy.id);
    var htmlStr = '';
    htmlStr += '<li class="weui-comment-item">';
    htmlStr += '<div class="userinfo" onclick=toUserHome("'+item.createBy.id+'","1");>';
    htmlStr += '<strong class="nickname"><span  class="nickname">'+item.createBy.nickname+'</span></strong>';
    htmlStr += '<img class="avatar shadowonly" src="'+ checkPath(item.createBy.headimgurl,'1')+'"/>';
    if(item.createBy.isV == '3'){
        htmlStr += '<span class="weui-badge" style="position: absolute;background-color:#f4a630;margin-top: -40px;margin-left: -20px;">V</span>';
    }
    htmlStr += '</div>';
    htmlStr += '<div class="weui-comment-msg" >';



    if(item.dongtaiType == '6'){

        //链接//linkType链接类型（1自定义链接2课程链接3圈子链接4圈子主题链接5工具链接6商品链接7问题链接8答案链接9短视频连接10信用卡链接11贷款链接12保险链接13基金证券链接14活动链接15投票链接16个人主页）
        if(item.linkType == '2'){
            htmlStr += '<p><span onclick=toCourseDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '3'){
            htmlStr += '<p><span onclick=toQuanZiDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
        }else if(item.linkType == '4'){
            htmlStr += '<p><span onclick=toTopicDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '5'){
            htmlStr += '<p><span onclick=toToolDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '6'){
            htmlStr += '<p><span onclick=toProductDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '7'){
            if(eval(setNum(item.dingyueprice)) > 0.00){
                htmlStr += '<p><span onclick=toQuestionDetail("'+item.linkAboutid+'","1"); ><span class="f-red">[<i class="beauty icon-hongbao f-red f16">￥'+item.dingyueprice+'</i>]</span>'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
            }else{
                htmlStr += '<p><span onclick=toQuestionDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
            }

        }else if(item.linkType == '8'){
            if(eval(setNum(item.dingyueprice)) > 0.00){
                htmlStr += '<p><span onclick=toAnswerDetail("'+item.linkAboutid+'","1"); ><span class="f-red">[<i class="beauty icon-hongbao f-red f16">￥'+item.dingyueprice+'</i>]</span>'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
            }else{
                htmlStr += '<p><span onclick=toAnswerDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
            }


        }else if(item.linkType == '9'){
            htmlStr += '<p><span onclick=toDuanshipingDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '10'){
            htmlStr += '<p><span onclick=toAgentKaDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '11'){
            htmlStr += '<p><span onclick=toAgentDaikuanDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '12'){
            htmlStr += '<p><span onclick=toAgentBaoxianDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '13'){
            htmlStr += '<p><span onclick=toAgentJiJinDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '14'){
            htmlStr += '<p><span onclick=toActivityDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '15'){

        }else if(item.linkType == '16'){
            htmlStr += '<p><span onclick=toUserHome("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '19'){
            htmlStr += '<p><span onclick=toHuiYuanDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }


    }else if(item.dongtaiType == '5'){
        htmlStr += '<p><span  onclick=toHongBaoDetail("'+item.hongbaoId+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
    }else{
        htmlStr += '<p><span onclick=toDongtaiDetail("'+item.id+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
    }



    htmlStr += '<div class="page-bd" >';
    htmlStr += '<div class="weui-feeds">';
    htmlStr += '<ul>';
    if(item.dongtaiType == '1' && item.dongtaiFile != null){
        //图片
        htmlStr += getImageContent(item.id,item.dongtaiFile);
    }
    else if(item.dongtaiType == '2' && item.dongtaiFile != null){
        //音频--隐藏原始播放器
        htmlStr += '<div class="page-bd center" id="audiostartA'+item.id+'"  onclick=start("audiotest'+item.id+'","'+checkPath(item.dongtaiFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
        htmlStr += '<div class="audio"   >';
        htmlStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
        htmlStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
        htmlStr += '</div>';


        /* htmlStr += '<div class="page-bd-15">';
         htmlStr += '<div class="weui-news-info padding0">';
         htmlStr += '<div class="weui-c-article l100">';
         htmlStr += '<div id="aplayer1'+item.id+'"></div>';
         htmlStr += '<script type="text/javascript">';
         htmlStr += 'const ap1'+item.id+' = new APlayer({';
         htmlStr += 'container: document.getElementById("aplayer1'+item.id+'"), mini: false, autoplay:false,preload:\'none\',';
         htmlStr += 'audio: [{name: \'Music\', artist: \'音频\', url: \''+checkPath(item.dongtaiFile,"3")+'\', cover: \'../../img/agent/head/yinpin.png\'';
         htmlStr += '}]';
         htmlStr += '});';
         htmlStr += '</script>';
         htmlStr += '</div>';
         htmlStr += '</div>';
         htmlStr += '</div>';*/


    }
    else if(item.dongtaiType == '3' && item.dongtaiFile != null){

        //视频--隐藏原始播放器
        //if(checkPath(item.dongtaiFile,"3") != '文件已失效'){
        <!--视频播放-->
        htmlStr += '<div class="page-bd"><div class="dplayer-wrap" style="width: 86%;">';
        if(item.price != null && item.price != ''){
            htmlStr += '<div class="weui-mark-rt bg-red2" style="margin-bottom: -1.35em; z-index: 9; width: 45px;position: relative !important;margin-bottom: -1.35em;background-color: red;">'+setNum(item.price)+'金币</div>';

        }
        htmlStr += '<div id="dplayer2'+item.id+'"  price="'+setNum(item.price)+'"      cre="'+item.createBy.id+'"></div>';
        htmlStr += '<script type="text/javascript">';
        htmlStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.dongtaiFile,"3")+'\', pic: \''+videoImagePath(item.dongtaiFile)+'\'}});';

        htmlStr += '</script>';

        htmlStr += '</div></div>';
        //}else{
        //    htmlStr += '<div class="page-bd">文件已失效</div>';
        //}

        /*
            <span id="bofang'+item.id+'" class="weui-mark-lb" style="top: 180px;position: sticky;font-size: 14px;background-color: rgba(0, 0, 0, 0);margin-left: 10px;"><img src="../../img/agent/icon/bofang.png" height="45" width="45" style="color: white;margin-left: 40%;margin-top: -90%;position: absolute;/><i class="icon icon-96 weui-tabbar__icon" id="icon28" style="color: white;margin-left: 40%;margin-top: -80%;position: absolute;"></i></span>
        */


    }
    else if(item.dongtaiType == '4' && item.dongtaiFile != null){
        //文件--判断文件类型展示不同的图片
        if(item.dongtaiFile.search(".jpeg") != -1 || item.dongtaiFile.search(".jpg") != -1 || item.dongtaiFile.search(".png") != -1 || item.dongtaiFile.search(".gif") != -1 || item.dongtaiFile.search(".GIF") != -1 ){
            htmlStr += getImageContent(item.id,item.dongtaiFile);
        }else if( item.dongtaiFile.search(".mp4") != -1 || item.dongtaiFile.search(".MP4") != -1 || item.dongtaiFile.search(".flv")  != -1 || item.dongtaiFile.search(".mov")  != -1 ){
            <!--视频播放-->
            //if(getBrowser() != 'wxmobile'){
            htmlStr += '<div class="page-bd"><div class="weui-c-article"  style="width: 86%;">';
            htmlStr += '<div id="dplayer2'+item.id+'"  price="'+setNum(item.price)+'"      cre="'+item.createBy.id+'"></div>';
            htmlStr += '<script type="text/javascript">';
            htmlStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.dongtaiFile,"3")+'\', pic: \''+videoImagePath(item.dongtaiFile)+'\'}});';
            htmlStr += '</script>';
            htmlStr += '</div></div>';



        }else if( item.dongtaiFile.search(".MP3") != -1 || item.dongtaiFile.search(".mp3") != -1 || item.dongtaiFile.search(".wav")  != -1 || item.dongtaiFile.search(".ogg")  != -1 ){
            /*//音频--隐藏原始播放器
            htmlStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.dongtaiFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
            htmlStr += '<div class="audio"   >';
            htmlStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
            htmlStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
            htmlStr += '</div>';
            htmlStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
            htmlStr += '</div>';*/


            htmlStr += '<div class="">';
            htmlStr += '<div class="weui-news-info padding0">';
            htmlStr += '<div class="weui-c-article l100">';
            htmlStr += '<div id="aplayer1'+item.id+'"></div>';
            htmlStr += '<script type="text/javascript">';
            htmlStr += 'const ap1'+item.id+' = new APlayer({';
            htmlStr += 'container: document.getElementById("aplayer1'+item.id+'"), mini: false, autoplay:false,preload:\'none\',';
            htmlStr += 'audio: [{name: \''+getFileName(item.dongtaiFile)+'\', artist: \'音频\', url: \''+checkPath(item.dongtaiFile,"3")+'\', cover: \'../../img/agent/head/yinpin.png\'';
            htmlStr += '}]';
            htmlStr += '});';
            htmlStr += '</script>';
            htmlStr += '</div>';
            htmlStr += '</div>';
            htmlStr += '</div>';


        }else{
            htmlStr += '<a href="'+ checkPath(item.dongtaiFile,'3')+'" target="_blank">'+setNULL(getFileName(item.dongtaiFile))+'</a>';

        }
    }
    else if(item.dongtaiType == '5' && item.dongtaiFile != null){
        //红包
        htmlStr += '<div class="weui-feeds" ><lottie-player  onclick=toHongBaoDetail("'+item.hongbaoId+'","1"); src="../../img/agent/json/hongbao.json"  background="transparent"  speed="1"  style="width:173px; height: 286px;"  loop autoplay ></lottie-player></div>';
        //htmlStr += '<div class="weui-feeds"><img onclick=toHongBaoDetail("'+item.hongbaoId+'","1");  width="173px" height="286px" src="'+ checkPath(item.dongtaiFile,'1')+'"></div>';
    }
    else if(item.dongtaiType == '6'){
        //链接

        //链接

        //文件--判断文件类型展示不同的图片
        if(item.dongtaiFile != null && (item.dongtaiFile.search(".jpeg") != -1 || item.dongtaiFile.search(".jpg") != -1 || item.dongtaiFile.search(".png") != -1 || item.dongtaiFile.search(".gif") != -1 || item.dongtaiFile.search(".GIF") != -1 )){
            htmlStr += getImageContent(item.id,item.dongtaiFile);
        }else if(item.dongtaiFile != null && (item.dongtaiFile.search(".mp4") != -1 || item.dongtaiFile.search(".MP4") != -1 || item.dongtaiFile.search(".flv")  != -1 || item.dongtaiFile.search(".mov")  != -1 )){
            <!--视频播放-->
            //if(getBrowser() != 'wxmobile'){
            htmlStr += '<div class="page-bd"><div class="weui-c-article"  style="width: 86%;">';
            htmlStr += '<div id="dplayer2'+item.id+'"  price="'+setNum(item.price)+'"      cre="'+item.createBy.id+'"></div>';
            htmlStr += '<script type="text/javascript">';
            htmlStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.dongtaiFile,"3")+'\', pic: \''+videoImagePath(item.dongtaiFile)+'\'}});';
            htmlStr += '</script>';
            htmlStr += '</div></div>';



        }else if(item.dongtaiFile != null && (item.dongtaiFile.search(".MP3") != -1 || item.dongtaiFile.search(".mp3") != -1 || item.dongtaiFile.search(".wav")  != -1 || item.dongtaiFile.search(".ogg")  != -1) ){
            /*//音频--隐藏原始播放器
            htmlStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.dongtaiFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
            htmlStr += '<div class="audio"   >';
            htmlStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
            htmlStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
            htmlStr += '</div>';
            htmlStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
            htmlStr += '</div>';*/

            htmlStr += '<div class="">';
            htmlStr += '<div class="weui-news-info padding0">';
            htmlStr += '<div class="weui-c-article l100">';
            htmlStr += '<div id="aplayer1'+item.id+'"></div>';
            htmlStr += '<script type="text/javascript">';
            htmlStr += 'const ap1'+item.id+' = new APlayer({';
            htmlStr += 'container: document.getElementById("aplayer1'+item.id+'"), mini: false, autoplay:false,preload:\'none\',';
            htmlStr += 'audio: [{name: \''+getFileName(item.dongtaiFile)+'\', artist: \'音频\', url: \''+checkPath(item.dongtaiFile,"3")+'\', cover: \'../../img/agent/head/yinpin.png\'';
            htmlStr += '}]';
            htmlStr += '});';
            htmlStr += '</script>';
            htmlStr += '</div>';
            htmlStr += '</div>';
            htmlStr += '</div>';


        }else if(item.dongtaiFile != null){
            htmlStr += '<a href="'+ checkPath(item.dongtaiFile,'3')+'" target="_blank">'+setNULL(getFileName(item.dongtaiFile))+'</a>';

        }

    }

    htmlStr += '</ul>';
    htmlStr += '</div>';
    htmlStr += '</div>';
    htmlStr += '</div>';
    htmlStr += '<div class="weui-news-info">';
    htmlStr += '<div class="weui-news-infoitem">';
    htmlStr += '<span class="weui-news-left" id="weui-news-left">';
    htmlStr += '<span class="weui-news-left" id="weui-news-left">';
    //htmlStr += '<div class="weui-label-list" style="margin-left: 0px;">';
    //console.log(item.linkType);

    if(localStorage.getItem("isdisshare") != '1'){




        if(item.dongtaiType == '1' && item.dongtaiFile != null){
            //图片

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","17"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("'+item.id+'&share='+localStorage.getItem('userId')+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';

        }
        else if(item.dongtaiType == '2' && item.dongtaiFile != null){
            //音频--隐藏原始播放器

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","17"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("'+item.id+'&share='+localStorage.getItem('userId')+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';

        }
        else if(item.dongtaiType == '3' && item.dongtaiFile != null){
            //视频--隐藏原始播放器
            if(item.price != null && item.price != '' && item.price != '0'){
                htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("'+item.id+'&share='+localStorage.getItem('userId')+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';
            }else{
                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","17"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("'+item.id+'&share='+localStorage.getItem('userId')+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';
            }


        }
        else if(item.dongtaiType == '4' && item.dongtaiFile != null){
            //文件--判断文件类型展示不同的图片

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","17"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("'+item.id+'&share='+localStorage.getItem('userId')+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';

        }
        else if(item.dongtaiType == '5' && item.dongtaiFile != null){
            //红包
            htmlStr += '<label class="label f-blue b-blue" onclick=toHongBaoDetail("'+item.hongbaoId+'&share='+localStorage.getItem('userId')+'","1"); > <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';

        }
        else if(item.dongtaiType == '6'){
            //console.log(item.linkType);
            //链接
//链接//linkType链接类型（1自定义链接2课程链接3圈子链接4圈子主题链接5工具链接6商品链接7问题链接8答案链接9短视频连接10信用卡链接11贷款链接12保险链接13基金证券链接14活动链接15投票链接16个人主页）
            if(item.linkType == '2'){

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toCourseDetail("'+item.linkAboutid+'","1")> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin,"1");
                htmlStr += '</label>';
                if(item.price == null || eval(item.price) == 0.00){
                    htmlStr += '<label class="label  f-red b-red" onclick=toCourseDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-gouwu f-red" id="icon30"></i>免费阅读'+getPriceMoney(item.price)+'</label>';
                }else{
                    htmlStr += '<label class="label  f-red b-red" onclick=toCourseDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-gouwu f-red" id="icon30"></i>限时购买'+getPriceMoney(item.price)+'</label>';
                }

            }else if(item.linkType == '3'){

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toQuanZiDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin,"1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toQuanZiDetail("'+item.linkAboutid+'","1");><i class="beauty icon-jiahao f-red" id="icon30"></i>加入圈子'+getPriceMoney(item.price)+'</label>';

            }else if(item.linkType == '4'){

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toTopicDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin,"1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toTopicDetail("'+item.linkAboutid+'","1");><i class="beauty icon-jiahao f-red" id="icon30"></i>加入圈子'+getPriceMoney(item.price)+'</label>';
            }else if(item.linkType == '5'){

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toToolDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin,"1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toToolDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1"); ><i class="beauty icon-gouwu f-red" id="icon30"></i>限时购买'+getPriceMoney(item.price)+'</label>';
            }else if(item.linkType == '6'){

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toProductDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin,"1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toProductDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-gouwu f-red" id="icon30"></i>限时购买'+getPriceMoney(item.price)+'</label>';
            }else if(item.linkType == '7'){

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toQuestionDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin,"1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toQuestionDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-shengyin f-red" id="icon30"></i>去围观</label>';
            }else if(item.linkType == '8'){

                /*htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';*/
                htmlStr += '<label class="label f-blue b-blue" onclick=toAnswerDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin,"1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toAnswerDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-shengyin f-red" id="icon30"></i>去围观</label>';
            }else if(item.linkType == '9'){
                htmlStr += '<label class="label f-blue b-blue" onclick=toDuanshipingDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';

                htmlStr += '</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            }else if(item.linkType == '10'){

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toAgentKaDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin,"1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toAgentKaDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-bianjibiaoge f-red" id="icon30"></i>去做单</label>';
            }else if(item.linkType == '11'){

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toAgentDaikuanDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin,"2");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toAgentDaikuanDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-bianjibiaoge f-red" id="icon30"></i>低息借</label>';

            }else if(item.linkType == '12'){

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toAgentBaoxianDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin,"2");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toAgentBaoxianDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-bianjibiaoge f-red" id="icon30"></i>去买保险</label>';
            }else if(item.linkType == '13'){

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toAgentJiJinDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin,"2");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toAgentJiJinDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-bianjibiaoge f-red" id="icon30"></i>去买基金</label>';

            }else if(item.linkType == '14'){

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue"  onclick=toActivityDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin,"1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toActivityDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-qunzu f-red" id="icon30"></i>去参加活动'+getPriceMoney(item.price)+'</label>';


            }else if(item.linkType == '19'){

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue"  onclick=toHuiYuanDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin,"1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toHuiYuanDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-qunzu f-red" id="icon30"></i>去买会员'+getPriceMoney(item.price)+'</label>';


            }else if(item.linkType == '15'){

            }else if(item.linkType == '16'){
                htmlStr += '<label class="label f-blue b-blue"> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
                htmlStr += '</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            }


        }
    }
    // htmlStr += '</div>';

    htmlStr += '</span>';
    htmlStr += '</span>';
    htmlStr += '</div>';
    htmlStr += '</div>';
    if(item.isTop == '1'){
        htmlStr += '<p class="time left0" onclick=toDongtaiDetail("'+item.id+'","1");><span style="color: red;">[置顶]</span>'+timeago(item.createDate)+' </p>';


    }else{
        htmlStr += '<p class="time left0" onclick=toDongtaiDetail("'+item.id+'","1");>'+timeago(item.createDate)+' </p>';

    }


    htmlStr += '<div class="weui-comment-li" >';
    htmlStr += '<span class="check checked" >';



    if(localStorage.getItem("shenheyuan") == '1'  ){
        htmlStr += '<i class="icon icon-72 weui-tabbar__icon" onclick=deletebyId("14","'+item.id+'") id="icon30"></i>';
        htmlStr += '<span onclick=deletebyId("14","'+item.id+'") class="weui-comment-num">删除</span>';

        htmlStr += '<i class="icon icon-116 weui-tabbar__icon" onclick=shenhedongTai("'+item.id+'") id="icon30"></i>';
        htmlStr += '<span onclick=shenhedongTai("'+item.id+'") class="weui-comment-num">通过</span>';
    }

    if(item.createBy.id == localStorage.getItem("userId") && item.linkType == '2'){
        htmlStr += '<i class="icon icon-116 weui-tabbar__icon" onclick=toBianjiCourse("'+item.linkAboutid+'","1") id="icon30"></i>';
        htmlStr += '<span onclick=toBianjiCourse("'+item.linkAboutid+'","1") class="weui-comment-num">编辑</span>';
    }

    htmlStr += '<i class="icon icon-38 weui-tabbar__icon" onclick=dianji("14","'+item.id+'") id="icon30"></i>';
    htmlStr += '<span class="weui-comment-num" id="zan'+item.id+'">'+setNum(item.dongtaiZan)+'</span>';


    htmlStr += '<i class="icon icon-79 weui-tabbar__icon" id="icon30" onclick=openCommentList("commentDisList","2","1",10,"'+item.id+'","14","'+item.createBy.id+'");></i>';
    htmlStr += '<span class="weui-comment-num" onclick=openCommentList("commentDisList","2","1",10,"'+item.id+'","14","'+item.createBy.id+'");>'+setNum(item.commentNum)+'</span>';
    htmlStr += '</span>';
    htmlStr += '</div>';
    htmlStr += '</li>';
    $("#listdongTai").append(htmlStr);
    /*$(".dplayer-controller").hide();//隐藏播放进度等信息
    $(".weui-btn").hide();
    $(".dplayer-notice").hide();//隐藏通知
    $(".dplayer-video-wrap").css("height","");*/
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
function renderTuWenMy(item) {
    //console.log(item.dongtaiContent);
    //console.log(item.createBy.id);
    var htmlStr = '';
    htmlStr += '<li class="weui-comment-item">';
    htmlStr += '<div class="userinfo" onclick=toUserHome("'+item.createBy.id+'","1");>';
    htmlStr += '<strong class="nickname"><span  class="nickname">'+item.createBy.nickname+'</span></strong>';
    htmlStr += '<img class="avatar shadowonly" src="'+ checkPath(item.createBy.headimgurl,'1')+'"/>';
    if(item.createBy.isV == '3'){
        htmlStr += '<span class="weui-badge" style="position: absolute;background-color:#f4a630;margin-top: -40px;margin-left: -20px;">V</span>';
    }
    htmlStr += '</div>';
    htmlStr += '<div class="weui-comment-msg" >';



    if(item.dongtaiType == '6'){

        //链接//linkType链接类型（1自定义链接2课程链接3圈子链接4圈子主题链接5工具链接6商品链接7问题链接8答案链接9短视频连接10信用卡链接11贷款链接12保险链接13基金证券链接14活动链接15投票链接16个人主页）
        if(item.linkType == '2'){
            htmlStr += '<p><span onclick=toCourseDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '3'){
            htmlStr += '<p><span onclick=toQuanZiDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
        }else if(item.linkType == '4'){
            htmlStr += '<p><span onclick=toTopicDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '5'){
            htmlStr += '<p><span onclick=toToolDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '6'){
            htmlStr += '<p><span onclick=toProductDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '7'){
            if(eval(setNum(item.dingyueprice)) > 0.00){
                htmlStr += '<p><span onclick=toQuestionDetail("'+item.linkAboutid+'","1"); ><span class="f-red">[<i class="beauty icon-hongbao f-red f16">￥'+item.dingyueprice+'</i>]</span>'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
            }else{
                htmlStr += '<p><span onclick=toQuestionDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
            }

        }else if(item.linkType == '8'){
            if(eval(setNum(item.dingyueprice)) > 0.00){
                htmlStr += '<p><span onclick=toAnswerDetail("'+item.linkAboutid+'","1"); ><span class="f-red">[<i class="beauty icon-hongbao f-red f16">￥'+item.dingyueprice+'</i>]</span>'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
            }else{
                htmlStr += '<p><span onclick=toAnswerDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
            }


        }else if(item.linkType == '9'){
            htmlStr += '<p><span onclick=toDuanshipingDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '10'){
            htmlStr += '<p><span onclick=toAgentKaDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '11'){
            htmlStr += '<p><span onclick=toAgentDaikuanDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '12'){
            htmlStr += '<p><span onclick=toAgentBaoxianDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '13'){
            htmlStr += '<p><span onclick=toAgentJiJinDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '14'){
            htmlStr += '<p><span onclick=toActivityDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '15'){

        }else if(item.linkType == '16'){
            htmlStr += '<p><span onclick=toUserHome("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '19'){
            htmlStr += '<p><span onclick=toHuiYuanDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }


    }else if(item.dongtaiType == '5'){
        htmlStr += '<p><span  onclick=toHongBaoDetail("'+item.hongbaoId+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
    }else{
        htmlStr += '<p><span onclick=toDongtaiDetail("'+item.id+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
    }



    htmlStr += '<div class="page-bd" >';
    htmlStr += '<div class="weui-feeds">';
    htmlStr += '<ul>';
    if(item.dongtaiType == '1' && item.dongtaiFile != null){
        //图片
        htmlStr += getImageContent(item.id,item.dongtaiFile);
    }
    else if(item.dongtaiType == '2' && item.dongtaiFile != null){
        //音频--隐藏原始播放器
        htmlStr += '<div class="page-bd center" id="audiostartA'+item.id+'my"  onclick=start("audiotest'+item.id+'my","'+checkPath(item.dongtaiFile,'3')+'","shifenmiao'+item.id+'my","audiostartA'+item.id+'my","audioIconA'+item.id+'my")>';
        htmlStr += '<div class="audio"   >';
        htmlStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'my"/></div>';
        htmlStr += '<div id="shifenmiao'+item.id+'my" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="disnone"><audio id="audiotest'+item.id+'my" src=""  controls="controls" preload="meta"> </audio></div>';
        htmlStr += '</div>';


        /* htmlStr += '<div class="page-bd-15">';
         htmlStr += '<div class="weui-news-info padding0">';
         htmlStr += '<div class="weui-c-article l100">';
         htmlStr += '<div id="aplayer1'+item.id+'"></div>';
         htmlStr += '<script type="text/javascript">';
         htmlStr += 'const ap1'+item.id+' = new APlayer({';
         htmlStr += 'container: document.getElementById("aplayer1'+item.id+'"), mini: false, autoplay:false,preload:\'none\',';
         htmlStr += 'audio: [{name: \'Music\', artist: \'音频\', url: \''+checkPath(item.dongtaiFile,"3")+'\', cover: \'../../img/agent/head/yinpin.png\'';
         htmlStr += '}]';
         htmlStr += '});';
         htmlStr += '</script>';
         htmlStr += '</div>';
         htmlStr += '</div>';
         htmlStr += '</div>';*/


    }
    else if(item.dongtaiType == '3' && item.dongtaiFile != null){

        //视频--隐藏原始播放器
        //if(checkPath(item.dongtaiFile,"3") != '文件已失效'){
        <!--视频播放-->
        htmlStr += '<div class="page-bd"><div class="weui-c-article" style="width: 86%;">';
        htmlStr += '<div id="dplayer2'+item.id+'my"  price="'+setNum(item.price)+'"      cre="'+item.createBy.id+'"></div>';
        htmlStr += '<script type="text/javascript">';
        htmlStr += 'const dp2'+item.id+'my = new DPlayer({container: document.getElementById("dplayer2'+item.id+'my"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.dongtaiFile,"3")+'\', pic: \''+videoImagePath(item.dongtaiFile)+'\'}});';

        htmlStr += '</script>';
        htmlStr += '</div></div>';
        //}else{
        //    htmlStr += '<div class="page-bd">文件已失效</div>';
        //}




    }
    else if(item.dongtaiType == '4' && item.dongtaiFile != null){
        //文件--判断文件类型展示不同的图片
        if(item.dongtaiFile.search(".jpeg") != -1 || item.dongtaiFile.search(".jpg") != -1 || item.dongtaiFile.search(".png") != -1 || item.dongtaiFile.search(".gif") != -1 || item.dongtaiFile.search(".GIF") != -1 ){
            htmlStr += getImageContent(item.id,item.dongtaiFile);
        }else if( item.dongtaiFile.search(".mp4") != -1 || item.dongtaiFile.search(".MP4") != -1 || item.dongtaiFile.search(".flv")  != -1 || item.dongtaiFile.search(".mov")  != -1 ){
            <!--视频播放-->
            //if(getBrowser() != 'wxmobile'){
            htmlStr += '<div class="page-bd"><div class="weui-c-article"  style="width: 86%;">';
            htmlStr += '<div id="dplayer2'+item.id+'my"  price="'+setNum(item.price)+'"      cre="'+item.createBy.id+'"></div>';
            htmlStr += '<script type="text/javascript">';
            htmlStr += 'const dp2'+item.id+'my = new DPlayer({container: document.getElementById("dplayer2'+item.id+'my"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.dongtaiFile,"3")+'\', pic: \''+videoImagePath(item.dongtaiFile)+'\'}});';
            htmlStr += '</script>';
            htmlStr += '</div></div>';



        }else if( item.dongtaiFile.search(".MP3") != -1 || item.dongtaiFile.search(".mp3") != -1 || item.dongtaiFile.search(".wav")  != -1 || item.dongtaiFile.search(".ogg")  != -1 ){
            /*//音频--隐藏原始播放器
            htmlStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.dongtaiFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
            htmlStr += '<div class="audio"   >';
            htmlStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
            htmlStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
            htmlStr += '</div>';
            htmlStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
            htmlStr += '</div>';*/


            htmlStr += '<div class="">';
            htmlStr += '<div class="weui-news-info padding0">';
            htmlStr += '<div class="weui-c-article l100">';
            htmlStr += '<div id="aplayer1'+item.id+'my"></div>';
            htmlStr += '<script type="text/javascript">';
            htmlStr += 'const ap1'+item.id+'my = new APlayer({';
            htmlStr += 'container: document.getElementById("aplayer1'+item.id+'my"), mini: false, autoplay:false,preload:\'none\',';
            htmlStr += 'audio: [{name: \''+getFileName(item.dongtaiFile)+'\', artist: \'音频\', url: \''+checkPath(item.dongtaiFile,"3")+'\', cover: \'../../img/agent/head/yinpin.png\'';
            htmlStr += '}]';
            htmlStr += '});';
            htmlStr += '</script>';
            htmlStr += '</div>';
            htmlStr += '</div>';
            htmlStr += '</div>';


        }else{
            htmlStr += '<a href="'+ checkPath(item.dongtaiFile,'3')+'" target="_blank">'+setNULL(getFileName(item.dongtaiFile))+'</a>';

        }
    }
    else if(item.dongtaiType == '5' && item.dongtaiFile != null){
        //红包
        htmlStr += '<div class="weui-feeds" ><lottie-player  onclick=toHongBaoDetail("'+item.hongbaoId+'","1"); src="../../img/agent/json/hongbao.json"  background="transparent"  speed="1"  style="width:173px; height: 286px;"  loop autoplay ></lottie-player></div>';
        //htmlStr += '<div class="weui-feeds"><img onclick=toHongBaoDetail("'+item.hongbaoId+'","1");  width="173px" height="286px" src="'+ checkPath(item.dongtaiFile,'1')+'"></div>';
    }
    else if(item.dongtaiType == '6'){
        //链接

        //链接

        //文件--判断文件类型展示不同的图片
        if(item.dongtaiFile != null && (item.dongtaiFile.search(".jpeg") != -1 || item.dongtaiFile.search(".jpg") != -1 || item.dongtaiFile.search(".png") != -1 || item.dongtaiFile.search(".gif") != -1 || item.dongtaiFile.search(".GIF") != -1 )){
            htmlStr += getImageContent(item.id,item.dongtaiFile);
        }else if(item.dongtaiFile != null && (item.dongtaiFile.search(".mp4") != -1 || item.dongtaiFile.search(".MP4") != -1 || item.dongtaiFile.search(".flv")  != -1 || item.dongtaiFile.search(".mov")  != -1 )){
            <!--视频播放-->
            //if(getBrowser() != 'wxmobile'){
            htmlStr += '<div class="page-bd"><div class="weui-c-article"  style="width: 86%;">';
            htmlStr += '<div id="dplayer2'+item.id+'my"  price="'+setNum(item.price)+'"      cre="'+item.createBy.id+'"></div>';
            htmlStr += '<script type="text/javascript">';
            htmlStr += 'const dp2'+item.id+'my = new DPlayer({container: document.getElementById("dplayer2'+item.id+'my"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.dongtaiFile,"3")+'\', pic: \''+videoImagePath(item.dongtaiFile)+'\'}});';
            htmlStr += '</script>';
            htmlStr += '</div></div>';



        }else if(item.dongtaiFile != null && (item.dongtaiFile.search(".MP3") != -1 || item.dongtaiFile.search(".mp3") != -1 || item.dongtaiFile.search(".wav")  != -1 || item.dongtaiFile.search(".ogg")  != -1) ){
            /*//音频--隐藏原始播放器
            htmlStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.dongtaiFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
            htmlStr += '<div class="audio"   >';
            htmlStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
            htmlStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
            htmlStr += '</div>';
            htmlStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
            htmlStr += '</div>';*/

            htmlStr += '<div class="">';
            htmlStr += '<div class="weui-news-info padding0">';
            htmlStr += '<div class="weui-c-article l100">';
            htmlStr += '<div id="aplayer1'+item.id+'my"></div>';
            htmlStr += '<script type="text/javascript">';
            htmlStr += 'const ap1'+item.id+'my = new APlayer({';
            htmlStr += 'container: document.getElementById("aplayer1'+item.id+'my"), mini: false, autoplay:false,preload:\'none\',';
            htmlStr += 'audio: [{name: \''+getFileName(item.dongtaiFile)+'\', artist: \'音频\', url: \''+checkPath(item.dongtaiFile,"3")+'\', cover: \'../../img/agent/head/yinpin.png\'';
            htmlStr += '}]';
            htmlStr += '});';
            htmlStr += '</script>';
            htmlStr += '</div>';
            htmlStr += '</div>';
            htmlStr += '</div>';


        }else if(item.dongtaiFile != null){
            htmlStr += '<a href="'+ checkPath(item.dongtaiFile,'3')+'" target="_blank">'+setNULL(getFileName(item.dongtaiFile))+'</a>';

        }

    }

    htmlStr += '</ul>';
    htmlStr += '</div>';
    htmlStr += '</div>';
    htmlStr += '</div>';
    htmlStr += '<div class="weui-news-info">';
    htmlStr += '<div class="weui-news-infoitem">';
    htmlStr += '<span class="weui-news-left" id="weui-news-left">';
    htmlStr += '<span class="weui-news-left" id="weui-news-left">';
    //htmlStr += '<div class="weui-label-list" style="margin-left: 0px;">';
    //console.log(item.linkType);
    if(localStorage.getItem("isdisshare") != '1') {

        if (item.dongtaiType == '1' && item.dongtaiFile != null) {
            //图片

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","17"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("' + item.id + '&share=' + localStorage.getItem('userId') + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';

        }
        else if (item.dongtaiType == '2' && item.dongtaiFile != null) {
            //音频--隐藏原始播放器

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","17"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("' + item.id + '&share=' + localStorage.getItem('userId') + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';

        }
        else if (item.dongtaiType == '3' && item.dongtaiFile != null) {
            //视频--隐藏原始播放器
            if (item.price != null && item.price != '' && item.price != '0') {
                htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("' + item.id + '&share=' + localStorage.getItem('userId') + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';
            } else {
                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","17"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("' + item.id + '&share=' + localStorage.getItem('userId') + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';
            }


        }
        else if (item.dongtaiType == '4' && item.dongtaiFile != null) {
            //文件--判断文件类型展示不同的图片

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","17"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("' + item.id + '&share=' + localStorage.getItem('userId') + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';

        }
        else if (item.dongtaiType == '5' && item.dongtaiFile != null) {
            //红包
            htmlStr += '<label class="label f-blue b-blue" onclick=toHongBaoDetail("' + item.hongbaoId + '&share=' + localStorage.getItem('userId') + '","1"); > <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';

        }
        else if (item.dongtaiType == '6') {
            //console.log(item.linkType);
            //链接
//链接//linkType链接类型（1自定义链接2课程链接3圈子链接4圈子主题链接5工具链接6商品链接7问题链接8答案链接9短视频连接10信用卡链接11贷款链接12保险链接13基金证券链接14活动链接15投票链接16个人主页）
            if (item.linkType == '2') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toCourseDetail("' + item.linkAboutid + '","1")> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin, "1");
                htmlStr += '</label>';
                if (item.price == null || eval(item.price) == 0.00) {
                    htmlStr += '<label class="label  f-red b-red" onclick=toCourseDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-gouwu f-red" id="icon30"></i>免费阅读' + getPriceMoney(item.price) + '</label>';
                } else {
                    htmlStr += '<label class="label  f-red b-red" onclick=toCourseDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-gouwu f-red" id="icon30"></i>限时购买' + getPriceMoney(item.price) + '</label>';
                }

            } else if (item.linkType == '3') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toQuanZiDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toQuanZiDetail("' + item.linkAboutid + '","1");><i class="beauty icon-jiahao f-red" id="icon30"></i>加入圈子' + getPriceMoney(item.price) + '</label>';

            } else if (item.linkType == '4') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toTopicDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toTopicDetail("' + item.linkAboutid + '","1");><i class="beauty icon-jiahao f-red" id="icon30"></i>加入圈子' + getPriceMoney(item.price) + '</label>';
            } else if (item.linkType == '5') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toToolDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toToolDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1"); ><i class="beauty icon-gouwu f-red" id="icon30"></i>限时购买' + getPriceMoney(item.price) + '</label>';
            } else if (item.linkType == '6') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toProductDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toProductDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-gouwu f-red" id="icon30"></i>限时购买' + getPriceMoney(item.price) + '</label>';
            } else if (item.linkType == '7') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toQuestionDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toQuestionDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-shengyin f-red" id="icon30"></i>去围观</label>';
            } else if (item.linkType == '8') {

                /*htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';*/
                htmlStr += '<label class="label f-blue b-blue" onclick=toAnswerDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toAnswerDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-shengyin f-red" id="icon30"></i>去围观</label>';
            } else if (item.linkType == '9') {
                htmlStr += '<label class="label f-blue b-blue" onclick=toDuanshipingDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';

                htmlStr += '</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            } else if (item.linkType == '10') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toAgentKaDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toAgentKaDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-bianjibiaoge f-red" id="icon30"></i>去做单</label>';
            } else if (item.linkType == '11') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toAgentDaikuanDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin, "2");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toAgentDaikuanDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-bianjibiaoge f-red" id="icon30"></i>低息借</label>';

            } else if (item.linkType == '12') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toAgentBaoxianDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin, "2");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toAgentBaoxianDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-bianjibiaoge f-red" id="icon30"></i>去买保险</label>';
            } else if (item.linkType == '13') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toAgentJiJinDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin, "2");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toAgentJiJinDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-bianjibiaoge f-red" id="icon30"></i>去买基金</label>';

            } else if (item.linkType == '14') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue"  onclick=toActivityDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toActivityDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-qunzu f-red" id="icon30"></i>去参加活动' + getPriceMoney(item.price) + '</label>';


            } else if (item.linkType == '19') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue"  onclick=toHuiYuanDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>';
                htmlStr += getYongjinMoneyXin(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toHuiYuanDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-qunzu f-red" id="icon30"></i>去买会员' + getPriceMoney(item.price) + '</label>';


            } else if (item.linkType == '15') {

            } else if (item.linkType == '16') {
                htmlStr += '<label class="label f-blue b-blue"> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
                htmlStr += '</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            }


        }
    }
    // htmlStr += '</div>';

    htmlStr += '</span>';
    htmlStr += '</span>';
    htmlStr += '</div>';
    htmlStr += '</div>';
    if(item.isTop == '1'){
        htmlStr += '<p class="time left0" onclick=toDongtaiDetail("'+item.id+'","1");><span style="color: red;">[置顶]</span>'+timeago(item.createDate)+' </p>';


    }else{
        htmlStr += '<p class="time left0" onclick=toDongtaiDetail("'+item.id+'","1");>'+timeago(item.createDate)+' </p>';

    }


    htmlStr += '<div class="weui-comment-li" >';
    htmlStr += '<span class="check checked" >';



    if(item.createBy.id == localStorage.getItem("userId")  ){
        htmlStr += '<i class="icon icon-72 weui-tabbar__icon" onclick=deletebyId("14","'+item.id+'") id="icon30"></i>';
        htmlStr += '<span onclick=deletebyId("14","'+item.id+'") class="weui-comment-num">删除</span>';
    }

    if(item.createBy.id == localStorage.getItem("userId") && item.linkType == '2'){
        htmlStr += '<i class="icon icon-116 weui-tabbar__icon" onclick=toBianjiCourse("'+item.linkAboutid+'","1") id="icon30"></i>';
        htmlStr += '<span onclick=toBianjiCourse("'+item.linkAboutid+'","1") class="weui-comment-num">编辑</span>';
    }

    htmlStr += '<i class="icon icon-38 weui-tabbar__icon" onclick=dianji("14","'+item.id+'") id="icon30"></i>';
    htmlStr += '<span class="weui-comment-num" id="zan'+item.id+'">'+setNum(item.dongtaiZan)+'</span>';


    htmlStr += '<i class="icon icon-79 weui-tabbar__icon" id="icon30" onclick=openCommentList("commentDisList","2","1",10,"'+item.id+'","14","'+item.createBy.id+'");></i>';
    htmlStr += '<span class="weui-comment-num" onclick=openCommentList("commentDisList","2","1",10,"'+item.id+'","14","'+item.createBy.id+'");>'+setNum(item.commentNum)+'</span>';
    htmlStr += '</span>';
    htmlStr += '</div>';
    htmlStr += '</li>';
    $("#listdongTai2").append(htmlStr);
    /*$(".dplayer-controller").hide();//隐藏播放进度等信息
    $(".weui-btn").hide();
    $(".dplayer-notice").hide();//隐藏通知
    $(".dplayer-video-wrap").css("height","");*/
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


function renderRmwdTuWen(item) {
    //console.log(item.dongtaiContent);
    //console.log(item.createBy.id);
    var htmlStr = '';
    htmlStr += '<li class="weui-comment-item">';
    htmlStr += '<div class="userinfo" onclick=toUserHome("'+item.createBy.id+'","1");>';
    htmlStr += '<strong class="nickname"><span  class="nickname">'+item.createBy.nickname+'</span></strong>';
    htmlStr += '<img class="avatar shadowonly" src="'+ checkPath(item.createBy.headimgurl,'1')+'"/>';
    if(item.createBy.isV == '3'){
        htmlStr += '<span class="weui-badge" style="position: absolute;background-color:#f4a630;margin-top: -40px;margin-left: -20px;">V</span>';
    }
    htmlStr += '</div>';
    htmlStr += '<div class="weui-comment-msg" >';

    if(item.dongtaiType == '6'){

        //链接//linkType链接类型（1自定义链接2课程链接3圈子链接4圈子主题链接5工具链接6商品链接7问题链接8答案链接9短视频连接10信用卡链接11贷款链接12保险链接13基金证券链接14活动链接15投票链接16个人主页）
        if(item.linkType == '2'){
            htmlStr += '<p><span onclick=toCourseDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '3'){
            htmlStr += '<p><span onclick=toQuanZiDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
        }else if(item.linkType == '4'){
            htmlStr += '<p><span onclick=toTopicDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '5'){
            htmlStr += '<p><span onclick=toToolDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '6'){
            htmlStr += '<p><span onclick=toProductDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '7'){
            if(eval(setNum(item.dingyueprice)) > 0.00) {
                htmlStr += '<p><span onclick=toQuestionDetail("' + item.linkAboutid + '","1"); ><span class="f-red">[<i class="beauty icon-hongbao f-red f14"></i>￥'+item.dingyueprice+']</span>' + item.dongtaiContent + '</span><span>' + setNULL(item.remarks) + '</span></p>';
            }else{
                htmlStr += '<p><span onclick=toQuestionDetail("' + item.linkAboutid + '","1"); >' + item.dongtaiContent + '</span><span>' + setNULL(item.remarks) + '</span></p>';
            }

        }else if(item.linkType == '8'){
            if(eval(setNum(item.dingyueprice)) > 0.00){
                htmlStr += '<p><span onclick=toAnswerDetail("'+item.linkAboutid+'","1"); ><span class="f-red">[<i class="beauty icon-hongbao f-red f14"></i>￥'+item.dingyueprice+']</span>'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
            }else{
                htmlStr += '<p><span onclick=toAnswerDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
            }

        }else if(item.linkType == '9'){
            htmlStr += '<p><span onclick=toDuanshipingDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '10'){
            htmlStr += '<p><span onclick=toAgentKaDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '11'){
            htmlStr += '<p><span onclick=toAgentDaikuanDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '12'){
            htmlStr += '<p><span onclick=toAgentBaoxianDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '13'){
            htmlStr += '<p><span onclick=toAgentJiJinDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '14'){
            htmlStr += '<p><span onclick=toActivityDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '15'){

        }else if(item.linkType == '16'){
            htmlStr += '<p><span onclick=toUserHome("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }else if(item.linkType == '19'){
            htmlStr += '<p><span onclick=toHuiYuanDetail("'+item.linkAboutid+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';

        }


    }else{
        htmlStr += '<p><span onclick=toDongtaiDetail("'+item.id+'","1"); >'+item.dongtaiContent+'</span><span>'+setNULL(item.remarks)+'</span></p>';
    }



    htmlStr += '<div class="page-bd" >';
    htmlStr += '<div class="weui-feeds">';
    htmlStr += '<ul>';
    if(item.dongtaiType == '1' && item.dongtaiFile != null){
        //图片
        htmlStr += getImageContent(item.id,item.dongtaiFile);
    }
    else if(item.dongtaiType == '2' && item.dongtaiFile != null){
        //音频--隐藏原始播放器
        htmlStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.dongtaiFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
        htmlStr += '<div class="audio"   >';
        htmlStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
        htmlStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
        htmlStr += '</div>';



    }
    else if(item.dongtaiType == '3' && item.dongtaiFile != null){

        //视频--隐藏原始播放器

        <!--视频播放-->
        htmlStr += '<div class="page-bd"><div class="weui-c-article">';
        htmlStr += '<div id="dplayer2'+item.id+'"  price="'+setNum(item.price)+'"      cre="'+item.createBy.id+'" ></div>';
        htmlStr += '<script type="text/javascript">';
        htmlStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.dongtaiFile,"3")+'\', pic: \''+videoImagePath(item.dongtaiFile)+'\'}});';

        htmlStr += '</script>';
        htmlStr += '</div></div>';



    }
    else if(item.dongtaiType == '4' && item.dongtaiFile != null){
        //文件--判断文件类型展示不同的图片
        if(item.dongtaiFile.search(".jpeg") != -1 || item.dongtaiFile.search(".jpg") != -1 || item.dongtaiFile.search(".png") != -1 || item.dongtaiFile.search(".gif") != -1 || item.dongtaiFile.search(".GIF") != -1 ){
            htmlStr += getImageContent(item.id,item.dongtaiFile);
        }else if( item.dongtaiFile.search(".mp4") != -1 || item.dongtaiFile.search(".MP4") != -1 || item.dongtaiFile.search(".flv")  != -1 || item.dongtaiFile.search(".mov")  != -1 ){
            <!--视频播放-->
            //if(getBrowser() != 'wxmobile'){
            htmlStr += '<div class="page-bd"><div class="weui-c-article">';
            htmlStr += '<div id="dplayer2'+item.id+'"  price="'+setNum(item.price)+'"      cre="'+item.createBy.id+'"></div>';
            htmlStr += '<script type="text/javascript">';
            htmlStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.dongtaiFile,"3")+'\', pic: \''+videoImagePath(item.dongtaiFile)+'\'}});';
            htmlStr += '</script>';
            htmlStr += '</div></div>';



        }else if( item.dongtaiFile.search(".MP3") != -1 || item.dongtaiFile.search(".mp3") != -1 || item.dongtaiFile.search(".wav")  != -1 || item.dongtaiFile.search(".ogg")  != -1 ){
            //音频--隐藏原始播放器
            htmlStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.dongtaiFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
            htmlStr += '<div class="audio"   >';
            htmlStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
            htmlStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
            htmlStr += '</div>';
            htmlStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
            htmlStr += '</div>';
        }else{
            htmlStr += '<a href="'+ checkPath(item.dongtaiFile,'3')+'" target="_blank">'+setNULL(getFileName(item.dongtaiFile))+'</a>';

        }
    }
    else if(item.dongtaiType == '5' && item.dongtaiFile != null){
        //红包
        htmlStr += '<div class="weui-feeds"><img onclick=toHongBaoDetail("'+item.hongbaoId+'","1");  width="173px" height="286px" src="'+ checkPath(item.dongtaiFile,'1')+'"></div>';
    }
    else if(item.dongtaiType == '6'){
        //链接

        //链接

        //文件--判断文件类型展示不同的图片
        if(item.dongtaiFile.search(".jpeg") != -1 || item.dongtaiFile.search(".jpg") != -1 || item.dongtaiFile.search(".png") != -1 || item.dongtaiFile.search(".gif") != -1 || item.dongtaiFile.search(".GIF") != -1 ){
            htmlStr += getImageContent(item.id,item.dongtaiFile);
        }else if( item.dongtaiFile.search(".mp4") != -1 || item.dongtaiFile.search(".MP4") != -1 || item.dongtaiFile.search(".flv")  != -1 || item.dongtaiFile.search(".mov")  != -1 ){
            <!--视频播放-->
            //if(getBrowser() != 'wxmobile'){
            htmlStr += '<div class="page-bd"><div class="weui-c-article"  style="width: 86%;">';
            htmlStr += '<div id="dplayer2'+item.id+'"  price="'+setNum(item.price)+'"      cre="'+item.createBy.id+'"></div>';
            htmlStr += '<script type="text/javascript">';
            htmlStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.dongtaiFile,"3")+'\', pic: \''+videoImagePath(item.dongtaiFile)+'\'}});';
            htmlStr += '</script>';
            htmlStr += '</div></div>';



        }else if( item.dongtaiFile.search(".MP3") != -1 || item.dongtaiFile.search(".mp3") != -1 || item.dongtaiFile.search(".wav")  != -1 || item.dongtaiFile.search(".ogg")  != -1 ){
            //音频--隐藏原始播放器
            htmlStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.dongtaiFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
            htmlStr += '<div class="audio"   >';
            htmlStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
            htmlStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
            htmlStr += '</div>';
            htmlStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
            htmlStr += '</div>';
        }else{
            htmlStr += '<a href="'+ checkPath(item.dongtaiFile,'3')+'" target="_blank">'+setNULL(getFileName(item.dongtaiFile))+'</a>';

        }

    }

    htmlStr += '</ul>';
    htmlStr += '</div>';
    htmlStr += '</div>';
    htmlStr += '</div>';
    htmlStr += '<div class="weui-news-info">';
    htmlStr += '<div class="weui-news-infoitem">';
    htmlStr += '<span class="weui-news-left" id="weui-news-left">';
    htmlStr += '<span class="weui-news-left" id="weui-news-left">';
    //htmlStr += '<div class="weui-label-list" style="margin-left: 0px;">';
    //console.log(item.linkType);
    if(localStorage.getItem("isdisshare") != '1') {
        if (item.dongtaiType == '1' && item.dongtaiFile != null) {
            //图片

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","17"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("' + item.id + '&share=' + localStorage.getItem('userId') + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';

        }
        else if (item.dongtaiType == '2' && item.dongtaiFile != null) {
            //音频--隐藏原始播放器

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","17"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("' + item.id + '&share=' + localStorage.getItem('userId') + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';

        }
        else if (item.dongtaiType == '3' && item.dongtaiFile != null) {
            //视频--隐藏原始播放器

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","17"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("' + item.id + '&share=' + localStorage.getItem('userId') + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';

        }
        else if (item.dongtaiType == '4' && item.dongtaiFile != null) {
            //文件--判断文件类型展示不同的图片

            htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","17"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            htmlStr += '<label class="label f-blue b-blue" onclick=toDongtaiDetail("' + item.id + '&share=' + localStorage.getItem('userId') + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';

        }
        else if (item.dongtaiType == '5' && item.dongtaiFile != null) {
            //红包
            htmlStr += '<label class="label f-blue b-blue" onclick=toHongBaoDetail("' + item.hongbaoId + '&share=' + localStorage.getItem('userId') + '","1"); > <i class="beauty icon-fenxiang f-green" id="icon30"></i> 分享</label>';

        }
        else if (item.dongtaiType == '6') {
            //console.log(item.linkType);
            //链接
//链接//linkType链接类型（1自定义链接2课程链接3圈子链接4圈子主题链接5工具链接6商品链接7问题链接8答案链接9短视频连接10信用卡链接11贷款链接12保险链接13基金证券链接14活动链接15投票链接16个人主页）
            if (item.linkType == '2') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toCourseDetail("' + item.linkAboutid + '","1")> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
                htmlStr += getYongjinMoney(item.yongjin, "1");
                htmlStr += '</label>';
                if (item.price == null || eval(item.price) == 0.00) {
                    htmlStr += '<label class="label  f-red b-red" onclick=toCourseDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-gouwu f-red" id="icon30"></i>免费阅读' + getPriceMoney(item.price) + '</label>';
                } else {
                    htmlStr += '<label class="label  f-red b-red" onclick=toCourseDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-gouwu f-red" id="icon30"></i>限时购买' + getPriceMoney(item.price) + '</label>';
                }

            } else if (item.linkType == '3') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toQuanZiDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
                htmlStr += getYongjinMoney(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toQuanZiDetail("' + item.linkAboutid + '","1");><i class="beauty icon-jiahao f-red" id="icon30"></i>加入圈子' + getPriceMoney(item.price) + '</label>';

            } else if (item.linkType == '4') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toTopicDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
                htmlStr += getYongjinMoney(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toTopicDetail("' + item.linkAboutid + '","1");><i class="beauty icon-jiahao f-red" id="icon30"></i>加入圈子' + getPriceMoney(item.price) + '</label>';
            } else if (item.linkType == '5') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toToolDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
                htmlStr += getYongjinMoney(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toToolDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1"); ><i class="beauty icon-gouwu f-red" id="icon30"></i>限时购买' + getPriceMoney(item.price) + '</label>';
            } else if (item.linkType == '6') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toProductDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
                htmlStr += getYongjinMoney(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toProductDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-gouwu f-red" id="icon30"></i>限时购买' + getPriceMoney(item.price) + '</label>';
            } else if (item.linkType == '7') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toQuestionDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
                htmlStr += getYongjinMoney(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toQuestionDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-shengyin f-red" id="icon30"></i>去围观</label>';
            } else if (item.linkType == '8') {

                /*htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';*/
                htmlStr += '<label class="label f-blue b-blue" onclick=toAnswerDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
                htmlStr += getYongjinMoney(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toAnswerDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-shengyin f-red" id="icon30"></i>去围观</label>';
            } else if (item.linkType == '9') {
                htmlStr += '<label class="label f-blue b-blue" onclick=toDuanshipingDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';

                htmlStr += '</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            } else if (item.linkType == '10') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toAgentKaDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
                htmlStr += getYongjinMoney(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toAgentKaDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-bianjibiaoge f-red" id="icon30"></i>申请信用卡</label>';
            } else if (item.linkType == '11') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toAgentDaikuanDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
                htmlStr += getYongjinMoney(item.yongjin, "2");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toAgentDaikuanDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-bianjibiaoge f-red" id="icon30"></i>低息借</label>';

            } else if (item.linkType == '12') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toAgentBaoxianDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
                htmlStr += getYongjinMoney(item.yongjin, "2");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toAgentBaoxianDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-bianjibiaoge f-red" id="icon30"></i>去买保险</label>';
            } else if (item.linkType == '13') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=toAgentJiJinDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
                htmlStr += getYongjinMoney(item.yongjin, "2");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toAgentJiJinDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-bianjibiaoge f-red" id="icon30"></i>去买基金</label>';

            } else if (item.linkType == '14') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue"  onclick=toActivityDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
                htmlStr += getYongjinMoney(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toActivityDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-qunzu f-red" id="icon30"></i>去参加活动' + getPriceMoney(item.price) + '</label>';


            } else if (item.linkType == '19') {

                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
                htmlStr += '<label class="label f-blue b-blue"  onclick=toHuiYuanDetail("' + item.linkAboutid + '","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
                htmlStr += getYongjinMoney(item.yongjin, "1");
                htmlStr += '</label>';
                htmlStr += '<label class="label  f-red b-red" onclick=toHuiYuanDetail("' + item.linkAboutid + '&share=' + localStorage.getItem('userId') + '","1");><i class="beauty icon-qunzu f-red" id="icon30"></i>去买会员' + getPriceMoney(item.price) + '</label>';


            } else if (item.linkType == '15') {

            } else if (item.linkType == '16') {
                htmlStr += '<label class="label f-blue b-blue"> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
                htmlStr += '</label>';
                htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","' + item.id + '","' + item.createBy.id + '","' + item.linkType + '"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';
            }


        }
    }
    // htmlStr += '</div>';

    htmlStr += '</span>';
    htmlStr += '</span>';
    htmlStr += '</div>';
    htmlStr += '</div>';
    htmlStr += '<p class="time left0" onclick=toDongtaiDetail("'+item.id+'","1");>'+timeago(item.createDate)+' </p>';
    htmlStr += '<div class="weui-comment-li" >';
    htmlStr += '<span class="check checked" >';

    /*if(item.createBy.id == localStorage.getItem("userId")){
        htmlStr += '<i class="icon icon-72 weui-tabbar__icon" onclick=deletebyId("14","'+item.id+'") id="icon30"></i>';
        htmlStr += '<span onclick=deletebyId("14","'+item.id+'") class="weui-comment-num">删除</span>';
    }*/

    htmlStr += '<i class="icon icon-38 weui-tabbar__icon" onclick=dianji("14","'+item.id+'") id="icon30"></i>';
    htmlStr += '<span class="weui-comment-num" id="zan2a'+item.id+'">'+setNum(item.dongtaiZan)+'</span>';


    htmlStr += '<i class="icon icon-79 weui-tabbar__icon" id="icon30" onclick=openCommentList("commentDisList","2","1",10,"'+item.id+'","14","'+item.createBy.id+'");></i>';
    htmlStr += '<span class="weui-comment-num" onclick=openCommentList("commentDisList","2","1",10,"'+item.id+'","14","'+item.createBy.id+'");>'+setNum(item.commentNum)+'</span>';
    htmlStr += '</span>';
    htmlStr += '</div>';
    htmlStr += '</li>';
    $("#listdongTai2").append(htmlStr);
    $("#dislistdongTai2").show();
    /*$(".dplayer-controller").hide();//隐藏播放进度等信息
    $(".weui-btn").hide();
    $(".dplayer-notice").hide();//隐藏通知
    $(".dplayer-video-wrap").css("height","");*/
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



//获取列表数据
function listdongTaiRmwdOnly(){

    //参数
    var dongtaiType = $("#dongtaiType").val();
    var dongtaiFile = $("#dongtaiFile").val();
    var dongtaiLink = $("#dongtaiLink").val();
    var linkType = $("#linkType").val();
    var dongtaiContent = $("#dongtaiContent").val();
    var pageNo = $("#listdongTairmwdPageNo").val();
    var dongtairemarks = $("#dongtairemarks2").val();
    var bdType = $("#bdTypeValue").val();
    var bdHangye = $("#bdHangyeValue").val();
    var questionId = GetUrlString("id");
    //传输数据
    var datadongTai = {
        "dongtaiType":dongtaiType,
        "dongtaiFile":dongtaiFile,
        "dongtaiLink":dongtaiLink,
        "zhaunfaFrom":questionId,
        "linkType":linkType,
        "remarks":dongtairemarks,
        "dongtaiContent":dongtaiContent,
        "inUser":getShareId(),
        "userId":GetUrlString('id'),
        "pageSize":10,
        "bdType":bdType,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "bdHangye":bdHangye,
        "pageNo":pageNo
    }

    instancedongTai({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/dongtai/dongTai/list',
        data: datadongTai,
        cancelToken: sourcedongTai.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            listdongTaiRmwdOnlyRender(rs.data);
        }else{
            console.log('请求异常！')
        }
    });

}

//列表渲染
function listdongTaiRmwdOnlyRender(data){
    var listdongTaiStr = '';
    if(data.code == '0'){
        if( data.result == null || data.result == '' || data.result == '[]'){
            $(".weui-toast--text").hide();$.toast("没有更多了", "text");
        }else{
            $.each(data.result,function(i,item){
                //发红包引流--//发布-文字-文字图片-文字音频（是否微信中）-文字视频（自动同步到短视频中-可选择）-文字文件--文字红包（VIP）--文字链接（自定义-VIP可以发）
                //处理好-点赞（可以无限点赞）-评论（链接类型的动态都可以进行评论（可以评论-动态列表的评论点开评论弹出评论列表）-可以展示最新三条评论--可以进行语音、文字、图片评论）-分享（是否在微信内-弹出加价和选择分享模式--如果不需要加价则不显示-但是后台要去处理到分享表里面--有佣金的分享按钮里面展示佣金金额）-转发（弹出输入内容可选择直接转发和输入内容--只有付费会员才可以转发自定义链接）
                //各种链接--自定义链接只有付费会员才可以发--只有付费会员才可以转发自定义链接--产品链接展示价格和购买按钮（信用卡只展示申请按钮及分享按钮）-也展示推广可得佣金分享按钮里面可以展示推广佣金
                //处理好图片显示（最多9个）-视频显示（判断尺寸）-音频显示（判断是语音还是mp3--不判断直接隐藏自带的播放器样式-改成语音的形式）-文件显示（默认文件样式：区分常见的）-红包显示（显示红包及红包状态）
                //console.log(i, item);
                renderRmwdOnlyTuWen(item);
            });
        }
    }else{
        $.toast(data.msg, "text");
    }
}


function renderRmwdOnlyTuWen(item) {
    //console.log(item.dongtaiContent);
    //console.log(item.createBy.id);
    var htmlStr = '';
    htmlStr += '<li class="weui-comment-item">';
    htmlStr += '<div class="userinfo" onclick=toUserHome("'+item.createBy.id+'","1");>';
    htmlStr += '<strong class="nickname"><span  class="nickname">'+item.createBy.nickname+'</span></strong>';
    htmlStr += '<img class="avatar shadowonly" src="'+ checkPath(item.createBy.headimgurl,'1')+'"/>';
    if(item.createBy.isV == '3'){
        htmlStr += '<span class="weui-badge" style="position: absolute;background-color:#f4a630;margin-top: -40px;margin-left: -20px;">V</span>';
    }
    htmlStr += '</div>';
    htmlStr += '<div class="weui-comment-msg" >';

    if(item.dongtaiType == '6'){

        //链接//linkType链接类型（1自定义链接2课程链接3圈子链接4圈子主题链接5工具链接6商品链接7问题链接8答案链接9短视频连接10信用卡链接11贷款链接12保险链接13基金证券链接14活动链接15投票链接16个人主页）
        if(item.linkType == '8'){
            htmlStr += '<p><span onclick=toAnswerDetail("'+item.linkAboutid+'","1"); >'+setNULL(item.answer.answerContent)+'</span><span>'+setNULL(item.remarks)+'</span></p>';
        }


    }

    if(item.createBy.id == localStorage.getItem("userId") || item.isBuy == '1'){

        htmlStr += '<div class="page-bd" >';
        htmlStr += '<div class="weui-feeds">';
        htmlStr += '<ul>';
        if(item.dongtaiType == '6'){
            //链接

            if(item.answer.contentType == '1' && item.answer.answerFile != null){
                //图片
                htmlStr += getImageContent(item.id,item.answer.answerFile);
            }
            else if(item.answer.contentType == '2' && item.answer.answerFile != null){
                //音频--隐藏原始播放器
                htmlStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.answer.answerFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
                htmlStr += '<div class="audio"   >';
                htmlStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
                htmlStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                htmlStr += '</div>';
                htmlStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
                htmlStr += '</div>';



            }
            else if(item.answer.contentType == '3' && item.answer.answerFile != null){

                //视频--隐藏原始播放器

                <!--视频播放-->
                htmlStr += '<div class="page-bd"><div class="weui-c-article"  style="width: 86%;">';
                htmlStr += '<div id="dplayer2'+item.id+'" ></div>';
                htmlStr += '<script type="text/javascript">';
                htmlStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.answer.answerFile,"3")+'\', pic: \''+videoImagePath(item.answer.answerFile)+'\'}});';

                htmlStr += '</script>';
                htmlStr += '</div></div>';



            }
            else if(item.answer.contentType == '4' && item.answer.answerFile != null){
                //文件--判断文件类型展示不同的图片
                if(item.answer.answerFile.search(".jpeg") != -1 || item.answer.answerFile.search(".jpg") != -1 || item.answer.answerFile.search(".png") != -1 || item.answer.answerFile.search(".gif") != -1 || item.answer.answerFile.search(".GIF") != -1 ){
                    htmlStr += getImageContent(item.id,item.answer.answerFile);
                }else if( item.answer.answerFile.search(".mp4") != -1 || item.answer.answerFile.search(".MP4") != -1 || item.answer.answerFile.search(".flv")  != -1 || item.answer.answerFile.search(".mov")  != -1 ){
                    <!--视频播放-->
                    //if(getBrowser() != 'wxmobile'){
                    htmlStr += '<div class="page-bd"><div class="weui-c-article"  style="width: 86%;">';
                    htmlStr += '<div id="dplayer2'+item.id+'"></div>';
                    htmlStr += '<script type="text/javascript">';
                    htmlStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.answer.answerFile,"3")+'\', pic: \''+videoImagePath(item.answer.answerFile)+'\'}});';
                    htmlStr += '</script>';
                    htmlStr += '</div></div>';



                }else if( item.answer.answerFile.search(".MP3") != -1 || item.answer.answerFile.search(".mp3") != -1 || item.answer.answerFile.search(".wav")  != -1 || item.answer.answerFile.search(".ogg")  != -1 ){
                    //音频--隐藏原始播放器
                    htmlStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.answer.answerFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
                    htmlStr += '<div class="audio"   >';
                    htmlStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
                    htmlStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                    htmlStr += '</div>';
                    htmlStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
                    htmlStr += '</div>';
                }else{
                    htmlStr += '<a href="'+ checkPath(item.answer.answerFile,'3')+'" target="_blank">'+setNULL(getFileName(item.answer.answerFile))+'</a>';

                }
            }

        }

        htmlStr += '</ul>';
        htmlStr += '</div>';
        htmlStr += '</div>';

    }else{
        htmlStr += '<div class="page-bd" onclick=toAnswerDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");>';
        htmlStr += '<div class="weui-feeds">';
        htmlStr += '<ul>';
        if(item.dongtaiType == '6'){
            //链接
//链接

            if(item.answer.contentType == '1' && item.answer.answerFile != null){
                //图片
                htmlStr += '答案内容类型：图片 + 文字';
                htmlStr += getImageContent(item.id,item.answer.answerFile);
            }
            else if(item.answer.contentType == '2' && item.answer.answerFile != null){
                //音频--隐藏原始播放器
                htmlStr += '<div class="page-bd center" id="audiostartA'+item.id+'" >';
                htmlStr += '<div class="audio"   >';
                htmlStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
                htmlStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我围观</div>';
                htmlStr += '</div>';
                htmlStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
                htmlStr += '</div>';



            }
            else if(item.answer.contentType == '3' && item.answer.answerFile != null){

                //视频--隐藏原始播放器
                htmlStr += '答案内容类型：视频 + 文字';
                <!--视频播放-->
                /*htmlStr += '<div class="page-bd"><div class="weui-c-article">';
                htmlStr += '<div id="dplayer2'+item.id+'" ></div>';
                htmlStr += '<script type="text/javascript">';
                htmlStr += 'const dp2'+item.id+' = new DPlayer({container: document.getElementById("dplayer2'+item.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(item.answer.answerFile,"3")+'\', pic: \''+videoImagePath(item.answer.answerFile)+'\'}});';

                htmlStr += '</script>';
                htmlStr += '</div></div>';*/



            }
            else if(item.answer.contentType == '4' && item.answer.answerFile != null){
                //文件--判断文件类型展示不同的图片
                if(item.answer.answerFile.search(".jpeg") != -1 || item.answer.answerFile.search(".jpg") != -1 || item.answer.answerFile.search(".png") != -1 || item.answer.answerFile.search(".gif") != -1 || item.answer.answerFile.search(".GIF") != -1 ){
                    htmlStr += '答案内容类型：图片 + 文字';
                }else if( item.answer.answerFile.search(".mp4") != -1 || item.answer.answerFile.search(".MP4") != -1 || item.answer.answerFile.search(".flv")  != -1 || item.answer.answerFile.search(".mov")  != -1 ){
                    <!--视频播放-->
                    //if(getBrowser() != 'wxmobile'){
                    htmlStr += '答案内容类型：视频 + 文字';



                }else if( item.answer.answerFile.search(".MP3") != -1 || item.answer.answerFile.search(".mp3") != -1 || item.answer.answerFile.search(".wav")  != -1 || item.answer.answerFile.search(".ogg")  != -1 ){
                    //音频--隐藏原始播放器
                    htmlStr += '<div class="page-bd center" id="audiostartA'+item.id+'" onclick=start("audiotest'+item.id+'","'+checkPath(item.answer.answerFile,'3')+'","shifenmiao'+item.id+'","audiostartA'+item.id+'","audioIconA'+item.id+'")>';
                    htmlStr += '<div class="audio"   >';
                    htmlStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+item.id+'"/></div>';
                    htmlStr += '<div id="shifenmiao'+item.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                    htmlStr += '</div>';
                    htmlStr += '<div class="disnone"><audio id="audiotest'+item.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
                    htmlStr += '</div>';
                }else{
                    htmlStr += '答案内容类型：文件 + 文字';

                }
            }

        }

        htmlStr += '</ul>';
        htmlStr += '</div>';
        htmlStr += '</div>';
    }


    htmlStr += '</div>';
    htmlStr += '<div class="weui-news-info">';
    htmlStr += '<div class="weui-news-infoitem">';
    htmlStr += '<span class="weui-news-left" id="weui-news-left">';
    htmlStr += '<span class="weui-news-left" id="weui-news-left">';
    //htmlStr += '<div class="weui-label-list" style="margin-left: 0px;">';
    //console.log(item.linkType);
    if(item.dongtaiType == '6'){
        //console.log(item.linkType);
        //链接
//链接//linkType链接类型（1自定义链接2课程链接3圈子链接4圈子主题链接5工具链接6商品链接7问题链接8答案链接9短视频连接10信用卡链接11贷款链接12保险链接13基金证券链接14活动链接15投票链接16个人主页）
        if(item.linkType == '8'){

            /* htmlStr += '<label class="label f-blue b-blue" onclick=zhuanfa("1","'+item.answer.id+'","'+item.createBy.id+'","'+item.linkType+'"); ><i class="beauty icon-daohang f-green" id="icon30"></i>转发</label>';*/
            htmlStr += '<label class="label f-blue b-blue" onclick=toAnswerDetail("'+item.linkAboutid+'","1");> <i class="beauty icon-fenxiang f-green" id="icon30"></i>分享';
            htmlStr += getYongjinMoney(item.yongjin,"1");
            htmlStr += '</label>';
            if(item.createBy.id == localStorage.getItem("userId") || item.isBuy == '1'){

                htmlStr += '<label class="label  f-blue b-blue" onclick=toAnswerDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-shengyin f-green" id="icon30"></i>免费围观</label>';
            }else{
                htmlStr += '<label class="label  f-red b-red" onclick=toAnswerDetail("'+item.linkAboutid+'&share='+localStorage.getItem('userId')+'","1");><i class="beauty icon-shengyin f-red" id="icon30"></i>'+getPriceMoney(item.price,'1')+'围观</label>';
            }

        }


    }
    // htmlStr += '</div>';

    htmlStr += '</span>';
    htmlStr += '</span>';
    htmlStr += '</div>';
    htmlStr += '</div>';
    htmlStr += '<p class="time left0" onclick=toAnswerDetail("'+item.answer.id+'","1");>'+timeago(item.createDate)+' </p>';
    htmlStr += '<div class="weui-comment-li" >';
    htmlStr += '<span class="check checked" >';

    if(item.createBy.id == localStorage.getItem("userId")){
        htmlStr += '<i class="icon icon-72 weui-tabbar__icon" onclick=deletebyId("14","'+item.id+'") id="icon30"></i>';
        htmlStr += '<span onclick=deletebyId("14","'+item.id+'") class="weui-comment-num">删除</span>';
    }

    htmlStr += '<i class="icon icon-38 weui-tabbar__icon" onclick=dianji("14","'+item.id+'") id="icon30"></i>';
    htmlStr += '<span class="weui-comment-num" id="zan'+item.id+'">'+setNum(item.dongtaiZan)+'</span>';


    htmlStr += '<i class="icon icon-79 weui-tabbar__icon" id="icon30" onclick=openCommentList("commentDisList","2","1",10,"'+item.id+'","14","'+item.createBy.id+'");></i>';
    htmlStr += '<span class="weui-comment-num" onclick=openCommentList("commentDisList","2","1",10,"'+item.id+'","14","'+item.createBy.id+'");>'+setNum(item.commentNum)+'</span>';
    htmlStr += '</span>';
    htmlStr += '</div>';
    htmlStr += '</li>';
    $("#listdongTai2").append(htmlStr);
    $("#dislistdongTai2").show();
    /*$(".dplayer-controller").hide();//隐藏播放进度等信息
    $(".weui-btn").hide();
    $(".dplayer-notice").hide();//隐藏通知
    $(".dplayer-video-wrap").css("height","");*/
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




//带有分页调用列表
function getListdongTai(){
    var pageNo = $("#listdongTaiPageNo").val();
    if(pageNo > 0){
        $("#listdongTaiPageNo").val(eval(pageNo) + 1);
    }else{
        $("body").append("<input type='hidden' id='listdongTaiPageNo' value='1' >");
    }
    listdongTai();
}


//带有分页调用列表
function getListdongTaiSh(){
    var pageNo = $("#listdongTaiPageNo").val();
    if(pageNo > 0){
        $("#listdongTaiPageNo").val(eval(pageNo) + 1);
    }else{
        $("body").append("<input type='hidden' id='listdongTaiPageNo' value='1' >");
    }
    listdongTaiSh();
}

//带有分页调用列表
function getListdongTaiTu(type,renderType,linkType){
    $("#fenlei").html("");

    var pageNo = $("#listdongTaiShipinPageNo").val();
    if(pageNo > 0){
        $("#listdongTaiShipinPageNo").val(eval(pageNo) + 1);
    }else{
        $("body").append("<input type='hidden' id='listdongTaiShipinPageNo' value='1' >");
    }
    listdongTaiTu(type,renderType,linkType);
}



//带有分页调用列表
function getMyListdongTai(){
    var pageNo = $("#listdongTaiMyPageNo").val();
    if(pageNo > 0){
        $("#listdongTaiMyPageNo").val(eval(pageNo) + 1);
    }else{
        $("body").append("<input type='hidden' id='listdongTaiMyPageNo' value='1' >");
    }
    listdongTaiMy();
}


//带有分页调用列表
function getListdongTaiRmwd(){

    var pageNo = $("#listdongTairmwdPageNo").val();
    if(pageNo > 0){
        $("#listdongTairmwdPageNo").val(eval(pageNo) + 1);
    }else{
        $("body").append("<input type='hidden' id='listdongTairmwdPageNo' value='1' >");
    }
    listdongTaiRmwd();
}



//带有分页调用列表
function getlistdongTaiRmwdOnly(){

    var pageNo = $("#listdongTairmwdPageNo").val();
    if(pageNo > 0){
        $("#listdongTairmwdPageNo").val(eval(pageNo) + 1);
    }else{
        $("body").append("<input type='hidden' id='listdongTairmwdPageNo' value='1' >");
    }

    listdongTaiRmwdOnly();
}



//获取详情数据
function detaildongTai(){

    //参数
    var id = GetUrlString('id');

    //传输数据
    var datadongTai = {
        "inUser":getShareId(),
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "id":id
    }

    instancedongTai({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/dongtai/dongTai/detail',
        data: datadongTai,
        cancelToken: sourcedongTai.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            detaildongTaiRender(rs.data);
        }else{
            console.log('请求异常！')
        }

    });

}

//详情渲染
function detaildongTaiRender(data){
    if(data.code == '0'){
        //var detaildongTaiStr = '';
        //detaildongTaiStr += '';
        //$("#detaildongTai").html(detaildongTaiStr);

        //参数
        $("#dongtai_type").val(data.result.dongtai_type);
        $("#dongtaiFile").val(data.result.dongtaiFile);
        $("#dongtaiLink").val(data.result.dongtaiLink);
        $("#linkType").val(data.result.linkType);
        $("#dongtaiContent").val(data.result.dongtaiContent);

    }else{
        $.toast(data.msg, "text");
    }
}

//监听获取详情
$("#buttonDetaildongTai").click(function(){
    detaildongTai();
});



//删除数据
function deletedongTai(){

    //参数
    var id = GetUrlString('id');

    //传输数据
    var datadongTai = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "id":id
    }

    instancedongTai({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/dongtai/dongTai/delete',
        data: datadongTai,
        cancelToken: sourcedongTai.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //$.toast("操作成功", 'success');
                refresh();
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

//监听删除操作
$("#buttonDeletedongTai").click(function(){

    $.confirm("您确定要删除吗?", "确认删除?", function() {
        deletedongTai();
    }, function() {
        //取消操作
    });

});


$(function () {
    //判断获取列表第一页
    if($("#buttonListFirstdongTai").size()>0){
        getListdongTai();
    }

    //判断获取详情信息
    if($("#buttonDetaildongTai").size()>0){
        detaildongTai();
    }
});




//删除数据
function shenhedongTai(id){

    $.confirm("您确定审核通过吗?", "确认通过?", function() {
        //参数

        //传输数据
        var datadongTai = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
            "id":id
        }

        instancedongTai({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sfl/dongtai/dongTai/updateStatus',
            data: datadongTai,
            cancelToken: sourcedongTai.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
                if(rs.data.code == '0'){
                    //$.toast("操作成功", 'success');
                    refresh();
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

