import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AutoComplete, DataSourceType } from "./autoComplete";

interface LakerPlayerProps {
  value?: string;
  number?: number;
}

interface GitHubProps {
  login?:string,
  url?:string,
  avatar_url?:string
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
// 单个类型 触发方法
const handleFetch = (query: string) => {
  return lakers
    .filter((str) => str.includes(query))
    .map((item) => {
      return { value: item };
    });
};

// 复合类型数据结构触发方法
const handleFetchWithObject = (query: string) => {
  return lakerswithnumber.filter((palyer) => palyer.value.includes(query));
};

// 调用github user search接口
const handleGitHub = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`).then(res => res.json()).then(({items}) => {
    const formateItems = items.slice(0,10).map((item:any) => ({value:item.login,...item}))
    return formateItems
  })
}

// 自定义模板
const renderOption = (item: DataSourceType<LakerPlayerProps>) => {
  return (
    <>
      <h2>name {item.value}</h2>
      <p>number {item.number}</p>
    </>
  );
};

const renderGithubOption = (item:DataSourceType<GitHubProps>) =>{
  return (
    <>
      <h2>name {item.login}</h2>
      <p>url: {item.url}</p>
    </>
  );
}

const Template: ComponentStory<typeof AutoComplete> = (args) => (
  <AutoComplete {...args} />
);

export const Default = Template.bind({});
Default.args = {
  fetchSuggestions: handleGitHub,
  renderOption: renderGithubOption,
};
