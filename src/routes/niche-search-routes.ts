import express from "express";
import { createMyNicheSearch, deleteMyNicheSearchById, getAllMyNicheSearches, getMyNicheSearchById, updateMyNicheSearchById } from "../controllers/my-niche-search-controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllMyNicheSearches);
router.get("/:id", getMyNicheSearchById);
router.post("/", createMyNicheSearch);
router.put("/:id", updateMyNicheSearchById);
router.delete("/:id", deleteMyNicheSearchById);

export default router;

