//@ts-nocheck
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FeaturedLoader = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <>
          <div key={index} className="border rounded-lg p-4">
            <SkeletonTheme color="#202020" highlightColor="#fffefe">
              <div className="flex gap-4 items-center mb-6">
                <div>
                  <Skeleton circle={true} height={50} width={50} />
                </div>
                <div className="flex-1">
                  <Skeleton count={2} />
                </div>
              </div>

              <div className="border p-4 rounded">
                <Skeleton count={3} />
              </div>
            </SkeletonTheme>
          </div>
        </>
      ))}
    </div>
  );
};

export default FeaturedLoader;
