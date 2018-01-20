
Ext.define('app.view.msg.MsgWin',{
	extend:'Ext.window.Window',
//    width:240,  
//    height:165,
	width:800,
	height:500,
//    id:'msgWin',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
//    id:'msgWin',
    maxMsg:100,
    modal : false,
    bodyStyle: 'background:white; padding:0px;',
    plain: true,
    border:false,
    shadow:false, //去除阴影  
    draggable:false, //默认不可拖拽  
    resizable:false,  
    closable: true,
//    floating:true,
//    closeAction:'hide', //默认关闭为隐藏  
    autoHide:15, //15秒后自动隐藏，false则不自动隐藏 
    title : 'Message',
    iconCls:'msg16',
    html : '<div style="width:226px"></div>',
    dockedItems: [{
        xtype: 'container',
        dock: 'bottom',
        html:'<a class="msg_win_div2 aCls" onclick=window.mc.openMsgModule()>View More</a>',
    }],
    items:[{
    	xtype:"container",
    	uitemId:'html1',
    	margin:'5 0 0 0',
    	html:'<div class=msg_win_div><b>hello world!</b></div>',
    },{
    	xtype:'displayfield',
    	name:'html4',
    	padding:'0 10 0 10',
    	value:''
    }],
    listeners:{
    	deactivate:function(){
    		this.up("window").setZIndex(9999);
    	}
    },
    constructor: function(conf){  
     Ext.Window.superclass.constructor.call(this, conf);  
        this.initPosition(true);  
    },  
    initEvents: function() {  
     Ext.Window.superclass.initEvents.call(this);  
        //自动隐藏  
        if(false !== this.autoHide){  
            var task = new Ext.util.DelayedTask(this.hide, this), second = (parseInt(this.autoHide) || 3) * 1000;  
            this.on('beforeshow', function(self) {  
                task.delay(second);  
            });  
        }  
        this.on('beforeshow', this.showTips);  
        this.on('beforehide', this.hideTips);
        //window大小改变时，重新设置坐标  
        Ext.EventManager.onWindowResize(this.initPosition, this);
        //window移动滚动条时，重新设置坐标  
        Ext.EventManager.on(window, 'scroll', this.initPosition, this);
    },  
    //参数flag为true时强制更新位置  
    initPosition: function(flag) {
     //不可见时，不调整坐标
        if(true !== flag && this.hidden){  
            return false;  
        }  
        var doc = document, bd = (doc.body || doc.documentElement);  
        //Ext取可视范围宽高(与上面方法取的值相同), 加上滚动坐标  
//        var left = bd.scrollLeft + Ext.lib.Dom.getViewWidth()-4-this.width;  
//        var top = bd.scrollTop + Ext.lib.Dom.getViewHeight()-4-this.height;
//        var left = bd.scrollLeft + Ext.dom.AbstractElement.getViewportWidth()-4-this.width;
//        var top = bd.scrollTop + Ext.dom.AbstractElement.getViewportHeight()-4-this.height;
        var left = Math.floor(bd.scrollLeft + (Ext.dom.AbstractElement.getViewportWidth()-4-this.width)/2);
        var top = Math.floor(bd.scrollTop + (Ext.dom.AbstractElement.getViewportHeight()-4-this.height)/2);
        this.setPosition(left, top);  
    },  
    showTips: function() {  
        var self = this;  
        if(!self.hidden){return false;}  
        //初始化坐标
        self.initPosition(true);   
        self.el.slideIn('b', {  
            callback: function() {   
           //显示完成后,手动触发show事件,并将hidden属性设置false,否则将不能触发hide事件   
                self.fireEvent('show', self);  
                self.hidden = false;  
            }  
        });
        //不执行默认的show
        return false;   
    },  
    hideTips: function() {  
        var self = this;  
        if(self.hidden){return false;}  
        self.el.slideOut('b', {  
            callback: function() {  
                //渐隐动作执行完成时,手动触发hide事件,并将hidden属性设置true  
                self.fireEvent('hide', self);  
                self.hidden = true;  
            }  
        });
        //不执行默认的hide
        return false;  
    }
});