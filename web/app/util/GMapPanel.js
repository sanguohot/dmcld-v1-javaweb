/**
 * @class Ext.ux.GMapPanel
 * @extends Ext.Panel
 * @author Shea Frederick
 */
Ext.define('app.util.GMapPanel', {
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.gmappanel',
    
    requires: ['Ext.window.MessageBox'],
    initComponent : function(){
		loadGmapScript();
        Ext.applyIf(this,{
            plain: true,
            gmapType: 'map',
            border: false,
            cache: {
                marker: [],
                polyline: [],
                infowindow: []
            }
        });
        
        this.callParent();        
    },
    
    afterFirstLayout : function(){
        var center = this.center;
        this.callParent();       
        
        if (center) {
            if (center.geoCodeAddr) {
                this.lookupCode(center.geoCodeAddr, center.marker);
            } else {
                this.createMap(center);
            }
        } else {
            Ext.Error.raise('center is required');
        }
    },
    
    createMap: function(center, marker) {
        options = Ext.apply({}, this.mapOptions);
        options = Ext.applyIf(options, {
            zoom: 2,
            center: center,
            //默认视图,HYBID-卫星,ROADMAP-地图
//            mapTypeId: google.maps.MapTypeId.HYBRID
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        
//        this.gmap = new google.maps.Map(this.body.dom, options);
        var id='#'+this.body.dom.id;
        this.gmap = new GMaps({div:id,lat:22.51369976,lng:113.97664316,zoom:8});
        if (marker) {
            this.addMarker(Ext.applyIf(marker, {
                position: center
            }));
        }
        
//        google.maps.event.addListener(this.gmap, 'click', function(event) {
//            this.placeMarker(event.latLng);
//        });
//        this.gmap.addMarker({lat: -12.143333,lng: -77.128333,title: 'TEST'});
        var neGmap = Ext.getCmp('configNeGmap');
        if(neGmap){
        	neGmap.store.load();
        }
        var mNeGmap=Ext.getCmp('maintenanceNeGmap');
        if(mNeGmap){
        	mNeGmap.store.load();
        }
        
        Ext.each(this.markers, this.addMarker, this);
    },
    
    addMarker: function(marker) {
//        marker = Ext.apply({
//            map: this.gmap
//        }, marker);
////        this.markers.push(marker);
//        if (!marker.position) {
//            marker.position = new google.maps.LatLng(marker.lat, marker.lng);
//        }
//        var o =  new google.maps.Marker(marker);
//        Ext.Object.each(marker.listeners, function(name, fn){
//            google.maps.event.addListener(o, name, fn);    
//        });
//        return o;
    	var m=this.gmap.addMarker({
			lat: marker.lat,
			lng: marker.lng,
			title: marker.title
		});
    	this.cache.marker.push(m);
    	return m;
    },
    removeInfowindow:function(){
    	this.cache.infowindow=[];
    },
    removeMarkers: function() {
//    	this.removeInfowindow();
//    	this.cache.marker=[];
    	this.cache.marker.length=0;
    	this.cache.infowindow.length=0;
    	this.gmap.removeMarkers();
    },

    lookupCode : function(addr, marker) {
        this.geocoder = new google.maps.Geocoder();
        this.geocoder.geocode({
            address: addr
        }, Ext.Function.bind(this.onLookupComplete, this, [marker], true));
    },
    
    onLookupComplete: function(data, response, marker){
        if (response != 'OK') {
            Ext.MessageBox.alert(boxError, 'An error occured: "' + response + '"');
            return;
        }
        this.createMap(data[0].geometry.location, marker);
    },
    
    afterComponentLayout : function(w, h){
        this.callParent(arguments);
        this.redraw();
    },
    
    redraw: function(){
        var map = this.gmap;
        if (map) {
            google.maps.event.trigger(map, 'resize');
        }
    },
    placeMarker:function(location) {
    	var map=this.gmap;
    	var marker = new google.maps.Marker({
    		position: location,
    		map: map
    	});
    	map.setCenter(location);
    },
    attachSecretMessage:function(marker, message) {
    	var map=this.gmap;
    	var infowindow = new google.maps.InfoWindow(
		{ content: message,
			size: new google.maps.Size(200,300)
		});
    	var cache=this.cache;
    	cache.infowindow.push(infowindow);
    	
    	google.maps.event.addListener(marker, 'click', function() {
    		map.uuid=marker.uuid;
    		for(var i=0;i<cache.infowindow.length;i++){
    			cache.infowindow[i].close();
    		}
    		infowindow.open(map,marker);
    		
    	});
    	marker.infowindow=infowindow;
    	return marker;
    },
    fireEvent:function(event_name,object,scope){
    	var map=this.gmap;
    	map.fire(event_name,object,scope);
    },
    getIcon:function(){
    	var icon = new google.maps.Icon();
	    icon.image = "resources/images/marker_green.png";
	    icon.iconSize = new GSize(20, 18);
	    icon.shadowSize = new GSize(100, 100);
	    // 文字信息区坐标，-10表示距离与图片像个10个像素
	    icon.iconAnchor = new GPoint(-10, 50);
	    icon.infoWindowAnchor = new GPoint(5, 1);
	    return icon;
    }
 
});
