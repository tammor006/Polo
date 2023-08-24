﻿var Stock = {
    id: 0,
    quantity: 0,
    strLastUpdate: "",
    isActive: true,
    productId:0
}

function PreBind() {
    Get('/Stock/PreBind').then(function (d) {
        if (d.success) {
            debugger
            var newOption;
            for (var i = 0; i < d.data.product.length; i++) {
                newOption = new Option(d.data.product[i].name, d.data.product[i].id, false, false);
                $('#productselect').append(newOption).trigger('change');
            }

        }
        else
            toastr["errror"](d.detail);
    });
}
function ClearModel() {
    $("#date").val("");
    $("#quantity").val("");
    $('#productselect').val("");
}
function ShowModal(Id) {
    ClearModel();
    if (Id == 0) {
        $("#modal").modal('show');
        $("#mySmallModalLabel").text("Add Stock");
    }
    else {
        Get("/Stock/GetStockById?id=" + Id).then(function (d) {
            debugger
            if (d.success) {
                Stock.id = d.data.stock.id;
                Stock.productId = d.data.stock.productId;
                Stock.quantity = d.data.stock.quantity;
                Stock.strLastUpdate = d.data.stock.strLastUpdate;
                $("#date").val(Stock.strLastUpdate);
                $("#quantity").val(Stock.quantity);
                $('#productselect').val(Stock.productId);
                $("#modal").modal('show');
                $("#mySmallModalLabel").text("Edit Stock");
            }
        })


    }

}

function saveStock() {
    debugger
    var parsleyForm = $('#createStock').parsley();
    parsleyForm.validate();
    if (!parsleyForm.isValid()) {
        $('.parsley-error').each(function () {
            $(this).parents(".form-group").addClass("has-error");
        });
        return false;
    }
    else {
        $(this).parents(".form-group").removeClass('has-error');
    }
    Stock.strLastUpdate = $("#date").val();
    Stock.quantity = $("#quantity").val();
    Stock.productId = $('#productselect option:selected').val()
    Post("/Stock/SaveStock", { stock: Stock }).then(function (d) {
        if (d.success) {
            ClearModel();
            $(".modal").modal('hide');
            $("#stockDatatable").dataTable().fnDestroy();
            LoadTable();
            toastr["success"](d.detail);



        }
        else {
            toastr["error"](d.detail)

        }
    });

}
function LoadTable() {
    $("#stockDatatable").DataTable({
        "ajax": {
            'url': '/Stock/GetAllStock',
            "type": "GET",
            "dataType": 'json',
        },
        "columns": [
            { "data": "productName" },
            { "data": "quantity" },
            { "data": "strLastUpdated" },
            {
                "data": 'id',
                "render": function (data, type, row) {
                    return ' <td><a href="javascript: void(0);" class="mr-3 text-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" onclick = "ShowModal(' + "'" + row.id + "'" + ')"><i class="mdi mdi-pencil font-size-18"></i></a><a href="javascript: void(0);" class="text-danger" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" onclick = "DeleteModal(' + "'" + row.id + "'" + ')"><i class="mdi mdi-close font-size-18"></i></a></td>';
                }
            },
        ]
    });
}
function DeleteModal(id) {
    swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this Stock!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
    }).then(function (isConfirm) {
        debugger
        if (isConfirm) {
            Get('/Stock/DeleteStock?id=' + id).then(function (d) {
                if (d.success) {
                    toastr["success"](d.detail)
                    $("#stockDatatable").dataTable().fnDestroy();
                    LoadTable();
                }
                else
                    toastr["error"](d.detail)
            });
        }

    });
}
$(document).ready(function () {
    //$('#categoryselect').select2({
    //    dropdownParent: $('#modal')
    //});
    LoadTable();
    PreBind();
});