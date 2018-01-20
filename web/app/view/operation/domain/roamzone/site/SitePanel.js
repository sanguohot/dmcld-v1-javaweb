Ext.define('app.view.operation.domain.roamzone.site.SitePanel',{
	extend:'Ext.panel.Panel',
	requires: [
		        'Ext.util.Format',
		        'Ext.grid.Panel',
//		   		'app.store.SimPortStore',
		   		'app.store.operation.domain.roamzone.site.SiteInfoModel'
		       ],
//	id:'sitePanel',
	layout:'fit',
	hidden:true,
	border:false,
	treeId:'',
	domainUuid:0,
	getTreeId:function(){
		return this.treeId;
	},
	store:null,
	initComponent: function(){
		var domainUuid = this.domainUuid;
		var store = Ext.create('app.store.operation.domain.roamzone.site.SiteInfoStore',{});
		this.store = store;
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var siteName;
		if(maintenance){
			siteName = Ext.create('Ext.form.field.Text',{
	    		xtype: 'textfield',
				name : 'name',
				fieldLabel: 'Name',
				labelWidth: 180,
				maxLength:31,
				anchor:'75%'
			});
		}else{
			var generalObj = Ext.getCmp('GeneralObj');
			if(!generalObj){
				generalObj = Ext.create('app.util.GeneralObj',{});
			}
			siteName = generalObj.createName('site_name'
					,75,25,'name','Name','#DFE9F6','siteManager!checkSite.action',store);
			store.on('load',function(){
    			var picture = siteName.getComponent('picture');
    			picture.update("");
    			picture.flag = 2;
			});
		} 
		var siteTab=Ext.create('Ext.form.Panel',{
			title:lanControll.getLanValue('tiSiteInfo'),
//			id:'siteTab',
			itemId:'form',
			domainUuid:'',
			store:store,
			treeName:'',
			border:false,
			bodyStyle: {
				background: '#DFE9F6',
			},
		    bodyPadding: 5,

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
	        	name:'defaultFlag'
	        },{
	        	xtype:'hiddenfield',
	        	name:'domainUuid',
	        	itemId:'siteDomainUuid'
	        },{	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Basic Info',
				ulan:'fsBasicInfo',
				itemId:'site_basic_info',
				items:[{
					border:false,
					layout: {
			            type: 'table',
			            columns: 3
			        },
			        defaults: {
			            width:640, 
			            height: 25,
			        },
			        bodyStyle: {
						background: '#DFE9F6',
					},
			        items: [siteName,{
			        	xtype:'displayfield',
			        	width:60,
			        	rowspan:3,
			        },{
			    		xtype:'image',
			    		name:'imgs',
			    		rowspan: 3,
			            height: 140,
			    		width:140,
			    		border:false,
			    		fieldDefaults: {
			    			labelWidth: 100,
			    			anchor: '85%'
			    		 },
			    		src:Ext.get('resources').value+'/images/panel_logo/site.png',
			    	
			        }, {
			            xtype: 'textfield',
			            name: 'alias',
			            labelWidth: 180,
			            fieldLabel: 'Alias',
			        },{
			            xtype: 'textareafield',
			            name: 'detailDesc',
			            fieldLabel: 'Description',
			            labelWidth: 180,
			            height:80,
			            rows:3,
			        }]
			     }]
			 }, {
		            xtype: 'fieldset',
					layout:'anchor',
					title:'Detail Info',
					ulan:'fsDetailInfo',
					itemId:'site_detail_info',
					height:200,
					layout: 'anchor',
					collapsible: true,
					collapsed: false,
					items:[{
			            xtype: 'combo',
			            name: 'zoneUuid',
			            mode : 'local',
			            editable:false,
			            fieldLabel: 'Location Zone',
			            displayField : 'name',
						valueField : 'uuid',
						queryMode : 'local',
						store:Ext.create("app.store.util.ComboxStore",{}),
			        },{
			            xtype: 'combo',
			            name: 'nextSiteUuid',
			            mode : 'local',
			            labelWidth: 180,
			            width:420,
			            editable:false,
			            hidden:rs.dmCloudMode(),
			            fieldLabel: 'Next Site',
			            displayField : 'name',
						valueField : 'uuid',
						queryMode : 'local',
						store:Ext.create("app.store.util.ComboxStore",{}),
						valueNotFoundText:'',
			        }]
			 }], 
	    	maintenance:maintenance,
	    	createTbar:function(){
	    		var tbar = [];
	    		if(!this.maintenance){
	    			
	    			var commit = Ext.create('Ext.button.Button',{
			            text: 'Commit',
			            iconCls:'save',
			            ulan:'btCommit',
			            flag:"domain_edit",
			            disabled: true,
			            formBind: false,
			            handler: function() {
		            		var tmp = this.up('form').down('fieldcontainer[itemId=site_name]');
		            		if(tmp.getComponent('picture').flag==0)
			                return;
			                var form = this.up('form').getForm();
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'siteManager!updateSite.action',
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {

			                			var obj=Ext.JSON.decode(response.responseText);			
			                			if(obj['success']){
			                				ip.commitSuccess(siteTab,siteTab.store);
			                			}else{
			                				ip.commitFailure(siteTab);
			                			}
			                		}
			                	});
			                }
			            }
			        });
	    			tbar.push(commit);
	    			tbar.push('-');
	    			ip.createEditButton(siteTab,siteTab.store,tbar);
	    			tbar[tbar.length-2].flag = "domain_edit";
	    		}
	    		var refresh = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 flag:"domain_read",
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
//	    	listeners:{
//    			afterlayout:{
//	    			fn:function(){
//	    				this.createTbar();
//	    				lanControll.setFieldSet(this);
//	    			},
//	    			single:true
//	    		},				    	
//	    	}      
		});
		siteTab.addListener("afterlayout",function(){
			privilege.procPrivilege(siteTab);
		},this,{single:true});
		siteTab.createTbar();
//		privilege.procPrivilege(siteTab);
		var tab = siteTab;
		siteLoadMask=new Ext.LoadMask(tab, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
       	store.on('load', function(){
			var r=store.getAt(0);
			tab.loadRecord(r);
		});
		var zoneStore = tab.getForm().findField('zoneUuid').store;
		var siteStore = tab.getForm().findField('nextSiteUuid').store;
		var comboxStore = Ext.create('app.store.util.ComboxStore');
		tab.comboxStore = comboxStore;
		
		comboxStore.on('beforeload',function(){
			comboxStore.loadFlag = false;
		});		
		comboxStore.on('load',function(){		
			siteStore.removeAll();
			zoneStore.removeAll();
			siteStore.add({uuid:0,name:'NULL'});
			for(var i=0; i<comboxStore.getCount(); i++){
				if(comboxStore.getAt(i).get('type')=='site'){
					siteStore.add(comboxStore.getAt(i));
				}else if(comboxStore.getAt(i).get('type')=='zone'){
					zoneStore.add(comboxStore.getAt(i));
				}
			}
			store.load();
		});
		comboxStore.load();
		
		var id = 'nesInSiteTab';
		if(maintenance){
			id = 'maintenanceNesInSiteTab';
		}
		var siteTab2=Ext.create('app.view.operation.domain.roamzone.site.NesInSiteTab',{
			title:tiDeviceList,
			id:id
		});
		siteTab2.addListener("afterlayout",function(){
			privilege.procPrivilege(siteTab2);
		},this,{single:true});
		
		ip.initOtiose(1,siteTab);
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[siteTab,siteTab2],
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