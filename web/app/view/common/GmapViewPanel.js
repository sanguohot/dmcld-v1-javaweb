Ext.define('app.view.common.GmapViewPanel',{
	extend:'Ext.panel.Panel',
    autoShow: true,
    layout:'border',
    border: false,
    initComponent: function(){
		var store= Ext.create('app.store.operation.domain.roamzone.site.NesAndLockSimStore', {}); 
//		store.on('beforeload',function(){
//			nesStore.loadFlag = false;
//		});
		this.store = store;
		
		var gmap=Ext.create('app.util.GMapPanel',{
	        store:store,
	        border:false,
	        center: {
	            geoCodeAddr: '10,10',
//	            marker: {title: ''}
	        },
//	        center: {
//	            geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
//	            marker: {title: 'Fenway Park'}
//	        },
	        markers: []
		});
		
		store.on('load',function(){
			
				var muliTitle="";
				var a=0;
				var isMuli=false;
				try{
					gmap.removeMarkers();
				}catch(e){
					return;
				}
				var centerLat=0;
				var centerLng=0;
				var centerMarker=null;
				var centerI=0;
				var infowindow=null;
				for(var i=0;i<store.getCount();i++){
					var record=store.getAt(i);
					
					var uuid=record.get('uuid');
					var domainUuid=record.get('domainUuid');
					var oldLat=record.get('locLat');
					var oldLng=record.get('locLng');
					var runStatus=record.get('runStatus');
					var operator=record.get('operator');
					var modSignalLevel=record.get('modSignalLevel');
					var modStatus=record.get('modStatus');
					var signal="";
					var status="";
					if(modSignalLevel==1){
						signal="■□□□□";
					}else if(modSignalLevel==2){
						signal="■■□□□";
					}else if(modSignalLevel==3){
						signal="■■■□□";
					}else if(modSignalLevel==4){
						signal="■■■■□";
					}else if(modSignalLevel==5){
						signal="■■■■■";
					}else{
						signal="-";
					}
					
					if(runStatus==1 || runStatus==6 || runStatus==9){
						signal="-";
						operator="-";
						status=rs.runStatus(runStatus);
					}else{
						if(modStatus!=5){
							signal="-";
						}
						status=rs.modStatus(modStatus);
					}
					
					if(operator=="" || operator == null){
						operator=" - ";
					}
					var oldTitle="Name   : "+record.get('alias')
								+"\nStatus   : "+status
								+"\nOperator: "+operator
								+"\nSignal   : "+signal;
					
					var content="Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: "+record.get('alias')
							   +"<br/>Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: "+status
							   +"<br/>Operator&nbsp;: "+operator
							   +"<br/>Signal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: "+signal;
					
					var locStatus=record.get('locStatus');
					var cid=record.get('locCellId');
					var lac=record.get('locLac');
					if(oldLat==0 && oldLng==0){
						isMuli=true;
						a++;
						muliTitle=muliTitle+"mibox-"+a+":"+record.get('alias')+"("+status+" , "+operator+" , "+signal+")<br/>";
					}else{
						isMuli=false;
					}
					console.log("locStatus="+locStatus);
					var temp=new Array();
					temp[0]=uuid;
					temp[1]=oldTitle;
                	temp[2]=content;
                	temp[3]=oldLat;
                	temp[4]=oldLng;
                	temp[5]=i;
					if(locStatus==1 && cid!=0 && lac!=0){
						/* 如果位置变更 */
	                	var apiKey=rs.apiKey();
	                	var url="http://api.opensignal.com/v2/towerinfo.json?cid="+cid+"&lac="+lac+
	                	"&sid=&phone_type=&network_id=&apikey="+apiKey;
	                	console.log('getlatlng api key='+apiKey);
	                	ajaxrequest(url,"get",true,null,
	            			function(rs,temp){
//								console.log("temp="+temp);
	                			var obj=eval('('+rs.responseText+')');
								if(obj['tower1']){
									var lat=obj['tower1'].est_lat;
									var lng=obj['tower1'].est_lng;
									console.log("----->get success lat="+lat+",lng="+lng+", title="+temp[1]);
									var marker=gmap.addMarker({
										lat:lat,
										lng:lng,
										title:temp[1]
									});
									marker.uuid=temp[0];
									gmap.attachSecretMessage(marker,temp[2]);
									if(gmap.gmap.uuid==temp[0] || store.getCount()==1){
										gmap.gmap.setCenter(oldLat,oldLng);
										marker.infowindow.open(gmap.gmap,marker);
									}
									var latLngs=temp[0]+"S"+lat+"S"+lng;
									console.log("<-----put latlng uuid="+latLngs);
									ip.putLatLng(latLngs,domainUuid);
								}else{
									//如果没有查询到数据，使用数据库的数据
									console.log("----->get no record lat="+temp[3]+",lng="+temp[4]+", title="+temp[1]);
									var marker=gmap.addMarker({
										lat:temp[3],
										lng:temp[4],
										title:temp[1]
									});
									marker.uuid=temp[0];
									gmap.attachSecretMessage(marker,temp[2]);
									if(gmap.gmap.uuid==temp[0] || store.getCount()==1){
										gmap.gmap.setCenter(oldLat,oldLng);
										marker.infowindow.open(gmap.gmap,marker);
									}
									var latLngs=temp[0]+"S"+temp[3]+"S"+temp[4];
									console.log("<-----put latlng uuid="+latLngs);
									ip.putLatLng(latLngs,domainUuid);
									
									
								}
							}
	                	,temp);
					}else{
						console.log("not get lat="+oldLat+",lng="+oldLng+", title="+oldTitle);
						
						var marker=gmap.addMarker({
							lat:oldLat,
							lng:oldLng,
							title:oldTitle
						});
						marker.uuid=uuid;
						if(isMuli){
							gmap.attachSecretMessage(marker,muliTitle);
						}else{
							gmap.attachSecretMessage(marker,content);
						}
						if(gmap.gmap.uuid==uuid || store.getCount()==1){
							gmap.gmap.setCenter(oldLat,oldLng);
							gmap.centerMarker=marker;
							marker.infowindow.open(gmap.gmap,marker);
						}
						
					}
					
				}

		});
		
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
				name:'productSn',
			},{
				xtype:'textfield',
				fieldLabel:'Alias',
				name:'alias',
			},rs.createAdminStatus(null,[0,1,2],null),rs.createRunStatus(20,null),{
				xtype:'textfield',
				fieldLabel:'Version',
				name:'version',
			}
			],
			buttons : [{
					text : 'Reset',
					ulan:'btReset',
					flag:"domain_read",
					handler : function() {
						this.up('form').getForm().reset();
						this.up('form').getForm().findField('adminStatus').setValue(0);
						this.up('form').getForm().findField('runStatus').setValue(0);
					}
			},{
			text : 'Search',
			ulan:'btSearch',
			flag:"domain_read",
			handler : function() {
				
				var domainUuid=this.up('form').up('panel').up('panel').treeId;
				
				var form=this.up('form').getForm();
				form.findField('domainUuid').setValue(domainUuid);
				var params = form.getValues();
				store.removeAll();
				store.on('beforeload', function (store, options) {
    				Ext.apply(store.proxy.extraParams, params);
    			},this,{single:true});
//				var panel = this.up('form').up('panel').up('panel');
//				var paging = panel.down("pagingtoolbar");
//				paging.moveFirst();
				store.load();
			}
			}]
		});
		this.items=[{
			 region: 'center',
			 layout:'fit',
			 border:false,
			 items:[gmap]
		},{
			 itemId:'search',
			 region:'east',
			 title : tiSearch,
			 collapsible: true,
			 collapsed:true,
			 width:300,
			 items:[search_grid]
		 }];
		
		this.callParent(arguments);	
	},
    createTbar:function(){
    	var me =this;
		var tbar = [];
		var commit = Ext.create('Ext.button.Button',{
            text: 'Add Marker',
            iconCls:'add',
            ulan:'btAdd',
            flag:"super_edit",
            handler: function() {
				var addMarker=Ext.getCmp('addMarker');
				var cmpId=this.up('panel').id;
				if(addMarker==undefined){
					addMarker=Ext.create('app.view.operation.node.AddMarker',{});
				}
				addMarker.cmpId=cmpId;
				addMarker.show();
			}
        });
//		tbar.push(commit);
//		tbar.push('-');
		var refresh = Ext.create('Ext.button.Button',{
      		 xtype:'button',
      		 text:'Refresh',
      		 ulan:'btRefresh',
      		 iconCls:'refresh2',
      		 flag:"super_read",
      		 listeners:{
      		 	click:function(){
					var gmap=this.up('panel').down('gmappanel');
//					if(gmap==undefined){
//						loadGmapScript();
//					}
					var center=gmap.center;
					gmap.removeMarkers();
					var store=this.up('panel').down('gmappanel').store;
					store.load();
      	 		}
      	 	}
  	 	});
		tbar.push(refresh);
		var refresh2 = Ext.create('Ext.button.Button',{
			xtype:'button',
			text:'Refresh2',
			iconCls:'refresh2',
			flag:"super_read",
			listeners:{
			click:function(){
				var gmap=this.up('panel').down('gmappanel');
				
				var marker=gmap.centerMarker;
//				console.log("Marker="+marker+",infowindow="+marker.infowindow);
//				marker.infowindow.open(gmap.gmap,marker);
//				marker.infowindow.close();
				console.log('marker.fencees='+marker.fences);
//				var mks=gmap.markers;
//				for(var i=0;i<mks.length;i++){
//					gmap.removeMarkers();
//				}
//				gmap.removeMarkers();
//				gmap.clearMarkers();
//				console.log(mks.length);
//				gmap.removeMarkers();
			}
		}
		});
//		tbar.push(refresh2);
		var refresh3 = Ext.create('Ext.button.Button',{
			xtype:'button',
			text:'Add',
			iconCls:'refresh2',
			flag:"super_read",
			listeners:{
			click:function(){
			var gmap=this.up('panel').down('gmappanel');
//			var m=gmap.addMarker({
//				lat: -12.143333,
//				lng: -77.128333,
//				title: 'TEST',
//			});
//			gmap.attachSecretMessage(m,"TEST</br>TEST2");
			gmap.gmap.setZoom(11);
//			gmap.gmap.setCenter(-12.143333,-77.128333);
//			alert(gmap.gmap.markers);
		}
		}
		});
//		tbar.push(refresh3);
		
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
		tbar.push('->');
		tbar.push(search);
		
		var dockedItems = {
				xtype:'toolbar',
				dock: 'top',
				items:tbar
		};
		this.addDocked(dockedItems);
	},
	
	listeners:{
		afterlayout:{
			fn:function(){
				this.createTbar();
				lanControll.setFieldSet(this);
				lanControll.setLan(this);
			},
			single:true
		}
	},
	
});
