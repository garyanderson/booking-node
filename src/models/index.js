const Review = require("./Review");
const User = require("./User");
const Booking = require("./Booking");
const Hotel = require("./Hotel");
const City = require("./City");
const Image = require("./Image");

User.hasMany(Review);
Review.belongsTo(User);

User.hasMany(Booking);
Booking.belongsTo(User);

Hotel.hasMany(Review);
Review.belongsTo(Hotel);

Hotel.hasMany(Booking);
Booking.belongsTo(Hotel);

City.hasMany(Hotel);
Hotel.belongsTo(City);

Hotel.hasMany(Image);
Image.belongsTo(Hotel);