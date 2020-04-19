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
        isLogin('','');
        sourceuser.cancel();
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
    }

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
        }else{
            console.log('请求异常！')
        }

    });

}

//详情渲染--profile页面
function detailuserRender(data){

    if(data.code == '0'){
        if(localStorage.getItem("token") != null && localStorage.getItem("token") != '' ){
            if(data.result.id == null || data.result.id == ''){
                var s = GetUrlString("s");
                localStorage.clear();
                localStorage.setItem("s",s);
                toindex();
            }
        }

        localStorage.setItem('userLevel',data.result.userBrand);
        localStorage.setItem('daili',data.result.daili);
        localStorage.setItem('bili',data.result.bili);
        localStorage.setItem('userTeacher',data.result.userTeacher);
        localStorage.setItem('openId',data.result.openId);
        localStorage.setItem('videotimes',data.result.videotimes);

        localStorage.setItem('shenheyuan',data.result.shenheyuan);
        if(data.result.shenheyuan == '1'){
            $("#shenheyuan").show();

        }



        if(localStorage.getItem('openId') != null && localStorage.getItem('openId') != ''  && localStorage.getItem('openId') != 'undefined' ){
            $("#bdwx").html("关注我们");
        }
        //参数
        $("#nickName").prepend(data.result.nickname);
        $("#nickNameNew").html(data.result.nickname);

        if(data.result.isV == '1'){
            $("#isV").html("未认证");
        }else if(data.result.isV == '2'){
            $("#isV").html("审核中");
        }else if(data.result.isV == '3'){
            $("#isV").html("已认证");
        }else if(data.result.isV == '4'){
            $("#isV").html("审核未通过");
        }


        if(data.result.hongbao != null ){//补贴金额
            $("#butie").html(data.result.hongbao);
        }
        if(data.result.money != null ){//余额
            $("#tixianjine").html(data.result.money);
            localStorage.setItem('jinbi',data.result.money);
        }else{
            localStorage.setItem('jinbi',0);
        }



        if(data.result.headimgurl != null){
            $("#headimgurl").attr("src",checkPath(data.result.headimgurl,"1"));
        }

        if(data.result.userLevel == '普通会员'){
            $("#userLevel").html("普通会员");
            localStorage.setItem('vip','no');


            $("#userLevelName").html('普通会员');
            $("#userLevelName").attr("onclick","toUserLevelDetail("+eval(data.result.userBrand)+1+")");

            $("#levelInfo").html('分销躺赚-信息发布-人脉拓展-高佣福利');


        }else{


            $("#isV").css("display","");
            $("#userLevelName").attr("class","weui-flex__item f-yellow");
            $("#userLevelName").html(data.result.userLevel);
            if(data.result.likeNo > 0){
                $("#userLevelName").append('<span style="font-size: x-small;color:white;">剩余'+data.result.likeNo+'天</span>');
                $("#shengyu").html('<span style="font-size: x-small;color:#777777;">会员剩余'+data.result.likeNo+'天</span>');
                $("#shengyu").attr("onclick","toUserLevelDetail("+eval(eval(data.result.userBrand)+1)+")");

            }

            $("#userLevelName").attr("onclick","toUserLevelDetail("+eval(data.result.userBrand)+")");

            $("#jibie").attr("onclick","toUserLevelDetail("+eval(eval(data.result.userBrand)+1)+")");

            if(data.result.userBrand == '1'){
                $("#levelInfo").html('分销躺赚-信息发布-人脉拓展-高佣补贴');
                $("#jibie").attr("onclick","toUserLevelDetail("+eval(eval(data.result.userBrand)+1)+")");
            }else if(data.result.userBrand == '2'){
                $("#levelInfo").html('放单推广-产品发布-人脉拓展-高佣补贴');
                $("#jibie").attr("onclick","toUserLevelDetail("+eval(eval(data.result.userBrand)+1)+")");
            }else if(data.result.userBrand == '3'){
                $("#levelInfo").html('定价权-团队管理-躺赚模式-20%抽成');
                $("#jibie").attr("onclick","toUserLevelDetail("+eval(eval(data.result.userBrand)+1)+")");
            }else if(data.result.userBrand == '4'){
                $("#levelInfo").html('30%抽成-入职培训-顶级会员-躺赚模式');
                $("#jibie").attr("onclick","toUserLevelDetail("+eval(eval(data.result.userBrand)+1)+")");
            }else if(data.result.userBrand == '5'){
                $("#levelInfo").html('极速贴牌-产品发布-自带内容-省时省事');
                $("#jibie").attr("onclick","toUserLevelDetail("+eval(eval(data.result.userBrand)+1)+")");
            }else{
                $("#jibie").attr("onclick","toUserLevelDetail("+eval(data.result.userBrand)+")");
                $("#levelInfo").html('独立部署-独立APP-独立域名-独立服务器');
            }


            $("#userLevel").attr("class","label f-red b-red");
            $("#userLevel").attr("onclick","toUserLevelDetail("+eval(eval(data.result.userBrand)+1)+")");


            $("#isAuth").attr("onclick","toUserProfile('3')");
            $("#companyAuth").attr("onclick","toUserProfile('4')");
           // $("#isV").attr("onclick","toUserProfile('5')");

            $("#userLevel").html(data.result.userLevel);
            if(data.result.userLevel != null){
                localStorage.setItem('vip','vip');
            }




        }

        if(data.result.isAuth == '1'){
            $("#isAuth").html("未认证");
        }else if(data.result.isAuth == '2'){
            $("#isAuth").html("审核中");
        }else if(data.result.isAuth == '3'){
            $("#isAuth").html("实名认证");
            $("#isAuth").attr("class","label f-red b-red");
        }else if(data.result.isAuth == '4'){
            $("#isAuth").html("审核未通过");
        }


        if(data.result.bdType != null && data.result.bdType != ''){
            $("#bdTypeName").html(data.result.bdType+"-"+data.result.bdHangye);
        }else{
            $("#bdTypeName").html("请选择");
        }

        if(data.result.companyAuth == '1'){
            $("#companyAuth").html("未认证");
        }else if(data.result.companyAuth == '2'){
            $("#companyAuth").html("审核中");
        }else if(data.result.companyAuth == '3'){
            $("#companyAuth").html("企业认证");
            $("#companyAuth").attr("class","label f-red b-red");
        }else if(data.result.companyAuth == '4'){
            $("#companyAuth").html("审核未通过");
        }

        if(data.result.answerV == '1'){
            $("#answerV").html("未认证");
        }else if(data.result.answerV == '2'){
            $("#answerV").html("审核中");
        }else if(data.result.answerV == '3'){
            $("#answerV").html("已认证");
        }else if(data.result.answerV == '4'){
            $("#answerV").html("审核未通过");
        }

        if(data.result.userInfo != null){
            $("#userInfo").html(data.result.userInfo);
        }

        if(data.result.mobile  != null){
            $("#mobile").html(data.result.mobile);
        }

        if(data.result.userTeacher  == '1'){
            if($("#orderMoney").size() > 0){
                $("#tixiandis").hide();
                $.toast("内部员工，暂不允许提现！", "text");
                location.href='qianbao.html';

            }else{
                $("#tixiandis").hide();
            }

        }else{
            console.log("==========1")
            $("#tixiandis").show();
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
        if(data.result.userTeacher == '1'){
            $("#shouru0").hide();
            $("#shouru1").hide();
            $("#shouru2").hide();
            $("#shouru3").hide();
            $("#shouru4").show();

        }

        $("#remarks").html(data.result.remarks);
        $("#leijishouru").html(data.result.zhuanhuaNum);
        $("#a1").html(data.result.a1);
        $("#a2").html(data.result.a2);
        $("#a3").html(data.result.a3);
        $("#a4").html(data.result.a4);
        $("#a5").html(data.result.a5);
        $("#b1").html(data.result.b1);

        $("#a21").html(data.result.a2);
        $("#a31").html(data.result.a3);
        $("#a51").html(data.result.a5);
        $("#b11").html(data.result.b1);


        $("#c1").html(""+data.result.c1+"单");
        $("#c2").html(data.result.c2+"人");
        $("#c3").html(data.result.c3+"人");

    }else{
        //$.toast(data.msg, "text");
    }
}


//获取详情数据
function detailuserShouru2(){

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
        url: '/sys/user/userteammoneynew',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            detailuserShouruRender2(rs.data);
        }else{
            console.log('请求异常！')
        }

    });

}

//详情渲染
function detailuserShouruRender2(data){
    if(data.code == '0'){

        //参数
        if(data.result.userTeacher == '1'){
            $("#shouru1").hide();
        }

        $("#a1").html(data.result.a1);
        $("#a2").html(data.result.a2);
        $("#a3").html(data.result.a3);

        $("#b1").html(data.result.b1);
        $("#b2").html(data.result.b2);
        $("#b3").html(data.result.b3);

        $("#c1").html(data.result.c1);
        $("#c2").html(data.result.c2);
        $("#c3").html(data.result.c3);

        $("#d1").html(data.result.d1);
        $("#d2").html(data.result.d2);
        $("#d3").html(data.result.d3);

        $("#e1").html(data.result.e1);
        $("#e2").html(data.result.e2);
        $("#e3").html(data.result.e3);

    }else{
        //$.toast(data.msg, "text");
    }
}



//获取详情数据
function detailuserShouru3(){

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
        url: '/sys/user/userteammoneynewpro',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            detailuserShouruRender3(rs.data);
        }else{
            console.log('请求异常！')
        }

    });

}

//详情渲染
function detailuserShouruRender3(data){
    if(data.code == '0'){

        //参数
        if(data.result.userTeacher == '1'){
            $("#shouru1").hide();
        }

        $("#a1").html(data.result.a1);
        $("#a2").html(data.result.a2);
        $("#a3").html(data.result.a3);

        $("#b1").html(data.result.b1);
        $("#b2").html(data.result.b2);
        $("#b3").html(data.result.b3);

        $("#tixianjine").html(data.result.c1);

        if(eval(eval(data.result.c1)-eval(data.result.a1)) >= 500.0){

            $("#kucun").html("<span style='color: #0bb20c'>库存充足</span>");
        }else if(eval(eval(data.result.c1)-eval(data.result.a1)) >= 50.0){
            $("#kucun").html("<span style='color: #607D8B'>即将耗尽</span>");

        }else{
            $("#kucun").html("<span style='color: red'>库存不足</span>");
        }



    }else{
        //$.toast(data.msg, "text");
    }
}


//监听获取详情
$("#buttonDetailuser").click(function(){
    detailuser();
});


$(function () {
    //判断获取详情信息
    if($("#buttonDetailuser").size()>0){
        detailuser();
    }
});



//修改用户资料--昵称--一句话简介-手机号-支付密码
function saveUserInfo(){
    //参数
    var nickname = $("#nickName").val();
    var bili = $("#bili").val();
    var userInfo = $("#userInfo").val();
    var loginName = $("#mobile").val();
    var smsCode = $("#smscode").val();
    var oldPayPassword = $("#oldPayPassword").val();
    var newPayPassword = $("#newPayPassword").val();
    //传输数据
    var datauser = {
        "oldPayPassword":oldPayPassword,
        "newPayPassword":newPayPassword,
        "nickname":nickname,
        "loginName":loginName,
        "smsCode":smsCode,
        "bili":bili,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "userInfo":userInfo
    }

    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/edit',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //console.log(rs);
        if(rs.status=200){
            if(rs.data.code == '0'){
                if(bili != null && bili != ''){
                    localStorage.setItem("bili",bili)
                }
                if(newPayPassword != null && newPayPassword != ''){
                    //$.toast(rs.data.msg, 'success');
                    $.toast.prototype.defaults.duration=1000;//1秒
                    $.toast(rs.data.msg,'text');
                    //location.href='qianbao.html';
                    setTimeout(function() {
                        toindex();
                    }, 1000);

                }else{
                    //toindex();
                    $.toast.prototype.defaults.duration=1000;//1秒
                    $.toast(rs.data.msg,'text');
                    setTimeout(function() {
                        toindex();
                    }, 1000);
                }

            }else{
                $.toast(rs.data.msg, "text");
                initNRUserInfo();
            }
        }else{
            console.log('请求异常！');
            initNRUserInfo();
        }
    });
}


//修改用户资料--昵称--一句话简介-手机号-支付密码
function saveUserInfoLogin(){
    //参数
    var nickname = $("#nickName").val();
    var userInfo = $("#userInfo").val();
    var loginName = $("#loginmobile").val();
    var smsCode = $("#smscode").val();
    var oldPayPassword = $("#oldPayPassword").val();
    var newPayPassword = $("#newPayPassword").val();
    //传输数据
    var datauser = {
        "oldPayPassword":oldPayPassword,
        "newPayPassword":newPayPassword,
        "nickname":nickname,
        "inUser":localStorage.getItem("userId"),
        "loginName":loginName,
        "smsCode":smsCode,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "userInfo":userInfo
    }

    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/register',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //console.log(rs);
        if(rs.status=200){
            if(rs.data.code == '0'){
                location.href='tuanduichengyuan.html';
            }else{
                $.toast(rs.data.msg, "text");
                initNRUserInfo();
            }
        }else{
            console.log('请求异常！');
            initNRUserInfo();
        }
    });
}


//防重复提交保存
function saveNRUserInfo(){
    var saveUserInfoFlag = $("#saveUserInfoFlag").val();
    if(saveUserInfoFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
        $("body").append("<input type='hidden' id='saveUserInfoFlag' value='1' >");
        saveUserInfo();
    }
}


//防重复提交保存
function saveNRUserInfoLogin(){
    var saveUserInfoFlag = $("#saveUserInfoFlag").val();
    if(saveUserInfoFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
        $("body").append("<input type='hidden' id='saveUserInfoFlag' value='1' >");
        saveUserInfoLogin();
    }
}
//初始化重复提交判断
function initNRUserInfo(){
    $("#saveUserInfoFlag").remove();
}
//监听提交操作
$("#buttonSubUserInfo").click(function(){
    saveNRUserInfo();
});

//监听提交操作
$("#buttonSubUserInfoLogin").click(function(){
    saveNRUserInfoLogin();
});


//修改头像
function saveHeadImage(){
    //参数
    var headimgurl = pathUrl("uploaderInput");
    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "headimgurl":headimgurl
    }

    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/edit',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //console.log(rs);
        if(rs.status=200){
            if(rs.data.code == '0'){
                localStorage.setItem('headimageurl',checkPath(headimgurl));
                toindex();
            }else{
                $.toast(rs.data.msg, "text");
                initNRHeadImage();
            }
        }else{
            console.log('请求异常！');
            initNRHeadImage();
        }
    });
}


//修改头像
function saveJinbi(orderMoney){
    //参数

    //传输数据
    var datauser = {
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "orderMoney":orderMoney
    }

    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/sys/user/edit',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        //console.log(rs);
        if(rs.status=200){
            if(rs.data.code == '0'){
                //localStorage.setItem('headimageurl',checkPath(headimgurl));
                //toindex();
            }else{
                /*$.toast(rs.data.msg, "text");
                initNRHeadImage();*/

            }
        }else{
            //console.log('请求异常！');
            //initNRHeadImage();
        }
    });
}


//防重复提交保存
function saveNRHeadImage(){
    var saveHeadImageFlag = $("#saveHeadImageFlag").val();
    if(saveHeadImageFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
        $("body").append("<input type='hidden' id='saveHeadImageFlag' value='1' >");
        saveHeadImage();
    }
}
//初始化重复提交判断
function initNRHeadImage(){
    $("#saveHeadImageFlag").remove();
}

//监听提交修改头像操作
$("#buttonSubimageForm").click(function(){
    var files = document.getElementById('uploaderInput').files;
    if(files.length > 0){
        saveNRHeadImage();
    }else{
        $.toast('请选择文件', "text");
    }
});



