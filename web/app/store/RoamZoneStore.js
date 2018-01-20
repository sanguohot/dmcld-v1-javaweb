
Ext.require('app.store.RoamZoneModel');

Ext.define('app.store.RoamZoneStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.RoamZoneModel',
	
	autoLoad: true,	
    proxy: {
        type: 'ajax',
        url: 'data/roamzone.json',
        reader:{
			type:'json',
			root:'roamzone'
		}
    } 
});
