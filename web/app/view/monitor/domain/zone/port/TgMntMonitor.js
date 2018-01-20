Ext.define('app.view.monitor.domain.zone.port.TgMntMonitor',{
	extend:'Ext.panel.Panel',
//	id:'tgMntMo',
	layout:'fit',
	hidden:true,
	border:false,
	treeName:'',
	getTreeName:function(){
		return this.treeName;
	},
	node:null,
	createItems:function(){
		if(!this.node){
			return;
		}
		var upper = this.node.toUpperCase();
		var arr = [];
		if(upper=="SIPPORT" || upper=="TGPORT" || upper=="SS7PORT"
			|| upper=="PRIPORT" || upper=="ETHPORT" || upper=="DSPPORT"
				|| upper=="LANPORT" || upper=="AGPORT"){
			var index = upper.indexOf("PORT");
			var tmp = upper.substring(0,index).toLowerCase();
			var str = tmp.charAt(0).toUpperCase()+tmp.substr(1);
			if(str=="Tg"){
//				str = str+"p";
				str = "E1";
			}else if(str=="Ag"){
				str = "Line";
			}
			if(tmp=='eth' && this.peType=='ag'){
				str = "Wan";
			}
			var obj = Ext.create("app.view.monitor.domain.zone.port.TgMntPanel",{
//				id:this.node+"_15",
				flag:this.node+"_15",
				title:lanControll.getLanValue("ti"+str+"15Min"),
				peType:this.peType,
				node:this.node
			});
			arr.push(obj);
			var obj = Ext.create("app.view.monitor.domain.zone.port.TgMntPanel",{
//				id:this.node+"_24",
				flag:this.node+"_24",
				title:lanControll.getLanValue("ti"+str+"24Hour"),
				peType:this.peType,
				node:this.node
			});
			arr.push(obj);
			var obj = Ext.create("app.view.monitor.domain.zone.port.TgMntPanel",{
//				id:this.node+"_cur",
				flag:this.node+"_cur",
				title:lanControll.getLanValue("ti"+str+"Cur"),
				peType:this.peType,
				node:this.node
			});
			arr.push(obj);
		}else{
			var index = 1;
			var tmp = upper.substr(index).toLowerCase();
			var str = tmp.charAt(0).toUpperCase()+tmp.substr(1);
			if(str=="Tgp"){
//				str = str+"p";
				str = "E1";
			}else if(str=="Agp"){
				str = "Line";
			}
			if(tmp=='eth' && this.peType=='ag'){
				str = "Wan";
			}
			var obj = Ext.create("app.view.monitor.domain.zone.port.TgMntPanel",{
//				id:this.node+"_cur",
				flag:this.node+"_cur",
				title:lanControll.getLanValue("ti"+str+"Cur"),
				peType:this.peType,
				node:this.node
			});
			arr.push(obj);
		}
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:arr,
  	   	   	listeners:{			
  				tabchange:function(tabPanel,newTab,oldTab,obj){
  					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
  				}
  			}	       
		}];
		this.items[0].initTabNum = this.items[0].items.length;
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
	},
	initComponent: function(){
		this.createItems();
		this.callParent(arguments);	
	}
});