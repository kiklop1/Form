import React from "react";

function UserProfile({ podatci }) {
  return (
    <div>
      <a
        href={podatci.html_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <img
          src={podatci.avatar_url}
          alt={`${podatci.name || "Korisnik"}'s avatar`}
          style={{ width: "150px", borderRadius: "50%", marginBottom: "20px" }}
        />
      </a>
      <h2>{podatci.name || "-"}</h2>
      <p><strong>Lokacija:</strong> {podatci.location || "-"}</p>
      <p><strong>Bio:</strong> {podatci.bio || "-"}</p>
    </div>
  );
}

export default UserProfile;