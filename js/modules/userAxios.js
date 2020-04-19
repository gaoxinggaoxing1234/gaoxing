var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost";//本地模式
}
//文件请求URL
var baseFileUrluser = ''+basehost+'';
//请求实例
var instanceuser = axios.create({
    baseURL: ''+basehost+'/sfd/a/api/',
    timeout: 180000000,
    headers: {'token': localStorage.getItem('token')}
});

//取消请求
var CancelTokenuser = axios.CancelToken;
var sourceuser = CancelTokenuser.source();

// 添加请求拦截器
instanceuser.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        //isLogin('','');
        //sourceuser.cancel();
    }
   sessionStorage.clear();return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instanceuser.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});



//获取详情数据
function detailuser(){

    //参数
    var token = localStorage.getItem('token');

    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    };

    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/userdetail',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            detailuserRender(rs.data);

            //$("#tab4").show();
        }else{
            console.log('请求异常！');
            //$("#tab4").show();
        }

    });

}



//详情渲染
function detailuserRender(data){
    if(data.code == '0'){
        localStorage.setItem('userLevel',data.result.userBrand);
        if(localStorage.getItem('token') != null &&  localStorage.getItem('token') != 'null' && localStorage.getItem('token') != ''){
            //alert(getSaasId() + "==="+data.result.tenancy);
            if(getSaasId() != data.result.tenancy ){
                localStorage.clear();
                isLogin();
            }
        }
        if(data.result.userTeacher  == '1'){
            if($("#orderMoney").size() > 0){
                $("#tixiandis").hide();
                $.toast("内部员工，暂不允许提现！", "text");
                location.href='qianbao.html';

            }else{
                $("#tixiandis").hide();
            }

            localStorage.setItem("neibu","1");

        }else{
            //console.log("==========2")
            $("#tixiandis").show();
            localStorage.setItem("neibu","0");


        }

        //参数
        $("#nickName").html(data.result.nickname);
        if(data.result.isV == '3'){
            $("#isV").attr("class","");
        }
        if(data.result.headimgurl != null){
            $("#headimgurl").attr("src",checkPath(data.result.headimgurl,"1"));
        }
        if(data.result.userLevel == '普通会员'){
            $("#userLevel").html('普通会员');

            $("#remarks2").hide();
            localStorage.setItem('vip','no');

           /* $("#userLevelName").html('普通会员');
            $("#userLevelName").attr("onclick","toUserLevelDetail("+eval(localStorage.getItem("userLevel"))+1+")");
            if(eval(localStorage.getItem("userLevel")) < 6){
                $("#jibie").attr("onclick","toUserLevelDetail("+eval(localStorage.getItem("userLevel")+1)+")");

            }else{
                $("#jibie").attr("onclick","toUserLevelDetail("+eval(localStorage.getItem("userLevel"))+")");
            }
            $("#levelInfo").html('分销躺赚-信息发布-人脉拓展-高佣福利');*/
        }else{
            /*$("#userLevelName").attr("class","weui-flex__item f-yellow");
            $("#userLevelName").html(data.result.userLevel);
            $("#userLevelName").attr("onclick","toUserLevelDetail("+eval(localStorage.getItem("userLevel"))+")");

            if(eval(localStorage.getItem("userLevel")) < 6){
                $("#jibie").attr("onclick","toUserLevelDetail("+eval(localStorage.getItem("userLevel")+1)+")");
                if(eval(localStorage.getItem("userLevel")) == 1){
                    $("#levelInfo").html('分销躺赚-信息发布-人脉拓展-高佣补贴');
                }else if(eval(localStorage.getItem("userLevel")) == 2){
                    $("#levelInfo").html('放单推广-产品发布-人脉拓展-高佣补贴');
                }else if(eval(localStorage.getItem("userLevel")) == 3){
                    $("#levelInfo").html('定价权-团队管理-躺赚模式-20%抽成');
                }else if(eval(localStorage.getItem("userLevel")) == 4){
                    $("#levelInfo").html('30%抽成-入职培训-顶级会员-躺赚模式');
                }else if(eval(localStorage.getItem("userLevel")) == 5){
                    $("#levelInfo").html('极速贴牌-产品发布-自带内容-省时省事');
                }

            }else{
                $("#jibie").attr("onclick","toUserLevelDetail("+eval(localStorage.getItem("userLevel"))+")");
                $("#levelInfo").html('独立部署-独立APP-独立域名-独立服务器');
            }*/

            $("#userLevel").attr("class","label f-red b-red");
            $("#userLevel").html(data.result.userLevel);
            $("#qiabaodis").show();
            $("#tuiguangzhongxindis").show();
            $("#lipincaigou").show();
            //2330fcbb82bb43e89605955c632aa6bf
            //如果是会员则进行--提示剩余时间
            $("#remarks3").show();
            $("#remarks3").html("VIP会员剩余:"+data.result.likeNo+"天");
            $("#remarks3").attr("onclick","toRuHeZhuanQianDetail()");
            if(data.result.userLevel != null){
                localStorage.setItem('vip','vip');
            }

        }
        if(data.result.isAuth== '3'){
            $("#isAuth").attr("class","label f-red b-red");
        }
        if(data.result.companyAuth == '3'){
            $("#companyAuth").attr("class","label f-blue b-blue");
        }
        $("#money").html("金币："+data.result.money+"克");
        if(data.result.hongbao != null ){
            $("#hongbao").html("做单补贴："+data.result.hongbao+"克&nbsp;&nbsp;");
            $("#butie").html("￥"+data.result.hongbao+"");
        }else if(localStorage.getItem("s") == '0'){
            $("#hongbao").html("做单补贴：0克&nbsp;&nbsp;");
        }
        $("#jifen").html("积分："+data.result.jifen+"分");
        localStorage.setItem("inid",data.result.inUser);
        if($("#moneyyue").size() > 0){
            $("#moneyyue").html("零钱余额￥"+data.result.money+"元");
            $("#xianzaiyue").val(data.result.money);
            if(data.result.isAuth != '3'){
                if(localStorage.getItem('token') != null && localStorage.getItem('token') != 'null' && localStorage.getItem('token') != '') {
                    $.confirm("提现需要完善信息", "去完善信息", function () {
                        location.href = 'updaterealname.html';
                    }, function () {
                        //取消操作
                        location.href = 'updaterealname.html';
                    });
                }
            }
        }

        if($("#allfenxiaomoney").size() > 0 ){
            if(data.result.isAuth != '3'){
                if(localStorage.getItem('token') != null && localStorage.getItem('token') != 'null' && localStorage.getItem('token') != '') {
                    $.confirm("您未进行完善信息", "去完善信息", function () {
                        location.href = 'updaterealname.html';
                    }, function () {
                        //取消操作
                        //location.href='updaterealname.html';
                    });
                }
            }

            if(data.result.userLevel == '普通会员'){
                $("#buyhuiyuan").show();
            }
        }

        if($("#guanzhuId").size() > 0){
            $("#guanzhuId").val(data.result.id);
            if($("#gz").size() > 0){
                isguanzhu();//判断是否关注
            }
        }




    }else{
        $.toast(data.msg, "text");
    }
}



