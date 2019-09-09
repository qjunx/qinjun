(function () {
    let qj = window.location.pathname.split("/").reverse()[0];
    if (qj == 'index.html') {
        //楼层跳跃
        $('#category_info a').attr("href", "html/list-page.html");
        $('#gwc').attr("href", "html/shopping.html");
        $('.pf_left_1,.pf_left_2,.pf_left_3,.pf_left_4,.pf_left_5').click(function () {
            //根据a标签的href转换为id选择器，获取id元素所处的位置，并高度减50px（这里根据需要自由设置）
            $('html,body').animate({
                scrollTop: ($($(this).attr('href')).offset().top)
            }, 666);
        });
        //促销活动+最新动态
        $('.right_1 li a').hover(function () {
            $('.right_1 li a').parent().css('background-color', '');
            $('.right_1 li a').css('border-bottom-color', '');
            let oname = $(this).attr("name");
            if (oname == 'q1') {
                $(this).parent().css('background-color', '#fff');
                $(this).css('border-bottom-color', '#fff');
                $('.right_2').show();
                $('.right_3').hide();
            } else {
                $(this).parent().css('background-color', '#fff');
                $(this).css('border-bottom-color', '#fff');
                $('.right_2').hide();
                $('.right_3').show();
            }
        });
        //秒杀+值得买
        $('.hp_left a').mouseenter(function () {
            if ($(this).attr("name") == 'z1') {
                $(this).css('background-position', '0px 0px');
                $(this).next().css('background-position', '0px -91px');
                $('.hp-right-1').show();
                $('.hp-right-2').hide();
            } else {
                $(this).css('background-position', '0px -273px');
                $(this).prev().css('background-position', '0px -182px');
                $('.hp-right-1').hide();
                $('.hp-right-2').show();
            }
        });
        //1F数据
        let html1 = '';

        $.getJSON('api/1F+5F.json', function (str) {
            let img = str[0].img[0].split("&"),
                name = str[0].name[0].split("&"),
                price = str[0].price[0].split("&");
            for (let i = 0; i < 16; i++) {
                let html1s = `<li>
         <a href="javascript:void(0)">
             <img src="${img[i]}" alt="">
             <p>${name[i]}</p>
             <span>${price[i]}</span>
         </a>
        </li>`;
                html1 += html1s;
            }
            $('.lc1-btm').html(html1);
            xdsq(oxlbt1, oxlbt1x, oxlbt1s);
        });
        //2F3F4F数据
        let html2 = "";
        $.getJSON('api/2F+3F+4F.json', function (str) {
            //2F-4F渲染
            for (let q = 0; q < str.length; q++) {
                let jx = '',
                    rm = "",
                    hotspph = "",
                    spt = "",
                    xlbt2 = "",
                    ggt = "";
                let jingxuan = str[q].top[1].split("&"),
                    remen = str[q].top[2].split("&"),
                    img = str[q].img[0].split("&"),
                    name = str[q].name[0].split("&"),
                    js = str[q].js[0].split("&"),
                    price = str[q].price[0].split("&"),
                    img2 = str[q].img2[0].split("&");
                //精选
                for (let w = 0; w < jingxuan.length; w++) {
                    let html2q = `
                <span>|</span>
                    <a href="javascript:void(0)">${jingxuan[w]}</a>
                `;
                    jx += html2q;

                }
                //热门
                for (let e = 0; e < remen.length; e++) {
                    let html2w = `
                <span>|</span>
                    <a href="javascript:void(0)">${remen[e]}</a>
                `;
                    rm += html2w;
                }
                //HOT商品排行
                for (let r = 0; r < str[q].hot.length; r++) {
                    hot = str[q].hot[r].split("&");
                    let html2e = `                       <li>
                <a href="javascript:void(0)">
                    <img src="${str[q].hotimg[r]}" alt="">
                    <label class="hot_ul-1">
                        ${hot[0]}
                    </label>
                    <label class="hot_ul-2">
                    ${hot[1]}
                        <span>${hot[2]}</span>
                    </label>
                    <label class="hot_ul-3">
                        <i></i>
                    </label>
                    <label class="hot_ul-4">
                    </label>
                </a>
            </li>`;
                    hotspph += html2e;
                }
                //商品图
                for (let t = 0; t < img.length; t++) {
                    if (t == 6) {
                        let xlbt2x = `
                   <div class="right-show">
                   <ul class="xlbt2" style="left: 0">
                   <li>
                   <a href="">
                       <img src="${str[q].xlbt2[0]}" alt="">
                   </a>
               </li>
               <li>
                   <a href="">
                       <img src="${str[q].xlbt2[1]}" alt="">
                   </a>
               </li>
                   </ul>
                   <ul class="infcpbtm2">
                   <li class="changebg" name='w1'></li>
                   <li></li>
               </ul>
                   </div>
                   `;
                        xlbt2 = xlbt2x;
                        spt += xlbt2;
                    }
                    let htmlr = `
                <li class="right-li">
                <a href="javascript:void(0)">
                    <img src="${img[t]}" alt="">
                    <p class="jg">${price[t]}</p>
                    <p class="xq">${name[t]}</p>
                    <p class="gg">${js[t]}</p>
                </a>
                </li>
                    `;
                    spt += htmlr;
                }
                //广告图
                for (let y = 0; y < img2.length; y++) {
                    let htmlgg = `
                <li>
                <a href="javascript:void(0)">
                    <img src="${img2[y]}" alt="">
                </a>
                `;
                    ggt += htmlgg;
                }
                let html2s = `<div class="lc content" id="lc-${q+2}">
            <div class="lc2-top">
            <h2><span>${q+2}F</span>${str[q].top[0]}</h2>
            <div class="lc2-top1 lc-top">
            精选：${jx}<span>|</span></div>
            <div class="lc2-top  lc-top" style="margin-left: 70px;">
            热门：${rm}<span>|</span>
            </div>
            <a href="javascript:void(0)" class="more">更多<i></i></a>
            </div>
            <div class="lc2-left">
            <div class="left-show">
            <ul class="left-show-top xlbt1" style="left: 0">
            <li><a href="javascript:void(0)"><img
            src="${str[q].xlbt[0]}" alt=""></a></li><li><a href="javascript:void(0)"><img src="${str[q].xlbt[1]}" alt=""></a></li>
            </ul>
            <ul class="infcpbtm1">
                        <li class="changebg" name='w1'></li>
                        <li></li>
                    </ul>
            </div>
            <div class="left-hot">
            <h4>HOT商品排行</h4>
            <ul class="hot_ul">
            ${hotspph}
            </ul>
            </div>
            <ul class="lc2-right">
            ${spt}
            </ul>
            </div>
            </div>
            <ul class="lc2-guanggao">
            ${ggt}
            </ul>
            `
                html2 += html2s;
            }
            $(".2-4xr").html(html2);
            xdsq(oxlbt2, oxlbt2x, oxlbt2s);
            xdsq(oxlbt3, oxlbt3x, oxlbt3s);
            let ys = $('.lc2-top'),
                h2 = $('.lc2-top h2');
            ys.eq(0).css('border-bottom', '3px solid #fd81b3');
            ys.eq(2).css('border-bottom', '3px solid #72b7fc');
            ys.eq(4).css('border-bottom', '3px solid #58bc58');
            h2.eq(0).css('color', '#fd81b3');
            h2.eq(1).css('color', '#72b7fc');
            h2.eq(2).css('color', '#58bc58');
        });

        //小轮播图
        let oxlbt1 = $('.xlbt li a img').width(),
            oxlbt1x = ".xlbt",
            oxlbt1s = ".infcpbtm li",
            oxlbt2 = $('.xlbt1 li a img').width(),
            oxlbt2x = ".xlbt1",
            oxlbt2s = ".infcpbtm1 li",
            oxlbt3 = $('.xlbt2 li a img').width(),
            oxlbt3x = ".xlbt2",
            oxlbt3s = ".infcpbtm2 li";

        function xlbt(a, b, c) {
            xlbtk = $(b).css('left');
            if (xlbtk == `-${a}px`) {
                $(b).animate({
                    left: `0px`
                });
                $(c).removeClass('changebg');
                $(c).eq(0).addClass('changebg');
                $(c).eq(2).addClass('changebg');
                $(c).eq(4).addClass('changebg');
            } else if (xlbtk == '0px') {
                $(b).animate({
                    left: `-${a}px`,
                });
                $(c).removeClass('changebg');
                $(c).eq(1).addClass('changebg');
                $(c).eq(3).addClass('changebg');
                $(c).eq(5).addClass('changebg');
            }
        };

        function xdsq(a, b, c) {
            let timer1 = setInterval(xlbt, 3000, a, b, c);
            //移入移出小轮播图停止和开始
            $(b).parent().hover(function () {
                clearInterval(timer1);
            }, function () {
                timer1 = setInterval(xlbt, 3000, a, b, c);
            })
            //划入改变小轮播图
            $(c).mouseenter(function () {
                if ($(this).attr("name") == 'w1') {
                    $(b).animate({
                        left: `0px`
                    });
                    $(c).removeClass('changebg');
                    $(c).eq(0).addClass('changebg');
                    $(c).eq(2).addClass('changebg');
                    $(c).eq(4).addClass('changebg');
                } else {
                    $(b).animate({
                        left: `-${a}px`
                    });
                    $(c).removeClass('changebg');
                    $(c).eq(1).addClass('changebg');
                    $(c).eq(3).addClass('changebg');
                    $(c).eq(5).addClass('changebg');
                }
            });
        }

        //5F
        //店铺滑动
        $('.tab li').mouseenter(function () {
            $('.tab li').removeClass('on');
            $(this).addClass('on');
            if ($(this).attr("name") == 'j1') {
                $('#t1')[0].src = 'https://pic.keede.com/Images/index_scb/20170303/shop_riyueguang.jpg';
                $('#t2')[0].src = 'https://pic.keede.com/Images/index_scb/20151028/map_riyueguang.jpg';
                $('.xx-1').text('可得旗下KD时尚品牌眼镜专营店日月光店位于日月光泰康区一楼扶手电梯对面，店内布满绿植，文艺摩登的装修，插画，涂鸦、手绘、工装时尚格局与潮酷夯款眼镜，置身于原创设计师灵感空间，享受新意世界。');
                $('#x1').text('营业时间 10:00 - 22:00');
                $('#x2').text('KD品牌专营店');
                $('#x3').text('进口仪器、专业验光师');
                $('#x4').text('框架眼镜个性化定配');
                $('#x5').text('上海市黄浦区徐家汇路618号1F-TK-19室(日月光中心)');
                $('#x6').text('021 - 64339193');
                $('#x7').html(`交通指引：轨道交通9号线打浦桥站<br>公交线路<br>41 , 205 , 17 , 327 , 45 , 146内环 , 43 , 931 , 146外环等`);
            } else if ($(this).attr("name") == 'j2') {
                $('#t1')[0].src = 'https://pic.keede.com/Images/mendian/20171208/shop_tanngzhen.jpg';
                $('#t2')[0].src = 'https://pic.keede.com/Images/mendian/20171130/map_tangzhen.jpg';
                $('.xx-1').text('可得旗下KD时尚品牌眼镜专营店唐镇店位于2号线唐镇站附近，是上海新型购物聚集地，其新潮、时尚风格的影响力直接辐射影响到了周边地区的发展，并为周边地区带来无限商业可能。');
                $('#x1').text('营业时间 10:00 - 22:00');
                $('#x2').text('KD品牌专营店');
                $('#x3').text('进口仪器、专业验光师');
                $('#x4').text('框架眼镜个性化定配');
                $('#x5').text('浦东新区高科东路777弄1号"唐镇阳光天地"商场负一层B143号');
                $('#x6').text('021 - 64339193');
                $('#x7').html(`交通指引：轨道交通2号线唐镇站1号出口<br>公交线路<br>1091、1099、636、1055、浦东20路、浦东2路、浦东38路`);
            } else if ($(this).attr("name") == 'j3') {
                $('#t1')[0].src = 'https://pic.keede.com/Images/index_scb/20180312/shop_zhongshangongyuan.jpg';
                $('#t2')[0].src = 'https://pic.keede.com/Images/index_scb/20180312/map_centerpark.jpg';
                $('.xx-1').text('可得旗下KD时尚品牌眼镜专营店中山公园店位于中山公园龙之梦商场1楼，属于上海成熟的知名商圈之一，人流量集中，客流稳定，店铺位置靠近商场大门，风格时尚又货品全面，为您带来全方位的配镜体验。');
                $('#x1').text('营业时间 10:00 - 21:30');
                $('#x2').text('免费专家咨询');
                $('#x3').text('进口仪器、专业验光师');
                $('#x4').text('免费框架维修');
                $('#x5').text('长宁区长宁路780号龙之梦1F-SPK15');
                $('#x6').text('021 - 60900080');
                $('#x7').html(`交通指引：地铁2号线、3号线、4号线中山公园站<br>公交线路<br>54路;316路;330路;519路;737路;765路;776路;825路[低谷定班];941路;947路`);
            } else if ($(this).attr("name") == 'j4') {
                $('#t1')[0].src = 'https://pic.keede.com/Images/index_scb/20190118/baoshan.jpg';
                $('#t2')[0].src = 'https://pic.keede.com/Images/index_scb/20190118/map_baoshan.jpg';
                $('.xx-1').text('可得旗下KD时尚品牌眼镜专营店宝山万达店位于宝山万达金街一层，全新的装饰风格，先进的验光设备，专业的验光师及配镜技师，欢迎您的光临！');
                $('#x1').text('营业时间 10:00 - 22:00');
                $('#x2').text('免费专家咨询');
                $('#x3').text('进口仪器、专业验光师');
                $('#x4').text('免费框架维修');
                $('#x5').text('宝山区一二八纪念路1000弄万达广场一楼金街155-A');
                $('#x6').text('021-65872687');
                $('#x7').html(`交通指引：地铁1号线共康路站1号口出<br>公交线路<br>95路、95路区间、159路、312路、701路、719路、849路、551路等`);
            } else if ($(this).attr("name") == 'j5') {
                $('#t1')[0].src = 'https://pic.keede.com/Images/index_scb/20190417/shop_zhongshangongyuan.jpg';
                $('#t2')[0].src = 'https://pic.keede.com/Images/index_scb/20190417/map_yishan.jpg';
                $('.xx-1').text('可得旗下KD时尚品牌眼镜旗舰店宜山路店位于桂林路宜山路交界口新宜街沿街，全新的装饰风格，先进的验光设备，专业的验光师及配镜技师，欢迎您的光临！');
                $('#x1').text('营业时间 10:00 - 21:30');
                $('#x2').text('免费专家咨询');
                $('#x3').text('进口仪器、专业验光师');
                $('#x4').text('免费框架维修');
                $('#x5').text('徐汇区宜山路706号可得眼镜店');
                $('#x6').text('021-64701557');
                $('#x7').html(`交通指引：地铁9号线桂林路站4号口出<br>公交线路<br>909路、224路区间、205路、89路、721路、171路、120路、809路等`);
            }
        });
        //左边
        $('.left li').mouseenter(function () {
            if ($(this).attr("name") == 'g1') {
                $(this).css('background-position', '0px top');
                $(this).next().css('background-position', '0px -136px');
                $('#t1').show();
                $('#t2').hide();
                $('#m1').show();
                $('#m2').hide();
            } else {
                $(this).css('background-position', '0px bottom');
                $(this).prev().css('background-position', '0px -273px');
                $('#t2').show();
                $('#t1').hide();
                $('#m2').show();
                $('#m1').hide();
            }
        });
        //眼镜百科
        $('.inlaf-tis a').mouseenter(function () {
            $('.inlaf-tis a').removeClass('active');
            $(this).addClass('active');
            if ($(this).attr("name") == 's1') {
                $('#c1').show();
                $('#c2').hide();
            } else {
                $('#c2').show();
                $('#c1').hide();
            }
        });
        //微信微博
        $('.xixi1 a').mouseenter(function () {
            if ($(this).attr("name") == 'v1') {
                $('.xixi1').removeClass('xixi2');
                $('.inlaf-tit1 img')[0].src = 'http://pic.keede.com/wide_keede/images/weixing.jpg';
            } else {
                $('.xixi1').addClass('xixi2');
                $('.inlaf-tit1 img')[0].src = '            http://pic.keede.com/wide_keede/images/weibog.jpg';
            }
        });
    }
})();