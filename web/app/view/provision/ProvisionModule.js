Ext.define('app.view.provision.ProvisionModule' ,{
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.util.Format',
        'Ext.grid.Panel',
		'Ext.ux.grid.FiltersFeature',
    ],

    id:'provision_win',
    alias : 'widget.provision',
	createWindow : function(){
		if(privilege.procModule("provision")){
			return;
		}
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('provision_win');
		if(!win){	
			function progress(){
				  
				 Ext.MessageBox.show({
			           title: boxWaitTitle,
			           msg: boxLoadingMsg,
			           progressText: boxInitMsg,
			           width:300,
			           progress:false,
			           closable:false
			          
			       });
				 var provisionTree;
				 var provisionPanel;
			var f = function(v){
		         return function(){
		        	 if(v==1){
		        		 provisionTree=Ext.create('app.view.provision.ProvisionTree',{});
                 provisionPanel=Ext.create('app.view.provision.ProvisionPanel',{});
               }
		        	 
		             if(v == 2){
		            	 
//		            	 var view=ip.readDB('apv',0,'view');
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
					id: 'provision_win',
					title:lanControll.getLanValue('moduleProName'),
					iconCls: 'provision-small',
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
		           			 layout:'fit',
		           			 width:Math.floor(320),
		        			 collapsible: false,
		        			 split: true,
		        			 border:false,
		        			 autoScroll:false,
		        			 items:[provisionTree]
		        		 },{
		        			 id:'provisionCenterPanel',
		        			 region:'center',
		        			 height:Math.floor(mp.getHeight()),
		        			 border:false,
		        			 layout:'fit',
		        			 items:[provisionPanel]
		        		 }]
					});
					Ext.MessageBox.hide();
					win.show();
					var ot = Ext.getCmp('provisionTree');
					var rootNode=ot.getRootNode();
					var node=rootNode.findChild('nid','provision_-1',true);
					if(node){
						ot.getSelectionModel().select(node);
						ot.fireEvent('itemclick',null,node);
					}
//					ot.getSelectionModel().select(node);
	             }else{
	                 var i = v/11;
	                 Ext.MessageBox.updateProgress(i, Math.round(100*i)+boxCompletedMsg);
	             }
		        };
		    };
		    for(var i = 1; i < 3; i++){
		        setTimeout(f(i), i*200);    //这里如果能动态的获取进度，和后台同步。
		    }
		}
		progress();
}
		
		return win;
	},
	

    init : function(){
        this.launcher = {
            text: lanControll.getLanValue('moduleProName'),
            iconCls:'provision-small',
            handler : this.createWindow,
            scope: this
        };
//		console.log(" provision management init.");
    }
	
});