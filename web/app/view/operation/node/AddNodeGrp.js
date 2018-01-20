Ext.define("app.view.operation.node.AddNodeGrp", {
	extend : 'Ext.window.Window',
	alias : 'widget.addNode',
	id:'addNodeGrp',
	title : lanControll.getLanValue('tiAddNodeGrp'),
	closeAction: 'hide',
	layout:'fit',
	height : 340,
	autoScroll:true,
	treeName:'',
	bodyPadding: 5,
	bodyStyle: {
		background: '#DFE9F6',
	},
	width:600,
    layout: 'fit',
    resizable: true,
    modal: true,
    nodeGrpStore:{},
	initComponent:function(){
		var form=Ext.widget('form',{
			treeName:'',
			border:false,
			bodyStyle: {
				background: '#DFE9F6',
			},
			border : false,
			bodyPadding : 10,
			fieldDefaults: {
	            labelAlign: 'left',
	            anchor: '75%'
	        },

			items :[{
	            xtype: 'textfield',
	            name: 'alias',
	            fieldLabel: 'Alias',
	        },{
				xtype : 'textareafield',
				fieldLabel : 'Description',
				name:'detailDesc',
				margins : '0',
			},{
				xtype : 'hiddenfield',
				name:'cloudUuid',
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
            		var picture = this.up('form').getComponent("node_grp_name_container").getComponent("picture");
            		if(picture.flag != 1){
            			return;
            		}
            		var store = this.up('form').up('window').nodeGrpStore;
	                var form = this.up('form').getForm();
	                if (form.isValid()) {
	                	Ext.Ajax.request({
	                		url:'nodeGrpManager!addNodeGrp.action',
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
	                this.up('window').hide();
		        }
		        
		    }]
		});
		this.items = [form];
		var tipId = "AddNodeGrp_tip";
		var GeneralObj = Ext.getCmp('GeneralObj');
		if(GeneralObj == undefined){
			GeneralObj = Ext.create("app.util.GeneralObj",{});
		}

		var backup_name_field = new Ext.form.field.Hidden({
			name:"orginal_name",
			value:''
		});
		var container = GeneralObj.GeneralObjOfName("node_grp_name_container"
				,"Name","name"
				,"node_grp_name_value",tipId,"#DFE9F6",backup_name_field
				,"nodeGrpManager!checkNodeGrpName.action",form,25);
		form.insert(0,container);
		this.callParent(arguments);	
	},
	listeners:{
		beforehide:function(){
			var form = this.down('form');
			var prefix = "<div style='background:#DFE9F6'>";
			var suffix = "</div>";
			var picture = form.getComponent("node_grp_name_container").getComponent("picture");
			picture.flag = 0;
			picture.update(prefix+suffix);
			form.getForm().reset();
		}
	}
});
