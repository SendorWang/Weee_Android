//related to badgeround.ui
var root = ui("$");
var anim = require("anim");
var conbgbox = ui("do_ALayout_1");
var do_Page = sm("do_Page");
var camera = sm("do_Camera");
var deviceone = require("deviceone");
var chose_img=sm("do_Album");
var Alg=sm("do_Algorithm");
var http=mm("do_Http");
var do_Global = sm("do_Global");
var nf = sm("do_Notification");
conbgbox.on("touch",function(){
	//空白事件，防止点击穿透底层
});
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
var page = sm("do_Page");
var paneler = ui("do_ALayout_1");

//自定义事件---打开

root.on("popbottomSJ",function(data){
	
	bgmask.visible = data;
	bgmask.animate(animMaskShow);
	paneler.animate(animPanelShow);
	
	
});
//遮罩事件
var bgmask = ui("maskbg");
bgmask.on("touch","",300,function(){
	var flag=false;
	bgmask.animate(animMaskHide,function(){
		bgmask.visible = false;
	});
	if(flag)return;
	paneler.animate(animPanelHide);
	flag=true;
});
//取消事件
var canel = ui("do_Button_canel");
canel.on("touch","",300,function(){
	anim.animbtn1(canel);
	bgmask.animate(animMaskHide,function(){
		bgmask.visible = false;
	});
	paneler.animate(animPanelHide);
	do_Page.fire("up_img_res",{"result":"cancel"});
});

if(do_Global.getMemory("language")=="en"){
	ui("do_Button_1").Text="Photograph";
	ui("do_Button_1").Text="Album";
	ui("do_Button_canel").Text="Canel";
}

//拍照
var btncamera = ui("do_Button_1");
btncamera.on("touch","",300,function(){
	//anim.animbtn1(btncamera);
	camera.capture(-1,"", 100, true, function(data) {// width : -1
		// 代表以height为基准
		// (保持原图横纵比)缩放;
			//deviceone.print(JSON.stringify(data));
		    Alg.base64("encode","file",data, function(data, e) {
		    	// deviceone.print(data);
		    	
		    	 up_img(data);
		    });
	});
	
	bgmask.animate(animMaskHide,function(){
	bgmask.visible = false;
	});
	paneler.animate(animPanelHide);
	
});

//选择照片
var btnAlbum = ui("do_Button_2");
btnAlbum.on("touch","",300,function(){
	
	chose_img.select({maxCount:1, width:"", height:"", quality:100, iscut:true}, function(data, e) {
	    //deviceone.print(data[0]);
	    Alg.base64("encode","file",data[0], function(data, e) {
	    	 //deviceone.print(data);
	    	 up_img(data);
	    });		    
	});
	
	bgmask.animate(animMaskHide,function(){
		bgmask.visible = false;
	});
	paneler.animate(animPanelHide);
	
});





function  up_img(data){
	
	http.method = "POST";// GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/x-www-form-urlencoded"; // Content-Type
	http.url = do_Global.getMemory("wurl")+"/admin_image/upload_image";
	var up_par=do_Global.getMemory("up_par");
	//deviceone.print(JSON.stringify(up_par));
	http.body = "image_data="+data;
	/**
	 * 请求成功
	 */
	var flag=false;
	//deviceone.print(http.getAddress());
	http.on("success", function(data) {
		
		if(data.result==true){	
			if(flag)return;
		
			//deviceone.print(JSON.stringify(data));
			do_Page.fire("up_img_res",data);
			flag=true;
		
		
		}
		else{
			nf.alert(data.message);
		}
	});

	/**
	 * 请求失败
	 */
	http.on("fail", function(data) {
	    nf.alert("Erro");
	});
	
	http.request();
	
}



