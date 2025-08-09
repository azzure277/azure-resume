# Brandon's Azure Resume

![Azure](https://img.shields.io/badge/Azure-Functions-blue?logo=microsoftazure)
![.NET](https://img.shields.io/badge/.NET-8.0-purple?logo=dotnet)
![CosmosDB](https://img.shields.io/badge/Azure-CosmosDB-green?logo=microsoftazure)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-black?logo=githubactions)

## Overview
My personal resume website built with modern web technologies and deployed on Microsoft Azure. This project showcases my **Azure Cloud skills**, **serverless development**, and **DevOps practices**.

- **Frontend:** Static website (HTML, CSS, JS) hosted on **Azure Static Web Apps**  
- **Backend:** Serverless API with **C# Azure Functions** (isolated process, .NET 8.0)  
- **Database:** **Azure Cosmos DB (NoSQL)** stores and increments visitor counts  
- **CI/CD:** Automated deployments via **GitHub Actions**  
- **Security:** Uses `DefaultAzureCredential` for secure, keyless authentication  

---

## Live link
- **Resume Website:** [https://calm-wave-04f871d10.2.azurestaticapps.net](https://calm-wave-04f871d10.2.azurestaticapps.net)
- 

---

## Architecture
This is a serverless, cloud-native application that demonstrates:

1. **Visitor** opens the resume website  
2. The frontend calls the **Azure Function API** (`GetVisitorCount`)  
3. The function reads and increments the **visitor count** stored in Cosmos DB  
4. The updated count is returned and displayed dynamically on the site

## Technologies Used

### Frontend Stack
- **HTML5** - Semantic markup and structure
- **CSS3** - Responsive design with media queries
- **JavaScript (ES6+)** - Dynamic content and API integration
- **jQuery** - DOM manipulation and animations

### Design & UI
- **Font Awesome** - Icon library for social links
- **Responsive Design** - Mobile-first approach
- **CSS Grid & Flexbox** - Modern layout techniques

### Azure Services Integration
- **Azure Static Web Apps** - Hosting and deployment
- **Azure Functions** - Serverless API for visitor counter
- **Azure Cosmos DB** - Database for visitor count storage

## Project Structure

```
frontend/
├── index.html              # Main HTML file
├── main.js                 # Visitor counter JavaScript
├── README.md               # This file
├── favicon.png             # Website favicon
├── css/                    # Stylesheets
│   ├── default.css         # Main styles with Font Awesome
│   ├── layout.css          # Layout and grid styles
│   ├── media-queries.css   # Responsive breakpoints
│   ├── magnific-popup.css  # Popup modal styles
│   └── font-awesome/       # Font Awesome assets
├── js/                     # JavaScript libraries
│   ├── init.js             # Main initialization
│   ├── jquery-*.js         # jQuery libraries
│   └── *.js                # Additional plugins
└── images/                 # Image assets
    ├── me.png              # Profile picture
    └── *.png               # Other images
```

## Features

- **Dynamic Visitor Counter** - Real-time visitor tracking via Azure Functions
- **Fully Responsive** - Optimized for all device sizes
- **Modern Design** - Clean, professional layout
- **Fast Loading** - Optimized assets and CDN delivery
- **Social Integration** - Links to LinkedIn and GitHub profiles
- **Accessible** - Semantic HTML and ARIA labels

## Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, SEO)
- **Load Time**: < 2 seconds
- **Mobile Friendly**: Yes
- **SEO Optimized**: Meta tags and semantic HTML

## Deployment

This frontend is automatically deployed to Azure Static Web Apps via GitHub Actions CI/CD pipeline when changes are pushed to the main branch.

### Manual Deployment
```bash
# Build and deploy (if using Azure CLI)
az staticwebapp deploy --name your-app-name --source .
```

## Local Development

1. Clone the repository
```bash
git clone https://github.com/azzure277/azure-resume.git
cd azure-resume
```

2. Open `index.html` in your browser or use a local server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using Live Server (VS Code extension)
# Right-click index.html > "Open with Live Server"
```

## About Me

I'm Brandon, a Software Development Engineer and proud graduate of the Microsoft Software and Systems Academy. I specialize in:

- **Cloud-Native Development** on Microsoft Azure
- **Full-Stack Development** with modern frameworks
- **DevOps Practices** and CI/CD pipelines
- **Containerization** with Docker and Kubernetes

## Connect With Me

- **LinkedIn**: [brandon-govender-4a287b344](https://www.linkedin.com/in/brandon-govender-4a287b344/)
- **GitHub**: [azzure277](https://github.com/azzure277)

## License

This project is open source and available under the [MIT License](LICENSE).
