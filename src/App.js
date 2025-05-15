import React, { useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();
      setMessages([...updatedMessages, data.reply]);
    } catch (err) {
      setMessages([...updatedMessages, { role: "assistant", content: "Błąd połączenia z Amelią 😢" }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>Amelia</h1>
      <div style={{ background: "#f4f4f4", padding: "1rem", minHeight: "200px", marginBottom: "1rem" }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.role === "user" ? "Paweł:" : "Amelia:"}</strong> {msg.content}
          </div>
        ))}
        {loading && <div><em>Amelia pisze...</em></div>}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Napisz coś..."
        style={{ width: "100%", padding: "0.5rem" }}
      />
      <button onClick={sendMessage} style={{ marginTop: "0.5rem" }}>Wyślij</button>
    </div>
  );
}

export default App;