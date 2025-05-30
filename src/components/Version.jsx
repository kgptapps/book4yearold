import React, { useState } from "react";
import styled from "styled-components";
import {
  versionInfo,
  getVersionString,
  getFormattedBuildTimestamp,
} from "../data/version";

const VersionContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 0.75rem;
  color: #777;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 3px 8px;
  border-radius: 12px;
  cursor: pointer;
  z-index: 100;
  transition: background-color 0.2s ease;
  border: 1px solid #eee;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

const VersionPopup = styled.div`
  position: fixed;
  bottom: 40px;
  right: 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  max-width: 300px;
  width: calc(100% - 40px);
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  z-index: 101;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    right: 50%;
    transform: translateX(50%);
    bottom: 60px;
  }

  h3 {
    margin-top: 0;
    color: #457b9d;
  }

  ul {
    padding-left: 20px;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 5px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #e63946;
  }
`;

function Version() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <VersionContainer onClick={() => setShowPopup(true)}>
        {getVersionString()} (Built:{" "}
        {new Date(versionInfo.buildTimestamp).toLocaleDateString()})
      </VersionContainer>

      {showPopup && (
        <VersionPopup>
          <CloseButton onClick={() => setShowPopup(false)}>×</CloseButton>

          <h3>Milo the Math Mouse</h3>
          <p>
            <strong>Version:</strong> {versionInfo.version}
          </p>
          <p>
            <strong>Released:</strong> {versionInfo.releaseDate}
          </p>
          <p>
            <strong>Built:</strong> {getFormattedBuildTimestamp()}
          </p>

          <hr />

          <h4>Release Notes</h4>
          <ul>
            {versionInfo.releaseNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>

          {versionInfo.previousVersions && (
            <>
              <h4
                style={{
                  marginTop: "15px",
                  color: "#457b9d",
                  fontSize: "0.9rem",
                }}
              >
                Previous Versions
              </h4>
              {versionInfo.previousVersions.map((prevVersion, idx) => (
                <details
                  key={idx}
                  style={{ marginBottom: "10px", fontSize: "0.8rem" }}
                >
                  <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                    v{prevVersion.version} - {prevVersion.releaseDate}
                  </summary>
                  <ul style={{ margin: "5px 0 5px 15px" }}>
                    {prevVersion.releaseNotes.map((note, noteIdx) => (
                      <li key={noteIdx}>{note}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </>
          )}

          <div
            style={{
              borderTop: "1px solid #eee",
              marginTop: "15px",
              paddingTop: "10px",
            }}
          >
            <p
              style={{ fontSize: "0.8rem", margin: "3px 0", color: "#457b9d" }}
            >
              <strong>Build Information</strong>
            </p>
            <p style={{ fontSize: "0.75rem", margin: "2px 0", color: "#666" }}>
              Date: {new Date(versionInfo.buildTimestamp).toLocaleDateString()}
            </p>
            <p style={{ fontSize: "0.75rem", margin: "2px 0", color: "#666" }}>
              Time: {new Date(versionInfo.buildTimestamp).toLocaleTimeString()}
            </p>
            {versionInfo.buildEnvironment &&
              versionInfo.buildEnvironment.buildBy && (
                <p
                  style={{
                    fontSize: "0.75rem",
                    margin: "2px 0",
                    color: "#666",
                  }}
                >
                  By: {versionInfo.buildEnvironment.buildBy}
                </p>
              )}
          </div>
        </VersionPopup>
      )}
    </>
  );
}

export default Version;
