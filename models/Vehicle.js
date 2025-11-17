import mongoose from 'mongoose';

const assignmentHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  unassignedAt: {
    type: Date,
    default: null
  }
}, { _id: false });

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, 'Vehicle make is required'],
    trim: true,
    maxlength: [50, 'Make cannot exceed 50 characters']
  },
  model: {
    type: String,
    required: [true, 'Vehicle model is required'],
    trim: true,
    maxlength: [50, 'Model cannot exceed 50 characters']
  },
  year: {
    type: Number,
    required: [true, 'Vehicle year is required'],
    min: [1900, 'Year must be 1900 or later'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  licensePlate: {
    type: String,
    required: [true, 'License plate is required'],
    unique: true,
    uppercase: true,
    trim: true,
    maxlength: [20, 'License plate cannot exceed 20 characters']
  },
  vin: {
    type: String,
    unique: true,
    sparse: true,
    uppercase: true,
    trim: true,
    maxlength: [17, 'VIN must be 17 characters'],
    minlength: [17, 'VIN must be 17 characters']
  },
  status: {
    type: String,
    enum: {
      values: ['available', 'assigned', 'maintenance'],
      message: 'Status must be one of: available, assigned, maintenance'
    },
    default: 'available'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  assignmentHistory: {
    type: [assignmentHistorySchema],
    default: []
  }
}, {
  timestamps: true
});

// Indexes
vehicleSchema.index({ status: 1 });
vehicleSchema.index({ assignedTo: 1 });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;

