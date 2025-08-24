import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Section-specific passwords mapped to URLs
const projects = {
  infogather: { password: "akjc1", url: "https://github.com/htijna/Infogather" },
  threateye: { password: "akjc2", url: "https://example1.com" },
  portfolio: { password: "akjc3", url: "https://your-portfolio.com" },
  ecog: { password: "akjw1", url: "https://instagram.com" },
   dresscode: { password: "akjw2", url: "https://instagram.com" },
    flames: { password: "akjw3", url: "https://instagram.com" },
 
};

app.post("/api/unlock", (req, res) => {
  const { section, password } = req.body;

  if (!section || !password) {
    return res.status(400).json({ success: false, message: "Section and password are required" });
  }

  const project = projects[section.toLowerCase()];
  if (!project) {
    return res.status(400).json({ success: false, message: "Invalid section" });
  }

  if (project.password === password.trim()) {
    return res.json({ success: true, url: project.url });
  } else {
    return res.json({ success: false, message: "Invalid password for this section" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
