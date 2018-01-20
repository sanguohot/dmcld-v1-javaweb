Ext.define('app.view.msg.MsgTree',{
		extend:'Ext.tree.Panel',
		id:'msgTree',
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
//		bodyPadding:'5 5 5 5',
//		bodyStyle: 'background-color:#F5F5F5;',
		viewConfig: {
			loadMask:{
				msg:lanControll.getLanValue('maskMsg')
			}
  		},
        initComponent: function(){
  			var me=this;
  			var store = Ext.create('app.store.msg.MsgTreeStore', {
  			    root: {
			        expanded: true,
			        children: [
			            { name: "Write Message", leaf: true,eType:"writemsg",nid:"writemsg"},
			            { name: "Received Message(total:100,<font color=green>unread</font>:20)",eType:"receivedmsg",nid:"receivedmsg",leaf: true },
			            { name: "Sent Message(total:90,<font color=green>unread</font>:10)",eType:"sentmsg",nid:"sentmsg", leaf: true },
			            { name: "Draft Box", leaf: true,eType:"draftmsg",nid:"draftmsg"},
//			            { name: "Dustbin", leaf: true,eType:"dustbinmsg",nid:"dustbinmsg"},
//			            { name: "Checked", leaf: true,eType:"checkedmsg",nid:"checkedmsg"},
//			            { name: "Unchecked", leaf: true,eType:"uncheckedmsg",nid:"uncheckedmsg"},
//			            { name: "Send Message Result", hidden:true,leaf: true,eType:"sendmsgresult",nid:"sendmsgresult"},
			        ]
			    }
  			});
			this.store=store;
			var lstore=Ext.create('app.store.msg.MsgLStore', {});
			lstore.on("load",function(){
//				console.log("fkdddddd")
				if(lstore.getCount()){
					var r=lstore.getAt(0);
					var root=store.getRootNode();
					var node=root.findChild("eType","receivedmsg");
					var name="Received Message(total:"+r.get("receivedTotal")
					+",<font color=green>unread</font>:"+r.get("receivedUnread")+")";
					mc.updateTreeNode(node,name);
					
					var node=root.findChild("eType","sentmsg");
					name="Sent Message(total:"+r.get("sentTotal")+")";
					mc.updateTreeNode(node,name);
					
					var node=root.findChild("eType","draftmsg");
					name="Draft Box(total:"+r.get("unsentTotal")+")";
					mc.updateTreeNode(node,name);
				}
			});
//			mc.getTask(me,function(){
//				lstore.load();
//			}).cancel();
			lstore.load();
//			mc.getTask(me).delay(5000);
			this.lstore=lstore;
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
				Ext.getCmp("msgTree").clearFilter();
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
							Ext.getCmp("msgTree").filterByText(this.getRawValue());
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
					Ext.getCmp("msgTree").filterByText(this.getRawValue());
				}
			}
        },'-',{
            text: '',
            iconCls:'refresh2',
            handler: function(){
        		var lstore=Ext.getCmp('msgTree').lstore;
        		lstore.load();
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
				Ext.getCmp('msgTree').setLoading(false);
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
	        	var logPanel=Ext.getCmp('msgPanel');
				var xy=logPanel.getPosition();
				var size=logPanel.getSize();
        		var eType= record.raw.eType;
        		var name=record.raw.tid;
        		for(var i=0; i<logPanel.items.items.length; i++){
        			logPanel.items.items[i].setVisible(false);
        		}
        		treeFn.openLink=this.openLink;
        		treeFn.record = record;
        		mc.eType=eType;
        		
        		if(eType=='writemsg'){
        			mc.writeMsgPanel(null);
				}else{
					var containerId="msgGrid";
					this.procItemClick(containerId,logPanel,eType,xy,size,record);
				}
    		}
        },
        procItemClick:function(containerId,rightPanel,eType,xy,size,record){
        	var licCardPanel=Ext.getCmp(containerId);
			
				
				licCardPanel=Ext.create('app.view.msg.MsgGrid',{
					id:containerId,
				});
				rightPanel.add(licCardPanel);
				rightPanel.doLayout();
			
			licCardPanel.setVisible(true);
			var store=licCardPanel.store;
			var params = {nodeType:eType,domainUuid:Ext.get("domainUuid").value
					,userUuid:Ext.get("userUuid").value};
			licCardPanel.eType=eType;			
	        Ext.apply(store.proxy.extraParams, params);
	        store.load();
	        licCardPanel.setTitle(record.get("name"));
	        mc.procColumns(licCardPanel,eType);
            licCardPanel.setVisible(true);
			licCardPanel.setSize(size.width,size.height);
			licCardPanel.setVisible(true);
        },
        procCookie:function(containerId){
        	var licCardPanel=Ext.getCmp(containerId);
        	if(licCardPanel){
        		var c = getCookie("logActiveTab");
        		if(c==null || c==undefined){
        			return;
        		}
        		
        		var length = licCardPanel.items.items.length;
        		c = parseInt(c);
        		if(c+1 > length){
        			return;
        		}
        		licCardPanel.setActiveTab(c);
        	}
        }
});