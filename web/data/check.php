<?php
$user = $_POST["TxtUserName"];
$password = $_POST["TxtPassword"];
$con = mysql_connect("localhost","root","111111");
if (!$con)
{
	die('Could not connect: ' . mysql_error());
}

mysql_select_db("simserver", $con);

$result = mysql_query("SELECT * FROM tbl_sysuser");

$flag = 0;
while($row = mysql_fetch_array($result))
{
    if($row['username']==$user && $row['password']==$password)
	{
		$flag = 1;
		break;
	}
}

if($flag)
{
	session_start();
	if(!isset($_cookie["user"]))
	{
		setcookie("user",$user,0);
	}
	
	$_SESSION['login']=1;
	$s = array("success"=>"true", "url"=>"../next.html");
	$tmp = json_encode($s);
	echo $tmp;
}
else
{
	$s=array('success'=>'false');
	$tmp = json_encode($s);
	echo $tmp;	
}

mysql_close($con);
?>

