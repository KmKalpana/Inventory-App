import React, { useState, useEffect } from 'react'
import './productList.scss'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { AiOutlineEye } from 'react-icons/ai'
import Search from '../Search/Search'
import { confirmAlert } from "react-confirm-alert";
import {Link} from 'react-router-dom'
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  selectFilteredProducts,
  FILTER_PRODUCTS,
} from '../../redux/features/product/filterSlice'
import {
  deleteProduct,
  getProducts,
} from "../../redux/features/product/productSlice";
import { useDispatch, useSelector } from 'react-redux'
const ProductList = ({ products }) => {
  const [search, setSearch] = useState("")
  const filteredProducts = useSelector(selectFilteredProducts)
  const dispatch = useDispatch();
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenText = text.substring(0, n).concat('...')
      return shortenText;
    }
    return text;
  }
   const delProduct = async (id) => {
    console.log(id);
    // @ts-ignore
    await dispatch(deleteProduct(id));
    // @ts-ignore
    await dispatch(getProducts());
  };
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };
  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }))
  }, [products, search, dispatch])
  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>
      </div>
      <div className="table">
        {products.length === 0 ? (
          <p>--No Products found, Please add a Product...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Value</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const { _id, name, category, price, quantity } = product
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{shortenText(name, 20)}</td>
                    <td>{category}</td>
                    <td>
                      {'$'}
                      {price}
                    </td>
                    <td>{quantity}</td>
                    <td>
                      {'$'}
                      {price * quantity}
                    </td>
                    <td className="icons">
                      <span>
                          <Link to={`/product-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                      <span>
                         <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                      </span>
                      <span>
                        <FaTrashAlt size={20} color={'red'}  onClick={() => confirmDelete(_id)}/>
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ProductList
