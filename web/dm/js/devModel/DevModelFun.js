/**
 * Created by Rainc on 2015/3/22.
 */
define([],function(){
  function createModConfirm(){
    var pn=$("#myModal");
    if(!pn) return;
    var html="<div class='modal-dialog'>" +
      "<div class='modal-content'><div class=\"modal-header\">" +
      "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
      "<h4 class=\"modal-title\" id=\"myModalLabel\">"+window.lc.getValue("sureToDel")+"？</h4></div>" +
      "<div class=\"\"></form></div>" +
      "<div class=\"modal-footer\"><button name=\"close\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">"+window.lc.getValue("cancel")+"</button>" +
      "<button name=\"commit\" type=\"button\" class=\"btn btn-danger\">"+window.lc.getValue("confirm")+"</button></div></div><!-- /.modal-content --></div>"
    pn.html("");
    pn.append(html);
  }
  return{
    createModConfirm:createModConfirm
  }
})