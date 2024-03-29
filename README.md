# Listify

> Project Summary

##### Have you ever had a situation when you are going shopping or you just found an interesting food or drink recipe and definitely would like take a note, but you do not have any notepad or something like that at hand? Oh boy, I believe you have encountered this kind of situation.

##### Well, there is good news for you. `Listify` is a smart application that helps you keep track of your favorite food and drink recipes and ingredients in general. You will be able to create a grocery list, proceed to its details, and then create a more detailed list of items you find interesting to keep an eye on

# Motivation

The main goal of this project is to keep practicing and improving skills, to make hands dirty in some new development frameworks, libraries, and tools, and eventually create some awesome and useful application

# Getting Started

> Step-by-step instructions on how to locally run the application

##### 1) Clone down this repository via `HTTPS` or `SSH`. You will need `node` and `npm` installed globally on your machine.

##### 2) Create a `.env` file separately for `root` and `client` directories and set the following environment variables:
   > `env` file for `root` directory

    NODE_ENV=development
    PORT=8080
    MONGODB_URI="mongodb+srv://your_connection_with_mongoDB"
    FIREBASE_PROJECT_ID="your_firebase_project_id"
    FIREBASE_KEY_ID="your_firebase_key_id"
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY---your_key_id-----END PRIVATE KEY-----\n"
    FIREBASE_CLIENT_EMAIL="your_firebase_client_email"
    FIREBASE_CLIENT_ID="your_firebase_client_id"
    FIREBASE_AUTH_URI="your_firebase_auth_uri"
    FIREBASE_TOKEN_URI="your_firebase_token_uri"
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL="your_firebase_auth_provider_cert_url"
    FIREBASE_CLIENT_X509_CERT_URL="your_firebase_client_cert_url"
    
   > `env` file for `client` directory

   ```
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_AUTH_DOMAIN=yor_firebase_auth_domain
    VITE_PROJECT_ID=your_firebase_project_id
    VITE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_MESSAGING_SENDER_ID=your_firebase_sender_id
    VITE_MESSAGING_APP_ID=1:your_firebase_messaging_app_id
    VITE_API_BASE_URL=your_base_url
    VITE_NODE_ENV=development
   ```

##### 3) In order to run the application you will need to follow the next steps:

- ##### Run `npm run packages-install` in order to install all project dependencies within `root` directory package.json as well as within `client` folder.
  ```
  npm run packages-install
  ```
- ##### In `root` directory run `npm run server` in order to run a server
  ```
  npm run server
  ```
- ##### In `root` directory run `npm run client` in order to run the project itself
  ```
  npm run client
  ```
- ##### 4) The application will be available on `http://localhost:5500`

# Features

> Detailed information about what features the application is rich in

##### The main features of `Listify` application are the following:

- ##### User Authentication flow that consists of abilities to Sign-In via email/password and Google, Sign-Up via email/password and Google, Forgot password, Reset Password
- ##### Ability to create a shopping list with a specific name and currency.
- ##### Ability to edit a particular shopping list's name
- ##### Ability to delete a specific shopping list.
- ##### Ability to see the total price of all items within a specific shopping list and information on how many items were purchased and how many need to be bought via tooltip.
- ##### Ability to create/update/delete a specific product item within a specific shopping list
- ##### Ability to select individual product item (selected item appears at the bottom of the list and is sorted by their name) or select all product items at once.
- ##### Ability to delete all selected product items all together at once
- ##### Ability to see all items that should be bought or have been already purchased based on selected product items within a widget.
- ##### Ability to create a copy of a particular shopping list with all product items.
- ##### Ability to delete a particular shopping list with all product items.
- ##### Ability to update user name, picture, change password and apply some specific user preferences such as default currency or ability to calculate products price by their quantity within user's Profile
- ##### Ability to add to and remove a specific shopping list from favorites,
- ##### Ability to select all shopping lists for further deletion,
- ##### Ability to delete all selected shopping lists all together at once, etc.

# API

> General information about existing application's API endpoints

##### User (`/api/users`)

```
GET: /api/me - Creates a current, registered Firebase user in MongoDB or updates it.
```

Example of returned data:

