const app = require("./app");
const { PORT } = require("./config/dotenv");

app.listen(PORT, () => {
  console.log(`Server running at PORT - ${PORT}`);
});
