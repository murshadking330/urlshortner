import { useState, useEffect } from "react";

export default function Admin() {
  const [id, setId] = useState("");
  const [url, setUrl] = useState("");
  const [msg, setMsg] = useState("");
  const [links, setLinks] = useState([]);

  // Load existing links
  useEffect(() => {
    fetch("/api/list")
      .then((res) => res.json())
      .then((data) => setLinks(data));
  }, []);

  // Create new short link
  const submit = async () => {
    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, url }),
    });

    const data = await res.json();
    setMsg(data.message);

    // Refresh table
    fetch("/api/list")
      .then((res) => res.json())
      .then((data) => setLinks(data));
  };

  return (
    <div style={{ maxWidth: "700px", margin: "50px auto", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>🔐 Admin Panel</h1>

      <div
        style={{
          padding: "20px",
          borderRadius: "10px",
          background: "#f8f8f8",
          marginBottom: "25px",
        }}
      >
        <h2>Create New Short Link</h2>

        <input
          placeholder="Short ID (ex: yt)"
          onChange={(e) => setId(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            fontSize: "16px",
          }}
        />

        <input
          placeholder="Full URL (ex: https://youtube.com)"
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            fontSize: "16px",
          }}
        />

        <button
          onClick={submit}
          style={{
            padding: "12px 25px",
            background: "black",
            color: "white",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Create
        </button>

        <p style={{ marginTop: "10px", fontWeight: "bold" }}>{msg}</p>
      </div>

      <h2>📄 All Short Links</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#ddd" }}>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Short</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>URL</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>
              Clicks
            </th>
          </tr>
        </thead>
        <tbody>
          {links.map((x, i) => (
            <tr key={i}>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                /{x.id}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                {x.url}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                {x.clicks}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
