<!-- 信用卡评测 -->
function creditCardLoad(){
    var APPLYINFO = '';
    APPLYINFO += '<div id="creditCardWindow" class="weui-popup__container popup-bottom">';
    APPLYINFO += '<div class="weui-popup__overlay"></div>';
    APPLYINFO += '<div class="weui-popup__modal">';
    APPLYINFO += '<div class="toolbar">';
    APPLYINFO += '<div class="toolbar-inner">';
    APPLYINFO += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
    APPLYINFO += '<h1 class="title">提交申请</h1>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="modal-content">';
    APPLYINFO += '<div class="weui-cells weui-cells_form">';
    APPLYINFO += '<div id="applydiv" style="text-align: center;font-size: 12px;color:gray;"><p id="applytext"></p></div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd"><label class="weui-label">信用卡号</label></div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input"  id="bankNo" placeholder="请输入信用卡号" type="tel" >';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">姓名</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入姓名" id="userName1" type="text">';
    APPLYINFO += '</div>';

    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">身份证号</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入身份证号" id="idCard1"  type="text" >';
    APPLYINFO += '</div>';

    APPLYINFO += '</div>';
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree">';
    APPLYINFO += '<input id="weuiAgree" type="checkbox"  name="weuiAgree" checked class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="zhucexieyi.html">《用户服务协议》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree" style="display: none;">';
    APPLYINFO += '<input id="weuiAgreeData" type="checkbox" name="weuiAgreeData"  class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree" style="display: none;">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="baoxianxieyi.html">《领取说明及保障条款》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';



    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="page-bd-15 page-mypadding">';
    APPLYINFO += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick="saveCreditCard();">提交</a>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    $("body").append(APPLYINFO);
}


<!-- 大数据查询窗口 -->
function bigDataLoad(){
	
    var APPLYINFO = '';
    APPLYINFO += '<div id="bigDataWindow" class="weui-popup__container popup-bottom">';
    APPLYINFO += '<div class="weui-popup__overlay"></div>';
    APPLYINFO += '<div class="weui-popup__modal">';
    APPLYINFO += '<div class="toolbar">';
    APPLYINFO += '<div class="toolbar-inner">';
    APPLYINFO += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
    APPLYINFO += '<h1 class="title">提交申请</h1>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="modal-content">';
    APPLYINFO += '<div class="weui-cells weui-cells_form">';
    APPLYINFO += '<div id="applydiv" style="text-align: center;font-size: 12px;color:gray;"><p id="applytext"></p></div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd"><label class="weui-label">手机号</label></div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input"  id="phone" placeholder="请输入手机号" type="tel" >';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">姓名</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入姓名" id="userName2" type="text">';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">身份证号</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入身份证号" id="idCard2"  type="text" >';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">手机号密码</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="选填" id="phonePassword"  type="password" >';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';

    
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree">';
    APPLYINFO += '<input id="weuiAgree" type="checkbox"  name="weuiAgree" checked class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="zhucexieyi.html">《用户服务协议》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree" style="display: none;">';
    APPLYINFO += '<input id="weuiAgreeData" type="checkbox" name="weuiAgreeData"  class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree" style="display: none;">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="baoxianxieyi.html">《领取说明及保障条款》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';

    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="page-bd-15 page-mypadding">';
    APPLYINFO += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick="acquireBigData();">提交</a>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    $("body").append(APPLYINFO);
}



<!-- 阿里云信用查询 -->
function aliCreditDataLoad(){
	
    var APPLYINFO = '';
    APPLYINFO += '<div id="aliCreditWindow" class="weui-popup__container popup-bottom">';
    APPLYINFO += '<div class="weui-popup__overlay"></div>';
    APPLYINFO += '<div class="weui-popup__modal">';
    APPLYINFO += '<div class="toolbar">';
    APPLYINFO += '<div class="toolbar-inner">';
    APPLYINFO += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
    APPLYINFO += '<h1 class="title">提交申请</h1>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="modal-content">';
    APPLYINFO += '<div class="weui-cells weui-cells_form">';
    APPLYINFO += '<div id="applydiv" style="text-align: center;font-size: 12px;color:gray;"><p id="applytext"></p></div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd"><label class="weui-label">手机号</label></div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input"  id="phone" placeholder="请输入手机号" type="tel" >';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">姓名</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入姓名" id="userName2" type="text">';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">身份证号</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入身份证号" id="idCard2"  type="text" >';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    
    
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree">';
    APPLYINFO += '<input id="weuiAgree" type="checkbox"  name="weuiAgree" checked class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="zhucexieyi.html">《用户服务协议》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree" style="display: none;">';
    APPLYINFO += '<input id="weuiAgreeData" type="checkbox" name="weuiAgreeData"  class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree" style="display: none;">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="baoxianxieyi.html">《领取说明及保障条款》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';

    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="page-bd-15 page-mypadding">';
    APPLYINFO += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick="aliCreditQue(3);">提交</a>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    $("body").append(APPLYINFO);

}




