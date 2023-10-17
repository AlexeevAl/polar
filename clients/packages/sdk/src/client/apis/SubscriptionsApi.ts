/* tslint:disable */
/* eslint-disable */
/**
 * Polar API
 *  Welcome to the **Polar API** for [polar.sh](https://polar.sh).  The Public API is currently a [work in progress](https://github.com/polarsource/polar/issues/834) and is in active development. 🚀  #### Authentication  Use a [Personal Access Token](https://polar.sh/settings) and send it in the `Authorization` header on the format `Bearer [YOUR_TOKEN]`.  #### Feedback  If you have any feedback or comments, reach out in the [Polar API-issue](https://github.com/polarsource/polar/issues/834), or reach out on the Polar Discord server.  We\'d love to see what you\'ve built with the API and to get your thoughts on how we can make the API better!  #### Connecting  The Polar API is online at `https://api.polar.sh`. 
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
  HTTPValidationError,
  ListResourceSubscriptionGroup,
  Platforms,
  SubscribeSession,
  SubscribeSessionCreate,
  SubscriptionGroup,
  SubscriptionGroupCreate,
  SubscriptionGroupUpdate,
  SubscriptionTier,
  SubscriptionTierCreate,
  SubscriptionTierUpdate,
} from '../models/index';

export interface SubscriptionsApiArchiveSubscriptionTierRequest {
    id: string;
}

export interface SubscriptionsApiCreateSubscribeSessionRequest {
    subscribeSessionCreate: SubscribeSessionCreate;
}

export interface SubscriptionsApiCreateSubscriptionGroupRequest {
    subscriptionGroupCreate: SubscriptionGroupCreate;
}

export interface SubscriptionsApiCreateSubscriptionTierRequest {
    subscriptionTierCreate: SubscriptionTierCreate;
}

export interface SubscriptionsApiGetSubscribeSessionRequest {
    id: string;
}

export interface SubscriptionsApiSearchSubscriptionGroupsRequest {
    organizationName: string;
    platform: Platforms;
    repositoryName?: string;
    directOrganization?: boolean;
    page?: number;
    limit?: number;
}

export interface SubscriptionsApiUpdateSubscriptionGroupRequest {
    id: string;
    subscriptionGroupUpdate: SubscriptionGroupUpdate;
}

export interface SubscriptionsApiUpdateSubscriptionTierRequest {
    id: string;
    subscriptionTierUpdate: SubscriptionTierUpdate;
}

/**
 * 
 */
export class SubscriptionsApi extends runtime.BaseAPI {

