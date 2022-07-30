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

  declare module '@mui/material/styles/createMixins' {
    interface Mixins {
      commonBoxShadowMixin: CSSProperties;
      buttonBoxShadowMixin: CSSProperties;
      transparentButtonShadowMixin: CSSProperties;
      switcherBoxShadowMixin: CSSProperties;
      formBoxShadowMixin: CSSProperties;
      textInputCommonStylesMixin: (theme: Theme) => CSSObject;
      textInputCommonErrorsStylesMixin: (theme: Theme) => CSSObject;
    }
  }
}
