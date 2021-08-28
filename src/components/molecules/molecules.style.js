import styled from "styled-components";

const PageDetailsFormStyle = styled.div`
  .wrapper {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 4;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form {
    min-width: 500px;
    z-index: 5;
    background-color: white;
    box-shadow: 2px 2px rgba(0, 0, 0, 0.4);
    height: fit-content;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    position: relative;
    padding: 2rem;

    .close-btn {
      position: absolute;
      right: 0;
      top: 0;
      margin: 1rem;
      color: var(--primary);
      font-size: 1.2rem;
    }

    .title {
      font-size: 1.4rem;
      margin: auto;
      margin-bottom: 2rem;
    }

    .body {
      display: flex;
    }

    .image-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: fit-content;

      .image-wrapper {
        display: block;
        width: 400px;
        height: 280px;
        img {
          object-fit: contain;
        }
      }
      .new-img-btn {
        font-size: 12px;
        width: fit-content;
      }
    }

    .right-section {
      display: flex;
      flex-direction: column;
      padding-left: 1rem;
    }

    .input {
      padding: 2px 0.5rem;
      font-size: 1rem;
      max-width: 200px;
      height: fit-content;
    }
    .name-container {
      display: flex;
      span {
        margin-right: 1rem;
      }
    }

    .features-section {
      margin-top: 1rem;
      .feature {
        margin: 0.5rem 0;
        font-size: 1rem;
      }
    }
  }
`;

export { PageDetailsFormStyle };
