import React, { useEffect, useState } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../firebase/Config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const initialstate = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
  imgUrl: "",
  comments:[],
  likes:[]
};

const categoryOption = [
  "Fashion",
  "Techonology",
  "Food",
  "Politics",
  "Sports",
  "Business",
];

const Createblog = ({ user, setactive }) => {
  const [form, setform] = useState(initialstate);
  const [file, setfile] = useState(null);
  const [progress, setprogress] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  let runningNotificationShown = false;
  const { title, tags, category, trending, description } = form;
  const handletags = (newTags) => {
    setform({ ...form, tags: newTags });
  };
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handleTrending = (e) => {
    setform({ ...form, trending: e.target.value });
  };
  const handlecategory = (e) => {
    setform({ ...form, category: e.target.value });
  };
  useEffect(() => {
    const uploadfile = () => {
      const storageref = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageref, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setprogress(progress);
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              if (!runningNotificationShown) {
                toast.info("Wait for the image to finish loading");
                runningNotificationShown = true;
              }
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.info("Image upload to firebase successfully");
            setform((prev) => ({ ...prev, imgUrl: downloadURL }));
          });
        }
      );
    };

    file && uploadfile();
  }, [file]);

  const handlesubmit = async (e) => {
    e.preventDefault();
  
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamps: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created successfully");
          navigate("/");  // Navigate to home page after successful creation
        } catch (error) {
          console.log(error);
          toast.error("Error creating blog");
        }
      } else {
        try {
          const docRef = doc(db, "blogs", id);
          await updateDoc(docRef, {
            ...form,
            timestamps: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog updated successfully");
          navigate("/");  // Navigate to home page after successful update
        } catch (error) {
          console.log(error);
          toast.error("Error updating blog");
        }
      }
    } else {
      toast.error("All fields are mandatory to fill");
    }
  };

  useEffect(() => {
    id && getlogdetail();
  }, [id]);

  const getlogdetail = async () => {
    const docref = doc(db, "blogs", id);
    const snapshot = await getDoc(docref);
    if (snapshot.exists()) {
      setform({ ...snapshot.data() });
    }
    setactive(null);
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12 text-center">
          <h3 className="text-center py-2">
            {id ? "Update Blog" : "Create Blog"}
          </h3>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row" onSubmit={handlesubmit}>
              <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={handlechange}
                />
              </div>
              <div className="col-12 py-3">
                <ReactTagInput
                  tags={tags}
                  placeholder="Tags"
                  onChange={handletags}
                />
              </div>
              <div className="col-12 py-3">
                <p className="trending">Is it trending blog ?</p>
                <div className="form-check-inline mx-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="yes"
                    name="radioOption"
                    checked={trending === "yes"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    Yes &nbsp;
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    value="no"
                    name="radioOption"
                    checked={trending === "no"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    No
                  </label>
                </div>
              </div>
              <div className="col-12 py-3">
                <select
                  className="form-control"
                  style={{ width: "100%" }}
                  value={category}
                  onChange={handlecategory}
                >
                  <option>Please select category</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 py-3">
                <textarea
                  value={description}
                  name="description"
                  onChange={handlechange}
                  className="form-control description-box"
                  placeholder="Description"
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setfile(e.target.files[0])}
                />
              </div>
              <div className="col-12 py-3 text-center">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  {id ? "Update" : "Submit"}
                </button>
                {progress && (
                  <div
                    className="progress-bar mt-4"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {`${progress}%`}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createblog;
