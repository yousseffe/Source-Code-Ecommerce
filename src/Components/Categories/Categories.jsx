import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios'
import Loading from "../Loading/Loading";
import Category from '../Category/Category';
export default function Categories() {
  function GetCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories/')
  }
  let { data, isLoading, isError, isFetching } = useQuery('GetCategories', GetCategories, {
    cacheTime: 45000
  })
  if (isLoading) return <Loading />
  return (
    <>
      <div className='container mt-6'>
        <div className='row gy-4'>
          {
            data?.data.data.map((item) => {
              return <Category item={item} key={item._id} />
            })
          }
        </div>
      </div>

    </>
  )
}
