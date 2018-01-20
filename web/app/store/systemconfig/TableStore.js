Ext.require('app.store.systemconfig.TableModel');

Ext.define('app.store.sytemconfig.TableStore', {
		extend: 'Ext.data.Store',
		model: 'app.store.systemconfg.TableModel',
        autoLoad:false,
        proxy: {
            type: 'ajax',
            url: 'productTypeManager!getProductType.action',
            reader: {
                type: 'json',
                root: 'productTypeList'
            }	
        }
});