<html lan="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/material-design-iconic-font.css" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap-select.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">
    <link href="css/malihu-scrollbar/jquery.mCustomScrollbar.min.css" rel="stylesheet">
    <link href="css/sweetalert2.css" rel="stylesheet">
    <link href="css/jquery.bootgrid.min.css" rel="stylesheet">
    <link href="css/dropzone/dropzone.min.css" rel="stylesheet">
    <link href="css/dropzone/basic.min.css" rel="stylesheet">
    <link href="css/app.min.1.css" rel="stylesheet">
    <link href="css/app.min.2.css" rel="stylesheet">
    <meta name="_token" content="{!! csrf_token() !!}"/>
    <title></title>
</head>
<body>
<!--Le header/toolbar la barre en haut qui contient les notification et les traitements generaux  -->
@include('header')
<!--Le sidebar/navigation drawer (android) -->
@include('sidebar')

<!-- L'interface principale -->


<section id="main">
    <!--Le contenu central -->
    <input id="code" style="display:none" value="{!! csrf_token() !!}">

    <section id="content">
        <div class="container">

            @include('gestion_magasins_pages.list_magasins')
            @include('gestion_magasins_pages.magasin_create')


        </div>
    </section>


</section>

<script type="text/javascript" src="js/promise.min.js"></script>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/bootstrap-growl.min.js"></script>
<script type="text/javascript" src="js/bootstrap-select.js"></script>
<script type="text/javascript">
$.ajaxSetup({
   headers: { 'X-CSRF-Token' : $('meta[name=_token]').attr('content') }
});
</script>
<script type="text/javascript" src="js/waves.min.js"></script>
<script type="text/javascript" src="js/typeahead.bundle.js"></script>
<script type="text/javascript" src="js/sweetalert2.min.js"></script>
<!--Bibliotheque pour le sidebar -->
<script type="text/javascript" src="js/malihu-scrollbar/jquery.mCustomScrollbar.concat.min.js"></script>
<script type="text/javascript" src="js/jquery.bootgrid.js"></script>
<script type="text/javascript" src="js/jquery.bootgrid.updated.min.js"></script>
<script type="text/javascript" src="js/sugar.min.js"></script>
<script type="text/javascript" src="js/jquerymy-1.2.4.min.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAUtsGVCuVLk9MrJvg0hV0PXcR7h-zLZ8I&libraries=places" ></script>
<script type="text/javascript" src="js/locationpicker.jquery.min.js"></script>
<script type="text/javascript" src="js/dropzone/dropzone.min.js"></script>


<!--

<script type="text/javascript" src='http://maps.google.com/maps/api/js?sensor=false&libraries=places'></script>
-->

<script type="text/javascript" src="js/functions.js"></script>
<script type="text/javascript" src="js/functions_gestion_magasins.js"></script>

</body>

</html>