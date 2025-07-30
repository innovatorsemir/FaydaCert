import React, { useState } from "react";

const CorrectionRequest = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send correction request
  };

  return (
    <div>
      <h2>Request Certificate Correction</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Describe the error"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default CorrectionRequest;
