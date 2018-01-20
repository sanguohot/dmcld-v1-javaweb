Ext.define('app.view.monitor.domain.zone.port.NePortMonitorPanel',{
	extend:'Ext.panel.Panel',
	id:'nePortMonitorPanel',
	layout:'fit',
	hidden:true,
	border:false,
	treeName:'',
	getTreeName:function(){
		return this.treeName;
	},
	initComponent: function(){
		var pmdGwpPanel = Ext.create('app.view.monitor.domain.zone.port.GwpPanel',{});
		var gwp15Panel=Ext.create('app.view.monitor.domain.zone.port.Gwp15Panel',{});
		var gwp24Panel=Ext.create('app.view.monitor.domain.zone.port.Gwp24Panel',{});
		var gwpCurPanel=Ext.create('app.view.monitor.domain.zone.port.GwpCurPanel',{
			id:'gwpCurPanel',
			gridId:'gwpCurGrid'
		});
		var gwpCdrPanel=Ext.create('app.view.monitor.domain.zone.port.GwpCdrPanel',{});
		var gwpSmsPanel=Ext.create('app.view.monitor.domain.zone.port.GwpSmsPanel',{});
		var gwpUssdPanel=Ext.create('app.view.monitor.domain.zone.port.GwpUssdPanel',{});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[pmdGwpPanel,gwp15Panel,gwp24Panel,gwpCurPanel,
	       	       gwpSmsPanel,gwpUssdPanel,gwpCdrPanel],
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