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
        <div className="search-area flex justify-center items-center mt-10">
            <input type="number" id="oldPrd" min="1" max="999999" className="ipt-text" data-part="from"
                   onInput={updateTurnRange} onKeyUp={e => e.keyCode === 13 ? onClick() : null} value={inputValue.from || ''}/>
            <label htmlFor="oldPrd" className="ml-1"> 회</label>
            &nbsp;~&nbsp;
            <input type="number" id="latestPrd" min="1" max="999999" className="ipt-text" data-part="to"
                   onInput={updateTurnRange} onKeyUp={e => e.keyCode === 13 ? onClick() : null} value={inputValue.to || ''}/>
            <label htmlFor="latestPrd" className="ml-1"> 회</label>
            <button type="button" className="btn btn-gradient ml-5" onClick={onClick}>당첨번호 정보 검색</button>
        </div>
    )
}

export default Search;