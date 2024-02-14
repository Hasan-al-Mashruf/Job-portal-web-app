//@ts-nocheck
import { useState } from "react";
import RecentJobs from "../component/RecentJobs/RecentJobs";
import TrendingJobs from "../component/TrendingJobs/TrendingJobs";
import { JobPostType } from "../types/types.portal";
import Banner from "../component/Banner/Banner";
import Reviews from "../component/Reviews/Reviews";
import Recruters from "../component/Recruters/Recruters";

const Home = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [filterJobList, setFilteredJobList] = useState<[] | JobPostType[]>([]);

  return (
    <div>
      <Banner />
      <div className="container mx-auto px-2">
        <TrendingJobs />
        <div className="mt-24">
          <Recruters />
        </div>
      </div>
      <div className="recent-jobs-layout">
        <RecentJobs
          itemsPerPage={6}
          filterJobList={filterJobList}
          setFilteredJobList={setFilteredJobList}
          itemOffset={itemOffset}
          setItemOffset={setItemOffset}
        />
      </div>
      <Reviews />
    </div>
  );
};

export default Home;
