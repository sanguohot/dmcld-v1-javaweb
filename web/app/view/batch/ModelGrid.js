/**
 * Created by Rainc on 2014/11/22.
 */
Ext.define('app.view.batch.ModelGrid',{
    extend:'Ext.panel.Panel',
    requires: [
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'app.store.operation.domain.roamzone.site.NesInSiteStore',
        'app.store.operation.domain.roamzone.site.nes.NeInfoModel',
        'app.store.provision.VendorListStore',
        'app.store.provision.VendorModel'
    ],
    title:'',
    layout:'border',
//		autoScroll:true,
    treeId:'',
    initComponent: function() {
        var modelStore= Ext.create('app.store.batch.BatchModelStore', {});
//			modelStore.load();
        modelStore.on('beforeload',function(){
            modelStore.loadFlag = false;
        })
        this.store = modelStore;
//			var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 });
        var sm = Ext.create('Ext.selection.CheckboxModel');
        var modelGrid = Ext.create('Ext.grid.Panel', {
            border:false,
            itemId:'grid',
            autoScroll:true,
            columnLines:true,
            store: modelStore,
//				plugins: [cellEditing],
            selModel: sm,
            viewConfig: {
                loadMask:{
                    msg:lanControll.getLanValue('maskMsg')
                },
                enableTextSelection: true
            },
            columns: [
                {header: 'uuid', dataIndex: 'uuid', hidden:true},
                {header: 'domainUuid', dataIndex: 'domainUuid',hidden:true},
                {header: 'name',sortable:false, dataIndex: 'name',ulan:'modelName',width:160},
                {header: 'productId', dataIndex: 'productId',ulan:'productId'},
                {header: 'productName', dataIndex: 'productName',ulan:'productName'},
                {header: 'Version', dataIndex: 'packageVersion',ulan:'versionAbbr'},
                {header: 'Status', dataIndex: 'status',hidden:true},
                {header: 'detailDesc',dataIndex: 'detailDesc',ulan:'detailDesc',width:140},
                {header: 'CreateTime', dataIndex: 'createTime',xtype: 'datecolumn',format:'m-d H:i:s'},
                {header: 'updateTime', dataIndex: 'updateTime',hidden:true,xtype: 'datecolumn',format:'m-d H:i:s'}
            ],
            listeners:{
            },
            dockedItems:[{

                dock: 'bottom',
                xtype: 'pagingtoolbar',
                store: modelStore,
                pageSize: 25,
                displayInfo: true
            }
            ]
        });

        var tbar = [];

        var add = Ext.create('Ext.button.Button',{
            text:'Add Model',
            ulan:'btAdd',
            iconCls:'add',
            flag:"domain_edit",
            listeners:{
                click: function() {
                    var panel = this.up('panel');
                    var domainUuid = modelGrid.domainUuid;
                    var productId = modelGrid.productId;
                    var id = panel.id+'_remote';
                    var url = 'model_manage/index.html#/0/' + domainUuid + '/' + productId + '/0/0/0'
                    var remoteTab=panel.up('panel');
                    var tab = Ext.getCmp(id);
                    if(tab!=undefined){
                        if(document.getElementById('modelTab_id').innerHTML == '模板编辑器*'){
                            Ext.MessageBox.confirm(boxWarnning,boxSaveOrNot,function(e) {
                                if (e == 'yes') {
                                   remoteTab.setActiveTab(id);
                                }else{
                                    tab.destroy();
                                    tab=remoteTab.add({
                                        title: '<span id="modelTab_id">模板编辑器</span>',
                                        id:id,
                                        closable: true,
                                        autoScroll: true,
                                        layout:'fit',
                                        items :[{
                                            itemId:'remote_web',
                                            layout:'fit',
                                            html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+url+'"></iframe>'
                                        }]
                                    });
                                    tab.show();
                                }
                            })
                        }else{
                            remoteTab.setActiveTab(id);
                        }
                    }else{
                        tab=remoteTab.add({
                            title: '<span id="modelTab_id">模板编辑器</span>',
                            id:id,
                            closable: true,
                            autoScroll: true,
                            layout:'fit',
                            items :[{
                                itemId:'remote_web',
                                layout:'fit',
                                html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+url+'"></iframe>'
                            }]
                        });
                        tab.show();
                    }
                }
            }
        });
        tbar.push(add);
        tbar.push('-');

        var del = Ext.create('Ext.button.Button',{
            text:'Delete Model',
            ulan:'btDel',
            iconCls:'remove',
            flag:"domain_edit",
            listeners:{
                click:function(){

                    if ( modelGrid.getSelectionModel().hasSelection() ){
                        var records = modelGrid.getSelectionModel().getSelection();
                        var domainUuid= records[0].get("domainUuid");
                        var uuids = '';

                        if(records.length == 1){
                            uuids += records[0].get('uuid') ;
                        }else{
                            for ( var i = 0; i < records.length - 1; i++) {
                                uuids += records[i].get('uuid') + ',';
                            }
                            uuids += records[records.length -1].get('uuid');
                        }
                        console.log(uuids);
                        Ext.MessageBox.confirm(boxWarnning,boxDelModel,function(e) {
                            if (e == 'yes') {
                                Ext.Ajax.request({
                                    url:"batchManager!deleteBatchByUuids.action?domainUuid="+domainUuid+"&uuids="+uuids,
                                    method:'POST',
                                    callback: function (options, success, response) {
                                        var obj=Ext.JSON.decode(response.responseText);
                                        if(obj['success']){
                                            Ext.MessageBox.alert(boxSuccess,boxDelSucc);
                                            modelGrid.getStore().load();
                                        }else{
                                            Ext.MessageBox.alert(boxFailture,boxDelFail);
                                        }
                                    }
                                });
                            }

                        })
                    }else{
                        Ext.MessageBox.alert(boxWarnning,boxAtLeastOneRecord);
                        return;
                    }

                }
            }
        });
        tbar.push(del);
        tbar.push('-');

        var remote = Ext.create('Ext.button.Button',{
            text:'Remote Web',
            iconCls: 'domain-group',
            ulan:'edit',
            flag:"domain_action",
          listeners: {
            click: function () {
              if ( modelGrid.getSelectionModel().getSelection().length==1){
                var records= modelGrid.getSelectionModel().getSelection();
                var uuid=records[0].get('uuid');
                var filePath = records[0].get('filePath');
                var modelName = records[0].get('name');
                var detailDesc = records[0].get('detailDesc') == '' ? 0 : records[0].get('detailDesc');
                var panel = this.up('panel');
                var domainUuid = modelGrid.domainUuid;
                var productId = modelGrid.productId;
                var id = panel.id+'_remote';
                var url = 'model_manage/index.html#/'+ uuid + '/' + domainUuid + '/' + productId + '/' + modelName + '/' + detailDesc;
                var remoteTab=panel.up('panel');

                if(filePath){
                  filePath = filePath.replace('/','$');
                  filePath = filePath.replace('\\','$');
                  url += '/' + filePath;
                  var tab = Ext.getCmp(id);
                  if(tab!=undefined){
                    if(document.getElementById('modelTab_id').innerHTML == '模板编辑器*'){
                      Ext.MessageBox.confirm(boxWarnning,boxSaveOrNot,function(e) {
                        if (e == 'yes') {
                          remoteTab.setActiveTab(id);
                        }else{
                          tab.destroy();
                          tab=remoteTab.add({
                            title: '<span id="modelTab_id">模板编辑器</span>',
                            id:id,
                            closable: true,
                            autoScroll: true,
                            layout:'fit',
                            items :[{
                              itemId:'remote_web',
                              layout:'fit',
                              html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+url+'"></iframe>'
                            }]
                          });
                          tab.show();
                        }
                      })
                    }else{
//                      remoteTab.setActiveTab(id);
                      tab.destroy();
                      tab=remoteTab.add({
                        title: '<span id="modelTab_id">模板编辑器</span>',
                        id:id,
                        closable: true,
                        autoScroll: true,
                        layout:'fit',
                        items :[{
                          itemId:'remote_web',
                          layout:'fit',
                          html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+url+'"></iframe>'
                        }]
                      });
                      tab.show();
                    }
                  }else{
                    tab=remoteTab.add({
                      title: '<span id="modelTab_id">模板编辑器</span>',
                      id:id,
                      closable: true,
                      autoScroll: true,
                      layout:'fit',
                      items :[{
                        itemId:'remote_web',
                        layout:'fit',
                        html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+url+'"></iframe>'
                      }]
                    });
                    tab.show();
                  }
                }

              }else{
                Ext.MessageBox.alert(boxWarnning,boxOnlyOneRecord);
                return;
              }
            }
          }
        });
        tbar.push(remote);
        tbar.push('-');

        var sel = Ext.create('Ext.button.Button',{
            text: 'SelectAll',
            iconCls: 'selectAll',
            ulan:'btSelectAll',
            flag:"domain_read",
            listeners:{
                click:function(){
                    if(modelGrid.getSelectionModel().hasSelection()){
                        modelGrid.getSelectionModel().deselectAll();
                    }else{
                        modelGrid.getSelectionModel().selectAll();
                    }
                }
            }
        });
        tbar.push(sel);
        tbar.push('-');

        var doUse = Ext.create('Ext.button.Button',{
            text: 'DoUse',
            iconCls: 'selectAll',
            ulan:'doUse',
            flag:"domain_read",
            listeners:{
                click:function(){
                    if ( modelGrid.getSelectionModel().getSelection().length==1){
                        var records= modelGrid.getSelectionModel().getSelection();
                        var uuid=records[0].get('uuid');
                        var productId=records[0].get('productId');
                        var domainUuid = modelGrid.domainUuid;

                        var selectDevicePanel = Ext.getCmp('selectDevice');
                        if(selectDevicePanel==undefined|| selectDevicePanel=='undefined'){
                            selectDevicePanel=Ext.create('app.view.batch.SelectDevicePanel',{});
                            lanControll.setLan(selectDevicePanel);
                        }

                        var temp={};
                        temp['uuid']=uuid;
                        temp['domainUuid'] = domainUuid;
                        selectDevicePanel.param=temp;
                        
                        var store=selectDevicePanel.down('panel[itemId=grid]').store;
                        store.on('load',function(){
                        	console.log(store.getCount());
                        	selectDevicePanel.show();
                        },this,{single: true});
                        var param={domainUuid:domainUuid,productId:productId};
                        Ext.apply(store.proxy.extraParams, param);
                        store.load();
                    }else{
                        Ext.MessageBox.alert(boxWarnning,boxOnlyOneRecord);
                        return;
                    }
                }
            }
        });
        tbar.push(doUse);
        tbar.push('-');

        var refresh = Ext.create('Ext.button.Button',{
            text:'Refresh',
            ulan:'btRefresh',
            iconCls:'refresh2',
            flag:"domain_read",
            listeners:{
                click:function(){
                    this.up('panel').down('panel[itemId=grid]').getStore().load();
                }
            }
        });
        tbar.push(refresh);
        tbar.push('->');

        var search = Ext.create('Ext.button.Button',{
            xtype:'button',
            text:'Search',
            ulan:'btSearch',
            iconCls:'search',
            flag:"domain_read",
            listeners:{
                click:function(){
                    var eastSearch=this.up('panel').down('panel[itemId=search]');
                    if(eastSearch.isHidden()){
                        eastSearch.expand();
                    }else{
                        eastSearch.collapse();
                    }
                }
            }
        });
        tbar.push(search);
        this.tbar=tbar;


        var search_grid=Ext.create('Ext.form.Panel',{
            border : false,
            bodyPadding : 5,
            defaults : {
                margins : '0 0 10 0'
            },
            items : [{
                xtype:'hiddenfield',
                name:'domainUuid'
            },{
                xtype:'textfield',
                fieldLabel:'productId',
                name:'productId'
            },{
                xtype:'textfield',
                fieldLabel:'name',
                name:'name'
            }
            ],

            buttons : [ {
                text : 'Reset',
                ulan:'btReset1',
                flag:"domain_read",
                handler : function() {
                    this.up('form').getForm().reset();
                }
            }, {
                text : 'Search',
                ulan:'btSearch',
                flag:"domain_read",
                handler : function() {

                    var domainUuid=modelGrid.domainUuid;

                    var form=this.up('form').getForm();
                    form.findField('domainUuid').setValue(domainUuid);
                    var params = form.getValues();
                    modelStore.removeAll();
                    modelStore.on('beforeload', function (modelStore, options) {
                        Ext.apply(modelStore.proxy.extraParams, params);
                    },this,{single:true});
                    var panel = this.up('form').up('panel').up('panel');
                    var paging = panel.down("pagingtoolbar");
                    paging.moveFirst();
                }
            }]
        });

        this.items=[
            {
                region: 'center',
                layout:'fit',
                items:[modelGrid]

            },{
                itemId:'search',
                region:'east',
                title : tiSearch,
                collapsible: true,
                collapsed:true,
                width:300,
//    			 split: true,
                items:[search_grid]
            }
        ];
        this.callParent(arguments);
    }
});
