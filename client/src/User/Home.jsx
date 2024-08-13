
const Home = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
  
    // Check if userData is not null and has the username property
    const username = userData ? userData.username : 'Guest';
  
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-white">
            Welcome to Your Dashboard, <span className="text-blue-400">{username}</span>!
          </h1>
        </div>
      </div>
    );
  };
  
  export default Home;
  