    /**
     * Archive Subscription Tier
     */
    async archiveSubscriptionTierRaw(requestParameters: SubscriptionsApiArchiveSubscriptionTierRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SubscriptionTier>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling archiveSubscriptionTier.');
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
            path: `/api/v1/subscriptions/tiers/{id}/archive`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Archive Subscription Tier
     */
    async archiveSubscriptionTier(requestParameters: SubscriptionsApiArchiveSubscriptionTierRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SubscriptionTier> {
        const response = await this.archiveSubscriptionTierRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create Subscribe Session
     */
    async createSubscribeSessionRaw(requestParameters: SubscriptionsApiCreateSubscribeSessionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SubscribeSession>> {
        if (requestParameters.subscribeSessionCreate === null || requestParameters.subscribeSessionCreate === undefined) {
            throw new runtime.RequiredError('subscribeSessionCreate','Required parameter requestParameters.subscribeSessionCreate was null or undefined when calling createSubscribeSession.');
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
            path: `/api/v1/subscriptions/subscribe-sessions/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.subscribeSessionCreate,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Create Subscribe Session
     */
    async createSubscribeSession(requestParameters: SubscriptionsApiCreateSubscribeSessionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SubscribeSession> {
        const response = await this.createSubscribeSessionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create Subscription Group
     */
    async createSubscriptionGroupRaw(requestParameters: SubscriptionsApiCreateSubscriptionGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SubscriptionGroup>> {
        if (requestParameters.subscriptionGroupCreate === null || requestParameters.subscriptionGroupCreate === undefined) {
            throw new runtime.RequiredError('subscriptionGroupCreate','Required parameter requestParameters.subscriptionGroupCreate was null or undefined when calling createSubscriptionGroup.');
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
            path: `/api/v1/subscriptions/groups/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.subscriptionGroupCreate,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Create Subscription Group
     */
    async createSubscriptionGroup(requestParameters: SubscriptionsApiCreateSubscriptionGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SubscriptionGroup> {
        const response = await this.createSubscriptionGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create Subscription Tier
     */
    async createSubscriptionTierRaw(requestParameters: SubscriptionsApiCreateSubscriptionTierRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SubscriptionTier>> {
        if (requestParameters.subscriptionTierCreate === null || requestParameters.subscriptionTierCreate === undefined) {
            throw new runtime.RequiredError('subscriptionTierCreate','Required parameter requestParameters.subscriptionTierCreate was null or undefined when calling createSubscriptionTier.');
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
            path: `/api/v1/subscriptions/tiers/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.subscriptionTierCreate,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Create Subscription Tier
     */
    async createSubscriptionTier(requestParameters: SubscriptionsApiCreateSubscriptionTierRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SubscriptionTier> {
        const response = await this.createSubscriptionTierRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get Subscribe Session
     */
    async getSubscribeSessionRaw(requestParameters: SubscriptionsApiGetSubscribeSessionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SubscribeSession>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getSubscribeSession.');
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
            path: `/api/v1/subscriptions/subscribe-sessions/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Get Subscribe Session
     */
    async getSubscribeSession(requestParameters: SubscriptionsApiGetSubscribeSessionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SubscribeSession> {
        const response = await this.getSubscribeSessionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Search Subscription Groups
     */
    async searchSubscriptionGroupsRaw(requestParameters: SubscriptionsApiSearchSubscriptionGroupsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListResourceSubscriptionGroup>> {
        if (requestParameters.organizationName === null || requestParameters.organizationName === undefined) {
            throw new runtime.RequiredError('organizationName','Required parameter requestParameters.organizationName was null or undefined when calling searchSubscriptionGroups.');
        }

        if (requestParameters.platform === null || requestParameters.platform === undefined) {
            throw new runtime.RequiredError('platform','Required parameter requestParameters.platform was null or undefined when calling searchSubscriptionGroups.');
        }

        const queryParameters: any = {};

        if (requestParameters.organizationName !== undefined) {
            queryParameters['organization_name'] = requestParameters.organizationName;
        }

        if (requestParameters.repositoryName !== undefined) {
            queryParameters['repository_name'] = requestParameters.repositoryName;
        }

        if (requestParameters.directOrganization !== undefined) {
            queryParameters['direct_organization'] = requestParameters.directOrganization;
        }

        if (requestParameters.platform !== undefined) {
            queryParameters['platform'] = requestParameters.platform;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
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
            path: `/api/v1/subscriptions/groups/search`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Search Subscription Groups
     */
    async searchSubscriptionGroups(requestParameters: SubscriptionsApiSearchSubscriptionGroupsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListResourceSubscriptionGroup> {
        const response = await this.searchSubscriptionGroupsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update Subscription Group
     */
    async updateSubscriptionGroupRaw(requestParameters: SubscriptionsApiUpdateSubscriptionGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SubscriptionGroup>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateSubscriptionGroup.');
        }

        if (requestParameters.subscriptionGroupUpdate === null || requestParameters.subscriptionGroupUpdate === undefined) {
            throw new runtime.RequiredError('subscriptionGroupUpdate','Required parameter requestParameters.subscriptionGroupUpdate was null or undefined when calling updateSubscriptionGroup.');
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
            path: `/api/v1/subscriptions/groups/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.subscriptionGroupUpdate,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Update Subscription Group
     */
    async updateSubscriptionGroup(requestParameters: SubscriptionsApiUpdateSubscriptionGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SubscriptionGroup> {
        const response = await this.updateSubscriptionGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update Subscription Tier
     */
    async updateSubscriptionTierRaw(requestParameters: SubscriptionsApiUpdateSubscriptionTierRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SubscriptionTier>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateSubscriptionTier.');
        }

        if (requestParameters.subscriptionTierUpdate === null || requestParameters.subscriptionTierUpdate === undefined) {
            throw new runtime.RequiredError('subscriptionTierUpdate','Required parameter requestParameters.subscriptionTierUpdate was null or undefined when calling updateSubscriptionTier.');
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
            path: `/api/v1/subscriptions/tiers/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.subscriptionTierUpdate,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Update Subscription Tier
     */
    async updateSubscriptionTier(requestParameters: SubscriptionsApiUpdateSubscriptionTierRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SubscriptionTier> {
        const response = await this.updateSubscriptionTierRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
