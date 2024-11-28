import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'http://localhost:8000/users/';

const WelcomeMessage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        await axios.get(`${URL}${userId}`);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <h1 className="display-1">Bienvenido</h1>
    </div>
  );
};

export default WelcomeMessage;