//实名认证，企业认证，大V认证，问答认证
function saveAuthInfo(){
    //实名认证参数
    if($("#buttonSubAuthInfo").size() > 0){
        var uploaderInputA = pathUrl('uploaderInputA1');
        var uploaderInputB = pathUrl('uploaderInputB1');
        var uploaderInputC = pathUrl('uploaderInputC1');
        var nameA = $('#name_a').val();
        var idCard = $('#id_card').val();
        var address = $('#address').val();
        var bankNo = $('#bank_no').val();
        var bankName = $('#bank_name').val();
        var alipayNo = $('#alipay_no').val();
        if(uploaderInputA == null || uploaderInputA == '' || uploaderInputA ==  'undifined')
        {
            //$.toast('请上传身份证正面照');
            //initNRAuthInfo();
            //return false;
        }
        if(uploaderInputB == null || uploaderInputB == '' || uploaderInputB ==  'undifined')
        {
            //$.toast('请上传身份证反面照');
            //initNRAuthInfo();
            //return false;
        }

        /*if(uploaderInputC == null || uploaderInputC == '' || uploaderInputC ==  'undifined')
        {
            $.toast('请上传手持身份证照');
            initNRAuthInfo();
            return false;
        }*/
        if(nameA == null || nameA == ''){
            $.toast('请输入您的姓名');
            initNRAuthInfo();
            return false;
        }
        var dis = $("#shenfenzheng").css("display");
        if(dis != 'none' && (idCard == null || idCard == '')) {
            $.toast('请输入您的身份证号');
            initNRAuthInfo();
            return false;
        }
        /*if(address == null || address == '') {
            $.toast('请输入您的现居地址');
            initNRAuthInfo();
            return false;
        }*/
        /*if(bankName == null || bankName == '') {
            $.toast('请输入银行名称');
            initNRAuthInfo();
            return false;
        }
        if(bankNo == null || bankNo == '') {
            $.toast('请输入银行卡号');
            initNRAuthInfo();
            return false;
        }*/

        if(alipayNo == null || alipayNo == '') {
            $.toast('请输入支付宝帐号');
            initNRAuthInfo();
            return false;
        }

        //传输数据
        var datauser = {
            "cardA":uploaderInputA,
            "cardB":uploaderInputB,
            "cardC":uploaderInputC,
            "cardName":nameA,
            "cardNum":idCard,
            "nowAddress":address,
            "bankName":bankName,
            "alipayNo":alipayNo,
            "bankNo":bankNo
        }
    }else if($("#buttonSubCompanyAuthInfo").size() > 0){
        //企业认证
        //营业执照--
        var companyPhoto = pathUrl('companyPhoto');

        var companyName = pathUrl('uploaderInputA1');
        var companyCode = pathUrl('uploaderInputB1');
        var companyAddress = pathUrl('uploaderInputC1');

        var companyPrinman = $('#companyPrinman').val();
        var companyPhone = $('#companyPhone').val();
        if(companyPhoto == null || companyPhoto == '' || companyPhoto ==  'undifined') {
            $.toast('请上传营业执照照片');
            initNRAuthInfo();
            return false;
        }
        if(companyName == null || companyName == '' || companyName ==  'undifined') {
           /* $.toast('请上传法人身份证正面');
            initNRAuthInfo();
            return false;*/
        }
        if(companyCode == null || companyCode == '' || companyCode ==  'undifined') {
           /* $.toast('请上传法人身份证反面');
            initNRAuthInfo();
            return false;*/
        }
        if(companyAddress == null || companyAddress == '' || companyAddress ==  'undifined') {
            $.toast('请上传门头照/工牌/名片');
            initNRAuthInfo();
            return false;
        }
        /*if(companyName == null || companyName == ''){
            $.toast('请输入企业名称');
            initNRAuthInfo();
            return false;
        }
        if(companyCode == null || companyCode == '') {
            $.toast('请输入企业信用代码');
            initNRAuthInfo();
            return false;
        }
        if(companyAddress == null || companyAddress == '') {
            $.toast('请输入企业地址');
            initNRAuthInfo();
            return false;
        }
        if(companyPrinman == null || companyPrinman == '') {
            $.toast('请输入企业法人姓名');
            initNRAuthInfo();
            return false;
        }
        if(!companyPhone || !/1[3|4|5|7|8]\d{9}/.test(companyPhone)){
            $.toast('请输入正确手机号');
            initNRAuthInfo();
            return false;
        }*/
        //传输数据
        var datauser = {
            "companyPhoto":companyPhoto,
            "companyName":companyName,
            "companyCode":companyCode,
            "companyAddress":companyAddress,
            "companyPrinman":companyPrinman,
            "companyPhone":companyPhone

        }

    }else if($("#buttonSubIsVAuthInfo").size() > 0){
        //大V认证
        var vLink = $('#vLink').val();
        var coursePrice = $('#coursePrice').val();
        if(coursePrice == null || coursePrice == '') {
            $.toast('请输入年费价格');
            initNRAuthInfo();
            return false;
        }
        if(vLink == null || vLink == '') {
            $.toast('请输入作品链接');
            initNRAuthInfo();
            return false;
        }
        //传输数据
        var datauser = {
            "vLink":vLink,
            "coursePrice":coursePrice
        }
    }else if($("#buttonSubAnswerVAuthInfo").size() > 0){
        //问答认证
        var answerLink = $('#answerLink').val();
        if(answerLink == null || answerLink == '') {
            $.toast('请输入相关问答链接地址');
            initNRAuthInfo();
            return false;
        }
        //传输数据
        var datauser = {
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
            "answerLink":answerLink
        }


    }
        instanceuser({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/sys/user/saveAuthInfo',
            data: datauser,
            cancelToken: sourceuser.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            //console.log(rs);
            if(rs.status=200){
                if(rs.data.code == '0'){
                    if($("#buttonSubCompanyAuthInfo").size() > 0){//企业认证
                        $("#orderMoney").val(localStorage.getItem("qiyerenzhengprice"));
                        $("#orderType").val("2");
                        $("#orderTitle").val("企业认证支付(原价999元,限时"+localStorage.getItem("qiyerenzhengprice")+"元)");
                        if($("#payflag").val() != '1'){
                            paySelect();
                        }else{
                            toindex();
                        }

                    }else if($("#buttonSubIsVAuthInfo").size() > 0){//大V
                        $("#orderMoney").val(localStorage.getItem("davrenzhengprice"));
                        $("#orderType").val("4");
                        $("#orderTitle").val("大V认证支付(原价999元,限时"+localStorage.getItem("davrenzhengprice")+"元)");
                        if($("#payflag").val() != '1'){
                            paySelect();
                        }else{
                            toindex();
                        }
                    }else if($("#buttonSubAnswerVAuthInfo").size() > 0){//问答之星
                        $("#orderMoney").val(localStorage.getItem("wendarenzhengprice"));
                        $("#orderType").val("3");
                        $("#orderTitle").val("问答之星认证支付(原价999元,限时"+localStorage.getItem("wendarenzhengprice")+"元)");
                        if($("#payflag").val() != '1'){
                            paySelect();
                        }else{
                            toindex();
                        }
                    }else{
                        toindex();
                    }

                }else{
                    $.toast(rs.data.msg, "text");
                    initNRAuthInfo();
                }
            }else{
                console.log('请求异常！');
                initNRAuthInfo();
            }
        });


}

//防重复提交保存
function saveNRAuthInfo(){
    var saveAuthInfoFlag = $("#saveAuthInfoFlag").val();
    if(saveAuthInfoFlag > 0){
        $.toast("请勿重复提交", "text");
    }else{
        if($("#saveAuthInfoFlag").size() == 0){
            $("body").append("<input type='hidden' id='saveAuthInfoFlag' value='1' >");
        }
        saveAuthInfo();
    }
}
//初始化重复提交判断
function initNRAuthInfo(){
    $("#saveAuthInfoFlag").remove();
}
//监听提交操作
$("#buttonSubAuthInfo").click(function(){
    saveNRAuthInfo();
});
//监听提交操作
$("#buttonSubCompanyAuthInfo").click(function(){
    saveNRAuthInfo();
});
//监听提交操作
$("#buttonSubIsVAuthInfo").click(function(){
    saveNRAuthInfo();
});
//监听提交操作
$("#buttonSubAnswerVAuthInfo").click(function(){
    saveNRAuthInfo();
});


//认证详情信息
function detailAuthInfo(){

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
        url: '/sys/user/detailAuthInfo',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            detailAuthInfoRender(rs.data);
        }else{
            console.log('请求异常！')
        }

    });

}
//详情渲染--认证页面详情
function detailAuthInfoRender(data){
    if($("#buttonSubAuthInfo").size() > 0){
        //实名认证参数
        var tmplA = '<li class="weui-uploader__file" style="background-image:url('+checkPathBackGroubdImage(baseFileUrlUpload+data.result.cardA)+')"></li>';
        var tmplB = '<li class="weui-uploader__file" style="background-image:url('+checkPathBackGroubdImage(baseFileUrlUpload+data.result.cardB)+')"></li>';
        var tmplC = '<li class="weui-uploader__file" style="background-image:url('+checkPathBackGroubdImage(baseFileUrlUpload+data.result.cardC)+')"></li>';

        if(data.result.cardA != null){
            $("#uploaderFilesA1").html(tmplA);
            pathSetUrl('uploaderInputA1',0,data.result.cardA);
        }
        if(data.result.cardB != null){
            $("#uploaderFilesB1").html(tmplB);
            pathSetUrl('uploaderInputB1',0,data.result.cardB);
        }
        if(data.result.cardC != null){
            $("#uploaderFilesC1").html(tmplC);
            pathSetUrl('uploaderInputC1',0,data.result.cardC);
        }
        $("#name_a").val(data.result.cardName);
        $("#id_card").val(data.result.cardNum);
        $("#address").val(data.result.nowAddress);
        $("#bank_name").val(data.result.bankName);
        $("#bank_no").val(data.result.bankNo);
        $("#alipay_no").val(data.result.alipayNo);
        if(data.result.isAuth == '2'){
            $("#buttonSubAuthInfo").remove();
            $("#auditStatus").html("<font color='red'>审核中</font>");
            $("#authReasion").html("预计24小时内完成审核，节假日除外");
            $("#auditStatus").show();
        }else if(data.result.isAuth == '3'){
            $("#buttonSubAuthInfo").remove();
            $("#auditStatus").html("<font color='green'>已认证</font>");
            $("#auditStatus").show();
        }else if(data.result.isAuth == '4'){
            $("#auditStatus").html("<font color='red'>审核未通过</font>");
            $("#authReasion").html("<font color='red'>备注："+data.result.authReason+"</font>");
            $("#auditStatus").show();
        }
    }else if($("#buttonSubCompanyAuthInfo").size() > 0){

        //企业认证参数
        var tmpl = '<li class="weui-uploader__file" style="background-image:url('+checkPathBackGroubdImage(baseFileUrlUpload+data.result.companyPhoto)+')"></li>';
        if(data.result.companyPhoto != null){
            $("#uploaderFiles").html(tmpl);
            pathSetUrl('companyPhoto',0,data.result.companyPhoto);
        }
        var tmplA = '<li class="weui-uploader__file" style="background-image:url('+checkPathBackGroubdImage(baseFileUrlUpload+data.result.companyName)+')"></li>';
        var tmplB = '<li class="weui-uploader__file" style="background-image:url('+checkPathBackGroubdImage(baseFileUrlUpload+data.result.companyCode)+')"></li>';
        var tmplC = '<li class="weui-uploader__file" style="background-image:url('+checkPathBackGroubdImage(baseFileUrlUpload+data.result.companyAddress)+')"></li>';

        if(data.result.companyName != null){
            $("#uploaderFilesA1").html(tmplA);
            pathSetUrl('uploaderInputA1',0,data.result.companyName);
        }
        if(data.result.companyCode != null){
            $("#uploaderFilesB1").html(tmplB);
            pathSetUrl('uploaderInputB1',0,data.result.companyCode);
        }
        if(data.result.companyAddress != null){
            $("#uploaderFilesC1").html(tmplC);
            pathSetUrl('uploaderInputC1',0,data.result.companyAddress);
        }
/*        $('#companyName').val(data.result.companyName);
        $('#companyCode').val(data.result.companyCode);
        $('#companyAddress').val(data.result.companyAddress);*/
        $('#companyPrinman').val(data.result.companyPrinman);
        $('#companyPhone').val(data.result.companyPhone);

        if(data.result.isAuth != '3'){
            if(localStorage.getItem('token') != null && localStorage.getItem('token') != 'null' && localStorage.getItem('token') != '') {
                $.confirm("需要先完善信息", "去完善信息", function () {
                    location.href = 'updaterealname.html';
                }, function () {
                    //取消操作
                    location.href = 'updaterealname.html';
                });
            }
        }

        if(data.result.companyAuth == '2'){
            $("#buttonSubCompanyAuthInfo").remove();
            $("#auditStatus").html("<font color='red'>审核中</font>");
            $("#authReasion").html("预计24小时内完成审核，节假日除外");
            $("#auditStatus").show();
        }else if(data.result.companyAuth == '3'){
            $("#buttonSubCompanyAuthInfo").remove();
            $("#auditStatus").html("<font color='green'>已认证</font>");
            $("#auditStatus").show();
        }else if(data.result.companyAuth == '4'){
            $("#auditStatus").html("<font color='red'>审核未通过</font>");
            $("#authReasion").html("<font color='red'>备注："+data.result.authReason+"</font>");
            $("#auditStatus").show();
        }

        if(data.result.payCompanyauth == '1'){
            $("#payflag").val("1");
        }
    }else if($("#buttonSubIsVAuthInfo").size() > 0){

        //大V认证参数
        $('#vLink').val(data.result.vLink);
        $('#coursePrice').val(data.result.coursePrice);
        if(data.result.isV == '2'){
            $("#buttonSubIsVAuthInfo").remove();
            $("#auditStatus").html("<font color='red'>审核中</font>");
            $("#authReasion").html("预计24小时内完成审核，节假日除外");
            $("#auditStatus").show();
        }else if(data.result.isV == '3'){
            $("#buttonSubIsVAuthInfo").remove();
            $("#auditStatus").html("<font color='green'>已认证</font>");
            $("#auditStatus").show();
        }else if(data.result.isV == '4'){
            $("#auditStatus").html("<font color='red'>审核未通过</font>");
            $("#authReasion").html("<font color='red'>备注："+data.result.authReason+"</font>");
            $("#auditStatus").show();

        }
        if(data.result.payIsv == '1'){
            $("#payflag").val("1");
        }
    }else if($("#buttonSubAnswerVAuthInfo").size() > 0){
        //问答认证参数
        $('#answerLink').val(data.result.answerLink);

        if(data.result.answerV == '2'){
            $("#buttonSubAnswerVAuthInfo").remove();
            $("#auditStatus").html("<font color='red'>审核中</font>");
            $("#authReasion").html("预计24小时内完成审核，节假日除外");
            $("#auditStatus").show();
        }else if(data.result.answerV == '3'){
            $("#buttonSubAnswerVAuthInfo").remove();
            $("#auditStatus").html("<font color='green'>已认证</font>");
            $("#auditStatus").show();
        }else if(data.result.answerV == '4'){
            $("#auditStatus").html("<font color='red'>审核未通过</font>");
            $("#authReasion").html("<font color='red'>备注："+data.result.authReason+"</font>");
            $("#auditStatus").show();
        }

        if(data.result.payAnswerv == '1'){
            $("#payflag").val("1");
        }
    }







}


//获取详情数据
function detailmingpianuser(){

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
        url: '/sys/user/userdetail',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            detailmingpianuserRender(rs.data);
        }else{
            console.log('请求异常！')
        }

    });

}
function detailmingpianusertwo(){

    //参数
    var id = GetUrlString("share");

    //传输数据
    var datauser = {
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
        data: datauser
    }) .then(function(rs){
        //console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            detailmingpianuserRendertwo(rs.data);
        }else{
            console.log('请求异常！')
        }

    });

}
function  detailmingpianuserRender(data){
    if(data.code == '0'){

        //参数
        if(data.result.cardName != null ){
            $("#nickName").show();
            $("#nickName").html(""+data.result.cardName);
        }else{
            $("#nickName").show();
            $("#nickName").html(""+data.result.nickname);
        }
        if(data.result.headimgurl != null && data.result.headimgurl != ''){
            $("#imghead").attr("src",baseFileUrluser+data.result.headimgurl);
        }

        if(data.result.companyAuth == '3'){
            $("#companyAuth").show();
            $("#companyAuth").html("企业认证");
        }else if(data.result.isAuth == '3'){
            $("#companyAuth").show();
            $("#companyAuth").html("实名认证");
        }

        if(data.result.userInfo != null){
            $("#userInfo").show();
            $("#userInfo").html(data.result.userInfo);
        }
        if(data.result.mobile  != null){
            $("#mobile").show();
            $("#mobile").html(""+data.result.mobile);
        }
        $(document).ready(function() {

            setTimeout(function() {

                qrCodeMingPian("qrcodeCanvas",baseUrlFrontDefault+"index.html?id="+localStorage.getItem("userId")+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));

                /*  var url = Canvas2Image.convertToPNG($("canvas")[0],200,200).getAttribute('src');
                  var img = $("#tothismingpian");
                  img.attr("src",url);*/
                $("#mingpian").show();
                convert2canvasMingPian("sharecontent","sharesrc","down","mingpianbutton");
                //convert2canvas("sharecontent","sharesrc","down");

            },200);


        });

    }else{
        $.toast(data.msg, "text");
    }
}
function  detailmingpianuserRendertwo(data){
    if(data.code == '0'){

        //参数
        if(data.result.cardName != null ){
            $("#nickName").show();
            $("#nickName").html(""+data.result.cardName);
        }else{
            $("#nickName").show();
            $("#nickName").html(""+data.result.nickname);
        }
        if(data.result.headimgurl != null && data.result.headimgurl != ''){
            $("#imghead").attr("src",baseFileUrluser+data.result.headimgurl);
        }

        if(data.result.companyAuth == '3'){
            $("#companyAuth").show();
            $("#companyAuth").html("企业认证");
        }else if(data.result.isAuth == '3'){
            $("#companyAuth").show();
            $("#companyAuth").html("实名认证");
        }

        if(data.result.userInfo != null){
            $("#userInfo").show();
            $("#userInfo").html(data.result.userInfo);
        }
        if(data.result.mobile  != null){
            $("#mobile").show();
            $("#mobile").html(""+data.result.mobile);
        }
        $(document).ready(function() {

            qrCodeMingPian("qrcodeCanvasTwo",baseUrlFrontDefault+"index.html?id="+localStorage.getItem("userId")+"&share="+localStorage.getItem("userId")+"&s="+localStorage.getItem("s"),localStorage.getItem("headimageurl"));

            var url = Canvas2Image.convertToPNG($("canvas")[0],150,150).getAttribute('src');
            var img = $("#tothismingpian");
            img.attr("src",url);

            convert2canvasMingPianTwo("sharecontenttwo","sharesrc","down","mingpianbutton");

        });

    }else{
        //$.toast(data.msg, "text");
    }
}
function f() {
    //convert2canvas();
   /* if(getBrowser() == 'wxmobile'){
        $("#mingpianbaocun").attr("onclick","tipwxshare()");
        $("#mingpianbaocun").html("长按图片保存到本地");
    }else if(getBrowser() != 'pc'){
        $("#mingpianbaocun").html("长按图片保存到本地");
    }else{
        $("#mingpianbaocun").html("保存图片到本地");
    }*/

    /*var datupath = $("#sharesrc").attr("src");
    if(navigator.userAgent.indexOf("Html5Plus") > -1) {
        //f2(datupath);
        //$("#mingpianbutton").remove();
    }else{
        if(getBrowser() == 'wxmobile'){
            $("#mingpianbaocun").attr("onclick","tipwxshare()");
            $("#mingpianbaocun").html("长按图片保存");
        }else if(getIsAPPLE() ){

            $("#mingpianbaocun").attr("onclick","tipwxshare()");
            $("#mingpianbaocun").html("长按图片保存");
        }else{

            $("#mingpianbaocun").attr("href",datupath);
            //$("#mingpianbutton").remove();
            $("#mingpianbaocun").html("保存到本地");
        }
    }*/

}

