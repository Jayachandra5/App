const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');

const app = express();


const Constants = require('./Constants');

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

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API endpoint to add an employee
app.post('/api/employeeAdd', async (req, res) => {
  const { name, salary } = req.body;

  try {
    await sql.connect(config);

    // Check if the employee already exists
    const checkIfExists = await sql.query`SELECT * FROM employeeData WHERE empname = ${name}`;
    if (checkIfExists.recordset.length > 0) {
      console.log('Employee alredy exists');
      return res.status(200).json({ message: 'Employee already exists' });
    }

    // If employee doesn't exist, add them to the database
    const result = await sql.query`INSERT INTO employeeData (empname, salary) VALUES (${name}, ${salary})`;
    console.log('Employee added successfully');
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await sql.close();
  }
});

app.post('/api/employeeAttendance', async (req, res) => {
  const { empname, attendance } = req.body;

  let wdToAdd = 0;
  if (attendance === 'Present') {
    wdToAdd = 1;
  } else if (attendance === 'Half Present') {
    wdToAdd = 0.5;
  }
  console.log(req.body);

  try {
    // Create a new connection pool
    const pool = await sql.connect(config);

    // Run the update query
    const result = await pool.request()
      .input('wdToAdd', sql.Float, wdToAdd)
      .input('empname', sql.NVarChar, empname)
      .query('UPDATE '+Constants.employeeAttendanceTable+' SET wd = wd + @wdToAdd WHERE empname = @empname');

    console.log('Attendance updated successfully');
    res.status(200).json({ message: 'Attendance updated successfully' });
  } catch (err) {
    console.error('Error updating attendance:', err);
    res.status(500).json({ message: 'Error updating attendance' });
  }
});

