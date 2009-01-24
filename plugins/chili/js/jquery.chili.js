var ChiliBook;(function(a){ChiliBook={version:"2.2",automatic:true,automaticSelector:"code",lineNumbers:!true,codeLanguage:function(b){var c=a(b).attr("class");return c?c:""},recipeLoading:true,recipeFolder:"",replaceSpace:"&#160;",replaceTab:"&#160;&#160;&#160;&#160;",replaceNewLine:"&#160;<br/>",selectionStyle:["position:absolute; z-index:3000; overflow:scroll;","width:16em;","height:9em;","border:1px solid gray;","padding:15px;","background-color:yellow;"].join(" "),defaultReplacement:'<span class="$0">$$</span>',recipes:{},queue:{},unique:function(){return(new Date()).valueOf()}};a.fn.chili=function(n){var f=a.extend({},ChiliBook,n||{});function b(p,r,D){function w(J,I){var H=[];for(var K in J[I]){H.push(C(J,I,K))}return H}function C(K,H,L){var I=K[H][L];var J=(typeof I._match=="string")?I._match:I._match.source;return{recipe:K,blockName:H,stepName:L,exp:"("+J+")",length:1+(J.replace(/\\./g,"%").replace(/\[.*?\]/g,"%").match(/\((?!\?)/g)||[]).length,replacement:I._replace?I._replace:f.defaultReplacement}}function G(H){var K=1;var M=[];for(var J=0;J<H.length;J++){var N=H[J].exp;N=N.replace(/\\\\|\\(\d+)/g,function(P,Q){return !Q?P:"\\"+(K+1+parseInt(Q,10))});M.push(N);K+=H[J].length}var I="((?:\\s|\\S)*?)";var O="((?:\\s|\\S)+)";var L="(?:"+M.join("|")+")";L=I+L+"|"+O;return new RegExp(L,r._case?"g":"gi")}function B(H){return H.replace(/&/g,"&amp;").replace(/</g,"&lt;")}function s(H){return H.replace(/ +/g,function(I){return I.replace(/ /g,v)})}function y(H){H=B(H);if(v){H=s(H)}return H}function q(H,I){return b(H,I)}function A(I,J,H){return b(I,J,H)}function u(K,N,J,O){var I=f.replaceSpace;var L=C(N,J,O);var H=[L];var M=K.replace(G(H),function(){return z.apply({steps:H},arguments)});return M}function o(P,J,I){if(!J){return y(P)}var H=J.split("/");var O="";var Q="";var S="";switch(H.length){case 1:O=H[0];break;case 2:O=H[0];Q=H[1];break;case 3:O=H[0];Q=H[1];S=H[2];break;default:return y(P)}function L(W){var U=m(W);var V=f.recipes[U];if(!V){throw {msg:"recipe not available"}}return V}try{var R;if(""==S){if(""==Q){if(""==O){}else{R=L(O);return q(P,R)}}else{if(""==O){R=I.recipe}else{R=L(O)}if(!(Q in R)){return y(P)}return A(P,R,Q)}}else{if(""==O){R=I.recipe}else{R=L(O)}if(""==Q){Q=I.blockName}if(!(Q in R)){return y(P)}if(!(S in R[Q])){return y(P)}return u(P,R,Q,S)}}catch(N){if(N.msg&&N.msg=="recipe not available"){var M="chili_"+f.unique();if(f.recipeLoading){var T=m(O);if(!f.queue[T]){try{f.queue[T]=[{cue:M,subject:P,module:J,context:I}];a.getJSON(T,function(U){f.recipes[T]=U;var X=f.queue[T];for(var V=0,Y=X.length;V<Y;V++){var W=o(X[V].subject,X[V].module,X[V].context);if(f.replaceTab){W=W.replace(/\t/g,f.replaceTab)}if(f.replaceNewLine){W=W.replace(/\n/g,f.replaceNewLine)}a("#"+X[V].cue).replaceWith(W)}})}catch(K){alert("the recipe for '"+O+"' was not found in '"+T+"'")}}else{f.queue[T].push({cue:M,subject:P,module:J,context:I})}return'<span id="'+M+'">'+y(P)+"</span>"}return y(P)}else{return y(P)}}}function x(J,I){var H=I.replace(/(<span\s+class\s*=\s*(["']))((?:(?!__)\w)+\2\s*>)/ig,"$1"+J+"__$3");return H}function z(){if(!arguments[0]){return""}var P=this.steps;var N=0;var M=2;var R=arguments[1];var K=arguments[arguments.length-3];if(!K){var I;while(I=P[N++]){var H=arguments;if(H[M]){var J="";if(a.isFunction(I.replacement)){var O=[];for(var L=0,Q=I.length;L<Q;L++){O.push(H[M+L])}O.push(H[H.length-2]);O.push(H[H.length-1]);J=I.replacement.apply({x:function(){var U=arguments[0];var T=arguments[1];var S={recipe:I.recipe,blockName:I.blockName};return o(U,T,S)}},O)}else{J=I.replacement.replace(/(\\\$)|(?:\$\$)|(?:\$(\d+))/g,function(S,U,T){if(U){return"$"}else{if(!T){return y(H[M])}else{if(T=="0"){return I.stepName}else{return y(H[M+parseInt(T,10)])}}}})}J=x(I.recipe._name,J);return y(R)+J}else{M+=I.length}}}else{return y(K)}}if(!D){D="_main";g(r)}if(!(D in r)){return y(p)}var v=f.replaceSpace;var F=w(r,D);var t=G(F);var E=p.replace(t,function(){return z.apply({steps:F},arguments)});return E}function c(p){if(document.createElement){var q=document.createElement("style");q.type="text/css";if(q.styleSheet){q.styleSheet.cssText=p}else{var o=document.createTextNode(p);q.appendChild(o)}document.getElementsByTagName("head")[0].appendChild(q)}}function g(t){var p=t._name;if(!f.queue[p]){var s=["/* Chili -- "+p+" */"];for(var o in t){if(o.search(/^_(?!main\b)/)<0){for(var u in t[o]){var r=t[o][u];if("_style" in r){if(r._style.constructor==String){s.push("."+p+"__"+u+" { "+r._style+" }")}else{for(var q in r._style){s.push("."+p+"__"+q+" { "+r._style[q]+" }")}}}}}}s=s.join("\n");c(s);f.queue[p]=true}}function d(o){var r=f.codeLanguage(o);if(""!=r){var q=m(r);if(f.recipeLoading){if(!f.queue[q]){try{f.queue[q]=[o];a.getJSON(q,function(s){f.recipes[q]=s;var u=f.queue[q];for(var t=0,v=u.length;t<v;t++){j(u[t],q)}})}catch(p){alert("the recipe for '"+r+"' was not found in '"+q+"'")}}else{f.queue[q].push(o)}j(o,q)}else{j(o,q)}}}function j(p,u){var y=f.recipes[u];if(!y){return}var z=a(p);var t=z.text();if(!t){return}t=t.replace(/\r\n?/g,"\n");if(z.parent().is("pre")){if(!a.browser.safari){t=t.replace(/^\n/g,"")}}var q=b(t,y);if(f.replaceTab){q=q.replace(/\t/g,f.replaceTab)}if(f.replaceNewLine){q=q.replace(/\n/g,f.replaceNewLine)}p.innerHTML=q;if(a.browser.msie||a.browser.mozilla){e(p)}var s=z.parent();var r=s.attr("class");var v=/ln-(\d+)-([\w][\w\-]*)|ln-(\d+)|ln-/.exec(r);if(v){k(p);var o=0;if(v[1]){o=parseInt(v[1],10);var x=a(".ln-"+v[1]+"-"+v[2]);var w=x.index(s[0]);x.slice(0,w).each(function(){o+=a(this).find("li").length})}else{if(v[3]){o=parseInt(v[3],10)}else{o=1}}z.find("ol")[0].start=o;a("body").width(a("body").width()-1).width(a("body").width()+1)}else{if(f.lineNumbers){k(p)}}}function e(p){var o=null;a(p).parents().filter("pre").bind("mousedown",function(){o=this;if(a.browser.msie){document.selection.empty()}else{window.getSelection().removeAllRanges()}}).bind("mouseup",function(v){if(o&&(o==this)){o=null;var t="";if(a.browser.msie){t=document.selection.createRange().htmlText;if(""==t){return}t=l(t);var z='<textarea style="STYLE">'}else{t=window.getSelection().toString();if(""==t){return}t=t.replace(/\r/g,"").replace(/^# ?/g,"").replace(/\n# ?/g,"\n");var z='<pre style="STYLE">'}var y=a(z.replace(/\bSTYLE\b/,ChiliBook.selectionStyle)).appendTo("body").text(t).attr("id","chili_selection").click(function(){a(this).remove()});var x=v.pageY-Math.round(y.height()/2)+"px";var w=v.pageX-Math.round(y.width()/2)+"px";y.css({top:x,left:w});if(a.browser.msie){y[0].focus();y[0].select()}else{var q=window.getSelection();q.removeAllRanges();var u=document.createRange();u.selectNodeContents(y[0]);q.addRange(u)}}})}function m(o){return f.recipeFolder+o+".js"}function h(){var o="";if(a.browser.msie){o=document.selection.createRange().htmlText}else{o=window.getSelection().toString()}return o}function l(o){do{var q=ChiliBook.unique()}while(o.indexOf(q)>-1);var r="";if(/<br/i.test(o)||/<li/i.test(o)){if(/<br/i.test(o)){o=o.replace(/\<br[^>]*?\>/ig,q)}else{if(/<li/i.test(o)){o=o.replace(/<ol[^>]*?>|<\/ol>|<li[^>]*?>/ig,"").replace(/<\/li>/ig,q)}}var p=a("<pre>").appendTo("body").hide()[0];p.innerHTML=o;r=a(p).text().replace(new RegExp(q,"g"),"\r\n");a(p).remove()}return r}function k(t){function s(w,z,y,x){var A=x?"</span>":"";var v="";if(w){v="<li>"+x+z+A+"</li>"}else{if(y){v="<li>"+x+y+A+"</li>"}}return v}function r(w,y,x,z){var v="";if(z){v=z}else{v=s(w,y,x,"")}return v}var q=a(t).html();var p=/<br>/.test(q)?"<br>":"<BR>";var u="<li>"+f.replaceSpace+"</li>";var o=q.replace(/(<span [^>]+>)((?:(?:&nbsp;|\xA0)<br>)+)(.*?)(<\/span>)/ig,"$2$1$3$4").replace(/(.*?)(<span .*?>)(.*?)(?:<\/span>(?:&nbsp;|\xA0)<br>|<\/span>)/ig,function(y,B,x,A){if(/<br>/i.test(A)){var z=B.split(p);var w=z.pop();B=z.join(p);var v=(B?B+p:"")+(w+A).replace(/((.*?)(?:&nbsp;|\xA0)<br>)|(.*)/ig,function(E,C,G,F){var D=s(C,G,F,x);return D});return v}else{return y}}).replace(/(<li>.*?<\/li>)|((.*?)(?:&nbsp;|\xA0)<br>)|(.+)/ig,function(x,A,v,z,y){var w=r(v,z,y,A);return w}).replace(/<li><\/li>/ig,u);t.innerHTML="<ol>"+o+"</ol>"}function i(o){return a.map(o.split(""),function(q,p){return" "+q+" "+q.charCodeAt(0)+" "}).join(" ")}this.each(function(){var o=a(this);o.trigger("chili.before_coloring");d(this);o.trigger("chili.after_coloring")});return this};a(function(){if(ChiliBook.automatic){a(ChiliBook.automaticSelector).chili()}})})(jQuery);