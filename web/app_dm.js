Ext.Loader.setConfig({enabled:true,scriptCharset:'utf-8',disableCaching:true,dcVersion:13.34});
Ext.Loader.setPath('Ext.ux.desktop', 'app');
Ext.Loader.setPath('Ext.ux.grid', 'extjs/examples/ux/grid');

var lanControll = Ext.create('app.lan.LanControll');

Ext.require('Ext.container.Viewport');
Ext.require('Ext.window.MessageBox');
Ext.require('app.store.DesktopModel');
Ext.require("app.controller.DmAppC");
//Ext.define('dmsApp', {
//
//	extend : 'Ext.ux.desktop.App',
//	init : function() {
//		var a=this.callParent();
//	},
//
//	getDesktopConfig : function() {},
//	
//	getModules : function() {},
//
//	// config for the start menu
//	getStartConfig : function() {},
//	map_init2:function(){
//		alert('tes');
//	},
//	getTaskbarConfig : function() {},
//	
//	onLogout : function() {
//		Ext.Msg.confirm(boxWarnning, lanControll.getLanValue('boxLogout'), function(
//				btn, text) {
//			if (btn == 'yes') {
//				window.location = 'login.html';
//				logout(false);
//			}
//		});
//	},
//
//	onSettings : function() {
//		var dlg = new app.view.Settings( {
//			desktop : this.desktop
//		});
//		dlg.show();
//	}
//
//});

Ext.application( {
	name : 'dm',
	appFolder : 'app',
	 controllers: [
	               'app.controller.DmAppC',
	            ],
	launch : function() {
		console.log("abcdefg");
		var p=Ext.create("app.view.device.domain.DomainPanel");
		var con=Ext.create("Ext.container.Container",{
			renderTo:'dev_list',
			border:false,
//			width:900,
			layout:'auto',
//			height:680,
			autoScroll:true,
			items:p
		});
//		p.renderTo("main_body");
//		var viewWidth=Ext.dom.AbstractElement.getViewportWidth();
//		var viewHeight=Ext.dom.AbstractElement.getViewportHeight();
//		var x2=Ext.dom.AbstractElement.getViewportWidth()*20/100+10;
//		var x3=(viewWidth)*60/100+x2;
//		var y1=80;
//		var y2=(viewHeight-y1)*50/100-30+y1;
//		console.log(x2+"----"+x3+"------"+y2);
//		Ext.create('Ext.container.Viewport', {
//		    title: 'Absolute Layout',
//		    layout: {
//		        type: 'absolute'
//		    },
//		    items: [{
//		        x: 0,
//		        y: 0,
//		        height:70,
//		        anchor:'100%',
////		        html:'abcd',
//		        html:   '<div id="J_Headerwrap" class="header-wrap" data-spm="2">'
//		            +'<div class="header-inner y-row">'
//		            +'<div class="y-span10">'
//		                +'<nav id="J_Nav">'
//		                    +'<ul id="J_Menu">'
//		                        
//		                            +'<li class="sub-menu1 selected" data-spm-click="gostr=/aliyun;locaid=d20141" data-case="one" data-menu="sub_menu_1">'
//		                                +'<h2>Device</h2>'
//		                            +'</li>'
//		                        
//		                            +'<li class="sub-menu2" data-spm-click="gostr=/aliyun;locaid=d20145" data-case="one" data-menu="sub_menu_2">'
//		                                +'<h2>Performance</h2>'
//		                            +'</li>'
//		                        
//		                    +'</ul>'
//		                +'</nav>'
//		            +'</div>'
//		            +'<div class="divSearch">'
//	                +'<input type="text" id="J_searchKey" placeholder="Search">'
//		            +'</div>'
//		        +'</div>'
//		    +'</div>',
//		    },{
//		        x: 0,
//		        y: 80,
////		        height:70,
//		        anchor:'20% 100%',
//		        html:'<div id="ur_here"></div><div class="category_tree_root"></div>',
//		    },{
//		        x: Math.floor(x2),
//		        y: 80,
////		        height:70,
//		        anchor:'80% 100%',
//		        html:'3333',
//		    },{
//		        x: Math.floor(x3),
//		        y: 80,
////		        height:70,
//		        anchor:'100% 50%',
//		        html:'4444',
//		    },{
//		        x: Math.floor(x3),
//		        y: Math.floor(y2),
////		        height:70,
//		        anchor:'100% 100%',
//		        html:'5555',
//		    }],
//		});
//		load();
	}

});