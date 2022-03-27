// tooltip JS by kuna - dev.kuna.wo.tc, kuna.wo.tc

// Initalize
var tTooltip = { };
TObj = tTooltip;

TObj.Initalize = function ()
{
	// Init default value
	TObj.limitTooltipWidth=420;	// 툴팁의 가로길이 한계치를 정합니다
	
	TObj.offsetfromcursorX=12; //Customize x offset of tooltip
	TObj.offsetfromcursorY=10; //Customize y offset of tooltip
	TObj.offsetdivfrompointerX=10; //Customize x offset of tooltip DIV relative to pointer image
	TObj.offsetdivfrompointerY=8; //Customize y offset of tooltip DIV relative to pointer image. Tip: Set it to (height_of_pointer_image-1).
	
	document.write('<div id="dhtmltooltip"></div>'); //write out tooltip DIV
	document.write('<img id="dhtmlpointer" src="http://firejune.cdn2.cafe24.com/arrow2.gif">'); //write out pointer image
	TObj.enabletip=false;
	
	// part Broswer
	TObj.ie=document.all;
	TObj.ns6=document.getElementById && !document.all;
	TObj.tipobj=document.all? document.all["dhtmltooltip"] : document.getElementById? document.getElementById("dhtmltooltip") : "";
	TObj.pointerobj=document.all? document.all["dhtmlpointer"] : document.getElementById? document.getElementById("dhtmlpointer") : "";
}

TObj.hangEvent = function (obj)
{
	// Hang event each every A Link in Obj
	if (obj == null) return false;
	var obj_arr = obj.getElementsByTagName('*');
	for (i=0; i<obj_arr.length; i++)
	{
		if (obj_arr[i].title != '')
		{
			Event.observe(obj_arr[i], "mouseover", TObj.showTitletip);
			Event.observe(obj_arr[i], "mouseout", TObj.hideTitletip);
			Event.observe(obj_arr[i], "mousemove", TObj.positiontip);
		}
	}
	return true;
}

TObj.ietruebody = function () {
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body;
}

TObj.showTitletip = function (e) {
	var tT = e.element().title;
	if (tT != null || tT != 'undefined')
	{
		TObj.tipobj.innerHTML=e.element().title;
		e.element().title='';
		TObj.enabletip=true;
	}
	
	return false;
}

TObj.positiontip = function (e) {
	if (TObj.enabletip){
		var nondefaultpos=false
		var curX=(TObj.ns6)?e.pageX : event.clientX+TObj.ietruebody().scrollLeft;
		var curY=(TObj.ns6)?e.pageY : event.clientY+TObj.ietruebody().scrollTop;
		//Find out how close the mouse is to the corner of the window
		var winwidth=TObj.ie&&!window.opera? TObj.ietruebody().clientWidth : window.innerWidth-20
		var winheight=TObj.ie&&!window.opera? TObj.ietruebody().clientHeight : window.innerHeight-20
		
		var rightedge=TObj.ie&&!window.opera? winwidth-event.clientX-TObj.offsetfromcursorX : winwidth-e.clientX-TObj.offsetfromcursorX
		var bottomedge=TObj.ie&&!window.opera? winheight-event.clientY-TObj.offsetfromcursorY : winheight-e.clientY-TObj.offsetfromcursorY
		
		var leftedge=(TObj.offsetfromcursorX<0)? TObj.offsetfromcursorX*(-1) : -1000
		
		if (TObj.tipobj.offsetWidth > TObj.limitTooltipWidth) TObj.tipobj.style.width = TObj.limitTooltipWidth + "px"; else TObj.tipobj.style.width = "auto";
		//if the horizontal distance isn't enough to accomodate the width of the context menu
		if (rightedge<TObj.tipobj.offsetWidth){
		//move the horizontal position of the menu to the left by it's width
		TObj.tipobj.style.left=curX-TObj.tipobj.offsetWidth+"px"
		nondefaultpos=true
		}
		else if (curX<leftedge)
		TObj.tipobj.style.left="5px"
		else{
		//position the horizontal position of the menu where the mouse is positioned
		TObj.tipobj.style.left=curX+TObj.offsetfromcursorX-TObj.offsetdivfrompointerX+"px"
		TObj.pointerobj.style.left=curX+TObj.offsetfromcursorX+"px"
		}
		
		//same concept with the vertical position
		if (bottomedge<TObj.tipobj.offsetHeight){
		TObj.tipobj.style.top=curY-TObj.tipobj.offsetHeight-TObj.offsetfromcursorY+"px"
		nondefaultpos=true
		}
		else{
		TObj.tipobj.style.top=curY+TObj.offsetfromcursorY+TObj.offsetdivfrompointerY+"px"
		TObj.pointerobj.style.top=curY+TObj.offsetfromcursorY+"px"
		}
		TObj.tipobj.style.visibility="visible"
		if (!nondefaultpos)
		TObj.pointerobj.style.visibility="visible"
		else
		TObj.pointerobj.style.visibility="hidden"
	}
}

TObj.hideTitletip = function (e) {
	TObj.enabletip=false;
	e.element().title=TObj.tipobj.innerHTML;
	TObj.tipobj.style.visibility="hidden";
	TObj.pointerobj.style.visibility="hidden";
	TObj.tipobj.style.left="-1000px";
	TObj.tipobj.style.backgroundColor='';
	TObj.tipobj.style.width='';
}
