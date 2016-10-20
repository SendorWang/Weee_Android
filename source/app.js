/**
 * @Author : 234273537@qq.com
 * @Timestamp : 2016-08-08
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");

app.on("loaded", function () {
	app.openPage("source://view/index.ui");
});
