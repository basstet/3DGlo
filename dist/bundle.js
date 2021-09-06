(()=>{"use strict";function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const n=function(){function n(t){var r,o=t.form,a=t.pattern,i=void 0===a?{}:a,c=t.method;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),this.form=o,this.pattern=i,this.method=c,this.elementsForm=(r=this.form.elements,function(t){if(Array.isArray(t))return e(t)}(r)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(r)||function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).filter((function(e){return"button"!==e.tagName.toLowerCase()&&"button"!==e.type})),this.error=new Set}var r,o;return r=n,(o=[{key:"init",value:function(){var e=this;this.applyStyle(),this.setPattern(),this.elementsForm.forEach((function(t){return t.addEventListener("change",e.checkIt.bind(e))})),this.form.addEventListener("submit",(function(t){e.elementsForm.forEach((function(t){return e.checkIt({target:t})})),e.error.size&&t.preventDefault()}))}},{key:"isValid",value:function(e){var t=this,n={notEmpty:function(e){return""!==e.value.trim()},pattern:function(e,t){return t.test(e.value)}};if(this.method){var r=this.method[e.name];if(r)return r.every((function(r){return n[r[0]](e,t.pattern[r[1]])}))}else console.warn("Необходимо передать атрибуты name полей ввода и их методы валидации");return!0}},{key:"checkIt",value:function(e){var t=e.target;this.isValid(t)?(this.showSuccess(t),this.error.delete(t)):(this.showError(t),this.error.add(t))}},{key:"showError",value:function(e){if(e.classList.remove("success"),e.classList.add("error"),!e.nextElementSibling||!e.nextElementSibling.matches(".error-message")){var t=document.createElement("div");t.textContent="Введите корректные данные",t.classList.add("error-message"),e.insertAdjacentElement("afterend",t)}}},{key:"showSuccess",value:function(e){e.classList.remove("error"),e.classList.add("success"),e.nextElementSibling&&e.nextElementSibling.matches(".error-message")&&e.nextElementSibling.remove()}},{key:"applyStyle",value:function(){var e=document.createElement("style");e.textContent="\n      input.success {\n        box-shadow: inset 0 0 0 2px #7FBA00;\n      }\n      input.error {\n        box-shadow: inset 0 0 0 2px #F25022;\n      }\n      .error-message {\n        font-size: 12px;\n        color: #F25022;\n        text-align: left;\n      }\n      form.main-form .error-message {\n        position: absolute;\n        bottom: 5px;\n      }\n    ",document.head.append(e)}},{key:"setPattern",value:function(){this.pattern.name||(this.pattern.name=/^[а-яё]{2,}[\sа-яё]*$/i),this.pattern.phone||(this.pattern.phone=/^\+?[78]([-()]*\d){10}$/),this.pattern.email||(this.pattern.email=/^\w+[\w\d\-_.]*@\w+\.\w{2,}$/),this.pattern.message||(this.pattern.message=/^[а-яё\-\s.,:!?()]{2,}$/i)}}])&&t(r.prototype,o),n}();var r=function(e){if(e.target.matches("input")){var t=e.target,n=t.value;n=n.trim(),(t.matches('input[name="user_name"]')||t.matches('input[name="user_message"]'))&&(n=(n=n.replace(/\s{2,}/g," ")).replace(/-{2,}/g,"-")),t.matches('input[name="user_name"]')&&(n=n.replace(/[а-яё]+/gi,(function(e){return e[0].toUpperCase()+e.slice(1).toLowerCase()}))),t.value=n}},o=function(e){var t=e.target;t.matches("input")&&(t.value=t.value.replace(/\D/g,""))};function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var i,c,s,u,l,m,d,f,v,h,p,y,g,b,E,S,L,w,k,A,q,x,C,I,F,T,_,j,M;F="21 august 2021",T=document.querySelector("#timer-hours"),_=document.querySelector("#timer-minutes"),j=document.querySelector("#timer-seconds"),(M=function(){var e,t,n,r=(e=(new Date(F).getTime()-(new Date).getTime())/1e3,t=Math.floor(e%60),n=Math.floor(e/60%60),{timeRemaining:e,hours:Math.floor(e/60/60),minutes:n,seconds:t});r.timeRemaining>0&&(T.textContent=r.hours<10?"0".concat(r.hours):r.hours,_.textContent=r.minutes<10?"0".concat(r.minutes):r.minutes,j.textContent=r.seconds<10?"0".concat(r.seconds):r.seconds)})(),setInterval(M,1e3),I=document.querySelector("menu"),document.body.addEventListener("click",(function(e){var t=e.target;t.closest(".menu")&&(t=t.closest(".menu")),t.matches("menu li a")||t.matches("menu .close-btn")||t.matches(".menu")?I.classList.toggle("active-menu"):!t.closest("menu")&&I.classList.contains("active-menu")&&I.classList.remove("active-menu")})),k=document.querySelector(".popup"),A=k.querySelector(".popup-content"),q=document.querySelector("#service-block"),x=0,C=function e(){w=requestAnimationFrame(e),++x<11?A.style.top="".concat(x,"%"):(cancelAnimationFrame(w),x=0)},q.addEventListener("click",(function(e){e.target.matches(".popup-btn")&&(k.style.display="block",document.documentElement.clientWidth>=768&&(w=requestAnimationFrame(C)))})),k.addEventListener("click",(function(e){var t=e.target;t.matches(".popup-close")?k.style.display="none":(t=t.closest(".popup-content"))||(k.style.display="none")})),document.body.addEventListener("click",(function(e){var t,n=e.target;n.closest('main a[href="#service-block"]')&&(n=n.closest('main a[href="#service-block"]')),L=n.getAttribute("href"),(n.matches("menu li a")||n.matches('main a[href="#service-block"]'))&&(e.preventDefault(),t=document.querySelector(L).getBoundingClientRect().top,window.scrollTo({left:0,top:t+pageYOffset,behavior:"smooth"}))})),b=document.querySelector(".service-header"),E=b.querySelectorAll(".service-header-tab"),S=document.querySelectorAll(".service-tab"),b.addEventListener("click",(function(e){var t=e.target;(t=t.closest(".service-header-tab"))&&E.forEach((function(e,n){e===t&&function(e){for(var t=0;t<S.length;t++)e===t?(E[t].classList.add("active"),S[t].classList.remove("d-none")):(E[t].classList.remove("active"),S[t].classList.add("d-none"))}(n)}))})),m=document.querySelector(".portfolio-content"),d=document.querySelectorAll(".portfolio-item"),f=document.querySelector(".portfolio-dots"),v=0,h=function(e,t,n){e[t].classList.remove(n)},p=function(e,t,n){e[t].classList.add(n)},y=function(){h(d,v,"portfolio-item-active"),h(l,v,"dot-active"),++v>=d.length&&(v=0),p(d,v,"portfolio-item-active"),p(l,v,"dot-active")},g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e3;u=setInterval(y,e)},m.addEventListener("click",(function(e){e.preventDefault();var t=e.target;t.matches(".portfolio-btn, .dot")&&(h(d,v,"portfolio-item-active"),h(l,v,"dot-active"),t.matches("#arrow-right")?v++:t.matches("#arrow-left")?v--:t.matches(".dot")&&l.forEach((function(e,n){e===t&&(v=n)})),v>=d.length&&(v=0),v<0&&(v=d.length-1),p(d,v,"portfolio-item-active"),p(l,v,"dot-active"))})),m.addEventListener("mouseover",(function(e){e.target.matches(".portfolio-btn, .dot")&&clearInterval(u)})),m.addEventListener("mouseout",(function(e){e.target.matches(".portfolio-btn, .dot")&&g()})),d.forEach((function(e,t){var n=document.createElement("li");n.classList.add("dot"),0===t&&n.classList.add("dot-active"),f.append(n)})),l=document.querySelectorAll(".dot"),g(),function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,n=document.querySelector(".calc-block"),r=document.querySelector(".calc-type"),o=document.querySelector(".calc-square"),a=document.querySelector(".calc-count"),i=document.querySelector(".calc-day"),c=document.getElementById("total"),s=!1,u=function(){var n=0,u=1,l=1,m=0,d=r.options[r.selectedIndex].value,f=+o.value;a.value>1&&(u+=(a.value-1)/10),i.value&&i.value<5?l*=2:i.value&&i.value<10&&(l*=1.5),d&&f&&(n=t*d*f*u*l);var v=0,h=Math.floor(n/60),p=n%60;m=n,s||cancelAnimationFrame(e),s=!0,e=requestAnimationFrame((function t(){e=requestAnimationFrame(t),s&&n>0&&m>0?m>p?(v+=1*h,c.textContent=v,m-=h):(c.textContent=n,m=0,cancelAnimationFrame(e)):cancelAnimationFrame(e)}))};n.addEventListener("change",(function(e){e.target.matches("select, input")&&(s=!1,c.textContent="",u())}))}(100),(s=document.getElementById("command")).addEventListener("mouseover",(function(e){var t=e.target;if(t.matches("img.command__photo")){var n=[t.dataset.img,t.src];t.src=n[0],t.dataset.img=n[1]}})),s.addEventListener("mouseout",(function(e){var t=e.target;if(t.matches("img.command__photo")){var n=[t.dataset.img,t.src];t.src=n[0],t.dataset.img=n[1]}})),c=n,document.body.addEventListener("blur",r,!0),document.body.addEventListener("click",(function(e){if(e.target.matches("input, button")&&e.target.closest("form")){var t=e.target.closest("form");new c({form:t,pattern:{},method:{user_name:[["notEmpty"],["pattern","name"]],user_phone:[["notEmpty"],["pattern","phone"]],user_email:[["notEmpty"],["pattern","email"]],user_message:[["notEmpty"],["pattern","message"]]}}).init()}})),document.getElementById("calc").addEventListener("input",o),(i=document.createElement("div")).style.color="#fff",i.style.marginTop="1rem",document.body.addEventListener("submit",(function(e){if(e.target.closest("form")){e.preventDefault();var t=e.target;t.append(i),i.innerHTML='<div class="sk-double-bounce">\n        <div class="sk-child sk-double-bounce-1"></div>\n        <div class="sk-child sk-double-bounce-2"></div>\n      </div>';var n=new FormData(t),r={};n.forEach((function(e,t){r[t]=e})),function(e){return fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}(r).then((function(e){if(200!==e.status)throw new Error("status is not 200");i.innerHTML="Спасибо! Мы скоро с вами свяжемся!";var n,r=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){s=!0,i=e},f:function(){try{c||null==n.return||n.return()}finally{if(s)throw i}}}}(t.elements);try{for(r.s();!(n=r.n()).done;){var o=n.value;"button"!==o.tagName.toLowerCase()&&"button"!==o.type&&(o.value="")}}catch(e){r.e(e)}finally{r.f()}})).catch((function(e){i.innerHTML="Что-то пошло не так...",console.error(e)}))}}))})();