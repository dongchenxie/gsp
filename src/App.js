import './App.css';
import React, { useEffect, useState } from "react";

import useFetchJobs from './useFetchJobs'
import {Container} from 'react-bootstrap'

function App() {
   const {jobs, loading, error} = useFetchJobs()
  const JOBS_API = 'https://projects.test.api.goldspot.ca'
  
   return (
    <Container>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Again Later</h1>}
      <h1>{jobs.length}</h1>
      
    </Container>
  );
}

export default App;

