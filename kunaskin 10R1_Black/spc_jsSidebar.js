/* blog menu script by kuna */
/* dependency on jQuery */
/* refered : http://docs.jquery.com/Effects/animate, http://firejune.com/1355 */

var jm = { };

jm.doAnimation = true;		/* false : no animation */
jm.doPostRecognation = true;	/* true : Recognize and shows Auto Menu when in post view mode */
jm.defaultPath = "http://fs.textcube.com/blog/0/1892/skin/1/images/";
jm.defaultMessage = "이히~ 여기는 쿠나의 블로그입니다!<br>.. <u>덧글 갱신이 매우 느리니</u> 잡아먹지 마세요 ㅠㅠ";	/* welcoming message ... none to no message */
jm.autoDisappearTime = 10000;		/* auto disappear time when doing nothing */
jm.welcomeTime = 0;				/* first welcoming message showtime */
jm.animateSpeed = 400;			/* standard Animate Speed */

/* Initalize part ... DO NOT EDIT! */
jm.intervalIndex = null;
jm.isIE6 = false;
jm.tpAnimate = false;

jm.showMessage = function(string) {
	// when no message...
	if (string == "" || string == null) {
		$('#js_msgCover').animate( { opacity : 'hide' }, jm.animateSpeed );
	} else {
		$('#js_msgCover').animate( { opacity : 'show' }, jm.animateSpeed );
		
		$('#js_Message').html(string);
		if (jm.doAnimation) {
			$('#js_msgBody').animate( { height : $('#js_Message').height() }, jm.animateSpeed );
		}
		
		if ($('#js_charCover').css('display') == 'none') {
			$('#js_charCover').animate( { opacity : 'show' }, jm.animateSpeed );
		}
		
		jm.setCharacter();
		
		// if AutoDisappear?
		if (jm.autoDisappearTime > 0) {
			if (jm.intervalIndex != null) {
				clearTimeout(jm.intervalIndex);
			}
			jm.intervalIndex = setTimeout(jm.hideChar, jm.autoDisappearTime);
		}
	}
}

jm.getScrWidth = function() {
var myWidth = 0;
if( typeof( window.innerWidth ) == 'number' ) {
//Non-IE
myWidth = window.innerWidth;
} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
//IE 6+ in 'standards compliant mode'
myWidth = document.documentElement.clientWidth;
} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
//IE 4 compatible
myWidth = document.body.clientWidth;
}
return myWidth;
}
jm.getScrHeight = function() {
var myHeight = 0;
if( typeof( window.innerWidth ) == 'number' ) {
//Non-IE
myHeight = window.innerHeight;
} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
//IE 6+ in 'standards compliant mode'
myHeight = document.documentElement.clientHeight;
} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
//IE 4 compatible
myHeight = document.body.clientHeight;
}
return myHeight;
}

jm.showWidget = function(widgetObjName, imgsrc) {
	jm.showMessage($(widgetObjName).html(), imgsrc);
}

jm.setCharacterBySrc = function(imgstr) {
	if (jm.isIE6) return;
	if ($('#js_charCover').css('display') == 'none' && jm.tpAnimate) {
		$('#js_charCover').animate( { opacity : 'show' }, jm.animateSpeed );
	}
	$('#js_Char').attr('src', jm.defaultPath + imgstr);
}

jm.IE6Fix = function() {
	if ($.browser.msie && $.browser.version.substr(0,1)<7) {		
		$('#jsSidebar').css('position', 'absolute');
		$("#jsSidebar").css("opacity", "");
		$('#js_charCover').css('position', 'absolute');
		$('#js_msgCover').css('position', 'absolute');
		
		$(window).bind('scroll', jm.resetObjPos );
		jm.char_RowCnt = 0;		// 캐릭터를 지원하지 않으므로 0으로 바꾼다
		jm.isIE6 = true;
	}
}

jm.hideChar = function() {
	$('#js_charCover').animate( { opacity : 'hide' }, jm.animateSpeed );
	$('#container').animate({backgroundPosition : '(0px 0px)'}, jm.animateSpeed);
	$('#js_msgCover').animate( { opacity : 'hide' }, jm.animateSpeed );
	
	if (jm.intervalIndex != null) {	// 버그 방지용 ... 이미 작동중인 Interval이 있으면 해제함
		clearTimeout(jm.intervalIndex);
		jm.intervalIndex = null;
	}
}

jm.resetObjPos = function() {
	// 윈도우 창 크기 구하기
	var windowHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
	// 스크롤 오프셋 크기 구하기
	var windowScroll = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
	var windowPos = windowHeight + windowScroll;
	
	$('#jsSidebar').css('top', windowPos - $('#jsSidebar').height());
}

