function Post(url, data) { 
    return $.ajax({
        method: "Post",
        url: url,
        // contentType: 'application/json',
        data: data,//JSON.stringify(data),
        success: function (d) {
            debugger
            if ($.type(d) == "string" && d == "")
                LoginNow()
            else if ($.type(d) == "string")
                AccessDenied();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            debugger
            ErrorMessage(errorMsg);
        }
    });
}
function Get(url) {
    return $.ajax({
        method: "Get",
        url: url,
        cache: false,
        success: function (d) {
            if ($.type(d) == "string" && d == "")
                LoginNow()
            else if ($.type(d) == "string")
                AccessDenied();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            ErrorMessage(errorMsg);
        }
    });
}




function SaveAndUpload(url, formData) {
   /* BlockUI(isBlockUI, e);*/
    return $.ajax({
        data: formData,
        method: "Post",
        url: url,
        cache: false,
        processData: false,
        contentType: false,
        success: function (d) {
            debugger
           /* UnBlockUI(e);*/
            if ($.type(d) == "string" && d == "")
                LoginNow()
            else if ($.type(d) == "string")
                AccessDenied();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            debugger
           /* UnBlockUI(e);*/
            ErrorMessage(errorMsg);
        }
    });
}
