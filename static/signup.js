$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


function isNumberKey(evt){
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if(charCode > 31 && (charCode <48 || charCode >57)){
		return false;
	}
	else{
		return true;
	}
}


function validatForm(){

			const nameRegex = (/^[a-zA-Z]+$/);

			const passwordRegex = (/^[A-Za-z0-9@$_]*$/);
			
			var name = document.getElementById("inputName");
			if(name.value==null || name.value==""){
					alert("Name cannot be blank");
					name.focus();
					return false;
			}

			if(!nameRegex.test(name.value)){
					alert("Name cannot contain numbers, space or special characters");
					name.focus();
					return false;
			}	
			
			var phone = document.getElementById("inputPhone");
			if(phone.value==null || phone.value==""){
					alert("Phone number cannot be empty");
					phone.focus();
					return false;
			}

			if(phone.value.length!=10){
					alert("Phone number must have 10 digits");
					return false;
			}

			var email = document.getElementById("inputEmail");
			if(email.value==null || email.value==""){
					alert("Email cannot be empty");
					email.focus();
					return false;
			} 

			var password = document.getElementById("inputPassword");
			if(password.value==null || password.value==""){
					alert("Password cannot be empty");
					password.focus();
					return false;
			}

			if(password.value.length<8){
					alert("Password must have more than 8 characters");
					return false;
			}

			if(password.value.length>20){
					alert("Password must have less than 20 characters");
					return false;
			}

			if(!passwordRegex.test(password.value)){
					alert("Password cannot contain spaces, special characters, or emoji");
					return false;
			}

			var profession = document.getElementById("inputProfession");
			if(profession.value==null || profession.value==""){
					alert("Please select profession!");
					profession.focus();
					return false;
			}			

}	
