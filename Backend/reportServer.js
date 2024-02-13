const express = require('express');
const sql = require('mssql');

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
      const query = 'SELECT stockname,quantity FROM '+ Constants.ProductTable + ' WHERE stockname = @stockName';
  
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
  
  const getOpening = async (stockName,date1) => {
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
  
        console.log("opening");
        console.log(result.recordset);
  
      // Return the result
      return result.recordset;
    } catch (error) {
      console.error('Error executing SQL query:', error);
      throw error; // Throw the error to be handled by the caller
    }
  };
  
  
  const getSales = async (stockName,date1,date2) => {
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
  
        console.log("Sales");
        console.log(result.recordset);
      // Return the result
      return result.recordset;
    } catch (error) {
      console.error('Error executing SQL query:', error);
      throw error; // Throw the error to be handled by the caller
    }
  };
  
  
  const getReportDataFull = async (date1, date2) => {
    try {
      // Example: Get report data based on date range
      const reportDatafun = await getReportData(date1, date2);
      const fullReportData = [];
  
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
  
        fullReportData.push(mergedData);
      }
  
      console.log("Final report Data");
      console.log(fullReportData);
  
      return fullReportData;
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
      console.log(fullReportData);
      res.json(fullReportData);
    } catch (error) {
      console.error('Error getting report data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  // GET endpoint for fetching report data
  app.get('/api/reportDa', async (req, res) => {
    const { date1, date2 } = req.query;
    try {
      // Example: Get report data based on date range
      const reportData = await getReportData(date1, date2);
      getqnt('apple');
      getSales('apple','2024-01-01','2024-02-13');
      getOpening('apple','2024-02-01',);
  
      console.log(reportData);
      res.json(reportData);
    } catch (error) {
      console.error('Error getting report data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));