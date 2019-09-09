$('a').attr("href", "javascript:void(0)");
$('#appendCart a').attr("href", "#User_toolbars");
//手风琴
$(document).ready(function () {
    $('.classify_tree1>li').click(function () {
        $(this).children('ul').slideToggle("slow");
    });
});
//获取ID修改值
let uid = window.location.search.split("=")[1];
$.ajax({
    type: "get",
    data: {
        num: 6,
        order: `SELECT * FROM data WHERE tid = ${uid}`
    },
    url: "../api/connector.php",
    dataType: "json",
    success: function (str) {
        bb22 = str.data[0].price;
        $('.details_top_name span').text(str.data[0].gname);
        $('#hanhong').text(str.data[0].gname);
        $('.message_price').text(`￥${str.data[0].price}.00`)
    }
});
//选择颜色
$(".select_color b a").hover(function () {
    $(this).find("label").show();
}, function () {
    $(this).find("label").hide();
});
$(".select_color b a").click(function () {
    $(".select_color b a i").removeClass("ibb");
    $(this).find("i").addClass("ibb");
});
//设置内容界线
let x1 = $('.ww1').val(),
    x2 = $('.ww2').val();
$('.ee1').click(function () {
    let bb = $(this).next().val();
    bb--;
    $(this).next().val(bb);
    if (bb <= 0) {
        bb = 1;
        $(this).next().val(bb);
    } else {
        $(this).next().val(bb);
    }
});
$('.ee2').click(function () {
    let dd = $(this).prev().val();
    dd++;
    if (dd >= 138) {
        dd = 138;
        $(this).prev().val(dd);
    } else {
        $(this).prev().val(dd);
    }


});
//边敲边触发限制个数
$('.ww1,.ww2').bind('input propertychange', function () {
    let zhi = $(this).val();
    if (zhi <= 0) {
        zhi = 1;
        $(this).val(zhi);
    } else if (zhi >= 138) {
        zhi = 138;
        $(this).val(zhi);
    }
});
//飞入购物车
$(function () {
    var offset = $("#gwc").offset(); //结束的地方的元素
    //是$(".addcar")这个元素点击促发的 开始动画的位置就是这个元素的位置为起点
    $("#appendCart").click(function (event) {
        //判断登陆
        $.ajax({
            type: "get",
            data: {
                num: 3,
            },
            url: "../api/connector.php",
            success: function (str) {
                str1 = str.split('&')[0];
                yz = /\d{11}/;
                let col1 = $('.select_color b a i').eq(0).attr('class'),
                    col2 = $('.select_color b a i').eq(1).attr('class'),
                    col3 = $('.select_color b a i').eq(2).attr('class');
                if (yz.test(str1)) {
                    if (col1 || col2 || col3) {
                        let jg = $('.message_price').text(),
                            ys = $('.ibb').next().children("label").text(),
                            sl = $('#rsl_input').val(),
                            mz = $('.details_top_name span').text();
                        //飞入购物车
                        var addcar = $(this);
                        var img = $('.exzoom_nav_inner span img').eq(0).attr('src');
                        var flyer = $('<img class="u-flyer" src="' + img + '">');
                        flyer.fly({
                            start: {
                                left: event.pageX,
                                top: event.pageY
                            },
                            end: {
                                left: offset.left + 70,
                                top: offset.top + 150,
                                width: 0,
                                height: 0
                            },
                            onEnd: function () {
                                $("#msg").show().animate({
                                    width: '250px'
                                }, 200).fadeOut(1000);
                                this.destory();
                            }
                        });
                        //添加到数据库
                        let shuju = `${jg}&${ys}&${sl}&${mz}`;
                        $.ajax({
                            type: "get",
                            data: {
                                num: 9,
                                shuju: shuju,
                                order: `update usename set email='${shuju}' where name='${str1}';`
                            },
                            url: "../api/connector.php",
                            success: function (str) {
                                let jjz = $('#quantity').text();
                                jjz++;
                                $('#quantity').text(jjz);
                            }
                        });
                    } else {
                        messagePop('请选择商品颜色和数量');
                    }
                } else {
                    messagePop('请先登录，再加入购物车');
                }
            }

        });
    });

    function messagePop(value) {
        var str = '';
        str += '<div class="pop" style="display:none"><div class="pop-val">' + value + '</div></div>';

        $('body').append(str);
        $('.pop').fadeIn(200);

        $('.pop').css({
            'position': 'fixed',
            'width': '100%',
            'top': '0',
            'bottom': '0',
            'z-index': '1000'
        })
        $('.pop-val').css({
            'position': 'fixed',
            'width': '50%',
            'top': '40%',
            'background': 'rgba(0,0,0,.5)',
            'padding': '.2rem',
            'text-align': 'center',
            'left': '0',
            'right': '0',
            'margin-left': 'auto',
            'margin-right': 'auto',
            'border-radius': '5px',
            'color': '#fff',
            'font-size': '100%'
        })

        setTimeout(closeDiv2, 2000);
        setTimeout(closeDiv3, 2300);

        function closeDiv2() {
            $('.pop').fadeOut(300);
        };

        function closeDiv3() {
            $('.pop').remove();
        };
    }
});