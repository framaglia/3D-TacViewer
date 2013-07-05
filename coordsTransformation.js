
var databaseUrl = "webIndexDb";
var collections = ["clusters"];
var db = require("mongojs").connect(databaseUrl, collections);


// Insert a cluster in mongodb
function saveCluster(_id, dimension, location, points){
  db.clusters.save({_id: _id, dimension: dimension, location: location, points: points}, function(err, saved) {
  if( err || !saved ) console.log("Cluster not saved");
  else console.log("Cluster saved");
})};

//find a cluster from id
function retrieveById(_id){
	db.clusters.find({_id: _id}, function(err, clusters){
		if( err || !clusters) console.log("No cluster found");
		else clusters.forEach( function(cluster) {
			console.log(cluster);
    
	});
})};

  //return vertices and transformation_matrix of the cluster retrieved from id
function retrieveVertById(_id, successCallback){             
  db.clusters.find({_id: _id}, function(err, clusters){
    if ( err || !clusters) console.log("No cluster found");
    else {
      clusters.forEach( function(cluster) {
        
        var location = cluster["location"];
        var points = cluster["points"];
        successCallback(location, points);

   })};
})};


//delete cluster from id
function deleteById(id){
	db.clusters.remove({id: id}, function(err, clusters){
		if(err || !clusters) console.log("No cluster to delete");
    	else console.log("Cluster deleted");
	});
};


//calculates global coordinates of vertices
function coordsTransformation(id, callback){
  
retrieveVertById(id, function(retrivedLocation,retrivedPoints) {
  
  var points = retrivedPoints;
  var location = retrivedLocation;

  var xLoc = location[0];
  var yLoc = location[1];
  var zLoc = location[2];

  var transPoints = [];
  
  for(var i = 0; i < points.length; i++){
    for(var j = 0; j < points[i].length; j++){
          var point = [ points[i][j][0] + xLoc, points[i][j][1] + yLoc, zLoc + i ];
          transPoints.push(point);
    }

  }


   callback(transPoints);
  
  });
}





var http = require("http");
var sio = require('socket.io');

//create a server
var server = http.createServer(function(request, response) {  
    
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write('Server is running on localhost:8180');
    response.end();
 
   }).listen(8180);


//socket listen to server port
var socket = sio.listen(server);

//behavior of socket(server side) on incoming connection
socket.on('connection', function(client){ 
    
    //message received from a client 
    client.on('message', function(){ 
        
        console.log('message arrive');
     });

    client.on('disconnect', function(){

        console.log('connection closed');
    });

    //client emits a custom signal ("calculate")
    client.on('calculate', function(idc){
        
        console.log('message transformation received');
        
        //call the coordsTransformation function
        coordsTransformation(idc, function(vert){
          
          //socket 

          client.send(JSON.stringify(vert));
          console.log(vert);   
         
    });
 });

    client.on('draw', function(idc){

        coordsTransformation(idc, function(vert){
          
          console.log(typeof(vert));
          client.emit('drawRisp',vert);    

    });
         
    });
 });

