var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost";//本地模式
}
//文件请求URL
var baseFileUrlcourselist = ''+basehost+'';

//请求实例
var instancecourselist = axios.create({
  baseURL: ''+basehost+'/sfd/a/api/',
  timeout: 180000000,
  headers: {'token': localStorage.getItem('token')}
});



//取消请求
var CancelTokencourselist = axios.CancelToken;
var sourcecourselist = CancelTokencourselist.source();

// 添加请求拦截器
instancecourselist.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        //isLogin('','');
        //sourcecourselist.cancel();
    }
   sessionStorage.clear();return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instancecourselist.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染--listType-表示列表类型（1-最新记录2-热门推荐3-限时低价4-精品课程0-免费专区）
function listcourselist(renderId,renderType,pageSize,manyType,listType,topicType){
		//分页
		var pageNoTemp = $("#listcourse"+manyType+listType+"PageNo").val();
		if(pageNoTemp > 0){
		   $("#listcourse"+manyType+listType+"PageNo").val(eval(pageNoTemp) + 1);
		}else{
		    if($("#listcourse"+manyType+listType+"PageNo").size() == 0){
                $("body").append("<input type='hidden' id='listcourse"+manyType+listType+"PageNo' value='1' >");
            }

		}
		//参数-manyType--需要手动处理对应字段
		var courseType =manyType;//分类类别
		var url = '/xy/course/course/list';
		if(courseType == '5'){//名人堂
            url = '/xy/course/course/userStarlist';
		}else if(courseType == '6'){//线下活动
            url = '/xy/course/course/activitylist';
		}else if(courseType == '7'){//课程课单
            url = '/xy/course/course/listlist';
        }else if(courseType == '8'){//主题
            url = '/xy/course/course/topic';
        }else if(courseType == '9'){//课程详情
            url = '/xy/course/course/coursekedan';
        }
        var token = localStorage.getItem("token");
		var pageNo = $("#listcourse"+manyType+listType+"PageNo").val();
		//传输数据
		var datacourse = {
			"courseType":courseType,
            "token":token,
		  	"pageSize":pageSize,
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
			"remarks":listType,
			"courseTopic":topicType,
		    "pageNo":pageNo
		}

    instancecourselist({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: url,
            data: datacourse,
        	cancelToken: sourcecourselist.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            //数据处理
            if(rs.status=200){
                if( (rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1' ){
                    $(".weui-toast--text").hide();$.toast("没有更多了", "text");
                }else{
                    listcourselistRender(rs.data,renderId,renderType,manyType);
                }
            }else{
                console.log('请求异常！')
            }
        });

	}
//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染--listType-表示列表类型（1-最新记录2-热门推荐3-限时低价4-精品课程0-免费专区）
function listcourselist2(renderId,renderType,pageSize,manyType,listType,topicType){
    //分页
    var pageNoTemp = $("#listcourse"+manyType+listType+"PageNo").val();
    if(pageNoTemp > 0){
        $("#listcourse"+manyType+listType+"PageNo").val(eval(pageNoTemp) + 1);
    }else{
        if($("#listcourse"+manyType+listType+"PageNo").size() == 0){
            $("body").append("<input type='hidden' id='listcourse"+manyType+listType+"PageNo' value='1' >");
        }

    }
    //参数-manyType--需要手动处理对应字段
    var courseType =manyType;//分类类别
    var url = '/xy/course/course/list';
    if(courseType == '5'){//名人堂
        url = '/xy/course/course/userStarlist';
    }else if(courseType == '6'){//线下活动
        url = '/xy/course/course/activitylist';
    }else if(courseType == '7'){//课程课单
        url = '/xy/course/course/listlist';
    }else if(courseType == '8'){//主题
        url = '/xy/course/course/topic';
    }else if(courseType == '9'){//课程详情
        url = '/xy/course/course/coursekedan';
    }
    var token = localStorage.getItem("token");
    var pageNo = $("#listcourse"+manyType+listType+"PageNo").val();
    //传输数据
    var datacourse = {
        "courseType":courseType,
        "token":token,
        "pageSize":pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "remarks":listType,
        "courseTopic":topicType,
        "pageNo":pageNo
    }

    instancecourselist({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: datacourse,
        cancelToken: sourcecourselist.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            if( (rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1' ){
                $(".weui-toast--text").hide();$.toast("没有更多了", "text");
            }else{
                listcourselist2Render(rs.data,renderId,renderType,manyType);
            }
        }else{
            console.log('请求异常！')
        }
    });

}

function listcourselist3(renderId,renderType,pageSize,manyType,listType,topicType){
    //分页
    var pageNoTemp = $("#listcourse"+manyType+listType+"PageNo").val();
    if(pageNoTemp > 0){
        $("#listcourse"+manyType+listType+"PageNo").val(eval(pageNoTemp) + 1);
    }else{
        if($("#listcourse"+manyType+listType+"PageNo").size() == 0){
            $("body").append("<input type='hidden' id='listcourse"+manyType+listType+"PageNo' value='1' >");
        }

    }
    //参数-manyType--需要手动处理对应字段
    var courseType =manyType;//分类类别
    var url = '/xy/course/course/list';
    if(courseType == '5'){//名人堂
        url = '/xy/course/course/userStarlist';
    }else if(courseType == '6'){//线下活动
        url = '/xy/course/course/activitylist';
    }else if(courseType == '7'){//课程课单
        url = '/xy/course/course/listlist';
    }else if(courseType == '8'){//主题
        url = '/xy/course/course/topic';
    }else if(courseType == '9'){//课程详情
        url = '/xy/course/course/coursekedan';
    }
    var token = localStorage.getItem("token");
    var pageNo = $("#listcourse"+manyType+listType+"PageNo").val();
    //传输数据
    var datacourse = {
        "courseType":courseType,
        "token":token,
        "pageSize":pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "remarks":listType,
        "courseTopic":topicType,
        "pageNo":pageNo
    }

    instancecourselist({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: datacourse,
        cancelToken: sourcecourselist.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            if( (rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1' ){
                $(".weui-toast--text").hide();$.toast("没有更多了", "text");
            }else{
                listcourselist3Render(rs.data,renderId,renderType,manyType);
            }
        }else{
            console.log('请求异常！')
        }
    });

}


//列表渲染
function listcourselistRender(data,renderId,renderType,manyType){
      var listcourseStr = '';
      var zhuti = '';
      if(data.code == '0'){
          var dataArray = data.result;
          if(manyType == '3'){
              //dataArray = dataArray.reverse();
          }
        $.each(dataArray,function(i,item){

        	if(manyType == '1'){//课程文章
                listcourseStr += '<li class="weui-news-item" onclick=toCourseDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.courseTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.courseDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.courseImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                if(item.courseJiaobiao != null && item.courseJiaobiao != '' ){
                	if(item.jiaobiaoStart != null && item.jiaobiaoEnd != null ){

                		if(stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+item.courseJiaobiao+'</span>';
						}else{
                            if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                                listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                            }else{
                                //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                            }
						}

					}else{
                        if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                        }else{
                            //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                        }
					}

				}else{
                    if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                        listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                    }else{
                        //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                    }
				}
				if(item.courseXilieno != null && item.courseXilieno != ''){
                    //listcourseStr += '<span class="weui-mark-lb" style="top:0px;border-radius: 0px;margin: 0 auto;background-color: #18b4ed;">系列课</span>';
                }

                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';
                zhuti = item.courseTopic;
			}else if(manyType == '9'){//kedan课程文章
                listcourseStr += '<li class="weui-news-item" onclick=toCourseDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.courseTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.courseDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.courseImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                if(item.courseJiaobiao != null && item.courseJiaobiao != '' ){
                    if(item.jiaobiaoStart != null && item.jiaobiaoEnd != null ){

                        if(stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+item.courseJiaobiao+'</span>';
                        }else{
                            if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                                listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                            }else{
                                listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                            }
                        }

                    }else{
                        if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                        }else{
                            listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                        }
                    }

                }else{
                    if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                        listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                    }else{
                        listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                    }
                }

                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';
                zhuti = item.courseTopic;

                //课程详情
                $("title").html( data.kedan.listTitle);
                var detailcourseStr = '';


                detailcourseStr += '<p>'+data.kedan.listInfo+'</p>';

                detailcourseStr += '<div class="weui-c-tools">';

                detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">'+setNum(data.kedan.listDianjiliang)+'</span></div>';
                detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
                detailcourseStr += '<span  onclick=dianji("17","'+data.kedan.id+'"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan'+data.kedan.id+'">'+setNum(data.kedan.listZan)+'</span> </span>';
                detailcourseStr += '<span class="check checked" onclick=openCommentList("commentDisList","2","1",10,"'+data.kedan.id+'","17","'+data.kedan.createBy.id+'");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">'+setNum(data.kedan.commentNum)+'</span> </span>';

                detailcourseStr += '</div>';

                detailcourseStr += '</div>';
                /*分享参数*/
                detailcourseStr += '<input type="hidden" id="id" value="'+data.kedan.id+'">';
                detailcourseStr += '<input type="hidden" id="shareType" value="1">';
                detailcourseStr += '<input type="hidden" id="shareTitle" value="'+data.kedan.listTitle+'">';
                detailcourseStr += '<input type="hidden" id="shareImage" value="'+checkPath(data.kedan.listImage,'1')+'">';


                detailcourseStr += '<input type="hidden" id="orderMoney" value="'+setNum(data.kedan.price)+'">';
                detailcourseStr += '<input type="hidden" id="orderNum" value="1">';
                detailcourseStr += '<input type="hidden" id="orderType" value="25">';
                detailcourseStr += '<input type="hidden" id="orderDashangType" value="7">';
                detailcourseStr += '<input type="hidden" id="orderTitle" value="'+data.kedan.listTitle+'">';
                detailcourseStr += '<input type="hidden" id="orderAboutid" value="'+data.kedan.id+'">';
                $("#detailcourse").html(detailcourseStr);
                if(i == 0 && data.kedan.isBuy == '0'){
                    var detailcourseButtonStr = '';
                    detailcourseButtonStr += '<div class="fixedbtn24 dibu1" >';
                    detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick=openPay("购买本课程","可以阅读本次购买课程","订阅作者年费会员","可以阅读作者所有课程","1","1","'+data.kedan.listTitle.replace(/\s*!/g,"")+'","年费会员订阅","'+data.kedan.price+'","'+data.kedan.dingyueprice+'","25","6","0","1","'+data.kedan.isHuiYuan+'","'+data.kedan.id+'","'+data.kedan.createBy.id+'");>';
                    detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>购买课程<span class="slogan f-white">￥'+setNum(data.kedan.price)+'</span></a>';
                    console.log("-------b3");
                    detailcourseButtonStr += '</div>';
                    $("body").append(detailcourseButtonStr);
                }


            }else if(manyType == '2'){//轻听
                listcourseStr += '<div class="page-bd-15">';
                listcourseStr += '<div class="weui-news-info padding0">';
                listcourseStr += '<div class="weui-c-article l100">';
                listcourseStr += '<p onclick=toCourseDetail("'+item.id+'","1")  style="text-indent: 0em;font-size: smaller"  id="indent'+(i+1)+'">'+item.courseTitle+'</p>';
                listcourseStr += '<div id="aplayer1'+item.id+'"></div>';
                listcourseStr += '<script type="text/javascript">';
                listcourseStr += 'const ap1'+item.id+' = new APlayer({';
                listcourseStr += 'container: document.getElementById("aplayer1'+item.id+'"), mini: false, autoplay:false,preload:\'none\',';
                listcourseStr += 'audio: [{name: \''+item.courseTitle+'\', artist: \'轻听\', url: \''+checkPath(item.courseFile,"3")+'\', cover: \''+checkPath(item.courseImage,"1")+'\'';
                listcourseStr += '}]';
                listcourseStr += '});';
                listcourseStr += '</script>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';

			}else if(manyType == '30'){//常见问题

        		listcourseStr += '<li class="timeline-item"  onclick=disxun("'+item.id+'");>';
                listcourseStr += '<div class="timeline-item-color timeline-item-head"></div>';

                if(i != data.result.length - 1){
                    listcourseStr += '<div class="timeline-item-tail"></div>';
                }

                listcourseStr += '<div class="timeline-item-content">';
                listcourseStr += '<p id="mytitle">'+item.courseTitle+'</p>';
                listcourseStr += '<p>'+timeago(item.updateDate)+'</p>';
                listcourseStr += '<p style="display: none;" id="'+item.id+'">'+filterHTMLTag(item.courseContent)+'</p>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';


            }else if(manyType == '40'){//攻略锦囊
                listcourseStr += '<li class="weui-news-item" onclick=toCourseDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.courseTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.courseDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.courseImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                listcourseStr += '<span class="weui-mark-rt bg-red">'+item.courseJiaobiao+'</span>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';
            }else if(manyType == '5'){//名人堂
                listcourseStr += '<li class="weui-news-item" onclick=toUserHome("'+item.id+'","1")>';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-media shadowonly square" style="background-image:url('+checkPathBackGroubdImage(item.headimgurl,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
				if(item.coursePrice != null && item.coursePrice > 0.00){
					listcourseStr += '<span class="weui-mark-rt bg-green">'+getPriceMoney(item.coursePrice)+'</span>';
				}
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">';
                listcourseStr += ''+setNULL(item.nickname)+'';
                listcourseStr += ' <p class="weui-news-p onerow">';
                listcourseStr += ''+setNULL(item.userInfo)+'';
                listcourseStr += '</p>';
                listcourseStr += '</div>';

                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<span class="weui-news-left" id="weui-news-left">';
                listcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
/*
                listcourseStr += '<label class="label f-blue b-blue">课程('+setNum(item.courseNum)+')</label>';
*/
                listcourseStr += '<label class="label f-blue b-blue">动态('+setNum(item.dongtaiNum)+')</label>';
                listcourseStr += '</div>';
                listcourseStr += '</span>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>'+setNum(item.funsGuanzhuNum)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';

            }else if(manyType == '6'){//活动
                listcourseStr += '<li class="weui-news-item" onclick=toActivityDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.activityTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago2(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.activityDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.activityImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                if(item.activityJiaobiao != null && item.activityJiaobiao != '' ){
                    if(item.jiaobiaoStart != null && item.jiaobiaoEnd != null ){

                        if(stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+item.activityJiaobiao+'</span>';
                        }else{
                            if(item.activityPrice != null && eval(item.activityPrice) > 0.00){
                                listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.activityPrice)+'</span>';
                            }else{
                                //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                            }
                        }

                    }else{
                        if(item.activityPrice != null && eval(item.activityPrice) > 0.00){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.activityPrice)+'</span>';
                        }else{
                            //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                        }
                    }

                }else{
                    if(item.activityPrice != null && eval(item.activityPrice) > 0.00){
                        listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.activityPrice)+'</span>';
                    }else{
                        //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                    }
                }

                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';

            }else if(manyType == '7'){//课程
                listcourseStr += '<li class="weui-news-item" onclick=toListDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.listTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.listDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.listImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                if(item.listPrice != null && item.listPrice != '' && eval(item.listPrice) > 0.0){
                    listcourseStr += '<span class="weui-mark-rt bg-red">￥'+setNULL(item.listPrice)+'</span>';
                }else if(item.listJiaobiao != null && item.listJiaobiao != ''){
                    listcourseStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.listJiaobiao)+'</span>';
                }
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';

                /*listcourseStr += '<div class="swiper-slide">';

                listcourseStr += '<a onclick=toListDetail("'+item.id+'","1")>';

                if(item.listImage.search('.json') != -1){
                    listcourseStr += '<lottie-player src="'+checkPath(item.listImage,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                }else{
                    listcourseStr += '<img class="maxh"  src="'+ checkPath(item.listImage,'1')+'">';
                }
                listcourseStr += '<div class="weui-news-p onerow ">'+setNULL(item.listTitle)+'</div>';
                listcourseStr += '</a>';
                listcourseStr += '</div>';*/

            }else if(manyType == '8'){//zhutituijian

                    listcourseStr += '<div class="swiper-slide">';

                    listcourseStr += '<a onclick=toCourseList("zhutituijian","1","1","'+item.value+'")>';

                    if(item.logo.search('.json') != -1){
                        listcourseStr += '<lottie-player src="'+checkPath(item.logo,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                    }else{
                        listcourseStr += '<img class="maxh shadowonly"  src="'+ checkPath(item.logo,'1')+'">';
                    }

                    listcourseStr += '</a>';
                    listcourseStr += '</div>';


            }else if(manyType == '10'){//直播

                /*listcourseStr += '<div class="swiper-slide">';

                listcourseStr += '<a onclick=toCourseDetail("'+item.id+'","1") >';

                if(item.courseImage.search('.json') != -1){
                    listcourseStr += '<lottie-player src="'+checkPath(item.courseImage,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                }else{
                    listcourseStr += '<img class="maxh"  src="'+ checkPath(item.courseImage,'1')+'">';
                }
                listcourseStr += '<div class="weui-news-p onerow ">'+setNULL(item.courseTitle)+'</div>';
                listcourseStr += '</a>';
                listcourseStr += '</div>';*/


                //listcourseStr += '<div class="weui-grids" >';
                listcourseStr += '<a onclick=toCourseDetail("'+item.id+'","1") class="weui-grid js_grid" style="width: 50%;padding: 10px 10px;">';
                listcourseStr += '<div class="">';
                if(item.courseImage.search('.json') != -1){
                    listcourseStr += '<lottie-player src="'+checkPath(item.courseImage,'1')+'"  background="transparent"  speed="1"  class="maxh2"  loop autoplay ></lottie-player>';
                }else{
                    listcourseStr += '<img class="maxh2 shadowonly"  src="'+ checkPath(item.courseImage,'1')+'">';
                }
                listcourseStr += '</div>';
                listcourseStr += '<p class="">';
                listcourseStr += '<div class="weui-news-p onerow ">'+setNULL(item.courseTitle)+'</div>';
                listcourseStr += '</p>';
                listcourseStr += '</a>';
                //listcourseStr += '</div>';

            }else if(manyType == '11'){//小视频

                /*listcourseStr += '<div class="swiper-slide">';

                listcourseStr += '<a onclick=toCourseDetail("'+item.id+'","1") >';

                if(item.courseImage.search('.json') != -1){
                    listcourseStr += '<lottie-player src="'+checkPath(item.courseImage,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                }else{
                    listcourseStr += '<img class="maxh"  src="'+ checkPath(item.courseImage,'1')+'">';
                }
                listcourseStr += '<div class="weui-news-p onerow ">'+setNULL(item.courseTitle)+'</div>';

                listcourseStr += '</a>';
                listcourseStr += '</div>';*/

                //listcourseStr += '<div class="weui-grids" onclick=toCourseDetail("'+item.id+'","1")>';
                listcourseStr += '<a onclick=toCourseDetail("'+item.id+'","1") class="weui-grid js_grid" style="width: 50%;padding: 10px 10px;">';
                listcourseStr += '<div class="">';
                if(item.courseImage.search('.json') != -1){
                    listcourseStr += '<lottie-player src="'+checkPath(item.courseImage,'1')+'"  background="transparent"  speed="1"  class="maxh2"  loop autoplay ></lottie-player>';
                }else{
                    listcourseStr += '<img class="maxh2 shadowonly"  src="'+ checkPath(item.courseImage,'1')+'">';
                }
                listcourseStr += '</div>';
                listcourseStr += '<p class="">';
                listcourseStr += '<div class="weui-news-p onerow ">'+setNULL(item.courseTitle)+'</div>';
                listcourseStr += '</p>';
                listcourseStr += '</a>';
                //listcourseStr += '</div>';


            }else{//课程文章
                listcourseStr += '<li class="weui-news-item" onclick=toCourseDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.courseTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.courseDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.courseImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                if(item.courseJiaobiao != null && item.courseJiaobiao != '' ){
                    if(item.jiaobiaoStart != null && item.jiaobiaoEnd != null ){

                        if(stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+item.courseJiaobiao+'</span>';
                        }else{
                            if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                                listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                            }else{
                                //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                            }
                        }

                    }else{
                        if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                        }else{
                            //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                        }
                    }

                }else{
                    if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                        listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                    }else{
                        //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                    }
                }
                if(item.courseXilieno != null && item.courseXilieno != ''){
                    //listcourseStr += '<span class="weui-mark-lb" style="top:0px;border-radius: 0px;margin: 0 auto;background-color: #18b4ed;">系列课</span>';
                }

                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';
                zhuti = item.courseTopic;
            }

　　     });
          if(manyType == '8'){
              //渲染赋值
              if(renderType == '1'){
                  $("#"+renderId+"").append(listcourseStr);
              }else{
                  $("#"+renderId+"").html(listcourseStr);
              }
              if(listcourseStr != '' && listcourseStr != null){
                  $("#dis"+renderId+"").show();
              }
              lunbotu('2',renderId,'5.5');

              $("#swiper-container"+renderId+"").show();
              $("#swiper-pagination"+renderId+"").show();
          }else if(manyType == '10' || manyType == '11'){
              //渲染赋值
              if(renderType == '1'){
                  $("#"+renderId+"").append(listcourseStr);
              }else{
                  $("#"+renderId+"").html(listcourseStr);
              }
              if(listcourseStr != '' && listcourseStr != null){
                  $("#dis"+renderId+"").show();
              }
              lunbotu('2',renderId,'3.5');

              $("#swiper-container"+renderId+"").show();
              $("#swiper-pagination"+renderId+"").show();
          }else{
              //渲染赋值
              if(renderType == '1'){
                  $("#"+renderId+"").append(listcourseStr);
              }else{
                  $("#"+renderId+"").html(listcourseStr);
              }
              if(listcourseStr != '' && listcourseStr != null){
                  $("#dis"+renderId+"").show();
              }
          }



          if(zhuti != null && zhuti != ''){
              $("#topicName").html(zhuti);
          }
      }else{
        $.toast(data.msg, "text");
      }
	}

