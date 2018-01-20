var form = Ext.widget('form', {
//    layout: {
//        type: 'vbox',
//        align: 'stretch'
//    },
    border: false,
    bodyPadding: 10,
    defaults: {
        margins: '0 0 10 0'
    },
    fieldDefaults: {
        labelAlign: 'left',
        anchor: '75%',
    },
    items: [{
    	layout:'hbox',
    	xtype:'fieldcontainer',
    	border:false,
    	itemId:'zone_name',
    	anchor: '100%',
    	items:[{
            xtype: 'textfield',
            name:'name',
            fieldLabel: 'Name',
            allowBlank: false,
            msgTarget:'none',
            flex:3,
            listeners:{
	            render : function(p) {
		            p.getEl().on('mouseup', function(p){ 
		            	var tip = Ext.getCmp('AddZone_tip');
		            	tip.show();
		            });
	        	},
	    		focus:function(){
	    			var textobj = this;
	    			var gettip = Ext.getCmp('GetTip');
	    			if(gettip==undefined || gettip==null){
	    				gettip = Ext.create("app.util.GetTip",{});
	    			}
	    			var tip = Ext.getCmp('AddZone_tip');
	    			if(tip==undefined || tip==null){
	    				var tipManage = Ext.getCmp('TipObjManage');
	    				if(tipManage==undefined || tipManage==null){
	    					tipManage = Ext.create("app.util.TipObjManage",{});
	    				}
	    				tip = tipManage.createObjNameTipObj('AddZone_tip',textobj.getEl().dom.id, gettip.getObjNameTip(textobj.fieldLabel));
	    			}
	    			tip.show();
	    			tip.clearListeners();
	    		},
		    	blur:function(field,eOpts){
	    			this.up('fieldcontainer').getComponent('picture').flag = 0;
	    			var tip = Ext.getCmp('AddZone_tip');
	    			tip.hide();
	    			var textobj = this;
	    			var prefix = "<div>&nbsp;";
	    			var suffix  = "</div>"
	    			var checkobj = Ext.getCmp("DataCheck");
	    			if(checkobj==undefined || checkobj==null){
	    				checkobj = Ext.create("app.util.DataCheck",{});
	    			}
	    			var str = checkobj.getErrorStr(textobj.getValue());
	    			var picture = this.up('fieldcontainer').getComponent('picture');
	    			if(str != ""){
	    				str = "<font color=#f00>"+str+"</font>";
	    				picture.flag=0;
	    				picture.update(prefix+str+suffix);
	    			}else{
	        			var name=textobj.getValue();
	        			if(name!=null&&name!=""){
	        				Ext.Ajax.request({
	                    		url:'zoneManager!checkZone.action',
	                    		method:'POST',
	                    		params:{name:name,domainUuid:this.up('form').getForm().findField('domainUuid').getValue()},
	                    		callback: function (options, success, response) {
	    	                    	var obj=Ext.JSON.decode(response.responseText);			
	    	                    	if(obj['success']){
	    	                    		str = "<img  src='resources/images/right.png'/>";
	    	                    		picture.flag=1;
	    	                    	}else{
	    	                    		str = "<font color=#f00>"+alreadyInUse+"</font>";
	    	                    		picture.flag=0;
	    	                    	}
	    	                    	picture.update(prefix+str+suffix);
	                        	}
	                    	});
	        			}
	    			}
		    	}
        	}        
    	},{
			html:'', flex:1, border:false,itemId:'picture',flag:2,
		}]
    },{
    	xtype:'hiddenfield',
    	name:'domainUuid'
    },{
        xtype: 'textfield',
        name:'alias',
        fieldLabel: 'Alias',
    },{
        xtype: 'combo',
        name: 'policyUuid',
        mode : 'local',
        fieldLabel: 'Default Policy',
        editable:false,
        displayField : 'name',
		valueField : 'uuid',
		queryMode : 'local',
		
    },{
        name: 'localTimeZone',
        fieldLabel: 'TimeZone',
        ulan:'timeZone',
        xtype: 'combo',
		mode : 'local',
		displayField : 'name',
		valueField : 'value',
		editable:false,
		queryMode : 'local',
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'value' ],
			data : [ {
				name : '(GMT -12:00) Eniwetok, Kwajalein',
				value : 720
			}, {
				name : '(GMT -11:00) Midway Island, Samoa',
				value : 660
			},{
				name : '(GMT -10:00) Hawaii',
				value : 600
			},{
				name : '(GMT -9:00) Alaska',
				value : 540
			},{
				name : '(GMT -8:00) Pacific Time (US & Canada)',
				value : 480
			},{
				name : '(GMT -7:00) Mountain Time (US & Canada)',
				value : 420
			},{
				name : '(GMT -6:00) Central Time (US & Canada), Mexico City',
				value : 360
			},{
				name : '(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima',
				value : 300
			},{
				name : '(GMT -4:30) Caracas',
				value : 270
			},{
				name : '(GMT -4:00) Atlantic Time (Canada), La Paz, Santiago',
				value : 240
			},{
				name : '(GMT -3:30) Newfoundland',
				value : 210
			},{
				name : '(GMT -3:00) Brazil, Buenos Aires, Georgetown',
				value : 180
			},{
				name : '(GMT -2:00) Mid-Atlantic',
				value : 120
			},{
				name : '(GMT -1:00 hour) Azores, Cape Verde Islands',
				value : 60
			},{
				name : '(GMT) Western Europe Time, London, Lisbon, Casablanca',
				value : 0
			},{
				name : '(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris',
				value :-60
			},{
				name : '(GMT +2:00) Kaliningrad, South Africa, Cairo',
				value : -120
			},{
				name : '(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
				value : -180
			},{
				name : '(GMT +3:30) Tehran',
				value : -210
			},{
				name : '(GMT +4:00) Abu Dhabi, Muscat, Yerevan, Baku, Tbilisi',
				value : -240
			},{
				name : '(GMT +4:30) Kabul',
				value : -270
			},{
				name : '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
				value : -300
			},{
				name : '(GMT +5:30) Mumbai, Kolkata, Chennai, New Delhi',
				value : -330
			},{
				name : '(GMT +5:45) Kathmandu',
				value : -345
			},{
				name : '(GMT +6:00) Almaty, Dhaka, Colombo',
				value : -360
			},{
				name : '(GMT +6:30) Yangon, Cocos Islands',
				value : -390
			},{
				name : '(GMT +7:00) Bangkok, Hanoi, Jakarta',
				value : -420
			},{
				name : '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
				value : -480
			},{
				name : '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
				value : -540
			},{
				name : '(GMT +9:30) Adelaide, Darwin',
				value : -570
			},{
				name : '(GMT +10:00) Eastern Australia, Guam, Vladivostok',
				value : -600
			},{
				name : '(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
				value : -660
			},{
				name : '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka',
				value : -720
			}]
		}),
		value:-480
        
    },{
        xtype: 'textareafield',
        fieldLabel: 'Description',
        name:'detailDesc',
//        labelAlign: 'top',
        flex: 1,
        margins: '0',
       
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
			var tmp = this.up('form').getComponent('zone_name');
    		if(tmp.getComponent('picture').flag==0)
            	return;
            if (this.up('form').getForm().isValid()) {
               
	                var form = this.up('form').getForm();
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'zoneManager!addZone.action',
	                		method:'POST',
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
		                    	 var obj=Ext.JSON.decode(response.responseText);			
					                    if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    		Ext.getCmp('froamzonePanel').down('panel[itemId=grid]').getStore().load();
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

Ext.define("app.view.operation.domain.roamzone.AddZone", {
	extend : 'Ext.window.Window',
	alias : 'widget.addZone',
	id:'addZone',
	title : lanControll.getLanValue('tiAddZone'),
	width : 650,
	closeAction: 'hide',
	minWidth : 350,
	minHeight: 250,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form,
	listeners:{
		beforeshow:function(){
		    var picture = this.down('form').getComponent('zone_name').getComponent('picture');
		    picture.flag = 2;
		    picture.update("");
		}
	}
});

