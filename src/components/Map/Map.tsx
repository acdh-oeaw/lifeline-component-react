import React, { useEffect, useRef } from 'react';
import './map.css'
import * as Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, MapContainerProps } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';





type LabelPlacement = "topLeft" | "topCenter" | "topRight";


export interface Marker {
  coords: [number, number],
  popupcontent: string
}



export interface MapProps extends MapContainerProps {
  
  /** Markercoordinates **/

  markers?: Marker[];

   /**
   * What color to use for the map markers
   */

  markercolor?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}



/**
 * Primary UI component for user interaction
 */
const Map: React.FunctionComponent<MapProps> = (props: MapProps) => {


    const iconSettings = {
        mapIconUrl: `<svg xmlns="http://www.w3.org/2000/svg"  fill="${props.markercolor}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle fill="white" cx="12" cy="10" r="3"></circle></svg>`,
        mapIconColor: '#cc756b',
       // mapIconColorInnerCircle: '#fff',
        //pinInnerCircleRadius: 48
      }
      
      const DefaultIcon = Leaflet.divIcon({
        className: "leaflet-data-marker",
        html: Leaflet.Util.template(iconSettings.mapIconUrl, iconSettings),
        iconAnchor: [12, 24],
        iconSize: [24,24],
        popupAnchor: [0, -24]
      });
      Leaflet.Marker.prototype.options.icon = DefaultIcon;
 /* const mapContainer = useRef(null);


  useEffect(() => {
    // Update the document title using the browser API
    if (props.lifepath && d3Container.current)
      createLifeline(props)
      
  });*/


  return (
 
    <MapContainer center={props.center} zoom={props.zoom}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
    {props.markers && props.markers.map((marker,i) => (
  <Marker key={i} position={marker.coords}>
    {marker.popupcontent &&
    <Popup>
      {marker.popupcontent}
    </Popup>
    }
  </Marker>
    )) }
</MapContainer>
  );
}

export default Map;


Map.defaultProps = {
  markercolor: "#cc756b",
  zoom: 0,
  center: [0,0]
};