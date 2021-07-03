import React from 'react'

const mapOuter = () => (
  {
    position: 'relative',
    textAlign: 'right',
    height: '100%',
    width: '100%',
  }  
)

const gmapCanvas = () => (
  {
    overflow: 'hidden',
    background: 'none !important',
    height: '100%',
    width: '100%',
  }
)

const mapSection = () => (
<section className="map">
  <h3 className="map__title">Map</h3>
  <p className="map__sub">Akoka, Yaba,Lagos</p>
  <div className="map__showcase">
    <div className="mapouter" style={mapOuter()}>
      <div className="gmap_canvas" style={gmapCanvas()}>
        <iframe 
            style={{width: '100%', height: '100%'}}
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=Akoka%2C%20Yaba%2CLagos&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"></iframe>
            <a href="https://usave.co.uk">usave</a>
      </div>
    </div>
  </div>
</section>  
)

export default mapSection
