$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyD0N37toTjo7Ft-QITV4lJgEp-t1IhZazU",
        authDomain: "test-counter-df27b.firebaseapp.com",
        databaseURL: "https://test-counter-df27b.firebaseio.com",
        projectId: "test-counter-df27b",
        storageBucket: "test-counter-df27b.appspot.com",
        messagingSenderId: "556215461480"
      };
   
    
    firebase.initializeApp(config);
    
    // starting variables
    var database = firebase.database();
    var trainName = "";
    var destination = "";
    var firstTrain = 0;
    var frequency = 0;
    var nextTrain = 0;
    var timeUntil = 0;
    
    // on button click event
    $("#submitButton").on("click", function(){
    
        event.preventDefault();
    
        //assign inputted user information to variables
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#firstTrain").val().trim();
        frequency = $("#frequency").val().trim();
    
        //calculate train next arrival time and minutes until
        var timeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        var difference = moment().diff(moment(timeConverted), "minutes");
        var timeRemainder = difference % frequency;
        var timeUntil = frequency - timeRemainder;
        var nextTrain = moment().add(timeUntil, "minutes").format("HH:mm");
        
        // push information to Firebase
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            timeUntil: timeUntil,
            nextTrain: nextTrain
        });
    
        //empty form
        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");
    });
    
    //produce persistence
    database.ref().on("child_added", function(snapshot) {
    
        //append values that live on Firebase
        var newLine = $("<tr></tr>"); 
    
        newLine.append('<td>' + snapshot.val().trainName + '</td>');
        newLine.append('<td>' + snapshot.val().destination + '</td>');
        newLine.append('<td>' + snapshot.val().frequency + '</td>');
        newLine.append('<td>' + snapshot.val().nextTrain + '</td>');
        newLine.append('<td>' + snapshot.val().timeUntil + '</td>');
    
        $("#tbody").append(newLine);
    });
    
    });
    $('.carousel').carousel()