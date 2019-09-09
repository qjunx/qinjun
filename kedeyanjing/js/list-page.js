//左栏
$('a').attr("href", "javascript:void(0)");
$(document).ready(function () {
    $('.classify_tree1>li').click(function () {
        $(this).children('ul').slideToggle("slow");
    });
});
//人气推荐
$('.classify_recommend').mouseenter(function () {
    $('#btn_left,#btn_right').show();
});
let cishu = $('.recommend_ul>li').length - 4,
    cs = 0,
    yd = $('.recommend_ul>li').width() + 12;
$('#btn_right').click(function () {
    cs++;
    if (cs <= cishu) {
        $('.recommend_ul').animate({
            left: `-${yd*cs}px`,
        });
    } else if (cs >= cishu) {
        cs = cishu;
    }
});
$('#btn_left').click(function () {
    if (cs <= cishu && cs > 0) {
        $('.recommend_ul').animate({
            left: `-${yd*(cs-1)}px`,
        });
        cs--;
    } else if (cs <= 0) {
        cs = 0;
    }
});
//已选条件
kg = 0;
$(".more").click(function () {
    if (kg == 0) {
        $(".classify_class_height").animate({
            height: '293px'
        });
        kg = 1;
    } else {
        $(".classify_class_height").animate({
            height: '113px'
        });
        kg = 0;
    }
});
//列表显示
//事件委托显示加入购物车
$('.goodsPanel').on('mouseenter', 'li', function () {
    $(this).addClass('acccc');
    $(this).children("p:last-child").show();
});
$('.goodsPanel').on('mouseleave', 'li', function () {
    $(this).children("p:last-child").hide();
    $(this).removeClass('acccc');
});
//事件委托点击跳转详情页
$('.goodsPanel').on('click', 'li', function () {
    window.open("detail-page.html?id=" + $(this).attr('data-id'));
});
//数据渲染
let nowPage = "",
    pageNum = "",
    on1 = true,
    on2 = true,
    on3 = "";

function qinjun(w) {
    $.ajax({
        type: "get",
        data: {
            num: 5,
            page: w ? w : 1,
            cet: 60
        },
        url: "../api/connector.php",
        dataType: "json",
        success: function (str) {
            nowPage = str.page * 1;
            pageNum = Math.ceil(str.total / str.cet) * 1;
            creat(str, nowPage, pageNum);
            // console.log(str);

        }
    });
}
qinjun();

function creat(arr, a, b) { //DOM操作
    //渲染第一页数据
    let html = arr.data.map(item => {
        return `       <li data-id="${item.tid}">
        <a href="javascript:void(0)"><img src="${item.imgsrc}" alt="">
    <p class="y1">￥${item.price}</p>
    <p class="y2">${item.gname}</p>
    <p class="y3">${item.introduce}</p>
    </a>
    <p class="classify_comment">
            <i class="level_9"></i>
            <span>有<label><a target="_blank" href="/comment/weikangmt206-9-0-1-1.html">${item.comment}</a></label>条评论</span>
        </p>
        <p class="classify_btn">
<span style="width: 100px;margin: 5px 10px 0 4px">
<i></i>
加入购物车
</span>
<a href="">
<span style="margin: 5px 5px 0 0;background: #fff;color: red;float: right;"><i style="background-position: -2px -971px;"></i>收藏</span>
</a>
        </p>
    </li>`;
    }).join('');
    $('.goodsPanel').html("");
    $('.goodsPanel').html(html);
    $("#page").paging({
        nowPage: a, // 当前页码
        pageNum: b, // 总页码
        buttonNum: 7, //要展示的页码数量
        callback: function (num) { //回调函数
            if (on1 && on2) {
                qinjun(num);
            } else {
                qinjun1(num);
            }
        }
    });
};

$('.classify_product_top a').click(function () {

    if ($(this).index() == 0) {
        qinjun();
        on1 = true;
        on2 = true;
        $('.classify_product_top a').eq(1).text('销量');
        $('.classify_product_top a').eq(2).text('价格');
    } else if ($(this).index() == 1) {
        on2 = true;
        $('.classify_product_top a').eq(2).text('价格');
        if (on1) {
            $(this).text('销量▼');
            on1 = false;
        } else {
            $(this).text('销量▲');
            on1 = true;
        }
        on3 = 1;
        qinjun1();

    } else if ($(this).index() == 2) {
        on1 = true;
        $('.classify_product_top a').eq(1).text('销量');
        if (on2) {
            $(this).text('价格▼');
            on2 = false;
        } else {
            $(this).text('价格▲');
            on2 = true;
        }
        on3 = 2;
        qinjun1();
    }
});

function qinjun1(w) {
    w = w ? w : 1;
    console.log(w);
    let qja = '',
        qjz = "";
    if (on3 == 1) {
        if (on1 == true) {
            qja = 'asc';
            qjz = "comment";
        } else if (on1 == false) {
            qja = 'DESC';
            qjz = "comment";
        }
    } else if (on3 == 2) {
        if (on2 == true) {
            qja = 'asc';
            qjz = "price";
        } else if (on2 == false) {
            qja = 'DESC';
            qjz = "price";
        }
    }
    order = `SELECT * FROM data ORDER BY ${qjz} ${qja} LIMIT ${(w-1)*60},${60};`
    $.ajax({
        type: "get",
        data: {
            num: 6,
            page: w,
            cet: 60,
            order: order
        },
        url: "../api/connector.php",
        dataType: "json",
        success: function (str) {
            console.log(str);
            nowPage = str.page * 1;
            pageNum = Math.ceil(str.total / str.cet) * 1;
            creat(str, nowPage, pageNum);
            // console.log(nowPage, pageNum);

        }
    });
}