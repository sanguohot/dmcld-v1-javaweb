/* ==========================================================
 * sco.message.js
 * http://github.com/terebentina/sco.js
 * ==========================================================
 * Copyright 2013 Dan Caragea.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

/*jshint laxcomma:true, sub:true, browser:true, jquery:true, eqeqeq: false */

;(function($, undefined) {
	"use strict";

	var pluginName = 'scojs_message';

	$[pluginName] = function(message, type ,delay) {
		clearTimeout($[pluginName].timeout);
		var $selector = $('#' + $[pluginName].options.id);
		if (!$selector.length) {
			$selector = $('<div/>', {id: $[pluginName].options.id}).appendTo($[pluginName].options.appendTo);
		}
		if ($[pluginName].options.animate) {
			$selector.addClass('page_mess_animate');
		} else {
			$selector.removeClass('page_mess_animate');
		}
		$selector.html(message);
		if (type === undefined || type == $[pluginName].TYPE_ERROR) {
			$selector.removeClass($[pluginName].options.okClass).removeClass($[pluginName].options.infoClass).removeClass($[pluginName].options.warningClass).addClass($[pluginName].options.errClass);
		} else if (type == $[pluginName].TYPE_OK) {
			$selector.removeClass($[pluginName].options.errClass).removeClass($[pluginName].options.infoClass).removeClass($[pluginName].options.warningClass).addClass($[pluginName].options.okClass);
		} else if (type == $[pluginName].TYPE_INFO) {
      $selector.removeClass($[pluginName].options.errClass).removeClass($[pluginName].options.okClass).removeClass($[pluginName].options.warningClass).addClass($[pluginName].options.infoClass);
    } else if (type == $[pluginName].TYPE_WARNING) {
      $selector.removeClass($[pluginName].options.errClass).removeClass($[pluginName].options.okClass).removeClass($[pluginName].options.infoClass).addClass($[pluginName].options.warningClass);
    }
		$selector.slideDown('fast', function() {
      if(!delay){
        $[pluginName].timeout = setTimeout(function() { $selector.slideUp('fast'); }, $[pluginName].options.delay);
      }else{
        $[pluginName].timeout = setTimeout(function() { $selector.slideUp('fast'); }, delay * 1000 );
      }
		});
	};


	$.extend($[pluginName], {
		options: {
			 id: 'page_message'
			,okClass: 'page_mess_ok'
      ,infoClass: 'page_mess_info'
			,errClass: 'page_mess_error'
			,warningClass: 'page_mess_warning'
			,animate: true
			,delay: 3000
			,appendTo: 'body'	// where should the modal be appended to (default to document.body). Added for unit tests, not really needed in real life.
		},

		TYPE_ERROR: 1,
		TYPE_OK: 2,
    TYPE_INFO: 3,
    TYPE_WARNING: 4
	});
})(jQuery);
