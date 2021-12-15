/*
 * @Author: shanzhilin
 * @Date: 2021-10-09 14:54:07
 * @LastEditors: shanzhilin
 * @LastEditTime: 2021-12-15 21:26:35
 */
import React, { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./style/index.scss";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import Menu from "./components/Menu/Menu";
import MenuItem from "./components/Menu/MenuItem";
import SubMenu from "./components/Menu/SubMenu";
import Icon from "./components/Icon/icon";
import Transition from "./components/Transition/transition";
import Input from "./components/Input/input";
import Upload from "./components/Upload/upload";

library.add(fas);

function App() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  useEffect(() => {
    // axios.get('https://jsonplaceholder.typicode.com/posts/1').then(resp =>{
    //   console.log(resp)
    // })
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        title: "lebalDesign",
        body: "woshihaoren",
        testId: "111",
      })
      .then((res) => {
        setTitle(res.data.title);
      });
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const uploadedFile = files[0];
      const formData = new FormData();
      formData.append(uploadedFile.name, uploadedFile);
      axios
        .post("https://jsonplaceholder.typicode.com/posts", {
          headers: {
            "Content-type": "multipart/form-data",
          },
          onUploadProgress: (e: any) => {
            let percentage = Math.round((e.loaded * 100) / e.total) || 0;
            console.log(percentage);
          },
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  // 返回promise 类型
  // const filePromise = (file: File) => {
  //   const newFile = new File([file],'new_name.psd',{type: file.type})
  //   return Promise.resolve(newFile)
  // }
    
  return (
    <div className="App">
      <header className="App-header">
        <h2>test:{title}</h2>

        <input type="file" name="myfile" onChange={handleChange} />

        <Upload
          onError={(res) => {
            console.log(res);
          }}
          onProgress={(p, r) => {
            console.log(p);
          }}
          // beforeUpload={filePromise}
          action="https://jsonplaceholder.typicode.com/posts"
        />
        <FontAwesomeIcon icon="check-square" />
      <Icon icon="coffee" size='10x'  theme="primary"/>
        <Menu
          defaultIndex='0'
          onSelect={(index) => {
            alert(index);
          }}
          mode="horizontal"
          defaultOpenSubmenus={['3']}
        >
          <MenuItem>coll pink</MenuItem>
          <MenuItem disabled>coll pink1</MenuItem>
          <MenuItem>coll pink2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>coll pink2</MenuItem>
            <MenuItem>coll pink3</MenuItem>
          </SubMenu>
        </Menu>
        <Button onClick={() => {setShow(!show)}}>toogle</Button>
        <Transition
          in={show}
          animation="zoom-in-left"
          addEndListener={() => {}}
          children={
            <div>
                <p>test1</p>
                <p>test2</p>
                <p>test3</p>
                <p>test4</p>
                <p>test5</p>
            </div>
          }
        
        />
         <Transition
          in={show}
          animation="zoom-in-left"
          wrapper
          addEndListener={() => {}}
          children={
            <Button size="lg" btnType="success">test</Button>
          }
        />
        <Input style={{width:'300px',top:'30px'}} 
          placeholder="默认输入框样式"
        />
        <Input disabled style={{width:'300px',top:'30px'}} 
          placeholder="禁用"
        />
        <Input icon="search"  style={{width:'300px',top:'30px'}} 
          placeholder="带icon"
        />
        <Input icon="search"  size="lg" style={{width:'300px',top:'30px'}} 
          placeholder="lg size"
        />
        <Input icon="search"  size="sm" style={{width:'300px',top:'30px'}} 
          placeholder="sm size"
        />
        <Input style={{width:'300px',top:'30px'}}  
          placeholder="前缀"
          prepand='http://'
          append=".com"
          size="lg"
          icon="search"
        />
       <Button autoFocus>普通</Button>
        <Button btnType="primary" size="lg" disabled>
          disabled
        </Button>
        <Button
          btnType="success"
          size="lg"
          onClick={() => {
            alert(111);
          }}
        >
          success
        </Button>
        <Button btnType="warning" size="lg">
          warning
        </Button>
        <Button btnType="info" size="lg">
          info
        </Button>
        <Button btnType="default" href="https://www.baidu.com">
          普通连接
        </Button>
        <Button btnType="link" href="https://www.baidu.com" disabled>
          禁用连接
        </Button>
      </header>
    </div>
  );
}

export default App;
