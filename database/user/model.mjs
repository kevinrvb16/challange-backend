import bcrypt from 'bcrypt';
import User from './schema.mjs';

const createUser = (userData) => {
    const user = new User(userData);
    return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => {
            user.password = hash;
            return user.save();
        })
        .then(() => user)
        .catch((error) => {
            throw new Error(error.message);
        });
};

const getUserByEmail = (email) => {
    return User.findOne({ email })
        .then(user => user)
        .catch(() => {
            throw new Error('Failed to get user');
        });
};

const login = async (login) => {
    return getUserByEmail(login.email)
        .then(user => {
            if (!user) {
                throw new Error('User not found');
            }

            return bcrypt.compare(login.password, user.password)
                .then(passwordMatch => {
                    if (!passwordMatch) {
                        throw new Error('Invalid password');
                    }
                    return user;
                }).catch((error) => {
                    throw new Error(error.message);
                });
        });
};

export {
    createUser,
    getUserByEmail,
    login
};