Ext.create('app.view.device.domain.DomainPanel2', {
	extend:'Ext.panel.Panel',
    title: 'Table Layout',
    width: 300,
    height: 150,
    layout: {
        type: 'table',
        // The total column count must be specified here
        columns: 5
    },
    defaults: {
        // applied to each contained panel
        bodyStyle: 'padding:20px'
    },
    items: [{
        html: 'Cell A content',
        rowspan: 2
    }, {
        html: 'Cell B content',
        colspan: 2
    }, {
        html: 'Cell C content',
        cellCls: 'highlight'
    }, {
        html: 'Cell D content'
    }],
});