const apiKey = process.env.REACT_APP_KEY2;

const Maps = {
  getLocation(cb) {
    return navigator.geolocation.getCurrentPosition(
      function (postition) {
        let lat = postition.coords.latitude;
        let lng = postition.coords.longitude;

        return fetch(
          `https://eu1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${lat}&lon=${lng}&format=json`,
          { method: "GET" }
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.address) {
              cb(data.address);
            }
          })
          .catch((error) => {
            console.log("error geo");
          });
      },
      function (error) {
        console.log(error.message);
      },
      { timeout: 10000 }
    );
  },
};
export default Maps;