//详情渲染
function detailuserRenderShare(data){
    if(data.code == '0'){
        $("#telproduct").html("咨询电话："+data.result.phoneB);
        $("#telproduct").attr("href","tel:"+data.result.phoneB);
    }else{
        $.toast(data.msg, "text");
    }
}






//详情渲染
function detailuserRenderShop(data){
    if(data.code == '0'){

        /*if(localStorage.getItem('token') != null &&  localStorage.getItem('token') != 'null' && localStorage.getItem('token') != ''){
            alert(getSaasId() + "==="+data.result.tenancy);
            if(getSaasId() != data.result.tenancy ){
                localStorage.clear();
                isLogin();
            }
        }
*/

        //参数
        $("#nickName").html(data.result.nickname);
        if(data.result.isV == '3'){
            $("#isV").attr("class","");
        }
        if(data.result.headimgurl != null){
            $("#headimgurl").attr("src",checkPath(data.result.headimgurl,"1"));
        }
        if(data.result.userLevel == '普通会员'){
            $("#userLevel").html('普通会员');
            $("#remarks2").hide();
            localStorage.setItem('vip','no');
        }else{
            $("#userLevel").attr("class","label f-red b-red");
            $("#userLevel").html(data.result.userLevel);
            $("#qiabaodis").show();
            $("#tuiguangzhongxindis").show();
            $("#lipincaigou").show();
            //2330fcbb82bb43e89605955c632aa6bf
            //如果是会员则进行--提示剩余时间
            $("#remarks3").show();
            $("#remarks3").html("VIP会员剩余:"+data.result.likeNo+"天");
            $("#remarks3").attr("onclick","toRuHeZhuanQianDetail()");
            if(data.result.userLevel != null){
                localStorage.setItem('vip','vip');
            }

        }
        if(data.result.isAuth== '3'){
            $("#isAuth").attr("class","label f-red b-red");
        }
        if(data.result.companyAuth == '3'){
            $("#companyAuth").attr("class","label f-blue b-blue");
        }
        $("#money").html("金币："+data.result.money+"克");
        /*if(data.result.hongbao != null ){
            $("#hongbao").html("做单补贴："+data.result.hongbao+"克&nbsp;&nbsp;");
        }else if(localStorage.getItem("s") == '0'){
            $("#hongbao").html("做单补贴：0克&nbsp;&nbsp;");
        }*/

        $("#jifen").html("积分："+data.result.jifen+"分");
        if($("#moneyyue").size() > 0){
            $("#moneyyue").html("零钱余额￥"+data.result.money+"元");
            $("#xianzaiyue").val(data.result.money);
            if(data.result.isAuth != '3'){

                if(localStorage.getItem('token') != null && localStorage.getItem('token') != 'null' && localStorage.getItem('token') != '') {
                    $.confirm("提现需要完善信息", "去完善信息", function () {
                        location.href = 'updaterealname.html';
                    }, function () {
                        //取消操作
                        location.href = 'updaterealname.html';
                    });
                }
            }
        }

        if($("#allfenxiaomoney").size() > 0 ){
            if(data.result.isAuth != '3'){
                if(localStorage.getItem('token') != null && localStorage.getItem('token') != 'null' && localStorage.getItem('token') != ''){
                    $.confirm("您未进行完善信息", "去完善信息", function() {
                        location.href='updaterealname.html';
                    }, function() {
                        //取消操作
                        //location.href='updaterealname.html';
                    });
                }

            }

            if(data.result.userLevel == '普通会员'){
                $("#buyhuiyuan").show();
            }
        }

        if($("#guanzhuId").size() > 0){
            $("#guanzhuId").val(data.result.id);
            if($("#gz").size() > 0){
                isguanzhu();//判断是否关注
            }
        }

        console.log(data.result.siteName);
        if(curWwwPath.search("index") != -1){
            if(data.result.siteName != null  && data.result.siteName != ''){
                $("title").text(data.result.siteName);
            }

        }

    }else{
        $.toast(data.msg, "text");
    }
}

//详情渲染
function detailuserRenderShopYG(data){
    if(data.code == '0'){

        /*if(localStorage.getItem('token') != null &&  localStorage.getItem('token') != 'null' && localStorage.getItem('token') != ''){
            alert(getSaasId() + "==="+data.result.tenancy);
            if(getSaasId() != data.result.tenancy ){
                localStorage.clear();
                isLogin();
            }
        }
*/

        //参数
        //$("#nickName").html(data.result.nickname);
        /*if(data.result.isV == '3'){
            $("#isV").attr("class","");
        }
        if(data.result.headimgurl != null){
            $("#headimgurl").attr("src",checkPath(data.result.headimgurl,"1"));
        }
        if(data.result.userLevel == '普通会员'){
            $("#userLevel").html('普通会员');
            $("#remarks2").hide();
            localStorage.setItem('vip','no');
        }else{
            $("#userLevel").attr("class","label f-blue b-blue");
            $("#userLevel").html(data.result.userLevel);
            $("#qiabaodis").show();
            $("#tuiguangzhongxindis").show();
            $("#lipincaigou").show();
            //2330fcbb82bb43e89605955c632aa6bf
            //如果是会员则进行--提示剩余时间
            $("#remarks3").show();
            $("#remarks3").html("VIP会员剩余:"+data.result.likeNo+"天");
            $("#remarks3").attr("onclick","toRuHeZhuanQianDetail()");
            if(data.result.userLevel != null){
                localStorage.setItem('vip','vip');
            }

        }
        if(data.result.isAuth== '3'){
            $("#isAuth").attr("class","label f-blue b-blue");
        }
        if(data.result.companyAuth == '3'){
            $("#companyAuth").attr("class","label f-blue b-blue");
        }
        $("#money").html("金币："+data.result.money+"克");*/
        /*if(data.result.hongbao != null ){
            $("#hongbao").html("做单补贴："+data.result.hongbao+"克&nbsp;&nbsp;");
        }else if(localStorage.getItem("s") == '0'){
            $("#hongbao").html("做单补贴：0克&nbsp;&nbsp;");
        }*/

        /*$("#jifen").html("积分："+data.result.jifen+"分");*/
        if($("#moneyyueYG").size() > 0){
            $("#moneyyueYG").html("零钱余额￥"+data.result.money+"元");
            $("#xianzaiyueYG").val(data.result.money);
            if(data.result.isAuth != '3'){

                if(localStorage.getItem('token') != null && localStorage.getItem('token') != 'null' && localStorage.getItem('token') != '') {
                    $.confirm("提现需要完善信息", "去完善信息", function () {
                        location.href = 'updaterealname.html';
                    }, function () {
                        //取消操作
                        location.href = 'updaterealname.html';
                    });
                }
            }
        }

        /*if($("#allfenxiaomoney").size() > 0 ){
            if(data.result.isAuth != '3'){
                if(localStorage.getItem('token') != null && localStorage.getItem('token') != 'null' && localStorage.getItem('token') != ''){
                    $.confirm("您未进行实名认证", "去完善信息", function() {
                        location.href='updaterealname.html';
                    }, function() {
                        //取消操作
                        //location.href='updaterealname.html';
                    });
                }

            }

            if(data.result.userLevel == '普通会员'){
                $("#buyhuiyuan").show();
            }
        }

        if($("#guanzhuId").size() > 0){
            $("#guanzhuId").val(data.result.id);
            if($("#gz").size() > 0){
                isguanzhu();//判断是否关注
            }
        }
*/
        console.log(data.result.siteName);
        if(curWwwPath.search("index") != -1){
            if(data.result.siteName != null  && data.result.siteName != ''){
                $("title").text(data.result.siteName);
            }

        }

    }else{
        $.toast(data.msg, "text");
    }
}


