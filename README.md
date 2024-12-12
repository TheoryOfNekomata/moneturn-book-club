# moneturn-book-club

## Requirements

-   nvm
-   Docker Desktop
-   Docker Compose
-   pnpm

## Setup

1.  Fill out the environment variables using the `.env.example` files that can be found in each package's root. Put
    these filled variables to a new file called `.env.docker` beside the corresponding `.env.example` file.
2.  Run Docker Compose:
    ```shell
    docker compose up
    ```
3.  Navigate to `localhost:3000`.

## Architecture

-   Each service in docker-compose has their relevant files put into their dedicated directories for composability.
-   The API routes in the frontend is almost a 1-to-1 reverse proxy to the backend API routes. Currently, only JSON data
    are passed through the proxy, but ideally other content types may be allowed (such as binary data, form data, etc.).
-   Each main dependency is pinned to a specific version to allow reproducibility of the builds.

## Reflections

-   The UI is made to be "functionally minimal", i.e. it does not aim to capture the look and feel of a product that
    might as well be hosted in production. However, reasonable implementations have been made to provide a better user
    experience. Also, accessibility concerns are factored in to the implementations of the frontend.
-   It is assumed that every action results in a "happy path" scenario. For the benefit of time, error handling is
    minimal.
-   Certain features are purposefully left in a WIP state in order to present a hypothetical vision of the service.

## Considerations

### How scalable is the backend?

> Essentially, the author and book modules are almost identical copies of their implementation. Should other domains
> exist in the service, it would be easy to use said modules for reference implementations.
> 
> The main configuration of the service's bootstrapping is clearly defined in the entrypoint. Should other dependencies
> be needed, it is clear to the future contributor to make such inclusions.

### How maintainable is the code
> The codebase is currently using as minimal dependencies as possible in order to address concerns of control and
> security. However, the code is implemented in such a way that other dependencies may be easily integrated.
> 
> The frontend follows the Atomic Design principles with the following associations:
> - atoms = React elements
> - molecules = React components that could be substituted for/correspond to a plain HTML element (such as TextInput is
>   an improved version of an HTML `<input type="text">`)
> - organisms = Collection of molecules that work together for a single purpose (such as forms)
> - templates = Essentially the layout of each page defined under /routes
> - pages = The actual pages being navigated and injected data from the API.

### Which library is used to interact with the database?
> The backend is using Prisma ORM in order to be flexible should other DBMS's be used instead of
> PostgreSQL. Prisma is a widely-supported technology that uses its custom syntax to define schemata supported in both
> relational and non-relational databases (such as CockroachDB and MongoDB).
> 
> Prisma is robust that it defines its own utilities to help manage the persistence easier, by minimizing the
> administration needed to set up data storage connections (such as setting up migrations, defining dialect-specific
> configurations).

## How DRY is the code?
> The code is defined to be reasonably repetitive in order to accommodate potential changes. While the author and book
> modules have essentially the same available functions, dedicated implementations have been made as they are different
> domains in the service.
> 
> The frontend component implementations also have duplicates in which it is prepared to be a composable component
> library. Being composable offers flexibility in adding behaviors.

## How testable is the code?
> In order to save time, only the backend offers tests. The tests are made to be able to inspect the service's behavior
> without having to run the service, which costs resources. The backend is using Vitest as its runner. The tests are
> written in a granular way to cover most cases, while having direct assertions to every nuance in the service.
