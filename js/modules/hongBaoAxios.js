var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost";//本地模式
}
//文件请求URL
var baseFileUrlhongBao = ''+basehost+'';
//请求实例
var instancehongBao = axios.create({
  baseURL: ''+basehost+'/sfd/a/api/',
  timeout: 180000000,
  headers: {'token': localStorage.getItem('token')}
});

//取消请求
var CancelTokenhongBao = axios.CancelToken;
var sourcehongBao = CancelTokenhongBao.source();

// 添加请求拦截器
instancehongBao.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        sourcehongBao.cancel();
    }
   sessionStorage.clear();return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instancehongBao.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染
function listhongBao(renderId,renderType,pageSize,manyType){
		//分页
		var pageNoTemp = $("#listhongBao"+manyType+"PageNo").val();
		if(pageNoTemp > 0){
		   $("#listhongBao"+manyType+"PageNo").val(eval(pageNoTemp) + 1);
		}else{
		   $("body").append("<input type='hidden' id='listhongBao"+manyType+"PageNo' value='1' >");
		}
		//参数-manyType--需要手动处理对应字段
		var hongbaoNum = $("#hongbaoNum").val();
		var hongbaoMoney = $("#hongbaoMoney").val();
		var hongbaoBeizhu = $("#hongbaoBeizhu").val();
		var hongbaoImage = $("#hongbaoImage").val();
		var isFinish = $("#isFinish").val();
		var isGuding = $("#isGuding").val();
		var hongbaoType = $("#hongbaoType").val();
		var hongbaoAboutid = $("#hongbaoAboutid").val();
		var pageNo = $("#listhongBaoPageNo").val();

		//传输数据
		var datahongBao = {
			"hongbaoNum":hongbaoNum,
			"hongbaoMoney":hongbaoMoney,
			"hongbaoBeizhu":hongbaoBeizhu,
			"hongbaoImage":hongbaoImage,
			"isFinish":isFinish,
			"isGuding":isGuding,
			"hongbaoType":hongbaoType,
			"hongbaoAboutid":hongbaoAboutid,
		  	"pageSize":pageSize,
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
		    "pageNo":pageNo
		}

        instancehongBao({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sfl/hongbao/hongBao/list',
            data: datahongBao,
        	cancelToken: sourcehongBao.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            //数据处理
            if(rs.status=200){
				listhongBaoRender(rs.data,renderId,renderType);
            }else{
                console.log('请求异常！')
            }
        });

	}

//列表渲染
function listhongBaoRender(data,renderId,renderType){
      var listhongBaoStr = '';
      if(data.code == '0'){
        $.each(data.result,function(i,item){

　　　　	//console.log(i, item);
		//渲染内容处理
		listhongBaoStr += '';

　　     });


		//渲染赋值
		if(renderType == '1'){
			$("#"+renderId+"").append(listhongBaoStr);
		}else{
			$("#"+renderId+"").html(listhongBaoStr);
		}

      }else{
        $.toast(data.msg, "text");
      }
	}

//获取详情数据
function detailhongBao(){
		//参数
		var id = GetUrlString('id');

		//传输数据
		var datahongBao = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
		    "id":id
		}

        instancehongBao({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sfl/hongbao/hongBao/detail',
            data: datahongBao,
        	cancelToken: sourcehongBao.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
				detailhongBaoRender(rs.data);
            }else{
                console.log('请求异常！')
            }

        });

    }

//详情渲染
function detailhongBaoRender(data){
	  if(data.code == '0'){
        //var detailhongBaoStr = '';
        //detailhongBaoStr += '';
        //$("#detailhongBao").html(detailhongBaoStr);

        //参数
		$("#hongbaoNum").val(data.result.hongbaoNum);
		$("#hongbaoMoney").val(data.result.hongbaoMoney);
		$("#hongbaoBeizhu").val(data.result.hongbaoBeizhu);
		$("#hongbaoImage").val(data.result.hongbaoImage);
		$("#isFinish").val(data.result.isFinish);
		$("#isGuding").val(data.result.isGuding);
		$("#hongbaoType").val(data.result.hongbaoType);
		$("#hongbaoAboutid").val(data.result.hongbaoAboutid);
		$("#shareImage").val(data.result.hongbaoImage);
      }else{
        $.toast(data.msg, "text");
      }
	}

