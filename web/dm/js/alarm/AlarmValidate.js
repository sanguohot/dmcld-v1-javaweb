/**
 * Created by Evan on 2015/10/22.
 */
define([],function(){
	function domain(){
    $('#myModal form').validate({
      rules: {
    	asrThreshold: {
          required: true,
          rate_num:true
        },
        capsThreshold: {
          required: true,
          nonnegative_num:true
        } 
      },
  
      messages: {
    	  asrThreshold: {
            required: window.lc.getValue("emptyValid")
          },
          capsThreshold: {
        	required: window.lc.getValue("emptyValid")
          }        
      }
    });
  }
	function alarmApi(){
    $('#myModal form').validate({
      rules: {
    	alarmApiHost: {
          required: true,
          host:true
        },
        alarmApiPort: {
          required: true,
          port:true
        },
        alarmApiPath: {
        	required: true
        } 
      },
  
      messages: {
    	  alarmApiHost: {
            required: window.lc.getValue("emptyValid")
          },
          alarmApiPort: {
        	required: window.lc.getValue("emptyValid")
          },
          alarmApiPath: {
        	required: window.lc.getValue("emptyValid")
          }          
      }
    });
  }
  return{
	  domain:domain,
	  alarmApi:alarmApi
  }
})