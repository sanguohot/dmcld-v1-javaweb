
Ext.define('app.view.module.TgpInfoPanel',{
	extend:'Ext.panel.Panel',
	requires: [
		        'Ext.util.Format',
		        'Ext.grid.Panel',
		       ],
	layout:'fit',
	autoScroll:true,
	closable:true,
	hidden:false,
	border:false,
	toolbars:0,
	otiose:0,
	tipId:'',
	store:{},
	params:{},
	prefix:'',
	isInfoPanel:0,
	initComponent: function(){
		var panel = this;
		this.store = Ext.create('app.store.operation.domain.roamzone.site.nes.TgpStore',{});
		var store = this.store;
		var params = this.params;
		var tipId=this.tipId;
		var tgpAlias;
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		if(!maintenance){
			this.toolbars = 3;
			this.otiose = 0;
//			var generalObj = Ext.getCmp('GeneralObj');
//			if(!generalObj){
//				generalObj = Ext.create('app.util.GeneralObj',{});
//			}
//			tgpAlias = generalObj.createName('alias'
//					,65,35,'alias','MTG Port Alias','#DFE9F6',null,store);
//			tgpAlias.down('textfield').ulan = 'tgpAlias';
//			store.on('load',function(){
//    			var picture = tgpAlias.getComponent('picture');
//    			picture.update("");
//    			picture.flag = 2;
//			});
		}else{
			this.toolbars = 2;
			this.otiose = 0;
			
		}
		tgpAlias = Ext.create('Ext.form.field.Text',{
    		xtype: 'displayfield',
			name : 'alias',
			fieldLabel: 'MTG Port Alias',
			ulan:'tgpAlias',
			labelWidth: 180,
			maxLength:31,
			anchor:'65%'
		});
		var prefix = this.prefix;
	
		var tgpInfoTab=Ext.create('Ext.form.Panel',{
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
	        	name:'uuid',
	        	fieldLabel:'uuid'
	        },{
	        	xtype:'hiddenfield',
	        	name:'domainUuid'
	        },{
	            xtype: 'hiddenfield',
	            name: 'tgpUuid',
	            fieldLabel: 'tgpUuid',
	        },{	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Basic Info',
				ulan:'fsBasicInfo',
				itemId:'tgp_basic_info',
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
			        items: [{
			            xtype: 'displayfield',
			            name: 'neSnStr',
			            labelWidth: 180,
			            fieldLabel: 'Device SN',
			        },{
			        	xtype:'displayfield',
			        	width:60,
			        	rowspan:5,
			        },{
			    		xtype:'image',
			    		name:'imgs',
			    		rowspan: 5,
			            height: 140,
			    		width:140,
			    		border:false,
			    		fieldDefaults: {
			    			labelWidth: 100,
			    			anchor: '85%'
			    		 },
			    		src:Ext.get('resources').value+'/images/panel_logo/tg_port.png',
			    	
			        },{
			            xtype: 'displayfield',
			            name: 'neAlias',
			            labelWidth: 180,
			            fieldLabel: 'Device Name',
			        },{
			            xtype: 'displayfield',
			            name: 'portNo',
			            labelWidth: 180,
			            fieldLabel: 'Port No',
			        },tgpAlias
			        ,{
				    	layout:'hbox',
				    	xtype:'fieldcontainer',
				    	border:false,
				    	anchor: '100%',
				    	items:[rs.createAdminStatus(null,[1,2],adminSizeObj),{
				            xtype: 'displayfield',
				            name: 'oprStatus',
				            ulan:'oprStatusSpec',
				            labelAlign: 'right',
				            labelWidth: 80,
				            fieldLabel: 'Opr',
				        },{
				            xtype: 'displayfield',
				            name: 'runStatus',
				            ulan:'runStatusSpec',
				            labelAlign: 'right',
				            labelWidth: 80,
				            fieldLabel: 'Run',
				        }]
			        }]
			     }]
			},{
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Detail Info',
				itemId:'link_tgp_detail_info',
				ulan:'fsDetailInfo',
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				items:[{
		            xtype: 'displayfield',
		            name: 'workState',
		            fieldLabel: 'Work Status',
		            listeners: {
		                change: function(cmp){
				        	if(cmp.getValue()>=0 || cmp.getValue<1000){
				        		cmp.setValue(rs.tgpWorkState(cmp.getValue()));
				        	}
		                }
		            }
		        },{
		            xtype: 'displayfield',
		            name: 'modType',
		            fieldLabel: 'Mod Type',
		            listeners: {
		                change: function(cmp){
				        	if(cmp.getValue()>=0 || cmp.getValue<1000){
				        		cmp.setValue(rs.tgpModType(cmp.getValue()));
				        	}
		                }
		            }
		        },{
		            xtype: 'displayfield',
		            name: 'signalType',
		            fieldLabel: 'Signal Type',
		            listeners: {
		                change: function(cmp){
				        	if(cmp.getValue()>=0 || cmp.getValue<1000){
				        		cmp.setValue(rs.signalType(cmp.getValue()));
				        	}
		                }
		            }
		        }]
			}],
	       
			
		});
		tgpInfoTab.addListener("afterlayout",function(){
			privilege.procPrivilege(tgpInfoTab);
		},this,{single:true});
		var tgpStore = this.store;
		tgpLoadMask=new Ext.LoadMask(tgpInfoTab, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:tgpStore
		});
		
		tgpStore.on('load',function(tgpStore, options,successful){
			var r=tgpStore.getAt(0);
	        var form = panel.down('form');
	        if(panel.isInfoPanel==0){
	        	panel.setTitle(r.get('alias'));
	        }else{
	        	form.setTitle(r.get('alias'));
	        }
	        Ext.suspendLayouts();
			tgpInfoTab.loadRecord(r);
			var oprStatus=parseInt(r.get('oprStatus'));
			var runStatus=parseInt(r.get('runStatus'));
			var opr=tgpInfoTab.getForm().findField('oprStatus');
			var run=tgpInfoTab.getForm().findField('runStatus');

			opr.setValue(rs.oprStatus(oprStatus));		  
			run.setValue(rs.runStatus(runStatus));
			Ext.resumeLayouts(true);
		});
		
		var commit={
	            text: 'Commit',
	            iconCls:'save',
	            flag:"domain_edit",
	            formBind: true, //only enabled once the form is valid
	            disabled: true,
	            handler: function() {
	                var form = this.up('form').getForm();
//                    var picture = this.up('form').down('fieldcontainer[itemId=alias]').getComponent('picture');
//                    if(picture.flag == 0){
//                    	return;
//                    }
	                if (form.isValid()) {
	                	var uuids=form.findField('uuid').getValue();
	                	Ext.Ajax.request({
	                		url:'tgpManager!updateTgp.action?uuids='+uuids,
	                		method:'POST',
	                		params:form.getValues(),
	                		
	                		callback: function (options, success, response) {
		                    	var obj=Ext.JSON.decode(response.responseText);			
		                    	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);			                    		
		                    	}else{
		                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
		                    	}
	                    	}
	                	});
	                }
	            }
	    };
		var refresh={
	       		 xtype:'button',
	       		 text:'Refresh',
	       		 ulan:'btRefresh',
	       		 iconCls:'refresh2',
	       		 flag:"domain_read",
	       		 listeners:{
	       		 	click:function(){
	        			store.load(params);
	        			panel.show();
	       	 		}
	       	 	}
       	};
		var di=[{
	        xtype: 'toolbar',
	        items: []
	    }];
		var items=di[0].items;
		var tbs=this.toolbars;
		if((tbs&1)>0){
			items[0]=commit;
		}
		if((tbs&2)>0){
			if(items[0]!=undefined){
				items[1]='-';
			}
			items[2]=refresh;
		}
		tgpInfoTab.addDocked(di);

		
		ip.initOtiose(this.otiose,tgpInfoTab);
		
		if(this.isInfoPanel==0){
			this.title='MTG Port';
			this.items=[tgpInfoTab];
		}else{
			tgpInfoTab.title='MTG Port';
			this.items=[{xtype: 'tabpanel',items:[tgpInfoTab]}];
		}
		this.callParent(arguments);	
	},
//	listeners:{
//		beforeshow:function(){
//	        var form = this.down('form');
//	        var picture = form.getComponent('alias').getComponent('picture');
//	        picture.update("");
//	        picture.flag = 2;
//		}
//	}
});