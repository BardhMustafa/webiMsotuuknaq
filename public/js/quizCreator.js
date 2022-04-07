var socket = io();
var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dotea964v/upload';
var CLOUDINARY_UPLOAD_PRESET = 'rkdbajct';
let  questionNum = 1;
// var socket = io.connect('http://localhost:3001');


function sendFile(number, picturePath) {
    var pathURL = document.getElementById("fileup" + number);
    console.log(pathURL);
    var file = pathURL.files[0]; 
    if (file) {
        //read the file content and prepare to send it
        var reader = new FileReader();
        reader.onload = function(e) {
            console.log('Sending file...');
            var buffer = e.target.result;
            socket.emit('send-file', picturePath, buffer);
        };
        reader.readAsBinaryString(file);
    }
}


function updateDatabase(){
    let a = $('input').val();
        if (a == "") {
            alert("Ju lutem plotësoni të gjitha të gjitha të dhënat!");
            return false;
        } else {
            var userID = null; 
            firebase.auth().onAuthStateChanged((user) => { 
                if (user) {
                    userID = user.uid;
                    var questions = [];
                    var name = document.getElementById('name').value;
                    console.log(questionNum)
                    for(var i = 1; i <= questionNum; i++){
                        var question = document.getElementById('q' + i).value;
                        var answer1 = document.getElementById(i + 'a1').value;
                        var answer2 = document.getElementById(i + 'a2').value;
                        var answer3 = document.getElementById(i + 'a3').value;
                        var answer4 = document.getElementById(i + 'a4').value;
                        var correct = document.getElementById('correct' + i).value;
                        var pathURL = document.getElementById("fileup" + i);
                        var pictureURL=""
                        if(pathURL.files[0]!=undefined){
                            console.log("e defiinume")
                            pictureURL=Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)+ "."+pathURL.files[0].type.substring(6);
                 
                            sendFile(i, pictureURL);                        
                            pictureURL = 'img/uploads/' + pictureURL;
                        }else{
                            pictureURL= "";
                        }
                 
                        var answers = [answer1, answer2, answer3, answer4];   
                         questions.push({"question": question, "answers": answers, "correct": correct, "pictureURL": pictureURL});
                        }   
                 
                        var quiz = {id: 0, "name": name, "questions": questions, "userID": userID};
                    socket.emit('newQuiz', quiz);   
                } else {
                    console.log("pain")
                }
            });
            
        }
}
// newQuestionDiv.innerHTML += '<input type="file" class="filepond" id="fileup" value=""><img src="" height="200" alt="Image preview..." id="previewImg"><br><br>'



function addQuestion(){
    
     questionNum++;
    
     var questionsDiv = document.getElementById('allQuestions');
    
    var newQuestionDiv = document.createElement("div");
    
    var questionLabel = document.createElement('label');
    var questionField = document.createElement('input');
    
    var inputImage = document.createElement('input');
    // var answer1Label = document.createElement('label');
    var answer1Field = document.createElement('input');
    
    // var answer2Label = document.createElement('label');
    var answer2Field = document.createElement('input');
    
    //  var answer3Label = document.createElement('label');
    var answer3Field = document.createElement('input');
    
    // var answer4Label = document.createElement('label');
    var answer4Field = document.createElement('input');
    
    var correctLabel = document.createElement('label');
    var correctField = document.createElement('input');
    
    // questionLabel.innerHTML = "Question " + String(questionNum) + ": ";
    questionField.setAttribute('class', 'question');
    questionField.setAttribute('id', 'q' + String(questionNum));
    questionField.setAttribute('type', 'text');
    questionField.setAttribute('required', '');
    questionField.setAttribute('placeholder', 'Shkruaj pyetjen ' + String(questionNum));

    inputImage.setAttribute("type", "file");
    inputImage.setAttribute("class", "filepond");
    inputImage.setAttribute("id", "fileup" + String(questionNum));
    
    // answer1Label.innerHTML = "Answer 1: ";
    // answer2Label.innerHTML = " Answer 2: ";
    // answer3Label.innerHTML = "Answer 3: ";
    // answer4Label.innerHTML = " Answer 4: ";
    correctLabel.innerHTML = "Përgjigja e saktë (1-4): ";
    
    answer1Field.setAttribute('id', String(questionNum) + "a1");
    answer1Field.setAttribute('type', 'text');
    answer1Field.setAttribute('class', "pergjigjja1");
    answer1Field.setAttribute('required', "");
    answer1Field.setAttribute('placeholder', "Shkruaj përgjigjen");
    answer2Field.setAttribute('id', String(questionNum) + "a2");
    answer2Field.setAttribute('type', 'text');
    answer2Field.setAttribute('class', "pergjigjja2");
    answer2Field.setAttribute('required', '');
    answer2Field.setAttribute('placeholder', "Shkruaj përgjigjen");
    answer3Field.setAttribute('id', String(questionNum) + "a3");
    answer3Field.setAttribute('type', 'text');
    answer3Field.setAttribute('class', "pergjigjja3");
    answer3Field.setAttribute('required', '');
    answer3Field.setAttribute('placeholder', "Shkruaj përgjigjen");
    answer4Field.setAttribute('id', String(questionNum) + "a4");
    answer4Field.setAttribute('type', 'text');
    answer4Field.setAttribute('class', "pergjigjja4");
    answer4Field.setAttribute('required', '');
    answer4Field.setAttribute('placeholder', "Shkruaj përgjigjen");
    correctField.setAttribute('id', 'correct' + String(questionNum));
    correctField.setAttribute('type', 'number');
    correctField.setAttribute('class', 'correct');
    correctField.setAttribute('required', '');
    correctField.setAttribute('min', '1');
    correctField.setAttribute('max', '4');
    
    newQuestionDiv.setAttribute('id', 'question-field');//Sets class of div
    
    newQuestionDiv.appendChild(questionLabel);
    newQuestionDiv.appendChild(questionField);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(inputImage);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(document.createElement('br'));
    //newQuestionDiv.appendChild(answer1Label);
    newQuestionDiv.appendChild(answer1Field);
    //newQuestionDiv.appendChild(answer2Label);
    newQuestionDiv.appendChild(answer2Field);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(document.createElement('br'));
    //newQuestionDiv.appendChild(answer3Label);
    newQuestionDiv.appendChild(answer3Field);
    //newQuestionDiv.appendChild(answer4Label);
    newQuestionDiv.appendChild(answer4Field);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(correctLabel);
    newQuestionDiv.appendChild(correctField);
    
    questionsDiv.appendChild(document.createElement('br'));//Creates a break between each question
    questionsDiv.appendChild(newQuestionDiv);//Adds the question div to the screen
    
    // newQuestionDiv.style.backgroundColor = randomColor();
}

//Called when user wants to exit quiz creator
function cancelQuiz(){
    if (confirm("A jeni të sigurt që dëshironi të largoheni? E gjithë puna e deritanishme do të FSHIHET!")) {
        window.location.href = "../../game/";
    }
}

socket.on('startGameFromCreator', function(data){
    window.location.href = "../../host/?id=" + data;
});

//Drag and drop file uploader
//selecting all required elements


// function previewFile(i) {
//     const preview = document.getElementById('previewImg');
//     const file = document.querySelector('input[type=file]').files[i];
//     const reader = new FileReader();
  
//     reader.addEventListener("load", function () {
//       // convert image file to base64 string
//       preview.src = reader.result;
//     }, false);
  
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   }
