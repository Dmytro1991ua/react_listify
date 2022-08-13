import { FormikProps, useFormik } from 'formik';
import { ReactElement, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AppRoutes } from '../../app.enums';
import history from '../../services/history.service';
import SectionHeader from '../../shared/components/section-header/section-header';
import CreateShoppingListModal from './components/create-shopping-list-modal/create-shopping-list-modal';
import {
  CREATE_SHOPPING_LIST_FORM_INITIAL_VALUE,
  CREATE_SHOPPING_LIST_FORM_VALIDATION,
} from './components/create-shopping-list-modal/create-shopping-list-modal.schema';
import ShoppingList from './components/shopping-list/shopping-list';
import { CreateShoppingListFromInitialValues } from './shopping-lists.interfaces';

//TODO: Delete when the real data from server will be available
const MOCK_SHOPPING_LISTS: ShoppingList[] = [
  { id: uuidv4(), name: 'First Test List', currency: '$', shoppingListItems: [] },
  {
    id: uuidv4(),
    name: 'Second Test List',
    currency: '€',
    shoppingListItems: [
      {
        id: uuidv4(),
        name: 'Terra',
        category: { id: uuidv4(), iconName: 'Icon', isCustom: false, label: 'Cool Icon', value: 'Cool Icon' },
        quantity: 10,
        units: 'L',
        price: 10,
        isChecked: false,
      },
    ],
  },
];

const ShoppingLists = (): ReactElement => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isMenuOpened = Boolean(anchorElement);

  const formikInstance: FormikProps<CreateShoppingListFromInitialValues> =
    useFormik<CreateShoppingListFromInitialValues>({
      initialValues: CREATE_SHOPPING_LIST_FORM_INITIAL_VALUE,
      validationSchema: CREATE_SHOPPING_LIST_FORM_VALIDATION,
      onSubmit: (values, { resetForm }) => {
        handleFormSubmit(values);

        resetForm();
      },
    });

  function handleMenuOpen(event: React.MouseEvent<HTMLButtonElement>): void {
    setAnchorElement(event.currentTarget);
  }

  function handleMenuClose(): void {
    setAnchorElement(null);
  }

  function handleCardDoubleClick(shoppingListId: string): void {
    history.push(`${AppRoutes.ShoppingLists}/${shoppingListId}`);
  }

  function handleOpenModal(): void {
    setIsModalOpen(true);
  }

  function handleCloseModal(): void {
    setIsModalOpen(false);

    formikInstance.resetForm();
  }

  function handleFormSubmit(values: CreateShoppingListFromInitialValues): void {
    console.log(values);
    handleCloseModal();
  }

  return (
    <>
      <SectionHeader primaryBtnLabel='Add List' title='Shopping List' onClick={handleOpenModal} />
      {MOCK_SHOPPING_LISTS.map((list) => (
        <ShoppingList
          key={list.id}
          anchorElement={anchorElement}
          isMenuOpened={isMenuOpened}
          list={list}
          onDoubleClick={handleCardDoubleClick}
          onMenuClose={handleMenuClose}
          onMenuOpen={handleMenuOpen}
        />
      ))}
      <CreateShoppingListModal
        fullWidth
        formikInstance={formikInstance}
        open={isModalOpen}
        primaryBtnLabel='Submit'
        secondaryBtnLabel='Close'
        title='Create a List'
        onClose={handleCloseModal}
        onSubmit={formikInstance.submitForm}
      />
    </>
  );
};

export default ShoppingLists;
