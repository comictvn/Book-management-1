const ToDo = require('../models/ToDo');

// Create a new ToDo
exports.createToDo = async (req, res) => {
    try {
        const { title, description, dueDate, completed } = req.body;
        const newToDo = new ToDo({
            title,
            description,
            dueDate,
            completed: completed || false
        });
        const savedToDo = await newToDo.save();
        res.status(201).json({
            success: true,
            data: savedToDo,
            message: 'ToDo created successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            message: 'Failed to create ToDo'
        });
    }
};

// Get all ToDos
exports.getToDos = async (req, res) => {
    try {
        const toDos = await ToDo.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: toDos,
            message: 'ToDos retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Failed to retrieve ToDos'
        });
    }
};

// Get a single ToDo by ID
exports.getToDoById = async (req, res) => {
    try {
        const toDo = await ToDo.findById(req.params.id);
        if (!toDo) {
            return res.status(404).json({
                success: false,
                error: 'ToDo not found',
                message: 'ToDo with the specified ID does not exist'
            });
        }
        res.status(200).json({
            success: true,
            data: toDo,
            message: 'ToDo retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Failed to retrieve ToDo'
        });
    }
};

// Update a ToDo by ID
exports.updateToDo = async (req, res) => {
    try {
        const { title, description, dueDate, completed } = req.body;
        const updatedToDo = await ToDo.findByIdAndUpdate(
            req.params.id,
            { title, description, dueDate, completed },
            { new: true }
        );
        if (!updatedToDo) {
            return res.status(404).json({
                success: false,
                error: 'ToDo not found',
                message: 'ToDo with the specified ID does not exist'
            });
        }
        res.status(200).json({
            success: true,
            data: updatedToDo,
            message: 'ToDo updated successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            message: 'Failed to update ToDo'
        });
    }
};

// Delete a ToDo by ID
exports.deleteToDo = async (req, res) => {
    try {
        const deletedToDo = await ToDo.findByIdAndDelete(req.params.id);
        if (!deletedToDo) {
            return res.status(404).json({
                success: false,
                error: 'ToDo not found',
                message: 'ToDo with the specified ID does not exist'
            });
        }
        res.status(200).json({
            success: true,
            data: deletedToDo,
            message: 'ToDo deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Failed to delete ToDo'
        });
    }
};