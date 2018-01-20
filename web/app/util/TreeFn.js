Ext.define('app.util.TreeFn',{
	id:'treeFn',
	record:null, // tree select node record
	openLink:'', // record module open-source
	FCLOUD:function(operationPanel,name,parentNode,size
			,containerId,cloudTabId,sysTabId,localSysTabId,domainTabId,neTabId,neNaTabId){
		var fCloudPanel = Ext.getCmp(containerId);
		if(fCloudPanel==undefined || fCloudPanel==null){
			fCloudPanel=Ext.create('app.view.operation.cloud.FCloudPanel',{
				id:containerId,
			});
			operationPanel.add(fCloudPanel);
			operationPanel.doLayout();
		}
		fCloudPanel.setVisible(true);
		fCloudPanel.treeName=name;
		
		var fSysemTabGrid=Ext.getCmp(sysTabId).down('panel[itemId=grid]');
		fSysemTabGrid.up('panel').up('panel').down('form').getForm().reset();
		var fSystemTabStore=fSysemTabGrid.getStore();
		fSysemTabGrid.up('panel').up('panel').down('form').getForm().reset();
		var params = { cloudUuid:-1,sysMode:2,uuid:0
				,version:'',detailDesc:'',sysIpAddr:'',name:''
				,adminStatus:0,runStatus:0};
		Ext.apply(fSystemTabStore.proxy.extraParams, params);
		
		var fLocalSystemTabGrid=Ext.getCmp(localSysTabId).down('panel[itemId=grid]');
		var fLocalSystemTabStore=fLocalSystemTabGrid.getStore();
		fLocalSystemTabGrid.up('panel').up('panel').down('form').getForm().reset();
		var params = { cloudUuid:-1,sysMode:1,uuid:0
				,version:'',detailDesc:'',sysIpAddr:'',name:''
					,adminStatus:0,runStatus:0};
		Ext.apply(fLocalSystemTabStore.proxy.extraParams, params);
		
		var domainListPanel=Ext.getCmp(domainTabId);
		domainListPanel.cloudUuid=-99;
		var eastSearch=domainListPanel.down('panel[itemId=search]');
		eastSearch.down('form').getForm().reset();
		eastSearch.down('form').getForm().findField('specSysUuid').store.load({params:{cloudUuid:-99,types:'server'}});
		
		var naListPanel=Ext.getCmp(neNaTabId);
		naListPanel.cloudUuid=-99;
		var neListSearch=naListPanel.down('panel[itemId=search]');
		neListSearch.down('form').getForm().reset();
		neListSearch.down('form').getForm().findField('sysUuid').store.load({params:{cloudUuid:-99,types:'server'}});
		
		var nisg=domainListPanel.down('panel[itemId=grid]').getStore();
	    var params = { specCloudUuid:-1,cloudUuid:-1,domainUuid:0,sysUuid:0,
	    		name:'',specSysUuid:0,
	    		vendorId:-1,
	    		type:-1};
	    Ext.apply(nisg.proxy.extraParams, params);
		var panel = domainListPanel.down('panel[itemId=grid]');
		panel.up('panel').up('panel').down('form').getForm().reset();
		var paging = panel.down("pagingtoolbar");
	
		var deviceGrid=Ext.getCmp(neTabId).down('panel[itemId=grid]');
		var deviceStore=deviceGrid.getStore();
		deviceGrid.up('panel').up('panel').down('form').getForm().reset();
	    var params = { specCloudUuid:-1,cloudUuid:-1,sysUuid:0,productSn:'',domainName:''};
	    Ext.apply(deviceStore.proxy.extraParams, params);
			    
		var cloudInFCloudPanel=Ext.getCmp(cloudTabId);
		var panel = cloudInFCloudPanel.down('panel[itemId=grid]');
		
		this.run(operationPanel,containerId);
		
		fCloudPanel.setSize(size.width,size.height);
		fCloudPanel.setVisible(true);

	},
	CLOUD:function(operationPanel,name,parentNode,size,containerId,sysTabId,domainTabId,neTabId){
		var cloudPanel=Ext.getCmp(containerId);
		if(cloudPanel==undefined || cloudPanel==null){
			cloudPanel=Ext.create('app.view.operation.cloud.CloudPanel',{
				id:containerId,
			});
			operationPanel.add(cloudPanel);
			operationPanel.doLayout();
		}
		cloudPanel.setVisible(true);
		cloudPanel.treeName=name;
		var cloudTab1=cloudPanel.down('form');
		var cloudInfoStore=cloudPanel.store;
        var params = { uuid:name};
        Ext.apply(cloudInfoStore.proxy.extraParams, params);
        
        var fSystemTab=Ext.getCmp(sysTabId);
        var fSystemTabStore=fSystemTab.down('panel[itemId=grid]').getStore();
        fSystemTab.down('panel[itemId=grid]').up('panel').up('panel').down('form').getForm().reset();
        fSystemTab.cloudUuid=name;
        cloudPanel.cloudUuid=name;
        var params = { cloudUuid:name,uuid:0,sysMode:2
				,version:'',detailDesc:'',sysIpAddr:'',name:''
					,adminStatus:0,runStatus:0};
        Ext.apply(fSystemTabStore.proxy.extraParams, params);
		 
		var domainInCloudPanel=Ext.getCmp(domainTabId);
		domainInCloudPanel.cloudUuid=name;
		var eastSearch=domainInCloudPanel.down('panel[itemId=search]');
		eastSearch.down('form').getForm().reset();
		eastSearch.down('form').getForm().findField('specSysUuid').store.load({params:{cloudUuid:-99,types:'server'}});
		var nisg=domainInCloudPanel.down('panel[itemId=grid]').getStore();
        var params = { cloudUuid:name,domainUuid:0,sysUuid:0,
        		name:'',specSysUuid:0,
        		vendorId:-1,
        		type:-1};
        Ext.apply(nisg.proxy.extraParams, params);
		var panel = domainInCloudPanel.down('panel[itemId=grid]');
		
		var domainUuid = cloudTab1.down('combo[name=manDomainUuid]');
        var comboxStore = domainUuid.comboxStore;
        var params = { cloudUuid:name,types:'domain'};
        Ext.apply(comboxStore.proxy.extraParams, params);
        
        var deviceGrid=Ext.getCmp(neTabId).down('panel[itemId=grid]');
        var deviceStore=deviceGrid.getStore();
        deviceGrid.up('panel').up('panel').down('form').getForm().reset();
        var params = { cloudUuid:name,sysUuid:0,productSn:'',domainName:''};
        Ext.apply(deviceStore.proxy.extraParams, params);
        
		this.run(operationPanel,containerId);
		
		cloudPanel.treeName=name;
		cloudPanel.setSize(size.width,size.height);
		cloudPanel.setVisible(true);
	},
	FSYSTEM:function(operationPanel,name,parentNode,size
			,containerId,domainTabId,neTabId){
		var fSystemPanel=Ext.getCmp(containerId);
		if(fSystemPanel==undefined|| fSystemPanel==null){
			fSystemPanel=Ext.create('app.view.operation.system.FSystemPanel',{
				id:containerId
			});
			operationPanel.add(fSystemPanel);
			operationPanel.doLayout();
		}
		fSystemPanel.setVisible(true);
	
		var fSystemTab=fSystemPanel.down('panel[itemId=grid]').getStore();
		fSystemPanel.down('panel[itemId=grid]').up('panel').up('panel').down('form').getForm().reset();
		fSystemPanel.cloudUuid=parentNode.raw.tid;
        var params = { cloudUuid:parentNode.raw.tid,sysMode:2,uuid:0
				,version:'',detailDesc:'',sysIpAddr:'',name:''
					,adminStatus:0,runStatus:0};
        Ext.apply(fSystemTab.proxy.extraParams, params);
        
		var domainListPanel=Ext.getCmp(domainTabId);
		domainListPanel.cloudUuid=parentNode.raw.tid;
		var eastSearch=domainListPanel.down('panel[itemId=search]');
		eastSearch.down('form').getForm().findField('specSysUuid').store.load({params:{cloudUuid:-99,types:'server'}});
		
		var nisg=domainListPanel.down('panel[itemId=grid]').getStore();
		domainListPanel.down('panel[itemId=grid]').up('panel').up('panel').down('form').getForm().reset();
        var params = { cloudUuid:parentNode.raw.tid,domainUuid:0,sysUuid:0,
        		name:'',specSysUuid:0,
        		vendorId:-1,
        		type:-1};
        Ext.apply(nisg.proxy.extraParams, params);

        var deviceGrid=Ext.getCmp(neTabId).down('panel[itemId=grid]');
		var deviceStore=deviceGrid.getStore();
		deviceGrid.up('panel').up('panel').down('form').getForm().reset();
        var params = { cloudUuid:parentNode.raw.tid,sysUuid:0,productSn:'',domainName:''};
        Ext.apply(deviceStore.proxy.extraParams, params);
	    
        this.run(operationPanel,containerId);
        
		fSystemPanel.setSize(size.width,size.height);
		fSystemPanel.setVisible(true);		
	},
	FLOCALSERVER:function(operationPanel,name,parentNode,size
			,containerId,neTabId){
		var fSystemPanel=Ext.getCmp(containerId);
		if(fSystemPanel==undefined|| fSystemPanel==null){
			fSystemPanel=Ext.create('app.view.operation.system.FLocalSystemPanel',{
				id:containerId
			});
			operationPanel.add(fSystemPanel);
			operationPanel.doLayout();
		}
		fSystemPanel.setVisible(true);
	
		var fSystemTabGrid=fSystemPanel.down('panel[itemId=grid]');
		var fSystemTab=fSystemTabGrid.getStore();
		fSystemTabGrid.up('panel').up('panel').down('form').getForm().reset();
		fSystemPanel.cloudUuid=parentNode.raw.tid;
        var params = { cloudUuid:parentNode.raw.tid,sysMode:1};
        Ext.apply(fSystemTab.proxy.extraParams, params);
        
// var deviceStore=Ext.getCmp(neTabId).down('panel[itemId=grid]').getStore();
// var params = {
// cloudUuid:parentNode.raw.tid,sysUuid:0,productSn:'',domainName:''};
// Ext.apply(deviceStore.proxy.extraParams, params);
	    
        this.run(operationPanel,containerId);
        
		fSystemPanel.setSize(size.width,size.height);
		fSystemPanel.setVisible(true);		
	},
	SYSTEM:function(operationPanel,name,parentNode,size
			,containerId,domainTabId,neTabId){
		var systemPanel=Ext.getCmp(containerId);
		if(systemPanel==undefined || systemPanel==null){
			systemPanel=Ext.create('app.view.operation.system.SystemPanel',{
				id:containerId,
				uuid:name,
			});
			operationPanel.add(systemPanel);
			operationPanel.doLayout();
		}
		systemPanel.uuid=name;
		systemPanel.setVisible(true);
		var systemTab=Ext.getCmp(containerId).down('form[itemId=form]');
		systemTab.treeName=name;
		
		var sysInfoStore=systemPanel.store;
		sysInfoStore.removeAll();
        var params = { uuid:name};        		      
        Ext.apply(sysInfoStore.proxy.extraParams, params);
		
		var domainListPanel=Ext.getCmp(domainTabId);
		domainListPanel.cloudUuid=parentNode.parentNode.raw.tid;
		domainListPanel.sysUuid=name;
		var eastSearch=domainListPanel.down('panel[itemId=search]');
		eastSearch.down('form').getForm().findField('specSysUuid').store.load({params:{cloudUuid:-99,types:'server'}});	
		var nisg=domainListPanel.down('panel[itemId=grid]').getStore();
		domainListPanel.down('panel[itemId=grid]').up('panel').up('panel').down('form').getForm().reset();
        var params = { cloudUuid:parentNode.parentNode.raw.tid,
  			  specCloudUuid:parentNode.parentNode.raw.tid,
  			  domainUuid:0,sysUuid:name,
  			  name:'',specSysUuid:0,
  			  vendorId:-1,
  			  type:-1};
        Ext.apply(nisg.proxy.extraParams, params);
        
        var manDomainUuid = systemPanel.down('combo[name=manageDomain]');
        var manDomainStore = manDomainUuid.store;
        manDomainStore.load({params:{ cloudUuid:parentNode.parentNode.raw.tid,types:'domain'}});
        

        var deviceGrid=Ext.getCmp(neTabId).down('panel[itemId=grid]');
		var deviceStore=deviceGrid.getStore();
		deviceGrid.up('panel').up('panel').down('form').getForm().reset();
    	var params = { cloudUuid:parentNode.parentNode.raw.tid,
    			  specCloudUuid:parentNode.parentNode.raw.tid,
    			  sysUuid:name,productSn:'',domainName:''};
	    Ext.apply(deviceStore.proxy.extraParams, params);
	    
	    this.run(operationPanel,containerId);
		
		systemPanel.setSize(size.width,size.height);
		systemPanel.setVisible(true);
	},
	
	LOCALSERVER:function(operationPanel,name,parentNode,size
			,containerId){
		var systemPanel=Ext.getCmp(containerId);
		if(systemPanel==undefined || systemPanel==null){
			systemPanel=Ext.create('app.view.operation.system.LocalSystemPanel',{
				id:containerId,
				uuid:name
			});
			operationPanel.add(systemPanel);
			operationPanel.doLayout();
		}
		systemPanel.setVisible(true);
		var systemTab=Ext.getCmp(containerId).down('form[itemId=form]');
		systemTab.treeName=name;
		systemPanel.uuid=name;
		var sysInfoStore=systemPanel.store;
		sysInfoStore.removeAll();
        var params = { uuid:name};        		      
        Ext.apply(sysInfoStore.proxy.extraParams, params);
        
	    this.run(operationPanel,containerId);
		
		systemPanel.setSize(size.width,size.height);
		systemPanel.setVisible(true);
	},
	
	PROC:function(operationPanel,name,parentNode,size
			,containerId){
		var processPanel=Ext.getCmp(containerId);
		if(processPanel==undefined || processPanel==null){
			processPanel=Ext.create('app.view.operation.system.process.ProcessPanel',{
				id:containerId
			});
			operationPanel.add(processPanel);
			operationPanel.doLayout();
		}
		processPanel.setVisible(true);
		var processTab=processPanel.down('form');
		
		var processInfoStore=processPanel.store;
        var params = { uuid:name};      		      
        Ext.apply(processInfoStore.proxy.extraParams, params);       			

        this.run(operationPanel,containerId);
		processPanel.setSize(size.width,size.height);
		processPanel.setVisible(true);
	},
	FDOMAIN:function(ip,operationPanel,name,parentNode,size
			,containerId,domainTabId,neTabId){
		var fdomainPanel=Ext.getCmp(containerId);
		if(fdomainPanel==undefined || fdomainPanel==null){
			fdomainPanel=Ext.create('app.view.operation.domain.FDomainPanel',{
				id:containerId
			});
			operationPanel.add(fdomainPanel);
			operationPanel.doLayout();
		}
		fdomainPanel.setVisible(true);
		fdomainPanel.cloudUuid=parentNode.raw.tid;
		var domainListPanel=Ext.getCmp(domainTabId);
		domainListPanel.cloudUuid=parentNode.raw.tid;
		var eastSearch=domainListPanel.down('panel[itemId=search]');
		eastSearch.down('form').getForm().reset();
		eastSearch.down('form').getForm().findField('specSysUuid').store.load({params:{cloudUuid:-99,types:'server'}});
		var panel = domainListPanel.down('panel[itemId=grid]');
		var nisg=panel.getStore();
        var params = { cloudUuid:parentNode.raw.tid,domainUuid:0,sysUuid:0,
        		name:'',specSysUuid:0,
        		vendorId:-1,
        		type:-1};
        Ext.apply(nisg.proxy.extraParams, params);		
		
		var store = Ext.getCmp(neTabId).store;
		Ext.getCmp(neTabId).down('form').getForm().reset();
		var params = { cloudUuid:parentNode.raw.tid,sysUuid:0,productSn:'',domainName:''};
        Ext.apply(store.proxy.extraParams, params);

		ip.initTree(panel,'dl');
		
		this.run(operationPanel,containerId);
		
		fdomainPanel.setSize(size.width,size.height);
		fdomainPanel.setVisible(true);
	},
	FNODE:function(operationPanel,name,parentNode,size
			,containerId){
		var fnodePanel=Ext.getCmp(containerId);
		if(fnodePanel==undefined || fnodePanel==null){
			fnodePanel=Ext.create('app.view.operation.node.FNodePanel',{
				id:containerId
			});
			operationPanel.add(fnodePanel);
			operationPanel.doLayout();
		}
		fnodePanel.cloudUuid=parentNode.raw.tid;
		fnodePanel.setVisible(true);
		var fNodeTab=fnodePanel.down('panel[itemId=grid]');
		var fNodeTabStore=fNodeTab.getStore();
		
		var params = {cloudUuid:parentNode.raw.tid};
		Ext.apply(fNodeTabStore.proxy.extraParams, params);
// fNodeTabStore.removeAll();
// fNodeTabStore.load();
		this.run(operationPanel,containerId);
		fnodePanel.setSize(size.width,size.height);
		fnodePanel.setVisible(true);
	},
	FNODEGROUP:function(operationPanel,name,parentNode,size
			,containerId){
		var fnodeGroupPanel=Ext.getCmp(containerId);
		if(fnodeGroupPanel==undefined || fnodeGroupPanel==null){
			fnodeGroupPanel=Ext.create('app.view.operation.node.FNodeGroupPanel',{
				id:containerId
			});
			operationPanel.add(fnodeGroupPanel);
			operationPanel.doLayout();
		}
		fnodeGroupPanel.cloudUuid=parentNode.raw.tid;
		fnodeGroupPanel.setVisible(true);
		// 业务代码这里开始
		var fnodeGroupStore=fnodeGroupPanel.down('panel').down('panel').store
		var params = {cloudUuid:parentNode.raw.tid};
		Ext.apply(fnodeGroupStore.proxy.extraParams, params);
// fnodeGroupStore.load();
		this.run(operationPanel,containerId);
		fnodeGroupPanel.setSize(size.width,size.height);
		fnodeGroupPanel.setVisible(true);
	},
	NODEGROUP:function(operationPanel,name,parentNode,size
			,containerId,nodeTabId){
		var nodeGroupPanel=Ext.getCmp(containerId);
		if(nodeGroupPanel==undefined || nodeGroupPanel==null){
			nodeGroupPanel=Ext.create('app.view.operation.node.NodeGroupPanel',{
				id:containerId
			});
			operationPanel.add(nodeGroupPanel);
			operationPanel.doLayout();
		}
		nodeGroupPanel.cloudUuid=parentNode.parentNode.raw.tid;
		var store = nodeGroupPanel.nodeGroupStore;
		var params = {uuid:name};
		Ext.apply(store.proxy.extraParams, params);
		nodeGroupPanel.setVisible(true);
		// 业务代码这里开始
		
		var nodeStore = Ext.getCmp(nodeTabId).getStore();
		Ext.getCmp(nodeTabId).treeName = name;
		var params = {nodeGrpUuid:name};
		Ext.apply(nodeStore.proxy.extraParams, params);
		
		this.run(operationPanel,containerId);
		
		nodeGroupPanel.setSize(size.width,size.height);
		nodeGroupPanel.setVisible(true);
	},
	NODE:function(operationPanel,name,parentNode,size
			,containerId,nodeTabId){
		var nodePanel=Ext.getCmp(containerId);
		if(nodePanel==null|| nodePanel==undefined ){
			nodePanel=Ext.create('app.view.operation.node.NodePanel',{
				id:containerId
			});
			operationPanel.add(nodePanel);
			operationPanel.doLayout();
		}
		nodePanel.cloudUuid=parentNode.parentNode.raw.tid;
		nodePanel.setVisible(true);
		var nodeTab=nodePanel.down('form');
		nodeTab.treeName=name;

		var nodeInfoStore=nodeTab.store;
        var params = { uuid:name};
        Ext.apply(nodeInfoStore.proxy.extraParams, params);
// nodeInfoStore.load();
        this.run(operationPanel,containerId);
		nodePanel.setSize(size.width,size.height);
		nodePanel.setVisible(true);
	},
	DOMAIN:function(operationPanel,name,parentNode,size
			,containerId,neTabId,miboxTabId,neNaTabId){
		var domainPanel=Ext.getCmp(containerId);
		if(domainPanel==null || domainPanel==undefined){
			domainPanel=Ext.create('app.view.operation.domain.DomainPanel',{id:containerId});
			operationPanel.add(domainPanel);
			operationPanel.doLayout();
			lanControll.setFieldSet(domainPanel.down('form[itemId=domainForm]'));
		}
		domainPanel.setVisible(true);
		domainPanel.treeId=name;
		var domainTab=domainPanel.down('form');        			
		domainTab.treeName=name;
// var cloudUuid=domainTab.getForm().findField('cloudUuid').getValue();
		var store = domainPanel.store;
// var comboxStore = domainTab.comboxStore;
		store.removeAll();
        var params = { uuid:name};
        Ext.apply(store.proxy.extraParams, params);
        
        var comboxStore = domainTab.comboxStore;
        var productIds = "21,22,23,24";
        var params = { domainUuid:name,productIds:productIds,types:'device'};
        Ext.apply(comboxStore.proxy.extraParams, params);
		
		var nesInDomainTab=Ext.getCmp(neTabId);
		nesInDomainTab.treeId=name;
		var nisg=nesInDomainTab.down('panel[itemId=grid]').getStore();
		nesInDomainTab.down('panel[itemId=grid]').up('panel').up('panel').down('form').getForm().reset();
        var params = { domainUuid:name,siteUuid:0
        		,productId:0,detailDesc:''
        		,alias:''};
        Ext.apply(nisg.proxy.extraParams, params);
        
        
        var miboxTab=Ext.getCmp(miboxTabId);
        if(miboxTab){
        	miboxTab.treeId=name;
        	var miboxTabStore=miboxTab.store;
        	var params = { domainUuid:name,siteUuid:0
        			,productId:0,detailDesc:''
        				,alias:'',productIds:'34'};
        	Ext.apply(miboxTabStore.proxy.extraParams, params);
        }
        
        var neNaTab=Ext.getCmp(neNaTabId);
        neNaTab.treeId=name;
		var nisg=neNaTab.down('panel[itemId=grid]').getStore();
		neNaTab.down('panel[itemId=grid]').up('panel').up('panel').down('form').getForm().reset();
        var params = { domainUuid:name,siteUuid:0
        		,productId:0,detailDesc:''
        		,alias:''};
        Ext.apply(nisg.proxy.extraParams, params);
        
        
        var curPanel = Ext.getCmp("domainCurrentAlarmPanel");
        if(curPanel){
            var curStore = curPanel.down('panel[itemId=grid]').store;
            var params = { domainUuid:name,neUuid:0,cleanFlag:0, alarmType:1, cleanTimeB:null
    				, cleanTimeE:null, recvTimeB:null, recvTimeE:null, reportTimeB:null, reportTimeE:null
    				, alarmLevel:null, neAlias:null, objectTypeName:null, alarmName:null, causeName:null
    				, productSnStr:null};
            Ext.apply(curStore.proxy.extraParams, params);
        }
        var hisPanel = Ext.getCmp("domainHistoryAlarmPanel");
        if(hisPanel){
        	var hisStore = hisPanel.down('panel[itemId=grid]').store;
            var curStore = Ext.getCmp("domainCurrentAlarmPanel").down('panel[itemId=grid]').store;
            var params = { domainUuid:name,neUuid:0,cleanFlag:null, alarmType:null, cleanTimeB:null
    				, cleanTimeE:null, recvTimeB:null, recvTimeE:null, reportTimeB:null, reportTimeE:null
    				, alarmLevel:null, neAlias:null, objectTypeName:null, alarmName:null, causeName:null
    				, productSnStr:null};
            Ext.apply(hisStore.proxy.extraParams, params);
        }        

        this.run(operationPanel,containerId);
		domainPanel.setSize(size.width,size.height);
		domainPanel.setVisible(true);
	},
	FPOLICY:function(operationPanel,name,parentNode,size
			,containerId){
		var fpolicyPanel=Ext.getCmp(containerId);
		if(fpolicyPanel==null || fpolicyPanel==undefined){
			fpolicyPanel=Ext.create('app.view.operation.domain.policy.FPolicyPanel',{
				id:containerId
			});
			operationPanel.add(fpolicyPanel);
			operationPanel.doLayout();
		}
		fpolicyPanel.setVisible(true);
		var policyInDomainGrid=fpolicyPanel.down('panel[itemId=grid]');
		var policyInDomain=policyInDomainGrid.getStore();
		var domainUuid=policyInDomainGrid.parentNodeTid=parentNode.raw.tid;
        var params = { domainUuid:domainUuid};
        Ext.apply(policyInDomain.proxy.extraParams, params);
        this.run(operationPanel,containerId);

		fpolicyPanel.setSize(size.width,size.height);
		fpolicyPanel.setVisible(true);
		
	},
	POLICY:function(operationPanel,name,parentNode,size
			,containerId,ruleTabId){
		var policyPanel=Ext.getCmp(containerId);
		if(policyPanel==null || policyPanel==undefined){
			policyPanel=Ext.create('app.view.operation.domain.policy.PolicyPanel',{
				id:containerId
			});
			operationPanel.add(policyPanel);
			operationPanel.doLayout();
		}		
		policyPanel.setVisible(true);		
		var policyTab=policyPanel.down('form');
		policyTab.treeName=name;
		var domainUuid = parentNode.parentNode.raw.tid;
		var policyInfoStore=policyTab.store;
		
        var params = { uuid:name};
        Ext.apply(policyInfoStore.proxy.extraParams, params);

		var ruleInPolicyStore=Ext.getCmp(ruleTabId).down('panel[itemId=grid]').getStore();
		Ext.getCmp(ruleTabId).down('panel[itemId=grid]').treeName=name;
		Ext.getCmp(ruleTabId).down('panel[itemId=grid]').domainUuid=domainUuid;
        var params = { policyUuid:name};
        Ext.apply(ruleInPolicyStore.proxy.extraParams, params);

        this.run(operationPanel,containerId);
				
		policyPanel.setSize(size.width,size.height);
		policyPanel.setVisible(true);
		
	},
	RULE:function(operationPanel,name,parentNode,size
			,containerId){
		var rulePanel=Ext.getCmp(containerId);
		if(rulePanel==null || rulePanel==undefined){
			rulePanel=Ext.create('app.view.operation.domain.policy.RulePanel',{
				id:containerId
			});
			operationPanel.add(rulePanel);
			operationPanel.doLayout();
		}		
		var tab=rulePanel.down('form');
		tab.treeName=name;
		var store = rulePanel.store;
		store.removeAll();
        var params = { uuid:name};
        Ext.apply(store.proxy.extraParams, params);
		
		var comboxStore = tab.getForm().findField('grpUuid').store;
		comboxStore.removeAll();
        var params = { domainUuid:parentNode.parentNode.parentNode.raw.tid,types:'group'};
        Ext.apply(comboxStore.proxy.extraParams, params);
// comboxStore.load();
        this.run(operationPanel,containerId);
        
		rulePanel.setSize(size.width,size.height);
		rulePanel.setVisible(true);
	},
	FGROUP:function(operationPanel,name,parentNode,size
			,containerId){
		var fgroupPanel=Ext.getCmp(containerId);
		if(fgroupPanel==null || fgroupPanel==undefined){
			fgroupPanel=Ext.create('app.view.operation.domain.group.FGroupPanel',{
				id:containerId
			});
			operationPanel.add(fgroupPanel);
			operationPanel.doLayout();
		}
		fgroupPanel.setVisible(true);
		var fgroupTab=fgroupPanel.down('panel[itemId=grid]');
		fgroupTab.treeName=name;
		fgroupTab.parentNodeTid=parentNode.raw.tid;	
		var groupInDomain=fgroupTab.getStore();
        var params = { domainUuid:parentNode.raw.tid};
        Ext.apply(groupInDomain.proxy.extraParams, params);

        this.run(operationPanel,containerId);

		fgroupPanel.setSize(size.width,size.height);
		fgroupPanel.setVisible(true);
	},
	FPAIDGROUP:function(operationPanel,name,parentNode,size
			,containerId){
		var fPaidGroupPanel=Ext.getCmp(containerId);
		if(fPaidGroupPanel==null || fPaidGroupPanel==undefined){
			fPaidGroupPanel=Ext.create('app.view.operation.domain.group.FPaidGroupPanel',{
				id:containerId
			});
			operationPanel.add(fPaidGroupPanel);
			operationPanel.doLayout();
		}
		fPaidGroupPanel.setVisible(true);
		var fPaidGroupTab=fPaidGroupPanel.down('panel[itemId=grid]');
		fPaidGroupTab.treeName=name;
		fPaidGroupTab.parentNodeTid=parentNode.raw.tid;	
		var fPaidGroupTabStore=fPaidGroupTab.getStore();
		var params = {domainUuid:parentNode.raw.tid};
        Ext.apply(fPaidGroupTabStore.proxy.extraParams, params);
        
        this.run(operationPanel,containerId);
        
		fPaidGroupPanel.setSize(size.width,size.height);
		fPaidGroupPanel.setVisible(true);
	},
	PAIDGROUP:function(operationPanel,name,parentNode,size
			,containerId,paidTabId){
		var paidGroupPanel=Ext.getCmp(containerId);
		if(paidGroupPanel==null || paidGroupPanel==undefined){
			paidGroupPanel=Ext.create('app.view.operation.domain.group.PaidGroupPanel',{
				id:containerId
			});
			operationPanel.add(paidGroupPanel);
			operationPanel.doLayout();
		}
		paidGroupPanel.setVisible(true);
		
		var paidGroupTab=Ext.getCmp(containerId).down('form');
		paidGroupTab.treeName=name;
		paidGroupTab.parentNodeTid=parentNode.raw.tid;		
		var paidGroupTabStore=paidGroupTab.store;
		var params = {uuid:name};
        Ext.apply(paidGroupTabStore.proxy.extraParams, params);
        
		var paidListGrid=Ext.getCmp(paidTabId).down('panel[itemId=grid]');
		paidListGrid.up('panel').up('panel').down('form').getForm().reset();
		paidListGrid.treeName=name;
		paidListGrid.parentNodeTid=parentNode.raw.tid;
		paidListGrid.parentParentNodeTid=parentNode.parentNode.raw.tid;		
		var paidListGridStore=paidListGrid.getStore();
		var params = {paidGrpUuid:name};
        Ext.apply(paidListGridStore.proxy.extraParams, params);

        this.run(operationPanel,containerId);
		
		paidGroupPanel.setSize(size.width,size.height);
		paidGroupPanel.setVisible(true);
	},
	GROUP:function(ip,operationPanel,name,parentNode,size
			,containerId,simTabId,smlTabId,callTabId,usslTabId,cdrTabId,smsTabId,ussdTabId){
//		Ext.suspendLayouts();
		var groupPanel=Ext.getCmp(containerId);
		if(groupPanel==null || groupPanel==undefined){
			groupPanel=Ext.create('app.view.operation.domain.group.GroupPanel',{
				id:containerId
			});
			operationPanel.add(groupPanel);
			operationPanel.doLayout();
		}
		var domainUuid=parentNode.parentNode.raw.tid;
		groupPanel.domainUuid=domainUuid;
		groupPanel.treeId=name;
		var tab=groupPanel.down('form');
		tab.treeName=name;
		var store = tab.store;
        var params = { uuid:name};
        Ext.apply(store.proxy.extraParams, params);
		var comboxStore = tab.comboxStore;
		var params = {domainUuid:domainUuid,types:'zone,group,paidgroup'};
		Ext.apply(comboxStore.proxy.extraParams, params);

		var simCardGrid=Ext.getCmp(simTabId).down('panel[itemId=grid]');
		// 在切换tab时强制刷新标志
		var simCardGridStore=simCardGrid.store;
		var collection=simCardGrid.collection;
		simCardGrid.up('panel').up('panel').down('form').getForm().reset();
        var params = {domainUuid:domainUuid,grpUuid:name,uuid:0,imsi:'',alias:'',adminStatus:0,runStatus:0};
        Ext.apply(simCardGridStore.proxy.extraParams, params);
		
		var simSmlGrid=Ext.getCmp(smlTabId).down('panel[itemId=grid]');
		simSmlGrid.up('panel').up('panel').down('form').getForm().reset();
		var simSmlStore=simSmlGrid.store;
        var params = {domainUuid:domainUuid, grpUuid:name};
        Ext.apply(simSmlStore.proxy.extraParams, params);
	    
	    var simCallGrid=Ext.getCmp(callTabId).down('panel[itemId=grid]');
	    simCallGrid.up('panel').up('panel').down('form').getForm().reset();
	    var simCallStore=simCallGrid.store;
    	var params = { domainUuid:domainUuid,grpUuid:name};
    	Ext.apply(simCallStore.proxy.extraParams, params);
	   
	    var simUsslGrid=Ext.getCmp(usslTabId).down('panel[itemId=grid]');
	    simUsslGrid.up('panel').up('panel').down('form').getForm().reset();
	    var simUsslStore=simUsslGrid.store;
    	var params = { domainUuid:domainUuid,grpUuid:name};
    	Ext.apply(simUsslStore.proxy.extraParams, params);

	    // call list
	    var callInGroupGrid=Ext.getCmp(cdrTabId).down('panel[itemId=grid]');
	    callInGroupGrid.up('panel').up('panel').down('form').getForm().reset();
	    callInGroupGrid.treeName=name;
	    var callInGroupStore=callInGroupGrid.store;
    	var params = { domainUuid:domainUuid,grpUuid:name};
    	Ext.apply(callInGroupStore.proxy.extraParams, params);
	    
	    // sms list
	    var smsInGroupGrid=Ext.getCmp(smsTabId).down('panel[itemId=grid]');
	    smsInGroupGrid.up('panel').up('panel').down('form').getForm().reset();
	    smsInGroupGrid.treeName=name;
	    var smsInGroupStore=smsInGroupGrid.store;
    	var params = { domainUuid:domainUuid,grpUuid:name};
    	Ext.apply(smsInGroupStore.proxy.extraParams, params);
	    
	    // ussd list
	    var ussdInGroupGrid=Ext.getCmp(ussdTabId).down('panel[itemId=grid]');
	    ussdInGroupGrid.up('panel').up('panel').down('form').getForm().reset();
	    ussdInGroupGrid.treeName=name;
	    var ussdInGroupStore=ussdInGroupGrid.store;
    	var params = {domainUuid:domainUuid, grpUuid:name};
    	Ext.apply(ussdInGroupStore.proxy.extraParams, params);

    	this.run(operationPanel,containerId);
	    
	    ip.initTree(simCardGrid,'gsl');
	    ip.initTree(smsInGroupGrid,'gsmsl');
	    ip.initTree(ussdInGroupGrid,'gussdl');
	    ip.initTree(callInGroupGrid,'gcalll');
	    
	    groupPanel.setSize(size.width,size.height);
		groupPanel.setVisible(true);
//		Ext.resumeLayouts(true);
	},
	FROAMZONE:function(operationPanel,name,parentNode,size
			,containerId,siteTabId,nesTabId){
		var froamzonePanel=Ext.getCmp(containerId);
		if(froamzonePanel==null || froamzonePanel==undefined){
			froamzonePanel=Ext.create('app.view.operation.domain.roamzone.FRoamzonePanel',{
				id:containerId
			});
			operationPanel.add(froamzonePanel);
			operationPanel.doLayout();
		}
		froamzonePanel.setVisible(true);
		var zoneTab=froamzonePanel.down('panel[itemId=grid]');
		zoneTab.parentNodeTid=parentNode.raw.tid;
		var zoneInDomain=zoneTab.getStore();
        var params = { domainUuid:parentNode.raw.tid};
        Ext.apply(zoneInDomain.proxy.extraParams, params);

		var domainUuid = parentNode.raw.tid;
		var siteInZoneTab=Ext.getCmp(siteTabId);
		siteInZoneTab.treeName=name;
		siteInZoneTab.domainUuid=domainUuid;
		var siteInZoneGrid=siteInZoneTab.down('panel[itemId=grid]');
		var siteInZone=siteInZoneGrid.getStore();
		siteInZoneGrid.treeName=name;
		siteInZoneGrid.domainUuid=domainUuid;
		Ext.apply(siteInZone.proxy.extraParams, {domainUuid:domainUuid,zoneUuid:0});
		
		
		var panel = Ext.getCmp(nesTabId);
		panel.treeName=name;
		panel.treeId=domainUuid;
		var nesGrid=panel.down('panel[itemId=grid]');
		nesGrid.up('panel').up('panel').down('form').getForm().reset();
		
		var nisg=nesGrid.getStore();
		nesGrid.treeName=name;
		nesGrid.domainUuid=domainUuid;

        var params = {siteUuid:0,productId:0,domainUuid:domainUuid};
        Ext.apply(nisg.proxy.extraParams, params);
		
        this.run(operationPanel,containerId);

		froamzonePanel.setSize(size.width,size.height);
		froamzonePanel.setVisible(true);
		
	},
	ROAMZONE:function(operationPanel,name,parentNode,size
			,containerId,siteInZoneTabId,nesTabId){
		var roamzonePanel=Ext.getCmp(containerId);
		if(roamzonePanel==null || roamzonePanel==undefined){
			roamzonePanel=Ext.create('app.view.operation.domain.roamzone.RoamzonePanel',{
				id:containerId
			});
			operationPanel.add(roamzonePanel);
			operationPanel.doLayout();
			lanControll.setFieldSet(roamzonePanel.down('form[itemId=roamForm]'));
		}
		var tab=roamzonePanel.down('form');
		tab.treeName=name;
		var store = roamzonePanel.store;
		store.removeAll();
        var params = { uuid:name};
        Ext.apply(store.proxy.extraParams, params);

		var domainUuid = parentNode.parentNode.raw.tid;
		var params = { domainUuid:domainUuid,types:'policy'};
		Ext.apply(tab.comboxStore.proxy.extraParams, params);
		
		var siteInZoneTab=Ext.getCmp(siteInZoneTabId);
		siteInZoneTab.treeName=name;
		siteInZoneTab.domainUuid=domainUuid;
		var siteInZoneGrid=siteInZoneTab.down('panel[itemId=grid]');
		var siteInZone=siteInZoneGrid.getStore();
		siteInZoneGrid.treeName=name;
		siteInZoneGrid.domainUuid=domainUuid;
		Ext.apply(siteInZone.proxy.extraParams, {zoneUuid:name});
		
		
		var panel = Ext.getCmp(nesTabId);
		panel.treeName=name;
		panel.treeId=domainUuid;
		var nesGrid=panel.down('panel[itemId=grid]');
		nesGrid.up('panel').up('panel').down('form').getForm().reset();
		var nisg=nesGrid.getStore();
		nesGrid.treeName=name;
		nesGrid.domainUuid=domainUuid;

		var sites=this.record.childNodes;
		var siteUuids="";
		for(var i=0;i<sites.length;i++){
			siteUuids=siteUuids+sites[i].raw.tid+",";
		}
        var params = {siteUuids:siteUuids,siteUuid:0,productId:0,domainUuid:domainUuid};
        Ext.apply(nisg.proxy.extraParams, params);

		this.run(operationPanel,containerId);
		
		roamzonePanel.setSize(size.width,size.height);
		roamzonePanel.setVisible(true);
	},
	SITE:function(operationPanel,name,parentNode,size
			,containerId,neTabId){
		var sitePanel=Ext.getCmp(containerId);
		if(sitePanel==null || sitePanel==undefined){
			sitePanel=Ext.create('app.view.operation.domain.roamzone.site.SitePanel',{
				id:containerId
			});
			operationPanel.add(sitePanel);
			operationPanel.doLayout();
			lanControll.setFieldSet(sitePanel.down('form[itemId=form]'));
		}       			
		var domainUuid=parentNode.parentNode.parentNode.raw.tid;
		var tab=sitePanel.down('form[itemId=form]');
		tab.treeName=name;
		tab.treeId=name;
		sitePanel.domainUuid=domainUuid;
		store = sitePanel.store;
		store.removeAll();
        var params = { uuid:name};
        Ext.apply(store.proxy.extraParams, params);
        var params = { domainUuid:domainUuid,types:'zone,site'};
        Ext.apply(tab.comboxStore.proxy.extraParams, params);      		

        
		var panel = Ext.getCmp(neTabId);
		panel.treeName=name;
		var nesGrid=panel.down('panel[itemId=grid]');
		nesGrid.up('panel').up('panel').down('form').getForm().reset();
		var nisg=nesGrid.getStore();
		nesGrid.treeName=name;
		nesGrid.domainUuid=domainUuid;
        var params = {siteUuid:name,productId:0,domainUuid:domainUuid};
        Ext.apply(nisg.proxy.extraParams, params);
		
        this.run(operationPanel,containerId);
		
		sitePanel.setSize(size.width,size.height);
		sitePanel.setVisible(true);
	},
	BK:function(operationPanel,name,parentNode,size
			,containerId,portMapTabId,portListTabId){
		var bkPanel=Ext.getCmp(containerId);
		if(bkPanel==null || bkPanel==undefined){
			bkPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.BkInfoPanel',{
				id:containerId
			});
			operationPanel.add(bkPanel);
			operationPanel.doLayout();
		}

		var tab=bkPanel.down('form');
		var store=bkPanel.store;
		var domainUuid=parentNode.parentNode.parentNode.parentNode.raw.tid;
		bkPanel.domainUuid=domainUuid;
		store.removeAll();
        var params = { uuid:name};
        Ext.apply(store.proxy.extraParams, params);
	
		var comboxStore = tab.comboxStore;
        var params = { domainUuid:domainUuid,types:'site,group'};
        Ext.apply(comboxStore.proxy.extraParams, params);    

		var bkpInNeStore=Ext.getCmp(portListTabId).store;
        var params = { neUuid:name,uuid:0};
        Ext.apply(bkpInNeStore.proxy.extraParams, params);
        
		var bkpInNeStore=Ext.getCmp(portMapTabId).store;
        var params = { neUuid:name,uuid:0};
        Ext.apply(bkpInNeStore.proxy.extraParams, params);

        this.run(operationPanel,containerId);
		
		ip.initTree(Ext.getCmp(portListTabId),'bkpl');
		
		bkPanel.setSize(size.width,size.height);
		bkPanel.setVisible(true);
	},
	GW:function(operationPanel,name,parentNode,size
			,containerId,portMapTabId,portListTabId){
		var gwPanel=Ext.getCmp(containerId);
		if(gwPanel==undefined || gwPanel=='undefined' || gwPanel==null){
			gwPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.GwInfoPanel',{
				id:containerId
			});
			operationPanel.add(gwPanel);
			operationPanel.doLayout();
		}
		var tab=gwPanel.down('form[itemId=form]');
		var store=gwPanel.store;
		store.removeAll();		
        var params = { uuid:name};
        Ext.apply(store.proxy.extraParams, params);
        
		
		var comboxStore = tab.comboxStore;
		comboxStore.removeAll();
        var params = { domainUuid:parentNode.parentNode.parentNode.parentNode.raw.tid,types:'site,policy,group'};
        Ext.apply(comboxStore.proxy.extraParams, params);     			


		var gwpInNeStore=Ext.getCmp(portListTabId).store;
        var params = { neUuid:name,uuid:0};
        Ext.apply(gwpInNeStore.proxy.extraParams, params);
        
		var gwpInNeStore=Ext.getCmp(portMapTabId).store;
        var params = { neUuid:name,uuid:0};
        Ext.apply(gwpInNeStore.proxy.extraParams, params);
		
        this.run(operationPanel,containerId);
		
		ip.initTree(Ext.getCmp(portListTabId),'gwpl');
		
		gwPanel.setSize(size.width,size.height);
		gwPanel.setVisible(true);
	},
	GWPORT:function(operationPanel,name,parentNode,size
			,containerId){
		var gwpInfoPanel=Ext.getCmp(containerId);
		var params = {params:{uuid:name}};
		if(gwpInfoPanel==null || gwpInfoPanel==undefined){
			gwpInfoPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.GwpInfoPanel',{
				id:containerId,
				params:params
			});
			operationPanel.add(gwpInfoPanel);
			operationPanel.doLayout();
		}
		gwpInfoPanel.setVisible(true);
		gwpInfoPanel.runParams(params);

		gwpInfoPanel.setSize(size.width,size.height);
		gwpInfoPanel.setVisible(true);
	},
	BKPORT:function(operationPanel,name,parentNode,size
			,containerId){
		var bkpInfoPanel=Ext.getCmp(containerId);
		var params = {params : {uuid:name}};
		if(bkpInfoPanel==null|| bkpInfoPanel==undefined){        				
			bkpInfoPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.BkpInfoPanel',{
				id:containerId,
				params:params
			});
			operationPanel.add(bkpInfoPanel);
			operationPanel.doLayout();
		}
		bkpInfoPanel.setVisible(true);
		bkpInfoPanel.runParams(params);

		bkpInfoPanel.setSize(size.width,size.height);
		bkpInfoPanel.setVisible(true);
	},
	AG:function(operationPanel,name,parentNode,size
			,containerId,portMapTabId,portListTabId){
		var agPanel=Ext.getCmp(containerId);
		if(agPanel==null || agPanel==undefined){
			agPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.AgInfoPanel',{
				id:containerId,			
			});
			operationPanel.add(agPanel);
			operationPanel.doLayout();
		}
		var tab=agPanel.down('form');
		tab.forceRefresh=1;
		var store=tab.store;
		store.removeAll();
		var params = { uuid:name};
		Ext.apply(store.proxy.extraParams, params);

		var comboxStore = tab.comboxStore;
		comboxStore.removeAll();
		var params = { domainUuid:parentNode.parentNode.parentNode.parentNode.raw.tid,types:'site'};
	    Ext.apply(comboxStore.proxy.extraParams, params); 
		
		console.log(portListTabId);
		var agpGrid=Ext.getCmp(portListTabId);
		agpGrid.forceRefresh=1;
		
		var agpGridStore=agpGrid.down('panel').store;
		agpGridStore.removeAll();
		var params = { neUuid:name,uuid:0,type:'all'};
		Ext.apply(agpGridStore.proxy.extraParams, params);
		
