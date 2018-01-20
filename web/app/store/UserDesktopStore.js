Ext.require('app.store.SuperUserModel');


Ext.define("app.store.UserDesktopStore", {
    extend: 'Ext.data.Store',
    model: 'Ext.ux.desktop.ShortcutModel',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        data: 'getUserDesktop.action',
        reader: {
            type: 'json',
            root: 'userDesktop',
            successProperty: 'success'
        }
    }
});
console.log('UserDesktopStore load...');
//
//Ext.create('Ext.data.Store', {
//	model : 'Ext.ux.desktop.ShortcutModel',
//	data : [ {
//		name : 'SimBanks',
//		iconCls : 'grid-shortcut',
//		module : 'simbanks-win'
//	}, {
//		name : 'Gateways',
//		iconCls : 'gateway-shortcut',
//		module : 'gateways-win'
//	}, {
//		name : 'sysUsers',
//		iconCls : 'accordion-shortcut',
//		module : 'sysusers-win'
//	}, {
//		name : 'sysLog',
//		iconCls : 'notepad-shortcut',
//		module : 'syslog-win'
//	}, {
//		name : 'sysConfig',
//		iconCls : 'config-shortcut',
//		module : 'config-win'
//	}, {
//		name : 'Dispatcher',
//		iconCls : 'dispatch-shortcut',
//		module : 'dispatch-win'
//	},
//	// { name: 'Notepad', iconCls: 'notepad-shortcut', module: 'notepad' },
//			{
//				name : 'System Status',
//				iconCls : 'cpu-shortcut',
//				module : 'systemstatus'
//			},
//	// { name: 'Syslog', iconCls: 'syslog-shortcut', module: 'syslog' },
//	// { name: 'ProvisionServer', iconCls: 'provision-shortcut', module:
//	// 'notepad' },
//	]
//})