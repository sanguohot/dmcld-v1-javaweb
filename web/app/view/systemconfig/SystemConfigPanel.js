Ext.define('app.view.systemconfig.SystemConfigPanel',{
	extend:'Ext.panel.Panel',
	layout:'auto',
	border:false,
	id:'systemConfigPanel',
	bodyStyle: {
		background: '#DFE9F6',
	},
//	collapsible:true,
	initComponent: function(){

		var simCloudPanel=Ext.create('app.view.operation.SimCloudPanel',{
			id:'systemConfigSimCloudPanel'
		});
          
        this.items=[simCloudPanel];
		
		this.callParent(arguments);	
	},

	listeners:{
		resize:function(win, width, height, eOpts){
		
			var systemConfigPanel=Ext.getCmp('systemConfigPanel');
			
			if(systemConfigPanel){
			
				var xy=systemConfigPanel.getPosition();
				var size=systemConfigPanel.getSize();
				
//				var cloudPanel=Ext.getCmp('cloudPanel');
//		
//				if(simCloudPanel && simCloudPanel.isVisible()){
//					simCloudPanel.setVisible(true);
//					simCloudPanel.setSize(size.width,size.height);
//				}
			
			}
		}
	}
	
	
});