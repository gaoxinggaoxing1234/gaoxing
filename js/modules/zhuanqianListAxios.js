var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost";//本地模式
}
//文件请求URL
var baseFileUrlzq = ''+basehost+'';
//请求实例
var instancezq = axios.create({
  baseURL: ''+basehost+'/sfd/a/api/',
  timeout: 180000000,
  headers: {'token': localStorage.getItem('token')}
});

//取消请求
var CancelTokenzq = axios.CancelToken;
var sourcezq = CancelTokenzq.source();

// 添加请求拦截器
instancezq.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == ''){
        //isLogin('','');
       // sourcezq.cancel();
    }

   sessionStorage.clear();return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instancezq.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染 topicType-主题分类
function listzq(renderId,renderType,pageSize,manyType,listType,topicType) {
    //分页
    var pageNoTemp = $("#listzq" + manyType + listType + "PageNo").val();
    if (pageNoTemp > 0) {
        $("#listzq" + manyType + listType + "PageNo").val(eval(pageNoTemp) + 1);
    } else {
        $("body").append("<input type='hidden' id='listzq" + manyType + listType + "PageNo' value='1' >");
    }

    //参数-manyType--需要手动处理对应字段
    var zqType = manyType;
    var zqTopic = topicType;
    var pageNo = $("#listzq" + manyType + listType + "PageNo").val();
    var url = '';
    var sysType = $("#sysType").val();
    if (zqType == '0') {//三方会员列表
        url = '/zq/huiyuan/huiYuan/list';
    } else if (zqType == '1') {//企业列表
        url = '/sys/user/userCompanylist';
    } else if (zqType == '2') {//卡列表
        url = '/zq/xinyongka/xinYongKa/list';
    } else if (zqType == '3') {//贷款列表
        url = '/zq/daikuan/daiKuan/list';
    } else if (zqType == '4') {//保险列表
        url = '/zq/baoxian/baoxian/list';
    } else if (zqType == '5') {//基金列表
        url = '/zq/jijin/jiJin/list';
    } else if (zqType == '6') {//卡主题列表
        url = '/zq/xinyongka/xinYongKa/topic';
    } else if (zqType == '7') {//贷款主题列表
        url = '/zq/daikuan/daiKuan/topic';
    } else if (zqType == '8') {//热门银行列表
        url = '/zq/xinyongka/xinYongKa/topicbank';
    } else if (zqType == '9') {//信用卡顾问列表
        url = '/sys/user/userKaGuwenlist';
    } else if (zqType == '10') {//贷款顾问列表
        url = '/sys/user/userDaiKuanGuwenlist';
    } else if (zqType == '11') {//保险顾问列表
        url = '/sys/user/userBaoXianGuwenlist';
    } else if (zqType == '12') {//基金证券顾问列表
        url = '/sys/user/userJiJinGuwenlist';
    } else if (zqType == '13') {//DC卡列表
        url = '/zq/xinyongka/xinYongKa/list';
    } else if (zqType == '14') {//DC贷款列表
        url = '/zq/daikuan/daiKuan/list';
    } else if (zqType == '15') {//DC某银行卡列表
        url = '/zq/xinyongka/xinYongKa/bankkalist';
    }

    //传输数据
    var datazq = {
        "remarks": zqTopic,
        "pageSize": pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "sysType": sysType,
        "pageNo": pageNo
    }


    instancezq({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: datazq,
        cancelToken: sourcezq.token
    }).then(function (rs) {
        console.log(rs.data.result)//数据在rs.data中  状态rs.status=200
        //数据处理
        if (rs.status = 200) {
            if ((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1') {
                $(".weui-toast--text").hide();$.toast("没有更多了", "text");
            } else {
                listzqRender(rs.data, renderId, renderType, manyType);
            }
        } else {
            console.log('listzq请求异常！')
        }
    });
}
//获取列表数据renderType-2执行html(),1执行append()渲染,manyType支持单页面多渲染 topicType-主题分类
function listzq2(renderId,renderType,pageSize,manyType,listType,topicType) {
    /*//分页
    var pageNoTemp = $("#listzq" + manyType + listType + "PageNo").val();
    if (pageNoTemp > 0) {
        $("#listzq" + manyType + listType + "PageNo").val(eval(pageNoTemp) + 1);
    } else {
        $("body").append("<input type='hidden' id='listzq" + manyType + listType + "PageNo' value='1' >");
    }*/

    //参数-manyType--需要手动处理对应字段
    var zqType = manyType;
    var zqTopic = topicType;
   /* var pageNo = $("#listzq" + manyType + listType + "PageNo").val();*/
    var url = '';
    var sysType = $("#sysType").val();
    if (zqType == '0') {//三方会员列表
        url = '/zq/huiyuan/huiYuan/list';
    } else if (zqType == '1') {//企业列表
        url = '/sys/user/userCompanylist';
    } else if (zqType == '2') {//卡列表
        url = '/zq/xinyongka/xinYongKa/list';
    } else if (zqType == '3') {//贷款列表
        url = '/zq/daikuan/daiKuan/teshu';
    } else if (zqType == '4') {//保险列表
        url = '/zq/baoxian/baoxian/list';
    } else if (zqType == '5') {//基金列表
        url = '/zq/jijin/jiJin/list';
    } else if (zqType == '6') {//卡主题列表
        url = '/zq/xinyongka/xinYongKa/topic';
    } else if (zqType == '7') {//贷款主题列表
        url = '/zq/daikuan/daiKuan/topic';
    } else if (zqType == '8') {//热门银行列表
        url = '/zq/xinyongka/xinYongKa/topicbank';
    } else if (zqType == '9') {//信用卡顾问列表
        url = '/sys/user/userKaGuwenlist';
    } else if (zqType == '10') {//贷款顾问列表
        url = '/sys/user/userDaiKuanGuwenlist';
    } else if (zqType == '11') {//保险顾问列表
        url = '/sys/user/userBaoXianGuwenlist';
    } else if (zqType == '12') {//基金证券顾问列表
        url = '/sys/user/userJiJinGuwenlist';
    } else if (zqType == '13') {//DC卡列表
        url = '/zq/xinyongka/xinYongKa/list';
    } else if (zqType == '14') {//DC贷款列表
        url = '/zq/daikuan/daiKuan/list';
    } else if (zqType == '15') {//DC某银行卡列表
        url = '/zq/xinyongka/xinYongKa/bankkalist';
    }

    //传输数据
    var datazq = {

        "pageSize": pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "sysType": sysType,
        "remarks":'teshu',
        "pageNo": 1
    }


    instancezq({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: datazq,
        cancelToken: sourcezq.token
    }).then(function (rs) {
        console.log(rs.data.result)//数据在rs.data中  状态rs.status=200
        //数据处理
        if (rs.status = 200) {
            if ((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1') {
                $(".weui-toast--text").hide();$.toast("没有更多了", "text");
            } else {
                listzqRender2(rs.data, renderId, renderType, manyType);
                listzqRender3(rs.data, renderId, renderType, manyType);
            }
        } else {
            console.log('listzq请求异常！')
        }
    });
}

function listzqnew(renderId,renderType,pageSize,manyType,listType,kaZuzhi) {
    //分页
    var pageNoTemp = $("#listzq" + manyType + listType + "PageNo").val();
    if (pageNoTemp > 0) {
        $("#listzq" + manyType + listType + "PageNo").val(eval(pageNoTemp) + 1);
    } else {
        $("body").append("<input type='hidden' id='listzq" + manyType + listType + "PageNo' value='1' >");
    }

    //参数-manyType--需要手动处理对应字段
    var pageNo = $("#listzq" + manyType + listType + "PageNo").val();
    var url = '';
    url = '/zq/xinyongka/xinYongKa/laxinlist';

    //传输数据
    var datazq = {
        "kaZuzhi": kaZuzhi,
        "pageSize": pageSize,
        "tenancy":getSaasId(),"tenancyTemp":getSaasId(),
        "kaTopic": listType,
        "pageNo": pageNo
    }


    instancezq({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },//设置跨域请求头
        method: 'post',
        url: url,
        data: datazq,
        cancelToken: sourcezq.token
    }).then(function (rs) {
        console.log(rs.data.result)//数据在rs.data中  状态rs.status=200
        //数据处理
        if (rs.status = 200) {
            if ((rs.data.result == null || rs.data.result == '' || rs.data.result == '[]') && renderType == '1') {
                $(".weui-toast--text").hide();$.toast("没有更多了", "text");
            } else {
                listzqRender4(rs.data, renderId, renderType, manyType);
            }
        } else {
            console.log('listzq请求异常！')
        }
    });
}


//列表渲染
function listzqRender(data,renderId,renderType,manyType) {
    var listzqStr = '';
    //console.log(data.result)

    if (data.code == '0') {
        var zhutia = '';
        var zhutib = '';
        $.each(data.result, function (i, item) {

            if (manyType == '0') {//disanf会员列表

                listzqStr += '';
                listzqStr += '<li class="weui-news-item" onclick=toHuiYuanDetail("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media " style="background-image:url(' + checkPathBackGroubdImage(item.huiyuanImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.huiyuanJiaobiao != null && item.huiyuanJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.huiyuanJiaobiao + '</span>';
                        } else {

                            if (item.huiyuanPrice != null && eval(item.huiyuanPrice) > 0.00) {
                                //listzqStr += '<span class="weui-mark-rt bg-red">￥' + setNum(item.huiyuanPrice) + '</span>';
                            } else {
                                listzqStr += '<span class="weui-mark-rt bg-green">免费</span>';
                            }
                        }

                    } else {

                        if (item.huiyuanPrice != null && eval(item.huiyuanPrice) > 0.00) {
                            //listzqStr += '<span class="weui-mark-rt bg-red">￥' + setNum(item.huiyuanPrice) + '</span>';
                        } else {
                            listzqStr += '<span class="weui-mark-rt bg-green">免费</span>';
                        }
                    }

                } else {

                    if (item.huiyuanPrice != null && eval(item.huiyuanPrice) > 0.00) {
                        listzqStr += '<span class="weui-mark-rt bg-red">￥' + setNum(item.huiyuanPrice) + '</span>';
                    } else {
                        listzqStr += '<span class="weui-mark-rt bg-green">免费</span>';
                    }
                }

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + item.huiyuanTitle + '';
                listzqStr += '<p class="weui-news-p onerow">';
                listzqStr += '' + item.huiyuanLabel + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">￥' + setNum(item.huiyuanPrice) + '</label>';
                    listzqStr += '<label class="label f-red b-red">' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype) + '</label>';
                    listzqStr += '<label class="label f-blue b-blue">' + item.huiyuanJiesuan + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.huiyuanDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';


            } else if (manyType == '1') {

                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '2') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentKaDetail("'+item.id+'","1");> ';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.kaImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.kaJiaobiao != null && item.kaJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.kaJiaobiao + '</span>';
                        } else {
                            if (item.kaLabel != null && item.kaLabel != '') {
                                var str = item.kaLabel; //这是一字符串
                                var strs= new Array(); //定义一数组
                                strs=str.split("/"); //字符分割
                                for (i=0;i<strs.length ;i++ )
                                {
                                    if(i == 0){
                                        listzqStr += '<span class="weui-mark-rt bg-red">'+strs[i]+'</span>';
                                    }

                                }

                            }
                        }

                    } else {
                        if (item.kaLabel != null && item.kaLabel != '') {
                            var str = item.kaLabel; //这是一字符串
                            var strs= new Array(); //定义一数组
                            strs=str.split("/"); //字符分割
                            for (i=0;i<strs.length ;i++ )
                            {
                                if(i == 0){
                                    listzqStr += '<span class="weui-mark-rt bg-red">'+strs[i]+'</span>';
                                }

                            }
                        }
                    }

                } else {
                    if (item.kaLabel != null && item.kaLabel != '') {
                        var str = item.kaLabel; //这是一字符串
                        var strs= new Array(); //定义一数组
                        strs=str.split("/"); //字符分割
                        for (i=0;i<strs.length ;i++ )
                        {
                            if(i == 0){
                                listzqStr += '<span class="weui-mark-rt bg-red">'+strs[i]+'</span>';
                            }

                        }
                    }
                }


                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">' + item.kaTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype) + '</label>';
                    if(item.kaJiesuan != null && item.kaJiesuan != ''){
                        listzqStr += '<label class="label f-blue b-blue">' + item.kaJiesuan + '</label>';
                    }

                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.kaTopic;
                zhutib = item.kaCompany;

            } else if (manyType == '3') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentDaikuanDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.daikuanImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 20px;">';

                if (item.daikuanJiaobiao != null && item.daikuanJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.daikuanJiaobiao + '</span>';
                        } else {
                            if (item.daikuanLabel != null && item.daikuanLabel != '') {
                                var str = item.daikuanLabel; //这是一字符串
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
                        if (item.daikuanLabel != null && item.daikuanLabel != '') {
                            var str = item.daikuanLabel; //这是一字符串
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
                    if (item.daikuanLabel != null && item.daikuanLabel != '') {
                        var str = item.daikuanLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.daikuanTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype) + '</label>';
                    if(item.daikuanJiesuan != null && item.daikuanJiesuan != ''){
                        listzqStr += '<label class="label f-blue b-blue">' + item.daikuanJiesuan + '</label>';
                    }

                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.daikuanTopic;

            } else if (manyType == '4') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentBaoxianDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.baoxianImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.baoxianJiaobiao != null && item.baoxianJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.baoxianJiaobiao + '</span>';
                        } else {
                            if (item.baoxianLabel != null && item.baoxianLabel != '') {

                                var str = item.baoxianLabel; //这是一字符串
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
                        if (item.baoxianLabel != null && item.baoxianLabel != '') {
                            var str = item.baoxianLabel; //这是一字符串
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
                    if (item.baoxianLabel != null && item.baoxianLabel != '') {
                        var str = item.baoxianLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.baoxianTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype) + '</label>';
                    listzqStr += '<label class="label f-blue b-blue">' + item.baoxianJiesuan + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.baoxianDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '5') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentJiJinDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.jijinImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.jijinJiaobiao != null && item.jijinJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.jijinJiaobiao + '</span>';
                        } else {
                            if (item.jijinLabel != null && item.jijinLabel != '') {
                                var str = item.jijinLabel; //这是一字符串
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
                        if (item.jijinLabel != null && item.jijinLabel != '') {
                            var str = item.jijinLabel; //这是一字符串
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
                    if (item.jijinLabel != null && item.jijinLabel != '') {
                        var str = item.jijinLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.jijinTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">￥' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype)+ '</label>';
                    listzqStr += '<label class="label f-blue b-blue">' + item.jijinJiesuan + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.jijinDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '6' && i < 9) {
                listzqStr += '<li onclick=toDcKaList("zhutituijian","13","1","'+item.value+'")>';
                listzqStr += '<span class="shadowonly"  style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:round;background-size:cover;border-radius: 10px;"><span class="weui-mark-lb boem">'+item.label+'</span></span>';
                listzqStr += '</li>';

            } else if (manyType == '7' && i < 9) {
                //console.log(data.result)
                listzqStr += '<li onclick=toDcDaikuanList("zhutituijiandaikuan","14","1","'+item.value+'")>';
                listzqStr += '<span class="shadowonly"  style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:round;background-size:cover;border-radius: 10px;"><span class="weui-mark-lb boem">'+item.label+'</span></span>';
                listzqStr += '</li>';

            } else if (manyType == '8' && i < 9) {
                listzqStr += '<li onclick=toDcKaList("remenyinhang","15","1","'+item.value+'")>';
                listzqStr += '<span class="shadowonly"  style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:round;background-size:cover;border-radius: 10px;"><span class="weui-mark-lb boem">'+item.label+'</span></span>';
                listzqStr += '</li>';

            } else if (manyType == '9') {

                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '10') {
                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '11') {
                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '12') {
                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
            } else if (manyType == '13') {
                if($("#sysType").val() == '2'){//流量云
                    listzqStr += '<li class="weui-news-item" onclick=toAgentKaLLyDetail("'+item.id+'","1");>';
                }else{
                    listzqStr += '<li class="weui-news-item" onclick=toAgentKaDetail("'+item.id+'","1");>';
                }


                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.kaImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.kaJiaobiao != null && item.kaJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.kaJiaobiao + '</span>';
                        } else {
                            if (item.kaLabel != null && item.kaLabel != '') {
                                var str = item.kaLabel; //这是一字符串
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
                        if (item.kaLabel != null && item.kaLabel != '') {
                            var str = item.kaLabel; //这是一字符串
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
                    if (item.kaLabel != null && item.kaLabel != '') {
                        var str = item.kaLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.kaTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.kaTongguolv != null && item.kaTongguolv != '') {
                    listzqStr += '<label class="label f-red b-red">通过率:' + setNULL(item.kaTongguolv) + '</label>';
                }
                if (item.kaMax != null && item.kaMax != '') {
                    listzqStr += '<label class="label f-blue b-blue">额度:' + item.kaMax + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.kaTopic;
                zhutib = item.kaCompany;
            }else if (manyType == '14') {
                if($("#sysType").val() == '2'){//流量云

                    listzqStr += '<li class="weui-news-item" onclick=toAgentDaikuanLLyDetail("'+item.id+'&type=2","1");>';

                }else{
                    listzqStr += '<li class="weui-news-item" onclick=toAgentDaikuanDetail("'+item.id+'","1");>';

                }

                /*listzqStr += '<div class="weui-news-inner">';*/

/*
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.daikuanImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;">';
*/

                /*if (item.daikuanJiaobiao != null && item.daikuanJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.daikuanJiaobiao + '</span>';
                        } else {
                            if (item.daikuanLabel != null && item.daikuanLabel != '') {
                                var str = item.daikuanLabel; //这是一字符串
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
                        if (item.daikuanLabel != null && item.daikuanLabel != '') {
                            var str = item.daikuanLabel; //这是一字符串
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
                    if (item.daikuanLabel != null && item.daikuanLabel != '') {
                        var str = item.daikuanLabel; //这是一字符串
                        var strs= new Array(); //定义一数组
                        strs=str.split("/"); //字符分割
                        for (i=0;i<strs.length ;i++ )
                        {
                            if(i == 0){
                                listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                            }

                        }
                    }
                }*/


                /*listzqStr += '</div>';*/
                listzqStr += '<div class="weui-news-inners" style="min-height: 30px;">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title"><img src="'+checkPath(item.daikuanImage, "1")+'"  style="height: 50px;width:50px;border-radius: 100px;vertical-align: middle;" ><span style=\"vertical-align: middle;font-size: 20px;margin-left: 15px;\">&nbsp;&nbsp;' + item.daikuanTitle + '</span>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.daikuanEdu != null && item.daikuanEdu != '') {
                    listzqStr += '<label class="label f-red b-red">额度' + setNULL(item.daikuanEdu) + '</label>';
                }
                if (item.daikuanLilv != null && item.daikuanLilv != '') {
                    listzqStr += '<label class="label f-blue b-blue">' + item.daikuanLilv + '</label>';
                }
                /*if (item.daikuanQixian != null && item.daikuanQixian != '') {
                    listzqStr += '<label class="label f-blue b-blue">' + item.daikuanQixian + '</label>';
                }*/
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.daikuanTopic;
            }else if (manyType == '15') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentKaDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.kaImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.kaJiaobiao != null && item.kaJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.kaJiaobiao + '</span>';
                        } else {
                            if (item.kaLabel != null && item.kaLabel != '') {
                                var str = item.kaLabel; //这是一字符串
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
                        if (item.kaLabel != null && item.kaLabel != '') {
                            var str = item.kaLabel; //这是一字符串
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
                    if (item.kaLabel != null && item.kaLabel != '') {
                        var str = item.kaLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.kaTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.kaTongguolv != null && item.kaTongguolv != '') {
                    listzqStr += '<label class="label f-red b-red">通过率:' + setNULL(item.kaTongguolv) + '</label>';
                }
                if (item.kaMax != null && item.kaMax != '') {
                    listzqStr += '<label class="label f-blue b-blue">额度:' + item.kaMax + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.kaTopic;
                zhutib = item.kaCompany;

            }


        });


        //渲染赋值
        if (renderType == '1') {
            $("#" + renderId + "").append(listzqStr);
        } else {
            $("#" + renderId + "").html(listzqStr);
        }
        if(listzqStr != null && listzqStr != ''){
            $("#dis" + renderId + "").show();
        }
        if(zhutia != null && zhutia != ''){
            $("#zhutimingchenga").html(zhutia);
        }
        else if(zhutib != null && zhutib != ''){
            $("#zhutimingchengb").html(zhutib);
        }
    } else {
        $.toast(data.msg, "text");
        if (rs.data.code == '-1') {
            localStorage.setItem('token', '');
            if (localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == '') {
                isLogin('', '');
            }
        }
    }
}
function listzqRender2(data,renderId,renderType,manyType) {
    var listzqStr = '';
    //console.log(data.result)

    if (data.code == '0') {
        var zhutia = '';
        var zhutib = '';
        $.each(data.result, function (i, item) {

            if (manyType == '0') {//disanf会员列表

                listzqStr += '';
                listzqStr += '<li class="weui-news-item" onclick=toHuiYuanDetail("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media " style="background-image:url(' + checkPathBackGroubdImage(item.huiyuanImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.huiyuanJiaobiao != null && item.huiyuanJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.huiyuanJiaobiao + '</span>';
                        } else {

                            if (item.huiyuanPrice != null && eval(item.huiyuanPrice) > 0.00) {
                                listzqStr += '<span class="weui-mark-rt bg-red">￥' + setNum(item.huiyuanPrice) + '</span>';
                            } else {
                                listzqStr += '<span class="weui-mark-rt bg-green">免费</span>';
                            }
                        }

                    } else {

                        if (item.huiyuanPrice != null && eval(item.huiyuanPrice) > 0.00) {
                            listzqStr += '<span class="weui-mark-rt bg-red">￥' + setNum(item.huiyuanPrice) + '</span>';
                        } else {
                            listzqStr += '<span class="weui-mark-rt bg-green">免费</span>';
                        }
                    }

                } else {

                    if (item.huiyuanPrice != null && eval(item.huiyuanPrice) > 0.00) {
                        listzqStr += '<span class="weui-mark-rt bg-red">￥' + setNum(item.huiyuanPrice) + '</span>';
                    } else {
                        listzqStr += '<span class="weui-mark-rt bg-green">免费</span>';
                    }
                }

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + item.huiyuanTitle + '';
                listzqStr += '<p class="weui-news-p onerow">';
                listzqStr += '' + item.huiyuanLabel + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype) + '</label>';
                    listzqStr += '<label class="label f-blue b-blue">' + item.huiyuanJiesuan + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.huiyuanDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';


            } else if (manyType == '1') {

                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '2') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentKaDetail("'+item.id+'","1");> ';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.kaImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.kaJiaobiao != null && item.kaJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.kaJiaobiao + '</span>';
                        } else {
                            if (item.kaLabel != null && item.kaLabel != '') {
                                var str = item.kaLabel; //这是一字符串
                                var strs= new Array(); //定义一数组
                                strs=str.split("/"); //字符分割
                                for (i=0;i<strs.length ;i++ )
                                {
                                    if(i == 0){
                                        listzqStr += '<span class="weui-mark-rt bg-red">'+strs[i]+'</span>';
                                    }

                                }

                            }
                        }

                    } else {
                        if (item.kaLabel != null && item.kaLabel != '') {
                            var str = item.kaLabel; //这是一字符串
                            var strs= new Array(); //定义一数组
                            strs=str.split("/"); //字符分割
                            for (i=0;i<strs.length ;i++ )
                            {
                                if(i == 0){
                                    listzqStr += '<span class="weui-mark-rt bg-red">'+strs[i]+'</span>';
                                }

                            }
                        }
                    }

                } else {
                    if (item.kaLabel != null && item.kaLabel != '') {
                        var str = item.kaLabel; //这是一字符串
                        var strs= new Array(); //定义一数组
                        strs=str.split("/"); //字符分割
                        for (i=0;i<strs.length ;i++ )
                        {
                            if(i == 0){
                                listzqStr += '<span class="weui-mark-rt bg-red">'+strs[i]+'</span>';
                            }

                        }
                    }
                }


                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">' + item.kaTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype) + '</label>';
                    if(item.kaJiesuan != null && item.kaJiesuan != ''){
                        listzqStr += '<label class="label f-blue b-blue">' + item.kaJiesuan + '</label>';
                    }

                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.kaTopic;
                zhutib = item.kaCompany;

            } else if (manyType == '3') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentDaikuanDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media " style="background-image:url(' + checkPathBackGroubdImage(item.daikuanImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 20px;">';

                if (item.daikuanJiaobiao != null && item.daikuanJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.daikuanJiaobiao + '</span>';
                        } else {
                            if (item.daikuanLabel != null && item.daikuanLabel != '') {
                                var str = item.daikuanLabel; //这是一字符串
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
                        if (item.daikuanLabel != null && item.daikuanLabel != '') {
                            var str = item.daikuanLabel; //这是一字符串
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
                    if (item.daikuanLabel != null && item.daikuanLabel != '') {
                        var str = item.daikuanLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.daikuanTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype) + '</label>';
                    if(item.daikuanJiesuan != null && item.daikuanJiesuan != ''){
                        listzqStr += '<label class="label f-blue b-blue">' + item.daikuanJiesuan + '</label>';
                    }

                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.daikuanTopic;

            } else if (manyType == '4') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentBaoxianDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.baoxianImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.baoxianJiaobiao != null && item.baoxianJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.baoxianJiaobiao + '</span>';
                        } else {
                            if (item.baoxianLabel != null && item.baoxianLabel != '') {

                                var str = item.baoxianLabel; //这是一字符串
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
                        if (item.baoxianLabel != null && item.baoxianLabel != '') {
                            var str = item.baoxianLabel; //这是一字符串
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
                    if (item.baoxianLabel != null && item.baoxianLabel != '') {
                        var str = item.baoxianLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.baoxianTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype) + '</label>';
                    listzqStr += '<label class="label f-blue b-blue">' + item.baoxianJiesuan + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.baoxianDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '5') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentJiJinDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.jijinImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.jijinJiaobiao != null && item.jijinJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.jijinJiaobiao + '</span>';
                        } else {
                            if (item.jijinLabel != null && item.jijinLabel != '') {
                                var str = item.jijinLabel; //这是一字符串
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
                        if (item.jijinLabel != null && item.jijinLabel != '') {
                            var str = item.jijinLabel; //这是一字符串
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
                    if (item.jijinLabel != null && item.jijinLabel != '') {
                        var str = item.jijinLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.jijinTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">￥' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype)+ '</label>';
                    listzqStr += '<label class="label f-blue b-blue">' + item.jijinJiesuan + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.jijinDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '6' && i < 9) {
                listzqStr += '<li onclick=toDcKaList("zhutituijian","13","1","'+item.value+'")>';
                listzqStr += '<span class="shadowonly"  style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:round;background-size:cover;border-radius: 10px;"><span class="weui-mark-lb boem">'+item.label+'</span></span>';
                listzqStr += '</li>';

            } else if (manyType == '7' && i < 9) {
                //console.log(data.result)
                listzqStr += '<li onclick=toDcDaikuanList("zhutituijiandaikuan","14","1","'+item.value+'")>';
                listzqStr += '<span class="shadowonly"  style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:round;background-size:cover;border-radius: 10px;"><span class="weui-mark-lb boem">'+item.label+'</span></span>';
                listzqStr += '</li>';

            } else if (manyType == '8' && i < 9) {
                listzqStr += '<li onclick=toDcKaList("remenyinhang","15","1","'+item.value+'")>';
                listzqStr += '<span class="shadowonly"  style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:round;background-size:cover;border-radius: 10px;"><span class="weui-mark-lb boem">'+item.label+'</span></span>';
                listzqStr += '</li>';

            } else if (manyType == '9') {

                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square shadowonly" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '10') {
                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '11') {
                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '12') {
                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
            } else if (manyType == '13') {
                if($("#sysType").val() == '2'){//流量云
                    listzqStr += '<li class="weui-news-item" onclick=toAgentKaLLyDetail("'+item.id+'","1");>';
                }else{
                    listzqStr += '<li class="weui-news-item" onclick=toAgentKaDetail("'+item.id+'","1");>';
                }


                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.kaImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.kaJiaobiao != null && item.kaJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.kaJiaobiao + '</span>';
                        } else {
                            if (item.kaLabel != null && item.kaLabel != '') {
                                var str = item.kaLabel; //这是一字符串
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
                        if (item.kaLabel != null && item.kaLabel != '') {
                            var str = item.kaLabel; //这是一字符串
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
                    if (item.kaLabel != null && item.kaLabel != '') {
                        var str = item.kaLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.kaTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.kaTongguolv != null && item.kaTongguolv != '') {
                    listzqStr += '<label class="label f-red b-red">通过率:' + setNULL(item.kaTongguolv) + '</label>';
                }
                if (item.kaMax != null && item.kaMax != '') {
                    listzqStr += '<label class="label f-blue b-blue">额度:' + item.kaMax + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.kaTopic;
                zhutib = item.kaCompany;
            }else if (manyType == '14') {
                if($("#sysType").val() == '2'){//流量云

                    listzqStr += '<li class="weui-news-item" onclick=toAgentDaikuanLLyDetail("'+item.id+'&type=2","1");>';

                }else{
                    listzqStr += '<li class="weui-news-item" onclick=toAgentDaikuanDetail("'+item.id+'","1");>';

                }

                /*listzqStr += '<div class="weui-news-inner">';*/

                /*
                                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.daikuanImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;">';
                */

                /*if (item.daikuanJiaobiao != null && item.daikuanJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.daikuanJiaobiao + '</span>';
                        } else {
                            if (item.daikuanLabel != null && item.daikuanLabel != '') {
                                var str = item.daikuanLabel; //这是一字符串
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
                        if (item.daikuanLabel != null && item.daikuanLabel != '') {
                            var str = item.daikuanLabel; //这是一字符串
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
                    if (item.daikuanLabel != null && item.daikuanLabel != '') {
                        var str = item.daikuanLabel; //这是一字符串
                        var strs= new Array(); //定义一数组
                        strs=str.split("/"); //字符分割
                        for (i=0;i<strs.length ;i++ )
                        {
                            if(i == 0){
                                listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                            }

                        }
                    }
                }*/


                /*listzqStr += '</div>';*/
                listzqStr += '<div class="weui-news-inners" style="min-height: 30px;">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title"><img src="'+checkPath(item.daikuanImage, "1")+'"  style="height: 50px;width:50px;border-radius: 100px;vertical-align: middle;" ><span style=\"vertical-align: middle;font-size: 20px;margin-left: 15px;\">&nbsp;&nbsp;' + item.daikuanTitle + '</span>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.daikuanEdu != null && item.daikuanEdu != '') {
                    listzqStr += '<label class="label f-red b-red">额度' + setNULL(item.daikuanEdu) + '</label>';
                }
                if (item.daikuanLilv != null && item.daikuanLilv != '') {
                    listzqStr += '<label class="label f-blue b-blue">' + item.daikuanLilv + '</label>';
                }
                /*if (item.daikuanQixian != null && item.daikuanQixian != '') {
                    listzqStr += '<label class="label f-blue b-blue">' + item.daikuanQixian + '</label>';
                }*/
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.daikuanTopic;
            }else if (manyType == '15') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentKaDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.kaImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.kaJiaobiao != null && item.kaJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.kaJiaobiao + '</span>';
                        } else {
                            if (item.kaLabel != null && item.kaLabel != '') {
                                var str = item.kaLabel; //这是一字符串
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
                        if (item.kaLabel != null && item.kaLabel != '') {
                            var str = item.kaLabel; //这是一字符串
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
                    if (item.kaLabel != null && item.kaLabel != '') {
                        var str = item.kaLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.kaTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.kaTongguolv != null && item.kaTongguolv != '') {
                    listzqStr += '<label class="label f-red b-red">通过率:' + setNULL(item.kaTongguolv) + '</label>';
                }
                if (item.kaMax != null && item.kaMax != '') {
                    listzqStr += '<label class="label f-blue b-blue">额度:' + item.kaMax + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.kaTopic;
                zhutib = item.kaCompany;

            }


        });


        //渲染赋值
        if (renderType == '1') {
            $("#" + renderId + "").append(listzqStr);
        } else {
            $("#" + renderId + "").html(listzqStr);
        }
        if(listzqStr != null && listzqStr != ''){
            $("#dis" + renderId + "").show();
        }
        if(zhutia != null && zhutia != ''){
            $("#zhutimingchenga").html(zhutia);
        }
        else if(zhutib != null && zhutib != ''){
            $("#zhutimingchengb").html(zhutib);
        }
    } else {
        $.toast(data.msg, "text");
        if (rs.data.code == '-1') {
            localStorage.setItem('token', '');
            if (localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == '') {
                isLogin('', '');
            }
        }
    }
}
function listzqRender3(data,renderId,renderType,manyType) {
    var listzqStr = '';
    //console.log(data.result)

    if (data.code == '0') {
        var zhutia = '';
        var zhutib = '';
        $.each(data.result, function (i, item) {

            if (manyType == '0') {//disanf会员列表

                listzqStr += '';
                listzqStr += '<li class="weui-news-item" onclick=toHuiYuanDetail("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media " style="background-image:url(' + checkPathBackGroubdImage(item.huiyuanImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.huiyuanJiaobiao != null && item.huiyuanJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.huiyuanJiaobiao + '</span>';
                        } else {

                            if (item.huiyuanPrice != null && eval(item.huiyuanPrice) > 0.00) {
                                listzqStr += '<span class="weui-mark-rt bg-red">￥' + setNum(item.huiyuanPrice) + '</span>';
                            } else {
                                listzqStr += '<span class="weui-mark-rt bg-green">免费</span>';
                            }
                        }

                    } else {

                        if (item.huiyuanPrice != null && eval(item.huiyuanPrice) > 0.00) {
                            listzqStr += '<span class="weui-mark-rt bg-red">￥' + setNum(item.huiyuanPrice) + '</span>';
                        } else {
                            listzqStr += '<span class="weui-mark-rt bg-green">免费</span>';
                        }
                    }

                } else {

                    if (item.huiyuanPrice != null && eval(item.huiyuanPrice) > 0.00) {
                        listzqStr += '<span class="weui-mark-rt bg-red">￥' + setNum(item.huiyuanPrice) + '</span>';
                    } else {
                        listzqStr += '<span class="weui-mark-rt bg-green">免费</span>';
                    }
                }

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + item.huiyuanTitle + '';
                listzqStr += '<p class="weui-news-p onerow">';
                listzqStr += '' + item.huiyuanLabel + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype) + '</label>';
                    listzqStr += '<label class="label f-blue b-blue">' + item.huiyuanJiesuan + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.huiyuanDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';


            } else if (manyType == '1') {

                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '2') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentKaDetail("'+item.id+'","1");> ';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.kaImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.kaJiaobiao != null && item.kaJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.kaJiaobiao + '</span>';
                        } else {
                            if (item.kaLabel != null && item.kaLabel != '') {
                                var str = item.kaLabel; //这是一字符串
                                var strs= new Array(); //定义一数组
                                strs=str.split("/"); //字符分割
                                for (i=0;i<strs.length ;i++ )
                                {
                                    if(i == 0){
                                        listzqStr += '<span class="weui-mark-rt bg-red">'+strs[i]+'</span>';
                                    }

                                }

                            }
                        }

                    } else {
                        if (item.kaLabel != null && item.kaLabel != '') {
                            var str = item.kaLabel; //这是一字符串
                            var strs= new Array(); //定义一数组
                            strs=str.split("/"); //字符分割
                            for (i=0;i<strs.length ;i++ )
                            {
                                if(i == 0){
                                    listzqStr += '<span class="weui-mark-rt bg-red">'+strs[i]+'</span>';
                                }

                            }
                        }
                    }

                } else {
                    if (item.kaLabel != null && item.kaLabel != '') {
                        var str = item.kaLabel; //这是一字符串
                        var strs= new Array(); //定义一数组
                        strs=str.split("/"); //字符分割
                        for (i=0;i<strs.length ;i++ )
                        {
                            if(i == 0){
                                listzqStr += '<span class="weui-mark-rt bg-red">'+strs[i]+'</span>';
                            }

                        }
                    }
                }


                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">' + item.kaTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype) + '</label>';
                    if(item.kaJiesuan != null && item.kaJiesuan != ''){
                        listzqStr += '<label class="label f-blue b-blue">' + item.kaJiesuan + '</label>';
                    }

                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.kaTopic;
                zhutib = item.kaCompany;

            } else if (manyType == '3') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentDaikuanDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.daikuanImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 20px;">';

                if (item.daikuanJiaobiao != null && item.daikuanJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.daikuanJiaobiao + '</span>';
                        } else {
                            if (item.daikuanLabel != null && item.daikuanLabel != '') {
                                var str = item.daikuanLabel; //这是一字符串
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
                        if (item.daikuanLabel != null && item.daikuanLabel != '') {
                            var str = item.daikuanLabel; //这是一字符串
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
                    if (item.daikuanLabel != null && item.daikuanLabel != '') {
                        var str = item.daikuanLabel; //这是一字符串
                        var strs= new Array(); //定义一数组
                        strs=str.split("/"); //字符分割
                        for (i=0;i<strs.length ;i++ )
                        {
                            if(i == 0){
                                listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                            }

                        }
                    }else{
                        /*listzqStr += '<span class="weui-mark-rt bg-red">￥'+setNum(item.daikuanPrice)+'</span>';*/
                    }
                }


                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">' + item.daikuanTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype) + '</label>';
                    if(item.daikuanJiesuan != null && item.daikuanJiesuan != ''){
                        listzqStr += '<label class="label f-blue b-blue">' + item.daikuanJiesuan + '</label>';
                    }

                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.daikuanTopic;

            } else if (manyType == '4') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentBaoxianDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.baoxianImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.baoxianJiaobiao != null && item.baoxianJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.baoxianJiaobiao + '</span>';
                        } else {
                            if (item.baoxianLabel != null && item.baoxianLabel != '') {

                                var str = item.baoxianLabel; //这是一字符串
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
                        if (item.baoxianLabel != null && item.baoxianLabel != '') {
                            var str = item.baoxianLabel; //这是一字符串
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
                    if (item.baoxianLabel != null && item.baoxianLabel != '') {
                        var str = item.baoxianLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.baoxianTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype) + '</label>';
                    listzqStr += '<label class="label f-blue b-blue">' + item.baoxianJiesuan + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.baoxianDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '5') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentJiJinDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.jijinImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.jijinJiaobiao != null && item.jijinJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.jijinJiaobiao + '</span>';
                        } else {
                            if (item.jijinLabel != null && item.jijinLabel != '') {
                                var str = item.jijinLabel; //这是一字符串
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
                        if (item.jijinLabel != null && item.jijinLabel != '') {
                            var str = item.jijinLabel; //这是一字符串
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
                    if (item.jijinLabel != null && item.jijinLabel != '') {
                        var str = item.jijinLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.jijinTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">￥' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype)+ '</label>';
                    listzqStr += '<label class="label f-blue b-blue">' + item.jijinJiesuan + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.jijinDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '6' && i < 9) {
                listzqStr += '<li onclick=toDcKaList("zhutituijian","13","1","'+item.value+'")>';
                listzqStr += '<span class="shadowonly"  style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:round;background-size:cover;border-radius: 10px;"><span class="weui-mark-lb boem">'+item.label+'</span></span>';
                listzqStr += '</li>';

            } else if (manyType == '7' && i < 9) {
                //console.log(data.result)
                listzqStr += '<li onclick=toDcDaikuanList("zhutituijiandaikuan","14","1","'+item.value+'")>';
                listzqStr += '<span class="shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:round;background-size:cover;border-radius: 10px;"><span class="weui-mark-lb boem">'+item.label+'</span></span>';
                listzqStr += '</li>';

            } else if (manyType == '8' && i < 9) {
                listzqStr += '<li onclick=toDcKaList("remenyinhang","15","1","'+item.value+'")>';
                listzqStr += '<span class="shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:round;background-size:cover;border-radius: 10px;"><span class="weui-mark-lb boem">'+item.label+'</span></span>';
                listzqStr += '</li>';

            } else if (manyType == '9') {

                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '10') {
                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '11') {
                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '12') {
                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
            } else if (manyType == '13') {
                if($("#sysType").val() == '2'){//流量云
                    listzqStr += '<li class="weui-news-item" onclick=toAgentKaLLyDetail("'+item.id+'","1");>';
                }else{
                    listzqStr += '<li class="weui-news-item" onclick=toAgentKaDetail("'+item.id+'","1");>';
                }


                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.kaImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.kaJiaobiao != null && item.kaJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.kaJiaobiao + '</span>';
                        } else {
                            if (item.kaLabel != null && item.kaLabel != '') {
                                var str = item.kaLabel; //这是一字符串
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
                        if (item.kaLabel != null && item.kaLabel != '') {
                            var str = item.kaLabel; //这是一字符串
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
                    if (item.kaLabel != null && item.kaLabel != '') {
                        var str = item.kaLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.kaTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.kaTongguolv != null && item.kaTongguolv != '') {
                    listzqStr += '<label class="label f-red b-red">通过率:' + setNULL(item.kaTongguolv) + '</label>';
                }
                if (item.kaMax != null && item.kaMax != '') {
                    listzqStr += '<label class="label f-blue b-blue">额度:' + item.kaMax + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.kaTopic;
                zhutib = item.kaCompany;
            }else if (manyType == '14') {
                if($("#sysType").val() == '2'){//流量云

                    listzqStr += '<li class="weui-news-item" onclick=toAgentDaikuanLLyDetail("'+item.id+'&type=2","1");>';

                }else{
                    listzqStr += '<li class="weui-news-item" onclick=toAgentDaikuanDetail("'+item.id+'","1");>';

                }

                /*listzqStr += '<div class="weui-news-inner">';*/

                /*
                                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.daikuanImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;">';
                */

                /*if (item.daikuanJiaobiao != null && item.daikuanJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.daikuanJiaobiao + '</span>';
                        } else {
                            if (item.daikuanLabel != null && item.daikuanLabel != '') {
                                var str = item.daikuanLabel; //这是一字符串
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
                        if (item.daikuanLabel != null && item.daikuanLabel != '') {
                            var str = item.daikuanLabel; //这是一字符串
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
                    if (item.daikuanLabel != null && item.daikuanLabel != '') {
                        var str = item.daikuanLabel; //这是一字符串
                        var strs= new Array(); //定义一数组
                        strs=str.split("/"); //字符分割
                        for (i=0;i<strs.length ;i++ )
                        {
                            if(i == 0){
                                listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                            }

                        }
                    }
                }*/


                /*listzqStr += '</div>';*/
                listzqStr += '<div class="weui-news-inners" style="min-height: 30px;">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title"><img src="'+checkPath(item.daikuanImage, "1")+'"  style="height: 50px;width:50px;border-radius: 100px;vertical-align: middle;" ><span style=\"vertical-align: middle;font-size: 20px;margin-left: 15px;\">&nbsp;&nbsp;' + item.daikuanTitle + '</span>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.daikuanEdu != null && item.daikuanEdu != '') {
                    listzqStr += '<label class="label f-red b-red">额度' + setNULL(item.daikuanEdu) + '</label>';
                }
                if (item.daikuanLilv != null && item.daikuanLilv != '') {
                    listzqStr += '<label class="label f-blue b-blue">' + item.daikuanLilv + '</label>';
                }
                /*if (item.daikuanQixian != null && item.daikuanQixian != '') {
                    listzqStr += '<label class="label f-blue b-blue">' + item.daikuanQixian + '</label>';
                }*/
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.daikuanTopic;
            }else if (manyType == '15') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentKaDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.kaImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.kaJiaobiao != null && item.kaJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.kaJiaobiao + '</span>';
                        } else {
                            if (item.kaLabel != null && item.kaLabel != '') {
                                var str = item.kaLabel; //这是一字符串
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
                        if (item.kaLabel != null && item.kaLabel != '') {
                            var str = item.kaLabel; //这是一字符串
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
                    if (item.kaLabel != null && item.kaLabel != '') {
                        var str = item.kaLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.kaTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.kaTongguolv != null && item.kaTongguolv != '') {
                    listzqStr += '<label class="label f-red b-red">通过率:' + setNULL(item.kaTongguolv) + '</label>';
                }
                if (item.kaMax != null && item.kaMax != '') {
                    listzqStr += '<label class="label f-blue b-blue">额度:' + item.kaMax + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.kaTopic;
                zhutib = item.kaCompany;

            }


        });


        //渲染赋值
        if (renderType == '1') {
            $("#zuixinyingyongtool").prepend(listzqStr);
        } else {
            $("#" + renderId + "").html(listzqStr);
        }
       /* if(listzqStr != null && listzqStr != ''){
            $("#dis" + renderId + "").show();
        }
        if(zhutia != null && zhutia != ''){
            $("#zhutimingchenga").html(zhutia);
        }
        else if(zhutib != null && zhutib != ''){
            $("#zhutimingchengb").html(zhutib);
        }*/
    } else {
        $.toast(data.msg, "text");
        if (rs.data.code == '-1') {
            localStorage.setItem('token', '');
            if (localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == '') {
                isLogin('', '');
            }
        }
    }
}
function listzqRender4(data,renderId,renderType,manyType) {
    var listzqStr = '';
    //console.log(data.result)

    if (data.code == '0') {
        var zhutia = '';
        var zhutib = '';
        $.each(data.result, function (i, item) {

            if (manyType == '0') {//disanf会员列表

                listzqStr += '';
                listzqStr += '<li class="weui-news-item" onclick=toHuiYuanDetail("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media " style="background-image:url(' + checkPathBackGroubdImage(item.huiyuanImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.huiyuanJiaobiao != null && item.huiyuanJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.huiyuanJiaobiao + '</span>';
                        } else {

                            if (item.huiyuanPrice != null && eval(item.huiyuanPrice) > 0.00) {
                                //listzqStr += '<span class="weui-mark-rt bg-red">￥' + setNum(item.huiyuanPrice) + '</span>';
                            } else {
                               // listzqStr += '<span class="weui-mark-rt bg-green">免费</span>';
                            }
                        }

                    } else {

                        if (item.huiyuanPrice != null && eval(item.huiyuanPrice) > 0.00) {
                            //listzqStr += '<span class="weui-mark-rt bg-red">￥' + setNum(item.huiyuanPrice) + '</span>';
                        } else {
                           // listzqStr += '<span class="weui-mark-rt bg-green">免费</span>';
                        }
                    }

                } else {

                    if (item.huiyuanPrice != null && eval(item.huiyuanPrice) > 0.00) {
                        listzqStr += '<span class="weui-mark-rt bg-red">￥' + setNum(item.huiyuanPrice) + '</span>';
                    } else {
                        //listzqStr += '<span class="weui-mark-rt bg-green">免费</span>';
                    }
                }

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + item.huiyuanTitle + '';
                listzqStr += '<p class="weui-news-p onerow">';
                listzqStr += '' + item.huiyuanLabel + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">￥' + setNum(item.huiyuanPrice) + '</label>';
                    listzqStr += '<label class="label f-red b-red">' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype) + '</label>';
                    listzqStr += '<label class="label f-blue b-blue">' + item.huiyuanJiesuan + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.huiyuanDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';


            } else if (manyType == '1') {

                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '2') {
                listzqStr += '<li class="weui-news-item" onclick=toMyKadetail("'+item.id+'","1");> ';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="width: 4rem;">';

                listzqStr += '<img src="'+checkPath(item.kaImage,'1')+'" style="width: 100%;border-radius: 10px;" />';


                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">' + item.kaTitle + '';
                listzqStr += '<p class="weui-news-p onerow">';
                listzqStr += '' + item.kaLabel + '';
                listzqStr += '</p>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';

                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">' + yongjinbutie(setNum(item.vipshareAgent),item.sharePricetype,item.butie,item.bangka) + '</label>';

                    if(item.isZiying != null && item.isZiying != ''){
                        if(item.isZiying  == '1'){
                            listzqStr += '<label class="label f-red b-red">自营</label>';
                        }else{
                            listzqStr += '<label class="label f-red b-red">渠道</label>';
                        }

                    }

                    if(item.zhuceNum != null && eval(item.zhuceNum) > 0){
                        listzqStr += '<label class="label f-blue b-blue">T+' + item.zhuceNum + '</label>';
                    }else{
                        listzqStr += '<label class="label f-blue b-blue">立返</label>';
                    }



                }

                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.kaTopic;
                zhutib = item.kaCompany;

            } else if (manyType == '3') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentDaikuanDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.daikuanImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 20px;">';

                if (item.daikuanJiaobiao != null && item.daikuanJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.daikuanJiaobiao + '</span>';
                        } else {
                            if (item.daikuanLabel != null && item.daikuanLabel != '') {
                                var str = item.daikuanLabel; //这是一字符串
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
                        if (item.daikuanLabel != null && item.daikuanLabel != '') {
                            var str = item.daikuanLabel; //这是一字符串
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
                    if (item.daikuanLabel != null && item.daikuanLabel != '') {
                        var str = item.daikuanLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.daikuanTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype) + '</label>';
                    if(item.daikuanJiesuan != null && item.daikuanJiesuan != ''){
                        listzqStr += '<label class="label f-blue b-blue">' + item.daikuanJiesuan + '</label>';
                    }

                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.daikuanTopic;

            } else if (manyType == '4') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentBaoxianDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.baoxianImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.baoxianJiaobiao != null && item.baoxianJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.baoxianJiaobiao + '</span>';
                        } else {
                            if (item.baoxianLabel != null && item.baoxianLabel != '') {

                                var str = item.baoxianLabel; //这是一字符串
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
                        if (item.baoxianLabel != null && item.baoxianLabel != '') {
                            var str = item.baoxianLabel; //这是一字符串
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
                    if (item.baoxianLabel != null && item.baoxianLabel != '') {
                        var str = item.baoxianLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.baoxianTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype) + '</label>';
                    listzqStr += '<label class="label f-blue b-blue">' + item.baoxianJiesuan + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.baoxianDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '5') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentJiJinDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.jijinImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.jijinJiaobiao != null && item.jijinJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.jijinJiaobiao + '</span>';
                        } else {
                            if (item.jijinLabel != null && item.jijinLabel != '') {
                                var str = item.jijinLabel; //这是一字符串
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
                        if (item.jijinLabel != null && item.jijinLabel != '') {
                            var str = item.jijinLabel; //这是一字符串
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
                    if (item.jijinLabel != null && item.jijinLabel != '') {
                        var str = item.jijinLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.jijinTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.vipshareAgent != null && eval(item.vipshareAgent) > 0.00) {
                    listzqStr += '<label class="label f-red b-red">￥' + getYongjinMoney(setNum(item.vipshareAgent),item.sharePricetype)+ '</label>';
                    listzqStr += '<label class="label f-blue b-blue">' + item.jijinJiesuan + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.jijinDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '6' && i < 9) {
                listzqStr += '<li onclick=toDcKaList("zhutituijian","13","1","'+item.value+'")>';
                listzqStr += '<span class="shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:round;background-size:cover;border-radius: 10px;"><span class="weui-mark-lb boem">'+item.label+'</span></span>';
                listzqStr += '</li>';

            } else if (manyType == '7' && i < 9) {
                //console.log(data.result)
                listzqStr += '<li onclick=toDcDaikuanList("zhutituijiandaikuan","14","1","'+item.value+'")>';
                listzqStr += '<span class="shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:round;background-size:cover;border-radius: 10px;"><span class="weui-mark-lb boem">'+item.label+'</span></span>';
                listzqStr += '</li>';

            } else if (manyType == '8' && i < 9) {
                listzqStr += '<li onclick=toDcKaList("remenyinhang","15","1","'+item.value+'")>';
                listzqStr += '<span class="shadowonly" style="background-image:url('+checkPathBackGroubdImage(item.logo,"1")+');background-repeat:round;background-size:cover;border-radius: 10px;"><span class="weui-mark-lb boem">'+item.label+'</span></span>';
                listzqStr += '</li>';

            } else if (manyType == '9') {

                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '10') {
                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '11') {
                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';

            } else if (manyType == '12') {
                listzqStr += '<li class="weui-news-item" onclick=toUserHome("' + item.id + '","1")>';
                listzqStr += '<div class="weui-news-inner">';
                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.headimgurl, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-inners">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title">';
                listzqStr += '' + setNULL(item.nickname) + '';
                listzqStr += ' <p class="weui-news-p onerow">';
                listzqStr += '' + setNULL(item.userInfo) + '';
                listzqStr += '</p>';
                listzqStr += '</div>';

                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                listzqStr += '<label class="label f-blue b-blue">动态(' + setNum(item.dongtaiNum) + ')</label>';
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-96 weui-tabbar__icon" id="icon28"></i>' + setNum(item.funsGuanzhuNum) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
            } else if (manyType == '13') {
                if($("#sysType").val() == '2'){//流量云
                    listzqStr += '<li class="weui-news-item" onclick=toAgentKaLLyDetail("'+item.id+'","1");>';
                }else{
                    listzqStr += '<li class="weui-news-item" onclick=toAgentKaDetail("'+item.id+'","1");>';
                }


                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.kaImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.kaJiaobiao != null && item.kaJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.kaJiaobiao + '</span>';
                        } else {
                            if (item.kaLabel != null && item.kaLabel != '') {
                                var str = item.kaLabel; //这是一字符串
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
                        if (item.kaLabel != null && item.kaLabel != '') {
                            var str = item.kaLabel; //这是一字符串
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
                    if (item.kaLabel != null && item.kaLabel != '') {
                        var str = item.kaLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.kaTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.kaTongguolv != null && item.kaTongguolv != '') {
                    listzqStr += '<label class="label f-red b-red">通过率:' + setNULL(item.kaTongguolv) + '</label>';
                }
                if (item.kaMax != null && item.kaMax != '') {
                    listzqStr += '<label class="label f-blue b-blue">额度:' + item.kaMax + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.kaTopic;
                zhutib = item.kaCompany;
            }else if (manyType == '14') {
                if($("#sysType").val() == '2'){//流量云

                    listzqStr += '<li class="weui-news-item" onclick=toAgentDaikuanLLyDetail("'+item.id+'&type=2","1");>';

                }else{
                    listzqStr += '<li class="weui-news-item" onclick=toAgentDaikuanDetail("'+item.id+'","1");>';

                }

                /*listzqStr += '<div class="weui-news-inner">';*/

                /*
                                listzqStr += '<div class="weui-news-media square" style="background-image:url(' + checkPathBackGroubdImage(item.daikuanImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;">';
                */

                /*if (item.daikuanJiaobiao != null && item.daikuanJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.daikuanJiaobiao + '</span>';
                        } else {
                            if (item.daikuanLabel != null && item.daikuanLabel != '') {
                                var str = item.daikuanLabel; //这是一字符串
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
                        if (item.daikuanLabel != null && item.daikuanLabel != '') {
                            var str = item.daikuanLabel; //这是一字符串
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
                    if (item.daikuanLabel != null && item.daikuanLabel != '') {
                        var str = item.daikuanLabel; //这是一字符串
                        var strs= new Array(); //定义一数组
                        strs=str.split("/"); //字符分割
                        for (i=0;i<strs.length ;i++ )
                        {
                            if(i == 0){
                                listzqStr += '<span class="weui-mark-rt bg-red">' + strs[i] + '</span>';
                            }

                        }
                    }
                }*/


                /*listzqStr += '</div>';*/
                listzqStr += '<div class="weui-news-inners" style="min-height: 30px;">';
                listzqStr += '<div class="weui-news-text">';
                listzqStr += '<div class="weui-news-title"><img src="'+checkPath(item.daikuanImage, "1")+'"  style="height: 50px;width:50px;border-radius: 100px;vertical-align: middle;" ><span style=\"vertical-align: middle;font-size: 20px;margin-left: 15px;\">&nbsp;&nbsp;' + item.daikuanTitle + '</span>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.daikuanEdu != null && item.daikuanEdu != '') {
                    listzqStr += '<label class="label f-red b-red">额度' + setNULL(item.daikuanEdu) + '</label>';
                }
                if (item.daikuanLilv != null && item.daikuanLilv != '') {
                    listzqStr += '<label class="label f-blue b-blue">' + item.daikuanLilv + '</label>';
                }
                /*if (item.daikuanQixian != null && item.daikuanQixian != '') {
                    listzqStr += '<label class="label f-blue b-blue">' + item.daikuanQixian + '</label>';
                }*/
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.daikuanTopic;
            }else if (manyType == '15') {
                listzqStr += '<li class="weui-news-item" onclick=toAgentKaDetail("'+item.id+'","1");>';
                listzqStr += '<div class="weui-news-inner">';

                listzqStr += '<div class="weui-news-media" style="background-image:url(' + checkPathBackGroubdImage(item.kaImage, "1") + ');background-repeat:round;background-size:cover;margin:10px 8px 13px 0px;border-radius: 10px;">';

                if (item.kaJiaobiao != null && item.kaJiaobiao != '') {
                    if (item.jiaobiaoStart != null && item.jiaobiaoEnd != null) {
                        //console.log("item.jiaobiaoStart====="+item.jiaobiaoStart)
                        if (stringToDate(item.jiaobiaoStart).getTime() - new Date().getTime() < 0 && stringToDate(item.jiaobiaoEnd).getTime() - new Date().getTime() > 0) {
                            listzqStr += '<span class="weui-mark-rt bg-red">' + item.kaJiaobiao + '</span>';
                        } else {
                            if (item.kaLabel != null && item.kaLabel != '') {
                                var str = item.kaLabel; //这是一字符串
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
                        if (item.kaLabel != null && item.kaLabel != '') {
                            var str = item.kaLabel; //这是一字符串
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
                    if (item.kaLabel != null && item.kaLabel != '') {
                        var str = item.kaLabel; //这是一字符串
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
                listzqStr += '<div class="weui-news-title">' + item.kaTitle + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-info">';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<span class="weui-news-left" id="weui-news-left">';
                listzqStr += '<div class="weui-label-list" style="margin-left: 0px;">';
                if (item.kaTongguolv != null && item.kaTongguolv != '') {
                    listzqStr += '<label class="label f-red b-red">通过率:' + setNULL(item.kaTongguolv) + '</label>';
                }
                if (item.kaMax != null && item.kaMax != '') {
                    listzqStr += '<label class="label f-blue b-blue">额度:' + item.kaMax + '</label>';
                }
                listzqStr += '</div>';
                listzqStr += '</span>';
                listzqStr += '</div>';
                listzqStr += '<div class="weui-news-infoitem">';
                listzqStr += '<i class="icon icon-62 weui-tabbar__icon" id="icon28"></i>' + setNum(item.kaDianjiliang) + '';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</div>';
                listzqStr += '</li>';
                zhutia = item.kaTopic;
                zhutib = item.kaCompany;

            }


        });


        //渲染赋值
        if (renderType == '1') {
            $("#" + renderId + "").append(listzqStr);
        } else {
            $("#" + renderId + "").html(listzqStr);
        }
        if(listzqStr != null && listzqStr != ''){
            $("#dis" + renderId + "").show();
        }
        if(zhutia != null && zhutia != ''){
            $("#zhutimingchenga").html(zhutia);
        }
        else if(zhutib != null && zhutib != ''){
            $("#zhutimingchengb").html(zhutib);
        }
    } else {
        $.toast(data.msg, "text");
        if (rs.data.code == '-1') {
            localStorage.setItem('token', '');
            if (localStorage.getItem('token') == null || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == '') {
                isLogin('', '');
            }
        }
    }
}
