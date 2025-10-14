const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      minlength: 3
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },
    password: { 
      type: String, 
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ['staff', 'admin'],
      default: 'staff'
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Check if model already exists before creating it
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);