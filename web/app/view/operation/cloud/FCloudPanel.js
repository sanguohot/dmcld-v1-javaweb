Ext.define('app.view.operation.cloud.FCloudPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	treeName:0,
	initComponent: function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;

		var id = 'cloudInFCloudPanel';
		if(maintenance){
			id = 'maintenanceCloudInFCloudPanel';
		}
		var cloudListPanel=Ext.create('app.view.operation.cloud.CloudListPanel',{
			title:lanControll.getLanValue('tiCloudList'),
			border:false,
			id:id,
		});
		cloudListPanel.addListener("afterlayout",function(){
			privilege.procPrivilege(cloudListPanel);
		},this,{single:true});
		
		var id = 'sysInFCloudPanel';
		if(maintenance){
			id = 'maintenanceSysInFCloudPanel';
		}
		var sysListPanel=Ext.create('app.view.operation.cloud.SysListPanel',{
			title:tiSysList,
			border:false,
			id:id,
			sysMode:2,
		});
		sysListPanel.addListener("afterlayout",function(){
			privilege.procPrivilege(sysListPanel);
		},this,{single:true});
		
		var id = 'localSysInFCloudPanel';
		if(maintenance){
			id = 'maintenanceLocalSysInFCloudPanel';
		}
		var localSysListPanel=Ext.create('app.view.operation.cloud.SysListPanel',{
			title:lanControll.getLanValue('tiLocalSysList'),
			border:false,
			id:id,
			sysMode:1
		});
		localSysListPanel.addListener("afterlayout",function(){
			privilege.procPrivilege(localSysListPanel);
		},this,{single:true});
		
		
		
		var id = 'domainInFCloudPanel';
		if(maintenance){
			id = 'maintenanceDomainInFCloudPanel';
		}
		var domainListPanel=Ext.create('app.view.operation.domain.DomainListPanel',{
			title:tiDomainList,
			border:false,
			id:id,
		});
		domainListPanel.addListener("afterlayout",function(){
			privilege.procPrivilege(domainListPanel);
		},this,{single:true});
		
		var id = 'nesInFCloudTab';
		if(maintenance){
			id = 'maintenanceNesInFCloudTab';
		}
		var nesListPanel=Ext.create('app.view.operation.NesInCloudTab',{
			title:tiDeviceList,
			border:false,
			id:id
		});
		nesListPanel.addListener("afterlayout",function(){
			privilege.procPrivilege(nesListPanel);
		},this,{single:true});
		
		var id = 'neNasInFCloudTab';
		if(maintenance){
			id = 'maintenanceNeNasInFCloudTab';
		}
		var neNasListPanel=Ext.create('app.view.operation.NeNasInCloudTab',{
			title:lanControll.getLanValue('tiUnknownDeviceList'),
			border:false,
			id:id
		});
		neNasListPanel.addListener("afterlayout",function(){
			privilege.procPrivilege(neNasListPanel);
		},this,{single:true});
//		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
//		var sysListStore= Ext.create('app.store.operation.system.SysListStore');		
//		sysListStore.proxy.url="sysListManager!getTblSysWithDeviceNumInCloud.action";
//		sysListStore.getProxy().setReader({
//            type: 'json',
//            root: 'sysList2'
//        });
//		var sm = Ext.create('Ext.selection.CheckboxModel');
//		var fSystemTab=Ext.create('Ext.grid.Panel',{
//			title:'Server List',
//			itemId:'grid',
//			treeName:'',
//			parentNodeTid:'',
//			border:false,
//			layout:'fit',
//			autoScroll:true,
//			columnLines:true,
//			store: sysListStore, 
//			selModel: sm,					
//			columns: [
//					{header: 'Uuid',dataIndex: 'uuid',hidden:true},
//					{header: 'Name',dataIndex: 'name',flex:1,},
//					{header: 'Alias',dataIndex: 'alias',flex:1,hidden:true},
//					{header: 'Admin Status', dataIndex: 'adminStatus',flex:1,hidden:true,
//						renderer:function(val){  
//							return rs.adminStatus(val);
//						 }
//					},
//					{header: 'Opr Status',hidden:true, dataIndex: 'oprStatus',flex:1,
//						renderer:function(val){  
//							return rs.oprStatus(val);
//						} 
//					},
//					{header: 'Run Status', dataIndex: 'runStatus',width:120,
//						renderer:function(val){  
//							return rs.runStatus(val);
//						} 
//					},
//					{header: 'IP Address',dataIndex: 'sysIpAddr',flex:1,hidden:true},
//					{header: 'Load Value',dataIndex: 'loadVal',width:120},
//					{header: 'Version',dataIndex: 'softwareVersion',flex:1,},
//					{header: 'Build Time',dataIndex: 'softwareBuildTime',flex:1,xtype: 'datecolumn',format:'m-d H:i:s',},
//					{header: 'RunTime',dataIndex: 'lifeSecond',width:150,
//			     		renderer:function(val){
//			     			return rs.tranSecondMin(val);
//			     		}
//			     	},
//					{header: 'Last Register',dataIndex: 'lastRegTime',flex:1,hidden:true,xtype: 'datecolumn',format:'m-d H:i:s',},
//					{header: 'Last Heartbeat',dataIndex: 'lastHbTime',flex:1,hidden:true,xtype: 'datecolumn',format:'m-d H:i:s',},
//					{header: 'Description',dataIndex: 'detailDesc',flex:1,},
//			],
//			listeners:{
//				itemdblclick: function(grid, row, columnindex,e){
//        			var ot=Ext.getCmp('operationTree');
//        			if(maintenance){
//        				ot = Ext.getCmp('maintenanceTree');
//        			}
//        			var uuid=row.get('uuid');
//        			var rootNode=ot.getRootNode();
//        			var node=rootNode.findChild('nid','system_'+uuid,true);
//        			
//        			ot.fireEvent('itemclick',null,node);
//				}						
//			},
//			dockedItems:[{
//			     dock: 'bottom',
//				 xtype: 'pagingtoolbar',
//			     store: sysListStore,
//			     pageSize: 25,
//			     displayInfo: true,
//			}	 	
//			],
//		    maintenance:maintenance,
//	    	createTbar:function(){
//	    		var tbar = [];
//	    			    		
//	    		var refresh = Ext.create('Ext.button.Button',{
//		      		 xtype:'button',
//		       		 text:'Refresh',
//		       		 iconCls:'refresh2',
//		       		 listeners:{
//		       		 	click:function(){
//		        			var store=this.up('panel').store;
//		        			store.load();
//		       	 		}
//		       	 	}
//		   	 	});
//	    		tbar.push(refresh);
//	    		var dockedItems = {
//	    				xtype:'toolbar',
//	    				dock: 'top',
//	    				items:tbar
//	    		};
//	    		this.addDocked(dockedItems);
//	    	},
//			listeners:{
//				afterlayout:{
//	    			fn:function(){
//	    				this.createTbar();
//	    			},
//	    			single:true
//	    		}
//	    	}
//		});
		
		
		
		
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[cloudListPanel,sysListPanel,localSysListPanel,domainListPanel,nesListPanel,neNasListPanel],
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
		this.callParent(arguments);	
	}
});