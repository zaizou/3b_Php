 <aside id="sidebar" class="sidebar c-overflow mCustomScrollbar _mCS_1 mCS-autoHide" style="overflow: visible;">
        <div id="mCSB_1" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical_horizontal mCSB_outside" tabindex="0">
            <div id="mCSB_1_container" class="mCSB_container mCS_x_hidden mCS_no_scrollbar_x"
                 style="position: relative; top: 0px; left: 0px; width: 100%;" dir="ltr">
                <div class="profile-menu">
                    <a href="#">
                        <div class="profile-pic">
                            
                        </div>

                        
                    </a>

                    
                </div>



                <ul class="main-menu">

                    <li > <a href="management_gestion_dashboard"><i class="zmdi zmdi-home"></i> Tableau de Bord</a></li>


                    

                    @if(  (  count(  Auth::user()->fonctionnalite()->where('intitule','=','ROLE_ADMIN')->get() ) > 0  )   )

                    <li ><a href="management_gestion_utilisateurs_utilisateurs"><i class="zmdi zmdi-face zmdi-hc-fw"></i>Gestion des Utilisateurs</a></li>



                    <li ><a href="management_gestion_magasins_magasins"><i class="zmdi zmdi-home"></i>Gestion des Magasins</a></li>

                    @endif



                    @if(  (  count(  Auth::user()->fonctionnalite()->where('intitule','=','ROLE_RESPONSABLE_MAGASIN')->get() ) > 0  )   )
                    <li class="sub-menu">
                        <a href="#"><i class="zmdi zmdi-home"></i> Comptabilité</a>
                        <ul>
                            <li><a href="management_recettes_depenses_journalieres_extraction"><i class="zmdi zmdi-face zmdi-hc-fw "></i> une Journée Recettes/Dépenses</a></li>
                            <li><a href="management_transferts_journaliers_extraction_show"><i class="zmdi zmdi-face zmdi-hc-fw "></i> une Journée Transferts</a></li>
                            <li><a href="comptabilite_extraction"><i class="zmdi zmdi-face zmdi-hc-fw "></i> Introduire les Recettes Dépenses et Transferts (Intervalle)</a></li>
                        </ul>
                    </li>

                    @endif


                   <li><a href="/logout"><i class="zmdi zmdi-time-restore"></i> Deconnexion</a></li>

                </ul>

            </div>
        </div>


        <div id="mCSB_1_scrollbar_vertical"
             class="mCSB_scrollTools mCSB_1_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical"
             style="display: block;">
            <div class="mCSB_draggerContainer">
                <div id="mCSB_1_dragger_vertical" class="mCSB_dragger"
                     style="position: absolute; min-height: 50px; display: block; height: 403px; max-height: 568px;"
                     oncontextmenu="return false;">
                    <div class="mCSB_dragger_bar" style="line-height: 50px;"></div>
                </div>
                <div class="mCSB_draggerRail"></div>
            </div>
        </div>

        <div id="mCSB_1_scrollbar_horizontal"
             class="mCSB_scrollTools mCSB_1_scrollbar mCS-minimal-dark mCSB_scrollTools_horizontal"
             style="display: none;">
            <div class="mCSB_draggerContainer">
                <div id="mCSB_1_dragger_horizontal" class="mCSB_dragger"
                     style="position: absolute; min-width: 50px; width: 0px; left: 0px;" oncontextmenu="return false;">
                    <div class="mCSB_dragger_bar"></div>
                </div>
                <div class="mCSB_draggerRail"></div>
            </div>
        </div>
    </aside>
