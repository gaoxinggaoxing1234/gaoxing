<!-- 逾期记录查询详情信息 -->
function aliCreditDetailLoad(obj){
		 
				var RETRIEVEDETAIL ="";
		
			RETRIEVEDETAIL += '<div class="detail-user"  style="background: #ffffff;">';
    		RETRIEVEDETAIL += '<div class="user">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="font-size: 15px">'+obj.name+'</li>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
    		RETRIEVEDETAIL += '<span>身份证号: '+obj.idcard+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
    		RETRIEVEDETAIL += '<span>手机号: '+obj.mobile+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		
    		RETRIEVEDETAIL += '</ul>';
    		RETRIEVEDETAIL += '</div>';
    		RETRIEVEDETAIL += '<div class="line-detail">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="flex: 1">';
    		RETRIEVEDETAIL += '<span class="color-hui">结果描述：</span>';
    		RETRIEVEDETAIL += '<span class="color-det">'+obj.description+'</span>';
    		RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '</ul>';            
            RETRIEVEDETAIL += '</div>'; 
            RETRIEVEDETAIL += '</div>';  
            
            RETRIEVEDETAIL += '<div class="information-list">';
            RETRIEVEDETAIL += '<div class="information-list-li">';   
            RETRIEVEDETAIL += '<span class="line-blue"></span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">逾期详情</span>';
            RETRIEVEDETAIL += '</div>';
            RETRIEVEDETAIL += '</div>'; 
            
            if(obj.res =='1'){
            for(var i=0; i<obj.overdue_info_list.length;i++){
            	
           	RETRIEVEDETAIL += '<div class="information-list">';
            RETRIEVEDETAIL += '<div class="detail-information-list">';
            RETRIEVEDETAIL += '<ul>';
            RETRIEVEDETAIL += '<li class="left-detail">平台代码</li>';
            RETRIEVEDETAIL += '<li class="">'+obj.overdue_info_list[i].platform+'</li>';  
            RETRIEVEDETAIL += '</ul>'; 
            RETRIEVEDETAIL += '</div>'; 
            RETRIEVEDETAIL += '<div class="detail-information-list">';   
            RETRIEVEDETAIL += '<ul>';
            RETRIEVEDETAIL += '<li class="left-detail">平台类型</li>'; 
            
            if(obj.overdue_info_list[i].p_type =="1"){
            	 RETRIEVEDETAIL += '<li class="">'+'银行'+'</li>';     
            }else  if(obj.overdue_info_list[i].p_type =="2"){
            	 RETRIEVEDETAIL += '<li class="">'+'非银行'+'</li>';     
            }
            
            RETRIEVEDETAIL += '</ul>'; 
            RETRIEVEDETAIL += '</div>'; 
            RETRIEVEDETAIL += '<div class="detail-information-list">';   
            RETRIEVEDETAIL += '<ul>';
            RETRIEVEDETAIL += '<li class="left-detail">逾期数量</li>';      
            RETRIEVEDETAIL += '<li class="">'+obj.overdue_info_list[i].counts+'</li>';       
            RETRIEVEDETAIL += '</ul>'; 
            RETRIEVEDETAIL += '</div>';
            RETRIEVEDETAIL += '<div class="detail-information-list">';   
            RETRIEVEDETAIL += '<ul>';
            RETRIEVEDETAIL += '<li class="left-detail">逾期金额区间</li>';      
            RETRIEVEDETAIL += '<li class="">'+obj.overdue_info_list[i].money+'</li>';       
            RETRIEVEDETAIL += '</ul>'; 
            RETRIEVEDETAIL += '</div>';
            RETRIEVEDETAIL += '<div class="detail-information-list">';   
            RETRIEVEDETAIL += '<ul>';
            RETRIEVEDETAIL += '<li class="left-detail">地址</li>';      
            RETRIEVEDETAIL += '<li class="">'+obj.overdue_info_list[i].province+'&nbsp;'+obj.overdue_info_list[i].city+'</li>';       
            RETRIEVEDETAIL += '</ul>'; 
            RETRIEVEDETAIL += '</div>';
            RETRIEVEDETAIL += '</div>';
				
				
			}
			
            }
         $("#sendOrdersDetail").append(RETRIEVEDETAIL); 
}




<!-- 多头借贷详信息 -->
function aliMultiLoanDetailLoad(obj){
				
				 
			var RETRIEVEDETAIL ="";
		
			RETRIEVEDETAIL += '<div class="detail-user"  style="background: #ffffff;">';
    		RETRIEVEDETAIL += '<div class="user">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="font-size: 15px">'+obj.mobile+'</li>';
    		RETRIEVEDETAIL += '</ul>';
    		RETRIEVEDETAIL += '</div>';
    		
    		
    		RETRIEVEDETAIL += '<div class="line-detail">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="flex: 1">';
    		RETRIEVEDETAIL += '<span class="color-hui">手机号归属地：</span>';
    		RETRIEVEDETAIL += '<span class="color-det">'+obj.province+'&nbsp;'+obj.city+'</span>';
    		RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '</ul>';            
            RETRIEVEDETAIL += '</div>'; 
            RETRIEVEDETAIL += '</div>';  
            
            for(var i=0; i<obj.detail.length;i++){
            	var detail=obj.detail[i];
            	
            	
           	RETRIEVEDETAIL += '<div class="information-list">';
            RETRIEVEDETAIL += '<div class="information-list-li">';   
            RETRIEVEDETAIL += '<ul>';
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="line-blue"></span>';
            if(detail.type =="TYD002"){
            	RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">信贷平台注册详情</span>';
            }else if(detail.type =="TYD004"){
            	RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">贷款申请详情</span>';
            }else if(detail.type =="TYD007"){
            	RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">贷款放款详情</span>';
            }else if(detail.type =="TYD009"){
            	RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">贷款驳回详情</span>';
            }else if(detail.type =="TYD012"){
            	RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">逾期平台详情查询</span>';
            }else if(detail.type =="TYD013"){
            	RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">欠款查询</span>';
            }
            RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">时间段: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+detail.cycle+'</span>';
            RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '</ul>'; 
            RETRIEVEDETAIL += '</div>';
            
              for(var y=0; y<detail.data.length;y++){
            var data=detail.data[y];
            
         	RETRIEVEDETAIL += '<div style="border-top:1px dashed #e0e0e0;" class="detail-information-list">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">平台代码：</span>';
    		RETRIEVEDETAIL += '<span >'+data.platformCode+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">平台类型：</span>';
    		  if(data.ptype =="1"){
            	 RETRIEVEDETAIL += '<li class="">'+'银行'+'</li>';     
            }else  if(data.ptype  =="2"){
            	 RETRIEVEDETAIL += '<li class="">'+'非银行'+'</li>';     
            }
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">注册时间：</span>';
    		RETRIEVEDETAIL += '<span >'+data.registerTime +'</span>';
    		RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '</ul>';   
            RETRIEVEDETAIL += '</div>'; 
            
            }
           
            RETRIEVEDETAIL += '</div>'; 
				
			}
			
            
         $("#sendOrdersDetail").append(RETRIEVEDETAIL); 

			}


