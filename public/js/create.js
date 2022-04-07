var socket = io();

socket.on('connect', function () {
    socket.emit('requestDbNames');//Get database names to display to user
});

socket.on('gameNamesData', function (data) {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // console.log(user.uid)
            for (var i = 0; i < Object.keys(data).length; i++) {
                if (user.uid == data[i].userID) {

                    var div = document.getElementById('game-list');
                    var button = document.createElement('button');

                    button.innerHTML = data[i].name;
                    button.setAttribute('onClick', "startGame('" + data[i].id + "')");
                    button.setAttribute('id', 'gameButton');

                    div.appendChild(button);

                } else {
                    console.log("test")
                }

            }
        }
    });

});

function startGame(data) {
    window.location.href = "/host/" + "?id=" + data;
}