//列表渲染
function listcourselist2Render(data,renderId,renderType,manyType){
    var listcourseStr = '';
    var zhuti = '';
    if(data.code == '0'){
        var dataArray = data.result;
        if(manyType == '3'){
            //dataArray = dataArray.reverse();
        }
        $.each(dataArray,function(i,item){

            if(manyType == '1'){//课程文章
                /*listcourseStr += '<li class="weui-news-item" onclick=toCourseDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.courseTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.courseDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media" style="background-image:url('+checkPathBackGroubdImage(item.courseImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                if(item.courseJiaobiao != null && item.courseJiaobiao != '' ){
                    if(item.jiaobiaoStart != null && item.jiaobiaoEnd != null ){

                        if(stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+item.courseJiaobiao+'</span>';
                        }else{
                            if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                                listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                            }else{
                                listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                            }
                        }

                    }else{
                        if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                        }else{
                            listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                        }
                    }

                }else{
                    if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                        listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                    }else{
                        listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                    }
                }
                if(item.courseXilieno != null && item.courseXilieno != ''){
                    listcourseStr += '<span class="weui-mark-lb" style="top:0px;border-radius: 0px;margin: 0 auto;background-color: #18b4ed;">系列课</span>';
                }

                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';
                zhuti = item.courseTopic;*/


                listcourseStr += '<div class="swiper-slide">';

                listcourseStr += '<a onclick=toCourseDetail("'+item.id+'","1")>';

                if(item.courseImage.search('.json') != -1){
                    listcourseStr += '<lottie-player src="'+checkPath(item.courseImage,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                }else{
                    listcourseStr += '<img class="maxh shadowonly"  src="'+ checkPath(item.courseImage,'1')+'">';
                }
                if(item.coursePrice != null && item.coursePrice != '' && eval(item.coursePrice) > 0.0){
                    listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                }else if(item.courseJiaobiao != null && item.courseJiaobiao != ''){
                    listcourseStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.courseJiaobiao)+'</span>';
                }
                listcourseStr += '<div class="weui-news-p onerow ">'+setNULL(item.courseTitle)+'</div>';
                listcourseStr += '</a>';
                listcourseStr += '</div>';

            }else if(manyType == '9'){//kedan课程文章
                listcourseStr += '<li class="weui-news-item" onclick=toCourseDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.courseTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.courseDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.courseImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                if(item.courseJiaobiao != null && item.courseJiaobiao != '' ){
                    if(item.jiaobiaoStart != null && item.jiaobiaoEnd != null ){

                        if(stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+item.courseJiaobiao+'</span>';
                        }else{
                            if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                                listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                            }else{
                                //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                            }
                        }

                    }else{
                        if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                        }else{
                            //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                        }
                    }

                }else{
                    if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                        listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                    }else{
                        //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                    }
                }

                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';
                zhuti = item.courseTopic;

                //课程详情
                $("title").html( data.kedan.listTitle);
                var detailcourseStr = '';


                detailcourseStr += '<p>'+data.kedan.listInfo+'</p>';
                detailcourseStr += '<div class="weui-c-tools">';

                detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">'+setNum(data.kedan.listDianjiliang)+'</span></div>';
                detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
                detailcourseStr += '<span  onclick=dianji("17","'+data.kedan.id+'"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan'+data.kedan.id+'">'+setNum(data.kedan.listZan)+'</span> </span>';
                detailcourseStr += '<span class="check checked" onclick=openCommentList("commentDisList","2","1",10,"'+data.kedan.id+'","17","'+data.kedan.createBy.id+'");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">'+setNum(data.kedan.commentNum)+'</span> </span>';

                detailcourseStr += '</div>';

                detailcourseStr += '</div>';


                $("#detailcourse").html(detailcourseStr);
            }else if(manyType == '2'){//轻听
                listcourseStr += '<div class="page-bd-15">';
                listcourseStr += '<div class="weui-news-info padding0">';
                listcourseStr += '<div class="weui-c-article l100">';
                listcourseStr += '<p onclick=toCourseDetail("'+item.id+'","1")  style="text-indent: 0em;font-size: smaller"  id="indent'+(i+1)+'">'+item.courseTitle+'</p>';
                listcourseStr += '<div id="aplayer1'+item.id+'"></div>';
                listcourseStr += '<script type="text/javascript">';
                listcourseStr += 'const ap1'+item.id+' = new APlayer({';
                listcourseStr += 'container: document.getElementById("aplayer1'+item.id+'"), mini: false, autoplay:false,preload:\'none\',';
                listcourseStr += 'audio: [{name: \''+item.courseTitle+'\', artist: \'轻听\', url: \''+checkPath(item.courseFile,"3")+'\', cover: \''+checkPath(item.courseImage,"1")+'\'';
                listcourseStr += '}]';
                listcourseStr += '});';
                listcourseStr += '</script>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';

            }else if(manyType == '30'){//常见问题

                listcourseStr += '<li class="timeline-item"  onclick=disxun("'+item.id+'");>';
                listcourseStr += '<div class="timeline-item-color timeline-item-head"></div>';

                if(i != data.result.length - 1){
                    listcourseStr += '<div class="timeline-item-tail"></div>';
                }

                listcourseStr += '<div class="timeline-item-content">';
                listcourseStr += '<p id="mytitle">'+item.courseTitle+'</p>';
                listcourseStr += '<p>'+timeago(item.updateDate)+'</p>';
                listcourseStr += '<p style="display: none;" id="'+item.id+'">'+filterHTMLTag(item.courseContent)+'</p>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';


            }else if(manyType == '40'){//攻略锦囊
                listcourseStr += '<li class="weui-news-item" onclick=toCourseDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.courseTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.courseDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.courseImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                listcourseStr += '<span class="weui-mark-rt bg-red">'+item.courseJiaobiao+'</span>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';
            }else if(manyType == '5'){//名人堂
                listcourseStr += '<li class="weui-news-item" onclick=toUserHome("'+item.id+'","1")>';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-media shadowonly square" style="background-image:url('+checkPathBackGroubdImage(item.headimgurl,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                if(item.coursePrice != null && item.coursePrice > 0.00){
                    listcourseStr += '<span class="weui-mark-rt bg-green">'+getPriceMoney(item.coursePrice)+'</span>';
                }
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">';
                listcourseStr += ''+setNULL(item.nickname)+'';
                listcourseStr += ' <p class="weui-news-p onerow">';
                listcourseStr += ''+setNULL(item.userInfo)+'';
                listcourseStr += '</p>';
                listcourseStr += '</div>';

                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<span class="weui-news-left" id="weui-news-left">';
                listcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                /*
                                listcourseStr += '<label class="label f-blue b-blue">课程('+setNum(item.courseNum)+')</label>';
                */
                listcourseStr += '<label class="label f-blue b-blue">动态('+setNum(item.dongtaiNum)+')</label>';
                listcourseStr += '</div>';
                listcourseStr += '</span>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>'+setNum(item.funsGuanzhuNum)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';

            }else if(manyType == '6'){//活动
                listcourseStr += '<li class="weui-news-item" onclick=toActivityDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.activityTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago2(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.activityDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.activityImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                if(item.activityJiaobiao != null && item.activityJiaobiao != '' ){
                    if(item.jiaobiaoStart != null && item.jiaobiaoEnd != null ){

                        if(stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+item.activityJiaobiao+'</span>';
                        }else{
                            if(item.activityPrice != null && eval(item.activityPrice) > 0.00){
                                listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.activityPrice)+'</span>';
                            }else{
                                //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                            }
                        }

                    }else{
                        if(item.activityPrice != null && eval(item.activityPrice) > 0.00){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.activityPrice)+'</span>';
                        }else{
                            //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                        }
                    }

                }else{
                    if(item.activityPrice != null && eval(item.activityPrice) > 0.00){
                        listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.activityPrice)+'</span>';
                    }else{
                        //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                    }
                }

                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';

            }else if(manyType == '7'){//课程
                /*listcourseStr += '<li class="weui-news-item" onclick=toListDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.listTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.listDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media" style="background-image:url('+checkPathBackGroubdImage(item.listImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                if(item.listJiaobiao != null && item.listJiaobiao != ''){
                    listcourseStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.listJiaobiao)+'</span>';
				}
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';*/

                listcourseStr += '<div class="swiper-slide">';

                listcourseStr += '<a onclick=toListDetail("'+item.id+'","1")>';

                if(item.listImage.search('.json') != -1){
                    listcourseStr += '<lottie-player src="'+checkPath(item.listImage,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                }else{
                    listcourseStr += '<img class="maxh shadowonly"  src="'+ checkPath(item.listImage,'1')+'">';
                }
                if(item.listPrice != null && item.listPrice != '' && eval(item.listPrice) > 0.0){
                    listcourseStr += '<span class="weui-mark-rt bg-red">￥'+setNULL(item.listPrice)+'</span>';
                }else if(item.listJiaobiao != null && item.listJiaobiao != ''){
                    listcourseStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.listJiaobiao)+'</span>';
                }
                listcourseStr += '<div class="weui-news-p onerow ">'+setNULL(item.listTitle)+'</div>';
                listcourseStr += '</a>';
                listcourseStr += '</div>';

            }else if(manyType == '8'){//zhutituijian

                listcourseStr += '<div class="swiper-slide">';

                listcourseStr += '<a onclick=toCourseList("zhutituijian","1","1","'+item.value+'")>';

                if(item.logo.search('.json') != -1){
                    listcourseStr += '<lottie-player src="'+checkPath(item.logo,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                }else{
                    listcourseStr += '<img class="maxh shadowonly"  src="'+ checkPath(item.logo,'1')+'">';
                }

                listcourseStr += '</a>';
                listcourseStr += '</div>';


            }else if(manyType == '10'){//直播

                listcourseStr += '<div class="swiper-slide">';

                listcourseStr += '<a onclick=toCourseDetail("'+item.id+'","1") >';

                if(item.courseImage.search('.json') != -1){
                    listcourseStr += '<lottie-player src="'+checkPath(item.courseImage,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                }else{
                    listcourseStr += '<img class="maxh shadowonly"  src="'+ checkPath(item.courseImage,'1')+'">';
                }
                listcourseStr += '<div class="weui-news-p onerow ">'+setNULL(item.courseTitle)+'</div>';
                listcourseStr += '</a>';
                listcourseStr += '</div>';


            }else if(manyType == '11'){//小视频

                listcourseStr += '<div class="swiper-slide">';

                listcourseStr += '<a onclick=toCourseDetail("'+item.id+'","1") >';

                if(item.courseImage.search('.json') != -1){
                    listcourseStr += '<lottie-player src="'+checkPath(item.courseImage,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                }else{
                    listcourseStr += '<img class="maxh shadowonly"  src="'+ checkPath(item.courseImage,'1')+'">';
                }
                listcourseStr += '<div class="weui-news-p onerow ">'+setNULL(item.courseTitle)+'</div>';

                listcourseStr += '</a>';
                listcourseStr += '</div>';


            }else{//课程文章
                listcourseStr += '<li class="weui-news-item" onclick=toCourseDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.courseTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.courseDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.courseImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                if(item.courseJiaobiao != null && item.courseJiaobiao != '' ){
                    if(item.jiaobiaoStart != null && item.jiaobiaoEnd != null ){

                        if(stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+item.courseJiaobiao+'</span>';
                        }else{
                            if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                                listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                            }else{
                                //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                            }
                        }

                    }else{
                        if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                        }else{
                            //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                        }
                    }

                }else{
                    if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                        listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                    }else{
                        //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                    }
                }
                if(item.courseXilieno != null && item.courseXilieno != ''){
                    //listcourseStr += '<span class="weui-mark-lb" style="top:0px;border-radius: 0px;margin: 0 auto;background-color: #18b4ed;">系列课</span>';
                }

                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';
                zhuti = item.courseTopic;
            }

        });
        if(manyType == '8'){
            //渲染赋值
            if(renderType == '1'){
                $("#"+renderId+"").append(listcourseStr);
            }else{
                $("#"+renderId+"").html(listcourseStr);
            }
            if(listcourseStr != '' && listcourseStr != null){
                $("#dis"+renderId+"").show();
            }
            lunbotu('2',renderId,'5.5');

            $("#swiper-container"+renderId+"").show();
            $("#swiper-pagination"+renderId+"").show();
        }else if(manyType == '10' || manyType == '11'){
            //渲染赋值
            if(renderType == '1'){
                $("#"+renderId+"").append(listcourseStr);
            }else{
                $("#"+renderId+"").html(listcourseStr);
            }
            if(listcourseStr != '' && listcourseStr != null){
                $("#dis"+renderId+"").show();
            }
            lunbotu('2',renderId,'3.5');

            $("#swiper-container"+renderId+"").show();
            $("#swiper-pagination"+renderId+"").show();
        }else if(manyType == '7' || manyType == '1'){
            //渲染赋值
            if(renderType == '1'){
                $("#"+renderId+"").append(listcourseStr);
            }else{
                $("#"+renderId+"").html(listcourseStr);
            }
            if(listcourseStr != '' && listcourseStr != null){
                $("#dis"+renderId+"").show();
            }
            lunbotu('2',renderId,'2.5');

            $("#swiper-container"+renderId+"").show();
            $("#swiper-pagination"+renderId+"").show();
        }else{
            //渲染赋值
            if(renderType == '1'){
                $("#"+renderId+"").append(listcourseStr);
            }else{
                $("#"+renderId+"").html(listcourseStr);
            }
            if(listcourseStr != '' && listcourseStr != null){
                $("#dis"+renderId+"").show();
            }
        }



        if(zhuti != null && zhuti != ''){
            $("#topicName").html(zhuti);
        }
    }else{
        $.toast(data.msg, "text");
    }
}

