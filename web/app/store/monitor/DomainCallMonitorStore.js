generateData = function(n, floor){
        var data = [],
            p = (Math.random() *  11) + 1,
            i;
            
        floor = (!floor && floor !== 0)? 40 : floor;
        
        for (i = 0; i < (n || 24); i++) {
            data.push({
//                name: Ext.Date.monthNames[i % 12],
                name: [i],
                data1: Math.floor(Math.max((Math.random() * 100), floor)),
                data2: Math.floor(Math.max((Math.random() * 100), floor)),
                data3: Math.floor(Math.max((Math.random() * 100), floor)),
                data4: Math.floor(Math.max((Math.random() * 100), floor)),
                data5: Math.floor(Math.max((Math.random() * 100), floor)),
                data6: Math.floor(Math.max((Math.random() * 100), floor)),
                data7: Math.floor(Math.max((Math.random() * 100), floor)),
                data8: Math.floor(Math.max((Math.random() * 100), floor)),
                data9: Math.floor(Math.max((Math.random() * 100), floor)),
                data10: Math.floor(Math.max((Math.random() * 100), floor)),
                data11: Math.floor(Math.max((Math.random() * 100), floor)),
                data12: Math.floor(Math.max((Math.random() * 100), floor)),
                data13: Math.floor(Math.max((Math.random() * 100), floor)),
                data14: Math.floor(Math.max((Math.random() * 100), floor)),
                data15: Math.floor(Math.max((Math.random() * 100), floor)),
                data16: Math.floor(Math.max((Math.random() * 100), floor)),
                data17: Math.floor(Math.max((Math.random() * 100), floor)),
                data18: Math.floor(Math.max((Math.random() * 100), floor)),
                data19: Math.floor(Math.max((Math.random() * 100), floor)),
                data20: Math.floor(Math.max((Math.random() * 100), floor)),
                data21: Math.floor(Math.max((Math.random() * 100), floor)),
                data22: Math.floor(Math.max((Math.random() * 100), floor)),
                data23: Math.floor(Math.max((Math.random() * 100), floor)),
                data24: Math.floor(Math.max((Math.random() * 100), floor))
            });
        }
        return data;

};
Ext.define('app.store.monitor.DomainCallMonitorStore',{
	extend: 'Ext.data.Store',
	fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9','data10','data11','data12','data13','data14','data15','data16','data17','data18','data19','data20','data21','data22','data23','data24'],
	data: generateData()
});
console.log("load monitor info model");