var Supplier = {
    id: 0,
    name: "",
    fatherName: "",
    cnic: "",
    city: "",
    country: "",
    number: "",
    email: "",
    companyName: "",
    companyNumber: "",
    address: "",
    isActive: true,
};

function ClearModel() {
    $("#supplierName").val("");
    $("#fatherName").val("");
    $("#cnic").val("");
    $("#city").val("");
    $("#country").val("");
    $("#number").val("");
    $("#email").val("");
    $("#companyName").val("");
    $("#companyNumber").val("");
    $("#address").val("");
    $("#isActive").prop("checked", true);
    $('#createSupplier').parsley().reset();
    $(".form-group").removeClass('has-error');
}

function ShowModal(Id) {
    debugger;
    ClearModel();
    if (Id == 0) {
        $("#modal").modal('show');
        $("#myLargeModalLabel").text("Add Supplier");
    }
    else {
        Get("/Supplier/GetSupplierById?id=" + Id).then(function (d) {
            debugger
            if (d.success) {
                Supplier.id = d.data.supplier.id;
                Supplier.name = d.data.supplier.name;
                Supplier.fatherName = d.data.supplier.fatherName;
                Supplier.cnic = d.data.supplier.cnic;
                Supplier.city = d.data.supplier.city;
                Supplier.country = d.data.supplier.country;
                Supplier.number = d.data.supplier.number;
                Supplier.email = d.data.supplier.email;
                Supplier.companyName = d.data.supplier.companyName;
                Supplier.companyNumber = d.data.supplier.companyNumber;
                Supplier.address = d.data.supplier.address;
                Supplier.isActive = d.data.supplier.isActive;

                $("#supplierName").val(Supplier.name);
                $("#fatherName").val(Supplier.fatherName);
                $("#cnic").val(Supplier.cnic);
                $("#city").val(Supplier.city);
                $("#country").val(Supplier.country);
                $("#number").val(Supplier.number);
                $("#email").val(Supplier.email);
                $("#companyName").val(Supplier.companyName);
                $("#companyNumber").val(Supplier.companyNumber);
                $("#address").val(Supplier.address);

                if (Supplier.isActive) {
                    $("#isActive").prop("checked", true);
                } else {
                    $("#isActive").prop("checked", false);
                }

                $("#modal").modal('show');
                $("#myLargeModalLabel").text("Edit Supplier");
            }
        });
    }
}


function saveSupplier() {
    debugger;
    var parsleyForm = $('#createSupplier').parsley();
    parsleyForm.validate();
    if (!parsleyForm.isValid()) {
        $('.parsley-error').each(function () {
            $(this).parents(".form-group").addClass("has-error");
        });
        return false;
    } else {
        $(this).parents(".form-group").removeClass('has-error');
    }

    Supplier.name = $("#supplierName").val();
    Supplier.fatherName = $("#fatherName").val();
    Supplier.cnic = $("#cnic").val();
    Supplier.city = $("#city").val();
    Supplier.country = $("#country").val();
    Supplier.number = $("#number").val();
    Supplier.email = $("#email").val();
    Supplier.companyName = $("#companyName").val();
    Supplier.companyNumber = $("#companyNumber").val();
    Supplier.address = $("#address").val();
    Supplier.isActive = $("#isActive").is(":checked");
    Post("/Supplier/SaveSupplier", { supplier: Supplier }).then(function (d) {
        debugger;
        if (d.success) {
            ClearModel();
            $(".modal").modal('hide');
            $("#suppliersDatatable").dataTable().fnDestroy();
            LoadTable();
            toastr["success"](d.detail);
        } else {
            toastr["warning"](d.detail);
        }
    });
}

function LoadTable() {
    $("#suppliersDatatable").DataTable({
        'ajax': {
            'url': '/Supplier/GetAllSupplier',
            "type": "GET",
            "dataType": 'json',
        },
        "columns": [
            { "data": "name" },
            { "data": "city" },
            { "data": "number" },
            { "data": "email" },
            { "data": "companyName" },
            { "data": "companyNumber" },
            {
                "data": "id",
                "render": function (data, type, row) {
                    return '<td>' +
                        '<a href="javascript:void(0);" class="mr-3 text-primary" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" onclick="ShowModal(' + row.id + ')">' +
                        '<i class="mdi mdi-pencil font-size-18"></i>' +
                        '</a>' +
                        '<a href="javascript:void(0);" class="text-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" onclick="DeleteModal(' + row.id + ')">' +
                        '<i class="mdi mdi-close font-size-18"></i>' +
                        '</a>' +
                        '</td>';
                }
            },
        ]
    });
}

function DeleteModal(id) {
    swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this supplier!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
    }).then(function (isConfirm) {
        debugger;
        if (isConfirm) {
            Get('/Supplier/DeleteSupplier?id=' + id).then(function (d) {
                if (d.success) {
                    toastr["success"](d.detail);
                    $("#suppliersDatatable").dataTable().fnDestroy();
                    LoadTable();
                } else {
                    toastr["warning"](d.detail);
                }
            });
        }
    });
}

$(document).ready(function () {
    LoadTable();
});