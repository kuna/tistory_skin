/* blog menu script by kuna */
/* dependency on jQuery */
/* refered : http://docs.jquery.com/Effects/animate, http://firejune.com/1355 */

var jm = { };

jm.doPostRecognation = true;	/* true : Recognize and shows Auto Menu when in post view mode */
jm.defaultPath = "http://fs.textcube.com/blog/0/1892/skin/1/images/";	/* 반드시 수정하셔야 합니다!!! */
jm.defaultMessage = "이 블로그에 오신 것을 환영합니다!<br>많이 많이 놀다 가세요~";	/* welcoming message ... none to no message */
jm.autoDisappearTime = 10000;		/* auto disappear time when doing nothing */
jm.welcomeTime = 5000;				/* first welcoming message showtime */
jm.animateSpeed = 500;			/* standard Animate Speed */

/* Initalize part ... DO NOT EDIT! */
jm.Characters = new Array();
jm.char_Row = null;
jm.char_RowCnt = 0;
jm.intervalIndex = null;
jm.isIE6 = false;

jm.showMessage = function(string, imgsrc) {
	// when no message...
	if (string == "" || string == null) {
		$('#js_msgCover').animate( { opacity : 'hide' }, jm.animateSpeed );
	} else {
		$('#js_msgCover').animate( { opacity : 'show' }, jm.animateSpeed );
		
		$('#js_Message').html(string);
		$('#js_msgBody').animate( { height : $('#js_Message').height() }, jm.animateSpeed );
		
		if (imgsrc == null || imgsrc == "") {
			return;		// no character change
		} else if (imgsrc == "random") {
			jm.setCharacter();
		} else if (jm.isNum(imgsrc)) {
			jm.setCharacter(imgsrc);	// expression change
		} else {
			jm.setCharacterBySrc(imgsrc);
		}
		
		// if AutoDisappear?
		if (jm.autoDisappearTime > 0) {
			if (jm.intervalIndex != null) {
				clearTimeout(jm.intervalIndex);
			}
			jm.intervalIndex = setTimeout(jm.hideChar, jm.autoDisappearTime);
		}
	}
}

jm.showWidget = function(widgetObjName, imgsrc) {
	jm.showMessage($(widgetObjName).html(), imgsrc);
}

