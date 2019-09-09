(function () {
    //判断页面在后面添加JS文件
    window.onload = function () {
        let qj = window.location.pathname.split("/").reverse()[0],
            oScript = document.createElement("script"),
            dz = '';
        if (qj == "login.html") {
            oScript.src = "../js/index.js";
            dz = '../api/connector.php';
            document.body.parentNode.appendChild(oScript);
        } else if (qj == "index.html") {
            oScript.src = "./js/index.js";
            dz = './api/connector.php';
            document.body.parentNode.appendChild(oScript);
        }
        //验证是否登陆和记住账号密码
        $.ajax({
            type: "get",
            data: {
                num: 3,
            },
            url: dz,
            success: function (str) {
                str = str.split('&');
                yz = /\d{11}/;
                if (yz.test(str[0])) {
                    let str1 = str[0].substring(0, 5);
                    $('.roof_left1').html(
                        `${str1}...您好，欢迎来到可得！<a id="quit" href="javascript:void(0)">[退出]</a>`);
                    //退出
                    $("#quit").click(function () {
                        console.log(66);
                        $.ajax({
                            type: "get",
                            data: {
                                num: 4,
                            },
                            url: dz,
                            success: function (str) {
                                location.reload();
                            }
                        });
                    });
                }
                if ($('#UserName').val() == '') {
                    if (str[1] != "0") {
                        $('#UserName').val(str[1]);
                        $('#Password_dl').val(str[2]);
                        $('#jz_password').prop("checked", true);
                        $('#log-btn').css('background', '#f60');
                        $('#log-btn').attr("name", "dl");
                    }
                } else {
                    console.log(77);

                }
            }
        });
    };
    //顶部滑动显示隐藏
    //箭头函数指向windows
    $('.pron, .help,.app').hover(function () {
        $(this).find('ul').show();
    }, function () {
        $(this).find('ul').hide();
    })
    //收藏文件夹
    $('#collect').click(function () {
        var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL';
        if (document.all) {
            window.external.addFavorite(window.location.href, '可得网')
        } else if (window.sidebar) {
            window.sidebar.addPanel('可得网', window.location.href, "")
        } else {
            alert('您可以尝试通过快捷键' + ctrl + ' + D 加入到收藏夹~')
        }
    });
})();