function f2(datupath) {
    /*var dataUrl = datupath;
    var b = new plus.nativeObj.Bitmap('bitblmap');



    b.loadBase64Data(dataUrl, function () {
        /!*这里一定要是_doc目录*!/
        b.save("_downloads/share-"+dateToString(new Date())+".jpg", {overwrite: true}, function (object) {
            //保存到相册
            plus.gallery.save("_downloads/share-"+dateToString(new Date())+".jpg", function () {
                $.toast('已保存到手机相册','text');
            }, function () {
                $.toast("图片保存失败",'text');
            });
        }, function () {
            $.toast("图片保存失败",'text');
        });
    }, function () {
        $.toast("图片保存失败",'text');
    });*/
    /*//生成base64图片数据
    var dataUrl = datupath;
    // console.log(dataUrl);  这里千万不要像这样打印出来否则HBuilder会报错的  可能输出的内容太多了吧
    var b = new plus.nativeObj.Bitmap();

    b.loadBase64Data(dataUrl, function () {
        console.log("创建成功");
    }, function () {
        console.log("创建失败");
    });
    b.save('_downloads/share2.jpg', {overwrite: true}, function () {
        console.log("保存成功");
        $.toptip('已保存到手机相册','success')
    }, function () {
        console.log("保存失败");
    });*/

    /*plus.gallery.save('_downloads/share2.jpg', function () {
        console.log("保存图片到相册成功");
       $.toptip('已保存到手机相册','success')
    }, function () {
        console.log("保存图片到相册失败");
        $.toast('保存图片到相册失败', 'text');
    });*/

/*
    // 创建下载任务
    var picurl=datupath;
    //图片保存到手机后的路径
    var picname="_downloads/erwei.png";
    var dtask = plus.downloader.createDownload(picurl, {}, function ( d, status ) {
    // 下载完成
        if ( status == 200 ) {
    //	alert( "Download success: " + d.filename );
            plus.gallery.save(picname,function() {//保存到相册方法
                $.toast('已保存到手机相册');
                $.toptip('已保存到手机相册','success')
            }, function() {
                $.toast('保存失败，请重试！');
                $.toptip('保存失败，请刷新重试！','success')
            });
        } else {
    //	alert( "Download failed: " + status ); 
        }
    });
    //dtask.addEventListener( "statechanged", onStateChanged, false );
    dtask.start();//开始下载*/


}


$(function () {
    //判断获取详情信息
    if($("#buttonDetailAuthInfo").size()>0){
        detailAuthInfo();
    }else if($("#buttonSubCompanyAuthInfo").size()>0){
        detailAuthInfo();
    }else if($("#buttonSubIsVAuthInfo").size()>0){
        detailAuthInfo();
    }else if($("#buttonSubAnswerVAuthInfo").size()>0){
        detailAuthInfo();
    }else if($("#buttonMingpianInfo").size()>0){
        detailmingpianuser();
    }else if($("#buttonMingpianInfoTwo").size()>0){


        if(navigator.userAgent.indexOf("Html5Plus") > -1) {

        }else{

            //分享是否有二维码
            if(getSaasId() == '201909091207'){
                if(curWwwPath.search("detail") != -1 || curWwwPath.search("article") != -1 || curWwwPath.search("howmakemoney") != -1){
                    //包含
                    var shareNow = GetUrlString("share");

                    if(shareNow != null && shareNow != '' && shareNow != getSaasId()){
                        $("#mingpiantwo").show();
                        detailmingpianusertwo();
                    }else{
                        $("#mingpiantwo").remove();
                    }
                }
            }
        }

    }
});

//获取详情数据
function getqianbaodata(){

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
        url: '/gg/money/ziJin/getDataQianBao',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                if(rs.data.result.listZiJin1 != null ){
                    var data1 = rs.data.result.listZiJin1;
                    var chart1 = new F2.Chart({
                        id: 'seventianshouru',
                        pixelRatio: window.devicePixelRatio,
                        padding: ['auto', 'auto', 40, 'auto']
                    });
                    chart1.source(data1);
                    chart1.tooltip(false);
                    // 坐标轴文本旋转
                    chart1.axis('Year', {
                        label: {
                            textBaseline: 'middle'
                        }
                    });
                    chart1.interval().position('Year*NumberNewMicroBrewery').color('NumberNewMicroBrewery', function(val) {
                        if (val === 20) {
                            return '#23c456';
                        }
                        return '#23c456';
                    });

                    // 柱状图添加文本
                    data1.map(function(obj) {
                        chart1.guide().text({
                            position: [obj.Year, obj.NumberNewMicroBrewery],
                            content: obj.NumberNewMicroBrewery+'元',
                            style: {
                                textAlign: 'center',
                                textBaseline: 'bottom'
                            },
                            offsetY: -4
                        });
                    });

                    chart1.render();

                }

                if(rs.data.result.listZiJin2 != null ){
                    var data2 = rs.data.result.listZiJin2;
                    var chart2 = new F2.Chart({
                        id: 'yueshouru',
                        pixelRatio: window.devicePixelRatio,
                        padding: ['auto', 'auto', 40, 'auto']
                    });
                    chart2.source(data2);
                    chart2.tooltip(false);
                    // 坐标轴文本旋转
                    chart2.axis('Year', {
                        label: {
                            textBaseline: 'middle'
                        }
                    });
                    chart2.interval().position('Year*NumberNewMicroBrewery').color('NumberNewMicroBrewery', function(val) {
                        if (val === 20) {
                            return '#23c456';
                        }
                        return '#23c456';
                    });

                    // 柱状图添加文本
                    data2.map(function(obj) {
                        chart2.guide().text({
                            position: [obj.Year, obj.NumberNewMicroBrewery],
                            content: obj.NumberNewMicroBrewery+'元',
                            style: {
                                textAlign: 'center',
                                textBaseline: 'bottom'
                            },
                            offsetY: -4
                        });
                    });

                    chart2.render();

                }

                if(rs.data.result.listZiJin3 != null ){
                    const data = rs.data.result.listZiJin3;

                    // Step 1: 创建 Chart 对象
                    const chart = new F2.Chart({
                        id: 'myChart',
                        pixelRatio: window.devicePixelRatio // 指定分辨率
                    });

                    // Step 2: 载入数据源
                    chart.source(data);

                    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
                    chart.interval().position('Year*NumberNewMicroBrewery').color('Year');

                    // Step 4: 渲染图表
                    chart.render();

                }



            }
        }else{
            console.log('请求异常！')
        }

    });

}



//获取详情数据
function getfenxiaodata(){

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
        url: '/gg/money/ziJin/getDataFenxiao',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                if(rs.data.result.allfenxiaomoney != null ){
                    $("#allfenxiaomoney").html("金币"+rs.data.result.allfenxiaomoney+"克");
                }else{
                    $("#allfenxiaomoney").html("金币0.00克");
                }
                if(rs.data.result.listZiJin1 != null ){
                    var data1 = rs.data.result.listZiJin1;
                    var chart1 = new F2.Chart({
                        id: 'rishouru',
                        pixelRatio: window.devicePixelRatio,
                        padding: ['auto', 'auto', 40, 'auto']
                    });
                    chart1.source(data1);
                    chart1.tooltip(false);
                    // 坐标轴文本旋转
                    chart1.axis('Year', {
                        label: {
                            textBaseline: 'middle'
                        }
                    });
                    chart1.interval().position('Year*NumberNewMicroBrewery').color('NumberNewMicroBrewery', function(val) {
                        if (val === 20) {
                            return '#23c456';
                        }
                        return '#23c456';
                    });

                    // 柱状图添加文本
                    data1.map(function(obj) {
                        chart1.guide().text({
                            position: [obj.Year, obj.NumberNewMicroBrewery],
                            content: obj.NumberNewMicroBrewery+'元',
                            style: {
                                textAlign: 'center',
                                textBaseline: 'bottom'
                            },
                            offsetY: -4
                        });
                    });

                    chart1.render();

                }

                if(rs.data.result.listZiJin2 != null ){
                    var data2 = rs.data.result.listZiJin2;
                    var chart2 = new F2.Chart({
                        id: 'tdrishouru',
                        pixelRatio: window.devicePixelRatio,
                        padding: ['auto', 'auto', 40, 'auto']
                    });
                    chart2.source(data2);
                    chart2.tooltip(false);
                    // 坐标轴文本旋转
                    chart2.axis('Year', {
                        label: {
                            textBaseline: 'middle'
                        }
                    });
                    chart2.interval().position('Year*NumberNewMicroBrewery').color('NumberNewMicroBrewery', function(val) {
                        if (val === 20) {
                            return '#23c456';
                        }
                        return '#23c456';
                    });

                    // 柱状图添加文本
                    data2.map(function(obj) {
                        chart2.guide().text({
                            position: [obj.Year, obj.NumberNewMicroBrewery],
                            content: obj.NumberNewMicroBrewery+'元',
                            style: {
                                textAlign: 'center',
                                textBaseline: 'bottom'
                            },
                            offsetY: -4
                        });
                    });

                    chart2.render();

                }

                if(rs.data.result.listZiJin3 != null ){
                    var data3= rs.data.result.listZiJin3;
                    var chart3 = new F2.Chart({
                        id: 'yueshouru',
                        pixelRatio: window.devicePixelRatio,
                        padding: ['auto', 'auto', 40, 'auto']
                    });
                    chart3.source(data3);
                    chart3.tooltip(false);
                    // 坐标轴文本旋转
                    chart3.axis('Year', {
                        label: {
                            textBaseline: 'middle'
                        }
                    });
                    chart3.interval().position('Year*NumberNewMicroBrewery').color('NumberNewMicroBrewery', function(val) {
                        if (val === 20) {
                            return '#23c456';
                        }
                        return '#23c456';
                    });

                    // 柱状图添加文本
                    data3.map(function(obj) {
                        chart3.guide().text({
                            position: [obj.Year, obj.NumberNewMicroBrewery],
                            content: obj.NumberNewMicroBrewery+'元',
                            style: {
                                textAlign: 'center',
                                textBaseline: 'bottom'
                            },
                            offsetY: -4
                        });
                    });

                    chart3.render();

                }

                if(rs.data.result.listZiJin4 != null ){
                    var data4= rs.data.result.listZiJin4;
                    var chart4 = new F2.Chart({
                        id: 'tdyueshouru',
                        pixelRatio: window.devicePixelRatio,
                        padding: ['auto', 'auto', 40, 'auto']
                    });
                    chart4.source(data4);
                    chart4.tooltip(false);
                    // 坐标轴文本旋转
                    chart4.axis('Year', {
                        label: {
                            textBaseline: 'middle'
                        }
                    });
                    chart4.interval().position('Year*NumberNewMicroBrewery').color('NumberNewMicroBrewery', function(val) {
                        if (val === 20) {
                            return '#23c456';
                        }
                        return '#23c456';
                    });

                    // 柱状图添加文本
                    data4.map(function(obj) {
                        chart4.guide().text({
                            position: [obj.Year, obj.NumberNewMicroBrewery],
                            content: obj.NumberNewMicroBrewery+'元',
                            style: {
                                textAlign: 'center',
                                textBaseline: 'bottom'
                            },
                            offsetY: -4
                        });
                    });

                    chart4.render();

                }

                if(rs.data.result.listZiJin5 != null ){
                    const data = rs.data.result.listZiJin5;

                    // Step 1: 创建 Chart 对象
                    const chart = new F2.Chart({
                        id: 'myChart',
                        pixelRatio: window.devicePixelRatio // 指定分辨率
                    });

                    // Step 2: 载入数据源
                    chart.source(data);

                    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
                    chart.interval().position('Year*NumberNewMicroBrewery').color('Year');

                    // Step 4: 渲染图表
                    chart.render();

                }



            }
        }else{
            console.log('请求异常！')
        }

    });

}

if($("#haveQianbaoData").size() > 0){
    getqianbaodata();
}
if($("#haveFenxiaoData").size() > 0){
    getfenxiaodata();
}


//资金流水明细
//获取详情数据
function getzijinjiludata(rederId,renderType){
    //分页
    var pageNoTemp = $("#listzijinPageNo").val();
    if(pageNoTemp > 0){
        $("#listzijinPageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listzijinPageNo' value='1' >");
    }
    //参数
    var token = localStorage.getItem('token');

    var beginCreateDate = $("#beginCreateDate").val();
    var tixianFlag = $("input[name='f2']:checked").val();
    var endCreateDate = $("#endCreateDate").val();
    //传输数据
    var datauser = {
        "beginCreateDate":beginCreateDate,
        "tixianFlag":tixianFlag,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "endCreateDate":endCreateDate,
        "pageNo":pageNoTemp,
        "token":token
    }

    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/money/ziJin/list',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){

                if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1' ){
                    $(".weui-toast--text").hide();$.toast("没有更多了", "text");
                }else if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '2' ){
                    $("#"+rederId+"").html("");
                }else{
                    var str = '';
                    $.each(rs.data.result,function(i,item){
                        str += '<div class="weui-panel__bd">';
                        str += '<div class="weui-media-box weui-media-box_small-appmsg">';
                        str += '<div class="weui-cells">';
                        str += '<a class="weui-cell weui-cell_access" href="javascript:;">';

                        str += '<div class="weui-cell__bd weui-cell_primary">';
                        if(item.tixianFlag == '0'){
                            str += '<p class="weui-news-title onerow">'+setNULL(item.zijinBeizhu)+'<span style="color: red;">[不可提现]</span>';
                        }else{
                            str += '<p class="weui-news-title onerow">'+setNULL(item.zijinBeizhu)+'';
                        }

                        if(eval(item.zijinType) <= 31){
                            str += '<span class="myqianbao f-black">+'+setNum(item.moneyNum)+'</span>';
                        }else{
                            str += '<span class="myqianbao f-red">-'+setNum(item.moneyNum)+'</span>';
                        }

                        str += '</p><p class="onerow myfontsize" >'+setNULL(item.remarks)+'</p><p class="onerow myfontsize" >'+timeago(item.updateDate)+'</p>';

                        str += '</div>';

                        str += '</a>';

                        str += '</div>';
                        str += '</div>';
                        str += '</div>';

                    });

                    if(renderType == "1"){
                        $("#"+rederId+"").append(str);
                    }else{
                        $("#"+rederId+"").html(str);
                    }

                }


            }
        }else{
            console.log('请求异常！')
        }

    });

}
function getzijinjiludata2(rederId,renderType,pageSize){
    //分页
    var pageNoTemp = $("#listzijinPageNo").val();
    if(pageNoTemp > 0){
        $("#listzijinPageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listzijinPageNo' value='1' >");
    }
    //参数
    var token = localStorage.getItem('token');

    var beginCreateDate = $("#beginCreateDate").val();
    var tixianFlag = $("input[name='f2']:checked").val();
    var endCreateDate = $("#endCreateDate").val();
    //传输数据
    var datauser = {
        "beginCreateDate":beginCreateDate,
        "tixianFlag":tixianFlag,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "endCreateDate":endCreateDate,
        "pageNo":pageNoTemp,
        "pageSize":pageSize,
        "token":token
    }

    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/money/ziJin/list',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){

                if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1' ){
                    $(".weui-toast--text").hide();$.toast("没有更多了", "text");
                }else if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '2' ){
                    $("#"+rederId+"").html("");
                }else{
                    var str = '';
                    $.each(rs.data.result,function(i,item){
                        str += '<div class="weui-panel__bd">';
                        str += '<div class="weui-media-box weui-media-box_small-appmsg">';
                        str += '<div class="weui-cells">';
                        str += '<a class="weui-cell weui-cell_access" href="javascript:;">';

                        str += '<div class="weui-cell__bd weui-cell_primary">';
                        if(item.tixianFlag == '0'){
                            str += '<p class="weui-news-title onerow">'+setNULL(item.zijinBeizhu)+'<span style="color: red;">[不可提现]</span>';
                        }else{
                            str += '<p class="weui-news-title onerow">'+setNULL(item.zijinBeizhu)+'';
                        }

                        if(eval(item.zijinType) <= 31){
                            str += '<span class="myqianbao f-black">+'+setNum(item.moneyNum)+'</span>';
                        }else{
                            str += '<span class="myqianbao f-red">-'+setNum(item.moneyNum)+'</span>';
                        }

                        str += '</p><p class="onerow myfontsize" >'+setNULL(item.remarks)+'</p><p class="onerow myfontsize" >'+timeago(item.updateDate)+'</p>';

                        str += '</div>';

                        str += '</a>';

                        str += '</div>';
                        str += '</div>';
                        str += '</div>';

                    });

                    if(renderType == "1"){
                        $("#"+rederId+"").append(str);
                    }else{
                        $("#"+rederId+"").html(str);
                    }

                }


            }
        }else{
            console.log('请求异常！')
        }

    });

}
function getzijinjiludata3(rederId,renderType,pageSize){
    //分页
    var pageNoTemp = $("#listzijinPageNo").val();
    if(pageNoTemp > 0){
        $("#listzijinPageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listzijinPageNo' value='1' >");
    }
    //参数
    var token = localStorage.getItem('token');

    var beginCreateDate = $("#beginCreateDate").val();
    var tixianFlag = $("input[name='f2']:checked").val();
    var endCreateDate = $("#endCreateDate").val();
    //传输数据
    var datauser = {
        "beginCreateDate":beginCreateDate,
        "tixianFlag":tixianFlag,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "endCreateDate":endCreateDate,
        "pageNo":pageNoTemp,
        "pageSize":pageSize,
        "id":GetUrlString("id")
    }

    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/money/ziJin/listother',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){

                if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1' ){
                    $(".weui-toast--text").hide();$.toast("没有更多了", "text");
                }else if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '2' ){
                    $("#"+rederId+"").html("");
                }else{
                    var str = '';
                    $.each(rs.data.result,function(i,item){
                        str += '<div class="weui-panel__bd">';
                        str += '<div class="weui-media-box weui-media-box_small-appmsg">';
                        str += '<div class="weui-cells">';
                        str += '<a class="weui-cell weui-cell_access" href="javascript:;">';

                        str += '<div class="weui-cell__bd weui-cell_primary">';
                        if(item.tixianFlag == '0'){
                            str += '<p class="weui-news-title onerow">'+setNULL(item.zijinBeizhu)+'<span style="color: red;">[不可提现]</span>';
                        }else{
                            str += '<p class="weui-news-title onerow">'+setNULL(item.zijinBeizhu)+'';
                        }

                        if(eval(item.zijinType) <= 31){
                            str += '<span class="myqianbao f-black">+'+setNum(item.moneyNum)+'</span>';
                        }else{
                            str += '<span class="myqianbao f-red">-'+setNum(item.moneyNum)+'</span>';
                        }

                        str += '</p><p class="onerow myfontsize" >'+setNULL(item.remarks)+'</p><p class="onerow myfontsize" >'+timeago(item.updateDate)+'</p>';

                        str += '</div>';

                        str += '</a>';

                        str += '</div>';
                        str += '</div>';
                        str += '</div>';

                    });

                    if(renderType == "1"){
                        $("#"+rederId+"").append(str);
                    }else{
                        $("#"+rederId+"").html(str);
                    }

                }


            }
        }else{
            console.log('请求异常！')
        }

    });

}


