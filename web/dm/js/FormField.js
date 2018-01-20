define(function (){
	function createMainSearch(placeholder,callback){
		var pn=$("#main_search");
		pn.html("");
		var html=''
			+'<div class="row">'
			+'<div class="col-md-2"></div>'
			+'<div class="col-md-8">'
			+'<div class="filter-parent" id="search">'
			+'<label for="dev_tag"><i class="fa fa-search"></i></label>'
			+'<input placeholder="'+placeholder+'" id="dev_tag" class="form-control" tabindex="1">'
			+'<a href="#" id="filter-clear" class="fa fa-times"></a>'
			+'</div>'
		+'</div>'
		+'<div class="col-md-2"></div>'
		+'</div>';
		
		pn.append(html);
		$("#search label[for=dev_tag]").bind('click',function(){
			var node=$("#myTab .active a");
			var activeId=node.attr("href");
			callback(activeId);
			setTimeout(function(){
				$("#dev_list button[name=refresh]").trigger("click");
				
			},300)
		});
        $('#dev_tag').bind('keypress',function(event){
            if(event.keyCode == "13")    
            {
    			var node=$("#myTab .active a");
    			var activeId=node.attr("href");
    			callback(activeId);
    			setTimeout(function(){
    				$("#dev_list button[name=refresh]").trigger("click");
    				
    			},300)
            }
        });
        $('#filter-clear').bind("click",function(){
        	$(this).parent().find("input").val("");
			var node=$("#myTab .active a");
			var activeId=node.attr("href");
			callback(activeId);
        })
	}
	function getTextField(name,value,label,placeholder,type,istime,helpText){
		var html='';
		var l=label?label:"";
		var v=value?value:"";
		var n=name?name:"";
		var p=placeholder?placeholder:"";
		var h=helpText?helpText:"";
		var t="text";
		if(type){
			t=type;
		}
		var it="";
		if(istime){
			it="true";
		}
		html+='<div class="form-group">'
		  +'<label class="margin-bottom-0">'+l+'</label>'
		  +'<input istime="'+it+'" type="'+t+'" class="form-control" '
		  +' name="'+n
		  +'" value="'+v
		  +'" placeholder="'+p+'">'
		  +'<p class="help-block">'+h+'</p>'
	  +'</div>';
		return html;
	}
	function getDiaplaySelectfiled(name,value,label){
		
		var html='';
		var l=label?label:"";
		var v=value;
		var n=name?name:"";
		html+='<form class="form-horizontal">'
		html+='<div class="form-group">'
		html+='<label for="form-field-select-1" class="col-sm-2">'+l+'</label>'
		html+=' <div class="col-sm-10">'
		html+='<select disabled id="sureSelectToDisable"  name="'+n+'" class="chosen-selec form-control " id="form-field-select-4" style="margin-bottom: 10px;" data-placeholder="Choose a Role...">'
		
		html+='<option value="1">'+window.lc.getValue('official')+'</option>'
		html+='<option value="0">'+window.lc.getValue('test')+'</option>'
		html+='</select>'
		html+='</div> ' 
		html+='</div> '  
		html+='</from>'
			//var optElements=document.getElementById("form-field-select-4").children;
			
			//var h=$("#form-field-select-1");
			//var h=$("select option[value='1']").val()
			//$("#form-field-select-1 option[text="+window.lc.getValue('official')+"]").attr("selected",true)
			return html;
		
	}
	function getDisplayTextField(name,value,label,placeholder,type,istime,helpText){
		var html='';
		var l=label?label:"";
		var v=value?value:"";
		var n=name?name:"";
		var p=placeholder?placeholder:"";
		var h=helpText?helpText:"";
		var t="text";
		if(type){
			t=type;
		}
		var it="";
		if(istime){
			it="true";
		}
		 html+='<form class="form-horizontal">'
   		  html+='<div class="form-group">'
   	      html+=' <label for="inputEmail3" class="col-sm-2 control-label  margin-bottom-0">'+l+'</label>'
   		  html+=' <div class="col-sm-10">'
   		  html+=' <input istime="'+it+'" type="'+t+'" name="'+n+'" class="form-control" value="'+v+'" placeholder="'+p+'" disabled>'
   		  html+='<p class="help-block">'+h+'</p>'
   		  html+='</div>'
   		  html+='</div>'
   		  html+='</from>'
		/*html+='<div class="form-group">'
		  +'<label class="margin-bottom-0">'+l+'</label>'
		  +'<input istime="'+it+'" type="'+t+'" class="form-control" '
		  +' name="'+n
		  +'" value="'+v
		  +'" placeholder="'+p+'">'
		  +'<p class="help-block">'+h+'</p>'
	  +'</div>';*/
		return html;
	}
	function getFileField(label){
		var l=label?label:"";
//		var i=id?id:"";
//		var n=name?name:"";
		var fh='<div class="form-group">'
		      +'<label for="inputfile">'+l+'</label>'
		      +'<input type="file" id="inputfile" name="file">'
		      +'<p class="help-block">'+window.lc.getValue("plSelXls")+'.</p>'
		   +'</div>';
		return fh;
	}	
	function getTextareaField(name,value,label,placeholder){
		var html='';
		var l=label?label:"";
		var v=value?value:"";
		var n=name?name:"";
		var p=placeholder?placeholder:"";
		html+='<div class="form-group">'
	      +'<label class="margin-bottom-0">'+l+'</label>'
	      +'<textarea name="'+n+'" placeholder="'+p+'" class="form-control" style="height:80px;">'
	      +v
	      +'</textarea>'
	      +'</div>';
		return html;
		
	}
	function getDisplayTextareaField(name,value,label,placeholder){
		var html='';
		var l=label?label:"";
		var v=value?value:"";
		var n=name?name:"";
		var p=placeholder?placeholder:"";
		html+='<form class="form-horizontal">'
		  +'<div class="form-group">'
	      +'<label class="margin-bottom-0 col-sm-2">'+l+'</label>'
	      + ' <div class="col-sm-10">'
	      +'<textarea id="sureTextareaToDisabled" name="'+n+'" placeholder="'+p+'" class="form-control" style="height:80px;" disabled >'
	      +v
	      +'</textarea>'
	      +'</div>'
	      +'</div>'
	      +'</from>';
		return html;
		
	}
	function getDisplayField(name,value,label,placeholder,istime){
		var html='';
		var l=label?label:"";
		var v=value?value:"";
		var n=name?name:"";
		var p=placeholder?placeholder:"";
		var it="";
		if(istime){
			it="true";
		}
		html+='<div class="form-group-sm">'
	      +'<label class="margin-bottom-0">'+l+'</label>'
//	      +'<input type="text" class="form-control display-text"  name="upgradeType" value="'+window.lc.getValue("upgradeType",obj.upgradeType)+'" placeholder="">'
	      +'<p istime="'+it+'" class="form-control display-text"  name="'+n+'"  placeholder="'+p+'">'+v+'</p>'
	      +'</div>';
		
		return html;
	}
	function getCheckboxField(name,value,label,list){
		if(!list){
			return;
		}
		var html='';
		var l=label?label:"";
		var v=value?value:"";
		var n=name?name:"";
		html+='<div class="form-group-sm">'
		+'<label class="margin-bottom-0">'+l+'</label>'
		+'<div >';				  		
		for(var i=0;i<list.length;i++){
			html+='<label class="checkbox-inline margin-bottom-0">';
			var  checked='';
			if(value==list[i].value){
				checked='checked';
			}
			var id=list[i].id?list[i].id:"";
			html+='<input class="ace ace-checkbox-2" type="checkbox" name="'+n+'" id="'+id+'" value="'+list[i].value+'" data-toggle="checkbox" '+checked+'>'
			+'<span class="lbl">&nbsp;'+list[i].text+'</span>';
			html+='</label>';
		}
		html+='</div>'
		+'</div>';
		console.log(html)
		return html;		
	}
	function getSwitch(name,value,label,inputValue){
		var html='';
		html+='<div class="form-group-sm">'
		      +'<label>'+label+'</label>'
				+'<input name="'+name+'" value="'+inputValue+'" class="ace ace-switch ace-switch-6" type="checkbox">'
				+'<span class="lbl"></span>'
		      +'</div>';
		return html;		
	}
	function getRadioField(name,value,label,list){
		if(!list){
			return;
		}
		var html='';
//		var l=label?label:"";
		var v=value?value:"";
		var n=name?name:"";		
		html+='<div class="form-group-sm">';
		if(label)
		html+='<label class="margin-bottom-0">'+label+'</label>';
		html+='<div>';

		for(var i=0;i<list.length;i++){
			if(list[i].style){
				html+='<label class="radio-inline" style="'+list[i].style+'">';
			}else{
				html+='<label class="radio-inline">';
			}
			
			var  checked=false;
			if(value==list[i].value){
				checked="checked";
			}
			html+='<input class="ace" type="radio" name="'+n+'" value="'+list[i].value+'" data-toggle="radio" checked="'+checked+'">'
			+'<span class="lbl">&nbsp;'+list[i].text+'</span>';
			html+='</label>';
		}
		html+='</div>'
		+'</div>';
		
		return html;
	}
	function getComboField(name,value,label,list,hide){
		if(!list){
			return;
		}
		var html='';
		var l=label?label:"";
		var v=value?value:"";
		var n=name?name:"";
		var hc="";
		if(hide){
			hc="hide";
		}
		html+='<div class="form-group-sm '+hc+'">'
	      +'<label class="control-label">'+l+'</label>';
		  html +='<select  name="'+n+'" value="'+v+'" class="form-control">';		     
		  for(var i=0;i<list.length;i++){
			  var sel="";
			  if(value==list[i].value){
				  sel="selected";
			  }
			  html+='<option '+sel+' value="'+list[i]["value"]+'">'+list[i]["text"]+'</option>';
		  }
	      html+='</select>'
	      +'</div>';
	      console.log(html);
		return html;
	}
	function getMulSelectField(id,p,label,list){
		
		if(!list){
			return;
		}
		var html='';
		html+='<div class="from-group">' 
	    html+='<label for="firstname" style="" class="control-label text-right">'+label+'</label>'
		html+='<div  style="">'
		html+=' <select multiple="" style="" class="chosen-select form-control " id="'+id+'" data-placeholder="'+window.lc.getValue("plSelSite")+'">'
			for(var i=0;i<list.length;i++){
				html+='<option  value="'+list[i]["value"]+'">'+list[i]["text"]+'</option>'
			  }
                 html+=' </select>'
                 html+='</div>'
                 html+='</div>'
             
              return html;
	}
	function check(val,action,exp,obj,cb){
		var info;
		if(val.length == 0){
			info="不能为空";
			window.tip.show_pk("danger",null,info);
			obj.trigger("focus");
			return;
		}
		if(exp){
			var ex = /^[A-Za-z0-9][-_.A-Za-z0-9]{1,29}[A-Za-z0-9]$/;
			var Regex = new RegExp(ex);
			if(val.length < 3){
				info="最少三个字符";
			}else if(val.length > 31){
				info="最多31个字符";
			}else if(!Regex.test(val)){
				info= "非法输入，格式为'A-Z'、'a-z'、'0-9'、'-'、'_'、'.'，末位不能为'-'、'_'、'.'";
			}
		}
		if(!info){
			var url="check!"+action+".action?name="+val;
			 $.ajax({ url: url, data:{},complete: function(data,str){
				if(data.responseJSON && data.responseJSON.success){
					if(cb) cb();
				}else{
					window.tip.show_pk("danger",null,"该值已被占用");
					obj.trigger("focus");
				}
			}});
		}else{
			window.tip.show_pk("danger",null,info);
			obj.trigger("focus");
		}
		
	}
	return {
		getTextField:getTextField,
		getTextareaField:getTextareaField,
		getDisplayField:getDisplayField,
		getRadioField:getRadioField,
		getCheckboxField:getCheckboxField,
		getComboField:getComboField,
		getSwitch:getSwitch,
		check:check,
		getFileField:getFileField,
		createMainSearch:createMainSearch,
		getDisplayTextField:getDisplayTextField,
		getDisplayTextareaField:getDisplayTextareaField,
		getDiaplaySelectfiled:getDiaplaySelectfiled,
		getMulSelectField:getMulSelectField,
	};
});


