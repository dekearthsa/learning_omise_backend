const {app} = require("./router/app");
const PORT = 3323;

app.listen(PORT, () => {
    console.log(`service learning Omise listen to port: ${PORT}, http://localhost:${PORT}/api/debug`);
})

