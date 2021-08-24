import React, { useEffect, useRef, useState } from "react";

function EditableField({
  text,
  setText,
  textClassName,
  EditTrigger = (props) => <div {...props}>edit</div>,
  inputClassName,
}) {
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editMode && inputRef.current) inputRef.current.focus();
  }, [editMode]);
  return (
    <>
      {editMode ? (
        <input
          ref={inputRef}
          className={inputClassName}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => setEditMode(false)}
        />
      ) : (
        <span className={textClassName}>{text}</span>
      )}

      <EditTrigger
        onClick={() => {
          setEditMode(true);
        }}
        style={{
          visibility: editMode ? "hidden" : "visible",
          cursor: "pointer",
        }}
      />
    </>
  );
}

export default EditableField;