//推广资金流水明细
//获取详情数据
function getfenxiaozijinjiludata(rederId,renderType){
    //分页
    var pageNoTemp = $("#listzijinPageNo").val();
    if(pageNoTemp > 0){
        $("#listzijinPageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listzijinPageNo' value='1' >");
    }
    //参数
    var token = localStorage.getItem('token');

    var beginCreateDate = $("#beginCreateDate").val();
    var tixianFlag = $("input[name='f2']:checked").val();
    var endCreateDate = $("#endCreateDate").val();

    //传输数据
    var datauser = {
        "beginCreateDate":beginCreateDate,
        "tixianFlag":tixianFlag,
        "endCreateDate":endCreateDate,
        "pageNo":pageNoTemp,
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
        url: '/gg/money/ziJin/fenxiaolist',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){

                if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1' ){
                    $(".weui-toast--text").hide();$.toast("没有更多了", "text");
                }else if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '2' ){
                    $("#"+rederId+"").html("");
                }else{
                    var str = '';
                    $.each(rs.data.result,function(i,item){
                        str += '<div class="weui-panel__bd">';
                        str += '<div class="weui-media-box weui-media-box_small-appmsg">';
                        str += '<div class="weui-cells">';
                        str += '<a class="weui-cell weui-cell_access" href="javascript:;">';

                        str += '<div class="weui-cell__bd weui-cell_primary">';
                        if(item.tixianFlag == '0'){
                            str += '<p class="weui-news-title onerow">'+setNULL(item.zijinBeizhu)+'<span style="color: red;">[不可提现]</span>';
                        }else{
                            str += '<p class="weui-news-title onerow">'+setNULL(item.zijinBeizhu)+'';
                        }

                        if(eval(item.zijinType) <= 31){
                            str += '<span class="myqianbao f-green">+'+setNum(item.moneyNum)+'</span>';
                        }else{
                            str += '<span class="myqianbao f-red">-'+setNum(item.moneyNum)+'</span>';
                        }

                        str += '</p><p class="onerow myfontsize" >'+setNULL(item.remarks)+'</p><p class="onerow myfontsize" >'+timeago(item.updateDate)+'</p>';

                        str += '</div>';

                        str += '</a>';

                        str += '</div>';
                        str += '</div>';
                        str += '</div>';

                    });

                    if(renderType == "1"){
                        $("#"+rederId+"").append(str);
                    }else{
                        $("#"+rederId+"").html(str);
                    }

                }


            }
        }else{
            console.log('请求异常！')
        }

    });

}

//获取详情数据
function getTuiguanglist(rederId,renderType,proType){
    //分页
    var pageNoTemp = $("#listzijinPageNo").val();
    if(pageNoTemp > 0){
        $("#listzijinPageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listzijinPageNo' value='1' >");
    }
    //参数
    var token = localStorage.getItem('token');
    var shareType = proType;
    //传输数据
    var datauser = {
        "shareType":shareType,
        "pageNo":$("#listzijinPageNo").val(),
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
        url: '/gg/share/share/list',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                var titletext = '全部分享记录';
                if(shareType == '1'){
                    titletext = '课程分享记录';
                }else if(shareType == '2'){
                    titletext = '会员分享记录';
                }else if(shareType == '5'){
                    titletext = '应用分享记录';
                }else if(shareType == '6'){
                    titletext = '商品分享记录';
                }else if(shareType == '7'){
                    titletext = '问题分享记录';
                }else if(shareType == '9'){
                    titletext = '信用卡分享记录';
                }else if(shareType == '10'){
                    titletext = '贷款分享记录';
                }else if(shareType == '11'){
                    titletext = '保险分享记录';
                }else if(shareType == '12'){
                    titletext = '基金分享记录';
                }else if(shareType == '14'){
                    titletext = '活动分享记录';
                }
                $("#titletext").html(titletext);

                if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1' ){
                    $(".weui-toast--text").hide();$.toast("没有更多了", "text");
                }if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '2' ){
                var nodata = '';
                    nodata += '<div class="weui-panel weui-panel_access linetop  " id="nodata" >';
                    nodata += '<div class="weui-panel__hd" style="text-align: center;">';
                    nodata += '<div class="nickname f-blue" onclick=toindex(); >您还没有分享记录，点我去发现去分享>></div>';
                    nodata += '</div>';
                    nodata += '</div>';
                    $("body").append(nodata);
                }{


                    var str = '';
                    $.each(rs.data.result,function(i,item){

                        if(item.shareType == '1'){
                            str += '<li class="weui-news-item" onclick=toCourseDetail("'+item.shareAboutid+'","1"); >';
                        }else if(item.shareType == '2'){
                            str += '<li class="weui-news-item" onclick=toHuiYuanDetail(\''+item.shareAboutid+'\',\'1\'); >';
                        }else if(item.shareType == '5'){
                            str += '<li class="weui-news-item" onclick=toToolDetail("'+item.shareAboutid+'","1"); >';
                        }else if(item.shareType == '6'){
                            str += '<li class="weui-news-item" onclick=toProductDetail("'+item.shareAboutid+'","1"); >';
                        }else if(item.shareType == '7'){
                            str += '<li class="weui-news-item" onclick=toQuestionDetail("'+item.shareAboutid+'","1"); >';
                        }else if(item.shareType == '9'){
                            str += '<li class="weui-news-item" onclick=toAgentKaDetail("'+item.shareAboutid+'","1"); >';
                        }else if(item.shareType == '10'){
                            str += '<li class="weui-news-item" onclick=toAgentDaikuanDetail("'+item.shareAboutid+'","1"); >';
                        }else if(item.shareType == '11'){
                            str += '<li class="weui-news-item" onclick=toAgentBaoxianDetail("'+item.shareAboutid+'","1"); >';
                        }else if(item.shareType == '12'){
                            str += '<li class="weui-news-item" onclick=toAgentJiJinDetail("'+item.shareAboutid+'","1"); >';
                        }else if(item.shareType == '14'){
                            str += '<li class="weui-news-item" onclick=toActivityDetail("'+item.shareAboutid+'","1"); >';
                        }else{
                            str += '<li class="weui-news-item" >';
                        }


                        str += '<div class="weui-news-inner" >';


                        if(item.shareType == '1' || item.shareType == '9' || item.shareType == '11' || item.shareType == '12' || item.shareType == '14'){
                            str += '<div class="weui-news-media " style="background-image:url('+checkPathBackGroubdImage(item.shareImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';

                        }else{
                            str += '<div class="weui-news-media square" style="background-image:url('+checkPathBackGroubdImage(item.shareImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';

                        }

                        if(item.jiaobiao != null && item.jiaobiao != ''){
                            str += '<span class="weui-mark-rt bg-red">'+setNULL(item.jiaobiao)+'</span>';
                        }

                        str += '</div>';
                        str += '<div class="weui-news-inners">';
                        str += '<div class="weui-news-text">';
                        str += '<div class="weui-news-title">'+setNULL(item.title)+'</div>';
                        str += '</div>';
                        str += '<div class="weui-news-info">';
                        str += '<div class="weui-news-infoitem">';
                        str += '<span class="weui-news-left" id="weui-news-left">';
                        str += '<div class="weui-label-list" style="margin-left: 0px;">';
                        if(item.yongjin != null && item.yongjin != ''){
                            str += '<label class="label f-red b-red">'+item.yongjin+'</label>';
                        }
                        if(item.shareMoney != null && item.shareMoney != '' && eval(item.shareMoney) > 0.00){
                            str += '<label class="label f-red b-red">加价￥'+setNum(item.shareMoney)+'</label>';
                        }
                        if(item.jiesuanshijain != null && item.jiesuanshijain != ''){
                            str += '<label class="label f-blue b-blue">'+item.jiesuanshijain+'</label>';
                        }
                        str += '</div>';
                        str += '</span>';
                        str += '</div>';
                        str += '<div class="weui-news-infoitem"><i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>'+setNum(item.shareDianjiliang)+'';
                        str += '</div>';
                        str += '</div>';
                        str += '</div>';
                        str += '</div>';
                        str += '</li>';

                    });


                    if(renderType == "1"){
                        $("#"+rederId+"").append(str);
                    }else{
                        $("#"+rederId+"").html(str);
                    }
                    $("#dis"+rederId+"").show();

                }


            }
        }else{
            console.log('请求异常！')
        }

    });

}

