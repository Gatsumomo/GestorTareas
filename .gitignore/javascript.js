$(function() {
    var theTemplateScript = $('#expressions-template').html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    var context={
        "description": {
            "escaped": "Using {{}} brackets will result in escaped HTML:",
            "unescaped": "Using {{{}}} will leave the context as it is:"
        },
        "example": "<button>Hello</button>"
    }
    var theCompiledHtml = theTemplate(context);
    $('.content-placeholder').html(theCompiledHtml)
})