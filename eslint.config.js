// eslint.config.js
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // Configuración recomendada para TypeScript
  ...tseslint.configs.recommended,

  // Configuración esencial para Vue 3
  ...pluginVue.configs["flat/essential"],

  // Objeto para tus reglas personalizadas
  {
    rules: {
      // Aquí puedes sobrescribir o añadir tus propias reglas.
      "vue/multi-word-component-names": "off",
    },
  },

  // La configuración de Prettier SIEMPRE debe ir al final
  // para que pueda desactivar las reglas de estilo de los otros plugins.
  eslintConfigPrettier,
];
