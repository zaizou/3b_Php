/**
 * Created by Yazid on 16/09/2016.
 */


var storeName = "";
var state;
var manager = "";
var longitude;
var latitude;
var address = "";
var idMag;
var ancResp="";
var typeM="";
var ordreM="";
var imagesList;
var mail=$("#mailInput").attr("placeholder");
var telephone=$("#telInput").attr("placeholder");
var videoId=$("#youtubeIdInput").attr("placeholder");
var placeId=$("#placeIdInput").attr("placeholder");
var dossier_stock=$("#dossier_stock").val();



var geocoder = new google.maps.Geocoder;




$(document).ready(function () {
    $("input.compte").prop("readonly", true);
    storeName = $("#creat_input_nom").attr('placeholder');
    state = $("#wilaya_magasin").attr('placeholder');
    ancResp = $("#resp_magasin_id").attr("placeholder");
    latitude = $("#latitudeInput").attr("placeholder");
    longitude = $("#longitudeInput").attr("placeholder");
    address = $("#addressInput").attr("placeholder");
    idMag = $("#idMag").val();

    $('button.compte-mod').on('click', function () {
        $("input.compte").prop("readonly", false);
        $("#placeIdInput").prop("readonly", false);
        $(".shown_info").css('display', 'none');
        $(".hidden_edit").css('display', '');
        prepareSelectFromJSON();
        $(this).css('display', 'none');
        $("button.compte-mod-save").css('display', '');
        prepareGMAPS_view();


    });


    $('button.compte-mod-save').on('click', function () {
        afficherModifierMagasinMessage();
    });


    function getImagesList(){
        $.getJSON('management_get_images.json?nomMagasin='+storeName, {
            ajax: 'true'
        }, function (result) {


            console.table(result);
            for(i=0;i<result.length;i++){
                console.log(result.imageMagasinList[i]);
            }

            imagesList=result.imageMagasinList;

        }).done(function () {
                console.log("apres success");
            })
            .fail(function () {
                console.log("error dans la requete d'ajout de responsables");
            })
            .always(function () {
                console.log("complete toujours succes ou erreur");
            });

    }

/*
    init: function () {
        var mockFile = { name: "myimage.jpg", size: 12345, type: 'image/jpeg' };
        this.options.addedfile.call(this, mockFile);
        this.options.thumbnail.call(this, mockFile, "http://someserver.com/myimage.jpg");
        mockFile.previewElement.classList.add('dz-success');
        mockFile.previewElement.classList.add('dz-complete');
    }
*/
    
    Dropzone.autoDiscover = false;

    var myDropzone = new Dropzone("div#my-awesome-dropzone", {
        url: "/uploadfile",
        init: function () {
            var _this = this;

            var mockFile;
            for(i=0;i<images.length;i++){
                mockFile = { name: images[i].id};
                this.options.addedfile.call(this, mockFile);
                console.log("the path is :"+images[i].path);
                this.options.thumbnail.call(this, mockFile, images[i].path );
                mockFile.previewElement.classList.add('dz-success');
                mockFile.previewElement.classList.add('dz-complete');
            }


            this.on("addedfile", function () {
              /*  if (this.files[1] != null) {
                    this.removeFile(this.files[0]);
                }*/
            });

            this.on("sending", function (file, xhr, data) {
                data.append("_token", $('#code').val());
                console.log("hello i am sending files");
            });

            this.on("processing", function(file) {
                this.options.url = "uploadfile?name=" + storeName+"&dossier="+dossier_stock;
            });

            this.on("removedfile", function (file) {
                //html manipulation to disable and select certain page stuff
                $.ajax(
                {
                    type: "POST",
                    url: "remove_image",
                    data: {id_image: file.name}
            });/*.done(function (data) {
                    if (JSON.parse(data) == "100") 
                        swal("Succès!", "L'utilisateur est ajouté avec Succès", "success");
                    else
                        swal("Erreur!", "Erreur lors de la supression de l'imgae", "error");
                }).error(function (data) {
                    swal("Erreur", "L'Utilisateur n'est pas ajouté", "error");
                });*/
                
                
            });

            this.on("success", function (file) {
                //html manipulation to disable and select certain page stuff                    });
            });
        }

        ,
        uploadMultiple: false,
        clickable: true,
        addRemoveLinks: true,

    });




    $("#mailInput").on('change',function () {
        mail=$(this).val();
    });

    $("#telInput").on('change',function () {
        telephone=$(this).val();
    });


    $("#youtubeIdInput").on('change',function () {
        videoId=$(this).val();
    });




    $("#creat_input_nom").on('change', function () {
        storeName = $(this).val();
    });
    $("#wilaya-select").on('change', function () {
        state = $(this).val();
    });

    $("#ordre-select").on('change', function () {
        ordreM = $(this).val();
    });
    $("#type-select").on('change', function () {
        typeM = $(this).val();
    });

    $("#responsable-select").on('change', function () {
        manager = $(this).val();
    });
    $("#latitudeInput").on('change', function () {
        latitude = $(this).val();
    });
    $("#longitudeInput").on('change', function () {
        longitude = $(this).val();
    });
    $("#addressInput").on('change', function () {
        address = $(this).val();
    });




    function prepareSelectFromJSON() {
        //Initialisation
        $.getJSON('gestion_utilisateurs_utilisateurs_libres_list', {
            ajax: 'true'
        }, function (result) {
            var htln = "";
            for (var i = 0; i < result.length; i++) {
                htln += '<option value=';
                htln += "" + result[i].id;
                htln += '>';
                htln += "" + result[i].nom + " " + result[i].prenom;
                htln += '</option>';
            }
            $("#responsable-select")
                .html(htln)
                .selectpicker('refresh');

        }).done(function () {
                console.log("apres success");
            })
            .fail(function () {
                console.log("error dans la requete d'ajout de responsables");
            })
            .always(function () {
                console.log("complete toujours succes ou erreur");
            });


        //Initialisation
        $.getJSON('wilayas_list', {
            ajax: 'true'
        }, function (result) {
            var htln = "";
            var matricule = "";
            for (var i = 0; i < result.length; i++) {
                if (result[i].matricule_wilaya < 10)
                    matricule = "0" + result[i].matricule_wilaya;
                else
                    matricule = "" + result[i].matricule_wilaya;
                htln += '<option value=';
                htln += "" + result[i].matricule_wilaya;
                htln += '>';
                htln += "" + matricule + " - " + result[i].intitule_wilaya;
                htln += '</option>';
                matricule = "";
            }
            $("#wilaya-select")
                .html(htln)
                .selectpicker('refresh');

        }).done(function () {
                console.log("apres success");
            })
            .fail(function () {
                console.log("error dans la requete d'ajout de responsables");
            })
            .always(function () {
                console.log("complete toujours succes ou erreur");
            });


    }


    function prepareGMAPS_view() {
        var map = $('#mapSelector').locationpicker({
            location: {latitude: 36.718863059742844, longitude: 3.183347702026367},
            radius: 0,
            enableAutocomplete: true,
            inputBinding: {
                latitudeInput: $('#latitudeInput'),
                longitudeInput: $('#longitudeInput'),
                locationNameInput: $('#addressInput')
            }
        });

        var map = $('#mapSelector').locationpicker("map");


        var marker = map.marker;
        google.maps.event.addListener(marker, 'dragend', function () {
            console.info("my marker is working" + marker.getPosition().toString());
            getLocationId(marker.getPosition().lat(), marker.getPosition().lng());
            //autocomplete.setPosition(marker.getPosition());
        });

        getLocationId(36.718863059742844,3.183347702026367);




        //initMap();

    }


    function getLocationId(latitude, longitude) {
        var latlng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};

        geocoder.geocode({'location': latlng}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    console.log("place id is :" + results[1].place_id);
                    $("#placeIdInput").val(results[1].place_id);
                    placeId = results[1].place_id;
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }


    function initMap() {
        var map = new google.maps.Map(document.getElementById('mapSelector'), {
            center: {lat: -33.8688, lng: 151.2195},
            zoom: 13
        });


        var input = document.getElementById('addressInput');

        var autocomplete = new google.maps.places.Autocomplete(input);
        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        autocomplete.bindTo('bounds', map);
        var marker = new google.maps.Marker({
            draggable: true,
            position: {lat: -33.8688, lng: 151.2195},
            animation: google.maps.Animation.DROP,
            map: map
        });
        marker.setVisible(true);

        autocomplete.addListener('place_changed', function () {
            if(marker)
                marker.setVisible(false);
            var place = autocomplete.getPlace();
            console.log(place.geometry.location.toString());
            if (!place.geometry)
                return;

            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }

            // Set the position of the marker using the place ID and location.

            marker = new google.maps.Marker({
                draggable: true,
                position: place.geometry.location,
                animation: google.maps.Animation.DROP,
                map: map
            });
            google.maps.event.addListener(marker, 'dragend', function () {
                //map.setCenter(marker.getPosition());
              //  console.info(marker.getPosition().toString());
                //autocomplete.setPosition(marker.getPosition());
            });


            marker.setVisible(true);


        });

        google.maps.event.addListener(marker, 'dragend', function () {
            map.setCenter(marker.getPosition());
            console.info(marker.getPosition().toString());
            getLocationId(marker.getPosition().lat,marker.getPosition().lng);
            //autocomplete.setPosition(marker.getPosition());
        });


    }



    function afficherModifierMagasinMessage() {

         dossier_stock=$("#dossier_stock").val();
        if(manager=="")
            manager=ancResp;

        swal({
            title: "Etes Vous Sure ?",
            text: "Voulez vous Modifier ce Magasin ?",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Confirmer",
            confirmButtonClass: "btn  btn-success waves-effect",
        }, function () {
            $.ajax(
                {
                    type: "POST",
                    url: "gestion_magasin_magasin_edit",
                    data: {
                        idMagasin: idMag,
                        ancienResponsable: ancResp,
                        responsable: manager,
                        nomMagasin: storeName,
                        wilayaMagasin: state,
                        latitudeMag: latitude,
                        longitudeMag: longitude,
                        adresseMag: address,
                        type_magasin:typeM,
                        ordre_magasin:ordreM,
                        dossier_stockage:dossier_stock,
                        tel:telephone,
                        email:mail,
                        vidId:videoId,
                        placId:placeId

                    }
                }
                )
                .done(function (data) {
                    if (JSON.parse(data) == "100") {
                        swal("Succès!", "L'utilisateur est ajouté avec Succès", "success");
                        window.location.replace("management_gestion_magasins_magasins");
                    }
                    else if(JSON.parse(data) == "101")
                        swal("Erreur", "Interdit d'affecter un responsable à plusieurs magasins ", "error");
                    else
                        swal("Erreur!", "Le Magasin n'est pas Modifié  code d'erreur : "+JSON.parse(data), "error");


                })
                .error(function (data) {
                    swal("Erreur", "L'Utilisateur n'est pas ajouté", "error");
                });
        });
    }


});