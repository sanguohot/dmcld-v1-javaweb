var form = Ext.widget('form', {
    border: false,
    bodyPadding: 10,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    frame:true,
    defaults: {
        margins: '0 0 10 0',
        labelWidth:120,
    },
   
    items: [{
    	xtype:'textareafield',
    	name:'dstAddr',
    	fieldLabel:'Mail To',
    	width:450,
    	rows:2,
    	validateOnChange:false,
    	validator:function(val){return checkString(val,/^[\s\.\@A-Za-z0-9;_-]{0,10000}$/)}
    },{
    	xtype:'textfield',
    	name:'subject',
    	fieldLabel:'Subject',
    	width:450,
    },{
		xtype: 'radiogroup',
		name: 'contentTypeAll',
		width:450,
		ulan:'contentType',
		fieldLabel: 'Content Type',
		columns: 3,
		items: [
			{boxLabel: 'PLAIN',boxLabelCls:'box_label', name: 'contentType',ulan:'contentType_1', inputValue: 1},
			{boxLabel: 'HTML&nbsp;&nbsp;',boxLabelCls:'box_label', name: 'contentType',ulan:'contentType_2', inputValue: 2,checked:true}
		]
    },{
        xtype: 'htmleditor',
        name:'content',
        flex:1,
        value: [].join('')
    },{
    	xtype:'hiddenfield',
    	name:'domainUuids'
    },{
    	xtype:'hiddenfield',
    	name:'sepSend',
    	value:1,
    }],

    buttons: [{
        text: 'Close',
        ulan:'btClose',
        handler: function() {
            this.up('form').getForm().reset();
            this.up('window').hide();
        }
    },{
    	id:'call_cancel',
        text: 'Send',
        ulan:'btSendMail',
        handler: function() {
    		var form=this.up('form').getForm()
    		var win=this.up('window');
    		
    		var param=form.getValues();
    		if(param['contentType']==1){
    			param['content']=ip.delHTMLTag(param['content']);
    		}
    		console.log(param['content']);
			Ext.Ajax.request({
				url:'mailqManager!sendMail.action',
				method:'POST',
				params:param,
				callback: function (options, success, response) {
					var obj=Ext.JSON.decode(response.responseText);
					if(obj['success']){
						Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
						form.reset();
						win.hide();
					}else{
						Ext.MessageBox.alert(boxFailture,boxCommitFail);
					}
				}
			});
		}
	}]
});

Ext.define("app.view.common.AddMail", {
	extend : 'Ext.window.Window',
	alias : 'widget.addMail',
	id:'addMail',
	title : lanControll.getLanValue('boxSendMail'),
	width : 680,
	closeAction: 'hide',
	minWidth : 350,
	height : 500,
	minHeight: 250,
	y:100,
    layout: 'fit',
    resizable: true,
    modal: true,
    border:false,
    items: form
	
});

