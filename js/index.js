var map;
var markers = [];
//InfoWibdow content
var infoWindow;

function initMap() {
  var losAngeles = {
    lat: 34.063380,
    lng: -118.358080
  }

  map = new google.maps.Map(document.getElementById('map'), {
    center: losAngeles,
    zoom: 8,
    styles: [{
        "elementType": "geometry",
        "stylers": [{
          "color": "#ebe3cd"
        }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#523735"
        }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#f5f1e6"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#c9b2a6"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#dcd2be"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#ae9e90"
        }]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#93817c"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#a5b076"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#447530"
        }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f1e6"
        }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#fdfcf8"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f8c967"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#e9bc62"
        }]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e98d58"
        }]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#db8555"
        }]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#806b63"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#8f7d77"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#ebe3cd"
        }]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#b9d3c2"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#92998d"
        }]
      }
    ]
  });


  infoWindow = new google.maps.InfoWindow();
  searchStores();
  //displayStores();
  //showStoresMarkers();
  //setOnClickListener();

}

function searchStores() {
  var foundStores = [];
  var zipCode = document.getElementById('zip-code-input').value;
  //console.log(zipCode)
  if (zipCode) {
    //filter zipCode by the first five elements
    stores.forEach(function (store) {
      var postal = store.address.postalCode.substring(0, 5);
      //console.log(postal);
      // use zip code to compare what the user typed in matches the zip code of the actual store
      if (postal == zipCode) {
        //do something
        // created our own variable(foundStores) to see the stores that macthed the search
        foundStores.push(store);

      }
    });
    //console.log(foundStores);
  } else {
    foundStores = stores;
  }
  clearLocations();
  // this is to display the found stores
  displayStores(foundStores);
  showStoresMarkers(foundStores);
  setOnClickListener();
}

function clearLocations() {
  //google store locator example gives us the example to clear all markers
  infoWindow.close();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;
}

function setOnClickListener() {
  //console.log(markers);
  var storeElements = document.querySelectorAll('.store-container');
  //console.log(storeElements);
  storeElements.forEach(function (elem, index) {
    // adding an event listener
    elem.addEventListener('click', function () {
      //below code obtained from google maps store locator tutorial page
      google.maps.event.trigger(markers[index], 'click');
    })
  })
}

function displayStores(stores) {
  var storesHtml = "";
  stores.forEach(function (store, index) {
    //console.log(store);
    var address = store.addressLines;
    var phone = store.phoneNumber;
    storesHtml += `
    
        <div class="store-container">
            <div class="store-container-background">
                 <div class="store-info-container">
                      <div class="store-address" >
                           <span> ${ address[0] }</span>
                           <span>${ address[1] }</span>
                      </div>
                      <i class="store-phone-number"> ${ phone }</i>
                  </div>
                  <div class="store-number-container">
                      <div class="store-number">
                           ${ index+1 }
                      </div>

                  </div>
             </div>

        </div>
   
        `
  });
  document.querySelector('.stores-list').innerHTML = storesHtml;

}

function showStoresMarkers(stores) {
  var bounds = new google.maps.LatLngBounds();
  stores.forEach(function (store, index) {
    var latlng = new google.maps.LatLng(
      store.coordinates.latitude,
      store.coordinates.longitude);
    console.log(latlng);
    var name = store.name;
    var address = store.addressLines[0];
    var statusText = store.openStatusText;
    var phone = store.phoneNumber;
    bounds.extend(latlng);
    createMarker(latlng, name, address, statusText, phone, index);

  })
  map.fitBounds(bounds);
}

function createMarker(latlng, name, address, statusText, phone, index) {
  var html = `
        <div class="store-info-window">
          <div class="store-info-name">
              ${name}
          </div>
          <div class="store-info-status">
              ${statusText}
          </div>
          <div class="store-info-address">
            <div class="circle">
              <i class="fas fa-location-arrow"></i>
            </div>
              ${address}
            
          </div>
          <div class="store-info-phone">
            <div class="circle">
               <i class="fas fa-phone-alt"></i>
            </div>
               ${phone}
          </div>
        </div>
    `;
  var iconBase = 'images/';
  var icons = {
    info: {
      icon: iconBase + 'starbucks-icon-marker.png'
    }
  }
  var features = [{
    position: latlng,
    type: 'info'
  }];
  for (var i = 0; i < features.length; i++) {
    var marker = new google.maps.Marker({
      map: map,
      position: features[i].position,
      icon: icons[features[i].type].icon,
      //passing the index from 
      label: `${index+1}`,
      //position: losAngeles,

      //title: 'This is Los Angeles!',
    });
  };



  /*var marker = new google.maps.Marker({
  map: map,
  position: latlng
  });
      var marker = new google.maps.Marker({
        map: map,
        position: latlng
      });*/
  google.maps.event.addListener(marker, 'click', function () {
    infoWindow.setContent(html);

    infoWindow.open(map, marker);
  });
  markers.push(marker);
}