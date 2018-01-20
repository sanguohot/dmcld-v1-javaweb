define([],function (){
	//bootstap edit
	$.fn.editable.defaults.mode = 'inline';
    $.fn.editableform.loading = "<div class='editableform-loading'><i class='light-blue icon-2x fa fa-spinner icon-spin'></i></div>";
    $.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="fa fa-check icon-white"></i></button>'+
    '<button type="button" class="btn editable-cancel"><i class="fa fa-remove"></i></button>';

  //jquery validator
    
    jQuery.validator.addMethod("china_mobile", function(value, element) {   
        var tel = /^0?1[3|4|5|8][0-9]\d{8}$/;
        return this.optional(element) || (tel.test(value));
    }, window.lc.getValue("chinaMobileValid"));
    jQuery.validator.addMethod("price", function(value, element) {   
        var tel = /^[0-9]+(.[0-9]{1,2})?$/;
        return this.optional(element) || (tel.test(value));
    }, window.lc.getValue("priceValid"));
    jQuery.validator.addMethod("product_name", function(value, element) {   
        var tel = /^\w+$/;
        return this.optional(element) || (tel.test(value));
    }, window.lc.getValue("productNameValid"));
    jQuery.validator.addMethod("normal_name", function(value, element) {   
        var tel = /^\S{2,31}$/;
        return this.optional(element) || (tel.test(value));
    }, window.lc.getValue("normalNameValid"));
    jQuery.validator.addMethod("positive_num", function(value, element) {   
        var tel = /^\+?[1-9][0-9]*$/;
        return this.optional(element) || (tel.test(value));
    }, window.lc.getValue("positiveNumValid"));
    jQuery.validator.addMethod("rate_num", function(value, element) {   
//        var tel = /(^[1-9][0-9]$)|100|(^[0-9]$)$/;
    	var tel = /^(0|[1-9]\d?|100)$/;
        return this.optional(element) || (tel.test(value));
    }, window.lc.getValue("rateNumValid"));
    jQuery.validator.addMethod("nonnegative_num", function(value, element) {   
        var tel = /^\d+$/;
        return this.optional(element) || (tel.test(value));
    }, window.lc.getValue("nonnegativeNumValid"));
    jQuery.validator.addMethod("port", function(value, element) {
        var tel = /^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-4])$/;
        return this.optional(element) || (tel.test(value));
    }, window.lc.getValue("portNotValid"));
    jQuery.validator.addMethod("host", function(value, element) {   
    	  if(/^[0-9a-zA-Z]+[0-9a-zA-Z\.-]*\.[a-zA-Z]{2,4}$/.test(value) ||
		    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(value)){
		    return true;
		  }else{
		    return false;
		  }
    }, window.lc.getValue("hostNotValid"));
    $.validator.setDefaults({
//    	   debug: true,
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		rules: {
	        url: {
	          required: true,
	          url:true
	        },
	        name: {
	          required: true,
	          normal_name:true
	        },
	        email: {
		        required: true,
		        email:true
	        },
	        mobile: {
		        required: true,
		        china_mobile:'required'
	        },
	        price: {
		        required: true,
		        price:true
	        },
	        productName: {
		        required: true,
		        product_name:true
	        }
	      },
	      messages: {
	        email: {
	          required: "请输入email",
	          email: "email格式不正确"
	        },
	        url: {
	          required: "请输入url",
	          url: "url不正确"
	        },
	        name: {
	          required: "请输入名称",
//	          name: "名称不正确"
	        },	        
	        mobile: {
	          required: "请输入手机"
	        },
	        price: {
	          required: "请输入价格"
	        },
	        productName: {
	        	required: "请输入设备型号"
	        }
	      },
	      highlight: function (e) {
	        $(e).closest('.form-group').removeClass('has-success').addClass('has-error');
	      },
	  
	      success: function (e) {
	        $(e).closest('.form-group').removeClass('has-error').addClass('has-success');
	        $(e).remove();
	      }
    })
    return {

    };
});


