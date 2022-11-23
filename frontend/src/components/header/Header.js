import React from 'react';

const Header = () => {
    return (
        <div className='--pad header'>
            <div className='--flex-between'>
             <h3>
              <span className='--fw-thin'>Welcome,</span>
              <span className='--color-danger'>Kalpana</span>
              <button className='--btn --btn-danger'>LogOut</button>
             </h3>
            </div>
        </div>
    );
}

export default Header;
