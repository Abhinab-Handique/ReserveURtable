import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  menuItems: [menuItemSchema]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;  // Use export default

