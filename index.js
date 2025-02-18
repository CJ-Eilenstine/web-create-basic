const path = require("path");
const fs = require("fs");
const readline = require("readline");

const app = readline.createInterface({
  output: process.stdout,
  input: process.stdin,
});

app.question("Name of Project:", function (projectName) {
  const projectDirectory = path.join(process.cwd(), projectName);
  const functionsDirectory = path.join(projectDirectory, "functions");
  const stylesDirectory = path.join(projectDirectory, "css");
  const cssFile = path.join(stylesDirectory, "styles.css");
  const readmeFile = path.join(projectDirectory, "readme.md");
  const gitIgnoreFile = path.join(projectDirectory, ".gitignore");
  const indexFile = path.join(projectDirectory, "index.html");

  if (!fs.existsSync(projectDirectory)) {
    fs.mkdirSync(projectDirectory);
  }

  if (!fs.existsSync(functionsDirectory)) {
    fs.mkdirSync(functionsDirectory);
  }

  if (!fs.existsSync(stylesDirectory)) {
    fs.mkdirSync(stylesDirectory);
  }

  // Grabbing Webfile and Server file and making them inside functions folder for every new project
  const WebFile = path.join(__dirname, "lib/webfile.js");
  fs.writeFileSync(
    path.join(functionsDirectory, "webfile.js"),
    fs.readFileSync(WebFile)
  );

  const ServerFile = path.join(__dirname, "lib/server.js");
  fs.writeFileSync(
    path.join(functionsDirectory, "server.js"),
    fs.readFileSync(ServerFile)
  );
  // Note Close

  fs.writeFileSync(
    indexFile,
    `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body></body>
</html>`
  );

  fs.writeFileSync(
    cssFile,
    `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin-bottom: 16px;
}
`
  );

  fs.writeFileSync(
    gitIgnoreFile,
    `
# Ignore Files and Directories in this folder
node_modules
    `
  );

  fs.writeFileSync(readmeFile, `## Project Name: ${projectName}`);

  app.question("Description of the Project:", function (projectDesc) {
    fs.appendFileSync(
      path.join(readmeFile),
      `

### Project Description:

${projectDesc}`
    );

    app.question("Author Name:", function (projectAuth) {
      fs.appendFileSync(
        path.join(readmeFile),
        `
      
### Project Author:

${projectAuth}`
      );

      app.close();
    });
  });
});
