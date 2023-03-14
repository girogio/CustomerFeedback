import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useState } from "react";

import { Review } from "./common";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.DOMAIN,
  databaseURL: process.env.DBURL,
  projectId: "customersatisfaction-4bce2",
  storageBucket: process.env.BUCKET,
  messagingSenderId: process.env.MSID,
  appId: process.env.AID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default (initialReviewsState: any) => {
  const [reviews, setReviews] = useState(initialReviewsState);

  const updateReviews = async () => {
    const querySnapshot = await getDocs(collection(db, "Reviews"));
    setReviews(querySnapshot.docs.map((doc) => doc.data()));
  };

  const getReviewsBy = (filter_review: Review) => {
    let a = reviews.filter(
      (review: Review) =>
        filter_review.rating.value === review.rating &&
        filter_review.location == review.location
    );
    console.log(a);
    return a;
  };

  return {
    reviews,
    updateReviews,
    getReviewsBy,
  };
};
