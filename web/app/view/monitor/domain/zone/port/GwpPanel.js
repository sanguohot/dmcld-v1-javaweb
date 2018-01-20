Ext.define('app.view.monitor.domain.zone.port.GwpPanel', {
	extend:'Ext.form.Panel',
	id:'pmdGwpPanel',
	title:lanControll.getLanValue('tiGwp'),
	border:false,
//	gwpStore:gwpStore,
	treeName:'',
	bodyPadding: 5,
	bodyStyle: {
		background: '#DFE9F6',
	},
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 100,
        anchor: '100%'
    },
	items:[{
    	xtype:'displayfield',
    	name:'neSnStr',
    	fieldLabel:'Device SN'
    },{
    	xtype:'displayfield',
    	name:'neAlias',
    	fieldLabel:'Device Name'
    },{
    	xtype:'displayfield',
    	name:'portNo',
    	fieldLabel:'Port No'
    },{
		xtype:'displayfield',
		fieldLabel:'DWG Port Alias',
		name:'alias',
		ulan:'gwpAlias',
	},{
		fieldLabel:'Admin Status',
		name:'adminStatus',
		xtype:'displayfield'
	},{
		fieldLabel:'Opr Status',
		name:'oprStatus',
		xtype:'displayfield'
	},{
		fieldLabel:'Run Status',
		name:'runStatus',
		xtype:'displayfield'
	},{
		fieldLabel:'Related Bkp',
		name:'bkpPortNoStr',
		ulan:'bindBkp',
		xtype:'displayfield'
	},{
		fieldLabel:'Related Sim',
		name:'relatedSim',
		ulan:'relatedSim',
		xtype:'displayfield'
	}],
	initComponent:function(){
    	var form = this;
    	var store=Ext.create('app.store.monitor.PmdGwpStore',{});
		this.store = store;
		store.on('load',function(){
			if(store.getCount() == 0){
				return;
			}

			var r = store.getAt(0);
			form.loadRecord(r);
			var adminStatus = form.getForm().findField('adminStatus');
			adminStatus.setValue(rs.adminStatus(r.get('adminStatus')));
			var oprStatus = form.getForm().findField('oprStatus');
			oprStatus.setValue(rs.oprStatus(r.get('oprStatus')));
			var runStatus = form.getForm().findField('runStatus');
			runStatus.setValue(rs.runStatus(r.get('runStatus')));
			var  relatedSim = form.getForm().findField('relatedSim');
    		var simUuid = parseInt(r.get('simUuid'));
    		var simAlias = r.get('simAlias');
    		var simImsi = r.get('simImsi');
    		var value = "";
    		if(simUuid == 0){
    			value = "";
    		}else{
    			if(simAlias==null || simAlias==''){
    				value = simImsi;
    			}else{
    				value = simAlias;
    			}
    		}
    		relatedSim.setValue(value);
		});
		var loadMask=new Ext.LoadMask(this, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
    	this.callParent(arguments);
	},
});