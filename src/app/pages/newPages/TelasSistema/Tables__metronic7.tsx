// import React from 'react';
// import { Field, Form, Formik } from 'formik';



// const Usuarios = () => (
//   <>

//     <Formik
//       initialValues={{ email: 'richard', firstName: '', lastName: '' }}
//       onSubmit={(values, actions) => {
//         console.log(values, null, 2)
//         actions.setSubmitting(false);
//       }}
//     >
//       {() => (
//         <Form>
//           <Field
//             type="email"
//             name="text"
//             placeholder="Email"
//           />

//           <Field
//             placeholder='Nome'
//             type='text'
//             name="email"

//           />
//           <button type="submit">Submit</button>
//         </Form>
//       )}
//     </Formik>


//   </>
// );

// export default Usuarios





// import React from "react";
// import { AlertDoc } from "../components/AlertDoc";


// const ExtratoRecebimento: React.FC = () => {


//   return (
//     <AlertDoc />


//   )
// }

// export default ExtratoRecebimento;


import * as React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

const ExtratoRecebimento = () => {
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="John" />

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
          />
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="password"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};



export default ExtratoRecebimento;