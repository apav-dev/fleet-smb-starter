import * as React from "react";
import Header from "./Header";
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
import { ChatPanel, ChatPopUp } from "@yext/chat-ui-react";
import "@yext/chat-ui-react/bundle.css";

export interface PageLayoutProps {
  children?: React.ReactNode;
  data?: any;
  templateData: TemplateProps;
}

const config: HeadlessConfig = {
  apiKey: YEXT_PUBLIC_YEXT_API_KEY,
  botId: "chat-bot",
};

const PageLayout = ({ children, data, templateData }: PageLayoutProps) => {
  let backgroundColor;

  if (data.c_backgroundColor) {
    const transformedColor = data.c_backgroundColor
      .replace(/\s+/g, "")
      .toLowerCase();
    backgroundColor = `--backgroundColor: ${transformedColor}`;
  } else {
    backgroundColor = `--backgroundColor: white`;
  }

  return (
    <>
      <style>:root {`{${backgroundColor}}`}</style>
      <ChatHeadlessProvider config={config}>
        <AnalyticsProvider templateData={templateData}>
          <div className="min-h-screen">
            <AnalyticsScopeProvider name="header">
              <Header data={data} />
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
