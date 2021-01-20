
//Read samples.json
function getPlots(id) {
    d3.json("samples.json").then (sampledata =>{
        console.log(sampledata)