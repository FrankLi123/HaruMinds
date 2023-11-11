import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TrendLineChart from './Components/TrendLineChart';
import { useNavigate, useParams, useLocation } from 'react-router-dom';


function GraphPage() {

    const [dataFetched, setDataFetched] = useState(false);
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('user_id');
    const userName = sessionStorage.getItem('user_name');
    const handleBackButton = ()=>{
        navigate(`/welcome`,{
            state : {
              user_id: userId,
              user_name: userName
            }
      }
        )
    }


  return (
    <div>
      <h1> Trend Line Chart</h1>
      {/* {dataFetched && dates.length > 0 && yesCount.length > 0 && <TrendLineChart dates={dates} yesCounts={yesCount}/> } */}
      {/* {dataFetched && dates.length > 0 && yesCount.length > 0 &&<TrendLineChart dates={dates} yesCounts={yesCount} />} */}
      {/* {dates.length > 0 && <TrendLineChart dates={dates} yesCounts={yesCount} />} */}
      <TrendLineChart /> 
      <button onClick={handleBackButton}>Back</button>
    </div>
  );
}

export default GraphPage;