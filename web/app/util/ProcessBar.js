Ext.define('app.util.ProcessBar',{
	id:'processBar',
//	show:function(stepStore){
//// var boxObj = {
//// title:'Infomation',
//// width : 300,
//// msg:'It will take several minutes,please wait......',
//// modal:true,
//// closable:false,
//// wait:true
//// };
//// var msgbox = Ext.MessageBox.show(boxObj);
//		
//// for(var i=0;i<stepStore.getCount();i++){
//// var step=stepStore.getAt(i);
//// // boxObj.msg="Is running step is:"+step.get('step');
//// console.log("Is running step is:"+step.get('step')+",ms:"+step.get('ms'));
//// setInterval(step.get('ms'));
//// // Ext.TaskManager.start({run:function(){},interval:step.get('ms')});
//// }
//		
//		
//		function progress() {
//			Ext.MessageBox.show({
//				title : 'Please wait',
//				msg : 'Loading items...',
//				progressText : 'Initializing...',
//				width : 300,
//				progress : true,
//				closable : false
//	
//			});
//			var f = function(v) {
//				return function() {
//					Ext.MessageBox.updateProgress(1,"is running step:"+v.get('step')+",ms:"+v.get('ms'));
//				};
//			};
//			for ( var i = 0; i < stepStore.getCount(); i++) {
//				var step=stepStore.getAt(i);
//				setTimeout(f(step), step.get('ms'));
//			}
//		}
//		progress();
//	},
	

});
