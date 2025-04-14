import React from "react";
import { httpClient } from "../../lib/http-client";

export const HttpClientTest: React.FC = () => {
  const handleGet = () => {
    httpClient.get("https://api.example.com/data");
  };

  const handlePost = () => {
    httpClient.post("https://api.example.com/data", { test: "data" });
  };

  return (
    <div className="http-client-test">
      <h2>HTTP Client Test</h2>
      <div className="buttons">
        <button onClick={handleGet}>GET Request</button>
        <button onClick={handlePost}>POST Request</button>
      </div>
    </div>
  );
};
