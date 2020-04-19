var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost";//本地模式
}
//文件请求URL
var baseFileUrlproduct = ''+basehost+'';
//请求实例
var instanceproduct = axios.create({
  baseURL: ''+basehost+'/sfd/a/api/',
  timeout: 180000,
  headers: {'token': localStorage.getItem('token')}
});

//取消请求
var CancelTokenproduct = axios.CancelToken;
var sourceproduct = CancelTokenproduct.source();

// 添加请求拦截器
instanceproduct.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        //isLogin('','');
        //sourceproduct.cancel();
    }
   sessionStorage.clear();return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instanceproduct.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染
function listproduct(renderId,renderType,pageSize,manyType,productType,productTopic){
		//分页
		var pageNoTemp = $("#listproduct"+manyType+productType+"PageNo").val();
		if(pageNoTemp > 0){
		   $("#listproduct"+manyType+productType+"PageNo").val(eval(pageNoTemp) + 1);
		}else{
		   $("body").append("<input type='hidden' id='listproduct"+manyType+productType+"PageNo' value='1' >");
		}
		//参数-manyType--需要手动处理对应字段
        var remarks = manyType;
		var productType = productType;
		var productTopic = productTopic;
		var pageNo = $("#listproduct"+manyType+productType+"PageNo").val();
		var url = '/gw/product/product/list';
		if(remarks == '4'){//主题列表
			url = '/gw/product/product/topic';
		}
        var token = localStorage.getItem("token");
		//传输数据
		var dataproduct = {
            "remarks":remarks,
			"productType":productType,
			"productTopic":productTopic,
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
			"token":token,
		  	"pageSize":pageSize,
		    "pageNo":pageNo
		}

        instanceproduct({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: url,
            data: dataproduct,
        	cancelToken: sourceproduct.token
        }) .then(function(rs){
            //console.log(rs.data)//数据在rs.data中  状态rs.status=200
            //数据处理
            if(rs.status=200){
                listproductRender(rs.data,renderId,renderType,manyType);
            }else{
                console.log('listproduct请求异常！')
            }
        });

	}
function listproduct2(renderId,renderType,pageSize,manyType,productType,productTopic){
    //分页
    var pageNoTemp = $("#listproduct"+manyType+productType+"PageNo").val();
    if(pageNoTemp > 0){
        $("#listproduct"+manyType+productType+"PageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listproduct"+manyType+productType+"PageNo' value='1' >");
    }
    //参数-manyType--需要手动处理对应字段
    var remarks = manyType;
    var productType = productType;
    var productTopic = productTopic;
    var pageNo = $("#listproduct"+manyType+productType+"PageNo").val();
    var url = '/gw/product/product/list';
    if(remarks == '4'){//主题列表
        url = '/gw/product/product/topic';
    }
    var token = localStorage.getItem("token");
    //传输数据
    var dataproduct = {
        "remarks":remarks,
        "productType":productType,
        "productTopic":productTopic,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token,
        "pageSize":pageSize,
        "pageNo":pageNo
    }

    instanceproduct({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: dataproduct,
        cancelToken: sourceproduct.token
    }) .then(function(rs){
        //console.log(rs.data)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            listproductRender2(rs.data,renderId,renderType,manyType);
        }else{
            console.log('listproduct请求异常！')
        }
    });

}
function listproduct3(renderId,renderType,pageSize,manyType,productType,productTopic,obj,shuzi){
    //分页
    var pageNoTemp = $("#listproduct"+manyType+productType+renderId+"PageNo").val();
    if(pageNoTemp > 0){
        $("#listproduct"+manyType+productType+renderId+"PageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listproduct"+manyType+productType+renderId+"PageNo' value='1' >");
    }
    //参数-manyType--需要手动处理对应字段
    var remarks = manyType;
    var productType = productType;
    var productTopic = productTopic;
    var pageNo = $("#listproduct"+manyType+productType+renderId+"PageNo").val();
    var url = '/gw/product/product/list';
    if(remarks == '4'){//主题列表
        url = '/gw/product/product/topic';
    }
    var token = localStorage.getItem("token");
    //传输数据
    var dataproduct = {
        "remarks":remarks,
        "productType":productType,
        "productTopic":productTopic,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token,
        "pageSize":pageSize,
        "pageNo":pageNo
    }

    instanceproduct({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: dataproduct,
        cancelToken: sourceproduct.token
    }) .then(function(rs){
        //console.log(rs.data)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            listproductRender3(rs.data,renderId,renderType,manyType,obj,shuzi);
        }else{
            console.log('listproduct请求异常！')
        }
    });

}
function listproduct4(renderId,renderType,pageSize,manyType,productType,productTopic,obj,shuzi,productZc,listStyle){
    //分页
    var pageNoTemp = $("#listproduct"+manyType+productType+"PageNo").val();
    if(pageNoTemp > 0){
        $("#listproduct"+manyType+productType+"PageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listproduct"+manyType+productType+"PageNo' value='1' >");
    }
    //参数-manyType--需要手动处理对应字段
    var remarks = manyType;
    var productType = productType;
    var productZc = productZc;
    var productTopic = productTopic;
    var pageNo = $("#listproduct"+manyType+productType+"PageNo").val();
    var url = '/gw/product/product/list';
    if(remarks == '4'){//主题列表
        url = '/gw/product/product/topic';
    }else if(remarks == '7'){//主题列表
        url = '/gw/product/product/suijilist';
    }
    var token = localStorage.getItem("token");
    //传输数据
    var dataproduct = {
        "remarks":remarks,
        "productType":productType,
        "productTopic":productTopic,
        "productZc":productZc,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token,
        "pageSize":pageSize,
        "pageNo":pageNo
    }

    instanceproduct({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: dataproduct,
        cancelToken: sourceproduct.token
    }) .then(function(rs){
        //console.log("----------------")//数据在rs.data中  状态rs.status=200
        //console.log(rs.data)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            listproductRender4(rs.data,renderId,renderType,manyType,obj,shuzi,listStyle);
        }else{
            console.log('listproduct请求异常！')
        }
    });

}

function listproduct5(renderId,renderType,pageSize,manyType,productType,productTopic,obj,shuzi,productZc,listStyle){
    //分页
    var pageNoTemp = $("#listproduct"+manyType+productType+"PageNo").val();
    if(pageNoTemp > 0){
        $("#listproduct"+manyType+productType+"PageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listproduct"+manyType+productType+"PageNo' value='1' >");
    }
    //参数-manyType--需要手动处理对应字段
    var remarks = manyType;
    var productType = productType;
    var productZc = productZc;
    var productTopic = productTopic;
    var pageNo = $("#listproduct"+manyType+productType+"PageNo").val();
    var url = '/gw/product/product/list';
    if(remarks == '4'){//主题列表
        url = '/gw/product/product/topic';
    }
    if(remarks == '5'){//分类列表
        url = '/gw/product/product/fenlei';
    }

    var token = localStorage.getItem("token");
    //传输数据
    var dataproduct = {
        "remarks":remarks,
        "productType":productType,
        "productTopic":productTopic,
        "productZc":productZc,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token,
        "pageSize":pageSize,
        "pageNo":pageNo
    }

    instanceproduct({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: dataproduct,
        cancelToken: sourceproduct.token
    }) .then(function(rs){
        //console.log("----------------")//数据在rs.data中  状态rs.status=200
        //console.log(rs.data)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            listproductRender5(rs.data,renderId,renderType,manyType,obj,shuzi,listStyle);
        }else{
            console.log('listproduct请求异常！')
        }
    });

}


//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染
function listmyproduct(renderId,renderType,pageSize,manyType,productType,productTopic){
    //分页
    var pageNoTemp = $("#listproduct"+manyType+productType+"PageNo").val();
    if(pageNoTemp > 0){
        $("#listproduct"+manyType+productType+"PageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listproduct"+manyType+productType+"PageNo' value='1' >");
    }
    //参数-manyType--需要手动处理对应字段
    var remarks = manyType;
    var productType = productType;
    var productTopic = productTopic;
    var pageNo = $("#listproduct"+manyType+productType+"PageNo").val();
    var url = '/gw/product/product/my';
    if(remarks == '4'){//主题列表
        url = '/gw/product/product/topic';
    }
    var token = localStorage.getItem("token");
    //传输数据
    var dataproduct = {
        "remarks":remarks,
        "productType":productType,
        "productTopic":productTopic,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "remarks":getSaasId(),
        "token":token,
        "pageSize":pageSize,
        "pageNo":pageNo
    }

    instanceproduct({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: dataproduct,
        cancelToken: sourceproduct.token
    }) .then(function(rs){
        //console.log(rs.data)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            listmyproductRender(rs.data,renderId,renderType,manyType);
        }else{
            console.log('listproduct请求异常！')
        }
    });

}

