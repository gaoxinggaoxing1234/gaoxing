var curWwwPath = window.document.location.href;
var basehost = window.location.protocol+"//"+window.location.host;
if(curWwwPath.search("gaoxinggaoxing") == -1){
    basehost = "http://localhost:8080";//本地模式
}
//文件请求URL
var baseFileUrlUpload = ''+basehost+'';
var baseFileUrlUploadToServer = ''+basehost+'/sfd/a/api/';
//上传文件
var instanceupload = axios.create({
    baseURL: ''+basehost+'/sfd/a/api/',
    timeout: 18000000000,
    headers: {'token': localStorage.getItem('token')}
});



var timestamp = (new Date()).getTime();
//单个文件上传/多文件上传
function uploadFile(fileId,pathId,progressId,i){
    var files = document.getElementById(fileId).files;
    var file = files[i];
    var formdata=new FormData();// 创建form对象

    formdata.append('file',file);// 通过append向form对象添加数据,可以通过append继续添加数据


    $("body").append("<input type='hidden' id='"+fileId+"Url"+timestamp+i+"'  >");
    var config = {
        headers:{'Content-Type':'multipart/form-data'},

        onUploadProgress: (e) => {
            var percentComplete = Math.round(e.loaded*100 / e.total) // 上传的进度
            //console.log("上传进度"+percentComplete);
            $("#"+progressId+""+i+"").html(percentComplete+"%");
            //console.log(percentComplete)
            if(percentComplete == 100 ){
                //console.log(10000)
                $("#"+progressId+""+i+"").html("<span class='f12'>处理中</span>");
            }
        }

    };  //添加请求头
    instanceupload.post('/sys/upload/upload',formdata,config).then(function(rs){

        if(rs.status=200){
            //console.log("rs.status"+rs.status);
            //console.log("rs.data.code"+rs.data.code);

            if(rs.data.code == "0"){
                /*var timestamp = (new Date()).getTime();*/
                if($("#"+fileId+"Url"+timestamp+i+"").size() > 0){
                    $("#"+fileId+"Url"+timestamp+i+"").val(rs.data.result.dbPath);
                }else{
                    $("body").append("<input type='hidden' id='"+fileId+"Url"+timestamp+i+"' value='"+rs.data.result.dbPath+"' >");
                }
                $("#"+progressId+""+i+"").html('<i onclick=delfile(this,"'+fileId+'Url'+timestamp+i+'","'+i+'");  class="weui-icon-success"></i>');

            }else{
                $.toast(rs.data.msg, "text");
                $("#"+progressId+""+i+"").html('<i onclick=delfile(this,"'+fileId+'Url'+timestamp+i+'","'+i+'");  class="weui-icon-warn"></i>');
            }
        }else{
            console.log('请求异常！');
        }
    });
}

