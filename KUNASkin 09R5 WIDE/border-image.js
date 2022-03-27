// border image Javascript

/*
	
	Lain's Tistory - Javascript for Embedding

	last updated 2009. 02. 16.

    e-mail me: lain1207@gmail.com
	scripted by �����  (http://lain1207.tistory.com)
	
*/


function border_image(){
	var DivTags = new Array();
	var DivTags=document.getElementsByTagName("div");
	var path = "http://cfs.tistory.com/custom/blog/9/94967/skin/images/";
	
	var image_edit1 = "<center><TABLE cellSpacing=0 cellPadding=0 border=0><TBODY><TR height=13><TD width=15 height=13><IMG height=13 alt='' src='"+path+"img_lu.gif' width=15 border=0></TD><TD background="+path+"img_u.gif height=13><IMG height=13 alt='' src='"+path+"img_spacer.gif' width=1 border=0></TD><TD width=15 height=13><IMG height=13 alt='' src='"+path+"img_ru.gif' width=15 border=0></TD></TR><TR><TD width=15 background="+path+"img_l.gif><IMG height=1 alt='' src='"+path+"img_spacer.gif' width=15 border=0></TD><TD style='text-align:left'>";

	var image_edit2 = "</TD><TD width=15 background="+path+"img_r.gif><IMG height=1 alt='' src='"+path+"img_spacer.gif' width=15 border=0></TD></TR><TR height=14><TD width=15 height=14><IMG height=14 alt='' src='"+path+"img_ld.gif' width=15 border=0></TD><TD background="+path+"img_d.gif height=14><IMG height=14 alt='' src='"+path+"img_spacer.gif' width=1 border=0></TD><TD width=15 height=14><IMG height=14 alt='' src='"+path+"img_rd.gif' width=15 border=0></TD></TR></TBODY></TABLE></center>";

	var image_edit3 = "<center><table border=0 cellspacing=0 cellpadding=0><tr height=5><td height=5 colspan=3 background='"+path+"img2_u.gif'><img src='"+path+"img2_spacer.gif' width=5 height=5 border=0 /></td></tr><tr><td width=5 background='"+path+"img2_l.gif'><img src='"+path+"img2_spacer.gif' width=5 height=5 border=0 /></td><td TD style='text-align:left'><p style='position: relative; margin:0px; padding:0px'>";

	var image_edit4 = "<img src='"+path+"img2_ld.png' width=12 height=12 border=0 style='position:absolute; bottom:-5px; left:-5px;' class='png24'/><img src='"+path+"img2_lu.png' width='12' height='12' border='0' style='position:absolute; top:-5px; left:-5px;'class='png24'/><img src='"+path+"img2_rd.png' width=12 height=12 border=0 style='position:absolute; bottom:-5px; right:-5px; class='png24'/><img src='"+path+"img2_ru.png' width=12 height=12 border=0 style='position:absolute; top:-5px; right:-5px;'class='png24'/></p></td><td width=5 background='"+path+"img2_r.gif'><img src='"+path+"img2_spacer.gif' width=5 height=5 border=0 /></td></tr><tr><td height=5 colspan=3 background='"+path+"img2_d.gif'><img src='"+path+"img2_spacer.gif' width=5 height=5 border=0 /></td></tr></table></center>"
	
	for (i=0; i<DivTags.length; i++) {
		if (DivTags[i].className.indexOf("imageblock") !== -1) {
			DivTags[i].innerHTML = image_edit1 +DivTags[i].innerHTML + image_edit2}
		else if (DivTags[i].className.indexOf("imagebox") !== -1) {
			DivTags[i].innerHTML = image_edit3 +DivTags[i].innerHTML + image_edit4}
	}
}

document.observe("dom:loaded", border_image);
