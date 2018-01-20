Ext.define('app.util.TipObjManage',{
	id:'TipObjManage',
	createObjNameTipObj: function(tip_id,target, html){
		var tip = Ext.create('Ext.tip.ToolTip', {
			title:boxPromotion,
			id:tip_id,
			
		    target: target,
		    dismissDelay:0,
		    anchor: 'left',
		    width:250,
		    maxWidth:300,
		    autoScroll:true,
		    
//		    anchorOffset:0, 
		    html:html
		});
		return tip;
	},
});
