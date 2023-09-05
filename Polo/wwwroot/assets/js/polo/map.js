const providedLatitude = 31.39162053915295;
const providedLongitude = 73.10660837762082;
const radiusInKm = 5;
let map;
let circle;


function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: providedLatitude, lng: providedLongitude },
        zoom: 12,
    });
}
function checkAddress(callback) {
   const street = $("#Street").val();
   const city = $("#City").val();
   const area = $("#Address").val();
    const geocoder = new google.maps.Geocoder();
    if (!street || !city || !area) {
        document.getElementById("validationError").innerHTML = "All address fields are required.";
        return;
    } else {
        document.getElementById("validationError").innerHTML = "";
    }
    geocoder.geocode({ address: street +area + city }, function (results, status) {
        debugger
        if (status === google.maps.GeocoderStatus.OK) {
            const userLatitude = results[0].geometry.location.lat();
            const userLongitude = results[0].geometry.location.lng();

            const distance = calculateDistance(providedLatitude, providedLongitude, userLatitude, userLongitude);

            if (distance <= radiusInKm) {
                callback(true);
            } else {
                toastr["warning"]("Address is outside the 5km radius");
                // Address is outside the 5km radius
                callback(false);
            }
        } else {
            toastr["error"]("Geocoding failed. Please check your address.");
            callback(false);
        }
    });
}




function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
function addPinpoint(latitude, longitude) {
    new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
    });
}

function drawRadiusCircle(latitude, longitude, radiusInKm) {
    circle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: map,
        center: { lat: latitude, lng: longitude },
        radius: radiusInKm * 1000,
    });
}
//$('#radiusExceededModal').on('show.bs.modal', function () {
//    // Hide the customer add modal
//    $('#modal').modal('hide');
//});