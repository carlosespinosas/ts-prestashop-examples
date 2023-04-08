import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as xml2js from 'xml2js';

// Define la base URL para tu instancia de PrestaShop
const baseURL = 'https://vivescortada.pre-testing.com/api';

// Define la WS key para la autenticación
const wsKey = 'VPN4QJCW4C9MBP45SLPH8BF7UJTSA3F8';

// Define el ID del producto que se va a actualizar
const customerId = 23449;

// Define la configuración de la solicitud para la petición GET
const getConfig: AxiosRequestConfig = {
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${Buffer.from(`${wsKey}:`).toString('base64')}`
  }

};

// Realiza la solicitud GET para obtener los datos del producto existente
axios.get(`/customers/${customerId}`, getConfig)
  .then((response: AxiosResponse) => {

    xml2js.parseString(response.data, ( err, result) => {
      if (err) {
        console.error('Error al analizar la respuesta XML:', err);
        return;
      }

      const json = JSON.stringify(result)
      // console.log(json);

      // Obtiene los datos del producto existente

      const newcustomer = {
        firstname: 'HAVETTE',
        lastname: 'LUDIVINE'
      }

      let existingCustomerData = JSON.parse(json);
      existingCustomerData.prestashop.customer[0] = {
        ... existingCustomerData.prestashop.customer[0],
        ... newcustomer
      }

      // Actualiza los datos del Cliente
      const updatedPCustomerData = {
        ...existingCustomerData
      };

      const opciones : xml2js.BuilderOptions = {
        cdata: true,
        headless: true,
      };


      const builder = new xml2js.Builder( {cdata:true} ) ;
      const xml = builder.buildObject(updatedPCustomerData);

      console.log(xml);

      // Define la configuración de la solicitud para la petición PUT
      const putConfig: AxiosRequestConfig = {
        baseURL,
        headers: {
          'Content-Type':  'application/xml',
          'Authorization': `Basic ${Buffer.from(`${wsKey}:`).toString('base64')}`
        }
      };

      // Realiza la solicitud PUT para actualizar los datos del producto
      axios.put(`/customers/${customerId}`,  xml , putConfig)
        .then((response: AxiosResponse) => {
          console.log('Producto actualizado exitosamente:');
        })
        .catch((error: any) => {
          console.error('Error al actualizar el producto:', error);
        });

    })

  })
  .catch((error: any) => {
    console.error('Error al obtener los datos del producto existente:', error);
  });
