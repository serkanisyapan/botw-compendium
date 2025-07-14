import type { PageLoad } from "./$types.js"

export const load: PageLoad = async({ fetch, params }) => {
    const res = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/${params.slug}`)
    const { data } = await res.json()

    return {
        data
    }
}