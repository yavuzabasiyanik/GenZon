import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import mypic from '../../../images/GenZon-logos_black.png';
import { login } from '../../../store/session';
import './Signup.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
      const data = await dispatch(signUp(username, profilePic, password,repeatPassword));
      if (data) {
        setErrors(data)
      }
  };

  const demoUser = async (e) =>{
    e.preventDefault();

    const data = await dispatch(login('sifuhotman','123321'));
    if (data) {
      setErrors(data);
    }

  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateProfilePic = (e) => {
    setProfilePic(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className='login-big-div-signup'>
        <img style={{marginTop:"3.3%"}} width='200' src={mypic} alt='cool' ></img>
        <div  className='loginform'>
          <div className='realForm'>

            <h1 className='signin'>Sign-Up</h1>

            <div>
              <div className='signinerrors'>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <form onSubmit={onSignUp}>
                <div className='username-thingy-signin'>
                  <label className='labelusername' >Username</label>
                  <input
                    className='input-thingy-singin'
                    type='text'
                    name='username'
                    onChange={updateUsername}
                    value={username}
                  ></input>
                </div>

                <div className='username-thingy-signin'>
                  <label className='labelusername'>Profile Picture</label>
                  <input
                    className='input-thingy-singin'
                    type='text'
                    name='email'
                    onChange={updateProfilePic}
                    value={profilePic}
                  ></input>
                </div>
                <div className='username-thingy-signin'>
                  <label className='labelusername'>Password</label>
                  <input
                    className='input-thingy-singin'
                    type='password'
                    name='password'
                    onChange={updatePassword}
                    value={password}
                  ></input>
                </div>
                <div className='username-thingy-signin'>
                  <label className='labelusername'>Repeat Password</label>
                  <input
                    className='input-thingy-singin'
                    type='password'
                    name='repeat_password'
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                  ></input>
                </div>
                <button className='submitsigninform' type='submit'>Sign Up</button>
              </form>
            </div>
          </div>
          <div className='somethinghahah'>

            <h5 className='newToGenzon'>Already have an account?</h5>
          </div>

          <button onClick={demoUser} className='createyourgenzonaccount' type='submit'>Login as Demo User</button>
          <NavLink to={'/login'}><button className='createyourgenzonaccount' type='submit'>Login to your GenZon account</button></NavLink>
        </div>
      </div>

    </>

  );
};

export default SignUpForm;
