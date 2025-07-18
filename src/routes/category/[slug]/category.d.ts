export interface Data {
    data: PageData
}

interface PageData {
    category_data: CategoryData[],
    current_slug: string
}

interface CategoryData {
    category: string,
    common_locations: string[],
    description: string,
    image: string,
    name: string,
    dlc: string,
    id: number,
    drops?: string[],
    edible?: boolean,
    properties?: EquipmentProperties,
    cooking_effect?: string,
    hearts_recovered?: number,
}

interface EquipmentProperties {
    attack: number,
    defense: number,
    effect: string | null,
    type: string
}