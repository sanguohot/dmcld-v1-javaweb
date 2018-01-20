/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

/**
 * @class Ext.ux.desktop.TaskBar
 * @extends Ext.toolbar.Toolbar
 */
Ext.define('Ext.ux.desktop.TaskBar', {
    extend: 'Ext.toolbar.Toolbar', // TODO - make this a basic hbox panel...

    requires: [
        'Ext.button.Button',
        'Ext.resizer.Splitter',
        'Ext.menu.Menu',

        'Ext.ux.desktop.StartMenu'
    ],

    alias: 'widget.taskbar',

    cls: 'ux-taskbar',

    /**
     * @cfg {String} startBtnText
     * The text for the Start Button.
     */
    startBtnText: 'Start',

    initComponent: function () {
        var me = this;

        me.startMenu = new Ext.ux.desktop.StartMenu(me.startConfig);

        me.quickStart = new Ext.toolbar.Toolbar(me.getQuickStart());

        me.windowBar = new Ext.toolbar.Toolbar(me.getWindowBarConfig());

        me.tray = new Ext.toolbar.Toolbar(me.getTrayConfig());
        
        me.viewBtn=new Ext.toolbar.Toolbar(me.getViewBtn());

//        var view=ip.readDB('apv',0,'view');
        
        
//        if(view==2){
//        	var alarmPanel=Ext.create("app.view.common.AlarmPanel",{
//    			createDesc:'current',
//    			nodeDesc:'domain',
//    			id:'currentAlarmPanel',
//    			
//    		});
//        	lanControll.setLan(alarmPanel);
//            var logPanel=Ext.create("app.view.common.RunLogView");
//            lanControll.setLan(logPanel);
//	          me.items=[{
//	        	xtype:'panel',
//	        	layout:'border',
//	        	height:115,
//	        	width:'100%',
//	        	border:false,
//	        	items:[{
//			    	    	xtype:'panel',
//			    	    	region: 'center',
//			    	    	width:'60%',
//			    	    	border:true,
//			    	    	collapsible:false,
//			    	    	layout:'fit',
//			    	    	items:[alarmPanel]
//		        	   },{
//		        	    	xtype:'panel',
//			    	    	width:'40%',
//		        	    	region:'east',
//		        	    	border:true,
//		        	    	collapsible: false,
//		        	    	split: true,
//		        	    	layout:'fit',
//		        	    	items:[logPanel]
//	        	    }
//	        	],
//	        	dockedItems : [{
//					 xtype: 'toolbar',
//				     dock: 'bottom',
//				     items:[{
//						  xtype: 'button',
//						  cls: 'ux-start-button',
//						  ulan:'btStartBtnText',
//						  menu: me.startMenu,
//						  menuAlign: 'bl-tl',
//						  text: me.startBtnText,
//						},
//						me.quickStart,'-',
//						me.windowBar,
//						'-',
////						me.viewBtn,
//						me.tray
//					 ]
//				}]
//	        }];
//        }else{
        	var ctbStore=Ext.create("app.store.util.ComboxStore",{});
	        me.items = [{
	                xtype: 'button',
	                cls: 'ux-start-button',
	//                iconCls: 'ux-start-button-icon',
	                menu: me.startMenu,
	                menuAlign: 'bl-tl',
	                ulan:'btStartBtnText',
	                text: me.startBtnText,
	                width:me.startWidth,
	            },
	            me.quickStart,
	            {
	                xtype: 'splitter', html: '&#160;',
//	                height: 14, width: 2, // TODO - there should be a CSS way here
	                cls: 'x-toolbar-separator x-toolbar-separator-horizontal'
	            },
	            //'-',
	            me.windowBar,
	            {
	            	xtype:'combo',
	            	id:'comboTaskBar',
	            	flex:1,
	    			mode : 'local',
	    			displayField : 'name',
	    			valueField : 'value',
	    			queryMode : 'local',
	    			editable:false,
	    			store :ctbStore
	            },
	            '-',
//	            me.viewBtn,
	            me.tray
	        ];
			var comboxStore=Ext.create("app.store.util.ComboxStore",{});
			comboxStore.on('load',function(){
				ctbStore.removeAll();
				console.log(comboxStore.getCount());
				for(var i=0; i<comboxStore.getCount(); i++){
					if(comboxStore.getAt(i).get('type')=='desktopview'){
						ctbStore.add(comboxStore.getAt(i));
					}
				}
			});
			var params1 = {domainUuid:Ext.get('domainUuid').value,types:'desktopview'};
			Ext.apply(comboxStore.proxy.extraParams, params1);
//			comboxStore.load();
			
			autoRefresh.createBaseTask(comboxStore,180000);
//        }

        

        me.callParent();
    },

    afterLayout: function () {
        var me = this;
        me.callParent();
        me.windowBar.el.on('contextmenu', me.onButtonContextMenu, me);
    },

    /**
     * This method returns the configuration object for the Quick Start toolbar. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getQuickStart: function () {
        var me = this, ret = {
//            minWidth: 20,
            width: 0,
            items: [],
            enableOverflow: true
        };

        Ext.each(this.quickStart, function (item) {
            ret.items.push({
                tooltip: { text: item.name, align: 'bl-tl' },
                //tooltip: item.name,
                overflowText: item.name,
                iconCls: item.iconCls,
                module: item.module,
                handler: me.onQuickStartClick,
                scope: me
            });
        });

        return ret;
    },
    
    getViewBtn: function () {
        var ret = {
            items: this.viewBtn,
        };
        delete this.viewBtn;
        return ret;
    },

    /**
     * This method returns the configuration object for the Tray toolbar. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getTrayConfig: function () {
        var ret = {
            width: 300,
            items: this.trayItems
        };
        delete this.trayItems;
        return ret;
    },

    getWindowBarConfig: function () {
        return {
        	width:0,
//            flex: 1,
            cls: 'ux-desktop-windowbar',
            items: [ '&#160;' ],
            layout: { overflowHandler: 'Scroller' }
        };
    },

    getWindowBtnFromEl: function (el) {
        var c = this.windowBar.getChildByElement(el);
        return c || null;
    },

    onQuickStartClick: function (btn) {
        var module = this.app.getModule(btn.module),
            window;

        if (module) {
            window = module.createWindow();
            window.show();
        }
    },
    
    onButtonContextMenu: function (e) {
        var me = this, t = e.getTarget(), btn = me.getWindowBtnFromEl(t);
        if (btn) {
            e.stopEvent();
            me.windowMenu.theWin = btn.win;
            me.windowMenu.showBy(t);
        }
    },

    onWindowBtnClick: function (btn) {
        var win = btn.win;

        if (win.minimized || win.hidden) {
            win.show();
        } else if (win.active) {
            win.minimize();
        } else {
            win.toFront();
        }
    },

    addTaskButton: function(win) {
        var config = {
            iconCls: win.iconCls,
            enableToggle: true,
            toggleGroup: 'all',
            width: 140,
            margins: '0 2 0 3',
            text: Ext.util.Format.ellipsis(win.title, 20),
            listeners: {
                click: this.onWindowBtnClick,
                scope: this
            },
            win: win
        };

        var cmp = this.windowBar.add(config);
        cmp.toggle(true);
        return cmp;
    },

    removeTaskButton: function (btn) {
        var found, me = this;
        me.windowBar.items.each(function (item) {
            if (item === btn) {
                found = item;
            }
            return !found;
        });
        if (found) {
            me.windowBar.remove(found);
        }
        return found;
    },

    setActiveButton: function(btn) {
        if (btn) {
            btn.toggle(true);
        } else {
            this.windowBar.items.each(function (item) {
                if (item.isButton) {
                    item.toggle(false);
                }
            });
        }
    }
});

/**
 * @class Ext.ux.desktop.TrayClock
 * @extends Ext.toolbar.TextItem
 * This class displays a clock on the toolbar.
 */
Ext.define('Ext.ux.desktop.TrayClock', {
    extend: 'Ext.toolbar.TextItem',

    alias: 'widget.trayclock',

    cls: 'ux-desktop-trayclock',

    html: '&#160;',

    timeFormat: 'g:i A',

    tpl: '{time}',

    initComponent: function () {
        var me = this;

        me.callParent();

        if (typeof(me.tpl) == 'string') {
            me.tpl = new Ext.XTemplate(me.tpl);
        }
    },

    afterRender: function () {
        var me = this;
        Ext.Function.defer(me.updateTime, 100, me);
        me.callParent();
    },

    onDestroy: function () {
        var me = this;

        if (me.timer) {
            window.clearTimeout(me.timer);
            me.timer = null;
        }

        me.callParent();
    },

    updateTime: function () {
        var me = this, time = Ext.Date.format(new Date(), me.timeFormat),
            text = me.tpl.apply({ time: time });
        if (me.lastText != text) {
            me.setText(text);
            me.lastText = text;
        }
        me.timer = Ext.Function.defer(me.updateTime, 10000, me);
    }
});
