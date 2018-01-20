<%
/* *
 功能：支付宝页面跳转同步通知页面
 版本：3.2
 日期：2011-03-17
 说明：
 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 该代码仅供学习和研究支付宝接口使用，只是提供一个参考。

 //***********页面功能说明***********
 该页面可在本机电脑测试
 可放入HTML等美化页面的代码、商户业务逻辑程序代码
 TRADE_FINISHED(表示交易已经成功结束，并不能再对该交易做后续操作);
 TRADE_SUCCESS(表示交易已经成功结束，可以对该交易做后续操作，如：分润、退款等);
 //********************************
 * */
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.alipay.util.*"%>
<%@ page import="com.alipay.config.*"%>
<%@ page import="org.springframework.context.ApplicationContext"%>
<%@ page import="com.dinstar.sim.util.CacheHandle"%>
<%@ page import="com.dinstar.sim.service.PayService"%>
<html>
  <head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CLOUD v1.5</title>

  <!-- Bootstrap -->
  <link href="../dm/font-awesome-4.3.0/css/font-awesome.min.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="../dm/css/tree.css" />
  <link rel="stylesheet" type="text/css" href="../dm/css/tab-menu.css" />
  
  <link rel="stylesheet" type="text/css" href="../dm/css/dev-sch.css" />
  <link rel="stylesheet" type="text/css" href="../dm/css/headroom.css" />
  <link href="../dm/bootstrap-3.3.2-dist/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="../dm/bootstrap-3.3.2-dist/dist/css/bootstrap-theme.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../dm/ace/assets/css/ace.min.css" />
<link rel="stylesheet" type="text/css" href="../dm/css/util.css" />  
  <link rel="stylesheet" href="../dm/bootstrap-table/bootstrap-table.min.css">
  <link href="../dm/datetimepicker/css/bootstrap-datetimepicker.min.css" rel="stylesheet">

  <link rel="stylesheet" href="../dm/bootstrap-tags/dist/bootstrap-tagsinput.css">
  <link rel="stylesheet" href="../dm/bootstrap-tags/examples/assets/app.css">
  <link rel="stylesheet" href="../dm/lib/scojs/css/sco.message.css">
  <link rel="stylesheet" href="../dm/lib/scojs/css/scojs.css">
  <link rel="stylesheet" href="../dm/lib/jquery-tree/css/navigation.css">
  <link rel="stylesheet" href="../dm/car/css/car.css">
    <script src="../dm/lib/jquery-1.11.2.min.js"></script>
  <script src="../dm/bootstrap-3.3.2-dist/dist/js/bootstrap.min.js"></script>
  </head>
  <body>
<div class="row">
<div class="col-sm-2">&nbsp;</div>
    <div class="col-sm-8">
        <h3 class="header smaller lighter orange">
            <i class="fa fa-spinner fa-spin orange bigger-125"></i>
            提示信息
        </h3>