function listcourselist3Render(data,renderId,renderType,manyType){
    var listcourseStr = '';
    var zhuti = '';
    if(data.code == '0'){
        var dataArray = data.result;
        if(manyType == '3'){
            //dataArray = dataArray.reverse();
        }
        $.each(dataArray,function(i,item){

            if(manyType == '1'){//课程文章
                /*listcourseStr += '<li class="weui-news-item" onclick=toCourseDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.courseTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.courseDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media" style="background-image:url('+checkPathBackGroubdImage(item.courseImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                if(item.courseJiaobiao != null && item.courseJiaobiao != '' ){
                    if(item.jiaobiaoStart != null && item.jiaobiaoEnd != null ){

                        if(stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+item.courseJiaobiao+'</span>';
                        }else{
                            if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                                listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                            }else{
                                listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                            }
                        }

                    }else{
                        if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                        }else{
                            listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                        }
                    }

                }else{
                    if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                        listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                    }else{
                        listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                    }
                }
                if(item.courseXilieno != null && item.courseXilieno != ''){
                    listcourseStr += '<span class="weui-mark-lb" style="top:0px;border-radius: 0px;margin: 0 auto;background-color: #18b4ed;">系列课</span>';
                }

                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';
                zhuti = item.courseTopic;*/


                listcourseStr += '<div class="swiper-slide">';

                listcourseStr += '<a onclick=toCourseDetail("'+item.id+'","1")>';

                if(item.courseImage.search('.json') != -1){
                    listcourseStr += '<lottie-player src="'+checkPath(item.courseImage,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                }else{
                    listcourseStr += '<img class="maxh shadowonly"  src="'+ checkPath(item.courseImage,'1')+'">';
                }
                if(item.coursePrice != null && item.coursePrice != '' && eval(item.coursePrice) > 0.0){
                    listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                }else if(item.courseJiaobiao != null && item.courseJiaobiao != ''){
                    listcourseStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.courseJiaobiao)+'</span>';
                }
                listcourseStr += '<div class="weui-news-p onerow ">'+setNULL(item.courseTitle)+'</div>';
                listcourseStr += '</a>';
                listcourseStr += '</div>';

            }else if(manyType == '9'){//kedan课程文章
                listcourseStr += '<li class="weui-news-item" onclick=toCourseDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.courseTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.courseDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.courseImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                if(item.courseJiaobiao != null && item.courseJiaobiao != '' ){
                    if(item.jiaobiaoStart != null && item.jiaobiaoEnd != null ){

                        if(stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+item.courseJiaobiao+'</span>';
                        }else{
                            if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                                listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                            }else{
                                //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                            }
                        }

                    }else{
                        if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                        }else{
                            //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                        }
                    }

                }else{
                    if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                        listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                    }else{
                        //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                    }
                }

                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';
                zhuti = item.courseTopic;

                //课程详情
                $("title").html( data.kedan.listTitle);
                var detailcourseStr = '';


                detailcourseStr += '<p>'+data.kedan.listInfo+'</p>';
                detailcourseStr += '<div class="weui-c-tools">';

                detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">'+setNum(data.kedan.listDianjiliang)+'</span></div>';
                detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
                detailcourseStr += '<span  onclick=dianji("17","'+data.kedan.id+'"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan'+data.kedan.id+'">'+setNum(data.kedan.listZan)+'</span> </span>';
                detailcourseStr += '<span class="check checked" onclick=openCommentList("commentDisList","2","1",10,"'+data.kedan.id+'","17","'+data.kedan.createBy.id+'");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">'+setNum(data.kedan.commentNum)+'</span> </span>';

                detailcourseStr += '</div>';

                detailcourseStr += '</div>';


                $("#detailcourse").html(detailcourseStr);
            }else if(manyType == '2'){//轻听
                listcourseStr += '<div class="page-bd-15">';
                listcourseStr += '<div class="weui-news-info padding0">';
                listcourseStr += '<div class="weui-c-article l100">';
                listcourseStr += '<p onclick=toCourseDetail("'+item.id+'","1")  style="text-indent: 0em;font-size: smaller"  id="indent'+(i+1)+'">'+item.courseTitle+'</p>';
                listcourseStr += '<div id="aplayer1'+item.id+'"></div>';
                listcourseStr += '<script type="text/javascript">';
                listcourseStr += 'const ap1'+item.id+' = new APlayer({';
                listcourseStr += 'container: document.getElementById("aplayer1'+item.id+'"), mini: false, autoplay:false,preload:\'none\',';
                listcourseStr += 'audio: [{name: \''+item.courseTitle+'\', artist: \'轻听\', url: \''+checkPath(item.courseFile,"3")+'\', cover: \''+checkPath(item.courseImage,"1")+'\'';
                listcourseStr += '}]';
                listcourseStr += '});';
                listcourseStr += '</script>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';

            }else if(manyType == '30'){//常见问题

                listcourseStr += '<li class="timeline-item"  onclick=disxun("'+item.id+'");>';
                listcourseStr += '<div class="timeline-item-color timeline-item-head"></div>';

                if(i != data.result.length - 1){
                    listcourseStr += '<div class="timeline-item-tail"></div>';
                }

                listcourseStr += '<div class="timeline-item-content">';
                listcourseStr += '<p id="mytitle">'+item.courseTitle+'</p>';
                listcourseStr += '<p>'+timeago(item.updateDate)+'</p>';
                listcourseStr += '<p style="display: none;" id="'+item.id+'">'+filterHTMLTag(item.courseContent)+'</p>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';


            }else if(manyType == '40'){//攻略锦囊
                listcourseStr += '<li class="weui-news-item" onclick=toCourseDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.courseTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.courseDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.courseImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                listcourseStr += '<span class="weui-mark-rt bg-red">'+item.courseJiaobiao+'</span>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';
            }else if(manyType == '5'){//名人堂
                listcourseStr += '<li class="weui-news-item" onclick=toUserHome("'+item.id+'","1")>';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-media shadowonly square" style="background-image:url('+checkPathBackGroubdImage(item.headimgurl,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                if(item.coursePrice != null && item.coursePrice > 0.00){
                    listcourseStr += '<span class="weui-mark-rt bg-green">'+getPriceMoney(item.coursePrice)+'</span>';
                }
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">';
                listcourseStr += ''+setNULL(item.nickname)+'';
                listcourseStr += ' <p class="weui-news-p onerow">';
                listcourseStr += ''+setNULL(item.userInfo)+'';
                listcourseStr += '</p>';
                listcourseStr += '</div>';

                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<span class="weui-news-left" id="weui-news-left">';
                listcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                /*
                                listcourseStr += '<label class="label f-blue b-blue">课程('+setNum(item.courseNum)+')</label>';
                */
                listcourseStr += '<label class="label f-blue b-blue">动态('+setNum(item.dongtaiNum)+')</label>';
                listcourseStr += '</div>';
                listcourseStr += '</span>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>'+setNum(item.funsGuanzhuNum)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';

            }else if(manyType == '6'){//活动
                listcourseStr += '<li class="weui-news-item" onclick=toActivityDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.activityTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago2(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.activityDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.activityImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                if(item.activityJiaobiao != null && item.activityJiaobiao != '' ){
                    if(item.jiaobiaoStart != null && item.jiaobiaoEnd != null ){

                        if(stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+item.activityJiaobiao+'</span>';
                        }else{
                            if(item.activityPrice != null && eval(item.activityPrice) > 0.00){
                                listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.activityPrice)+'</span>';
                            }else{
                                //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                            }
                        }

                    }else{
                        if(item.activityPrice != null && eval(item.activityPrice) > 0.00){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.activityPrice)+'</span>';
                        }else{
                            //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                        }
                    }

                }else{
                    if(item.activityPrice != null && eval(item.activityPrice) > 0.00){
                        listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.activityPrice)+'</span>';
                    }else{
                        //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                    }
                }

                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';

            }else if(manyType == '7'){//课程
                /*listcourseStr += '<li class="weui-news-item" onclick=toListDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.listTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.listDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media" style="background-image:url('+checkPathBackGroubdImage(item.listImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                if(item.listJiaobiao != null && item.listJiaobiao != ''){
                    listcourseStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.listJiaobiao)+'</span>';
				}
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';*/

                listcourseStr += '<div class="swiper-slide">';

                listcourseStr += '<a onclick=toListDetail("'+item.id+'","1")>';

                if(item.listImage.search('.json') != -1){
                    listcourseStr += '<lottie-player src="'+checkPath(item.listImage,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                }else{
                    listcourseStr += '<img class="maxh shadowonly"  src="'+ checkPath(item.listImage,'1')+'">';
                }
                if(item.listPrice != null && item.listPrice != '' && eval(item.listPrice) > 0.0){
                    listcourseStr += '<span class="weui-mark-rt bg-red">￥'+setNULL(item.listPrice)+'</span>';
                }else if(item.listJiaobiao != null && item.listJiaobiao != ''){
                    listcourseStr += '<span class="weui-mark-rt bg-red">'+setNULL(item.listJiaobiao)+'</span>';
                }
                listcourseStr += '<div class="weui-news-p onerow ">'+setNULL(item.listTitle)+'</div>';
                listcourseStr += '</a>';
                listcourseStr += '</div>';

            }else if(manyType == '8'){//zhutituijian

                listcourseStr += '<div class="swiper-slide">';

                listcourseStr += '<a onclick=dongtailinkype("'+item.value+'");>';

                if(item.logo.search('.json') != -1){
                    listcourseStr += '<lottie-player src="'+checkPath(item.logo,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                }else{
                    listcourseStr += '<img class="maxh shadowonly"  src="'+ checkPath(item.logo,'1')+'">';
                }

                listcourseStr += '</a>';
                listcourseStr += '</div>';


            }else if(manyType == '10'){//直播

                listcourseStr += '<div class="swiper-slide">';

                listcourseStr += '<a onclick=toCourseDetail("'+item.id+'","1") >';

                if(item.courseImage.search('.json') != -1){
                    listcourseStr += '<lottie-player src="'+checkPath(item.courseImage,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                }else{
                    listcourseStr += '<img class="maxh shadowonly"  src="'+ checkPath(item.courseImage,'1')+'">';
                }
                listcourseStr += '<div class="weui-news-p onerow ">'+setNULL(item.courseTitle)+'</div>';
                listcourseStr += '</a>';
                listcourseStr += '</div>';


            }else if(manyType == '11'){//小视频

                listcourseStr += '<div class="swiper-slide">';

                listcourseStr += '<a onclick=toCourseDetail("'+item.id+'","1") >';

                if(item.courseImage.search('.json') != -1){
                    listcourseStr += '<lottie-player src="'+checkPath(item.courseImage,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                }else{
                    listcourseStr += '<img class="maxh shadowonly"  src="'+ checkPath(item.courseImage,'1')+'">';
                }
                listcourseStr += '<div class="weui-news-p onerow ">'+setNULL(item.courseTitle)+'</div>';

                listcourseStr += '</a>';
                listcourseStr += '</div>';


            }else{//课程文章
                listcourseStr += '<li class="weui-news-item" onclick=toCourseDetail("'+item.id+'","1") >';
                listcourseStr += '<div class="weui-news-inner">';
                listcourseStr += '<div class="weui-news-inners">';
                listcourseStr += '<div class="weui-news-text">';
                listcourseStr += '<div class="weui-news-title">'+item.courseTitle+'</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-info">';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-51 weui-tabbar__icon" id="icon28"></i>'+timeago(item.createDate)+'';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-infoitem">';
                listcourseStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.courseDianjiliang)+'';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '<div class="weui-news-media shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.courseImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;">';
                if(item.courseJiaobiao != null && item.courseJiaobiao != '' ){
                    if(item.jiaobiaoStart != null && item.jiaobiaoEnd != null ){

                        if(stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+item.courseJiaobiao+'</span>';
                        }else{
                            if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                                listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                            }else{
                                //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                            }
                        }

                    }else{
                        if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                            listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                        }else{
                            //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                        }
                    }

                }else{
                    if(item.coursePrice != null && eval(item.coursePrice) > 0.00){
                        listcourseStr += '<span class="weui-mark-rt bg-red">'+getPriceMoney(item.coursePrice)+'</span>';
                    }else{
                        //listcourseStr += '<span class="weui-mark-rt bg-green">免费</span>';
                    }
                }
                if(item.courseXilieno != null && item.courseXilieno != ''){
                    //listcourseStr += '<span class="weui-mark-lb" style="top:0px;border-radius: 0px;margin: 0 auto;background-color: #18b4ed;">系列课</span>';
                }

                listcourseStr += '</div>';
                listcourseStr += '</div>';
                listcourseStr += '</li>';
                zhuti = item.courseTopic;
            }

        });
        if(manyType == '8'){
            //渲染赋值
            if(renderType == '1'){
                $("#"+renderId+"").append(listcourseStr);
            }else{
                $("#"+renderId+"").html(listcourseStr);
            }
            if(listcourseStr != '' && listcourseStr != null){
                $("#dis"+renderId+"").show();
            }
            lunbotu('2',renderId,'5.5');

            $("#swiper-container"+renderId+"").show();
            $("#swiper-pagination"+renderId+"").show();
        }else if(manyType == '10' || manyType == '11'){
            //渲染赋值
            if(renderType == '1'){
                $("#"+renderId+"").append(listcourseStr);
            }else{
                $("#"+renderId+"").html(listcourseStr);
            }
            if(listcourseStr != '' && listcourseStr != null){
                $("#dis"+renderId+"").show();
            }
            lunbotu('2',renderId,'3.5');

            $("#swiper-container"+renderId+"").show();
            $("#swiper-pagination"+renderId+"").show();
        }else if(manyType == '7' || manyType == '1'){
            //渲染赋值
            if(renderType == '1'){
                $("#"+renderId+"").append(listcourseStr);
            }else{
                $("#"+renderId+"").html(listcourseStr);
            }
            if(listcourseStr != '' && listcourseStr != null){
                $("#dis"+renderId+"").show();
            }
            lunbotu('2',renderId,'2.5');

            $("#swiper-container"+renderId+"").show();
            $("#swiper-pagination"+renderId+"").show();
        }else{
            //渲染赋值
            if(renderType == '1'){
                $("#"+renderId+"").append(listcourseStr);
            }else{
                $("#"+renderId+"").html(listcourseStr);
            }
            if(listcourseStr != '' && listcourseStr != null){
                $("#dis"+renderId+"").show();
            }
        }



        if(zhuti != null && zhuti != ''){
            $("#topicName").html(zhuti);
        }
    }else{
        $.toast(data.msg, "text");
    }
}



//保存数据
function savecourse(){
    //console.log("2222s");
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        initNRcourse();
        return false;
    }
    //console.log("22222");
    //参数
    var courseTitle = $("#courseTitle").val();
    var courseImage = pathUrl('uploaderInputA');
    var courseContent = editor2.txt.html();
    var courseXilieno = $("#courseXilieno").val();
    var courseFile = pathUrl('uploaderInputC');
    var coursePrice = $("#coursePrice").val();
    var courseTopic = $("#courseTopic").val();
    var jianjie = editor1.txt.html();
    var token = localStorage.getItem('token');
    var id = GetUrlString("id");
    //判断不为空数据是否为空
    /*if(courseType ==null || courseType ==''){
        $.toast("请输入课程分类", "text");
        initNRcourse();
        return false;
    }*/

    if(courseTopic ==null || courseTopic =='' || courseTopic =='请选择'){
        $.toast("请选择主题", "text");
        initNRcourse();
        return false;
    }

    if(courseTitle ==null || courseTitle ==''){
        $.toast("请输入标题", "text");
        initNRcourse();
        return false;
    }

    if(courseImage ==null || courseImage ==''){
        $.toast("请输入封面", "text");
        initNRcourse();
        return false;
    }
    if(courseContent ==null || courseContent ==''){
        $.toast("请输入正文内容", "text");
        initNRcourse();
        return false;
    }

    /*if(coursePrice ==null || coursePrice ==''){
        $.toast("请输入课程价格", "text");
        initNRcourse();
        return false;
    }*/




    //传输数据
    var datacourse = {
        "courseType":'1',
        "courseTitle":courseTitle,
        "courseImage":courseImage,
        "courseContent":courseContent,
        "courseXilieno":courseXilieno,
        "courseFile":courseFile,
        "coursePrice":coursePrice,
        "jianjie":jianjie,
        "courseTopic":courseTopic,
        "contentType":'4',
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "id":id,
        "token":token
    }

    instancecourselist({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/xy/course/course/savereturn',
        data:datacourse,
        cancelToken: sourcecourselist.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //$.toast("操作成功", 'success');
                //toindex();
                //console.log(rs);
                toCourseDetail(rs.data.result.id,"1");
            }else{
                //$.toast(rs.data.msg, "text");
                initNRcourse();
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
            initNRcourse();
        }

    });

}



