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
	            anchor: '100%'
	        },
			items :[{
	            xtype: 'numberfield',
	            name: 'lac',
	            fieldLabel: 'LAC',
	            allowBlank:false,
	            value:42303
	        },{
	            xtype: 'numberfield',
	            name: 'cid',
	            fieldLabel: 'CID',
	            allowBlank:false,
	            value:24132469
	        },{
	            xtype: 'textfield',
	            name: 'apiKey',
	            fieldLabel: 'API Key',
	            allowBlank:false,
	            value:'9db5870542fc1cf77d47dd35407a223e'
	        },{
	        	xtype: 'textfield',
	        	name: 'sid',
	        	fieldLabel: 'SID',
	        	hidden:true,
	        },{
	        	xtype: 'textfield',
	        	name: 'phone_type',
	        	fieldLabel: 'Phone Type',
	        	hidden:true,
	        },{
	        	xtype: 'textfield',
	        	name: 'network_id',
	        	fieldLabel: 'Network Id',
	        	hidden:true
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
		            if (this.up('form').getForm().isValid()) {
			                var form = this.up('form').getForm();
			                var win=this.up('window');
			                if (form.isValid()) {
			                	var cid=form.findField('cid');
			                	var lac=form.findField('lac');
			                	var apiKey=form.findField('apiKey');
			                	var url="http://api.opensignal.com/v2/towerinfo.json?cid="+cid.getValue()+"&lac="+lac.getValue()+
			                	"&sid=&phone_type=&network_id=&apikey="+apiKey.getValue();
//			                	"http://api.opensignal.com/v2/towerinfo.json?cid=24132469&lac=42303&sid=&phone_type=&network_id=&apikey=9db5870542fc1cf77d47dd35407a223e"
			                	ajaxrequest(url,"get",true,null,
	                			function(rs){
									var obj=eval('('+rs.responseText+')');
									if(obj['tower1']){
										var lat=obj['tower1'].est_lat;
										var lng=obj['tower1'].est_lng;
										var title=obj['tower1'].phone_type;
										var gmap=Ext.getCmp(win.cmpId).down('gmappanel');
										gmap.addMarker({
											lat:lat,
											lng:lng,
											title:title
										});
									}else if(obj['towers']){
										Ext.MessageBox.alert(boxSuccess,obj['towers']);
									}
								},document);
			                }
			                this.up('form').getForm().reset();
			                this.up('window').hide();
			            }
		            }
		        
		    }]
		});

Ext.define("app.view.operation.node.AddMarker", {
	extend : 'Ext.window.Window',
	alias : 'widget.addMarker',
	id:'addMarker',
	title :'Add Marker',
	closeAction: 'hide',
	layout:'fit',
	autoScroll:true,
	treeName:'',
	width:430,
	bodyPadding: 5,
	bodyStyle: {
		background: '#DFE9F6',
	},
    layout: 'fit',
    resizable: true,
    cmpId:'',
    items: form
	
});
