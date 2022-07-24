import { ReactElement } from 'react';

import SectionHeader from '../../shared/components/section-header/section-header';
import { toastService } from './../../services/toast.service';

const ShoppingLists = (): ReactElement => {
  function handleAddNewShoppingList(): void {
    toastService.info('Not implemented yet');
  }

  return <SectionHeader primaryBtnLabel='Add List' title='Shopping List' onClick={handleAddNewShoppingList} />;
};

export default ShoppingLists;
