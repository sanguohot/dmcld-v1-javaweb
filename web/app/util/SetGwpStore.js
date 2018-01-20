Ext.define('app.util.SetGwpStore',{
	
	setGwpStore:function(uuid,linkGwpPanel,gwpInfoTab,toBkpPort){
		var gwpStore=Ext.create('app.store.operation.domain.roamzone.site.nes.GwpStore',{});
		gwpStore.on('beforeload', function (gwpStore, options) {
	        var params = { uuid:uuid};
	        Ext.apply(gwpStore.proxy.extraParams, params);
	    });
		
		gwpStore.on('load',function(gwpStore, options,successful){
			var r=gwpStore.getAt(0);
			linkGwpPanel.down('form').loadRecord(r);
	//		var uuid=parseInt(r.get('uuid'));
			var oprStatus=parseInt(r.get('oprStatus'));
			var opr=linkGwpPanel.down('form').getForm().findField('oprStatus');
			var runStatus=parseInt(r.get('runStatus'));
			var run=linkGwpPanel.down('form').getForm().findField('runStatus');
			var workType=parseInt(r.get('workMode'));
			var work=linkGwpPanel.down('form').getForm().findField('workMode');
			var modType=parseInt(r.get('modType'));
			var mod=linkGwpPanel.down('form').getForm().findField('modType');
			var modStatus=parseInt(r.get('modStatus'));
			var mods=linkGwpPanel.down('form').getForm().findField('modStatus');
			
			
			var bkpUuid=parseInt(r.get('bkpUuid'));
			gwpInfoTab.setTitle(r.get('alias'));
			var bindImei=linkGwpPanel.down('form').getForm().findField('bindImei');
			if(bkpUuid<1){
				toBkpPort.setDisabled(true);
			}else{
				var gbsStore=Ext.create('app.store.operation.domain.roamzone.site.nes.GwpBkpSimStore',{});
				gbsStore.on('beforeload', function (gbsStore, options) {
			        var params = { uuid:uuid};
			        Ext.apply(gbsStore.proxy.extraParams, params);
			    });
				gbsStore.on('load',function(gbsStore, options,successful){
					var r=gbsStore.getAt(0);
					var imei=r.get('bindImei');
					bindImei.setValue(imei);
				});
				gbsStore.load();
				toBkpPort.setDisabled(false);
			}
			
			mods.setValue(rs.modStatus(modStatus));
			work.setValue(rs.workType(workType));
		
			mod.setValue(rs.modType(modType));
			opr.setValue(rs.oprStatus(oprStatus));
		  
			run.setValue(rs.runStatus(runStatus));
		});	
		
		gwpStore.load();
	},
	setGwpStoreAndCreateTab:function(uuid,linkGwpPanel,createTabPanel,toBkpPort){
		
		var gwpInfoTab;
		var gwpStore=Ext.create('app.store.operation.domain.roamzone.site.nes.GwpStore',{});
		gwpStore.on('beforeload', function (gwpStore, options) {
	        var params = { uuid:uuid};
	        Ext.apply(gwpStore.proxy.extraParams, params);
	    });
		
		gwpStore.on('load',function(gwpStore, options,successful){
			var r=gwpStore.getAt(0);
			linkGwpPanel.down('form').loadRecord(r);
//			var uuid=parseInt(r.get('uuid'));
			var oprStatus=parseInt(r.get('oprStatus'));
			var opr=linkGwpPanel.down('form').getForm().findField('oprStatus');
			var runStatus=parseInt(r.get('runStatus'));
			var run=linkGwpPanel.down('form').getForm().findField('runStatus');
			var workType=parseInt(r.get('workMode'));
			var work=linkGwpPanel.down('form').getForm().findField('workMode');
			var modType=parseInt(r.get('modType'));
			var mod=linkGwpPanel.down('form').getForm().findField('modType');
			var modStatus=parseInt(r.get('modStatus'));
			var mods=linkGwpPanel.down('form').getForm().findField('modStatus');
	
//			var toBkpPort=Ext.getCmp(linkBkpPort);
			
			var bkpUuid=parseInt(r.get('bkpUuid'));
			
			var bindImei=linkGwpPanel.down('form').getForm().findField('bindImei');
			if(bkpUuid<1){
				toBkpPort.setDisabled(true);
			}else{
				var gbsStore=Ext.create('app.store.operation.domain.roamzone.site.nes.GwpBkpSimStore',{});
				gbsStore.on('beforeload', function (gbsStore, options) {
    		        var params = { uuid:uuid};
    		        Ext.apply(gbsStore.proxy.extraParams, params);
    		    });
				gbsStore.on('load',function(gbsStore, options,successful){
					var r=gbsStore.getAt(0);
					var imei=r.get('bindImei');
					bindImei.setValue(imei);
				});
				gbsStore.load();
				toBkpPort.setDisabled(false);
			}
			
			mods.setValue(rs.modStatus(modStatus));
			
			work.setValue(rs.workType(workType));
			
			mod.setValue(rs.modType(modType));
			
			  
			opr.setValue(rs.oprStatus(oprStatus));
			  
			run.setValue(rs.runStatus(runStatus));
			  
			gwpInfoTab=createTabPanel.add({
    			title: r.get('alias'),
	            iconCls: 'tabs',
	            name:'linkGwp',
	            layout:'fit',
	            items:[linkGwpPanel],
	            closable: true
    	        });
			
			gwpInfoTab.show();
		});
		gwpStore.load();
		return gwpInfoTab;
	},
	setGwpStoreByModule:function(module,uuid,linkGwpPanel,gwpInfoTab,toBkpPort){
		var gwpStore=Ext.create('app.store.'+module+'.domain.roamzone.site.nes.GwpStore',{});
		gwpStore.on('beforeload', function (gwpStore, options) {
	        var params = { uuid:uuid};
	        Ext.apply(gwpStore.proxy.extraParams, params);
	    });
		
		gwpStore.on('load',function(gwpStore, options,successful){
			var r=gwpStore.getAt(0);
			linkGwpPanel.down('form').loadRecord(r);
	//		var uuid=parseInt(r.get('uuid'));
			var oprStatus=parseInt(r.get('oprStatus'));
			var opr=linkGwpPanel.down('form').getForm().findField('oprStatus');
			var runStatus=parseInt(r.get('runStatus'));
			var run=linkGwpPanel.down('form').getForm().findField('runStatus');
			var workType=parseInt(r.get('workMode'));
			var work=linkGwpPanel.down('form').getForm().findField('workMode');
			var modType=parseInt(r.get('modType'));
			var mod=linkGwpPanel.down('form').getForm().findField('modType');
			var modStatus=parseInt(r.get('modStatus'));
			var mods=linkGwpPanel.down('form').getForm().findField('modStatus');
			
			
			var bkpUuid=parseInt(r.get('bkpUuid'));
			gwpInfoTab.setTitle(r.get('alias'));
			var bindImei=linkGwpPanel.down('form').getForm().findField('bindImei');
			if(bkpUuid<1){
				toBkpPort.setDisabled(true);
			}else{
				var gbsStore=Ext.create('app.store.'+module+'.domain.roamzone.site.nes.GwpBkpSimStore',{});
				gbsStore.on('beforeload', function (gbsStore, options) {
			        var params = { uuid:uuid};
			        Ext.apply(gbsStore.proxy.extraParams, params);
			    });
				gbsStore.on('load',function(gbsStore, options,successful){
					var r=gbsStore.getAt(0);
					var imei=r.get('bindImei');
					bindImei.setValue(imei);
				});
				gbsStore.load();
				toBkpPort.setDisabled(false);
			}
			
			mods.setValue(rs.modStatus(modStatus));
			work.setValue(rs.workType(workType));
		
			mod.setValue(rs.modType(modType));
			opr.setValue(rs.oprStatus(oprStatus));
		  
			run.setValue(rs.runStatus(runStatus));
		});	
		
		gwpStore.load();
	},
});
