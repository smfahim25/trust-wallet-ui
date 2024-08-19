import React from 'react';
import { useUser } from '../../../context/UserContext';

const Settings = () => {
    const { setLoading } = useUser();
    return (
        <div>
            <h2>Settings page</h2>
        </div>
    );
};

export default Settings;