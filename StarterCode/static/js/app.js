function getPlots(id) {
    //Read samples.json
    d3.json("samples.json").then ((sampledata) =>{
        console.log(sampledata)
        samples = sampledata.samples;
        filtereddata = samples.filter(s => s.id == id ); 
        var ids = filtereddata[0].otu_ids;
            console.log(ids)
        var sampleValues =  filtereddata[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
        var labels =  filtereddata[0].otu_labels.slice(0,10);
            console.log (labels)
    // get only top 10 otu ids for the plot OTU and reverse it. 
        var OTU_top = ( filtereddata[0].otu_ids.slice(0, 10)).reverse();
    // get the otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
        // get the top 10 labels for the plot
        var labels =  filtereddata[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
        // create data variable
        var data = [trace];

        // create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
    
            // create the bar plot
        Plotly.newPlot("bar", data, layout);
            // The bubble chart
            var trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text:  sampledata.samples[0].otu_labels
    
            };
    
            
            
        });
    
        }

        //create the the funtion to get the necessary metadata
        function getDemoInfo(id) {

        }

        // create a function to populate the dropdown
        function populateDropdown(){
            var dropdown = d3.select("#selDataset");
            d3.json("samples.json").then( (data)=> {
                //get ID data
                var names = data.names; 

                names.forEach(function(name){
                    dropdown.append("option").text(name).property("value",name);
                })
            })
        }

        function optionChanged(id){
            getPlots(id);
        } 

        populateDropdown();

        // set the layout for the bubble plot


