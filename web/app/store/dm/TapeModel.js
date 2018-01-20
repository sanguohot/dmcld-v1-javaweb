Ext.define('app.store.dm.TapeModel',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'uuid',type: 'int'},
        {name: 'serverUuid',type: 'int'},
        {name: 'startTime',type: 'string'},
        
        {name: 'audioTime',type: 'int'},
        {name: 'mixTime',type: 'int'},
        {name: 'writeTime',type: 'int'},
        {name: 'recordTime',type: 'int'},
        {name: 'fractionLost',type: 'int'},
        {name: 'cumulativeLost',type: 'int'},
        {name: 'extendedMaxSequenceNumber',type: 'int'},
        {name: 'jitter',type: 'int'},
        {name: 'currentBufferSizeMs',type: 'int'},
        {name: 'preferredBufferSizeMs',type: 'int'},
        {name: 'jitterPeaksFound',type: 'int'},
        {name: 'packetLossRate',type: 'int'},
        {name: 'packetDiscardRate',type: 'int'},
        {name: 'expandRate',type: 'int'},
        {name: 'preemptiveRate',type: 'int'},
        {name: 'accelerateRate',type: 'int'},
        {name: 'clockdriftPpm',type: 'int'},
        {name: 'addedZeroSamples',type: 'int'},
        
        {name: 'sessionsCount',type: 'int'},
        {name: 'processedTotal',type: 'int'},
        {name: 'processedFailed',type: 'int'},
        
        {name: 'systemUptime',type: 'int'},
        {name: 'processId',type: 'int'},
        {name: 'processUptime',type: 'int'},
        {name: 'totalMemory',type: 'int'},
        {name: 'freeMemory',type: 'int'},
        {name: 'loadavg1m',type: 'float'},
        {name: 'loadavg5m',type: 'float'},
        {name: 'loadavg15m',type: 'float'},
        {name: 'rxRate',type: 'float'},
        {name: 'txRate',type: 'float'},
        {name: 'diskUsed',type: 'int'},
        {name: 'diskAvailable',type: 'int'},
        
        {name: 'listenIp',type: 'string'},
        {name: 'listenPort',type: 'int'},
        {name: 'maxSessions',type: 'int'},
        
        {name: 'version',type: 'string'},
        
    ]
});