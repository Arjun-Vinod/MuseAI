import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PoemGenerator.css";
import Header from "../header/header";
import { IoSend, IoMenu } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";

const PoemGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [poem, setPoem] = useState("");
  const [history, setHistory] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:4000/api/poem/history", {
          headers: { Authorization: token },
        });
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:4000/api/poem/generate",
        { prompt },
        { headers: { Authorization: token } }
      );

      setPoem(response.data.poem);
      setHistory((prevHistory) => [response.data, ...prevHistory]);
      setPrompt("");
    } catch (error) {
      console.error("Error generating poem:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(poem);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  
  const handleHistoryClick = (poemText) => {
    setPoem(poemText);
  };

  return (
    <div className="profile-container">
      
      <div className={`left-container ${showMenu ? "show" : "hide"}`}>
        <div className="welcome-container">
          <h2>Welcome,</h2>
          <h4>Create your Poem</h4>
        </div>
        <div className="history-container">
          <h4>History</h4>
          <ul>
            {history.map((item) => (
              <li key={item._id} onClick={() => handleHistoryClick(item.poem)} className="history-item">
                {item.prompt}
              </li>
            ))}
          </ul>
        </div>
      </div>

      
      <div className="right-container">
        <Header />
        <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
          <IoMenu />
        </button>
        {copySuccess && <div className="copy-popup">Copied!</div>}
        
        
        <div className="poem-container">
          <pre className="poem">
            {poem}
            {poem && (
              <button className="copy-btn" onClick={handleCopy}>
                <FaCopy />
              </button>
            )}
          </pre>
        </div>

        <div className="prompt-container">
          <form className="form-container2" onSubmit={handleGenerate}>
            <input
              type="text"
              placeholder="Enter prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="input-container2"
            />
            <button type="submit" className="generate-btn">
              <IoSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PoemGenerator;
