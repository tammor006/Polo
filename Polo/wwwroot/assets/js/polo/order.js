function PreBind() {
    Get('/Order/PreBind').then(function (d) {
        if (d.success) {
            debugger
            const div = document.getElementById('v-pills-tab');
            for (var i = 0; i < d.data.product.length; i++) {
                if (div.childElementCount < 10) {
                    if (div.childElementCount === 0) {
                        $('#v-pills-tab').append('<a class="nav-link mb-2 active" id="v-pills-' + d.data.product[i].category + '-tab" data-toggle="pill" href="#v-pills-' + d.data.product[i].category + '" role="tab" aria-controls="v-pills-' + d.data.product[i].category + '" aria-selected="true">' + d.data.product[i].category + '</a>');
                        for (var j = 0; j < d.data.product[i].product.length; j++) {
                            $('#v-pills-tabContent').append('<div class="tab-pane fade show active" id="v-pills-' + d.data.product[i].category + '" role="tabpanel" aria-labelledby="v-pills-' + d.data.product[i].category + '-tab"><p>' + d.data.product[i].product[i].name + '</p></div> ')
                        }
                    }
                    else {
                        $('#v-pills-tab').append(


                            ' <a class="nav-link mb-2" id="v-pills-' + d.data.product[i].category + '-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-' + d.data.product[i].category + '" aria-selected="false">' + d.data.product[i].category + '</a>'

                        );

                        for (var j = 0; j < d.data.product[i].category.product.length; j++) {
                            $('#v-pills-tabContent').append('<div class="tab-pane fade" id="v-pills-' + d.data.product[i].category + '" role="tabpanel" aria-labelledby="v-pills-home-tab"><p>' + d.data.product[i].category.product[i].name + '</p></div> ')
                        }
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
$(document).ready(function () {
    //$('#categoryselect').select2({
    //    dropdownParent: $('#modal')
    //});
    PreBind();
});