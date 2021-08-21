import {
  createStyles,
  Divider,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import React, { ReactElement, useEffect, useState } from "react";
import { supabase } from "../../client";
import { MediaCard } from "./mediaCard";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);
export default function AddShowContent(): ReactElement {
  const classes = useStyles();
  const [lists, setLists] = useState([]);
  const [anime, setAnime] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchLists();
  }, []);
  async function fetchLists() {
    const { data } = await supabase.from("lists").select();
    setLists(data);
    console.log("data: ", data);
  }

  //   function createList() {}

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMedia(query);
    // fetch from media api
  };
  const fetchMedia = async (query) => {
    const temp = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`
    ).then((res) => res.json());
    setAnime(temp.results);
    console.log(temp.results);
  };
  return (
    <div>
      <Typography variant="h2" component="h2" gutterBottom>
        Add Show
      </Typography>

      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search anime"
          inputProps={{ "aria-label": "search anime" }}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <IconButton
          onClick={() => setQuery("")}
          className={classes.iconButton}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={(e) => handleSearch(e)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {/* <Button variant="contained" color="primary">
        Primary
      </Button> */}
      <Grid container justifyContent="center" spacing={1}>
        {anime.length ? (
          <>
            {anime.map((m) => (
              <Grid key={m.mal_id} item>
                <MediaCard
                  title={m.title}
                  img={m.image_url}
                  score={m.score}
                  show={m}
                />
              </Grid>
            ))}
          </>
        ) : null}
      </Grid>
    </div>
  );
}
