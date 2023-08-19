const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true},
  subbusinesses: {
    type: [
      {
        name: { type: String, required: true },
        buildings: {
          type: [
            {
              name: { type: String, required: true },
              phone: { type: [String ] },
              email: { type: [String ] },
              address: { type: String },
            },
          ],
        },
      },
    ],
  },
});

const BusinessModel = mongoose.model("Businesses", businessSchema);

module.exports = BusinessModel;








/*
const buildingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  subBusiness: { type: mongoose.Schema.Types.ObjectId, ref: 'SubBusiness' },
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
});

const subBusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  buildings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Building' }],
});

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subBusinesses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubBusiness' }],
});

const Building = mongoose.model('Building', buildingSchema);
const SubBusiness = mongoose.model('SubBusiness', subBusinessSchema);
const Business = mongoose.model('Business', businessSchema);

module.exports = {
  Building,
  SubBusiness,
  Business,
};
*/