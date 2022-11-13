# Listify

> Project Summary

##### Have you ever had a situation when you are going shopping or you just found an interesting food or drink recipy and definetely would like take a note, but you do not have any notepad or something like that at hand?. Oh boy, I believe you have encountered this kind of situation.

##### Well, there is good news for you. `Listify` is a smart application that helps you to keep track of your favorite food and drink recipes and ingredients in general. You will be able to create a grocery list, proceed to its details and there create a more detailed list of items you are finding interesting to keep an eye on

# Motivation

The main goal of this project is to keep practicing and improving skills, to make hands dirty in some new development frameworks, libraries, and tools, and eventually create some awesome and useful application

# Getting Started

> Step-by-step instructions on how to locally run the application

##### Clone down this repository via `HTTPS` ot `SSH`. You will need `node` and `npm` installed globally on your machine.

##### In order to run the application you will need to follow the next steps:

- ##### Run `npm ci` to install all project dependencies within `root` directory package.json as well as within `client` folder.
  ```
  npm ci
  ----
  cd client
  ----
  npm ci
  ```
- ##### In `root` directory run `npm run server` in order to run a server
  ```
  npm run server
  ```
- ##### In `client` folder run `npm run dev` in order to run the project itself
  ```
  npm run dev
  ```
- ##### The application will be available on `http://localhost:5500`

# Tools/libraries/frameworks used

> Client

##### This project was bootstrapped with a help of a new beast in the neighborhood - [Vite](https://github.com/vitejs/vite).

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

##### Example of binding store without `React dependency`.

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

# Features

> Detailed information about what features the application is rich of

##### The main features of `Listify` application are following:

- ##### User Authentication flow that consists of abilities to Sign-In via email/password and Google, Sign-Up via email/password and Google, Forgot password, Reset Password
- ##### Ability to create a shopping list with specific name and currency.
- ##### Ability to delete a specific shopping list.
- ##### Ability to see the total price of all items within a specific shopping list and information on how many items were purchased and how many need to be bought via tooltip.
- ##### Ability to create/update/delete a specific product item within a specific shopping list
- ##### Ability to select individual product item (selected item appears at the bottom of the list and is sorted by their name) or select all product items at once.
- ##### Ability to see all items that should be bought or have been already purchased based on selected product items within a widget.
- ##### Ability to create a copy of particular shopping list with all product items.
- ##### Ability to delete a particular shopping list with all product items.
- ##### Ability to update user name, picture, change password and apply some specific user preferences such as default currency or ability to calculate products price by their quantity within user's Profile, etc.

# Tests

> General information about aplication testing flow, coverage, tests running instructions etc.

##### The application uses the following testing libraries/frameworks:

- ##### [React Testing Library](https://github.com/testing-library/react-testing-library) for testing React components
- ##### [Vitest](https://github.com/vitest-dev/vitest) framework that allows closely work with [Vite](https://github.com/vitejs/vite) and acts as a substitute for [Jest](https://github.com/facebook/jest)

##### In order to run tests, you need to procced with following command within client directory:

```
cd client
----
npm run test
```

##### In order to check apllication's tests coverage, you need to procced with following command within client directory:

```
cd client
----
npm run coverage
```

##### In order to open Vitest testing interface in browser and run tests there, you need to procced with following command within client directory:

```
cd client
----
npm run test:ui
```

##### Example of Vitest browser interface

![screencapture-localhost-1666-vitest-2022-11-13-11_19_17](https://user-images.githubusercontent.com/61331410/201514746-09a5f937-8df1-4cee-aed0-2ffe6902e3a8.png)

##### Current application's test coverage

![screencapture-localhost-52791-client-coverage-index-html-2022-11-13-12_17_15 (1)](https://user-images.githubusercontent.com/61331410/201516846-6d34b17f-b7ae-44db-be2f-258ef7c703c4.png)
