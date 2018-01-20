Ext.define('app.view.operation.domain.roamzone.site.AddNeToSite',{
	extend : 'Ext.window.Window',
//	id:'addNeToSite',
	alias : 'widget.addNe',
	title : lanControll.getLanValue('tiAddDev'),
	width : 650,
	closeAction : 'hide',
	minWidth : 300,
//	height : 280,
	minHeight : 260,
	layout : 'fit',
	resizable : true,
	treeId:'',
	modal : true,
//	items : form,
	gridStore:{},
	comboxStore:Ext.create("app.store.util.ComboxStore",{}),
	initComponent:function(){
	
	var form = Ext.widget('form', {
		border : false,
		url:'neManager!addNe.action',
		 fieldDefaults: {
			labelWidth: 100
		 },
		defaults : {
			margins : '0 0 0 10'
		},
		layout: {
	        type:'hbox',
//	        padding:'10',
	        align:'middle',
//	        pack:'end',
	    },
		items:[{
			xtype:'image',
			name:'imgs',
			itemId:'imgs',
			height:123,
			width:221,
			border:false,
			fieldDefaults: {
				labelWidth: 100,
				anchor: '85%'
			 },
			src:Ext.get('resources').value+'/images/DevSN.jpg',
		},{
			width:420,
//			height:200,
			border:false,
			itemId:'ne_form',
			xtype:'form',
			bodyPadding : 10,
			 fieldDefaults: {
				labelWidth: 120,
				labelAlign:'right',
				anchor: '70%',
//				width:300,
			 },
			items : [{
				xtype:'hiddenfield',
				name:'siteUuid',
		//		value:this.treeId,
			},{
				xtype:'hiddenfield',
				name:'domainUuid',
			},{
		    	name : 'productId',
				xtype: 'combo',
				ulan:'deviceType',
				mode: 'local',
				editable:false,
				fieldLabel: 'Type',
				displayField: 'name',
				valueField: 'value',
				queryMode: 'local',
				value: 1,
				store: Ext.create('Ext.data.Store', {
					fields : ['name', 'value'],
					data   : [
						{name : 'DWG',   value: '23'},
						{name : 'SIMBANK',  value: '31'},
						{name : 'DAG',  value: '17'},
						{name : 'MTG',  value: '1'},
					]
				}),
				value:'23',
				listeners:{
					change:function(field,newValue,oldValue,opts){
						var imgs = this.up('form').up('form').getComponent('imgs');
						var form = this.up('form').getForm();
						if(newValue=='31'){
							imgs.setSrc(Ext.get('resources').value+'/images/simbank200x200.png');
							form.findField('defaultGrpUuid').show();
							form.findField('policyUuid').hide();
						}else if(newValue=='23'){
							imgs.setSrc(Ext.get('resources').value+'/images/dwg200x200.png');
							form.findField('defaultGrpUuid').show();
							form.findField('policyUuid').show();
						}else if(newValue=='17'){
							imgs.setSrc(Ext.get('resources').value+'/images/ag200x200.png');
							form.findField('defaultGrpUuid').hide();
							form.findField('policyUuid').hide();
						}
						else if(newValue=='1'){
							imgs.setSrc(Ext.get('resources').value+'/images/ag200x200.png');
							form.findField('defaultGrpUuid').hide();
							form.findField('policyUuid').hide();
						}
						
					}
				}
		    },{
	            xtype: 'combo',
	            name: 'defaultGrpUuid',
	            fieldLabel: 'Default Group',
	            displayField : 'name',
	            editable:false,
				valueField : 'uuid',
				mode : 'local',
				queryMode : 'local',
				allowBlank:false,
				store:Ext.create("app.store.util.ComboxStore",{}),
				valueNotFoundText :""
	        },{
	            xtype: 'combo',
	            name: 'policyUuid',
	            mode : 'local',
	            editable:false,
	            fieldLabel: 'SIM Policy',
	            displayField : 'name',
				valueField : 'uuid',
				queryMode : 'local',
				allowBlank:false,
				store:Ext.create("app.store.util.ComboxStore",{}),
				valueNotFoundText :""
	        },{
				xtype : 'textareafield',
				fieldLabel : 'Description',
				name:'detailDesc',
//				margins : '0',
			}]
		}],
		buttons : [ {
			text : 'Cancel',
			ulan:'btCancel',
			handler : function() {
				this.up('form').getForm().reset();
				this.up('window').hide();
			}
		}, {
			text : 'Commit',
			ulan:'btCommit',
			handler : function() {
				var flag = 1;
				var gridStore = this.up('form').up('window').gridStore;
				var form = this.up('form').getForm();
				var win=this.up('window');
				if (form.isValid()) {
					var product_sn = this.up('form').getComponent('ne_form').getComponent('product_sn');
					var tmp = this.up('form').getComponent('ne_form').getComponent('device_alias');
					var confirm_password = this.up('form').getComponent('ne_form').getComponent('confirm_password');
					if(product_sn.getComponent('picture').flag!=1
							|| tmp.getComponent('picture').flag!=1
							|| confirm_password.getComponent('picture').flag!=1){
						return;
					}
					var siteUuid=form.findField('siteUuid').getValue();
					Ext.Ajax.request({
		        		url:'neManager!addNe.action',
		        		method:'POST',
		        		params:form.getValues(),
		        		callback: function (options, success, response) {
		                	var obj=Ext.JSON.decode(response.responseText);
									
	                    		if(obj['success']){
		                		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                		if(gridStore != null){
		                			gridStore.load();
		                		}
		                		form.reset();
		            			win.hide();
//		            			var store=Ext.getCmp('operationTree').getStore();
//		            			try{
//		            			    store.load({params: {needRefresh:1},});
//		            			}catch(e){
//		            			    store.load({params: {needRefresh:1},});
//		            			}
		            			treeFn.refreshNode('operationTree','site_'+siteUuid,null);
		                	}else{
		                		
		                		if(obj['msg']=="maxDevice"){
		                			Ext.MessageBox.alert(boxFailture,boxCommitFail+boxMaxNe);
		                		}else{
		                			Ext.MessageBox.alert(boxFailture,boxCommitFail);
		                		}
		                	}
		            	}
					});
	            
			}
	}
	}]
	});	
		this.items = [form];
		var tipId = this.id+'_productSn';
		var GeneralObj = Ext.getCmp('GeneralObj');
		if(GeneralObj == undefined){
			GeneralObj = Ext.create("app.util.GeneralObj",{});
		}
		var ne_form = form.getComponent('ne_form');
		var backup_name_field = Ext.create('Ext.form.field.Hidden',{
			value:'',
		});
		var container = GeneralObj.GeneralObjOfSN("product_sn"
				,"Device SN","productSn"
				,"product_sn_value",tipId,null,backup_name_field
				,"neManager!checkSn.action",form,30);
		var labelWidth = 120;
		var labelAlign = "right";
		container.down('textfield').labelWidth = labelWidth;
		container.down('textfield').labelAlign = labelAlign;
		ne_form.insert(3,container);
		
		var tipId1 = this.id+'_alias';
		var container1 = GeneralObj.GeneralObjOfName("device_alias"
				,"Device Name","alias"
				,"device_alias_value",tipId1,null,backup_name_field
				,"neManager!checkAlias.action",form,30);
		container1.down('textfield').ulan = 'neAlias';
		container1.down('textfield').labelWidth = labelWidth;
		container1.down('textfield').labelAlign = labelAlign;
		ne_form.insert(4,container1);
		
		var arr = GeneralObj.GeneralObjOfPwdArr("Password"
				,"Confirm Password","password",30,null);
		arr[0].ulan = 'password';
		arr[1].down('textfield').ulan = 'confirmPassword';
		arr[1].down('textfield').labelWidth = labelWidth;
		arr[1].down('textfield').labelAlign = labelAlign;
		ne_form.insert(7,arr[0]);
		ne_form.insert(8,arr[1]);
		this.callParent();
	},
	listeners:{
		beforehide:function(){
			this.down('form').getForm().reset();
		},
		beforeshow:function(){
			var ne_form = this.down('form').getComponent('ne_form');
			var tmp = "";
			var prefix = "<div "+tmp+">&nbsp;";
			var suffix  = "</div>"
			var str = "";	
			var product_sn = ne_form.getComponent('product_sn');
			product_sn.getComponent('picture').update(prefix+str+suffix);
			product_sn.getComponent('picture').flag = 2;
			
			var device_alias = ne_form.getComponent('device_alias');
			device_alias.getComponent('picture').update(prefix+str+suffix);
			device_alias.getComponent('picture').flag = 2;
			
			var confirm_password = ne_form.getComponent('confirm_password');
			confirm_password.getComponent('picture').update(prefix+str+suffix);
			confirm_password.getComponent('picture').flag = 1;
		}
	}
});

