import { useEffect, useState } from 'react';
import styled from 'styled-components';
import List from '../components/List';
import Map from '../components/Map';
import getLocation from '../Utils/Location';

const HomeWrapper = styled.div`
    display: flex;
    div1{
        width: 370px
    }
`;
const Home = () => {
    const [locations, setLocations] = useState("Denver, CO");
    const [places, setPlaces] = useState([])
    const [coordinates, setCoordinates] = useState({ lat: 30.3321838, lng: -81.655651 });
    const runSearch = (id) => {
        getLocation(locations)
            .then((res) => {
                console.log(res.data)
                const lat = res.data[0].lat
                const lon = res.data[0].lon
                fetch(`https://bwreact-yelp-backend.herokuapp.com/api/search?term=Hotels&lat=${lat}&lon=${lon}&limit=50`)
                    // fetch(process.env.REACT_APP_HOTEL_API_KEY)
                    .then((res) => res.json())
                    .then((data) => {
                        setPlaces(data.businesses);
                        console.log(data);
                        setCoordinates({ lat: Number(data.lat), lng: Number(data.lon) })
                    })
                    .catch((error) => console.log(error))
            })
            .catch((error) => console.log(error))
    }
    useEffect(() => {
        runSearch()
    }, [])

    return (
        <>
            <HomeWrapper container  >
                <div1>
                    <List places={places} locations={locations} setLocations={setLocations}
                        runSearch={runSearch} />
                </div1>
                <div2 >
                    <Map
                        places={places}
                        coordinates={coordinates}
                        setCoordinates={setCoordinates}
                    />
                </div2>
            </HomeWrapper>
        </>
    );
}

export default Home;