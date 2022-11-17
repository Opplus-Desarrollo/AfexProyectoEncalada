TraerDatos();

function InsertarEnalce() {


    var enlace = $("#txtEnlace").val();
   

        if (enlace.length == 0) {
            fun_mensaje("El formato es incorrecto", "El enlace esta vacío", "error");
            return;

    };

    var url = enlace.split("=", 2);



  

    //

    let datoSnippet = $.get("https://www.googleapis.com/youtube/v3/videos?id=" + url[1] + "&key=AIzaSyB5MFcXQThyMMUlo9-V2Myl94VZaNijA_4&part=snippet",
        function (datos) {

            datoSnippet = datos.items[0].snippet;
            const { categoryId, channelId, channelTitle, defaultAudioLanguage, description, liveBroadcastContent, localized, publishedAt, tags, thumbnails, title } = datoSnippet;

            // Star insert  s
            var DTO = { codigo: url[1], titulo: title, imagen: thumbnails.medium.url, descripcion: description }

            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "Default.aspx/InsertarEnalce",
                data: JSON.stringify(DTO),
                datatype: "json",
                success: function (data) {



                    if (data.d == true) {

                        const parameter = [url[1], description, title, thumbnails.medium.url];
                        ArmarCadena(parameter);

                        $("#txtEnlace").val("");
                        fun_mensaje("Agregrado", "El video se agregó a la galeria", "success")

                    }
                    else {

                        fun_mensaje("Error", "El video ya existe en la galeria", "error")
                    }


                },
                error: function (xmlhttprequest, textstatus, errorthrown) {

                    console.log("error: " + errorthrown);
                }
            });


        });
}

function EliminarEnlace(codigo) {

    console.log(codigo);

    var DTO = { codigo: codigo }

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Default.aspx/EliminarEnlace",
        data: JSON.stringify(DTO),
        datatype: "json",
        success: function (data) {

            if (data.d == true) {
                console.log(data);
                $("#" + codigo + "DIV").hide();
                fun_mensaje("Agregrado", "El video eliminado de la galeria", "success")
            }


        },
        error: function (xmlhttprequest, textstatus, errorthrown) {

            console.log("error: " + errorthrown);
        }
    });

}

function TraerDatos() {

    var DTO = {};

    console.log("TraerDatos");

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Default.aspx/listaEnlace",
        data: JSON.stringify(DTO),
        datatype: "json",
        success: function (data) {


            for (i = 0; i <= data.d.length - 1; i++) {
                //----
                const parameter = [data.d[i].codigo, data.d[i].descripcion, data.d[i].titulo, data.d[i].imagen];
                ArmarCadena(parameter);
                //----
            }

        },
        error: function (xmlhttprequest, textstatus, errorthrown) {

            console.log("error: " + errorthrown);
        }
    });
}
function ArmarCadena(parametos) {


    var vId = parametos[0];
    var idDescripcion = parametos[0] + "D";
    var idTitle = parametos[0] + "T";
    var idCodigo = parametos[0] + "C";
    var vIdEilimar = parametos[0] + "E";
    var vIdEilimarDiv = parametos[0] + "EDIV";



    var cad = '';
    cad += ' <div class="col-md-4 col-sm-4 col-xs-4 pb-5" id="' + vIdEilimarDiv + '"  style="display:block ">';
    cad += '<button type="button" id=' + vIdEilimar + ' class="close" onclick="EliminarEnlace(this.id)" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
    cad += '<img id=' + vId + ' src="' + parametos[3] + '"  alt="asdas" class="img-rounded" onclick=(openModal(this.id))>';
    cad += '<input type="hidden" id="' + idDescripcion + '" value="' + parametos[1] + '">'
    cad += '<input type="hidden" id="' + idTitle + '" value="' + parametos[2] + '">'
    cad += '<input type="hidden" id="' + idCodigo + '" value="' + parametos[0] + '">'
    cad += '  </div>';

    $('#gridVideo').prepend(cad);


}
function openModal(id) {

    $("#mtitulo").text($("#" + id + "T").val());
    $("#mDescripcion").text($("#" + id + "D").val());
    var url = $("#" + id + "C").val();

    console.log($("#" + id + "T").val());

    $("#mFrame").append('  <iframe width="560" height="315" src="https://www.youtube.com/embed/' + url + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');

    $("#myModal").modal()


}

function fun_mensaje(vTitulo, vMensaje, vTipo) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",

        //"preventDuplicates": true,
        //"preventOpenDuplicates": false

    }
    toastr[vTipo](vTitulo, vMensaje);
};