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
    productAttributes: [],
    productItem:[]
}
function PreBind() {
    Get('/Product/PreBind').then(function (d) {
        if (d.success) {
            for (var i = 0; i < d.data.categories.length; i++) {
               var catOption = new Option(d.data.categories[i].name, d.data.categories[i].id, false, false);
                $('#categoryselect').append(catOption).trigger('change');
            }
            for (var i = 0; i < d.data.products.length; i++) {
                var proOption = new Option(d.data.products[i].name, d.data.products[i].id, false, false);
                $('#attrselect').append(proOption).trigger('change');
            }

        }
        else
            toastr["warning"](d.detail);
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
    $('a.nav-link[data-mode="Product"]').addClass('active')
    $('a.nav-link[data-mode="Product Items"]').removeClass('active')
    $('a.nav-link[data-mode="Product Attributes"]').removeClass('active')
    $('div.tab-pane[id="product"]').addClass('active')
    $('div.tab-pane[id="items"]').removeClass('active')
    $('div.tab-pane[id="attributes"]').removeClass('active')
    $('#createProduct').parsley().reset();
    $(".form-group").removeClass('has-error');
}
function ClearAttributeModel() {
    $("#attrselect").val("");
    $("#catattr").val("");
    $("#priceattr").val("");
    $("#reqattr").val("");
}
function ClearItemModel() {
    $("#itemname").val("");
    $("#itemqty").val("");
    $("#measure").val("");
}
function ShowModal(Id) {
    debugger
    ClearModel();
    ClearAttributeModel();
    ClearItemModel();
    $('#tbitem').empty();
    $('#tbatrr').empty();
    if (Id == 0) {
        $("#modal").modal('show');
        $("#myLargeModalLabel").text("Add Product");
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
                if (d.data.product.productAttributes != 0) {
                    Product.productAttributes = d.data.product.productAttributes
                    AppendAttrTable(d.data.product.productAttributes)
                }
                if (d.data.productItem.length != 0) {
                    AppendItemTable(d.data.productItem)
                    Product.productItem = d.data.productItem
                }
                $("#modal").modal('show');
                $("#myLargeModalLabel").text("Edit Product");
            }
        })


    }

}

