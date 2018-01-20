/**
 * Created by Rainc on 2015/3/21.
 */
define([],function(){
  function createPath(){
	  var node=window.global.getNode();
	  var et=window.global.getEtype();
	  var text="";
	  if(node){
		  text=node.text();
	  }
	  if(text && et && (et=="dr" || et=="dc")){
		  text=window.global.trimNumber(text);
	  }
	  
	  var curNid=window.curNid;
	  var domainUuid=window.global.getDomainUuid();
	  var home='<li>'
			+'<i class="ace-icon fa fa-home home-icon" style="font-size:18px;"></i>'
			+'<a id="home-page" href="#">'+window.lc.getValue("homePage")+'</a>'
		+'</li>';
	  var mid=$("#bs-example-navbar-collapse li.active a").attr("id");
	  var mt=$("#"+mid).attr("title");
	  moda=getLi(null,mt,true,null);
	  modn=getLi(null,mt,false,mid);
	  console.log("domain:"+domainUuid);
	  var html='';
	  
	  if(et){
		  html=home+modn;
		  if(et=="site"){
			  var zone=node.parent().parent().parent().find('a[etype=zone]');
			  html+=getLi($("#domain-sel"),$("#domain-sel option:checked").text(),false,null);
			  html+=getLi(zone,zone.attr("name")?zone.attr("name"):zone.text(),false,null);
			  html+=getLi(node,node.attr("name")?node.attr("name"):node.text(),true,null);
		  }else{
			  html+=getLi($("#domain-sel"),$("#domain-sel option:checked").text(),false,null);
			  html+=getLi(node,node.attr("name")?node.attr("name"):text,true,null);
		  }
	  }else if(domainUuid){
		  html=home+modn;
		  html+=getLi(null,$("#domain-sel option:checked").text(),true,null);
	  }else{
		  html=home+moda;
	  }
	  $("#breadcrumbs ul").html(html);
	  $("#breadcrumbs a").bind("click",pathClick);
  }
  function pathClick(){
	  var node=$(this);
	  var mid=node.attr("mid");
	  var nid=node.attr("nid");
	  var id=node.attr("id");
	  var et=node.attr("etype");
	  if(mid){
		  $("#bs-example-navbar-collapse a[id="+mid+"]").trigger("click");
	  }else if(nid){
		  var n=$("#nav-list a[nid="+nid+"]");
		  if(n && n.length){
			  n.trigger("click"); 
		  }else if(et && et=="domain"){
			  window.domainChange();			  
		  }		  
	  }else if(id=="home-page"){
		  window.location="/bootstrap.html";
	  }
  }
  function getLi(node,text,active,mid){
	  if(active){
		  return '<li class=active>'
			+text
			+'</li>';
	  }else if(node){
		  var nid=node.attr("nid");		  
		  if(nid){
			  var etype=node.attr("etype");
			  var domainUuid=node.attr("domain_uuid");
			  return '<li><a nid='+nid+' etype='+etype+' domain_uuid='+domainUuid+' href="#">'+text+'</a></li>';
		  }else if(node.val){
			  var sel=node.val();
			  return '<li><a nid="domain_"'+sel+' etype=domain domain_uuid='+sel+' href="#">'+text+'</a></li>';
		  } 
	  }else if(mid){
		  return '<li><a mid='+mid+' href="#">'+text+'</a></li>';
	  }else{
		  return '<li><a href="#">'+text+'</a></li>';
	  }	  
  }
  return{
	  createPath:createPath
  }
})
