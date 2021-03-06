import { combineReducers } from "redux";
import setAdminsReducer from "./admins";

import setPaymentsReducer from "./payments";
import setProductsReducer from "./products";
import setLotsReducer from "./lots";
import setBookingsReducer from "./bookings";
import setOrdersAlgReducer from "./ordersAlg";
import setExpressRatesDocumentsReducer from "./expressRatesDocuments";
import setExpressRatesParcelReducer from "./expressRatesParcel";
import setD2DRatesReducer from "./d2dRates";
import setUsersReducer from "./users";
import setRechargeReducer from "./recharge";
import setRefundsReducer from "./refunds";
import setNoticesReducer from "./notices";
const rootReducer = combineReducers({
  bookings: setBookingsReducer,
  lots: setLotsReducer,
  users: setUsersReducer,
  payments: setPaymentsReducer,
  admins: setAdminsReducer,
  products: setProductsReducer,
  ordersAlg: setOrdersAlgReducer,
  expressRatesDocuments: setExpressRatesDocumentsReducer,
  expressRatesParcel: setExpressRatesParcelReducer,
  d2dRates: setD2DRatesReducer,
  recharge: setRechargeReducer,
  refunds: setRefundsReducer,
  notices: setNoticesReducer,
});

export default rootReducer;
