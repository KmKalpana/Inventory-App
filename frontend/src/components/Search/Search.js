import React from 'react';
// @ts-ignore
import styles from './search.module.scss'
// @ts-ignore
import {BiSearch} from 'react-icons/bi'
const Search = ({value, onChange}) => {
    return (
        <div className={styles.search}>
        <BiSearch size={18} className={styles.icon}/>
        <input type="text" placeholder='Search By Name' value={value} onChange={onchange}/>
        </div>
    );
}

export default Search;
