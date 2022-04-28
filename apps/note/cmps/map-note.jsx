export function MapNote({ mapId, locations }) {
  return (
    <div className="map-note">
      <h3>This is a map note</h3>
      <div className="map-container" id={`${mapId}`}></div>
    </div>
  )
}
