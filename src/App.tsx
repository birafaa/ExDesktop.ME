import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SiteLayout } from "./components/layout/SiteLayout.tsx"
import { DocsPage } from "./pages/DocsPage.tsx"
import { HomePage } from "./pages/HomePage.tsx"
import { NotFoundPage } from "./pages/NotFoundPage.tsx"
import { ThemeModeProvider } from "./theme/ThemeModeProvider.tsx"

export default function App() {
  return (
    <ThemeModeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/docs/ai" element={<DocsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeModeProvider>
  )
}
