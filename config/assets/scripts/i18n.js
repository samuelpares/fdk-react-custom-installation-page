i18next.use(i18nextBrowserLanguageDetector).init({
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        freshdeskAuth: {
          language: { label: "Language" },
          domain: {
            label: "Domain",
            placeHolder: "If your account is https://acme.frehdesk.com, enter acme",
            required: "Domain is required",
            invalid: "Domain or API key invalid"
          },
          apiKey: {
            label: "API key",
            required: "API key is required",
            invalid: "Domain or API key invalid"
          },
          validate: "Validate",

        }
      },
    },
    pt: {
      translation: {
        freshdeskAuth: {
          language: { label: "Idioma" },
          domain: {
            label: "Domínio",
            placeHolder: "Se o seu domínio é https://acme.frehdesk.com, digite acme",
            required: "O domínio é obrigatório",
            invalid: "O domínio ou a chave de API é inválida"
          },
          apiKey: {
            label: "Chave de API",
            required: "A chave de API é obrigatória",
            invalid: "O domínio ou a chave de API é inválida"
          },
          validate: "Validar",
        },

      },
    },
  },
});
