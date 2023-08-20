var Product = {
    id: 0,
    barCode: 0,
    name: "",
    isActive: true,
    description: "",
    price: 0.00,
    categoryId: 0,
    productImages: [],
}
var imageList = [];
function PreBind() {
    Get('/Product/PreBind').then(function (d) {
        if (d.success) {
            debugger
            var newOption;
            for (var i = 0; i < d.data.categories.length; i++) {
                newOption = new Option(d.data.categories[i].name, d.data.categories[i].id, false, false);
                $('#categoryselect').append(newOption).trigger('change');
            }

        }
        else
            showToast(d.detail);
    });
}
function ClearModel() {
    $("#barcode").val("");
    $("#productname").val("");
    $("#productdesc").val("");
    $("#price").val("");
    $('#categoryselect').val("");
    $('input[type=file]').val('');
    $("#imagePreview").empty();
}
function ShowModal(Id) {
    ClearModel();
    PreBind();
    if (Id == 0) {
        $("#modal").modal('show');
        $("#myLargeModalLabel").text("Add Product");
            /*$('.select').select2()*/;
    }
    else {
        Get("/Product/GetProductById?id=" + Id).then(function (d) {
            debugger
            if (d.success) {
                Product.barCode = d.data.product.barCode;
                Product.id = d.data.product.id;
                Product.name = d.data.product.name;
                Product.categoryId = d.data.product.categoryId;
                Product.description = d.data.product.description;
                Product.price = d.data.product.price;
                imageList = d.data.productImages;
                for (var i = 0; i < d.data.productImages.length; i++) {
                    $('#imagePreview').append('<img src="uploads/' + d.data.productImages[i].url + '" alt="Image Preview">');
                    const fileInput = document.querySelector('input[type="file"]');
                    const myFile = new File(['Hello World!'], d.data.productImages[i].name, {
                        type: 'text/plain',
                        lastModified: new Date(),
                    });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(myFile);
                    fileInput.files = dataTransfer.files;
                }
                $("#barcode").val(Product.barCode);
                $("#productname").val(Product.name);
                $("#productdesc").val(Product.description);
                $("#price").val(Product.price);
                $('#categoryselect').val(Product.categoryId);
                $("#modal").modal('show');
                $("#myLargeModalLabel").text("Edit Product");
            }
        })


    }

}

function saveProduct() {
    var parsleyForm = $('#createProduct').parsley();
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
    Product.barCode = $("#barcode").val();
    Product.name = $("#productname").val();
    Product.description = $("#productdesc").val();
    Product.price = $("#price").val();
    Product.categoryId = $('#categoryselect option:selected').val()
    var formData = new FormData();
    if (imageList.length > 0) {
        $.each(imageList, function (x, key) {
            if (Product.productImages == null || Product.productImages == undefined) {
                Product.productImages = [];

            }
            if (imageList[x].IsAdd) {
                formData.append(imageList[x].files.name, imageList[x].files);
                Product.productImages.push({
                    Name: imageList[x].Name, IsAdd: imageList[x].IsAdd
                })

            }
            else {
                Product.productImages.push({
                    Name: imageList[x].Name, IsAdd: imageList[x].IsAdd, Url: imageList[x].Url
                })
            }

        });
    }
    formData.append("product", JSON.stringify(Product));
    SaveAndUpload("/Product/SaveProduct", formData).then(function (d) {
        if (d.success) {
            ClearModel();
            $(".modal").modal('hide');
            $("#productsDatatable").dataTable().fnDestroy();
            LoadTable();
            toastr["success"](d.detail);



        }
        else {
            toastr["error"](d.detail)

        }
    });

}
function addFiles() {
    debugger
    var file = $("#imageInput")[0].files;
    if (file && file.length) {
        var file1 = file[0];
        var fileSize = file[0].size;
        var fileType = (file[0].name.split('.')[file[0].name.split('.').length - 1]).toLowerCase();
        var ValidImageTypes = ["gif", "jpg", "png"];
        if ($.inArray(fileType, ValidImageTypes) < 0) {
            //NewuploadMode();
            toastr["error"]("Only images are allowed.");
        }
        else if (fileSize > 1033414) {

            toastr["error"]("Image max size should be 1 MB. Please select again.");
        }
        else {
            var fileName = file[0].name;
            var FullName = file[0].name;
            var fileType = file[0].type;
            if (fileName !== null && fileName != "") {
                if (fileName.length > 20) {
                    fileName = fileName.substring(0, 15) + "...";
                }
            }
            var binaryString = "";
            if (file1) {
                var reader = new FileReader();
                reader.onload = function (readerEvt) {
                    if (!readerEvt) {
                        binaryString = reader.content;
                    }
                    else {
                        binaryString = reader.result;

                    }
                    $('#imagePreview').append('<img src="' + readerEvt.target.result + '" alt="Image Preview">')
                    // binaryString = readerEvt.target.result;
                    imageList.push({
                        // DocId: file1,
                        Name: fileName,
                        files: file1,
                        IsAdd: true,
                        fileLink: binaryString,
                        fileType: fileType,
                        FileName: FullName

                    });
                    //$scope.$apply();
                    //uploadMode();
                };



                reader.readAsDataURL(file1);

                //reader.readAsBinaryString(file1);
            }
        }

        //$("#fileUploaders")[0].value = '';
        //uploadMode();

    }

}
/*var table = $('#productsDatatable').DataTable();*/
function LoadTable() {
    $("#productsDatatable").DataTable({
        "ajax": {
            'url': '/Product/GetAllProduct',
            "type": "GET",
            "dataType": 'json',
        },
        "columns": [
            { "data": "barCode" },
            { "data": "name" },
            { "data": "categoryName" },
            { "data": "price" },
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
        text: "You will not be able to recover this product!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
    }).then(function(isConfirm) {
        debugger
        if (isConfirm) {
            Get('/Product/DeleteProduct?id=' + id).then(function (d) {
                if (d.success) {
                    toastr["success"](d.detail)
                    $("#productsDatatable").dataTable().fnDestroy();
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
});