import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import * as taskController from "../controllers/taskController";

const router = Router({ mergeParams: true });

router.get("/search", authMiddleware, taskController.searchTasks);
router.get("/filter", authMiddleware, taskController.filterTasks);
router.get("/", authMiddleware, taskController.getTasks);
router.get("/:id", authMiddleware, taskController.getTaskById);

router.post("/", authMiddleware, taskController.createTask);

router.put("/:id", authMiddleware, taskController.updateTaskById);

router.delete("/:id", authMiddleware, taskController.deleteTask);

export default router;
