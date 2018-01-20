
define([],function(){
  function isDag(productId){
	  if(!productId){
		  return false;
	  }else if(productId==17 || productId==18 || productId==19 || productId==80 || productId==81 || productId==82){
		  return true;
	  }else{
		  return false;
	  }
  }
  function isUc(productId){
	  if(!productId){
		  return false;
	  }else if(productId==50 || productId==51 || productId==52 || productId==53 || productId==54){
		  return true;
	  }else{
		  return false;
	  }
  }
  return{
    isDag:isDag,
    isUc:isUc
  }
})
