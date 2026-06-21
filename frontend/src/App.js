import { useEffect, useState } from "react";
import "@/App.css";
import Portfolio from "@/components/Portfolio";
import Loader from "@/components/Loader";
import { AnimatePresence } from "framer-motion";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {loading ? <Loader key="loader" /> : <Portfolio key="portfolio" />}
      </AnimatePresence>
    </div>
  );
}

export default App;
