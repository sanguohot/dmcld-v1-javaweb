/**
 * Created by Rainc on 2014/11/12.
 */
Ext.define('app.view.batch.BatchTabPanel',{
	extend:'Ext.tab.Panel',
    border:false,
    layout:'fit',
    needChange:'true',
    bodyStyle: {
        background: '#DFE9F6'
    },
    initComponent: function(){
//        var url = "http://172.16.118.188:4200/model_manage/#/";

        var node = this.node;
        var deviceGrid = Ext.create("app.view.batch.DeviceGrid",{id:'deviceGrid',node:node,title: lanControll.getLanValue('tiDeviceList')});
        deviceGrid.addListener("afterlayout",function(){
            privilege.procPrivilege(deviceGrid);
        },this,{single:true});
        var modelGrid = Ext.create("app.view.batch.ModelGrid",{id:'modelGrid',node:node,title:lanControll.getLanValue('tiModelList')});
        modelGrid.addListener("afterlayout",function(){
            privilege.procPrivilege(modelGrid);
        },this,{single:true});

        this.items=[ modelGrid,deviceGrid];
//        {
//        	xtype:'panel',
//        	title:'模板编辑器',
//        	layout:'fit',
//        	html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+url+'"></iframe>'
//		}
        
        for(var i=0;i<this.items.length;i++){
			lanControll.setLan(this.items[i]);
		}
        this.callParent(arguments);
    },
    listeners:{			
		tabchange:function(tabPanel,newTab,oldTab,obj){
			controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
		}
	}
});