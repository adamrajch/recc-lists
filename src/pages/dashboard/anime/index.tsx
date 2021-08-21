import {
  Box,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import React, { ReactElement, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { supabase } from "../../../../client";
import { MediaCard } from "../../../components/mediaCard";

export default function Anime(): ReactElement {
  const [lists, setLists] = useState([]);
  const [media, setMedia] = useState([]);
  const [anime, setAnime] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchLists();
    fetchMedia();
  }, []);
  async function fetchLists() {
    const { data } = await supabase.from("lists").select();
    setLists(data);
    console.log("data: ", data);
  }
  async function fetchMedia() {
    const { data } = await supabase.from("media").select();
    setMedia(data);
    console.log("data: ", data);
  }
  //   function createList() {}

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length > 0) {
      fetchAnime(query);
    }
  };

  const fetchAnime = async (query) => {
    setLoading(true);
    const temp = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`
    ).then((res) => res.json());
    setAnime(temp.results);
    console.log(temp.results);
    setLoading(false);
  };

  async function createMedia(id, show) {
    if (media.some((t) => t.title === show.titile)) {
      return;
    }
    const { data, error } = await supabase.from("media").insert([
      {
        title: show.title,
        score: show.score,
        synopsis: show.synopsis,
        image_url: show.image_url,
        user_score: null,
        episodes: show.episodes,
        rated: show.rated,
        genre: "anime",
        status: status,
      },
    ]);
    if (error) {
      console.log(error);
      return;
    }
    const addedMedia = addShowToList(id);
    console.log(addedMedia);
    console.log(data);
    return data;
  }

  async function addShowToList(id) {
    const { data, error } = await supabase.from("showlist").insert([
      {
        list_id: id,
        media_id: id,
      },
    ]);
    if (error) {
      console.log(error);
    }
    return data;
  }
  return (
    <Layout>
      <VStack spacing={3} alignItems="center">
        <Text>My Reccomendation Lists</Text>
        <Box>
          <InputGroup size="md">
            <InputRightElement>
              <Icon
                as={BsSearch}
                onClick={(e) => handleSearch(e)}
                _hover={{ cursor: "pointer" }}
              />
            </InputRightElement>
            <Input
              rounded="md"
              placeholder="Search"
              // bg="white"
              _placeholder={{
                opacity: 1,
                color: "gray.400",
              }}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </InputGroup>
        </Box>

        <Box>
          {loading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <Box>
              {anime.length ? (
                <HStack wrap="wrap" spacing={4}>
                  {anime.map((m) => (
                    <MediaCard
                      title={m.title}
                      img={m.image_url}
                      score={m.score}
                      show={m}
                      key={m.mal_id}
                      lists={lists}
                      createMedia={createMedia}
                    />
                  ))}
                </HStack>
              ) : null}
            </Box>
          )}
        </Box>
      </VStack>
    </Layout>
  );
}
