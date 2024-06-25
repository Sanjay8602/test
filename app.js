const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const axios = require('axios');
const app = express();
const port = 3000;

// Sample data structure for storing job data
let updatedJobData = [
  { id: 11, location: 'Location A', role: 'Role A', business_area: 'Area A', created_at: new Date(), updated_at: new Date() },
  { id: 12, location: 'Location B', role: 'Role B', business_area: 'Area B', created_at: new Date(), updated_at: new Date() }
];

// Middleware setup
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Function to update job data on the server
const updateJobData = async () => {
  // Iterate over the first two jobs and send a PUT request to update their timestamps
  for (let i = 0; i < updatedJobData.length && i < 2; i++) {
    const job = updatedJobData[i];
    job.updated_at = new Date(); // Update the 'updated_at' field with the current date and time

    try {
      const response = await axios.put(`https://anti-backend.onrender.com/editOpenPosition/${job.id}`, job);
      console.log(`Job ${job.id} updated successfully:`, response.data);
    } catch (error) {
      console.error(`Error updating job ${job.id}:`, error.response ? error.response.data : error.message);
    }
  }
};

// Schedule the update job data function to run every 10 seconds
cron.schedule('*/30 * * * * *', () => {
  console.log('Running scheduled job data update...');
  updateJobData();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
