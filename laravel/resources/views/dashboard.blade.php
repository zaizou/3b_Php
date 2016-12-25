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

            @if(  (  count(  Auth::user()->fonctionnalite()->where('intitule','=','ROLE_ADMIN')->orWhere('intitule', '=', 'ROLE_GERANT')->get() ) > 0  )   )
            <div class=" card col-sm-12">
                @include('dashboard_pages.resume_magasins')
            </div>

            @endif



            
            {{ $taped=false }}
            {{ $taped2=false }}

            @foreach ($magasins as $key=>$magasin)
                @if(  (  count(  Auth::user()->fonctionnalite()->where('intitule','=','ROLE_ADMIN')->orWhere('intitule', '=', 'ROLE_GERANT')->get() ) > 0  )   ||   (  Auth::user()->magasins()->first()  &&  Auth::user()->magasins()->first()->id== $key    )   )
                
                @if(!$taped)
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
            {{ $taped=true }}
            
            @endif
               <div class="row" id="magasin{{ $key }}">
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

                        </div>
                        @endif


                        @if( ! ( (  count(  Auth::user()->fonctionnalite()->where('intitule','=','ROLE_ADMIN')->get() ) > 0  )   ||   (  Auth::user()->magasins()->first()  &&  Auth::user()->magasins()->first()->id== $key    )  ) )
                            @if(!$taped2)
                            <div class="col-md-12">
                            <div class="card">
                                <div class="card-header">
                                    <h2 id="">Rien à Afficher</h2>

                                </div>

                                
                            </div>
                        </div>
                            {{ $taped2=true }}
                            @endif
                        @endif


                  @endforeach



            <script>
                var years = new Array();
                var yearsTransfert = new Array();
                var mois = new Array();
                var magasins = new Array();
                var testMontant = 0;

                  @if($magasins[0])
                    @foreach (  $magasins[0]['compta'] as $keyy=>$annne)
                        years.push({{ $keyy }});
                        yearsTransfert.push({{ $keyy }});
                    @endforeach
                   @endif


                 @foreach ($magasins as $key=>$magasin)

                    @if( ( (  count(  Auth::user()->fonctionnalite()->where('intitule','=','ROLE_ADMIN')->orWhere('intitule', '=', 'ROLE_GERANT')->get() ) > 0  )   ||   (  Auth::user()->magasins()->first()  &&  Auth::user()->magasins()->first()->id== $key    )  ) )

                    
                    magasins[{{ $key }}]=new Object();
                    magasins[{{ $key }}].comptas=new Array();
                    magasins[{{ $key }}].depenses=new Array();
                    magasins[{{ $key }}].transferts=new Array();
                    
                    magasins[{{ $key }}].id={{    $magasin['id'][0]   }};
                    magasins[{{ $key }}].nom="{{   $magasin['nom'][0]  }}";

                
                    @foreach (  $magasin['compta'] as $keyy=>$annne)

                        /*years.push({{ $keyy }});
                        yearsTransfert.push({{ $keyy }});*/

                        magasins[{{ $key }}].comptas[ years.indexOf({{ $keyy }} ) ] =new Object();    
                        magasins[{{ $key }}].depenses[ years.indexOf({{ $keyy }}) ]=new Object();    
                        magasins[{{ $key }}].transferts[ years.indexOf({{ $keyy }}) ]=new Object();    

                        @for ($j = 0; $j < 12; $j++)
                            magasins[{{ $key }}].comptas[ years.indexOf({{ $keyy }}) ][ {{ $j }} ]= {{ $magasins[ $key ]['compta'][$keyy][$j+1] }};
                            magasins[{{ $key }}].depenses[ years.indexOf({{ $keyy }}) ][ {{ $j }} ]= {{ $magasins[ $key ]['depense'][$keyy][$j+1] }};
                            magasins[{{ $key }}].transferts[ years.indexOf({{ $keyy }}) ][ {{ $j }} ]= {{ $magasins[ $key ]['transfert'][$keyy][$j+1] }};
                        @endfor

                    
                    @endforeach



                    @endif
                 @endforeach



            </script>

          




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
<script type="text/javascript" src="js/sugar.min.js"></script>
<script type="text/javascript" src="js/moment.min.js"></script>
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