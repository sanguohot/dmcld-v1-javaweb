Ext.define('app.view.license.FLicDomainPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	store:{},
	childId:'',
	initComponent: function(){
		var childId=this.childId;
		var licDomainListTab=Ext.create('app.view.license.LicDomainListTab',{title:tiLicDomainList,id:childId});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[licDomainListTab],
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