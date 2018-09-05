require("ignore-styles");
const bodyParser = require("body-parser");
const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const favicon = require("serve-favicon");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");

require("@babel/register")({
  ignore: [/\/(build|node_modules)\//]
});

// routes
const universalLoader = require("./universal");

const app = express();

// webpack hmr
const compiler = webpack(webpackConfig);

app
  .use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: "/"
    })
  )
  .use(require("webpack-hot-middleware")(compiler))

  // Support gzip
  .use(compression())

  // Support post requests with body data (doesn't support multipart, use multer)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))

  // Server favicon before to not show up in logs
  .use(favicon(path.join(__dirname, "../build", "favicon.ico")))

  // Setup logger
  .use(morgan("combined"))

  // Send a version of index.html that is stripped of placeholders. The service-worker requests this file directly.
  .use("/index.html", (req, res) => {
    fs.readFile(
      path.resolve(__dirname, "..", "build", "index.html"),
      "utf8",
      (err, htmlData) => {
        res.send(
          htmlData.replace(/DATA\s*=\s*{{.*?}}/g, "").replace(/{{.*?}}/g, "")
        );
      }
    );
  })

  // Server JS/CSS Bundle with Cache-Control
  .use(
    "/static",
    express.static(path.resolve(__dirname, "..", "build/static"), {
      maxAge: "30d"
    })
  )

  // Server manifest with cache headers
  .use("/manifest.json", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "manifest.json"), {
      maxAge: "1d"
    });
  })

  // Serve static assets
  .use(express.static(path.resolve(__dirname, "..", "build"), { index: false }))

  // Always return the main index.html, so react-router render the route in the client
  .use("/", universalLoader);

module.exports = app;
