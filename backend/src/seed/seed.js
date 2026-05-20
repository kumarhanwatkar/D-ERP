import 'dotenv/config';
import { seedDatabase } from '../lib/store.js';

const run = async () => {
  await seedDatabase();
  console.log('Seed data written to backend/data/derp.json');
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
