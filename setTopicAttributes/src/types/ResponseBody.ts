import { DeliveryRetryPolicy } from './DeliveryRetryPolicy';

export type ResponseBody = {
    deliveryRetryPolicy: DeliveryRetryPolicy;
    message: string;
};
