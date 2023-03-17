import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { allowAdminOnly } from "../helpers/auth";

import ChakraNextLink from "./ChakraNextLink";

export const UserAccountDropdown = () => {
  const session = useSession();

  return (
    <Menu>
      <MenuButton
        as={Avatar}
        size="sm"
        src={session.data?.user?.image}
      ></MenuButton>
      <MenuList>
        <MenuItem>My Profile</MenuItem>
        {allowAdminOnly(session.data) && (
          <ChakraNextLink href="/admin" textDecoration={"none !important"}>
            <MenuItem>Admin Dashboard</MenuItem>
          </ChakraNextLink>
        )}
        <MenuItem>Settings</MenuItem>
        <MenuItem onClick={() => signOut()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};
