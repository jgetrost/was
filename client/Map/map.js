Meteor.startup(function() {
  GoogleMaps.load({key: 'AIzaSyA-i6boY7vNT3xz_qoIPmM-IxRhEkEKvpc'});
});

Template.map.helpers({

  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(39.8282, -98.5795),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.TERRAIN
      };
    }
  }
});

Template.map.onCreated(function() {
  Meteor.subscribe('drawable');

  GoogleMaps.ready('map', function(map) {
     console.log("I'm ready!");
     var infowindow = new google.maps.InfoWindow({
      size: new google.maps.Size(150, 50)
    });
     var lots = [];
     Events.find().observe({
       added: function(document) {
           var filltrans = .1;
           var stroketrans =.2;
           var color = '#FF0000';
           if(document.capUrgency = "Immediate"){
               filltrans = .4;
               stroketrans = .5;
           }
           if(document.title.toLowerCase().includes("flood")){
               color = '#3498db';
           }else if(document.title.toLowerCase().includes("storm")){
               color = '#f1c40f';
           }else if(document.title.toLowerCase().includes("severe")){
               color = '#000000';
           }else if(document.title.toLowerCase().includes("heat")){
               color = '#d35400';
           }
           var lot = new google.maps.Polygon({
               id: document._id,
               title: document.title,
               paths: capPolygonToLatLng(document.capPolygon),
               strokeColor: color,
               strokeOpacity: stroketrans,
               strokeWeight: 1,
               fillColor: color,
               fillOpacity: filltrans
        });

        google.maps.event.addListener(lot, 'click', function(event) {
          var contentString = "name:" + this.name + "<br>" + event.latLng.toUrlValue(6);;
          infowindow.setContent(this.title);
          infowindow.setPosition(event.latLng);
          infowindow.open(map.instance);
        });

       lot.setMap(map.instance);

       google.maps.event.addListener(map.instance, 'click', function(event) {
           infowindow.close();
       });

       lots.push(lot);
       },
       changed: function(newDocument, oldDocument) {
         console.log("Changed:");
         console.log(oldDocument);
         console.log("To:");
         console.log(newDocument);
       },
       removed: function(oldDocument) {
         console.log("Removed");
         console.log(oldDocument);
       }
     });

 });

 function capPolygonToLatLng(capPolygon){
     //console.log(capPolygon);
     var pts = [];
     var stringCoordinates = capPolygon.split(" ");
     //console.log(stringCoordinates);
     stringCoordinates.forEach(function (value, i) {
         var coord = value.split(",");
         var pt = {lat: parseFloat(coord[0]), lng: parseFloat(coord[1])};
         pts.push(pt);
     });
     return pts;
 }
});
