function validateLogin() {
    var userType = document.getElementById("login-type").value;
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;

    if (username === "user" && password === "pass" && userType =="manager" ) {
        window.location.href = "#";
        alert("Login successful as " + userType);
        return true;
    }
    else if(username === "user" && password === "pass" && userType =="client"){
        window.location.href = "index.html";
        alert("Login successful as " + userType);



        return true;
    }
     else {
        alert("Invalid username or password. Please try again.");
        return false;
    }
}
