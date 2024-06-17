import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  photo: { type: String, required: false },
  role: {
    type: String,
    enum: ["USER", "INSTRUCTOR", "ADMIN"],
    default: "USER",
  },
  courses: [
    {
      courseId: { type: Schema.Types.ObjectId, ref: "Course" },
      progress: { type: Number, default: 0 },
    },
  ],
  colorScheme: { type: String, default: "theme-yellow" },
});

const User = models.User || model("User", UserSchema);

export default User;
