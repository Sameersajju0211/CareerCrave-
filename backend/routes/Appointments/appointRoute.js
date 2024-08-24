const express = require('express');
const router = express.Router();
const Appointment = require('../../modals/appointment');
const User = require('../../modals/user');

// Schedule an appointment

router.post('/schedule-meeting', async (req, res) => {
    console.log("Rout is hitting");
    // console.log(req.body);
    const { mentorId, slotDuration } = req.body; // slotDuration in milliseconds (e.g., 30 * 60 * 1000 for 30 mins)
    const slotDurationMs = slotDuration * 60 * 1000;
    try {
      const mentor = await User.findById(mentorId);
      if (!mentor) {
        return res.status(404).send({ message: 'Mentor not found' });
      }
      // console.log(mentor);
      const availableSlot = isSlotAvailable(mentor.availability, mentor.bookedSlots, slotDurationMs);
      console.log(availableSlot);
  
      if (availableSlot) {
        // Save the booked slot
        mentor.bookedSlots.push(availableSlot);
        await mentor.save();
        
        res.send({
          message: 'Meeting scheduled successfully',
          slot: availableSlot,
        });
      } else {
         console.log("Slot is not available");
      }
  
    } catch (error) {
       console.log("Error in finding available slot");
    }
  });
  function isSlotAvailable(availability, bookedSlots, slotDuration) {
    console.log("hit isSlotAvailable function");
    let start = new Date(availability.start);
    let end = new Date(availability.end);
    console.log("Initial availability:", start, end);
  
    // Sort booked slots by start time to ensure they are processed in order
    bookedSlots.sort((a, b) => new Date(a.start) - new Date(b.start));
  
    // Check each booked slot
    for (let booked of bookedSlots) {
      let bookedStart = new Date(booked.start);
      let bookedEnd = new Date(booked.end);
  
      // If there is an overlap, adjust available time
      if (bookedStart <= start && bookedEnd > start) {
        start = bookedEnd;
      } else if (bookedStart > start && bookedStart < end) {
        // If the booked slot starts after the current start time but before end
        break; // No contiguous slots available
      }
    }
  
    // Check if remaining time can fit the desired slot duration
    if (end - start >= slotDuration) {
      return { start, end: new Date(start.getTime() + slotDuration) };
    }
  
    return null; // No available slot found
  }
  
  
module.exports = router;
