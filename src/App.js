import React from "react";
import useFetchJobs from "../src/api/useFetchJobs";
import { Container } from "react-bootstrap";

function App() {
  const { jobs, loading, error } = useFetchJobs();
  return (
    <Container>
      {loading && <h1>loading...</h1>}
      {error && <h1>Error. Try Refreshing</h1>}
      {jobs.length}
    </Container>
  );
}

export default App;
