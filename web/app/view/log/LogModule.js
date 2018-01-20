Ext.define('app.view.log.LogModule' ,{
    extend: 'Ext.ux.desktop.Module',

    requires: [      
        'Ext.util.Format',
        'Ext.grid.Panel',
		'Ext.ux.grid.FiltersFeature',
    ],

    id:'log_win',
    alias : 'widget.log',
	createWindow : function(openLink){
		if(privilege.procModule("log")){
			return;
		}
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('log_win');	
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
			var logTree;
			var logPanel;
			var task = {
				run:function(){
          do_action(function(err){
            Ext.TaskManager.stop(task);
            MessageBox.hide();
            progress(desktop,logTree,logPanel);
          })
          function do_action(cb){
            logTree = Ext.create("app.view.log.LogTree");
            logPanel = Ext.create("app.view.log.LogPanel");
            if(privilege.procLogRead()) {
              logPanel = Ext.create('app.view.privilege.Forbidden', {});
              logPanel.show();
            }
            cb(null)
          }
//					count++;
//					percentage = count/10;
//					//alert(count)
//					progressText = percentage*100+boxCompletedMsg;
//					MessageBox.updateProgress(percentage, progressText);
//					if(count>10){
//						Ext.TaskManager.stop(task);
//						MessageBox.hide();
//						progress(desktop,logTree,logPanel);
//					}else if(count == 1){
//						logTree = Ext.create("app.view.log.LogTree");
//					}else if(count == 2){
//						logPanel = Ext.create("app.view.log.LogPanel");
//						 if(privilege.procLogRead()){
//							 logPanel = Ext.create('app.view.privilege.Forbidden',{});
//							 logPanel.show();
//						 }else{
////							 var store = logPanel.down('pagingtoolbar').store;
////							var objectTypes = alarmObject.getObjectTypes('fcloud');
////							var objectIds = "";
////							 var params = {cleanFlag:0, alarmType:'1,2', cleanTimeB:null
////				    				, cleanTimeE:null, recvTimeB:null, recvTimeE:null, reportTimeB:null, reportTimeE:null
////				    				, alarmLevel:null, alarmName:null, causeName:null
////				    				, objectIds:objectIds,objectTypes:objectTypes,objectDesc:null};
////							Ext.apply(store.proxy.extraParams, params);
////							 logPanel.down('pagingtoolbar').moveFirst();
//						 }
//					}
				},
				interval:300
			};
			Ext.TaskManager.start(task);
			
			function progress(desktop,logTree,logPanel){
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
					id: 'log_win',
					layout: 'border',
					title:lanControll.getLanValue('moduleLogName'),
					iconCls: 'log-small',
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
						 id:'logCenterPanel',
						 region:'center',
						 height:Math.floor(mp.getHeight()),
						 border:false,
						 layout:'fit',
						 items:[logPanel]
					}]
				});
				win.show();
				
				var fcloudGridContainer=Ext.getCmp('fcloudGridContainer');
				if(logPanel){
					var xy=logPanel.getPosition();
					var size=logPanel.getSize();
					fcloudGridContainer.setSize(size.width,size.height);
					fcloudGridContainer.setVisible(true);
					fcloudGridContainer.doLayout();					
				}
				
				var ot = Ext.getCmp('logTree');
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
            text: lanControll.getLanValue('moduleLogName'),
            iconCls:'log-small',
            handler : this.createWindow,
            scope: this
        };
    }
	
});