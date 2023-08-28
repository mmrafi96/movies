import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Details from "./pages/Details/Details";
import Explore from "./pages/Explore/Explore";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import SearchResult from "./pages/SearchResult/SearchResult";
import {
  decrement,
  getApiConfig,
  getGenres,
  increment,
} from "./store/homeSlice";
import { fetchDataFromApi } from "./utils/api";

const App = () => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.home.url);
  console.log(url);
  useEffect(() => {
    data();
  }, []);
  const data = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfig(url));
    });
  };
  const genresCal = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};
    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    data.map(({genres}) => {
      return genres.map((item) => {
        (allGenres[item.id] = item)
      });
    });
    console.log(allGenres);
    dispatch(getGenres(allGenres));
  };
  console.log(genresCal());
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
