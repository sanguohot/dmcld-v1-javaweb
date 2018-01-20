
Ext.define('app.util.InitToolbar',{
	initToolbar:function(tbs){
		var di=[{
	        xtype: 'toolbar',
	        items: []
	    }];
		var items=di[0].items;
		
		if((tbs&1)>0){
			items[0]=commit;
		}
		if((tbs&2)>0){
			items[1]='-';
			items[2]=refresh;
		}
		return di;
	}
	
});