//单个图片压缩上传/多图片压缩上传
function uploadImageFile(fileId,pathId,progressId,i){
    var fileid = document.getElementById(fileId);
    var files = document.getElementById(fileId).files;
    var file = files[i];
    var formdata=new FormData();// 创建form对象

    //formdata.append('file',file);// 通过append向form对象添加数据,可以通过append继续添加数据
    lrz(files[i], {width: 750, fieldName: "file"}).then(function (data) {
        console.log("==================================");
        //console.log(data.base64);
        console.log("==================================");
        //formdata.append('file',data.file);// 通过append向form对象添加数据,可以通过append继续添加数据
        /*lrz(file,{
            width:800,    //设置图片压缩后的最大宽度，默认为原图宽度
            height:600,    //同上
            quality:0.7,    //图片压缩质量，取值 0 - 1，默认为 0.7
            fieldName:"aijquery"    //后端接收的字段名，默认：file,一般不用这项，我们要上传数据的话，可以自定义FormData对象
        }).then(function(rst){
            rst.formData //后端可处理的数据
            rst.file     //压缩后的file对象，如果压缩率太低，将会是原始file对象
            rst.fileLen //压缩后的图片的大小，
            rst.base64     //生成后的图片base64，后端可以处理此字符串为图片，也可以直接用于 img.src = base64
            rst.base64Len     //生成后的base64的大小，后端可以通过此值来校验是否传输完整
            rst.origin //原始的file对象，里面存放了一些原始文件的信息，例如大小、日期等
        }).catch(function(err){    //处理失败后执行

        }).always(function(){    //必然执行

        });*/
        //formdata = data.formData;
        formdata.append('imgbase64',data.base64);
        var timestamp = (new Date()).getTime();

        $("body").append("<input type='hidden' id='"+fileId+"Url"+timestamp+i+"'  >");

        var config = {
            headers:{'Content-Type':'multipart/form-data'},
            cache:false,
            processData: false, // 关关关！重点
            async: false,
            contentType: false
           /* onUploadProgress: (e) => {
                var percentComplete = Math.round(e.loaded*100 / e.total) // 上传的进度
                //console.log("上传进度"+percentComplete);
                $("#"+progressId+""+i+"").html(percentComplete+"%");
                //console.log(percentComplete)
                if(percentComplete == 100 ){
                    //console.log(10000)
                    $("#"+progressId+""+i+"").html("<span class='f12'>处理中</span>");
                }
            }*/

        };  //添加请求头
        instanceupload.post('/sys/upload/uploadbase64',formdata,config).then(function(rs){

            if(rs.status=200){
                //console.log("rs.status"+rs.status);
                //console.log("rs.data.code"+rs.data.code);

                if(rs.data.code == "0"){

                    if($("#"+fileId+"Url"+timestamp+i+"").size() > 0){
                        $("#"+fileId+"Url"+timestamp+i+"").val(rs.data.result.dbPath);
                    }else{
                        $("body").append("<input type='hidden' id='"+fileId+"Url"+timestamp+i+"' value='"+rs.data.result.dbPath+"' >");
                    }
                    $("#"+progressId+""+i+"").html('<i onclick=delfile(this,"'+fileId+'Url'+timestamp+i+'","'+i+'"); class="weui-icon-success"></i>');

                    var o=$("#"+progressId+""+i+"");
                    var q=$(o).parent();
                    $(q).css("background-image","url("+rs.data.result.dbPath+")");
                }else{
                    $.toast(rs.data.msg, "text");
                    $("#"+progressId+""+i+"").html('<i onclick=delfile(this,"'+fileId+'Url'+timestamp+i+'",""); class="weui-icon-warn"></i>');
                }
            }else{
                console.log('请求异常！');

            }
        });

    }).then(function (data) {
        //console.log(33);
    }).catch(function (err) {
        //console.log(44);
        //console.log(err);
    });


}


function delfile(obj,fileId,i) {
    $.confirm("您确定要删除吗?", "确认删除?", function() {
        var o=$(obj).parent();
        var q=$(o).parent();
        $(q).remove();


        $("#"+fileId+"").remove();

        /*var urls = $("input[id^="+fileId+"Url]");
        urls[i].remove();*/

    }, function() {
        //取消操作
    });


}
//获取返回上传文件地址
function pathUrl(fileId) {
    var urls = $("input[id^="+fileId+"Url]");
    var pathUrls = '';
    for(var i = 0;i < urls.length;i++){
        if(pathUrls == '' && $("#"+urls[i].id+"").val() != null && $("#"+urls[i].id+"").val() != ''){
            pathUrls +=$("#"+urls[i].id+"").val();
        }else if($("#"+urls[i].id+"").val() != null && $("#"+urls[i].id+"").val() != ''){
            pathUrls +=","+$("#"+urls[i].id+"").val();
        }
    }
    return pathUrls;
}



//清除上传文件
function qingchuUrl(fileId,uploaderFilesId,uploaderQingChuFiles) {
    var urls = $("input[id^="+fileId+"Url]");
    urls.remove();
    $("#"+uploaderFilesId+"").html("");
    $("#"+uploaderQingChuFiles+"").hide();
}

//清除上传文件
function qingchuAllUrl() {
    var urls = $("input[id^=uploaderInput]");
    urls.remove();
    $("#uploaderInputAFile").html("");
    $("#uploaderInputBFile").html("");
    $("#uploaderInputCFile").html("");

}

//详情设置上传文件地址
function pathSetUrl(fileId,i,pathUrl) {
    $("body").append("<input type='hidden' id='"+fileId+"Url"+i+"' value='"+pathUrl+"' >");
}


function getFileName(tmp_imgpath){
    tmp_imgpath = decodeURI(tmp_imgpath);
    if(tmp_imgpath != null && tmp_imgpath != '' && tmp_imgpath != 'undfined'){
        var obj=tmp_imgpath.lastIndexOf("/");
        var fileName = tmp_imgpath.substr(obj+1);
        return  fileName.substr(32,fileName.length);
    }else{
        return null;
    }

}
/*

//多个文件上传
function uploadFiles(fileId,pathId,progressId){
    var files = document.getElementById(fileId).files;
    var num = 0;
    for(var i = 0;i< files.length ;i++){
        var file = files[i];
        var formdata=new FormData();// 创建form对象
        formdata.append('file',file);// 通过append向form对象添加数据,可以通过append继续添加数据
        var config = {
            headers:{'Content-Type':'multipart/form-data'},
            onUploadProgress: (e) => {
                var percentComplete = Math.round(e.loaded*100 / e.total) // 上传的进度

                //$("#"+progressId+""+i+"").html(percentComplete+"%");
                $("div[id^="+progressId+"]").html('上传中');
                if(percentComplete = 100){
                    $("div[id^="+progressId+"]").html('<i class="weui-icon-success"></i>');
                   // $("#"+progressId+""+i+"").html('<i class="weui-icon-success"></i>');
                }

            }

        };  //添加请求头
        instanceupload.post('/sys/upload/upload',formdata,config).then(function(rs){
            //console.log(rs);
            if(rs.status=200){
                if(rs.data.code == "0"){
                    num ++ ;
                    $("#"+pathId+"").append(rs.data.result.dbPath);

                    console.log("num=="+num + "===" +rs.data.result.dbPath);
                }else{
                    $.toast(rs.data.msg, "text");
                }
            }else{
                console.log(detailuser + '请求异常！');

            }
        });
    }

}
*/

