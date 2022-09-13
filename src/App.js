import './App.css';
import React, { useEffect, useState } from "react";

import useFetchJobs from './useFetchJobs'
import {Container} from 'react-bootstrap'

function App() {
   const {jobs, loading, error} = useFetchJobs()
  
   return (
    <Container>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Again Later</h1>}
      <h1>{JSON.stringify(jobs)}</h1>
      
    </Container>
  );
}

export default App;

