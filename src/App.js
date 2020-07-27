import React, { useState } from "react";
import useFetchJobs from "../src/api/useFetchJobs";
import { Container } from "react-bootstrap";
import Job from "../src/components/Job";

function App() {
  const [params, setParams] = useState({});
  const [pageNumber, setPageNumber] = useState(1);

  const { jobs, loading, error } = useFetchJobs(params, pageNumber);
  return (
    <Container>
      {loading && <h1>loading...</h1>}
      {error && <h1>Error. Try Refreshing</h1>}

      {/* <h1> {jobs.length}</h1> */}
      {jobs.map((job) => {
        return <Job key={job.id} job={job}></Job>;
      })}
    </Container>
  );
}

export default App;
