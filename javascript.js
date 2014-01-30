function maFonction(){
$.getJSON( "JSON/test.json", function( data ) {
   // now you can read the data
   var LatLongData = data;
   alert(LatLongData[0]);
});
}