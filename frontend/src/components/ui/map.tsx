import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { City } from "@/types/City";
import { useNavigate } from "react-router";

const Map = ({ cities }: { cities: City[] }) => {
  const navigate = useNavigate();
  return (
    <div>
      <MapContainer
        style={{ width: "100%", height: "450px", borderRadius: "16px" }}
        center={[45.8131, 15.9775, 25]}
        zoom={11}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.latitude, city.longitude]}
            eventHandlers={{
              click: () => {
                navigate("/place/" + city.id);
              },
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
