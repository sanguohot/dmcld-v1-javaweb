var width = 500;

Ext.define("app.view.dm.AddDMNum", {
	extend : 'Ext.window.Window',
	alias : 'widget.addDMNum',
	id:'addDMNum',
	title : lanControll.getLanValue('addNum'),
	width : width,
	closeAction: 'hide',
	minWidth : 350,
	minHeight: 100,
    layout: 'fit',
    resizable: true,
    modal: true,
    domainStore:null,
    initComponent:function(){
		var type = this.type;
		var form = Ext.create('Ext.form.Panel', {
		    border: false,
		    bodyPadding: 10,
		    defaults: {
		        margins: '0 0 10 0',
		        labelWidth:100
		    },
		    fieldDefaults: {
		        labelAlign: 'left',
		        anchor: '75%',
		    },
		    items: [{
				xtype:'textfield',
				name:'num',
				fieldLabel:'Number',
			},{
				xtype:'combo',
				name:'action',
				fieldLabel:'Action',
				mode: 'local',
				editable:false,
				displayField: 'name',
				valueField: 'value',
				queryMode: 'local',
				store:Ext.create('Ext.data.Store',{
					fields:['name','value'],
					data:[
				      {name:lanControll.getLanValue('dmNumAction_1'),value:1},
				      {name:lanControll.getLanValue('dmNumAction_2'),value:2},
				      {name:lanControll.getLanValue('dmNumAction_3'),value:3},
				      {name:lanControll.getLanValue('dmNumAction_4'),value:4},
				    ]
				}),
				value:1,
				
			},{
		    	xtype:'hiddenfield',
		    	name:'domainUuid',
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
		    		var formB=this.up('form');
	                var form = formB.getForm();
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'numDMManager!addNum.action',
	                		method:'POST',
	                		params:form.getValues(),
	                		callback: function (options, success, response) {
	                    		var obj=Ext.JSON.decode(response.responseText);			
		                    	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
		                    		formB.store.load();
		                    	}else{
		                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
		                    	}
	                    	}
	                	});
	                }
	                form.reset();
	                this.up('window').hide();
		    	}
		    }]
		});
		this.items = [form];
		
		this.callParent();
	},
//	listeners:{
//		beforeshow:function(){
//			var picture = this.down('panel[itemId=picture]');
//			picture.update("");
//			picture.flag = 2;
//		}
//	}
});

