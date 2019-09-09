 //导航栏
 $('.list_item').mouseenter(function () {
     let qj = window.location.pathname.split("/").reverse()[0],
         qj1 = "";
     if (qj == "index.html") {
         qj1 = 'api/daohanglan.json';
     } else {
         qj1 = '../api/daohanglan.json';
     }
     let Oindex = $(this).index();
     $.getJSON(qj1, function (str) {
         let title = str[Oindex].title,
             content = str[Oindex].content,
             img = str[Oindex].img,
             html = "",
             html1 = "",
             htmlimg = "";
         for (let i = 0; i < title.length; i++) {
             html1 = "";
             for (let g = 0; g < content[i].length; g++) {
                 var html3 = `
                <a href="javascript:void(0)">${content[i][g]}</a>
                `;
                 html1 += html3;
             }
             var html2 = `
            <ul>
            <dt>${title[i]}<b>></b></dt>
            <dd>${html1}</dd>
            </ul>
            `;
             html += html2;
         }
         for (let q = 0; q < img.length; q++) {
             var html4 = `
            <a href="javascript:void(0)"><img
            src="${img[q]}" alt=""></a>
            `;
             htmlimg += html4;
         }
         $(".child_list_left").html(html);
         $(".child_list_right").html(htmlimg);
     });
     //显示
     $('.child_list').show();
     //非主页的导航栏
 });
 $('#category_info').mouseleave(function () {
     $('.child_list').hide();
 });

 if (qj != "index.html") {
     $('#category_info').hide();
     $('#wide_channel_category').hover(function () {
         $('#category_info').show();
     }, function () {
         $('#category_info').hide();
     });
 }
 //悬浮栏的微信和验光师显示隐藏
 $('.pf_right>a').hover(function () {
     $(this).find('div:first').show();
 }, function () {
     $(this).find('div:first').hide();
 })
 //显示隐藏回到顶部
 $(window).scroll(function () {
     var scrollT = $(window).scrollTop();
     if (scrollT >= 500) {
         $("#Back_top").fadeIn(666);
         $(".pf_left").fadeIn(666);
     } else {
         $("#Back_top").fadeOut(666);
         $(".pf_left").fadeOut(666);
     }
 });
 //回到顶部
 $("#Back_top").click(function () {
     $('body,html').animate({
         scrollTop: 0
     }, 666);
     return false;
 });
 //热门搜索
 $('.float-left a').hover(function () {
     $(this).addClass('gbys');
 }, function () {
     $(this).removeClass('gbys');
 });
 //购物车
 $('#gwc').attr("href", "shopping.html");
 $.ajax({
     type: "get",
     data: {
         num: 3,
     },
     url: "../api/connector.php",
     success: function (str) {
         str1 = str.split('&')[0];
         yz = /\d{11}/;
         if (yz.test(str1)) {
             //修改信息
             $.ajax({
                 type: "get",
                 data: {
                     num: 6,
                     order: `SELECT * FROM usename WHERE name = ${str1}`
                 },
                 url: "../api/connector.php",
                 dataType: "json",
                 success: function (str) {
                     str = str.data[0].email.split('&');
                     $('#quantity').text(str[2])
                 }
             });
         }
     }
 });