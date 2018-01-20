Ext.define('app.view.license.LicCardPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	store:{},
	sysUuid:0,
	childId:'',
	initComponent: function(){
		
		var childId=this.childId;
//		var id = 'licAllPaidListTab';
		
		var localSysMode=Ext.get('sysMode').value;
		var localLicStatus=Ext.get('licStatus').value;
		
		//lanControll.getLanValue('tiRechargeList')
		var paidListTab=Ext.create('app.view.license.LicPaidListTab',{title:tiLicCardList,id:childId}); 
		paidListTab.addListener("afterlayout",function(){
			privilege.procPrivilege(paidListTab);
		},this,{single:true});
		//tiLicSysList
		var licSrvListTab=Ext.create('app.view.license.LicSrvListTab',{title:tiLicSysList,id:'licSrvListTab'});
		//tiLicDomainList
		var licDomainListTab=Ext.create('app.view.license.LicDomainListTab',{title:tiLicDomainList,id:'licDomainListTab'});

		var licPaidLogListTab=Ext.create('app.view.log.LicPaidLogGrid',{title:tiLicCardLogList,id:'licPaidLogListTab'});
		var licSrvLogListTab=Ext.create('app.view.log.LicSrvLogGrid',{title:tiLicSysLogList,id:'licSrvLogListTab'});
		var licDomainLogListTab=Ext.create('app.view.log.LicDomainLogGrid',{title:tiLicDomainLogList,id:'licDomainLogListTab'});
		var arr = [];
		if(localSysMode==11 && localLicStatus==10){
			var roleId = Ext.get("roleId").value;
			if(roleType.isSuperAdmin(roleId) || roleType.isSuperFinance(roleId)){
				arr.push(paidListTab);
			}
		}
		arr.push(licSrvListTab);
		arr.push(licDomainListTab);
		if(localSysMode==11 && localLicStatus==10){
			arr.push(licPaidLogListTab);
			arr.push(licSrvLogListTab);
			arr.push(licDomainLogListTab);
		}
		
//		var username=Ext.get('username').value;
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
		this.callParent(arguments);	
	}
});