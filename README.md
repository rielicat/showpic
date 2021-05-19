## Instagram clone with CRA, Tailwind CSS and Firebase.
Based on a course from Freecodecamp's YouTube's Channel.

### [Live preview](https://instagram.pyscriptbug.com)

###### Create React App - https://es.reactjs.org/docs/create-a-new-react-app.html
###### Tailwind CSS - https://tailwindcss.com
###### Firebase - https://firebase.google.com

###### Link to course - https://www.youtube.com/watch?v=mDgEqoQUBgk

##### Requirements: #####
    Node.js v14.10.1

##### Recomended: #####
    pnpm 6.3.0 https://pnpm.io/

pnpm downloads packages and stores it in a local package container folder, then create symbolic links between projects in order to save space.

#### Scripts: ####
    `pnpm start` - compile styles for tailwind and start local instance
    `pnpm build` - compile styles then generate compiled project in build folder
    `pnpm init` - initialize Firebase and ask for configurations
    `pnpm init:hosting` - initialize Hosting configuration
    `pnpm emulate` - run emulators, must initialize Firebase first

How to start:

1) Clone Repository
2) Run `pnpm i`
3) Rename firebase.config-template.json to firebase.config.json
4) Replace values in firebase.config.json to your Firebase's config data.
