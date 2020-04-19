var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost";//本地模式
}

//文件请求URL
var baseFileUrlcourse = ''+basehost+'';

//推广有效时间
var dayInUser = localStorage.getItem("suofenday");
if(dayInUser == null || dayInUser == ''){
    dayInUser = 90;
}
//请求实例
var instancecourse = axios.create({
  baseURL: ''+basehost+'/sfd/a/api/',
  timeout: 180000000,
  headers: {'token': localStorage.getItem('token')}
});



//取消请求
var CancelTokencourse = axios.CancelToken;
var sourcecourse = CancelTokencourse.source();

// 添加请求拦截器
instancecourse.interceptors.request.use(function (config) {

    // 在发送请求之前做些什么
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        //isLogin('','');
        //sourcecourse.cancel();
    }
   sessionStorage.clear();return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instancecourse.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

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
                if(share == '0'){
                    share = '1';
                }
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
                if(share == '0'){
                    share = '1';
                }
            }
        }

    }
    return share;
}
function refresh() {
    //console.log(6);
    if(getIsAPPLE()){
        //console.log(7);
        window.location.href=curWwwPath;
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
function checkPath(url,flag) {
    if(url == null || url == ''){
        if(flag == '1'){//头像
            return basehost + baseDefaultHead;
        }else if(flag == '2'){//图片f
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



function nextdongTai(){

    var datadongTai = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId()
    }

    instancecourse({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/dongtai/dongTai/next',
        data: datadongTai,
        cancelToken: sourcecourse.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                if(rs.data.result != null && rs.data.result != ''){
                    $("#detailcourse").html("");
                    $(".fixedbtn24").remove();
                    detailDongtaiRender(rs.data)
                }

            }
        }
    });

}


//获取详情数据
function detailcourse(linkType){
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
                if(getBrowser() == 'wxmobile'){//微信分享
                    setWeixinAudioInfo();
                }

                if(linkType == '2'){//课程详情
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
            }else{
                console.log('请求异常！')
            }

        });

    }

