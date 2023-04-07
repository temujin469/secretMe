import React, { useEffect, useState } from 'react'
import { Textarea, Box, Container, Stack, Button, Text, Divider, Avatar, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Input, useToast } from '@chakra-ui/react'
import { useGeolocated } from "react-geolocated";

function index() {

  const [message, setMessage] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [open, setOpen] = useState(true)

  // const [location, setLocation] = useState<{
  //   long: Number,
  //   lat: Number
  // } | undefined>();
  const [loading, setLoading] = useState<boolean>(false);


  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        // enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
      watchPosition: true
    });

  // console.log(coords)


  // let watchId: any;

  // const getLocation = () => {

  //   const onSuccess = (location: GeolocationPosition) => {
  //     setLocation({
  //       long: location.coords.longitude,
  //       lat: location.coords.latitude
  //     })
  //     console.log(location.coords)
  //   }
  //   const onError = (error: any) => {
  //     console.log("location not found")
  //   }

  //   var options = {
  //     enableHighAccuracy: false,
  //     timeout: 5000,
  //     maximumAge: 0,
  //   };
  //   // if (("geolocation" in navigator)) {
  //   watchId = navigator.geolocation.watchPosition(onSuccess, onError, options)
  //   // }

  // }

  // useEffect(() => {
  //   getLocation()
  // }, [])

  const toast = useToast()

  const sendMessage = async () => {
    try {
      setLoading(true);
      const body: string = JSON.stringify({
        message,
        location: {
          long: coords?.longitude,
          lat: coords?.latitude
        },
        email
      });
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8"
        },
        body: body
      })

      setMessage("");
      toast({
        description: "successfully sent"
      })

      // navigator.geolocation.clearWatch(watchId);

    } catch (err) {
      console.log("send message error: ", err)
    } finally {
      setLoading(false);
    }
  }
  return (
    <Box bg="gray.100" minH="100vh" display="flex" flexDirection="column" justifyContent="space-between">
      <Container pt="50px">
        {/* <Text>Because your message is private, no one knows who wrote it</Text> */}
        <Box bg="white" border="1" borderRadius={18} p={4}>
          <Stack direction={"column"} spacing={5} >

            <Stack direction="row">
              <Avatar name='Dan Abrahmov' src='https://scontent.fuln1-2.fna.fbcdn.net/v/t39.30808-6/311791638_820781072408387_2175273042393064610_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=bPbVf8zbNHMAX8eLslf&_nc_ht=scontent.fuln1-2.fna&oh=00_AfBojN2AF_Zw5ZBBlakIRquzTAcBfbVVAB6NvozYSyoMQA&oe=643470EE' />
              <Box>
                <Text fontSize="sm">@temuujin</Text>
                <Text as="b">what you THINK about me!</Text>
              </Box>
            </Stack>
            <Text>No one knows who wrote it because your message is private,</Text>

            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder='send me anonymous message...' />
            <Button isDisabled={!message} isLoading={loading} colorScheme='teal' onClick={sendMessage}>
              Send
            </Button>
            <Divider />
            <Text align="center">
              🔒 anonymous q&a
            </Text>
          </Stack>
        </Box>

      </Container >
      <Stack direction="row" spacing="20px" justifyContent="center" py="20px">
        <Text>Terms</Text>
        <Text>Privacy</Text>
      </Stack>
      <Modal isOpen={open} onClose={() => { }}>
        <ModalOverlay />
        <ModalContent sx={{
          margin: "10px"
        }}>
          <ModalHeader>Receive a reply</ModalHeader>

          <ModalBody>
            <Text mb={7}>
              Enter your email address to receive a reply
            </Text>
            <Input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter your email address' />
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={() => setOpen(false)}>
              Skip
            </Button>
            <Button colorScheme='blue' onClick={() => setOpen(false)}>Next</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box >


  )
}

export default index