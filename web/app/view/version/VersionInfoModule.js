Ext.define('app.view.version.VersionInfoModule', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
       // 'Ext.form.field.HtmlEditor'
        //'Ext.form.field.TextArea'
    ],
    id:'version_info',
    init : function(){
        this.launcher = {
            text: lanControll.getLanValue('moduleVersionName'),
            iconCls:'notepad',
            handler : this.createWindow,
            scope: this
        }
    },
    createWindow : function(){
		if(privilege.procModule("version")){
			return;
		}
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('notepad');
        
        var hide=ip.readDB('vv',0,'hide');
        hide=parseInt(hide);
        if(!win){
//        	var view=ip.readDB('apv',0,'view');
//				var height=0;
//				var max=false;
//				if(view==2){
//					height=180;
//					max=true;
//				}else{
//					height=0;
//					max=false;
//				}
				var mp=Ext.getCmp('mp');
			 if(privilege.procLogRead()){
				 logGrid = Ext.create('app.view.privilege.Forbidden',{});
				 logGrid.show();
		         win = desktop.createWindow({
		                id: 'notepad',
		                title:lanControll.getLanValue('tiVersionMnt'),
		                iconCls: 'notepad',
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
		                animCollapse:false,
		                border: false,
		                hideMode: 'offsets',
		                layout: 'fit',
		                bodyStyle: {
							background: '#DFE9F6',
						},
		                items: [logGrid]
		            });
			 }else{
				 var ver="version.html";
				 if(rs.dmCloudMode()){
					 ver="version-dm.html";
				 }else{
					 ver="version.html";
				 }
		          win = desktop.createWindow({
		                id: 'notepad',
		                title:lanControll.getLanValue('tiVersionInfo'),
		                iconCls: 'notepad',
		                animCollapse:false,
		                closable:true,
		                resizable:false,
					    draggable:false,
					    maximizable:false,
					    minimizable:false,
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
		                hideMode: 'offsets',
		                layout: 'fit',
		                bodyStyle: {
							background: '#DFE9F6',
						},
		                items: [{
//							 region:'center',
							 height:Math.floor(desktop.getHeight()*0.9),
							 border:false,
							 layout:'fit',
							 html:'<iframe scrolling="auto" style="background:#FFFFFF" frameborder="0" width="100%" height="100%" src="app/view/version/'+ver+'?_dc=1.8"></iframe>'
//						},{
//							 region: 'south',
//							 collapsible: false,
//							 autoScroll:false,
//							 layout: 'anchor',
//							 bodyStyle: {
//								background:'#DFE9F6',
//							 },
//							 items:[
//							     {xtype:'checkbox',boxLabel: lanControll.getLanValue('notShowNextLogin'),boxLabelCls:'box_label',width:'100%',inputValue:1,checked:hide,
//							    	 listeners:{
//										change:function(field,newValue,oldValue,opts){
//						        			if(newValue==1){
//						        				ip.insertDB('vv',0,'hide','1');
//						        			}else{
//						        				ip.insertDB('vv',0,'hide','0');
//						        			}
//					        			}
//					    			}
//							     }
//							 ]
						 }]
		            });
			 }
  
        }
        win.show();
        return win;
    }
});

