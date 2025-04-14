import React, { useState } from "react";
import { isAuthenticated } from "../../lib/auth";

export const AuthTest: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<boolean>(false);

  const handleCheckAuth = () => {
    setAuthStatus(isAuthenticated());
  };

  return (
    <div className="auth-test">
      <h2>Auth Module Test</h2>
      <div className="buttons">
        <button onClick={handleCheckAuth}>Check Auth</button>
      </div>
      <div className="status">
        <p>Auth Status: {authStatus ? "Authenticated" : "Not Authenticated"}</p>
      </div>
    </div>
  );
};
