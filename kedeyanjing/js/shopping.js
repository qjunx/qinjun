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
                    console.log(str);

                    str = str.data[0].email.split('&');
                    $('.list_text a').text(str[3]);
                    $('#ysx').text(str[1]);
                    $(".price").text(str[0]);
                    $(".sum").val(str[2]);
                    let danjia = str[0].split('￥')[1] * str[2];
                    $('.sum_price').text(`￥${danjia}`);
                }
            });
        } else {
            $('#biaoti').text('请您先登陆');
        }
    }
});