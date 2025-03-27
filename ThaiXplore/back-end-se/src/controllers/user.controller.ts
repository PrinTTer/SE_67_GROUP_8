import { get } from "lodash";
import { getUsers, deleteUserById, getUserById, updateUserById, getUserByEmail } from "../models/users";
import express from "express";
import { authentication } from "../helpers/encryption";
import path from "path";
import { getPackageById } from "../models/package";

export const getAllUsers = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const getUser = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const currentUserId: string = get(req, 'identity._id');
        const user = await getUserById(currentUserId);

        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { firstName, lastName, address, phoneNumber, notification } = req.body;
        const currentUserId: string = get(req, 'identity._id');

        const user = await updateUserById(currentUserId, {
            firstName: firstName,
            lastName: lastName,
            address: address,
            phoneNumber: phoneNumber,
            notification: notification,
        })

        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const updateNotification = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const {id} = req.params;
        const { notification } = req.body;
        const currentUserId: string = get(req, 'identity._id');

        const user = await getUserById(id);

        const updated = await updateUserById(id , {
            notification : user.notification ? user.notification + notification : notification
        });

        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const updateUserEmail = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { newEmail, password } = req.body;
        const currentUserId: string = get(req, 'identity._id');

        const user = await getUserById(currentUserId).select('+authentication.salt +authentication.password');
        if (!newEmail || !password) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);
        if (expectedHash !== user.authentication.password) {
            return res.status(403).json({ message: "The password is incorrect." });
        }

        const expectEmail = await getUserByEmail(newEmail);
        if (expectEmail) {
            return res.status(400).json({ message: "This email address is already in use." });
        }


        user.email = newEmail;
        user.save();

        return res.status(200).json({ message: "Your email has been changed successfully." });
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const updateUserPassword = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { currentPassword, newPassword } = req.body;
        const currentUserId: string = get(req, 'identity._id');

        const user = await getUserById(currentUserId).select('+authentication.salt +authentication.password');
        if (!currentPassword || !newPassword) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, currentPassword);
        if (expectedHash !== user.authentication.password) {
            return res.status(403).json({ message: "The original password is incorrect." });
        }

        user.authentication.password = authentication(user.authentication.salt, newPassword);
        user.save();

        return res.status(200).json({ message: "Your password has been changed successfully." });
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const currentUserId: string = get(req, 'identity._id');
        const user = await getUserById(currentUserId);

        if(!user){
            return res.sendStatus(400);
        }

        const deletedUser = await deleteUserById(user._id.toString());

        return res.status(200).json(deletedUser);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const uploadUserProfileImage = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        if (!req.file) {
            return res.sendStatus(400);
        }

        const currentUserId: string = get(req, 'identity._id');
        const user = await getUserById(currentUserId);

        user.media = req.file.filename;
        user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getUserProfileImage = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const currentUserId: string = get(req, 'identity._id');
        const user = await getUserById(currentUserId);

        if (!user.media) {
            return res.sendStatus(400);
        }

        const imagePath = path.resolve(__dirname, "../../public/uploads/users/images", user.media);

        res.sendFile(imagePath);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const buyPackages = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { packageId, amount, paymentMethod } = req.body;
        const currentUserId: string = get(req, 'identity._id');
        const user = await getUserById(currentUserId);

        if (!packageId || !amount) {
            return res.sendStatus(400);
        }

        const dateNow = new Date();
        const packages = await getPackageById(packageId);

        if (!packages) {
            return res.sendStatus(400);
        }

        const expirationDate = new Date();
        expirationDate.setDate(dateNow.getDate() + packages.totalExpirationDate);

        for (let index = 1; index <= amount; index++) {
            user.packages.push({
                packageId,
                expirationDate: expirationDate,
                status: "unused",
            });
        }

        packages.packageTransactionHistory.push({
            userId: user._id,
            transactionDate: dateNow,
            paymentMethod: paymentMethod,
            amount: amount,
            totalPrice: amount * packages.price
        })

        await packages.save();
        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const deleteUserByAdmin = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { id } = req.params;
        const currentUserId: string = get(req, 'identity._id');
        const user = await getUserById(currentUserId);

        if (user.role !== 'admin') {
            return res.sendStatus(401);
        }

        const deletedUser = await deleteUserById(id);

        return res.status(200).json(deletedUser);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const updateUserByAdmin = async (req: express.Request, res: express.Response): Promise<any> => {
    try {

        

        const { firstName, lastName, address, phoneNumber, email , role } = req.body;
        const { id } = req.params;
        const currentUserId: string = get(req, 'identity._id');
        const user = await getUserById(currentUserId);
        
        if (user.role !== 'admin') {
            return res.sendStatus(401);
        }

        const updatedUser = await updateUserById(id, {
            email : email,
            firstName: firstName,
            lastName: lastName,
            address: address,
            phoneNumber: phoneNumber,
            role : role
        })

        return res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}





