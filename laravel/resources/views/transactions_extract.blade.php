<!DOCTYPE html>
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
    <link href="css/bootstrap-datetimepicker.min.css" rel="stylesheet">
    <link href="css/comptabilite_extract.css" rel="stylesheet">
    <link href="css/app.min.1.css" rel="stylesheet">
    <link href="css/app.min.2.css" rel="stylesheet">
    <meta name="_token" content="{!! csrf_token() !!}"/>
    <title>Chargement d'un Fichier Excel</title>
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

            <div class="card depneses_recettes">
                <!--L'entete de la page' -->
                <div class="card-header">
                    <h2>Recettes, Dépenses et Transferts  :  {{ $nomMagazin }}
                        <small>Affichage des actvités du magazin.</small>
                    </h2>
                    </h2>
                </div>

                <div class="card-body">
                    <div class="m-l-20 m-sm-10 ">
                            <span class="btn btn-primary btn-file m-r-10 waves-effect">
                                Charger un fichier Excel
                            <object id="file-object"></object>
                            </span>

                        <button id="clearBtn" style="display: none" class="btn btn-default btn-danger btn-icon-text waves-effect"><i class="zmdi zmdi-delete zmdi-hc-fw"></i> Vider les tables</button>
                        <button id="sendBtn" style="display: none" class="btn btn-default btn-icon-text waves-effect"><i class="zmdi zmdi-mail-send zmdi-hc-fw"></i> Envoyer les Recettes/Dépenses</button>
                        <button id="sendBtnTransferts" style="display: none" class="btn btn-default btn-icon-text waves-effect"><i class="zmdi zmdi-mail-send zmdi-hc-fw"></i> Envoyer les Transferts</button>


                    </div>
                    <br>
                    <br>

                    <div class="m-l-20 m-sm-10 col-sm-4 input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-account"></i></span>
                        <div class="fg-line">
                            <input id="sheetName" type="text" class="form-control" placeholder="Nom de la feuille Excel">
                        </div>
                    </div>
                    <br>
                    <br>


                    <div class="row">
                        <div class="m-l-20 m-sm-10 col-sm-4">
                            <p class="c-black f-500 m-b-20">Du :</p>

                            <div class="input-group form-group">
                                <span class="input-group-addon"><i class="zmdi zmdi-calendar"></i></span>
                                <div class="dtp-container fg-line">
                                    <input id="fromDate"  type='text' class="form-control date-picker" placeholder="Cliquer ici...">
                                </div>
                            </div>
                        </div>

                        <div class="m-l-20 m-sm-10  col-sm-4">
                            <p class="c-black f-500 m-b-20">Au :</p>

                            <div class="input-group form-group">
                                <span class="input-group-addon"><i class="zmdi zmdi-calendar"></i></span>
                                <div class="dtp-container fg-line">
                                    <input id="toDate"  type='text' class="form-control date-picker" placeholder="Cliquer ici...">
                                </div>
                            </div>
                        </div>

                    </div>


                </div>


            </div>

            <div class="card depneses_recettes">
                <!--L'entete de la page' -->
                <div class="card-header">
                    <h2>Recettes et Dépenses
                        <small>Affichage des actvités du magazin.</small>
                    </h2>
                    </h2>
                </div>

                <div class="card-body">



                    <!--Le tableau qui affiche la liste des comptes -->
                    <table id="data-table-command" class="table table-striped table-vmiddle bootgrid-table"
                           aria-busy="false">
                        <!--l'entete du tableau' -->
                        <thead>
                        <tr>
                            <th data-column-id="idCompta" data-identifier="true" data-type="numeric"  data-width="7%" ></th>
                            <th  data-column-id="dateCompta"   >Date</th>
                            <th data-column-id="jourCompta" class="text-left" >Jour</th>
                            <th data-column-id="montantCompta" class="text-left"   >Montant</th>
                            <th data-column-id="depense" class="text-left"     >Dépense</th>
                            <th data-column-id="observationCompta" class="text-left" data-width="30%" >Observation</th>
                            <th data-column-id="commands" data-formatter="commands" data-sortable="false">Commandes</th>
                        </tr>
                        </thead>

                        <!--Les lignes du tableau -->
                        <tbody>

                        </tbody>
                    </table>

                </div>


            </div>

            <div class="card transferts">
                <!--L'entete de la page' -->
                <div class="card-header">
                    <h2>Transferts
                        <small>Affichage des transferts effectués.</small>
                    </h2>
                </div>

                <div class="card-body">


                    <!--Le tableau qui affiche la liste des comptes -->
                    <table id="data-table-command-transferts" class="table table-striped table-vmiddle bootgrid-table"
                           aria-busy="false">
                        <!--l'entete du tableau' -->
                        <thead>
                        <tr>
                            <th data-column-id="idTransfert" data-identifier="true" data-type="numeric"  data-width="7%" ></th>
                            <th data-column-id="dateTransfert "    >Date</th>
                            <th data-column-id="jourTransfert" class="text-left" >Jour</th>
                            <th data-column-id="montantTransfert" class="text-left"  >Montant</th>
                            <th data-column-id="transferant" class="text-left" >Trans</th>
                            <th data-column-id="observationTransfert" class="text-left" data-width="30%">Observation</th>
                            <th data-column-id="commands" data-formatter="commands" data-sortable="false">Commandes</th>
                        </tr>
                        </thead>

                        <!--Les lignes du tableau -->
                        <tbody>

                        </tbody>
                    </table>

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
<script type="text/javascript" src="js/sweetalert2.min.js"></script>
<!--Bibliotheque pour le sidebar -->
<script type="text/javascript" src="js/malihu-scrollbar/jquery.mCustomScrollbar.concat.min.js"></script>
<script type="text/javascript" src="js/jquery.bootgrid.js"></script>
<script type="text/javascript" src="js/jquery.bootgrid.updated.js"></script>
<script type="text/javascript" src="js/sugar.min.js"></script>
<script type="text/javascript" src="js/moment.min.js"></script>
<script type="text/javascript" src="js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="js/sheetjs.all.min.js"></script>
<script type="text/javascript" src="js/excelplus-2.4.min.js"></script>
<script type="text/javascript" src="js/functions.js"></script>
<script type="text/javascript" src="js/functions_comptabilite_extract.js"></script>

</body>

</html>