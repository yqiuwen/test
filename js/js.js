$(function () {
    // 城市切换
    (function () {
        // 自执行表达式
        var city = document.getElementsByClassName("city")[0];
        var aArr = city.children;
        for (var i = 0; i < aArr.length; i++) {
            aArr[i].index = i;
            aArr[i].onclick = function () {
                for (var j = 0; j < aArr.length; j++) {
                    aArr[j].className = "";
                }
                this.className = "active";
            }
        }
    })();

    // 搜索切换
    (function () {
        var menuLi = $('#menu li');
        var oText = $('form').find('.txt');
        var arrText = [
            '例如：荷棠鱼坊烤鱼 或 樱花日本料理',
            '例如：昌平区育新站龙旗广场2号楼609室',
            '例如：万达影院双人情侣卷',
            '例如：东莞出事了，大老虎是谁',
            '例如：北京初春降雪，天气变幻莫测'
        ]
        var iNow = 0;
        oText.val(arrText[iNow]);
        menuLi.each(function (index) {
            $(this).click(function () {
                menuLi.attr('class', 'gradient');
                $(this).attr('class', 'active');
                iNow = index;
                oText.val(arrText[iNow]);
            })
        })
        oText.focus(function () {
            $(this)
            if ($(this).val() == arrText[iNow]) {
                $(this).val('')
            }
        })
        oText.blur(function () {
            $(this)
            if ($(this).val() == '') {
                $(this).val(arrText[iNow]);
            }
        })
    })();

    // update 文字切换
    (function () {
        var arrData = [
            {'name': '萱萱', 'time': '5分钟前', 'title': '写了一篇新文章：那些灿烂华美的瞬间...', 'url': 'http://www.baidu.com'},
            {'name': '畅畅', 'time': '7分钟前', 'title': '广东三天抓获涉黄嫌疑犯', 'url': 'http://www.baidu.com'},
            {'name': '明明', 'time': '9分钟前', 'title': '国台办回应王玉琦', 'url': 'http://www.baidu.com'},
            {'name': '花花', 'time': '12分钟前', 'title': '那个灿烂华美的瞬间', 'url': 'http://www.baidu.com'},
            {'name': '明明', 'time': '15分钟前', 'title': '我累了', 'url': 'http://www.baidu.com'},
            {'name': '小明', 'time': '20分钟前', 'title': '就这样了', 'url': 'http://www.baidu.com'},
            {'name': '小花', 'time': '26分钟前', 'title': '哎哟，怎么还没结束', 'url': 'http://www.baidu.com'},
            {'name': '蛋蛋', 'time': '30分钟前', 'title': '我蛋疼', 'url': 'http://www.baidu.com'},
            {'name': '焦太郎', 'time': '35分钟前', 'title': '我想吃香蕉', 'url': 'http://www.baidu.com'}
        ]
        var upDate = $('#update ul');
        var update = $('#update');
        var str = ""; // 追加 li
        var numNow = 0;
        var timer = null;
        for (var i = 0; i < arrData.length; i++) {
            str += '<li><a href="' + arrData[i].url + '"><strong>' + arrData[i].name + '</strong><span>' + arrData[i].time + '</span>' + arrData[i].title + '</a></li>';
        }
        upDate.html(str);
        var upDateLi_H = upDate.find('li').height();
        var upadateUpBt = $('#upadateUpBt');
        var updateDownBt = $('#updateDownBt');
        upadateUpBt.click(function () {
            doMove(-1);
        })
        updateDownBt.click(function () {
            doMove(1);
        })

        function doMove(num) {
            numNow += num;
            if (Math.abs(numNow) > arrData.length - 1) {
                numNow = 0;
            }
            if (numNow > 0) {
                numNow = -(arrData.length - 1);
            }
            upDate.stop().animate({'top': upDateLi_H * numNow}, 2000, 'elasticOut')
        }

        function autoPlay() {
            timer = setInterval(function () {
                doMove(-1);
            }, 2300)
        }

        autoPlay();
        update.hover(function () {
            clearInterval(timer);
        }, autoPlay);
    })();

    // option 选项卡切换
    (function () {
        fnTab($('.tabNav1'), $('.tabCont1'));
        fnTab($('.tabNav2'), $('.tabCont2'));
        fnTab($('.tabNav3'), $('.tabCont3'));
        fnTab($('.tabNav4'), $('.tabCont4'));

        function fnTab(oNav, aCon) {
            var aElem = oNav.children();
            aCon.hide().eq(0).show();
            aElem.each(function (index) {
                $(this).click(function () {
                    aElem.removeClass('active').addClass('gradient');
                    $(this).removeClass('gradient').addClass('active');
                    aElem.find('a').attr('class', 'triangle_down_gray');
                    $(this).find('a').attr('class', 'triangle_down_red');
                    aCon.hide().eq(index).show();
                })
            })
        }
    })();

    // 自动播放的焦点图
    (function () {
        var arrData = [
            "爸爸群哪儿啦~", "人像摄影中的光影感", "娇柔妩媚、美艳大方~"
        ]
        var pDiv = $("#fade");
        var aUlLi = pDiv.find("ul li");
        var aOlLi = pDiv.find("ol li");
        var pP = pDiv.find("p");
        var picNow = 0;
        var timer = null;
        fnFade();
        autoPlay();
        aOlLi.hover(function () {
            clearInterval(timer);
        }, autoPlay);
        aOlLi.click(function () {
            picNow = $(this).index();
            fnFade();
        })

        function fnFade() {
            aUlLi.each(function (i) {
                if (i != picNow) {
                    aUlLi.eq(i).fadeOut().css("zIndex", 1);
                    aOlLi.eq(i).removeClass("active");
                } else {
                    aUlLi.eq(i).fadeIn().css("zIndex", 2);
                    aOlLi.eq(i).addClass("active");
                }
                pP.text(arrData[picNow]);
            })
        }

        function autoPlay() {
            timer = setInterval(function () {
                picNow++;
                picNow %= arrData.length;
                // picNow = picNow % arrData.length;
                fnFade();
            }, 1500)
        }
    })();

    // 日历提示说明
    (function () {
        var calSpan = $(".calendar h3 span");
        var calActive = $(".calendar .active");
        var calImg = $(".calendar .img");
        var calPrompt1 = $(".today_info1")
        var calPrompt2 = $(".today_info2")
        calActive.hover(function () {
            calPrompt2.show(500);
            calPrompt2.css("zIndex", 1);
        }, function () {
            calPrompt2.hide(500)
        });
        calImg.hover(function () {
            calPrompt1.show(500);
            calPrompt1.css("zIndex", 1);
        }, function () {
            calPrompt1.hide(500)
        });
    })();

    // BBS高亮显示
    (function () {
        $(".bbs ol li").mouseover(function () {
            $(".bbs ol li").removeClass("active").eq($(this).index()).addClass("active");

        })
    })();

    // hot_area 鼠标提示效果
    (function (){
                var arr = [
                    '',
                    '用户1<br />人气1',
                    '用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
                    '用户3<br />人气3',
                    '用户4<br />人气4',
                    '用户5<br />人气5',
                    '用户6<br />人气6',
                    '用户7<br />人气7',
                    '用户8<br />人气8',
                    '用户9<br />人气9',
                    '用户10<br />人气10'
                ];
                $('.hot_area li').mouseenter(function (){

                    if ( $(this).index() == 0 ) return;

                    $('.hot_area li p').remove();

                    $(this).append('<p style="width:'+ ($(this).width()-12) +'px; height:'+ ($(this).height()-12) +'px;">'+ arr[$(this).index()] +'</p>');
                });
            })();
});