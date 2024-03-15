import axios from 'axios';
import ApiError from '../../../utils/api-error';
import UserRepository from '../user/user.util';
// import RoleRepositories from './roles';
// import { IRoles } from '../types/user';

const keycloakURL = process.env.KEYCLOAK_URL;
if (!keycloakURL) throw Error('Environment: KEYCLOAK_URL is not defined');
const keycloakRealm = process.env.KEYCLOAK_REALM;
if (!keycloakRealm) throw Error('Environment: KEYCLOAK_REALM is not defined');
const keycloakClientId = process.env.KEYCLOAK_CLIENTID;
if (!keycloakClientId) throw Error('Environment: KEYCLOAK_CLIENTID is not defined');
const idClient = process.env.KEYCLOAK_ID_OF_CLIENT;
if (!idClient) throw Error('Environment: KEYCLOAK_ID_OF_CLIENT is not defined');


export default class KeycloakApi {

    static loginAdmin = async (data: object) => {
        /*
            Calling Keycloak REST API to the "master" realm and clientID as "admin-cli"
            "master" realm and "admin-cli" client id is required to access the admin control of keycloak
          */
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${keycloakURL}/realms/${keycloakRealm}/protocol/openid-connect/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data,
        });
        return response.data;
    };

    static loginUser = async (data: object) => {
        /*
            Calling Keycloak REST API to the "master" realm and clientID as "admin-cli"
            "master" realm and "admin-cli" client id is required to access the admin control of keycloak
          */
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${keycloakURL}/realms/${keycloakRealm}/protocol/openid-connect/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data,
        });
        return response.data;
    };

    static fetchKeycloakUser = async (email: string, token: string) => {
        /*
            The code is making an HTTP GET request to a Keycloak server to retrieve information about
            a user with a specific email address.The request includes the user's email address
            as a query parameter and an authorization header. The response from the server will
            be stored in the `checkUser` variable.
         */
        const response = await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${keycloakURL}/admin/realms/${keycloakRealm}/users?email=${email}`,
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    };

    static assignRole = async (data: Array<object>, userId: string, token: string) => {
        /*
            The code is making a POST request to a Keycloak server to map a role to a user for a
          specific client. The request includes the user ID, client ID, and the role to be mapped. The
          request is authenticated using an authorization token passed in the headers. The response is
          stored in the `response` variable.
         */
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${keycloakURL}/admin/realms/${keycloakRealm}/users/${userId}/role-mappings/clients/${idClient}`,
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
            data,
        });

        return response;
    };

    static register = async (data: string, token: string) => {
        /*
            Calling the keycloak API to add new user
            While calling the Keycloak API we will require Admin Login Bearer Token
            which we will add in axios API Authorization header
          */
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${keycloakURL}/admin/realms/${keycloakRealm}/users`,
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
            data,
        });

        return response.data;
    };

    static fetchKeycloakRole = async (token: string) => {
        const getRole = await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${keycloakURL}/admin/realms/${keycloakRealm}/clients/${idClient}/roles`,
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });
        return getRole.data;
    };

    public static createRole = async (data: object, token: string) => {
        // This code is making a POST request to the Keycloak API to create a new role for a
        // client in a specific realm.
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${keycloakURL}/admin/realms/${keycloakRealm}/clients/${idClient}/roles`,
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
            data,
        });
        return response.data;
    };


}