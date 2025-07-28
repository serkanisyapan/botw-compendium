import type { PageLoad } from "./$types.js"
import type { CategoryData } from "./category.js"

interface PageLoadData {
    data: CategoryData[]
}

export const load: PageLoad = async({ fetch, params, url }) => {
    console.log(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/${params.slug}${url.search}`)
    const res = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/${params.slug}${url.search}`)
    const { data }: PageLoadData = await res.json()
    let sort_category_data_by_id = data.sort((a, b) => a.id - b.id)
    return {
        category_data: sort_category_data_by_id,
        current_slug: params.slug
    }
}