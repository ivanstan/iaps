import React from "react";
import styled from "styled-components";

const Table = styled.table`
  font-size: 12px;
  margin-top: 30px;
  
  tbody tr:nth-child(odd) {
    background: rgba(96, 125, 139, 0.5);
  }
`;

export class ClimatologyDetailsTable extends React.Component<any, any> {

  render() {
    const {value} = this.props.data

    return <>
      <Table>
        <thead>
        <tr>
          <th>{this.props.unit}</th>
          <th>Srednja vrednost</th>
          <th>Najverovatnija vrednost (medijana)</th>
          <th colSpan={2}>Najverovatniji opseg vrednosti</th>
          <th colSpan={2}>Mogući opseg vrednosti</th>
        </tr>
        <tr>
          <th/>
          <th/>
          <th/>
          <th>25. percentil</th>
          <th>75. percentil</th>
          <th>10. percentil</th>
          <th>90. percentil</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th>Januar</th>
          <td>{parseFloat(value['avg_jan']).toFixed(1)}</td>
          <td>{parseFloat(value['med_jan']).toFixed(1)}</td>
          <td>{parseFloat(value['p25_jan']).toFixed(1)}</td>
          <td>{parseFloat(value['p75_jan']).toFixed(1)}</td>
          <td>{parseFloat(value['p10_jan']).toFixed(1)}</td>
          <td>{parseFloat(value['p90_jan']).toFixed(1)}</td>
        </tr>
        <tr>
          <th>Februar</th>
          <td>{parseFloat(value['avg_feb']).toFixed(1)}</td>
          <td>{parseFloat(value['med_feb']).toFixed(1)}</td>
          <td>{parseFloat(value['p25_feb']).toFixed(1)}</td>
          <td>{parseFloat(value['p75_feb']).toFixed(1)}</td>
          <td>{parseFloat(value['p10_feb']).toFixed(1)}</td>
          <td>{parseFloat(value['p90_feb']).toFixed(1)}</td>
        </tr>
        <tr>
          <th>Mart</th>
          <td>{parseFloat(value['avg_mar']).toFixed(1)}</td>
          <td>{parseFloat(value['med_mar']).toFixed(1)}</td>
          <td>{parseFloat(value['p25_mar']).toFixed(1)}</td>
          <td>{parseFloat(value['p75_mar']).toFixed(1)}</td>
          <td>{parseFloat(value['p10_mar']).toFixed(1)}</td>
          <td>{parseFloat(value['p90_mar']).toFixed(1)}</td>
        </tr>
        <tr>
          <th>April</th>
          <td>{parseFloat(value['avg_apr']).toFixed(1)}</td>
          <td>{parseFloat(value['med_apr']).toFixed(1)}</td>
          <td>{parseFloat(value['p25_apr']).toFixed(1)}</td>
          <td>{parseFloat(value['p75_apr']).toFixed(1)}</td>
          <td>{parseFloat(value['p10_apr']).toFixed(1)}</td>
          <td>{parseFloat(value['p90_apr']).toFixed(1)}</td>
        </tr>
        <tr>
          <th>Maj</th>
          <td>{parseFloat(value['avg_may']).toFixed(1)}</td>
          <td>{parseFloat(value['med_may']).toFixed(1)}</td>
          <td>{parseFloat(value['p25_may']).toFixed(1)}</td>
          <td>{parseFloat(value['p75_may']).toFixed(1)}</td>
          <td>{parseFloat(value['p10_may']).toFixed(1)}</td>
          <td>{parseFloat(value['p90_may']).toFixed(1)}</td>
        </tr>
        <tr>
          <th>Jun</th>
          <td>{parseFloat(value['avg_jun']).toFixed(1)}</td>
          <td>{parseFloat(value['med_jun']).toFixed(1)}</td>
          <td>{parseFloat(value['p25_jun']).toFixed(1)}</td>
          <td>{parseFloat(value['p75_jun']).toFixed(1)}</td>
          <td>{parseFloat(value['p10_jun']).toFixed(1)}</td>
          <td>{parseFloat(value['p90_jun']).toFixed(1)}</td>
        </tr>
        <tr>
          <th>Jul</th>
          <td>{parseFloat(value['avg_jul']).toFixed(1)}</td>
          <td>{parseFloat(value['med_jul']).toFixed(1)}</td>
          <td>{parseFloat(value['p25_jul']).toFixed(1)}</td>
          <td>{parseFloat(value['p75_jul']).toFixed(1)}</td>
          <td>{parseFloat(value['p10_jul']).toFixed(1)}</td>
          <td>{parseFloat(value['p90_jul']).toFixed(1)}</td>
        </tr>
        <tr>
          <th>Avgust</th>
          <td>{parseFloat(value['avg_avg']).toFixed(1)}</td>
          <td>{parseFloat(value['med_avg']).toFixed(1)}</td>
          <td>{parseFloat(value['p25_avg']).toFixed(1)}</td>
          <td>{parseFloat(value['p75_avg']).toFixed(1)}</td>
          <td>{parseFloat(value['p10_avg']).toFixed(1)}</td>
          <td>{parseFloat(value['p90_avg']).toFixed(1)}</td>
        </tr>
        <tr>
          <th>Septembar</th>
          <td>{parseFloat(value['avg_sep']).toFixed(1)}</td>
          <td>{parseFloat(value['med_sep']).toFixed(1)}</td>
          <td>{parseFloat(value['p25_sep']).toFixed(1)}</td>
          <td>{parseFloat(value['p75_sep']).toFixed(1)}</td>
          <td>{parseFloat(value['p10_sep']).toFixed(1)}</td>
          <td>{parseFloat(value['p90_sep']).toFixed(1)}</td>
        </tr>
        <tr>
          <th>Oktobar</th>
          <td>{parseFloat(value['avg_oct']).toFixed(1)}</td>
          <td>{parseFloat(value['med_oct']).toFixed(1)}</td>
          <td>{parseFloat(value['p25_oct']).toFixed(1)}</td>
          <td>{parseFloat(value['p75_oct']).toFixed(1)}</td>
          <td>{parseFloat(value['p10_oct']).toFixed(1)}</td>
          <td>{parseFloat(value['p90_oct']).toFixed(1)}</td>
        </tr>
        <tr>
          <th>Novembar</th>
          <td>{parseFloat(value['avg_nov']).toFixed(1)}</td>
          <td>{parseFloat(value['med_nov']).toFixed(1)}</td>
          <td>{parseFloat(value['p25_nov']).toFixed(1)}</td>
          <td>{parseFloat(value['p75_nov']).toFixed(1)}</td>
          <td>{parseFloat(value['p10_nov']).toFixed(1)}</td>
          <td>{parseFloat(value['p90_nov']).toFixed(1)}</td>
        </tr>
        <tr>
          <th>Decembar</th>
          <td>{parseFloat(value['avg_dec']).toFixed(1)}</td>
          <td>{parseFloat(value['med_dec']).toFixed(1)}</td>
          <td>{parseFloat(value['p25_dec']).toFixed(1)}</td>
          <td>{parseFloat(value['p75_dec']).toFixed(1)}</td>
          <td>{parseFloat(value['p10_dec']).toFixed(1)}</td>
          <td>{parseFloat(value['p90_dec']).toFixed(1)}</td>
        </tr>
        <tr>
          <th>Vegetacija*</th>
          <td>{parseFloat(value['avg_vegetation']).toFixed(1)}</td>
          <td>{parseFloat(value['med_vegetation']).toFixed(1)}</td>
          <td>{parseFloat(value['p25_vegetation']).toFixed(1)}</td>
          <td>{parseFloat(value['p75_vegetation']).toFixed(1)}</td>
          <td>{parseFloat(value['p10_vegetation']).toFixed(1)}</td>
          <td>{parseFloat(value['p90_vegetation']).toFixed(1)}</td>
        </tr>
        <tr>
          <th>Godina</th>
          <td>{parseFloat(value['avg_year']).toFixed(1)}</td>
          <td>{parseFloat(value['med_year']).toFixed(1)}</td>
          <td>{parseFloat(value['p25_year']).toFixed(1)}</td>
          <td>{parseFloat(value['p75_year']).toFixed(1)}</td>
          <td>{parseFloat(value['p10_year']).toFixed(1)}</td>
          <td>{parseFloat(value['p90_year']).toFixed(1)}</td>
        </tr>
        </tbody>
      </Table>
      <small>* April - Oktobar</small>
    </>;
  }
}
