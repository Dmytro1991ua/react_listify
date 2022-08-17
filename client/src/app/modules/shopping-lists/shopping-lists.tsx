import { Box } from '@mui/system';
import { FormikProps, useFormik } from 'formik';
import { ReactElement, useState } from 'react';
import { Bars } from 'react-loader-spinner';

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
import { useShoppingListsStore } from './shopping-lists.store';

const ShoppingLists = (): ReactElement => {
  const createShoppingList = useShoppingListsStore((state) => state.createNewShoppingList);
  const shoppingList = useShoppingListsStore((state) => state.shoppingList);
  const isLoading = useShoppingListsStore((state) => state.shoppingListsLoadingStatus) === 'loading';

  const availableShoppingLists = useShoppingListsStore((state) => state.shoppingLists);

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

  async function handleFormSubmit(values: CreateShoppingListFromInitialValues): Promise<void> {
    try {
      const payload: ShoppingList = {
        ...shoppingList,
        name: values.name,
      };

      await createShoppingList(payload);
      handleCloseModal();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  const renderAvailableShoppingLists = (
    <>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Bars color='#1b5e20' height={120} width={120} />
        </Box>
      ) : (
        availableShoppingLists.map((list) => (
          <ShoppingList
            key={list._id}
            anchorElement={anchorElement}
            isMenuOpened={isMenuOpened}
            list={list}
            onDoubleClick={handleCardDoubleClick}
            onMenuClose={handleMenuClose}
            onMenuOpen={handleMenuOpen}
          />
        ))
      )}
    </>
  );

  return (
    <>
      <SectionHeader primaryBtnLabel='Add List' title='Shopping List' onClick={handleOpenModal} />
      {renderAvailableShoppingLists}
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
