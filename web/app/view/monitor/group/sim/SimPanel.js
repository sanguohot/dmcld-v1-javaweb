Ext.define('app.view.monitor.group.sim.SimPanel', {
	extend:'Ext.form.Panel',
	id:'pmdSimPanel',
	title:lanControll.getLanValue('tiSim'),
	border:false,
//	simStore:simStore,
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
    	name:'imsi',
    	fieldLabel:'IMSI'
    },{
        xtype: 'displayfield',
        name: 'alias',
        fieldLabel: 'Alias',
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
		fieldLabel:'Related Gwp',
		name:'gwpPortNoStr',
		ulan:'bindGwp',
		xtype:'displayfield'
	}],
	initComponent:function(){
    	var form = this;
    	var store=Ext.create('app.store.monitor.PmdSimStore',{})
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