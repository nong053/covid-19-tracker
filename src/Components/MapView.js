import React ,{useMapEvents} from 'react';
import {MapContainer, TileLayer,Marker,Popup,useMap} from 'react-leaflet';
import {divIcon} from 'leaflet';

/*
1-100 => pink,super very small
101-500 =>pink,very small
501-1000 => pink small
1001-5000 => purple, normal
5001-10000 => purple,big
10001-50000=> red,very big
50001 up=> red,super very big

*/


//const icon = divIcon({className:'marker-icon',iconSize:[32,32]});
const icons={
    xxSmall:divIcon({className:'marker-icon pink',iconSize:[12,12]}),
    xSmall:divIcon({className:'marker-icon pink',iconSize:[16,16]}),
    small:divIcon({className:'marker-icon pink',iconSize:[24,24]}),
    normal:divIcon({className:'marker-icon purple',iconSize:[32,32]}),
    large:divIcon({className:'marker-icon purple',iconSize:[48,48]}),
    xLarge:divIcon({className:'marker-icon red',iconSize:[72,72]}),
    xxLarge:divIcon({className:'marker-icon red',iconSize:[96,96]})
   
}


function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  
function MapView(props) {


   

    const {locationArray,mapCenter,onSelectMarker} = props;

    const markerElement = locationArray.map(location => {
        const {
            id,country_code,country,province,coordinates:{latitude,longitude},
            latest:{confirmed}
        }=location;

        let markerIcon = icons.xxSmall;
        if(confirmed >= 101 && confirmed<=500){
            markerIcon = icons.xSmall;
        }else if(confirmed >= 501 && confirmed<=1000){
            markerIcon = icons.small;
        }else if(confirmed >= 1001 && confirmed<=5000){
            markerIcon = icons.normal;
        }else if(confirmed >= 1001 && confirmed<=10000){
            markerIcon = icons.large;
        }else if(confirmed >= 10001 && confirmed<=50000){
            markerIcon = icons.xLarge;
        }else if(confirmed >= 50001 ){
            markerIcon = icons.xxLarge;
        }









        let title = country;
        if(province!=='' && province !== country){
            title = `${province}, ${country}`;
        }


        
        

        return(
            <Marker  key={`${id}-${country_code}`} 
                position={[latitude,longitude]}
                icon={markerIcon}
                // onclick={() => onSelectMarker(id)}

                // eventHandlers={{
                //     click: (e) => {
                //       console.log('marker clicked', e)
                //     },
                //   }}

                eventHandlers={{
                        click: (e) => onSelectMarker(id)}}
               
                >
                {/* <Popup>{title}</Popup> */}
            </Marker>
        )
    });
    //const position = [13,100];

   console.log("mapCenter==="+mapCenter);
   
  return (
      
      
    <MapContainer className='map-view' center={mapCenter} zoom={5} >
    <ChangeView center={mapCenter} zoom={5} />
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {markerElement}
  </MapContainer>

  
  );
}

export default MapView;
