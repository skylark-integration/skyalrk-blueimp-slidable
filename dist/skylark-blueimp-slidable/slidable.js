/**
 * skylark-blueimp-slidable - The skylark list plugin library.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-blueimp-slidable/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-browser","skylark-domx-noder","skylark-domx-styler","skylark-domx-eventer","skylark-domx-query","skylark-domx-plugins-base","skylark-devices-points/touch"],function(t,s,i,e,o,n,l,h){"use strict";var a=l.Plugin.inherit({klassName:"Slidable",pluginName:"blueimp.slidable",options:{selectors:{slidesContainer:"div",titleElement:"h3",indicatorContainer:"ol"},classes:{displayClass:"lark-domx-slidable-display",singleClass:"lark-domx-slidable-single",leftEdgeClass:"lark-domx-slidable-left",rightEdgeClass:"lark-domx-slidable-right",playingClass:"lark-domx-slidable-playing",controlsClass:"lark-domx-slidable-controls",slideClass:"slide",slideLoadingClass:"slide-loading",slideErrorClass:"slide-error",slideContentClass:"slide-content",toggleClass:"toggle",prevClass:"prev",nextClass:"next",closeClass:"close",playPauseClass:"play-pause",activeIndicatorClass:"active"},displayTransition:!0,clearSlides:!0,toggleControlsOnReturn:!0,toggleControlsOnSlideClick:!0,toggleSlideshowOnSpace:!0,enableKeyboardNavigation:!0,closeOnEscape:!1,closeOnSlideClick:!1,closeOnSwipeUpOrDown:!1,emulateTouchEvents:!0,stopTouchEventsPropagation:!1,hidePageScrollbars:!1,disableScroll:!0,carousel:!1,continuous:!0,unloadElements:!0,startSlideshow:!1,slideshowInterval:5e3,index:0,preloadRange:2,transitionSpeed:400,slideshowTransitionSpeed:void 0,hidePageScrollbars:!1,thumbnailIndicators:!0,onopen:t.noop,onopened:t.noop,onslide:t.noop,onslideend:t.noop,onslidecomplete:t.noop,onclose:t.noop,onclosed:t.noop},_construct:function(t,s){if(this.overrided(t,s),this._velm=this.elmx(),this.list=this.options.items,this.num=this.list.length,this.initStartIndex(),!1===this.initWidget())return!1;this.initEventListeners(),this.onslide(this.index),this.ontransitionend(),this.options.startSlideshow&&this.play()},createIndicator:function(t){this.gallery;var s,i,e=this.indicatorPrototype.cloneNode(!1),o=t.title;return this.options.thumbnailIndicators&&(void 0===(s=t.thumbnail)&&(i=t.getElementsByTagName&&n(t).find("img")[0])&&(s=i.src),s&&(e.style.backgroundImage='url("'+s+'")')),o&&(e.title=o),e},addIndicator:function(t){if(this.indicatorContainer.length){var s=this.createIndicator(this.list[t]);s.setAttribute("data-index",t),this.indicatorContainer[0].appendChild(s),this.indicators.push(s)}},setActiveIndicator:function(t){this.indicators&&(this.activeIndicator&&this.activeIndicator.removeClass(this.options.classes.activeIndicatorClass),this.activeIndicator=n(this.indicators[t]),this.activeIndicator.addClass(this.options.classes.activeIndicatorClass))},slide:function(t,s){window.clearTimeout(this.timeout);var i,e,o,n=this.index;if(n!==t&&1!==this.num){for(s||(s=this.options.transitionSpeed),this.options.continuous||(t=this.circle(t)),i=Math.abs(n-t)/(n-t),this.options.continuous&&(e=i,(i=-this.positions[this.circle(t)]/this.slideWidth)!==e&&(t=-i*this.num+t)),o=Math.abs(n-t)-1;o;)o-=1,this.move(this.circle((t>n?t:n)-o-1),this.slideWidth*i,0);t=this.circle(t),this.move(n,this.slideWidth*i,s),this.move(t,0,s),this.options.continuous&&this.move(this.circle(t-i),-this.slideWidth*i,0),this.onslide(t)}},getIndex:function(){return this.index},getNumber:function(){return this.num},prev:function(){(this.options.continuous||this.index)&&this.slide(this.index-1)},next:function(){(this.options.continuous||this.index<this.num-1)&&this.slide(this.index+1)},play:function(s){this.timeout&&(this.timeout.cancel(),this.timeout=null),this.interval=s||this.options.slideshowInterval,this.elements[this.index]>1&&(this.timeout=t.debounce(this.slide.bind(this),this.interval,!0)(this.index+1,this.options.slideshowTransitionSpeed)),this._velm.addClass(this.options.classes.playingClass)},pause:function(){this.timeout&&(this.timeout.cancel(),this.timeout=null),this.interval=null,this._velm.removeClass(this.options.classes.playingClass)},add:function(t){var s;for(t.concat||(t=Array.prototype.slice.call(t)),this.list.concat||(this.list=Array.prototype.slice.call(this.list)),this.list=this.list.concat(t),this.num=this.list.length,this.num>2&&null===this.options.continuous&&(this.options.continuous=!0,this._velm.removeClass(this.options.classes.leftEdgeClass)),this._velm.removeClass(this.options.classes.rightEdgeClass).removeClass(this.options.classes.singleClass),s=this.num-t.length;s<this.num;s+=1)this.addSlide(s),this.positionSlide(s);this.positions.length=this.num,this.initSlides(!0)},resetSlides:function(){this.slidesContainer.empty(),this.unloadAllSlides(),this.slides=[],this.indicatorContainer.empty(),this.indicators=[]},handleClose:function(){this.activeIndicator&&this.activeIndicator.removeClass(this.options.classes.activeIndicatorClass);var t=this.options;this.destroyEventListeners(),this.pause(),this._velm.hide(),this._velm.removeClass([t.displayClass,t.singleClass,t.leftEdgeClass,t.rightEdgeClass]),t.hidePageScrollbars&&(document.body.style.overflow=this.bodyOverflowStyle),this.options.clearSlides&&this.resetSlides(),this.options.onclosed&&this.options.onclosed.call(this)},close:function(){var t=this;this.options.onclose&&this.options.onclose.call(this),this.options.displayTransition?(this._velm.on(s.support.transition.end,function i(e){e.target===t._elm&&(t._velm.off(s.support.transition.end,i),t.handleClose())}),this._velm.removeClass(this.options.classes.displayClass)):this.handleClose()},circle:function(t){return(this.num+t%this.num)%this.num},move:function(t,s,i){this.translateX(t,s,i),this.positions[t]=s},translate:function(t,s,i,o){var n=this.slides[t];e.css(n,"transitionDuration",o+"ms"),e.css(n,"transform","translate("+s+"px, "+i+"px) translateZ(0)")},translateX:function(t,s,i){this.translate(t,s,0,i)},translateY:function(t,s,i){this.translate(t,0,s,i)},onresize:function(){this.initSlides(!0)},onmousedown:function(t){t.which&&1===t.which&&"VIDEO"!==t.target.nodeName&&"AUDIO"!==t.target.nodeName&&(t.preventDefault(),(t.originalEvent||t).touches=[{pageX:t.pageX,pageY:t.pageY}],this.ontouchstart(t))},onmousemove:function(t){this.touchStart&&((t.originalEvent||t).touches=[{pageX:t.pageX,pageY:t.pageY}],this.ontouchmove(t))},onmouseup:function(t){this.touchStart&&(this.ontouchend(t),delete this.touchStart)},onmouseout:function(t){if(this.touchStart){var s=t.target,e=t.relatedTarget;e&&(e===s||i.contains(s,e))||this.onmouseup(t)}},ontouchstart:function(t){this.options.stopTouchEventsPropagation&&o.stop(t);var s=(t.originalEvent||t).touches[0];this.touchStart={x:s.pageX,y:s.pageY,time:Date.now()},this.isScrolling=void 0,this.touchDelta={}},ontouchmove:function(t){this.options.stopTouchEventsPropagation&&o.stop(t);var s,i,e=(t.originalEvent||t).touches[0],n=(t.originalEvent||t).scale,l=this.index;if(!(e.length>1||n&&1!==n))if(this.options.disableScroll&&t.preventDefault(),this.touchDelta={x:e.pageX-this.touchStart.x,y:e.pageY-this.touchStart.y},s=this.touchDelta.x,void 0===this.isScrolling&&(this.isScrolling=this.isScrolling||Math.abs(s)<Math.abs(this.touchDelta.y)),this.isScrolling)this.translateY(l,this.touchDelta.y+this.positions[l],0);else for(t.preventDefault(),window.clearTimeout(this.timeout),this.options.continuous?i=[this.circle(l+1),l,this.circle(l-1)]:(this.touchDelta.x=s/=!l&&s>0||l===this.num-1&&s<0?Math.abs(s)/this.slideWidth+1:1,i=[l],l&&i.push(l-1),l<this.num-1&&i.unshift(l+1));i.length;)l=i.pop(),this.translateX(l,s+this.positions[l],0)},ontouchend:function(t){this.options.stopTouchEventsPropagation&&o.stop(t);var s,i,e,n,l,h=this.index,a=this.options.transitionSpeed,d=this.slideWidth,r=Number(Date.now()-this.touchStart.time)<250,c=r&&Math.abs(this.touchDelta.x)>20||Math.abs(this.touchDelta.x)>d/2,u=!h&&this.touchDelta.x>0||h===this.num-1&&this.touchDelta.x<0,p=!c&&this.options.closeOnSwipeUpOrDown&&(r&&Math.abs(this.touchDelta.y)>20||Math.abs(this.touchDelta.y)>this.slideHeight/2);this.options.continuous&&(u=!1),s=this.touchDelta.x<0?-1:1,this.isScrolling?p?this.close():this.translateY(h,0,a):c&&!u?(i=h+s,e=h-s,n=d*s,l=-d*s,this.options.continuous?(this.move(this.circle(i),n,0),this.move(this.circle(h-2*s),l,0)):i>=0&&i<this.num&&this.move(i,n,0),this.move(h,this.positions[h]+n,a),this.move(this.circle(e),this.positions[this.circle(e)]+n,a),h=this.circle(e),this.onslide(h)):this.options.continuous?(this.move(this.circle(h-1),-d,a),this.move(h,0,a),this.move(this.circle(h+1),d,a)):(h&&this.move(h-1,-d,a),this.move(h,0,a),h<this.num-1&&this.move(h+1,d,a))},ontouchcancel:function(t){this.touchStart&&(this.ontouchend(t),delete this.touchStart)},ontransitionend:function(s){var i=this.slides[this.index];s&&i!==s.target||(this.interval&&this.play(),t.defer(this.options.onslideend,[this.index,i]))},oncomplete:function(s){var i,e=s.target||s.srcElement,o=e&&e.parentNode;e&&o&&(i=this.getNodeIndex(o),n(o).removeClass(this.options.classes.slideLoadingClass),"error"===s.type?(n(o).addClass(this.options.classes.slideErrorClass),this.elements[i]=3):this.elements[i]=2,e.clientHeight>this._velm.clientHeight()&&(e.style.maxHeight=this._velm.clientHeight()),this.interval&&this.slides[this.index]===o&&this.play(),t.defer(this.options.onslidecomplete,[i,o]))},onload:function(t){this.oncomplete(t)},onerror:function(t){this.oncomplete(t)},onkeydown:function(t){switch(t.which||t.keyCode){case 13:this.options.toggleControlsOnReturn&&(o.stop(t),this.toggleControls());break;case 27:this.options.closeOnEscape&&(this.close(),t.stopImmediatePropagation());break;case 32:this.options.toggleSlideshowOnSpace&&(o.stop(t),this.toggleSlideshow());break;case 37:this.options.enableKeyboardNavigation&&(o.stop(t),this.prev());break;case 39:this.options.enableKeyboardNavigation&&(o.stop(t),this.next())}},handleClick:function(t){var s=this.options,i=t.target||t.srcElement,e=i.parentNode;if(e===this.indicatorContainer[0])return o.stop(t),void this.slide(this.getNodeIndex(i));if(e.parentNode===this.indicatorContainer[0])return this.preventDefault(t),void this.slide(this.getNodeIndex(e));function l(t){return n(i).hasClass(t)||n(e).hasClass(t)}l(s.classes.toggleClass)?(o.stop(t),this.toggleControls()):l(s.classes.prevClass)?(o.stop(t),this.prev()):l(s.classes.nextClass)?(o.stop(t),this.next()):l(s.classes.closeClass)?(o.stop(t),this.close()):l(s.classes.playPauseClass)?(o.stop(t),this.toggleSlideshow()):e===this.slidesContainer[0]?s.closeOnSlideClick?(o.stop(t),this.close()):s.toggleControlsOnSlideClick&&(o.stop(t),this.toggleControls()):e.parentNode&&e.parentNode===this.slidesContainer[0]&&s.toggleControlsOnSlideClick&&(o.stop(t),this.toggleControls())},onclick:function(t){if(!(this.options.emulateTouchEvents&&this.touchDelta&&(Math.abs(this.touchDelta.x)>20||Math.abs(this.touchDelta.y)>20)))return this.handleClick(t);delete this.touchDelta},updateEdgeClasses:function(t){t?this._velm.removeClass(this.options.classes.leftEdgeClass):this._velm.addClass(this.options.classes.leftEdgeClass),t===this.num-1?this._velm.addClass(this.options.classes.rightEdgeClass):this._velm.removeClass(this.options.classes.rightEdgeClass)},handleSlide:function(t){this.options.continuous||this.updateEdgeClasses(t),this.loadElements(t),this.options.unloadElements&&this.unloadElements(t),this.setTitle(t),this.setActiveIndicator(t)},onslide:function(s){this.index=s,this.handleSlide(s),t.defer(this.options.onslide,[s,this.slides[s]])},setTitle:function(t){var s=this.slides[t].firstChild,i=s.title||s.alt,e=this.titleElement;e.length&&(this.titleElement.empty(),i&&e[0].appendChild(document.createTextNode(i)))},createElement:function(t,s){var i=this.options.renderItem(t,s);return n(i).addClass(this.options.classes.slideContentClass),i},loadElement:function(t){this.elements[t]||(this.slides[t].firstChild?this.elements[t]=n(this.slides[t]).hasClass(this.options.classes.slideErrorClass)?3:2:(this.elements[t]=1,n(this.slides[t]).addClass(this.options.classes.slideLoadingClass),this.slides[t].appendChild(this.createElement(this.list[t],this.proxyListener))))},loadElements:function(t){var s,i=Math.min(this.num,2*this.options.preloadRange+1),e=t;for(s=0;s<i;s+=1)e+=s*(s%2==0?-1:1),e=this.circle(e),this.loadElement(e)},unloadElements:function(t){var s,i;for(s in this.elements)this.elements.hasOwnProperty(s)&&(i=Math.abs(t-s))>this.options.preloadRange&&i+this.options.preloadRange<this.num&&(this.unloadSlide(s),delete this.elements[s])},addSlide:function(t){var s=this.slidePrototype.cloneNode(!1);s.setAttribute("data-index",t),this.slidesContainer[0].appendChild(s),this.slides.push(s),this.addIndicator(t)},positionSlide:function(t){var s=this.slides[t];e.css(s,{width:this.slideWidth+"px",left:t*-this.slideWidth+"px"}),this.move(t,this.index>t?-this.slideWidth:this.index<t?this.slideWidth:0,0)},initSlides:function(t){var s,i;for(t||(this.indicatorContainer=this._velm.query(this.options.selectors.indicatorContainer),this.indicatorContainer.length&&(this.indicatorPrototype=document.createElement("li"),this.indicators=this.indicatorContainer[0].children)),t||(this.positions=[],this.positions.length=this.num,this.elements={},this.imagePrototype=document.createElement("img"),this.elementPrototype=document.createElement("div"),this.slidePrototype=document.createElement("div"),n(this.slidePrototype).addClass(this.options.classes.slideClass),this.slides=this.slidesContainer[0].children,s=this.options.clearSlides||this.slides.length!==this.num),this.slideWidth=this._velm.clientWidth(),this.slideHeight=this._velm.clientHeight(),this.slidesContainer[0].style.width=this.num*this.slideWidth+"px",s&&this.resetSlides(),i=0;i<this.num;i+=1)s&&this.addSlide(i),this.positionSlide(i);this.options.continuous&&(this.move(this.circle(this.index-1),-this.slideWidth,0),this.move(this.circle(this.index+1),this.slideWidth,0))},unloadSlide:function(t){var s,i;null!==(i=(s=this.slides[t]).firstChild)&&s.removeChild(i)},unloadAllSlides:function(){var t,s;for(t=0,s=this.slides.length;t<s;t++)this.unloadSlide(t)},toggleControls:function(){var t=this.options.classes.controlsClass;this._velm.hasClass(t)?this._velm.removeClass(t):this._velm.addClass(t)},toggleSlideshow:function(){this.interval?this.pause():this.play()},getNodeIndex:function(t){return parseInt(t.getAttribute("data-index"),10)},initStartIndex:function(){var t=this.options.index;this.index=this.circle(parseInt(t,10)||0)},initEventListeners:function(){var t=this,i=this.slidesContainer;function e(i){var e=s.support.transition.end===i.type?"transitionend":i.type;t["on"+e](i)}n(window).on("resize",e),n(document.body).on("keydown",e),this._velm.on("click",e),h.isTouchEnabled()?i.on("touchstart touchmove touchend touchcancel",e):this.options.emulateTouchEvents&&i.on("mousedown mousemove mouseup mouseout",e),i.on(s.support.transition.end,e),this.proxyListener=e},destroyEventListeners:function(){var t=this.slidesContainer,i=this.proxyListener;n(window).off("resize",i),n(document.body).off("keydown",i),this._velm.off("click",i),h.isTouchEnabled()?t.off("touchstart touchmove touchend touchcancel",i):this.options.emulateTouchEvents&&t.off("mousedown mousemove mouseup mouseout",i),t.off(s.support.transition.end,i)},handleOpen:function(){this.options.onopened&&this.options.onopened.call(this)},initWidget:function(){var t=this;if(this.slidesContainer=this._velm.query(this.options.selectors.slidesContainer).first(),!this.slidesContainer.length)return!1;this.titleElement=this._velm.query(this.options.selectors.titleElement).first(),1===this.num&&this._velm.addClass(this.options.classes.singleClass),this.options.onopen&&this.options.onopen.call(this),this.options.displayTransition?this._velm.on(s.support.transition.end,function i(e){e.target===t._elm&&(t._velm.off(s.support.transition.end,i),t.handleOpen())}):this.handleOpen(),this.options.hidePageScrollbars&&(this.bodyOverflowStyle=document.body.style.overflow,document.body.style.overflow="hidden"),this._velm.show(),this.initSlides(),this._velm.addClass(this.options.classes.displayClass)}});return l.register(a),t.attach("intg.blueimp.Slidable",a)});
//# sourceMappingURL=sourcemaps/slidable.js.map
