/**
 * Created by Evan on 2015/10/22.
 */
define([],function(){
	function threshold(){
    $('#myModal form').validate({
      rules: {
    	threshold: {
          required: true,
          positive_num:true
        },
        offlineTime: {
          nonnegative_num:true
        },
        money: {
          required: true,
          positive_num:true
        },
        moneyPerSec: {
          required: true,
          positive_num:true
        }        
      },
  
      messages: {
    	  threshold: {
            required: window.lc.getValue("emptyValid")
          },
    	  money: {
            required: window.lc.getValue("emptyValid")
          },
          moneyPerSec: {
          	required: window.lc.getValue("emptyValid")
          }          
      }
    });
  }
  return{
	  threshold:threshold
  }
})