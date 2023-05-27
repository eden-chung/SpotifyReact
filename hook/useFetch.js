import {useState, useEffect} from 'react'
import axios from 'axios'


const useFetch = (endpoint, query) => {
    const[data, setData] = useState([])
    const[isLoading, setIsLoading] = useState(false);
    const[error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearchx.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': 'da44e7b9c2msh08b306ecc43d8b9p1385cfjsn1388e9297fd4',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
          },
        params: { ...query},
    };

    const fetchData = async() => {
        setIsLoading(true);

        try { 
            const response = await axios.request(options);

            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            //alert('There is an error')
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    //this returns a single object with 4 properties
    return { data, isLoading, error, refetch};
      
}

export default useFetch;