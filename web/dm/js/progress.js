define([],function (){
		function createProc(){
//			var pn=$("#myProgress_p");
//			if(!pn) return;
//			var html='';
//			 html+='<div id="myProgress" class="progress">'
//		      +'<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">'
//		      +'<span ></span>'
//		      +'</div>'
//		      +'</div>';
//		      pn.html(html);
			
			var pn=$("#myModal");
			if(!pn) return;
			var html='<div class="modal-dialog">'
			      +'<div class="modal-content">'
			      +'<div class="modal-header">'
			      +'<button type="button" class="close" '
			      +'data-dismiss="modal" aria-hidden="true">'
			      +'&times;'
			      +'</button>'
			      +'<h4 class="modal-title" id="myModalLabel">'
			      +'正在升级请稍候.....'
			      +'</h4>'
			      +'</div>'
			      +'<div class="modal-body">'
			      +'<div class="progress">'
			      +'<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">'
			      +'<span class="">0%</span>'	     
			      +'</div>'
			      +'</div>'
//			      +'<div class="modal-footer">'
//			      +'<button name="close" type="button" class="btn btn-default" '
//			      +'data-dismiss="modal">关闭'
//			      +'</button>'
//			      +'<button name="commit" type="button" class="btn btn-primary">'
//			      +'提交'
//			      +'</button>'
//			      +'</div>'
			      +'</div><!-- /.modal-content -->'
			      +'</div>';'<div class="row" >'
			    +'<div class="col-md-4"></div>'
			    +'<div class="col-md-4" >'
			     
			      +'</div>'
			      +'</div>'			   
			    +'</div>'
			    +'<div class="col-md-4"></div>'
			    +'</div>';

			pn.html("");
			pn.append(html);
		}
		function closeProc(){
//		    $('#myModal .progress-bar').css({'width':100+'%'}).find('span').html("升级完毕");
//		    if(this.timer1){
//		    	clearInterval(this.timer1);
//		    	this.timer1=null;
//		    }
//			var pn=$("#myProgress_p");
//			if(!pn) return;			
//		    pn.html("");
			
			$('#myModal .progress-bar').css({'width':100+'%'}).find('span').html("升级完毕");
		    if(this.timer1){
		    	clearInterval(this.timer1);
		    	this.timer1=null;
		    }
			var pn=$("#myModal");
			if(!pn) return;			
		    pn.html("");

		}
		function startProc(){
//			createProc();
//			$('#myModal .progress-bar').css({'width':0+'%'}).find('span').html("开始升级......");
//			var i=0;
//			var timer1=setInterval(function(){
//				if(i<100){
//					i++;
//					$('#myModal .progress-bar').css({'width':i+'%'}).find('span').html("正在升级请稍候......");
//				}else{
//					closeProc();
//				}
//										
//			},50);
//			this.timer1=timer1;
			
			createProc();
			$('#myModal .progress-bar').css({'width':0+'%'}).find('span').html("开始升级......");
			var i=0;
			var timer1=setInterval(function(){
				if(i<100){
					i++;
					$('#myModal .progress-bar').css({'width':i+'%'}).find('span').html("正在升级请稍候......");
				}else{
					closeProc();
				}
										
			},50);
			this.timer1=timer1;
		}
	
    return {
    	createProc:createProc,
    	startProc:startProc,
    	closeProc:closeProc
    };
});


