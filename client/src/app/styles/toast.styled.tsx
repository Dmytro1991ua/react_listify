import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';

export const CustomToastContainer = styled(ToastContainer)`
  &.Toastify__toast-container {
    width: fit-content;
    min-width: 350px;
    padding: 0;
  }

  & .Toastify__toast {
    box-shadow: none;
  }

  & .Toastify__toast--info,
  & .Toastify__toast--success,
  & .Toastify__toast--warning,
  & .Toastify__toast--error {
    border-radius: 1.2rem;
    color: #000;
  }

  & .Toastify__toast--success {
    background-color: #e8f5e9;
    border: 2px solid #66bb6a;
  }

  & .Toastify__toast--info {
    background-color: #bbdefb;
    border: 2px solid #42a5f5;
  }

  & .Toastify__toast--warning {
    background-color: #ffe0b2;
    border: 2px solid #ffa726;
  }

  & .Toastify__toast--error {
    background-color: #ffcdd2;
    border: 2px solid #ef5350;
  }

  & .Toastify__close-button {
    align-self: center;
    color: #212121;
  }

  & .Toastify__close-button > svg {
    width: 2rem;
    height: 2.2rem;
  }
`;
