import mongoose from 'mongoose';

const sellerCustomerSchema = mongoose.Schema(
  {
    myId: {
      type: String,
      required: true,
    },
    myFriends: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const SellerCustomers = mongoose.model(
  'seller_customers',
  sellerCustomerSchema
);
export default SellerCustomers;
