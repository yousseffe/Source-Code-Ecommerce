import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import Product from '../Product/Product';
import Loading from "../Loading/Loading";
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function Products() {
  const initialData = useRef([]);
  const initialPage = useRef(1);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [endOfWebsite, setEndOfWebsite] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  function GetProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`);
  }

  const { data: responseData, isLoading, isError, isFetching, refetch } = useQuery(['getProduct', page], GetProducts, {
    cacheTime: 45000,
    enabled: !endOfWebsite
  });

  useEffect(() => {
    if (!isLoading) {
      initialData.current = responseData?.data.data || [];
      initialPage.current = page;
    }
  }, [isLoading, responseData, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= document.body.offsetHeight - window.innerHeight - 100) {
        if (page < 2 && !endOfWebsite && !isLoadingMore) {
          setIsLoadingMore(true);
          setPage(prevPage => prevPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [endOfWebsite, isLoadingMore]);

  useEffect(() => {
    if (responseData?.data.data) {
      const idSet = new Set(data.map(item => item._id));
      const newData = responseData.data.data.filter(item => !idSet.has(item._id));
      setData(prevData => [...prevData, ...newData]);
    }
  }, [responseData]);

  useEffect(() => {
    if (page === 2 && responseData?.data.data.length === 0) {
      setEndOfWebsite(true);
    }
  }, [responseData, page]);

  useEffect(() => {
    if (page < 2 && !isLoading) {
      refetch();
    }
  }, [page, refetch, isLoading]);

  useEffect(() => {
    return () => {
      setData([]);
      setPage(1);
      setEndOfWebsite(false);
      setIsLoadingMore(false);
    };
  }, []);
  let x = useParams()

  if (isLoading && data.length === 0) return <Loading />;
  if (x != "/") return (
    <>
      <div className='container mt-6'>
        <div className='row'>
          {
            data.map((item) => {
              return <Product item={item} key={item._id} />
            })
          }
        </div>
      </div>
    </>
  )
  return (
    <div className='container my-5'>
      <div className='row'>
        {data.map(item => (
          <Product item={item} key={item._id} />
        ))}
        {isFetching && !isLoadingMore && <Loading />} {/* Show loading indicator only if not loading more */}
      </div>
    </div>
  );
}
