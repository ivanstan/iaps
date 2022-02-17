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
          <th/>
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
          <td>{value['avg_jan']}</td>
          <td>{value['med_jan']}</td>
          <td>{value['p25_jan']}</td>
          <td>{value['p75_jan']}</td>
          <td>{value['p10_jan']}</td>
          <td>{value['p90_jan']}</td>
        </tr>
        <tr>
          <th>Februar</th>
          <td>{value['avg_feb']}</td>
          <td>{value['med_feb']}</td>
          <td>{value['p25_feb']}</td>
          <td>{value['p75_feb']}</td>
          <td>{value['p10_feb']}</td>
          <td>{value['p90_feb']}</td>
        </tr>
        <tr>
          <th>Mart</th>
          <td>{value['avg_mar']}</td>
          <td>{value['med_mar']}</td>
          <td>{value['p25_mar']}</td>
          <td>{value['p75_mar']}</td>
          <td>{value['p10_mar']}</td>
          <td>{value['p90_mar']}</td>
        </tr>
        <tr>
          <th>April</th>
          <td>{value['avg_apr']}</td>
          <td>{value['med_apr']}</td>
          <td>{value['p25_apr']}</td>
          <td>{value['p75_apr']}</td>
          <td>{value['p10_apr']}</td>
          <td>{value['p90_apr']}</td>
        </tr>
        <tr>
          <th>Maj</th>
          <td>{value['avg_may']}</td>
          <td>{value['med_may']}</td>
          <td>{value['p25_may']}</td>
          <td>{value['p75_may']}</td>
          <td>{value['p10_may']}</td>
          <td>{value['p90_may']}</td>
        </tr>
        <tr>
          <th>Jun</th>
          <td>{value['avg_jun']}</td>
          <td>{value['med_jun']}</td>
          <td>{value['p25_jun']}</td>
          <td>{value['p75_jun']}</td>
          <td>{value['p10_jun']}</td>
          <td>{value['p90_jun']}</td>
        </tr>
        <tr>
          <th>Jul</th>
          <td>{value['avg_jul']}</td>
          <td>{value['med_jul']}</td>
          <td>{value['p25_jul']}</td>
          <td>{value['p75_jul']}</td>
          <td>{value['p10_jul']}</td>
          <td>{value['p90_jul']}</td>
        </tr>
        <tr>
          <th>Avgust</th>
          <td>{value['avg_avg']}</td>
          <td>{value['med_avg']}</td>
          <td>{value['p25_avg']}</td>
          <td>{value['p75_avg']}</td>
          <td>{value['p10_avg']}</td>
          <td>{value['p90_avg']}</td>
        </tr>
        <tr>
          <th>Septembar</th>
          <td>{value['avg_sep']}</td>
          <td>{value['med_sep']}</td>
          <td>{value['p25_sep']}</td>
          <td>{value['p75_sep']}</td>
          <td>{value['p10_sep']}</td>
          <td>{value['p90_sep']}</td>
        </tr>
        <tr>
          <th>Oktobar</th>
          <td>{value['avg_oct']}</td>
          <td>{value['med_oct']}</td>
          <td>{value['p25_oct']}</td>
          <td>{value['p75_oct']}</td>
          <td>{value['p10_oct']}</td>
          <td>{value['p90_oct']}</td>
        </tr>
        <tr>
          <th>Novembar</th>
          <td>{value['avg_nov']}</td>
          <td>{value['med_nov']}</td>
          <td>{value['p25_nov']}</td>
          <td>{value['p75_nov']}</td>
          <td>{value['p10_nov']}</td>
          <td>{value['p90_nov']}</td>
        </tr>
        <tr>
          <th>Decembar</th>
          <td>{value['avg_dec']}</td>
          <td>{value['med_dec']}</td>
          <td>{value['p25_dec']}</td>
          <td>{value['p75_dec']}</td>
          <td>{value['p10_dec']}</td>
          <td>{value['p90_dec']}</td>
        </tr>
        <tr>
          <th>Vegetacija*</th>
          <td>{value['avg_vegetation']}</td>
          <td>{value['med_vegetation']}</td>
          <td>{value['p25_vegetation']}</td>
          <td>{value['p75_vegetation']}</td>
          <td>{value['p10_vegetation']}</td>
          <td>{value['p90_vegetation']}</td>
        </tr>
        <tr>
          <th>Godina</th>
          <td>{value['avg_year']}</td>
          <td>{value['med_year']}</td>
          <td>{value['p25_year']}</td>
          <td>{value['p75_year']}</td>
          <td>{value['p10_year']}</td>
          <td>{value['p90_year']}</td>
        </tr>
        </tbody>
      </Table>
      <small>* April - Oktobar</small>
    </>;
  }
}
