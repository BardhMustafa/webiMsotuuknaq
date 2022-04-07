function startGame(){
    var timeInput = prompt("Shënoni kohëzgjatjen për pyetje");
    if(timeInput != null) {
        socket.emit('startGame');
    } else {
        alert("Ju lutem plotësoni të dhënat!");
    }
    
}