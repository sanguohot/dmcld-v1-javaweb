Ext.define('app.view.operation.MaintenanceTree',{
		extend:'Ext.tree.Panel',
		id:'maintenanceTree',
	    layout:'fit',
	    openLink:'', //record module open-source
	    enableColumnMove:false,
	    hideHeaders:true,
	    collapsible: false,
	    useArrows: true,
	    autoScroll:true,
	    rootVisible: false,
	    sortable:false,
	    menuDisabled:true,
	    multiSelect: true,
	    singleExpand: false,	
		columnLines: true,
		lines:false,
//		bodyStyle: 'background-color:#F5F5F5;',
		viewConfig: {
			loadMask:{
				msg:lanControll.getLanValue('maskMsg')
			}
  		},
//		viewConfig: {
//            plugins: {
//                ptype: 'treeviewdragdrop'
//            }
//        },

        initComponent: function(){
        	
			var s=Ext.create('app.store.operation.OperationStore',{});
			s.on('load',function(store, node, records,successful,eOpts){
				lanControll.cbTreeRecords(s.getRootNode());
			})
			s.load({params: {needRefresh:0,module:2}});
			this.store=s;
			this.callParent(arguments);
		},
        
			
        // the 'columns' property is now 'headers'
        columns: [{
            xtype: 'treecolumn', // this is so we know which column will show
            text: '',
            flex: 1,
            minWidth:275,
            sortable: false,
            dataIndex: 'name',
        }],
        mixins: {
            treeFilter: 'app.util.TreeFilter'
        },
        tbar:[{
			xtype: 'trigger',
			triggerCls: 'x-form-search-trigger',
			onTriggerClick: function () {
				this.setValue('');
				treeFn.triggerValue='';
				this.triggerEl.elements[0].removeCls('x-form-clear-trigger').addCls('x-form-search-trigger');
				Ext.getCmp("maintenanceTree").clearFilter();
			},
			emptyText:'search',
			flex:1,
			enableKeyEvents: true,
			listeners: {
				keyup: {
					fn: function (field, e) {
						if (Ext.EventObject.ALT == e.getKey()) {
							field.onTriggerClick();
						} else {
							if(this.getRawValue()!=""){
								this.triggerEl.elements[0].removeCls('x-form-search-trigger').addCls('x-form-clear-trigger');	
							}else{
								this.triggerEl.elements[0].removeCls('x-form-clear-trigger').addCls('x-form-search-trigger');
							}
							treeFn.triggerValue=this.getRawValue();
							Ext.getCmp("maintenanceTree").filterByText(this.getRawValue());
						}
					}
				},
				change:function(field, newValue,oldValue,eOpts ){
					if(this.getRawValue()!=""){
						this.triggerEl.elements[0].removeCls('x-form-search-trigger').addCls('x-form-clear-trigger');	
					}else{
						this.triggerEl.elements[0].removeCls('x-form-clear-trigger').addCls('x-form-search-trigger');
					}
					treeFn.triggerValue=this.getRawValue();
					Ext.getCmp("maintenanceTree").filterByText(this.getRawValue());
				}
			}
        },'-',{
//            text: 'Expand All',
//            handler: function(){
//                Ext.getCmp('maintenanceTree').expandAll();
//            }
//        }, {
//            text: 'Collapse All',
//            handler: function(){
//        		Ext.getCmp('maintenanceTree').collapseAll();
//            }
//        },{
            text: '',
            iconCls:'refresh2',
            handler: function(){
        		var store=Ext.getCmp('maintenanceTree').getStore();
				Ext.getCmp('maintenanceTree').down('treeview').loadMask.setDisabled(false);
        		try{
        			store.load({params: {needRefresh:1,module:2},});
        		}catch(e){
        			store.load({params: {needRefresh:1,module:2},});
        		}
            }
        }],

        listeners:{
			load:function(store, node, records,successful,eOpts ){
				if(node.childNodes[0]!=null&&node.childNodes[0].raw.eType=='fcloud'){
					var cns=node.childNodes[0].childNodes;
					for(var i=0;i<cns.length;i++){
						if(cns[i].raw.eType=='cloud'){
							var showNode=ip.readDB('maint_s_n',cns[i].raw.tid,'show');
							if(showNode==1){
								cns[i].expand(false);
							}
						}
					}
				}
				Ext.getCmp('maintenanceTree').setLoading(false);
			},
			itemexpand:function(node,eOpts ){
				if(node.raw.eType=='cloud'){
					ip.insertDB('maint_s_n',node.raw.tid,'show',1);
				}
			},
			itemcollapse:function(node,eOpts ){
				if(node.raw.eType=='cloud'){
					ip.insertDB('maint_s_n',node.raw.tid,'show',0);
				}
			},
        	itemclick:function(view,record,item,index,e){
        		
        		var icon=record.raw.iconCls;
        		var parentNode=record.parentNode;
	        	var operationPanel=Ext.getCmp('maintenancePanel');
				var xy=operationPanel.getPosition();
				var size=operationPanel.getSize();
        		var eType= record.raw.eType;
        		var name=record.raw.tid;
        		
        		
//    			
//    			var cmp = Ext.getCmp('idTabDisableCfg');
//    			if(cmp==undefined || cmp==null){
//    				cmp=Ext.create('app.view.maintenance.lib.TabDisableCfg',{});
//    			} 
        		for(var i=0; i<operationPanel.items.items.length; i++){
        			operationPanel.items.items[i].setVisible(false);
        		}
        		treeFn.openLink=this.openLink;
        		treeFn.record = record;
        		if(eType.toUpperCase()=='FCLOUD'){
        			treeFn.FCLOUD(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceFCloudPanel'
        					,'maintenanceCloudInFCloudPanel'
        					,'maintenanceSysInFCloudPanel'
        					,'maintenanceLocalSysInFCloudPanel'
        					,"maintenanceDomainInFCloudPanel"
        					,'maintenanceNesInFCloudTab'
        					,'maintenanceNeNasInFCloudTab');
        		}
        		
        		if(eType.toUpperCase()=='CLOUD'){
        			treeFn.CLOUD(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceCloudPanel'
        					,'maintenanceSysInCloudPanel'
        					,'maintenanceDomainInCloudPanel'
        					,'maintenanceNesInCloudTab');
        		}
        		
        		if(eType.toUpperCase()=='FSYSTEM'){
        			treeFn.FSYSTEM(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceFSystemPanel'
        					,'maintenanceDomainInFSysPanel'
        					,'maintenanceNesInFSystemTab');
        		}
        		
        		if(eType.toUpperCase()=='FLOCALSERVER'){
        			treeFn.FLOCALSERVER(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceFLocalSystemPanel'
        					);
        		}
        		
        		if(eType.toUpperCase()=='SYSTEM'){
        			treeFn.SYSTEM(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceSystemPanel'
        					,'maintenanceDomainInSysPanel'
        					,'maintenanceNesInSystemTab'
        					);
        		}
        		
        		if(eType.toUpperCase()=='LOCALSERVER'){
        			treeFn.LOCALSERVER(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceLocalSystemPanel'
        					);
        		}
        		
        		if(eType.toUpperCase()=='PROC'){
        			treeFn.PROC(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceProcessPanel');
        		}

        		if(eType.toUpperCase()=='FDOMAIN'){
        			treeFn.FDOMAIN(
        					ip
        					,operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceFdomainPanel'
        					,'maintenanceDomainInFDomainPanel'
        					,'maintenanceNesInCloudTab');        			
        		}

        		if(eType.toUpperCase()=='FNODE'){
        			treeFn.FNODE(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceFNodePanel');          			
        		}
        		// fnode group
        		if(eType.toUpperCase()=='FNODEGROUP'){
        			treeFn.FNODEGROUP(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceFNodeGroupPanel');
        		}
        		// fnode group
        		if(eType.toUpperCase()=='NODEGROUP'){
        			treeFn.NODEGROUP(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceNodeGroupPanel'
        					,'maintenanceNodeListPanel');
        		}
        		
        		if(eType.toUpperCase()=='NODE'){
        			treeFn.NODE(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceNodePanel');
        		}
        		
        		if(eType.toUpperCase()=='DOMAIN'){
        			treeFn.DOMAIN(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceDomainPanel'
        					,'maintenanceNesInDomainTab'
        					,'maintenanceNeGmap'
        					,'maintenanceNeNasInDomainTab');
        		}
        		
        		
        		if(eType.toUpperCase()=='FPOLICY'){
        			treeFn.FPOLICY(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceFpolicyPanel');
        		}
        		
        		if(eType.toUpperCase()=='POLICY'){
        			treeFn.POLICY(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenancePolicyPanel'
        					,'maintenanceRuleInPolicyTab');
        		}
        		
        		
        		if(eType.toUpperCase()=='RULE'){
        			treeFn.RULE(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceRulePanel');
        		}
        		
        		if(eType.toUpperCase()=='FGROUP'){
        			treeFn.FGROUP(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceFgroupPanel');
        		}
        		
        		if(eType.toUpperCase()=='FPAIDGROUP'){
        			treeFn.FPAIDGROUP(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceFPaidGroupPanel');
        		}
        		
        		if(eType.toUpperCase()=='PAIDGROUP'){
        			treeFn.PAIDGROUP(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenancePaidGroupPanel'
        					,'maintenancePaidListTab');
        		}
        		
        		if(eType.toUpperCase()=='GROUP'){
        			treeFn.GROUP(
        					ip
        					,operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceGroupPanel'
        					,'maintenanceSimCardTab'
        					,'maintenanceSimSmlTab'
        					,'maintenanceSimCallTab'
        					,'maintenanceSimUsslTab'
        					,'maintenanceCallInGroupTab'
        					,'maintenanceSmsInGroupTab'
        					,'maintenanceUssdInGroupTab');
        		}
        		
        		if(eType.toUpperCase()=='FROAMZONE'){
        			treeFn.FROAMZONE(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceFroamzonePanel',
        					'maintenanceSiteInFZoneTab',
        					'maintenanceNesInFZoneTab');
        		}

        		
        		if(eType.toUpperCase()=='ROAMZONE'){
        			treeFn.ROAMZONE(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceRoamzonePanel',
        					'maintenanceSiteInZoneTab',
        					'maintenanceNesInZoneTab');
        		}
        		
        		if(eType.toUpperCase()=='SITE'){
        			treeFn.SITE(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceSitePanel'
        					,'maintenanceNesInSiteTab');
        		}
        		
        		if(eType.toUpperCase()=='BK'){
        			treeFn.BK(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceBkPanel'
        					,'maintenanceBkpPort'
        					,'maintenanceBkpInNe');
        		}
        		
        		
        		if(eType.toUpperCase()=='GW'){
        			treeFn.GW(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceGwPanel'
        					,'maintenanceGwpPort'
        					,'maintenanceGwpInNe');
        		}
        		
        		if(eType.toUpperCase()=='GWPORT'){
        			treeFn.GWPORT(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceGwpInfoPanel');
        		}

        		if(eType.toUpperCase()=='BKPORT'){
        			treeFn.BKPORT(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceBkpInfoPanel');
        		}
        		
        		if(eType.toUpperCase()=='AG'){
        			treeFn.AG(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenance_agInfoPanel'
        					,'maintenance_agpTab'
        					,'maintenance_agpInNe');
        		}
        		
        		if(eType.toUpperCase()=='AGPORT'){
        			treeFn.AGPORT(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenance_agpInfoPanel');
        		}
        		if(eType.toUpperCase()=='TG'){
        			treeFn.TG(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenance_tgInfoPanel'
        					,'maintenance_tgpTab'
        					,'maintenance_tgpInNe');
        		}
        		
        		if(eType.toUpperCase()=='FTGP'){
        			treeFn.FTGP(        					
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'maintenance_ftgpPanel'
        					,'maintenanceTgpInFTgpPanel');
        		}
        		if(eType.toUpperCase()=='FETH'){
        			treeFn.FETH(        					
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'maintenance_fEthPanel'
        					,'maintenanceEthInFEthPanel');
        		}
        		if(eType.toUpperCase()=='FDSP'){
        			treeFn.FDSP(        					
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'maintenance_fDspPanel'
        					,'maintenanceDspInFDspPanel');
        		}
        		if(eType.toUpperCase()=='FSS7'){
        			treeFn.FSS7(        					
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'maintenance_fSs7Panel'
        					,'maintenanceSs7InFSs7Panel');
        		}
        		if(eType.toUpperCase()=='FPRI'){
        			treeFn.FPRI(        					
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'maintenance_fPriPanel'
        					,'maintenancePriInFPriPanel');
        		}
        		if(eType.toUpperCase()=='FSIP'){
        			treeFn.FSIP(        					
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'maintenance_fSipPanel'
        					,'maintenanceSipInFSipPanel');
        		}
        		
        		if(eType.toUpperCase()=='TGPORT'){
           			treeFn.TGPORT(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenance_tgpInfoPanel');
        		}
        		if(eType.toUpperCase()=='FAGP'){
        			treeFn.FAGP(
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'maintenance_fagpPanel'
        					,'maintenanceAgpInFAgpPanel');
        		}
        		if(eType.toUpperCase()=='FLAN'){
        			treeFn.FLAN(
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'maintenance_flanPanel'
        					,'maintenanceLanInFLanPanel');
        		}
        		
        		if(eType.toUpperCase()=='FSUSER'){
           			treeFn.FSUSER(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceFsuserPanel');
        		}
        		
        		if(eType.toUpperCase()=='UDOMAIN'){
           			treeFn.UDOMAIN(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceUserInDomain');
        		}

        		
        		if(eType.toUpperCase()=='USER'){
          			treeFn.USER(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'maintenanceUserPanel');
        		}

        		if(eType.toUpperCase()=='DEVICEUPGRADE'){
          			treeFn.DEVICEUPGRADE(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'main_upgrade'
        					,'main_upgrade_netab');
        		}
        		
        		if(eType.toUpperCase()=='SYSLOGMAIN'){
        			treeFn.SYSLOGMAIN(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'main_syslog'
        					,'main_syslog_tab'
        					,'main_syslog_file');
        		}
        		if(eType.toUpperCase()=='ALARMMAIN'){
        			treeFn.ALARMMAIN(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'main_alarm'
        					,'mainCurrentAlarmPanel');
        		}
        		if(eType.toUpperCase()=='BLACKWHITE'){
        			treeFn.BLACKWHITE(        					
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'maintenanceBlackWhite'
        					,'maintenanceSNum'
        					,'maintenanceDNum'
        			);
        		}
        		operationPanel.doLayout();
        		operationPanel.doLayout();
    		}
        }
//       
        
});