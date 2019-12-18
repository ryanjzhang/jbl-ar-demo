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


Vue.use(VueRouter)
// mainurl
//const url = "https://raw.githubusercontent.com/Bvanderwolf/bvanderwolf.github.io/master/models/model10.json";

// photo test url
const url = "https://raw.githubusercontent.com/Bvanderwolf/bvanderwolf.github.io/master/modelMap.json";

new Vue({
  el: "#app",
  data: {
    results: []
  },
  mounted() {
    axios
      .get(url)
      .then(response => (this.results = response.data))
      .catch(error => console.log(error));
  }
});
