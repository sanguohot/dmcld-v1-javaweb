var form = Ext.widget('form', {
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    bodyPadding: 10,

    defaults: {
        margins: '0 0 10 0',
        labelWidth: 120,
    },

    items: [{    	
    	itemId:'viewGroup',
        xtype: 'checkboxgroup',
        name:'viewGroup',
        fieldLabel: "Number Role",
        columns: 3,
        vertical: true,
        items:[createCheckbox("caller",lanControll.getLanValue("numberRole_1"),false)
               ,createCheckbox("callee",lanControll.getLanValue("numberRole_2"),true)]
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
    				var form=this.up("form");
    				var bForm=form.getForm();
    				var win=this.up("window");
//    				var caller=form.down("checkbox[name=caller]");
//    				var callee=form.down("checkbox[name=callee]");
    				var params=bForm.getValues();
    				if(params["caller"]!="1" && params["callee"]!="1"){
    					Ext.MessageBox.alert(boxWarnning,"Please select at least one kind of number role!");
    					return;
    				}
    				params["numbers"]=win.numbers;
    				params["types"]=win.types;
    				params["domainUuid"]=win.domainUuid;
    				Ext.apply(params, win.search.getForm().getValues());
//    				console.log(params);return;
	                if (bForm.isValid()) {
	                	Ext.Ajax.request({
	                		url:'numManager!copyToStatic.action',
	                		method:'POST',
	                		params:params,
	                		callback: function (options, success, response) {
                    			var obj=Ext.JSON.decode(response.responseText);
        			                  	if(obj['success']){
		                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
//		                    		Ext.getCmp(cmpId).down('grid[itemId=grid]').store.load();
		                    	}else{
		                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
		                    	}
        			                  	bForm.reset();
	                    	}
	                	});
	                
	                win.hide();
	            }
            }
        
    }]
});

Ext.define("app.view.operation.domain.MoveToStatic", {
	extend : 'Ext.window.Window',
	alias : 'widget.moveToStatic',
	title : "Please select the role for staic number,allow multiselect",
	id:'moveToStatic',
	width : 460,
	closeAction: 'hide',
	minWidth : 350,
    layout: 'fit',
    resizable: true,
    modal: true,
    items: form
});