<!-- 阿里云多头借贷详情版 -->
function aliMultiLoanLoad(){
	
    var APPLYINFO = '';
    APPLYINFO += '<div id="aliMultiLoanWindow" class="weui-popup__container popup-bottom">';
    APPLYINFO += '<div class="weui-popup__overlay"></div>';
    APPLYINFO += '<div class="weui-popup__modal">';
    APPLYINFO += '<div class="toolbar">';
    APPLYINFO += '<div class="toolbar-inner">';
    APPLYINFO += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
    APPLYINFO += '<h1 class="title">提交申请</h1>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="modal-content">';
    APPLYINFO += '<div class="weui-cells weui-cells_form">';
    APPLYINFO += '<div id="applydiv" style="text-align: center;font-size: 12px;color:gray;"><p id="applytext"></p></div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd"><label class="weui-label">手机号</label></div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input"  id="phone" placeholder="请输入手机号" type="tel" >';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree">';
    APPLYINFO += '<input id="weuiAgree" type="checkbox"  name="weuiAgree" checked class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="zhucexieyi.html">《用户服务协议》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree" style="display: none;" >';
    APPLYINFO += '<input id="weuiAgreeData" type="checkbox" name="weuiAgreeData"  class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree" style="display: none;">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="baoxianxieyi.html">《领取说明及保障条款》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';

    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="page-bd-15 page-mypadding">';
    APPLYINFO += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick="aliCreditQue(4);">提交</a>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    $("body").append(APPLYINFO);

}



<!-- 阿里云小贷负债历史 -->
function aliLoanLendLoad(){
	
	
    var APPLYINFO = '';
    APPLYINFO += '<div id="aliLoanLendWindow" class="weui-popup__container popup-bottom">';
    APPLYINFO += '<div class="weui-popup__overlay"></div>';
    APPLYINFO += '<div class="weui-popup__modal">';
    APPLYINFO += '<div class="toolbar">';
    APPLYINFO += '<div class="toolbar-inner">';
    APPLYINFO += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
    APPLYINFO += '<h1 class="title">提交申请</h1>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="modal-content">';
    APPLYINFO += '<div class="weui-cells weui-cells_form">';
    APPLYINFO += '<div id="applydiv" style="text-align: center;font-size: 12px;color:gray;"><p id="applytext"></p></div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__bd">';

    
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">姓名</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入姓名" id="userName2" type="text">';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">身份证号</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入身份证号" id="idCard2"  type="text" >';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';

    
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree" style="display: none;">';
    APPLYINFO += '<input id="weuiAgree" type="checkbox"  name="weuiAgree"  class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree" style="display: none;">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="zhucexieyi.html">《用户服务协议》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree" style="display: none;" >';
    APPLYINFO += '<input id="weuiAgreeData" type="checkbox" name="weuiAgreeData"  class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree" style="display: none;">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="baoxianxieyi.html">《领取说明及保障条款》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';

    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="page-bd-15 page-mypadding">';
    APPLYINFO += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick="aliCreditQue(5);">提交</a>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    $("body").append(APPLYINFO);

	
	
	
}



