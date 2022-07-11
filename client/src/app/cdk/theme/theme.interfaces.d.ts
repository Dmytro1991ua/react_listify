declare global {
  declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
      primaryContained: true;
      secondaryContained: true;
      primaryOutlined: true;
      secondaryOutlined: true;
      transparent: true;
      raised: true;
    }
  }
}
