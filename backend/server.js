require('dotenv').config();
const server = require('./src/app');

const port = process.env.PORT || 3003;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