//保存数据
function savecourseactivity(){
    //console.log("2222s");
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        initNRcourse();
        return false;
    }
    //console.log("22222");
    //参数
    var courseTitle = $("#courseTitle").val();
    var courseImage = pathUrl('uploaderInputA');
    var courseContent = editor2.txt.html();
/*
    var courseXilieno = $("#courseXilieno").val();
*/
    var courseXilieno = $("#endDate").val();
    if(courseXilieno != null && courseXilieno != ''){
        courseXilieno = courseXilieno + "00:00:00";
    }

    var courseFile = pathUrl('uploaderInputC');
    var coursePrice = $("#coursePrice").val();
    var courseTopic = $("#courseTopic").val();
    var jianjie = editor1.txt.html();
    var token = localStorage.getItem('token');
    var id = GetUrlString("id");
    var activityAddress = $("#activityAddress").val();
    var activityCity = $("#activityCity").attr("data-code");
    //判断不为空数据是否为空
    /*if(courseType ==null || courseType ==''){
        $.toast("请输入课程分类", "text");
        initNRcourse();
        return false;
    }*/

    if(courseTopic ==null || courseTopic ==''){
        $.toast("请选择活动主题", "text");
        initNRcourse();
        return false;
    }

    if(courseTitle ==null || courseTitle ==''){
        $.toast("请输入活动标题", "text");
        initNRcourse();
        return false;
    }

    if(courseImage ==null || courseImage ==''){
        $.toast("请输入活动封面", "text");
        initNRcourse();
        return false;
    }
    if(courseContent ==null || courseContent ==''){
        $.toast("请输入活动内容", "text");
        initNRcourse();
        return false;
    }

    if(coursePrice !=null && coursePrice !='' && coursePrice !='0' && eval(coursePrice) > 0.00 ){
        if(courseXilieno ==null || courseXilieno ==''){
            $.toast("请选择报名截止日期", "text");
            initNRcourse();
            return false;
        }

    }




    //传输数据activityType == 1线上活动 2线下活动
    var datacourse = {
        "activityType":courseTopic,
        "activityTitle":courseTitle,
        "activityImage":courseImage,
        "activityContent":courseContent,
        "applyEnd":courseXilieno,
        "activityEnd":courseXilieno,
        "activityFile":courseFile,
        "activityAddress":activityAddress,
        "activityPrice":coursePrice,
        "activityTopic":courseTopic,
        "activityCity":activityCity,
        "id":id,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecourselist({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/xy/activity/activity/savereturn',
        data:datacourse,
        cancelToken: sourcecourselist.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //$.toast("操作成功", 'success');
                //toindex();
                //console.log(rs);
                toActivityDetail(rs.data.result.id,"1");
            }else{
                //$.toast(rs.data.msg, "text");
                initNRcourse();
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
            initNRcourse();
        }

    });

}

