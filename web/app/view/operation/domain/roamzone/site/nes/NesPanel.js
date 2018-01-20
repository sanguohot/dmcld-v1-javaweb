Ext.define('app.view.operation.domain.roamzone.site.nes.NesPanel',{
	extend:'Ext.panel.Panel',
	id:'nesPanel',
	requires: [
		        'Ext.util.Format',
		        'Ext.grid.Panel',
		       ],
	layout:'fit',
	hidden:true,
	border:false,
	
	initComponent: function(){
	
//		var roamzoneTab=Ext.create('app.view.operation.domain.roamzone.RoamzoneTab',{});
//		var siteTab=Ext.create('app.view.operation.domain.roamzone.SiteTab',{});
		
		var nesTab=Ext.create('Ext.form.Panel',{
			title:lanControll.getLanValue('tiDeviceInfo'),
			id:'nesTab',
			border:false,
			autoScroll:true,
			bodyStyle: {
				background: '#DFE9F6',
			},
//			width: 500,
		    bodyPadding: 5,
		    treeName:'',

	        fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 180,
	            anchor: '75%'
	        },

	        items: [{
	        	xtype:'hiddenfield',
	        	name:'uuid'
	        },{
	        	xtype:'hiddenfield',
	        	name:'domainUuid'
	        },{
	            xtype: 'displayfield',
	            name: 'productSn',
	            id:'neProductSn',
	            fieldLabel: 'Product Sn',
	        }, {
	            xtype: 'textfield',
	            name: 'alias',
	            fieldLabel: 'Device Name',
	        },rs.createAdminStatus(null,[1,2,4],adminSizeObj),{
	            xtype: 'displayfield',
	            name: 'oprStatus',
	            id:'nesOprStatus',
	            fieldLabel: 'Opr Status',
	        },{
	            xtype: 'displayfield',
	            name: 'runStatus',
	            fieldLabel: 'Run Status',
	        },{
	    		xtype: 'hiddenfield',
	    		name : 'productId',
	    		id:'neProductType',
	        },{
	        	xtype: 'displayfield',
	    		name : 'productId',
	    		ulan:'deviceType',
	    		fieldLabel:'Device Type',
	        }, {
	            xtype: 'combo',
	            name: 'siteUuid',
	            id:'neSiteUuid',
	            mode : 'local',
	            editable:false,
	            fieldLabel: 'Site',
	            displayField : 'name',
				valueField : 'uuid',
				queryMode : 'local',
	        }, {
	            xtype: 'combo',
	            name: 'policyUuid',
	            id:'nePolicyUuid',
	            mode : 'local',
	            editable:false,
	            fieldLabel: 'Policy',
	            displayField : 'name',
				valueField : 'uuid',
				queryMode : 'local',
	        }, {
	            xtype: 'displayfield',
	            name: 'productName',
	            fieldLabel: 'Device Model',
	        }, {
	            xtype: 'displayfield',
	            name: 'vendorId',
	            fieldLabel: 'VendorId',
	        },{
	            xtype: 'textfield',
	            name: 'password',
	            inputType:'password',
	            fieldLabel: 'Password',
	        },{
	            xtype: 'displayfield',
	            name: 'encryptType',
	            fieldLabel: 'Encrypt Type',
	        },{
	            xtype: 'displayfield',
	            name: 'outerIpAddr',
	            fieldLabel: 'Outer Ip Address',
	        },{
	            xtype: 'displayfield',
	            name: 'innerIpAddr',
	            fieldLabel: 'Inner Ip Address',
	        },{
	            xtype: 'displayfield',
	            name: 'lastRegTime',
	            fieldLabel: 'Last Register Time',
	        },{
	            xtype: 'displayfield',
	            name: 'regFailCount',
	            fieldLabel: 'Register Fail Count',
	        },{
	            xtype: 'displayfield',
	            name: 'upgradeType',
	            fieldLabel: 'Upgrade Type',
	        },{
	            xtype: 'displayfield',
	            name: 'upgradeStatus',
	            fieldLabel: 'Upgrade Status',
	        },{
	            xtype: 'displayfield',
	            name: 'lastUpgradeResult',
	            fieldLabel: 'Last Upgrade Result',
	        },{
	            xtype: 'displayfield',
	            name: 'lastUpgradeTime',
	            fieldLabel: 'Last Upgrade Time',
	        },{
	            xtype: 'displayfield',
	            name: 'targetSoftwareVer',
	            fieldLabel: 'Target Version',
	        },{
	            xtype: 'displayfield',
	            name: 'macAddrBegin',
	            fieldLabel: 'Mac Address Begin',
	        },
//	        {
//	            xtype: 'displayfield',
//	            name: 'createTime',
//	            fieldLabel: 'CreateTime',
//	        },{
//	            xtype: 'displayfield',
//	            name: 'updateTime',
//	            fieldLabel: 'UpdateTime',
//	        },
	        {
	            xtype: 'textareafield',
	            name: 'detailDesc',
	            fieldLabel: 'Description',
	            width:300,
	        }],
	        dockedItems: [ {
	            xtype: 'toolbar',
	            items: [{
		            text: 'Commit',
		            iconCls:'save',
		            flag:"edit",
		            formBind: true, //only enabled once the form is valid
		            disabled: true,
		            handler: function() {
		                var form = this.up('form').getForm();
		                if (form.isValid()) {
		                	Ext.Ajax.request({
		                		url:'neManager!updateNe.action',
		                		method:'POST',
		                		params:form.getValues(),
		                		callback: function (options, success, response) {
			                    	if(success){
			                    		var s=Ext.create('app.store.operation.OperationStore',{});
			                    		Ext.getCmp('operationTree').store=s;
			                    		
			                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
			                    		
			                    	}else{
			                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
			                    	}
		                    	}
		                	});
		                }
		            }
		        }]
	        }],
			
		});
//		var bkpInNe=Ext.create('app.view.operation.domain.roamzone.site.nes.BkpInNe',{
//			title:'SIMBANK Port List',
//			
//		});
//		var gwpInNe=Ext.create('app.view.operation.domain.roamzone.site.nes.GwpInNe',{
//			title:'DWG Port List',
//			
//		});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[nesTab]
	       
		}];
		this.callParent(arguments);	
	}
});