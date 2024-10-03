const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://chodvadiyaprinci:princy6354@cluster0.gbuuhgc.mongodb.net/library')
            .then(() => console.log('MongoDB Connected!'))
            .catch((error) => console.log('MongoDB Disconnected!' + error));
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB