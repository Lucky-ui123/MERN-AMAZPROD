const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_WEB_URL, {
            // await mongoose.connect(process.env.MONGODB_WEB_URL || process.env.MONGODB_URL , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected");
    } catch (error) {
        console.error("Database Connection Error:", error);
    }
};

module.exports = dbConnect;
