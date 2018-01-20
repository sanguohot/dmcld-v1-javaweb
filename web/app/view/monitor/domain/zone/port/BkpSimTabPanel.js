Ext.define('app.view.monitor.domain.zone.port.BkpSimTabPanel',{
	extend:'Ext.panel.Panel',
	id:'bkpSimTabPanel',
	layout:'fit',
	hidden:true,
	border:false,
	treeName:'',
	getTreeName:function(){
		return this.treeName;
	},
	initComponent: function(){
		var pmdBkpPanel = Ext.create('app.view.monitor.domain.zone.port.BkpPanel',{});
		var sim15Panel=Ext.create('app.view.monitor.group.sim.Sim15Panel',{
			id:"bkpSim15Panel",
			gridId:"bkpSim15Grid",
		});
		var sim24Panel=Ext.create('app.view.monitor.group.sim.Sim24Panel',{
			id:"bkpSim24Panel",
			gridId:"bkpSim24Grid",
		});
		var simCurPanel=Ext.create('app.view.monitor.group.sim.SimCurPanel',{
			id:"bkpSimCurPanel",
			gridId:"bkpSimCurGrid",
		});
		var simCdrPanel=Ext.create('app.view.monitor.group.sim.SimCdrPanel',{
			id:"bkpSimCdrPanel",
			gridId:"bkpSimCdrGrid",
		});
		var simSmsPanel=Ext.create('app.view.monitor.group.sim.SimSmsPanel',{
			id:'bkpSimSmsPanel',
			gridId:"bkpSimSmsGrid",
		});
		var simUssdPanel=Ext.create('app.view.monitor.group.sim.SimUssdPanel',{
			id:'bkpSimUssdPanel',
			gridId:"bkpSimUssdGrid",
		});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[pmdBkpPanel,sim15Panel,sim24Panel,
	       	       simCurPanel,simCdrPanel,simSmsPanel,simUssdPanel],
  	   	   	listeners:{			
  				tabchange:function(tabPanel,newTab,oldTab,obj){
  					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
  				}
  			}
//	       	items:[sim15Panel,sim24Panel,simCurPanel,simCdrPanel,simSmsPanel,simUssdPanel]
	       
		}];
		this.items[0].initTabNum = this.items[0].items.length;
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});