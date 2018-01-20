Ext.define('app.store.operation.domain.roamzone.site.nes.BkPortModel',{
	extend: 'Ext.data.Model',
//	fields: [
//	         {name: 'group1',type: 'int'},
//	         {name: 'group2',type: 'int'},
//	         {name: 'group3',type: 'int'},
//	         {name: 'group4',type: 'int'},
//	        ]
	       
    fields: [
        {name: 'hasEmail', type: 'bool'},
        {name: 'hasCamera', type: 'bool'},
        {name: 'id', type: 'int'},
        'name',
        {name: 'price', type: 'int'},
        'screen',
        'camera',
        'color',
        'type',
        {name: 'reviews', type: 'int'},
        {name: 'screen-size', type: 'int'}
    ]
           
});
console.log("load bk port model");