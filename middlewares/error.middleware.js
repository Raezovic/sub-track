const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err};

        error.message = err.message;

        console.error(err);
        // Mongoose bas ObjectId

        if (err.name === 'ValidationError') {
            const message = 'resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        if (err.name === 1000) {
            const message = 'resource already exists';
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error.message = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server Error'});
    }catch (error) {
        next(error);
    }
};

export default errorMiddleware;
// create a sub -> middleware (check for renewal date)

