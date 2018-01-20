Ext.define('app.view.monitor.group.sim.SimMonitorPanel',{
	extend:'Ext.panel.Panel',
	id:'simMonitorPanel',
	layout:'fit',
	hidden:true,
	border:false,
	treeName:'',
	getTreeName:function(){
		return this.treeName;
	},
	initComponent: function(){
		var pmdSimPanel = Ext.create('app.view.monitor.group.sim.SimPanel',{});
		var sim15Panel=Ext.create('app.view.monitor.group.sim.Sim15Panel',{
			id:"sim15Panel",
			gridId:"sim15Grid",
		});
		var sim24Panel=Ext.create('app.view.monitor.group.sim.Sim24Panel',{
			id:"sim24Panel",
			gridId:"sim24Grid",
		});
		var simCurPanel=Ext.create('app.view.monitor.group.sim.SimCurPanel',{
			id:"simCurPanel",
			gridId:"simCurGrid",
		});
		var simCdrPanel=Ext.create('app.view.monitor.group.sim.SimCdrPanel',{
			id:"simCdrPanel",
			gridId:"simCdrGrid",
		});
		var simSmsPanel=Ext.create('app.view.monitor.group.sim.SimSmsPanel',{
			id:'simSmsPanel',
			gridId:"simSmsGrid",
		});
		var simUssdPanel=Ext.create('app.view.monitor.group.sim.SimUssdPanel',{
			id:'simUssdPanel',
			gridId:"simUssdGrid",
		});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[pmdSimPanel,sim15Panel,sim24Panel,simCurPanel,
	       	       simSmsPanel,simUssdPanel,simCdrPanel],
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