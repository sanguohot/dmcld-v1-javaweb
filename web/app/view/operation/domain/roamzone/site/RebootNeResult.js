//var myStore = Ext.create('Ext.data.Store',{
//    fields: [
//             {name: 'upgradeTypeValue', type: 'string'},
//             {name: 'display',  type: 'string'}
//         ],
//    data : [{upgradeTypeValue:'0',display:'Disable'},{upgradeTypeValue:'1',display:'Manual'}]
//});
var obj = Ext.create("app.util.Status",{});
Ext.define("app.view.operation.domain.roamzone.site.RebootNeResult", {
	extend : 'Ext.window.Window',
	id:'maintenanceRebootNeResult',
	title : tiResult,
	width : 500,
	closeAction: 'hide',
	minWidth : 450,
	minHeight: 150,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    resizable: true,
    modal: true,
    items: [{
        xtype: 'panel',
        itemId:'rebootResultTip',
        html:'',
    },{
        xtype: 'gridpanel',
        itemId:'gridpanel',
        flex: 4,
        store:Ext.create("app.store.operation.domain.roamzone.site.nes.NeRebootResultStore",{}),
        columns: [
 		         
  				{header: 'Device SN',sortable:false,dataIndex: 'productSnStr',ulan:'productSn',flex:1, },
//  				{header: 'Upgrade Type',dataIndex: 'upgradeType',flex:1,
//  				    renderer: function(value){
//  						return obj.upgradeType(value);
//  			        }
//  				},
  				{header: 'Device Name',dataIndex: 'alias',ulan:'neAlias',flex:1, },
  				{header: 'Result', dataIndex: 'result',flex:1,
  					renderer: function(value,metaData,record,rowIndex,store,view){
						if(value == "overtime"){
							return "timeout";
						}else{
							return value;
						}
					}
  				},
  				
  				],
			viewConfig : {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true,
				forceFit :true,
					getRowClass : function(record,rowIndex,rowParams,store){
					  //禁用数据显示红色
					  if(record.get('result')=='success'){
					   return 'row-upgrade-result-success';
					  }else{
					   return 'row-upgrade-result-fail';
					  }
					}
				}
    }],
//    listeners:{
//		beforeshow:function(){
//			form.getForm().findField('upgradeType').setValue('0');
//		}
//	}
});