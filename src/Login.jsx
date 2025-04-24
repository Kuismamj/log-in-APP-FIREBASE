import { useState } from "react"
import {
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "./firebase"

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" })
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value }) // ottaa käyttäjän syötteen ja asettaa sen valueksi

  const handleLogin = async (e) => {
    // käytetään asyncciä aikaa vievän verkko-operaation takia
    e.preventDefault() // sivusto ei lataudu uudelleen
    try {
      const res = await signInWithEmailAndPassword(
        // firebasen autent metodi
        auth, //firebase instanssi
        form.email,
        form.password
      )
      setUser(res.user) // UseSaten funktio joka päivittää user tilan
      setError("") // tyhjentää virheilmoitukset
    } catch (err) {
      setError("Kirjautuminen epäonnistui: " + err.message)
    }
  }
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider) // Kirjautuu sisään Google-tilillä
      const user = result.user
      setUser(user)
      setError("")
    } catch (err) {
      setError("Google kirjautuminen epäonnistui: " + err.message)
    }
  }

  const handleLogout = () => {
    signOut(auth)
    setUser(null)
  }

  return (
    <div className="login-container">
      {!user ? ( // ternary-operaattori, tarkistetaan onko käyttäjä kirjautunut
        <>
          <h2>Kirjaudu sisään</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Sähköposti"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Salasana"
              onChange={handleChange}
            />
            <button type="submit">Kirjaudu sähköpostilla</button>
          </form>
          <button onClick={handleGoogleLogin} style={{ marginTop: "1rem" }}>
            Kirjaudu Google-tilillä
          </button>
        </>
      ) : (
        // jos käyttäjä on kirjautunut ja user on olemassa
        <>
          <h2>Tervetuloa, {user.email}!</h2>
          <button onClick={handleLogout}>Kirjaudu ulos</button>
        </>
      )}
    </div>
  )
}
export default Login