//保存数据
function savehongBao(){
	    // 在提交请求之前判断是否登录
		if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
			isLogin('','');
			initNRhongBao();
			return false;
		}
		//参数
		var hongbaoNum = $("#hongbaoNum").val();
		var hongbaoMoney = $("#hongbaoMoney").val();
		var hongbaoBeizhu = $("#hongbaoBeizhu").val();
		var hongbaoImage = $("#hongbaoImage").val();
		var isFinish = $("#isFinish").val();
		var isGuding = $("#isGuding").val();
		var hongbaoType = $("#hongbaoType").val();
		var hongbaoAboutid = $("#hongbaoAboutid").val();

		//判断不为空数据是否为空
		if(hongbaoNum ==null || hongbaoNum ==''){
			$.toast("请输入红包数量", "text");
			initNRhongBao();
			return false;
		}
		if(hongbaoMoney ==null || hongbaoMoney ==''){
			$.toast("请输入红包金额", "text");
			initNRhongBao();
			return false;
		}
		if(hongbaoBeizhu ==null || hongbaoBeizhu ==''){
			$.toast("请输入红包备注", "text");
			initNRhongBao();
			return false;
		}
		if(isFinish ==null || isFinish ==''){
			$.toast("请输入是否领完", "text");
			initNRhongBao();
			return false;
		}
		if(isGuding ==null || isGuding ==''){
			$.toast("请输入是否固定金额", "text");
			initNRhongBao();
			return false;
		}

		//传输数据
		var datahongBao = {
		  	"hongbaoNum":hongbaoNum,
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
		  	"hongbaoMoney":hongbaoMoney,
		  	"hongbaoBeizhu":hongbaoBeizhu,
		  	"hongbaoImage":hongbaoImage,
		  	"isFinish":isFinish,
		  	"isGuding":isGuding,
		  	"hongbaoType":hongbaoType,
		  	"hongbaoAboutid":hongbaoAboutid
		}

        instancehongBao({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sfl/hongbao/hongBao/save',
            data:datahongBao,
        	cancelToken: sourcehongBao.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
				if(rs.data.code == '0'){
					//$.toast("操作成功", 'success');
                    refresh();
				}else{
					$.toast(rs.data.msg, "text");
					initNRhongBao();
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
                initNRhongBao();
            }

        });

    }

//防重复提交保存
function saveNRhongBao(){
    var savehongBaoFlag = $("#savehongBaoFlag").val();
    if(savehongBaoFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
    	if($("#savehongBaoFlag").size() == 0){
        $("body").append("<input type='hidden' id='savehongBaoFlag' value='1' >");
        savehongBao();
        }
    }
}

//初始化重复提交判断
function initNRhongBao(){
    $("#savehongBaoFlag").remove();
}

//监听提交保存
$("#buttonSavehongBao").click(function(){
	saveNRhongBao();
})

//删除数据
function deletehongBao(){

		//参数
		var id = GetUrlString('id');

		//传输数据
		var datahongBao = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
		    "id":id
		}

        instancehongBao({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sfl/hongbao/hongBao/delete',
            data: datahongBao,
        	cancelToken: sourcehongBao.token
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
$("#buttonDeletehongBao").click(function(){
    $.confirm("您确定要删除吗?", "确认删除?", function() {
        deletehongBao();
        }, function() {
        //取消操作
    });
});

//监听是否渲染
$(function () {

   //判断获取列表第一页
   if($("#buttonListFirsthongBao").size()>0){
		getListhongBao(hongBaoRenderId1,'1',10,1);
   }

   //判断获取详情信息
   if($("#buttonDetailhongBao").size()>0){
		detailhongBao();
   }

});