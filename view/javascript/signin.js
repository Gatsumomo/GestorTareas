$(document).ready(function () {
    $("#sign").bing("submit", function (){
        var btnEnviar = $("#signin");
        $.ajax({
            type: $(this).atrr("method"),
            url: $(this).attr("action"),
            data:$(this).serialize(),
            beforeSend: function(){
                btnEnviar.val("Enviando");
                btnEnviar.attr("disabled", "disabled");
            },
            complete:function(data){
                btnEnviar.val("Sign in");
                btnEnviar.removeAttr("disabled");
            },
            success: function(data){
                $(".result").html(data);
            },
            error: function(data){
                alert("Error al enviar los datos")
            }
        });
        return false;
    })
})