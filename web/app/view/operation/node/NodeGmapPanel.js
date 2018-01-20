Ext.define('app.view.operation.node.NodeGmapPanel',{
	extend:'Ext.panel.Panel',
    autoShow: true,
    layout: 'fit',
    title: lanControll.getLanValue('tiNodeMap'),
    border: false,
    items: {
        xtype: 'gmappanel',
        border:false,
        center: {
            geoCodeAddr: '10,10',
//            marker: {title: ''}
        },
//        center: {
//            geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
//            marker: {title: 'Fenway Park'}
//        },
        markers: [
//                  {
//            lat: 1.310005,
//            lng: 103.845406,
//            title: 'Singapore Node-1',
////            listeners: {
////                click: function(e){
////                    Ext.Msg.alert('Singapore Node-1');
////                }
////            }
//        },{
//        	lat:1.352566,
//        	lng:103.811073,
//        	title:'Singapore Node-2',
//        },{
//        	
//        	lat:35.701917,
//        	lng:139.671707,
//        	title:'Tokyo Node-1',
//        },{
//        	lat:35.621582,
//        	lng:139.416275,
//        	title:'Tokyo Node-2',
//        },{
//        	lat:37.544577,
//        	lng:-78.782959,
//        	title:'Virginia',
//        },{
//        	lat:43.818675,
//        	lng:-120.585937,
//        	title:'Oregon',
//        },{
//        	lat:36.774092,
//        	lng:-119.465332,
//        	title:'California',
//        },{
//        	lat:53.298056,
//        	lng:-7.789307,
//        	title:'Ireland',
//        },{
//        	lat:-33.824794,
//        	lng:151.199341,
//        	title:'Sydney',
//        },{
//        	lat:-23.48592,
//        	lng:-46.645203,
//        	title:'Sao Paulo',
//        }
        ]
    },
    createTbar:function(){
		var tbar = [];
		var commit = Ext.create('Ext.button.Button',{
            text: 'Add Marker',
            iconCls:'add',
            ulan:'btAdd',
            flag:"super_edit",
            handler: function() {
				var gmap=this.up('panel').down('gmappanel');
				gmap.addMarker({
		        	lat:-43.48592,
		        	lng:-26.645203,
		        	title:'Sao Paulo',
		        });
			}
        });
		tbar.push(commit);
		tbar.push('-');
		var refresh = Ext.create('Ext.button.Button',{
      		 xtype:'button',
      		 text:'Refresh',
      		 ulan:'btRefresh',
      		 iconCls:'refresh2',
      		 flag:"super_read",
      		 listeners:{
      		 	click:function(){
					var gmap=this.up('panel').down('gmappanel');
					gmap.afterFirstLayout();

					var store=this.up('panel').up('panel').down('grid[itemId=grid]').store;
					setTimeout(function(){
						for(var i=0;i<store.getCount();i++){
							var node=store.getAt(i);
							var mark={lat:node.get('lat'),lng:node.get('lng'),title:node.get('name')+"\n"+rs.adminStatus(node.get('adminStatus'))};
							console.log(mark);
							gmap.addMarker(mark);
						}
					},1000);
      	 		}
      	 	}
  	 	});
		tbar.push(refresh);
		
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
				
				var gmap=this.up('panel').down('gmappanel');
				console.log(gmap);
				
				var store=this.up('panel').up('panel').down('grid[itemId=grid]').store;
				setTimeout(function(){
					for(var i=0;i<store.getCount();i++){
						var node=store.getAt(i);
						var mark={lat:node.get('lat'),lng:node.get('lng'),title:node.get('name')+"\n"+rs.adminStatus(node.get('adminStatus'))};
						console.log(mark);
						gmap.addMarker(mark);
					}
				},1000);
				
			},
			single:true
		}
	},
	initComponent: function(){
//		var store=this.up('panel').up('panel').down('grid[itemId=grid]').store;
//		var gmap=this.down('gmappanel');
//		for(var i=0;i<store.getCount();i++){
//			var node=store.getAt(i);
//			var mark={lat:node.get('lat'),lng:node.get('lng'),title:node.get('name')};
//			console.log(mark);
//			gmap.addMarker(mark);
//		}
//		gmap.addMarker({
//        	lat:-43.48592,
//        	lng:-26.645203,
//        	title:'Sao Paulo',
//        });
		this.callParent(arguments);	
	}
	
});
