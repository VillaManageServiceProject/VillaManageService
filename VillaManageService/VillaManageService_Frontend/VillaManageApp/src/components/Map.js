import React, {Component} from 'react';

import NaverMapView, {Marker} from 'react-native-nmap';

class NaverMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      console.log('hi2');
      this.handleSearch(this.props.searchQuery);
    }
  }

  handleSearch = async query => {
    // 주소 검색 API 호출
    const response = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${query}`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': 'tqfivq7m66',
          'X-NCP-APIGW-API-KEY': 'iaDotrE05BMaraCKn9KfOSRrdUQT14TJeqMIkTBC',
        },
      },
    );
    const data = await response.json();

    // 검색 결과를 marker 상태에 저장
    if (data.status === 'OK') {
      this.setState({markers: data.addresses});
    } else {
      console.log('검색 실패');
    }
  };

  render() {
    const {markers} = this.state;

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
            onClick={() =>
              this.props.nav.navigate('Villa', {address: marker.roadAddress})
            }
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
