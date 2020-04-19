var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost";//本地模式
}
//文件请求URL
var baseFileUrladdress = ''+basehost+'';
//请求实例
var instanceaddress = axios.create({
  baseURL: ''+basehost+'/sfd/a/api/',
  timeout: 180000,
  headers: {'token': localStorage.getItem('token')}
});

//取消请求
var CancelTokenaddress = axios.CancelToken;
var sourceaddress = CancelTokenaddress.source();

// 添加请求拦截器
instanceaddress.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        sourceaddress.cancel();
    }
   sessionStorage.clear();return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instanceaddress.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

function toUpdateAddress() {
    var url = GetUrlString("url");
    toAddressDetail("&url="+encodeURI(url),"2");
}

function toAddAddress() {
    toAddressDetail("","2");
}


//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染
function listaddress(renderId,renderType,pageSize,manyType){
        var url = GetUrlString("url");
        if(url != '' && url != null){
                $("#xinzengaddress").attr("onclick","toUpdateAddress()");
            }else{
                $("#xinzengaddress").attr("onclick","toAddAddress()");
         }
		//分页
		var pageNoTemp = $("#listaddress"+manyType+"PageNo").val();
		if(pageNoTemp > 0){
		   $("#listaddress"+manyType+"PageNo").val(eval(pageNoTemp) + 1);
		}else{
		   $("body").append("<input type='hidden' id='listaddress"+manyType+"PageNo' value='1' >");
		}
		//参数-manyType--需要手动处理对应字段

		var pageNo = $("#listaddress"+manyType+"PageNo").val();
        var token = localStorage.getItem("token");
		//传输数据
		var dataaddress = {
		    "token":token,
		  	"pageSize":pageSize,
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
		    "pageNo":pageNo
		}

        instanceaddress({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/gw/address/address/list',
            data: dataaddress,
        	cancelToken: sourceaddress.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            //数据处理
            if(rs.status=200){
				listaddressRender(rs.data,renderId,renderType);
            }else{
                console.log('listaddress请求异常！')
            }
        });

	}

