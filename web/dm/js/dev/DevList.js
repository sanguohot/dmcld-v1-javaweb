define(["dev-tree","dev-sch","dev-fun","dev-type",'theme-macarons',"bootstrap-table","pri-pri"],
		function (tree,sch,fun,devType,theme,ech,pri){
  function createColEvents(pid,id,modelUuid,modelDomainUuid){
	    var view=function (e, value, row, index) {
		      var uuid=row.uuid;
		      var domainUuid=row.domainUuid;
		      var params={neUuid:uuid,dstDomainUuid:domainUuid};
		      require(["dev-panel"], function (panel){
		        panel.loadRemoteData(pid,pid+"_form",params);
		      });
	    };
	    
	    var apply=function(e, value, row, index){
	    	
	      		 if(row.runStatus == 3 || row.runStatus == 10){
	   	          fun.applyToDev(pid,[row],modelUuid,modelDomainUuid);
	   	        }else{
	   	          window.tip.show_pk("warning",null,window.lc.getValue("devIsNotOnline"));
	   	        }
	      	      
	       
	    }
	    var add=function(e, value, row, index){
	    	
	   		    fun.getComboData(id);
	   	   
	    }
	    var del=function(e, value, row, index){
	    	
		   	        var rows=[row];
					if(rows.length==0){
						window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
						return;
					}
			    	var cb=function(){
			    		fun.delDev(rows,id);
			    	}
			    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb);    
		   	     
	    	
	    }
	    var remote=function(e, value, row, index){
	    	
		   	    	var rows=[row];
			        fun.remoteDev(rows);
			        
	    	
	    }
	    var restorePwd=function(e, value, row, index){
	    	
	    	var rows=[row];
	    	var cb=function(){
	    		fun.restoreDev(rows);
	    	}
	    	window.modal.confirm(window.lc.getValue("sureToRestorePwd")+'？',cb);   
	        
	    }
	    var set=function(e, value, row, index){
	    
	    	var rows=[row];
	        fun.createSetHtml(rows,id);
	    
	    }
	    var reboot=function(e, value, row, index){
	    	
	           var rows=[row];
	           fun.rebootDev(rows);
	    
	    }
	    var cfg_backup=function(e, value, row, index){
	    	
	        var rows=[row];
	        fun.createBackupCfgHtml(rows);
		   
	    }
	    var cfg_restore=function(e, value, row, index){
	    
	        var rows=[row];
	        fun.restoreCfg(pid,rows);
		   
	    }
	    var remote_t=function(e, value, row, index){
	    	window.open("http://localhost:9000/index.html");
	    }
	    var call=function(e, value, row, index){
			require(["dev-call-calc"], function(dpc) { 
				dpc.createCallCalc(pid,row.uuid,row.productSnStr);
			});
	    }
	    var per=function(e, value, row, index){
			require(["dev-per-calc-new"], function(dpc) { 
				dpc.createPerCalc(pid,row.uuid,row.productSnStr,row.domainUuid);
			});
	    }
	    var conf=function(e, value, row, index){
			require(["dev-conf"], function(conf) { 
				conf.createConf(pid,row);
			});
	    }
	    var cdr=function(e, value, row, index){
			require(["dag-cdr"], function(conf) { 
				conf.createList(pid,row);
			});
	    }
	    var port=function(e, value, row, index){
	    	fun.goToPortList(pid,row,"list");
	    }
	    var pmd=function(e, value, row, index){
			require(["pmd-port"], function(obj) { 
				obj.createView(pid,row);
			});
	    }
        function doReq(url,type){
        	$.ajax({ 
	        	type: "get", 
	        	async: false, 
	        	url: url, 
	        	dataType: "jsonp", 
	        	success: function(data){ 
	        		if(data.success && data.url){
	        			if(type=="web"){
	        				window.global.openChildWin(data.url);
	        			}else{
	        				window.open(data.url);
	        			}	        			
	        		}else{
	        			if(data.code==65535){
	        				window.tip.show_pk("danger",null,"DRP服务器未找到该设备,正在进行同步数据,请稍候再重新尝试");
	        			}else{
	        				window.tip.show_pk("danger",null,"设备未注册到DRP服务器");
	        			}		        			
	        		}
	        	}, 
	        	error: function(data){ 
	        		window.tip.show_pk("danger",null,window.lc.getValue("会话超时"));
	        	} 
	        }); 
        }
	    var rmw=function(e, value, row, index){
	        $.ajax({
	          url: "drpManager!getDrpUrl.action",
	          data: {domainUuid:row.domainUuid,productSn:row.productSns},
	          type:"get",
	          complete: function(data,str){
	            if(data.responseJSON && data.responseJSON.success){
	            	doReq(data.responseJSON.url,"web");
	            }else{
	              window.tip.show_pk("danger",null,window.lc.getValue("会话超时，请重新登录dmcld"));
	            }
	          }})		    	        
	    }
	    var rmt=function(e, value, row, index){
	        $.ajax({
	          url: "drpManager!getDrpTelUrl.action",
	          data: {domainUuid:row.domainUuid,productSn:row.productSns},
	          type:"get",
	          complete: function(data,str){
	            if(data.responseJSON && data.responseJSON.success){
// window.open(data.responseJSON.url);
	            	doReq(data.responseJSON.url,"telnet");
	            }else{
	              window.tip.show_pk("danger",null,window.lc.getValue("会话超时，请重新登录dmcld"));
	            }
	          }})
		   
	    }
	    var sipPortConf=function(e, value, row, index){
	    	require(["sip-port-list"], function(spl) {
				spl.createView(pid,row);
			});
	    	
	    }
	    var IPHistory=function(e,value,row,index){
	    	require(["dev-ip-list"],function(dil){
	    		dil.createView(pid,row);
	    		
	    	})
	    }
	    window.operateEvents4 = {
	        'click a[action=view]':view,
	        'click a[action=add]':add,
	        'click a[action=del]':del,
	        'click a[action=remote]':remote,
	        'click a[action=restorePwd]':restorePwd,
	        'click a[action=set]':set,
	        'click a[action=reboot]':reboot,
	        'click a[action=apply]':apply,
	        'click a[action=cfg_restore]':cfg_restore,
	        'click a[action=cfg_backup]':cfg_backup,
	        'click a[action=remote_t]':remote_t,
	        'click a[action=call]':call,
	        'click a[action=per]':per,
	        'click a[action=port]':port,
	        'click a[action=cdr]':cdr,
	        'click a[action=pmd]':pmd,
	        'click a[action=rmw]':rmw,
	        'click a[action=rmt]':rmt,
	        'click a[action=sipPortConf]':sipPortConf,
	        'click a[action=IPHistory]':IPHistory,
	        
	    };
  }
  function getColumn(id,name){
	  var cols=$("#"+id).bootstrapTable("getOptions").columns;
	  if(!cols){
		  return null;
	  }
	  var ret=null;
	  for(var i=0;i<cols.length;i++){
		  var col=cols[i];
		  if(col.field==name){
			  ret=col;
			  break;
		  }
	  }
	  return ret;
  }
  function getVisibleColumns(id){
	  var cols=$("#"+id).bootstrapTable("getOptions").columns;
	  if(!cols){
		  return null;
	  }
	  var ret="";
	  var paramsColumns={};
	  for(var i=0;i<cols.length;i++){
		  var col=cols[i];
		  if(col.visible){
			  /*
				 * if(ret!=""){ ret+=","; } ret+=col.field;
				 */
			  paramsColumns[col.field]=1
		  }else{
			  paramsColumns[col.field]=0;
		  }
	  }
	  paramsColumns["userUuid"]=window.user.uuid;
	  paramsColumns["domainUuid"]=window.global.getDomainUuid();
	
	  paramsColumns["roleId"]=window.user.roleId;
	  return paramsColumns;
  }
  /*
	 * function showCol(id,name,vc){ if(vc.indexOf(name)>=0){ return; }
	 * $("#"+id).bootstrapTable("showColumn",name); } function
	 * hideCol(id,name,vc){ if(vc.indexOf(name)<0){ return; }
	 * $("#"+id).bootstrapTable("hideColumn",name); }
	 */
  function showCol(id,columnsList){
	
	  var cols=$("#"+id).bootstrapTable("getOptions").columns;
	 // var st=new Date().getTime();
	  
	  for(var i=1;i<cols.length;i++){
		  var col=cols[i];
	   if(columnsList[0][col.field]==1){
		   if(!col.visible){
		  $("#"+id).bootstrapTable("showColumn",col.field);
		   }
	   }else if(columnsList[0][col.field]==0){
		   if(col.visible){
		  $("#"+id).bootstrapTable("hideColumn",col.field);
		   }
	   }
     }
	  
	 // var st2=new Date().getTime() - st;
	 // alert(st2)
  }
  function changeColView(id){
	  var paramsColumns=getVisibleColumns(id);
	  $.ajax({
		  url:'columnsManager!updateColView.action',
		  type:'post',
		  data:paramsColumns,
		  complete:function(data){
		
		  
	  }
	  })
  }
  function doColView(id,upSearch){
	  
	  var paramsColumns=getVisibleColumns(id);
	     
	  $.ajax({
		  url:'columnsManager!getList.action',
		  type:'post',
		  data:paramsColumns,
		  complete:function(data){
		 if(data.responseJSON && data.responseJSON.columnsList){
			 showCol(id,data.responseJSON.columnsList);
		 } 
		  
	  }
	  })
	 
  }
function doRefresh(pid){
	var id=pid+"_child";
	$('#'+id).bootstrapTable("refresh");
}
  function createDevList2(pid,id,url,modelUuid,modelDomainUuid,pa){
       var params={}
       params.userUuid=window.user.uuid;
       params.domainUuid=window.user.domainUuid;
       params.view=1;
       params.sett=1;
       params.reboot=1;
       params.cfgBackup=1;
       params.cfgEstore=1;
       params.remote=1;
       params.port=1;
       params.restorePwd=1;
       params.calls=1;
       params.pmd=1;
       params.per=1;
       params.cdr=1;
       params.rmw=1;
       params.rmt=1;
       params.del=1;
       params.sipPortConf=1;
       params.ipHistory=1;
       $.ajax({
    	   url:"buttonManager!buttonList.action",
    	   type:"post",
           data:params,
           complete: function(data,str){
    	   if(data.responseJSON){
    		window.buttonList=data.responseJSON.buttonList; 
           	
           }
    	   
       }
       
       });
           
       
    pn=$("#"+pid);
    if(!pn){
      return;
    }
    var user=window.user;
    var domainUuid=window.global.getDomainUuid();
    var html='<div id="'+id+'-toolbar" class="btn-group my-btn-group" role="group" aria-label="...">'
    if(pid.indexOf("dev_calc")>=0 || pid.indexOf("devModel_list")>=0){
      html+='<button name="back" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("back")+'"><i class="fa fa-reply bigger-130"></i></button>'
    }
    if( pid.indexOf("devModel_list")>=0){
      html+='<button name="apply" type="button" class="btn btn-sm btn-info" title="'+window.lc.getValue("apply")+'"><i class="fa fa-mars-stroke-h bigger-130"></i>'+window.lc.getValue("apply")+'</button>'
    }else{
// if(domainUuid){
// html+=''
          html+='<button id="'+id+'-add" class="btn btn-success btn-sm  " style="display:'+window.global.getClass("addDevice")+'" ><i class="fa fa-plus"></i>'+window.lc.getValue("add")+'</button>';
          html+='<button id="'+id+'-set" type="submit" class="btn btn-sm btn-success" style="display:'+window.global.getClass("modifyDevice")+'" title="'+window.lc.getValue("set")+'"><i class="fa fa-pencil"></i>'+window.lc.getValue("set")+'</button>';
          html+='<button id="'+id+'-del" type="submit" class="btn btn-sm btn-danger" style="display:'+window.global.getClass("deleteDevice")+'"  title="'+window.lc.getValue("del")+'"><i class="fa fa-remove"></i>'+window.lc.getValue("del")+'</button>';
          html+='<button id="'+id+'-upgrade" type="submit" class="btn btn-sm btn-info " style="display:'+window.global.getClass("upgradeDevice")+'"  title="'+window.lc.getValue("upgrade")+'"><i class="fa fa-external-link"></i>'+window.lc.getValue("upgrade")+'</button>';
// html+='<button id="'+id+'-cancel-upgrade" type="submit" class="btn btn-sm
// btn-info" title="'+window.lc.getValue("cancelUpgrade")+'"><i class="fa
// fa-repeat"></i>'+window.lc.getValue("cancelUpgrade")+'</button>';
          html+='<button id="'+id+'-import" type="submit" class="btn btn-sm btn-warning" style="display:'+window.global.getClass("addDevice")+'" title="'+window.lc.getValue("impt")+'"><i class="fa fa-upload"></i>'+window.lc.getValue("impt")+'</button>';
          if(window.extra.predefineConfig=="on"){
          html+='<button id="'+id+'-setDev" type="submit" class="btn btn-sm btn-success" style="display:'+window.global.getClass("modifyDevice")+'" title="'+window.lc.getValue("preConfig")+'"><i class="fa fa-pencil"></i>'+window.lc.getValue("preConfig")+'</button>';
     
          }// +'<button id="'+id+'-reboot" type="submit" class="btn
			// btn-link">Reboot</button>'
// +'<button id="'+id+'-restore-pwd" type="submit" class="btn
// btn-link">RestorePwd</button>'
          if(window.roleType.isSuper(window.user.roleId)){

          html+='<button id="'+id+'-dbo" type="submit" class="btn btn-sm btn-info" title="DBO"><i class="fa fa-toggle-on"></i>DBO</button>'
          };
          
          html+='<button id="'+id+'-configuration" type="submit" class="btn btn-sm btn-warning" style="display:'+window.global.getClass("modifyDevice")+'" title="'+window.lc.getValue("configuration")+'"><i class="fa fa-pencil"></i>'+window.lc.getValue("configuration")+'</button>';
          
        	 // html+='<button id="'+id+'-dbo" type="submit" class="btn
				// btn-sm btn-info" title="DBO"><i class="fa
				// fa-toggle-on"></i>DBO</button>';
          }
      	if(window.extra.reportSwitch=="on" && window.roleType.isSuper(window.user.roleId)){
      		html+='<button id="'+id+'-report" type="submit" class="btn btn-sm btn-info" title="'+window.lc.getValue("reportSwitch")+'"><i class="fa fa-toggle-on"></i>'+window.lc.getValue("reportSwitch")+'</button>';
    	}

// html+='<button id="'+id+'-backup-cfg" type="submit" class="btn btn-sm
// btn-info" title="配置备份"><i class="fa fa-cloud-upload
// bigger-130"></i>&nbsp;配置备份</button>'
// html+='<button id="'+id+'-restore-cfg" type="submit" class="btn btn-sm
// btn-info" title="配置恢复"><i class="fa fa-cloud-download
// bigger-130"></i>&nbsp;配置恢复</button>'
// }

      	 // html+='<button id="'+id+'-columns" type="submit" class="btn
			// btn-sm btn-info" title="DBO"><i class="fa
			// fa-toggle-on"></i>'+window.lc.getValue("setColumns")+'</button>'
// html+='<button id="'+id+'-backup-cfg" type="submit" class="btn btn-sm
// btn-info" title="配置备份"><i class="fa fa-cloud-upload
// bigger-130"></i>&nbsp;配置备份</button>'
// html+='<button id="'+id+'-restore-cfg" type="submit" class="btn btn-sm
// btn-info" title="配置恢复"><i class="fa fa-cloud-download
// bigger-130"></i>&nbsp;配置恢复</button>'
// }


// html+='<button id="'+id+'-remote" type="submit" class="btn
// btn-link">Remote</button>'
   // }
    html+='</div>'
    html+='<table id='+id+'></table>';
    pn.html("");
    pn.append(html);
  /*
	 * var btns = document.getElementsByTagName("button"); for (var i=0;i<btns.length;i++){
	 * 
	 * alert($('#'+btns[i].id).attr("attr")) }
	 */
    var dv=true;
    if( pid.indexOf("devModel_list")>=0){
    	dv=false;
    }
    createColEvents(pid,id,modelUuid,modelDomainUuid);
    var vb=true;
    if( pid.indexOf("devModel_list")>=0){
    	vb=false;
    }
    var sys=null;
    var reportVisible=false;
	if(pid.indexOf("devModel_list")<0 && window.extra.reportSwitch=="on" && window.roleType.isSuper(window.user.roleId)){
		reportVisible=true;
	}
    $('#'+id).bootstrapTable({
      method: 'get',
      url: url,
      cache: false,
// height: 400,
      responseHandler:function(res){
    	var obj={rows:[],total:0};
    	if(pid.indexOf("devModel_list")>=0){
	        if(res && res.neList){
	          obj["rows"]=res.neList;
	          obj.total=res["total"];
	          return obj;
	        }
    	}else{
    		if(res && res.sys){
    			sys=res.sys;
    		}
	        if(res && res.devList){	          
	          obj["rows"]=res.devList;
	          obj.total=res["maxTotal"];
	          return obj;
	        }	       
    	}
        return obj;
      },
      queryParams:function(p){
    	// 判断是否批量配置模板跳转过来时，不同的操作
        if(!modelDomainUuid){
        	sys=null;
        	var pa=window.devList.params;
        	if(pid.indexOf("dev_list")>=0){
        		pa=null;
        	}
            var params={};
            if(pa){
            	params=pa; 
            }
            console.log(p)
          	params.mainSearch=$.trim($('#dev_tag').val());
            
        	params.upSearch=sch.getSchPara();
        	doColView(id,params.upSearch);
            params["limit"]=p.limit;
            params["start"]=p.offset;
            if(p.search){
            	params["sip"]=p.search;
            }
            if(p.sort && p.sort=="lastRegTime"){
            	params["order"]="last_reg_time "+p.order;
            }
            if(p.sort&&p.sort=="alias"){
              params["order"]="alias "+p.order;
            }
            if(pid=="dev_list")
            window.global.getTreePara(params);
            return params;
        }else{
          var params={};
          window.global.getTreePara(params);
          return params;
        }
      },
      striped: true,
      toolbar:"#"+id+"-toolbar",
// toolbarAlign:'right',
      pagination: true,
      pageSize: 10,
// pageNumber:1,
      sidePagination: "server",
// pageList: [10,25],
      search: true,
      searchOnEnterKey:true,
// searchText:"Sip Account",
      showColumns: true,
      showRefresh: true,
      sortOrder: "asc",
      queryParamsType:'limit',
      sidePagination: "server",
      showToggle:true,
      smartDisplay:true,
      minimumCountColumns: 2,
      clickToSelect: true,
		detailView:dv,
		detailFormatter:function(index, row) {
    	  var id=pid+"_row_"+index;
    	  var html='<div id="'+id+'" style="width:100%;">';
    	  html+=fun.getLoadHtml();
    	  html+='</div>';
    	  return html;
		},
      columns: [{
        field: 'state',
        checkbox: true,
        cardVisible:false
      },{

		field: 'uuid',
		title: 'uuid',
		align: 'center',
		valign: 'middle',
// sortable: true,
		visible:false
      },{

          field: 'domainName',
          title: window.lc.getValue("domain"),
          align: 'left',
          valign: 'middle',
          visible:window.global.getDomainUuid()?false:true// 超级用户可见
     },{
        field: 'alias',
        title: window.lc.getValue("devName"),
        align: 'left',
        valign: 'middle',
        clickToSelect: false,
        sortable: true,
      
    	cellStyle:function(value,row,index){
	  		return {
				    css: {"max-width": "110px","word-break":"break-all"}
				};
	  	}
      },{
          field: 'productSnStr',
          title: window.lc.getValue("productSn"),
          align: 'left',
          valign: 'middle',
// sortable: true,
// width:155,
          formatter:function(value,row,index){
    	  var alarmFlag=row.alarmFlag;
    	  var html='';
    	  if(alarmFlag){
    		  html+='<span class="my-blink" class="width20" style="position:relative;top:-2px;left:0px;">'+getAlarmLink(index,row,"ne")+'</span>'
// return '<span>'+html+value+'</span>'
    	  }
    	  return html+value;
        },
    	cellStyle:function(value,row,index){
    		return {
			    css: {/* "min-width": "155px" */}
			};
    	}
      },{
        field: 'productName',
        title: window.lc.getValue("productName"),
        align: 'left',
        valign: 'middle',
    	cellStyle:function(value,row,index){
	  		return {
				    css: {"max-width": "120px","word-break":"break-all"}
				};
	  	}
      }, {
        field: 'packageVersion',
        title: window.lc.getValue("version"),
        align: 'center',
        valign: 'middle',
// sortable: true,
		formatter:function(value,row,index){
			return window.format.getDisplayValue(null,null,value);
		}
      },{
        field: 'runStatus',
        title: window.lc.getValue("runStatus"),
        align: 'center',
        valign: 'middle',
// sortable: true,
        formatter:function(value,row,index){
    	  return window.lc.getRunStatus("runStatus",value);
        }
      },{
        field: 'lastRegTime',
        title: window.lc.getValue("regTime"),
        align: 'center',
        valign: 'middle',
        clickToSelect: false,
        sortable: true,
        formatter:function(value,row,index){
    	  	var ret="-";
	  		if(value){
	  			ret=window.format.timeStaticFormat(value);
	  			var index=ret.indexOf(" ");
	  			if(index>=0){
	  				ret=ret.replace(" ","<br>");
	  			}
	  		}
	  		return ret;
     	},
      	cellStyle:function(value,row,index){
      		return {
  			    css: {"max-width": "70px"}
  			};
      	}
      },{
          field: 'rmRunStatus',
          title: window.lc.getValue("rmRunStatus"),
          align: 'center',
          valign: 'middle',
          visible:false,
// sortable: true,
          formatter:function(value,row,index){
            return window.lc.getRunStatus("runStatus",value);
          }
        },{
        field: 'rmPackageVersion',
        title: window.lc.getValue("version"),
        align: 'center',
        valign: 'middle',


        clickToSelect: false,

        visible:false
      },{
          field: 'rmProductName',
          title: window.lc.getValue("productName"),
          align: 'center',
          valign: 'middle',
          visible:false
        },{
          field: 'rmLastRegTime',
          title: window.lc.getValue("rmLastRegTime"),
          align: 'center',
          valign: 'middle',
          visible:false,
          clickToSelect: false,
          formatter:function(value,row,index){
	    	  	var ret="-";
		  		if(value){
		  			ret=window.format.timeStaticFormat(value);
		  			var index=ret.indexOf(" ");
		  			if(index>=0){
		  				ret=ret.replace(" ","<br>");
		  			}
		  		}
		  		return ret;
	     	},
	      	cellStyle:function(value,row,index){
	      		return {
	  			    css: {"max-width": "70px"}
	  			};
	      	}
        },{
          field: 'adminStatus',
          title: window.lc.getValue("adminStatus"),
          align: 'center',
          valign: 'middle',
          clickToSelect: false,
          visible:false,
          formatter:function(value,row,index){
    	  	return window.lc.getValue("adminStatus",value);
	       }
      },{
          field: 'outerIpAddr',
          title: window.lc.getValue("outIp"),
          align: 'center',
          valign: 'middle',
          clickToSelect: false,
          visible:false
       },{
           field: 'upgradeType',
           title: window.lc.getValue("upgradeType"),
           align: 'center',
           valign: 'middle',
           clickToSelect: false,
           visible:false,
           formatter:function(value,row,index){
     	  	return window.lc.getValue("upgradeType",value);
 	       }
        },{
            field: 'reportSwitch',
            title: window.lc.getValue("reportSwitch"),
            align: 'center',
            valign: 'middle',
            clickToSelect: false,
            visible:reportVisible,
            formatter:function(value,row,index){
        		return window.lc.getSwitch(value);
  	       }
         },{
          field: 'dboStatus',
          title: window.lc.getValue("dboSwitch"),
          align: 'center',
          valign: 'middle',
          clickToSelect: false,
          visible:false,
          formatter:function(value,row,index){
        	 return window.lc.getSwitch(value);
	       }
        },{
          field: '',
          title: window.lc.getValue("operate"),
          align: 'left',
          valign: 'middle',
// width:160,
// sortable: true,
          clickToSelect: true,
          visible:vb,
	      	cellStyle:function(value,row,index){
	    		return {
				    css: {"min-width": "160px"}
				};
	    	},
          formatter:function(value,row,index){
			var domainUuid=row["domainUuid"];
			var productId=row["productId"];
			var html='<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'
				var view='<a action="view" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("view")+'">'
					+'<i class="fa fa-search-plus bigger-130"></i>'
					+'</a>';
	    		var del='<a action="del"  class="red tooltip-error" style="display:'+window.global.getClass("deleteDevice")+'" data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("del")+'">'
				+'<i class="fa fa-remove bigger-130"></i>'
				+'</a>';
				var set='<a action="set" class="green tooltip-success" style="display:'+window.global.getClass(" modifyDevice")+'" data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("set")+'">'
				+'<i class="fa fa-pencil bigger-130"></i>'
				+'</a>';
					var cfg_backup='<a action="cfg_backup" style="display:'+window.global.getClass(" backupDeviceCfg")+'" class="word-warning tooltip-warning"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("cfgBackup")+'">'
					+'<i class="fa fa-cloud-upload bigger-130"></i>'
					+'</a>'
					var cfg_restore='<a action="cfg_restore" style="display:'+window.global.getClass("restoreDevcieCfg")+'" class="word-warning tooltip-warning"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("cfgRestore")+'">'
					+'<i class="fa fa-cloud-download bigger-130"></i>'
					+'</a>';
				var reboot='<a action="reboot" style="display:'+window.global.getClass("restartDevice")+'" class="word-warning tooltip-warning"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("restart")+'">'
				+'<i class="fa fa-spinner bigger-130"></i>'
				+'</a>';
				var restorePwd='<a action="restorePwd" style="display:'+window.global.getClass("resetDevicePassword")+'" class="word-warning tooltip-warning"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("resetPwd")+'">'
				+'<i class="fa fa-key bigger-130"></i>'
				+'</a>';
				var remote='<a action="remote" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("remoteWeb")+'">'
				+'<i class="fa fa-arrow-circle-right bigger-130"></i>'
				+'</a>';
				var call='<a action="call" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("callCalc")+'">'
				+'<i class="fa fa-phone bigger-130"></i>'
				+'</a>';
				var per='<a action="per" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("perCalc")+'">'
				+'<i class="fa fa-line-chart bigger-130"></i>'
				+'</a>';
				var conf='<a action="conf" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("confList")+'">'
				+'<i class="fa fa-file-o bigger-130"></i>'
				+'</a>';
				var port='<a action="port" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("port")+'">'
					+'<i class="fa fa-product-hunt bigger-130"></i>'
					+'</a>';
				var pmd='<a action="pmd" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("portCalc")+'">'
				+'<i class="fa fa-list-ul bigger-130"></i>'
				+'</a>';
				var cdr='<a action="cdr" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="CDR">'
				+'<i class="fa fa-registered bigger-130"></i>'
				+'</a>';
				var rmw='<a action="rmw" class="blue tooltip-info" style="display:'+window.global.getClass("drpRemoteWebUser")+'" data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("drpRemoteWeb")+'">'
					+'<i class="fa fa-wordpress bigger-130"></i>'
					+'</a>';
				var rmt='<a action="rmt" class="blue tooltip-info"  style="display:'+window.global.getClass("drpRemoteTelnet")+'" data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("drpRemoteTel")+'">'
				+'<i class="fa fa-tumblr-square bigger-130"></i>'
				+'</a>';				
				var sipPortConf='<a action="sipPortConf" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("sipPortConf")+'">'
				+'<i class="fa fa-skype bigger-130"></i>'
				+'</a>';
				var IPHistory='<a action="IPHistory" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("ipHistory")+'">'
				+'<i class="fa fa-rub bigger-130"></i>'
				+'</a>';
				var pass_role=roleType.isDomainAdmin(window.user.roleId)||roleType.isSuper(window.user.roleId);
				if(window.buttonList==undefined){
					window.buttonList=new Array();
					window.buttonList[0]={calls: 1,cdr: 1,cfgBackup: 1,cfgEstore: 1,del: 1,per: 1,pmd: 1,port: 1,reboot: 1,remote: 1,restorePwd: 1,rmt: 1,rmw: 1,sett: 1,time: null,userUuid: 1,uuid: 87,view: 1,ipHistory:1,sipPortConf:1}
				}
				var buttonList=window.buttonList[0];
				if(!devType.isUc(row.productId)){
				  if(buttonList.view==1){
					  html+=view;
				  }
				  // 删除设备
				  if(buttonList.del==1){
					  if(pass_role||window.global.getClass("deleteDevice")=='inline-block'){
					  html+=del;
					  }
				  }
				  // 设置设备
				  if(buttonList.sett==1){
					  if(pass_role||window.global.getClass("modifyDevice")=='inline-block'){
					  html+=set;
					  }
				  }
				  
				  if(buttonList.cfgBackup==1){
					  if(pass_role||window.global.getClass("backupDeviceCfg")=='inline-block'){
					  html+=cfg_backup;
					  }
				  }
				  if(buttonList.cfgEstore==1){
					  if(pass_role||window.global.getClass("restoreDevcieCfg")=='inline-block'){
					  html+=cfg_restore;
					  }
				  }
				  if(buttonList.reboot==1){
					  if(pass_role||window.global.getClass("restartDevice")=='inline-block'){
					  html+=reboot;
					  }
				  } 
				  if(buttonList.restorePwd==1){
					  if(pass_role||window.global.getClass("resetDevicePassword")=='inline-block'){
					  html+=restorePwd;
					  }
				  } 
				  if(buttonList.remote==1){
					  if(pass_role||window.global.getClass("remoteWebAdmin")=='inline-block'){
					  html+=remote;
					  }
				  }
				  if(buttonList.calls==1){
					  html+=call;
				  }
				  if(buttonList.per==1){
					  html+=per;
				  }
				  if(buttonList.port==1){
					  html+=port;
				  }
				  if(buttonList.pmd==1){
					  html+=pmd;
				  }
				
				// html+=view+del+set+cfg_backup+cfg_restore+reboot+restorePwd+remote+call+per+port+pmd;
				if(devType.isDag(row.productId)){
					 if(buttonList.cdr==1){
						  html+=cdr;
					  }
					
				}
				if(sys){
					 if(buttonList.rmw==1){
						 if(pass_role||window.global.getClass("drpRemoteWebAdmin")=='inline-block'||window.global.getClass("drpRemoteWebUser")=='inline-block'||window.global.getClass("drpRemoteWebGuest")=='inline-block'){
						  html+=rmw;
						 }
					  }
					 if(buttonList.rmt==1){
						 if(pass_role||window.global.getClass("drpRemoteTelnet")=='inline-block'){
						  html+=rmt;
						 }
					  }
					
				} 
			} else if(devType.isUc(row.productId)){
					 if(buttonList.del==1){
						 if(pass_role||window.global.getClass("deleteDevice")=='inline-block'){
							  html+=del;
							  }
					  }
					 if(buttonList.rmw==1){
						 if(pass_role||window.global.getClass("drpRemoteWebAdmin")=='inline-block'||window.global.getClass("drpRemoteWebUser")=='inline-block'||window.global.getClass("drpRemoteWebGuest")=='inline-block'){
							  html+=rmw;
							 }
					  }
					 if(buttonList.rmt==1){
						 if(pass_role||window.global.getClass("drpRemoteTelnet")=='inline-block'){
							  html+=rmt;
							 }
					  }
					 if(buttonList.sett==1){
						 if(pass_role||window.global.getClass("modifyDevice")=='inline-block'){
							  html+=set;
							  }
					  }
					
				}
				if(window.extra.predefineConfig=="on"){
					if(buttonList.sipPortConf==1){
				    html+=sipPortConf;
					}
				
				}
				if(buttonList.ipHistory==1){
				  html+=IPHistory;
				}
				html+='</div>';
				var tmp='<div class="visible-xs visible-sm hidden-md hidden-lg">'
					  +'<div class="inline position-relative">'
					    +'<button class="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown">'
					      +'<i class="fa fa-cog icon-only bigger-110"></i>'
					    +'</button>'
					    +'<ul class="dropdown-menu dropdown-only-icon  pull-right dropdown-caret dropdown-close">'
					    if(!devType.isUc(row.productId)){
					    	if(buttonList.view==1){
					    		tmp+='<li>'+view+'</li>'
							  }
							  if(buttonList.del==1){
								  if(pass_role||window.global.getClass("deleteDevice")=='inline-block'){
								  tmp+='<li>'+del+'</li>'
								  }
							  }
							  if(buttonList.sett==1){
								  if(pass_role||window.global.getClass("modifyDevice")=='inline-block'){
								  tmp+='<li>'+set+'</li>'
								  }
							  }
							  if(buttonList.cfgBackup==1){
								  if(pass_role||window.global.getClass("backupDeviceCfg")=='inline-block'){
								  tmp+='<li>'+cfg_backup+'</li>'
								  }
							  }
							  if(buttonList.cfgEstore==1){
								  if(pass_role||window.global.getClass("restoreDevcieCfg")=='inline-block'){
								  tmp+='<li>'+cfg_restore+'</li>'
								  }
							  }
							  if(buttonList.reboot==1){
								  if(pass_role||window.global.getClass("restartDevice")=='inline-block'){
								  tmp+='<li>'+reboot+'</li>'
								  }
							  } 
							  if(buttonList.restorePwd==1){
								  if(pass_role||window.global.getClass("resetDevicePassword")=='inline-block'){
								  tmp+='<li>'+restorePwd+'</li>'
								  }
							  } 
							  if(buttonList.remote==1){
								  if(pass_role||window.global.getClass("remoteWebAdmin")=='inline-block'){
								  tmp+='<li>'+remote+'</li>'
								  }
							  }
							  if(buttonList.calls==1){
								  tmp+='<li>'+call+'</li>'
							  }
							  if(buttonList.per==1){
								  tmp+='<li>'+per+'</li>'
							  }
							  if(buttonList.port==1){
								  tmp+='<li>'+port+'</li>'
							  }
							  if(buttonList.pmd==1){
								  tmp+='<li>'+pmd+'</li>';
							  }
// +'<li>'+conf+'</li>'
						if(devType.isDag(row.productId)){
							 if(buttonList.pmd==1){
								 tmp+='<li>'+cdr+'</li>';
							  }
						}
						if(sys){
							 
							if(buttonList.rmw==1){
								 if(pass_role||window.global.getClass("drpRemoteWebAdmin")=='inline-block'||window.global.getClass("drpRemoteWebUser")=='inline-block'||window.global.getClass("drpRemoteWebGuest")=='inline-block'){
							    tmp+='<li>'+rmw+'</li>';
								 }
							 } 
						    if(buttonList.rmt==1){
						    	if(pass_role||window.global.getClass("drpRemoteTelnet")=='inline-block'){
						    		tmp+='<li>'+rmt+'</li>';
						    	}
								  }
					  }
	    	        } else  if(devType.isUc(row.productId)){
	    	        	if(buttonList.del==1){
							  if(pass_role||window.global.getClass("deleteDevice")=='inline-block'){
							  tmp+='<li>'+del+'</li>'
							  }
						  }
						  if(buttonList.sett==1){
							  if(pass_role||window.global.getClass("modifyDevice")=='inline-block'){
							  tmp+='<li>'+set+'</li>'
							  }
						  }
						  if(buttonList.rmw==1){
							  if(pass_role||window.global.getClass("drpRemoteWebAdmin")=='inline-block'||window.global.getClass("drpRemoteWebUser")=='inline-block'||window.global.getClass("drpRemoteWebGuest")=='inline-block'){
						    tmp+='<li>'+rmw+'</li>';
							  }
						 } 
					    if(buttonList.rmt==1){
					    	if(pass_role||window.global.getClass("drpRemoteTelnet")=='inline-block'){
						      tmp+='<li>'+rmt+'</li>';
					    	}
						}
					}
				if(window.extra.predefineConfig=="on"){
					if(buttonList.sipPortConf==1){
				        tmp+='<li>'+sipPortConf+'</li>';
					}
				}
				if(buttonList.ipHistory==1){
				tmp+= '<li>'+IPHistory+'</li>';
				}
					    tmp+='</ul>'
					  +'</div>'
					+'</div>';
				tmp=tmp.replaceAll('data-placement="bottom"','data-placement="left"');
				html+=tmp;
            // 当批量配置模板引用时，隐藏设备操作按钮
            if(pid.indexOf("devModel_list") >=0){
              html = '';
            }
            
	    	  return html;
          },
          events:operateEvents4
      }]
    });

    doColView(id,sch.getSchPara());
    window.list.changeForAce(pid);
// window.history.pushState({page: "abcd",pid:pid}, "title 3", "#dev_list");
    $("#"+pid+" button[name=back]").bind('click',function(){
      if(pid.indexOf("dev_calc")>=0){
			require(["dev-calc-group"], function(chart) {
				chart.createCalc("dev_calc");
			});
      }else if(pid.indexOf("devModel_list")>=0){
        require(["devModel-list"], function(dml) {
          dml.createDevModList("devModel_list", "devModel_list_child", "batchManager!findBatchList.action");
        });
      }
    });
    $("#"+pid+" button[name=apply]").bind('click',function(){
    	var rows=$('#'+id).bootstrapTable('getSelections');
    	fun.applyToDev(pid,rows,modelUuid,modelDomainUuid);
    });
    $("#"+id+"-add").bind('click',function(){
	
	 
		 fun.getComboData(id);
	    
      
    });
    $("#"+id+"-del").bind('click',function(){
    	
    		 var rows=$('#'+id).bootstrapTable('getSelections');
    			if(rows.length==0){
    				window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"));
    				return;
    			}
    	    	var cb=function(){
    	    		fun.delDev(rows,id);
    	    	}
    	    	window.modal.confirm(window.lc.getValue("sureToDel")+'？',cb);
    	  
           	     
    });
    $("#"+id+"-set").bind('click',function(){
    	 
    		 var rows=$('#'+id).bootstrapTable('getSelections');
    	      fun.createSetHtml(rows,id);
    	 
     
    });
    $("#"+id+"-upgrade").bind('click',function(){
    	
         var rows=$('#'+id).bootstrapTable('getSelections');
         fun.upgradeDev(rows);
   	      
    });
    $("#"+id+"-cancel-upgrade").bind('click',function(){
        var rows=$('#'+id).bootstrapTable('getSelections');
        fun.cancelUpgradeDev(pid,id,rows);
      });
    $("#"+id+"-setDev").bind('click',function(){
    
        var rows=$('#'+id).bootstrapTable('getSelections');
        if(rows.length==0){
        	window.tip.show_pk("warning",null,window.lc.getValue("youNotSel"))
        	return;
        }
        if(rows.length>1){
        var domainUuid=rows[0].domainUuid;
        for(var i=1;i<rows.length;i++){
        	if(domainUuid!=rows[i].domainUuid){
        		window.tip.show_pk("warning",null,window.lc.getValue("selSameDomain"))
        		return;
        	}
        }
        }
       
        fun.configDev(pid,id,rows);
      });
    
// $("#"+id+"-restore-cfg").bind('click',function(){
// var rows=$('#'+id).bootstrapTable('getSelections');
// fun.restoreCfg(rows);
// });
// $("#"+id+"-backup-cfg").bind('click',function(){
// var rows=$('#'+id).bootstrapTable('getSelections');
// fun.backupCfg(rows);
// fun.createBackupCfgHtml(rows);
// });
    
    $("#"+id+"-dbo").bind('click',function(){
    	
   		 var rows=$('#'+id).bootstrapTable('getSelections');
         fun.setDbo(pid,id,rows);
   	    
       
      });
    $("#"+id+"-report").bind('click',function(){
    	
      		 var rows=$('#'+id).bootstrapTable('getSelections');
             fun.setReport(pid,id,rows);
      	    
       
      });
    $("#"+id+"-import").bind('click',function(){
    	
     		var rows=$('#'+id).bootstrapTable('getSelections');
     		fun.importNe(pid,id);
     	    
       
      });    
    $("#"+id+"-configuration").bind('click',function(){
    	
    		  fun.createConfigHtml();
    	  
    	
      });   

    // post-body.bs.table,expand-row.bs.table

   
    $("#"+id+"-columns").bind('click',function(){
    	
    	columns.createColumnsHtml();
	  
	
     });   
    $(".dropdown-menu input[type=checkbox]").change(function(){
    	changeColView(id);
    	
    })
    // post-body.bs.table,expand-row.bs.table

    $('#'+pid).find("input[placeholder]").attr("placeholder",window.lc.getValue("sipAccount"));
    $('#'+id).on('expand-row.bs.table', function (e, index, row, detail) {
    	var rid=pid+"_row_"+index;
    	var node=$("#"+rid);
    	var date1=new Date();    // 起始时间
		var getDevCb=function(status,dev){
			node.find("div[name=load]").css("display","none");
    		if(status=="success"){		    			    		
				node.append(getHtml(pid,index,dev));
				expandRow(index,dev);
    		}else{
    			node.append("<font color=red>查询失败或者超时!</font>");
    		}		
		}
    	var getDev=$.ajax({ 
			url: "dmManager!getDev.action",
			data:{productSn:row.productSnStr,neUuid:row.uuid,dstDomainUuid:row.domainUuid},
			type:"POST",
			timeout:15 * 1000,
			complete: function(data,str){
				if(data.responseJSON && data.responseJSON.devList && data.responseJSON.devList.length){
					getDevCb(str,data.responseJSON.devList[0]);
				}else{
					getDevCb("error",null);
				}				
		}});
    })
    function expandRow(index,row){
    	var cid=pid+"_chart_"+index;
    	var cid2=pid+"_chart_2_"+index;
    	$("#"+cid).html("");
    	if(window.format.isMtg(row.productId)){
	    	$("#"+cid2).html("");
	    	createDevChart(cid2,index,row);
    	}
    	var list=row.pnl;
    	// 因为是图形显示,且没有时间，必须反向
    	var acd=[],asr=[];
    	for(var i=list.length-1;i>=0;i--){
    		var item=list[i];
    		acd.push(item.riseAcd);
    		asr.push(item.riseAsr);
    	}
    	if(!list.length){
    		acd=[0,0,0,0,0];
    		asr=[0,0,0,0,0];
    	}
    	createLineChart(cid+"_acd","acd("+window.lc.getValue("secs")+")",acd);
    	createLineChart(cid+"_asr","asr(%)",asr);
    	$("#"+id+" a.dev-search").bind("click",function(){
    		alarmClick(pid,$(this));
    	})
    }
    $('#'+id).on('post-body.bs.table', function () {
    	$("#"+id+" a.dev-search").bind("click",function(){
    		alarmClick(pid,$(this));
    	})
    	$('#'+id+' [data-rel=tooltip]').tooltip();
    	window.list.changeForAce(pid,id,600);
    })
	$(window).resize(function () {
		window.list.changeView(pid,id,600);
	});
  }
  function alarmClick(pid,n){
	var type=n.attr("type");
	var pa=window.devAlarm.params;
	pa.alarmType=type;
	console.log("---------------------------------------"+type);
	pa.neUuid=n.attr("neUuid");
	require(["dev-alarm"], function(da) { 
		da.createAlarmList2(pid,"androidManager!getDevAlarm.action");
	});	
  }
  function getHtml(pid,index,row){
		var html="";
		var obj=row;
		var cid=pid+"_chart_"+index;
		var cid1=pid+"_chart_2_"+index;
		// margin-left
		var ml=30,mt=50,ml2=240;
		var mtgp=row.mtgp;
		var regTime=obj.lastRegTime?window.format.timeStaticFormat(obj.lastRegTime):"-";
		var createTime=obj.lastRegTime?window.format.timeStaticFormat(obj.createTime):"-";	
		html+='<div class="row alert alert-info" style="margin-right:0px;margin-left:0px;margin-bottom:10px;">';
		html+='<div class="col-md-4">'
// html+=window.lc.getValue("detailView")
		html+='</div>';
		var rmLastRegTime=obj.rmLastRegTime?window.format.timeStaticFormat(obj.rmLastRegTime):"-";
		var tmp='<div><span class="dc-label">'+window.lc.getValue("rmRunStatus")+'</span>&nbsp;<span class="dc-value" >'+window.lc.getRunStatus("runStatus",obj.rmRunStatus)+'</span></div>'
			+'<div><span class="dc-label">'+window.lc.getValue("rmLastRegTime")+'</span>&nbsp;<span class="dc-value" >'+rmLastRegTime+'</span></div>'
			+'<div><span class="dc-label">'+window.lc.getValue("resetReason")+'</span>&nbsp;<span class="dc-value" >'+window.lc.getResetReason(obj.resetReason)+'</span></div>';
		var outerIpAddr=row.outerIpAddr?row.outerIpAddr:"-";
		var innerIpAddr=row.innerIpAddr?row.innerIpAddr:"-";
		if(outerIpAddr.indexOf(":")>=0){
			outerIpAddr=outerIpAddr.substring(0,outerIpAddr.indexOf(":"));
		}
		if(innerIpAddr.indexOf(",")>=0){
			innerIpAddr=innerIpAddr.substring(0,innerIpAddr.indexOf(","));
		}
		if(window.format.isMtg(row.productId)){
			html+='<div class="col-md-4 visible-lg-block">'
				+'<span class="dc-label" style="text-align:center;margin-left:auto; margin-right:auto;width:100%;">'+window.lc.getValue("mtgThumbnail")+'</span>'
				+'</div>';
		}else{
			html+='<div class="col-md-4">'
				+'</div>';
		}
		html+='<div class="col-md-4 visible-lg-block">'
			+'<span class="dc-label" style="text-align:center;margin-left:auto; margin-right:auto;width:100%;">'+window.lc.getValue("callThumbnail")+'</span>'
			+'</div>';
		html+='<div class="col-md-4">'
// +'<div><span
// class="dc-label">'+window.lc.getValue("regFailCnt")+'</span>&nbsp;<span
// class="dc-value" >'+obj.regFailCount+'</span></div>'
		+'<div><span class="dc-label">'+window.lc.getValue("ipAddr")+'</span>&nbsp;<span class="dc-value" >'+outerIpAddr+'</span></div>'
		+'<div><span class="dc-label">'+window.lc.getValue("innerIpAddr")+'</span>&nbsp;<span class="dc-value" >'+innerIpAddr+'</span></div>'
		+'<div><span class="dc-label">'+window.lc.getValue("realAddr")+'</span>&nbsp;<span class="dc-value" >'+obj.realAddr+'</span></div>'
		+'<div><span class="dc-label">'+window.lc.getValue("operator")+'</span>&nbsp;<span class="dc-value" >'+obj.isp+'</span></div>'
		+'<div><span class="dc-label">'+window.lc.getValue("adminStatus")+'</span>&nbsp;<span class="dc-value" >'+window.lc.getValue("adminStatus",obj.adminStatus)+'</span></div>'
		+'<div><span class="dc-label">'+window.lc.getValue("upgradeType")+'</span>&nbsp;<span class="dc-value" >'+window.lc.getValue("upgradeType",obj.upgradeType)+'</span></div>'
		+'<div><span class="dc-label">'+window.lc.getValue("targetVer")+'</span>&nbsp;<span class="dc-value" >'+window.format.getDisplayValue(null,null,obj.targetSoftwareVer)+'</span></div>'
		+'<div><span class="dc-label">'+window.lc.getValue("createTime")+'</span>&nbsp;<span class="dc-value" >'+createTime+'</span></div>'
		+tmp
// +'<div><span
// class="dc-label">'+window.lc.getValue("desc")+'</span>&nbsp;<span
// class="dc-value"
// >'+window.format.getDisplayValue(null,null,obj.detailDesc)+'</span></div>'
		+'</div>';	
// +'<div class="col-md-3">'
// +'<div><span class="dc-title">&nbsp;</span>'
// +'</div>'

// +'</div>'
		if(window.format.isMtg(row.productId)){
		html+='<div class="col-md-4 visible-lg-block">'
			+'<div style="margin-left:'+ml+'px;">'+window.lc.getValue("portType")+'(<font color="green">'+window.lc.getValue("enableCnt")+'</font>/'+window.lc.getValue("total")+')</div>'
			+'<span style="margin-left:'+ml+'px;">E1(<font color="green">'+mtgp.e1OnlineCnt+'</font>/'+mtgp.e1TotalCnt+') PRI(<font color="green">'+mtgp.priOnlineCnt+'</font>/'+mtgp.priTotalCnt+') SS7(<font color="green">'+mtgp.ss7OnlineCnt+'</font>/'+mtgp.ss7TotalCnt+') </span><br>'
			+'<span style="margin-left:'+ml+'px;">SIP(<font color="green">'+mtgp.sipOnlineCnt+'</font>/'+mtgp.sipTotalCnt+') DSP(<font color="green">'+mtgp.dspOnlineCnt+'</font>/'+mtgp.dspTotalCnt+') LAN(<font color="green">'+mtgp.ethOnlineCnt+'</font>/'+mtgp.ethTotalCnt+')</span>'
			if(mtgp.pstnAlarm)
			html+='<div class="my-blink" style="position:absolute;margin-top:'+mt+'px;">'+getAlarmLink(index,row,"pstn")+'</div>'
			if(mtgp.sipAlarm)
			html+='<div class="my-blink" style="position:absolute;margin-top:'+mt+'px;margin-left:'+ml2+'px;">'+getAlarmLink(index,row,"sip")+'</div>'
			html+='<canvas id="'+cid1+'" ></canvas>'
			+'<div style="margin-left:'+ml+'px;margin-top:-15px;">'+window.lc.getValue("e1WorkStatusDesc")+'</div>'
			+'<div><span style="margin-left:'+ml+'px;"><font color="green"><i class="fa fa-circle"></i></font> '+window.lc.getValue("e1WorkStatus",2)+'</span>'
			+'<span>&nbsp;<font color="gray"><i class="fa fa-circle"></i></font> '+window.lc.getValue("e1WorkStatus",1)+'</span>'
			+'<span>&nbsp;<font color="red"><i class="fa fa-circle"></i></font> '+window.lc.getValue("e1WorkStatus",3)+'</span><br>'
			+'<span style="margin-left:'+ml+'px;"><font color="yellow"><i class="fa fa-circle"></i></font> '+window.lc.getValue("e1WorkStatus",4)+'</span>'
			+'<span>&nbsp;<font color="blue"><i class="fa fa-circle"></i></font> '+window.lc.getValue("e1WorkStatus",5)+'</span><br>'
			+'<span style="margin-left:'+ml+'px;"><font color="orange"><i class="fa fa-circle"></i></font> '+window.lc.getValue("e1WorkStatus",6)+'</span>'
			+'</div>'
			+'</div>';
		}else{
			html+='<div class="col-md-4"></div>'
		}
		if(window.format.isMtg(row.productId)){
		html+='<div class="col-md-4">'
		+'<div id="'+cid+'_acd" style="height:100px;width:100%"></div>'
		+'<div id="'+cid+'_asr" style="height:100px;width:100%;margin-top:10px;"></div>'
		+'</div>'
		+'</div>';
		}else{
			html+='<div class="col-md-4">'
				+'<div id="'+cid+'_acd" style="height:100px;width:100%"></div>'
				+'<div id="'+cid+'_asr" style="height:100px;width:100%;margin-top:10px;"></div>'
				+'</div>'
				+'</div>';
		}
		return html;
	}
  	function getAlarmLink(index,row,type){
  		return '<a neUuid="'+row.uuid+'" index="'+index+'"  type="'+type+'" class="red dev-search" title="'+window.lc.getValue("view")+'"><i class="fa fa-warning"></i></a>';
  	}
  	function createDevChart(id,index,row){
  		// 使用html5 canvas技术
		 var canvas=document.getElementById(id);    
	     var context2D =canvas.getContext("2d");      
	     context2D.fillStyle ="#9acfea";
	     var x=30,y=10,width=200,height=100,cnt=8,step=0;
	     context2D.fillRect(x,y, width, height);
	     context2D.fillStyle ="white";
	     
	     context2D.font = "18px Arial";
	     var size=window.global.getStrSize("MTG",context2D.font);
	     context2D.fillText('MTG',x+width/2-size.width,y+height/2+size.height/2);
	     
	     context2D.font = "14px Arial";
	     size=window.global.getStrSize("E1",context2D.font);
	     context2D.fillText('E1',x+width/2-size.width,y+height-5);
	     
	     context2D.save();
	     context2D.rotate(-Math.PI/2);
	     context2D.font = "14px Arial";
	     size=window.global.getStrSize("SIP",context2D.font);
	     context2D.fillText('SIP',-(y+height/2+size.width/2),x+width-size.height/2);
	     context2D.restore();
	     	     
	     context2D.font = "14px Arial";
	     console.log(context2D);
	     console.log(size);
	     context2D.save();
	     context2D.rotate(Math.PI/2);
	     size=window.global.getStrSize("PRI/SS7",context2D.font);
	     context2D.fillText('PRI/SS7',y+height/2-size.width/2,-x-5);
	     context2D.restore();
	     var e1list=row.mtgp.e1;
	     cnt=e1list.length;
	     for(var i=0;i<cnt;i++){
	    	 context2D.beginPath();
	    	 step=Math.round(i*width/(cnt-1));
	    	 var item=e1list[i];
	    	 var workState=item.workState;
	    	 if(workState==1){
	    		 context2D.strokeStyle ="gray";
			     context2D.fillStyle ="gray";
	    	 }else if(workState==2){
	    		 context2D.strokeStyle ="green";
			     context2D.fillStyle ="green";
	    	 }else if(workState==3){
	    		 context2D.strokeStyle ="red";
			     context2D.fillStyle ="red";
	    	 }else if(workState==4){
	    		 context2D.strokeStyle ="yellow";
			     context2D.fillStyle ="yellow";
	    	 }else if(workState==5){
	    		 context2D.strokeStyle ="blue";
			     context2D.fillStyle ="blue";
	    	 }else if(workState==6){
	    		 context2D.strokeStyle ="orange";
			     context2D.fillStyle ="orange";
	    	 }else{
	    		 context2D.strokeStyle ="gray";
			     context2D.fillStyle ="gray";
	    	 }

	         context2D.moveTo(x+step,y+height);
	         context2D.lineTo(x+step,y+height+20);
	         context2D.closePath();
	         context2D.stroke(); 
	     } 
  	}
	function createLineChart(id,nl,vl){
		var se=[];
// for(var i=0;i<nl.length;i++){
// var obj={
// name:nl[i],
// type:'line',
// stack: window.lc.getValue("total"),
//	            
// data:vl[i]
// };
// se.push(obj);
// }
		var obj={
				name:nl,
	            type:'line',
	            stack: window.lc.getValue("total"),	            
	            data:vl,
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top'
	                }
	            }
	        };
			se.push(obj);
			console.log(se)
