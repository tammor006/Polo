var Category = {
    id: 0,
    name: "",
    isActive: true,
}
function ClearModel() {
    $("#categoryname").val("");
    $("#isActive").prop("checked", true);
    $('#createCategory').parsley().reset();
    $(".form-group").removeClass('has-error');
}
function ShowModal(Id) {
    debugger;
    ClearModel();
    if (Id == 0) {
        $("#modal").modal('show');
        $("#mySmallModalLabel").text("Add Category");
    }
    else {
        Get("/Categories/GetCategoryById?id=" + Id).then(function (d) {
            debugger
            if (d.success) {
                Category.id = d.data.category.id;
                Category.name = d.data.category.name;
                Category.isActive = d.data.category.isActive;
                $("#categoryname").val(Category.name);
                if (Category.isActive) {
                    $("#isActive").prop("checked", Category.isActive);
                }
                else {
                    $("#isActive").val(Category.isActive);
                }
                $("#modal").modal('show');
                $("#mySmallModalLabel").text("Edit Category");
            }
        })
    }

}

function saveCategory() {
    debugger;
    var parsleyForm = $('#createCategory').parsley();
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
    Category.name = $("#categoryname").val();
    Category.isActive = $("#isActive").is(":checked")
    Post("/Categories/SaveCategory", { categories: Category }).then(function (d) {
        debugger;
        if (d.success) {
            ClearModel();
            $(".modal").modal('hide');
            $("#categoriesDatatable").dataTable().fnDestroy();
            LoadTable();
            toastr["success"](d.detail);
        }
        else {
            toastr["error"](d.detail)

        }
    });

}
function LoadTable() {
    $("#categoriesDatatable").DataTable({
        'ajax': {
            'url': '/Categories/GetAllCategories',
            "type": "GET",
            "dataType": 'json',
        },
        "columns": [
            { "data": "name" },
            {
                "data": "isActive",
                "render": function (data, type, row) {
                    if (data) {
                        return '<span class="badge badge-pill badge-soft-success font-size-12">Active</span>'
                    }
                    else {
                        return '<span class="badge badge-pill badge-soft-danger font-size-12">InActive</span>'
                    }
                }
            },
            {
                "data": 'id',
                "render": function (data, type, row) {
                    return '<td>' +
                        '<a href="javascript:void(0);" class="mr-3 text-primary" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" onclick="ShowModal(' + "'" + row.id + "'" + ')">' +
                        '<i class="mdi mdi-pencil font-size-18"></i>' +
                        '</a>' +
                        '<a href="javascript:void(0);" class="text-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" onclick="DeleteModal(' + "'" + row.id + "'" + ')">' +
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
        text: "You will not be able to recover this categoty!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
    }).then(function (isConfirm) {
        debugger
        if (isConfirm) {
            Get('/Categories/DeleteCategory?id=' + id).then(function (d) {
                if (d.success) {
                    toastr["success"](d.detail)
                    $("#categoriesDatatable").dataTable().fnDestroy();
                    LoadTable();
                }
                else
                    toastr["error"](d.detail)
            });
        }

    });
}
$(document).ready(function () {
    LoadTable();
});