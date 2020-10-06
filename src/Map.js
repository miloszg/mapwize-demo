import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Api, apiKey, apiUrl, Cache, config, version } from 'mapwize';

declare var Mapwize: any;

function Map() {
  useEffect(()=>{
    var mapwizeMap = null
      var apiKey = 'cfd6a3e7c94162b1091264934992cf32'
      var modeId = '5da6bec9aefa100010c7df67'
       var mapwizePlaceId = '5f7af0e76b865c0016d738b7'
      // var mapwizePlaceId = '5f7af0e76b865c0016d738b7'
      var entrancePlaceId ="5f7afc5da619d90016fdd59c"
      var receptionPlaceId = '5f7afd43cfc3220016bc20a1'

      window.onload = function () {
        Mapwize.apiKey(apiKey)
        Mapwize.Api.getDirection({
          from: { placeId: entrancePlaceId },
          to: { placeId: receptionPlaceId }
        }).then(function (direction) {
          Mapwize.map({ // Also works
            container: 'mapwize',  // Also works
            apiKey: apiKey,
            direction: direction,
            center: [18.614295, 54.379470],
            zoom: 18,
            floor: 2,
            // centerOnPlaceId: mapwizePlaceId,
            centerOnVenueId: mapwizePlaceId,
             restrictContentToOrganizationId: '',
            restrictContentToVenueIds: [mapwizePlaceId],
            locale: 'en',
            locationControl: true,
            floorControl: true,
            venuiId: '5f7af0e76b865c0016d738b7',
            organizationId: '5f7ace5aa619d90016fdd23d',
            // mainColor: '#fca903',
            // onDirectionQueryWillBeSent: function (query) { return query; },
            // onDirectionWillBeDisplayed: function (options) { return options; },
            shouldShowInformationButtonFor: function (e) {
              console.log('shouldShowInformationButtonFor', e)
              return '<span class="mwz-icon-information">i</span> ' + e.name
            },
            onObjectWillBeSelected: function (options, mwzObject) {
              if (haveCustomData(mwzObject)) {
                options.template = customTemplate(mwzObject)
              }

              return options;
            },
            onInformationButtonClick: function (e) {
              console.log('onInformationButtonClick', e)
              alert('onInformationButtonClick ' + e.name)
            },
            onMenuButtonClick: function (e) {
              console.log('onMenuButtonClick')
              alert('onMenuButtonClick')
            },
            onSelectedChange: function (selectedObject, analytics) {
              console.log('onSelectedChange', selectedObject, analytics)
            },
            onFollowButtonClickWithoutLocation() {
              alert('onFollowButtonClickWithoutLocation')
            }
          }).then(function (instance) {
            console.log('MAP LOADED')
            mapwizeMap = instance;
            const el = document.createElement('div');
            el.className = 'marker my-custom-marker';
            el.addEventListener('click', () => {
                // Listen click on your custom marker
            });
            const myCustomMarker = new Mapwize.Marker(el);
            // mapwizeMap.addMarker({
            //     latitude:  54.379470,
            //     longitude: 18.614295,
            //     floor:  0,})

            mapwizeMap.addMarker({
              latitude:  54.379470,
              longitude: 18.614295,
              floor:  0,
            })
           
            mapwizeMap.on('mapwize:directionstart', function (e) { console.log('directionstart', e) });
            mapwizeMap.on('mapwize:venueenter', function (e) { console.log('venueenter', e) });
            mapwizeMap.on('mapwize:floorchange', function (e) { console.log('floorchange', e) });
            mapwizeMap.on('mapwize:universechange', function (e) { console.log('universechange', e) });
            mapwizeMap.on('mapwize:languagechange', function (e) { console.log('languagechange', e) });
            mapwizeMap.on('mapwize:venueexit', function (e) { console.log('venueexit', e) });
            mapwizeMap.on('mapwize:error', function (e) { console.error('error:', e) })
            mapwizeMap.on('mapwize:markerclick', e => {console.log('marker: ' + e.marker); });

          })
        })
      }
      function setDirectionMode() {
        mapwizeMap.setDirectionMode().catch(function () { return null })
      }
      function getModes() {
        console.log(mapwizeMap.getModes())
      }
      function getMode() {
        console.log(mapwizeMap.getMode())
      }
      function setMode() {
        mapwizeMap.setMode(modeId)
      }
      function getSelected() {
        console.log(mapwizeMap.getSelected());
      }
      function setSelected() {
        mapwizeMap.setSelected(mapwizePlaceId)
      }
      function getAllLocales() {
        console.log(mapwizeMap.getLocales())
      }
      function setFrLocale() {
        mapwizeMap.setLocale('fr')
      }
      function setEnLocale() {
        mapwizeMap.setLocale('en')
      }
      function getUnits() {
        console.log(mapwizeMap.getUnits())
      }
      function setMunit() {
        mapwizeMap.setUnit('m')
      }
      function setFunit() {
        mapwizeMap.setUnit('ft')
      }

      function setFrom() {
        Mapwize.Api.getPlace(mapwizePlaceId).then(function (place) {
          place.objectClass = 'place'
          mapwizeMap.setFrom(place)
        })
      }
      function setTo() {
        Mapwize.Api.getPlace(receptionPlaceId).then(function (place) {
          place.objectClass = 'place'
          mapwizeMap.setTo(place)
        })
      }

      function setUserLocation(floor) {
        mapwizeMap.setUserLocation({
          latitude: 50.63262,
          longitude: 3.02045,
          floor: floor
        })
      }

      function remove() {
        mapwizeMap.remove()
      }

      function haveCustomData(element) {
        return element.data && element.data.FirstName && element.data.LastName;
      }

      function customTemplate(element) {
        return '<div class="mwz-selection-header mwz-d-flex mwz-align-items-center">'
          + '<div class="mwz-icon">'
          + '<img src="<' + '%= icon %>" alt="Menu" />'
          + '</div>'
          + '<div class="mwz-data mwz-flex-grow-1">'
          + '<strong class="titleInfos">' + element.data.FirstName + ' ' + element.data.LastName + '</strong><br />'
          + '</div>'
          + '</div>'
          + '<button id="mwz-footer-directions-button" type="button" class="mwz-btn mwz-btn-link mwz-directions-button">'
          + '<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhbHF1ZV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMwIDMwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMCAzMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIHN0eWxlPSJmaWxsOndoaXRlOyIgZD0iTTI4LjYsMTRMMTYsMS40Yy0wLjYtMC42LTEuNC0wLjYtMiwwTDEuNCwxNGMtMC42LDAuNi0wLjYsMS40LDAsMkwxNCwyOC42YzAuNiwwLjYsMS40LDAuNiwyLDBMMjguNiwxNkMyOS4xLDE1LjQsMjkuMSwxNC42LDI4LjYsMTR6IE0yMiwxMy45bC0zLjksMy43Yy0wLjIsMC4yLTAuNSwwLTAuNS0wLjJ2LTIuMmMwLTAuMi0wLjEtMC4zLTAuMy0wLjNoLTQuNWMtMC4yLDAtMC4zLDAuMS0wLjMsMC4zdjMuMmMwLDAuMi0wLjEsMC4zLTAuMywwLjNoLTEuOWMtMC4yLDAtMC4zLTAuMS0wLjMtMC4zdi00LjVjMC0wLjksMC43LTEuNiwxLjYtMS42aDUuOGMwLjIsMCwwLjMtMC4xLDAuMy0wLjN2LTJjMC0wLjMsMC4zLTAuNCwwLjUtMC4ybDMuOCwzLjhDMjIuMSwxMy42LDIyLjEsMTMuOCwyMiwxMy45eiIvPjwvc3ZnPg==" alt="Directions"> Directions'
          + '</button>';
      }
  }, [])
  
  return (
    <div className="App">
        <div id="mapwize"></div>
    </div>
  );
}

export default Map;
