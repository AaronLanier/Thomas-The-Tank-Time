// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
    apiKey: "AIzaSyCHvJCj7VlAHnkDIToPushd1FuUTxnpsBo",
    authDomain: "thomas-the-tank-time.firebaseapp.com",
    databaseURL: "https://thomas-the-tank-time.firebaseio.com/",
    storageBucket: "thomas-the-tank-time.appspot.com/"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trnName = $("#train-name-input").val().trim();
    var trnDestination = $("#destination-input").val().trim();
    var trnTime = moment($("#first-train-input").val().trim(), "mm").format("HH:mm a");
    var trnFrequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trnName,
        destination: trnDestination,
        time: trnTime,
        frequency: trnFrequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("Train Successfully Logged")

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trnName = childSnapshot.val().name;
    var trnDestination = childSnapshot.val().destination;
    var trnTime = childSnapshot.val().time;
    var trnFrequency = childSnapshot.val().frequency;

    console.log(trnName);
    console.log(trnDestination);
    console.log(trnTime);
    console.log(trnFrequency);

    var nextArrival = moment().diff(moment(trnTime, "m"), "minutes");
    console.log(nextArrival);

    var newRow = $("<tr>").append(
        $("<td>").text(trnName),
        $("<td>").text(trnDestination),
        $("<td>").text(trnTime),
        $("<td>").text(trnFrequency),
      );

      $("#train-schedule > tbody").append(newRow);
});