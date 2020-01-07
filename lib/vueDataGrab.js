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

      //check if modelMap is updated or not (check key count)
      if (this.results.length == 0) {
        for (var i = 0; i < mapObject.keys; i++) {
          const current = mapObject.map[`model${i}`];
          if (current != null) {
            const photoBaseString = await this.getPhotoUrlOfEntry(current);
            const modelBaseString = await this.getModelUrlOfEntry(current);

            this.results.push({
              title: current.title,
              description: current.description,
              modelType: current.modeltype,
              photoBase: photoBaseString,
              modelBase: modelBaseString
            });
          }
        }
      } else if (this.results.length != mapObject.keys) {
        //if modelMap has been updated check with keycount if there are entries added
        for (var i = 0; i < mapObject.keys; i++) {
          const current = mapObject.map[`model${i}`];
          if (current != null && current != this.results[i]) {
            this.results[i] = current;
          }
        }
      }

      //or removed and based on that loop through necessary entries to show update
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
      var request = await fetch(this.baseUrl + current.modelsha);
      var requestjson = await request.json();
      const fileExtension = current.title.substring(current.title.lastIndexOf("."));
      var base = "";
      switch (fileExtension) {
        case ".usdz":
          base = "data:model/vnd.usdz+zip;base64,";
          break;
        case ".json":
          base = "data:application/json;base64,";
          break;
        default:
          return;
      }
      const blobUrl = this.b64toBlob(requestjson["content"], base);
      console.log(blobUrl);
      return "blob:" + blobUrl;
    },

    b64toBlob: function(b64Data, contentType = "", sliceSize = 512) {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return URL.createObjectURL(blob);
    }
  }
});
