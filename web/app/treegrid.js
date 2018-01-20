/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.tree.*'
]);

Ext.onReady(function() {
    //we want to setup a model and store instead of using dataUrl
    Ext.define('Gateway', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'status',   type: 'string'},
            {name: 'roundtrip', type: 'string'},
			{name: 'name', type: 'string'},
			{name: 'desc', type: 'string'},
        ]
    });

    var store = Ext.create('Ext.data.TreeStore', {
        model: 'Gateway',
        proxy: {
            type: 'ajax',
            //the store will get the content from the .json file
            url: 'data/treegrid.json'
        },
        folderSort: true
    });

    //Ext.ux.tree.TreeGrid is no longer a Ux. You can simply use a tree.TreePanel
    var tree = Ext.create('Ext.tree.Panel', {
        title: 'Roaming group/zone/Gateways',
        width: 640,
        height: 480,
        renderTo: Ext.getBody(),
        collapsible: true,
        useArrows: true,
        rootVisible: false,
        store: store,
		viewConfig: {
            plugins: {
                ptype: 'treeviewdragdrop'
            }
        },
        multiSelect: true,
        singleExpand: false,	
		columnLines: true,		
        //the 'columns' property is now 'headers'
        columns: [{
            xtype: 'treecolumn', //this is so we know which column will show the tree
            text: 'Group/zone/gateway',
            flex: 2,
            sortable: true,
            dataIndex: 'name',
        },{
            //we must use the templateheader component so we can use a custom tpl
            xtype: 'templatecolumn',
            text: 'Roundtrip',
            flex: 1,
            sortable: true,
            dataIndex: 'roundtrip',
            align: 'center',
            //add in the custom tpl for the rows
            tpl: Ext.create('Ext.XTemplate', '{roundtrip:this.formatHours}', {
                formatHours: function(v) {
                    if (v < 1) {
                        return Math.round(v * 60) + ' mins';
                    } else if (Math.floor(v) !== v) {
                        var min = v - Math.floor(v);
                        return Math.floor(v) + 'h ' + Math.round(min * 60) + 'm';
                    } else {
                        return v + ' hour' + (v === 1 ? '' : 's');
                    }
                }
            })
        },{
			xtype: 'templatecolumn',
            text: 'Status',
            width: 64,
            dataIndex: 'status',
            sortable: true,
            //add in the custom tpl for the rows
            tpl: Ext.create('Ext.XTemplate', '{status:this.formatStatus}', {
                formatStatus: function(val) {
				if( val =='online') { 
					return '<span style="color:grey;">' + val + '</span>';
				}
				else if	( val =='offline') { 
					return '<span style="color:red;">' + val + '</span>';
				}	
				else {
					return '<span style="color:green;">' + val + '</span>';	
				}
                }
            })			
        },{
            text: 'Description',
            flex: 1,
            dataIndex: 'desc',
            sortable: false
        }
		],
		dockedItems: [{
            xtype: 'toolbar',
            items: [{
                text: lanControll.getLanValue('expandAll'),
                handler: function(){
                    tree.expandAll();
                }
            }, {
                text: lanControll.getLanValue('collapseAll'),
                handler: function(){
                    tree.collapseAll();
                }
            }]
        }]
    });
});

