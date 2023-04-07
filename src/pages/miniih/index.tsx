import { Box, Container, Divider, Spinner, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

function index() {

  const [messages, setMessages] = useState<{ message: string, location?: { long: number, lat: number }, email?: string }[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false)

  const getMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/messages", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8"
        },
      })

      const data = await res.json();

      setMessages(data.messages);

    } catch (err) {
      console.log("get message error: ", err)
    } finally {
      setLoading(false);
    }

  }

  console.log(messages)

  useEffect(() => {
    getMessages()
  }, [])
  return (
    <Box>

      <Container mt={5}>
        <Box mb={4}>
          <Text as="b" fontSize="lg">Миний захиа</Text>
        </Box>
        {
          loading ? (
            <Spinner />
          ) : messages !== null ? messages.map(({ message, location, email }) => (
            <Box mb={4}>
              <Stack bg="green.100" p={4} borderRadius={10}>
                <Box>
                  {
                    location?.long ? (
                      <>
                        <Text>{email ? email : "Тодорхойгүй"}</Text>
                        <Text>{location?.long}</Text>
                        <Text>{location?.lat}</Text>
                      </>
                    ) : (
                      <Text>Тодорхойгүй</Text>
                    )
                  }

                </Box>
                <Divider />
                <Text>
                  {message}
                </Text>
                {/* 
                <iframe src={`<iframe width="700" height="300" src="https://maps.google.com/maps?q=${location?.lat},${location?.long}&amp;z=15&amp;output=embed"></iframe>`} width="100%" height="300" loading="lazy"></iframe> */}
              </Stack>

            </Box>
          )) : (
            <Text>Захиа алга</Text>
          )
        }
      </Container>
    </Box>
  )
}

export default index