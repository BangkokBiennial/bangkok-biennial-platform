import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";


const Loading = () => (
  <div className="loading__container">
    <ClipLoader
      size={100}
      color={"#2F2E2E"}
      loading={true}
    />
  </div>
);

export default Loading;
