// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  user: any;
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type Service = {
  service: string;
  detail: string;
};

export type Problem = {
  problem: string;    
  detail: string;
};

export type ServiceFormField = {
  id: string;
  name: string;
};
export type ServiceField = { 
  id: string;
  name: string;
};

export type ServiceForm = {
  id: string;
  specialty: string;
  serviceDescription: string;
  serviceDetails: string;
  problemDetails: string;
};

export type ServiceFormState = {
  errors?: {
    specialty?: string[];
    serviceDescription?: string[];
    serviceDetails?: string[];
    problemDetails?: string[];
  };
  message?: string | null;
};

export type ServiceFormData = {
  specialty: string;
  services: Service[];
  solvedProblems: Problem[];
};

export type ServiceFormSchema = {
  specialty: string;
  serviceDescription: string;
  serviceDetails: Service[];
  problemDetails: Problem[];
};
export type ServiceFormSchemaErrors = {
  specialty?: string[];
  serviceDescription?: string[];
  serviceDetails?: string[];
  problemDetails?: string[];
};

export type ServiceFormSchemaState = {
  errors?: ServiceFormSchemaErrors;
  message?: string | null;
};

export type ServiceFormSchemaData = {
  specialty: string;
  serviceDescription: string;
  serviceDetails: Service[];
  problemDetails: Problem[];
};  

