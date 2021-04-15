var db = firebase.firestore();

let name=document.querySelectorAll("#name");
let username = document.getElementById("username");
let profile = document.querySelectorAll("#profile");
let message__sendBtn = document.getElementById("message_send");
let messageContainer = document.getElementById("message-container");
message__sendBtn.addEventListener("click", sendFunction);

function sendFunction(){
//agar user hai to add this message to debugger
let messagetext = document.getElementById("message_text").value;

//if message input is  black to ye return hoga
if(messagetext == " "){
  return;
}

//if message input is availabel then it is return on console
console.log(messagetext);

firebase.auth().onAuthStateChanged(function(user){
  if(user){
    console.log("this is in send message function ",user);

    //db connection with message_send
    db.collection("messages")
    .add({
      message:messagetext,
      username:user.displayName,
      email:user.email,
      photo:user.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(function(decRef){
      //database me message add hone ke bad console pe ye print hoga
      console.log("message send"); 
    })
    .catch(function(error){
      //error catch 
      console.log("Error adding document:",error);
    });
  }else{
    alert("Please log in do not cheat us");
  }
  
   

});

document.getElementById("message_text").value ="";
}


console.log(profile);
let logout__btn = document.getElementById("logout");


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user);
    console.log(" user alredy loged in");

    profile.forEach((item) => {
      item.src = user.photoURL;
    });

    name.forEach((item) => {
      item.textContent = user.displayName;
    });


  
  } else {
    window.location.replace("/index.html");
  }
});

logout__btn.addEventListener("click", logoutMe);

function logoutMe() {
  firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {

db.collection("messages").orderBy("timestamp", "asc").onSnapshot(function (snapshot) {
  snapshot.docChanges().forEach(function (change) {
    if (change.type === "added") {
      console.log(change.doc.data());
      const messageTemplate = ` 
      <div
      class="message mt-4" id="message"
      style="padding: 10px; border-radius: 10px;height:100px;"
    >
      <!-- this is my message head contain img name and time-->
      <div class="message_head d-flex align-items-center">
        <img
          src="${change.doc.data().photo}"
          class="rounded-circle"
          width="40px"
        />

        <p  style="margin: 0; padding: 0; padding-left: 10px; flex: 1">
         ${change.doc.data().username}
        </p>
     
      </div>
      <!-- this is my message -->
      <p class="mt-2 px-2" style="display:inline-block;">${change.doc.data().message}</p>
    </div>`;
      messageContainer.insertAdjacentHTML("afterbegin", messageTemplate);

      const smallmessageTemplate = `       
      <div class="chatmessage ${
        change.doc.data().username == user.displayName ? "mine" : ""
      }  d-flex align-items-center">
      <img
        class="rounded-circle"
        width="40px"
        src="${change.doc.data().photo}"
        alt=""
      />
      <p style="padding: 0; margin: 0 10px;display:inline-block;">${change.doc.data().message}</p>
    </div>
    `;
            document
              .getElementById("chatmessages")
              .insertAdjacentHTML("afterbegin", smallmessageTemplate);
    }
  });
});

  } 

});