//获取详情数据
function detailuserShouru(){

    //参数
    var token = localStorage.getItem('token');

    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }

    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/userteammoney',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            detailuserShouruRender(rs.data);
        }else{
            console.log('请求异常！')
        }

    });

}

//详情渲染
function detailuserShouruRender(data){
    if(data.code == '0'){

        //参数

        $("#remarks").html(data.result.remarks);


    }else{
        //$.toast(data.msg, "text");
    }
}



//获取详情数据
function detailuserShop(){

    //参数
    var id = GetUrlString('id');
    if(id == null || id == '' ){
        sourceuser.cancel();
        location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
    }
    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "id":id
    }
    if(id != '' && id != null && id != 'null') {
        instanceuser({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sys/user/userdetailShop',
            data: datauser,
            cancelToken: sourceuser.token
        }).then(function (rs) {
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if (rs.status = 200) {
                detailuserRenderShop(rs.data);
            } else {
                console.log('请求异常！')
            }

        });
    }

}

//获取详情数据
function detailuserYG(){

    //参数
    var id = GetUrlString('ygId');
    if(id == null || id == '' ){
        sourceuser.cancel();
        location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
    }
    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "id":id
    }
    if(id != '' && id != null && id != 'null') {
        instanceuser({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sys/user/userdetailShop',
            data: datauser,
            cancelToken: sourceuser.token
        }).then(function (rs) {
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if (rs.status = 200) {
                detailuserRenderShopYG(rs.data);
            } else {
                console.log('请求异常！')
            }

        });
    }

}

//获取详情数据
function detailuserShare(){


    //参数
    var id = getShareId();
    console.log("======================"+id);
    if(id != '' && id != null && id != 'null'){
        //传输数据
        var datauser = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
            "id":id
        }

        instanceuser({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sys/user/userdetailShop',
            data: datauser,
            cancelToken: sourceuser.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
                detailuserRenderShare(rs.data);
            }else{
                console.log('请求异常！')
            }

        });
    }



}


//获取详情数据
function detailuserShouruShop(){

    //参数
    var id = GetUrlString('id');
    if(id == null || id == ''){
        sourceuser.cancel();
        location.href=baseXueYuanPath + 'error.htm?share='+getShareId()+'&s='+getSaasId();//
    }
    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "id":id
    }
    if(id != '' && id != null && id != 'null') {
        instanceuser({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sys/user/userteammoneyShop',
            data: datauser,
            cancelToken: sourceuser.token
        }).then(function (rs) {
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if (rs.status = 200) {
                detailuserShouruRender(rs.data);
            } else {
                console.log('请求异常！')
            }

        });
    }
}



$(function () {
    //判断获取详情信息
    if($("#buttonDetailuser").size()>0){
        detailuser();
        detailuserShouru();
    }

    if($("#buttonDetailuserNew").size()>0){
        detailuser();
    }
});
$(function () {
    //判断获取详情信息
    if($("#buttonDetailuserShop").size()>0){
        detailuserShop();
        detailuserShouruShop();

    }
});

$(function () {
    //判断获取详情信息
    if($("#buttonDetailuserYG").size()>0){
        detailuserYG();
    }
});

function tixian() {
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        initNRtixian();
        return false;

    }
    //以下参数需要提前赋值
    var orderNum = $("#orderNum").val();
    var orderMoney = $("#orderMoney").val();
    var orderType = $("#orderType").val();
    var orderTitle = $("#orderTitle").val();
    var xianzaiyue = $("#xianzaiyue").val();
    //var orderAboutid = $("#orderAboutid").val();
    var token = localStorage.getItem('token');
    //console.log("====="+new Date().getHours())
    if(orderMoney == '' || orderMoney == null ){
        $.toast("提现金额有误", "text");
        initNRtixian();
        return false;

    }else if(eval(orderMoney) < eval(localStorage.getItem("shoudongtixianmin"))){
        $.toast("提现金额需大于等于"+localStorage.getItem("shoudongtixianmin")+"元", "text");
        initNRtixian();
        return false;

    }else if(eval(orderMoney) - eval(xianzaiyue) > 0.00 ){
        $.toast("提现金额不能大于余额", "text");
        initNRtixian();
        return false;

    }else if(eval(new Date().getHours()) - eval(localStorage.getItem("tixianstart"))  <  0 ||  eval(new Date().getHours()) - eval(localStorage.getItem("tixianend")) >= 0){
        $.toast("提现时间为"+localStorage.getItem("tixianstart")+"至"+localStorage.getItem("tixianend")+"点", "text");
        initNRtixian();
        return false;
    }else{
        $("#buttonSavetixian").hide();
        /* $("#s0").hide();
        $("#s1").hide();*/
       /* $("#s2").show();*/
        /*closeWindow();*/


        //传输数据
        var datauser = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
            "orderNum":orderNum,
            "orderMoney":orderMoney,
            "orderType":orderType,
            "orderTitle":orderTitle,
            "payWay":"0",
            "token":token
        }


        instanceuser({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sys/user/tixian',
            data: datauser,
            cancelToken: sourceuser.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
                if(rs.data.code == '0' || rs.data.msg == 'SUCCESS'){

                    $.toast('提现成功','text');
                    setTimeout(function() {
                        window.location.href=curWwwPath;
                    }, 2000)


                }else{

                    var str = '';
                    str = rs.data.msg;
                    $.toast(rs.data.msg, "text");
                   /* if(rs.data.msg == 'SUCCESS'){
                        str = "提现操作成功";
                        //$.toast(str, 'success');
                        $.toast.prototype.defaults.duration=1000;//1秒
                        $.toast(str,'text');
                    }else{
                        str = rs.data.msg;
                        $.toast(rs.data.msg, "text");

                    }*/

                    initNRtixian();
                    if(rs.data.code == '-9'){
                        if(localStorage.getItem('token') != null && localStorage.getItem('token') != 'null' && localStorage.getItem('token') != '') {
                            $.confirm("提现需要完善信息", "去完善信息", function () {
                                location.href = 'updaterealname.html';
                            }, function () {
                                //取消操作
                                location.href = 'updaterealname.html';
                            });
                        }
                    }/*else{
                        location.href='tixiansuccess.html?url=tixian.html';


                    }*/
                }


            }else{

                console.log('请求异常！')
            }

        });

    }


}

