Ext.define('app.store.operation.domain.roamzone.site.nes.AgPortInfoModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'neSnStr',type: 'string'},
	         {name: 'neAlias',type: 'string'},
	         
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

//	   	 <!-- agp info -->
	    	{name: 'agpUuid',type: 'int'},
	    	{name: 'agpRecStatus',type: 'int'},
	    	{name: 'agpPortUuid',type: 'int'},
	    	{name: 'agpAlias',type: 'string'},
	    	{name: 'agpDomainUuid',type: 'int'},
	    	{name: 'agpWorkState',type: 'string'},
	    	{name: 'agpWorkMode',type: 'int'},
	    	{name: 'agpPrimaryStatus',type: 'int'},
	    	{name: 'agpSecondaryStatus',type: 'int'},
	    	{name: 'agpLastFail',type: 'int'},
	    	{name: 'agpCallStatus',type: 'string'},
	    	{name: 'agpLastDuration',type: 'int'},
	    	{name: 'agpVoltage',type: 'int'},
	    	{name: 'agpCurrent',type: 'int'},
	    	{name: 'agpRegFailCount',type: 'int'},
	    	
//	    	<!-- lan info -->
	    	{name: 'lanUuid',type: 'int'},
	    	{name: 'lanRecStatus',type: 'int'},
	    	{name: 'lanPortUuid',type: 'int'},
	    	{name: 'lanAlias',type: 'string'},
	    	{name: 'lanDomainUuid',type: 'int'},
	    	{name: 'lanWorkState',type: 'int'},
	    	{name: 'lanMode',type: 'int'},
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
});