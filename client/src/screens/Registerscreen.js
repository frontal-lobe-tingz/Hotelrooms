import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Success from '../components/Success';
import Loader from '../components/Loader';
import Error from '../components/Error';


function Registerscreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function register() {
    if (password === confirmPassword) {
      const user = {
        name,
        email,
        password,
      };
      try {
        setLoading(true);
        // Await the result and access .data after the promise resolves
        const response = await axios.post('https://hotelrooms-backend.onrender.comapi/user/register', user);
        console.log(response.data); // Response from backend
       // alert(response.data.message); // Shows success message
     setLoading(false)
     setSuccess(true)

setName('')
setEmail('')
setPassword('')
setConfirmPassword('')


      } catch (err) {
        console.error('Error details:', err.response ? err.response.data : err.message); // Detailed error
     setLoading(false)
     setError(true)
        alert("Error during registration: " + (err.response ? err.response.data.error : err.message));
     
      }
    } else {
      alert('Passwords do not match');
    }
  }

  return (
    <div>
      {loading && (<Loader />)}
      {error && (<Error />)}
     <div className='row justify-content-center mt-5'>
      <div className='col-md-5 mt-5'>

      {success && (<Success message ='Registration success' />)}
     
<div className='bs'>
  <h2>Register</h2>
  <input type='text' className="form-control" placeholder="name"
  value={name} onChange={(e)=>{setName(e.target.value)}}/>

  <input type="text" className="form-control" placeholder="email"
    value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

  <input type="text" className="form-control" placeholder="password"
    value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

  <input type="text" className="form-control" placeholder="confirm password"
    value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>

<button type="submit" className="btn btn-primary mt-2" onClick={register}>
  Register
</button >

  <p>Already have an account? <a href='/login'>Login</a></p>
  
 
</div>

      </div>

      </div>
    </div>
  )
}

export default Registerscreen