//课程详情渲染
function detailcourseRender(data){
    console.log("-------b");
	  if(data.code == '0'){
        //
          /*if(getSaasId() == '201908070117'){
            if(localStorage.getItem("vip") == 'no'){
                $.confirm("成为VIP后可以查看！", "成为VIP", function () {
                    toHuiYuanDetail();
                }, function () {
                    //取消操作
                    toindex();
                });

            }
          }*/
          viptips();
        $("title").html(setNULL(data.result.course.courseTitle));
        var detailcourseStr = '';
        detailcourseStr += '';

          detailcourseStr += '<div class="weui-c-content" >';

          detailcourseStr += '<img class="img-max" src="'+getFirstImageDetailContent(data.result.course.courseImage)+'" width="100%">';

          detailcourseStr += '<h2 class="weui-c-title bottom5">'+data.result.course.courseTitle+'</h2>';
          detailcourseStr += '<h2 class="bottom5 f14 f-red">'+setNULL(data.result.course.courseSharetitle)+'</h2>';

          detailcourseStr += '<div class="weui-c-meta bottom5" style="float: left;width: 70%;">';
          detailcourseStr += '<span class="weui-c-nickname">';
          detailcourseStr += '<div class="weui-news-infoitem"  onclick=toUserHome("'+data.result.course.createBy.id+'","1")>';

	      detailcourseStr += ' <div class="weui-avatar-circle">';
	      detailcourseStr += '<img src="'+ checkPath(data.result.course.createBy.headimgurl,'1')+'">';
	      if(data.result.course.createBy.isV=="3"){
	      detailcourseStr += '<span class="weui-icon-success weui-icon-safe-warn"></span>';
	     }
	      detailcourseStr += '</div>';

          detailcourseStr += '<span class="weui-news-left f-blue f16import">'+data.result.course.createBy.nickname+'</span>';
          detailcourseStr += '</div>';
          detailcourseStr += '</span>';
          detailcourseStr += '<em class="weui-c-nickname">'+timeago(data.result.course.createDate)+'</em>';
          detailcourseStr += '</div>';

          detailcourseStr += '<div style="float: left;width: 30%;line-height: 40px;">';
          $("#guanzhuId").val(data.result.course.createBy.id);
          detailcourseStr += '<div style="width: 100%;text-align: right;">';
          detailcourseStr += '<label class="weui-label-s b-orange  f-white f12"  id="bgguanzhu" onclick=saveNRguanzhu() style="padding: 0.2em; margin-left: 10px;background-color:#ef4f4f !important;border: 1px solid #ef4f4f !important;color: white !important;;"><i class="beauty icon-xiai f-white f16 " id="gz">关注</i></label>';
          detailcourseStr += '</div>';
          detailcourseStr += '</div>';
          detailcourseStr += '<div class="clear"></div>';

          detailcourseStr += '<div class="weui-comment-reply top00">';
          if(GetUrlString('share') != null){//是否是推广链接
              if(data.result.course.coursePrice != null && data.result.course.coursePrice > 0 &&   data.result.course.isLowprice == '1'){
                  detailcourseStr += '<div class="nickname f-red">限时低价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.course.lowpriceStart,format='MM-DD')+'至'+formatDate(data.result.course.lowpriceEnd,format='MM-DD')+']</span> </div>';

              }else if(data.result.course.coursePrice != null && data.result.course.coursePrice > 0 && data.result.course.isGaoyongjin == '1'){
                  detailcourseStr += '<div class="nickname f-red">会员价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.course.coursePrice+'</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';
              }else if(data.result.course.coursePrice != null && data.result.course.coursePrice > 0 ){
                  detailcourseStr += '<div class="nickname f-red">会员价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.course.coursePrice+'</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';
              }else{
                  detailcourseStr += '<div class="nickname f-red f12">本篇文章可免费阅读，感谢作者分享</div>';
              }
		  }else{
              if(data.result.course.coursePrice != null && data.result.course.coursePrice > 0 &&   data.result.course.isLowprice == '1'){

                  if(data.result.isHuiYuan == '1'){
                      detailcourseStr += '<div class="nickname f-red">限时低价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.course.lowpriceStart,format='MM-DD')+'至'+formatDate(data.result.course.lowpriceEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">会员佣金￥'+data.result.yongjin+'</span></div>';

                  }else{
                      detailcourseStr += '<div class="nickname f-red">限时低价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.course.lowpriceStart,format='MM-DD')+'至'+formatDate(data.result.course.lowpriceEnd,format='MM-DD')+']</span> </div>';
                  }

              }else if(data.result.course.coursePrice != null && data.result.course.coursePrice > 0 && data.result.course.isGaoyongjin == '1'){
                  if(data.result.isHuiYuan == '1'){
                      detailcourseStr += '<div class="nickname f-red">限时高佣金(会员)￥'+data.result.yongjin+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.course.gaoyongjinStart,format='MM-DD')+'至'+formatDate(data.result.course.gaoyongjinEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">会员价￥'+data.result.price+'</span></div>';
                  }else{
                      detailcourseStr += '<div class="nickname f-red">会员价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.course.coursePrice+'</span> </div>';

                  }
              }else if(data.result.course.coursePrice != null && data.result.course.coursePrice > 0 ){
                  if(data.result.isHuiYuan == '1'){
                      detailcourseStr += '<div class="nickname f-red">会员价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.course.coursePrice+'</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">会员佣金￥'+data.result.yongjin+'</span></div>';
                  }else{
                      detailcourseStr += '<div class="nickname f-red">会员价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.course.coursePrice+'</span> </div>';

                  }
              }else{
                  detailcourseStr += '<div class="nickname f-red f12">本篇文章可免费阅读，感谢作者分享</div>';
              }
		  }
          console.log("-------b1");

          //detailcourseStr += '<p class="time subtext">'+data.result.course.courseLabel+'</p>';

          detailcourseStr += '</div>';
          detailcourseStr += '<div class="weui-c-article">';

          //课程目录
		  if(data.result.listCourse  != null){

              detailcourseStr += '<div class="naver_n_div">';
              detailcourseStr += '<ul class="naver_n" id="tab_nav_one">';
              detailcourseStr += '<li class="navbar_item act"  onclick=tabQiehuan("1")>';
              detailcourseStr += '<span class="span">详情</span>';
              detailcourseStr += '</li>';
              detailcourseStr += '<li class="navbar_item" onclick=tabQiehuan("2")>';
              detailcourseStr += '<span class="span">目录</span>';
              detailcourseStr += '</li>';
              detailcourseStr += '</ul>';
              detailcourseStr += '</div>';
              detailcourseStr += '<div class="disnone" id="tab_2">';
              $.each(data.result.listCourse, function (i, item) {
                  //课程
                  detailcourseStr += '<div class="weui-cells myweui-cells" >';
                  detailcourseStr += '<a class="weui-cell weui-cell_access myweui-cell" onclick=toCourseDetail("'+item.id+'","1")>';
                  detailcourseStr += '<div class="weui-cell__hd" style="background-image:url('+ checkPathBackGroubdImage(getFirstImageDetailContent(item.courseImage),'2')+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;width: 67px;height:45px;">';
                  detailcourseStr += '</div>';
                  detailcourseStr += '<div class="weui-cell__bd">';
                  detailcourseStr += '<div class="weui-news-title onerow">';
                  detailcourseStr += item.courseTitle;
                  detailcourseStr += '</div>';
                  detailcourseStr += '<div class="weui-news-info mynesinfo">';
                  detailcourseStr += '<div class="weui-news-infoitem">'+timeago(item.createDate)+'</div>';

                  detailcourseStr += '</div>';
                  detailcourseStr += '</div>';
                  if(item.contentType == '1'){//图文
                      detailcourseStr += '<div class="weui-cell__ft " id="mycoursesize">资讯</div>';

                  }else if(item.contentType == '2'){//音频
                      detailcourseStr += '<div class="weui-cell__ft " id="mycoursesize">音频</div>';

                  }else if(item.contentType == '3'){//视频
                      detailcourseStr += '<div class="weui-cell__ft " id="mycoursesize">视频</div>';

                  }else if(item.contentType == '4'){//文件
                      detailcourseStr += '<div class="weui-cell__ft " id="mycoursesize"></div>';

                  }else if(item.contentType == '5'){//红包
                      detailcourseStr += '<div class="weui-cell__ft " id="mycoursesize">红包</div>';

                  }
                  detailcourseStr += '</a>';
                  detailcourseStr += '</div>';

              });
              detailcourseStr += '</div>';


		  }
          console.log("-------b2");
          //详情
          detailcourseStr += '<div id="tab_1" >';
          if(data.result.isBuy == '0'){

              /*if(data.result.course.courseImage != null){
                detailcourseStr += '<img src="'+ checkPath(data.result.course.courseImage,'1')+'" >';
              }*/

              detailcourseStr += '<div class="weui-label-list"  style="margin-left: 0px;">';
              if(data.result.course.isZiying != null && data.result.course.isZiying != ''){
                  if(data.result.course.isZiying == '1'){
                      detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
                  }

              }

              /*if((GetUrlString("share") == null || GetUrlString("share") == '') && data.result.course.coursePrice > 0 ){
                  if(data.result.course.courseJiesuan != null && data.result.course.courseJiesuan != ''){
                      detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.course.courseJiesuan+'</label>';
                  }
              }*/

              if(data.result.course.courseLabel != null && data.result.course.courseLabel != ''){
                  var str = data.result.course.courseLabel; //这是一字符串
                  var strs= new Array(); //定义一数组
                  strs=str.split("/"); //字符分割
                  for (i=0;i<strs.length ;i++ )
                  {
                      detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
                  }

              }
              detailcourseStr += '</div>';

              if((GetUrlString("share") == null || GetUrlString("share") == '' ) && data.result.course.coursePrice > 0 && data.result.isHuiYuan == '1'){
                  detailcourseStr += '<p>'+setNULL(data.result.course.courseSharecontent)+'</p>';
              }

              detailcourseStr += '<p>'+data.result.course.courseContent+'</p>';

              detailcourseStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick=openPay("购买本文章","可以阅读本次购买文章","订阅作者年费会员","可以阅读作者所有课程","1","1","'+data.result.course.courseTitle.replace(/\s*!/g,"")+'","年费会员订阅","'+data.result.price+'","'+data.result.dingyueprice+'","5","6","0","1","'+data.result.isHuiYuan+'","'+data.result.course.id+'","'+data.result.course.createBy.id+'");>';
              detailcourseStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>查看全文<span class="slogan f-white">￥'+setNum(data.result.price)+'</span></a>';
              console.log("-------b3");
          }else{
              $("#buyandshare").hide();
              $("#share").show();
              if(data.result.course.contentType == '1' && data.result.course.courseFile != null){//图片
                  detailcourseStr += '<div class="weui-feeds"><ul>'+getImageContent(data.result.course.id,data.result.course.courseFile)+'</ul></div>';
              }else if(data.result.course.contentType == '2' && data.result.course.courseFile != null){//音频
                  //音频评论--隐藏原始播放器
                  //音频--隐藏原始播放器
                  /* detailcourseStr += '<div class="page-bd center bottom5" id="audiostartA'+data.result.course.id+'" onclick=start("audiotest'+data.result.course.id+'","'+checkPath(data.result.course.courseFile,'3')+'","shifenmiao'+data.result.course.id+'","audiostartA'+data.result.course.id+'","audioIconA'+data.result.course.id+'")>';
                   detailcourseStr += '<div class="audio"   >';
                   detailcourseStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon"  id="audioIconA'+data.result.course.id+'"/></div>';
                   detailcourseStr += '<div id="shifenmiao'+data.result.course.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                   detailcourseStr += '</div>';
                   detailcourseStr += '<div class="disnone"><audio id="audiotest'+data.result.course.id+'" src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                   detailcourseStr += '</div>';*/


                  detailcourseStr += '<div class="page-bd">';
                  detailcourseStr += '<div class="weui-news-info padding0">';
                  detailcourseStr += '<div class="weui-c-article l100">';
                  detailcourseStr += '<p style="text-indent: 0em;" id="indent'+(1)+'">'+data.result.course.courseTitle+'</p>';
                  detailcourseStr += '<div id="aplayer1'+data.result.course.id+'"></div>';
                  detailcourseStr += '<script type="text/javascript">';
                  detailcourseStr += 'const ap1'+data.result.course.id+' = new APlayer({';
                  detailcourseStr += 'container: document.getElementById("aplayer1'+data.result.course.id+'"), mini: false, autoplay:false,preload:\'none\',';
                  detailcourseStr += 'audio: [{name: \''+data.result.course.courseTitle+'\', artist: \'音频\', url: \''+checkPath(data.result.course.courseFile,"3")+'\', cover: \''+checkPath(data.result.course.courseImage,"1")+'\'';
                  detailcourseStr += '}]';
                  detailcourseStr += '});';
                  detailcourseStr += '</script>';
                  detailcourseStr += '</div>';
                  detailcourseStr += '</div>';
                  detailcourseStr += '</div>';

              }else if(data.result.course.contentType == '3' && data.result.course.courseFile != null){//视频
                  <!--视频播放-->

                  detailcourseStr += '<div class="page-bd"><div class="weui-c-article">';
                  detailcourseStr += '<div id="dplayer2'+data.result.course.id+'"></div>';
                  detailcourseStr += '<script type="text/javascript">';
                  detailcourseStr += 'const dp2'+data.result.course.id+' = new DPlayer({container: document.getElementById("dplayer2'+data.result.course.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(data.result.course.courseFile,"3")+'\', pic: \''+videoImagePath(data.result.course.courseFile)+'\'}});';
                  detailcourseStr += '</script>';
                  detailcourseStr += '</div></div>';


              }else if(data.result.course.contentType == '4' && data.result.course.courseFile != null){//文件
                  //文件评论--判断文件类型展示不同的图片
                  if(data.result.course.courseFile.search(".jpeg") != -1 || data.result.course.courseFile.search(".jpg") != -1 || data.result.course.courseFile.search(".png") != -1 || data.result.course.courseFile.search(".gif") != -1 || data.result.course.courseFile.search(".GIF") != -1 ){
                      detailcourseStr += '<div class="weui-feeds"><ul>'+getImageContent(data.result.course.id,data.result.course.courseFile)+'</ul></div>';
                  }else if( data.result.course.courseFile.search(".mp4") != -1 || data.result.course.courseFile.search(".MP4") != -1 || data.result.course.courseFile.search(".flv")  != -1 || data.result.course.courseFile.search(".mov")  != -1 ){
                      //视频评论--隐藏原始播放器

                      detailcourseStr += '<div class="page-bd"><div class="weui-c-article">';
                      detailcourseStr += '<div id="dplayer2'+data.result.course.id+'"></div>';
                      detailcourseStr += '<script type="text/javascript">';
                      detailcourseStr += 'const dp2'+data.result.course.id+' = new DPlayer({container: document.getElementById("dplayer2'+data.result.course.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(data.result.course.courseFile,"3")+'\', pic: \''+videoImagePath(data.result.course.courseFile)+'\'}});';
                      detailcourseStr += '</script>';
                      detailcourseStr += '</div></div>';




                  }else if( data.result.course.courseFile.search(".MP3") != -1 || data.result.course.courseFile.search(".mp3") != -1 || data.result.course.courseFile.search(".wav")  != -1 || data.result.course.courseFile.search(".ogg")  != -1 ){
                      //音频--隐藏原始播放器
                      /* detailcourseStr += '<div class="page-bd center bottom5" id="audiostartA'+data.result.course.id+'" onclick=start("audiotest'+data.result.course.id+'","'+checkPath(data.result.course.courseFile,'3')+'","shifenmiao'+data.result.course.id+'","audiostartA'+data.result.course.id+'","audioIconA'+data.result.course.id+'")>';
                       detailcourseStr += '<div class="audio"   >';
                       detailcourseStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon"  id="audioIconA'+data.result.course.id+'"/></div>';
                       detailcourseStr += '<div id="shifenmiao'+data.result.course.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                       detailcourseStr += '</div>';
                       detailcourseStr += '<div class="disnone"><audio id="audiotest'+data.result.course.id+'" src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                       detailcourseStr += '</div>';*/

                      detailcourseStr += '<div class="page-bd">';
                      detailcourseStr += '<div class="weui-news-info padding0">';
                      detailcourseStr += '<div class="weui-c-article l100">';
                      detailcourseStr += '<p style="text-indent: 0em;" id="indent'+(1)+'">'+data.result.course.courseTitle+'</p>';
                      detailcourseStr += '<div id="aplayer1'+data.result.course.id+'"></div>';
                      detailcourseStr += '<script type="text/javascript">';
                      detailcourseStr += 'const ap1'+data.result.course.id+' = new APlayer({';
                      detailcourseStr += 'container: document.getElementById("aplayer1'+data.result.course.id+'"), mini: false, autoplay:false,preload:\'none\',';
                      detailcourseStr += 'audio: [{name: \''+data.result.course.courseTitle+'\', artist: \'音频\', url: \''+checkPath(data.result.course.courseFile,"3")+'\', cover: \''+checkPath(data.result.course.courseImage,"1")+'\'';
                      detailcourseStr += '}]';
                      detailcourseStr += '});';
                      detailcourseStr += '</script>';
                      detailcourseStr += '</div>';
                      detailcourseStr += '</div>';
                      detailcourseStr += '</div>';

                  }else{
                      detailcourseStr += '<div class="page-bd center bottom5 alignleft" ><a href="'+ checkPath(data.result.course.courseFile,'3')+'" target="_blank">'+setNULL(getFileName(data.result.course.courseFile))+'</a></div>';
                  }

              }else if(data.result.course.contentType == '5' && data.result.course.courseFile != null){
                  //红包评论
                  detailcourseStr += '<div class="weui-feeds"><img onclick=toHongBaoDetail("'+data.result.course.remarks+'","1");  width="173px" height="286px" src="'+ checkPath(data.result.course.courseFile,'1')+'"></div>';
              }

              /*if(data.result.course.courseImage != null){
                  detailcourseStr += '<img src="'+ checkPath(data.result.course.courseImage,'1')+'" >';
              }*/

              detailcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
              if(data.result.course.isZiying != null && data.result.course.isZiying != ''){
                  if(data.result.course.isZiying == '1'){
                      detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
                  }
              }

              if((GetUrlString("share") == null || GetUrlString("share") == '') && data.result.course.coursePrice > 0  ){
                  if(data.result.course.courseJiesuan != null && data.result.course.courseJiesuan != ''){
                      detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.course.courseJiesuan+'</label>';
                  }
              }

              if(data.result.course.courseLabel != null && data.result.course.courseLabel != ''){
                  var str = data.result.course.courseLabel; //这是一字符串
                  var strs= new Array(); //定义一数组
                  strs=str.split("/"); //字符分割
                  for (i=0;i<strs.length ;i++ )
                  {
                      detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
                  }

              }
              detailcourseStr += '</div>';

              if((GetUrlString("share") == null || GetUrlString("share") == '') && data.result.course.coursePrice > 0   ){
                  detailcourseStr += '<p>'+setNULL(data.result.course.courseSharecontent)+'</p>';
              }
              detailcourseStr += '<p>'+data.result.course.courseContent+'</p>';

          }
          console.log("-------b4");
          detailcourseStr += '</div>';



          detailcourseStr += '</div>';

          detailcourseStr += '</div>';
          detailcourseStr += '<div class="weui-c-tools">';
          if(data.result.isBuy == '1'){
              detailcourseStr += '<a class="" onclick=zhuanfa("2","'+data.result.course.id+'","'+data.result.course.createBy.id+'","2");><i class="icon icon-5 weui-tabbar__icon" id="dashangicon"></i>转发</a>';
          }else{
              detailcourseStr += '<a class=""  onclick=zhuanfa("2","'+data.result.course.id+'","'+data.result.course.createBy.id+'","2");><i class="icon icon-5 weui-tabbar__icon" id="dashangicon"></i>转发</a>';
          }
          detailcourseStr += '<a href="javascript:dashang();"><i class="icon icon-42 weui-tabbar__icon" id="dashangicon"></i>打赏</a>';
          detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">'+setNum(data.result.course.courseDianjiliang)+'</span></div>';
          detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
          detailcourseStr += '<span  onclick=dianji("1","'+data.result.course.id+'"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan'+data.result.course.id+'">'+setNum(data.result.course.courseZan)+'</span> </span>';
          detailcourseStr += '<span class="check checked disnone" onclick=openCommentList("commentDisList","2","1",10,"'+data.result.course.id+'","1","'+data.result.course.createBy.id+'");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">'+setNum(data.result.course.commentNum)+'</span> </span>';

          detailcourseStr += '</div>';

          detailcourseStr += '</div>';
          /*分享参数*/
          detailcourseStr += '<input type="hidden" id="id" value="'+data.result.course.id+'">';
          detailcourseStr += '<input type="hidden" id="shareType" value="1">';
          detailcourseStr += '<input type="hidden" id="shareTitle" value="'+data.result.course.courseTitle+'">';
          detailcourseStr += '<input type="hidden" id="shareImage" value="'+checkPath(data.result.course.courseImage,'1')+'">';


          detailcourseStr += '<input type="hidden" id="orderMoney" value="'+setNum(data.result.price)+'">';
          detailcourseStr += '<input type="hidden" id="orderNum" value="1">';
          detailcourseStr += '<input type="hidden" id="orderType" value="5">';
          detailcourseStr += '<input type="hidden" id="orderDashangType" value="7">';
          detailcourseStr += '<input type="hidden" id="orderTitle" value="'+data.result.course.courseTitle+'">';
          detailcourseStr += '<input type="hidden" id="orderAboutid" value="'+data.result.course.id+'">';
          console.log("-------b");

          $("#detailcourse").html(detailcourseStr);


          <!--购买文章-分享-->
          var detailcourseButtonStr = '';




          if(1==2 && data.result.course.coursePrice != null && data.result.course.coursePrice > 0.00  && data.result.isBuy == '0' && GetUrlString('share') == null){//不是分享
              detailcourseButtonStr += '<div id="buyandshare">';
              detailcourseButtonStr += '<div class="fixedbtn21">';
              detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
              detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>分享<span class="slogan f-white">佣金￥'+data.result.yongjin+'</span></a>';
              detailcourseButtonStr += '</div>';
              detailcourseButtonStr += '<div class="fixedbtn22">';
              detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("购买本文章","可以阅读本次购买文章","订阅作者年费会员","可以阅读作者所有课程","1","1","'+data.result.course.courseTitle.replace(/\s*/g,"")+'","年费会员订阅","'+data.result.price+'","'+data.result.dingyueprice+'","5","6","0","1","'+data.result.isHuiYuan+'","'+data.result.course.id+'","'+data.result.course.createBy.id+'");>';
              detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>购买<span class="slogan f-white">￥'+setNum(data.result.price)+'</span></a>';
              detailcourseButtonStr += '</div>';
              detailcourseButtonStr += '<div class="fixedbtn23">';
              detailcourseButtonStr += '<a href="javascript:;" class="fenge">|</a>';
              detailcourseButtonStr += '</div>';

              detailcourseButtonStr += '</div>';
		  }else if(1==2 && data.result.course.coursePrice != null && data.result.course.coursePrice > 0.00  && data.result.isBuy == '0' && GetUrlString('share') != null){//分享未购买
              detailcourseButtonStr += '<div id="buyandshare">';
              detailcourseButtonStr += '<div class="fixedbtn24">';
              detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("购买本文章","可以阅读本次购买文章","订阅作者年费会员","可以阅读作者所有课程","1","1","'+data.result.course.courseTitle.replace(/\s*/g,"")+'","年费会员订阅","'+data.result.price+'","'+data.result.dingyueprice+'","5","6","0","1","'+data.result.isHuiYuan+'","'+data.result.course.id+'","'+data.result.course.createBy.id+'");>';
              detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon " id="iconshare"></i>去购买<span class="slogan f-white">￥'+setNum(data.result.price)+'</span></a>';
              detailcourseButtonStr += '</div>';
              detailcourseButtonStr += '</div>';
          }else if(1==2 && data.result.course.coursePrice != null && data.result.course.coursePrice > 0 ){//已购买
              detailcourseButtonStr += '<div id="share">';
              detailcourseButtonStr += '<div class="fixedbtn24">';
              detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
              detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">佣金￥'+data.result.yongjin+'</span></a>';
              detailcourseButtonStr += '</div>';
              detailcourseButtonStr += '</div>';
		  }else{//免费
              /*detailcourseButtonStr += '<div id="share">';
              detailcourseButtonStr += '<div class="fixedbtn24">';
              detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
              detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享</a>';
              detailcourseButtonStr += '</div>';
              detailcourseButtonStr += '</div>';*/

              detailcourseButtonStr += '<div class="fixedbtn24 dibu1" >';
              if(data.result.isBuy == '0'){
                  detailcourseButtonStr += '<div class="dibu2" onclick=openPay("购买本文章","可以阅读本次购买文章","订阅作者年费会员","可以阅读作者所有课程","1","1","'+data.result.course.courseTitle.replace(/\s*/g,"")+'","年费会员订阅","'+data.result.price+'","'+data.result.dingyueprice+'","5","6","0","1","'+data.result.isHuiYuan+'","'+data.result.course.id+'","'+data.result.course.createBy.id+'");>';
                  detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-24 weui-tabbar__icon" id="iconshare"></i>购买</a>';
                  detailcourseButtonStr += '</div>';
              }else{
                  detailcourseButtonStr += '<div class="dibu2" onclick=openCommentSave("commentDisList","'+data.result.course.id+'","1","'+data.result.course.createBy.id+'");>';
                  detailcourseButtonStr += '<div style="line-height: 50px;text-align: center;font-size: 14px;">写评论…</div>';
                  detailcourseButtonStr += '</div>';
              }
              detailcourseButtonStr += '<div class="dibu3" >';
              detailcourseButtonStr += '<div onclick=openCommentList("commentDisList","2","1",10,"'+data.result.course.id+'","1","'+data.result.course.createBy.id+'"); class="dibu5">';

              if(setNum(data.result.course.commentNum) > 0){

                  detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"><span class="weui-badge" style="position: absolute;top: .25em;right: -.4em;">'+setNum(data.result.course.commentNum)+'</span></i>';
              }else{
                  detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"></i>';
              }

              detailcourseButtonStr += '</div>';

              detailcourseButtonStr += '<div onclick=dianji("1","'+data.result.course.id+'"); class="dibu5">';
              detailcourseButtonStr += '<i class="icon icon-65 weui-tabbar__icon" id="iconshare2"></i>';
              detailcourseButtonStr += '</div>';

             /* detailcourseButtonStr += '<div onclick=zhuanfa("2","'+data.result.course.id+'","'+data.result.course.createBy.id+'","2"); class="dibu5">';
              detailcourseButtonStr += '<i class="icon icon-103 weui-tabbar__icon" id="iconshare3"></i>';
              detailcourseButtonStr += '</div>';*/

              detailcourseButtonStr += '<div  onclick=shareJiajia(); class="dibu5">';
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



          sharecourseButtonStr += '<div id="sharecontent" class="disnone" style="width: 100%;margin-bottom: 50px;background-image: url('+checkPathBackGroubdImage(localStorage.getItem("sharekno"))+');background-repeat:no-repeat;background-size:cover;">';


          /* sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
           sharecourseButtonStr += '<span class="weui-loadmore__tips">封面</span>';
           sharecourseButtonStr += '</div>';*/

          sharecourseButtonStr += '<div class="page-bd-15 " style="text-align: center;">';
          sharecourseButtonStr += '<img class="getgold_top_head_img "  src="'+ checkPath(data.result.course.courseImage,'1')+'" id="fengmainimagebase64" style="margin-top: 40px;height: 1px;width: 1px;border-radius:50%;">';
          /*sharecourseButtonStr += '<div class="weui-c-article"><p >'+data.result.tool.toolContent+'</p></div>';*/
          sharecourseButtonStr += '</div>';


          sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;">';
          sharecourseButtonStr += '<h4 class="weui-c-title bottom5 f-white" >'+data.result.course.courseTitle+'</h4>';

          //付费时候
          if(data.result.course.coursePrice != null && data.result.course.coursePrice > 0.00){
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
/*
          sharecourseButtonStr += '<div style="width: 100%;text-align: center;margin-top: -70px;">';
          if(data.result.user != null) {
              sharecourseButtonStr += '<img src="' + checkPath(data.result.user.headimgurl, "1") + '" id="headimagebase64" height="25px" width="25px" style="border-radius: 5px;"/>';
          }
          sharecourseButtonStr += '</div>';*/


          sharecourseButtonStr += '<div style="width: 100%;text-align: center;height: 50px;">';

          sharecourseButtonStr += '</div>';

          sharecourseButtonStr += '</div>';


          sharecourseButtonStr += '</div>';


          $("body").prepend(sharecourseButtonStr);
          $(document).ready(function() {

              qrCode("qrcodeCanvas",baseUrlFrontDefault+"article.html?id="+data.result.course.id+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));
              localStorage.setItem("bgurl",localStorage.getItem("sharekno"));
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
                  getBase64ImageInServeice(checkPath(data.result.course.courseImage,'1'),"fengmainimagebase64");
                  if(data.result.user != null){
                      getBase64ImageInServeice(checkPath(data.result.user.headimgurl,"1"),"headimagebase64");
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
              isguanzhu();

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

//会员详情渲染-当会员快到期时候显示购买会员
function detailhuiyuanRender(data){
    if(data.code == '0'){
        //$("title").html(data.result.huiYuan.huiyuanTitle);
        var detailcourseStr = '';
        detailcourseStr += '';
        detailcourseStr += '<div class="weui-c-content" >';
        detailcourseStr += '<h2 class="weui-c-title bottom5">'+data.result.huiYuan.huiyuanTitle+'</h2>';
        detailcourseStr += '<h2 class="bottom5 f14 f-red">'+setNULL(data.result.huiYuan.huiyuanSharetitle)+'</h2>';

        detailcourseStr += '<div class="weui-c-meta bottom5" style="float: left;width: 70%;">';
        detailcourseStr += '<div class="weui-c-meta bottom5">';
        detailcourseStr += '<span class="weui-c-nickname">';
        detailcourseStr += '<div class="weui-news-infoitem"  onclick=toUserHome("'+data.result.huiYuan.createBy.id+'","1")>';
        detailcourseStr += '<img src="'+ checkPath(data.result.huiYuan.createBy.headimgurl,'1')+'" class="weui-news-round">';
        detailcourseStr += '<span class="weui-news-left f-blue f16import">'+data.result.huiYuan.createBy.nickname+'</span>';
        detailcourseStr += '</div>';
        detailcourseStr += '</span>';
        detailcourseStr += '<em class="weui-c-nickname">'+timeago(data.result.huiYuan.createDate)+'</em>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';

        detailcourseStr += '<div style="float: left;width: 30%;line-height: 40px;">';
        $("#guanzhuId").val(data.result.huiYuan.createBy.id);
        detailcourseStr += '<div style="width: 100%;text-align: right;">';
        detailcourseStr += '<label class="weui-label-s b-orange  f-white f12"  id="bgguanzhu" onclick=saveNRguanzhu() style="padding: 0.2em; margin-left: 10px;background-color:#ef4f4f !important;border: 1px solid #ef4f4f !important;color: white !important;;"><i class="beauty icon-xiai f-white f16 " id="gz">关注</i></label>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '<div class="clear"></div>';


        detailcourseStr += '<div class="weui-comment-reply top00">';
        if(GetUrlString('share') != null){//是否是推广链接
            if(data.result.huiYuan.huiyuanPrice != null && data.result.huiYuan.huiyuanPrice > 0 &&   data.result.huiYuan.isLowprice == '1'){
                detailcourseStr += '<div class="nickname f-red">限时低价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.huiYuan.huiyuanPrice+'</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span> </div>';

            }else if(data.result.huiYuan.huiyuanPrice != null && data.result.huiYuan.huiyuanPrice > 0 && data.result.huiYuan.isGaoyongjin == '1'){
                detailcourseStr += '<div class="nickname f-red">抢购价￥'+data.result.price+'   <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';
            }else if(data.result.huiYuan.huiyuanPrice != null && data.result.huiYuan.huiyuanPrice > 0 ){
                detailcourseStr += '<div class="nickname f-red">抢购价￥'+data.result.price+'   <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';
            }else{
                //detailcourseStr += '<div class="nickname f-red f12">本篇文章可免费阅读，感谢作者分享</div>';
            }
        }else{
            if(data.result.huiYuan.huiyuanPrice != null && data.result.huiYuan.huiyuanPrice > 0 &&   data.result.huiYuan.isLowprice == '1'){
                if(data.result.isHuiYuan == '1'){
                    detailcourseStr += '<div class="nickname f-red">限时低价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.huiYuan.huiyuanPrice+'</span>  <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">会员佣金￥'+data.result.yongjin+'</span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">限时低价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.huiYuan.huiyuanPrice+'</span> </div>';

                }


            }else if(data.result.huiYuan.huiyuanPrice != null && data.result.huiYuan.huiyuanPrice > 0 && data.result.huiYuan.isGaoyongjin == '1'){
                if(data.result.isHuiYuan == '1'){
                    detailcourseStr += '<div class="nickname f-red">限时高佣金(会员)￥'+data.result.yongjin+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.huiYuan.gaoyongjinStart,format='MM-DD')+'至'+formatDate(data.result.huiYuan.gaoyongjinEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">抢购价￥'+data.result.price+'</span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">抢购价￥'+data.result.price+'  </div>';

                }
            }else if(data.result.huiYuan.huiyuanPrice != null && data.result.huiYuan.huiyuanPrice > 0 ){
                if(data.result.isHuiYuan == '1'){
                    detailcourseStr += '<div class="nickname f-red">抢购价￥'+data.result.price+'   <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">会员佣金￥'+data.result.yongjin+'</span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">抢购价￥'+data.result.price+'   </div>';

                }
            }else{
                //detailcourseStr += '<div class="nickname f-red f12">本篇文章可免费阅读，感谢作者分享</div>';
            }
        }


        //detailcourseStr += '<p class="time subtext">'+data.result.huiYuan.huiyuanLabel+'</p>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-article">';

        if(data.result.isBuy == '0'){

            /*if(data.result.huiYuan.huiyuanImage != null){
                detailcourseStr += '<img src="'+ checkPath(data.result.huiYuan.huiyuanImage,'1')+'" >';
            }*/

            detailcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
            if(data.result.huiYuan.isZiying != null && data.result.huiYuan.isZiying != '' && localStorage.getItem("isdiscard") != '1'){
                if(data.result.huiYuan.isZiying == '1'){
                    detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
                }

            }

            /*if(GetUrlString("share") == null || GetUrlString("share") == '' ){
                if(data.result.huiYuan.huiyuanJiesuan != null && data.result.huiYuan.huiyuanJiesuan != ''){
                    detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.huiYuan.huiyuanJiesuan+'</label>';
                }
            }*/

            if(data.result.huiYuan.huiyuanLabel != null && data.result.huiYuan.huiyuanLabel != ''){
                var str = data.result.huiYuan.huiyuanLabel; //这是一字符串
                var strs= new Array(); //定义一数组
                strs=str.split("/"); //字符分割
                for (i=0;i<strs.length ;i++ )
                {
                    detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
                }

            }


            detailcourseStr += '</div>';



            if((GetUrlString("share") == null || GetUrlString("share") == '') && data.result.isHuiYuan == '1' ){
                detailcourseStr += '<p>'+setNULL(data.result.huiYuan.huiyuanSharecontent)+'</p>';
            }

            detailcourseStr += '<p>'+data.result.huiYuan.huiyuanContent+'</p>';

            /*detailcourseStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick=openPay("购买会员","享受超值优惠和特权","","","1","0","会员购买","","'+data.result.price+'","'+data.result.price+'","1","","1","0","'+data.result.isHuiYuan+'","'+data.result.huiYuan.id+'","'+data.result.huiYuan.createBy.id+'");>';
            detailcourseStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>购买会员<span class="slogan f-white">￥'+setNum(data.result.price)+'</span></a>';*/

        }else{
            $("#buyandshare").hide();
            $("#share").show();

            /*if(data.result.huiYuan.huiyuanImage != null){
                detailcourseStr += '<img src="'+ checkPath(data.result.huiYuan.huiyuanImage,'1')+'" >';
            }*/

            detailcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
            if(data.result.huiYuan.isZiying != null && data.result.huiYuan.isZiying != ''){
                if(data.result.huiYuan.isZiying == '1'){
                    detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
                }

            }

            if((GetUrlString("share") == null || GetUrlString("share") == '')){
                if(data.result.huiYuan.huiyuanJiesuan != null && data.result.huiYuan.huiyuanJiesuan != ''){
                    detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.huiYuan.huiyuanJiesuan+'</label>';
                }
            }

            if(data.result.huiYuan.huiyuanLabel != null && data.result.huiYuan.huiyuanLabel != ''){
                var str = data.result.huiYuan.huiyuanLabel; //这是一字符串
                var strs= new Array(); //定义一数组
                strs=str.split("/"); //字符分割
                for (i=0;i<strs.length ;i++ )
                {
                    detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
                }

            }


            detailcourseStr += '</div>';

            if((GetUrlString("share") == null || GetUrlString("share") == '') ){
                detailcourseStr += '<p>'+setNULL(data.result.huiYuan.huiyuanSharecontent)+'</p>';
            }
            detailcourseStr += '<p>'+data.result.huiYuan.huiyuanContent+'</p>';

        }



        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        if(localStorage.getItem("isdiscard") != '1'){
            detailcourseStr += '<div class="weui-c-tools">';
            detailcourseStr += '<a  class="" onclick=zhuanfa("2","'+data.result.huiYuan.id+'","'+data.result.huiYuan.createBy.id+'","19");><i class="icon icon-5 weui-tabbar__icon" id="dashangicon"></i>转发</a>';
            detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">'+setNum(data.result.huiYuan.huiyuanDianjiliang)+'</span></div>';
            detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
            detailcourseStr += '<span  onclick=dianji("19","'+data.result.huiYuan.id+'"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan'+data.result.huiYuan.id+'">'+setNum(data.result.huiYuan.huiyuanZan)+'</span> </span>';
            detailcourseStr += '<span class="check checked disnone" onclick=openCommentList("commentDisList","2","1",10,"'+data.result.huiYuan.id+'","19","'+data.result.huiYuan.createBy.id+'");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">'+setNum(data.result.huiYuan.commentNum)+'</span> </span>';
            detailcourseStr += '</div>';
        }


        detailcourseStr += '</div>';
        /*分享参数*/
        detailcourseStr += '<input type="hidden" id="id" value="'+data.result.huiYuan.id+'">';
        detailcourseStr += '<input type="hidden" id="shareType" value="2">';
        detailcourseStr += '<input type="hidden" id="shareTitle" value="'+data.result.huiYuan.huiyuanTitle+'">';
        detailcourseStr += '<input type="hidden" id="shareImage" value="'+checkPath(data.result.huiYuan.huiyuanImage,'1')+'">';


        detailcourseStr += '<input type="hidden" id="orderMoney" value="'+setNum(data.result.price)+'">';
        detailcourseStr += '<input type="hidden" id="orderNum" value="1">';
        detailcourseStr += '<input type="hidden" id="orderType" value="1">';
        detailcourseStr += '<input type="hidden" id="orderDashangType" value="7">';
        detailcourseStr += '<input type="hidden" id="orderTitle" value="'+data.result.huiYuan.huiyuanTitle+'">';
        detailcourseStr += '<input type="hidden" id="orderAboutid" value="'+data.result.huiYuan.id+'">';


        $("#detailcourse").html(detailcourseStr);


        <!--购买-分享-->
        var detailcourseButtonStr = '';
        if(1==2 && data.result.huiYuan.huiyuanPrice != null && data.result.huiYuan.huiyuanPrice > 0.00  && data.result.isBuy == '0' && GetUrlString('share') == null){//不是分享
            detailcourseButtonStr += '<div id="buyandshare">';
            detailcourseButtonStr += '<div class="fixedbtn21">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>分享<span class="slogan f-white">￥'+data.result.yongjin+'</span></a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn22">';
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("购买会员","享受超值优惠和特权","","","1","0","会员购买","","'+data.result.price+'","'+data.result.price+'","1","","1","0","'+data.result.isHuiYuan+'","'+data.result.huiYuan.id+'","'+data.result.huiYuan.createBy.id+'");>';
            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>购买<span class="slogan f-white">￥'+setNum(data.result.price)+'</span></a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn23">';
            detailcourseButtonStr += '<a href="javascript:;" class="fenge">|</a>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '</div>';
        }else if(1==2 && data.result.huiYuan.huiyuanPrice != null && data.result.huiYuan.huiyuanPrice > 0.00  && data.result.isBuy == '1' && GetUrlString('share') == null && eval(data.result.huiyuanNum) < 30 ){//不是分享
            detailcourseButtonStr += '<div id="buyandshare">';
            detailcourseButtonStr += '<div class="fixedbtn21">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>分享<span class="slogan f-white">￥'+data.result.yongjin+'</span></a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn22">';
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("购买会员","享受超值优惠和特权","","","1","0","会员购买","","'+data.result.price+'","'+data.result.price+'","1","","1","0","'+data.result.isHuiYuan+'","'+data.result.huiYuan.id+'","'+data.result.huiYuan.createBy.id+'");>';
            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>购买<span class="slogan f-white">剩'+setNum(data.result.huiyuanNum)+'天</span></a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn23">';
            detailcourseButtonStr += '<a href="javascript:;" class="fenge">|</a>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '</div>';
        }else if(1==2 && data.result.huiYuan.huiyuanPrice != null && data.result.huiYuan.huiyuanPrice > 0.00  && data.result.isBuy == '0' && GetUrlString('share') != null){//分享未购买
            detailcourseButtonStr += '<div id="buyandshare">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("购买会员","享受超值优惠和特权","","","1","0","会员购买","","'+data.result.price+'","'+data.result.price+'","1","","1","0","'+data.result.isHuiYuan+'","'+data.result.huiYuan.id+'","'+data.result.huiYuan.createBy.id+'");>';
            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon " id="iconshare"></i>去购买<span class="slogan f-white">￥'+setNum(data.result.price)+'</span></a>';
            detailcourseButtonStr += '</div>';


            detailcourseButtonStr += '</div>';
        }else if(1==2 && data.result.huiYuan.huiyuanPrice != null && data.result.huiYuan.huiyuanPrice > 0 ){//已购买
            detailcourseButtonStr += '<div id="share">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">(会员佣金￥'+data.result.yongjin+')</span></a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '</div>';
        }else if(localStorage.getItem("isdisdisanfangpay") == '1'){

            detailcourseButtonStr += '<div class="fixedbtn24 dibu1" style="margin-bottom: -7px">';



            detailcourseButtonStr += '<div class="dibu6" style="line-height: 50px;">';
            detailcourseButtonStr += '<span style="font-size: small">应付</span><span style="font-size: xx-small;color: red;">￥</span><span style="color: red;font-size: larger" id="paymoney">100</span>';
            detailcourseButtonStr += '</div>';




            detailcourseButtonStr += '<div class="dibu6" onclick=toPay();>';
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;">立即支付</a>';
            detailcourseButtonStr += '</div>';



            detailcourseButtonStr += '</div>';

        }else{//免费
            /*detailcourseButtonStr += '<div id="share">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享</a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '</div>';*/

            detailcourseButtonStr += '<div class="fixedbtn24 dibu1" >';
            if(data.result.isBuy == '0' || eval(data.result.huiyuanNum) < 600){
                detailcourseButtonStr += '<div class="dibu2" onclick=openPay("购买会员","享受超值优惠和特权","","","1","0","会员购买","","'+data.result.price+'","'+data.result.price+'","1","","1","0","'+data.result.isHuiYuan+'","'+data.result.huiYuan.id+'","'+data.result.huiYuan.createBy.id+'");>';
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-24 weui-tabbar__icon" id="iconshare"></i>购买</a>';
                detailcourseButtonStr += '</div>';
            }else{
                detailcourseButtonStr += '<div class="dibu2" onclick=openCommentSave("commentDisList","'+data.result.huiYuan.id+'","19","'+data.result.huiYuan.createBy.id+'");>';
                detailcourseButtonStr += '<div style="line-height: 50px;text-align: center;font-size: 14px;">写评论…</div>';
                detailcourseButtonStr += '</div>';
            }
            detailcourseButtonStr += '<div class="dibu3" >';
            detailcourseButtonStr += '<div onclick=openCommentList("commentDisList","2","1",10,"'+data.result.huiYuan.id+'","19","'+data.result.huiYuan.createBy.id+'"); class="dibu5">';

            if(setNum(data.result.huiYuan.commentNum) > 0){

                detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"><span class="weui-badge" style="position: absolute;top: .25em;right: -.4em;">'+setNum(data.result.huiYuan.commentNum)+'</span></i>';
            }else{
                detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"></i>';
            }

            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div onclick=dianji("19","'+data.result.huiYuan.id+'"); class="dibu5">';
            detailcourseButtonStr += '<i class="icon icon-65 weui-tabbar__icon" id="iconshare2"></i>';
            detailcourseButtonStr += '</div>';

          /*  detailcourseButtonStr += '<div onclick=zhuanfa("2","'+data.result.huiYuan.id+'","'+data.result.huiYuan.createBy.id+'","19"); class="dibu5">';
            detailcourseButtonStr += '<i class="icon icon-103 weui-tabbar__icon" id="iconshare3"></i>';
            detailcourseButtonStr += '</div>';*/

            detailcourseButtonStr += '<div onclick=shareJiajia(); class="dibu5">';
            detailcourseButtonStr += '<i class="icon icon-41 weui-tabbar__icon" id="iconshare4"><span class="weui-badge" style="position: absolute;top: .25em;right: -1em;">赚</span></i>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '</div>';
        }
        $("body").append(detailcourseButtonStr);
        setTimeout(function() {
            if($("#onepage").size() > 0 ){
                huiyaun("huiyuan1",'onepage',"2","3.5");
            }
        },500);


        //分享内容
        var sharecourseButtonStr = '';
        sharecourseButtonStr += '<div class="disnone" >';
        sharecourseButtonStr += '<center>';
        sharecourseButtonStr += '<div id="qrcodeCanvas"></div>';
        sharecourseButtonStr += '</center>';
        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '<div id="sharecontent" class="disnone" style="width: 100%;margin-bottom: 50px;background-image: url('+checkPathBackGroubdImage(localStorage.getItem("sharemember"))+');background-repeat:no-repeat;background-size:cover;">';



        /* sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
         sharecourseButtonStr += '<span class="weui-loadmore__tips">封面</span>';
         sharecourseButtonStr += '</div>';*/

        sharecourseButtonStr += '<div class="page-bd-15 " style="text-align: center;height: 40px">';
        //sharecourseButtonStr += '<img class="getgold_top_head_img"  src="'+ checkPath(data.result.huiYuan.huiyuanImage,'1')+'" id="fengmainimagebase64" style="margin-top: 40px;height: 1px;width: 1px;border-radius:50%;">';
        /*sharecourseButtonStr += '<div class="weui-c-article"><p >'+data.result.tool.toolContent+'</p></div>';*/
        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;">';
        sharecourseButtonStr += '<h4 class="weui-c-title bottom5 f-white" ></h4>';

        //付费时候
        if(data.result.huiYuan.huiyuanPrice != null && data.result.huiYuan.huiyuanPrice > 0.00){
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

        /*sharecourseButtonStr += '<div style="width: 100%;text-align: center;margin-top: -70px;">';
        if(data.result.user != null) {
            sharecourseButtonStr += '<img src="' + checkPath(data.result.user.headimgurl, "1") + '" id="headimagebase64" height="25px" width="25px" style="border-radius: 5px;"/>';
        }
        sharecourseButtonStr += '</div>';*/


        sharecourseButtonStr += '<div style="width: 100%;text-align: center;height: 50px;">';

        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '</div>';







        $("body").prepend(sharecourseButtonStr);
        $(document).ready(function() {

            qrCode("qrcodeCanvas",baseUrlFrontDefault+"howmakemoney.html?id="+data.result.huiYuan.id+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));
            localStorage.setItem("bgurl",localStorage.getItem("sharemember"));
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
                getBase64ImageInServeice(checkPath(data.result.huiYuan.huiyuanImage,'1'),"fengmainimagebase64");
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

//应用详情渲染-当快到期时候显示购买会员
function detailToolRender(data){
    if(data.code == '0'){
        $("title").html(data.result.tool.toolTitle);
        var detailcourseStr = '';
        detailcourseStr += '';

        detailcourseStr += '<div class="weui-c-content" >';
        detailcourseStr += '<h2 class="weui-c-title bottom5">'+data.result.tool.toolTitle+'</h2>';
        if((GetUrlString("share") == null || GetUrlString("share") == '')  && data.result.isHuiYuan == '1') {
            detailcourseStr += '<h2 class="bottom5 f14 f-red">' + setNULL(data.result.tool.toolSharetitle) + '</h2>';
        }


        if(getSaasId() == '0'){
            detailcourseStr += '<div class="weui-c-meta bottom5" style="float: left;width: 70%;">';
            detailcourseStr += '<div class="weui-c-meta bottom5">';
            detailcourseStr += '<span class="weui-c-nickname">';
            detailcourseStr += '<div class="weui-news-infoitem"  onclick=toUserHome("'+data.result.tool.createBy.id+'","1")>';
            detailcourseStr += '<img src="'+ checkPath(data.result.tool.createBy.headimgurl,'1')+'" class="weui-news-round">';
            detailcourseStr += '<span class="weui-news-left f-blue f16import">'+data.result.tool.createBy.nickname+'</span>';
            detailcourseStr += '</div>';
            detailcourseStr += '</span>';
            detailcourseStr += '<em class="weui-c-nickname">'+timeago(data.result.tool.createDate)+'</em>';
            detailcourseStr += '</div>';
            detailcourseStr += '</div>';

            detailcourseStr += '<div style="float: left;width: 30%;line-height: 40px;">';
            $("#guanzhuId").val(data.result.tool.createBy.id);
            detailcourseStr += '<div style="width: 100%;text-align: right;">';
            detailcourseStr += '<label class="weui-label-s b-orange  f-white f12"  id="bgguanzhu" onclick=saveNRguanzhu() style="padding: 0.2em; margin-left: 10px;background-color:#ef4f4f !important;border: 1px solid #ef4f4f !important;color: white !important;;"><i class="beauty icon-xiai f-white f16 " id="gz">关注</i></label>';
            detailcourseStr += '</div>';
            detailcourseStr += '</div>';
        }





        detailcourseStr += '<div class="clear"></div>';

        detailcourseStr += '<div class="weui-comment-reply top00">';
        if(GetUrlString('share') != null){//是否是推广链接
            if(data.result.tool.toolPrice != null && data.result.tool.toolPrice > 0 &&   data.result.tool.isLowprice == '1'){
                detailcourseStr += '<div class="nickname f-red">限时低价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.tool.lowpriceStart,format='MM-DD')+'至'+formatDate(data.result.tool.lowpriceEnd,format='MM-DD')+']</span> </div>';

            }else if(data.result.tool.toolPrice != null && data.result.tool.toolPrice > 0 && data.result.tool.isGaoyongjin == '1'){
                detailcourseStr += '<div class="nickname f-red">抢购价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.tool.toolPrice+'</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';
            }else if(data.result.tool.toolPrice != null && data.result.tool.toolPrice > 0 ){
                detailcourseStr += '<div class="nickname f-red">抢购价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.tool.toolPrice+'</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';
            }else{
                //detailcourseStr += '<div class="nickname f-red f12">本篇文章可免费阅读，感谢作者分享</div>';
            }
        }else{
            if(data.result.tool.toolPrice != null && data.result.tool.toolPrice > 0 &&   data.result.tool.isLowprice == '1'){
                if(data.result.isHuiYuan == '1'){
                    detailcourseStr += '<div class="nickname f-red">限时低价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.tool.lowpriceStart,format='MM-DD')+'至'+formatDate(data.result.tool.lowpriceEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">会员佣金￥'+data.result.yongjin+'</span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">限时低价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.tool.lowpriceStart,format='MM-DD')+'至'+formatDate(data.result.tool.lowpriceEnd,format='MM-DD')+']</span> </div>';

                }
            }else if(data.result.tool.toolPrice != null && data.result.tool.toolPrice > 0 && data.result.tool.isGaoyongjin == '1'){
                if(data.result.isHuiYuan == '1'){
                    detailcourseStr += '<div class="nickname f-red">限时高佣金(会员)￥'+data.result.yongjin+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.tool.gaoyongjinStart,format='MM-DD')+'至'+formatDate(data.result.tool.gaoyongjinEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">抢购价￥'+data.result.price+'</span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">抢购价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.tool.toolPrice+'</span></div>';

                }
            }else if(data.result.tool.toolPrice != null && data.result.tool.toolPrice > 0 ){
                if(data.result.isHuiYuan == '1'){
                    detailcourseStr += '<div class="nickname f-red">抢购价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.tool.toolPrice+'</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">会员佣金￥'+data.result.yongjin+'</span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">抢购价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.tool.toolPrice+'</span></div>';

                }
            }else{
                detailcourseStr += '<div class="nickname f-red f12">本工具可免费使用，感谢作者分享</div>';
            }
        }


        //detailcourseStr += '<p class="time subtext">'+data.result.tool.toolLabel+'</p>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-article">';

        if(data.result.isBuy == '0'){
            /*if(data.result.tool.toolImage != null){
                detailcourseStr += '<img src="'+ checkPath(data.result.tool.toolImage,'1')+'" >';
            }*/

            detailcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
            if(data.result.tool.isZiying != null && data.result.tool.isZiying != ''){
                if(data.result.tool.isZiying == '1'){
                    detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
                }

            }

            if((GetUrlString("share") == null || GetUrlString("share") == '')  && data.result.isHuiYuan == '1' ){
                if(data.result.tool.toolJiesuan != null && data.result.tool.toolJiesuan != ''){
                    detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.tool.toolJiesuan+'</label>';
                }
            }

            if(data.result.tool.toolLabel != null && data.result.tool.toolLabel != ''){
                var str = data.result.tool.toolLabel; //这是一字符串
                var strs= new Array(); //定义一数组
                strs=str.split("/"); //字符分割
                for (i=0;i<strs.length ;i++ )
                {
                    detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
                }

            }


            detailcourseStr += '</div>';


            if((GetUrlString("share") == null || GetUrlString("share") == '')  && data.result.isHuiYuan == '1' ){
                detailcourseStr += '<p>'+setNULL(data.result.tool.toolSharecontent)+'</p>';
            }
            detailcourseStr += '<p>'+data.result.tool.toolContent+'</p>';
            /*if(data.result.tool.priceWay == '2'){
                detailcourseStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick=openPay("购买应用","好应用，会生钱[按次购买]","","","1","0","'+data.result.tool.toolTitle.replace(/\s*!/g,"")+'","","'+data.result.price+'","'+data.result.price+'","9","","1","0","'+data.result.isHuiYuan+'","'+data.result.tool.id+'","'+data.result.tool.createBy.id+'");>';

            }else{
                detailcourseStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick=openPay("购买应用","好应用，会生钱[按年购买]","","","1","0","'+data.result.tool.toolTitle.replace(/\s*!/g,"")+'","","'+data.result.price+'","'+data.result.price+'","9","","1","0","'+data.result.isHuiYuan+'","'+data.result.tool.id+'","'+data.result.tool.createBy.id+'");>';

            }*/


        }else{
            $("#buyandshare").hide();
            $("#share").show();
            /*if(data.result.tool.toolImage != null ){
                detailcourseStr += '<img src="'+ checkPath(data.result.tool.toolImage,'1')+'" >';
            }*/

            detailcourseStr += '<div class="weui-label-list clear" style="margin-left: 0px;">';
            if(data.result.tool.isZiying != null && data.result.tool.isZiying != ''){
                if(data.result.tool.isZiying == '1'){
                    detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
                }

            }

            if(GetUrlString("share") == null || GetUrlString("share") == '' ){
                if(data.result.tool.toolJiesuan != null && data.result.tool.toolJiesuan != ''){
                    detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.tool.toolJiesuan+'</label>';
                }
            }

            if(data.result.tool.toolLabel != null && data.result.tool.toolLabel != ''){
                var str = data.result.tool.toolLabel; //这是一字符串
                var strs= new Array(); //定义一数组
                strs=str.split("/"); //字符分割
                for (i=0;i<strs.length ;i++ )
                {
                    detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
                }

            }
            detailcourseStr += '</div>';

            if(GetUrlString("share") == null || GetUrlString("share") == '' ){
                detailcourseStr += '<p>'+setNULL(data.result.tool.toolSharecontent)+'</p>';
            }
            detailcourseStr += '<p>'+data.result.tool.toolContent+'</p>';

           /* detailcourseStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn">';
            if(data.result.tool.priceWay == '2'){
                detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去使用<span class="slogan f-white">剩'+setNum(data.result.huiyuanNum)+'次</span></a>';
            }else{
                detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去使用<span class="slogan f-white">剩'+setNum(data.result.huiyuanNum)+'天</span></a>';
            }

            detailcourseStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去使用<span class="slogan f-white">￥'+setNum(data.result.price)+'</span></a>';*/


    }



        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-tools">';
        detailcourseStr += '<a class="" onclick=zhuanfa("2","'+data.result.tool.id+'","'+data.result.tool.createBy.id+'","5");><i class="icon icon-5 weui-tabbar__icon" id="dashangicon"></i>转发</a>';
        detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">'+setNum(data.result.tool.toolDianjiliang)+'</span></div>';
        detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
        detailcourseStr += '<span  onclick=dianji("6","'+data.result.tool.id+'"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan'+data.result.tool.id+'">'+setNum(data.result.tool.toolZan)+'</span> </span>';
        detailcourseStr += '<span class="check checked disnone" onclick=openCommentList("commentDisList","2","1",10,"'+data.result.tool.id+'","6","'+data.result.tool.createBy.id+'");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">'+setNum(data.result.tool.commentNum)+'</span> </span>';

        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        /*分享参数*/
        detailcourseStr += '<input type="hidden" id="id" value="'+data.result.tool.id+'">';
        detailcourseStr += '<input type="hidden" id="shareType" value="5">';
        detailcourseStr += '<input type="hidden" id="shareTitle" value="'+data.result.tool.toolTitle+'">';
        detailcourseStr += '<input type="hidden" id="shareImage" value="'+checkPath(data.result.tool.toolImage,'1')+'">';


        detailcourseStr += '<input type="hidden" id="orderMoney" value="'+setNum(data.result.price)+'">';
        detailcourseStr += '<input type="hidden" id="orderNum" value="1">';
        detailcourseStr += '<input type="hidden" id="orderType" value="9">';
        detailcourseStr += '<input type="hidden" id="orderDashangType" value="7">';
        detailcourseStr += '<input type="hidden" id="orderTitle" value="'+data.result.tool.toolTitle+'">';
        detailcourseStr += '<input type="hidden" id="orderAboutid" value="'+data.result.tool.id+'">';

        if(data.result.tool.fabuStatus == '3'){
            $("#detailcourse").html(detailcourseStr);
        }else{
            $.toast("对不起，产品已下架！","text");

        }



        <!--购买-分享-->
        var detailcourseButtonStr = '';
        if(1==2 && data.result.tool.toolPrice != null && data.result.tool.toolPrice > 0.00  && data.result.isBuy == '0' && GetUrlString('share') == null){//不是分享
            detailcourseButtonStr += '<div id="buyandshare">';
            detailcourseButtonStr += '<div class="fixedbtn21">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">￥'+data.result.yongjin+'</span></a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn22">';
            if(data.result.tool.priceWay == '2'){
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("购买应用","好应用，会生钱[按次购买]","","","1","0","'+data.result.tool.toolTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","9","","1","0","'+data.result.isHuiYuan+'","'+data.result.tool.id+'","'+data.result.tool.createBy.id+'");>';

            }else{
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("购买应用","好应用，会生钱[按年购买]","","","1","0","'+data.result.tool.toolTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","9","","1","0","'+data.result.isHuiYuan+'","'+data.result.tool.id+'","'+data.result.tool.createBy.id+'");>';

            }

            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去购买<span class="slogan f-white">￥'+setNum(data.result.price)+'</span></a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn23">';
            detailcourseButtonStr += '<a href="javascript:;" class="fenge">|</a>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '</div>';
        }else if(1==2 && data.result.tool.toolPrice != null && data.result.tool.toolPrice > 0.00  && data.result.isBuy == '1' && eval(data.result.huiyuanNum) < 30 ){//不是分享
            detailcourseButtonStr += '<div id="buyandshare">';
            detailcourseButtonStr += '<div class="fixedbtn21">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">￥'+data.result.yongjin+'</span></a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn22">';
            if(data.result.tool.priceWay == '2'){
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("购买应用","好应用，会生钱[按次购买]","","","1","0","'+data.result.tool.toolTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","9","","1","0","'+data.result.isHuiYuan+'","'+data.result.tool.id+'","'+data.result.tool.createBy.id+'");>';


            }else{
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("购买应用","好应用，会生钱[按年购买]","","","1","0","'+data.result.tool.toolTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","9","","1","0","'+data.result.isHuiYuan+'","'+data.result.tool.id+'","'+data.result.tool.createBy.id+'");>';

            }


            if(data.result.tool.priceWay == '2'){
                detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去购买<span class="slogan f-white">剩'+setNum(data.result.huiyuanNum)+'次</span></a>';

            }else{
                detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去购买<span class="slogan f-white">剩'+setNum(data.result.huiyuanNum)+'天</span></a>';

            }

            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn23">';
            detailcourseButtonStr += '<a href="javascript:;" class="fenge">|</a>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '</div>';
        }else if(1==2 && data.result.tool.toolPrice != null && data.result.tool.toolPrice > 0.00  && data.result.isBuy == '0' && GetUrlString('share') != null){//分享未购买
            detailcourseButtonStr += '<div id="buyandshare">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            if(data.result.tool.priceWay == '2'){
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("购买应用","好应用，会生钱[按次购买]","","","1","0","'+data.result.tool.toolTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","9","","1","0","'+data.result.isHuiYuan+'","'+data.result.tool.id+'","'+data.result.tool.createBy.id+'");>';

            }else{
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("购买应用","好应用，会生钱[按年购买]","","","1","0","'+data.result.tool.toolTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","9","","1","0","'+data.result.isHuiYuan+'","'+data.result.tool.id+'","'+data.result.tool.createBy.id+'");>';

            }
            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon " id="iconshare"></i>去购买<span class="slogan f-white">￥'+setNum(data.result.price)+'</span></a>';
            detailcourseButtonStr += '</div>';


            detailcourseButtonStr += '</div>';
        }else if(1==2 && data.result.tool.toolPrice != null && data.result.tool.toolPrice > 0 ){//已购买
            detailcourseButtonStr += '<div id="share">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">￥'+data.result.yongjin+'</span></a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '</div>';
        }else{//免费
           /* detailcourseButtonStr += '<div id="share">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享</a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '</div>';*/


            detailcourseButtonStr += '<div class="fixedbtn24 dibu1" >';
            if(data.result.isBuy == '0'){
                if(data.result.tool.priceWay == '2'){
                    detailcourseButtonStr += '<div class="dibu2" onclick=openPay("购买应用","好应用，会生钱[按次购买]","","","1","0","'+data.result.tool.toolTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","9","","1","0","'+data.result.isHuiYuan+'","'+data.result.tool.id+'","'+data.result.tool.createBy.id+'");>';

                }else{
                    detailcourseButtonStr += '<div class="dibu2" onclick=openPay("购买应用","好应用，会生钱[按年购买]","","","1","0","'+data.result.tool.toolTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","9","","1","0","'+data.result.isHuiYuan+'","'+data.result.tool.id+'","'+data.result.tool.createBy.id+'");>';

                }
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-24 weui-tabbar__icon" id="iconshare"></i>购买</a>';
                detailcourseButtonStr += '</div>';
            }else{
                if(data.result.tool.id == '410b2ddd8f654fc9b41726ebac7be574' || data.result.tool.id == '6d5c1b0afe774a46b0d74e9287d5bd2b'  || data.result.tool.id == 'd275f1bb7bc841778a9864164548db79' || data.result.tool.id == 'fb70c906575d401799180cfee8765e44'){
                    detailcourseButtonStr += '<div class="dibu2" onclick=openCommentSave("commentDisList","'+data.result.tool.id+'","6","'+data.result.tool.createBy.id+'");>';
                    detailcourseButtonStr += '<div style="line-height: 50px;text-align: center;font-size: 14px;">写评论…</div>';
                    detailcourseButtonStr += '</div>';
                }else{
                	//大数据查询工具
                	//console.log(data.result.tool.id)
                	if(data.result.tool.id =='d2049b771f6f404393c17a8ccf77f691'){
                			//加载表单
                		bigDataLoad();
                	detailcourseButtonStr += '<div class="dibu2" onclick=openApply("bigData"); >';
                    detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-92 weui-tabbar__icon" id="iconshare"></i>去使用</a>';
                    detailcourseButtonStr += '</div>';

                	}else if(data.result.tool.id =='182c5ce634e04a6280ea478f64a9a314'){
                			//加载表单
                		bigDataLoad();
                	detailcourseButtonStr += '<div class="dibu2" onclick=openApply("bigData"); >';
                    detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-92 weui-tabbar__icon" id="iconshare"></i>去使用</a>';
                    detailcourseButtonStr += '</div>';

                	}else if(data.result.tool.id =='8f90110e0c354d669504931bdc1c734d'){
                		//加载表单
                		bigDataLoad();
                	detailcourseButtonStr += '<div class="dibu2" onclick=openApply("bigData"); >';
                    detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-92 weui-tabbar__icon" id="iconshare"></i>去使用</a>';
                    detailcourseButtonStr += '</div>';

                	}else if(data.result.tool.id =='92150bd5187f40b1a5b18b559bedbe46'){
                		//加载表单
                		aliCreditDataLoad();
                		//逾期记录详情查询：
                	detailcourseButtonStr += '<div class="dibu2" onclick=openApply("aliCredit"); >';
                    detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-92 weui-tabbar__icon" id="iconshare"></i>去使用</a>';
                    detailcourseButtonStr += '</div>';

                	}else if(data.result.tool.id =='03007ffc11314464983a9b5f853d3b61'){
                		//加载表单
                		aliMultiLoanLoad();
                		//多头借贷详情版：
                	detailcourseButtonStr += '<div class="dibu2" onclick=openApply("aliMultiLoan"); >';
                    detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-92 weui-tabbar__icon" id="iconshare"></i>去使用</a>';
                    detailcourseButtonStr += '</div>';

                	}else  if(data.result.tool.id =='b15cde4d0f0c4df99510a693531dbfec'){
                		//加载表单
                		aliLoanLendLoad();
                		//小贷负债历史
                	detailcourseButtonStr += '<div class="dibu2" onclick=openApply("loanLend"); >';
                    detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-92 weui-tabbar__icon" id="iconshare"></i>去使用</a>';
                    detailcourseButtonStr += '</div>';

                	}else if(data.result.tool.id =='c40e5fb1216748fc928d6f20fdf76f6c'){
                		//加载表单
                		aliBlacklistDataLoad();
                		//金融黑名单验证-网贷黑名单—简版：
                	detailcourseButtonStr += '<div class="dibu2" onclick=openApply("blacklist"); >';
                    detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-92 weui-tabbar__icon" id="iconshare"></i>去使用</a>';
                    detailcourseButtonStr += '</div>';

                	}else if(data.result.tool.id =='012ad5c896834e709a6d1960f48146dd'){
                		//加载表单
                		aliFraudCheckDataLoad();
                		//互联网金融综合查询/反欺诈报告/借贷行为分析/运营商多维度分析
                	detailcourseButtonStr += '<div class="dibu2" onclick=openApply("fraudCheck"); >';
                    detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-92 weui-tabbar__icon" id="iconshare"></i>去使用</a>';
                    detailcourseButtonStr += '</div>';

                	}else if(data.result.tool.id =='23b547308f874681a490c487ce473a50'){
                		//加载表单
                		aliOverduePaymentDataLoad();
                		//逾期催收黑名单分析报告-逾期催收报告-逾期催收黑名单分析
                	detailcourseButtonStr += '<div class="dibu2" onclick=openApply("overduePayment"); >';
                    detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-92 weui-tabbar__icon" id="iconshare"></i>去使用</a>';
                    detailcourseButtonStr += '</div>';

                	}else if(data.result.tool.id =='fb231fba2d134679a189a9cb7ad37607'){
                		//加载表单
                		aliLawsuitInfoDataLoad();
                		//个人涉诉查询-个人行政处罚
                	detailcourseButtonStr += '<div class="dibu2" onclick=openApply("lawsuitInfo"); >';
                    detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-92 weui-tabbar__icon" id="iconshare"></i>去使用</a>';
                    detailcourseButtonStr += '</div>';

                	}else if(data.result.tool.id =='02c9b882dd104af68fb94bcf13a42a3b'){
                		//加载表单
                		aliGetMultipleCDataLoad();
                		//多头借贷c版
                	detailcourseButtonStr += '<div class="dibu2" onclick=openApply("getMultipleC"); >';
                    detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-92 weui-tabbar__icon" id="iconshare"></i>去使用</a>';
                    detailcourseButtonStr += '</div>';

                	}else  if(data.result.tool.id =='2ee6cf3fa7bf48959f496327c3b13ade'){
                		//加载表单
                		creditCardLoad();
                		//信用卡评测
                	detailcourseButtonStr += '<div class="dibu2" onclick=openApply("creditCard"); >';
                    detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-92 weui-tabbar__icon" id="iconshare"></i>去使用</a>';
                    detailcourseButtonStr += '</div>';

                	}else{
                        detailcourseButtonStr += '<div class="dibu2" onclick="" >';
                        detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-92 weui-tabbar__icon" id="iconshare"></i>去使用</a>';
                        detailcourseButtonStr += '</div>';

                    }

                }
            }

            detailcourseButtonStr += '<div class="dibu3" >';
            detailcourseButtonStr += '<div onclick=openCommentList("commentDisList","2","1",10,"'+data.result.tool.id+'","6","'+data.result.tool.createBy.id+'"); class="dibu5">';

            if(setNum(data.result.tool.commentNum) > 0){

                detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"><span class="weui-badge" style="position: absolute;top: .25em;right: -.4em;">'+setNum(data.result.tool.commentNum)+'</span></i>';
            }else{
                detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"></i>';
            }

            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div onclick=dianji("6","'+data.result.tool.id+'"); class="dibu5">';
            detailcourseButtonStr += '<i class="icon icon-65 weui-tabbar__icon" id="iconshare2"></i>';
            detailcourseButtonStr += '</div>';

          /*  detailcourseButtonStr += '<div onclick=zhuanfa("2","'+data.result.tool.id+'","'+data.result.tool.createBy.id+'","5"); class="dibu5">';
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
        sharecourseButtonStr += '<div id="sharecontent" class="disnone" style="width: 100%;margin-bottom: 50px;background-image: url('+checkPathBackGroubdImage(localStorage.getItem("shareapp"))+');background-repeat:no-repeat;background-size:cover;">';


       /* sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
        sharecourseButtonStr += '<span class="weui-loadmore__tips">封面</span>';
        sharecourseButtonStr += '</div>';*/

        sharecourseButtonStr += '<div class="page-bd-15 " style="text-align: center;">';
        sharecourseButtonStr += '<img class="getgold_top_head_img"  src="'+ checkPath(data.result.tool.toolImage,'1')+'" id="fengmainimagebase64" style="margin-top: 40px;height: 1px;width: 1px;border-radius:50%;">';
        /*sharecourseButtonStr += '<div class="weui-c-article"><p >'+data.result.tool.toolContent+'</p></div>';*/
        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;">';
        sharecourseButtonStr += '<h4 class="weui-c-title bottom5 f-white " ></h4>';

        //付费时候
        if(data.result.tool.toolPrice != null && data.result.tool.toolPrice > 0.00){
            sharecourseButtonStr += '<div class="nickname f-red">'+data.result.tool.toolTitle+'</div>';
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

      /*  sharecourseButtonStr += '<div style="width: 100%;text-align: center;margin-top: -70px;">';
        if(data.result.user != null) {
            sharecourseButtonStr += '<img src="' + checkPath(data.result.user.headimgurl, "1") + '" id="headimagebase64" height="25px" width="25px" style="border-radius: 5px;"/>';
        }
        sharecourseButtonStr += '</div>';*/


        sharecourseButtonStr += '<div style="width: 100%;text-align: center;height: 50px;">';

        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '</div>';

        $("body").prepend(sharecourseButtonStr);
        $(document).ready(function() {

            qrCode("qrcodeCanvas",baseUrlFrontDefault+"gongjudetail.html?id="+data.result.tool.id+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));
            localStorage.setItem("bgurl",localStorage.getItem("shareapp"));

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
                getBase64ImageInServeice(checkPath(data.result.tool.toolImage,'1'),"fengmainimagebase64");
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
            isguanzhu();

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

//活动详情渲染-
function detailActivityRender(data){
    if(data.code == '0'){
        $("title").html(data.result.activity.activityTitle);
        var detailcourseStr = '';
        detailcourseStr += '';

        detailcourseStr += '<div class="weui-c-content" >';
        detailcourseStr += '<h2 class="weui-c-title bottom5">'+data.result.activity.activityTitle+'</h2>';
        if(GetUrlString("share") == null || GetUrlString("share") == '') {
            detailcourseStr += '<h2 class="bottom5 f14 f-red">' + setNULL(data.result.activity.activitySharetitle) + '</h2>';
        }

        detailcourseStr += '<div class="weui-c-meta bottom5" style="float: left;width: 70%;">';
        detailcourseStr += '<div class="weui-c-meta bottom5">';
        detailcourseStr += '<span class="weui-c-nickname">';
        detailcourseStr += '<div class="weui-news-infoitem"  onclick=toUserHome("'+data.result.activity.createBy.id+'","1")>';
        detailcourseStr += '<img src="'+ checkPath(data.result.activity.createBy.headimgurl,'1')+'" class="weui-news-round">';
        detailcourseStr += '<span class="weui-news-left f-blue f16import">'+data.result.activity.createBy.nickname+'</span>';
        detailcourseStr += '</div>';
        detailcourseStr += '</span>';
        detailcourseStr += '<em class="weui-c-nickname">'+timeago(data.result.activity.createDate)+'</em>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '<div style="float: left;width: 30%;line-height: 40px;">';
        $("#guanzhuId").val(data.result.activity.createBy.id);
        detailcourseStr += '<div style="width: 100%;text-align: right;">';
        detailcourseStr += '<label class="weui-label-s b-orange  f-white f12"  id="bgguanzhu" onclick=saveNRguanzhu() style="padding: 0.2em; margin-left: 10px;background-color:#ef4f4f !important;border: 1px solid #ef4f4f !important;color: white !important;;"><i class="beauty icon-xiai f-white f16 " id="gz">关注</i></label>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '<div class="clear"></div>';

        detailcourseStr += '<div class="weui-comment-reply top00">';
        if(GetUrlString('share') != null){//是否是推广链接
            if(data.result.activity.activityPrice != null && data.result.activity.activityPrice > 0 &&   data.result.activity.isLowprice == '1'){
                detailcourseStr += '<div class="nickname f-red">限时低价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.activity.lowpriceStart,format='MM-DD')+'至'+formatDate(data.result.activity.lowpriceEnd,format='MM-DD')+']</span> </div>';

            }else if(data.result.activity.activityPrice != null && data.result.activity.activityPrice > 0 && data.result.activity.isGaoyongjin == '1'){
                detailcourseStr += '<div class="nickname f-red">会员价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.activity.activityPrice+'</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';
            }else if(data.result.activity.activityPrice != null && data.result.activity.activityPrice > 0 ){
                detailcourseStr += '<div class="nickname f-red">会员价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.activity.activityPrice+'</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';
            }else{
                //detailcourseStr += '<div class="nickname f-red f12">本篇文章可免费阅读，感谢作者分享</div>';
            }
        }else{
            if(data.result.activity.activityPrice != null && data.result.activity.activityPrice > 0 &&   data.result.activity.isLowprice == '1'){
                if(data.result.isHuiYuan == '1'){
                    detailcourseStr += '<div class="nickname f-red">限时低价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.activity.lowpriceStart,format='MM-DD')+'至'+formatDate(data.result.activity.lowpriceEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">会员佣金￥'+data.result.yongjin+'</span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">限时低价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.activity.lowpriceStart,format='MM-DD')+'至'+formatDate(data.result.activity.lowpriceEnd,format='MM-DD')+']</span> </div>';

                }
            }else if(data.result.activity.activityPrice != null && data.result.activity.activityPrice > 0 && data.result.activity.isGaoyongjin == '1'){
                if(data.result.isHuiYuan == '1'){
                    detailcourseStr += '<div class="nickname f-red">限时高佣金(会员)￥'+data.result.yongjin+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.activity.gaoyongjinStart,format='MM-DD')+'至'+formatDate(data.result.activity.gaoyongjinEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">会员价￥'+data.result.price+'</span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">会员价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.activity.activityPrice+'</span></div>';
                }
            }else if(data.result.activity.activityPrice != null && data.result.activity.activityPrice > 0 ){
                if(data.result.isHuiYuan == '1'){
                    detailcourseStr += '<div class="nickname f-red">会员价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.activity.activityPrice+'</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">会员佣金￥'+data.result.yongjin+'</span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">会员价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+data.result.activity.activityPrice+'</span></div>';

                }
            }else{
                /*detailcourseStr += '<div class="nickname f-red f12">本活动可免费参与，感谢作者分享</div>';*/
            }
        }


        //detailcourseStr += '<p class="time subtext">'+data.result.activity.activityLabel+'</p>';





        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-article">';

        if(data.result.isBuy == '0'){
            /*if(data.result.activity.activityImage != null){
                detailcourseStr += '<img src="'+ checkPath(data.result.activity.activityImage,'1')+'" >';
            }*/
            detailcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
            if(data.result.activity.isZiying != null && data.result.activity.isZiying != ''){
                if(data.result.activity.isZiying == '1'){
                    detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
                }

            }

            if((GetUrlString("share") == null || GetUrlString("share") == '') && data.result.isHuiYuan == '1' ){
                if(data.result.activity.activityJiesuan != null && data.result.activity.activityJiesuan != ''){
                    detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.activity.activityJiesuan+'</label>';
                }
            }

            if(data.result.activity.activityLabel != null && data.result.activity.activityLabel != ''){
                var str = data.result.activity.activityLabel; //这是一字符串
                var strs= new Array(); //定义一数组
                strs=str.split("/"); //字符分割
                for (i=0;i<strs.length ;i++ )
                {
                    detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
                }

            }



            if(data.result.activity.activityCity != null && data.result.activity.activityCity != ''){
                detailcourseStr += '<div class="f14 f-blue line24 ">所在城市:'+data.result.activity.activityCity+'</div>';
            }

            if(data.result.activity.activityAddress != null && data.result.activity.activityAddress != ''){
                detailcourseStr += '<div  class="f14 f-blue line24 ">详细地址:'+data.result.activity.activityAddress+'</div>';
            }

            detailcourseStr += '</div>';


            if((GetUrlString("share") == null || GetUrlString("share") =='' ) && data.result.isHuiYuan == '1' ){
                detailcourseStr += '<p>'+setNULL(data.result.activity.activitySharecontent)+'</p>';
            }
            detailcourseStr += '<p>'+data.result.activity.activityContent+'</p>';

            /*detailcourseStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick=openPay("参与活动","越交流越幸运","","","1","0","'+data.result.activity.activityTitle.replace(/\s*!/g,"")+'","","'+data.result.price+'","'+data.result.price+'","19","","0","0","'+data.result.isHuiYuan+'","'+data.result.activity.id+'","'+data.result.activity.createBy.id+'");>';

            detailcourseStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去参与<span class="slogan f-white">￥'+setNum(data.result.price)+'</span></a>';*/

        }else{
            $("#buyandshare").hide();
            $("#share").show();
            /*if(data.result.activity.activityImage != null){
                detailcourseStr += '<img src="'+ checkPath(data.result.activity.activityImage,'1')+'" >';
            }*/

            detailcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
            if(data.result.activity.isZiying != null && data.result.activity.isZiying != ''){
                if(data.result.activity.isZiying == '1'){
                    detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
                }

            }

            if((GetUrlString("share") == null || GetUrlString("share") == '') &&  data.result.isHuiYuan == '1' ){
                if(data.result.activity.activityJiesuan != null && data.result.activity.activityJiesuan != ''){
                    detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.activity.activityJiesuan+'</label>';
                }
            }

            if(data.result.activity.applyEnd != null && data.result.activity.applyEnd != ''){
                detailcourseStr += '<label class="label f-red b-red  f13">截止时间:'+getdateShort(data.result.activity.applyEnd)+'</label>';
            }

            if(data.result.activity.activityLabel != null && data.result.activity.activityLabel != ''){
                var str = data.result.activity.activityLabel; //这是一字符串
                var strs= new Array(); //定义一数组
                strs=str.split("/"); //字符分割
                for (i=0;i<strs.length ;i++ )
                {
                    detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
                }

            }



            if(data.result.activity.activityCity != null && data.result.activity.activityCity != ''){
                detailcourseStr += '<div class="f14 f-blue line24 ">所在城市:'+data.result.activity.activityCity+'</div>';
            }

            if(data.result.activity.activityAddress != null && data.result.activity.activityAddress != ''){
                detailcourseStr += '<div  class="f14 f-blue line24 ">详细地址:'+data.result.activity.activityAddress+'</div>';
            }

            detailcourseStr += '</div>';

            if(GetUrlString("share") == null || GetUrlString("share") == '' ){
                detailcourseStr += '<p>'+setNULL(data.result.activity.activitySharecontent)+'</p>';
            }
            detailcourseStr += '<p>'+data.result.activity.activityContent+'</p>';

        }



        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-tools">';
        detailcourseStr += '<a  class="" onclick=zhuanfa("2","'+data.result.activity.id+'","'+data.result.activity.createBy.id+'","14");><i class="icon icon-5 weui-tabbar__icon" id="dashangicon"></i>转发</a>';
        detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">'+setNum(data.result.activity.activityDianjiliang)+'</span></div>';
        detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
        detailcourseStr += '<span  onclick=dianji("16","'+data.result.activity.id+'"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan'+data.result.activity.id+'">'+setNum(data.result.activity.activityZan)+'</span> </span>';
        detailcourseStr += '<span class="check checked disnone" onclick=openCommentList("commentDisList","2","1",10,"'+data.result.activity.id+'","16","'+data.result.activity.createBy.id+'");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">'+setNum(data.result.activity.commentNum)+'</span> </span>';

        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        /*分享参数*/
        detailcourseStr += '<input type="hidden" id="id" value="'+data.result.activity.id+'">';
        detailcourseStr += '<input type="hidden" id="shareType" value="14">';
        detailcourseStr += '<input type="hidden" id="shareTitle" value="'+data.result.activity.activityTitle+'">';
        detailcourseStr += '<input type="hidden" id="shareImage" value="'+checkPath(data.result.activity.activityImage,'1')+'">';


        detailcourseStr += '<input type="hidden" id="orderMoney" value="'+setNum(data.result.price)+'">';
        detailcourseStr += '<input type="hidden" id="orderNum" value="1">';
        detailcourseStr += '<input type="hidden" id="orderType" value="19">';
        detailcourseStr += '<input type="hidden" id="orderDashangType" value="7">';
        detailcourseStr += '<input type="hidden" id="orderTitle" value="'+data.result.activity.activityTitle+'">';
        detailcourseStr += '<input type="hidden" id="orderAboutid" value="'+data.result.activity.id+'">';


        $("#detailcourse").html(detailcourseStr);


        <!--购买-分享-->
        var detailcourseButtonStr = '';
        if(1==2 && data.result.activity.activityPrice != null && data.result.activity.activityPrice > 0.00  && data.result.isBuy == '0' && GetUrlString('share') == null){//不是分享
            detailcourseButtonStr += '<div id="buyandshare">';
            detailcourseButtonStr += '<div class="fixedbtn21">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>分享<span class="slogan f-white">￥'+data.result.yongjin+'</span></a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn22">';
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("参与活动","越交流越幸运","","","1","0","'+data.result.activity.activityTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","19","","0","0","'+data.result.isHuiYuan+'","'+data.result.activity.id+'","'+data.result.activity.createBy.id+'");>';


            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>参与<span class="slogan f-white">￥'+setNum(data.result.price)+'</span></a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn23">';
            detailcourseButtonStr += '<a href="javascript:;" class="fenge">|</a>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '</div>';
        }else if(1==2 && data.result.activity.activityPrice != null && data.result.activity.activityPrice > 0.00  && data.result.isBuy == '0' && GetUrlString('share') != null){//分享未购买
            detailcourseButtonStr += '<div id="buyandshare">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("参与活动","越交流越幸运","","","1","0","'+data.result.activity.activityTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","19","","0","0","'+data.result.isHuiYuan+'","'+data.result.activity.id+'","'+data.result.activity.createBy.id+'");>';

            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon " id="iconshare"></i>去参与<span class="slogan f-white">￥'+setNum(data.result.price)+'</span></a>';
            detailcourseButtonStr += '</div>';


            detailcourseButtonStr += '</div>';
        }else if(1==2 && data.result.activity.activityPrice != null && data.result.activity.activityPrice > 0 ){//已购买
            detailcourseButtonStr += '<div id="share">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">(会员佣金￥'+data.result.yongjin+')</span></a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '</div>';
        }else{//免费
            /*detailcourseButtonStr += '<div id="share">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享</a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '</div>';*/

            detailcourseButtonStr += '<div class="fixedbtn24 dibu1" >';
            if(data.result.isBuy == '0'){
                detailcourseButtonStr += '<div class="dibu2" onclick=openPay("参与活动","越交流越幸运","","","1","0","'+data.result.activity.activityTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","19","","0","0","'+data.result.isHuiYuan+'","'+data.result.activity.id+'","'+data.result.activity.createBy.id+'");>';
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-24 weui-tabbar__icon" id="iconshare"></i>去参与</a>';
                detailcourseButtonStr += '</div>';
            }else{
                detailcourseButtonStr += '<div class="dibu2" onclick=openCommentSave("commentDisList","'+data.result.activity.id+'","16","'+data.result.activity.createBy.id+'");>';
                detailcourseButtonStr += '<div style="line-height: 50px;text-align: center;font-size: 14px;">写评论…</div>';
                detailcourseButtonStr += '</div>';
            }
            detailcourseButtonStr += '<div class="dibu3" >';
            detailcourseButtonStr += '<div onclick=openCommentList("commentDisList","2","1",10,"'+data.result.activity.id+'","16","'+data.result.activity.createBy.id+'"); class="dibu5">';

            if(setNum(data.result.activity.commentNum) > 0){

                detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"><span class="weui-badge" style="position: absolute;top: .25em;right: -.4em;">'+setNum(data.result.activity.commentNum)+'</span></i>';
            }else{
                detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"></i>';
            }

            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div onclick=dianji("16","'+data.result.activity.id+'"); class="dibu5">';
            detailcourseButtonStr += '<i class="icon icon-65 weui-tabbar__icon" id="iconshare2"></i>';
            detailcourseButtonStr += '</div>';

          /*  detailcourseButtonStr += '<div onclick=zhuanfa("2","'+data.result.activity.id+'","'+data.result.activity.createBy.id+'","14"); class="dibu5">';
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



        sharecourseButtonStr += '<div id="sharecontent" class="disnone" style="width: 100%;margin-bottom: 50px;background-image: url('+checkPathBackGroubdImage(localStorage.getItem("shareactivity"))+');background-repeat:no-repeat;background-size:cover;">';


        /* sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
         sharecourseButtonStr += '<span class="weui-loadmore__tips">封面</span>';
         sharecourseButtonStr += '</div>';*/

        sharecourseButtonStr += '<div class="page-bd-15 " style="text-align: center;">';
        sharecourseButtonStr += '<img class="getgold_top_head_img"  src="'+ checkPath(data.result.activity.activityImage,'1')+'" id="fengmainimagebase64" style="margin-top: 40px;height: 1px;width: 1px;border-radius:50%;">';
        /*sharecourseButtonStr += '<div class="weui-c-article"><p >'+data.result.tool.toolContent+'</p></div>';*/
        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;">';
        sharecourseButtonStr += '<h4 class="weui-c-title bottom5 f-white" ></h4>';

        //付费时候
        if(data.result.activity.activityPrice != null && data.result.activity.activityPrice > 0.00){
            sharecourseButtonStr += '<div class="nickname f-red">'+data.result.activity.activityTitle+'</div>';
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

       /* sharecourseButtonStr += '<div style="width: 100%;text-align: center;margin-top: -70px;">';
        if(data.result.user != null) {
            sharecourseButtonStr += '<img src="' + checkPath(data.result.user.headimgurl, "1") + '" id="headimagebase64" height="25px" width="25px" style="border-radius: 5px;"/>';
        }
        sharecourseButtonStr += '</div>';*/


        sharecourseButtonStr += '<div style="width: 100%;text-align: center;height: 50px;">';

        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '</div>';









        $("body").prepend(sharecourseButtonStr);
        $(document).ready(function() {

            qrCode("qrcodeCanvas",baseUrlFrontDefault+"activitydetail.html?id="+data.result.activity.id+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));
            localStorage.setItem("bgurl",localStorage.getItem("shareactivity"));
            /*
            var url = Canvas2Image.convertToPNG($("canvas")[0],100,100).getAttribute('src');
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
                getBase64ImageInServeice(checkPath(data.result.activity.activityImage,'1'),"fengmainimagebase64");
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

//动态详情渲染
function detailDongtaiRender(data){
    if(data.code == '0'){
        if(data.result.dongTai.dongtaiContent == null || data.result.dongTai.dongtaiContent == ''){
            $("title").html("详情");
        }else{
            //$("title").html(data.result.dongTai.dongtaiContent);
            $("title").html("详情");
        }

        var detailcourseStr = '';
        detailcourseStr += '';

        if(data.result.dongTai.dongtaiType == '1' && data.result.dongTai.dongtaiFile != null){//图片
            /*
                        detailcourseStr += '<div class="weui-feeds"><ul>'+getImageDetailContent(data.result.dongTai.id,data.result.dongTai.dongtaiFile)+'</ul></div>';
            */
            /*detailcourseStr += '<div class="weui-loadmore weui-loadmore_line">';
            detailcourseStr += '<span class="weui-loadmore__tips">图片详情</span>';
            detailcourseStr += '</div>';*/
            detailcourseStr += '<div class="page-bd" >'+getImageDetailList(data.result.dongTai.id,data.result.dongTai.dongtaiFile)+'</div>';
        }else if(data.result.dongTai.dongtaiType == '2' && data.result.dongTai.dongtaiFile != null){//音频
            //音频评论--隐藏原始播放器
            //音频--隐藏原始播放器
            detailcourseStr += '<div class="page-bd center bottom5" id="audiostartA'+data.result.dongTai.id+'" onclick=start("audiotest'+data.result.dongTai.id+'","'+checkPath(data.result.dongTai.dongtaiFile,'3')+'","shifenmiao'+data.result.dongTai.id+'","audiostartA'+data.result.dongTai.id+'","audioIconA'+data.result.dongTai.id+'")>';
            detailcourseStr += '<div class="audio"   >';
            detailcourseStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon"  id="audioIconA'+data.result.dongTai.id+'"/></div>';
            detailcourseStr += '<div id="shifenmiao'+data.result.dongTai.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
            detailcourseStr += '</div>';
            detailcourseStr += '<div class="disnone"><audio id="audiotest'+data.result.dongTai.id+'" src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
            detailcourseStr += '</div>';
        }else if(data.result.dongTai.dongtaiType == '3' && data.result.dongTai.dongtaiFile != null){//视频
            <!--视频播放-->

            detailcourseStr += '<div class="page-bd"><div class="weui-c-article">';
            detailcourseStr += '<div id="dplayer2'+data.result.dongTai.id+'"  price="'+setNum(data.result.dongTai.price)+'"      cre="'+data.result.dongTai.createBy.id+'"></div>';
            detailcourseStr += '<script type="text/javascript">';
            detailcourseStr += 'const dp = new DPlayer({container: document.getElementById("dplayer2'+data.result.dongTai.id+'"), screenshot: true, autoplay:true,preload:\'none\', video: {url: \''+checkPath(data.result.dongTai.dongtaiFile,"3")+'\', pic: \''+videoImagePath(data.result.dongTai.dongtaiFile)+'\'}});';
            detailcourseStr += 'dp.on(\'ended\', function() {';
            detailcourseStr += 'console.log(\'player ended\');';
            detailcourseStr += 'nextdongTai();';
            detailcourseStr += '});';


            detailcourseStr += 'dp.on(\'canplay\', function() {';
            detailcourseStr += 'console.log(\'player start\');';
            detailcourseStr += 'dp.play();';
            detailcourseStr += '});';

            detailcourseStr += '</script>';
            detailcourseStr += '</div></div>';


        }else if(data.result.dongTai.dongtaiType == '4' && data.result.dongTai.dongtaiFile != null){//文件
            //文件评论--判断文件类型展示不同的图片
            if(data.result.dongTai.dongtaiFile.search(".jpeg") != -1 || data.result.dongTai.dongtaiFile.search(".jpg") != -1 || data.result.dongTai.dongtaiFile.search(".png") != -1 || data.result.dongTai.dongtaiFile.search(".gif") != -1 || data.result.dongTai.dongtaiFile.search(".GIF") != -1 ){
                /*detailcourseStr += '<div class="weui-feeds"><ul>'+getImageContent(data.result.dongTai.id,data.result.dongTai.dongtaiFile)+'</ul></div>';*/
                detailcourseStr += '<div class="page-bd">'+getImageDetailList(data.result.dongTai.id,data.result.dongTai.dongtaiFile)+'</div>';
            }else if( data.result.dongTai.dongtaiFile.search(".mp4") != -1 || data.result.dongTai.dongtaiFile.search(".MP4") != -1 || data.result.dongTai.dongtaiFile.search(".flv")  != -1 || data.result.dongTai.dongtaiFile.search(".mov")  != -1 ){
                //视频评论--隐藏原始播放器

                detailcourseStr += '<div class="page-bd"><div class="weui-c-article">';
                detailcourseStr += '<div id="dplayer2'+data.result.dongTai.id+'"  price="'+setNum(data.result.dongTai.price)+'"      cre="'+data.result.dongTai.createBy.id+'"></div>';
                detailcourseStr += '<script type="text/javascript">';
                detailcourseStr += 'const dp = new DPlayer({container: document.getElementById("dplayer2'+data.result.dongTai.id+'"), screenshot: true, autoplay:true,preload:\'none\', video: {url: \''+checkPath(data.result.dongTai.dongtaiFile,"3")+'\', pic: \''+videoImagePath(data.result.dongTai.dongtaiFile)+'\'}});';
                detailcourseStr += 'dp.on(\'ended\', function() {';
                detailcourseStr += 'console.log(\'player ended\');';
                detailcourseStr += 'nextdongTai();';
                detailcourseStr += '});';


                detailcourseStr += 'dp.on(\'canplay\', function() {';
                detailcourseStr += 'console.log(\'player start\');';
                detailcourseStr += 'dp.play();';
                detailcourseStr += '});';
                detailcourseStr += '</script>';
                detailcourseStr += '</div></div>';


            }else if( data.result.dongTai.dongtaiFile.search(".MP3") != -1 || data.result.dongTai.dongtaiFile.search(".mp3") != -1 || data.result.dongTai.dongtaiFile.search(".wav")  != -1 || data.result.dongTai.dongtaiFile.search(".ogg")  != -1 ){
                detailcourseStr += '<div class="">';
                detailcourseStr += '<div class="weui-news-info padding0">';
                detailcourseStr += '<div class="weui-c-article l100">';
                detailcourseStr += '<div id="aplayer1'+data.result.dongTai.id+'"></div>';
                detailcourseStr += '<script type="text/javascript">';
                detailcourseStr += 'const ap1'+data.result.dongTai.id+' = new APlayer({';
                detailcourseStr += 'container: document.getElementById("aplayer1'+data.result.dongTai.id+'"), mini: false, autoplay:true,preload:\'none\',';
                detailcourseStr += 'audio: [{name: \''+getFileName(data.result.dongTai.dongtaiFile)+'\', artist: \'音频\', url: \''+checkPath(data.result.dongTai.dongtaiFile,"3")+'\', cover: \'../../img/agent/head/yinpin.png\'';
                detailcourseStr += '}]';
                detailcourseStr += '});';
                detailcourseStr += '</script>';
                detailcourseStr += '</div>';
                detailcourseStr += '</div>';
                detailcourseStr += '</div>';
            }else{
                detailcourseStr += '<div class="page-bd center bottom5 alignleft" ><a href="'+ checkPath(data.result.dongTai.dongtaiFile,'3')+'" target="_blank">文件:'+getFileName(data.result.dongTai.dongtaiFile)+'</a></div>';
            }

        }else if(data.result.dongTai.dongtaiType == '5' && data.result.dongTai.dongtaiFile != null){
            //红包评论
            detailcourseStr += '<div class="weui-feeds"><img onclick=toHongBaoDetail("'+data.result.dongTai.remarks+'","1");  width="173px" height="286px" src="'+ checkPath(data.result.dongTai.dongtaiFile,'1')+'"></div>';
        }


        detailcourseStr += '<div class="weui-c-content" >';




        detailcourseStr += '<div class="weui-c-meta bottom5" style="float: left;width: 70%;margin-top: 15px;">';
        detailcourseStr += '<div class="weui-c-meta bottom5">';
        detailcourseStr += '<span class="weui-c-nickname">';
        detailcourseStr += '<div class="weui-news-infoitem"  onclick=toUserHome("'+data.result.dongTai.createBy.id+'","1")>';
        detailcourseStr += '<img src="'+ checkPath(data.result.dongTai.createBy.headimgurl,'1')+'" class="avatar shadowonly" style="width:2rem;height:2rem;border-radius: 180px;">';
        detailcourseStr += '<span class="weui-news-left f-blue f16 f16import">'+data.result.dongTai.createBy.nickname+'</span>';
        detailcourseStr += '</div>';
        detailcourseStr += '</span>';
        detailcourseStr += '<em class="weui-c-nickname">'+timeago(data.result.dongTai.createDate)+'</em>';
        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div style="float: left;width: 30%;line-height: 65px;">';
        $("#guanzhuId").val(data.result.dongTai.createBy.id);
        detailcourseStr += '<div style="width: 100%;text-align: right;">';
        detailcourseStr += '<label class="weui-label-s b-orange  f-white f12"  id="bgguanzhu" onclick=saveNRguanzhu() style="padding: 0.2em; margin-left: 10px;background-color:#ef4f4f ;border: 1px solid #ef4f4f ;color: white !important;;"><i class="beauty icon-xiai f-white f16 " id="gz">关注</i></label>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '<div class="clear"></div>';

        detailcourseStr += '<div class="weui-c-article">';


        $("#buyandshare").hide();
        $("#share").show();


        detailcourseStr += ''+data.result.dongTai.dongtaiContent+'';





        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-tools">';
        if(localStorage.getItem("isdisshare") != '1'){
            detailcourseStr += '<a class="" onclick=zhuanfa("1","'+data.result.dongTai.id+'","'+data.result.dongTai.createBy.id+'","");><i class="icon icon-5 weui-tabbar__icon" id="dashangicon"></i>转发</a>';

            detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">'+setNum(data.result.dongTai.dongtaiDianjiliang)+'</span></div>';
            detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
            detailcourseStr += '<span  onclick=dianji("14","'+data.result.dongTai.id+'"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan'+data.result.dongTai.id+'">'+setNum(data.result.dongTai.dongtaiZan)+'</span> </span>';
            detailcourseStr += '<span class="check checked disnone" onclick=openCommentList("commentDisList","2","1",10,"'+data.result.dongTai.id+'","14","'+data.result.dongTai.createBy.id+'");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">'+setNum(data.result.dongTai.commentNum)+'</span> </span>';
        }
/*
        detailcourseStr += '<a href="javascript:dashang();"><i class="icon icon-42 weui-tabbar__icon" id="dashangicon"></i>打赏('+setNum(data.result.dashangNum)+'次)</a>';
*/

        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        /*分享参数*/
        detailcourseStr += '<input type="hidden" id="id" value="'+data.result.dongTai.id+'">';
        detailcourseStr += '<input type="hidden" id="shareType" value="13">';
        detailcourseStr += '<input type="hidden" id="shareTitle" value="'+data.result.dongTai.dongtaiContent+'">';

        //判断-默认LOGO
        if(data.result.dongTai.dongtaiType == '1' && data.result.dongTai.dongtaiFile != null){//图片
            detailcourseStr += '<input type="hidden" id="shareImage" value="'+getFirstImageDetailContent(data.result.dongTai.dongtaiFile)+'">';
        }else if(data.result.dongTai.dongtaiType == '2' && data.result.dongTai.dongtaiFile != null){//音频
            //音频评论--隐藏原始播放器
            detailcourseStr += '<input type="hidden" id="shareImage" value="'+checkPath(baseDefaultYinpinImage,'1')+'">';
        }else if(data.result.dongTai.dongtaiType == '3' && data.result.dongTai.dongtaiFile != null){//视频
            <!--视频播放-->

            //视频--隐藏原始播放器
            detailcourseStr += '<input type="hidden" id="shareImage" value="'+videoImagePath(data.result.dongTai.dongtaiFile)+'">';


        }else if(data.result.dongTai.dongtaiType == '4' && data.result.dongTai.dongtaiFile != null){//文件
            //文件评论--判断文件类型展示不同的图片
            if(data.result.dongTai.dongtaiFile.search(".jpeg") != -1 || data.result.dongTai.dongtaiFile.search(".jpg") != -1 || data.result.dongTai.dongtaiFile.search(".png") != -1 || data.result.dongTai.dongtaiFile.search(".gif") != -1 || data.result.dongTai.dongtaiFile.search(".GIF") != -1 ){
                detailcourseStr += '<input type="hidden" id="shareImage" value="'+getFirstImageDetailContent(data.result.dongTai.dongtaiFile)+'">';
            }else if( data.result.dongTai.dongtaiFile.search(".mp4") != -1 || data.result.dongTai.dongtaiFile.search(".MP4") != -1 || data.result.dongTai.dongtaiFile.search(".flv")  != -1 || data.result.dongTai.dongtaiFile.search(".mov")  != -1 ){
                //视频--隐藏原始播放器
                detailcourseStr += '<input type="hidden" id="shareImage" value="'+videoImagePath(data.result.dongTai.dongtaiFile)+'">';
            }else if( data.result.dongTai.dongtaiFile.search(".MP3") != -1 || data.result.dongTai.dongtaiFile.search(".mp3") != -1 || data.result.dongTai.dongtaiFile.search(".wav")  != -1 || data.result.dongTai.dongtaiFile.search(".ogg")  != -1 ){
                //音频--隐藏原始播放器
                detailcourseStr += '<input type="hidden" id="shareImage" value="'+checkPath(baseDefaultYinpinImage,'1')+'">';
            }else{
                detailcourseStr += '<input type="hidden" id="shareImage" value="'+checkPath(baseDefaultHead,'1')+'">';
            }

        }else{
            detailcourseStr += '<input type="hidden" id="shareImage" value="'+checkPath(baseDefaultHead,'1')+'">';
        }




        detailcourseStr += '<input type="hidden" id="orderMoney" value="'+setNum(data.result.price)+'">';
        detailcourseStr += '<input type="hidden" id="orderNum" value="1">';
        detailcourseStr += '<input type="hidden" id="orderType" value="0">';
        detailcourseStr += '<input type="hidden" id="orderDashangType" value="0">';
        detailcourseStr += '<input type="hidden" id="orderTitle" value="'+data.result.dongTai.dongtaiContent+'">';
        detailcourseStr += '<input type="hidden" id="orderAboutid" value="'+data.result.dongTai.id+'">';


        $("#detailcourse").html(detailcourseStr);


        <!--购买文章-分享-->
        var detailcourseButtonStr = '';
        /*detailcourseButtonStr += '<div id="share">';
        detailcourseButtonStr += '<div class="fixedbtn24">';
        detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
        detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享</a>';
        detailcourseButtonStr += '</div>';
        detailcourseButtonStr += '</div>';*/
        detailcourseButtonStr += '<div class="fixedbtn24 dibu1" >';
        if(localStorage.getItem("isdisshare") == '1'){
            detailcourseButtonStr += '<div class="dibu75" onclick=openCommentSave("commentDisList","'+data.result.dongTai.id+'","14","'+data.result.dongTai.createBy.id+'");>';
        }else{
            detailcourseButtonStr += '<div class="dibu2" onclick=openCommentSave("commentDisList","'+data.result.dongTai.id+'","14","'+data.result.dongTai.createBy.id+'");>';
        }
        detailcourseButtonStr += '<div style="line-height: 50px;text-align: center;font-size: 14px;">写评论…</div>';
        detailcourseButtonStr += '</div>';

        if(localStorage.getItem("isdisshare") == '1'){
            detailcourseButtonStr += '<div class="dibu25" >';
        }else{
            detailcourseButtonStr += '<div class="dibu3" >';
        }


        if(localStorage.getItem("isdisshare") == '1'){
            detailcourseButtonStr += '<div onclick=openCommentList("commentDisList","2","1",10,"'+data.result.dongTai.id+'","14","'+data.result.dongTai.createBy.id+'"); class="dibu6100">';
        }else{
            detailcourseButtonStr += '<div onclick=openCommentList("commentDisList","2","1",10,"'+data.result.dongTai.id+'","14","'+data.result.dongTai.createBy.id+'"); class="dibu5">';
        }

        if(setNum(data.result.dongTai.commentNum) > 0){

            detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"><span class="weui-badge" style="position: absolute;top: .25em;right: -.4em;">'+setNum(data.result.dongTai.commentNum)+'</span></i>';
        }else{
            detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"></i>';
        }

        detailcourseButtonStr += '</div>';

        if(localStorage.getItem("isdisshare") == '1'){

        }else{
            detailcourseButtonStr += '<div onclick=dianji("14","'+data.result.dongTai.id+'"); class="dibu5">';
            detailcourseButtonStr += '<i class="icon icon-65 weui-tabbar__icon" id="iconshare2"></i>';
            detailcourseButtonStr += '</div>';
        }


       /* detailcourseButtonStr += '<div onclick=zhuanfa("1","'+data.result.dongTai.id+'","'+data.result.dongTai.createBy.id+'",""); class="dibu5">';
        detailcourseButtonStr += '<i class="icon icon-103 weui-tabbar__icon" id="iconshare3"></i>';
        detailcourseButtonStr += '</div>';*/
        if(localStorage.getItem("isdisshare") == '1'){

        }else{
            detailcourseButtonStr += '<div class="dibu5" onclick=shareJiajia(); >';
            detailcourseButtonStr += '<i class="icon icon-41 weui-tabbar__icon" id="iconshare4"><span class="weui-badge" style="position: absolute;top: .25em;right: -1em;">赚</span></i>';
            detailcourseButtonStr += '</div>';
        }



        detailcourseButtonStr += '</div>';
        detailcourseButtonStr += '</div>';


        $("body").append(detailcourseButtonStr);

        //分享内容
        var sharecourseButtonStr = '';
        sharecourseButtonStr += '<div class="disnone" >';
        sharecourseButtonStr += '<center>';
        sharecourseButtonStr += '<div id="qrcodeCanvas"></div>';
        sharecourseButtonStr += '</center>';
        sharecourseButtonStr += '</div>';
        sharecourseButtonStr += '<div id="sharecontent" class="disnone" style="width: 100%;margin-bottom: 50px;">';
        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: left;">';
        sharecourseButtonStr += '<h4 class="weui-c-title bottom5" >'+data.result.dongTai.dongtaiContent+'</h4>';
        sharecourseButtonStr += '<div style="word-break:break-all;color:#3e3e3e;"><p class="time f14"  id="fenxiangneirong"></p></div>';


        sharecourseButtonStr += '</div>';

        //判断如果是图片则展示图片
        sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
        sharecourseButtonStr += '<span class="weui-loadmore__tips">封面</span>';
        sharecourseButtonStr += '</div>';



        //判断如果是图片则展示图片
        sharecourseButtonStr += '<div id="sharedongtaicontent"  style="text-align: center;">';
        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;">';
        sharecourseButtonStr += '<img  src="" id="fengmainimagebase64" style="width: 100%;">';
        sharecourseButtonStr += '</div>';
        sharecourseButtonStr += '</div>';



        sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
        sharecourseButtonStr += '<span class="weui-loadmore__tips">扫码或长按识别查看精彩内容</span>';
        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center">';

        sharecourseButtonStr += '<div style="width: 100%;text-align: center;">';
        sharecourseButtonStr += '<img id="tothis" src="" style="width:30%;">';
        sharecourseButtonStr += '</div>';

       /* sharecourseButtonStr += '<div style="width: 100%;text-align: center;margin-top: -70px;">';
        if(data.result.user != null) {
            sharecourseButtonStr += '<img src="' + checkPath(data.result.user.headimgurl, "1") + '" id="headimagebase64" height="25px" width="25px" style="border-radius: 5px;"/>';
        }
        sharecourseButtonStr += '</div>';*/

        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '</div>';

        $("body").prepend(sharecourseButtonStr);
        $(document).ready(function() {

            qrCode("qrcodeCanvas",baseUrlFrontDefault+"dongtaidetail.html?id="+data.result.dongTai.id+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));
            localStorage.setItem("bgurl",localStorage.getItem("sharedongtai"));
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
                var detailDongtaiStr = '';
                //判断如果是图片则展示图片
                if(data.result.dongTai.dongtaiType == '1' && data.result.dongTai.dongtaiFile != null){//图片
                    detailDongtaiStr += '<div class="weui-feeds"><ul>'+getImageDetailContent(data.result.dongTai.id,data.result.dongTai.dongtaiFile)+'</ul></div>';
                }else if(data.result.dongTai.dongtaiType == '2' && data.result.dongTai.dongtaiFile != null){//音频
                    //音频评论--隐藏原始播放器
                    //音频--隐藏原始播放器
                    detailDongtaiStr += '<div class="page-bd center bottom5"  onclick=start("audiotest'+data.result.dongTai.id+'","'+checkPath(data.result.dongTai.dongtaiFile,'3')+'","shifenmiao'+data.result.dongTai.id+'","audiostartA'+data.result.dongTai.id+'","audioIconA'+data.result.dongTai.id+'")>';
                    detailDongtaiStr += '<div class="audio"  style="margin: 0 auto;" >';
                    detailDongtaiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon" /></div>';
                    detailDongtaiStr += '<div style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">长按二维码收听</div>';
                    detailDongtaiStr += '</div>';
                    detailDongtaiStr += '<div class="disnone"><audio src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                    detailDongtaiStr += '</div>';
                }else if(data.result.dongTai.dongtaiType == '3' && data.result.dongTai.dongtaiFile != null){//视频
                    <!--视频播放-->

                    //视频--隐藏原始播放器
                    detailDongtaiStr += '<div class="page-bd-15" style="text-align: center;">';
                    detailDongtaiStr += '<img  src="'+ videoImagePath(data.result.dongTai.dongtaiFile)+'" id="fengmainimagebase64" style="width: 100%;">';
                    detailDongtaiStr += '</div>';


                }else if(data.result.dongTai.dongtaiType == '4' && data.result.dongTai.dongtaiFile != null){//文件
                    //文件评论--判断文件类型展示不同的图片
                    if(data.result.dongTai.dongtaiFile.search(".jpeg") != -1 || data.result.dongTai.dongtaiFile.search(".jpg") != -1 || data.result.dongTai.dongtaiFile.search(".png") != -1 || data.result.dongTai.dongtaiFile.search(".gif") != -1 || data.result.dongTai.dongtaiFile.search(".GIF") != -1 ){
                        detailDongtaiStr += '<div class="weui-feeds"><ul>'+getImageContent(data.result.dongTai.id,data.result.dongTai.dongtaiFile)+'</ul></div>';
                    }else if( data.result.dongTai.dongtaiFile.search(".mp4") != -1 || data.result.dongTai.dongtaiFile.search(".MP4") != -1 || data.result.dongTai.dongtaiFile.search(".flv")  != -1 || data.result.dongTai.dongtaiFile.search(".mov")  != -1 ){
                        //视频--隐藏原始播放器
                        detailDongtaiStr += '<div class="page-bd-15" style="text-align: center;">';
                        detailDongtaiStr += '<img  src="'+ videoImagePath(data.result.dongTai.dongtaiFile)+'" id="fengmainimagebase64" style="width: 100%;">';
                        detailDongtaiStr += '</div>';


                    }else if( data.result.dongTai.dongtaiFile.search(".MP3") != -1 || data.result.dongTai.dongtaiFile.search(".mp3") != -1 || data.result.dongTai.dongtaiFile.search(".wav")  != -1 || data.result.dongTai.dongtaiFile.search(".ogg")  != -1 ){
                        //音频--隐藏原始播放器
                        detailDongtaiStr += '<div class="page-bd center bottom5" onclick=start("audiotest'+data.result.dongTai.id+'","'+checkPath(data.result.dongTai.dongtaiFile,'3')+'","shifenmiao'+data.result.dongTai.id+'","audiostartA'+data.result.dongTai.id+'","audioIconA'+data.result.dongTai.id+'")>';
                        detailDongtaiStr += '<div class="audio" style="margin: 0 auto;"  >';
                        detailDongtaiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon"  /></div>';
                        detailDongtaiStr += '<div  style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">长按二维码收听</div>';
                        detailDongtaiStr += '</div>';
                        detailDongtaiStr += '<div class="disnone"><audio  src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                        detailDongtaiStr += '</div>';
                    }else{
                        detailDongtaiStr += '<div class="page-bd center bottom5 alignleft" style="text-align: center;"><a href="'+ checkPath(data.result.dongTai.dongtaiFile,'3')+'" target="_blank">文件:'+getFileName(data.result.dongTai.dongtaiFile)+'</a></div>';
                    }

                }else if(data.result.dongTai.dongtaiType == '5' && data.result.dongTai.dongtaiFile != null){
                    //红包评论
                    detailDongtaiStr += '<div class="weui-feeds"><img onclick=toHongBaoDetail("'+data.result.dongTai.remarks+'","1");  width="173px" height="286px" src="'+ checkPath(data.result.dongTai.dongtaiFile,'1')+'"></div>';
                }
                $("#sharedongtaicontent").html(detailDongtaiStr);
                //getBase64ImageInServeice(checkPath(data.result.dongTai.dongtaiFile,'1'),"fengmainimagebase64");
                if(data.result.user != null) {
                    getBase64ImageInServeice(checkPath(data.result.user.headimgurl, "1"), "headimagebase64");
                }

            }else{
                var detailDongtaiStr = '';
                //判断如果是图片则展示图片
                if(data.result.dongTai.dongtaiType == '1' && data.result.dongTai.dongtaiFile != null){//图片
                    detailDongtaiStr += '<div class="weui-feeds"><ul>'+getImageDetailContent(data.result.dongTai.id,data.result.dongTai.dongtaiFile)+'</ul></div>';
                }else if(data.result.dongTai.dongtaiType == '2' && data.result.dongTai.dongtaiFile != null){//音频
                    //音频--隐藏原始播放器
                    //音频--隐藏原始播放器
                    detailDongtaiStr += '<div class="page-bd center bottom5"  onclick=start("audiotest'+data.result.dongTai.id+'","'+checkPath(data.result.dongTai.dongtaiFile,'3')+'","shifenmiao'+data.result.dongTai.id+'","audiostartA'+data.result.dongTai.id+'","audioIconA'+data.result.dongTai.id+'")>';
                    detailDongtaiStr += '<div class="audio" style="margin: 0 auto;"  >';
                    detailDongtaiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon" /></div>';
                    detailDongtaiStr += '<div style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">长按二维码收听</div>';
                    detailDongtaiStr += '</div>';
                    detailDongtaiStr += '<div class="disnone"><audio  src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                    detailDongtaiStr += '</div>';
                }else if(data.result.dongTai.dongtaiType == '3' && data.result.dongTai.dongtaiFile != null){//视频
                    <!--视频播放-->

                    //视频--隐藏原始播放器
                    detailDongtaiStr += '<div class="page-bd-15" style="text-align: center;">';
                    detailDongtaiStr += '<img  src="'+ videoImagePath(data.result.dongTai.dongtaiFile)+'" id="fengmainimagebase64" style="width: 100%;">';
                    detailDongtaiStr += '</div>';


                }else if(data.result.dongTai.dongtaiType == '4' && data.result.dongTai.dongtaiFile != null){//文件
                    //文件评论--判断文件类型展示不同的图片
                    if(data.result.dongTai.dongtaiFile.search(".jpeg") != -1 || data.result.dongTai.dongtaiFile.search(".jpg") != -1 || data.result.dongTai.dongtaiFile.search(".png") != -1 || data.result.dongTai.dongtaiFile.search(".gif") != -1 || data.result.dongTai.dongtaiFile.search(".GIF") != -1 ){
                        detailDongtaiStr += '<div class="weui-feeds"><ul>'+getImageContent(data.result.dongTai.id,data.result.dongTai.dongtaiFile)+'</ul></div>';
                    }else if( data.result.dongTai.dongtaiFile.search(".mp4") != -1 || data.result.dongTai.dongtaiFile.search(".MP4") != -1 || data.result.dongTai.dongtaiFile.search(".flv")  != -1 || data.result.dongTai.dongtaiFile.search(".mov")  != -1 ){
                        //视频--隐藏原始播放器
                        detailDongtaiStr += '<div class="page-bd-15" style="text-align: center;">';
                        detailDongtaiStr += '<img  src="'+ videoImagePath(data.result.dongTai.dongtaiFile)+'" id="fengmainimagebase64" style="width: 100%;">';
                        detailDongtaiStr += '</div>';


                    }else if( data.result.dongTai.dongtaiFile.search(".MP3") != -1 || data.result.dongTai.dongtaiFile.search(".mp3") != -1 || data.result.dongTai.dongtaiFile.search(".wav")  != -1 || data.result.dongTai.dongtaiFile.search(".ogg")  != -1 ){
                        //音频--隐藏原始播放器
                        detailDongtaiStr += '<div class="page-bd center bottom5"  onclick=start("audiotest'+data.result.dongTai.id+'","'+checkPath(data.result.dongTai.dongtaiFile,'3')+'","shifenmiao'+data.result.dongTai.id+'","audiostartA'+data.result.dongTai.id+'","audioIconA'+data.result.dongTai.id+'")>';
                        detailDongtaiStr += '<div class="audio" style="margin: 0 auto;"  >';
                        detailDongtaiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon" /></div>';
                        detailDongtaiStr += '<div  style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">长按二维码收听</div>';
                        detailDongtaiStr += '</div>';
                        detailDongtaiStr += '<div class="disnone"><audio  src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                        detailDongtaiStr += '</div>';
                    }else{
                        detailDongtaiStr += '<div class="page-bd center bottom5 alignleft" style="text-align: center;"><a href="'+ checkPath(data.result.dongTai.dongtaiFile,'3')+'" target="_blank">文件:'+getFileName(data.result.dongTai.dongtaiFile)+'</a></div>';
                    }

                }else if(data.result.dongTai.dongtaiType == '5' && data.result.dongTai.dongtaiFile != null){
                    //红包评论
                    detailDongtaiStr += '<div class="weui-feeds"><img onclick=toHongBaoDetail("'+data.result.dongTai.remarks+'","1");  width="173px" height="286px" src="'+ checkPath(data.result.dongTai.dongtaiFile,'1')+'"></div>';
                }
                $("#sharedongtaicontent").html(detailDongtaiStr);
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

//卡详情渲染
function detailKaRender(data){
    if(data.code == '0'){

        //

        viptips();


        $("title").html(data.result.xinYongKa.kaTitle);
        var detailcourseStr = '';
        detailcourseStr += '';

        detailcourseStr += '<div class="weui-c-content" >';
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
                detailcourseStr += '<div class="weui-news-infoitem"  onclick=toUserHome("' + data.result.xinYongKa.createBy.id + '","1")>';
                detailcourseStr += '<img src="' + checkPath(data.result.xinYongKa.createBy.headimgurl, '1') + '" class="img60 ">';
                detailcourseStr += '<span class="weui-news-left f-blue f16import">' + data.result.xinYongKa.createBy.nickname + '</span>';
                detailcourseStr += '</div>';
                detailcourseStr += '</span>';
                detailcourseStr += '<em class="weui-c-nickname">' + timeago(data.result.xinYongKa.createDate) + '</em>';
                detailcourseStr += '</div>';
                detailcourseStr += '</div>';
                detailcourseStr += '<div style="float: left;width: 30%;line-height: 40px;">';
                $("#guanzhuId").val(data.result.xinYongKa.createBy.id);
                detailcourseStr += '<div style="width: 100%;text-align: right;">';
                detailcourseStr += '<label class="weui-label-s b-orange  f-white f12"  id="bgguanzhu" onclick=saveNRguanzhu() style="padding: 0.2em; margin-left: 10px;background-color:#ef4f4f !important;border: 1px solid #ef4f4f !important;color: white !important;;"><i class="beauty icon-xiai f-white f16 " id="gz">关注</i></label>';
                detailcourseStr += '</div>';
                detailcourseStr += '</div>';
            }
        }

        detailcourseStr += '<div class="clear"></div>';

        detailcourseStr += '<div class="weui-comment-reply top00">';
        if(GetUrlString('share') == null && data.result.isHuiYuan == '1'){//是否是推广链接
            if( data.result.xinYongKa.isGaoyongjin == '1' ){
                if(data.result.xinYongKa.sharePricetype == '2'){
                    detailcourseStr += '<div class="nickname f-red">限时高佣金(会员):'+setNum(data.result.xinYongKa.gaoyongjinPrice)+'个点<span style="color:gray ;font-size: 12px;">['+formatDate(data.result.xinYongKa.gaoyongjinStart,format='MM-DD')+'至'+formatDate(data.result.xinYongKa.gaoyongjinEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">限时高佣金(会员)￥'+setNum(data.result.xinYongKa.gaoyongjinPrice)+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.xinYongKa.gaoyongjinStart,format='MM-DD')+'至'+formatDate(data.result.xinYongKa.gaoyongjinEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }
            }else{
                if(data.result.xinYongKa.sharePricetype == '2'){
                    detailcourseStr += '<div class="nickname f-red">会员佣金：'+setNum(data.result.xinYongKa.vipshareAgent)+'个点<span style="color:gray ;font-size: 12px;"></span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">会员佣金￥'+setNum(data.result.xinYongKa.vipshareAgent)+'  <span style="color:gray ;font-size: 12px;"></span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

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

        if((GetUrlString("share") == null || GetUrlString("share") == '' ) && data.result.isHuiYuan == '1'){
            detailcourseStr += '<p>'+setNULL(data.result.xinYongKa.kaSharecontent)+'</p>';
        }

        detailcourseStr += '<p>'+data.result.xinYongKa.kaContent+'</p>';




        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-tools">';
        detailcourseStr += '<a class="" onclick=zhuanfa("2","'+data.result.xinYongKa.id+'","'+data.result.xinYongKa.createBy.id+'","10");><i class="icon icon-5 weui-tabbar__icon" id="dashangicon"></i>转发</a>';
        /*
                detailcourseStr += '<a href="javascript:dashang();"><i class="icon icon-42 weui-tabbar__icon" id="dashangicon"></i>打赏('+setNum(data.result.dashangNum)+'次)</a>';
        */
        detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">'+setNum(data.result.xinYongKa.kaDianjiliang)+'</span></div>';
        var localhref = location.href;
        if(localhref.search('lly') == -1 ) {
            detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
            detailcourseStr += '<span  onclick=dianji("10","' + data.result.xinYongKa.id + '"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan' + data.result.xinYongKa.id + '">' + setNum(data.result.xinYongKa.kaZan) + '</span> </span>';
            detailcourseStr += '<span class="check checked disnone" onclick=openCommentList("commentDisList","2","1",10,"' + data.result.xinYongKa.id + '","10","' + data.result.xinYongKa.createBy.id + '");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">' + setNum(data.result.xinYongKa.commentNum) + '</span> </span>';

            detailcourseStr += '</div>';
        }
        detailcourseStr += '</div>';
        /*分享参数*/
        detailcourseStr += '<input type="hidden" id="id" value="'+data.result.xinYongKa.id+'">';
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
        //detailcourseStr += '<input type="hidden" id="tuone" value="'+data.result.xinYongKa.tuone+'">';
        //detailcourseStr += '<input type="hidden" id="tutwo" value="'+data.result.xinYongKa.tutwo+'">';
        //detailcourseStr += '<input type="hidden" id="tuthree" value="'+data.result.xinYongKa.tuthree+'">';

        if(data.result.xinYongKa.fabuStatus == '3'){
            $("#detailcourse").html(detailcourseStr);
        }else{
            $.toast("对不起，产品已下架！","text");

        }



        <!--购买-分享-->
        var detailcourseButtonStr = '';
        if(1==2 && GetUrlString("share") == null || GetUrlString("share") == ''){
            detailcourseButtonStr += '<div id="share">';
            detailcourseButtonStr += '<div class="fixedbtn21">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            if( data.result.xinYongKa.isGaoyongjin == '1' ){
                if(data.result.xinYongKa.sharePricetype == '2'){
                    detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">('+setNum(data.result.xinYongKa.gaoyongjinPrice)+'个点)</span></a>';

                }else{
                    detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">(￥'+setNum(data.result.xinYongKa.gaoyongjinPrice)+')</span></a>';

                }
            }else{
                if(data.result.xinYongKa.sharePricetype == '2'){
                    detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">('+setNum(data.result.xinYongKa.vipshareAgent)+'个点)</span></a>';
                }else{
                    detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">(￥'+setNum(data.result.xinYongKa.vipshareAgent)+')</span></a>';

                }

            }
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div class="fixedbtn22">';
            detailcourseButtonStr += '<a href="javascript:subapply();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去申请</a>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div class="fixedbtn23">';
            detailcourseButtonStr += '<a href="javascript:;" class="fenge">|</a>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '</div>';
        }else{
            /*detailcourseButtonStr += '<div id="share">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:subapply();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去申请</a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '</div>';*/
            var localhref = location.href;
            if(localhref.search('lly') == -1 ) {
                detailcourseButtonStr += '<div class="fixedbtn24 dibu1" >';

                detailcourseButtonStr += '<div class="dibu2" onclick=subapplyLx();>';
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-115 weui-tabbar__icon" id="iconshare"></i>去申请</a>';
                detailcourseButtonStr += '</div>';


                detailcourseButtonStr += '<div class="dibu3" >';
                detailcourseButtonStr += '<div onclick=openCommentList("commentDisList","2","1",10,"' + data.result.xinYongKa.id + '","10","' + data.result.xinYongKa.createBy.id + '"); class="dibu5">';

                if (setNum(data.result.xinYongKa.commentNum) > 0) {

                    detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"><span class="weui-badge" style="position: absolute;top: .25em;right: -.4em;">' + setNum(data.result.xinYongKa.commentNum) + '</span></i>';
                } else {
                    detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"></i>';
                }

                detailcourseButtonStr += '</div>';

                detailcourseButtonStr += '<div onclick=dianji("10","' + data.result.xinYongKa.id + '"); class="dibu5">';
                detailcourseButtonStr += '<i class="icon icon-65 weui-tabbar__icon" id="iconshare2"></i>';
                detailcourseButtonStr += '</div>';

               /* detailcourseButtonStr += '<div onclick=zhuanfa("2","' + data.result.xinYongKa.id + '","' + data.result.xinYongKa.createBy.id + '","10"); class="dibu5">';
                detailcourseButtonStr += '<i class="icon icon-103 weui-tabbar__icon" id="iconshare3"></i>';
                detailcourseButtonStr += '</div>';*/

                detailcourseButtonStr += '<div onclick=shareJiajia(); class="dibu5">';
                detailcourseButtonStr += '<i class="icon icon-41 weui-tabbar__icon" id="iconshare4"><span class="weui-badge" style="position: absolute;top: .25em;right: -1em;">赚</span></i>';
                detailcourseButtonStr += '</div>';

                detailcourseButtonStr += '</div>';
                detailcourseButtonStr += '</div>';
            }else{
                detailcourseButtonStr += '<div class="fixedbtn24 dibu1" >';
                detailcourseButtonStr += '<div class="dibu8" onclick=subapplyLx();>';
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-115 weui-tabbar__icon" id="iconshare"></i>去申请</a>';
                detailcourseButtonStr += '</div>';
                detailcourseButtonStr += '</div>';

            }

        }

        $("body").append(detailcourseButtonStr);


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
            sharecourseButtonStr += '<img src="' + checkPath(data.result.user.headimgurl, "1") + '" id="headimagebase64" height="25px" width="25px" style="border-radius: 5px;"/>';
        }
        sharecourseButtonStr += '</div>';*/


        sharecourseButtonStr += '<div style="width: 100%;text-align: center;height: 50px;">';

        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '</div>';



        $("body").prepend(sharecourseButtonStr);
        $(document).ready(function() {

            qrCode("qrcodeCanvas",baseUrlFrontDefault+"kadetail.html?id="+data.result.xinYongKa.id+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));
            localStorage.setItem("bgurl",localStorage.getItem("sharetuiguang"));
            /*var url = Canvas2Image.convertToPNG($("canvas")[0],100,100).getAttribute('src');
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

//贷款详情渲染
function detailDaikuanRender(data){
    if(data.code == '0'){
        viptips();
        $("title").html(data.result.daiKuan.daikuanTitle);
        var detailcourseStr = '';
        detailcourseStr += '';

        detailcourseStr += '<div class="weui-c-content" >';
        detailcourseStr += '<h2 class="weui-c-title bottom5">'+data.result.daiKuan.daikuanTitle+'</h2>';
        if((GetUrlString("share") == null || GetUrlString("share") == '') && data.result.isHuiYuan == '1') {
            detailcourseStr += '<h2 class="bottom5 f14 f-red">' + setNULL(data.result.daiKuan.daikuanSharetitle) + '</h2>';
        }
        if(getSaasId() == '0') {
            var localhref = location.href;
            if (localhref.search('lly') == -1) {
                detailcourseStr += '<div class="weui-c-meta bottom5" style="float: left;width: 70%;">';
                detailcourseStr += '<div class="weui-c-meta bottom5">';
                detailcourseStr += '<span class="weui-c-nickname">';
                detailcourseStr += '<div class="weui-news-infoitem"  onclick=toUserHome("' + data.result.daiKuan.createBy.id + '","1")>';
                detailcourseStr += '<img src="' + checkPath(data.result.daiKuan.createBy.headimgurl, '1') + '" class="weui-news-round">';
                detailcourseStr += '<span class="weui-news-left f-blue f16import">' + data.result.daiKuan.createBy.nickname + '</span>';
                detailcourseStr += '</div>';
                detailcourseStr += '</span>';
                detailcourseStr += '<em class="weui-c-nickname">' + timeago(data.result.daiKuan.createDate) + '</em>';
                detailcourseStr += '</div>';
                detailcourseStr += '</div>';
                detailcourseStr += '<div style="float: left;width: 30%;line-height: 40px;">';
                $("#guanzhuId").val(data.result.daiKuan.createBy.id);
                detailcourseStr += '<div style="width: 100%;text-align: right;">';
                detailcourseStr += '<label class="weui-label-s b-orange  f-white f12"  id="bgguanzhu" onclick=saveNRguanzhu() style="padding: 0.2em; margin-left: 10px;background-color:#ef4f4f !important;border: 1px solid #ef4f4f !important;color: white !important;;"><i class="beauty icon-xiai f-white f16 " id="gz">关注</i></label>';
                detailcourseStr += '</div>';
                detailcourseStr += '</div>';
            }
        }

        detailcourseStr += '<div class="clear"></div>';
        detailcourseStr += '<div class="weui-comment-reply top00">';
        if(GetUrlString('share') == null  && data.result.isHuiYuan == '1'){//是否是推广链接
            if( data.result.daiKuan.isGaoyongjin == '1' ){
                if(data.result.daiKuan.sharePricetype == '2'){
                    detailcourseStr += '<div class="nickname f-red">限时高佣金(会员):'+setNum(data.result.daiKuan.gaoyongjinPrice)+'个点<span style="color:gray ;font-size: 12px;">['+formatDate(data.result.daiKuan.gaoyongjinStart,format='MM-DD')+'至'+formatDate(data.result.daiKuan.gaoyongjinEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">限时高佣金(会员)￥'+setNum(data.result.daiKuan.gaoyongjinPrice)+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.daiKuan.gaoyongjinStart,format='MM-DD')+'至'+formatDate(data.result.daiKuan.gaoyongjinEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }
            }else{
                if(data.result.daiKuan.sharePricetype == '2'){
                    detailcourseStr += '<div class="nickname f-red">会员佣金：'+setNum(data.result.daiKuan.vipshareAgent)+'个点<span style="color:gray ;font-size: 12px;"></span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">会员佣金￥'+setNum(data.result.daiKuan.vipshareAgent)+'  <span style="color:gray ;font-size: 12px;"></span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }

            }
        }


        //detailcourseStr += '<p class="time subtext">'+data.result.daiKuan.daikuanLabel+'</p>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-article">';

        //标签集合

        $("#buyandshare").hide();
        $("#share").show();

        /*if(data.result.daiKuan.daikuanImage != null){
            detailcourseStr += '<img src="'+ checkPath(data.result.daiKuan.daikuanImage,'1')+'" >';
        }*/


        detailcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
        if(data.result.daiKuan.isZiying != null && data.result.daiKuan.isZiying != ''){
            if(data.result.daiKuan.isZiying == '1'){
                detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
            }

        }

        if((GetUrlString("share") == null || GetUrlString("share") == '') && data.result.isHuiYuan == '1' ){
            if(data.result.daiKuan.daikuanJiesuan != null && data.result.daiKuan.daikuanJiesuan != ''){
                detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.daiKuan.daikuanJiesuan+'</label>';
            }
        }
        if(data.result.daiKuan.kaTongguolv != null && data.result.daiKuan.kaTongguolv != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">通过率:'+data.result.daiKuan.kaTongguolv+'</label>';
        }
        if(data.result.daiKuan.daikuanLabel != null && data.result.daiKuan.daikuanLabel != '' ){
            var str = data.result.daiKuan.daikuanLabel; //这是一字符串
            var strs= new Array(); //定义一数组
            strs=str.split("/"); //字符分割
            for (i=0;i<strs.length ;i++ )
            {
                detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
            }

        }


        if(data.result.daiKuan.daikuanLilv != null && data.result.daiKuan.daikuanLilv != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">利率:'+data.result.daiKuan.daikuanLilv+'</label>';
        }
        if(data.result.daiKuan.daikuanEdu != null && data.result.daiKuan.daikuanEdu != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">额度范围:'+data.result.daiKuan.daikuanEdu+'</label>';
        }
        if(data.result.daiKuan.daikuanQixian != null && data.result.daiKuan.daikuanQixian != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">贷款期限:'+data.result.daiKuan.daikuanQixian+'</label>';
        }

        if(data.result.daiKuan.fangkuanShijain != null && data.result.daiKuan.fangkuanShijain != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">放款时间:'+data.result.daiKuan.fangkuanShijain+'</label>';
        }
        if(data.result.daiKuan.shenheFangshi != null && data.result.daiKuan.shenheFangshi != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">审核方式:'+data.result.daiKuan.shenheFangshi+'</label>';
        }

        if(data.result.daiKuan.daozhangFangshi != null && data.result.daiKuan.daozhangFangshi != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">到账方式:'+data.result.daiKuan.daozhangFangshi+'</label>';
        }
        if(data.result.daiKuan.isZhengxin != null && data.result.daiKuan.isZhengxin != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">是否需要征信:'+data.result.daiKuan.isZhengxin+'</label>';
        }

        detailcourseStr += '</div>';

        if((GetUrlString("share") == null || GetUrlString("share") == '') && data.result.isHuiYuan == '1' ){
            detailcourseStr += '<p>'+setNULL(data.result.daiKuan.daikuanSharecontent)+'</p>';
        }

        detailcourseStr += '<p>'+data.result.daiKuan.daikuanContent+'</p>';




        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-tools">';
        detailcourseStr += '<a class="" onclick=zhuanfa("2","'+data.result.daiKuan.id+'","'+data.result.daiKuan.createBy.id+'","11");><i class="icon icon-5 weui-tabbar__icon" id="dashangicon"></i>转发</a>';
        /*
                detailcourseStr += '<a href="javascript:dashang();"><i class="icon icon-42 weui-tabbar__icon" id="dashangicon"></i>打赏('+setNum(data.result.dashangNum)+'次)</a>';
        */
        detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">'+setNum(data.result.daiKuan.kaDianjiliang)+'</span></div>';

        var localhref = location.href;
        if(localhref.search('lly') == -1 ) {
            detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
            detailcourseStr += '<span  onclick=dianji("11","' + data.result.daiKuan.id + '"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan' + data.result.daiKuan.id + '">' + setNum(data.result.daiKuan.daikuanZan) + '</span> </span>';
            detailcourseStr += '<span class="check checked disnone" onclick=openCommentList("commentDisList","2","1",10,"' + data.result.daiKuan.id + '","11","' + data.result.daiKuan.createBy.id + '");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">' + setNum(data.result.daiKuan.commentNum) + '</span> </span>';
            detailcourseStr += '</div>';
        }
        detailcourseStr += '</div>';
        /*分享参数*/
        detailcourseStr += '<input type="hidden" id="id" value="'+data.result.daiKuan.id+'">';
        detailcourseStr += '<input type="hidden" id="shareType" value="10">';
        detailcourseStr += '<input type="hidden" id="shareTitle" value="'+data.result.daiKuan.daikuanTitle+'">';
        detailcourseStr += '<input type="hidden" id="applyurl" value="'+data.result.daiKuan.daikuanLink+'">';

        //判断-默认LOGO
        detailcourseStr += '<input type="hidden" id="shareImage" value="'+checkPath(data.result.daiKuan.daikuanImage,'1')+'">';


        detailcourseStr += '<input type="hidden" id="orderMoney" value="0.01">';
        detailcourseStr += '<input type="hidden" id="orderNum" value="1">';
        detailcourseStr += '<input type="hidden" id="orderType" value="16">';
        detailcourseStr += '<input type="hidden" id="orderDashangType" value="0">';
        detailcourseStr += '<input type="hidden" id="orderTitle" value="'+data.result.daiKuan.daikuanTitle+'">';
        detailcourseStr += '<input type="hidden" id="orderAboutid" value="'+data.result.daiKuan.id+'">';

        if(data.result.daiKuan.fabuStatus == '3'){
            $("#detailcourse").html(detailcourseStr);
        }else{
            $.toast("对不起，产品已下架！","text");
        }



        <!--购买文章-分享-->
        var detailcourseButtonStr = '';
        if(1==2 && GetUrlString("share") == null || GetUrlString("share") == ''){
            detailcourseButtonStr += '<div id="share">';
            detailcourseButtonStr += '<div class="fixedbtn21">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            if( data.result.daiKuan.isGaoyongjin == '1' ){
                if(data.result.daiKuan.sharePricetype == '2'){
                    detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">('+setNum(data.result.daiKuan.gaoyongjinPrice)+'个点)</span></a>';

                }else{
                    detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">(￥'+setNum(data.result.daiKuan.gaoyongjinPrice)+')</span></a>';

                }
            }else{
                if(data.result.daiKuan.sharePricetype == '2'){
                    detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">('+setNum(data.result.daiKuan.vipshareAgent)+'个点)</span></a>';
                }else{
                    detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">(￥'+setNum(data.result.daiKuan.vipshareAgent)+')</span></a>';

                }

            }


            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div class="fixedbtn22">';
            detailcourseButtonStr += '<a href="javascript:subapply();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去申请</a>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div class="fixedbtn23">';
            detailcourseButtonStr += '<a href="javascript:;" class="fenge">|</a>';
            detailcourseButtonStr += '</div>';


            detailcourseButtonStr += '</div>';
        }else{
            /*detailcourseButtonStr += '<div id="share">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:subapply();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去申请</a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '</div>';*/
            var localhref = location.href;
            if(localhref.search('lly') == -1 ){
                detailcourseButtonStr += '<div class="fixedbtn24 dibu1" >';

                detailcourseButtonStr += '<div class="dibu2" onclick=subapply();>';
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-115 weui-tabbar__icon" id="iconshare"></i>去申请</a>';
                detailcourseButtonStr += '</div>';



                detailcourseButtonStr += '<div class="dibu3" >';
                detailcourseButtonStr += '<div onclick=openCommentList("commentDisList","2","1",10,"'+data.result.daiKuan.id+'","11","'+data.result.daiKuan.createBy.id+'"); class="dibu5">';

                if(setNum(data.result.daiKuan.commentNum) > 0){

                    detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"><span class="weui-badge" style="position: absolute;top: .25em;right: -.4em;">'+setNum(data.result.daiKuan.commentNum)+'</span></i>';
                }else{
                    detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"></i>';
                }

                detailcourseButtonStr += '</div>';

                detailcourseButtonStr += '<div onclick=dianji("11","'+data.result.daiKuan.id+'"); class="dibu5">';
                detailcourseButtonStr += '<i class="icon icon-65 weui-tabbar__icon" id="iconshare2"></i>';
                detailcourseButtonStr += '</div>';

              /*  detailcourseButtonStr += '<div onclick=zhuanfa("2","'+data.result.daiKuan.id+'","'+data.result.daiKuan.createBy.id+'","11"); class="dibu5">';
                detailcourseButtonStr += '<i class="icon icon-103 weui-tabbar__icon" id="iconshare3"></i>';
                detailcourseButtonStr += '</div>';*/

                detailcourseButtonStr += '<div onclick=shareJiajia(); class="dibu5">';
                detailcourseButtonStr += '<i class="icon icon-41 weui-tabbar__icon" id="iconshare4"><span class="weui-badge" style="position: absolute;top: .25em;right: -1em;">赚</span></i>';
                detailcourseButtonStr += '</div>';

                detailcourseButtonStr += '</div>';
                detailcourseButtonStr += '</div>';

            }else{
                detailcourseButtonStr += '<div class="fixedbtn24 dibu1" >';
                detailcourseButtonStr += '<div class="dibu8" onclick=subapply();>';
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-115 weui-tabbar__icon" id="iconshare"></i>去申请</a>';
                detailcourseButtonStr += '</div>';
                detailcourseButtonStr += '</div>';
            }


        }

        $("body").append(detailcourseButtonStr);




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

      /*  sharecourseButtonStr += '<div style="width: 100%;text-align: center;margin-top: -70px;">';
        if(data.result.user != null) {
            sharecourseButtonStr += '<img src="' + checkPath(data.result.user.headimgurl, "1") + '" id="headimagebase64" height="25px" width="25px" style="border-radius: 5px;"/>';
        }
        sharecourseButtonStr += '</div>';*/


        sharecourseButtonStr += '<div style="width: 100%;text-align: center;height: 50px;">';

        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '</div>';




        $("body").prepend(sharecourseButtonStr);
        $(document).ready(function() {

            qrCode("qrcodeCanvas",baseUrlFrontDefault+"daikuandetail.html?id="+data.result.daiKuan.id+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));
            localStorage.setItem("bgurl",localStorage.getItem("sharetuiguang"));
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

//保险详情渲染
function detailBaoxianRender(data){
    if(data.code == '0'){
        $("title").html(data.result.baoxian.baoxianTitle);
        var detailcourseStr = '';
        detailcourseStr += '';

        detailcourseStr += '<div class="weui-c-content" >';
        detailcourseStr += '<h2 class="weui-c-title bottom5">'+data.result.baoxian.baoxianTitle+'</h2>';
        if((GetUrlString("share") == null || GetUrlString("share") == '') && data.result.isHuiYuan == '1') {
            detailcourseStr += '<h2 class="bottom5 f14 f-red">' + setNULL(data.result.baoxian.baoxianSharetitle) + '</h2>';
        }

        detailcourseStr += '<div class="weui-c-meta bottom5" style="float: left;width: 70%;">';
        detailcourseStr += '<div class="weui-c-meta bottom5">';
        detailcourseStr += '<span class="weui-c-nickname">';
        detailcourseStr += '<div class="weui-news-infoitem"  onclick=toUserHome("'+data.result.baoxian.createBy.id+'","1")>';
        detailcourseStr += '<img src="'+ checkPath(data.result.baoxian.createBy.headimgurl,'1')+'" class="weui-news-round">';
        detailcourseStr += '<span class="weui-news-left f-blue f16import">'+data.result.baoxian.createBy.nickname+'</span>';
        detailcourseStr += '</div>';
        detailcourseStr += '</span>';
        detailcourseStr += '<em class="weui-c-nickname">'+timeago(data.result.baoxian.createDate)+'</em>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '<div style="float: left;width: 30%;line-height: 40px;">';
        $("#guanzhuId").val(data.result.baoxian.createBy.id);
        detailcourseStr += '<div style="width: 100%;text-align: right;">';
        detailcourseStr += '<label class="weui-label-s b-orange  f-white f12"  id="bgguanzhu" onclick=saveNRguanzhu() style="padding: 0.2em; margin-left: 10px;background-color:#ef4f4f ;border: 1px solid #ef4f4f;color: white !important;;"><i class="beauty icon-xiai f-white f16 " id="gz">关注</i></label>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '<div class="clear"></div>';
        detailcourseStr += '<div class="weui-comment-reply top00">';
        if(GetUrlString('share') == null  && data.result.isHuiYuan == '1' ){//是否是推广链接
            if( data.result.baoxian.isGaoyongjin == '1' ){
                if(data.result.baoxian.sharePricetype == '2'){
                    detailcourseStr += '<div class="nickname f-red">限时高佣金(会员):'+setNum(data.result.baoxian.gaoyongjinPrice)+'个点<span style="color:gray ;font-size: 12px;">['+formatDate(data.result.baoxian.gaoyongjinStart,format='MM-DD')+'至'+formatDate(data.result.baoxian.gaoyongjinEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">限时高佣金(会员)￥'+setNum(data.result.baoxian.gaoyongjinPrice)+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.baoxian.gaoyongjinStart,format='MM-DD')+'至'+formatDate(data.result.baoxian.gaoyongjinEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }
            }else{
                if(data.result.baoxian.sharePricetype == '2'){
                    detailcourseStr += '<div class="nickname f-red">会员佣金：'+setNum(data.result.baoxian.vipshareAgent)+'个点<span style="color:gray ;font-size: 12px;"></span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">会员佣金￥'+setNum(data.result.baoxian.vipshareAgent)+'  <span style="color:gray ;font-size: 12px;"></span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }

            }
        }


        //detailcourseStr += '<p class="time subtext">'+data.result.baoxian.baoxianLabel+'</p>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-article">';

        //标签集合

        $("#buyandshare").hide();
        $("#share").show();

        /*if(data.result.baoxian.baoxianImage != null){
            detailcourseStr += '<img src="'+ checkPath(data.result.baoxian.baoxianImage,'1')+'" >';
        }*/


        detailcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
        if(data.result.baoxian.isZiying != null && data.result.baoxian.isZiying != ''){
            if(data.result.baoxian.isZiying == '1'){
                detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
            }

        }

        if((GetUrlString("share") == null || GetUrlString("share") == '') && data.result.isHuiYuan == '1' ){
            if(data.result.baoxian.baoxianJiesuan != null && data.result.baoxian.baoxianJiesuan != ''){
                detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.baoxian.baoxianJiesuan+'</label>';
            }
        }
        if(data.result.baoxian.kaTongguolv != null && data.result.baoxian.kaTongguolv != '' ){
            detailcourseStr += '<label class="label f-red b-red  f13">通过率:'+data.result.baoxian.kaTongguolv+'</label>';
        }
        if(data.result.baoxian.baoxianLabel != null && data.result.baoxian.baoxianLabel != ''){
            var str = data.result.baoxian.baoxianLabel; //这是一字符串
            var strs= new Array(); //定义一数组
            strs=str.split("/"); //字符分割
            for (i=0;i<strs.length ;i++ )
            {
                detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
            }

        }


        if(data.result.baoxian.baoxianZuidijine != null && data.result.baoxian.baoxianZuidijine != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">投保最低金额:'+data.result.baoxian.baoxianZuidijine+'</label>';
        }
        if(data.result.baoxian.baoxianJinefanwei != null && data.result.baoxian.baoxianJinefanwei != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">投保金额范围:'+data.result.baoxian.baoxianJinefanwei+'</label>';
        }
        if(data.result.baoxian.baoxianNianling != null && data.result.baoxian.baoxianNianling != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">投保年龄:'+data.result.baoxian.baoxianNianling+'</label>';
        }

        if(data.result.baoxian.baoxianEdu != null && data.result.baoxian.baoxianEdu != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">保障额度:'+data.result.baoxian.baoxianEdu+'</label>';
        }
        if(data.result.baoxian.baoxianQixian != null && data.result.baoxian.baoxianQixian != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">保障期限:'+data.result.baoxian.baoxianQixian+'</label>';
        }

        if(data.result.baoxian.baoxianJiaofei != null && data.result.baoxian.baoxianJiaofei != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">缴费方式:'+data.result.baoxian.baoxianJiaofei+'</label>';
        }


        detailcourseStr += '</div>';

        if((GetUrlString("share") == null || GetUrlString("share") == '' ) && data.result.isHuiYuan == '1'){
            detailcourseStr += '<p>'+setNULL(data.result.baoxian.baoxianSharecontent)+'</p>';
        }

        detailcourseStr += '<p>'+data.result.baoxian.baoxianContent+'</p>';




        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-tools">';
        detailcourseStr += '<a class="" onclick=zhuanfa("2","'+data.result.baoxian.id+'","'+data.result.baoxian.createBy.id+'","12");><i class="icon icon-5 weui-tabbar__icon" id="dashangicon"></i>转发</a>';
        /*
                detailcourseStr += '<a href="javascript:dashang();"><i class="icon icon-42 weui-tabbar__icon" id="dashangicon"></i>打赏('+setNum(data.result.dashangNum)+'次)</a>';
        */
        detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">'+setNum(data.result.baoxian.baoxianDianjiliang)+'</span></div>';
        detailcourseStr += '<div  class="weui-comment-li" style="float: right;">';
        detailcourseStr += '<span  onclick=dianji("12","'+data.result.baoxian.id+'"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan'+data.result.baoxian.id+'">'+setNum(data.result.baoxian.baoxianZan)+'</span> </span>';
        detailcourseStr += '<span class="check checked disnone" onclick=openCommentList("commentDisList","2","1",10,"'+data.result.baoxian.id+'","12","'+data.result.baoxian.createBy.id+'");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">'+setNum(data.result.baoxian.commentNum)+'</span> </span>';

        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        /*分享参数*/
        detailcourseStr += '<input type="hidden" id="id" value="'+data.result.baoxian.id+'">';
        detailcourseStr += '<input type="hidden" id="shareType" value="11">';
        detailcourseStr += '<input type="hidden" id="shareTitle" value="'+data.result.baoxian.baoxianTitle+'">';
        detailcourseStr += '<input type="hidden" id="applyurl" value="'+data.result.baoxian.baoxianLink+'">';

        //判断-默认LOGO
        detailcourseStr += '<input type="hidden" id="shareImage" value="'+checkPath(data.result.baoxian.baoxianImage,'1')+'">';


        detailcourseStr += '<input type="hidden" id="orderMoney" value="0.01">';
        detailcourseStr += '<input type="hidden" id="orderNum" value="1">';
        detailcourseStr += '<input type="hidden" id="orderType" value="17">';
        detailcourseStr += '<input type="hidden" id="orderDashangType" value="0">';
        detailcourseStr += '<input type="hidden" id="orderTitle" value="'+data.result.baoxian.baoxianTitle+'">';
        detailcourseStr += '<input type="hidden" id="orderAboutid" value="'+data.result.baoxian.id+'">';


        $("#detailcourse").html(detailcourseStr);


        <!--购买文章-分享-->
        var detailcourseButtonStr = '';
        if(1==2 && GetUrlString("share") == null || GetUrlString("share") == ''){
            detailcourseButtonStr += '<div id="share">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            if( data.result.baoxian.isGaoyongjin == '1' ){
                if(data.result.baoxian.sharePricetype == '2'){
                    detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">('+setNum(data.result.baoxian.gaoyongjinPrice)+'个点)</span></a>';

                }else{
                    detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">(￥'+setNum(data.result.baoxian.gaoyongjinPrice)+')</span></a>';

                }
            }else{
                if(data.result.baoxian.sharePricetype == '2'){
                    detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">('+setNum(data.result.baoxian.vipshareAgent)+'个点)</span></a>';
                }else{
                    detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">(￥'+setNum(data.result.baoxian.vipshareAgent)+')</span></a>';

                }

            }


            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div class="fixedbtn22">';
            detailcourseButtonStr += '<a href="javascript:subapply();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去申请</a>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div class="fixedbtn23">';
            detailcourseButtonStr += '<a href="javascript:;" class="fenge">|</a>';
            detailcourseButtonStr += '</div>';


            detailcourseButtonStr += '</div>';
        }else{
            /*detailcourseButtonStr += '<div id="share">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:subapply();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去申请</a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '</div>';*/

            detailcourseButtonStr += '<div class="fixedbtn24 dibu1" >';

            detailcourseButtonStr += '<div class="dibu2" onclick=subapply();>';
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-115 weui-tabbar__icon" id="iconshare"></i>去申请</a>';
            detailcourseButtonStr += '</div>';



            detailcourseButtonStr += '<div class="dibu3" >';
            detailcourseButtonStr += '<div onclick=openCommentList("commentDisList","2","1",10,"'+data.result.baoxian.id+'","12","'+data.result.baoxian.createBy.id+'"); class="dibu5">';

            if(setNum(data.result.baoxian.commentNum) > 0){

                detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"><span class="weui-badge" style="position: absolute;top: .25em;right: -.4em;">'+setNum(data.result.baoxian.commentNum)+'</span></i>';
            }else{
                detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"></i>';
            }

            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div onclick=dianji("12","'+data.result.baoxian.id+'"); class="dibu5">';
            detailcourseButtonStr += '<i class="icon icon-65 weui-tabbar__icon" id="iconshare2"></i>';
            detailcourseButtonStr += '</div>';

          /*  detailcourseButtonStr += '<div onclick=zhuanfa("2","'+data.result.baoxian.id+'","'+data.result.baoxian.createBy.id+'","12"); class="dibu5">';
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




        sharecourseButtonStr += '<div id="sharecontent" class="disnone" style="width: 100%;margin-bottom: 50px;background-image: url(../../img/agent/images/bg.png);background-repeat:no-repeat;background-size:cover;">';
        /* sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
         sharecourseButtonStr += '<span class="weui-loadmore__tips">封面</span>';
         sharecourseButtonStr += '</div>';*/

        sharecourseButtonStr += '<div class="page-bd-15 " style="text-align: center;">';
        sharecourseButtonStr += '<img class="getgold_top_head_img"  src="'+ checkPath(data.result.baoxian.baoxianImage,'1')+'" id="fengmainimagebase64" style="margin-top: 40px;height: 1px;width: 1px;border-radius:50%;">';
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

    /*    sharecourseButtonStr += '<div style="width: 100%;text-align: center;margin-top: -70px;">';
        if(data.result.user != null) {
            sharecourseButtonStr += '<img src="' + checkPath(data.result.user.headimgurl, "1") + '" id="headimagebase64" height="25px" width="25px" style="border-radius: 5px;"/>';
        }
        sharecourseButtonStr += '</div>';*/


        sharecourseButtonStr += '<div style="width: 100%;text-align: center;height: 50px;">';

        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '</div>';




        $("body").prepend(sharecourseButtonStr);
        $(document).ready(function() {

            qrCode("qrcodeCanvas",baseUrlFrontDefault+"baoxiandetail.html?id="+data.result.baoxian.id+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));
            localStorage.setItem("bgurl",localStorage.getItem("sharetuiguang"));
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
                getBase64ImageInServeice(checkPath(data.result.baoxian.baoxianImage,'1'),"fengmainimagebase64");
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

//基金详情渲染
function detailJijinRender(data){
    if(data.code == '0'){
        $("title").html(data.result.jiJin.baoxianTitle);
        var detailcourseStr = '';
        detailcourseStr += '';

        detailcourseStr += '<div class="weui-c-content" >';
        detailcourseStr += '<h2 class="weui-c-title bottom5">'+data.result.jiJin.jijinTitle+'</h2>';
        if((GetUrlString("share") == null || GetUrlString("share") == '') && data.result.isHuiYuan == '1') {
            detailcourseStr += '<h2 class="bottom5 f14 f-red">' + setNULL(data.result.jiJin.jijinSharetitle) + '</h2>';
        }

        detailcourseStr += '<div class="weui-c-meta bottom5" style="float: left;width: 70%;">';
        detailcourseStr += '<div class="weui-c-meta bottom5">';
        detailcourseStr += '<span class="weui-c-nickname">';
        detailcourseStr += '<div class="weui-news-infoitem"  onclick=toUserHome("'+data.result.jiJin.createBy.id+'","1")>';
        detailcourseStr += '<img src="'+ checkPath(data.result.jiJin.createBy.headimgurl,'1')+'" class="weui-news-round">';
        detailcourseStr += '<span class="weui-news-left f-blue f16import">'+data.result.jiJin.createBy.nickname+'</span>';
        detailcourseStr += '</div>';
        detailcourseStr += '</span>';
        detailcourseStr += '<em class="weui-c-nickname">'+timeago(data.result.jiJin.createDate)+'</em>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '<div style="float: left;width: 30%;line-height: 40px;">';
        $("#guanzhuId").val(data.result.jiJin.createBy.id);
        detailcourseStr += '<div style="width: 100%;text-align: right;">';
        detailcourseStr += '<label class="weui-label-s b-orange  f-white f12"  id="bgguanzhu" onclick=saveNRguanzhu() style="padding: 0.2em; margin-left: 10px;background-color:#ef4f4f !important;border: 1px solid #ef4f4f !important;color: white !important;;"><i class="beauty icon-xiai f-white f16 " id="gz">关注</i></label>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '<div class="clear"></div>';
        detailcourseStr += '<div class="weui-comment-reply top00">';
        if(GetUrlString('share') == null  && data.result.isHuiYuan == '1'){//是否是推广链接
            if( data.result.jiJin.isGaoyongjin == '1' ){
                if(data.result.jiJin.sharePricetype == '2'){
                    detailcourseStr += '<div class="nickname f-red">限时高佣金(会员):'+setNum(data.result.jiJin.gaoyongjinPrice)+'个点<span style="color:gray ;font-size: 12px;">['+formatDate(data.result.jiJin.gaoyongjinStart,format='MM-DD')+'至'+formatDate(data.result.jiJin.gaoyongjinEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">限时高佣金(会员)￥'+setNum(data.result.jiJin.gaoyongjinPrice)+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.jiJin.gaoyongjinStart,format='MM-DD')+'至'+formatDate(data.result.jiJin.gaoyongjinEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }
            }else{
                if(data.result.jiJin.sharePricetype == '2'){
                    detailcourseStr += '<div class="nickname f-red">会员佣金：'+setNum(data.result.jiJin.vipshareAgent)+'个点<span style="color:gray ;font-size: 12px;"></span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red">会员佣金￥'+setNum(data.result.jiJin.vipshareAgent)+'  <span style="color:gray ;font-size: 12px;"></span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';

                }

            }
        }


        //detailcourseStr += '<p class="time subtext">'+data.result.jiJin.jijinLabel+'</p>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-article">';

        //标签集合

        $("#buyandshare").hide();
        $("#share").show();

        /*if(data.result.jiJin.jijinImage != null){
            detailcourseStr += '<img src="'+ checkPath(data.result.jiJin.jijinImage,'1')+'" >';
        }*/


        detailcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
        if(data.result.jiJin.isZiying != null && data.result.jiJin.isZiying != ''){
            if(data.result.jiJin.isZiying == '1'){
                detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
            }

        }

        if((GetUrlString("share") == null || GetUrlString("share") == '') && data.result.isHuiYuan == '1' ){
            if(data.result.jiJin.jijinJiesuan != null && data.result.jiJin.jijinJiesuan != ''){
                detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.jiJin.jijinJiesuan+'</label>';
            }
        }
        if(data.result.jiJin.kaTongguolv != null && data.result.jiJin.kaTongguolv != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">通过率:'+data.result.jiJin.kaTongguolv+'</label>';
        }
        if(data.result.jiJin.jijinLabel != null && data.result.jiJin.jijinLabel != ''){
            var str = data.result.jiJin.jijinLabel; //这是一字符串
            var strs= new Array(); //定义一数组
            strs=str.split("/"); //字符分割
            for (i=0;i<strs.length ;i++ )
            {
                detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
            }

        }


        if(data.result.jiJin.jijinShouyilv != null && data.result.jiJin.jijinShouyilv != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">收益率:'+data.result.jiJin.jijinShouyilv+'</label>';
        }
        if(data.result.jiJin.jijinFenlei != null && data.result.jiJin.jijinFenlei != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">'+data.result.jiJin.jijinFenlei+'</label>';
        }
        if(data.result.jiJin.jijinTousziqixian != null && data.result.jiJin.jijinTousziqixian != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">投资期限:'+data.result.jiJin.jijinTousziqixian+'</label>';
        }
        if(data.result.jiJin.jijinGuimo != null && data.result.jiJin.jijinGuimo != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">基金规模:'+data.result.jiJin.jijinGuimo+'</label>';
        }

        if(data.result.jiJin.jijinFengxian != null && data.result.jiJin.jijinFengxian != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">风险等级:'+data.result.jiJin.jijinFengxian+'</label>';
        }
        if(data.result.jiJin.jijinMianzhi != null && data.result.jiJin.jijinMianzhi != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">发行面值:'+data.result.jiJin.jijinMianzhi+'</label>';
        }

        if(data.result.jiJin.jijinJixifangshi != null && data.result.jiJin.jijinJixifangshi != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">计息方式:'+data.result.jiJin.jijinJixifangshi+'</label>';
        }

        if(data.result.jiJin.jijinQigoujine != null && data.result.jiJin.jijinQigoujine != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">起购金额:'+data.result.jiJin.jijinQigoujine+'</label>';
        }

        if(data.result.jiJin.jijinChenglishijain != null && data.result.jiJin.jijinChenglishijain != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">成立时间:'+data.result.jiJin.jijinChenglishijain+'</label>';
        }

        if(data.result.jiJin.jijinSimu != null && data.result.jiJin.jijinSimu != ''){
            detailcourseStr += '<label class="label f-red b-red  f13">私募基金:'+data.result.jiJin.jijinSimu+'</label>';
        }


        detailcourseStr += '</div>';

        if((GetUrlString("share") == null || GetUrlString("share") == '' ) && data.result.isHuiYuan == '1'){
            detailcourseStr += '<p>'+setNULL(data.result.jiJin.jijinSharecontent)+'</p>';
        }

        detailcourseStr += '<p>'+data.result.jiJin.jijinContent+'</p>';




        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-tools">';
        detailcourseStr += '<a class="" onclick=zhuanfa("2","'+data.result.jiJin.id+'","'+data.result.jiJin.createBy.id+'","13");><i class="icon icon-5 weui-tabbar__icon" id="dashangicon"></i>转发</a>';
        /*
                detailcourseStr += '<a href="javascript:dashang();"><i class="icon icon-42 weui-tabbar__icon" id="dashangicon"></i>打赏('+setNum(data.result.dashangNum)+'次)</a>';
        */
        detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">'+setNum(data.result.jiJin.jijinDianjiliang)+'</span></div>';
        detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
        detailcourseStr += '<span  onclick=dianji("13","'+data.result.jiJin.id+'"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan'+data.result.jiJin.id+'">'+setNum(data.result.jiJin.jijinZan)+'</span> </span>';
        detailcourseStr += '<span class="check checked disnone" onclick=openCommentList("commentDisList","2","1",10,"'+data.result.jiJin.id+'","13","'+data.result.jiJin.createBy.id+'");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">'+setNum(data.result.jiJin.commentNum)+'</span> </span>';

        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        /*分享参数*/
        detailcourseStr += '<input type="hidden" id="id" value="'+data.result.jiJin.id+'">';
        detailcourseStr += '<input type="hidden" id="shareType" value="12">';
        detailcourseStr += '<input type="hidden" id="shareTitle" value="'+data.result.jiJin.jijinTitle+'">';
        detailcourseStr += '<input type="hidden" id="applyurl" value="'+data.result.jiJin.jijinLink+'">';

        //判断-默认LOGO
        detailcourseStr += '<input type="hidden" id="shareImage" value="'+checkPath(data.result.jiJin.jijinImage,'1')+'">';


        detailcourseStr += '<input type="hidden" id="orderMoney" value="0.01">';
        detailcourseStr += '<input type="hidden" id="orderNum" value="1">';
        detailcourseStr += '<input type="hidden" id="orderType" value="18">';
        detailcourseStr += '<input type="hidden" id="orderDashangType" value="0">';
        detailcourseStr += '<input type="hidden" id="orderTitle" value="'+data.result.jiJin.jijinTitle+'">';
        detailcourseStr += '<input type="hidden" id="orderAboutid" value="'+data.result.jiJin.id+'">';


        $("#detailcourse").html(detailcourseStr);


        <!--购买文章-分享-->
        var detailcourseButtonStr = '';
        if(1==2 && GetUrlString("share") == null || GetUrlString("share") == ''){
            detailcourseButtonStr += '<div id="share">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            if( data.result.jiJin.isGaoyongjin == '1' ){
                if(data.result.jiJin.sharePricetype == '2'){
                    detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">('+setNum(data.result.jiJin.gaoyongjinPrice)+'个点)</span></a>';

                }else{
                    detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">(￥'+setNum(data.result.jiJin.gaoyongjinPrice)+')</span></a>';

                }
            }else{
                if(data.result.jiJin.sharePricetype == '2'){
                    detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">('+setNum(data.result.jiJin.vipshareAgent)+'个点)</span></a>';
                }else{
                    detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>去分享<span class="slogan f-white">(￥'+setNum(data.result.jiJin.vipshareAgent)+')</span></a>';

                }

            }


            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div class="fixedbtn22">';
            detailcourseButtonStr += '<a href="javascript:subapply();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去申请</a>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div class="fixedbtn23">';
            detailcourseButtonStr += '<a href="javascript:;" class="fenge">|</a>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '</div>';
        }else{
           /* detailcourseButtonStr += '<div id="share">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:subapply();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去申请</a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '</div>';*/

            detailcourseButtonStr += '<div class="fixedbtn24 dibu1" >';

            detailcourseButtonStr += '<div class="dibu2" onclick=subapply();>';
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-115 weui-tabbar__icon" id="iconshare"></i>去申请</a>';
            detailcourseButtonStr += '</div>';



            detailcourseButtonStr += '<div class="dibu3" >';
            detailcourseButtonStr += '<div onclick=openCommentList("commentDisList","2","1",10,"'+data.result.jiJin.id+'","13","'+data.result.jiJin.createBy.id+'"); class="dibu5">';

            if(setNum(data.result.jiJin.commentNum) > 0){

                detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"><span class="weui-badge" style="position: absolute;top: .25em;right: -.4em;">'+setNum(data.result.jiJin.commentNum)+'</span></i>';
            }else{
                detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"></i>';
            }

            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div onclick=dianji("13","'+data.result.jiJin.id+'"); class="dibu5">';
            detailcourseButtonStr += '<i class="icon icon-65 weui-tabbar__icon" id="iconshare2"></i>';
            detailcourseButtonStr += '</div>';

           /* detailcourseButtonStr += '<div onclick=zhuanfa("2","'+data.result.jiJin.id+'","'+data.result.jiJin.createBy.id+'","13"); class="dibu5">';
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





        sharecourseButtonStr += '<div id="sharecontent" class="disnone" style="width: 100%;margin-bottom: 50px;background-image: url(../../img/agent/images/bg.png);background-repeat:no-repeat;background-size:cover;">';
        /* sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
         sharecourseButtonStr += '<span class="weui-loadmore__tips">封面</span>';
         sharecourseButtonStr += '</div>';*/

        sharecourseButtonStr += '<div class="page-bd-15 " style="text-align: center;">';
        sharecourseButtonStr += '<img class="getgold_top_head_img"  src="'+ checkPath(data.result.jiJin.jijinImage,'1')+'" id="fengmainimagebase64" style="margin-top: 40px;height: 100px;width: 100px;border-radius:50%;">';
        /*sharecourseButtonStr += '<div class="weui-c-article"><p >'+data.result.tool.toolContent+'</p></div>';*/
        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;">';
        sharecourseButtonStr += '<h4 class="weui-c-title bottom5 f-white" >'+data.result.jiJin.jijinTitle+'</h4>';

        //付费时候
        /*if(data.result.activity.activityPrice != null && data.result.activity.activityPrice > 0.00){
            sharecourseButtonStr += '<div class="nickname f-red"> 抢购价￥'+data.result.price+'</div>';
        }*/

        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;margin-top: 250px;">';

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

       /* sharecourseButtonStr += '<div style="width: 100%;text-align: center;margin-top: -70px;">';
        if(data.result.user != null) {
            sharecourseButtonStr += '<img src="' + checkPath(data.result.user.headimgurl, "1") + '" id="headimagebase64" height="25px" width="25px" style="border-radius: 5px;"/>';
        }
        sharecourseButtonStr += '</div>';*/


        sharecourseButtonStr += '<div style="width: 100%;text-align: center;height: 50px;">';

        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '</div>';



        sharecourseButtonStr += '<div id="sharecontent" class="disnone" style="width: 100%;margin-bottom: 50px;">';
        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: left;">';
        sharecourseButtonStr += '<h4 class="weui-c-title bottom5" >'+data.result.jiJin.jijinTitle+'</h4>';
        sharecourseButtonStr += '<div style="word-break:break-all;color:#3e3e3e;"><p class="time f14"  id="fenxiangneirong"></p></div>';


        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
        sharecourseButtonStr += '<span class="weui-loadmore__tips">封面</span>';
        sharecourseButtonStr += '</div>';



        //判断如果是图片则展示图片
        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;">';
        sharecourseButtonStr += '<img  src="'+ checkPath(data.result.jiJin.jijinImage,'1')+'" id="fengmainimagebase64" style="width: 100%;">';
        /*sharecourseButtonStr += '<div class="weui-c-article">'+data.result.jiJin.jijinContent+'</div>';*/
        sharecourseButtonStr += '</div>';



        sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
        sharecourseButtonStr += '<span class="weui-loadmore__tips">扫码或长按识别查看精彩内容</span>';
        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center">';

        sharecourseButtonStr += '<div style="width: 100%;text-align: center;">';
        sharecourseButtonStr += '<img id="tothis" src="" style="width:30%;">';
        sharecourseButtonStr += '</div>';

      /*  sharecourseButtonStr += '<div style="width: 100%;text-align: center;margin-top: -70px;">';
        if(data.result.user != null) {
            sharecourseButtonStr += '<img src="' + checkPath(data.result.user.headimgurl, "1") + '" id="headimagebase64" height="25px" width="25px" style="border-radius: 5px;"/>';
        }
        sharecourseButtonStr += '</div>';*/

        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '</div>';

        $("body").prepend(sharecourseButtonStr);
        $(document).ready(function() {

            qrCode("qrcodeCanvas",baseUrlFrontDefault+"jijindetail.html?id="+data.result.jiJin.id+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));
            localStorage.setItem("bgurl",localStorage.getItem("sharetuiguang"));
        /*    var url = Canvas2Image.convertToPNG($("canvas")[0],100,100).getAttribute('src');
            var img = $("#tothis");
            img.attr("src",url);
*/
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
                getBase64ImageInServeice(checkPath(data.result.jiJin.jijinImage,'1'),"fengmainimagebase64");
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

//产品详情渲染-
function detailProductRender(data){
    if(data.code == '0'){
        $("title").html(data.result.product.productTitle);
        var detailcourseStr = '';
        detailcourseStr += '';

        detailcourseStr += '<div class="weui-c-content" style="padding-top: 0px;">';
        detailcourseStr += '<h2 class="weui-c-title bottom5" style="padding-top: 0px;">'+data.result.product.productTitle+'</h2>';
        if(true) {
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
                detailcourseStr += '<div class="nickname f-red">限时低价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;">原价￥'+setNum(data.result.product.yuanjia)+'</span> </div>';

            }else if(data.result.product.productPrice != null && data.result.product.productPrice > 0 && data.result.product.isGaoyongjin == '1'){
                detailcourseStr += '<div class="nickname f-red">抢购价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+setNum(data.result.product.yuanjia)+'</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';
            }else if(data.result.product.productPrice != null && data.result.product.productPrice > 0 ){
                detailcourseStr += '<div class="nickname f-red">抢购价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+setNum(data.result.product.yuanjia)+'</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';
            }else{
                //detailcourseStr += '<div class="nickname f-red f12">本篇文章可免费阅读，感谢作者分享</div>';
            }
        }else{
            if(data.result.product.productPrice != null && data.result.product.productPrice > 0 &&   data.result.product.isLowprice == '1'){
                detailcourseStr += '<div class="nickname f-red">限时低价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;">原价￥'+setNum(data.result.product.yuanjia)+'</span> ';
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
                detailcourseStr += '<div class="nickname f-red">抢购价￥'+data.result.price+'  <span style="color:gray ;font-size: 12px;text-decoration:line-through;">原价￥'+setNum(data.result.product.yuanjia)+'</span>';
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
                    detailcourseStr += '<label class="label f-red b-red f13">'+strs[i]+'</label>';
                }

            }





            detailcourseStr += '</div>';


            detailcourseStr += '<p>'+data.result.product.productContent+'</p>';

          /*  detailcourseStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick=openPay("购买商品","精选全球好物","","","1","0","'+data.result.product.productTitle.replace(/\s*!/g,"")+'","","'+data.result.price+'","'+data.result.price+'","10","","1","0","'+data.result.isHuiYuan+'","'+data.result.product.id+'","'+data.result.product.createBy.id+'");>';

            detailcourseStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去购买<span class="slogan f-white">￥'+setNum(data.result.price)+'</span></a>';*/

        }else{
            $("#buyandshare").hide();
            $("#share").show();
            /*if(data.result.product.productImage != null){
                detailcourseStr += '<img src="'+ checkPath(data.result.product.productImage,'1')+'" >';
            }*/

            detailcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
            if(data.result.product.isZiying != null && data.result.product.isZiying != ''){
                if(data.result.product.isZiying == '1'){
                    detailcourseStr += '<label class="label f-red b-red">自营</label>';
                }

            }

            if((GetUrlString("share") == null || GetUrlString("share") == '')  && data.result.isHuiYuan == '1' ){
                if(data.result.product.productJiesuan != null && data.result.product.productJiesuan != ''){
                    detailcourseStr += '<label class="label f-red b-red">结算时间:'+data.result.product.productJiesuan+'</label>';
                }
            }

            if(data.result.product.productLabel != null && data.result.product.productLabel != ''){
                var str = data.result.product.productLabel; //这是一字符串
                var strs= new Array(); //定义一数组
                strs=str.split("/"); //字符分割
                for (i=0;i<strs.length ;i++ )
                {
                    detailcourseStr += '<label class="label f-red b-red">'+strs[i]+'</label>';
                }

            }





            detailcourseStr += '</div>';

            /*if(GetUrlString("share") == null || GetUrlString("share") == '' ){
                detailcourseStr += '<p>'+setNULL(data.result.product.productSharecontent)+'</p>';
            }
            detailcourseStr += '<p>'+data.result.product.productContent+'</p>';*/

            detailcourseStr += '<p>'+data.result.product.productContent+'</p>';

        }



        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-tools">';
        detailcourseStr += '<a class="" onclick=zhuanfa("2","'+data.result.product.id+'","'+data.result.product.createBy.id+'","6");><i class="icon icon-5 weui-tabbar__icon" id="dashangicon"></i>转发</a>';
        detailcourseStr += '<div class="weui-c-readnum " >浏览<span id="readnum">'+setNum(data.result.product.productDianjiliang)+'</span></div>';
        detailcourseStr += '<div class="weui-comment-li " style="float: right;">';
        detailcourseStr += '<span  onclick=dianji("7","'+data.result.product.id+'"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan'+data.result.product.id+'">'+setNum(data.result.product.productZan)+'</span> </span>';
        detailcourseStr += '<span class="check checked " onclick=openCommentList("commentDisList","2","1",10,"'+data.result.product.id+'","7","'+data.result.product.createBy.id+'");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">'+setNum(data.result.product.commentNum)+'</span> </span>';

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

            /*detailcourseButtonStr += '<div onclick=shareJiajia(); class="dibu7">';
            detailcourseButtonStr += '<i class="icon icon-41 weui-tabbar__icon" id="iconshare4"><span class="weui-badge" style="position: absolute;top: .25em;right: -1em;">赚</span></i>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div onclick=isfollowqr(\'../../img/agent/wx/stj.jpg\') class="dibu7">';
            detailcourseButtonStr += '<i class="icon icon-14 weui-tabbar__icon" id="iconshare2"></i>';
            detailcourseButtonStr += '</div>';*/
            console.log("============="+data.result.product.gouwuche);
            if(localStorage.getItem("islingyuan") == '1'){
                detailcourseButtonStr += '<div onclick=toshoppingcar(); class="dibu91">';
                detailcourseButtonStr += '<i class="icon icon-24 weui-tabbar__icon" id="iconshare2"></i>';
                if(data.result.product.gouwuche != null && data.result.product.gouwuche != '' && data.result.product.gouwuche != 0 && data.result.product.gouwuche != '0'){
                    detailcourseButtonStr += '<span class="weui-badge" style="position: absolute;top: .25em;left: 32%;">'+setNum(data.result.product.gouwuche)+'</span>';
                }
                detailcourseButtonStr += '</div>';
                detailcourseButtonStr += '<div class="dibu91"  onclick=setzhifu("1");openPay("购买商品","精选全球好物","","","1","0","'+data.result.product.productTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","10","","1","0","'+data.result.isHuiYuan+'","'+data.result.product.id+'","'+data.result.product.createBy.id+'");>';
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: smaller;width: 100%;border-radius: 0px;background-color:#FF9800 !important;">加购物车</a>';
                detailcourseButtonStr += '</div>';

                detailcourseButtonStr += '<div class="dibu91" onclick=setzhifu("2");openPay("购买商品","精选全球好物","","","1","0","'+data.result.product.productTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","10","","1","0","'+data.result.isHuiYuan+'","'+data.result.product.id+'","'+data.result.product.createBy.id+'");>';
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: smaller;width: 100%;border-radius: 0px;">立即购买</a>';
                detailcourseButtonStr += '</div>';

                detailcourseButtonStr += '<div class="dibu91" onclick=to0yuangou(\"youyu.html\")>';
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size:smaller;width: 100%;border-radius: 0px;background-color: #9C27B0;">0元购</a>';
                detailcourseButtonStr += '</div>';

            }else{
                detailcourseButtonStr += '<div onclick=shareJiajia(); class="dibu7">';
                detailcourseButtonStr += '<i class="icon icon-41 weui-tabbar__icon" id="iconshare4"><span class="weui-badge" style="position: absolute;top: .25em;right: -1em;">赚</span></i>';
                detailcourseButtonStr += '</div>';
                detailcourseButtonStr += '<div onclick=toshoppingcar(); class="dibu7">';
                detailcourseButtonStr += '<i class="icon icon-24 weui-tabbar__icon" id="iconshare2"></i>';
                if(data.result.product.gouwuche != null && data.result.product.gouwuche != '' && data.result.product.gouwuche != 0 && data.result.product.gouwuche != '0'){
                    detailcourseButtonStr += '<span class="weui-badge" style="position: absolute;top: .25em;left: 32%;">'+setNum(data.result.product.gouwuche)+'</span>';
                }
                detailcourseButtonStr += '</div>';
                detailcourseButtonStr += '<div class="dibu9"  onclick=setzhifu("1");openPay("购买商品","精选全球好物","","","1","0","'+data.result.product.productTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","10","","1","0","'+data.result.isHuiYuan+'","'+data.result.product.id+'","'+data.result.product.createBy.id+'");>';
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 14px;width: 100%;border-radius: 0px;background-color:#FF9800 !important;">加入购物车</a>';
                detailcourseButtonStr += '</div>';

                detailcourseButtonStr += '<div class="dibu9" onclick=setzhifu("2");openPay("购买商品","精选全球好物","","","1","0","'+data.result.product.productTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","10","","1","0","'+data.result.isHuiYuan+'","'+data.result.product.id+'","'+data.result.product.createBy.id+'");>';
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 14px;width: 100%;border-radius: 0px;">立即购买</a>';
                detailcourseButtonStr += '</div>';
            }









           /* detailcourseButtonStr += '<div class="dibu2" onclick=openPay("购买商品","精选全球好物","","","1","0","'+data.result.product.productTitle.replace(/\s*!/g,"")+'","","'+data.result.price+'","'+data.result.price+'","10","","1","0","'+data.result.isHuiYuan+'","'+data.result.product.id+'","'+data.result.product.createBy.id+'");>';
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 12px;width: 100%;border-radius: 0px;">加入购物车</a>';
            detailcourseButtonStr += '</div>';*/

            detailcourseButtonStr += '<div class="" >';
            /*detailcourseButtonStr += '<div onclick=openCommentList("commentDisList","2","1",10,"'+data.result.product.id+'","7","'+data.result.product.createBy.id+'"); class="dibu5">';

            if(setNum(data.result.product.commentNum) > 0){

                detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"><span class="weui-badge" style="position: absolute;top: .25em;right: -.4em;">'+setNum(data.result.product.commentNum)+'</span></i>';
            }else{
                detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"></i>';
            }

            detailcourseButtonStr += '</div>';*/


           /* detailcourseButtonStr += '<div onclick=isfollowqr(\'../../img/agent/wx/stj.jpg\') class="dibu5">';
            detailcourseButtonStr += '<i class="icon icon-14 weui-tabbar__icon" id="iconshare2"></i>';
            detailcourseButtonStr += '</div>';*/


           /* detailcourseButtonStr += '<div onclick=zhuanfa("2","'+data.result.product.id+'","'+data.result.product.createBy.id+'","6"); class="dibu5">';
            detailcourseButtonStr += '<i class="icon icon-103 weui-tabbar__icon" id="iconshare3"></i>';
            detailcourseButtonStr += '</div>';*/

           /* detailcourseButtonStr += '<div onclick=shareJiajia(); class="dibu5">';
            detailcourseButtonStr += '<i class="icon icon-41 weui-tabbar__icon" id="iconshare4"><span class="weui-badge" style="position: absolute;top: .25em;right: -1em;">赚</span></i>';
            detailcourseButtonStr += '</div>';*/

            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '</div>';
        }
        $("body").append(detailcourseButtonStr);

        if(data.code == '0'){
            var url = data.result.product.productImage;

            if(url == null || url == ''){

            }else{
                url =  url.replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",").replace("|",",");
                var htmlStr = '';
                var strs= new Array(); //定义一数组
                strs=url.split("\,"); //字符分割
                var str1 = '';
                var renderType = '99';
                var renderId = 'lunbotu99';
                str1 += '<div class="swiper-container disnone" id="swiper-container'+renderType+'">';
                str1 += '<div class="swiper-wrapper">';

                for (i=0;i<strs.length ;i++ )
                {

                    str1 += '<div class="swiper-slide">';
                    str1 += '<a>';
                    str1 += '<img src="'+ checkPath(strs[i],'1')+'" alt="" style="width: 100%;">';
                    str1 += '</a>';
                    str1 += '</div>';
                }

                str1 += '</div>';

                str1 += '<div class="swiper-pagination disnone" id="swiper-pagination'+renderType+'"></div>';
                str1 += '</div>';


                $("#"+renderId+"").html(str1);
                setTimeout(function() {
                    var ss4 =  new Swiper('#swiper-container'+renderType+'', {
                        spaceBetween: 30,
                        centeredSlides: true,
                        observer:true,//修改swiper自己或子元素时，自动初始化swiper
                        observeParents:true,//修改swiper的父元素时，自动初始化swiper
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

                $("#"+renderId+"").show();
                $("#swiper-container"+renderType+"").show();
                $("#swiper-pagination"+renderType+"").show();
            }

            if(data.result.product.kucun != null && data.result.product.kucun != ''){
                localStorage.setItem("kucun",setNum(data.result.product.kucun));
                $("#kucun").html("库存:"+setNum(data.result.product.kucun));
                localStorage.setItem("shuxingkucun",setNum(localStorage.getItem("kucun")));
            }

        }else{
            $.toast(data.msg, "text");
        }
        //分享内容
        var sharecourseButtonStr = '';
        sharecourseButtonStr += '<div class="disnone" >';
        sharecourseButtonStr += '<center>';
        sharecourseButtonStr += '<div id="qrcodeCanvas"></div>';
        sharecourseButtonStr += '</center>';
        sharecourseButtonStr += '</div>';

        if(getSaasId() == '201912012111'){
            sharecourseButtonStr += '<div id="sharecontent" class="disnone" style="width: 100%;margin-bottom: 50px;background-image: url('+checkPathBackGroubdImage(localStorage.getItem("shareshoping"))+');background-repeat:no-repeat;background-size:cover;">';
        }else{
            sharecourseButtonStr += '<div id="sharecontent" class="disnone" style="width: 100%;margin-bottom: 50px;background-image: url('+checkPathBackGroubdImage(localStorage.getItem("shareshoping"))+');background-repeat:no-repeat;background-size:cover;">';
        }

        /* sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
         sharecourseButtonStr += '<span class="weui-loadmore__tips">封面</span>';
         sharecourseButtonStr += '</div>';*/

        sharecourseButtonStr += '<div class="page-bd-15 " style="text-align: center;">';
        sharecourseButtonStr += '<img class="getgold_top_head_img"  src="'+ checkPath(getFirstImageDetailContent(data.result.product.productImage),'1')+'" id="fengmainimagebase64" style="margin-top: 40px;height: 1px;width: 1px;border-radius:50%;">';
        /*sharecourseButtonStr += '<div class="weui-c-article"><p >'+data.result.tool.toolContent+'</p></div>';*/
        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;">';
        sharecourseButtonStr += '<h4 class="weui-c-title bottom5 f-white" ></h4>';

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

        /*sharecourseButtonStr += '<div style="width: 100%;text-align: center;margin-top: -70px;">';
        if(data.result.user != null) {
            sharecourseButtonStr += '<img src="' + checkPath(data.result.user.headimgurl, "1") + '" id="headimagebase64" height="25px" width="25px" style="border-radius: 5px;"/>';
        }
        sharecourseButtonStr += '</div>';*/


        sharecourseButtonStr += '<div style="width: 100%;text-align: center;height: 50px;">';

        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '</div>';


        $("body").prepend(sharecourseButtonStr);
        $(document).ready(function() {

            qrCode("qrcodeCanvas",baseUrlFrontDefault+"productdetail.html?id="+data.result.product.id+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));
            localStorage.setItem("bgurl",localStorage.getItem("shareshoping"));
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
                getBase64ImageInServeice(checkPath(getFirstImageDetailContent(data.result.product.productImage),'1'),"fengmainimagebase64");
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

//问题详情渲染-
function detailQuestionRender(data){
    if(data.code == '0'){
        $("title").html(data.result.question.questionTitle);
        var detailcourseStr = '';
        detailcourseStr += '';

        detailcourseStr += '<div class="weui-c-content" >';
        detailcourseStr += '<h2 class="weui-c-title bottom5">'+data.result.question.questionTitle+'</h2>';
        if((GetUrlString("share") == null || GetUrlString("share") == '')  && data.result.isHuiYuan == '1') {
            detailcourseStr += '<h2 class="bottom5 f14 f-red">' + setNULL(data.result.question.questionSharetitle) + '</h2>';
        }

        detailcourseStr += '<div class="weui-c-meta bottom5" style="float: left;width: 70%;">';
        detailcourseStr += '<div class="weui-c-meta bottom5">';
        detailcourseStr += '<span class="weui-c-nickname">';
        detailcourseStr += '<div class="weui-news-infoitem"  onclick=toUserHome("'+data.result.question.createBy.id+'","1")>';
        detailcourseStr += '<img src="'+ checkPath(data.result.question.createBy.headimgurl,'1')+'" class="weui-news-round">';
        detailcourseStr += '<span class="weui-news-left f-blue f16import">'+data.result.question.createBy.nickname+'</span>';
        detailcourseStr += '</div>';
        detailcourseStr += '</span>';
        detailcourseStr += '<em class="weui-c-nickname">'+timeago(data.result.question.createDate)+'</em>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '<div style="float: left;width: 30%;line-height: 40px;">';
        $("#guanzhuId").val(data.result.question.createBy.id);
        detailcourseStr += '<div style="width: 100%;text-align: right;">';
        detailcourseStr += '<label class="weui-label-s b-orange  f-white f12"  id="bgguanzhu" onclick=saveNRguanzhu() style="padding: 0.2em; margin-left: 10px;background-color:#ef4f4f !important;border: 1px solid #ef4f4f !important;color: white !important;;"><i class="beauty icon-xiai f-white f16 " id="gz">关注</i></label>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '<div class="clear"></div>';
        detailcourseStr += '<div class="weui-comment-reply top00">';
        if(GetUrlString('share') != null ){//是否是推广链接
            if(data.result.question.questionPrice != null && data.result.question.questionPrice > 0 &&   data.result.question.isLowprice == '1'){
                detailcourseStr += '<div class="nickname f-red" onclick=toHongBaoDetail("'+data.result.hongbaoId+'","1")>红包赏金￥'+data.result.question.questionPrice+'  <i class="left15 beauty icon-hongbao f-white f14   anniushadow2 "  >点我领红包</i> <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.question.lowpriceStart,format='MM-DD')+'至'+formatDate(data.result.question.lowpriceEnd,format='MM-DD')+']</span> </div>';

            }else if(data.result.question.questionPrice != null && data.result.question.questionPrice > 0 && data.result.question.isGaoyongjin == '1'){
                detailcourseStr += '<div class="nickname f-red" onclick=toHongBaoDetail("'+data.result.hongbaoId+'","1")>红包赏金￥'+data.result.question.questionPrice+'  <i class="left15 beauty icon-hongbao f-white f14   anniushadow2 "  >点我领红包</i> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';
            }else if(data.result.question.questionPrice != null && data.result.question.questionPrice > 0 ){
                detailcourseStr += '<div class="nickname f-red" onclick=toHongBaoDetail("'+data.result.hongbaoId+'","1")>红包赏金￥'+data.result.question.questionPrice+'  <i class="left15 beauty icon-hongbao f-white f14   anniushadow2 "  >点我领红包</i> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';
            }else{
                //detailcourseStr += '<div class="nickname f-red f12">本篇文章可免费阅读，感谢作者分享</div>';
            }
        }else{
            if(data.result.question.questionPrice != null && data.result.question.questionPrice > 0 &&   data.result.question.isLowprice == '1'){
                detailcourseStr += '<div class="nickname f-red"  onclick=toHongBaoDetail("'+data.result.hongbaoId+'","1")>红包赏金￥'+data.result.question.questionPrice+'  <i class="left15 beauty icon-hongbao f-white f14   anniushadow2 "  >点我领红包</i> <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.question.lowpriceStart,format='MM-DD')+'至'+formatDate(data.result.question.lowpriceEnd,format='MM-DD')+']</span> ';
                if(eval(data.result.yongjin) > 0.00 && data.result.isHuiYuan == '1'){
                    detailcourseStr += '<span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">会员佣金￥'+data.result.yongjin+'</span>';
                }


                detailcourseStr += '</div>';


            }else if(data.result.question.questionPrice != null && data.result.question.questionPrice > 0 && data.result.question.isGaoyongjin == '1'){
                if(data.result.isHuiYuan == '1'){
                    detailcourseStr += '<div class="nickname f-red">限时高佣金(会员)￥'+data.result.yongjin+' <i class="left15 beauty icon-hongbao f-white f14   anniushadow2 "  >点我领红包</i>  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.question.gaoyongjinStart,format='MM-DD')+'至'+formatDate(data.result.question.gaoyongjinEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">红包赏金￥'+data.result.question.questionPrice+'</span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red"><span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">红包赏金￥'+data.result.question.questionPrice+'</span><i class="left15 beauty icon-hongbao f-white f14   anniushadow2 "  >点我领红包</i> </div>';

                }

            }else if(data.result.question.questionPrice != null && data.result.question.questionPrice > 0 ){
                detailcourseStr += '<div class="nickname f-red" onclick=toHongBaoDetail("'+data.result.hongbaoId+'","1")>红包赏金￥'+data.result.question.questionPrice+'<i class="left15 beauty icon-hongbao f-white f14   anniushadow2 "  >点我领红包</i>   ';
                if(eval(data.result.yongjin) > 0.00 && data.result.isHuiYuan == '1'){
                    detailcourseStr += '<span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">会员佣金￥'+data.result.yongjin+'</span>';
                }
                detailcourseStr += '</div>';
            }else{
                //detailcourseStr += '<div class="nickname f-red f12">本活动可免费参与，感谢作者分享</div>';
            }
        }


        //detailcourseStr += '<p class="time subtext">'+data.result.question.questionLabel+'</p>';





        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-article">';

        if('0' == '0'){
            if(data.result.question.questionImage != null){
                //文件评论--判断文件类型展示不同的图片
                if(data.result.question.questionImage.search(".jpeg") != -1 || data.result.question.questionImage.search(".jpg") != -1 || data.result.question.questionImage.search(".png") != -1 || data.result.question.questionImage.search(".gif") != -1 || data.result.question.questionImage.search(".GIF") != -1 ){
                    detailcourseStr += '<div class="page-bd">'+getImageDetailList(data.result.question.id,data.result.question.questionImage)+'</div>';

                    /*detailcourseStr += '<div class="weui-feeds"><ul>'+getImage100Content(data.result.question.id,data.result.question.questionImage)+'</ul></div>';*/
                }else if( data.result.question.questionImage.search(".mp4") != -1 || data.result.question.questionImage.search(".MP4") != -1 || data.result.question.questionImage.search(".flv")  != -1 || data.result.question.questionImage.search(".mov")  != -1 ){
                    //视频评论--隐藏原始播放器

                    detailcourseStr += '<div class="page-bd"><div class="weui-c-article">';
                    detailcourseStr += '<div id="dplayer2'+data.result.question.id+'"></div>';
                    detailcourseStr += '<script type="text/javascript">';
                    detailcourseStr += 'const dp2'+data.result.question.id+' = new DPlayer({container: document.getElementById("dplayer2'+data.result.question.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(data.result.question.questionImage,"3")+'\', pic: \''+videoImagePath(data.result.question.questionImage)+'\'}});';
                    detailcourseStr += '</script>';
                    detailcourseStr += '</div></div>';


                }else if( data.result.question.questionImage.search(".MP3") != -1 || data.result.question.questionImage.search(".mp3") != -1 || data.result.question.questionImage.search(".wav")  != -1 || data.result.question.questionImage.search(".ogg")  != -1 ){
                    //音频--隐藏原始播放器
                    detailcourseStr += '<div class="page-bd center bottom5" id="audiostartA'+data.result.question.id+'" onclick=start("audiotest'+data.result.question.id+'","'+checkPath(data.result.question.questionImage,'3')+'","shifenmiao'+data.result.question.id+'","audiostartA'+data.result.question.id+'","audioIconA'+data.result.question.id+'")>';
                    detailcourseStr += '<div class="audio"   >';
                    detailcourseStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon"  id="audioIconA'+data.result.question.id+'"/></div>';
                    detailcourseStr += '<div id="shifenmiao'+data.result.question.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                    detailcourseStr += '</div>';
                    detailcourseStr += '<div class="disnone"><audio id="audiotest'+data.result.question.id+'" src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                    detailcourseStr += '</div>';
                }else{
                    detailcourseStr += '<div class="page-bd center bottom5 alignleft" ><a href="'+ checkPath(data.result.question.questionImage,'3')+'" target="_blank">'+setNULL(getFileName(data.result.question.questionImage))+'</a></div>';
                }
            }
            detailcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
            if(data.result.question.isZiying != null && data.result.question.isZiying != ''){
                if(data.result.question.isZiying == '1'){
                    detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
                }

            }

            if((GetUrlString("share") == null || GetUrlString("share") == '')  && data.result.isHuiYuan == '1' ){
                if(data.result.question.questionJiesuan != null && data.result.question.questionJiesuan != ''){
                    detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.question.questionJiesuan+'</label>';
                }
            }

            if(data.result.question.questionLabel != null && data.result.question.questionLabel != ''){
                var str = data.result.question.questionLabel; //这是一字符串
                var strs= new Array(); //定义一数组
                strs=str.split("/"); //字符分割
                for (i=0;i<strs.length ;i++ )
                {
                    detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
                }

            }





            detailcourseStr += '</div>';


            if((GetUrlString("share") == null || GetUrlString("share") == '' )  && data.result.isHuiYuan == '1'){
                detailcourseStr += '<p>'+setNULL(data.result.question.questionSharecontent)+'</p>';
            }
            /*detailcourseStr += '<p>'+data.result.question.questionContent+'</p>';*/

            /*detailcourseStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick=mydongtaiwdhd();>';

            detailcourseStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去回答<span class="slogan f-white">￥'+setNum(data.result.question.questionPrice)+'</span></a>';*/

        }else{
            $("#buyandshare").hide();
            $("#share").show();
            if(data.result.question.questionImage != null){

                //文件评论--判断文件类型展示不同的图片
                if(data.result.question.questionImage.search(".jpeg") != -1 || data.result.question.questionImage.search(".jpg") != -1 || data.result.question.questionImage.search(".png") != -1 || data.result.question.questionImage.search(".gif") != -1 || data.result.question.questionImage.search(".GIF") != -1 ){
                    /*detailcourseStr += '<div class="weui-feeds"><ul>'+getImage100Content(data.result.question.id,data.result.question.questionImage)+'</ul></div>';*/
                    detailcourseStr += '<div class="page-bd">'+getImageDetailList(data.result.question.id,data.result.question.questionImage)+'</div>';
                }else if( data.result.question.questionImage.search(".mp4") != -1 || data.result.question.questionImage.search(".MP4") != -1 || data.result.question.questionImage.search(".flv")  != -1 || data.result.question.questionImage.search(".mov")  != -1 ){
                    //视频评论--隐藏原始播放器

                    detailcourseStr += '<div class="page-bd"><div class="weui-c-article">';
                    detailcourseStr += '<div id="dplayer2'+data.result.question.id+'"></div>';
                    detailcourseStr += '<script type="text/javascript">';
                    detailcourseStr += 'const dp2'+data.result.question.id+' = new DPlayer({container: document.getElementById("dplayer2'+data.result.question.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(data.result.question.questionImage,"3")+'\', pic: \''+videoImagePath(data.result.question.questionImage)+'\'}});';
                    detailcourseStr += '</script>';
                    detailcourseStr += '</div></div>';


                }else if( data.result.question.questionImage.search(".MP3") != -1 || data.result.question.questionImage.search(".mp3") != -1 || data.result.question.questionImage.search(".wav")  != -1 || data.result.question.questionImage.search(".ogg")  != -1 ){
                    //音频--隐藏原始播放器
                    detailcourseStr += '<div class="page-bd center bottom5" id="audiostartA'+data.result.question.id+'" onclick=start("audiotest'+data.result.question.id+'","'+checkPath(data.result.question.questionImage,'3')+'","shifenmiao'+data.result.question.id+'","audiostartA'+data.result.question.id+'","audioIconA'+data.result.question.id+'")>';
                    detailcourseStr += '<div class="audio"   >';
                    detailcourseStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon"  id="audioIconA'+data.result.question.id+'"/></div>';
                    detailcourseStr += '<div id="shifenmiao'+data.result.question.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                    detailcourseStr += '</div>';
                    detailcourseStr += '<div class="disnone"><audio id="audiotest'+data.result.question.id+'" src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                    detailcourseStr += '</div>';
                }else{
                    detailcourseStr += '<div class="page-bd center bottom5 alignleft" ><a href="'+ checkPath(data.result.question.questionImage,'3')+'" target="_blank">'+setNULL(getFileName(data.result.question.questionImage))+'</a></div>';
                }


            }

            detailcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
            if(data.result.question.isZiying != null && data.result.question.isZiying != ''){
                if(data.result.question.isZiying == '1'){
                    detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
                }

            }

            if(GetUrlString("share") == null || GetUrlString("share") == '' ){
                if(data.result.question.questionJiesuan != null && data.result.question.questionJiesuan != ''){
                    detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.question.questionJiesuan+'</label>';
                }
            }

            if(data.result.question.questionLabel != null && data.result.question.questionLabel != ''){
                var str = data.result.question.questionLabel; //这是一字符串
                var strs= new Array(); //定义一数组
                strs=str.split("/"); //字符分割
                for (i=0;i<strs.length ;i++ )
                {
                    detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
                }

            }





            detailcourseStr += '</div>';

            if((GetUrlString("share") == null || GetUrlString("share") == '')  && data.result.isHuiYuan == '1' ){
                detailcourseStr += '<p>'+setNULL(data.result.question.questionSharecontent)+'</p>';
            }
            /*detailcourseStr += '<p>'+data.result.question.questionContent+'</p>';*/

        }



        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-tools">';
        detailcourseStr += '<a  class="" onclick=zhuanfa("2","'+data.result.question.id+'","'+data.result.question.createBy.id+'","7");><i class="icon icon-5 weui-tabbar__icon" id="dashangicon"></i>转发</a>';
        detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">'+setNum(data.result.question.productDianjiliang)+'</span></div>';
        detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
        detailcourseStr += '<span  onclick=dianji("20","'+data.result.question.id+'"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan'+data.result.question.id+'">'+setNum(data.result.question.productZan)+'</span> </span>';
/*
        detailcourseStr += '<span class="check checked" onclick=openCommentList("commentDisList","2","1",10,"'+data.result.question.id+'","8","'+data.result.question.createBy.id+'");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">'+setNum(data.result.question.commentNum)+'</span> </span>';
*/

        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        /*分享参数*/
        detailcourseStr += '<input type="hidden" id="id" value="'+data.result.question.id+'">';
        detailcourseStr += '<input type="hidden" id="shareType" value="7">';
        detailcourseStr += '<input type="hidden" id="shareTitle" value="'+data.result.question.questionTitle+'">';
        detailcourseStr += '<input type="hidden" id="shareImage" value="'+checkPath(data.result.question.questionImage,'1')+'">';


        detailcourseStr += '<input type="hidden" id="orderMoney" value="0">';
        detailcourseStr += '<input type="hidden" id="orderNum" value="1">';
        detailcourseStr += '<input type="hidden" id="orderType" value="12">';
        detailcourseStr += '<input type="hidden" id="orderDashangType" value="7">';
        detailcourseStr += '<input type="hidden" id="orderTitle" value="'+data.result.question.questionTitle+'">';
        detailcourseStr += '<input type="hidden" id="orderAboutid" value="'+data.result.question.id+'">';


        $("#detailcourse").html(detailcourseStr);


        <!--购买-分享-->
        var detailcourseButtonStr = '';
        if(1==2 && data.result.question.questionPrice != null && data.result.question.questionPrice > 0.00  && data.result.isBuy == '0' && GetUrlString('share') == null){//不是分享
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
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=mydongtaiwdhd() >';

            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>回答<span class="slogan f-white">领红包</span></a>';


            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn23">';
            detailcourseButtonStr += '<a href="javascript:;" class="fenge">|</a>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '</div>';
        }else if(1==2 && data.result.question.questionPrice != null && data.result.question.questionPrice > 0.00  && data.result.isBuy == '0' && GetUrlString('share') != null){//分享未购买
            detailcourseButtonStr += '<div id="buyandshare">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=mydongtaiwdhd() >';

            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon " id="iconshare"></i>回答<span class="slogan f-white">领红包</span></a>';
            detailcourseButtonStr += '</div>';


            detailcourseButtonStr += '</div>';
        }else if(1==2 && data.result.question.questionPrice != null && data.result.question.questionPrice > 0 ){//已购买
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
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=mydongtaiwdhd() >';


            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>回答</a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn23">';
            detailcourseButtonStr += '<a href="javascript:;" class="fenge">|</a>';
            detailcourseButtonStr += '</div>';
        }else{//免费
            /*detailcourseButtonStr += '<div id="buyandshare">';
            detailcourseButtonStr += '<div class="fixedbtn21">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';
            detailcourseButtonStr += '<i class="icon icon-3 weui-tabbar__icon" id="iconshare"></i>分享';

            if(eval(data.result.yongjin) > 0.00){
                detailcourseButtonStr += '<span class="slogan f-white">￥'+data.result.yongjin+'</span>';
            }

            detailcourseButtonStr += '</a>';

            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn22">';
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=mydongtaiwdhd()>';


            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>回答</a>';
            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn23">';
            detailcourseButtonStr += '<a href="javascript:;" class="fenge">|</a>';
            detailcourseButtonStr += '</div>';*/

            detailcourseButtonStr += '<div class="fixedbtn24 dibu1" >';
            detailcourseButtonStr += '<div class="dibu2" onclick=mydongtaiwdhd();>';
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-67 weui-tabbar__icon" id="iconshare"></i>回答</a>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div class="dibu3" >';
            if(data.result.question.questionPrice != null && data.result.question.questionPrice > 0){
                detailcourseButtonStr += '<div  class="dibu5">';

                detailcourseButtonStr += '<i onclick=toHongBaoDetail("'+data.result.hongbaoId+'","1"); class="beauty icon-hongbao" id="iconshare6"></i>';


                detailcourseButtonStr += '</div>';


                detailcourseButtonStr += '<div onclick=dianji("20","'+data.result.question.id+'"); class="dibu5">';
                detailcourseButtonStr += '<i class="icon icon-65 weui-tabbar__icon" id="iconshare2"></i>';
                detailcourseButtonStr += '</div>';

               /* detailcourseButtonStr += '<div onclick=zhuanfa("2","'+data.result.question.id+'","'+data.result.question.createBy.id+'","7"); class="dibu5">';
                detailcourseButtonStr += '<i class="icon icon-103 weui-tabbar__icon" id="iconshare3"></i>';
                detailcourseButtonStr += '</div>';*/

                detailcourseButtonStr += '<div onclick=shareJiajia(); class="dibu5">';
                detailcourseButtonStr += '<i class="icon icon-41 weui-tabbar__icon" id="iconshare4"><span class="weui-badge" style="position: absolute;top: .25em;right: -1em;">赚</span></i>';
                detailcourseButtonStr += '</div>';


            }else{

                detailcourseButtonStr += '<div onclick=dianji("20","'+data.result.question.id+'"); class="dibu6">';
                detailcourseButtonStr += '<i class="icon icon-65 weui-tabbar__icon" id="iconshare2"></i>';
                detailcourseButtonStr += '</div>';

               /* detailcourseButtonStr += '<div onclick=zhuanfa("2","'+data.result.question.id+'","'+data.result.question.createBy.id+'","7"); class="dibu6">';
                detailcourseButtonStr += '<i class="icon icon-103 weui-tabbar__icon" id="iconshare3"></i>';
                detailcourseButtonStr += '</div>';*/

                detailcourseButtonStr += '<div onclick=shareJiajia(); class="dibu6 ">';
                detailcourseButtonStr += '<i class="icon icon-41 weui-tabbar__icon" id="iconshare4"><span class="weui-badge" style="position: absolute;top: .25em;right: -1em;">赚</span></i>';
                detailcourseButtonStr += '</div>';

            }




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
        sharecourseButtonStr += '<div id="sharecontent" class="disnone" style="width: 100%;margin-bottom: 50px;background-image: url('+checkPathBackGroubdImage(localStorage.getItem("sharekno"))+');background-repeat:no-repeat;background-size:cover;">';
        sharecourseButtonStr += '<div class="page-bd-15 " style="text-align: left;">';
        sharecourseButtonStr += '<div style="height: 400px;"></div>';

        sharecourseButtonStr += '<h4 class="weui-c-title bottom5 f-white" >'+data.result.question.questionTitle+'</h4>';

        sharecourseButtonStr += '<div style="word-break:break-all;color:#3e3e3e;"><p class="time f14"  id="fenxiangneirong"></p></div>';

        /*//付费时候
        if(data.result.question.questionPrice != null && data.result.question.questionPrice > 0.00){
            sharecourseButtonStr += '<div class="nickname f-red"> 红包🧧￥'+data.result.question.questionPrice+'（点我领红包）</div>';
        }*/

        sharecourseButtonStr += '</div>';

/*
        if(data.result.question.questionImage != null && data.result.question.questionImage != '') {
            sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
            sharecourseButtonStr += '<span class="weui-loadmore__tips">封面</span>';
            sharecourseButtonStr += '</div>';
        }*/

        /*//判断如果是图片则展示图片
        sharecourseButtonStr += '<div id="sharedongtaicontent"  style="text-align: center;">';
        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;">';
        sharecourseButtonStr += '<img  src="" id="fengmainimagebase64" style="width: 100%;">';
        sharecourseButtonStr += '</div>';
        sharecourseButtonStr += '</div>';*/


        sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
        sharecourseButtonStr += '<span class="weui-loadmore__tips">扫码或长按识别查看精彩内容</span>';
        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center">';

        sharecourseButtonStr += '<div style="width: 100%;text-align: center;">';
        sharecourseButtonStr += '<img id="tothis" src="" style="width:30%;">';
        sharecourseButtonStr += '</div>';

        /*sharecourseButtonStr += '<div style="width: 100%;text-align: center;margin-top: -70px;">';
        if(data.result.user != null) {
            sharecourseButtonStr += '<img src="' + checkPath(data.result.user.headimgurl, "1") + '" id="headimagebase64" height="25px" width="25px" style="border-radius: 5px;"/>';
        }*/
        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '<div style="height: 40px;"></div>';

        sharecourseButtonStr += '</div>';

        $("body").prepend(sharecourseButtonStr);
        $(document).ready(function() {

            qrCode("qrcodeCanvas",baseUrlFrontDefault+"questiondetail.html?id="+data.result.question.id+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));
            localStorage.setItem("bgurl",localStorage.getItem("sharekno"));
            /*
            var url = Canvas2Image.convertToPNG($("canvas")[0],100,100).getAttribute('src');
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
                var detailDongtaiStr = '';
                //判断如果是图片则展示图片
                if(data.result.question.questionType == '1' && data.result.question.questionImage != null){//图片
                    detailDongtaiStr += '<div class="weui-feeds"><ul>'+getImage100Content(data.result.question.id,data.result.question.questionImage)+'</ul></div>';
                }else if(data.result.question.questionType == '2' && data.result.question.questionImage != null){//音频
                    //音频评论--隐藏原始播放器
                    //音频--隐藏原始播放器
                    detailDongtaiStr += '<div class="page-bd center bottom5"  onclick=start("audiotest'+data.result.question.id+'","'+checkPath(data.result.question.questionImage,'3')+'","shifenmiao'+data.result.question.id+'","audiostartA'+data.result.question.id+'","audioIconA'+data.result.question.id+'")>';
                    detailDongtaiStr += '<div class="audio"  style="margin: 0 auto;" >';
                    detailDongtaiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon" /></div>';
                    detailDongtaiStr += '<div style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">长按二维码收听</div>';
                    detailDongtaiStr += '</div>';
                    detailDongtaiStr += '<div class="disnone"><audio src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                    detailDongtaiStr += '</div>';
                }else if(data.result.question.questionType == '3' && data.result.question.questionImage != null){//视频
                    <!--视频播放-->

                    //视频--隐藏原始播放器
                    detailDongtaiStr += '<div class="page-bd-15" style="text-align: center;">';
                    detailDongtaiStr += '<img  src="'+ videoImagePath(data.result.question.questionImage)+'" id="fengmainimagebase64" style="width: 100%;">';
                    detailDongtaiStr += '</div>';


                }else if(data.result.question.questionType == '4' && data.result.question.questionImage != null){//文件
                    //文件评论--判断文件类型展示不同的图片
                    if(data.result.question.questionImage.search(".jpeg") != -1 || data.result.question.questionImage.search(".jpg") != -1 || data.result.question.questionImage.search(".png") != -1 || data.result.question.questionImage.search(".gif") != -1 || data.result.question.questionImage.search(".GIF") != -1 ){
                        detailDongtaiStr += '<div class="weui-feeds"><ul>'+getImage100Content(data.result.question.id,data.result.question.questionImage)+'</ul></div>';
                    }else if( data.result.question.questionImage.search(".mp4") != -1 || data.result.question.questionImage.search(".MP4") != -1 || data.result.question.questionImage.search(".flv")  != -1 || data.result.question.questionImage.search(".mov")  != -1 ){
                        //视频--隐藏原始播放器
                        detailDongtaiStr += '<div class="page-bd-15" style="text-align: center;">';
                        detailDongtaiStr += '<img  src="'+ videoImagePath(data.result.question.questionImage)+'" id="fengmainimagebase64" style="width: 100%;">';
                        detailDongtaiStr += '</div>';


                    }else if( data.result.question.questionImage.search(".MP3") != -1 || data.result.question.questionImage.search(".mp3") != -1 || data.result.question.questionImage.search(".wav")  != -1 || data.result.question.questionImage.search(".ogg")  != -1 ){
                        //音频--隐藏原始播放器
                        detailDongtaiStr += '<div class="page-bd center bottom5" onclick=start("audiotest'+data.result.question.id+'","'+checkPath(data.result.question.questionImage,'3')+'","shifenmiao'+data.result.question.id+'","audiostartA'+data.result.question.id+'","audioIconA'+data.result.question.id+'")>';
                        detailDongtaiStr += '<div class="audio" style="margin: 0 auto;"  >';
                        detailDongtaiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon"  /></div>';
                        detailDongtaiStr += '<div  style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">长按二维码收听</div>';
                        detailDongtaiStr += '</div>';
                        detailDongtaiStr += '<div class="disnone"><audio  src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                        detailDongtaiStr += '</div>';
                    }else{
                        detailDongtaiStr += '<div class="page-bd center bottom5 alignleft" style="text-align: center;"><a href="'+ checkPath(data.result.question.questionImage,'3')+'" target="_blank">文件:'+getFileName(data.result.question.questionImage)+'</a></div>';
                    }

                }else if(data.result.question.questionType == '5' && data.result.question.questionImage != null){
                    //红包评论
                    detailDongtaiStr += '<div class="weui-feeds"><img onclick=toHongBaoDetail("'+data.result.question.remarks+'","1");  width="173px" height="286px" src="'+ checkPath(data.result.question.questionImage,'1')+'"></div>';
                }
                //$("#sharedongtaicontent").html(detailDongtaiStr);
                //getBase64ImageInServeice(checkPath(data.result.question.questionImage,'1'),"fengmainimagebase64");
                if(data.result.user != null) {
                    getBase64ImageInServeice(checkPath(data.result.user.headimgurl, "1"), "headimagebase64");
                }

            }else{
                var detailDongtaiStr = '';
                //判断如果是图片则展示图片
                if(data.result.question.questionType == '1' && data.result.question.questionImage != null){//图片
                    detailDongtaiStr += '<div class="weui-feeds"><ul>'+getImage100Content(data.result.question.id,data.result.question.questionImage)+'</ul></div>';
                }else if(data.result.question.questionType == '2' && data.result.question.questionImage != null){//音频
                    //音频--隐藏原始播放器
                    //音频--隐藏原始播放器
                    detailDongtaiStr += '<div class="page-bd center bottom5"  onclick=start("audiotest'+data.result.question.id+'","'+checkPath(data.result.question.questionImage,'3')+'","shifenmiao'+data.result.question.id+'","audiostartA'+data.result.question.id+'","audioIconA'+data.result.question.id+'")>';
                    detailDongtaiStr += '<div class="audio" style="margin: 0 auto;"  >';
                    detailDongtaiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon" /></div>';
                    detailDongtaiStr += '<div style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">长按二维码收听</div>';
                    detailDongtaiStr += '</div>';
                    detailDongtaiStr += '<div class="disnone"><audio  src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                    detailDongtaiStr += '</div>';
                }else if(data.result.question.questionType == '3' && data.result.question.questionImage != null){//视频
                    <!--视频播放-->

                    //视频--隐藏原始播放器
                    detailDongtaiStr += '<div class="page-bd-15" style="text-align: center;">';
                    detailDongtaiStr += '<img  src="'+ videoImagePath(data.result.question.questionImage)+'" id="fengmainimagebase64" style="width: 100%;">';
                    detailDongtaiStr += '</div>';


                }else if(data.result.question.questionType == '4' && data.result.question.questionImage != null){//文件
                    //文件评论--判断文件类型展示不同的图片
                    if(data.result.question.questionImage.search(".jpeg") != -1 || data.result.question.questionImage.search(".jpg") != -1 || data.result.question.questionImage.search(".png") != -1 || data.result.question.questionImage.search(".gif") != -1 || data.result.question.questionImage.search(".GIF") != -1 ){
                        detailDongtaiStr += '<div class="weui-feeds"><ul>'+getImage100Content(data.result.question.id,data.result.question.questionImage)+'</ul></div>';
                    }else if( data.result.question.questionImage.search(".mp4") != -1 || data.result.question.questionImage.search(".MP4") != -1 || data.result.question.questionImage.search(".flv")  != -1 || data.result.question.questionImage.search(".mov")  != -1 ){
                        //视频--隐藏原始播放器
                        detailDongtaiStr += '<div class="page-bd-15" style="text-align: center;">';
                        detailDongtaiStr += '<img  src="'+ videoImagePath(data.result.question.questionImage)+'" id="fengmainimagebase64" style="width: 100%;">';
                        detailDongtaiStr += '</div>';


                    }else if( data.result.question.questionImage.search(".MP3") != -1 || data.result.question.questionImage.search(".mp3") != -1 || data.result.question.questionImage.search(".wav")  != -1 || data.result.question.questionImage.search(".ogg")  != -1 ){
                        //音频--隐藏原始播放器
                        detailDongtaiStr += '<div class="page-bd center bottom5"  onclick=start("audiotest'+data.result.question.id+'","'+checkPath(data.result.question.questionImage,'3')+'","shifenmiao'+data.result.question.id+'","audiostartA'+data.result.question.id+'","audioIconA'+data.result.question.id+'")>';
                        detailDongtaiStr += '<div class="audio" style="margin: 0 auto;"  >';
                        detailDongtaiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon" /></div>';
                        detailDongtaiStr += '<div  style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">长按二维码收听</div>';
                        detailDongtaiStr += '</div>';
                        detailDongtaiStr += '<div class="disnone"><audio  src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                        detailDongtaiStr += '</div>';
                    }else{
                        detailDongtaiStr += '<div class="page-bd center bottom5 alignleft" style="text-align: center;"><a href="'+ checkPath(data.result.question.questionImage,'3')+'" target="_blank">文件:'+getFileName(data.result.question.questionImage)+'</a></div>';
                    }

                }else if(data.result.question.questionType == '5' && data.result.question.questionImage != null){
                    //红包评论
                    detailDongtaiStr += '<div class="weui-feeds"><img onclick=toHongBaoDetail("'+data.result.question.remarks+'","1");  width="173px" height="286px" src="'+ checkPath(data.result.question.questionImage,'1')+'"></div>';
                }
                //$("#sharedongtaicontent").html(detailDongtaiStr);

            }
            isguanzhu();//是否关注
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


//daan详情渲染-
function detailAnswerRender(data){
    if(data.code == '0'){
        $("title").html(data.result.question.questionTitle);
        var detailcourseStr = '';
        detailcourseStr += '';

        detailcourseStr += '<div class="weui-c-content" >';


        detailcourseStr += '<h2 class="weui-c-title bottom5 " onclick=toQuestionDetail("'+data.result.question.id+'","1")>'+data.result.question.questionTitle+'<span class="slogan f-blue">查看全部回答</span></h2>';
        if((GetUrlString("share") == null || GetUrlString("share") == '')  && data.result.isHuiYuan == '1') {
            detailcourseStr += '<h2 class="bottom5 f14 f-red">' + setNULL(data.result.question.questionSharetitle) + '</h2>';
        }

        detailcourseStr += '<div class="weui-c-meta bottom5" style="float: left;width: 70%;">';
        detailcourseStr += '<div class="weui-c-meta bottom5">';
        detailcourseStr += '<span class="weui-c-nickname">';
        detailcourseStr += '<div class="weui-news-infoitem"  onclick=toUserHome("'+data.result.question.createBy.id+'","1")>';
        detailcourseStr += '<img src="'+ checkPath(data.result.question.createBy.headimgurl,'1')+'" class="weui-news-round">';
        detailcourseStr += '<span class="weui-news-left f-blue f16import">'+data.result.question.createBy.nickname+'</span>';
        detailcourseStr += '</div>';
        detailcourseStr += '</span>';
        detailcourseStr += '<em class="weui-c-nickname">'+timeago(data.result.question.createDate)+'</em>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '<div style="float: left;width: 30%;line-height: 40px;">';
        $("#guanzhuId").val(data.result.question.createBy.id);
        detailcourseStr += '<div style="width: 100%;text-align: right;">';
        detailcourseStr += '<label class="weui-label-s b-orange  f-white f12"  id="bgguanzhu" onclick=saveNRguanzhu() style="padding: 0.2em; margin-left: 10px;background-color:#ef4f4f !important;border: 1px solid #ef4f4f !important;color: white !important;;"><i class="beauty icon-xiai f-white f16 " id="gz">关注</i></label>';
        detailcourseStr += '</div>';
        detailcourseStr += '</div>';
        detailcourseStr += '<div class="clear"></div>';
        detailcourseStr += '<div class="weui-comment-reply top00">';
        if(GetUrlString('share') != null){//是否是推广链接
            if(data.result.question.questionPrice != null && data.result.question.questionPrice > 0 &&   data.result.question.isLowprice == '1'){
                detailcourseStr += '<div class="nickname f-red" onclick=toHongBaoDetail("'+data.result.hongbaoId+'","1") >红包赏金￥'+data.result.question.questionPrice+'<i class="left15 beauty icon-hongbao f-white f14   anniushadow2 "  >点我领红包</i> <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.question.lowpriceStart,format='MM-DD')+'至'+formatDate(data.result.question.lowpriceEnd,format='MM-DD')+']</span> </div>';

            }else if(data.result.question.questionPrice != null && data.result.question.questionPrice > 0 && data.result.question.isGaoyongjin == '1'){
                detailcourseStr += '<div class="nickname f-red" onclick=toHongBaoDetail("'+data.result.hongbaoId+'","1") >红包赏金￥'+data.result.question.questionPrice+'<i class="left15 beauty icon-hongbao f-white f14   anniushadow2 "  >点我领红包</i> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';
            }else if(data.result.question.questionPrice != null && data.result.question.questionPrice > 0 ){
                detailcourseStr += '<div class="nickname f-red" onclick=toHongBaoDetail("'+data.result.hongbaoId+'","1") >红包赏金￥'+data.result.question.questionPrice+'<i class="left15 beauty icon-hongbao f-white f14   anniushadow2 "  >点我领红包</i>  <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;"></span></div>';
            }else{
                //detailcourseStr += '<div class="nickname f-red f12">本篇文章可免费阅读，感谢作者分享</div>';
            }
        }else{
            if(data.result.question.questionPrice != null && data.result.question.questionPrice > 0 &&   data.result.question.isLowprice == '1'){
                detailcourseStr += '<div class="nickname f-red" onclick=toHongBaoDetail("'+data.result.hongbaoId+'","1") >红包赏金￥'+data.result.question.questionPrice+'<i class="left15 beauty icon-hongbao f-white f14   anniushadow2 "  >点我领红包</i> <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.question.lowpriceStart,format='MM-DD')+'至'+formatDate(data.result.question.lowpriceEnd,format='MM-DD')+']</span> ';
                if(eval(data.result.yongjin) > 0.00 && data.result.isHuiYuan == '1'){
                    detailcourseStr += '<span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">会员佣金￥'+data.result.yongjin+'</span>';
                }


                detailcourseStr += '</div>';


            }else if(data.result.question.questionPrice != null && data.result.question.questionPrice > 0 && data.result.question.isGaoyongjin == '1'){
                if(data.result.isHuiYuan == '1'){
                    detailcourseStr += '<div class="nickname f-red">限时高佣金(会员)￥'+data.result.yongjin+'  <span style="color:gray ;font-size: 12px;">['+formatDate(data.result.question.gaoyongjinStart,format='MM-DD')+'至'+formatDate(data.result.question.gaoyongjinEnd,format='MM-DD')+']</span> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">红包赏金￥'+data.result.question.questionPrice+'<i class="left15  beauty icon-hongbao f-white f14   anniushadow2 "  >点我领红包</i> </span></div>';

                }else{
                    detailcourseStr += '<div class="nickname f-red"> <span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">红包赏金￥'+data.result.question.questionPrice+'<i class="left15 beauty icon-hongbao f-white f14   anniushadow2 "  >点我领红包</i> </span></div>';

                }
            }else if(data.result.question.questionPrice != null && data.result.question.questionPrice > 0 ){
                detailcourseStr += '<div class="nickname f-red" onclick=toHongBaoDetail("'+data.result.hongbaoId+'","1")  >红包赏金￥'+data.result.question.questionPrice+' <i class="left15 beauty icon-hongbao f-white f14   anniushadow2 "  >点我领红包</i>  ';
                if(eval(data.result.yongjin) > 0.00 && data.result.isHuiYuan == '1'){
                    detailcourseStr += '<span style="color: #ef4f4f;text-decoration:none;font-size: 12px;">会员佣金￥'+data.result.yongjin+'</span>';
                }
                detailcourseStr += '</div>';
            }else{
                //detailcourseStr += '<div class="nickname f-red f12">本活动可免费参与，感谢作者分享</div>';
            }
        }


        //detailcourseStr += '<p class="time subtext">'+data.result.question.questionLabel+'</p>';





        detailcourseStr += '</div>';
        detailcourseStr += '<div class="weui-c-article">';

        if('0' == '0'){
            if(data.result.question.questionImage != null){
                //文件评论--判断文件类型展示不同的图片
                if(data.result.question.questionImage.search(".jpeg") != -1 || data.result.question.questionImage.search(".jpg") != -1 || data.result.question.questionImage.search(".png") != -1 || data.result.question.questionImage.search(".gif") != -1 || data.result.question.questionImage.search(".GIF") != -1 ){
                    detailcourseStr += '<div class="weui-feeds"><ul>'+getImage100Content(data.result.question.id,data.result.question.questionImage)+'</ul></div>';
                }else if( data.result.question.questionImage.search(".mp4") != -1 || data.result.question.questionImage.search(".MP4") != -1 || data.result.question.questionImage.search(".flv")  != -1 || data.result.question.questionImage.search(".mov")  != -1 ){
                    //视频评论--隐藏原始播放器

                    detailcourseStr += '<div class="page-bd"><div class="weui-c-article">';
                    detailcourseStr += '<div id="dplayer2'+data.result.question.id+'"></div>';
                    detailcourseStr += '<script type="text/javascript">';
                    detailcourseStr += 'const dp2'+data.result.question.id+' = new DPlayer({container: document.getElementById("dplayer2'+data.result.question.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(data.result.question.questionImage,"3")+'\', pic: \''+videoImagePath(data.result.question.questionImage)+'\'}});';
                    detailcourseStr += '</script>';
                    detailcourseStr += '</div></div>';


                }else if( data.result.question.questionImage.search(".MP3") != -1 || data.result.question.questionImage.search(".mp3") != -1 || data.result.question.questionImage.search(".wav")  != -1 || data.result.question.questionImage.search(".ogg")  != -1 ){
                    //音频--隐藏原始播放器
                    detailcourseStr += '<div class="page-bd center bottom5" id="audiostartA'+data.result.question.id+'" onclick=start("audiotest'+data.result.question.id+'","'+checkPath(data.result.question.questionImage,'3')+'","shifenmiao'+data.result.question.id+'","audiostartA'+data.result.question.id+'","audioIconA'+data.result.question.id+'")>';
                    detailcourseStr += '<div class="audio"   >';
                    detailcourseStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon"  id="audioIconA'+data.result.question.id+'"/></div>';
                    detailcourseStr += '<div id="shifenmiao'+data.result.question.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                    detailcourseStr += '</div>';
                    detailcourseStr += '<div class="disnone"><audio id="audiotest'+data.result.question.id+'" src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                    detailcourseStr += '</div>';
                }else{
                    detailcourseStr += '<div class="page-bd center bottom5 alignleft" ><a href="'+ checkPath(data.result.question.questionImage,'3')+'" target="_blank">'+setNULL(getFileName(data.result.question.questionImage))+'</a></div>';
                }
            }
            detailcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
            if(data.result.question.isZiying != null && data.result.question.isZiying != ''){
                if(data.result.question.isZiying == '1'){
                    detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
                }

            }

            if((GetUrlString("share") == null || GetUrlString("share") == '')  && data.result.isHuiYuan == '1' ){
                if(data.result.question.questionJiesuan != null && data.result.question.questionJiesuan != ''){
                    detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.question.questionJiesuan+'</label>';
                }
            }

            if(data.result.question.questionLabel != null && data.result.question.questionLabel != ''){
                var str = data.result.question.questionLabel; //这是一字符串
                var strs= new Array(); //定义一数组
                strs=str.split("/"); //字符分割
                for (i=0;i<strs.length ;i++ )
                {
                    detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
                }

            }





            detailcourseStr += '</div>';


            if((GetUrlString("share") == null || GetUrlString("share") == '')  && data.result.isHuiYuan == '1' ){
                detailcourseStr += '<p>'+setNULL(data.result.question.questionSharecontent)+'</p>';
            }
            /*detailcourseStr += '<p>'+data.result.question.questionContent+'</p>';*/

            /*detailcourseStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick=mydongtaiwdhd();>';

            detailcourseStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>去回答<span class="slogan f-white">￥'+setNum(data.result.question.questionPrice)+'</span></a>';*/

        }else{
            $("#buyandshare").hide();
            $("#share").show();
            if(data.result.question.questionImage != null){

                //文件评论--判断文件类型展示不同的图片
                if(data.result.question.questionImage.search(".jpeg") != -1 || data.result.question.questionImage.search(".jpg") != -1 || data.result.question.questionImage.search(".png") != -1 || data.result.question.questionImage.search(".gif") != -1 || data.result.question.questionImage.search(".GIF") != -1 ){
                    detailcourseStr += '<div class="weui-feeds"><ul>'+getImage100Content(data.result.question.id,data.result.question.questionImage)+'</ul></div>';
                }else if( data.result.question.questionImage.search(".mp4") != -1 || data.result.question.questionImage.search(".MP4") != -1 || data.result.question.questionImage.search(".flv")  != -1 || data.result.question.questionImage.search(".mov")  != -1 ){
                    //视频评论--隐藏原始播放器

                    detailcourseStr += '<div class="page-bd"><div class="weui-c-article">';
                    detailcourseStr += '<div id="dplayer2'+data.result.question.id+'"></div>';
                    detailcourseStr += '<script type="text/javascript">';
                    detailcourseStr += 'const dp2'+data.result.question.id+' = new DPlayer({container: document.getElementById("dplayer2'+data.result.question.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(data.result.question.questionImage,"3")+'\', pic: \''+videoImagePath(data.result.question.questionImage)+'\'}});';
                    detailcourseStr += '</script>';
                    detailcourseStr += '</div></div>';


                }else if( data.result.question.questionImage.search(".MP3") != -1 || data.result.question.questionImage.search(".mp3") != -1 || data.result.question.questionImage.search(".wav")  != -1 || data.result.question.questionImage.search(".ogg")  != -1 ){
                    //音频--隐藏原始播放器
                    detailcourseStr += '<div class="page-bd center bottom5" id="audiostartA'+data.result.question.id+'" onclick=start("audiotest'+data.result.question.id+'","'+checkPath(data.result.question.questionImage,'3')+'","shifenmiao'+data.result.question.id+'","audiostartA'+data.result.question.id+'","audioIconA'+data.result.question.id+'")>';
                    detailcourseStr += '<div class="audio"   >';
                    detailcourseStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon"  id="audioIconA'+data.result.question.id+'"/></div>';
                    detailcourseStr += '<div id="shifenmiao'+data.result.question.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                    detailcourseStr += '</div>';
                    detailcourseStr += '<div class="disnone"><audio id="audiotest'+data.result.question.id+'" src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                    detailcourseStr += '</div>';
                }else{
                    detailcourseStr += '<div class="page-bd center bottom5 alignleft" ><a href="'+ checkPath(data.result.question.questionImage,'3')+'" target="_blank">'+setNULL(getFileName(data.result.question.questionImage))+'</a></div>';
                }


            }

            detailcourseStr += '<div class="weui-label-list" style="margin-left: 0px;">';
            if(data.result.question.isZiying != null && data.result.question.isZiying != ''){
                if(data.result.question.isZiying == '1'){
                    detailcourseStr += '<label class="label f-red b-red  f13">自营</label>';
                }

            }

            if((GetUrlString("share") == null || GetUrlString("share") == '') && data.result.isHuiYuan == '1' ){
                if(data.result.question.questionJiesuan != null && data.result.question.questionJiesuan != ''){
                    detailcourseStr += '<label class="label f-red b-red  f13">结算时间:'+data.result.question.questionJiesuan+'</label>';
                }
            }

            if(data.result.question.questionLabel != null && data.result.question.questionLabel != ''){
                var str = data.result.question.questionLabel; //这是一字符串
                var strs= new Array(); //定义一数组
                strs=str.split("/"); //字符分割
                for (i=0;i<strs.length ;i++ )
                {
                    detailcourseStr += '<label class="label f-red b-red  f13">'+strs[i]+'</label>';
                }

            }





            detailcourseStr += '</div>';

            if((GetUrlString("share") == null || GetUrlString("share") == '') && data.result.isHuiYuan == '1' ){
                detailcourseStr += '<p>'+setNULL(data.result.question.questionSharecontent)+'</p>';
            }
           /* detailcourseStr += '<p>'+data.result.question.questionContent+'</p>';*/

        }












        detailcourseStr += '</div>';

        detailcourseStr += '</div>';



        detailcourseStr += '<div class="weui-c-tools">';
        detailcourseStr += '<a class="disnone"  href="javascript:dashang();"><i class="icon icon-42 weui-tabbar__icon" id="dashangicon"></i>打赏</a>';
/*
        detailcourseStr += '<a onclick=zhuanfa("2","'+data.result.answer.id+'","'+data.result.answer.createBy.id+'","8");><i class="icon icon-5 weui-tabbar__icon" id="dashangicon"></i>转发</a>';
*/
        detailcourseStr += '<div class="weui-c-readnum">阅读<span id="readnum">'+setNum(data.result.answer.answerDianjiliang)+'</span></div>';
        detailcourseStr += '<div class="weui-comment-li" style="float: right;">';
        detailcourseStr += '<span  onclick=dianji("8","'+data.result.answer.id+'"); class="check checked"> <i class="weui-comment-icon"></i> <span class="weui-comment-num" id="zan'+data.result.answer.id+'">'+setNum(data.result.answer.answerZan)+'</span> </span>';
        detailcourseStr += '<span class="check checked disnone" onclick=openCommentList("commentDisList","2","1",10,"'+data.result.answer.id+'","8","'+data.result.answer.createBy.id+'");> <i class="icon icon-79 weui-tabbar__icon" id="icon30"></i> <span class="weui-comment-num">'+setNum(data.result.answer.commentNum)+'</span> </span>';


        detailcourseStr += '</div>';

        detailcourseStr += '</div>';
        /*分享参数*/
        detailcourseStr += '<input type="hidden" id="id" value="'+data.result.answer.id+'">';
        detailcourseStr += '<input type="hidden" id="shareType" value="7">';
        detailcourseStr += '<input type="hidden" id="shareTitle" value="'+data.result.answer.questionTitle+'">';

        detailcourseStr += '<input type="hidden" id="shareImage" value="'+checkPath(data.result.question.questionImage,'1')+'">';


        detailcourseStr += '<input type="hidden" id="orderMoney" value="0">';
        detailcourseStr += '<input type="hidden" id="orderNum" value="1">';
        detailcourseStr += '<input type="hidden" id="orderType" value="12">';
        detailcourseStr += '<input type="hidden" id="orderDashangType" value="13">';
        detailcourseStr += '<input type="hidden" id="orderTitle" value="'+data.result.question.questionTitle+'">';
        detailcourseStr += '<input type="hidden" id="orderAboutid" value="'+data.result.answer.id+'">';



        detailcourseStr += '<div class="weui-loadmore weui-loadmore_line">';
        detailcourseStr += '<span class="weui-loadmore__tips">答案内容详情</span>';
        detailcourseStr += '</div>';


        detailcourseStr += '<div class="top50">';
        if(data.result.answer.createBy.id == localStorage.getItem("userId") || data.result.isBuy == '1'){

            detailcourseStr += '<div class="page-bd" >';


            //链接

            if(data.result.answer.contentType == '1' && data.result.answer.answerFile != null){
                detailcourseStr += '<div class="weui-feeds">';
                detailcourseStr += '<ul>';
                //图片
                detailcourseStr += getImage100Content(data.result.id,data.result.answer.answerFile);
                detailcourseStr += '</ul>';
                detailcourseStr += '</div>';
            }
            else if(data.result.answer.contentType == '2' && data.result.answer.answerFile != null){
                //音频--隐藏原始播放器
                detailcourseStr += '<div class="page-bd center" id="audiostartA'+data.result.id+'" onclick=start("audiotest'+data.result.id+'","'+checkPath(data.result.answer.answerFile,'3')+'","shifenmiao'+data.result.id+'","audiostartA'+data.result.id+'","audioIconA'+data.result.id+'")>';
                detailcourseStr += '<div class="audio"   >';
                detailcourseStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+data.result.id+'"/></div>';
                detailcourseStr += '<div id="shifenmiao'+data.result.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                detailcourseStr += '</div>';
                detailcourseStr += '<div class="disnone"><audio id="audiotest'+data.result.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
                detailcourseStr += '</div>';



            }
            else if(data.result.answer.contentType == '3' && data.result.answer.answerFile != null){

                //视频--隐藏原始播放器

                <!--视频播放-->
                detailcourseStr += '<div class="page-bd"><div class="weui-c-article">';
                detailcourseStr += '<div id="dplayer2'+data.result.id+'" ></div>';
                detailcourseStr += '<script type="text/javascript">';
                detailcourseStr += 'const dp2'+data.result.id+' = new DPlayer({container: document.getElementById("dplayer2'+data.result.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(data.result.answer.answerFile,"3")+'\', pic: \''+videoImagePath(data.result.answer.answerFile)+'\'}});';

                detailcourseStr += '</script>';
                detailcourseStr += '</div></div>';

            }
            else if(data.result.answer.contentType == '4' && data.result.answer.answerFile != null){
                //文件--判断文件类型展示不同的图片
                if(data.result.answer.answerFile.search(".jpeg") != -1 || data.result.answer.answerFile.search(".jpg") != -1 || data.result.answer.answerFile.search(".png") != -1 || data.result.answer.answerFile.search(".gif") != -1 || data.result.answer.answerFile.search(".GIF") != -1 ){
                    detailcourseStr += getImage100Content(data.result.id,data.result.answer.answerFile);
                }else if( data.result.answer.answerFile.search(".mp4") != -1 || data.result.answer.answerFile.search(".MP4") != -1 || data.result.answer.answerFile.search(".flv")  != -1 || data.result.answer.answerFile.search(".mov")  != -1 ){
                    <!--视频播放-->
                    //if(getBrowser() != 'wxmobile'){
                    detailcourseStr += '<div class="page-bd"><div class="weui-c-article">';
                    detailcourseStr += '<div id="dplayer2'+data.result.id+'"></div>';
                    detailcourseStr += '<script type="text/javascript">';
                    detailcourseStr += 'const dp2'+data.result.id+' = new DPlayer({container: document.getElementById("dplayer2'+data.result.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(data.result.answer.answerFile,"3")+'\', pic: \''+videoImagePath(data.result.answer.answerFile)+'\'}});';
                    detailcourseStr += '</script>';
                    detailcourseStr += '</div></div>';

                }else if( data.result.answer.answerFile.search(".MP3") != -1 || data.result.answer.answerFile.search(".mp3") != -1 || data.result.answer.answerFile.search(".wav")  != -1 || data.result.answer.answerFile.search(".ogg")  != -1 ){
                    //音频--隐藏原始播放器
                    detailcourseStr += '<div class="page-bd center" id="audiostartA'+data.result.id+'" onclick=start("audiotest'+data.result.id+'","'+checkPath(data.result.answer.answerFile,'3')+'","shifenmiao'+data.result.id+'","audiostartA'+data.result.id+'","audioIconA'+data.result.id+'")>';
                    detailcourseStr += '<div class="audio"   >';
                    detailcourseStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+data.result.id+'"/></div>';
                    detailcourseStr += '<div id="shifenmiao'+data.result.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                    detailcourseStr += '</div>';
                    detailcourseStr += '<div class="disnone"><audio id="audiotest'+data.result.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
                    detailcourseStr += '</div>';
                }else{
                    detailcourseStr += '<a href="'+ checkPath(data.result.answer.answerFile,'3')+'" target="_blank">'+setNULL(getFileName(data.result.answer.answerFile))+'</a>';

                }
            }

            detailcourseStr += '</div>';

        }else{
            detailcourseStr += '<div class="page-bd" style="text-align: center" >';


            //链接
//链接

            if(data.result.answer.contentType == '1' && data.result.answer.answerFile != null){
                detailcourseStr += '<div class="weui-feeds">';
                detailcourseStr += '<ul>';
                //图片
                detailcourseStr += '<p>答案内容类型：图片 + 文字</p>';

                detailcourseStr += getImage100Content(data.result.id,data.result.answer.answerFile);
                detailcourseStr += '</ul>';
                detailcourseStr += '</div>';
            }
            else if(data.result.answer.contentType == '2' && data.result.answer.answerFile != null){
                //音频--隐藏原始播放器
                detailcourseStr += '<div class="page-bd center" id="audiostartA'+data.result.id+'" >';
                detailcourseStr += '<div class="audio"   >';
                detailcourseStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+data.result.id+'"/></div>';
                detailcourseStr += '<div id="shifenmiao'+data.result.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我围观</div>';
                detailcourseStr += '</div>';
                detailcourseStr += '<div class="disnone"><audio id="audiotest'+data.result.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
                detailcourseStr += '</div>';



            }
            else if(data.result.answer.contentType == '3' && data.result.answer.answerFile != null){

                //视频--隐藏原始播放器
                detailcourseStr += '<p>答案内容类型：视频 + 文字</p>';
                <!--视频播放-->
                /*detailcourseStr += '<div class="page-bd"><div class="weui-c-article">';
                detailcourseStr += '<div id="dplayer2'+data.result.id+'" ></div>';
                detailcourseStr += '<script type="text/javascript">';
                detailcourseStr += 'const dp2'+data.result.id+' = new DPlayer({container: document.getElementById("dplayer2'+data.result.id+'"), screenshot: true, autoplay:false,preload:\'none\', video: {url: \''+checkPath(data.result.answer.answerFile,"3")+'\', pic: \''+videoImagePath(data.result.answer.answerFile)+'\'}});';

                detailcourseStr += '</script>';
                detailcourseStr += '</div></div>';*/

            }
            else if(data.result.answer.contentType == '4' && data.result.answer.answerFile != null){
                //文件--判断文件类型展示不同的图片
                if(data.result.answer.answerFile.search(".jpeg") != -1 || data.result.answer.answerFile.search(".jpg") != -1 || data.result.answer.answerFile.search(".png") != -1 || data.result.answer.answerFile.search(".gif") != -1 || data.result.answer.answerFile.search(".GIF") != -1 ){
                    detailcourseStr += '答案内容类型：图片 + 文字';
                }else if( data.result.answer.answerFile.search(".mp4") != -1 || data.result.answer.answerFile.search(".MP4") != -1 || data.result.answer.answerFile.search(".flv")  != -1 || data.result.answer.answerFile.search(".mov")  != -1 ){
                    <!--视频播放-->
                    //if(getBrowser() != 'wxmobile'){
                    detailcourseStr += '<p>答案内容类型：视频 + 文字</p>';

                }else if( data.result.answer.answerFile.search(".MP3") != -1 || data.result.answer.answerFile.search(".mp3") != -1 || data.result.answer.answerFile.search(".wav")  != -1 || data.result.answer.answerFile.search(".ogg")  != -1 ){
                    //音频--隐藏原始播放器
                    detailcourseStr += '<div class="page-bd center" id="audiostartA'+data.result.id+'" onclick=start("audiotest'+data.result.id+'","'+checkPath(data.result.answer.answerFile,'3')+'","shifenmiao'+data.result.id+'","audiostartA'+data.result.id+'","audioIconA'+data.result.id+'")>';
                    detailcourseStr += '<div class="audio"   >';
                    detailcourseStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon " id="audioIconA'+data.result.id+'"/></div>';
                    detailcourseStr += '<div id="shifenmiao'+data.result.id+'" style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">点我收听</div>';
                    detailcourseStr += '</div>';
                    detailcourseStr += '<div class="disnone"><audio id="audiotest'+data.result.id+'" src=""  controls="controls" preload="meta"> </audio></div>';
                    detailcourseStr += '</div>';
                }else{
                    detailcourseStr += '<p>答案内容类型：文件 + 文字</p>';

                }
            }
            detailcourseStr += '<a  class="weui-btn weui-btn_mini weui-btn_primary" onclick=openPay("问答围观","寻找你要的答案","","","1","0","'+data.result.question.questionTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","12","","0","0","'+data.result.isHuiYuan+'","'+data.result.answer.id+'","'+data.result.answer.createBy.id+'");>';
            detailcourseStr += '<i class="icon icon-116 weui-tabbar__icon f12" id="iconshare"></i>围观后可查看详细内容<span class="slogan f-white">￥'+setNum(data.result.answer.answerPrice)+'</span></a>';

            detailcourseStr += '</div>';
        }
        detailcourseStr += '<p>'+data.result.answer.answerContent+'</p>';

        detailcourseStr += '</div>';

        $("#detailcourse").html(detailcourseStr);

        <!--购买-分享-->
        var detailcourseButtonStr = '';
        if(1==2 && data.result.answer.answerPrice != null && data.result.answer.answerPrice > 0.00  && data.result.isBuy == '0' && GetUrlString('share') == null){//不是分享
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
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("问答围观","寻找你要的答案","","","1","0","'+data.result.question.questionTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","12","","0","0","'+data.result.isHuiYuan+'","'+data.result.answer.id+'","'+data.result.answer.createBy.id+'");>';

            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon" id="iconshare"></i>围观<span class="slogan f-white">￥'+setNum(data.result.answer.answerPrice)+'</span></a>';


            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '<div class="fixedbtn23">';
            detailcourseButtonStr += '<a href="javascript:;" class="fenge">|</a>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '</div>';
        }else if(1==2 && data.result.answer.answerPrice != null && data.result.answer.answerPrice > 0.00  && data.result.isBuy == '0' && GetUrlString('share') != null){//分享未购买
            detailcourseButtonStr += '<div id="buyandshare">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn buttonred" onclick=openPay("问答围观","寻找你要的答案","","","1","0","'+data.result.question.questionTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","12","","0","0","'+data.result.isHuiYuan+'","'+data.result.answer.id+'","'+data.result.answer.createBy.id+'");>';

            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon " id="iconshare"></i>围观<span class="slogan f-white">￥'+setNum(data.result.answer.answerPrice)+'</span></a>';
            detailcourseButtonStr += '</div>';


            detailcourseButtonStr += '</div>';
        }else if(1==2 && data.result.answer.answerPrice != null && data.result.answer.answerPrice > 0 ){//已购买
            detailcourseButtonStr += '<div id="buyandshare">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';

            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon " id="iconshare"></i>分享';

            if(eval(data.result.yongjin) > 0.00){
                detailcourseButtonStr += '<span class="slogan f-white">￥'+data.result.yongjin+'</span>';
            }

            detailcourseButtonStr += '</a>';

            detailcourseButtonStr += '</div>';


            detailcourseButtonStr += '</div>';


        }else{//免费
            /*detailcourseButtonStr += '<div id="buyandshare">';
            detailcourseButtonStr += '<div class="fixedbtn24">';
            detailcourseButtonStr += '<a href="javascript:shareJiajia();" class="weui-btn weui-btn_primary mybtn buttonred" >';

            detailcourseButtonStr += '<i class="icon icon-116 weui-tabbar__icon " id="iconshare"></i>分享';


            detailcourseButtonStr += '</a>';

            detailcourseButtonStr += '</div>';


            detailcourseButtonStr += '</div>';*/

            detailcourseButtonStr += '<div class="fixedbtn24 dibu1" >';
            if(data.result.isBuy == '1'){
                detailcourseButtonStr += '<div class="dibu2" onclick=openPay("问答围观","寻找你要的答案","","","1","0","'+data.result.question.questionTitle.replace(/\s*/g,"")+'","","'+data.result.price+'","'+data.result.price+'","12","","0","0","'+data.result.isHuiYuan+'","'+data.result.answer.id+'","'+data.result.answer.createBy.id+'");>';
                detailcourseButtonStr += '<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" style="line-height: 50px;font-size: 16px;width: 100%;border-radius: 0px;"><i class="icon icon-64 weui-tabbar__icon" id="iconshare"></i>围观</a>';
                detailcourseButtonStr += '</div>';
            }else{
                detailcourseButtonStr += '<div class="dibu2" onclick=openCommentSave("commentDisList","'+data.result.answer.id+'","8","'+data.result.answer.createBy.id+'");>';
                detailcourseButtonStr += '<div style="line-height: 50px;text-align: center;font-size: 14px;">写评论…</div>';
                detailcourseButtonStr += '</div>';
            }
            detailcourseButtonStr += '<div class="dibu3" >';


            detailcourseButtonStr += '<div onclick=openCommentList("commentDisList","2","1",10,"'+data.result.answer.id+'","8","'+data.result.answer.createBy.id+'"); class="dibu4">';

            if(setNum(data.result.answer.commentNum) > 0){

                detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"><span class="weui-badge" style="position: absolute;top: .25em;right: -.4em;">'+setNum(data.result.answer.commentNum)+'</span></i>';
            }else{
                detailcourseButtonStr += '<i class="icon icon-80 weui-tabbar__icon" id="iconshare1"></i>';
            }

            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div onclick=dianji("8","'+data.result.answer.id+'"); class="dibu4">';
            detailcourseButtonStr += '<i class="icon icon-65 weui-tabbar__icon" id="iconshare2"></i>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div onclick=dashang(); class="dibu4">';
            detailcourseButtonStr += '<i class="icon icon-43 weui-tabbar__icon" id="iconshare3"></i>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '<div class="dibu45" onclick=shareJiajia(); >';
            detailcourseButtonStr += '<i class="icon icon-41 weui-tabbar__icon" id="iconshare4"><span class="weui-badge" style="position: absolute;top: .25em;right: -1em;">赚</span></i>';
            detailcourseButtonStr += '</div>';

            detailcourseButtonStr += '</div>';
            detailcourseButtonStr += '</div>';
        }
        $("body").append(detailcourseButtonStr);

        //分享内容
        var sharecourseButtonStr = '';
        sharecourseButtonStr += '<div class="disnone">';
        sharecourseButtonStr += '<center>';
        sharecourseButtonStr += '<div id="qrcodeCanvas"></div>';
        sharecourseButtonStr += '</center>';
        sharecourseButtonStr += '</div>';
        sharecourseButtonStr += '<div id="sharecontent" class="disnone" style="width: 100%;margin-bottom: 50px;background-image: url('+checkPathBackGroubdImage(localStorage.getItem("sharekno"))+');background-repeat:no-repeat;background-size:cover;">';
        sharecourseButtonStr += '<div class="page-bd-15 " style="text-align: left;">';
        sharecourseButtonStr += '<div style="height: 400px;"></div>';

        sharecourseButtonStr += '<h4 class="weui-c-title bottom5 f-white" >'+data.result.question.questionTitle+'</h4>';
        sharecourseButtonStr += '<div style="word-break:break-all;color:#3e3e3e;"><p class="time f14"  id="fenxiangneirong"></p></div>';
/*
        //付费时候
        if(data.result.answer.answerPrice != null && data.result.answer.answerPrice > 0.00){
            sharecourseButtonStr += '<div class="nickname f-red"> 围观￥'+data.result.answer.answerPrice+'</div>';
        }*/

        sharecourseButtonStr += '</div>';
/*
        if(data.result.question.questionImage != null && data.result.question.questionImage != ''){
            sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
            sharecourseButtonStr += '<span class="weui-loadmore__tips">封面</span>';
            sharecourseButtonStr += '</div>';
        }*/




      /*  //判断如果是图片则展示图片
        sharecourseButtonStr += '<div id="sharedongtaicontent"  style="text-align: center;">';
        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center;">';
        sharecourseButtonStr += '<img  src="" id="fengmainimagebase64" style="width: 100%;">';
        sharecourseButtonStr += '</div>';
        sharecourseButtonStr += '</div>';*/



        sharecourseButtonStr += '<div class="weui-loadmore weui-loadmore_line">';
        sharecourseButtonStr += '<span class="weui-loadmore__tips">扫码或长按识别查看精彩内容</span>';
        sharecourseButtonStr += '</div>';


        sharecourseButtonStr += '<div class="page-bd-15" style="text-align: center">';

        sharecourseButtonStr += '<div style="width: 100%;text-align: center;">';
        sharecourseButtonStr += '<img id="tothis" src="" style="width:30%;">';
        sharecourseButtonStr += '</div>';

        /*sharecourseButtonStr += '<div style="width: 100%;text-align: center;margin-top: -70px;">';
        if(data.result.user != null) {
            sharecourseButtonStr += '<img src="' + checkPath(data.result.user.headimgurl, "1") + '" id="headimagebase64" height="25px" width="25px" style="border-radius: 5px;"/>';
        }
        sharecourseButtonStr += '</div>';*/

        sharecourseButtonStr += '</div>';

        sharecourseButtonStr += '<div style="height: 40px;"></div>';
        sharecourseButtonStr += '</div>';

        $("body").prepend(sharecourseButtonStr);
        $(document).ready(function() {

            qrCode("qrcodeCanvas",baseUrlFrontDefault+"answerdetail.html?id="+data.result.question.id+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));
            localStorage.setItem("bgurl",localStorage.getItem("sharekno"));
        /*    var url = Canvas2Image.convertToPNG($("canvas")[0],100,100).getAttribute('src');
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
                var detailDongtaiStr = '';
                //判断如果是图片则展示图片
                if(data.result.question.questionType == '1' && data.result.question.questionImage != null){//图片
                    detailDongtaiStr += '<div class="weui-feeds"><ul>'+getImage100Content(data.result.question.id,data.result.question.questionImage)+'</ul></div>';
                }else if(data.result.question.questionType == '2' && data.result.question.questionImage != null){//音频
                    //音频评论--隐藏原始播放器
                    //音频--隐藏原始播放器
                    detailDongtaiStr += '<div class="page-bd center bottom5"  onclick=start("audiotest'+data.result.question.id+'","'+checkPath(data.result.question.questionImage,'3')+'","shifenmiao'+data.result.question.id+'","audiostartA'+data.result.question.id+'","audioIconA'+data.result.question.id+'")>';
                    detailDongtaiStr += '<div class="audio"  style="margin: 0 auto;" >';
                    detailDongtaiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon" /></div>';
                    detailDongtaiStr += '<div style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">长按二维码收听</div>';
                    detailDongtaiStr += '</div>';
                    detailDongtaiStr += '<div class="disnone"><audio src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                    detailDongtaiStr += '</div>';
                }else if(data.result.question.questionType == '3' && data.result.question.questionImage != null){//视频
                    <!--视频播放-->

                    //视频--隐藏原始播放器
                    detailDongtaiStr += '<div class="page-bd-15" style="text-align: center;">';
                    detailDongtaiStr += '<img  src="'+ videoImagePath(data.result.question.questionImage)+'" id="fengmainimagebase64" style="width: 100%;">';
                    detailDongtaiStr += '</div>';


                }else if(data.result.question.questionType == '4' && data.result.question.questionImage != null){//文件
                    //文件评论--判断文件类型展示不同的图片
                    if(data.result.question.questionImage.search(".jpeg") != -1 || data.result.question.questionImage.search(".jpg") != -1 || data.result.question.questionImage.search(".png") != -1 || data.result.question.questionImage.search(".gif") != -1 || data.result.question.questionImage.search(".GIF") != -1 ){
                        detailDongtaiStr += '<div class="weui-feeds"><ul>'+getImage100Content(data.result.question.id,data.result.question.questionImage)+'</ul></div>';
                    }else if( data.result.question.questionImage.search(".mp4") != -1 || data.result.question.questionImage.search(".MP4") != -1 || data.result.question.questionImage.search(".flv")  != -1 || data.result.question.questionImage.search(".mov")  != -1 ){
                        //视频--隐藏原始播放器
                        detailDongtaiStr += '<div class="page-bd-15" style="text-align: center;">';
                        detailDongtaiStr += '<img  src="'+ videoImagePath(data.result.question.questionImage)+'" id="fengmainimagebase64" style="width: 100%;">';
                        detailDongtaiStr += '</div>';


                    }else if( data.result.question.questionImage.search(".MP3") != -1 || data.result.question.questionImage.search(".mp3") != -1 || data.result.question.questionImage.search(".wav")  != -1 || data.result.question.questionImage.search(".ogg")  != -1 ){
                        //音频--隐藏原始播放器
                        detailDongtaiStr += '<div class="page-bd center bottom5" onclick=start("audiotest'+data.result.question.id+'","'+checkPath(data.result.question.questionImage,'3')+'","shifenmiao'+data.result.question.id+'","audiostartA'+data.result.question.id+'","audioIconA'+data.result.question.id+'")>';
                        detailDongtaiStr += '<div class="audio" style="margin: 0 auto;"  >';
                        detailDongtaiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon"  /></div>';
                        detailDongtaiStr += '<div  style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">长按二维码收听</div>';
                        detailDongtaiStr += '</div>';
                        detailDongtaiStr += '<div class="disnone"><audio  src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                        detailDongtaiStr += '</div>';
                    }else{
                        detailDongtaiStr += '<div class="page-bd center bottom5 alignleft" style="text-align: center;"><a href="'+ checkPath(data.result.question.questionImage,'3')+'" target="_blank">文件:'+getFileName(data.result.question.questionImage)+'</a></div>';
                    }

                }else if(data.result.question.questionType == '5' && data.result.question.questionImage != null){
                    //红包评论
                    detailDongtaiStr += '<div class="weui-feeds"><img onclick=toHongBaoDetail("'+data.result.question.remarks+'","1");  width="173px" height="286px" src="'+ checkPath(data.result.question.questionImage,'1')+'"></div>';
                }
                //$("#sharedongtaicontent").html(detailDongtaiStr);
                //getBase64ImageInServeice(checkPath(data.result.question.questionImage,'1'),"fengmainimagebase64");
                if(data.result.user != null) {
                    getBase64ImageInServeice(checkPath(data.result.user.headimgurl, "1"), "headimagebase64");
                }

            }else{
                var detailDongtaiStr = '';
                //判断如果是图片则展示图片
                if(data.result.question.questionType == '1' && data.result.question.questionImage != null){//图片
                    detailDongtaiStr += '<div class="weui-feeds"><ul>'+getImage100Content(data.result.question.id,data.result.question.questionImage)+'</ul></div>';
                }else if(data.result.question.questionType == '2' && data.result.question.questionImage != null){//音频
                    //音频--隐藏原始播放器
                    //音频--隐藏原始播放器
                    detailDongtaiStr += '<div class="page-bd center bottom5"  onclick=start("audiotest'+data.result.question.id+'","'+checkPath(data.result.question.questionImage,'3')+'","shifenmiao'+data.result.question.id+'","audiostartA'+data.result.question.id+'","audioIconA'+data.result.question.id+'")>';
                    detailDongtaiStr += '<div class="audio" style="margin: 0 auto;"  >';
                    detailDongtaiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon" /></div>';
                    detailDongtaiStr += '<div style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">长按二维码收听</div>';
                    detailDongtaiStr += '</div>';
                    detailDongtaiStr += '<div class="disnone"><audio  src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                    detailDongtaiStr += '</div>';
                }else if(data.result.question.questionType == '3' && data.result.question.questionImage != null){//视频
                    <!--视频播放-->

                    //视频--隐藏原始播放器
                    detailDongtaiStr += '<div class="page-bd-15" style="text-align: center;">';
                    detailDongtaiStr += '<img  src="'+ videoImagePath(data.result.question.questionImage)+'" id="fengmainimagebase64" style="width: 100%;">';
                    detailDongtaiStr += '</div>';


                }else if(data.result.question.questionType == '4' && data.result.question.questionImage != null){//文件
                    //文件评论--判断文件类型展示不同的图片
                    if(data.result.question.questionImage.search(".jpeg") != -1 || data.result.question.questionImage.search(".jpg") != -1 || data.result.question.questionImage.search(".png") != -1 || data.result.question.questionImage.search(".gif") != -1 || data.result.question.questionImage.search(".GIF") != -1 ){
                        detailDongtaiStr += '<div class="weui-feeds"><ul>'+getImage100Content(data.result.question.id,data.result.question.questionImage)+'</ul></div>';
                    }else if( data.result.question.questionImage.search(".mp4") != -1 || data.result.question.questionImage.search(".MP4") != -1 || data.result.question.questionImage.search(".flv")  != -1 || data.result.question.questionImage.search(".mov")  != -1 ){
                        //视频--隐藏原始播放器
                        detailDongtaiStr += '<div class="page-bd-15" style="text-align: center;">';
                        detailDongtaiStr += '<img  src="'+ videoImagePath(data.result.question.questionImage)+'" id="fengmainimagebase64" style="width: 100%;">';
                        detailDongtaiStr += '</div>';


                    }else if( data.result.question.questionImage.search(".MP3") != -1 || data.result.question.questionImage.search(".mp3") != -1 || data.result.question.questionImage.search(".wav")  != -1 || data.result.question.questionImage.search(".ogg")  != -1 ){
                        //音频--隐藏原始播放器
                        detailDongtaiStr += '<div class="page-bd center bottom5" onclick=start("audiotest'+data.result.question.id+'","'+checkPath(data.result.question.questionImage,'3')+'","shifenmiao'+data.result.question.id+'","audiostartA'+data.result.question.id+'","audioIconA'+data.result.question.id+'")>';
                        detailDongtaiStr += '<div class="audio" style="margin: 0 auto;"  >';
                        detailDongtaiStr += '<div style="float: left"><img src="../../img/agent/images/WechatIMG3.png" class="audioIcon" /></div>';
                        detailDongtaiStr += '<div  style="float: left;line-height: 35px;color:white ;font-size: 14px;font-weight: lighter;margin-left: 15px;">长按二维码收听</div>';
                        detailDongtaiStr += '</div>';
                        detailDongtaiStr += '<div class="disnone"><audio src=""  controls="controls" preload="meta" preload="auto"> </audio></div>';
                        detailDongtaiStr += '</div>';
                    }else{
                        detailDongtaiStr += '<div class="page-bd center bottom5 alignleft" style="text-align: center;"><a href="'+ checkPath(data.result.question.questionImage,'3')+'" target="_blank">文件:'+getFileName(data.result.question.questionImage)+'</a></div>';
                    }

                }else if(data.result.question.questionType == '5' && data.result.question.questionImage != null){
                    //红包评论
                    detailDongtaiStr += '<div class="weui-feeds"><img onclick=toHongBaoDetail("'+data.result.question.remarks+'","1");  width="173px" height="286px" src="'+ checkPath(data.result.question.questionImage,'1')+'"></div>';
                }
               // $("#sharedongtaicontent").html(detailDongtaiStr);
            }
            isguanzhu();//是否关注
            /*if(getIsAPPLE()){
                getBase64ImageInServeice(checkPath(data.result.question.questionImage,'1'),"fengmainimagebase64");
                getBase64ImageInServeice(checkPath(data.result.user.headimgurl,"1"),"headimagebase64");

            }*/
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

/*
//保存数据
function savecourse(){
	    // 在提交请求之前判断是否登录
		if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
			isLogin('','');
			initNRcourse();
			return false;
		}
		//参数
		var courseTitle = $("#courseTitle").val();
		var courseImage = $("#courseImage").val();
		var courseContent = $("#courseContent").val();
        var contentType = $("#contentType").val();
		var courseXilieno = $("#courseXilieno").val();
		var courseFile = $("#courseFile").val();
		var coursePrice = $("#coursePrice").val();
		var courseTopic = $("#courseTopic").val();

        var token = localStorage.getItem('token');

		if(courseTitle ==null || courseTitle ==''){
			$.toast("请输入课程标题", "text");
			initNRcourse();
			return false;
		}

		if(courseImage ==null || courseImage ==''){
			$.toast("请输入课程封面", "text");
			initNRcourse();
			return false;
		}
		if(courseContent ==null || courseContent ==''){
			$.toast("请输入课程内容", "text");
			initNRcourse();
			return false;
		}

		if(coursePrice ==null || coursePrice ==''){
			$.toast("请输入课程价格", "text");
			initNRcourse();
			return false;
		}
		if(contentType ==null || contentType ==''){
			$.toast("请输入内容类型", "text");
			initNRcourse();
			return false;
		}


		//传输数据
		var datacourse = {

		  	"courseTitle":courseTitle,
		  	"courseImage":courseImage,
		  	"courseContent":courseContent,
		  	"courseXilieno":courseXilieno,
		  	"courseFile":courseFile,
		  	"coursePrice":coursePrice,
		  	"courseTopic":courseTopic,
		  	"contentType":contentType,
            "token":token
		}

        instancecourse({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/xy/course/course/save',
            data:datacourse,
        	cancelToken: sourcecourse.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
				if(rs.data.code == '0'){
					//$.toast("操作成功", 'success');
                    refresh();
				}else{
					$.toast(rs.data.msg, "text");
					initNRcourse();
                    if(rs.data.code == '-1'){
                        localStorage.setItem('token','');
                        if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                            isLogin('','');
                        }
                    }
				}
            }else{
                console.log( '请求异常！')
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
        savecourse();
        }
    }
}

//初始化重复提交判断
function initNRcourse(){
    $("#savecourseFlag").remove();
}



//监听提交保存
$("#buttonSavecourse").click(function(){
	saveNRcourse();
})
*/

//删除数据
function deletecourse(){

		//参数
		var id = GetUrlString('id');

		//传输数据
		var datacourse = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
		    "id":id
		}

        instancecourse({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/xy/course/course/delete',
            data: datacourse,
        	cancelToken: sourcecourse.token
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
$("#buttonDeletecourse").click(function(){
    $.confirm("您确定要删除吗?", "确认删除?", function() {
        deletecourse();
        }, function() {
        //取消操作
    });
});

//监听是否渲染
$(function () {
   //判断获取详情信息
   if($("#buttonDetailcourse").size()>0){
		detailcourse("2");
   }else if($("#buttonDetailhuiyuan").size()){
       detailcourse("19");
   }else if($("#buttonDetailTool").size()){
       detailcourse("5");
   }else if($("#buttonDetailKa").size()>0){//卡详情
       detailcourse("10");
   }else if($("#buttonDetailDaikuan").size()>0){//贷款详情
       detailcourse("11");
   }else if($("#buttonDetailBaoxian").size()>0){//保险详情
       detailcourse("12");
   }else if($("#buttonDetailJiJin").size()>0){//基金详情
       detailcourse("13");
   }else if($("#buttonDetailProduct").size()>0){//产品详情
       detailcourse("6");
   }else if($("#buttonDetailQuestion").size()>0){//问题详情
       detailcourse("7");
   }else if($("#buttonDetailAnswer").size()>0){//答案详情
       detailcourse("8");
   }else if($("#buttonDetailActivity").size()>0){//活动详情
       detailcourse("14");
   }else if($("#buttonDetailDongtai").size()>0){//动态详情
       detailcourse("16");
   }


});

//分享增加记录
function getJiajia(){
    //参数
    var id = $("#id").val();
    var token = localStorage.getItem('token');

    if(id == null || id == ''){
        sourcecourse.cancel();
        location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
    }

    //传输数据
    var datacourse = {
        "shareAboutid":id,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecourse({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/share/share/detailbyrecord',
        data: datacourse,
        cancelToken: sourcecourse.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.result.id == null){
				//新增记录
                addJiajia();
                $("#payjiajia1").attr("class","weui-payselect-a  weui-payselect-on WH18WH");
                $("#shareMoney").val("0");
			}else{
				//渲染更新选择
				$("#shareContent").val(rs.data.result.shareSlogan);
                if($("#shareMoney").size() > 0){
                    $("#shareMoney").val(0);
                }else{
                    $("body").append("<input type='hidden' id='shareMoney' value='0' >");
                }

				if(rs.data.result.shareMoney == '5' || rs.data.result.shareMoney == 5){
					$("#payjiajia2").attr("class","weui-payselect-a  weui-payselect-on WH18WH");
                    $("#shareMoney").val("5");
				}else if(rs.data.result.shareMoney == '10' || rs.data.result.shareMoney == 10){
                    $("#payjiajia3").attr("class","weui-payselect-a  weui-payselect-on WH18WH");
                    $("#shareMoney").val("10");
                }else if(rs.data.result.shareMoney == '15' || rs.data.result.shareMoney == 15){
                    $("#payjiajia4").attr("class","weui-payselect-a  weui-payselect-on WH18WH");
                    $("#shareMoney").val("15");
                }else if(rs.data.result.shareMoney == '30' || rs.data.result.shareMoney == 30){
                    $("#payjiajia5").attr("class","weui-payselect-a  weui-payselect-on WH18WH");
                    $("#shareMoney").val("30");
                }else if(rs.data.result.shareMoney == '50' || rs.data.result.shareMoney == 50){
                    $("#payjiajia6").attr("class","weui-payselect-a  weui-payselect-on WH18WH");
                    $("#shareMoney").val("50");
                }else{
                    $("#payjiajia1").attr("class","weui-payselect-a  weui-payselect-on WH18WH");
                    $("#shareMoney").val("0");
                }
			}
        }else{
            console.log('请求异常！')
        }

    });

}

//分享增加记录
function addJiajia(){
    //参数
    var id = $("#id").val();
    var token = localStorage.getItem('token');
    var shareSlogan = $("#shareContent").val();
    var shareMoney = $("#shareMoney").val();
    if(shareMoney == null){
        shareMoney = 0;
	}
    var shareType = $("#shareType").val();
    if(id == null || id == ''){
        sourcecourse.cancel();
        location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
    }

    //传输数据
    var datacourse = {
        "shareAboutid":id,
		"shareSlogan":shareSlogan,
		"shareMoney":shareMoney,
		"shareType":shareType,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecourse({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/share/share/save',
        data: datacourse,
        cancelToken: sourcecourse.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){

        }else{
            console.log('请求异常！')
        }

    });

}

function updateJiajia() {
	//参数
    var id = $("#id").val();
    var token = localStorage.getItem('token');
    var shareSlogan = $("#shareContent").val();
    var shareMoney = $("#shareMoney").val();
    var shareType = $("#shareType").val();

    if(id == null || id == ''){
        sourcecourse.cancel();
        location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
    }

    //传输数据
    var datacourse = {
        "shareAboutid":id,
        "shareSlogan":shareSlogan,
        "shareMoney":shareMoney,
        "shareType":shareType,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecourse({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/share/share/save',
        data: datacourse,
        cancelToken: sourcecourse.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){

        }else{
            console.log('请求异常！')
        }

    });
}

function updateDianjiliang() {
    //参数
    var id = $("#id").val();
    var token = localStorage.getItem('token');

    if(id == null || id == ''){
        sourcecourse.cancel();
        location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
    }

    //传输数据
    var datacourse = {
        "shareAboutid":id,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecourse({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/share/share/adddianjiliang',
        data: datacourse,
        cancelToken: sourcecourse.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){

        }else{
            console.log('请求异常！')
        }

    });

}

//提交申请订单
//userdetailbytoken  1.先获取用户身份信息-如果有则自动填充-不可以修改，如果没有则可以输入--如果已经认证则不可以修改，提示联系客服，如果是没认证且已经有内容则是认证可修改一次。如果没有内容则提交后自动填充到信息记录中，协议添加
//applyinfo 2.提交后直接提交订单和个人信息-后台进行比对验证防止多次提交不同人的信息，处理成功后则跳转到第三方申请链接中
function subapply() {
    $("#halfapply").popup();
    //detailapplyuser();
}

function subapplyLx() {
    //alert(1);
    $("#halfapplylx").popup();
    //detailapplyuser();
}

//打开工具使用窗口
function openApply(applyType) {
	if(applyType=="bigData"){
		$("#bigDataWindow").popup();

	}else if(applyType=="creditCard"){
		$("#creditCardWindow").popup();
	}else if(applyType=="aliCredit"){
		$("#aliCreditWindow").popup();
	}else if(applyType=="aliMultiLoan"){
		$("#aliMultiLoanWindow").popup();
	}else if(applyType=="loanLend"){
		$("#aliLoanLendWindow").popup();
	}else if(applyType=="blacklist"){
		$("#aliBlacklistWindow").popup();
	}else if(applyType=="fraudCheck"){
		$("#aliFraudCheckWindow").popup();
	}else if(applyType=="overduePayment"){
		$("#aliOverduePaymentkWindow").popup();
	}else if(applyType=="lawsuitInfo"){
		$("#aliLawsuitInfoWindow").popup();
	}else if(applyType=="getMultipleC"){
		$("#aliGetMultipleCWindow").popup();
	}

}

//获取详情数据
function detailapplyuser(){

    //参数
    var token = localStorage.getItem('token');

    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecourse({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/userdetailbytoken',
        data: datauser,
        cancelToken: sourcecourse.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                if(rs.data.result.isAuth == '3') {//已认证
                    $("#applytext").html("默认使用本账户信息，如需更改请联系客服！");
                }else {//未认证
                    if(rs.data.result.cardName != null && rs.data.result.cardName != '' && rs.data.result.cardNum != null && rs.data.result.cardNum != '' ){
                        $("#applytext").html("如需修改提交信息，请进行实名认证修改信息！");
                    }else{
                        $("#applydiv").hide();
                    }

                }
                if(rs.data.result.cardName != null && rs.data.result.cardName != ''){
                    $("#applycardname").val(rs.data.result.cardName);
                    $("#applycardname").attr("disabled","disabled");
                }
                if(rs.data.result.cardNum != null && rs.data.result.cardNum != ''){
                    $("#applycardnum").val(rs.data.result.cardNum);
                    $("#applycardnum").attr("disabled","disabled");
                }
                if(rs.data.result.mobile != null && rs.data.result.mobile != ''){
                    $("#applymobile").val(rs.data.result.mobile);
                    $("#applymobile").attr("disabled","disabled");
                }
            }
        }else{
            console.log('请求异常！')
        }

    });

}

//获取详情数据
function subapplyuser(){
    //isLogin();

    //参数
    var applyurl =  $("#applyurl").val();
    var mobile =  $("#applymobile").val();
    var cardName =  $("#applycardname").val();
    var cardNum =  $("#applycardnum").val();
    //以下参数需要提前赋值
    var orderNum = $("#orderNum").val();
    var orderMoney = $("#orderMoney").val();
    var weuiAgree = $("input[name='weuiAgree']:checked").val();
    var weuiAgreeData = $("input[name='weuiAgreeData']:checked").val();


    var laxin =  $("#laxin").val();
    var baodan =  $("#baodan").val();
    var jtone =  pathUrl('uploaderInputA1');
    var jttwo =  pathUrl('uploaderInputB1');
    var jtthree =  pathUrl('uploaderInputC1');
    var jtfour =  pathUrl('uploaderInputD1');
    var sfzxx = $("#sfzdis").css("display");
    var nametext = $("#sfzxx").text();
    //window.setTimeout('closeWindow()',1000);



    if(mobile == "" || !/1[3|4|5|6|9|7|8]\d{9}/.test(mobile)){
        $.toast("手机号不正确","text");
        initNRApply();
        return false;
    }

    /*else if(cardName == null || cardName == ''){
        $.toast("请填写真实姓名","text");
        initNRApply();
        return false;
    }*/
     if(cardNum == null || cardNum == ''){
        if(laxin == '1'){
            if( $("#sfzxx").size() > 0 && sfzxx != 'none'  && sfzxx != 'undefined'){

                if(cardNum == null || cardNum == ''){
                    $.toast("请填写"+nametext+"","text");
                    initNRApply();
                    return false;
                }
            }else{
                cardNum = '0';
            }

        }

    }
    if(!weuiAgree){
        $.toast("请阅读并勾选用户服务协议","text");
        initNRApply();
        return false;
    }else{
        // 请求ZX
        if(weuiAgreeData){
            //setzx(mobile,cardName,cardNum);
        }
    }
    var jietu1 = $("#jietu1").css("display");
    var jietu2 = $("#jietu2").css("display");
    var jietu3 = $("#jietu3").css("display");
    var jietu4 = $("#jietu4").css("display");



   /* console.log('jietu1==='+jietu1);
    console.log('jietu2==='+jietu2);
    console.log('jietu3==='+jietu3);*/
    if( $("#jietu1").size() > 0 && jietu1 != 'none'  && jietu1 != 'undefined'){

        if(jtone == null || jtone == ''){
            $.toast("请上传第一张图片","text");
            initNRApply();
            return false;
        }
    }

    if($("#jietu2").size() > 0 &&  jietu2 != 'none' && jietu2 != 'undefined'){

        if(jttwo == null || jttwo == ''){
            $.toast("请上传第二张图片","text");
            initNRApply();
            return false;
        }
    }

    if($("#jietu3").size() > 0 &&  jietu3 != 'none'  && jietu3 != 'undefined'){

        if(jtthree == null || jtthree == ''){
            $.toast("请上传第三张图片","text");
            initNRApply();
            return false;
        }
    }

    if($("#jietu4").size() > 0 &&  jietu4 != 'none'  && jietu4 != 'undefined'){
        if(jtfour == null || jtfour == ''){
            $.toast("请上传第四张图片","text");
            initNRApply();
            return false;
        }
    }

    localStorage.setItem("applyone",mobile);
    localStorage.setItem("applytwo",cardName);
    localStorage.setItem("applythree",cardNum);

    var orderType = $("#orderType").val();
    var orderTitle = $("#orderTitle").val();
    var orderAboutid = $("#orderAboutid").val();//红包ID---后台可以根据是红包ID--查询出评论ID--然后找到是那一条评论--其他类似
    var token = localStorage.getItem('token');
    $.toast("提交中……","text");
    //传输数据
    var datauser = {
        "jtone":jtone,
        "jttwo":jttwo,
        "jtthree":jtthree,
        "jtfour":jtfour,
        "orderNum":orderNum,
        "orderMoney":orderMoney,
        "orderType":orderType,
        "orderTitle":orderTitle,
        "orderAboutid":orderAboutid,
        "mobile":mobile,
        "payWay":"0",
        "laxin":laxin,
        "baodan":baodan,
        "cardName":cardName,
        "cardNum":cardNum,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "inUser":getShareId2()
    }

    instancecourse({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/applyinfo',
        data: datauser,
        cancelToken: sourcecourse.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                if(rs.data.result !=null && rs.data.result != ''){
                    if(rs.data.result.search("http") == -1){
                        //$.toptip(rs.data.result,'error');
                        $.toast(rs.data.result,"text");
                        setTimeout(function() {
                            location.reload();
                        },2000);

                    }else{
                        //跳转到银行申请界面
                        initNRApply();
                        console.log(rs.data.result);
                        window.location.href=rs.data.result;
                    }


                }else{
                    initNRApply();
                    $.toast(rs.data.result,"text");
                }
            }else{
                $.toast(rs.data.result,"text");
            }
        }else{
            $.toast(rs.data.result,"text");
        }
    });

}

//防重复提交保存
function saveNRApplyInfo(){
    var saveApplyFlag = $("#saveApplyFlag").val();
    if(saveApplyFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
        $("body").append("<input type='hidden' id='saveApplyFlag' value='1' >");
        subapplyuser()
    }
}

//初始化重复提交判断
function initNRApply(){
    $("#saveApplyFlag").remove();
}


function setzx(mobile,cardName,cardNum) {
//传输数据
    var datauser = {
        "mobile":mobile,
        "cardName":cardName,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "cardNum":cardNum
    }

    instancecourse({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/zengxian',
        data: datauser,
        cancelToken: sourcecourse.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){

        }else{
            console.log('请求异常！')
        }
    });

}

if(getSaasId() == '201908070117'){


}

function setShuxing(obj1,obj2) {
    localStorage.setItem("o1",obj1);
    localStorage.setItem("o2",obj2);

    $("label[name='"+obj1+"']").each(function(){

        if(obj2 == this.id){
            $(this).attr("class","label shuxing2");
        }else{
            $(this).attr("class","label shuxing");
        }

    })

    var str = '';
    $("label").each(function(){

        //console.log('请求1====='+$(this).attr("class"));
        if($(this).attr("class") == 'label shuxing2'){
            //console.log('请求2====='+$(this).attr('id'));
            str += $(this).attr('id')+"@";
        }

    });


    var datauser = {
        "productId":GetUrlString("id"),
        "shuxingids":str,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId()
    }

    instancecourse({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/kucun/kucun/getByProductIdAndShuxing',
        data: datauser,
        cancelToken: sourcecourse.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                $("#num").val(rs.data.result.num);
                $("#kucun").html("库存:"+rs.data.result.num+"");

                localStorage.setItem("shuxingkucun",setNum(rs.data.result.num));

                var title = $("#shareTitle").val();
                if(rs.data.result.productImages != null && rs.data.result.productImages != ''){
                    $("#tupian").attr("src",checkPath(rs.data.result.productImages));
                }else{
                    var img = $("#shareImage").val();
                    $("#tupian").attr("src",checkPath(getFirstImageDetailContent(img)));
                }
                if(rs.data.result.price != null && rs.data.result.price != ''){
                    var payNum = $("#payNum").val();
                    var jiage =eval(rs.data.result.price)*eval(payNum);
                    $("#data61").html("￥"+jiage.toFixed(2));
                    $("#data62").html(rs.data.result.price);
                }

                $("#biaoti").html(title);
            }else{
                $("#num").val("");
                if(localStorage.getItem("kucun") != null && localStorage.getItem("kucun") != ''){

                    $("#kucun").html("库存:"+setNum(localStorage.getItem("kucun"))+"");
                    localStorage.setItem("shuxingkucun",setNum(localStorage.getItem("kucun")));
                }else{
                    $("#kucun").html("库存:0");
                    localStorage.setItem("shuxingkucun","0");
                }

                var img = $("#shareImage").val();
                var title = $("#shareTitle").val();
                var price = $("#orderMoney").val();
                var payNum = $("#payNum").val();
                $("#tupian").attr("src",checkPath(getFirstImageDetailContent(img)));
                $("#biaoti").html(title);
                var jiage = eval(price)*eval(payNum);
                $("#data61").html("￥"+jiage.toFixed(2));
                $("#data62").html(price);
            }
        }else{
            console.log('请求异常！')
        }
    });
/*
    var jsonData = {productId:GetUrlString("id"),shuxingids:str};
    $.ajax({
        method:'post',
        url:"${ctx}/api/kucun/kucun/getByProductIdAndShuxing",
        data: JSON.stringify(jsonData),
        dataType:'json',
        contentType:"application/json;charset=utf-8",
        success:function(data) {
            //layer.msg("操作成功");
            console.log(data);
            if(data.code == '0'){
                $("#num").val(data.result.num);
                $("#kucun").html(data.result.num);
            }else{
                $("#num").val("");
                $("#kucun").html("");
            }


        }
    });*/




}


function getProductShuxing() {
//传输数据
    var datauser = {
        "productId":GetUrlString("id"),
        "tenancy":getSaasId(),"tenancyTemp":getSaasId()
    }

    instancecourse({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sku/skua/list',
        data: datauser,
        cancelToken: sourcecourse.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            //console.log('请求数据====='+rs.data.result);
            if(rs.data.code == '0'){
                if(rs.data.result != null && rs.data.result != ''){


                    var str = '';
                    var o1 = '';
                    var o2 = '';
                    $.each(rs.data.result,function(i,item){
                        str += '<p style="font-size:14px ">'+item.name+'</p><p class="">';
                        //console.log('请求数据1=====');
                        $.each(item.skubList,function(m,item2){
                            //console.log('请求数据2=====');
                            if(m == 0){
                                o1 = item.id;
                                o2 = item2.id;
                                //console.log('请求数据3=====');
                                str += '<label onclick=setShuxing(\''+item.id+'\',\''+item2.id+'\') class="label shuxing2" name="'+item.id+'" id="'+item2.id+'">'+item2.name+'</label>';
                            }else{
                                str += '<label onclick=setShuxing(\''+item.id+'\',\''+item2.id+'\') class="label shuxing" name="'+item.id+'" id="'+item2.id+'">'+item2.name+'</label>';
                                //console.log('请求数据4=====');
                            }
                            //console.log('请求数据5=====');
                        });
                        str += '</p>';


                    })

                    //console.log('请求数据6=====');
                    $("#shuxingall").html(str);
                    setTimeout(function() {
                        setShuxing(o1,o2);
                    },1000);



                }else{
                    setTimeout(function() {
                        var img = $("#shareImage").val();
                        var title = $("#shareTitle").val();
                        $("#tupian").attr("src",checkPath(getFirstImageDetailContent(img)));
                        $("#biaoti").html(title);
                    },1000);

                }


            }
        }else{
            console.log('请求异常！');
        }
    });

}


$(document).ready(function(){
    var nowPageUrl = window.location.protocol+"//"+window.location.host+window.location.port+window.location.pathname;
    if(nowPageUrl.search("/productdetail.html") != -1){

        getProductShuxing();
        getProductZengzhi();
    }

});


function setzhifu(obj) {

    if(obj == '1'){
        $("#zhifu").html("确定");
        $("#tijiaoxinxi").html("加入购物车");

        $("#zhifu").attr("onclick","gouwuche()");

    }else if(obj == '2'){
        $("#zhifu").html("确定");
        $("#tijiaoxinxi").html("提交订单");
        $("#zhifu").attr("onclick","tijiaodingdan('1')");
    }

}



function gouwuche() {
    var payNum = $("#payNum").val();
    var str = '';
    $("[name='checkboxzhifu']").each(function(){

        //console.log('请求1====='+$(this).attr("class"));
        if($(this).attr("checked") == 'checked'){
            //console.log('请求2====='+$(this).attr('id'));
            str += $(this).attr('id')+"@";
        }

    });

    var str2 = '';
    $("label").each(function(){

        //console.log('请求1====='+$(this).attr("class"));
        if($(this).attr("class") == 'label shuxing2'){
            //console.log('请求2====='+$(this).attr('id'));
            str2 += $(this).attr('id')+"@";
        }

    });

    var datauser = {

        "num":payNum,
        "productId":GetUrlString("id"),
        "zengzhiids":str,
        "shuxingids":str2,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId()
    }

    instancecourse({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/shoppingcar/shoppingcar/savegouwuche',
        data: datauser,
        cancelToken: sourcecourse.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            //console.log('请求数据====='+rs.data.result);
            if(rs.data.code == '0'){

                $.toast("加入购物车成功!","text");
                $.closePopup();
            }
        }else{
            console.log('请求异常！');
        }
    });

}


function getProductZengzhi() {
//传输数据
    var datauser = {
        "id":GetUrlString("id"),
        "tenancy":getSaasId(),"tenancyTemp":getSaasId()
    }

    instancecourse({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sku/skua/zengzhi',
        data: datauser,
        cancelToken: sourcecourse.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            //console.log('请求数据====='+rs.data.result);
            if(rs.data.code == '0'){
                if(rs.data.result != null && rs.data.result != ''){

                    var flag = 0;
                    var HAVEPAYSTR = '';
                    HAVEPAYSTR += '<div class="weui-form">';
                    $.each(rs.data.result,function(i,item){

                        flag = 1;

                        HAVEPAYSTR += '<div class="weui-form-li" style="margin: 0px 0px;">';
                        HAVEPAYSTR += '<input class="weui-form-checkbox" name="checkboxzhifu" id="'+item.value+'"  type="checkbox">';
                        HAVEPAYSTR += '<label for="'+item.value+'">';
                        HAVEPAYSTR += '<i class="weui-icon-checkbox"></i>';
                        HAVEPAYSTR += '<div class="weui-form-text"><p>'+item.label+'(￥'+item.price+')</p></div>';
                        HAVEPAYSTR += '</label>';
                        HAVEPAYSTR += '</div>';






/*
                        HAVEPAYSTR += '<div class="weui-cells weui-cells_checkbox" style="background-color: #efeff4;">';
                        HAVEPAYSTR += '<label class="weui-cell weui-check__label" for="'+item.value+'" style="padding: 3px 0px;">';
                        HAVEPAYSTR += '<div class="weui-cell__hd">';
                        HAVEPAYSTR += '<input class="weui-check" name="checkboxzhifu" id="'+item.value+'"  type="checkbox">';
                        HAVEPAYSTR += '<i class="weui-icon-checked"></i>';
                        HAVEPAYSTR += '</div>';
                        HAVEPAYSTR += '<div class="weui-cell__bd">';
                        HAVEPAYSTR += '<p>'+item.label+'</p>';
                        HAVEPAYSTR += '</div>';
                        HAVEPAYSTR += '</label>';*/

                    })
                    HAVEPAYSTR += '</div>';
                    $("#zengzhi").html(HAVEPAYSTR);
                    if(flag == 1){
                        $("#zzfw").show();
                    }

                }


            }
        }else{
            console.log('请求异常！');
        }
    });

}



//订单商品信息
function orderproductlist(){
    //1.单个商品-2.购物车商品和增值服务
    var obj = localStorage.getItem("objtype");
    //参数
    var token = localStorage.getItem("token");
    var url = '/shoppingcar/shoppingcar/getOrderInfo';
    if(obj == '1'){
        url = '/shoppingcar/shoppingcar/getOrderInfoOne';
    }else if(obj == '3'){
        url = '/shoppingcar/shoppingcar/getOrderInfoDetail';
    }else{
        url = '/shoppingcar/shoppingcar/getOrderInfo';
    }
    //传输数据
    var datauser = {
        "productId":localStorage.getItem("productId"),
        "zengzhiids":localStorage.getItem("zengzhiids"),
        "num":localStorage.getItem("productNum"),
        "remarks":localStorage.getItem("orderNo"),
        "shuxingids":localStorage.getItem("shuxingids"),
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instancecourse({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: datauser,
        cancelToken: sourcecourse.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                var data = rs.data.result;
                var title= '';

                if(data != null){
                    var str = '';
                    $.each(data.productList,function(i,item){

                        str += '<div class="weui-cell "  onclick=toProductDetail("'+item.id+'","1");>';
                        str += '<div class="weui-cell__hd" style="position: relative;margin-right: 10px;min-height: 100px;">';
                        str += '<img src="'+checkPath(getFirstImageDetailContent(item.productImage),"1")+'" style="width: 65px;display: block;border-radius: 5px;">';

                        str += '</div>';
                        str += '<div class="weui-cell__bd" style="min-height: 100px;">';
                        str += '<p>'+item.productTitle+'</p>';
                        str += '<p style="font-size: 12px;color: #888888;"><span><span>￥'+item.productPrice+'</span> x <span>'+item.productZan+'</span></span><span class="left7">'+setNULL(item.shuxing)+'</span></p>';
                        str += '<p style="font-size: 13px;color: #888888;">'+setNULL(item.zengzhiids)+'</p>';
                        str += '</div>';

                        str += '</div>';
                        if(i ==0 ){
                            title = item.productTitle;
                        }
                        if(i ==1 ){
                            title += "等";
                        }

                    });





                    $("#prolist").html(str);
                    $("#allprice").html("￥"+data.allprice);
                    $("#shifukuan").html("￥"+data.shifukuan);
                    $("#allyongjin").html("￥"+data.allyongjin);
                    $("#youhui").html("-￥"+data.youhui);
                    $("#youhuijine").html("减￥"+data.youhui);


                    if(obj == '1'){//单个购买
                        $("body").append('<input type="hidden" id="orderMoney" value="'+data.shifukuan+'">');
                        $("body").append('<input type="hidden" id="orderType" value="10">');
                        $("body").append('<input type="hidden" id="orderNum" value="'+data.num+'">');
                        $("body").append('<input type="hidden" id="orderAboutid" value="'+data.productId+'">');
                        $("body").append('<input type="hidden" id="orderTitle" value="'+title+'">');
                        $("body").append('<input type="hidden" id="zengzhiids" value="'+setNULL(localStorage.getItem("zengzhiids"))+'">');

                    }else if(obj == '3'){//订单详情
                        $("body").append('<input type="hidden" id="orderMoney" value="'+data.shifukuan+'">');
                        $("body").append('<input type="hidden" id="orderType" value="10">');
                        $("body").append('<input type="hidden" id="orderNum" value="1">');
                        $("body").append('<input type="hidden" id="orderAboutid" value="'+data.productId+'">');
                        $("body").append('<input type="hidden" id="orderTitle" value="'+title+'">');
                        $("body").append('<input type="hidden" id="mediaType" value="3">');//
                        $("body").append('<input type="hidden" id="orderNo" value="'+setNULL(localStorage.getItem("orderNo"))+'">');//订单号
                        $("#dizhi").html(setNULL(data.remarks));

                    }else{//合并购买
                        $("body").append('<input type="hidden" id="orderMoney" value="'+data.shifukuan+'">');
                        $("body").append('<input type="hidden" id="orderType" value="10">');
                        $("body").append('<input type="hidden" id="orderNum" value="1">');
                        $("body").append('<input type="hidden" id="orderAboutid" value="'+data.productId+'">');
                        $("body").append('<input type="hidden" id="orderTitle" value="'+title+'">');
                        $("body").append('<input type="hidden" id="mediaType" value="1">');//合并付款

                    }





                }
            }






        }else{
            console.log('请求异常！')
        }

    });

}



function getShoppingCarProduct() {
//传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId()
    }

    instancecourse({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/shoppingcar/shoppingcar/mylist',
        data: datauser,
        cancelToken: sourcecourse.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            //console.log('请求数据====='+rs.data.result);
            if(rs.data.code == '0'){
                if(rs.data.result != null && rs.data.result != ''){

                    var str = '';

                    $.each(rs.data.result,function(i,item){

                    str += '<div class="page-bd-15">';
                    str += '<div class="kapian2" style="border-radius: 10px;">';
                    str += '<div class="weui-cells weui-cells_checkbox" style="line-height: 50px;margin-top: 0px;padding-top: 15px;padding-bottom: 15px;border-radius: 10px;">';
                    str += '<label class="weui-cell weui-check__label" for="s'+item.id+'" style="padding: 0px 15px;width:10%;float: left;width: 8%;line-height: 100px;">';
                    str += '<div class="weui-cell__hd" style="padding-right: 0px;">';
                    str += '<input class="weui-check" name="cart" id="s'+item.id+'" money="'+item.shifukuan+'" ids="'+item.id+'" onclick="setone()" type="checkbox">';
                    str += '<i class="weui-icon-checked"></i>';
                    str += '</div>';
                    str += '<div class="weui-cell__bd" style="text-align: left;">';

                    str += '</div>';
                    str += '</label>';
                    str += '<div class="weui-cells"  style="margin-top: 0px;float: left;width: 80%" >';
                    str += '<div class="weui-cell" style="padding: 0px 0px;">';
                    str += '<div class="weui-cell__hd" style="position: relative;margin-right: 0px;padding-right: 0em;">';
                    str += '<img  onclick=toProductDetail("'+item.productId+'","1"); src="'+checkPath(getFirstImageDetailContent(item.productImage),"1")+'" style="width: 100px;display: block;line-height: 80px;border-radius: 5px">';

                    str += '</div>';

                    str += '<div class="weui-cell__bd" style="min-height: 100px;">';
                    str += '<div class="weui-news-p tworow  f16" style="line-height: 20px;">';
                    str += '<p  onclick=toProductDetail("'+item.productId+'","1"); >'+item.productTitle+'</p>';

                    str += '</div>';
                    str += '<p style="font-size: 12px;color: #888888;"  onclick=toProductDetail("'+item.productId+'","1");><span>'+setNULL(item.shuxingids)+'</span></p>';
                    str += '<p style="font-size: 13px;color: #888888;" id="zengzhi'+item.id+'"  onclick=toProductDetail("'+item.productId+'","1");>'+setNULL(item.zengzhiids)+'</p>';
                    str += '<div class="weui-cell__ft" style="margin-top: 5px;">';
                    str += '<span style="color: red;margin-right: 20px;">￥'+item.productPrice+'</span>';
                    str += '<div class="weui-count">';
                    str += '<a class="weui-count__btn weui-count__decrease" onclick="setcar(\''+item.id+'\',1)"></a>';
                    str += '<input class="weui-count__number" type="number" onblur="setcar(\''+item.id+'\',0)" id="n'+item.id+'"  value="'+item.num+'">';
                    str += '<a class="weui-count__btn weui-count__increase" onclick="setcar(\''+item.id+'\',2)"></a>';
                    str += '</div>';
                    str += '</div>';
                    str += '</div>';



                    str += '</div>';
                    str += '</div>';
                    str += '</div>';
                    str += '</div>';

                    str += '</div>';
                    });

                    $("#shoppingcar").html(str);


                }else{

                }


            }
        }else{
            console.log('请求异常！');
        }
    });

}

function setcar(sid,stype) {
    if(stype == 1 || stype == '1'){
        var num = $("#n"+sid+"").val();
        if(eval(num) > 1){
            $("#n"+sid+"").val(eval(num)-1);
            //修改操作
            editcar(sid,$("#n"+sid+"").val());



        }else{
            $.confirm("再减少就没了！", "确认删除？", function () {

                deletecar(sid);

            }, function () {
                //取消操作
                //location.href = 'updaterealname.html';
            });
            //删除操作

        }

    }else if(stype == 2 || stype == '2'){
        var num = $("#n"+sid+"").val();
        $("#n"+sid+"").val(eval(num)+1);
        //修改操作
        editcar(sid,$("#n"+sid+"").val());

    }else if(stype == 0 || stype == '0'){

        var num = $("#n"+sid+"").val();
        if(eval(num) > 0){
            //$("#n"+sproductid+"").val(eval(num)-1);
            //修改操作
            editcar(sid,$("#n"+sid+"").val());



        }else{
            $.confirm("再减少就没了！", "确认删除？", function () {

                deletecar(sid);

            }, function () {
                //取消操作
                //location.href = 'updaterealname.html';
            });
            //删除操作

        }

    }


}


function deletecar(id) {
//传输数据
    var datauser = {
        "id":id,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId()
    }

    instancecourse({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/shoppingcar/shoppingcar/delete',
        data: datauser,
        cancelToken: sourcecourse.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            //console.log('请求数据====='+rs.data.result);
            if(rs.data.code == '0'){
                refresh();
            }
        }else{
            console.log('请求异常！');
        }
    });

}


function editcar(id,num) {
//传输数据
    var datauser = {
        "id":id,
        "num":num,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId()
    }

    instancecourse({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/shoppingcar/shoppingcar/savegouwucheshoppingcar',
        data: datauser,
        cancelToken: sourcecourse.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            //console.log('请求数据====='+rs.data.result);
            if(rs.data.code == '0'){
                //修正数据
                $("#zengzhi"+id+"").html(setNULL(rs.data.result.zengzhiids));
                $("#s"+id+"").attr("money",setNULL(rs.data.result.shifukuan));
                //修整价格
                setprice();

            }
        }else{
            console.log('请求异常！');
        }
    });

}


function setprice() {

    var str = 0.00;
    $("[name='cart']").each(function(){

        //console.log('请求1====='+$(this).attr("class"));
        if($(this).attr("checked") == 'checked'){
            //console.log('请求2====='+$(this).attr('id'));
            str += eval($(this).attr('money'));
        }

    });
    console.log('str====='+str.toFixed(2));
    $("#shifukuan").html("￥"+str.toFixed(2));

}

function quanxuan() {


    $("[name='checkboxall']").each(function(){

        console.log('请求========q22222====='+$(this).attr("checked"));
        if($(this).attr("checked") == 'checked'){
            $("[name='cart']").each(function(){

                //console.log('请求1====='+$(this).attr("class"));
                $(this).attr("checked","checked");
                //$(this).removeAttr("checked");
            });

        }else{
            $("[name='cart']").each(function(){

                //console.log('请求1====='+$(this).attr("class"));

                $(this).removeAttr("checked");
            });

        }

    });
    setprice();

}

function setone() {
    var flag = 0;
    $("[name='cart']").each(function(){

        //console.log('请求1====='+$(this).attr("class"));
        if($(this).attr("checked") == 'checked'){

        }else{
            flag = 1;
        }

    });

    if(flag == 1){
        $("#s11").removeAttr("checked");
    }else{
        $("#s11").attr("checked","checked");
    }

    setprice();
}

function tijiaodingdan(objtype) {

    if(localStorage.getItem("shuxingkucun") != '0'){
        localStorage.setItem("productId",$("#id").val());
        localStorage.setItem("productNum",$("#payNum").val());

        var str = '';
        $("[name='checkboxzhifu']").each(function(){

            //console.log('请求1====='+$(this).attr("class"));
            if($(this).attr("checked") == 'checked'){
                //console.log('请求2====='+$(this).attr('id'));
                str += $(this).attr('id')+"@";
            }

        });

        var str2 = '';
        $("label").each(function(){

            //console.log('请求1====='+$(this).attr("class"));
            if($(this).attr("class") == 'label shuxing2'){
                //console.log('请求2====='+$(this).attr('id'));
                str2 += $(this).attr('id')+"@";
            }

        });
        localStorage.setItem("zengzhiids",str);
        localStorage.setItem("shuxingids",str2);
        localStorage.setItem("objtype",objtype);

        window.location.href='orderinfo.html';
    }else{
        $.toast.prototype.defaults.duration=1000;
        $.toast("对不起，库存不足!","text");

    }


}


function tijiaodingdanshoppingcar(objtype){

    var str = '';
    $("[name='cart']").each(function(){

        //console.log('请求1====='+$(this).attr("class"));
        if($(this).attr("checked") == 'checked'){
            //console.log('请求2====='+$(this).attr('id'));
            str += $(this).attr('ids')+"@";
        }

    });
    if(str != '' && str != null){
        localStorage.setItem("productId",str);
        localStorage.setItem("productNum","");
        localStorage.setItem("zengzhiids","");
        localStorage.setItem("shuxingids","");
        localStorage.setItem("objtype",objtype);
        window.location.href='orderinfo.html';
    }else{
        $.toast.prototype.defaults.duration=1000;
        $.toast("请选择商品!","text");
        return false;
    }


}


function dingdanxiangqing(objtype,productId,productNum,zengzhiids,shuxingids,orderNo) {
    localStorage.setItem("productId",productId);
    localStorage.setItem("productNum",productNum);
    localStorage.setItem("zengzhiids",zengzhiids);
    localStorage.setItem("shuxingids",shuxingids);
    localStorage.setItem("orderNo",orderNo);
    localStorage.setItem("objtype",objtype);
    window.location.href='orderdetail.html';
}