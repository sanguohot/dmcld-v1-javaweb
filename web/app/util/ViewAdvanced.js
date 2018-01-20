var form = Ext.widget('form', {
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    frame:true,
    bodyPadding: 10,
    defaults: {
        margins: '0 0 10 0'
    },
    items: [{
        xtype: 'combo',
        name: 'item',
        fieldLabel: lanControll.getLanValue('miUserView'),
		mode : 'local',
		editable:false,
		displayField : 'name',
		valueField : 'statusId',
		queryMode : 'local',
		store : Ext.create('Ext.data.Store', {
			fields : [ 'name', 'statusId' ],
			data : [ {
				name : lanControll.getLanValue('miUserView1'),
				statusId : 1
			}, {
				name : lanControll.getLanValue('miUserView2'),
				statusId : 2
			}, {
				name : lanControll.getLanValue('miUserView3'),
				statusId : 3
			} ]
		}),
		allowBlank: false,
    
    },{
    	itemId:'viewGroup',
        xtype: 'checkboxgroup',
        name:'viewGroup',
        fieldLabel: lanControll.getLanValue('content'),
        columns: 3,
        vertical: true,
        items: []
    },{
    	xtype:'hiddenfield',
    	name:'cmpId',
    },{
    	xtype:'hiddenfield',
    	name:'mode',
    }],

    buttons: [{
    	text:lanControll.getLanValue('btCancel'),
        ulan:'btCancel',
        handler: function() {
            this.up('form').getForm().reset();
            this.up('window').hide();
        }
    }, {
        text: lanControll.getLanValue('btCommit'),
        ulan:'btCommit',
        handler: function() {
            if (this.up('form').getForm().isValid()) {
               
	                var form = this.up('form').getForm();
	                var cmpId=this.up('form').down('hiddenfield[name=cmpId]').getValue();
	                var item=this.up('form').down('combo[name=item]').getValue();
	                var mode=this.up('form').down('hiddenfield[name=mode]').getValue();
	                
	                var un=Ext.get('userUuid').value;
	                var domainUuid=Ext.get('domainUuid').value;
	                var viewGroup=form.findField('viewGroup').items;
	                var grid=Ext.getCmp(cmpId).down('panel[itemId=grid]');
	                if(grid==null || grid==undefined){
	                	grid=Ext.getCmp(cmpId);
	                }
	              
	                var showIds='';
	                var hideIds='';
	                
	                for(var i=0;i<viewGroup.length;i++){
	                	if(viewGroup.getAt(i).checked){
	                		showIds=showIds+","+viewGroup.getAt(i).name;
	                	}else{
	                		hideIds=hideIds+","+viewGroup.getAt(i).name;
	                	}
	                }
	                ip.changeView(grid,showIds,true);
	                ip.changeView(grid,hideIds,false);

//	                var expire=new Date();
//	     			expire.setTime(expire.getTime()+365*24*60*60*1000);
	                var showCk="_"+domainUuid+"_"+un+"_"+mode+"_"+item+"_show";
	                Ext.util.Cookies.set(showCk,showIds);
	                
	                var hideCk="_"+domainUuid+"_"+un+"_"+mode+"_"+item+"_hide";
	                Ext.util.Cookies.set(hideCk,hideIds);
	                
	                var c_showCk="_"+domainUuid+"_"+un+"_"+mode+"_"+0+"_show";
	                Ext.util.Cookies.set(c_showCk,showIds);
	              
	                var hideCk="_"+domainUuid+"_"+un+"_"+mode+"_"+0+"_hide";
	                Ext.util.Cookies.set(hideCk,hideIds);
	                
	                ip.insertDB(mode,item,'show',showIds);
	        		ip.insertDB(mode,item,'hide',hideIds);

	        		ip.insertDB(mode,0,'show',showIds);
	        		ip.insertDB(mode,0,'hide',hideIds);

	        		this.up('window').hide();
	            }
            }
        
    }]
});

Ext.define("app.util.ViewAdvanced", {
	extend : 'Ext.window.Window',
	alias : 'widget.advanced',
	title : lanControll.getLanValue('tiUserSetting'),
	id:'viewAdvanced',
	closeAction: 'hide',
    layout: 'fit',
    width:610,
    resizable: true,
    modal: true,
    items: form
	
});

