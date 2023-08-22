import React, {Component} from 'react';

import NaverMapView, {Marker} from 'react-native-nmap';
import {VillaContext} from '../contexts/VillaProvider';

class NaverMap extends Component {
  static contextType = VillaContext;

  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      markerLegalcodes: [],
      forceRender: true,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reRender !== this.props.reRender) {
      console.log('navermap: ', this.props.searchQuery);
      this.handleSearch(this.props.searchQuery);
      this.setState({markers: []});
      console.log('forceRender: ', this.state.forceRender);
    }
  }

  handleSearch = async query => {
    // 주소 검색 API 호출
    const responseAddress = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${query}`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': 'tqfivq7m66',
          'X-NCP-APIGW-API-KEY': 'iaDotrE05BMaraCKn9KfOSRrdUQT14TJeqMIkTBC',
        },
      },
    );
    const dataAddress = await responseAddress.json();
    console.log(dataAddress);

    // 검색 결과를 marker 상태에 저장
    if (dataAddress.status === 'OK') {
      console.log(this.state.markers);
      this.setState({markers: dataAddress.addresses});
      // this.setState({searchQuery: ''});
    } else {
      console.log('검색 실패');
    }
  };

  handlePressMarker = async (marker, index) => {
    const responseLegalcode = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=${marker.x},${marker.y}&sourcecrs=epsg:4326&output=json&orders=addr,admcode,roadaddr`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': 'tqfivq7m66',
          'X-NCP-APIGW-API-KEY': 'iaDotrE05BMaraCKn9KfOSRrdUQT14TJeqMIkTBC',
        },
      },
    );
    const dataLegalcode = await responseLegalcode.json();
    // console.log('land:  ', dataLegalcode.results[0].land);

    // 검색 결과를 marker 상태에 저장
    if (dataLegalcode.status.name === 'ok') {
      // this.setState(prevState => ({
      //   markerLegalcodes: [
      //     ...prevState.markerLegalcodes,
      //     dataLegalcode.results[0].code.id,
      //   ],
      // }));

      // console.log('marker: ' + marker.jibunAddress.split(' ').reverse()[0]);
      this.context.setVillaName(marker.jibunAddress.split(' ').reverse()[0]);
      this.context.setVillaId(
        dataLegalcode.results[0].code.id +
          marker.jibunAddress.split(' ')[3].split('-')[0].padStart(4, '0') +
          marker.jibunAddress.split(' ')[3].split('-')[1].padStart(4, '0'),
      );

      this.props.nav.navigate('Villa');
    } else {
      console.log('검색 실패');
    }
  };

  render() {
    const {markers, forceRender} = this.state;

    return (
      <NaverMapView
        style={{width: '100%', height: '100%'}}
        showsMyLocationButton={true}
        center={{
          ...(markers[0] && markers[0].y && markers[0].x
            ? {
                latitude: parseFloat(markers[0].y),
                longitude: parseFloat(markers[0].x),
              }
            : {
                latitude: 37.55765,
                longitude: 126.9734814,
              }),
          zoom: markers[0] && markers[0].y && markers[0].x ? 16 : 10,
        }}
        // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
        onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
        // onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(marker.y),
              longitude: parseFloat(marker.x),
            }}
            title={marker.roadAddress}
            pinColor="blue"
            onClick={() => this.handlePressMarker(marker, index)}
          />
        ))}
      </NaverMapView>
    );
  }
}

export default NaverMap;

// import React, { useEffect, useState } from 'react';

// const NaverMap = ({ searchQuery }) => {
//   const [markers, setMarkers] = useState([]);

//   useEffect(() => {
//     // Function to execute when props change
//     // Example: Fetch data or perform other operations
//     // based on the search query

//     // Update the markers state if necessary
//     setMarkers([...]); // New markers array
//   }, [searchQuery]); // Only re-run the effect if searchQuery changes

//   // Rest of your NaverMap component code

//   return (
//     // Your map component JSX
//   );
// };
