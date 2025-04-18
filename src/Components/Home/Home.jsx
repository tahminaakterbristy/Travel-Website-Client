

import { Helmet } from "react-helmet-async";
import FloatingSearch from "../FloatingSearch/FloatingSearch";
import Banner from "./Banner/Banner";
import Card from "./Card/Card";

import ReviewList from "./ReviewList/ReviewList";
import FrequentlyAsked from "../FrequentlyAsked/FrequentlyAsked";





const Home = () => {
    return (
        <div>
            <Helmet>
            <title>Travellette | Home</title>
            </Helmet>
           <FloatingSearch></FloatingSearch>
        <Banner></Banner>
        <Card></Card>
        
       <ReviewList></ReviewList>
       <FrequentlyAsked></FrequentlyAsked>
      

        </div>
    );
};

export default Home;