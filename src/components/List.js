
function Table() {
    return (
        <div className="tbl-wrap">
            <table width="100%" border="0">
                <thead>
                <tr>
                    <th>회차</th>
                    <th width="30%">당첨번호</th>
                    <th>보너스번호</th>
                    <th>1등당첨자<br><sub>(합/자동/수동)</sub></th>
                    <th width="20%">날짜</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>제 ${end-i+1} 회</td>
                        <td>${numbers.join(' ')}</td>
                        <td>${bonusNo}</td>
                        <td>${winners}</td>
                        <td>${date}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

exports default Table;