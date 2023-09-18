var purchase = {
    id: 0,
    supplierId: 0,
    discount: 0.00,
    subTotal: 0.00,
    tax: 0.00,
    total: 0.00,
    invoiceNo: "",
    purchaseItem: [],
    deleteIds: []
}
function PreBindPurchase() {
    Get('/Purchase/PreBindPurchase').then(function (d) {
        if (d.success) {
            debugger
            $('#invoiceno').val(Math.random().toString(6).substring(2, 8))
            for (var i = 0; i < d.data.supplier.length; i++) {
                var newOption = new Option(d.data.supplier[i].name, d.data.supplier[i].id, false, false);
                $('#suppliername').append(newOption).trigger('change');
            }
            ClearPurchaseItem();
            for (var i = 0; i < d.data.productItem.length; i++) {
                var newItem = new Option(d.data.productItem[i].name, d.data.productItem[i].name, false, false);
                $('#item').append(newItem).trigger('change');
            }
        }
        else
            toastr["warning"](d.detail);
    });
}
$(document).ready(function () {
    LoadPurchaseTable();
})
$(document).on('change', '.product', function (evt) {
    var itemName = $('.product option:selected').val()
    var qty = $('.quantity').val() == "" ? 0.00 : Number($('.quantity').val()).toFixed(2)
    var price = $('.price').val() == "" ? 0.00 : Number($('.price').val()).toFixed(2)
    var measure = $('.measure option:selected').val();
    if (qty !== 0.00 && price !== 0.00 && itemName !== "" && measure !== "") {
        $(".validationpurchase").text("");
    }
})
$(document).on('change', '.measure', function (evt) {
    var itemName = $('.product option:selected').val()
    var qty = $('.quantity').val() == "" ? 0.00 : Number($('.quantity').val()).toFixed(2)
    var price = $('.price').val() == "" ? 0.00 : Number($('.price').val()).toFixed(2)
    var measure = $('.measure option:selected').val();
    if (qty !== 0.00 && price !== 0.00 && itemName !== "" && measure !== "") {
        $(".validationpurchase").text("");
    }
})
$(document).on('change', '.quantity', function (evt) {
    debugger
    var itemName = $('.product option:selected').val()
    var qty = $('.quantity').val() == "" ? 0.00 : Number($('.quantity').val()).toFixed(2)
    var price = $('.price').val() == "" ? 0.00 : Number($('.price').val()).toFixed(2)
    var measure = $('.measure option:selected').val();
    if (qty !== 0.00 && price !== 0.00 && itemName !== "" && measure !== "") {
        $(".validationpurchase").text("");
        var total = Number(qty * price).toFixed(2)
        $('.itemtotal').val(total)
    }
})
$(document).on('change', '.price', function (evt) {
    debugger
    var itemName = $('.product option:selected').val()
    var qty = $('.quantity').val() == "" ? 0.00 : Number($('.quantity').val()).toFixed(2)
    var price = $('.price').val() == "" ? 0.00 : Number($('.price').val()).toFixed(2)
    var measure = $('.measure option:selected').val();
    if (qty !== 0.00 && price !== 0.00 && itemName !== "" && measure !== "") {
        $(".validationpurchase").text("");
        var total = Number(qty * price).toFixed(2)
        $('.itemtotal').val(total)
    }
})
$(document).on('click', '.additem', function (evt) {
    debugger
    var itemId = $('.itemsid').val() == "" ? 0 : $('.itemsid').val()
    var itemName = $('.product option:selected').val()
    var qty = $('.quantity').val() == "" ? 0.00 : Number($('.quantity').val()).toFixed(2)
    var measure = $('.measure option:selected').val();
    var price = $('.price').val() == "" ? 0.00 : Number($('.price').val()).toFixed(2)
    var total = $('.itemtotal').val() == "" ? 0.00 : Number($('.itemtotal').val()).toFixed(2)
    if (qty == 0.00 && price == 0.00 && itemName == "" && measure=="") {
        $(".validationpurchase").text("Please Enter All Fields.");
    }
    else {
        if (purchase.purchaseItem!=0 && purchase.purchaseItem.find(x => x.name == itemName)) {
            toastr["warning"]("Item Already Exist");
            $(".validationpurchase").text("");
            ClearPurchaseItem();
        }
        else {
            $(".validationpurchase").text("");
            purchase.purchaseItem.push({
                id: itemId,
                name: itemName,
                qty: qty,
                measureQty: measure,
                price: price,
                total: total,
                isActive: true,
                isDeleted: false
            })
            sub = 0;
            tax = 0;
            total = 0;
            discount = 0;
            var value = $('.disc').val() == "" ? 0 : parseInt($('.disc').val())
            $('.tax').val("")
            $('.subtotal').val("")
            $('.total').val("")
            for (let x of purchase.purchaseItem) {
                sub += parseInt(x.total);
            }
            if (value != 0) {
                discount = ((value / 100) * sub);
                sub = sub - discount;
            }
            tax = sub / 10;
            total = sub + tax;
            $('.tax').val(Number(tax).toFixed(2))
            $('.subtotal').val(Number(sub).toFixed(2))
            $('.total').val(Number(total).toFixed(2))
            ClearPurchaseItem();
            $('#tbdata').empty();
            AppendTable(purchase.purchaseItem);
        }
    }
})
$(document).on('change', '#suppliername', function () {
    var id = $('#suppliername option:selected').val()
    if (id != "") {
        Get("/Supplier/GetSupplierById?id=" + id).then(function (d) {
            debugger
            if (d.success) {
                $('#cname').val(d.data.supplier.companyName)
                $('#snumber').val(d.data.supplier.number)
                $('.address').val(d.data.supplier.address)
            }
        });
    }
});
function AppendTable(data) {
    $.each(data, function (i, x) {
        $('#tbdata').append(
            '<tr id="' + i + '">' +
            '<td class="text-sm-left">' + x.name + '</td>' +
            '<td class="text-sm-right">' + x.qty + '</td>' +
            '<td class="text-sm-right">' + x.measureQty + '</td>' +
            '<td class="text-sm-right">' + x.price + '</td>' +
            '<td class="text-sm-right">' + x.total + '</td>' +
            ' <td class="text-sm-right"><a href="javascript: void(0);" class="mr-3 text-primary edit" data-toggle="tooltip" data-placement="top" title="" data-index="' + i + '" data-original-title="Edit"><i class="mdi mdi-pencil font-size-18"></i></a><a href="javascript: void(0);" class="text-danger delete" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" data-index="' + i + '"><i class="mdi mdi-close font-size-18"></i></a></td>' +
            '</tr>'
        )
    });
}
$(document).on('click', '.submit', function () {
    purchase.supplierId = $('#suppliername option:selected').val()
    if (purchase.supplierId == "")
        toastr["warning"]("Please Select Supplier");
    else if (purchase.purchaseItem.length == 0)
        toastr["warning"]("Please Enter Purchase Item");
    else {
        purchase.invoiceNo = $('#invoiceno').val();
        purchase.subTotal = $('.subtotal').val();
        purchase.discount = $('.disc').val() == "" ? 0.00 : Number($('.disc').val()).toFixed(2);
        purchase.tax = $('.tax').val();
        purchase.total = $('.total').val()
        debugger
        Post("/Purchase/SavePurchase", { purchase: purchase }).then(function (d) {
            debugger;
            if (d.success) {
                ClearPurchaseItem();
                ClearPurchase();
                $('#create').hide();
                $('#index').show();
                $('#tbdata').empty();
                $("#purchaseDatatable").dataTable().fnDestroy();
                LoadPurchaseTable();
                toastr["success"]("Purchase is Successfully Created");
            } else {
                toastr["warning"](d.detail);
            }
        });
    }
});
$(document).on('click', '.delete', function () {
    debugger
    var index = $(this).data('index');
    var deltelist = {}
    var foundItem = purchase.purchaseItem.filter(function (el, i) { return i == index; });
    if (purchase.deleteIds == null) {
        purchase.deleteIds = []
        deltelist = foundItem[0].id
        purchase.deleteIds.push(deltelist)
    }
    else {
        var length = purchase.deleteIds.length
        deltelist = foundItem[0].id
        purchase.deleteIds.push(deltelist)
    }
    purchase.purchaseItem = purchase.purchaseItem.filter(function (el, i) { return i != index; });
    sub = 0;
    tax = 0;
    total = 0;
    discount = 0;
    var value = $('.disc').val() == "" ? 0 : parseInt($('.disc').val())
    $('.tax').val("")
    $('.subtotal').val("")
    $('.total').val("")
    for (let x of purchase.purchaseItem) {
        sub += parseInt(x.total);
    }
    if (value != 0) {
        discount = ((value / 100) * sub);
        sub = sub - discount;
    }
    tax = sub / 10;
    total = sub + tax;
    $('.tax').val(Number(tax).toFixed(2))
    $('.subtotal').val(Number(sub).toFixed(2))
    $('.total').val(Number(total).toFixed(2))
    $('#tbdata').empty();
    if (purchase.purchaseItem.length != 0)
        AppendTable(purchase.purchaseItem);
});
$(document).on('click', '.edit', function () {
    var index = $(this).data('index')
    debugger
    var foundItem = purchase.purchaseItem.filter(function (el, i) { return i == index; });
    ClearPurchaseItem();
    purchase.purchaseItem = purchase.purchaseItem.filter(function (el, i) { return i != index; });
    $('.itemsid').val(foundItem[0].id)
    $('.product').val(foundItem[0].name);
    $('.product').trigger('change');
    $('.quantity').val(foundItem[0].qty)
    $('.measure').val(foundItem[0].measureQty);
    $('.measure').trigger('change');
    $('.price').val(foundItem[0].price)
    $('.itemtotal').val(foundItem[0].total)
    sub = 0;
    tax = 0;
    total = 0;
    discount = 0;
    var value = $('.disc').val() == "" ? 0 : parseInt($('.disc').val())
    $('.tax').val("")
    $('.subtotal').val("")
    $('.total').val("")
    for (let x of purchase.purchaseItem) {
        sub += parseInt(x.total);
    }
    if (value != 0) {
        discount = ((value / 100) * sub);
        sub = sub - discount;
    }
    tax = sub / 10;
    total = sub + tax;
    $('.tax').val(Number(tax).toFixed(2))
    $('.subtotal').val(Number(sub).toFixed(2))
    $('.total').val(Number(total).toFixed(2))
    $('#tbdata').empty();
    if (purchase.purchaseItem.length != 0)
        AppendTable(purchase.purchaseItem);
});
$(document).on('change', '.disc', function () {
    if (purchase.purchaseItem.length != 0) {
        sub = 0;
        tax = 0;
        total = 0;
        discount = 0;
        var value = parseInt($('.disc').val())
        $('.tax').val("")
        $('.subtotal').val("")
        $('.total').val("")
        for (let x of purchase.purchaseItem) {
            sub += parseInt(x.total);
        }
        discount = ((value / 100) * sub);
        sub = sub - discount;
        tax = sub / 10;
        total = sub + tax;
        $('.tax').val(Number(tax).toFixed(2))
        $('.subtotal').val(Number(sub).toFixed(2))
        $('.total').val(Number(total).toFixed(2))
    }
    else
        toastr["warning"]("please Enter product");
});
function ClearPurchaseItem() {
    $('.itemsid').val("")
    $('#item').val(null).trigger('change');
    $('#itemmeasure').val(null).trigger('change');
    $('.quantity').val("");
    $('.price').val("")
    $('.itemtotal').val("");
}
function ClearPurchase() {
    $('.tax').val("")
    $('.subtotal').val("")
    $('.total').val("")
    $('.disc').val("")
    $('#suppliername').val(null).trigger('change');
    $('#invoiceno').val(Math.random().toString(6).substring(2, 8));
    $('#cname').val("");
    $('#snumber').val("");
    $('#address').val("");
    Purchase = {}
}
    function LoadPurchaseTable() {
        $("#purchaseDatatable").DataTable({
            "ajax": {
                'url': '/Purchase/GetAllPurchase',
                "type": "GET",
                "dataType": 'json',
            },
            "columns": [
                { "data": "invoiceNo" },
                { "data": "name" },
                { "data": "subTotal" },
                { "data": "tax" },
                { "data": "total" },
                {
                    "data": 'id',
                    "render": function (data, type, row) {
                        return ' <td><a href="javascript: void(0);" class="mr-3 text-primary editpurchase" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" data-id="'+ row.id+'"><i class="mdi mdi-pencil font-size-18"></i></a><a href="javascript: void(0);" class="text-danger" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" onclick = "DeletePurchase(' + "'" + row.id + "'" + ')"><i class="mdi mdi-close font-size-18"></i></a></td>';
                    }
                },
            ]
        });
}
$(document).on('click', '.editpurchase', function () {
    var id = $(this).data('id')
    PreBindPurchase();
    Get("/Purchase/GetPurchaseById?id=" + id).then(function (d) {
        debugger
        if (d.success) {
            $("#index").hide();
            $('#index').data('index', 1)
            $('#create').show();
            $('#create').data('index', 0)
            $('.disc').val(d.data.purchase.discount)
            $('.tax').val(Number(d.data.purchase.tax).toFixed(2))
            $('.subtotal').val(Number(d.data.purchase.subTotal).toFixed(2))
            $('.total').val(Number(d.data.purchase.total).toFixed(2))
           // $("#suppliername option[value='" + d.data.purchase.supplierId + "']").attr("selected");
            //$('#suppliername option:selected').val(d.data.purchase.supplierId)
            purchase = d.data.purchase
            $('.selectname').val(d.data.purchase.supplierId);
            $('.selectname').select2();
            $('#itemmeasure').select2();
            $('#item').select2();
            $('.selectname').trigger('change');
            $('#invoiceno').val(d.data.purchase.invoiceNo)
            $('#tbdata').empty();
            if (d.data.purchase.purchaseItem.length != 0)
                AppendTable(d.data.purchase.purchaseItem);
        }
    });
})
function ShowDiv() {
    debugger
    $('#index').hide();
    $('#index').data('index', 1)
    $('#create').show();
    $('#create').data('index', 0)
    $('#tbdata').empty();
    PreBindPurchase();
    $('.selectname').select2();
    $('#itemmeasure').select2();
    $('#item').select2();
}
window.onpopstate = function () {
    debugger
    if ($('#create').data('index') == "0") {
        $('#create').hide();
        $('#create').data('index', 1)
        $('#index').show();
        $('#index').data('index', 0)
    }
    else
        window.location.href = "/";
}; history.pushState({}, '');
    function DeletePurchase(id) {
        swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this purchase!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
        }).then(function (isConfirm) {
            debugger
            if (isConfirm) {
                Get('/Purchase/DeletePurchase?id=' + id).then(function (d) {
                    if (d.success) {
                        toastr["success"](d.detail)
                        $("#purchaseDatatable").dataTable().fnDestroy();
                        LoadPurchaseTable()
                    }
                    else
                        toastr["warning"](d.detail)
                });
            }

        });
        }