import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, signInAnonymously } from "firebase/auth";
import app from "./firebase";

const uploadFiles = (files, setMovieInfo, setValidUpload) => {
  
  const storage = getStorage();
  const auth = getAuth(app);
  signInAnonymously(auth)
    .then(() => {
      for (let file of files) {
        const filename =
          new Date().getTime() + "-" + file.label + "-" + file.file.name;
        const storageRef = ref(storage, "files/" + filename);
        const uploadTask = uploadBytesResumable(storageRef, file.file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (err) => {
            console.log(err);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setMovieInfo((previousInfo) => {
                return { ...previousInfo, [file.label]: downloadURL };
              });
              setValidUpload((prev) => prev + 1);
            });
          }
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default uploadFiles;
