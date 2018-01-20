Ext.require('Ext.chart.*');
Ext.require('Ext.layout.container.Fit');

Ext.define('app.view.monitor.MonitorPanel',{
	extend:'Ext.panel.Panel',
	layout:'auto',
	border:false,
	id:'monitorPanel',
	itemId:'rightPanel',
	bodyStyle: {
		background: '#DFE9F6',
	},
//	autoScroll:true,
	initComponent: function(){
//		var fGroupMonitorPanel = Ext.create('app.view.monitor.group.FGroupMonitorPanel', {});
//		
//		var groupMonitorPanel = Ext.create('app.view.monitor.group.GroupMonitorPanel', {});
//		
//		var simMonitorPanel = Ext.create('app.view.monitor.group.sim.SimMonitorPanel', {});
//		
//		var bkpSimTabPanel = Ext.create('app.view.monitor.domain.zone.port.BkpSimTabPanel',{});
//	    
//		var bkMonitorPanel = Ext.create('app.view.monitor.domain.zone.BkMonitorPanel', {});
//		
//		var siteMonitorPanel = Ext.create('app.view.monitor.domain.zone.SiteMonitorPanel', {});
//
//	    var neMonitorPanel = Ext.create('app.view.monitor.domain.zone.NeMonitorPanel', {});
//	   
//	    var nePortMonitorPanel = Ext.create('app.view.monitor.domain.zone.port.NePortMonitorPanel', {});
//	    
//	    var fDomainMonitorPanel = Ext.create('app.view.monitor.domain.FDomainMonitorPanel', {});
//	    var domainMonitorPanel = Ext.create('app.view.monitor.domain.DomainMonitorPanel', {});
//
//	    var fSysMonitorPanel = Ext.create('app.view.monitor.system.FSysMonitorPanel', {});
//	    var sysMonitorPanel = Ext.create('app.view.monitor.system.SysMonitorPanel', {});
//	    var noDateToShow = Ext.create('app.view.monitor.NoDateToShow', {});
//    
//	    this.items=[fGroupMonitorPanel,groupMonitorPanel,simMonitorPanel,bkpSimTabPanel,bkMonitorPanel,neMonitorPanel,
//	                siteMonitorPanel,nePortMonitorPanel,fDomainMonitorPanel,domainMonitorPanel,fSysMonitorPanel,sysMonitorPanel,noDateToShow];
	    this.items = [Ext.create('app.view.monitor.NoDateToShow', {id:'noDateToShow'})]
		this.callParent(arguments);	
	},
	listeners:{
		resize:function(win, width, height, eOpts){
		
			var treeFn = Ext.getCmp('treeFn');
			if(!treeFn){
				treeFn = Ext.create('app.util.TreeFn',{});
			}
			treeFn.resize('monitorPanel');
		
//			var monitorPanel=Ext.getCmp('monitorPanel');
			
//			if(monitorPanel){
//			
//				var xy=monitorPanel.getPosition();
//				var size=monitorPanel.getSize();
//				
//				var groupMonitorPanel=Ext.getCmp('groupMonitorPanel');
//				var fGroupMonitorPanel=Ext.getCmp('fGroupMonitorPanel');
//				var simMonitorPanel=Ext.getCmp('simMonitorPanel');
//				
//				var bkpSimTabPanel = Ext.getCmp('bkpSimTabPanel');
//				
//				var siteMonitorPanel = Ext.getCmp('siteMonitorPanel');
//				
//				var neMonitorPanel=Ext.getCmp('neMonitorPanel');
//				
//				var bkMonitorPanel=Ext.getCmp('bkMonitorPanel');
//
//				var nePortMonitorPanel=Ext.getCmp('nePortMonitorPanel');
//			
//				var fDomainMonitorPanel=Ext.getCmp('fDomainMonitorPanel');
//				var domainMonitorPanel=Ext.getCmp('domainMonitorPanel');
//
//				var fSysMonitorPanel=Ext.getCmp('fSysMonitorPanel');
//				var sysMonitorPanel=Ext.getCmp('sysMonitorPanel');
//				var noDateToShow=Ext.getCmp('noDateToShow');
//				
//				if(fSysMonitorPanel && fSysMonitorPanel.isVisible()){
//					fSysMonitorPanel.setPagePosition(xy[0],xy[1]);
//					fSysMonitorPanel.setSize(size.width,size.height);
//				}			
//				if(sysMonitorPanel && sysMonitorPanel.isVisible()){
//					sysMonitorPanel.setPagePosition(xy[0],xy[1]);
//					sysMonitorPanel.setSize(size.width,size.height);
//				}
//				if(fGroupMonitorPanel && fGroupMonitorPanel.isVisible()){
//					fGroupMonitorPanel.setPagePosition(xy[0],xy[1]);
//					fGroupMonitorPanel.setSize(size.width,size.height);
//				}
//				if(groupMonitorPanel && groupMonitorPanel.isVisible()){
//					groupMonitorPanel.setPagePosition(xy[0],xy[1]);
//					groupMonitorPanel.setSize(size.width,size.height);
//				}
//				if(bkpSimTabPanel && bkpSimTabPanel.isVisible()){
//					bkpSimTabPanel.setPagePosition(xy[0],xy[1]);
//					bkpSimTabPanel.setSize(size.width,size.height);
//				}
//				if(simMonitorPanel && simMonitorPanel.isVisible()){
//					simMonitorPanel.setPagePosition(xy[0],xy[1]);
//					simMonitorPanel.setSize(size.width,size.height);
//				}
//				if(siteMonitorPanel && siteMonitorPanel.isVisible()){
//					siteMonitorPanel.setPagePosition(xy[0],xy[1]);
//					siteMonitorPanel.setSize(size.width,size.height);
//				}
//				if(neMonitorPanel && neMonitorPanel.isVisible()){
//					neMonitorPanel.setPagePosition(xy[0],xy[1]);
//					neMonitorPanel.setSize(size.width,size.height);
//				}
//				if(bkMonitorPanel && bkMonitorPanel.isVisible()){
//					bkMonitorPanel.setPagePosition(xy[0],xy[1]);
//					bkMonitorPanel.setSize(size.width,size.height);
//				}
//				if(nePortMonitorPanel && nePortMonitorPanel.isVisible()){
//					nePortMonitorPanel.setPagePosition(xy[0],xy[1]);
//					nePortMonitorPanel.setSize(size.width,size.height);
//				}
//				if(fDomainMonitorPanel && fDomainMonitorPanel.isVisible()){
//					fDomainMonitorPanel.setPagePosition(xy[0],xy[1]);
//					fDomainMonitorPanel.setSize(size.width,size.height);
//				}
//				if(domainMonitorPanel && domainMonitorPanel.isVisible()){
//					domainMonitorPanel.setPagePosition(xy[0],xy[1]);
//					domainMonitorPanel.setSize(size.width,size.height);
//				}
//				if(noDateToShow && noDateToShow.isVisible()){
//					noDateToShow.setPagePosition(xy[0],xy[1]);
//					noDateToShow.setSize(size.width,size.height);
//				}
//			}
		}
	}
});