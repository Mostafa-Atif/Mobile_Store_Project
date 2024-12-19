const express = require('express');
const mongoose = require('mongoose');


let app = express();

app.use(express.json());

// Connect to MongoDB


mongoose.connect('mongodb://localhost:27017/mobile_store')
  .then(() => {
    console.log('Connected to Mobile Store DB');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });



//Schema


const mobileSchema = new mongoose.Schema({
  mobile_id: Number,
  brand: String,
  model_name: String,
  price: Number
});

const customerSchema = new mongoose.Schema({
  customer_id: Number,
  name: String,
  email: String,
  phone: String
});

const salesSchema = new mongoose.Schema({
  sale_id: Number,
  customer_id: Number,
  mobile_id: Number
});


let MobileModel = mongoose.model("Mobiles", mobileSchema);
let CustomerModel = mongoose.model("Customers", customerSchema);
let SalesModel = mongoose.model("Sales", salesSchema);






// CRUD operations for Mobiles

// Create
app.post('/mobiles', async (req, res) => {
  try {
    const newMobile = await MobileModel.create(req.body);
    res.status(201).json(newMobile);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get all
app.get('/mobiles', async (req, res) => {
  try {
    const mobiles = await MobileModel.find();
    res.status(200).json(mobiles);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get by ID
app.get('/mobiles/:id', async (req, res) => {
  try {
    const mobile = await MobileModel.findById(req.params.id);
    if (!mobile) {
      return res.status(404).json({ message: 'Mobile not found' });
    }
    res.status(200).json(mobile);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update

app.put('/mobiles/:id', async (req, res) => {
  try {

    const mobile = await MobileModel.findByIdAndUpdate(req.params.id, req.body);

    if (!mobile) {
      return res.status(404).json({ message: "Mobile not found" });
    }


    const newMobile = await MobileModel.findById(req.params.id);

    res.status(200).json(newMobile);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
app.delete('/mobiles/:id', async (req, res) => {
  try {
    const mobile = await MobileModel.findByIdAndDelete(req.params.id);
    if (!mobile) {
      return res.status(404).json({ message: 'Mobile not found' });
    }
    res.status(200).json({ message: 'Mobile deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CRUD operations for Customers

// Create
app.post('/customers', async (req, res) => {
  try {
    const newCustomer = await CustomerModel.create(req.body);
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get all
app.get('/customers', async (req, res) => {
  try {
    const customers = await CustomerModel.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get by ID
app.get('/customers/:id', async (req, res) => {
  try {
    const customer = await CustomerModel.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update

app.put('/customers/:id', async (req, res) => {
  try {

    const customer = await CustomerModel.findByIdAndUpdate(req.params.id, req.body);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }


    const newCustomer = await CustomerModel.findById(req.params.id);

    res.status(200).json(newCustomer);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
app.delete('/customers/:id', async (req, res) => {
  try {
    const customer = await CustomerModel.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});


// CRUD operations for Customers

// Create
app.post('/sales', async (req, res) => {
  try {
    const newSale = await SalesModel.create(req.body);
    res.status(201).json(newSale);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get all
app.get('/sales', async (req, res) => {
  try {
    const sales = await SalesModel.find();
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get by ID
app.get('/sales/:id', async (req, res) => {
  try {
    const sale = await SalesModel.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(sale);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update

app.put('/sales/:id', async (req, res) => {
  try {

    const sale = await SalesModel.findByIdAndUpdate(req.params.id, req.body);

    if (!sale) {
      return res.status(404).json({ message: 'Not found' });
    }


    const newSale = await SalesModel.findById(req.params.id);

    res.status(200).json(newSale);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
app.delete('/sales/:id', async (req, res) => {
  try {
    const sale = await SalesModel.findByIdAndDelete(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json({ message: 'Sale deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});


app.listen(3000, function () {
  console.log('Server is opened');
});

