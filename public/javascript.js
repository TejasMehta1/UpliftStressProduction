

  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyAHa7fmBJVbbtjXbtoNLZ08HcO6crzgduk",
      authDomain: "stressv3-d1fcf.firebaseapp.com",
      databaseURL: "https://stressv3-d1fcf.firebaseio.com",
      projectId: "stressv3-d1fcf",
      storageBucket: "",
      messagingSenderId: "976626433998"
    };
  firebase.initializeApp(config);
  function login(){
      function newLoginHappened(user) {
          if(user)
          {
              //user is signed in
              app(user);
          }
          else{
              var provider = new firebase.auth.GoogleAuthProvider();
              firebase.auth().signInWithRedirect(provider);
          }
      }
      firebase.auth().onAuthStateChanged(newLoginHappened);
  }
function app(user) {
  var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                 // this value to authenticate with your backend server, if
                 // you have one. Use User.getToken() instead
                 document.getElementById("welcome").innerHTML = name;
    document.getElementById("name").value = name;
    document.getElementById("img").src = photoUrl;
    //document.getElementById("img").fsrc = photoUrl;
    document.getElementById("url").value = photoUrl;

    }
}
var database = firebase.database();
//$('#addTrainBtn').on("click", function() {
function update(){
  // take user input
/*  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequencyInput").val().trim();*/
  var name = document.getElementById("name").value;
    var url = document.getElementById("url").value;
    var age = document.getElementById("age").value;
    var expertise = document.getElementById("expertise").value;
    var expertise2 = document.getElementById("expertise2").value;
    var expertise3 = document.getElementById("expertise3").value;
    var type = document.getElementById("type").value;
    var zip = document.getElementById("zip").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var user = firebase.auth().currentUser;
    var usrID = firebase.auth().currentUser.uid;
    var bio = document.getElementById("bio").value;

  // to create local temporary object to hold train data
  var newTrain = {
      name: name,
      imgurl: url,
      age: age,
      subject: expertise,
      subject2: expertise2,
      subject3: expertise3,
      type: type,
      zipcode: zip,
      phoneNumber: phoneNumber,
      bio: bio
    }
database.ref(usrID).update(newTrain);
window.location.href = "index.html";

  /*  return firebase.database().ref().once('value').then(function(snapshot) {
      var uuid = snapshot.val().user;
      if(uuid == firebase.auth().currentUser.uid)
      {
        database.ref("user").set(newTrain);
      }
      else{
        database.ref().push(newTrain);

      }
    });*/


    // uploads train data to the database
    /*database.ref().on("value", function(childSnapshot) {
      var uuid= childSnapshot.val().user;
      if(uuid == firebase.auth().currentUser.uid)
      {
        database.ref().set(newTrain);
      }
      else{
        database.ref().push(newTrain);

      }
    })*/

  //database.getRef().child("name").setValue("this is a test");
//  console.log(newTrain.name);
  // clears all the text-boxes
  /*$("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");*/
  // Prevents moving to new page
//  return false;

};
//  Created a firebase event listner for adding trains to database and a row in the html when the user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  // Now we store the childSnapshot values into a variable
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().ftrain;
  var frequency = childSnapshot.val().freq;
  // first Train pushed back to make sure it comes before current time
  var firstTimeConverted = moment(firstTrain, "HH:mm");
  console.log(firstTimeConverted);
  var currentTime = moment().format("HH:mm");
  console.log("CURRENT TIME: " + currentTime);
  // store difference between currentTime and fisrt train converted in a variable.
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  console.log(firstTrain);
  console.log("Difference in Time: " + timeDiff);
  // find Remainder of the time left and store in a variable
  var timeRemainder = timeDiff % frequency;
  console.log(timeRemainder);
  // to calculate minutes till train,we store it in a variable
  var minToTrain = frequency - timeRemainder;
  // next train
  var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});

window.onload = login;
