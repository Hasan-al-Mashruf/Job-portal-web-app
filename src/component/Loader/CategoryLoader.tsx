//@ts-nocheck
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CategoryLoader = () => {
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index}>
          <div className="border rounded-lg p-4">
            <SkeletonTheme color="#202020" highlightColor="#fffefe">
              <p>
                <Skeleton count={3} />
              </p>
            </SkeletonTheme>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryLoader;
