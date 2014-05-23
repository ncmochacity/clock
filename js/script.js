document.ready = function() {
	
var currentDate= new Date();
var futureDate= new Date(currentDate.getFullYear() + 1, 0, 1);
var diff=futureDate.getTime()/1000 - currentDate.getTime()/1000;


 var clock = $('.clock').FlipClock(60, {
		countdown: true,
		clockFace:"DailyCounter",
		showSeconds:true
	});
}



/*
	Base.js, version 1.1a
	Copyright 2006-2010, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/var Base=function(){};Base.extend=function(e,t){"use strict";var n=Base.prototype.extend;Base._prototyping=!0;var r=new this;n.call(r,e);r.base=function(){};delete Base._prototyping;var i=r.constructor,s=r.constructor=function(){if(!Base._prototyping)if(this._constructing||this.constructor==s){this._constructing=!0;i.apply(this,arguments);delete this._constructing}else if(arguments[0]!==null)return(arguments[0].extend||n).call(arguments[0],r)};s.ancestor=this;s.extend=this.extend;s.forEach=this.forEach;s.implement=this.implement;s.prototype=r;s.toString=this.toString;s.valueOf=function(e){return e=="object"?s:i.valueOf()};n.call(s,t);typeof s.init=="function"&&s.init();return s};Base.prototype={extend:function(e,t){if(arguments.length>1){var n=this[e];if(n&&typeof t=="function"&&(!n.valueOf||n.valueOf()!=t.valueOf())&&/\bbase\b/.test(t)){var r=t.valueOf();t=function(){var e=this.base||Base.prototype.base;this.base=n;var t=r.apply(this,arguments);this.base=e;return t};t.valueOf=function(e){return e=="object"?t:r};t.toString=Base.toString}this[e]=t}else if(e){var i=Base.prototype.extend;!Base._prototyping&&typeof this!="function"&&(i=this.extend||i);var s={toSource:null},o=["constructor","toString","valueOf"],u=Base._prototyping?0:1;while(a=o[u++])e[a]!=s[a]&&i.call(this,a,e[a]);for(var a in e)s[a]||i.call(this,a,e[a])}return this}};Base=Base.extend({constructor:function(){this.extend(arguments[0])}},{ancestor:Object,version:"1.1",forEach:function(e,t,n){for(var r in e)this.prototype[r]===undefined&&t.call(n,e[r],r,e)},implement:function(){for(var e=0;e<arguments.length;e++)typeof arguments[e]=="function"?arguments[e](this.prototype):this.prototype.extend(arguments[e]);return this},toString:function(){return String(this.valueOf())}});var FlipClock;(function(e){"use strict";FlipClock=function(e,t,n){return new FlipClock.Factory(e,t,n)};FlipClock.Lang={};FlipClock.Base=Base.extend({buildDate:"2013-11-07",version:"0.3.1",constructor:function(t,n){typeof t!="object"&&(t={});typeof n!="object"&&(n={});this.setOptions(e.extend(!0,{},t,n))},callback:function(e){if(typeof e=="function"){var t=[];for(var n=1;n<=arguments.length;n++)arguments[n]&&t.push(arguments[n]);e.apply(this,t)}},log:function(e){window.console&&console.log&&console.log(e)},getOption:function(e){return this[e]?this[e]:!1},getOptions:function(){return this},setOption:function(e,t){this[e]=t},setOptions:function(e){for(var t in e)typeof e[t]!="undefined"&&this.setOption(t,e[t])}});FlipClock.Factory=FlipClock.Base.extend({autoStart:!0,callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},classes:{active:"flip-clock-active",before:"flip-clock-before",divider:"flip-clock-divider",dot:"flip-clock-dot",label:"flip-clock-label",flip:"flip",play:"play",wrapper:"flip-clock-wrapper"},clockFace:"HourlyCounter",defaultClockFace:"HourlyCounter",defaultLanguage:"english",language:"english",lang:!1,face:!0,running:!1,time:!1,timer:!1,lists:[],$wrapper:!1,constructor:function(t,n,r){this.lists=[];this.running=!1;this.base(r);this.$wrapper=e(t).addClass(this.classes.wrapper);this.time=new FlipClock.Time(this,n?Math.round(n):0);this.timer=new FlipClock.Timer(this,r);this.lang=this.loadLanguage(this.language);this.face=this.loadClockFace(this.clockFace,r);this.autoStart&&this.start()},loadClockFace:function(e,t){var n,r="Face";e=e.ucfirst()+r;FlipClock[e]?n=new FlipClock[e](this,t):n=new FlipClock[this.defaultClockFace+r](this,t);n.build();return n},loadLanguage:function(e){var t;FlipClock.Lang[e.ucfirst()]?t=FlipClock.Lang[e.ucfirst()]:FlipClock.Lang[e]?t=FlipClock.Lang[e]:t=FlipClock.Lang[this.defaultLanguage];return t},localize:function(e,t){var n=this.lang,r=e.toLowerCase();typeof t=="object"&&(n=t);return n&&n[r]?n[r]:e},start:function(e){var t=this;if(!t.running&&(!t.countdown||t.countdown&&t.time.time>0)){t.face.start(t.time);t.timer.start(function(){t.flip();typeof e=="function"&&e()})}else t.log("Trying to start timer when countdown already at 0")},stop:function(e){this.face.stop();this.timer.stop(e);for(var t in this.lists)this.lists[t].stop()},reset:function(e){this.timer.reset(e);this.face.reset()},setTime:function(e){this.time.time=e;this.face.setTime(e)},getTime:function(e){return this.time},setCountdown:function(e){var t=this.running;this.countdown=e?!0:!1;if(t){this.stop();this.start()}},flip:function(){this.face.flip()}});FlipClock.Face=FlipClock.Base.extend({dividers:[],factory:!1,lists:[],constructor:function(e,t){this.base(t);this.factory=e;this.dividers=[]},build:function(){},createDivider:function(t,n,r){if(typeof n=="boolean"||!n){r=n;n=t}var i=['<span class="'+this.factory.classes.dot+' top"></span>','<span class="'+this.factory.classes.dot+' bottom"></span>'].join("");r&&(i="");t=this.factory.localize(t);var s=['<span class="'+this.factory.classes.divider+" "+(n?n:"").toLowerCase()+'">','<span class="'+this.factory.classes.label+'">'+(t?t:"")+"</span>",i,"</span>"];return e(s.join(""))},createList:function(e,t){if(typeof e=="object"){t=e;e=0}var n=new FlipClock.List(this.factory,e,t);return n},reset:function(){},setTime:function(e){this.flip(e)},addDigit:function(e){var t=this.createList(e,{classes:{active:this.factory.classes.active,before:this.factory.classes.before,flip:this.factory.classes.flip}});t.$obj.insertBefore(this.factory.lists[0].$obj);this.factory.lists.unshift(t)},start:function(){},stop:function(){},flip:function(t,n){var r=this;if(!n)if(!r.factory.countdown)r.factory.time.time++;else{r.factory.time.time<=0&&r.factory.stop();r.factory.time.time--}var i=r.factory.lists.length-t.length;i<0&&(i=0);var s=0,o=!1;e.each(t,function(e,t){e+=i;var s=r.factory.lists[e];if(s){var u=s.digit;s.select(t);t!=u&&!n&&s.play()}else{r.addDigit(t);o=!0}});for(var u=0;u<t.length;u++)u>=i&&r.factory.lists[u].digit!=t[u]&&r.factory.lists[u].select(t[u])}});FlipClock.List=FlipClock.Base.extend({digit:0,classes:{active:"flip-clock-active",before:"flip-clock-before",flip:"flip"},factory:!1,$obj:!1,items:[],constructor:function(e,t,n){this.factory=e;this.digit=t;this.$obj=this.createList();t>0&&this.select(t);this.factory.$wrapper.append(this.$obj)},select:function(e){typeof e=="undefined"?e=this.digit:this.digit=e;var t=this.$obj.find('[data-digit="'+e+'"]'),n=this.$obj.find("."+this.classes.active).removeClass(this.classes.active),r=this.$obj.find("."+this.classes.before).removeClass(this.classes.before);this.factory.countdown?t.is(":last-child")?this.$obj.find(":first-child").addClass(this.classes.before):t.next().addClass(this.classes.before):t.is(":first-child")?this.$obj.find(":last-child").addClass(this.classes.before):t.prev().addClass(this.classes.before);t.addClass(this.classes.active)},play:function(){this.$obj.addClass(this.factory.classes.play)},stop:function(){var e=this;setTimeout(function(){e.$obj.removeClass(e.factory.classes.play)},this.factory.timer.interval)},createList:function(){var t=e('<ul class="'+this.classes.flip+'" />');for(var n=0;n<10;n++){var r=e(['<li data-digit="'+n+'">','<a href="#">','<div class="up">','<div class="shadow"></div>','<div class="inn">'+n+"</div>","</div>",'<div class="down">','<div class="shadow"></div>','<div class="inn">'+n+"</div>","</div>","</a>","</li>"].join(""));this.items.push(r);t.append(r)}return t}});FlipClock.Time=FlipClock.Base.extend({minimumDigits:0,time:0,factory:!1,constructor:function(e,t,n){this.base(n);this.factory=e;t&&(this.time=t)},convertDigitsToArray:function(e){var t=[];e=e.toString();for(var n=0;n<e.length;n++)e[n].match(/^\d*$/g)&&t.push(e[n]);return t},digit:function(e){var t=this.toString(),n=t.length;return t[n-e]?t[n-e]:!1},digitize:function(t){var n=[];e.each(t,function(e,t){t=t.toString();t.length==1&&(t="0"+t);for(var r=0;r<t.length;r++)n.push(t[r])});n.length>this.minimumDigits&&(this.minimumDigits=n.length);this.minimumDigits>n.length&&n.unshift("0");return n},getDayCounter:function(e){var t=[this.getDays(),this.getHours(!0),this.getMinutes(!0)];e&&t.push(this.getSeconds(!0));return this.digitize(t)},getDays:function(e){var t=this.time/60/60/24;e&&(t%=7);return Math.floor(t)},getHourCounter:function(){var e=this.digitize([this.getHours(),this.getMinutes(!0),this.getSeconds(!0)]);return e},getHourly:function(){return this.getHourCounter()},getHours:function(e){var t=this.time/60/60;e&&(t%=24);return Math.floor(t)},getMilitaryTime:function(){var e=new Date,t=this.digitize([e.getHours(),e.getMinutes(),e.getSeconds()]);return t},getMinutes:function(e){var t=this.time/60;e&&(t%=60);return Math.floor(t)},getMinuteCounter:function(){var e=this.digitize([this.getMinutes(),this.getSeconds(!0)]);return e},getSeconds:function(e){var t=this.time;e&&(t==60?t=0:t%=60);return Math.ceil(t)},getTime:function(){var e=new Date,t=e.getHours(),n=t>12?"PM":"AM",r=this.digitize([t>12?t-12:t===0?12:t,e.getMinutes(),e.getSeconds()]);return r},getWeeks:function(){var e=this.time/60/60/24/7;mod&&(e%=52);return Math.floor(e)},removeLeadingZeros:function(t,n){var r=0,i=[];e.each(n,function(e,s){e<t?r+=parseInt(n[e],10):i.push(n[e])});return r===0?i:n},toString:function(){return this.time.toString()}});FlipClock.Timer=FlipClock.Base.extend({callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},count:0,factory:!1,interval:1e3,constructor:function(e,t){this.base(t);this.factory=e;this.callback(this.callbacks.init);this.callback(this.callbacks.create)},getElapsed:function(){return this.count*this.interval},getElapsedTime:function(){return new Date(this.time+this.getElapsed())},reset:function(e){clearInterval(this.timer);this.count=0;this._setInterval(e);this.callback(this.callbacks.reset)},start:function(e){this.factory.running=!0;this._createTimer(e);this.callback(this.callbacks.start)},stop:function(e){this.factory.running=!1;this._clearInterval(e);this.callback(this.callbacks.stop);this.callback(e)},_clearInterval:function(){clearInterval(this.timer)},_createTimer:function(e){this._setInterval(e)},_destroyTimer:function(e){this._clearInterval();this.timer=!1;this.callback(e);this.callback(this.callbacks.destroy)},_interval:function(e){this.callback(this.callbacks.interval);this.callback(e);this.count++},_setInterval:function(e){var t=this;t.timer=setInterval(function(){t._interval(e)},this.interval)}});String.prototype.ucfirst=function(){return this.substr(0,1).toUpperCase()+this.substr(1)};e.fn.FlipClock=function(t,n){if(typeof t=="object"){n=t;t=0}return new FlipClock(e(this),t,n)};e.fn.flipClock=function(t,n){return e.fn.FlipClock(t,n)}})(jQuery);(function(e){FlipClock.Lang.English={years:"Years",months:"Months",days:"Days",hours:"Hours",minutes:"Minutes",seconds:"Seconds"};FlipClock.Lang.en=FlipClock.Lang.English;FlipClock.Lang["en-us"]=FlipClock.Lang.English;FlipClock.Lang.english=FlipClock.Lang.English})(jQuery);(function(e){FlipClock.Lang.Spanish={years:"A&#241;os",months:"Meses",days:"D&#205;as",hours:"Horas",minutes:"Minutos",seconds:"Segundo"};FlipClock.Lang.es=FlipClock.Lang.Spanish;FlipClock.Lang["es-es"]=FlipClock.Lang.Spanish;FlipClock.Lang.spanish=FlipClock.Lang.Spanish})(jQuery);(function(e){FlipClock.Lang.German={years:"Jahre",months:"Monate",days:"Tage",hours:"Stunden",minutes:"Minuten",seconds:"Sekunden"};FlipClock.Lang.de=FlipClock.Lang.German;FlipClock.Lang["de-de"]=FlipClock.Lang.German;FlipClock.Lang.german=FlipClock.Lang.German})(jQuery);(function(e){FlipClock.CounterFace=FlipClock.Face.extend({autoStart:!1,constructor:function(e,t){e.timer.interval=0;e.autoStart=!1;e.increment=function(){e.countdown=!1;e.setTime(e.getTime().time+1)};e.decrement=function(){e.countdown=!0;e.setTime(e.getTime().time-1)};e.setValue=function(t){e.setTime(t)};e.setCounter=function(t){e.setTime(t)};this.base(e,t)},build:function(){var t=this,n=this.factory.$wrapper.find("ul"),r=[],i=this.factory.getTime().digitize([this.factory.getTime().time]);i.length>n.length&&e.each(i,function(e,n){var i=t.createList(n);i.select(n);r.push(i)});e.each(r,function(e,t){t.play()});this.factory.lists=r},flip:function(e){var t=this.factory.getTime().digitize([this.factory.getTime().time]);this.base(t,e)}})})(jQuery);(function(e){FlipClock.HourlyCounterFace=FlipClock.Face.extend({clearExcessDigits:!0,constructor:function(e,t){this.base(e,t)},build:function(t,n){var r=this,i=this.factory.$wrapper.find("ul"),s=[];n=n?n:this.factory.time.getHourCounter();n.length>i.length&&e.each(n,function(e,t){s.push(r.createList(t))});this.factory.lists=s;e(this.createDivider("Seconds")).insertBefore(this.factory.lists[this.factory.lists.length-2].$obj);e(this.createDivider("Minutes")).insertBefore(this.factory.lists[this.factory.lists.length-4].$obj);t||e(this.createDivider("Hours",!0)).insertBefore(this.factory.lists[0].$obj);this.clearExcessDigits&&this._clearExcessDigits();this.autoStart&&this.start()},flip:function(e,t){t||(t=this.factory.time.getHourCounter());this.base(t,e)},_clearExcessDigits:function(){var e=this.factory.lists[this.factory.lists.length-2],t=this.factory.lists[this.factory.lists.length-4];for(var n=6;n<10;n++){e.$obj.find("li:last-child").remove();t.$obj.find("li:last-child").remove()}}})})(jQuery);(function(e){FlipClock.MinuteCounterFace=FlipClock.HourlyCounterFace.extend({clearExcessDigits:!1,constructor:function(e,t){this.base(e,t)},build:function(){this.base(!0,this.factory.time.getMinuteCounter())},flip:function(e){this.base(e,this.factory.time.getMinuteCounter())}})})(jQuery);(function(e){FlipClock.TwentyFourHourClockFace=FlipClock.Face.extend({constructor:function(e,t){e.countdown=!1;this.base(e,t)},build:function(t){var n=this,r=this.factory.$wrapper.find("ul");t=t?t:this.factory.time.time||this.factory.time.getMilitaryTime();t.length>r.length&&e.each(t,function(e,t){n.factory.lists.push(n.createList(t))});this.dividers.push(this.createDivider());this.dividers.push(this.createDivider());e(this.dividers[0]).insertBefore(this.factory.lists[this.factory.lists.length-2].$obj);e(this.dividers[1]).insertBefore(this.factory.lists[this.factory.lists.length-4].$obj);this._clearExcessDigits();this.autoStart&&this.start()},flip:function(e){e=e?e:this.factory.time.getMilitaryTime();this.base(e)},_clearExcessDigits:function(){var e=this.factory.lists[this.factory.lists.length-2],t=this.factory.lists[this.factory.lists.length-4];for(var n=6;n<10;n++){e.$obj.find("li:last-child").remove();t.$obj.find("li:last-child").remove()}}})})(jQuery);(function(e){FlipClock.TwelveHourClockFace=FlipClock.TwentyFourHourClockFace.extend({meridium:!1,meridiumText:"AM",build:function(t){var n=this;t=t?t:this.factory.time.time?this.factory.time.time:this.factory.time.getTime();this.base(t);this.meridiumText=this._isPM()?"PM":"AM";this.meridium=e(['<ul class="flip-clock-meridium">',"<li>",'<a href="#">'+this.meridiumText+"</a>","</li>","</ul>"].join(""));this.meridium.insertAfter(this.factory.lists[this.factory.lists.length-1].$obj)},flip:function(){if(this.meridiumText!=this._getMeridium()){this.meridiumText=this._getMeridium();this.meridium.find("a").html(this.meridiumText)}this.base(this.factory.time.getTime())},_getMeridium:function(){return(new Date).getHours()>=12?"PM":"AM"},_isPM:function(){return this._getMeridium()=="PM"?!0:!1},_clearExcessDigits:function(){var e=this.factory.lists[this.factory.lists.length-2],t=this.factory.lists[this.factory.lists.length-4];for(var n=6;n<10;n++){e.$obj.find("li:last-child").remove();t.$obj.find("li:last-child").remove()}}})})(jQuery);(function(e){FlipClock.DailyCounterFace=FlipClock.Face.extend({showSeconds:!0,constructor:function(e,t){this.base(e,t)},build:function(t,n){var r=this,i=this.factory.$wrapper.find("ul"),s=[],o=0;n=n?n:this.factory.time.getDayCounter(this.showSeconds);n.length>i.length&&e.each(n,function(e,t){s.push(r.createList(t))});this.factory.lists=s;this.showSeconds?e(this.createDivider("Seconds")).insertBefore(this.factory.lists[this.factory.lists.length-2].$obj):o=2;e(this.createDivider("Minutes")).insertBefore(this.factory.lists[this.factory.lists.length-4+o].$obj);e(this.createDivider("Hours")).insertBefore(this.factory.lists[this.factory.lists.length-6+o].$obj);e(this.createDivider("Days",!0)).insertBefore(this.factory.lists[0].$obj);this._clearExcessDigits();this.autoStart&&this.start()},flip:function(e,t){t||(t=this.factory.time.getDayCounter(this.showSeconds));this.base(t,e)},_clearExcessDigits:function(){var e=this.factory.lists[this.factory.lists.length-2],t=this.factory.lists[this.factory.lists.length-4];for(var n=6;n<10;n++){e.$obj.find("li:last-child").remove();t.$obj.find("li:last-child").remove()}}})})(jQuery);



