import React from "react";
import { InstructionStyle } from "./atoms.style";
import { CloseCircleOutlined, ArrowRightOutlined } from "@ant-design/icons";

function Instruction({ instruction, btnText, setShow, onNextClick }) {
  return (
    <InstructionStyle>
      <CloseCircleOutlined className="close" onClick={() => setShow(false)} />
      <div className="text">{instruction}</div>
      <div className="btn" onClick={onNextClick}>
        {btnText}
        <ArrowRightOutlined className="arrow" />
      </div>
    </InstructionStyle>
  );
}

export default Instruction;
