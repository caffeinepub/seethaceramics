import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface ContactSubmission {
    id: bigint;
    name: string;
    createdAt: bigint;
    email: string;
    message: string;
    phone: string;
}
export interface Review {
    id: bigint;
    customerName: string;
    createdAt: bigint;
    productName: string;
    comment: string;
    rating: bigint;
}
export interface Product {
    id: bigint;
    inStock: boolean;
    name: string;
    tags: Array<string>;
    description: string;
    imageUrl: string;
    category: string;
    discountPrice?: bigint;
    price: bigint;
}
export interface backendInterface {
    addReview(productName: string, customerName: string, rating: bigint, comment: string): Promise<Review>;
    addToCart(sessionId: string, productId: bigint, quantity: bigint): Promise<boolean>;
    clearCart(sessionId: string): Promise<boolean>;
    getCart(sessionId: string): Promise<Array<CartItem>>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getProduct(id: bigint): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getReviews(): Promise<Array<Review>>;
    removeFromCart(sessionId: string, productId: bigint): Promise<boolean>;
    submitContact(name: string, email: string, phone: string, message: string): Promise<ContactSubmission>;
    updateCartQuantity(sessionId: string, productId: bigint, quantity: bigint): Promise<boolean>;
}
