var menu = {
    id: 0,
    name: "",
    price: 0,
    qty: 0,
    total:0
}
var OrderList = [];
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

function ClearCustomer() {
    $("#FirstName").val("");
    $("#LastName").val("");
    $("#Street").val("");
    $("#City").val("");
    $("#Address").val("");
    $("#Number").val("");
    $("#Email").val("");
    $("#PaymentType").val("");
}
function ShowModal(Id) {
    debugger;
    if (Id == 0) {
        $("#modal").modal('show');
        $("#myLargeModalLabel").text("Add Customer");
        ClearModel();
    }
    else {
        Get("/Order/GetCustomerById?number=" + Id).then(function (d) {
            debugger
            if (d.success) {
                Customer.id = d.data.custId;
                Customer.name = d.data.name;
                Customer.address = d.data.address;
                Customer.number = d.data.number;
                $("#number").val(Customer.number);
                $("#name").val(Customer.name);
                $("#address").val(Customer.address);
                
               
            }
        });
    }
}
function ClearOrder() {
    Customer.id = 0;
    Customer.name = "";
    Customer.address = "";
    Customer.number = "";
    $("#number").val("");
    $("#name").val("");
    $("#address").val("")
}
function save() {
    if (Customer.id == 0) {
        toastr["error"]("Please Add Customer")
    }
    else {
        var orders=[];
        for (let i = 0; i < OrderList.length; i++) {
            orders.push({
                productId: OrderList[i].id,
                customerId: Customer.id,
                quantity: OrderList[i].qty,
                total: OrderList[i].total,
                mode: $(".nav-link active").data("mode"),
                invoiceNumber: parseInt(1 + Math.floor(Math.random() * 6))

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
function Search() {
    debugger
    var number = parseInt($("#number").val());
    ShowModal(number)
}
function saveCustomer() {
    debugger;
    var parsleyForm = $('#createCustomer').parsley();
    parsleyForm.validate();
    if (!parsleyForm.isValid()) {
        $('.parsley-error').each(function () {
            $(this).parents(".form-group").addClass("has-error");
        });
        return false;
    } else {
        $('.parsley-error').parents(".form-group").removeClass('has-error');
    }

    Customer.firstName = $("#FirstName").val();
    Customer.lastName = $("#LastName").val();
    Customer.street = $("#Street").val();
    Customer.city = $("#City").val();
    Customer.address = $("#Address").val();
    Customer.number = $("#Number").val();
    Customer.email = $("#Email").val();
    Customer.paymentType = $("#PaymentType").val();

    Post("/Customer/SaveCustomer", { customer: Customer }).then(function (d) {
        debugger;
        if (d.success) {
            ClearCustomer();
            $(".modal").modal('hide');
            ShowModal(parseInt(Customer.number));
        } else {
            toastr["error"](d.detail);
        }
    });
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
                        $($.map(d.data.product[i].product, function (v, j) {
                            $('#v-pills-' + d.data.product[i].category + '').append('<a class="data" href="javascript: void(0);" data-id="' + v.id + '" data-name="' + v.name + '" data-price="' + v.price + '" style = "padding:10px 0px 0px 0px" > <img src="uploads/' + v.imageUrl + ' " class="img-thumbnail"></a>')
                           
                        }));
                    }
                    else {
                        $('#v-pills-tab').append('<a class="nav-link mb-2" id="v-pills-' + d.data.product[i].category + '-tab" data-toggle="pill" href="#v-pills-' + d.data.product[i].category + '" onclick="AddClass(e) role="tab" aria-controls="v-pills-' + d.data.product[i].category + '" aria-selected="false"><p>' + d.data.product[i].category + '</p></a>' );
                        $('#v-pills-tabContent').append('<div class="tab-pane fade" id="v-pills-' + d.data.product[i].category + '" role="tabpanel" aria-labelledby="v-pills-' + d.data.product[i].category + '-tab"></div> ')
                        $($.map(d.data.product[i].product, function (v, j) {
                            $('#v-pills-' + d.data.product[i].category + '').append('<a class="data" href="javascript: void(0);" data-id="' + v.id + '" data-name="' + v.name + '" data-price="' + v.price + '" style = "padding:10px 0px 0px 0px" > <img src="uploads/' + v.imageUrl + ' " class="img-thumbnail"></a>')

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
$(document).on("click", ".data", function (evt) {
    debugger
    evt.preventDefault();
    ClearModel();
    menu.id = $(this).data("id");
    menu.name = $(this).data("name");
    menu.price = $(this).data("price");
    $('#keypad').modal('show')
});
function DeleteRow($rowToDel) {
    debugger
    $('#' + $rowToDel + '').closest('tr').remove();
    /*var row_index = $('#' + $rowToDel + '').index();*/

    OrderList = OrderList.filter(function (el) { return el.id != $rowToDel; });
   
    sum = 0;
    $('#total').val("")
    for (let x of OrderList) {
        sum += x.total;
    }
    $('#total').val(sum)
}
$(document).ready(function () {
    PreBind();
    const input_value = $("#qty");
    $("#qty").keypress(function () {
        return false;
    });
    $(".calc").click(function () {
        let value = $(this).val();
        field(value);
    });
    function field(value) {
        input_value.val(input_value.val() + value);

    }
    $("#clear").click(function () {
        input_value.val("");
    });
    $("#enter").click(function () {
        debugger
        const add = {};
        menu.qty = input_value.val();
        menu.total = menu.price * menu.qty;
        add.id = menu.id
        add.name = menu.name
        add.price = menu.price
        add.qty = menu.qty
        add.total = menu.total
        OrderList.push(add);
        $('#total').val("");
        sum=0
        for (let x of OrderList) {
            sum +=x.total;
        }
        $('#total').val(sum)
        input_value.val("");
        $('#keypad').modal('hide');
        
            let rowContent
                = `<tr id="${menu.id}">
                <td><a href="javascript: void(0);" class="text-danger" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" onclick= "DeleteRow(${menu.id})"><i class="mdi mdi-close font-size-18"></i></a></td>
       <td >${menu.name}</td>
       <td class="text-sm-right">${menu.price}</td>
       <td class="text-sm-right">${menu.qty}</td>
       <td class="text-sm-right">${menu.total}</td>
     </tr>`;
        $('#tbdata').append(rowContent);
       
        
    });

});
let sum = 0;
function Clear() {
    debugger
    OrderList = [];
    $('#total').val("")
    $('#tbdata').empty();
}
function ClearModel() {
    menu.id = 0;
    menu.name = "";
    menu.price = 0;
    menu.qty = 0
    menu.total = 0
}