<!-- 阿里云 金融黑名单验证-网贷黑名单—简版 -->
function aliBlacklistDataLoad(){
	
    var APPLYINFO = '';
    APPLYINFO += '<div id="aliBlacklistWindow" class="weui-popup__container popup-bottom">';
    APPLYINFO += '<div class="weui-popup__overlay"></div>';
    APPLYINFO += '<div class="weui-popup__modal">';
    APPLYINFO += '<div class="toolbar">';
    APPLYINFO += '<div class="toolbar-inner">';
    APPLYINFO += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
    APPLYINFO += '<h1 class="title">提交申请</h1>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="modal-content">';
    APPLYINFO += '<div class="weui-cells weui-cells_form">';
    APPLYINFO += '<div id="applydiv" style="text-align: center;font-size: 12px;color:gray;"><p id="applytext"></p></div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd"><label class="weui-label">手机号</label></div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input"  id="phone" placeholder="请输入手机号" type="tel" >';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">姓名</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入姓名" id="userName2" type="text">';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">身份证号</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入身份证号" id="idCard2"  type="text" >';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    
    
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree">';
    APPLYINFO += '<input id="weuiAgree" type="checkbox"  name="weuiAgree" checked class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="zhucexieyi.html">《用户服务协议》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree" style="display: none;">';
    APPLYINFO += '<input id="weuiAgreeData" type="checkbox" name="weuiAgreeData"  class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree" style="display: none;">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="baoxianxieyi.html">《领取说明及保障条款》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';

    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="page-bd-15 page-mypadding">';
    APPLYINFO += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick="aliCreditQue(6);">提交</a>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    $("body").append(APPLYINFO);

}




<!-- 阿里云 互联网金融综合查询/反欺诈报告/借贷行为分析/运营商多维度分析 -->
function aliFraudCheckDataLoad(){
	
    var APPLYINFO = '';
    APPLYINFO += '<div id="aliFraudCheckWindow" class="weui-popup__container popup-bottom">';
    APPLYINFO += '<div class="weui-popup__overlay"></div>';
    APPLYINFO += '<div class="weui-popup__modal">';
    APPLYINFO += '<div class="toolbar">';
    APPLYINFO += '<div class="toolbar-inner">';
    APPLYINFO += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
    APPLYINFO += '<h1 class="title">提交申请</h1>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="modal-content">';
    APPLYINFO += '<div class="weui-cells weui-cells_form">';
    APPLYINFO += '<div id="applydiv" style="text-align: center;font-size: 12px;color:gray;"><p id="applytext"></p></div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd"><label class="weui-label">手机号</label></div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input"  id="phone" placeholder="请输入手机号" type="tel" >';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">姓名</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入姓名" id="userName2" type="text">';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">身份证号</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入身份证号" id="idCard2"  type="text" >';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    
    
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree">';
    APPLYINFO += '<input id="weuiAgree" type="checkbox"  name="weuiAgree" checked class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="zhucexieyi.html">《用户服务协议》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree" style="display: none;">';
    APPLYINFO += '<input id="weuiAgreeData" type="checkbox" name="weuiAgreeData"  class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree" style="display: none;">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="baoxianxieyi.html">《领取说明及保障条款》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';

    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="page-bd-15 page-mypadding">';
    APPLYINFO += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick="aliCreditQue(7);">提交</a>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    $("body").append(APPLYINFO);

}


<!-- 阿里云 互联网金融综合查询/反欺诈报告/借贷行为分析/运营商多维度分析 -->
function aliOverduePaymentDataLoad(){
	
    var APPLYINFO = '';
    APPLYINFO += '<div id="aliOverduePaymentkWindow" class="weui-popup__container popup-bottom">';
    APPLYINFO += '<div class="weui-popup__overlay"></div>';
    APPLYINFO += '<div class="weui-popup__modal">';
    APPLYINFO += '<div class="toolbar">';
    APPLYINFO += '<div class="toolbar-inner">';
    APPLYINFO += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
    APPLYINFO += '<h1 class="title">提交申请</h1>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="modal-content">';
    APPLYINFO += '<div class="weui-cells weui-cells_form">';
    APPLYINFO += '<div id="applydiv" style="text-align: center;font-size: 12px;color:gray;"><p id="applytext"></p></div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd"><label class="weui-label">手机号</label></div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input"  id="phone" placeholder="请输入手机号" type="tel" >';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">姓名</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入姓名" id="userName2" type="text">';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">身份证号</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入身份证号" id="idCard2"  type="text" >';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    
    
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree">';
    APPLYINFO += '<input id="weuiAgree" type="checkbox"  name="weuiAgree" checked class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="zhucexieyi.html">《用户服务协议》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree" style="display: none;">';
    APPLYINFO += '<input id="weuiAgreeData" type="checkbox" name="weuiAgreeData"  class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree" style="display: none;">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="baoxianxieyi.html">《领取说明及保障条款》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';

    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="page-bd-15 page-mypadding">';
    APPLYINFO += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick="aliCreditQue(8);">提交</a>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    $("body").append(APPLYINFO);

}


