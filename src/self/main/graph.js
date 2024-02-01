import React from 'react';
// import { Link } from 'react-router-dom';
import TrendLineChart from './TrendLineChart';
// import { useNavigate} from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const  GraphPage = ({setShowStart})=>  {
    
    // const [dataFetched, setDataFetched] = useState(false);
    // const navigate = useNavigate();
    // const userId = sessionStorage.getItem('user_id');
    // const userName = sessionStorage.getItem('user_name');
    
    const handleBackButton = ()=>{
  
        setShowStart(1);
    }
  return (
    <div>
      <h1> Trend Line Chart</h1>
      <TrendLineChart /> 
      <button onClick={handleBackButton}>Back</button>
    </div>
  );
}

export default GraphPage;