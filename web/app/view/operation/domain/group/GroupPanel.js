Ext.define('app.view.operation.domain.group.GroupPanel',{
	extend:'Ext.panel.Panel',
	
//	id:'groupPanel',
	layout:'fit',
	hidden:true,
	border:false,
	autoScroll:true,
	domainUuid:'',
	treeId:'',
	initComponent: function(){
		var maintenance = 0;
		if(this.id.indexOf('maintenance') >= 0){
			maintenance = 1;
		}
		var store = Ext.create('app.store.operation.domain.group.GroupInfoStore',{});
		this.store = store;
		var groupName;
		if(maintenance){
			groupName = Ext.create('Ext.form.field.Text',{
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
			groupName = generalObj.createName('group_name'
					,75,25,'name','Name','#DFE9F6','groupManager!checkGroup.action',store);
			store.on('load',function(){
    			var picture = groupName.getComponent('picture');
    			picture.update("");
    			picture.flag = 2;
			});
		} 
		var groupTab1=Ext.create('Ext.form.Panel',{
			title:lanControll.getLanValue('tiGrpInfo'),
			border:false,
			itemId:'groupTab1',
			autoScroll:true,
			treeName:'',
			forceRefresh:0,
			bodyPadding: 5,
			
			store:store,
			bodyStyle: {
				background: '#DFE9F6',
			},
			fieldDefaults: {
	            labelAlign: 'left',
	            anchor: '90%',
	            labelWidth: 180,
	        },
			items: [{
				xtype:'hiddenfield',
				name:'selectCond',
				fieldLabel:'cond'
			},{
	        	xtype:'hiddenfield',
	        	name:'defaultFlag'
	        },{
				xtype:'hiddenfield',
				name:'uuid',
				itemId:'groupUuid'
			},{
				xtype:'hiddenfield',
				name:'domainUuid',
				itemId:'groupDomainUuid'
			},{	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Basic Info',
				ulan:'fsBasicInfo',
				itemId:'group_info',
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
			        items: [groupName,{
			        	xtype:'displayfield',
			        	width:60,
			        	rowspan:4,
			        },{
			    		xtype:'image',
			    		name:'imgs',
			    		rowspan: 4,
			            height: 140,
			    		width:140,
			    		border:false,
			    		fieldDefaults: {
			    			labelWidth: 100,
			    			anchor: '85%'
			    		 },
			    		src:Ext.get('resources').value+'/images/panel_logo/sim_group.png',
			    	
			        },{	
				    	xtype: 'textfield',
						name: 'alias',
						labelWidth: 180,
						fieldLabel: 'Alias',
						maxLength:31
					},{
			        	xtype: 'fieldcontainer',
			        	layout:'hbox',
			    		items:[rs.createAdminStatus(null,[1,2],adminSizeObj),{xtype: 'displayfield',width:10,value:'' },{
				            xtype: 'displayfield',
				            name: 'oprStatus',
				            ulan:'oprStatusSpec',
				            labelAlign: 'right',
				            labelWidth: 80,
				            fieldLabel: 'Opr',
				        },{xtype: 'displayfield',width:10,value:'' },{
				            xtype: 'displayfield',
				            name: 'runStatus',
				            ulan:'runStatusSpec',
				            fieldLabel: 'Run',
				            labelAlign: 'right',
				            labelWidth: 80,
				        }]
			     },{	
					xtype     : 'textareafield',
				    fieldLabel: 'Description',
					name      : 'detailDesc',
					labelWidth: 180,
		            height:50,
		            rows:1,
				}]
			     }]
			 }, {	
				 	xtype: 'fieldset',
					layout:'anchor',
					title:'Detail Info',
					ulan:'fsDetailInfo',
					itemId:'group_detail_info',
					fieldDefaults: {
			            labelAlign: 'left',
			            anchor: '75%',
			            labelWidth: 180,
			        },
					collapsible: true,
					collapsed:false,
					items:[{xtype:'checkbox',boxLabel: 'Init New SIM Card to Clear SIM Status and Statistics',boxLabelCls:'box_label', name: 'hbmInitSimFlag',inputValue:1,checked:true,},
					   {
						xtype     : 'radiogroup',
						name      : 'modTypeAll',
						fieldLabel: 'SIM Module Type',
						columns: 3,
						anchor:'65%',
						items: [
							{boxLabel: 'GSM',boxLabelCls:'box_label',ulan:'gsm', name: 'modType', inputValue: 0},
							{boxLabel: 'CDMA',boxLabelCls:'box_label',ulan:'cdma', name: 'modType', inputValue: 1 },
							{boxLabel: 'WCDMA',boxLabelCls:'box_label',ulan:'wcdma', name: 'modType', inputValue: 3 },
						]						
					},{
						xtype     : 'radiogroup',
						name      : 'defaultEncodeAll',
						ulan:'defEncode',
						fieldLabel: 'Default SMS Encode',
						columns: 3,
						anchor:'65%',
						items: [
							{boxLabel: 'UNICODE',boxLabelCls:'box_label',ulan:'unicode', name: 'defaultEncode', inputValue: 0},
							{boxLabel: 'ASCII',boxLabelCls:'box_label', ulan:'ascii',name: 'defaultEncode', inputValue: 1 },
						]						
					},{
			            xtype: 'combo',
			            name: 'zoneUuid',
			            anchor: '50%',
//				            id:'grpZoneUuid',
			            mode : 'local',
			            editable:false,
			            fieldLabel: 'Location Zone',
			            displayField : 'name',
						valueField : 'uuid',
						queryMode : 'local',
						store:Ext.create("app.store.util.ComboxStore",{}),
			        },{
			            xtype: 'textfield',
			            name: 'defaultSmsc',
			            anchor: '50%',
			            maxLength:31,
			            fieldLabel: 'Default SMSC',
			            validateOnChange:false,
				    	validator:function(val){return checkString(val,/^[\sA-Fa-f0-9,+]{0,31}$/)}
			        },{
			            xtype: 'textfield',
			            name: 'defaultProfile',
			            anchor: '75%',
			            maxLength:127,
			            fieldLabel: 'Default Profile',
			        },{xtype:'displayfield',anchor: '75%',value:'<hr/>'},{
			        	xtype:'combo',
		        	   name: 'hbmRoleType', 
		        	   mode: 'local',
		        	   fieldLabel: 'HBM Role Type', 
		        	   queryMode: 'local',
		        	   anchor: '50%',
		        	   editable:false,
		        	   displayField : 'name',
		        	   valueField : 'statusId',
		        	   width:280,
		        	   store : Ext.create('Ext.data.Store', {
							fields : [ 'name', 'statusId' ],
							data : [ {
								name : lanControll.getLanValue('hbmRoleType_'+0),
								statusId : 0
							}, {
								name : lanControll.getLanValue('hbmRoleType_'+1),
								statusId : 1
							}, {
								name : lanControll.getLanValue('hbmRoleType_'+2),
								statusId : 2
							}, {
								name : lanControll.getLanValue('hbmRoleType_'+3),
								statusId : 3
							} ]
						}),
						listeners:{
							change:function(field,newValue,oldValue,opts){
		           				var autoSms1=groupTab1.down('fieldcontainer[name=autoSms1]');
		           				var autoSms2=groupTab1.down('fieldcontainer[name=autoSms2]');
		           				var enableIMEI=groupTab1.down('fieldcontainer[name=enableIMEI]');
		           				var enableRoaming=groupTab1.down('fieldcontainer[name=enableRoaming]');
		           				var acdLimit=groupTab1.down('fieldcontainer[name=acdLimit]');
		           				var smsTest=groupTab1.down('fieldcontainer[name=smsTest]');
		           				var talkTest=groupTab1.down('fieldcontainer[name=talkTest]');
		           				var smsTemplate=groupTab1.down('fieldcontainer[name=smsTemplate]');
		           				var dtmfTemplate=groupTab1.down('fieldcontainer[name=dtmfTemplate]');
		           				var hbmTestGrpUuid=groupTab1.down('combo[name=hbmTestGrpUuid]');
		           				var hbmPromNextGrp=groupTab1.down('combo[name=hbmPromNextGrp]');
		           				var hbmMasterGrpUuid=groupTab1.down('combo[name=hbmMasterGrpUuid]');
		           				
						        var promLimitDetail=groupTab1.down('fieldset[name=promLimitDetail]');
						        
						        promLimitDetail.setDisabled(false);
						       
		           				if(newValue==0){
		           					hbmTestGrpUuid.setDisabled(false);
		           					hbmPromNextGrp.setDisabled(false);
		           					hbmMasterGrpUuid.setDisabled(true);
		           					promLimitDetail.setDisabled(true);
		           				}else if(newValue==1){
		           					hbmTestGrpUuid.setDisabled(true);
		           					hbmPromNextGrp.setDisabled(true);
		           					hbmMasterGrpUuid.setDisabled(true);
		           					promLimitDetail.setDisabled(true);
		           				}else if(newValue==2){
		           					hbmTestGrpUuid.setDisabled(false);
		           					hbmPromNextGrp.setDisabled(false);
		           					hbmMasterGrpUuid.setDisabled(false);
		           					
		           					if(hbmMasterGrpUuid.getValue()==0){
		           						promLimitDetail.setDisabled(false);
		           					}else{
		           						promLimitDetail.setDisabled(true);
		           					}
		           				}else if(newValue==3){
		           					hbmTestGrpUuid.setDisabled(false);
		           					hbmPromNextGrp.setDisabled(true);
		           					hbmMasterGrpUuid.setDisabled(true);
		           					promLimitDetail.setDisabled(false);
		           				}else{
		           					hbmTestGrpUuid.setDisabled(false);
		           					hbmPromNextGrp.setDisabled(false);
		           					hbmMasterGrpUuid.setDisabled(false);
		           					promLimitDetail.setDisabled(false);
		           				}
		           				
		           				
		           				
		           			}
		           		}
					},{
			            xtype: 'combo',
			            name: 'hbmPromNextGrp',
			            anchor: '50%',
			            ulan:'hbmNextWorkGrp',
			            fieldLabel: 'Next Working Group',
			            displayField : 'name',
						valueField : 'uuid',
						mode : 'local',
						queryMode : 'local',
						editable:false,
						store:Ext.create("app.store.util.ComboxStore",{}),
						valueNotFoundText :""
			        },{
			            xtype: 'combo',
			            name: 'hbmNextNobalGrp',
			            anchor: '50%',
			            fieldLabel: 'Next No_Balance Group',
			            displayField : 'name',
						valueField : 'uuid',
						mode : 'local',
						queryMode : 'local',
						editable:false,
						store:Ext.create("app.store.util.ComboxStore",{}),
						valueNotFoundText :""
			        },{
			            xtype: 'combo',
			            name: 'hbmNextBlockedGrp',
			            anchor: '50%',
			            fieldLabel: 'Next Blocked Group',
			            displayField : 'name',
						valueField : 'uuid',
						mode : 'local',
						queryMode : 'local',
						editable:false,
						store:Ext.create("app.store.util.ComboxStore",{}),
						valueNotFoundText :""
			        },{
			            xtype: 'combo',
			            name: 'hbmMasterGrpUuid',
			            anchor: '50%',
			            fieldLabel: 'Master Group',
			            displayField : 'name',
						valueField : 'uuid',
						mode : 'local',
						queryMode : 'local',
						editable:false,
						store:Ext.create("app.store.util.ComboxStore",{}),
						listeners:{
							change:function(field,newValue,oldValue,opts){
			        			var hbmRoleType=groupTab1.down('combo[name=hbmRoleType]');	
						        var promLimitDetail=groupTab1.down('fieldset[name=promLimitDetail]');
						        if(newValue==0&&hbmRoleType.getValue()==2){
						        	
							        promLimitDetail.setDisabled(false);
		           				}else if(hbmRoleType.getValue()==3){
		           					promLimitDetail.setDisabled(false);
		           				}else{
		           					promLimitDetail.setDisabled(true);
						        }
		           			}
		           		}
				    },{
			            xtype: 'combo',
			            name: 'hbmTestGrpUuid',
			            anchor: '50%',
			            fieldLabel: 'Testing Group',
			            displayField : 'name',
						valueField : 'uuid',
						mode : 'local',
						queryMode : 'local',
						editable:false,
						store:Ext.create("app.store.util.ComboxStore",{}),
						listeners:{
							change:function(field,newValue,oldValue,opts){
			        			var hbmSmsSpecNumber=groupTab1.down('textfield[name=hbmSmsSpecNumber]');	
			        			var hbmCallSpecNumber=groupTab1.down('textfield[name=hbmCallSpecNumber]');	
						        if(newValue==0){
						        	hbmSmsSpecNumber.setDisabled(false);
						        	hbmCallSpecNumber.setDisabled(false);
		           				}else{
		           					hbmSmsSpecNumber.setDisabled(true);
		           					hbmCallSpecNumber.setDisabled(true);
						        }
		           			}
		           		}
				    },{
			            xtype: 'combo',
			            name: 'paidGrpUuid',
			            anchor: '50%',
			            fieldLabel: 'Paid Group',
			            displayField : 'name',
						valueField : 'uuid',
						mode : 'local',
						queryMode : 'local',
						editable:false,
						store:Ext.create("app.store.util.ComboxStore",{}),
						valueNotFoundText :""
			        },
			        {xtype:'numberfield',fieldLabel: '<label onmouseover=moveOver("grp_max_work_sim_count",event) onmouseout=moveOut() class="tips_label">Max Work SIM Count</label>', name:'maxWorkSimCount',anchor: '50%',minValue:0,maxValue:1000000000 },
			        {xtype:'displayfield',anchor: '75%',value:'<hr>'},
					{
			            xtype: 'displayfield',
			            name: 'cardTotalCount',
			            fieldLabel: 'SIM Total Count',
			        },{
			            xtype: 'displayfield',
			            name: 'cardAvailableCount',
			            fieldLabel: 'SIM Available Count',
			        },{
			            xtype: 'displayfield',
			            name: 'cardIdleCount',
			            fieldLabel: 'SIM Idle Count',
			        }]
			},{
					xtype: 'fieldset',
					title: 'SIM Card Select Order',
					layout: 'anchor',
					ulan:'simSelectOrder',
					collapsible: true,
					collapsed: true,
					defaults: {
							anchor: '100%',
					},
					items: [{
						xtype     : 'radiogroup',
						name      : 'orderTypeAll',
						itemId:'orderTypeAll',
						ulan:'simSelectOrder',
						fieldLabel: 'Card Select Rule',
						columns: 2,
						items: [
							{boxLabel: 'Ascending',boxLabelCls:'box_label',ulan:'ascending', name: 'orderType', inputValue: 0},
							{boxLabel: 'Descending',boxLabelCls:'box_label',ulan:'descending', name: 'orderType', inputValue: 1 },
							{boxLabel: 'Random',boxLabelCls:'box_label',ulan:'random', name: 'orderType', inputValue: 2},
							{boxLabel: 'Max Unused Time',boxLabelCls:'box_label',ulan:'maxUnusedTime', name: 'orderType', inputValue: 7},
							{boxLabel: 'Min Call Time',boxLabelCls:'box_label',ulan:'minCallTime', name: 'orderType', inputValue: 3},
							{boxLabel: 'Max Call Time',boxLabelCls:'box_label',ulan:'maxCallTime', name: 'orderType', inputValue: 4},
							{boxLabel: 'Min Call Count',boxLabelCls:'box_label',ulan:'minCallCount', name: 'orderType', inputValue: 5},
							{boxLabel: 'Max Call Count',boxLabelCls:'box_label',ulan:'maxCallCount', name: 'orderType', inputValue: 6},
						],							
						allowBlank: false
					},
				]
			},{
					xtype: 'fieldset',
					title: 'SIM Card Switchover Condition',
					collapsible: true,
					collapsed: true,
					ulan:'fsSimSwitchover',
					fieldLabel: 'Card-switch Rule',
					items: [
						{
						   xtype: 'fieldcontainer',
//						   fieldLabel: 'Max Call Count Card',
						   layout:'hbox',
						   allowBlank: false,
						   items: [
								{xtype:'checkbox',boxLabel: 'Switchover by Max Call Count Card',boxLabelCls:'box_label',width:350,itemId:'maxCallCountCard1', name: 'maxCallCountCard1', inputValue:1,
									listeners:{
									change:function(field,newValue,oldValue,opts){
										this.up('fieldcontainer').getComponent('maxCallCountCard').setDisabled(oldValue);
									}
								}},
								{xtype:'numberfield',itemId:'maxCallCountCard', name: 'maxCallCountCard', value: 2000,decimalPrecision:0,width:160,minValue:0,maxValue:1000000000 },
								{xtype: 'displayfield',value:lanControll.getLanValues(['noBalanceSpec']," ",true)},
								]
						},
						{
							xtype: 'fieldcontainer',
//							fieldLabel: 'Max Call Count Once',
							layout:'hbox',
							
							allowBlank: false,
							items: [
							        {xtype:'checkbox',boxLabel: 'Switchover by Max Call Count Once',boxLabelCls:'box_label',width:350,itemId:'maxCallCountOnce1', name: 'maxCallCountOnce1', inputValue:2,
							        	listeners:{
							        	change:function(field,newValue,oldValue,opts){
							        		this.up('fieldcontainer').getComponent('maxCallCountOnce').setDisabled(oldValue);
							        }
							        }},
							        {xtype:'numberfield',itemId:'maxCallCountOnce', name: 'maxCallCountOnce',decimalPrecision:0, value: 2000,width:160,minValue:0,maxValue:1000000000 },
							        ]
						},{
							xtype: 'fieldcontainer',
							layout:'hbox',
							allowBlank: false,
							items: [
							        {xtype:'checkbox',boxLabel: 'Switchover by Max Call Count Day',boxLabelCls:'box_label',width:350,itemId:'maxCallCountDay1', name: 'maxCallCountDay1', inputValue:4,
							        	listeners:{
							        	change:function(field,newValue,oldValue,opts){
							        		this.up('fieldcontainer').getComponent('maxCallCountDay').setDisabled(oldValue);
							        }
							        }},
							        {xtype:'numberfield',itemId:'maxCallCountDay', name: 'maxCallCountDay',decimalPrecision:0, value: 2000,width:160,minValue:0,maxValue:1000000000 },
							        ]
						},{
							xtype: 'fieldcontainer',
							layout:'hbox',
							allowBlank: false,
							items: [
							        {xtype:'checkbox',boxLabel: 'Switchover by Max Call Count Month',boxLabelCls:'box_label',width:350,itemId:'maxCallCountMonth1', name: 'maxCallCountMonth1', inputValue:8,
							        	listeners:{
							        	change:function(field,newValue,oldValue,opts){
							        		this.up('fieldcontainer').getComponent('maxCallCountMonth').setDisabled(oldValue);
							        }
							        }},
							        {xtype:'numberfield',itemId:'maxCallCountMonth', name: 'maxCallCountMonth',decimalPrecision:0, value: 2000,width:160,minValue:0,maxValue:1000000000 },
							        ]
						},{
						   xtype: 'fieldcontainer',
//						   fieldLabel: 'Max Call Time Card',
						   layout:'hbox',
						   allowBlank: false,
						   items: [
								{xtype:'checkbox',boxLabel: 'Switchover by Max Call Time Card(min)',boxLabelCls:'box_label',width:350, name: 'maxCallTimeCard1',itemId:'maxCallTimeCard1',inputValue:16, 
									listeners:{
									change:function(field,newValue,oldValue,opts){
										this.up('fieldcontainer').getComponent('maxCallTimeCard').setDisabled(oldValue);
									}
								}},
								{xtype:'numberfield',name: 'maxCallTimeCard',itemId:'maxCallTimeCard', decimalPrecision:0,value: 200,width:160,minValue:0,maxValue:1000000000 },
								{xtype: 'displayfield',value:lanControll.getLanValues(['noBalanceSpec'],",",true)},
								]
						},
						{
							   xtype: 'fieldcontainer',
//							   fieldLabel: 'Max Call Time Once',
							   layout:'hbox',
							   allowBlank: false,
							   items: [
									{xtype:'checkbox',boxLabel: 'Switchover by Max Call Time Once(min)',boxLabelCls:'box_label',width:350, name: 'maxCallTimeOnce1',itemId:'maxCallTimeOnce1',inputValue:32,
										listeners:{
										change:function(field,newValue,oldValue,opts){
											this.up('fieldcontainer').getComponent('maxCallTimeOnce').setDisabled(oldValue);
										}
									}},
									{xtype:'numberfield',itemId:'maxCallTimeOnce', name: 'maxCallTimeOnce',decimalPrecision:0, value: 50,width:160 ,minValue:0,maxValue:1000000000},
									]
							},
						{
						   xtype: 'fieldcontainer',
//						   fieldLabel: 'Max Call Time Day',
						   layout:'hbox',
						   allowBlank: false,
						   items: [
								{xtype:'checkbox',boxLabel: 'Switchover by Max Call Time Day(min)',boxLabelCls:'box_label',width:350, name: 'maxCallTimeDay1',itemId:'maxCallTimeDay1',inputValue:64,
									listeners:{
									change:function(field,newValue,oldValue,opts){
										this.up('fieldcontainer').getComponent('maxCallTimeDay').setDisabled(oldValue);
									}
								}},
								{xtype:'numberfield',name: 'maxCallTimeDay',itemId:'maxCallTimeDay',decimalPrecision:0, value: 900,width:160 ,minValue:0,maxValue:1000000000},
								]
						},
						{
							   xtype: 'fieldcontainer',
//							   fieldLabel: 'Max Call Time Month',
							   layout:'hbox',
							   allowBlank: false,
							   items: [
									{xtype:'checkbox',boxLabel: 'Switchover by Max Call Time Month(min)',boxLabelCls:'box_label',width:350, name: 'maxCallTimeMonth1',itemId:'maxCallTimeMonth1',inputValue:128,
										listeners:{
										change:function(field,newValue,oldValue,opts){
											this.up('fieldcontainer').getComponent('maxCallTimeMonth').setDisabled(oldValue);
										}
									}},
									{xtype:'numberfield',name: 'maxCallTimeMonth',itemId:'maxCallTimeMonth',decimalPrecision:0, value: 900,width:160 ,minValue:0,maxValue:1000000000},
									]
						},{
							   xtype: 'fieldcontainer',
//							   fieldLabel: 'Max SMS Count Card',
							   layout:'hbox',
							   allowBlank: false,
							   items: [
									{xtype:'checkbox',boxLabel: 'Switchover by Max SMS Count Card', boxLabelCls:'box_label',width:350,name: 'maxSmsCountCard1',itemId:'maxSmsCountCard1', inputValue:256,
										listeners:{
										change:function(field,newValue,oldValue,opts){
											this.up('fieldcontainer').getComponent('maxSmsCountCard').setDisabled(oldValue);
										}
									}},
									{xtype:'numberfield',name: 'maxSmsCountCard',itemId:'maxSmsCountCard',decimalPrecision:0, value:900,width:160,minValue:0,maxValue:1000000000 },
									{xtype: 'displayfield',value:lanControll.getLanValues(['noBalanceSpec']," ",true)},
									]
							},
							{
								xtype: 'fieldcontainer',
//								fieldLabel: 'Max SMS Count Once',
								layout:'hbox',
								allowBlank: false,
								items: [
								        {xtype:'checkbox',boxLabel: 'Switchover by Max SMS Count Once',boxLabelCls:'box_label',width:350, name: 'maxSmsCountOnce1',itemId:'maxSmsCountOnce1', inputValue:512,
								        	listeners:{
								        	change:function(field,newValue,oldValue,opts){
								        		this.up('fieldcontainer').getComponent('maxSmsCountOnce').setDisabled(oldValue);
								        }
								        }},
								        {xtype:'numberfield',name: 'maxSmsCountOnce',itemId:'maxSmsCountOnce',decimalPrecision:0, value:900,width:160,minValue:0,maxValue:1000000000 },
								        ]
							},
							{
								   xtype: 'fieldcontainer',
//								   fieldLabel: 'Max SMS Count Day',
								   layout:'hbox',
								   allowBlank: false,
								   items: [
										{xtype:'checkbox',boxLabel: 'Switchover by Max SMS Count Day',boxLabelCls:'box_label',width:350, name: 'maxSmsCountDay1',itemId:'maxSmsCountDay1',inputValue:1024,
											listeners:{
											change:function(field,newValue,oldValue,opts){
												this.up('fieldcontainer').getComponent('maxSmsCountDay').setDisabled(oldValue);
											}
										}},
										{xtype:'numberfield',name: 'maxSmsCountDay',itemId:'maxSmsCountDay',decimalPrecision:0, value:900,width:160 ,minValue:0,maxValue:1000000000},
										]
							},
							{
								   xtype: 'fieldcontainer',
//								   fieldLabel: 'Max SMS Count Month',
								   layout:'hbox',
								   allowBlank: false,
								   items: [
										{xtype:'checkbox',boxLabel: 'Switchover by Max SMS Count Month',boxLabelCls:'box_label',width:350,itemId:'maxSmsCountMonth1', name: 'maxSmsCountMonth1',inputValue:2048,
										listeners:{
											change:function(field,newValue,oldValue,opts){
												this.up('fieldcontainer').getComponent('maxSmsCountMonth').setDisabled(oldValue);
											}
										}},
										{xtype:'numberfield',itemId:'maxSmsCountMonth',name: 'maxSmsCountMonth',decimalPrecision:0, value:900,width:160,minValue:0,maxValue:1000000000 },
										],
									
							},{
								   xtype: 'fieldcontainer',
//								   fieldLabel: 'Max SMS Count Month',
								   layout:'hbox',
								   allowBlank: false,
								   items: [
										{xtype:'checkbox',boxLabel: 'Switchover by Max USSD Count Card',boxLabelCls:'box_label',width:350,itemId:'maxUssdCountCard1', name: 'maxUssdCountCard1',inputValue:4096,
										listeners:{
											change:function(field,newValue,oldValue,opts){
												this.up('fieldcontainer').getComponent('maxUssdCountCard').setDisabled(oldValue);
											}
										}},
										{xtype:'numberfield',itemId:'maxUssdCountCard',name: 'maxUssdCountCard',decimalPrecision:0, value:900,width:160,minValue:0,maxValue:1000000000 },
										{xtype: 'displayfield',value:lanControll.getLanValues(['noBalanceSpec']," ",true)},
										],
									
							},{
								   xtype: 'fieldcontainer',
//								   fieldLabel: 'Max SMS Count Month',
								   layout:'hbox',
								   allowBlank: false,
								   items: [
										{xtype:'checkbox',boxLabel: 'Switchover by Max USSD Count Once',boxLabelCls:'box_label',width:350,itemId:'maxUssdCountOnce1', name: 'maxUssdCountOnce1',inputValue:8192,
										listeners:{
											change:function(field,newValue,oldValue,opts){
												this.up('fieldcontainer').getComponent('maxUssdCountOnce').setDisabled(oldValue);
											}
										}},
										{xtype:'numberfield',itemId:'maxUssdCountOnce',name: 'maxUssdCountOnce',decimalPrecision:0, value:900,width:160,minValue:0,maxValue:1000000000 },
										],
									
							},{
								   xtype: 'fieldcontainer',
//								   fieldLabel: 'Max SMS Count Month',
								   layout:'hbox',
								   allowBlank: false,
								   items: [
										{xtype:'checkbox',boxLabel: 'Switchover by Max USSD Count Day',boxLabelCls:'box_label',width:350,itemId:'maxUssdCountDay1', name: 'maxUssdCountDay1',inputValue:16384,
										listeners:{
											change:function(field,newValue,oldValue,opts){
												this.up('fieldcontainer').getComponent('maxUssdCountDay').setDisabled(oldValue);
											}
										}},
										{xtype:'numberfield',itemId:'maxUssdCountDay',name: 'maxUssdCountDay',decimalPrecision:0, value:900,width:160,minValue:0,maxValue:1000000000 },
										],
									
							},{
								   xtype: 'fieldcontainer',
//								   fieldLabel: 'Max SMS Count Month',
								   layout:'hbox',
								   allowBlank: false,
								   items: [
										{xtype:'checkbox',boxLabel: 'Switchover by Max USSD Count Month',boxLabelCls:'box_label',width:350,itemId:'maxUssdCountMonth1', name: 'maxUssdCountMonth1',inputValue:32768,
										listeners:{
											change:function(field,newValue,oldValue,opts){
												this.up('fieldcontainer').getComponent('maxUssdCountMonth').setDisabled(oldValue);
											}
										}},
										{xtype:'numberfield',itemId:'maxUssdCountMonth',name: 'maxUssdCountMonth',decimalPrecision:0, value:900,width:160,minValue:0,maxValue:1000000000 },
										],
									
							},{
								   xtype: 'fieldcontainer',
								   layout:'hbox',
								   allowBlank: false,
								   items: [
										{xtype:'checkbox',boxLabel: 'Switchover by Max Group Time Card(min)',boxLabelCls:'box_label',width:350, name: 'maxGroupTimeCard1',itemId:'maxGroupTimeCard1', inputValue:8388608,
											listeners:{
											change:function(field,newValue,oldValue,opts){
												this.up('fieldcontainer').getComponent('maxGroupTimeCard').setDisabled(oldValue);
										}
									}},
										{xtype:'numberfield',name: 'maxGroupTimeCard',itemId:'maxGroupTimeCard',decimalPrecision:0, value: 30,width:160,minValue:0,maxValue:1000000000 },
										{xtype: 'displayfield',value:lanControll.getLanValues(['noBalanceSpec'],",",true)},
										]
							},{
								   xtype: 'fieldcontainer',
								   layout:'hbox',
								   allowBlank: false,
								   items: [
										{xtype:'checkbox',boxLabel: 'Switchover by Max Work Time Card(min)',boxLabelCls:'box_label',width:350, name: 'maxWorkTimeCard1',itemId:'maxWorkTimeCard1', inputValue:4194304,
											listeners:{
											change:function(field,newValue,oldValue,opts){
												this.up('fieldcontainer').getComponent('maxWorkTimeCard').setDisabled(oldValue);
										}
									}},
										{xtype:'numberfield',name: 'maxWorkTimeCard',itemId:'maxWorkTimeCard',decimalPrecision:0, value: 30,width:160,minValue:0,maxValue:1000000000 },
										{xtype: 'displayfield',value:lanControll.getLanValues(['noBalanceSpec'],",",true)},
										]
							},{
								   xtype: 'fieldcontainer',
//								   fieldLabel: 'Max Work Time Once',
								   layout:'hbox',
								   allowBlank: false,
								   items: [
										{xtype:'checkbox',boxLabel: 'Switchover by Max Work Time Once(min)',boxLabelCls:'box_label',width:350, name: 'maxWorkTimeOnce1',itemId:'maxWorkTimeOnce1', inputValue:65536,
											listeners:{
											change:function(field,newValue,oldValue,opts){
												this.up('fieldcontainer').getComponent('maxWorkTimeOnce').setDisabled(oldValue);
										}
									}},
										{xtype:'numberfield',name: 'maxWorkTimeOnce',itemId:'maxWorkTimeOnce',decimalPrecision:0, value: 30,width:160,minValue:0,maxValue:1000000000 },
										]
							},
						{
							   xtype: 'fieldcontainer',
//							   fieldLabel: 'Max Idle Time Once',
							   layout:'hbox',
							   allowBlank: false,
							   items: [
									{xtype:'checkbox',boxLabel: 'Switchover by Min Break Time Once(min)',boxLabelCls:'box_label',width:350, name: 'maxIdleTimeOnce1',itemId:'maxIdleTimeOnce1',inputValue:131072, 
										listeners:{
										change:function(field,newValue,oldValue,opts){
											this.up('fieldcontainer').getComponent('maxIdleTimeOnce').setDisabled(oldValue);
										}
									}},
									{xtype:'numberfield',name: 'maxIdleTimeOnce', itemId:'maxIdleTimeOnce',decimalPrecision:0,value: 30,width:160 ,minValue:0,maxValue:1000000000},
									]
						},
						{
							xtype: 'fieldcontainer',
							layout:'hbox',
							allowBlank: false,
							items: [
							        {xtype:'checkbox',boxLabel: 'Switchover by Promotion Working Time(min)',boxLabelCls:'box_label',width:350, name: 'maxPromTimeCard1',itemId:'maxPromTimeCard1',inputValue:262144, 
							        	listeners:{
							        	change:function(field,newValue,oldValue,opts){
							        	this.up('fieldcontainer').getComponent('maxPromTimeCard').setDisabled(oldValue);
							        }
							        }},
							        {xtype:'numberfield',name: 'maxPromTimeCard', itemId:'maxPromTimeCard',decimalPrecision:0,value: 30,width:160 ,minValue:0,maxValue:1000000000},
							        {xtype: 'displayfield',value:lanControll.getLanValues(['noBalanceSpec'],",",true)},
							        ]
						},
						{
							xtype: 'fieldcontainer',
							layout:'hbox',
							allowBlank: false,
							items: [
							        {xtype:'checkbox',boxLabel: 'Switchover by Promotion Call Time(min)',boxLabelCls:'box_label',width:350, name: 'maxPromTimeCall1',itemId:'maxPromTimeCall1',inputValue:1048576, 
							        	listeners:{
							        	change:function(field,newValue,oldValue,opts){
							        	this.up('fieldcontainer').getComponent('maxPromTimeCall').setDisabled(oldValue);
							        }
							        }},
							        {xtype:'numberfield',name: 'maxPromTimeCall', itemId:'maxPromTimeCall',decimalPrecision:0,value: 30,width:160 ,minValue:0,maxValue:1000000000},
							        {xtype: 'displayfield',value:lanControll.getLanValues(['noBalanceSpec'],",",true)},
							        ]
						},
						{
							xtype: 'fieldcontainer',
							layout:'hbox',
							allowBlank: false,
							items: [
							        {xtype:'checkbox',boxLabel: 'Switchover by Max SIM Register Failure',boxLabelCls:'box_label',width:350, name: 'maxRegFailCard1',itemId:'maxRegFailCard1',inputValue:524288, 
							        	listeners:{
							        	change:function(field,newValue,oldValue,opts){
							        	this.up('fieldcontainer').getComponent('maxRegFailCard').setDisabled(oldValue);
							        }
							        }},
							        {xtype:'numberfield',name: 'maxRegFailCard', itemId:'maxRegFailCard',decimalPrecision:0,value: 30,width:160 ,minValue:0,maxValue:1000000000},
							        {xtype: 'displayfield',value:lanControll.getLanValues(['blocked']," ",true)},
							        ]
						},
						{
							xtype: 'fieldcontainer',
							layout:'hbox',
							allowBlank: false,
							items: [
							        {xtype:'checkbox',boxLabel: '<label onmouseover=moveOver("grp_maxNoBalanceWait1",event) onmouseout=moveOut() class="tips_label">Switchover by BALANCE_CHECK Delay(min)</label>',boxLabelCls:'box_label',width:350, name: 'maxNoBalanceWait1',itemId:'maxNoBalanceWait1',inputValue:2097152, 
							        	listeners:{
								        	change:function(field,newValue,oldValue,opts){
								        		this.up('fieldcontainer').getComponent('maxNoBalanceWait').setDisabled(oldValue);
								        	}
							        	}
							        },
							        {xtype:'numberfield',name: 'maxNoBalanceWait', itemId:'maxNoBalanceWait',decimalPrecision:0,value: 30,width:160 ,minValue:0,maxValue:1000000000},
							        ]
						},{
							xtype: 'fieldcontainer',
							layout:'hbox',
							allowBlank: false,
							items: [{xtype: 'displayfield',value:lanControll.getLanValue('lowBalanceSwitchMode1'),width:350},
					        {
							   xtype:'combo', name: 'lowBalanceSwitchMode', 
				        	   mode: 'local',queryMode: 'local',editable:false,displayField : 'name',valueField : 'statusId', width:160 ,
				        	   store : Ext.create('Ext.data.Store', {
									fields : [ 'name', 'statusId' ],
									data : [ {
										name : lanControll.getLanValue('lowBalanceSwitchMode_'+0),
										statusId : 0
									}, {
										name : lanControll.getLanValue('lowBalanceSwitchMode_'+1),
										statusId : 1
									}, {
										name : lanControll.getLanValue('lowBalanceSwitchMode_'+2),
										statusId : 2
									} ]
								}),
								listeners:{
									change:function(field,newValue,oldValue,opts){
										var maxNoBalanceWait1=groupTab1.down('checkbox[name=maxNoBalanceWait1]');	
					        			var maxNoBalanceWait=groupTab1.down('numberfield[name=maxNoBalanceWait]');	
								        if(newValue==1){
								        	maxNoBalanceWait1.setValue(1);
								        	maxNoBalanceWait1.setReadOnly(true);
//								        	maxNoBalanceWait.setValue(1);
				           				}else{
				           					maxNoBalanceWait1.setValue(0);
//				           					maxNoBalanceWait.setValue(0);
								        }
				           			}
				           		}
					         }
							]
						},
						{
							xtype: 'fieldcontainer',
							layout:'hbox',
							allowBlank: false,
							items: [{xtype: 'displayfield',value:lanControll.getLanValue('grpNotAvailableSwitch1'),width:350},
							        {
										xtype:'combo', name: 'grpNotAvailableSwitch', 
										mode: 'local',queryMode: 'local',editable:false,displayField : 'name',valueField : 'statusId', width:160 ,
										store : Ext.create('Ext.data.Store', {
											fields : [ 'name', 'statusId' ],
											data : [ {
												name : lanControll.getLanValue('yesOrNo_'+0),
												statusId : 0
											}, {
												name : lanControll.getLanValue('yesOrNo_'+1),
												statusId : 1
											} ]
										}),
								
							        }
							]
						},
						
					]},	
					{
						xtype: 'fieldset',
						title: 'SIM Statistics Conditions',
						layout: 'anchor',
						ulan:'fsSimStatistics',
						collapsible: true,
						collapsed: true,
						items: [{
							name: 'maxCallDiscardFail', 
							xtype:'checkbox',
				            inputValue:1,
				            boxLabel:'<label onmouseover=moveOver("grp_maxCallDiscardFail",event) onmouseout=moveOut() class="tips_label">Do not increase Statistics Data for Failure Call Record</label>',
			    			boxLabelCls:'box_label'
						},{
							xtype: 'radiogroup',
							name: 'maxCallDirectionAll',
							ulan:'callDirection',
							width:560,
							fieldLabel: 'Direction',
							columns: 3,
							anchor: '65%',
							items: [
								{boxLabel: 'CALL_IN&nbsp;',boxLabelCls:'box_label',ulan:'callDirection_0', name: 'maxCallDirection', inputValue: 0},
								{boxLabel: 'CALL_OUT&nbsp;&nbsp;',boxLabelCls:'box_label',ulan:'callDirection_1', name: 'maxCallDirection', inputValue: 1},
								{boxLabel: 'CALL_DUAL&nbsp;',boxLabelCls:'box_label',ulan:'callDirection_2', name: 'maxCallDirection', inputValue: 2},
							]						
						},
						{xtype:'numberfield',fieldLabel: 'Billing Increment(sec)', name: 'minCallBillingSec',decimalPrecision:0,anchor: '40%', value: 30,minValue:0,maxValue:999},
						{xtype:'numberfield',fieldLabel: 'Billing Period Unit(sec)', name: 'minCallBilling02',decimalPrecision:0,anchor: '40%', value: 30,minValue:0,maxValue:999},
						{xtype:'displayfield',name:'space1'},
							{
								name: 'maxSmsDiscardFail', 
								xtype:'checkbox',
					            inputValue:1,
					            boxLabel:'<label onmouseover=moveOver("grp_maxSmsDiscardFail",event) onmouseout=moveOut() class="tips_label">Do not increase Statistics Data for Failure SMS Record</label>',
				    			boxLabelCls:'box_label'
							},{
								xtype: 'radiogroup',
								name: 'maxSmsDirectionAll',
								width:560,
								ulan:'smsDirection',
								fieldLabel: 'Direction',
								columns: 3,
								anchor: '65%',
								
								items: [
									{boxLabel: 'SMS_RECV&nbsp;',boxLabelCls:'box_label',ulan:'smsDirection_0', name: 'maxSmsDirection', inputValue: 0},
									{boxLabel: 'SMS_SEND&nbsp;&nbsp;',boxLabelCls:'box_label',ulan:'smsDirection_1', name: 'maxSmsDirection', inputValue: 1},
									{boxLabel: 'SMS_DUAL&nbsp;',boxLabelCls:'box_label',ulan:'smsDirection_2', name: 'maxSmsDirection', inputValue: 2},
								]						
							},{xtype:'displayfield',name:'space2'},
							{
								name: 'maxUssdDiscardFail',
								xtype:'checkbox',
					            inputValue:1,
					            boxLabel:'<label onmouseover=moveOver("grp_maxUssdDiscardFail",event) onmouseout=moveOut() class="tips_label">Do not increase Statistics Data for Failure USSD Record</label>',
				    			boxLabelCls:'box_label'
							},{
								xtype: 'radiogroup',
								name: 'maxUssdDirectionAll',
								ulan:'ussdDirection',
								width:560,
								fieldLabel: 'Direction',
								columns: 3,
								anchor: '65%',
								items: [
									{boxLabel: 'USSD_RECV&nbsp;',boxLabelCls:'box_label',ulan:'ussdDirection_0', name: 'maxUssdDirection', inputValue: 0},
									{boxLabel: 'USSD_SEND&nbsp;&nbsp;',boxLabelCls:'box_label',ulan:'ussdDirection_1', name: 'maxUssdDirection', inputValue: 1},
									{boxLabel: 'USSD_DUAL&nbsp;&nbsp;',boxLabelCls:'box_label',ulan:'ussdDirection_2', name: 'maxUssdDirection', inputValue: 2},
								]						
							}]
					},
					// HumanBeing Behavior Management
					{
						 
						xtype: 'fieldset',
						title: 'SIM Advanced Actions',
						ulan:'fsSimAdvanced',
						layout: 'anchor',
						fieldDefaults: {
				            labelAlign: 'left',
				            anchor: '100%',
				            labelWidth: 180,
				       },
						collapsible: true,
						collapsed: true,
						items: [
							{
								xtype     : 'radiogroup',
								name      : 'hbmImeiFlagAll',
								fieldLabel: '<label onmouseover=moveOver("grp_hbmImeiFlag",event) onmouseout=moveOut() class="tips_label">IMEI Assignment Mode</label>',
								columns: 3,
								anchor:'65%',
								items: [
									{boxLabel: 'NULL',boxLabelCls:'box_label',ulan:'nall', name: 'hbmImeiFlag',id:'hbmImeiFlag0', inputValue: 0},
									{boxLabel: 'EACH_LOAD',boxLabelCls:'box_label',ulan:'eachLoad', name: 'hbmImeiFlag',id:'hbmImeiFlag1', inputValue: 1 },
									{boxLabel: 'EACH_BIND',boxLabelCls:'box_label',ulan:'eachBind', name: 'hbmImeiFlag',id:'hbmImeiFlag2', inputValue: 2 },
								],
								loadFlag:false,
								listeners:{
									change:function(field,newValue,oldValue,opts){
								    	var hbmImeiFlag1=Ext.getCmp('hbmImeiFlag1').getValue();
								    	var hbmImeiFlag2=Ext.getCmp('hbmImeiFlag2').getValue();
								    	if(field.loadFlag){
							    			if(hbmImeiFlag1 || hbmImeiFlag2){
							    				var vendId=Ext.get('vendorId').value;
							    				var temp="";
							    				if(vendId=="2" || vendId=="102"){
							    					temp="DINSTAR";
							    				}else if(vendId=="3" || vendId=="103"){
							    					temp="CHANGYOU";
							    				}else{
							    					temp="UCSPEED";
							    				}
							    				boxImeiAssignment = lanControll.getLanValue("boxImeiAssignment_1");
							    				boxImeiAssignment = boxImeiAssignment.replace("UCSPEED",temp);
							    				boxImeiAssignment = boxImeiAssignment.replace("UCSPEED",temp);
							    				boxImeiAssignment = boxImeiAssignment.replace("UCSPEED",temp);
							    				Ext.MessageBox.alert(boxPromotion,"<pre>"+boxImeiAssignment+"</pre>");
									    	}else{
									    	}
								    	}
									}
								}
							},{
							    xtype: 'textfield',
							    name: 'hbmImeiTacs',
							    anchor: '75%',
							    maxLength:127,
							    fieldLabel: '<label onmouseover=moveOver("imei_tac",event) onmouseout=moveOut() class="tips_label">Specific IMEI TACs</label>',
							    validateOnChange:false,
						    	validator:function(val){
									var vs=val.split(',');
									if(val==''){
										return true;
									}else{
										for(var i=0;i<vs.length;i++){
											if(checkString(vs[i],/^[A-Fa-f0-9,]{8}$/)==true){
												continue;
											}else{
												return 'TAC must be eight chars';
											}
										}
									}
									return true;
//									return checkString(val,/^[A-Fa-f0-9,]{0,127}$/)
								}
							},{
							    xtype: 'numberfield',
							    name: 'hbmImeiMinSn',
							    anchor: '45%',
							    minValue:0,maxValue:999999,
							    fieldLabel: 'Min IMEI Serial No',
							},{
							    xtype: 'numberfield',
							    name: 'hbmImeiMaxSn',
							    anchor: '45%',
							    minValue:0,maxValue:999999,
							    fieldLabel: 'Max IMEI Serial No',
							},
							{xtype:'displayfield',anchor: '75%',value:'<hr>'},
							{xtype:'checkbox',boxLabel: '<label onmouseover=moveOver("grp_hbmRoamingFlag",event) onmouseout=moveOut() class="tips_label">Force SIM Site Roaming after each switchover, DWG device MUST be running at different sites!</label>',boxLabelCls:'box_label', name: 'hbmRoamingFlag',inputValue:1,checked:true,},
							{xtype:'displayfield',anchor: '75%',value:'<hr>'},
						    {
								xtype: 'fieldcontainer',
								layout:'column',
								items: [
										{xtype:'textfield',anchor: '45%',width:325,labelWidth: 180,fieldLabel: 'Number Cut Prefix',name: 'hbmNumberPrefix',maxLength:7,},
										{xtype: 'displayfield',value:'',width:15},
										{xtype:'textfield',anchor: '45%', labelWidth: 130,labelAlign:'right',width:285,fieldLabel: 'Number Add Prefix',name: 'newNumberPrefix',anchor: '50%',maxLength:7,},
								        ]
							},
							{xtype:'displayfield',anchor: '75%',value:'<hr>'},
							{
								   name : 'autoSms1',
								   xtype: 'fieldcontainer',
								   layout:'anchor',
								   fieldDefaults: {
							            labelAlign: 'left',
							            anchor: '83%',
							            labelWidth: 180,
							       },	
								   items: [
								           	{xtype:'checkbox',boxLabel:'Auto Send SMS/USSD after SIM REG-OK',boxLabelCls:'box_label',name: 'hbmSmsAfterReg',inputValue:1,checked:true,
								           		listeners:{
													change:function(field,newValue,oldValue,opts){
								           				var hbmSmsNumber01=groupTab1.down('textfield[name=hbmSmsNumber01]');
								           				var hbmSmsContent01=groupTab1.down('textfield[name=hbmSmsContent01]');
								           				var sendTypeAfterRegisterAll=groupTab1.down('radiogroup[name=sendTypeAfterRegisterAll]');
								           				
								           				if(newValue){
								           					hbmSmsNumber01.setDisabled(false);
								           					hbmSmsContent01.setDisabled(false);
								           					sendTypeAfterRegisterAll.setDisabled(false);
								           				}else{
								           					hbmSmsNumber01.setDisabled(true);
								           					hbmSmsContent01.setDisabled(true);
								           					sendTypeAfterRegisterAll.setDisabled(true);
								           				}
								           			}
							           			}
								           	},
								           	{xtype:'checkbox',boxLabel:'<label onmouseover=moveOver("grp_hbmOnceAfterReg",event) onmouseout=moveOut() class="tips_label">Only If SIM Number was NULL, for Learning Number of SIM Card</label>',boxLabelCls:'box_label',name: 'hbmOnceAfterReg',inputValue:1},
								           	{
												xtype: 'radiogroup',
												name: 'sendTypeAfterRegisterAll',
												ulan:'sendType',
												fieldLabel: 'Send Type',
												columns: 3,
												anchor: '65%',
												items: [
													{boxLabel: 'SMS&nbsp;',boxLabelCls:'box_label',ulan:'sms', name: 'hbmModeAfterReg', inputValue: 0,
													},
													{boxLabel: 'USSD&nbsp;&nbsp;',boxLabelCls:'box_label',ulan:'ussd', name: 'hbmModeAfterReg', inputValue: 1,
														listeners:{
															change:function(field,newValue,oldValue,opts){
														    	var hbmSmsNumber01=groupTab1.down('textfield[name=hbmSmsNumber01]');
												    			if(newValue){
												    				hbmSmsNumber01.setDisabled(true);
														    	}else{
														    		hbmSmsNumber01.setDisabled(false);
														    	}
															}
														}
													},
												]						
											},
											{xtype:'textfield',anchor: '50%',fieldLabel:'Send Number',ulan:'sendNum',name:'hbmSmsNumber01',maxLength:24,disabled:true},
											{xtype:'textfield',fieldLabel:'Send Content',ulan:'sendContent',name:'hbmSmsContent01',maxLength:63},
										]
							},{xtype:'displayfield',anchor: '75%',value:'<hr>'},{
								name : 'autoSms2',
								xtype: 'fieldcontainer',
								layout:'anchor',
								fieldDefaults: {
						            labelAlign: 'left',
						            anchor: '83%',
						            labelWidth: 180,
						        },
								items: [
								        {xtype:'checkbox',boxLabel:'Auto Send SMS/USSD at the End of Call', boxLabelCls:'box_label',width:300,name: 'hbmSmsAfterCall',inputValue:1, checked:true,
								        	listeners:{
									        	change:function(field,newValue,oldValue,opts){
										        	var hbmSmsNumber02=groupTab1.down('textfield[name=hbmSmsNumber02]');
										        	var hbmSmsContent02=groupTab1.down('textfield[name=hbmSmsContent02]');
										        	var sendTypeAfterCallAll=groupTab1.down('radiogroup[name=sendTypeAfterCallAll]');
										        	
										        	if(newValue){
										        		hbmSmsNumber02.setDisabled(false);
										        		hbmSmsContent02.setDisabled(false);
										        		sendTypeAfterCallAll.setDisabled(false);
										        	}else{
										        		hbmSmsNumber02.setDisabled(true);
										        		hbmSmsContent02.setDisabled(true);
										        		sendTypeAfterCallAll.setDisabled(true);
										        	}
									        	}
								        	}
								        },{
											xtype: 'radiogroup',
											name: 'sendTypeAfterCallAll',
											fieldLabel: 'Send Type',
											ulan:'sendType',
											columns: 3,
											anchor: '65%',
											items: [
												{boxLabel: 'SMS&nbsp;',boxLabelCls:'box_label',ulan:'sms', name: 'hbmModeAfterCall', inputValue: 0,
												},
												{boxLabel: 'USSD&nbsp;&nbsp;',boxLabelCls:'box_label',ulan:'ussd', name: 'hbmModeAfterCall', inputValue: 1,
													listeners:{
														change:function(field,newValue,oldValue,opts){
													    	var hbmSmsNumber02=groupTab1.down('textfield[name=hbmSmsNumber02]');
											    			if(newValue){
											    				hbmSmsNumber02.setDisabled(true);
													    	}else{
													    		hbmSmsNumber02.setDisabled(false);
													    	}
														}
													}
												},
											]						
										},
								        {xtype:'textfield',anchor: '50%',fieldLabel:'Send Number',ulan:'sendNum',name:'hbmSmsNumber02',maxLength:24,disabled:true},
								        {xtype:'textfield',fieldLabel:'Send Content',ulan:'sendContent',name:'hbmSmsContent02',maxLength:63},
								        ]
							}
								           
					]	
						
					},{
						xtype: 'fieldset',
						title: 'Human Behavior - Abnormal CDR Monitor',
						name:'cdrMonitor',
						layout:'auto',
						fieldDefaults: {
				            labelAlign: 'left',
				            labelWidth: 180,
				            width:300,
				       },
						collapsible: true,
						collapsed: true,
						items: [{xtype:'checkbox',boxLabel:'<label onmouseover=moveOver("grp_hbmAcdFlag",event) onmouseout=moveOut() class="tips_label">Enable Abnormal CDR/SMS Monitor</label>',boxLabelCls:'box_label',width:300, name: 'hbmAcdFlag',inputValue:1,checked:true,
					           		listeners:{
										change:function(field,newValue,oldValue,opts){
//								           				var hbmAcdTimeLimit=groupTab1.down('numberfield[name=hbmAcdTimeLimit]');
					           				var hbmAcdShortFlag=groupTab1.down('combo[name=hbmAcdShortFlag]');
					           				var hbmAcdTimeMin=groupTab1.down('numberfield[name=hbmAcdTimeMin]');
					           				var hbmAcdTimeMax=groupTab1.down('numberfield[name=hbmAcdTimeMax]');
					           				var acdLimitDetail=groupTab1.down('numberfield[name=hbmAcdCountLimit]');
					           				var hbmAcdShortActionAll=groupTab1.down('radiogroup[name=hbmAcdShortActionAll]');

					           				var hbmAcdFailFlag=groupTab1.down('combo[name=hbmAcdFailFlag]');
					           				var hbmAcdFailCount=groupTab1.down('numberfield[name=hbmAcdFailCount]');
					           				var hbmAcdFailActionAll=groupTab1.down('radiogroup[name=hbmAcdFailActionAll]');
					           				
					           				var hbmAcdAsrFlag=groupTab1.down('combo[name=hbmAcdAsrFlag]');
					           				var hbmAcdCallCount=groupTab1.down('numberfield[name=hbmAcdCallCount]');
					           				var hbmAcdAsrLimit=groupTab1.down('numberfield[name=hbmAcdAsrLimit]');
					           				var hbmAcdAsrActionAll=groupTab1.down('radiogroup[name=hbmAcdAsrActionAll]');

					           				var hbmAcdSmsFlag=groupTab1.down('combo[name=hbmAcdSmsFlag]');
					           				var hbmAcdSmsCount=groupTab1.down('numberfield[name=hbmAcdSmsCount]');
					           				var hbmAcdSmsActionAll=groupTab1.down('radiogroup[name=hbmAcdSmsActionAll]');
					           				
					           				if(newValue){
					           					hbmAcdShortFlag.setDisabled(false);
					           					if(hbmAcdShortFlag.getValue()){
					           						hbmAcdTimeMin.setDisabled(false);
					           						hbmAcdTimeMax.setDisabled(false);
					           						acdLimitDetail.setDisabled(false);
					           						hbmAcdShortActionAll.setDisabled(false);
					           					}
					           					hbmAcdFailFlag.setDisabled(false);
					           					if(hbmAcdFailFlag.getValue()){
						           					hbmAcdFailCount.setDisabled(false);
						           					hbmAcdFailActionAll.setDisabled(false);
					           					}
					           					
					           					hbmAcdAsrFlag.setDisabled(false);
					           					if(hbmAcdAsrFlag.getValue()){
						           					hbmAcdCallCount.setDisabled(false);
						           					hbmAcdAsrLimit.setDisabled(false);
						           					hbmAcdAsrActionAll.setDisabled(false);
					           					}
					           					
					           					hbmAcdSmsFlag.setDisabled(false);
					           					if(hbmAcdSmsFlag.getValue()){
					           						hbmAcdSmsCount.setDisabled(false);
					           						hbmAcdSmsActionAll.setDisabled(false);
					           					}
					           				}else{
					           					hbmAcdShortFlag.setDisabled(true);
					           					hbmAcdTimeMin.setDisabled(true);
					           					hbmAcdTimeMax.setDisabled(true);
					           					acdLimitDetail.setDisabled(true);
					           					hbmAcdShortActionAll.setDisabled(true);
					           				
					           					hbmAcdFailFlag.setDisabled(true);
					           					hbmAcdFailCount.setDisabled(true);
					           					hbmAcdFailActionAll.setDisabled(true);

					           					hbmAcdAsrFlag.setDisabled(true);
					           					hbmAcdCallCount.setDisabled(true);
					           					hbmAcdAsrLimit.setDisabled(true);
					           					hbmAcdAsrActionAll.setDisabled(true);

					           					hbmAcdSmsFlag.setDisabled(true);
					           					hbmAcdSmsCount.setDisabled(true);
					           					hbmAcdSmsActionAll.setDisabled(true);
					           				}
					           			}
			           				}
				           	},{xtype:'displayfield',width:600,value:'<hr>'},{
					            xtype: 'combo',
					            name: 'hbmAcdShortFlag',
					            fieldLabel: 'Short CDR Monitor',
								mode : 'local',
								labelWidth: 180,
								width:300,
								editable:false,
								displayField : 'name',
								valueField : 'statusId',
								queryMode : 'local',
								store : Ext.create('Ext.data.Store', {
									fields : [ 'name', 'statusId' ],
									data : [ {
										name : lanControll.getLanValue('yesOrNo_'+1),
										statusId : 1
									}, {
										name : lanControll.getLanValue('yesOrNo_'+0),
										statusId : 0
									} ]
								}),
								listeners:{
				           			change:function(field, newValue, oldValue, eOpts ){
				           				var hbmAcdTimeMin=groupTab1.down('numberfield[name=hbmAcdTimeMin]');
				           				var hbmAcdTimeMax=groupTab1.down('numberfield[name=hbmAcdTimeMax]');
				           				var hbmAcdCountLimit=groupTab1.down('numberfield[name=hbmAcdCountLimit]');
				           				var hbmAcdShortActionAll=groupTab1.down('radiogroup[name=hbmAcdShortActionAll]');
				           				hbmAcdTimeMin.setDisabled(field.isDisabled()||!newValue);
			           					hbmAcdTimeMax.setDisabled(field.isDisabled()||!newValue);
			           					hbmAcdCountLimit.setDisabled(field.isDisabled()||!newValue);
			           					hbmAcdShortActionAll.setDisabled(field.isDisabled()||!newValue);
				           			}
				           		}
								
					        },
					    	{xtype:'numberfield',fieldLabel: 'Call Duration(sec) >=',width:300, decimalPrecision:0,name: 'hbmAcdTimeMin', value: 5,minValue:0,maxValue:99999},
				           	{xtype:'numberfield',fieldLabel: 'Call Duration(sec) <=',width:300, decimalPrecision:0,name: 'hbmAcdTimeMax', value: 5,minValue:0,maxValue:99999},
				            {xtype:'numberfield',fieldLabel: 'Max Short CDR Count',width:300,decimalPrecision:0,boxLabel:'abc',name: 'hbmAcdCountLimit',value:3,minValue:0,maxValue:999 },
				            {
								xtype: 'radiogroup',
								name: 'hbmAcdShortActionAll',
								fieldLabel: 'Short CDR Action',
								columns: [80,90,110],
								items: [
								    {boxLabel: 'NULL',boxLabelCls:'box_label',ulan:'nall', name: 'hbmAcdShortAction', inputValue: 0,},
									{boxLabel: 'BLOCKED',boxLabelCls:'box_label',ulan:'blocked', name: 'hbmAcdShortAction', inputValue: 1,},
									{boxLabel: 'NO_BALANCE',boxLabelCls:'box_label',ulan:'noBalance', name: 'hbmAcdShortAction', inputValue: 2,},
								]						
							},{xtype:'displayfield',width:600,value:'<hr>'},{
					            xtype: 'combo',
					            name: 'hbmAcdFailFlag',
					            fieldLabel: 'Fail CDR Monitor',
								mode : 'local',
								labelWidth: 180,
								width:300,
								editable:false,
								displayField : 'name',
								valueField : 'statusId',
								queryMode : 'local',
								store : Ext.create('Ext.data.Store', {
									fields : [ 'name', 'statusId' ],
									data : [ {
										name : lanControll.getLanValue('yesOrNo_'+1),
										statusId : 1
									}, {
										name : lanControll.getLanValue('yesOrNo_'+0),
										statusId : 0
									} ]
								}),
								listeners:{
				           			change:function(field, newValue, oldValue, eOpts ){
				           				var hbmAcdFailCount=groupTab1.down('numberfield[name=hbmAcdFailCount]');
				           				var hbmAcdFailActionAll=groupTab1.down('radiogroup[name=hbmAcdFailActionAll]');
				           				var hbmAcdFailWeight1=groupTab1.down('numberfield[name=hbmAcdFailWeight1]');
				           				var hbmAcdGsmCode1=groupTab1.down('textfield[name=hbmAcdGsmCode1]');
				           				var hbmAcdFailWeight2=groupTab1.down('numberfield[name=hbmAcdFailWeight2]');
				           				var hbmAcdGsmCode2=groupTab1.down('textfield[name=hbmAcdGsmCode2]');
				           				
				           				hbmAcdFailCount.setDisabled(!newValue);
				           				hbmAcdFailActionAll.setDisabled(!newValue);
				           				hbmAcdFailWeight1.setDisabled(!newValue);
				           				hbmAcdGsmCode1.setDisabled(!newValue);
				           				hbmAcdFailWeight2.setDisabled(!newValue);
				           				hbmAcdGsmCode2.setDisabled(!newValue);
				           			}
				           		}
								
					        },
					        {
					        	xtype:'container',
					        	layout:'hbox',
					        	margin:'0 0 5 0',
					        	items:[
									{xtype:'numberfield',fieldLabel:'Action Weight(++)',width:300,decimalPrecision:0,name: 'hbmAcdFailWeight1',value:8,minValue:0,maxValue:999 },
									{xtype:'displayfield',value:'&nbsp;&nbsp;&nbsp;by GSM Code:&nbsp;'},
									{xtype:'textfield',width:120,labelWidth:0,fieldLabel: '',decimalPrecision:0,name: 'hbmAcdGsmCode1',value:20,minValue:0,maxValue:999 },

					        	]
					        },{
					        	xtype:'container',
					        	layout:'hbox',
					        	margin:'0 0 5 0',
					        	items:[
									{xtype:'numberfield',fieldLabel:'Action Weight(++)',width:300,decimalPrecision:0,name: 'hbmAcdFailWeight2',value:8,minValue:0,maxValue:999 },
									{xtype:'displayfield',value:'&nbsp;&nbsp;&nbsp;by GSM Code:&nbsp;'},
									{xtype:'textfield',width:120,labelWidth:0,fieldLabel: '',decimalPrecision:0,name: 'hbmAcdGsmCode2',value:20,minValue:0,maxValue:999 },

					        	]
					        },{
					        	xtype:'container',
					        	layout:'hbox',
					        	margin:'0 0 5 0',
					        	items:[
									{xtype:'displayfield',fieldLabel:'Action Weight(++)',width:300,value:1},
									{xtype:'displayfield',value:'&nbsp;&nbsp;&nbsp;by Others'},

					        	]
					        },
					        {xtype:'numberfield',fieldLabel: 'SIM Action Threshold',width:300,align:'right',decimalPrecision:0,ulan:'hbmAcdFailCountSpec',name: 'hbmAcdFailCount',value:3,minValue:0,maxValue:999 },
					        {
								xtype: 'radiogroup',
								name: 'hbmAcdFailActionAll',
								fieldLabel: 'Fail CDR Action',
								columns:[80,90,110],
								items: [
								        {boxLabel: 'NULL',boxLabelCls:'box_label',ulan:'nall', name: 'hbmAcdFailAction', inputValue: 0,},
										{boxLabel: 'BLOCKED',boxLabelCls:'box_label',ulan:'blocked', name: 'hbmAcdFailAction', inputValue: 1,},
										{boxLabel: 'NO_BALANCE',boxLabelCls:'box_label',ulan:'noBalance', name: 'hbmAcdFailAction', inputValue: 2,},
								]						
							},
							{xtype:'displayfield',width:600,value:'<hr>'},
					        {
					            xtype: 'combo',
					            name: 'hbmAcdAsrFlag',
					            fieldLabel: '<label onmouseover=moveOver("low_asr_monitor",event) onmouseout=moveOut() class="tips_label">Low ASR Monitor</label>',
								mode : 'local',
								labelWidth: 180,
								width:300,
								editable:false,
								displayField : 'name',
								valueField : 'statusId',
								queryMode : 'local',
								store : Ext.create('Ext.data.Store', {
									fields : [ 'name', 'statusId' ],
									data : [ {
										name : lanControll.getLanValue('yesOrNo_'+1),
										statusId : 1
									}, {
										name : lanControll.getLanValue('yesOrNo_'+0),
										statusId : 0
									} ]
								}),
								listeners:{
				           			change:function(field, newValue, oldValue, eOpts ){
				           				var hbmAcdCallCount=groupTab1.down('numberfield[name=hbmAcdCallCount]');
				           				var hbmAcdAsrLimit=groupTab1.down('numberfield[name=hbmAcdAsrLimit]');
				           				var hbmAcdAsrActionAll=groupTab1.down('radiogroup[name=hbmAcdAsrActionAll]');
			           					hbmAcdCallCount.setDisabled(!newValue);
			           					hbmAcdAsrLimit.setDisabled(!newValue);
			           					hbmAcdAsrActionAll.setDisabled(!newValue);
				           				
				           			}
				           		}
								
					        },
					        {xtype:'numberfield',fieldLabel: 'Call Count >=',width:300, decimalPrecision:0,name: 'hbmAcdCallCount', value: 5,minValue:0,maxValue:99999},
				           	{xtype:'numberfield',fieldLabel: 'Call ASR <=',width:300, decimalPrecision:0,name: 'hbmAcdAsrLimit', value: 5,minValue:0,maxValue:99999},
				            {
								xtype: 'radiogroup',
								name: 'hbmAcdAsrActionAll',
								fieldLabel: 'Low ASR Action',
								columns: [80,90,110],
								items: [
								    {boxLabel: 'NULL',boxLabelCls:'box_label',ulan:'nall', name: 'hbmAcdAsrAction', inputValue: 0,},
									{boxLabel: 'BLOCKED',boxLabelCls:'box_label',ulan:'blocked', name: 'hbmAcdAsrAction', inputValue: 1,},
									{boxLabel: 'NO_BALANCE&nbsp;',boxLabelCls:'box_label',ulan:'noBalance', name: 'hbmAcdAsrAction', inputValue: 2,},
								]						
							},
							{xtype:'displayfield',width:600,value:'<hr>'},
					        {
					            xtype: 'combo',
					            name: 'hbmAcdSmsFlag',
					            fieldLabel: 'Fail SMS Monitor',
								mode : 'local',
								labelWidth: 180,
								width:300,
								editable:false,
								displayField : 'name',
								valueField : 'statusId',
								queryMode : 'local',
								store : Ext.create('Ext.data.Store', {
									fields : [ 'name', 'statusId' ],
									data : [ {
										name : lanControll.getLanValue('yesOrNo_'+1),
										statusId : 1
									}, {
										name : lanControll.getLanValue('yesOrNo_'+0),
										statusId : 0
									} ]
								}),
								listeners:{
				           			change:function(field, newValue, oldValue, eOpts ){
				           				var hbmAcdSmsCount=groupTab1.down('numberfield[name=hbmAcdSmsCount]');
				           				var hbmAcdSmsActionAll=groupTab1.down('radiogroup[name=hbmAcdSmsActionAll]');
				           				hbmAcdSmsCount.setDisabled(!newValue);
				           				hbmAcdSmsActionAll.setDisabled(!newValue);
				           			}
				           		}
								
					        },
					        {xtype:'numberfield',fieldLabel: 'SMS Count >=',width:300, decimalPrecision:0,name: 'hbmAcdSmsCount', value: 5,minValue:0,maxValue:99999},
				            {
								xtype: 'radiogroup',
								name: 'hbmAcdSmsActionAll',
								fieldLabel: 'Fail SMS Action',
								columns: [80,90,110],
								items: [
								    {boxLabel: 'NULL',boxLabelCls:'box_label',ulan:'nall', name: 'hbmAcdSmsAction', inputValue: 0,},
									{boxLabel: 'BLOCKED',boxLabelCls:'box_label',ulan:'blocked', name: 'hbmAcdSmsAction', inputValue: 1,},
									{boxLabel: 'NO_BALANCE&nbsp;',boxLabelCls:'box_label',ulan:'noBalance', name: 'hbmAcdSmsAction', inputValue: 2,},
								]						
							}
								           
					]	
						
					
					},{
						 
						xtype: 'fieldset',
						title: 'Human Behavior - Promotion Management',
						layout: 'anchor',
						ulan:'fsPromotionManagement',
						collapsible: true,
						collapsed: true,
						name:'promLimitDetail',
						fieldDefaults: {
				            labelAlign: 'left',
				            anchor: '100%',
				            labelWidth: 180,
				        },
						items: [{xtype:'checkbox',boxLabel:'Enable SIM Card Promotion Management', boxLabelCls:'box_label',width:300,name: 'hbmPromFlag',inputValue:1,checked:true,
									listeners:{
										change:function(field,newValue,oldValue,opts){
												var promLimitDetail=groupTab1.down('fieldset[name=promLimitDetail]');
											    var hbmPromFlag=groupTab1.down('checkbox[name=hbmPromFlag]');
											    var fs=promLimitDetail.items;
										        if(newValue==0){
										        	for(var i=1;i<fs.length;i++){
										        		fs.getAt(i).setDisabled(true);
										        	}
						           				}else{
						           					for(var i=1;i<fs.length;i++){
										        		fs.getAt(i).setDisabled(false);
										        	}
										        }
										}
		       						}
								},{
									xtype: 'radiogroup',
									name: 'sendTypePromAll',
									ulan:'sendType',
									fieldLabel: 'Send Type',
									columns: 3,
									anchor: '65%',
									items: [
										{boxLabel: 'SMS&nbsp;',boxLabelCls:'box_label',ulan:'sms', name: 'hbmPromMode', inputValue: 0,
										},
										{boxLabel: 'USSD&nbsp;&nbsp;',boxLabelCls:'box_label',ulan:'ussd', name: 'hbmPromMode', inputValue: 1,
											listeners:{
												change:function(field,newValue,oldValue,opts){
											    	var hbmPromNumber=groupTab1.down('textfield[name=hbmPromNumber]');
											    	
									    			if(newValue){
									    				hbmPromNumber.setDisabled(true);
											    	}else{
											    		hbmPromNumber.setDisabled(false);
											    	}
												}
											}
										},
										{boxLabel: 'CALL&nbsp;',boxLabelCls:'box_label',ulan:'call', name: 'hbmPromMode', inputValue: 2,
										},
										]						
									},
							        {xtype:'textfield',anchor: '45%',fieldLabel:'Send Number',ulan:'sendNum',name:'hbmPromNumber',maxLength:24},
							        {xtype:'textfield',anchor: '75%',fieldLabel:'Send Content',ulan:'sendContent',name:'hbmPromSms',maxLength:63},
							        
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Confirm Keys-1</label>',name:'hbmPromCfm01',maxLength:63},
							        {
										xtype: 'fieldcontainer',
										name:'hbmPromSms4',
										layout:'column',
										items: [{xtype:'textfield',anchor: '45%',width:385,labelWidth: 180,fieldLabel:'Reply Info-1',name:'hbmPromSms01',maxLength:63},
										        {xtype: 'displayfield',value:'',width:20},
										        {
												xtype:'combo',
								        	   name: 'hbmPromReply01', 
								        	   mode: 'local',
								        	   fieldLabel: 'Parse Type-1', 
								        	   queryMode: 'local',
								        	   anchor: '50%',
								        	   editable:false,
								        	   displayField : 'name',
								        	   valueField : 'statusId',
								        	   labelWidth: 90,
								        	   width:260,
								        	   store : Ext.create('Ext.data.Store', {
													fields : [ 'name', 'statusId' ],
													data : [ {
														name : lanControll.getLanValue('hbmPromReply_'+0),
														statusId : 0
													}, {
														name : lanControll.getLanValue('hbmPromReply_'+1),
														statusId : 1
													}, {
														name : lanControll.getLanValue('hbmPromReply_'+2),
														statusId : 2
													}, {
														name : lanControll.getLanValue('hbmPromReply_'+10),
														statusId : 10
													}, {
														name : lanControll.getLanValue('hbmPromReply_'+11),
														statusId : 11
													} ]
												}),
												listeners:{
													change:function(field,newValue,oldValue,opts){
								           				var hbmPromSms01=groupTab1.down('textfield[name=hbmPromSms01]');
								           				if(newValue==1){
								           					hbmPromSms01.setDisabled(true);
								           				}else{
								           					hbmPromSms01.setDisabled(false);
								           				}
								           			}
								           		}
								        }]
									},
							        
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Confirm Keys-2</label>',name:'hbmPromCfm02',maxLength:63},
							        {
										xtype: 'fieldcontainer',
										name:'hbmPromSms4',
										layout:'column',
										items: [ {xtype:'textfield',anchor: '45%',width:385,labelWidth: 180,fieldLabel:'Reply Info-2',name:'hbmPromSms02',maxLength:63},
										         {xtype: 'displayfield',value:'',width:20},
										         {
								        	xtype:'combo',
								        	   name: 'hbmPromReply02', 
								        	   mode: 'local',
								        	   fieldLabel: 'Parse Type-2', 
								        	   queryMode: 'local',
								        	   anchor: '50%',
								        	   editable:false,
								        	   displayField : 'name',
								        	   valueField : 'statusId',
								        	   labelWidth: 90,
								        	   width:260,
								        	   store : Ext.create('Ext.data.Store', {
													fields : [ 'name', 'statusId' ],
													data : [ {
														name : lanControll.getLanValue('hbmPromReply_'+0),
														statusId : 0
													}, {
														name : lanControll.getLanValue('hbmPromReply_'+1),
														statusId : 1
													}, {
														name : lanControll.getLanValue('hbmPromReply_'+2),
														statusId : 2
													}, {
														name : lanControll.getLanValue('hbmPromReply_'+10),
														statusId : 10
													}, {
														name : lanControll.getLanValue('hbmPromReply_'+11),
														statusId : 11
													} ]
												}),
												listeners:{
													change:function(field,newValue,oldValue,opts){
								           				var hbmPromSms02=groupTab1.down('textfield[name=hbmPromSms02]');
								           				if(newValue==1){
								           					hbmPromSms02.setDisabled(true);
								           				}else{
								           					hbmPromSms02.setDisabled(false);
								           				}
								           			}
								           		}
								        }]
							        },
							       
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Confirm Keys-3</label>',name:'hbmPromCfm03',maxLength:63},
							        {
										xtype: 'fieldcontainer',
										name:'hbmPromSms4',
										layout:'column',
										items: [ {xtype:'textfield',anchor: '45%',width:385,labelWidth: 180,fieldLabel:'Reply Info-3',name:'hbmPromSms03',maxLength:63},
										         {xtype: 'displayfield',value:'',width:20},
											     {
										        	 xtype:'combo',
								        	   name: 'hbmPromReply03', 
								        	   mode: 'local',
								        	   fieldLabel: 'Parse Type-3', 
								        	   queryMode: 'local',
								        	   anchor: '50%',
								        	   labelWidth: 90,
								        	   width:260,
								        	   editable:false,
								        	   displayField : 'name',
								        	   valueField : 'statusId',
								        	   store : Ext.create('Ext.data.Store', {
													fields : [ 'name', 'statusId' ],
													data : [ {
														name : lanControll.getLanValue('hbmPromReply_'+0),
														statusId : 0
													}, {
														name : lanControll.getLanValue('hbmPromReply_'+1),
														statusId : 1
													}, {
														name : lanControll.getLanValue('hbmPromReply_'+2),
														statusId : 2
													}, {
														name : lanControll.getLanValue('hbmPromReply_'+10),
														statusId : 10
													}, {
														name : lanControll.getLanValue('hbmPromReply_'+11),
														statusId : 11
													} ]
												}),
												listeners:{
													change:function(field,newValue,oldValue,opts){
								           				var hbmPromSms03=groupTab1.down('textfield[name=hbmPromSms03]');
								           				if(newValue==1){
								           					hbmPromSms03.setDisabled(true);
								           				}else{
								           					hbmPromSms03.setDisabled(false);
								           				}
								           			}
								           		}
								        },]
							        },
							       
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Confirm Keys-4</label>',name:'hbmPromCfm04',maxLength:63},
							        {
										xtype: 'fieldcontainer',
										name:'hbmPromSms4',
										layout:'column',
										items: [{xtype:'textfield',anchor: '75%',width:385,fieldLabel:'Reply Info-4',name:'hbmPromSms04',maxLength:63,labelWidth: 180,},
										        {xtype: 'displayfield',value:'',width:20},
										        {
								        		xtype:'combo',
								        	   name: 'hbmPromReply04', 
								        	   mode: 'local',
								        	   fieldLabel: 'Parse Type-4', 
								        	   queryMode: 'local',
								        	   anchor: '10%',
								        	   labelWidth:90,
								        	   width:260,
								        	   editable:false,
								        	   displayField : 'name',
								        	   valueField : 'statusId',
								        	   store : Ext.create('Ext.data.Store', {
													fields : [ 'name', 'statusId' ],
													data : [ {
														name : lanControll.getLanValue('hbmPromReply_'+0),
														statusId : 0
													}, {
														name : lanControll.getLanValue('hbmPromReply_'+1),
														statusId : 1
													}, {
														name : lanControll.getLanValue('hbmPromReply_'+2),
														statusId : 2
													}, {
														name : lanControll.getLanValue('hbmPromReply_'+10),
														statusId : 10
													}, {
														name : lanControll.getLanValue('hbmPromReply_'+11),
														statusId : 11
													} ]
												}),
												listeners:{
													change:function(field,newValue,oldValue,opts){
								           				var hbmPromSms04=groupTab1.down('textfield[name=hbmPromSms04]');
								           				if(newValue==1){
								           					hbmPromSms04.setDisabled(true);
								           				}else{
								           					hbmPromSms04.setDisabled(false);
								           				}
								           			}
								           		}
								        }]
							        },
							        
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Confirm Keys-5</label>',name:'hbmPromCfm05',maxLength:63},
							        {
										xtype: 'fieldcontainer',
										name:'hbmPromSms5',
										layout:'column',
										items: [{xtype:'textfield',anchor: '45%',width:385,labelWidth: 180,fieldLabel:'Reply Info-5',name:'hbmPromSms05',maxLength:63},
										        {xtype: 'displayfield',value:'',width:20},
										        {
										        	xtype:'combo',
										        	   name: 'hbmPromReply05', 
										        	   mode: 'local',
										        	   fieldLabel: 'Parse Type-5', 
										        	   queryMode: 'local',
										        	   anchor: '50%',
										        	   editable:false,
										        	   displayField : 'name',
										        	   valueField : 'statusId',
										        	   labelWidth: 90,
										        	   width:260,
										        	   store : Ext.create('Ext.data.Store', {
															fields : [ 'name', 'statusId' ],
															data : [ {
																name : lanControll.getLanValue('hbmPromReply_'+0),
																statusId : 0
															}, {
																name : lanControll.getLanValue('hbmPromReply_'+1),
																statusId : 1
															}, {
																name : lanControll.getLanValue('hbmPromReply_'+2),
																statusId : 2
															}, {
																name : lanControll.getLanValue('hbmPromReply_'+10),
																statusId : 10
															}, {
																name : lanControll.getLanValue('hbmPromReply_'+11),
																statusId : 11
															} ]
														}),
														listeners:{
															change:function(field,newValue,oldValue,opts){
										           				var hbmPromSms05=groupTab1.down('textfield[name=hbmPromSms05]');
										           				if(newValue==1){
										           					hbmPromSms05.setDisabled(true);
										           				}else{
										           					hbmPromSms05.setDisabled(false);
										           				}
										           			}
										           		}
										        }]
							        },
							        
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Confirm Keys-6</label>',name:'hbmPromCfm06',maxLength:63},
							        {
							        	xtype: 'fieldcontainer',
							        	name:'hbmPromSms6',
							        	layout:'column',
							        	items: [{xtype:'textfield',anchor: '45%',width:385,labelWidth: 180,fieldLabel:'Reply Info-6',name:'hbmPromSms06',maxLength:63},
							        	        {xtype: 'displayfield',value:'',width:20},
							        	        {
							        	        	xtype:'combo',
							        	        	name: 'hbmPromReply06', 
							        	        	mode: 'local',
							        	        	fieldLabel: 'Parse Type-6', 
							        	        	queryMode: 'local',
							        	        	anchor: '50%',
							        	        	editable:false,
							        	        	displayField : 'name',
							        	        	valueField : 'statusId',
							        	        	labelWidth: 90,
							        	        	width:260,
							        	        	store : Ext.create('Ext.data.Store', {
							        	        		fields : [ 'name', 'statusId' ],
							        	        		data : [ {
							        	        			name : lanControll.getLanValue('hbmPromReply_'+0),
							        	        			statusId : 0
							        	        		}, {
							        	        			name : lanControll.getLanValue('hbmPromReply_'+1),
							        	        			statusId : 1
							        	        		}, {
							        	        			name : lanControll.getLanValue('hbmPromReply_'+2),
							        	        			statusId : 2
							        	        		}, {
															name : lanControll.getLanValue('hbmPromReply_'+10),
															statusId : 10
														}, {
															name : lanControll.getLanValue('hbmPromReply_'+11),
															statusId : 11
														} ]
							        	        	}),
							        	        	listeners:{
							        	        	change:function(field,newValue,oldValue,opts){
							        	        	var hbmPromSms06=groupTab1.down('textfield[name=hbmPromSms06]');
							        	        	if(newValue==1){
							        	        		hbmPromSms06.setDisabled(true);
							        	        	}else{
							        	        		hbmPromSms06.setDisabled(false);
							        	        	}
							        	        }
							        	        }
							        	        }]
							        },
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Apply Success Keys-1</label>',name:'hbmPromSuccKeys',maxLength:63},
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Apply Success Keys-2</label>',name:'hbmPromSuccKeys2',maxLength:63},
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Apply Failure Keys-1</label>',name:'hbmPromFailKeys',maxLength:63},
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Apply Failure Keys-2</label>',name:'hbmPromFailKeys2',maxLength:63},
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Apply Failure Keys-3</label>',name:'hbmPromFailKeys3',maxLength:63},
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Apply Failure Keys-4</label>',name:'hbmPromFailKeys4',maxLength:63},
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Apply Failure Keys-5</label>',name:'hbmPromFailKeys5',maxLength:63},
							        {xtype:'checkbox',boxLabel:'Waiting SIM Card Balance Check before Promotion Apply', boxLabelCls:'box_label',width:300,name: 'hbmPromWaitBalance',inputValue:1,checked:true,},
							        {xtype:'numberfield',anchor: '45%',fieldLabel: 'Apply Request Timeout(min)',name: 'hbmPromWaitMin',decimalPrecision:0, value: 3,minValue:0,maxValue:99999},	
							        {xtype:'numberfield',anchor: '45%',fieldLabel: 'Apply Retries Interval(min)',name: 'hbmPromInterval',decimalPrecision:0, value: 3,minValue:0,maxValue:99999},	
							        {xtype:'numberfield',anchor: '45%',fieldLabel: 'Max Apply Fail Retries',ulan:'maxFailRetries',name: 'hbmPromReqRetries',decimalPrecision:0, value: 3,minValue:0,maxValue:999},	
							        {xtype:'numberfield',anchor: '45%',fieldLabel: '<label onmouseover=moveOver("grp_hbmPromDayMax",event) onmouseout=moveOut() class="tips_label">Max Apply Count of Day</label>',name: 'hbmPromDayMax',decimalPrecision:0, value: 3,minValue:0,maxValue:99999},	
							 ]
						
					},{
						 
						xtype: 'fieldset',
						title: 'Human Behavior - Auto Generation',
						layout: 'anchor',
						name:'autoGeneration',
						collapsible: true,
						collapsed: true,
						fieldDefaults: {
				            labelAlign: 'left',
				            anchor: '100%',
				            labelWidth: 180,
				        },
						items: [{
							   name : 'smsTest',
							   xtype: 'fieldcontainer',
							   fieldDefaults: {
						            labelAlign: 'left',
						            anchor: '75%',
						            labelWidth: 180,
						        },
//							   fieldLabel: 'SMS Test',
							   items: [

							           	{xtype:'checkbox',boxLabel:'Enable Auto SMS Generation', boxLabelCls:'box_label',width:300,name: 'hbmSmsTestFlag',inputValue:1,checked:true,
							           		listeners:{
												change:function(field,newValue,oldValue,opts){
							           				var smsTestDetail1=groupTab1.down('radiogroup[name=smsTestDetail1]');
							           				var smsTestDetail2=groupTab1.down('fieldcontainer[name=smsTestDetail2]');
							           				var smsTemplate=groupTab1.down('fieldcontainer[name=smsTemplate]');
							           				var hbmSmsInterval=groupTab1.down('numberfield[name=hbmSmsInterval]');
							           				var hbmSmsSwitchFlag=groupTab1.down('checkbox[name=hbmSmsSwitchFlag]');
							           				var hbmSmsCountLimit=groupTab1.down('numberfield[name=hbmSmsCountLimit]');
							           				var hbmSmsSpecNumber=groupTab1.down('textfield[name=hbmSmsSpecNumber]');
							           				var hbmLearnNumber=groupTab1.down('checkbox[name=hbmLearnNumber]');
							           				
//							           				var hbmUssdQuietMonitor=groupTab1.down('checkbox[name=hbmUssdQuietMonitor]');
							           				
							           				if(newValue){
							           					smsTestDetail1.setDisabled(false);
							           					smsTestDetail2.setDisabled(false);
							           					smsTemplate.setDisabled(false);
							           					hbmSmsInterval.setDisabled(false);
							           					hbmSmsSwitchFlag.setDisabled(false);
							           					hbmSmsCountLimit.setDisabled(false);
							           					hbmSmsSpecNumber.setDisabled(false);
							           					hbmLearnNumber.setDisabled(false);

//							           					hbmUssdQuietMonitor.setDisabled(false);
							           				}else{
							           					smsTestDetail1.setDisabled(true);
							           					smsTestDetail2.setDisabled(true);
							           					smsTemplate.setDisabled(true);
							           					hbmSmsInterval.setDisabled(true);
							           					hbmSmsSwitchFlag.setDisabled(true);
							           					hbmSmsCountLimit.setDisabled(true);
							           					hbmSmsSpecNumber.setDisabled(true);
							           					hbmLearnNumber.setDisabled(true);

//							           					hbmUssdQuietMonitor.setDisabled(true);
//							           					hbmUssdQuietMonitor.setValue(0);
							           				}
							           			}
				           					}
							           	},{
											xtype: 'radiogroup',
											name: 'smsTestDetail1',
											width:560,
											ulan:'smsDirection',
											fieldLabel: 'SMS Direction',
											columns: 3,
											items: [
												{boxLabel: 'SMS_RECV&nbsp;',boxLabelCls:'box_label',ulan:'smsDirection_0', name: 'hbmSmsDirection', inputValue: 0},
												{boxLabel: 'SMS_SEND&nbsp;&nbsp;',boxLabelCls:'box_label',ulan:'smsDirection_1', name: 'hbmSmsDirection', inputValue: 1},
												{boxLabel: 'SMS_DUAL&nbsp;',boxLabelCls:'box_label', ulan:'smsDirection_2',name: 'hbmSmsDirection', inputValue: 2},
											]						
										}
							           	,{xtype:'textfield',fieldLabel: '<label onmouseover=moveOver("grp_spec_number",event) onmouseout=moveOut() class="tips_label">SMS Spec Number</label>',width:600,name: 'hbmSmsSpecNumber',maxLength:127}
							           	,{xtype:'numberfield',fieldLabel: 'SMS Interval(min)',name: 'hbmSmsInterval',decimalPrecision:0, value: 180,minValue:0,maxValue:999}	
										,{
											xtype: 'fieldcontainer',
											name:'smsTestDetail2',
											layout:'column',
											items: [
											        {xtype:'numberfield', fieldLabel: 'SMS Random',labelWidth: 180,name: 'hbmSmsTestRandom',decimalPrecision:0,value:1,minValue:0,maxValue:100 },
											        {xtype: 'displayfield',value:'% (random interval)' },
//													{xtype: 'displayfield',width:80,value:'(count)' },
												]
										},
										{xtype:'numberfield',fieldLabel: '<label onmouseover=moveOver("grp_hbmSmsCountLimit",event) onmouseout=moveOut() class="tips_label">Max SMS Fail Retries</label>',name: 'hbmSmsCountLimit',decimalPrecision:0,value:3,minValue:0,maxValue:999 },
										{xtype:'checkbox',boxLabel:'SIM Switchover If Continuous SMS Loss', boxLabelCls:'box_label',width:300,name: 'hbmSmsSwitchFlag',inputValue:1,checked:true,},
										{xtype:'checkbox',boxLabel: 'Send for SIM Number Learning, set SMS_COUNT_CARD after SIM Number updated',boxLabelCls:'box_label', name: 'hbmLearnNumber',inputValue:1,checked:true,},
									]
						},{
							   name : 'smsTemplate',
							   xtype: 'fieldcontainer',
							   layout:'anchor',
							   fieldDefaults: {
						            labelAlign: 'left',
						            anchor: '83%',
						            labelWidth: 180,
						        },
//							   fieldLabel: 'SMS Template',
							   items: [
										{xtype:'textfield',fieldLabel:'Random Content-1',name:'hbmSmsTest01',maxLength:63},
										{xtype:'textfield',fieldLabel:'Random Content-2',name:'hbmSmsTest02',maxLength:63},
										{xtype:'textfield',fieldLabel:'Random Content-3',name:'hbmSmsTest03',maxLength:63},
										{xtype:'textfield',fieldLabel:'Random Content-4',name:'hbmSmsTest04',maxLength:63},
										{xtype:'textfield',fieldLabel:'Random Content-5',name:'hbmSmsTest05',maxLength:63},
									]
						},{
							   name : 'talkTest',
							   xtype: 'fieldcontainer',
//							   fieldLabel: 'Talk Test',
							   fieldDefaults: {
						            labelAlign: 'left',
						            anchor: '75%',
						            labelWidth: 180,
						        },
							   items: [

							           	{xtype:'checkbox',boxLabel:'Enable Auto Call Generation',boxLabelCls:'box_label',width:300, name: 'hbmCallTestFlag',inputValue:1, checked:true,
							           		listeners:{
												change:function(field,newValue,oldValue,opts){
							           				var talkTestDetail1=groupTab1.down('radiogroup[name=talkTestDetail1]');
							           				var talkTestDetail2=groupTab1.down('fieldcontainer[name=talkTestDetail2]');
							           				var hbmCallInterval=groupTab1.down('numberfield[name=hbmCallInterval]');
							           				var hbmCallConnection=groupTab1.down('checkbox[name=hbmCallConnection]');
							           				var hbmCallDuration=groupTab1.down('numberfield[name=hbmCallDuration]');
							           				var toneTypeFC=groupTab1.down('fieldcontainer[name=toneTypeFC]');
							           				var hbmCallSpecNumber=groupTab1.down('textfield[name=hbmCallSpecNumber]');
							           				
							           				if(newValue){
							           					talkTestDetail1.setDisabled(false);
							           					talkTestDetail2.setDisabled(false);
							           					hbmCallInterval.setDisabled(false);
							           					hbmCallConnection.setDisabled(false);
							           					hbmCallDuration.setDisabled(false);
							           					toneTypeFC.setDisabled(false);
							           					hbmCallSpecNumber.setDisabled(false);
							           				}else{
							           					talkTestDetail1.setDisabled(true);
							           					talkTestDetail2.setDisabled(true);
							           					hbmCallInterval.setDisabled(true);
							           					hbmCallConnection.setDisabled(true);
							           					hbmCallDuration.setDisabled(true);
							           					toneTypeFC.setDisabled(true);
							           					hbmCallSpecNumber.setDisabled(true);
							           				}
							           			}
			           						}
							           	},{
											xtype: 'radiogroup',
											name: 'talkTestDetail1',
											width:560,
											ulan:'callDirection',
											fieldLabel: 'Call Direction',
											columns: 3,
											items: [
												{boxLabel: 'CALL_IN&nbsp;',boxLabelCls:'box_label',ulan:'callDirection_0', name: 'hbmCallDirection', inputValue: 0},
												{boxLabel: 'CALL_OUT&nbsp;&nbsp;',boxLabelCls:'box_label',ulan:'callDirection_1', name: 'hbmCallDirection', inputValue: 1},
												{boxLabel: 'CALL_DUAL&nbsp;',boxLabelCls:'box_label',ulan:'callDirection_2', name: 'hbmCallDirection', inputValue: 2},
											]						
										}
							        	,{xtype:'textfield',fieldLabel: 'Call Spec Number',width:450,name: 'hbmCallSpecNumber'}
							           	,{xtype:'numberfield',fieldLabel: 'Call Interval(min)',name: 'hbmCallInterval',decimalPrecision:0, value: 180,minValue:0,maxValue:999},
							           	{
											xtype: 'fieldcontainer',
											name:'talkTestDetail2',
											layout:'column',
											items: [
											    	{xtype:'numberfield',fieldLabel: 'Call Random',labelWidth: 180,decimalPrecision:0,name: 'hbmCallTestRandom',value:100,minValue:0,maxValue:100 },
													{xtype: 'displayfield',value:'% (random interval and duration)' },
												]
										},{xtype:'checkbox',boxLabel:'Callee Auto Off-Hook At Call-In',boxLabelCls:'box_label',width:300, name: 'hbmCallConnection',inputValue:1, checked:true,
											listeners:{
											change:function(field,newValue,oldValue,opts){
						           				var hbmCallDuration=groupTab1.down('numberfield[name=hbmCallDuration]');
						           				var toneTypeFC=groupTab1.down('fieldcontainer[name=toneTypeFC]');
						           				
						           				if(newValue){
						           					hbmCallDuration.setDisabled(false);
						           					toneTypeFC.setDisabled(false);
						           				}else{
						           					hbmCallDuration.setDisabled(true);
						           					toneTypeFC.setDisabled(true);
						           				}
						           			}
										}
										},{xtype:'numberfield',decimalPrecision:0,fieldLabel: 'Call Duration(sec)', name: 'hbmCallDuration', value: 180,minValue:0,maxValue:999,}
							           	
									]
						},{
							   name : 'toneTypeFC',
							   xtype: 'fieldcontainer',
							   fieldDefaults: {
						            labelAlign: 'left',
						            anchor: '75%',
						            labelWidth: 180,
								},
							   items: [
										{
											xtype: 'radiogroup',
											width:560,
											ulan:'toneType',
											fieldLabel: 'Tone Type',
											columns: 3,
											items: [
											     {boxLabel: 'NULL&nbsp;',boxLabelCls:'box_label', ulan:'nall',name: 'hbmCallToneMode', inputValue: 0},
												{boxLabel: 'Random DTMF&nbsp;',boxLabelCls:'box_label', ulan:'randomDtmf',name: 'hbmCallToneMode', inputValue: 1},
												{boxLabel: 'Random IVR&nbsp;&nbsp;',boxLabelCls:'box_label', ulan:'randomIvr',name: 'hbmCallToneMode', inputValue: 2},
											]						
										},
										{xtype:'numberfield',decimalPrecision:0,fieldLabel: '<label onmouseover=moveOver("grp_hbmCallCountLimit",event) onmouseout=moveOut() class="tips_label">Max CALL Fail Retries</label>',name: 'hbmCallCountLimit',value:3,minValue:0,maxValue:999},
										{xtype:'checkbox',boxLabel:'SIM Switchover If Continuous Call Failure', boxLabelCls:'box_label',width:300,name: 'hbmCallSwitchFlag',inputValue:1,checked:true,}
									]
						},]
					},{
						 
						xtype: 'fieldset',
						title: 'Human Behavior - Balance Check',
						layout: 'anchor',							
						collapsible: true,
						collapsed: true,
						name:'balanceCheckDetail',
						fieldDefaults: {
				            labelAlign: 'left',
				            anchor: '100%',
				            labelWidth: 180,
				        },
						items: [
						        {xtype:'checkbox',boxLabel:'Enable SIM Balance Check', boxLabelCls:'box_label',width:300,name: 'hbmBalanceCheck',inputValue:1,checked:true,
									listeners:{
									change:function(field,newValue,oldValue,opts){
				           				var hbmBalanceSmsFlag=groupTab1.down('checkbox[name=hbmBalanceSmsFlag]');
				           				var hbmBalanceUssdFlag=groupTab1.down('checkbox[name=hbmBalanceUssdFlag]');
				           				var hbmBalanceRecharge=groupTab1.down('checkbox[name=hbmBalanceRecharge]');
				           				var hbmInqFlag=groupTab1.down('checkbox[name=hbmInqFlag]');					           				
				           				var hbmUssdQuietMonitor=groupTab1.down('checkbox[name=hbmUssdQuietMonitor]');
				           				
				           				var callFeeRate=groupTab1.down('numberfield[name=callFeeRate]');
							        	var callBillingRate=groupTab1.down('displayfield[name=callBillingRate]');
							        	var lowBalanceLimit=groupTab1.down('numberfield[name=lowBalanceLimit]');
				           				if(newValue){
				           					hbmBalanceSmsFlag.setDisabled(false);
				           					hbmBalanceUssdFlag.setDisabled(false);
				           					hbmBalanceRecharge.setDisabled(false);
				           					hbmInqFlag.setDisabled(false);
				           					hbmUssdQuietMonitor.setDisabled(false);
				           					callFeeRate.setDisabled(false);
							        		callBillingRate.setDisabled(false);
							        		lowBalanceLimit.setDisabled(false);
				           				}else{
				           					hbmBalanceSmsFlag.setDisabled(true);
				           					hbmBalanceSmsFlag.setValue(0);
				           					hbmBalanceUssdFlag.setDisabled(true);
				           					hbmBalanceUssdFlag.setValue(0);
				           					hbmBalanceRecharge.setDisabled(true);
				           					hbmBalanceRecharge.setValue(0);
				           					hbmInqFlag.setDisabled(true);
				           					hbmInqFlag.setValue(0);
				           					hbmUssdQuietMonitor.setDisabled(true);
				           					hbmUssdQuietMonitor.setValue(0);
				           					callFeeRate.setDisabled(true);
							        		callBillingRate.setDisabled(true);
							        		lowBalanceLimit.setDisabled(true);
				           				}
				           			}
		       					}
							},
							{xtype:'displayfield',anchor: '75%',value:'<hr>'},
							{xtype:'numberfield',fieldLabel: '<label onmouseover=moveOver("grp_initBalanceVal",event) onmouseout=moveOut() class="tips_label">Initial SIM Balance</label>',decimalPrecision:2, name:'initBalanceVal',anchor: '45%',minValue:0,maxValue:1000000000 },
							{xtype:'numberfield',anchor: '45%',fieldLabel: 'Default Billing Rate(per min)',decimalPrecision:3,name: 'callFeeRate',value:3,minValue:0},
							{xtype:'numberfield',fieldLabel: '<label onmouseover=moveOver("grp_lowBalanceLimit",event) onmouseout=moveOut() class="tips_label">Balance Threshold</label>',decimalPrecision:2,anchor:'45%',name: 'lowBalanceLimit',minValue:0,value:0.00},
							{xtype:'displayfield',anchor: '45%',fieldLabel: 'Current Billing Rate(per min)',decimalPrecision:3,name: 'callBillingRate',value:3,minValue:0},
					        

							{xtype:'checkbox',boxLabel:'Auto Inquire SIM Balance by SMS/USSD/CALL', boxLabelCls:'box_label',width:300,name: 'hbmInqFlag',inputValue:1,checked:true,
						        	listeners:{
									change:function(field,newValue,oldValue,opts){
				           				var hbmInqModeAll=groupTab1.down('radiogroup[name=hbmInqModeAll]');
				           				var hbmInqMode=groupTab1.down('radio[name=hbmInqMode]');
				           				var hbmInqNumber=groupTab1.down('textfield[name=hbmInqNumber]');
				           				var hbmInqContent=groupTab1.down('textfield[name=hbmInqContent]');

				           				var hbmInqTimeoutMin=groupTab1.down('numberfield[itemId=hbmInqTimeoutMin]');
				           				var hbmMaxInqCount=groupTab1.down('numberfield[itemId=hbmMaxInqCount]');
//				           				var hbmMaxInqCount1=groupTab1.down('fieldcontainer[itemId=hbmMaxInqCountF]');
				           				var hbmInqAfterReg1=groupTab1.down('fieldcontainer[itemId=hbmInqAfterRegF]');
				           				var hbmInqAfterCall1=groupTab1.down('fieldcontainer[itemId=hbmInqAfterCallF]');
				           				var hbmInqAfterAcd1=groupTab1.down('fieldcontainer[itemId=hbmInqAfterAcdF]');
				           				var hbmInqAfterLow1=groupTab1.down('fieldcontainer[itemId=hbmInqAfterLowF]');
				           				var hbmInqAfterRecharge1=groupTab1.down('fieldcontainer[itemId=hbmInqAfterRechargeF]');

				           				var hbmInqSms01=groupTab1.down('fieldcontainer[name=hbmInqSms01]');
				           				var hbmInqSms02=groupTab1.down('fieldcontainer[name=hbmInqSms02]');
				           				var hbmInqSms03=groupTab1.down('fieldcontainer[name=hbmInqSms03]');
				           				var hbmInqCfm01=groupTab1.down('textfield[name=hbmInqCfm01]');
				           				var hbmInqCfm02=groupTab1.down('textfield[name=hbmInqCfm02]');
				           				var hbmInqCfm03=groupTab1.down('textfield[name=hbmInqCfm03]');
				           				
//				           				var hbmInqConnect=groupTab1.down('checkbox[name=hbmInqConnect]');
//				           				var hbmInqDuration=groupTab1.down('numberfield[name=hbmInqDuration]');
				           				
				           				if(newValue){
				           					hbmInqModeAll.setDisabled(false);
				           					
				           					hbmInqNumber.setDisabled(false);
				           					hbmInqContent.setDisabled(false);

				           					hbmInqTimeoutMin.setDisabled(false);
				           					hbmMaxInqCount.setDisabled(false);
//				           					hbmMaxInqCount1.setDisabled(false);
				           					hbmInqAfterReg1.setDisabled(false);
				           					hbmInqAfterCall1.setDisabled(false);
				           					hbmInqAfterAcd1.setDisabled(false);
				           					hbmInqAfterLow1.setDisabled(false);
				           					hbmInqAfterRecharge1.setDisabled(false);
				           					
				           					hbmInqCfm01.setDisabled(false);
				           					hbmInqCfm02.setDisabled(false);
				           					hbmInqCfm03.setDisabled(false);
				           					hbmInqSms01.setDisabled(false);
				           					hbmInqSms02.setDisabled(false);
				           					hbmInqSms03.setDisabled(false);
				           				}else{
				           					hbmInqModeAll.setDisabled(true);
				           					
				           					hbmInqNumber.setDisabled(true);
				           					hbmInqContent.setDisabled(true);
				           				
				           					hbmInqTimeoutMin.setDisabled(true);
				           					hbmMaxInqCount.setDisabled(true);
//				           					hbmMaxInqCount1.setDisabled(true);
				           					hbmInqAfterReg1.setDisabled(true);
				           					hbmInqAfterCall1.setDisabled(true);
				           					hbmInqAfterAcd1.setDisabled(true);
				           					hbmInqAfterLow1.setDisabled(true);
				           					hbmInqAfterRecharge1.setDisabled(true);

				           					hbmInqCfm01.setDisabled(true);
				           					hbmInqCfm02.setDisabled(true);
				           					hbmInqCfm03.setDisabled(true);
				           					hbmInqSms01.setDisabled(true);
				           					hbmInqSms02.setDisabled(true);
				           					hbmInqSms03.setDisabled(true);
				           				}
				           			}
		   						}
						        },
						        {xtype:'numberfield',name: 'hbmInqTimeoutMin',fieldLabel:'Inquire Timeout(min)', itemId:'hbmInqTimeoutMin',anchor: '45%',value: 30,minValue:0,maxValue:999},
						        {xtype:'numberfield',name: 'hbmMaxInqCount', fieldLabel:'Max Inquire Retries',itemId:'hbmMaxInqCount',anchor: '45%',value: 30,minValue:0,maxValue:99999},
						        {xtype:'checkbox',boxLabel:'Block SIM Card after Inquire failure', boxLabelCls:'box_label',width:300,name: 'hbmInqBlockedFlag',inputValue:1,checked:true,},
						        {
									xtype: 'radiogroup',
									name: 'hbmInqModeAll',
									ulan:'sendType',
									fieldLabel: 'Send Type',
									columns: 3,
									anchor: '65%',
									items: [
										{boxLabel: 'SMS&nbsp;',boxLabelCls:'box_label',ulan:'sms', name: 'hbmInqMode', inputValue: 0},
										{boxLabel: 'USSD&nbsp;&nbsp;',boxLabelCls:'box_label',ulan:'ussd', name: 'hbmInqMode', inputValue: 1},
										{boxLabel: 'CALL&nbsp;&nbsp;',boxLabelCls:'box_label',ulan:'call', name: 'hbmInqMode', inputValue: 2},
										],
										listeners:{
											change:function(field,newValue,oldValue,opts){
												var hbmInqNumber=groupTab1.down('textfield[name=hbmInqNumber]');
												var hbmInqContent=groupTab1.down('textfield[name=hbmInqContent]');
												var hbmInqConnect=groupTab1.down('checkbox[name=hbmInqConnect]');
												
												var hbmInqSms01=groupTab1.down('fieldcontainer[name=hbmInqSms01]');
						           				var hbmInqSms02=groupTab1.down('fieldcontainer[name=hbmInqSms02]');
						           				var hbmInqSms03=groupTab1.down('fieldcontainer[name=hbmInqSms03]');
						           				var hbmInqCfm01=groupTab1.down('textfield[name=hbmInqCfm01]');
						           				var hbmInqCfm02=groupTab1.down('textfield[name=hbmInqCfm02]');
						           				var hbmInqCfm03=groupTab1.down('textfield[name=hbmInqCfm03]');
												
												var inputValue=field.getChecked()[0].inputValue;
												hbmInqContent.setFieldLabel(lanControll.getLanValue('content'));
												if(inputValue==0){
													hbmInqNumber.setDisabled(false);
													hbmInqContent.setDisabled(false);
													hbmInqConnect.setDisabled(true);
													hbmInqConnect.setValue(0);
													
													hbmInqCfm01.setDisabled(false);
						           					hbmInqCfm02.setDisabled(false);
						           					hbmInqCfm03.setDisabled(false);
						           					hbmInqSms01.setDisabled(false);
						           					hbmInqSms02.setDisabled(false);
						           					hbmInqSms03.setDisabled(false);
												}else if(inputValue==1){
													hbmInqNumber.setDisabled(true);
								    				hbmInqContent.setDisabled(false);
								    				hbmInqConnect.setDisabled(true);
								    				hbmInqConnect.setValue(0);
								    				
								    				hbmInqCfm01.setDisabled(false);
						           					hbmInqCfm02.setDisabled(false);
						           					hbmInqCfm03.setDisabled(false);
						           					hbmInqSms01.setDisabled(false);
						           					hbmInqSms02.setDisabled(false);
						           					hbmInqSms03.setDisabled(false);
												}else if(inputValue==2){
													hbmInqNumber.setDisabled(false);
													hbmInqContent.setDisabled(false);
													hbmInqContent.setFieldLabel(lanControll.getLanValue('dtmfNumber'));
													hbmInqConnect.setDisabled(false);
													hbmInqConnect.setValue(0);
													
													hbmInqCfm01.setDisabled(true);
						           					hbmInqCfm02.setDisabled(true);
						           					hbmInqCfm03.setDisabled(true);
						           					hbmInqSms01.setDisabled(true);
						           					hbmInqSms02.setDisabled(true);
						           					hbmInqSms03.setDisabled(true);
												}
											}
										}
								},
						        {xtype:'textfield',anchor: '45%',fieldLabel:'Send Number',ulan:'sendNum',name:'hbmInqNumber',maxLength:24},
						        {xtype:'textfield',anchor: '45%',fieldLabel:'Content11',ulan:'contentAbbr',name:'hbmInqContent',maxLength:63},
						        {xtype:'checkbox',boxLabel:'Call Connect Flag', boxLabelCls:'box_label',width:300,name: 'hbmInqConnect',inputValue:1,checked:true,
									listeners:{
										change:function(field,newValue,oldValue,opts){
					           				var hbmInqDuration=groupTab1.down('numberfield[name=hbmInqDuration]');
					           				if(newValue){
					           					hbmInqDuration.setDisabled(false);
					           				}else{
					           					hbmInqDuration.setDisabled(true);
					           				}
					           			}
		       						}
								},
								{xtype:'numberfield',anchor: '45%',fieldLabel: 'Call Duration(sec)',name: 'hbmInqDuration',value:3,minValue:0,maxValue:999},

								{xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Confirm Keys-1</label>',name:'hbmInqCfm01',maxLength:63},
						        {
									xtype: 'fieldcontainer',
									name:'hbmInqSms01',
									layout:'column',
									items: [{xtype:'textfield',anchor: '45%',width:385,labelWidth: 180,fieldLabel:'Reply Info-1',name:'hbmInqSms01',maxLength:63},
									        {xtype: 'displayfield',value:'',width:20},
									        {
											xtype:'combo',
							        	   name: 'hbmInqReply01', 
							        	   mode: 'local',
							        	   fieldLabel: 'Parse Type-1', 
							        	   queryMode: 'local',
							        	   anchor: '50%',
							        	   editable:false,
							        	   displayField : 'name',
							        	   valueField : 'statusId',
							        	   labelWidth: 90,
							        	   width:235,
							        	   store : Ext.create('Ext.data.Store', {
												fields : [ 'name', 'statusId' ],
												data : [ {
													name : lanControll.getLanValue('hbmInqReply_'+0),
													statusId : 0
												}, {
													name : lanControll.getLanValue('hbmInqReply_'+1),
													statusId : 1
												}, {
													name : lanControll.getLanValue('hbmInqReply_'+2),
													statusId : 2
												} ]
											}),
											listeners:{
												change:function(field,newValue,oldValue,opts){
							           				var hbmInqSms01=groupTab1.down('textfield[name=hbmInqSms01]');
							           				if(newValue==1){
							           					hbmInqSms01.setDisabled(true);
							           				}else{
							           					hbmInqSms01.setDisabled(false);
							           				}
							           			}
							           		}
							        }]
								},
								{xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Confirm Keys-2</label>',name:'hbmInqCfm02',maxLength:63},
						        {
									xtype: 'fieldcontainer',
									name:'hbmInqSms02',
									layout:'column',
									items: [{xtype:'textfield',anchor: '45%',width:385,labelWidth: 180,fieldLabel:'Reply Info-2',name:'hbmInqSms02',maxLength:63},
									        {xtype: 'displayfield',value:'',width:20},
									        {
											xtype:'combo',
							        	   name: 'hbmInqReply02', 
							        	   mode: 'local',
							        	   fieldLabel: 'Parse Type-2', 
							        	   queryMode: 'local',
							        	   anchor: '50%',
							        	   editable:false,
							        	   displayField : 'name',
							        	   valueField : 'statusId',
							        	   labelWidth: 90,
							        	   width:235,
							        	   store : Ext.create('Ext.data.Store', {
												fields : [ 'name', 'statusId' ],
												data : [ {
													name : lanControll.getLanValue('hbmInqReply_'+0),
													statusId : 0
												}, {
													name : lanControll.getLanValue('hbmInqReply_'+1),
													statusId : 1
												}, {
													name : lanControll.getLanValue('hbmInqReply_'+2),
													statusId : 2
												} ]
											}),
											listeners:{
												change:function(field,newValue,oldValue,opts){
							           				var hbmInqSms02=groupTab1.down('textfield[name=hbmInqSms02]');
							           				if(newValue==1){
							           					hbmInqSms02.setDisabled(true);
							           				}else{
							           					hbmInqSms02.setDisabled(false);
							           				}
							           			}
							           		}
							        }]
								},
								{xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Confirm Keys-3</label>',name:'hbmInqCfm03',maxLength:63},
						        {
									xtype: 'fieldcontainer',
									name:'hbmInqSms03',
									layout:'column',
									items: [{xtype:'textfield',anchor: '45%',width:385,labelWidth: 180,fieldLabel:'Reply Info-3',name:'hbmInqSms03',maxLength:63},
									        {xtype: 'displayfield',value:'',width:20},
									        {
											xtype:'combo',
							        	   name: 'hbmInqReply03', 
							        	   mode: 'local',
							        	   fieldLabel: 'Parse Type-3', 
							        	   queryMode: 'local',
							        	   anchor: '50%',
							        	   editable:false,
							        	   displayField : 'name',
							        	   valueField : 'statusId',
							        	   labelWidth: 90,
							        	   width:235,
							        	   store : Ext.create('Ext.data.Store', {
												fields : [ 'name', 'statusId' ],
												data : [ {
													name : lanControll.getLanValue('hbmInqReply_'+0),
													statusId : 0
												}, {
													name : lanControll.getLanValue('hbmInqReply_'+1),
													statusId : 1
												}, {
													name : lanControll.getLanValue('hbmInqReply_'+2),
													statusId : 2
												} ]
											}),
											listeners:{
												change:function(field,newValue,oldValue,opts){
							           				var hbmInqSms03=groupTab1.down('textfield[name=hbmInqSms03]');
							           				if(newValue==1){
							           					hbmInqSms03.setDisabled(true);
							           				}else{
							           					hbmInqSms03.setDisabled(false);
							           				}
							           			}
							           		}
							        }]
								},
								
								{xtype:'displayfield',anchor: '75%',value:'<hr>'},
								{
									xtype: 'fieldcontainer',
									layout:'hbox',
									itemId:'hbmInqAfterRegF',
									items: [
									        {xtype:'checkbox',boxLabel: 'Inquire Delay After SIM Registered(sec)',boxLabelCls:'box_label',width:350, name: 'hbmInqAfterReg1',itemId:'hbmInqAfterReg1', 
									        	listeners:{
									        	change:function(field,newValue,oldValue,opts){
									        	this.up('fieldcontainer').getComponent('hbmInqAfterReg').setDisabled(oldValue);
									        }
									        }
									        },
									        {xtype:'numberfield',name: 'hbmInqAfterReg', itemId:'hbmInqAfterReg',disabled:true,width:160 ,minValue:0,maxValue:99999},
									        ]
								},
								{
									xtype: 'fieldcontainer',
									layout:'hbox',
									itemId:'hbmInqAfterCallF',
									items: [
									        {xtype:'checkbox',boxLabel: 'Inquire Delay After The End of NORMAL Call(sec)',boxLabelCls:'box_label',width:350, name: 'hbmInqAfterCall1',itemId:'hbmInqAfterCall1', 
									        	listeners:{
									        	change:function(field,newValue,oldValue,opts){
									        	this.up('fieldcontainer').getComponent('hbmInqAfterCall').setDisabled(oldValue);
									        }
									        }
									        },
									        {xtype:'numberfield',name: 'hbmInqAfterCall', itemId:'hbmInqAfterCall',disabled:true,width:160 ,minValue:0,maxValue:99999},
									        ]
								},
								{
									xtype: 'fieldcontainer',
									layout:'hbox',
									itemId:'hbmInqAfterAcdF',
									items: [
									        {xtype:'checkbox',boxLabel: 'Inquire Balance After Abnormal Call Duration Count',boxLabelCls:'box_label',width:350, name: 'hbmInqAfterAcd1',itemId:'hbmInqAfterAcd1', 
									        	listeners:{
									        	change:function(field,newValue,oldValue,opts){
									        	this.up('fieldcontainer').getComponent('hbmInqAfterAcd').setDisabled(oldValue);
									        }
									        }
									        },
									        {xtype:'numberfield',name: 'hbmInqAfterAcd', itemId:'hbmInqAfterAcd',disabled:true,width:160 ,minValue:0,maxValue:999},
									        ]
								},
								{
									xtype: 'fieldcontainer',
									layout:'hbox',
									itemId:'hbmInqAfterLowF',
									items: [
									        {xtype:'checkbox',boxLabel: 'Inquire Delay After SIM Low-Balance(sec)',boxLabelCls:'box_label',width:350, name: 'hbmInqAfterLow1',itemId:'hbmInqAfterLow1', 
									        	listeners:{
									        	change:function(field,newValue,oldValue,opts){
									        	this.up('fieldcontainer').getComponent('hbmInqAfterLow').setDisabled(oldValue);
									        }
									        }
									        },
									        {xtype:'numberfield',name: 'hbmInqAfterLow', itemId:'hbmInqAfterLow',disabled:true,width:160 ,minValue:0,maxValue:99999},
									        ]
								},
								{
									xtype: 'fieldcontainer',
									layout:'hbox',
									itemId:'hbmInqAfterRechargeF',
									items: [
									        {xtype:'checkbox',boxLabel: 'Inquire Delay After SIM Recharged(sec)',boxLabelCls:'box_label',width:350, name: 'hbmInqAfterRecharge1',itemId:'hbmInqAfterRecharge1', 
									        	listeners:{
									        	change:function(field,newValue,oldValue,opts){
									        	this.up('fieldcontainer').getComponent('hbmInqAfterRecharge').setDisabled(oldValue);
									        }
									        }
									        },
									        {xtype:'numberfield',name: 'hbmInqAfterRecharge', itemId:'hbmInqAfterRecharge',disabled:true,width:160 ,minValue:0,maxValue:99999},
									        ]
								},
								
								{xtype:'displayfield',anchor: '75%',value:'<hr>'},
						        
								{xtype:'checkbox',boxLabel:'Send USSD After The End of EACH Call(Quiet Monitor and Awake Processing)', boxLabelCls:'box_label',width:300,name: 'hbmUssdQuietMonitor',inputValue:1,checked:true,
									listeners:{
									change:function(field,newValue,oldValue,opts){
				           				var hbmUssdQuietWaitMin=groupTab1.down('numberfield[name=hbmUssdQuietWaitMin]');
				           				
				           				var hbmUssdAwakeContent=groupTab1.down('textfield[name=hbmUssdAwakeContent]');
				           				
				           				
				           				if(newValue){
				           					hbmUssdQuietWaitMin.setDisabled(false);
				           					hbmUssdAwakeContent.setDisabled(false);
				           				}else{
				           					hbmUssdQuietWaitMin.setDisabled(true);
				           					hbmUssdAwakeContent.setDisabled(true);
				           				}
				           			}
		       					}
								},
								{xtype:'numberfield',fieldLabel: 'Send USSD Interval(min)',decimalPrecision:0,anchor:'45%',name: 'hbmUssdQuietWaitMin',minValue:0,maxValue:999},
								{xtype:'textfield',anchor: '45%',fieldLabel:'Send USSD Content',name:'hbmUssdAwakeContent',maxLength:63},	
								
								{xtype:'displayfield',anchor: '75%',value:'<hr>'},
						       
//								{
//									xtype: 'radiogroup',
//									name: 'hbmBalanceModeAll',
//									fieldLabel: 'Balance Response Type',
//									columns: 3,
//									anchor: '65%',
//									items: [
//										{boxLabel: 'SMS&nbsp;',boxLabelCls:'box_label', name: 'hbmBalanceMode', inputValue: 0},
//										{boxLabel: 'USSD&nbsp;&nbsp;',boxLabelCls:'box_label', name: 'hbmBalanceMode', inputValue: 1},
//										]						
//									},
									 {xtype:'checkbox',boxLabel:'Check SMS Balance Info', boxLabelCls:'box_label',width:300,name: 'hbmBalanceSmsFlag',inputValue:1,checked:true,
							        	listeners:{
											change:function(field,newValue,oldValue,opts){
						           				var hbmBalanceSmsNumber=groupTab1.down('textfield[name=hbmBalanceSmsNumber]');
//						           				var hbmBalanceSmsPrefix=groupTab1.down('textfield[name=hbmBalanceSmsPrefix]');
						           				
						           				if(newValue){
						           					hbmBalanceSmsNumber.setDisabled(false);
//						           					hbmBalanceSmsPrefix.setDisabled(false);
						           					
						           				}else{
						           					hbmBalanceSmsNumber.setDisabled(true);
//						           					hbmBalanceSmsPrefix.setDisabled(true);
						           				}
						           				
						           				var hbmBalanceUssdFlag=groupTab1.down('checkbox[name=hbmBalanceUssdFlag]');
						           				
						           				var hbmBalancePrefix=groupTab1.down('textfield[name=hbmBalancePrefix]');
									        	var hbmBalancePrefix2=groupTab1.down('textfield[name=hbmBalancePrefix2]');
									        	var hbmBalancePrefix3=groupTab1.down('textfield[name=hbmBalancePrefix3]');
									        	var hbmBalancePrefix4=groupTab1.down('textfield[name=hbmBalancePrefix4]');
									        	var hbmBalancePrefix5=groupTab1.down('textfield[name=hbmBalancePrefix5]');
									        	var hbmThousandSymbol=groupTab1.down('combo[name=hbmThousandSymbol]');
									        	var hbmDecimalSymbol=groupTab1.down('combo[name=hbmDecimalSymbol]');
//									        	
									        	if(newValue){
									        		hbmBalancePrefix.setDisabled(false);
									        		hbmBalancePrefix2.setDisabled(false);
									        		hbmBalancePrefix3.setDisabled(false);
									        		hbmBalancePrefix4.setDisabled(false);
									        		hbmBalancePrefix5.setDisabled(false);
									        		hbmThousandSymbol.setDisabled(false);
									        		hbmDecimalSymbol.setDisabled(false);
									        	}else if(hbmBalanceUssdFlag.getValue()==0){
									        		hbmBalancePrefix.setDisabled(true);
									        		hbmBalancePrefix2.setDisabled(true);
									        		hbmBalancePrefix3.setDisabled(true);
									        		hbmBalancePrefix4.setDisabled(true);
									        		hbmBalancePrefix5.setDisabled(true);
									        		hbmThousandSymbol.setDisabled(true);
									        		hbmDecimalSymbol.setDisabled(true);
									        	}
						           				
						           			}
			       						}
									},
							        {xtype:'textfield',anchor: '45%',fieldLabel:'<label onmouseover=moveOver("sms_from_number",event) onmouseout=moveOut() class="tips_label">SMS From Numbers</label>',name:'hbmBalanceSmsNumber',maxLength:63},
							        
							        {xtype:'checkbox',boxLabel:'Check USSD Balance Info', boxLabelCls:'box_label',width:300,name: 'hbmBalanceUssdFlag',inputValue:1,checked:true,
							        	listeners:{
								        	change:function(field,newValue,oldValue,opts){
							        			var hbmBalanceSmsFlag=groupTab1.down('checkbox[name=hbmBalanceSmsFlag]');
							        		
							        			var hbmBalancePrefix=groupTab1.down('textfield[name=hbmBalancePrefix]');
									        	var hbmBalancePrefix2=groupTab1.down('textfield[name=hbmBalancePrefix2]');
									        	var hbmBalancePrefix3=groupTab1.down('textfield[name=hbmBalancePrefix3]');
									        	var hbmBalancePrefix4=groupTab1.down('textfield[name=hbmBalancePrefix4]');
									        	var hbmBalancePrefix5=groupTab1.down('textfield[name=hbmBalancePrefix5]');
									        	var hbmThousandSymbol=groupTab1.down('combo[name=hbmThousandSymbol]');
									        	var hbmDecimalSymbol=groupTab1.down('combo[name=hbmDecimalSymbol]');
									        	
//									        	
									        	if(newValue){
									        		hbmBalancePrefix.setDisabled(false);
									        		hbmBalancePrefix2.setDisabled(false);
									        		hbmBalancePrefix3.setDisabled(false);
									        		hbmBalancePrefix4.setDisabled(false);
									        		hbmBalancePrefix5.setDisabled(false);
									        		hbmThousandSymbol.setDisabled(false);
									        		hbmDecimalSymbol.setDisabled(false);
									        	}else if(hbmBalanceSmsFlag.getValue()==0){
									        		hbmBalancePrefix.setDisabled(true);
									        		hbmBalancePrefix2.setDisabled(true);
									        		hbmBalancePrefix3.setDisabled(true);
									        		hbmBalancePrefix4.setDisabled(true);
									        		hbmBalancePrefix5.setDisabled(true);
									        		hbmThousandSymbol.setDisabled(true);
									        		hbmDecimalSymbol.setDisabled(true);
									        	}
							        		}
							        	}
							        },
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Balance Prefix Keys-1</label>',name:'hbmBalancePrefix',maxLength:63},
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Balance Prefix Keys-2</label>',name:'hbmBalancePrefix2',maxLength:63},
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Balance Prefix Keys-3</label>',name:'hbmBalancePrefix3',maxLength:63},
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Balance Prefix Keys-4</label>',name:'hbmBalancePrefix4',maxLength:63},
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Balance Prefix Keys-5</label>',name:'hbmBalancePrefix5',maxLength:63},
							        {
							        	xtype:'combo',
						        	   name: 'hbmThousandSymbol', 
						        	   mode: 'local',
						        	   fieldLabel: 'Digit Thousand Symbol', 
						        	   queryMode: 'local',
						        	   anchor: '45%',
						        	   editable:false,
						        	   displayField : 'name',
						        	   valueField : 'statusId',
						        	   store : Ext.create('Ext.data.Store', {
											fields : [ 'name', 'statusId' ],
											data : [ {
												name : '.',
												statusId : 46
											}, {
												name : ',',
												statusId : 44
											}, {
												name : '[SPACE]',
												statusId : 32
											} ]
										}),
										value:44
							        },{
							        	xtype:'combo',
						        	   name: 'hbmDecimalSymbol', 
						        	   mode: 'local',
						        	   fieldLabel: 'Digit Decimal Symbol', 
						        	   queryMode: 'local',
						        	   anchor: '45%',
						        	   editable:false,
						        	   displayField : 'name',
						        	   valueField : 'statusId',
						        	   store : Ext.create('Ext.data.Store', {
											fields : [ 'name', 'statusId' ],
											data : [ {
												name : '.',
												statusId : 46
											}, {
												name : ',',
												statusId : 44
											}]
										}),
										value:46
							        
							        },
//							        {xtype:'numberfield',anchor: '45%',fieldLabel: 'Reserve Balance Card',name: 'resvBalanceCard',value:3,minValue:0,maxValue:999},
							        
									
									{xtype:'displayfield',anchor: '75%',value:'<hr>'},
							        
									{xtype:'checkbox',boxLabel:'Auto Recharge while balance was less than Low Balance Threshold', boxLabelCls:'box_label',width:300,name: 'hbmBalanceRecharge',inputValue:1,checked:true,
								        	listeners:{
											change:function(field,newValue,oldValue,opts){
						           				var hbmBalanceRetries=groupTab1.down('numberfield[name=hbmBalanceRetries]');
						           				var hbmBalanceWaitMin=groupTab1.down('numberfield[name=hbmBalanceWaitMin]');
						           				var hbmBalanceInterval=groupTab1.down('numberfield[name=hbmBalanceInterval]');
						           				var hbmBalanceFail=groupTab1.down('textfield[name=hbmBalanceFail]');
						           				var hbmBalanceFail2=groupTab1.down('textfield[name=hbmBalanceFail2]');
						           				var hbmBalanceFail3=groupTab1.down('textfield[name=hbmBalanceFail3]');
						           				var hbmBalanceFail4=groupTab1.down('textfield[name=hbmBalanceFail4]');
						           				var hbmBalanceFail5=groupTab1.down('textfield[name=hbmBalanceFail5]');
						           				var hbmBalanceSucc=groupTab1.down('textfield[name=hbmBalanceSucc]');
						           				
						           				if(newValue){
						           					hbmBalanceRetries.setDisabled(false);
						           					hbmBalanceWaitMin.setDisabled(false);
						           					hbmBalanceInterval.setDisabled(false);
						           					hbmBalanceFail.setDisabled(false);
						           					hbmBalanceFail2.setDisabled(false);
						           					hbmBalanceFail3.setDisabled(false);
						           					hbmBalanceFail4.setDisabled(false);
						           					hbmBalanceFail5.setDisabled(false);
						           					hbmBalanceSucc.setDisabled(false);
						           				}else{
						           					hbmBalanceRetries.setDisabled(true);
						           					hbmBalanceWaitMin.setDisabled(true);
						           					hbmBalanceInterval.setDisabled(true);
						           					hbmBalanceFail.setDisabled(true);
						           					hbmBalanceFail2.setDisabled(true);
						           					hbmBalanceFail3.setDisabled(true);
						           					hbmBalanceFail4.setDisabled(true);
						           					hbmBalanceFail5.setDisabled(true);
						           					hbmBalanceSucc.setDisabled(true);
						           				}
						           			}
				       					}
									},
									{xtype:'numberfield',fieldLabel: 'Max Recharge Retries',ulan:'maxFailRetries',anchor:'45%',name: 'hbmBalanceRetries',minValue:0,maxValue:99},
									{xtype:'numberfield',fieldLabel: 'Request Timeout(min)',anchor:'45%',name: 'hbmBalanceWaitMin',minValue:0,maxValue:99},
									{xtype:'numberfield',fieldLabel: 'Retries Interval(min)',anchor:'45%',name: 'hbmBalanceInterval',minValue:0,maxValue:99},
									
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Recharge Success Keys</label>',name:'hbmBalanceSucc',maxLength:63},
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Recharge Failure Keys-1</label>',name:'hbmBalanceFail',maxLength:63},
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Recharge Failure Keys-2</label>',name:'hbmBalanceFail2',maxLength:63},
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Recharge Failure Keys-3</label>',name:'hbmBalanceFail3',maxLength:63},
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Recharge Failure Keys-4</label>',name:'hbmBalanceFail4',maxLength:63},
							        {xtype:'textfield',anchor: '75%',fieldLabel:'<label onmouseover=moveOver("grp_keys",event) onmouseout=moveOut() class="tips_label">Recharge Failure Keys-5</label>',name:'hbmBalanceFail5',maxLength:63},
							        
							        
							 ]
						
					},{
						xtype: 'fieldset',
						title: 'Human Behavior - Blocked Monitor',
						layout: 'anchor',
						name:'blockedMonitor',
						collapsible: true,
						collapsed: true,
						fieldDefaults: {
				            labelAlign: 'left',
				            anchor: '100%',
				            labelWidth: 180,
				        },
						items: [{xtype:'checkbox',boxLabel:'Enable SIM Card Blocked Monitor',boxLabelCls:'box_label',width:300, name: 'hbmBlockedCheck',inputValue:1, checked:true,
							           		listeners:{
												change:function(field,newValue,oldValue,opts){
							           				var hbmBlockedSmsFlag=groupTab1.down('checkbox[name=hbmBlockedSmsFlag]');
							           				var hbmBlockedSmsNumber=groupTab1.down('textfield[name=hbmBlockedSmsNumber]');
							           				var hbmBlockedUssdFlag=groupTab1.down('checkbox[name=hbmBlockedUssdFlag]');
							           				var hbmBlockedFail=groupTab1.down('textfield[name=hbmBlockedFail]');
							           				var hbmBlockedFail2=groupTab1.down('textfield[name=hbmBlockedFail2]');
							           				var hbmBlockedFail3=groupTab1.down('textfield[name=hbmBlockedFail3]');
							           				
							           				if(newValue){
							           					hbmBlockedSmsFlag.setDisabled(false);
							           					hbmBlockedSmsNumber.setDisabled(false);
							           					hbmBlockedUssdFlag.setDisabled(false);
							           					hbmBlockedFail.setDisabled(false);
							           					hbmBlockedFail2.setDisabled(false);
							           					hbmBlockedFail3.setDisabled(false);
							           				}else{
							           					hbmBlockedSmsFlag.setDisabled(true);
							           					hbmBlockedSmsNumber.setDisabled(true);
							           					hbmBlockedUssdFlag.setDisabled(true);
							           					hbmBlockedFail.setDisabled(true);
							           					hbmBlockedFail2.setDisabled(true);
							           					hbmBlockedFail3.setDisabled(true);
							           				}
							           			}
			           						}
							           	},
							           	{xtype:'checkbox',boxLabel:'Check SMS Blocked Info',boxLabelCls:'box_label',width:300, name: 'hbmBlockedSmsFlag',inputValue:1, checked:true,
											listeners:{
												change:function(field,newValue,oldValue,opts){
							           				var hbmBlockedSmsNumber=groupTab1.down('textfield[name=hbmBlockedSmsNumber]');
							           				if(newValue){
							           					hbmBlockedSmsNumber.setDisabled(false);
							           				}else{
							           					hbmBlockedSmsNumber.setDisabled(true);
							           				}
							           			}
							           		}
										},
										{xtype:'textfield',anchor:'75%',fieldLabel:'<label onmouseover=moveOver("sms_from_number",event) onmouseout=moveOut() class="tips_label">SMS From Numbers</label>',name:'hbmBlockedSmsNumber',maxLength:63},
										{xtype:'checkbox',boxLabel:'Check USSD Blocked Info',boxLabelCls:'box_label',width:300, name: 'hbmBlockedUssdFlag',inputValue:1, checked:true,},
										{xtype:'textfield',anchor:'75%',fieldLabel:'<label onmouseover=moveOver("block_failure_keys",event) onmouseout=moveOut() class="tips_label">Blocked Check Keys-1</label>',name:'hbmBlockedFail',maxLength:63},
								        {xtype:'textfield',anchor:'75%',fieldLabel:'<label onmouseover=moveOver("block_failure_keys",event) onmouseout=moveOut() class="tips_label">Blocked Check Keys-2</label>',name:'hbmBlockedFail2',maxLength:63},
								        {xtype:'textfield',anchor:'75%',fieldLabel:'<label onmouseover=moveOver("block_failure_keys",event) onmouseout=moveOut() class="tips_label">Blocked Check Keys-3</label>',name:'hbmBlockedFail3',maxLength:63},
									]
					
					}

				],
				
		       
		    	maintenance:maintenance,
		    	createTbar:function(){
		    		var tbar = [];
		    		if(!this.maintenance){
		    			
		    			var commit = Ext.create('Ext.button.Button',{
				            text: 'Commit',
				            iconCls:'save',
				            flag:"domain_edit",
				            ulan:'btCommit',
//				            formBind: true, //only enabled once the form is valid
				            disabled: true,
				            formBind: false,
				            handler: function() {
			            		var tmp = this.up('form').down('fieldset[itemId=group_info]').down('fieldcontainer[itemId=group_name]');
			            		if(tmp.getComponent('picture').flag==0)
			                	return;
				                var form = this.up('form').getForm();
				                if (form.isValid()) {				                	
				                	var sc=0;
				                	var maxCallCountCard1=form.findField('maxCallCountCard1');
				                	var maxCallCountOnce1=form.findField('maxCallCountOnce1');
				                	var maxCallCountDay1=form.findField('maxCallCountDay1');
				                	var maxCallCountMonth1=form.findField('maxCallCountMonth1');
				                	var maxCallTimeCard1=form.findField('maxCallTimeCard1');
				                	var maxCallTimeOnce1=form.findField('maxCallTimeOnce1');
				                	var maxCallTimeDay1=form.findField('maxCallTimeDay1');
				                	var maxCallTimeMonth1=form.findField('maxCallTimeMonth1');
				                	var maxIdleTimeOnce1=form.findField('maxIdleTimeOnce1');
				                	var maxWorkTimeOnce1=form.findField('maxWorkTimeOnce1');
				                	var maxSmsCountCard1=form.findField('maxSmsCountCard1');
				                	var maxSmsCountOnce1=form.findField('maxSmsCountOnce1');
				                	var maxSmsCountDay1=form.findField('maxSmsCountDay1');
				                	var maxSmsCountMonth1=form.findField('maxSmsCountMonth1');
				                	
				                	var maxUssdCountCard1=form.findField('maxUssdCountCard1');
				                	var maxUssdCountOnce1=form.findField('maxUssdCountOnce1');
				                	var maxUssdCountDay1=form.findField('maxUssdCountDay1');
				                	var maxUssdCountMonth1=form.findField('maxUssdCountMonth1');

				                	var maxPromTimeCard1=form.findField('maxPromTimeCard1');
				                	var maxPromTimeCall1=form.findField('maxPromTimeCall1');
				                	var maxNoBalanceWait1=form.findField('maxNoBalanceWait1');
				                	var maxRegFailCard1=form.findField('maxRegFailCard1');

				                	var maxWorkTimeCard1=form.findField('maxWorkTimeCard1');

				                	var maxGroupTimeCard1=form.findField('maxGroupTimeCard1');

				                	
				                	if(maxNoBalanceWait1.getValue()){
				                		sc=sc+maxNoBalanceWait1.inputValue;
				                	}
				                	if(maxPromTimeCall1.getValue()){
				                		sc=sc+maxPromTimeCall1.inputValue;
				                	}
				                	if(maxPromTimeCard1.getValue()){
				                		sc=sc+maxPromTimeCard1.inputValue;
				                	}
				                	if(maxRegFailCard1.getValue()){
				                		sc=sc+maxRegFailCard1.inputValue;
				                	}

				                	if(maxCallCountCard1.getValue()){
				                		sc=sc+maxCallCountCard1.inputValue;
				                	}
				                	if(maxCallCountOnce1.getValue()){
				                		sc=sc+maxCallCountOnce1.inputValue;
				                	}
				                	if(maxCallCountDay1.getValue()){
				                		sc=sc+maxCallCountDay1.inputValue;
				                	}
				                	if(maxCallCountMonth1.getValue()){
				                		sc=sc+maxCallCountMonth1.inputValue;
				                	}
				                	if(maxCallTimeCard1.getValue()){
				                		sc=sc+maxCallTimeCard1.inputValue;
				                	}
				                	if(maxCallTimeOnce1.getValue()){
				                		sc=sc+maxCallTimeOnce1.inputValue;
				                	}
				                	if(maxCallTimeDay1.getValue()){
				                		sc=sc+maxCallTimeDay1.inputValue;
				                	}
				                	if(maxCallTimeMonth1.getValue()){
				                		sc=sc+maxCallTimeMonth1.inputValue;
				                	}
				                	if(maxIdleTimeOnce1.getValue()){
				                		sc=sc+maxIdleTimeOnce1.inputValue;
				                	}
				                	if(maxWorkTimeOnce1.getValue()){
				                		sc=sc+maxWorkTimeOnce1.inputValue;
				                	}
				                	if(maxSmsCountCard1.getValue()){
				                		sc=sc+maxSmsCountCard1.inputValue;
				                	}
				                	if(maxSmsCountOnce1.getValue()){
				                		sc=sc+maxSmsCountOnce1.inputValue;
				                	}
				                	if(maxSmsCountDay1.getValue()){
				                		sc=sc+maxSmsCountDay1.inputValue;
				                	}
				                	if(maxSmsCountMonth1.getValue()){
				                		sc=sc+maxSmsCountMonth1.inputValue;
				                	}
				                	
				                	if(maxUssdCountCard1.getValue()){
				                		sc=sc+maxUssdCountCard1.inputValue;
				                	}
				                	if(maxUssdCountOnce1.getValue()){
				                		sc=sc+maxUssdCountOnce1.inputValue;
				                	}
				                	if(maxUssdCountDay1.getValue()){
				                		sc=sc+maxUssdCountDay1.inputValue;
				                	}
				                	if(maxUssdCountMonth1.getValue()){
				                		sc=sc+maxUssdCountMonth1.inputValue;
				                	}				                	
				                	if(maxWorkTimeCard1.getValue()){
				                		sc=sc+maxWorkTimeCard1.inputValue;
				                	}				                	
				                	if(maxGroupTimeCard1.getValue()){
				                		sc=sc+maxGroupTimeCard1.inputValue;
				                	}				                	
				                	this.up('form').getForm().findField('selectCond').setValue(sc);				                					               	
				                	Ext.Ajax.request({
				                		url:'groupManager!updateGroup.action',
				                		method:'POST',
				                		params:form.getValues(),
				                		callback: function (options, success, response) {
					                    	var obj=Ext.JSON.decode(response.responseText);			
					                    	if(obj['success']){
					                    		ip.commitSuccess(groupTab1,groupTab1.store);
//					                    		treeFn.refreshNode('operationTree','fgroup_-'+form.findField('domainUuid').getValue(),null);
					                    	}else{
					                    		ip.commitFailure(groupTab1);
					                    	}
				                    	}
				                	});
				                }
				            }
				        })
				        tbar.push(commit);
		    			if(tbar.length){
			    			tbar.push('-');
			    		}
		    			ip.createEditButton(groupTab1,groupTab1.store,tbar);
		    			tbar[tbar.length-2].flag = "domain_edit";
		    			
		    			var importS = Ext.create('Ext.button.Button',{
				       		 xtype:'button',
				       		 text:'Import',
				       		 ulan:'btImport',
				       		 iconCls:'upgrade',
				       		 flag:"domain_edit",
				       		 listeners:{
				       		 	click:function(){
		    						var domainUuid=Ext.getCmp('groupPanel').domainUuid;
				       		 		var grpUuid=Ext.getCmp('groupPanel').treeId;
				       		 		var cmpId=this.up('form').id;
				       		 		var name = this.up('form').store.getAt(0).get('name');
//				       		 		alert(domainUuid+","+grpUuid+","+cmpId);
				       		 		var importConfig=Ext.getCmp('importConfig');
				       		 		if(!importConfig){
				       		 			importConfig=Ext.create('app.view.operation.ImportConfig',{importMode:'importGroup',cmpId:cmpId});
				       		 			lanControll.setLan(importConfig);
				       		 		}
				       		 		importConfig.importMode="importGroup";
				       		 		importConfig.cmpId=cmpId;
				       		 		importConfig.down('form').getForm().findField('specSysUuid').setVisible(false);
				       		 		importConfig.down('form').getForm().findField('sysLockedFlag').setVisible(false);
				       		 		importConfig.down('form').getForm().findField('importLic').setVisible(false);
				       		 		importConfig.down('form').getForm().findField('domainUuid').setValue(domainUuid);
					       		 	importConfig.down('form').getForm().findField('name').setValue(name);
					       		 	importConfig.down('form').getForm().findField('uuid').setValue(grpUuid);
					       		 	importConfig.show();
		    					}
				       	 	}
				       	 
				       	});
						tbar.push(importS);
						tbar.push('-');
		    		}
		    		
		    		var exportS = Ext.create('Ext.button.Button',{
			       		 xtype:'button',
			       		 text:'Export',
			       		 ulan:'btExport',
			       		 iconCls:'export',
			       		 flag:"domain_read",
			       		 listeners:{
			       		 	click:function(){
//			       				alert(groupTab1.getEl().getHTML());
//			       				console.log(groupTab1.getEl().getHTML());
		    					var grpUuid=Ext.getCmp('groupPanel').treeId;;
		    					
		    					Ext.MessageBox.confirm(boxInfo,boxBackup,function(e) {
		                    		if( e == 'yes' ){
		                    			var boxObj = {
		                    		    		title:boxInfo,
		                    		    		width : 300,
		                    		    		msg:boxWaitMsg,
		                    		    		modal:true,
		                    		    		closable:false,
		                    		    		wait:true
		                    		    };
		                    			var msg = Ext.MessageBox.show(boxObj);
		                    			
		                    			Ext.Ajax.request({
					                		url:'exportConfig!exportGroup.action?grpUuid='+grpUuid,
					                		method:'POST',
					                		callback: function (options, success, response) {
		                    					boxObj.wait = false;
		                    					msg.hide();
												var obj=Ext.JSON.decode(response.responseText);
						                    	if(obj["success"]){
						                    		window.location.href="download/"+obj["fileName"];
						                    	}else{
						                    		Ext.MessageBox.alert(boxFailture,boxExportFail);
						                    	}
					                    	}
					                	})
		                    			
		                    			
		                    		}});
		    					
				    			
			       	 		}
			       	 	}
			       	 
			       	 });
					tbar.push(exportS);
					tbar.push('-');
		    		
		    		
		    		var refresh = Ext.create('Ext.button.Button',{
			       		 xtype:'button',
			       		 text:'Refresh',
			       		 ulan:'btRefresh',
			       		 iconCls:'refresh2',
			       		 flag:"domain_read",
			       		 listeners:{
			       		 	click:function(){
		    					
//		    					var nf=this.up('form').query('numberfield');
//		    					var temp=nf.length;
//		    					for(var i=0;i<nf.length;i++){
//		    						temp=temp+","+nf[i].name;
//		    					}
//		    					this.up('form').getForm().findField('detailDesc').setValue(temp);
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
		    		},
				    	
		    	},
		});
		groupTab1.addListener("afterlayout",function(){
			privilege.procPrivilege(groupTab1);
		},this,{single:true});
		var tab = groupTab1;
		var groupLoadMask=new Ext.LoadMask(tab, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
		store.on('load', function(){
			var hbmImeiFlagAll=tab.down('radiogroup[name=hbmImeiFlagAll]');
			hbmImeiFlagAll.loadFlag=false;
			var r=store.getAt(0);
			Ext.suspendLayouts();
			tab.loadRecord(r);
			tab.down('radiogroup[itemId=orderTypeAll]').setValue(r.get('orderType'));
			var cond=r.get('selectCond');        				
			if((cond&1)>0){
				tab.down('checkbox[itemId=maxCallCountCard1]').setValue(true);
				tab.down('numberfield[itemId=maxCallCountCard]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxCallCountCard1]').setValue(false);
				tab.down('numberfield[itemId=maxCallCountCard]').setDisabled(true);
			}
			if((cond&2)>0){
				tab.down('checkbox[itemId=maxCallCountOnce1]').setValue(true);
				tab.down('numberfield[itemId=maxCallCountOnce]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxCallCountOnce1]').setValue(false);
				tab.down('numberfield[itemId=maxCallCountOnce]').setDisabled(true);
			}
			if((cond&4)>0){
				tab.down('checkbox[itemId=maxCallCountDay1]').setValue(true);
				tab.down('numberfield[itemId=maxCallCountDay]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxCallCountDay1]').setValue(false);
				tab.down('numberfield[itemId=maxCallCountDay]').setDisabled(true);
			}
			if((cond&8)>0){
				tab.down('checkbox[itemId=maxCallCountMonth1]').setValue(true);
				tab.down('numberfield[itemId=maxCallCountMonth]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxCallCountMonth1]').setValue(false);
				tab.down('numberfield[itemId=maxCallCountMonth]').setDisabled(true);
			}
			if((cond&16)>0){
				tab.down('checkbox[itemId=maxCallTimeCard1]').setValue(true);
				tab.down('numberfield[itemId=maxCallTimeCard]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxCallTimeCard1]').setValue(false);
				tab.down('numberfield[itemId=maxCallTimeCard]').setDisabled(true);
			}
			
			if((cond&32)>0){
				tab.down('checkbox[itemId=maxCallTimeOnce1]').setValue(true);
				tab.down('numberfield[itemId=maxCallTimeOnce]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxCallTimeOnce1]').setValue(false);
				tab.down('numberfield[itemId=maxCallTimeOnce]').setDisabled(true);
			}
			
			if((cond&64)>0){
				tab.down('checkbox[itemId=maxCallTimeDay1]').setValue(true);
				tab.down('numberfield[itemId=maxCallTimeDay]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxCallTimeDay1]').setValue(false);
				tab.down('numberfield[itemId=maxCallTimeDay]').setDisabled(true);
			}
			if((cond&128)>0){
				tab.down('checkbox[itemId=maxCallTimeMonth1]').setValue(true);
				tab.down('numberfield[itemId=maxCallTimeMonth]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxCallTimeMonth1]').setValue(false);
				tab.down('numberfield[itemId=maxCallTimeMonth]').setDisabled(true);
			}
			
			if((cond&256)>0){
				tab.down('checkbox[itemId=maxSmsCountCard1]').setValue(true);
				tab.down('numberfield[itemId=maxSmsCountCard]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxSmsCountCard1]').setValue(false);
				tab.down('numberfield[itemId=maxSmsCountCard]').setDisabled(true);
			}
			if((cond&512)>0){
				tab.down('checkbox[itemId=maxSmsCountOnce1]').setValue(true);
				tab.down('numberfield[itemId=maxSmsCountOnce]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxSmsCountOnce1]').setValue(false);
				tab.down('numberfield[itemId=maxSmsCountOnce]').setDisabled(true);
			}
			if((cond&1024)>0){
				tab.down('checkbox[itemId=maxSmsCountDay1]').setValue(true);
				tab.down('numberfield[itemId=maxSmsCountDay]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxSmsCountDay1]').setValue(false);
				tab.down('numberfield[itemId=maxSmsCountDay]').setDisabled(true);
			}
			if((cond&2048)>0){
				tab.down('checkbox[itemId=maxSmsCountMonth1]').setValue(true);
				tab.down('numberfield[itemId=maxSmsCountMonth]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxSmsCountMonth1]').setValue(false);
				tab.down('numberfield[itemId=maxSmsCountMonth]').setDisabled(true);
			}
			
			if((cond&4096)>0){
				tab.down('checkbox[itemId=maxUssdCountCard1]').setValue(true);
				tab.down('numberfield[itemId=maxUssdCountCard]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxUssdCountCard1]').setValue(false);
				tab.down('numberfield[itemId=maxUssdCountCard]').setDisabled(true);
			}
			if((cond&8192)>0){
				tab.down('checkbox[itemId=maxUssdCountOnce1]').setValue(true);
				tab.down('numberfield[itemId=maxUssdCountOnce]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxUssdCountOnce1]').setValue(false);
				tab.down('numberfield[itemId=maxUssdCountOnce]').setDisabled(true);
			}
			if((cond&16384)>0){
				tab.down('checkbox[itemId=maxUssdCountDay1]').setValue(true);
				tab.down('numberfield[itemId=maxUssdCountDay]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxUssdCountDay1]').setValue(false);
				tab.down('numberfield[itemId=maxUssdCountDay]').setDisabled(true);
			}
			if((cond&32768)>0){
				tab.down('checkbox[itemId=maxUssdCountMonth1]').setValue(true);
				tab.down('numberfield[itemId=maxUssdCountMonth]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxUssdCountMonth1]').setValue(false);
				tab.down('numberfield[itemId=maxUssdCountMonth]').setDisabled(true);
			}
			
			if((cond&65536)>0){
				tab.down('checkbox[itemId=maxWorkTimeOnce1]').setValue(true);
				tab.down('numberfield[itemId=maxWorkTimeOnce]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxWorkTimeOnce1]').setValue(false);
				tab.down('numberfield[itemId=maxWorkTimeOnce]').setDisabled(true);
			}

			if((cond&131072)>0){
				tab.down('checkbox[itemId=maxIdleTimeOnce1]').setValue(true);
				tab.down('numberfield[itemId=maxIdleTimeOnce]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxIdleTimeOnce1]').setValue(false);
				tab.down('numberfield[itemId=maxIdleTimeOnce]').setDisabled(true);
			}
			
			if((cond&262144)>0){
				tab.down('checkbox[itemId=maxPromTimeCard1]').setValue(true);
				tab.down('numberfield[itemId=maxPromTimeCard]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxPromTimeCard1]').setValue(false);
				tab.down('numberfield[itemId=maxPromTimeCard]').setDisabled(true);
			}
			if((cond&1048576)>0){
				tab.down('checkbox[itemId=maxPromTimeCall1]').setValue(true);
				tab.down('numberfield[itemId=maxPromTimeCall]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxPromTimeCall1]').setValue(false);
				tab.down('numberfield[itemId=maxPromTimeCall]').setDisabled(true);
			}
			if((cond&2097152)>0){
				tab.down('checkbox[itemId=maxNoBalanceWait1]').setValue(true);
				tab.down('numberfield[itemId=maxNoBalanceWait]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxNoBalanceWait1]').setValue(false);
				tab.down('numberfield[itemId=maxNoBalanceWait]').setDisabled(true);
			}
			if((cond&524288)>0){
				tab.down('checkbox[itemId=maxRegFailCard1]').setValue(true);
				tab.down('numberfield[itemId=maxRegFailCard]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxRegFailCard1]').setValue(false);
				tab.down('numberfield[itemId=maxRegFailCard]').setDisabled(true);
			}

			if((cond&4194304)>0){
				tab.down('checkbox[itemId=maxWorkTimeCard1]').setValue(true);
				tab.down('numberfield[itemId=maxWorkTimeCard]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxWorkTimeCard1]').setValue(false);
				tab.down('numberfield[itemId=maxWorkTimeCard]').setDisabled(true);
			}
			
			if((cond&8388608)>0){
				tab.down('checkbox[itemId=maxGroupTimeCard1]').setValue(true);
				tab.down('numberfield[itemId=maxGroupTimeCard]').setDisabled(false);
			}else{
				tab.down('checkbox[itemId=maxGroupTimeCard1]').setValue(false);
				tab.down('numberfield[itemId=maxGroupTimeCard]').setDisabled(true);
			}
			
			var oprStatus=parseInt(r.get('oprStatus'));
			var runStatus=parseInt(r.get('runStatus'));
			var opr=tab.getForm().findField('oprStatus');
			var run=tab.getForm().findField('runStatus');
			  
			opr.setValue(rs.oprStatus(oprStatus));
			run.setValue(rs.runStatus(runStatus));
			

//			var hbmInqTimeoutMin1=tab.down('checkbox[itemId=hbmInqTimeoutMin1]');
//			var hbmMaxInqCount1=tab.down('checkbox[itemId=hbmMaxInqCount1]');
			var hbmInqAfterReg1=tab.down('checkbox[itemId=hbmInqAfterReg1]');
			var hbmInqAfterCall1=tab.down('checkbox[itemId=hbmInqAfterCall1]');
			var hbmInqAfterAcd1=tab.down('checkbox[itemId=hbmInqAfterAcd1]');
			var hbmInqAfterLow1=tab.down('checkbox[itemId=hbmInqAfterLow1]');
			var hbmInqAfterRecharge1=tab.down('checkbox[itemId=hbmInqAfterRecharge1]');

			var hbmInqTimeoutMin=parseInt(r.get('hbmInqTimeoutMin'));
			var hbmMaxInqCount=parseInt(r.get('hbmMaxInqCount'));
			var hbmInqAfterReg=parseInt(r.get('hbmInqAfterReg'));
			var hbmInqAfterCall=parseInt(r.get('hbmInqAfterCall'));
			var hbmInqAfterAcd=parseInt(r.get('hbmInqAfterAcd'));
			var hbmInqAfterLow=parseInt(r.get('hbmInqAfterLow'));
			var hbmInqAfterRecharge=parseInt(r.get('hbmInqAfterRecharge'));
			
//			if(hbmInqTimeoutMin>0){
//				hbmInqTimeoutMin1.setValue(true);
//			}else{
//				hbmInqTimeoutMin1.setValue(false);
//			}
//			if(hbmMaxInqCount>0){
//				hbmMaxInqCount1.setValue(true);
//			}else{
//				hbmMaxInqCount1.setValue(false);
//			}
			if(hbmInqAfterReg>0){
				hbmInqAfterReg1.setValue(true);
			}else{
				hbmInqAfterReg1.setValue(false);
			}
			if(hbmInqAfterCall>0){
				hbmInqAfterCall1.setValue(true);
			}else{
				hbmInqAfterCall1.setValue(false);
			}
			if(hbmInqAfterAcd>0){
				hbmInqAfterAcd1.setValue(true);
			}else{
				hbmInqAfterAcd1.setValue(false);
			}
			if(hbmInqAfterLow>0){
				hbmInqAfterLow1.setValue(true);
			}else{
				hbmInqAfterLow1.setValue(false);
			}
			if(hbmInqAfterRecharge>0){
				hbmInqAfterRecharge1.setValue(true);
			}else{
				hbmInqAfterRecharge1.setValue(false);
			}
			
			
			
			Ext.Ajax.request({
        		url:'licenseManager!checkHBMOrAPI.action?domainUuid='+r.get('domainUuid'),
        		method:'POST',
        		callback: function (options, success, response) {
                	var obj=Ext.JSON.decode(response.responseText);			
                	if(obj['success']){
                		var promLimitDetail=groupTab1.down('fieldset[name=promLimitDetail]');
                		var cdrMonitor=groupTab1.down('fieldset[name=cdrMonitor]');
                		var autoGeneration=groupTab1.down('fieldset[name=autoGeneration]');
                		var balanceCheckDetail=groupTab1.down('fieldset[name=balanceCheckDetail]');
                		var blockedMonitor=groupTab1.down('fieldset[name=blockedMonitor]');
                		promLimitDetail.setTitle(lanControll.getLanValue('fsPromotionManagement')+' ('+obj['hbmMsg']+')');
                		cdrMonitor.setTitle(lanControll.getLanValue('cdrMonitor')+' ('+obj['hbmMsg']+')');
                		autoGeneration.setTitle(lanControll.getLanValue('autoGeneration')+' ('+obj['hbmMsg']+')');
                		balanceCheckDetail.setTitle(lanControll.getLanValue('balanceCheckDetail')+' ('+obj['hbmMsg']+')');
                		blockedMonitor.setTitle(lanControll.getLanValue('blockedMonitor')+' ('+obj['hbmMsg']+')');
                	}else{
                	}
            	}
        	});
			
			var hbmImeiFlagAll=tab.down('radiogroup[name=hbmImeiFlagAll]');
			hbmImeiFlagAll.loadFlag=true;
			Ext.resumeLayouts(true);
			
		});
		
		var comboxStore = Ext.create("app.store.util.ComboxStore",{});
		tab.comboxStore = comboxStore;
		comboxStore.on('beforeload',function(){
			comboxStore.loadFlag = false;
		})
		var zoneStore=tab.getForm().findField('zoneUuid').store;
		var hbmPromNextGrpStore=tab.down('combo[name=hbmPromNextGrp]').store;
		var hbmNextBlockedGrpStore=tab.down('combo[name=hbmNextBlockedGrp]').store;
		var hbmNextNobalGrpStore=tab.down('combo[name=hbmNextNobalGrp]').store;
		var hbmTestGrpUuid=tab.down('combo[name=hbmTestGrpUuid]').store;
		var paidGrpUuidStore=tab.down('combo[name=paidGrpUuid]').store;
		var hbmMasterGrpStore=tab.down('combo[name=hbmMasterGrpUuid]').store;
		comboxStore.removeAll();
		comboxStore.on('load',function(){
			zoneStore.removeAll();
			hbmPromNextGrpStore.removeAll();
			hbmNextNobalGrpStore.removeAll();
			hbmNextBlockedGrpStore.removeAll();
			hbmTestGrpUuid.removeAll();
			paidGrpUuidStore.removeAll();
			hbmMasterGrpStore.removeAll();
			hbmTestGrpUuid.add({id:0,name:'NULL'});
			paidGrpUuidStore.add({id:0,name:'NULL'});
			hbmPromNextGrpStore.add({id:0,name:'NULL'});
			hbmNextNobalGrpStore.add({id:0,name:'NULL'});
			hbmNextBlockedGrpStore.add({id:0,name:'NULL'});
			hbmMasterGrpStore.add({id:0,name:'NULL'});
			for(var i=0; i<comboxStore.getCount(); i++){
				if(comboxStore.getAt(i).get('type')=='zone'){
					zoneStore.add(comboxStore.getAt(i));
				}else if(comboxStore.getAt(i).get('type')=='group'){
					hbmPromNextGrpStore.add(comboxStore.getAt(i));
					hbmNextNobalGrpStore.add(comboxStore.getAt(i));
					hbmNextBlockedGrpStore.add(comboxStore.getAt(i));
					if(comboxStore.getAt(i).get('name').indexOf('TESTING')>=0 || comboxStore.getAt(i).get('name').indexOf('NORMAL')>=0){
						hbmTestGrpUuid.add(comboxStore.getAt(i));
					}
					if(comboxStore.getAt(i).get('name').indexOf('MASTER')>=0){
						hbmMasterGrpStore.add(comboxStore.getAt(i));
					}
				}else if(comboxStore.getAt(i).get('type')=='paidgroup'){
					paidGrpUuidStore.add(comboxStore.getAt(i));
				}
			}
			store.load();
			
		})
		
		
		ip.initOtiose(1,groupTab1);
		var id = 'simCardTab';
		if(maintenance){
			id = 'maintenanceSimCardTab';
 		}
		var simCardInGroup=Ext.create('app.view.operation.domain.roamzone.SimCardTab',{
			title:lanControll.getLanValue('tiSimList'),
			id:id
		});		
		simCardInGroup.addListener("afterlayout",function(){
			privilege.procPrivilege(simCardInGroup);
		},this,{single:true});
		
		var id = 'simSmlTab';
		if(maintenance){
			id = 'maintenanceSimSmlTab';
 		}
		var simSmlTab=Ext.create('app.view.sms.SimSmlTab',{
			id:id,
//			hidden:true,
		});
		simSmlTab.addListener("afterlayout",function(){
			privilege.procPrivilege(simSmlTab);
		},this,{single:true});
		
		var id = 'simUsslTab';
		if(maintenance){
			id = 'maintenanceSimUsslTab';
 		}
		var simUsslTab=Ext.create('app.view.sms.SimUsslTab',{
			id:id,
//			hidden:true
		});
		simUsslTab.addListener("afterlayout",function(){
			privilege.procPrivilege(simUsslTab);
		},this,{single:true});
		
		var id = 'simCallTab';
		if(maintenance){
			id = 'maintenanceSimCallTab';
 		}
		var simCallTab=Ext.create('app.view.sms.SimCallTab',{
			id:id,
//			hidden:true
		});		
		simCallTab.addListener("afterlayout",function(){
			privilege.procPrivilege(simCallTab);
		},this,{single:true});

		var id = 'smsInGroupTab';
		if(maintenance){
			id = 'maintenanceSmsInGroupTab';
 		}
		var smsInGroupTab=Ext.create('app.view.sms.SmsGrid',{
			id:id,
			grpId:this.id
		});
		smsInGroupTab.addListener("afterlayout",function(){
			privilege.procPrivilege(smsInGroupTab);
		},this,{single:true});
		var id = 'ussdInGroupTab';
		if(maintenance){
			id = 'maintenanceUssdInGroupTab';
 		}
		var ussdInGroupTab=Ext.create('app.view.sms.UssdGrid',{
			id:id,
			grpId:this.id
		});
		ussdInGroupTab.addListener("afterlayout",function(){
			privilege.procPrivilege(ussdInGroupTab);
		},this,{single:true});
		var id = 'callInGroupTab';
		if(maintenance){
			id = 'maintenanceCallInGroupTab';
 		}
		var callInGroupTab=Ext.create('app.view.sms.CallGrid',{
			id:id,
			grpId:this.id
		});
		callInGroupTab.addListener("afterlayout",function(){
			privilege.procPrivilege(callInGroupTab);
		},this,{single:true});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[groupTab1,simCardInGroup,simSmlTab,simUsslTab,simCallTab,smsInGroupTab,ussdInGroupTab,callInGroupTab],
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