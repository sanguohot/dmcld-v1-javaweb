
Ext.define('app.view.monitor.MonitorModule' ,{
    extend: 'Ext.ux.desktop.Module',
    requires: [
         'Ext.window.MessageBox',
        'Ext.util.Format',
        'Ext.grid.Panel',
		'Ext.ux.grid.FiltersFeature',
    ],
    id:'monitor_win',
    alias : 'widget.monitor',
	createWindow : function(openLink){
		if(privilege.procModule("performance")){
			return;
		}
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('monitor_win');
		
		if(!win){
    		deleteCookie("generalChart_15");
    		deleteCookie("generalChart_24");
			function progress(){

				 Ext.MessageBox.show({
			           title: boxWaitTitle,
			           msg: boxLoadingMsg,
			           progressText: boxInitMsg,
			           width:300,
			           progress:false,
			           closable:false

			       });

				 var monitorPanel;
				 var monitorTree;
			    var f = function(v){
			         return function(){
			        	 if(v==1){
			        		 monitorPanel=Ext.create('app.view.monitor.MonitorPanel',{});
                             monitorTree=Ext.create('app.view.monitor.MonitorTree',{});
			        	 }
			             if(v == 2){
//			            	var view=ip.readDB('apv',0,'view');
//			 				var height=0;
//			 				var max=false;
//			 				if(view==2){
//			 					height=180;
//			 					max=true;
//			 				}else{
//			 					height=0;
//			 					max=false;
//			 				}
			 				var mp=Ext.getCmp('mp');
							win = desktop.createWindow({
								id: 'monitor_win',
							title:lanControll.getLanValue('tiPerMnt'),
							layout: 'border',
							iconCls: 'monitor-small',
							closable:true,
							resizable:false,
						    draggable:false,
						    maximizable:false,
						    minimizable:false,
							closeAction: 'hide',
							autoScroll:false,
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
							items: [{
								 region: 'west',
								 collapsible: false,
								 layout:'fit',
								 width:Math.floor(320),
								 split: true,
								 border:false,
								 autoScroll:false,
								 items:[monitorTree]
							 },{
								 id:'monitorCenterPanel',
								 region:'center',
								 height:Math.floor(mp.getHeight()),
								 border:false,
								 layout:'fit',
								 items:[monitorPanel]
							}]
							});
							Ext.MessageBox.hide();
							win.show();

							var noDateToShow=Ext.getCmp('noDateToShow');
							if(monitorPanel){
								var size=monitorPanel.getSize();
//								simCloudPanel.setPagePosition(xy[0],xy[1]);
								noDateToShow.setSize(size.width,size.height);
								noDateToShow.setVisible(true);
								noDateToShow.doLayout();
							}
							if(treeFn.triggerValue){
			    				win.down('trigger').setValue(treeFn.triggerValue);
			    			}
							//open link when window open
                            if(!openLink){
                                openLink = 'system_1';
                            }
							if(openLink){
								monitorTree.openLink=openLink;
								var ot = Ext.getCmp('monitorTree');
								var rootNode=ot.getRootNode();
								var node=rootNode.findChild('nid',openLink,true);
								if(node){
									var temp=node;
				    				for(var c=0;c<5;c++){
				    					if(temp.parentNode){
				    						temp=temp.parentNode;
				    						if(temp){
				    							if(!temp.isExpanded()){
				    								ot.expandNode(temp);
				    							}
				    						}
				    					}else{
				    						break;
				    					}
				    				}
				    				ot.getSelectionModel().select(node);
									ot.fireEvent('itemclick',null,node);
									ot.getSelectionModel().setLastFocused(node);
								}
							}
			             }else{
			                 var i = v/2;
			                 Ext.MessageBox.updateProgress(i, Math.round(100*i)+boxCompletedMsg);
			             }
			        };
			    };
			    for(var i = 1; i < 3; i++){      //修改数值可以提高速度
			        setTimeout(f(i), i*200);    //这里如果能动态的获取进度，和后台同步。
			    }
			}
			progress();
			   
		}	
//		Ext.MessageBox.hide();
//		win.show()
		return win;
	},
	

    init : function(){
        this.launcher = {
            text: lanControll.getLanValue('modulePerName'),
            iconCls:'monitor-small',
            handler : this.createWindow,
//            handler : function(){
      
            scope: this
        };
//		console.log(" monitor init.");
		 
		
    }
	
});