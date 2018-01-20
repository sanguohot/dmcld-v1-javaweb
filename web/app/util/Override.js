Ext.define('app.util.Override',{
	init:function(){
		this.overrideChart();
		this.overrideFloating();
	},
	overrideChart:function(){
		Ext.override(Ext.chart.Legend, {
			createItems : function() {
				var me = this,
	            chart = me.chart,
	            seriesItems = chart.series.items,
	            ln, series,
	            surface = chart.surface,
	            items = me.items,
	            padding = me.padding,
	            itemSpacing = me.itemSpacing,
	            spacingOffset = 2,
	            maxWidth = 0,
	            maxHeight = 0,
	            totalWidth = 0,
	            totalHeight = 0,
	            vertical = me.isVertical,
	            math = Math,
	            mfloor = math.floor,
	            mmax = math.max,
	            index = 0,
	            i = 0,
	            len = items ? items.length : 0,
	            x, y, spacing, item, bbox, height, width,
	            fields, field, nFields, j;
	
		        //remove all legend items
		        if (len) {
		            for (; i < len; i++) {
		                items[i].destroy();
		            }
		        }
		        //empty array
		        items.length = [];
		        // Create all the item labels, collecting their dimensions and positioning each one
		        // properly in relation to the previous item
		        for (i = 0, ln = seriesItems.length; i < ln; i++) {
		            series = seriesItems[i];
		            if (series.showInLegend) {
		                fields = [].concat(series.yField);
		                for (j = 0, nFields = fields.length; j < nFields; j++) {
		                    field = fields[j];
		                    item = new Ext.chart.LegendItem({
		                        legend: this,
		                        series: series,
		                        surface: chart.surface,
		                        yFieldIndex: j
		                    });
		                    bbox = item.getBBox();
		
		                    //always measure from x=0, since not all markers go all the way to the left
		                    width = bbox.width;
		                    height = bbox.height;
		
		                    if (i + j === 0) {
		                        spacing = vertical ? padding + height / 2 : padding;
		                    }
		                    else {
		                        spacing = itemSpacing / (vertical ? 2 : 1);
		                    }
		                    // Set the item's position relative to the legend box
		                    item.x = mfloor(vertical ? padding : totalWidth + spacing);
		                    item.y = mfloor(vertical ? totalHeight + spacing : padding + height / 2);
		
		                    // Collect cumulative dimensions
		                    totalWidth += width + spacing;
		                    totalHeight += height + spacing;
		                    maxWidth = mmax(maxWidth, width);
		                    maxHeight = mmax(maxHeight, height);
		
		                    items.push(item);
		                }
		            }
		        }
		
		        // Store the collected dimensions for later
		        me.width = mfloor((vertical ? maxWidth : totalWidth) + padding * 2);
		        if (vertical && items.length === 1) {
		            spacingOffset = 1;
		        }
		        me.height = mfloor((vertical ? totalHeight - spacingOffset * spacing : maxHeight) + (padding * 2));
		        me.itemHeight = maxHeight;
			
				// modify start,legend box宽度对齐(by evan)
				var outerWidth = 100;
				me.width = (me.width>outerWidth)?me.width:outerWidth;
//				console.log(outerHeight+"----"+me.height)
//				if (items.length >= 2 && me.height > outerHeight) {
//					var row = math.floor((outerHeight - padding * 2) / (items[1].y - items[0].y));
//					if (row > 0) {
//						me.columnWidth = me.width;
//						me.width *= math.ceil(items.length / row);
//						me.height = outerHeight;
//						me.offsetY = items[row].y - items[0].y;
//						me.maxY = items[row - 1].y;
//					}
//				}
				// modify end
			}
		});
	},
	
	overrideFloating:function(){
		Ext.override(Ext.util.Floating, {
			toFront: function(preventFocus) {
	        var me = this,
	            zip = me.zIndexParent,
	            preventFocusSetting = me.preventFocusOnActivate;

	        // Find the floating Component which provides the base for this Component's zIndexing.
	        // That must move to front to then be able to rebase its zIndex stack and move this to the front
	        if (zip && me.bringParentToFront !== false) {
	            zip.toFront(true);
	        }

	        if (!Ext.isDefined(preventFocus)) {
	            preventFocus = !me.focusOnToFront;
	        }

	        if (preventFocus) {
	            me.preventFocusOnActivate = true;
	        }
	        if (me.zIndexManager.bringToFront(me, preventFocus)) {    
	            if (!preventFocus) {
	                // Kick off a delayed focus request.
	                // If another floating Component is toFronted before the delay expires
	                // this will not receive focus.
	                me.focus(false, false);
	            }
	        }
	        
	        // Restore to original setting
	        me.preventFocusOnActivate = preventFocusSetting;
	        return me;
	    },
		});
	}
});
