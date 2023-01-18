function Search({inputValue, setInputValue, setIsLoading, setTurnRange}) {
    const updateTurnRange = (e) => {
        const obj = {}
        obj[e.target.dataset.part] = +e.target.value
        setInputValue(current => ({
            ...current,
            ...obj
        }))
    }
    const onClick = async () => {
        setIsLoading(true)
        if (inputValue.from > inputValue.to) {
            const changeValue = {
                from: inputValue.to,
                to: inputValue.from
            }
            setTurnRange(changeValue)
        } else {
            setTurnRange(inputValue)
        }
    }

    return (
        <div className="search-area">
            <input type="number" id="oldPrd" min="1" max="9999" className="prdInput" data-part="from" onInput={updateTurnRange} value={inputValue.from || ''} />
            <label htmlFor="oldPrd"> 회</label>
            ~
            <input type="number" id="latestPrd" min="1" max="9999" className="prdInput" data-part="to" onInput={updateTurnRange} value={inputValue.to || ''} />
            <label htmlFor="latestPrd"> 회</label>
            <button type="button" className="btn-list" onClick={onClick}>당첨번호 정보</button>
        </div>
    )
}

export default Search;