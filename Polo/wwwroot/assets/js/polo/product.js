var Product = {
    id: 0,
    barCode: 0,
    name: "",
    isActive: true,
    description: "",
    price: 0.00,
    categoryId: 0,
    imageUrl: "",
    imageName: "",
    productAttributes:[]
}
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
            toastr["error"](d.detail);
    });
}
function ClearModel() {
    product = {};
    $("#barcode").val("");
    $("#productname").val("");
    $("#productdesc").val("");
    $("#price").val("");
    $('#categoryselect').val("");
    $('input[type=file]').val('');
    document.getElementById("preview").src = 'https://placehold.it/120x80';
    $('.repeat').find('div').remove()
    $('#createProduct').parsley().reset();
    $(".form-group").removeClass('has-error');
}
function ShowModal(Id) {
    debugger
    ClearModel();
    Repeat();
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
                Product.imageUrl = d.data.product.imageUrl;
                Product.imageName = d.data.product.imageName;
                if (Product.imageUrl !== "") {
                    document.getElementById("preview").src = "uploads/" + Product.imageUrl;
                    document.querySelector('input[type="file"]').val = Product.imageName;
                }
                else
                    document.getElementById("preview").src = "https://placehold.it/120x80";
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
function Repeat() {
    debugger
  var length=  $('.repeat .group-a').length
    $('.repeat').append(
        '<div class="group-a" >' +
        '<div  class= "row" >' +
        '<div class="form-group col-lg-3">' +
        '<label for="name">Attribute</label><input type="text" id="attr" name="untyped-input" class="form-control name" />' +
        '</div>' +
        '<div class="form-group col-lg-3">' +
        '<label for="name">Category</label><input type="text" id="catattr" name="untyped-input" class="form-control category" />' +
        '</div>' +
        '<div class="form-groupcol-lg-1">' +
        '<label for="isrequired" class="control-label">IsRequired</label><select class=" form-control select isrequired" id="reqattr"><option value="false" selected>No</option><option value="true">Yes</option></select>' +
        '</div>' +
        '<div class="form-group col-lg-2">' +
        '<label for="priceattr">Price</label><input type="number" id="priceattr" class="form-control price" />' +
        '</div>' +
        '<div class="button-items col-lg-3" style="margin-top:26px">' +
        '<input  type="button" class="btn btn-success mt-3 mt-lg-0 add" value="Add" /><input data-repeater-delete type="button" class="btn btn-danger mt-3 mt-lg-0 delete" value="Delete" />' +
        '</div>' +
        '</div>' +
        '</div > '
    )
}
$(document).on('click', '.add', function () {
    Repeat(); 
})
$(document).on('click', '.delete', function () {
    var length = $('.repeat .group-a').length
    if (length !==1)
    $(this).parent().parent().parent().remove();
})
function saveProduct() {
    debugger
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
    $(".add").each(function (index) {
        var name = $('.name').eq(index).val()
        var price = $('.price').eq(index).val() == "" ? 0 : $('.price').eq(index).val()
        var category = $('.category').eq(index).val()
        var isRequired = $('.isrequired  option:selected').eq(index).val()
        if (name != "") {
            Product.productAttributes.push({
                name: name,
                price: price,
                category: category,
                isRequired: isRequired

            })
        }

    });
    Product.barCode = $("#barcode").val();
    Product.name = $("#productname").val();
    Product.description = $("#productdesc").val();
    Product.price = $("#price").val();
    Product.categoryId = $('#categoryselect option:selected').val()
    var formData = new FormData();
    var file = $(".file")[0].files;
    if (file.length != 0) {
        formData.append(file[0].name, file[0]);
    }
    formData.append("product", JSON.stringify(Product));
    SaveAndUpload("/Product/SaveProduct", formData).then(function (d) {
        debugger
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
$(document).on("click", ".browse", function () {
    var file = $(this)
        .parent()
        .parent()
        .parent()
        .find(".file");
    file.trigger("click");
});
$('input[type="file"]').change(function (e) {
    debugger
    var file = e.target.files[0];
    if (file && file.size) {
        var file1 = file;
        var fileSize = file.size;
        var fileType = (file.name.split('.')[file.name.split('.').length - 1]).toLowerCase();
        var ValidImageTypes = ["gif", "jpg", "png", "jpeg"];
        if ($.inArray(fileType, ValidImageTypes) < 0) {
            //NewuploadMode();
            toastr["error"]("Only images are allowed.");
        }
        else if (fileSize > 1033414) {

            toastr["error"]("Image max size should be 1 MB. Please select again.");
        }
        else {
            var fileName = file.name;
            var FullName = file.name;
            var fileType = file.type;
            if (fileName !== null && fileName != "") {
                if (fileName.length > 20) {
                    fileName = fileName.substring(0, 15) + "...";
                }
            }
            var binaryString = "";
            if (file1) {
                var reader = new FileReader();
                reader.onload = function (readerEvt) {
                    var img = new Image();
                    debugger
                    img.src = readerEvt.target.result;

                    img.onload = function () {
                        var w = this.width;
                        var h = this.height;
                       
                            if (!readerEvt) {
                                binaryString = reader.content;
                            }
                            else {
                                binaryString = reader.result;

                            }
                            document.getElementById("preview").src = readerEvt.target.result;
                            Product.imageUrl=""
                            // binaryString = readerEvt.target.result;
                            //imageList.push({
                            //    // DocId: file1,
                            //    Name: fileName,
                            //    files: file1,
                            //    IsAdd: true,
                            //    fileLink: binaryString,
                            //    fileType: fileType,
                            //    FileName: FullName

                            //});
                        //} else {
                        //    toastr["error"]("Plese select 120x80 Image")
                        //}
                    }

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

});

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
    PreBind();
});