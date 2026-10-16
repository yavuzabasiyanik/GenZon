import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
// import LogoutButton from '../auth/LogoutButton';
import './Navbar.css';
import { logout } from '../../store/session';
import cartIcon from '../../images/cart-icon.svg';
// import mypic from '../../images/GenZon-logos_black.png';
// import ProductForm from '../ProductForm/ProductForm';

const NavBar = () => {

  const [showProfile, setShowProfile] = useState(false);
  const user = useSelector(state => state.session.user);

  const [filterData, setFilter] = useState([]);
  const [search, setSearch] = useState('');


  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/login');
    setShowProfile(false)
  };

  let shoppingcart = useSelector(state => Object.values(state.shoppingcart));

  shoppingcart = shoppingcart.filter(ele => ele?.user_id === user?.id);

  const cartLength = shoppingcart.length

  const products = useSelector(state => Object.values(state.products));

  let menuRef = useRef();

  useEffect(() => {

    const handler = (event) => {

      if (!menuRef.current.contains(event.target)) {

        setShowProfile(false);
      }
    }

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler)
    }

  })
  let searcRef = useRef();

  useEffect(() => {

    const handler = (event) => {

      if (!searcRef.current.contains(event.target)) {

        setFilter([]);
      }
    }

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler)
    }

  })
  const handleFilter = (e) => {
    const search = e.target.value

    const newFilter = products?.filter(val => {

      return val?.name.toLowerCase().includes(search.toLowerCase());
    });

    setSearch(search);

    if (search === '') {
      setFilter([])
    } else {
      setFilter(newFilter)
    }
  }

  const handleClickSearch = (e) => {
    setSearch(e)
    setFilter([])
  }


  return (
    <>
      <nav>
        <div className='uppernav'>
          <div className='navbar-left-part'>

            <NavLink to={'/'}><p className='genzonnavbar'>GenZon</p></NavLink>
          </div>
          <div className='delivertodiv'>
            {
              user &&
              <p className='deliverto'>Deliver to {user?.username}</p>
            }
          </div>

          <div className='search'>
            <div className='left-all'>

              All
              {/* <i className="fa-solid fa-sort-down colorchangecarretdown"></i> */}
            </div>

            <input className='searchinput' type='search' onChange={handleFilter} value={search} onClick={(e) => setSearch('')}></input>
            <div ref={searcRef} className={filterData?.length === 0 ? 'search-name-container' : 'search-name-container-clickled'}>
              {filterData?.slice(0, 10).map((value, index) => {
                return <NavLink key={index} exact to={`/productpage/${value?.id}`}>
                  <div className='dataItem' onClick={(e) => handleClickSearch(value?.name)} key={index}><p>{value?.name}</p></div>
                </NavLink>
              })

              }
            </div>
            <div className='right-search-thingy'>
              <i className="fa-solid fa-magnifying-glass search-logo-thingy"></i>
            </div>
          </div>

          <div className='div-nav-right-ana'>
            <div ref={menuRef}>

              <div onClick={() => setShowProfile(e => !e)} className='right-most-left-part-navbar'>
                <p className='hello-someone'>Hello, {user?.username || 'Sign in'}</p>
                <span className='listings-onthenavbar'>Account & Lists<i className="fa-solid fa-sort-down accountlistdropdownicon"></i></span>
              </div>
              {showProfile && user &&
                <div className='dropdownprofile'>
                  <NavLink exact to={'/'} onClick={() => setShowProfile(false)}>
                    <div className='accounts-listings'>

                      <p className='bold'>Home</p>

                    </div>
                  </NavLink>
                  <NavLink exact to={'/user/cart'} onClick={() => setShowProfile(false)}>

                    <div className='accounts-listings'>

                      <p className='bold notsobold'>Shopping Cart</p>

                    </div>
                  </NavLink>
                  <NavLink exact to={'/orders'} onClick={() => setShowProfile(false)}>

                    <div className='accounts-listings'>

                      <p className='bold notsobold'>Returns % Orders</p>

                    </div>
                  </NavLink>

                  <NavLink exact to={'/user/products'} onClick={() => setShowProfile(false)}>
                    <div className='accounts-listings'>

                      <p className='bold notsobold'>Your products</p>

                    </div>
                  </NavLink>

                  <NavLink exact to={'/product/sell'} onClick={() => setShowProfile(false)}>
                    <div className='accounts-listings'>

                      <p className='bold notsobold'>Sell an Item</p>

                    </div>
                  </NavLink>

                  <div style={{ cursor: "pointer" }} onClick={onLogout} className='accounts-listings noborder'>

                    <p className='bold'>Logout</p>

                  </div>

                </div>
              }
              {showProfile && !user &&
                <div className='dropdownprofile' style={{ height: "150px" }}>
                  <NavLink exact to={'/'} onClick={() => setShowProfile(false)}>
                    <div className='accounts-listings'>

                      <p className='bold'>Home</p>

                    </div>
                  </NavLink>
                  <NavLink exact to={'/login'} onClick={() => setShowProfile(false)}>

                    <div className='accounts-listings'>

                      <p className='bold notsobold'>Login</p>

                    </div>
                  </NavLink>

                  <NavLink exact to={'/signup'} onClick={() => setShowProfile(false)}>
                    <div className='accounts-listings' style={{ border: "none" }}>

                      <p className='bold notsobold'>Signup</p>

                    </div>
                  </NavLink>

                </div>
              }
            </div>

            <NavLink exact to={'/orders'}>
              <div className='right-mid-part-navbar'>
                <span className='returns-be-specificlol'>Returns</span>
                <span className='orders-be-specificlol'>& Orders</span>
              </div>
            </NavLink>

            <NavLink exact to={`/user/cart`}><div className='shopping-cart-thingy'>

              <img alt='Cart' src={cartIcon}></img>
              <p className='numbershoppingcart'>{user ? cartLength : 0}</p>
              <p className='cartnaming'>Cart</p>
            </div></NavLink>
          </div>

        </div>

        <div className='lowernav'>
          <div className='dana-lowernavpart'>
            <NavLink exact to={`/allproducts/${0}`}>
              <div className='lowernav-allpart'>

                <i className="fa-solid fa-bars habmurgerall"></i>
                <p>All</p>
              </div>
            </NavLink>
            <NavLink exact to={`/allproducts/${1}`}>

              <div className='lowernav-allpart'>
                <p>Electronics</p>
              </div>
            </NavLink>
            <NavLink exact to={`/allproducts/${2}`}>

              <div className='lowernav-allpart'>
                <p>Fashion</p>
              </div>
            </NavLink>
            <NavLink exact to={`/allproducts/${3}`}>

              <div className='lowernav-allpart'>
                <p>Furniture</p>
              </div>
            </NavLink>
            <NavLink exact to={`/allproducts/${4}`}>

              <div className='lowernav-allpart'>
                <p>Food</p>
              </div>
            </NavLink>
            <NavLink exact to={`/allproducts/${5}`}>

              <div className='lowernav-allpart'>
                <p>Hobby</p>
              </div>
            </NavLink>
            <div className='rightpartlinkedingithub'>
              <a rel="noreferrer" href="https://github.com/yavuzabasiyanik" target="_blank"><i className="githublinked fa-brands fa-github"></i></a>
              <a rel="noreferrer" href="https://www.linkedin.com/in/yavuzabasiyanik/" target="_blank"><i className="githublinked fa-brands fa-linkedin"></i></a>
            </div>
          </div>
        </div>

      </nav>

    </>

  );
}

export default NavBar;