//列表渲染
function listaddressRender(data,renderId,renderType){
      var listaddressStr = '';
      if(data.code == '0'){
          var url = GetUrlString("url");
        $.each(data.result,function(i,item){

　　　　	//console.log(i, item);
		//渲染内容处理
		    listaddressStr += '';
            listaddressStr += '<div class="weui-panel__bd">';
            listaddressStr += '<div class="weui-media-box weui-media-box_small-appmsg">';
            listaddressStr += '<div class="weui-cells">';
            listaddressStr += '<a class="weui-cell weui-cell_access" href="javascript:;">';
            listaddressStr += '<div class="weui-cell__bd weui-cell_primary">';
            listaddressStr += '<p class="weui-news-title ">'+item.addressSheng+"-"+item.addressShi+"-"+item.addressQu+"-"+item.addressDetail+'';
            if(url != '' && url != null){
                listaddressStr += '<span class="myqianbao f-blue f14 line24" onclick=selectDizhi("'+item.id+'");>选择</span>';//要加上url传递到详情页
            }else{
                listaddressStr += '<span class="myqianbao f-blue f14 line24" onclick=toAddressDetail("'+item.id+'","1")>修改</span><span class="myqianbao f-blue f14 line24  " style="margin-right: 10px;" onclick=deleteaddress("'+item.id+'")>删除</span>';
            }

            listaddressStr += '</p>';
            listaddressStr += '<p class="onerow myfontsize" >'+item.addressName+' '+item.addressMobile+'</p>';
            listaddressStr += '</div>';
            listaddressStr += '</a>';
            listaddressStr += '</div>';
            listaddressStr += '</div>';
            listaddressStr += '</div>';

        });


		//渲染赋值
		if(renderType == '1'){
			$("#"+renderId+"").append(listaddressStr);
		}else{
			$("#"+renderId+"").html(listaddressStr);
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
function detailaddress(){
		//参数
		var id = GetUrlString('id');

		//传输数据
		var dataaddress = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
		    "id":id
		}

        instanceaddress({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/gw/address/address/detail',
            data: dataaddress,
        	cancelToken: sourceaddress.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
				detailaddressRender(rs.data);
            }else{
                console.log('detailaddress请求异常！')
            }

        });

    }

//详情渲染
function detailaddressRender(data){
	  if(data.code == '0'){
        //var detailaddressStr = '';
        //detailaddressStr += '';
        //$("#detailaddress").html(detailaddressStr);

        //参数
		$("#addressName").val(data.result.addressName);
		$("#addressMobile").val(data.result.addressMobile);
		$("#addressSheng").val(data.result.addressSheng);
		$("#addressShi").val(data.result.addressShi);
		$("#addressQu").val(data.result.addressQu);
		$("#addressDetail").val(data.result.addressDetail);
		$("#end").attr("data-codes",data.result.addressSheng+","+data.result.addressShi + "," + data.result.addressQu);
		$("#end").val(data.result.remarks);
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
function saveaddress(){
        var url = GetUrlString("url");
	    // 在提交请求之前判断是否登录
		if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
			isLogin('','');
			initNRaddress();
			return false;
		}
		//参数
        var addressSheng = '';
        var addressShi = '';
        var addressQu = '';
        var str = $("#end").attr("data-codes");
		console.log(str);
		if(str != null && str != ''){
            var strs= new Array(); //定义一数组
            strs=str.split(","); //字符分割
            for (i=0;i<strs.length ;i++ )
            {
                //console.log(strs[i]);
                if(i==0){
                    addressSheng = strs[i];
                }else if(i==1){
                    addressShi = strs[i];
                }else if(i==2){
                    addressQu = strs[i];
                }
                console.log(strs[i]);
            }
        }

		var addressName = $("#addressName").val();
		var addressMobile = $("#addressMobile").val();
        var id = GetUrlString("id");

		var addressDetail = $("#addressDetail").val();
        var token = localStorage.getItem("token");
		//判断不为空数据是否为空
        if(addressName == '' || addressName == null){
            $.toast("姓名不能为空", "text");
            initNRaddress();
            return false;
        }else if(addressMobile=="" || !/1[3|4|5|6|9|7|8]\d{9}/.test(addressMobile)){
            $.toast("手机号不正确", "text");
            initNRaddress();
            return false;
        }else if(addressSheng == '' || addressSheng == null){
            $.toast("地址不正确", "text");
            initNRaddress();
            return false;
        }else if(addressShi == '' || addressShi == null){
            $.toast("地址不正确", "text");
            initNRaddress();
            return false;
        }else if(addressQu == '' || addressQu == null){
            $.toast("地址不正确", "text");
            initNRaddress();
            return false;
        }else if(addressDetail == '' || addressDetail == null){
            $.toast("详细地址不正确", "text");
            initNRaddress();
            return false;
        }

		//传输数据
		var dataaddress = {
		  	"addressName":addressName,
		  	"addressMobile":addressMobile,
		  	"addressSheng":addressSheng,
		  	"addressShi":addressShi,
		  	"addressQu":addressQu,
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
		  	"addressDetail":addressDetail,
            "id":id,
            "token":token,
		}

        instanceaddress({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/gw/address/address/save',
            data:dataaddress,
        	cancelToken: sourceaddress.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
				if(rs.data.code == '0'){
					//$.toast("操作成功", 'success');
                    if(url != '' && url != null){
                        location.href = url;
                    }else{
                        toAddressList("","2");
                    }

				}else{
					//$.toast(rs.data.msg, "text");
					initNRaddress();
				}
            }else{
                //console.log('saveaddress请求异常！')
                $.toast("操作失败", "text");
                initNRaddress();
                if(rs.data.code == '-1'){
                    localStorage.setItem('token','');
                    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                        isLogin('','');
                    }
                }
            }

        });

    }
