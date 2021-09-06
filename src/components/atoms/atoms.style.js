import styled from "styled-components";

const VideoCardStyle = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .img_container {
    background-color: white;
    border-radius: 15px;
    padding: 0.5rem;
    width: fit-content;
    border: 3px solid white;
    height: fit-content;
    img {
      height: 350px;
      width: 350px;
    }
  }
`;

export { VideoCardStyle };
