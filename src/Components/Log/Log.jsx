import React from 'react'
import './Log.css'
// import { Link } from 'react-router-dom'
export default function Log() {
  // const [mail,setMail] = useState('');
  // const [password,setPassword] = useState('');

  return (
    <div className='login'>
          <div className='login-empty-one'></div>
          <div className='login-empty-one'></div>
          <div className='login-empty-one'></div>
          <div></div>
          <div className='login-container'>
            <div className='login-container-left login-inner-container'></div>
            <div className='empty-vertical'></div>
            <div className='login-container-right login-inner-container'></div>
            <img className='login-women-img' alt='women' src='./asset/women.svg'></img>
            <img className='login-vector-img' alt='vector' src='./asset/foreground-img.svg'></img>
          </div>
          <div></div>
          <div className='login-empty-one'></div>
          <div className='login-empty-one'></div>
          <div className='login-empty-one'></div>
        
        
      {/* <Link to='/user'><div className='login-button'>Login</div></Link> */}
    </div>
  )
}


// import React, { useState } from 'react';
// import styles from './Log.Module.css';
// import { Link } from 'react-router-dom';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Check if credentials match 'admin' for both username and password
//     if (email === 'admin' && password === 'admin') {
//       console.log('Authentication successful');
//       alert('Login successful!');
//     } else {
//       console.log('Authentication failed');
//       alert('Invalid username or password!');
//     }
//   };

//   return (
//     <form className={styles.form} onSubmit={handleSubmit}>
//       <div className={styles.inputGroup}>
//         <label>Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
//       <div className={styles.inputGroup}>
//         <label>Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>
//       <Link to='/login'><button type="submit">Login</button></Link>
//     </form>
//   );
// };

// export default LoginForm;
