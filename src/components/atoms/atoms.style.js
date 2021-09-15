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

const InstructionStyle = styled.div`
  position: absolute;
  z-index: 5;
  top: 10px;
  left: 10px;
  background-color: white;
  font-size: 1rem;
  border-radius: 5px;
  width: fit-content;
  padding: 2rem;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);

  .text {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .btn {
    margin: 0;
    .arrow {
      margin-left: 0.5rem;
      transform: translateY(1px);
    }
  }

  .close {
    position: absolute;
    right: 5px;
    top: 10px;
    cursor: pointer;
  }
`;

export { VideoCardStyle, InstructionStyle };
