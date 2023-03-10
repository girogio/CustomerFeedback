import assert from "assert";
import { Button, setRef, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Poppins } from "next/font/google";
import Head from "next/head";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

import { initializeApp } from "firebase/app";
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { use, useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyB2Y-vhj6-2PG5HO7LYxnK-iWvlJ9U6ABI",
  authDomain: "customersatisfaction-4bce2.firebaseapp.com",
  projectId: "customersatisfaction-4bce2",
  storageBucket: "customersatisfaction-4bce2.appspot.com",
  messagingSenderId: "227293994539",
  appId: "1:227293994539:web:8df8bcdab5e5996345946e",
  databaseURL:
    "https://customersatisfaction-4bce2-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

enum Location {
  Burmarrad = "Burmarrad",
  Gzira = "Gzira",
  Sliema = "Sliema",
  Valletta = "Valletta",
  Bugibba = "Bugibba",
}

export default function Home() {
  let [reviews, setReviews] = useState<DocumentData[]>([]);

  const getReviews = async () => {
    setReviews([]);
    const querySnapshot = await getDocs(collection(db, "Reviews"));
    querySnapshot.forEach((doc) => {
      setReviews((reviews) => [...reviews, doc.data()]);
    });
    reviews.sort((a, b) => {
      return a.date_created.toDate() - b.date_created.toDate();
    });
    reviews.reverse();
    return reviews;
  };

  function BasicTable() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {review.date_created.toDate().toLocaleString()}
                </TableCell>
                <TableCell align="right">{review.rating}</TableCell>
                <TableCell align="right">{review.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return (
    <>
      <Head>
        <title>Customer Feedback</title>
        <meta name="description" content="A test app." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Button onClick={() => getReviews()}>Refresh</Button>
        <div className="mainContainer">
          <BasicTable />
        </div>
      </main>
    </>
  );
}
