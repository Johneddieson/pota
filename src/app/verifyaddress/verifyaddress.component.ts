import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';



declare var google;
@Component({
  selector: 'app-verifyaddress',
  templateUrl: './verifyaddress.component.html',
  styleUrls: ['./verifyaddress.component.scss']
})

@Injectable()
export class VerifyaddressComponent implements OnInit {
@ViewChild('map', {static: true}) mapRef: ElementRef
  latitude: any
longitude: any

public static lat;
public static lon;

  constructor() {

    this.getLocation()

   }



getLocation() {
  navigator.geolocation.getCurrentPosition(resp => {
    if (resp) {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude
    }
  })
}


showMap() {
  const location = new google.maps.LatLng(32.1231231, 25.3212312)
var map = new google.maps.Map(document.getElementById('map'), {
  center: location,
  zoom: 13,
  mapTypeId: 'roadmap'
})

var input = document.getElementById('pac-input');
var searchBox = new google.maps.places.SearchBox(input);

map.addListener('bounds_changed', () => {
    searchBox.setBounds(map.getBounds());
})

var markers = [];
searchBox.addListener('places_changed', () => {
  var places = searchBox.getPlaces();

  if (places.length ==0) {
    return
  }

  markers.forEach((marker) => {
    marker.setMap(null)
  })
  markers=[]
var bounds = new google.maps.LatLngBounds();
places.forEach((place) => {
  VerifyaddressComponent.lat = place.geometry.viewport.Ya.i
  VerifyaddressComponent.lon = place.geometry.viewport.Ua.i

  if (!place.geometry) {
    console.log("No Geometry Found");
    return
  }

  markers.push(new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
    position: place.geometry.location
  }))

  if (place.geometry.viewport) {
    bounds.union(place.geometry.viewport)
  } else {
    bounds.extend(place.geometry.location);
  }
})
map.fitBounds(bounds)
})

}

  ngOnInit(): void {
this.showMap()
  }

}
