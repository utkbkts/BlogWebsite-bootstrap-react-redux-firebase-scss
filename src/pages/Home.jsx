import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/Config";
import Blogsection from "../components/Blogsection";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Tags from "../components/Tags";
import FeaturesBlog from "../components/FeaturesBlog";
import Trending from "../components/Trending";
import Search from "../components/Search";
import { isEmpty, isNull, orderBy } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import Category from "../components/Category";
import { HashLoader } from "react-spinners";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ setactive, user, active }) => {
  const [loading, setloading] = useState(true);
  const [blogs, setblogs] = useState([]);
  const [tags, settags] = useState([]);
  const [trendingblog, settrendingblog] = useState([]);
  const [search, setsearch] = useState("");
  const Querystring = useQuery();
  const searchQuery = Querystring.get("searchQuery");
  const location = useLocation();
  const [lastvisible, setlastvisible] = useState(null);
  const [isEmpty, setIsempty] = useState(false);
  const [totalblogs, settotalblogs] = useState([]);
  const navigate = useNavigate();
  //! TREND BLOG GET
  const getrending = async () => {
    const blogref = collection(db, "blogs");
    const trendQuery = query(blogref, where("trending", "==", "yes"));
    const querysnapshot = await getDocs(trendQuery);
    let trenblogs = [];
    querysnapshot.forEach((doc) => {
      trenblogs.push({ id: doc.id, ...doc.data() });
    });
    settrendingblog(trenblogs);
  };
  //!OLUŞTURULAN BLOG VE TAGLERE ULAŞMAK
  useEffect(() => {
    getrending();
    setsearch("");
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        settags(uniqueTags);
        settotalblogs(list);
        setblogs(list);
        setloading(false);
        setactive("home");
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
      getrending();
    };
  }, [setactive, active]);

  useEffect(() => {
    getblogs();
    setIsempty(false);
  }, [active]);

  //!search
  useEffect(() => {
    if (loading) {
      return;
    }

    if (!isNull(searchQuery)) {
      searchblogs();
    }
  }, [loading, searchQuery]);

  const searchblogs = async () => {
    const blogref = collection(db, "blogs");
    const myQuery = query(blogref, where("title", "==", searchQuery));
    const searchtag = query(
      blogref,
      where("tags", "array-contains", searchQuery)
    );
    const querySnapshot = await getDocs(myQuery);
    const tagsnapshot = await getDocs(searchtag);

    let searchtitleblogs = [];
    let tagtitleblogs = [];

    querySnapshot.forEach((doc) => {
      searchtitleblogs.push({ id: doc.id, ...doc.data() });
    });
    tagsnapshot.forEach((doc) => {
      tagtitleblogs.push({ id: doc.id, ...doc.data() });
    });
    const combinedSearchblogs = searchtitleblogs.concat(tagtitleblogs);
    setblogs(combinedSearchblogs);
    setIsempty(true);
  };
  //!DELETE
  const handledelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        setloading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully");
        setloading(false);
      } catch (error) {
        return toast.error(error);
      }
    }
  };
  //!TİTLE GÖRE SIRALAMA
  const getblogs = async () => {
    const blogref = collection(db, "blogs");
    const firstfour = query(blogref, orderBy("title"), limit(4)); //! en fazla 4 tane göster ekranda
    // const blogQuery = query(blogref, orderBy("title"));
    const docsnapshot = await getDocs(firstfour); //! blog içine at hepsini getir
    setblogs(
      docsnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
    );
    setlastvisible(docsnapshot.docs[docsnapshot.docs.length - 1]);
  };

  //!ekranda en fazla 4 tane göstermesi için
  const fetchmore = async () => {
    const updatestate = (docsnapshot) => {
      const iscollection = docsnapshot.size === 0;
      if (!iscollection) {
        const blogdata = docsnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setblogs((blogs) => [...blogs, ...blogdata]);
        setlastvisible(docsnapshot.docs[docsnapshot.docs.length - 1]);
      } else {
        toast.info("No more blog to display");
        setIsempty(true);
      }
    };
    setloading(true);
    const blogref = collection(db, "blogs");
    const nextfour = query(
      blogref,
      orderBy("title"),
      limit(4),
      startAfter(lastvisible)
    );
    const docsnapshot = await getDocs(nextfour);
    updatestate(docsnapshot);
    setloading(false);
  };
  const handlechange = (e) => {
    const { value } = e.target;
    if (isEmpty(value)) {
      getblogs();
      setIsempty(false);
    }
    setsearch(value);
  };

  //!category count
  const counts = totalblogs.reduce((prevvalue, currentvalue) => {
    let name = currentvalue.category;
    if (!prevvalue.hasOwnProperty(name)) { //! belli bir anahtara sahip olup olmadığına bakar
      prevvalue[name] = 0;
    }
    prevvalue[name]++;
    delete prevvalue["undefined"];
    return prevvalue;
  }, {});
  const categoryCount = Object.keys(counts).map((k) => {
    return {
      category: k,
      count: counts[k],
    };
  });

  if(loading){
    return <Spinner/>
  }
  return (
    <div className="container-fluid pb-4 pt-4 ">
      <div className="container ">
        <div className="row mx-0">
          <h2 className="text-center text-muted">
            <Trending blogs={trendingblog} />
          </h2>
          <h2 className="border-bottom p-2 border-black">Daily Blogs</h2>

          <div className="col-md-8 d-flex justify-content-center flex-column">
            {blogs.length === 0 && location.pathname !== "/" && (
              <div className="d-flex justify-content-center align-items-center flex-column">
                <h4>No Blog found with search keyword:</h4>
                <h3>
                  <strong>{searchQuery}</strong>
                </h3>
              </div>
            )}
            {blogs?.map((blog) => (
              <Blogsection
                user={user}
                key={blog.id}
                {...blog}
                handledelete={handledelete}
              />
            ))}
            {!isEmpty && (
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary d-block" onClick={fetchmore}>
                  Load More
                </button>
              </div>
            )}
          </div>
          <div className="col-md-3 search">
            <Search search={search} handlechange={handlechange} />
            <h3 className="text-start py-2 mb-4 border-bottom">Tags</h3>
            <Tags tags={tags} />
            <FeaturesBlog blogs={blogs} title={"Most Popular"}/>
            <Category categoryCount={categoryCount}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
