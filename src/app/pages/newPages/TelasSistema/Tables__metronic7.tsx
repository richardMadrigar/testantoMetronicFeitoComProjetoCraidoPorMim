// import React from "react";
// import { AlertDoc } from "../components/AlertDoc";


// const ExtratoRecebimento: React.FC = () => {


//   return (
//     <AlertDoc />


//   )
// }

// export default ExtratoRecebimento;






import { useRef, useEffect, InputHTMLAttributes } from 'react'

import { useField, SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'

/**
 * This input component supports many <input> types, including:
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
 *
 * Don't use it with the type `submit` or `reset`; otherwise, bugs will occur.
 */

interface Props {
  name: string
  type?:
    | 'text'
    | 'number'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'month'
    | 'password'
    | 'time'
    | 'range'
    | 'search'
    | 'tel'
    | 'url'
    | 'week'
  label?: string
  value?: string
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & Props

function Input({ name, type, label, value, ...rest }: InputProps) {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  /**
   * If you add a value to the input, it will be considered the default
   * This is useful when you have a `<input type="hidden" />`
   *
   * You can also remove it and use the `initialData` or set dynamically.
   */
  const defaultInputValue = value || defaultValue

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, newValue) => {
        ref.current.value = newValue
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <div>
      <label htmlFor={fieldName}>{label}</label>

      <input
        type={type || 'text'}
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultInputValue}
        {...rest}
      />

      {error && <span>{error}</span>}
    </div>
  )
}

/**
 * Usage
 */

interface FormData {
  name: string
  color: string
  number: string
  secret: string
  email: string
  month: string
  telephone: string
  password: string
  time: string
  website: string
  week: string
  date: string
  meeting: string
  search: string
  range: string
}

export default function App() {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler<FormData> = data => {
    console.log(data)
  }

  return (
    
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Input label="Name" name="name" />
      <Input label="Choose a color" name="color" type="color" />
      <Input label="Choose a number" name="number" type="number" />
      <Input name="secret" type="hidden" value="teste" />
      <Input label="email" name="email" type="email"   value=""/>
      <Input label="Month" name="month" type="month" min="2020-09" />
      <Input
        label="Telephone"
        name="telephone"
        type="tel"
        placeholder="Ex: XX-XXXXX-XXXX"
        pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
      />
      <Input label="password" name="password" type="password" />
      <Input label="time" name="time" type="time" min="09:00" max="18:00" />
      <Input
        label="website"
        placeholder="https://example.com"
        pattern="https://.*"
        name="website"
        type="url"
      
      />
      <Input
        label="week"
        min="2021-W01"
        max="2021-W52"
        name="week"
        type="week"
      />
      <Input
        label="date"
        min="2021-01-01"
        max="2021-12-31"
        name="date"
        type="date"
      />
      <Input
        label="meeting-time"
        min="2020-06-07T00:00"
        max="2020-06-14T00:00"
        name="meeting"
        type="datetime-local"
      />
      <Input
        label="search"
        aria-label="Search through site content"
        name="search"
        type="search"
      />
      <Input type="range" name="volume" label="Volume" min="0" max="10" />

      <button type="submit">Submit</button>
    </Form>
  )
}
// // import React from "react";
// // import { AlertDoc } from "../components/AlertDoc";


// // const ExtratoRecebimento: React.FC = () => {


// //   return (
// //     <AlertDoc />


// //   )
// // }

// // export default ExtratoRecebimento;






// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from "yup";
// import clsx from "clsx";

// interface IFormInputs {
//   name: string
//   celular: string,
//   cpf: string,
//   cad: string,
//   rg: string,
//   whats: string,
//   agencia: string,
//   banco: string,
//   conta: string,
//   cep: string,
//   numero: string,
//   nascimento: string,
//   nitpis: string,
//   nomedamae: string,
//   pix: string,
//   senha: string,
//   confsenha: string


// }


