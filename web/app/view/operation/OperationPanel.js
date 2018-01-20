Ext.define('app.view.operation.OperationPanel',{
	extend:'Ext.panel.Panel',
	layout:'auto',
	border:false,
	itemId:'rightPanel',
	id:'operationPanel',
	bodyStyle: {
		background: '#DFE9F6',
	},
//	collapsible:true,
	initComponent: function(){
		
//		var cloudPanel=Ext.create('app.view.operation.cloud.CloudPanel',{});

//		var fSystemPanel=Ext.create('app.view.operation.system.FSystemPanel',{});
//		var systemPanel=Ext.create('app.view.operation.system.SystemPanel',{});
//		var processPanel=Ext.create('app.view.operation.system.process.ProcessPanel',{});
		
		
//		var fdomainPanel=Ext.create('app.view.operation.domain.FDomainPanel',{});
//		var domainPanel=Ext.create('app.view.operation.domain.DomainPanel',{});
		
//		var fpolicyPanel=Ext.create('app.view.operation.domain.policy.FPolicyPanel',{});
//		var policyPanel=Ext.create('app.view.operation.domain.policy.PolicyPanel',{});
//		var rulePanel=Ext.create('app.view.operation.domain.policy.RulePanel',{});
		
//		var fgroupPanel=Ext.create('app.view.operation.domain.group.FGroupPanel',{});
//		var groupPanel=Ext.create('app.view.operation.domain.group.GroupPanel',{});
		
//		var froamzonePanel=Ext.create('app.view.operation.domain.roamzone.FRoamzonePanel',{});
//		var roamzonePanel=Ext.create('app.view.operation.domain.roamzone.RoamzonePanel',{});
//		var sitePanel=Ext.create('app.view.operation.domain.roamzone.site.SitePanel',{});
//		var bkPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.BkInfoPanel',{});
//		var bkpInfoPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.BkpInfoPanel',{});
//		var gwPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.GwInfoPanel',{});
//		var gwpInfoPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.GwpInfoPanel',{});
		
//		var fsuserPanel=Ext.create('app.view.operation.user.FSUserPanel',{});
//		var fuserPanel=Ext.create('app.view.operation.user.FUserPanel',{});
//		var superUserPanel=Ext.create('app.view.operation.user.SuperUserPanel',{});
//		var userPanel=Ext.create('app.view.operation.user.UserPanel',{});
		
		var simCloudPanel=Ext.create('app.view.operation.SimCloudPanel',{
			id:'simCloudPanel'
		});
//		simCloudPanel.addListener('itemcontextmenu', function(view, record, item, index, event, options){alert('abc');}, this); 
//		var nodePanel=Ext.create('app.view.operation.node.NodePanel',{});
//		var fNodePanel=Ext.create('app.view.operation.node.FNodePanel',{});
		            
        this.items=[simCloudPanel
                    ];
//        this.items=[simCloudPanel,cloudPanel,fSystemPanel,systemPanel,processPanel,
//                    fNodePanel,nodePanel,fdomainPanel,domainPanel,fpolicyPanel,policyPanel,rulePanel,fgroupPanel, 
//                    groupPanel,froamzonePanel,roamzonePanel,sitePanel,bkPanel,gwpInfoPanel,bkpInfoPanel,
//                    fsuserPanel,fuserPanel,superUserPanel,userPanel];

		
		this.callParent(arguments);	
	},
	
	listeners:{
		resize:function(win, width, height, eOpts){
			var treeFn = Ext.getCmp('treeFn');
			if(!treeFn){
				treeFn = Ext.create('app.util.TreeFn',{});
			}
			treeFn.resize('operationPanel');
	}
	}
	
	
});