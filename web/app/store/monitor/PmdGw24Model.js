Ext.define('app.store.monitor.PmdGw24Model', {
        extend: 'Ext.data.Model',
        fields: [
                 {name: 'uuid',type:'int'},
                 {name: 'recStatus',type:'int'},
                 {name: 'domainUuid',type:'int'},
                 {name: 'serialNo',type:'int'},
                 {name:'generateTime',type:'string'},
                 {name:'generateTime1',type:'date'},
                 {name: 'simSwitchCount',type:'int'},
                 {name: 'regErrorCount',type:'int'},
//                 {name: 'modOprErrorOnce',type:'int'},
//                 {name: 'modPktCountOnce',type:'int'},
//                 {name: 'modPktRetriesOnce',type:'int'},
//                 {name: 'modPktLossOnce',type:'int'},
                 {name: 'oprErrorAll',type:'int'},
                 {name: 'pktCountAll',type:'int'},
                 {name: 'pktRetriesAll',type:'int'},
                 {name: 'pktLossAll',type:'int'},
//                 {name: 'modSignalMin',type:'int'},
//                 {name: 'modSignalCur',type:'int'},
//                 {name: 'modSignalMax',type:'int'},
//                 {name: 'modBerMin',type:'int'},
//                 {name: 'modBerCur',type:'int'},
//                 {name: 'modBerMax',type:'int'},
//                 {name: 'modRoundDelayMin',type:'int'},
//                 {name: 'modRoundDelayCur',type:'int'},
//                 {name: 'modRoundDelayMax',type:'int'},
//                 {name: 'callTimeOnce',type:'int'},
                 {name: 'callTimeDay',type:'int'},
                 {name: 'callTimeMonth',type:'int'},
                 {name: 'callTimeAll',type:'int'},
                 {name: 'callInTimeAll',type:'int'},
                 {name: 'callOutTimeAll',type:'int'},
                 {name: 'callCountAll',type:'int'},
                 {name: 'callFailCount',type:'int'},
                 {name: 'callShortCount',type:'int'},
                 {name: 'callNormalCount',type:'int'},
                 {name: 'callSuccRate',type:'string'},
//                 {name: 'smsCountOnce',type:'int'},
                 {name: 'smsCountDay',type:'int'},
                 {name: 'smsCountMonth',type:'int'},
                 {name: 'smsCountAll',type:'int'},
                 {name: 'smsInCount',type:'int'},
                 {name: 'smsOutCount',type:'int'},
                 {name: 'smsFailCount',type:'int'},
                 {name: 'smsSuccRate',type:'string'},
                 {name: 'ussdCountDay',type:'int'},
                 {name: 'ussdCountMonth',type:'int'},
                 {name: 'ussdCountAll',type:'int'},
                 {name: 'ussdInCount',type:'int'},
                 {name: 'ussdOutCount',type:'int'},
                 {name: 'ussdFailCount',type:'int'},
                 {name: 'ussdSuccRate',type:'int'},
                 {name: 'callCountDay',type:'int'},
                 {name: 'callCountMonth',type:'int'},
                 
                 
                 {name: 'ACD',type:'int'},
                 {name: 'ASR',type:'int'},
             ]
});