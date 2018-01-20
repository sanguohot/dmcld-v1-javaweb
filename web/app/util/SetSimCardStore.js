Ext.define('app.util.SetSimCardStore',{
	
	setSimCardStore:function(uuid,domainUuid,simCardPanel,simCardInfoTab,toSimBankPort){
		var simCardStore=Ext.create('app.store.operation.domain.roamzone.SimCardStore',{});
		simCardStore.on('beforeload', function (simCardStore, options) {
	        var params = { uuid:uuid};
	      
	        Ext.apply(simCardStore.proxy.extraParams, params);
	    });
		
		simCardStore.on('load',function(simCardStore, options){
			var r=simCardStore.getAt(0);
			simCardPanel.down('form').loadRecord(r);
			simCardInfoTab.setTitle(r.get('imsi'));
			var oprStatus=parseInt(r.get('oprStatus'));
			var runStatus=parseInt(r.get('runStatus'));
			var opr=simCardPanel.down('form').getForm().findField('oprStatus');
			var run=simCardPanel.down('form').getForm().findField('runStatus');
			var reasonStatus=parseInt(r.get('deactiveReason'));
			var reason=simCardPanel.down('form').getForm().findField('deactiveReason');
			
			opr.setValue(rs.oprStatus(oprStatus));
				  
			run.setValue(rs.runStatus(runStatus));
			reason.setValue(rs.switchReason(reasonStatus));
			simCardInfoTab.show();
		});
		
		var comboxStore = simCardPanel.down('form').getForm().findField('grpUuid').store;
		comboxStore.removeAll();
		comboxStore.on('load',function(){
			comboxStore.filter("type","group");
			simCardStore.load();
		},this,{single: true});
		comboxStore.load({params:{domainUuid:domainUuid,types:'group'}});
		  
	},
	setSimCardStoreAndCreateTab:function(uuid,domainUuid,simCardPanel,createTabPanel,toSimBankPort){
		var simCardInfoTab;
		var simCardStore=Ext.create('app.store.operation.domain.roamzone.SimCardStore',{});
		simCardStore.on('beforeload', function (simCardStore, options) {
	        var params = { uuid:uuid};
	      
	        Ext.apply(simCardStore.proxy.extraParams, params);
	    });

		simCardStore.on('load',function(simCardStore, options){
				var r=simCardStore.getAt(0);
				
				simCardPanel.down('form').loadRecord(r);
				
				var oprStatus=parseInt(r.get('oprStatus'));
				var runStatus=parseInt(r.get('runStatus'));
				var opr=simCardPanel.down('form').getForm().findField('oprStatus');
				var run=simCardPanel.down('form').getForm().findField('runStatus');
				
				var reasonStatus=parseInt(r.get('deactiveReason'));
				var reason=simCardPanel.down('form').getForm().findField('deactiveReason');
				
				opr.setValue(rs.oprStatus(oprStatus));
				  
			  	run.setValue(rs.runStatus(runStatus));
			  	reason.setValue(rs.switchReason(reasonStatus));
	//			  	var toSimBankPort=Ext.getCmp('toSimBankPort');
			  	var bkpUuid=r.get('bkpUuid');
			  	if(bkpUuid>0){
			  		toSimBankPort.setDisabled(false);
			  	}else{
			  		toSimBankPort.setDisabled(true);
			  	}
			  	
				simCardInfoTab=createTabPanel.add({
				title: r.get('imsi'),
	            iconCls: 'tabs',
	            name:'linkSIM',
	            layout:'fit',
	            items:[simCardPanel],
	            closable: true
	        });
			simCardInfoTab.show();
		});
		
		var comboxStore = simCardPanel.down('form').getForm().findField('grpUuid').store;
		comboxStore.removeAll();
		comboxStore.on('load',function(){
			comboxStore.filter("type","group");
			simCardStore.load();
		},this,{single: true});
		comboxStore.load({params:{domainUuid:domainUuid,types:'group'}});

		return simCardInfoTab;
	},
	setSimCardStoreByModule:function(module,uuid,simCardPanel,toSimBankPort){
		
		var simCardStore=Ext.create('app.store.'+module+'.domain.roamzone.SimCardStore',{});
		simCardStore.on('beforeload', function (simCardStore, options) {
	        var params = { uuid:uuid};
	      
	        Ext.apply(simCardStore.proxy.extraParams, params);
	    });
		
		simCardStore.on('load',function(simCardStore, options){
			var r=simCardStore.getAt(0);
			simCardPanel.down('form').loadRecord(r);
			simCardPanel.setTitle(r.get('imsi'));
			var oprStatus=parseInt(r.get('oprStatus'));
			var runStatus=parseInt(r.get('runStatus'));
			var opr=simCardPanel.down('form').getForm().findField('oprStatus');
			var run=simCardPanel.down('form').getForm().findField('runStatus');
			var reasonStatus=parseInt(r.get('deactiveReason'));
			var reason=simCardPanel.down('form').getForm().findField('deactiveReason');
			
			opr.setValue(rs.oprStatus(oprStatus));
				  
			run.setValue(rs.runStatus(runStatus));
			reason.setValue(rs.switchReason(reasonStatus));
		});
		simCardStore.load();
		
		simCardPanel.show();
	},	
});
