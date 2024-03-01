## Installation
1. Clone this repository.
2. Navigate to the `frontend` folder.
3. Run `npm install` or `yarn install` to install dependencies.
4. Navigate to the `backend` folder (if applicable).
5. Run `dotnet build` to build the backend (if applicable).

## Configuration
### Frontend
In order to run the frontend application properly, you need to set up an environment variable.
1. Create a `.env` file in the `frontend` folder.
2. Add the following key-value pair to the `.env` file, replacing `[YOUR_API_URL]` with your API URL:

VITE_API_URL='[YOUR_API_URL]/api/'

### Backend
In order to run the backend application properly, you need to add an `appsettings.json` file to the `backend` folder.
1. Create an `appsettings.json` file in the `backend` folder.
2. Add the following content to the `appsettings.json` file, replacing `[your_connection]` with your database connection string and `[your_secret]` with your JWT secret:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "CardManagerDbConnection": "[your_connection]"
  },
  "Jwt": {
    "Secret": "[your_secret]"
  }
}