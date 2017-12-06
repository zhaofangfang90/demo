var PW;
var PH;
$(function(){
    PW = $(window).width();
    PH = $(window).height();
});

$(window).resize(function(){
    PW = $(window).width();
    PH = $(window).height();
});

/**
* 触摸和非触摸事件自动切换
*/
var hastouch;
var tapstart;
var tapmove;
var tapend;
$(function() {
	tapstart = "mousedown";
	tapmove  = "mousemove";
	tapend   = "mouseup";
	hastouch = false;
		
	if(isIE8() == false) {
		if(document.hasOwnProperty("ontouchstart") == true) {//判断是否可以触屏
			tapstart = "touchstart";
			tapmove  = "touchmove";
			tapend   = "touchend";
			hastouch = true;
		}
	}
	if(PW < 960) {
		tapstart = "touchstart";
		tapmove  = "touchmove";
		tapend   = "touchend";
		hastouch = true;
	}
});	

/**
*判断浏览器类型
*/
function isIE8(){
	if(navigator.userAgent.split(";")[1] != null) {
		return navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 8.0")=="-1" && navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 7.0")=="-1" ?false:true;
	}
	else {
		return false;
	}
}

/**
 *判断浏览器类型
 */
function isIE(){
	if(navigator.userAgent.split(";")[1] != null) {
		return navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie")=="-1" ? false:true;
	}
	else {
		return false;
	}
}

/**
*获取鼠标的当前的X轴的坐标
*/
function getPageX(e) {
	if(hastouch == true) {
		return e.targetTouches[0].pageX;
	}
	else {
		return e.pageX;
	}
}

/**
*获取鼠标的当前的Y轴的坐标
*/
function getPageY(e) {
	if(hastouch == true) {
		return e.targetTouches[0].pageY;
	}
	else {
		return e.pageY;
	}
}

/**
*获取高宽度的整数值
*/
function getWH(value) {
	value = value+"";
	if(value.indexOf("px") > 0) {
		value = value.substr(0,value.indexOf("px"));
	}
	value = parseInt(value);
	return value;
}

/**
* 包含函数
*/
function contains(a, b) {
	if(a == null || a == "" || b == null || b == "") {
		return false;
	}
	if(a.length < b.length) {
		return false;
	}
	else {
		var i =0;
		for(var j=0; j<a.length; j++) {
			if(b[i] == a[j]) {
				i++;
			}
			else {
				i = 0;
			}
			if(i == b.length) {
				return true;
			}
		}
	}
	return false;
}

/**
* 计算倒计时
*/
$(function() {
	return;
	//根据当前时区转UTC时间
	var targetDate1 = {
		which: $(".countdown1"),
		year: 2015,
		month: 7,
		day: 30,
		hour: 16,
		minute: 0,
		second: 0
	};
	var targetDate2 = {
		which: $(".countdown2"),
		year: 2015,
		month: 7,
		day: 31,
		hour: 16,
		minute: 0,
		second: 0
	};
	
    countdown(targetDate1);
	countdown(targetDate2);
	setInterval(function() {
		countdown(targetDate1);
		countdown(targetDate2);
	},500);
});

function countdown(targetDate) {
	var ts        = 0;
	var day       = 0
	var hour      = 0;
	var minute    = 0;
	var second    = 0;
	var UTCYear   = new Date().getUTCFullYear();
	var UTCMonth  = new Date().getUTCMonth();
	var UTCDay    = new Date().getUTCDate();
	var UTCHour   = new Date().getUTCHours();
	var UTCMinute = new Date().getUTCMinutes();
	var UTCSecond = new Date().getUTCSeconds();
	
	ts     = Date.UTC(targetDate.year, targetDate.month, targetDate.day, targetDate.hour, targetDate.minute, targetDate.second) - Date.UTC(UTCYear, UTCMonth, UTCDay, UTCHour, UTCMinute, UTCSecond);//6代表7月份
	day    = parseInt(ts/1000/60/60/24);
	hour   = parseInt(ts/1000/60/60%24);
	minute = parseInt(ts/1000/60%60);
	second = parseInt(ts/1000%60);
	
	day    = checkTime(day);
	hour   = checkTime(hour);
	minute = checkTime(minute);
	second = checkTime(second);
	
	targetDate.which.find(".day").html(day);
	targetDate.which.find(".hour").html(hour);
	targetDate.which.find(".minute").html(minute);
	targetDate.which.find(".second").html(second);
}
/**
*时间加零
*/
function checkTime(time) {
	if(time < 10 && time >= 0) {
		time = "0"+ time;
	}
	else if(time < 0) {
		time = 0;
	}
	return time;
};