function tixianYG() {
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        initNRtixian();
        return false;

    }
    //以下参数需要提前赋值
    var orderNum = $("#orderNum").val();
    var orderMoney = $("#orderMoney").val();
    var orderType = $("#orderType").val();
    var orderTitle = $("#orderTitle").val();
    var xianzaiyue = $("#xianzaiyueYG").val();
    var orderAboutid = GetUrlString("ygId");
    var token = localStorage.getItem('token');
    //console.log("====="+new Date().getHours())
    if(orderMoney == '' || orderMoney == null ){
        $.toast("提现金额有误", "text");
        initNRtixian();
        return false;

    }else if(eval(orderMoney) < eval(localStorage.getItem("shoudongtixianmin"))){
        $.toast("提现金额需大于等于"+localStorage.getItem("shoudongtixianmin")+"元", "text");
        initNRtixian();
        return false;

    }else if(eval(orderMoney) - eval(xianzaiyue) > 0.00 ){
        $.toast("提现金额不能大于余额", "text");
        initNRtixian();
        return false;

    }else if(eval(new Date().getHours()) - eval(localStorage.getItem("tixianstart"))  <  0 ||  eval(new Date().getHours()) - eval(localStorage.getItem("tixianend")) >= 0){
        $.toast("提现时间为"+localStorage.getItem("tixianstart")+"至"+localStorage.getItem("tixianend")+"点", "text");
        initNRtixian();
        return false;
    }else{
        $("#buttonSavetixianYG").hide();
        /* $("#s0").hide();
        $("#s1").hide();*/
        /* $("#s2").show();*/
        /*closeWindow();*/


        //传输数据
        var datauser = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
            "orderNum":orderNum,
            "orderMoney":orderMoney,
            "orderType":orderType,
            "orderTitle":orderTitle,
            "orderAboutid":orderAboutid,
            "payWay":"0",
            "token":token
        }


        instanceuser({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sys/user/tixianyuangong',
            data: datauser,
            cancelToken: sourceuser.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
                if(rs.data.code == '0' || rs.data.msg == 'SUCCESS'){

                    $.toast('提现成功','text');
                    setTimeout(function() {
                        window.location.href=curWwwPath;
                    }, 2000)


                }else{

                    var str = '';
                    str = rs.data.msg;
                    $.toast(rs.data.msg, "text");
                    /* if(rs.data.msg == 'SUCCESS'){
                         str = "提现操作成功";
                         //$.toast(str, 'success');
                         $.toast.prototype.defaults.duration=1000;//1秒
                         $.toast(str,'text');
                     }else{
                         str = rs.data.msg;
                         $.toast(rs.data.msg, "text");

                     }*/

                    initNRtixian();
                    if(rs.data.code == '-9'){
                        if(localStorage.getItem('token') != null && localStorage.getItem('token') != 'null' && localStorage.getItem('token') != '') {
                            $.confirm("提现需要完善信息", "去完善信息", function () {
                                location.href = 'updaterealname.html';
                            }, function () {
                                //取消操作
                                location.href = 'updaterealname.html';
                            });
                        }
                    }/*else{
                        location.href='tixiansuccess.html?url=tixian.html';


                    }*/
                }


            }else{

                console.log('请求异常！')
            }

        });

    }


}

//防重复提交保存
function saveNRtixian(){
    var tixianFlag = $("#tixianFlag").val();
    if(tixianFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
        if($("#tixianFlag").size() == 0){
            $("body").append("<input type='hidden' id='tixianFlag' value='1' >");

        }else{
            $("#tixianFlag").val("1");
        }
        tixian();
    }
}

//防重复提交保存
function saveNRtixianYG(){
    var tixianFlag = $("#tixianFlag").val();
    if(tixianFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
        if($("#tixianFlag").size() == 0){
            $("body").append("<input type='hidden' id='tixianFlag' value='1' >");

        }else{
            $("#tixianFlag").val("1");
        }
        tixianYG();
    }
}

//初始化重复提交判断
function initNRtixian(){
    $("#tixianFlag").val('0');
}

//监听提交保存
$("#buttonSavetixian").click(function(){
    $.confirm("您确定要提现吗?", "确认提现?", function() {
        saveNRtixian();
    }, function() {
        //取消操作
    });

})

//监听提交保存
$("#buttonSavetixianYG").click(function(){
    $.confirm("您确定要提现吗?", "确认提现?", function() {
        saveNRtixianYG();
    }, function() {
        //取消操作
    });

})



//取消关注
function quxiaoguanzhu(){
    //取消关注
    $.confirm("您确定取消关注吗?", "确认取消关注?", function() {
        saveNRquxiaoguanzhu();
    }, function() {
        //取消操作
    });
}



function guanzhu() {
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        initNRguanzhu();
        return false;

    }
    //以下参数需要提前赋值

    var userId = $("#guanzhuId").val();
    var token = localStorage.getItem('token');
    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "popenId":userId,
        "token":token
    }


    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/guanzhu',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
            //更新为取消关注
                //$.toast("关注成功", 'success');
                $.toast.prototype.defaults.duration=1000;//1秒
                $.toast('关注成功','text');
                $("#gz").html("已关注");
                $("#gz").attr("onclick","saveNRquxiaoguanzhu()");
                $("#bgguanzhu").attr("onclick","saveNRquxiaoguanzhu()");
                $("#bgguanzhu").attr('style','background-color:#ccc !important;border:1px solid #ccc !important;');
                initNRguanzhu();
            }else{
                initNRguanzhu();
                $("#bgguanzhu").attr('style','background-color:#ef4f4f !important;border:1px solid #ef4f4f !important;');
            }


        }else{
            initNRguanzhu();
            console.log('请求异常！')
        }

    });


}


