export const load = async({ url, fetch }) => {
    let search_entry = url.searchParams.get('search_entry')

    if (search_entry) {
        let entry_endpoint = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${search_entry}`)
        let { data } = await entry_endpoint.json();

        if (Object.keys(data).length === 0) {
            return {
                error: "This entry does not exist.",
                entry_data: null
            }
        }
        return {
            error: "",
            entry_data: data
        }
}}