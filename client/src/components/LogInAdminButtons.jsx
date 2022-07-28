import { Button, ButtonGroup } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../App";

const LogInAdminButtons = () => {
  const { admin, setAdmin } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box>
      <Text textAlign="center">{`Logged In: ${admin.loggedIn}`}</Text>
      <ButtonGroup>
        <Button
          onClick={() => {
            if (admin.loggedIn) return;
            setAdmin({ loggedIn: true });

            if (location.state?.from) {
              navigate(location.state.from);
            }
          }}
        >
          Log In As Admin
        </Button>
        <Button
          onClick={() => {
            if (!admin.loggedIn) return;
            setAdmin({ loggedIn: false });
          }}
        >
          Log Out
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default LogInAdminButtons;