import {useEffect, useState} from "react";

function Amount({bonus, numbers}) {
    const [bonusChecked, setBonusChecked] = useState(false)
    const footTd = () => {
        const result = []
        for (let i = 1; i <= 45; i++) {
            const name = `color${Math.ceil(i / 10)}`
                result.push(<td key={i}><span className={name}>{i}</span></td>)
        }
        return result
    }
    const bodyTd = () => {
        const result = []
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
                <td key={i}>
                    <span>{thisAccNum}</span>
                    <div className="graph" style={{height: `${200 * thisAccNum / latestNum }px`}}></div>
                </td>
            )
        }
        return result
    }
    const toggleWithBonus = () => {
        setBonusChecked(current => !current)
    }

    useEffect(() => {
        bodyTd()
    }, [bonusChecked])


    return (
        <div id="amount">
            <h2>번호별 당첨 횟수</h2>
            (
            <label htmlFor="bonus-checkbox">보너스포함: </label>
            <input type="checkbox" id="bonus-checkbox" name="bonus_checkbox" onChange={toggleWithBonus} checked={bonusChecked} />
            )
            <div className="tbl-wrap">
                <table className="tbl-amount">
                    <tfoot>
                    <tr>
                        {footTd()}
                    </tr>
                    </tfoot>
                    <tbody>
                    <tr className="number">
                        {bodyTd()}
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Amount;