<!-- 小贷负债历史 -->
function aliLoanLendDetailLoad(obj){
				
		 
			var RETRIEVEDETAIL ="";
		
			RETRIEVEDETAIL += '<div class="detail-user"  style="background: #ffffff;">';
    		RETRIEVEDETAIL += '<div class="user">';
    		RETRIEVEDETAIL += '<ul>';
    
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
    		RETRIEVEDETAIL += '<span>状态码: '+obj.result+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';
    		RETRIEVEDETAIL += '</div>';
    		
    		RETRIEVEDETAIL += '<div class="line-detail">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="flex: 1">';
    		RETRIEVEDETAIL += '<span class="color-hui">查询状态：</span>';
    		RETRIEVEDETAIL += '<span class="color-det">'+obj.description+'</span>';
    		RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '</ul>';            
            RETRIEVEDETAIL += '</div>'; 
            RETRIEVEDETAIL += '</div>';  
            
            RETRIEVEDETAIL += '<div class="information-list">';
            RETRIEVEDETAIL += '<div class="information-list-li">';   
            RETRIEVEDETAIL += '<span class="line-blue"></span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">小贷负债历史</span>';
            RETRIEVEDETAIL += '</div>';
            RETRIEVEDETAIL += '</div>'; 
            
           if(obj.result =='1'){
            for(var i=0; i<obj.details.length;i++){
            	
           	RETRIEVEDETAIL += '<div class="information-list">';
            RETRIEVEDETAIL += '<div class="detail-information-list">';
            RETRIEVEDETAIL += '<ul>';
            RETRIEVEDETAIL += '<li class="left-detail">平台代码</li>';
            RETRIEVEDETAIL += '<li class="">'+obj.details[i].companyCode+'</li>';  
            RETRIEVEDETAIL += '</ul>'; 
            RETRIEVEDETAIL += '</div>'; 
            RETRIEVEDETAIL += '<div class="detail-information-list">';   
            RETRIEVEDETAIL += '<ul>';
            RETRIEVEDETAIL += '<li class="left-detail">借款类型</li>'; 
            if(obj.details[i].type =="0"){
            	 RETRIEVEDETAIL += '<li class="">'+'未知'+'</li>';     
            }else if(obj.details[i].type =="1"){
            	 RETRIEVEDETAIL += '<li class="">'+'个人信贷'+'</li>';     
            }else  if(obj.details[i].type =="2"){
            	 RETRIEVEDETAIL += '<li class="">'+'个人抵押'+'</li>';     
            }else  if(obj.details[i].type =="3"){
            	 RETRIEVEDETAIL += '<li class="">'+'企业信贷'+'</li>';     
            }else  if(obj.details[i].type =="4"){
            	 RETRIEVEDETAIL += '<li class="">'+'企业抵押'+'</li>';     
            }
            
            
            RETRIEVEDETAIL += '</ul>'; 
            RETRIEVEDETAIL += '</div>'; 
            RETRIEVEDETAIL += '<div class="detail-information-list">';   
            RETRIEVEDETAIL += '<ul>';
            RETRIEVEDETAIL += '<li class="left-detail">借款金额</li>';      
            RETRIEVEDETAIL += '<li class="">'+obj.details[i].lendMoney+'</li>';       
            RETRIEVEDETAIL += '</ul>'; 
            RETRIEVEDETAIL += '</div>';
            RETRIEVEDETAIL += '<div class="detail-information-list">';   
            RETRIEVEDETAIL += '<ul>';
            RETRIEVEDETAIL += '<li class="left-detail">批贷实际期数</li>';      
            RETRIEVEDETAIL += '<li class="">'+obj.details[i].periods+'</li>';       
            RETRIEVEDETAIL += '</ul>'; 
            RETRIEVEDETAIL += '</div>';
            RETRIEVEDETAIL += '<div class="detail-information-list">';   
            RETRIEVEDETAIL += '<ul>';
            RETRIEVEDETAIL += '<li class="left-detail">还款状态</li>'; 
            if(obj.details[i].payState=="0"){
            	RETRIEVEDETAIL += '<li class="">未知</li>';   
            }else if(obj.details[i].payState=="1"){
            	RETRIEVEDETAIL += '<li class="">正常</li>';   
            }else if(obj.details[i].payState=="9"){
            	RETRIEVEDETAIL += '<li class="">已还清</li>';   
            }else{
            	RETRIEVEDETAIL += '<li class="">未还清</li>';   
            }
            RETRIEVEDETAIL += '</ul>'; 
            RETRIEVEDETAIL += '</div>';
            
            RETRIEVEDETAIL += '<div class="detail-information-list">';   
            RETRIEVEDETAIL += '<ul>';
            RETRIEVEDETAIL += '<li class="left-detail">借款状态</li>';      
             if(obj.details[i].lendState=="0"){
            	RETRIEVEDETAIL += '<li class="">未知</li>';   
            }else if(obj.details[i].lendState=="1"){
            	RETRIEVEDETAIL += '<li class="">拒贷</li>';   
            }else if(obj.details[i].lendState=="2"){
            	RETRIEVEDETAIL += '<li class="">批贷已放款</li>';   
            }else if(obj.details[i].lendState=="3"){
            	RETRIEVEDETAIL += '<li class="">待放款</li>';   
            }else if(obj.details[i].lendState=="4"){
            	RETRIEVEDETAIL += '<li class="">借款人放弃申请</li>';   
            }else if(obj.details[i].lendState=="5"){
            	RETRIEVEDETAIL += '<li class="">审核中</li>';   
            }else if(obj.details[i].lendState=="6"){
            	RETRIEVEDETAIL += '<li class="">待放款</li>';   
            }      
            RETRIEVEDETAIL += '</ul>'; 
            RETRIEVEDETAIL += '</div>';
            
            RETRIEVEDETAIL += '<div class="detail-information-list">';   
            RETRIEVEDETAIL += '<ul>';
            RETRIEVEDETAIL += '<li class="left-detail">欠款金额</li>';      
            RETRIEVEDETAIL += '<li class="">'+obj.details[i].badMoney+'</li>';       
            RETRIEVEDETAIL += '</ul>'; 
            RETRIEVEDETAIL += '</div>';
            
            RETRIEVEDETAIL += '</div>';
				
				
			}
            }else{
				RETRIEVEDETAIL += '<span>未查询到数据</span>';
			}
         $("#sendOrdersDetail").append(RETRIEVEDETAIL); 

	
}

<!-- 金融黑名单验证-网贷黑名单—简版   -->
function aliBlacklistDetailLoad(obj){
	
				
				
		 
				var RETRIEVEDETAIL ="";
		
			RETRIEVEDETAIL += '<div class="detail-user"  style="background: #ffffff;">';
    		RETRIEVEDETAIL += '<div class="user">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="font-size: 15px">'+obj.name+'</li>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
    		RETRIEVEDETAIL += '<span>手机号: '+obj.mobile+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
    		RETRIEVEDETAIL += '<span>身份证号: '+obj.idcard+'</span>';
    		RETRIEVEDETAIL += '</li>';

    		
    		RETRIEVEDETAIL += '</ul>';
    		RETRIEVEDETAIL += '</div>';
    		RETRIEVEDETAIL += '<div class="line-detail">';
    		
    		 RETRIEVEDETAIL += '<ul>';
            RETRIEVEDETAIL += '<li style="flex: 1">';
    		RETRIEVEDETAIL += '<span class="color-hui">状态码：</span>';
    		RETRIEVEDETAIL += '<span class="color-det">'+obj.res+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';   
    		
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="flex: 1">';
    		RETRIEVEDETAIL += '<span class="color-hui">结果描述：</span>';
    		RETRIEVEDETAIL += '<span class="color-det">'+obj.description+'</span>';
    		RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '</ul>';     
    		
            RETRIEVEDETAIL += '</div>'; 
            RETRIEVEDETAIL += '</div>';  
            RETRIEVEDETAIL += '<div class="information-list">';
            RETRIEVEDETAIL += '<div class="information-list-li">';   
            RETRIEVEDETAIL += '<span class="line-blue"></span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">此结果由大数据查询得出</span>';
            RETRIEVEDETAIL += '</div>';
            RETRIEVEDETAIL += '</div>'; 
          
          
         $("#sendOrdersDetail").append(RETRIEVEDETAIL); 

				
				
			
	
	
	
}




