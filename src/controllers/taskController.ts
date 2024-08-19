import { AuthenticatedRequest } from "../types/authenticatedRequest";
import { NextFunction, Response } from "express";
import * as taskService from "../services/taskService";
import { StatusCodes } from "../utils/statusCodes";

export const createTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.createTask({
      ...req.body,
      userId: req.userId!,
    });
    res.status(StatusCodes.CREATED).json(task);
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.userId!;
    const tasks = await taskService.getTasks(userId, page as number, limit as number);
    res.status(StatusCodes.OK).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);
    if (!task) throw { status: StatusCodes.NOT_FOUND, message: "Not found" };
    res.status(StatusCodes.OK).json(task);
  } catch (err) {
    next(err);
  }
};

export const updateTaskById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedTask = await taskService.updateTaskById(id, { ...req.body });
    res.status(StatusCodes.OK).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedTask = await taskService.deleteTaskById(id);
    res.status(StatusCodes.OK).json(deletedTask);
  } catch (err) {
    next(err);
  }
};

export const searchTasks = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const { title } = req.query;
    if (!title) {
      throw { status: StatusCodes.BAD_REQUEST, message: "Title query parameter is required" };
    }
    const tasks = await taskService.searchTasksByTitle(userId, title as string);
    res.status(StatusCodes.OK).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const filterTasks = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const tasks = await taskService.filterTasks(userId, { ...req.query });
    res.status(StatusCodes.OK).json(tasks);
  } catch (err) {
    next(err);
  }
};
