import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../Loading/Loading';
import Brand from '../Brand/Brand';

export default function Brands() {
  const initialData = useRef([]);
  const initialPage = useRef(1);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [endOfWebsite, setEndOfWebsite] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  function GetBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/Brands?page=${page}`);
  }

  const { data: responseData, isLoading, isError, isFetching, refetch } = useQuery(['GetBrands', page], GetBrands, {
    cacheTime: 45000,
    enabled: !endOfWebsite,  // Disable query when endOfWebsite is true
    refetchOnWindowFocus: false,
    refetchOnMount: false
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
          setIsLoadingMore(true); // Set loading more to true before fetching
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
    // Refetch data for page 1 when the component mounts or remounts
    setPage(1);
    setEndOfWebsite(false);
    setIsLoadingMore(false);
    refetch();

    // Scroll to top when the component mounts or remounts
    window.scrollTo(0, 0);
  }, []);

  if (isLoading && data.length === 0) return <Loading />;

  return (
    <div className='container mt-6'>
      <div className='row gy-4'>
        {data.map(item => (
          <Brand item={item} key={item._id} />
        ))}
        {isFetching && !isLoadingMore && <Loading />}
      </div>
    </div>
  );
}
