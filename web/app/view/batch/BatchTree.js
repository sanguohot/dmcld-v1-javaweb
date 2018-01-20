/**
 * Created by Rainc on 2014/11/12.
 */
Ext.define('app.view.batch.BatchTree',{
    extend:'Ext.tree.Panel',
    id:'batchTree',
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

        var s=Ext.create('app.store.batch.BatchTreeStore',{});
        s.on('load',function(store, node, records,successful,eOpts){
            lanControll.cbTreeRecords(s.getRootNode());
        })
        s.load({params: {needRefresh:1,module:9}});
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
        dataIndex: 'name'
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
            Ext.getCmp("batchTree").clearFilter();
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
                        Ext.getCmp("batchTree").filterByText(this.getRawValue());
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
                Ext.getCmp("batchTree").filterByText(this.getRawValue());
            }
        }
    },'-',{
//            text: 'Expand All',
//            handler: function(){
//                Ext.getCmp('privilegeTree').expandAll();
//            }
//        }, {
//            text: 'Collapse All',
//            handler: function(){
//        		Ext.getCmp('privilegeTree').collapseAll();
//            }
//        },{
        text: '',
        iconCls:'refresh2',
        handler: function(){
            var store=Ext.getCmp('batchTree').getStore();
            Ext.getCmp('batchTree').down('treeview').loadMask.setDisabled(false);
            try{
                store.load({params: {needRefresh:1,module:9},});
            }catch(e){
                store.load({params: {needRefresh:1,module:9},});
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
            Ext.getCmp('batchTree').setLoading(false);
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
            var batchPanel=Ext.getCmp('batchPanel');
            var xy=batchPanel.getPosition();
            var size=batchPanel.getSize();
            var eType= record.raw.eType;
            var name=record.raw.tid;


            for(var i=0; i<batchPanel.items.items.length; i++){
                batchPanel.items.items[i].setVisible(false);
            }
            //取消级联操作
//        		treeFn.openLink=this.openLink;
            treeFn.record = record;
            var containerId = "BatchTabPanel";
            console.log(eType);

//            if(eType.toUpperCase()!='BATCHDOMAIN' && eType.toUpperCase()!='PRODUCT'){
            if(eType.toUpperCase()!='PRODUCT'){
                var noDateToShow1 = Ext.getCmp('noDateToShow1');
                if(!noDateToShow1){
                    noDateToShow1=Ext.create('app.view.monitor.NoDateToShow', {id:'noDateToShow2'});
                    batchPanel.add(noDateToShow1);
                    batchPanel.doLayout();
                }
                noDateToShow1.setVisible(true);
                noDateToShow1.setSize(size.width,size.height);
                noDateToShow1.setVisible(true);
            }
//            if(eType.toUpperCase()=='BATCHDOMAIN'){
//                var cloudUuid = -99;
//                var roleId = roleType.getDomainAdmin();
//                var domainUuid = name;
//
//                this.procItemClick(cloudUuid,domainUuid,productId,roleId,containerId,batchPanel,eType,xy,size,record);
//            }
            if(eType.toUpperCase()=='PRODUCT'){
                var cloudUuid = -99;
                var roleId = roleType.getDomainAdmin();
                var domainUuid = parentNode.raw.tid;
                var productId = name;

                this.procItemClick(cloudUuid,domainUuid,productId,roleId,containerId,batchPanel,eType,xy,size,record);
            }

        }
    },
    procItemClick:function(cloudUuid,domainUuid,productId,roleId,containerId,rightPanel,eType,xy,size,record){
        var licCardPanel=Ext.getCmp(containerId);
        if(licCardPanel==undefined || licCardPanel==null){
            var node="super";
            if(domainUuid > 0){
                node = "domain";
            }
            var licCardPanel=Ext.create('app.view.batch.BatchTabPanel',{
                id:containerId,
                node:node,
                roleId:roleId
            });
            rightPanel.add(licCardPanel);
            rightPanel.doLayout();
        }
        licCardPanel.setVisible(true);
        //给模板列表和设备列表传参
        var grid = licCardPanel.down('panel[itemId=grid]');
        
        var deviceGrid=Ext.getCmp('deviceGrid');
        
        deviceGrid.treeId=domainUuid;
        if(grid){
            grid.domainUuid = domainUuid;
            grid.productId=productId;
            var store = grid.store;
            var params = {cloudUuid:cloudUuid,domainUuid:domainUuid};
            if(productId){
                params.productId = productId;
            }
            Ext.apply(store.proxy.extraParams, params);
        }
        if(deviceGrid){
        	var deviceStore=deviceGrid.down('panel[itemId=grid]').store;
        	deviceGrid.domainUuid = domainUuid;
        	deviceGrid.productId=productId;
            var params = {domainUuid:domainUuid};
            if(productId){
                params.productId = productId;
            }
            Ext.apply(deviceStore.proxy.extraParams, params);
        }
        

        this.procCookie(containerId);
        this.beforeload(licCardPanel);
        treeFn.load(licCardPanel.getActiveTab());

        licCardPanel.setVisible(true);
        licCardPanel.setSize(size.width,size.height);
        licCardPanel.setVisible(true);
    },
    procCookie:function(containerId){
        var licCardPanel=Ext.getCmp(containerId);
        if(licCardPanel){
            var c = getCookie("priActiveTab");
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
    },
    beforeload:function(tabPanel){
        if(tabPanel){
            for(var i=0; i<tabPanel.items.items.length; i++){
                var tab = tabPanel.getComponent(i);
                treeFn.setLoadFlag(tab);
            }
        }
    },
//

});