(function () {
    //同意阅读判断
    $('#agree').click(function () {
        if ($('#agree').is(':checked')) {
            $('#Register_Btn').css("background-color", "#f60");
            $("#Register_Btn").attr("name", "ty");
        } else {
            $('#Register_Btn').css("background-color", "#999");
            $("#Register_Btn").attr("name", "jj");
        }
    })
    //注册判断
    let p1 = "",
        p2 = "",
        p3 = '',
        p4 = '';
    $('#Register_Btn').click(function () {
        if ($(this).attr("name") == 'ty') {
            $('#hint').html("&emsp;");
            if (p1 && p2 && p3 && p4) {
                $('#hint').html("&emsp;");
                //写入数据库
                $.ajax({
                    type: "get",
                    data: {
                        num: 2,
                        cpn: $('#osjh').val(), //换成你的号码即可
                        name: $('#osjh').val(),
                        password: $('#Opassword').val(),
                        ema: $('#osjh').val(),
                    },
                    url: "../api/connector.php",
                    success: function (str) {
                        let arr = JSON.parse(str);
                        if (arr.win == 1) {
                            $(".main").hide();
                            $(".main_cg").show();
                            $("#user_name").html(arr.cellphone);
                            $("#biaoti").html('注册成功');
                            //登录
                            $.ajax({
                                type: "get",
                                data: {
                                    num: 3,
                                    name: $('#osjh').val(),
                                    password: $('#Opassword').val(),
                                },
                                url: "../api/connector.php",
                                dataType: "json",
                                success: function (str) {
                                    console.log(str);
                                    yz = /\d{11}/;
                                    if (yz.test(str.name)) {
                                        str = str.name.substring(0, 5);
                                        $('.roof_left1').html(
                                            `${str}...您好，欢迎来到可得！<a id="quit" href="javascript:void(0)">[退出]</a>`);
                                        //退出
                                        $("#quit").click(function () {
                                            $.ajax({
                                                type: "get",
                                                data: {
                                                    num: 4,
                                                },
                                                url: "../api/connector.php",
                                                success: function (str) {
                                                    location.reload();
                                                }
                                            });
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            } else {
                if (!p1) {
                    $('#hint').html("请输入正确的手机号");
                } else if (!p2) {
                    $('#hint').html("请输入正确的图形验证码");
                } else if (!p3) {
                    $('#hint').html("请输入正确的手机验证码");
                } else if (!p4) {
                    $('#hint').html("请输入正确的密码");
                }
            }

        } else {
            $('#hint').html("请确定是否阅读协议");
        }
    })
    //验证码判断
    let phonecode = "";
    $('#mam').click(function () {
        if ($(this).attr("name") == 'cg') {
            let sjhm = $("#osjh").val(),
                sj = 60;
            $.ajax({
                type: "post",
                data: {
                    userphone: sjhm //换成你的号码即可
                },
                url: "../api/duanxin.php",
                async: true,
                dataType: "json",
                success: function (str) {
                    phonecode = str.phonecode;
                }
            });

            function djs() {
                $("#mam").attr("name", "dd");
                $('#mam').text(`${sj}S后重新获取`);
                $('#mam').css("background-color", "#999");
                sj--;
                if (sj == 0) {
                    clearInterval(timer);
                    $('#mam').text(`获取验证码`);
                    $('#mam').css("background-color", "#f60");
                    sj = 60;
                    $("#mam").attr("name", "cg");
                    $('#hint').html("&emsp;");
                }
            };
            let timer = setInterval(djs, 1000);

        } else if ($(this).attr("name") == 'dd') {
            $('#hint').text("请耐心等待60秒后方可获取");
        } else {
            $('#hint').text("请输入正确的手机号");
        }
    });
    //事件委托判断输入框
    $('.data_main li').on('blur', 'input', function () {
        let qj = $(this).attr("name"),
            val = $(this).val().toLowerCase(),
            oi = $('.data_main li label i'),
            //手机号验证
            sjh = /1[3-9]\d{9}/,
            //验证码
            yzm = verifyCode.options.code.toLowerCase(),
            //密码
            mima = /\w{6,15}/;
        if (qj == "q1") {
            if (sjh.test(val)) {
                //设置图标
                oi.eq(0).css("background-position", "-147px -911px");
                $("#mam").attr("name", "cg");
                $('#mam').css("background-color", "#f60");
                $('#hint').html("&emsp;");
                $.ajax({
                    type: "get",
                    data: {
                        num: 1,
                        cpn: val, //换成你的号码即可
                    },
                    url: "../api/connector.php",
                    success: function (str) {
                        if (str == 0) {
                            oi.eq(0).css("background-position", "-175px -911px");
                            $('#hint').text("该手机号已被使用");
                            p1 = false;
                        } else if (str == 1) {
                            oi.eq(0).css("background-position", "-147px -911px");
                            p1 = true;
                        }
                    }
                });
            } else if (val == "") {
                oi.eq(0).css("background-position", "-502px -911px");
                $('#hint').html("&emsp;");
                p1 = false;
            } else {
                oi.eq(0).css("background-position", "-175px -911px");
                $('#hint').text("请输入正确的手机号");
                $("#mam").attr("name", "sb");
                $('#mam').css("background-color", "#999");
                p1 = false;
            }
        } else if (qj == "q2") {
            if (val == yzm) {
                $('#yzm').show();
                oi.eq(1).css("background-position", "-147px -911px");
                p2 = true;
            } else if (val == "") {
                $('#yzm').hide();
                p2 = false;
            } else {
                $('#yzm').show();
                oi.eq(1).css("background-position", "-175px -911px");
                p2 = false;
            }
        } else if (qj == "q3") {
            if (val == phonecode && val) {
                oi.eq(2).css("background-position", "-147px -911px");
                $('#hint').html("&emsp;");
                p3 = true;
            } else if (val == "") {
                oi.eq(2).css("background-position", "-526px -911px");
                $('#hint').html("&emsp;");
                p3 = false;
            } else {
                oi.eq(2).css("background-position", "-175px -911px");
                $('#hint').html("验证码输入错误");
                p3 = false;
            }
        } else if (qj == "q4") {
            if (mima.test(val)) {
                oi.eq(3).css("background-position", "-147px -911px");
                $('#hint').html("&emsp;");
                p4 = true;
            } else if (val == "") {
                oi.eq(3).css("background-position", "-550px -911px");
                $('#hint').html("&emsp;");
                p4 = false;
            } else {
                oi.eq(3).css("background-position", "-175px -911px");
                $('#hint').html("密码格式错误，请重新输入");
                p4 = false;
            }
        }
    });

    //登陆协议
    //扫描登陆和账号登陆的点击样式
    $('.l_r_title label').click(function () {
        $('.l_r_title label').removeClass("active");
        $(this).addClass("active");
        let dlyz = $(this).attr("name");
        if (dlyz == 'zh') {
            $('.j_saoma').hide();
            $('.j_zhanghao').show();
        } else {
            $('.j_zhanghao').hide();
            $('.j_saoma').show();
        }
    });
    //可得APP滑动样式
    let appimg = $('.l_tip_app img');
    appimg.eq(1).mouseenter(function () {
        $(this).hide();
        appimg.eq(2).show();
    });
    appimg.eq(2).mouseleave(function () {
        $(this).hide();
        appimg.eq(1).show();
    });
    $('.l_qrcode_content').mouseenter(function () {
        $('.l_tip_app').show(1000);
    });
    //登录
    $('#UserName,#Password_dl').bind('input', function () {
        let zh = $('#UserName').val(),
            mm = $('#Password_dl').val();
        if (zh && mm) {
            $('#log-btn').css('background', '#f60');
            $('#log-btn').attr("name", "dl");
        } else {
            $('#log-btn').css('background', '#999');
            $('#log-btn').attr("name", "");
        }
    });
    $('#log-btn').click(function () {
        let pd = $(this).attr("name");
        if (pd == 'dl') {
            $.ajax({
                type: "get",
                data: {
                    num: 3,
                    name: $('#UserName').val(),
                    password: $('#Password_dl').val(),
                },
                url: "../api/connector.php",
                success: function (str) {
                    let str1 = str.split('&');
                    if (str1[0] == 0) {
                        $('.ts').html('账号或密码输入错误');
                    } else {
                        let arr = JSON.parse(str),
                            jizhumima = $('#jz_password');
                        if (arr.win == 1) {
                            if (jizhumima.is(':checked')) {
                                //记住密码
                                $.ajax({
                                    type: "get",
                                    data: {
                                        num: 7,
                                        name: $('#UserName').val(),
                                        password: $('#Password_dl').val(),
                                    },
                                    url: "../api/connector.php",
                                    success: function (str) {
                                        $(location).attr('href', '../index.html');
                                    }
                                });
                            } else {
                                $.ajax({
                                    type: "get",
                                    data: {
                                        num: 8,
                                        name: $('#UserName').val(),
                                        password: $('#Password_dl').val(),
                                    },
                                    url: "../api/connector.php",
                                    success: function (str) {
                                        $(location).attr('href', '../index.html');
                                    }
                                });
                            }
                        } else {
                            $('.ts').html('请不要重复登陆');

                        }
                    }
                }
            });
        }
    });
})();