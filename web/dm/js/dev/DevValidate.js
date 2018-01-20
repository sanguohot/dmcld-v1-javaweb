/**
 * Created by Evan on 2015/10/22.
 */
define([],function(){
	function addModal(){
    $('#myModal form').validate({
      rules: {
        name: {
          required: true
        }
      },
  
      messages: {
        name: {
            required: "请输入名称"
          }        
      }
    });
  }

  return{
	  addModal:addModal
  }
})