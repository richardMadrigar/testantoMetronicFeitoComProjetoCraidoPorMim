import React from "react";
import { Formik, Field, Form } from 'formik';
import api from "../../../../setup/api";


import { AlertDoc } from "../components/AlertDoc";




const Usuarios: React.FC = () => {


  function onSubmit(values: any, actions: any) {
    console.log('SUBMIT', values);
  }



  async function onBlurCep(ev: any, setFieldValue: any) {

    const { value } = ev.target;

    const cep = value?.replace(/[^0-9]/g, '');

    if (cep?.length !== 8) {
      return;
    }

    await api.get(`/users/${460}`)
      .then((data) => {
        setFieldValue('logradouro', data.data.name);
        setFieldValue('bairro', data.data.cpf);
        setFieldValue('cidade', data.data.rg);
        setFieldValue('uf', data.data.whats);
      })
  }

  return (
    <div>

      <AlertDoc />

      <div className="App">
        <Formik
          onSubmit={onSubmit}

          initialValues={{
            cep: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            uf: '',
          }}


          render={({ isValid, setFieldValue }) => (

            <Form>

              <div className="form-control-group">
                <label>Cep</label>
                <Field name="cep" type="text" onBlur={(ev: any) => onBlurCep(ev, setFieldValue)} />
              </div>

              <div className="form-control-group">
                <label>Logradouro</label>
                <Field name="logradouro" type="text" />
              </div>

              <div className="form-control-group">
                <label>Número</label>
                <Field name="numero" type="text" />
              </div>

              <div className="form-control-group">
                <label>Complemento</label>
                <Field name="complemento" type="text" />
              </div>

              <div className="form-control-group">
                <label>bairro</label>
                <Field name="bairro" type="text" />
              </div>

              <div className="form-control-group">
                <label>Cidade</label>
                <Field name="cidade" type="text" />
              </div>





              <button type="submit" disabled={!isValid}>Enviar</button>


            </Form>
          )}
        />
      </div>


    </div>
  )
}

export default Usuarios
