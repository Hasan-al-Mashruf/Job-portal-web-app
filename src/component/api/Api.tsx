import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { JobPostType } from "../../types/types.portal";

export const saveToDb = async (data: object, endpoint: string) => {
  if (endpoint) {
    try {
      const response = await fetch(
        `https://job-portal-server-side-main.vercel.app/${endpoint}`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

export const getCategoryCount = (cat: string, jobPostList: JobPostType[]) => {
  if (jobPostList.length) {
    const getCountNumber = jobPostList?.filter(
      (job) => job.category.toLowerCase() === cat.toLowerCase()
    );
    return getCountNumber.length;
  }
};

export const getMaxMinValue = (splitCheckItem: string[]): number[] => {
  const newMinValue = Number(splitCheckItem[0]?.split("k")[0]);
  const newMaxValue = Number(splitCheckItem[1]?.split("k")[0]);
  return [newMinValue, newMaxValue];
};

export const signOutUser = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      error;
    });
};

export const signupUser = async (
  email: string,
  password: string,
  name: string,
  companyImg: string,
  location: string,
  companyDetails: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const currentUser = auth?.currentUser;
    if (user) {
      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: name,
          photoURL: companyImg,
        });

        const data = {
          email,
          password,
          companyName: name,
          location,
          image: companyImg,
          companyDetails: companyDetails,
        };

        const response = await saveToDb(data, "companyList");

        return response; // Return success message
      }
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const signinUser = async (formData: {
  email: string;
  password: string;
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;

    if (user?.email) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
