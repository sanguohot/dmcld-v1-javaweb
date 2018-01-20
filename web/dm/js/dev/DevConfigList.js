define(["dev-tree","dev-sch"],function (tree,sch){
	function createView(pid){
		n=$("#"+pid);
		if(!n){
			return;
		}
		n.html("");
		var id=pid+"_config";
	    var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">';
	   // html+='<button name="back" type="button" class="btn btn-sm btn-info" title="返回"><i class="fa fa-reply bigger-130"></i></button>';
		html+='</div>';
	    n.html(html+'<table id="'+id+'"></table>');
		    
		    $('#'+id).bootstrapTable({
		      method: 'get',
		      url: "batchConfigurationManager!getBatchConfigurationList.action",
		      cache: false,
//		      height: 400,
		      responseHandler:function(res){
		    	if(res && res.devConf){
					var obj={};
					obj["rows"]=res.devConf;
					obj.total=res["total"];
					return obj;
				}
				return res;
		      },
		      queryParams:function(p){
		            var params={};
		          	params.mainSearch=$.trim($('#dev_tag').val());
		        	params.upSearch=sch.getSchPara();
		            params.limit=p.limit;
		            params.start=p.offset;
		            if(p.search){
						params.search=p.search;
					}
		            window.global.getTreePara(params);
		            return params;
		        
		      },
		      striped: true,
		      toolbar:"#"+id+"-toolbar",
//		      toolbarAlign:'right',
		      pagination: true,
		      pageSize: 10,
//					pageNumber:1,
		      sidePagination: "server",
				pageList: [10,25],
		      search: true,
		      searchOnEnterKey:true,
//		      searchText:"Sip Account",
		      showColumns: true,
		      showRefresh: true,
		      queryParamsType:'limit',
		      sidePagination: "server",
		      showToggle:true,
		      smartDisplay:true,
		      minimumCountColumns: 2,
		      clickToSelect: true,
		    
			
		      columns: [{
		        field: 'state',
		        checkbox: true,
		        cardVisible:false
		      },{
				field: 'uuid',
				title: 'uuid',
				align: 'center',
				valign: 'middle',
//				sortable: true,
				visible:false
		      },{
		          field: 'domainName',
		          title: window.lc.getValue("domain"),
		          align: 'left',
		          valign: 'middle',
		          visible:window.global.getDomainUuid()?false:true//超级用户可见
		     },{
		        field: 'alias',
		        title: window.lc.getValue("devName"),
		        align: 'left',
		        valign: 'middle',
		    	cellStyle:function(value,row,index){
			  		return {
						    css: {"max-width": "110px","word-break":"break-all"}
						};
			  	}
		      },{
		          field: 'productSn',
		          title: window.lc.getValue("productSn"),
		          align: 'center',
		          valign: 'middle',
//		          sortable: true,
//		          width:155,
		          formatter:function(value,row,index){
		    	  var alarmFlag=row.alarmFlag;
		    	  var html='';
		    	  if(alarmFlag){
		    		  html+='<span class="my-blink" class="width20" style="position:relative;top:-2px;left:0px;">'+getAlarmLink(index,row,"ne")+'</span>'
//		    		  return '<span>'+html+value+'</span>'
		    	  }
		    	  return html+value;
		        },
		    	cellStyle:function(value,row,index){
		    		return {
					    css: {"min-width": "155px"}
					};
		    	}
		      },{
		        field: 'drpAddress',
		        title: window.lc.getValue("drpAddress"),
		        align: 'center',
		        valign: 'middle',
		    	
		      }, {
		        field: 'drpPort',
		        title: window.lc.getValue("drpPort"),
		        align: 'center',
		        valign: 'middle',
//		        sortable: true,
				
		      },{
		        field: 'netManageAddr',
		        title: window.lc.getValue("netAddress"),
		        align: 'center',
		        valign: 'middle',
//		        sortable: true,
		       
		      },{
		        field: 'netManagePort',
		        title: window.lc.getValue("netPort"),
		        align: 'center',
		        valign: 'middle',
		       
		      },{
		          field: 'sipServerAddr',
		          title: window.lc.getValue("sipAddress"),
		          align: 'center',
		          valign: 'middle',
		         
		        },{
		        field: 'sipServerPort',
		        title: window.lc.getValue("sipPort"),
		        align: 'center',
		        valign: 'middle',
		        
		      },{
		          field: 'ipProtocol',
		          title: window.lc.getValue("ipProtocol"),
		          align: 'center',
		          valign: 'middle',
		          formatter:function(value,row,index){
		    	   if(value==1){
		    		   return "IP4"; 
		    	   }else if (value==2){
		    		   return "IP6";  
		    	   }
		    	  	
			       }
		        
		        },{
		          field: 'networkMode',
		          title: window.lc.getValue("networkMode"),
		          align: 'center',
		          valign: 'middle',
		          formatter:function(value,row,index){
			    	   if(value==0){
			    		   return window.lc.getValue("routing"); 
			    	    }else if(value==1){
			    		   return window.lc.getValue("bridge"); 
			    	       }
				     }
			        
		         
		        },{
		          field: 'networkMode',
		          title: window.lc.getValue("networkSet"),
		          align: 'center',
		          valign: 'middle',
		          formatter:function(value,row,index){
			    	   if(value==0){
			    		   return window.lc.getValue("manuaIp"); 
			    	    }else if(value==1){
			    		   return window.lc.getValue("autoIp"); 
			    	      }else if(value==2){
			    		   return "PPPOE"; 
			    	      }
				     }
		      },{
		           field: 'wanIp',
		           title: window.lc.getValue("wanIp"),
		           align: 'center',
		           valign: 'middle',
		          
		        },{
			           field: 'wanMask',
			           title: window.lc.getValue("wanMask"),
			           align: 'center',
			           valign: 'middle',
			          
			     },{
			           field: 'wanGateway',
			           title: window.lc.getValue("wanGateway"),
			           align: 'center',
			           valign: 'middle',
		          
		        },{
			           field: 'pppUsername',
			           title: window.lc.getValue("pppUsername"),
			           align: 'center',
			           valign: 'middle',
			          
		        },{
			           field: 'pppPassword',
			           title: window.lc.getValue("pppPassword"),
			           align: 'center',
			           valign: 'middle',
			          
		        },{
			           field: 'pppServicename',
			           title: window.lc.getValue("pppServiceName"),
			           align: 'center',
			           valign: 'middle',
			          
		        },{
			           field: 'wanMtu',
			           title: window.lc.getValue("wanMtu"),
			           align: 'center',
			           valign: 'middle',
			          
			        },{
			           field: 'lanIp',
			           title: window.lc.getValue("lanIp"),
			           align: 'center',
			           valign: 'middle',
			          
			        },{
			           field: 'lanMask',
			           title: window.lc.getValue("lanMask"),
			           align: 'center',
			           valign: 'middle',
				          
			        },{
			           field: 'lanMtu',
			           title: window.lc.getValue("lanMtu"),
			           align: 'center',
			           valign: 'middle',
				          
			        },{
			           field: 'usePeerDns',
			           title: window.lc.getValue("dnsServer"),
			           align: 'center',
			           valign: 'middle',
			           formatter:function(value,row,index){
				    	   if(value==0){
				    		   return window.lc.getValue("manuaDNS"); 
				    	    }else if(value==1){
				    		   return window.lc.getValue("autoDNS"); 
				    	       }
					     }
			          
			        },{
			           field: 'wanDns1',
			           title: window.lc.getValue("mainDNS"),
			           align: 'center',
			           valign: 'middle',
						          
				   },{
			           field: 'wanDns2',
			           title: window.lc.getValue("secDNS"),
			           align: 'center',
			           valign: 'middle',
						          
				   }]
				 
	})
	
	  $('#'+id).on('post-body.bs.table', function () {
//	    	$('#'+id+' [data-rel=tooltip]').tooltip();
	    	window.list.changeForAce(pid,id,600);
	    })
		$(window).resize(function () {
			window.list.changeView(pid,id,600);
		});
	    window.list.changeView(pid,id,600);
	}
	
	return {
		createView:createView,
	}
})