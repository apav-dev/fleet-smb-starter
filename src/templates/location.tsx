import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import { isProduction } from "@yext/pages/util";
import "../index.css";
import Favicon from "../assets/images/yext-favicon.ico";
import About from "../components/About";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import Hours from "../components/Hours";
import PageLayout from "../components/PageLayout";
import Schema from "../components/Schema";
import ContactSection from "../components/ContactSection";
import SocialPostsGallery from "../components/SocialPostsGallery";
import Reviews from "../components/Reviews";

export const config: TemplateConfig = {
  stream: {
    $id: "Location",
    filter: {
      entityIds: [YEXT_PUBLIC_ENTITY_ID],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "logo",
      "services",
      "photoGallery",
      "paymentOptions",
      "emails",
      "yextDisplayCoordinate",
      // "c_backgroundColor",
    ],
    localization: { primary: true },

    transform: {
      replaceOptionValuesWithDisplayNames: [
        "paymentOptions",
        // "c_backgroundColor",
      ],
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
  relativePrefixToRoot,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
      {
        type: "meta", // Meta Tag (og:image)
        attributes: {
          property: "og:image",
          content: document.photoGallery
            ? document.photoGallery[0].image.url
            : null,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: relativePrefixToRoot + Favicon,
        },
      },
    ],
  };
};

const Location: Template<TemplateRenderProps> = ({
  __meta,
  relativePrefixToRoot,
  document,
}) => {
  const {
    id,
    name,
    address,
    hours,
    mainPhone,
    services,
    description,
    emails,
    logo,
    photoGallery,
    // c_backgroundColor,
  } = document;

  const data = { mainPhone, emails, logo };

  return (
    <>
      <Schema data={document} />
      <PageLayout data={data} templateData={{ __meta, document }}>
        <Banner name={name} photoGallery={photoGallery} />
        <About description={description} />
        {hours && <Hours title={"Hours"} hours={hours} />}
        <Carousel title={"Gallery"} photoGallery={photoGallery}></Carousel>
        <ContactSection address={address} phone={mainPhone} email={emails} />
        <Reviews entityId={id} />
        <SocialPostsGallery entityId={id} entityName={name} />
      </PageLayout>
    </>
  );
};

export default Location;
