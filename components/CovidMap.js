import { Map, TileLayer } from "react-leaflet";

export default function CovidMap({ mapCenter, mapZoom }) {
    return (
        <Map center={mapCenter} zoom={mapZoom}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </Map>
    )
};