<!-- 逾期催收黑名单分析报告-逾期催收报告-逾期催收黑名单分析   -->
function aliOverduePaymentDetailLoad(obj){
	
		 
				var RETRIEVEDETAIL ="";
		
			RETRIEVEDETAIL += '<div class="detail-user" >';
    		RETRIEVEDETAIL += '<div class="user">';
    		RETRIEVEDETAIL += '<ul>';
    		
    		
    		if(obj.result =='1'){
    		
    		RETRIEVEDETAIL += '<li style="font-size: 15px">'+obj.name+'</li>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
    		RETRIEVEDETAIL += '<span>身份证号: '+obj.idcard+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
    		RETRIEVEDETAIL += '<span>手机号: '+obj.mobile+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		}
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
    		RETRIEVEDETAIL += '<span>状态码: '+obj.result+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';
    		RETRIEVEDETAIL += '</div>';
    		RETRIEVEDETAIL += '<div class="line-detail">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="flex: 1">';
    		RETRIEVEDETAIL += '<span class="color-hui">结果描述：</span>';
    		RETRIEVEDETAIL += '<span class="color-det">'+obj.description+'</span>';
    		RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '</ul>';            
            RETRIEVEDETAIL += '</div>'; 
            RETRIEVEDETAIL += '</div>';  
            
          
            
            if(obj.result =='1'){
           
           
            RETRIEVEDETAIL += '<div class="information-list">';
            RETRIEVEDETAIL += '<div class="information-list-li">';   
            RETRIEVEDETAIL += '<ul>';
            
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="line-blue"></span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">查询结果详情</span>';
            RETRIEVEDETAIL += '</li>'; 
             
 			RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">手机号: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+obj.resultInfo.mobile+'</span>';
            RETRIEVEDETAIL += '</li>'; 
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">逾期总次数: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+obj.resultInfo.overdueCnts+'</span>';
            RETRIEVEDETAIL += '</li>'; 
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">手机归属地: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+obj.resultInfo.provinceName+'</span>';
            RETRIEVEDETAIL += '</li>'; 
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">逾期总金额区间: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+obj.resultInfo.totalMoney+'</span>';
            RETRIEVEDETAIL += '</li>'; 
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">逾期平台总数量: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+obj.resultInfo.typeCnts+'</span>';
            RETRIEVEDETAIL += '</li>';  
            RETRIEVEDETAIL += '</ul>'; 
            RETRIEVEDETAIL += '</div>';
            RETRIEVEDETAIL += '</div>'; 
           
           
           for (var x=0;x<obj.resultInfo.periodData.length;x++) {
           	RETRIEVEDETAIL += '<div style="border:solid 1px #ffa633" class="detail-user"  >';
    		RETRIEVEDETAIL += '<div class="user">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="text-align:center;background-color:#ffa633;font-size: 15px"><span style="color:#ffffff">数据区间 </span></li>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
    		RETRIEVEDETAIL += '<span>逾期时长: '+obj.resultInfo.periodData[x].period+' 个月 </span>';
    		RETRIEVEDETAIL += '</li>';
    		
    		var  dataInfo= obj.resultInfo.periodData[x].dataInfo;
    		//console.log("dataInfo",dataInfo) 
    		
    			RETRIEVEDETAIL += '<div style="border:solid 1px #ffa633" class="detail-user"  >';
		    		RETRIEVEDETAIL += '<div class="user">';
		    		RETRIEVEDETAIL += '<ul>';
		    		RETRIEVEDETAIL += '<li style="text-align:center;background-color:#ffa633;font-size: 15px"><span style="color:#ffffff">逾期数据详情 </span></li>';
		    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
		    		RETRIEVEDETAIL += '<span>逾期次数: '+dataInfo.number+'</span>';
		    		RETRIEVEDETAIL += '</li>';
		    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
		    		RETRIEVEDETAIL += '<span>逾期金额: '+dataInfo.money+'</span>';
		    		RETRIEVEDETAIL += '</li>';
		    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
		    		RETRIEVEDETAIL += '<span>涉及平台数量: '+dataInfo.typeCnt+'</span>';
		    		RETRIEVEDETAIL += '</li>';
	    		
	    			for (var y=0;y<dataInfo.typeInfos.length;y++) {
	    
					    	RETRIEVEDETAIL += '<div style="border:solid 1px #ffa633" class="detail-user"  >';
					    		RETRIEVEDETAIL += '<div class="user">';
					    		RETRIEVEDETAIL += '<ul>';
					    		RETRIEVEDETAIL += '<li style="text-align:center;background-color:#ffa633;font-size: 15px"><span style="color:#ffffff">各平台详细信息 </span></li>';
					    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
					    		RETRIEVEDETAIL += '<span>平台代码: '+dataInfo.typeInfos[y].platformNumber+'</span>';
					    		RETRIEVEDETAIL += '</li>';
					    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
					    		RETRIEVEDETAIL += '<span>逾期次数: '+dataInfo.typeInfos[y].number+'</span>';
					    		RETRIEVEDETAIL += '</li>';
					    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
					    		RETRIEVEDETAIL += '<span>逾期金额: '+dataInfo.typeInfos[y].money+'</span>';
					    		RETRIEVEDETAIL += '</li>';
					    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
					    		RETRIEVEDETAIL += '<span>逾期天数: '+dataInfo.typeInfos[y].overdueDay+'</span>';
					    		RETRIEVEDETAIL += '</li>';
	    		
				    			RETRIEVEDETAIL += '</ul>';
					    		RETRIEVEDETAIL += '</div>';
					            RETRIEVEDETAIL += '</div>';  
			    		
	    		}
	    			
		    		RETRIEVEDETAIL += '</ul>';
		    		RETRIEVEDETAIL += '</div>';
		            RETRIEVEDETAIL += '</div>';  

    		
    		RETRIEVEDETAIL += '</ul>';
    		RETRIEVEDETAIL += '</div>';
            RETRIEVEDETAIL += '</div>';  
            
            
           }
           
			
            }else {
            	
            	RETRIEVEDETAIL += '<div style="text-align:center;">无数据 </div>';
            }
         $("#sendOrdersDetail").append(RETRIEVEDETAIL); 

	
	
}



<!-- 个人涉诉查询-个人行政处罚 -->
function aliLawsuitInfoDetailLoad(obj){
				
				
		 
				var RETRIEVEDETAIL ="";
		
			RETRIEVEDETAIL += '<div class="detail-user" >';
    		RETRIEVEDETAIL += '<div class="user">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="font-size: 15px">'+obj.name+'</li>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
    		RETRIEVEDETAIL += '<span>身份证号: '+obj.idcard+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
    		RETRIEVEDETAIL += '<span>状态码: '+obj.result+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';
    		RETRIEVEDETAIL += '</div>';
    		RETRIEVEDETAIL += '<div class="line-detail">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="flex: 1">';
    		RETRIEVEDETAIL += '<span class="color-hui">结果描述：</span>';
    		RETRIEVEDETAIL += '<span class="color-det">'+obj.description+'</span>';
    		RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '</ul>';            
            RETRIEVEDETAIL += '</div>'; 
            RETRIEVEDETAIL += '</div>';  
            
          
            
            if(obj.result =='1'){
           
           
            RETRIEVEDETAIL += '<div class="information-list">';
            RETRIEVEDETAIL += '<div class="information-list-li">';   
            RETRIEVEDETAIL += '<ul>';
            
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="line-blue"></span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">查询结果详情</span>';
            RETRIEVEDETAIL += '</li>'; 
             
 			RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">案件流程数量: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+obj.lawSuitInfo.ajlcCount+'</span>';
            RETRIEVEDETAIL += '</li>'; 
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">执行公告数量: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+obj.lawSuitInfo.zxggCount+'</span>';
            RETRIEVEDETAIL += '</li>'; 
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">裁判文书数量: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+obj.lawSuitInfo.cpwsCount+'</span>';
            RETRIEVEDETAIL += '</li>'; 
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">法院公告数量: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+obj.lawSuitInfo.fyggCount+'</span>';
            RETRIEVEDETAIL += '</li>'; 
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">开庭公告数量: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+obj.lawSuitInfo.ktggCount+'</span>';
            RETRIEVEDETAIL += '</li>';  
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">曝光台数量: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+obj.lawSuitInfo.bgtCount+'</span>';
            RETRIEVEDETAIL += '</li>';  
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">失信公告信息数量: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+obj.lawSuitInfo.shixinCount+'</span>';
            RETRIEVEDETAIL += '</li>';  
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">所有信息总数量: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+obj.lawSuitInfo.totalCount+'</span>';
            RETRIEVEDETAIL += '</li>';  
            RETRIEVEDETAIL += '</ul>'; 
            RETRIEVEDETAIL += '</div>';
            RETRIEVEDETAIL += '</div>'; 
            
            RETRIEVEDETAIL += '<div style="border:solid 1px #ffa633" class="detail-user"  >';
    		RETRIEVEDETAIL += '<div class="user">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="text-align:center;background-color:#ffa633;font-size: 15px"><span style="color:#ffffff">案件详情 </span></li>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
    		RETRIEVEDETAIL += '<span>逾期时长: '+'222'+' 个月 </span>';
    		RETRIEVEDETAIL += '</li>';
    		
            RETRIEVEDETAIL += '</ul>';
    		RETRIEVEDETAIL += '</div>';
    		
    		
    		   for(var i=0; i<obj.lawSuitInfo.allList.length;i++){
		            
		         	RETRIEVEDETAIL += '<div style="border-top:1px dashed #e0e0e0;" class="detail-information-list">';
		    		RETRIEVEDETAIL += '<ul>';
		    		RETRIEVEDETAIL += '<li >';
		    		RETRIEVEDETAIL += '<span class="left-detail">标题：</span>';
		    		RETRIEVEDETAIL += '<span >'+obj.lawSuitInfo.allList[i].title+'</span>';
		    		RETRIEVEDETAIL += '</li>';
		    		RETRIEVEDETAIL += '</ul>'; 
		    		
		    		RETRIEVEDETAIL += '<ul>';
		    		RETRIEVEDETAIL += '<li >';
		    		RETRIEVEDETAIL += '<span class="left-detail">内容：</span>';
					RETRIEVEDETAIL += '<span >'+obj.lawSuitInfo.allList[i].content+'</span>';
					RETRIEVEDETAIL += '</li>';
		    		RETRIEVEDETAIL += '</ul>';  
		    		
		    		RETRIEVEDETAIL += '<ul>';
		    		RETRIEVEDETAIL += '<li >';
		    		RETRIEVEDETAIL += '<span class="left-detail">案件类型：</span>';
		    		
		    		if(obj.lawSuitInfo.allList[i].dataType =="cpws"){
		    			RETRIEVEDETAIL += '<span >裁判文书</span>';
		    		}else if(obj.lawSuitInfo.allList[i].dataType =="zxgg"){
		    			RETRIEVEDETAIL += '<span >执行公告</span>';
		    		}else if(obj.lawSuitInfo.allList[i].dataType =="shixin"){
		    			RETRIEVEDETAIL += '<span >失信</span>';
		    		}else if(obj.lawSuitInfo.allList[i].dataType =="ktgg"){
		    			RETRIEVEDETAIL += '<span >开通公告</span>';
		    		}else if(obj.lawSuitInfo.allList[i].dataType =="fygg"){
		    			RETRIEVEDETAIL += '<span >法院公告</span>';
		    		}else if(obj.lawSuitInfo.allList[i].dataType =="ajlc"){
		    			RETRIEVEDETAIL += '<span >案件流程</span>';
		    		}else if(obj.lawSuitInfo.allList[i].dataType =="bgt"){
		    			RETRIEVEDETAIL += '<span >曝光台</span>';
		    		}
		    		
					
					RETRIEVEDETAIL += '</li>';
		    		RETRIEVEDETAIL += '</ul>';  
		    		
		    		RETRIEVEDETAIL += '<ul>';
		    		RETRIEVEDETAIL += '<li >';
		    		RETRIEVEDETAIL += '<span class="left-detail">审结时间：</span>';
		    		RETRIEVEDETAIL += '<span >'+obj.lawSuitInfo.allList[i].reviewTime +'</span>';
		    		RETRIEVEDETAIL += '</li>';
		            RETRIEVEDETAIL += '</ul>';   
		            RETRIEVEDETAIL += '</div>'; 
            
            }
            RETRIEVEDETAIL += '</div>';  
            
           
       
			
            }else {
            	
            	RETRIEVEDETAIL += '<div style="text-align:center;">无数据 </div>';
            }
         $("#sendOrdersDetail").append(RETRIEVEDETAIL); 

				
			}



