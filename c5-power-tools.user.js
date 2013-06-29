// ==UserScript==
// @name			 Concrete5 Power Tools
// @version			 1.2.0.1
// @description	     A toolbox of power user shortcuts for Concrete5 administrators
// @updateURL        https://github.com/aghouseh/c5-power-tools/raw/master/c5-power-tools.user.js
// @include		     *
// @match http://*/*
// ==/UserScript==
 
if (typeof CCM_BASE_URL !== 'undefined') {

	/**
	 * KeyCapture Object
	 */
	var KeyCapture = (function($){
		
		var Map = {};
		namespace = (typeof namespace !== 'undefined') ? namespace : 'KeyCapture';

		/**
		 * Private Methods
		 */
		function _pressedKey (event) {
			Map[event.keyCode] = true;
		}
		function _releasedKey (event) {
			delete Map[event.keyCode];
		}
		function _addListeners () {
			$(document.body).on('keydown.' + namespace, _pressedKey);
			$(document.body).on('keyup.' + namespace, _releasedKey);
		}
		function _removeListeners () {
			$(document.body).off('keydown.' + namespace);
			$(document.body).off('keyup.' + namespace);
		}

		/**
		 * Public Method for exposure
		 */
		var Cap = {
			isDown: function (keyCode) {
				return (keyCode in Map);
			},
			isUp: function (keyCode) {
				return (!isDown(keyCode));
			},
			ignore: function () {
				_removeListeners();
			},
			watch: function () {
				_addListeners();
			},
			getMap: function () {
				return Map; 
			}
		};

		function _init() {
			_addListeners();
		}

		$(function(){
			_init();
		});

		return Cap;

	})(jQuery);


	/* mousetrap v1.4.2 craig.is/killing/mice */
	(function(){function r(a,b,d){a.addEventListener?a.addEventListener(b,d,!1):a.attachEvent("on"+b,d)}function y(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return j[a.which]?j[a.which]:z[a.which]?z[a.which]:String.fromCharCode(a.which).toLowerCase()}function s(a){a=a||{};var b=!1,d;for(d in n)a[d]?b=!0:n[d]=0;b||(t=!1)}function A(a,b,d,c,e,f){var g,k,h=[],j=d.type;if(!l[a])return[];"keyup"==j&&u(a)&&(b=[a]);for(g=0;g<l[a].length;++g)if(k=l[a][g],
	c||!(k.seq&&n[k.seq]!=k.level))if(j==k.action&&("keypress"==j&&!d.metaKey&&!d.ctrlKey||b.sort().join(",")===k.modifiers.sort().join(","))){var m=c&&k.seq==c&&k.level==f;(!c&&k.combo==e||m)&&l[a].splice(g,1);h.push(k)}return h}function G(a){var b=[];a.shiftKey&&b.push("shift");a.altKey&&b.push("alt");a.ctrlKey&&b.push("ctrl");a.metaKey&&b.push("meta");return b}function v(a,b,d){if(!m.stopCallback(b,b.target||b.srcElement,d)&&!1===a(b,d))b.preventDefault&&b.preventDefault(),b.stopPropagation&&b.stopPropagation(),
	b.returnValue=!1,b.cancelBubble=!0}function w(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=y(a);b&&("keyup"==a.type&&x===b?x=!1:m.handleKey(b,G(a),a))}function u(a){return"shift"==a||"ctrl"==a||"alt"==a||"meta"==a}function B(a,b){var d,c,e,f=[];d="+"===a?["+"]:a.split("+");for(e=0;e<d.length;++e)c=d[e],C[c]&&(c=C[c]),b&&("keypress"!=b&&D[c])&&(c=D[c],f.push("shift")),u(c)&&f.push(c);d=c;e=b;if(!e){if(!p){p={};for(var g in j)95<g&&112>g||j.hasOwnProperty(g)&&(p[j[g]]=g)}e=p[d]?"keydown":
	"keypress"}"keypress"==e&&f.length&&(e="keydown");return{key:c,modifiers:f,action:e}}function E(a,b,d,c,e){q[a+":"+d]=b;a=a.replace(/\s+/g," ");var f=a.split(" ");if(1<f.length){var g=a;a=function(a){return function(){t=a;++n[g];clearTimeout(F);F=setTimeout(s,1E3)}};c=function(a){v(b,a,g);"keyup"!==d&&(x=y(a));setTimeout(s,10)};for(e=n[g]=0;e<f.length;++e){var h=e+1===f.length?c:a(d||B(f[e+1]).action);E(f[e],h,d,g,e)}}else f=B(a,d),l[f.key]=l[f.key]||[],A(f.key,f.modifiers,{type:f.action},c,a,e),
	l[f.key][c?"unshift":"push"]({callback:b,modifiers:f.modifiers,action:f.action,seq:c,level:e,combo:a})}for(var j={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},z={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},D={"~":"`","!":"1","@":"2",
	"#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},C={option:"alt",command:"meta","return":"enter",escape:"esc",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},p,l={},q={},n={},F,x=!1,t=!1,h=1;20>h;++h)j[111+h]="f"+h;for(h=0;9>=h;++h)j[h+96]=h;r(document,"keypress",w);r(document,"keydown",w);r(document,"keyup",w);var m={bind:function(a,b,d){a=a instanceof Array?a:[a];for(var c=0;c<a.length;++c)E(a[c],b,d);
	return this},unbind:function(a,b){return m.bind(a,function(){},b)},trigger:function(a,b){if(q[a+":"+b])q[a+":"+b]({},a);return this},reset:function(){l={};q={};return this},stopCallback:function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.contentEditable&&"true"==b.contentEditable},handleKey:function(a,b,d){b=A(a,b,d);var c,e={},f=0,g=!1;for(c=0;c<b.length;++c)b[c].seq&&(f=Math.max(f,b[c].level));for(c=0;c<b.length;++c)b[c].seq?
	b[c].level==f&&(g=!0,e[b[c].seq]=1,v(b[c].callback,d,b[c].combo)):g||v(b[c].callback,d,b[c].combo);d.type==t&&!u(a)&&s(e)}};window.Mousetrap=m;"function"===typeof define&&define.amd&&define(m)})();

	// toggle edit mode
	Mousetrap.bind("ctrl+e", function() {

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
	Mousetrap.bind("ctrl+w", function() {

		if ($('#ccm-toolbar-nav-properties').length) {
			if ($('#ccmMetadataForm').length) {
				$('#ccmMetadataForm').submit();
			} else {
				$('#ccm-toolbar-nav-properties').click();
			}
		}
		
	});

	// quick jump to the intelligent search, regardless of what has focus
	Mousetrap.bind("ctrl+s", function(){

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

} // end if CCM_BASE_URL