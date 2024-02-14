import React, { useEffect, useState } from "react";
import { Any, JobPostType } from "../types/types.portal";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export type JobPortalContextType = {
  jobPostList: JobPostType[];
  setJobpostList: React.Dispatch<React.SetStateAction<JobPostType[]>>;
  newUser: User | null | undefined;
  setNewUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  sortyByCat: string;
  setSortByCat: React.Dispatch<React.SetStateAction<string>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

export const JobPortalContext =
  React.createContext<JobPortalContextType | null>(null);

const JobPortalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jobPostList, setJobpostList] = useState<JobPostType[]>([]);

  const [count, setCount] = useState<number>(0);

  const [newUser, setNewUser] = useState<User | null>();
  const [sortyByCat, setSortByCat] = useState("");

  useEffect(() => {
    if (newUser?.email) {
      const getUserId = async () => {
        const resposne = await fetch(
          `https://job-portal-server-side-main.vercel.app/companyList?email=${newUser?.email}`
        );
        const data = await resposne.json();

        setNewUser((prev: Any) => {
          return { ...prev, id: data?.result?._id };
        });
      };

      getUserId();
    }
  }, [newUser?.email]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setNewUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <JobPortalContext.Provider
      value={{
        jobPostList,
        setJobpostList,
        setNewUser,
        newUser,
        sortyByCat,
        setSortByCat,
        count,
        setCount,
      }}
    >
      {children}
    </JobPortalContext.Provider>
  );
};

export default JobPortalProvider;