/*

//修改头像-上传图片
function uploadHeadImage(){
    var files = document.getElementById("uploaderInput").files;
    $("body").append("<div style='display:none;' id='HeadImageFiles'></div>");
    for(var i = 0;i< files.length ;i++){
        var file = files[i];
        var formdata=new FormData();// 创建form对象
        formdata.append('file',file);// 通过append向form对象添加数据,可以通过append继续添加数据
        var config = {
            headers:{'Content-Type':'multipart/form-data'},
            onUploadProgress: (e) => {
                var percentComplete = Math.round(e.loaded*100 / e.total) // 上传的进度
                $("#progress"+i+"").html(percentComplete+"%");
                if(percentComplete = 100){
                    $("#progress"+i+"").html('<i class="weui-icon-success"></i>');
                }
            }
        };  //添加请求头
        instanceupload.post('/sys/upload/upload',formdata,config).then(function(rs){
            //console.log(rs);
            if(rs.status=200){
                if(rs.data.code == "0"){
                    if(i==1){
                        $("#HeadImageFiles").append(rs.data.result.dbPath);
                        if(i==files.length){
                            //执行防重复提交保存
                            saveNRHeadImage();
                        }
                    }else{
                        $("#HeadImageFiles").append(","+rs.data.result.dbPath);
                        if(i==files.length){
                            //执行防重复提交保存
                            saveNRHeadImage();
                        }
                    }

                }else{
                    $.toast(rs.data.msg, "text");
                }
            }else{
                console.log(detailuser + '请求异常！')
            }
        });
    }

}
*/

//单个文件上传/多文件上传
function uploadFileBack(fileId,pathId,progressId,i){
    var files = document.getElementById(fileId).files;
    var file = files[i];
    var formdata=new FormData();// 创建form对象
    formdata.append('file',file);// 通过append向form对象添加数据,可以通过append继续添加数据
    var config = {
        headers:{'Content-Type':'multipart/form-data'},
        onUploadProgress: (e) => {
            var percentComplete = Math.round(e.loaded*100 / e.total) // 上传的进度
            console.log("上传进度"+percentComplete);
            $("#"+progressId+""+i+"").html(percentComplete+"%");
            if(percentComplete == 100 || percentComplete == '100' ){
                $("#"+progressId+""+i+"").html('<i class="weui-icon-success"></i>');
            }
        }


    };  //添加请求头
    instanceupload.post('/sys/upload/upload',formdata,config).then(function(rs){
        //console.log(rs);
        if(rs.status=200){
            if(rs.data.code == "0"){
                var timestamp = (new Date()).getTime();
                if($("#"+fileId+"Url"+timestamp+i+"").size() > 0){
                    $("#"+fileId+"Url"+timestamp+i+"").val(rs.data.result.dbPath);
                }else{
                    $("body").append("<input type='hidden' id='"+fileId+"Url"+timestamp+i+"' value='"+rs.data.result.dbPath+"' >");
                }

            }else{
                $.toast(rs.data.msg, "text");
            }
        }else{
            console.log('请求异常！');

        }
    });
}

/*

// 扩展API加载完毕后调用onPlusReady回调函数
document.addEventListener( "plusready", onPlusReady, false );
// 扩展API加载完毕，现在可以正常调用扩展API
function onPlusReady() {
    console.log("plusready");
}
// 摄像
function videoCapture(){
    var cmr = plus.camera.getCamera();
    var res = cmr.supportedVideoResolutions[0];
    var fmt = cmr.supportedVideoFormats[0];
    console.log("Resolution: "+res+", Format: "+fmt);
    cmr.startVideoCapture( function( path ){
            alert( "Capture video success: " + path );

        },
        function( error ) {
            //alert( "Capture video failed: " + error.message );
        },
        {resolution:res,format:fmt}
    );
}*/
