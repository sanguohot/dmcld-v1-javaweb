Ext.require('app.store.device.DeviceModel');

Ext.define('app.store.device.DeviceStore', {
        model: 'app.store.device.DeviceModel',
        proxy: {
            type: 'ajax',
            //the store will get the content from the .json file
            url: 'data/deviceTree.json'
        },
        folderSort: true
});