import {getById, create, updateById, login } from '../services/users.service.js'

export const getUserById = async (req, res) => {
    // Calling the service function with the id parsed as an integer, the id is a path parameter from the URL, it's a string, declared in the router
    const user = await getById(parseInt(req.params.id))

    // If the user is not found, we will return a 404 status code
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }

    // Otherwise we will return the user object
    return res.json({
        success: true,
        data: user
    })
}
export const registerUser = async (req, res, next) => {
    // We get fullName, email, password, role, and status from the request body
    const { username, email, password} = req.body;
    let user;

    try {
        // Call the create service with the full name, email, password, and optional role/status
        user = await create(username, email, password);
    } catch (err) {
        // Handle errors (e.g., email already exists)
        return next(err);
    }

    // Return the created user as the response
    res.json({
        success: true,
        data: user,
    });
}

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body
    let token

    try {
        token = await login(email, password)
    } catch (err) {
        return next(err)
    }

    // We will return a success message if the login was successful and the token
    res.json({
        success: true,
        message: 'Login successful',
        token: token
    })
}


export const patchUser = async (req, res, next) => {
    const id = parseInt(req.params.id); // User ID from the URL
    const updateData = req.body; // Data to update

    try {
        const updatedUser = await updateById(id, updateData);
        res.json({
            success: true,
            data: updatedUser,
        });
    } catch (err) {
        next(err); // Handle errors (user not found, email already in use, etc.)
    }
};