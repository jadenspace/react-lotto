function List({turnRange, lottoInfo}) {
    const bodyTr = () => {
        let selectLottoInfo = {}
        for (let i = turnRange.from; i <= turnRange.to; i++) {
            if (lottoInfo[i]) {
                selectLottoInfo[i] = lottoInfo[i]
            }
        }
        const result = Object.entries(selectLottoInfo).map((info, idx) => {
            const turn = `제 ${info[0]} 회`
            const numbers = info[1].numbers.map((number, i) => {
                const name = `color${Math.ceil(number / 10)}`
                return (<span key={i} className={name}>{number}</span>)
            })
            const bonus = info[1].bonus_no
            const winners = info[1].winners_combination
                ? `(${info[1].winners_combination.auto || 0} / ${info[1].winners_combination.manual || 0} / ${info[1].winners_combination.semi_auto || 0})`
                : ''
            const date = info[1].date.split('T')[0]

            return (
                <tr key={idx}>
                    <td>{turn}</td>
                    <td>{numbers}</td>
                    <td>{bonus}</td>
                    <td>{winners}</td>
                    <td>{date}</td>
                </tr>
            )
        })
        return result.reverse()
    }

    return (
        <div id="lottoList">
            <div className="tbl-wrap">
                <table width="100%" border="0">
                    <thead>
                    <tr>
                        <th>회차</th>
                        <th width="30%">당첨번호</th>
                        <th>보너스번호</th>
                        <th>1등당첨자<br /><sub>(합/자동/수동)</sub></th>
                        <th width="20%">날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                        {bodyTr()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default List;