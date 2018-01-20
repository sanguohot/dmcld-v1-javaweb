Ext.define('app.util.TimeHandler',{
	id:'timeHandler',
	dateDiff:function(d1,d2){
		
//	    var  tmpBeginTime = new Date(d1.replace(/-/g,"\/"));
//	    var  tmpEndTime = new Date(d2.replace(/-/g,"\/"));
	    return d1 - d2;

	},
	dateDiff1:function(interval,objDate1,objDate2){
	    var i={}, t=objDate1.getTime(), t2=objDate2.getTime();
	    i['y']=objDate2.getFullYear()-objDate1.getFullYear();
	    i['q']=i['y']*4+Math.floor(objDate2.getMonth()/4)-Math.floor(objDate1.getMonth()/4);
	    i['m']=i['y']*12+objDate2.getMonth()-objDate1.getMonth();
	    i['ms']=objDate2.getTime()-objDate1.getTime();
	    i['w']=Math.floor((t2+345600000)/(604800000))-Math.floor((t+345600000)/(604800000));
	    i['d']=Math.floor(t2/86400000)-Math.floor(t/86400000);
	    i['h']=Math.floor(t2/3600000)-Math.floor(t/3600000);
	    i['n']=Math.floor(t2/60000)-Math.floor(t/60000);
	    i['s']=Math.floor(t2/1000)-Math.floor(t/1000);
	    return i[interval];
	}
});
