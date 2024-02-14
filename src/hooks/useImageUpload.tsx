import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase.config";
import { CustomFile } from "../types/types.portal";

const useImageUpload = (files: CustomFile[]) => {
  const [downloadUrl, setDownloadurl] = useState<string>("");
  useEffect(() => {
    try {
      if (files[0]) {
        const storageRef = ref(storage, `/images/${files[0]?.name}`);

        const uploadTask = uploadBytesResumable(storageRef, files[0]);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            "Upload is " + progress + "% done";
            switch (snapshot.state) {
              case "paused":
                "Upload is paused";
                break;
              case "running":
                "Upload is running";
                break;
            }
          },
          (error) => {
            error;
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setDownloadurl(downloadURL);
            });
          }
        );
      }
    } catch (error) {
      error;
    }
  }, [files]);
  return [downloadUrl];
};

export default useImageUpload;
