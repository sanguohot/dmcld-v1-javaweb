Ext.require('app.store.operation.domain.roamzone.site.nes.BkPortModel');

Ext.define('app.store.operation.domain.roamzone.site.nes.BkPortStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.roamzone.site.nes.BkPortModel',
    storeId:'bkPortStore',
//    autoLoad: false,
    data:[
      	[true,  false, 1,  "sim idle", 54, "240 x 320 pixels", "2 Megapixel", "Pink", "Slider", 359, 2.400000],
		   [true,  true,  2,  "sim idle", 180, "320 x 240 pixels", "3.2 Megapixel", "Future black", "Candy bar", 11, 0.000000],
		   [true,  true,  3,  "sim idle", 155, "240 x 400 pixels", "2 Megapixel", "Black", "Candy bar", 113, 0.000000],
		   [true,  true,  4,  "sim idle", 499, "800 x 480 pixels", "5 Megapixel", "( the image of the product displayed may be of a different color )", "Slider", 320, 3.500000],
		   [true,  false, 5,  "sim idle", 65, "96 x 80 pixels", "0.3 Megapixel", "Silver", "Folder type phone", 5, 2.200000],
		   [true,  true,  6,  "sim idle", 242, "240 x 400 pixels", "8 Megapixel", "Black", "Candy bar", 79, 0.000000],
		   [true,  true,  7,  "sim idle", 299, "320 x 240 pixels", "2 Megapixel", "Frost", "Candy bar", 320, 2.640000],
		   [true,  true,  8,  "sim idle", 120, "240 x 320 pixels", "2 Megapixel", "Urban gray", "Slider", 1, 0.000000],
		   [true,  true,  9,  "sim idle", 170, "320 x 240 pixels", "2 Megapixel", "Ultramarine blue", "Candy bar", 319, 2.360000],
		   [true,  true,  10, "sim idle", 274, "320 x 240 pixels", "3.2 Megapixel", "Luxury silver", "Slider", 5, 0.000000],
		   [false, false, 11, "sim idle", 140, "320 x 240 pixels", "2 Megapixel", "Blue", "Candy bar", 344, 2.000000],
		   [false, true,  12, "sim idle", 50, "128 x 160 pixels", "", "Black", "Candy bar", 38, 0.000000],
		   [false, true,  13, "sim idle", 75, "240 x 160 pixels", "1.3 Megapixel", "", "Sidekick", 115, 0.000000],
		   [false, true,  14, "sim idle", 5, "", "", "", "Folder type phone", 1, 0.000000],
		   [false, true,  15, "sim idle", 315, "320 x 240 pixels", "5 Megapixel", "Copper", "Dual slider", 143, 2.600000],
		   [false, true,  16, "sim idle", 399, "800 x 480 pixels", "3.2 Megapixel", "Solid black", "Slider", 14, 0.000000],
		   [false, true,  17, "sim idle", 77, "128 x 160 pixels", "0.3 Megapixel", "", "Folder type phone", 35, 0.000000],
		   [true,  true,  18, "sim idle", 1, "240 x 400 pixels", "2 Megapixel", "Red", "Slider", 658, 2.800000],
		   [true,  false, 19, "sim idle", 349, "480 x 360 pixels", "3.2 Megapixel", "", "Candy bar", 21, 2.440000],
		   [true,  false, 20, "sim idle", 135, "240 x 320 pixels", "3.2 Megapixel", "", "Slider", 169, 2.200000]
 ]
//    proxy: {
//        type: 'ajax',
//        url: 'data/viewPort.json',
//        reader: {
//            type: 'json',
//            root: 'bkpList'
//        }	
//    }
});

var data
console.log("load bk port store");