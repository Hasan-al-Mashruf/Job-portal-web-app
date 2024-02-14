import { Route, Routes } from "react-router-dom";
import "./App.css";
import PostJob from "./pages/PostJob";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import JobDescription from "./pages/JobDescription";
import Layout from "./layout/Layout";
import JobList from "./pages/JobList";
import Recruters from "./component/Recruters/Recruters";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/post-a-job" element={<PostJob />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/jobDetails/:id" element={<JobDescription />} />
        <Route path="/joblist" element={<JobList />} />
        <Route path="/joblist/:cat" element={<JobList />} />
        <Route path="/recruters" element={<Recruters />} />
      </Route>
    </Routes>
  );
};

export default App;
