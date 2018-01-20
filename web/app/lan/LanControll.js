Ext.define('app.lan.LanControll',{
	lan:null,
	dbLanModule:'lanModule',
	dbLanItem:0,
	dbLanMode:'lanMode',
//	fontPre:"<font size=1 >",//style='font-size:20px'
//	fontSuf:"</font>",
	fontPre:"",//style='font-size:20px'
	fontSuf:"",
	initLan:function(){
		this.procDbLan();
		this.getLan();
        boxSaveOrNot = lanControll.getLanValue('boxSaveOrNot');
		boxWarnning = lanControll.getLanValue('boxWarnning');
		boxDelModel = lanControll.getLanValue('boxDelModel');
		boxAtLeastOneRecord = lanControll.getLanValue('boxAtLeastOneRecord');
		boxInfo = lanControll.getLanValue('boxInfo');
		boxNoRecordSel = lanControll.getLanValue('boxNoRecordSel');
		boxSuccess = lanControll.getLanValue('boxSuccess');
		boxFailture = lanControll.getLanValue('boxFailture');
 		boxCancelSucc = lanControll.getLanValue('boxCancelSucc');
	 	boxCancelFail = lanControll.getLanValue('boxCancelFail');
 		boxCommitSucc = lanControll.getLanValue('boxCommitSucc');
	 	boxCommitFail = lanControll.getLanValue('boxCommitFail');
 		boxClearSucc = lanControll.getLanValue('boxClearSucc');
	 	boxClearFail = lanControll.getLanValue('boxClearFail');
 		boxImportSucc = lanControll.getLanValue('boxImportSucc');
	 	boxImportFail = lanControll.getLanValue('boxImportFail');
	 	boxExport = lanControll.getLanValue('boxExport');
 		boxExportSucc = lanControll.getLanValue('boxExportSucc');
	 	boxExportFail = lanControll.getLanValue('boxExportFail');
	 	boxWaitMsg = lanControll.getLanValue('boxWaitMsg');
		boxLocalMode = lanControll.getLanValue('boxLocalMode');
		boxJumpToLic = lanControll.getLanValue('boxJumpToLic');
		boxError = lanControll.getLanValue('boxError');
		boxReset = lanControll.getLanValue('boxReset');
		boxReboot = lanControll.getLanValue('boxReboot');
		boxRestorePwd = lanControll.getLanValue('boxRestorePwd');
		boxElegantStop = lanControll.getLanValue('boxElegantStop');
		boxBkpNotBindSim = lanControll.getLanValue('boxBkpNotBindSim');
		boxBkpNotBindGwp = lanControll.getLanValue('boxBkpNotBindGwp');
		boxPromotion = lanControll.getLanValue('boxPromotion');
		boxRequestTimeout = lanControll.getLanValue('boxRequestTimeout');
		boxIllegalData = lanControll.getLanValue('boxIllegalData');
		boxUnknowError = lanControll.getLanValue('boxUnknowError');
		boxWaitTitle = lanControll.getLanValue('boxWaitTitle');
		boxLoadingMsg = lanControll.getLanValue('boxLoadingMsg');
		boxInitMsg = lanControll.getLanValue('boxInitMsg');
		boxCompletedMsg = lanControll.getLanValue('boxCompletedMsg');
		boxGwpNotBindBkp = lanControll.getLanValue('boxGwpNotBindBkp');
		boxSimNotBindBkp = lanControll.getLanValue('boxSimNotBindBkp');
		boxDownChart = lanControll.getLanValue('boxDownChart');
		boxStopSyslog = lanControll.getLanValue('boxStopSyslog');
		boxUpgradeNeedEnable = lanControll.getLanValue('boxUpgradeNeedEnable');
		boxOneTypeToUpgrade = lanControll.getLanValue('boxOneTypeToUpgrade');
		boxCanNotUpgrade = lanControll.getLanValue('boxCanNotUpgrade');
		boxUpgradeStatus = lanControll.getLanValue('boxUpgradeStatus');
		boxErrorRemote = lanControll.getLanValue('boxErrorRemote');
		boxOnlyOneRecord = lanControll.getLanValue('boxOnlyOneRecord');
		boxDefault = lanControll.getLanValue('boxDefault');
		boxIsUsing = lanControll.getLanValue('boxIsUsing');
		boxHasChildNode = lanControll.getLanValue('boxHasChildNode');
        boxUseSucc = lanControll.getLanValue('boxUseSucc');
        boxUseFail = lanControll.getLanValue('boxUseFail');
		boxDelFail = lanControll.getLanValue('boxDelFail');
		boxDelSucc = lanControll.getLanValue('boxDelSucc');
		boxTerms = lanControll.getLanValue('boxTerms');
		boxBackup = lanControll.getLanValue('boxBackup');
		boxUploadSucc = lanControll.getLanValue('boxUploadSucc');
		boxUploadFail = lanControll.getLanValue('boxUploadFail');
		boxDiscardList = lanControll.getLanValue('boxDiscardList');
		boxMaxNe = lanControll.getLanValue('boxMaxNe');
		boxDelNe = lanControll.getLanValue('boxDelNe');
		boxDelNode = lanControll.getLanValue('boxDelNode');
		boxRestore = lanControll.getLanValue('boxRestore');
		boxNoRight = lanControll.getLanValue('boxNoRight');
		boxForbidden = lanControll.getLanValue('boxForbidden');
		boxDelUser = lanControll.getLanValue('boxDelUser');
		boxDelSuperAdmin = lanControll.getLanValue('boxDelSuperAdmin');
		boxDelDefAdmin = lanControll.getLanValue('boxDelDefAdmin');
		boxResetUserPwd = lanControll.getLanValue('boxResetUserPwd');
		boxSimNotAvailable = lanControll.getLanValue('boxSimNotAvailable');
		tiSearch = lanControll.getLanValue('tiSearch');
		tiSetting = lanControll.getLanValue('tiSetting');
		tiDetail = lanControll.getLanValue('tiDetail');
		tiResult = lanControll.getLanValue('tiResult');
		tiUpdatePort = lanControll.getLanValue('tiUpdatePort');
		tiLicSysList = lanControll.getLanValue('tiLicSysList');
		tiLicInfo = lanControll.getLanValue('tiLicInfo');
		tiLicDomainList = lanControll.getLanValue('tiLicDomainList');
		ti15MinList = lanControll.getLanValue('ti15MinList');
		ti24HourList = lanControll.getLanValue('ti24HourList');
		tiCurList = lanControll.getLanValue('tiCurList');
		tiChart = lanControll.getLanValue('chart');
		tiNe15Min = lanControll.getLanValue('tiNe15Min');
		tiNe24Hour = lanControll.getLanValue('tiNe24Hour');
		tiNeCur = lanControll.getLanValue('tiNeCur');
		tiCdrList = lanControll.getLanValue('tiCdrList');
		tiSmsList = lanControll.getLanValue('tiSmsList');
		tiUssdList = lanControll.getLanValue('tiUssdList');
		tiSysList = lanControll.getLanValue('tiSysList');
		tiDomainList = lanControll.getLanValue('tiDomainList');
		tiDeviceList = lanControll.getLanValue('tiDeviceList');
		tiPortList = lanControll.getLanValue('tiPortList');
		tiPortMap = lanControll.getLanValue('tiPortMap');
		tiTableInfo = lanControll.getLanValue('tiTableInfo');
		admin_null = lanControll.getLanValue('adminStatus_'+0);
		admin_enable = lanControll.getLanValue('adminStatus_'+1);
		admin_disable = lanControll.getLanValue('adminStatus_'+2);
		admin_locked = lanControll.getLanValue('adminStatus_'+5);
		admin_noBalance = lanControll.getLanValue('adminStatus_'+6);
		admin_demo = lanControll.getLanValue('adminStatus_'+4);
		tiLicCardList = lanControll.getLanValue('tiLicCardList');
		tiLicCardLogList = lanControll.getLanValue('tiLicCardLogList');
		tiLicSysLogList = lanControll.getLanValue('tiLicSysLogList');
		tiLicDomainLogList = lanControll.getLanValue('tiLicDomainLogList');
		alreadyInUse = lanControll.getLanValue('inUse');
//		alert(lanControll.getLanValue('adminStatus_'+9)==lanControll.getLanValue('undef'))
	},
	procDbLan:function(){
		var c = getCookie("userLan");		
		if(!c){
			c = ip.readDB(this.dbLanModule,this.dbLanItem,this.dbLanMode);
			if(!c){
				return;
			}else if(c==1 || c==2){
				SetCookie("userLan",c, "one month");
				changeLan(c);
			}
		}else{
			ip.insertDB(this.dbLanModule,this.dbLanItem,this.dbLanMode,c);
		}
	},
	nodeNeedChangeLan:function(eType){
		var arr=['fcloud','fsystem','fdomain','fnode','fnodegroup','fsuser'
		         ,'fgroup','serviceconfig','alarmconfig','deviceupgrade','sipserver'
		         ,'alarmmain','fpolicy','fpaidgroup','froamzone','syslogmain','udomain'
		         ,'systemconfig','provision','backup','pubcloudbk','localsrvbk','flocalserver','blackwhite','dmnum'];
		for(var i=0; i<arr.length; i++){
			if(eType==arr[i]){
				return true;
			}
		}
		return false;
	},
	nodeInPassList:function(eType){
		var arr=['froamzome','fsuser','fsystem','fnodegroup','fnode'
		         ,'fgroup','fpolicy','fpaidgroup','udomain','systemconfig','provision'];
		for(var i=0; i<arr.length; i++){
			if(eType==arr[i]){
				return true;
			}
		}
		return false;
	},
	cbTreeRecords:function(root){
		this.eachTreeNode(root);
	},
	eachTreeNode:function(node){
		if(node && node.hasChildNodes()){
			for(var i=0; i<node.childNodes.length; i++){
				var child = node.getChildAt(i);
				
				var eType = child.raw.eType;
				if(!this.nodeInPassList(eType))
				this.eachTreeNode(child);
				if(this.nodeNeedChangeLan(eType)){
					if(eType=='udomain' && child.get('name')!="USER"){
						continue;
					}
					child.set('name',this.getLanValue('treeNode_'+eType));
					child.commit();
				}
			}
		}
	},
	isCn:function(){
		var c = getCookie("userLan");
		if(!c){
			return false;
		}else{
			if(c==1){			
				return true; 
			}else{
				return false;
			}
		}
	},
	getLan:function(){
		var lan = this.lan;
		if(!lan){
			var c = getCookie("userLan");
			if(!c){
				this.lan = Ext.create('app.lan.LanEn');
			}else{
				if(c==1){			
					this.lan = Ext.create('app.lan.LanCn'); 
				}else{
					this.lan = Ext.create('app.lan.LanEn');
				}
			}
		}
		return this.lan;
	},
	setLan:function(panel){
		this.setRadioGroup(panel);
		this.setTextfield(panel);
		this.setDisplayfield(panel);
		this.setCheckbox(panel);
		this.setButton(panel);
		this.setGrid(panel);
		this.setMenuItem(panel);
	},
	getLanValue:function(name){
		var c = getCookie("userLan");
		var lan = this.getLan();
		var value = lan[name];
		if(value===true || value===false){			
			return value;
		}else{
			value = value+"";
		}
		if(value=="undefined"){
			value = lan["unknow"]+"";
		}
		if(c==1){
			value=this.fontPre+value+this.fontSuf;
		}
		return value;
	},
	getEnumValue:function(name,val){
		var lan = this.getLan();
		var value=this.getLanValue(name+"_"+val);
		var unknow=lan["unknow"]+"";
		if(value==unknow){
			value=val;
		}
		return value;
	},
	getLanValues:function(names,split,addBrace){
		var lan = this.getLan();
		var value="";
		if(!split){
			split=" ";
		}
		for(var i=0;i<names.length;i++){
			if(i==0){
				value=this.getLanValue(names[i]);
			}else{
				value+=split+this.getLanValue(names[i]);
			}
		}
		if(addBrace){
			value="("+value+")";
		}
		return value;
	},
	isUndef:function(val){
		var lan = this.getLan();
		var c = getCookie("userLan");
		var undef;
		if(c==1){
			undef=this.fontPre+lan["unknow"]+this.fontSuf;
		}else{
			undef = lan["unknow"];
		}
		if(val == undef){
			return true;
		}
		return false;
	},
	getLogStr:function(str,label,name){
		str = str+name+':'+"'"+label+"'";
		str = str+",\n";
		str = str+name+'Abbr:'+"'"+label+"'";
		str = str+",\n";
		str = str+name+'Spec:'+"'"+label+"'";
		str = str+",\n";
		str = str+name+'Tips:'+"'"+label+"'";
		str = str+",\n\n";
		return str;
	},
	getGridLogStr:function(str,label,labelAbbr,name){
		str = str+name+':'+"'"+label+"'";
		str = str+",\n";
		str = str+name+'Abbr:'+"'"+labelAbbr+"'";
		str = str+",\n";
		str = str+name+'Spec:'+"'"+label+"'";
		str = str+",\n";
		str = str+name+'Tips:'+"'"+label+"'";
		str = str+",\n\n";
		return str;
	},
	setButton:function(panel){
		var field=panel.query('button');
		var str = "";
		var lan = this.getLan();
		for(var i=0;i<field.length;i++){			
			if(!field[i].text || field[i].text==""){
				continue;
			}
			if(!field[i].name || field[i].name==""){
				if(!field[i].ulan || field[i].ulan==""){
					continue;
				}
			}
			var name = field[i].name;
			if(field[i].ulan){
				name = field[i].ulan;
			}
			var label = field[i].text;
			var value = this.getLanValue(name);
			if(value && !this.isUndef(value)){
				field[i].setText(value+"");
			}
			str = this.getLogStr(str,label,name);
		}
//		console.log(str);
	},
	setRadioGroup:function(panel){
		var field=panel.query('radiogroup');
		var str = "";
		var lan = this.getLan();
		for(var i=0;i<field.length;i++){			
			if(!field[i].fieldLabel || field[i].fieldLabel==""){
				continue;
			}
			if(!field[i].name || field[i].name==""){
				if(!field[i].ulan || field[i].ulan==""){
					continue;
				}
			}
			var name = field[i].name;
			if(field[i].ulan){
				name = field[i].ulan;
			}
			var label = field[i].fieldLabel;
			var value = this.getLanValue(name);
			if(value && !this.isUndef(value)){
				field[i].setFieldLabel(value+"");
			}
			str = this.getLogStr(str,label,name);
		}
//		console.log(str);
	},
	setGrid:function(panel){
		var field=panel.query('gridcolumn');
		var str = "";
		var lan = this.getLan();
		var header = panel.down('headercontainer');
		var grid = null;
		if(header)
			grid = header.up('panel');
//		if(!grid){
//			grid = panel.down('grid');
//			if(!grid)
//				grid = panel;
//		}

		if(grid){
			console.log(grid.xtype);
			var plugin = Ext.create('app.util.ColumnAutoWidthPlugin', {});
			if(grid.plugins){
				grid.plugins.push(plugin)
			}else{
				grid.plugins= [plugin];
			}
			plugin.init(grid);
		}
		for(var i=0;i<field.length;i++){
			if(field[i].autoWidth!=false){
				field[i].autoWidth = true;
			}
			if(!field[i].text || field[i].text==""){
				continue;
			}
			if(!field[i].dataIndex || field[i].dataIndex==""){
				if(!field[i].ulan || field[i].ulan==""){
					continue;
				}
			}
			var name = field[i].dataIndex;
			var nameAbbr = "";
			if(field[i].ulan){
				name = field[i].ulan;
				nameAbbr=name;
			}else{
				nameAbbr=name+'Abbr';
			}
			var label = field[i].text;
			var value = this.getLanValue(nameAbbr);
			if(value && !this.isUndef(value)){
				var tmp = value+"";
				field[i].setText(tmp);
			}
			str = this.getGridLogStr(str,label,name,name);
		}
//		console.log(str);
	},
	getMaxWidth:function(panel){
		var form = panel.down('form');
		if(!form) form = panel;
		var fields = form.getForm().getFields();
		var label = "";
		var size = 0;
		var str = "";
		var labelWidth = 100;
		if(fields.length > 0){
			for(var i=0;i<fields.length;i++){
				if(fields[i].getXType()=="hiddenfield" || fields[i].isHidden()){
					continue;
				}
				if(fields[i].boxLabel && fields[i].boxLabel.length>0){
					label = fields[i].boxLabel;
				}
				if(fields[i].fieldLabel && fields[i].fieldLabel.length>0){
					label = fields[i].fieldLabel;
				}
				var len = label.length;
				if(len > size){
					size = len;
					str = label;
				}
			}
			labelWidth = textSize(null,str).width;
		}
		console.log(labelWidth);
		return labelWidth;
	},
	getMaxWidth2:function(ulans){
		var label = "";
		var size = 0;
		var str = "";
		var labelWidth = 100;
		var len = 0;
		if(ulans.length > 0){
			for(var i=0;i<ulans.length;i++){
				var label = this.getLanValue(ulans[i]);
				len = label.length;
				if(len > size){
					size = len;
					str = label;
				}
			}
//			labelWidth = textSize(null,str).width;
//			var obj = new Ext.util.TextMetrics("span1");
			labelWidth = Ext.util.TextMetrics.measure("span1",str+":").width;
//			var width2 = Ext.util.TextMetrics.measure("span1",":").width;
//			str = "Not allowed to register domain"
//			labelWidth = obj.getWidth(str)+obj.getWidth(":");
			Ext.util.TextMetrics.destroy();
		}
		console.log(str+"---=="+labelWidth+"---"+size+"---"+str.length);
		return labelWidth;
	},
	colAutoWidth:function(panel,store){
		if(!store || !panel)
			return;
		store.on('load',function(){
			var count = store.getCount();
			if(count > 0){
				Ext.suspendLayouts();
				
				var field=panel.query('gridcolumn');
				
				for(var i=0;i<field.length;i++){
					
					var headWidth = textSize(null,field[i].text).width;
					
					var con = store.getAt(0).get(field[i].dataIndex);
					var a = new Date().getMilliseconds();
					var strSize=0;
					var str="";
					for(var j=0;j<count;j++){
						
						con = store.getAt(j).get(field[i].dataIndex)+"";
						if(con.length>strSize){
							strSize=con.length;
							str=con;
						}
					}
					
					var len = textSize(null,str).width;
					
//					console.log('i:'+i+'===='+(new Date().getMilliseconds()-a));
					a=0;
//					if(conMaxLen>300){
//						continue;
//					}else{
						var width = (headWidth>len)?headWidth:len;						
						width = width+20;
						console.log("i:"+i+",j:"+j+",name:"+field[i].dataIndex+",width:"+width)
						field[i].setWidth(width);
//					}
				}
				Ext.resumeLayouts(true);
			}
		})
	},
	setMenuItem:function(panel){
		var field=panel.query('menuitem');
		var str = "";
		var lan = this.getLan();
		for(var i=0;i<field.length;i++){			
			if(!field[i].text || field[i].text==""){
				continue;
			}
			if(!field[i].name || field[i].name==""){
				if(!field[i].ulan || field[i].ulan==""){
					continue;
				}
			}
			var name = field[i].name;
			if(field[i].ulan){
				name = field[i].ulan;
			}
			var label = field[i].text;
			var value = this.getLanValue(name);
			if(value && !this.isUndef(value)){
				field[i].setText(value+"");
			}
			str = this.getLogStr(str,label,name);		
		}
//		console.log(str);
	},
	setTextfield:function(panel){
		var field=panel.query('textfield');
		var str = "";
		var lan = this.getLan();
		for(var i=0;i<field.length;i++){
			if(!field[i].fieldLabel || field[i].fieldLabel==""){
				continue;
			}
			if(!field[i].name || field[i].name==""){
				if(!field[i].ulan || field[i].ulan==""){
					continue;
				}
			}
			var name = field[i].name;
			if(field[i].ulan){
				name = field[i].ulan;
			}
			var label = field[i].fieldLabel;
			var value = this.getLanValue(name);
			if(value && !this.isUndef(value)){
				field[i].setFieldLabel(value+"");
			}
			str = this.getLogStr(str,label,name);			
		}
//		console.log(str);
	},
	setFieldSet:function(panel){
		Ext.suspendLayouts();
		var field=panel.query('fieldset');
		var str = "";
		var lan = this.getLan();
		for(var i=0;i<field.length;i++){
			if(!field[i].title || field[i].title==""){
				continue;
			}
			if(!field[i].name || field[i].name==""){
				if(!field[i].ulan || field[i].ulan==""){
					continue;
				}
			}
			var name = field[i].name;
			if(field[i].ulan){
				name = field[i].ulan;
			}
			var label = field[i].title;
			var value = this.getLanValue(name);
			if(value && !this.isUndef(value)){
				field[i].setTitle(value+"");
			}
//			console.log(field[i].title);
			str = this.getLogStr(str,label,name);			
		}
		Ext.resumeLayouts(true);
//		console.log(str);
	},
	setDisplayfield:function(panel){
		var field=panel.query('displayfield');
		var str = "";
		var lan = this.getLan();
		for(var i=0;i<field.length;i++){
			if(!field[i].fieldLabel || field[i].fieldLabel==""){
				continue;
			}
			if(!field[i].name || field[i].name==""){
				if(!field[i].ulan || field[i].ulan==""){
					continue;
				}
			}
			var name = field[i].name;
			if(field[i].ulan){
				name = field[i].ulan;
			}
			var label = field[i].fieldLabel;
			var value = this.getLanValue(name);
			if(value && !this.isUndef(value)){
				field[i].setFieldLabel(value+"");
			}
			str = this.getLogStr(str,label,name);
		}
//		console.log(str);
	},
	setCheckbox:function(panel){
		var field=panel.query('checkboxfield');
		var str = "";
		var lan = this.getLan();
		for(var i=0;i<field.length;i++){
			if(!field[i].boxLabel || field[i].boxLabel==""){
				continue;
			}
			if(!field[i].name || field[i].name==""){
				if(!field[i].ulan || field[i].ulan==""){
					continue;
				}
			}
			var name = field[i].name;
			if(field[i].ulan){
				name = field[i].ulan;
			}
			var label = field[i].boxLabel;
			var value = this.getLanValue(name);
			if(value && !this.isUndef(value)){
//				field[i].setFieldLabel(value+"");
				field[i].boxLabel = value;
			}
			str = this.getLogStr(str,label,name);
		}
//		console.log(str);
	},
	setRadio:function(panel){
		var field=panel.query('radiofield');
		var str = "";
		var lan = this.getLan();
		for(var i=0;i<field.length;i++){
			if(!field[i].boxLabel || field[i].boxLabel==""){
				continue;
			}
			if(!field[i].name || field[i].name==""){
				if(!field[i].ulan || field[i].ulan==""){
					continue;
				}
			}
			var name = field[i].name;
			if(field[i].ulan){
				name = field[i].ulan;
			}
			var label = field[i].boxLabel;
			var value = this.getLanValue(name);
			if(value && !this.isUndef(value)){
//				field[i].setFieldLabel(value+"");
				field[i].boxLabel = value;
			}
			str = this.getLogStr(str,label,name);
		}
//		console.log(str);
	}
})