//防重复提交保存
function saveNRguanzhu(){
    var guanzhuFlag = $("#guanzhuFlag").val();
    if(guanzhuFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
        if($("#guanzhuFlag").size() == 0){
            $("body").append("<input type='hidden' id='guanzhuFlag' value='1' >");

        }
        guanzhu();
    }
}

//初始化重复提交判断
function initNRguanzhu(){
    $("#guanzhuFlag").val('0');
}


function quxiaoguanzhu() {
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        isLogin('','');
        initNRquxiaoguanzhu();
        return false;

    }
    //以下参数需要提前赋值

    var cardType = '20';
    var popenId = $("#guanzhuId").val();
    var token = localStorage.getItem('token');
    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "cardType":cardType,
        "token":token,
        "popenId":popenId
    }

    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/deleteById',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //更新为关注
                //$.toast("取消关注成功", 'success');
                $.toast.prototype.defaults.duration=1000;//1秒
                $.toast('取消关注成功','text');
                $("#gz").html("关注");
                $("#gz").attr("onclick","saveNRguanzhu()");
                $("#bgguanzhu").attr("onclick","saveNRguanzhu()");
                initNRquxiaoguanzhu();
            }else{
                initNRquxiaoguanzhu();
            }


        }else{
            initNRquxiaoguanzhu();
            console.log('请求异常！')
        }

    });


}


//防重复提交保存
function saveNRquxiaoguanzhu(){

    var quxiaoguanzhuFlag = $("#quxiaoguanzhuFlag").val();
    if(quxiaoguanzhuFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
        if($("#quxiaoguanzhuFlag").size() == 0){
            $("body").append("<input type='hidden' id='quxiaoguanzhuFlag' value='1' >");

        }
        quxiaoguanzhu();
    }
}

//初始化重复提交判断
function initNRquxiaoguanzhu(){
    $("#quxiaoguanzhuFlag").val('0');
}


//是否已经关注

function isguanzhu() {
    // 在提交请求之前判断是否登录
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        //isLogin('','');

        return false;

    }
    //以下参数需要提前赋值

    var popenId = $("#guanzhuId").val();
    var token = localStorage.getItem('token');
    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "popenId":popenId,
        "token":token
    };


    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/isguanzhu',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.result.isFollow == '1'){
                //$.toast("关注成功", 'SUCCESS');
                $("#tips").hide();
                $("#gz").html("已关注");
                $("#gz").attr("onclick","saveNRquxiaoguanzhu()");
                $("#bgguanzhu").attr("onclick","saveNRquxiaoguanzhu()");
                $("#bgguanzhu").attr('style','background-color:#ccc !important;border:1px solid #ccc !important;');
            }else{
                $("#tips").show();
                $("#gz").html("关注");
                $("#gz").attr("onclick","saveNRguanzhu()");
                $("#bgguanzhu").attr("onclick","saveNRguanzhu()");
                $("#bgguanzhu").attr('style','background-color:#ef4f4f !important;border:1px solid #ef4f4f !important;');
            }
        }else{
            console.log('请求异常！')
        }
    });

}

function guanzhunum() {

    //以下参数需要提前赋值

    var id = GetUrlString('id');

    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "remarks":id
    }


    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sfl/guanzhu/guanZhu/detailguanzhu',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                //$.toast("关注成功", 'SUCCESS');
                $("#guanzhunum").html("关注("+rs.data.result.remarks+")");//remarks
                $("#fansnum").html("粉丝("+rs.data.result.guanzhuUser+")");//guanzhuUser
            }

        }else{

            console.log('请求异常！')
        }

    });

}



function guanzhuList(manyType) {

    //分页
    var pageNoTemp = $("#listxiaoXi"+manyType+"PageNo").val();
    if(pageNoTemp > 0){
        $("#listxiaoXi"+manyType+"PageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listxiaoXi"+manyType+"PageNo' value='1' >");
    }
    var id = GetUrlString('id');
    var pageNo = $("#listxiaoXi"+manyType+"PageNo").val();
    var url = '/sfl/guanzhu/guanZhu/guanZhulist';
    if(manyType == '2'){
        url = '/sfl/guanzhu/guanZhu/fansList';
    }
    //传输数据
    var datauser = {
        "remarks":id,
        "pageSize":20,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo
    }


    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                if(rs.data.result != null && rs.data.result != ''   && rs.data.result != '[]'){
                    listGuanzhuRender(rs.data,manyType);
                }else{
                    $.toast.prototype.defaults.duration=1000;$.toast("没有数据了！",'text');
                }

            }
        }else{

            console.log('请求异常！')
        }

    });

}


function listGuanzhuRender(data,manyType) {
    var detailhongBaoStr = '';
    //渲染数据
    $.each(data.result, function (i, item) {

        if(i ==0){
            if(manyType == '2'){
                $("#renshu").html("粉丝(共"+item.remarks+"人)");
            }else{
                $("#renshu").html("关注(共"+item.remarks+"人)");
            }

        }

        detailhongBaoStr += '<a class="weui-cell weui-cell_access myweui-cell" onclick=toUserHome("'+item.createBy.id+'","1"); >';
        detailhongBaoStr += '<div class="weui-cell__hd shadowonly" style="border-radius:10px;background-image:url('+ checkPathBackGroubdImage(item.createBy.headimgurl,'1')+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;width: 45px;height:45px;">';
        detailhongBaoStr += '</div>';
        detailhongBaoStr += '<div class="weui-cell__bd">';
        detailhongBaoStr += '<div class="weui-news-text">';
        detailhongBaoStr += '<div class="weui-news-title onerow">'+item.createBy.nickname+'</div>';
        detailhongBaoStr += '</div>';
        detailhongBaoStr += '<div class="weui-news-info mynesinfo">';
        detailhongBaoStr += '<div class="weui-news-infoitem">';
        if(item.createBy.sex == '1'){
            detailhongBaoStr += ' <i class="icon icon-58 f-blue f12">男</i>';
        }else if(item.createBy.sex == '2'){
            detailhongBaoStr += '<i class="icon icon-57 f-red f12">女</i>';
        }


        detailhongBaoStr += '</div>';
        detailhongBaoStr += '<div class="weui-news-infoitem f-red">';
        detailhongBaoStr += '</div>';

        detailhongBaoStr += '</div>';

        detailhongBaoStr += '</div>';
        detailhongBaoStr += '</a>';

    });
    $("#huanzhulist").append(detailhongBaoStr);

}



