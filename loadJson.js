fetch("/files/jsonObj.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    // this.users = json;
    console.log(data);
  })
  .catch(function () {
    this.dataError = true;
  });
