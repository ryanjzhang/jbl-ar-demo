"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
* Jeeliz Face Filter - https://github.com/jeeliz/jeelizFaceFilter
*
* Copyright 2018 Jeeliz ( https://jeeliz.com )
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

function oa(b, d, e) {
  return b * (1 - e) + d * e;
}function Aa(b, d) {
  var e = new XMLHttpRequest();e.open("GET", b, !0);e.withCredentials = !1;e.onreadystatechange = function () {
    4 === e.readyState && 200 === e.status && d(e.responseText);
  };e.send();
}function Da(b, d, e) {
  return Math.min(Math.max((e - b) / (d - b), 0), 1);
}
function Fa(b) {
  switch (b) {case "relu":
      return "gl_FragColor=max(vec4(0.,0.,0.,0.),gl_FragColor);";case "elu":
      return "gl_FragColor=mix(exp(-abs(gl_FragColor))-vec4(1.,1.,1.,1.),gl_FragColor,step(0.,gl_FragColor));";case "elu01":
      return "gl_FragColor=mix(0.1*exp(-abs(gl_FragColor))-vec4(0.1,0.1,0.1,0.1),gl_FragColor,step(0.,gl_FragColor));";case "arctan":
      return "gl_FragColor=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;";case "copy":
      return "";default:
      return !1;}
}
function Ga(b, d) {
  var e = d % 8;return b[(d - e) / 8] >> 7 - e & 1;
}
function Ia(b) {
  var d = JSON.parse(b);b = d.ne;var e = d.nf,
      k = d.n,
      m = "undefined" === typeof btoa ? Buffer.from(d.data, "base64").toString("latin1") : atob(d.data),
      l = m.length,
      t;d = new Uint8Array(l);for (t = 0; t < l; ++t) {
    d[t] = m.charCodeAt(t);
  }m = new Float32Array(k);l = new Float32Array(e);t = b + e + 1;var n, q;for (n = 0; n < k; ++n) {
    var h = t * n;var w = 0 === Ga(d, h) ? 1 : -1;var v = h + 1;var C = 1,
        E = 0;for (q = v + b - 1; q >= v; --q) {
      E += C * Ga(d, q), C *= 2;
    }q = E;v = d;C = h + 1 + b;E = l;var N = 0,
        O = E.length;for (h = C; h < C + O; ++h) {
      E[N] = Ga(v, h), ++N;
    }for (h = v = 0; h < e; ++h) {
      v += l[h] * Math.pow(2, -h - 1);
    }w = 0 === v && 0 === q ? 0 : w * (1 + v) * Math.pow(2, 1 + q - Math.pow(2, b - 1));m[n] = w;
  }return m;
}
var u = function () {
  function b(g, A) {
    g = _a.createShader(g);_a.shaderSource(g, A);_a.compileShader(g);return _a.getShaderParameter(g, _a.COMPILE_STATUS) ? g : !1;
  }function d(g, A) {
    g = b(_a.VERTEX_SHADER, g);A = b(_a.FRAGMENT_SHADER, A);var B = _a.createProgram();_a.attachShader(B, g);_a.attachShader(B, A);_a.linkProgram(B);return B;
  }function e(g) {
    void 0 === g.$ && (g.$ = "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}");void 0 === g.ua && (g.ua = ["a0"]);void 0 === g.fa && (g.fa = [2]);if (void 0 === g.precision || "highp" === g.precision) g.precision = q;g.id = t++;void 0 !== g.Sc && g.Sc.forEach(function (B, ea) {
      g.c = g.c.replace(B, g.Fa[ea]);
    });g.fb = 0;g.fa.forEach(function (B) {
      g.fb += 4 * B;
    });g.Ea = d(g.$, "precision " + g.precision + " float;\n" + g.c);g.m = {};g.f.forEach(function (B) {
      g.m[B] = _a.getUniformLocation(g.Ea, B);
    });g.attributes = {};g.ga_ = [];g.ua.forEach(function (B) {
      var ea = _a.getAttribLocation(g.Ea, B);g.attributes[B] = ea;g.ga_.push(ea);
    });if (g.h) {
      _a.useProgram(g.Ea);l = g;m = g.id;for (var A in g.h) {
        _a.uniform1i(g.m[A], g.h[A]);
      }
    }g.Md = !0;
  }function k(g) {
    Ja.Yc(G);m !== g.id && (G.Z(), m = g.id, l = g, _a.useProgram(g.Ea), g.ga_.forEach(function (A) {
      0 !== A && _a.enableVertexAttribArray(A);
    }));
  }var m = -1,
      l = !1,
      t = 0,
      n = !1,
      q = "highp",
      h = ["u1"],
      w = ["u0"],
      v = { u1: 0 },
      C = { u0: 0 },
      E = { u1: 0, u2: 1 },
      N = { u3: 0 },
      O = { s0: { c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}", f: h, h: v }, s1: { c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}", f: h, h: v, precision: "lowp" }, s2: { c: "uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}",
      f: ["u1", "u2"], h: E }, s3: { c: "uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}", f: h, h: v }, s4: { c: "uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}", f: ["u1", "mask"], h: E }, s5: { c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}", f: h, h: v }, s6: { c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}",
      f: h, h: v }, s7: { c: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u4;}", f: ["u0", "u4"], h: C }, s8: { c: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;const vec4 g=vec4(.25,.25,.25,.25),e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u4,g);gl_FragColor=b*e;}", f: ["u0", "u4"], h: C }, s9: { c: "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}",
      f: h, h: v }, s10: { c: "uniform sampler2D u1,u5;uniform float u6;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u5,vv0);gl_FragColor=mix(b,a,u6*f);}", f: ["u1", "u5", "u6"], h: { u1: 0, u5: 1 } }, s11: { c: "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u7)+texture2D(u1,vv0+u7*vec2(1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,1.)));}", f: ["u1", "u7"], h: v }, s12: { c: "uniform sampler2D u1;uniform vec4 u8;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 k(float a){if(a==0.)return vec4(0.,0.,0.,0.);float l=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),m=c+127.,b=(a/exp2(c)-1.)*8388608.,d=m/2.,n=fract(d)*2.,o=floor(d),p=e(b,0.,8.),q=e(b,8.,16.),r=n*128.+e(b,16.,23.),j=l+o;return vec4(p,q,r,j)/255.;}void main(){float a=dot(texture2D(u1,vv0),u8);gl_FragColor=k(a);}",
      f: ["u1", "u8"], h: v }, s13: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}", f: w, h: C }, s14: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(e,a);}", f: w, h: C }, s15: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-e,a,step(0.,a));}", f: w, h: C }, s16: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-e;gl_FragColor=mix(.1*b,a,step(0.,a));}",
      f: w, h: C }, s17: { c: "uniform sampler2D u0,u6,u9;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u6,vv0),d=texture2D(u9,vv0),b=a/d;gl_FragColor=c*mix(exp(-abs(b))-f,b,step(0.,a));}", f: ["u0", "u6", "u9"], h: { u0: 0, u6: 1, u9: 2 } }, s18: { c: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}", f: w, h: C }, s19: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(.5,.5,.5,.5);void main(){vec4 a=texture2D(u0,vv0),b=log(e+a);gl_FragColor=b;}",
      f: w, h: C }, s20: { c: "uniform sampler2D u0;uniform float gain;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=exp(a);}", f: ["u0", "u10"], h: C }, s21: { c: "uniform sampler2D u0,u11;uniform float u12;const vec2 f=vec2(.5,.5);const float g=1e-5;const vec4 h=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u11,f);float b=u12*u12;vec4 c=max(b*a,g*h);gl_FragColor=texture2D(u0,vv0)/c;}", f: ["u0", "u13", "u12"], h: { u0: 0, u13: 1 } }, s22: { c: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;void main(){float a=u14.x*u14.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u14.y),g=floor(u14.x*fract(b*u14.y)),f=(g*u14.y+d)/a;gl_FragColor=texture2D(u1,f+c/a);}",
      f: ["u1", "u14"], h: v }, s23: { c: "uniform sampler2D u15,u16,u17;varying vec2 vv0;void main(){vec4 a=texture2D(u17,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u15,b),e=texture2D(u16,c);gl_FragColor=d*e;}", f: ["u15", "u16", "u17"], h: { u16: 0, u15: 1, u17: 2 } }, s24: { c: "uniform float u18;uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec2 a=fract(vv0*u18);vec4 b=texture2D(u15,vv0),c=texture2D(u16,a);gl_FragColor=b*c;}", f: ["u16", "u15", "u18"], h: { u16: 0, u15: 1 } }, s25: { c: "uniform float u18;uniform sampler2D u15,u16,u19,u20,u21,u22;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 i=vv0*u18,m=floor(i),c=i-m;vec4 n=texture2D(u15,vv0),d=texture2D(u16,c),a=texture2D(u22,vv0);a=a*255.;vec4 o=texture2D(u19,c),p=texture2D(u20,c),q=texture2D(u21,c),j=step(-g,-a),b=e-j,k=b*step(-e-g,-a);b*=e-k;vec4 h=b*step(-2.*e-g,-a);b*=e-h;vec4 l=b;d=j*d+k*o+h*p+l*q,gl_FragColor=n*d;}",
      f: "u15 u16 u18 u22 u19 u20 u21".split(" "), h: { u16: 0, u15: 1, u22: 3, u19: 4, u20: 5, u21: 6 } }, s26: { c: "uniform sampler2D u15,u16,u23;uniform float u18,u24,u25,u26;varying vec2 vv0;const vec2 j=vec2(1.,1.);void main(){vec2 a=floor(u24*vv0),g=u24*vv0-a;float b=u18/u24;vec2 c=floor(g*b),d=g*b-c,h=(a+d)/u24;float l=u24*u26/u18;vec2 m=l*c,i=(m+d*u25)/u26,e=step(i,j);vec4 n=texture2D(u15,h),o=texture2D(u16,i),p=n*o*e.x*e.y,k=texture2D(u23,h);gl_FragColor=p*u25*u25+k;}", f: "u15 u16 u18 u24 u25 u26 u23".split(" "), h: { u16: 0,
        u15: 1, u23: 2 } }, s27: { c: "uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec4 a=texture2D(u15,vv0),b=texture2D(u16,vv0);gl_FragColor=a*b;}", f: ["u15", "u16"], h: { u16: 0, u15: 1 } }, s28: { c: "uniform sampler2D u1,u23;uniform float u27;varying vec2 vv0;void main(){gl_FragColor=texture2D(u23,vv0)+u27*texture2D(u1,vv0);}", f: ["u1", "u23", "u27"], h: { u1: 0, u23: 1 } }, s29: { c: "varying vec2 vv0;uniform sampler2D u1;const vec4 g=vec4(1.,1.,1.,1.),e=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,e)*g;}",
      f: h, h: v, precision: "lowp" }, s30: { c: "varying vec2 vv0;uniform sampler2D u1;uniform float u28;const vec3 e=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u28)).rgb,c=texture2D(u1,vv0+vec2(u28,u28)).rgb,d=texture2D(u1,vv0+vec2(u28,0.)).rgb;gl_FragColor=vec4(dot(a,e),dot(b,e),dot(c,e),dot(d,e));}", f: ["u1", "u28"], h: v, precision: "lowp" }, s31: { c: "varying vec2 vv0;uniform sampler2D u1;uniform float u28;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u28)).rgb,c=texture2D(u1,vv0+vec2(u28,u28)).rgb,d=texture2D(u1,vv0+vec2(u28,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}",
      f: ["u1", "u28"], h: v, precision: "lowp" }, s32: { c: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u29;const vec4 g=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u29,vv0.y-u29))*1.,a-=texture2D(u1,vec2(vv0.x-u29,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u29,vv0.y+u29))*1.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y-u29))*1.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y+u29))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u29,vv0.y-u29))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u29))*2.,b-=texture2D(u1,vec2(vv0.x+u29,vv0.y-u29))*1.,b+=texture2D(u1,vec2(vv0.x-u29,vv0.y+u29))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u29))*2.,b+=texture2D(u1,vec2(vv0.x+u29,vv0.y+u29))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),f=texture2D(u2,vv0);gl_FragColor=f.a*e.r*g;}",
      f: ["u1", "u2", "u29"], h: E }, s33: { c: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u29;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float i=0.;vec2 l=k*u29,b,c;float d,a,g=0.;for(float f=-4.;f<=4.;f+=1.)for(float e=-4.;e<=4.;e+=1.)b=vec2(f,e),d=length(b)/2.,a=exp(-d*d),c=vv0+l*b,a=1.,i+=a*texture2D(u1,c).r,g+=a;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,c).r-i/g)*j;}", f: ["u1", "u2", "u29"], h: E }, s34: { c: "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 h=vec2(.5,.5),i=vec2(1.,0.),j=vec2(0.,1.);void main(){vec2 a=vv0-u7*h;vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*i),d=texture2D(u3,a+u7*j),k=texture2D(u3,a+u7),l=e(b,c),g=e(d,k);gl_FragColor=e(l,g);}",
      f: ["u3", "u7"], h: N }, s35: { c: "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;const vec2 j=vec2(1.,0.),k=vec2(0.,1.),l=vec2(2.,0.),m=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*j),d=texture2D(u3,a+u7*k),g=texture2D(u3,a+u7),i=e(b,c),h=e(d,g);return e(i,h);}void main(){vec2 a=vv0+u7*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u7*l),d=f(a+u7*2.),g=f(a+u7*m),i=e(b,c),h=e(d,g);gl_FragColor=e(i,h);}", f: ["u3", "u7"], h: N }, s36: { c: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}",
      f: ["u1"], h: v, precision: "lowp" }, s37: { c: "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float d=15444.;void main(){vec4 a=1001./d*texture2D(u1,vv0-3.*u7)+2002./d*texture2D(u1,vv0-2.*u7)+3003./d*texture2D(u1,vv0-u7)+3432./d*texture2D(u1,vv0)+3003./d*texture2D(u1,vv0+u7)+2002./d*texture2D(u1,vv0+2.*u7)+1001./d*texture2D(u1,vv0+3.*u7);gl_FragColor=a;}", f: ["u7", "u1"], h: v, precision: "lowp" }, s38: { c: "uniform sampler2D u1,u30,u31;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float h=.1;void main(){vec4 a=texture2D(u30,vv0),b=texture2D(u31,vv0),c=texture2D(u1,vv0),d=max(g*h,b-a*a),f=sqrt(d);gl_FragColor=(c-a)/f;}",
      f: ["u1", "u30", "u31"], h: { u1: 0, u30: 1, u31: 2 } } },
      S = { s39: { c: "uniform float u18,u32;uniform sampler2D u15,u16,u23;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u23,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u18,xyTo=floor(vv0*u18+eps2);float weightSize=toSparsity*u18;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u32*(xyPatch-halfFromSparsity))/u18,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}",
      f: ["u18", "u15", "u16", "u23", "u32"], Fa: ["1.1111", "gl_FragColor\\*=2.2222;"] }, s40: { c: "uniform float u18,u32,u26;uniform sampler2D u15,u16,u23;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u23,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u26,xyTo=floor(vv0*u18+eps2);float weightSize=fromSparsity*u26;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u18;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u32*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u26,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}",
      f: "u18 u26 u15 u16 u23 u32".split(" "), Fa: ["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"] } },
      G = { Xa: function Xa() {
      return n;
    }, l: function l() {
      if (!n) {
        q = "highp";for (var g in O) {
          e(O[g], g);
        }u.set("s0");_a.enableVertexAttribArray(0);g = Ka.l();n = !0;return g;
      }
    }, Zb: function Zb(g) {
      g.forEach(function (A) {
        G.ib(A);
      });
    }, ib: function ib(g) {
      O[g.id] = g;e(g, g.id);
    }, xb: function xb(g, A, B) {
      A || (A = g);O[A] = Object.create(S[g]);S[g].Fa && S[g].Fa.forEach(function (ea, xa) {
        O[A].c = O[A].c.replace(new RegExp(ea, "g"), B[xa]);
      });e(O[A], A);
    }, set: function set(g) {
      k(O[g]);
    },
    tc: function tc(g) {
      return "undefined" !== typeof O[g];
    }, xd: function xd() {
      return l.ud;
    }, Z: function Z() {
      -1 !== m && (m = -1, l.ga_.forEach(function (g) {
        0 !== g && _a.disableVertexAttribArray(g);
      }));
    }, cb: function cb() {
      var g = 0;l.ga_.forEach(function (A, B) {
        B = l.fa[B];_a.vertexAttribPointer(A, B, _a.FLOAT, !1, l.fb, g);g += 4 * B;
      });
    }, pb: function pb() {
      _a.enableVertexAttribArray(0);
    }, pa: function pa() {
      _a.vertexAttribPointer(l.ga_[0], 2, _a.FLOAT, !1, 8, 0);
    }, Rb: function Rb(g, A) {
      _a.uniform1i(l.m[g], A);
    }, v: function v(g, A) {
      _a.uniform1f(l.m[g], A);
    }, P: function P(g, A, B) {
      _a.uniform2f(l.m[g], A, B);
    }, Zd: function Zd(g, A) {
      _a.uniform2fv(l.m[g], A);
    }, $d: function $d(g, A) {
      _a.uniform3fv(l.m[g], A);
    }, Zc: function Zc(g, A, B, ea) {
      _a.uniform3f(l.m[g], A, B, ea);
    }, Sb: function Sb(g, A) {
      _a.uniform4fv(l.m[g], A);
    }, ae: function ae(g, A) {
      _a.uniformMatrix2fv(l.m[g], !1, A);
    }, be: function be(g, A) {
      _a.uniformMatrix3fv(l.m[g], !1, A);
    }, ce: function ce(g, A) {
      _a.uniformMatrix4fv(l.m[g], !1, A);
    }, H: function H(g, A) {
      G.set(g);A.forEach(function (B) {
        switch (B.type) {case "4f":
            _a.uniform4fv(l.m[B.name], B.value);break;case "3f":
            _a.uniform3fv(l.m[B.name], B.value);break;case "2f":
            _a.uniform2fv(l.m[B.name], B.value);break;case "1f":
            _a.uniform1f(l.m[B.name], B.value);break;case "1i":
            _a.uniform1i(l.m[B.name], B.value);break;case "mat2":
            _a.uniformMatrix2fv(l.m[B.name], !1, B.value);break;case "mat3":
            _a.uniformMatrix3fv(l.m[B.name], !1, B.value);break;case "mat4":
            _a.uniformMatrix4fv(l.m[B.name], !1, B.value);}
      });
    }, Gd: function Gd() {
      return "lowp";
    } };return G;
}(),
    _a = !1,
    Ma = function () {
  function b(h) {
    console.log("ERROR in ContextFeedForward : ", h);return !1;
  }function d() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      var h = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);h = [parseInt(h[1], 10), parseInt(h[2], 10), parseInt(h[3] || 0, 10)];return 12 === h[0] || 13 === h[0] ? !0 : !1;
    }return (/(Mac)/i.test(navigator.platform) && ((h = navigator.userAgent) ? (h = h.match(/Mac OS X (\d+)_(\d+)/), h = 3 > h.length ? !1 : [parseInt(h[1], 10), parseInt(h[2], 10)]) : h = !1, h && 10 === h[0] && 15 === h[1]) ? !0 : !1
    );
  }var e = !1,
      k = !1,
      m = !1,
      _l = !1,
      t = !0,
      n = !1,
      q = { A: function A() {
      return e.width;
    }, L: function L() {
      return e.height;
    }, yd: function yd() {
      return e;
    }, wd: function wd() {
      return _a;
    }, u: function u() {
      return t;
    },
    flush: function flush() {
      _a.flush();
    }, yc: function yc() {
      n || (n = new Uint8Array(e.width * e.height * 4));_a.readPixels(0, 0, e.width, e.height, _a.RGBA, _a.UNSIGNED_BYTE, n);return n;
    }, Ad: function Ad() {
      return e.toDataURL("image/jpeg");
    }, Bd: function Bd() {
      H.J();k || (k = document.createElement("canvas"), m = k.getContext("2d"));k.width = e.width;k.height = e.height;var h = q.yc(),
          w = m.createImageData(k.width, k.height),
          v,
          C,
          E = k.width,
          N = k.height,
          O = w.data;for (C = 0; C < N; ++C) {
        var S = N - C - 1;for (v = 0; v < E; ++v) {
          var G = 4 * (C * E + v);var g = 4 * (S * E + v);O[G] = h[g];O[G + 1] = h[g + 1];O[G + 2] = h[g + 2];O[G + 3] = h[g + 3];
        }
      }m.putImageData(w, 0, 0);return k.toDataURL("image/png");
    }, zd: function zd(h) {
      !k && h && (k = document.createElement("canvas"), m = k.getContext("2d"));var w = h ? k : document.createElement("canvas");w.width = e.width;w.height = e.height;(h ? m : w.getContext("2d")).drawImage(e, 0, 0);return w;
    }, l: function l(h) {
      h.mc && !h.ja ? e = document.getElementById(h.mc) : h.ja && (e = h.ja);e || (e = document.createElement("canvas"));e.width = h && void 0 !== h.width ? h.width : 512;e.height = h && void 0 !== h.height ? h.height : 512;"undefined" === typeof h && (h = {});void 0 === h.premultipliedAlpha && (h.premultipliedAlpha = !1);void 0 === h.zb && (h.zb = !0);void 0 === h.antialias && (h.antialias = !1);var w = { antialias: h.antialias, alpha: !0, preserveDrawingBuffer: !0, premultipliedAlpha: h.premultipliedAlpha, stencil: !1, depth: h.zb };d() || (_a = e.getContext("webgl2", w));_a ? t = !0 : ((_a = e.getContext("webgl", w)) || (_a = e.getContext("experimental-webgl", w)), t = !1);if (!_a) return b("WebGL is not enabled");(_l = _a.getExtension("WEBGL_lose_context")) && e.addEventListener("webglcontextlost", h.Oc, !1);if (!La.l()) return b("Not enough capabilities");if (!La.hc() && t) return b("Your configuration cannot process color buffer float");_a.clearColor(0, 0, 0, 0);_a.disable(_a.DEPTH_TEST);_a.disable(_a.BLEND);_a.disable(_a.DITHER);_a.disable(_a.STENCIL_TEST);_a.GENERATE_MIPMAP_HINT && _a.hint(_a.GENERATE_MIPMAP_HINT, _a.FASTEST);_a.disable(_a.SAMPLE_ALPHA_TO_COVERAGE);_a.disable(_a.SAMPLE_COVERAGE);return !0;
    }, Fc: function Fc() {
      if (!u.l()) return !1;_a.depthFunc(_a.LEQUAL);_a.clearDepth(1);return !0;
    } };return q;
}(),
    Ja = function () {
  var b = "undefined" === typeof u ? JEShaders : u;return { Yc: function Yc(d) {
      b !== d && (b.Z(), b = d);
    }, Xa: function Xa() {
      return b.Xa();
    }, pa: function pa() {
      b.pa();
    }, cb: function cb() {
      b.cb();
    }, Z: function Z() {
      b.Z();
    }, set: function set(d) {
      b.set(d);
    } };
}(),
    M = function () {
  var b,
      d,
      e = 0,
      k = -2,
      m = -2,
      _l2 = !1,
      t = { reset: function reset() {
      m = k = -2;
    }, l: function l() {
      _l2 || (b = _a.createBuffer(), _a.bindBuffer(_a.ARRAY_BUFFER, b), _a.bufferData(_a.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), _a.STATIC_DRAW), d = _a.createBuffer(), _a.bindBuffer(_a.ELEMENT_ARRAY_BUFFER, d), _a.bufferData(_a.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), _a.STATIC_DRAW), t.ha(), _l2 = !0);
    }, a: function a(n) {
      var q = e++,
          h = n.V ? n.V.length : 0,
          w = "undefined" === typeof n.mode ? _a.STATIC_DRAW : n.mode,
          v = _a.createBuffer();_a.bindBuffer(_a.ARRAY_BUFFER, v);_a.bufferData(_a.ARRAY_BUFFER, n.Vb instanceof Float32Array ? n.Vb : new Float32Array(n.Vb), w);k = q;if (n.V) {
        var C = _a.createBuffer();_a.bindBuffer(_a.ELEMENT_ARRAY_BUFFER, C);if (65536 > n.V.length) {
          var E = Uint16Array;var N = _a.UNSIGNED_SHORT;var O = 2;
        } else E = Uint32Array, N = _a.UNSIGNED_INT, O = 4;_a.bufferData(_a.ELEMENT_ARRAY_BUFFER, n.V instanceof E ? n.V : new E(n.V), w);m = q;
      }var S = { gc: function gc(G) {
          k !== q && (_a.bindBuffer(_a.ARRAY_BUFFER, v), k = q);G && Ja.cb();
        }, ec: function ec() {
          m !== q && (_a.bindBuffer(_a.ELEMENT_ARRAY_BUFFER, C), m = q);
        }, bind: function bind(G) {
          S.gc(G);S.ec();
        }, sd: function sd() {
          _a.drawElements(_a.TRIANGLES, h, N, 0);
        }, td: function td(G, g) {
          _a.drawElements(_a.TRIANGLES, G, N, g * O);
        }, remove: function remove() {
          _a.deleteBuffer(v);n.V && _a.deleteBuffer(C);S = null;
        } };return S;
    }, ha: function ha() {
      -1 !== k && (_a.bindBuffer(_a.ARRAY_BUFFER, b), k = -1);-1 !== m && (_a.bindBuffer(_a.ELEMENT_ARRAY_BUFFER, d), m = -1);
    }, g: function g(n, q) {
      n && M.ha();q && Ja.pa();_a.drawElements(_a.TRIANGLES, 3, _a.UNSIGNED_SHORT, 0);
    }, xc: function xc() {
      _a.deleteBuffer(b);_a.deleteBuffer(d);
    } };return t;
}(),
    H = function () {
  var b,
      d,
      e,
      k = !1,
      m = { w: -2, vc: 1 };return { l: function l() {
      if (!k) {
        b = _a.createFramebuffer();var l = La.u();d = l && _a.DRAW_FRAMEBUFFER ? _a.DRAW_FRAMEBUFFER : _a.FRAMEBUFFER;e = l && _a.READ_FRAMEBUFFER ? _a.READ_FRAMEBUFFER : _a.FRAMEBUFFER;k = !0;
      }
    }, Dd: function Dd() {
      return d;
    }, Ta: function Ta() {
      return e;
    }, ca: function ca() {
      return _a.FRAMEBUFFER;
    }, Hd: function Hd() {
      return m;
    }, vd: function vd() {
      return b;
    },
    a: function a(l) {
      void 0 === l.yb && (l.yb = !1);var t = l.qa ? l.qa : !1,
          n = l.width,
          q = void 0 !== l.height ? l.height : l.width,
          h = b,
          w = !1,
          v = !1,
          C = 0;t && (n = n ? n : t.A(), q = q ? q : t.L());var E = { Qb: function Qb() {
          v || (h = _a.createFramebuffer(), v = !0, C = m.vc++);
        }, Yb: function Yb() {
          E.Qb();E.j();w = _a.createRenderbuffer();_a.bindRenderbuffer(_a.RENDERBUFFER, w);_a.renderbufferStorage(_a.RENDERBUFFER, _a.DEPTH_COMPONENT16, n, q);_a.framebufferRenderbuffer(d, _a.DEPTH_ATTACHMENT, _a.RENDERBUFFER, w);_a.clearDepth(1);
        }, bind: function bind(N, O) {
          C !== m.w && (_a.bindFramebuffer(d, h), m.w = C);t && t.j();O && _a.viewport(0, 0, n, q);N && _a.clear(_a.COLOR_BUFFER_BIT | _a.DEPTH_BUFFER_BIT);
        }, ld: function ld() {
          C !== m.w && (_a.bindFramebuffer(d, h), m.w = C);
        }, clear: function clear() {
          _a.clear(_a.COLOR_BUFFER_BIT | _a.DEPTH_BUFFER_BIT);
        }, od: function od() {
          _a.clear(_a.COLOR_BUFFER_BIT);
        }, pd: function pd() {
          _a.clear(_a.DEPTH_BUFFER_BIT);
        }, $c: function $c() {
          _a.viewport(0, 0, n, q);
        }, j: function j() {
          C !== m.w && (_a.bindFramebuffer(d, h), m.w = C);
        }, rtt: function rtt(N) {
          t = N;m.w !== C && (_a.bindFramebuffer(_a.FRAMEBUFFER, h), m.w = C);N.j();
        }, J: function J() {
          _a.bindFramebuffer(d, null);
          m.w = -1;
        }, resize: function resize(N, O) {
          n = N;q = O;w && (_a.bindRenderbuffer(_a.RENDERBUFFER, w), _a.renderbufferStorage(_a.RENDERBUFFER, _a.DEPTH_COMPONENT16, n, q));
        }, remove: function remove() {
          _a.bindFramebuffer(d, h);_a.framebufferTexture2D(d, _a.COLOR_ATTACHMENT0, _a.TEXTURE_2D, null, 0);w && _a.framebufferRenderbuffer(d, _a.DEPTH_ATTACHMENT, _a.RENDERBUFFER, null);_a.bindFramebuffer(d, null);_a.deleteFramebuffer(h);w && _a.deleteRenderbuffer(w);E = null;
        } };l.yb && E.Yb();return E;
    }, J: function J() {
      _a.bindFramebuffer(d, null);m.w = -1;
    }, fd: function fd() {
      _a.bindFramebuffer(d, null);_a.clear(_a.COLOR_BUFFER_BIT | _a.DEPTH_BUFFER_BIT);_a.viewport(0, 0, La.A(), La.L());m.w = -1;
    }, reset: function reset() {
      m.w = -2;
    }, T: function T() {
      0 !== m.w && (_a.bindFramebuffer(d, b), m.w = 0);
    }, clear: function clear() {
      _a.viewport(0, 0, La.A(), La.L());_a.clear(_a.COLOR_BUFFER_BIT);
    } };
}(),
    Z = function () {
  function _b(c) {
    _a.bindTexture(_a.TEXTURE_2D, c);
  }function d(c) {
    xa[0] = c;c = Ea[0];var F = c >> 16 & 32768,
        L = c >> 12 & 2047,
        T = c >> 23 & 255;return 103 > T ? F : 142 < T ? F | 31744 | ((255 == T ? 0 : 1) && c & 8388607) : 113 > T ? (L |= 2048, F | (L >> 114 - T) + (L >> 113 - T & 1)) : F = (F | T - 112 << 10 | L >> 1) + (L & 1);
  }function e(c) {
    var F = new Uint16Array(c.length);c.forEach(function (L, T) {
      F[T] = d(L);
    });return F;
  }function k() {
    if (null !== ua.Ua) return ua.Ua;var c = l(e([1, 1, 1, 1]));return null === c ? !0 : ua.Ua = c;
  }function m() {
    if (null !== ua.Va) return ua.Va;var c = l(new Uint8Array([255, 255, 255, 255]));return null === c ? !0 : ua.Va = c;
  }function l(c) {
    if (!Ja.Xa() || !N) return null;try {
      var F = _a.getError(),
          L = da.a({ isFloat: !1, I: !0, array: c, width: 1 });F = _a.getError();if (F !== _a.NO_ERROR) return !1;
    } catch (T) {
      return !1;
    }H.J();_a.viewport(0, 0, 1, 1);_a.clearColor(0, 0, 0, 0);_a.clear(_a.COLOR_BUFFER_BIT);Ja.set("s0");L.kb(0);M.g(!1, !0);c = new Uint8Array(4);_a.readPixels(0, 0, 1, 1, _a.RGBA, _a.UNSIGNED_BYTE, c);c = .9 < c[0];L.remove();H.T();return c;
  }var t = 0,
      n,
      q = 0,
      h,
      w = !1,
      v,
      C,
      E,
      N = !1,
      O = !1,
      S,
      G,
      g,
      A = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]],
      B = !1,
      ea = !1,
      xa = new Float32Array(1),
      Ea = new Int32Array(xa.buffer),
      ua = { Ua: null, Va: null },
      da = { l: function l() {
      if (!N) {
        C = [_a.RGB, !1, _a.RGB, _a.RGBA];E = [_a.RGB, !1, _a.RGB, _a.RGBA];n = [_a.TEXTURE0, _a.TEXTURE1, _a.TEXTURE2, _a.TEXTURE3, _a.TEXTURE4, _a.TEXTURE5, _a.TEXTURE6, _a.TEXTURE7];
        B = "undefined" !== typeof JEContext;ea = "undefined" !== typeof La;B && JEContext.Td() && n.push(_a.TEXTURE8, _a.TEXTURE9);h = [-1, -1, -1, -1, -1, -1, -1, -1];v = [_a.UNSIGNED_BYTE, _a.FLOAT, _a.FLOAT];if (!w) {
          for (var c = new Float32Array(16384), F = 0; 16384 > F; ++F) {
            c[F] = 2 * Math.random() - 1;
          }w = { random: da.a({ isFloat: !0, isPot: !0, array: c, width: 64 }), Ub: da.a({ isFloat: !1, isPot: !0, width: 1, array: new Uint8Array([0, 0, 0, 0]) }) };
        }N = !0;
      }
    }, Ec: function Ec() {
      da.gd();
    }, Kd: function Kd() {
      return w.Ub;
    }, gd: function gd() {
      v[1] = La.xa();
    }, Uc: function Uc() {
      E = C = [_a.RGBA, _a.RGBA, _a.RGBA, _a.RGBA];
    }, Vd: function Vd(c, F) {
      u.set("s1");H.J();var L = c.A(),
          T = c.L();_a.viewport(0, 0, L, T);c.b(0);M.g(!1, !1);_a.readPixels(0, 0, L, T, _a.RGBA, _a.UNSIGNED_BYTE, F);
    }, wc: function wc(c, F, L) {
      _a.activeTexture(_a.TEXTURE0);t = 0;var T = _a.createTexture();_b(T);var ia = La.u() && _a.RGBA32F ? _a.RGBA32F : _a.FLOAT;F = F instanceof Float32Array ? F : new Float32Array(F);var fa = Math.log2(F.length);fa !== Math.floor(fa) && (_a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_WRAP_S, _a.CLAMP_TO_EDGE), _a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_WRAP_T, _a.CLAMP_TO_EDGE));_a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_MAG_FILTER, _a.NEAREST);_a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_MIN_FILTER, _a.NEAREST);_a.pixelStorei(_a.UNPACK_FLIP_Y_WEBGL, L);_a.texImage2D(_a.TEXTURE_2D, 0, _a.RGBA, c.A(), c.L(), 0, _a.RGBA, ia, F);_b(null);_a.pixelStorei(_a.UNPACK_FLIP_Y_WEBGL, !1);H.T();u.set("s0");c.B();_a.clearColor(0, 0, 0, 0);_a.clear(_a.COLOR_BUFFER_BIT);_b(T);M.g(!0, !1);_a.deleteTexture(T);
    }, a: function a(c) {
      function F() {
        _b(ka);pa && _a.pixelStorei(_a.UNPACK_FLIP_Y_WEBGL, pa);c.isPot ? (_a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_WRAP_S, c.Cb ? _a.MIRRORED_REPEAT : _a.REPEAT), _a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_WRAP_T, c.W ? _a.MIRRORED_REPEAT : _a.REPEAT)) : (_a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_WRAP_S, _a.CLAMP_TO_EDGE), _a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_WRAP_T, _a.CLAMP_TO_EDGE));c.za && "undefined" !== typeof JESETTINGS && _a.texParameterf(_a.TEXTURE_2D, JEContext.Cd().TEXTURE_MAX_ANISOTROPY_EXT, JESETTINGS.jd);_a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_MAG_FILTER, c.isLinear ? _a.LINEAR : _a.NEAREST);c.isLinear ? _a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_MIN_FILTER, c.isMipmap && !wa ? _a.NEAREST_MIPMAP_LINEAR : _a.LINEAR) : _a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_MIN_FILTER, c.isMipmap && !wa ? _a.NEAREST_MIPMAP_NEAREST : _a.NEAREST);la = C[c.na - 1];ba = E[c.na - 1];ca = v[L];if (La.u()) {
          var x = _a.RGBA32F;la === _a.RGBA && ca === _a.FLOAT && x && (ba = x);la === _a.RGB && ca === _a.FLOAT && x && (ba = x, la = _a.RGBA);
        }if (c.I && !c.isFloat || c.isFloat && c.isMipmap && Ka.Hc()) (x = _a.RGBA16F) && (ba = x), ca = La.xa();c.Fb && "undefined" !== typeof _a.texStorage2D && (Ba = c.Fb);c.Db && 4 === c.na && (la = JEContext.Id());if (c.D) _a.texImage2D(_a.TEXTURE_2D, 0, ba, la, ca, c.D);else if (c.url) _a.texImage2D(_a.TEXTURE_2D, 0, ba, la, ca, va);else if (X) {
          try {
            _a.getError(), _a.texImage2D(_a.TEXTURE_2D, 0, ba, K, r, 0, la, ca, X), _a.getError() !== _a.NO_ERROR && (_a.texImage2D(_a.TEXTURE_2D, 0, ba, K, r, 0, la, ca, null), _a.getError() !== _a.NO_ERROR && _a.texImage2D(_a.TEXTURE_2D, 0, _a.RGBA, K, r, 0, _a.RGBA, _a.UNSIGNED_BYTE, null));
          } catch (qa) {
            _a.texImage2D(_a.TEXTURE_2D, 0, ba, K, r, 0, la, ca, null);
          }c.isKeepArray || (X = null);
        } else _a.texImage2D(_a.TEXTURE_2D, 0, ba, K, r, 0, la, ca, null);if (c.isMipmap) if (!wa && Y) Y.Sa(), Ca = !0;else if (wa) {
          x = Math.log(Math.min(K, r)) / Math.log(2);var Q;ya = Array(1 + x);ya[0] = ka;for (Q = 1; Q <= x; ++Q) {
            var ha = Math.pow(2, Q);var D = K / ha;ha = r / ha;var I = _a.createTexture();_b(I);_a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_MIN_FILTER, _a.NEAREST);_a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_MAG_FILTER, _a.NEAREST);_a.texImage2D(_a.TEXTURE_2D, 0, ba, D, ha, 0, la, ca, null);_b(null);ya[Q] = I;
          }Ca = !0;
        }_b(null);h[t] = -1;pa && _a.pixelStorei(_a.UNPACK_FLIP_Y_WEBGL, !1);P = !0;ja && Y && (ja(Y), ja = !1);
      }"undefined" === typeof c.isFloat && (c.isFloat = !1);"undefined" === typeof c.I && (c.I = !1);"undefined" === typeof c.isPot && (c.isPot = !0);
      "undefined" === typeof c.isLinear && (c.isLinear = !1);"undefined" === typeof c.isMipmap && (c.isMipmap = !1);"undefined" === typeof c.Ja && (c.Ja = !1);void 0 === c.za && (c.za = !1);void 0 === c.W && (c.W = !1);void 0 === c.Cb && (c.Cb = !1);void 0 === c.Db && (c.Db = !1);void 0 === c.na && (c.na = 4);void 0 === c.Ab && (c.Ab = !1);"undefined" === typeof c.isFlipY && (c.isFlipY = c.url || c.array ? !0 : !1);"undefined" === typeof c.isKeepArray && (c.isKeepArray = !1);c.data && (c.array = "string" === typeof c.data ? Ia(c.data) : c.isFloat ? new Float32Array(c.data) : new Uint8Array(c.data), c.isFlipY = !1);var L = 0,
          T = c.D ? !0 : !1,
          ia = null,
          fa = null,
          ma = !1,
          ra = null;c.isFloat && (c.I = !0);c.I && (L = 1);c.Ab || La.u() || !c.isFloat || !ea || La.mb() || (c.isFloat = !1);c.isFloat && (L = 2);c.za && B && !JEContext.Od() && (c.za = !1);var ka = _a.createTexture(),
          ja = c.Ja,
          va = null,
          X = !1,
          K = 0,
          r = 0,
          P = !1,
          U = q++,
          aa = !1,
          y,
          J,
          za,
          W,
          ba,
          la,
          ca,
          pa = c.isFlipY,
          wa = c.I && c.isMipmap && "undefined" !== typeof Ka && !Ka.jc() ? !0 : !1,
          ya,
          Ba = -1,
          Ca = !1;"undefined" !== typeof c.width && c.width && (K = c.width, r = "undefined" !== typeof c.height && c.height ? c.height : K);var Y = { get: function get() {
          return ka;
        },
        A: function A() {
          return K;
        }, L: function L() {
          return r;
        }, Ld: function Ld() {
          return c.url;
        }, Pd: function Pd() {
          return c.isFloat;
        }, Rd: function Rd() {
          return c.I;
        }, Sd: function Sd() {
          return c.isLinear;
        }, Sa: function Sa() {
          _a.generateMipmap(_a.TEXTURE_2D);
        }, lb: function lb(x, Q) {
          wa ? (x || (x = Y.ub()), Y.Ha(Q), _b(ya[x]), h[Q] = -1) : Y.b(Q);
        }, ub: function ub() {
          -1 === Ba && (Ba = Math.log(K) / Math.log(2));return Ba;
        }, sb: function sb(x) {
          if (wa) {
            x || (x = Y.ub());u.set("s11");Y.Ha(0);var Q,
                ha = K,
                D = r;for (Q = 1; Q <= x; ++Q) {
              ha /= 2, D /= 2, u.P("u7", .25 / ha, .25 / D), _a.viewport(0, 0, ha, D), _b(ya[Q - 1]), _a.framebufferTexture2D(H.ca(), _a.COLOR_ATTACHMENT0, _a.TEXTURE_2D, ya[Q], 0), M.g(!1, 1 === Q);
            }h[0] = -1;
          } else Y.Sa();
        }, Ha: function Ha(x) {
          x !== t && (_a.activeTexture(n[x]), t = x);
        }, b: function b(x) {
          if (!P) return !1;Y.Ha(x);if (h[x] === U) return !1;_b(ka);h[x] = U;return !0;
        }, kb: function kb(x) {
          _a.activeTexture(n[x]);t = x;_b(ka);h[x] = U;
        }, j: function j() {
          _a.framebufferTexture2D(H.ca(), _a.COLOR_ATTACHMENT0, _a.TEXTURE_2D, ka, 0);
        }, B: function B() {
          _a.viewport(0, 0, K, r);_a.framebufferTexture2D(H.ca(), _a.COLOR_ATTACHMENT0, _a.TEXTURE_2D, ka, 0);
        }, fe: function fe() {
          _a.framebufferTexture2D(H.ca(), _a.COLOR_ATTACHMENT0, _a.TEXTURE_2D, null, 0);
        }, resize: function resize(x, Q) {
          K = x;r = Q;F();
        }, clone: function clone(x) {
          x = da.a({ width: K, height: r, I: c.I, isFloat: c.isFloat, isLinear: c.isLinear, W: c.W, isFlipY: x ? !pa : pa, isPot: c.isPot });Ja.set("s0");H.T();x.j();_a.viewport(0, 0, K, r);Y.b(0);M.g(!0, !0);return x;
        }, $c: function $c() {
          _a.viewport(0, 0, K, r);
        }, remove: function remove() {
          _a.deleteTexture(ka);Y = null;
        }, refresh: function refresh() {
          Y.kb(0);pa && _a.pixelStorei(_a.UNPACK_FLIP_Y_WEBGL, !0);T ? _a.texImage2D(_a.TEXTURE_2D, 0, ba, la, _a.UNSIGNED_BYTE, c.D) : _a.texImage2D(_a.TEXTURE_2D, 0, ba, K, r, 0, la, ca, X);pa && _a.pixelStorei(_a.UNPACK_FLIP_Y_WEBGL, !1);
        }, nb: function nb() {
          var x = K * r * 4;J = [new Uint8Array(x), new Uint8Array(x), new Uint8Array(x), new Uint8Array(x)];y = [new Float32Array(J[0].buffer), new Float32Array(J[1].buffer), new Float32Array(J[2].buffer), new Float32Array(J[3].buffer)];za = new Uint8Array(4 * x);W = new Float32Array(za.buffer);aa = !0;
        }, Pb: function Pb() {
          aa || Y.nb();_a.readPixels(0, 0, K, 4 * r, _a.RGBA, _a.UNSIGNED_BYTE, za);var x,
              Q = K * r,
              ha = 2 * Q,
              D = 3 * Q;for (x = 0; x < Q; ++x) {
            y[0][x] = W[x], y[1][x] = W[x + Q], y[2][x] = W[x + ha], y[3][x] = W[x + D];
          }return y;
        }, ob: function ob() {
          H.J();u.set("s12");Y.b(0);for (var x = 0; 4 > x; ++x) {
            _a.viewport(0, r * x, K, r), u.Sb("u8", A[x]), M.g(!1, 0 === x);
          }
        }, ge: function ge(x) {
          var Q = ca === v[0] && !m();_b(ka);pa && _a.pixelStorei(_a.UNPACK_FLIP_Y_WEBGL, pa);Q ? (ma || (ia = document.createElement("canvas"), ia.width = K, ia.height = r, fa = ia.getContext("2d"), ra = fa.createImageData(K, r), ma = !0), ra.data.set(x), fa.putImageData(ra, 0, 0), _a.texImage2D(_a.TEXTURE_2D, 0, ba, la, ca, ia)) : _a.texImage2D(_a.TEXTURE_2D, 0, ba, K, r, 0, la, ca, x);h[t] = U;pa && _a.pixelStorei(_a.UNPACK_FLIP_Y_WEBGL, !1);
        }, he: function he(x, Q) {
          _b(ka);_a.pixelStorei(_a.UNPACK_FLIP_Y_WEBGL, Q);_a.texImage2D(_a.TEXTURE_2D, 0, ba, la, ca, x);h[t] = U;Q && _a.pixelStorei(_a.UNPACK_FLIP_Y_WEBGL, !1);
        }, Xd: function Xd(x, Q) {
          var ha = K * r,
              D = 4 * ha;x = c.I ? x ? "RGBE" : "JSON" : "RGBA";Q && (x = Q);Q = La.u() && !1;switch (x) {case "RGBE":
              var I = "s41";break;case "JSON":
              I = Q ? "s0" : "s12";break;case "RGBA":case "RGBAARRAY":
              I = "s6";}aa || ("RGBA" === x || "RGBE" === x || "RGBAARRAY" === x ? (J = new Uint8Array(D), aa = !0) : "JSON" !== x || Q || Y.nb());H.J();u.set(I);Y.b(0);if ("RGBA" === x || "RGBE" === x || "RGBAARRAY" === x) {
            _a.viewport(0, 0, K, r);M.g(!0, !0);_a.readPixels(0, 0, K, r, _a.RGBA, _a.UNSIGNED_BYTE, J);if ("RGBAARRAY" === x) return { data: J };O || (S = document.createElement("canvas"), G = S.getContext("2d"), O = !0);S.width = K;S.height = r;g = G.createImageData(K, r);g.data.set(J);G.putImageData(g, 0, 0);var qa = S.toDataURL("image/png");
          } else if ("JSON" === x) if (Q) qa = new Float32Array(ha), _a.viewport(0, 0, K, r), M.g(!0, !0), _a.readPixels(0, 0, K, r, _a.RGBA, _a.FLOAT, qa);else {
            for (qa = 0; 4 > qa; ++qa) {
              _a.viewport(0, r * qa, K, r), u.Sb("u8", A[qa]), M.g(!qa, !qa);
            }Y.Pb();qa = Array(ha);for (I = 0; I < ha; ++I) {
              qa[4 * I] = y[0][I], qa[4 * I + 1] = y[1][I], qa[4 * I + 2] = y[2][I], qa[4 * I + 3] = y[3][I];
            }
          }return { format: x, data: qa, width: K, height: r, isMirrorY: c.W, isFlipY: "RGBA" === x ? c.isFlipY : !c.isFlipY };
        } };c.isMipmap && !wa && P && !Ca && (Y.Sa(), Ca = !0);if (c.url) _b(ka), _a.texImage2D(_a.TEXTURE_2D, 0, _a.RGBA, 1, 1, 0, _a.RGBA, _a.UNSIGNED_BYTE, null), va = new Image(), va.rd = "Anonymous", va.crossOrigin = "Anonymous", va.src = c.url, va.onload = function () {
        K = va.width;r = va.height;F();
      };else if (c.D) {
        var sa = function sa() {
          K = void 0 !== c.D.videoWidth ? c.D.videoWidth : c.D.width;r = void 0 !== c.D.videoHeight ? c.D.videoHeight : c.D.height;K ? F() : setTimeout(sa, 1);
        };sa();
      } else c.array ? (c.I && !c.isFloat ? c.array instanceof Uint16Array ? (X = c.array, F()) : k() ? (X = e(c.array), F()) : (F(), da.wc(Y, c.array, pa)) : (X = c.isFloat ? c.array instanceof Float32Array ? c.array : new Float32Array(c.array) : c.array instanceof Uint8Array ? c.array : new Uint8Array(c.array), F()), c.isKeepArray || (X && X !== c.array && (X = null), delete c.array)) : F();Y.Bc = Y.A;ja && P && (ja(Y), ja = !1);return Y;
    }, J: function J(c) {
      c !== t && (_a.activeTexture(n[c]), t = c);h[c] = -1;_b(null);
    }, md: function md(c) {
      w.random.b(c);
    }, reset: function reset() {
      for (var c = 0; c < n.length; ++c) {
        h[c] = -1;
      }t = -1;
    }, Wd: function Wd() {
      t = -1;
    }, de: function de() {
      for (var c = 0; c < n.length; ++c) {
        da.J(c);
      }
    }, xc: function xc() {
      w && (w.random.remove(), w.Ub.remove());
    }, ee: function ee(c, F) {
      if ("RGBA" === c.format || "RGBE" === c.format) {
        var L = new Image();L.src = c.data;L.onload = function () {
          da.a({ W: c.isMirrorY, isFlipY: c.isFlipY, isFloat: !1, D: L, Ja: function Ja(T) {
              if ("RGBA" === c.format) F(T);else {
                var ia = c.width,
                    fa = c.height,
                    ma = da.a({ W: c.isMirrorY, isFloat: !0, width: ia,
                  height: fa, isFlipY: c.isFlipY });H.T();_a.viewport(0, 0, ia, fa);u.set("s42");ma.j();T.b(0);M.g(!0, !0);da.J(0);F(ma);_a.flush();setTimeout(T.remove, 50);
              }
            } });
        };
      } else "JSON" === c.format ? F(da.a({ isFloat: !0, isFlipY: c.isFlipY, width: c.width, height: c.height, array: new Float32Array(c.data) })) : F(!1);
    } };return da;
}(),
    Na = { a: function a(b) {
    var d = [Z.a(b), Z.a(b)],
        e = [d[1], d[0]],
        k = e,
        m = { Xc: function Xc(l) {
        k[1].j();k[0].b(l);m.Tb();
      }, Yd: function Yd(l) {
        k[1].B();k[0].b(l);m.Tb();
      }, Tb: function Tb() {
        k = k === d ? e : d;
      }, refresh: function refresh() {
        k[0].refresh();k[1].refresh();
      },
      b: function b(l) {
        k[0].b(l);
      }, Ed: function Ed() {
        return k[0];
      } };return m;
  } },
    La = function () {
  function b() {
    d = "undefined" === typeof Ma ? JEContext : Ma;e = !0;
  }var d,
      e = !1,
      k = !1,
      m = !1,
      l = !1,
      t = !1,
      n = !1,
      q = !1,
      h = !1,
      w = !1,
      v = !1,
      C = !1,
      E = !0,
      N = !0,
      O = !0,
      S = !1,
      G = "undefined" === typeof window ? {} : window,
      g = { l: function l() {
      if (e) return !0;b();g.qb();g.Ra();g.rc();g.sc();H.l();Z.l();if (!g.nc()) return !1;M.l();Z.Ec();return !0;
    }, A: function A() {
      e || b();return d.A();
    }, L: function L() {
      e || b();return d.L();
    }, u: function u() {
      e || b();return d.u();
    }, rc: function rc() {
      C = (v = _a.getExtension("EXT_color_buffer_float") || _a.getExtension("WEBGL_color_buffer_float") || _a.getExtension("OES_color_buffer_float")) ? !0 : !1;G.GL_EXT_COLORBUFFERFLOAT = v;
    }, sc: function sc() {
      _a.getExtension("EXT_color_buffer_half_float") || _a.getExtension("WEBGL_color_buffer_half_float") || _a.getExtension("OES_color_buffer_half_float");
    }, qb: function qb() {
      if (!k) {
        this.u() || (m = _a.getExtension("OES_texture_float") || _a.getExtension("MOZ_OES_texture_float") || _a.getExtension("WEBKIT_OES_texture_float"), t = (G.GL_EXT_FLOAT = m) ? !0 : !1);if (t || this.u()) l = _a.getExtension("OES_texture_float_linear") || _a.getExtension("MOZ_OES_texture_float_linear") || _a.getExtension("WEBKIT_OES_texture_float_linear"), G.GL_EXT_FLOATLINEAR = l;k = !0;
      }
    }, Ra: function Ra() {
      if (!w) {
        if (!this.u()) {
          if (n = _a.getExtension("OES_texture_half_float") || _a.getExtension("MOZ_OES_texture_half_float") || _a.getExtension("WEBKIT_OES_texture_half_float")) S = n.HALF_FLOAT_OES, q = !0;!S && _a.HALF_FLOAT && (S = _a.HALF_FLOAT);!S && _a.FLOAT && (S = _a.FLOAT);G.GL_EXT_HALFFLOAT = n;
        }if (q || this.u()) h = _a.getExtension("OES_texture_half_float_linear") || _a.getExtension("MOZ_OES_texture_half_float_linear") || _a.getExtension("WEBKIT_OES_texture_half_float_linear"), G.GL_EXT_HALFFLOATLINEAR = h;w = !0;
      }
    }, xa: function xa() {
      if (g.u()) return _a.HALF_FLOAT;g.Ra();return q ? S : _a.FLOAT;
    }, mb: function mb() {
      return E;
    }, ic: function ic() {
      return N;
    }, nd: function nd() {
      return O;
    }, hc: function hc() {
      return C;
    }, pc: function pc() {
      N = E = !0;var A = _a.createFramebuffer();_a.bindFramebuffer(_a.FRAMEBUFFER, A);var B = _a.createTexture();_a.bindTexture(_a.TEXTURE_2D, B);_a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_MAG_FILTER, _a.NEAREST);_a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_MIN_FILTER, _a.NEAREST);_a.texImage2D(_a.TEXTURE_2D, 0, g.u() && _a.RGBA32F ? _a.RGBA32F : _a.RGBA, 1, 1, 0, _a.RGBA, _a.FLOAT, null);_a.framebufferTexture2D(H.ca(), _a.COLOR_ATTACHMENT0, _a.TEXTURE_2D, B, 0);var ea = _a.checkFramebufferStatus(H.Ta());ea !== _a.FRAMEBUFFER_COMPLETE && (E = !1);_a.texImage2D(_a.TEXTURE_2D, 0, g.u() && _a.RGBA16F ? _a.RGBA16F : _a.RGBA, 1, 1, 0, _a.RGBA, g.xa(), null);_a.framebufferTexture2D(H.ca(), _a.COLOR_ATTACHMENT0, _a.TEXTURE_2D, B, 0);ea = _a.checkFramebufferStatus(H.Ta());ea !== _a.FRAMEBUFFER_COMPLETE && (N = !1);_a.bindTexture(_a.TEXTURE_2D, null);
      _a.bindFramebuffer(_a.FRAMEBUFFER, null);_a.deleteTexture(B);_a.deleteFramebuffer(A);
    }, oc: function oc() {
      var A = H.a({ width: 1 });A.Qb();var B = Z.a({ width: 1, isFloat: !0, na: 3 });A.j();B.j();_a.flush();_a.checkFramebufferStatus(H.Ta()) !== _a.FRAMEBUFFER_COMPLETE ? (Z.Uc(), O = !1) : O = !0;A.remove();B.remove();
    }, nc: function nc() {
      g.pc();if (!E && !N) return !1;g.oc();return !0;
    } };return g;
}(),
    Ka = function () {
  function b(E, N, O, S) {
    _a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_MIN_FILTER, S ? _a.NEAREST_MIPMAP_NEAREST : _a.LINEAR);try {
      var G = _a.getError();G !== _a.NO_ERROR && console.log("GLERR in test_mipmapping() :", G);_a.texImage2D(_a.TEXTURE_2D, 0, E, 2, 2, 0, _a.RGBA, N, O);G = _a.getError();if (G !== _a.NO_ERROR) return !1;
    } catch (g) {
      return !1;
    }S && _a.generateMipmap(_a.TEXTURE_2D);M.ha();M.g(!1, !0);_a.readPixels(0, 0, 1, 1, _a.RGBA, _a.UNSIGNED_BYTE, n);G = _a.getError();G === _a.INVALID_OPERATION && "undefined" !== typeof _a.PIXEL_PACK_BUFFER && (_a.bindBuffer(_a.PIXEL_PACK_BUFFER, null), _a.readPixels(0, 0, 1, 1, _a.RGBA, _a.UNSIGNED_BYTE, n), G = _a.getError());return G !== _a.NO_ERROR ? !1 : 0 !== n[0];
  }function d(E) {
    return La.mb() && b(internalPixelFormat32f, _a.FLOAT, new Float32Array(h), E) ? (l = m.hb, !0) : !1;
  }function e(E) {
    return La.ic() ? b(v, La.xa(), new Uint16Array(h), E) || b(v, _a.FLOAT, new Float32Array(h), E) ? (l = m.Ga, !0) : !1 : !1;
  }var k = !1,
      m = { hb: 3, Ga: 2, RGBA8: 0 },
      l = m.RGBA8,
      t,
      n = new Uint8Array(4),
      q = [.8, 1, .8, 1],
      h = q.concat(q, q, q),
      w = !0,
      v,
      C = { l: function l() {
      La.qb();La.Ra();v = _a.RGBA;if (Ma.u()) {
        var E = _a.RGBA16F;E && (v = E);
      }M.l();H.reset();H.J();_a.viewport(0, 0, 1, 1);u.set("s0");k = !0;t = _a.createTexture();_a.activeTexture(_a.TEXTURE0);_a.bindTexture(_a.TEXTURE_2D, t);_a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_WRAP_S, _a.REPEAT);_a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_WRAP_T, _a.REPEAT);_a.texParameteri(_a.TEXTURE_2D, _a.TEXTURE_MAG_FILTER, _a.NEAREST);if (e(!0) || d(!0)) return !0;w = !1;if (e(!1) || d(!1)) return !0;if (Ma.u()) {
        v = _a.RGBA;if (e(!0) || d(!0)) return !0;w = !1;if (e(!1) || d(!1)) return !0;
      }return !1;
    }, jc: function jc() {
      return w;
    }, Fd: function Fd() {
      return l;
    }, Qd: function Qd() {
      k || C.l();return l === m.hb;
    }, Hc: function Hc() {
      k || C.l();return l === m.Ga;
    } };return C;
}(),
    Oa = { a: function a(b) {
    var d = Z.a(b.alpha),
        e = Z.a(b.beta);
    return { qc: function qc() {
        d.b(1);e.b(2);
      } };
  } },
    Ra = { a: function a(b) {
    var d = b.bd;d.index = b.index;d.X = b.X;d.parent = b.parent;switch (d.type) {case "input":
        b = Pa.a(d);break;default:
        b = Qa.a(d);}return b;
  } },
    Pa = { a: function a(b) {
    "undefined" === typeof b.sift && (b.sift = !1);"undefined" === typeof b.DWT && (b.DWT = !1);"undefined" === typeof b.blur && (b.blur = !1);"undefined" === typeof b.siftOutWidth && (b.siftOutWidth = !1);"undefined" === typeof b.density && (b.density = 1);var d = !1;if (b.mask) {
      d = !0;SETTINGS && void 0 !== SETTINGS.dc && (b.mask = SETTINGS.dc + b.mask);var e = Z.a({ isFloat: !1, url: b.mask });
    }var k = !1,
        m = "undefined" !== typeof b.preprocessing ? b.preprocessing : !1,
        l = !1,
        t = !1;b.sift ? Sift.l({ Dc: _a, ja: !1, width: b.size, Ud: b.siftOutWidth }) : b.DWT && DWT.l({ Dc: _a, ja: !1, width: b.size });var n = !1;b.customInputShader && (n = "s43", u.ib({ name: "_", id: n, c: b.customInputShader, f: ["uSource"], precision: "lowp" }), u.H(n, [{ type: "1i", name: "_", value: 0 }]));switch (m) {case "sobel":
        var q = "s32";l = !0;break;case "meanNormalization":
        q = "s33";l = !0;break;case "grayScale":
        q = "s29";l = !1;break;case "grayScaleTilt":
        q = "s30";t = !0;l = !1;break;case "rgbGrayTilt":
        q = "s31";t = !0;l = !1;break;case "copy":
        q = n ? n : "s0";break;case "inputLightRegulation":
        q = n ? n : "s29";Sa.l({ width: b.size, Hb: b.nBlurPass, Gc: !1 });k = !0;break;case "direct":case "none":
        q = !1;break;default:
        q = "s3";}t && u.H(q, [{ name: "u28", type: "1f", value: b.tilt }]);d && (q += "Mask");if (b.blur) var h = Z.a({ isFloat: !1, isPot: !1, width: b.size });var w = Z.a({ isFloat: !1, isPot: !1, width: b.size }),
        v = { A: function A() {
        return b.sift ? Sift.ma() : b.size;
      }, ma: function ma() {
        return v.A();
      }, Ac: function Ac() {
        return b.sift ? Sift.ya() : b.DWT ? DWT.ya() : k ? Sa.ya() : w;
      }, F: function F() {
        H.T();b.blur && (h.B(), u.set("s44"), u.P("u7", 1 / b.size, 1 / b.size), M.g(!1, !0), h.b(0));q && (u.set(q), l && u.v("u29", 1 / b.size), w.B(), d && e.b(1), M.g(!1, !1), w.b(0), k ? Sa.$a(w) : b.sift ? (u.Z(), Sift.$a()) : b.DWT && (u.Z(), DWT.$a(4)));
      } };return v;
  } },
    Qa = { a: function a(b) {
    "undefined" === typeof b.disableNormalize && (b.disableNormalize = !1);var d = [],
        e = [],
        k,
        m,
        l = !1,
        t,
        n = !0,
        q,
        h,
        w = b.isReorganize ? b.isReorganize : !1,
        v = b.kernelsNumber ? !0 : !1,
        C = b.dynPelu ? Oa.a(b.dynPelu) : !1,
        E = C ? !0 : !1,
        N = { isEnabled: !1 },
        O;if ("softmax" === b.type) {
      b.activation = "softmax";b.size = Math.pow(2, Math.ceil(Math.log2(Math.sqrt(b.num_classes))));b.sparsity = "undefined" !== typeof b.sparsity ? b.sparsity : b.X.ma();b.gain = "undefined" !== typeof b.gain ? b.gain : 1;u.H("s20", [{ type: "1f", name: "u10", value: b.gain }]);var S = Z.a({ isFloat: !0, isPot: !1, width: b.size }),
          G = Z.a({ isFloat: !0, isPot: !1, width: b.size, isMipmap: !0 });n = !1;var g = new Uint8Array(Math.pow(4 * b.size, 2)),
          A;for (A = 0; A < b.size * b.size; ++A) {
        var B = A < b.num_classes ? 255 : 0;g[4 * A] = B;g[4 * A + 1] = B;g[4 * A + 2] = B;g[4 * A + 3] = B;
      }var ea = Z.a({ isFloat: !1, isPot: !1, width: b.size, array: g });
    } else b.cost ? (b.sparsity = "undefined" !== typeof b.sparsity ? b.sparsity : b.X.ma(), n = !1) : "full" === b.connectivityUp && (b.sparsity = b.X.ma());var xa = { elu: "s15", elu01: "s16", relu: "s14", arctan: "s18", sigmoid: "s13", copy: "s0", softplus: "s19", softmax: "s20", dynPelu: "s17" }[b.activation],
        Ea = b.sparsity * b.sparsity,
        ua = !1,
        da = b.size;if (b.maxPooling) {
      switch (b.maxPooling.size) {case 2:
          var c = "s34";break;case 4:
          c = "s35";}ua = !0;da /= b.maxPooling.size;var _F = Z.a({ isFloat: !0,
        isPot: !1, width: da });
    }var L = void 0 !== b.Nc && b.Nc ? !0 : !1,
        T = null,
        ia = null,
        fa = null;L && (T = "s45" + b.index.toString(), u.xb("s45", T, [((b.normalization.n - 1) / 2).toFixed(1)]), u.H(T, [{ type: "1i", name: "u1", value: 0 }, { type: "2f", name: "u7", value: [1 / b.size, 1 / b.size] }, { type: "1f", name: "u6", value: b.normalization.alpha }, { type: "1f", name: "u9", value: b.normalization.beta }, { type: "1f", name: "u33", value: b.normalization.k }]), ia = Z.a({ isFloat: !0, isPot: !0, width: b.size }), fa = Z.a({ isFloat: !0, isPot: !0, width: b.size }));var ma, ra, ka, ja;n && (ja = Z.a({ isFloat: !0, isPot: !1, width: b.size }));var va = Z.a(b.bias),
        X,
        K = { A: function A() {
        return b.size;
      }, ma: function ma() {
        return da;
      }, vb: function vb() {
        return b.num_classes;
      }, fc: function fc(r) {
        O.b(r);
      }, Qc: function Qc() {
        b.remap && b.remap.isEnabled && (N = { isEnabled: !0, Jc: Z.a({ isFloat: !1, isFlipY: !1, array: new Uint8Array(b.remap.maskTexture.data), width: b.remap.maskTexture.width, isPot: !1 }), layers: b.remap.layers.map(function (r) {
            return b.parent.zc(r);
          }), depth: b.remap.depth });
      }, Wc: function Wc() {
        switch (b.connectivityUp) {case "gaussian":
            X = Ua.a(b.connectivity);
            break;case "direct":
            X = Va.a(b.connectivity);break;case "square":
            X = Wa.a(b.connectivity);break;case "squareFast":
            X = Xa.a(b.connectivity, b.activation);break;case "full":
            X = Ya.a(b.connectivity);break;case "conv":
            h = b.kernelsNumber, X = Za.a(b.connectivity), w && (q = Z.a({ width: da, isFloat: !0, isFlipY: !1, isPot: !1 }));}if (X.Y) {
          var r = b.size * b.sparsity;ra = Math.log(r / b.size) / Math.log(2);ma = Z.a({ isMipmap: !0, isFloat: !0, isPot: !0, width: r, Fb: ra });ka = Z.a({ isFloat: !0, isPot: !0, width: b.size });
        }
      }, F: function F(r, P) {
        O = r;X.Y ? (ma.B(), v && va.b(2), X.F(N), ma.b(0), ma.sb(ra), ka.B(), v ? u.set("s0") : (u.set("s28"), u.v("u27", Ea), va.b(1)), ma.lb(ra, 0), M.g(!1, !1), u.set(xa), L ? ia.j() : ja.j(), ka.b(0), E && C.qc(), M.g(!1, !1)) : (ja.B(), va.b(1), X.F());L && (u.set(T), fa.j(), ia.b(0), M.g(!1, !1), u.set("s46"), u.v("u6", 1), ja.j(), fa.b(1), M.g(!1, !1));if (n) return ua ? (_F.B(), ja.b(0), u.set(c), u.P("u7", 1 / b.size, 1 / b.size), M.g(!1, !1), P = _F) : P = ja, P.b(0), w && (q.j(), u.set("s22"), u.P("u14", h, da / h), M.g(!1, !1), P = q, q.b(0)), P;if ("softmax" === b.type) {
          u.set("s20");ja.b(0);S.j();M.g(!1, !1);b.disableNormalize ? r = S : (u.set("s2"), S.b(0), ea.b(1), G.j(), M.g(!1, !1), u.set("s0"), m.B(), G.b(0), G.sb(!1), M.g(!1, !1), u.set("s21"), k.B(), G.lb(!1, 0), u.v("u12", ja.Bc()), m.b(1), M.g(!1, !1), r = k);if (P) {
            switch (l) {case "cpuRGBAAvg":
                break;default:
                var U = K.Ob(r);}return U;
          }return !1;
        }if (b.cost) {
          u.set("gpuRawAvg" === l ? "s8" : "s7");P = ja;b.disableNormalize || (u.v("u4", 1 / b.size), k.B(), ja.b(0), M.g(!1, !1), P = k);switch (l) {case "cpuRGBA2Float":
              P.ob();U = K.Ob(P);t(U);break;case "gpuRawAvg":case "gpuRaw":
              P.b(0), t(P);}return !1;
        }
      },
      lc: function lc(r) {
        r && "undefined" !== typeof r.Mb && (l = r.Mb, t = r.Pc);ja = Z.a({ isFloat: !0, isPot: !0, isMipmap: "softmax" === b.type, width: b.size });"softmax" === b.type && (m = Z.a({ isFloat: !0, isPot: !0, width: 1 }));var P = 0,
            U = 0,
            aa = "undefined" !== typeof b.num_classes && b.num_classes ? b.num_classes : b.size * b.size;for (r = 0; r < aa; ++r) {
          d.push(P + (b.size - 1 - U) * b.size), e.push([-1, -1, -1, -1]), ++P, P === b.size && (P = 0, ++U);
        }b.disableNormalize || (k = Z.a({ isFloat: !0, isPot: !0, width: b.size }));
      }, Ob: function Ob(r) {
        r.ob();var P = r.Pb();d.forEach(function (U, aa) {
          e[aa][0] = P[0][U];e[aa][1] = P[1][U];e[aa][2] = P[2][U];e[aa][3] = P[3][U];
        });return e;
      } };b.X && K.Wc(b.X);return K;
  } };
