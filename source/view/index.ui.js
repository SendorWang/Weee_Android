/**
 * @Author : 234273537@qq.com
 * @Timestamp : 2016-08-08
 */
//引入组件库
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App=sm("do_App");
var nf = sm("do_Notification");
var do_ex=sm("do_External");
var we = sm("do_TencentWX");
var webview=ui("do_WebView_2");
var device_info=sm("do_Device");
var deviceone = require("deviceone");
var tools = require("tools");
var http = mm("do_Http");

var dealy= mm("do_Timer");

var line=ui("do_ALayout_22");
var cache=sm("do_DataCache");

var bottom=ui("do_ALayout_5");


var b1=ui("do_ALayout_6");
var b2=ui("do_ALayout_7");
var b3=ui("do_ALayout_8");
var b4=ui("do_ALayout_9");
var b5=ui("do_ALayout_10");

var img1=ui("do_ImageView_10");
var img2=ui("do_ImageView_11");

var img3=ui("do_ImageView_13");
var img4=ui("do_ImageView_14");
var lable1=ui("do_Label_3");
var lable2=ui("do_Label_4");
var lable3=ui("do_Label_5");
var lable4=ui("do_Label_6");
var lable5=ui("do_Label_7");
var lable6=ui("do_Label_8");
var lable7=ui("do_Label_9");
var lable8=ui("do_Label_10");
var lable9=ui("do_Label_11");
/**遮罩层控件*/
var marks_01=ui("do_ALayout_15");
var marks_02=ui("do_ALayout_16");
var marks_03=ui("do_ALayout_17");
var marks_04=ui("do_ALayout_18");
var marks_05=ui("do_ALayout_20");
var marks=ui("do_ALayout_0");
var center=ui("do_ALayout_8");
/***遮罩层控件事件**/


	do_Global.setMemory("wurl","http://www.sayweee.com/");
	do_Global.setMemory("surl", "http://www.sayweee.com");
	do_Global.setMemory("back_url", do_Global.getMemory("wurl"));

	
	if(!cache.hasData("token")){
	
		do_Page.fire("bottom_hide");
		webview.url="source://view/html/log.html";
		
	}
	else{
		
		deviceone.print(cache.loadData("token"));
		var cache_log=eval('('+cache.loadData("token")+')');
		if(cache_log.type==1){
			do_Page.fire("bottom_show");
			 var data="email="+cache_log.email+"&password="+cache_log.passworld;
			log(do_Global.getMemory("surl")+"/login/api_login_with_email",data);
			
		}
		if(cache_log.type==2){
			 do_Page.fire("bottom_show");
			 var data="refresh_token="+cache_log.refresh_token+"&openid="+cache_log.openid;
			 log(do_Global.getMemory("surl")+"/login/api_login_with_wx_app_openid",data);
			
		}
		
	}
	
	
	//webview.url="http://tb2.sayweee.net/admin_article/edit/original"
	/*var data="email=1717226803@sina.com&password=liyabin234";
	log(do_Global.getMemory("surl")+"/login/api_login_with_email",data);*/
	 
	function  log(url,data){
		
		http.method = "POST";// GET | POST
		http.timeout = 30000; // 超时时间 : 单位 毫秒
		http.contentType = "application/x-www-form-urlencoded"; // Content-Type
		http.url = url;
		http.body = data;
		deviceone.print(http.body);
		/**
		 * 请求成功
		 */
		var flg=false;
		http.on("success", function(data) {
			
			if(data.result==true){
				
				do_Global.setMemory("language", data.object.language);
				var url =do_Global.getMemory("wurl")+"/login/token?weee_token="+data.object.token+"&redirect_url="+do_Global.getMemory("back_url");
				webview.url = url;
			}
			else{
				webview.url="source://view/html/log.html";
				do_Page.fire("bottom_hide");
			}
		});

		/**
		 * 请求失败
		 */
		http.on("fail", function(data) {
		    nf.alert("request fail");
		    webview.url="source://view/html/log.html";
			do_Page.fire("bottom_hide");
		});
		
		http.request();
	}
	
	//userAgent
	var app_info=device_info.getInfo();
	
	var lange="";

	if(device_info.getLocale().language=="zh"){
		lange="zh-Hans"
	}
	else{
		lange=device_info.getLocale().language;
	}

	deviceone.print(webview.userAgent="Mozilla/5.0 (Linux; U; Android 4.3; zh-cn; R8007 Build/JLS36C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile /12H141 WeeeApp "+app_info.OSVersion+" ("+device_info.getLocale().language+")");
	change_language();	


