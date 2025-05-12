import prisma from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getById = async (id) => {
    return await prisma.user.findUnique({
        select: {
            id: true,
            username: true,
            email: true,
            wins: true,
            losses: true,
            draws: true,
        },
        where: {
            id
        }
    })
}


export const login = async (email, password) => {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (!user) throw new Error('User not found')

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');

    // Generate a token here
    const token = jwt.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })

    return token
}

export const create = async (username, email, password) => {
    // Check if the email already exists
    const count = await prisma.user.count({
        where: {
            email
        }
    });

    if (count > 0) throw new Error('Email already exists');

    // Hash the password before saving to the database
    const encryptedPassword = await bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));

    // Create the user
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: encryptedPassword,
           
        },
        select: {
            id: true,
            email: true,
            username: true,

        }
    });

    return user;
}

export const updateById = async (id, updateData) => {
    // Check if the user exists
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        throw new Error('User not found');
    }

    // Optional: Validate uniqueness of email if it is being updated
    if (updateData.email) {
        const emailExists = await prisma.user.findUnique({
            where: { email: updateData.email }
        });

        if (emailExists && emailExists.id !== id) {
            throw new Error('Email is already in use');
        }
    }

    // Patch the user data (only the fields provided will be updated)
    const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData,  // Only fields in updateData will be updated
        select: {
            id: true,
            username: true,
            email: true,
        },
    });

    return updatedUser;
};