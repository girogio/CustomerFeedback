import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import assert from "assert";
import { Poppins } from "next/font/google";
import Head from "next/head";
import { useState } from "react";
import {
  BsEmojiAngryFill,
  BsEmojiFrownFill,
  BsEmojiNeutralFill,
  BsEmojiSmileFill,
  BsFillEmojiHeartEyesFill,
} from "react-icons/bs/";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";

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

export default function Home() {
  const [faceMenu, setFaceMenu] = useState(false);
  const [ctaMenu, setCtaMenu] = useState(true);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  let selectedLocation: Location = Location.Burmarrad;

  const submitReview = async (rating: number, location: Location) => {
    assert(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
    try {
      const docRef = await addDoc(collection(db, "Reviews"), {
        date_created: new Date(),
        rating: rating,
        location: location,
      });
      setFaceMenu(false);
      setCtaMenu(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const submitEmail = async (email: string, location: Location) => {
    try {
      const docRef = await addDoc(collection(db, "Emails"), {
        date_created: new Date(),
        email: email,
        location: location,
      });
      setCtaMenu(false);
      setFaceMenu(true);
      setOpen(false);
      setEmail("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <Head>
        <title>Customer Feedback</title>
        <meta name="description" content="A test app." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          alignContent={"center"}
          position={"absolute"}
          display={"flex"}
          height={"100%"}
          width={"100%"}
          flexDirection={"column"}
          className={faceMenu ? "fadeIn" : "fadeOut"}
        >
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
            marginTop={"10px"}
          >
            <BsEmojiAngryFill
              size={"80%"}
              cursor={"pointer"}
              stroke={"#000000"}
              strokeWidth={"0.2"}
              color={"#FF0000"}
              onClick={() => submitReview(1, selectedLocation)}
            />
            <BsEmojiFrownFill
              size={"80%"}
              cursor={"pointer"}
              color={"#FFA500"}
              onClick={() => submitReview(2, selectedLocation)}
              strokeWidth={"0.2"}
              stroke={"#000000"}
            />
            <BsEmojiNeutralFill
              size={"80%"}
              color={"#FFFF00"}
              stroke={"#000000"}
              strokeWidth={"0.2"}
              cursor={"pointer"}
              style={{ margin: "10px" }}
              onClick={() => submitReview(3, selectedLocation)}
            />
            <BsEmojiSmileFill
              strokeWidth={"0.2"}
              size={"80%"}
              cursor={"pointer"}
              stroke={"#000000"}
              color={"#00FF00"}
              onClick={() => submitReview(4, selectedLocation)}
            />
            <BsFillEmojiHeartEyesFill
              size={"80%"}
              color={"#00FFFF"}
              cursor={"pointer"}
              stroke={"#000000"}
              onClick={() => submitReview(5, selectedLocation)}
              strokeWidth={"0.2"}
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
        </Box>
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          alignContent={"center"}
          position={"absolute"}
          display={"flex"}
          height={"100%"}
          width={"100%"}
          flexDirection={"column"}
          className={ctaMenu ? "fadeIn" : "fadeOut"}
          sx={{ transition: "opacity 1s ease-in-out" }}
        >
          <Typography
            textAlign={"center"}
            fontFamily={poppins.style.fontFamily}
            fontSize={"3rem"}
          >
            Thank you for your feedback!
          </Typography>
          <Typography fontFamily={poppins.style.fontFamily} fontSize={"1.5rem"}>
            Would you like to leave your email so we can contact you?
          </Typography>

          <Stack
            paddingTop={"9rem"}
            justifyContent={"space-around"}
            direction={"row"}
            width={"60%"}
          >
            <Button
              size="large"
              variant={"outlined"}
              onClick={() => {
                setFaceMenu(true);
                setCtaMenu(false);
              }}
              sx={{ width: "100px", height: "100px", borderRadius: "50px" }}
            >
              No
            </Button>
            <Button
              size="large"
              variant={"contained"}
              onClick={() => {
                setOpen(true);
              }}
              sx={{ width: "100px", height: "100px", borderRadius: "50px" }}
            >
              Yes
            </Button>
          </Stack>
        </Box>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <DialogTitle>Further feedback</DialogTitle>
          <DialogContent>
            <DialogContentText>
              By clicking ok, you acknowledge a long list of things that must be
              GDPR compliant and all that jazz. We will not spam you, we will
              not sell your data, we willnot do anything with your data except
              for contacting you about your experience with us.
            </DialogContentText>
            <TextField
              autoFocus
              id="email"
              sx={{ marginTop: "1rem" }}
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              fullWidth
              variant="filled"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                submitEmail(email, selectedLocation);
              }}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </>
  );
}
