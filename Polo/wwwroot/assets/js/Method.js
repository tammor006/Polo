function Post(url, data, isBlockUI, e) {
    BlockUI(isBlockUI, e); 
    return $.ajax({
        method: "Post",
        url: url,
        // contentType: 'application/json',
        data: data,//JSON.stringify(data),
        success: function (d) {
              UnBlockUI(e);
            if ($.type(d) == "string" && d == "")
                LoginNow()
            else if ($.type(d) == "string")
                AccessDenied();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UnBlockUI(e);
            ErrorMessage(errorMsg);
        }
    });
}

function Get(url, isBlockUI, e) {
   BlockUI(isBlockUI, e);
    return $.ajax({
        method: "Get",
        url: url,
        cache: false,
        success: function (d) {
            UnBlockUI(e);
            if ($.type(d) == "string" && d == "")
                LoginNow()
            else if ($.type(d) == "string")
                AccessDenied();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {  
          
           
            UnBlockUI(e);
            ErrorMessage(errorMsg);
        }
    });
}




function SaveAndUpload(url, formData, isBlockUI, e) {
     BlockUI(isBlockUI, e);
    return $.ajax({
        data: formData,
        method: "Post",
        url: url,
        cache: false,
        processData: false,
        contentType: false,
        success: function (d) {
            debugger
            UnBlockUI(e);
            if ($.type(d) == "string" && d == "")
                LoginNow()
            else if ($.type(d) == "string")
                AccessDenied();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            UnBlockUI(e);
            ErrorMessage(errorMsg);
        }
    });
}
