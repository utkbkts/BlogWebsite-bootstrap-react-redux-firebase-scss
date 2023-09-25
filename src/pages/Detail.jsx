import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/Config";
import moment from "moment";
import Tags from "../components/Tags";
import RelatedBlog from "../components/RelatedBlog";
import FeaturesBlog from "../components/FeaturesBlog";
import { isEmpty } from "lodash";
import Usercomment from "../components/Usercomment";
import Spinner from "../components/Spinner";
import Commentbox from "../components/Commentbox";
import { toast } from "react-toastify";
import Likes from "../components/Likes";

const Detail = ({ setactive, user }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlog, setRelatedBlog] = useState([]);
  const [comment, setcomment] = useState([]);
  let [likes, setlikes] = useState([]);
  const [usercomment, setusercomment] = useState("");
  const userId = user?.uid;


  useEffect(() => {
    id && getBlogDetails();
  }, [id]);

  const getBlogDetails = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);
    setBlog(docSnap.data());
    const reletadblogquery = query(
      blogRef,
      where("tags", "array-contains", docSnap.data().tags),
      limit(3)
    );
    setcomment(docSnap.data().comment ? docSnap.data().comment : []);
    setlikes(docSnap.data().likes ? docSnap.data().likes : []);
    const relatedBlogSnapshot = await getDocs(reletadblogquery);
    const relatedBlogs = [];
    relatedBlogSnapshot.forEach((doc) => {
      relatedBlogs.push({ id: doc.id, ...doc.data() });
    });
    setRelatedBlog(relatedBlogs);
    setactive(null);
    setLoading(false);
  };
  //!comment
  const handlecomment = async (e) => {
    e.preventDefault();
    comment.push({
      createdAt: Timestamp.fromDate(new Date()),
      userId,
      name: user?.displayName,
      body: usercomment,
    });
    toast.success("Comment posted successfully");
    await updateDoc(doc(db, "blogs", id), {
      ...blog,
      comment,
      timestamps: serverTimestamp(),
    });
    setcomment(comment);
    setusercomment("");
  };
  //!spinner
  if (loading) {
    return <Spinner />;
  }
  //!DELETE comment
  const handledelete = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        const updatedComments = comment.filter((c) => c.id !== commentId);

        await updateDoc(doc(db, "blogs", id), {
          ...blog,
          comment: updatedComments,
          timestamps: serverTimestamp(),
        });

        setcomment(updatedComments);

        toast.success("Comment deleted successfully");
      } catch (error) {
        return toast.error(error);
      }
    }
  };
  //!like
  const handlelike = async () => {
    if (userId) {
      if (blog?.likes) {
        const index = likes.findIndex((id) => id === userId);
        if (index === -1) {
          likes.push(userId);
          setlikes([...new Set(likes)]);
        } else {
          likes = likes.filter((id) => id !== userId);
          setlikes(likes);
        }
      }
      await updateDoc(doc(db,"blogs",id),{
        ...blog,
        likes,
        timestamps:serverTimestamp(),
      })
    }
  };
  return (
    <div className="single">
      <div
        className="blog-title-box"
        style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
      >
        <div className="overlay"></div>
        <div className="blog-title">
          <span>{moment(blog?.timestamps.toDate()).format("L")}</span>
          <h2>{blog?.title}</h2>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-3">
        <div className="container">
          <div className="row mx-0">
            <div className="col-md-8 ">
              <span className="text-start border-bottom d-flex">
                By <p className="author">&nbsp;{blog?.author}</p> -&nbsp;
                <span>{moment(blog?.timestamps.toDate()).format("L")}</span>
                <Likes
                  handlelike={handlelike}
                  blog={blog}
                  likes={likes}
                  userId={userId}
                />
              </span>
              <p className="text-start">{blog?.description}</p>
              <div className="text-start">
                <Tags tags={blog?.tags} />
              </div>
            </div>
            <div className="col-md-3">
              <h4 className="border-bottom py-1">Tags</h4>
              <Tags tags={blog?.tags} />
              {blog && <FeaturesBlog blogs={[blog]} title={"Recent Blogs"} />}
            </div>
            <br />
            <div className="custombox">
              <div className="scroll">
              <h4 className="small-title">{blog?.comment?.length} Comment</h4>

              {isEmpty(comment) ? (
                <Usercomment msg={"No comment yet posted on this blog"} />
              ) : (
                <>
                  {comment?.map((comment) => (
                    <Usercomment
                      user={user}
                      handledelete={handledelete}
                      {...comment}
                    />
                  ))}
                </>
              )}
              </div>
            </div>
            <Commentbox
              userId={userId}
              usercomment={usercomment}
              setusercomment={setusercomment}
              handlecomment={handlecomment}
            />
          </div>
          <RelatedBlog id={id} blogs={relatedBlog} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