// const registrationSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(3, "Quantidade de caracteres inválido")
//     .max(60, "Limite máximo de 60 caracteres")
//     .required('Esse campo é obrigatório'),
//   cad: Yup.string()
//     // .email('Formato de E-mail inválido')
//     .min(8, ' "Quantidade de caracteres inválido"')
//     .max(100, "Limite máximo de 100 caracteres")
//     .required('Esse campo é obrigatório'),
//   celular: Yup.string()
//     .min(8, "Quantidade de caracteres inválido")
//     .max(20, "Limite máximo de 20 caracteres")
//     .required('Esse campo é obrigatório'),
//   whats: Yup.string()
//     .min(8, "Quantidade de caracteres inválido")
//     .max(20, "Limite máximo de 20 caracteres")
//     .required('Esse campo é obrigatório'),
//   cpf: Yup.string()
//     .min(11, "Quantidade de caracteres inválido")
//     .max(11, "Limite máximo de 11 caracteres")
//     .required('Esse campo é obrigatório'),
//   rg: Yup.string()
//     .min(9, "Quantidade de caracteres inválido")
//     .max(9, "Limite máximo de 9 caracteres")
//     .required('Esse campo é obrigatório'),
//   pix: Yup.string()
//     .min(3, "Quantidade de caracteres inválido")
//     .max(30, 'Maximum 50 symbols')
//     .required('Esse campo é obrigatório'),
//   nascimento: Yup.string()
//     .min(3, "Quantidade de caracteres inválido")
//     .max(10, 'Maximum 50 symbols')
//     .required('Esse campo é obrigatório'),
//   nitpis: Yup.string()
//     .min(11, "Precisa ter 11 caracteres")
//     .max(11, "Limite máximo de 11 caracteres")
//     .required('Esse campo é obrigatório'),
//   nomedamae: Yup.string()
//     .min(3, "Quantidade de caracteres inválido")
//     .max(60, "Limite máximo de 60 caracteres")
//     .required('Esse campo é obrigatório'),
//   banco: Yup.string()
//     .min(2, "Quantidade de caracteres inválido")
//     .max(10, "Limite máximo de 3 caracteres")
//     .required('Esse campo é obrigatório'),
//   agencia: Yup.string()
//     .min(2, "Quantidade de caracteres inválido")
//     .max(10, "Limite máximo de 10 caracteres")
//     .required('Esse campo é obrigatório'),
//   conta: Yup.string()
//     .min(2, 'Minimum 8 symbols')
//     .max(15, "Limite máximo de 15 caracteres")
//     .required('Esse campo é obrigatório'),
//   cep: Yup.string()
//     .min(5, 'Minimum 8 symbols')
//     .max(15, "Limite máximo de 15 caracteres")
//     .required('Esse campo é obrigatório'),
//   numero: Yup.string()
//     .min(3, 'Minimum 8 symbols')
//     .max(6, "Limite máximo de 6 caracteres")
//     .required('Esse campo é obrigatório'),
//   senha: Yup.string()
//     .min(8, "Senha minima de 8 caracteres")
//     .max(20, "Limite máximo de 20 caracteres")
//     .required('Esse campo é obrigatório'),
//   confsenha: Yup.string()
//     .required('É necessário confimar a senha ')
//     .when('senha', {
//       is: (val: string) => (val && val.length > 0 ? true : false),
//       then: Yup.string().oneOf([Yup.ref('senha')], "Senha não corresponde"),
//     }),
// }).required();



// export default function ExtratoRecebimento() {


//   const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
//     resolver: yupResolver(registrationSchema)
//   });


//   const onSubmit = (data: IFormInputs) => {
//     console.log(data);
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>


//       <input {...register("name")} />
//       <p>{errors.name?.message}</p>

//       {/* <input {...register("cad")} /> */}
//       <p>{errors.cad?.message}</p>

//       <input type="submit" />


//       {/* begin::Form group Nome completo */}
//       <div className='fv-row '>
//         <label className='form-label fw-bolder text-dark fs-6'>Nome completo</label>
//         <input
//           placeholder='Nome'
//           type='text'
//           autoComplete='off'
//           {...register("name")}
//           className={clsx('form-control form-control-lg form-control-solid',
//             { 'is-invalid': errors.name && errors.name },
//             { 'is-valid': errors.name && !errors.name, }
//           )}
//         />

//         <p>{errors.name?.message}</p>
//       </div>
//       {/* end::Form group */}


//       {/* begin::Form group cad */}
//       <div className='fv-row mt-5'>
//         <label className='form-label fw-bolder text-dark fs-6'>cad</label>

