Ext.define('app.view.operation.OperationTree',{
		extend:'Ext.tree.Panel',
		id:'operationTree',
		layout:'fit',
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
        viewConfig : {
			loadMask:{
				msg:lanControll.getLanValue('maskMsg')
			},
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
			s.load({params: {needRefresh:0,module:1}});
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
				Ext.getCmp("operationTree").clearFilter();
			},
			flex:1,
			emptyText:'search',
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
							
//							field.removeCls('x-form-search-trigger');
//							field.addCls('x-form-clear-trigger');
							treeFn.triggerValue=this.getRawValue();
							Ext.getCmp("operationTree").filterByText(this.getRawValue());
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
					Ext.getCmp("operationTree").filterByText(this.getRawValue());
				}
			}
//        },'-',{
//            text: 'Expand',
//            handler: function(){
//                Ext.getCmp('operationTree').expandAll();
//            }
//        }, {
//            text: 'Collapse',
//            handler: function(){
//        		Ext.getCmp('operationTree').collapseAll();
//            }
//        },{
//     		 xtype:'splitbutton',
//      		 text:'',
//      		 iconCls: 'tree_back_no',
//      		 name:'treeBackBtn',
//      		 handler: function() {
//        		var operationTree=this.up('panel');
//        		var treeForward=operationTree.down('menu[name=treeForward]');
//        		var treeBack=operationTree.down('menu[name=treeBack]');
//        		if(treeBack.items.length>1){
//        			operationTree.fireEvent('itemclick',null,treeBack.items.getAt(1).record);
//        			treeForward.insert(0,treeBack.items.getAt(0));
////        			treeBack.remove(treeBack.items.getAt(0));
//        		}
//        		if(treeBack.items.length==1){
//        			operationTree.down('splitbutton[name=treeBackBtn]').setIconCls('tree_back_no');
//        		}
//        		if(treeForward.items.length<1){
//        			operationTree.down('splitbutton[name=treeForwardBtn]').setIconCls('tree_forward_no');
//        		}else{
//        			operationTree.down('splitbutton[name=treeForwardBtn]').setIconCls('tree_forward');
//        		}
//        		
//        	 },
//      		 menu:{
//	       		 xtype:'menu',
//	       		 name:'treeBack',
//	       		 items:[], 
//      	 	 },
//      	 	
//      	 
//        },'-',{
//     		 xtype:'splitbutton',
//      		 text:'',
//      		 iconCls: 'tree_forward_no',
//      		 name:'treeForwardBtn',
//      		 handler: function() {
//        		var operationTree=this.up('panel');
//        		
//        		var treeBack=operationTree.down('menu[name=treeBack]');
//        		var treeForward=operationTree.down('menu[name=treeForward]');
//        		if(treeForward.items.length>0){
//        			operationTree.fireEvent('itemclick',null,treeForward.items.getAt(0).record);
//            		
//            		treeBack.insert(0,treeForward.items.getAt(0));
////            		treeForward.remove(treeForward.items.getAt(0));
//        		}
//        		if(treeForward.items.length==0){
//        			operationTree.down('splitbutton[name=treeForwardBtn]').setIconCls('tree_forward_no');
//        		}
//        		if(treeBack.items.legnth==1){
//        			operationTree.down('splitbutton[name=treeBackBtn]').setIconCls('tree_back_no');
//        		}else{
//        			operationTree.down('splitbutton[name=treeBackBtn]').setIconCls('tree_back');
//        		}
//         	 },
//      		 menu:{
//	       		 xtype:'menu',
//	       		 name:'treeForward',
//	       		 items:[], 
//      	 	 },
      	 	 
      	 
        },'-',{
            text: '',
            iconCls:'refresh2',
            handler: function(){
        		Ext.getCmp('operationTree').down('treeview').loadMask.setDisabled(false);
        		Ext.suspendLayouts();
        		var store=Ext.getCmp('operationTree').getStore();
        		try{
        			store.load({params: {needRefresh:1,module:1}});
        		}catch(e){
        			store.load({params: {needRefresh:1,module:1}});
        		}
        		Ext.resumeLayouts(true);
            }
        }],

        listeners:{
			load:function(store, node, records,successful,eOpts ){
        		Ext.suspendLayouts();
        		if(node.childNodes[0]!=null&&node.childNodes[0].raw.eType=='fcloud'){
					var cns=node.childNodes[0].childNodes;
					for(var i=0;i<cns.length;i++){
						if(cns[i].raw.eType=='cloud'){
							var showNode=ip.readDB('opt_s_n',cns[i].raw.tid,'show');
							if(showNode==1){
								cns[i].expand(false);
							}
						}
					}
				}
				Ext.resumeLayouts(true);
			},
			itemexpand:function(node,eOpts ){
				if(node.raw.eType=='cloud'){
					ip.insertDB('opt_s_n',node.raw.tid,'show',1);
				}
			},
			itemcollapse:function(node,eOpts ){
				if(node.raw.eType=='cloud'){
					ip.insertDB('opt_s_n',node.raw.tid,'show',0);
				}
			},
        	itemclick:function(view,record,item,index,e){
			
				var operationTree=Ext.getCmp('operationTree');
//				var treeBack=operationTree.down('menu[name=treeBack]');
//				var prefix="_"+record.raw.eType+"_"+record.raw.tid+"_ot";
//				if(Ext.getCmp(prefix)){
//					treeBack.remove(Ext.getCmp(prefix));
//				}
//				if(!Ext.getCmp(prefix)){
//					treeBack.insert(0,{
//						id:prefix,
//						text:record.raw.name,
//						iconCls:record.raw.iconCls,
//						record:record,
//						handler:function(){
//							operationTree.fireEvent('itemclick',null,record);
//							var treeBack=operationTree.down('menu[name=treeBack]');
//			        		var treeForward=operationTree.down('menu[name=treeForward]');
//			        		var temp=0;
//			        		var tl=treeBack.items.length;
//							for(var i=tl-1;i>=0;i--){
//								if(treeBack.items.getAt(i).record.raw.name==record.raw.name){
//									temp=1;
//									continue;
//								}
//								if(temp==1){
//									treeForward.insert(0,treeBack.items.getAt(i));
//								}
//			        		}
//			        		if(treeBack.items.length==1){
//			        			operationTree.down('splitbutton[name=treeBackBtn]').setIconCls('tree_back_no');
//			        		}
//			        		if(treeForward.items.length<1){
//			        			operationTree.down('splitbutton[name=treeForwardBtn]').setIconCls('tree_forward_no');
//			        		}else{
//			        			operationTree.down('splitbutton[name=treeForwardBtn]').setIconCls('tree_forward');
//			        		}
//							
//						}
//					});
//				}
//				if(treeBack.items.length>1){
//					operationTree.down('splitbutton[name=treeBackBtn]').setIconCls('tree_back');
//				}else{
//					operationTree.down('splitbutton[name=treeBackBtn]').setIconCls('tree_back_no');
//				}
//				
//		        Ext.util.Cookies.set(prefix,record);
			
        		
        		var icon=record.raw.iconCls;
        		var parentNode=record.parentNode;
	        	var operationPanel=Ext.getCmp('operationPanel');
				var xy=operationPanel.getPosition();
				var size=operationPanel.getSize();
        		var eType= record.raw.eType;
        		var name=record.raw.tid;
        		for(var i=0; i<operationPanel.items.items.length; i++){
        			operationPanel.items.items[i].setVisible(false);
        		}
        		treeFn.record = record;

        		var flag = privilege.procPrivilegeRead(record
        				,operationPanel,name,parentNode,size,treeFn);
        		if(flag){
        			return;
        		}
        		if(eType.toUpperCase()=='FCLOUD'){
        			treeFn.FCLOUD(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'fCloudPanel'
        					,'cloudInFCloudPanel'
        					,'sysInFCloudPanel'
        					,'localSysInFCloudPanel'
        					,"domainInFCloudPanel"
        					,'nesInFCloudTab'
        					,'neNasInFCloudTab');
        		}
        		
        		if(eType.toUpperCase()=='CLOUD'){
        			treeFn.CLOUD(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'cloudPanel'
        					,'sysInCloudPanel'
        					,'domainInCloudPanel'
        					,'nesInCloudTab');
        		}
        		
        		if(eType.toUpperCase()=='FSYSTEM'){
        			treeFn.FSYSTEM(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'fSystemPanel'
        					,'domainInFSysPanel'
        					,'nesInFSystemTab');
        		}
        		
        		if(eType.toUpperCase()=='FLOCALSERVER'){
        			treeFn.FLOCALSERVER(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'fLocalSystemPanel'
        					);
        		}
        		
        		if(eType.toUpperCase()=='SYSTEM'){
        			treeFn.SYSTEM(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'systemPanel'
        					,'domainInSysPanel'
        					,'nesInSystemTab'
        					);
        		}
        		
        		if(eType.toUpperCase()=='LOCALSERVER'){
        			treeFn.LOCALSERVER(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'localSystemPanel'
        					);
        		}
        		
        		if(eType.toUpperCase()=='PROC'){
        			treeFn.PROC(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'processPanel');
        		}

        		if(eType.toUpperCase()=='FDOMAIN'){
        			treeFn.FDOMAIN(
        					ip
        					,operationPanel
          					,name
        					,parentNode
        					,size
        					,'fdomainPanel'
        					,'domainInFDomainPanel'
        					,'nesInCloudTab');        			
        		}

        		if(eType.toUpperCase()=='FNODE'){
//        			dynamicLoadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyALjYiofaoVU7DbGyOVsDY-O7UP18FIn5g&sensor=false');
        			treeFn.FNODE(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'fNodePanel');          			
        		}
        		// fnode group
        		if(eType.toUpperCase()=='FNODEGROUP'){
        			treeFn.FNODEGROUP(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'fNodeGroupPanel');
        		}
        		// fnode group
        		if(eType.toUpperCase()=='NODEGROUP'){
        			treeFn.NODEGROUP(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'nodeGroupPanel'
        					,'NodeListPanel');
        		}
        		
        		if(eType.toUpperCase()=='NODE'){
        			treeFn.NODE(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'nodePanel');
        		}
        		
        		if(eType.toUpperCase()=='DOMAIN'){
        			treeFn.DOMAIN(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'domainPanel'
        					,'nesInDomainTab'
        					,'configNeGmap'
        					,'neNasInDomainTab');
        		}
        		
        		
        		if(eType.toUpperCase()=='FPOLICY'){
        			treeFn.FPOLICY(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'fpolicyPanel');
        		}
        		
        		if(eType.toUpperCase()=='POLICY'){
        			treeFn.POLICY(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'policyPanel'
        					,'ruleInPolicyTab');
        		}
        		
        		
        		if(eType.toUpperCase()=='RULE'){
        			treeFn.RULE(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'rulePanel');
        		}
        		
        		if(eType.toUpperCase()=='FGROUP'){
        			treeFn.FGROUP(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'fgroupPanel');
        		}
        		
        		if(eType.toUpperCase()=='FPAIDGROUP'){
        			treeFn.FPAIDGROUP(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'fPaidGroupPanel');
        		}
        		
        		if(eType.toUpperCase()=='PAIDGROUP'){
        			treeFn.PAIDGROUP(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'paidGroupPanel'
        					,'paidListTab');
        		}
        		
        		if(eType.toUpperCase()=='GROUP'){
        			treeFn.GROUP(
        					ip
        					,operationPanel
          					,name
        					,parentNode
        					,size
        					,'groupPanel'
        					,'simCardTab'
        					,'simSmlTab'
        					,'simCallTab'
        					,'simUsslTab'
        					,'callInGroupTab'
        					,'smsInGroupTab'
        					,'ussdInGroupTab');
        		}
        		
        		if(eType.toUpperCase()=='FROAMZONE'){
        			treeFn.FROAMZONE(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'froamzonePanel',
        					'siteInFZoneTab',
        					'nesInFZoneTab');
        		}

        		
        		if(eType.toUpperCase()=='ROAMZONE'){
        			treeFn.ROAMZONE(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'roamzonePanel',
        					'siteInZoneTab'
        					,'nesInZoneTab');
        		}
        		
        		if(eType.toUpperCase()=='SITE'){
        			treeFn.SITE(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'sitePanel'
        					,'nesInSiteTab');
        		}
        		
        		if(eType.toUpperCase()=='BK'){
        			treeFn.BK(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'bkPanel'
        					,'bkpPort'
        					,'bkpInNe');
        		}
        		
        		
        		if(eType.toUpperCase()=='GW'){
        			treeFn.GW(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'gwPanel'
        					,'gwpPort'
        					,'gwpInNe');
        		}
        		
        		if(eType.toUpperCase()=='GWPORT'){
        			treeFn.GWPORT(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'gwpInfoPanel');
        		}

        		if(eType.toUpperCase()=='BKPORT'){
        			treeFn.BKPORT(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'bkpInfoPanel');
        		}
        		
        		if(eType.toUpperCase()=='AG'){
        			treeFn.AG(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'config_agInfoPanel'
        					,'config_agpTab'
        					,'config_agpInNe');
        		}
        		
        		if(eType.toUpperCase()=='AGPORT'){
        			treeFn.AGPORT(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'config_agpInfoPanel');
        		}
        		if(eType.toUpperCase()=='TG'){
        			treeFn.TG(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'config_tgInfoPanel'
        					,'config_tgpTab'
        					,'config_tgpInNe');
        		}
        		if(eType.toUpperCase()=='FTGP'){
        			treeFn.FTGP(        					
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'config_ftgpPanel'
        					,'tgpInFTgpPanel');
        		}
        		if(eType.toUpperCase()=='FETH'){
        			treeFn.FETH(        					
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'config_fEthPanel'
        					,'ethInFEthPanel');
        		}
        		if(eType.toUpperCase()=='FDSP'){
        			treeFn.FDSP(
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'config_fDspPanel'
        					,'dspInFDspPanel');
        		}
        		if(eType.toUpperCase()=='FSS7'){
        			treeFn.FSS7(
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'config_fSs7Panel'
        					,'ss7InFSs7Panel');
        		}
        		if(eType.toUpperCase()=='FPRI'){
        			treeFn.FPRI(
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'config_fPriPanel'
        					,'priInFPriPanel');
        		}
        		if(eType.toUpperCase()=='FSIP'){
        			treeFn.FSIP(
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'config_fSipPanel'
        					,'sipInFSipPanel');
        		}
        		
        		if(eType.toUpperCase()=='TGPORT'){
           			treeFn.TGPORT(
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'config_tgpInfoPanel');
        		}
        		
        		if(eType.toUpperCase()=='FAGP'){
        			treeFn.FAGP(
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'config_fagpPanel'
        					,'agpInFAgpPanel');
        		}
        		if(eType.toUpperCase()=='FLAN'){
        			treeFn.FLAN(
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'config_flanPanel'
        					,'lanInFLanPanel');
        		}
        		
        		if(eType.toUpperCase()=='FSUSER'){
           			treeFn.FSUSER(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'fsuserPanel');
        		}
        		
        		if(eType.toUpperCase()=='UDOMAIN'){
           			treeFn.UDOMAIN(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'userInDomain');
        		}

        		
        		if(eType.toUpperCase()=='USER'){
          			treeFn.USER(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'userPanel');
        		}
        		
        		if(eType.toUpperCase()=='SIPSERVER'){
          			treeFn.SIPSERVER(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'sipserverPanel'
        					,'config_sipserver');
        		}

        		if(eType.toUpperCase()=='DEVICEUPGRADE'){
          			treeFn.DEVICEUPGRADE(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'config_upgrade'
        					,'config_upgrade_netab');
        		}
        		if(eType.toUpperCase()=='ALARMCONFIG'){
          			treeFn.ALARMCONFIG(        					
        					operationPanel
          					,name
        					,parentNode
        					,size
        					,'config_alarm'
        					,'config_alarm_grid');
        		}
        		if(eType.toUpperCase()=='PUBCLOUDBK'){
        			treeFn.PUBCLOUDBK(        					
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'domainBackupPanel'
        					,'domainInBackupPanel'
        					);
        		}
        		if(eType.toUpperCase()=='LOCALSRVBK'){
        			treeFn.LOCALSRVBK(        					
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'serverBackupPanel'
        					,'serverInBackupPanel'
        			);
        		}
        		if(eType.toUpperCase()=='BLACKWHITE'){
        			treeFn.BLACKWHITE(        					
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'blackWhite'
        					,'sNum'
        					,'dNum'
        			);
        		}
        		if(eType.toUpperCase()=='DMNUM'){
        			treeFn.DMNUM(        					
        					operationPanel
        					,name
        					,parentNode
        					,size
        					,'dmnum'
        			);
        		}
        		
        		operationPanel.doLayout();
    		},
        }
//       
        
});