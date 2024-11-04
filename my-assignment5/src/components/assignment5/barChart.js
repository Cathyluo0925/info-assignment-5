import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "/Users/cathyluo/my-next-app/my-assignment5/src/components/assignment5/axes.js";


export function BarChart (props) {

    const {offsetX, offsetY, data, height, width, selectedAirline, setSelectedAirline} = props;
    


    // Task 1: TODO
    // 1. find the maximum of the Count attribute in the data
    const maxCount = max(data, d => d.Count);
    // 2. define the xScale and yScale
    const xScale = scaleLinear()
        .domain([0, maxCount+118]) // domain: 0 to max count
        .range([0, width]); // range: 0 to svg width

    const yScale = scaleBand()
        .domain(data.map(d => d.AirlineName)) // map each airline ID
        .range([0, height]) // range: top to bottom of svg
        .padding(0.2); // add padding between bars

    // 3. return the bars; (Remember to use data.map());
   
            

    // 4. return <XAxis/> and <YAxis/>
             
    // Task 3. TODO
    // 1. define an arrow function color; it takes a data item, d, as input. 
    // If d.AirlineID is equal to the selectedAirlineID, it returns "#992a5b"; 
    // otherwiese, it returns "#2a5599".
    // 2. define a function onMouseOver; it takes a data item, d, as input,
    // and sets the selectedAirlineID be the d.AirlineID
    // 3. define a function onMouseOut; it has no argument, and sets the selectedAirlineID be null.
    // 4. adding properties, onMouseOver and onMouseOut, to the <rect> tags.
    // Note: the function of the onMouseOver properties should be an arrow function 
    // that wraps the onMouseOver you defined since it takes d as input.
    const color = d => (d.AirlineID === selectedAirline ? "#992a5b" : "#2a5599");

    // Define mouse event handlers
    const onMouseOver = (d) => {
        setSelectedAirline(d.AirlineID);
    };

    const onMouseOut = () => {
        setSelectedAirline(null);
    };
    
    
    return (
            <g transform={`translate(${offsetX}, ${offsetY})`}>
                {/* Frame around the bar chart */}
                <rect
                    x={-130} // Adjust position if necessary
                    y={-10} // Adjust position if necessary
                    width={width+140} // Full width of the chart
                    height={height+60} // Full height of the chart
                    fill="none" // Set to none to make it transparent
                    stroke="black" // Color of the frame
                    strokeWidth={2} // Thickness of the frame
                />
                {data.map(d => (
                    <rect
                        key={d.AirlineID}
                        x={0} // start bars from x = 0
                        y={yScale(d.AirlineName)} // position based on yScale
                        width={xScale(d.Count)} // width based on route count
                        height={yScale.bandwidth()} // height of each bar
                        fill={color(d)} // apply the color function
                        stroke="black" // optional stroke for visibility
                        onMouseOver={() => onMouseOver(d)} // Set mouse over event
                        onMouseOut={onMouseOut} // Set mouse out event
                    />
                ))}
                <XAxis xScale={xScale} width={width} height={height} />
                <YAxis yScale={yScale} height={height} offsetX={offsetX} />
            </g>
        
    );
}    