function getHHMMSS(date) {
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	return checkTime(h) + ":" + checkTime(m) + " " + checkTime(s);
}

function getHHMM(date) {
	var h = date.getHours();
	var m = date.getMinutes();
	return checkTime(h) + ":" + checkTime(m);
}

/**
*获取链接参数
*/
function getParameter(name){ 
		var paramStr=location.search; 
		if(paramStr.length==0)
			return null; 
		if(paramStr.charAt(0)!='?')
			return null; 
		paramStr=unescape(paramStr);
		paramStr=paramStr.substring(1); 
		if(paramStr.length==0)
			return null; 
		var params=paramStr.split('&');
		for(var i=0;i<params.length;i++){
			var parts=params[i].split('=',2);
			if(parts[0]==name){ 
				if(parts.length<2||typeof(parts[1])=="undefined"||parts[1]=="undefined"||parts[1]=="null")
					return ""; 
				parts[1] = decodeURI(parts[1]);
				parts[1] = parts[1].replace(/</g, "");
				parts[1] = parts[1].replace(/>/g, "");
				return parts[1]; 
			} 
		} 
		return null; 
} 

/**
 *设置链接参数
 */
function setParameter(name, value, href, notXSS){
	if(!href) {
		href = window.location.href;
	}
	if(!name) {
		return href;
	}
	if(!notXSS) {
		href  = XSSFilter(href);
		name  = XSSFilter(name);
		value = XSSFilter(value);
	}
	var hrefHash = "";
	if(href.indexOf("#") > -1) {
		hrefHash = href.substring(href.indexOf("#"), href.length);
		href     = href.substring(0, href.indexOf("#"));
	}
	if(href.indexOf("?") > -1) {//有参数
		if(href.indexOf(name+"=") > -1) {//有该参数
			var queryString = href.substring(href.indexOf("?")+1, href.length);
			var queryArray  = queryString.split("&");
			queryString = "";
			for(var i=0; i<queryArray.length; i++) {
				var nameStr  = queryArray[i].split("=")[0];
				var valueStr = queryArray[i].split("=")[1];
				if(nameStr == name) {
					valueStr = value;
					queryArray[i] = nameStr+"="+valueStr;
				}
				if(i == 0) {
					queryString = queryArray[i];
				}
				else {
					queryString = queryString + "&" + queryArray[i];
				}
			}
			href = href.substring(0, href.indexOf("?")+1)+queryString;
		}
		else {//无该参数
			if(href.lastIndexOf("?") == href.length-1) {//链接有问号，但无任何参数
				href = href + name + "=" + value;
			} else {
				href = href + "&" + name + "=" + value;
			}
		}
	}
	else {//无参数
		href = href + "?" + name + "=" + value;
	}
	href += hrefHash;
	return href;
}

/**
 * 移除链接参数
 */
function removeParameter(name, href) {
	if(!href) {
		href = window.location.href;
	}
	if(!name) {
		return href;
	}
	var hrefHash = "";
	if(href.indexOf("#") > -1) {
		hrefHash = href.substring(href.indexOf("#"), href.length);
		href     = href.substring(0, href.indexOf("#"));
	}
	if(href.indexOf("?") > -1) {//有参数
		if(href.indexOf(name+"=") > -1) {//有该参数
			var queryString = href.substring(href.indexOf("?")+1, href.length);
			var queryArray  = queryString.split("&");
			queryString = "";
			for(var i=0; i<queryArray.length; i++) {
				var nameStr  = queryArray[i].split("=")[0];
				var valueStr = queryArray[i].split("=")[1];
				if(nameStr == name) {
					continue;
				}
				if(queryString) {
					queryString = queryString + "&" + queryArray[i];
				} else {
					queryString = queryArray[i];
				}
			}
			href = href.substring(0, href.indexOf("?")+1)+queryString;
			if(href.lastIndexOf("?") == href.length-1) {//链接有问号，但无任何参数
				href = href.substring(0, href.indexOf("?"));
			}
		}
	}
	href += hrefHash;
	return href;
}

