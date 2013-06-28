// ==UserScript==
// @name			 Concrete5 Power Tools
// @version			 1.1
// @description	     A toolbox of power user shortcuts for Concrete5 administrators
// @include		     *
// ==/UserScript==
 
if (typeof jQuery === 'function') {

	/**
	 * Minified KeyCapture & shortcut objects
	 */
	var KeyCapture=function(e){function n(e){t[e.keyCode]=true}function r(e){delete t[e.keyCode]}function i(){e(document.body).on("keydown."+namespace,n);e(document.body).on("keyup."+namespace,r)}function s(){e(document.body).off("keydown."+namespace);e(document.body).off("keyup."+namespace)}function u(){i()}var t={};namespace=typeof namespace!=="undefined"?namespace:"KeyCapture";var o={};o.isDown=function(e){return e in t};o.isUp=function(e){return!isDown()};o.ignore=function(){s};o.watch=function(){i};o.getMap=function(){return t};e(function(){u()});return o}(jQuery);shortcut={all_shortcuts:{},add:function(e,t,n){var r={type:"keydown",propagate:false,disable_in_input:false,target:document,keycode:false};if(!n)n=r;else{for(var i in r){if(typeof n[i]=="undefined")n[i]=r[i]}}var s=n.target;if(typeof n.target=="string")s=document.getElementById(n.target);var o=this;e=e.toLowerCase();var u=function(r){r=r||window.event;if(n["disable_in_input"]){var i;if(r.target)i=r.target;else if(r.srcElement)i=r.srcElement;if(i.nodeType==3)i=i.parentNode;if(i.tagName=="INPUT"||i.tagName=="TEXTAREA")return}if(r.keyCode)code=r.keyCode;else if(r.which)code=r.which;var s=String.fromCharCode(code).toLowerCase();if(code==188)s=",";if(code==190)s=".";var o=e.split("+");var u=0;var a={"`":"~",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"};var f={esc:27,escape:27,tab:9,space:32,"return":13,enter:13,backspace:8,scrolllock:145,scroll_lock:145,scroll:145,capslock:20,caps_lock:20,caps:20,numlock:144,num_lock:144,num:144,pause:19,"break":19,insert:45,home:36,"delete":46,end:35,pageup:33,page_up:33,pu:33,pagedown:34,page_down:34,pd:34,left:37,up:38,right:39,down:40,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123};var l={shift:{wanted:false,pressed:false},ctrl:{wanted:false,pressed:false},alt:{wanted:false,pressed:false},meta:{wanted:false,pressed:false}};if(r.ctrlKey)l.ctrl.pressed=true;if(r.shiftKey)l.shift.pressed=true;if(r.altKey)l.alt.pressed=true;if(r.metaKey)l.meta.pressed=true;for(var c=0;k=o[c],c<o.length;c++){if(k=="ctrl"||k=="control"){u++;l.ctrl.wanted=true}else if(k=="shift"){u++;l.shift.wanted=true}else if(k=="alt"){u++;l.alt.wanted=true}else if(k=="meta"){u++;l.meta.wanted=true}else if(k.length>1){if(f[k]==code)u++}else if(n["keycode"]){if(n["keycode"]==code)u++}else{if(s==k)u++;else{if(a[s]&&r.shiftKey){s=a[s];if(s==k)u++}}}}if(u==o.length&&l.ctrl.pressed==l.ctrl.wanted&&l.shift.pressed==l.shift.wanted&&l.alt.pressed==l.alt.wanted&&l.meta.pressed==l.meta.wanted){t(r);if(!n["propagate"]){r.cancelBubble=true;r.returnValue=false;if(r.stopPropagation){r.stopPropagation();r.preventDefault()}return false}}};this.all_shortcuts[e]={callback:u,target:s,event:n["type"]};if(s.addEventListener)s.addEventListener(n["type"],u,false);else if(s.attachEvent)s.attachEvent("on"+n["type"],u);else s["on"+n["type"]]=u},remove:function(e){e=e.toLowerCase();var t=this.all_shortcuts[e];delete this.all_shortcuts[e];if(!t)return;var n=t["event"];var r=t["target"];var i=t["callback"];if(r.detachEvent)r.detachEvent("on"+n,i);else if(r.removeEventListener)r.removeEventListener(n,i,false);else r["on"+n]=false}}

	/**
	 * Shortcuts & Bindings - Edit below here
	 */
	
	// toggle edit mode
	shortcut.add("Ctrl+E", function() {

		if ($('#ccm-nav-check-out, #ccm-check-in-publish').length) {
			if (CCM_EDIT_MODE) {
				$("#ccm-approve-field").val('APPROVE');
				$('#ccm-check-in').submit();
			} else {
				var newloc = $('#ccm-nav-edit').attr('href');
				window.location.href = newloc;
			}
		}
		
	});

	// toggle edit mode
	shortcut.add("Ctrl+W", function() {

		if ($('#ccm-toolbar-nav-properties').length) {
			if ($('#ccmMetadataForm').length) {
				$('#ccmMetadataForm').submit();
			} else {
				$('#ccm-toolbar-nav-properties').click();
			}
		}
		
	});

	// quick jump to the intelligent search, regardless of what has focus
	shortcut.add("Ctrl+S", function(){

		$('#ccm-nav-intelligent-search').click().focus();

	});

	/**
	 * DOM Ready Bindings
	 */
	$(function() {
		$(document.body)

			/**
			 * This will check for a "open link in new window" trigger via a held "ctrl" key click on
			 * an intelligent search result. It just clears the fieid and dropdown out on click.
			 */
			.on('click', '#ccm-intelligent-search-results a', function (event) {
				if (KeyCapture.isDown(224)) {
					$('#ccm-nav-intelligent-search').val('').change().focus().click().blur();
				}
			})

			/**
			 * This is supporting the double click event below
			 * Adds the area ID to the .data() of the highlighter
			 */
			.on('hover', '.ccm-block', function () {
				$('#ccm-highlighter').data('block-id', this.id.replace('b', ''));
			})

			/**
			 * Fires the Edit dialog on double-click of a block in Edit Mode
			 */
			.on('dblclick', '#ccm-highlighter', function (event) {
				$('a#menuEdit' + $(this).data('block-id')).click();
			});

	});

}
