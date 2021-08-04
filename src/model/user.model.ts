import mongoose from "mongoose"
import bcrypt from "bcrypt"
import config from "config"

export interface UserDocument extends mongoose.Document {
    full_name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(c_password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema( 
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      private: true,
    },
    c_password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next: mongoose.HookNextFunction) {
    let user = this as UserDocument;
    if(!user.isModified("password")) return next();
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
    const hash = await bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next();
})

userSchema.methods.comparePassword = async function (
    c_password: string
) {
    const user = this as UserDocument;
    return bcrypt.compare(c_password, user.password).catch((e) => false)
}

const User = mongoose.model<UserDocument>("User", userSchema)

export default User;
