import React, { useRef, useEffect } from "react";

const Map = (props) => {
  const mapRef = useRef();
  const { center, zoom } = props;
  //runs after jsx is returned
  useEffect(
    function () {
      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
      });
      new window.google.maps.Marker({ position: center, map: map });
    },
    [center, zoom]
  );

  return (
    <div
      ref={mapRef}
      className={`map ${props.className && props.className}`}
      style={props.style}
    >
      Map
    </div>
  );
};

export default Map;
