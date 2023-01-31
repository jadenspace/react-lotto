import {useMemo, useState} from "react";
import {useRecoilValue} from "recoil";
import { selectLottoInfoState } from './Home';

function Amount() {
    const selectLottoInfo = useRecoilValue(selectLottoInfoState)
    const [bonusChecked, setBonusChecked] = useState(false)
    const footTr = () => {
        const result = []
        for (let i = 1; i <= 45; i++) {
            const colorType = Math.floor(i / 10)
            const name = `color${colorType}`
                result.push(<td key={i}><span className={`${name} lotto-ball bg-lotto-${colorType}-500`}>{i}</span></td>)
        }
        return (
            <tr>
                {result}
            </tr>
        )
    }
    const bodyTr = (selectLottoInfo, bonusChecked) => {
        const bonus = []
        const numbers = []
        const result = []
        Object.entries(JSON.parse(selectLottoInfo)).map((info, idx) => {
            numbers.push(...info[1].numbers)
            bonus.push(info[1].bonus_no)
        })
        const numbersCopy = bonusChecked ? [...numbers, ...bonus] : numbers.slice(0)
        const accInfo = numbersCopy.reduce((acc,cur) => {
            if (!acc.hasOwnProperty(cur)) {
                acc[cur] = 0
            }
            acc[cur]++
            return acc
        }, {})
        const latestNum = Math.max(...Object.values(accInfo))
        for (let i = 1; i <= 45; i++) {
            const thisAccNum = accInfo[i] ? accInfo[i] : 0
            result.push(
                <td className="align-bottom overflow-hidden text-center" key={i}>
                    <div className="flex justify-center items-end relative" style={{height: `200px`}}>
                        <span className={`w-3/4 block graph bg-gray-${thisAccNum === latestNum ? 400 : 500} rounded-t-2xl transition-all duration-500`} style={{willChange: 'padding', height: '0', paddingTop: '5px', paddingBottom: `${195 * thisAccNum / latestNum }px`}}>{thisAccNum || ''}</span>
                    </div>
                </td>
            )
        }
        return (
            <tr className="number">
                {result}
            </tr>
        )
    }
    const toggleWithBonus = () => {
        setBonusChecked(current => !current)
    }
    return (
        <div id="amount" className="w-full overflow-hidden mt-10">
            <h2>번호별 당첨 횟수</h2>
            <div className="flex justify-end items-center mb-4 mr-5">
                <label htmlFor="bonus-checkbox"
                       className="ml-2 text-base font-medium text-gray-900 text-gray-300">보너스 포함</label>
                &nbsp;
                <input type="checkbox"
                       id="bonus-checkbox" name="bonus_checkbox" onChange={toggleWithBonus} checked={bonusChecked}
                       className="ipt-checkbox" />
            </div>
            <div className="tbl-wrap overflow-y-auto">
                <table className="tbl-amount table m-auto">
                    <tfoot>
                        {useMemo(() => footTr(), [])}
                    </tfoot>
                    <tbody>
                        {useMemo(() => bodyTr(selectLottoInfo, bonusChecked), [selectLottoInfo, bonusChecked])}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Amount;