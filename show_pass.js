function showPassword() {
    const passwordField = document.querySelector('input[name="password"]');
    const showPassIcon = document.getElementById('show_pass');
    if (passwordField.type === 'password') {
    passwordField.type = 'text';
    showPassIcon.src = 'others/eye.png';
    } 
    else {
    passwordField.type = 'password';
    showPassIcon.src = 'others/blink.png';
    }
}

function showPassword2(){
    const confirmpasswordField = document.querySelector('input[name="confirm_password"]');
    const showPassIcon = document.getElementById('show_pass2');
    if (confirmpasswordField.type === 'password') {
    confirmpasswordField.type = 'text';
    showPassIcon.src = 'others/eye.png';
    } 
    else {
    confirmpasswordField.type = 'password';
    showPassIcon.src = 'others/blink.png';
    }
}