/**
 * XSS过滤
 * @param value
 * @returns
 */
function XSSFilter(value) {
	if(!value) {
		return null;
	}
	else {
		value = value.replace(/<script>/g, "");
		value = value.replace(/<\/script>/g, "");
		value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
		value = value.replace(/\(/g, "&#40;").replace(/\)/g, "&#41;");
		value = value.replace(/'/g, "&#39;").replace(/"/g, "&#34;");
		value = value.replace(/javascript:/g, "");
		value = value.replace(/&/g, "&amp;");
		value = value.replace(/%/g, "&#37;");
		value = value.replace(/\\+/g, "&#43;");
		value = value.replace(/-/g, "&#45;");
		return value;
	}
}

/**
 * rgb颜色转十六进制颜色
 * @param rgb
 */
function RGBToHex(rgb) {
	var hex = "#";
	rgb     = rgb.match(/\d+/g);
	for(var i=0; i < 3; i++) {
		hex += checkTime(Number(rgb[i]).toString(16));
	}
	return hex;
}

/**
*requestAnimationFrame start
*/
var lastTime = 0;
var prefixes = 'webkit moz ms o'.split(' '); //各浏览器前缀

var requestAnimationFrame = window.requestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame;

var prefix;
//通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
for( var i = 0; i < prefixes.length; i++ ) {
	if ( requestAnimationFrame && cancelAnimationFrame ) {
	  break;
	}
	prefix = prefixes[i];
	requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
	cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] || window[ prefix + 'CancelRequestAnimationFrame' ];
}

//如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
if ( !requestAnimationFrame || !cancelAnimationFrame ) {
	requestAnimationFrame = function( callback, element ) {
	  var currTime = new Date().getTime();
	  //为了使setTimteout的尽可能的接近每秒60帧的效果
	  var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) ); 
	  var id = window.setTimeout( function() {
		callback( currTime + timeToCall );
	  }, timeToCall );
	  lastTime = currTime + timeToCall;
	  return id;
	};
	
	cancelAnimationFrame = function( id ) {
	  window.clearTimeout( id );
	};
}

//得到兼容各浏览器的API
window.requestAnimationFrame = requestAnimationFrame; 
window.cancelAnimationFrame = cancelAnimationFrame;

/**
*requestAnimationFrame end
*/

/**
 * 点击导航栏
 */
$(function(){
    var nav  = $(".nav");
    if(nav.length < 1) {
    	return;
    }
    var nav_item_a = $(".nav-item-a");
    var q          = 1;
    var position   = nav.css("position");
    if(position == "static" || position == "relative") {
    	q = 2;
    }
    
    nav.on("click", ".nav-item-a", function(){
        var self   = $(this);
        var anchor = self.data("anchor");
        var sh     = $(".content").scrollTop() + $("#"+anchor).offset().top - q*nav.height();

        $(".content").animate({
            scrollTop: sh
        }, 500);
        
        setTimeout(function(){
            nav_item_a.removeClass("nav-item-curr-a");
            self.addClass("nav-item-curr-a");
        }, 550);
    });
    scrollNav();
});

/**
 * 导航
 */
function scrollNav() {
    var content    = $(".content");
    var nav        = $(".nav");
    var sh         =0;
    var nav_item_a = $(".nav-item-a");
    var item       = $(".item");
    var nav_st     = nav.offset().top;
    content.scroll(function(){
        sh = content.scrollTop();
        //导航栏固定
        if(sh >= nav_st) {
            nav.addClass("nav-fixed");
        }
        else {
            nav.removeClass("nav-fixed");
        }
        item.each(function(){
            var h1 = $(this).offset().top+sh;
            var h2 = $(this).offset().top+$(this).outerHeight()-100;
            var id = $(this).attr("id");
            if(h1 <= sh <= h2) {
                nav_item_a.removeClass("nav-item-curr-a");
                nav_item_a.filter("[data-anchor='"+id+"']").addClass("nav-item-curr-a");
                return false;
            }
        });
    });
}

//获取字节数
function getSize(str) {
	var size = 0; 
	for (var i=0; i<str.length; i++) {  
		if (str.charCodeAt(i)<255) {  
			size++;  
		}
		 else {  
			size+=3;  
		}  
	} 
	return size;  
}