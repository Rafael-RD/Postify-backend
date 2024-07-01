# Postify-backend

backend for a social media management solution.

## About

Postify is an web app that allows user to create and schedule post on multiple social medias, like Facebook, Instagram, Twitter e LinkedIn. 

## Requisits

Postgresql
NodeJs

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database with whatever name you want
4. Configure the `.env.development` file using the `.env.example` file (see "Running application locally or inside docker section" for details)
5. Run all migrations

```bash
npm run migration
```

## Run the back-end in a development environment:

```bash
npm start
```

## Building and starting for production

```bash
npm run build
npm run start:prod
```

## Endpoints

`GET /health`: check if server is up.

### Medias

`GET /medias`: get all social medias.
`GET /medias/{id}`: get social media by id.
`POST /medias`: create social media, body: { title: "title", username: "username" }.
`PUT /medias/{id}`: update social media by id, body: { title: "title", username: "username" }.
`DELETE /medias/{id}`: delete social media by id.

### Posts

`GET /posts`: get all posts.
`GET /posts/{id}`: get post by id.
`POST /posts`: create post, body: { title: "title", text: "text", image: "url" }.
`PUT /posts/{id}`: update post by id, body: { title: "title", text: "text", image: "url" }.
`DELETE /posts/{id}`: delete post by id.

### Publications

`GET /publications`: get all publications.
`GET /publications/{id}`: get publication by id.
`POST /publications`: create publication, body: { mediaId: "mediaId", postId: "postId", scheduledAt: "date" }.
`PUT /publications/{id}`: update publication by id, body: { mediaId: "mediaId", postId: "postId", scheduledAt: "date" }.
`DELETE /publications/{id}`: delete publication by id.
