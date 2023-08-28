var menu = {
    id: 0,
    name: "",
    price: 0,
    qty: 0,
    total:0
}
var OrderList=[];
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