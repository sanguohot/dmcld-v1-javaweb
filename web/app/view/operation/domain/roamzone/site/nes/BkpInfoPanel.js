Ext.define('app.view.operation.domain.roamzone.site.nes.BkpInfoPanel',{
	extend:'Ext.panel.Panel',
	id:'bkpInfoPanel',
	requires: [
		        'Ext.util.Format',
		        'Ext.grid.Panel',
		       ],
	layout:'fit',
	autoScroll:true,
	hidden:true,
	border:false,
	params:null,
	runParams:function(params){
		var id = this.getBkpId();
		var tab = Ext.getCmp(id);
		if(!tab){
			return;
		}
		tab.params = params;
		tab.store.load(params);
	},
	getPrefix:function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var prefix = 'bkpInfoPanel_';
		if(maintenance){
			prefix = 'maintenance_'+prefix;
		}
		return prefix;
	},
	getBkpId:function(){
		var id = this.getPrefix()+'bkpInfoPanel';
		return id;
	},
	initComponent: function(){
		var bkp = Ext.create('app.view.module.BkpInfoPanel',{
			closable:false,
			params:this.params,
			id:this.getBkpId(),
			prefix:this.getPrefix()
		});

		this.items = [{
				xtype:'tabpanel',
				items:[bkp]
		}]
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});