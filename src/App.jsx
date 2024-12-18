import React, { useState } from "react";
import ProfilKorisnika from "./components/Korisnik";

function App() {
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [podatci, setPodatci] = useState(null);
  const [repozitoriji, setRepozitoriji] = useState([]);
  const [greska, setGreska] = useState(null);
  const [ucitavanje, setUcitavanje] = useState(false);

  const dohvatiGithubKorisnika = async () => {
    if (!korisnickoIme) {
      setGreska("Molimo unesite Github korisničko ime.");
      return;
    }
    setUcitavanje(true);
    setGreska(null);
    setPodatci(null);
    setRepozitoriji([]);

    const GITHUB_KORISNIK_URL = `https://api.github.com/users/${korisnickoIme}`;
    const GITHUB_REPOZITORIJI_URL = `https://api.github.com/users/${korisnickoIme}/repos`;

    try {
      const odgovorKorisnik = await fetch(GITHUB_KORISNIK_URL);
      if (!odgovorKorisnik.ok) {
        throw new Error(`Korisnik "${korisnickoIme}" nije pronađen.`);
      }
      const podaciKorisnika = await odgovorKorisnik.json();
      setPodatci(podaciKorisnika);

      const odgovorRepozitoriji = await fetch(GITHUB_REPOZITORIJI_URL);
      if (!odgovorRepozitoriji.ok) {
        throw new Error(`Repozitoriji nisu pronađeni za korisnika "${korisnickoIme}".`);
      }
      const podaciRepozitorija = await odgovorRepozitoriji.json();
      setRepozitoriji(podaciRepozitorija);
    } catch (err) {
      setGreska(err.message);
    } finally {
      setUcitavanje(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", margin: "20px" }}>
      <h1>Github Podaci Korisnika</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Unesite Github korisničko ime"
          value={korisnickoIme}
          onChange={(e) => setKorisnickoIme(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "250px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={dohvatiGithubKorisnika}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Dohvati Podatke
        </button>
      </div>

      {ucitavanje && <p>Učitavanje...</p>}

      {greska && <p style={{ color: "red" }}>{greska}</p>}

      {podatci && <ProfilKorisnika podatci={podatci} />}

      {repozitoriji.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Repozitoriji:</h3>
          <ul>
            {repozitoriji.map((repo) => (
              <li key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;