<!-- 多头借贷c版 -->
function aliGetMultipleCDetailLoad(obj){
	
		 
				var RETRIEVEDETAIL ="";
		
			RETRIEVEDETAIL += '<div class="detail-user" >';
    		RETRIEVEDETAIL += '<div class="user">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="font-size: 15px">'+obj.name+'</li>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
    		RETRIEVEDETAIL += '<span>身份证号: '+obj.idCard+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
    		RETRIEVEDETAIL += '<span>手机号: '+obj.mobile+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
    		RETRIEVEDETAIL += '<span>业务标识: '+obj.gid+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
    		RETRIEVEDETAIL += '<span>状态码: '+obj.res+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';
    		RETRIEVEDETAIL += '</div>';
    		
   
            RETRIEVEDETAIL += '</div>';  
            
          
            
            if(obj.res =='1'){
           
           
            RETRIEVEDETAIL += '<div class="information-list">';
            RETRIEVEDETAIL += '<div class="information-list-li">';   
            RETRIEVEDETAIL += '<ul>';
            
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="line-blue"></span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">查询结果详情</span>';
            RETRIEVEDETAIL += '</li>'; 
            RETRIEVEDETAIL += '</ul>';
    		RETRIEVEDETAIL += '</div>';
    		
            
         	RETRIEVEDETAIL += '<div  class="detail-information-list">';
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">贷款总机构数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0001+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">贷款已结清机构数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0002+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近1天是否存在逾期未结清 1 - 逾期 ； 0 - 未逾期：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0003+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近7天是否存在逾期未结清 1 - 逾期 ； 0 - 未逾期：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0004+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近14天是否存在逾期未结清 1 - 逾期 ； 0 - 未逾期：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0005+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近21天是否存在逾期未结清 1 - 逾期 ； 0 - 未逾期：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0047+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近30天是否存在逾期未结清 1 - 逾期 ； 0 - 未逾期：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0006+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">消费金融类机构数（有场景的、分期）：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0007+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">网络贷款类机构数（现金贷）：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0008+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近1天贷款机构数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0070+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近7天贷款机构数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0009+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近14贷款机构数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0010+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近21天贷款机构数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0063+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近30天贷款机构数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0011+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近90天贷款机构数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0012+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近180天贷款机构数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0013+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">历史贷款机构成功还款笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0014+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">历史贷款机构交易失败笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0015+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近1天交易失败笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0016+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近1天交易成功笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0017+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近7天交易失败笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0018+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近7天还款成功笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0019+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近14天交易失败笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0020+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近14天还款成功笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0021+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近21天还款成功笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0064+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近21交易失败笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0065+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近30天交易失败笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0022+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近30天还款成功笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0023+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近90天交易失败笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0024+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近90天还款成功笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0025+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近180天交易失败笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0026+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近180天还款成功笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0027+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近1天是否发生过逾期 1 - 逾期 ； 0 - 未逾期：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0028+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近7天是否发生过逾期 1 - 逾期 ； 0 - 未逾期：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0029+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">	最近14天是否发生过逾期 1 - 逾期 ； 0 - 未逾期：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0030+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">	最近30天是否发生过逾期 1 - 逾期 ； 0 - 未逾期：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0031+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近1天交易失败总金额 每单位金额对应200元人民币：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0032+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';  
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近1天还款成功总金额 每单位金额对应200元人民币：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0033+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近7天交易失败总金额 每单位金额对应200元人民币：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0034+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近7天还款成功总金额 每单位金额对应200元人民币：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0035+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">	最近14天交易失败总金额 每单位金额对应200元人民币：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0036+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">	最近14天还款成功总金额 每单位金额对应200元人民币：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0037+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">	最近21天交易失败总金额 每单位金额对应200元人民币：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0066+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">	最近21天还款成功总金额 每单位金额对应200元人民币：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0067+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近30天交易失败总金额 每单位金额对应200元人民币：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0038+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近30天还款成功总金额 每单位金额对应200元人民币：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0039+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">	最近90天交易失败总金额 每单位金额对应200元人民币：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0040+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">	最近90天还款成功总金额 每单位金额对应200元人民币：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0041+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近180天交易失败总金额 每单位金额对应200元人民币：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0042+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">	最近180天还款成功总金额 每单位金额对应200元人民币：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0043+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">当前是否逾期 1 - 逾期 ； 0 - 未逾期：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0044+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">信用贷款时长 单位：天：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0045+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近一次交易距离当前时间 单位：天：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0046+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近7天_交易失败次数>0的机构数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0048+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近14天_交易失败次数>0的机构数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0049+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近21天_交易失败次数>0的机构数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0050+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">	最近30天_交易失败次数>0的机构数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0051+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">消费金融类最后一次交易失败后还款次数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0052+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">小贷担保类最后一次交易失败后还款次数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0053+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最后一次交易失败后还款次数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0069+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">消费金融类_交易失败向后距离下一次还款成功的天数最大值：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0054+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">小贷担保类_交易失败向后距离下一次还款成功的天数最大值：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0055+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">交易失败向后距离下一次还款成功的天数最大值：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0056+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">消费金融类_交易失败向后距离下一次还款成功的天数最小值：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0057+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">小贷担保类_交易失败向后距离下一次还款成功的天数最小值：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0058+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">交易失败向后距离下一次还款成功的天数最小值：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0059+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">消费金融类_交易失败向后距离下一次还款成功的天数平均值：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0060+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">小贷担保类_交易失败向后距离下一次还款成功的天数平均值：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0061+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">交易失败向后距离下一次还款成功的天数平均值：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0062+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">最近一次还款成功距离当前天数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0068+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">当前逾期机构数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0071+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">当前逾期金额：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0072+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">近5次还款中成功还款总金额/近5次还款总金额：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0073+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">近5次还款中还款成功笔数/近5次还款总笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0074+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">近20次还款中小贷担保类还款成功笔数/近20次还款中小贷担保类还款笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0075+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">近20次还款中还款成功笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0076+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">近5次还款中还款成功总金额：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0077+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">近20次还款中还款成功总金额：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0078+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">近90天内还款成功总金额/近90天还款总金额：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0079+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">近90天内还款成功笔数/近90天内还款总笔数：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0080+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">信用风险评分 0-1之间，分数越高用户信用越低：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0081+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">履约金额综合指数 0-1之间，指数越大用户逾期可能性越高：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0082+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		RETRIEVEDETAIL += '<ul style="border-top:1px dashed #e0e0e0;">';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">履约笔数综合指数 0-1之间，指数越大用户逾期可能性越高：</span>';
    		RETRIEVEDETAIL += '<span >'+obj.data.CPL0083+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
    		
    		
    		
            RETRIEVEDETAIL += '</div>'; 
            
            
            RETRIEVEDETAIL += '</div>';  
            
           
       
			
            }else {
            	
            	RETRIEVEDETAIL += '<div style="text-align:center;">无数据 </div>';
            }
         $("#sendOrdersDetail").append(RETRIEVEDETAIL); 

			
}




