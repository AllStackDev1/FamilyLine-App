(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[1],{192:function(e,t,r){},193:function(e,t,r){},194:function(e,t,r){"use strict";r.r(t);var n=r(217),a=r(0),s=r(39),o=r.n(s),i=r(83),u=r(91),c=r(219),l=r(96),d=r(212),p=r(211),f=Object(p.a)({sm:"40rem",md:"48em",lg:"62em",xl:"80em","2xl":"85.375em","3xl":"90em","4xl":"96em","5xl":"120em"}),m=Object(d.a)({styles:{global:function(){return{body:{fontSize:"md",fontFamily:'"Montserrat", sans-serif',lineHeight:"tall",bg:"#F2F2F7"}}}},breakpoints:f,fonts:{heading:'"Montserrat", sans-serif',body:'"Montserrat", sans-serif'},fontSizes:{xx:".55rem",tiny:".68rem","7xl":"5rem","8xl":"6rem"},colors:{brand:{bg:{50:"rgba(0, 0, 0, 0.3);",100:"#F8FFFB",200:"#FCFCFC"},green:{200:"#52E33C"}},brandGreen:{500:"#02993E",600:"#02993E"}},space:{14:"3.5rem",60:"15rem",66:"17.5rem",70:"18rem",80:"20rem",82:"21rem",85:"23rem",90:"25rem",95:"26rem",108:"27rem",109:"28rem",110:"30rem",115:"32rem",120:"35rem",122:"37rem",125:"45rem",127:"48rem",130:"55rem",135:"60rem",137:"65rem",140:"70rem",145:"76rem"},sizes:{14:"3.5rem",60:"15rem",66:"17.5rem",70:"18rem",80:"20rem",82:"21rem",85:"23rem",90:"25rem",95:"26rem",108:"27rem",109:"28rem",110:"30rem",115:"32rem",117:"33rem",120:"35rem",122:"37rem",124:"40rem",125:"45rem",127:"48rem",130:"55rem",135:"60rem",137:"65rem",140:"70rem",145:"76rem"},shadows:{1e3:"0 10px 20px 0 rgba(97, 111, 57, 0.5)",2e3:"10px 10px 20px 0 rgba(0, 0, 0, 0.1);"}}),b=r(9),h=(r(213),r(214),r(215)),j=r(221),g=r(216),v=r(7),x=function(e){var t=e.text;return Object(v.jsxs)(h.a,{flexDir:"column",h:"100vh",align:"center",justify:"center",children:[Object(v.jsx)(j.a,{size:"lg",speed:"0.65s",thickness:"5px",emptyColor:"gray.200",color:"brand.green.200"}),t&&Object(v.jsx)(g.a,{className:"loading-text loading-text-b",children:t})]})},O=(r(93),function(){return Object(v.jsx)(h.a,{w:"full",h:"100vh",children:Object(v.jsx)(g.a,{m:"auto",fontFamily:"cursive",fontSize:"3xl",children:"404 | Page Not Found"})})}),w={Login:Object(a.lazy)((function(){return Promise.all([r.e(0),r.e(4)]).then(r.bind(null,261))})),NotFound:O,Register:Object(a.lazy)((function(){return Promise.all([r.e(0),r.e(5)]).then(r.bind(null,262))}))};var y=function(){var e=Object(b.c)().pathname,t=Object(b.d)();return Object(a.useEffect)((function(){"/"===e&&t("/login")}),[]),Object(b.f)([{path:"/login",element:Object(v.jsx)(a.Suspense,{fallback:Object(v.jsx)(x,{text:"opening login..."}),children:Object(v.jsx)(w.Login,{})})},{path:"/register",element:Object(v.jsx)(a.Suspense,{fallback:Object(v.jsx)(x,{text:"opening register..."}),children:Object(v.jsx)(w.Register,{})})},{path:"/dashboard",element:Object(v.jsx)(a.Suspense,{fallback:Object(v.jsx)(x,{text:"opening dashboard..."}),children:Object(v.jsx)(w.Login,{})})},{path:"/logout",element:Object(v.jsx)(w.NotFound,{})},{path:"*",element:Object(v.jsx)(w.NotFound,{})}])},k=(r(192),r(193),new u.QueryClient),F=function(){return Object(v.jsx)(c.a,{theme:m,children:Object(v.jsx)(u.QueryClientProvider,{client:k,children:Object(v.jsx)(l.a,{children:Object(v.jsx)(i.a,{children:Object(v.jsx)(y,{})})})})})},S=function(e){e&&e instanceof Function&&r.e(6).then(r.bind(null,255)).then((function(t){var r=t.getCLS,n=t.getFID,a=t.getFCP,s=t.getLCP,o=t.getTTFB;r(e),n(e),a(e),s(e),o(e)}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(Object(v.jsxs)(a.StrictMode,{children:[Object(v.jsx)(n.a,{}),Object(v.jsx)(F,{})]}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)})),S()},96:function(e,t,r){"use strict";r.d(t,"a",(function(){return y}));var n=r(8),a=r(0),s=r(218),o=r(16),i=r.n(o),u=r(25),c=r(125),l=r.n(c),d=r(44),p=r(124),f=r.n(p),m=r(97),b=r.n(m),h=r(98),j=new function e(){var t=this;Object(d.a)(this,e),this.http=void 0,this.post=function(){var e=Object(u.a)(i.a.mark((function e(r){var n,a,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.url,a=r.body,e.next=3,t.http.post(n,a);case 3:return s=e.sent,e.abrupt("return",s.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.patch=function(){var e=Object(u.a)(i.a.mark((function e(r){var n,a,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.url,a=r.body,e.next=3,t.http.patch(n,a);case 3:return s=e.sent,e.abrupt("return",s.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.get=function(){var e=Object(u.a)(i.a.mark((function e(r){var n,a,s,o,u;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.url,a=r.query,s=void 0===a?{}:a,o="?"+b.a.stringify(s),e.next=4,t.http.get("".concat(n+o));case 4:return u=e.sent,e.abrupt("return",u.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.delete=function(){var e=Object(u.a)(i.a.mark((function e(r){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.url,e.next=3,t.http.delete(n);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.put=function(){var e=Object(u.a)(i.a.mark((function e(r){var n,a,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.url,a=r.body,e.next=3,t.http.put(n,a);case 3:return s=e.sent,e.abrupt("return",s.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.http=f.a.create({baseURL:h.a,headers:{"Content-Type":"application/json"}}),this.http.interceptors.request.use((function(e){var t=window.sessionStorage.getItem("_fl_ut_");return t&&e.headers&&(e.headers.Authorization="Bearer "+t),e}),(function(e){return Promise.reject(e)})),this.http.interceptors.response.use((function(e){return e}),(function(e){var t;return[401,403].includes(null===e||void 0===e||null===(t=e.response)||void 0===t?void 0:t.status),Promise.reject(e.response)}))},g=function(){var e=Object(u.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.post({url:"/register",body:JSON.stringify(t)});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=function(){var e=Object(u.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.post({url:"/login",body:JSON.stringify(t)});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=l()((function(e){return{user:null,token:JSON.parse(localStorage.getItem("mY-dC_f=T")||"null"),error:null,message:null,isLoading:!1,login:function(){var t=Object(u.a)(i.a.mark((function t(r){var n,a,s,o,u,c,l,d;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e((function(){return{isLoading:!0,error:null,message:null}})),t.next=4,v(r);case 4:n=t.sent,a=n.message,s=n.result,o=s.user,u=s.token,e((function(){return{isLoading:!1,user:o,token:u,message:a}})),t.next=18;break;case 12:t.prev=12,t.t0=t.catch(0),l="Unexpected network error.",500===t.t0.status&&(l=null===t.t0||void 0===t.t0?void 0:t.t0.message),400===t.t0.status&&(null===t.t0||void 0===t.t0||null===(c=t.t0.data)||void 0===c?void 0:c.errors)&&(l=Object.values(null===t.t0||void 0===t.t0||null===(d=t.t0.data)||void 0===d?void 0:d.errors).join(" <br /> ")),e((function(){return{isLoading:!1,error:l}}));case 18:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(e){return t.apply(this,arguments)}}(),register:function(){var t=Object(u.a)(i.a.mark((function t(r){var n,a,s,o,u;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e((function(){return{isLoading:!0,error:null,message:null}})),t.next=4,g(r);case 4:n=t.sent,a=n.message,e((function(){return{isLoading:!1,message:a}})),t.next=15;break;case 9:t.prev=9,t.t0=t.catch(0),o="Unexpected network error.",500===t.t0.status&&(o=null===t.t0||void 0===t.t0?void 0:t.t0.message),400===t.t0.status&&(null===t.t0||void 0===t.t0||null===(s=t.t0.data)||void 0===s?void 0:s.errors)&&(o=Object.values(null===t.t0||void 0===t.t0||null===(u=t.t0.data)||void 0===u?void 0:u.errors).join(" <br /> ")),e((function(){return{isLoading:!1,error:o}}));case 15:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}()}})),O=r(7),w=Object(a.createContext)({}),y=function(e){var t=e.children,r=Object(a.useState)(!1),o=Object(n.a)(r,2),i=o[0],u=o[1],c=Object(a.useState)(!1),l=Object(n.a)(c,2),d=l[0],p=l[1],f=x((function(e){return e})),m=f.error,b=f.message,h=f.isLoading,j=f.register,g=f.login,v=f.token,y=Object(s.a)();return Object(a.useEffect)((function(){return(m||b)&&y({title:m?"An error occurred":"Registration successful",duration:2e4,description:m||b,position:"top",status:m?"error":"success",isClosable:!0}),function(){return x.setState({error:null,message:null})}}),[m,b]),Object(O.jsx)(w.Provider,{value:{show:i,login:g,token:v,setShow:u,register:j,isLoading:h,isAccepted:d,setAccepted:p},children:t})};t.b=function(){return Object(a.useContext)(w)}},98:function(e,t,r){"use strict";r.d(t,"a",(function(){return n})),r.d(t,"c",(function(){return a})),r.d(t,"b",(function(){return s})),r.d(t,"d",(function(){return o})),r.d(t,"e",(function(){return i}));var n="http://0.0.0.0:5001",a="",s="",o="",i=""}},[[194,2,3]]]);
//# sourceMappingURL=main.ed2dc5cd.chunk.js.map