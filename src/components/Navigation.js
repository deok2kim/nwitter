import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ userObj }) {
  console.log('로그인한 유저', userObj);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">
            {userObj.displayName ? userObj.displayName : userObj.id}의 Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
