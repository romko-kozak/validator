import type { Preview } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    actions: {},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: "color-contrast",
            enabled: true,
          },
        ],
      },
    },
    viewport: {
      defaultViewport: 'largeScreen',
      viewports: {
        largeScreen: {
          name: 'Large Screen',
          styles: {
            width: '1080px',
            height: '800px',
          },
        },
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
      },
    },
    docs: {
      toc: true,
      story: {
        inline: true,
      },
      canvas: {
        sourceState: "shown",
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#f8f9fa",
        },
        {
          name: "dark",
          value: "#212529",
        },
      ],
    },
    layout: "centered",
  },
};

export default preview;
