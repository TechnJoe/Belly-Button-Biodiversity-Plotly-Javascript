// Setting function on dropdownmenu to print new graph based on option selected
d3.selectAll("#selDataset").on("change", selection)

// create function to make dropdown value
    // Select the dropdownmenu with d3
d3.json("data/samples.json").then(function(dataOtu){
    