function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}
//获取详情数据
function getTuiguangOrderlist(rederId,renderType,proType){
    //分页
    var pageNoTemp = $("#listzijinPageNo").val();
    if(pageNoTemp > 0){
        $("#listzijinPageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listzijinPageNo' value='1' >");
    }
    //参数
    var token = localStorage.getItem('token');

    var orderType = proType;
    var orderStatus = $("#orderStatus").val();
    var jinri = $("#jinri").val();
    var zuori = $("#zuori").val();
    var beginCreateDate = '';
    var endCreateDate = '';
    var dateTime=new Date();
    var now =new Date();
    if(jinri == '1'){

        dateTime=dateTime.setDate(dateTime.getDate()+1);
        dateTime=new Date(dateTime);
        beginCreateDate = dateFormat("YYYY-mm-dd", now);
        endCreateDate = dateFormat("YYYY-mm-dd", dateTime);
    }else if(zuori == '1'){
        dateTime=dateTime.setDate(dateTime.getDate()-1);
        dateTime=new Date(dateTime);
        beginCreateDate = dateFormat("YYYY-mm-dd",dateTime );
        endCreateDate = dateFormat("YYYY-mm-dd", now);
    }



    //传输数据
    var datauser = {
        "orderType":orderType,
        "orderStatus":orderStatus,
        "beginCreateDate":beginCreateDate,
        "endCreateDate":endCreateDate,
        "pageNo":$("#listzijinPageNo").val(),
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
        url: '/gg/order/order/fenxiaolist',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                var titletext = '全部订单';
                if(orderType == '5'){
                    titletext = '课程订单';
                }else if(orderType == '1'){
                    titletext = '会员订单';
                }else if(orderType == '9'){
                    titletext = '服务订单';
                }else if(orderType == '10'){
                    titletext = '商品推广';
                }else if(orderType == '12'){
                    titletext = '问题订单';
                }else if(orderType == '15'){
                    titletext = '拉新订单';
                }else if(orderType == '16'){
                    titletext = '贷款订单';
                }else if(orderType == '17'){
                    titletext = '保险订单';
                }else if(orderType == '18'){
                    titletext = '基金订单';
                }else if(orderType == '19'){
                    titletext = '活动订单';
                }
                $("#titletext").html(titletext);
                $("#nodata").remove();
                if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1' ){
                    $(".weui-toast--text").hide();$.toast("没有更多了", "text");
                }if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '2' ){
                    var nodata = '';
                    nodata += '<div class="weui-panel weui-panel_access linetop  " id="nodata" >';
                    nodata += '<div class="weui-panel__hd" style="text-align: center;">';
                    nodata += '<div class="nickname f-blue" onclick=toindex();>您还没有订单记录，点我去分享>></div>';
                    nodata += '</div>';
                    nodata += '</div>';
                    if($("#nodata").size() <= 0){
                        $("body").append(nodata);
                    }

                }{


                    var str = '';
                    //<div style="-webkit-box-shadow: 2px 2px 5px rgb(222, 222, 222);box-shadow: 2px 2px 5px rgb(222, 222, 222);">
                    $.each(rs.data.result,function(i,item){
                        str += '<div class="kapian"  style="margin-bottom: 10px" >';
                        str += '<li  class="weui-news-item" style="height: 15px !important;min-height: 15px;color: grey;padding-top: 5px;margin-bottom: 10px;">';

                        str += '<div class="weui-news-inner ">';
                        str += ''+item.orderNo+'';
                        str += '</div>';

                        if(item.orderStatus == '1'){
                            str += '<div class="weui-news-inner f-red" style="text-align: right;width: 20%;margin-right: 10px;" >';
                            str += '处理中';
                        }else if(item.orderStatus == '2'){
                            str += '<div class="weui-news-inner f-gray" style="text-align: right;width: 20%;margin-right: 10px;" >';
                            str += '已失效';
                        }else if(item.orderStatus == '3'){
                            str += '<div class="weui-news-inner f-gray" style="text-align: right;width: 20%;margin-right: 10px;" >';
                            str += '已完成';
                        }else if(item.orderStatus == '4'){
                            str += '<div class="weui-news-inner f-gray" style="text-align: right;width: 20%;margin-right: 10px;" >';
                            str += '已失效';
                        }


                        str += '</div>';
                        str += '</li>';





                       /* str += '<li class="weui-news-item" style="height: 15px !important;min-height: 15px;color: grey;margin-top:10px;">';

                        str += '<div class="weui-news-inner f-blue">';
                        str += '<span class="icon icon-84 "></span>'+item.orderName+'';
                        str += '</div>';

                        str += '<div class="weui-news-inner f-blue" style="text-align: right;width: 43%;padding-right: 15px;" >';
                        str += '<span class="icon icon-105"></span><a href="tel:'+item.orderMobile+'" >'+item.orderMobile+'</a>';
                        str += '</div>';
                        str += '</li>';*/


                        if(item.orderType == '5'){
                            str += '<li class="weui-news-item" onclick=toCourseDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '1'){
                            str += '<li class="weui-news-item" onclick=toHuiYuanDetail(\''+item.orderAboutid+'\',\'1\'); >';
                        }else if(item.orderType == '9'){
                            str += '<li class="weui-news-item" onclick=toToolDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '10'){
                            str += '<li class="weui-news-item" onclick=toProductDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '12'){
                            str += '<li class="weui-news-item" onclick=toQuestionDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '15'){
                            str += '<li class="weui-news-item" onclick=toAgentKaDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '16'){
                            str += '<li class="weui-news-item" onclick=toAgentDaikuanDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '17'){
                            str += '<li class="weui-news-item" onclick=toAgentBaoxianDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '18'){
                            str += '<li class="weui-news-item" onclick=toAgentJiJinDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '19'){
                            str += '<li class="weui-news-item" onclick=toActivityDetail("'+item.orderAboutid+'","1"); >';
                        }else{
                            str += '<li class="weui-news-item" >';
                        }


                        str += '<div class="weui-news-inner" >';


                        if(item.orderType == '9' || item.orderType == '11' || item.orderType == '12' || item.orderType == '14'){
                            str += '<div class="weui-news-media shadowonly" style="border-radius: 10px;background-image:url('+checkPathBackGroubdImage(getFirstImageDetailContent(item.shareImage),"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                            str += '<span class="weui-mark-rt bg-green">'+timeagonianyueri(item.createDate)+'</span>';
                        }else{
                            str += '<div class="weui-news-media square shadowonly" style="border-radius: 10px;background-image:url('+checkPathBackGroubdImage(getFirstImageDetailContent(item.shareImage),"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                            str += '<span class="weui-mark-rt bg-green">'+timeagonianyueri(item.createDate)+'</span>';
                        }

                        str += '</div>';
                        str += '<div class="weui-news-inners">';
                        str += '<div class="weui-news-text">';
                        str += '<div class="weui-news-title onerow"  style="font-size: medium;">'+setNULL(item.title)+'</div>';
                        str += '</div>';

                       /* str += '<div class="weui-news-info nickname" onclick=toUserHome("'+item.createBy.id+'","1")>';
                        str += '<div class="weui-news-infoitem" >';
                        str += '<img src="'+checkPath(item.createBy.headimgurl,"1")+'" class="weui-news-round">';
                        str += '<span class="weui-news-left">'+setNULL(item.createBy.nickname)+'</span>';
                        str += '</div>';
                        str += '</div>';*/


                        str += '<div class="weui-news-info">';
                        str += '<div class="weui-news-infoitem">';
                        str += '<span class="weui-news-left" id="weui-news-left">';
                        str += '<div class="weui-label-list" style="margin-left: 0px;">';
                        if(item.orderOver != null && item.orderOver != '' ){//订单否结算等等
                            if(item.orderOver == '1'){
                                str += '<label class="label f-red b-red">已结算</label>';
                            }else{
                                str += '<label class="label f-red b-red">未结算</label>';
                            }

                        }
                        if(item.yuqiagentShouyi != null && item.yuqiagentShouyi != '' && localStorage.getItem("userTeacher") != '1'){
                            //str += '<label class="label f-red b-red">'+item.yongjin+'</label>';

                            if(item.butie != null && item.butie != '' && item.butie != '0'){
                                str += '<label class="label f-red b-red">￥'+item.yuqiagentShouyi+'+'+item.butie+'</label>';
                            }else{
                                str += '<label class="label f-red b-red">￥'+item.yuqiagentShouyi+'</label>';

                            }
                        }

                        if(item.jiesuanshijain != null && item.jiesuanshijain != ''){
                            str += '<label class="label f-blue b-blue">'+item.jiesuanshijain+'</label>';
                        }
                        str += '</div>';
                        str += '</span>';
                        str += '</div>';
                        str += '</div>';
                        str += '</div>';
                        str += '</div>';


                        str += '</li>';



                        str += '<li class="weui-news-item" style="height: 15px !important;min-height: 15px;color: grey;margin-top:10px;">';

                        str += '<div class="weui-news-inner f-black">';
                        str += '<span class="icon icon-84 right2"></span>'+item.orderName+'';
                        str += '</div>';

                        str += '<div class="weui-news-inner f-black" style="text-align: right;width: 43%;padding-right: 15px;" >';
                        str += '<span class="icon icon-105 right2"></span><a href="tel:'+item.orderMobile+'" style="color: black" >'+item.orderMobile+'</a>';
                        str += '</div>';
                        str += '</li>';

                        if(item.orderCardno != null && item.orderCardno != '' && item.orderCardno != '0'){
                            str += '<li class="weui-news-item" style="height: 15px !important;min-height: 15px;color: grey;margin-top:10px;">';

                            str += '<div class="weui-news-inner f-black">';
                            str += '<span class="icon icon-67 right2"></span>'+item.orderCardno+'';
                            str += '</div>';
                            str += '</li>';
                        }


                        // str += '<li class="weui-news-item" style="height: 15px !important;color: grey;margin-bottom:10px;">';

                        str += '<div class="page-bd-15 top15 " style="padding-bottom: 10px;margin-bottom: 10px;">';
                        str += '<div class="weui-feeds">';
                        str += '<ul>';
                        if(item.jtfour !=null && item.jtfour != ''){

                        }else{
                            str += '<li></li>';

                        }

                        var imgstr = '';
                        var name = '';
                        if(item.jtone !=null && item.jtone != ''){
                            imgstr += item.jtone +',';
                            name += '截图一,';
                        }
                        if(item.jttwo !=null && item.jttwo != ''){
                            imgstr += item.jttwo+',';
                            name += '截图二,';
                        }
                        if(item.jtthree !=null && item.jtthree != ''){
                            imgstr += item.jtthree+',';
                            name += '截图三,';
                        }
                        if(item.jtfour !=null && item.jtfour != ''){
                            imgstr += item.jtfour+',';
                            name += '截图四,';
                        }
                        if(imgstr != null && imgstr != ''){
                            imgstr = imgstr.substring(0,imgstr.length-1);
                            name = name.substring(0,name.length-1);
                            str += getImageContentproJiaodan('laxinid',imgstr,name);
                        }



                        str += '</ul>';
                        str += '</ul>';
                        str += '</div>';
                        str += '</div>';


                        /*str += '<li class="weui-news-item" style="height: 15px !important;color: grey;margin-bottom:10px;">';
                        if(true){

                            if(item.laxin == '1'){

                                if(item.jtone != null && item.jtone != ''){
                                    str += '<div class="weui-news-inner f-red">';
                                    str += '<a href="'+checkPath(item.jtone,'2')+'" target="_blank" >截图一</a>';
                                    str += '</div>';
                                }



                                if(item.jttwo != null && item.jttwo != ''){
                                    str += '<div class="weui-news-inner f-red">';
                                    str += '<a href="'+checkPath(item.jttwo,'2')+'" target="_blank">截图二</a>';
                                    str += '</div>';
                                }

                                if(item.jtthree != null && item.jtthree != ''){
                                    str += '<div class="weui-news-inner f-red">';
                                    str += '<a href="'+checkPath(item.jtthree,'2')+'" target="_blank">截图三</a>';
                                    str += '</div>';
                                }
                            }
                        }
                        str += '</li>';
*/

                        if(item.orderStatus == '4'){
                            str += '<li class="weui-news-item" style="height: 15px !important;color: grey;margin-bottom:10px;">';
                            str += '<div class=" f-red">';
                            str += '<span style="font-weight: bolder;">原因:</span>'+setNULL(item.sxyy)+'';
                            str += '</div>';
                            if(item.laxin == '1' && new Date().getTime() - new Date(item.createDate).getTime() < 86400000 ){
                                str += '<div class="f-white" onclick=toMyKadetail("'+item.id+'","1") >';
                                str += '<span  style="text-align: right;width: 27%;padding: 5px;height: 25px;margin-right: 15px;border-radius: 15px; padding-left: 15px;padding-right: 15px;background-color: #F44336;">重新提交</span>';
                                str += '</div>';


                            }
                            str += '</li>';
                        }

                        str += '</div>';



                    });


                    if(renderType == "1"){
                        $("#"+rederId+"").append(str);
                    }else{
                        $("#"+rederId+"").html(str);
                    }
                    $("#dis"+rederId+"").show();

                }


            }
        }else{
            console.log('请求异常！')
        }

    });

}
function getTuiguangOrderlist3(rederId,renderType,proType){
    //分页
    var pageNoTemp = $("#listzijinPageNo").val();
    if(pageNoTemp > 0){
        $("#listzijinPageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listzijinPageNo' value='1' >");
    }
    //参数
    var token = localStorage.getItem('token');
    var orderAboutid = GetUrlString("id");
    var orderType = proType;
    var orderStatus = $("#orderStatus").val();
    var jinri = $("#jinri").val();
    var zuori = $("#zuori").val();
    var beginCreateDate = '';
    var endCreateDate = '';
    var dateTime=new Date();
    var now =new Date();
    if(jinri == '1'){

        dateTime=dateTime.setDate(dateTime.getDate()+1);
        dateTime=new Date(dateTime);
        beginCreateDate = dateFormat("YYYY-mm-dd", now);
        endCreateDate = dateFormat("YYYY-mm-dd", dateTime);
    }else if(zuori == '1'){
        dateTime=dateTime.setDate(dateTime.getDate()-1);
        dateTime=new Date(dateTime);
        beginCreateDate = dateFormat("YYYY-mm-dd",dateTime );
        endCreateDate = dateFormat("YYYY-mm-dd", now);
    }



    //传输数据
    var datauser = {
        "orderType":orderType,
        "orderStatus":orderStatus,
        "orderAboutid":orderAboutid,
        "beginCreateDate":beginCreateDate,
        "endCreateDate":endCreateDate,
        "pageNo":$("#listzijinPageNo").val(),
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
        url: '/gg/order/order/fenxiaoprolist',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                var titletext = '全部订单';
                if(orderType == '5'){
                    titletext = '课程订单';
                }else if(orderType == '1'){
                    titletext = '会员订单';
                }else if(orderType == '9'){
                    titletext = '服务订单';
                }else if(orderType == '10'){
                    titletext = '商品推广';
                }else if(orderType == '12'){
                    titletext = '问题订单';
                }else if(orderType == '15'){
                    titletext = '拉新订单';
                }else if(orderType == '16'){
                    titletext = '贷款订单';
                }else if(orderType == '17'){
                    titletext = '保险订单';
                }else if(orderType == '18'){
                    titletext = '基金订单';
                }else if(orderType == '19'){
                    titletext = '活动订单';
                }
                $("#titletext").html(titletext);
                $("#nodata").remove();
                if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1' ){
                    $(".weui-toast--text").hide();$.toast("没有更多了", "text");
                }if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '2' ){
                    var nodata = '';
                    nodata += '<div class="weui-panel weui-panel_access linetop  " id="nodata" >';
                    nodata += '<div class="weui-panel__hd" style="text-align: center;">';
                    nodata += '<div class="nickname f-blue" onclick=toMingpian();>您的项目还没有订单记录，点我去分享>></div>';
                    nodata += '</div>';
                    nodata += '</div>';
                    if($("#nodata").size() <= 0){
                        $("body").append(nodata);
                    }

                }{


                    var str = '';
                    //<div style="-webkit-box-shadow: 2px 2px 5px rgb(222, 222, 222);box-shadow: 2px 2px 5px rgb(222, 222, 222);">
                    $.each(rs.data.result,function(i,item){
                        str += '<div class="kapian top15" style="margin-bottom: 10px" >';
                        str += '<li  class="weui-news-item" style="height: 15px !important;min-height: 15px;color: grey;padding-top: 5px;margin-bottom: 10px;">';

                        str += '<div class="weui-news-inner ">';
                        str += ''+item.orderNo+'';
                        str += '</div>';

                        if(item.orderStatus == '1'){
                            str += '<div class="weui-news-inner f-red" style="text-align: right;width: 20%;margin-right: 10px;" >';
                            str += '待处理';
                        }else if(item.orderStatus == '2'){
                            str += '<div class="weui-news-inner f-gray" style="text-align: right;width: 20%;margin-right: 10px;" >';
                            str += '已失效';
                        }else if(item.orderStatus == '3'){
                            str += '<div class="weui-news-inner f-gray" style="text-align: right;width: 20%;margin-right: 10px;" >';
                            str += '已完成';
                        }else if(item.orderStatus == '4'){
                            str += '<div class="weui-news-inner f-gray" style="text-align: right;width: 20%;margin-right: 10px;" >';
                            str += '已失效';
                        }


                        str += '</div>';
                        str += '</li>';








                        if(item.orderType == '5'){
                            str += '<li class="weui-news-item" onclick=toCourseDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '1'){
                            str += '<li class="weui-news-item" onclick=toHuiYuanDetail(\''+item.orderAboutid+'\',\'1\'); >';
                        }else if(item.orderType == '9'){
                            str += '<li class="weui-news-item" onclick=toToolDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '10'){
                            str += '<li class="weui-news-item" onclick=toProductDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '12'){
                            str += '<li class="weui-news-item" onclick=toQuestionDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '15'){
                            str += '<li class="weui-news-item" onclick=toAgentKaDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '16'){
                            str += '<li class="weui-news-item" onclick=toAgentDaikuanDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '17'){
                            str += '<li class="weui-news-item" onclick=toAgentBaoxianDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '18'){
                            str += '<li class="weui-news-item" onclick=toAgentJiJinDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '19'){
                            str += '<li class="weui-news-item" onclick=toActivityDetail("'+item.orderAboutid+'","1"); >';
                        }else{
                            str += '<li class="weui-news-item" >';
                        }


                        str += '<div class="weui-news-inner" >';


                        if( item.orderType == '9' || item.orderType == '11' || item.orderType == '12' || item.orderType == '14'){
                            str += '<div class="weui-news-media shadowonly" style="border-radius: 10px;background-image:url('+checkPathBackGroubdImage(getFirstImageDetailContent(item.shareImage),"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                            str += '<span class="weui-mark-rt bg-green">'+timeagonianyueri(item.createDate)+'</span>';
                        }else{
                            str += '<div class="weui-news-media square shadowonly" style="border-radius: 10px;background-image:url('+checkPathBackGroubdImage(getFirstImageDetailContent(item.shareImage),"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                            str += '<span class="weui-mark-rt bg-green">'+timeagonianyueri(item.createDate)+'</span>';
                        }

                        str += '</div>';
                        str += '<div class="weui-news-inners">';
                        str += '<div class="weui-news-text">';
                        str += '<div class="weui-news-title onerow" style="font-size: medium;">'+setNULL(item.title)+'</div>';
                        str += '</div>';

                        /* str += '<div class="weui-news-info nickname" onclick=toUserHome("'+item.createBy.id+'","1")>';
                         str += '<div class="weui-news-infoitem" >';
                         str += '<img src="'+checkPath(item.createBy.headimgurl,"1")+'" class="weui-news-round">';
                         str += '<span class="weui-news-left">'+setNULL(item.createBy.nickname)+'</span>';
                         str += '</div>';
                         str += '</div>';*/


                        str += '<div class="weui-news-info">';
                        str += '<div class="weui-news-infoitem">';
                        str += '<span class="weui-news-left" id="weui-news-left">';
                        str += '<div class="weui-label-list" style="margin-left: 0px;">';
                        /*if(item.orderOver != null && item.orderOver != '' ){//订单否结算等等
                            if(item.orderOver == '1'){
                                str += '<label class="label f-red b-red">已结算</label>';
                            }else{
                                str += '<label class="label f-red b-red">未结算</label>';
                            }

                        }*/
                        if(item.orderMoney != null && item.orderMoney != ''){

                            if(item.butie != null && item.butie != '' && item.butie != '0'){
                                str += '<label class="label f-red b-red">￥'+item.orderMoney+'+'+item.butie+'(平台补贴)</label>';

                            }else{
                                str += '<label class="label f-red b-red">￥'+item.orderMoney+'</label>';

                            }

                        }

                        /*if(item.jiesuanshijain != null && item.jiesuanshijain != ''){
                            str += '<label class="label f-blue b-blue">'+item.jiesuanshijain+'</label>';
                        }*/
                        str += '</div>';
                        str += '</span>';
                        str += '</div>';
                        str += '</div>';
                        str += '</div>';
                        str += '</div>';


                        str += '</li>';


                        str += '<li class="weui-news-item" style="height: 15px !important;min-height: 15px;color: grey;margin-top:10px;">';

                        str += '<div class="weui-news-inner f-black">';
                        str += '<span class="icon icon-84 right2"></span>'+item.orderName+'';
                        str += '</div>';

                        str += '<div class="weui-news-inner f-black" style="text-align: right;width: 43%;padding-right: 15px;" >';
                        str += '<span class="icon icon-105 right2"></span><a href="tel:'+item.orderMobile+'" style="color: black" >'+item.orderMobile+'</a>';
                        str += '</div>';
                        str += '</li>';


                        if(item.orderCardno != null && item.orderCardno != '' && item.orderCardno != '0'){
                            str += '<li class="weui-news-item" style="height: 15px !important;min-height: 15px;color: grey;margin-top:10px;">';

                            str += '<div class="weui-news-inner f-black">';
                            str += '<span class="icon icon-67 right2"></span>'+item.orderCardno+'';
                            str += '</div>';
                            str += '</li>';
                        }


                       // str += '<li class="weui-news-item" style="height: 15px !important;color: grey;margin-bottom:10px;">';

                        str += '<div class="page-bd-15 top15 " style="padding-bottom: 10px;">';
                        str += '<div class="weui-feeds">';
                        str += '<ul>';
                        if(item.jtfour !=null && item.jtfour != ''){

                        }else{
                            str += '<li></li>';

                        }

                        var imgstr = '';
                        var name = '';
                        if(item.jtone !=null && item.jtone != ''){
                            imgstr += item.jtone +',';
                            name += '截图一,';
                        }
                        if(item.jttwo !=null && item.jttwo != ''){
                            imgstr += item.jttwo+',';
                            name += '截图二,';
                        }
                        if(item.jtthree !=null && item.jtthree != ''){
                            imgstr += item.jtthree+',';
                            name += '截图三,';
                        }
                        if(item.jtfour !=null && item.jtfour != ''){
                            imgstr += item.jtfour+',';
                            name += '截图四,';
                        }
                        if(imgstr != null && imgstr != ''){
                            imgstr = imgstr.substring(0,imgstr.length-1);
                            name = name.substring(0,name.length-1);
                            str += getImageContentproJiaodan('laxinid',imgstr,name);
                        }



                        str += '</ul>';
                        str += '</ul>';
                        str += '</div>';
                        str += '</div>';

/*
                        if(true){

                            if(item.laxin == '1'){

                                if(item.jtone != null && item.jtone != ''){
                                    str += '<div class="weui-news-inner f-red">';
                                    str += '<a href="'+checkPath(item.jtone,'2')+'" target="_blank" >截图一</a>';
                                    str += '</div>';
                                }



                                if(item.jttwo != null && item.jttwo != ''){
                                    str += '<div class="weui-news-inner f-red">';
                                    str += '<a href="'+checkPath(item.jttwo,'2')+'" target="_blank">截图二</a>';
                                    str += '</div>';
                                }

                                if(item.jtthree != null && item.jtthree != ''){
                                    str += '<div class="weui-news-inner f-red">';
                                    str += '<a href="'+checkPath(item.jtthree,'2')+'" target="_blank">截图三</a>';
                                    str += '</div>';
                                }
                            }
                        }*/
                        //str += '</li>';


                        if(item.orderStatus == '4'){
                            str += '<li class="weui-news-item" style="height: 15px !important;color: grey;margin-bottom:10px;">';
                            str += '<div class=" f-red">';
                            str += '<span style="font-weight: bolder;">原因:</span>'+setNULL(item.sxyy)+'';
                            str += '</div>';
                            if(item.laxin == '1' && new Date().getTime() - new Date(item.createDate).getTime() < 86400000 ){
                                str += '<div class="f-white" onclick=toMyKadetail("'+item.id+'","1") >';
                                str += '<span  style="text-align: right;width: 27%;padding: 5px;height: 25px;margin-right: 15px;border-radius: 15px; padding-left: 15px;padding-right: 15px;background-color: #F44336;">重新提交</span>';
                                str += '</div>';


                            }
                            str += '</li>';
                        }

                        if(item.orderStatus == '1'){
                            str += '<div class="" style="padding-bottom: 10px;text-align: center;">';
                            str += '<a  onclick=setwuxiao("'+item.id+'"); class="weui-btn weui-btn_mini weui-btn_warn" style="border-radius: 50px;">设为无效</a>';
                            str += '<a onclick=dealOrder("'+item.id+'") class="weui-btn weui-btn_mini weui-btn_warn" style="border-radius: 50px;margin-left: 20px">发放佣金</a>';
                            str += '</div>';
                        }


                        str += '</div>';



                    });


                    if(renderType == "1"){
                        $("#"+rederId+"").append(str);
                    }else{
                        $("#"+rederId+"").html(str);
                    }
                    $("#dis"+rederId+"").show();

                }


            }
        }else{
            console.log('请求异常！')
        }

    });

}

