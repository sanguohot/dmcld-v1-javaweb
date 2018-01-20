Ext.define('app.view.systemconfig.SystemConfigModule' ,{
    extend: 'Ext.ux.desktop.Module',
    requires: [
         'Ext.window.MessageBox',
        'Ext.util.Format',
        'Ext.grid.Panel',
		'Ext.ux.grid.FiltersFeature',
    ],

    id:'systemConfig_win',
    alias : 'widget.systemConfig',
	createWindow : function(){
		if(privilege.procModule("system")){
			return;
		}
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('systemConfig_win');
		if(!win){	
		
			function progress(){
			  
				 Ext.MessageBox.show({
			           title: boxWaitTitle,
			           msg: boxLoadingMsg,
			           progressText: boxInitMsg,
			           width:300,
			           progress:true,
			           closable:false

			       });
				 
					var systemConfigTree;
					
					var systemConfigPanel;

					var f = function(v){
			         return function(){
			        	 if(v==5){
			        		 systemConfigTree=Ext.create('app.view.systemconfig.SystemConfigTree',{});
			        	 }
			        	 if(v==7){
			        		 systemConfigPanel=Ext.create('app.view.systemconfig.SystemConfigPanel',{});
			        	 }
			             if(v == 12){
			            	 
			            	 function rightClickFn(view, record, item, index, event, options) {
									var eType=record.raw.eType;
									var nid=record.raw.nid;
									var tid=record.raw.tid;
									var name=record.raw.name;
									event.preventDefault();
									event.stopEvent();
									
									
									if(eType=='roamzone'){
										Ext.create('Ext.menu.Menu', {
											width: 100,
											height: 35,
											margin: '0 0 10 0',
											floating : true,
											plain : true,
											items : [ {
												text : 'Add Site',
												iconCls:'add',
												ulan:'miAddSite',
												handler : function() {
												
													var addSite=Ext.getCmp('addSite');
													if(addSite=='undefined'||addSite==undefined){
														addSite = Ext.create('app.view.systemconfig.domain.roamzone.AddSite');
													}
													var zoneUuid=tid;
									   				var domainUuid=record.parentNode.parentNode.raw.tid;
									   				addSite.down('form').getForm().findField('domainUuid').setValue(domainUuid);
									   				addSite.down('form').getForm().findField('zoneUuid').setValue(zoneUuid);
													addSite.show();
												}
											}]
										}).showAt(event.getXY());
									}
								
								};
								systemConfigTree.addListener('itemcontextmenu', rightClickFn, this); 
								systemConfigPanel.addListener('itemcontextmenu', function(){alert('abc');}, this); 
								systemConfigTree.setHeight(desktop.getHeight()*0.9-40);
								
//								var view=ip.readDB('apv',0,'view');
//				 				var height=0;
//				 				var max=false;
//				 				if(view==2){
//				 					height=180;
//				 					max=true;
//				 				}else{
//				 					height=0;
//				 					max=false;
//				 				}
				 				var mp=Ext.getCmp('mp');
			            	 win = desktop.createWindow({
								id: 'systemConfig_win',
							title:lanControll.getLanValue('tiSystemCfgMnt'),
							iconCls: 'systemconfig-small',
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
							layout: 'border',
							autoScroll:false,
//							bodyStyle: 'padding: 2px;',
							items: [{
									 region: 'west',
								 collapsible: false,
								 border:false,
								 layout:'fit',
								 width:Math.floor(320),
								 split: true,
								 autoScroll:false,
								 items:[systemConfigTree]
							 },{
								 id:'systemConfigCenterPanel',
								 region:'center',
								 height:Math.floor(mp.getHeight()),
								 border:false,
								 layout:'fit',
								 items:[systemConfigPanel]
							}]
							});	
							Ext.MessageBox.hide();
							
							win.show();
							var simCloudPanel=Ext.getCmp('systemConfigSimCloudPanel');
							simCloudPanel.setVisible(true);
							simCloudPanel.doLayout();
							
							if(systemConfigPanel){
								var size=systemConfigPanel.getSize();
								simCloudPanel.setSize(size.width,size.height);
							}
							simCloudPanel.setVisible(true);
							simCloudPanel.doLayout();
			             }else{
			                 var i = v/11;
			                 Ext.MessageBox.updateProgress(i, Math.round(100*i)+boxCompletedMsg);
			             }
			        };
			    };
			    for(var i = 1; i < 13; i++){
			        setTimeout(f(i), i*200);    //这里如果能动态的获取进度，和后台同步。
			    }
			}
			progress();
			   
		}	
		return win;
	},
	

    init : function(){
        this.launcher = {
            text: lanControll.getLanValue('moduleSystemCfgName'),
            iconCls:'systemconfig-small',
            handler : this.createWindow,
            scope: this
        };
    }
	
});