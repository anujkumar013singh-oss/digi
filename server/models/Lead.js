const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'] 
  },
  course: { 
    type: String, 
    required: [true, 'Course selection is required'] 
  },
  message: { 
    type: String, 
    default: '' 
  },
  submittedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Lead', LeadSchema);
