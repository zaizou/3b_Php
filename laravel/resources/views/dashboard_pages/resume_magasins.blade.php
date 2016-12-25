<div class="card list-sections">
    <!--L'entete de la page' -->
    <div class="card-header">
        <h2>Magasins
            <small>Résumé de la comptabilité des magasins.</small>
        </h2>
    </div>
    <div class="card-contenu">

        <div class="row">
                        <div class="col-sm-4">

                            <div class="input-group form-group">
                                <span class="input-group-addon"><i class="zmdi zmdi-calendar"></i></span>
                                <div class="dtp-container fg-line">
                                    <input id="fromDate"  type='text' class="form-control mois-year-picker" placeholder="Du">
                                </div>
                            </div>
                        </div>

                        <div class="m-l-20 m-sm-10  col-sm-4">
                            <div class="input-group form-group">
                                <span class="input-group-addon"><i class="zmdi zmdi-calendar"></i></span>
                                <div class="dtp-container fg-line">
                                    <input id="toDate"  type='text' class="form-control mois-year-picker" placeholder="Au">
                                </div>
                            </div>
                        </div>

                        <div class="m-l-20 m-sm-3  col-sm-3">
                            <div class="m-sm-3 ">
                                <button id="filterSums" class="m-l-20 btn  btn-success  intern waves-effect section-create">Filtrer</button>
                            </div>
                        </div>




         </div>

        <!--Le tableau qui affiche la liste des comptes -->
        <table id="data-table-command"      class="table table-condensed table-hover table-striped bootgrid-table" aria-busy="false">
            <!--l'entete du tableau' -->
            <thead>
            <tr>
                <th data-column-id="id" data-identifier="true" data-type="numeric"></th>
                <th data-column-id="magasin" class="text-left" >Magasin</th>
                <th data-column-id="recettesMag" class="text-left" >Recettes</th>
                <th data-column-id="depensesMag" class="text-left" >Dépenses</th>
                <th data-column-id="transfertsMag" class="text-left" >Transferts</th>

            </tr>
            </thead>
            <!--Les lignes du tableau -->
            <tbody>

            </tbody>



        </table>

    </div>


</div>
