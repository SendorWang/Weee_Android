/**
 * related to set.ui
 * 
 * @Author : 234273537@qq.com
 * @Timestamp : 2016-08-22
 */
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App=sm("do_App");
var back=ui("do_ALayout_5");
var nf = sm("do_Notification");

var wurl_text=ui("do_TextField_4");
var surl_text=ui("do_TextField_5");
var set=ui("set");
var wurl=do_Global.getMemory("wurl");
var surl=do_Global.getMemory("surl");

surl_text.text=surl;
wurl_text.text=wurl;
back.on("touch", function(data, e) {
	
	do_App.closePage();
});

set.on("touch", function(data, e) {
	
	if(surl_text.text==""){
		
		nf.toast("URL不能为空");
		
		return;
	}
	
	if(wurl_text.text==""){
			
		nf.toast("URL不能为空");
		
		return;
	}
	
	do_Global.setMemory("surl", surl_text.text);
	do_Global.setMemory("wurl", wurl_text.text);
	nf.toast("设置成功");
	
});

