const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_LIBARAY_URL)
            .then(() => console.log('MongoDB Connected!'))
            .catch((error) => console.log('MongoDB Disconnected!' + error));
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB