<?php
    //连接数据库
    include 'conn.php';
    //接收数据
    $num = isset($_REQUEST['num']) ? $_REQUEST['num'] : '';
    $name = isset($_REQUEST['name']) ? $_REQUEST['name'] : '';
    $password = isset($_REQUEST['password']) ? $_REQUEST['password'] : '';
    $cpn = isset($_REQUEST['cpn']) ? $_REQUEST['cpn'] : '';
    $ema = isset($_REQUEST['ema']) ? $_REQUEST['ema'] : '';
    $dl = isset($_COOKIE['name']) ? $_COOKIE['name'] : '0';
    $shuju= isset($_REQUEST['shuju']) ? $_REQUEST['shuju'] : '';
    //记住账号密码
    $jizhu=isset($_COOKIE['jizhu']) ? $_COOKIE['jizhu'] : '0';
    //页面
    $page = isset($_GET['page']) ? $_GET['page'] : '1';
    $cet = isset($_GET['cet']) ? $_GET['cet'] : '60';
    //自定义
    $order = isset($_GET['order']) ? $_GET['order'] : '';
    //查询语句
    $sql = "SELECT * FROM usename WHERE cellphone='$cpn'";
    $index = ($page - 1) * $cet;
    $sql4 = "SELECT * FROM data LIMIT $index,$cet";
    $sql5 = 'SELECT * FROM data';
    if($num==1){
        $res = $conn->query($sql);
        if($res->num_rows) {
            //查到，不给注册
            echo '0';
        }else {
            echo '1';
        }
        $res->close();
    }else if($num==2){
        $res = $conn->query($sql);
        if($res->num_rows) {
            //查到，不给注册
            echo '0';
        }else {
         $sql1="INSERT INTO usename(name,password,cellphone,email) VALUES('$name','$password','$cpn','$ema')";
         $sql2 = "SELECT * FROM usename WHERE `cellphone` LIKE '$cpn'";
        $res1 = $conn->query($sql1);
        $res2 = $conn->query($sql2);
        //提取数据
        $arr2 = $res2->fetch_all(MYSQLI_ASSOC);//对象//得到一 个数组
        $data2 = array(
            // 'total' => $arr2,
            'win' => 1,
            'name' => $arr2[0]['name'],
            'dates' => $arr2[0]['dates'],
            'cellphone' => $arr2[0]['cellphone'],
            'email' => $arr2[0]['email']
        );
        echo json_encode($data2,JSON_UNESCAPED_UNICODE);
            }
            $res->close();
            // $res1->close();
            $res2->close();
    }else if($num==3){
        $sql3 ="SELECT * FROM usename WHERE `name` LIKE '$name' AND `password` LIKE '$password'";
        $res3 = $conn->query($sql3);
        $arr3 = $res3->fetch_all(MYSQLI_ASSOC);
        if($res3->num_rows){
            if(isset($_COOKIE["name"])){
                // echo "已有账号登录，无需重复登陆";
                $data3 = array(
                    'win' => 0,
                    'name' => $arr3[0]['name'],
                    'dates' => $arr3[0]['dates'],
                    'cellphone' => $arr3[0]['cellphone'],
                    'email' => $arr3[0]['email']
                );
                echo json_encode($data3,JSON_UNESCAPED_UNICODE);
            }else{
                $data3 = array(
                    'win' => 1,
                    'name' => $arr3[0]['name'],
                    'dates' => $arr3[0]['dates'],
                    'cellphone' => $arr3[0]['cellphone'],
                    'email' => $arr3[0]['email']
                );
                echo json_encode($data3,JSON_UNESCAPED_UNICODE);
                setcookie("name", "$name", time()+3600);
            }
        }else{
            echo $dl."&".$jizhu;
        };
        $res3->close();
    }else if($num==4){
        if(isset($_COOKIE["name"])){
            setcookie("name", "$name", time()-3600);
            // echo '退出成功';
            echo '1';
        }else{
            // echo '未登录';
            echo '0';
        }
    }else if($num==5){
        $res4 = $conn->query($sql4);
        $res5 = $conn->query($sql5);
        //提取数据
    $arr5 = $res4->fetch_all(MYSQLI_ASSOC);
    $data5 = array(
        'total' => $res5->num_rows,
        'data' => $arr5,
        'page' => $page,
        'cet' => $cet
    );
    echo json_encode($data5,JSON_UNESCAPED_UNICODE);
        $res4->close();
        $res5->close();
    }else if($num==6){
        $res6 = $conn->query($order);//结果集
        $res5 = $conn->query($sql5);
        $arr6 = $res6->fetch_all(MYSQLI_ASSOC);
    $data6 = array(
        'total' => $res5->num_rows,
        'data' => $arr6,
        'page' => $page,
        'cet' => $cet
    );
    echo json_encode($data6,JSON_UNESCAPED_UNICODE);
    $res5->close();
    $res6->close();
    }else if($num==7){
        setcookie("jizhu", "$name&$password", time()+3600);
    }else if($num==8){
        setcookie("jizhu", "$name&$password", time()-3600);
    }else if($num==9){
        $res6 = $conn->query($order);
        echo $shuju;
    }
    $conn->set_charset('utf8');
    //关闭连接，防止资源浪费
    $conn->close();
?>