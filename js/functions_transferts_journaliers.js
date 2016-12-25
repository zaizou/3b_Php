/*Projet Comptable et Budgétaire functions*/


/*Removing JSON Elementt from an array*/
Array.prototype.removeValue = function (name, value) {
    var array = $.map(this, function (v, i) {
        return v[name] === value ? null : v;
    });
    this.length = 0; //clear original array
    this.push.apply(this, array); //push all elements except the one we want to delete
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


Array.prototype.getElementByProperty = function (name, value) {
    var array = $.map(this, function (v, i) {
        return v[name] === value ? v : null;
    });
    return array;
}



var date_transfert;
var jour_transfert;
var montant_transfert;
var comment_transfert;
var transferant_transfert;

var rowsTransfert = new Array();

//Initialisation du tableau contenant les sections
$(document).ready(function () {


    $("#date_transfert").on('dp.change', function (e) {

        date_transfert = moment(e.date).format("MM/DD/YYYY");
        moment.locale('fr',{
            months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
            monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
            weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
            weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
            weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
            longDateFormat : {
                LT : "HH:mm",
                LTS : "HH:mm:ss",
                L : "DD/MM/YYYY",
                LL : "D MMMM YYYY",
                LLL : "D MMMM YYYY LT",
                LLLL : "dddd D MMMM YYYY LT"
            },
            calendar : {
                sameDay: "[Aujourd'hui à] LT",
                nextDay: '[Demain à] LT',
                nextWeek: 'dddd [à] LT',
                lastDay: '[Hier à] LT',
                lastWeek: 'dddd [dernier à] LT',
                sameElse: 'L'
            },
            relativeTime : {
                future : "dans %s",
                past : "il y a %s",
                s : "quelques secondes",
                m : "une minute",
                mm : "%d minutes",
                h : "une heure",
                hh : "%d heures",
                d : "un jour",
                dd : "%d jours",
                M : "un mois",
                MM : "%d mois",
                y : "une année",
                yy : "%d années"
            },
            ordinalParse : /\d{1,2}(er|ème)/,
            ordinal : function (number) {
                return number + (number === 1 ? 'er' : 'ème');
            },
            meridiemParse: /PD|MD/,
            isPM: function (input) {
                return input.charAt(0) === 'M';
            },
            // in case the meridiem units are not separated around 12, then implement
            // this function (look at locale/id.js for an example)
            // meridiemHour : function (hour, meridiem) {
            //     return /* 0-23 hour, given meridiem token and hour 1-12 */
            // },
            meridiem : function (hours, minutes, isLower) {
                return hours < 12 ? 'PD' : 'MD';
            },
            week : {
                dow : 1, // Monday is the first day of the week.
                doy : 4  // The week that contains Jan 4th is the first week of the year.
            }}

        );
        jour_transfert=moment(date_transfert).format('dddd');
        date_transfert = moment(e.date).format("DD/MM/YYYY");
        $("#creat_input_jour").val(jour_transfert);
    });


    $("#creat_input_jour").on('change', function () {
        jour_transfert = $(this).val();
    });

    $("#creat_input_montant").on('change', function () {
        montant_transfert= $(this).val();
    });


    $("#creat_input_comment").on('change', function () {
        comment_transfert= $(this).val();
    });
    $("#creat_input_transferant").on('change', function () {
        transferant_transfert= $(this).val();
    });

    $("#sendBtn").on("click", function () {
        sendTransfertsConfirmation();
    });






});


    function sendTransfertsConfirmation() {
        swal({
            title: "Etes Vous Sure ?",
            text: "Voulez vous vraiment Effectuer l'envoi ?",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Confirmer",
            confirmButtonClass: "btn  btn-success waves-effect",
        }, function (confirm) {
            if(confirm){
                rowsTransfert[0]={
                    "idTransfert": $("#mag").val(),
                    "dateTransfert": date_transfert,
                    "jourTransfert": jour_transfert,
                    "montantTransfert": montant_transfert,
                    "transferant": transferant_transfert,
                    "observationTransfert": comment_transfert
                };

                rowsTransfert[1] = {
                    "idTransfert": $("#mag").val(),
                    "dateTransfert": "01/01/2000",
                    "jourTransfert": "",
                    "montantTransfert": -1,
                    "transferant": "",
                    "observationTransfert": ""

                };
                
                console.table(rowsTransfert);

            $.ajax(
                {
                    type: "POST",
                    dataType: 'json',
                    contentType: 'application/json',
                    url:"comptabilite_extraction_transferts_send",
                    data: JSON.stringify(rowsTransfert)
                }
                )
                .done(function (data) {
                    if (JSON.parse(data) == "100") {
                        swal("Succès!", "Transfert ajouté avec Succès", "success");
                        //    window.location.replace("gestion_utilisateurs_utilisateurs.html");
                    }
                    else if (JSON.parse(data) == "200")
                        swal("Erreur!", "Vous avez envoyé une table de transferts vides", "error");
                    else if (JSON.parse(data) == "202")
                        swal("Erreur!", "Le Le magasin n'existe pas ", "error");
                    else if (JSON.parse(data) == "201")
                        swal("Erreur!", "Date Déja Utilisée  ", "error");


                })
                .error(function (data) {
                    swal("Erreur", "Erreur", "error");
                });
            }
        });
    }



    function sendDataConfirmation() {



        swal({
            title: "Etes Vous Sure ?",
            text: "Voulez vous vraiment Effectuer l'envoi ?",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Confirmer",
            confirmButtonClass: "btn  btn-success waves-effect",
        }, function (confirm) {
            if(confirm){
                rowsComptabilite[rowsComptabilite.length] = {
                    "idCompta": $("#mag").val(),
                    "dateCompta": "01/01/2000",
                    "jourCompta": "",
                    "montantCompta": 0,
                    "depense": 0,
                    "observationCompta": ""

                };

            $.ajax(
                {
                    type: "POST",
                    dataType    : 'json',
                    contentType :'application/json',
                    url: "comptabilite_extraction_send.json",
                    data: JSON.stringify(rowsComptabilite)

                }
                )
                .done(function (data) {
                    if (JSON.parse(data) == "100") {
                        swal("Succès!", "L'utilisateur est ajouté avec Succès", "success");
                        //    window.location.replace("gestion_utilisateurs_utilisateurs.html");
                    }
                    else{
                        swal("Erreur!","Données non insérée" , "error");
                    }

                })
                .error(function (data) {
                    swal("Erreur", "Erreur", "error");
                });

            }
        });
    }



