//         <input
        
//           placeholder='cad'
//           {...register("cad")}
//           className={clsx('form-control form-control-lg form-control-solid',
//             { 'is-invalid': errors.cad && errors.cad },
//             { 'is-valid': errors.cad && !errors.cad, }
//           )}
//         />
//       </div>
//       {/* end::Form group */}



//       {/* begin::Form group Celular */}
//       <div className='row fv-row mt-5'>

//         <div className='col-xl-6 mb-5'>
//           <label className='class="form-label fw-bolder text-dark fs-6'>Celular</label>
//           <input
//             placeholder='Celular'
//             autoComplete='off'
//             {...register("celular")}
//             className={clsx('form-control form-control-lg form-control-solid',
//               { 'is-invalid': errors.celular && errors.celular, },
//               { 'is-valid': errors.celular && !errors.celular, }
//             )}
//           />
//         </div>

//         {/* begin::Form group Whatsapp */}
//         <div className='col-xl-6'>
//           <label className='class="form-label fw-bolder text-dark fs-6'>Whatsapp</label>
//           <input
//             placeholder='Whatsapp'
//             autoComplete='off'
//             {...register("whats")}
//             className={clsx('form-control form-control-lg form-control-solid',
//               { 'is-invalid': errors.whats && errors.whats, },
//               { 'is-valid': errors.whats && !errors.whats, }
//             )}
//           />
//         </div>

//       </div>
//       {/* end::Form group */}


//       {/* begin::Form group CPF */}
//       <div className='fv-row mt-5'>
//         <label className='form-label fw-bolder text-dark fs-6'>CPF</label>
//         <input
//           placeholder='CPF'
//           // autoComplete='off'
//           {...register("cpf")}
//           className={clsx(
//             'form-control form-control-lg form-control-solid',
//             { 'is-invalid': errors.cpf && errors.cpf },
//             { 'is-valid': errors.cpf && !errors.cpf, }
//           )}
//         />
//       </div>
//       {/* end::Form group */}


//       {/* begin::Form group RG */}
//       <div className='fv-row mt-4'>
//         <label className='form-label fw-bolder text-dark fs-6'>RG</label>
//         <input
//           placeholder='RG'
//           {...register("rg")}
//           className={clsx('form-control form-control-lg form-control-solid',
//             { 'is-invalid': errors.rg && errors.rg },
//             { 'is-valid': errors.rg && !errors.rg, }
//           )}
//         />
//       </div>
//       {/* end::Form group */}


//       {/* begin::Form group Data De nascimento */}
//       <div className='fv-row mt-4'>
//         <label className='form-label fw-bolder text-dark fs-6'>Data de nascimento</label>
//         <input
//           placeholder='Data de nascimento'
//           {...register("nascimento")}
//           className={clsx('form-control form-control-lg form-control-solid',
//             { 'is-invalid': errors.nascimento && errors.nascimento },
//             { 'is-valid': errors.nascimento && !errors.nascimento, }
//           )}
//         />
//       </div>
//       {/* end::Form group */}



//       <div className='fv-row mt-4'> {/* begin::Form group Pix */}
//         <label className='form-label fw-bolder text-dark fs-6'>Pix</label>
//         <input
//           placeholder='Pix'
//           {...register("pix")}
//           className={clsx('form-control form-control-lg form-control-solid',
//             { 'is-invalid': errors.pix && errors.pix },
//             { 'is-valid': errors.pix && !errors.pix, }
//           )}
//         />
//       </div> {/* end::Form group */}



//       <div className='fv-row mt-4'>   {/* begin::Form group Nit / Pis */}
//         <label className='form-label fw-bolder text-dark fs-6'>Nit / Pis</label>
//         <input
//           placeholder='Nit / Pis'
//           {...register("nitpis")}
//           className={clsx('form-control form-control-lg form-control-solid',
//             { 'is-invalid': errors.nitpis && errors.nitpis },
//             { 'is-valid': errors.nitpis && !errors.nitpis, }
//           )}
//         />
//       </div> {/* end::Form group */}



