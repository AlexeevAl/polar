/* tslint:disable */
/* eslint-disable */
/**
 * Polar API
 * Read the docs at https://docs.polar.sh/api
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  Account,
  HTTPValidationError,
  ListResourceOrganization,
  ListResourceOrganizationCustomer,
  ListResourceOrganizationMember,
  NotPermitted,
  Organization,
  OrganizationBadgeSettingsRead,
  OrganizationBadgeSettingsUpdate,
  OrganizationCreate,
  OrganizationCustomerType,
  OrganizationSetAccount,
  OrganizationSortProperty,
  OrganizationStripePortalSession,
  OrganizationUpdate,
  ResourceNotFound,
} from '../models/index';

export interface OrganizationsApiCreateRequest {
    body: OrganizationCreate;
}

export interface OrganizationsApiCreateStripeCustomerPortalRequest {
    id: string;
}

export interface OrganizationsApiGetRequest {
    id: string;
}

export interface OrganizationsApiGetAccountRequest {
    id: string;
}

export interface OrganizationsApiGetBadgeSettingsRequest {
    id: string;
}

export interface OrganizationsApiListRequest {
    slug?: string;
    isMember?: boolean;
    page?: number;
    limit?: number;
    sorting?: Array<OrganizationSortProperty>;
}

export interface OrganizationsApiListOrganizationCustomersRequest {
    id: string;
    customerTypes?: Set<OrganizationCustomerType>;
    page?: number;
    limit?: number;
}

export interface OrganizationsApiMembersRequest {
    id: string | null;
}

export interface OrganizationsApiSetAccountRequest {
    id: string;
    body: OrganizationSetAccount;
}

export interface OrganizationsApiUpdateRequest {
    id: string;
    body: OrganizationUpdate;
}

export interface OrganizationsApiUpdateBadgeSettingsRequest {
    id: string;
    body: OrganizationBadgeSettingsUpdate;
}

/**
 * 
 */
export class OrganizationsApi extends runtime.BaseAPI {

    /**
     * Create an organization.
     * Create Organization
     */
    async createRaw(requestParameters: OrganizationsApiCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Organization>> {
        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling create().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/organizations/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['body'],
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Create an organization.
     * Create Organization
     */
    async create(requestParameters: OrganizationsApiCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Organization> {
        const response = await this.createRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create a new Stripe Customer session for a organization.
     * Create Stripe Customer Portal
     */
    async createStripeCustomerPortalRaw(requestParameters: OrganizationsApiCreateStripeCustomerPortalRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrganizationStripePortalSession>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling createStripeCustomerPortal().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/organizations/{id}/stripe_customer_portal`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Create a new Stripe Customer session for a organization.
     * Create Stripe Customer Portal
     */
    async createStripeCustomerPortal(requestParameters: OrganizationsApiCreateStripeCustomerPortalRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrganizationStripePortalSession> {
        const response = await this.createStripeCustomerPortalRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get an organization by ID.
     * Get Organization
     */
    async getRaw(requestParameters: OrganizationsApiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Organization>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling get().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/organizations/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Get an organization by ID.
     * Get Organization
     */
    async get(requestParameters: OrganizationsApiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Organization> {
        const response = await this.getRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get the account for an organization.
     * Get Organization Account
     */
    async getAccountRaw(requestParameters: OrganizationsApiGetAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Account>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getAccount().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/organizations/{id}/account`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Get the account for an organization.
     * Get Organization Account
     */
    async getAccount(requestParameters: OrganizationsApiGetAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Account> {
        const response = await this.getAccountRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get badge settings for an organization.
     * Get Badge Settings
     */
    async getBadgeSettingsRaw(requestParameters: OrganizationsApiGetBadgeSettingsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrganizationBadgeSettingsRead>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getBadgeSettings().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/organizations/{id}/badge_settings`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Get badge settings for an organization.
     * Get Badge Settings
     */
    async getBadgeSettings(requestParameters: OrganizationsApiGetBadgeSettingsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrganizationBadgeSettingsRead> {
        const response = await this.getBadgeSettingsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List organizations.
     * List Organizations
     */
    async listRaw(requestParameters: OrganizationsApiListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListResourceOrganization>> {
        const queryParameters: any = {};

        if (requestParameters['slug'] != null) {
            queryParameters['slug'] = requestParameters['slug'];
        }

        if (requestParameters['isMember'] != null) {
            queryParameters['is_member'] = requestParameters['isMember'];
        }

        if (requestParameters['page'] != null) {
            queryParameters['page'] = requestParameters['page'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['sorting'] != null) {
            queryParameters['sorting'] = requestParameters['sorting'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/organizations/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * List organizations.
     * List Organizations
     */
    async list(requestParameters: OrganizationsApiListRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListResourceOrganization> {
        const response = await this.listRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List organization customers.
     * List Organization Customers
     */
    async listOrganizationCustomersRaw(requestParameters: OrganizationsApiListOrganizationCustomersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListResourceOrganizationCustomer>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling listOrganizationCustomers().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['customerTypes'] != null) {
            queryParameters['customer_types'] = requestParameters['customerTypes'];
        }

        if (requestParameters['page'] != null) {
            queryParameters['page'] = requestParameters['page'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/organizations/{id}/customers`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * List organization customers.
     * List Organization Customers
     */
    async listOrganizationCustomers(requestParameters: OrganizationsApiListOrganizationCustomersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListResourceOrganizationCustomer> {
        const response = await this.listOrganizationCustomersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List members in an organization.
     * Members
     */
    async membersRaw(requestParameters: OrganizationsApiMembersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListResourceOrganizationMember>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling members().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/organizations/{id}/members`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * List members in an organization.
     * Members
     */
    async members(requestParameters: OrganizationsApiMembersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListResourceOrganizationMember> {
        const response = await this.membersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Set the account for an organization.
     * Set Organization Account
     */
    async setAccountRaw(requestParameters: OrganizationsApiSetAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Organization>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling setAccount().'
            );
        }

        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling setAccount().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/organizations/{id}/account`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['body'],
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Set the account for an organization.
     * Set Organization Account
     */
    async setAccount(requestParameters: OrganizationsApiSetAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Organization> {
        const response = await this.setAccountRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update an organization.
     * Update Organization
     */
    async updateRaw(requestParameters: OrganizationsApiUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Organization>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling update().'
            );
        }

        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling update().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/organizations/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['body'],
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Update an organization.
     * Update Organization
     */
    async update(requestParameters: OrganizationsApiUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Organization> {
        const response = await this.updateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update badge settings for an organization.
     * Update Badge Settings
     */
    async updateBadgeSettingsRaw(requestParameters: OrganizationsApiUpdateBadgeSettingsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Organization>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling updateBadgeSettings().'
            );
        }

        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling updateBadgeSettings().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/organizations/{id}/badge_settings`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['body'],
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Update badge settings for an organization.
     * Update Badge Settings
     */
    async updateBadgeSettings(requestParameters: OrganizationsApiUpdateBadgeSettingsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Organization> {
        const response = await this.updateBadgeSettingsRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
