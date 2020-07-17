function validateForm(){

	var employeeId = document.getElementById('inputName');
	if(employeeId.value==null || employeeId.value==""){
		alert("Please enter employee ID");
		employeeId.focus();
		return false;
	}

	var password = document.getElementById('inputPassword');
	if(password.value==null || password.value==""){
		alert("Please enter password");
		password.focus();
		return false;
	}
}