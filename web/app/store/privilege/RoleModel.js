Ext.define('app.store.privilege.RoleModel', {
    extend: 'Ext.data.Model',
	fields: [
			{name: 'uuid',   type: 'int'},
			{name: 'recStatus',   type: 'int'},
			{name: 'roleId', type: 'int'},
			{name: 'name', type: 'string'},
			{name: 'detailDesc', type: 'string'},
			{name: 'rightSuperRead', type: 'int'},
			{name: 'rightSuperEdit', type: 'int'},
			{name: 'rightSuperAction', type: 'int'},
			{name: 'rightDomainRead', type: 'int'},
			{name: 'rightDomainEdit', type: 'int'},
			{name: 'rightDomainAction', type: 'int'},
			{name: 'rightDeviceAction', type: 'int'},
			{name: 'rightSimAction', type: 'int'},
			{name: 'rightApiAction', type: 'int'},
			
			{name: 'rightSpecialFinance', type: 'int'},
			{name: 'rightModuleConfiguration', type: 'int'},
			{name: 'rightModuleMaintenance', type: 'int'},
			{name: 'rightModulePerformance', type: 'int'},
			{name: 'rightModuleLog', type: 'int'},
			{name: 'rightModuleVersion', type: 'int'},
			{name: 'rightModuleProvision', type: 'int'},
			{name: 'rightModuleSystem', type: 'int'},
			{name: 'rightModuleLicense', type: 'int'},
			{name: 'rightModulePrivilege', type: 'int'},
			{name: 'rightModuleBatch', type: 'int'},
		]
});