export const mapService = {
  initMap,
  addMarker,
  panTo,
}

var gMap

function initMap(mapId, lat = 32.0749831, lng = 34.9120554) {
  console.log('InitMap')
  return _connectGoogleApi().then(() => {
    gMap = new google.maps.Map(document.querySelector(`#${mapId}`), {
      center: { lat, lng },
      zoom: 15,
    })
    return gMap
  })
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'Hello World!',
  })
  return marker
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  const API_KEY = 'AIzaSyBiEYKWFq2oqrUr4W83S8Em63Ppdp8E_6Y'
  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject('Google script failed to load')
  })
}
