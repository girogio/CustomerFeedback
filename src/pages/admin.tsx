import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });
import FullOption from "./models/FullOption";
import { Button, Grid, Paper, Box, Typography, Divider } from "@mui/material";
import { Ratings } from "./models/common";
import useReviewState from "./models/reviews";
import { Review, Location } from "./models/common";
import { useEffect } from "react";

export default function Home() {
  const { updateReviews, getReviewsBy } = useReviewState([]);

  useEffect(() => {
    updateReviews();
  }, []);

  return (
    <>
      <main>
        <Typography
          variant="h3"
          padding={"20px"}
          fontFamily={poppins.style.fontFamily}
        >
          Statistics
        </Typography>
        <Divider />
        <Grid container>
          {Object.values(Location).map((location) => (
            <Grid item xs={3}>
              <Box margin={"20px"}>
                <Paper>
                  <Typography
                    paddingY={"20px"}
                    marginLeft={"20px"}
                    fontFamily={poppins.style.fontFamily}
                    variant="h4"
                  >
                    {location}
                  </Typography>
                  <Divider />
                  <Box flexGrow={1}>
                    <FullOption
                      radius={10}
                      key={location}
                      data={Ratings.map((rating) => ({
                        title: rating.value.toString(),
                        value: getReviewsBy({ location, rating }).length,
                        color: rating.color,
                      })).filter((data) => data.value > 0)}
                    ></FullOption>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Button onClick={updateReviews}>Refresh</Button>
      </main>
    </>
  );
}