<!-- 互联网金融综合查询/反欺诈报告/借贷行为分析/运营商多维度分析 -->
function aliFraudCheckDetailLoad(obj){
		
			var RETRIEVEDETAIL ="";
			
			RETRIEVEDETAIL += '<div class="detail-user" >';
    		RETRIEVEDETAIL += '<div class="user">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
    		RETRIEVEDETAIL += '<span>状态码: '+obj.result+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>';
    		RETRIEVEDETAIL += '</div>';
    		RETRIEVEDETAIL += '<div class="line-detail">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="flex: 1">';
    		RETRIEVEDETAIL += '<span class="color-hui">结果描述：</span>';
    		RETRIEVEDETAIL += '<span class="color-det">'+obj.description+'</span>';
    		RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '</ul>';            
            RETRIEVEDETAIL += '</div>'; 
            RETRIEVEDETAIL += '</div>';  
            
          
            
            if(obj.result =='1'){
            var detail= obj.detail;
           
           
            RETRIEVEDETAIL += '<div class="information-list">';
            RETRIEVEDETAIL += '<div class="information-list-li">';   
            RETRIEVEDETAIL += '<ul>';
            
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="line-blue"></span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">基本信息</span>';
            RETRIEVEDETAIL += '</li>'; 
            
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">姓名: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+detail.basic.name+'</span>';
            RETRIEVEDETAIL += '</li>'; 
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">年龄: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+detail.basic.age+'</span>';
            RETRIEVEDETAIL += '</li>'; 
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">性别: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+detail.basic.sex+'</span>';
            RETRIEVEDETAIL += '</li>'; 
 			RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">手机号: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+detail.basic.phone+'</span>';
            RETRIEVEDETAIL += '</li>'; 
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">身份证号: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+detail.basic.idcard+'</span>';
            RETRIEVEDETAIL += '</li>'; 
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">用户出生地: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+detail.basic.province+' '+detail.basic.city+' '+detail.basic.region+'</span>';
            RETRIEVEDETAIL += '</li>'; 
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">手机号所属运营商: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+detail.basic.phoneOperator+'</span>';
            RETRIEVEDETAIL += '</li>'; 
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">身份证是否有效: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+detail.basic.idcardValid+'</span>';
            RETRIEVEDETAIL += '</li>'; 
             RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">手机号所在省份: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+detail.basic.phoneProvince+' '+detail.basic.phoneCity+'</span>';
            RETRIEVEDETAIL += '</li>';  
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="color-hui">被机构查询数量: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+detail.selectCount.bySelectCount+'</span>';
            RETRIEVEDETAIL += '</li>';  
            RETRIEVEDETAIL += '</ul>'; 
            RETRIEVEDETAIL += '</div>';
            RETRIEVEDETAIL += '</div>';


			RETRIEVEDETAIL += '<div style="border:solid 1px #ffa633" class="detail-user"  >';
    		RETRIEVEDETAIL += '<div class="user">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="text-align:center;background-color:#ffa633;font-size: 15px"><span style="color:#ffffff">用户注册信息情况 </span></li>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL += '<span >注册手机号: </span>';
            RETRIEVEDETAIL += '<span style="color: #000000">'+detail.registerMessage.phone+'</span>';
            RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL += '<span >注册总数量: </span>';
            RETRIEVEDETAIL += '<span style="color: #000000">'+detail.registerMessage.registerAllCount+'</span>';
            RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</ul>';
            
            RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">===用户注册 App统计详情===</span>';
            RETRIEVEDETAIL += '</li>';
            
            for(var a=0;a<detail.registerMessage.registerStatistics.length;a++){
            	
            	RETRIEVEDETAIL += '<div style="border-top:1px dashed #e0e0e0;" class="detail-information-list">';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>标签: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.registerMessage.registerStatistics[a].label+'</span>';
			RETRIEVEDETAIL += '</li>';
			 RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>数量: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.registerMessage.registerStatistics[a].count+'</span>';
			RETRIEVEDETAIL += '</li>';
			
			 RETRIEVEDETAIL += '</div>'; 
            }
            
            RETRIEVEDETAIL += '</ul>';
            
		    RETRIEVEDETAIL += '</div>';
		    RETRIEVEDETAIL += '</div>';  


			RETRIEVEDETAIL += '<div style="border:solid 1px #ffa633" class="detail-user"  >';
    		RETRIEVEDETAIL += '<div class="user">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="text-align:center;background-color:#ffa633;font-size: 15px"><span style="color:#ffffff">消费标签信息 </span></li>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL += '<span >车: </span>';
            RETRIEVEDETAIL += '<span style="color: #000000">'+detail.label.car+'</span>';
            RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL += '<span >消费能力指数: </span>';
            RETRIEVEDETAIL += '<span style="color: #000000">'+detail.label.consumptionAbility+'</span>';
            RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL += '<span >是否购买保险产品: </span>';
            RETRIEVEDETAIL += '<span style="color: #000000">'+detail.label.insurance+'</span>';
            RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL += '<span >是否购买理财产品: </span>';
            RETRIEVEDETAIL += '<span style="color: #000000">'+detail.label.manageMoney+'</span>';
            RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL += '<span >是否有信用卡: </span>';
            RETRIEVEDETAIL += '<span style="color: #000000">'+detail.label.visa+'</span>';
            RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</ul>';
            
		    RETRIEVEDETAIL += '</div>';
		    RETRIEVEDETAIL += '</div>'; 


			RETRIEVEDETAIL += '<div style="border:solid 1px #ffa633" class="detail-user"  >';
			RETRIEVEDETAIL += '<div class="user">';
			RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;background-color:#ffa633;font-size: 15px"><span style="color:#ffffff">黑名单信息 </span></li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>姓名和手机黑名单信息更新时间: ' + detail.blackMessage.phoneIsblackUpdate+ '</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>身份证和姓名黑名单信息更新时间: ' + detail.blackMessage.idcardIsblackUpdate + '</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>姓名和手机是否在黑名: ' + detail.blackMessage.phoneIsblack + '</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>身份证和姓名是否存在黑名单: ' + detail.blackMessage.idcardIsblack + '</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>黑名单分类: ' + detail.blackMessage.blackClassify[0] + '</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>黑名单详情: ↓</span>';
			RETRIEVEDETAIL += '</li>';
			
			if(detail.blackMessage.blackDetails.length ==0){
            	      RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>无数据 </span>';
				RETRIEVEDETAIL += '</li>';
            }
			
			for(var x=0;x<detail.blackMessage.blackDetails.length;x++){
			
			RETRIEVEDETAIL += '<div style="border-top:1px dashed #e0e0e0;" class="detail-information-list">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li >';
    		RETRIEVEDETAIL += '<span class="left-detail">'+detail.blackMessage.blackDetails[x].key+': </span>';
    		RETRIEVEDETAIL += '<span >'+detail.blackMessage.blackDetails[x].value+'</span>';
    		RETRIEVEDETAIL += '</li>';
    		RETRIEVEDETAIL += '</ul>'; 
            RETRIEVEDETAIL += '</div>';
			
			}
			
			RETRIEVEDETAIL += '</ul>';
			RETRIEVEDETAIL += '</div>';
			RETRIEVEDETAIL += '</div>';
			
			
			
			RETRIEVEDETAIL += '<div style="border:solid 1px #ffa633" class="detail-user"  >';
			RETRIEVEDETAIL += '<div class="user">';
			RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;background-color:#ffa633;font-size: 15px"><span style="color:#ffffff">用户灰度信息 </span></li>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">======灰色来源======</span>';
            RETRIEVEDETAIL += '</li>';
            
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>联系人的最高灰度分: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.graySource.linkmanMaxGraySource+'</span>';
			RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>主动联系的联系人的最高灰度分: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.graySource.accordLinkmanMaxGraySource+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>被动联系最亲密联系人的灰度分: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.graySource.passivityLinkmanGraySource+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>被动联系的联系人的最高灰度分: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.graySource.passivityLinkmanMaxGraySource+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>主动联系的联系人的平均灰度分: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.graySource.accordLinkmanAverageGraySource+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>主动联系最亲密申请人的灰度分: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.graySource.accordApplyGraySource+'</span>';
			RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>被动联系的联系人的平均灰度分: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.graySource.passivityLinkmanAverageGraySource+'</span>';
			RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>联系人的最低灰度: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.graySource.linkmanMinGraySource+'</span>';
			RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>主动联系最亲密联系人的灰度分: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.graySource.accordLinkmanGraySource+'</span>';
			RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>互动联系最亲密联系人的灰度分: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.graySource.interactionLinkmanGraySource+'</span>';
			RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>主动联系的联系人的最低灰度分: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.graySource.accordLinkmanMinGraySource+'</span>';
			RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>互动联系最亲密申请人的灰度分: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.graySource.interactionApplyGraySource+'</span>';
			RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>被动联系最亲密申请人的灰度分: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.graySource.passivityApplyGraySource+'</span>';
			RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>被动联系的联系人的最低灰度分: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.graySource.passivityLinkmanMinGraySource+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</ul>';
			
			
			RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">社交影响力: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+detail.gray.socialPassivity+'</span>';
            RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</ul>';
			
			RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">======联系权重======</span>';
            RETRIEVEDETAIL += '</li>';
            
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与所有联系人的最近被动通话时间: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+getLocalTime(detail.gray.weight.recentTimeBeAll)+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与黑号的被动总通话次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.weight.callCntBeBlack+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与所有联系人的最近主动通话时间: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+getLocalTime(detail.gray.weight.recentTimeToAll)+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与所有联系人的被动总通话次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.weight.callCntBeAll+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与申请人的主动通话次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.weight.callCntToApplied+'</span>';
			RETRIEVEDETAIL += '</li>';
			
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与所有联系人的主动总通话时长(秒): </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.weight.timeSpentToAll+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与黑号的被动总通话时长(秒): </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.weight.timeSpentBeBlack+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与申请人的被动通话次: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.weight.callCntBeApplied+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与所有联系人的被动总通话时长(秒): </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.weight.timeSpentBeAll+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与所有联系人的主动总通话次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.weight.callCntToAll+'</span>';
			RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与申请人的被动通话时长(s): </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.weight.timeSpentBeApplied+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与申请人的主动通话时长(s): </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.weight.timeSpentToApplied+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与黑号的最近被动通话时间: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+getLocalTime(detail.gray.weight.recentTimeBeBlack)+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</ul>';
			
			
			RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">======联系人的查询历史======</span>';
            RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前6月内联系人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.queryCnt6+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前3月内联系人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.queryCnt3+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前2月内联系人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.queryCnt2+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前1月内联系人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.queryCnt1+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前3 月内被动联系的人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.beQueryCnt3+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前2 月内被动联系的人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.beQueryCnt2+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前1 月内被动联系的人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.beQueryCnt1+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前9 月内被动联系的人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.beOrgCnt9+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前12 月内联系人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.orgCnt12+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前9月内联系人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.queryCnt9+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前3 月内被动联系的人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.beOrgCnt3+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前12 月内被动联系的人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.beOrgCnt12+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前2 月内被动联系的人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.beOrgCnt2+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前9 月内被动联系的人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.beQueryCnt9+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前1 月内被动联系的人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.beOrgCnt1+'</span>';
			RETRIEVEDETAIL += '</li>';
            	RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前6 月内被动联系的人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.beQueryCnt6+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前6 月内被动联系的人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.beOrgCnt6+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前半月内联系人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.queryCnt05+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>最近活跃时间前半年内被动联系的人的最近一次查询时间: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+getLocalTime(detail.gray.history.beRecentQueryTime)+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前6 月内主动联系的人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.toQueryCnt6+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前半月内联系人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.orgCnt05+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前6 月内主动联系的人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.toOrgCnt6+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前12 月内被动联系的人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.beQueryCnt12+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前3 月内主动联系的人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.toOrgCnt3+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前2 月内主动联系的人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.toOrgCnt2+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前1 月内主动联系的人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.toOrgCnt1+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前9 月内主动联系的人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.toQueryCnt9+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前2 月内主动联系的人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.toQueryCnt2+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前1月内联系人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.orgCnt1+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前3 月内主动联系的人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.toQueryCnt3+'</span>';
			RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前2月内联系人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.orgCnt2+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>最近活跃时间前半年内主动联系的人的最近一次查询时间: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+getLocalTime(detail.gray.history.toRecentQueryTime)+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前6 月内主动联系的人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.orgCnt3+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前12 月内主动联系的人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.toOrgCnt12+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前1 月内主动联系的人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.toQueryCnt1+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前12 月内主动联系的人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.toQueryCnt12+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前6月内联系人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.orgCnt6+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前半月内主动联系的人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.toQueryCnt05+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前半月内被动联系的人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.beOrgCnt05+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前9月内联系人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.orgCnt9+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前12 月内联系人的查询次数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.queryCnt12+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>前9 月内主动联系的人的查询机构数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.history.toOrgcnt9+'</span>';
			RETRIEVEDETAIL += '</li>';
            
            RETRIEVEDETAIL += '</ul>';
            
            
            RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">===与联系人的最大亲密度===</span>';
            RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与黑号的最大被动联系亲密度: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.intimacy.maxBlackPassivityIntimacy+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与黑号的最大互动联系亲密度: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.intimacy.maxBlackInteractionIntimacy+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与申请人的最大互动联系亲密度: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.intimacy.maxProposerInteractionIntimacy+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与所有联系人的最大主动联系亲密度: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.intimacy.maxAccordIntimacy+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与所有联系人的最大被动联系亲密度: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.intimacy.maxPassivityIntimacy+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与所有联系人的最大互动联系亲密度: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.intimacy.maxInteractionIntimacy+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>与申请人的最大被动联系亲密度: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.intimacy.maxProposerPassivityIntimacy+'</span>';
			RETRIEVEDETAIL += '</li>';
			
			RETRIEVEDETAIL += '</ul>';
			
			
			RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">======联系人数======</span>';
            RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>被动联系人中曾为申请人的人数在群体中的百分位: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.passivityLinkmanApplyCountProportion+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>一阶联系(直接联系)黑号总数在群体中的百分位: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.oneBlackLinkmanCountProportion+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>二阶联系(间接联系)黑号总数，联系人的黑号联系人，并排除一阶联系的黑号: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.twoLinkmanBlackCount+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>二阶联系(间接联系)黑号总数在群体中的百分位: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.twoLinkmanBlackCountProportion+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>被动联系人数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.passivityLinkmanCount+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>一阶联系(直接联系)黑号总数/一阶联系人总数在群体中的百分位: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.oneLinkmanBlackTLinkmanCountProportion+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>联系人曾为申请人的人数在群体中的百分位: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.linkmanApplyCountProportion+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>联系人曾为申请人的人数，前两项合并去重: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.linkmanApplyCount+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>引起黑名单的一阶联系人数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.oneBlackLinkmanCount+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>被动联系人中曾为申请人的人数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.passivityLinkmanApplyCount+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>被动联系的黑号数在群体中的百分位: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.passivityLinkmanBlackCountProportion+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>主动联系的黑号数在群体中的百分位: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.accordLinkmanBlackCountProportion+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>一阶联系(直接联系)黑号总数，前两项合并去重: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.oneLinkmanBlackCount+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>引起黑名单的一阶联系人占比: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.oneBlackLinkmanProportion+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>一阶联系(直接联系)黑号总数/一阶联系人总数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.oneLinkmanBlackProportion+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>主动联系人中曾为申请人的人数在群体中的百分位: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.accordLinkmanApplyCountProportion+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>一阶联系人总数，前两项合并去重: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.oneLinkmanCount+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>主动联系的黑号: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.accordLinkmanBlackCount+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>主动联系人数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.accordLinkmanCount+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>主动联系人中曾为申请人的人数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.accordLinkmanApplyCount+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>一阶联系人总数在群体中的百分位: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.oneLinkmanCountProportion+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>被动联系的黑号数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.passivityLinkmanBlackCount+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>引起黑名单的一阶联系人数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.oneLinkmanTBlackCountProportion+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>被动联系人数在群体中的百分位: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.passivityLinkmanCountProportion+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>引起黑名单的一阶联系人数: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.oneBlackLinkmanCountProportion1+'</span>';
			RETRIEVEDETAIL += '</li>';
			RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
			RETRIEVEDETAIL += '<span>主动联系人数在群体中的百分位: </span>';
			RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.linkmanCount.accordLinkmanCountProportion+'</span>';
			RETRIEVEDETAIL += '</li>';
            
            
			RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">是否进行过报告查询: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+detail.gray.isfind+'</span>';
            RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">最近活跃时间: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+detail.gray.activeTime+'</span>';
            RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">灰度手机号码: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+detail.gray.phone+'</span>';
            RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">社交活跃度: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+detail.gray.socialAffect+'</span>';
            RETRIEVEDETAIL += '</li>';
            RETRIEVEDETAIL += '<li >';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">手机号码灰度分数: </span>';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">'+detail.gray.phoneGrayScore+'</span>';
            RETRIEVEDETAIL += '</li>';
            
            RETRIEVEDETAIL += '<div style="border:solid 1px #ffa633" class="detail-user"  >';
    		RETRIEVEDETAIL += '<div class="user">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="text-align:center;background-color:#ffa633;font-size: 15px"><span style="color:#ffffff">联系人的分布 </span></li>';
    		RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL += '<span >互动联系的中等亲密联系人数: </span>';
            RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.distribute.medianFamiliar+'</span>';
            RETRIEVEDETAIL += '</li>';
            	RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL += '<span >被动联系的非亲密联系人数: </span>';
            RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.distribute.beNotFamiliar+'</span>';
            RETRIEVEDETAIL += '</li>';
            
            	RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL += '<span >联系人的查询历史主动联系的亲密联系人数: </span>';
            RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.distribute.toIsFamiliar+'</span>';
            RETRIEVEDETAIL += '</li>';
            
            	RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL += '<span >主动联系的中等亲密联系人数: </span>';
            RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.distribute.toMedianFamiliar+'</span>';
            RETRIEVEDETAIL += '</li>';
            
            	RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL += '<span >互动联系的亲密联系人数: </span>';
            RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.distribute.notFamiliar+'</span>';
            RETRIEVEDETAIL += '</li>';
            
            	RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL += '<span >主动联系的非亲密联系人数: </span>';
            RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.distribute.toNotFamiliar+'</span>';
            RETRIEVEDETAIL += '</li>';
            	RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL += '<span >被动联系的亲密联系人数: </span>';
            RETRIEVEDETAIL += '<span style="color: #000000">'+detail.gray.distribute.beIsFamiliar+'</span>';
            RETRIEVEDETAIL += '</li>';
            
            RETRIEVEDETAIL += '</ul>';
		    RETRIEVEDETAIL += '</div>';
		    RETRIEVEDETAIL += '</div>';  


            RETRIEVEDETAIL += '</ul>';
			RETRIEVEDETAIL += '</div>';
			RETRIEVEDETAIL += '</div>';
			
			
			RETRIEVEDETAIL += '<div style="border:solid 1px #ffa633" class="detail-user"  >';
    		RETRIEVEDETAIL += '<div class="user">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="text-align:center;background-color:#ffa633;font-size: 15px"><span style="color:#ffffff">身份证号码存疑 </span></li>';
			RETRIEVEDETAIL += '</ul>';
            
            RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=身份证在那些类型的机构中使用过=</span>';
            RETRIEVEDETAIL += '</li>';
            
            if(detail.idcardImpeach.idcardEmploy.length ==0){
            	      RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>无数据 </span>';
				RETRIEVEDETAIL += '</li>';
            }
	            for(var b=0;b<detail.idcardImpeach.idcardEmploy.length;b++){
	            	
	            RETRIEVEDETAIL += '<div style="border-top:1px dashed #e0e0e0;" class="detail-information-list">';
	            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>机构所属分类: </span>';
				RETRIEVEDETAIL += '<span style="color: #000000">'+detail.idcardImpeach.idcardEmploy[b].institutionType+'</span>';
				RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>查询时间: </span>';
				RETRIEVEDETAIL += '<span style="color: #000000">'+detail.idcardImpeach.idcardEmploy[b].selectDate+'</span>';
				RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '</div>'; 
	            }
            RETRIEVEDETAIL += '</ul>';
            
            
            RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=用这个身份证绑定的其他手机号码=</span>';
            RETRIEVEDETAIL += '</li>';
            
            if(detail.idcardImpeach.idcardPhone.length ==0){
            	      RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>无数据 </span>';
				RETRIEVEDETAIL += '</li>';
            }
	            for(var c=0;c<detail.idcardImpeach.idcardPhone.length;c++){
	            	
	            RETRIEVEDETAIL += '<div style="border-top:1px dashed #e0e0e0;" class="detail-information-list">';
	            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>存疑手机号码: </span>';
				RETRIEVEDETAIL += '<span style="color: #000000">'+detail.idcardImpeach.idcardPhone[c].doubtPhone+'</span>';
				RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>号码所属运营商: </span>';
				RETRIEVEDETAIL += '<span style="color: #000000">'+detail.idcardImpeach.idcardPhone[c].phoneOperator+'</span>';
				RETRIEVEDETAIL += '</li>';
					RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>号码所属省市: </span>';
				RETRIEVEDETAIL += '<span style="color: #000000">'+detail.idcardImpeach.idcardPhone[c].phoneProvince+' '+detail.idcardImpeach.idcardPhone[c].phoneCity+'</span>';
				RETRIEVEDETAIL += '</li>';
					RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>该号码最后一次绑定时: </span>';
				RETRIEVEDETAIL += '<span style="color: #000000">'+detail.idcardImpeach.idcardPhone[c].phoneLastPhone+'</span>';
				RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '</div>'; 
	            }
            
            RETRIEVEDETAIL += '</ul>';
            
            
            
            RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=用这个身份证号码绑定的其他姓名=</span>';
            RETRIEVEDETAIL += '</li>';
            
            if(detail.idcardImpeach.idcardName.length ==0){
            	      RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>无数据 </span>';
				RETRIEVEDETAIL += '</li>';
            }
	            for(var d=0;d<detail.idcardImpeach.idcardName.length;d++){
	            	
	            RETRIEVEDETAIL += '<div style="border-top:1px dashed #e0e0e0;" class="detail-information-list">';
	            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>姓名: </span>';
				RETRIEVEDETAIL += '<span style="color: #000000">'+detail.idcardImpeach.idcardName[d].name+'</span>';
				RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>时间: </span>';
				RETRIEVEDETAIL += '<span style="color: #000000">'+detail.idcardImpeach.idcardName[d].bindDate+'</span>';
				RETRIEVEDETAIL += '</li>';
		
				RETRIEVEDETAIL += '</div>'; 
	            }
            
            RETRIEVEDETAIL += '</ul>';
            
            RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">==用户被机构查询历史 ==</span>';
            RETRIEVEDETAIL += '</li>';
            
            if(detail.selectHistory.length ==0){
            	      RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>无数据 </span>';
				RETRIEVEDETAIL += '</li>';
            }
	            for(var f=0;f<detail.selectHistory.length;f++){
	            	
	            RETRIEVEDETAIL += '<div style="border-top:1px dashed #e0e0e0;" class="detail-information-list">';
	            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>机构类型: </span>';
				RETRIEVEDETAIL += '<span style="color: #000000">'+detail.selectHistory[f].searchedType+'</span>';
				RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>查询时间: </span>';
				RETRIEVEDETAIL += '<span style="color: #000000">'+detail.selectHistory[f].selectDate+'</span>';
				RETRIEVEDETAIL += '</li>';
		
				RETRIEVEDETAIL += '</div>'; 
	            }
            
            RETRIEVEDETAIL += '</ul>';
		    RETRIEVEDETAIL += '</div>';
		    RETRIEVEDETAIL += '</div>';  
			
			
			
			RETRIEVEDETAIL += '<div style="border:solid 1px #ffa633" class="detail-user"  >';
    		RETRIEVEDETAIL += '<div class="user">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="text-align:center;background-color:#ffa633;font-size: 15px"><span style="color:#ffffff">手机号码存疑 </span></li>';
			RETRIEVEDETAIL += '</ul>';
            
            RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=用这个手机号码绑定的其他身份证=</span>';
            RETRIEVEDETAIL += '</li>';
            
              if(detail.phoneImpeach.phoneIdcard.length ==0){
            	      RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>无数据 </span>';
				RETRIEVEDETAIL += '</li>';
            }
	            for(var g=0;g<detail.phoneImpeach.phoneIdcard.length;g++){
	            	
	            RETRIEVEDETAIL += '<div style="border-top:1px dashed #e0e0e0;" class="detail-information-list">';
	            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>被绑定身份证: </span>';
				RETRIEVEDETAIL += '<span style="color: #000000">'+detail.phoneImpeach.phoneIdcard[g].bindIdcard+'</span>';
				RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>绑定时间: </span>';
				RETRIEVEDETAIL += '<span style="color: #000000">'+detail.phoneImpeach.phoneIdcard[g].bindDate+'</span>';
				RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '</div>'; 
	            }
            
            RETRIEVEDETAIL += '</ul>';
            
            
             RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=电话号码在那些类型的机构中使用过=</span>';
            RETRIEVEDETAIL += '</li>';
            
              if(detail.phoneImpeach.phoneEmploy.length ==0){
            	      RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>无数据 </span>';
				RETRIEVEDETAIL += '</li>';
            }
	            for(var h=0;h<detail.phoneImpeach.phoneEmploy.length;h++){
	            	
	            RETRIEVEDETAIL += '<div style="border-top:1px dashed #e0e0e0;" class="detail-information-list">';
	            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>机构所属分类: </span>';
				RETRIEVEDETAIL += '<span style="color: #000000">'+detail.phoneImpeach.phoneEmploy[h].institutionType+'</span>';
				RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>查询时间: </span>';
				RETRIEVEDETAIL += '<span style="color: #000000">'+detail.phoneImpeach.phoneEmploy[h].selectDate+'</span>';
				RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '</div>'; 
	            }
            
            RETRIEVEDETAIL += '</ul>';
            
             RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=用这个手机号码绑定的其他姓名=</span>';
            RETRIEVEDETAIL += '</li>';
            
              if(detail.phoneImpeach.phoneName.length ==0){
            	      RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>无数据 </span>';
				RETRIEVEDETAIL += '</li>';
            }
	            for(var j=0;j<detail.phoneImpeach.phoneName.length;j++){
	            	
	            RETRIEVEDETAIL += '<div style="border-top:1px dashed #e0e0e0;" class="detail-information-list">';
	            RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>绑定姓名: </span>';
				RETRIEVEDETAIL += '<span style="color: #000000">'+detail.phoneImpeach.phoneName[j].bindName+'</span>';
				RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '<li style="font-size: 13px;color: #6b6b6b;">';
				RETRIEVEDETAIL += '<span>绑定时间: </span>';
				RETRIEVEDETAIL += '<span style="color: #000000">'+detail.phoneImpeach.phoneName[j].bindDate+'</span>';
				RETRIEVEDETAIL += '</li>';
				RETRIEVEDETAIL += '</div>'; 
	            }
            
            RETRIEVEDETAIL += '</ul>';
		    RETRIEVEDETAIL += '</div>';
		    RETRIEVEDETAIL += '</div>'; 
		    
		    
		    
		    
		    
		    
		    RETRIEVEDETAIL += '<div style="border:solid 1px #ffa633" class="detail-user"  >';
    		RETRIEVEDETAIL += '<div class="user">';
    		RETRIEVEDETAIL += '<ul>';
    		RETRIEVEDETAIL += '<li style="text-align:center;background-color:#ffa633;font-size: 15px"><span style="color:#ffffff">历史查询记录 </span></li>';
			RETRIEVEDETAIL += '</ul>';
		    
		    RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=720 天内历史查询=</span>';
            RETRIEVEDETAIL += '</li>';
	            modelLoad(detail.historyRecore.month24)
	           	RETRIEVEDETAIL += RETRIEVEDETAIL2;
            RETRIEVEDETAIL += '</ul>';
		    
		    
		    RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=540 天内历史查询=</span>';
            RETRIEVEDETAIL += '</li>';
	            modelLoad(detail.historyRecore.month18)
	           	RETRIEVEDETAIL += RETRIEVEDETAIL2;
            RETRIEVEDETAIL += '</ul>';
            
             RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=360 天内历史查询=</span>';
            RETRIEVEDETAIL += '</li>';
	            modelLoad(detail.historyRecore.month12)
	           	RETRIEVEDETAIL += RETRIEVEDETAIL2;
            RETRIEVEDETAIL += '</ul>';
            
             RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=270天内历史查询=</span>';
            RETRIEVEDETAIL += '</li>';
	            modelLoad(detail.historyRecore.month9)
	           	RETRIEVEDETAIL += RETRIEVEDETAIL2;
            RETRIEVEDETAIL += '</ul>';
            
             RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=180天内历史查询=</span>';
            RETRIEVEDETAIL += '</li>';
	            modelLoad(detail.historyRecore.month6)
	           	RETRIEVEDETAIL += RETRIEVEDETAIL2;
            RETRIEVEDETAIL += '</ul>';
            
             RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=150 天内历史查询=</span>';
            RETRIEVEDETAIL += '</li>';
	            modelLoad(detail.historyRecore.month5)
	           	RETRIEVEDETAIL += RETRIEVEDETAIL2;
            RETRIEVEDETAIL += '</ul>';
            
              RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=120天内历史查询=</span>';
            RETRIEVEDETAIL += '</li>';
	            modelLoad(detail.historyRecore.month4)
	           	RETRIEVEDETAIL += RETRIEVEDETAIL2;
            RETRIEVEDETAIL += '</ul>';
            
              RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=7 天内历史查询=</span>';
            RETRIEVEDETAIL += '</li>';
	            modelLoad(detail.historyRecore.day7)
	           	RETRIEVEDETAIL += RETRIEVEDETAIL2;
            RETRIEVEDETAIL += '</ul>';
            
              RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=15 天内历史查询=</span>';
            RETRIEVEDETAIL += '</li>';
	            modelLoad(detail.historyRecore.day15)
	           	RETRIEVEDETAIL += RETRIEVEDETAIL2;
            RETRIEVEDETAIL += '</ul>';
            
               RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=30 天内历史查询=</span>';
            RETRIEVEDETAIL += '</li>';
	            modelLoad(detail.historyRecore.day30)
	           	RETRIEVEDETAIL += RETRIEVEDETAIL2;
            RETRIEVEDETAIL += '</ul>';
            
               RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=60 天内历史查询=</span>';
            RETRIEVEDETAIL += '</li>';
	            modelLoad(detail.historyRecore.day60)
	           	RETRIEVEDETAIL += RETRIEVEDETAIL2;
            RETRIEVEDETAIL += '</ul>';
            
               RETRIEVEDETAIL += '<ul>';
			RETRIEVEDETAIL += '<li style="text-align:center;">';
            RETRIEVEDETAIL += '<span class="blue-txt" style="color:#ff9000">=90 天内历史查询=</span>';
            RETRIEVEDETAIL += '</li>';
	            modelLoad(detail.historyRecore.day90)
	           	RETRIEVEDETAIL += RETRIEVEDETAIL2;
            RETRIEVEDETAIL += '</ul>';
		    
		    RETRIEVEDETAIL += '</div>';
		    RETRIEVEDETAIL += '</div>'; 
		    
		    
		    
			
            }else {
            	
            	RETRIEVEDETAIL += '<div style="text-align:center;">无数据 </div>';
            }
         $("#sendOrdersDetail").append(RETRIEVEDETAIL); 

			
	
}


