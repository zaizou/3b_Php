/**
 * Created by Assou on 29/08/2016.
 */
var selectedMagasins = new Array();
//La compta d'une année définie
var recettesGlobales = new Array();
var depensesGlobales = new Array();
var transfertsGlobaux = new Array();


var AnDebut = 2011;//years.indexOf(moment("01/01/2011").year());
var AnFin = 2017;//years.indexOf(moment("01/01/2017").year());
var moisDebut=1;//years.indexOf(moment("01/01/2016").month());;
var moisFin=1;//years.indexOf(moment("01/01/2017").month());;
var rows = new Array();
var recettes = 0;
var depenses = 0;
var transferts = 0;


console.log(magasins);
console.log(years);


function loadGraphs() {

    $.ajax(
        {
            type: "POST",
            url: "gestion_utilisateurs_utilisateur_create.html",
            data: {
                magasins: selectedMagasins,
            }
        }
    ).done(function (data) {

        })
        .error(function (data) {
            //swal("Erreur", "L'Utilisateur n'est pas ajouté", "error");
        });


}


$(document).ready(function () {



    drawGraphs(years[0]);

    var htln = "";
    var idCompta = "";
    var idTransfert = "";
    for (i = 0; i < years.length; i++) {
        htln += '<option value=';
        htln += "" + years[i];
        htln += '>';
        htln += "" + years[i];
        htln += '</option>';
    }
    $("#year-select")
        .html(htln)
        .selectpicker('refresh');


        
/*
    $("#fromDate").datetimepicker({
  onSelect: function(dateText) {
        alert("halo");
        var d=dateText;
        var dd=moment(d).format("MM/YYYY");
        alert(dd.month );
  }
});
*/


    $("#fromDate").on('dp.change',function(){
        //alert("halo");
        var d=$(this).val();
        var dd=moment(d,"MM/YYYY");
        console.log(dd.month()+1);

        AnDebut = (dd.year());
        moisDebut=(dd.month()+1);
        console.log("from:" +moisDebut+"/"+dd.year());


    });

    $("#toDate").on('dp.change',function(){
        //alert("halo");
        var d=$(this).val();
        var dd=moment(d,"MM/YYYY");
        console.log(dd.month()+1);

        AnFin = (dd.year());
        moisFin=(dd.month()+1);
        console.log("to:" +moisFin+"/"+dd.year());


    });

    $("#filterSums").on('click',function(){
        recettes = 0;
        depenses = 0;
        transferts = 0;
        if(AnDebut<=AnFin)
            setBootgrid();
         else if(AnDebut=AnFin)
                if(moisDebut<=moisFin)
                    setBootgrid();
         else swal("Erreur!", "Intervalle Erronée", "error");

        
            

    });

   

    $("#year-select").on('change', function () {
        selectedMagasins = $(this).val();
        recettesGlobales = new Array();
        depensesGlobales = new Array();
        transfertsGlobaux = new Array();
        selectedMagasins = parseInt(selectedMagasins)
        drawGraphs(selectedMagasins);
    });


    for (i = 0; i < magasins.length; i++) {
        $("#titleCompta" + i).append(magasins[i].nom);
        $("#titleTransert" + i).append(magasins[i].nom);

    }


    function sommeDepnsesRecettesMois(indexDebut, mois, annee, tableau) {

        /*if (mois < 10)
         mois = "0" + mois;*/
        var beginTestDate = moment("01/" + mois + "/" + annee).format("DD/MM/YYYY");
        var endTestDate = getMonthDateRange(annee, (mois + 1)).end;
        var index = 0;
        var sommeDepenses = 0;
        var sommeRecettes = 0;
        while (typeof  tableau[indexDebut + index] != 'undefined' && moment(tableau[indexDebut + index].date).diff(endTestDate) != 0) {
            //console.log("diff --------------->:" +moment(tableau[indexDebut+index].date).diff(beginTestDate));
            if (moment(tableau[indexDebut + index].date).diff(beginTestDate) >= 0) {
                sommeDepenses += parseFloat(tableau[indexDebut + index].depense);
                sommeRecettes += parseFloat(tableau[indexDebut + index].recette);
                /* console.log("date :"+tableau[indexDebut+index].date);
                 console.log("depense "+tableau[indexDebut+index].depense);
                 console.log("recette parse "+parseFloat(tableau[indexDebut+index].recette));*/
            }
            index++;
        }

        /*console.log("somme depenses du mois :" + mois + "est : " + sommeDepenses);
        console.log("somme recettes du mois :" + mois + "est : " + sommeRecettes);*/
        return {
            depenses: sommeDepenses,
            recette: sommeRecettes,
            index: index + indexDebut
        }
    }

    function sommeTransfertMois(indexDebut, mois, annee, tableau) {
        if (mois < 10)
            mois = "0" + mois;
        var beginTestDate = moment("01/" + mois + "/" + annee).format("DD/MM/YYYY");
        var endTestDate = getMonthDateRange(annee, mois).end;
        var index = 0;
        var sommeTransferts = 0;
        while (typeof  tableau[indexDebut + index] != 'undefined' && moment(tableau[indexDebut + index].date).diff(endTestDate) <= 0) {
            //console.log("diff --------------->:" +moment(tableau[indexDebut+index].date).diff(beginTestDate));
            if (moment(tableau[indexDebut + index].date).diff(beginTestDate) >= 0) {
                sommeTransferts += parseFloat(tableau[indexDebut + index].transfert);
                /* console.log("date :"+tableau[indexDebut+index].date);
                 console.log("depense "+tableau[indexDebut+index].transfert);
                 console.log("recette parse "+parseFloat(tableau[indexDebut+index].transfert));*/
            }
            index++;
        }

        //console.log("somme Transferts du mois :" + mois + "est : " + sommeTransferts);
        return {
            transferts: sommeTransferts,
            index: index + indexDebut
        };
    }


    function getMonthDateRange(year, month) {
        // month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
        // array is 'year', 'month', 'day', etc
        var startDate = moment([year, month]).add(-1, "month");

        // Clone the value before .endOf()
        var endDate = moment(startDate).endOf('month');

        // just for demonstration:
        /*console.log(startDate.toDate());
         console.log(endDate.toDate());*/

        // make sure to call toDate() for plain JavaScript date type
        return {start: startDate, end: moment(endDate)};
    }


    /* Make some random data for Flot Line Chart*/


    function drawGraphs(annnee) {
        drawGraphRecetteDepense(annnee);
        drawGraphTransferts(annnee);
    }


    function drawGraphTransferts(annee) {
        for (i = 0; i < magasins.length; i++) {
            plotTransferts(i, prepareTransfertsTables(i));
            //addingTooltips(i+4);
        }

    }


    function drawGraphRecetteDepense(annee) {

        prepareGraphData(annee);

        for (i = 0; i < magasins.length; i++) {
            plotRecettesDepenses(i, prepareComptaTables(i));
            //addingTooltips(i);
        }

    }


    function prepareGraphData(annnee) {
        for (j = 0; j < magasins.length; j++) {
            recettesGlobales[j] = new Array();
            depensesGlobales[j] = new Array();
            transfertsGlobaux[j] = new Array();
            var index = 0;
            var indexTransfert = 0;
            var compta;
            var transf;
            for (i = 1; i <= 12; i++) {
                //compta=//sommeDepnsesRecettesMois(index, i, annnee, magasins[j].comptas);
                /* var comp = {
                 rec: compta.recette,
                 dep: compta.depenses
                 }*/
                //index=compta.index;
               /* console.log("index of");
                console.log(years.indexOf(annnee));*/

                if (typeof magasins[j].comptas[years.indexOf(annnee)] != "undefined") {
                    recettesGlobales[j][i - 1] = [i, magasins[j].comptas[years.indexOf(annnee)][i - 1]];
                    depensesGlobales[j][i - 1] = [i, magasins[j].depenses[years.indexOf(annnee)][i - 1]];
                } else {
                    recettesGlobales[j][i - 1] = [i, 0];
                    depensesGlobales[j][i - 1] = [i, 0];
                }


                //transf=sommeTransfertMois(indexTransfert, i, annnee, magasins[j].transferts);
                //indexTransfert=transf.index;
                if (typeof magasins[j].transferts != "undefined" &&  typeof magasins[j].transferts[yearsTransfert.indexOf(annnee)] != "undefined")
                    transfertsGlobaux[j][i - 1] = [i, magasins[j].transferts[yearsTransfert.indexOf(annnee)][i - 1]];
                else
                    transfertsGlobaux[j][i - 1] = [i, 0];
            }
        }

    }

    function prepareComptaTables(magasin) {
        /* Create an Array push the data + Draw the bars*/
        var barData = new Array();

        barData.push({
            data: recettesGlobales[magasin],
            label: 'Recettes',
            bars: {
                show: true,
                barWidth: 0.3,
                order: 1,
                lineWidth: 0,
                fillColor: '#8BC34A'
            }
        });

        barData.push({
            data: depensesGlobales[magasin],
            label: 'Dépenses',
            bars: {
                show: true,
                barWidth: 0.3,
                order: 2,
                lineWidth: 0,
                fillColor: '#00BCD4'
            }
        });

        return barData;

    }

    function plotRecettesDepenses(magasin, barData) {
        /* Let's create the chart */
        var strObj = "#bar-chart" + magasin;
        var strLegend = ".flc-bar" + magasin;
        if ($(strObj)[0]) {
            $.plot($(strObj), barData, {
                grid: {
                    borderWidth: 1,
                    borderColor: '#eee',
                    show: true,
                    hoverable: true,
                    clickable: true
                },

                yaxis: {
                    tickColor: '#eee',
                    tickDecimals: 0,
                    font: {
                        lineHeight: 13,
                        style: "normal",
                        color: "#9f9f9f",
                    },
                    shadowSize: 0
                },

                xaxis: {
                    tickColor: '#fff',
                    tickDecimals: 0,
                    font: {
                        lineHeight: 13,
                        style: "normal",
                        color: "#9f9f9f"
                    },
                    shadowSize: 0,
                },

                legend: {
                    container: strLegend,
                    backgroundOpacity: 0.5,
                    noColumns: 0,
                    backgroundColor: "white",
                    lineWidth: 0
                }
            });
        }
    }


    function prepareTransfertsTables(magasin) {
        /* Create an Array push the data + Draw the bars*/
        var barData = new Array();

        barData.push({
            data: transfertsGlobaux[magasin],
            label: 'Transferts',
            bars: {
                show: true,
                barWidth: 0.3,
                order: 1,
                lineWidth: 0,
                fillColor: '#EDC240'
            }
        });

        return barData;

    }

    function plotTransferts(magasin, barData) {
        /* Let's create the chart */
        var strObj = "#transfert-bar-chart" + magasin;
        var strLegend = ".transfert-flc-bar" + magasin;
        if ($(strObj)[0]) {
            $.plot($(strObj), barData, {
                grid: {
                    borderWidth: 1,
                    borderColor: '#eee',
                    show: true,
                    hoverable: true,
                    clickable: true
                },

                yaxis: {
                    tickColor: '#eee',
                    tickDecimals: 0,
                    font: {
                        lineHeight: 13,
                        style: "normal",
                        color: "#9f9f9f",
                    },
                    shadowSize: 0
                },

                xaxis: {
                    tickColor: '#fff',
                    tickDecimals: 0,
                    font: {
                        lineHeight: 13,
                        style: "normal",
                        color: "#9f9f9f"
                    },
                    shadowSize: 0,
                },

                legend: {
                    container: strLegend,
                    backgroundOpacity: 0.5,
                    noColumns: 0,
                    backgroundColor: "white",
                    lineWidth: 0
                }
            });
        }
    }


    function addingTooltips(magasin) {
        /* Tooltips for Flot Charts */

        if ($(".flot-chart")[magasin]) {
            $(".flot-chart").bind("plothover", function (event, pos, item) {
                if (item) {
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);
                    $(".flot-tooltip").html(item.series.label + " of " + x + " = " + y).css({
                        top: item.pageY + 5,
                        left: item.pageX + 5
                    }).show();
                }
                else {
                    $(".flot-tooltip").hide();
                }
            });

            $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body");
        }

    }


    function addHexColor(c1, c2) {
        var hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
        while (hexStr.length < 6) {
            hexStr = '0' + hexStr;
        } // Zero pad.
        return hexStr;
    }


    drawPieCharts(2016);
    function drawPieCharts(annnee) {
        var pieData = [
            {data: 1, color: '#F44336', label: 'Toyota'},
            {data: 2, color: '#03A9F4', label: 'Nissan'},
            {data: 3, color: '#8BC34A', label: 'Hyundai'},
            {data: 4, color: '#FFEB3B', label: 'Scion'},
            {data: 4, color: '#009688', label: 'Daihatsu'},
        ];


        var pieContainer = new Array();
        var sum = 0;
        var color = "F44336"
        for (i = 0; i < magasins.length; i++) {
            for (j = 0; j < 12; j++) {
                if (typeof magasins[i].comptas[years.indexOf(annnee)] != "undefined")
                    sum += magasins[i].comptas[years.indexOf(annnee)][j];

            }
            //console.log("Data (sum) : " + sum);
            pieContainer[i] = {
                data: sum,
                color: "#" + color,
                label: magasins[i].nom
            }

            sum = 0;
            addHexColor(color, '111111')
            //console.log(pieContainer);
        }


        if ($('#pie-chart')[0]) {
            $.plot('#pie-chart', pieData, {
                series: {
                    pie: {
                        show: true,
                        stroke: {
                            width: 2,
                        },
                    },
                },
                legend: {
                    container: '.flc-pie',
                    backgroundOpacity: 0.5,
                    noColumns: 0,
                    backgroundColor: "white",
                    lineWidth: 0
                },
                grid: {
                    hoverable: true,
                    clickable: true
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                    shifts: {
                        x: 20,
                        y: 0
                    },
                    defaultTheme: false,
                    cssClass: 'flot-tooltip'
                }

            });
        }


    }


    var gridLoaded = false;

    var grid = $("#data-table-command").bootgrid({
        css: {
            icon: 'zmdi icon',
            iconColumns: 'zmdi-view-module',
            iconDown: 'zmdi-expand-more',
            iconRefresh: 'zmdi-refresh',
            iconUp: 'zmdi-expand-less'
        }

    }).on("loaded.rs.jquery.bootgrid", function () {
        /*
         *
         *
         * magasin.depenses[years.indexOf( moment(dat).year() ) ]=new Array();
         magasin.transferts[yearsTransfert.indexOf( moment(dat).year() ) ][i]=0;
         magasin.comptas[ years.indexOf( moment(dat).year() ) ][moment

         magasin
         -depenses [année][mois]
         -comptas [année][mois]
         -transferts [année][mois]

         magasins [magasin]

         *
         *
         * */


        if (!gridLoaded) {
             AnDebut = 2011;//years.indexOf(moment("01/01/2011").year());
             AnFin = 2017;//years.indexOf(moment("01/01/2017").year());
             moisDebut=1;//years.indexOf(moment("01/01/2016").month());;
             moisFin=1;//years.indexOf(moment("01/01/2017").month());;
            setBootgrid();
        }


    });


    function doSums(mag, an) {
                var canSum = false;
                var anIndex=years.indexOf(an);
                for (l = 0; l < 12; l++) {

                     if(AnDebut==AnFin)
                        if(l+1>=moisDebut && l+1 <=moisFin)
                            canSum = true;
                         else canSum = false;
                     else {
                     if (an == AnDebut)
                            if (l +1 >= moisDebut)
                                canSum = true;
                            else canSum = false;

                    if (an == AnFin)
                        if (l +1  <= moisFin)
                            canSum = true;
                        else break;
                    if(an >AnDebut && an<AnFin)
                        canSum=true;
                     }

                    

                   


                    if (canSum) {   

                        if (!(magasins[mag].depenses === undefined ) && !(magasins[mag].depenses === null)) {
                            if (!(magasins[mag].depenses[anIndex] === undefined ) && !(magasins[mag].depenses[anIndex] === null))
                                if(   !(magasins[mag].depenses[anIndex][l] === undefined ) && !(magasins[mag].depenses[anIndex][l] === null) )
                                    depenses += magasins[mag].depenses[anIndex][l];
                            else depenses += 0;
                        }
                        else depenses += 0;


                        if (!(magasins[mag].comptas === undefined ) && !(magasins[mag].comptas=== null)) {
                            if (!(magasins[mag].comptas[anIndex] === undefined ) && !(magasins[mag].comptas[anIndex] === null))
                                if(   !(magasins[mag].comptas[anIndex][l] === undefined ) && !(magasins[mag].comptas[anIndex][l] === null) )
                                    recettes += magasins[mag].comptas[anIndex][l];

                            else recettes += 0;
                        }
                        else recettes += 0;

                        if (!(magasins[mag].transferts === undefined ) && !(magasins[mag].transferts=== null)) {
                            if (!(magasins[mag].transferts[anIndex] === undefined ) && !(magasins[mag].transferts[anIndex] === null))
                                if(   !(magasins[mag].transferts[anIndex][l] === undefined ) && !(magasins[mag].transferts[anIndex][l] === null) )
                                transferts += magasins[mag].transferts[anIndex][l];
                            else transferts += 0;
                        }
                        else transferts += 0;
                    }
                }
            }

      function setBootgrid(){
            grid.bootgrid("clear");
            for (i = 0; i < magasins.length; i++) {
                if( !(magasins[i] === undefined ) && !(magasins[i] === null)  )
                    for (k = 0; k < years.length; k++)
                        if (years[k] >= AnDebut && years[k] <= AnFin){
                            doSums(i,years[k]);
                        }

                rows[i] = {
                    "id": i + 1,
                    "magasin": "" + magasins[i].nom,
                    "recettesMag": recettes,
                    "depensesMag": depenses,
                    "transfertsMag": transferts
                };
                recettes = 0;
                depenses = 0;
                transferts = 0;
            }
            grid.bootgrid("append", rows);
            gridLoaded = true;
        

            }


});