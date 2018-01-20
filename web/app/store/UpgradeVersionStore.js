
Ext.require('app.store.UpgradeVersionModel');

Ext.define('app.store.UpgradeVersionStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.UpgradeVersionModel',
	
	autoLoad: true,	
    proxy: {
        type: 'ajax',
        url: 'data/upgradeversion.json',
        reader: {
            type: 'json',
            root: 'versionList',
            successProperty: 'success'
        }
    } 
});
console.log('UpgradeVersionStore load.');
