import { FormikProvider, FormikValues, useFormik } from 'formik';
import { ReactElement, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import FormikInput from '../../shared/components/input/formik-input/formik-input';
import Modal from '../../shared/components/modal/modal';
import FormikSelect from '../../shared/components/select/formik-select/formik-select';
import Select from '../../shared/components/select/general-select/general-select';
import { DropdownOption } from '../../shared/components/select/select.interfaces';
import Switch from '../../shared/components/switch/switch';

interface InitialValues {
  name: string;
  age: string;
}

const TestSchema: yup.SchemaOf<InitialValues> = yup.object().shape({
  name: yup.string().label('Name').required(),
  age: yup.string().label('Age').required(),
});

const TEST_OPTIONS: DropdownOption<string>[] = [
  { value: '10', label: 'Ten', id: uuidv4() },
  { value: '20', label: 'Twenty', id: uuidv4() },
  { value: '30', label: 'Thirty', id: uuidv4() },
];

const Test = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const [anotherOpen, setAnotherOpen] = useState(false);
  const [checked, setChecked] = useState(true);

  const [age, setAge] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
    } as InitialValues,
    validationSchema: TestSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);

      resetForm();
    },
  });

  function handleOpenModal(): void {
    setOpen(true);
  }

  function handleCloseModal(): void {
    setOpen(false);

    formik.resetForm();
  }

  function handleAnotherModalOpen(): void {
    setAnotherOpen(true);
  }

  function handleAnotherModalClose(): void {
    setAnotherOpen(false);
  }

  function handleSubmit(values: FormikValues): void {
    console.log(values);
    handleCloseModal();
  }

  function handleBasicModal(): void {
    console.log('Submitted');
    handleAnotherModalClose();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAge(event.target.value as string);
  }

  return (
    <div>
      <button onClick={handleOpenModal}>Click Here</button>
      <button onClick={handleAnotherModalOpen}>Another Modal</button>
      <Modal fullWidth open={open} title='Form' onClose={handleCloseModal} onSubmit={formik.submitForm}>
        {/** TODO: Here we use FormikProvider in order to use useFormik hook */}
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <FormikInput id='name' name='name' placeholder='Name' />
            <FormikSelect<string>
              fullWidth
              icon={IoMdArrowDropdown}
              label='Select Age'
              name='age'
              options={TEST_OPTIONS}
            />
          </form>
        </FormikProvider>
      </Modal>
      <Modal
        fullWidth
        open={anotherOpen}
        primaryBtnLabel='Delete'
        title='Second Form'
        onClose={handleAnotherModalClose}
        onSubmit={handleBasicModal}
      />
      <Switch checked={checked} size='small' onChange={(e) => setChecked(e.target.checked)} />
      <Select<string>
        fullWidth
        icon={IoMdArrowDropdown}
        label='Select Age'
        options={TEST_OPTIONS}
        value={age}
        onChange={handleChange}
      />
      ShoppingLists
    </div>
  );
};

export default Test;
