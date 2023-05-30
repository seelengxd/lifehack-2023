import { Box, Button, Stack, CircularProgress } from '@mui/material';
import { useCallback, useState } from 'react';
import sgidLogo from '../../assets/logo.png';
import singpassLogo from '../../assets/singpass.svg';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { BACKEND_URL } from '../../config/constants';

export const Login = (): JSX.Element => {
  // Button loading state
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginBtnClick = useCallback(() => {
    setIsLoading(true);
    fetch(`${BACKEND_URL}/api/auth-url`, {
      credentials: 'include',
    })
      .then(async r => await r.json())
      .then(({ url }) => {
        window.location.href = url;
      })
      .catch((e: unknown) => {
        setIsLoading(false);
        console.log(e);
      });
  }, []);

  const { user, isLoading: isUserLoading } = useAuth();

  if (isUserLoading) {
    return <CircularProgress />;
  }
  if (user !== null) {
    return <Navigate to='/logged_in' />;
  }
  return (
    <Stack spacing='48px' direction='column'>
      <Stack spacing='48px' justifyContent={'center'} direction='row'>
        <Box>
          <img src={sgidLogo} width='100%' />
        </Box>
        <Box>
          <img src={singpassLogo} width='100%' className='' />
        </Box>
      </Stack>
      {/* <FormControl id={iceCreamFieldId} mb={6}>
        <FormLabel.Label>
          Favourite ice cream flavour
          <FormLabel.Description fontWeight={'400'}>
            This shows how you can keep state before and after login.
          </FormLabel.Description>
        </FormLabel.Label>
        <Radio.RadioGroup
          name={iceCreamFieldId}
          onChange={handleIceCreamSelection}
          value={iceCream}
        >
          <Stack spacing="0.5rem">
            {Object.values(IceCreamOptions).map((o, idx) => (
              <Radio allowDeselect={false} key={idx} value={o}>
                {o}
              </Radio>
            ))}
          </Stack>
        </Radio.RadioGroup>
      </FormControl> */}
      <Button onClick={handleLoginBtnClick}>Login with Singpass app</Button>
    </Stack>
  );
};
