let google =document.querySelector("#googlelogin")

google.addEventListener("click",loginWithGoogle);

function loginWithGoogle() {
 var provider=new firebase.auth.GoogleAuthProvider();

 firebase
   .auth()
   .signInWithPopup(provider)
   .then(function(result) {
       var user = result.user;
       console.log(user);
       console.log("this is my email",user.email);
       console.log("this is my name",user.displayName);
       console.log("this is my photourl",user.photoURL);

       window.location.replace("/messaging.html");

   })

   .catch(function(error) {
       console.log(error);
   });

}