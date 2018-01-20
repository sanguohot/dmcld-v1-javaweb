var form=Ext.widget('form',{
			treeName:'',
			border:false,
			bodyStyle: {
				background: '#DFE9F6',
			},
//			layout : {
//				type : 'vbox',
//				align : 'stretch'
//			},
			border : false,
			bodyPadding : 10,

			// fieldDefaults: {
			// labelAlign: 'top',
			// labelWidth: 100
			// labelStyle: 'font-weight:bold'
			// },
			fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 180,
	            anchor: '100%'
	        },

			items :[{
				xtype:'hiddenfield',
				name:'uuid',
				value:0,
			},{
				xtype:'hiddenfield',
				name:'policyUuid',
			},{
				xtype:'hiddenfield',
				name:'domainUuid'
//			},{
//		    	layout:'hbox',
//		    	xtype:'fieldcontainer',
//		    	border:false,
//		    	itemId:'rule_name',
//		    	anchor: '100%',
//		    	items:[{
//		            xtype: 'textfield',
//		            name: 'name',
//		            fieldLabel: 'Name',
//		            labelWidth: 180,
//		            allowBlank: false,
//		            msgTarget:'none',
//		            listeners:{
//		                render : function(p) {
//		                    p.getEl().on('mouseup', function(p){ 
//		                    	var tip = Ext.getCmp('AddRule_tip');
//		                    	tip.show();
//		                    });
//	                	},
//		        		focus:function(){
//		        			var textobj = this;
//		        			var gettip = Ext.getCmp('GetTip');
//		        			if(gettip==undefined || gettip==null){
//		        				gettip = Ext.create("app.util.GetTip",{});
//		        			}
//		        			var tip = Ext.getCmp('AddRule_tip');
//		        			if(tip==undefined || tip==null){
//		        				var tipManage = Ext.getCmp('TipObjManage');
//		        				if(tipManage==undefined || tipManage==null){
//		        					tipManage = Ext.create("app.util.TipObjManage",{});
//		        				}
//		        				tip = tipManage.createObjNameTipObj('AddRule_tip',textobj.getEl().dom.id, gettip.getObjNameTip(textobj.fieldLabel));
//		        			}
//		        			tip.show();
//		        			tip.clearListeners();
//		        			//alert(tmp.html)
//		        		},
//		    	    	blur:function(field,eOpts){
//		        			this.up('fieldcontainer').getComponent('picture').flag = 0;
//		        			var tip = Ext.getCmp('AddRule_tip');
//		        			tip.hide();
//		        			var textobj = this;
//		        			var prefix = "<div style='background:#DFE9F6'>&nbsp;";
//		        			var suffix  = "</div>"
//		        			var checkobj = Ext.getCmp("DataCheck");
//		        			if(checkobj==undefined || checkobj==null){
//		        				checkobj = Ext.create("app.util.DataCheck",{});
//		        			}
//		        			var str = checkobj.getErrorStr(textobj.getValue());
//		        			var picture = this.up('fieldcontainer').getComponent('picture');
//		        			if(str != ""){
//		        				str = "<font color=#f00>"+str+"</font>"
//		        				picture.update(prefix+str+suffix);
//		        				picture.flag = 0;
//		        			}else{
//			        			var name=textobj.getValue();
//			        			if(name!=null&&name!=""){
//			        				Ext.Ajax.request({
//			                    		url:'ruleManager!checkRule.action',
//			                    		method:'POST',
//			                    		params:{name:name,policyUuid:textobj.up('form').getForm().findField('policyUuid').getValue()},
//			                    		callback: function (options, success, response) {
//			    	                    	var obj=Ext.JSON.decode(response.responseText);			
//			    	                    	if(obj['success']){
//			    	                    		str = "<img  src='resources/images/right.png'/>";
//			    	                    		picture.flag = 1;
//			    	                    	}else{
//			    	                    		str = "<font color=#f00>Already in use</font>";
//			    	                    		picture.flag = 0;
//			    	                    	}
//			    	                    	picture.update(prefix+str+suffix);
//			                        	}
//			                    	});
//			        			}
//		        			}
//		    	    	}
//		        	}
//		    	},{
//	    			html:'', flex:20, border:false,itemId:'picture',flag:2
//	    		}]
//			},{
//	            xtype: 'textfield',
//	            name: 'alias',
//	            fieldLabel: 'Alias',
	        },{

				name : 'grpUuid',
				id:'addRuleGrpUuid',
				ulan:'group',
				xtype : 'combo',
				mode : 'local',
				editable:false,
				allowBlank: false,
				fieldLabel : 'Group',
				displayField : 'name',
				valueField : 'uuid',
				queryMode : 'local',
				store:Ext.create('app.store.operation.domain.GroupInDomainStore',{}),
			},{xtype:'numberfield',fieldLabel: 'Specific Call Billing Rate(min)', labelWidth: 180,decimalPrecision:3,name: 'specCallRate',value:0,minValue:0},
			{

				name : 'activateType',
				xtype : 'combo',
				mode : 'local',
				editable:false,
				fieldLabel : 'Activate Type',
				displayField : 'name',
				valueField : 'typeId',
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'typeId' ],
					data : [ {
						name : lanControll.getLanValue('activateType_'+0),
						typeId : 0
					}, {
						name : lanControll.getLanValue('activateType_'+1),
						typeId : 1
					}, {
						name : lanControll.getLanValue('activateType_'+2),
						typeId : 2
					} ]
				}),
				value:1,
				listeners:{ 
		   			change: function(field,newValue,oldValue,opts) {
//					alert(this.up('form')+" ,"+this.up('form').getForm()+" ," +this.up('form').getForm().findField('validWeekDay')+" ,"+Ext.getCmp('timeWorked1'));
//						alert("field="+field+" nv="+newValue+"  ov="+oldValue+"  opts="+opts);
					if(newValue==1){
						Ext.getCmp('validWeekDay1').show();
						Ext.getCmp('timeWorked1').hide();
					}else if(newValue==2){
						Ext.getCmp('validWeekDay1').hide();
						Ext.getCmp('timeWorked1').show();
					}else{
						Ext.getCmp('validWeekDay1').hide();
						Ext.getCmp('timeWorked1').hide();
					}
						
					}
				}
			},rs.createPriority()