//保存数据
function savecourselaxin(){
    //console.log("2222s");
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        initNRcourse();
        return false;
    }
    //console.log("22222");
    //参数
    var kaTitle = $("#kaTitle").val();
    var kaImage = pathUrl('uploaderInputA');
    var kaContent = editor2.txt.html();
    var vipshareAgent = $("#vipshareAgent").val();
    var zhuceNum = $("#zhuceNum").val();
    var l6 =  $("#l6").val();
    var qrurl = $("#qrurl").val();
    var qrc = pathUrl('uploaderInputB');
    var video = pathUrl('uploaderInputC');
    var token = localStorage.getItem('token');



    if(localStorage.getItem("userLevel") == '0' || localStorage.getItem("userLevel") == '1' ){
        $.toast("对不起，您暂无发布权限!", "text");
        initNRcourse();
        return false;
    }

    if(kaTitle ==null || kaTitle ==''){
        $.toast("请填写项目名称", "text");
        initNRcourse();
        return false;
    }

    if(kaImage ==null || kaImage ==''){
        $.toast("请输入项目封面", "text");
        initNRcourse();
        return false;
    }

    if(vipshareAgent == null || vipshareAgent =='' ){
        $.toast("请输入佣金", "text");
        initNRcourse();
        return false;
    }else if(eval(vipshareAgent) < 2.0){
        $.toast("请输入佣金大于2元", "text");
        initNRcourse();
        return false;
    }
    if(zhuceNum ==null || zhuceNum ==''){
        $.toast("请输入结算时间", "text");
        initNRcourse();
        return false;
    }

    if(l6 ==null || l6 ==''){
        $.toast("请输入交单格式", "text");
        initNRcourse();
        return false;
    }

    if((qrurl ==null || qrurl =='') && (qrc ==null || qrc =='')){
        $.toast("请输入做单链接或上传做单二维码", "text");
        initNRcourse();
        return false;
    }

    if((kaContent ==null || kaContent =='' || kaContent =='<p><br></p>') && (video ==null || video =='')){
        $.toast("请上传操作步骤文档或输入操作步骤内容", "text");
        initNRcourse();
        return false;
    }


    var datacourse = {
        "kaTitle":kaTitle,
        "kaImage":kaImage,
        "vipshareAgent":vipshareAgent,
        "zhuceNum":zhuceNum,
        "l6":l6,
        "qrurl":qrurl,
        "qrc":qrc,
        "kaContent":kaContent,
        "video":video,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecourselist({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/zq/xinyongka/xinYongKa/savereturn',
        data:datacourse,
        cancelToken: sourcecourselist.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                $.toast.prototype.defaults.duration=1000;//1秒
                $.toast("提交成功，请等待审核！", "text");
                //location.href='qianbao.html';
                setTimeout(function() {
                    location.href='xiangmulist.html';
                }, 1000);
            }
        }else{
            console.log('请求异常！')
            $.toast("操作失败", "text");
            initNRcourse();
        }

    });

}


