/**
 * Created by Rainc on 2014/11/27.
 */
/**
 * Created by Rainc on 2014/11/27.
 */
Ext.define('app.view.batch.SelectDevicePanel',{
    extend : 'Ext.window.Window',
    requires: [
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'app.store.operation.domain.roamzone.site.NesInSiteStore',
        'app.store.operation.domain.roamzone.site.nes.NeInfoModel',
        'app.store.provision.VendorListStore',
        'app.store.provision.VendorModel'
    ],
    title:lanControll.getLanValue('useModel'),
    id:'selectDevice',
    layout:'border',
    height : 540,
    width:760,
//		autoScroll:true,
    treeId:'',

    initComponent: function() {
        var nesInSiteStore= Ext.create('app.store.operation.domain.roamzone.site.NesInSiteStore', {});
//			nesInSiteStore.load();
        this.store = nesInSiteStore;
        var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
        nesInSiteStore.on('beforeload',function(){
            nesInSiteStore.loadFlag = false;
        })
//			var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 });
        var sm = Ext.create('Ext.selection.CheckboxModel');
        var nesGrid = Ext.create('Ext.grid.Panel', {
            border:false,
//				id:'nesInDomainGrid',
            itemId:'grid',
            autoScroll:true,
            columnLines:true,
            store: nesInSiteStore,
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
//					         {header: 'Domain Name', dataIndex: 'domainName'},
                {header: 'Device SN',sortable:false, dataIndex: 'productSnStr',ulan:'productSn',width:160},
                {header: 'Device Model', dataIndex: 'productName'},
                {header: 'Alias', dataIndex: 'alias',width:120},
                {header: 'Admin Status', dataIndex: 'adminStatus',hidden:false,
                    renderer:function(val){
                        return rs.adminStatus(val);
                    }
                },
                {header: 'Opr Status',hidden:true, dataIndex: 'oprStatus',
                    renderer:function(val){
                        return rs.oprStatus(val);
                    }
                },
                {header: 'Run Status', dataIndex: 'runStatus',
                    renderer:function(val){
                        return rs.runStatus(val);
                    }
                },
                {header: 'Version', dataIndex: 'packageVersion',ulan:'versionAbbr'},
                {header: 'Build Time',dataIndex: 'packageBuildTime',width:140,xtype: 'datecolumn',format:'m-d H:i:s',hidden:true},

                {header: 'Port Total',dataIndex: 'portTotalCount',width:80,hidden:true},
                {header: 'Port Work',dataIndex: 'portWorkCount',width:80,hidden:true},
                {header: 'Last Register',dataIndex: 'lastRegTime',width:140,hidden:true,xtype: 'datecolumn',format:'m-d H:i:s'},
                {header: 'Out IP',dataIndex: 'outerIpAddr',width:120,hidden:true},
                {header: 'Inner IP',dataIndex: 'innerIpAddr',width:120,hidden:true},
                {header: 'RunTime',dataIndex: 'lifeSecond',width:150,hidden:true,
                    renderer:function(val,metaData,record,rowIndex,store,view){
                        return rs.tranSecondMin(val,record.get('runStatus'));
                    }
                },
                {header: 'Create Time', dataIndex: 'createTime',hidden:true,xtype: 'datecolumn',format:'m-d H:i:s'},
                {header: 'Upgrade Type', dataIndex: 'upgradeType',hidden:true},
                {header: 'Upgrade Status', dataIndex: 'upgradeStatus',hidden:true},
                {header: 'domainUuid', dataIndex: 'domainUuid',hidden:true}

            ],
            listeners:{
//                itemdblclick: function(grid, row, columnindex,e){
//
//                    var ot=Ext.getCmp('operationTree');
//                    if(maintenance){
//                        ot = Ext.getCmp('maintenanceTree');
//                    }
//                    var uuid=row.get('uuid');
//                    var rootNode=ot.getRootNode();
//                    var node=rootNode.findChild('nid','nes_'+uuid,true);
//
//                    ot.fireEvent('itemclick',null,node);
//                }
            },
            dockedItems:[{

                dock: 'bottom',
                xtype: 'pagingtoolbar',
                store: nesInSiteStore,
                pageSize: 25,
                displayInfo: true
            }
            ]
        });

        var tbar = [];
        var doUse = Ext.create('Ext.button.Button',{
            xtype:'button',
            text:'DoUse',
            ulan:'doUse',
            iconCls:'selectAll',
            flag:"domain_read",
            listeners:{
                click:function(){
                    if ( nesGrid.getSelectionModel().hasSelection() ){
                        var records = nesGrid.getSelectionModel().getSelection();
                        var domainUuid = this.up('window').param.domainUuid;
                        var uuid = this.up('window').param.uuid;
                        var deviceUuids = '';
                        if(records.length == 1){
                            deviceUuids += records[0].get('uuid');
                        }else{
                            for(var i =0;i<records.length -1;i++){
                                deviceUuids += records[i].get('uuid') + ','
                            }
                            deviceUuids += records[records.length-1].get('uuid');
                        }
//                        console.log(domainUuid,uuid,deviceUuids)
                        Ext.Ajax.request({
                            url:"batchManager!applyBatch.action?domainUuid="+domainUuid+"&uuid="+uuid + "&deviceUuids=" + deviceUuids,
                            method:'GET',
                            callback: function (options, success, response) {
                                var obj=Ext.JSON.decode(response.responseText);
                                console.log(obj);
                                if(obj['success']){
                                    Ext.MessageBox.alert(boxSuccess,boxUseSucc);
                                    nesGrid.getStore().load();
                                }else{
                                    Ext.MessageBox.alert(boxFailture,boxUseFail);
                                }
                            }
                        });

                    }else{
                        Ext.MessageBox.alert(boxWarnning,boxAtLeastOneRecord);
                        return;
                    }
                }
            }
        });
        tbar.push(doUse);
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
                fieldLabel:'Device SN',
                name:'productSn'
            },{
                xtype:'textfield',
                fieldLabel:'Alias',
                name:'alias'
            }
//				,{
//					name : 'productId',
//					xtype: 'combo',
//					mode: 'local',
//					editable:false,
//					fieldLabel: 'Type',
//					displayField: 'name',
//					valueField: 'value',
//					queryMode: 'local',
//					store: Ext.create('Ext.data.Store', {
//					fields : ['name', 'value'],
//					data   : [
//					    {name : '-SELECT-',   value: '-1'},
//						{name : 'DWG',   value: '23'},
//						{name : 'SIMBANK',  value: '31'}
//					]
//					}),
//
//				}
                ,rs.createAdminStatus(null,[0,1,2],null),rs.createRunStatus(20,null),{
                    xtype:'textfield',
                    fieldLabel:'Device Model',
                    name:'productName'
                },{
                    xtype:'textfield',
                    fieldLabel:'Version',
                    name:'version'
                }
            ],

            buttons : [ {
                text : 'Reset',
                ulan:'btReset1',
                flag:"domain_read",
                handler : function() {
                    this.up('form').getForm().reset();
                    this.up('form').getForm().findField('adminStatus').setValue(0);
                    this.up('form').getForm().findField('runStatus').setValue(0);
                }
            }, {
                text : 'Search',
                ulan:'btSearch',
                flag:"domain_read",
                handler : function() {

                    var domainUuid=this.up('form').up('panel').up('panel').treeId;

                    var form=this.up('form').getForm();
                    form.findField('domainUuid').setValue(domainUuid);
                    var params = form.getValues();
                    nesInSiteStore.removeAll();
                    nesInSiteStore.on('beforeload', function (nesInSiteStore, options) {
                        Ext.apply(nesInSiteStore.proxy.extraParams, params);
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
                items:[nesGrid]

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
