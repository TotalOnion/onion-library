// LIBRARY FILE - Do not modify/override here as your changes will be lost when the package is updated.
export default function mapcontainerJs(options = {}) {
	try {
		const {block} = options;
		const data = block.dataset;
		
        const location = { lat: Number(data.latitude), lng: Number(data.longitude) };

		let decodedmapcontent = data.mapcontent.replace(/\\u([0-9A-Fa-f]{4})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16)));

		decodedmapcontent = decodedmapcontent.replace(/\\\//g, '/').replace(/\\n/g, '');
		
        const mapStyle = [
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e9e9e9"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dedede"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#333333"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            }
        ];

        const map = new google.maps.Map(block.querySelector("#map"), {
          zoom: 15,
          center: location,
          styles: mapStyle,
          disableDefaultUI: true,
          zoomControl: false,
          draggable: false
        });

        const customIcon = {
          url: `${data.mapicon}`,
          scaledSize: new google.maps.Size(71, 71),
        };

        const marker = new google.maps.Marker({
          position: location,
          map: map,
          icon: customIcon, 
        });

        const infoContent = `
          <div>
            ${decodedmapcontent}
          </div>
        `;

		const infoWindow = new google.maps.InfoWindow({
          content: infoContent,
          pixelOffset: new google.maps.Size(170, 110)
        });

        infoWindow.open(map, marker);

        google.maps.event.addListener(infoWindow, 'closeclick', function() {
          infoWindow.open(map, marker);
        });
		
	} catch (error) {
		console.error(error);
	}
}