import mongoose from 'mongoose';

const sellerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      default: 'seller',
    },
    status: {
      type: String,
      default: 'pending',
    },
    payment: {
      type: String,
      default: 'inactive',
    },
    method: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    shopInfo: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const Seller = mongoose.model('sellers', sellerSchema);
export default Seller;
