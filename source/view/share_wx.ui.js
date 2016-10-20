/**
 * related to share_wx.ui
 * 
 * @Author : 234273537@qq.com
 * @Timestamp : 2016-08-17
 */
var root = ui("$");
var do_Page = sm("do_Page");
var do_Global = sm("do_Global");
var deviceone = require("deviceone");
var http = mm("do_Http");
var nf = sm("do_Notification");
var conbgbox = ui("do_ALayout_1");
var do_ALayout_3=ui("do_ALayout_3");
var do_ALayout_4=ui("do_ALayout_4");
var do_ALayout_5=ui("do_ALayout_5");
var wurl=do_Global.getMemory("wurl");
var we = sm("do_TencentWX");
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var share=function(){};
conbgbox.on("touch",function(){
	//空白事件，防止点击穿透底层

});

do_ALayout_5.on("touch",function(){
	//空白事件，防止点击穿透底层
	bgmask.animate(animMaskHide,function(){
		bgmask.visible = false;
	});
	paneler.animate(animPanelHide);
});

if(do_Global.getMemory("language")=="en"){
	ui("do_Label_1").Text="Send to a friend";
	ui("do_Label_1").fontSize="20"
	ui("do_Label_2").Text="Send friends";
	ui("do_Label_2").fontSize="20"
}

//遮罩显示
var animMaskShow = mm("do_Animator");
var propsMS = {bgColor:"00000044"};
animMaskShow.append(320,propsMS,"EaseOut");
//面板显示
var animPanelShow = mm("do_Animator");
var propsPS = {y:934,alpha:1};
animPanelShow.append(320,propsPS,"EaseOut");

//遮罩隐藏
var animMaskHide = mm("do_Animator");
var propsMH = {bgColor:"00000000"};
animMaskHide.append(320,propsMH,"EaseOut");
//面板隐藏
var animPanelHide = mm("do_Animator");
var propsPH = {y:1334,alpha:0.8};
animPanelHide.append(320,propsPH,"EaseOut");

var paneler = ui("do_ALayout_1");
var bgmask=ui("maskbg");
//自定义事件---打开
var pares={};
root.on("share_show",function(data){
	bgmask.visible=true;
	pares=data;
	bgmask.animate(animMaskShow);
	paneler.animate(animPanelShow);
	
});


root.on("share_hide",function(data){
	bgmask.animate(animPanelHide);
	paneler.animate(animPanelHide);
});	




var share_wx=new share();

do_ALayout_3.on("touch",function(){
	
	share_wx.share_wx(pares, 0);
});
do_ALayout_4.on("touch",function(){

	share_wx.share_wx(pares, 1);
});


share.prototype.share_wx=function(pare,scene){
	if(pare.type==1){
		down_img(pare.url);		
		pare.image="data://xiazai.png";
	}
	
	pare.scene=scene;
	var flag=false;
	we.share(pare, function(data, e){
		if(flag)return;
		do_Page.fire("share_rers",{result:data, object:scene});
		flag=true;
	});
	
}
/*
function down_img(url){
	
	http.timeout = 30000;
	http.contentType = "application/json";
	http.url = url;
	http.download("data://xiazai.png");
	http.on("success", function(data) {
		deviceone.print(data);
	});
	http4.on("fail", function(data) {
		deviceone.print(data);
	});
}*/


