define(["form-field","service-fun","pri-pri"],function (field,fun,pri){
	
	function createCalc(pid,obj){
		var pn=$("#"+pid);
		if(!pn) return;
		var format=window.format;
		var id=pid+"_child";
		var html='<form id="'+id+'" class="my-tab" role="form">';
//		html+='<p>:'+(obj.sysCnt?obj.sysCnt:'---')+'</p>';
//		html+='<p>总处理数:'+(obj.totalProcess?obj.totalProcess:'---')+'</p>';
		html+='<div class="btn-group">'
		   +'<button type="button" id="freq-save" name="save" style="display:'+window.global.getClass("modifyDevice")+'" title="'+window.lc.getValue("save")+'" class="btn btn-success btn-sm tooltip-success"><i class="fa fa-pencil bigger-130"></i>&nbsp;'+window.lc.getValue("save")+'</button>'
		   +'<button name="refresh" id="freq-refresh" type="button" title="'+window.lc.getValue("refresh")+'" class="btn btn-info btn-sm tooltip-warning"><i class="fa fa-refresh bigger-130"></i>&nbsp;'+window.lc.getValue("refresh")+'</button>'
		+'</div>';
		html+='<div class="container-fluid" >';
		html+='<div class="row ">';
		html+='<div class="col-md-6">';
		//if(window.global.getClass("modifyDevice")=="inline-block"){
		html+='<h5>'+window.lc.getValue("callerFreqControl")+':</h5>';
		
		html+=field.getSwitch("callerFreqSwitch","",window.lc.getValue("freqSwitch"),1);
		//}
		html+='<div id="callerBody">';
		html+=field.getTextField("callerTimeLimit","",window.lc.getValue("period")+"("+window.lc.getValue("mins")+")"
				,"","",false,window.lc.getValue("nullNotChange"));
		html+=field.getTextField("callerMaxNum","",window.lc.getValue("callMaxNum"),"","",false,window.lc.getValue("nullNotChange"));
		html+='</div>';
		html+='</br>';
		//if(window.global.getClass("modifyDevice")=="inline-block"){
		html+='<h5>'+window.lc.getValue("calleeFreqControl")+':</h5>';
		html+=field.getSwitch("calleeFreqSwitch","",window.lc.getValue("freqSwitch"),1);
		//}
		html+='<div id="calleeBody">';
		html+=field.getTextField("calleeTimeLimit","",window.lc.getValue("period")+"("+window.lc.getValue("mins")+")","","",false,window.lc.getValue("nullNotChange"));
		html+=field.getTextField("calleeMaxNum","",window.lc.getValue("callMaxNum"),"","",false,window.lc.getValue("nullNotChange"));
		html+='</div>';
		html+='</div>';

		html+='</div>';
		html+='</div>';
			+'</form>';
		pn.html("");		
		pn.append(html);
//		$('#'+id).autofill(obj);
		freqSwitch(id,"callerFreqSwitch","callerBody",obj.caller);
		freqSwitch(id,"calleeFreqSwitch","calleeBody",obj.callee);
		
		$("#freq-save").bind("click",function(){
			
			var form=$("#"+id);
	 		var pa=form.formSerialize();
			pa+="&dstDomainUuid="+window.global.getDomainUuid();
//			pa+="&uuid="+record["uuid"];
			 $.ajax({ 
					url: "freqManager!setFreq.action",
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
		$("#freq-refresh").bind("click",function(){
//			fun.addServer();
			loadRemoteData(pid);
		});
	}
	
	function freqSwitch(fid,name,bid,obj){
		var b=$("#"+bid);
		b.css("display","none");
		function procCheck(){
			var n=$('#'+fid+' input[name='+name+']:checked');
			if(n.length){
				b.css("display","block");
			}else{
				b.css("display","none");
			}
		}
		$('#'+fid+' input[name='+name+']').bind("click",procCheck);
		if(obj["freqSwitch"]==1){			
			var n=$('#'+fid+' input[name='+name+']:checked');
			if(!n.length){
				$('#'+fid+' input[name='+name+']').trigger("click");
			}
		}else{
//			b.css("display","none");
			var n=$('#'+fid+' input[name='+name+']:checked');
			if(n.length){
				$('#'+fid+' input[name='+name+']').trigger("click");
			}
		}
		var pre="caller";
		if(name.indexOf("callee")>=0){
			pre="callee";
		}
		$('#'+fid+' input[name='+pre+'TimeLimit]').val(obj.timeLimit);
		$('#'+fid+' input[name='+pre+'MaxNum]').val(obj.maxNum);
	}
	function loadRemoteData(pid){
		var params={mainSearch:$.trim($('#dev_tag').val())};
		params.dstDomainUuid=window.global.getDomainUuid();
		 $.ajax({ 
			url: "freqManager!getFreqCalc.action",
			data:params,
			complete: function(data,str){
			if(data.responseJSON && data.responseJSON.fc){
				var obj=data.responseJSON.fc;
				createCalc(pid,obj);
			}
		}});
	}
    return {
    	createCalc:createCalc,
    	loadRemoteData:loadRemoteData
    };
});


