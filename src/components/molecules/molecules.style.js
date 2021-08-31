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
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form {
    min-width: 500px;
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
      color: black;
      font-size: 1.2rem;
      cursor: pointer;
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
          border: 1px solid black;
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
      padding-left: 2rem;
    }

    .status-container {
      margin: 1rem 0;
      .drop-down {
        margin-left: 1rem;
      }
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
      .features {
        margin-top: 0.5rem;
        padding: 0 0.5rem;
        max-height: 200px;
        overflow: auto;

        .feature-container {
          display: flex;
          align-items: center;
          margin: 5px 0;
          .delete-feature {
            color: var(--primary);
            margin-left: 0.3rem;
            cursor: pointer;
          }
        }

        .features .new-feature-btn {
          color: var(--primary);
          margin-left: 0.4rem;
          font-size: 0.8rem;
        }
      }
    }

    .save-btn {
      width: fit-content;
      margin: auto;
      background-color: var(--primary);
      padding: 0.3rem 1rem;
      border-radius: 0.2rem;
      color: white;
      font-weight: 500;
      margin-top: 1rem;
      cursor: pointer;
    }
  }
`;

export { PageDetailsFormStyle };
