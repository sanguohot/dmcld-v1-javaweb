Ext.define('app.view.operation.domain.DomainPanel', {
    extend: 'Ext.panel.Panel',
// id:'domainPanel',
    layout: 'fit',
    hidden: true,
    border: false,
    treeId: '',
    userTypeValue: '1',
    store: null,
// comboxStore:{},
    itemId: 'domainPanel',
    initComponent: function () {

        var store = Ext.create('app.store.operation.domain.DomainPmHeadStore', {});
        this.store = store;
        store.on('beforeload', function () {
            store.loadFlag = false;
        })
        var maintenance = (this.id.indexOf('maintenance') >= 0) ? 1 : 0;
        var typeNum = {
            xtype: 'hiddenfield',
            name: 'typeNum',
            value: 1
        };
        var uuid = {
            xtype: 'hiddenfield',
            name: 'uuid',
// id:'domainPanelUuid'
        };
        var cloudUuid = {
            xtype: 'hiddenfield',
            name: 'cloudUuid',
            value: 1
        };

        var name = {
            xtype: 'displayfield',
            name: 'name',
            labelWidth: 180,
            fieldLabel: 'Name',
        };
        var alias = {
            xtype: 'textfield',
            name: 'alias',
            labelWidth: 180,
            fieldLabel: 'DAlias',
        };
        var adminStatus = {
            xtype: 'displayfield',
            name: 'adminStatus',
            labelWidth: 180,
            fieldLabel: 'Admin Status',
        };
        var oprStatus = {
            xtype: 'displayfield',
            name: 'oprStatus',
            ulan: 'oprStatusSpec',
            labelAlign: 'right',
            labelWidth: 80,
            fieldLabel: 'Opr',
        };
        var runStatus = {
            xtype: 'displayfield',
            name: 'runStatus',
            ulan: 'runStatusSpec',
            labelAlign: 'right',
            labelWidth: 80,
            fieldLabel: 'Run',
        };
        var vendorId = {
            xtype: 'hiddenfield',
            name: 'vendorId',
            fieldLabel: 'Vendor',
        };
        var vendorName = {
            xtype: 'hiddenfield',
            name: 'vendorName',
            fieldLabel: 'Vendor',
        };


        var idleSwitchFlag = {
            xtype: 'checkbox',
            name: 'idleSwitchFlag',
            boxLabel: 'Busy SIM Card cannot do switchover',
            boxLabelCls: 'box_label',
            inputValue: 1,
            hidden: rs.dmCloudMode(),
        };
        var smoothSwitchFlag = {
            xtype: 'checkbox',
            name: 'smoothSwitchFlag',
            boxLabel: 'One-By-One SIM Switchover inside one device',
            boxLabelCls: 'box_label',
            inputValue: 1,
            hidden: rs.dmCloudMode(),
        };
        var devTimeFlag = {
            xtype: 'checkbox',
            name: 'devTimeFlag',
            boxLabel: 'Use device timestamp to generate CDR',
            boxLabelCls: 'box_label',
            inputValue: 1,
            hidden: rs.dmCloudMode(),
        };
        var timezoneFlag = {
            xtype: 'checkbox',
            name: 'timezoneFlag',
            boxLabel: 'Configure device timezone after device registered',
            boxLabelCls: 'box_label',
            inputValue: 1,
            listeners: {
                change: function (field, newValue, oldValue, opts) {
                    var ntpServer1 = domainTab1.down('textfield[name=ntpServer1]');
                    var ntpServer2 = domainTab1.down('textfield[name=ntpServer2]');

                    if (newValue) {
                        ntpServer1.setDisabled(false);
                        ntpServer2.setDisabled(false);
                    } else {
                        ntpServer1.setDisabled(true);
                        ntpServer2.setDisabled(true);
                    }
                }
            }
        };
        var ntpServer1 = {
            xtype: 'textfield',
            name: 'ntpServer1',
            fieldLabel: 'NTP Server-111',
            disabled: true
        };
        var ntpServer2 = {
            xtype: 'textfield',
            name: 'ntpServer2',
            fieldLabel: 'NTP Server-222',
            disabled: true
        };

        var switchTimeout = {
            xtype: 'numberfield',
            name: 'switchTimeout',
            anchor: '45%',
            decimalPrecision: 0,
            minValue: 0, maxValue: 100000,
            fieldLabel: 'SIM Switch Timeout(sec)',
            hidden: rs.dmCloudMode(),
        };
        var scpTimeoutSec = {
            xtype: 'numberfield',
            name: 'scpTimeoutSec',
            anchor: '45%',
            decimalPrecision: 0,
            minValue: 0, maxValue: 99999,
            fieldLabel: 'Device Comm Timeout(sec)',
            hidden: rs.dmCloudMode(),
        };
        var scpPingChannel = {
            xtype: 'combo',
            name: 'scpPingChannel',
            anchor: '45%',
            fieldLabel: 'SCP Ping Channel',
            displayField: 'name',
            valueField: 'statusId',
            queryMode: 'local',
            hidden: rs.dmCloudMode(),
            store: Ext.create('Ext.data.Store', {
                fields: ['name', 'statusId'],
                data: [{
                    name: '-SELECT-',
                    statusId: -1
                }, {
                    name: lanControll.getLanValue('scpPingChannel_' + 0),
                    statusId: 0
                }, {
                    name: lanControll.getLanValue('scpPingChannel_' + 1),
                    statusId: 1
                }, {
                    name: lanControll.getLanValue('scpPingChannel_' + 5),
                    statusId: 5
                }]
            }),
            value: -1
        };

        var adminUserUuid = {
            xtype: 'hiddenfield',
            name: 'adminUserUuid',
            ulan: 'adminUser',
            fieldLabel: 'Admin User',
        };
        var userName = {
            xtype: 'displayfield',
            name: 'userName',
            ulan: 'adminUser',
            fieldLabel: 'Admin User',
        };
        var idleTime = {
            xtype: 'numberfield',
            name: 'idleTime',
            ulan: 'remoteTimeout',
            anchor: '45%',
// id:'domainIdleTime',
            decimalPrecision: 0,
            minValue: 15, maxValue: 100000,
            hidden: rs.dmCloudMode(),
            fieldLabel: 'Remote-web Timeout(sec)',
        };
        var specSysUuid = {
            name: 'specSysUuid',
            fieldLabel: 'Specific Server',
            xtype: 'hiddenfield',
        };
        var specSysName = {
            name: 'specSysName',
            fieldLabel: 'Specific Server',
            xtype: 'hiddenfield',
        };
        var sysUuid = {
            xtype: 'hiddenfield',
            name: 'sysUuid',
            fieldLabel: 'Current Server',
        };
        var serverName = {
            xtype: 'displayfield',
            name: 'serverName',
            fieldLabel: 'Current Server',
        };
        var alarmMax = {
            xtype: 'displayfield',
            name: 'alarmMax',
            fieldLabel: 'Alarm Max',
        };
        var pm15mMax = {
            xtype: 'displayfield',
            name: 'pm15mMax',
            fieldLabel: 'Pm 15m Max',
        };
        var pm15mSn = {
            xtype: 'displayfield',
            name: 'pm15mSn',
            fieldLabel: 'Pm 15m Sn',
        };
        var pm15mCount = {
            xtype: 'displayfield',
            name: 'pm15mCount',
            fieldLabel: 'Pm 15m Count',
        };
        var pm24hMax = {
            xtype: 'displayfield',
            name: 'pm24hMax',
            fieldLabel: 'Pm 24h Max',
        };
        var pm24hSn = {
            xtype: 'displayfield',
            name: 'pm24hSn',
            fieldLabel: 'Pm 24h Sn',
        };
        var pm24hCount = {
            xtype: 'displayfield',
            name: 'pm24hCount',
            fieldLabel: 'Pm 24h Count',
        };
        var pmCallMax = {
            xtype: 'displayfield',
            name: 'pmCallMax',
            fieldLabel: 'Pm Call Max',
            hidden: rs.dmCloudMode(),
        };
        var pmSmsMax = {
            xtype: 'displayfield',
            name: 'pmSmsMax',
            fieldLabel: 'Pm Sms Max',
            hidden: rs.dmCloudMode(),
        };
        var pmUssdMax = {
            xtype: 'displayfield',
            name: 'pmUssdMax',
            fieldLabel: 'Pm Ussd Max',
            hidden: rs.dmCloudMode(),
        };
        var snumberMax = {
            xtype: 'displayfield',
            name: 'snumberMax',
            fieldLabel: 'snumberMax',
            hidden: rs.dmCloudMode(),
        };
        var dnumberMax = {
            xtype: 'displayfield',
            name: 'dnumberMax',
            fieldLabel: 'dnumberMax',
            hidden: rs.dmCloudMode(),
        };
        var detailDesc = {
            xtype: 'textareafield',
            name: 'detailDesc',
            labelWidth: 180,
            height: 50,
            rows: 1,
            fieldLabel: 'Description',
        };

        var domainTab1 = Ext.create('Ext.form.Panel', {
            title: lanControll.getLanValue('tiDomainInfo'),
// id:'domainTab1',
            treeName: '',
            border: false,
            itemId: 'domainForm',
            store: store,
            bodyStyle: {
                background: '#DFE9F6',
            },
// width: 500,
            bodyPadding: 5,
            autoScroll: true,
            fieldDefaults: {
                labelAlign: 'center',
                labelWidth: 180,
                anchor: '75%'
            },

            items: [typeNum, uuid, cloudUuid,
                {
                    xtype: 'fieldset',
                    layout: 'anchor',
                    title: 'Basic Info',
                    ulan: 'fsBasicInfo',
                    itemId: 'domain_basic_info',
                    items: [{
                        border: false,
                        layout: {
                            type: 'table',
                            columns: 3
                        },
                        defaults: {
                            width: 640,
                            height: 25,
                        },
                        bodyStyle: {
                            background: '#DFE9F6',
                        },
                        items: [name,
                            {
                                xtype: 'displayfield',
                                width: 60,
                                rowspan: 4,
                            }, {
                                xtype: 'image',
                                name: 'imgs',
                                rowspan: 4,
                                height: 140,
                                width: 140,
                                border: false,
                                fieldDefaults: {
                                    labelWidth: 100,
                                    anchor: '85%'
                                },
                                src: Ext.get('resources').value + '/images/panel_logo/domain.png',

                            }, alias, {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [adminStatus, {
                                    xtype: 'displayfield',
                                    width: 30,
                                    value: ''
                                }, oprStatus, {xtype: 'displayfield', width: 30, value: ''}, runStatus]
                            }, detailDesc]
                    }]
                },
                {
                    xtype: 'fieldset',
                    layout: 'anchor',
                    title: 'Detail Info',
                    ulan: 'fsDetailInfo',
                    itemId: 'domain_detail_info',
                    layout: 'anchor',
                    collapsible: true,
                    collapsed: false,
                    items: [{
                        xtype: 'displayfield',
                        name: 'productId',
                        ulan: 'domainProductType',
                        fieldLabel: 'Product Type',
                    }, {
                        xtype: 'displayfield',
                        name: 'signType',
                        fieldLabel: 'License Type',
                    }, {
                        xtype: 'displayfield',
                        name: 'licStatus',
                        fieldLabel: 'License Status',
                    }, {
                        xtype: 'displayfield',
                        name: 'leftDays',
                        fieldLabel: 'License Left Days',
                    }, {xtype: 'displayfield', anchor: '75%', value: '<hr>'},
                        vendorId, vendorName, serverName, userName, adminUserUuid, {
                            xtype: 'displayfield',
                            name: 'totalNeCount',
                            fieldLabel: 'Device Count',
                        }, {
                            xtype: 'displayfield',
                            name: 'onlineNeCount',
                            fieldLabel: 'Online Device Count',
                            hidden: rs.dmCloudMode(),
                        }, {
                            xtype: 'displayfield',
                            name: 'totalSimCard',
                            fieldLabel: 'SIM Card',
                            hidden: rs.dmCloudMode(),
                        }, {
                            xtype: 'displayfield',
                            name: 'onlineSimCard',
                            fieldLabel: 'Online SIM Card',
                            hidden: rs.dmCloudMode(),
                        }, {
                            xtype: 'displayfield',
                            name: 'lastLoginTime',
                            fieldLabel: 'Last Login Time',
                        }, {xtype: 'displayfield', anchor: '75%', value: '<hr>'},
                        {
                            xtype: 'radiogroup',
                            name: 'offlineCleanModeAll',
                            fieldLabel: 'OFFLINE SIM Clean Mode',
                            ulan: 'offlineCleanMode',
                            columns: 3,
                            anchor: '65%',
                            hidden: rs.dmCloudMode(),
                            items: [
                                {
                                    boxLabel: 'NULL',
                                    ulan: 'offlineCleanMode_0',
                                    boxLabelCls: 'box_label',
                                    name: 'offlineCleanMode',
                                    inputValue: 0
                                },
                                {
                                    boxLabel: 'PULL_OUT',
                                    ulan: 'offlineCleanMode_1',
                                    boxLabelCls: 'box_label',
                                    name: 'offlineCleanMode',
                                    inputValue: 1
                                },
                                {
                                    boxLabel: 'ALL_UNUSED',
                                    ulan: 'offlineCleanMode_2',
                                    boxLabelCls: 'box_label',
                                    name: 'offlineCleanMode',
                                    inputValue: 2
                                },
                            ]
                        }, {
                            xtype: 'checkbox',
                            name: 'nodeEncryptFlag',
                            boxLabel: 'Node Encrypt Flag',
                            boxLabelCls: 'box_label',
                            inputValue: 1,
                            hidden: rs.dmCloudMode(),
                        },
                        idleSwitchFlag, smoothSwitchFlag, devTimeFlag,
                        {
                            xtype: 'checkbox',
                            name: 'portStatsFlag',
                            boxLabel: 'Enable Port 15M/24H Performance Statistics',
                            boxLabelCls: 'box_label',
                            inputValue: 1,
                            hidden: rs.dmCloudMode(),
                        }, {
                            xtype: 'checkbox',
                            name: 'simStatsFlag',
                            boxLabel: 'Enable SIM 15M/24H Performance Statistics',
                            boxLabelCls: 'box_label',
                            inputValue: 1,
                            hidden: rs.dmCloudMode(),
                        }, {xtype: 'displayfield', anchor: '75%', value: '<hr>', hidden: rs.dmCloudMode(),},
                        switchTimeout, scpTimeoutSec, idleTime, scpPingChannel,
                        {xtype: 'displayfield', anchor: '75%', value: '<hr>', hidden: rs.dmCloudMode(),},
                        {
                            xtype: 'numberfield',
                            anchor: '45%',
                            fieldLabel: 'HBM Auto Sending Retries',
                            name: 'hbmSendRetries',
                            value: 0,
                            minValue: 0,
                            maxValue: 9,
                            hidden: rs.dmCloudMode(),
                        },
                        {
                            xtype: 'checkbox',
                            boxLabel: 'HBM Saving Sent-Fail SMS Record',
                            boxLabelCls: 'box_label',
                            width: 300,
                            name: 'saveSmsFail',
                            inputValue: 1,
                            hidden: rs.dmCloudMode(),
                        },
                        {
                            xtype: 'checkbox',
                            boxLabel: 'HBM Saving Sent-Fail USSD Record',
                            boxLabelCls: 'box_label',
                            width: 300,
                            name: 'saveUssdFail',
                            inputValue: 1,
                            hidden: rs.dmCloudMode(),
                        },
                        {
                            xtype: 'checkbox',
                            boxLabel: 'HBM Saving Sent-Fail CALL Record',
                            boxLabelCls: 'box_label',
                            width: 300,
                            name: 'saveCallFail',
                            inputValue: 1,
                            hidden: rs.dmCloudMode(),
                        },
                        {xtype: 'displayfield', anchor: '75%', value: '<hr>', hidden: rs.dmCloudMode(),}, {
                            xtype: 'checkbox',
                            name: 'timezoneFlag',
                            boxLabel: 'Configure device timezone after device registered',
                            boxLabelCls: 'box_label',
                            inputValue: 1,
                            listeners: {
                                change: function (field, newValue, oldValue, opts) {
                                    var ntpServer1 = domainTab1.down('textfield[name=ntpServer1]');
                                    var ntpServer2 = domainTab1.down('textfield[name=ntpServer2]');

                                    if (newValue) {
                                        ntpServer1.setDisabled(false);
                                        ntpServer2.setDisabled(false);
                                    } else {
                                        ntpServer1.setDisabled(true);
                                        ntpServer2.setDisabled(true);
                                    }
                                }
                            }
                        },
                        ntpServer1,
                        ntpServer2,
                        specSysUuid,
                        specSysName,
                        sysUuid,
                        {
                            name: 'localTimeZone',
                            ulan:'alarmTimeZone',
                            fieldLabel: 'alarmTimeZone',
                            xtype: 'combo',
                            mode : 'local',
                            editable:false,
                            displayField : 'name',
                            valueField : 'value',
                            queryMode : 'local',
                            value:store.localTimeZone,
                            store : Ext.create('Ext.data.Store', {
                                fields : [ 'name', 'value' ],
                                data : [ {
                                    name : '(GMT -12:00) Eniwetok, Kwajalein',
                                    value : 720
                                }, {
                                    name : '(GMT -11:00) Midway Island, Samoa',
                                    value : 660
                                },{
                                    name : '(GMT -10:00) Hawaii',
                                    value : 600
                                },{
                                    name : '(GMT -9:00) Alaska',
                                    value : 540
                                },{
                                    name : '(GMT -8:00) Pacific Time (US & Canada)',
                                    value : 480
                                },{
                                    name : '(GMT -7:00) Mountain Time (US & Canada)',
                                    value : 420
                                },{
                                    name : '(GMT -6:00) Central Time (US & Canada), Mexico City',
                                    value : 360
                                },{
                                    name : '(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima',
                                    value : 300
                                },{
                                    name : '(GMT -4:30) Caracas',
                                    value : 270
                                },{
                                    name : '(GMT -4:00) Atlantic Time (Canada), La Paz, Santiago',
                                    value : 240
                                },{
                                    name : '(GMT -3:30) Newfoundland',
                                    value : 210
                                },{
                                    name : '(GMT -3:00) Brazil, Buenos Aires, Georgetown',
                                    value : 180
                                },{
                                    name : '(GMT -2:00) Mid-Atlantic',
                                    value : 120
                                },{
                                    name : '(GMT -1:00 ) Azores, Cape Verde Islands',
                                    value : 60
                                },{
                                    name : '(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca',
                                    value : 0
                                },{
                                    name : '(GMT +1:00) Brussels, Copenhagen, Madrid, Paris',
                                    value :-60
                                },{
                                    name : '(GMT +2:00) Kaliningrad, South Africa, Cairo',
                                    value : -120
                                },{
                                    name : '(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
                                    value : -180
                                },{
                                    name : '(GMT +3:30) Tehran',
                                    value : -210
                                },{
                                    name : '(GMT +4:00) Abu Dhabi, Muscat, Yerevan, Baku, Tbilisi',
                                    value : -240
                                },{
                                    name : '(GMT +4:30) Kabul',
                                    value : -270
                                },{
                                    name : '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
                                    value : -300
                                },{
                                    name : '(GMT +5:30) Mumbai, Kolkata, Chennai, New Delhi',
                                    value : -330
                                },{
                                    name : '(GMT +5:45) Kathmandu',
                                    value : -345
                                },{
                                    name : '(GMT +6:00) Almaty, Dhaka, Colombo',
                                    value : -360
                                },{
                                    name : '(GMT +6:30) Yangon, Cocos Islands',
                                    value : -390
                                },{
                                    name : '(GMT +7:00) Bangkok, Hanoi, Jakarta',
                                    value : -420
                                },{
                                    name : '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
                                    value : -480
                                },{
                                    name : '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
                                    value : -540
                                },{
                                    name : '(GMT +9:30) Adelaide, Darwin',
                                    value : -570
                                },{
                                    name : '(GMT +10:00) Eastern Australia, Guam, Vladivostok',
                                    value : -600
                                },{
                                    name : '(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
                                    value : -660
                                },{
                                    name : '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka',
                                    value : -720
                                }]
                            }),
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    layout: 'anchor',
                    title: 'Performance Setting',
                    ulan: 'fsPerformanceSetting',
                    itemId: 'domain_per_info',
                    layout: 'anchor',
                    collapsible: true,
                    collapsed: true,
                    items: [alarmMax, pm15mMax, pm15mSn, pm15mCount, pm24hMax,
                        pm24hSn, pm24hCount, pmCallMax, pmSmsMax, pmUssdMax, snumberMax, dnumberMax]
                }, {
                    xtype: 'fieldset',
                    layout: 'anchor',
                    title: 'Alarm SMS Push',
                    ulan: 'fsAlarmSMSPush',
                    name: 'fsAlarmSMSPush',
                    itemId: 'alarmSmsPushPublic',
                    layout: 'anchor',
                    collapsible: true,
                    collapsed: true,
                    items: [{
                        xtype: 'fieldcontainer',
                        layout: 'anchor',
                        itemId: 'alarmPushSms',
                        anchor: '100%',
                        fieldDefaults: {
                            labelWidth: 180
                        },
                        items: [this.createAlarmLevel("sms"), {
                            name: "pushSmsInterval",
                            minValue: 1,
                            value: 1,
                            ulan: 'pushInterval',
                            fieldLabel: "Push Interval(min)",
                            xtype: 'numberfield',
                            anchor: '60%',
                            maxValue: 99,
                            minValue: 1,
                        }, this.createRetryMax('sms'), {
                            xtype: 'combo',
                            fieldLabel: 'Encode by',
                            anchor: '60%',
                            value: 1,
                            mode: 'local',
                            name: 'pushSmsEncode',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name', 'value'],
                                data: [
                                    {name: "UNICODE", value: 0},
                                    {name: "ASCII", value: 1},
                                ]
                            })
                        }, {
                            xtype: 'combo',
                            fieldLabel: 'DWG 1',
                            anchor: '60%',
                            name: 'pushNeUuid1',
                            store: Ext.create("app.store.util.ComboxStore", {}),
// originalValue:null,
                            valueField: 'uuid',
                            displayField: 'name',
                            queryMode: 'local',
                            portNumStore: Ext.create("app.store.operation.domain.PortNumStore", {}),
                            listeners: {
                                change: function (cmp, newValue, oldValue, eOpts) {
                                    var domainPanel = cmp.up("panel[itemId=domainPanel]");
                                    var portNumStore = cmp.portNumStore;
                                    var neUuid = cmp.getValue();
                                    var pushSmsPort1 = domainPanel.down('combo[name=pushSmsPort1]');
                                    pushSmsPort1.store.removeAll();
                                    pushSmsPort1.setValue("");
                                    var pushSmsLevel = this.up("form").down("combo[name=pushSmsLevel]");

                                    if (neUuid > 0 && this.store.getCount() > 0) {
// if(pushSmsLevel.value != 8){
// pushSmsPort1.setDisabled(false);
// }
                                        var params = {neUuid: neUuid};
                                        Ext.apply(portNumStore.proxy.extraParams, params);
                                        portNumStore.load();
                                    }
                                }
                            }
                        }, {
                            xtype: 'combo',
                            fieldLabel: 'DWG Port 1',
                            anchor: '60%',
                            name: 'pushSmsPort1',
                            valueField: 'value',
                            displayField: 'name',
                            queryMode: 'local',
// allowBlank:false,
                            editable: false,
// originalValue:''
                            value: '',
                        }, {
                            xtype: 'combo',
                            fieldLabel: 'DWG 2',
                            anchor: '60%',
                            name: 'pushNeUuid2',
                            store: Ext.create("app.store.util.ComboxStore", {}),
// originalValue:null,
                            valueField: 'uuid',
                            displayField: 'name',
                            queryMode: 'local',
                            portNumStore: Ext.create("app.store.operation.domain.PortNumStore", {}),
                            listeners: {
                                change: function (cmp, newValue, oldValue, eOpts) {
                                    var domainPanel = cmp.up("panel[itemId=domainPanel]");
                                    var portNumStore = cmp.portNumStore;
                                    var neUuid = cmp.getValue();
                                    var pushSmsPort2 = domainPanel.down('combo[name=pushSmsPort2]');
                                    pushSmsPort2.store.removeAll();
                                    pushSmsPort2.setValue("");
                                    var pushSmsLevel = this.up("form").down("combo[name=pushSmsLevel]");
                                    if (neUuid > 0 && this.store.getCount() > 0) {
// if(pushSmsLevel.value != 8){
// pushSmsPort2.setDisabled(false);
// }
                                        var params = {neUuid: neUuid};
                                        Ext.apply(portNumStore.proxy.extraParams, params);
                                        portNumStore.load();
                                    }
                                }
                            }
                        }, {
                            xtype: 'combo',
                            fieldLabel: 'DWG Port 2',
                            anchor: '60%',
                            name: 'pushSmsPort2',
                            valueField: 'value',
                            displayField: 'name',
                            queryMode: 'local',
// allowBlank:false,
                            editable: false,
                            value: '',
// originalValue:''
                        }, {
                            xtype: 'textareafield',
// fieldLabel:'Send To',
                            anchor: '75%',
                            name: 'pushSmsAddr',
                            maxLength: 63,
// enforceMaxLength:true,
                            value: '',
                            fieldLabel: '<label onmouseover=moveOver("alarm_push_sms_addr",event) onmouseout=moveOut() class="tips_label">Send To</label>',
                        }]
                    }]
                }, {
                    xtype: 'fieldset',
                    layout: 'anchor',
                    title: 'Alarm Mail Push',
                    ulan: 'fsAlarmMailPush',
                    name: 'fsAlarmMailPush',
                    itemId: 'alarmMailPushPublic',
                    layout: 'anchor',
                    collapsible: true,
                    collapsed: true,
                    items: [{
                        xtype: 'fieldcontainer',
                        layout: 'anchor',
                        itemId: 'alarmPushMail',
                        border: 0,
                        anchor: '100%',
                        fieldDefaults: {
                            labelWidth: 180
                        },
                        items: [this.createAlarmLevel("mail"), {
                            name: "pushMailInterval",
                            minValue: 1,
                            value: 1,
                            ulan: 'pushInterval',
                            fieldLabel: "Push Interval(min)",
                            xtype: 'numberfield',
                            anchor: '60%',
                            maxValue: 99,
                            minValue: 1,
                        }, this.createRetryMax('mail'), {
                            xtype: 'textareafield',
                            fieldLabel: '<label onmouseover=moveOver("alarm_push_mail_addr",event) onmouseout=moveOut() class="tips_label">Send To</label>',
                            name: 'pushMailAddr',
                            anchor: '75%',
                            maxLength: 128,
                            value: '',
                            validateOnChange: false,
                            validator: function (val) {
                                return checkString(val, /^[\s\.\@A-Za-z0-9;_-]{0,128}$/)
                            }
                        }]
                    }
                    ]
                }
            ],
            maintenance: maintenance,
            createTbar: function () {
                var tbar = [];
                if (!this.maintenance) {
                    var commit = Ext.create('Ext.button.Button', {
                        text: 'Commit',
                        iconCls: 'save',
                        ulan: 'btCommit',
                        flag: "domain_edit",
                        disabled: true,
                        formBind: false, // only enabled once the form is
                        // valid
                        handler: function () {
                            var store = this.up('form').up('panel').up('panel').store;
                            var name = store.getAt(0).get('name');
                            var form = this.up('form').getForm();
                            var params = form.getValues();
                            params["name"] = name;
                            if (form.isValid()) {
                                Ext.Ajax.request({
                                    url: 'domainManager!updateDomainPmHead.action',
                                    method: 'POST',
                                    params: params,
                                    callback: function (options, success, response) {
                                        var obj = Ext.JSON.decode(response.responseText);
                                        if (obj['success']) {
                                            ip.commitSuccess(domainTab1, domainTab1.store);
                                        } else {
                                            ip.commitFailure(domainTab1);
                                        }
                                    }
                                });
                            }
                        }
                    });
                    tbar.push(commit);
                    tbar.push('-');

                    ip.createEditButton(domainTab1, domainTab1.store, tbar);
                    tbar[tbar.length - 2].flag = "domain_edit";
                    var edit = tbar[tbar.length - 2];
                    edit.addListener("click", function () {
                        var domainPanel = edit.up("panel[itemId=domainPanel]");
                        var level = domainPanel.down('combo[name=pushMailLevel]');
                        setTimeout(function () {
                            domainPanel.level_change(level, level.getValue(), level.getValue(), null);
                        }, 300);
                    });
                }


                var importS = Ext.create('Ext.button.Button', {
                    xtype: 'button',
                    text: 'Restore',
                    ulan: 'btRestore',
                    iconCls: 'upgrade',
                    flag: "super_edit",
                    menu: {
                        xtype: 'menu',
                        items: [{
                            text: 'From File',
                            ulan: 'miFromFile',
                            handler: function () {
                                var cmpId = this.up('form').up('panel').up('panel').id;
                                var importConfig = Ext.getCmp('importConfig');
                                if (!importConfig) {
                                    importConfig = Ext.create('app.view.operation.ImportConfig', {
                                        importMode: 'importDomain',
                                        cmpId: cmpId
                                    });
                                    lanControll.setLan(importConfig);
                                }

                                var store = this.up('form').up('panel').up('panel').store;
                                var sysUuid = store.getAt(0).get('sysUuid');

// var cloudUuid=fDomainTab.up('panel').up('panel').cloudUuid;
// var comboxStore = Ext.create("app.store.util.ComboxStore",{});
                                var specSysField = importConfig.down('form').getForm().findField('specSysUuid');
                                var sysLockedFlag = importConfig.down('form').getForm().findField('sysLockedFlag');
                                var importLicField = importConfig.down('form').getForm().findField('importLic');
                                var typeField = importConfig.down('form').getForm().findField('type').setValue(1);


// var specSysStore=specSysField.getStore();
// specSysStore.removeAll();
// comboxStore.on('load',function(){
// specSysStore.add({uuid:0,name:'NULL'});
// for(var i=0; i<comboxStore.getCount(); i++){
// if(comboxStore.getAt(i).get('type')=='server'){
// specSysStore.add(comboxStore.getAt(i));
// }
// }
                                specSysField.setVisible(false);
                                specSysField.setValue(sysUuid);
                                importLicField.setVisible(true);
                                importLicField.setValue(0);
                                sysLockedFlag.setVisible(false);

                                importConfig.importMode = "importDomain";
                                importConfig.cmpId = cmpId;
                                importConfig.show();
// },this,{single: true});
// comboxStore.load({params:{cloudUuid:cloudUuid,types:'server'}});
                            }
                        }, {
                            text: 'From Cloud',
                            ulan: 'miFromCloud',
                            hidden: rs.dnsSysMode(),
                            handler: function () {
                                var store = this.up('form').up('panel').up('panel').store;
// if ( fDomainTab.getSelectionModel().hasSelection() ){
// var records = fDomainTab.getSelectionModel().getSelection();
// var ids;
                                var name = store.getAt(0).get('name');
                                var sysUuid = store.getAt(0).get('sysUuid');
// for ( var i = 0; i < records.length; i++) {
// if(i==0){
// name = records[i].get('name');
// }
// }
                                var cmpId = this.up('form').up('panel').up('panel').id;
                                var importConfig = Ext.getCmp('importConfigFromCloud');
                                if (!importConfig) {
                                    importConfig = Ext.create('app.view.operation.ImportConfigFromCloud', {
                                        importMode: 'importDomain',
                                        cmpId: cmpId
                                    });
                                    lanControll.setLan(importConfig);
                                }

// var cloudUuid=fDomainTab.up('panel').up('panel').cloudUuid;
// var comboxStore = Ext.create("app.store.util.ComboxStore",{});

                                var backupStore = Ext.create("app.store.common.BackupStore", {});
                                var backupField = importConfig.down('form').getForm().findField('backupUuid');
                                var specSysField = importConfig.down('form').getForm().findField('specSysUuid');
                                var sysLockedFlag = importConfig.down('form').getForm().findField('sysLockedFlag');
                                var importLicField = importConfig.down('form').getForm().findField('importLic');
                                // only for test
                                importConfig.down('form').getForm().findField('type').setValue(2);

                                var backupUuidStore = backupField.getStore();
// var specSysStore=specSysField.getStore();
                                backupUuidStore.removeAll();
// specSysStore.removeAll();
// comboxStore.on('load',function(){
// specSysStore.add({uuid:0,name:'NULL'});
// for(var i=0; i<comboxStore.getCount(); i++){
// if(comboxStore.getAt(i).get('type')=='server'){
// specSysStore.add(comboxStore.getAt(i));
// }
// }
                                specSysField.setVisible(false);
                                specSysField.setValue(sysUuid);
                                sysLockedFlag.setVisible(false);

                                importLicField.setVisible(true);
                                importLicField.setValue(0);

                                importConfig.importMode = "importDomain";
                                importConfig.cmpId = cmpId;

                                backupStore.on('load', function () {
// backupUuidStore.add({uuid:-1,name:'-SELECT-'});
                                    for (var i = 0; i < backupStore.getCount(); i++) {
                                        var bs = backupStore.getAt(i);
                                        backupUuidStore.add(bs);
                                    }
                                    importConfig.show();
                                }, this, {single: true});

                                var sysMode = Ext.get('sysMode').value;
                                var params = {};
                                if (sysMode == 10) {
                                    params = {domainName: name, serverUuid: 0, type: 2};
                                } else if (sysMode == 1) {
                                    var serverUuid = Ext.get('realSysUuid').value;
                                    params = {domainName: name, serverUuid: serverUuid, type: 1};
                                }
                                backupStore.load({params: params});

// },this,{single: true});
// comboxStore.load({params:{cloudUuid:cloudUuid,types:'server'}});
// }else{
// Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
// return;
// }

                            }
                        }
                        ]
                    }

                });
                tbar.push(importS);
                tbar.push('-');

                var exportS = Ext.create('Ext.button.Button', {
                    xtype: 'button',
                    text: 'Backup',
                    ulan: 'btBackup',
                    iconCls: 'export',
                    flag: "super_read",
                    menu: {
                        xtype: 'menu',
                        items: [{
                            text: 'To File',
                            ulan: 'miToFile',
                            handler: function () {
// if ( fDomainTab.getSelectionModel().hasSelection() ){
                                var store = this.up('form').up('panel').up('panel').store;
// var records = fDomainTab.getSelectionModel().getSelection();
                                var ids = store.getAt(0).get('uuid');
                                var name = store.getAt(0).get('name');

// for ( var i = 0; i < records.length; i++) {
// if(i==0){
// ids=records[i].get('uuid');
// name = records[i].get('name');
// }else {
// ids=ids+","+records[i].get('uuid');
// }
// }
// if(records.length>1){
// url="exportConfig!exportDomain.action?type=0&domainUuids="+ids;
// }else{
                                url = "exportConfig!exportDomain.action?type=0&domainUuid=" + store.getAt(0).get('uuid');
// }
                                Ext.MessageBox.confirm(boxInfo, boxBackup, function (e) {
                                    if (e == 'yes') {
                                        var boxObj = {
                                            title: boxInfo,
                                            width: 300,
                                            msg: boxWaitMsg,
                                            modal: true,
                                            closable: false,
                                            wait: true
                                        };
                                        var store = Ext.create('app.store.util.StepStore');
                                        sleepBar(store, true);
                                        Ext.Ajax.request({
                                            url: url,
                                            method: 'POST',
                                            timeout: 30 * 60 * 1000,
                                            callback: function (options, success, response) {
                                                boxObj.wait = false;
                                                Ext.MessageBox.hide();
                                                autoRefresh.stopTask(null, store);
                                                var obj = Ext.JSON.decode(response.responseText);
                                                if (obj["success"]) {
                                                    window.location.href = "download/" + obj["fileName"];
                                                } else {
                                                    Ext.MessageBox.alert(boxFailture, boxExportFail);
                                                }
                                            }
                                        })
                                    }
                                });

// }else{
// Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
// return;
// }
                            }
                        }, {
                            text: 'To Cloud',
                            ulan: 'miToCloud',
                            hidden: rs.dnsSysMode(),
                            handler: function () {
                                var store = this.up('form').up('panel').up('panel').store;

// if ( fDomainTab.getSelectionModel().hasSelection() ){
// var records = fDomainTab.getSelectionModel().getSelection();
                                var ids = store.getAt(0).get('uuid');
                                var name = store.getAt(0).get('name');
// for ( var i = 0; i < records.length; i++) {
// if(i==0){
// ids=records[i].get('uuid');
// name = records[i].get('name');
// }else {
// ids=ids+","+records[i].get('uuid');
// }
// }

                                var sysMode = Ext.get('sysMode').value;
                                var type = 2;
                                if (sysMode == 10) {
                                    type = 2;
                                } else if (sysMode = 1) {
                                    type = 1;
                                }
// if(records.length>1){
// url="exportConfig!exportDomain.action?type=1&domainUuids="+ids;
// }else{
                                url = "exportConfig!exportDomain.action?type=" + type + "&domainUuid=" + store.getAt(0).get('uuid');
// }
                                var backupToCloud = Ext.getCmp('backupToCloud');
                                if (!backupToCloud) {
                                    backupToCloud = Ext.create('app.view.operation.BackupToCloud');
                                    lanControll.setLan(backupToCloud);
                                }
                                backupToCloud.url = url;
                                var backupNameField = backupToCloud.down('form').getForm().findField('backupName');
                                var backupDescField = backupToCloud.down('form').getForm().findField('backupDesc');

                                var date = rs.dateFormat(new Date(), 'Y-m-d');
                                backupNameField.setValue(name + '_' + date);

                                var desc = name + " from " + Ext.get('sysAlias').value + " backup to the Cloud by " + Ext.get('username').value;
                                backupDescField.setValue(desc);
                                backupToCloud.show();
// }else{
// Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
// return;
// }
                            }
                        }]
                    },

                });
                tbar.push(exportS);
                tbar.push('-');

                var reload = Ext.create('Ext.button.Button', {
                    xtype: 'button',
                    text: 'Reload',
                    ulan: 'btReload',
                    flag: "domain_action",
                    iconCls: 'synchro',
                    listeners: {
                        click: function () {
                            this.up('form').up('panel').up('panel').store.load();

                            var domainUuid = this.up('form').getForm().findField('uuid').getValue();
                            boxReload = lanControll.getLanValue('boxReload');
                            Ext.MessageBox.confirm(boxInfo, boxReload, function (e) {
                                if (e == 'yes') {
                                    Ext.Ajax.request({
                                        url: 'domainManager!reload.action?uuid=' + domainUuid,
                                        method: 'POST',
                                        callback: function (options, success, response) {
                                            var obj = Ext.JSON.decode(response.responseText);
                                            if (obj['success']) {
                                                Ext.MessageBox.alert(boxSuccess, boxCommitSucc);
                                            } else {
                                                Ext.MessageBox.alert(boxFailture, boxCommitFail);
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    }
                });
                tbar.push(reload);
                var refresh = Ext.create('Ext.button.Button', {
                    xtype: 'button',
                    text: 'Refresh',
                    ulan: 'btRefresh',
                    iconCls: 'refresh2',
                    flag: "domain_read",
                    listeners: {
                        click: function () {
                            this.up('form').up('panel').up('panel').store.load();
                        }
                    }
                });
                tbar.push(refresh);
                for (var i = 0; i < tbar.length; i++) {
                    if (tbar[i] != '-' && tbar[i] != '->') {
                        var text = lanControll.getLanValue(tbar[i].ulan);
                        tbar[i].setText(text);
                    }
                }
// privilege.procPrivilege(domainTab1,tbar);
                var dockedItems = {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: tbar
                };
                this.addDocked(dockedItems);
            },
// listeners:{
// afterlayout:{
// fn:function(){
// this.createTbar();
// lanControll.setFieldSet(this);
// privilege.procPrivilege(domainTab1);
// },
// single:true
// }
// }
        });
        domainTab1.createTbar();
// lanControll.setFieldSet(domainTab1);

        domainTab1.addListener("afterlayout", function () {
            privilege.procPrivilege(domainTab1);
        }, this, {single: true});
        var comboxStore = Ext.create("app.store.util.ComboxStore", {});
        var pushNeUuid1 = domainTab1.down('combo[name=pushNeUuid1]');
        var pushNeUuid2 = domainTab1.down('combo[name=pushNeUuid2]');
        domainTab1.comboxStore = comboxStore;
        var pushNeUuidStore1 = pushNeUuid1.store;
        var pushNeUuidStore2 = pushNeUuid2.store;
        var portNumStore1 = pushNeUuid1.portNumStore;
        var portNumStore2 = pushNeUuid2.portNumStore;
        var pushSmsPort1 = domainTab1.down('combo[name=pushSmsPort1]');
        var pushSmsPort2 = domainTab1.down('combo[name=pushSmsPort2]');
        var createPushSmsPortStore = this.createPushSmsPortStore;
        portNumStore1.on('load', function () {
            if (portNumStore1.getCount() > 0) {
                var cnt = portNumStore1.getAt(0).get("portNum");
                if (cnt > 0) {
                    pushSmsPort1.bindStore(createPushSmsPortStore(cnt));
                }
                // 以下两句是必须的,不然初始化的combo直接显示数字
                pushSmsPort1.setValue(pushSmsPort1.getValue());
            }
        })
        portNumStore2.on('load', function () {
            if (portNumStore2.getCount() > 0) {
                var cnt = portNumStore2.getAt(0).get("portNum");
                if (cnt > 0) {
                    pushSmsPort2.bindStore(createPushSmsPortStore(cnt));
                }
                // 以下两句是必须的,不然初始化的combo直接显示数字
                pushSmsPort2.setValue(pushSmsPort2.getValue());
            }
        })
        comboxStore.on('load', function () {
// comboxStore.filter("type","locksim");
            pushNeUuidStore1.removeAll();
            pushNeUuidStore2.removeAll();
            for (var i = 0; i < comboxStore.getCount(); i++) {
                if (comboxStore.getAt(i).get('type') == 'device') {
                    pushNeUuidStore1.add(comboxStore.getAt(i));
                    pushNeUuidStore2.add(comboxStore.getAt(i));
                }
            }
            store.load();
        })

        domainLoadMask = new Ext.LoadMask(domainTab1, {
            msg: lanControll.getLanValue('maskMsg'),
            disabled: false,
            maskCls: 'loadmaskcss',
            store: store
        });

        store.on('load', function () {
            var value = parseInt(Ext.get('g_usertype'));
            if (value == 0) {
                var picture = domainTab1.getComponent('domain_name').getComponent('picture');
                picture.update("");
                picture.flag = 2;
            }
            var r = store.getAt(0);
            Ext.suspendLayouts();
            domainTab1.loadRecord(r);

            var vendorId = parseInt(r.get('vendorId'));
// var productId=parseInt(r.get('productId'));
            var oprStatus = parseInt(r.get('oprStatus'));
            var runStatus = parseInt(r.get('runStatus'));
            var productIdField = domainTab1.getForm().findField('productId');
            var opr = domainTab1.getForm().findField('oprStatus');
            var run = domainTab1.getForm().findField('runStatus');
// productIdField.setValue(rs.domainProductType(productId));
            productIdField.setValue(rs.vendor(vendorId));
            opr.setValue(rs.oprStatus(oprStatus));
            run.setValue(rs.runStatus(runStatus));
            if (value != 0) {

                var str = rs.adminStatus(r.get('adminStatus'));
                domainTab1.getForm().findField('adminStatus').setValue(str);

                domainTab1.getForm().findField('pm15mMax').setValue(rs.min15(parseInt(r.get('pm15mMax'))));
                domainTab1.getForm().findField('pm24hMax').setValue(rs.hour24(parseInt(r.get('pm24hMax'))));
                domainTab1.getForm().findField('licStatus').setValue(rs.licenseStatus(parseInt(r.get('licStatus'))));
                domainTab1.getForm().findField('signType').setValue(rs.signType(parseInt(r.get('signType'))));
                str = rs.vendor(r.get('vendorId'));
                domainTab1.getForm().findField('vendorName').setValue(str);
                var specSysUuid = store.getAt(0).get('specSysUuid');
// domainTab1.getForm().findField('pushNeUuid').setValue("");
// domainTab1.getForm().findField('pushSmsPort1').setValue("");
// domainTab1.getForm().findField('pushSmsPort2').setValue("");
// for(var i=0;i<comboxStore.getCount();i++){
// if(comboxStore.getAt(i).get('uuid')==specSysUuid){
// str = comboxStore.getAt(i).get('name');
// break;
// }
// }
// domainTab1.getForm().findField('specSysName').setValue(str);

                Ext.Ajax.request({
                    url: 'licenseManager!checkHBMOrAPI.action?domainUuid=' + r.get('uuid'),
                    method: 'POST',
                    callback: function (options, success, response) {
                        var obj = Ext.JSON.decode(response.responseText);
                        if (obj['success']) {
                            var fsAlarmSMSPush = domainTab1.down('fieldset[name=fsAlarmSMSPush]');
                            var fsAlarmMailPush = domainTab1.down('fieldset[name=fsAlarmMailPush]');
                            fsAlarmSMSPush.setTitle(lanControll.getLanValue('fsAlarmSMSPush') + ' (' + obj['hbmMsg'] + ')');
                            fsAlarmMailPush.setTitle(lanControll.getLanValue('fsAlarmMailPush') + ' (' + obj['hbmMsg'] + ')');
                        }
                    }
                });

            }

            Ext.resumeLayouts(true);
        });

        var vendorId = Ext.get('vendorId').value;
        var arr = [];
        arr.push(domainTab1);
        if (vendorId == 3 || vendorId == 103) {
            console.log('vendorId=' + vendorId);
            var id = 'nesInDomainTab';
            if (maintenance) {
                id = 'maintenanceNesInDomainTab';
            }
            var domainTab2 = Ext.create('app.view.operation.domain.MiboxInDomainTab', {
                title: tiDeviceList,
                border: false,
                id: id
            });
            domainTab2.addListener("afterlayout", function () {
                privilege.procPrivilege(domainTab2);
            }, this, {single: true});
            ip.initOtiose(1, domainTab1);
            arr.push(domainTab2);

            var id = 'configNeGmap';
            if (maintenance) {
                id = 'maintenanceNeGmap';
            }
            var gmap = Ext.create('app.view.common.GmapViewPanel', {id: id, title: 'Device Map'});
            arr.push(gmap);
        } else {
            var id = 'nesInDomainTab';
            if (maintenance) {
                id = 'maintenanceNesInDomainTab';
            }
            var domainTab2 = Ext.create('app.view.operation.domain.NesInDomainTab', {
                title: tiDeviceList,
                border: false,
                id: id
            });
            domainTab2.addListener("afterlayout", function () {
                privilege.procPrivilege(domainTab2);
            }, this, {single: true});
            ip.initOtiose(1, domainTab1);
            arr.push(domainTab2);
        }

        var id = 'neNasInDomainTab';
        if (maintenance) {
            id = 'maintenanceNeNasInDomainTab';
        }
        var neNasListPanel = Ext.create('app.view.operation.NeNasInCloudTab', {
            title: lanControll.getLanValue('tiUnknownDeviceList'),
            border: false,
            id: id
        });
        neNasListPanel.addListener("afterlayout", function () {
            privilege.procPrivilege(neNasListPanel);
        }, this, {single: true});
        arr.push(neNasListPanel);

// if(maintenance){
// var tab4 = Ext.create("app.view.module.AlarmPanel",{
// createDesc:'current',
// nodeDesc:'domain',
// id:'domainCurrentAlarmPanel'
// });
// var tab3 = Ext.create("app.view.module.AlarmLogPanel",{
// createDesc:'history',
// nodeDesc:'domain',
// id:'domainHistoryAlarmPanel'
// });
// arr.push(tab4);
// arr.push(tab3);
// }
// var tab = Ext.create("app.view.operation.domain.NeList");
        this.items = [{
            xtype: 'tabpanel',
            items: arr,
            listeners: {
                tabchange: function (tabPanel, newTab, oldTab, obj) {
                    controller.tabpanel_tabchange(tabPanel, newTab, oldTab, obj);
                }
            }
        }];
        this.items[0].initTabNum = this.items[0].items.length;
        for (var i = 0; i < this.items[0].items.length; i++) {
            lanControll.setLan(this.items[0].items[i]);
        }
        this.callParent(arguments);
    },
    createAlarmLevel: function (type) {
        var name = "";
        var fieldLabel = "Level";
        if (type == "sms") {
            name = "pushSmsLevel";
        } else if (type == "mail") {
            name = "pushMailLevel";
        }
        var level = Ext.create("Ext.form.field.ComboBox", {
            xtype: 'combo',
            fieldLabel: fieldLabel,
            anchor: '60%',
            name: name,
            mode: 'local',
            displayField: 'name',
            valueField: 'value',
            queryMode: 'local',
            value: 6,
            editable: false,
            store: Ext.create('Ext.data.Store', {
                fields: ['name', 'value'],
                data: [{
                    name: 'EMERG',
                    value: 0
                }, {
                    name: 'ALERT',
                    value: 1
                }, {
                    name: 'CRIT',
                    value: 2
                }, {
                    name: 'ERR',
                    value: 3
                }, {
                    name: 'WARNING',
                    value: 4
                }, {
                    name: 'NOTICE',
                    value: 5
                }, {
                    name: 'INFO',
                    value: 6
// },{
// name : 'DEBUG',
// value : 7
                }, {
                    name: 'DISABLED',
                    value: 8
                }]
            }),
            listeners: {
                change: function (cmp, newValue, oldValue, eOpts) {
                    var domainPanel = cmp.up("panel[itemId=domainPanel]");
                    domainPanel.level_change(cmp, newValue, oldValue, eOpts);
                }
            }

        });
        return level;
    },
    createRetryMax: function (type) {
        var name = "pushRetryMax";
        var fieldLabel = "Send Retries";
        if (type == "sms") {
            name = "pushSmsRetryMax";
        } else if (type == "mail") {
            name = "pushMailRetryMax";
        }
        var retry = Ext.create("Ext.form.field.Number", {
            name: name,
            minValue: 0,
            value: 0,
            ulan: 'maxFailRetries',
            fieldLabel: fieldLabel,
            anchor: '60%'
        });
        return retry;
    },
    combo_change: function (cmp, newValue, oldValue, eOpts) {
        var container = cmp.up("fieldcontainer");
        if (container.down('combo[name=pushMailLevel]').value == 8)
            return;
        if (!newValue) {
// container.down('textfield[name=smtpServer]').setDisabled(true);
// container.down('textfield[name=smtpPort]').setDisabled(true);
// container.down('textfield[name=smtpUserName]').setDisabled(true);
// container.down('textfield[name=smtpPassWord]').setDisabled(true);
            container.down('textfield[name=mailFrom]').setDisabled(true);
        } else {
// container.down('textfield[name=smtpServer]').setDisabled(false);
// container.down('textfield[name=smtpPort]').setDisabled(false);
// container.down('textfield[name=smtpUserName]').setDisabled(false);
// container.down('textfield[name=smtpPassWord]').setDisabled(false);
            container.down('textfield[name=mailFrom]').setDisabled(false);
        }
    },
    level_change: function (cmp, newValue, oldValue, eOpts) {
        var container = cmp.up("fieldcontainer");
        var domainPanel = cmp.up("panel[itemId=domainPanel]");

        if (newValue == 8) {
            for (var i = 0; i < container.items.items.length; i++) {
                if (container.items.items[i] != cmp)
                    container.items.items[i].setDisabled(true);
            }
        } else {
            for (var i = 0; i < container.items.items.length; i++) {
                if (container.items.items[i] != cmp)
                    container.items.items[i].setDisabled(false);
            }
// if(cmp.name=="pushSmsLevel"){
// var pushNeUuid1 = cmp.up('form').down('combo[name=pushNeUuid1]');
// var pushNeUuid2 = cmp.up('form').down('combo[name=pushNeUuid2]');
// if(pushNeUuid1.store.getCount()==0){
// pushNeUuid1.setDisabled(true);
// }else{
// pushNeUuid1.setDisabled(false);
// }
// if(pushNeUuid2.store.getCount()==0){
// pushNeUuid2.setDisabled(true);
// }else{
// pushNeUuid2.setDisabled(false);
// }
// }
// if(cmp.name=="pushMailLevel"){
// var mail = container.down('checkbox[name=mailRelayEnable]');
// domainPanel.combo_change(mail, mail.getValue(), mail.getValue(), eOpts);
// }
        }
    },
    createPushSmsPortStore: function (cnt) {
        var data = new Array();
        for (var i = 0; i < cnt; i++) {
            var obj = {};
            obj.name = "Port_" + i;
            obj.value = i;
            data.push(obj);
        }
        var fields = [
            {name: 'name', type: 'string'},
            {name: 'value', type: 'int'},

        ];
        var store = Ext.create('Ext.data.Store', {
            fields: fields,
            autoLoad: false,
            data: data
        });
        return store;
    }
});