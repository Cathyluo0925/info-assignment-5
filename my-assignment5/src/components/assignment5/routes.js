import React from "react";

function Routes(props) {
    const { projection, routes, selectedAirline } = props;

    // If no airline is selected, return an empty group
    if (!selectedAirline) {
        return <g></g>;
    }

    // Filter the routes for the selected airline ID
    const filteredRoutes = routes.filter(route => route.AirlineID === selectedAirline);

    return (
        <g>
            {filteredRoutes.map((route, index) => {
                // Project the source and destination coordinates
                const [startX, startY] = projection([route.SourceLongitude, route.SourceLatitude]);
                const [endX, endY] = projection([route.DestLongitude, route.DestLatitude]);

                return (
                    <line
                        key={index}
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke="#8B0000" // Change the color of the routes as needed
                        strokeWidth={0.08} // Change the stroke width as needed
                    />
                );
            })}
        </g>
    );
}

export { Routes };
