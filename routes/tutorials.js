import express from "express";
import action from "../controllers/tutorialController.js";
const router = express.Router();

router.post("/", action.create);
router.get("/", action.getAll);
router.get("/:id", action.getById);
router.delete("/:id", action.remove);

router.delete("/", action.removeAll);
router.put("/:id", action.updateById);

export default router;
