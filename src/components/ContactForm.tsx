import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { ContactDraft, Department } from "../types/contact";
import { DEPARTMENTS, departmentStyles } from "../lib/departments";
import { AlertIcon } from "./icons";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  department: Department | "";
};

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  department: "",
};

/** El email ya cargado se pasa por props para avisar antes de duplicar a alguien. */
function buildSchema(existingEmails: string[]) {
  return Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "El nombre necesita al menos 2 caracteres")
      .max(60, "El nombre no puede superar los 60 caracteres")
      .required("Escribí el nombre del contacto"),
    email: Yup.string()
      .trim()
      .email("El formato tiene que ser nombre@dominio.com")
      .required("Escribí un email")
      .test(
        "email-unico",
        "Ese email ya está en la lista",
        (value) => !value || !existingEmails.includes(value.trim().toLowerCase())
      ),
    phone: Yup.string()
      .trim()
      .matches(/^[0-9+()\s-]{7,20}$/, {
        message: "Usá números, espacios y los signos + ( ) -",
        excludeEmptyString: true,
      }),
    department: Yup.string()
      .oneOf(DEPARTMENTS, "Elegí uno de los departamentos")
      .required("Elegí un departamento"),
  });
}

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-muted focus:border-ink focus:outline-none";

const fieldErrorClass = "border-danger focus:border-danger";

function FieldError({ name }: { name: string }) {
  return (
    <ErrorMessage name={name}>
      {(message) => (
        <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-danger">
          <AlertIcon className="h-3.5 w-3.5 shrink-0" />
          {message}
        </p>
      )}
    </ErrorMessage>
  );
}

type Props = {
  existingEmails: string[];
  onSubmit: (draft: ContactDraft) => void;
  onCancel: () => void;
};

export function ContactForm({ existingEmails, onSubmit, onCancel }: Props) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={buildSchema(existingEmails)}
      validateOnMount
      onSubmit={(values) => {
        onSubmit({
          name: values.name.trim(),
          email: values.email.trim().toLowerCase(),
          phone: values.phone.trim() || undefined,
          department: values.department as Department,
        });
      }}
    >
      {({ values, errors, touched, isValid, setFieldValue, setFieldTouched }) => (
        <Form noValidate>
          <div className="space-y-5 px-6 py-6">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-[13px] font-semibold text-ink"
              >
                Nombre <span className="text-danger">*</span>
              </label>
              <Field
                id="name"
                name="name"
                placeholder="Martina Aguirre"
                autoComplete="name"
                className={`${fieldClass} ${
                  touched.name && errors.name ? fieldErrorClass : ""
                }`}
              />
              <FieldError name="name" />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-[13px] font-semibold text-ink"
              >
                Email <span className="text-danger">*</span>
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="martina@empresa.com"
                autoComplete="email"
                className={`${fieldClass} ${
                  touched.email && errors.email ? fieldErrorClass : ""
                }`}
              />
              <FieldError name="email" />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-[13px] font-semibold text-ink"
              >
                Teléfono{" "}
                <span className="font-normal text-muted">(opcional)</span>
              </label>
              <Field
                id="phone"
                name="phone"
                type="tel"
                placeholder="+54 261 415 8820"
                autoComplete="tel"
                className={`${fieldClass} font-mono ${
                  touched.phone && errors.phone ? fieldErrorClass : ""
                }`}
              />
              <FieldError name="phone" />
            </div>

            <div>
              <span className="mb-1.5 block text-[13px] font-semibold text-ink">
                Departamento <span className="text-danger">*</span>
              </span>
              <div
                role="radiogroup"
                aria-label="Departamento"
                className="flex flex-wrap gap-2"
              >
                {DEPARTMENTS.map((department) => {
                  const isOn = values.department === department;
                  return (
                    <label
                      key={department}
                      className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink ${
                        isOn
                          ? departmentStyles[department].chipOn
                          : "border-line bg-white text-muted hover:border-ink hover:text-ink"
                      }`}
                    >
                      <input
                        type="radio"
                        name="department"
                        value={department}
                        checked={isOn}
                        onChange={() => {
                          void setFieldValue("department", department);
                          void setFieldTouched("department", true, false);
                        }}
                        className="sr-only"
                      />
                      {department}
                    </label>
                  );
                })}
              </div>
              <FieldError name="department" />
            </div>
          </div>

          <footer className="flex flex-col-reverse gap-2 border-t border-line px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
            >
              Guardar contacto
            </button>
          </footer>
        </Form>
      )}
    </Formik>
  );
}
