import express from "express";
import { Register, addLogin, addCard, getUserData, setFavourite, deleteItm, updateItem } from "../Controllers/userController.js";
import { login, logout, verifyJWT } from "../Controllers/auth.js";

const router = express.Router();

router.post('/register', Register);
router.post('/login', login);
router.post('/addLogin', verifyJWT, addLogin);
router.post('/addCard', verifyJWT, addCard);
router.post('/setFavourite', verifyJWT, setFavourite);
router.post('/deleteItm', verifyJWT, deleteItm);
router.post('/updateItem', verifyJWT, updateItem);

router.get('/getUserData', verifyJWT, getUserData);

// router.post('/refreshToken', refreshToken);
router.delete('/logout', logout);

export default router;