//			,{
//		    	name : 'status',
//				xtype: 'combo',
//				mode: 'local',
//				fieldLabel: 'Status',
//				displayField: 'name',
//				valueField: 'status',
//				queryMode: 'local',
//				value: 1,
//				store: Ext.create('Ext.data.Store', {
//					fields : ['name', 'status'],
//					data   : [
//						{name : 'Enabled',   status: 1},
//						{name : 'Disabled',  status: 0}
//					]
//				})
//		    }
			, {
				 xtype: 'fieldcontainer',
		            fieldLabel: lanControll.getLanValue('validWeekDay'),
		            defaultType: 'checkboxfield',
		            id:'validWeekDay1',
		            name:'validWeekDay',
		            layout : 'hbox',
					items : [ {
						boxLabel : 'Sun',
						name : 'daySun',
						inputValue : 1,
					}, {
						boxLabel : 'Mon ',
						name : 'dayMon',
						inputValue : 2,
					}, {
						boxLabel : 'Tue',
						name : 'dayTue',
						inputValue : 3,
					},  {
						boxLabel : 'Wed',
						name : 'dayWeb',
						inputValue : 4,
					}, {
						boxLabel : 'Thu',
						name : 'dayThu',
						inputValue : 5,
					}, {
						boxLabel : 'Fri',
						name : 'dayFri',
						inputValue : 6,
					}, {
						boxLabel : 'Sat',
						name : 'daySat',
						inputValue : 7,
//						inputValue : 6,
//						checked : true
					} ]
				},{
					xtype:'hiddenfield',
					name:'timeBegin',
				},{
					xtype:'hiddenfield',
					name:'timeEnd'
				}, {
					xtype : 'fieldcontainer',
					fieldLabel : lanControll.getLanValue('timeWorked'),
					id:'timeWorked1',
					name:'timeWorked',
					combineErrors : false,
					layout : 'hbox',
					defaults : {
						hideLabel : true
					},
					items : [ {
						name : 'hoursB',
						xtype : 'numberfield',
						width : 48,
						value : 0,
						allowBlank : false,
						minValue:0,
						maxValue:23
					}, {
						xtype : 'displayfield',
						value : lanControll.getLanValue('hour'),
					}, {
						name : 'minutesB',
						xtype : 'numberfield',
						width : 48,
						value : 0,
						allowBlank : false,
						minValue:0,
						maxValue:59
					}, {
						xtype : 'displayfield',
						value : lanControll.getLanValue('min'),
					}, {
						xtype : 'component',
						width : 10
					}, {
						xtype : 'displayfield',
						value : lanControll.getLanValue('to'),
						width : 30
					}, {
						name : 'hoursE',
						xtype : 'numberfield',
						width : 48,
						value : 23,
						allowBlank : false,
						minValue:0,
						maxValue:23
					}, {
						xtype : 'displayfield',
						value : lanControll.getLanValue('hour'),
					}, {
						name : 'minutesE',
						xtype : 'numberfield',
						width : 48,
						value : 59,
						allowBlank : false,
						minValue:0,
						maxValue:59
					}, {
						xtype : 'displayfield',
						value : lanControll.getLanValue('min'),
					} ]
			}, {
				xtype : 'textareafield',
				fieldLabel : 'Description',
				name:'detailDesc',
				// labelAlign: 'top',
//				flex : 1,
				margins : '0',
			}],
			buttons: [{
		        text: 'Cancel',
		        ulan:'btCancel',
		        handler: function() {
		            this.up('form').getForm().reset();
		            this.up('window').hide();
		        }
		    }, {
		        text: 'Commit',
		        ulan:'btCommit',
		        handler: function() {
//	        		var tmp = this.up('form').getComponent('rule_name');
//	        		if(tmp.getComponent('picture').flag==0)
//	            	return;
		            if (this.up('form').getForm().isValid()) {
		               
			                var form1=this.up('form');
			                var form = form1.getForm();
			                var hoursB=form.findField('hoursB').getValue();
			                var minutesB=form.findField('minutesB').getValue();
			                var hoursE=form.findField('hoursE').getValue();
			                var minutesE=form.findField('minutesE').getValue();
			                form.findField('timeBegin').setValue('2012-01-01 '+hoursB+':'+minutesB+':00');
			                form.findField('timeEnd').setValue('2012-01-01 '+hoursE+':'+minutesE+':00');
			                var url=this.up('window').url;
			                
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:url,
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
				                    	var obj=Ext.JSON.decode(response.responseText);			
				                    	if(obj['success']){
				                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
				                    		Ext.getCmp('ruleInPolicyTab').down('panel[itemId=grid]').getStore().load();
				                    	}else{
				                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
				                    	}
			                    	}
			                	});
			                }
			                this.up('form').getForm().reset();
			                this.up('window').hide();
			            }
		            }
		        
		    }]
		});

Ext.define("app.view.operation.domain.policy.AddRule", {
	extend : 'Ext.window.Window',
	alias : 'widget.addRule',
	id:'addRule',
	title : lanControll.getLanValue('tiAddRule'),
	closeAction: 'hide',
	layout:'fit',
//	height : 440,
	autoScroll:true,
	treeName:'',
	bodyPadding: 5,
	bodyStyle: {
		background: '#DFE9F6',
	},
	width:620,
    layout: 'fit',
    resizable: true,
//    modal: true,
    items: form
	
});
