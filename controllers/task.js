import { Task } from "../models/task.js";
import ErrorHandler from "../middlewares/error.js";

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        await Task.create({
            title,
            description,
            user: req.user,
        });
        //same thing to save data in database
        // const task=new Task({title,description});
        // task.save();
        res.status(201).json({
            success: "true",
            message: "Task added successfully",
        });
    } catch (error) {
        next(error);
    }
};
export const getAllTasks = async (req, res,next) => {
    try {
        const userid = req.user._id;
        const tasks = await Task.find({ user: userid });
        res.json({
            success: "true",
            tasks,
        });
    } catch (error) {
        next(error);
    }
};
export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) return next(new ErrorHandler("task not found so i can't update", 404));

        task.isCompleted = !task.isCompleted;
        await task.save();
        res.status(201).json({
            success: "true",
            message: "Task updated",
        });
    } catch (error) {
        next(error);
    }
};
export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) return next(new ErrorHandler("task not found so i can't delete", 404));
        task.isCompleted = !task.isCompleted;
        await task.deleteOne();

        // if(!task)
        // return res.status(404).json({
        //     success:"false",
        //     message:"invalid task"
        // });

        res.status(201).json({
            success: "true",
            message: "Task deleted",
        });
    } catch (error) {
        next(error);
    }
};