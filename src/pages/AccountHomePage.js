import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountHomeForm from "../components/AccountHomeForm";

const AccountHomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("welcome");

  // ---- Storage state ----
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [files, setFiles] = useState([]);

  // ---- User state ----
  const [currentUser, setCurrentUser] = useState(null);

  // ---- Portfolio state ----
  const [portfolios, setPortfolios] = useState([]);
  const [activePortfolio, setActivePortfolio] = useState(null);
  const [portfolioContent, setPortfolioContent] = useState("");

  // ---- State where the portfolio is being edited"
  const [editingTitle, setEditingTitle] = useState("");

  const token = localStorage.getItem("token");

  // ---- Logout ----
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ---- Fetch logged-in user ----
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await fetch("http://localhost:8080/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await resp.json();
        if (resp.ok) setCurrentUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    if (token) fetchUser();
  }, [token]);

  // ================= STORAGE =================
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const resp = await fetch("http://localhost:8080/api/files/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.msg || "File upload failed");

      setUploadMessage(`✅ File uploaded: ${data.filename}`);
      setSelectedFile(null);
      await fetchFiles();
    } catch (err) {
      console.error("Upload error:", err);
      setUploadMessage("❌ " + err.message);
    }
  };

  const fetchFiles = async () => {
    try {
      const resp = await fetch("http://localhost:8080/api/files/myfiles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.msg || "Failed to fetch files");
      setFiles(data);
    } catch (err) {
      console.error("Fetch files error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const resp = await fetch(`http://localhost:8080/api/files/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.msg || "Failed to delete");
      setUploadMessage("✅ " + data.msg);
      setFiles((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      setUploadMessage("❌ " + err.message);
    }
  };

  useEffect(() => {
    if (activeTab === "storage") fetchFiles();
  }, [activeTab]);

  // ================= PORTFOLIO =================
  const fetchPortfolios = async () => {
    try {
      const resp = await fetch("http://localhost:8080/api/portfolios/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await resp.json();
      if (resp.ok) setPortfolios(data);
    } catch (err) {
      console.error("Error fetching portfolios:", err);
    }
  };

  useEffect(() => {
    if (activeTab === "portfolio") fetchPortfolios();
  }, [activeTab]);

  const handleSelectPortfolio = (portfolio) => {
    setActivePortfolio(portfolio);
    setPortfolioContent(portfolio.sections?.[0]?.content || "");
    setEditingTitle(portfolio.title);
  };

  const handleCreatePortfolio = () => {
    // 1. Create a temporary, new portfolio object in memory (it has no _id yet)
    const newTempPortfolio = {
      title: "Untitled Portfolio",
      sections: [{ name: "Main", content: "" }],
    };
    // 2. Set this temporary object as the active one for editing
    setActivePortfolio(newTempPortfolio);
    setPortfolioContent("");
    setEditingTitle("Untitled Portfolio");
  };

  const handleDiscard = () => {
    setActivePortfolio(null);
    setPortfolioContent("");
    setEditingTitle("");
  };

  // --- REVISED: Save is now "smarter" and handles both Create (POST) and Update (PUT) ---
  const handleSavePortfolio = async () => {
    if (!activePortfolio) return;

    // Determine if this is a NEW portfolio (has no _id) or an EXISTING one
    const isNew = !activePortfolio._id;
    const url = isNew
      ? "http://localhost:8080/api/portfolios"
      : `http://localhost:8080/api/portfolios/${activePortfolio._id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const resp = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editingTitle, // Send the updated title
          sections: [{ name: "Main", content: portfolioContent }],
        }),
      });

      const savedPortfolio = await resp.json();
      if (!resp.ok) throw new Error(savedPortfolio.msg || "Failed to save");

      if (isNew) {
        // If we just created a new portfolio, add it to our list
        setPortfolios((prev) => [...prev, savedPortfolio]);
      } else {
        // If we updated an existing one, update it in our list
        setPortfolios((prev) =>
          prev.map((p) => (p._id === savedPortfolio._id ? savedPortfolio : p))
        );
      }

      setActivePortfolio(savedPortfolio); // Set the active portfolio to the saved version (which now has an ID)
      alert("✅ Portfolio saved!");
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ " + err.message);
    }
  };

  // Pass everything to the UI component
  return (
    <AccountHomeForm
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      currentUser={currentUser}
      handleLogout={handleLogout}
      selectedFile={selectedFile}
      handleFileChange={handleFileChange}
      handleFileUpload={handleFileUpload}
      uploadMessage={uploadMessage}
      files={files}
      handleDelete={handleDelete}
      portfolios={portfolios}
      activePortfolio={activePortfolio}
      portfolioContent={portfolioContent}
      setPortfolioContent={setPortfolioContent}
      handleCreatePortfolio={handleCreatePortfolio}
      handleSavePortfolio={handleSavePortfolio}
      handleSelectPortfolio={handleSelectPortfolio}
      editingTitle={editingTitle}
      setEditingTitle={setEditingTitle}
      handleDiscard={handleDiscard}
    />
  );
};

export default AccountHomePage;
