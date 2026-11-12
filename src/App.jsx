import { BrowserRouter, Routes, Route } from "react-router-dom";

import LanguageProvider from "./common/LanguageProvider";
import ScrollToTop from "./common/ScrollToTop";
import Navbar from "./common/navbar";
import Footer from "./common/footer";
import { forthcomingPages } from "./common/navigation";
import Home from "./pages/home";
import Edito from "./pages/Edito";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import InOut from "./pages/InOut";
import Forthcoming from "./pages/Forthcoming";
import NotFound from "./pages/NotFound";
import ArticlePage from "./pages/ArticlePage";
import About from "./pages/About";

/**
 * Routing — full magazine on `/` (home).
 * Edito, Blog, In & Out, and other sections stay separate menu tabs/pages.
 */
function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />

        <div className="flex min-h-screen flex-col">
          <Navbar />

          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edito" element={<Edito />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/in-out" element={<InOut />} />
              <Route path="/about" element={<About />} />

              {Object.entries(forthcomingPages).map(([slug, page]) => (
                <Route
                  key={slug}
                  path={`/${slug}`}
                  element={<Forthcoming page={page} />}
                />
              ))}

              <Route path="/stories/:slug" element={<ArticlePage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
