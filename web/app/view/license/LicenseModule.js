Ext.define('app.view.license.LicenseModule' ,{
    extend: 'Ext.ux.desktop.Module',
    requires: [
         'Ext.window.MessageBox',
        'Ext.util.Format',
        'Ext.grid.Panel',
		'Ext.ux.grid.FiltersFeature',
    ],
    id:'license_win',
    alias : 'widget.license',
	createWindow : function(openLink){
		if(privilege.procModule("license")){
			return;
		}
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('license_win');
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
				 
					var licenseTree;
					
					var licensePanel;

					var f = function(v){
			         return function(){
			        	 if(v==5){
			        		 licenseTree=Ext.create('app.view.license.LicenseTree',{});
			        	 }
			        	 if(v==7){
			        		 licensePanel=Ext.create('app.view.license.LicensePanel',{});
			        	 }
			             if(v == 12){
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
								id: 'license_win',
								title:lanControll.getLanValue('tiLicMnt'),
								iconCls: 'license-small',
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
								items: [{
									 region: 'west',
									 collapsible: false,
									 border:false,
									 layout:'fit',
									 width:Math.floor(320),
									 split: true,
									 autoScroll:false,
									 items:[licenseTree]
								 },{
									 id:'licenseCenterPanel',
									 region:'center',
									 height:Math.floor(mp.getHeight()),
									 border:false,
									 layout:'fit',
									 items:[licensePanel]
								}]
							});	
							Ext.MessageBox.hide();
							
							win.show();
							
							var ot = Ext.getCmp('licenseTree');
							if(ot.getRootNode()){
								var rootNode=ot.getRootNode();
								var openLink=rootNode.firstChild.raw.nid;
								var node=rootNode.findChild('nid',openLink,true);
								if(node){
									ot.fireEvent('itemclick',null,node);
									ot.getSelectionModel().select(node);
								}
								
							}
			             }else{
			                 var i = v/11;
			                 Ext.MessageBox.updateProgress(i, Math.round(100*i)+boxCompletedMsg);
			             }
			        };
			    };
			    for(var i = 1; i < 13; i++){
			        setTimeout(f(i), i*200);
			    }
			}
			progress();
			   
		}	
		return win;
	},
	

    init : function(){
        this.launcher = {
            text: lanControll.getLanValue('moduleLicName'),
            iconCls:'license-small',
            handler : this.createWindow,
            scope: this
        };
    }
	
});