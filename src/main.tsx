import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@fontsource-variable/manrope/wght.css"
import "@fontsource-variable/unbounded/wght.css"
import "./styles/tokens.css"
import "./styles/global.css"
import "./styles/install.css"
import "./styles/home-sections.css"
import "./styles/channel.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
