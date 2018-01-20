
Ext.define('app.view.sms.DomainOutboxGrid', {
		extend:'Ext.grid.Panel', 
		columnLines:true,
		id:'domainOutboxGrid',
		store:Ext.create('app.store.sms.SimSmlStore',{}),
		title:lanControll.getLanValue('tiOutboxList'),
		border:false,
		treeName:'',
		autoScroll:true,
		viewConfig: {
			loadMask:{
				msg:lanControll.getLanValue('maskMsg')
			},
			enableTextSelection: true
  		},
		columns: [
			{header: 'smsSn',dataIndex: 'smsSn',ulan:'snAbbr',width:120,hidden:true},
			{header: 'alias',dataIndex: 'alias',width:120,hidden:true},
			{header: 'smsNumber',dataIndex: 'smsNumber',width:120},
			{header: 'smsStatus',dataIndex: 'smsStatus',width:120,
				renderer:function(val){  
					return rs.smsStatus(val);
				}
			},
			
			{header: 'content',dataIndex: 'content',flex:1,minWidth:120},
			
			{header: 'smsTime',dataIndex: 'smsTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120},
			{header: 'smsResult',dataIndex: 'smsResult',width:120,
				renderer:function(val){  
					return rs.smsUssdCallResult(val);
				}
			},
			{header: 'smsReceipt',dataIndex: 'smsReceipt',width:120,hidden:true},
			{header: 'resultTime',dataIndex: 'resultTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
			{header: 'receiptTime',dataIndex: 'receiptTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
			{header: 'domainUuid',dataIndex: 'domainUuid',width:60,hidden:true},
			{header: 'gwpUuid',dataIndex: 'gwpUuid',ulan:'gwpUuid',width:120,hidden:true},
			{header: 'simUuid',dataIndex: 'simUuid',width:120,hidden:true},
			
		],
		listeners:{
			itemdblclick: function(grid, row, columnindex,e){
				var smsDirection=row.get('smsDirection');
				var smsNumber=row.get('smsNumber');
				var smsStatus=row.get('smsStatus');
				var content=row.get('content');
				var smsDetail=Ext.getCmp('smsDetail');
				if(smsDetail==undefined || smsDetail==null){
					smsDetail=Ext.create('app.view.sms.SmsDetail',{});
				}
				smsDirection=rs.smsDirection(smsDirection);
				smsStatus=rs.smsStatus(smsStatus);
				smsDetail.down('form').getForm().findField('smsDirection').setVisible(false);
				smsDetail.down('form').getForm().findField('smsNumber').setValue(smsNumber);
				smsDetail.down('form').getForm().findField('smsStatus').setValue(smsStatus);
				smsDetail.down('form').getForm().findField('content').setValue(content);
				smsDetail.show();
			}
		},
		dockedItems : [{
		     dock: 'bottom',
			 xtype: 'pagingtoolbar',
		     store: simSmsStore ,
		     pageSize: 10,
		     limit:10,
		     displayInfo: true,
		}]
});