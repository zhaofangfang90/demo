var startDate = "2017-09-01";//开始事件
var endDate   = "2018-09-01";//结束事件

$(document).ready(function(){
    addAreaSelectListener();//添加区域选择事件监听
    resizeListener();//窗口缩放监听
});

/**
 * 窗口缩放监听
 */
function resizeListener() {
    $(window).on("resize", function(){
        initTaskPosition();//初始化任务列表的位置
    });
}
/**
 * 添加区域选择事件监听
 */
function addAreaSelectListener() {
    $(".filter_area_item").click(function(){
        //debugger;
        $(this).addClass("filter_area_curr_item").siblings(".filter_area_item").removeClass("filter_area_curr_item");
        var id = $(this).data("id");
        var countryList = getCountryListByAreaId(id);//根据区域id获取国家列表
        renderCountryList(countryList);//渲染国家列表
        addCountrySelectListener();//添加国家监听事件

        //切换区域时清空渲染数据
        renderSceneList();
        renderProductList();
        $(".filter_scene_title").css("display","none");
        $(".timeline_conn").css("display","none");
        $(".plan_title").css("display","none");
    });
}

/**
 * 根据区域id获取国家列表
 * @param areaId 区域id
 */
function getCountryListByAreaId(areaId) {
    var countryList = [];
    var k =0;
    for(var i=0; i<countryListData.countryList.length; i++) {
        if(countryListData.countryList[i].areaId == areaId) {
            countryList[k++] = countryListData.countryList[i];
        }
    }
    return countryList;
}

/**
 * 渲染国家列表
 * @param countryList
 */
function renderCountryList(countryList) {
    //渲染
    var data = {
        countryList: countryList
    };
    var html = template("filter_country_template", data);
    document.getElementById("filter_country_wrapper").innerHTML = html;
}

/* **************************************************************** */

/**
 * 添加国家监听事件
 */
function addCountrySelectListener() {
    $(".filter_country_item").click(function(){
        $(this).addClass("filter_country_curr_item").siblings(".filter_country_item").removeClass("filter_country_curr_item");
        var id = $(this).data("id");
        var sceneList = getSceneListByCountryId(id);//根据国家id获取场景列表
        renderSceneList(sceneList);//渲染场景列表
        addSceneSelectListener();//添加场景监听事件

        //切换国家时清空渲染数据
        renderProductList();
        $(".plan_title").css("display","none");
        $(".timeline_conn").css("display","none");
    });
}

/**
 * 根据国家id获取场景列表
 * @param countryId 国家id
 */
function getSceneListByCountryId(countryId) {
    var sceneList = [];
    var k =0;
    for(var i=0; i<sceneListData.sceneList.length; i++) {
        if(sceneListData.sceneList[i].countryId == countryId) {
            sceneList[k++] = sceneListData.sceneList[i];
        }
    }
    return sceneList;
}

/**
 * 渲染场景列表
 * @param sceneList
 */
function renderSceneList(sceneList) {
    //渲染
    var data = {
        sceneList: sceneList
    };
    var html = template("filter_scene_template", data);
    document.getElementById("filter_scene_wrapper").innerHTML = html;
}


/************************显示产品列表****************************/

/**
 * 添加场景监听事件
 */
function addSceneSelectListener() {
    $(".filter_scene_item").click(function(){
        $(this).addClass("filter_scene_curr_item").siblings(".filter_scene_item").removeClass("filter_scene_curr_item");
        var id = $(this).data("id");
        var mainProductList = getProductListBysceneId(id);//根据场景id获取产品列表
        renderProductList(mainProductList);//渲染产品列表
        initTaskPosition();//初始化任务的位置
        fixedTimeline();//页面滚动一定的高度，时间轴定位在顶部
    });
}

/**
 * 根据场景id获取产品列表
 * @param sceneId 场景id
 */
function getProductListBysceneId(sceneId) {
    var mainProductList = [];
    var k =0;
    for(var i=0; i<mainProductListData.mainProductList.length; i++) {
        if(mainProductListData.mainProductList[i].sceneId == sceneId) {
            mainProductList[k++] = mainProductListData.mainProductList[i];
        }
    }
    return mainProductList;
}

/**
 * 渲染产品列表
 * @param mainProductList
 */
function renderProductList(mainProductList) {
    //渲染
    var data = {
        mainProductList: mainProductList
    };
    var html = template("filter_product_template", data);
    document.getElementById("filter_product_wrapper").innerHTML = html;
}

/**
 * 初始化任务的位置
 */
function initTaskPosition(){
   //var w  = getWH($(".product_right_list").width());//获取显示区域的宽度
    var ts = new Date(endDate.replace(/-/g, "/")).getTime() - new Date(startDate.replace(/-/g, "/")).getTime();
   $(".product_right_item").each(function(index){
       var left = (new Date($(this).attr("date").replace(/-/g, "/")).getTime() - new Date(startDate.replace(/-/g, "/")).getTime())/ts*100+"%";
       var top  = $(this).attr("position")  == "top" ? "-55px" : "0px";
       $(this).css({"left":left});
       $(this).find(".product_right_item_desc").css({"top":top});
      //console.log("1:"+new Date(endDate.replace(/-/g, "/")));
   });
}

/**
 * 页面滚动一定的高度，时间轴定位在顶部
 */
function fixedTimeline(){

    var height=$(".timeline_conn").offset().top;
    $(window).scroll(function(){
        //debugger;
        var scrollTop = $(this).scrollTop();
        if(scrollTop>height){
            $(".timeline_conn").addClass("timeline_conn_fixed");
        }else{
            $(".timeline_conn").removeClass("timeline_conn_fixed");
        }
    });
}