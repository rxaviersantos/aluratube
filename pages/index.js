import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../components/Menu";
import { StyledTimeline } from "../components/Timeline";
import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://hkzlpadkszetckmcfyrt.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhremxwYWRrc3pldGNrbWNmeXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NDE1NzQsImV4cCI6MTk4NDAxNzU3NH0.0Hv-8QxrD1Jmyigk6c7abE5Mte_7D7fADiNdbp2Yub4";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function HomePage() {
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  // const playlist = {
  //   "jogos": [],
  // }
  const [playlists, setPlaylists] = React.useState({});

  React.useEffect(() => {
    console.log("useEffect");

    supabase
      .from("video")
      .select("*")
      .then((dados) => {
        console.log(dados.data);

        const novasPlaylists = { ...playlists };
        dados.data.forEach((video) => {
          if (!novasPlaylists[video.playlist]) {
            novasPlaylists[video.playlist] = [];
          }
          novasPlaylists[video.playlist]?.push(video);
        });
        setPlaylists(novasPlaylists);
      });
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
          Conteúdo
        </Timeline>
      </div>
    </>
  );
}

export default HomePage;

// function Menu() {
//   return;
//   <div>Menu</div>;
// }

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .use-info {
    /* margin-top: 60px; */
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;
const StyleBanner = styled.div`
  background-color: red;
  background-image: url(${({ bg }) => bg});
  height: 230px;
`;
function Header() {
  return (
    <StyledHeader>
      <StyleBanner bg={config.bg} />

      <section className="use-info">
        <img src={`http://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}
function Timeline({ searchValue, ...props }) {
  //console.log("componente", props)
  const playlistsNames = Object.keys(props.playlists);
  return (
    <StyledTimeline>
      {playlistsNames.map((playlistsNames) => {
        const videos = props.playlists[playlistsNames];
        // console.log(playlistsNames);
        // console.log(videos);
        return (
          <section Key={playlistsNames}>
            <h2>{playlistsNames}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized);
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}
