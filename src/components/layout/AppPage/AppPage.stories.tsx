import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";
import { IAuthProvider } from "@inube/iauth-react";
import { FlagProvider } from "@inubekit/inubekit";

import { AppPage } from ".";
import { AppProvider } from "@context/AppContext";
import {
  mockDataPortal,
  mockBusinessManagersData,
  mockBusinessUnitsData,
} from "./config";

const meta: Meta<typeof AppPage> = {
  title: "layout/AppPage",
  component: AppPage,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <IAuthProvider
          clientId="storybook-client"
          clientSecret="fake-secret"
          originatorId="storybook-origin"
          callbackUrl="http://localhost:6006"
          iAuthUrl="https://fake-iauth.inube.dev"
          serviceUrl="https://fake-service.inube.dev"
        >
          <FlagProvider>
            <AppProvider
              dataPortal={mockDataPortal}
              businessManagersData={mockBusinessManagersData}
              businessUnitsData={mockBusinessUnitsData}
            >
              <Story />
            </AppProvider>
          </FlagProvider>
        </IAuthProvider>
      </BrowserRouter>
    ),
  ],
};

export const Default = () => <AppPage />;

export default meta;