//保存数据
function saveaddressgw(){
    var url = GetUrlString("url");
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        initNRaddress();
        return false;
    }
    //参数
    var addressSheng = '';
    var addressShi = '';
    var addressQu = '';
    var str = $("#end").attr("data-codes");
    console.log(str);
    if(str != null && str != ''){
        var strs= new Array(); //定义一数组
        strs=str.split(","); //字符分割
        for (i=0;i<strs.length ;i++ )
        {
            //console.log(strs[i]);
            if(i==0){
                addressSheng = strs[i];
            }else if(i==1){
                addressShi = strs[i];
            }else if(i==2){
                addressQu = strs[i];
            }
            console.log(strs[i]);
        }
    }

    var addressName = $("#addressName").val();
    var addressMobile = $("#addressMobile").val();
    var id = GetUrlString("id");

    var addressDetail = $("#addressDetail").val();
    var token = localStorage.getItem("token");
    //判断不为空数据是否为空
    if(addressName == '' || addressName == null){
        $.toast("姓名不能为空", "text");
        initNRaddress();
        return false;
    }else if(addressMobile=="" || !/1[3|4|5|6|9|7|8]\d{9}/.test(addressMobile)){
        $.toast("手机号不正确", "text");
        initNRaddress();
        return false;
    }else if(addressSheng == '' || addressSheng == null){
        $.toast("地址不正确", "text");
        initNRaddress();
        return false;
    }else if(addressShi == '' || addressShi == null){
        $.toast("地址不正确", "text");
        initNRaddress();
        return false;
    }else if(addressQu == '' || addressQu == null){
        $.toast("地址不正确", "text");
        initNRaddress();
        return false;
    }else if(addressDetail == '' || addressDetail == null){
        $.toast("详细地址不正确", "text");
        initNRaddress();
        return false;
    }

    //传输数据
    var dataaddress = {
        "addressName":addressName,
        "addressMobile":addressMobile,
        "addressSheng":addressSheng,
        "addressShi":addressShi,
        "addressQu":addressQu,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "addressDetail":addressDetail,
        "id":id,
        "token":token,
    }

    instanceaddress({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gw/address/address/save',
        data:dataaddress,
        cancelToken: sourceaddress.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //$.toast("操作成功", 'success');
                if(url != '' && url != null){
                    location.href = url;
                }else{
                    toAddressList("","2");
                }

            }else{
                //$.toast(rs.data.msg, "text");
                initNRaddress();
            }
        }else{
            //console.log('saveaddress请求异常！')
            $.toast("操作失败", "text");
            initNRaddress();
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
function saveNRaddress(){
    var saveaddressFlag = $("#saveaddressFlag").val();
    if(saveaddressFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
    	if($("#saveaddressFlag").size() == 0){
        $("body").append("<input type='hidden' id='saveaddressFlag' value='1' >");
        saveaddress();
        }
    }
}

//防重复提交保存
function saveNRaddressgw(){
    var saveaddressFlag = $("#saveaddressFlag").val();
    if(saveaddressFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
        if($("#saveaddressFlag").size() == 0){
            $("body").append("<input type='hidden' id='saveaddressFlag' value='1' >");
            saveaddressgw();
        }
    }
}

//初始化重复提交判断
function initNRaddress(){
    $("#saveaddressFlag").remove();
}

//监听提交保存
$("#buttonSaveaddress").click(function(){
	saveNRaddress();
})


//监听提交保存
$("#buttonSaveaddressgw").click(function(){
    saveNRaddressgw();
})

//删除数据
function deleteaddress(id){

		//参数

    $.confirm("您确定要删除吗?", "确认删除?", function() {
        //传输数据
        var dataaddress = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
            "id":id
        }

        instanceaddress({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/gw/address/address/delete',
            data: dataaddress,
            cancelToken: sourceaddress.token
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
                console.log('deleteaddress请求异常！')
                $.toast("操作失败", "text");
                if(rs.data.code == '-1'){
                    localStorage.setItem('token','');
                    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
                        isLogin('','');
                    }
                }
            }
        });
    }, function() {
        //取消操作
    });


    }

//监听删除操作
$("#buttonDeleteaddress").click(function(){
    $.confirm("您确定要删除吗?", "确认删除?", function() {
        deleteaddress();
        }, function() {
        //取消操作
    });
});

//监听是否渲染
$(function () {

   //判断获取列表第一页
   if($("#buttonListFirstaddress").size()>0){
		getListaddress(addressRenderId1,'1',10,1);
   }

   //判断获取详情信息
   if(GetUrlString('id') != null && GetUrlString('id') != ''){
		detailaddress();
   }

});


function selectDizhi(id){
    var url = GetUrlString("url");
    //传输数据
    var dataaddress = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "id":id
    }

    instanceaddress({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gw/address/address/update',
        data: dataaddress,
        cancelToken: sourceaddress.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //$.toast("操作成功", 'success');
                location.href=url;
            }else{
                //$.toast(rs.data.msg, "text");

            }
        }else{
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