// echarts.registerTheme("macarons",theme);
		var myChart = echarts.init(document.getElementById(id)); 

		option = {
			title: {
		        text: nl,
		        x: 'right',
		        textStyle:{
				    fontSize: 12,
				    fontWeight:'normal'
				}
			},
		    tooltip : {
		        trigger: 'axis',
                formatter: function (b,c) {
		    		var str="";
		    		for(var i=0;i<b.length;i++){
		            	var obj=b[i],val=obj.value;
		            	if(obj.value=="-" || !obj.value){
		            		obj.value="0";
		            	}
		            	if(!str){
		            		str+=obj.name;
		            	}
		            	str+="<br>"+obj.seriesName+" : "+obj.value;
		    		}

                    return str;
                }
		    },
		    grid: {
		        left: '10%',
		        right: '5%',
		        bottom: '5%',
		        top:'20%',
		        containLabel: true
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : ['','','','','']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
                    axisLabel : {
                        formatter: ''
                    }
		        }
		    ],
		    series : se
		};
			                           
		myChart.setOption(option);
		$(window).resize(function(){
			myChart.resize();    
		});
	}
	function getClass(str){
		if(window.operateNew[str]==0){
			alert(str)
			 
		 }
	}
  return {
    createDevList2:createDevList2,
    doRefresh:doRefresh,
   
  };
});