ui("do_Button_1").on('touch',function(){
	do_App.openPage({
		source:"source://view/set.ui", 
		statusBarState:"transparent",
		animationType: "push_r2l"
		});
	
});

marks_01.on('touch',function(){
	webview.reload();
	webview.url=do_Global.getMemory("wurl")+"/resource/edit";
	
});
marks_02.on('touch',function(){
	//var par={appId:"wx42d88765c71af904", scene:"0", type:"0", title:"share test", content:"hello world", url:"http://www.deviceone.net", image:"data://1.jpg", audio:"http://staff2.ustc.edu.cn/~wdw/softdown/index.asp/0042515_05.ANDY.mp3"};
	webview.reload();
	webview.url=do_Global.getMemory("wurl")+"/item/edit";//"http://tb2.sayweee.net/utils/test3"
});


deviceone.print(JSON.stringify(device_info.getAllAppInfo));

marks_03.on('touch',function(){
	webview.reload();
	webview.url=do_Global.getMemory("wurl")+"/event/edit";
});
marks_04.on('touch',function(){
	webview.reload();
	webview.url=do_Global.getMemory("wurl")+"/admin_article/edit/original";

});
marks_05.on('touch',function(){
	webview.reload();
	webview.url=do_Global.getMemory("wurl")+"/admin_article/edit/reprint";
	//shares.share("title", "content");
});
/***遮罩层控件事件-end**/
marks.on('touch',function(){
	marks.hide();
});

//页面绑定事件

/**底部菜单显示隐藏*/
do_Page.on("bottom_hide", function() {
	bottom.hide();
	line.hide();
	center.hide();
});

do_Page.on("bottom_show", function() {
	bottom.show();
    line.show();
    center.show();
});



//do_Button_1

do_Page.on("setbut_show", function() {

	ui("do_Button_1").show();

});


do_Page.on("back_url", function() {

	if(do_Global.getMemory("back_url")==do_Global.getMemory("wurl")+"/me"){
		webview.url=do_Global.getMemory("wurl");
		do_Page.fire("active_blog",1);
		return;
	}
	deviceone.print(do_Global.getMemory("wurl"));
	 
	 
	 
	webview.url=do_Global.getMemory("back_url");
});



/***点亮图标***/
do_Page.on("active_blog", function(data) {
	
	
	if(data=="1"){
		change(img1,"source://image/icon_01.png",lable1)
	}
	if(data=="2"){
			 change(img2,"source://image/icon_02.png",lable2)
		}
	
	if(data=="3"){
		change(img3,"source://image/icon_03.png",lable3)
	}
	
	if(data=="4"){
		change(img4,"source://image/icon_04.png",lable4)
	}
	

	 	 
});

/**map***/
do_Page.on("open_map", function(data) {
	//http://ditu.google.cn/maps?hl=zh&mrt=loc&q=39.940409,116.355257
	do_ex.openURL("http://ditu.google.cn/maps?hl=zh&mrt=loc&q="+data);

});
/**改变高度**/

do_Page.on("set_webviw_auto",function(){
	ui("do_WebView_2").height=-1;
	ui("do_WebView_2").redraw();	
});

do_Page.on("set_webviw",function(){
	ui("do_WebView_2").height=1380;
	ui("do_WebView_2").redraw();	
});

var share_show_wx = ui("ALayout_1").add("share_show_wxs", "source://view/share_wx.ui", 0, 0);
var share_show_wxs = ui("share_show_wxs");
/**分享**/
do_Page.on("share",function(pare) {
	deviceone.print(pare);
	share_show_wxs.fire("share_show",pare);
});

do_Page.on("change_url",function(url) {
	 deviceone.print(url);
	webview.url=url;
});



/*do_App.on("share_rers",function(data){
	
	deviceone.print(JSON.stringify(data));
	
});



/**登录回调***/
do_Page.on("log", function() {
	webview.url="source://view/html/log.html";
	do_Page.fire("bottom_hide");
	marks.hide();
});



/*页面绑定事件-end**/

