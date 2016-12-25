/*Projet Comptable et Budgétaire functions*/

Constant_firstDate = "1/1/00";
Constant_lastDate = "31/12/99";

var rowsComptabilite = new Array();
var rowsTransfert = new Array();
var startingRow = 4;
var selectedSheet;
var startingDate = "1/1/00";
var endingDate = "31/12/99";
var currentSheet;
var excelDocument;

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


//Initialisation du tableau contenant les sections
$(document).ready(function () {


    $("#sheetName").on("keyup", function (e) {
        selectedSheet = $(this).val();
    });


    $("#fromDate").on("dp.change", function (e) {
        $('#toDate').data("DateTimePicker").minDate(e.date);
        startingDate = moment(e.date).format("MM/DD/YY");
    });

    $("#toDate").on('dp.change', function (e) {
        endingDate = moment(e.date).format("MM/DD/YY");
    });


    $("#data-table-command").bootgrid({
        css: {
            icon: 'zmdi icon',
            iconColumns: 'zmdi-view-module',
            iconDown: 'zmdi-expand-more',
            iconRefresh: 'zmdi-refresh',
            iconUp: 'zmdi-expand-less'
        },
        formatters: {
            "commands": function (column, row) {
                return "<button type=\"button\" class=\"showingInfos btn btn-icon command-edit waves-effect waves-circle\" data-row-id=\"" + row.id + "\"><span class=\"zmdi zmdi-assignment\"></span></button> " +
                    "<button type=\"button\" class=\"compte-suppr extern btn btn-icon command-delete waves-effect waves-circle\" data-row-id=\"" + row.id + "\"><span class=\"zmdi zmdi-delete\"></span></button> ";
                ;
            }
        }

    });


    $("#data-table-command-transferts").bootgrid({
        css: {
            icon: 'zmdi icon',
            iconColumns: 'zmdi-view-module',
            iconDown: 'zmdi-expand-more',
            iconRefresh: 'zmdi-refresh',
            iconUp: 'zmdi-expand-less'
        },
        formatters: {
            "commands": function (column, row) {
                return "<button type=\"button\" class=\"showingInfos btn btn-icon command-edit waves-effect waves-circle\" data-row-id=\"" + row.id + "\"><span class=\"zmdi zmdi-assignment\"></span></button> " +
                    "<button type=\"button\" class=\"compte-suppr extern btn btn-icon command-delete waves-effect waves-circle\" data-row-id=\"" + row.id + "\"><span class=\"zmdi zmdi-delete\"></span></button> ";
                ;
            }
        }

    });


}).on("loaded.rs.jquery.bootgrid", function () {

    prepareExcelInput();


    function prepareExcelInput() {

        excelDocument = new ExcelPlus();
        excelDocument.openLocal({
            "labelButton": "Open an Excel file"
        }, function () {
            try {
                appendDataTables(excelDocument);
                $("#clearBtn").css('display', '');
                $("#sendBtn").css('display', '');
                $("#sendBtnTransferts").css('display', '');
                excelDocument.reset();
                prepareExcelInput();
            }
            catch (e) {
                errorSheetNotSelected();
            }
            finally {

            }


        });
    }


    $("#sendBtn").on("click", function () {
        sendDataConfirmation();
    });

    $("#sendBtnTransferts").on("click", function () {
        sendTransfertsConfirmation();
    });


    $("#clearBtn").on("click", function () {
        viderTablesConfirmation();
    });


    function appendDataTables() {

        currentSheet = excelDocument.selectSheet(selectedSheet);
        var data;
        var record;
        var i = 0, j = 0;
        record = currentSheet.read("A" + (i + startingRow) + ":" + "K" + (i + startingRow));
        var canAdd = false;
        var canAddTransfert = true;
        var canAddCompta = true;
        var transfertIndex = 0;
        var comptaIndex = 0;

        if (startingDate == null || endingDate == null) {
            startingDate = Constant_firstDate;
            endingDate = Constant_lastDate;
        }


        while (record[0][0] != null) {
            record = currentSheet.read("A" + (i + startingRow) + ":" + "K" + (i + startingRow));
            if (moment(record[0][0]).isAfter(startingDate))
                canAdd = true;
            if (moment(record[0][0]).isAfter(endingDate))
                break;
            if (record[0][0] == "TOTAL")
                canAdd = false;


            if (canAdd) {

                if (record[0][8] == "" || typeof record[0][8] == 'undefined' || record[0][8] == null)
                    canAddTransfert = false;
                else canAddTransfert = true;

                if (( record[0][3] == "" || typeof record[0][3] == 'undefined' || record[0][3] == null ) && ( record[0][2] == "" || typeof record[0][2] == 'undefined' || record[0][2] == null ))
                    canAddCompta = false;
                else
                    canAddCompta = true;

                if (canAddCompta) {
                    rowsComptabilite [comptaIndex] = {
                        "idCompta": $("#mag").val(),
                        "dateCompta": moment(record[0][0], "MM/DD/YY").format("DD/MM/YYYY"),
                        "jourCompta": record[0][1],
                        "montantCompta": (record[0][2] == null ) ? 0 :  parseFloat(record[0][2].replaceAll(',', '')    ),
                        "depense": (record[0][3] == null ) ? 0 : parseFloat(record[0][3].replaceAll(',', '')),
                        "observationCompta": (record[0][4] == null ) ? "" : record[0][4]
                    };
                    comptaIndex++;

                }


                if (canAddTransfert) {
                    rowsTransfert[transfertIndex] = {
                        "idTransfert": $("#mag").val(),
                        "dateTransfert": moment(record[0][6], "MM/DD/YY").format("DD/MM/YYYY"),
                        "jourTransfert": (record[0][7] == null ) ? "" : record[0][7],
                        "montantTransfert": (record[0][8] == null ) ? 0 : parseFloat(  record[0][8].replaceAll(',', '')),
                        "transferant": (record[0][9] == null ) ? "" : record[0][9],
                        "observationTransfert": (record[0][10] == null ) ? "" : record[0][10]
                    };
                    transfertIndex++;
                }
            }

            i++;
        }
        $("#data-table-command").bootgrid("append", rowsComptabilite);
        $("#data-table-command-transferts").bootgrid("append", rowsTransfert);
        $("#sendBtn").css('display', '');

    }

    function viderTablesConfirmation() {

        swal({
                title: 'Etes Vous Sure ?',
                text: "Voulez vous vraiment vider les tables",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Oui, Confirmer!',
                cancelButtonText: 'Annuler',
                confirmButtonClass: 'btn btn-danger',
                cancelButtonClass: 'btn',
                buttonsStyling: false,
                closeOnConfirm: true,

            },
            function (isConfirm) {
                if (isConfirm) {
                    $("#data-table-command").bootgrid("clear");
                    $("#data-table-command-transferts").bootgrid("clear");
                    rowsComptabilite = new Array();
                    rowsTransfert = new Array();
                    $("#loadBtn").css('display', 'none');
                    $("#clearBtn").css('display', 'none');
                    $("#sendBtn").css('display', 'none');
                    $("#sendBtnTransferts").css('display', 'none');


                }
            }
        );

    }


    $("#data-table-command").find('button.compte-suppr.extern').on("click", function (e) {
        var delRows = Array();
        delRows[0] = $(this).data("row-id");
        var idRow = $($(this).closest('tr')).find('td').eq(1).text();
        deleteRowConfirmation(0, delRows, idRow);


    }).end().find("button.showingInfos").on("click", function (e) {
        var idRow = Number($($(this).closest('tr')).find('td').eq(0).text());
        elementDetail(0, idRow);
    });

    $("#data-table-command-transferts").find('button.compte-suppr.extern').on("click", function (e) {
        var delRows = Array();
        delRows[0] = $(this).data("row-id");
        var idRow = $($(this).closest('tr')).find('td').eq(1).text();
        deleteRowConfirmation(1, delRows, idRow);

    }).end().find("button.showingInfos").on("click", function (e) {
        var idRow = Number($($(this).closest('tr')).find('td').eq(0).text());
        elementDetail(1, idRow);
    });


    function deleteRowConfirmation(table, row, idRow) {

        swal({
                title: 'Etes Vous Sure ?',
                text: "Voulez vous vraiment supprimer la ligne",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Oui, Confirmer!',
                cancelButtonText: 'Annuler',
                confirmButtonClass: 'btn btn-danger',
                cancelButtonClass: 'btn',
                buttonsStyling: false,
                closeOnConfirm: true,

            },
            function (isConfirm) {
                if (isConfirm) {


                    if (table == 0) {
                        $('#data-table-command').bootgrid("remove", row);
                        rowsComptabilite.removeValue("dateCompta", idRow);
                    }
                    else if (table == 1) {
                        $('#data-table-command-transferts').bootgrid("remove", row);
                        rowsTransfert.removeValue("dateTransfert", idRow);
                        console.table(rowsTransfert);
                    }


                }
            }
        );


    }

    function elementDetail(table, idRow) {

        var selectedElement = null;
        var htmlString;
        var date;

        if (!table) {
            selectedElement = rowsComptabilite.getElementByProperty("id", idRow)[0];
            date = selectedElement.dateCompta;
            var jour = selectedElement.jourCompta;
            var montant = selectedElement.montantCompta;
            var depense = selectedElement.depense;
            var observation = selectedElement.observationCompta;

            htmlString = "<div class='row'><pre><strong>Date : </strong>" + date + "</pre></div>" + "<div class='row'><pre><strong>Jour : </strong>" + jour + "</pre></div>" + ""
                + "<div class='row'><pre><strong>Montant : </strong>" + montant + " DZ</pre></div>" + "<div class='row'><pre><strong>Dépense : </strong>" + depense + " DZ</pre></div>" + ""
                + "<div class='row'><pre><strong>Observation :</strong>\n   " + observation + "</pre></div>";

        } else {
            selectedElement = rowsTransfert.getElementByProperty("id", idRow)[0];
            date = selectedElement.dateTransfert;
            var jour = selectedElement.jourTransfert;
            var montant = selectedElement.montantTransfert;
            var transf = ( selectedElement.transferant == null) ? "" : selectedElement.transferant;
            var observation = (selectedElement.observationTransfert == null) ? "" : selectedElement.observationTransfert;

            htmlString = "<div class='row'><pre><strong>Date : </strong>" + date + "</pre></div>" + "<div class='row'><pre><strong>Jour : </strong>" + jour + "</pre></div>" + ""
                + "<div class='row'><pre><strong>Montant : </strong>" + montant + "DZ</pre></div>" + "<div class='row'><pre><strong>Le Transférant : </strong>" + transf + "</pre></div>" + ""
                + "<div class='row'><pre><strong>Observation :</strong>\n   " + observation + "</pre></div>";
        }

        var boxTitle;
        if (table == 0)
            boxTitle = "Detail Comptabilité Journalière - Journée : " + date;
        else
            boxTitle = "Detail Transfert - Journée : " + date;


        swal({
            title: boxTitle,
            text: "Voulez vous vraiment supprimer la ligne",
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK ',
            html: htmlString,
            confirmButtonClass: 'btn btn-file',
            buttonsStyling: false,
            closeOnConfirm: true,
        });


    }

    function errorSheetNotSelected() {

        swal({
            title: 'Feuille non Séléctionnée',
            text: "Veuillez Sélectionner le nom de la feuille Excel que vous voulez importer ",
            type: 'error',
            confirmButtonText: 'OK',
            confirmButtonClass: 'btn btn-file',
            closeOnConfirm: true,

        }, function (isCon) {
            excelDocument.reset();
            prepareExcelInput();
        });


    }


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
                rowsTransfert[rowsTransfert.length] = {
                    "idTransfert": "",
                    "dateTransfert": "01/01/2000",
                    "jourTransfert": "",
                    "montantTransfert": -1,
                    "transferant": "",
                    "observationTransfert": ""

                };


            $.ajax(
                {
                    type: "POST",
                    dataType: 'json',
                    contentType: 'application/json',
                    url:"comptabilite_extraction_transferts_send",
                    data:  JSON.stringify(rowsTransfert)


                }
                )
                .done(function (data) {
                    if (JSON.parse(data) == "100") {
                        swal("Succès!", "L'utilisateur est ajouté avec Succès", "success");
                        //    window.location.replace("gestion_utilisateurs_utilisateurs.html");
                    }
                    else if (JSON.parse(data) == "200")
                        swal("Succès!", "Vous avez envoyé une table de transferts vides", "error");
                    else if (JSON.parse(data) == "202")
                        swal("Succès!", "Le Le magasin n'existe pas ", "error");


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
                    "montantCompta": -1,
                    "depense": 0,
                    "observationCompta": ""

                };

            $.ajax(
                {
                    type: "POST",
                    dataType    : 'json',
                    contentType :'application/json',
                    url: "compta_journaliere_extraction",
                    data: JSON.stringify(rowsComptabilite)
                        
                           

                }
                )
                .done(function (data) {
                    if (JSON.parse(data) == "100")
                        swal("Succès!", "L'élément a été ajouté avec succès", "success");
                    else if(JSON.parse(data) == "201")
                        swal("Erreur!","Date Déja Utilisée" , "error");
                    else
                        swal("Erreur!","Données non insérée" , "error");


                })
                .error(function (data) {
                    swal("Erreur", "Erreur", "error");
                });

            }
        });
    }



});
















