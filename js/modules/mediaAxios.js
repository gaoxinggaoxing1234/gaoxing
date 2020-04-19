var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost";//本地模式
}
//文件请求URL
var baseFileUrlmedia = ''+basehost+'';
//请求实例
var instancemedia = axios.create({
  baseURL: ''+basehost+'/sfd/a/api/',
  timeout: 180000,
  headers: {'token': localStorage.getItem('token')}
});

//取消请求
var CancelTokenmedia = axios.CancelToken;
var sourcemedia = CancelTokenmedia.source();

// 添加请求拦截器
instancemedia.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        //isLogin('','');
        //sourcemedia.cancel();
    }
   sessionStorage.clear();return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instancemedia.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染
function listmedia(renderId,renderType,pageSize,manyType){
		//分页
		var pageNoTemp = $("#listmedia"+manyType+"PageNo").val();
		if(pageNoTemp > 0){
		   $("#listmedia"+manyType+"PageNo").val(eval(pageNoTemp) + 1);
		}else{
		   $("body").append("<input type='hidden' id='listmedia"+manyType+"PageNo' value='1' >");
		}
		//参数-manyType--需要手动处理对应字段
		var mediaType = manyType;
		var pageNo = $("#listmedia"+manyType+"PageNo").val();
        var id = GetUrlString('id');
		//传输数据
		var datamedia = {
			"mediaType":mediaType,
            "id":id,
		  	"pageSize":pageSize,
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
		    "pageNo":pageNo
		}

        instancemedia({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/gg/media/media/list',
            data: datamedia,
        	cancelToken: sourcemedia.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            //数据处理
            if(rs.status=200){
				listmediaRender(rs.data,renderId,renderType,mediaType,id);
            }else{
                console.log('listmedia请求异常！')
            }
        });

	}
//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染
function listmedianew(renderId,renderType,pageSize,manyType){
    //分页
    var pageNoTemp = $("#listmedia"+manyType+"PageNo").val();
    if(pageNoTemp > 0){
        $("#listmedia"+manyType+"PageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listmedia"+manyType+"PageNo' value='1' >");
    }
    //参数-manyType--需要手动处理对应字段
    var mediaType = manyType;
    var pageNo = $("#listmedia"+manyType+"PageNo").val();
    var id = GetUrlString('id');
    //传输数据
    var datamedia = {
        "mediaType":mediaType,
        "id":id,
        "pageSize":pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo
    }

    instancemedia({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/media/media/detail',
        data: datamedia,
        cancelToken: sourcemedia.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            listmedianewRender(rs.data,renderId,"","","");
        }else{
            console.log('listmedia请求异常！')
        }
    });

}

function listmediaxiaoxi(renderId,renderType,pageSize,manyType){
    //分页
    var pageNoTemp = $("#listmedia"+manyType+"PageNo").val();
    if(pageNoTemp > 0){
        $("#listmedia"+manyType+"PageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listmedia"+manyType+"PageNo' value='1' >");
    }
    //参数-manyType--需要手动处理对应字段
    var mediaType = manyType;
    var pageNo = $("#listmedia"+manyType+"PageNo").val();
    var id = GetUrlString('id');
    //传输数据
    var datamedia = {
        "mediaType":mediaType,
        "id":id,
        "pageSize":pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo
    }

    instancemedia({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/media/media/list',
        data: datamedia,
        cancelToken: sourcemedia.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            listmediaxiaoxiRender(rs.data,renderId,renderType,mediaType,id);
        }else{
            console.log('listmedia请求异常！')
        }
    });

}
//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染
function listmedia2(renderId,renderType,pageSize,manyType){
    //分页
    var pageNoTemp = $("#listmedia"+manyType+"PageNo").val();
    if(pageNoTemp > 0){
        $("#listmedia"+manyType+"PageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listmedia"+manyType+"PageNo' value='1' >");
    }
    //参数-manyType--需要手动处理对应字段
    var mediaType = manyType;
    var pageNo = $("#listmedia"+manyType+"PageNo").val();
    var id = GetUrlString('id');
    //传输数据
    var datamedia = {
        "mediaType":mediaType,
        "id":id,
        "pageSize":pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo
    }

    instancemedia({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/media/media/list',
        data: datamedia,
        cancelToken: sourcemedia.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            listmediaRender2(rs.data,renderId,renderType,mediaType,id);
        }else{
            console.log('listmedia请求异常！')
        }
    });

}

