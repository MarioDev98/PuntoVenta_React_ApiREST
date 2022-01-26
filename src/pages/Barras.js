import React from 'react';
import {Bar} from 'react-chartjs-2';

function Barras(){
   
        const data={
          labels: ["Enero", "Febrero","Marzo", "Abril", "Mayo"],
          datasets:[{
            label: "Ventas",
            backgroundColor: 'rgba(0,255,0,1)',
            boderColor: 'black',
            boderWidth:1,
            hoverBackgroundColor: 'rgba(0,255,0,0.2)',
            hoverBorderColor: '#FFFF00',
            data:[3200,8500,5000,7430]
          }]
        };
        const opciones={
          maintainAspectRatio:false,
          responsive:true
        }

      
     

    return(
    <div>
        <Bar data={data} options={opciones}/>
    </div>
    )
}
export default Barras;