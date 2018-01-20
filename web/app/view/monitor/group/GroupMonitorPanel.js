Ext.define('app.view.monitor.group.GroupMonitorPanel',{
	extend:'Ext.panel.Panel',
	id:'groupMonitorPanel',
	layout:'fit',
	hidden:true,
	border:false,
	treeName:'',
	getTreeName:function(){
		return this.treeName;
	},
	initComponent: function(){
		var group15Panel=Ext.create('app.view.monitor.group.Group15Panel',{});
		var group24Panel=Ext.create('app.view.monitor.group.Group24Panel',{});
		var groupCurPanel=Ext.create('app.view.monitor.group.GroupCurPanel',{
			id:'groupCurPanel',
			gridId:'groupCurGrid'
		});
		var groupCdrPanel=Ext.create('app.view.monitor.group.GroupCdrPanel',{});
		var groupSmsPanel=Ext.create('app.view.monitor.group.GroupSmsPanel',{});
		var groupUssdPanel=Ext.create('app.view.monitor.group.GroupUssdPanel',{});
		var simCurPanel=Ext.create('app.view.monitor.group.sim.SimCurPanel',{
			id:"grpSimCurPanel",
			gridId:"grpSimCurGrid",
		});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[group15Panel,group24Panel,groupCurPanel
	       	       ,groupSmsPanel,groupUssdPanel,groupCdrPanel
	       	       ,simCurPanel],
  	   	   	listeners:{			
  				tabchange:function(tabPanel,newTab,oldTab,obj){
  					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
  				}
  			}
	       
		}];
		this.items[0].initTabNum = this.items[0].items.length;
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});