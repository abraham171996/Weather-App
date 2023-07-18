import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button, Container, Card, Input, CardHeader, CardBody, Heading, Stack, Box, Text, Spinner } from '@chakra-ui/react';
import bgImage from "../assets/bgImage.jpg"
const Main = () => {
  const [value, setValue] = useState("");
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [temp, setTemp] = useState('');
  const [descp,setDescp]= useState("")
  const [cloud,setCloud] = useState("")
  const API_KEY = "0a486f8d82e287a035cf7b02398a52f6";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
  const kelvinConvertCelsius = 273;
  

  const handleChangeCity = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    setCityName(value);
  };

  useEffect(() => {
    if (cityName) {
      axios.get(`${BASE_URL}?q=${cityName}&appid=${API_KEY}`)
        .then(response => {
          setWeatherData(response.data);
          console.log(response.data);
          setTemp(Math.floor(response.data.main.temp - kelvinConvertCelsius));
         
          setCloud(response.data.weather[0].main)
          setDescp(response.data.weather[0].description.toString())
        })
        .catch(error => {
          console.error(error);
        });
    }
    setValue("")
    setCloud("")
    setDescp("")
    setTemp("")
  }, [cityName]);

  return (
    <Container marginTop={"50px"} display={"flex"} flexDir={"column"} gap={"10px"}>
      <Input placeholder='Basic usage' value={value} onChange={handleChangeCity} />
      <Button onClick={handleClick} colorScheme='blue'>Button</Button>
      {weatherData && (
        <Card textAlign={"center"} bgImg={`url(${bgImage})`} bgPosition="center" bgRepeat="no-repeat" bgSize={"cover"}>
          <CardHeader>
            <Heading size='md'>{cityName}</Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  {temp}°C
                </Heading>
                {/* Display other weather data here */}
              </Box>
              <Box >
              <Heading size='xs' textTransform='uppercase'>
                  {cloud}
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {descp.toUpperCase()}
                </Text>
                
                
              </Box>
            </Stack>
          </CardBody>
        </Card>
      )}
    </Container>
  );
};

export default Main;