//列表渲染
function listproductRender(data,renderId,renderType,manyType){
    var listzqStr = '';
    //1.分类 2.秒杀3.热销4.主题推荐
    if(data.code == '0'){
        var zhuti = '';
        if(manyType == '4'){
            // $.each(data.result,function(i,item){

            //console.log(i, item);
            //渲染内容处理
            var str2 = '';
            str2 += '<div class="weui-feeds" style="margin-top: 2px;">';
            str2 += '<ul>';
            $.each(data.result,function(i,item){
                if(i < 9){
                    str2 += '<li onclick=toProductList("zhutituijian","1","","'+item.value+'");>';
                    str2 += '<span class="shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:no-repeat;background-size:cover;"></span>';
                    str2 += '</li>';
                }
            });
            str2 += '</ul>';
            str2 += '</div>';
            if(renderType == '1'){
                $("#zhutituijian2").append(str2);
            }else{
                $("#zhutituijian2").html(str2);
            }
            if(str2 != null && str2 != ''){
                $("#diszhutituijian2").show();
            }

            if(data.result.length > 9){
                var str3 = '';
                str3 += '<div class="weui-feeds" style="margin-top: 2px;">';
                str3 += '<ul>';
                $.each(data.result,function(i,item){
                    if(i > 8 && i < 18){
                        str3 += '<li onclick=toProductList("zhutituijian","1","","'+item.value+'");>';
                        str3 += '<span class="shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:no-repeat;background-size:cover;"></span>';
                        str3 += '</li>';
                    }
                });
                str3 += '</ul>';
                str3 += '</div>';
                if(renderType == '1'){
                    $("#zhutituijian3").append(str3);
                }else{
                    $("#zhutituijian3").html(str3);
                }
                if(str3 != null && str3 != ''){
                    $("#diszhutituijian3").show();
                }

            }

            if(data.result.length > 18){
                var str4 = '';
                str4 += '<div class="weui-feeds" style="margin-top: 2px;">';
                str4 += '<ul>';
                $.each(data.result,function(i,item){
                    if(i > 17 && i < 27){
                        str4 += '<li onclick=toProductList("zhutituijian","1","","'+item.value+'");>';
                        str4 += '<span class="shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:no-repeat;background-size:cover;"></span>';
                        str4 += '</li>';
                    }
                });
                str4 += '</ul>';
                str4 += '</div>';
                if(renderType == '1'){
                    $("#zhutituijian4").append(str4);
                }else{
                    $("#zhutituijian4").html(str4);
                }
                if(str4 != null && str4 != ''){
                    $("#diszhutituijian4").show();
                }

            }

            if(data.result.length > 27){
                var str5 = '';
                str5 += '<div class="weui-feeds" style="margin-top: 2px;">';
                str5 += '<ul>';
                $.each(data.result,function(i,item){
                    if(i > 26 && i < 36){
                        str5 += '<li onclick=toProductList("zhutituijian","1","","'+item.value+'");>';
                        str5 += '<span class="shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:no-repeat;background-size:cover;"></span>';
                        str5 += '</li>';
                    }
                });
                str5 += '</ul>';
                str5 += '</div>';
                if(renderType == '1'){
                    $("#zhutituijian5").append(str5);
                }else{
                    $("#zhutituijian5").html(str5);
                }
                if(str5 != null && str5 != ''){
                    $("#diszhutituijian5").show();
                }

            }

            if(data.result.length > 36 && $("#zhutituijian6").size() > 0){
                var str6 = '';
                str6 += '<div class="weui-feeds" style="margin-top: 2px;">';
                str6 += '<ul>';
                $.each(data.result,function(i,item){
                    if(i > 35 && i < 45){
                        str6 += '<li onclick=toProductList("zhutituijian","1","","'+item.value+'");>';
                        str6 += '<span class="shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:no-repeat;background-size:cover;"></span>';
                        str6 += '</li>';
                    }
                });
                str6 += '</ul>';
                str6 += '</div>';
                if(renderType == '1'){
                    $("#zhutituijian6").append(str6);
                }else{
                    $("#zhutituijian6").html(str6);
                }
                if(str6 != null && str6 != ''){
                    $("#diszhutituijian6").show();
                }

            }




            // });
        }else{
            $.each(data.result,function(i,item){

                listzqStr += '<li class="weui-news-item" onclick=toProductDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner" >';
                if(item.kucun == '0' || item.kucun == 0){
                    listzqStr += '<div class="weui-news-media square zanshigray shadowonly" style="background-image:url(' + checkPathBackGroubdImage(getFirstImageDetailContent(item.productImage), "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;width: 5.4rem;height: 5.4rem;">';
                }else{
                    listzqStr += '<div class="weui-news-media square shadowonly" style="background-image:url(' + checkPathBackGroubdImage(getFirstImageDetailContent(item.productImage), "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;width: 5.4rem;height: 5.4rem;">';

                }

                if (item.productJiaobiao != null && item.productJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.productJiaobiao + '</span>';
                        } else {
                            if (item.productLabel != null && item.productLabel != '') {
                                var str = item.productLabel; //这是一字符串
                                var strs= new Array(); //定义一数组
                                strs=str.split("/"); //字符分割
                                for (i=0;i<strs.length ;i++ )
                                {
                                    if(i == 0){
                                        listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                                    }

                                }


                            }
                        }

                    } else {
                        if (item.productLabel != null && item.productLabel != '') {
                            var str = item.productLabel; //这是一字符串
                            var strs= new Array(); //定义一数组
                            strs=str.split("/"); //字符分割
                            for (i=0;i<strs.length ;i++ )
                            {
                                if(i == 0){
                                    listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                                }

                            }
                        }
                    }

                } else {
                    if (item.productLabel != null && item.productLabel != '') {
                        var str = item.productLabel; //这是一字符串
                        var strs= new Array(); //定义一数组
                        strs=str.split("/"); //字符分割
                        for (i=0;i<strs.length ;i++ )
                        {
                            if(i == 0){
                                listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                            }

                        }
                    }
                }


                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                if(item.kucun == '0' || item.kucun == 0) {
                    listzqStr += '<div class="weui-news-title" style="font-size: 16px;font-weight: normal;color: gray;">' + item.productTitle + '';
                }else{
                    listzqStr += '<div class="weui-news-title" style="font-size: 16px;font-weight: normal;color: #000000;">' + item.productTitle + '';

                }
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info" style="padding:0px;">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';

                listzqStr += '<p class="f-gray f14 " style="margin-top: 2px;margin-bottom: 5px;">' + setNum(item.productLabel) + '</p>';

                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {

                    if(item.kucun == '0' || item.kucun == 0){
                        listzqStr += '<label class="label f-gray b-gray">' + getYongjinMoney4(setNum(item.vipshareAgent),"1") + '</label><br>';

                    }else{
                        listzqStr += '<label class="label f-red b-red">' + getYongjinMoney4(setNum(item.vipshareAgent),"1") + '</label><br>';

                    }
                }
                if(item.kucun == '0' || item.kucun == 0) {
                    listzqStr += '<span style="color: gray;font-size: 18px;" ><span style="font-size: smaller">￥</span>' + setNum(item.productPrice) + '<span style="font-size: xx-small;text-decoration: line-through;color: gray;margin-left: 5px;">￥'+setNum(item.yuanjia)+'</span></span>';
                }else{
                    listzqStr += '<span style="color: red;font-size: 18px;" ><span style="font-size: smaller">￥</span>' + setNum(item.productPrice) + '<span style="font-size: xx-small;text-decoration: line-through;color: gray;margin-left: 5px;">￥'+setNum(item.yuanjia)+'</span></span>';

                }

                listzqStr += '<span style="margin-left: 15px;">已售' + setNum(item.productDianjiliang) + '</span>';

                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                /*listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '已售' + setNum(item.productDianjiliang) + '';
                listzqStr += '</div>';*/
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhuti = item.productTopic;
            });

            //渲染赋值
            if(renderType == '1'){
                $("#"+renderId+"").append(listzqStr);
            }else{
                $("#"+renderId+"").html(listzqStr);
            }
            if(listzqStr != null && listzqStr != ''){
                $("#dis" + renderId + "").show();
            }
            if(zhuti != null && zhuti != ''){
                $("#zhutiname").html(zhuti);
            }
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
function listproductRender2(data,renderId,renderType,manyType){
    var listzqStr = '';
    //1.分类 2.秒杀3.热销4.主题推荐
    if(data.code == '0'){
        var zhuti = '';

            $.each(data.result,function(i,item){

                listzqStr += '<div style="margin-top: 15px;width: 50% !important;" onclick=toProductDetail("'+item.id+'","1"); class="categoryItem" data-url="/category/detail/1" data-seccategory="-1">';
                listzqStr += '<div class="categoryIcon lazyLoad" ></div>';
                listzqStr += '<div class="cursorArea" ><img src="'+getFirstImageDetailContent(item.productImage)+'"  width="100%" /></div>';
                listzqStr += '<span class="text" style="color:red;">￥'+setNum(item.productPrice)+'</span>';
                listzqStr += '<span class="text">'+item.productTitle+'</span>';
                listzqStr += '</div>';

                /*listzqStr += '<li class="weui-news-item" onclick=toProductDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner" >';

                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(getFirstImageDetailContent(item.productImage), "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;width: 5.4rem;height: 5.4rem;">';

                if (item.productJiaobiao != null && item.productJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.productJiaobiao + '</span>';
                        } else {
                            if (item.productLabel != null && item.productLabel != '') {
                                var str = item.productLabel; //这是一字符串
                                var strs= new Array(); //定义一数组
                                strs=str.split("/"); //字符分割
                                for (i=0;i<strs.length ;i++ )
                                {
                                    if(i == 0){
                                        listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                                    }

                                }


                            }
                        }

                    } else {
                        if (item.productLabel != null && item.productLabel != '') {
                            var str = item.productLabel; //这是一字符串
                            var strs= new Array(); //定义一数组
                            strs=str.split("/"); //字符分割
                            for (i=0;i<strs.length ;i++ )
                            {
                                if(i == 0){
                                    listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                                }

                            }
                        }
                    }

                } else {
                    if (item.productLabel != null && item.productLabel != '') {
                        var str = item.productLabel; //这是一字符串
                        var strs= new Array(); //定义一数组
                        strs=str.split("/"); //字符分割
                        for (i=0;i<strs.length ;i++ )
                        {
                            if(i == 0){
                                listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                            }

                        }
                    }
                }


                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title" style="font-size: 18px;font-weight: 500;">' + item.productTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-red b-red" style="margin-bottom: 10px;">原价￥' + setNum(item.yuanjia) + '</label>';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-blue b-blue">' + getYongjinMoney4(setNum(item.vipshareAgent),"1") + '</label>';
                }
                listzqStr += '<br><span style="color: red;" >会员价￥' + setNum(item.productPrice) + '</span>';
                listzqStr += '<span style="margin-left: 15px;">已售' + setNum(item.productDianjiliang) + '</span>';

                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                /!*listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '已售' + setNum(item.productDianjiliang) + '';
                listzqStr += '</div>';*!/
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhuti = item.productTopic;*/
            });

            //渲染赋值
            if(renderType == '1'){
                $("#"+renderId+"").append(listzqStr);
            }else{
                $("#"+renderId+"").html(listzqStr);
            }
            if(listzqStr != null && listzqStr != ''){
                $("#dis" + renderId + "").show();
            }
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
function listproductRender3(data,renderId,renderType,manyType,obj,shuzi){
    var listzqStr = '';
    //1.分类 2.秒杀3.热销4.主题推荐
    if(data.code == '0'){
         var bgcolor = '#9a6e3a';
         var s = Math.floor(Math.random()*10);
         if(s == 0){
             bgcolor = '#F44336';
         }else if(s == 1){
             bgcolor = '#E91E63';
         }else if(s == 2){
             bgcolor = '#9C27B0';
         }else if(s == 3){
             bgcolor = '#3F51B5';
         }else if(s == 4){
             bgcolor = '#2196F3';
         }else if(s == 5){
             bgcolor = '#00BCD4';
         }else if(s == 6){
             bgcolor = '#009688';
         }else if(s == 7){
             bgcolor = '#4CAF50';
         }else if(s == 8){
             bgcolor = '#FFC107';
         }else if(s == 9){
             bgcolor = '#FF9800';
         }

        var str1 = '';

        str1 += '<div class="swiper-slide">';
        str1 += '<a>';
        str1 += '<div class="weui-flex productshadow" style="border-radius: 5px;background-color: '+bgcolor+';">';
        str1 += ' <div class="weui-flex__item ">';
        str1 += '<div class="weui-news-p onerow center2 ">';
        str1 += '<div>';
        str1 += '<img class="product "  src="../../img/agent/fl/z1.png">';
        str1 += '</div>';
        str1 += '</div>';
        str1 += '<div class="left5" ><p style="font-weight: bolder;font-size:21.5px !important;text-align: center;margin-top: 10px;margin-bottom: 11px;color: white;">More+</p></div>';
        str1 += '<div class="weui-news-p onerow center2">';
        str1 += '</div>';
        str1 += '</div>';
        str1 += '</div>';
        str1 += '</a>';


        str1 += '</div>';
        $.each(data.result,function(i,item){
            str1 += '<div class="swiper-slide">';

            str1 += '<a onclick=toProductDetail("' + item.id + '","1")>';

            str1 += '<div class="weui-flex productshadow">';
            str1 += ' <div class="weui-flex__item ">';
            str1 += '<div class="weui-news-p onerow center2 ">';
            str1 += '<div>';
            if(getFirstImageDetailContent(item.productImage).search('.json') != -1){
                str1 += '<lottie-player src="'+checkPath(getFirstImageDetailContent(item.productImage),'1')+'"  background="transparent"  speed="1"  class="yingyong"  loop autoplay ></lottie-player>';
            }else{

                if(item.kucun == '0' || item.kucun == 0){
                    str1 += '<img class="product  zanshigray"  src="'+ checkPath(getFirstImageDetailContent(item.productImage),'1')+'">';
                }else{
                    str1 += '<img class="product "  src="'+ checkPath(getFirstImageDetailContent(item.productImage),'1')+'">';

                    str1 += '<div class="f-red b-red f10" style="position:relative;margin-bottom: 10px;margin-top: -25px;float: right;border-bottom-left-radius:10px;border-top-left-radius:10px;padding-right: 5px;padding-left: 10px;font-size: x-small;">' + getYongjinMoney4(setNum(item.vipshareAgent),"1") + '</div>';

                }


            }
            str1 += '</div>';
            str1 += '</div>';
            if(item.kucun == '0'){
                str1 += '<div class="weui-news-p tworow  f-gray f16 left5" style="font-weight: 300;">'+setNULL(item.productTitle)+'</div>';
            }else{
                str1 += '<div class="weui-news-p tworow  f16 left5" style="font-weight: 300;">'+setNULL(item.productTitle)+'</div>';
            }
            str1 += '<div class="weui-news-p onerow">';
            str1 += '<div class="weui-label-list">';
            if(item.kucun == '0' || item.kucun == 0){
                str1 += '<label class="onerow f-gray f18" style="margin-bottom: 10px;margin-left:-5px;"><span style="font-size: smaller;">￥</span>' + setNum(item.productPrice) + '</label>';
                str1 += '<label class="onerow f-gray f10" style="margin-bottom: 10px;margin-left:5px;text-decoration:line-through;font-size: xx-small;">￥' + setNum(item.yuanjia) + '</label>';

                // str1 += '<label class="label f-gray b-gray " style="margin-bottom: 10px;border-radius: 20px;font-weight: bold;font-size: smaller;">'+item.productPrice+'</label>';
            }else{
                str1 += '<label class="onerow f-red f18" style="margin-bottom: 10px;margin-left:-5px;"><span style="font-size: smaller;">￥</span>' + setNum(item.productPrice) + '</label>';
                str1 += '<label class="onerow f-gray f10" style="margin-bottom: 10px;margin-left:5px;text-decoration:line-through;font-size: xx-small;">￥' + setNum(item.yuanjia) + '</label>';
               // str1 += '<label class="label f-red b-yellow" style="margin-bottom: 10px;border-radius: 20px;font-weight: bold;font-size: smaller;">'+item.productPrice+'</label>';
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
        if(rs.data.code == '-1'){
            localStorage.setItem('token','');
            if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                isLogin('','');
            }
        }
    }
}
function listproductRender4(data,renderId,renderType,manyType,obj,shuzi,listStyle){
    if(data.code == '0'){
    //style 1-滑动列表2-双产品列表3-单产品列表
        if(listStyle == '1'){
            $.each(data.result,function(j,item2){
                //1.分类 2.秒杀3.热销4.主题推荐
                var bgcolor = '#9a6e3a';
                var s = Math.floor(Math.random()*10);
                if(s == 0){
                    bgcolor = '#F44336';
                }else if(s == 1){
                    bgcolor = '#E91E63';
                }else if(s == 2){
                    bgcolor = '#9C27B0';
                }else if(s == 3){
                    bgcolor = '#3F51B5';
                }else if(s == 4){
                    bgcolor = '#2196F3';
                }else if(s == 5){
                    bgcolor = '#00BCD4';
                }else if(s == 6){
                    bgcolor = '#009688';
                }else if(s == 7){
                    bgcolor = '#4CAF50';
                }else if(s == 8){
                    bgcolor = '#FFC107';
                }else if(s == 9){
                    bgcolor = '#FF9800';
                }

                if(item2.beijingse != null && item2.beijingse != '' ){
                    bgcolor = item2.beijingse;
                }


                var str1 = '';


                str1 += '<div class="swiper-style swiper-container" id="swiper-container'+renderId+j+'">';
                str1 += '<div class="swiper-wrapper" id="zhuti'+renderId+j+'">';



                str1 += '<div class="swiper-slide">';
                str1 += '<a  href="gouwulistzhuanti.html?productTopic='+item2.value+'&listStyle=2">';
                str1 += '<div class="weui-flex productshadow" style="border-radius: 5px;background-color: '+bgcolor+';">';
                str1 += ' <div class="weui-flex__item ">';
                str1 += '<div class="weui-news-p onerow center2 ">';
                str1 += '<div>';
                str1 += '<img class="product "  src="'+checkPath(item2.logo,'1')+'">';
                str1 += '</div>';
                str1 += '</div>';
                str1 += '<div class="left5" ><p style="font-weight: bolder;font-size:18px !important;text-align: center;margin-top: 21px;margin-bottom: 21px;color: white;">'+item2.label+'<span style="font-size: xx-small">+</span></p></div>';
                str1 += '<div class="weui-news-p onerow center2">';
                str1 += '</div>';
                str1 += '</div>';
                str1 += '</div>';
                str1 += '</a>';
                str1 += '</div>';


                $.each(item2.productList,function(i,item){
                    str1 += '<div class="swiper-slide">';

                    str1 += '<a onclick=toProductDetail("' + item.id + '","1")>';

                    str1 += '<div class="weui-flex productshadow">';
                    str1 += ' <div class="weui-flex__item ">';
                    str1 += '<div class="weui-news-p onerow center2 ">';
                    str1 += '<div>';
                    if(getFirstImageDetailContent(item.productImage).search('.json') != -1){
                        str1 += '<lottie-player src="'+checkPath(getFirstImageDetailContent(item.productImage),'1')+'"  background="transparent"  speed="1"  class="yingyong"  loop autoplay ></lottie-player>';
                    }else{

                        if(item.kucun == '0' || item.kucun == 0){
                            str1 += '<img class="product  zanshigray"  src="'+ checkPath(getFirstImageDetailContent(item.productImage),'1')+'">';
                        }else{
                            str1 += '<img class="product "  src="'+ checkPath(getFirstImageDetailContent(item.productImage),'1')+'">';

                            str1 += '<div class="f-red b-red f10" style="position:relative;margin-bottom: 10px;margin-top: -32px;float: right;border-bottom-left-radius:10px;border-top-left-radius:10px;padding-right: 5px;padding-left: 10px;font-size: 12px; line-height: 12px;padding-top: 2px;padding-bottom: 2px;">' + getYongjinMoney4(setNum(item.vipshareAgent),"1") + '</div>';

                        }


                    }
                    str1 += '</div>';
                    str1 += '</div>';
                    if(item.kucun == '0'){
                        str1 += '<div class="weui-news-p tworow  f-gray f16 left5" style="font-weight: 300;color:gray;line-height: 22px;height: 44px;">'+setNULL(item.productTitle)+'</div>';
                    }else{
                        str1 += '<div class="weui-news-p tworow  f16 left5" style="font-weight: 300;color:#000000;line-height: 22px;height: 44px;">'+setNULL(item.productTitle)+'</div>';
                    }
                    str1 += '<div class="weui-news-p onerow">';
                    str1 += '<div class="weui-label-list">';
                    if(item.kucun == '0' || item.kucun == 0){
                        str1 += '<label class="onerow f-gray f18" style="margin-bottom: 10px;margin-left:-5px;"><span style="font-size: smaller;">￥</span>' + setNum(item.productPrice) + '</label>';
                        str1 += '<label class="onerow f-gray f10" style="margin-bottom: 10px;margin-left:5px;text-decoration:line-through;font-size: xx-small;">￥' + setNum(item.yuanjia) + '</label>';

                        // str1 += '<label class="label f-gray b-gray " style="margin-bottom: 10px;border-radius: 20px;font-weight: bold;font-size: smaller;">'+item.productPrice+'</label>';
                    }else{
                        str1 += '<label class="onerow f-red f18" style="margin-bottom: 10px;margin-left:-5px;"><span style="font-size: smaller;">￥</span>' + setNum(item.productPrice) + '</label>';
                        str1 += '<label class="onerow f-gray f10" style="margin-bottom: 10px;margin-left:5px;text-decoration:line-through;font-size: xx-small;">￥' + setNum(item.yuanjia) + '</label>';
                        // str1 += '<label class="label f-red b-yellow" style="margin-bottom: 10px;border-radius: 20px;font-weight: bold;font-size: smaller;">'+item.productPrice+'</label>';
                    }
                    str1 += '</div>';
                    str1 += '</div>';
                    str1 += '</div>';
                    str1 += '</div>';


                    str1 += '</a>';
                    str1 += '</div>';
                });

                str1 += '</div>';
                str1 += '</div>';



                $("#"+renderId+"").append(str1);
                lunbotu(obj,renderId+j,shuzi);
                $("#"+renderId+"").show();
                $("#swiper-container"+renderId+j+"").show();
                $("#swiper-pagination"+renderId+j+"").show();
            });



        }else if(listStyle == '2'){

            var str1 = '';
            str1 += '<div  class="weui-grids"  >';
                $.each(data.result,function(i,item){


                    str1 += '<a onclick=toProductDetail("' + item.id + '","1") class="grid" style="width: 50% !important;padding: 5px 3px !important;">';

                    str1 += '<div class="weui-flex productshadow" style="background-color: white;">';
                    str1 += ' <div class="weui-flex__item ">';
                    str1 += '<div class="weui-news-p onerow center2 ">';
                    str1 += '<div>';
                    if(getFirstImageDetailContent(item.productImage).search('.json') != -1){
                        str1 += '<lottie-player src="'+checkPath(getFirstImageDetailContent(item.productImage),'1')+'"  background="transparent"  speed="1"  class="yingyong"  loop autoplay ></lottie-player>';
                    }else{

                        if(item.kucun == '0' || item.kucun == 0){
                            str1 += '<img class="product  zanshigray"  src="'+ checkPath(getFirstImageDetailContent(item.productImage),'1')+'">';
                        }else{
                            str1 += '<img class="product "  src="'+ checkPath(getFirstImageDetailContent(item.productImage),'1')+'">';

                            str1 += '<div class="f-red b-red f10" style="position:relative;margin-bottom: 10px;margin-top: -32px;float: right;border-bottom-left-radius:10px;border-top-left-radius:10px;padding-right: 5px;padding-left: 10px;font-size: 12px; line-height: 12px;padding-top: 2px;padding-bottom: 2px;">' + getYongjinMoney4(setNum(item.vipshareAgent),"1") + '</div>';

                        }


                    }
                    str1 += '</div>';
                    str1 += '</div>';
                    if(item.kucun == '0'){
                        str1 += '<div class="weui-news-p tworow  f-gray f16 left5" style="font-weight: 300;color: gray;line-height: 22px;height: 44px;">'+setNULL(item.productTitle)+'</div>';
                    }else{
                        str1 += '<div class="weui-news-p tworow  f16 left5" style="font-weight: 300;color: #000000;line-height: 22px;height: 44px;">'+setNULL(item.productTitle)+'</div>';
                    }
                    str1 += '<div class="weui-news-p onerow">';
                    str1 += '<div class="weui-label-list">';
                    if(item.kucun == '0' || item.kucun == 0){
                        str1 += '<label class="onerow f-gray f18" style="margin-bottom: 10px;margin-left:-5px;"><span style="font-size: smaller;">￥</span>' + setNum(item.productPrice) + '</label>';
                        str1 += '<label class="onerow f-gray f10" style="margin-bottom: 10px;margin-left:5px;text-decoration:line-through;font-size: xx-small;">￥' + setNum(item.yuanjia) + '</label>';

                        // str1 += '<label class="label f-gray b-gray " style="margin-bottom: 10px;border-radius: 20px;font-weight: bold;font-size: smaller;">'+item.productPrice+'</label>';
                    }else{
                        str1 += '<label class="onerow f-red f18" style="margin-bottom: 10px;margin-left:-5px;"><span style="font-size: smaller;">￥</span>' + setNum(item.productPrice) + '</label>';
                        str1 += '<label class="onerow f-gray f10" style="margin-bottom: 10px;margin-left:5px;text-decoration:line-through;font-size: xx-small;">￥' + setNum(item.yuanjia) + '</label>';
                        // str1 += '<label class="label f-red b-yellow" style="margin-bottom: 10px;border-radius: 20px;font-weight: bold;font-size: smaller;">'+item.productPrice+'</label>';
                    }
                    str1 += '</div>';
                    str1 += '</div>';
                    str1 += '</div>';
                    str1 += '</div>';


                    str1 += '</a>';



            });
            str1 += '</div>';


            //渲染赋值
            if(renderType == '1'){
                $("#"+renderId+"").append(str1);
            }else{
                $("#"+renderId+"").html(str1);
            }
            if(str1 != null && str1 != ''){
                $("#dis" + renderId + "").show();
            }
            if(data.productTopic != null && data.productTopic != ''){

                if(data.productTopic.zhuantitu != null && data.productTopic.zhuantitu != ''){
                    var str2 = '';
                    if(data.productTopic.zhuantitu.search('.json') != -1){
                        str2 += '<lottie-player src="'+checkPath(data.productTopic.zhuantitu,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                    }else{
                        str2 += '<img class="maxh"  src="'+ checkPath(data.productTopic.zhuantitu,'1')+'">';
                    }
                    $("#beijingtu").html(str2);
                }
                if(data.productTopic.beijingse != null && data.productTopic.beijingse != ''){
                    //$("body").css("background-color",data.productTopic.beijingse);
                    $("#beijingse").css("background-color",data.productTopic.beijingse);
                    $("#beijingse2").css("background-color",data.productTopic.beijingse);
                    $("#beijingse3").css("background-color",data.productTopic.beijingse);
                }



            }
            if(data.productType != null && data.productType != ''){

                if(data.productType.zhuantitu != null && data.productType.zhuantitu != ''){
                    var str2 = '';
                    if(data.productType.zhuantitu.search('.json') != -1){
                        str2 += '<lottie-player src="'+checkPath(data.productType.zhuantitu,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                    }else{
                        str2 += '<img class="maxh"  src="'+ checkPath(data.productType.zhuantitu,'1')+'">';
                    }
                    $("#beijingtu").html(str2);
                }
                if(data.productType.beijingse != null && data.productType.beijingse != ''){
                    //$("body").css("background-color",data.productType.beijingse);
                    $("#beijingse").css("background-color",data.productType.beijingse);
                    $("#beijingse2").css("background-color",data.productType.beijingse);
                    $("#beijingse3").css("background-color",data.productType.beijingse);
                }

            }
            if(data.productZc != null && data.productZc != ''){
                if(data.productZc.zhuantitu != null && data.productZc.zhuantitu != ''){
                    var str2 = '';
                    if(data.productZc.zhuantitu.search('.json') != -1){
                        str2 += '<lottie-player src="'+checkPath(data.productZc.zhuantitu,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                    }else{
                        str2 += '<img class="maxh"  src="'+ checkPath(data.productZc.zhuantitu,'1')+'">';
                    }
                    $("#beijingtu").html(str2);
                }
                if(data.productZc.beijingse != null && data.productZc.beijingse != ''){
                    //$("body").css("background-color",data.productZc.beijingse);
                    $("#beijingse").css("background-color",data.productZc.beijingse);
                    $("#beijingse2").css("background-color",data.productZc.beijingse);
                    $("#beijingse3").css("background-color",data.productZc.beijingse);
                }
            }

        }else if(listStyle == '3'){
            var listzqStr = '';
            $.each(data.result,function(i,item) {
                listzqStr += '<li class="weui-news-item listbeijing" onclick=toProductDetail("' + item.id + '","1"); style="width: 100%;">';
                listzqStr += '<div class="weui-news-inner" >';
                if (item.kucun == '0' || item.kucun == 0) {
                    listzqStr += '<div class="weui-news-media square zanshigray" style="background-image:url(' + checkPathBackGroubdImage(getFirstImageDetailContent(item.productImage), "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;width: 5.4rem;height: 5.4rem;">';
                } else {
                    listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(getFirstImageDetailContent(item.productImage), "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;width: 5.4rem;height: 5.4rem;">';

                }

                if (item.productJiaobiao != null && item.productJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.productJiaobiao + '</span>';
                        } else {
                            if (item.productLabel != null && item.productLabel != '') {
                                var str = item.productLabel; //这是一字符串
                                var strs = new Array(); //定义一数组
                                strs = str.split("/"); //字符分割
                                for (i = 0; i < strs.length; i++) {
                                    if (i == 0) {
                                        listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                                    }

                                }


                            }
                        }

                    } else {
                        if (item.productLabel != null && item.productLabel != '') {
                            var str = item.productLabel; //这是一字符串
                            var strs = new Array(); //定义一数组
                            strs = str.split("/"); //字符分割
                            for (i = 0; i < strs.length; i++) {
                                if (i == 0) {
                                    listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                                }

                            }
                        }
                    }

                } else {
                    if (item.productLabel != null && item.productLabel != '') {
                        var str = item.productLabel; //这是一字符串
                        var strs = new Array(); //定义一数组
                        strs = str.split("/"); //字符分割
                        for (i = 0; i < strs.length; i++) {
                            if (i == 0) {
                                listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                            }

                        }
                    }
                }


                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                if (item.kucun == '0' || item.kucun == 0) {
                    listzqStr += '<div class="weui-news-title" style="font-size: 16px;font-weight: normal;color: gray;">' + item.productTitle + '';
                } else {
                    listzqStr += '<div class="weui-news-title" style="font-size: 16px;font-weight: normal;color: #000000;">' + item.productTitle + '';

                }
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info" style="padding:0px;">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';

                listzqStr += '<p class="f-gray f14 " style="margin-top: 2px;margin-bottom: 5px;">' + setNum(item.productLabel) + '</p>';

                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {

                    if (item.kucun == '0' || item.kucun == 0) {
                        listzqStr += '<label class="label f-gray b-gray">' + getYongjinMoney4(setNum(item.vipshareAgent), "1") + '</label><br>';

                    } else {
                        listzqStr += '<label class="label f-red b-red">' + getYongjinMoney4(setNum(item.vipshareAgent), "1") + '</label><br>';

                    }
                }
                if (item.kucun == '0' || item.kucun == 0) {
                    listzqStr += '<span style="color: gray;font-size: 18px;" ><span style="font-size: smaller">￥</span>' + setNum(item.productPrice) + '<span style="font-size: xx-small;text-decoration: line-through;color: gray;margin-left: 5px;">￥' + setNum(item.yuanjia) + '</span></span>';
                } else {
                    listzqStr += '<span style="color: red;font-size: 18px;" ><span style="font-size: smaller">￥</span>' + setNum(item.productPrice) + '<span style="font-size: xx-small;text-decoration: line-through;color: gray;margin-left: 5px;">￥' + setNum(item.yuanjia) + '</span></span>';

                }

                listzqStr += '<span style="margin-left: 15px;">已售' + setNum(item.productDianjiliang) + '</span>';

                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                /*listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '已售' + setNum(item.productDianjiliang) + '';
                listzqStr += '</div>';*/
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
            });
            //渲染赋值
            if(renderType == '1'){
                $("#"+renderId+"").append(listzqStr);
            }else{
                $("#"+renderId+"").html(listzqStr);
            }
            if(listzqStr != null && listzqStr != ''){
                $("#dis" + renderId + "").show();
            }
            if(data.productTopic != null && data.productTopic != ''){

                if(data.productTopic.zhuantitu != null && data.productTopic.zhuantitu != ''){
                    var str2 = '';
                    if(data.productTopic.zhuantitu.search('.json') != -1){
                        str2 += '<lottie-player src="'+checkPath(data.productTopic.zhuantitu,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                    }else{
                        str2 += '<img class="maxh"  src="'+ checkPath(data.productTopic.zhuantitu,'1')+'">';
                    }
                    $("#beijingtu").html(str2);
                }
                if(data.productTopic.beijingse != null && data.productTopic.beijingse != ''){
                    //$("body").css("background-color",data.productTopic.beijingse);
                    $("#beijingse").css("background-color",data.productTopic.beijingse);
                    $("#beijingse2").css("background-color",data.productTopic.beijingse);
                    $("#beijingse3").css("background-color",data.productTopic.beijingse);
                }



            }
            if(data.productType != null && data.productType != ''){

                if(data.productType.zhuantitu != null && data.productType.zhuantitu != ''){
                    var str2 = '';
                    if(data.productType.zhuantitu.search('.json') != -1){
                        str2 += '<lottie-player src="'+checkPath(data.productType.zhuantitu,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                    }else{
                        str2 += '<img class="maxh"  src="'+ checkPath(data.productType.zhuantitu,'1')+'">';
                    }
                    $("#beijingtu").html(str2);
                }
                if(data.productType.beijingse != null && data.productType.beijingse != ''){
                    //$("body").css("background-color",data.productType.beijingse);
                    $("#beijingse").css("background-color",data.productType.beijingse);
                    $("#beijingse2").css("background-color",data.productType.beijingse);
                    $("#beijingse3").css("background-color",data.productType.beijingse);
                }

            }
            if(data.productZc != null && data.productZc != ''){
                if(data.productZc.zhuantitu != null && data.productZc.zhuantitu != ''){
                    var str2 = '';
                    if(data.productZc.zhuantitu.search('.json') != -1){
                        str2 += '<lottie-player src="'+checkPath(data.productZc.zhuantitu,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                    }else{
                        str2 += '<img class="maxh"  src="'+ checkPath(data.productZc.zhuantitu,'1')+'">';
                    }
                    $("#beijingtu").html(str2);
                }
                if(data.productZc.beijingse != null && data.productZc.beijingse != ''){
                    //$("body").css("background-color",data.productZc.beijingse);
                    $("#beijingse").css("background-color",data.productZc.beijingse);
                    $("#beijingse2").css("background-color",data.productZc.beijingse);
                    $("#beijingse3").css("background-color",data.productZc.beijingse);
                }
            }

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
function listproductRender5(data,renderId,renderType,manyType,obj,shuzi,listStyle){
    if(data.code == '0'){

        if(listStyle == '1'){//分类
            var str2 = '';
            $.each(data.result,function(j,item2){
                var str1 = '';




                str1 += '<div  id="'+eval(j+1)+'"  class="categoryList" category="'+eval(j+1)+'">';
                str1 += '<div class="title">';
                str1 += ''+item2.label+'<span style="float: right;color: gray;"  ><a href="gouwulistzhuanti.html?productType='+item2.value+'&listStyle=2" style="color: gray;">更多</a></span>';
                str1 += '</div>';
                str1 += '<div>';

                $.each(item2.productList,function(i,item){

                    str1 += '<div style="margin-top: 15px;width: 50% !important;" onclick=toProductDetail("'+item.id+'","1"); class="categoryItem" data-url="/category/detail/1" data-seccategory="-1">';
                    str1 += '<div class=" lazyLoad" ></div>';

                    str1 += '<div style="border-radius: 5px;margin-left: 10px;margin-right: 10px;" class="shadowonly">';

                    str1 += '<div class="" ><img src="'+getFirstImageDetailContent(item.productImage)+'"  width="100%" style="border-top-left-radius: 5px;border-top-right-radius: 5px;" /></div>';

                    str1 += '<div style="padding-bottom: 5px;padding-left: 5px;">';
                    str1 += '<div style="color:red;text-align: left;font-size: large;">￥'+setNum(item.productPrice)+'</div>';
                    str1 += '<div style="text-align: left;font-size: medium;color: #000000;font-weight: 300;line-height: 18px;" class="weui-news-p tworow  f14">'+item.productTitle+'</div>';
                    str1 += '</div>';
                    str1 += '</div>';

                    str1 += '</div>';


                });

                str1 += '</div>';

                str1 += '</div>';


                $("#"+renderId+"").append(str1);

                //菜单分类
                if(j == 0){
                    str2 += '<div class="menuItem selected" onclick="onTopClick(\''+eval(j+1)+'\')" category="'+eval(j+1)+'"  statisticEvent="click" statistic="{\"data\":{\"uu\":\"\",\"uc\":\"'+eval(j+1)+'\"},\"route\":\"click\"}">'+item2.label+'</div>';

                }else{
                    str2 += '<div class="menuItem " onclick="onTopClick(\''+eval(j+1)+'\')" category="'+eval(j+1)+'"  statisticEvent="click" statistic="{\"data\":{\"uu\":\"\",\"uc\":\"'+eval(j+1)+'\"},\"route\":\"click\"}">'+item2.label+'</div>';

                }

            });
            $("#fenleileft").html(str2);

            //初始化
            /*$(document).ready(function(){
                //document.getElementById('scrollBody').scrollTop = 200;
                document.body.scrollTop=document.body.scrollHeight-1;

                if(data.result.length > 0){
                    for(m=0;m<data.result.length ;m++){
                        if(eval(m+1) == 1){
                            $(".menu .menuItem[category="+eval(m+1)+"]").addClass('selected');
                        }else{
                            $(".menu .menuItem[category="+eval(m+1)+"]").removeClass('selected');
                        }

                    }
                }
            });*/

        }else if(listStyle == '2'){

            var str1 = '';
            str1 += '<div  class="weui-grids"  >';
            $.each(data.result,function(i,item){


                str1 += '<a onclick=toProductDetail("' + item.id + '","1") class="grid" style="width: 50% !important;padding: 5px 3px !important;">';

                str1 += '<div class="weui-flex productshadow" style="background-color: white;">';
                str1 += ' <div class="weui-flex__item ">';
                str1 += '<div class="weui-news-p onerow center2 ">';
                str1 += '<div>';
                if(getFirstImageDetailContent(item.productImage).search('.json') != -1){
                    str1 += '<lottie-player src="'+checkPath(getFirstImageDetailContent(item.productImage),'1')+'"  background="transparent"  speed="1"  class="yingyong"  loop autoplay ></lottie-player>';
                }else{

                    if(item.kucun == '0' || item.kucun == 0){
                        str1 += '<img class="product  zanshigray"  src="'+ checkPath(getFirstImageDetailContent(item.productImage),'1')+'">';
                    }else{
                        str1 += '<img class="product "  src="'+ checkPath(getFirstImageDetailContent(item.productImage),'1')+'">';

                        str1 += '<div class="f-red b-red f10" style="position:relative;margin-bottom: 10px;margin-top: -25px;float: right;border-bottom-left-radius:10px;border-top-left-radius:10px;padding-right: 5px;padding-left: 10px;font-size: x-small;">' + getYongjinMoney4(setNum(item.vipshareAgent),"1") + '</div>';

                    }


                }
                str1 += '</div>';
                str1 += '</div>';
                if(item.kucun == '0'){
                    str1 += '<div class="weui-news-p tworow  f-gray f16 left5" style="font-weight: 300;color: gray;line-height: 22px;">'+setNULL(item.productTitle)+'</div>';
                }else{
                    str1 += '<div class="weui-news-p tworow  f16 left5" style="font-weight: 300;color: #000000;line-height: 22px;">'+setNULL(item.productTitle)+'</div>';
                }
                str1 += '<div class="weui-news-p onerow">';
                str1 += '<div class="weui-label-list">';
                if(item.kucun == '0' || item.kucun == 0){
                    str1 += '<label class="onerow f-gray f18" style="margin-bottom: 10px;margin-left:-5px;"><span style="font-size: smaller;">￥</span>' + setNum(item.productPrice) + '</label>';
                    str1 += '<label class="onerow f-gray f10" style="margin-bottom: 10px;margin-left:5px;text-decoration:line-through;font-size: xx-small;">￥' + setNum(item.yuanjia) + '</label>';

                    // str1 += '<label class="label f-gray b-gray " style="margin-bottom: 10px;border-radius: 20px;font-weight: bold;font-size: smaller;">'+item.productPrice+'</label>';
                }else{
                    str1 += '<label class="onerow f-red f18" style="margin-bottom: 10px;margin-left:-5px;"><span style="font-size: smaller;">￥</span>' + setNum(item.productPrice) + '</label>';
                    str1 += '<label class="onerow f-gray f10" style="margin-bottom: 10px;margin-left:5px;text-decoration:line-through;font-size: xx-small;">￥' + setNum(item.yuanjia) + '</label>';
                    // str1 += '<label class="label f-red b-yellow" style="margin-bottom: 10px;border-radius: 20px;font-weight: bold;font-size: smaller;">'+item.productPrice+'</label>';
                }
                str1 += '</div>';
                str1 += '</div>';
                str1 += '</div>';
                str1 += '</div>';


                str1 += '</a>';



            });
            str1 += '</div>';


            //渲染赋值
            if(renderType == '1'){
                $("#"+renderId+"").append(str1);
            }else{
                $("#"+renderId+"").html(str1);
            }
            if(str1 != null && str1 != ''){
                $("#dis" + renderId + "").show();
            }
            if(data.productTopic != null && data.productTopic != ''){

                if(data.productTopic.zhuantitu != null && data.productTopic.zhuantitu != ''){
                    var str2 = '';
                    if(data.productTopic.zhuantitu.search('.json') != -1){
                        str2 += '<lottie-player src="'+checkPath(data.productTopic.zhuantitu,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                    }else{
                        str2 += '<img class="maxh"  src="'+ checkPath(data.productTopic.zhuantitu,'1')+'">';
                    }
                    $("#beijingtu").html(str2);
                }
                if(data.productTopic.beijingse != null && data.productTopic.beijingse != ''){
                    //$("body").css("background-color",data.productTopic.beijingse);
                    $("#beijingse").css("background-color",data.productTopic.beijingse);
                    $("#beijingse2").css("background-color",data.productTopic.beijingse);
                    $("#beijingse3").css("background-color",data.productTopic.beijingse);
                }



            }
            if(data.productType != null && data.productType != ''){

                if(data.productType.zhuantitu != null && data.productType.zhuantitu != ''){
                    var str2 = '';
                    if(data.productType.zhuantitu.search('.json') != -1){
                        str2 += '<lottie-player src="'+checkPath(data.productType.zhuantitu,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                    }else{
                        str2 += '<img class="maxh"  src="'+ checkPath(data.productType.zhuantitu,'1')+'">';
                    }
                    $("#beijingtu").html(str2);
                }
                if(data.productType.beijingse != null && data.productType.beijingse != ''){
                    //$("body").css("background-color",data.productType.beijingse);
                    $("#beijingse").css("background-color",data.productType.beijingse);
                    $("#beijingse2").css("background-color",data.productType.beijingse);
                    $("#beijingse3").css("background-color",data.productType.beijingse);
                }

            }
            if(data.productZc != null && data.productZc != ''){
                if(data.productZc.zhuantitu != null && data.productZc.zhuantitu != ''){
                    var str2 = '';
                    if(data.productZc.zhuantitu.search('.json') != -1){
                        str2 += '<lottie-player src="'+checkPath(data.productZc.zhuantitu,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                    }else{
                        str2 += '<img class="maxh"  src="'+ checkPath(data.productZc.zhuantitu,'1')+'">';
                    }
                    $("#beijingtu").html(str2);
                }
                if(data.productZc.beijingse != null && data.productZc.beijingse != ''){
                    //$("body").css("background-color",data.productZc.beijingse);
                    $("#beijingse").css("background-color",data.productZc.beijingse);
                    $("#beijingse2").css("background-color",data.productZc.beijingse);
                    $("#beijingse3").css("background-color",data.productZc.beijingse);
                }
            }

        }else if(listStyle == '3'){
            var listzqStr = '';
            $.each(data.result,function(i,item) {
                listzqStr += '<li class="weui-news-item listbeijing" onclick=toProductDetail("' + item.id + '","1"); style="width: 100%;">';
                listzqStr += '<div class="weui-news-inner" >';
                if (item.kucun == '0' || item.kucun == 0) {
                    listzqStr += '<div class="weui-news-media square zanshigray" style="background-image:url(' + checkPathBackGroubdImage(getFirstImageDetailContent(item.productImage), "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;width: 5.4rem;height: 5.4rem;">';
                } else {
                    listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(getFirstImageDetailContent(item.productImage), "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;width: 5.4rem;height: 5.4rem;">';

                }

                if (item.productJiaobiao != null && item.productJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.productJiaobiao + '</span>';
                        } else {
                            if (item.productLabel != null && item.productLabel != '') {
                                var str = item.productLabel; //这是一字符串
                                var strs = new Array(); //定义一数组
                                strs = str.split("/"); //字符分割
                                for (i = 0; i < strs.length; i++) {
                                    if (i == 0) {
                                        listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                                    }

                                }


                            }
                        }

                    } else {
                        if (item.productLabel != null && item.productLabel != '') {
                            var str = item.productLabel; //这是一字符串
                            var strs = new Array(); //定义一数组
                            strs = str.split("/"); //字符分割
                            for (i = 0; i < strs.length; i++) {
                                if (i == 0) {
                                    listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                                }

                            }
                        }
                    }

                } else {
                    if (item.productLabel != null && item.productLabel != '') {
                        var str = item.productLabel; //这是一字符串
                        var strs = new Array(); //定义一数组
                        strs = str.split("/"); //字符分割
                        for (i = 0; i < strs.length; i++) {
                            if (i == 0) {
                                listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                            }

                        }
                    }
                }


                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                if (item.kucun == '0' || item.kucun == 0) {
                    listzqStr += '<div class="weui-news-title" style="font-size: 16px;font-weight: normal;color: gray;">' + item.productTitle + '';
                } else {
                    listzqStr += '<div class="weui-news-title" style="font-size: 16px;font-weight: normal;color: #000000;">' + item.productTitle + '';

                }
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info" style="padding:0px;">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';

                listzqStr += '<p class="f-gray f14 " style="margin-top: 2px;margin-bottom: 5px;">' + setNum(item.productLabel) + '</p>';

                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {

                    if (item.kucun == '0' || item.kucun == 0) {
                        listzqStr += '<label class="label f-gray b-gray">' + getYongjinMoney4(setNum(item.vipshareAgent), "1") + '</label><br>';

                    } else {
                        listzqStr += '<label class="label f-red b-red">' + getYongjinMoney4(setNum(item.vipshareAgent), "1") + '</label><br>';

                    }
                }
                if (item.kucun == '0' || item.kucun == 0) {
                    listzqStr += '<span style="color: gray;font-size: 18px;" ><span style="font-size: smaller">￥</span>' + setNum(item.productPrice) + '<span style="font-size: xx-small;text-decoration: line-through;color: gray;margin-left: 5px;">￥' + setNum(item.yuanjia) + '</span></span>';
                } else {
                    listzqStr += '<span style="color: red;font-size: 18px;" ><span style="font-size: smaller">￥</span>' + setNum(item.productPrice) + '<span style="font-size: xx-small;text-decoration: line-through;color: gray;margin-left: 5px;">￥' + setNum(item.yuanjia) + '</span></span>';

                }

                listzqStr += '<span style="margin-left: 15px;">已售' + setNum(item.productDianjiliang) + '</span>';

                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                /*listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '已售' + setNum(item.productDianjiliang) + '';
                listzqStr += '</div>';*/
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
            });
            //渲染赋值
            if(renderType == '1'){
                $("#"+renderId+"").append(listzqStr);
            }else{
                $("#"+renderId+"").html(listzqStr);
            }
            if(listzqStr != null && listzqStr != ''){
                $("#dis" + renderId + "").show();
            }
            if(data.productTopic != null && data.productTopic != ''){

                if(data.productTopic.zhuantitu != null && data.productTopic.zhuantitu != ''){
                    var str2 = '';
                    if(data.productTopic.zhuantitu.search('.json') != -1){
                        str2 += '<lottie-player src="'+checkPath(data.productTopic.zhuantitu,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                    }else{
                        str2 += '<img class="maxh"  src="'+ checkPath(data.productTopic.zhuantitu,'1')+'">';
                    }
                    $("#beijingtu").html(str2);
                }
                if(data.productTopic.beijingse != null && data.productTopic.beijingse != ''){
                    //$("body").css("background-color",data.productTopic.beijingse);
                    $("#beijingse").css("background-color",data.productTopic.beijingse);
                    $("#beijingse2").css("background-color",data.productTopic.beijingse);
                    $("#beijingse3").css("background-color",data.productTopic.beijingse);
                }



            }
            if(data.productType != null && data.productType != ''){

                if(data.productType.zhuantitu != null && data.productType.zhuantitu != ''){
                    var str2 = '';
                    if(data.productType.zhuantitu.search('.json') != -1){
                        str2 += '<lottie-player src="'+checkPath(data.productType.zhuantitu,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                    }else{
                        str2 += '<img class="maxh"  src="'+ checkPath(data.productType.zhuantitu,'1')+'">';
                    }
                    $("#beijingtu").html(str2);
                }
                if(data.productType.beijingse != null && data.productType.beijingse != ''){
                    //$("body").css("background-color",data.productType.beijingse);
                    $("#beijingse").css("background-color",data.productType.beijingse);
                    $("#beijingse2").css("background-color",data.productType.beijingse);
                    $("#beijingse3").css("background-color",data.productType.beijingse);
                }

            }
            if(data.productZc != null && data.productZc != ''){
                if(data.productZc.zhuantitu != null && data.productZc.zhuantitu != ''){
                    var str2 = '';
                    if(data.productZc.zhuantitu.search('.json') != -1){
                        str2 += '<lottie-player src="'+checkPath(data.productZc.zhuantitu,'1')+'"  background="transparent"  speed="1"  class="maxh"  loop autoplay ></lottie-player>';
                    }else{
                        str2 += '<img class="maxh"  src="'+ checkPath(data.productZc.zhuantitu,'1')+'">';
                    }
                    $("#beijingtu").html(str2);
                }
                if(data.productZc.beijingse != null && data.productZc.beijingse != ''){
                    //$("body").css("background-color",data.productZc.beijingse);
                    $("#beijingse").css("background-color",data.productZc.beijingse);
                    $("#beijingse2").css("background-color",data.productZc.beijingse);
                    $("#beijingse3").css("background-color",data.productZc.beijingse);
                }
            }

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

function listmyproductRender(data,renderId,renderType,manyType){
    var listzqStr = '';
    //1.分类 2.秒杀3.热销4.主题推荐
    if(data.code == '0'){
        var zhuti = '';
        if(manyType == '4'){
            // $.each(data.result,function(i,item){

            //console.log(i, item);
            //渲染内容处理
            var str2 = '';
            str2 += '<div class="weui-feeds" style="margin-top: 2px;">';
            str2 += '<ul>';
            $.each(data.result,function(i,item){
                if(i < 9){
                    str2 += '<li onclick=toProductList("zhutituijian","1","","'+item.value+'");>';
                    str2 += '<span class="shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:no-repeat;background-size:cover;border-radius: 10px;"></span>';
                    str2 += '</li>';
                }
            });
            str2 += '</ul>';
            str2 += '</div>';
            if(renderType == '1'){
                $("#zhutituijian2").append(str2);
            }else{
                $("#zhutituijian2").html(str2);
            }
            if(str2 != null && str2 != ''){
                $("#diszhutituijian2").show();
            }

            if(data.result.length > 9){
                var str3 = '';
                str3 += '<div class="weui-feeds" style="margin-top: 2px;">';
                str3 += '<ul>';
                $.each(data.result,function(i,item){
                    if(i > 8 && i < 18){
                        str3 += '<li onclick=toProductList("zhutituijian","1","","'+item.value+'");>';
                        str3 += '<span class="shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:no-repeat;background-size:cover;border-radius: 10px"></span>';
                        str3 += '</li>';
                    }
                });
                str3 += '</ul>';
                str3 += '</div>';
                if(renderType == '1'){
                    $("#zhutituijian3").append(str3);
                }else{
                    $("#zhutituijian3").html(str3);
                }
                if(str3 != null && str3 != ''){
                    $("#diszhutituijian3").show();
                }

            }

            if(data.result.length > 18){
                var str4 = '';
                str4 += '<div class="weui-feeds" style="margin-top: 2px;">';
                str4 += '<ul>';
                $.each(data.result,function(i,item){
                    if(i > 17 && i < 27){
                        str4 += '<li onclick=toProductList("zhutituijian","1","","'+item.value+'");>';
                        str4 += '<span class="shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:no-repeat;background-size:cover;border-radius: 10px"></span>';
                        str4 += '</li>';
                    }
                });
                str4 += '</ul>';
                str4 += '</div>';
                if(renderType == '1'){
                    $("#zhutituijian4").append(str4);
                }else{
                    $("#zhutituijian4").html(str4);
                }
                if(str4 != null && str4 != ''){
                    $("#diszhutituijian4").show();
                }

            }

            if(data.result.length > 27){
                var str5 = '';
                str5 += '<div class="weui-feeds" style="margin-top: 2px;">';
                str5 += '<ul>';
                $.each(data.result,function(i,item){
                    if(i > 26 && i < 36){
                        str5 += '<li onclick=toProductList("zhutituijian","1","","'+item.value+'");>';
                        str5 += '<span class="shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:no-repeat;background-size:cover;border-radius: 10px"></span>';
                        str5 += '</li>';
                    }
                });
                str5 += '</ul>';
                str5 += '</div>';
                if(renderType == '1'){
                    $("#zhutituijian5").append(str5);
                }else{
                    $("#zhutituijian5").html(str5);
                }
                if(str5 != null && str5 != ''){
                    $("#diszhutituijian5").show();
                }

            }

            if(data.result.length > 36 && $("#zhutituijian6").size() > 0){
                var str6 = '';
                str6 += '<div class="weui-feeds" style="margin-top: 2px;">';
                str6 += '<ul>';
                $.each(data.result,function(i,item){
                    if(i > 35 && i < 45){
                        str6 += '<li onclick=toProductList("zhutituijian","1","","'+item.value+'");>';
                        str6 += '<span class="shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:no-repeat;background-size:cover;border-radius: 10px"></span>';
                        str6 += '</li>';
                    }
                });
                str6 += '</ul>';
                str6 += '</div>';
                if(renderType == '1'){
                    $("#zhutituijian6").append(str6);
                }else{
                    $("#zhutituijian6").html(str6);
                }
                if(str6 != null && str6 != ''){
                    $("#diszhutituijian6").show();
                }

            }




            // });
        }else{
            $.each(data.result,function(i,item){

                listzqStr += '<li class="weui-news-item" onclick=toProductDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media " style="background-image:url(' + checkPathBackGroubdImage(getFirstImageDetailContent(item.productImage), "1") + ');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;width: 5.4rem;height: 5.4rem;";>';

                if (item.productJiaobiao != null && item.productJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.productJiaobiao + '</span>';
                        } else {
                            if (item.productLabel != null && item.productLabel != '') {
                                var str = item.productLabel; //这是一字符串
                                var strs= new Array(); //定义一数组
                                strs=str.split("/"); //字符分割
                                for (i=0;i<strs.length ;i++ )
                                {
                                    if(i == 0){
                                        listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                                    }

                                }


                            }
                        }

                    } else {
                        if (item.productLabel != null && item.productLabel != '') {
                            var str = item.productLabel; //这是一字符串
                            var strs= new Array(); //定义一数组
                            strs=str.split("/"); //字符分割
                            for (i=0;i<strs.length ;i++ )
                            {
                                if(i == 0){
                                    listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                                }

                            }
                        }
                    }

                } else {
                    if (item.productLabel != null && item.productLabel != '') {
                        var str = item.productLabel; //这是一字符串
                        var strs= new Array(); //定义一数组
                        strs=str.split("/"); //字符分割
                        for (i=0;i<strs.length ;i++ )
                        {
                            if(i == 0){
                                listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                            }

                        }
                    }
                }


                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title" style="font-size: 18px;font-weight: 500;">' + item.productTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-red b-red" style="margin-bottom: 10px;">原价￥' + setNum(item.yuanjia) + '</label>';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-blue b-blue">' + getYongjinMoney4(setNum(item.vipshareAgent),"1") + '</label>';
                }
                listzqStr += '<br><span style="color: red;" >会员价￥' + setNum(item.productPrice) + '</span>';
                listzqStr += '<span style="margin-left: 15px;">已售' + setNum(item.productDianjiliang) + '</span>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                /*listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '已售' + setNum(item.productDianjiliang) + '';
                listzqStr += '</div>';*/
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhuti = item.productTopic;
            });

            //渲染赋值
            if(renderType == '1'){
                $("#"+renderId+"").append(listzqStr);
            }else{
                $("#"+renderId+"").html(listzqStr);
            }
            if(listzqStr != null && listzqStr != ''){
                $("#dis" + renderId + "").show();
            }
            if(zhuti != null && zhuti != ''){
                $("#zhutiname").html(zhuti);
            }
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

//获取详情数据
function detailproduct(){
		//参数
		var id = GetUrlString('id');

		//传输数据
		var dataproduct = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
		    "id":id
		}

        instanceproduct({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/gw/product/product/detail',
            data: dataproduct,
        	cancelToken: sourceproduct.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
				detailproductRender(rs.data);
            }else{
                console.log('detailproduct请求异常！')
            }

        });

    }

//详情渲染
function detailproductRender(data){
	  if(data.code == '0'){
        //var detailproductStr = '';
        //detailproductStr += '';
        //$("#detailproduct").html(detailproductStr);

        //参数
		$("#productType").val(data.result.productType);
		$("#productTitle").val(data.result.productTitle);
		$("#productSharetitle").val(data.result.productSharetitle);
		$("#productImage").val(data.result.productImage);
		$("#productContent").val(data.result.productContent);
		$("#productSharecontent").val(data.result.productSharecontent);
		$("#productLabel").val(data.result.productLabel);
		$("#productPrice").val(data.result.productPrice);
		$("#productJiesuan").val(data.result.productJiesuan);
		$("#productTopic").val(data.result.productTopic);
		$("#sharePricetype").val(data.result.sharePricetype);
		$("#vipshareAgent").val(data.result.vipshareAgent);
		$("#freeshareAgent").val(data.result.freeshareAgent);
		$("#sharePingtai").val(data.result.sharePingtai);
		$("#shareThree").val(data.result.shareThree);
		$("#shareFour").val(data.result.shareFour);
		$("#shareFive").val(data.result.shareFive);
		$("#jiesuanType").val(data.result.jiesuanType);
		$("#isTop").val(data.result.isTop);
		$("#isRecommend").val(data.result.isRecommend);
		$("#isHot").val(data.result.isHot);
		$("#isFine").val(data.result.isFine);
		$("#isLowprice").val(data.result.isLowprice);
		$("#lowPrice").val(data.result.lowPrice);
		$("#lowpriceStart").val(data.result.lowpriceStart);
		$("#lowpriceEnd").val(data.result.lowpriceEnd);
		$("#isGaoyongjin").val(data.result.isGaoyongjin);
		$("#gaoyongjinPrice").val(data.result.gaoyongjinPrice);
		$("#gaoyongjinStart").val(data.result.gaoyongjinStart);
		$("#gaoyongjinEnd").val(data.result.gaoyongjinEnd);
		$("#vipDiscount").val(data.result.vipDiscount);
		$("#isZiying").val(data.result.isZiying);
		$("#productDianjiliang").val(data.result.productDianjiliang);
		$("#productZan").val(data.result.productZan);
		$("#productJiaobiao").val(data.result.productJiaobiao);
		$("#jiaobiaoStart").val(data.result.jiaobiaoStart);
		$("#jiaobiaoEnd").val(data.result.jiaobiaoEnd);
		$("#commentNum").val(data.result.commentNum);
		$("#fabuStatus").val(data.result.fabuStatus);
		$("#shareagentErjifanxian").val(data.result.shareagentErjifanxian);
		$("#shareagentSanjifanxian").val(data.result.shareagentSanjifanxian);
		$("#shareagentSijifanxian").val(data.result.shareagentSijifanxian);
		$("#shareagentWujifanxian").val(data.result.shareagentWujifanxian);
		$("#shareagentLiujifanxian").val(data.result.shareagentLiujifanxian);
		$("#shareagentQijifanxian").val(data.result.shareagentQijifanxian);
		$("#shareagentBajifanxian").val(data.result.shareagentBajifanxian);
		$("#shareagentJiujifanxian").val(data.result.shareagentJiujifanxian);
		$("#shareagentShijifanxian").val(data.result.shareagentShijifanxian);
		$("#shareagentHehuorenfanxian").val(data.result.shareagentHehuorenfanxian);
		$("#shareagentFaqirenfanxian").val(data.result.shareagentFaqirenfanxian);
		$("#shareThreeid").val(data.result.shareThreeid);
		$("#shareFourid").val(data.result.shareFourid);
		$("#shareFiveid").val(data.result.shareFiveid);

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
function saveproduct(){
	    // 在提交请求之前判断是否登录
		if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
			isLogin('','');
			initNRproduct();
			return false;
		}
		//参数
		var productType = $("#productType").val();
		var productTitle = $("#productTitle").val();
		var productSharetitle = $("#productSharetitle").val();
		var productImage = $("#productImage").val();
		var productContent = $("#productContent").val();
		var productSharecontent = $("#productSharecontent").val();
		var productLabel = $("#productLabel").val();
		var productPrice = $("#productPrice").val();
		var productJiesuan = $("#productJiesuan").val();
		var productTopic = $("#productTopic").val();
		var sharePricetype = $("#sharePricetype").val();
		var vipshareAgent = $("#vipshareAgent").val();
		var freeshareAgent = $("#freeshareAgent").val();
		var sharePingtai = $("#sharePingtai").val();
		var shareThree = $("#shareThree").val();
		var shareFour = $("#shareFour").val();
		var shareFive = $("#shareFive").val();
		var jiesuanType = $("#jiesuanType").val();
		var isTop = $("#isTop").val();
		var isRecommend = $("#isRecommend").val();
		var isHot = $("#isHot").val();
		var isFine = $("#isFine").val();
		var isLowprice = $("#isLowprice").val();
		var lowPrice = $("#lowPrice").val();
		var lowpriceStart = $("#lowpriceStart").val();
		var lowpriceEnd = $("#lowpriceEnd").val();
		var isGaoyongjin = $("#isGaoyongjin").val();
		var gaoyongjinPrice = $("#gaoyongjinPrice").val();
		var gaoyongjinStart = $("#gaoyongjinStart").val();
		var gaoyongjinEnd = $("#gaoyongjinEnd").val();
		var vipDiscount = $("#vipDiscount").val();
		var isZiying = $("#isZiying").val();
		var productDianjiliang = $("#productDianjiliang").val();
		var productZan = $("#productZan").val();
		var productJiaobiao = $("#productJiaobiao").val();
		var jiaobiaoStart = $("#jiaobiaoStart").val();
		var jiaobiaoEnd = $("#jiaobiaoEnd").val();
		var commentNum = $("#commentNum").val();
		var fabuStatus = $("#fabuStatus").val();
		var shareagentErjifanxian = $("#shareagentErjifanxian").val();
		var shareagentSanjifanxian = $("#shareagentSanjifanxian").val();
		var shareagentSijifanxian = $("#shareagentSijifanxian").val();
		var shareagentWujifanxian = $("#shareagentWujifanxian").val();
		var shareagentLiujifanxian = $("#shareagentLiujifanxian").val();
		var shareagentQijifanxian = $("#shareagentQijifanxian").val();
		var shareagentBajifanxian = $("#shareagentBajifanxian").val();
		var shareagentJiujifanxian = $("#shareagentJiujifanxian").val();
		var shareagentShijifanxian = $("#shareagentShijifanxian").val();
		var shareagentHehuorenfanxian = $("#shareagentHehuorenfanxian").val();
		var shareagentFaqirenfanxian = $("#shareagentFaqirenfanxian").val();
		var shareThreeid = $("#shareThreeid").val();
		var shareFourid = $("#shareFourid").val();
		var shareFiveid = $("#shareFiveid").val();

		//判断不为空数据是否为空

		//传输数据
		var dataproduct = {
		  	"productType":productType,
		  	"productTitle":productTitle,
		  	"productSharetitle":productSharetitle,
		  	"productImage":productImage,
		  	"productContent":productContent,
		  	"productSharecontent":productSharecontent,
		  	"productLabel":productLabel,
		  	"productPrice":productPrice,
		  	"productJiesuan":productJiesuan,
		  	"productTopic":productTopic,
		  	"sharePricetype":sharePricetype,
		  	"vipshareAgent":vipshareAgent,
		  	"freeshareAgent":freeshareAgent,
		  	"sharePingtai":sharePingtai,
		  	"shareThree":shareThree,
		  	"shareFour":shareFour,
		  	"shareFive":shareFive,
		  	"jiesuanType":jiesuanType,
		  	"isTop":isTop,
		  	"isRecommend":isRecommend,
		  	"isHot":isHot,
		  	"isFine":isFine,
		  	"isLowprice":isLowprice,
		  	"lowPrice":lowPrice,
		  	"lowpriceStart":lowpriceStart,
		  	"lowpriceEnd":lowpriceEnd,
		  	"isGaoyongjin":isGaoyongjin,
		  	"gaoyongjinPrice":gaoyongjinPrice,
		  	"gaoyongjinStart":gaoyongjinStart,
		  	"gaoyongjinEnd":gaoyongjinEnd,
		  	"vipDiscount":vipDiscount,
		  	"isZiying":isZiying,
		  	"productDianjiliang":productDianjiliang,
		  	"productZan":productZan,
		  	"productJiaobiao":productJiaobiao,
		  	"jiaobiaoStart":jiaobiaoStart,
		  	"jiaobiaoEnd":jiaobiaoEnd,
		  	"commentNum":commentNum,
		  	"fabuStatus":fabuStatus,
		  	"shareagentErjifanxian":shareagentErjifanxian,
		  	"shareagentSanjifanxian":shareagentSanjifanxian,
		  	"shareagentSijifanxian":shareagentSijifanxian,
		  	"shareagentWujifanxian":shareagentWujifanxian,
		  	"shareagentLiujifanxian":shareagentLiujifanxian,
		  	"shareagentQijifanxian":shareagentQijifanxian,
		  	"shareagentBajifanxian":shareagentBajifanxian,
		  	"shareagentJiujifanxian":shareagentJiujifanxian,
		  	"shareagentShijifanxian":shareagentShijifanxian,
		  	"shareagentHehuorenfanxian":shareagentHehuorenfanxian,
		  	"shareagentFaqirenfanxian":shareagentFaqirenfanxian,
		  	"shareThreeid":shareThreeid,
		  	"shareFourid":shareFourid,
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
		  	"shareFiveid":shareFiveid
		}

        instanceproduct({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/gw/product/product/save',
            data:dataproduct,
        	cancelToken: sourceproduct.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
				if(rs.data.code == '0'){
					//$.toast("操作成功", 'success');
                    refresh();
				}else{
					//$.toast(rs.data.msg, "text");
					initNRproduct();
				}
            }else{
                console.log('saveproduct请求异常！')
                $.toast("操作失败", "text");
                initNRproduct();
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
function saveNRproduct(){
    var saveproductFlag = $("#saveproductFlag").val();
    if(saveproductFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
    	if($("#saveproductFlag").size() == 0){
        $("body").append("<input type='hidden' id='saveproductFlag' value='1' >");
        saveproduct();
        }
    }
}

//初始化重复提交判断
function initNRproduct(){
    $("#saveproductFlag").remove();
}

//监听提交保存
$("#buttonSaveproduct").click(function(){
	saveNRproduct();
})

//删除数据
function deleteproduct(){

		//参数
		var id = GetUrlString('id');

		//传输数据
		var dataproduct = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
		    "id":id
		}

        instanceproduct({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/gw/product/product/delete',
            data: dataproduct,
        	cancelToken: sourceproduct.token
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
                console.log('deleteproduct请求异常！')
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
$("#buttonDeleteproduct").click(function(){
    $.confirm("您确定要删除吗?", "确认删除?", function() {
        deleteproduct();
        }, function() {
        //取消操作
    });
});

//监听是否渲染
$(function () {

   //判断获取列表第一页
   if($("#buttonListFirstproduct").size()>0){
		getListproduct(productRenderId1,'1',10,1);
   }

   //判断获取详情信息
   if($("#buttonDetailproduct").size()>0){
		detailproduct();
   }

});