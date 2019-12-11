"use strict";

// var app = new Vue({
//   el: "#android-content",
//   data: {
//     message: "Hello Vue!"
//   },
//   template: `<div class="cat-content">
//     <div class="temp-box">dit is desktop/android :)</div>
//     <div class="temp-box2"></div>
//     <div class="temp-box"></div>
//     <div class="temp-box2"></div>
//     <div class="temp-box"></div>
//     <div class="temp-box2"></div>
//     <div class="temp-box"></div>
//     <div class="temp-box2"></div>
//     <div class="temp-box"></div>
//     <div class="temp-box2"></div>
//     <div class="temp-box"></div>
//     <div class="temp-box2"></div>
//     <div class="temp-box"></div>
//     <div class="temp-box2"></div>
//   </div>`
// });

// var app = new Vue({
//   el: "#ios-content",
//   data: {
//     message: "Hello Vue!"
//   },
//   template: `<div class="cat-content">
//     <div class="temp-box">dit is ios :)</div>
//     <div class="temp-box2"></div>
//     <div class="temp-box"></div>
//     <div class="temp-box2"></div>
//     <div class="temp-box"></div>
//     <div class="temp-box2"></div>
//     <div class="temp-box"></div>
//     <div class="temp-box2"></div>
//     <div class="temp-box"></div>
//     <div class="temp-box2"></div>
//     <div class="temp-box"></div>
//     <div class="temp-box2"></div>
//     <div class="temp-box"></div>
//     <div class="temp-box2"></div>
//   </div>`
// });

// mainurl
//const url = "https://raw.githubusercontent.com/Bvanderwolf/bvanderwolf.github.io/master/models/model10.json";

// photo test url
var url = "https://jsonplaceholder.typicode.com/photos?albumId=1";

var app = new Vue({
  el: "#app",
  data: {
    results: []
  },
  mounted: function mounted() {
    var _this = this;

    axios.get(url).then(function (response) {
      return _this.results = response.data;
    }).catch(function (error) {
      return console.log(errors);
    });
  }
});