import styled, { css } from "styled-components";

const DeletepopupStyle = styled.div`
  background-color: white;
  color: black;
  padding: 1rem 1.5rem;
  width: fit-content;
  border-radius: 0.4rem;
  margin: auto;
  margin-top: 2rem;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.6);
  position: relative;

  .close-btn {
    font-size: 1rem;
    color: red;
    opacity: 0.9;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    cursor: pointer;
  }

  .title {
    width: 100%;
    font-weight: 500;
    font-size: 1.2rem;
    text-align: center;
  }

  .content {
    margin: 1rem;
    font-weight: 500;
    display: flex;
    flex-direction: column;
  }

  .input {
    padding-left: 0.5rem;
    border-radius: 4px;
    display: block;
    margin-top: 0.4rem;
  }

  .btn-container {
    display: flex;
    margin-top: 1.5rem;

    button {
      cursor: pointer;
      margin-right: 0.6rem;
      border: none;
      font-weight: 500;
      border-radius: 3px;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(0, 0, 0, 0.4);
    }

    .del {
      background: rgba(250, 10, 30, 0.3);
      transition: background 200ms linear;
      ${({ delete_active }) =>
        delete_active &&
        css`
          background: tomato;
          color: rgba(55, 55, 55, 1);
        `};
    }
  }
`;
export { DeletepopupStyle };
