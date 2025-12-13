import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hy50zfn.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  await client.connect();

  const jobsCollection = client.db("CareerCode").collection("jobs");
  const applicationsCollection = client
    .db("CareerCode")
    .collection("applications");

  app.get("/jobs", async (req, res) => {
    const result = await jobsCollection.find().toArray();
    res.json(result);
  });

  app.get("/jobs/:id", async (req, res) => {
    const result = await jobsCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });

  app.post("/jobs", async (req, res) => {
    const result = await jobsCollection.insertOne(req.body);
    res.json(result);
  });

  app.get("/applications", async (req, res) => {
    const result = await applicationsCollection.find().toArray();
    res.json(result);
  });

  app.post("/applications", async (req, res) => {
    const result = await applicationsCollection.insertOne(req.body);
    res.json(result);
  });
}

run();

app.get("/", (req, res) => {
  res.json({ success: true, message: "Career Code API Running" });
});

export default app; 
