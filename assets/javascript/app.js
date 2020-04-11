// var playerOneMove;
// var playerTwoMove;

var firebaseConfig = {
    apiKey: 'AIzaSyAJeHJ-SojF4ID2FQ9tmQggmn7G8D8lSH0',
    authDomain: 'bootcamp-420.firebaseapp.com',
    databaseURL: 'https://bootcamp-420.firebaseio.com',
    projectId: 'bootcamp-420',
    storageBucket: 'bootcamp-420.appspot.com',
    messagingSenderId: '320867290140',
    appId: '1:320867290140:web:aa7082c1399069213ba3d9',
    measurementId: 'G-F3L2L774M3',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
// firebase.analytics();

database.ref('/rpg').on(
    'value',
    function (snapshot) {
        playerOneMove = snapshot.val().playerOneMove;
        playerTwoMove = snapshot.val().playerTwoMove;
        console.log(playerOneMove, playerTwoMove);
        // If Firebase has a highPrice and highBidder stored, update our client-side variables
        if (snapshot.child('playerOneMove') === 'rock' && snapshot.child('playerTwoMove') === 'rock') {
            // Set the variables for highBidder/highPrice equal to the stored values.

            console.log(playerOneMove, playerTwoMove);
            alert('tie');
        } else alert('next');
    },
    function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
    }
);

$('#player-one').on('click', function (event) {
    database.ref().child('/rpg').update({
        playerOneMove: 'rock',
    });
});

$('#player-two').on('click', function (event) {
    database.ref().child('/rpg').update({
        playerTwoMove: 'rock',
    });
});