//		var agpTab=Ext.getCmp(portMapTabId);
//		agpTab.forceRefresh=1;
		
		var curPanel = Ext.getCmp("agCurrentAlarmPanel");
        if(curPanel){
            var curStore = curPanel.down('panel[itemId=grid]').store;
            var params = { domainUuid:0,neUuid:name,cleanFlag:0, alarmType:1, cleanTimeB:null
    				, cleanTimeE:null, recvTimeB:null, recvTimeE:null, reportTimeB:null, reportTimeE:null
    				, alarmLevel:null, neAlias:null, objectTypeName:null, alarmName:null, causeName:null
    				, productSnStr:null};
            Ext.apply(curStore.proxy.extraParams, params);
        }
        var hisPanel = Ext.getCmp("agHistoryAlarmPanel");
        if(hisPanel){
        	var hisStore = hisPanel.down('panel[itemId=grid]').store;
            var params = { domainUuid:0,neUuid:name,cleanFlag:null, alarmType:null, cleanTimeB:null
    				, cleanTimeE:null, recvTimeB:null, recvTimeE:null, reportTimeB:null, reportTimeE:null
    				, alarmLevel:null, neAlias:null, objectTypeName:null, alarmName:null, causeName:null
    				, productSnStr:null};
            Ext.apply(hisStore.proxy.extraParams, params);
        }  
        
		this.run(operationPanel,containerId);
		
		agPanel.setSize(size.width,size.height);
		agPanel.setVisible(true);
	},
	AGPORT:function(operationPanel,name,parentNode,size
			,containerId){
		var agpInfoPanel=Ext.getCmp(containerId);
		var params = {params : {agpUuid:name}};
		if(agpInfoPanel==null|| agpInfoPanel==undefined){
			agpInfoPanel=Ext.create('app.view.module.AgpInfoPanel',{
				id:containerId,
				params:params,
				closable:false,
				isInfoPanel:1,
			});
			operationPanel.add(agpInfoPanel);
			operationPanel.doLayout();
		}
		
		agpInfoPanel.store.load(params);
		agpInfoPanel.setSize(size.width,size.height);
		agpInfoPanel.setVisible(true);
	},
	TG:function(operationPanel,name,parentNode,size
			,containerId,portMapTabId,portListTabId){
		var tgPanel=Ext.getCmp(containerId);
		if(tgPanel==null || tgPanel==undefined){
			tgPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.TgInfoPanel',{
				id:containerId				
			});
			operationPanel.add(tgPanel);
			operationPanel.doLayout();
		}
		var tab=tgPanel.down('form');
		tab.forceRefresh=1;
		var store=tab.store;
		store.removeAll();
		var params = { uuid:name};
		Ext.apply(store.proxy.extraParams, params);

		var comboxStore = tab.comboxStore;
		comboxStore.removeAll();
        var params = { domainUuid:parentNode.parentNode.parentNode.parentNode.raw.tid,types:'site'};
        Ext.apply(comboxStore.proxy.extraParams, params);     			


		var tgpGrid=Ext.getCmp(portListTabId);
		tgpGrid.forceRefresh=1;
		tgpGridStore=tgpGrid.down('panel').store;
		tgpGridStore.removeAll();
		var params = { neUuid:name,uuid:0,type:'all'};
		Ext.apply(tgpGridStore.proxy.extraParams, params);
		
        var store = tgPanel.down('splitbutton[itemId=autoRefresh]').aStore;
        Ext.apply(store.proxy.extraParams, params);
        
		var curPanel = Ext.getCmp("tgCurrentAlarmPanel");
        if(curPanel){
            var curStore = curPanel.down('panel[itemId=grid]').store;
            var params = { domainUuid:0,neUuid:name,cleanFlag:0, alarmType:1, cleanTimeB:null
    				, cleanTimeE:null, recvTimeB:null, recvTimeE:null, reportTimeB:null, reportTimeE:null
    				, alarmLevel:null, neAlias:null, objectTypeName:null, alarmName:null, causeName:null
    				, productSnStr:null};
            Ext.apply(curStore.proxy.extraParams, params);
        }
        var hisPanel = Ext.getCmp("tgHistoryAlarmPanel");
        if(hisPanel){
        	var hisStore = hisPanel.down('panel[itemId=grid]').store;
            var params = { domainUuid:0,neUuid:name,cleanFlag:null, alarmType:null, cleanTimeB:null
    				, cleanTimeE:null, recvTimeB:null, recvTimeE:null, reportTimeB:null, reportTimeE:null
    				, alarmLevel:null, neAlias:null, objectTypeName:null, alarmName:null, causeName:null
    				, productSnStr:null};
            Ext.apply(hisStore.proxy.extraParams, params);
        }   
		
		this.run(operationPanel,containerId);
		
		tgPanel.setSize(size.width,size.height);
		tgPanel.setVisible(true);
	},
	FTGP:function(operationPanel,name,parentNode,size,containerId,portListTabId){
		var ftgpPanel=Ext.getCmp(containerId);
		if(ftgpPanel==undefined || ftgpPanel==null){
			ftgpPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.FTgpPanel',{
				id:containerId
			});
			operationPanel.add(ftgpPanel);
			operationPanel.doLayout();
		}
		ftgpPanel.setVisible(true);
		var eastSearch=ftgpPanel.down('panel[itemId=detail]');
        if(eastSearch && !eastSearch.isHidden()){
 			eastSearch.collapse(false);
 		}
		var portListPanel=Ext.getCmp(portListTabId);
		var panel = portListPanel.down('panel[itemId=grid]');
		var nisg=panel.getStore();
        var params = {neUuid:name,type:'tgp'};
        Ext.apply(nisg.proxy.extraParams, params);	
        
        
        var panel2 = ftgpPanel.down('form[itemId=portMap]');
		var nisg2=panel2.store;
        var params = {neUuid:name,type:'tgp'};
        Ext.apply(nisg2.proxy.extraParams, params);
        
		
        var store = portListPanel.down('splitbutton[itemId=autoRefresh]').aStore;
        Ext.apply(store.proxy.extraParams, params);

        var store = ftgpPanel.down('form[itemId=portMap]').down('splitbutton[itemId=autoRefresh]').aStore;
        Ext.apply(store.proxy.extraParams, params);
        
		this.run(operationPanel,containerId);
		ip.initTree(panel,'tgpl');
		
		ftgpPanel.setSize(size.width,size.height);
		ftgpPanel.setVisible(true);
	},
	FETH:function(operationPanel,name,parentNode,size,containerId,portListTabId){
		var ftgpPanel=Ext.getCmp(containerId);
		if(ftgpPanel==undefined || ftgpPanel==null){
			ftgpPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.FEthPanel',{
				id:containerId
			});
			operationPanel.add(ftgpPanel);
			operationPanel.doLayout();
		}
		ftgpPanel.setVisible(true);
		var eastSearch=ftgpPanel.down('panel[itemId=detail]');
        if(eastSearch && !eastSearch.isHidden()){
 			eastSearch.collapse(false);
 		}
		var portListPanel=Ext.getCmp(portListTabId);
		if(parentNode.raw.eType.toUpperCase()=='AG'){
			portListPanel.setTitle(lanControll.getLanValue('tiWanList'));
		}
		
		var panel = portListPanel.down('panel[itemId=grid]');
		var nisg=panel.getStore();
        var params = {neUuid:name,type:'eth'};
        Ext.apply(nisg.proxy.extraParams, params);		
		
        var store = ftgpPanel.down('splitbutton[itemId=autoRefresh]').aStore;
        Ext.apply(store.proxy.extraParams, params);
        
		this.run(operationPanel,containerId);
		
		ip.initTree(panel,'ethl');
		
		ftgpPanel.setSize(size.width,size.height);
		ftgpPanel.setVisible(true);
	},
	FDSP:function(operationPanel,name,parentNode,size,containerId,portListTabId){
		var ftgpPanel=Ext.getCmp(containerId);
		if(ftgpPanel==undefined || ftgpPanel==null){
			ftgpPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.FDspPanel',{
				id:containerId
			});
			operationPanel.add(ftgpPanel);
			operationPanel.doLayout();
		}
		ftgpPanel.setVisible(true);
		var eastSearch=ftgpPanel.down('panel[itemId=detail]');
        if(eastSearch && !eastSearch.isHidden()){
 			eastSearch.collapse(false);
 		}
		var portListPanel=Ext.getCmp(portListTabId);
		var panel = portListPanel.down('panel[itemId=grid]');
		var nisg=panel.getStore();
        var params = {neUuid:name,type:'dsp'};
        Ext.apply(nisg.proxy.extraParams, params);		
		
        var store = ftgpPanel.down('splitbutton[itemId=autoRefresh]').aStore;
        Ext.apply(store.proxy.extraParams, params);
        
		this.run(operationPanel,containerId);
		
		ip.initTree(panel,'dspl');
		
		ftgpPanel.setSize(size.width,size.height);
		ftgpPanel.setVisible(true);
	},
	FSS7:function(operationPanel,name,parentNode,size,containerId,portListTabId){
		var ftgpPanel=Ext.getCmp(containerId);
		if(ftgpPanel==undefined || ftgpPanel==null){
			ftgpPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.FSs7Panel',{
				id:containerId
			});
			operationPanel.add(ftgpPanel);
			operationPanel.doLayout();
		}
		ftgpPanel.setVisible(true);
		var eastSearch=ftgpPanel.down('panel[itemId=detail]');
        if(eastSearch && !eastSearch.isHidden()){
 			eastSearch.collapse(false);
 		}
		var portListPanel=Ext.getCmp(portListTabId);
		var panel = portListPanel.down('panel[itemId=grid]');
		var nisg=panel.getStore();
        var params = {neUuid:name,type:'ss7'};
        Ext.apply(nisg.proxy.extraParams, params);		
		
        var store = ftgpPanel.down('splitbutton[itemId=autoRefresh]').aStore;
        Ext.apply(store.proxy.extraParams, params);
        
		this.run(operationPanel,containerId);
		
		ip.initTree(panel,'ss7l');
		
		ftgpPanel.setSize(size.width,size.height);
		ftgpPanel.setVisible(true);
	},
	FPRI:function(operationPanel,name,parentNode,size,containerId,portListTabId){
		var ftgpPanel=Ext.getCmp(containerId);
		if(ftgpPanel==undefined || ftgpPanel==null){
			ftgpPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.FPriPanel',{
				id:containerId
			});
			operationPanel.add(ftgpPanel);
			operationPanel.doLayout();
		}
		ftgpPanel.setVisible(true);
		
		var eastSearch=ftgpPanel.down('panel[itemId=detail]');
        if(eastSearch && !eastSearch.isHidden()){
 			eastSearch.collapse(false);
 		}
		var portListPanel=Ext.getCmp(portListTabId);
		var panel = portListPanel.down('panel[itemId=grid]');
		var nisg=panel.getStore();
        var params = {neUuid:name,type:'pri'};
        Ext.apply(nisg.proxy.extraParams, params);		
		
        var store = ftgpPanel.down('splitbutton[itemId=autoRefresh]').aStore;
        Ext.apply(store.proxy.extraParams, params);
        
		this.run(operationPanel,containerId);
		
		ip.initTree(panel,'pril');
		
		ftgpPanel.setSize(size.width,size.height);
		ftgpPanel.setVisible(true);
	},
	FSIP:function(operationPanel,name,parentNode,size,containerId,portListTabId){
		var ftgpPanel=Ext.getCmp(containerId);
		if(ftgpPanel==undefined || ftgpPanel==null){
			ftgpPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.FSipPanel',{
				id:containerId
			});
			operationPanel.add(ftgpPanel);
			operationPanel.doLayout();
		}
		ftgpPanel.setVisible(true);
		
		var eastSearch=ftgpPanel.down('panel[itemId=detail]');
        if(eastSearch && !eastSearch.isHidden()){
 			eastSearch.collapse(false);
 		}

		
		var portListPanel=Ext.getCmp(portListTabId);
		var panel = portListPanel.down('panel[itemId=grid]');
		var nisg=panel.getStore();
        var params = {neUuid:name,type:'sip'};
        Ext.apply(nisg.proxy.extraParams, params);		
		
        var store = ftgpPanel.down('splitbutton[itemId=autoRefresh]').aStore;
        Ext.apply(store.proxy.extraParams, params);
        
		this.run(operationPanel,containerId);
		
		ip.initTree(panel,'sipl');
		
		ftgpPanel.setSize(size.width,size.height);
		ftgpPanel.setVisible(true);
	},
	
	FAGP:function(operationPanel,name,parentNode,size,containerId,portListTabId){
		var ftgpPanel=Ext.getCmp(containerId);
		if(ftgpPanel==undefined || ftgpPanel==null){
			ftgpPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.FAgpPanel',{
				id:containerId
			});
			operationPanel.add(ftgpPanel);
			operationPanel.doLayout();
		}
		ftgpPanel.setVisible(true);
		var eastSearch=ftgpPanel.down('panel[itemId=detail]');
        if(eastSearch && !eastSearch.isHidden()){
 			eastSearch.collapse(false);
 		}
		var portListPanel=Ext.getCmp(portListTabId);
		var panel = portListPanel.down('panel[itemId=grid]');
		var nisg=panel.getStore();
        var params = {neUuid:name,type:'agp'};
        Ext.apply(nisg.proxy.extraParams, params);	
        
        
        var panel2 = ftgpPanel.down('form[itemId=portMap]');
