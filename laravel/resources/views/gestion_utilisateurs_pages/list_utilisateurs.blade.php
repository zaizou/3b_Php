<div class="card list-sections">
    <!--L'entete de la page' -->
    <div class="card-header">
        <h2>Utilisateurs
            <small>Affichage des Utilisateur.</small>
        </h2>
    </div>
    <div class="card-contenu">
        <div class="m-sm-10 ">
            <button class="m-l-20 btn  btn-success  intern waves-effect section-create">Ajouter un nouveau utilisateur
            </button>
        </div>


        <!--Le tableau qui affiche la liste des comptes -->
        <table id="data-table-command"      class="table table-condensed table-hover table-striped bootgrid-table" aria-busy="false">
            <!--l'entete du tableau' -->
            <thead>
            <tr>
                <th data-column-id="id" data-identifier="true" data-type="numeric">Id</th>
                <th data-column-id="idUtilisateur" class="text-left" >Id Utilisateur</th>
                <th data-column-id="nom" class="text-left" >Nom</th>
                <th data-column-id="prenom" class="text-left" >Prénom</th>
                <th data-column-id="commands" data-formatter="commands" data-sortable="false">Commandes</th>
            </tr>
            </thead>
            <!--Les lignes du tableau -->
            <tbody>
                @foreach ($listUtilisateurs as $key=>$user)
                    <tr data-row-id="{ { $key } }" class="147">
                        <td class="text-left" style=""> {{ $user->id }}</td>
                        <td class="text-left" style="">{{ $user->username }}</td>
                        <td class="text-left" style="">{{ $user->nom }}</td>
                        <td class="text-left" style="">{{ $user->prenom }}</td>
                    </tr>
                    
                @endforeach
            

            </tbody>



        </table>

    </div>


</div>
