import React, { useEffect, useRef } from 'react';
import Lifeline from '../Lifeline';
import Map from '../Map';
import 'leaflet/dist/leaflet.css';
import { LifelineProps } from '../Lifeline/Lifeline';
import { MapProps, Marker } from '../Map/Map';
import './llmap.css';


type Layout = "column" | "row";
type Order = "mapFirst" | "mapSecond" 


interface LifelineMapProps extends LifelineProps, MapProps {

    layout?: string,
    order?: string

}

/**
 * Primary UI component for user interaction
 */
const LifelineMap: React.FunctionComponent<LifelineMapProps> = (props: LifelineMapProps) => {

    const direction = props.order === 'mapFirst' ? '-reverse' : ''; 
    const markers = props.lifepath.map((lpevent) => {



        const marker: Marker = {
            popupcontent: '',
            coords: lpevent.coords
        };
        return marker
    })

    return (
        <div className={`llmapwrapper ${props.layout}${direction}`} 
            {...props}
        >  <Lifeline lifepath={props.lifepath}></Lifeline>
            <Map   {...props} markers={(markers)}>
            </Map>
        </div>
    );
}

export default LifelineMap;


LifelineMap.defaultProps = {
    markercolor: "#cc756b",
    layout: 'row',
    order:'flex'
};