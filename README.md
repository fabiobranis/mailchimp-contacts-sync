# Mailchimp contact integration API

This is a repo to show off some design skills in TypeScript. The idea here is to show how I think about shared libs in a repo, exposing third party API's or clients whithout coupling the code in a way that when you need to change something the jobs is going to be harder.
For every class I have a function called builder, which is a builder and can be intepreted as a service provider, so whenever you need to import the class you can import the provider to build with the dependencies (you need to pass the arguments described in the interface).
The layers are simple and clear, with exported interfaces in order to simplify the use. 
The service is a delegator, inside the service we have the jobs and these jobs are intended to act like steps. The functions should be pure functions and pretty testable without a lot of mocks.
The idea here is, componentization can be clear and can help any kind of team to figure out properly when something breaks. Also, when you have more than one person working in something, if you break things like this you can define the interfaces in a way that you can paralelize work in a sprint without pain.

“Bad programmers worry about the code. Good programmers worry about data structures and their relationships.” - Linus Torvalds

When you design something proiperly, thinking about good encapsulation, testability, easy to track errors, task breaking and how to share the tasks properly with the team, you are on the right path to be suscessful, that's what I think.

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

- A node.js environment (16 or higher)
- npm
- If you like, Docker
- If you want to edit, VSCode (or something alike)

Env vars are:

- PORT -> The port number (defaults to 3000)
- LIST_ID -> List Id (your list id in mailchimp)
- CONTACTS_API_BASE_PATH -> The base path for the contacts API endpoint
- MAIL_MARKETING_API_KEY -> The mailchimp API Key
- MAIL_MARKETING_SERVER -> The mailchimp API server

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

Concerning the design approach, I've followed these principles:

- For each external lib (not for the logger because of the time) I created a proxy lib inside the project in the libs package.
- For each API which I don't have a SDK I have a client lib inside clients package.
- A parsers package to delivery functions capable to transform a Type into another
- A service layer where the service works as a delegator for the jobs, that are dependencies.
- A service jobs layer where the jobs execute specific tasks.
- We don't have controllers, since we don´t need that.

The approach is to be lean and well organized and the most decoupled.

This project is made in Typescript for a better understanding of the concepts of:

- Where I do need classes I have classes
- Where I do not need classes I have functions

Stateless components doesn't need to be classes, so I have functions in service and parsers layers.
Components where I do need a more explicit composition I've built as classes. These classes packages exports their types and a function builder.

Why the builders?

In order to prevent the need to import some IoC library, I choose to export these builders to make things easier.

You can see in the src/index.ts that I created the instances in the start time. So, basically I have the "singletons" instances ( I don't created the classes explicitly as Singletons) in all application lifecycle.

Also, in the index.ts file I have created the instances based on the env vars in a encapsulated function in order to avoid having these values explicitly loaded in the memory heap of the application.

![Sequence](design/sequence-diagram.png 'Sequence Diagram')

Above, the sequence diagram of the app.

## Error handling

This application have an Error middleware. I don't expose the errors and I write the stack in pino. The idea behind is to provide a layer capable to provide console logs and if needed, send logs to an application to monitor the app.

## Tests

The tests here are quite simple.
The approach is to use the interfaces design to create the tests before stating implementation. As we have the test cases we can implement the code do fullfil the desired implementation with the desired behavior.
