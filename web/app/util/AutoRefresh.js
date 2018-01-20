Ext.define('app.util.AutoRefresh',{
	refreshButtons:[],
	getUlanByInterval:function(interval){
		var ulan = "";
		if(interval==null){
			ulan = "manual";
		}else{
			ulan = "miRefresh_"+interval;
		}
		return ulan;
	},
	createMenuItem:function(panel,store,text,iconCls,interval){
		var obj = this;
		var item = Ext.create('Ext.menu.Item',{
			text:text,
			iconCls:iconCls,
			ulan:obj.getUlanByInterval(interval),
			interval:interval,
			handler:function(){
				var cls = this.iconCls;
				if(interval==null){
					cls = "refresh2";
				}
				var split = this.up('splitbutton');
				split.interval = interval;
				split.setIconCls(cls);
				
				var loadMask;
				if(panel.down('gridview')){
					loadMask = panel.down('gridview').loadMask;
				 	if(!split.lMask){
				 		split.lMask = loadMask;
				 	}
				}
			 	if(interval==null){
			 		obj.stopTask(loadMask,store);
			 	}else{
			 		obj.createTask(split,this.interval);
			 	}

				
				
			 	
			 	
		 	}
		});
		return item;
	},
	createRefreshMenu:function(panel,store,flag){
		var arr = [];
		if(!flag){
//			var tmp = this.createMenuItem(panel,store,"1 Second",this.getIconCls(1000),1000);
//			arr.push(tmp);
			var tmp = this.createMenuItem(panel,store,"3 Seconds",this.getIconCls(3000),3000);
			arr.push(tmp);
			var tmp = this.createMenuItem(panel,store,"5 Seconds",this.getIconCls(5000),5000);
			arr.push(tmp);
			var tmp = this.createMenuItem(panel,store,"10 Seconds",this.getIconCls(10000),10000);
			arr.push(tmp);
			var tmp = this.createMenuItem(panel,store,"Manual",this.getIconCls(null),null);
			arr.push(tmp);
		}else if(flag=="monitor"){
			var tmp = this.createMenuItem(panel,store,"15 Minutes",this.getIconCls(15*60*1000),15*60*1000);
			arr.push(tmp);
			var tmp = this.createMenuItem(panel,store,"Manual",this.getIconCls(null),null);
			arr.push(tmp);
		}
		var menu = Ext.create('Ext.menu.Menu', {
		    items: arr
		});
		return menu;
	},
	beforeManualRefresh:function(store){
//		this.stopTask(store);
//		store.manualRefresh = true;
//		if(store.task){
//			Ext.TaskManager.stop(store.task);
//			store.task = null;
//		}
	},
	createRefreshButton:function(panel,mStore,aStore,flag){
		var obj = this;
//		alert(panel.down('gridview').loadMask)
		mStore.on('beforeload',function(){
			if(panel.down('gridview')){
				var loadMask = panel.down('gridview').loadMask;
				if(loadMask && loadMask.setDisabled){
					loadMask.maskOnDisable = false;
					loadMask.setDisabled(false);
				}
			}
			
		});
		mStore.on('load',function(){
			if(panel.down('gridview')){
				var loadMask = panel.down('gridview').loadMask;
				if(loadMask && loadMask.setDisabled){
					loadMask.maskOnDisable = false;
					loadMask.setDisabled(true);
				}
			}
			
		});
		var button = Ext.create("Ext.button.Split",{
      		 xtype:'splitbutton',
       		 text:'Refresh',
       		 ulan:'btRefresh',
//       		 loadMask:panel.down('gridview').loadMask,
       		 store:mStore,
       		 aStore:aStore,
       		 itemId:'autoRefresh',
       		 iconCls: 'refresh2',
       		 interval:null,
      		 handler: function() {
				if(aStore.task){
					return;
//					Ext.TaskManager.destroy();
//					store.task = null;
				}else{
					mStore.load();
				}
         	 },
         	 menu:this.createRefreshMenu(panel,aStore,flag),
       	 });
		this.refreshButtons.push(button);
		return button;
	},
	getIconCls:function(interval){
		var icon = null;
		if(interval == null){
			icon = 'refresh-stop';
		}else if(interval == 1000){
			icon = 'refresh-1s';
		}else if(interval == 3000){
			icon = 'refresh-3s';
		}else if(interval == 5000){
			icon = 'refresh-5s';
		}else if(interval == 10000){
			icon = 'refresh-10s';
		}else if(interval == 15*60*1000){
			icon = 'refresh-15m';
		}
		return icon;
	},
	isAuto:function(button){
		if(button.interval){
			return true;
		}
		return false;
	},
	createTask:function(split,interval){
//		store.manualRefresh = false;
		var loadMask = split.lMask;
		var aStore = split.aStore;
		var mStore = split.store;
		this.stopTask(loadMask,aStore);
		var grid = split.up('grid');
		var autoRefreshBl = function(){
			split.setIconCls('synchro');
			if(grid && grid.getSelectionModel().hasSelection()){
				grid.sel = null;
				grid.sel = new Array();
				var records = grid.getSelectionModel().getSelection();				
				for(var i=0;i<records.length;i++){
					var index = mStore.indexOf(records[i]);
					grid.sel.push(index);
				}
			}
		}
		var icon = this.getIconCls(split.interval);
		var autoRefreshCb=function(){
			split.setIconCls(icon);
			var cnt=0;
			var task = {
				run:function(){
					if(cnt==1){
						aStore.load();
						Ext.TaskManager.stop(task);
						aStore.task = null;																											
					}
					cnt++;
				},
				interval:interval
			};
			aStore.task = task;
			aStore.interval = interval;
			Ext.TaskManager.start(task);
			mStore.removeAll();
			mStore.add(aStore.getRange());
			if(grid && grid.sel){				
				for(var i=0;i<grid.sel.length;i++){
					grid.getSelectionModel().select(grid.sel[i],true);
				}
			}
		};
		aStore.autoRefreshBl = autoRefreshBl;
		aStore.autoRefreshCb = autoRefreshCb;
		aStore.on('beforeload',autoRefreshBl);
		aStore.on('load',autoRefreshCb);
		if(loadMask){
			loadMask.maskOnDisable = false;
			loadMask.setDisabled(true);
		}
		aStore.load();		
	},
	createBaseTask:function(store,interval){
//		store.manualRefresh = false;
//		var loadMask = split.lMask;
//		var store = split.store;
		this.stopTask(null,store);
//		var autoRefreshBl = function(){
//			split.setIconCls('synchro');
//		}
//		var icon = this.getIconCls(split.interval);
		var autoRefreshCb=function(){
//			split.setIconCls(icon);
			var cnt=0;
			var task = {
				run:function(){
					if(cnt==1){
						store.load();
						Ext.TaskManager.stop(task);
						store.task = null;																											
					}
					cnt++;
				},
				interval:interval
			};
			store.task = task;
			store.interval = interval;
			Ext.TaskManager.start(task);
		};
//		store.autoRefreshBl = autoRefreshBl;
		store.autoRefreshCb = autoRefreshCb;
//		store.on('beforeload',autoRefreshBl);
		store.on('load',autoRefreshCb);
//	 	loadMask.maskOnDisable = false;
//	 	loadMask.setDisabled(true);
		store.load();		
	},
	stopTask:function(loadMask,store){
		if(loadMask){
			loadMask.setDisabled(false);
		}
		if(store.autoRefreshBl){
			store.removeListener('beforeload',store.autoRefreshBl);
			store.autoRefreshBl = null;
		}
		if(store.autoRefreshCb){
			store.removeListener('load',store.autoRefreshCb);
			store.autoRefreshCb = null;
		}
		if(store.task){
			Ext.TaskManager.stop(store.task);
			store.task = null;
		}
		if(store.interval){
			store.interval = null;
		}
	},
	stopAll:function(){
		var refreshButtons = this.refreshButtons;
		for(var i=0; i<refreshButtons.length; i++){
			if(refreshButtons[i]){
				refreshButtons[i].interval = null;
				refreshButtons[i].setIconCls("refresh2");
				this.stopTask(refreshButtons[i].lMask,refreshButtons[i].aStore);
			}
		}
	},
	stopOther:function(curButton){
		var refreshButtons = this.refreshButtons;
		for(var i=0; i<refreshButtons.length; i++){
			if(refreshButtons[i] && curButton && curButton!=refreshButtons[i]){
				refreshButtons[i].interval = null;
				refreshButtons[i].setIconCls("refresh2");
				this.stopTask(refreshButtons[i].lMask,refreshButtons[i].aStore);
			}
		}
	}
});
