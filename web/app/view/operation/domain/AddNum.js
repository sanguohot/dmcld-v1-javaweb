var width = 500;

Ext.define("app.view.operation.domain.AddNum", {
	extend : 'Ext.window.Window',
	alias : 'widget.addNum',
	id:'addNum',
	title : lanControll.getLanValue('addNum'),
	width : width,
	closeAction: 'hide',
	minWidth : 350,
	minHeight: 100,
    layout: 'fit',
    resizable: true,
    modal: true,
    domainStore:null,
//    items: form,
    initComponent:function(){
		var type = this.type;
		var combo = rs.createNumType(null,[1,2],null);
		var generalObj = Ext.getCmp('GeneralObj');
		if(!generalObj){
			generalObj = Ext.create('app.util.GeneralObj',{});
		}
		var sizeObj = {labelWidth:100,maxLength:24,textFlex:75}
//		number = generalObj.createBlackWhiteNum('number','number','Number',''
//				,'numManager!checkNumber.action',null,null,null,sizeObj);
		number = {
			xtype:'textfield',
			name:'number',
			fieldLabel:'Number',
		};
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
		    items: [combo,rs.createCombo({prefix:"numberRole",valueList:[1,2,3],length:null,value:1}),number,{
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
			    	var obj = this.up('form');
			    	var basicForm = obj.getForm();
			    	var fieldContainer = obj.down('textfield[name=number]')
					var  type = basicForm.findField('type').getValue();
					var  numberRole = basicForm.findField('numberRole').getValue();
			    	var store = obj.numStore;
			    	if(fieldContainer.isVisible()){
				    	if(fieldContainer.getValue().length==0 || type==0 || numberRole<=0){
				    		return;
				    	}
			    	}else{
				    	if(type==0){
				    		return;
				    	}
			    	}
		            if (this.up('form').getForm().isValid()) {
			                var form = this.up('form').getForm();
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'numManager!addNum.action',
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
			                    		var obj=Ext.JSON.decode(response.responseText);			
				                    	if(obj['success']){
				                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
				                    		store.load();
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

