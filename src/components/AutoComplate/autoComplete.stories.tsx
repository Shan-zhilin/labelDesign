import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AutoComplete, DataSourceType } from "./autoComplete";

interface LakerPlayerProps {
  value?: string;
  number?: number;
}
export default {
  title: "AutoComplete",
  component: AutoComplete,
  argTypes: {
    onSelect: {
      action: "selected",
      description: "选择事件",
    },
  },
} as ComponentMeta<typeof AutoComplete>;

const lakers = [
  "bradley",
  "pope",
  "cook",
  "caruso",
  "cousins",
  "james",
  "AD",
  "green",
  "howard",
  "kuzma",
  "McGee",
  "rando",
];
const lakerswithnumber = [
  {
    value: "bradley",
    number: 1,
  },
  {
    value: "pope",
    number: 2,
  },
  {
    value: "cook",
    number: 3,
  },
  {
    value: "caruso",
    number: 4,
  },
  {
    value: "cousins",
    number: 5,
  },
  {
    value: "james",
    number: 6,
  },
  {
    value: "AD",
    number: 7,
  },
  {
    value: "green",
    number: 8,
  },
  {
    value: "howard",
    number: 9,
  },
  {
    value: "kuzma",
    number: 10,
  },
  {
    value: "McGee",
    number: 11,
  },
  {
    value: "rando",
    number: 12,
  },
];
const handleFetch = (query: string) => {
  return lakers
    .filter((str) => str.includes(query))
    .map((item) => {
      return { value: item };
    });
};

const handleFetchWithObject = (query: string) => {
  return lakerswithnumber.filter((palyer) => palyer.value.includes(query));
};

const renderOption = (item: DataSourceType<LakerPlayerProps>) => {
  return (
    <>
      <h2>name {item.value}</h2>
      <p>number {item.number}</p>
    </>
  );
};

const Template: ComponentStory<typeof AutoComplete> = (args) => (
  <AutoComplete {...args} />
);

export const Default = Template.bind({});
Default.args = {
  fetchSuggestions: handleFetchWithObject,
  renderOption: renderOption,
};
