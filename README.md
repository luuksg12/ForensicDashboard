# Pre-requisites
Make sure you have docker and docker composed installed on the machine.
Software | Version | Check version (Ubuntu) 
--- | --- | --- 
Docker | 20.10.22 | docker --version
NodeJS | 16.12.0 | node --version
 
### Clone the repository and run docker.
```bash
git clone https://github.com/luuksg12/ForensicDashboard.git
cd ./TNO_Sim
docker-compose up -d

npm i local-cors-proxy

// localhost should be replaced by the host address of the 
// API. you can find a docker image for the API here:
// https://github.com/martijnlammers/TNO_Sim
npx lcp --proxyUrl http://localhost
```
### Go to application.
The application will be hosted on: 'http://localhost:3333'

