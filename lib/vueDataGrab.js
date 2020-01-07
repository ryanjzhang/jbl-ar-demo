new Vue({
  el: "#vueDataGrab",
  data: {
    baseUrl: "https://api.github.com/repos/Bvanderwolf/bvanderwolf.github.io/git/blobs/",
    results: []
  },
  mounted: function() {
    this.getDataFromCMS();
  },
  methods: {
    getDataFromCMS: async function() {
      //get modelMap.json and convert its content(Base64) to json (window.atob)
      var mapObject = await this.getModelMap();

      //if there are no results in the array update it
      if (this.results.length == 0) {
        for (var i = 0; i < mapObject.keys; i++) {
          const current = mapObject.map[`model${i}`];
          if (current != null) {
            const photoBaseString = await this.getPhotoUrlOfEntry(current);
            const modelBaseString = await this.getModelUrlOfEntry(current);

            this.results.push({
              title: current.title,
              description: current.description,
              price: current.price,
              modelType: current.modeltype,
              photoBase: photoBaseString,
              modelBase: modelBaseString
            });
          }
        }
      }
    },
    getModelMap: async function() {
      var request = await fetch("https://api.github.com/repos/Bvanderwolf/bvanderwolf.github.io/contents/modelMap.json");
      var requestjson = await request.json();
      var content = window.atob(requestjson["content"]);
      console.log(requestjson);
      var modelMap = JSON.parse(content);
      console.log(modelMap);
      return { map: modelMap, keys: Object.keys(modelMap).length };
    },

    getPhotoUrlOfEntry: async function(current) {
      var request = await fetch(this.baseUrl + current.photosha);
      var requestjson = await request.json();
      const fileExtension = current.title.substring(current.title.lastIndexOf("."));
      return `data:image/${fileExtension};base64,` + requestjson["content"];
    },

    getModelUrlOfEntry: async function(current) {
      var request = await fetch(current.modelurl);
      return request.url;
    }
  }
});
