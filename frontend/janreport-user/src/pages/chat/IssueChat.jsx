import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import issuesData from "../../assets/Data/issues";
import IssueTracking from "../../components/tracking/IssueTracking";
import "./IssueChat.css";

const IssueChat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const issue = issuesData.find((i) => i.id === Number(id));

  const [message, setMessage] = useState("");
  const bottomRef = useRef(null);

  const [chatHistory, setChatHistory] = useState([
    { id: 1, role: "system", text: "Welcome to the official discussion for this report.", time: "10:00 AM" },
    { id: 2, role: "citizen", text: "Any updates on when the repair crew will arrive?", time: "10:05 AM" },
    { id: 3, role: "admin", text: "The team has been dispatched and should be there by noon.", time: "10:15 AM" },
  ]);

  const trackingData = [
    {
      step: "Issue Reported",
      description: "Citizen reported the issue through JanReport.",
      date: "09:55 AM",
    },
    {
      step: "Admin Verified",
      description: "Issue verified and forwarded to department.",
      date: "10:00 AM",
    },
    {
      step: "Crew Dispatched",
      description: "Repair team dispatched to the location.",
      date: "10:10 AM",
    },
    {
      step: "Issue Resolved",
      description: "Issue successfully resolved.",
      date: null,
    },
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  if (!issue) return <div className="container py-5">Issue not found</div>;

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        role: "citizen",
        text: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);

    setMessage("");
  };

  return (
    <div className="chat-page-wrapper">
      <div className="container-fluid py-3 h-100">

        {/* HEADER */}
        <div className="chat-header">
          <div className="header-left">
            <button className="back-btn" onClick={() => navigate(-1)}>←</button>
            <div>
              <h6>{issue.title}</h6>
              <small>📍 {issue.location}</small>
            </div>
          </div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="chat-layout">

          {/* LEFT – CHAT */}
          <div className="chat-panel">
            <div className="chat-messages">
              {chatHistory.map((msg) => (
                <div key={msg.id} className={`message-row ${msg.role}`}>
                  <div className="message-bubble">
                    {msg.role !== "citizen" && (
                      <span className="sender-name">{msg.role}</span>
                    )}
                    <p>{msg.text}</p>
                    <span className="message-time">{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <footer className="chat-footer">
              <form onSubmit={sendMessage}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </footer>
          </div>

          {/* RIGHT – TRACKING */}
          <div className="tracking-panel">
            <IssueTracking tracking={trackingData} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default IssueChat;
