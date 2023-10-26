# Assignment task from ThinkEasy.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Learn More

Generate gateways and OpenAPI Types:

```bash
npm generate:endpoints
# or
yarn generate:endpoints
```

# Architectural Decision Document

## Application Structure

I designed the architecture of the application with the primary goal of separating concerns, improving maintainability, and offering a consistent approach to data management. Here's a breakdown of my main decisions:

### **1. MVP Pattern**

I chose the MVP (Model-View-Presenter) pattern for several reasons:

- **Separation of Logic**: It enables a clear separation between the user interface (View), the connection between View and Model (Presenter), and the data and business logic (Model).
- **Testability**: Each component can be tested in isolation.
- **Flexibility**: It's easier to swap out or modify a single component without affecting the others.

### **2. Gateway**

I used the gateway as a bridge between the data sources (e.g., external APIs) and our application. I employed the Orval.js library as recommended to generate the gateways from OpenAPI schemas. Its main functions include:

- Fetching data.
- Transforming this data into Data Transfer Objects (DTOs).
- Passing the DTOs to the repositories.

### **3. [Repositories](https://martinfowler.com/eaaCatalog/repository.html)**

Repositories act as intermediaries between the data source (gateway) and the application logic. I designed them to:

- Hold all the business logic and state.
- Use the gateway to fetch and process data into the model.
- Pass the [Programmer Model](https://en.wikipedia.org/wiki/Programming_model) to Presenters.

### **4. Presenters**

The role of presenters in my design is to:

- Prepare the Programming model to be transformed into the View model.
- Handle formatting and client-side filtering.
- Ensure that the View only manages visual logic (colors, conditional rendering, operations with Next).

## Specific Page Considerations

- **Post page and Posts by User page**: I made these Server-Side Rendered (SSR), which means the repositories are stateless for these pages.
- **Auth State**: I decided to manage this exclusively through cookies. I found a need to create two instances of gateways for the server and client to handle both server and browser cookies properly.

- **Post's Repository**: This is stateful because posts require client-side filtering. I used Recoil.js, following the recommendation. Initially, I considered using React.Suspense for skeleton rendering. However, the Recoil API led me to use selectors which persist with a cache. This posed challenges, especially when adding new posts to ensure freshness, so I chose to use simple Recoil atoms to hold a state and conditionally show the skeleton on loading via local component state.

---

I appreciate the tasks and look forward to feedback, especially regarding the Orval.js library's dual-instance implementation and challenges faced with Recoil selectors' caching behavior.
