Ext.define('app.view.license.LicCloudPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	store:{},
	sysUuid:0,
	childId:'',
	initComponent: function(){
		
		var childId=this.childId;
		var licSrvListTab=Ext.create('app.view.license.LicSrvListTab',{title:tiLicSysList,id:'licSrvInCloudListTab'});
		var licDomainListTab=Ext.create('app.view.license.LicDomainListTab',{title:tiLicDomainList,id:'licDomainInCloudListTab'});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[licSrvListTab,licDomainListTab],
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