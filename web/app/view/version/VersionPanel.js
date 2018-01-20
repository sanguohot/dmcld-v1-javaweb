Ext.define('app.view.version.VersionPanel', {
	extend : 'Ext.window.Window',
    title:lanControll.getLanValue('tiVersionInfo'),
    width:800,
    height:500,
    iconCls: 'notepad',
    animCollapse:false,
    border: false,
    hideMode: 'offsets',
    layout: 'border',
    bodyStyle: {
		background: '#DFE9F6',
	},
    items: [{
		 region:'center',
		 height:600,
		 border:false,
		 layout:'fit',
		 html:'<iframe scrolling="auto" style="background:#FFFFFF" frameborder="0" width="100%" height="100%" src="app/view/version/version.html"></iframe>'
	},{
		 region: 'south',
		 collapsible: false,
		 autoScroll:false,
		 layout: 'anchor',
		 bodyStyle: {
			background:'#DFE9F6',
		 },
		 items:[
		     {xtype:'checkbox',boxLabel: "Don't show at next login",boxLabelCls:'box_label',width:'100%',inputValue:1,checked:false,
		    	 listeners:{
					change:function(field,newValue,oldValue,opts){
	        			if(newValue==1){
	        				ip.insertDB('vv',0,'hide','1');
	        			}else{
	        				ip.insertDB('vv',0,'hide','0');
	        			}
        			}
    			}	
		     }
		 ]
	 }]
});