![me](https://user-images.githubusercontent.com/61331410/201518161-f0b27883-57a3-4e3b-8bf2-c28deb039582.png)

```
POST: /api/users/profile - Updates User's information, such as name, picture, etc.
```

Example of returned data:

![profile](https://user-images.githubusercontent.com/61331410/201518366-477e88ec-c03b-45d9-b541-b8b9a2b04e44.png)

##### Shopping Lists (`/api/shopping-lists`)

```
GET: /api/shopping-lists - Gets all availble shopping lists from database

Example of returned data:

[
    {
        "_id": "63347da0b7fcd218f1024cab",
        "user": "qnjPpkmaWlUsCb5FqcbllcxYW7v1",
        "name": "Alex Smith",
        "currency": "₣",
        "shoppingListItems": [
            {
                "name": "New",
                "quantity": 2.5,
                "units": "L",
                "price": 14,
                "isChecked": true,
                "_id": "63347da9b7fcd218f1024cad",
                "updatedAt": "2022-11-10T18:22:46.639Z",
                "createdAt": "2022-11-10T18:22:45.299Z"
            },
            {
                "name": "Product-1",
                "quantity": 1,
                "units": "L",
                "price": 5,
                "isChecked": true,
                "_id": "6337f44583d311f66fb8b49e",
                "updatedAt": "2022-11-10T18:22:49.603Z",
                "createdAt": "2022-11-10T18:22:45.299Z"
            },
            {
                "name": "new Product-2",
                "quantity": 2,
                "units": "L",
                "price": 10,
                "isChecked": false,
                "_id": "633c708240ef8be1a1e502de",
                "updatedAt": "2022-11-10T18:23:06.310Z",
                "createdAt": "2022-11-10T18:22:45.299Z"
            }
        ],
        "createdAt": "2022-09-28T17:00:16.790Z",
        "updatedAt": "2022-11-10T18:23:06.310Z",
        "__v": 0
    },
]
```

```
POST: /api/shopping-lists - Creates a new shopping list
```

Example of returned data:

![new list](https://user-images.githubusercontent.com/61331410/201518710-e17c1b28-94f8-4cf9-8871-28804033db27.png)

```
DELETE: /api/shopping-lists/:id - Deletes a particular shopping list by its ID

Example of returned data:

"6370d06590f20bef1d2af00c" - id of deleted shopping list
```

```
PUT: /api/shopping-lists/select-all-shopping-lists - Selects all shopping lists for the further deletion
```

Example of returned data:
![Untitled](https://github.com/Dmytro1991ua/react_listify/assets/61331410/268099fd-5785-4a05-83f4-b52f23db6d77)

```
{
    "_id": "658166208bcf2cdf0c607ac4",
    "user": "Xhp3G87YBhaq29QWOWi0WYExxJp1",
    "name": "Terra Store",
    "currency": "$",
    "shoppingListItems": [],
    "isFavorite": false,
    "isChecked": true,
    "createdAt": "2023-12-19T09:45:04.269Z",
    "updatedAt": "2023-12-19T10:22:19.224Z",
    "__v": 0
}
```

```
PUT: /api/shopping-lists/delete-all-shopping-lists - Delete all selected shopping lists altogether at once
```

Example of returned data:
![Untitled_2](https://github.com/Dmytro1991ua/react_listify/assets/61331410/d812d1bf-f34f-45d6-8a00-4eeef8cf2370)

```
{
    "success": true,
    "message": "All shopping lists have been deleted successfully",
    "data": []
}
```

##### Shopping List Details (`/api/shopping-lists`)

```
PUT: /api/shopping-lists/:id/create-product-item - Creates a new product item within a specific shopping list
```

Example of returned data:

![new product item](https://user-images.githubusercontent.com/61331410/201519558-b563339f-1ff0-4856-b17e-92bcb9680365.png)

```
DELETE: /api/shopping-lists/:id/delete-product-item - Deletes a new product item within a specific shopping list
```

Example of returned data:

![delete product item](https://user-images.githubusercontent.com/61331410/201519727-fcb36cb9-6f97-4af1-9840-77d1d740e311.png)

```
PUT: /api/shopping-lists/:id/select-product-item - Selects a particular product item
```

Example of returned data:

![select product item](https://user-images.githubusercontent.com/61331410/201528293-8784d2ec-fd88-46b1-8226-30cb04e00838.png)

```
PUT: /api/shopping-lists/:id/edit-product-item - Updates a particular product item
```

Example of returned data:

![edit product item](https://user-images.githubusercontent.com/61331410/201528486-e8f95131-5eb8-46ef-925a-f8f34834ce8e.png)

```
PUT: /api/shopping-lists/:id/select-all-product-items - Selects all product items

Example of returned data:

[
  {
    name: 'Another test product',
    quantity: 0,
    units: '',
    price: 0,
    isChecked: true,
    _id: '6371071ac4722436c000cd23',
    updatedAt: '2022-11-13T15:07:18.123Z',
    createdAt: '2022-11-13T15:07:18.123Z'
  },
  {
    name: 'Updated product item',
    quantity: 2,
    units: 'L',
    price: 12,
    isChecked: true,
    _id: '6370d5a190f20bef1d2af03e',
    updatedAt: '2022-11-13T15:07:18.123Z',
    createdAt: '2022-11-13T15:07:18.123Z'
  }
]
```


```
PUT: /api/shopping-lists/:id/add-to-favorites - Adds to or remove a specific shopping-list from favorites
```

Example of returned data:

![example_1](https://github.com/Dmytro1991ua/react_listify/assets/61331410/0343eeb1-ef25-4848-a396-b1d935767bea)
```
{
    "_id": "656b2103c7ed1d8b57e15168",
    "user": "Xhp3G87YBhaq29QWOWi0WYExxJp1",
    "name": "Cosmopolitan Cocktail",
    "currency": "$",
    "shoppingListItems": [],
    "isFavorite": true,
    "createdAt": "2023-12-02T12:20:19.458Z",
    "updatedAt": "2023-12-02T12:41:48.016Z",
    "__v": 0
}
```

```
PUT: /api/shopping-lists/:id/edit-shopping-list - Edits a particular shopping list's name
```

Example of returned data:

![example_2](https://github.com/Dmytro1991ua/react_listify/assets/61331410/bade6569-89d2-4e61-91ba-882fec42f0e8)

```
{
    "_id": "656b20b9c7ed1d8b57e15166",
    "user": "Xhp3G87YBhaq29QWOWi0WYExxJp1",
    "name": "Shepherd's pie",
    "currency": "$",
    "shoppingListItems": [],
    "isFavorite": true,
    "createdAt": "2023-12-02T12:19:05.416Z",
    "updatedAt": "2023-12-02T12:47:52.872Z",
    "__v": 0
}
```

```
PUT: /api/shopping-lists/:id/select-all-product-items - Selects all product items
```

Example of returned data:

![Untitled_3](https://github.com/Dmytro1991ua/react_listify/assets/61331410/a0ec06e6-e2a6-4b52-9b9e-fbb9baf2540d)

```
{
    "_id": "6581760b8bcf2cdf0c607af0",
    "user": "Xhp3G87YBhaq29QWOWi0WYExxJp1",
    "name": "Terra store",
    "currency": "$",
    "shoppingListItems": [
        {
            "name": "Yogurt",
            "quantity": 1,
            "units": "L",
            "price": 2,
            "isChecked": true,
            "_id": "658176548bcf2cdf0c607af2",
            "createdAt": "2023-12-19T11:32:23.800Z",
            "updatedAt": "2023-12-19T11:32:23.800Z"
        },
        {
            "name": "Milk",
            "quantity": 1,
            "units": "L",
            "price": 4,
            "isChecked": true,
            "_id": "658176608bcf2cdf0c607af8",
            "createdAt": "2023-12-19T11:32:23.800Z",
            "updatedAt": "2023-12-19T11:32:23.800Z"
        }
    ],
    "isFavorite": false,
    "isChecked": false,
    "createdAt": "2023-12-19T10:52:59.489Z",
    "updatedAt": "2023-12-19T11:32:23.800Z",
    "__v": 0
}
```

```
PUT: /api/shopping-lists/:id/delete-all-product-items - Deletes all selected product items
```

Example of returned data:

![Untitled_4](https://github.com/Dmytro1991ua/react_listify/assets/61331410/ed1964c4-48c8-4a58-adf4-ea6c0d066457)

```
{
    "success": true,
    "message": "All product items have been deleted successfully",
    "data": {
        "_id": "6581760b8bcf2cdf0c607af0",
        "user": "Xhp3G87YBhaq29QWOWi0WYExxJp1",
        "name": "Terra store",
        "currency": "$",
        "shoppingListItems": [],
        "isFavorite": false,
        "isChecked": false,
        "createdAt": "2023-12-19T10:52:59.489Z",
        "updatedAt": "2023-12-19T11:37:09.763Z",
        "__v": 0
    }
}
```

# Products views

> Visual presentation of Listify application

##### Shopping lists/Shopping list details/Profile pages

 <div align="center">
    <img width="500" height="auto" src="https://user-images.githubusercontent.com/61331410/201646906-824da2cf-3962-4ccc-a7c5-5dbfd7336457.png" />
    <img width="500" height="auto" src="https://user-images.githubusercontent.com/61331410/201616611-625c3b81-51ba-409d-be66-a235057adab1.png" />
 </div>
 
  <div align="center">
    <img width="500" height="auto" src="https://user-images.githubusercontent.com/61331410/201618608-ef976ba6-25ab-465b-9378-5e7e56f4e155.png" />
    <img width="500" height="auto" src="https://github.com/Dmytro1991ua/react_listify/assets/61331410/7874af6e-ba48-4727-aa1f-cafa2659e96c" />
 </div>
 
  <div align="center">
    <img width="500" height="auto" src="https://github.com/Dmytro1991ua/react_listify/assets/61331410/c94b6928-2d83-4502-8cdf-d47c84256b8a" />
    <img width="500" height="auto" src="https://github.com/Dmytro1991ua/react_listify/assets/61331410/cfa69383-0095-4ba6-b8c3-8a959c30b4f3" />
 </div>

<div align="center">
    <img width="500" height="auto" src="https://github.com/Dmytro1991ua/react_listify/assets/61331410/46c0fdb2-5115-48e9-a230-aac668343f00" />
    <img width="500" height="auto" src="https://github.com/Dmytro1991ua/react_listify/assets/61331410/236feb02-a4bf-4242-a504-854188d9d202" />
 </div>

##### Sign-In/Sign-Up/Forgot-password/Reset-password pages

<div align="center">
    <img width="500" height="auto" src="https://user-images.githubusercontent.com/61331410/201619522-150df6bd-20ed-4b22-a672-0547709929c9.png" />
    <img width="500" height="auto" src="https://user-images.githubusercontent.com/61331410/201641691-ab1815b3-aa32-4083-8ab8-9dd226bc0215.png" />
</div>

<div align="center">
    <img width="500" height="auto" src="https://user-images.githubusercontent.com/61331410/201645833-c1d14d11-ed08-46b4-802c-58f307e6bfc7.png" />
    <img width="500" height="auto" src="https://user-images.githubusercontent.com/61331410/204141999-be2116d4-6ed5-4bb9-9a86-8cabc26f887f.png" />
</div>

##### Modals

<div align="center">
    <img width="500" height="auto" src="https://user-images.githubusercontent.com/61331410/201662823-8d820a0f-e758-4291-96a7-7d45a00bd1df.png" />
    <img width="500" height="auto" src="https://user-images.githubusercontent.com/61331410/201663277-dc964d1c-6061-4be1-a591-d261ec4d7727.png" />
    <img width="500" height="auto" src="https://user-images.githubusercontent.com/61331410/201664108-57d6d1a0-bb17-4988-ad1a-79cfd36b9348.png" />
    <img width="500" height="auto" src="https://user-images.githubusercontent.com/61331410/201664358-11f715b2-613d-4e58-8f79-7e96a7149c44.png" />
    <img width="500" height="auto" src="https://user-images.githubusercontent.com/61331410/201664358-11f715b2-613d-4e58-8f79-7e96a7149c44.png" />
    <img width="500" height="auto" src="https://user-images.githubusercontent.com/61331410/201664358-11f715b2-613d-4e58-8f79-7e96a7149c44.png" />
    <img width="500" height="auto" src="https://github.com/Dmytro1991ua/react_listify/assets/61331410/738ffa7a-8ced-4c95-86c5-2b06da51c3f7" />
    <img width="500" height="auto" src="https://github.com/Dmytro1991ua/react_listify/assets/61331410/2273345f-c399-478d-8d2b-31c04f9db408" />
    <img width="500" height="auto" src="https://github.com/Dmytro1991ua/react_listify/assets/61331410/a7223d3d-eca2-442e-aed4-fa9d79b47a80" />
</div>

# Tools/libraries/frameworks used

> Client

##### This project was bootstrapped with the help of a new beast in the neighborhood - [Vite](https://github.com/vitejs/vite).

### State Management

##### As for state management perspectives, the choice fell on [Zustand](https://github.com/pmndrs/zustand).

##### There is no global store within the application. Hence, particular modules have their own store configurations (`client/src/app/modules/shopping-lists/shopping-lists.store.ts`, `client/src/app/modules/aauth/auth.store.ts`, etc).

##### Example of store configuration

```
// create a store itself
export const useAuthStore = create<AuthStoreState & AuthStoreActions>()(
// devtools allows to create a Redux like Devtools in browser
  devtools(
  // set function allows to merges state
    (set) => ({
      ...initialState,
      setUser: (payload) => {
        return set((state) => ({ ...state, user: payload }), false, 'setUser');
      },
      setUserLoadingStatus: (payload) =>
        set((state) => ({ ...state, userLoadingStatus: payload }), false, 'setUserLoadingStatus'),
      setUpdateUser: (payload) => {
        return set(
          produce((state) => ({ user: { ...state.user, ...payload } })),
          false,
          'setUpdateUser'
        );
      },
      reset: () => set({ ...initialState, userLoadingStatus: 'idle' }, false, 'resetAuthStore'),
    }),
    { name: 'AuthStore' }
  )
);
```

##### Example of binding React component with the store

```
const Profile = (): ReactElement => {
  const user = useAuthStore((state) => state.user);

  return <h1>Hello {user.name}</h1>
}
```

##### Example of the binding store without `React dependency`.

```
export const validateUserAction = async (): Promise<void> => {
  const setUser = useAuthStore.getState().setUser;

  // the rest of the code
};
```

### React UI component library

##### For the sake of simplicity, speeding up the application development and for more practice perspectives, the [Material UI](https://github.com/mui/material-ui) library was chosen

### Forms

##### The application uses:

- ##### [Formik](https://formik.org/docs/overview) for forms management.
- ##### The 3rd-party binding [Formik-Mui](https://stackworx.github.io/formik-mui/) for Material UI components.
- ##### [Yup](https://formik.org/docs/guides/validation#validationschema) for forms validation

##### Example of Formik usage

```
interface AuthSignInFormProps {
  initialValues: SignInFormInitialValues;
  validationSchema: SchemaOf<SignInFormInitialValues, never>;
  onSubmit: (values: SignInFormInitialValues, actions: FormikHelpers<SignInFormInitialValues>) => Promise<void>;
}

const SignInForm = ({ initialValues, validationSema, onSubmit }: AuthSignInFormProps): ReactElement => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={dtFormikExampleValidationSchema}>
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field component={TextField} name='email' type='email' label='Email' />
          <Field component={TextField} type='password' label='Password' name='password' />
          <Button variant='contained' color='primary' disabled={isSubmitting} onClick={submitForm}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

```

### Notifications

##### The application uses:

- ##### [React-Toastify](https://fkhadra.github.io/react-toastify/introduction) for displaying any notification messages on UI

#### Usage:

- ##### In order to start using `react-toastify` just import `toastService` from `client/src/services/toast.service.ts` and then call needed method

```
toastService.success("Success message");
toastService.info("Info message");
toastService.warn("Warn message");
toastService.error("Error message");

```

### Authentication flow

##### Aplication users [Firebase](https://github.com/firebase/) flow, because it provides a wide range of useful methods to deal with user authentication

### Icons

##### Aplication uses [React Icons](https://react-icons.github.io/react-icons/)throughout different parts of the application.

### Loader Spinner

##### Aplication uses [React Loader Spinner](https://github.com/mhnpd/react-loader-spinner) package

# Tests

> General information about application testing flow, coverage, tests running instructions, etc.

##### The application uses the following testing libraries/frameworks:

- ##### [React Testing Library](https://github.com/testing-library/react-testing-library) for testing React components
- ##### [Vitest](https://github.com/vitest-dev/vitest) framework that allows closely work with [Vite](https://github.com/vitejs/vite) and acts as a substitute for [Jest](https://github.com/facebook/jest)

##### In order to run tests, you need to proceed with the following command within the client directory:

```
cd client
----
npm run test
```

##### In order to check application's tests coverage, you need to proceed with the following command within the `client` directory:

```
cd client
----
npm run coverage
```

##### In order to open Vitest testing interface in the browser and run tests there, you need to proceed with the following command within the `client` directory:

```
cd client
----
npm run test:ui
```

##### Example of Vitest browser interface

![screencapture-localhost-1666-vitest-2022-11-13-11_19_17](https://user-images.githubusercontent.com/61331410/201514746-09a5f937-8df1-4cee-aed0-2ffe6902e3a8.png)

##### Current application's test coverage

![screencapture-localhost-52791-client-coverage-index-html-2022-11-13-12_17_15 (1)](https://user-images.githubusercontent.com/61331410/201516846-6d34b17f-b7ae-44db-be2f-258ef7c703c4.png)
