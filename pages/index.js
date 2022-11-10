import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../components/CSSReset__index";
import Menu from "../components/Menu";
import { StyledTimeline } from "../components/Timeline";

function HomePage() {
  const estilosDoHommePage = {
    // backgroundColor: "#D9D9D9"
  };
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");

  return (
    <>
      <CSSReset />
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
  height: 230px;
`;
function Header() {
  return (
    <StyledHeader>
      <StyleBanner />

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
        console.log(playlistsNames);
        console.log(videos);
        return (
          <section>
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
                    <a href={video.url}>
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
