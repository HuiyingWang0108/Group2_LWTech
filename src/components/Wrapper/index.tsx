import React, { ReactNode } from "react";
import "./style.css";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};

export default Wrapper;
