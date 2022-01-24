import React, { useEffect } from "react";

const TestComponent = () => {
  useEffect(() => {
    console.log("component did mount");
    return () => {
      console.log("component will unmount");
    };
  }, []);

  // component did mount, component did update, component will unmount
  return <div className='testComponent'>Test Component</div>;
};

export default TestComponent;
