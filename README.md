# Mailchimp contact integration API

### _The best way to send contacts, to my list..._

## Where is this app?

[Here...](https://mailchimp-contact-integration.herokuapp.com/contacts/sync).

Be careful, that's the endpoint.

## About

This is the Mailchimp contacts sync API.
You just need to

- GET /contacts/sync

And you are going to have your answer back like:

```json
{
  "syncedContacts": 1, // total synced contacts
  "contacts": [
    {
      "firstName": "Name",
      "lastName": "Last",
      "email": "name@mail.com"
    }
  ]
}
```

## How to deal with it?

You are going to need:

- A node.js enviroment (16 or higher)
- npm
- If you like, Docker
- If you want to edit, VSCode (or something alike)

You need to:

- run `npm install` to install dependencies
- run `npm run test` to run the unit tests
- run `npm run build` to transform TS into JS
- run `npm start` to start the app locally (after building it)
- run `npm run dev` to start coding with live reload
- run `npm run prettier:format` if you don't use VSCode with prettier extension
- run `npm run lint` if you don't use VSCode with eslint extension
- run `npm run lint:fix` if you don't use VSCode with eslint extension
- To build Docker you can:

- run `make`

I suggest you to run docker using an env file in order to prevent that boring long scripts. You have a .env-example in the root of the project to help you.

## Design

![Components](design/component-diagram.png 'Components Diagram')

![Sequence](design/sequence-diagram.png'Sequence Diagram')
