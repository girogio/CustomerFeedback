import assert from "assert";
import { setRef, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Poppins } from "next/font/google";
import Head from "next/head";
import {
  BsEmojiAngryFill,
  BsEmojiFrownFill,
  BsEmojiNeutralFill,
  BsEmojiSmileFill,
  BsFillEmojiHeartEyesFill,
} from "react-icons/bs/";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  getFirestore,
} from "firebase/firestore";

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

enum Location {
  Burmarrad = "Burmarrad",
  Gzira = "Gzira",
  Sliema = "Sliema",
  Valletta = "Valletta",
  Bugibba = "Bugibba",
}

let selectedLocation: Location = Location.Burmarrad;

const submitReview = async (rating: number, location: Location) => {
  assert(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
  try {
    const docRef = await addDoc(collection(db, "Reviews"), {
      date_created: new Date(),
      rating: rating,
      location: location,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Customer Feedback</title>
        <meta name="description" content="A test app." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mainContainer">
          <Typography
            textAlign={"center"}
            fontFamily={poppins.style.fontFamily}
            fontSize={"3rem"}
          >
            How was your experience with us today?
          </Typography>

          <Stack
            paddingTop={"2rem"}
            justifyContent={"space-around"}
            direction={"row"}
            width={"80%"}
          >
            <BsEmojiAngryFill
              size={"80%"}
              cursor={"pointer"}
              onClick={() => submitReview(1, selectedLocation)}
            />
            <BsEmojiFrownFill
              size={"80%"}
              cursor={"pointer"}
              onClick={() => submitReview(2, selectedLocation)}
            />
            <BsEmojiNeutralFill
              size={"80%"}
              cursor={"pointer"}
              onClick={() => submitReview(3, selectedLocation)}
            />
            <BsEmojiSmileFill
              size={"80%"}
              cursor={"pointer"}
              onClick={() => submitReview(4, selectedLocation)}
            />
            <BsFillEmojiHeartEyesFill
              size={"80%"}
              cursor={"pointer"}
              onClick={() => submitReview(5, selectedLocation)}
            />
          </Stack>

          <select
            name="location"
            id="location"
            onChange={(e) => {
              selectedLocation = e.target.value as Location;
            }}
          >
            {Object.values(Location).map((location) => {
              return (
                <option key={location} value={location}>
                  {location}
                </option>
              );
            })}
          </select>
        </div>
      </main>
    </>
  );
}