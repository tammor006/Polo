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
    parentProductId:0,
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
    invoiceNumber: "",
    deliveryType: "",
    strAvailableTime: "",
    paymentType: "",
    saleOrderItem:[]
}
function ClearOrder() {
    Customer.id = 0;
    Customer.name = "";
    Customer.address = "";
    Customer.number = "";
    Customer.email="",
    $(".number").val("");
    $(".name").val("");
    $(".address").val("")
    $(".email").val("")
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
    debugger
    orders.paymentType = $('#paymenttype option:selected').val()
    orders.deliveryType = $('#deliverytype option:selected').val()
    orders.strAvailableTime = $('#availabletime').val();
    if (Customer.id == 0) 
        toastr["warning"]("Please Add Customer")
    else if (orders.deliveryType == "")
        toastr["warning"]("Please Add Delivery Type")
    else if (orders.paymentType == "") 
        toastr["warning"]("Please Add Payment Type")
    else if (productList.length == 0) 
        toastr["warning"]("Please Add Item")
    else if (orders.deliveryType == "Later" && orders.strAvailableTime=="") {
            toastr["warning"]("Please Enter Available Time")
    }
    else {
        debugger
        const address = $('.address').val()
        GetLatitudeLongitude({ address: address }, function (results) {
            debugger
            if (results) {
                orders.total = $(".total").val();
                orders.subTotal = $(".subtotal").val();
                orders.tax = $(".tax").val();
                orders.discount = discount;
                orders.customerId = Customer.id;
                var c = $("a.nav-link.active").eq(1).data('mode')
                orders.mode = c
                orders.invoiceNumber = Math.random().toString(6).substring(2, 8)
                orders.saleOrderItem = []
                for (let i = 0; i < productList.length; i++) {
                    orders.saleOrderItem.push({
                        productId: productList[i].productId,
                        quantity: productList[i].quantity,
                        total: productList[i].price,
                        saleItemAtrributes: productList[i].categories
                    });
                }
                Post("/Order/SaveOrder", { orders: orders }).then(function (d) {
                    debugger;
                    if (d.success) {
                        ClearOrder();
                        Clear();
                        PrintInvoice(d.data);
                    } else {
                        toastr["warning"](d.detail);
                    }
                });
            }
            else {
                $("#radiusExceededModal").modal("show");
                toastr["warning"]("Please Change Address");
            }
        });
        
    }
}
function PrintInvoice(InvoiceData) {
    debugger
    var data = InvoiceData;
    $('#invoiceno').html(data.orders.invoiceNumber);
    $('#invoicepost').html(data.strCreatedDate);
    $('#invoiceacceipt').html(data.strCreatedDate);
    $('#invoicecomplete').html(data.strAvailableTime);
    $('#invoicefirst').html(data.customer.firstName);
    $('#invoiceLast').html(data.customer.lastName);
    $('#invoiceemail').html(data.customer.email);
    $('#invoicenum').html(data.customer.number);
    $('#invoicetax').html(data.orders.tax);
    $('#invoicetotal').html(data.orders.total);
    $('#invoicesubtotal').html(data.orders.subTotal);
    $('#invoicaddress').html(data.customer.street + "&nbsp" + data.customer.address + "," + data.customer.city);
    $('#invoicepaymentmethod').html(data.orders.paymentType);
    if (discount !== 0) {
        var value = data.orders.subTotal + data.orders.discount
        value = value / data.orders.discount
        $('#tableinvoice').after(' <ul style="border:1px solid black;padding: 5px"><li> ' + value + ' % discount</li><li style="float:right" id="invoicedisc"> ' + data.orders.discount + '</li></ul > ')
    }
    if (data.orderTime != 0) {
        $('#invoicepaymentmethod').after(' <ul style="background-color:black;border: 1px thin black;color:white;margin-bottom:10px;padding:2px 0px 2px 10px"><li>How Before Possible</li><li style="float:right" id="invoicedisc"> ' + data.orderTime + '</li></ul > ')
    }
    $.each(data.orders.saleOrderItem, function (i, x) {
        $('#tbdinvoice').append(
            '<tr>' +
            '<td style="width:200px"  id="' + x.product.name + i + '">' + x.quantity + "x" + x.product.name + "<br/>&nbsp&nbsp" + '</td>' +
            '<td style="text-align:right;width:60px;float:right">' + x.total + '</td>' +
            '</tr>'
        )
        $.each(x.saleItemAtrributes, function (j, y) {
            $("td[id='" + x.product.name + i + "']").append('<mark>' + y.price == 0 ? y.name + "" : y.name + "(" + y.price + ")" + '</mark><br/>&nbsp&nbsp')
        });
    });
    var divToPrint = document.getElementById('DivIdToPrint');
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
   // newWin.document.after();
    newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
    newWin.document.close();
    setTimeout(function () {
        newWin.close();
    }, 10);
    /*$('#invoicemodal').modal("show")*/
}
function AddToCart() {
    product = {}
    product.productId = parseInt($('#productId').val())
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
            productAttributes.parentProductId = checkboxes[i].dataset.parent
            productAttributes.Category = checkboxes[i].dataset.category
            productAttributes.price = checkboxes[i].dataset.productprice == "" ? 0 : parseInt(checkboxes[i].dataset.productprice)
            productAttributesList.push(productAttributes);
        }
    }
    var catList = []
    var aaa = []
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
        for (var i = 0; i < aaa[j].attrList.length; i++) {
            b = `<ul class="nav nav-pills nav-justified">
                     <li class="nav-item waves-effect waves-light">${aaa[j].attrList[i].name}</li>
                     <li class="nav-item waves-effect waves-light">${aaa[j].attrList[i].price}</li>
                     </ul>`
            a = a + b
        }
        attr = attr + a

    }
    product.categories = productAttributesList
    productList.push(product)
    sub = 0;
    tax = 0;
    total = 0;
    discount = 0;
    var value;
    $('.tax').val("")
    $('.subtotal').val("")
    $('.total').val("")
    var mode = $("a.nav-link.active").eq(1).data('mode')
    if (mode == "Delivery") {
        value = $('input[name="deldiscount"]').val() === "" ? 0 : parseInt($('input[name="deldiscount"]').val());
    }
    else {
        value = $('input[name="pickdiscount"]').val() === "" ? 0 : parseInt($('input[name="pickdiscount"]').val());
    }
    for (let x of productList) {
        sub += x.price;
    }
    if (value != 0) {
        discount = ((value / 100) * sub);
        sub = sub - discount;
    }
    tax = parseInt(sub / 10);
    total = sub + tax;
    $('.tax').val(tax)
    $('.subtotal').val(sub)
    $('.total').val(total)
    $('#exampleModalScrollable').modal('hide');
    debugger
    var index = $('#tbdata tr').length;
    if (attr != "") {
        let rowContent
            = `<tr data-toggle="popover" data-html="true" data-placement="left" data-trigger="hover" data-original-title="Add on" class="pop"" id="${index}">
        <td><a href="javascript: void(0);" class="text-danger" onclick= "DeleteRow(${index})"><i class="mdi mdi-close font-size-18"></i></a></td>
       <td class="text-sm-left">${product.quantity} X ${product.name}</td>
       <td class="text-sm-right">${product.price}</td>
     </tr>`;
        $('#tbdata').append(rowContent);
        $('#' + index + '').attr('data-content', attr)
        $('[data-toggle="popover"]').popover()
    }
    else {
        let rowContent
            = `<tr class="pop"" id="${index}">
        <td><a href="javascript: void(0);" class="text-danger" onclick= "DeleteRow(${index})"><i class="mdi mdi-close font-size-18"></i></a></td>
       <td class="text-sm-left">${product.quantity} X ${product.name}</td>
       <td class="text-sm-right">${product.price}</td>
     </tr>`;
        $('#tbdata').append(rowContent);
    }
}
function Search() {
    debugger
    var number;
    var mode = $("a.nav-link.active").eq(1).data('mode')
    if (mode == "Delivery") {
        number = $('input[name="delnumber"]').val();
        if (number !== "") {
            ShowModal("Number", number)
        }
        else
            toastr["warning"]("Please Enter Number");
    }
    else {
        number = $('input[name="picknumber"]').val();
        if (number !== "") {
            ShowModal("Number", number)
        }
        else
            toastr["warning"]("Please Enter Number");
    }
}
function PreBind() {
    Get('/Order/PreBind').then(function (d) {
        if (d.success) {
            debugger
            const div = document.getElementById('v-pills-tab');
            for (var i = 0; i < d.data.product.length; i++) {
                if (div.childElementCount < 10) {
                    if (div.childElementCount === 0) {
                        $('#v-pills-tab').append('<a class="nav-link mb-2 active" id="v-pills-' + d.data.product[i].category + '-tab" data-toggle="pill" href="#' + d.data.product[i].category + '" role="tab" aria-controls="v-pills-' + d.data.product[i].category + '" aria-selected="true">' + d.data.product[i].category + '</a>');
                        $('#v-pills-tabContent').append('<div class="tab-pane fade show active" id="' + d.data.product[i].category + '" role="tabpanel" aria-labelledby="v-pills-' + d.data.product[i].category + '-tab"></div> ')
                        $.each(d.data.product[i].product, function (j, v) {
                            if (v.imageUrl != "")
                                $("[id='" + d.data.product[i].category + "']").append('<div class=" col-md-4 div"><a class="data" href="javascript: void(0);" data-id="' + v.id + '" data-name="' + v.name + '" data-price="' + v.price + '" style = "padding:10px 0px 0px 0px;color: black" ><img src="uploads/' + v.imageUrl + ' " class="img-thumbnail"><span style="font-size:11px">' + v.name + '</span></a></div>')
                            else
                                $("[id='" + d.data.product[i].category + "']").append('<div class=" col-md-4 div"><a class="data" href="javascript: void(0);" data-id="' + v.id + '" data-name="' + v.name + '" data-price="' + v.price + '" style = "padding:10px 0px 0px 0px;color: black" ><img src="https://placehold.it/120x80" class="img-thumbnail"><span style="font-size:11px">' + v.name + '</span></a></div>')
                        });
                    }
                    
                    else {
                        $('#v-pills-tab').append('<a class="nav-link mb-2" id="v-pills-' + d.data.product[i].category + '-tab" data-toggle="pill" href="#' + d.data.product[i].category + '" role="tab" aria-controls="v-pills-' + d.data.product[i].category + '" aria-selected="false">' + d.data.product[i].category + '</a>' );
                        $('#v-pills-tabContent').append('<div class="tab-pane fade" id="' + d.data.product[i].category + '" role="tabpanel" aria-labelledby="v-pills-' + d.data.product[i].category + '-tab"></div> ')
                        $.each(d.data.product[i].product, function (j, v) {
                            if (v.imageUrl != "")
                                $("[id='" + d.data.product[i].category + "']").append('<div class=" col-md-4 div"><a class="data" href="javascript: void(0);" data-id="' + v.id + '" data-name="' + v.name + '" data-price="' + v.price + '" style = "padding:10px 0px 0px 0px;color: black" ><img src="uploads/' + v.imageUrl + ' " class="img-thumbnail"><span style="font-size:11px">' + v.name + '</span></a></div>')
                            else
                                $("[id='" + d.data.product[i].category + "']").append('<div class=" col-md-4 div"><a class="data" href="javascript: void(0);" data-id="' + v.id + '" data-name="' + v.name + '" data-price="' + v.price + '" style = "padding:10px 0px 0px 0px;color: black" ><img src="https://placehold.it/120x80" class="img-thumbnail"><span style="font-size:11px">' + v.name + '</span></a></div>')
                        });
                    }
                }
                else {
                    toastr["warning"]("Categories can not be greater than 10");
                }               
            }
        }
        else
            toastr["warning"](d.detail);
    });
}
$(document).on("click", ".down", function (evt) {
    var value = parseInt($('#touchcounter').val());
    value = value - 1;
    $('#touchcounter').val(value)
    price = parseInt($(this).data("price"))
    var total = parseInt($('#qtyprice').html())
     total= total - price
    $('#qtyprice').html(total);
});
$(document).on("click", ".up", function (evt) {
    debugger
    var value = parseInt($('#touchcounter').val());
    value = value + 1;
    $('#touchcounter').val(value)
    price = parseInt($(this).data("price"))
    var total = parseInt($('#qtyprice').html())
    total = total + price
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
                    $("#" + CSS.escape('v-' + d.data.attribute[i].category + '')).append('<div class= "custom-control custom-checkbox custom-checkbox-danger mb-3"><input type="checkbox" data-id="' + v.id + '" data-category="' + d.data.attribute[i].category + '"  data-name="' + v.name + '" data-parent="' + v.parentProductId + '" data-productprice=' + v.price + ' class="custom-control-input vc-' + d.data.attribute[i].category + '" id="' + v.attrText + '" value="' + v.id + '"><label class="custom-control-label col-md-12" for="' + v.attrText + '" >' + v.attrText + '<span style="float:right;text-align:right" class="col-md-6" >' + v.price + '</span ></label></div>')
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
    debugger
    $('#' + $rowToDel + '').closest('tr').remove();
    productList = productList.filter(function (el,i) { return i != $rowToDel; });
    sub = 0;
    tax = 0;
    total = 0;
    discount = 0;
    var value;
    $('.tax').val("")
    $('.subtotal').val("")
    $('.total').val("")
    var mode = $("a.nav-link.active").eq(1).data('mode')
    if (mode == "Delivery") {
        value = $('input[name="deldiscount"]').val() === "" ? 0 : parseInt($('input[name="deldiscount"]').val());
    }
    else {
        value = $('input[name="pickdiscount"]').val() === "" ? 0 : parseInt($('input[name="pickdiscount"]').val());
    }
    for (let x of productList) {
        sub += x.price;
    }
    if (value != 0) {
        discount = ((value / 100) * sub);
        sub = sub - discount;
    }
    tax = parseInt(sub / 10);
    total = sub + tax;
    $('.tax').val(tax)
    $('.subtotal').val(sub)
    $('.total').val(total)
}
function AddDisc() {
    debugger
    if (productList.length != 0) {
        sub = 0;
        tax = 0;
        total = 0;
        discount = 0;
        var value;
        $('.tax').val("")
        $('.subtotal').val("")
        $('.total').val("")
        var mode = $("a.nav-link.active").eq(1).data('mode')
        if (mode == "Delivery") {
            value = $('input[name="deldiscount"]').val() === "" ? 0 : parseInt($('input[name="deldiscount"]').val());
        }
        else {
            value = $('input[name="pickdiscount"]').val() === "" ? 0 : parseInt($('input[name="pickdiscount"]').val());
        }
        for (let x of productList) {
            sub += x.price;
        }
        discount = ((value / 100) * sub);
        sub = sub - discount;
        tax = sub / 10;
        total = sub + tax;
        $('.tax').val(tax)
        $('.subtotal').val(sub)
        $('.total').val(total)
    }
    else
        toastr["warning"]("please Enter product");
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
    $('.total').val("")
    $('.tax').val("")
    $('.subtotal').val("")
    $('.disc').val("")
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