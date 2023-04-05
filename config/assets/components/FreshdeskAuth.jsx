const { useRef, useState, useEffect } = React;

const FreshdeskAuth = ({ authenticated }) => {
  const formRef = useRef(null);
  const languageRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [language, setLanguage] = useState(i18next.language);

  useEffect(() => {
    if (!languageRef) return;

    languageRef.current.addEventListener(
      "fwChange",
      ({ target: { value } }) => {
        setLanguage(value);
        i18next.changeLanguage(value);
      }
    );
  }, [languageRef]);

  useEffect(() => {
    setLanguage(i18next.language);
  }, [i18next.language]);

  useEffect(() => {
    languageRef.current.value =
      window.iparams.language || i18next.language.substr(0, 2);
    i18next.changeLanguage(languageRef.current.value);
    setLanguage(languageRef.current.value);
    formRef.current.initialValues = utils.getNotEmpty(window.iparams.auth);
    formRef.current.validate = onFormValidate;
  }, []);

  const onFormValidate = async (values) => {
    let result = {};
    if (!values.domain)
      result.domain = i18next.t("freshdeskAuth.domain.required");
    if (!values.apiKey)
      result.apiKey = i18next.t("freshdeskAuth.apiKey.required");
    return result;
  };

  const onFormSubmit = async (e) => {
    setSubmitting(true);
    try {
      const { values, isValid, errors } = await formRef.current.doSubmit(e);

      if (!isValid) return;

      await window.client.request.invokeTemplate("authenticate", {
        context: {
          domain: values.domain,
          apiKey: values.apiKey,
        },
      });

      window.iparams.language = values.language;
      window.iparams.auth = {
        domain: values.domain,
        apiKey: values.apiKey,
      };
      authenticated();
    } catch (error) {
      await formRef.current.setFieldErrors({
        domain: i18next.t("freshdeskAuth.domain.invalid"),
        apiKey: i18next.t("freshdeskAuth.apiKey.invalid"),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <fw-form ref={formRef} validate={onFormValidate}>
        <fw-form-control
          type="DROPDOWN"
          name="language"
          required
          label={i18next.t("freshdeskAuth.language.label")}
          id="language"
          disabled={submitting}
        >
          <fw-select ref={languageRef} name="language" id="language">
            <fw-select-option value="es">Español</fw-select-option>
            <fw-select-option value="pt">Português</fw-select-option>
            <fw-select-option value="en">English</fw-select-option>
          </fw-select>
        </fw-form-control>
        <fw-form-control
          type="TEXT"
          name="domain"
          placeholder={i18next.t("freshdeskAuth.domain.placeHolder")}
          required
          label={i18next.t("freshdeskAuth.domain.label")}
          id="domain"
          disabled={submitting}
        ></fw-form-control>
        <fw-form-control
          type="TEXT"
          name="apiKey"
          required
          label={i18next.t("freshdeskAuth.apiKey.label")}
          id="apiKey"
          disabled={submitting}
        ></fw-form-control>
      </fw-form>
      <fw-button
        onClick={onFormSubmit}
        loading={submitting}
        style={{ float: "right" }}
      >
        {i18next.t("freshdeskAuth.validate")}
      </fw-button>
    </div>
  );
};

window.FreshdeskAuth = FreshdeskAuth;
