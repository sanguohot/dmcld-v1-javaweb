define([],function (){
	function getPrevPath(text){
		var gb=window.groupBy;
		var direction="prev";
		var domainUuid=window.user.dstDomainUuid;
		if(!gb){
			return "";
		}else if(gb=="domain"){
			return getLink(direction,"root","root","",text);
		}else if(gb=="zone"){
			if(domainUuid){
				return "";
			}
			return getLink(direction,"domain","domain_"+$("#domain-sel").val(),"domain",text);
		}else if(gb=="site"){
			return getLink(direction,"zone","zone_"+$("#domain-sel").val(),"zone",text);
		}
	}
	function getRefreshPath(){
		var text=window.lc.getValue("refresh");
		return getLink("refresh","refresh","refresh","zone",text);
	}
	function getNextPath(obj,text){
		var gb=window.groupBy;
		var node=window.global.getNode();
		var et=window.global.getEtype();
		var direction="next";
		if(!gb){
			return getLink(direction,"root","root","domain",text,obj);
		}else if(gb=="domain"){
			return getLink(direction,"domain","domain_"+obj.domainUuid,"zone",text,obj);
		}else if(gb=="zone"){
			return getLink(direction,"zone","zone_"+obj.zoneUuid,"site",text,obj);
		}else if(gb=="site"){
			return "";
		}
	}
	function getLink(direction,etype,nid,gb,text,obj){
		var domainUuid=obj?obj.domainUuid:window.global.getDomainUuid();
		return '<a class="blue" group-by="'+gb+'" domain_uuid='+domainUuid+' direction='+direction+' etype="'+etype+'" nid="'+nid+'" href="#">'+text+'</a>';
	}
	function pathClick(node){
//		var node=$(this);
		var nid=node.attr("nid");
		var gb=node.attr("group-by");
		var dr=node.attr("direction");
		if(dr=="refresh"){
//			require(['dev-calc-group'],function(calc){
//				calc.
//			})
//			return;
		}
		var et=node.attr("etype");
		window.groupBy=gb;
		var tn=$("#nav-list a[nid="+nid+"]");
		if(tn && tn.length){
			tn.trigger("click");
		}else if(!gb || gb=="domain"){
			if($("#domain-sel").val()){
				$("#domain-sel").val("");
				$("#domain-sel").trigger("chosen:updated");
				window.domainChange();
			}else{
				window.domainChange();
			}
		}else if(gb=="zone"){
//			window.domainChange();
			var domainUuid=node.attr("domain_uuid");
			if($("#domain-sel").val()!=domainUuid){
				$("#domain-sel").val(domainUuid);
				$("#domain-sel").trigger("chosen:updated");
				window.domainChange();
			}else{
				window.domainChange();
			}
		}
	}
    return {
    	getPrevPath:getPrevPath,
    	getNextPath:getNextPath,
    	pathClick:pathClick
    };
});


