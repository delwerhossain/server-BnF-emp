const express = require("express");
const cors = require("cors");
//cors extra --------------

// ------------

//jwt
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  ClientSession,
} = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

////////////////////////////////////////
// mongoDB  everything starts
////////////////////////////////////////

const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@simple-del.4ijtj0g.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();
    const attendCollection = client.db("bnf-emp").collection("attendance");
    const employeesCollection = client.db("bnf-emp").collection("employees");

    ////////////////////////////////////////
    // mongoDB  API CRUD starts here
    ////////////////////////////////////////

    // get the employees data
    app.get("/employee", async (req, res) => {
      const result = await employeesCollection.find().toArray();
      res.send(result);
    });

    //post employee data
    app.post("/employee", async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await employeesCollection.insertOne(data);
      res.send(result);
    });

    ////////////////////////////////////////
    // mongoDB  everything ends here
    ////////////////////////////////////////

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

////////////////////////////////////////
// mongoDB  everything ends here
////////////////////////////////////////

// test and home routes
app.get("/", (req, res) => {
  res.send("simple bnf CRUD");
});
app.listen(port, () => {
  console.log(`simple CRUD listening on ${port}`);
});
