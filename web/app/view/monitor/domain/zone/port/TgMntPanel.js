Ext.define('app.view.monitor.domain.zone.port.TgMntPanel',{
	extend:'Ext.panel.Panel',
//	id:'gwp15Panel',
	layout:'fit',
	hidden:false,
	border:false,
//	title:'Gwp 15 Min',
	flag:null,
	createItems:function(){
		if(!this.node && !this.peType){
			return;
		}
		var upper = this.node.toUpperCase();
		var arr = [];
		var flag = this.flag;
		var title = "";
		var tmp = "";
		if(flag.indexOf("15")>=0){
			title = ti15MinList;
			tmp = "15";
		}else if(flag.indexOf("24")>=0){
			title = ti24HourList;
			tmp = "24";
		}else{
			title = tiCurList;
			tmp = "cur";
		}
		var obj = Ext.create("app.view.monitor.domain.zone.port.TgMntGrid",{
			id:this.peType+'_'+this.node+"_grid"+"_"+tmp,
			flag:this.flag,
			title:title
		});
		arr.push(obj);
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:arr,
	       	tabPosition:'bottom',
	   	   	listeners:{			
				tabchange:function(tabPanel,newTab,oldTab,obj){
					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
				}
			}	       
		}];
		this.items[0].initTabNum = this.items[0].items.length;
	},
	initComponent: function(){
		this.createItems();
		this.callParent(arguments);	
	},
});