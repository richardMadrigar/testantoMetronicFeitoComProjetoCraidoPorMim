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





import React from "react";
import { AlertDoc } from "../components/AlertDoc";


const ExtratoRecebimento: React.FC = () => {


  return (
    <AlertDoc />
  )
}

export default ExtratoRecebimento;



