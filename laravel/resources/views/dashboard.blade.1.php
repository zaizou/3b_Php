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
    <link href="css/app.min.1.css" rel="stylesheet">
    <link href="css/app.min.2.css" rel="stylesheet">
    <title></title>
</head>
<body>

<script type="text/javascript" src="js/moment.js"></script>

<!--Le header/toolbar la barre en haut qui contient les notification et les traitements generaux  -->
@include('header')
<!--Le sidebar/navigation drawer (android) -->
@include('sidebar')
<!-- L'interface principale -->


<section id="main">
    <!--Le contenu central -->
    <section id="content">
        <div class="container">

            <div class=" card col-sm-12">
                @include('dashboard_pages.resume_magasins')
            </div>



            <div class="col-lg-offset-3 card col-sm-6">
                <div class="card-header">
                    <h2>Paramètres</h2>

                </div>

                <div class="card-body card-padding-sm">
                    <div class="row">
                        <div class="center col-sm-4 " style="margin-left: 25px">
                            <select class="selectpicker" title="Année" id="year-select">
                            </select>
                        </div>
                    </div>
                </div>
            </div>



            <script>
                var years = new Array();
                var yearsTransfert = new Array();
                var mois = new Array();
                var magasins = new Array();

                var testMontant = 0;
            </script>

            @foreach ($magasins as $key=>$magasin)
               <div class="row" id="magasin${loop.index}">

                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header">
                                    <h2 id="titleCompta{{ $key }}">Recettes et Dépenses #</h2>
                                </div>

                                <div class="card-body card-padding-sm">
                                    <div id="bar-chart{{ $key }}" class="flot-chart"></div>
                                    <div class="flc-bar{{ $key }}"></div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header">
                                    <h2 id="titleTransert{{ $key }}">Transferts #</h2>

                                </div>

                                <div class="card-body">
                                    <div id="transfert-bar-chart{{ $key }}" class="flot-chart"></div>
                                    <div class="transfert-flc-bar{{ $key }}"></div>
                                </div>
                            </div>
                        </div>



                        <script>
                        var magasin = new Object();
                        magasin.id = "{{ $magasins[$key]->id }}";
                        magasin.nom ="{{ $magasins[$key]->nomMagazin }}";
                        magasin.nomResponsable = "{{ $magasins[$key]->users()->first()->nom }}";
                        magasin.prenomResponsable = "{{ $magasins[$key]->users()->first()->prenom }}";
                        magasin.comptas = new Array();
                        magasin.depenses = new Array();

                        var dat;

                        var p=0;
                        @foreach ($magasins[$key]->transactions()->get() as $keyt=>$trans)
                            dat="{{ $magasins[$key]->transactions()->get()[$keyt]->date_trans }} ";
                              if (years.indexOf(moment(dat).year()) < 0) {
                                    years[years.length] = moment(dat).year();
                                    magasin.comptas[years.indexOf(moment(dat).year())] = new Array();
                                    magasin.depenses[years.indexOf(moment(dat).year())] = new Array();

                              for (i = 0; i < 12; i++) {
                                    magasin.comptas[years.indexOf(moment(dat).year())][i] = 0;
                                    magasin.depenses[years.indexOf(moment(dat).year())][i] = 0;
                              }
                            }
                            
                               magasin.comptas[years.indexOf(moment(dat).year())][moment(dat).month()] += parseFloat( "{{ $trans->montant }}" );
                               magasin.depenses[years.indexOf(moment(dat).year())][moment(dat).month()] += parseFloat( "{{ $trans->depense }}");


                        

                        @endforeach

                      

                        magasin.transferts = new Array();

                        @foreach ($magasins[$key]->transferts()->get() as $keytr=>$transf)
                            dat="{{ $transf->date_transf }} ";

                            if (yearsTransfert.indexOf(moment(dat).year()) < 0) {
                            yearsTransfert[yearsTransfert.length] = moment(dat).year();
                            magasin.transferts[yearsTransfert.indexOf(moment(dat).year())] = new Array();
                            for (i = 0; i < 12; i++)
                                magasin.transferts[yearsTransfert.indexOf(moment(dat).year())][i] = 0;


                        }

                         magasin.transferts[yearsTransfert.indexOf(moment(dat).year())][moment(dat).month()] += parseFloat("{{$transf->montant_transf}}");

                        @endforeach


                    </script>


                  </div>
                  <script>
                  magasins.push(magasin);
                  </script>

            @endforeach





        </div>
    </section>


</section>

<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/bootstrap-select.js"></script>

<script type="text/javascript" src="js/waves.min.js"></script>
<script type="text/javascript" src="js/sweetalert2.min.js"></script>
<!--Bibliotheque pour le sidebar -->
<script type="text/javascript" src="js/malihu-scrollbar/jquery.mCustomScrollbar.concat.min.js"></script>

<script type="text/javascript" src="js/bootstrap-datepicker.min.js"></script>
<script type="text/javascript" src="js/bootstrap-datetimepicker.min.js"></script>
<script src="js/flot/jquery.flot.js"></script>
<script src="js/flot-orderBars/js/jquery.flot.pie.js"></script>
<script src="js/flot/jquery.flot.resize.js"></script>
<script src="js/flot.tooltip/js/jquery.flot.tooltip.min.js"></script>
<script src="js/flot-orderBars/js/jquery.flot.orderBars.js"></script>
<script src="js/flot-orderBars/js/jquery.flot.orderBars.js"></script>
<!--

<script src="js/flot-charts/curved-line-chart.js"></script>

-->

<script type="text/javascript" src="js/jquery.bootgrid.js"></script>
<script type="text/javascript" src="js/jquery.bootgrid.updated.min.js"></script>
<script type="text/javascript" src="js/functions.js"></script>
<script type="text/javascript" src="js/functions_dashboard.js"></script>

</body>

</html>