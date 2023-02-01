import {useMemo} from "react";
import { selectLottoInfoState, lottoInfoData } from './Home';
import {useRecoilValue} from "recoil";

function List() {
    const selectLottoInfo = useRecoilValue(selectLottoInfoState)
    const bodyTr = (selectLottoInfo: Array<lottoInfoData>) => {
        const result = selectLottoInfo.map((info: lottoInfoData, idx: number) => {
            const turn = `제 ${info.draw_no} 회`
            const numbers = info.numbers.map((number: number, i: number) => {
                const colorType = Math.floor(number / 10)
                const name = `color${colorType}`
                return (<span key={i} className={`${name} lotto-ball bg-lotto-${colorType}-500`}>{number}</span>)
            })
            const bonus = <span className={`lotto-ball bg-lotto-${Math.floor(info.bonus_no / 10)}-500`}>{info.bonus_no}</span>
            const winners = info.winners_combination
                ? <>
                    {(info.winners_combination.auto || 0) + (info.winners_combination.manual || 0)} <br /> ({info.winners_combination.auto || 0} / {info.winners_combination.manual || 0})
                </>
                : ''
            const date = info.date.split('T')[0]

            return (
                <tr key={idx} className="bg-gray-800 border-b border-gray-700 text-gray-50 hover:bg-gray-600">
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
                    <thead className="text-gray-700 uppercase bg-gray-50 bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="border border-slate-600">회차</th>
                            <th scope="col" className="border border-slate-600">당첨번호</th>
                            <th scope="col" className="border border-slate-600">보너스번호</th>
                            <th scope="col" className="border border-slate-600">1등당첨자<br /><sub>(자동 / 수동)</sub></th>
                            <th scope="col" className="border border-slate-600">날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {useMemo(() => bodyTr(selectLottoInfo), [selectLottoInfo])}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default List;