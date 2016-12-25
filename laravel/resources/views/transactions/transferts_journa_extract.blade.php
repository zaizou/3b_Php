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
    <section id="content">
        <div class="container">

            <input id="mag" value="{{ $id_mag }}" style="display:none">

            <div class="card " >
                <!--L'entete de la page' -->

                <div class="card-header">
                    <div class="row">
                        <div class="col-sm-9">
                            <h2>Transferts Journaliers :  {{ $nomMagazin }}
                                <small>Introduction du Montant des Transferts Journaliers</small>
                            </h2>

                            <div class=""></div>
                            <br/>
                            <button id="sendBtn"  class="btn btn-default btn-icon-text waves-effect"><i class="zmdi zmdi-mail-send zmdi-hc-fw"></i> Envoyer</button>


                        </div>



                    </div>
                </div>


                <div class="card-contenu ">
                    <div class="panel-group p-l-20" role="tablist" aria-multiselectable="true">
                        <div class="panel panel-collapse">
                            <div id="collapseOne" class="collapse in" role="tabpanel" aria-labelledby="headingOne">
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="offset-l3 col-sm-4">
                                            <div class="fg-line">
                                                <div class="input-group form-group">
                                                    <span class="input-group-addon"><i class="zmdi zmdi-calendar"></i></span>
                                                    <div class="dtp-container fg-line">
                                                        <input id="date_transfert"  type='text' class="form-control date-picker" placeholder="Cliquer ici...">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-3">
                                            <div class="fg-line">
                                                <input id="creat_input_jour" placeholder="Jour" class="form-control compte">
                                            </div>
                                        </div>

                                        <div class="col-sm-5">
                                            <div class="fg-line">
                                                <input id="creat_input_montant" placeholder="Montant" class="form-control compte">
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <div class="row">


                                        <div class="col-sm-2">

                                        <div class="fg-line">
                                            <input id="creat_input_transferant" placeholder="Transférant" class="form-control compte">
                                        </div>
                                        </div>

                                        <div class="col-sm-10">

                                            <div class="fg-line">
                                                <input id="creat_input_comment" placeholder="Commentaire" class="form-control compte">
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
<script type="text/javascript" src="js/moment.min.js"></script>
<script type="text/javascript" src="js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="js/functions.js"></script>
<script type="text/javascript" src="js/functions_transferts_journaliers.js"></script>


</body>

</html>