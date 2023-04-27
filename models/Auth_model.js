const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require ('dotenv').config()
const DB_URL = process.env.DB_URL
const user_modelSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },

    });

const user_model = mongoose.model('user', user_modelSchema);
exports.create_NewUser = async (username, email, password) => {
    try {
        await mongoose.connect(DB_URL);
        const find_user = await user_model.findOne({ email: email });
        if (find_user) {
            console.log("email is exist");
            return;

        } else {
            const hash_password = await bcrypt.hash(password, 10);
            const create_user = new user_model({
                username: username,
                password: hash_password,
                email: email,
            });
            
            const save_user = await create_user.save();
            console.log(" success sign up"); 
            return save_user;
            
        }
    } catch (error) {
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};

exports.login = async (email, password) => {
    try {
        await mongoose.connect(DB_URL);
        const find_user = await user_model.findOne({ email: email });
        if (!find_user) {
            console.log("email is not  exist");
            return;

        } else {
            const same_password = await bcrypt.compare(password, find_user.password)
            if (!same_password) {
                console.log("password is incorrect")
            }
            else {
                console.log("success login")
                return find_user._id
            }
        }

    } catch (error) {
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};