//防重复提交保存
function saveNRcourse(){
    var savecourseFlag = $("#savecourseFlag").val();
    if(savecourseFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
        if($("#savecourseFlag").size() == 0){
            $("body").append("<input type='hidden' id='savecourseFlag' value='1' >");

        }
        savecourse();
    }
}

//防重复提交保存
function saveNRcourseactivity(){
    var savecourseFlag = $("#savecourseFlag").val();
    if(savecourseFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
        if($("#savecourseFlag").size() == 0){
            $("body").append("<input type='hidden' id='savecourseFlag' value='1' >");

        }
        savecourseactivity();
    }
}


//防重复提交保存
function saveNRcourselaxin(){
    var savecourseFlag = $("#savecourseFlag").val();
    if(savecourseFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
        if($("#savecourseFlag").size() == 0){
            $("body").append("<input type='hidden' id='savecourseFlag' value='1' >");

        }
        savecourselaxin();
    }
}

//初始化重复提交判断
function initNRcourse(){
    $("#savecourseFlag").val('0');
}
/*
//监听提交保存
$("#buttonSavecourse").click(function(){
    saveNRcourse();
})*/


//保存数据
function getcoursedetail(){

    //参数
    var id = GetUrlString("id");
    var token = localStorage.getItem('token');



    //传输数据
    var datacourse = {
        "id":id,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecourselist({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/xy/course/course/detail',
        data:datacourse,
        cancelToken: sourcecourselist.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                if(rs.data.result.courseTitle != null && rs.data.result.courseTitle != ''){
                    $("#courseTitle").val(rs.data.result.courseTitle);
                }
                if(rs.data.result.coursePrice != null && rs.data.result.coursePrice != ''){
                    $("#coursePrice").val(rs.data.result.coursePrice);
                }

                if(rs.data.result.courseXilieno != null && rs.data.result.courseXilieno != ''){
                    $("#courseXilieno").val(rs.data.result.courseXilieno);
                }


                if(rs.data.result.courseImage != null && rs.data.result.courseImage != ''){
                    $("body").append("<input type='hidden' id='uploaderInputAUrl15552728979030' value='"+rs.data.result.courseImag+"' >");
                    var str = '<li class="weui-uploader__file weui-uploader__file_status" style="background-image:url('+checkPathBackGroubdImage(rs.data.result.courseImage,"1")+')"><div class="weui-uploader__file-content" id="progressA15552728979030"><i class="weui-icon-success"></i></div></li>';
                    $("#uploaderFilesA").html(str);
                }

                if(rs.data.result.courseFile != null && rs.data.result.courseFile != ''){
                    $("body").append("<input type='hidden' id='uploaderInputCUrl15552728979031' value='"+rs.data.result.courseFile+"' >");
                    var str = '<li class="weui-uploader__file weui-uploader__file_status" style="background-image:url('+checkPathBackGroubdImage(rs.data.result.courseFile,"1")+')"><div class="weui-uploader__file-content" id="progressC15552728979031"><i class="weui-icon-success"></i></div></li>';
                    $("#uploaderFilesC").html(str);
                }


                if(rs.data.result.courseTopic != null && rs.data.result.courseTopic != ''){


                    //$("#courseTopic").val(rs.data.result.courseTopic);
                    getQuestionTypeInfo2(rs.data.result.courseTopic);


                }

                //console.log(rs.data.result.jianjie);
                if(rs.data.result.jianjie != null && rs.data.result.jianjie != ''){
                    editor1.txt.html(rs.data.result.jianjie);
                }

                if(rs.data.result.courseContent != null && rs.data.result.courseContent != ''){
                    editor2.txt.html(rs.data.result.courseContent);
                }

            }
        }else{
            console.log('请求异常！');
        }

    });

}

//提交BD表单
function insertMyBdMsg(){
	 var saveBDFlag = $("#saveBDFlag").val();
    if(saveBDFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
        $("body").append("<input type='hidden' id='saveBDFlag' value='1' >");
        insertMyBdMsg()
    }
	

}

$("#tiJiaoXinxi").click(function(){
	 //在提交请求之前判断是否登录
		if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
			isLogin('','');
			initNRcourse();
			return false;
		}
    // savehongBao();
    // paySelect();
    // pay();
    insertMyBdMsg();

});

				function insertMyBdMsg(){
					
					var token = localStorage.getItem('token');
					
				    if($("#overTime").val() =='' ||  $("#overTime").val() ==null){
				            alert("请完善资料！") ;
				            return false;
				    } 
					
					var bdFenlei = $("#bdFenlei").val();
					var bankName = $("#bankName").val();
					var productName = $("#productName").val();
					var cardType = $("#cardType").val();
					var price = $("#price").val();
					var qichongMoney = $("#qichongMoney").val();
					var overTime = $("#overTime").val();
					var tuiguangNum = $("#tuiguangNum").val();
					var jiesuanWay = $("#jiesuanWay").attr("data-values");
					var ziZhi = $("#ziZhi").attr("data-values");
					var fenxiaoSupport = $("#fenxiaoSupport").attr("data-values");
					var duijieWay = $("#duijieWay").attr("data-values");
					var jiesuanZhouqi = $("#jiesuanZhouqi").attr("data-values");
					var productLabel = $("#productLabel").val();
					var productDesc = $("#productDesc").val();
					var mobile = $("#mobile").val();
					var issuer = $("#issuer").val();
					
					//传送数据
					var Bd = {
				        "bdFenlei":bdFenlei,
				        "bankName":bankName,
				        "productName":productName,
				        "cardType":cardType,
				        "price":price,
				        "qichongMoney":qichongMoney,
				        "overTime":overTime,
				        "tuiguangNum":tuiguangNum,
				        "jiesuanWay":jiesuanWay,
				        "ziZhi":ziZhi,
                        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
				        "fenxiaoSupport":fenxiaoSupport,
				        "duijieWay":duijieWay,
				        "jiesuanZhouqi":jiesuanZhouqi,
				        "productLabel":productLabel,
				        "productDesc":productDesc,
				        "mobile":mobile,
				        "issuer":issuer,
				        "token":token
				    }
					
					//console.log(Bd)
				
			instancecourselist({
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'Content-Type': 'application/json;charset=UTF-8',
					'Access-Control-Allow-Origin': '*'
				}, //设置跨域请求头
				method: 'post',
				url: 'sfl/bd/bd/insert',
				data: Bd,
				cancelToken: sourcecourselist.token
			}).then(function(data){
				//console.log(data)
				window.location.href='mybdList.html?share='+getShareId()+'&s='+getSaasId();//
				
			});
					
		}