export const load = async({ url, fetch }) => {
    let search_entry = url.searchParams.get('search_entry')
    let search_game = url.searchParams.get('game')

    if (search_entry) {
        let entry_endpoint = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${search_entry}?game=${search_game}`)
        let { data } = await entry_endpoint.json();

        if (Object.keys(data).length === 0) {
            return {
                error: "This entry does not exist.",
                entry_data: null,
                entry_game: search_game
            }
        }
        return {
            error: "",
            entry_data: data,
            entry_game: search_game
        }
}}