import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import {GET_COUNTRIES,VIEW_COUNTRY} from '../queries';

const H3 = styled.h3`
  text-align: center;
  color: #b5a0a7; 
  font-weight: bold;
`;

const LoadData = styled.div`
  max-width: 1010px;
  padding: 26px 20px;
  width: 100%;
  align-items: center;
  margin: 0 auto;
`;

const Countries = (props) => {
    let countryCode = props.match.params.code;
    const getAllCountries = useQuery(GET_COUNTRIES);
    console.log("getAllCountries: ", getAllCountries);
    const getCountryInfo = useQuery(VIEW_COUNTRY, { variables: { code: countryCode}});
    if (getAllCountries.loading || getCountryInfo.loading) return <LoadData>loading...</LoadData>;
    let listCountries = [];
    if(countryCode){
        return (
            <LoadData>
                <p><b>Name</b>: {getCountryInfo.data.country.name}</p>
                <p><b>Currency</b>: {getCountryInfo.data.country.currency}</p>
                <p><b>Phone (Area code)</b>: {getCountryInfo.data.country.phone}</p>
            </LoadData>
        )
    } else{
        if(!getAllCountries.loading){
            listCountries = getAllCountries.data.countries.map((listValue, i) => {
                let spokenLanguage = [];
                if(listValue.languages.length === 0){
                    spokenLanguage.push("No language found")
                }
                listValue.languages.forEach((language)=>{
                    spokenLanguage.push(language.name)
                });
                return (
                    <tr key={i}>
                        <td><Link to={`/countries/${listValue.code}`} > {listValue.name} </Link></td>
                        <td>{JSON.stringify(spokenLanguage, null, 2)}</td>
                        <td>{listValue.continent.name}</td>
                    </tr>
                );
            });
        }
        return (
            <div>
                <H3>
                    Countries list
                </H3>

                <table align="center" style={{
                    border: "1px solid black"
                }}>
                    <thead>
                    <tr>
                        <th align="left">Country</th>
                        <th align="left">Language</th>
                        <th align="left">Continent</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listCountries}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default Countries;

