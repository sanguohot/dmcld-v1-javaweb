Ext.define('app.view.operation.domain.BlackWhitePanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:false,
	border:false,
	treeId:'',
	store:null,
//	id:'blackWhite',
	initComponent: function(){
	var store = Ext.create('app.store.operation.domain.DomainPmHeadStore',{});
	var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
	this.store = store;
	var domainTab1=Ext.create('Ext.form.Panel',{
		title:lanControll.getLanValue('treeNode_blackwhite'),
//		id:'domainTab1',
		treeName:'',
		border:false,
		itemId:'domainForm',
		store:store,
		bodyStyle: {
			background: '#DFE9F6',
		},
//		width: 500,
	    bodyPadding: 5,
	    autoScroll:true,
        fieldDefaults: {
            labelAlign: 'center',
            labelWidth: 180,
            anchor: '75%'
        },
        
        items: [{
            xtype: 'fieldset',
			layout:'anchor',
			title:lanControll.getLanValue('fsBasicInfo'),
//			ulan:'fsAntiCallScan',
//			name:'fsAntiCallScan',
			layout: 'anchor',
			collapsible: true,
			collapsed: false,
			items:[{
            xtype: 'fieldcontainer',
			layout:'anchor',
			border:0,
			anchor: '100%',
			fieldDefaults:{
				labelWidth:180
			},
			items:[{
				xtype:'hiddenfield',
				name:'uuid'
			},{
				xtype: 'checkbox',
//				ulan: 'enable',
				name:'antiCallScanEnable',
				ulan:'antiCallScanEn',
				boxLabel: 'Anti Call Scan Enable',
				boxLabelCls:'box_label',
				inputValue:1,
				checked:true,
				listeners:{
					change:function(field,newValue,oldValue,opts){
						var callScan = domainTab1.down('fieldcontainer[itemId=callScan]');
						if(newValue){
							callScan.setDisabled(false);
						}else{
							callScan.setDisabled(true);
						}
           			}
       			}
			},{
	            xtype: 'fieldcontainer',
				layout:'anchor',
				border:0,
				itemId:'callScan',
				anchor: '100%',
				fieldDefaults:{
					labelWidth:180
				},
				items:[{
				xtype: 'checkbox',
				name:'callerGrayFlag',
				boxLabel: 'Disable Calls from Gray Number',
				boxLabelCls:'box_label',
				inputValue:1,
//				checked:true,
			},{
				xtype: 'checkbox',
				name:'calleeGrayFlag',
				boxLabel: 'Disable Calls to Gray Number',
				boxLabelCls:'box_label',
				inputValue:1,
//				checked:true,
			},{
				xtype: 'checkbox',
				name:'ipGrayFlag',
				boxLabel: 'Disable Calls from Gray IP',
				boxLabelCls:'box_label',
				inputValue:1,
//				checked:true,
			},{
				xtype: 'numberfield',
				name:'numberValidLen',
				fieldLabel: 'Disable Calls from Gray IP',
				maxValue:999,
				minValue:0,
				value:6,
			},{
				xtype: 'checkbox',
				name:'dynamicStaticsEnable',
				boxLabel: 'Enable Dynamic Number',
				boxLabelCls:'box_label',
				inputValue:1,
				checked:true,
				listeners:{
					change:function(field,newValue,oldValue,opts){
						var dNum = domainTab1.down('fieldcontainer[itemId=dNum]');
						if(newValue){
							dNum.setDisabled(false);
           				}else{
           					dNum.setDisabled(true);
           				}
           			}
       			}
			},{
            xtype: 'fieldcontainer',
			layout:'anchor',
			border:0,
			itemId:'dNum',
			anchor: '100%',
			fieldDefaults:{
				labelWidth:180
			},
			items:[{
				xtype: 'checkbox',
				name:'dynamicCallerEnable',
				boxLabel: 'Enabled Caller Number Statistics',
				boxLabelCls:'box_label',
				inputValue:1,
				checked:false,
			},{
				xtype: 'checkbox',
				name:'blackInfectFlag',
				boxLabel: 'Enable Black Infectivity',
				boxLabelCls:'box_label',
				inputValue:1,
				checked:false,
			},{
				   xtype: 'fieldcontainer',
				   layout:'hbox',
				   allowBlank: false,
				   items: [
						{xtype:'textfield',name: 'failCallWeight', ulan:'failCallWeight',fieldLabel:'Fail Call',labelWidth:180},
						{xtype: 'displayfield',value:'&nbsp;('+lanControll.getLanValue("failCallWeightTips")+')'}
						]							
			},{
				xtype: 'fieldcontainer',
				layout:'hbox',
				allowBlank: false,
				items: [
				        {xtype:'textfield',name: 'shortCallParam', ulan:'shortCallTime',fieldLabel:'Short Call Time(s)<=',labelWidth:180},
				        {xtype: 'displayfield',value:'&nbsp;('+lanControll.getLanValue("weightDown10")+')'}
				        ]							
			},{
				   xtype: 'fieldcontainer',
				   layout:'hbox',
				   allowBlank: false,
				   items: [
						{xtype:'textfield',name: 'longCallParam3', ulan:'longCallTime2',fieldLabel:'Long Call Time 2(s)>=',labelWidth:180},
						{xtype: 'displayfield',value:'&nbsp;('+lanControll.getLanValue("weightUp30")+')'}
						]
			},{
				xtype:'displayfield',
				fieldLabel:'Other',
				ulan:'other',
				value:lanControll.getLanValue("weightUp10")
				
			},{
				   xtype: 'fieldcontainer',
				   layout:'hbox',
				   allowBlank: false,						   
				   items: [
						{xtype:'textfield',name:'numberExpireTime',value:'10',fieldLabel:'Expire Time(h)',labelWidth:180},
						]
			},{
				   xtype: 'fieldcontainer',
				   layout:'hbox',
				   allowBlank: false,
				   items: [
						{xtype:'displayfield',ulan:'weightRange',fieldLabel:'Weight Range(0-99)',labelWidth:180},
						{xtype:'displayfield',fieldCls: 'weight',width:45},
						{xtype:'displayfield',fieldCls: 'weight1',width:45},
						{xtype:'displayfield',fieldCls: 'weight2',width:60},
						{xtype:'displayfield',value:'&nbsp;('+lanControll.getLanValue("weightNum")+')'},
						]
			}]}]}]}
			]}
	], 
        maintenance:maintenance,
		});
		ip.initOtiose(1,domainTab1);
//	domainTab1.setDisabled(true);
		domainLoadMask=new Ext.LoadMask(domainTab1, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
		store.on('load',function(){
			if(store.getCount() > 0){
				var r = store.getAt(0);
				domainTab1.loadRecord(r);
			}
		})
		removeCSSRule(styleSheet,'.weight::before');
		var obj = {size:30,color:"black",times:1.5,content:30};
		setPseudo2(styleSheet,'.weight:before',obj);
		removeCSSRule(styleSheet,'.weight1::before');
		var obj = {size:30,color:"gray",times:1.5,content:60};
		setPseudo2(styleSheet,'.weight1:before',obj);
		removeCSSRule(styleSheet,'.weight2::before');
		var obj = {size:40,color:"white",times:1.5,content:99};
		setPseudo2(styleSheet,'.weight2:before',obj);
		var dockedItems = {
				xtype:'toolbar',
				dock: 'top',
				items:this.createTbar(domainTab1,maintenance)
		};
		domainTab1.addDocked(dockedItems);

		var id = 'sNum';
		if(maintenance){
			id = 'maintenanceSNum';
		}
		var domainTab3=Ext.create('app.view.operation.domain.NumPanel',{
			type:'s',
			id:id,
			title:lanControll.getLanValue('sNum'),
		});
		domainTab3.addListener("afterlayout",function(){
			privilege.procPrivilege(domainTab3);
		},this,{single:true});
		var id = 'dNum';
		if(maintenance){
			id = 'maintenanceDNum';
		}
		var domainTab4=Ext.create('app.view.operation.domain.NumPanel',{
			type:'d',
			id:id,
			title:lanControll.getLanValue('dNum'),
		});
		domainTab4.addListener("afterlayout",function(){
			privilege.procPrivilege(domainTab4);
		},this,{single:true});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[domainTab1,domainTab3,domainTab4],
	   	    listeners:{		
				tabchange:function(tabPanel,newTab,oldTab,obj){
					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
				}
			}
		}];
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	},
	createTbar:function(domainTab1,maintenance){
		var tbar = [];
		if(!maintenance){
			var commit = Ext.create('Ext.button.Button',{
	            text: 'Commit',
	            iconCls:'save',
	            ulan:'btCommit',
	            flag:"domain_edit",
	            disabled: true,
	            formBind: false, //only enabled once the form is valid
	            handler: function() {
	    			var store = this.up('form').up('panel').up('panel').store;
	    			var name = store.getAt(0).get('name');
	                var form = this.up('form').getForm();
	                var params = form.getValues();
	                params["name"] = name;
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'domainManager!updateBlackWhiteInfo.action',
	                		method:'POST',
	                		params:params,
	                		callback: function (options, success, response) {
		                    	var obj=Ext.JSON.decode(response.responseText);			
		                    	if(obj['success']){
		                    		ip.commitSuccess(domainTab1,domainTab1.store);
		                    	}else{
		                    		ip.commitFailure(domainTab1);
		                    	}
	                    	}
	                	});
	                }
	            }
	        });
			tbar.push(commit);
			tbar.push('-');
			
			ip.createEditButton(domainTab1,domainTab1.store,tbar);
			tbar[tbar.length-2].flag = "domain_edit";
			var edit = tbar[tbar.length-2];
		}
		var refresh = Ext.create("Ext.button.Button",{
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
		tbar.push(refresh)
		return tbar;
	},
});