//列表渲染
function listmediaRender(data,renderId,renderType,mediaType,id){
      var listmediaStr = '';
      if(data.code == '0'){
          if(data.result == null || data.result == ''){
              if(mediaType == '3' && id == null){
                    $("#slide2").hide();
              }

          }
        $.each(data.result,function(i,item) {
            if( mediaType == '1'){
                var detailcourseStr = '';
                detailcourseStr += '';

                detailcourseStr += '<div class="weui-c-content" >';
                /*detailcourseStr += '<h2 class="weui-c-title bottom5" style="text-align: center;">' + item.mediaTitle + '</h2>';*/

                detailcourseStr += '<div class="weui-c-article">';
                detailcourseStr += '' + item.mediaContent + '';
                detailcourseStr += '</div>';


                <!--提交信息-->
                detailcourseStr += '<div class="page-bd-15 top10">';

                detailcourseStr += '<div class="weui-cell">';
                detailcourseStr += '<div class="weui-cell__hd">';
                detailcourseStr += '<label class="weui-label">联系人</label>';
                detailcourseStr += '</div>';
                detailcourseStr += '<div class="weui-cell__bd">';
                detailcourseStr += '<input class="weui-input" id="hzLinkman" placeholder="请输入联系人" type="text" maxlength="16">';
                detailcourseStr += '</div>';

                detailcourseStr += '</div>';
                detailcourseStr += '<div class="weui-cell">';
                detailcourseStr += '<div class="weui-cell__hd">';
                detailcourseStr += '<label class="weui-label">联系电话</label>';
                detailcourseStr += '</div>';
                detailcourseStr += '<div class="weui-cell__bd">';
                detailcourseStr += '<input class="weui-input" id="hzMobile" placeholder="请输入联系人电话" type="text" maxlength="16">';
                detailcourseStr += '</div>';

                detailcourseStr += '</div>';
                detailcourseStr += '<div class="weui-cell">';
                detailcourseStr += '<div class="weui-cell__bd">';
                detailcourseStr += '<textarea class="weui-textarea b1gray" id="hzContent" placeholder="请输入合作内容简介" rows="3"></textarea>';
                detailcourseStr += '</div>';

                detailcourseStr += '</div>';
                detailcourseStr += '<div class="">';
                detailcourseStr += '<a  id="buttonSaveheZuo"  onclick="saveNRheZuo();" class="weui-btn weui-btn_primary mybtn width92" >提交信息</a>';
                detailcourseStr += '</div>';
                detailcourseStr += '</div>';


                detailcourseStr += '</div>';

                detailcourseStr += '<div class="weui-c-tools">';

                detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">' + setNum(item.mediaDianjiliang) + '</span></div>';
                detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
                detailcourseStr += '<span  onclick=dianji("4","' + item.id + '"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan' + item.id + '">' + setNum(item.mediaZan) + '</span> </span>';
                detailcourseStr += '<span class="check checked" onclick=openCommentList("commentDisList","2","1",10,"' + item.id + '","4","' + item.createBy.id + '");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">' + setNum(item.commentNum) + '</span> </span>';
                detailcourseStr += '</div>';

                detailcourseStr += '</div>';
            }else if(mediaType == '2'){
                var detailcourseStr = '';
                detailcourseStr += '';

                detailcourseStr += '<div class="weui-c-content" >';
                /*detailcourseStr += '<h2 class="weui-c-title bottom5" style="text-align: center;">' + item.mediaTitle + '</h2>';*/

                detailcourseStr += '<div class="weui-c-article">';
                detailcourseStr += '' + item.mediaContent + '';
                detailcourseStr += '</div>';





                detailcourseStr += '</div>';

                detailcourseStr += '<div class="weui-c-tools">';

                detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">' + setNum(item.mediaDianjiliang) + '</span></div>';
                detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
                detailcourseStr += '<span  onclick=dianji("4","' + item.id + '"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan' + item.id + '">' + setNum(item.mediaZan) + '</span> </span>';
                detailcourseStr += '<span class="check checked" onclick=openCommentList("commentDisList","2","1",10,"' + item.id + '","4","' + item.createBy.id + '");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">' + setNum(item.commentNum) + '</span> </span>';
                detailcourseStr += '</div>';

                detailcourseStr += '</div>';
            }else if(mediaType == '3' && id == null){
                var detailcourseStr = '';
                detailcourseStr += '';
                detailcourseStr += '<li>';
                detailcourseStr += '<div class="txt" onclick=toMediaDetail("'+item.id+'","1");>';
                detailcourseStr += '<i class="icon icon-52 weui-tabbar__icon a-swing" id="icon27"></i>'+item.mediaTitle+'';
                detailcourseStr += '</div>';
                detailcourseStr += '</li>';

                if(item.mediaTitle != null && item.mediaTitle != ''){
                    $("#slide2").show();
                }
            }else if(mediaType == '3' && id != null){
                var detailcourseStr = '';
                detailcourseStr += '';

                detailcourseStr += '<div class="weui-c-content" >';
              /*  detailcourseStr += '<h2 class="weui-c-title bottom5" style="text-align: center;">' + item.mediaTitle + '</h2>';*/

                detailcourseStr += '<div class="weui-c-article">';
                detailcourseStr += '' + item.mediaContent + '';
                detailcourseStr += '</div>';
                detailcourseStr += '</div>';

                detailcourseStr += '<div class="weui-c-tools">';

                detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">' + setNum(item.mediaDianjiliang) + '</span></div>';
                detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
                detailcourseStr += '<span  onclick=dianji("4","' + item.id + '"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan' + item.id + '">' + setNum(item.mediaZan) + '</span> </span>';
                detailcourseStr += '<span class="check checked" onclick=openCommentList("commentDisList","2","1",10,"' + item.id + '","4","' + item.createBy.id + '");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">' + setNum(item.commentNum) + '</span> </span>';
                detailcourseStr += '</div>';
            }else if(mediaType == '4'){
                var detailcourseStr = '';
                detailcourseStr += '';

                detailcourseStr += '<div class="weui-c-content" >';
                /*detailcourseStr += '<h2 class="weui-c-title bottom5" style="text-align: center;">' + item.mediaTitle + '</h2>';*/

                detailcourseStr += '<div class="weui-c-article">';
                detailcourseStr += '' + item.mediaContent + '';
                detailcourseStr += '</div>';



/*
                detailcourseStr += '<div style="width: 100%;text-align: center;"><a onclick="liaotiankefu()">点我联系客服</a><br>或</br><a href="shangwuhezuo.html">去提交商务合作信息</a></div>';
*/

                detailcourseStr += '</div>';

                detailcourseStr += '<div class="weui-c-tools">';

                detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">' + setNum(item.mediaDianjiliang) + '</span></div>';
                detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
                detailcourseStr += '<span  onclick=dianji("4","' + item.id + '"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan' + item.id + '">' + setNum(item.mediaZan) + '</span> </span>';
                detailcourseStr += '<span class="check checked" onclick=openCommentList("commentDisList","2","1",10,"' + item.id + '","4","' + item.createBy.id + '");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">' + setNum(item.commentNum) + '</span> </span>';
                detailcourseStr += '</div>';

                detailcourseStr += '</div>';
            }else{
                var detailcourseStr = '';
                detailcourseStr += '';

                detailcourseStr += '<div class="weui-c-content" >';
                /*detailcourseStr += '<h2 class="weui-c-title bottom5" style="text-align: center;">' + item.mediaTitle + '</h2>';*/

                detailcourseStr += '<div class="weui-c-article">';
                detailcourseStr += '' + item.mediaContent + '';
                detailcourseStr += '</div>';


                detailcourseStr += '</div>';

                detailcourseStr += '<div class="weui-c-tools">';

                detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">' + setNum(item.mediaDianjiliang) + '</span></div>';
                detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
                detailcourseStr += '<span  onclick=dianji("4","' + item.id + '"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan' + item.id + '">' + setNum(item.mediaZan) + '</span> </span>';
                detailcourseStr += '<span class="check checked" onclick=openCommentList("commentDisList","2","1",10,"' + item.id + '","4","' + item.createBy.id + '");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">' + setNum(item.commentNum) + '</span> </span>';
                detailcourseStr += '</div>';

                detailcourseStr += '</div>';
            }


            if(renderType == '1'){

                $("#"+renderId+"").append(detailcourseStr);
                if(mediaType == '3'){
                    //首页轮播信息
                    $('#slide2').swipeSlide({
                        autoSwipe: true, //自动切换默认是
                        speed: 3000, //速度默认4000
                        continuousScroll: true, //默认否
                        transitionType: 'ease-in'
                    });
                }
            }else{
                $("#"+renderId+"").html(detailcourseStr);
            }



        });



      }else{

      }
	}
