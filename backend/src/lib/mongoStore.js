import mongoose from 'mongoose';

let connectionPromise = null;

const schemaOptions = { timestamps: true, minimize: false };

const subDocument = (definition) => new mongoose.Schema(definition, { _id: false, minimize: false });

const appStateSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'default' },
    organizations: { type: Array, default: [] },
    users: { type: Array, default: [] },
    payrollEntries: { type: Array, default: [] },
    resources: { type: Array, default: [] },
    transactions: { type: Array, default: [] },
    notifications: { type: Array, default: [] },
    activityLogs: { type: Array, default: [] },
    dashboardConfigs: { type: Array, default: [] },
    wallets: { type: Array, default: [] },
    aiConfigs: { type: Array, default: [] },
    resourceAllocations: { type: Array, default: [] },
    adminSettings: { type: Object, default: {} },
    employeeSettings: { type: Object, default: {} },
    blockchainState: { type: Object, default: {} },
  },
  schemaOptions
);

const AppState = mongoose.models.AppState || mongoose.model('AppState', appStateSchema);

export const isMongoEnabled = () => Boolean(process.env.MONGO_URI);

export const connectMongo = async () => {
  if (!isMongoEnabled()) return null;
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME || 'derp',
    });
  }
  await connectionPromise;
  return mongoose.connection;
};

export const loadMongoState = async (seedState) => {
  await connectMongo();
  let document = await AppState.findOne({ key: 'default' }).lean();
  if (!document) {
    document = await AppState.create({ key: 'default', ...seedState }).then((result) => result.toObject());
  }
  return document;
};

export const saveMongoState = async (state) => {
  await connectMongo();
  await AppState.updateOne({ key: 'default' }, { $set: { key: 'default', ...state } }, { upsert: true });
  return AppState.findOne({ key: 'default' }).lean();
};
