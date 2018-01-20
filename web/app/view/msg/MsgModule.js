/**
 * Created by Rainc on 2014/11/10.
 */

Ext.define('app.view.msg.MsgModule' ,{
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.ux.grid.FiltersFeature',
    ],

    id:'msg_win',
//    alias : 'widget.log',
    createWindow : function(openLink){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('msg_win');
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
//                  do_action(function(err){
//                    Ext.TaskManager.stop(task);
//                    MessageBox.hide();
//                    progress(desktop,logPanel);
//                  })
//                  function do_action(cb){
//                    logTree = Ext.create("app.view.msg.MsgTree");
//                    logPanel = Ext.create("app.view.msg.MsgPanel");
//                    if(privilege.procLogRead()){
//                      logPanel = Ext.create('app.view.batch.Forbidden',{});
//                      logPanel.show();
//                    }
//                    cb(null);
//                  }
                    count++;
                    percentage = count/10;
                    //alert(count)
                    progressText = percentage*100+boxCompletedMsg;
                    MessageBox.updateProgress(percentage, progressText);
                    if(count>10){
                        Ext.TaskManager.stop(task);
                        MessageBox.hide();
                        progress(desktop,logPanel);
                    }else if(count == 1){
                        logTree = Ext.create("app.view.msg.MsgTree");
                    }
                    else if(count == 5){
                        logPanel = Ext.create("app.view.msg.MsgPanel");
                        if(privilege.procLogRead()){
                            logPanel = Ext.create('app.view.batch.Forbidden',{});
                            logPanel.show();
                        }
                    }
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
                    id: 'msg_win',
                    layout: 'border',
                    title:lanControll.getLanValue('moduleMsgName'),
                    iconCls: 'msg16',
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

//                var fcloudGridContainer=Ext.getCmp('fcloudBatchTabPanel');
//                if(logPanel){
//                    var xy=logPanel.getPosition();
//                    var size=logPanel.getSize();
//                    fcloudGridContainer.setSize(size.width,size.height);
//                    fcloudGridContainer.setVisible(true);
//                    fcloudGridContainer.doLayout();
//                }

                var ot = Ext.getCmp('msgTree');
				if(openLink){
					logTree.openLink=openLink;
					var rootNode=ot.getRootNode();
					var node=rootNode.findChild('nid',openLink,true);
    				if(node){
						ot.getSelectionModel().select(node);
						ot.fireEvent('itemclick',null,node);
						ot.getSelectionModel().setLastFocused(node);
    				}
				}
            }
        }
        return win;
    },


    init : function(){
        this.launcher = {
            text: lanControll.getLanValue('moduleMsgName'),
            iconCls:'msg16',
            handler : this.createWindow,
            scope: this
        };
    }

});