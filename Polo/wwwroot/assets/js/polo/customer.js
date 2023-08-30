﻿var Customer = {
    id: 0,
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    address: "",
    number: "",
    email: "",
    orderType : "",
    deliveryType: "",
    availableTime : "",
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
    $("#OrderType").val("");
    $("#DeliveryType").val("");
    $("#AvailableTime").val("");
    $("#PaymentType").val("");
}
function ShowModal(Mode,Id) {
    debugger;
    ClearModel();
    if (Id==0) {
        $("#modal").modal('show');
        $("#myLargeModalLabel").text("Add Customer");
        $("#type").val(Mode)
    }
    else if (Mode == "Edit") {
        Get("/Customer/GetCustomerById?id=" + Id).then(function (d) {
            debugger
            if (d.success) {
                Customer.id = d.data.customer.id;
                Customer.firstName = d.data.customer.firstName;
                Customer.lastName = d.data.customer.lastName;
                Customer.street = d.data.customer.street;
                Customer.city = d.data.customer.city;
                Customer.address = d.data.customer.address;
                Customer.number = d.data.customer.number;
                Customer.email = d.data.customer.email;
                Customer.orderType = d.data.customer.orderType;
                Customer.deliveryType = d.data.customer.deliveryType;
                Customer.availableTime = d.data.customer.availableTime;
                Customer.paymentType = d.data.customer.paymentType;
               /* Customer.deliveryTime = d.data.customer.deliveryTime;*/

                $("#FirstName").val(Customer.firstName);
                $("#LastName").val(Customer.lastName);
                $("#Street").val(Customer.street);
                $("#City").val(Customer.city);
                $("#Address").val(Customer.address);
                $("#Number").val(Customer.number);
                $("#Email").val(Customer.email);
                $("#OrderType").val(Customer.orderType);
                $("#DeliveryType").val(Customer.deliveryType);
                $("#AvailableTime").val(Customer.availableTime);
                $("#PaymentType").val(Customer.paymentType);
                $("#type").val(Mode)
                $("#modal").modal('show');
                $("#myLargeModalLabel").text("Edit Customer");
            }
        });
    }
    else {
        Get("/Order/GetCustomerById?number=" + Id).then(function (d) {
            debugger
            if (d.success) {
                Customer.id = d.data.custId;
                Customer.name = d.data.name;
                Customer.address = d.data.address;
                Customer.number = d.data.number;
                Customer.email = d.data.email;
                $("#number").val(Customer.number);
                $("#email").val(Customer.email);
                $("#name").val(Customer.name);
                $("#address").val(Customer.address);


            }
        });
    }
}

function saveCustomer(crud) {
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
    Customer.orderType = $("#OrderType").val();
    Customer.deliveryType = $("#DeliveryType").val();
    Customer.availableTime = $("#AvailableTime").val();
    Customer.paymentType = $("#PaymentType").val();

    Post("/Customer/SaveCustomer", { customer: Customer }).then(function (d) {
        debugger;
        if (d.success) {
            ClearCustomer();
            $(".modal").modal('hide');
            var type = $("#type").val()
            if (type == "Add" || type=="Edit") {
                $("#customerDatatable").dataTable().fnDestroy();
                LoadTable();
                toastr["success"](d.detail);
            }
            else {
                
                ShowModal(type,parseInt(Customer.number));
            }
        } else {
            toastr["error"](d.detail);
        }
    });
}

function LoadTable() {
    $("#customerDatatable").DataTable({
        'ajax': {
            'url': '/Customer/GetAllCustomers', // Adjust the URL to match your API endpoint
            "type": "GET",
            "dataType": 'json',
        },
        "columns": [
            { "data": "name" },
            { "data": "address" },
            { "data": "number" },
            { "data": "email" },
            { "data": "orderType" },
            { "data": "deliveryType" },
            { "data": "availableTime" },
            { "data": "paymentType" },
            {
                "data": "id",
                "render": function (data, type, row) {
                    return '<td>' +
                        '<a href="javascript:void(0);" class="mr-3 text-primary" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" onclick="ShowModal(Edit,' + row.id + ')">' +
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
        text: "You will not be able to recover this customer!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
    }).then(function (isConfirm) {
        debugger;
        if (isConfirm) {
            Get('/Supplier/DeleteCustomer?id=' + id).then(function (d) {
                if (d.success) {
                    toastr["success"](d.detail);
                    $("#customerDatatable").dataTable().fnDestroy();
                    LoadTable();
                } else {
                    toastr["error"](d.detail);
                }
            });
        }
    });
}

$(document).ready(function () {
    LoadTable();
    const phoneNumberInput = $("#Number");

    phoneNumberInput.on("input", function () {
        const phoneNumber = phoneNumberInput.val();

        // Regular expression to match valid international phone numbers starting with '+'
        const pattern = /^\+\d{1,15}$/;

        if (!pattern.test(phoneNumber)) {
            phoneNumberInput.addClass("is-invalid");
        } else {
            phoneNumberInput.removeClass("is-invalid");
        }
    });
});
function ValidateEmail() {
    var email = document.getElementById("txtEmail").value;
    var lblError = document.getElementById("lblError");
    lblError.innerHTML = "";
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!expr.test(email)) {
        lblError.innerHTML = "Invalid email address.";
    }
}
function toggleAddressFields() {
    debugger;
    var orderType = $('#OrderType').val();
    var addressFields = $('#addressFields');

    if (orderType === '2') {
        addressFields.show();
       $('#Street, #City, #Address').prop('required', true);
    } else {
        addressFields.hide();
        $('#Street, #City, #Address').prop('required', false);
    }
}

function toggleAvailableTime() {
    var deliveryType = $('#DeliveryType').val();
    var availableTimeContainer = $('#availableTimeContainer');

    if (deliveryType === '2') {
        availableTimeContainer.show();
        $('#AvailableTime').prop('required', true);
    } else {
        availableTimeContainer.hide();
        $('#AvailableTime').prop('required', false);
    }
}