function getTuiguangOrderlist2(rederId,renderType,proType){
    //分页
    var pageNoTemp = $("#listzijinPageNo").val();
    if(pageNoTemp > 0){
        $("#listzijinPageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listzijinPageNo' value='1' >");
    }
    //参数
    var token = localStorage.getItem('token');

    var orderType = proType;
    var orderStatus = $("#orderStatus").val();
    var jinri = $("#jinri").val();
    var zuori = $("#zuori").val();
    var beginCreateDate = '';
    var endCreateDate = '';
    var dateTime=new Date();
    var now =new Date();
    if(jinri == '1'){

        dateTime=dateTime.setDate(dateTime.getDate()+1);
        dateTime=new Date(dateTime);
        beginCreateDate = dateFormat("YYYY-mm-dd", now);
        endCreateDate = dateFormat("YYYY-mm-dd", dateTime);
    }else if(zuori == '1'){
        dateTime=dateTime.setDate(dateTime.getDate()-1);
        dateTime=new Date(dateTime);
        beginCreateDate = dateFormat("YYYY-mm-dd",dateTime );
        endCreateDate = dateFormat("YYYY-mm-dd", now);
    }
    if(orderStatus == '1'){
        orderStatus = '4';
    }


    //传输数据
    var datauser = {
        "orderType":orderType,
        "orderStatus":orderStatus,
        "beginCreateDate":beginCreateDate,
        "endCreateDate":endCreateDate,
        "pageNo":$("#listzijinPageNo").val(),
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "id":GetUrlString("id")
    }

    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/order/order/fenxiaolist2',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                var titletext = '全部订单';
                if(orderType == '5'){
                    titletext = '课程订单';
                }else if(orderType == '1'){
                    titletext = '会员订单';
                }else if(orderType == '9'){
                    titletext = '服务订单';
                }else if(orderType == '10'){
                    titletext = '商品推广';
                }else if(orderType == '12'){
                    titletext = '问题订单';
                }else if(orderType == '15'){
                    titletext = '拉新订单';
                }else if(orderType == '16'){
                    titletext = '贷款订单';
                }else if(orderType == '17'){
                    titletext = '保险订单';
                }else if(orderType == '18'){
                    titletext = '基金订单';
                }else if(orderType == '19'){
                    titletext = '活动订单';
                }
                $("#titletext").html(titletext);

                if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1' ){
                    $(".weui-toast--text").hide();$.toast("没有更多了", "text");
                }if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '2' ){
                    var nodata = '';
                    nodata += '<div class="weui-panel weui-panel_access linetop  " id="nodata" >';
                    nodata += '<div class="weui-panel__hd" style="text-align: center;">';
                    nodata += '<div class="nickname f-blue" onclick=toMingpian();>您还没有分享订单记录，点我去分享>></div>';
                    nodata += '</div>';
                    nodata += '</div>';
                    if($("#nodata").size() <= 0){
                        $("body").append(nodata);
                    }

                }{


                    var str = '';
                    //<div style="-webkit-box-shadow: 2px 2px 5px rgb(222, 222, 222);box-shadow: 2px 2px 5px rgb(222, 222, 222);">
                    $.each(rs.data.result,function(i,item){
                        str += '<div class="kapian" style="margin-top:10px;" >';
                        str += '<li  class="weui-news-item"  style="height: 15px !important;min-height: 15px;color: grey;padding-top: 5px;margin-bottom: 10px;">';

                        str += '<div class="weui-news-inner ">';
                        str += ''+item.orderNo+'';
                        str += '</div>';

                        if(item.orderStatus == '1'){
                            str += '<div class="weui-news-inner f-red" style="text-align: right;width: 20%;margin-right: 10px;" >';
                            str += '处理中';
                        }else if(item.orderStatus == '2'){
                            str += '<div class="weui-news-inner f-gray" style="text-align: right;width: 20%;margin-right: 10px;" >';
                            str += '已失效';
                        }else if(item.orderStatus == '3'){
                            str += '<div class="weui-news-inner f-gray" style="text-align: right;width: 20%;margin-right: 10px;" >';
                            str += '已完成';
                        }else if(item.orderStatus == '4'){
                            str += '<div class="weui-news-inner f-gray" style="text-align: right;width: 20%;margin-right: 10px;" >';
                            str += '已失效';
                        }


                        str += '</div>';
                        str += '</li>';




/*

                        str += '<li class="weui-news-item" style="height: 15px !important;min-height: 15px;color: grey;margin-top:10px;">';

                        str += '<div class="weui-news-inner f-blue">';
                        str += '<span class="icon icon-84 "></span>'+item.orderName+'';
                        str += '</div>';

                        str += '<div class="weui-news-inner f-blue" style="text-align: right;width: 43%;padding-right: 15px;" >';
                        str += '<span class="icon icon-105"></span><a href="tel:'+item.orderMobile+'" >'+item.orderMobile+'</a>';
                        str += '</div>';
                        str += '</li>';
*/


                        if(item.orderType == '5'){
                            str += '<li class="weui-news-item" onclick=toCourseDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '1'){
                            str += '<li class="weui-news-item" onclick=toHuiYuanDetail(\''+item.orderAboutid+'\',\'1\'); >';
                        }else if(item.orderType == '9'){
                            str += '<li class="weui-news-item" onclick=toToolDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '10'){
                            str += '<li class="weui-news-item" onclick=toProductDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '12'){
                            str += '<li class="weui-news-item" onclick=toQuestionDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '15'){
                            str += '<li class="weui-news-item" onclick=toAgentKaDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '16'){
                            str += '<li class="weui-news-item" onclick=toAgentDaikuanDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '17'){
                            str += '<li class="weui-news-item" onclick=toAgentBaoxianDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '18'){
                            str += '<li class="weui-news-item" onclick=toAgentJiJinDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '19'){
                            str += '<li class="weui-news-item" onclick=toActivityDetail("'+item.orderAboutid+'","1"); >';
                        }else{
                            str += '<li class="weui-news-item" >';
                        }


                        str += '<div class="weui-news-inner" >';


                        if(item.orderType == '9' || item.orderType == '11' || item.orderType == '12' || item.orderType == '14'){
                            str += '<div class="weui-news-media shadowonly" style="border-radius: 10px;background-image:url('+checkPathBackGroubdImage(getFirstImageDetailContent(item.shareImage),"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                            str += '<span class="weui-mark-rt bg-green">'+timeagonianyueri(item.createDate)+'</span>';
                        }else{
                            str += '<div class="weui-news-media square shadowonly" style="border-radius: 10px;background-image:url('+checkPathBackGroubdImage(getFirstImageDetailContent(item.shareImage),"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                            str += '<span class="weui-mark-rt bg-green">'+timeagonianyueri(item.createDate)+'</span>';
                        }

                        str += '</div>';
                        str += '<div class="weui-news-inners">';
                        str += '<div class="weui-news-text">';
                        str += '<div class="weui-news-title onerow" style="font-size: medium">'+setNULL(item.title)+'</div>';
                        str += '</div>';

                        /* str += '<div class="weui-news-info nickname" onclick=toUserHome("'+item.createBy.id+'","1")>';
                         str += '<div class="weui-news-infoitem" >';
                         str += '<img src="'+checkPath(item.createBy.headimgurl,"1")+'" class="weui-news-round">';
                         str += '<span class="weui-news-left">'+setNULL(item.createBy.nickname)+'</span>';
                         str += '</div>';
                         str += '</div>';*/


                        str += '<div class="weui-news-info">';
                        str += '<div class="weui-news-infoitem">';
                        str += '<span class="weui-news-left" id="weui-news-left">';
                        str += '<div class="weui-label-list" style="margin-left: 0px;">';
                        if(item.orderOver != null && item.orderOver != '' ){//订单否结算等等
                            if(item.orderOver == '1'){
                                str += '<label class="label f-red b-red">已结算</label>';
                            }else{
                                str += '<label class="label f-red b-red">未结算</label>';
                            }

                        }
                        if(item.yuqiagentShouyi != null && item.yuqiagentShouyi != '' && localStorage.getItem("userTeacher") != '1'){
                            //str += '<label class="label f-red b-red">'+item.yongjin+'</label>';

                            if(item.butie != null && item.butie != '' && item.butie != '0'){
                                str += '<label class="label f-red b-red">￥'+item.yuqiagentShouyi+'+'+item.butie+'</label>';
                            }else{
                                str += '<label class="label f-red b-red">￥'+item.yuqiagentShouyi+'</label>';

                            }
                        }

                        if(item.jiesuanshijain != null && item.jiesuanshijain != ''){
                            str += '<label class="label f-blue b-blue">'+item.jiesuanshijain+'</label>';
                        }
                        str += '</div>';
                        str += '</span>';
                        str += '</div>';
                        str += '</div>';
                        str += '</div>';
                        str += '</div>';


                        str += '</li>';



                        str += '<li class="weui-news-item" style="height: 15px !important;min-height: 15px;color: grey;margin-top:10px;">';

                        str += '<div class="weui-news-inner f-black">';
                        str += '<span class="icon icon-84 right2"></span>'+item.orderName+'';
                        str += '</div>';

                        str += '<div class="weui-news-inner f-black" style="text-align: right;width: 43%;padding-right: 15px;" >';
                        str += '<span class="icon icon-105 right2"></span><a href="tel:'+item.orderMobile+'" style="color: black" >'+item.orderMobile+'</a>';
                        str += '</div>';
                        str += '</li>';


                        if(item.orderCardno != null && item.orderCardno != '' && item.orderCardno != '0'){
                            str += '<li class="weui-news-item" style="height: 15px !important;min-height: 15px;color: grey;margin-top:10px;">';

                            str += '<div class="weui-news-inner f-black">';
                            str += '<span class="icon icon-67 right2"></span>'+item.orderCardno+'';
                            str += '</div>';
                            str += '</li>';
                        }


                        // str += '<li class="weui-news-item" style="height: 15px !important;color: grey;margin-bottom:10px;">';

                        str += '<div class="page-bd-15 top15 " style="padding-bottom: 10px;margin-bottom: 10px;">';
                        str += '<div class="weui-feeds">';
                        str += '<ul>';
                        if(item.jtfour !=null && item.jtfour != ''){

                        }else{
                            str += '<li></li>';

                        }

                        var imgstr = '';
                        var name = '';
                        if(item.jtone !=null && item.jtone != ''){
                            imgstr += item.jtone +',';
                            name += '截图一,';
                        }
                        if(item.jttwo !=null && item.jttwo != ''){
                            imgstr += item.jttwo+',';
                            name += '截图二,';
                        }
                        if(item.jtthree !=null && item.jtthree != ''){
                            imgstr += item.jtthree+',';
                            name += '截图三,';
                        }
                        if(item.jtfour !=null && item.jtfour != ''){
                            imgstr += item.jtfour+',';
                            name += '截图四,';
                        }
                        if(imgstr != null && imgstr != ''){
                            imgstr = imgstr.substring(0,imgstr.length-1);
                            name = name.substring(0,name.length-1);
                            str += getImageContentproJiaodan('laxinid',imgstr,name);
                        }



                        str += '</ul>';
                        str += '</ul>';
                        str += '</div>';
                        str += '</div>';


                        if(item.orderStatus == '4'){
                            str += '<li class="weui-news-item" style="height: 15px !important;color: grey;margin-bottom:10px;">';
                            str += '<div class=" f-red">';
                            str += '<span style="font-weight: bolder;">原因:</span>'+setNULL(item.sxyy)+'';
                            str += '</div>';
                            if(item.laxin == '1' && new Date().getTime() - new Date(item.createDate).getTime() < 86400000 ){
                               /* str += '<div class="f-white" onclick=toMyKadetail("'+item.id+'","1") >';
                                str += '<span  style="text-align: right;width: 27%;padding: 5px;height: 25px;margin-right: 15px;border-radius: 15px; padding-left: 15px;padding-right: 15px;background-color: #F44336;">重新提交</span>';
                                str += '</div>';*/


                            }
                            str += '</li>';
                        }

                        str += '</div>';



                    });


                    if(renderType == "1"){
                        $("#"+rederId+"").append(str);
                    }else{
                        $("#"+rederId+"").html(str);
                    }
                    $("#dis"+rederId+"").show();

                }


            }
        }else{
            console.log('请求异常！')
        }

    });

}


function tipswsj() {
    $.toast("对不起，项目还未上架！","text");
}