<%
	//获取支付宝GET过来反馈信息
	Map<String,String> params = new HashMap<String,String>();
	Map requestParams = request.getParameterMap();
	for (Iterator iter = requestParams.keySet().iterator(); iter.hasNext();) {
		String name = (String) iter.next();
		String[] values = (String[]) requestParams.get(name);
		String valueStr = "";
		for (int i = 0; i < values.length; i++) {
			valueStr = (i == values.length - 1) ? valueStr + values[i]
					: valueStr + values[i] + ",";
		}
		//乱码解决，这段代码在出现乱码时使用。如果mysign和sign不相等也可以使用这段代码转化
		valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
		params.put(name, valueStr);
	}
	
	//获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以下仅供参考)//
	//商户订单号
	String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"),"UTF-8");

	//支付宝交易号
	String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"),"UTF-8");

	//交易状态
	String trade_status = new String(request.getParameter("trade_status").getBytes("ISO-8859-1"),"UTF-8");

	//获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以上仅供参考)//
	
	//计算得出通知验证结果
	//boolean verify_result = AlipayNotify.verify(params);
  //同步通知不需要校验
	boolean verify_result=true;
  //trade_status="";
  String host = request.getHeader("host");
  String uri=request.getRequestURI();
  String query=request.getQueryString();
  String url="http://"+host+uri+"?"+query;
  //String bh="http://"+host+"/alipay.html";
  String bh="http://"+host+"/bootstrap.html";
	if(verify_result){//验证成功
		//////////////////////////////////////////////////////////////////////////////////////////
		//请在这里加上商户的业务逻辑程序代码
		//——请根据您的业务逻辑来编写程序（以下代码仅作参考）——
		if(trade_status.equals("TRADE_FINISHED") || trade_status.equals("TRADE_SUCCESS")){
			//判断该笔订单是否在商户网站中已经做过处理
				//如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
				//如果有做过处理，不执行商户的业务程序

        ApplicationContext context = CacheHandle.context;
        PayService p=(PayService) context.getBean("payServiceDao");
        p.alipaySucc(out_trade_no,trade_no,trade_status,url);
        
        String html="<div class=\"alert alert-block alert-success\">"
            +"<button type=\"button\" class=\"close\" data-dismiss=\"alert\">"
                +"<i class=\"fa fa-remove\"></i>"
            +"</button>"
            +"<p>"
                +"<strong>"
                    +"<i class=\"fa fa-ok\"></i>"
                    +"&nbsp;支付成功！"
                +"</strong>"
                +"5秒后跳转回主页面."
            +"</p>"
            +"<p>"
                +"<button class=\"btn btn-sm btn-success\" id=\"backToCloud\">立即返回</button>"
            +"</p>"
        +"</div>"
        +"<script>$('#backToCloud').bind('click',function(){window.location=\""
        +bh+"\""
        +"});setTimeout('window.location=\""
        +bh+"\""
        +"',5000)</script>";
        out.println(html);
		}else{
        String html="<div class=\"alert alert-danger\">"
        +"<button type=\"button\" class=\"close\" data-dismiss=\"alert\">"
            +"<i class=\"fa fa-remove\"></i>"
        +"</button>"
        +"<p>"
        +"<strong>"
            +"<i class=\"fa fa-remove\"></i>"
            +"&nbsp;支付失败！"
        +"</strong>"
       +"请再次支付或者联系技术支持"
         +"</p>"
         +"<p>"
            +"<button class=\"btn btn-sm btn-warning\" id=\"backToCloud\">立即返回</button>"
        +"</p>"
    +"</div>"
    +"<script>$(\"#backToCloud\").bind(\"click\",function(){window.location=\""
    +bh+"\""
    +"})</script>";
        out.println(html);
    }
		
		//该页面可做页面美工编辑
		//out.println("验证成功<br />");
		//——请根据您的业务逻辑来编写程序（以上代码仅作参考）——

		//////////////////////////////////////////////////////////////////////////////////////////
	}else{
		//该页面可做页面美工编辑
		//out.println("验证失败");
            String html="<div class=\"alert alert-danger\">"
        +"<button type=\"button\" class=\"close\" data-dismiss=\"alert\">"
            +"<i class=\"fa fa-remove\"></i>"
        +"</button>"
        +"<p>"
        +"<strong>"
            +"<i class=\"fa fa-remove\"></i>"
            +"&nbsp;验证失败！"
        +"</strong>"
       +"请求参数校验失败，请联系技术支持"
         +"</p>"
         +"<p>"
            +"<button class=\"btn btn-sm btn-warning\" id=\"backToCloud\">立即返回</button>"
        +"</p>"
    +"</div>"
    +"<script>$('#backToCloud').bind(\"click\",function(){window.location=\""
    +bh+"\""
    +"})</script>";
        out.println(html);
	}
%>
    </div>
    <div class="col-sm-2">&nbsp;</div>
    <!-- /span -->
</div>
  </body>
</html>