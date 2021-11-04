/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic2VpZmFsbGFoMjAyNCIsImEiOiJja3IzdmdnNmkwYW1yMnFsdHNjeXBnMWZxIn0.IZljnK1M5HEgayYM5yk4fg';
  //   'pk.eyJ1Ijoic2VpZi1hbGxhaCIsImEiOiJja3ZqeThpMTEwOTRiMm91Z3k5OGpvM215In0.tOgQH_sNxmE2rjYT9Psz-g';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/seifallah2024/ckvjyyajk8xj516s55m4cy5z2',
    scrollZoom: false,
    //   center: [-118.549101, 34.210034],
    //   zoom: 10,
    //   interactive: false,
  });
  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';
    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    // Extend the map bounds
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p> Day ${loc.day}: ${loc.description} </p>`)
      .addTo(map);
    bounds.extend(loc.coordinates);
  });
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