jm.showPostmenu = function () {
	var title = $("span.entry-title").html();
	if (title == "" || title == null) {
		jm.showMessage("현재 게시글 상태가 아닙니다.<br><br><a href='#'>맨 위로 이동</a><br><a href='javascript:jm.hideChar();'>지금 당장 사라져!</a>", 2);
	} else {
		jm.showMessage("현재 <b>『" + title + "』</b> 게시글을 읽고 있습니다.<br><br><a href='#ReplyLocation'>덧글 다는 위치로 이동</a><br><a href='#'>맨 위로 이동</a><br><a href='javascript:jm.hideChar();'>지금 당장 사라져!</a>", 1);
	}
}

jm.isNum = function (value, numlen)		// value 값이 숫자인가?
{
	if (value.length == 0 ) return false;
	var len = numlen ? numlen : value.length;
	var num = "0123456789";

	for (i=0; i<len; i++)
	{
		if (num.indexOf(value.substring(len, len+1)) == -1)
		{
			return false;
		}
	}

	return true;
}

jm.bindWidget = function( clickObjName, targetWidget )
{
	var obj = $(clickObjName);
	if (obj == null)
	{
		alert("jsSidebar :: Failed to Bind Object - can't found :" + clickObjName);
		return;
	}
	
	obj.bind('click', function (e) { jm.showWidget(targetWidget); } );
}

jm.bindMessage = function( clickObjName, message )
{
	var obj = $(clickObjName);
	if (obj == null)
	{
		alert("jsSidebar :: Failed to Bind Object - can't found :" + clickObjName);
		return;
	}
	
	obj.bind('click', function (e) { jm.showMessage(message); } );
}

jm.setCharacter = function()
{
	// special Edition!	
	var obj = $('#js_charCover');
	obj.css( 'right', -obj.width() );
	obj.css( 'bottom', -obj.height() );
	
	obj.animate( { right : -150, bottom : -250 }, jm.animateSpeed );
	$('#container').animate({backgroundPosition : '(' + -obj.width() + 'px 0px)'}, jm.animateSpeed/2);

	jm.tpAnimate = true;

}

jm.menuInterval = null;
jm.showMenu = function ()
{
	if (jm.menuInterval != null) {
		clearTimeout(jm.menuInterval);
		jm.menuInterval = null;
	}
	$('#jsMenuItem').animate( { opacity : 'show' }, jm.animateSpeed );
}

jm.hideMenu = function ()
{
	$('#jsMenuItem').animate( { opacity : 'hide' }, jm.animateSpeed );
}

jm.Init = function () {
	/* 메뉴와 위젯을 바인드시키세요 */
	jm.bindMessage( "textarea", "덧글을 쓰면 치르노가 응원해드려요!" );
	
	// IE6Fix
	jm.IE6Fix();
	
	// 1. 문자열 처리
	var _time = jm.autoDisappearTime;
	jm.autoDisappearTime = jm.welcomeTime;
	
	if (jm.welcomeTime > 0) {
		if (jm.isIE6)
		{
			jm.showMessage('이 사이트는 IE6(구버전) 브라우저에서 제대로 보이지 않습니다. <a href="http://www.microsoft.com/korea/ie">최신 브라우저로 업데이트</a> 해 주세요. <a href="http://www.mozilla.or.kr/ko/firefox/">파이어폭스</a>, <a href="http://www.opera.com/browser/">오페라</a>, <a href="http://www.apple.com/kr/safari/">사파리</a>, <a href="http://www.google.com/chrome?hl=ko">크롬</a>을 사용해도 좋습니다!');
		} else {
			var msgAfterDomain = document.location.href.substring((7/*http://*/ + document.domain.length)).replace(/\//gi, "");
			if (jm.doPostRecognation && jm.isNum(msgAfterDomain, 1))
			{
				jm.showPostmenu();
			} else {
				jm.showMessage(jm.defaultMessage);
			}
		}
		$('#js_msgCover').animate( { bottom : 200, right : 60 }, jm.animateSpeed );
	} else {
		// 초반 welcoming이 아니면 ... 오브젝트를 일단 숨겨놓음
		$('#js_charCover').hide( { display:'none' });
		$('#js_msgCover').css( { display:'none', bottom : 200, right : 60 } );
	}
	
	jm.autoDisappearTime = _time;
	
	/* 필수! */// 하단 바 애니메이션
	$('#jsSidebar').css('bottom', -$('#jsSidebar').height());
	$('#jsSidebar').animate( { bottom: 0 }, jm.animateSpeed, "swing" );
	
	/* 메뉴 바에 대해서 .. */
	$('#jsMenuCover').bind('mouseover', jm.showMenu );
	$('#jsMenuCover').bind('mouseout', function (e) { jm.menuInterval = setTimeout(jm.hideMenu, jm.autoDisappearTime); } );
}

$(document).ready( jm.Init );