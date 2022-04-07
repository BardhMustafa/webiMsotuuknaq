firebase.auth().onAuthStateChanged((user) => {
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const phone = user.phoneNumber;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;
    setUidInServer(uid)
    const randomFromUid = uid.split("");


    console.log(uid);
    var temp_nickname = 'Guest' + Math.floor(Math.random() * 90000) + randomFromUid[27] + randomFromUid[7];
    // console.log(uid)


    if (displayName !== null) {
      document.getElementById('name').value = displayName;
      document.getElementById('host').innerHTML = 'Krijoni kuizin tuaj!';
    } else if (phone !== null) {
      document.getElementById('name').value = phone;
      document.getElementById('host').innerHTML = 'Krijoni kuizin tuaj!';
    } else {
      document.getElementById('host').innerHTML = '';
      document.getElementById('name').value = temp_nickname;
    }
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
  }

});




function setUidInServer(uid) {
  console.log(uid)
  const data = { uID: uid };

  fetch('/setId', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      // console.error('Error:', error);
    });
}




function logOut() {
  firebase.auth().signOut().then(() => {
    console.log('logged out');
    let uidtemp = ""
    setUidInServer(uidtemp);
    window.location.replace('../index.html');
  }).catch((error) => {
    alert('Ndodhi nje gabim', error);
  });
}
