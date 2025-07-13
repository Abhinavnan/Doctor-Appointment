
function Validate(name, value, input) {
    //let inputError = {error: false, helperText: ''};
    const type = input[name].type;
    let error= false, helperText= '', phoneNumber;
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^[\w-+\.]+@\w+(\.\w+)+$/;

    switch(type) {
        case 'password':
            error = value.length < 6;
            helperText = error ? 'Invalid Password' : '';
            break; 
        case 'email':
            error = !emailRegex.test(value);
            helperText = error ? 'Invalid Email' : '';
            break;
        default:
            break;
    }

    switch(name) {
        case 'phoneNumber':
            phoneNumber = Math.abs(value);
            error = String(phoneNumber).length !== 10;
            helperText = error ? 'Invalid Phone Number' : '';
            return {error, helperText, type};
        default:
            return {error, helperText, type};
    }  
}

export default Validate;