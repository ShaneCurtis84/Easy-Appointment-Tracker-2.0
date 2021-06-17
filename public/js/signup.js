const body = document.querySelector("body");
body.setAttribute("style", "display: flex; flex-direction: column;");

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    if (!email.includes('@')) {
      alert('Email address must contain an @ symbol');
      return;
    }
    if (password.length < 6){
      alert('Length of password must be 6 or more characters');
      return;
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    }else {
      alert('User already exists, please click on login');
    }
    
  } else {
    alert('User name, email and password must all be entered');
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
