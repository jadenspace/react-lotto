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
                const colorType = Math.floor(number / 10)
                const name = `color${colorType}`
                return (<span key={i} className={`${name} lotto-ball bg-lotto-${colorType}-500`}>{number}</span>)
            })
            const bonus = <span className={`lotto-ball bg-lotto-${Math.floor(info[1].bonus_no / 10)}-500`}>{info[1].bonus_no}</span>
            const winners = info[1].winners_combination
                ? `${info[1].winners_combination.auto || 0} / ${info[1].winners_combination.manual || 0} / ${info[1].winners_combination.semi_auto || 0}`
                : ''
            const date = info[1].date.split('T')[0]

            return (
                <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-50 hover:bg-gray-600">
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
        <div id="lottoList" className="lotto-list mt-10">
            <h2>회차별 당첨번호 정보</h2>
            <div className="tbl-wrap">
                <table className="border-collapse border border-slate-500 w-full text-center">
                    <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="border border-slate-600">회차</th>
                            <th scope="col" className="border border-slate-600">당첨번호</th>
                            <th scope="col" className="border border-slate-600">보너스번호</th>
                            <th scope="col" className="border border-slate-600">1등당첨자<br /><sub>(합/자동/수동)</sub></th>
                            <th scope="col" className="border border-slate-600">날짜</th>
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