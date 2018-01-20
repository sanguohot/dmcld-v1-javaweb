
Ext.define('app.view.operation.domain.roamzone.site.nes.GwpInfoPanel',{
	extend:'Ext.panel.Panel',
//	id:'gwpInfoPanel',
	requires: [
		        'Ext.util.Format',
		        'Ext.grid.Panel',
		       ],
	layout:'fit',
//	hidden:true,
	border:false,
	params:null,
	runParams:function(params){
		var id = this.getGwpId();
		var tab = Ext.getCmp(id);
		if(!tab){
			return;
		}
		tab.params = params;
		tab.store.load(params);
	},
	getPrefix:function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var prefix = 'gwpInfoPanel_';
		if(maintenance){
			prefix = 'maintenance_'+prefix;
		}
		return prefix;
	},
	getGwpId:function(){
		var id = this.getPrefix()+'gwpInfoPanel';
		return id;
	},
	initComponent: function(){
		var gwp = Ext.create('app.view.module.GwpInfoPanel',{
			closable:false,
			params:this.params,
			id:this.getGwpId(),
			prefix:this.getPrefix()
		});

		this.items = [{
				xtype:'tabpanel',
				items:[gwp]
		}]
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});