# front-engine-cli 脚手架
> 支持从github，gitlab，gitee, 自定义(direct)中，clone项目到本地，作为自己的项目，进行开发

<img src="docs/fengine.gif" alt="temp-cli"  />

# 命令

``` bash
Usage:
  $ fengine <command> [options]

Commands:
  conf            cli  config
  create <name>  create app

For more info, run any command with the `--help` flag:
  $ fengine conf --help
  $ fengine create --help

Options:
  -v, --version  Display version number 
  -h, --help     Display this message 
```


## 配置
> 内置github，gitlab，gitee的配置

```
Usage:
  $ fengine conf

Options:
  -a, --add     add conf 
  -u, --update  update conf 
  -d, --delete  delete conf 
  -s, --show    show conf 
  -h, --help    Display this message 

```
<img src="docs/fengine-conf.gif" alt="temp-cli"  />

- name: 配置名称
- reposSource: 远端配置（github，gitlab，gitee，direct）
- ssh：ssh的地址，只有direct，才需要填写
- api: 请求组织，用户，仓库，分支，tag的信息api，比如github=> https:/github.com/
- token: 请求接口需要的token，暂时不需要
- options： 若是自定义，需要设置组织，用户，仓库，分支，tag的具体api地址
  比如（花括号的是动态变量，创建的时候会自动替换值，具体看下面）
  ``` json
  {
    orgRepos: "/api/v4/groups/{name}/projects",
    userRepos: "/api/v4/users/{name}/projects”,
    orgBranches:”/api/v4/projects/{id}/repository/branches”,
    userBranches:”/api/v4/projects/{id}/repository/branches”,
    orgTags:”/api/v4/projects/{id}/repository/tags”,
    userTags:”/api/v4/projects/{id}/repository/tags”
  }
  ```
  - 其中orgRepos与userRepos，有代替值
  ``` json
  {
    name:'组织名或用户名'
  }
  ```
  - 其中orgBranches与userBranches，有代替值
   ``` json
  {
    name:'组织名或用户名'，
    repo：'仓库名'，
    id：'仓库id'
  }
  ```
  - 其中orgTags与userTags，有代替值
  ``` json
  {
    name:'组织名或用户名'，
    repo：'仓库名'，
    id：'仓库id'
  }
  ```

## 创建 app
<img src="docs/fengine.gif" alt="temp-cli"  />

``` bash
Usage:
  $ fengine create <name>

Options:
  -h, --help  Display this message
```

- name: app名称
- description： 包描述
- conf: 选择配置
- installCommand； 安装依赖命令
- type： 组织或者用户
- group： 组织名或者用户名
- repos： 仓库名
- branchType：分支 还是 tag
- branch： 分支信息 还是 tag信息