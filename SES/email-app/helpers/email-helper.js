function makeTemplate(text) {
    return`
     <html>
     <head>
       <style>
        body {
          background: lightblue;
          text-align: center;
        }
       </style>
     </head>
     <body>
       <h1>SMS Email Demo</h1>
       <p>${ text }</p>
     </body>
     </html>
    `
}

module.exports = { makeTemplate }