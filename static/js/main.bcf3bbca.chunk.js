(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{27:function(e,t,n){e.exports=n(42)},41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(12),i=n.n(o),l=n(13),c=n(7),m=n(2),s=n(1),u=n(8),d=n(26);function f(){var e=Object(m.a)(["\n  font-size: ",";\n  font-weight: ",";\n  text-align: ",";\n  white-space: pre-line;\n  color: ",";\n\n  @media "," {\n    white-space: initial;\n  }\n"]);return f=function(){return e},e}var h=s.b.div(f(),function(e){return e.size},function(e){return e.bold?"bold":"inherit"},function(e){return e.center?"center":"inherit"},function(e){return e.color?e.theme[e.color]:e.theme.dark},function(e){return e.theme.tabletBreak}),p=function(e){var t=e.children,n=e.bold,r=e.size,o=e.color,i=e.className,l=e.center,c=Object(d.a)(e,["children","bold","size","color","className","center"]);return a.a.createElement(h,Object.assign({bold:n,size:function(){switch(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"medium"){case"S":return"0.8rem";case"XS":return"0.6rem";case"L":return"1.5rem";case"XL":return"2rem";default:return"1rem"}}(r),color:o,className:i,center:l},c),t)};function g(){var e=Object(m.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n"]);return g=function(){return e},e}function b(){var e=Object(m.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n\n  margin-left: 20px;\n  :first-child {\n    margin-left: 0;\n  }\n\n  .indicator {\n    background-color: ",";\n    width: 7px;\n    height: 22px;\n    border-radius: 5px;\n  }\n\n  .text {\n    display: flex;\n    flex-direction: column;\n    padding-left: 5px;\n  }\n"]);return b=function(){return e},e}var E=s.b.div(b(),function(e){return e.healthy?e.theme.success:e.theme.warning}),x=function(e){var t=e.name,n=e.healthy;return a.a.createElement(E,{healthy:n},a.a.createElement("div",{className:"indicator"}),a.a.createElement("div",{className:"text"},a.a.createElement(p,{color:"text",size:"S"},t),a.a.createElement(p,{color:"mediumGray",size:"XS"},n?"Healthy":"Unhealthy")))},v=s.b.div(g()),k=function(){return a.a.createElement(v,null,a.a.createElement(p,{color:"text"},"Ari Status"),a.a.createElement(x,{name:"Childchain",healthy:!0}),a.a.createElement(x,{name:"Watcher",healthy:!1}))};function w(){var e=Object(m.a)(["\n  transform-origin: bottom left;\n  transform: ",";\n"]);return w=function(){return e},e}function y(){var e=Object(m.a)(["\n  opacity: ",";\n"]);return y=function(){return e},e}function O(){var e=Object(m.a)(["\n  transform-origin: top left;\n  transform: ",";\n"]);return O=function(){return e},e}function N(){var e=Object(m.a)(["\n  height: 3px;\n  width: 30px;\n  background-color: ",";\n  margin-bottom: 5px;\n  transition: all 250ms ease-in-out;\n"]);return N=function(){return e},e}var j=s.b.div(N(),function(e){return e.theme.primary}),S=Object(s.b)(j)(O(),function(e){return e.isOpen?"rotate(45deg) translateY(-3px)":"initial"}),z=Object(s.b)(j)(y(),function(e){return e.isOpen?0:1}),P=Object(s.b)(j)(w(),function(e){return e.isOpen?"rotate(-45deg) translateY(4px)":"initial"}),_=function(e){var t=e.hamburgerClick,n=e.isOpen;return a.a.createElement("div",{onClick:t},a.a.createElement(S,{isOpen:n}),a.a.createElement(z,{isOpen:n}),a.a.createElement(P,{isOpen:n}))};function A(){var e=Object(m.a)(["\n  display: flex;\n  text-decoration: none;\n  color: ",";\n  transition: color 200ms ease-in-out;\n\n  :hover {\n    color: ",";\n  }\n"]);return A=function(){return e},e}var T=s.b.a(A(),function(e){return e.theme[e.color]||e.theme.text},function(e){return e.theme.primary}),L=function(e){var t=e.href,n=e.to,r=e.children,o=e.color;return n?a.a.createElement(l.b,{to:n},r):a.a.createElement(T,{href:t,target:"_blank",color:o},r)};function I(){var e=Object(m.a)(["\n  position: absolute;\n  left: -1.5rem;\n  right: -1.5rem;\n  top: -1.5rem;\n  transform: translateY(84px);\n  overflow: hidden;\n  background-color: ",";\n  transition: height 300ms ease-in-out;\n  height: ",";\n  border-bottom: ",";\n\n  .dropdown-link {\n    padding: 1rem 1.5rem;\n  }\n"]);return I=function(){return e},e}var G=s.b.div(I(),function(e){return e.theme.background},function(e){return e.isOpen?"100vh":0},function(e){return e.isOpen?"2px solid ".concat(e.theme.secondary):"none"}),B=function(e){var t=e.isOpen,n=e.hamburgerClick,o=e.menuItems;Object(r.useEffect)(function(){return document.addEventListener("click",i),function(){document.removeEventListener("click",i)}},[t]);var i=function(e){t&&n()};return a.a.createElement(G,{isOpen:t},o.map(function(e,t){return a.a.createElement("div",{key:t,className:"dropdown-link"},a.a.createElement(L,{href:e.href},e.title))}))};function C(){var e=Object(m.a)(["\n  display: flex;\n  justify-content: center;\n  padding: 1.3rem 1.5rem;\n  box-shadow: ",";\n  position: fixed;\n  top: 0;\n  width: 100%;\n  box-sizing: border-box;\n  z-index: 1;\n  background-color: ",";\n\n  .header-content {\n    position: relative;\n    max-width: ",";\n    flex: 1 1 auto;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n\n    @media "," {\n      justify-content: space-between;\n    }\n\n    .header-status {\n      position: absolute;\n      right: 0;\n    }\n\n    .header-desktop {\n      display: flex;\n      flex-direction: row;\n\n      @media "," {\n        display: none;\n      }\n\n      .header-link {\n        display: flex;\n        align-items: center;\n        padding-left: 2rem;\n      }\n    }\n\n    .header-mobile {\n      @media "," {\n        display: none;\n      }\n      display: flex;\n      align-items: center;\n    }\n  }\n\n  .header-logo {\n    top: 6px;\n    transform: translateY(8px);\n  }\n"]);return C=function(){return e},e}var F=s.b.div(C(),function(e){return e.theme.boxShadow},function(e){return e.theme.background},function(e){return e.theme.pageWidth},function(e){return e.theme.mobileBreak},function(e){return e.theme.mobileBreak},function(e){return e.theme.isNotMobile}),D=[{title:"Block Explorer",href:"http://quest.samrong.omg.network"},{title:"API Specification",href:"https://omisego.github.io/elixir-omg/"},{title:"Connection Details",href:"https://github.com/omisego/dev-portal/blob/master/guides/network_endpoints.md"}],M=function(e){var t=e.showStatus,n=Object(r.useState)(!1),o=Object(u.a)(n,2),i=o[0],l=o[1],c=function(){l(!i)};return a.a.createElement(F,null,a.a.createElement("div",{className:"header-content"},a.a.createElement("div",{className:"header-logo"},a.a.createElement(L,{to:"/"},a.a.createElement("img",{src:"/img/omisego-blue.svg",alt:"omisego-blue"}))),a.a.createElement("div",{className:"header-desktop"},D.map(function(e,t){return a.a.createElement("div",{key:t,className:"header-link"},a.a.createElement(L,{href:e.href},e.title))})),a.a.createElement("div",{className:"header-mobile"},a.a.createElement(_,{isOpen:i,hamburgerClick:c}),a.a.createElement(B,{isOpen:i,hamburgerClick:c,menuItems:D})),t&&a.a.createElement("div",{className:"header-status"},a.a.createElement(k,null))))};function W(){var e=Object(m.a)(["\n  display: flex;\n  justify-content: center;\n  padding: 4rem 1.5rem;\n\n  background-color: ",";\n  color: ",";\n\n  .footer-content {\n    max-width: ",";\n    flex: 1 1 auto;\n    display: flex;\n    flex-direction: row;\n\n    @media "," {\n      flex-direction: column;\n    }\n\n    .footer-column {\n      flex: 1 1 0;\n      padding-right: 0.5rem;\n\n      @media "," {\n        padding: 0 0 2rem 0;\n      }\n\n      :last-child {\n        padding-right: 0;\n      }\n\n      .footer-item {\n        display: flex;\n        padding-bottom: 1rem;\n\n        :last-child {\n          padding-bottom: 0;\n        }\n\n        .social {\n          width: 30px;\n          height: 30px;\n          margin-right: 0.7rem;\n          color: ",";\n        }\n      }\n    }\n  }\n"]);return W=function(){return e},e}var R=s.b.div(W(),function(e){return e.theme.dark},function(e){return e.theme.background},function(e){return e.theme.contentWidth},function(e){return e.theme.mobileBreak},function(e){return e.theme.mobileBreak},function(e){return e.theme.footerText}),X=function(){return a.a.createElement(R,null,a.a.createElement("div",{className:"footer-content"},a.a.createElement("div",{className:"footer-column"},a.a.createElement("span",{className:"footer-item"},a.a.createElement(p,{color:"background",bold:!0,size:"S"},"Getting Started")),a.a.createElement("span",{className:"footer-item"},a.a.createElement(L,{href:"https://github.com/omisego/dev-portal/blob/master/guides/morevp_eli5.md"},a.a.createElement(p,{color:"footerText",size:"S"},"Learn MoreVP\nArchitecture"))),a.a.createElement("span",{className:"footer-item"},a.a.createElement(L,{href:"https://github.com/omisego/dev-portal/blob/master/guides/plasma_interface_from_browser.md"},a.a.createElement(p,{color:"footerText",size:"S"},"Get to know\nthe Plasma Interface"))),a.a.createElement("span",{className:"footer-item"},a.a.createElement(L,{href:"https://github.com/omisego/dev-portal/blob/master/guides/plasma_utxo_from_terminal.md"},a.a.createElement(p,{color:"footerText",size:"S"},"Making sense of UTXOs")))),a.a.createElement("div",{className:"footer-column"},a.a.createElement("span",{className:"footer-item"},a.a.createElement(p,{color:"background",bold:!0,size:"S"},"APIs")),a.a.createElement("span",{className:"footer-item"},a.a.createElement(L,{href:"https://developer.omisego.co/elixir-omg/docs-ui/?url=0.2/informational_api_specs.yaml"},a.a.createElement(p,{color:"footerText",size:"S"},"Watcher\nInformational API"))),a.a.createElement("span",{className:"footer-item"},a.a.createElement(L,{href:"https://developer.omisego.co/elixir-omg/docs-ui/?url=0.2/security_critical_api_specs.yaml"},a.a.createElement(p,{color:"footerText",size:"S"},"Watcher\nSecurity Critical API"))),a.a.createElement("span",{className:"footer-item"},a.a.createElement(L,{href:"https://developer.omisego.co/elixir-omg/docs-ui/?url=0.2/operator_api_specs.yaml"},a.a.createElement(p,{color:"footerText",size:"S"},"Childchain API")))),a.a.createElement("div",{className:"footer-column"},a.a.createElement("span",{className:"footer-item"},a.a.createElement(p,{color:"background",bold:!0,size:"S"},"Documentation")),a.a.createElement("span",{className:"footer-item"},a.a.createElement(L,{href:"https://github.com/omisego/elixir-omg/blob/master/README.md"},a.a.createElement(p,{color:"footerText",size:"S"},"OmiseGO Network"))),a.a.createElement("span",{className:"footer-item"},a.a.createElement(L,{href:"https://github.com/omisego/omg-js/blob/master/README.md"},a.a.createElement(p,{color:"footerText",size:"S"},"omg-js"))),a.a.createElement("span",{className:"footer-item"},a.a.createElement(L,{href:"https://github.com/omisego/plasma-cli/blob/master/README.md"},a.a.createElement(p,{color:"footerText",size:"S"},"Plasma CLI")))),a.a.createElement("div",{className:"footer-column"},a.a.createElement("span",{className:"footer-item"},a.a.createElement(p,{color:"background",bold:!0,size:"S"},"Links")),a.a.createElement("span",{className:"footer-item"},a.a.createElement(L,{href:"http://quest.samrong.omg.network"},a.a.createElement(p,{color:"footerText",size:"S"},"Block Explorer"))),a.a.createElement("span",{className:"footer-item"},a.a.createElement(L,{href:"https://omisego.network/"},a.a.createElement(p,{color:"footerText",size:"S"},"OmiseGO"))),a.a.createElement("span",{className:"footer-item"},a.a.createElement(L,{href:"https://github.com/omisego"},a.a.createElement(p,{color:"footerText",size:"S"},"GitHub")))),a.a.createElement("div",{className:"footer-column",style:{position:"relative"}},a.a.createElement("span",{className:"footer-item"},a.a.createElement(p,{color:"background",bold:!0,size:"S"},"Follow us")),a.a.createElement("span",{className:"footer-item"},a.a.createElement(L,{href:"https://reddit.com/r/omise_go/"},a.a.createElement("img",{src:"/img/reddit.svg",alt:"reddit",className:"social"})),a.a.createElement(L,{href:"https://twitter.com/omise_go"},a.a.createElement("img",{src:"/img/twitter.svg",alt:"twitter",className:"social"})),a.a.createElement(L,{href:"https://github.com/omisego"},a.a.createElement("img",{src:"/img/github.svg",alt:"github",className:"social"}))),a.a.createElement("span",{className:"footer-item",style:{position:"absolute",bottom:0}},a.a.createElement(p,{color:"footerText",size:"XS"},"\xa9 2019 OmiseGO.\nAll rights reserved")))))};function Y(){var e=Object(m.a)(["\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n\n  .page-child {\n    z-index: 0;\n    flex: 1 1 auto;\n    margin-top: 85px;\n  }\n"]);return Y=function(){return e},e}var U=s.b.div(Y()),J=function(e){var t=e.children;return a.a.createElement(U,null,a.a.createElement(M,{showStatus:!1}),a.a.createElement("div",{className:"page-child"},t),a.a.createElement(X,null))};function q(){var e=Object(m.a)(["\n  background-color: ",";\n  width: 35px;\n  height: 5px;\n  border-radius: 5px;\n  cursor: pointer;\n  margin-right: 10px;\n  transition: all 300ms ease-in-out;\n  :last-child {\n    margin-right: 0px;\n  }\n"]);return q=function(){return e},e}function V(){var e=Object(m.a)(["\n  position: absolute;\n  bottom: 25px;\n  left: 50%;\n  transform: translateX(-50%);\n  display: flex;\n  flex-direction: row;\n  z-index: 2;\n"]);return V=function(){return e},e}function H(){var e=Object(m.a)(["\n  position: relative;\n  width: 100%;\n  /* height: 450px; */\n  box-sizing: border-box;\n  display: flex;\n  flex: 1 0 100%;\n  justify-content: center;\n  padding: 6rem 1.5rem;\n  background-size: cover;\n  background-image: ",";\n\n  @media (max-width: 1000px) {\n    padding: 6rem 1.5rem;\n    .right {\n      display: none;\n    }\n  }\n\n  @media "," {\n    padding: 4rem 1.5rem;\n  }\n\n  .carousel-content {\n    display: flex;\n    flex-direction: row;\n    width: ",";\n    max-width: ",";\n    .left {\n      width: 50%;\n      @media "," {\n        width: 100%;\n      }\n    }\n    .right {\n      position: absolute;\n      right: 0;\n      top: 0;\n      bottom: 0;\n      width: 50%;\n    }\n  }\n\n  .carousel-content .carousel-text {\n    padding-bottom: 1.5rem;\n  }\n"]);return H=function(){return e},e}function K(){var e=Object(m.a)(["\n  display: flex;\n  width: 100%;\n  overflow: hidden;\n"]);return K=function(){return e},e}function Q(){var e=Object(m.a)(["\n  position: relative;\n"]);return Q=function(){return e},e}var Z=s.b.div(Q()),$=s.b.div(K()),ee=s.b.div(H(),function(e){return e.backgroundPath?"url(".concat(e.backgroundPath,")"):"linear-gradient(#FCFCFD, #F0F2F5)"},function(e){return e.theme.mobileBreak},function(e){return e.theme.pageWidth},function(e){return e.theme.pageWidth},function(e){return e.theme.tabletBreak}),te=s.b.div(V()),ne=s.b.div(q(),function(e){return e.active?e.theme.primary:e.theme.mediumGray}),re=function(e){var t=e.content,n=Object(r.useRef)(),o=Object(r.useState)(0),i=Object(u.a)(o,2),l=i[0],c=i[1],m=Object(r.useState)(),s=Object(u.a)(m,2),d=s[0],f=s[1];Object(r.useEffect)(function(){f(n.current.clientWidth),window.addEventListener("resize",h);var e=setInterval(p,1e4);return function(){window.removeEventListener("resize",h),clearInterval(e)}});var h=function(){f(n.current.clientWidth),p(l)},p=function(e){if("undefined"===typeof e){var r=l+1;e=r<t.length?r:0}!function(e,t,n){var r=e.current.scrollLeft,a=0;!function o(){var i=function(e,t,n,r){return(e/=r/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t}(a+=20,r,t,n);e.current.scrollLeft=i,a<n&&setTimeout(o,20)}()}(n,d*(e-l),400),c(e)};return a.a.createElement(Z,null,a.a.createElement($,{ref:n},t.length>1&&a.a.createElement(te,null,t.map(function(e,t){return a.a.createElement(ne,{key:t,active:t===l,onClick:function(){return p(t)}})})),t.map(function(e,t){return a.a.createElement(ee,{key:t,backgroundPath:e.backgroundPath,darkTheme:!!e.darkTheme},a.a.createElement("div",{className:"carousel-content"},a.a.createElement("div",{className:"left"},e.left),a.a.createElement("div",{className:"right"},e.right)))})))};function ae(){var e=Object(m.a)(["\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n  align-items: center;\n  text-align: center;\n  padding: 1.5rem;\n  border: 2px solid ",";\n  border-radius: ",";\n  background-color: white;\n  cursor: pointer;\n  transition: all 300ms ease-in-out;\n\n  :hover {\n    box-shadow: ",";\n  }\n\n  :active {\n    transform: translateY(1px);\n    box-shadow: none;\n  }\n"]);return ae=function(){return e},e}var oe=s.b.div(ae(),function(e){return e.theme.secondary},function(e){return e.theme.borderRadius},function(e){return e.theme.boxShadow}),ie=function(e){var t=e.children;return a.a.createElement(oe,null,t)};function le(){var e=Object(m.a)(["\n  padding: 0.3rem 0.7rem;\n  background-color: ",";\n  border-radius: ",";\n  transition: all 200ms ease-in-out;\n  display: inline-flex;\n\n  a {\n    color: ",";\n  }\n\n  :hover {\n    cursor: pointer;\n    box-shadow: ",";\n    a {\n      color: ",";\n    }\n  }\n\n  :active {\n    box-shadow: none;\n    transform: translateY(1px);\n  }\n"]);return le=function(){return e},e}var ce=s.b.div(le(),function(e){return e.theme.primary},function(e){return e.theme.borderRadius},function(e){return e.theme.background},function(e){return e.theme.boxShadow},function(e){return e.theme.background}),me=function(e){var t=e.href,n=e.to,r=e.children;return a.a.createElement(ce,null,a.a.createElement(L,{href:t,to:n},r))};function se(){var e=Object(m.a)(["\n  height: 3px;\n  margin-left: auto;\n  margin-right: auto;\n  background: ",";\n"]);return se=function(){return e},e}var ue=s.b.div(se(),function(e){return"linear-gradient(90deg,\n      ".concat(e.theme.background,",\n      ").concat(e.theme.gray," 50%,\n      ").concat(e.theme.background,")")}),de=function(){return a.a.createElement(ue,null)};function fe(){var e=Object(m.a)(["\n  display: flex;\n  flex-direction: row;\n  margin-bottom: 2rem;\n  min-height: 8rem;\n\n  @media "," {\n    min-height: initial;\n  }\n\n  .image {\n    height: 60px;\n    margin-right: 1rem;\n    display: inline-block;\n  }\n\n  .content {\n    flex: 1 1 auto;\n    display: flex;\n    flex-direction: column;\n\n    span {\n      padding-bottom: 0.5rem;\n    }\n\n    .action {\n      color: ","\n    }\n  }\n"]);return fe=function(){return e},e}var he=s.b.div(fe(),function(e){return e.theme.mobileBreak},function(e){return e.theme.primary}),pe=function(e){var t=e.image,n=e.title,r=e.subTitle,o=e.action;return a.a.createElement(L,{href:o.href},a.a.createElement(he,null,a.a.createElement("img",{className:"image",src:t,alt:"bookmark"}),a.a.createElement("div",{className:"content"},a.a.createElement("span",null,a.a.createElement(p,{bold:!0},n)),a.a.createElement("span",null,a.a.createElement(p,{color:"text"},r)),a.a.createElement("span",{className:"action"},o.text))))},ge=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(p,{className:"carousel-text",size:"L"},"OmiseGO Developer Portal"),a.a.createElement(p,{className:"carousel-text",size:"XL",bold:!0},"Join the OmiseGO\nDevelopers Program"),a.a.createElement(p,{className:"carousel-text",color:"text"},"Be the first to know about all the development updates and get\nthe chance to try out the latest features, tools, and libraries, plus\nthe chance to talk to OmiseGO Product and Engineering team."),a.a.createElement(me,{href:"https://omisego-odp.typeform.com/to/T8dDjF"},"Sign Up Now"))};function be(){var e=Object(m.a)(["\n  height: 75%;\n  margin-top: 30px;\n  margin-left: 80px;\n"]);return be=function(){return e},e}var Ee=s.b.img(be()),xe=function(){return a.a.createElement(Ee,{src:"/img/00-hero.png",alt:"hero"})};function ve(){var e=Object(m.a)(["\n  padding-top: 40px;\n"]);return ve=function(){return e},e}var ke=s.b.div(ve()),we=function(){return a.a.createElement(ke,null,a.a.createElement(p,{className:"carousel-text",size:"XL",color:"white",bold:!0},"Next Station Samrong:\nOmiseGO Network v0.2"),a.a.createElement(p,{className:"carousel-text",color:"white"},"Ready to upgrade from Ari to Samrong?"),a.a.createElement(me,{href:"https://github.com/omisego/plasma-upgrade-scripts/blob/master/Readme.md"},"Upgrade Now"))};function ye(){var e=Object(m.a)(["\n  height: 80%;\n  float: right;\n  margin-top: 50px;\n  margin-left: 80px;\n"]);return ye=function(){return e},e}var Oe=s.b.img(ye()),Ne=function(){return a.a.createElement(Oe,{src:"/img/samrong-rail.png",alt:"hero"})};function je(){var e=Object(m.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding-top: 80px;\n\n  @media "," {\n    align-items: center;\n  }\n\n  span {\n    margin-left: auto;\n    margin-right: auto;\n    padding-bottom: 1.5rem;\n\n    :last-child {\n      padding-bottom: 0;\n    }\n  }\n"]);return je=function(){return e},e}function Se(){var e=Object(m.a)(["\n  padding: 80px 0;\n  display: flex;\n  flex-direction: row;\n\n  @media "," {\n    flex-direction: column;\n  }\n\n  .bookmark-column {\n    flex: 1 1 50%;\n    :last-child {\n      margin-left: 6rem;\n\n      @media "," {\n        margin-left: 0;\n      }\n    }\n\n    .bookmark-intro {\n      height: 90px;\n    }\n  }\n"]);return Se=function(){return e},e}function ze(){var e=Object(m.a)(["\n  padding-bottom: 1rem;\n"]);return ze=function(){return e},e}function Pe(){var e=Object(m.a)(["\n  width: 80px;\n  height: 80px;\n"]);return Pe=function(){return e},e}function _e(){var e=Object(m.a)(["\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  width: 25px;\n  height: 25px;\n  color: ",";\n  border-radius: 100%;\n  background-color: ",";\n  margin-bottom: 1.5rem;\n\n  span {\n    transform: translateY(-1px);\n  }\n"]);return _e=function(){return e},e}function Ae(){var e=Object(m.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px 0 80px 0;\n  position: relative;\n  background: radial-gradient(100% 400px ellipse at 50% 100%, #F7F8FA, #FFFFFF);\n\n  .cards {\n    max-width: ",";\n    display: flex;\n    flex-direction: row;\n    padding-top: 2rem;\n\n    a {\n      flex: 1 1 100%;\n      :first-child {\n        margin-right: 10px;\n      }\n      :last-child {\n        margin-left: 10px;\n      }\n    }\n\n    @media "," {\n      flex-direction: column;\n\n      a {\n        :first-child {\n          margin: 0 0 1rem 0;\n        }\n        :last-child {\n          margin: 1rem 0 0 0;\n        }\n      }\n    }\n  }\n"]);return Ae=function(){return e},e}function Te(){var e=Object(m.a)(["\n  max-width: ",";\n  padding: 0 1.5rem;\n  margin: 0 auto;\n"]);return Te=function(){return e},e}var Le=[{left:a.a.createElement(ge,null),right:a.a.createElement(xe,null)},{darkTheme:!0,backgroundPath:"/img/samrong-background.png",left:a.a.createElement(we,null),right:a.a.createElement(Ne,null)}],Ie=s.b.div(Te(),function(e){return e.theme.contentWidth}),Ge=s.b.div(Ae(),function(e){return e.theme.contentWidth},function(e){return e.theme.mobileBreak}),Be=s.b.div(_e(),function(e){return e.theme.background},function(e){return e.theme.dark}),Ce=s.b.img(Pe()),Fe=s.b.div(ze()),De=s.b.div(Se(),function(e){return e.theme.mobileBreak},function(e){return e.theme.mobileBreak}),Me=s.b.div(je(),function(e){return e.theme.mobileBreak}),We=function(){return a.a.createElement(J,null,a.a.createElement(re,{content:Le}),a.a.createElement(Ie,null,a.a.createElement(Me,null,a.a.createElement("span",null,a.a.createElement(p,{center:!0,bold:!0,size:"XL"},"Build Scalable Decentralized Payment Apps")),a.a.createElement("span",null,a.a.createElement(p,{center:!0,color:"text"},"Leverage Plasma architecture to build a L2 Application with\nhigh throughputs and strong safety gaurantees")),a.a.createElement("span",null,a.a.createElement(me,{href:"https://github.com/omisego/dev-portal/tree/master/guides/get_started.md"},"Get Started Now")))),a.a.createElement(Ge,null,a.a.createElement("div",{className:"cards"},a.a.createElement(L,{href:"https://github.com/omisego/dev-portal/blob/master/guides/morevp_eli5.md"},a.a.createElement(ie,null,a.a.createElement(Ce,{src:"/img/01-plasmaarchitecture.png",alt:"morevp"}),a.a.createElement(Be,null,a.a.createElement("span",null,"1")),a.a.createElement(Fe,null,a.a.createElement(p,{bold:!0},"Learn MoreVP Architecture")),a.a.createElement(p,{color:"text"},"Understand MoreVP Plasma architecture and how it works under the hood"))),a.a.createElement(L,{href:"https://github.com/omisego/dev-portal/blob/master/guides/plasma_interface_from_browser.md"},a.a.createElement(ie,null,a.a.createElement(Ce,{src:"/img/02-plasmainterface.png",alt:"plasma"}),a.a.createElement(Be,null,a.a.createElement("span",null,"2")),a.a.createElement(Fe,null,a.a.createElement(p,{bold:!0},"Get to know\nthe Plasma Interface")),a.a.createElement(p,{color:"text"},"Making interactions with the OmiseGO Network APIs from the browser"))),a.a.createElement(L,{href:"https://github.com/omisego/dev-portal/blob/master/guides/plasma_utxo_from_terminal.md"},a.a.createElement(ie,null,a.a.createElement(Ce,{src:"/img/03-utxo.png",alt:"utxo"}),a.a.createElement(Be,null,a.a.createElement("span",null,"3")),a.a.createElement(Fe,null,a.a.createElement(p,{bold:!0},"Making sense of UTXOs")),a.a.createElement(p,{color:"text"},"Start making more complex Plasma transactions from your terminal"))))),a.a.createElement(Ie,null,a.a.createElement(de,null)),a.a.createElement(Ie,null,a.a.createElement(De,null,a.a.createElement("div",{className:"bookmark-column"},a.a.createElement("div",{className:"bookmark-intro"},a.a.createElement(p,{bold:!0,size:"L",style:{paddingBottom:"5px"}},"APIs"),a.a.createElement(p,{color:"text"},"Explore and interact with OmiseGO Network APIs")),a.a.createElement(pe,{image:"/img/04-watchersinfoAPI.png",title:"Watcher Informational API",subTitle:"API for common interactions:\n balance query, making transactions",action:{href:"https://developer.omisego.co/elixir-omg/docs-ui/?url=0.2/informational_api_specs.yaml",text:"Learn more"}}),a.a.createElement(pe,{image:"/img/05-watcherssecurityAPI.png",title:"Watcher Security Critical API",subTitle:"Plasma exit operations API",action:{href:"https://developer.omisego.co/elixir-omg/docs-ui/?url=0.2/security_critical_api_specs.yaml",text:"Learn more"}}),a.a.createElement(pe,{image:"/img/06-childchain.png",title:"Childchain API",subTitle:"Get block data to implement your own watcher",action:{href:"https://developer.omisego.co/elixir-omg/docs-ui/?url=0.2/operator_api_specs.yaml",text:"Learn more"}})),a.a.createElement("div",{className:"bookmark-column"},a.a.createElement("div",{className:"bookmark-intro"},a.a.createElement(p,{bold:!0,size:"L",style:{paddingBottom:"5px"}},"Documentation"),a.a.createElement(p,{color:"text"},"Read the docs for developer resources")),a.a.createElement(pe,{image:"/img/07-omgnetwork.png",title:"OmiseGO Network",subTitle:"Documentation for OMG\nnetwork",action:{href:"https://github.com/omisego/elixir-omg/blob/master/README.md",text:"Learn more"}}),a.a.createElement(pe,{image:"/img/08-omg-js.png",title:"OMG-JS",subTitle:"Documentation for JavaScript\nClient Library",action:{href:"https://github.com/omisego/omg-js/blob/master/README.md",text:"Learn more"}}),a.a.createElement(pe,{image:"/img/09-plasma-cli.png",title:"Plasma CLI",subTitle:"Documentation for Golang\nCommand-line Interface",action:{href:"https://github.com/omisego/plasma-cli/blob/master/README.md",text:"Learn more"}})))))},Re=function(){return a.a.createElement(l.a,{basename:""},a.a.createElement(c.d,null,a.a.createElement(c.b,{exact:!0,path:"/",component:We}),a.a.createElement(c.a,{to:"/"})))},Xe=n(14),Ye={mode:"light",primary:"#1a57f0",secondary:"#f7f8fa",gray:"#edeef2",mediumGray:"#d0d6e4",darkGray:"#5a626f",background:"#ffffff",text:"#61646d",footerText:"#858B9A",dark:"#03060b",success:"#0fbf99",warning:"#fb7166",white:"white",pageWidth:"1000px",contentWidth:"800px",boxShadow:"0px 2px 10px 0px rgba(0,0,0,0.15)",borderRadius:"5px",mobileBreak:"(max-width: 650px)",tabletBreak:"(max-width: 1000px)",isNotMobile:"(min-width: 651px)"},Ue=Object(Xe.a)({},Ye,{mode:"dark"}),Je={light:Object(Xe.a)({},Ye),dark:Object(Xe.a)({},Ue)},qe=a.a.createContext(),Ve=function(e){var t=e.children,n=Object(r.useState)(Je.light),o=Object(u.a)(n,2),i=o[0],l=o[1];return a.a.createElement(qe.Provider,{value:{theme:i,toggleTheme:function(){l(i===Je.light?Je.dark:Je.light)}}},t)},He=function(e){var t=e.children;return a.a.createElement(Ve,null,a.a.createElement(qe.Consumer,null,function(e){var n=e.theme;return a.a.createElement(s.a,{theme:n},a.a.createElement(a.a.Fragment,null,t))}))};n(41);i.a.render(a.a.createElement(function(){return a.a.createElement(He,null,a.a.createElement(Re,null))},null),document.getElementById("root"))}},[[27,1,2]]]);
//# sourceMappingURL=main.bcf3bbca.chunk.js.map