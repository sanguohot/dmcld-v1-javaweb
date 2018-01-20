
Ext.define('app.view.privilege.PrivilegeModule' ,{
    extend: 'Ext.ux.desktop.Module',

    requires: [      
        'Ext.util.Format',
        'Ext.grid.Panel',
		'Ext.ux.grid.FiltersFeature',
    ],

    id:'privilege_win',
//    alias : 'widget.log',
	createWindow : function(){
		if(privilege.procModule("privilege")){
			return;
		}
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('privilege_win');	
		if(!win){
			var MessageBox = Ext.MessageBox.show({
		           title: boxWaitTitle,
		           msg: boxLoadingMsg,
		           width:300,
		           progress:false,
		           progressText:boxInitMsg,
		           modal:true,
		           closable:false
				});
			var count = 0;
			var percentage = 0;
			var porgressText = 0;
			var logPanel,logTree;
			var task = {
				run:function(){
          do_action(function(err){
            Ext.TaskManager.stop(task);
            MessageBox.hide();
            progress(desktop,logPanel);
          })
          function do_action(cb){
            logTree = Ext.create("app.view.privilege.PrivilegeTree");
            logPanel = Ext.create("app.view.privilege.PrivilegePanel");
            if(privilege.procLogRead()){
              logPanel = Ext.create('app.view.privilege.Forbidden',{});
              logPanel.show();
            }
            cb(null);
          }
//					count++;
//					percentage = count/10;
//					//alert(count)
//					progressText = percentage*100+boxCompletedMsg;
//					MessageBox.updateProgress(percentage, progressText);
//					if(count>10){
//						Ext.TaskManager.stop(task);
//						MessageBox.hide();
//						progress(desktop,logPanel);
//					}else if(count == 1){
//						logTree = Ext.create("app.view.privilege.PrivilegeTree");
//					}
//					else if(count == 5){
//						logPanel = Ext.create("app.view.privilege.PrivilegePanel");
////						 logPanel.down('pagingtoolbar').moveFirst();
//						 if(privilege.procLogRead()){
//							 logPanel = Ext.create('app.view.privilege.Forbidden',{});
//							 logPanel.show();
//						 }
//					}
				},
				interval:300
			};
			Ext.TaskManager.start(task);
			
			function progress(desktop,logPanel){
//				var view=ip.readDB('apv',0,'view');
// 				var height=0;
// 				var max=false;
// 				if(view==2){
// 					height=180;
// 					max=true;
// 				}else{
// 					height=0;
// 					max=false;
// 				}
 				var mp=Ext.getCmp('mp');
				win = desktop.createWindow({
					id: 'privilege_win',
					layout: 'border',
					title:lanControll.getLanValue('tiPrivilegeMnt'),
					iconCls: 'privilege-small',
					closable:true,
					resizable:false,
				    draggable:false,
				    maximizable:false,
				    minimizable:false,
					closeAction: 'hide',
					width: Math.floor(desktop.getWidth()-mp.getWidth()),//1024,
					height:Math.floor(mp.getHeight()),//680,
					x:mp.getWidth()+2,
					y:0,
					border: 0,
				    style: {
				        borderColor: '#CED9E7',
				        borderStyle: 'solid'
				    },
				    margin:'0 0 0 0',
				    padding:'0 0 0 0',
//					layout: 'fit',
//					autoScroll:false,
//					bodyStyle: 'padding: 2px;',
					items: [{
						 region: 'west',
						 collapsible: false,
						 layout:'fit',
						 width:Math.floor(320),
						 split: true,
						 border:false,
						 autoScroll:false,
						 items:[logTree]
					},{
//						 id:'logCenterPanel',
						 region:'center',
						 height:Math.floor(mp.getHeight()),
						 border:false,
						 layout:'fit',
						 items:[logPanel]
					}]
				});
				win.show();
				
				var fcloudGridContainer=Ext.getCmp('fcloudPrivilegeTabPanel');
				if(logPanel){
					var xy=logPanel.getPosition();
					var size=logPanel.getSize();
					fcloudGridContainer.setSize(size.width,size.height);
					fcloudGridContainer.setVisible(true);
					fcloudGridContainer.doLayout();					
				}
				
				var ot = Ext.getCmp('privilegeTree');
				if(ot.getRootNode()){
					var rootNode=ot.getRootNode();
					var openLink=rootNode.firstChild.raw.nid;
					var node=rootNode.findChild('nid',openLink,true);
					if(node){
						ot.fireEvent('itemclick',null,node);
						ot.getSelectionModel().select(node);
					}
					
				}
			}			   
		}
		return win;
	},
	

    init : function(){
        this.launcher = {
            text: lanControll.getLanValue('modulePrivilegeName'),
            iconCls:'privilege-small',
            handler : this.createWindow,
            scope: this
        };
    }
	
});