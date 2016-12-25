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
    <link href="css/dropzone/dropzone.min.css" rel="stylesheet">
    <link href="css/dropzone/basic.min.css" rel="stylesheet">
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
     <input id="code" style="display:none" value="{!! csrf_token() !!}">
                                                       

    <!--Le contenu central -->
    <section id="content">
        <div class="container">


            <script>
                var images = new Array();
                @foreach ($images as $key=>$fcn)
                images[{{ $key }}] = new Object();
                images[{{ $key }}].path =' {{ $fcn->path }}';
                images[{{ $key }}].id =' {{ $fcn->id }}';
                images[{{ $key }}].originalFilename ='{{ $fcn->originalFilename }}';
                @endforeach
                                                            

            </script>


            <div class="card section-create">
                <!--L'entete de la page' -->

                <div class="card-header">
                    <div class="row">
                        <div class="col-sm-9">
                            <h2>Fiche Magasin
                                <small>Les Informations d'un Magasin</small>
                            </h2>

                            <button class="btn btn-login compte-mod-save" style="display:none">Enregistrer les
                                Modifications
                            </button>
                            <button class="btn btn-login compte-mod">Modifier le Magasin</button>


                        </div>
                        <div class="col-sm-3" dir="rtl">
                            <a href="management_gestion_magasins_magasins"
                               class="btn btn-login btn-danger btn-float waves-effect waves-circle waves-float section-return-btn"><i
                                    class="zmdi zmdi-arrow-left"></i></a>
                        </div>


                    </div>
                </div>


                <div class="card-contenu ">
                    <div class="panel-group p-l-20" role="tablist" aria-multiselectable="true">
                        <div class="panel panel-collapse">
                            <div class="panel-heading" role="tab" id="headingOne">
                                <h4 class="panel-title">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne"
                                       aria-expanded="false" aria-controls="collapseOne">
                                        Identification du Magasin
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseOne" class="collapse in" role="tabpanel" aria-labelledby="headingOne">
                                <div class="panel-body">

                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="fg-line">
                                                <input id="creat_input_nom" placeholder="{{ $magasin->nomMagazin }}"
                                                       class="form-control compte">
                                            </div>

                                            <div style="display: none">
                                                <input id="idMag" value="{{ $magasin->id }}"/>
                                            </div>

                                        </div>

                                        <div class="col-sm-6">
                                            <div class="shown_info" id="wila_magasin">
                                                <div class="fg-line">
                                                    <input id="wilaya_magasin"
                                                           placeholder="{{ $magasin->wilaya()->first()->getIntitule() }}"
                                                           class="form-control compte">
                                                </div>
                                            </div>

                                            <div class="hidden_edit" id="wilaya_sel" style="display: none">
                                                <select class="selectpicker" title="Wilaya" id="wilaya-select"
                                                        data-live-search="true">
                                                </select>
                                            </div>

                                            <input style="display: none" id="dossier_stock" value="{{ $magasin->nomDossierStockage }}" >


                                        </div>

                                    </div>
                                    <br>
                                    @if ($magasin->users()->first())

                                    <div class="row">
                                        <div class="col-sm-6">

                                            <div class="shown_info" id="responsable">
                                                <div class="fg-line">
                                                    <input id="resp_magasin"
                                                           placeholder="{{ $magasin->users()->first()->getUsername() }}  "
                                                           class="form-control compte">
                                                </div>
                                            </div>

                                            <div class="fg-line" style="display: none">
                                                <input id="resp_magasin_id"
                                                       placeholder="{{$magasin->users()->first()->getId() }} "
                                                       class="form-control compte">
                                            </div>


                                            <div class="hidden_edit" id="responsable_sel" style="display: none">
                                                <select class="selectpicker" title="Responsable" id="responsable-select"
                                                        data-live-search="true">
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                    @endif


                                        <br>

                                        <div class="shown_info" id="mag_detail">

                                            <div class="col-sm-4">
                                                <input id="magasin_type"
                                                       placeholder="{{$magasin->type }} "
                                                       class="form-control compte">
                                            </div>

                                            <div class="col-sm-4">
                                                <input id="magasin_ordre"
                                                       placeholder="{{$magasin->ordre }} "
                                                       class="form-control compte">
                                            </div>

                                        </div>


                                        <div class="hidden_edit" id="detail_mag" style="display: none">

                                            <div class="col-sm-4">
                                                <select class="selectpicker" title="Type du Magasin" id="type-select">
                                                    <option value="detail">Détail</option>
                                                    <option value="gros">Gros</option>

                                                </select>
                                            </div>

                                            <div class="col-sm-4">
                                                <select class="selectpicker" title="Ordre du Magasin" id="ordre-select">
                                                    <option value="0">En Haut</option>
                                                    <option value="1">En Bas</option>
                                                </select>
                                            </div>
                                        </div>


                                    </div>


                                </div>
                            </div>
                        </div>


                        <div class="panel panel-collapse">
                            <div class="panel-heading" role="tab" id="headingThree">
                                <h4 class="panel-title">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree"
                                       aria-expanded="false" aria-controls="collapseThree">
                                        Coordonnées
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseThree" class="collapse in" role="tabpanel" aria-labelledby="headingThree">
                                <div class="panel-body">


                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="fg-line">
                                                <input id="telInput" placeholder="{{ $magasin->telephone }} "
                                                       class="form-control compte">
                                            </div>
                                        </div>

                                        <div class="col-sm-4">
                                            <div class="fg-line">
                                                <input id="mailInput" placeholder="{{ $magasin->email }}"
                                                       class="form-control compte">
                                            </div>
                                        </div>
                                    </div>


                                    <br>
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="fg-line">
                                                <input id="latitudeInput" placeholder="{{ $magasin->latitude }}"
                                                       class="form-control compte">
                                            </div>
                                        </div>

                                        <div class="col-sm-4">
                                            <div class="fg-line">
                                                <input id="longitudeInput" placeholder="{{ $magasin->longitude }}"
                                                       class="form-control compte">
                                            </div>
                                        </div>
                                    </div>
                                    <br>

                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="fg-line">
                                                <input id="addressInput" placeholder="{{ $magasin->adresseMagasin }}"
                                                       class="form-control compte">
                                            </div>
                                        </div>


                                        <div class="col-sm-6">
                                            <div class="fg-line">
                                                <input id="placeIdInput" placeholder="{{ $magasin->placeId }}" type="text"
                                                       class="controls form-control compte" readonly>
                                            </div>
                                        </div>

                                    </div>
                                    <br>
                                    <br>
                                    <div class="hidden_edit" class="row" style="display: none">
                                        <div class="col-sm-offset-1 col-sm-9 " id="mapSelector"
                                             style="height: 400px;"></div>
                                        <span class="col-sm-3"></span>
                                    </div>


                                    <br/>


                                </div>
                            </div>
                        </div>


                        <div class="panel panel-collapse">
                            <div class="panel-heading" role="tab" id="headingFour">
                                <h4 class="panel-title">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseFour"
                                       aria-expanded="false" aria-controls="collapseFour">
                                        Média
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseFour" class="collapse in" role="tabpanel" aria-labelledby="headingFour">
                                <div class="panel-body">


                                    <div class="row">
                                        <div class="col-sm-8">
                                            <div class="fg-line">
                                                <input id="youtubeIdInput" placeholder="{{ $magasin->videoId }}"
                                                       class="form-control compte">
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                </div>
                            </div>
                        </div>

                        <div class="panel panel-collapse">
                            <div class="panel-heading" role="tab" id="headingFive">
                                <h4 class="panel-title">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseFive"
                                       aria-expanded="false" aria-controls="collapseFive">
                                        Images du Magasin
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseFive" class="collapse in" role="tabpanel" aria-labelledby="headingFive">
                                <div class="panel-body">
                                    <div class="col-sm-12">


                                        <div class="dropzone needsclick dz-clickable" id="my-awesome-dropzone"></div>


                                    </div>
                                    <br>
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
<script type="text/javascript" src="js/functions.js"></script>
<script type="text/javascript" src="js/locationpicker.jquery.min.js"></script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAUtsGVCuVLk9MrJvg0hV0PXcR7h-zLZ8I&libraries=places" ></script>


<script type="text/javascript" src="js/dropzone/dropzone.min.js"></script>
<script type="text/javascript" src="js/functions_gestion_magasins_show.js"></script>

</body>

</html>