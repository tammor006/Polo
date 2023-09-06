var Customer = {
    id: 0,
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    address: "",
    number: "",
    email: "",
};
var number=""
function ClearCustomer() {
    $("#FirstName").val("");
    $("#LastName").val("");
    $("#Street").val("");
    $("#City").val("");
    $("#Address").val("");
    $("#Number").val("");
    $("#Email").val("");
    $('#createCustomer').parsley().reset();
    $(".form-group").removeClass('has-error');
}
function ClearChangeCustomer() {
    $("#changestreet").val("");
    $("#changecity").val("");
    $("#changeaddress").val("");
    $('#changeAddress').parsley().reset();
    $(".form-group").removeClass('has-error');
}
function ShowModal(Mode,Id) {
    debugger;
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
                $("#FirstName").val(Customer.firstName);
                $("#LastName").val(Customer.lastName);
                $("#Street").val(Customer.street);
                $("#City").val(Customer.city);
                $("#Address").val(Customer.address);
                $("#Number").val(Customer.number);
                $("#Email").val(Customer.email);
                $("#type").val(Mode)
                $("#modal").modal('show');
                $("#myLargeModalLabel").text("Edit Customer");
                ClearCustomer();
            }
        });
    }
    else {
        number = Id
        GetById("/Order/GetCustomerById", { number: number }).then(function (d) {
            debugger
            if (d.success) {
                Customer.id = d.data.custId;
                Customer.name = d.data.name;
                Customer.address = d.data.address;
                Customer.city = d.data.city;
                Customer.street = d.data.street;
                Customer.number = d.data.number;
                Customer.email = d.data.email;
                $(".number").val(Customer.number);
                $(".email").val(Customer.email);
                $(".name").val(Customer.name);
                $(".address").val(Customer.street + Customer.address + ","+ Customer.city );


            }
        });
    }
}
function performCustomerSaving() {
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


    Post("/Customer/SaveCustomer", { customer: Customer }).then(function (d) {
        debugger;
        if (d.success) {
            ClearCustomer();
            $(".modal").modal('hide');
            var type = $("#type").val()
            if (type == "Add" || type == "Edit") {
                $("#customerDatatable").dataTable().fnDestroy();
                LoadTable();
                toastr["success"](d.detail);
            } else {
                ShowModal(type, Customer.number);
            }
        } else {
            toastr["error"](d.detail);
        }
    });
}
function saveCustomer() {
    debugger;
    checkAddress(function (isWithinRadius) {
        debugger;
        if (isWithinRadius) {
            performCustomerSaving();
        } else {
            toastr["warning"]("Geocoding failed. Please check your address.");
        }
    });
   }
function showMapModal() {
    if (Customer.street !== "") {

        GetLatitudeLongitude({ address: Customer.street + Customer.address + Customer.city }, function (results) {
            debugger
            if (results)
                $("#radiusExceededModal").modal("show");
            else {
                $("#radiusExceededModal").modal("show");
                toastr["warning"]("Please Change Address");
            }
        });
    }
    else
        toastr["warning"]("Please Select Customer");
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
            {
                "data": "id",
                "render": function (data, type, row) {
                    return '<td>' +
                        '<a  class="mr-3 text-primary" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" onclick="ShowModal(Edit,' + row.id + ')">' +
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
    var email = document.getElementById("Email").value;
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

function checkAddressFields() {
    var street = document.getElementById("Street").value;
    var city = document.getElementById("City").value;
    var address = document.getElementById("Address").value;

    if (!street || !city || !address) {
        document.getElementById("validationError").innerHTML = "All address fields are required.";
    } else {
        document.getElementById("validationError").innerHTML = "";
    }
}
function AddressModal() {
    debugger
    var mode = $("a.nav-link.active").eq(0).data('mode')
    if (mode == "Delivery") {
        number = $('input[name="delnumber"]').val();
        if (number !== "") {
            $('#addressModal').modal('show');
        }
        else
            toastr["warning"]("Please enter the customer");
    }
    else if (mode == "Pickup") {
        number = $('input[name="picknumber"]').val();
        if (number !== "") {
            $('#addressModal').modal('show');
        }
        else
            toastr["warning"]("Please enter the customer");
    }
}
function saveAddress() {
            var parsleyForm = $('#changeAddress').parsley();
            parsleyForm.validate();
            if (!parsleyForm.isValid()) {
                $('.parsley-error').each(function () {
                    $(this).parents(".form-group").addClass("has-error");
                });
                return false;
            }
            else {
                $('.parsley-error').parents(".form-group").removeClass('has-error');
                checkChangeAddress(function (status) {
                    debugger;
                    if (status) {
                        Customer.street = $("#changestreet").val();
                        Customer.city = $("#changecity").val();
                        Customer.address = $("#changeaddress").val();
                        Customer.number = parseInt($("#number").val())
                        Post("/Customer/SaveAddress", { customer: Customer }).then(function (d) {
                            debugger;
                            if (d.success) {
                                ClearChangeCustomer();
                                $("#addressModal").modal('hide');
                                ShowModal(type, parseInt(Customer.number));
                            }
                            else {
                                toastr["error"](d.detail);
                            }
                        });
                    }
                    else {
                        toastr["warning"]("Geocoding failed. Please check your address.");
                    }
                }); 
            }
           
    
}
