var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost";//本地模式
}
//文件请求URL
var baseFileUrladv = ''+basehost+'';
//请求实例
var instanceadv = axios.create({
    baseURL: ''+basehost+'/sfd/a/api/',
    timeout: 180000000,
    headers: {'token': localStorage.getItem('token')}
});

//取消请求
var CancelTokenadv = axios.CancelToken;
var sourceadv = CancelTokenadv.source();

// 添加请求拦截器
instanceadv.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        sourceadv.cancel();
    }
   sessionStorage.clear();return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instanceadv.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染
function listadv(renderId,renderType,pageSize,manyType){
    //分页
    var pageNoTemp = $("#listadv"+manyType+"PageNo").val();
    if(pageNoTemp > 0){
        $("#listadv"+manyType+"PageNo").val(pageNoTemp + 1);
    }else{
        $("body").append("<input type='hidden' id='listadv"+manyType+"PageNo' value='1' >");
    }
    //参数-manyType--需要手动处理对应字段
    var advType = $("#advType").val();
    var advTitle = $("#advTitle").val();
    var advImage = $("#advImage").val();
    var advLink = $("#advLink").val();
    var advVideo = $("#advVideo").val();
    var advStart = $("#advStart").val();
    var advEnd = $("#advEnd").val();
    var advStatus = $("#advStatus").val();
    var advDianjilaing = $("#advDianjilaing").val();
    var pageNo = $("#listadvPageNo").val();

    //传输数据
    var dataadv = {
        "advType":advType,
        "advTitle":advTitle,
        "advImage":advImage,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "advLink":advLink,
        "advVideo":advVideo,
        "advStart":advStart,
        "advEnd":advEnd,
        "advStatus":advStatus,
        "advDianjilaing":advDianjilaing,
        "pageSize":pageSize,

        "pageNo":pageNo
    }

    instanceadv({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/adv/adv/list',
        data: dataadv,
        cancelToken: sourceadv.token
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

//列表渲染
function listadvRender(data,renderId,renderType){
    var listadvStr = '';
    if(data.code == '0'){
        $.each(data.result,function(i,item){

            //console.log(i, item);
            //渲染内容处理
            listadvStr += '';

        });


        //渲染赋值
        if(renderType == '1'){
            $("#"+renderId+"").append(listadvStr);
        }else{
            $("#"+renderId+"").html(listadvStr);
        }

    }else{
        $.toast(data.msg, "text");
    }
}

//获取详情数据
function detailadv(){
    //参数
    var id = GetUrlString('id');

    //传输数据
    var dataadv = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "id":id
    }

    instanceadv({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/adv/adv/detail',
        data: dataadv,
        cancelToken: sourceadv.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            detailadvRender(rs.data);
        }else{
            console.log('请求异常！')
        }

    });

}

//详情渲染
function detailadvRender(data){
    if(data.code == '0'){
        //var detailadvStr = '';
        //detailadvStr += '';
        //$("#detailadv").html(detailadvStr);

        //参数
        $("#advType").val(data.result.advType);
        $("#advTitle").val(data.result.advTitle);
        $("#advImage").val(data.result.advImage);
        $("#advLink").val(data.result.advLink);
        $("#advVideo").val(data.result.advVideo);
        $("#advStart").val(data.result.advStart);
        $("#advEnd").val(data.result.advEnd);
        $("#advStatus").val(data.result.advStatus);
        $("#advDianjilaing").val(data.result.advDianjilaing);

    }else{
        $.toast(data.msg, "text");
    }
}

//保存数据
function saveadv(){
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        initNRadv();
        return false;
    }
    //参数
    var advType = $("#advType").val();
    var advTitle = $("#advTitle").val();
    var advImage = $("#advImage").val();
    var advLink = $("#advLink").val();
    var advVideo = $("#advVideo").val();
    var advStart = $("#advStart").val();
    var advEnd = $("#advEnd").val();
    var advStatus = $("#advStatus").val();
    var advDianjilaing = $("#advDianjilaing").val();

    //判断不为空数据是否为空
    if(advType ==null || advType ==''){
        $.toast("请输入广告位置", "text");
        initNRadv();
        return false;
    }
    if(advTitle ==null || advTitle ==''){
        $.toast("请输入广告标题", "text");
        initNRadv();
        return false;
    }
    if(advImage ==null || advImage ==''){
        $.toast("请输入广告图片", "text");
        initNRadv();
        return false;
    }
    if(advLink ==null || advLink ==''){
        $.toast("请输入广告连接", "text");
        initNRadv();
        return false;
    }
    if(advStart ==null || advStart ==''){
        $.toast("请输入开始时间", "text");
        initNRadv();
        return false;
    }
    if(advEnd ==null || advEnd ==''){
        $.toast("请输入结束时间", "text");
        initNRadv();
        return false;
    }
    if(advStatus ==null || advStatus ==''){
        $.toast("请输入广告状态", "text");
        initNRadv();
        return false;
    }

    //传输数据
    var dataadv = {
        "advType":advType,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "advTitle":advTitle,
        "advImage":advImage,
        "advLink":advLink,
        "advVideo":advVideo,
        "advStart":advStart,
        "advEnd":advEnd,
        "advStatus":advStatus,
        "advDianjilaing":advDianjilaing
    }

    instanceadv({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/adv/adv/save',
        data:dataadv,
        cancelToken: sourceadv.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //$.toast("操作成功", 'success');
                refresh();
            }else{
                $.toast(rs.data.msg, "text");
                initNRadv();
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
            initNRadv();
        }

    });

}

//防重复提交保存
function saveNRadv(){
    var saveadvFlag = $("#saveadvFlag").val();
    if(saveadvFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
        if($("#saveadvFlag").size() == 0){
            $("body").append("<input type='hidden' id='saveadvFlag' value='1' >");
            saveadv();
        }
    }
}

//初始化重复提交判断
function initNRadv(){
    $("#saveadvFlag").val('0');
}

//监听提交保存
$("#buttonSaveadv").click(function(){
    saveNRadv();
})

//删除数据
function deleteadv(){

    //参数
    var id = GetUrlString('id');

    //传输数据
    var dataadv = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "id":id
    }

    instanceadv({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/adv/adv/delete',
        data: dataadv,
        cancelToken: sourceadv.token
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
$("#buttonDeleteadv").click(function(){
    $.confirm("您确定要删除吗?", "确认删除?", function() {
        deleteadv();
    }, function() {
        //取消操作
    });
});

//监听是否渲染
$(function () {

    //判断获取列表第一页
    if($("#buttonListFirstadv").size()>0){
        getListadv(advRenderId1,'1',10,1);
    }

    //判断获取详情信息
    if($("#buttonDetailadv").size()>0){
        detailadv();
    }

});