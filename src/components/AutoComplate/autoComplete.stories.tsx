import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AutoComplete, DataSourceType } from "./autoComplete";

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

// 调用github user search接口
const handleGitHub = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`).then(res => res.json()).then(({items}) => {
    const formateItems = items.slice(0,10).map((item:any) => ({value:item.login,...item}))
    return formateItems
  })
}

// 自定义模板
const renderGithubOption = (item:DataSourceType<GitHubProps>) =>{
  return (
    <>
      <h4>name {item.login}</h4>
      <h4>url: {item.url}</h4>
    </>
  );
}

const Template: ComponentStory<typeof AutoComplete> = (args) => (
  <AutoComplete {...args} />
);

export const Default = Template.bind({});
Default.args = {
  fetchSuggestions: handleGitHub,
  placeholder:'默认样式的AutoComplete'
};

export const UserDefined = Template.bind({});
UserDefined.args = {
  placeholder:'用户自定义渲染模板',
  fetchSuggestions: handleGitHub,
  renderOption: renderGithubOption,
}