//获取详情数据
function getTeamlist(rederId,renderType,proType){
    //分页
    var pageNoTemp = $("#listzijinPageNo").val();
    if(pageNoTemp > 0){
        $("#listzijinPageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listzijinPageNo' value='1' >");
    }
    //参数
    var token = localStorage.getItem('token');
    var url = '/sys/user/userTeamlist';
    if(proType == '2'){//临时锁粉
        url = '/sys/user/userLinshiTeamlist';
    }else if(proType == '3'){
        url = '/sys/user/userUpUser';
    }else if(proType == '4'){//直属
        url = '/sys/user/userTeamlist2';
    }else if(proType == '5'){//员工
        url = '/sys/user/userTeamlist3';
    }else if(proType == '6'){//客户
        url = '/sys/user/userTeamlist4';
    }
    //传输数据
    var datauser = {
        "pageNo":$("#listzijinPageNo").val(),
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
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                var titletext = '我的团队成员';
                if(proType == '1'){
                    titletext = '我的团队成员';
                }if(proType == '2'){
                    titletext = '临时锁粉记录';
                }
                $("#titletext").html(titletext);

                if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1' ){
                    $(".weui-toast--text").hide();$.toast("没有更多了", "text");
                }if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '2' ){
                    var nodata = '';
                    nodata += '<div class="weui-panel weui-panel_access linetop  " id="nodata" >';
                    nodata += '<div class="weui-panel__hd" style="text-align: center;">';
                    nodata += '<div class="nickname f-blue" onclick=toMingpian(); >您还没有团队成员记录，点我去分享>></div>';
                    nodata += '</div>';
                    nodata += '</div>';
                    $("body").append(nodata);
                }{

                    if(proType == '3'){

                        if(rs.data.result.id != null){
                            var str = '';
                            str += '<a class="weui-cell weui-cell_access myweui-cell " onclick=toUserHome("'+rs.data.result.id+'","1") >';
                            str += '<div class="weui-cell__hd shadowonly" style="background-image:url('+checkPathBackGroubdImage(rs.data.result.headimgurl,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;width: 45px;height:45px;border-radius:10px;"></div>';
                            str += '<div class="weui-cell__bd">';
                            str += '<div class="weui-news-text">';
                            str += '<div class="weui-news-title onerow">'+setNULL(rs.data.result.nickname)+'</div>';
                            str += '</div>';

                            str += '</div>';
                            str += '</a>';
                            $("#upuser").html(str);
                            $("#upuserinfo").show();
                        }
                    }else if(proType == '6'){



                    }else{
                        var str = '';
                        $.each(rs.data.result,function(i,item){
                            str += '<div class="kapian" style="margin-top:10px;">';

                            str += '<a class="weui-cell weui-cell_access myweui-cell " onclick=toUserHome("'+item.id+'","1")>';
                            str += '<div class="weui-cell__hd shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.headimgurl,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;width: 45px;height:45px;border-radius:10px;"></div>';
                            str += '<div class="weui-cell__bd">';
                            str += '<div class="weui-news-text">';
                            if(item.userLevel == '普通会员'){
                                str += '<div class="weui-news-title onerow" onclick=toHuiyuanByType()><span class="f-white shadowonly" style="background-color: gray;border-radius: 30px;padding-left: 10px;padding-right: 10px;padding-top: 3px;padding-bottom: 3px;margin-right: 10px;">'+setNULL(item.userLevel)+'</span>'+setNULL(item.nickname)+'</div>';
                            }else{
                                str += '<div class="weui-news-title onerow"><span class="f-white shadowonly" style="background-color: #FF0000;border-radius: 30px;padding-left: 10px;padding-right: 10px;padding-top: 3px;padding-bottom: 3px;margin-right: 10px;">'+setNULL(item.userLevel)+'</span>'+setNULL(item.nickname)+'</div>';
                            }
                            str += '</div>';
                            str += '<div class="weui-news-info mynesinfo">';
                            str += '<div class="weui-news-infoitem">';
                            if(item.createDate != null){
                                str += '<i class="beauty icon-shijian" id="icon33"></i>'+timeagonianyueri(item.createDate)+'';
                            }
                            str += '</div>';

                            str += '<div class="weui-news-infoitem">';

                            if(item.isZhi == '1'){
                                str += '<span style="color: red">直属下级</span>';
                            }else{
                                str += '非直属下级';
                            }

                            str += '</div>';
                            str += '</div>';

                            str += '</div>';
                            str += '</a>';

                            /*快捷菜单*/
                            str += '<div class="top10 bottom5">';
                            if(localStorage.getItem("userTeacher") != '1') {
                                str += '<div class="weui-grids" onclick=toZiJinOtherList("'+item.id+'")>';
                                str += '<a  class="grid" style="padding: 5px 0px;">';
                                str += '<div class="weui-grid__label  f18" >';
                                str += ''+item.a1+'';
                                str += '</div>';
                                str += '<p class="weui-grid__label f-gray top10">';
                                str += '累计收益(元)';
                                str += '</p>';
                                str += '</a>';
                                str += '<a  class="grid" style="padding: 5px 0px;">';
                                str += '<div class="weui-grid__label  f18" >';
                                str += ''+item.a2+'';
                                str += '</div>';
                                str += '<p class="weui-grid__label f-gray top10">';
                                str += '今日收益(元)';
                                str += '</p>';
                                str += '</a>';

                                str += '<a  class="grid" style="padding: 5px 0px;">';
                                str += '<div class="weui-grid__label  f18"  >';
                                str += ''+item.a3+'';
                                str += '</div>';
                                str += '<p class="weui-grid__label f-gray top10">';
                                str += '昨日收益(元)';
                                str += '</p>';
                                str += '</a>';
                                str += '</div>';
                            }

                            str += '<div class="weui-grids" >';
                            str += '<a  class="grid"  onclick=tohtmlall("dailidingdanother.html?id='+item.id+'") style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.b1+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '总订单数(单)';
                            str += '</p>';
                            str += '</a>';
                            str += '<a  class="grid" onclick=tohtmlall("dailidingdanother.html?id='+item.id+'")   style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.b2+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '今日单数(单)';
                            str += '</p>';
                            str += '</a>';

                            str += '<a  class="grid"  onclick=tohtmlall("dailidingdanother.html?id='+item.id+'")   style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18"  >';
                            str += ''+item.b3+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '昨日单数(单)';
                            str += '</p>';
                            str += '</a>';
                            str += '</div>';


                            str += '<div class="weui-grids">';
                            str += '<a  class="grid"  onclick=tohtmlall("kehuchengyuanother.html?id='+item.id+'")  style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.c1+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '客户总数(人)';
                            str += '</p>';
                            str += '</a>';
                            str += '<a  class="grid" onclick=tohtmlall("kehuchengyuanother.html?id='+item.id+'")   style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.c2+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '今日客户(人)';
                            str += '</p>';
                            str += '</a>';

                            str += '<a  class="grid" onclick=tohtmlall("kehuchengyuanother.html?id='+item.id+'")  style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18"  >';
                            str += ''+item.c3+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '昨日客户(人)';
                            str += '</p>';
                            str += '</a>';
                            str += '</div>';

                            str += '<div class="weui-grids">';
                            str += '<a  class="grid" style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.d1+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '团队成员(人)';
                            str += '</p>';
                            str += '</a>';
                            str += '<a  class="grid" style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.d2+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '今日团队(人)';
                            str += '</p>';
                            str += '</a>';

                            str += '<a  class="grid" style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18"  >';
                            str += ''+item.d3+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '昨日团队(人)';
                            str += '</p>';
                            str += '</a>';
                            str += '</div>';

                            if(item.userTeacher == '1' && localStorage.getItem("userLevel") != '0' &&  localStorage.getItem("daili") == '1'){
                                str += '<div class="weui-grids" >';
                                str += '<a  onclick=toZiJinOtherList('+item.id+') class="grid" style="padding: 5px 0px;">';
                                str += '<div class="weui-grid__label  f18" >';
                                str += ''+setNULL(item.money)+'';
                                str += '</div>';
                                str += '<p class="weui-grid__label f-gray top10">';
                                str += '余额';
                                str += '</p>';
                                str += '</a>';

                                str += '<a  class="grid" style="padding: 5px 0px;">';
                                str += '<a  onclick=tohtmlall("tixianyuangong.html?ygId='+item.id+'")   class="weui-btn weui-btn_mini weui-btn_warn" style="    margin-left: 30px; margin-top: 10px;">提现</a>';
                                str += '</a>';
                            }






                            str += '</div>';

                            str += '</div>';



                            str += '</div>';

                            if(proType == '1' && (i == 0 || i == 1)){
                                $("#titletext").html("我的团队成员"+item.cardName+"人");
                            }else if(proType == '2' && (i == 0 || i == 1)){
                                $("#titletext").html("临时锁粉"+item.cardName+"人");
                            }

                        });

                        if(renderType == "1"){
                            $("#"+rederId+"").append(str);
                        }else{
                            $("#"+rederId+"").html(str);
                        }
                        $("#dis"+rederId+"").show();
                    }
                }


            }
        }else{
            console.log('请求异常！')
        }

    });

}
//获取详情数据
function getProjectlist(rederId,renderType,proType){
    //分页
    var pageNoTemp = $("#listzijinPageNo").val();
    if(pageNoTemp > 0){
        $("#listzijinPageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listzijinPageNo' value='1' >");
    }
    //参数
    var token = localStorage.getItem('token');
    var url = '/zq/xinyongka/xinYongKa/laxinmylist';

    //传输数据
    var datauser = {
        "pageNo":$("#listzijinPageNo").val(),
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
            if(rs.data.code == '0'){


                if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1' ){
                   //$(".weui-toast--text").hide();$.toast("没有更多了", "text");
                }if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '2' ){
                    var nodata = '';
                    nodata += '<div class="weui-panel weui-panel_access linetop  " id="nodata" >';
                    nodata += '<div class="weui-panel__hd" style="text-align: center;">';
                    nodata += '<div class="nickname f-blue"  ><a onclick="toxiangmudetail();">您还没有项目，点我发布>></a></div>';
                    nodata += '</div>';
                    nodata += '</div>';
                    $("body").append(nodata);
                }{

                    if(proType == '3'){


                    }else if(proType == '6'){


                    }else{
                        var str = '';
                        $.each(rs.data.result,function(i,item){
                            str += '<div class="kapian" style="margin-top:10px;">';

                            if(item.fabuStatus == '3'){
                                str += '<a class="weui-cell weui-cell_access myweui-cell " onclick=toMyKadetail("'+item.id+'","1")>';
                            }else{
                                str += '<a class="weui-cell weui-cell_access myweui-cell " onclick=tipswsj()>';

                            }

                            str += '<div class="weui-cell__hd shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.kaImage,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;width: 45px;height:45px;border-radius:10px;"></div>';
                            str += '<div class="weui-cell__bd">';
                            str += '<div class="weui-news-text">';
                            str += '<div class="weui-news-title onerow">'+setNULL(item.kaTitle)+'</div>';


                            str += '<div class="weui-news-infoitem">';

                            if(item.fabuStatus == '1'){
                                str += '<span class="" style="color: gray">草稿</span>';
                            }else if(item.fabuStatus == '2'){
                                str += '<span class=""  style="color: gray">审核中</span>';
                            }else if(item.fabuStatus == '3'){
                                str += '<span class=""  style="color: red">已上架</span>';
                            }else if(item.fabuStatus == '4'){
                                str += '<span class=""  style="color: gray">已下架</span>';
                            }else{
                                str += '其他';
                            }

                            str += '</div>';




                            str += '</div>';
                            str += '<div class="weui-news-info mynesinfo">';
                            str += '<div class="weui-news-infoitem">';
                            if(item.createDate != null){
                                str += '<i class="beauty icon-shijian" id="icon33"></i>'+timeagonianyueri(item.createDate)+'';
                            }
                            str += '</div>';





                            str += '<div class="weui-news-title onerow">';

                            str += '<span class=" f-red b-yellow" style="padding: 2px;margin-bottom: 10px;border-radius: 20px;font-weight: bold;font-size: smaller;    padding-left: 10px;padding-right: 10px;">'+yongjinbutie(setNum(item.vipshareAgent),item.sharePricetype,item.butie,item.bangka)+'</span>';
                            if(item.zhuceNum != null && eval(item.zhuceNum) > 0){
                                str += '<span  class=" f-red b-yellow" style="padding: 2px;margin-bottom: 10px;border-radius: 20px;font-weight: bold;font-size: smaller;    padding-left: 10px;padding-right: 10px;margin-left: 5px;">T+'+item.zhuceNum+'</span>';
                            }else{
                                str += '<span  class=" f-red b-yellow" style="padding: 2px;margin-bottom: 10px;border-radius: 20px;font-weight: bold;font-size: smaller;    padding-left: 10px;padding-right: 10px;margin-left: 5px;">立返</span>';
                            }

                            str += '</div>';


                            str += '</div>';

                            str += '</div>';
                            str += '</a>';

                            /*快捷菜单*/
                            str += '<div class="top10 bottom5" >';
                            //if(localStorage.getItem("userTeacher") != '1') {
                            str += '<div class="weui-grids" onclick=toZiJinList()>';
                            str += '<a  class="grid" style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.a1+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '待发放(元)';
                            str += '</p>';
                            str += '</a>';
                            str += '<a  class="grid" style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.a2+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '已发放(元)';
                            str += '</p>';
                            str += '</a>';

                            str += '<a  class="grid" style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18"  >';
                            str += ''+item.a3+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '本月发放(元)';
                            str += '</p>';
                            str += '</a>';
                            str += '</div>';

                            str += '<div class="weui-grids" onclick=toZiJinList()>';
                            str += '<a  class="grid" style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.b1+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '今日发放(元)';
                            str += '</p>';
                            str += '</a>';
                            str += '<a  class="grid" style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.b2+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '昨日发放(元)';
                            str += '</p>';
                            str += '</a>';

                            str += '<a  class="grid" style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18"  >';
                            str += ''+item.b3+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '本周发放(元)';
                            str += '</p>';
                            str += '</a>';
                            str += '</div>';
                            //}

                            str += '<div class="weui-grids"  >';
                            str += '<a  class="grid" onclick=tohtmlall("projectdingdan.html?id='+item.id+'")   style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.c1+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '总订单数(单)';
                            str += '</p>';
                            str += '</a>';
                            str += '<a  class="grid"  onclick=tohtmlall("projectdingdan.html?id='+item.id+'")    style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.c2+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '成功单数(单)';
                            str += '</p>';
                            str += '</a>';

                            str += '<a  class="grid"  onclick=tohtmlall("projectdingdan.html?id='+item.id+'")   style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18"  >';
                            str += ''+item.c3+'%';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '成功率';
                            str += '</p>';
                            str += '</a>';
                            str += '</div>';




                            str += '<div class="weui-grids" >';
                            str += '<a  class="grid"  onclick=tohtmlall("projectdingdan.html?id='+item.id+'")   style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.d1+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '今日单数(单)';
                            str += '</p>';
                            str += '</a>';
                            str += '<a  class="grid"  onclick=tohtmlall("projectdingdan.html?id='+item.id+'")   style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.d2+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '今日成功(单)';
                            str += '</p>';
                            str += '</a>';

                            str += '<a  class="grid"  onclick=tohtmlall("projectdingdan.html?id='+item.id+'")   style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18"  >';
                            str += ''+item.d3+'%';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '今日成功率';
                            str += '</p>';
                            str += '</a>';
                            str += '</div>';

                            str += '<div class="weui-grids" >';
                            str += '<a  class="grid"  onclick=tohtmlall("projectdingdan.html?id='+item.id+'")  style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.e1+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '昨日订单(单)';
                            str += '</p>';
                            str += '</a>';
                            str += '<a  class="grid" onclick=tohtmlall("projectdingdan.html?id='+item.id+'")  style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.e2+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '昨日成功(单)';
                            str += '</p>';
                            str += '</a>';

                            str += '<a  class="grid"  onclick=tohtmlall("projectdingdan.html?id='+item.id+'")  style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18"  >';
                            str += ''+item.e3+'%';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '昨日成功率';
                            str += '</p>';
                            str += '</a>';
                            str += '</div>';

                            if(item.fabuStatus == '3' || item.fabuStatus == '4'){
                                str += '<div class="weui-grids" >';

                                str += '<a onclick=shangxiajia("3","'+item.id+'") class="weui-btn weui-btn_mini weui-btn_warn" style="width: 26%;margin-left: 5%;" >上架</a>';

                                str += '<a onclick=shangxiajia("4","'+item.id+'")  class="weui-btn weui-btn_mini weui-btn_warn" style="width: 26%;margin-left: 5%;"  >下架</a>';

                                str += '<a  onclick=tohtmlall("projectdingdan.html?id='+item.id+'")  class="weui-btn weui-btn_mini weui-btn_warn" style="width: 29%;margin-left: 5%;margin-left: 5%"  >订单处理</a>';

                                str += '</div>';
                            }





                            str += '</div>';
                            str += '</div>';

                        });

                        if(renderType == "1"){
                            $("#"+rederId+"").append(str);
                        }else{
                            $("#"+rederId+"").html(str);
                        }
                        $("#dis"+rederId+"").show();
                    }
                }


            }
        }else{
            console.log('请求异常！')
        }

    });

}