app.get('/api/employeeList', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query the database
    const result = await sql.query('SELECT * FROM employeeData');

    console.log(result.recordset);
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

app.get('/api/displaytotalDues', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query the database for totalourdues and totalcsdues
    const result = await sql.query('SELECT name, SUM(amount) as totalDues FROM manage WHERE name IN (\'totalourdues\', \'totalcsdues\') GROUP BY name');

    // Construct JSON response
    let duesMap = {};
    result.recordset.forEach(row => {
      duesMap[row.name] = row.totalDues;
    });

    // Send the total dues to the React Native app
    res.json(duesMap);
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

const getqnt = async (stockName) => {
  try {
    // Create a new connection pool
    const pool = await sql.connect(config); // Assuming config is globally accessible

    // Construct the SQL query
    const query = 'SELECT stockname,quantity FROM ' + Constants.ProductTable + ' WHERE stockname = @stockName';

    // Execute the SQL query with the provided start and end dates
    const result = await pool.request()
      .input('stockName', stockName)
      .query(query);

    console.log("Get Qnt");
    console.log(result.recordset);

    // Return the result
    return result.recordset;
  } catch (error) {
    console.error('Error executing SQL query:', error);
    throw error; // Throw the error to be handled by the caller
  }
};

const getOpening = async (stockName, date1) => {
  try {
    // Create a new connection pool
    const pool = await sql.connect(config); // Assuming config is globally accessible

    // Construct the SQL query
    //  const query = 'SELECT TOP 1 qntAvl FROM ' + Constants.purchaseTable + ' WHERE stockName = @stockName AND date < @date1 ORDER BY date DESC';
    const query = 'SELECT TOP 1 stockName, qntAvl FROM ' + Constants.purchaseTable + ' WHERE stockName = @stockName AND date < @date1 ORDER BY date DESC';

    // Execute the SQL query with the provided start and end dates
    const result = await pool.request()
      .input('stockName', stockName)
      .input('date1', sql.DateTime, date1)
      .query(query);

    // Return the result
    return result.recordset;
  } catch (error) {
    console.error('Error executing SQL query:', error);
    throw error; // Throw the error to be handled by the caller
  }
};

const getSales = async (stockName, date1, date2) => {
  try {
    // Create a new connection pool
    const pool = await sql.connect(config); // Assuming config is globally accessible

    // Construct the SQL query
    const query = 'SELECT stockName, SUM(qnt) As totalQnt FROM ' + Constants.salesTable
      + ' WHERE date BETWEEN  @date1 AND @date2  AND stockName= @stockName GROUP BY stockName';

    // Execute the SQL query with the provided start and end dates
    const result = await pool.request()
      .input('stockName', stockName)
      .input('date1', sql.DateTime, date1)
      .input('date2', sql.DateTime, date2)
      .query(query);


    return result.recordset;
  } catch (error) {
    console.error('Error executing SQL query:', error);
    throw error; // Throw the error to be handled by the caller
  }
};

async function stockAmountSold(date1, date2) {
  try {
    const pool = await sql.connect(config); // Assuming config is globally accessible

    const query = `
          SELECT SUM(stock) AS totalStock 
          FROM `+ Constants.salesTable + ` 
          WHERE date BETWEEN @date1 AND @date2
      `;

    // Execute the SQL query with the provided start and end dates
    const result = await pool.request()
      .input('date1', sql.DateTime, date1)
      .input('date2', sql.DateTime, date2)
      .query(query);

    // Extract the total stock sold from the result set
    const totalStock = result.recordset[0].totalStock;

    return totalStock;
  } catch (error) {
    console.error('Error fetching stock amount sold:', error);
    throw error;
  }
}

async function totalSales(date1, date2) {
  try {
    const pool = await sql.connect(config);
    const query = `
          SELECT SUM(amount) AS totalAmount 
          FROM `+ Constants.salesTable + ` 
          WHERE date BETWEEN @date1 AND @date2 
          GROUP BY stockName
      `;

    const result = await pool.request()
      .input('date1', sql.DateTime, date1)
      .input('date2', sql.DateTime, date2)
      .query(query);

    const totalSales = result.recordset[0].totalAmount;

    return totalSales;
  } catch (error) {
    console.error('Error fetching total sales:', error);
    throw error;
  }
}

async function totalProfit(date1, date2) {
  try {
    const pool = await sql.connect(config);
    const query = `
          SELECT SUM(profit) AS totalProfit 
          FROM `+ Constants.salesTable + ` 
          WHERE date BETWEEN @date1 AND @date2 
          GROUP BY stockName
      `;

    const result = await pool.request()
      .input('date1', sql.DateTime, date1)
      .input('date2', sql.DateTime, date2)
      .query(query);

    const totalProfit = result.recordset[0].totalProfit;

    return totalProfit;
  } catch (error) {
    console.error('Error fetching total profit:', error);
    throw error;
  }
}

async function totalPurchase(date1, date2) {
  try {
    const pool = await sql.connect(config);
    const query = `
          SELECT SUM(amount) AS totalAmount 
          FROM `+ Constants.purchaseTable + ` 
          WHERE date BETWEEN @date1 AND @date2 
          GROUP BY stockName
      `;

    const result = await pool.request()
      .input('date1', sql.DateTime, date1)
      .input('date2', sql.DateTime, date2)
      .query(query);

    const totalPurchase = result.recordset[0].totalAmount;

    return totalPurchase;
  } catch (error) {
    console.error('Error fetching total purchase:', error);
    throw error;
  }
}

async function totalExpenses(date1, date2) {
  try {
    const pool = await sql.connect(config);
    const query = `
          SELECT SUM(amount) AS totalAmount 
          FROM `+ Constants.expensesTable + ` 
          WHERE date BETWEEN @date1 AND @date2
      `;

    const result = await pool.request()
      .input('date1', sql.DateTime, date1)
      .input('date2', sql.DateTime, date2)
      .query(query);

    const totalExpenses = result.recordset[0].totalAmount;

    return totalExpenses;
  } catch (error) {
    console.error('Error fetching total expenses:', error);
    throw error;
  }
}

const getReportDataFull = async (date1, date2) => {
  try {
    // Example: Get report data based on date range
    const reportDatafun = await getReportData(date1, date2);
    const fullReportData = [];
    let totalStockNames = 0;
    let finaltotalAmount = 0;
    let totalQntAvl = 0;
    let totalQuantity = 0;
    let totalSales = 0;

    console.log("reportDataFun");
    console.log(reportDatafun);

    for (const item of reportDatafun) {
      const openingData = await getOpening(item.stockName, date1);
      const qntData = await getqnt(item.stockName);
      const salesData = await getSales(item.stockName, date1, date2);

      const mergedData = {
        stockName: item.stockName,
        totalAmount: item.totalAmount,
        qntAvl: openingData.length > 0 ? openingData[0].qntAvl : 0,
        quantity: qntData.length > 0 ? qntData[0].quantity : 0,
        totalQnt: salesData.length > 0 ? salesData[0].totalQnt : 0
      };

      totalStockNames++;
      finaltotalAmount += item.totalAmount;
      totalQntAvl += mergedData.qntAvl;
      totalQuantity += mergedData.quantity;
      totalSales += mergedData.totalQnt;

      fullReportData.push(mergedData);
    }

    const totals = {
      totalStockNames,
      finaltotalAmount,
      totalQntAvl,
      totalQuantity,
      totalSales
    };

    console.log("Final report Data");
    console.log(fullReportData);
    console.log("Totals");
    console.log(totals);

    return { fullReportData, totals };
  } catch (error) {
    console.error('Error getting report data:', error);
    throw error;
  }
};


app.get('/api/reportData', async (req, res) => {
  const { date1, date2 } = req.query;
  try {
    // Get full report data based on date range
    const fullReportData = await getReportDataFull(date1, date2);

    // Calculate additional metrics
    const totalStockSold = parseFloat(await stockAmountSold(date1, date2)).toFixed(2);
    const totalSalesAmount = parseFloat(await totalSales(date1, date2)).toFixed(2);
    const totalProfitAmount = parseFloat(await totalProfit(date1, date2)).toFixed(2);
    const totalExpensesAmount = parseFloat(await totalExpenses(date1, date2)).toFixed(2);
    const totalPurchaseAmount = parseFloat(await totalPurchase(date1, date2)).toFixed(2);

    // Create totals object with additional metrics
    const totals = {
      totalStockNames: fullReportData.totals.totalStockNames,
      finaltotalAmount: fullReportData.totals.finaltotalAmount,
      totalQntAvl: fullReportData.totals.totalQntAvl,
      totalQuantity: fullReportData.totals.totalQuantity,
      totalSales: fullReportData.totals.totalSales,
      totalStockSold,
      totalSalesAmount,
      totalProfitAmount,
      totalExpensesAmount,
      totalPurchaseAmount
    };

    // Add additional metrics to the report data
    const reportWithAdditionalMetrics = {
      ...fullReportData,
      totals
    };

    res.json(reportWithAdditionalMetrics);
  } catch (error) {
    console.error('Error getting report data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));