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


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
