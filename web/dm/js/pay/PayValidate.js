/**
 * Created by Evan on 2015/10/22.
 */
define([],function(){
	function addSales(){
    $('#myModal form').validate({
      rules: {
        name: {
          required: true
        },
        mobile: {
          required: true
        }
      },
  
      messages: {
        name: {
            required: "请输入业务员"
          },
        mobile: {
          required: "请输入手机"
        }         
      }
    });
  }
function checkPrice(){
    $('#myModal form').validate();
  }	
  return{
	  addSales:addSales,
	  checkPrice:checkPrice
  }
})