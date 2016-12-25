<!DOCTYPE html>
<!--[if IE 9 ]><html class="ie9"><![endif]-->


<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login</title>

    <!-- Vendor CSS -->
    <link href="/css/animate.min.css" rel="stylesheet">
    <link href="/css/material-design-iconic-font.min.css"
          rel="stylesheet">

    <!-- CSS -->
    <link href="/css/app.min.1.css" rel="stylesheet">
    <link href="/css/app.min.2.css" rel="stylesheet">
    <style>
        .center {
            text-align: center;
        }
    </style>
	<meta name="_token" content="{!! csrf_token() !!}"/>
</head>

<body class="login-content">
<!-- Login -->
<form id="loginForm" action="/logint" method="post">
    <div class="lc-block toggled" id="l-login">
        <img src="/img/logo.png">
        <br/>
			@if (count($errors) > 0)
						<div class="alert alert-danger">
							<strong>Whoops!</strong> There were some problems with your input.<br><br>
							<ul>
								@foreach ($errors->all() as $error)
									<li>{{ $error }}</li>
								@endforeach
							</ul>
						</div>
					@endif
        <br/>
        <div class="input-group m-b-20">
            <span class="input-group-addon"><i class="zmdi zmdi-account"></i></span>
            <div class="fg-line">
				<input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input id="username" name="username" type="text" class="form-control"
                      placeholder="Utilisateur">
            </div>
        </div>

        <div class="input-group m-b-20">
            <span class="input-group-addon"><i class="zmdi zmdi-male"></i></span>
            <div class="fg-line">
                <input id="password" name="password" type="password" class="form-control"
                       placeholder="Mot de passe">
            </div>
        </div>

        <div class="clearfix"></div>

       <br>
	   <br>

        <a onclick="prepareLogin()" class="btn btn-login btn-danger btn-float">
            <i class="zmdi zmdi-arrow-forward"></i>
        </a>

        <ul class="login-navigation">
            <!-- <li data-block="#l-register" class="bgm-red">Register</li>
            <li data-block="#l-forget-password" class="bgm-orange">Forgot Password?</li> -->
        </ul>
    </div>
</form>

<!-- Javascript Libraries -->
<script src="/js/jquery.min.js"></script>
<script src="/js/bootstrap.min.js"></script>
<script type="text/javascript">
$.ajaxSetup({
   headers: { 'X-CSRF-Token' : $('meta[name=_token]').attr('content') }
});
</script>
<script src="/js/waves.min.js"></script>

<!-- Placeholder for IE9 -->
<!--[if IE 9 ]>
<script src="js/jquery.placeholder.min.js"></script>
<![endif]-->

<script src="/js/functions.js"></script>
<script type="text/javascript">
    function prepareLogin() {
		//alert("tes");
		/*
			 $.ajax(
             {
                            type: "POST",
                            dataType: 'json',
                            url: "/logint",
                            data: {
								username: $("#username").val(),
								password:$("#password").val()

							}
             	}
             ).done(function (data) {
                        if (JSON.parse(data) == "100") {

                        
                        }

                        else
                            swal("Erreur", "Utilisateur non  Supprimé", "error");
                    })*/
        $("#loginForm").submit();
    }
    ;
 
	
</script>
</body>

<!-- Mirrored from byrushan.com/projects/ma/1-5-2/jquery/login.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 09 Feb 2016 04:38:41 GMT -->
</html>