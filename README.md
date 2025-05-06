# Plot Management System
Manage your real estate sales and payments smoothly (frontend part).

[🎉Live Demo](https://acre-mate-frontend.vercel.app)

## 📜 Table Of Content
- About
- Features
- TechStack
- Installation
- Environment Variables
- Usage
- API Documentation
- Project Structure

## 📃 About
It is a frontend part of real-estate land management service. It manages apis for agents, clients, plots, sites (land area), slips (emis & payments).

## 🔧 Features

- Login/Registration Page
- Home Page (list of all plots with due EMI)
- Message to clients for due EMIs
- Single Item Page (details of single plot/client/EMI)
- Sites Page (list of all sites)
- Slips (list of all slips)
- Agents Page (all agent's sold area data)
- Single Site Page (details of single site and it's all plots)
- Site canvas chart
- Client EMI canvas chart
- Logout Page


## 🚀 Tech Stack (frontend part)

- **Frontend**: React + Typescript + Vite
- **Others**: React-Router-Dom, React-Hot-Toast, React-Icons

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/AcreMate-Frontend
cd AcreMate-Frontend

# client setup
cd client
npm install
# Create a .env file and add environment variables like given in bellow section:
npm run dev
```
## ⚙️ Environment Variables
```bash
VITE_SERVER_URL = YOUR-SERVER-URL # at which your server is runnig e.g http://localhost:8000/api/v1
```
## Frontend Pages Routing
- `/`            -> all due EMI clients list page
- `/agents`      -> all agents details page
- `/slips`       -> all slips list page
- `/sites`       -> all sites list page
- `/login`       -> login page
- `/register`    -> register page
- `/me`          -> logined user details page
- `/single-plot` -> single client/plot detail page
- `/single-site` -> single site details page
- `/create`      -> create client/plot/slip/site page

## Backend API Documentation
server-url : http://localhost:8000/api/v1

#### user related api endpoints
- (GET)  `/user/search`     -> for searching functionality
- (GET)  `/user/all-agents` -> for getting all agents name array
- (GET)  `/user/my-profile` -> for getting loggedin user details
- (GET)  `/user/sold-area`  -> for getting all agents details
- (POST) `/user/register`   -> for use registration
- (POST) `/user/login`      -> for use login
- (POST) `/user/logout`     -> for use logout

#### client related api endpoints
- (POST) `/client/create`       -> for create new client
- (POST) `/client/send-message` -> for sending message to client for due EMIs

#### plot related api endpoints
- (GET)  `/plot/all-plots`    -> for getting all plots
- (GET)  `/plot/pendings`     -> for getting all plots whose client have due EMIs
- (GET)  `/plot/single-plot`  -> for getting all details of a single plot
- (POST) `/plot/create-plots` -> for creating single or multiple new plots at a single time
- (POST) `/plot/assign`       -> for assigning vacant plot to client
- (POST) `/plot/reset`        -> for detaching a occupied plot from client and making it vacant

#### site related api endpoints
- (GET)    `/site/all-sites`   -> for getting all sites
- (GET)    `/site/single-site` -> for getting all details of a single site
- (GET)    `/site/sites-name`  -> for getting array of all siteName
- (POST)   `/site/create`      -> for creating a new site
- (PUT)    `/site/update`      -> for updating an existing site
- (PUT)    `/site/update-row`  -> for updating an existing site's row configurations
- (DELETE) `/site/reset-row`   -> for reseting an existing site's row configurations

#### slip related api endpoints
- (GET)  `/slip/all-slips` -> for finding all slips in a given range of slipNo
- (POST) `/slip/create`     -> for creating a new slip
- (PUT)  `/slip/update`     -> for updating an existing slip

## 📂 Project Structure (frontend)
```bash
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateFormPanel.tsx
│   │   │   ├── DataFlow.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── ListHeading.tsx
│   │   │   ├── ListItem.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── SearchComponent.tsx
│   │   │   └── Spinner.tsx
│   │   ├── pages/
│   │   │   ├── Agents.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── MyProfile.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── SinglePlot.tsx
│   │   │   ├── SingleSite.tsx
│   │   │   ├── Sites.tsx
│   │   │   └── Slips.tsx
│   │   ├── shared/
│   │   │   ├── SharedComponents.tsx
│   │   ├── styles/
│   │   │   ├── components/
│   │   │   │   ├── header.component.scss
│   │   │   │   ├── list_item.scss
│   │   │   │   ├── modal.scss
│   │   │   │   └── search_component.scss
│   │   │   ├── pages/
│   │   │   │   ├── agents.scss
│   │   │   │   ├── client.scss
│   │   │   │   ├── home.scss
│   │   │   │   ├── plots.scss
│   │   │   │   ├── register.scss
│   │   │   │   ├── single_item_page.scss
│   │   │   │   ├── sites.scss
│   │   │   │   ├── slips.scss
│   │   │   │   └── users.scss
│   │   │   ├── shared/
│   │   │   │   ├── list.scss
│   │   │   │   └── table.scss
│   │   │   ├── app.scss
│   │   │   ├── shared_components.scss
│   │   │   └── utils.scss
│   │   ├── utils/
│   │   │   ├── constants.ts
│   │   │   ├── hooks.ts
│   │   │   ├── types.ts
│   │   │   └── utilFunctions.ts
│   │   ├── App.tsx
│   │   ├── Context.tsx
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── .env
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.node.json
│   ├── vercel.json
│   ├── vite.config.ts
│   └── tsconfig.json
```

## 🙋‍♂️ Author
Gourav Kotnala
[PortFolio](https://gouravkotnala777.github.io/portfolio-1/)
[GitHub](https://github.com/GouravKotnala777)
[LinkedIn](https://www.linkedin.com/in/gourav-kotnala-003427295)

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