/**change_language*/
 var toast="再次点击退出应用";
 function change_language() {
	 
	if(do_Global.getMemory("language")==""){
		
		do_Global.setMemory("language", device_info.getLocale().language);
		
	}

	
 if(do_Global.getMemory("language")=="en"){
	
		lable1.text="Home";
		lable2.text="Blogs";
		lable3.text="Deals";
		lable4.text="Me";
		lable5.text="Deal";
		lable6.text="Second-hand";
		lable7.text="Event";
		lable8.text="Blog";
		lable9.text="Repost";
		toast="Click exit application again";
	}
	else{
		lable1.text="首页";
		lable2.text="热帖";
		lable3.text="团购";
		lable4.text="我";
		lable5.text="发团购";
		lable6.text="卖二手";
		lable7.text="办活动";
		lable8.text="发帖";
		lable9.text="转载";
		toast="再次点击退出应用";
		
	}
	
}
/**显示遮罩层***/
center.on('touch',function(){
	marks.show();
});

/**显示遮罩层-end***/
/**开始加载**/
var load = ui("ALayout_1").add("loading", "source://view/loading.ui", 0, 0);
var loading = ui("loading");

webview.on("start", function(){

	//loading.fire("loadingrxa",1);
	marks.hide();
}); 

webview.on("loaded", function(){
	loading.fire("loadingrxa",2);
});
dealy.delay = 200;
/**底部导航事件*/
 b1.on('touch',function(data, e) {
	
	
	 webview.url=do_Global.getMemory("wurl");
	 do_Global.setMemory("back_url",webview.url);
	 
	 dealy.start();
	 dealy.on("tick", function(){
		 change(img1,"source://image/icon_01.png",lable1);
		}); 
	
 });
 
 b2.on('touch',function(data, e) {
	
	 
	 webview.url=do_Global.getMemory("wurl")+"/article";
	 do_Global.setMemory("back_url",webview.url);
	 dealy.start();
	 dealy.on("tick", function(){
		 change(img2,"source://image/icon_02.png",lable2);
		}); 
	 
	
 });
 
 b4.on('touch',function(data, e) {
		
	
	 webview.url=do_Global.getMemory("wurl")+"/product";
	 do_Global.setMemory("back_url",webview.url);
	 dealy.start();
	 dealy.on("tick", function(){
		 change(img3,"source://image/icon_03.png",lable3);
		}); 
	 
	
 });
 
 b5.on('touch',function(data, e) {
	 	
	 
	 webview.url=do_Global.getMemory("wurl")+"/me";
	  do_Global.setMemory("back_url",webview.url);
	  dealy.start();
		 dealy.on("tick", function(){
			 change(img4,"source://image/icon_04.png",lable4);
			}); 
	  
	  
 });

 
function change(img,url,lable){
	
	 img1.source="source://image/icon_01_01.png";
	 img2.source="source://image/icon_02_01.png";
	 img3.source="source://image/icon_03_01.png";
	 img4.source="source://image/icon_04_01.png";
	 lable1.fontColor="999999FF";
	 lable2.fontColor="999999FF";
	 lable3.fontColor="999999FF";
	 lable4.fontColor="999999FF";
	 img.source=url;
	 lable.fontColor="0AB0E1FF";
	
	 
 }

/**底部导航事件-end*/
 /**下载图片*/

function down_img(){
	
	http.timeout = 30000;
	http.contentType = "application/json";
	http.url = "http://g.hiphotos.baidu.com/zhidao/pic/item/b17eca8065380cd79f8ccc3fa144ad3458828155.jpg";
	http.download("data://xiazai.png");
	http.on("success", function(data) {
		deviceone.print(data);
	});
	http.on("fail", function(data) {
	   
	});
}
	


/**底部弹窗选择列表*/
/*
 * 底部弹出
 */
var popbottom = ui("ALayout_1").add("bottompop", "source://view/popImg.ui", 0, 0);

var popbottomf = ui("bottompop");

do_Page.on("up_img",function(data){
	do_Global.setMemory("up_par",data);
	popbottomf.fire("popbottomSJ",true);
});


//当前页面下，订阅android系统返回键的事件：3秒内连续点击两次退出应用
var canBack = false;
var delay3 = mm("do_Timer");

delay3.delay = 3000;
delay3.on("tick", function(){
	delay3.stop();
    canBack = false;
}); 
do_Page.on("back", function(){
    if (canBack) {
    	do_Global.exit();
    	
    } else {
    	do_Notification.toast(toast);
        canBack = true;
        delay3.start();
        //do_Page.back();
    }
});





