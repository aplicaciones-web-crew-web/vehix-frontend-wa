<script setup>
import { onMounted, ref } from 'vue'

const mapContainer = ref(null)
const emit = defineEmits(['update-mechanics'])

onMounted(() => {
  navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        const map = new google.maps.Map(mapContainer.value, {
          center: userLatLng,
          zoom: 15,
          mapId: 'DEMO_MAP_ID',
        })

        new google.maps.Marker({
          position: userLatLng,
          map,
          title: 'Tu ubicación',
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            scaledSize: new google.maps.Size(40, 40),
          },
        })

        const service = new google.maps.places.PlacesService(map)
        service.nearbySearch(
            {
              location: userLatLng,
              radius: 5000,
              keyword: 'taller mecánico',
            },
            (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                const mechanicsWithDetails = []

                results.forEach((place, index) => {
                  const mechanicLatLng = new google.maps.LatLng(
                      place.geometry.location.lat(),
                      place.geometry.location.lng()
                  )
                  const distance = google.maps.geometry.spherical.computeDistanceBetween(
                      new google.maps.LatLng(userLatLng.lat, userLatLng.lng),
                      mechanicLatLng
                  )
                  // Agregar marcador para cada taller
                  new google.maps.Marker({
                    position: mechanicLatLng,
                    map,
                    title: place.name,
                  })
                  // Obtener detalles adicionales como el número de teléfono
                  service.getDetails(
                      { placeId: place.place_id },
                      (details, detailsStatus) => {
                        if (detailsStatus === google.maps.places.PlacesServiceStatus.OK) {
                          mechanicsWithDetails.push({
                            name: place.name,
                            vicinity: place.vicinity,
                            distance: Math.round(distance),
                            phone: details.formatted_phone_number || 'No disponible',
                          })

                          // Emitir los datos una vez que todos los detalles estén listos
                          if (mechanicsWithDetails.length === results.length) {
                            mechanicsWithDetails.sort((a, b) => a.distance - b.distance)
                            emit('update-mechanics', mechanicsWithDetails)
                          }
                        }
                      }
                  )
                })
              } else {
                console.error('Error al buscar talleres mecánicos:', status)
              }
            }
        )
      },
      (error) => {
        alert('No se pudo obtener tu ubicación. Asegúrate de permitir el acceso.')
        console.error(error)
      }
  )
})
</script>

<template>
  <div class="map-container">
    <div ref="mapContainer" class="map"></div>
  </div>
</template>

<style scoped>
.map-container {
  width: 90%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
}
.map {
  width: 100%;
  height: 100%;
}
</style>