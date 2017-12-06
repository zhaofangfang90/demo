//区域数据
var areaListData={
    areaList:[
            {
                id: 0,
                name: "China"
            },
            {
                id: 1,
                name: "Japan"
            },
            {
                id: 2,
                name: "India"
            },
            {
                id: 3,
                name: "Europe"
            },
            {
                id: 4,
                name: "APAC"
            },
            {
                id: 5,
                name: "MEA"
            },
            {
                id: 6,
                name: "North America"
            },
            {
                id: 7,
                name: "Latin America"
            }
        ]
};

$(document).ready(function(){
    var html = template("filter_area_template", areaListData);
    document.getElementById("filter_area_wrapper").innerHTML = html;
});