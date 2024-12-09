import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
//   const [dashboardData, setDashboardData] = useState<any>(null);
  const navigate = useNavigate();
  
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
      if (!token) {
          navigate('/sign-in'); 
          return;
      }

      console.log("Fetching dashboard with userId:", userId);

      axios.get(`http://localhost:3333/users/:userId/dashboard`, {
          headers: { Authorization: token } 
      })
      .then(response => {
        //   response = res
        //   setDashboardData(response); 
          console.log(response)
      })
      .catch(error => {
          if (error.response && error.response.status === 401) {
              navigate("/sign-in");  
          } else if (error.response && error.response.status === 403) {
            navigate("/sign-in");
          } else {
              console.error("Error accessing dashboard:", error);
              navigate("/sign-in")
          }
      });
  }, [userId, token, navigate]);

//   if (!dashboardData) return <p>Loading...</p>;

  return (
      <div>
          <h1>Welcome</h1>
      </div>
  );
};

export default Dashboard;