function userList(renderId,manyType) {

    //分页
    var pageNoTemp = $("#listxiaoXi"+manyType+"PageNo").val();
    if(pageNoTemp > 0){
        $("#listxiaoXi"+manyType+"PageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listxiaoXi"+manyType+"PageNo' value='1' >");
    }
    var url = '/sfl/qun/qun/list';
    var pageNo = $("#listxiaoXi"+manyType+"PageNo").val();
    var qunName = $("#searchInput").val();
    if(manyType == '2'){
        url =  '/sfl/qun/qun/haoyoulist';
        qunName = $("#searchInputB").val();
    }


    var token = localStorage.getItem('token');
    //传输数据
    var datauser = {
        "qunName":qunName,
        "pageSize":30,
        "pageNo":pageNo,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }


    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            //console.log('rs.data.code'+rs.data.code);
            if(rs.data.code == '0'){

                if(rs.data.result != null && rs.data.result != ''  && rs.data.result != '[]'){
                    listGuanzhuUserRender(rs.data,renderId,manyType);
                }else{
                    $.toast.prototype.defaults.duration=1000;$.toast("没有数据了！",'text');
                }


            }
        }else{

            console.log('请求异常！')
        }

    });

}
function userListNum(renderId,manyType) {

    //分页
    var pageNoTemp = $("#listxiaoXi"+manyType+"NumPageNo").val();
    if(pageNoTemp > 0){
        $("#listxiaoXi"+manyType+"NumPageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listxiaoXi"+manyType+"NumPageNo' value='1' >");
    }
    var url = '/sfl/qun/qun/list';
    var pageNo = $("#listxiaoXi"+manyType+"NumPageNo").val();
    var qunName = $("#searchInput").val();
    if(manyType == '2'){
        url =  '/sfl/qun/qun/haoyoulist';
        qunName = $("#searchInputB").val();
    }


    var token = localStorage.getItem('token');
    //传输数据
    var datauser = {
        "qunName":qunName,
        "pageSize":100,
        "pageNo":pageNo,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "token":token
    }


    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            //console.log('rs.data.code'+rs.data.code);
            if(rs.data.code == '0'){
                listGuanzhuUserRenderNum(rs.data,renderId,manyType);
            }
        }else{

            console.log('请求异常！')
        }

    });

}

function listGuanzhuUserRender(data,renderId,manyType) {
    var detailhongBaoStr = '';
    //渲染数据
    //var nowUserId =
    $.each(data.result, function (i, item) {



        if(manyType == '2'){

            detailhongBaoStr += '<a onclick=$(".weui-gallery").hide();toShifenliaoDetail("'+item.id+'","1"); class="weui-media-box weui-media-box_appmsg padding10">';
            detailhongBaoStr += '<div class="weui-media-box__hd myboxhd">';

            /*if(item.aboutId == localStorage.getItem("kefuzhaoshang") && item.qunType == '1'){


            }*/

            if(item.qunType == '1'){
                detailhongBaoStr += '<img  class=" weui-media-box__thumb shadowonly" src="'+checkPath(item.qunImage)+'" alt="">';

                if(item.zhaoshang == localStorage.getItem("kefuzhaoshang")){

                    $("#zhaoshang").attr("onclick","toShifenliaoDetail(\""+item.id+"\",\"1\")");

                }

            }else{
                detailhongBaoStr += '<div class="">';
                detailhongBaoStr += '<div class="page-bd " >';
                detailhongBaoStr += '<div class="weui-feeds" style="border-radius: 10px;">';
                detailhongBaoStr += '<ul>';
                detailhongBaoStr += ''+getImageChatContent(item.id,item.qunImage)+'';
                detailhongBaoStr += '</ul>';
                detailhongBaoStr += '</div>';
                detailhongBaoStr += '</div>';

                detailhongBaoStr += '</div>';
                detailhongBaoStr += '<span class="weui-badge  f12" style="background-color:#FF6666;position: absolute;top: -.4em;right: -.4em;">群</span>';
            }

            detailhongBaoStr += '</div>';
            detailhongBaoStr += '<div class="weui-media-box__bd">';
            detailhongBaoStr += '<h4 class="weui-media-box__title ftop4">';
            detailhongBaoStr += ''+setNULL(item.qunName)+'';
            detailhongBaoStr += '</h4>';
            detailhongBaoStr += '</div>';
            detailhongBaoStr += '</a>';

        }else{

            detailhongBaoStr += '<a onclick=$(".weui-gallery").hide();xiaoshi(\'point'+item.id+'\');toShifenliaoDetail("'+item.id+'","1"); class="weui-media-box weui-media-box_appmsg padding10">';
            detailhongBaoStr += '<div class="weui-media-box__hd myboxhd">';
            if(item.qunType == '1'){
                detailhongBaoStr += '<img  class=" weui-media-box__thumb shadowonly" src="'+checkPath(item.qunImage)+'" alt="">';

                if(item.zhaoshang == localStorage.getItem("kefuzhaoshang")){

                    $("#zhaoshang").attr("onclick","toShifenliaoDetail(\""+item.id+"\",\"1\")");

                }
            }else{
                detailhongBaoStr += '<div class="">';
                detailhongBaoStr += '<div class="page-bd " >';
                detailhongBaoStr += '<div class="weui-feeds" style="border-radius: 10px;">';
                detailhongBaoStr += '<ul>';
                detailhongBaoStr += ''+getImageChatContent(item.id,item.qunImage)+'';
                detailhongBaoStr += '</ul>';
                detailhongBaoStr += '</div>';
                detailhongBaoStr += '</div>';

                detailhongBaoStr += '</div>';
            }

            if(item.remarks != null && item.remarks != ''){
                detailhongBaoStr += '<span class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;" id="point'+item.id+'" >'+setNULL(item.remarks)+'</span>';
            }

            detailhongBaoStr += '</div>';
            detailhongBaoStr += '<div class="weui-media-box__bd">';
            detailhongBaoStr += '<h4 class="weui-media-box__title ftop4">';
            detailhongBaoStr += ''+setNULL(item.qunName)+'';
            detailhongBaoStr += '<span class="weui-media-box__title-after">'+timeago(item.updateDate)+'</span>';
            detailhongBaoStr += '</h4>';
            detailhongBaoStr += '<p class="weui-media-box__desc onerow">'+filterHTMLTag(setNULL(item.qunInfo))+'</p>';
            detailhongBaoStr += '</div>';
            detailhongBaoStr += '</a>';
        }



    });

    $("#"+renderId+"").append(detailhongBaoStr);

}

