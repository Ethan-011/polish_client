interface About {
    title: string;
    description: string;
    background_address: string;
}

interface AboutResp {
    my_about: About;
}



//------------------------------
interface MapAddress {
    location_name: string;
    lat: string;
    long: string;
}

interface Contact {
    title: string;
    description: string;
    phone: string;
    email: string;
    location: string;
    map_add: MapAddress;
}

export interface ContactResponse {
    my_contact: Contact;
}


//-----------------------------------
interface Hero {
    title: string;
    description: string;
    background_type: string;
    background_address: string;
}

export interface HeroResponse {
    my_hero: Hero;
}


//-------------------------------

interface Portfolio {
    id: string;
    title: string;
    category: string;
    description: string;
    thumbnailUrl: string;
    priority: number;
    created_at?: string;  // Optional field (equivalent to omitempty)
}

interface Portfolios {
    portfolios: Portfolio[];
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

interface Services {
    my_service: Service[];  // Using exact field name from your Go struct
}

//--------------------------

interface User {
    email: string;
    password: string;
    newPass?: string | null;  // Optional field (matches Go's omitempty and pointer)
}