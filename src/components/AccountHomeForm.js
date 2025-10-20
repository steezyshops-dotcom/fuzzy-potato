import React from "react";
import RichTextEditor from "./RichTextEditor";

const AccountHomeForm = ({
  activeTab,
  setActiveTab,
  currentUser,
  handleLogout,
  selectedFile,
  handleFileChange,
  handleFileUpload,
  uploadMessage,
  files,
  handleDelete,
  portfolios,
  activePortfolio,
  portfolioContent,
  setPortfolioContent,
  handleCreatePortfolio,
  handleSavePortfolio,
  handleSelectPortfolio,
  editingTitle,
  setEditingTitle,
  handleDiscard,
}) => {
  const renderContent = () => {
    switch (activeTab) {
      case "welcome":
        return (
          <div className="text-center">
            <h1 style={{ color: "white" }}>Welcome to ePortfolio</h1>
          </div>
        );

      case "progress":
        return <h2 style={{ color: "white" }}>Progress Content</h2>;

      case "portfolio":
        return (
          <div style={{ color: "white", textAlign: "center", width: "80%" }}>
            <h2>Portfolio Builder</h2>
            <button onClick={handleCreatePortfolio} /* ... */>
              + Create New Portfolio
            </button>

            <div>
              {portfolios.length > 0 ? (
                portfolios.map((p) => (
                  <div
                    key={p._id}
                    style={{
                      backgroundColor: "var(--secondary-color)",
                      color: "black",
                      padding: "10px",
                      margin: "10px 0",
                      borderRadius: "var(--border-radius-sm)",
                      cursor: "pointer",
                      // --- Make the active portfolio stand out ---
                      border:
                        activePortfolio?._id === p._id
                          ? "3px solid var(--primary-color)"
                          : "none",
                    }}
                    // --- REVISED: Use the new handler to select a portfolio ---
                    onClick={() => handleSelectPortfolio(p)}
                  >
                    <strong>{p.title}</strong>
                  </div>
                ))
              ) : (
                <p>No portfolios yet. Create one above.</p>
              )}
            </div>

            {activePortfolio && (
              <div style={{ marginTop: "20px" }}>
                {/* --- NEW: Add an input field for the title --- */}
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "white",
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: "2px solid var(--primary-color)",
                    textAlign: "center",
                    marginBottom: "15px",
                  }}
                />

                <div
                  style={{
                    /* ... styles for the editor container */ textAlign: "left",
                  }}
                >
                  <RichTextEditor
                    content={portfolioContent}
                    onContentChange={setPortfolioContent}
                  />
                </div>

                {/* --- NEW: Add a Discard button for new, unsaved portfolios --- */}
                <button onClick={handleSavePortfolio} /* ... */>Save</button>
                {!activePortfolio._id && ( // Only show Discard if it's a NEW portfolio (no ID)
                  <button
                    onClick={handleDiscard}
                    style={{
                      marginTop: "15px",
                      marginLeft: "10px",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "var(--border-radius-sm)",
                      backgroundColor: "grey",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Discard
                  </button>
                )}
              </div>
            )}
          </div>
        );

      case "storage":
        return (
          <div style={{ color: "white", textAlign: "center", width: "80%" }}>
            <h2>File Storage</h2>
            <div style={{ marginBottom: "20px" }}>
              <input type="file" onChange={handleFileChange} />
              <button
                onClick={handleFileUpload}
                style={{
                  marginLeft: "10px",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "var(--border-radius-sm)",
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Upload
              </button>
            </div>
            {uploadMessage && <p>{uploadMessage}</p>}
            <h3>Your Uploaded Files</h3>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {files.length > 0 ? (
                files.map((file) => (
                  <li
                    key={file._id}
                    style={{
                      backgroundColor: "var(--secondary-color)",
                      color: "black",
                      margin: "10px 0",
                      padding: "10px",
                      borderRadius: "var(--border-radius-sm)",
                    }}
                  >
                    <strong>{file.filename}</strong> (
                    {(file.fileSize / 1024).toFixed(1)} KB)
                    <br />
                    <a
                      href={`http://localhost:8080/${file.filePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                    {" | "}
                    <button
                      onClick={() => handleDelete(file._id)}
                      style={{
                        marginLeft: "10px",
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "var(--border-radius-sm)",
                        backgroundColor: "red",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </li>
                ))
              ) : (
                <p>No files uploaded yet.</p>
              )}
            </ul>
          </div>
        );

      default:
        return <h2 style={{ color: "white" }}>Select a tab</h2>;
    }
  };

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      {/* Top right corner */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {currentUser && (
          <span style={{ color: "white" }}>
            Welcome, <strong>{currentUser.name}</strong> ({currentUser.role})
          </span>
        )}
        <button
          onClick={handleLogout}
          style={{
            padding: "6px 12px",
            backgroundColor: "var(--secondary-color)",
            border: "none",
            borderRadius: "var(--border-radius-sm)",
            color: "black",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Sidebar + Content */}
      <div className="d-flex flex-grow-1">
        <div
          style={{
            width: "220px",
            backgroundColor: "var(--primary-color)",
            paddingTop: "var(--spacing-md)",
            color: "white",
          }}
        >
          <h3 className="mb-4 ps-3">Menu</h3>
          <ul className="nav flex-column">
            {["welcome", "progress", "portfolio", "storage"].map((tab) => (
              <li key={tab} className="nav-item mb-2">
                <div
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    backgroundColor:
                      activeTab === tab
                        ? "var(--secondary-color)"
                        : "var(--primary-color)",
                    color: activeTab === tab ? "black" : "white",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex-grow-1 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "var(--background-color)",
            padding: "var(--spacing-md)",
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AccountHomeForm;
