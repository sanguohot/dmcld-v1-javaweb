Ext.define('app.view.common.ModulePanel', {
	extend : 'Ext.window.Window',
	x:0,
	y:0,
    width:86,
    height:'100%',
    animCollapse:false,
    border: false,
    closable:false,
    draggable:false,
    resizable:false,
    title:'',
    hideMode: 'offsets',
    layout: 'fit',
    border: 0,
    style: {
        borderColor: '#CED9E7',
        borderStyle: 'solid'
    },
    margin:'0 0 0 0',
    padding:'0 0 0 0',
//    bodyStyle:"background-color:#000fff;padding:55px 5px 0"
    bodyStyle: {
		background: '#CED9E7',
	},
//	dockedItems: [{
//	    xtype: 'toolbar',
//	    autoScroll:true,
//	    dock: 'left',
//	    items: [{
//			text:'Performance',
//			iconCls: 'monitor-shortcut',
//	        scale: 'large',
//	        iconAlign: 'top',
//	        handler: function() {
//	    		ip.createModule("monitor_win");
//	        }
//	    },'-',{
//			text:'Configuration',
//			iconCls: 'dispatch-shortcut',
//	        scale: 'large',
//	        iconAlign: 'top',
//	        handler: function() {
//	    		ip.createModule("operation_win");
//	        }
//	    },'-',{
//	    	text:'Maintenance',
//	    	iconCls: 'gateway-shortcut',
//	    	scale: 'large',
//	    	iconAlign: 'top',
//	    	handler: function() { 
//	    	ip.createModule("maintenance_win");
//	    }
//	    }]
//	}]
//    items: [{
//		 border:false,
//		 layout:'fit',
//		 html:'<table>'+
//		 '<tr><td align="center"><input type="button" value="Performance" class="monitor-shortcut" style="width:76px;height:50px;" onclick=ip.createModule("monitor_win"); /></td></tr>'+
//		 '<tr><td align="center"><input type="button" value="Configuration" class="dispatch-shortcut" style="width:76px;height:50px;" onclick=ip.createModule("operation_win"); /></td></tr>'+
//		 '<tr><td align="center"><input type="button" value="Maintenance" class="gateway-shortcut" style="width:76px;height:50px;" onclick=ip.createModule("maintenance_win"); /></td></tr>'+
//		 '</table>'
//	}]
});

