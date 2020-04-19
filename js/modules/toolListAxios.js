var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost";//本地模式
}
//文件请求URL
var baseFileUrltool = ''+basehost+'';
//请求实例
var instancetool = axios.create({
  baseURL: ''+basehost+'/sfd/a/api/',
  timeout: 180000000,
  headers: {'token': localStorage.getItem('token')}
});

//取消请求
var CancelTokentool = axios.CancelToken;
var sourcetool = CancelTokentool.source();

// 添加请求拦截器
instancetool.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        //isLogin('','');
        //sourcetool.cancel();
    }
   sessionStorage.clear();return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instancetool.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

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


//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染：1-应用列表2-主题列表3-最近使用记录 listType-表示列表类型8类（1-最新记录2-热门推荐3-限时低价4-人气榜5-我的应用6-最近使用0-免费专区）topicType-主题分类
function listtool(renderId,renderType,pageSize,manyType,listType,topicTyp){
		//分页
		var pageNoTemp = $("#listtool"+manyType+renderId+listType+"PageNo").val();
	
		if(pageNoTemp > 0){
		   $("#listtool"+manyType+renderId+listType+"PageNo").val(eval(pageNoTemp) + 1);
		}else{
		   $("body").append("<input type='hidden' id='listtool"+manyType+renderId+listType+"PageNo' value='1' >");
		}
			//console.log("pageNoTemp",pageNoTemp)
		//参数-manyType--需要手动处理对应字段
		var toolType = manyType;

		var toolTopic = topicTyp;
		var pageNo = $("#listtool"+manyType+renderId+listType+"PageNo").val();
    	var url = '/gj/tool/tool/list';
    	if(toolType == '2'){//主题列表
			url = '/gj/tool/tool/topic';
		}
        var token = localStorage.getItem("token");
		//传输数据
		var datatool = {
			"toolTopic":toolTopic,
            "token":token,
            "remarks":listType,
		  	"pageSize":pageSize,
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
		    "pageNo":pageNo
		}
	//console.log("datatool",datatool)
        instancetool({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: url,
            data: datatool,
        	cancelToken: sourcetool.token
        }) .then(function(rs){
           // console.log(rs)//数据在rs.data中  状态rs.status=200
            //数据处理
            if(rs.status=200){
                if( (rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1' ){
                    //$(".weui-toast--text").hide();$.toast("没有更多了", "text");
                }else{
                    listtoolRender(rs.data,renderId,renderType,manyType);
                }
            }else{
                console.log('listtool请求异常！')
            }
        });

	}

//列表渲染
function listtoolRender(data,renderId,renderType,manyType){
      var listtoolStr = '';
    //console.log(data.result)

    if(data.code == '0'){
        var zhuti = '';
        $.each(data.result,function(i,item){
            if(manyType == '1'){//应用列表
                listtoolStr += '';
                listtoolStr += '<li class="weui-news-item" onclick=toToolDetail("'+item.id+'","1")>';
                listtoolStr += '<div class="weui-news-inner">';

                listtoolStr += '<div class="weui-news-media square shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.toolImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if(item.toolJiaobiao != null && item.toolJiaobiao != '' ){
                    if(item.jiaobiaoStart != null && item.jiaobiaoEnd != null ){
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if(stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0){
                            listtoolStr += '<span class="weui-mark-rt bg-red">'+item.toolJiaobiao+'</span>';
                        }else{

                            if(item.toolPrice != null && eval(item.toolPrice) > 0.00){
                                if( item.remarks != '0'){
                                    listtoolStr += '<span class="weui-mark-rt bg-red">￥'+setNum(item.toolPrice)+'</span>';
                                }

                            }else{
                                listtoolStr += '<span class="weui-mark-rt bg-green ">免费</span>';
                            }
                        }

                    }else{

                        if(item.toolPrice != null && eval(item.toolPrice) > 0.00){
                            if( item.remarks != '0'){
                                listtoolStr += '<span class="weui-mark-rt bg-red">￥'+setNum(item.toolPrice)+'</span>';
                            }

                        }else{
                            listtoolStr += '<span class="weui-mark-rt bg-green">免费</span>';
                        }
                    }

                }else{

                    if(item.toolPrice != null && eval(item.toolPrice) > 0.00){
                        /*if( item.remarks != '0'){

                        }*/

                        listtoolStr += '<span class="weui-mark-rt bg-red">￥'+setNum(item.toolPrice)+'</span>';

                    }else{
                        listtoolStr += '<span class="weui-mark-rt bg-green">免费</span>';
                    }
                }

                listtoolStr += '</div>';
                listtoolStr += '<div class="weui-news-inners">';
                listtoolStr += '<div class="weui-news-text">';
                listtoolStr += '<div class="weui-news-title">';
                listtoolStr += ''+item.toolTitle+'';
                listtoolStr += '<p class="weui-news-p onerow">';

                listtoolStr += ''+setNULL(item.toolLabel)+'';
                listtoolStr += '</p>';
                listtoolStr += '</div>';

                listtoolStr += '</div>';
                listtoolStr += '<div class="weui-news-info">';
                listtoolStr += '<div class="weui-news-infoitem">';
                listtoolStr += '<span class="weui-news-left" id="weui-news-left">';
                listtoolStr += '<div class="weui-label-list" style="margin-left: 0px;">';

                if(item.vipshareAgent != 'undefined' &&  item.vipshareAgent != '' && item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00 ){
                    listtoolStr += '<label class="label f-red b-red">'+getYongjinMoney(setNum(item.vipshareAgent),"1")+'</label>';
                    listtoolStr += '<label class="label f-blue b-blue">'+item.toolJiesuan+'</label>';
                }else{
                    if(item.toolPrice != null && eval(item.toolPrice) > 0.00){
                        listtoolStr += '<label class="label f-red b-red">￥'+setNum(item.toolPrice)+'</label>';
                    }else{
                        listtoolStr += '<label class="label f-red b-red">免费</label>';
                    }

                    /*listtoolStr += '<label class="label f-blue b-blue">'+item.toolJiesuan+'</label>';*/
                }

                listtoolStr += '</div>';
                listtoolStr += '</span>';
                listtoolStr += '</div>';
                listtoolStr += '<div class="weui-news-infoitem">';
                listtoolStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.toolDianjiliang)+'';
                listtoolStr += '</div>';
                listtoolStr += '</div>';
                listtoolStr += '</div>';
                listtoolStr += '</div>';
                listtoolStr += '</li>';

                zhuti = item.toolTopic;

            }else if(manyType == '2' && i < 9){//主题
                listtoolStr += '<li onclick=toToolList("zhutituijiantool","1","1","'+item.value+'")>';
                listtoolStr += '<span class="shadowonly"  style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:no-repeat;background-size:cover;"><span class="weui-mark-lb boem">'+item.label+'</span></span>';
                listtoolStr += '</li>';

			}else if(manyType == '3'){//最近使用
                listtoolStr += '<a onclick=toToolDetail("'+item.id+'","1") class="grid">';
                listtoolStr += '<div class="weui-grid__icon myweui-grid__icon">';
                listtoolStr += '<img src="'+checkPath(item.toolImage,"1")+'">';
                listtoolStr += '</div>';
                listtoolStr += '<p class="weui-grid__label">';
                listtoolStr += ''+item.toolTitle+'';
                listtoolStr += '</p>';
                listtoolStr += '</a>';
            }
　　     });



		//渲染赋值
		if(renderType == '1'){
			$("#"+renderId+"").append(listtoolStr);
		}else{
			$("#"+renderId+"").html(listtoolStr);
		}
		$("#dis"+renderId+"").show();
		//console.log("========"+zhuti);
        if(zhuti != null && zhuti != ''){
            $("#zhutiname").html(zhuti);
        }
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
