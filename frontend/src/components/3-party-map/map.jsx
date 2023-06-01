import { useState } from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function BasicMap(props) {
  const [showPopup, setShowPopup] = useState(true);
  const myArr = Object.values(props.data);
  const lng = myArr[0].longitude;
  const lat = myArr[0].latitude;
  return (
    <div className="Map">
      {true ? (
        <Map
          mapLib={maplibregl}
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: props.zoom,
          }}
          style={{
            width: "100%",
            height: props.height ? props.height : "63vh",
          }}
          mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=PfBiDMBwYcldfk1orUpK"
        >
          {myArr.map((prop, index) => (
            <div key={index}>
              <Marker
                key={index + 1}
                longitude={prop.longitude}
                latitude={prop.latitude}
                color={"#61dbfb"}
              />
              <Popup
                key={index + 2}
                longitude={prop.longitude}
                latitude={prop.latitude}
                anchor="bottom"
                onClose={() => setShowPopup(true)}
              >
                {prop.price}
              </Popup>
            </div>
          ))}
          <NavigationControl position="top-left" />
          <a href="https://www.maptiler.com/copyright/" target="_blank">
            &copy; MapTiler
          </a>{" "}
          <a href="https://www.openstreetmap.org/copyright" target="_blank">
            &copy; OpenStreetMap contributors
          </a>
        </Map>
      ) : (
        "loading"
      )}
    </div>
  );
}

export default BasicMap;
