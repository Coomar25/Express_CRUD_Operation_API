import express from 'express';
import { insertUserDetails, getAllUserDetails, updateUserDetails, deleteUserDetails } from '../controller/user.js';

const router = express.Router();

router.post("/api/insertUserDetails", insertUserDetails);
router.get("/api/getAllUserDetails", getAllUserDetails);
router.put('/api/updateUserDetails/:id', updateUserDetails);
router.delete('/api/deleteUserDetails/:id', deleteUserDetails);


export default router;