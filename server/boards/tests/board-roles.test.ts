import {
    TWISTED_MINDS_REALM_EXTERNAL_ID,
    UWU_REALM_EXTERNAL_ID
} from "test/data/realms";
import { GORE_BOARD_ID } from "test/data/boards";

import {
    BOBATAN_USER_ID,
    SEXY_DADDY_USER_ID,
    ONCEST_USER_ID,
} from "test/data/auth";
import {
  GOREMASTER_ROLE_EXTERNAL_ID,
  OWNER_ROLE_EXTERNAL_ID,
} from "test/data/user";

import { setLoggedInUser, startTestServer } from "utils/test-utils";
import request from "supertest";
import router from "../routes";
import { getBoardRoles } from "../queries";

jest.mock("handlers/auth");
  
  describe("Tests board role queries", () => {
    const server = startTestServer(router);
  
    test("fetches board roles with permissions", async () => {
      setLoggedInUser(BOBATAN_USER_ID);
      const roles = await getBoardRoles({
        boardExternalId: GORE_BOARD_ID
      })

      expect(roles).toEqual({
        roles: [
          {
            role_name: 'GoreMaster5000',
            role_string_id: GOREMASTER_ROLE_EXTERNAL_ID,
            role_avatar: 'https://firebasestorage.googleapis.com/v0/b/bobaboard-fb.appspot.com/o/images%2Fbobaland%2Fc26e8ce9-a547-4ff4-9486-7a2faca4d873%2F6518df53-2031-4ac5-8d75-57a0051ed924?alt=media&token=23df54b7-297c-42ff-a0ea-b9862c9814f8',
            color: 'red',
            description: 'A role for people who can edit the gore board.',
            permissions: [
              'edit_board_details',
              'delete_board',
              'post_as_role',
              'edit_category_tags',
              'edit_content_notices',
            ],
            users: [
              { 
                user_firebase_id: BOBATAN_USER_ID,
                username: 'bobatan',
                label: 'we have fun here'
              },
            ]
          },
        ]
      });
    });
  });
