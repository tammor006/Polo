function AccessDenied() {
    swal({
        title: "Unauthorized access has been detected",
        text: "You are not authorize to perform this action",
        confirmButtonClass: 'btn-danger',
        confirmButtonText: "Ok, got it!",
        type: "error"
    });
}
var errorMsg = "Something went wrong. Please try again";
function SuccessMessage(msg) {
}
function ErrorMessage(msg) {
    console.log(msg);
}
function WarningMessage(msg) {
    console.log(msg);
}
function InfoMessage(msg) {
    console.log(msg);
}
function ShowMessage(msg) {
    if (!($.type(msg.Detail) === "undefined")) {
        // alertify.set('notifier', 'delay', 10);
        if (msg.Info) {
            InfoMessage(msg.Detail);
        }
        else if (msg.Warning) {
            WarningMessage(msg.Detail);
        }
        else if (msg.Success) {
            SuccessMessage(msg.Detail);

        }
        else if (!msg.Success) {
            ErrorMessage(msg.Detail);
        }
        else if (msg.Info) {
            InfoMessage(msg.Detail);
        }
        else if (msg.Warning) {
            WarningMessage(msg.Detail);
        }
    }
}
function showToast() {
    debugger
    /*type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];*/
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": 300,
        "hideDuration": 1000,
        "timeOut": 5000,
        "extendedTimeOut": 1000,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    //$.toa({
    //    message: msg

    //}, {
    //    element: 'body',
    //    position: null,
    //    type: "info",
    //    allow_dismiss: true,
    //    timer: 3000,
    //    z_index: 99999999999,
    //    placement: {
    //        from: 'bottom',
    //        align: 'center'
    //    },
    //    template:'<div><input class="input-small form-control form-control-sm mb-2" placeholder="textbox"/>&nbsp;<a href="" target="_blank">This is a hyperlink</a></div><div><button type="button" id="okBtn" class="btn btn-primary mt-2">Close me</button><button type="button" id="surpriseBtn" class="btn text-white  mt-2" style="margin: 0 8px 0 8px">Surprise me</button></div>'

    //});


}