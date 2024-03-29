# allure-reports-portal

![img](https://i.imgur.com/xpjU8MZ.png)

Simple allure reports server.

Host your allure reports for multiple projects on the same server.

## Dependencies

- nodejs
- npm

## How to use

create folder:

```bash
mkdir allure-reports-portal
```

clone project to allure-reports-portal folder:

```bash
git clone https://github.com/pumano/allure-reports-portal.git allure-reports-portal
```

navigate to allure-reports-portal folder:

```bash
cd allure-reports-portal/
```

### Docker way

build `Dockerfile` and use it

## Standalone way

install dependencies:

```bash
npm install
```

configure routes for server: (see `Config` section)

start web server

```bash
npm start
```

access via: `yourIPorDomainName:3000` usually locally it's `http://localhost:3000`

You can see all project's links.

## Config

1. add routes (links) to routes array in `config/default.json`:

```json
{
  "routes": ["project1", "project2", "project3"]
  ...
}
```

2. create folder inside `uploads` folder with same name as route:

- `uploads/project1`
- `uploads/project2`
- `uploads/project3`

3. upload all data from generated `allure-report` folder to that project's folder (possible via `scp` or similar).

**note: `uploads/project1/` should contain `index.html` and all files from `allure-report`**

```txt
uploads/
├── project1/
│   ├── index.html from allure-report folder
│   └── all other files and folders from allure-report folder
├── project2/
│   ├── index.html from allure-report folder
│   └── all other files and folders from allure-report folder
└── project3/
    ├── ...
    └── ...
```

**Server restarted after uploading and you can access to report via direct link:** `localhost:3000/project1` or `localhost:3000/project2` or `yourIPorDomainName:3000/project1` and etc

**note: webserver port is 3000 by default, and can be configured in `config/default.json` and if you use Docker, don't forget to change exposed port in Dockerfile  :**

```json
{
  ...
  "port": 3000
}
```

**note: also if you want to customize title of "Allure Reports Portal"**
![img](https://i.imgur.com/q3SmUFk.png)

**you can change settings in `config/default.json`**

```json
{
  ...
  "title": "Your_company_name reports portal"
}
```

## Allure reports with history trends

1. you should create `allure-results` folder inside your project's folder and copy files from **allure-result** folder to that folder after each CI result.

2. generate `allure-report` on the report server based on `allure-results` folder data and copy data from that `allure-report` folder to your project's folder.