//       <div className='fv-row mt-4'>     {/* begin::Form group Nome da Mãe */}
//         <label className='form-label fw-bolder text-dark fs-6'>Nome da mãe</label>
//         <input
//           placeholder='Nome da mãe'
//           {...register("nomedamae")}
//           className={clsx('form-control form-control-lg form-control-solid',
//             { 'is-invalid': errors.nomedamae && errors.nomedamae },
//             { 'is-valid': errors.nomedamae && !errors.nomedamae, }
//           )}
//         />
//       </div>   {/* end::Form group */}



//       {/* begin::Form group Nome da Agência / Banco / Conta */}


//       <div className='row fv-row mt-5'>

//         <div className='col-xl-4 mb-5'>  {/* begin::Form group Banco */}
//           <label className='class="form-label fw-bolder text-dark fs-6'>Banco</label>
//           <input
//             placeholder='Banco'
//             {...register("banco")}
//             className={clsx(
//               'form-control form-control-lg form-control-solid',
//               { 'is-invalid': errors.banco && errors.banco, },
//               { 'is-valid': errors.banco && !errors.banco, }
//             )}
//           />
//         </div>


//         <div className='col-xl-4'>   {/* begin::Form group Agência */}
//           <label className='class="form-label fw-bolder text-dark fs-6'>Agência</label>
//           <input
//             placeholder='Agência'
//             {...register("agencia")}
//             className={clsx('form-control form-control-lg form-control-solid',
//               { 'is-invalid': errors.agencia && errors.agencia, },
//               { 'is-valid': errors.agencia && !errors.agencia, }
//             )}
//           />
//         </div>



//         <div className='col-xl-4'>    {/* begin::Form group Conta */}
//           <label className='class="form-label fw-bolder text-dark fs-6'>Conta</label>
//           <input
//             placeholder='Conta'
//             {...register("conta")}
//             className={clsx('form-control form-control-lg form-control-solid',
//               { 'is-invalid': errors.conta && errors.conta, },
//               { 'is-valid': errors.conta && !errors.conta, }
//             )}
//           />
//         </div>

//       </div>
//       {/* end::Form group */}




//       <div className='row fv-row mt-4'> {/* begin::Form group CEP */}

//         <div className='col-xl-6'>
//           <label className='class="form-label fw-bolder text-dark fs-6'>CEP</label>
//           <input
//             placeholder='CEP'
//             {...register("cep")}
//             className={clsx('form-control form-control-lg form-control-solid',
//               { 'is-invalid': errors.cep && errors.cep, },
//               { 'is-valid': errors.cep && !errors.cep, }
//             )}
//           />
//         </div>



//         <div className='col-xl-6'>    {/* begin::Form group Número */}
//           <label className='class="form-label fw-bolder text-dark fs-6'>Número</label>
//           <input
//             placeholder='Número'
//             {...register("numero")}
//             className={clsx('form-control form-control-lg form-control-solid',
//               { 'is-invalid': errors.numero && errors.numero, },
//               { 'is-valid': errors.numero && !errors.numero, }
//             )}
//           />
//         </div>
//       </div>    {/* end::Form group */}





//       <div className='mt-5 fv-row' data-kt-password-meter='true'>   {/* begin::Form group Senha */}
//         <div className='mb-1'>
//           <label className='form-label fw-bolder text-dark fs-6'>Senha</label>
//           <div className='position-relative mb-3'>
//             <input
//               type='password'
//               placeholder='Senha'
//               autoComplete='off'
//               {...register("senha")}
//               className={clsx('form-control form-control-lg form-control-solid',
//                 { 'is-invalid': errors.senha && errors.senha, },
//                 { 'is-valid': errors.senha && !errors.senha, }
//               )}
//             />
//           </div>
//         </div>
//       </div>  {/* end::Form group */}



//       <div className='fv-row mt-5 mb-10'>{/* begin::Form group Confirm password */}
//         <label className='form-label fw-bolder text-dark fs-6'>Confirmar senha</label>
//         <input
//           type='password'
//           placeholder='Confirmar senha'
//           autoComplete='off'
//           {...register("confsenha")}
//         // className={clsx('form-control form-control-lg form-control-solid',
//         //   { 'is-invalid': errors.confsenha && errors.confsenha, },
//         //   { 'is-valid': errors.confsenha && !errors.confsenha, }
//         // )}
//         />
//       </div>    {/* end::Form group */}






//     </form>
//   );
// }