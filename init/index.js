const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
var MapboxClient = require("mapbox");
var client = new MapboxClient(
  "your client id"
);

const MONGO_URL = "local mongo url";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  const updatedData = initData.data.map((obj) => ({
    ...obj,
    owner: "65f64c897a37471c76e8f70a",
  }));
  await Listing.insertMany(updatedData);
  // for (let i of initData.data) {
  //   let coord = await client.geocodeForward(i.location, function (err, data) {
  //     if (err) throw err;
  //     data.features[0].center;
  //   });
  //   let coordinates = coord.entity.features[0].center;
  //   console.log(coordinates);
  //   if (i.geometry) {
  //     i.geometry.coordinates = coordinates;
  //   }
  //   await Listing.findByIdAndUpdate(
  //     "65f61aba998c0eec58502164",
  //     {
  //       geometry: { type: "Point", coordinates: [100, 100] },
  //     },
  //     { new: true }
  //   );
  // }
};
console.log("data was initialized");

initDB();
