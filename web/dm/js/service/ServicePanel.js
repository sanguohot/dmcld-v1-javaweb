define(["form-field"],function (field){
	function createDev(pid,id,record,siteList){
		var pn=$("#"+pid);
		if(!pn) return;
		var format=window.format;
		var html='<form id="'+id+'" class="my-tab" role="form">'
			+'<div class="btn-group">'
			  +'<button class="btn btn-info btn-sm tooltip-info" type="button" title="返回" name="back" pid="'+pid+'" ><i class="fa fa-reply bigger-130"></i>&nbsp;返回</button>'
			   +'<button type="button"  name="save" title="保存" class="btn btn-success btn-sm tooltip-success"><i class="fa fa-pencil bigger-130"></i>&nbsp;保存</button>'
			   +'<button name="refresh" type="button" title="刷新" class="btn btn-info btn-sm tooltip-warning"><i class="fa fa-refresh bigger-130"></i>&nbsp;刷新</button>'
			   +'<button id="port_bt" type="button" title="端口列表" class="btn btn-info btn-sm"><i class="fa fa-list bigger-130"></i>&nbsp;端口列表</button>'
			+'</div>'
			+'<div class="container-fluid">'
			 +'<div class="row">'
			  +'<div class="col-md-5">'
				+'<h4 ><label>基本信息</label></h4>'
				  +'<div name="basic" >'
				  +field.getTextField("alias","","设备名称")
				  +field.getDisplayField("productSnStr","","设备序号")
				  +field.getRadioField("adminStatus","","管理状态",[{value:2,text:"禁用"},{value:1,text:"启用"}])
		+field.getDisplayField("runStatus","","运行状态")
		+field.getTextareaField("detailDesc","","详细描述")
			   +'</div>'
			   +'</br>'
				+'<h4 ><label>详细信息</label></h4>'
				+'<div name="detail" >'
				+field.getDisplayField("productId","","设备类型")
				+field.getDisplayField("productName","","产品型号")
				+field.getDisplayField("vendorId","","厂商")
				+field.getComboField("siteUuid","","隶属站点",siteList)
		+field.getDisplayField("outerIpAddr","","公网IP")
		+field.getDisplayField("regFailCount","","注册失败数")
		+field.getDisplayField("lastRegTime","","上次注册时间")
		+field.getDisplayField("packageVersion","","版本")
		+field.getDisplayField("packageBuildTime","","软件发布时间")
		+field.getTextareaField("detailVer","","附加版本信息")			
				+'</div>'
				
			  		  
			  +'</div>'
			  +'<div class="col-md-1">'
			  +'</div>'
			  +'<div class="col-md-5">'
				+'<h4 ><label >统计信息</label></h4>'
				+'<div name="per" >'
				+field.getDisplayField("curCpu","","当前CPU占用率")
				+field.getDisplayField("avgCpu5","","CPU平均占用率(5秒)")
				+field.getDisplayField("avgCpu60","","CPU平均占用率(60秒)")
				+field.getDisplayField("avgCpu600","","CPU平均占用率(600秒)")
				+field.getDisplayField("memAosUsage","","内存占用率")												
				+'</div>'

				+'<h4 ><label >升级信息</label></h4>'
				+'<div name="upgrade" >'
				+field.getRadioField("upgradeType","","升级设置",[{value:0,text:"禁用"},{value:1,text:"升级到目标版本"}])
				+field.getDisplayField("targetSoftwareVer","","目标版本")
				+field.getDisplayField("upgradeStatus","","升级状态")
				+field.getDisplayField("lastUpgradeResult","","上次上级结果")
				+field.getDisplayField("lastUpgradeTime","","上次升级时间")												
				+'</div>'
			  +'</div>'			  
			 +'</div>'
			 +'</div>'			 
			+'</form>';
		pn.html("");		
		pn.append(html);
		$('#'+id).autofill(record);
		
		$("#"+id+" button[name=back]").bind('click',function(){
			require(["dev-list"], function(grid) {
				grid.createDevList2(pid,pid+"_child","dmManager!getNeList.action");
			});		
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
							window.tip.show_pk("success",null,"修改成功");
						}else{
							window.tip.show_pk("danger",null,"修改失败");
						}
				}});	
		});

		$("#port_bt").bind('click',function(){
			var productId=record.productId;
			var name=window.lc.getProductType(productId);
			if(name=="MTG"){
				require(["mtg-port-list"], function(grid) {
					grid.createPortList(pid,pid+"_tg",{neUuid:record.uuid,domainUuid:record.domainUuid},"all");
				});	
			}else if(name=="DAG"){
				require(["dag-port-list"], function(grid) {
					grid.createPortList(pid,pid+"_ag",{neUuid:record.uuid,domainUuid:record.domainUuid},"all");
				});
			}
	
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


