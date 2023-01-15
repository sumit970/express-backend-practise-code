require('dotenv').config();
const mongoose = require('mongoose')
// const emitter=require('emitter')
// emitter.setMaxListeners(30);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signupschemap = new mongoose.Schema({
    
    firstname:
    {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }

    }]
})

signupschemap.methods.generateAuthToken = async function () {

    try {

        const token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)

        // console.log(token);

        this.tokens = this.tokens.concat({ token: token });

        await this.save();
        return token;

    } catch (err) {

        // res.send(err)

        console.error(err);

    }

}



// signupschemap.pre("save",async function(next){
//
// if (this.isModified("password")) {
    //         console.log(`the current password is ${this.password}`);
    //         this.password= await bcrypt.hash(this.password,10);
    //         console.log(`the current password is ${this.password}`);
    //     }
    //     // this.confirmpassword=undefined;
    //     next();

    // });

    
    signupschemap.pre("save", async function (next) {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    });
    const signupmodel = new mongoose.model('signupmodel', signupschemap);
    module.exports = signupmodel;
    
// }