jm.setCharacterBySrc = function(imgstr) {
	if (jm.isIE6) return;
	if ($('#js_charCover').css('display') == 'none') {
		$('#js_charCover').animate( { right : 0, opacity : 'show' }, jm.animateSpeed );
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
	$('#js_charCover').animate( { right : -60, opacity : 'hide' }, jm.animateSpeed );
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

jm.bindWidget = function( clickObjName, targetWidget, imgsrc )
{
	var obj = $(clickObjName);
	if (obj == null)
	{
		alert("jsSidebar :: Failed to Bind Object - can't found :" + clickObjName);
		return;
	}
	
	obj.bind('click', function (e) { jm.showWidget(targetWidget, imgsrc); } );
}

jm.bindMessage = function( clickObjName, message, imgsrc )
{
	var obj = $(clickObjName);
	if (obj == null)
	{
		alert("jsSidebar :: Failed to Bind Object - can't found :" + clickObjName);
		return;
	}
	
	obj.bind('click', function (e) { jm.showMessage(message, imgsrc); } );
}

jm.setCharacter = function( index, row )
{
	if (jm.char_RowCnt == 0) return;	// 등록된 캐릭터가 없으면 X
	
	var row = row ? Math.floor(row) : Math.floor(jm.char_Row);
	var txtArr = jm.Characters[row].split("|");
	var index = index ? Math.floor(index - 1) : Math.floor(Math.random() * txtArr.length);

	jm.setCharacterBySrc( txtArr[index] );
}

jm.addCharacter = function( char1, char2, char3 )	// char1 :: 기쁨/환영, char2 :: 실패/슬픔 .. char3은 그 이외의 것들. 없으면 비우기.
{
	jm.Characters.push( char1 + "|" + char2 + "|" + char3 );
	jm.char_RowCnt++;
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

/* 중요 함수들의 사용법
addCharacter( char1, char2, char3 )
 - char1은 환영/기쁨 표정을 지을 캐릭터 [방문시 보임], char2는 실패/슬픔 표정의 캐릭터[에러 혹은 커스터마이징], char3은 그 이외 [카테고리 눌렀을때]
 
bindMessage,bindWidget( obj, target, imgsrc )
 - 이벤트를 오브젝트와 연결. imgsrc로 표정조정가능.. 아무것도 안써놓거나 null이면 표정변화없음. 숫자면 캐릭터 표정 변화. "random"이면 캐릭터 표정 랜덤화.
 
setCharacter( index, row )
 - index는 캐릭터의 표정, row는 캐릭터의 종류. 랜덤설정시는 null 값으로 둘 것.
*/

jm.Init = function () {
	// Custom Initalizing Part
	/* 사용할 캐릭터를 등록하세요. */
	jm.addCharacter( "char1.png", "char2.png", "char3.png" );
	jm.addCharacter( "char21.png", "char22.png", "char23.png" );

	/* 메뉴와 위젯을 바인드시키세요 */
	jm.bindMessage( "#m_entry", "엔트리로 이동합니다.<br>잠시만 기다려 주세요...", 3 );
	jm.bindMessage( "#m_creation", "이동중입니다.<br>잠시만 기다려 주세요...", 3 );
	jm.bindMessage( "#m_guest", "방명록으로 이동중입니다.<br>잠시만 기다려 주세요...", 3 );
	jm.bindMessage( "div.communicationSend", "덧글 달아주시는 거죠? *^_^*", 1 );
	jm.bindWidget( "#m_category", "#w_category", 3 );
	jm.bindWidget( "#m_rp", "#w_rp", 3 );
	jm.bindWidget( "#m_rc", "#w_rc", 3 );
	jm.bindWidget( "#m_links", "#w_link", 3 );
	jm.bindWidget( "#m_profile", "#tt-default-sidebar-profile", 3 );
	jm.bindWidget( "#m_neighbor", "#tt-default-sidebar-following", 3 );
	
	// 여기서부터는 자동으로 초기화됩니다.
	jm.char_Row = Math.floor(Math.random() * jm.char_RowCnt);	// 표시될 캐릭터의 행[종류] 부분
	// IE6Fix
	jm.IE6Fix();
	
	// 1. 문자열 처리
	var _time = jm.autoDisappearTime;
	jm.autoDisappearTime = jm.welcomeTime;
	
	if (jm.welcomeTime > 0) {
		if (jm.isIE6)
		{
			jm.showMessage('이 사이트는 IE6(구버전) 브라우저에서 제대로 보이지 않습니다. <a href="http://www.microsoft.com/korea/ie">최신 브라우저로 업데이트</a> 해 주세요. <a href="http://www.mozilla.or.kr/ko/firefox/">파이어폭스</a>, <a href="http://www.opera.com/browser/">오페라</a>, <a href="http://www.apple.com/kr/safari/">사파리</a>, <a href="http://www.google.com/chrome?hl=ko">크롬</a>을 사용해도 좋습니다!', 2);
		} else {
			var msgAfterDomain = document.location.href.substring((7/*http://*/ + document.domain.length)).replace(/\//gi, "");
			if (jm.doPostRecognation && jm.isNum(msgAfterDomain, 1))
			{
				jm.showPostmenu();
			} else {
				jm.showMessage(jm.defaultMessage, 1);
			}
		}
	} else {
		// 초반 welcoming이 아니면 ... 오브젝트를 일단 숨겨놓음
		$('#jm_msgCover').css("display", "none");
		$('#js_charCover').css("display", "none");
	}
	
	// 2. 인터페이스 처리
	if (jm.char_RowCnt > 0) {
		$("#js_msgBtm").css("background", "url('" + jm.defaultPath + "balloon_bottom.png') no-repeat 0 0");	// 툴팁 모양을 수정
		if (jm.welcomeTime > 0) {
			$('#js_msgCover').animate( { bottom : 150, right : 150 }, jm.animateSpeed );
		} else {
			$('#js_msgCover').css( "bottom", 150 );
			$('#jm_msgCover').css( "right", 150 );
		}
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