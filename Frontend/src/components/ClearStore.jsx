import React from 'react';
import { Button } from './ui/button';
import { clearStore } from '@/utils/clearStore';
import { useNavigate } from 'react-router-dom';

const ClearStore = () => {
    const navigate = useNavigate();

    const handleClearStore = () => {
        clearStore();
        navigate('/login');
    };

    return (
        <div className="fixed bottom-4 right-4">
            <Button 
                onClick={handleClearStore}
                className="bg-red-500 hover:bg-red-600"
            >
                Clear Store
            </Button>
        </div>
    );
};

export default ClearStore; 