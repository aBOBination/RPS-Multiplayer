var playerOneMove;

var playerTwoMove;

var player;

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

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

database.ref('/rpg').on(
    'value',
    function (snapshot) {
        playerOneMove = snapshot.val().playerOneMove;
        playerTwoMove = snapshot.val().playerTwoMove;

        if (playerOneMove && !playerTwoMove) {
            $('.p2-message').text('Your turn!');
        } else if (!playerOneMove && playerTwoMove) {
            $('.p1-message').text('Your turn!');
        } else {
            $('.p1-message').text('');
            $('.p2-message').text('');
        }

        if (playerOneMove && playerTwoMove) {
            if (playerOneMove === 'rock' && playerTwoMove === 'paper') {
                $('.message').html('Winner! &rArr;');
            } else if (playerOneMove === 'rock' && playerTwoMove === 'scissor') {
                $('.message').html('&lArr; Winner!');
            } else if (playerOneMove === 'paper' && playerTwoMove === 'rock') {
                $('.message').html('&lArr; Winner!');
            } else if (playerOneMove === 'paper' && playerTwoMove === 'scissor') {
                $('.message').html('Winner! &rArr;');
            } else if (playerOneMove === 'scissor' && playerTwoMove === 'rock') {
                $('.message').html('Winner! &rArr;');
            } else if (playerOneMove === 'scissor' && playerTwoMove === 'paper') {
                $('.message').html('&lArr; Winner!');
            } else {
                $('.message').text('Tie, go again!');
            }
            database.ref().child('/rpg').update({
                playerOneMove: '',
                playerTwoMove: '',
            });

            setTimeout(function () {
                location.reload();
            }, 2000);
        }
    },
    function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
    }
);

$('.p1-btn').on('click', function (event) {
    console.log(playerOneMove);
    console.log(player);
    if (!playerOneMove && !player) {
        database
            .ref()
            .child('/rpg')
            .update({
                playerOneMove: $(this).attr('value'),
            });
        player = 1;
    }
});

$('.p2-btn').on('click', function (event) {
    console.log(playerTwoMove);
    console.log(player);
    if (!playerTwoMove && !player) {
        database
            .ref()
            .child('/rpg')
            .update({
                playerTwoMove: $(this).attr('value'),
            });
        player = 2;
    }
});
