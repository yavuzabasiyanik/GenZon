import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import mypic from '../../../images/GenZon-logos_black.png';
import './Loginform.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUser = async (e) =>{
    e.preventDefault();

    const data = await dispatch(login('sifuhotman','123321'));
    if (data) {
      setErrors(data);
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className='login-big-div'>
        <img width='200' src={mypic} alt='cool' ></img>
        <div className='loginform'>
          <div className='realForm'>

            <h1 className='signin'>Sign-In</h1>

            <div>
              <div className='signinerrors'>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <form onSubmit={onLogin}>
                <div className='username-thingy-signin'>
                  <label className='labelusername' htmlFor='email'>Username</label>
                  <input
                    className='input-thingy-singin'
                    name='username'
                    type='text'
                    value={email}
                    onChange={updateEmail}
                  />
                </div>
                <div className='username-thingy-signin'>
                  <label className='labelusername' htmlFor='password'>Password</label>
                  <input
                    className='input-thingy-singin'
                    name='password'
                    type='password'
                    value={password}
                    onChange={updatePassword}
                  />
                  <button className='submitsigninform' type='submit'>Sign In</button>
                </div>
              </form>

            </div>
          </div>
          <div className='somethinghahah'>

            <h5 className='newToGenzon'>New to GenZon?</h5>
          </div>
          <button onClick={demoUser} className='createyourgenzonaccount' type='submit'>Login as Demo User</button>
          <NavLink to={'/signup'}><button className='createyourgenzonaccount' type='submit'>Create your GenZon account</button></NavLink>

        </div>
      </div>

    </>

  );
};

export default LoginForm;
