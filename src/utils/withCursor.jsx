import React, { useEffect, useState } from "react";
import classnames from "classnames";

export const CursorContext = React.createContext("cursorContext");

const SUPPORTED_CURSORS = [false, 'pointer', 'right', 'left'];

export const CursorProvider = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursor, setCursor] = useState(false);

  const onMouseMove = event => {
    const { pageX: x, pageY: y } = event;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  });

  const { x, y } = mousePosition;

  const onCursor = cursorType => {
    cursorType = (SUPPORTED_CURSORS.includes(cursorType) && cursorType) || false;
    setCursor(cursorType);
  };

  return (
    <CursorContext.Provider value={{ onCursor }}>
      <ins
        className={classnames('movable', {
          'active': !!cursor,
          [`cursor-${cursor}`]: !!cursor
        })}
        style={{
          left: `${x}px`,
          top: `${y}px`
        }}
      />
      {children}
    </CursorContext.Provider>
  );
};

export default function withAppContext(Component) {
  return function WrapperComponent(props) {
    return (
      <CursorContext.Consumer>
        {state => <Component {...props} context={state} />}
      </CursorContext.Consumer>
    );
  };
}

