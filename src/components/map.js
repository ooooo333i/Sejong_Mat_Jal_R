import React, { useEffect, useRef } from "react";

const Map = ({ lat, lng }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          createMap();
        });
      };
      document.head.appendChild(script);
    } else {
      window.kakao.maps.load(() => {
        createMap();
      });
    }

    function createMap() {
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 4,
      };
      const map = new window.kakao.maps.Map(mapRef.current, options);

      new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(lat, lng),
        map,
      });
    }
  }, [lat, lng]);

  return <div ref={mapRef} style={{ width: "100%", height: "200px" }} />;
};

export default Map;