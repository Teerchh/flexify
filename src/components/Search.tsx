type searchProps = {
    query: string,
    handleChange: React.Dispatch<React.SetStateAction<string>>
}

export default function Search({ query, handleChange }: searchProps) {
    return (
        <div className="search">
            <div>
                <img src="search.svg" alt="search" />

                <input
                    type="text"
                    placeholder="Search through thousands of movies"
                    value={query}
                    onChange={(event) => handleChange(event.target.value)}
                />

            </div>
        </div>
    )
}
