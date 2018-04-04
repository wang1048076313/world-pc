/**
 * Created by YZTC on 2017/3/14.
 */

// window.onload=function () {


$.getJSON("json/2015328.json",function (data) {
      // for(var i=0;i<data.length;i++)
          var obg=data[0].mo;
        function hover_y(){
            for (var j = 0; j < obg.length; j++) {
                $('.btb_imgmin p').eq(j).html(obg[j].name);
                $('.btb_imgmin section').eq(j).html(obg[j].price + "元起");
                $('.btb_imgmin img').eq(j).attr("src", obg[j].imgUrl);
            }
        }
        hover_y();
    var i=0;
          $('.btb_cirtop div').click(function () {
              i++;
              if(i>=2){
                  i=0;
              }
                    obg=data[i].mo;
                    hover_y();
          })

});






$(function () {

    $('.logn_a:eq(0)').mouseenter(function () {
            $('.cl_a').show(600);
        event.stopPropagation();
    }).mouseleave(function () {
        $('.cl_a').hide(600)
    });
    $('#vaa').mouseenter(function () {
        $('.cl-abc').show(300);
        console.log($('.logn_a'))
    }).mouseleave(function () {
        $('.cl-abc').hide(300)
    });

// //二级导航
//     $('.logn_a:eq(0)').mouseenter(function () {
//         this.div = document.createElement('div');
//         this.div.className = "cl_a";
//         this.appendChild(this.div);
//         this.div.show(2000);
//
//     }).mouseleave(function () {
//         this.div.className = "cl_a";
//         this.div.remove();
//
//     });

    /*----------------预订*/

    $.ajax({
        url: "json/play.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
            $('.logn_a:eq(1)').hover(function () {
                ul = $('<ul>').appendTo($(this));
                ul.css({
                    "padding": "10px 0 10px 0",
                    "background": "#fff",
                    "position": "absolute",
                    "zIndex": "999",
                    "width": "160px",
                    "text-align": "center",
                    "left":-20,
                    "top":29.7,
                    "border-radius":10
                });
                for (var i of data) {
                    var li = $('<li><a></a></li>').appendTo(ul);
                    li.find('a').html(i.name).prop("href", i.url);
                    li.css({"height": "35px", "line-height": "35px"});
                    li.find('a').css("color", "#000");
                    li.hover(function () {
                        $(this).css("background", "#48c776")
                    }, function () {
                        $(this).css("background", "#fff")
                    })
                }
            }, function () {

                ul.remove();
            });
        }
    });

//end
    /*-----------APP小滑动----------------*/
    $('#sj_img').hover(function () {
        $(this).css("transform", "translateY(-10px)")
    }, function () {
        $(this).css("transform", "translatey(0px)")
    });

//页面横向导航

    ajax("GET", "json/menuu.json", "", function (response) {
        var obje = JSON.parse(response);
        var ul = document.createElement('ul');
        for (var i of obje) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.innerHTML = i.name;
            a.href = i.url;
            li.appendChild(a);
            ul.appendChild(li);

        }
        $('.header_nav').append(ul);
    });
    //end

    //轮播图

    var i = 0;
    var $ban_btn = $('.main_banner>button');

    function Run_banner() {
        $ban_btn[i].style.background = "#fff";
        i++;
        if (i >= 2) {
            i = 0;
        }
        $ban_btn.parent('div').css({
            "background": "url(img/1489048614533" + i + ".jpg)round"
        });

        $ban_btn[i].style.background = "pink";
    }//封装轮播定时器改变背景
    /*----------------------------------------*/
    var time = setInterval(Run_banner, 5000);
    /*----------------------------------------*/
    $ban_btn.click(function () {
        Run_banner();
        clearInterval(time);
    });//点击按钮最后切换背景并停止
    /*----------------------------------------*/
    $ban_btn.parent().mouseleave(function () {
        clearInterval(time);
        time = setInterval(Run_banner, 5000);
    });
    /*----------------------------------------*/
    $ban_btn.prev('img').prev().click(function () {
        Run_banner();
    });

    $('.main_banner>img')[1].onclick = function () {
        Run_banner();
    };
    //轮播左右翻页按钮


    $.ajax({
        url: "json/menu.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var $sh = $('.opacity-bg ul li>div');
            var $sp = $('.opacity-bg ul li>p');
            for (var i = 0; i < data.length; i++) {
                $sh[i].innerHTML = data[i].title;
                $sp[i].innerHTML = data[i].mainCity;
                var db = data[i].moreCity;
                var maxdiv = $('<div><div id="max_left"></div><div id="max_right"><img  width="80%"></div></div>').appendTo($('.opacity-bg>ul>li:eq(' + i + ')'));
                maxdiv.find('img').attr("src", data[i].moreCityImg).css({
                    "margin-top": "10%"
                });
                maxdiv.addClass("md_op");

                for (var j = 0; j < db.length; j++) {


                    if (i == 5) {
                        var mindiv = $('<div><h1>' + db[j].cityName + '</h1></div>').appendTo($(maxdiv.find('div').first()));
                        $(maxdiv.find('div:last')).detach();
                        mindiv.addClass("md_ip");
                        // $(maxdiv.find('div:first')).css({
                        //     "width":"370px"
                        // });
                        maxdiv.css({
                            "width": "370px"
                        });
                        mindiv.css({
                            "margin-left": "30px",
                            "width": "370px"
                        });
                        for (var k of db[j].items) {
                            var img = $('<img>');
                            img.attr("src", k);
                            img.css({
                                "border-radius": "50%",
                                "width": "80px",
                                "height": "80px",
                                "float": "left",
                                "margin": 10
                            });
                            mindiv.append(img);
                        }

                    }

                    if (i != 5) {
                        if (db.length < 3) {

                            if (j < 1) {
                                var mindiv = $('<div><h1></h1><ul></ul></div>').appendTo($(maxdiv.find('div').first()))
                            } else {
                                mindiv = $('<div><h1></h1><ul></ul></div>').prependTo($(maxdiv.find('div').last()));
                            }
                        } else {
                            if (j < 2) {
                                mindiv = $('<div><h1></h1><ul></ul></div>').appendTo($(maxdiv.find('div').first()));

                            } else {
                                mindiv = $('<div><h1></h1><ul></ul></div>').prependTo($(maxdiv.find('div').last()));

                            }
                        }


                        mindiv.addClass("md_ip");
                        mindiv.children('h1').html(db[j].cityName);

                        for (var k of db[j].items) {
                            var li = $('<li>');
                            if (Math.random() > 0.7) {
                                li.css("color", "red")
                            }
                            li.html(k);
                            mindiv.find('ul').append(li);
                        }
                    }
                }
                // for(var k=0;k<db[j].items.length;k++){
                //     var li=$('<li>');
                //     li.html(db[j].items[k]);
                //     mindiv.find('ul').append(li);
                //
                // }

            }
        }
    });


    /*-------------json-banner-----------------------*/

    $.getJSON("json/recommend.json", function (da) {
        var ul = $('<ul>').appendTo($('.b_c .banner_menu_top'));
        for (let i in da) {
            var li = $('<li><a href="javascript:0"></a></li>');
            li.find('a').html(da[i].title);
            ul.append(li);
            var obg = da[i].data;

            function obge() {
                for (let i in obg) {
                    $('.b_c .img_b').eq(i).css("background", "url(" + obg[i].imgUrl + ")round");
                    $('.b_c  p').eq(i).text(obg[i].title);
                    $('.b_c  button').eq(i).text(obg[i].price + " 元起");
                }
            }

            obge();
        }
        $('.b_c .banner_menu_top ul li').mouseover(function () {

            var index = $(this).index();

            obg = da[index].data;

            obge()

        });
    });


    $('.banner_menu:odd').css("background", "#f5f5f5");
    $.getJSON("json/freeWalk.json", function (data) {

        var ul = $('<ul>').appendTo($('.banner_menu_top:lt(2)'));

        for (var i = 0; i < data.length; i++) {
            var li = $('<li><a href="javascript:0"></a></li>');

            li.find('a').html(data[i].title);
            ul.append(li);
            for (let cl = 0; cl < $('.banner_menu_top').length; cl++) {

                $('.banner_menu_top:eq(' + cl + ') ul li').eq(0).css("borderBottom", "4px solid #61d482").find('a').css("color", "#61d482");

                var dbj = data[0].data;

                // console.log(dbj);//指代对象第一个data//砍点
                function Ret() {
                    for (var j = 0; j < dbj.length; j++) {
                        $('.banner_menu:eq(' + cl + ') .main_menu h4').eq(j).html(dbj[j].title);
                        $('.banner_menu .main_menu h3').html(dbj[0].time);
                        $('.banner_menu:eq(' + cl + ') .main_menu .img_b').eq(j).css("background", "url(" + dbj[j].imgUrl + ")round");
                        $('.banner_menu .main_menu:eq(' + cl + ') button').eq(j).html(dbj[j].price + "元起");
                    }
                }

                Ret();
                /*---------移入Li请求切换图片-------*/
                var li_n = $('.banner_menu_top:eq(' + cl + ') ul li');

                //利用闭包传for循环两次绑定事件li_n
                (function (li_n) {
                    li_n.mouseover(function () {

                        var index = $(this).index();
                        // var index=$('.banner_menu_top ul li').index($(this));
                        li_n.css("border-bottom", "none").find('a').css("color", "#323232");
                        li_n.eq(index).css("borderBottom", "4px solid #61d482").find('a').css("color", "#61d482");

                        dbj = data[index].data;

                        Ret()

                    });
                })(li_n);
                /*---------------*/
            }
        }

    });

    /*第一部分+复制部分旅游图end*/

    $.getJSON("json/menuu.json", function (data) {
        var ul = $('<ul>').prependTo($('.foot_nav'));
        for (var i of data) {
            var li = $('<li><a></a></li>').appendTo(ul);
            li.find('a').html(i.name).attr("href", i.url)
        }
    });

    $('.board button').click(function () {
        $('.board').remove()
    })
});//onload的括号
