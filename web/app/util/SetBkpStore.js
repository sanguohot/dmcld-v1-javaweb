Ext.define('app.util.SetBkpStore',{
	
	setBkpStore:function(uuid,bkpInfoPanel,bkpInfoTab,toDwgPort,toSimCard){
		var bkpStore=Ext.create('app.store.operation.domain.roamzone.site.nes.BkpStore',{});
		bkpStore.on('beforeload', function (bkpStore, options) {
	        var params = { uuid:uuid};
	        Ext.apply(bkpStore.proxy.extraParams, params);
	    });
		bkpStore.on('load',function(bkpStore, options,successful){
			var r=bkpStore.getAt(0);
			bkpInfoPanel.down('form').loadRecord(r);
		
			var oprStatus=parseInt(r.get('oprStatus'));
			var runStatus=parseInt(r.get('runStatus'));
		  	var opr=bkpInfoPanel.down('form').getForm().findField('oprStatus');
		  	var run=bkpInfoPanel.down('form').getForm().findField('runStatus');
		  	var workStatus=parseInt(r.get('status'));
		  	var sta=bkpInfoPanel.down('form').getForm().findField('status');
//		  	var toDwgPort=Ext.getCmp('linkDwgPort');
//			var toSimCard=Ext.getCmp('linkSimCard');
			var simUuid=parseInt(r.get('simUuid'));
			var gwpUuid=parseInt(r.get('gwpUuid'));
			bkpInfoTab.setTitle(r.get('alias'));
			if(simUuid<1){
				toSimCard.setDisabled(true);
			}else{
				toSimCard.setDisabled(false);
			}
			if(gwpUuid<1){
				toDwgPort.setDisabled(true);
			}else{
				toDwgPort.setDisabled(false);
			}
		  
			sta.setValue(rs.workStatus(workStatus));
			  
			opr.setValue(rs.oprStatus(oprStatus));
		  
			run.setValue(rs.runStatus(runStatus));
		});
		
		bkpStore.load();
	},
	setBkpStoreAndCreateTab:function(uuid,bkpInfoPanel,createTabPanel,toDwgPort,toSimCard){
		var bkpInfoTab;
		var bkpStore=Ext.create('app.store.operation.domain.roamzone.site.nes.BkpStore',{});
		bkpStore.on('beforeload', function (bkpStore, options) {
	        var params = { uuid:uuid};
	        Ext.apply(bkpStore.proxy.extraParams, params);
	    });
		
		bkpStore.on('load',function(bkpStore, options,successful){
			var r=bkpStore.getAt(0);
			bkpInfoPanel.down('form').loadRecord(r);
		
			var oprStatus=parseInt(r.get('oprStatus'));
			var runStatus=parseInt(r.get('runStatus'));
		  	var opr=bkpInfoPanel.down('form').getForm().findField('oprStatus');
		  	var run=bkpInfoPanel.down('form').getForm().findField('runStatus');
		  	var workStatus=parseInt(r.get('status'));
		  	var sta=bkpInfoPanel.down('form').getForm().findField('status');
			  
			  
//			var toDwgPort=Ext.getCmp('linkDwgPort');
//			var toSimCard=Ext.getCmp('linkSimCard');
			var simUuid=parseInt(r.get('simUuid'));
			var gwpUuid=parseInt(r.get('gwpUuid'));
			
			if(simUuid<1){
				toSimCard.setDisabled(true);
			}else{
				toSimCard.setDisabled(false);
			}
			if(gwpUuid<1){
				toDwgPort.setDisabled(true);
			}else{
				toDwgPort.setDisabled(false);
			}
				  
			sta.setValue(rs.workStatus(workStatus));
			  
			opr.setValue(rs.oprStatus(oprStatus));
		  
			run.setValue(rs.runStatus(runStatus));
			bkpInfoTab=createTabPanel.add({
				title: r.get('alias'),
	            iconCls: 'tabs',
	            layout:'fit',
	            name:'linkBkp',
	            items:[bkpInfoPanel],
	            closable: true
	        });
				
			bkpInfoTab.show();
		});
		
		bkpStore.load();
		return bkpInfoTab;
	},
	setBkpStoreByModule:function(module,uuid,bkpInfoPanel,bkpInfoTab,toDwgPort,toSimCard){
		var bkpStore=Ext.create('app.store.'+module+'.domain.roamzone.site.nes.BkpStore',{});
		bkpStore.on('beforeload', function (bkpStore, options) {
	        var params = { uuid:uuid};
	        Ext.apply(bkpStore.proxy.extraParams, params);
	    });
		bkpStore.on('load',function(bkpStore, options,successful){
			var r=bkpStore.getAt(0);
			bkpInfoPanel.down('form').loadRecord(r);
		
			var oprStatus=parseInt(r.get('oprStatus'));
			var runStatus=parseInt(r.get('runStatus'));
		  	var opr=bkpInfoPanel.down('form').getForm().findField('oprStatus');
		  	var run=bkpInfoPanel.down('form').getForm().findField('runStatus');
		  	var workStatus=parseInt(r.get('status'));
		  	var sta=bkpInfoPanel.down('form').getForm().findField('status');
//		  	var toDwgPort=Ext.getCmp('linkDwgPort');
//			var toSimCard=Ext.getCmp('linkSimCard');
			var simUuid=parseInt(r.get('simUuid'));
			var gwpUuid=parseInt(r.get('gwpUuid'));
			bkpInfoTab.setTitle(r.get('alias'));
			if(simUuid<1){
				toSimCard.setDisabled(true);
			}else{
				toSimCard.setDisabled(false);
			}
			if(gwpUuid<1){
				toDwgPort.setDisabled(true);
			}else{
				toDwgPort.setDisabled(false);
			}
		  
			sta.setValue(rs.workStatus(workStatus));
			  
			opr.setValue(rs.oprStatus(oprStatus));
		  
			run.setValue(rs.runStatus(runStatus));
		});
		
		bkpStore.load();
	},	
});
