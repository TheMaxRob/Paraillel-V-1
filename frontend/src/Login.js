import './Login.css'; 
import React, { useState } from 'react';

function Login({ onLogin }) {
  const [ isCreatingAccount, setIsCreatingAccount ] = useState(false);
  const [ isCreatingProfile, setIsCreatingProfile ] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const toggleAccountMode = () => {
    setIsCreatingAccount(!isCreatingAccount);
    if (isCreatingProfile) {
      setIsCreatingProfile(false);
    }
  };

  const toggleProfileMode = () => {
    setIsCreatingProfile(!isCreatingProfile);
    if (isCreatingAccount) {
      setIsCreatingAccount(false);
    }
  };
  return (
    <div className="login-container">
      {isCreatingAccount && <CreateAccountForm 
          onLogin={onLogin} 
          toggleAccountMode={toggleAccountMode} 
          toggleProfileMode={toggleProfileMode} 
          setUsername={setUsername}  
        /> }
      {isCreatingProfile && <CreateProfileForm 
        onLogin={onLogin} 
        toggleMode={toggleProfileMode} 
        username={username}
        password={password}
        /> }
      {!isCreatingAccount && !isCreatingProfile && (
        <LoginForm onLogin={onLogin} toggleMode={toggleAccountMode} />
      )}
    </div>
  );
}

function LoginForm({ onLogin, toggleMode }) {
  
  const [ localUsername, setLocalUsername ] = useState('');
  const [ localPassword, setLocalPassword ] = useState('');

  const validateLoginCredentials = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/login', { 
          method: 'POST',
          headers: {
              'Content-Type' : 'application/json',
          },
          body: JSON.stringify({ username, password }),
      });

      if (response.ok) { 
          return true;
      } else {
          const data = await response.json();
          if (data && data.message) {
              alert(data.message);
              return false;
          }
      }
  } catch (error) {
      console.error('Error:', error);
  }
  return false;
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidCredentials = true //await validateLoginCredentials(username, password);
    console.log("isValidCredentials: " + isValidCredentials);
      if (localUsername && localPassword && isValidCredentials) {
        onLogin(true);
        console.log("isValidCredentials: " + isValidCredentials);
        //window.location.href = '/home'; 
      } else {
      alert("Please enter a valid username and password.");
    }
    
    /*const isValidCredentials = await validateLoginCredentials(username, password, onLogin)
    
      if (username && password && isValidCredentials) {
        console.log(isValidCredentials)
        onLogin(true);
        window.location.href = '/home';
      } else {
      alert("Please enter a valid username and password.");
    }*/
  };
    

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          type="text"
          id='localUsername'
          value={localUsername}
          onChange={(e) => setLocalUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          type="password"
          id='localPassword'
          value={localPassword}
          onChange={(e) => setLocalPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      <button type="button" onClick={toggleMode}>
        Create an Account
      </button>
    </form>
  );

}

