import{D as _,O as d,x as q,e as F,m as H,G as I,a4 as J,a6 as X,W as Y,t as Z,Q as ee,P as te,M as ae,A as ie,L as ne,a7 as w,a8 as O,a9 as re}from"./index-ef7d444c.js";import{m as le}from"./chunk-4BX2VUAB-8bda24da-db283955.js";import{S as se}from"./mermaid-parser.core-b60f1864-5159871e.js";import{h as E}from"./arc-0a519094-1f827ed4.js";import{l as oe}from"./ordinal-2f09267b-cbc04e27.js";import"./_baseUniq-adab9658-40112147.js";import"./_basePickBy-f5e64b16-dc6341f0.js";import"./clone-f697ed13-227c34af.js";import"./init-77b53fdd-cac434d1.js";function pe(e,a){return a<e?-1:a>e?1:a>=e?0:NaN}function ce(e){return e}function ue(){var e=ce,a=pe,f=null,s=w(0),o=w(O),y=w(0);function l(t){var n,p=(t=re(t)).length,c,S,x=0,u=new Array(p),r=new Array(p),m=+s.apply(this,arguments),v=Math.min(O,Math.max(-O,o.apply(this,arguments)-m)),h,D=Math.min(Math.abs(v)/p,y.apply(this,arguments)),b=D*(v<0?-1:1),g;for(n=0;n<p;++n)(g=r[u[n]=n]=+e(t[n],n,t))>0&&(x+=g);for(a!=null?u.sort(function($,A){return a(r[$],r[A])}):f!=null&&u.sort(function($,A){return f(t[$],t[A])}),n=0,S=x?(v-p*b)/x:0;n<p;++n,m=h)c=u[n],g=r[c],h=m+(g>0?g*S:0)+b,r[c]={data:t[c],index:n,value:g,startAngle:m,endAngle:h,padAngle:D};return r}return l.value=function(t){return arguments.length?(e=typeof t=="function"?t:w(+t),l):e},l.sortValues=function(t){return arguments.length?(a=t,f=null,l):a},l.sort=function(t){return arguments.length?(f=t,a=null,l):f},l.startAngle=function(t){return arguments.length?(s=typeof t=="function"?t:w(+t),l):s},l.endAngle=function(t){return arguments.length?(o=typeof t=="function"?t:w(+t),l):o},l.padAngle=function(t){return arguments.length?(y=typeof t=="function"?t:w(+t),l):y},l}var G=_.pie,R={sections:new Map,showData:!1,config:G},C=R.sections,W=R.showData,de=structuredClone(G),ge=d(()=>structuredClone(de),"getConfig"),fe=d(()=>{C=new Map,W=R.showData,q()},"clear"),me=d(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);C.has(e)||(C.set(e,a),F.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),he=d(()=>C,"getSections"),xe=d(e=>{W=e},"setShowData"),we=d(()=>W,"getShowData"),Q={getConfig:ge,clear:fe,setDiagramTitle:Z,getDiagramTitle:ee,setAccTitle:te,getAccTitle:ae,setAccDescription:ie,getAccDescription:ne,addSection:me,getSections:he,setShowData:xe,getShowData:we},ye=d((e,a)=>{le(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),Se={parse:d(async e=>{const a=await se("pie",e);F.debug(a),ye(a,Q)},"parse")},ve=d(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),$e=ve,Ae=d(e=>{const a=[...e.values()].reduce((s,o)=>s+o,0),f=[...e.entries()].map(([s,o])=>({label:s,value:o})).filter(s=>s.value/a*100>=1).sort((s,o)=>o.value-s.value);return ue().value(s=>s.value)(f)},"createPieArcs"),De=d((e,a,f,s)=>{F.debug(`rendering pie chart
`+e);const o=s.db,y=H(),l=I(o.getConfig(),y.pie),t=40,n=18,p=4,c=450,S=c,x=J(a),u=x.append("g");u.attr("transform","translate("+S/2+","+c/2+")");const{themeVariables:r}=y;let[m]=X(r.pieOuterStrokeWidth);m??(m=2);const v=l.textPosition,h=Math.min(S,c)/2-t,D=E().innerRadius(0).outerRadius(h),b=E().innerRadius(h*v).outerRadius(h*v);u.append("circle").attr("cx",0).attr("cy",0).attr("r",h+m/2).attr("class","pieOuterCircle");const g=o.getSections(),$=Ae(g),A=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12];let T=0;g.forEach(i=>{T+=i});const P=$.filter(i=>(i.data.value/T*100).toFixed(0)!=="0"),z=oe(A);u.selectAll("mySlices").data(P).enter().append("path").attr("d",D).attr("fill",i=>z(i.data.label)).attr("class","pieCircle"),u.selectAll("mySlices").data(P).enter().append("text").text(i=>(i.data.value/T*100).toFixed(0)+"%").attr("transform",i=>"translate("+b.centroid(i)+")").style("text-anchor","middle").attr("class","slice"),u.append("text").text(o.getDiagramTitle()).attr("x",0).attr("y",-(c-50)/2).attr("class","pieTitleText");const L=[...g.entries()].map(([i,M])=>({label:i,value:M})),k=u.selectAll(".legend").data(L).enter().append("g").attr("class","legend").attr("transform",(i,M)=>{const B=n+p,j=B*L.length/2,K=12*n,U=M*B-j;return"translate("+K+","+U+")"});k.append("rect").attr("width",n).attr("height",n).style("fill",i=>z(i.label)).style("stroke",i=>z(i.label)),k.append("text").attr("x",n+p).attr("y",n-p).text(i=>o.getShowData()?`${i.label} [${i.value}]`:i.label);const V=Math.max(...k.selectAll("text").nodes().map(i=>(i==null?void 0:i.getBoundingClientRect().width)??0)),N=S+t+n+p+V;x.attr("viewBox",`0 0 ${N} ${c}`),Y(x,c,N,l.useMaxWidth)},"draw"),be={draw:De},Pe={parser:Se,db:Q,renderer:be,styles:$e};export{Pe as diagram};
