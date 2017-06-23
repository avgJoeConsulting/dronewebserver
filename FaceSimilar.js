var oxford = require('project-oxford');
var client = new oxford.Client('99f45303a51d4eeea6366ba8dfea494a');
  

//createNewFaceList("facegroup","Joe Barth"); 

// Function to create a new facelist to add faces to
function createNewFaceList(ListIdName,ListName){ 
  client.face.faceList.create(ListIdName,{
    name : ListName
  })
  .catch(function(e) {
    console.log(e); // "Something went wrong !"
   }).then(function (){
   console.log("Created Your FaceList");  
  });
}

// includeASearchFace("facegroup","https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAL6AAAAJDQ1ODYzOWM1LTQyZTAtNGFiZi05NGZmLWM1OTJhNGMxNTk0OQ.jpg","Joe Barth");
// This function is inserting faces into a created facelist
// parameters are the facelist group name, the location of 
// the image and the name of the person
function includeASearchFace(groupname,imgpath,personname){
   client.face.faceList.addFace(groupname,{
    url : imgpath,
    name : personname
   })
   .catch(function(e) {
      console.log(e); // "Something went wrong!"
   }).then(function (){
      console.log("Face Added");
   });  
}

// This function is detecting if a specific detected FaceID is in 
// a given EXISTING facelist group
function findKnownFaces(DetectId,searchFaceListName){
  client.face.similar(DetectId,{
    candidateFaceListId : searchFaceListName
  }).catch(function(e) {
     console.log(e); // "oh, no!"
  }).then(function (response) {
   if (response[0] != null) {
        if (response[0].confidence > 0.5) {
          console.log("Good Match - Found you");
          console.log(response);
       } 
   } else {
     console.log("Poor or No Match");  
    console.log(response);  
  }
  });
}

 function runAll(imageFileName,searchFaceListName){
  client.face.detect({
      url: imageFileName,
      analyzesAge: true,
      analyzesGender: true,
      returnFaceId : true
   }).then(function (response) {  
      DetectId = response[0].faceId;
      findKnownFaces(DetectId,searchFaceListName); 
   });    
}

var searchFaceListName = "facegroup";
//createNewFaceList(searchFaceListName,"Joe Barth");
//includeASearchFace(searchFaceListName,"Joe.jpg","Joe Barth");
runAll("https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAL6AAAAJDQ1ODYzOWM1LTQyZTAtNGFiZi05NGZmLWM1OTJhNGMxNTk0OQ.jpg",searchFaceListName);