function xiaoshi(id) {
    if($("#"+id+"").size() > 0){
        if(localStorage.getItem("xiaoxinum") != null && localStorage.getItem("xiaoxinum") != ''){
            localStorage.setItem("xiaoxinum",eval(localStorage.getItem("xiaoxinum"))-eval($("#"+id+"").html()));
        }

        if(eval(localStorage.getItem("xiaoxinum")) < 0){
            localStorage.setItem("xiaoxinum",0);
        }

    }



    $("#"+id+"").remove();

}

function listGuanzhuUserRenderNum(data,renderId,manyType) {

    console.log('data.sumCount'+data.sumCount);
    if(data.sumCount != null && eval(data.sumCount) > 0){
        $("#pynum1").html(data.sumCount);
        localStorage.setItem("xiaoxinum",data.sumCount);
        $("#pynum2").html(data.sumCount);
        $("#pynum1").show();
        $("#pynum2").show();
    }else{
        localStorage.setItem("xiaoxinum",0);
    }

}


function userHaoyouList(renderId,manyType) {

    //分页
    var pageNoTemp = $("#listxiaoXi"+manyType+"PageNo").val();
    if(pageNoTemp > 0){
        $("#listxiaoXi"+manyType+"PageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listxiaoXi"+manyType+"PageNo' value='1' >");
    }
    var url = '/sfl/qun/qun/list';
    var pageNo = $("#listxiaoXi"+manyType+"PageNo").val();
    var qunName = $("#searchInput").val();
    if(manyType == '2'){
        url =  '/sfl/qun/qun/haoyoulist';
        qunName = $("#searchInputB").val();
    }


    var token = localStorage.getItem('token');
    //传输数据
    var datauser = {
        "qunName":qunName,
        "pageSize":30,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":pageNo,
        "token":token
    }


    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            //console.log('rs.data.code'+rs.data.code);
            if(rs.data.code == '0'){
                listGuanzhuUserHaoyouRender(rs.data,renderId,manyType);
            }
        }else{

            console.log('请求异常！')
        }

    });

}


function listGuanzhuUserHaoyouRender(data,renderId,manyType) {
    var detailhongBaoStr = '';
    //渲染数据
    //var nowUserId =
    $.each(data.result, function (i, item) {



        if(manyType == '2'){

            detailhongBaoStr += '<a onclick=$(".weui-gallery").hide();toshareHaoyou("'+item.id+'"); class="weui-media-box weui-media-box_appmsg padding10">';
            detailhongBaoStr += '<div class="weui-media-box__hd myboxhd">';


            if(item.qunType == '1'){
                detailhongBaoStr += '<img class=" weui-media-box__thumb shadowonly" src="'+checkPath(item.qunImage)+'" alt="">';
            }else{
                detailhongBaoStr += '<div class="">';
                detailhongBaoStr += '<div class="page-bd " >';
                detailhongBaoStr += '<div class="weui-feeds" style="border-radius: 10px;">';
                detailhongBaoStr += '<ul>';
                detailhongBaoStr += ''+getImageChatContent(item.id,item.qunImage)+'';
                detailhongBaoStr += '</ul>';
                detailhongBaoStr += '</div>';
                detailhongBaoStr += '</div>';

                detailhongBaoStr += '</div>';
                detailhongBaoStr += '<span class="weui-badge  f12" style="background-color:#FF6666;position: absolute;top: -.4em;right: -.4em;">群</span>';
            }

            detailhongBaoStr += '</div>';
            detailhongBaoStr += '<div class="weui-media-box__bd">';
            detailhongBaoStr += '<h4 class="weui-media-box__title ftop4">';
            detailhongBaoStr += ''+setNULL(item.qunName)+'';
            detailhongBaoStr += '</h4>';
            detailhongBaoStr += '</div>';
            detailhongBaoStr += '</a>';

        }else{

            detailhongBaoStr += '<a onclick=$(".weui-gallery").hide();toshareHaoyou("'+item.id+'"); class="weui-media-box weui-media-box_appmsg padding10">';
            detailhongBaoStr += '<div class="weui-media-box__hd myboxhd">';
            if(item.qunType == '1'){
                detailhongBaoStr += '<img class=" weui-media-box__thumb shadowonly" src="'+checkPath(item.qunImage)+'" alt="">';
            }else{
                detailhongBaoStr += '<div class="">';
                detailhongBaoStr += '<div class="page-bd " >';
                detailhongBaoStr += '<div class="weui-feeds" style="border-radius: 10px;">';
                detailhongBaoStr += '<ul>';
                detailhongBaoStr += ''+getImageChatContent(item.id,item.qunImage)+'';
                detailhongBaoStr += '</ul>';
                detailhongBaoStr += '</div>';
                detailhongBaoStr += '</div>';

                detailhongBaoStr += '</div>';
            }

            if(item.remarks != null && item.remarks != ''){
                detailhongBaoStr += '<span class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;">'+setNULL(item.remarks)+'</span>';
            }

            detailhongBaoStr += '</div>';
            detailhongBaoStr += '<div class="weui-media-box__bd">';
            detailhongBaoStr += '<h4 class="weui-media-box__title ftop4">';
            detailhongBaoStr += ''+setNULL(item.qunName)+'';
            detailhongBaoStr += '<span class="weui-media-box__title-after">'+timeago(item.updateDate)+'</span>';
            detailhongBaoStr += '</h4>';
            detailhongBaoStr += '<p class="weui-media-box__desc onerow">'+filterHTMLTag(setNULL(item.qunInfo))+'</p>';
            detailhongBaoStr += '</div>';
            detailhongBaoStr += '</a>';
        }



    });

    $("#"+renderId+"").append(detailhongBaoStr);

}




function qunchengyuanList(manyType) {

    //分页
    var pageNoTemp = $("#listxiaoXi"+manyType+"PageNo").val();
    if(pageNoTemp > 0){
        $("#listxiaoXi"+manyType+"PageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listxiaoXi"+manyType+"PageNo' value='1' >");
    }
    var id = GetUrlString('id');
    var pageNo = $("#listxiaoXi"+manyType+"PageNo").val();
    var url = '/sfl/member/member/memberlist';

    //传输数据
    var datauser = {
        "qunId":id,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageSize":20,
        "pageNo":pageNo
    }


    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                listqunchengyuanRender(rs.data,manyType);
            }
        }else{

            console.log('请求异常！')
        }

    });

}


