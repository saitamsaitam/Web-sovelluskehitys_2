


import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false); // holds the data that is still loading
  const [error, setError] = useState(null); // holds any errors that occur during our request

/*
	1. if the request succeeded it sets the data to the data that was returned from the api request
	2. if there was an error it will be cached inside of setError and we will set the error to be
	   equal to the error state
	3. we want to set loading to false regardless of if it succeeded or if there was any errors
	   which you can do with finally()

*/
  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      }).finally(() => {
		setLoading(false);
	  });
	  /*
	  useEffect needs a dependency array and the only dependency that we're going to put here is the url
	  because if the url changes then we want to request the new data
	   */
  }, [url]);


  const refetch = () => {
	setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      }).finally(() => {
		setLoading(false);
	  });
  };

  return { data, loading, error, refetch }
}

export default useFetch;
