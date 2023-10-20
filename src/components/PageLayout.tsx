import * as React from "react";
import Header, { HeaderProps } from "./Header";
import Footer from "./Footer";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/sites-components";
import {
  ChatHeadlessProvider,
  HeadlessConfig,
} from "@yext/chat-headless-react";
import { TemplateProps } from "@yext/pages";
import "@yext/chat-ui-react/bundle.css";

export interface PageLayoutProps {
  children?: React.ReactNode;
  headerProps: HeaderProps;
  templateData: TemplateProps;
}

const config: HeadlessConfig = {
  apiKey: YEXT_PUBLIC_YEXT_API_KEY,
  botId: "chat-bot",
};

const PageLayout = ({
  children,
  headerProps,
  templateData,
}: PageLayoutProps) => {
  return (
    <>
      <ChatHeadlessProvider config={config}>
        <AnalyticsProvider templateData={templateData}>
          <div className="min-h-screen">
            <AnalyticsScopeProvider name="header">
              <Header {...headerProps} />
            </AnalyticsScopeProvider>
            {children}
            <AnalyticsScopeProvider name="footer">
              <Footer />
            </AnalyticsScopeProvider>
          </div>
        </AnalyticsProvider>
      </ChatHeadlessProvider>
    </>
  );
};

export default PageLayout;
