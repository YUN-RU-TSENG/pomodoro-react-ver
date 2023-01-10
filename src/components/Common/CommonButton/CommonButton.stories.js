import CommonButton from "./CommonButton.jsx";

export default {
  title: "Common/CommonButton",
  component: CommonButton,
};

export const Default = {
  args: { children: "button" },
};

export const Green = {
  args: { children: "button", color: "green" },
};

export const Full = {
  args: { children: "button", color: "green", type: "block" },
};
