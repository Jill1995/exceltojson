let selectedFile;

document.getElementById("fileUpload").addEventListener("change", (event) => {
  selectedFile = event.target.files[0];
});

document.getElementById("uploadExcel").addEventListener("click", () => {
  if (selectedFile) {
    console.log("it's uploaded");
    let fileReader = new FileReader();
    fileReader.onload = function (event) {
      let data = event.target.result;
      let workbook = XLSX.read(data, {
        type: "binary",
      });
      workbook.SheetNames.forEach((sheet) => {
        //JSON Data
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );

        //parse JSOn
        let jsonObject = JSON.stringify(rowObject);
        //document.getElementById("jsonData").innerHTML = jsonObject;
        console.log(rowObject);
        download(jsonObject, "jsonObj.json", "application/json");
      });
    };
    fileReader.readAsBinaryString(selectedFile);
  }
});

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
