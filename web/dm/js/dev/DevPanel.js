define(["form-field","dev-fun","pri-pri"],function (field,fun,pri){
	function createDev(pid,id,record,siteList){
		var pn=$("#"+pid);
		if(!pn) return;
		var format=window.format;
		var html='<form id="'+id+'" class="my-tab" role="form">'
			+'<div class="btn-group" style="padding-left:30px;">'
			  +'<button class="btn btn-info btn-sm tooltip-info" type="button" title="'+window.lc.getValue("back")+'" name="back" pid="'+pid+'" ><i class="fa fa-reply bigger-130"></i>&nbsp;'+window.lc.getValue("back")+'</button>'
			   +'<button type="button" style="display:'+window.global.getClass("modifyDevice")+'"  name="save" title="'+window.lc.getValue("save")+'" class="btn btn-success btn-sm tooltip-success"><i class="fa fa-pencil bigger-130"></i>&nbsp;'+window.lc.getValue("save")+'</button>'
			   +'<button name="refresh" type="button" title="'+window.lc.getValue("refresh")+'" class="btn btn-info btn-sm tooltip-warning"><i class="fa fa-refresh bigger-130"></i>&nbsp;'+window.lc.getValue("refresh")+'</button>'
			   +'<button id="port_bt" type="button" title="'+window.lc.getValue("portList")+'" class="btn btn-info btn-sm"><i class="fa fa-product-hunt bigger-130"></i>&nbsp;'+window.lc.getValue("portList")+'</button>'
			+'</div>'
			+'<div class="container-fluid">'
			 +'<div class="row">'
			  +'<div class="col-md-5">'
				+'<h4 ><label>'+window.lc.getValue("basicInfo")+'</label></h4>'
				  +'<div name="basic" >'
				  +field.getTextField("alias","",window.lc.getValue("devName"))
				  +field.getDisplayField("productSnStr","",window.lc.getValue("productSn"))
				  +field.getRadioField("adminStatus","",window.lc.getValue("adminStatus"),[{value:2,text:window.lc.getValue("disable")},{value:1,text:window.lc.getValue("enable")}])
				  +field.getDisplayField("runStatus","",window.lc.getValue("runStatus"))
				  +field.getTextareaField("detailDesc","",window.lc.getValue("desc"))
			   +'</div>'
			   +'</br>'
				+'<h4 ><label>'+window.lc.getValue("detailInfo")+'</label></h4>'
				+'<div name="detail" >'
				+field.getDisplayField("productId","",window.lc.getValue("devType"))
				+field.getDisplayField("productName","",window.lc.getValue("productName"))
				+field.getDisplayField("vendorId","",window.lc.getValue("vendor"))
				+field.getComboField("siteUuid","",window.lc.getValue("ownSite"),siteList)
//				+field.getTextField("password","",window.lc.getValue("regPwd")+'<button name="view-pwd" type="button" title="'+window.lc.getValue("regPwd")+'" class="btn btn-link btn-sm">'+window.lc.getValue("show")+'</button>',"","password")
				+field.getDisplayField("outerIpAddr","",window.lc.getValue("outIp"))
//				+field.getDisplayField("regFailCount","",window.lc.getValue("regFailCnt"))
				+field.getDisplayField("lastRegTime","",window.lc.getValue("lastRegTime"),"",true);
		if(window.format.isDag(record.productId)){
			html+=field.getDisplayField("resetReason","",window.lc.getValue("resetReason"));
		}
				html+=field.getDisplayField("packageVersion","",window.lc.getValue("version"))
				+field.getDisplayField("packageBuildTime","",window.lc.getValue("softBuiltTime"),"",true)
				+field.getTextareaField("detailVer","",window.lc.getValue("detailVer"))	
				+'</div>'
				
			  		  
			  +'</div>'
			  +'<div class="col-md-1">'
			  +'</div>'
			  +'<div class="col-md-5">'
				+'<h4 ><label >'+window.lc.getValue("perInfo")+'</label></h4>'
				+'<div name="per" >'
				+field.getDisplayField("curCpu","",window.lc.getValue("curCpuUsage"))
				+field.getDisplayField("avgCpu5","",window.lc.getValue("avgCpuUsage")+"(5"+window.lc.getValue("secs")+")")
				+field.getDisplayField("avgCpu60","",window.lc.getValue("avgCpuUsage")+"(60"+window.lc.getValue("secs")+")")
				+field.getDisplayField("avgCpu600","",window.lc.getValue("avgCpuUsage")+"(600"+window.lc.getValue("secs")+")")
				+field.getDisplayField("memAosUsage","",window.lc.getValue("memUsage"))												
				+'</div>'

				+'<h4 ><label >'+window.lc.getValue("upgradeInfo")+'</label></h4>'
				+'<div name="upgrade" >'
				+field.getRadioField("upgradeType","",window.lc.getValue("upgradeSetting"),[{value:0,text:window.lc.getValue("disable")},{value:1,text:window.lc.getValue("toTargetVer")}])
				+field.getDisplayField("targetSoftwareVer","",window.lc.getValue("targetVer"))
				+field.getDisplayField("upgradeStatus","",window.lc.getValue("upgradeStatus"))
				+field.getDisplayField("lastUpgradeResult","",window.lc.getValue("lastUpgradeResult"))
				+field.getDisplayField("lastUpgradeTime","",window.lc.getValue("lastUpgradeTime"),"",true)												
				+'</div>'
			  +'</div>'			  
			 +'</div>'
			 +'</div>'			 
			+'</form>';
		pn.html("");		
		pn.append(html);
		$('#'+id).autofill(record);
		$('#'+id+' [name=runStatus]').html(window.lc.getValue("runStatus",record.runStatus));
		$('#'+id+' [name=productId]').html(window.format.getDevType(record.productId));
		$('#'+id+' [name=vendorId]').html(window.lc.getValue("vendor",record.vendorId));
		$('#'+id+' [name=resetReason]').html(window.lc.getResetReason(record.resetReason));
		var buildTime="-";
		if(record.packageBuildTime){
			buildTime=window.format.getDate(record.packageBuildTime).format("yyyy-MM-dd hh:mm:ss");
		}
		$('#'+id+' [name=packageBuildTime]').html(buildTime);
		$("#"+id+" button[name=view-pwd]").bind('click',function(){
			var inp=$("#"+id+" input[name=password]");
			var pin=$(this);
			var str=inp.attr("type");
			var text=window.lc.getValue("show");
			var text1=window.lc.getValue("hide");
			if(str=="password"){
				$("#"+id+" input[name=password]").attr("type","text");
				pin.html(text1);
			}else{
				$("#"+id+" input[name=password]").attr("type","password");
				pin.html(text);
			}
		});
		$("#"+id+" button[name=back]").bind('click',function(){
			if(pid=="dev_list"){
				require(["dev-list"], function(grid) {
					grid.createDevList2(pid,pid+"_child","dmManager!getNeList.action");
				});	
			}else if(pid=="dev_alarm"){
				require(["dev-alarm"], function(da) { 
					da.createAlarmList2(pid,"androidManager!getDevAlarm.action");
				});
			}else if(pid=="alarm_calc"){
				require(["alarm-list"], function(alarm) { 		
					alarm.createAll(pid,pid+"_dev");
				});
			}else if(pid=="alarm_his"){
				require(["alarm-log"], function(alarm) { 		
					alarm.createView(pid);
				});
			}	
		});
		
		$("#"+id+" button[name=save]").bind('click',function(){
			
			var form=$("#"+id);
	 		var pa=form.formSerialize();
			pa+="&domainUuid="+record["domainUuid"];
			pa+="&uuid="+record["uuid"];
			 $.ajax({ 
					url: "neManager!updateNe.action",
//					data:{mainSearch:$.trim($('#dev_tag').val())?window.lc.parseValues($.trim($('#dev_tag').val())):""},
					type: 'POST',
					data:pa,
					complete: function(data,str){
						if(data.responseJSON && data.responseJSON.success){				
							window.tip.show_pk("success",null,window.lc.getValue("setSucc"));
						}else{
							window.tip.show_pk("danger",null,window.lc.getValue("setFail"));
						}
				}});
	      	  
		});

		$("#port_bt").bind('click',function(){
			fun.goToPortList(pid,record,"form");
//			var productId=record.productId;
//			var name=window.lc.getProductType(productId);
//			if(name=="MTG"){
//				require(["mtg-port-list"], function(grid) {
//					grid.createPortList(pid,pid+"_tg",{neUuid:record.uuid,domainUuid:record.domainUuid},"all");
//				});	
//			}else if(name=="DAG"){
//				require(["dag-port-list"], function(grid) {
//					grid.createPortList(pid,pid+"_ag",{neUuid:record.uuid,domainUuid:record.domainUuid},"all");
//				});
//			}
	
		});
	}
	function loadLocalData(pid,id,record,siteList){
		createDev(pid,id,record,siteList);
	}
	function loadRemoteData(pid,id,params){
		//此处需要同时发多个请求
		$.when(
			 $.ajax({ url: "dmManager!getNe.action", data:params}), 
			 $.ajax({ url: "getCombox.action", data:{domainUuid:params.dstDomainUuid,types:"site"}})
		).then(function(a, b) { 
			if(a && b && a[1]=="success" && b[1]=="success"){
				if(b[0] && b[0].comboxList && b[0].comboxList.length){
					var siteList=[];
					for(var i=0;i<b[0].comboxList.length;i++){
						var item=b[0].comboxList[i];
						var site={};
						if(item.type=="site"){
							site.value=item.uuid;
							site.text=item.name;
							siteList.push(site);
						}
					}
					window.dev.comboxList=siteList;
				}
				if(a[0] && a[0].devList && a[0].devList.length){
					window.dev.devPanel=a[0].devList[0];
					loadLocalData(pid,id,a[0].devList[0],siteList);
					$("#"+id+" button[name=refresh]").bind('click',function(){
						loadRemoteData(pid,id,params);
					});
				}
			}
			
		});
	}		
    return {
		createDev:createDev,
		loadRemoteData:loadRemoteData,
		loadLocalData:loadLocalData
    };
});


