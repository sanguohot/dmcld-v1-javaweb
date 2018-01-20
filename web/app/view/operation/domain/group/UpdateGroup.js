var form = Ext.widget('form', {
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    bodyStyle: {
		background: '#DFE9F6',
	},
    bodyPadding: 10,
    defaults: {
        margins: '0 15 3 15',
        labelWidth:240,
        labelAlign:'right',
        
    },
    params:null,
    items: [{
    	xtype:'hiddenfield',
    	name:'ids',
    },{
    	xtype:'hiddenfield',
    	name:'domainUuid',
    },rs.createAdminStatus(null,[0,1,2,6],{labelWidth:240,labelAlign:'right'}),{
        xtype: 'combo',
        name: 'modType',
        fieldLabel: 'SIM Module Type',
		mode : 'local',
		editable:false,
		displayField : 'name',
		valueField : 'statusId',
		queryMode : 'local',
		valueNotFoundText:'',
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'statusId' ],
			data : [
		        {name:'-SELECT-',statusId:-1},
		        {name:'GSM',statusId:0},
		        {name:'CDMA',statusId:1},
			]
		}),
		value:-1,
    
	},{
		xtype: 'combo',
        name: 'defaultEncode',
        fieldLabel: 'Default SMS Encode',
        ulan:'defSmsEncode',
		mode : 'local',
		editable:false,
		width:100,
		displayField : 'name',
		valueField : 'statusId',
		queryMode : 'local',
		valueNotFoundText:'',
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'statusId' ],
			data : [
		        {name:'-SELECT-',statusId:-1},
		        {name:'UNICODE',statusId:0},
		        {name:'ASCII',statusId:1},
			]
		}),
		value:-1,
	},{
        xtype: 'combo',
        name: 'zoneUuid',
        anchor: '50%',
        mode : 'local',
        editable:false,
        fieldLabel: 'Location Zone',
        displayField : 'name',
		valueField : 'uuid',
		queryMode : 'local',
		store:Ext.create("app.store.util.ComboxStore",{}),
    },{
        xtype: 'combo',
        name: 'hbmInitSimFlag',
        fieldLabel: 'Init SIM Ctrl Flags and Clear Stats Data',
		mode : 'local',
		labelWidth:240,
		editable:false,
		displayField : 'name',
		valueField : 'statusId',
		queryMode : 'local',
		valueNotFoundText:'',
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'statusId' ],
			data : [
		        {name:'-SELECT-',statusId:-1},
		        {name:'YES',statusId:1},
		        {name:'NO',statusId:0},
			]
		}),
		value:-1,
    },{
		xtype: 'combo',
        name: 'hbmImeiFlag',
        fieldLabel: '<label onmouseover=moveOver("grp_hbmImeiFlag",event) onmouseout=moveOut() class="tips_label">IMEI Assignment Mode</label>',
		mode : 'local',
		labelWidth:240,
		editable:false,
		displayField : 'name',
		valueField : 'statusId',
		queryMode : 'local',
		valueNotFoundText:'',
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'statusId' ],
			data : [
		        {name:'-SELECT-',statusId:-1},
		        {name:'NULL',statusId:0},
		        {name:'EACH_LOAD',statusId:1},
		        {name:'EACH_BIND',statusId:2},
			]
		}),
		value:-1,
		loadFlag:false,
		listeners:{
			change:function(field,newValue,oldValue,opts){
    			if(field.loadFlag){
	    			if(newValue==1 || newValue==2){
	    				var vendId=Ext.get('vendorId').value;
	    				var temp="";
	    				if(vendId=="2"){
	    					temp="DINSTAR";
	    				}else{
	    					temp="UCSPEED";
	    				}
	    				boxImeiAssignment = lanControll.getLanValue("boxImeiAssignment_"+vendId);
	    				Ext.MessageBox.alert(boxPromotion,"<pre>"+boxImeiAssignment+"</pre>");
			    	}else{
			    	}
    			}
			}
		}
	},{
    	xtype:'numberfield',
    	fieldLabel: '<label onmouseover=moveOver("grp_max_work_sim_count",event) onmouseout=moveOut() class="tips_label">Max Work SIM Count</label>', 
    	name:'maxWorkSimCount',
    	anchor: '50%',
    	minValue:0,
    	maxValue:1000000000 
    }],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        style: {
    		background:'#D3E1F1',
    	},
        items: ['->',{
            text: 'Cancel',
            ulan:'btCancel',
            handler: function() {
        		this.up('form').getForm().findField('hbmImeiFlag').loadFlag=false;
                this.up('form').getForm().reset();
                this.up('window').hide();
            }
        }, {
            text: 'Commit',
            ulan:'btCommit',
            margins: '0 15 5 0',
            handler: function() {
                if (this.up('form').getForm().isValid()) {
                   
    	                var form = this.up('form').getForm();
    	                var win=this.up('window');
    	                if (form.isValid()) {
    	                	Ext.Ajax.request({
    	                		url:'groupManager!updateMuliGroup.action',
    	                		method:'POST',
    	                		params:form.getValues(),
    	                		callback: function (options, success, response) {
                        			var obj=Ext.JSON.decode(response.responseText);			
            			                  	if(obj['success']){
    		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
    		                    		Ext.getCmp('fgroupPanel').down('panel[itemId=grid]').getStore().load();
    		                    	}else{
    		                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
    		                    	}
    		                    	form.reset();
    	                    	}
    	                	});
    	                	win.hide();
    	                }
    	            }
                }
            
        }]
    }],
});

Ext.define("app.view.operation.domain.group.UpdateGroup", {
	extend : 'Ext.window.Window',
	alias : 'widget.updateGroup',
	title : tiSetting,
	id:'updateGroup',
	width : 560,
	closeAction: 'hide',
	minWidth : 350,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
	
});

