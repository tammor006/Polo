var menu = {
    id: 0,
    name: "",
    price: 0,
    qty: 0,
    total:0
}
var product = {
    productId: 0,
    quantity: 0,
    name: "",
    price: 0,
    categories: []

}
var categoryList = {
    name: "",
    attrList:[]
}
var productList=[]
var productAttributesList=[]
var productAttributes = {
    productAttributesId: 0,
    Category: "",
    name: "",
    price: 0,
    productId:0
}
let sub = 0;
let tax = 0;
let total = 0;
let discount = 0;
var Customer = {
    id: 0,
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    address: "",
    number: "",
    email: "",
    paymentType: "",
};
var orders = {
    id: 0,
    mode: "",
    discount: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    customerId:0,
    invoiceNumber: 0,
    deliveryType: "",
    StrAvailableTime: "",
    paymentType: "",
    saleOrderItem:[]
}
function ClearOrder() {
    Customer.id = 0;
    Customer.name = "";
    Customer.address = "";
    Customer.number = "";
    Customer.email="",
    $("#number").val("");
    $("#name").val("");
    $("#address").val("")
    $("#email").val("")
    $('#paymenttype').val("");
    $('#deliverytype').val("");
    $('#availabletime').val("")
    $('#availabletime').hide();
}
$(function () {
    $('[data-toggle="popover"]').popover({
       
    });
});
function save() {
    orders.paymentType = $('#paymenttype option:selected').val()
    orders.deliveryType = $('#deliverytype option:selected').val()
    orders.strAvailableTime = $('#availabletime').val();
    if (Customer.id == 0) 
        toastr["error"]("Please Add Customer")
    else if (orders.deliveryType == "")
        toastr["error"]("Please Add Delivery Type")
    else if (orders.paymentType == "") 
        toastr["error"]("Please Add Payment Type")
    else {
        debugger
        orders.total = $("#total").val();
        orders.subTotal = $("#subtotal").val();
        orders.tax = $("#tax").val();
        orders.discount = discount;
        orders.customerId = Customer.id;
        var c = $("a.nav-link.active").eq(0).data('mode')
        orders.mode = c
        orders.invoiceNumber = parseInt(1 + Math.floor(Math.random() * 6))
        orders.saleOrderItem = []
        for (let i = 0; i < productList.length; i++) {
            orders.saleOrderItem.push({
                productId: productList[i].productId,
                quantity: productList[i].quantity,
                total: productList[i].price,
                saleItemAtrributes: productList[i].categories
            });
            Post("/Order/SaveOrder", { orders: orders }).then(function (d) {
                debugger;
                if (d.success) {
                    ClearOrder();
                    Clear();
                } else {
                    toastr["error"](d.detail);
                }
            });
        }
    }
}
function AddToCart() {
    product = {}
    product.productId =parseInt($('#productId').val())
    product.price = parseInt($('#qtyprice').html())
    product.name = $("#exampleModalScrollableTitle").text()
    product.quantity = $('#touchcounter').val()
    var checkboxes = $('.custom-control-input')
    productAttributesList = []
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked == true && !checkboxes[i].className.includes("theme-choice")) {
            productAttributes = {}
            productAttributes.productId = product.productId
            productAttributes.productAttributesId = checkboxes[i].dataset.id
            productAttributes.name = checkboxes[i].dataset.name
            productAttributes.Category = checkboxes[i].dataset.category
            productAttributes.price = checkboxes[i].dataset.productprice == "" ? 0 : parseInt(checkboxes[i].dataset.productprice)
            productAttributesList.push(productAttributes);
        }
    }
    var catList = []
    var aaa=[]
    for (var i = 0; i < productAttributesList.length; i++) {
        debugger

        if (!catList.includes(productAttributesList[i].Category) || catList.length == 0) {
            categoryList = {}
            catList.push(productAttributesList[i].Category)
            categoryList.name = productAttributesList[i].Category
            categoryList.attrList = productAttributesList.filter(function (el) { return el.Category == productAttributesList[i].Category; })
            aaa.push(categoryList)
        }
    }
    let attr = "";
    for (var j = 0; j < aaa.length; j++) {
        let a = "";
         a = `<span>${aaa[j].name}</span>` 
        let b = ""
        for (var i = 0;i < aaa[j].attrList.length; i++) {
            b = `<ul class="nav nav-pills nav-justified">
                     <li class="nav-item waves-effect waves-light">${aaa[j].attrList[i].name}</li>
                     <li class="nav-item waves-effect waves-light">${aaa[j].attrList[i].price}</li>
                     </ul>`
            a=a+b
        }
        attr = attr + a

    }
    product.categories = productAttributesList
    productList.push(product)
    sub = 0;
    tax = 0;
    total = 0;
    discount = 0
    $('#tax').val("")
    $('#subtotal').val("")
    $('#total').val("")
    var value = $('#disc').val() === "" ? 0 : parseInt($('#disc').val());
    for (let x of productList) {
        sub += x.price;
    }
    if (value != 0) {
        discount = ((value / 100) * sub);
        sub = sub - discount;
    }
    tax = parseInt(sub / 10);
    total = sub + tax;
    $('#tax').val(tax)
    $('#subtotal').val(sub)
    $('#total').val(total)
    $('#exampleModalScrollable').modal('hide');

    let rowContent
        = `<tr data-toggle="popover" data-html="true" data-placement="left" data-trigger="hover" data-original-title="Add on" class="pop" id="${product.productId}">
        <td><a href="javascript: void(0);" class="text-danger" onclick= "DeleteRow(${product.productId})"><i class="mdi mdi-close font-size-18"></i></a></td>
       <td class="text-sm-left">${product.quantity} X ${product.name}</td>
       <td class="text-sm-right">${product.price}</td>
     </tr>`;
    $('#tbdata').append(rowContent);
    $('.pop').attr('data-content', attr)
    $('[data-toggle="popover"]').popover()
}
//function PopOver(id) {
//    debugger
//    var attributes=[]
//    $.each(productAttributesList, function () {
//        if (this.productId === id) {
//            attributes = this.Categories
//        }
//    });
//}
function Search() {
    debugger
    var number = $("#number").val();
    if (number !== "") {
        number = parseInt(number);
        ShowModal("Number", number)
    }
    else
    toastr["error"]("Please Enter Number");
}
function PreBind() {
    Get('/Order/PreBind').then(function (d) {
        if (d.success) {
            debugger
            const div = document.getElementById('v-pills-tab');
            for (var i = 0; i < d.data.product.length; i++) {
                if (div.childElementCount < 10) {
                    if (div.childElementCount === 0) {
                        $('#v-pills-tab').append('<a class="nav-link mb-2 active" id="v-pills-' + d.data.product[i].category + '-tab" data-toggle="pill" href="#v-pills-' + d.data.product[i].category + '" role="tab" aria-controls="v-pills-' + d.data.product[i].category + '" aria-selected="true">' + d.data.product[i].category + '</a>');
                        $('#v-pills-tabContent').append('<div class="tab-pane fade show active" id="v-pills-' + d.data.product[i].category + '" role="tabpanel" aria-labelledby="v-pills-' + d.data.product[i].category + '-tab"></div> ')
                        $.each(d.data.product[i].product, function (j,v) {
                            $('#v-pills-' + d.data.product[i].category + '').append('<div class=" col-md-4 div"><a class="data" href="javascript: void(0);" data-id="' + v.id + '" data-name="' + v.name + '" data-price="' + v.price + '" style = "padding:10px 0px 0px 0px;" ><img src="uploads/' + v.imageUrl + ' " class="img-thumbnail"><h6 style="font-size:11px">' + v.name + '</h6></a></div>')
                           
                        });
                    }
                    else {
                        $('#v-pills-tab').append('<a class="nav-link mb-2" id="v-pills-' + d.data.product[i].category + '-tab" data-toggle="pill" href="#v-pills-' + d.data.product[i].category + '" onclick="AddClass(e) role="tab" aria-controls="v-pills-' + d.data.product[i].category + '" aria-selected="false"><p>' + d.data.product[i].category + '</p></a>' );
                        $('#v-pills-tabContent').append('<div class="tab-pane fade" id="v-pills-' + d.data.product[i].category + '" role="tabpanel" aria-labelledby="v-pills-' + d.data.product[i].category + '-tab"></div> ')
                        $($.map(d.data.product[i].product, function (v, j) {
                            $('#v-pills-' + d.data.product[i].category + '').append('<div class=" col-md-4 div"><a class="data" href="javascript: void(0);" data-id="' + v.id + '" data-name="' + v.name + '" data-price="' + v.price + '" style = "padding:10px 0px 0px 0px;" ><img src="uploads/' + v.imageUrl + ' " class="img-thumbnail"><h6 class="text-center">' + v.name + '</h6></a></div>')

                        }));
                    }
                }
                else {
                    toastr["error"]("Categories can not be greater than 10");
                }               
            }
        }
        else
            toastr["error"](d.detail);
    });
}
$(document).on("click", ".down", function (evt) {
    var value = parseInt($('#touchcounter').val());
    value = value - 1;
    $('#touchcounter').val(value)
    price = parseInt($(this).data("price"))
    var total = value * price
    $('#qtyprice').html(total);
});
$(document).on("click", ".up", function (evt) {
    debugger
    var value = parseInt($('#touchcounter').val());
    value = value + 1;
    $('#touchcounter').val(value)
    price = parseInt($(this).data("price"))
    var total = value * price
    $('#qtyprice').html(total);
});
$(document).on("click", ".data", function (evt) {
    debugger
    evt.preventDefault();
    ClearModel();
    menu.id = $(this).data("id");
    Get("/Product/GetProductById?id=" + menu.id).then(function (d) {
        debugger
        if (d.success) {
            debugger
            $('#exampleModalScrollable').modal('show')
            $('.counter').find('div').remove()
            $('.check').find('div').remove()
            $('#productId').val(d.data.product.id)
            $('.counter').append('<div class="input-group"><div class="input-group-append"><button class="btn btn-secondary down" data-price="' + d.data.product.price + '" type="button">-</button></div><input type = "number" class= "form-control" value="1" id="touchcounter"><div class="input-group-append"><button class="btn btn-secondary up" data-price="' + d.data.product.price + '" type="button">+</button></div></div> ')
            $('#qtyprice').html(d.data.product.price)
            $("#exampleModalScrollableTitle").text(d.data.product.name)
            for (let i = 0; i < d.data.attribute.length; i++) {
                debugger
                $('.check').append('<div class="card"><h7 class= "card-header mt-0" >' + d.data.attribute[i].category + '</h7><div class="card-body" id="v-'+ d.data.attribute[i].category+'" ></div></div>')
                $(d.data.attribute[i].attributes).each(function (j, v) {
                    debugger
                    $("#" + CSS.escape('v-' + d.data.attribute[i].category + '')).append('<div class= "custom-control custom-checkbox custom-checkbox-danger mb-3"><input type="checkbox" data-id="' + v.id + '" data-category="' + d.data.attribute[i].category + '"  data-name="' + v.name + '" data-productprice=' + v.price + ' class="custom-control-input vc-' + d.data.attribute[i].category + '" id="' + v.name + '" value="' + v.id + '"><label class="custom-control-label col-md-12" for="' + v.name + '" >' + v.name + '<span style="float:right;text-align:right" class="col-md-6" >' + v.price + '</span ></label></div>')
                });
            }     
        }
    });
});
$(document).on("change", ".custom-control-input", function (evt) {
    debugger
    var c = evt.currentTarget.classList[1]
    var price = parseInt($(this).data("productprice"))
    var total = parseInt($('#qtyprice').html())
    if (c.includes("(required)")) {
        total = total + price
        $('#qtyprice').html(total)
        $("." + CSS.escape(c)).not(this).prop("checked", false);
    }
    else {
        if (!$(this).is(":checked")) {
            total = total - price
        }
        else {
            total = total + price
        }
        $('#qtyprice').html(total)
    }

});
function DeleteRow($rowToDel) {
    $('#' + $rowToDel + '').closest('tr').remove();
    productList = productList.filter(function (el) { return el.productId != $rowToDel; });
    sub = 0;
    tax = 0;
    total = 0;
    discount = 0
    $('#tax').val("")
    $('#subtotal').val("")
    $('#total').val("")
    var value = $('#disc').val() === "" ? 0 : parseInt($('#disc').val());
    for (let x of productList) {
        sub += x.price;
    }
    if (value != 0) {
        discount = ((value / 100) * sub);
        sub = sub - discount;
    }
    tax = parseInt(sub / 10);
    total = sub + tax;
    $('#tax').val(tax)
    $('#subtotal').val(sub)
    $('#total').val(total)
}
function AddDisc() {
    debugger
    if (productList.length != 0) {
        sub = 0;
        tax = 0;
        total = 0;
        discount = 0
        $('#tax').val("")
        $('#subtotal').val("")
        $('#total').val("")
        var value = parseInt($('#disc').val());
        for (let x of productList) {
            sub += x.total;
        }
        discount = ((value / 100) * sub);
        sub = sub - discount;
        tax = sub / 10;
        total = sub + tax;
        $('#tax').val(tax)
        $('#subtotal').val(sub)
        $('#total').val(total)
    }
    else
        toastr["error"]("please Enter product");
}
$(document).ready(function () {
    PreBind();
    const input_value = $("#qty");
    //$('input[type="checkbox"]').click(function () {
    //    debugger
    //    $('input[type="checkbox"]').not(this).prop("checked", false);
    //});
    $("#qty").keypress(function () {
        return false;
    });
    //var $checks = $('input[type="checkbox"]');
    //$checks.click(function () {
    //    debugger
    //    $checks.not(this).prop("checked", false);
   // });
    //$(".custom-control-input").click(function () {
    //    debugger
    //    $('.custom-control-input').not(this).prop('checked', false);
    //});

    //$(".calc").click(function () {
    //    let value = $(this).val();
    //    field(value);
    //});
    //function field(value) {
    //    input_value.val(input_value.val() + value);

    //}
    //$("#clear").click(function () {
    //    input_value.val("");
    //});
});
function Clear() {
    debugger
    productList=[]
    $('#total').val("")
    $('#tax').val("")
    $('#subtotal').val("")
    $('#disc').val("")
    $('#tbdata').empty();
}
function ClearModel() {
    menu.id = 0;
    menu.name = "";
    menu.price = 0;
    menu.qty = 0
    menu.total = 0
}
function toggleAvailableTime() {
    debugger
    var deliveryType = $('#deliverytype').val();
    var availabletime = $('#availabletime')

    if (deliveryType === 'Later') {
        availabletime.show();
    } else {
        availabletime.hide();
    }
}