import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet's broken default icon paths when bundled with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIconUrl from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl:       markerIconUrl,
  iconRetinaUrl: markerIcon2x,
  shadowUrl:     markerShadow,
})

export default function EsriMap({ lat, lng, label = 'La Fonda', address = '' }) {
  const containerRef = useRef(null)
  const mapRef       = useRef(null)

  useEffect(() => {
    if (mapRef.current) return          // already mounted
    if (!containerRef.current) return

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom: 16,
      zoomControl: true,
      scrollWheelZoom: false,
    })
    mapRef.current = map

    // ── Esri Modern Antique basemap ──────────────────────────────────────────
    // Modern Antique requires a FREE ArcGIS API key (no credit card needed):
    //   1. Sign up at https://developers.arcgis.com
    //   2. Create an API key with basemap tile access
    //   3. Add  VITE_ARCGIS_API_KEY=your_key_here  to a .env file at the project root
    //   4. Uncomment the three lines below and remove the Street Map line
    //
    // const apiKey = import.meta.env.VITE_ARCGIS_API_KEY
    // const tileUrl = `https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/World_Modern_Antique_Map/MapServer/tile/{z}/{y}/{x}?token=${apiKey}`
    // const attribution = 'Tiles &copy; <a href="https://www.esri.com">Esri</a>, Esri, DeLorme, NAVTEQ'

    // Fallback: Esri World Street Map (no API key, zoom 1–19)
    const tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
    const attribution = 'Tiles &copy; <a href="https://www.esri.com">Esri</a> &amp; contributors'

    L.tileLayer(tileUrl, { attribution, maxZoom: 19 }).addTo(map)

    // Custom styled marker
    const icon = L.divIcon({
      className: '',
      html: `
        <div style="
          background:#BC2B2B;
          border:3px solid #FEF3D0;
          border-radius:50% 50% 50% 0;
          width:28px;height:28px;
          transform:rotate(-45deg);
          box-shadow:2px 2px 6px rgba(0,0,0,0.4);
        "></div>
      `,
      iconSize:   [28, 28],
      iconAnchor: [14, 28],
      popupAnchor:[0, -32],
    })

    L.marker([lat, lng], { icon })
      .addTo(map)
      .bindPopup(`<strong>${label}</strong><br/>${address}`, { maxWidth: 200 })
      .openPopup()

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [lat, lng, label, address])

  return (
    <div
      ref={containerRef}
      className="w-full h-80 rounded-sm border-2 border-amber/40 shadow-lg z-0"
    />
  )
}
