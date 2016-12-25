<div class="card list-sections">
    <!--L'entete de la page' -->
    <div class="card-header">
        <h2>Magasins
            <small>Gestion des Magasins.</small>
        </h2>
    </div>
    <div class="card-contenu">
        <div class="m-sm-10 ">
            <button class="m-l-20 btn  btn-success  intern waves-effect section-create">Ajouter un nouveau Magasin
            </button>
        </div>


        <!--Le tableau qui affiche la liste des comptes -->
        <table id="data-table-command"      class="table table-condensed table-hover table-striped bootgrid-table" aria-busy="false">
            <!--l'entete du tableau' -->
            <thead>
            <tr>
                <th data-column-id="id" data-identifier="true" data-type="numeric" data-width="7%"></th>
                <th data-column-id="nom" class="text-left" >Nom Magasin</th>
                <th data-column-id="wilaya" class="text-left" >Wilaya</th>
                <th data-column-id="responsable" class="text-left" >Responsable</th>
                <th data-column-id="ordre" class="text-left" >Ordre</th>
                <th data-column-id="commands" data-formatter="commands" data-sortable="false">Commandes</th>
            </tr>
            </thead>
            <!--Les lignes du tableau -->
            <tbody>
                    @foreach ($listMagasins as $key=>$magasin)
                    <tr data-row-id="{ { $key } }" class="147">
                        <td class="text-left" style="">{{ $magasin->id }}</td>
                        <td class="text-left" style="">{{ $magasin->nomMagazin }}</td>
                        <td class="text-left" style="">{{ $magasin->wilaya()->first()->matricule_wilaya }}</td>
                        @if ($magasin->users()->first())
                        <td class="text-left" style="">{{ $magasin->users()->first()->getUsername() }} </td>
                        @else
                        <td class="text-left" style=""></td>
                        @endif
                        <td class="text-left" style="">{{ $magasin->what_ordre() }}</td>
                    </tr>
                    @endforeach

            </tbody>



        </table>

    </div>


</div>