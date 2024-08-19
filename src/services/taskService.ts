import { query } from "express";
import { prismaClient } from "../config/database";
import * as taskEnums from "../enums/taskEnums";
import { connect } from "http2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

type createTaskParams = {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  userId: string;
};

type updateTaskParams = {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
};

type taskFilters = {
  status?: string;
  priority?: string;
  dueDate?: string;
};

export const createTask = async (params: createTaskParams) => {
  try {
    const { title, description, status, priority, dueDate, userId } = params;
    const statusEnumVal = taskEnums.getTaskStatusValue(status);
    const priorityEnumVal = taskEnums.getTaskPriorityValue(priority);
    const task = await prismaClient.task.create({
      data: {
        title,
        description,
        status: statusEnumVal,
        priority: priorityEnumVal,
        dueDate: new Date(dueDate),
        userId,
      },
    });
    return task;
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      throw Error("Task already exists");
    }
    throw Error(`Something went wrong: ${err}`);
  }
};

export const getTasks = async (userId: string, page: number, limit: number) => {
  try {
    const tasks = await prismaClient.task.findMany({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
    });
    return tasks;
  } catch (err) {
    throw Error(`Something went wrong: ${err}`);
  }
};

export const getTaskById = async (id: string) => {
  try {
    const task = await prismaClient.task.findUnique({ where: { id } });
    return task;
  } catch (err) {
    throw Error(`Something went wrong: ${err}`);
  }
};

export const updateTaskById = async (id: string, params: updateTaskParams) => {
  const { title, description, status, priority, dueDate } = params;
  try {
    const statusEnumVal = taskEnums.getTaskStatusValue(status);
    const priorityEnumVal = taskEnums.getTaskPriorityValue(priority);
    const updatedTask = await prismaClient.task.update({
      where: { id },
      data: { title, description, status: statusEnumVal, priority: priorityEnumVal },
    });
    return updatedTask;
  } catch (err) {
    throw Error(`Something went wrong: ${err}`);
  }
};

export const deleteTaskById = async (id: string) => {
  try {
    const deletedTask = await prismaClient.task.delete({ where: { id } });
    return deletedTask;
  } catch (err) {
    throw Error(`Something went wrong: ${err}`);
  }
};

export const searchTasksByTitle = async (userId: string, title: string) => {
  try {
    const tasks = await prismaClient.task.findMany({
      where: {
        userId,
        title: {
          contains: title,
        },
      },
    });
    return tasks;
  } catch (err) {
    throw Error(`Something went wrong: ${err}`);
  }
};

export const filterTasks = async (userId: string, optionalFilters: taskFilters) => {
  try {
    type filters = { userId: string; status?: number; priority?: number; dueDate?: Date };
    let taskFilters: filters = { userId: userId };
    if (optionalFilters.status) {
      taskFilters.status = taskEnums.getTaskStatusValue(optionalFilters.status);
    }
    if (optionalFilters.priority) {
      taskFilters.priority = taskEnums.getTaskPriorityValue(optionalFilters.priority);
    }
    if (optionalFilters.dueDate) {
      taskFilters.dueDate = new Date(optionalFilters.dueDate);
    }
    const tasks = await prismaClient.task.findMany({
      where: { ...taskFilters },
    });
    return tasks;
  } catch (err) {
    throw new Error(`Something went wrong: ${err}`);
  }
};
