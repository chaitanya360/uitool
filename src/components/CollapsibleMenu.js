import { Menu } from "antd";
import React, { useRef, useState } from "react";

function CollapsibleMenu({
  items = ["one", "two", "three", "four"],
  handleMenuItemClicked = (e) => console.log(e.key),
}) {
  const [open, setOpen] = useState(false);
  const listRef = useRef(false);

  return (
    <div
      style={{
        width: "fit-content",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        top: "0px",
        right: "40px",
        zIndex: "2",
      }}
    >
      <div
        style={{
          backgroundColor: "dodgerblue",
          width: "50px",
          borderRadius: "0px 0px 4px 4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0px",
          cursor: "pointer",
          overflow: "hidden",
        }}
        onClick={() => setOpen((old) => !old)}
      >
        <img
          src={`${process.env.PUBLIC_URL}/statics/Icons/up_arrow_white.svg`}
          style={{
            width: "20px",
            height: "auto",
            transform: open ? "rotate(360deg)" : "rotate(180deg)",
            transition: "transform 0.3s linear",
          }}
        />
      </div>
      <div style={{ width: "100%", position: "relative" }}>
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            position: "absolute",
            transition: "top 0.3s linear",
            top: open ? "0px" : "-400px",
            border: "1px solid black",
            zIndex: "-2",
          }}
        >
          <Menu
            ref={listRef}
            style={{ width: "fit-content" }}
            selectable={false}
            onClick={handleMenuItemClicked}
            id="list"
          >
            <Menu.ItemGroup key="menu_list">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {items.map((item) => (
                  <Menu.Item
                    key={item}
                    style={{
                      padding: "0px 10px",
                      margin: "0px",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    {item}
                  </Menu.Item>
                ))}
              </div>
            </Menu.ItemGroup>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default CollapsibleMenu;
