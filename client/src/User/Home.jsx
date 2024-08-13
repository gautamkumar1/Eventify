import React from 'react';

const Home = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log("Home User data: ",userData.username);
    
  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-semibold text-white">
        Welcome to Your Dashboard, <span className="text-blue-400">{userData.username}</span>!
      </h1>
    </div>
  </div>
  );
};

export default Home;
