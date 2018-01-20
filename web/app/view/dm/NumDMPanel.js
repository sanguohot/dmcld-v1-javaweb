Ext.define('app.view.dm.NumDMPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:false,
	border:false,
	treeId:'',
	store:null,
	initComponent: function(){
		var me=this;
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var id = 'dmnumGrid';
		if(maintenance){
			id = 'maintenanceDMNumGrid';
		}
		var dmNumGrid=Ext.create('app.view.dm.NumDMGrid',{
			id:id,
			title:lanControll.getLanValue('dNumDM'),
		});
		dmNumGrid.addListener("afterlayout",function(){
			privilege.procPrivilege(dmNumGrid);
		},this,{single:true});
		
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[dmNumGrid],
	   	    listeners:{		
				tabchange:function(tabPanel,newTab,oldTab,obj){
					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
				}
			}
		}];
		this.callParent(arguments);	
	}
});