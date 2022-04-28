import { mapService } from '../../../services/googleAPI.service.js'

export class MapNote extends React.Component {
  state = {}

  componentDidMount() {
    const { mapId } = this.props
    mapService.initMap(mapId).then((map) =>
      map.addListener('click', (mapsMouseEvent) => {
        let clickedPos = mapsMouseEvent.latLng
        this.onAddLoc(clickedPos)
      })
    )
  }

  onAddLoc(loc) {
    const { onAddLocation } = this.props
    const lat = loc.lat()
    const lng = loc.lng()
    const pos = {
      lat,
      lng,
    }

    onAddLocation(pos)
  }

  render() {
    const { mapId, locations } = this.props
    return (
      <div className="map-note">
        <h3>This is a map note</h3>
        <div className="map-container" id={`${mapId}`}></div>
        <h4 className="locs-heading">Your locations:</h4>
        <ul className="locations-list">
          {locations.map((loc) => {
            return (
              <li key={loc.id} className="loc">{`lat:${loc.lat.toFixed(
                2
              )}, lng:${loc.lng.toFixed(2)}`}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}