<!-- 阿里云 个人涉诉查询-个人行政处罚 -->
function  aliLawsuitInfoDataLoad(){
	
    var APPLYINFO = '';
    APPLYINFO += '<div id="aliLawsuitInfoWindow" class="weui-popup__container popup-bottom">';
    APPLYINFO += '<div class="weui-popup__overlay"></div>';
    APPLYINFO += '<div class="weui-popup__modal">';
    APPLYINFO += '<div class="toolbar">';
    APPLYINFO += '<div class="toolbar-inner">';
    APPLYINFO += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
    APPLYINFO += '<h1 class="title">提交申请</h1>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="modal-content">';
    APPLYINFO += '<div class="weui-cells weui-cells_form">';
    APPLYINFO += '<div id="applydiv" style="text-align: center;font-size: 12px;color:gray;"><p id="applytext"></p></div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__bd">';

    
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">姓名</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入姓名" id="userName2" type="text">';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">身份证号</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入身份证号" id="idCard2"  type="text" >';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';

    
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree">';
    APPLYINFO += '<input id="weuiAgree" type="checkbox"  name="weuiAgree" checked class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="zhucexieyi.html">《用户服务协议》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree" style="display: none;">';
    APPLYINFO += '<input id="weuiAgreeData" type="checkbox" name="weuiAgreeData"  class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree" style="display: none;">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="baoxianxieyi.html">《领取说明及保障条款》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';

    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="page-bd-15 page-mypadding">';
    APPLYINFO += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick="aliCreditQue(9);">提交</a>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    $("body").append(APPLYINFO);

	
	
	

}

<!-- 阿里云 互联网金融综合查询/反欺诈报告/借贷行为分析/运营商多维度分析 -->
function aliGetMultipleCDataLoad(){
	
    var APPLYINFO = '';
    APPLYINFO += '<div id="aliGetMultipleCWindow" class="weui-popup__container popup-bottom">';
    APPLYINFO += '<div class="weui-popup__overlay"></div>';
    APPLYINFO += '<div class="weui-popup__modal">';
    APPLYINFO += '<div class="toolbar">';
    APPLYINFO += '<div class="toolbar-inner">';
    APPLYINFO += '<a href="javascript:$.closePopup();" class="picker-button">关闭</a>';
    APPLYINFO += '<h1 class="title">提交申请</h1>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="modal-content">';
    APPLYINFO += '<div class="weui-cells weui-cells_form">';
    APPLYINFO += '<div id="applydiv" style="text-align: center;font-size: 12px;color:gray;"><p id="applytext"></p></div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd"><label class="weui-label">手机号</label></div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input"  id="phone" placeholder="请输入手机号" type="tel" >';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">姓名</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入姓名" id="userName2" type="text">';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    
    APPLYINFO += '<div class="weui-cell">';
    APPLYINFO += '<div class="weui-cell__hd">';
    APPLYINFO += '<label class="weui-label">身份证号</label>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="weui-cell__bd">';
    APPLYINFO += '<input class="weui-input" placeholder="请输入身份证号" id="idCard2"  type="text" >';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    
    
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree">';
    APPLYINFO += '<input id="weuiAgree" type="checkbox"  name="weuiAgree" checked class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="zhucexieyi.html">《用户服务协议》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="clear">';
    APPLYINFO += '<label  class="weui-agree readagree" style="display: none;">';
    APPLYINFO += '<input id="weuiAgreeData" type="checkbox" name="weuiAgreeData"  class="weui-agree__checkbox">';
    APPLYINFO += '<span class="weui-agree__text">阅读并同意';
    APPLYINFO += '</span>';
    APPLYINFO += '</label>';
    APPLYINFO += '<div class="divagree" style="display: none;">';
    APPLYINFO += '<span class="weui-agree weui-agree__text leftagree">';
    APPLYINFO += '<a href="baoxianxieyi.html">《领取说明及保障条款》</a>';
    APPLYINFO += '</span>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';

    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '<div class="page-bd-15 page-mypadding">';
    APPLYINFO += '<a href="javascript:;" class="weui-btn weui-btn_primary mybtn" onclick="aliCreditQue(10);">提交</a>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    APPLYINFO += '</div>';
    $("body").append(APPLYINFO);

}