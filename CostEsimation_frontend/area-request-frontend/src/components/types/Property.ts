export interface Property {
    _id: string;
    user_email: string;
    user_name: string;
    property_name: string;
    city: string;
    state: string;
    builtup_area: number;
    property_type: string;
    land_clearance_needed: boolean;
    floors_needed: number;
    isStartBuild?: boolean;
}