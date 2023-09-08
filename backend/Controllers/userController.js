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

export const setFavourite = async (req, res) => {
    try {
        const filter = { _id: req.userId, "logins._id": req.body.itmId };

        const user = await User.findOne(filter);

        if (user) {
            const loginIndex = user.logins.findIndex(login => login._id.toString() === req.body.itmId);

            if (loginIndex !== -1) {
                const currentFavourite = user.logins[loginIndex].favourite;

                await User.updateOne(filter, { $set: { [`logins.${loginIndex}.favourite`]: !currentFavourite } });

                // Now the favourite status has been toggled in the database
                res.send("Done")
            } else {
                // Login item not found
            }
        } else {
            // User not found
        }


    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteItm = async (req, res) => {
    try {
        const itemId = req.body.itmId;
        const user = await User.findById(req.userId);

        // Search for the item across all arrays
        const arraysToSearch = ['logins', 'cards', 'secNotes'];
        let foundItem = null;
        let foundArrayType = null;

        for (const arrayType of arraysToSearch) {
            const targetArray = user[arrayType];
            const itemIndex = targetArray.findIndex(item => item._id.toString() === itemId);
            if (itemIndex !== -1) {
                foundItem = targetArray[itemIndex];
                foundArrayType = arrayType;
                targetArray.splice(itemIndex, 1);
                break;
            }
        }

        if (!foundItem) {
            return res.status(404).json({ message: 'Item not found.' });
        }

        // Save the updated user
        await user.save();

        res.status(200).json({ message: `Item deleted from ${foundArrayType} successfully.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateItem = async (req, res) => {
    try {
        const encryptedData = encryptData(req);
        const user = await User.findById(req.userId);

        if (req.body.itmType === "L") {
            // Use Mongoose's array filtering to find the login by _id
            const foundLogin = user.logins.id(req.body.itmId);
            // Update the attributes
            foundLogin.title = encryptedData.title;
            foundLogin.username = encryptedData.username;
            foundLogin.password = encryptedData.password;
            foundLogin.websiteLink = req.body.websiteLink;
        }

        // Save the updated user document
        await user.save();

        res.status(200).send("Data Updated")

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
