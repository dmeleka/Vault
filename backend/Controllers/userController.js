import User from '../Models/userModel.js';
import { config } from 'dotenv';
import { loginModel as Login } from '../Models/loginModel.js';
import { cardModel as Card } from '../Models/cardModel.js';
import { secNoteModel as secNote } from '../Models/secNoteModel.js';
import { encryptData, decryptData } from './encrypt.js'
config()



export const Register = async (req, res) => {
    try {
        const Users = await User.find({});
        var exists = false;
        Users.forEach(user => {
            if (req.body.username == user.username || req.body.email == user.email) {
                exists = true;
            }
        });
        if (exists) {
            res.send("User already exists");
        } else {
            const newUser = new User(req.body);
            await newUser.save();
            res.send("User added");
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserData = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId })
        if (user) {
            res.json({ logins: decryptData(user.logins), cards: decryptData(user.cards), secNotes: user.secNotes })
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addLogin = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId });
        const newLogin = new Login(encryptData(req));
        user.logins.push(newLogin);
        await user.save();
        res.send("Login added");

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addCard = async (req, res) => {
    try {
        const [firstChar, secondChar] = req.body.cardNumber;
        let brand;
        if (firstChar == '4') {
            brand = 'visa'
        }
        else if (firstChar === '5' && ['1', '2', '3', '4', '5'].includes(secondChar)) {
            brand = 'mastercard'
        }
        const user = await User.findOne({ _id: req.userId });
        const newCard = new Card(encryptData(req));
        newCard.brand = brand;
        user.cards.push(newCard);
        await user.save();
        res.send("Card added");

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}