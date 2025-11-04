const fs = require("fs");
const path = require("path");

const dist = "dist";

for (const file of fs.readdirSync(dist)) {
  if (file.endsWith(".html") && file !== "index.html") {
    const name = file.replace(".html", "");
    const dir = path.join(dist, name);

    fs.mkdirSync(dir, { recursive: true });

    fs.renameSync(path.join(dist, file), path.join(dir, "index.html"));
  }
}
