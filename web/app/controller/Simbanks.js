Ext.define('dms.controller.Simbanks', {
    extend: 'Ext.app.Controller',
	
	stores: [
	    'SimBankStore'  
	],
	views: [
        'simbank.List',
		'simbank.Edit',
    ],
	
    init: function() {
        this.control({
			'simbanklist': {
                itemdblclick: this.editUser
			},
            'simbankedit button[action=save]': {
                click: this.updateSimbank
            }			
        });
    },
	
	editUser: function(grid,record) {
		//alert('Double clicked on ' + record.get('bankid'));
		var view = Ext.create('widget.simbankedit');
        view.down('form').loadRecord(record);
	},

    updateSimbank: function(button) {
        alert('clicked the Save button');
    }		
});