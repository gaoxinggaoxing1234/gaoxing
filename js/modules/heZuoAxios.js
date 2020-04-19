var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost";//本地模式
}
//文件请求URL
var baseFileUrlheZuo = ''+basehost+'';
//请求实例
var instanceheZuo = axios.create({
    baseURL: ''+basehost+'/sfd/a/api/',
    timeout: 180000000,
    headers: {'token': localStorage.getItem('token')}
});

//取消请求
var CancelTokenheZuo = axios.CancelToken;
var sourceheZuo = CancelTokenheZuo.source();

// 添加请求拦截器
instanceheZuo.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){

    }
   sessionStorage.clear();return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instanceheZuo.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

//获取列表数据
function listheZuo(){
    //参数
    var hzMobile = $("#hzMobile").val();
    var hzLinkman = $("#hzLinkman").val();
    var hzContent = $("#hzContent").val();
    var pageNo = $("#listheZuoPageNo").val();

    //传输数据
    var dataheZuo = {
        "hzMobile":hzMobile,
        "hzLinkman":hzLinkman,
        "hzContent":hzContent,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo
    }

    instanceheZuo({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/hezuo/heZuo/list',
        data: dataheZuo,
        cancelToken: sourceheZuo.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //数据处理
        if(rs.status=200){
            listheZuoRender(rs.data);
        }else{
            console.log('请求异常！')
        }
    });

}

//列表渲染
function listheZuoRender(data){
    var listheZuoStr = '';
    if(data.code == '0'){
        $.each(data.result,function(i,item){

            //console.log(i, item);
            listheZuoStr += '';

        });
        $("#listheZuo").html(listheZuoStr);
    }else{
        $.toast(data.msg, "text");
    }
}


//带有分页调用列表
function getListheZuo(){
    var pageNo = $("#listheZuoPageNo").val();
    if(pageNo > 0){
        $("#listheZuoPageNo").val(pageNo + 1);
    }else{
        $("body").append("<input type='hidden' id='listheZuoPageNo' value='1' >");
    }
    listheZuo();
}

//监听获取下一页
$("#buttonListheZuo").click(function(){
    getListheZuo();
});

//监听获取第一页
$("#buttonListFirstheZuo").click(function(){
    getListheZuo();
});



//获取详情数据
function detailheZuo(){

    //参数
    var id = GetUrlString('id');

    //传输数据
    var dataheZuo = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "id":id
    }

    instanceheZuo({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/hezuo/heZuo/detail',
        data: dataheZuo,
        cancelToken: sourceheZuo.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            detailheZuoRender(rs.data);
        }else{
            console.log('请求异常！')
        }

    });

}

//详情渲染
function detailheZuoRender(data){
    if(data.code == '0'){
        //var detailheZuoStr = '';
        //detailheZuoStr += '';
        //$("#detailheZuo").html(detailheZuoStr);

        //参数
        $("#hzMobile").val(data.result.hzMobile);
        $("#hzLinkman").val(data.result.hzLinkman);
        $("#hzContent").val(data.result.hzContent);

    }else{
        $.toast(data.msg, "text");
    }
}

//监听获取详情
$("#buttonDetailheZuo").click(function(){
    detailheZuo();
});

//保存数据
function saveheZuo(){
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        initNRheZuo();
        return false;
    }
    //参数
    var hzMobile = $("#hzMobile").val();
    var hzLinkman = $("#hzLinkman").val();
    var hzContent = $("#hzContent").val();

    //判断不为空数据是否为空
    if(hzMobile ==null || hzMobile ==''){
        $.toast("请输入联系电话", "text");
        initNRheZuo();
        return false;
    }
    if(hzLinkman ==null || hzLinkman ==''){
        $.toast("请输入联系人", "text");
        initNRheZuo();
        return false;
    }
    if(hzContent ==null || hzContent ==''){
        $.toast("请输入合作内容简介", "text");
        initNRheZuo();
        return false;
    }

    //传输数据
    var dataheZuo = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "hzMobile":hzMobile,
        "hzLinkman":hzLinkman,
        "hzContent":hzContent
    }

    instanceheZuo({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/hezuo/heZuo/save',
        data:dataheZuo,
        cancelToken: sourceheZuo.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //$.toast("操作成功", 'success');
                refresh();
            }else{
                $.toast(rs.data.msg, "text");
                initNRheZuo();
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
            initNRheZuo();
        }

    });

}

//防重复提交保存
function saveNRheZuo(){
    var saveheZuoFlag = $("#saveheZuoFlag").val();
    if(saveheZuoFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
        $("body").append("<input type='hidden' id='saveheZuoFlag' value='1' >");
        saveheZuo();
    }
}
//初始化重复提交判断
function initNRheZuo(){
    $("#saveheZuoFlag").remove();
}


