import { useState, useEffect } from 'react';
import API_BASE_URL from '../api/getApiURL';

const useWallets = () => {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWalletInfo = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/wallets`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setWallets(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWalletInfo();
    }, []);

    return { wallets, loading, error };
};

export default useWallets;