$(document).on('change', '.name', function (evt) {
    debugger
    if ($('.name').val() !== "" || $('.category').val() !== "" || $('.isrequired').val() !== "") {
        $(".validationattr").text("");
    }
})
$(document).on('change', '.category', function (evt) {
    debugger
    if ($('.name').val() !== "" || $('.category').val() !== "" || $('.isrequired').val() !== "") {
        $(".validationattr").text("");
    }
})
$(document).on('change', '.isrequired', function (evt) {
    debugger
    if ($('.name').val() !== "" || $('.category').val() !== "" || $('.isrequired').val() !== "") {
        $(".validationattr").text("");
    }
})
$(document).on('click', '.addattr', function (evt) {
    debugger
    var attrId = $('.attrid').val() == "" ? 0 : $('.attrid').val()
    var name = $('.name').val()
    var attrText = $('.name option:selected').text()
    var price = $('.price').val() == "" ? 0 : $('.price').val()
    var category = $('.category').val()
    var isRequired = $('.isrequired  option:selected').val()
    var isRequiredText = $('.isrequired  option:selected').text()
    if (name == "" || category == "" || isRequired=="") {
        $(".validationattr").text("Please Fill All Fields");
    }
    else {
        $(".validationattr").text("");
                Product.productAttributes.push({
                    id: attrId,
                    parentProductId: name,
                    price: price,
                    category: category,
                    isRequired: isRequired,
                    attrText: attrText,
                    isRequiredText: isRequiredText
                })
        ClearAttributeModel();
        $('#tbatrr').empty();
        AppendAttrTable(Product.productAttributes);
    } 
})
$(document).on('click', '.deleteattr', function () {
    debugger
    var index = $(this).data('index');
    Product.productAttributes = Product.productAttributes.filter(function (el, i) { return i != index; });
    $('#tbatrr').empty();
    if (Product.productAttributes.length != 0)
        AppendAttrTable(Product.productAttributes);
});
$(document).on('click', '.editattr', function () {
    var index = $(this).data('index')
    debugger
    var foundItem = Product.productAttributes.filter(function (el, i) { return i == index; });
    ClearAttributeModel();
    Product.productAttributes = Product.productAttributes.filter(function (el, i) { return i != index; });
    $('.attrid').val(foundItem[0].id)
    $('.name').val(foundItem[0].parentProductId);
    /* $('.product').trigger('change');*/
    $('.price').val(foundItem[0].price)
    $('.category').val(foundItem[0].category);
    $('.isrequired ').val(foundItem[0].isRequired.toString());
    /*$('.measure').trigger('change');*/
    $('#tbatrr').empty();
    if (Product.productAttributes.length != 0)
        AppendAttrTable(Product.productAttributes);
});
function AppendAttrTable(data) {
    $.each(data, function (i, x) {
        $('#tbatrr').append(
            '<tr id="' + i + '">' +
            '<td class="text-sm-left">' + x.attrText + '</td>' +
            '<td class="text-sm-left">' + x.category + '</td>' +
            '<td class="text-sm-left">' + x.isRequiredText + '</td>' +
            '<td class="text-sm-right">' + x.price + '</td>' +
            ' <td class="text-sm-right"><a href="javascript: void(0);" class="mr-3 text-primary editattr" data-toggle="tooltip" data-placement="top" title="" data-index="' + i + '" data-original-title="Edit"><i class="mdi mdi-pencil font-size-18"></i></a><a href="javascript: void(0);" class="text-danger deleteattr" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" data-index="' + i + '"><i class="mdi mdi-close font-size-18"></i></a></td>' +
            '</tr>'
        )
    });
}
function AppendItemTable(data) {
    $.each(data, function (i, x) {
        debugger
        if (x.isDeleted == false)
        { 
            $('#tbitem').append(
                '<tr id="' + i + '">' +
                '<td class="text-sm-left">' + x.name + '</td>' +
                '<td class="text-sm-left">' + x.qty + '</td>' +
                '<td class="text-sm-left">' + x.measureQty + '</td>' +
                ' <td class="text-sm-right"><a href="javascript: void(0);" class="mr-3 text-primary edititem" data-toggle="tooltip" data-placement="top" title="" data-index="' + i + '" data-original-title="Edit"><i class="mdi mdi-pencil font-size-18"></i></a><a href="javascript: void(0);" class="text-danger deleteitem" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" data-index="' + i + '"><i class="mdi mdi-close font-size-18"></i></a></td>' +
                '</tr>'
            )
        }
    });
}
$(document).on('click', '.additem', function (evt) {
    if ($('.itemsname').val() == "" || $('.itemsqty').val() == "" || $('.itemsmeasure').val() == "") {
        $(".validationitem").text("Please fill the data.");
    }
    else {
        $(".validationitem").text("");
        var itemId = $('.itemsid').val() == "" ? 0 : $('.itemsid').val()
        var itemName = $('.itemsname').val()
        var qty = $('.itemsqty').val() == "" ? 0.00 : $('.itemsqty').val()
        var measure = $('.itemsmeasure  option:selected').val()
        Product.productItem.push({
            id: itemId,
            name: itemName,
            qty: qty,
            measureQty: measure,
            isActive: true,
            isDeleted: false
        });
        $('#tbitem').empty();
        ClearItemModel();
        AppendItemTable(Product.productItem)
    }
})

$(document).on('change', '.itemsname', function (evt) {
    if ($('.itemsname').val() != "" || $('.itemsqty').val() != "" || $('.itemsmeasure').val() != "") {
        $(".validationitem").text("");
    }
})
$(document).on('change', '.itemsqty', function (evt) {
    if ($('.itemsname').val() != "" || $('.itemsqty').val() != "" || $('.itemsmeasure').val() != "") {
        $(".validationitem").text("");
    }
})
$(document).on('change', '.itemsmeasure', function (evt) {
    if ($('.itemsname').val() != "" || $('.itemsqty').val() != "" || $('.itemsmeasure').val() != "") {
        $(".validationitem").text("");
    }
})
$(document).on('click', '.deleteitem', function () {
    debugger
    var index = $(this).data('index');
    Product.productItem[index].isDeleted = true

    Product.productItem = Product.productItem.filter(function (el, i) { return i != index; });
    $('#tbitem').empty();
    if (Product.productItem.length != 0)
        AppendTable(Product.productItem);
})
$(document).on('click', '.edititem', function () {
    var index = $(this).data('index')
    debugger
    var foundItem = Product.productItem.filter(function (el, i) { return i == index; });
    ClearItemModel();
    $('.itemsid').val(foundItem[0].id)
    $('.itemsname').val(foundItem[0].name);
    /* $('.product').trigger('change');*/
    $('.itemsqty').val(foundItem[0].qty)
    $('.itemsmeasure').val(foundItem[0].measureQty);
    Product.productItem = Product.productItem.filter(function (el, i) { return i != index; });
    $('#tbitem').empty();
    if (Product.productItem.length != 0)
        AppendTable(Product.productItem);
    
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
            toastr["warning"](d.detail)
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
                    }
                };
                reader.readAsDataURL(file1);
            }
        }
    }
});
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
            {
                "data": "price",
                render: function (data, type, row) {
                    return Number(data).toFixed(2)
                }
            },
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
    LoadTable();
    PreBind();
});