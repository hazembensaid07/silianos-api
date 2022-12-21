const { getBooking } = require("./getBooking")
const { getBookingbyHotel } = require("./getBookingByHotel")

const { filterByBestHotel } = require("./filterByBestHotel")
const { filterByStars } = require("./filterByStars")
const { sortHotelsByPrice } = require("./sortHotelsByPrice")

const { getAllVouchers } = require("./getAllVouchers")
const { getVouchersByHotel } = require("./getVoucherByHotel")
const { addVoucher } = require("./addVoucher")
const { loadVoucher } = require("./loadVoucher")
const { deleteVoucher } = require("./deleteVoucher")

const { ValidateHotelPaiement } = require("./validateHotelPaiement")
const { ValidateVoucherAgency } = require("./validateVoucherAgency")
const { ValidateVoucherAgencyAccompte } = require("./validateVoucherAgencyAccompte")


const { loadUnPaidVoucherByHotel } = require("./loadUnPaidVoucherByHotel")
const { loadPaidVoucherByHotel } = require("./loadPaidVoucherByHotel")
const { loadPaidVoucher } = require("./loadPaidVouchers")
const { loadUnPaidVoucher } = require("./loadUnpaidVouchers")


module.exports = {
  addVoucher,
  getBooking,
  loadVoucher,
  deleteVoucher,
  filterByStars, filterByBestHotel,
  getBookingbyHotel,
  loadPaidVoucher,
  loadUnPaidVoucher,
  loadPaidVoucherByHotel,
  loadUnPaidVoucherByHotel,
  ValidateVoucherAgencyAccompte,
  ValidateVoucherAgency,
  ValidateHotelPaiement,
  sortHotelsByPrice,
  getVouchersByHotel,
  getAllVouchers
}
