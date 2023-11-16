// netlify-functions/subscribe.js


const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Define the CSV file path
const csvFilePath = 'subscriptions.csv';

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { email } = JSON.parse(event.body);

    // Validate the email (you can add more validation logic if needed)
    if (!isValidEmail(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid email address" }),
      };
    }

    // Perform the subscription logic
    // For example, store the email in a CSV file
    writeToCsv({ email });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Subscription successful" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

// Helper function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to write data to the CSV file
function writeToCsv(data) {
  const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: [{ id: 'email', title: 'Email' }],
    append: true, // Append to the existing CSV file
  });

  csvWriter
    .writeRecords([data])
    .then(() => console.log('Data written to CSV file'))
    .catch((error) => console.error('Error writing to CSV file:', error));
}
