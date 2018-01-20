define(["sip-port-fun"],function(fun){
	function createView(pid,row){
		 pn=$("#"+pid);
		    if(!pn){
		      return;
		    }
		   id=pid+"sip_list";
		    var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
		       html+='<button name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i></button>'
	           html+='<button id="'+id+'-add" class="btn btn-success btn-sm  " style="display:'+window.global.getClass("addDevice")+'" ><i class="fa fa-plus"></i>'+window.lc.getValue("add")+'</button>';
	           html+='<button id="'+id+'-set" type="submit" class="btn btn-sm btn-success" style="display:'+window.global.getClass("modifyDevice")+'" title="'+window.lc.getValue("set")+'"><i class="fa fa-pencil"></i>'+window.lc.getValue("set")+'</button>';
	           html+='<button id="'+id+'-del" type="submit" class="btn btn-sm btn-danger" style="display:'+window.global.getClass("deleteDevice")+'"  title="'+window.lc.getValue("del")+'"><i class="fa fa-remove"></i>'+window.lc.getValue("del")+'</button>';
	           html+='<button id="'+id+'-addbatch" class="btn btn-info btn-sm  " style="display:'+window.global.getClass("addDevice")+'" ><i class="fa fa-plus"></i>'+window.lc.getValue("addBatch")+'</button>';
		       html+='</div>'
		       html+='<table id='+id+'></table>';
		    pn.html("");
		    pn.append(html);
		    $('#'+id).bootstrapTable({
			      method: 'get',
			      url: "sipConfigManager!getSipConfigList.action",
			      cache: false,
//			      height: 400,
			      responseHandler:function(res){
			    	if(res && res.tblSipConfig){
						var obj={};
						obj["rows"]=res.tblSipConfig;
						obj.total=res["total"];
						return obj;
					}
					return res;
			      },
			      queryParams:function(p){
			            var params={};
			            params.domainUuid=row.domainUuid;
			            params.productSn=row.productSns;
			            params.limit=p.limit;
			            params.start=p.offset;
			            if(p.search){
							params.search=p.search;
						}
			            
			            return params;
			        
			      },
			      striped: true,
			      toolbar:"#"+id+"-toolbar",
//			      toolbarAlign:'right',
			      pagination: true,
			      pageSize: 10,
//						pageNumber:1,
			      sidePagination: "server",
					pageList: [10,25],
			      search: true,
			      searchOnEnterKey:true,
//			      searchText:"Sip Account",
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
//					sortable: true,
					visible:false
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
//			          sortable: true,
//			          width:155,
			      },{
			        field: 'port',
			        title: window.lc.getValue("port"),
			        align: 'center',
			        valign: 'middle',
			    	
			      }, {
			        field: 'mainSipName',
			        title: window.lc.getValue("mainSipName"),
			        align: 'center',
			        valign: 'middle',
			        formatter:function(value,row,index){
			    	  if(row.disablePort==1){
			    		  return "-"
			    	  }else{
			    		  return value?value:"-";
			    	  }
			      }
			      },{
			        field: 'mainSipAccount',
			        title: window.lc.getValue("mainSipAccount"),
			        align: 'center',
			        valign: 'middle',
       	           formatter:function(value,row,index){
			    	  if(row.disablePort==1){
			    		  return "-"
			    	  }else{
			    		  return value?value:"-";
			    	  }
			      }
			       
			      },{
			        field: 'mainSipAuthAccount',
			        title: window.lc.getValue("mainSipAuthAccount"),
			        align: 'center',
			        valign: 'middle',
			        formatter:function(value,row,index){
			    	  if(row.disablePort==1){
			    		  return "-"
			    	  }else{
			    		  return value?value:"-";
			    	  }
			      }
			       
			      },{
			          field: 'dialNumber',
			          title: window.lc.getValue("dialNum"),
			          align: 'center',
			          valign: 'middle',
			          formatter:function(value,row,index){
			    	  if(row.disablePort==1){
			    		  return "-"
			    	  }else{
			    		  return value?value:"-";
			    	  }
			       }
			         
			        },{
			        field: 'notDisturb',
			        title: window.lc.getValue("notDisturb"),
			        align: 'center',
			        valign: 'middle',
			        formatter:function(value,row,index){
			        	if(row.disablePort==1){
				    		  return "-"
				    	  }else  if(value==1){
			    		   return window.lc.getValue('enable'); 
			    	   }else if (value==0){
			    		   return window.lc.getValue('disable');  
			    	   }
				    	  	
				  }
			        
			      },{
			          field: 'callId',
			          title: window.lc.getValue("callId"),
			          align: 'center',
			          valign: 'middle',
			          formatter:function(value,row,index){
			    	  if(row.disablePort==1){
			    		  return "-"
			    	  }else  if(value==1){
			    		   return window.lc.getValue('enable'); 
			    	   }else if (value==0){
			    		   return window.lc.getValue('disable');  
			    	   }
				    	  	
				  } 
			        
			        },{
			          field: 'unconditionalCall',
			          title: window.lc.getValue("unCall"),
			          align: 'center',
			          valign: 'middle',
			          formatter:function(value,row,index){
				    	  if(row.disablePort==1){
				    		  return "-"
				    	  }else{
				    		  return value?value:"-";
				    	  }
				       }
			        },{
			          field: 'busyCallTransfer',
			          title: window.lc.getValue("busyCall"),
			          align: 'center',
			          valign: 'middle',
			          formatter:function(value,row,index){
				    	  if(row.disablePort==1){
				    		  return "-"
				    	  }else{
				    		  return value?value:"-";
				    	  }
				       }
			          
			      },{
			           field: 'cfnry',
			           title: window.lc.getValue("cfnry"),
			           align: 'center',
			           valign: 'middle',
			           formatter:function(value,row,index){
			    	  if(row.disablePort==1){
			    		  return "-"
			    	    }else{
			    	    	 return value?value:"-";
				    	  }
			          }
			        
			          
			        },{
				           field: 'callWait',
				           title: window.lc.getValue("callWait"),
				           align: 'center',
				           valign: 'middle',
				           formatter:function(value,row,index){
			        	if(row.disablePort==1){
				    		  return "-"
				    	    }else if(value==1){
				    		   return window.lc.getValue('enable'); 
				    	   }else if (value==0){
				    		   return window.lc.getValue('disable');  
				    	   }
					    	  	
					  }
				          
				     },{
				           field: 'callWaitTone',
				           title: window.lc.getValue("callWaitTone"),
				           align: 'center',
				           valign: 'middle',
				           formatter:function(value,row,index){
				    	   if(row.disablePort==1){
				    		  return "-"
				    	    }if(value==1){
				    		   return window.lc.getValue('enable'); 
				    	   }else if (value==0){
				    		   return window.lc.getValue('disable');  
				    	   }
					    	  	
					  }
			          
			        }]
					 
		})
		
		  $('#'+id).on('post-body.bs.table', function () {
//		    	$('#'+id+' [data-rel=tooltip]').tooltip();
		    	window.list.changeForAce(pid,id,600);
		    })
			$(window).resize(function () {
				window.list.changeView(pid,id,600);
			});
		    window.list.changeView(pid,id,600);
		    
		    
		    $("button[name=back]").click(function(){
		    	$("#dev_manage").click();
		    	
		    })
		    $("#"+id+"-add").click(function(){
		    	var params={};
		    	params.domainUuid=row.domainUuid;
		    	params.productSn=row.productSns;
		    	$.ajax({
		    		 url:'sipConfigManager!getSipConfigList.action',
					 type:'post',
					 data:params,
					 complete:function(data){
		    		if(data.responseJSON&&data.responseJSON.success){
		    		fun.createAddHtml(pid,row,id+"-add",data.responseJSON.tblSipConfig);
		    		}
		    		}
		    		
		    	})
		    	
		    })
		     $("#"+id+"-set").click(function(){
		    	 var rows=$('#'+id).bootstrapTable('getSelections');
		    	 if(rows.length==0){
		    		 window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
						return; 
		    	 }
		    	 if(rows.length>1){
		    		 window.tip.show_pk("warning",null,window.lc.getValue("onlyOnePermit"));
						return;
		    	 }
		    	 
		    	 var params={};
			    	params.domainUuid=row.domainUuid;
			    	params.productSn=row.productSns;
			    	//params.port=rows[0].port;
			    	$.ajax({
			    		 url:'sipConfigManager!getSipConfigList.action',
						 type:'post',
						 data:params,
						 complete:function(data){
			    		if(data.responseJSON&&data.responseJSON.success){
			    			fun.createAddHtml(pid,row,id+"-set",data.responseJSON.tblSipConfig,rows);
			    		}
			    		}
			    		
			    	})
		    })
		     $("#"+id+"-del").click(function(){
		    	 var rows=$('#'+id).bootstrapTable('getSelections');
		    	 if(rows.length==0){
		    		 window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
						return; 
		    	 }
		    	 for(var i=0;i<rows.length;i++){
		    		 if(i==0){
		    			 port=rows[i].port;
		    		 }else{
		    			 port=port+","+rows[i].port;
		    		 }
		    	 }
		    	 
		    	 var params={};
			    	params.domainUuid=row.domainUuid;
			    	params.productSn=row.productSns; 
			    	params.port=port;
			    	//params.provUrl="172.16.0.40";
			    	params.provUrl=window.extra.provUrl;
			    	$.ajax({
			    		 url:'sipConfigManager!deleteSipConfigList.action',
						 type:'post',
						 data:params,
						 complete:function(data){
			    		  window.list.delRefresh(id,rows);
			    			if(data.responseJSON && data.responseJSON.success){	
								
								window.tip.show_pk("success",null,window.lc.getValue("delSucc")+"!");
								
							}else{
								window.tip.show_pk("danger",null,window.lc.getValue("delFail")+"");
							}
			    		
			    		}
			    		
			    	})
			    	
		    })
		    $("#"+id+"-addbatch").click(function(){
		    	 var params={};
			    	params.domainUuid=row.domainUuid;
			    	params.productSn=row.productSns;
			    	//params.port=rows[0].port;
			    	$.ajax({
			    		 url:'sipConfigManager!getSipConfigList.action',
						 type:'post',
						 data:params,
						 complete:function(data){
			    		if(data.responseJSON&&data.responseJSON.success){
			    			fun.createAddBatchHtml(pid,row,data.responseJSON.tblSipConfig);
			    		}
			    		}
			    		
			    	})
		    	
		    	
		    })
	}
	
	return{
		createView:createView,
	}
})