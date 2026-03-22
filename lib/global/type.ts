export enum Status{
    IDLE="idle",
    ERROR="error",
    LOADING="loading",
    SUCCESS="success"
}

export enum PaymentMethod  {
    COD="cod", 
    QR="qr_scan", 
    VISITANDPAY="visit_pay"
}

export enum OrderStatus {
    PENDING="pending" , 
    CONFIRMED="confirmed",
    DELIVERED="delivered",  
    CANCELLED="cancelled"
}