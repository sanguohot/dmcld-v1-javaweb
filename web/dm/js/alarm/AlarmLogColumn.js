define(["alarm-win"],function (win){
	function getColumn(isNeedOperate,select){
		var col=[{
			field: 'alarmSn',
			title: window.lc.getValue("sn"),
			align: 'center',
			valign: 'middle'
		}, {
			field: 'alarmLevel',
			title: window.lc.getValue("alarmLevel"),
			align: 'center',
			valign: 'middle',
			formatter:function(value,row,index){
	          var t=window.lc.getValue("alarmLevel",value);
	          var ret=t;
	          var cls="";
	          if(value==0){
	        	  cls="label label-danger";
	          }else if(value==1 || value==2 || value==3 || value==4){
	        	  cls="label label-warning";
	          }else{
	        	  cls="label label-info";
	          }
	          ret='<span class="'+cls+'">'+t+'</span>';
	          return ret;
	        }
		}, {
			field: 'reportTime',
			title: window.lc.getValue("time"),
			align: 'center',
			valign: 'middle',
	        formatter:function(value,row,index){
    	  		if(value){
    	  			return window.format.timeStaticFormat(value);
    	  		}
    	  		return "---";
	       	}
		},{
			field: 'alarmName',
			title: window.lc.getValue("alarmName"),
			align: 'center',
			valign: 'middle'
		},{
			field: 'alarmType',
			title: window.lc.getValue("alarmType"),
			align: 'center',
			valign: 'middle',
	        formatter:function(value,row,index){
				return window.lc.getValue("alarmType",value);
	       	}
		},{
			field: 'content',
			title: window.lc.getValue("content"),
			align: 'left',
			valign: 'middle',
			formatter:function(value,row,index){
				if(window.lc.isEn()){
					return row["objectDesc"]+":"+row["alarmDesc"];
				}
				return row["objectDesc"]+":"+row["alarmDescCn"];
			}
		}];
		if(isNeedOperate){
			col.push({
		          field: '',
		          title: window.lc.getValue("option"),
		          align: 'left',
		          valign: 'middle',
		          clickToSelect: true,
		          formatter:function(value,row,index){
				var pass_role=roleType.isDomainAdmin(window.user.roleId)||roleType.isSuper(window.user.roleId);
					var html='<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'
						var view='<a action="view" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("viewDev")+'">'
							+'<i class="fa fa-search-plus bigger-130"></i>'
							+'</a>';
						var remote='<a action="remote" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("remoteWeb")+'">'
						+'<i class="fa fa-arrow-circle-right bigger-130"></i>'
						+'</a>';
						var all='<a action="all" class="blue tooltip-info"  data-rel="tooltip" data-placement="bottom" data-original-title="'+window.lc.getValue("devAllAlarm")+'">'
						+'<i class="fa fa-list bigger-130"></i>'
						+'</a>';
						if(!row.neUuid){
							view="";
							remote="";
							all="";
						}
						if(pass_role||window.global.getClass("remoteWebAdmin")=="inline-block"){
							html+=remote;
							}
						html+=view+all;
						html+='</div>';
						var tmp='<div class="visible-xs visible-sm hidden-md hidden-lg">'
							  +'<div class="inline position-relative">'
							    +'<button class="btn btn-minier btn-primary dropdown-toggle" data-toggle="dropdown">'
							      +'<i class="fa fa-cog icon-only bigger-110"></i>'
							    +'</button>'
							    +'<ul class="dropdown-menu dropdown-only-icon  pull-right dropdown-caret dropdown-close">'
							      +'<li>'+view+'</li>'
							      if(pass_role||window.global.getClass("remoteWebAdmin")=="inline-block"){
							      +'<li>'+remote+'</li>'
							      }
							      +'<li>'+all+'</li>'
							    tmp+='</ul>'
							  +'</div>'
							+'</div>';
						tmp=tmp.replaceAll('data-placement="bottom"','data-placement="left"');
						html+=tmp;
		            
			    	  return html;
		          },
		          events:operateEvents
		      });
		}
		if(select){
			col.unshift({
		        field: 'state',
		        checkbox: true,
		        cardVisible:false
		    })
		}
		return col;
	}
    return {
    	getColumn:getColumn
    };
});


