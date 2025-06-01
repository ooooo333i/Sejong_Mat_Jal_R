import React, { useEffect, useRef } from "react";

const Map = ({ address }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const createMap = (coords) => {
      const map = new window.kakao.maps.Map(mapRef.current, {
        center: coords,
        level: 4,
      });

      new window.kakao.maps.Marker({
        position: coords,
        map,
      });
    };

    const loadMap = () => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          createMap(coords);
        } else {
          console.error("error", address);
        }
      });
    };

    // SDK 로드 (중복 방지)
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false&libraries=services`;
      script.async = true;
      script.onload = () => window.kakao.maps.load(loadMap);
      document.head.appendChild(script);
    } else {
      window.kakao.maps.load(loadMap);
    }
  }, [address]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "200px", borderRadius: "8px", marginTop: "8px" }}
    />
  );
};

export default Map;