//        console.log(panel2);
		var nisg2=panel2.store;
        var params = {neUuid:name,type:'agp'};
        Ext.apply(nisg2.proxy.extraParams, params);
        
		
        var store = portListPanel.down('splitbutton[itemId=autoRefresh]').aStore;
        Ext.apply(store.proxy.extraParams, params);

        var store = ftgpPanel.down('form[itemId=portMap]').down('splitbutton[itemId=autoRefresh]').aStore;
        Ext.apply(store.proxy.extraParams, params);
        
		this.run(operationPanel,containerId);
		ip.initTree(panel,'agpl');
		
		ftgpPanel.setSize(size.width,size.height);
		ftgpPanel.setVisible(true);
	},
	
	FLAN:function(operationPanel,name,parentNode,size,containerId,portListTabId){
		var ftgpPanel=Ext.getCmp(containerId);
		if(ftgpPanel==undefined || ftgpPanel==null){
			ftgpPanel=Ext.create('app.view.operation.domain.roamzone.site.nes.FLanPanel',{
				id:containerId
			});
			operationPanel.add(ftgpPanel);
			operationPanel.doLayout();
		}
		ftgpPanel.setVisible(true);
		
		var eastSearch=ftgpPanel.down('panel[itemId=detail]');
        if(eastSearch && !eastSearch.isHidden()){
 			eastSearch.collapse(false);
 		}

		
		var portListPanel=Ext.getCmp(portListTabId);
		var panel = portListPanel.down('panel[itemId=grid]');
		var nisg=panel.getStore();
        var params = {neUuid:name,type:'lan'};
        Ext.apply(nisg.proxy.extraParams, params);		
		
        var store = ftgpPanel.down('splitbutton[itemId=autoRefresh]').aStore;
        Ext.apply(store.proxy.extraParams, params);
        
		this.run(operationPanel,containerId);
		
		ip.initTree(panel,'lanl');
		
		ftgpPanel.setSize(size.width,size.height);
		ftgpPanel.setVisible(true);
	},
	
	TGPORT:function(operationPanel,name,parentNode,size
			,containerId){
		var tgpInfoPanel=Ext.getCmp(containerId);
		var params = {params : {tgpUuid:name}};
		if(tgpInfoPanel==null|| tgpInfoPanel==undefined){
			tgpInfoPanel=Ext.create('app.view.module.TgpInfoPanel',{
				id:containerId,
				params:params,
				closable:false,
				isInfoPanel:1,
			});
			operationPanel.add(tgpInfoPanel);
			operationPanel.doLayout();
		}
		tgpInfoPanel.store.load(params);
		tgpInfoPanel.setSize(size.width,size.height);
		tgpInfoPanel.setVisible(true);
	},
	FSUSER:function(operationPanel,name,parentNode,size
			,containerId){
		var fsuserPanel=Ext.getCmp(containerId);
		if(fsuserPanel==null|| fsuserPanel==undefined){
			fsuserPanel=Ext.create('app.view.operation.user.FSUserPanel',{
				id:containerId,
			});
			operationPanel.add(fsuserPanel);
			operationPanel.doLayout();
		}
		fsuserPanel.cloudUuid=parentNode.raw.tid;
		fsuserPanel.setVisible(true);
		var fuserTab=fsuserPanel.down('panel[itemId=grid]');
		fuserTab.up('panel').up('panel').down('form').getForm().reset();
		fuserTab.treeName=name;
		fuserTab.parentNodeTid=parentNode.raw.tid;
		var userTabStore=fuserTab.getStore();
		var params = { cloudUuid:parentNode.raw.tid,domainUuid:parentNode.raw.tid};
		Ext.apply(userTabStore.proxy.extraParams, params);

		this.run(operationPanel,containerId);

		fsuserPanel.setSize(size.width,size.height);
		fsuserPanel.setVisible(true);
	},
	UDOMAIN:function(operationPanel,name,parentNode,size
			,containerId){
		var userInDomain=Ext.getCmp(containerId);
		if(userInDomain==undefined||userInDomain==null){
			userInDomain=Ext.create('app.view.user.UserInDomain',{
				id:containerId,
			});
			operationPanel.add(userInDomain);
			operationPanel.doLayout();
		}
		userInDomain.setVisible(true);
		var uDomainTab=userInDomain.down('panel[itemId=grid]');
		uDomainTab.up('panel').up('panel').down('form').getForm().reset();
		uDomainTab.treeName=name;
		uDomainTab.domainUuid = name;
		var userTabStore=uDomainTab.getStore();
		var params = { domainUuid:name,roleId:roleType.getDomainAdmin()};
		Ext.apply(userTabStore.proxy.extraParams, params);
		this.run(operationPanel,containerId);
		
		userInDomain.setSize(size.width,size.height);
		userInDomain.setVisible(true);
	},
	USER:function(operationPanel,name,parentNode,size
			,containerId){
		var userPanel=Ext.getCmp(containerId);
		if(userPanel==null || userPanel==undefined){
			userPanel=Ext.create('app.view.operation.user.UserPanel',{
				id:containerId
			});
			operationPanel.add(userPanel);
			operationPanel.doLayout();
		}
		userPanel.setVisible(true);		
		var userTab=userPanel.down('form');
		var userInfoStore=userTab.store;
        var params = { uuid:name};
        Ext.apply(userInfoStore.proxy.extraParams, params);		
        this.run(operationPanel,containerId);

		userPanel.setSize(size.width,size.height);
		userPanel.setVisible(true);
	},
	SIPSERVER:function(operationPanel,name,parentNode,size
			,containerId,neTabId){
		var sipServerTab=Ext.getCmp(containerId);
		if(sipServerTab==null || sipServerTab==undefined){
			sipServerTab= Ext.create("app.view.operation.domain.config.SipServerPanel",{id:containerId,agTabId:neTabId});
			operationPanel.add(sipServerTab);
			operationPanel.doLayout();
		}
		sipServerTab.setVisible(true);
		var config_sipserver=Ext.getCmp(neTabId);
		config_sipserver.forceRefresh=1;
		var grid=config_sipserver.down('panel[itemId=grid]');
		grid.up('panel').up('panel').down('form').getForm().reset();
		var domainUuid=parentNode.parentNode.raw.tid;
		grid.treeId = domainUuid;
		var params = { domainUuid:domainUuid,alias:''
        		,productSnStr:'',primarySipServer:''
        		,primarySipsrvPort:'',secondarySipServer:''
        		,secondarySipsrvPort:'',productIds:'17,18,20,21,22,23'};
		Ext.apply(grid.store.proxy.extraParams, params);
		
// var activateTab=sipServerTab.down('panel').getActiveTab();
//		
//		
// if(activateTab.down('pagingtoolbar')){
// activateTab.forceRefresh=0;
// activateTab.down('pagingtoolbar').moveFirst();
// }else{
// if(activateTab.params){
// activateTab.forceRefresh=0;
// activateTab.store.load(activateTab.params);
// }
// }
		this.run(operationPanel,containerId);
		
		sipServerTab.setSize(size.width,size.height);
		sipServerTab.setVisible(true);
	},
	DEVICEUPGRADE:function(operationPanel,name,parentNode,size
			,containerId,neTabId){
		var upgradePanel=Ext.getCmp(containerId);
		if(upgradePanel==null || upgradePanel==undefined){
			upgradePanel= Ext.create("app.view.operation.domain.config.UpgradePanel",{id:containerId,neTabId:neTabId});
			operationPanel.add(upgradePanel);
			operationPanel.doLayout();
		}
		
		var upgradeNetab=Ext.getCmp(neTabId);
		upgradeNetab.forceRefresh=1;
		
		var grid=upgradeNetab.down('panel[itemId=grid]');
		grid.up('panel').up('panel').down('form').getForm().reset();
		var domainUuid=parentNode.parentNode.raw.tid;
		upgradePanel.treeId = domainUuid;
		upgradeNetab.treeId=domainUuid;
		var params = { domainUuid:domainUuid,alias:''
        		,productSn:'',adminStatus:0
        		,runStatus:0,productName:''
        		,version:''};
		Ext.apply(grid.store.proxy.extraParams, params);
		
// var activateTab=upgradePanel.down('panel').getActiveTab();
//	
// if(activateTab.down('pagingtoolbar')){
// activateTab.forceRefresh=0;
// activateTab.down('pagingtoolbar').moveFirst();
// }else{
// if(activateTab.params){
// activateTab.forceRefresh=0;
// activateTab.store.load(activateTab.params);
// }
// }
		this.run(operationPanel,containerId);
		upgradePanel.setSize(size.width,size.height);
		upgradePanel.setVisible(true);
	},
	ALARMCONFIG:function(operationPanel,name,parentNode,size
			,containerId,alarmTabId){
		var alarmConfigPanel=Ext.getCmp(containerId);
		if(alarmConfigPanel==null || alarmConfigPanel==undefined){
			alarmConfigPanel= Ext.create("app.view.operation.domain.config.AlarmDescSettingPanel",{id:containerId,alarmDescId:alarmTabId});
			operationPanel.add(alarmConfigPanel);
			operationPanel.doLayout();
		}
		
//		var alarmDescTab=Ext.getCmp(alarmTabId);
//		alarmDescTab.forceRefresh=1;
//		var grid=alarmDescTab.down('panel[itemId=grid]');
//		var domainUuid=parentNode.parentNode.raw.tid;
//		alarmConfigPanel.domainUuid = domainUuid;
//		alarmDescTab.treeId=domainUuid;
//		var params = { domainUuid:domainUuid,alarmId:''
//			,alarmName:'',alarmLevel:-1
//			,taddAlarmName:'',taddAlarmLevel:-1};
//		Ext.apply(grid.store.proxy.extraParams, params);
		var licCardPanel = alarmConfigPanel;
		var domainDescGrid = licCardPanel.down('panel[itemId=domainDescGrid]');
		if(domainDescGrid){
			var store = domainDescGrid.store;
            var params = {alarmId:null,alarmName:"",alarmDesc:''
            	,domainUuid:parentNode.parentNode.raw.tid,alarmLevel:-1};
            Ext.apply(store.proxy.extraParams, params);
            var form = domainDescGrid.up('panel').up('panel').down('form');
            var search = form.up('panel').collapse();
            form.getForm().reset();
		}
		this.run(operationPanel,containerId);
		
		alarmConfigPanel.setSize(size.width,size.height);
		alarmConfigPanel.setVisible(true);
	},
	SYSLOGMAIN:function(operationPanel,name,parentNode,size
			,containerId,syslogTabId,fileTabId){
		var sysLogMainPanel=Ext.getCmp(containerId);
		if(sysLogMainPanel==null || sysLogMainPanel==undefined){
			sysLogMainPanel=Ext.create('app.view.operation.domain.config.SyslogMainPanel',{id:containerId,
				syslogTabId:syslogTabId,syslogFileTabId:fileTabId});
			operationPanel.add(sysLogMainPanel);
			operationPanel.doLayout();
		}
		var syslogTab=Ext.getCmp(syslogTabId);
		syslogTab.forceRefresh=1;
		
		var syslogFile=Ext.getCmp(fileTabId);
		syslogFile.forceRefresh=1;
	
		var domainUuid=parentNode.parentNode.raw.tid;

		sysLogMainPanel.domainUuid = domainUuid;
		syslogTab.domainUuid=domainUuid;
		syslogFile.domainUuid=domainUuid;
		
		var grid=syslogTab.down('panel[itemId=grid]');
		grid.up('panel').up('panel').down('form').getForm().reset();
		var params = { moduleId:'syslog',domainUuid:domainUuid,alias:''
    		,productSn:'',adminStatus:0,runStatus:0,
    		syslogStatus:-1,syslogDebugLevel:-2,cdrLogFlag:-1,signalLogFlag:-1,mediaLogFlag:-1,systemLogFlag:-1,mngLogFlag:-1};
		Ext.apply(grid.store.proxy.extraParams, params);

		var fileGrid=syslogFile.down('panel[itemId=grid]');
		fileGrid.up('panel').up('panel').down('form').getForm().reset();
		var file_params = { moduleId:'syslog',domainUuid:domainUuid,productSn:''};
		Ext.apply(fileGrid.store.proxy.extraParams, file_params);

		var activateTab=syslogTab.up('panel').getActiveTab();
		   
// activateTab.forceRefresh=0;
// if(activateTab.down('pagingtoolbar')){
// activateTab.down('pagingtoolbar').moveFirst();
// }else{
// if(activateTab.params){
// activateTab.store.load(activateTab.params);
// }else if(activateTab.down('panel').store){
// activateTab.down('panel').store.load();
// }
// }
		this.run(operationPanel,containerId);
		
		sysLogMainPanel.setSize(size.width,size.height);
		sysLogMainPanel.setVisible(true);
	},
	
	ALARMMAIN:function(operationPanel,name,parentNode,size
			,containerId,curAlarmTabId){
		var alarmMainPanel=Ext.getCmp(containerId);
		if(alarmMainPanel==null ||alarmMainPanel==undefined){
			alarmMainPanel=Ext.create('app.view.operation.domain.config.AlarmMainPanel',{id:containerId});
			operationPanel.add(alarmMainPanel);
			operationPanel.doLayout();
		}
		var domainUuid=parentNode.parentNode.raw.tid
		var params = { domainUuid:domainUuid,neAlias:'',alarmName:''
	        	,causeName:'',objectTypeName:'',alarmLevel:-1,cleanFlag:0
	        	,cleanTimeB:'',cleanTimeE:'',recvTimeB:'',recvTimeE:''
	        		,reportTimeB:'',reportTimeE:'',productSnStr:''};
        Ext.apply(Ext.getCmp(curAlarmTabId).gridStore.proxy.extraParams, params);
// Ext.getCmp(curAlarmTabId).down('pagingtoolbar').moveFirst();
        
        var hisPanel = Ext.getCmp("mainHistoryAlarmPanel");
        if(hisPanel){
        	var hisStore = hisPanel.down('panel[itemId=grid]').store;
            var curStore = Ext.getCmp("mainHistoryAlarmPanel").down('panel[itemId=grid]').store;
            var params = { domainUuid:domainUuid,neUuid:0,cleanFlag:null, alarmType:null, cleanTimeB:null
    				, cleanTimeE:null, recvTimeB:null, recvTimeE:null, reportTimeB:null, reportTimeE:null
    				, alarmLevel:null, neAlias:null, objectTypeName:null, alarmName:null, causeName:null
    				, productSnStr:null};
            Ext.apply(hisStore.proxy.extraParams, params);
        }
        
        this.run(operationPanel,containerId);
		
		alarmMainPanel.setSize(size.width,size.height);
		alarmMainPanel.setVisible(true);
	},
	
	PUBCLOUDBK:function(operationPanel,name,parentNode,size
			,containerId,backupTabId){
		var panel=Ext.getCmp(containerId);
		if(panel==undefined || panel==null){
			panel=Ext.create('app.view.common.DomainBackupPanel',{
				id:containerId
			});
			operationPanel.add(panel);
			operationPanel.doLayout();
		}
		panel.setVisible(true);
		var backupListPanel=Ext.getCmp(backupTabId);
		backupListPanel.cloudUuid=parentNode.raw.tid;
		var eastSearch=backupListPanel.down('panel[itemId=search]');
		var grid = backupListPanel.down('panel[itemId=grid]');
		grid.up('panel').up('panel').down('form').getForm().reset();
		var nisg=grid.getStore();
        var params = {domainName:parentNode.parentNode.raw.name,type:2,serverUuid:0};
        Ext.apply(nisg.proxy.extraParams, params);		

		this.run(operationPanel,containerId);
		
		panel.setSize(size.width,size.height);
		panel.setVisible(true);
	},
	LOCALSRVBK:function(operationPanel,name,parentNode,size
			,containerId,backupTabId){
		var panel=Ext.getCmp(containerId);
		if(panel==undefined || panel==null){
			panel=Ext.create('app.view.common.ServerBackupPanel',{
				id:containerId
			});
			operationPanel.add(panel);
			operationPanel.doLayout();
		}
		panel.setVisible(true);
		panel.cloudUuid=parentNode.raw.tid;
		var backupListPanel=Ext.getCmp(backupTabId);
		backupListPanel.cloudUuid=parentNode.raw.tid;
		var eastSearch=backupListPanel.down('panel[itemId=search]');
		var grid = backupListPanel.down('panel[itemId=grid]');
		grid.up('panel').up('panel').down('form').getForm().reset();
		var nisg=grid.getStore();
        var params = {domainName:parentNode.parentNode.raw.name,type:1,serverUuid:0};
        Ext.apply(nisg.proxy.extraParams, params);		

		this.run(operationPanel,containerId);
		
		panel.setSize(size.width,size.height);
		panel.setVisible(true);
	},
	BLACKWHITE:function(operationPanel,name,parentNode,size
			,containerId,sTabId,dTabId){
		var panel=Ext.getCmp(containerId);
		if(panel==undefined || panel==null){
			panel=Ext.create('app.view.operation.domain.BlackWhitePanel',{
				id:containerId
			});
			operationPanel.add(panel);
			operationPanel.doLayout();
		}
		panel.setVisible(true);
		var store = panel.store;
        var params = {uuid:parentNode.parentNode.raw.tid};
        Ext.apply(store.proxy.extraParams, params);
        store.load();
//		panel.cloudUuid=parentNode.raw.tid;
		var backupListPanel=Ext.getCmp(sTabId);
		var eastSearch=backupListPanel.down('panel[itemId=search]');
		eastSearch.down('form').getForm().reset();
		var grid = backupListPanel.down('panel[itemId=numGrid]');
		var domainUuid = parentNode.parentNode.raw.tid
		grid.domainUuid = domainUuid;
		var nisg=grid.getStore();
        var params = {domainUuid:domainUuid,type:0,number:"",staticFlag:1};
        Ext.apply(nisg.proxy.extraParams, params);
        
		var backupListPanel=Ext.getCmp(dTabId);
		var eastSearch=backupListPanel.down('panel[itemId=search]');
		eastSearch.down('form').getForm().reset();
		var grid = backupListPanel.down('panel[itemId=numGrid]');
		var domainUuid = parentNode.parentNode.raw.tid
		grid.domainUuid = domainUuid;
		var nisg=grid.getStore();
        var params = {domainUuid:domainUuid,type:0,number:"",staticFlag:0};
        Ext.apply(nisg.proxy.extraParams, params);

		this.run(operationPanel,containerId);
		
		panel.setSize(size.width,size.height);
		panel.setVisible(true);
	},
	DMNUM:function(operationPanel,name,parentNode,size
			,containerId){
		var panel=Ext.getCmp(containerId);
		if(panel==undefined || panel==null){
			panel=Ext.create('app.view.dm.NumDMPanel',{
				id:containerId
			});
			operationPanel.add(panel);
			operationPanel.doLayout();
		}
		panel.setVisible(true);
		var eastSearch=panel.down('panel[itemId=search]');
		eastSearch.down('form').getForm().reset();
		var grid = panel.down('panel[itemId=numGrid]');
		var domainUuid = parentNode.parentNode.raw.tid
		grid.domainUuid = domainUuid;
		var nisg=grid.getStore();
        var params = {domainUuid:domainUuid,type:0,number:"",action:0};
        Ext.apply(nisg.proxy.extraParams, params);

		this.run(operationPanel,containerId);
		
		panel.setSize(size.width,size.height);
		panel.setVisible(true);
	},
	
	
	FORBIDDEN:function(operationPanel,name,parentNode,size
			,containerId){
		var panel=Ext.getCmp(containerId);
		if(panel==null ||panel==undefined){
			panel=Ext.create('app.view.privilege.Forbidden',{});
			operationPanel.add(panel);
			operationPanel.doLayout();
		}
		panel.setSize(size.width,size.height);
		panel.setVisible(true);
	},
	resize:function(id){
		var operationPanel=Ext.getCmp(id);
		if(operationPanel){
			var size=operationPanel.getSize();
			for(var i=0; i<operationPanel.items.items.length; i++){
				if(operationPanel.items.items[i].isVisible()){
					operationPanel.items.items[i].setSize(size.width,size.height);
				}
			}
		}
	},
	beforeload:function(containerId){
		var container = Ext.getCmp(containerId)
		var tabPanel = Ext.getCmp(containerId).down('tabpanel');
		if(tabPanel){
			for(var i=0; i<tabPanel.items.items.length; i++){
				var tab = tabPanel.getComponent(i);
				this.setLoadFlag(tab);
			}
		}else{
			this.setLoadFlag(container);
		}
	},
	setLoadFlag:function(tab){
		if(tab.down("pagingtoolbar")){
			tab.down("pagingtoolbar").store.loadFlag = true;
		}else if(tab.comboxStore){
			tab.comboxStore.loadFlag = true;
		}else if(tab.store){
			tab.store.loadFlag = true;
		}else if(tab.originStore){
			tab.originStore.loadFlag = true;
		}
	},
	load:function(activeTab){
		if(activeTab.down("pagingtoolbar")){
			activeTab.down("pagingtoolbar").moveFirst();
			activeTab.down("pagingtoolbar").store.loadFlag = false;
		}else if(activeTab.comboxStore){
			activeTab.comboxStore.load();
			activeTab.comboxStore.loadFlag = false;
		}else if(activeTab.store){
			if(activeTab.params){
				activeTab.store.load(activeTab.params);
			}else{
				activeTab.store.load();
			}
			activeTab.store.loadFlag = false;
		}else if(activeTab.originStore){
			activeTab.originStore.load();
			activeTab.originStore.loadFlag = false;
		}
	},
	procTab:function(operationPanel,containerId){		
		var tabPanel = Ext.getCmp(containerId).down('tabpanel');
		tabPanel.needChange = false;
		for(var j=tabPanel.items.items.length-1; j>=0 ; j--){
			if(j >= tabPanel.initTabNum){				
				tabPanel.remove(tabPanel.getComponent(j),false);
			}
		}
		
		var key = this.record.raw.eType+'_'+this.record.raw.tid;
		var arr = tabPanel.newArrs[key];
		if(arr){
			for(var i=0; i<arr.length; i++){
				if(arr[i])
				tabPanel.add(arr[i]);
			}
		}
		var index = tabPanel.activeArr[key];
		
// if(!index){
// index = 0;
// }
		if(index<tabPanel.initTabNum){
			if(this.specProc(this.record)){				
				// for monitor
				var tmp = 0;
				if(operationPanel.id.indexOf("monitor")>=0){
					if(!tabPanel.down('tabpanel')){
						index = operationPanel.activeArr['DEVICE1'];
					}else{
						var key1 = this.record.raw.eType;
						index = tabPanel.activeArr[key1];
						if(index <= 2)
							index = operationPanel.activeArr['DEVICE'];
					}
				}else{
					index = operationPanel.activeArr['DEVICE'];
				}
			}else{
				var key1 = this.record.raw.eType;
				index = tabPanel.activeArr[key1];
			}
// if(!index){
// index = 0;
// }
			
		}
//		console.log(this.openLink);
		if(this.openLink!=''){
			var etype=this.record.raw.eType.toUpperCase();
			if(operationPanel.id.indexOf("maintenance")>=0){
				// set alarm list auto show
				if(etype=='TG' || etype=='DOMAIN'){
					index=2;
				}else if(etype=='AG'){
					index=3;
				}
			}
		}
		var ip_eType=operationPanel.activeArr['eType'];
		var ip_index=operationPanel.activeArr['index'];
		if(ip_eType!=undefined && ip_index !=undefined){
			ip.insertDB(ip_eType,0,'show',ip_index);
		}
		if(index!=undefined){
			tabPanel.setActiveTab(tabPanel.getComponent(index));
		}else{
			var tempEtype=this.record.raw.eType;
			var tempIndex=0;
			if(tempEtype=='blackwhite'){
				tempIndex=0;
			}else{
				tempIndex=ip.readDB(tempEtype,0,'show');
			}
			if(tempIndex!=undefined){
				tabPanel.setActiveTab(tabPanel.getComponent(parseInt(tempIndex)));
			}else{
				tabPanel.setActiveTab(tabPanel.getComponent(0));
			}
		}
		tabPanel.needChange = true;
	},
	saveTabStatus:function(operationPanel,containerId){
		var container = Ext.getCmp(containerId);
		if(!container)
			return;
		
		var tabPanel = container.down('tabpanel');
		var activeTab = tabPanel.getActiveTab();
		if(!tabPanel.newArrs)
			tabPanel.newArrs = new Array();
		if(!tabPanel.activeArr)
			tabPanel.activeArr = new Array();
		if(!operationPanel.activeArr){
			operationPanel.activeArr = new Array();
		}
// if(!operationPanel.activeArr['DEVICE'])
// operationPanel.activeArr['DEVICE'] = 0;
		
		// for monitor
		if(!operationPanel.activeArr['DEVICE1'])
			operationPanel.activeArr['DEVICE1'] = 0;
		if(!container.record){
			var key = this.record.raw.eType+'_'+this.record.raw.tid;
			tabPanel.newArrs[key] = null;			
			var key1 = this.record.raw.eType;
		}else{
			var key = container.record.raw.eType+'_'+container.record.raw.tid;
			var index = tabPanel.items.indexOf(activeTab);
			tabPanel.activeArr[key] = index;			
			if(index<tabPanel.initTabNum){
				var key1 = container.record.raw.eType;
				tabPanel.activeArr[key1] = index;
			}
			var arr0 = new Array();
			tabPanel.newArrs[key] = arr0;

			for(var i=0; i<tabPanel.items.items.length; i++){
				if(i >= tabPanel.initTabNum){
					var tab = tabPanel.getComponent(i);
					var index = arr0.indexOf(tab);
					if(index == -1){
						arr0.push(tab);
					}else{
						arr0[index] = tab;
					}
				}
			}
		}
		container.record = this.record;
	},
	specProc:function(record){
		var eType = record.raw.eType.toUpperCase();
		if(eType=='GW'
			|| eType=='BK'
			|| eType=='AG'
			|| eType=='TG'){
			return true;
		}
		return false;
	},
	run:function(operationPanel,containerId){
		this.saveTabStatus(operationPanel,containerId);
		this.procTab(operationPanel,containerId);
		this.beforeload(containerId);
		var tab = Ext.getCmp(containerId).down('tabpanel').getActiveTab();
		var button = Ext.getCmp(containerId).down('splitbutton[itemId=autoRefresh]');
		if(button){
			autoRefresh.stopOther(button);
// var button2 = tab.down('splitbutton[itemId=autoRefresh]');
// if(button2 && autoRefresh.isAuto(button2)){
// return;
// }
		}else{
			autoRefresh.stopAll();
		}
		this.load(tab);
	},
	refreshNode:function(operationTree,nid,isSelf){
		try{
			var otree=Ext.getCmp(operationTree);
			otree.getEl().unmask();
			var store=otree.getStore();
			var nt=otree.getRootNode().findChild('nid',nid,true);
			var uuid=nt.raw.uuid;
			if(isSelf){
				store.load({node:nt,params:{uuid:uuid,needRefresh:1}});
			}else{
				store.load({node:nt,params:{pid:uuid,needRefresh:1}});
			}
			otree.getEl().unmask();
		}catch(e){
			console.log(e.message);
		}
		
	}
});