function modelLoad(ondate){
	
		RETRIEVEDETAIL2="";
	
	 RETRIEVEDETAIL2 += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL2 += '<span >查询次数: </span>';
            RETRIEVEDETAIL2 += '<span style="color: #000000">'+ondate.countFind+'</span>';
            RETRIEVEDETAIL2 += '</li>';
            RETRIEVEDETAIL2 += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL2 += '<span >消费分期查询机构数: </span>';
            RETRIEVEDETAIL2 += '<span style="color: #000000">'+ondate.payNumber+'</span>';
            RETRIEVEDETAIL2 += '</li>';
            RETRIEVEDETAIL2 += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL2 += '<span >查询次数在信用卡代还查询分布中的百分位: </span>';
            RETRIEVEDETAIL2 += '<span style="color: #000000">'+ondate.countCard+'</span>';
            RETRIEVEDETAIL2 += '</li>';
            RETRIEVEDETAIL2 += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL2 += '<span >查询次数在信用卡代还查询分布中的百分位: </span>';
            RETRIEVEDETAIL2 += '<span style="color: #000000">'+ondate.cardCount+'</span>';
            RETRIEVEDETAIL2 += '</li>';
            RETRIEVEDETAIL2 += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL2 += '<span >现金贷查询次数: </span>';
            RETRIEVEDETAIL2 += '<span style="color: #000000">'+ondate.moneyCount+'</span>';
            RETRIEVEDETAIL2 += '</li>';
            RETRIEVEDETAIL2 += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL2 += '<span >查询次数在现金贷查询分布中的百分位: </span>';
            RETRIEVEDETAIL2 += '<span style="color: #000000">'+ondate.countMoney+'</span>';
            RETRIEVEDETAIL2 += '</li>';
            RETRIEVEDETAIL2 += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL2 += '<span >现金贷查询机构数: </span>';
            RETRIEVEDETAIL2 += '<span style="color: #000000">'+ondate.moneyNumber+'</span>';
            RETRIEVEDETAIL2 += '</li>';
            RETRIEVEDETAIL2 += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL2 += '<span >查询机构数在信用卡代还: </span>';
            RETRIEVEDETAIL2 += '<span style="color: #000000">'+ondate.numberCard+'</span>';
            RETRIEVEDETAIL2 += '</li>';
              RETRIEVEDETAIL2 += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL2 += '<span >查询机构数在总体查询分布中的百分位: </span>';
            RETRIEVEDETAIL2 += '<span style="color: #000000">'+ondate.numberAll+'</span>';
            RETRIEVEDETAIL2 += '</li>';
            RETRIEVEDETAIL2 += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL2 += '<span >查询机构数: </span>';
            RETRIEVEDETAIL2 += '<span style="color: #000000">'+ondate.institutionNumber+'</span>';
            RETRIEVEDETAIL2 += '</li>';
              RETRIEVEDETAIL2 += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL2 += '<span >查询机构数在现金贷查询分布中的百分位: </span>';
            RETRIEVEDETAIL2 += '<span style="color: #000000">'+ondate.numberMoney+'</span>';
            RETRIEVEDETAIL2 += '</li>';
            RETRIEVEDETAIL2 += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL2 += '<span >查询次数在消费分期查询分布中的百分位: </span>';
            RETRIEVEDETAIL2 += '<span style="color: #000000">'+ondate.countPay+'</span>';
            RETRIEVEDETAIL2 += '</li>';
              RETRIEVEDETAIL2 += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL2 += '<span >查询机构数在消费分期查询分布中的百分位: </span>';
            RETRIEVEDETAIL2 += '<span style="color: #000000">'+ondate.numberPay+'</span>';
            RETRIEVEDETAIL2 += '</li>';
            RETRIEVEDETAIL2 += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL2 += '<span >消费分期查询次数: </span>';
            RETRIEVEDETAIL2 += '<span style="color: #000000">'+ondate.payCount+'</span>';
            RETRIEVEDETAIL2 += '</li>';
              RETRIEVEDETAIL2 += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL2 += '<span >信用卡代还查询机构数: </span>';
            RETRIEVEDETAIL2 += '<span style="color: #000000">'+ondate.cardNumber+'</span>';
            RETRIEVEDETAIL2 += '</li>';
            RETRIEVEDETAIL2 += '<li style="font-size: 13px;color: #6b6b6b;">';
            RETRIEVEDETAIL2 += '<span >查询次数在总体查询分布中的百分位: </span>';
            RETRIEVEDETAIL2 += '<span style="color: #000000">'+ondate.countAll+'</span>';
            RETRIEVEDETAIL2 += '</li>';
	
	
}


function getLocalTime(nS) {     
   return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');     
}  