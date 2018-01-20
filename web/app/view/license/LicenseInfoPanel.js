Ext.define('app.view.license.LicenseInfoPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	store:{},
	initComponent: function(){
		var store = Ext.create('app.store.license.LicenseInfoStore',{});
		this.store = store;
		var formPanel=Ext.create('Ext.form.Panel',{
			title:tiLicInfo,
			itemId:'form',
			treeName:'',
			store:store,
			border:false,
			autoScroll:true,
			bodyStyle: {
				background: '#DFE9F6',
			},
		    bodyPadding: 5,

	        fieldDefaults: {
	            labelAlign: 'left',
	            anchor: '75%',
	            labelWidth: 180,
	        },
	       
	        items: [{
	        	xtype:'hiddenfield',
	        	name:'uuid',
	        },{
	        	xtype:'hiddenfield',
	        	name:'srvUuid',
	        },{
	        	xtype:'hiddenfield',
	        	name:'domainUuid',
	        },{
		    	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'license Info',
				ulan:'fsLicenseDetailInfo',
				itemId:'license_detail_info',
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				items:[{
		            xtype: 'displayfield',
		            name: 'srvDomain',
		            fieldLabel: 'Server Domain',
		        },{
		            xtype: 'displayfield',
		            name: 'licenseVer',
		            fieldLabel: 'License Version',
		        },{
		            xtype: 'displayfield',
		            name: 'srvMagic',
		            fieldLabel: 'Server Magic',
		        },{
		            xtype: 'displayfield',
		            name: 'licenseStatus',
		            fieldLabel: 'License Status',
		        }, {
		            xtype: 'displayfield',
		            name: 'beginDate',
		            fieldLabel: 'Begin Date',
		        }, {
		        	xtype: 'displayfield',
		        	name: 'endDate',
		        	fieldLabel: 'End Date',
		        }, {
		            xtype: 'displayfield',
		            name: 'leftDays',
		            fieldLabel: 'leftDays',
		        }, {
		            xtype: 'displayfield',
		            name: 'srvMode',
		            fieldLabel: 'srvMode',
		        }, {
		            xtype: 'displayfield',
		            name: 'licenseType',
		            fieldLabel: 'License Type',
		        }, {
		            xtype: 'displayfield',
		            name: 'availableDays',
		            fieldLabel: 'Available Days',
		        }, {
		            xtype: 'displayfield',
		            name: 'expiredDate',
		            fieldLabel: 'Expired Date',
		        }, {
		            xtype: 'displayfield',
		            name: 'maxSimCard',
		            fieldLabel: 'Max SIM Card',
		        }, {
		        	xtype: 'displayfield',
		        	name: 'hbmFeatures',
		        	fieldLabel: 'HBM Features',
		        }, {
		            xtype: 'displayfield',
		            name: 'authInfo',
		            fieldLabel: 'Auth Info',
		        }, {
		            xtype: 'displayfield',
		            name: 'serviceApi',
		            fieldLabel: 'Service API',
		        }, {
		            xtype: 'displayfield',
		            name: 'dnsUrl01',
		            fieldLabel: 'DNS URL-01',
		        }, {
		            xtype: 'displayfield',
		            name: 'dnsUrl02',
		            fieldLabel: 'DNS URL-02',
		        }, {
		            xtype: 'displayfield',
		            name: 'authUrl',
		            fieldLabel: 'Auth URL',
		        },{
		            xtype: 'displayfield',
		            name: 'signAuthor',
		            fieldLabel: 'Sign Author',
		        },{
		            xtype: 'displayfield',
		            name: 'signDate',
		            fieldLabel: 'Sign Date',
		        }, {
		        	xtype: 'displayfield',
		            name: 'detailDesc',
		            labelWidth: 180,
		            height:50,
		            fieldLabel: 'Description',
		        }]
		    }],
	    	createTbar:function(){
	    		var tbar = [];
	    		var refresh = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		 ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 listeners:{
		       		 	click:function(){
		        			this.up('form').store.load();
		       	 		}
		       	 	}
	       	 	});
	    		tbar.push(refresh);
	    		for(var i=0;i<tbar.length;i++){
	    			if(tbar[i]!='-' && tbar[i]!='->'){
	    				var text = lanControll.getLanValue(tbar[i].ulan);
	    				tbar[i].setText(text);
	    			}
	    		}
	    		var dockedItems = {
	    				xtype:'toolbar',
	    				dock: 'top',
	    				items:tbar
	    		};
	    		this.addDocked(dockedItems);
	    	},
			listeners:{
				afterlayout:{
	    			fn:function(){
	    				this.createTbar();
	    				lanControll.setFieldSet(this);
	    			},
	    			single:true
	    		}
	    	},
	       
	       
		});

		sysLoadMask=new Ext.LoadMask(formPanel, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
		store.on('load', function(){
			  var r=store.getAt(0);
			  var oprStatus=parseInt(r.get('oprStatus'));
			  var runStatus=parseInt(r.get('runStatus'));
			  var lifeSecond=parseInt(r.get('lifeSecond'));
			  var opr=formPanel.getForm().findField('oprStatus');
			  var run=formPanel.getForm().findField('runStatus');
			  var life=formPanel.getForm().findField('lifeSecond');
			  formPanel.loadRecord(r);
			  opr.setValue(rs.oprStatus(oprStatus));
			  run.setValue(rs.runStatus(runStatus));
			  life.setValue(rs.tranSecond(lifeSecond));
		});
		this.items=[{
	       	xtype: 'tabpanel',
//	       	id:'cloudTab',
	       	items:[formPanel]
	       
		}];
		this.callParent(arguments);	
	}
});