function $a() {
  var b = { Nd: !1 },
      d,
      e,
      k;b || (b = {});this.zc = function (m) {
    return d[m];
  };this.Tc = function (m) {
    var l = !1;d = m.map(function (t, n) {
      return l = t = Ra.a({ index: n, parent: this, bd: t, X: l });
    });e = d[0];k = d[d.length - 1];d.forEach(function (t, n) {
      0 !== n && t.Qc();
    });
  };this.F = function (m, l) {
    var t = l;d.forEach(function (n) {
      t = n.F(t, m);
    });return t;
  };this.tb = function () {
    return e.A();
  };this.ya = function () {
    return k.Ac();
  };this.Vc = function (m) {
    k.lc(m);
  };this.vb = function () {
    return k.vb();
  };
}
var Va = { a: function a(b) {
    var d = Z.a(b.weights);delete b.weights.data;return { Y: !0, la: function la() {
        return 1;
      }, Cc: function Cc() {
        return d;
      }, F: function F() {
        u.set("s27");d.b(1);M.g(!1, !1);
      } };
  } },
    Ya = { a: function a(b) {
    var d = b.fromLayerSize,
        e = Z.a(b.weights);return { Y: !0, la: function la() {
        return d;
      }, F: function F(k) {
        if (k.isEnabled) {
          u.set("s25");k.Jc.b(3);var m,
              l = Math.min(k.layers.length, k.depth);for (m = 0; m < l; ++m) {
            k.layers[m].fc(4 + m);
          }
        } else u.set("s24");u.v("u18", b.toLayerSize);e.b(1);M.g(!1, !1);
      } };
  } },
    Ua = { a: function a(b) {
    var d = b.toSparsity * b.toLayerSize,
        e = d / b.fromLayerSize,
        k = Z.a(b.weights);Z.a({ width: d, isFloat: !0, array: new Float32Array(b.fromBindings), isPot: !0 });var m = Z.a({ width: d, isFloat: !0, array: new Float32Array(b.toBindings), isPot: !0 });return { Y: !0, la: function la() {
        return e;
      }, F: function F() {
        u.set("s23");k.b(1);m.b(2);M.g(!1, !0);
      } };
  } },
    Wa = { a: function a(b) {
    var d = b.fromLayerSize,
        e = b.toLayerSize,
        k = b.toSparsity,
        m = k * e,
        l = m / d,
        t = d / e,
        n,
        q,
        h,
        w,
        v = 0,
        C = 0,
        E = 0,
        N = Array(k * e * k * e * 4),
        O = Array(k * e * k * e * 4),
        S = Array(d * d);for (n = 0; n < S.length; ++n) {
      S[n] = 0;
    }var G = Math.floor(k / 2),
        g = .5 / e,
        A = .5 / d,
        B = .5 / m;for (n = 0; n < e; ++n) {
      for (q = 0; q < e; ++q) {
        var ea = Math.round(n * t);var xa = Math.round(q * t);var Ea = n / e;var ua = q / e;Ea += g;ua += g;for (h = 0; h < k; ++h) {
          for (w = 0; w < k; ++w) {
            var da = v / m;var c = C / m;var F = ea + h - G;var L = xa + w - G;0 > F && (F += d);0 > L && (L += d);F >= d && (F -= d);L >= d && (L -= d);var T = F / d;var ia = L / d;c = 1 - c - 1 / m;T += A;ia += A;da += B;c += B;var fa = n * k + h,
                ma = q * k + w;ma = e * k - ma - 1;fa = ma * e * k + fa;N[4 * fa] = da;N[4 * fa + 1] = c;N[4 * fa + 2] = T;N[4 * fa + 3] = ia;T = S[L * d + F]++;ia = T % l;F = F * l + ia;L = L * l + (T - ia) / l;L = d * l - 1 - L;L = L * d * l + F;O[4 * L] = da;O[4 * L + 1] = c;O[4 * L + 2] = Ea;O[4 * L + 3] = ua;++v >= m && (v = 0, ++C);++E;
          }
        }
      }
    }var ra = Z.a(b.weights);Z.a({ width: m, isFloat: !0, array: new Float32Array(O), isPot: !0 });O = null;var ka = Z.a({ width: m, isFloat: !0, array: new Float32Array(N), isPot: !0 });N = null;return { Y: !0, la: function la() {
        return l;
      }, F: function F() {
        u.set("s23");ra.b(1);ka.b(2);M.g(!1, !1);
      } };
  } },
    Za = { a: function a(b) {
    var d = b.kernelsNumber,
        e = b.toSparsity,
        k = e * b.toLayerSize / b.fromLayerSize,
        m = Z.a(b.weights);return { Y: !0, la: function la() {
        return k;
      }, Jd: function Jd() {
        return e;
      }, Cc: function Cc() {
        return m;
      }, F: function F() {
        u.set("s26");
        u.v("u24", d);u.v("u25", e);u.v("u18", b.toLayerSize);u.v("u26", b.fromLayerSize);m.b(1);M.g(!1, !1);
      } };
  } },
    Xa = { a: function a(b, d) {
    var e = b.fromLayerSize,
        k = b.toLayerSize,
        m = b.toSparsity,
        l = b.stride ? b.stride : 1,
        t = m * k / e,
        n = k < e,
        q = e / k,
        h = Z.a(b.weights),
        w = "s47" + [e.toString(), k.toString(), m.toString(), l.toString(), d].join("_");u.tc(w) || (b = Fa(d), k = [{ type: "1f", name: "u18", value: k }, { type: "1f", name: "u32", value: l }], n && k.push({ type: "1f", name: "u26", value: e }), e = [(n ? t : m).toFixed(1), b], n && e.push(q.toFixed(1)), u.xb(n ? "s40" : "s39", w, e), u.H(w, k.concat([{ type: "1i", name: "u16", value: 0 }, { type: "1i", name: "u23", value: 1 }, { type: "1i", name: "u15", value: 3 }])));return { Y: !1, la: function la() {
        return t;
      }, F: function F() {
        u.set(w);h.b(3);M.g(!1, !1);
      } };
  } },
    Sa = function () {
  var b, d, e, k, m, _l3, t, n, q;return { l: function l(h) {
      b = h.Hb ? h.Hb : 3;d = h.width ? h.width : 64;k = h.Gc ? !0 : !1;h = { isFloat: !1, width: d, isPot: !1, isFlipY: !1 };m = Z.a(h);_l3 = Z.a(h);t = Z.a(h);n = Z.a(h);q = Z.a({ isFloat: !0, width: d, isPot: !1, isFlipY: !1 });e = 1 / d;
    }, $a: function $a(h) {
      u.set("s37");for (var w = 0; w < b; ++w) {
        m.j(), u.P("u7", e, 0), M.g(k, !1), _l3.j(), m.b(0), u.P("u7", 0, e), M.g(k, !1), _l3.b(0);
      }u.set("s36");n.j();h.b(0);M.g(k);u.set("s37");for (w = 0; w < b; ++w) {
        t.j(), n.b(0), u.P("u7", e, 0), M.g(k, !1), n.j(), t.b(0), u.P("u7", 0, e), M.g(k, !1);
      }u.set("s38");q.j();h.b(0);_l3.b(1);n.b(2);M.g(k, !1);q.b(0);
    }, ya: function ya() {
      return q;
    } };
}();function ab(b, d) {
  b[d] = !0;b.setAttribute(d, "true");
}function bb() {
  return (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
  );
}
function cb() {
  var b = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);return [parseInt(b[1], 10), parseInt(b[2], 10), parseInt(b[3] || 0, 10)];
}function db() {
  var b = navigator.userAgent.toLowerCase();return -1 !== b.indexOf("safari") && -1 === b.indexOf("chrome") ? !0 : !1;
}function eb() {
  return navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? !0 : !1;
}
function fb(b) {
  if (!b) return b;var d = !1;if (b.video) {
    var e = function e(k) {
      var m = {};"undefined" !== typeof k.min && (m.min = k.min);"undefined" !== typeof k.max && (m.max = k.max);"undefined" !== typeof k.ideal && (m.ideal = k.ideal);return m;
    };d = {};"undefined" !== typeof b.video.width && (d.width = e(b.video.width));"undefined" !== typeof b.video.height && (d.height = e(b.video.height));"undefined" !== typeof b.video.facingMode && (d.facingMode = b.video.facingMode);
  }d = { audio: b.audio, video: d };"undefined" !== typeof b.deviceId && (d.deviceId = b.deviceId);
  return d;
}function gb(b) {
  var d = b.video.width;b.video.width = b.video.height;b.video.height = d;return b;
}
function hb(b) {
  function d(v) {
    return [480, 576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366, 1920].sort(function (C, E) {
      return Math.abs(C - v) - Math.abs(E - v);
    });
  }function e(v) {
    var C = fb(b);k.push(v(C));
  }var k = [];if (!b || !b.video) return k;if (b.video.width && b.video.height) {
    if (b.video.width.ideal && b.video.height.ideal) {
      var m = d(b.video.width.ideal).slice(0, 3),
          l = d(b.video.height.ideal).slice(0, 3),
          t = {},
          n = 0;for (t.S = void 0; n < m.length; t = { S: t.S }, ++n) {
        t.S = m[n];var q = {},
            h = 0;for (q.R = void 0; h < l.length; q = { R: q.R }, ++h) {
          if (q.R = l[h], t.S !== b.video.width.ideal || q.R !== b.video.height.ideal) {
            var w = Math.max(t.S, q.R) / Math.min(t.S, q.R);w < 4 / 3 - .1 || w > 16 / 9 + .1 || e(function (v, C) {
              return function (E) {
                E.video.width.ideal = v.S;E.video.height.ideal = C.R;return E;
              };
            }(t, q));
          }
        }
      }
    }e(function (v) {
      return gb(v);
    });
  }b.video.width && b.video.height && (b.video.width.ideal && b.video.height.ideal && e(function (v) {
    delete v.video.width.ideal;delete v.video.height.ideal;return v;
  }), e(function (v) {
    delete v.video.width;delete v.video.height;return v;
  }));b.video.facingMode && (e(function (v) {
    delete v.video.facingMode;
    return v;
  }), b.video.width && b.video.height && e(function (v) {
    gb(v);delete v.video.facingMode;return v;
  }));k.push({ audio: b.audio, video: !0 });return k;
}function ib(b) {
  try {
    var d = window.matchMedia("(orientation: portrait)").matches ? !0 : !1;
  } catch (k) {
    d = window.innerHeight > window.innerWidth;
  }if (d && b && b.video) {
    d = b.video.width;var e = b.video.height;d && e && d.ideal && e.ideal && d.ideal > e.ideal && (b.video.height = d, b.video.width = e);
  }
}
function jb(b) {
  b.volume = 0;ab(b, "muted");if (db()) {
    if (1 === b.volume) {
      var d = function d() {
        b.volume = 0;window.removeEventListener("mousemove", d, !1);window.removeEventListener("touchstart", d, !1);
      };window.addEventListener("mousemove", d, !1);window.addEventListener("touchstart", d, !1);
    }setTimeout(function () {
      b.volume = 0;ab(b, "muted");
    }, 5);
  }
}
function kb(b, d, e) {
  return new Promise(function (k, m) {
    if (b.srcObject && b.srcObject.getVideoTracks) {
      var l = b.srcObject.getVideoTracks();1 !== l.length ? m("INVALID_TRACKNUMBER") : (l = l[0], d ? lb(b, k, m, e) : (l.stop(), k()));
    } else m("BAD_IMPLEMENTATION");
  });
}
function mb(b, d, e, k) {
  function m(t) {
    l || (l = !0, e(t));
  }var l = !1;navigator.mediaDevices.getUserMedia(k).then(function (t) {
    function n() {
      setTimeout(function () {
        if (b.currentTime) {
          var q = b.videoWidth,
              h = b.videoHeight;if (0 === q || 0 === h) m("VIDEO_NULLSIZE");else {
            q && (b.style.width = q.toString() + "px");h && (b.style.height = h.toString() + "px");q = { kc: null, ad: null, Kc: null };try {
              var w = t.getVideoTracks()[0];w && (q.Kc = w, q.kc = w.getCapabilities(), q.ad = w.getSettings());
            } catch (v) {}db() || bb() ? b.parentNode && null !== b.parentNode ? (l || d(b, t, q), setTimeout(function () {
              b.play();
            }, 100)) : (document.body.appendChild(b), jb(b), l || d(b, t, q), setTimeout(function () {
              b.style.transform = "scale(0.0001,0.0001)";b.style.position = "fixed";b.style.bottom = "0px";b.style.right = "0px";jb(b);setTimeout(function () {
                b.play();
              }, 100);
            }, 80)) : l || d(b, t, q);
          }
        } else m("VIDEO_NOTSTARTED");
      }, 700);
    }"undefined" !== typeof b.srcObject ? b.srcObject = t : (b.src = window.URL.createObjectURL(t), b.videoStream = t);jb(b);b.addEventListener("loadeddata", function () {
      var q = b.play();jb(b);"undefined" === typeof q ? n() : q.then(function () {
        n();
      }).catch(function () {
        m("VIDEO_PLAYPROMISEREJECTED");
      });
    }, !1);
  }).catch(function (t) {
    m(t);
  });
}
function lb(b, d, e, k) {
  if (b) {
    if (eb()) {
      if (k && k.video) {
        if (bb()) {
          var m = cb();(12 > m[0] || 12 === m[0] && 2 > m[1]) && ib(k);
        }k.video.width && k.video.width.ideal && (b.style.width = k.video.width.ideal + "px");k.video.height && k.video.height.ideal && (b.style.height = k.video.height.ideal + "px");
      }ab(b, "autoplay");ab(b, "playsinline");k && k.audio ? b.volume = 0 : ab(b, "muted");mb(b, d, function () {
        function l(n) {
          if (0 === n.length) e("INVALID_FALLBACKCONSTRAINTS");else {
            var q = n.shift();mb(b, d, function () {
              l(n);
            }, q);
          }
        }var t = hb(k);l(t);
      }, k);
    } else e && e("MEDIASTREAMAPI_NOTFOUND");
  } else e && e("VIDEO_NOTPROVIDED");
}function nb(b) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return b(!1, "NOTSUPPORTED"), !1;navigator.mediaDevices.enumerateDevices().then(function (d) {
    (d = d.filter(function (e) {
      return e.kind && -1 !== e.kind.toLowerCase().indexOf("video") && e.label && e.deviceId;
    })) && d.length && 0 < d.length ? b(d, !1) : b(!1, "NODEVICESFOUND");
  }).catch(function () {
    b(!1, "PROMISEREJECTED");
  });
}
window.JEEFACEFILTERAPI = function () {
  var b, d, e, k, m, l, t, n, q, h, w, v, C, E;function N() {
    return -1 !== [U.play, U.pause].indexOf(aa);
  }function O(f) {
    if (aa !== U.pause) {
      var p = aa === U.play ? J.ta : r.cc;x = setTimeout(A.bind(null, f), p);
    }
  }function S() {
    if (aa === U.play) return !1;aa = U.play;I.timestamp = Date.now();Q && window.cancelAnimationFrame(Q);A(0);
  }function G(f, p, z, V, R) {
    f = 4 * (3 * p + f) + z;return V + (Ca[f] / 255 + Ca[f + 12] / 65025) * (R - V);
  }function g() {
    H.T();M.reset();Z.reset();u.Z();u.pb();_a.disable(_a.DEPTH_TEST);_a.disable(_a.BLEND);M.ha();u.pa();
  }
  function A() {
    if (aa !== U.pause) {
      u.pb();M.reset();M.ha();_a.disable(_a.DEPTH_TEST);H.T();u.pa();if (!y.Wa) {
        var f = y.element.currentTime - y.Da;0 > f && (y.Da = y.element.currentTime);1E3 * f < r.hd || (y.qa.refresh(), y.Da += f, u.set("s50"), y.ra.B(), y.qa.b(0), M.g(!1, !1));
      }if (D.K.length > I.G) D.K.splice(0, D.K.length - I.G);else for (; D.K.length < I.G;) {
        D.K.push(0);
      }if (1 !== D.i) if (sa.every(c)) {
        for (var p = 0, z = f = 0; z < sa.length; ++z) {
          sa[z].detected > p && (p = sa[z].detected, f = 0);
        }for (p = 0; p < I.G; ++p) {
          D.K[p] = f;
        }
      } else {
        p = 0;f = !1;for (z = D.Eb; p < I.G; ++p) {
          if (c(sa[z])) if (f) {
            do {
              ++z === D.i && (z = 0);
            } while (c(sa[z]));
          } else f = !0;D.K[p] = z++;z >= D.i && (z = 0);
        }D.Eb = z;
      }for (f = 0; f < I.G; ++f) {
        D.U = D.K[f], D.Za = (.5 + D.U) / D.i, D.Bb = D.K.lastIndexOf(D.U) === f, u.set("s51"), J.ba && u.v("u38", sa[D.U].rz), 1 !== D.i && u.v("u37", D.Za), ya.B(), y.ra.b(0), Ba.b(1), M.g(!1, !1), ya.b(0), za.F(!1, ya);
      }f = Date.now();I.ka = f - I.timestamp;I.timestamp = f;-1 !== W.nDetectsPerLoop ? I.G = W.nDetectsPerLoop : (f = r.Ia, I.Jb = I.Ib / I.ka, I.Kb = I.Jb * f + I.Kb * (1 - f), I.Lb = 1E3 / I.ka, I.da = I.Lb * r.Ia + I.da * (1 - r.Ia), I.da > r.aa[1] ? (f = r.sa[1], 1 < D.i && (++f, p = sa.filter(F).length, f *= Math.max(1, p)), I.G = Math.min(I.G + 1, f), I.da = (r.aa[0] + r.aa[1]) / 2) : I.da < r.aa[0] && (I.G = Math.max(I.G - 1, r.sa[0]), I.da = (r.aa[0] + r.aa[1]) / 2));H.J();_a.viewport(0, 0, 3, 2 * D.i);u.set("s49");Ba.b(0);M.g(!1, !1);_a.readPixels(0, 0, 3, 2 * D.i, _a.RGBA, _a.UNSIGNED_BYTE, Ca);for (f = 0; f < D.i; ++f) {
        if (-1 !== D.K.indexOf(f)) {
          var V = f;p = Y[V];var R = [V];z = sa[V];var na = qa[V],
              ta = 2 * V;p.wa = G(1, ta, 3, 0, 1);z.detected = oa(z.detected, p.wa, r.$b);if (p.wa < r.Ya) J.ba && (z.rz = 0);else {
            p.x = G(0, ta, 1, -1, 1);p.y = G(0, ta, 2, -1, 1);p.M = G(0, ta, 3, 0, 1);p.ab = G(1, ta, 0, -ha[0], ha[0]);p.bb = G(1, ta, 1, -ha[1], ha[1]);p.oa = G(1, ta, 2, -ha[2], ha[2]);for (var Ha = 0; Ha < r.Ca; ++Ha) {
              p.rb[Ha] = r.uc[Ha](G(2, ta, Ha, 0, 1));
            }R.Pa = p.x - z.x;R.Qa = p.y - z.y;R.Oa = p.M - z.s;R.La = p.ab - z.rx;R.Ma = p.bb - z.ry;R.Na = J.ba ? p.oa : p.oa - z.rz;ta = Math.sqrt(R.Pa * R.Pa + R.Qa * R.Qa + R.Oa * R.Oa) / I.ka;R = Math.sqrt(R.La * R.La + R.Ma * R.Ma + R.Na * R.Na) / I.ka;ta = 1 - Da(ba.translationFactorRange[0], ba.translationFactorRange[1], ta);R = 1 - Da(ba.rotationFactorRange[0], ba.rotationFactorRange[1], R);R = ta * R * Da(ba.qualityFactorRange[0], ba.qualityFactorRange[1], p.wa);V = na[++Ta[V] % na.length] = R;for (ta = 0; ta < na.length; ++ta) {
              V = Math.min(V, na[ta]);
            }V = Math.max(.5, V);R = Math.min(V, R);na = oa(ba.alphaRange[1], ba.alphaRange[0], Math.pow(R, r.bc));z.x = oa(z.x, p.x, na);z.y = oa(z.y, p.y, na);z.s = oa(z.s, p.M, na);z.rx = oa(z.rx, p.ab, na);z.ry = oa(z.ry, p.bb, na);z.rz = J.ba ? z.rz + na * p.oa : oa(z.rz, p.oa, na);na = Math.max(na, r.ac);for (V = 0; V < r.Ca; ++V) {
              z.expressions[V] = oa(z.expressions[V], p.rb[V], na);
            }++p.Ba;
          }
        }
      }H.fd();H.reset();Z.reset();_a.enable(_a.DEPTH_TEST);J.va && (1 === D.i ? J.va(sa[0]) : J.va(sa));_a.disable(_a.BLEND);
      aa === U.play && (Q = window.requestAnimationFrame(O));
    }
  }function B() {
    function f(z) {
      for (var V = [], R = 0; R < D.i; ++R) {
        V.push(_extends({}, z));
      }return V;
    }y.ra = Z.a({ isPot: !1, isLinear: !0, isFloat: !1, width: ca, height: pa });ya = Z.a({ isPot: !0, isFloat: !1, width: za.tb() });var p = { width: 3, height: D.i, isFloat: !0, isPot: !1, array: function (z) {
        for (var V = new Float32Array(z.length * D.i), R = 0, na; R < D.i; ++R) {
          for (na = 0; na < z.length; ++na) {
            V[R * z.length + na] = z[na];
          }
        }return V;
      }(new Float32Array([0, W.borderWidth, W.borderHeight, 0, 0, 0, 0, 0, 0, 0, 0, 0])) };Ba = Na.a(p);Ca = new Uint8Array(8 * p.width * D.i);Y = f({ wa: 0, x: 0, y: 0, M: 1, ab: 0, bb: 0, oa: 0, rb: new Float32Array(r.Ca), Ba: 0 });sa = f({ detected: 0, x: 0, y: 0, s: 1, rx: 0, ry: 0, rz: 0, expressions: new Float32Array(r.Ca) });f({ Pa: 0, Qa: 0, Oa: 0, La: 0, Ma: 0, Na: 0 });
  }function ea() {
    u.H("s51", [{ type: "1i", name: "u1", value: 0 }, { type: "1i", name: "u35", value: 1 }, { type: "2f", name: "u36", value: wa }, { type: "1f", name: "u37", value: .5 }, { type: "1f", name: "u38", value: 0 }]);u.H("s52", [{ type: "1i", name: "u39", value: 0 }, { type: "1i", name: "u35", value: 1 }, { type: "1f", name: "u42",
      value: r.ed }, { type: "1f", name: "u43", value: r.Xb }, { type: "1f", name: "u44", value: r.Wb }, { type: "3f", name: "u41", value: [r.eb[0] * wa[0], r.eb[1] * wa[1], r.eb[2]] }, { type: "1f", name: "u37", value: .5 }, { type: "1f", name: "u45", value: 1 }, { type: "1f", name: "u38", value: 0 }]);var f = [{ type: "1i", name: "u39", value: 0 }];u.H("s53", f);u.H("s54", f);u.H("s49", [{ type: "1i", name: "u35", value: 0 }, { type: "1f", name: "u48", value: wa[0] }, { type: "2f", name: "u47", value: [0, .5 / D.i] }]);
  }function xa() {
    var f = za.tb(),
        p = ca / f;l = W.minScale * p;t = W.maxScale * p;n = (1 - 2 * W.borderWidth) / W.nStepsX;q = (1 - 2 * W.borderHeight) / W.nStepsY;h = (t - l) / W.nStepsScale;w = W.borderWidth;v = W.borderHeight;C = 1 - W.borderWidth;E = 1 - W.borderHeight;wa = [f / ca, f / pa];b = W.borderWidth;d = W.borderHeight;e = l;k = W.borderWidth;m = W.borderHeight;la = l;
  }function Ea(f) {
    if (J.ea) ua("string" === typeof J.ea ? JSON.parse(J.ea) : J.ea, f);else {
      var p = J.gb;"JSON" !== p.toUpperCase().split(".").pop() && (p += r.save);Aa(p, function (z) {
        z = JSON.parse(z);ua(z, f);
      });
    }
  }function ua(f, p) {
    f.exportData && f.exportData.thetaXYZfactor && (ha = f.exportData.thetaXYZfactor);
    p(f);
  }function da() {
    if (Ma.l({ ja: J.N, width: ca, height: pa, debug: !1, Oc: function Oc() {
        X("GLCONTEXT_LOST");
      }, antialias: !0, premultipliedAlpha: !0 })) {
      if (Ma.Fc()) return !0;X("GL_INCOMPATIBLE");return !1;
    }X("GL_INCOMPATIBLE");return !1;
  }function c(f) {
    return f.detected < r.Ya;
  }function F(f) {
    return f.detected > r.Ya;
  }function L(f, p, z, V) {
    return z > f ? Math.max(0, f + p / 2 - (z - V / 2)) : Math.max(0, z + V / 2 - (f - p / 2));
  }function T() {
    return Y.some(function (f, p) {
      if (p === D.U) return !1;p = Y[D.U];if (p.Ba > f.Ba || 3 > f.Ba || L(p.x / 2, p.M, f.x / 2, f.M) < r.Gb * p.M) return !1;
      var z = ca / pa;return L(p.y / 2, p.M * z, f.y / 2, f.M * z) > r.Gb * p.M * z;
    });
  }function ia() {
    var f = D.U;Ba.Xc(1);1 !== D.i && (_a.viewport(0, 0, 3, D.i), u.set("s0"), u.Rb("u1", 1), M.g(!1, !1), u.Rb("u1", 0));_a.viewport(0, f, 1, 1);u.set("s52");J.ba && u.v("u38", sa[f].rz);1 !== D.i && u.v("u37", D.Za);if (1 < D.i) {
      var p = T() ? 0 : 1;u.v("u45", p);
    }u.Zc("u40", k, m, la);M.g(!1, !1);D.Bb && (_a.viewport(1, f, 1, 1), u.set("s53"), M.g(!1, !1), _a.viewport(2, f, 1, 1), u.set("s54"), M.g(!1, !1));e += h;e > t && (b += n, e = l, b > C && (b = w, d += q, d > E && (d = v)));k = b + .8 * (Math.random() - .5) * n;m = d + .8 * (Math.random() - .5) * q;la = e + .8 * (Math.random() - .5) * h;
  }function fa() {
    y.qa = Z.a({ D: y.element, isPot: !1, isFloat: !1, isFlipY: !0 });
  }function ma() {
    u.H("s50", [{ type: "1i", name: "u1", value: 0 }, { type: "mat2", name: "u34", value: y.o }]);
  }function ra() {
    y.C[0] = .5;y.C[1] = .5;var f = y.O[1] / y.O[0],
        p = Ma.L() / Ma.A();90 === Math.abs(P.rotate) && (f = 1 / f);f > p ? y.C[1] *= p / f : y.C[0] *= f / p;u.H("s52", [{ name: "u46", type: "1f", value: p }]);y.o[0] = 0;y.o[1] = 0;y.o[2] = 0;y.o[3] = 0;switch (P.rotate) {case 0:
        y.o[0] = y.C[0];y.o[3] = y.C[1];break;case 180:
        y.o[0] = -y.C[0];
        y.o[3] = -y.C[1];break;case 90:
        y.o[1] = y.C[0];y.o[2] = -y.C[1];break;case -90:
        y.o[1] = -y.C[0], y.o[2] = y.C[1];}P.flipX && (y.o[0] *= -1, y.o[2] *= -1);
  }function ka() {
    var f = y.element.videoWidth,
        p = y.element.videoHeight,
        z = y.O[0] !== f || y.O[1] !== p;z && (y.O[0] = f, y.O[1] = p);return z;
  }function ja(f, p) {
    if (aa === U.error) return !1;y.element = f;ka();p && p();return !0;
  }function va(f, p, z) {
    f && f();y.Ka = { video: { facingMode: { ideal: P.facingMode }, width: { min: P.minWidth, max: P.maxWidth, ideal: P.idealWidth }, height: { min: P.minHeight, max: P.maxHeight, ideal: P.idealHeight } },
      audio: !1 };P.deviceId && (constraints.deviceId = P.deviceId);lb(eb() ? document.createElement("video") : !1, function (V) {
      p && p(V);z(V);
    }, function () {
      X("WEBCAM_UNAVAILABLE");
    }, y.Ka);
  }function X(f) {
    aa !== U.error && (aa = U.error, J.ia && J.ia(f));
  }function K(f, p) {
    for (var z in f) {
      "undefined" !== typeof p[z] && (f[z] = p[z]);
    }p === W && W.nDetectsPerLoop && (I.G = W.nDetectsPerLoop, I.Ib = W.nDetectsPerLoop);
  }var r = { save: "NNC.json", jb: 0, cc: 25, Ia: .2, aa: [45, 55], kd: 1 / 3.5, sa: [2, 7], Rc: { minScale: .15, maxScale: .6,
      borderWidth: .2, borderHeight: .2, nStepsX: 6, nStepsY: 5, nStepsScale: 3, nDetectsPerLoop: -1 }, eb: [.092, .092, .3], ed: 50, Gb: .12, Ya: .6, Lc: 8, Xb: .75, Wb: 1, cd: { translationFactorRange: [.0015, .005], rotationFactorRange: [.003, .02], qualityFactorRange: [.9, .98], alphaRange: [.05, 1] }, dd: [.65, 1, .262], $b: .2, bc: 2, ac: .1, Mc: 8, Ca: 1, uc: [Da.bind(null, .3, .75)], hd: 20 },
      P = { facingMode: "user", idealWidth: 800, idealHeight: 600, minWidth: 480, maxWidth: 1280, minHeight: 480, maxHeight: 1280, rotate: 0, flipX: !1 },
      U = { Ic: -1, error: -2, wb: 0, play: 1, pause: 2 },
      aa = U.wb,
      y = { Wa: !1, element: !1, qa: !1, ra: !1, O: [0, 0], C: [.5, .5], o: [.5, 0, 0, .5], Da: 0, Ka: null },
      J = { ia: !1, va: !1, gb: "./", ea: !1, N: !1, ta: r.jb, Nb: r.jb, Aa: !1, ba: !1 },
      za,
      W = Object.create(r.Rc),
      ba = Object.create(r.cd);var la = e = m = k = d = b = t = l = E = C = v = w = h = q = n = 0;var ca,
      pa,
      wa,
      ya,
      Ba,
      Ca,
      Y,
      sa,
      x = !1,
      Q = !1,
      ha = r.dd,
      D = { i: 1, U: 0, K: [0], Bb: !1, Eb: 0, Za: 0 },
      I = { ka: 0, timestamp: 0, Jb: 0, Kb: 0, G: r.sa[0], Ib: r.sa[0], Lb: 0, da: 0, qd: 1 },
      qa = [],
      Ta = [];return { init: function init(f) {
      function p() {
        aa !== U.error && 2 === ++V && (ra(), fa(), ma(), J.ia && (J.ia(!1, { GL: _a, canvasElement: J.N,
          videoTexture: y.ra.get(), maxFacesDetected: D.i, videoElement: y.element }), g()), S());
      }if (aa !== U.wb) return f.callbackReady && f.callbackReady("ALREADY_INITIALIZED"), !1;aa = U.Ic;f.callbackReady && (J.ia = f.callbackReady);f.callbackTrack && (J.va = f.callbackTrack);"undefined" !== typeof f.animateDelay && (J.ta = f.animateDelay);"undefined" !== typeof f.NNCpath && (J.gb = f.NNCpath);"undefined" !== typeof f.NNC && (J.ea = f.NNC);"undefined" !== typeof f.maxFacesDetected && (D.i = Math.max(1, f.maxFacesDetected));"undefined" !== typeof f.followZRot && (J.ba = f.followZRot ? !0 : !1);if (D.i > r.Lc) return X("MAXFACES_TOOHIGH"), !1;if (!f.canvasId && !f.canvas) return X("NO_CANVASID"), !1;J.N = f.canvas ? f.canvas : document.getElementById(f.canvasId);if (!J.N) return X("INVALID_CANVASID"), !1;ca = J.N.width;pa = J.N.height;if (!ca || !pa) return X("INVALID_CANVASDIMENSIONS"), !1;for (var z = 0; z < D.i; ++z) {
        qa.push(new Float32Array(r.Mc)), Ta.push(0);
      }f.scanSettings && K(W, f.scanSettings);f.stabilizationSettings && K(ba, f.stabilizationSettings);var V = 0;f.videoSettings && f.videoSettings.videoElement ? ja(f.videoSettings.videoElement, p) : (f.videoSettings && K(P, f.videoSettings), va(f.onWebcamAsk, f.onWebcamGet, function (R) {
        ja(R, p);
      }));Ea(function (R) {
        if (!da()) return !1;za = new $a();za.Tc(R.layers);za.Vc({ Mb: "gpuRawAvg", Pc: ia });u.Zb([{ id: "s50", name: "_", $: "attribute vec2 a0;uniform mat2 u34;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=vec2(.5,.5)+u34*a0;}", ua: ["a0"], fa: [2], c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}", f: ["u1", "u34"], precision: "lowp" }, { id: "s51",
          name: "_", c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}", $: "attribute vec2 a0;uniform sampler2D u35;uniform vec2 u36;uniform float u37,u38;varying vec2 vv0;void main(){vec4 a=texture2D(u35,vec2(.17,u37));vec2 d=a.gb,e=a.a*u36;float b=cos(u38),c=sin(u38);vec2 g=mat2(b,c,-c,b)*a0;vv0=d+g*.5*e,gl_Position=vec4(a0,0.,1.);}", ua: ["a0"], fa: [2], f: ["u1", "u35", "u36", "u37", "u38"], precision: "lowp" }, { id: "s52", name: "_", c: "uniform sampler2D u39,u35;uniform vec3 u40,u41;uniform float u42,u43,u44,u37,u45,u38,u46;const vec4 n=vec4(1.,1.,1.,1.),o=vec4(0.,0.,0.,0.),e=vec4(.25,.25,.25,.25);void main(){vec4 g=texture2D(u39,vec2(.625,.625)),h=texture2D(u39,vec2(.875,.625)),a=texture2D(u35,vec2(.17,u37));float b=dot(g,e),i=dot(h,e);bool j=b>u43&&b>i+u44;j?a.r=2.:a.r>u42?a.r=0.:a.r>1.9?a.r+=1.:0.,a.r*=u45;if(a.r<.9)a=vec4(1.,u40);else{a.r*=step(1.9,a.r);float k=dot(e,texture2D(u39,vec2(.875,.875))),l=dot(e,texture2D(u39,vec2(.125,.625))),m=dot(e,texture2D(u39,vec2(.375,.625))),c=cos(u38),d=sin(u38);vec2 f=mat2(c,d*u46,-d/u46,c)*vec2(k,l);a.gba+=vec3(f,m)*u41*a.a;}gl_FragColor=a;}",
          $: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}", f: "u39 u35 u40 u42 u41 u45 u38 u46 u43 u44 u37".split(" ") }, { id: "s53", name: "_", $: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}", c: "uniform sampler2D u39;const vec4 e=vec4(.25,.25,.25,.25);const vec3 g=vec3(.5,.5,.5);void main(){float a=dot(e,texture2D(u39,vec2(.125,.875))),b=dot(e,texture2D(u39,vec2(.375,.875))),c=dot(e,texture2D(u39,vec2(.625,.875))),d=dot(e,texture2D(u39,vec2(.625,.625)));vec3 f=vec3(a,b,c)*.5+g;gl_FragColor=vec4(f,d);}",
          f: ["u39"] }, { id: "s54", name: "_", $: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}", c: "uniform sampler2D u39;const vec4 e=vec4(.25,.25,.25,.25);void main(){float a=dot(e,texture2D(u39,vec2(.25,.25)));gl_FragColor=vec4(a,0.,0.,0.);}", f: ["u39"] }, { id: "s49", name: "_", c: "uniform sampler2D u35;uniform vec2 u47;uniform float u48;varying vec2 vv0;void main(){float g=step(.5,mod(gl_FragCoord.y+1.5,2.)),c=step(.33,vv0.x);vec4 a=texture2D(u35,vv0+u47);a.a=mix(a.a*u48,a.a,c);vec4 d=floor(255.*a),f=255.*(255.*a-d),b=mix(d,f,g)/255.;b.x=mix(step(a.x,1.5),b.x,c),gl_FragColor=b;}",
          f: ["u35", "u48", "u47"] }]);B();xa();ea();p();
      });return !0;
    }, toggle_pause: function toggle_pause(f, p) {
      if (N()) {
        var z = null;p && (z = kb(y.element, !f, y.Ka));f ? aa === U.play && (x && (clearTimeout(x), x = !1), Q && (window.cancelAnimationFrame(Q), Q = !1), aa = U.pause) : S();return z;
      }
    }, toggle_slow: function toggle_slow(f) {
      N() && aa === U.play && (f && !J.Aa ? (J.Nb = J.ta, W.nDetectsPerLoop = 1, this.set_animateDelay(100), J.Aa = !0) : !f && J.Aa && (W.nDetectsPerLoop = -1, this.set_animateDelay(J.Nb), J.Aa = !1));
    }, set_animateDelay: function set_animateDelay(f) {
      J.ta = f;
    }, resize: function resize() {
      var f = J.N.width,
          p = J.N.height;if (!ka() && f === ca && p === pa) return !1;ca = f;pa = p;xa();ea();ra();ma();return !0;
    }, set_inputTexture: function set_inputTexture(f, p, z) {
      y.O[0] = p;y.O[1] = z;y.Wa = !0;ra();g();ma();u.set("s50");y.ra.B();_a.activeTexture(_a.TEXTURE0);_a.bindTexture(_a.TEXTURE_2D, f);M.g(!0, !0);
    }, reset_inputTexture: function reset_inputTexture() {
      ka();y.Wa = !1;ra();ma();
    }, get_videoDevices: function get_videoDevices(f) {
      return nb(f);
    }, set_scanSettings: function set_scanSettings(f) {
      K(W, f);xa();ea();
    }, set_stabilizationSettings: function set_stabilizationSettings(f) {
      K(ba, f);
    }, set_videoOrientation: function set_videoOrientation(f, p) {
      N() && (P.flipX = p, P.rotate = f, ra(), ma());
    }, update_videoElement: function update_videoElement(f, p) {
      ja(f, function () {
        fa();ra();p && p();
      });
    } };
}();
;if (typeof module !== 'undefined') {
  module.exports = JEEFACEFILTERAPI;
}