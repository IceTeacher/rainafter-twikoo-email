module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  proseWrap: 'never',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.ts,*.tsx',
    },
  ],
};
