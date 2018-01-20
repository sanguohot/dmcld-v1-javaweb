//var gwp15Store=Ext.create('app.store.monitor.PmdGwp15Store',{})
Ext.define('app.view.monitor.domain.zone.port.TgMntGrid', {
	extend:'Ext.grid.Panel',
	requires: [
              'Ext.util.Format',
              'Ext.grid.Panel',
              'Ext.toolbar.Paging',
	           ],
	columnLines:true,
	title:ti15MinList,
	border:false,
	treeName:'',
//	itemId:'grid',
	autoScroll:true,
	flag:null,
	viewConfig: {
		loadMask:{
			msg:lanControll.getLanValue('maskMsg')
		},
		enableTextSelection: true
	},
//	selModel: Ext.create('Ext.selection.CheckboxModel',{injectCheckbox:1}),//Ext.create('Ext.selection.CheckboxModel'),
	initComponent: function() {
		var store = Ext.create("app.store.monitor.PmdTgMntStore");
		if(this.flag){
			var params = { flag:this.flag};
			Ext.apply(store.proxy.extraParams, params);
		}
		this.store = store;
		this.createTbar();
		this.createColumns(this.flag);
		
		var paging = Ext.create("Ext.toolbar.Paging",{
		     store: store ,
		     pageSize: 10,
		     limit:10,
		     displayInfo: true,
		});
		
		this.dockedItems = {
				xtype:'pagingtoolbar',
				dock: 'bottom',
				store: store ,
				pageSize: 10,
				limit:10,
				displayInfo: true,
				items:[
		            '-', {
		       		 xtype:'button',
		       		 text:'Export',
		       		 ulan:'btExport',
		       		 iconCls:'export',
		       		 listeners:{
		       		 	click:function(){
//							var gwUuid=Ext.getCmp('gw15Grid').treeName;	
						var params = store.getProxy().extraParams;
						Ext.MessageBox.confirm(boxWarnning,boxExport,function(e) { 																				
							if( e == 'yes' )
							{
								Ext.Ajax.request({
			                		url:'pmdTgMntManager!exportTgPort.action',
			                		method:'POST',
			                		params:params,
			                		callback: function (options, success, response) {
										var obj=Ext.JSON.decode(response.responseText);
				                    	if(obj["success"]){
				                    		window.location.href="download/"+obj["fileName"];
				                    	}else{
				                    		Ext.MessageBox.alert(boxFailture,boxExportFail);
				                    	}
			                    	}
			                	})
							}
							})
		       		
		       	 		}
		       	 	}
		       	 
		            }]
		};

//		this.addDocked(dockedItems);

		this.callParent(arguments);		
	},
	createColumns:function(flag){
		var columns = [];
		var tgMntAlias = Ext.create("Ext.grid.column.Column",{
			header:"Alias",
			dataIndex:"alias",
			minWidth:120,
			flag:1,
			hidden:false
		});
		var uuid = Ext.create("Ext.grid.column.Column",{
			header:"uuid",
			dataIndex:"uuid",
			width:50,
			hidden:true
		});
		var recStatus = Ext.create("Ext.grid.column.Column",{
			header:"recStatus",
			dataIndex:"recStatus",
			width:70,
			hidden:true
		});
		var portUuid = Ext.create("Ext.grid.column.Column",{
			header:"portUuid",
			dataIndex:"portUuid",
			width:50,
			hidden:true,
		});
		var serialNo = Ext.create("Ext.grid.column.Column",{
			header:"serialNo",
			dataIndex:"serialNo",
			ulan:'snAbbr',
			width:100,
			hidden:true,
		});
		var generateTime = Ext.create("Ext.grid.column.Column",{
			header:"generateTime",
			dataIndex:"generateTime",
			minWidth:160,
			flag:1,
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
 				return rs.timeFormat(value);
    		}
		});
		var domainUuid = Ext.create("Ext.grid.column.Column",{
			header:"domainUuid",
			dataIndex:"domainUuid",
			width:80,
			hidden:true,
		});

		if(flag.indexOf("cur")>=0 && this.id.charAt(0)=='f'){
			columns.push(tgMntAlias);
		}
		
		columns.push(uuid);
		columns.push(recStatus);
		columns.push(portUuid);
		
		columns.push(serialNo);
		columns.push(generateTime);
		columns.push(domainUuid);
		this.createValueColumn(columns,flag);
		this.columns = columns;
	},
	createValueColumn:function(columns,flag){
		var tgpHeaderArr = ["FrameErr","CodeErr","CrcErr","EbitErr","WorkTime","TotalCallTime","SendFrameNum","RecvFrameNum","SendFailNum","RecvFailNum"];
		var ethHeaderArr = ["RxPkt","TxPkt","TxByte","RxByte"];
		var dspHeaderArr = ["MsgRetries","RecvDupMsg","DelayErr","LostCnt","JitterErr","RtpErr","RstCnt"];
		var ss7HeaderArr = ["TotalCallCnt","TotalFailCall"];
		var sipHeaderArr = ["Ip2PstnCall","Pstn2IpCall","Ip2PstnFail","Pstn2IpFail","LostCnt","WorkTime"];
		var agpHeaderArr = ["TotalOutCallCnt","TotalOutFailCall","TotalInCallCnt","TotalInFailCall"];
		var arr = null;
		if(flag.indexOf("tgp")>=0){
			arr = tgpHeaderArr;
		}else if(flag.indexOf("eth")>=0 || flag.indexOf("lan")>=0){
			arr = ethHeaderArr;
		}else if(flag.indexOf("dsp")>=0){
			arr = dspHeaderArr;
		}else if(flag.indexOf("ss7")>=0 || flag.indexOf("pri")>=0){
			arr = ss7HeaderArr;
		}else if(flag.indexOf("sip")>=0){
			arr = sipHeaderArr;
		}else if(flag.indexOf("agp")>=0){
			arr = agpHeaderArr;
		}
		if(arr){
			for(var i=0;i<arr.length;i++){
				var headerText=arr[i];
				var str1 = headerText.substr(1);
				var ulan = "";
				if(flag.indexOf("cur")<0){
					if(headerText=='TotalCallTime' || headerText=='TotalCallCnt' || headerText=='TotalFailCall'
						|| headerText=='Ip2PstnCall' || headerText=='Pstn2IpCall' || headerText=='Ip2PstnFail' || headerText=='Pstn2IpFail'
					){
						ulan=headerText.charAt(0).toLowerCase()+str1+"Spec";
					}else{
						ulan=headerText.charAt(0).toLowerCase()+str1+"Abbr";
					}
				}else{
					ulan=headerText.charAt(0).toLowerCase()+str1+"Abbr";
				}
				
				var obj = Ext.create("Ext.grid.column.Column",{
					header:headerText,
					header2:headerText,
					dataIndex:"value"+i,
					minWidth:80,
					ulan:ulan,
					flag:1,
					hidden:false,
					renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
						value=rs.sigToUnsig(value);
						var col = this.down('headercontainer').getHeaderAtIndex(colIndex);
						var ulan = col.ulan;
						var dataIndex = col.dataIndex;
						var headerText=col.header2;
						if(ulan == "workTimeAbbr"){
//							console.log(value+'----'+dataIndex+'---'+colIndex)
							return rs.tranSecondMin(value,null);
						}
						if(flag.indexOf("cur")<0){
							
							if(headerText=='TotalCallTime' || headerText=='TotalCallCnt' || headerText=='TotalFailCall'
								|| headerText=='Ip2PstnCall' ||headerText=='Pstn2IpCall' || headerText=='Ip2PstnFail' || headerText=='Pstn2IpFail'
							){
								if(store.getAt(rowIndex+1)){
									var t=store.getAt(rowIndex+1).get(dataIndex);
//									if(value>=0){
										t=value-t;
//										console.log(store.getAt(rowIndex).get(dataIndex));
										return value+"/"+ t;
//									}
								}else{
									if(value>0){
										return value+"/-";
									}else{
										return value;
									}
								}
							}
						}
						
						
						return value;
					} 
				});
				
				columns.push(obj);
			}
		}
	},
	createTbar:function(){
		var tbar = [];
		var store = this.store;
		var refresh = Ext.create("Ext.button.Button",{
      		 xtype:'button',
       		 text:'Refresh',
       		 ulan:'btRefresh',
       		 iconCls:'refresh2',
       		 listeners:{
       		 	click:function(){
					store.load();
       	 		}
       	 	}
       	});
		tbar.push(refresh);
		this.tbar = tbar;
	}
});