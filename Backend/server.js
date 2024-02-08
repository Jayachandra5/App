const express = require('express');
const sql = require('mssql');

const app = express();

// SQL Server configuration
const config = {
  user: 'Jaya@ims2023',
  password: 'JcV@5818',
  server: 'ims2023.database.windows.net',
  database: 'IMS',
  options: {
    encrypt: true, // Use this if you're on Windows Azure
  },
};

// API endpoint to fetch data
app.get('/api/data', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query the database
    const result = await sql.query('SELECT * FROM purchased');

    // Send the data to the React Native app
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  } finally {
    // Close the database connection
    await sql.close();
  }
});

app.get('/api/employeeList', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query the database
    const result = await sql.query('SELECT * FROM employeeData');

    // Send the data to the React Native app
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  } finally {
    // Close the database connection
    await sql.close();
  }
});

app.get('/api/vendourDue', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query the database for customer table
    const result = await sql.query('SELECT * FROM vendourDue');

    // Send the data to the React Native app
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  } finally {
    // Close the database connection
    await sql.close();
  }
});

app.get('/api/CustomerDue', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query the database for customer table
    const result = await sql.query('SELECT * FROM csDue');

    // Send the data to the React Native app
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  } finally {
    // Close the database connection
    await sql.close();
  }
});

app.get('/api/customers', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query the database for customer table
    const result = await sql.query('SELECT * FROM customerTableDataFinal');

    // Send the data to the React Native app
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  } finally {
    // Close the database connection
    await sql.close();
  }
});

app.get('/api/customers', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query the database for customer table
    const result = await sql.query('SELECT * FROM customerTableDataFinal');

    // Send the data to the React Native app
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  } finally {
    // Close the database connection
    await sql.close();
  }
});


app.get('/api/vendours', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query the database for customer table
    const result = await sql.query('SELECT * FROM vendourTable');

    // Send the data to the React Native app
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  } finally {
    // Close the database connection
    await sql.close();
  }
});


app.get('/api/purchaseList', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query the database for customer table
    const result = await sql.query('SELECT * FROM Purchase');

    // Send the data to the React Native app
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  } finally {
    // Close the database connection
    await sql.close();
  }
});

app.get('/api/salesList', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query the database for customer table
    const result = await sql.query('SELECT * FROM salesTable');

    // Send the data to the React Native app
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  } finally {
    // Close the database connection
    await sql.close();
  }
});

app.get('/api/expensesList', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query the database for customer table
    const result = await sql.query('SELECT * FROM expensesTable');

    // Send the data to the React Native app
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  } finally {
    // Close the database connection
    await sql.close();
  }
});

const getReportData = async (startDate, endDate) => {
  try {
    // Create a new connection pool
    const pool = await sql.connect(config); // Assuming config is globally accessible

    // Construct the SQL query
    const query = `
          SELECT stockName, SUM(amount) AS totalAmount 
          FROM salesTable
          WHERE date BETWEEN @startDate AND @endDate 
          GROUP BY stockName`;

    // Execute the SQL query with the provided start and end dates
    const result = await pool.request()
      .input('startDate', sql.DateTime, startDate)
      .input('endDate', sql.DateTime, endDate)
      .query(query);

    // Return the result
    return result.recordset;
  } catch (error) {
    console.error('Error executing SQL query:', error);
    throw error; // Throw the error to be handled by the caller
  }
};

// GET endpoint for fetching report data
app.get('/api/reportData', async (req, res) => {
  const { date1, date2 } = req.query;

  // Validate dates or handle errors if necessary

  try {
    // Example: Get report data based on date range
    const reportData = await getReportData(date1, date2);

    res.json(reportData);
  } catch (error) {
    console.error('Error getting report data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
