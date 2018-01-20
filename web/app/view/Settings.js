/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */


Ext.define('app.view.Settings', {
    extend: 'Ext.window.Window',

    uses: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.field.Checkbox',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Border',
        'Ext.ux.desktop.Wallpaper',
		'app.store.WallpaperModel'        
    ],

    layout: 'anchor',
    title: lanControll.getLanValue('tiChangeSetting'),
    modal: true,
    width: 640,
    height: 480,
    border: false,

    initComponent: function () {
        var me = this;
		
        me.selected = me.desktop.getWallpaper();
        me.stretch = me.desktop.wallpaper.stretch;

        me.preview = Ext.create('widget.wallpaper');
        me.preview.setWallpaper(me.selected);
        me.tree = me.createTree();
//        me.tree2=me.createTree2();
        
        me.stretchBox=Ext.create('widget.checkbox',{
                xtype: 'checkbox',
                name:'stretchBox',
                boxLabel: lanControll.getLanValue('stretchToFit'),
                checked: me.stretch,
                listeners: {
                    change: function (comp) {
                        me.stretch = comp.checked;
                    }
                }
        });
//        me.tipView=Ext.create('widget.displayfield',{
//                xtype: 'displayfield',
//                name:'tipView',
//                hidden:true,
//                value:'<font color=red>tips:you need relogin,apply this view</font>'
//        });
        
        
//        var sm = Ext.create('Ext.selection.CheckboxModel',{hidden:true});
        me.viewSetting=Ext.widget('grid', {
			border : false,
			hideHeaders:true,
			layout:'fit',
			width:100,
			height:100,
//			selModel: sm,
			columns:[
			   {text: 'id', dataIndex: 'id',hidden:true},
			   {text: 'view0', dataIndex: 'view0',flex:1,align:'center'},
			],
//			listeners: {
//        		select:function(RowModel,record,index,eOpts ){
//        			ip.insertDB('apv',0,'view',record.get('id'));
//        		}
//        	},
			store : Ext.create('Ext.data.Store', {
				fields:['view0','id'],
				data : [
				     { 'id':'2','view0': '<img src='+Ext.get('resources').value+'/images/advance.png'+' />' },
			         { 'id':'1','view0': '<img src='+Ext.get('resources').value+'/images/base.png'+' />' },
				]
			}),
		});
        
        var panel=Ext.create('Ext.panel.Panel',{
            autoScroll: true,
            width: 150,
            region: 'west',
            split: true,
            minWidth: 100,
            layout:'fit',
        	items:[{
        		xtype:'panel',
//        		region:'north',
        		layout:'fit',
        		border:false,
        		items:[me.tree]
//        	},{
//        		xtype:'panel',
//        		region:'center',
//        		layout:'fit',
//        		border:false,
//        		items:[me.tree2]
        	}
        	]
        });
        
        me.buttons = [
            { text: lanControll.getLanValue('btOk'),ulan:'btOk', handler: me.onOK, scope: me },
            { text: lanControll.getLanValue('btCancel'),ulan:'btCancel', handler: me.close, scope: me }
        ];

        me.items = [
            {
                anchor: '0 -30',
                border: false,
                layout: 'border',
                items: [
                    panel,
                    {
                        xtype: 'panel',
                        title: lanControll.getLanValue('preview'),
                        region: 'center',
                        layout: 'fit',
                        items: [ me.preview,me.viewSetting]
                    }
                ]
            },me.stretchBox,me.tipView
        ];

        me.callParent();
    },

    createTree : function() {
        var me = this;
        var index = 1;
        function child (img) {
//            return { img: img, text: me.getTextOfWallpaper(img), iconCls: '', leaf: true };
        	return { img: img, text: lanControll.getLanValue('desktopColor_'+index++), iconCls: '', leaf: true };
        }

        var tree = new Ext.tree.Panel({
            title: lanControll.getLanValue('desktopBack'),
            rootVisible: false,
            lines: false,
            autoScroll: true,
            width: 150,
            region: 'west',
            split: true,
            minWidth: 100,
            listeners: {
	        	afterrender: { fn: this.setInitialSelection, delay: 100 },
	            select: this.onSelect,
                scope: this
            },
            store: Ext.create( 'Ext.data.TreeStore',{
                model: 'app.store.WallpaperModel',
                root: {
                    text:'Wallpaper',
                    expanded: true,
                    children:[
                        { text: lanControll.getLanValue('desktopColor_'+0), iconCls: '', leaf: true },
                        child('Blue-Sencha.jpg'),
                        child('Dark-Sencha.jpg'),
                        child('Wood-Sencha.jpg'),
                        child('blue.jpg'),
                        child('desk.jpg'),
                        child('desktop.jpg'),
                        child('desktop2.jpg'),
                        child('sky.jpg'),
                    ]
                }
            } )
        });

        return tree;
    },
    
    createTree2 : function() {
        var me = this;

        var tree = new Ext.tree.Panel({
            title: lanControll.getLanValue('desktopView'),
            rootVisible: false,
            lines: false,
            autoScroll: true,
            width: 150,
            region: 'west',
            split: true,
            minWidth: 100,
            listeners: {
        		itemclick:function(view,record,item,index,e){
        			me.preview.setVisible(false);
        			me.stretchBox.hide();
        			me.viewSetting.setVisible(true);
//        			me.viewSetting.columns[0].setVisible(false);
        			if(me.tipView)
        			me.tipView.show();
        			
        		}
            },
            store: Ext.create( 'Ext.data.TreeStore',{
                model: 'app.store.WallpaperModel',
                root: {
                    text:'Wallpaper',
                    expanded: true,
                    children:[
                        { text: lanControll.getLanValue('viewSetting'), iconCls: '', leaf: true },
                    ]
                }
            } )
        });

        return tree;
    },

    getTextOfWallpaper: function (path) {
        var text = path, slash = path.lastIndexOf('/');
        if (slash >= 0) {
            text = text.substring(slash+1);
        }
        var dot = text.lastIndexOf('.');
        text = Ext.String.capitalize(text.substring(0, dot));
        text = text.replace(/[-]/g, ' ');
        return text;
    },

    onOK: function () {
        var me = this;
        if (me.selected) {
            me.desktop.setWallpaper(me.selected, me.stretch);
        }
//        var records=me.viewSetting.getSelectionModel().getSelection();
//        if(records!=undefined && records.length==1){
//        	ip.insertDB('apv',0,'view',records[0].get('id'));
//        }
        me.destroy();
        window.location.reload();
    },

    onSelect: function (tree, record) {
        var me = this;

        me.viewSetting.setVisible(false);
        if(me.tipView)
        me.tipView.hide();
        me.preview.setVisible(true);
		me.stretchBox.show();
		
        if (record.data.img) {
            me.selected = 'resources/wallpapers/' + record.data.img;
        } else {
            me.selected = Ext.BLANK_IMAGE_URL;
        }
        ip.insertDB('dtb',0,'view',me.selected);
        me.preview.setWallpaper(me.selected);
    },
    onChange: function (tree, record) {
    	var me = this;
    	me.viewSetting.setVisible(false);
    	if(me.tipView)
        me.tipView.hide();
        me.preview.setVisible(true);
		me.stretchBox.show();
		
    	me.preview.setWallpaper(me.selected);
    },

    setInitialSelection: function () {
        var s = this.desktop.getWallpaper();
        if (s) {
            var path = '/Wallpaper/' + this.getTextOfWallpaper(s);
            this.tree.selectPath(path, 'text');
        }
    }
});

