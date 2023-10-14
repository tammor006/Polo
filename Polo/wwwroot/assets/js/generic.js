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
var jqueryDatatable, isNumeric, isFieldEdit = false;

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
    //$('#availabletime').datetimepicker(
    //    { format: 'DD/MM/YYYY H:mm',showTodayButton: true, showClear: true, showClose: true }
    //);
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
   // $(".datepicker-minToday").datepicker({ format: 'DD/MM/YYYY', minDate: new Date(), showTodayButton: true, showClear: true, showClose: true });
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
$.fn.advancedDataTable = function (options) {
    debugger
    $("#" + $(this).attr("id")).parent("div").hide();
    //if ($.fn.dataTable.isDataTable(this))
    //    $(this).dataTable().fnPageChange($(this).dataTable().fnPagingInfo().iPage);
    //else {
        $(this).dataTable().fnDestroy();
        jqueryDatatable = $(this).DataTable({
            "processing": true,
            "bSort": false,
            "bFilter": options.filter,
            "bDeferRender": true,
            //"order": [], 
            //dom: 'Bfrtip',
            //lengthMenu: [
            //    [10, 25, 50, -1],
            //    ['10 rows', '25 rows', '50 rows', 'Show all']
            //],
            //buttons: [
            //    'pageLength'
            //],
            "pagingType": "full_numbers",
            //"info": "_TOTAL_ entries",
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, 'All']],

            "oLanguage": {
                
                "sSearch": "",
                "sSearchPlaceholder": "Search...",
                "sProcessing": '<img src="/assets/images/loaderDatatable.gif" style="width: 50px;" />',
                "sLengthMenu": "_MENU_",
                //"oPaginate":
                //{
                //    "sNext": '<span class="material-icons">keyboard_arrow_right</span>',
                //    "sLast": '',
                //    "sFirst": '',
                //    "sPrevious": '<span class="material-icons">keyboard_arrow_left</span>'
                //},
                "sZeroRecords": 'No matching records found',
                "sInfo": '_START_-_END_ OF _TOTAL_',
                "sEmptyTable": 'No data found ',
                "sInfoEmpty": '0-0 OF 0',
                "sInfoFiltered": '',
            },
            "initComplete": function (settings, json) {
                debugger
                //$(".manual-dropdown").empty()
                //$("[name=" + $(this).attr("id") + "_length]").addClass("form-control pull-right");
                //$("[name=" + $(this).attr("id") + "_length]").detach().prependTo(".manual-dropdown");
                // $(".manual-dropdown").html($(".manual-dropdown").html())
                // $(".dataTables_length").remove();

                //$("#" + $(this).attr("id") + "_filter > label > input").addClass("form-control");
                //$("#" + $(this).attr("id") + "_filter > label > input").detach().prependTo(".claimdocumenttable-filter");
                //$(".dataTables_filter").remove();
                //$(".remove-it").remove();
                //$(".paginate_button.active").remove();
                //$(".dataTables_info").prependTo($(".dataTables_paginate").parent("div"))
                ////$(".dataTables_info").parent("div").addClass("d-flex align-items-center justify-content-end mb-3");
                //$(".dataTables_info").parent("div").addClass("pagination mb-3");
                //// $(".dataTables_length label").addClass("dataTables_lengths");
                //$(".dataTables_length label").prependTo($(".dataTables_paginate").parent("div"));
                $(".dataTables_length").append("<span class='remove-it' style='color: rgba(0, 0, 0, 0.6);font-size: 12px;padding-bottom:0;margin-left:10px;'>Items per page:</span>");
                /*$(".dataTables_info").after(). append("<span class='remove-it' style='margin-left:10px;'>Total Records</span>");*/
                $(".pagination .first").hide();
                $(".pagination .last").hide();
                $("<span class='remove-it' style='margin-right:5px;'>Total Records:</span>").prependTo(".dataTables_info");

                //$("select[name='" + $(this).attr("id") + "_length']").parent("div").addClass("pb-0");
                //$("select[name='" + $(this).attr("id") + "_length']").parent("div").append('<span class="remove-it material-icons" style="margin-left: -22px;">arrow_drop_down</span>')
                $("#" + $(this).attr("id") + "_wrapper").parent("div").slideDown(300);


               
               
            },
            "serverSide": true,
            "ajaxSource": options.url,
            //fnServerData method used to inject the parameters into the AJAX call sent to the server-side
            "fnServerData": function (sSource, aoData, fnCallback, oSettings) {
                debugger

                aoData.push({ "name": "SearchJson", "value": JSON.stringify(options.postData) }); // Add some extra data to the sender

                $.getJSON(sSource, aoData, function (d) {
                    debugger
                    $.ajaxSetup({ cache: false });
                    if (!d.msg.success)
                        toastr["warning"](d.msg.detail);
                    else
                        fnCallback(d.data);
                });
                //}).error(function (d, c, dd, t) {
                //    if (d.status == 200)
                //        AccessDenied();
                //    else
                //        ErrorMessage('Something went wrong, please try again');
                //});
            },
            "bResetDisplay": false,
            "bLengthChange": true,
            "aaSorting": [],
            "ordering": true,
            "createdRow": options.createdRow,
            "drawCallback": function (settings, r, er, err) {
                //$('.i-checks').iCheck({
                //    checkboxClass: 'icheckbox_square-blue',
                //    radioClass: 'iradio_square-blue'
                //});
                $("#" + $(this).attr("id")).parent("div").slideDown(300);
            },
            "columns": options.bindingData,
            "aoColumnDefs": options.disableSorting,
            "rowCallback": function (row, data, index) {

                debugger
            }
        });
    
};