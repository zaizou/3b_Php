<div class="card section-create" style="display:none">
    <!--L'entete de la page' -->

    <div class="card-header">
        <div class="row">
            <div class="col-sm-9">
                <h2>Fiche Magasin
                    <small>Création d'un Magasin</small>
                </h2>

                <div class=""></div>
                <button class="btn btn-login compte-create-submit">Créer le Magasin
                </button>
                <button class="btn btn-login btn-danger compte-create_cancel">Annuler</button>


            </div>
            <div class="col-sm-3" dir="rtl">
                <a href="#"
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
                                    <input id="creat_input_nom" placeholder="Nom du Magasin"
                                           class="form-control compte">
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <select class="selectpicker" title="Wilaya" id="wilaya-select"
                                        data-live-search="true">
                                </select>
                            </div>

                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-6">
                                <select class="selectpicker" title="Responsable" id="responsable-select"
                                        data-live-search="true">
                                </select>
                            </div>
                            <div class="col-sm-6">
                                <div class="fg-line">
                                    <input id="doss_stock" placeholder="Nom du Dossier de Stockage"
                                           class="form-control compte">
                                </div>
                            </div>


                        </div>

                        <br>


                        <div class="row">
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
                                    <input id="telInput" placeholder="Téléphone"
                                           class="form-control compte">
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="fg-line">
                                    <input id="mailInput" placeholder="Email"
                                           class="form-control compte">
                                </div>
                            </div>
                        </div>

                        <br>

                        <div class="row">
                            <div class="col-sm-4">
                                <div class="fg-line">
                                    <input id="latitudeInput" placeholder="Latitude"
                                           class="form-control compte">
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="fg-line">
                                    <input id="longitudeInput" placeholder="Longitude"
                                           class="form-control compte">
                                </div>
                            </div>
                        </div>
                        <br>

                        <div class="row">
                            <div class="col-sm-6">
                                <div class="fg-line">
                                    <input id="addressInput" placeholder="Addresse" type="text"
                                           class="controls form-control compte">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="fg-line">
                                    <input id="placeIdInput" placeholder="Place Id" type="text"
                                           class="controls form-control compte" readonly>
                                </div>
                            </div>


                        </div>
                        <br>
                        <br>
                        <div class="row">
                            <div class="col-sm-offset-1 col-sm-9 " id="mapSelector" style="height: 400px;"></div>
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
                                    <input id="youtubeIdInput" placeholder="Id de la vidéo youtube"
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