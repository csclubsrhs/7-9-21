window.logout = function logout() {
	localStorage.setItem("name", "");
	localStorage.setItem("authToken", "");
	location.href = 'https://alertradio76.qoom.space/~/nightcode/'
}


async function addUser() {
	
	let fn = document.getElementById('fn').value;
	let ln = document.getElementById('ln').value;
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	let passwordCheck = document.getElementById('password-repeat').value;
	
	let $resultDiv = document.getElementById("resultMessage");
	

	
	if (fn == "" || ln == "" || email == "" || password == "") {
		$resultDiv.innerHTML = "<label style='background: red; padding: 10px; margin: 10px;' for='result'><b>Please fill out every field</b></label>";
		return;
	}
	
	if (!/^[A-Za-z]+$/.test(fn) || !/^[A-Za-z0-9]+$/.test(ln) ) {
		$resultDiv.innerHTML = "<label style='background: red; padding: 10px; margin: 10px;' for='result'><b>Please input a valid name. If your name contains numbers or symbols, please contact us. </b></label>";
		return;
	}
	
	if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) == false){
		$resultDiv.innerHTML = "<label style='background: red; padding: 10px; margin: 10px;' for='result'><b>Please input a valid email</b></label>";
		return;
	}
	
	if (/(?=(.*[0-9]))(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/.test(password) == false) {
		$resultDiv.innerHTML = "<label style='background: red; padding: 10px; margin: 10px;' for='result'><b>A password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long</b></label>";
		return;
	}
	
	if (password != passwordCheck) {
		$resultDiv.innerHTML = "<label style='background: red; padding: 10px; margin: 10px;' for='result'><b>Passwords do not match</b></label>";
		return;
	}
	
	

	
	const resp = await fetch('https://blankety-powders.000webhostapp.com/addUser.php', {
	    method: 'POST',
	    body: new URLSearchParams({
	        'email': email,
	        'first': fn,
	        'last': ln,
	        'password': password
	    })
	});
	
	const responseMessage = await resp.text();
	
	if (responseMessage.includes("ail")){
	$resultDiv.innerHTML = "<label style='background: red; padding: 10px; margin: 10px;' for='result'><b>An email with this account already exists. Please log in.</b></label>";
	} else {
		
		$resultDiv.innerHTML = "<label style='background: lightgreen; padding: 10px; margin: 10px;' for='result'><b>Signup successful!</b></label>";
		localStorage.setItem("name", fn + " " + ln)
		localStorage.setItem("authToken", email);
		
		setTimeout(function(){window.location.href = "https://alertradio76.qoom.space/~/nightcode/app"},5000);
		
	}
	
	
}

async function loginUser() {
	
	let email = document.getElementById('emailInput').value;
	let password = document.getElementById('passwordInput').value;
	
	let $resultDiv = document.getElementById("resultMessage");
		
	if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) == false){
		$resultDiv.innerHTML = "<label style='background: red; padding: 10px; margin: 10px;' for='result'><b>Please input a valid email</b></label>";
		return;
	}
	
	const resp = await fetch('https://blankety-powders.000webhostapp.com/login.php', {
	    method: 'POST',
	    body: new URLSearchParams({
	        'email': email,
	        'password': password
	    })
	});
	
	const responseJSON = await resp.json();


	if (responseJSON.length == 0){
		$resultDiv.innerHTML = "<label style='background: red; padding: 10px; margin: 10px;' for='result'><b>Email or password is incorrect! <br> Remember, a password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long</b></label>";
	} else {

		
		localStorage.setItem("name", responseJSON[0].firstname + " " + responseJSON[0].lastname);
		localStorage.setItem("authToken", email);
		
		setTimeout(function(){window.location.href = "https://alertradio76.qoom.space/~/nightcode/app"},1000);
		
	}
	
	
}


let name  = localStorage.getItem("name");
let email = localStorage.getItem("authToken");

if (email != null) {
	console.log(email);
}


if (email != null && email != "") { // if we are logged in
	document.getElementById("navMenu")
	.innerHTML =
	'<div class="container-fluid">' +
	'<a style="margin-left: 15px" class="navbar-brand" href="index.html">' +
	'<img style="margin-right: 5px;" src="https://image.flaticon.com/icons/png/512/747/747775.png" alt="" width="40" height="40" target="_top">' +
	'Mention' +
	'</a>' +
	'<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">' +
	'<span class="navbar-toggler-icon"></span>' +
	'</button>' +
	'<div class="collapse navbar-collapse" id="navbarText">' +
	'<ul class="navbar-nav me-auto mb-2 mb-lg-0" >' +
	'<li class="nav-item" target="_top">' +
	'<a class="nav-link" href="index.html">Home</a>' +
	'</li>' +
	'<li class="nav-item" target="_top">' +
	'<a class="nav-link" href="about.html">About Us</a>' +
	'</li>' +
	'<li class="nav-item" target="_top">' +
	'<a class="nav-link" href="contactourteam.html">Contact Our Team</a>' +
	'</li>' +
	'</ul>' +
	'<div class="btn-group">'+
	'<button type="button" class="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">'+
		name + 
	'</button>' +
	'<ul class="dropdown-menu dropdown-menu-end">'+
		'<li><label class="dropdown-item">' + email + '</label></li>'+
		'<li><a href="app.html"><div><button type="button" class="dropdown-item">Launch Mention</button></div></a></li>'+
		'<li><div><button type="button" class="dropdown-item" onClick="logout()">Logout</button></div></li>'+
	'</ul>' +
	'</div>'
} else {
	document.getElementById("navMenu")
	.innerHTML =
	'<div class="container-fluid">' +
	'<a style="margin-left: 15px" class="navbar-brand" href="index.html">' +
	'<img style="margin-right: 5px;"  src="https://image.flaticon.com/icons/png/512/747/747775.png" alt="" width="40" height="40" target="_top">' +
	'Mention' +
	'</a>' +
	'<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">' +
	'<span class="navbar-toggler-icon"></span>' +
	'</button>' +
	'<div class="collapse navbar-collapse" id="navbarText">' +
	'<ul class="navbar-nav me-auto mb-2 mb-lg-0" >' +
	'<li class="nav-item" target="_top">' +
	'<a class="nav-link" href="index.html">Home</a>' +
	'</li>' +
	'<li class="nav-item" target="_top">' +
	'<a class="nav-link" href="about.html">About Us</a>' +
	'</li>' +
	'<li class="nav-item" target="_top">' +
	'<a class="nav-link" href="contactourteam.html">Contact Our Team</a>' +
	'</li>' +
	'</ul>' +
	'<div><a href="signup.html"><button style="margin-right: 20px;" type="button" class="btn btn-outline-info">Sign Up</button></a></div>' +
	'<div><a href="login.html"><button type="button" class="btn btn-outline-info">Login</button></a></div>' +
	'</div>' +
	'</div>';
}