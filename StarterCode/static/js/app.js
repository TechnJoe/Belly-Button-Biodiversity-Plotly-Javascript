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
            // var trace1 = {
            //     x: sampledata.samples[0].otu_ids,
            //     y: sampledata.samples[0].sample_values,
            //     mode: "markers",
            //     marker: {
            //         size: sampledata.samples[0].sample_values,
            //         color: sampledata.samples[0].otu_ids
            //     },
            //     text:  sampledata.samples[0].otu_labels
    
            // };
    });
    
    }  
           
         //create the the funtion to get the necessary metadata
         // read the json file to get data
        function getDemoInfo(id) {
            d3.json("samples.json").then((data)=> {
        
                // get the metadata info for the demographic panel
                var metadata = data.metadata;

                console.log(metadata)
    
                // filter meta data info by id
                 var result = metadata.filter(meta => meta.id.toString() === id)[0];
                // select demographic panel to put data
                 var demographicInfo = d3.select("#sample-metadata");
                  
               // empty the demographic info panel each time before getting new id info
                 demographicInfo.html("");
          
               // grab the necessary demographic data data for the id and append the info to the panel
                  Object.entries(result).forEach((key) => {   
                      demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
                  });
              });
        

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

        // function optionChanged(id){
        //     getPlots(id);
        // } 
    
        populateDropdown();
    
        d3.json("samples.json").then ((sampledata) =>{
            console.log(sampledata)
            samples = sampledata.samples;
    
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

        // set the layout for the bubble plot

        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        // creating data variable 
        var data1 = [trace1];

        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
    
        });
 
 // create the function for the change event
 function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}
 // call the functions to display the data and the plots to the page
 getPlots(data.names[0]);
 getDemoInfo(data.names[0])
