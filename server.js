const app = require("./app");

const port = process.env.PORT || 7777;
app.listen(port, () => console.log(`Server listening at port: ${port}`));
