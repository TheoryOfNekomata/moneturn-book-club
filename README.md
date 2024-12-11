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
