Ext.define('app.util.TimerPanel',{
	extend:'Ext.form.Panel',
	alias:'widget.timerpanel',
	store:{},
	params:{},
	items:[],
	interval:3000,
	parentId:'',
	hidden:true,
	initComponent: function(){
		var me = this;
		me.store.on('load',function(){
			var r=me.store.getAt(0);
			if(r){
				me.loadRecord(r);
			}
		});
		
		var task={
			run:function(){
				console.log(me.parentId);
				var parentCmp=Ext.getCmp(me.parentId)
				if(parentCmp){
					Ext.apply(me.store.proxy.extraParams,{serverUuid:parentCmp.uuid});
					if(Ext.getCmp(me.parentId).isVisible() && me.up('container').isVisible()){
						me.store.load();
					}else{
//						Ext.TaskManager.stop(task);
					}
				}
			},
			interval:me.interval
		}
		if(me.hidden==false){
			Ext.TaskManager.start(task);
		}
		
		this.callParent(arguments);	
	}
});