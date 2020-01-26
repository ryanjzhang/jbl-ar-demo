if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
  new Vue({
    el: "#vueDataGrab-ios",
    data: {
      baseUrl: "https://api.github.com/repos/Bvanderwolf/bvanderwolf.github.io/git/blobs/",
      results: []
    },
    mounted: function() {
      this.getDataFromCMS();
    },
    methods: {
      getDataFromCMS: async function() {
        console.log("ios");

        if (this.results.length != 0) return;

        //get modelMap.json and convert its content(Base64) to json (window.atob)
        const mapObject = await this.getModelMap();

        //if there are no results in the array, fill it with the values in the mapModel
        for (let i = 0; i < mapObject.keys; i++) {
          const current = mapObject.map[`model${i}`];
          //if the model map entry exists and is of type ios or iosorandroid it can be added
          if (current != null && (current.modeltype == `IOS` || current.modeltype == `IOSorAndroid`)) {
            //get placeholderImage and model data
            const photoBaseString = await this.getPhotoUrlOfEntry(current);
            const modelBaseString = await this.getModelUrlOfEntry(current);

            //add modelMap data to the results array
            this.results.push({
              title: current.title.split(".")[0],
              description: current.description,
              price: current.price,
              modeltype: current.modeltype,
              photoBase: photoBaseString,
              modelBase: modelBaseString
            });
          }
        }
      },
      //gets modelmap from the github api and returns object with the json file and its key count
      getModelMap: async function() {
        const request = await fetch("https://api.github.com/repos/Bvanderwolf/bvanderwolf.github.io/contents/modelMap.json");
        const requestjson = await request.json();
        const content = window.atob(requestjson["content"]);
        const modelMap = JSON.parse(content);

        return { map: modelMap, keys: Object.keys(modelMap).length };
      },
      //gets the base64 string of the placeholderImage and returns a complete one to be used by an img html tag
      getPhotoUrlOfEntry: async function(current) {
        const request = await fetch(this.baseUrl + current.photosha);
        const requestjson = await request.json();
        const fileExtension = current.title.substring(current.title.lastIndexOf("."));
        return `data:image/${fileExtension};base64,` + requestjson["content"];
      },
      //returns the download url of the model
      getModelUrlOfEntry: async function(current) {
        const request = await fetch(current.modelurl);
        return request.url;
      }
    }
  });
} else {
  new Vue({
    el: "#vueDataGrab-android",
    data: {
      baseUrl: "https://api.github.com/repos/Bvanderwolf/bvanderwolf.github.io/git/blobs/",
      results: []
    },
    mounted: function() {
      this.getDataFromCMS();
    },
    methods: {
      getDataFromCMS: async function() {
        console.log("android");

        if (this.results.length != 0) return;

        //get modelMap.json and convert its content(Base64) to json (window.atob)
        const mapObject = await this.getModelMap();

        //if there are no results in the array update it
        for (var i = 0; i < mapObject.keys; i++) {
          const current = mapObject.map[`model${i}`];
          if (current != null && (current.modeltype == `Android` || current.modeltype == `IOSorAndroid`)) {
            const photoBaseString = await this.getPhotoUrlOfEntry(current);
            const modelBaseString = await this.getModelUrlOfEntry(current);

            this.results.push({
              title: current.title.split(".")[0],
              description: current.description,
              price: current.price,
              modeltype: current.modeltype,
              photoBase: photoBaseString,
              modelBase: modelBaseString
            });
          }
        }
      },
      getModelMap: async function() {
        const request = await fetch("https://api.github.com/repos/Bvanderwolf/bvanderwolf.github.io/contents/modelMap.json");
        const requestjson = await request.json();
        const content = window.atob(requestjson["content"]);
        const modelMap = JSON.parse(content);
        return { map: modelMap, keys: Object.keys(modelMap).length };
      },

      getPhotoUrlOfEntry: async function(current) {
        const request = await fetch(this.baseUrl + current.photosha);
        const requestjson = await request.json();
        const fileExtension = current.title.substring(current.title.lastIndexOf("."));
        return `data:image/${fileExtension};base64,` + requestjson["content"];
      },

      getModelUrlOfEntry: async function(current) {
        const request = await fetch(current.modelurl);
        return request.url;
      },
      //for the json file we need to add the download url to the location so we can use it in the ar.html page
      setCurrentModelUrl: function(url) {
        location.assign(`ar.html?modelurl=${url}`);
      }
    }
  });
}
