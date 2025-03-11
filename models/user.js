const { Schema, model } = require('mongoose')
const { createHmac, randomBytes } = require('crypto');


const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String,
        default: '/images/userprofile.jpeg.jpg',
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
}, { timestamps: true })


//for password hashing 
userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) return;


    const salt =randomBytes(32).toString('hex');
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword;
    next();


})

userSchema.static('matchPassword', async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User not found');

    const salt = user.salt;
    const userProvidedHash = createHmac('sha256', salt).update(password).digest('hex');
    if (userProvidedHash !== user.password) throw new Error('Password not matched');
    return { ...user._doc, password: undefined, salt: undefined
    // return user
     }
})

const User = model("user", userSchema)

module.exports = User