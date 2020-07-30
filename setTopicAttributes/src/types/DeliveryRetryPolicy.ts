export type DeliveryRetryPolicy = {
    http: {
        defaultHealthyRetryPolicy: {
            minDelayTarget: number;
            maxDelayTarget: number;
            numRetries: number;
            numMaxDelayRetries: number;
            numNoDelayRetries: number;
            backoffFunction: string;
        };
        disableSubscriptionOverrides: boolean;
    };
};
