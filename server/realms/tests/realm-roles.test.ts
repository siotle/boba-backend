import {
    TWISTED_MINDS_REALM_EXTERNAL_ID,
    UWU_REALM_EXTERNAL_ID
} from "test/data/realms";

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

jest.mock("handlers/auth");
  
  describe("Tests realm role queries", () => {
    const server = startTestServer(router);
  
    test("fetches realm roles with permissions", async () => {
      setLoggedInUser(BOBATAN_USER_ID);
      const res = await request(server.app).get(`/${TWISTED_MINDS_REALM_EXTERNAL_ID}/roles`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        roles: [
          {
            role_name: 'The Owner',
            role_string_id: OWNER_ROLE_EXTERNAL_ID,
            role_avatar: 'https://firebasestorage.googleapis.com/v0/b/bobaboard-fb.appspot.com/o/images%2Fbobaland%2Fundefined%2F2df7dfb4-4c64-4370-8e74-9ee30948f05d?alt=media&token=26b16bef-0fd2-47b5-b6df-6cf2799010ca',
            color: 'pink',
            description: 'A role for the owner.',
            permissions: [
              'create_ralm_invite',
              'post_on_realm',
              'comment_on_realm',
              'create_thread_on_realm',
              'access_locked_boards_on_realm',
            ],
            users: [
              {
                user_firebase_id: BOBATAN_USER_ID,
                username: 'bobatan',
                label: 'Look ma, a label'
              },
              { 
                user_firebase_id: SEXY_DADDY_USER_ID,
                username: 'SexyDaddy69',
                label: 'well earned'
              },
            ]
          },
          {
            role_name: 'GoreMaster5000',
            role_string_id: GOREMASTER_ROLE_EXTERNAL_ID,
            role_avatar: 'https://firebasestorage.googleapis.com/v0/b/bobaboard-fb.appspot.com/o/images%2Fbobaland%2Fc26e8ce9-a547-4ff4-9486-7a2faca4d873%2F6518df53-2031-4ac5-8d75-57a0051ed924?alt=media&token=23df54b7-297c-42ff-a0ea-b9862c9814f8',
            color: 'red',
            description: 'A role for people who can edit the gore board.',
            permissions: [
              'edit_board_details',
              'delete_baord',
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
              {
                user_firebase_id: ONCEST_USER_ID,
                username: 'oncest5evah',
                label: ''
              }
            ]
          },
        ]
      });
    });
  
    test("does not fetch realm roles without permissions", async () => {
      setLoggedInUser(BOBATAN_USER_ID);
      const res = await request(server.app).get(`/${UWU_REALM_EXTERNAL_ID}/roles`);
      expect(res.status).toBe(403);
      expect(res.body).toEqual({
        message: 'User does not have required permissions for realm operation.'
      });
    });
  });