function CreateAccountForm({ onLogin, toggleAccountMode, toggleProfileMode, setUsername }) {
  const [localUsername, setLocalUsername] = useState('');
  const [email, setEmail] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  function validateSignupCredentials() {
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    let noError = true;
    if (localUsername.length < 3) {
      setUsernameError("Username must be 3 characters or longer.");
      console.log("Username Error!")
      noError = false;
    }
    if (localPassword.length < 8) {
      setPasswordError("Password must be 8 characters or longer.");
      console.log("Password Error!")
      noError = false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      console.log("Email error!")
      noError = false;
    }
    return noError;
  } 

  function createAccount() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    // Make a POST request to your Flask backend
    console.log("createAccount function called!");
    fetch('http://localhost:5000/create-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: localUsername,
            password,
            email
        })
    })
    .then(response => {
      console.log('Response status:', response.status);
        if (response.ok) {
          setUsername(localUsername);
          //console.log("isValidCredentials: " + isValidCredentials);
            //window.location.href = '/home';
        } else {
            return response.json();
        }
    })
    .then(data => {
        // If login is unsuccessful, show error message
        if (data && data.message) {
            alert(data.message);
            onLogin(true);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        onLogin(true);
    });
  }

  
  /*function createAccount() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    // Make a POST request to your Flask backend
    console.log("createAccount function called!");

    fetch('http://localhost:5000/create-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        })
    })
    .then(response => {
      console.log('Response status:', response.status);
        if (response.ok) {
            window.location.href = '/home';
        } else {
            return response.json();
        }
    })
    .then(data => {
        // If login is unsuccessful, show error message
        if (data && data.message) {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }*/

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localUsername || !email || !localPassword || localPassword !== confirmPassword) {
      alert('Please fill all fields correctly for account creation.');
      return;
    }
    const isValidSignupCredentials = validateSignupCredentials();

    if (isValidSignupCredentials) {
      createAccount();
    } else {
      return;
    }
    console.log('Creating account...');
    toggleAccountMode(); 
    toggleProfileMode();
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Create Account</h2>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          type="text"
          id='username'
          value={localUsername}
          onChange={(e) => setLocalUsername(e.target.value)}
        />
        <span className='credentials-error'>{usernameError}</span>
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          type="email"
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <span className='credentials-error'>{emailError}</span>
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          type="password"
          id='password'
          value={localPassword}
          onChange={(e) => setLocalPassword(e.target.value)}
        />
         <span className='credentials-error'>{passwordError}</span>
      </div>
      <div>
        <label htmlFor='confirmPassword'>Verify Password</label>
        <input
          type="password"
          id='confirmPassword'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button type="submit" onClick={handleSubmit}> Create Account</button>
      <button type="button" onClick={toggleAccountMode}>
        Already have an account? Login
      </button>
    </form>
  );
}

function CreateProfileForm({ onLogin, toggleProfileMode, username, password }) {
  const [ schoolId, setSchoolId ] = useState('');
  const [ districtId, setDistrictId ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ name, setName ] = useState('');


  function createProfile() {
    const name = document.getElementById('name').value;
    const districtId = document.getElementById('districtId').value;
    const schoolId = document.getElementById('schoolId').value;
    const address = document.getElementById('address').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    // Make a POST request to your Flask backend
    console.log("createProfile function called!");
    fetch('http://localhost:5000/create-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            name,
            districtId,
            schoolId,
            address,
            phoneNumber
        })
    })
    .then(response => {
      console.log('Response status:', response.status);
        if (response.ok) {
          onLogin(true);
          //console.log("isValidCredentials: " + isValidCredentials);
            //window.location.href = '/home';
        } else {
            return response.json();
        }
    })
    .then(data => {
        // If login is unsuccessful, show error message
        if (data && data.message) {
            alert(data.message);
            onLogin(true);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        onLogin(true);
    });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || ! districtId || !schoolId || !phoneNumber) {
      alert('Please fill all fields correctly for profile creation.');
      return;
    }
    console.log('Creating Profile...')
    createProfile();
    onLogin(true); 
  };

  return (
    <form onSubmit={handleSubmit} className='login-form'>
      <h2>Profile Information</h2>
      <div>
        <label htmlFor='name'>Full Name </label>
          <input
            type="text"
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        <label htmlFor='schoolId'>School ID</label>
          <input
            type="text"
            id='schoolId'
            value={schoolId}
            onChange={(e) => setSchoolId(e.target.value)}
          />
          <label htmlFor='districtId'>  District ID</label>
          <input
            type="text"
            id='districtId'
            value={districtId}
            onChange={(e) => setDistrictId(e.target.value)}
          />
          <label htmlFor='address'>Address</label>
          <input
            type="text"
            id='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor='phoneNumber'>&nbsp; &nbsp; &nbsp; Phone #</label>
          <input
            type="text"
            id='phoneNumber'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Create Profile
          </button>
      </div>
    </form>
  );
}
export default Login;