function listqunchengyuanRender(data,manyType) {
    var detailhongBaoStr = '';
    //渲染数据
    $.each(data.result, function (i, item) {

        if(i ==0){
            $("#renshu").html("群成员(共"+item.remarks+"人)");

        }

        detailhongBaoStr += '<a class="weui-cell weui-cell_access myweui-cell" onclick=toUserHome("'+item.createBy.id+'","1"); >';
        detailhongBaoStr += '<div class="weui-cell__hd shadowonly" style="border-radius:10px;background-image:url('+ checkPathBackGroubdImage(item.createBy.headimgurl,'1')+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;width: 45px;height:45px;">';
        detailhongBaoStr += '</div>';
        detailhongBaoStr += '<div class="weui-cell__bd">';
        detailhongBaoStr += '<div class="weui-news-text">';
        detailhongBaoStr += '<div class="weui-news-title onerow">'+item.createBy.nickname+'</div>';
        detailhongBaoStr += '</div>';
        detailhongBaoStr += '<div class="weui-news-info mynesinfo">';
        detailhongBaoStr += '<div class="weui-news-infoitem">';
        if(item.createBy.sex == '1'){
            detailhongBaoStr += ' <i class="icon icon-58 f-blue f12">男</i>';
        }else if(item.createBy.sex == '2'){
            detailhongBaoStr += '<i class="icon icon-57 f-red f12">女</i>';
        }


        detailhongBaoStr += '</div>';
        detailhongBaoStr += '<div class="weui-news-infoitem f-red">';
        detailhongBaoStr += '</div>';

        detailhongBaoStr += '</div>';

        detailhongBaoStr += '</div>';
        detailhongBaoStr += '</a>';

    });
    $("#huanzhulist").append(detailhongBaoStr);

}



//修改用户资料--昵称--一句话简介-手机号-支付密码
function toHuiyuanByType(){
    //参数
    var huiyuan_type = GetUrlString('huiyuanType');

    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "userType":huiyuan_type
    }

    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/huiyuanType',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //console.log(rs);
        if(rs.status=200){
            if(rs.data.code == '0'){
                location.href='howmakemoney.html?id='+rs.data.result+"&s="+getSaasId();
            }
        }
    });
}
function toHuiyuanByTypeNew(huiyuan_type){
    //参数

    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "userType":huiyuan_type
    }

    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/huiyuanType',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //console.log(rs);
        if(rs.status=200){
            if(rs.data.code == '0'){
                if(localStorage.getItem("isdisdisanfangpay") == '1'){
                    location.href='howmakemoneyone.html?id='+rs.data.result+"&s="+getSaasId();
                }else{
                    location.href='howmakemoney.html?id='+rs.data.result+"&s="+getSaasId();
                }

            }
        }
    });
}

//获取详情数据
function getImeiAndMeid(){
    window.scrollTo(0,0);
    var imei1 = $("#imei1").val();
    var imei2 = $("#imei2").val();
    var meid = $("#meid").val();
    var num = $("#num").val();


    if(imei1 == null || imei1 == ''){
        $.toast('请输入原始IMEI1',"text");
        return false;
    }else{
        localStorage.setItem("imei1",imei1);
    }
    if(imei2 == null || imei2 == ''){
        $.toast('请输入原始IMEI2',"text");
        return false;
    }else{
        localStorage.setItem("imei2",imei2);
    }
    if(meid == null || meid == ''){
        $.toast('请输入原始MEID',"text");
        return false;
    }else{
        localStorage.setItem("meid",meid);
    }
    if(num == null || num == ''){
        $.toast('请输入增加数字',"text");
        return false;
    }else{

    }


    //传输数据
    var datauser = {
        "imei1":imei1,
        "imei2":imei2,
        "meid":meid,
        "num":num
    }

    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/getimei',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                var num2 = eval(num) +2;
                $("#num").val(num2);
                localStorage.setItem("num",num2);
                $("#disimage").show();
                $("#nimei1").html(rs.data.result.imei1);
                $("#nimei2").html(rs.data.result.imei2);
                $("#nmeid").html(rs.data.result.meid);
                localStorage.setItem("nimei1",rs.data.result.imei1);
                localStorage.setItem("nimei2",rs.data.result.imei2);
                localStorage.setItem("nmeid",rs.data.result.meid);



            }else{
                $.toast(rs.data.result.remarks,"text");
            }



        }else{
            console.log('请求异常！')
        }

    });

}



//获取详情数据
function getImeiAndMeidPl(){
    window.scrollTo(0,0);
    var imei1 = $("#imei1").val();
    var imei2 = $("#imei2").val();
    var meid = $("#meid").val();
    var num = $("#num").val();


    if(imei1 == null || imei1 == ''){
        $.toast('请输入原始IMEI1',"text");
        return false;
    }else{
        localStorage.setItem("imei1",imei1);
    }

    if(imei2 == null || imei2 == ''){
        $.toast('请输入原始IMEI2',"text");
        return false;
    }else{
        localStorage.setItem("imei2",imei2);
    }

    if(meid == null || meid == ''){
        $.toast('请输入原始MEID',"text");
        return false;
    }else{
        localStorage.setItem("meid",meid);
    }

    if(num == null || num == ''){
        $.toast('请输入增加数字',"text");
        return false;
    }else{

    }


    //传输数据
    var datauser = {
        "imei1":imei1,
        "imei2":imei2,
        "meid":meid,
        "num":num
    }

    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/getimeipl',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                var num2 = eval(num) +1000;
                $("#num").val(num2);
                localStorage.setItem("num",num2);
                /* $("#nimei1").html(rs.data.result.imei1);
                 $("#nimei2").html(rs.data.result.imei2);
                 $("#nmeid").html(rs.data.result.meid);
                 localStorage.setItem("nimei1",rs.data.result.imei1);
                 localStorage.setItem("nimei2",rs.data.result.imei2);
                 localStorage.setItem("nmeid",rs.data.result.meid);*/
                if(navigator.userAgent.indexOf("Html5Plus") > -1) {
                   // saveFile(rs.data.result);
                    $("#xiazai").html("<a  onclick=openRemoteUrl(\'"+checkPathHost(rs.data.result)+"\')>点我下载已生成的Excel(下载链接："+checkPathHost(rs.data.result,'')+")</a>");
                    $.toast.prototype.defaults.duration=1000;$.toast('生成成功，请点击下载!',"text");
                    //$("#xiazai").html("<a href='"+rs.data.result+"'>"+rs.data.result+"</a>");
                    $("#disimage").show();
                }else if(getBrowser() == 'wxmobile'){
                    $("#xiazai").html("<a href='"+rs.data.result+"'>"+rs.data.result+"</a>");
                    $.toast.prototype.defaults.duration=1000;$.toast('生成成功，请复制链接在浏览器中打开下载!',"text");
                }else{
                    $("#xiazai").html("<a href='"+rs.data.result+"'>点我下载已生成的Excel</a>");
                    $.toast.prototype.defaults.duration=1000;$.toast('生成成功，请点击下载!',"text");
                }

            }else{
                $.toast(rs.data.result.remarks,"text");
            }



        }else{
            console.log('请求异常！')
        }

    });

}

