export interface About {
    title: string;
    description: string;
    background_address: string;
}

export interface About_read_Resp {
    my_about: About;
}

export interface About_write_Resp {
    error: string;
}

//------------------------------
interface MapAddress {
    location_name: string;
    lat: string;
    long: string;
}

export interface Contact {
    title: string;
    description: string;
    phone: string;
    email: string;
    location: string;
    map_add: MapAddress;
}

export interface Contact_read_Response {
    my_contact: Contact;
}

export interface Contact_write_Response {
    error: string;
}


//-----------------------------------
export interface Hero {
    title: string;
    description: string;
    background_type: string;
    background_address: string;
}

export interface Hero_read_Response {
    Hero: Hero;
}

export interface Hero_write_Response {
    error: string;
}

//-------------------------------

export interface Portfolio {
    id: string;
    title: string;
    category: string;
    description: string;
    thumbnailUrl: string;
    priority: number;
    created_at?: string;  // Optional field (equivalent to omitempty)
}

export interface Portfolios_read_response {
    portfolios: Portfolio[];
}

export interface Portfolios_write_response {
    error: string;
}

//---------------------------------


interface Service {
    id: string;
    title: string;
    category: string;
    description: string;
    thumbnailUrl: string;
    priority: number;
    created_at?: string;  // Optional field (matches Go's omitempty)
}

interface Services_read_response {
    my_service: Service[];  // Using exact field name from your Go struct
}

interface Services_write_response {
    error: string;  // Using exact field name from your Go struct
}

//--------------------------

interface User {
    email: string;
    password: string;
    newPass?: string | null;  // Optional field (matches Go's omitempty and pointer)
}

