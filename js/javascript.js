  //slideshow menu in alto a destra
$('document').ready(function(){
 $('#show').click(function(){
    $('#menu').slideDown("slow");
    });
  });

  //visualizzazione canvass plasm.js
  var p;
    $(function () {
      console.log('Starting PLaSM for Web-Index...');
      p = new Plasm('plasm', 'plasm-inspector');
      fun.PLASM(p);
    });

  
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-30496335-1']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script');
      ga.type = 'text/javascript';
      ga.async = true;
      ga.src = 'http://www.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(ga, s);
    })();
    

  // visualizzazione molecola
function showmolecole() {
	var domainf=DOMAIN([[0,PI],[0,2*PI]])([24,144]); 
	var mappings=function(v){ 
	var a=v[0]; 
	var b=v[1]; 
	var u=SIN(a)*COS(b); 
	var v=SIN(a)*SIN(b); 
	var w=COS(a); 
return[u,v,w];}; 
	var sfera=MAP(mappings)(domainf);
	var mappingsl=function(v){ 
	var a=v[0]; 
	var b=v[1]; 
	var u=1/2*SIN(a)*COS(b); 
	var v=1/2*SIN(a)*SIN(b); 
	var w=1/2*COS(a); 
return[u,v,w];}; 
	var sferal=MAP(mappingsl)(domainf); 
	s1=COLOR([0,0,1])(T([0])([5])(sfera)); 
	s2=COLOR([0,0,1])(T([0])([-5])(sfera)); 
	s3=COLOR([0,0,1])(T([1])([3])(sfera)); 
	var sfere = STRUCT([s1,s2,s3]);
	l1=R([0,1])(PI/6)(R([0,2])(-PI/2)(EXTRUDE([5])(DISK(0.1)())))
	l2=R([0,1])(-PI/6)(R([0,2])(PI/2)(EXTRUDE([5])(DISK(0.1)())))
	l3=STRUCT([T([2])([-2.5])(COLOR([1,0,0])(sferal)), T([2])([2.5])(sferal), T([2])([-2.5])(EXTRUDE([5])(DISK(0.1)()))]);
	l4=STRUCT([T([0,1,2])([5,-3,-2.5])(COLOR([1,0,0])(sferal)), T([0,1,2])([5,-3,2.5])(sferal),  T([0,1,2])([5,-3,-2.5])(EXTRUDE([5])(DISK(0.1)())) ]);
	l5=STRUCT([T([0,1,2])([-5,-3,-2.5])(COLOR([1,0,0])(sferal)), T([0,1,2])([-5,-3,2.5])(sferal),  T([0,1,2])([-5,-3,-2.5])(EXTRUDE([5])(DISK(0.1)())) ]);
	var linee = COLOR([1,1,1])(T([1])([3])(STRUCT([l1,l2,l3,l4,l5]))); 
	var molecola = T([1])([1])(STRUCT([sfere,linee])); 
	DRAW(molecola);
	sfere.onclick = function() {
	 alert("in metodo");
    document.location.href = "www.google.com";
    alert("fine metodo");
};
}
