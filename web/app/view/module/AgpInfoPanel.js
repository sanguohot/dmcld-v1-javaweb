
Ext.define('app.view.module.AgpInfoPanel',{
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
		this.store = Ext.create('app.store.operation.domain.roamzone.site.nes.AgpStore',{});
		var store = this.store;
		var params = this.params;
		var tipId=this.tipId;
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		if(maintenance){
			this.toolbars=2;
			this.otiose=1;
		}else{
			this.toolbars=3;
			this.otiose=0;
//			var generalObj = Ext.getCmp('GeneralObj');
//			if(!generalObj){
//				generalObj = Ext.create('app.util.GeneralObj',{});
//			}
//			agpAlias = generalObj.createName('alias'
//					,65,35,'alias','Ag Port Alias','#DFE9F6',null,store);
//			agpAlias.down('textfield').ulan = 'agpAlias';
//			store.on('load',function(){
//    			var picture = agpAlias.getComponent('picture');
//    			picture.update("");
//    			picture.flag = 2;
//			});
		}
		agpAlias = Ext.create('Ext.form.field.Text',{
    		xtype: 'displayfield',
			name : 'alias',
			ulan:'agpAlias',
			fieldLabel: 'DAG Port Alias',
			labelWidth: 180,
			maxLength:31,
			anchor:'65%'
		});
		
		
		var prefix = this.prefix;
	
		var agpInfoTab=Ext.create('Ext.form.Panel',{
			border:false,
			autoScroll:true,
			bodyStyle: {
				background: '#DFE9F6',
			},
			maskOnDisable:false,
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
	            name: 'agpUuid',
	            fieldLabel: 'agpUuid',
	        },{	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Basic Info',
				ulan:'fsBasicInfo',
				itemId:'agp_basic_info',
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
			    		src:Ext.get('resources').value+'/images/panel_logo/ag_port.png',
			    	
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
			        },agpAlias
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
				            labelAlign: 'right',
				            ulan:'runStatusSpec',
				            labelWidth: 80,
				            fieldLabel: 'Run',
				        }]
			        }]
			     }]
			},{
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Detail Info',
				ulan:'fsDetailInfo',
				itemId:'link_agp_detail_info',
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
				        		cmp.setValue(rs.agpWorkState(cmp.getValue()));
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
				        		cmp.setValue(rs.agpModType(cmp.getValue()));
				        	}
		                }
		            }
		        },{
		        	xtype: 'displayfield',
		        	name: 'primaryUser',
		        	fieldLabel: 'primaryUser',
		        },{
		        	xtype: 'displayfield',
		        	name: 'primaryUserReg',
		        	fieldLabel: 'Primary User Register',
		        					
		        },{
		            xtype: 'displayfield',
		            name: 'secondaryUser',
		            fieldLabel: 'secondaryUser',
		        },{
		            xtype: 'displayfield',
		            name: 'secondaryUserReg',
		            fieldLabel: 'Secondary User Register',
		        }]
			}],
	       
			
		});
		agpInfoTab.addListener("afterlayout",function(){
			privilege.procPrivilege(agpInfoTab);
		},this,{single:true});
		var agpStore = this.store;
//		var agpLoadMask=Ext.getCmp('agpLoadMask');
//		if(!agpLoadMask){
//			agpLoadMask=new Ext.LoadMask(agpInfoTab, {
//				id:'agpLoadMask',
// 			    msg:lanControll.getLanValue('maskMsg'),
// 			    disabled:false,
// 			    maskCls:'loadmaskcss',
// 			    store:agpStore
// 			});
//		}
		agpStore.on('load',function(agpStore, options,successful){
			var r=agpStore.getAt(0);
	        var form = panel.down('form');
	        
	        if(panel.isInfoPanel==0){
	        	panel.setTitle(r.get('alias'));
	        }else{
	        	form.setTitle(r.get('alias'));
	        }
			agpInfoTab.loadRecord(r);
			var oprStatus=parseInt(r.get('oprStatus'));
			var runStatus=parseInt(r.get('runStatus'));
			var opr=agpInfoTab.getForm().findField('oprStatus');
			var run=agpInfoTab.getForm().findField('runStatus');

			opr.setValue(rs.oprStatus(oprStatus));		  
			run.setValue(rs.runStatus(runStatus));
		});
		
		var commit={
	            text: 'Commit',
	            iconCls:'save',
	            ulan:'btCommit',
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
	                		url:'agpManager!updateAgp.action?uuids='+uuids,
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
		agpInfoTab.addDocked(di);

		
		ip.initOtiose(this.otiose,agpInfoTab);
		var loadMask=new Ext.LoadMask(agpInfoTab, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
		if(this.isInfoPanel==0){
			this.title='DAG Port';
			this.items=[agpInfoTab];
		}else{
			agpInfoTab.title='DAG Port';
			this.items=[{xtype: 'tabpanel',items:[agpInfoTab]}];
		}
		lanControll.setLan(agpInfoTab);
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