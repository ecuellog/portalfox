import validator from 'validator';

function required(value) {
  if (!value.toString().trim().length) {
    return 'This field is required.';
  }
};
 
function email(value) {
  if (!validator.isEmail(value)) {
    return 'Invalid email.';
  }
};
 
function password(value) {
  if (value.toString().length < 6) {
    return 'Password must be at least 6 characters long.';
  }
};

function subdomain(value) {
  let patt = /^([a-z\-0-9])+$/g;
  let matched = patt.test(value.toString());
  if (!matched) {
    return 'Invalid subdomain';
  }
  if (value.toString().charAt(0) === '-') {
    return 'First character cannot be a hyphen.'
  }
  if (value.toString().charAt(value.toString().length - 1) === '-') {
    return 'Last character cannot be a hyphen.'
  }
  if (value.toString().length > 60) {
    return 'Subdomain cannot be longer than 60 characters.'
  }
}

export {
  required,
  email,
  password,
  subdomain
}