//获取详情数据-客户
function getTeamlist2(rederId,renderType,proType,id){
    //分页
    var pageNoTemp = $("#listzijinPageNo").val();
    if(pageNoTemp > 0){
        $("#listzijinPageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listzijinPageNo' value='1' >");
    }
    //参数
    var token = localStorage.getItem('token');
    var url = '/sys/user/userTeamlist';
    if(proType == '2'){//临时锁粉
        url = '/sys/user/userLinshiTeamlist';
    }else if(proType == '3'){
        url = '/sys/user/userUpUser';
    }else if(proType == '4'){//直属
        url = '/sys/user/userTeamlist2';
    }else if(proType == '5'){//员工
        url = '/sys/user/userTeamlist3';
    }else if(proType == '6'){//客户
        url = '/sys/user/userTeamlist4';
    }

    //传输数据
    var datauser = {
        "pageNo":$("#listzijinPageNo").val(),
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
        url: url,
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                var titletext = '我的团队成员';
                if(proType == '1'){
                    titletext = '我的团队成员';
                }if(proType == '2'){
                    titletext = '临时锁粉记录';
                }
                $("#titletext").html(titletext);

                if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1' ){
                    $(".weui-toast--text").hide();$.toast("没有更多了", "text");
                }if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '2' ){
                    var nodata = '';
                    nodata += '<div class="weui-panel weui-panel_access linetop  " id="nodata" >';
                    nodata += '<div class="weui-panel__hd" style="text-align: center;">';
                    nodata += '<div class="nickname f-blue" onclick=toMingpian(); >您还没有团队成员记录，点我去分享>></div>';
                    nodata += '</div>';
                    nodata += '</div>';
                    $("body").append(nodata);
                }{

                    if(proType == '3'){

                        if(rs.data.result.id != null){
                            var str = '';
                            str += '<a class="weui-cell weui-cell_access myweui-cell " onclick=toUserHome("'+rs.data.result.id+'","1") >';
                            str += '<div class="weui-cell__hd shadowonly" style="background-image:url('+checkPathBackGroubdImage(rs.data.result.headimgurl,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;width: 45px;height:45px;border-radius:10px;"></div>';
                            str += '<div class="weui-cell__bd">';
                            str += '<div class="weui-news-text">';
                            str += '<div class="weui-news-title onerow">'+setNULL(rs.data.result.nickname)+'</div>';
                            str += '</div>';

                            str += '</div>';
                            str += '</a>';
                            $("#upuser").html(str);
                            $("#upuserinfo").show();
                        }
                    }else if(proType == '6'){
                        var str = '';
                        $.each(rs.data.result,function(i,item) {

                            str += '<div class="weui-cell">';
                            str += '<div class="weui-cell__bd">';
                            str += '<p><span class="icon icon-84 f-blue"></span>&nbsp;' + setNULL(item.name) + '<span style="font-size: smaller;color: red;">'+timeagonianyueri(item.createDate)+'</span></p>';
                            str += '</div>';
                            str += '<div class="weui-cell__ft"><a href="tel:'+item.mobile+'"><span class="icon icon-90"></span>' + setNULL(item.mobile) + '</a></div>';
                            str += '</div>';
                        });
                        if(renderType == "1"){
                            $("#"+rederId+"").append(str);
                        }else{
                            $("#"+rederId+"").html(str);
                        }
                        $("#dis"+rederId+"").show();

                        $("#num").html("("+rs.data.count+"人)");

                    }else{
                        var str = '';
                        $.each(rs.data.result,function(i,item){
                            str += '<div class="kapian" style="margin-top:10px;">';

                            str += '<a class="weui-cell weui-cell_access myweui-cell " onclick=toUserHome("'+item.id+'","1")>';
                            str += '<div class="weui-cell__hd shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.headimgurl,"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 15px 10px 0px;width: 45px;height:45px;border-radius:10px;"></div>';
                            str += '<div class="weui-cell__bd">';
                            str += '<div class="weui-news-text">';
                            if(item.userLevel == '普通会员'){
                                str += '<div class="weui-news-title onerow" onclick=toHuiyuanByType()><span class="f-white shadowonly" style="background-color: gray;border-radius: 30px;padding-left: 10px;padding-right: 10px;padding-top: 3px;padding-bottom: 3px;margin-right: 10px;">'+setNULL(item.userLevel)+'</span>'+setNULL(item.nickname)+'</div>';
                            }else{
                                str += '<div class="weui-news-title onerow"><span class="f-white shadowonly" style="background-color: #FF0000;border-radius: 30px;padding-left: 10px;padding-right: 10px;padding-top: 3px;padding-bottom: 3px;margin-right: 10px;">'+setNULL(item.userLevel)+'</span>'+setNULL(item.nickname)+'</div>';
                            }
                            str += '</div>';
                            str += '<div class="weui-news-info mynesinfo">';
                            str += '<div class="weui-news-infoitem">';
                            if(item.createDate != null){
                                str += '<i class="beauty icon-shijian" id="icon33"></i>'+timeagonianyueri(item.createDate)+'';
                            }
                            str += '</div>';

                            str += '<div class="weui-news-infoitem">';

                            if(item.isZhi == '1'){
                                str += '<span style="color: red">直属下级</span>';
                            }else{
                                str += '非直属下级';
                            }

                            str += '</div>';
                            str += '</div>';

                            str += '</div>';
                            str += '</a>';

                            /*快捷菜单*/
                            str += '<div class="top10 bottom5">';
                            if(localStorage.getItem("userTeacher") != '1') {
                                str += '<div class="weui-grids" onclick=toZiJinOtherList("'+item.id+'")>';
                                str += '<a  class="grid" style="padding: 5px 0px;">';
                                str += '<div class="weui-grid__label  f18" >';
                                str += ''+item.a1+'';
                                str += '</div>';
                                str += '<p class="weui-grid__label f-gray top10">';
                                str += '累计收益(元)';
                                str += '</p>';
                                str += '</a>';
                                str += '<a  class="grid" style="padding: 5px 0px;">';
                                str += '<div class="weui-grid__label  f18" >';
                                str += ''+item.a2+'';
                                str += '</div>';
                                str += '<p class="weui-grid__label f-gray top10">';
                                str += '今日收益(元)';
                                str += '</p>';
                                str += '</a>';

                                str += '<a  class="grid" style="padding: 5px 0px;">';
                                str += '<div class="weui-grid__label  f18"  >';
                                str += ''+item.a3+'';
                                str += '</div>';
                                str += '<p class="weui-grid__label f-gray top10">';
                                str += '昨日收益(元)';
                                str += '</p>';
                                str += '</a>';
                                str += '</div>';
                            }

                            str += '<div class="weui-grids" >';
                            str += '<a  class="grid"  onclick=tohtmlall("dailidingdanother.html?id='+item.id+'")  style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.b1+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '总订单数(单)';
                            str += '</p>';
                            str += '</a>';
                            str += '<a  class="grid"  onclick=tohtmlall("dailidingdanother.html?id='+item.id+'")  style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.b2+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '今日单数(单)';
                            str += '</p>';
                            str += '</a>';

                            str += '<a  class="grid"  onclick=tohtmlall("dailidingdanother.html?id='+item.id+'")  style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18"  >';
                            str += ''+item.b3+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '昨日单数(单)';
                            str += '</p>';
                            str += '</a>';
                            str += '</div>';


                            str += '<div class="weui-grids">';
                            str += '<a  class="grid"  onclick=tohtmlall("kehuchengyuanother.html?id='+item.id+'")  style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.c1+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '客户总数(人)';
                            str += '</p>';
                            str += '</a>';
                            str += '<a  class="grid" onclick=tohtmlall("kehuchengyuanother.html?id='+item.id+'")  style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.c2+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '今日客户(人)';
                            str += '</p>';
                            str += '</a>';

                            str += '<a  class="grid" onclick=tohtmlall("kehuchengyuanother.html?id='+item.id+'")  style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18"  >';
                            str += ''+item.c3+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '昨日客户(人)';
                            str += '</p>';
                            str += '</a>';
                            str += '</div>';

                            str += '<div class="weui-grids">';
                            str += '<a  class="grid" style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.d1+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '团队成员(人)';
                            str += '</p>';
                            str += '</a>';
                            str += '<a  class="grid" style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18" >';
                            str += ''+item.d2+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '今日团队(人)';
                            str += '</p>';
                            str += '</a>';

                            str += '<a  class="grid" style="padding: 5px 0px;">';
                            str += '<div class="weui-grid__label  f18"  >';
                            str += ''+item.d3+'';
                            str += '</div>';
                            str += '<p class="weui-grid__label f-gray top10">';
                            str += '昨日团队(人)';
                            str += '</p>';
                            str += '</a>';
                            str += '</div>';

                            if(item.userTeacher == '1' && localStorage.getItem("userLevel") != '0' &&  localStorage.getItem("daili") == '1'){
                                str += '<div class="weui-grids" >';
                                str += '<a  onclick=toZiJinOtherList('+item.id+') class="grid" style="padding: 5px 0px;">';
                                str += '<div class="weui-grid__label  f18" >';
                                str += ''+setNULL(item.money)+'';
                                str += '</div>';
                                str += '<p class="weui-grid__label f-gray top10">';
                                str += '余额';
                                str += '</p>';
                                str += '</a>';

                                str += '<a  class="grid" style="padding: 5px 0px;">';
                                str += '<a class="weui-btn weui-btn_mini weui-btn_warn" style="    margin-left: 30px; margin-top: 10px;">提现</a>';
                                str += '</a>';
                            }






                            str += '</div>';

                            str += '</div>';



                            str += '</div>';

                            if(proType == '1' && (i == 0 || i == 1)){
                                $("#titletext").html("我的团队成员"+item.cardName+"人");
                            }else if(proType == '2' && (i == 0 || i == 1)){
                                $("#titletext").html("临时锁粉"+item.cardName+"人");
                            }

                        });

                        if(renderType == "1"){
                            $("#"+rederId+"").append(str);
                        }else{
                            $("#"+rederId+"").html(str);
                        }
                        $("#dis"+rederId+"").show();
                    }
                }


            }
        }else{
            console.log('请求异常！')
        }

    });

}



//获取详情数据
function getMyOrderlist(rederId,renderType,proType){
    //分页
    var pageNoTemp = $("#listzijinPageNo").val();
    if(pageNoTemp > 0){
        $("#listzijinPageNo").val(eval(pageNoTemp) + 1);
    }else{
        $("body").append("<input type='hidden' id='listzijinPageNo' value='1' >");
    }
    //参数
    var token = localStorage.getItem('token');
    var orderType = proType;
    //传输数据
    var datauser = {
        "orderType":orderType,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "pageNo":$("#listzijinPageNo").val(),
        "token":token
    }

    instanceuser({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: '/gg/order/order/mylist',
        data: datauser,
        cancelToken: sourceuser.token
    }) .then(function(rs){
        console.log(rs)//数据在rs.data中  状态rs.status=200
        if(rs.status=200){
            if(rs.data.code == '0'){
                var titletext = '全部订单记录';
                if(orderType == '5'){
                    titletext = '课程订单记录';
                }else if(orderType == '1'){
                    titletext = '会员订单记录';
                }else if(orderType == '9'){
                    titletext = '应用订单记录';
                }else if(orderType == '10'){
                    titletext = '商品订单记录';
                }else if(orderType == '12'){
                    titletext = '问题订单记录';
                }else if(orderType == '15'){
                    titletext = '信用卡订单记录';
                }else if(orderType == '16'){
                    titletext = '贷款订单记录';
                }else if(orderType == '17'){
                    titletext = '保险订单记录';
                }else if(orderType == '18'){
                    titletext = '基金订单记录';
                }else if(orderType == '19'){
                    titletext = '活动订单记录';
                }
                $("#titletext").html(titletext);

                if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1' ){
                    $(".weui-toast--text").hide();$.toast("没有更多了", "text");
                }if((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '2' ){
                    var nodata = '';
                    nodata += '<div class="weui-panel weui-panel_access linetop  " id="nodata" >';
                    nodata += '<div class="weui-panel__hd" style="text-align: center;">';
                    nodata += '<div class="nickname f-blue" onclick=toMingpian();>您还没有分享订单记录，点我去分享>></div>';
                    nodata += '</div>';
                    nodata += '</div>';
                    $("body").append(nodata);
                }{


                    var str = '';
                    $.each(rs.data.result,function(i,item){
                        str += '<div class="kapian top10" >';
                        str += '<li class="weui-news-item"  style="height: 15px !important;min-height: 15px;color: grey;padding-top: 5px;margin-bottom: 5px;">';

                        str += '<div class="weui-news-inner ">';
                        str += ''+item.orderNo+'';
                        str += '</div>';

                        if(item.orderStatus == '1'){
                            str += '<div class="weui-news-inner f-red" style="text-align: right;margin-left: 20px;" >';
                            str += '<div onclick=dingdanxiangqing("3","'+item.orderAboutid+'","'+item.orderNum+'","'+setNULL(item.zengzhiids)+'","'+setNULL(item.shuxing)+'","'+setNULL(item.orderNo)+'") class="shadowonly" style="color:white;font-size:small;line-height: 25px;padding-left: 8px;padding-right: 8px;background-color: red; height: 25px;border-radius: 50px;">去支付</div>';
                        }else if(item.orderStatus == '2'){
                            str += '<div class="weui-news-inner f-gray" style="text-align: right;width: 20%;" >';
                            str += '已失效';
                        }else if(item.orderStatus == '3'){
                            str += '<div class="weui-news-inner f-gray" style="text-align: right;width: 20%;" >';
                            str += '已支付';
                        }else if(item.orderStatus == '4'){
                            str += '<div class="weui-news-inner f-gray" style="text-align: right;width: 20%;" >';
                            str += '已失效';
                        }


                        str += '</div>';
                        str += '</li>';



                        if(item.orderType == '5'){
                            str += '<li class="weui-news-item" style="margin-top: 25px;" onclick=toCourseDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '1'){
                            str += '<li class="weui-news-item" style="margin-top: 25px;" onclick=toHuiYuanDetail(\''+item.orderAboutid+'\',\'1\'); >';
                        }else if(item.orderType == '9'){
                            str += '<li class="weui-news-item" style="margin-top: 25px;" onclick=toToolDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '10'){
                            str += '<li class="weui-news-item" style="margin-top: 25px;" onclick=toProductDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '12'){
                            str += '<li class="weui-news-item" style="margin-top: 25px;" onclick=toQuestionDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '15'){
                            str += '<li class="weui-news-item" style="margin-top: 25px;" onclick=toAgentKaDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '16'){
                            str += '<li class="weui-news-item" style="margin-top: 25px;" onclick=toAgentDaikuanDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '17'){
                            str += '<li class="weui-news-item" style="margin-top: 25px;" onclick=toAgentBaoxianDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '18'){
                            str += '<li class="weui-news-item" style="margin-top: 25px;" onclick=toAgentJiJinDetail("'+item.orderAboutid+'","1"); >';
                        }else if(item.orderType == '19'){
                            str += '<li class="weui-news-item" style="margin-top: 25px;" onclick=toActivityDetail("'+item.orderAboutid+'","1"); >';
                        }else{
                            str += '<li class="weui-news-item" style="margin-top: 25px;" >';
                        }


                        str += '<div class="weui-news-inner" >';


                        if( item.orderType == '9' || item.orderType == '11' || item.orderType == '12' || item.orderType == '14'){
                            str += '<div class="weui-news-media shadowonly" style="border-radius:10px;background-image:url('+checkPathBackGroubdImage(getFirstImageDetailContent(item.shareImage),"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                            str += '<span class="weui-mark-rt bg-green">'+timeagonianyueri(item.createDate)+'</span>';
                        }else{
                            str += '<div class="weui-news-media square shadowonly" style="border-radius:10px;background-image:url('+checkPathBackGroubdImage(getFirstImageDetailContent(item.shareImage),"1")+');background-repeat:no-repeat;background-size:cover;margin:10px 8px 13px 0px;">';
                            str += '<span class="weui-mark-rt bg-green">'+timeagonianyueri(item.createDate)+'</span>';
                        }

                        str += '</div>';
                        str += '<div class="weui-news-inners">';
                        str += '<div class="weui-news-text">';
                        str += '<div class="weui-news-title onerow">'+setNULL(item.title)+'</div>';
                        str += '</div>';

                       /* str += '<div class="weui-news-info nickname" onclick=toUserHome("'+item.createBy.id+'","1")>';
                        str += '<div class="weui-news-infoitem" >';
                        str += '<img src="'+checkPath(item.createBy.headimgurl,"1")+'" class="weui-news-round">';
                        str += '<span class="weui-news-left">'+setNULL(item.createBy.nickname)+'</span>';
                        str += '</div>';
                        str += '</div>';*/


                        str += '<div class="weui-news-info">';
                        str += '<div class="weui-news-infoitem">';
                        str += '<span class="weui-news-left" id="weui-news-left">';
                        str += '<div class="weui-label-list" style="margin-left: 0px;">';
                        if(item.orderMoney != null && item.orderMoney != '' && eval(item.orderMoney) > 0.01){//订单否结算等等
                            str += '<label class="label f-red b-red">￥'+setNum(item.orderMoney)+'</label>';

                        }
                        if(item.orderType == '15' || item.orderType == '16' || item.orderType == '17' || item.orderType == '18'){
                            if(item.orderStatus == '1'){
                                str += '<label class="label f-red b-red">申请中</label>';
                            }else if(item.orderStatus == '2'){
                                str += '<label class="label f-gray b-gray">申请失败</label>';
                            }else if(item.orderStatus == '3'){
                                str += '<label class="label f-blue b-blue">申请成功</label>';
                            }else if(item.orderStatus == '4'){
                                str += '<label class="label f-gray b-gray">申请失败</label>';
                            }
                        }

                        if(item.orderType == '10'){
                            if(item.orderStatus == '3'){
                                if(item.orderWuliudanhao != null && item.orderWuliudanhao != ''){
                                    str += '<label class="label f-blue b-blue">已发货</label>';
                                }else{
                                    str += '<label class="label f-red b-red">待发货</label>';
                                }
                            }else if(item.orderStatus == '1'){

                                str += '<label class="label f-red b-red">待支付</label>';
                            }

                        }
                        str += '</div>';
                        str += '</span>';
                        str += '</div>';


                        str += '</div>';
                        str += '</div>';
                        str += '</div>';





                        str += '</li>';

                        if(item.orderType == '10'){
                            if(item.orderWuliudanhao != null && item.orderWuliudanhao != ''){
                                str += '<div style="margin-left: 15px;color: #777777;font-size: x-small">';
                                str += '<a href="http://page.cainiao.com/guoguo/app-myexpress-taobao/express-detail.html?mailNo='+item.orderWuliudanhao+'">物流单号：'+item.orderWuliudanhao+'&nbsp;&nbsp;&nbsp;&nbsp;查看物流</a>';
                                str += '</div>';
                            }
                        }


                        str += '</div>';

                    });
                    //order_wuliudanhao

                    if(renderType == "1"){
                        $("#"+rederId+"").append(str);
                    }else{
                        $("#"+rederId+"").html(str);
                    }
                    $("#dis"+rederId+"").show();

                }


            }
        }else{
            console.log('请求异常！')
        }

    });

}



function mynum() {

    //以下参数需要提前赋值

    var id = localStorage.getItem("userId");

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
                $("#guanzhunum").html(""+rs.data.result.remarks+"");//remarks
                $("#fansnum").html(""+rs.data.result.guanzhuUser+"");//guanzhuUser
                $("#dongtainum").html(""+rs.data.result.dongtaiNum+"");//dongtainum
            }

        }else{

            console.log('请求异常！')
        }

    });

}

function shangxiajia(obj,id){

    //以下参数需要提前赋值
    $.confirm("确定执行操作？", "执行操作", function () {
//传输数据
        var datauser = {
            "id":id,
            "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
            "fabuStatus":obj
        }


        instanceuser({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/zq/xinyongka/xinYongKa/save',
            data: datauser,
            cancelToken: sourceuser.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
                if(rs.data.code == '0'){
                    //$.toast("关注成功", 'SUCCESS');
                    $.toast.prototype.defaults.duration=1000;//1秒
                    $.toast("操作成功！",'text');
                    //location.href='qianbao.html';
                    setTimeout(function() {
                        refresh();
                    }, 1000);
                }

            }else{
                console.log('请求异常！')
            }

        });
    }, function () {
        //取消操作
        //location.href = 'updaterealname.html';
    });




}

function setwuxiao(obj) {
    //$("#weui-prompt-input").val("");

    $.prompt({
        title: '设为无效订单?',
        text: '请输入无效原因',
        input: '',
        empty: false, // 是否允许为空
        onOK: function (input) {
           // alert(input);
            //点击确认
            var datauser = {
                "id":obj,
                "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
                "sxyy":input,
                "orderStatus":'4'
            }


            instanceuser({
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                },//设置跨域请求头
                method: 'post',
                url: '/gg/order/order/save',
                data: datauser,
                cancelToken: sourceuser.token
            }) .then(function(rs){
                //console.log(rs)//数据在rs.data中  状态rs.status=200
                if(rs.status=200){
                    if(rs.data.code == '0'){
                        //$.toast("关注成功", 'SUCCESS');
                        $.toast.prototype.defaults.duration=1000;//1秒
                        $.toast("操作成功！",'text');
                        //location.href='qianbao.html';
                        setTimeout(function() {
                            refresh();
                        }, 1000);
                    }

                }else{
                    console.log('请求异常！')
                }

            });
        },
        onCancel: function () {
            //点击取消
        }
    });
    
}

function dealOrder(obj){

    //以下参数需要提前赋值
    $.confirm("确定执行操作？", "发放佣金", function () {
        $.toast.prototype.defaults.duration=1000;//1秒
        $.toast("处理中……",'text');
//传输数据
        var datauser = {
            "id":obj,
            "tenancy":getSaasId(),"tenancyTemp":getSaasId()
        }


        instanceuser({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            },//设置跨域请求头
            method: 'post',
            url: '/gg/order/order/deal',
            data: datauser,
            cancelToken: sourceuser.token
        }) .then(function(rs){
            //console.log(rs)//数据在rs.data中  状态rs.status=200
            if(rs.status=200){
                if(rs.data.code == '0'){
                    //$.toast("关注成功", 'SUCCESS');
                    $.toast.prototype.defaults.duration=1000;//1秒
                    $.toast("操作成功！",'text');
                    //location.href='qianbao.html';
                    setTimeout(function() {
                        refresh();
                    }, 1000);
                }

            }else{
                console.log('请求异常！')
            }

        });
    }, function () {
        //取消操作
        //location.href = 'updaterealname.html';
    });




}
