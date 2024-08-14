import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../api/getApiURL';

const useFetchLatestDeposit = (userId, coinId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function to fetch the data
    const fetchLatestDeposit = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/deposits/latest/${userId}/coin/${coinId}`);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch the data only if userId and coinId are provided
    if (userId && coinId) {
      fetchLatestDeposit();
    }
  }, [userId, coinId]);

  return { data, loading, error };
};

export default useFetchLatestDeposit;
