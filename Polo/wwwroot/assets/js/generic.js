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
//function showToast() {
//    debugger
//    /*type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];*/
//    toastr.options = {
//        "closeButton": false,
//        "debug": false,
//        "newestOnTop": false,
//        "progressBar": false,
//        "positionClass": "toast-top-right",
//        "preventDuplicates": false,
//        "onclick": null,
//        "showDuration": 300,
//        "hideDuration": 1000,
//        "timeOut": 5000,
//        "extendedTimeOut": 1000,
//        "showEasing": "swing",
//        "hideEasing": "linear",
//        "showMethod": "fadeIn",
//        "hideMethod": "fadeOut"
//    }
//    //$.toa({
//    //    message: msg

//    //}, {
//    //    element: 'body',
//    //    position: null,
//    //    type: "info",
//    //    allow_dismiss: true,
//    //    timer: 3000,
//    //    z_index: 99999999999,
//    //    placement: {
//    //        from: 'bottom',
//    //        align: 'center'
//    //    },
//    //    template:'<div><input class="input-small form-control form-control-sm mb-2" placeholder="textbox"/>&nbsp;<a href="" target="_blank">This is a hyperlink</a></div><div><button type="button" id="okBtn" class="btn btn-primary mt-2">Close me</button><button type="button" id="surpriseBtn" class="btn text-white  mt-2" style="margin: 0 8px 0 8px">Surprise me</button></div>'

//    //});
function BlockUI(isBlockUI, e) {
    if (typeof e !== "undefined") {
        if (e.currentTarget == undefined) {
            $(e).find("span:first").hide()
            $(e).attr("disabled", "disabled")
            $(e).find("span:nth-child(2)").show()
        }
        else {
            $(e.currentTarget).find("span:first").hide()
            $(e.currentTarget).attr("disabled", "disabled")
            $(e.currentTarget).find("span:nth-child(2)").show()
        }
    }
    if (typeof isBlockUI === "undefined" || isBlockUI)
        $("#divLoader").fadeIn("slow");
}

function UnBlockUI(e) {
    if (typeof e !== "undefined") {
        if (e.currentTarget == undefined) {
            $(e).find("span:first").show()
            $(e).removeAttr("disabled")
            $(e).find("span:nth-child(2)").hide()
        }
        else {
            $(e.currentTarget).find("span:first").show()
            $(e.currentTarget).removeAttr("disabled")
            $(e.currentTarget).find("span:nth-child(2)").hide()
        }
    }
    //else
    //    $("#divLoader").fadeOut("slow");
}
$(function ($) {
    //$('.DateDOB').datetimepicker(
    //    {
    //        format: 'DD/MM/YYYY',
    //        showTodayButton: true,
    //        showClear: true,
    //        showClose: true,
    //        maxDate: new Date()
    //    });

    //$('.datepicker').datetimepicker({ format: 'DD/MM/YYYY', showTodayButton: true, showClear: true, showClose: true });
   // $('.timepicker').datetimepicker({ format: 'H:mm', showClear: true, showClose: true });
   // $('.timepickerInMin').datetimepicker({ format: 'mm', showClear: true, showClose: true });
  //  $('.datetimepicker').datetimepicker({ format: 'DD/MM/YYYY H:mm', showTodayButton: true, showClear: true, showClose: true });*/
   // $('.datetimepicker-current').datetimepicker({ format: 'DD/MM/YYYY H:mm', defaultDate: new Date(), showTodayButton: true, showClear: true, showClose: true });*/
  //  $(".datepicker-current").datepicker({ format: 'DD/MM/YYYY', defaultDate: new Date(), showTodayButton: true, showClear: true, showClose: true, });
    $(".datepicker-minToday").datepicker({ format: 'DD/MM/YYYY', minDate: new Date(), showTodayButton: true, showClear: true, showClose: true });
   // $(".datetimepicker-minToday").datetimepicker({ format: 'DD/MM/YYYY H:mm', minDate: new Date(), showTodayButton: true, showClear: true, showClose: true });
  // $('.DateTo').datetimepicker({ format: 'DD/MM/YYYY H:mm', showTodayButton: true, showClear: true, showClose: true });
    //$('.DateFrom').datetimepicker(
    //    {
    //        format: 'DD/MM/YYYY H:mm',
    //        showTodayButton: true,
    //        showClear: true,
    //        showClose: true,
    //        //minDate: new Date()
    //    }).on("dp.change", function (e) {
    //        var minDate = new Date(e.date._d);
    //        var val = $('.DateTo').val();
    //        $('.DateTo').datetimepicker('destroy').datetimepicker({
    //            format: 'DD/MM/YYYY H:mm',
    //            showTodayButton: true,
    //            showClear: true,
    //            showClose: true,
    //            minDate: minDate
    //        });
    //        if (val == "")
    //            $('.DateTo').val("")
    //    });

    //$('.EndDate').datetimepicker({ format: 'DD/MM/YYYY', showTodayButton: true, showClear: true, showClose: true });
    //$('.StartDate').datetimepicker(
    //    {
    //        format: 'DD/MM/YYYY',
    //        showTodayButton: true,
    //        showClear: true,
    //        showClose: true,
    //        //minDate: new Date()
    //    }).on("dp.change", function (e) {
    //        var minDate = new Date(e.date._d);
    //        var val = $('.EndDate').val();
    //        $('.EndDate').datetimepicker('destroy').datetimepicker({
    //            format: 'DD/MM/YYYY',
    //            showTodayButton: true,
    //            showClear: true,
    //            showClose: true,
    //            minDate: minDate
    //        });
    //        if (val == "")
    //            $('.EndDate').val("")
    //    });
    //$('.StrDateTo').datetimepicker({ format: 'DD/MM/YYYY ', showTodayButton: true, showClear: true, showClose: true });
    //$('.StrDateFrom').datetimepicker(
    //    {
    //        format: 'DD/MM/YYYY ',
    //        showTodayButton: true,
    //        showClear: true,
    //        minDate: new Date(),
    //        showClose: true,
    //        //minDate: new Date()
    //    }).on("dp.change", function (e) {
    //        var minDate = new Date(e.date._d);
    //        var val = $('.StrDateTo').val();
    //        $('.StrDateTo').datetimepicker('destroy').datetimepicker({
    //            format: 'DD/MM/YYYY ',
    //            showTodayButton: true,
    //            showClear: true,
    //            showClose: true,
    //            minDate: minDate
    //        });
    //        if (val == "")
    //            $('.StrDateTo').val("")
    //    });
    //$('.TimeTo').datetimepicker({ format: ' h:mm A', showTodayButton: true, showClear: true, showClose: true });
    //$('.TimeFrom').datetimepicker(
    //    {
    //        format: ' h:mm A',
    //        showTodayButton: true,
    //        showClear: true,
    //        showClose: true,
    //        //minDate: new Date()
    //    }).on("dp.change", function (e) {
    //        var minDate = new Date(e.date._d);
    //        var val = $('.TimeTo').val();
    //        $('.TimeTo').datetimepicker('destroy').datetimepicker({
    //            format: ' h:mm A',
    //            showTodayButton: true,
    //            showClear: true,
    //            showClose: true,
    //            minDate: minDate
    //        });
    //        if (val == "")
    //            $('.TimeTo').val("")
    //    });
    // #EndRegion of Date Range
  //  $('.select').select2();
});