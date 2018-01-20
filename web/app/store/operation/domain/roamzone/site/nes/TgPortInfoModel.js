Ext.define('app.store.operation.domain.roamzone.site.nes.TgPortInfoModel',{
	extend: 'Ext.data.Model',
	fields: [
	        {name: 'uuid',type: 'int'},
			{name: 'neUuid',type: 'int'},
			{name: 'shelfNo',type: 'int'},
			{name: 'slotNo',type: 'int'},
			{name: 'portNo',type: 'int'},
			{name: 'type',type: 'int'},
			{name: 'alias',type: 'string'},
			{name: 'adminStatus',type: 'int'},
			{name: 'oprStatus',type: 'int'},
			{name: 'runStatus',type: 'int'},
			{name: 'domainUuid',type: 'int'},
	         //tbl_tgp
	         {name: 'tgpUuid',type: 'int'},
	         {name: 'portUuid',type: 'int'},
	         {name: 'tgpAlias',type: 'string'},
	         {name: 'tgpDomainUuid',type: 'int'},
	         {name: 'modType',type: 'int'},
	         {name: 'workState',type: 'int'},
	         {name: 'neSnStr',type: 'string'},
	         {name: 'neAlias',type: 'string'},
	     	
	         {name: 'pcmMode',type: 'int'},
	         {name: 'frameMode',type: 'int'},
	         {name: 'lineCode',type: 'int'},
	         {name: 'lineBuiltOut',type: 'int'},
	         {name: 'clockSrc',type: 'int'},
	         {name: 'slaveType',type: 'int'},
	         {name: 'slaveTgNo',type: 'int'},
	         {name: 'slaveE1Count',type: 'int'},
	         {name: 'slaveStartNo',type: 'int'},
	         {name: 'slaveE1No',type: 'int'},
	         {name: 'slaveIp',type: 'string'},
	         {name: 'tsStatus0',type: 'int'},
	         {name: 'tsStatus1',type: 'int'},
	         {name: 'tsStatus2',type: 'int'},
	         {name: 'tsStatus3',type: 'int'},
//	     	<!-- eth info -->
	        {name: 'ethUuid',type: 'int'},
	        {name: 'ethRecStatus',type: 'int'},
	        {name: 'ethPortUuid',type: 'int'},
	        {name: 'ethAlias',type: 'string'},
	        {name: 'ethDomainUuid',type: 'int'},
	        {name: 'ethWorkState',type: 'int'},
	        {name: 'ethMode',type: 'int'},
	     	
//	     	    <!-- dsp info -->
	        {name: 'dspUuid',type: 'int'},
	        {name: 'dspRecStatus',type: 'int'},
	        {name: 'dspPortUuid',type: 'int'},
	        {name: 'dspDomainUuid',type: 'int'},
	        {name: 'dspAlias',type: 'string'},
	        {name: 'dspWorkStatus',type: 'int'},
	        {name: 'dspPcmLaw',type: 'int'},
	        {name: 'dspWorkTime',type: 'int'},
	        {name: 'dspCalcuAlo',type: 'int'},
	        {name: 'dspChannelNum',type: 'int'},
	        {name: 'dspChannelFail',type: 'int'},
	        {name: 'dspRtpDelay',type: 'int'},
	        {name: 'dspRtpDelayMax',type: 'int'},
	        {name: 'dspRtpDbm',type: 'int'},
	        
//	     	    <!-- ss7 info -->
	        {name: 'ss7Uuid',type: 'int'},
	        {name: 'ss7RecStatus',type: 'int'},
	        {name: 'ss7PortUuid',type: 'int'},
	        {name: 'ss7DomainUuid',type: 'int'},
	        {name: 'ss7Alias',type: 'string'},
	        {name: 'ss7WorkStatus',type: 'int'},
	        {name: 'ss7Mode',type: 'int'},
	        {name: 'ss7Type',type: 'int'},
	        {name: 'ss7GrpId',type: 'int'},
	        {name: 'ss7CurCalls',type: 'int'},
	        {name: 'ss7CurCallsMax',type: 'int'},
	        {name: 'ss7Acd',type: 'int'},

	        {name: 'ss7Proto',type: 'int'},
	        {name: 'ss7NetIndi',type: 'int'},
	        {name: 'ss7Opc',type: 'string'},
	        {name: 'ss7Dpc',type: 'string'},
	        {name: 'ss7Link0Slc',type: 'int'},
	        {name: 'ss7Link0Port',type: 'int'},
	        {name: 'ss7Link0Ts',type: 'int'},
	        {name: 'ss7Link1Slc',type: 'int'},
	        {name: 'ss7Link1Port',type: 'int'},
	        {name: 'ss7Link1Ts',type: 'int'},
	        {name: 'ss7Link1Status',type: 'int'},
	        {name: 'ss7Link0Status',type: 'int'},
	        {name: 'ss7SendSltm',type: 'int'},
	        {name: 'ss7Asr',type: 'int'},
	        
//	     	    <!-- pri info -->
	        {name: 'priUuid',type: 'int'},
	        {name: 'priRecStatus',type: 'int'},
	        {name: 'priPortUuid',type: 'int'},
	        {name: 'priDomainUuid',type: 'int'},
	        {name: 'priAlias',type: 'string'},
	        {name: 'priWorkStatus',type: 'int'},
	        {name: 'priCurCalls',type: 'int'},
	        {name: 'priCurCallsMax',type: 'int'},
	        {name: 'priAcd',type: 'int'},

	        {name: 'priProto',type: 'int'},
	        {name: 'priSwside',type: 'int'},
	        {name: 'priAlertIndi',type: 'int'},
	        {name: 'priAsr',type: 'int'},
	        
//	     	    <!-- sip info -->
	        {name: 'sipUuid',type: 'int'},
	        {name: 'sipRecStatus',type: 'int'},
	        {name: 'sipPortUuid',type: 'int'},
	        {name: 'sipDomainUuid',type: 'int'},
	        {name: 'sipAlias',type: 'string'},
	        {name: 'sipWorkStatus',type: 'int'},
	        {name: 'sipRegFlag',type: 'int'},
	        {name: 'sipCallMode',type: 'int'},
	        {name: 'sipRemoteAddr',type: 'string'},
	        {name: 'sipRemotePort',type: 'int'},
	        {name: 'sipAsr',type: 'int'},
	        {name: 'sipCurCalls',type: 'int'},

	        {name: 'sipTransProto',type: 'int'},
	        {name: 'sipAuthType',type: 'int'},
	        {name: 'sipSipT',type: 'int'},
	        {name: 'sipLinkStatus',type: 'int'},
	        {name: 'sipDetectTrunk',type: 'int'},
	        {name: 'sipBindGrp',type: 'int'},
	        {name: 'sipExpireTime',type: 'int'},
	        {name: 'sipAcctName',type: 'string'},
	        {name: 'sipProtoVer',type: 'string'},
	        {name: 'sipAcd',type: 'int'},
	        
	        /* pmd */
	        {name: 'value0',type:'int'},
            {name: 'value1',type:'int'},
            {name: 'value2',type:'int'},
            {name: 'value3',type:'int'},
            {name: 'value4',type:'int'},
            {name: 'value5',type:'int'},
            {name: 'value6',type:'int'},
            {name: 'value7',type:'int'},
            {name: 'value8',type:'int'},
            {name: 'value9',type:'int'},
            
	         ]
})