function listmedianewRender(data,renderId,renderType,mediaType,id){
    var listmediaStr = '';
    if(data.code == '0'){

        var detailcourseStr = '';
        detailcourseStr += '';

        detailcourseStr += '<div class="weui-c-content" >';
        /*detailcourseStr += '<h2 class="weui-c-title bottom5" style="text-align: center;">' + item.mediaTitle + '</h2>';*/

        detailcourseStr += '<div class="weui-c-article">';
        detailcourseStr += '' + data.result.mediaContent + '';
        detailcourseStr += '</div>';


        detailcourseStr += '</div>';

        detailcourseStr += '<div class="weui-c-tools">';

        detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">' + setNum(data.result.mediaDianjiliang) + '</span></div>';
        detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
        detailcourseStr += '<span  onclick=dianji("4","' + data.result.id + '"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan' + data.result.id + '">' + setNum(data.result.mediaZan) + '</span> </span>';
        detailcourseStr += '<span class="check checked" onclick=openCommentList("commentDisList","2","1",10,"' + data.result.id + '","4","' + data.result.createBy.id + '");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">' + setNum(data.result.commentNum) + '</span> </span>';
        detailcourseStr += '</div>';

        detailcourseStr += '</div>';

        $("#"+renderId+"").html(detailcourseStr);

    }else{

    }
}
function listmediaxiaoxiRender(data,renderId,renderType,mediaType,id,obj){

    if(data.code == '0'){
        var str1 = '';
        /* str1 += '<div class="swiper-container disnone" id="swiper-container'+renderType+'">';
         str1 += '<div class="swiper-wrapper">';*/
        $.each(data.result,function(i,item){
            str1 += '<div class="swiper-slide" onclick=toMediaDetail("'+item.id+'","1");>';
            str1 += '<div class="weui-news-p onerow">';
            str1 += item.mediaTitle;
            str1 += '</div>';
            str1 += '</div>';
        });
        /*  str1 += '</div>';*/

        /*str1 += '<div class="swiper-pagination disnone" id="swiper-pagination'+renderType+'"></div>';
        str1 += '</div>';*/

        $("#"+renderId+"").html(str1);
        lunbotu(obj,renderId,3);
        $("#"+renderId+"").show();
        $("#swiper-container"+renderId+"").show();
        $("#swiper-pagination"+renderId+"").show();
    }else{
        $.toast(data.msg, "text");
    }
}
//列表渲染
function listmediaRender2(data,renderId,renderType,mediaType,id){
    var listmediaStr = '';
    if(data.code == '0'){

        $.each(data.result,function(i,item) {
            if( mediaType == '1'){
                var detailcourseStr = '';
                detailcourseStr += '';

                detailcourseStr += '<div class="weui-c-content" >';
                /*detailcourseStr += '<h2 class="weui-c-title bottom5" style="text-align: center;">' + item.mediaTitle + '</h2>';*/

                detailcourseStr += '<div class="weui-c-article">';
                detailcourseStr += '' + item.mediaContent + '';
                detailcourseStr += '</div>';


                <!--提交信息-->
                detailcourseStr += '<div class="page-bd-15 top10">';

                detailcourseStr += '<div class="weui-cell">';
                detailcourseStr += '<div class="weui-cell__hd">';
                detailcourseStr += '<label class="weui-label">联系人</label>';
                detailcourseStr += '</div>';
                detailcourseStr += '<div class="weui-cell__bd">';
                detailcourseStr += '<input class="weui-input" id="hzLinkman" placeholder="请输入联系人" type="text" maxlength="16">';
                detailcourseStr += '</div>';

                detailcourseStr += '</div>';
                detailcourseStr += '<div class="weui-cell">';
                detailcourseStr += '<div class="weui-cell__hd">';
                detailcourseStr += '<label class="weui-label">联系电话</label>';
                detailcourseStr += '</div>';
                detailcourseStr += '<div class="weui-cell__bd">';
                detailcourseStr += '<input class="weui-input" id="hzMobile" placeholder="请输入联系人电话" type="text" maxlength="16">';
                detailcourseStr += '</div>';

                detailcourseStr += '</div>';
                detailcourseStr += '<div class="weui-cell">';
                detailcourseStr += '<div class="weui-cell__bd">';
                detailcourseStr += '<textarea class="weui-textarea b1gray" id="hzContent" placeholder="请输入合作内容简介" rows="3"></textarea>';
                detailcourseStr += '</div>';

                detailcourseStr += '</div>';
                detailcourseStr += '<div class="">';
                detailcourseStr += '<a  id="buttonSaveheZuo"  onclick="saveNRheZuo();" class="weui-btn weui-btn_primary mybtn width92" >提交信息</a>';
                detailcourseStr += '</div>';
                detailcourseStr += '</div>';


                detailcourseStr += '</div>';

                detailcourseStr += '<div class="weui-c-tools">';

                detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">' + setNum(item.mediaDianjiliang) + '</span></div>';
                detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
                detailcourseStr += '<span  onclick=dianji("4","' + item.id + '"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan' + item.id + '">' + setNum(item.mediaZan) + '</span> </span>';
                detailcourseStr += '<span class="check checked" onclick=openCommentList("commentDisList","2","1",10,"' + item.id + '","4","' + item.createBy.id + '");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">' + setNum(item.commentNum) + '</span> </span>';
                detailcourseStr += '</div>';

                detailcourseStr += '</div>';
            }else if(mediaType == '2'){
                var detailcourseStr = '';
                detailcourseStr += '';

                detailcourseStr += '<div class="weui-c-content" >';
                /*detailcourseStr += '<h2 class="weui-c-title bottom5" style="text-align: center;">' + item.mediaTitle + '</h2>';*/

                detailcourseStr += '<div class="weui-c-article">';
                detailcourseStr += '' + item.mediaContent + '';
                detailcourseStr += '</div>';





                detailcourseStr += '</div>';

                detailcourseStr += '<div class="weui-c-tools">';

                detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">' + setNum(item.mediaDianjiliang) + '</span></div>';
                detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
                detailcourseStr += '<span  onclick=dianji("4","' + item.id + '"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan' + item.id + '">' + setNum(item.mediaZan) + '</span> </span>';
                detailcourseStr += '<span class="check checked" onclick=openCommentList("commentDisList","2","1",10,"' + item.id + '","4","' + item.createBy.id + '");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">' + setNum(item.commentNum) + '</span> </span>';
                detailcourseStr += '</div>';

                detailcourseStr += '</div>';
            }else if(mediaType == '3' && id == null){
                var detailcourseStr = '';
                detailcourseStr += '';
                detailcourseStr += '<li>';
                detailcourseStr += '<div class="txt" onclick=toMediaDetail("'+item.id+'","1");>';
                detailcourseStr += '<span style="color: #0c80ba">['+timeago(item.createDate)+']</span>&nbsp;&nbsp;'+item.mediaTitle+'';
                detailcourseStr += '</div>';
                detailcourseStr += '</li>';

            }else if(mediaType == '3' && id != null){
                var detailcourseStr = '';
                detailcourseStr += '';

                detailcourseStr += '<div class="weui-c-content" >';
                /*detailcourseStr += '<h2 class="weui-c-title bottom5" style="text-align: center;">' + item.mediaTitle + '</h2>';*/

                detailcourseStr += '<div class="weui-c-article">';
                detailcourseStr += '' + item.mediaContent + '';
                detailcourseStr += '</div>';
                detailcourseStr += '</div>';

                detailcourseStr += '<div class="weui-c-tools">';

                detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">' + setNum(item.mediaDianjiliang) + '</span></div>';
                detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
                detailcourseStr += '<span  onclick=dianji("4","' + item.id + '"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan' + item.id + '">' + setNum(item.mediaZan) + '</span> </span>';
                detailcourseStr += '<span class="check checked" onclick=openCommentList("commentDisList","2","1",10,"' + item.id + '","4","' + item.createBy.id + '");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">' + setNum(item.commentNum) + '</span> </span>';
                detailcourseStr += '</div>';
            }else if(mediaType == '4'){
                var detailcourseStr = '';
                detailcourseStr += '';

                detailcourseStr += '<div class="weui-c-content" >';
                /*detailcourseStr += '<h2 class="weui-c-title bottom5" style="text-align: center;">' + item.mediaTitle + '</h2>';*/

                detailcourseStr += '<div class="weui-c-article">';
                detailcourseStr += '' + item.mediaContent + '';
                detailcourseStr += '</div>';



                detailcourseStr += '<div style="width: 100%;text-align: center;"><a onclick="liaotiankefu()">点我联系客服</a><br>或</br><a href="shangwuhezuo.html">去提交商务合作信息</a></div>';

                detailcourseStr += '</div>';

                detailcourseStr += '<div class="weui-c-tools">';

                detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">' + setNum(item.mediaDianjiliang) + '</span></div>';
                detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
                detailcourseStr += '<span  onclick=dianji("4","' + item.id + '"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan' + item.id + '">' + setNum(item.mediaZan) + '</span> </span>';
                detailcourseStr += '<span class="check checked" onclick=openCommentList("commentDisList","2","1",10,"' + item.id + '","4","' + item.createBy.id + '");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">' + setNum(item.commentNum) + '</span> </span>';
                detailcourseStr += '</div>';

                detailcourseStr += '</div>';
            }else{
                var detailcourseStr = '';
                detailcourseStr += '';

                detailcourseStr += '<div class="weui-c-content" >';
                /*detailcourseStr += '<h2 class="weui-c-title bottom5" style="text-align: center;">' + item.mediaTitle + '</h2>';*/

                detailcourseStr += '<div class="weui-c-article">';
                detailcourseStr += '' + item.mediaContent + '';
                detailcourseStr += '</div>';




                detailcourseStr += '</div>';

                detailcourseStr += '<div class="weui-c-tools">';

                detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">' + setNum(item.mediaDianjiliang) + '</span></div>';
                detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
                detailcourseStr += '<span  onclick=dianji("4","' + item.id + '"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan' + item.id + '">' + setNum(item.mediaZan) + '</span> </span>';
                detailcourseStr += '<span class="check checked" onclick=openCommentList("commentDisList","2","1",10,"' + item.id + '","4","' + item.createBy.id + '");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">' + setNum(item.commentNum) + '</span> </span>';
                detailcourseStr += '</div>';

                detailcourseStr += '</div>';
            }


            if(renderType == '1'){

                $("#"+renderId+"").append(detailcourseStr);

            }else{
                $("#"+renderId+"").html(detailcourseStr);
            }



        });



    }else{

    }
}
