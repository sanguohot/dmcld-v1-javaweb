define([],function (){
		function show_pk(type,delay,text,loading){
      //判断type类型，添加字符图标
      if(type == 'info'){
        text = '<i class="fa fa-exclamation "></i>&nbsp;' + text;
      }else if(type == 'warning'){
        text = '<i class="fa fa-warning"></i>&nbsp;' + text;
      }else if(type == 'danger'){
        text = '<i class="fa fa-times" style="color:#f5f5f5;"></i>&nbsp;' + text;
      }else{
        text = '<i class="fa fa-check" style="color:#f5f5f5;"></i>&nbsp;' + text;
      }
			var html=text;
			if(loading){
			    html='<div id="icon-middle"> '
				    +'<i class="fa fa-spinner fa-spin"></i> '
				    +text
				    +'</div> ';
			}
			var m=$.scojs_message.TYPE_OK;
		    if(type=="info"){
		    	m=$.scojs_message.TYPE_INFO;
		    }else if(type=="danger"){
		    	m=$.scojs_message.TYPE_ERROR;
		    }else if(type=="warning"){
          m=$.scojs_message.TYPE_WARNING;
        }
			$.scojs_message(html, m,delay);
		}
		function close_pk(){
			$('#page_message').html("");
		}
		function show(type,autoHide,text,loading){
			createHtml(type,text,loading)
			if(autoHide){
				setTimeout(close,3000);
			}
		}
		function close(){
			var pn=$("#tooltips");
			if(!pn) return;
			pn.html("&nbsp;");
		}
		function createHtml(type,text,loading){
			var pn=$("#tooltips");
			if(!pn) return;
			var html='<div class="row" >'
			    +'<div class="col-md-4"></div>'
			    +'<div class="col-md-4" >'
			    +'<div class="alert alert-'+type+' alert-dismissable text-center" style="padding-top:2px;padding-bottom:2px;margin-bottom:10px;">'
			    +'<button type="button" class="close" data-dismiss="alert"' 
			    +'aria-hidden="true">'
			    +'&times;'
			    +'</button>';
//			    +'<span class="ico_procf"></span>'
//			    +text
			    if(loading){
				    html+='<div id="icon-middle"> '
				    +'<img src="/picture/ico_loading104474.gif" style="margin-right:5px;"> '
				    +text
				    +'</div> ';
			    }else{
			    	html+=text;
			    }
			    html+='</div>'    
			    +'</div>'
			    +'<div class="col-md-4"></div>'
			    +'</div>';
			pn.html("");
			pn.append(html);
			$("#tooltips button.close").bind("click",function(){
				$("#tooltips").html("&nbsp;");
			});
		}
	
    return {
    	show:show,
    	show_pk:show_pk,
    	close_pk:close_pk
    };
});


