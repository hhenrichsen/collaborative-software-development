import{F as U,O as d,v as _,e as F,m as H,G as I,a4 as K,a6 as X,N as Y,z as Z,q as ee,R as te,Q as ae,B as ie,E as ne,a7 as w,a8 as M,a9 as re}from"./index-edf2dc7b.js";import{m as le}from"./chunk-4BX2VUAB-9d5fb53e-fbbfb393.js";import{S as oe}from"./mermaid-parser.core-c7ea0bf4-ed040342.js";import{h as P}from"./arc-55de75af-3f28bc6f.js";import{l as se}from"./ordinal-2f09267b-cbc04e27.js";import"./_baseUniq-1bf7e1f4-efbe9b68.js";import"./_basePickBy-7250d40b-47807121.js";import"./clone-6be06166-a2badb63.js";import"./init-77b53fdd-cac434d1.js";function ce(e,a){return a<e?-1:a>e?1:a>=e?0:NaN}function pe(e){return e}function ue(){var e=pe,a=ce,g=null,o=w(0),s=w(M),y=w(0);function l(t){var n,c=(t=re(t)).length,p,S,x=0,u=new Array(c),r=new Array(c),m=+o.apply(this,arguments),v=Math.min(M,Math.max(-M,s.apply(this,arguments)-m)),h,b=Math.min(Math.abs(v)/c,y.apply(this,arguments)),D=b*(v<0?-1:1),f;for(n=0;n<c;++n)(f=r[u[n]=n]=+e(t[n],n,t))>0&&(x+=f);for(a!=null?u.sort(function($,A){return a(r[$],r[A])}):g!=null&&u.sort(function($,A){return g(t[$],t[A])}),n=0,S=x?(v-c*D)/x:0;n<c;++n,m=h)p=u[n],f=r[p],h=m+(f>0?f*S:0)+D,r[p]={data:t[p],index:n,value:f,startAngle:m,endAngle:h,padAngle:b};return r}return l.value=function(t){return arguments.length?(e=typeof t=="function"?t:w(+t),l):e},l.sortValues=function(t){return arguments.length?(a=t,g=null,l):a},l.sort=function(t){return arguments.length?(g=t,a=null,l):g},l.startAngle=function(t){return arguments.length?(o=typeof t=="function"?t:w(+t),l):o},l.endAngle=function(t){return arguments.length?(s=typeof t=="function"?t:w(+t),l):s},l.padAngle=function(t){return arguments.length?(y=typeof t=="function"?t:w(+t),l):y},l}var G=U.pie,R={sections:new Map,showData:!1,config:G},C=R.sections,B=R.showData,de=structuredClone(G),fe=d(()=>structuredClone(de),"getConfig"),ge=d(()=>{C=new Map,B=R.showData,_()},"clear"),me=d(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);C.has(e)||(C.set(e,a),F.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),he=d(()=>C,"getSections"),xe=d(e=>{B=e},"setShowData"),we=d(()=>B,"getShowData"),V={getConfig:fe,clear:ge,setDiagramTitle:Z,getDiagramTitle:ee,setAccTitle:te,getAccTitle:ae,setAccDescription:ie,getAccDescription:ne,addSection:me,getSections:he,setShowData:xe,getShowData:we},ye=d((e,a)=>{le(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),Se={parse:d(async e=>{const a=await oe("pie",e);F.debug(a),ye(a,V)},"parse")},ve=d(e=>`
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
`,"getStyles"),$e=ve,Ae=d(e=>{const a=[...e.values()].reduce((o,s)=>o+s,0),g=[...e.entries()].map(([o,s])=>({label:o,value:s})).filter(o=>o.value/a*100>=1).sort((o,s)=>s.value-o.value);return ue().value(o=>o.value)(g)},"createPieArcs"),be=d((e,a,g,o)=>{F.debug(`rendering pie chart
`+e);const s=o.db,y=H(),l=I(s.getConfig(),y.pie),t=40,n=18,c=4,p=450,S=p,x=K(a),u=x.append("g");u.attr("transform","translate("+S/2+","+p/2+")");const{themeVariables:r}=y;let[m]=X(r.pieOuterStrokeWidth);m??(m=2);const v=l.textPosition,h=Math.min(S,p)/2-t,b=P().innerRadius(0).outerRadius(h),D=P().innerRadius(h*v).outerRadius(h*v);u.append("circle").attr("cx",0).attr("cy",0).attr("r",h+m/2).attr("class","pieOuterCircle");const f=s.getSections(),$=Ae(f),A=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12];let T=0;f.forEach(i=>{T+=i});const N=$.filter(i=>(i.data.value/T*100).toFixed(0)!=="0"),z=se(A);u.selectAll("mySlices").data(N).enter().append("path").attr("d",b).attr("fill",i=>z(i.data.label)).attr("class","pieCircle"),u.selectAll("mySlices").data(N).enter().append("text").text(i=>(i.data.value/T*100).toFixed(0)+"%").attr("transform",i=>"translate("+D.centroid(i)+")").style("text-anchor","middle").attr("class","slice"),u.append("text").text(s.getDiagramTitle()).attr("x",0).attr("y",-(p-50)/2).attr("class","pieTitleText");const E=[...f.entries()].map(([i,O])=>({label:i,value:O})),k=u.selectAll(".legend").data(E).enter().append("g").attr("class","legend").attr("transform",(i,O)=>{const L=n+c,j=L*E.length/2,q=12*n,J=O*L-j;return"translate("+q+","+J+")"});k.append("rect").attr("width",n).attr("height",n).style("fill",i=>z(i.label)).style("stroke",i=>z(i.label)),k.append("text").attr("x",n+c).attr("y",n-c).text(i=>s.getShowData()?`${i.label} [${i.value}]`:i.label);const Q=Math.max(...k.selectAll("text").nodes().map(i=>(i==null?void 0:i.getBoundingClientRect().width)??0)),W=S+t+n+c+Q;x.attr("viewBox",`0 0 ${W} ${p}`),Y(x,p,W,l.useMaxWidth)},"draw"),De={draw:be},Ne={parser:Se,db:V,renderer:De,styles:$e};export{Ne as diagram};
